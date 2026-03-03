import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { isTaxCodeValid, isMinor as isMinorFn } from '../../../utils';

const MemberPersonalForm: React.FC = () => {
  const { t } = useTranslation();

  return (
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
                <Form.Item label={t('members.form.parent.name')} name={['parent', 'name']} rules={[{ required: true }]}>
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
  );
};

export default MemberPersonalForm;
