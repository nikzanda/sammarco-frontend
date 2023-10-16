import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '../../../components';
import { useCoursesSearcherQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const MemberForm: React.FC = () => {
  const { t } = useTranslation();

  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError,
  } = useCoursesSearcherQuery({
    variables: {
      filter: {},
    },
  });

  const courses = React.useMemo(() => {
    if (!coursesLoading && !coursesError && coursesData) {
      return coursesData.courses.data;
    }
    return [];
  }, [coursesData, coursesError, coursesLoading]);

  useDisplayGraphQLErrors([coursesError]);

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
              validator(_rule, value: string) {
                if (
                  !value ||
                  value.length !== 16 ||
                  !/^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$/.test(
                    value
                  )
                ) {
                  return Promise.reject(t('validations.invalid-tax-code'));
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

      <Col xs={24} md={12}>
        <Form.Item
          label={t('members.form.courses')}
          name="courseIds"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <Select
            mode="multiple"
            options={courses.map((course) => ({ label: course.name, value: course.id }))}
            loading={coursesLoading}
            allowClear={false}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default MemberForm;
