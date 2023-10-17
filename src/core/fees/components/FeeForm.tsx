import { Col, Form, Input, InputNumber, Row, Switch } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CourseSearcher } from '../../courses/components';
import { FeeDetailFragment } from '../../../generated/graphql';

const defaultProps = {
  fee: undefined,
};

type Props = {
  fee?: FeeDetailFragment;
};

const FeeForm: React.FC<Props> = ({ fee }) => {
  const { t } = useTranslation();

  return (
    <Row gutter={24}>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('fees.form.name')}
          name="name"
          rules={[{ required: true, message: t('validations.required')! }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('fees.form.course')}
          name="courseId"
          rules={[{ required: true, message: t('validations.required')! }]}
        >
          <CourseSearcher disabled={!!fee} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label={t('fees.form.amount')}
          name="amount"
          rules={[{ required: true, message: t('validations.required')! }]}
        >
          <InputNumber min={0} step={1} precision={2} decimalSeparator="," addonAfter="€" style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      {!!fee && (
        <Col xs={24} md={12}>
          <Form.Item label={t('fees.form.enabled')} name="enabled" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

FeeForm.defaultProps = defaultProps;

export default FeeForm;
