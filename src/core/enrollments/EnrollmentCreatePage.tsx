import React from 'react';
import { App, Flex, Form, FormProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { EnrollmentCreateDocument, QualificationEnum } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { CreatePageHeader } from '../../commons';
import { SocialYearContext } from '../../contexts';
import { EnrollmentForm, MemberSearcher } from '../members/components';

const EnrollmentCreatePage: React.FC = () => {
  const { socialYear } = React.useContext(SocialYearContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const preselectedMemberId = searchParams.get('memberId');

  const [createEnrollment, { loading: mutationLoading, error: mutationError }] = useMutation(EnrollmentCreateDocument, {
    refetchQueries: ['Enrollments', 'Members'],
    onCompleted: () => {
      message.success(t('enrollments.created'));
      navigate('/enrollments');
    },
  });

  useDisplayGraphQLErrors(mutationError);

  const handleFinish: FormProps['onFinish'] = (values) => {
    const { memberId, enrollment } = values;
    createEnrollment({
      variables: {
        input: {
          memberId,
          ...enrollment,
          socialYear,
        },
      },
    });
  };

  return (
    <Flex vertical gap="middle">
      <CreatePageHeader
        entity="enrollments"
        submitButtonProps={{
          loading: mutationLoading,
        }}
      />

      <Form
        id="form"
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
        initialValues={{
          memberId: preselectedMemberId || undefined,
          enrollment: { qualification: QualificationEnum.ORDINARY_MEMBER },
        }}
      >
        <Form.Item
          label={t('payments.form.member')}
          name="memberId"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <MemberSearcher />
        </Form.Item>
        <EnrollmentForm />
      </Form>
    </Flex>
  );
};

export default EnrollmentCreatePage;
