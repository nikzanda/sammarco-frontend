import React from 'react';
import { App, Button, Flex, Form, FormProps, Result, Skeleton, Space, Spin, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaBell, FaTrash } from 'react-icons/fa';
import { useMemberDeleteMutation, useMemberQuery, useMemberUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { MemberCalendar, MemberForm, MemberMedicalCertificate, MemberPayments } from './components';
import { EditPageHeader, Updates } from '../../commons';
import { EmailTable, SendReminderModal } from '../emails/components';

const DEFAULT_TAB = 'details';

const MemberEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = React.useState<string>(searchParams.get('tab') || DEFAULT_TAB);
  const [sendReminderData, setSendReminderData] = React.useState<{ memberId: string; courseIds: string[] }>();

  React.useEffect(() => {
    searchParams.set('tab', tab);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, tab]);

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

  const handleDelete = () => {
    deleteMember({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  };

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
    <Space direction="vertical" style={{ width: '100%' }}>
      <EditPageHeader
        title={title}
        submitButtonProps={{
          loading: updateLoading,
        }}
        actions={[
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
        ]}
      />

      {queryLoading && <Skeleton active />}
      {queryError && <Result status="500" title="500" subTitle={t('errors.somethingWentWrong')} />}
      {member && (
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
            onChange={setTab}
            items={[
              {
                label: t('members.tab.details'),
                key: 'details',
                children: (
                  <>
                    <MemberForm />
                    <Updates updates={member} />
                  </>
                ),
              },
              {
                label: t('members.tab.medicalCertificate'),
                key: 'certificate',
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
                children: (
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Flex justify="end">
                      <Button
                        size="large"
                        icon={<Icon component={FaBell} />}
                        onClick={() => {
                          setSendReminderData({
                            memberId: member.id,
                            courseIds: member.courses.map(({ id }) => id),
                          });
                        }}
                      >
                        {t('buttons.reminder.label')}
                      </Button>
                    </Flex>
                    <EmailTable filters={{ memberIds: [id!] }} />
                  </Space>
                ),
              },
            ]}
          />
        </Form>
      )}

      {sendReminderData && (
        <SendReminderModal
          memberId={sendReminderData.memberId}
          courseIds={sendReminderData.courseIds}
          onCancel={() => setSendReminderData(undefined)}
        />
      )}
    </Space>
  );
};

export default MemberEditPage;
