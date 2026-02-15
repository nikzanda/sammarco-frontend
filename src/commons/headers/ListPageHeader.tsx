import React from 'react';
import { Button, Divider, Dropdown, Flex, Typography, type GetProp, type MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import Icon, { MoreOutlined } from '@ant-design/icons';
import { FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface Props {
  entity: 'members' | 'courses' | 'fees' | 'payments';
  hideCreateButton?: boolean;
  actions?: GetProp<MenuProps, 'items'>;
}

const ListPageHeader: React.FC<Props> = ({ entity, hideCreateButton = false, actions = [] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={3} style={{ margin: 0 }}>
        {t(`${entity}.name`)}
      </Typography.Title>

      <Flex gap={8} align="center">
        {!hideCreateButton && (
          <Button
            size="large"
            type="primary"
            icon={<Icon component={FaPlus} />}
            onClick={() => navigate(`/${entity}/new`)}
          >
            {t(`${entity}.new`)}
          </Button>
        )}
        {actions && actions.length > 0 && (
          <>
            {!hideCreateButton && <Divider type="vertical" />}
            <Dropdown
              arrow
              trigger={['click']}
              open={open}
              onOpenChange={(newOpen, info) => {
                if (info.source === 'trigger') {
                  setOpen(newOpen);
                }
              }}
              menu={{ items: actions }}
            >
              <Button size="large" icon={<MoreOutlined />} />
            </Dropdown>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ListPageHeader;

export type { Props as ListPageHeaderProps };
