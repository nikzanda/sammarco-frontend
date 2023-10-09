import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '../../../components';

const MemberForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={24}>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('member.form.name')}
          name="name"
          rules={[{ required: true, message: t('validations.required')! }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('member.form.surname')}
          name="surname"
          rules={[{ required: true, message: t('validations.required')! }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('member.form.taxCode')}
          name="taxCode"
          // TODO: validare codice univoco
          rules={[
            { required: true, message: t('validations.required')! },
            {
              validator(_rule, value: string) {
                if (
                  !value ||
                  value.length !== 16 ||
                  !/^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$/.test(
                    value
                  )
                ) {
                  return Promise.reject(t('tax code not valid'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('member.form.enrolledAt')}
          name="enrolledAt"
          getValueProps={(v: number) => {
            if (v) {
              return { value: new Date(v) };
            }
            return { value: undefined };
          }}
          getValueFromEvent={(v: Date) => {
            if (v) {
              return v.getTime();
            }
            return null;
          }}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default MemberForm;
