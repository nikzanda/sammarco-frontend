import React from 'react';
import { Col, Divider, Form, Input, InputNumber, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '../../../components';
import { isTaxCodeValid, isMinor as isMinorFn } from '../../../utils';
import { CoursePicker, ShiftPicker } from '../../courses/components';
import { QualificationEnum } from '../../../generated/graphql';

const MemberForm: React.FC = () => {
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
          // TODO: validare codice univoco
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

      <Divider plain>{t('members.divider.memberData')}</Divider>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.qualification')} name="qualification">
          <Select
            options={Object.keys(QualificationEnum).map((qualification) => ({
              label: t(`members.qualification.${qualification}`),
              value: qualification,
            }))}
            allowClear={false}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          label={t('members.form.registrationRequestDate')}
          name="registrationRequestDate"
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

      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          label={t('members.form.registrationAcceptanceDate')}
          name="registrationAcceptanceDate"
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

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.socialCardNumber')} name="socialCardNumber">
          <InputNumber step={1} precision={0} min={1} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.asiCardNumber')} name="asiCardNumber">
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.csenCardNumber')} name="csenCardNumber">
          <Input />
        </Form.Item>
      </Col>

      <Divider plain>{t('courses.name')}</Divider>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.courses')} name="courseIds">
          <CoursePicker />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item noStyle dependencies={['courseIds']}>
          {({ getFieldValue }) => {
            const courseIds = getFieldValue('courseIds');

            return (
              <Form.Item label={t('members.form.shifts')} name="shiftIds">
                <ShiftPicker multiple queryFilters={{ courseIds }} disabled={!courseIds} />
              </Form.Item>
            );
          }}
        </Form.Item>
      </Col>
    </Row>
  );
};

export default MemberForm;
