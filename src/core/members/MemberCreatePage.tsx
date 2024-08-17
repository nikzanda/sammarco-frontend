import React from 'react';
import { App, Form, FormProps, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MemberForm } from './components';
import { QualificationEnum, useMemberCreateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { CreatePageHeader } from '../../commons';

const MemberCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const [createMember, { loading: mutationLoading, error: mutationError }] = useMemberCreateMutation({
    refetchQueries: ['Members', 'MembersSearcher'],
    onCompleted: () => {
      message.success(t('members.created'));
      navigate('/members');
    },
  });

  useDisplayGraphQLErrors(mutationError);

  const handleFinish: FormProps['onFinish'] = (values) => {
    createMember({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <CreatePageHeader entity="members" submitButtonProps={{ loading: mutationLoading }} />

      <Form
        id="form"
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
        initialValues={{ qualification: QualificationEnum.ORDINARY_MEMBER }}
      >
        <MemberForm />
      </Form>
    </Space>
  );
};

export default MemberCreatePage;
