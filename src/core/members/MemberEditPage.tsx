import React from 'react';
import { App, Button, Col, Form, Popconfirm, Result, Row, Skeleton, Space, Spin, Tabs, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaAngleLeft } from 'react-icons/fa';
import { useMemberDeleteMutation, useMemberQuery, useMemberUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { MemberForm, MemberPayments } from './components';

const MemberEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

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
    refetchQueries: ['Members', 'Member'],
    onCompleted: () => {
      message.success('updated');
    },
  });

  const [deleteMember, { loading: deleteLoading, error: deleteError }] = useMemberDeleteMutation({
    refetchQueries: ['Members'],
    onCompleted: () => {
      message.success('deleted');
      navigate(-1);
    },
  });

  useDisplayGraphQLErrors([queryError, updateError, deleteError]);

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

  const handleDelete = () => {
    deleteMember({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  };

  const handleFinish = (values: any) => {
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
      <Row>
        <Col span={2}>
          <Button shape="circle" size="middle" icon={<Icon component={FaAngleLeft} />} onClick={() => navigate(-1)} />
        </Col>
        <Col span={20}>
          <Typography.Title level={3}>{title}</Typography.Title>
        </Col>
        <Col span={2}>
          {member?.canDelete && (
            <Popconfirm
              title={t('sicuro di voler eliminare?.....')}
              description={t('elimina iscritto...')}
              onConfirm={handleDelete}
            >
              <Button type="primary" danger loading={deleteLoading}>
                {t('delete')}
              </Button>
            </Popconfirm>
          )}
          <Button type="primary" htmlType="submit" form="form" loading={updateLoading}>
            {t('update')}
          </Button>
        </Col>
      </Row>

      {queryLoading && <Skeleton active />}
      {queryError && (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong." // TODO: refetch
        />
      )}
      {member && (
        <Tabs
          items={[
            {
              label: t('details'),
              key: 'details',
              children: (
                <Form id="form" initialValues={member} layout="vertical" autoComplete="off" onFinish={handleFinish}>
                  <MemberForm />
                </Form>
              ),
            },
            {
              label: t('payments'),
              key: 'payments',
              children: <MemberPayments member={member} />,
            },
          ]}
        />
      )}
    </Space>
  );
};

export default MemberEditPage;
