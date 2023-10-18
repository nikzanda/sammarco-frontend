import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '../../../components';
import { useCoursesSearcherQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { isTaxCodeValid, isMinor as isMinorFn } from '../helpers';

type Props = {
  form: FormInstance<any>;
};

const MemberForm: React.FC<Props> = ({ form }) => {
  const { t } = useTranslation();
  const taxCode = Form.useWatch('taxCode', form);

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

  const isMinor = React.useMemo(() => {
    if (taxCode && isTaxCodeValid(taxCode)) {
      return isMinorFn(taxCode);
    }
    return false;
  }, [taxCode]);

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
              validator(_rule, value?: string) {
                if (!value || !isTaxCodeValid(value)) {
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

      {isMinor && (
        <>
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
