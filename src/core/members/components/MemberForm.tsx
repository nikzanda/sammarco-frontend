import { Col, Form, FormInstance, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '../../../components';
import { isTaxCodeValid, isMinor as isMinorFn } from '../helpers';
import { CoursePicker, ShiftPicker } from '../../courses/components';

type Props = {
  form: FormInstance<any>;
};

const MemberForm: React.FC<Props> = ({ form }) => {
  const { t } = useTranslation();
  const taxCode = Form.useWatch('taxCode', form);

  const isMinor = React.useMemo(() => {
    if (taxCode && isTaxCodeValid(taxCode)) {
      return isMinorFn(taxCode);
    }
    return false;
  }, [taxCode]);

  return (
    <Row gutter={24}>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('members.form.name')}
          name="name"
          rules={[{ required: true, message: t('validations.required')! }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('members.form.surname')}
          name="surname"
          rules={[{ required: true, message: t('validations.required')! }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('members.form.taxCode')}
          name="taxCode"
          // TODO: validare codice univoco
          rules={[
            { required: true, message: t('validations.required')! },
            {
              validator(_rule, value?: string) {
                if (!value || !isTaxCodeValid(value)) {
                  return Promise.reject(t('validations.invalid-tax-code'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input minLength={16} maxLength={16} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item label={t('members.form.email')} name="email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('members.form.enrolledAt')}
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

      {isMinor && (
        <>
          <Col xs={24} md={12}>
            <Form.Item
              label={t('members.form.parent.taxCode')}
              name={['parent', 'taxCode']}
              rules={[
                { required: true, message: t('validations.required')! },
                {
                  validator(_rule, value?: string) {
                    if (!value || !isTaxCodeValid(value)) {
                      return Promise.reject(t('validations.invalid-tax-code'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input minLength={16} maxLength={16} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={t('members.form.parent.name')}
              name={['parent', 'name']}
              rules={[{ required: true, message: t('validations.required')! }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={t('members.form.parent.surname')}
              name={['parent', 'surname']}
              rules={[{ required: true, message: t('validations.required')! }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </>
      )}

      <Col xs={24} md={12}>
        <Form.Item label={t('members.form.address')} name="address">
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('members.form.courses')}
          name="courseIds"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <CoursePicker />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
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
