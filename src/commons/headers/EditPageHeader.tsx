import React from 'react';
import { Button, ButtonProps, Divider, Dropdown, Flex, GetProp, MenuProps, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon, { MenuOutlined } from '@ant-design/icons';
import { FaAngleLeft, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const defaultProps = {
  submitButtonProps: {},
  actions: undefined,
};

interface Props {
  title: React.ReactNode;
  entity: 'members' | 'courses' | 'fees' | 'payments';
  submitButtonProps?: Omit<ButtonProps, 'type' | 'htmlType' | 'form' | 'size' | 'icon'>;
  actions?: GetProp<MenuProps, 'items'>;
}

const EditPageHeader: React.FC<Props> = ({ title, entity, submitButtonProps, actions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <Row justify="space-between">
      <Flex gap={8} align="center">
        <Button
          shape="circle"
          size="middle"
          icon={<Icon component={FaAngleLeft} />}
          onClick={() => navigate(`/${entity}`)}
        />

        <Typography.Title level={3}>{title}</Typography.Title>
      </Flex>

      <Flex gap={8} align="center">
        <Button
          {...submitButtonProps}
          type="primary"
          htmlType="submit"
          form="form"
          size="large"
          icon={<Icon component={FaSave} />}
        >
          {t('buttons.save.label')}
        </Button>
        {actions && (
          <>
            <Divider type="vertical" />
            <Dropdown
              arrow
              trigger={['click']}
              open={open}
              onOpenChange={(open, info) => {
                if (info.source === 'trigger') {
                  setOpen(open);
                }
              }}
              menu={{ items: actions }}
            >
              <Button icon={<MenuOutlined />} type="text" />
            </Dropdown>
          </>
        )}
      </Flex>
    </Row>
  );
};

EditPageHeader.defaultProps = defaultProps;

export default EditPageHeader;
