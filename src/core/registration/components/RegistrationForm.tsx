import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client/react';
import { Alert, Button, Checkbox, Col, Flex, Form, FormProps, Input, Result, Row, Typography } from 'antd';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCAPTCHA from 'react-google-recaptcha';
import { RecaptchaVersionEnum, RegistrationRequestDocument } from '../../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { isTaxCodeValid, isMinor as isMinorFn } from '../../../utils';
import { RegistrationFormValues } from '../types';

const RECAPTCHA_CHALLENGE_REQUIRED = 'RECAPTCHA_CHALLENGE_REQUIRED';
const recaptchaV2SiteKey = import.meta.env.VITE_RECAPTCHA_V2_SITE_KEY;

const RegistrationForm: React.FC = () => {
  const { socialYear: socialYearParam } = useParams();
  const socialYear = parseInt(socialYearParam!, 10);
  const { t } = useTranslation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [form] = Form.useForm<RegistrationFormValues>();
  const [submitted, setSubmitted] = React.useState(false);
  const [requireV2Challenge, setRequireV2Challenge] = React.useState(false);
  const recaptchaV2Ref = React.useRef<ReCAPTCHA>(null);
  const [displayError, setDisplayError] = React.useState<Error | undefined>(undefined);

  const [registrationRequest, { loading: mutationLoading }] = useMutation(RegistrationRequestDocument);
  useDisplayGraphQLErrors(displayError);

  const submitWithToken = React.useCallback(
    async (values: RegistrationFormValues, captchaToken: string, recaptchaVersion: RecaptchaVersionEnum) => {
      const { name, surname, taxCode, address, email, phone, parent, consentPrivacy, consentRules } = values;

      const consents = [];
      if (consentPrivacy) {
        consents.push({ type: 'PRIVACY', acceptedAt: Date.now() });
      }
      if (consentRules) {
        consents.push({ type: 'RULES', acceptedAt: Date.now() });
      }

      await registrationRequest({
        variables: {
          input: {
            name,
            surname,
            taxCode,
            address,
            email,
            phone,
            parent,
            socialYear,
            consents,
            captchaToken,
            recaptchaVersion,
          },
        },
      });
      setSubmitted(true);
    },
    [registrationRequest, socialYear]
  );

  const handleFinish: FormProps<RegistrationFormValues>['onFinish'] = async (values) => {
    setDisplayError(undefined);
    const token = await executeRecaptcha!('registration');

    try {
      await submitWithToken(values, token, RecaptchaVersionEnum.V3);
    } catch (err: unknown) {
      const graphQLError = err as { graphQLErrors?: Array<{ extensions?: { code?: string } }> };
      const isChallengeRequired = graphQLError.graphQLErrors?.some(
        (e) => e.extensions?.code === RECAPTCHA_CHALLENGE_REQUIRED
      );

      if (isChallengeRequired && recaptchaV2SiteKey) {
        setRequireV2Challenge(true);
      } else {
        setDisplayError(err as Error);
      }
    }
  };

  const handleV2Change = async (token: string | null) => {
    if (!token) {
      return;
    }

    setDisplayError(undefined);
    const values = form.getFieldsValue();

    try {
      await submitWithToken(values, token, RecaptchaVersionEnum.V2);
    } catch (err: unknown) {
      setDisplayError(err as Error);
      recaptchaV2Ref.current?.reset();
    }
  };

  if (submitted) {
    return (
      <Result
        status="success"
        title={t('registration.success.title')}
        subTitle={t('registration.success.description')}
      />
    );
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Typography.Paragraph type="secondary" style={{ textAlign: 'center', marginBottom: 24 }}>
        {t('registration.subtitle')}
      </Typography.Paragraph>

      <Row gutter={24}>
        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('members.form.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('members.form.surname')} name="surname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('members.form.taxCode')}
            name="taxCode"
            rules={[
              { required: true },
              {
                validator(_rule, value?: string) {
                  if (!value || !isTaxCodeValid(value)) {
                    return Promise.reject(t('validations.invalidTaxCode'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input minLength={16} maxLength={16} />
          </Form.Item>
        </Col>

        <Form.Item noStyle dependencies={['taxCode']}>
          {({ getFieldValue }) => {
            const taxCode = getFieldValue('taxCode');

            if (!taxCode || !isTaxCodeValid(taxCode) || !isMinorFn(taxCode)) {
              return undefined;
            }

            return (
              <>
                <Col xs={24} md={12} xxl={8}>
                  <Form.Item
                    label={t('members.form.parent.taxCode')}
                    name={['parent', 'taxCode']}
                    rules={[
                      { required: true },
                      {
                        validator(_rule, value?: string) {
                          if (!value || !isTaxCodeValid(value)) {
                            return Promise.reject(t('validations.invalidTaxCode'));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input minLength={16} maxLength={16} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} xxl={8}>
                  <Form.Item
                    label={t('members.form.parent.name')}
                    name={['parent', 'name']}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} xxl={8}>
                  <Form.Item
                    label={t('members.form.parent.surname')}
                    name={['parent', 'surname']}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} xxl={8}>
                  <Form.Item
                    label={t('members.form.parent.email')}
                    name={['parent', 'email']}
                    rules={[{ type: 'email' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} xxl={8}>
                  <Form.Item label={t('members.form.parent.phone')} name={['parent', 'phone']}>
                    <Input />
                  </Form.Item>
                </Col>
              </>
            );
          }}
        </Form.Item>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('members.form.address')} name="address">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('members.form.email')} name="email" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('members.form.phone')} name="phone">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="consentPrivacy"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(t('validations.required'))),
          },
        ]}
      >
        <Checkbox>{t('registration.consents.privacy')}</Checkbox>
      </Form.Item>

      <Form.Item
        name="consentRules"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(t('validations.required'))),
          },
        ]}
      >
        <Checkbox>{t('registration.consents.rules')}</Checkbox>
      </Form.Item>

      {requireV2Challenge && (
        <Form.Item>
          <Alert
            type="warning"
            description={t('registration.errors.recaptchaChallengeRequired')}
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Flex justify="center">
            <ReCAPTCHA ref={recaptchaV2Ref} sitekey={recaptchaV2SiteKey} onChange={handleV2Change} />
          </Flex>
        </Form.Item>
      )}

      {!requireV2Challenge && (
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" block loading={mutationLoading}>
            {t('registration.submit')}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default RegistrationForm;
