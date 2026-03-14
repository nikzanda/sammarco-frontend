import React from 'react';
import { App, Card, Flex, Form, FormProps, GetProp, MenuProps, Result, Skeleton, Spin, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaTrash } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client/react';
import { MemberDeleteDocument, MemberDocument, MemberUpdateDocument } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { MemberCalendar, MemberEnrollments, MemberPayments, MemberPersonalForm } from './components';
import { EditPageHeader, Updates } from '../../commons';
import { EmailTable } from '../emails/components';
import { getURLTab, setURLTab } from '../../utils';

const DEFAULT_TAB = 'details';

const MemberEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();

  const [tab, setTab] = React.useState(getURLTab() || DEFAULT_TAB);

  React.useEffect(() => {
    setURLTab(getURLTab() || DEFAULT_TAB);
  }, []);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(MemberDocument, {
    variables: {
      id: id!,
    },
  });

  const [updateMember, { loading: updateLoading, error: updateError }] = useMutation(MemberUpdateDocument, {
    refetchQueries: ['Members', 'Member'],
    onCompleted: () => {
      message.success(t('members.edited'));
    },
  });

  const [deleteMember, { loading: deleteLoading, error: deleteError }] = useMutation(MemberDeleteDocument, {
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
  }, [deleteLoading, handleDelete, member, modal, t]);

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
                      <MemberPersonalForm />
                      <Updates updates={member} />
                    </>
                  ),
                },
                {
                  label: t('members.tab.enrollments'),
                  key: 'enrollments',
                  children: <MemberEnrollments memberId={id!} />,
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
      )}
    </Flex>
  );
};

export default MemberEditPage;
