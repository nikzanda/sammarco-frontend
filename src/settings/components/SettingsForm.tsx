import React from 'react';
import { Button, ButtonProps, Col, Divider, Form, GetRef, InputNumber, Row, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { SettingsContext } from '../../contexts';

const DEFAULT_DAYS = [0, 5, 10, 15, 20, 25, 30];

const SettingsForm: React.FC = () => {
  const { settings } = React.useContext(SettingsContext);
  const { t } = useTranslation();
  const form = Form.useFormInstance();

  const [items, setItems] = React.useState<number[]>(
    [...new Set<number>([...DEFAULT_DAYS, ...settings!.daysBeforeMedicalCertificateExpiresToSendEmail])].sort(
      (a, b) => a - b
    )
  );
  const [number, setNumber] = React.useState<number | null>();
  const inputNumberRef = React.useRef<GetRef<typeof InputNumber>>(null);

  const addItem: ButtonProps['onClick'] = (e) => {
    e.preventDefault();
    setItems((currentValue) => {
      if (typeof number === 'number') {
        currentValue.push(number);
      }
      return currentValue;
    });
    if (typeof number === 'number') {
      const currentValue = form.getFieldValue('daysBeforeMedicalCertificateExpiresToSendEmail');
      form.setFieldValue(
        'daysBeforeMedicalCertificateExpiresToSendEmail',
        currentValue ? [...currentValue, number] : [number]
      );
    }
    setNumber(undefined);
    setTimeout(() => {
      inputNumberRef.current?.focus();
    }, 0);
  };

  return (
    <Row gutter={24}>
      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          name="attendancesPerMonthToSendReminder"
          label={t('settings.form.attendancesPerMonthToSendReminder.label')}
          tooltip={<span className="break-line">{t('settings.form.attendancesPerMonthToSendReminder.tooltip')}</span>}
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={31} step={1} precision={0} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          name="daysBeforeMedicalCertificateExpiresToSendEmail"
          label={t('settings.form.daysBeforeMedicalCertificateExpiresToSendEmail.label')}
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            options={items.map((day) => ({
              label: day,
              value: day,
            }))}
            // eslint-disable-next-line react/no-unstable-nested-components
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <InputNumber
                    min={0}
                    max={365}
                    step={1}
                    precision={0}
                    ref={inputNumberRef}
                    value={number}
                    onChange={setNumber}
                    onKeyDown={(e) => e.stopPropagation()}
                    style={{ width: '100%' }}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    {t('commons.add')}
                  </Button>
                </Space>
              </>
            )}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default SettingsForm;
