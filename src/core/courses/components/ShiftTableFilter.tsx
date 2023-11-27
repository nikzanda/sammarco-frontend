import React from 'react';
import { Button, Card, Flex, Space } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useTranslation } from 'react-i18next';
import ShiftPicker from './ShiftPicker';

const ShiftTableFilter: React.FC<FilterDropdownProps> = ({ selectedKeys, confirm, clearFilters, setSelectedKeys }) => {
  const { t } = useTranslation();

  const onChange = (values: string[]) => {
    setSelectedKeys(values);
  };

  return (
    <Card style={{ width: 400 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ShiftPicker value={selectedKeys as string[]} onChange={onChange} />

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

export default ShiftTableFilter;
