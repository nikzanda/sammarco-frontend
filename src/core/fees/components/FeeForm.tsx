import { Col, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CourseSearcher } from '../../courses/components';
import { FeeDetailFragment, FeeTypeEnum, RecurrenceEnum } from '../../../gql/graphql';

interface Props {
  fee?: FeeDetailFragment;
}

const FeeForm: React.FC<Props> = ({ fee = undefined }) => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();

  const typeOptions = React.useMemo(() => {
    const result = Object.keys(FeeTypeEnum).map((type) => ({
      label: t(`fees.type.${type}`),
      value: type,
    }));
    return result;
  }, [t]);

  const recurrenceOptions = React.useMemo(() => {
    const result = Object.keys(RecurrenceEnum).map((recurrence) => ({
      label: t(`fees.recurrence.${recurrence}`),
      value: recurrence,
    }));
    return result;
  }, [t]);

  return (
    <Row gutter={24}>
      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('fees.form.name')} name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('fees.form.type')} name="type" rules={[{ required: true }]}>
          <Select options={typeOptions} disabled={!!fee} onChange={() => form.resetFields(['courseId'])} />
        </Form.Item>
      </Col>

      <Form.Item noStyle dependencies={['type']}>
        {({ getFieldValue }) => {
          const type = getFieldValue('type');
          if (type !== FeeTypeEnum.COURSE) {
            return null;
          }
          return (
            <Col xs={24} md={12} xxl={8}>
              <Form.Item label={t('fees.form.course')} name="courseId" rules={[{ required: true }]}>
                <CourseSearcher disabled={!!fee} />
              </Form.Item>
            </Col>
          );
        }}
      </Form.Item>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('fees.form.amount')} name="amount" rules={[{ required: true }]}>
          <InputNumber min={0} step={1} precision={2} decimalSeparator="," addonAfter="€" style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('fees.form.recurrence')} name="recurrence">
          <Select options={recurrenceOptions} allowClear />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          label={t('fees.form.reason.label')}
          help={t('fees.form.reason.help')}
          name="reason"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Col>

      {!!fee && (
        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('fees.form.enabled')} name="enabled" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

export default FeeForm;
