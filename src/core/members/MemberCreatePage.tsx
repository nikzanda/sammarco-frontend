import React from 'react';
import { App, Button, Flex, Form, FormProps, Steps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EnrollmentForm, MemberPersonalForm } from './components';
import { useMutation } from '@apollo/client/react';
import { MemberCreateDocument, QualificationEnum } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { CreatePageHeader } from '../../commons';
import { SocialYearContext } from '../../contexts';

const personalFields = ['name', 'surname', 'taxCode', 'address', 'email', 'phone', 'parent'];

const MemberCreatePage: React.FC = () => {
  const { socialYear } = React.useContext(SocialYearContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const [currentStep, setCurrentStep] = React.useState(0);

  const [createMember, { loading: mutationLoading, error: mutationError }] = useMutation(MemberCreateDocument, {
    refetchQueries: ['Members', 'MembersSearcher'],
    onCompleted: () => {
      message.success(t('members.created'));
      navigate('/members');
    },
  });

  useDisplayGraphQLErrors(mutationError);

  const handleNext = async () => {
    try {
      const fieldsToValidate: (string | string[])[] = personalFields.flatMap<string | string[]>((field) => {
        if (field === 'parent') {
          return [
            ['parent', 'name'],
            ['parent', 'surname'],
            ['parent', 'taxCode'],
          ];
        }
        return [field];
      });
      await form.validateFields(fieldsToValidate);
      setCurrentStep(1);
    } catch {
      // validation errors shown by form
    }
  };

  const handleFinish: FormProps['onFinish'] = (values) => {
    const { enrollment, ...personalData } = values;
    createMember({
      variables: {
        input: {
          ...personalData,
          ...(enrollment && {
            enrollment: {
              ...enrollment,
              socialYear,
            },
          }),
        },
      },
    });
  };

  return (
    <Flex vertical gap="middle">
      <CreatePageHeader
        entity="members"
        submitButtonProps={{
          loading: mutationLoading,
          style: currentStep === 0 ? { display: 'none' } : undefined,
        }}
      />

      <Steps
        current={currentStep}
        items={[{ title: t('members.step.personal') }, { title: t('members.step.enrollment') }]}
        style={{ marginBottom: 16 }}
      />

      <Form
        id="form"
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
        initialValues={{ enrollment: { qualification: QualificationEnum.ORDINARY_MEMBER } }}
      >
        <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
          <MemberPersonalForm />
        </div>
        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <EnrollmentForm />
        </div>
      </Form>

      <Flex justify="space-between">
        {currentStep > 0 && <Button onClick={() => setCurrentStep(0)}>{t('buttons.back')}</Button>}
        {currentStep === 0 && (
          <Button type="primary" onClick={handleNext} style={{ marginLeft: 'auto' }}>
            {t('buttons.next')}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default MemberCreatePage;
