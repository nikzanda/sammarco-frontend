import React from 'react';
import Icon from '@ant-design/icons';
import { Button, type ButtonProps, Flex, Typography } from 'antd';
import { FaAngleLeft, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  entity: 'members' | 'courses' | 'fees' | 'payments';
  submitButtonProps?: Omit<ButtonProps, 'type' | 'htmlType' | 'form' | 'size' | 'icon'>;
}

const CreatePageHeader: React.FC<Props> = ({ entity, submitButtonProps = {} }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Flex justify="space-between" align="center">
      <Flex gap={8} align="center">
        <Button shape="circle" size="middle" icon={<Icon component={FaAngleLeft} />} onClick={() => navigate(-1)} />

        <Typography.Title level={3} style={{ margin: 0 }}>
          {t(`${entity}.new`)}
        </Typography.Title>
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
      </Flex>
    </Flex>
  );
};

export default CreatePageHeader;

export type { Props as CreatePageHeaderProps };
