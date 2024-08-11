import { Descriptions, DescriptionsProps, Divider } from 'antd';
import { format } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TIMESTAMP_FORMAT = 'dd/MM/yyyy HH:mm';

interface Props {
  updates: {
    createdAt?: number | Date;
    updatedAt?: number | Date;
  };
}

const Updates: React.FC<Props> = ({ updates }) => {
  const { t } = useTranslation();

  const items = React.useMemo(() => {
    const { createdAt, updatedAt } = updates;

    const result: DescriptionsProps['items'] = [
      {
        key: 'createdAt',
        label: t('commons.details.createdAt'),
        children: createdAt && format(createdAt, TIMESTAMP_FORMAT),
      },
      {
        key: 'updatedAt',
        label: t('commons.details.updatedAt'),
        children: updatedAt && format(updatedAt, TIMESTAMP_FORMAT),
      },
    ];
    return result;
  }, [t, updates]);

  return (
    <>
      <Divider />

      <Descriptions items={items} />
    </>
  );
};

export default Updates;
