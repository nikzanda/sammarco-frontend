import React from 'react';
import { App, Card, Flex, Form, FormProps, GetProp, MenuProps, Result, Skeleton, Spin, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaBell, FaCalendarCheck, FaMoneyBill, FaTrash } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client/react';
import { EnrollmentDeleteDocument, EnrollmentDocument, EnrollmentUpdateDocument } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { EnrollmentForm, MemberCalendar, MemberMedicalCertificate, MemberPayments } from '../members/components';
import { EditPageHeader, Updates } from '../../commons';
import { EmailTable, SendReminderModal } from '../emails/components';
import { SettingsContext } from '../../contexts';
import { AttendanceCreateModal } from '../attendances/components';
import { PaymentCreateModal } from '../payments/components';
import { getURLTab, setURLTab } from '../../utils';

const DEFAULT_TAB = 'details';

const EnrollmentEditPage: React.FC = () => {
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
  } = useQuery(EnrollmentDocument, {
    variables: {
      id: id!,
    },
  });

  const [updateEnrollment, { loading: updateLoading, error: updateError }] = useMutation(EnrollmentUpdateDocument, {
    refetchQueries: ['Enrollments', 'Enrollment'],
    onCompleted: () => {
      message.success(t('enrollments.edited'));
    },
  });

  const [deleteEnrollment, { loading: deleteLoading, error: deleteError }] = useMutation(EnrollmentDeleteDocument, {
    refetchQueries: ['Enrollments'],
    onCompleted: () => {
      message.success(t('enrollments.deleted'));
      navigate('/enrollments');
    },
  });

  useDisplayGraphQLErrors(queryError, updateError, deleteError);

  const enrollment = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.enrollment;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const title = React.useMemo(() => {
    if (!enrollment) {
      return <Spin />;
    }
    return (
      <>
        <Link to={`/members/${enrollment.member.id}`}>{enrollment.member.fullName}</Link>
        {' — '}
        {enrollment.socialYear}/{(enrollment.socialYear + 1).toString().slice(-2)}
      </>
    );
  }, [enrollment]);

  const initialValues = React.useMemo(() => {
    if (enrollment) {
      const result = {
        enrollment: {
          id: enrollment.id,
          courseIds: enrollment.courses.map(({ id }) => id),
          shiftIds: enrollment.shiftIds,
          qualification: enrollment.qualification,
          socialCardNumber: enrollment.socialCardNumber,
          asiCardNumber: enrollment.asiCardNumber,
          csenCardNumber: enrollment.csenCardNumber,
          registrationRequestDate: enrollment.registrationRequestDate,
          registrationAcceptanceDate: enrollment.registrationAcceptanceDate,
          medicalCertificateExpireAt: enrollment.medicalCertificateExpireAt,
          medicalCertificateType: enrollment.medicalCertificateType,
          medicalCertificateKey: enrollment.medicalCertificateKey,
          excludeFromCommunications: enrollment.excludeFromCommunications,
          consents: enrollment.consents,
        },
      };
      return result;
    }
    return undefined;
  }, [enrollment]);

  const memberProxy = React.useMemo(() => {
    if (!enrollment) {
      return undefined;
    }
    const result = {
      id: enrollment.member.id,
      currentEnrollment: enrollment,
    };
    return result;
  }, [enrollment]);

  const courseIds = React.useMemo(() => enrollment?.courses.map(({ id }) => id) ?? [], [enrollment?.courses]);

  const handleDelete = React.useCallback(() => {
    deleteEnrollment({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  }, [deleteEnrollment, id]);

  const actions = React.useMemo(() => {
    if (!enrollment) {
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
            memberId: enrollment.member.id,
            courseIds,
          });
        },
      },
      {
        key: 'delete',
        label: t('buttons.delete.label'),
        icon: <Icon component={FaTrash} spin={deleteLoading} />,
        danger: true,
        onClick: () => {
          modal.confirm({
            title: t('enrollments.delete.description'),
            content: t('enrollments.delete.confirm'),
            onOk: () => handleDelete(),
          });
        },
      },
    ];
    return result;
  }, [courseIds, deleteLoading, enrollment, handleDelete, modal, t, validEmailSettings]);

  const handleFinish: FormProps['onFinish'] = (values) => {
    const { enrollment: enrollmentValues } = values;
    updateEnrollment({
      variables: {
        input: {
          id: id!,
          ...enrollmentValues,
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
      {enrollment && memberProxy && (
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
                    label: t('enrollments.tab.details'),
                    key: 'details',
                    children: (
                      <>
                        <EnrollmentForm updating />
                        <Updates updates={enrollment} />
                      </>
                    ),
                  },
                  {
                    label: t('enrollments.tab.medicalCertificate'),
                    key: 'medicalCertificate',
                    children: <MemberMedicalCertificate member={memberProxy as never} />,
                  },
                  {
                    label: t('enrollments.tab.payments'),
                    key: 'payments',
                    children: <MemberPayments member={memberProxy as never} />,
                  },
                  {
                    label: t('enrollments.tab.calendar'),
                    key: 'calendar',
                    children: <MemberCalendar member={memberProxy as never} />,
                  },
                  {
                    label: t('enrollments.tab.emails'),
                    key: 'emails',
                    children: <EmailTable filters={{ memberIds: [enrollment.member.id] }} />,
                  },
                ]}
              />
            </Form>
          </Card>

          {newPayment && (
            <PaymentCreateModal
              memberId={enrollment.member.id}
              courseIds={courseIds}
              onCancel={() => setNewPayment(false)}
            />
          )}
          {newAttendance && (
            <AttendanceCreateModal
              memberIds={[enrollment.member.id]}
              courseIds={courseIds}
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

export default EnrollmentEditPage;
