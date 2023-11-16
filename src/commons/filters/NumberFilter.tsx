import React from 'react';
import { Button, Card, Flex, InputNumber, Space } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useTranslation } from 'react-i18next';

const NumberFilter: React.FC<FilterDropdownProps> = ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
  const { t } = useTranslation();

  return (
    <Card style={{ width: 400 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <InputNumber
          value={selectedKeys[0] as number}
          onChange={(n) => {
            setSelectedKeys(n ? [n] : []);
          }}
          style={{ width: '100%' }}
        />

        <Flex justify="space-between">
          <Button
            danger
            onClick={() => {
              setSelectedKeys([]);
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

export default NumberFilter;
