import React from 'react';
import { Button, ButtonProps, Divider, Dropdown, Flex, GetProp, MenuProps, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon, { MoreOutlined } from '@ant-design/icons';
import { FaAngleLeft, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const defaultProps = {
  submitButtonProps: {},
  actions: undefined,
  extra: undefined,
};

interface Props {
  title: React.ReactNode;
  submitButtonProps?: Omit<ButtonProps, 'type' | 'htmlType' | 'form' | 'size' | 'icon'>;
  actions?: GetProp<MenuProps, 'items'>;
  extra?: React.ReactNode;
}

const EditPageHeader: React.FC<Props> = ({ title, submitButtonProps, actions, extra }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <Row justify="space-between">
      <Flex gap={8} align="center">
        <Button shape="circle" size="middle" icon={<Icon component={FaAngleLeft} />} onClick={() => navigate(-1)} />

        <Typography.Title level={3}>{title}</Typography.Title>
      </Flex>

      <Flex gap={8} align="center">
        {extra && (
          <>
            {extra}
            <Divider type="vertical" />
          </>
        )}
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
              <Button size="large" icon={<MoreOutlined />} />
            </Dropdown>
          </>
        )}
      </Flex>
    </Row>
  );
};

EditPageHeader.defaultProps = defaultProps;

export default EditPageHeader;
