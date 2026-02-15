import React from 'react';
import { App, Card, Flex, Form, FormProps, GetProp, MenuProps, Result, Skeleton, Spin, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaBell, FaCalendarCheck, FaMoneyBill, FaTrash } from 'react-icons/fa';
import { useMemberDeleteMutation, useMemberQuery, useMemberUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { MemberCalendar, MemberForm, MemberMedicalCertificate, MemberPayments } from './components';
import { EditPageHeader, Updates } from '../../commons';
import { EmailTable, SendReminderModal } from '../emails/components';
import { SettingsContext } from '../../contexts';
import { getURLTab, setURLTab } from '../../utils';
import { AttendanceCreateModal } from '../attendances/components';
import { PaymentCreateModal } from '../payments/components';

const DEFAULT_TAB = 'details';

const MemberEditPage: React.FC = () => {
  const { validEmailSettings } = React.useContext(SettingsContext);
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();

  const [tab, setTab] = React.useState(getURLTab() || DEFAULT_TAB);
  const [newPayment, setNewPayment] = React.useState(false);
  const [newAttendance, setNewAttendance] = React.useState(false);
  const [sendReminderData, setSendReminderData] = React.useState<{ memberId: string; courseIds: string[] }>();

  React.useEffect(() => {
    setURLTab(getURLTab() || DEFAULT_TAB);
  }, []);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useMemberQuery({
    variables: {
      id: id!,
    },
  });

  const [updateMember, { loading: updateLoading, error: updateError }] = useMemberUpdateMutation({
    refetchQueries: ['Members', 'Member', 'Payments', 'PaymentPdf', 'PaymentsPdf'],
    onCompleted: () => {
      message.success(t('members.edited'));
      form.setFieldValue(['medicalCertificate', 'base64'], undefined);
    },
  });

  const [deleteMember, { loading: deleteLoading, error: deleteError }] = useMemberDeleteMutation({
    refetchQueries: ['Members'],
    onCompleted: () => {
      message.success(t('members.deleted'));
      navigate('/members');
    },
  });

  useDisplayGraphQLErrors(queryError, updateError, deleteError);

  const member = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.member;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const title = React.useMemo(() => {
    if (!member) {
      return <Spin />;
    }
    return member.fullName;
  }, [member]);

  const initialValues = React.useMemo(() => {
    if (member) {
      const result = {
        ...member,
        courseIds: member.courses.map(({ id: courseId }) => courseId),
        certificateExpiryDate: member.medicalCertificate?.expireAt,
      };
      return result;
    }
    return undefined;
  }, [member]);

  const handleDelete = React.useCallback(() => {
    deleteMember({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  }, [deleteMember, id]);

  const actions = React.useMemo(() => {
    if (!member) {
      return [];
    }

    const result: GetProp<MenuProps, 'items'> = [
      {
        key: 'payment',
        label: t('payments.new'),
        icon: <Icon component={FaMoneyBill} />,
        onClick: () => setNewPayment(true),
      },
      {
        key: 'attendance',
        label: t('attendances.new'),
        icon: <Icon component={FaCalendarCheck} />,
        onClick: () => setNewAttendance(true),
      },
      {
        key: 'reminder',
        label: t('buttons.reminder.label'),
        disabled: !validEmailSettings,
        icon: <Icon component={FaBell} />,
        onClick: () => {
          setSendReminderData({
            memberId: member.id,
            courseIds: member.courses.map(({ id }) => id),
          });
        },
      },
      {
        key: 'delete',
        label: t('buttons.delete.label'),
        disabled: !member?.canDelete,
        icon: <Icon component={FaTrash} spin={deleteLoading} />,
        danger: true,
        onClick: () => {
          modal.confirm({
            title: t('members.delete.description', { fullName: member?.fullName }),
            content: t('members.delete.confirm'),
            onOk: () => handleDelete(),
          });
        },
      },
    ];
    return result;
  }, [deleteLoading, handleDelete, member, modal, t, validEmailSettings]);

  const handleFinish: FormProps['onFinish'] = (values) => {
    updateMember({
      variables: {
        input: {
          id: id!,
          ...values,
        },
      },
    });
  };

  return (
    <Flex vertical gap="middle">
      <EditPageHeader
        title={title}
        submitButtonProps={{
          loading: updateLoading,
        }}
        actions={actions}
      />

      {queryLoading && <Skeleton active />}
      {queryError && <Result status="500" title="500" subTitle={t('errors.somethingWentWrong')} />}
      {member && (
        <>
          <Card styles={{ body: { paddingTop: 0 } }}>
            <Form
              id="form"
              form={form}
              initialValues={initialValues}
              layout="vertical"
              autoComplete="off"
              onFinish={handleFinish}
            >
              <Tabs
                activeKey={tab}
                onChange={(newTab) => {
                  setURLTab(newTab);
                  setTab(newTab);
                }}
                items={[
                  {
                    label: t('members.tab.details'),
                    key: 'details',
                    children: (
                      <>
                        <MemberForm updating />
                        <Updates updates={member} />
                      </>
                    ),
                  },
                  {
                    label: t('members.tab.medicalCertificate'),
                    key: 'certificate',
                    destroyOnHidden: true,
                    children: <MemberMedicalCertificate member={member} />,
                  },
                  {
                    label: t('members.tab.payments'),
                    key: 'payments',
                    children: <MemberPayments member={member} />,
                  },
                  {
                    label: t('members.tab.calendar'),
                    key: 'calendar',
                    children: <MemberCalendar member={member} />,
                  },
                  {
                    label: t('members.tab.emails'),
                    key: 'emails',
                    children: <EmailTable filters={{ memberIds: [id!] }} />,
                  },
                ]}
              />
            </Form>
          </Card>

          {newPayment && (
            <PaymentCreateModal
              memberId={member.id}
              courseIds={member.courses.map(({ id }) => id)}
              onCancel={() => {
                setNewPayment(false);
              }}
            />
          )}
          {newAttendance && (
            <AttendanceCreateModal
              memberIds={[member.id]}
              courseIds={member.courses.map(({ id }) => id)}
              onCancel={() => setNewAttendance(false)}
            />
          )}
          {sendReminderData && (
            <SendReminderModal
              memberId={sendReminderData.memberId}
              courseIds={sendReminderData.courseIds}
              onCancel={() => setSendReminderData(undefined)}
            />
          )}
        </>
      )}
    </Flex>
  );
};

export default MemberEditPage;
