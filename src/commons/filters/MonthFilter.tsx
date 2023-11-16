import React from 'react';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useTranslation } from 'react-i18next';
import { Button, Card, Flex, Space } from 'antd';
import { format } from 'date-fns';
import { DatePicker } from '../../components';

const MonthFilter: React.FC<FilterDropdownProps> = ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
  const { t } = useTranslation();

  const value = React.useMemo(() => {
    if (selectedKeys.length > 0) {
      return [new Date(selectedKeys[0] as string)];
    }
    return undefined;
  }, [selectedKeys]);

  const onChange = (value: Date | null) => {
    setSelectedKeys(value ? [format(value, 'yyyy-MM')] : []);
  };

  return (
    <Card style={{ width: 400 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <DatePicker
          value={value as any}
          picker="month"
          style={{ width: '100%' }}
          onChange={(value) => onChange(value)}
        />

        <Flex justify="space-between">
          <Button
            danger
            onClick={() => {
              if (clearFilters) {
                clearFilters();
                confirm();
              }
            }}
          >
            {t('commons.resetFilter')}
          </Button>
          <Button type="primary" onClick={() => confirm()}>
            {t('commons.search')}
          </Button>
        </Flex>
      </Space>
    </Card>
  );
};

export default MonthFilter;
