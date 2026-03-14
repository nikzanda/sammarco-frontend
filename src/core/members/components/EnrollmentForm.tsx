import React from 'react';
import { Checkbox, Col, Divider, Form, Input, InputNumber, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '../../../components';
import { CoursePicker, ShiftPicker } from '../../courses/components';
import { QualificationEnum } from '../../../gql/graphql';
import { SocialYearContext } from '../../../contexts';

interface Props {
  updating?: boolean;
}

const EnrollmentForm: React.FC<Props> = ({ updating = false }) => {
  const { socialYear } = React.useContext(SocialYearContext);
  const { t } = useTranslation();
  const form = Form.useFormInstance();

  return (
    <Row gutter={24}>
      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.qualification')} name={['enrollment', 'qualification']}>
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
          label={t('members.form.excludeFromCommunications')}
          name={['enrollment', 'excludeFromCommunications']}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          label={t('members.form.registrationRequestDate')}
          name={['enrollment', 'registrationRequestDate']}
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
          <DatePicker format="DD/MM/YYYY" needConfirm={false} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          label={t('members.form.registrationAcceptanceDate')}
          name={['enrollment', 'registrationAcceptanceDate']}
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
          <DatePicker format="DD/MM/YYYY" needConfirm={false} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.socialCardNumber')} name={['enrollment', 'socialCardNumber']}>
          <InputNumber
            step={1}
            precision={0}
            min={1}
            style={{ width: '100%' }}
            onChange={(value) => {
              if (updating) {
                form.setFieldValue(['enrollment', 'emptySocialCardNumber'], value == null);
              }
            }}
          />
        </Form.Item>

        {updating && (
          <Form.Item noStyle hidden name={['enrollment', 'emptySocialCardNumber']}>
            <Input />
          </Form.Item>
        )}
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.asiCardNumber')} name={['enrollment', 'asiCardNumber']}>
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.csenCardNumber')} name={['enrollment', 'csenCardNumber']}>
          <Input />
        </Form.Item>
      </Col>

      <Divider plain>{t('courses.name')}</Divider>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('members.form.courses')} name={['enrollment', 'courseIds']}>
          <CoursePicker socialYear={socialYear} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item noStyle dependencies={[['enrollment', 'courseIds']]}>
          {({ getFieldValue }) => {
            const courseIds = getFieldValue(['enrollment', 'courseIds']);

            return (
              <Form.Item label={t('members.form.shifts')} name={['enrollment', 'shiftIds']}>
                <ShiftPicker multiple queryFilters={{ courseIds, socialYear }} disabled={!courseIds} />
              </Form.Item>
            );
          }}
        </Form.Item>
      </Col>
    </Row>
  );
};

export default EnrollmentForm;
