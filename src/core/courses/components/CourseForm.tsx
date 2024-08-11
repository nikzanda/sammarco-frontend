import React from 'react';
import { Button, Col, ColorPicker, Form, Input, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { FaTrash } from 'react-icons/fa';
import { DatePicker } from '../../../components';
import { week } from '../../../commons';

const CourseForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={24}>
      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          label={t('courses.form.name')}
          // TODO: validare nome univoco
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item label={t('courses.form.color.label')} tooltip={t('courses.form.color.tooltip')} name="color">
          <ColorPicker
            presets={[
              {
                label: t('courses.form.color.recommended'),
                colors: [
                  '#F5222D',
                  '#FA8C16',
                  '#FADB14',
                  '#8BBB11',
                  '#52C41A',
                  '#13A8A8',
                  '#1677FF',
                  '#2F54EB',
                  '#722ED1',
                  '#EB2F96',
                ],
              },
            ]}
          />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Row gutter={[24, 24]}>
          {week.map(({ label, weekDay }) => (
            <Col key={weekDay} xs={24} md={8}>
              <Typography.Title level={5}>{t(`days.${label}`)}</Typography.Title>

              <Form.List name={['shifts', weekDay]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...field }) => (
                      <React.Fragment key={key}>
                        <Form.Item name={[name, 'id']} noStyle>
                          <Input type="hidden" />
                        </Form.Item>

                        <Row align="middle" gutter={12}>
                          <Col xs={21}>
                            <Form.Item
                              {...field}
                              label={t('courses.form.shift')}
                              name={[name, 'range']}
                              rules={[{ required: true }]}
                              getValueProps={(v: [number, number]) => {
                                if (v?.length) {
                                  return { value: v.map((d) => new Date(d)) };
                                }
                                return { value: [] };
                              }}
                              getValueFromEvent={(v: [Date, Date]) => {
                                if (v?.length) {
                                  return v.map((d) => d.getTime());
                                }
                                return null;
                              }}
                            >
                              <DatePicker.RangePicker
                                picker="time"
                                format="HH:mm"
                                showSecond={false}
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={1}>
                            <Button
                              shape="circle"
                              danger
                              icon={<Icon component={FaTrash} />}
                              onClick={() => remove(name)}
                            />
                          </Col>
                        </Row>
                      </React.Fragment>
                    ))}

                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t('commons.newRow')}
                    </Button>
                  </>
                )}
              </Form.List>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default CourseForm;
