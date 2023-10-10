import Icon from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaMoneyBill, FaPen } from 'react-icons/fa';

export type ActionButton = 'edit' | 'fee';
export interface ActionButtonObject {
  button: ActionButton;
  disabled?: boolean;
}
export type ActionButtonsType = (ActionButton | ActionButtonObject)[];

const defaultProps = {
  onEdit: () => {},
  onFee: () => {},
};

type Props = {
  buttons: ActionButtonsType;
  onEdit?: () => void;
  onFee?: () => void;
};

const ActionButtons: React.FC<Props> = ({ buttons, onEdit, onFee }) => {
  const { t } = useTranslation();

  const objectButtons = React.useMemo(
    () => buttons.filter((button) => typeof button === 'object') as ActionButtonObject[],
    [buttons]
  );

  const getDisabled = React.useCallback(
    (actionButton: ActionButton, defaultDisabled = false) => {
      const button = objectButtons.find(({ button }) => button === actionButton);
      if (button && button.disabled != null) {
        return button.disabled;
      }
      return defaultDisabled;
    },
    [objectButtons]
  );

  const renderButton = React.useCallback(
    (button: ActionButton) => {
      const disabled = getDisabled(button);

      switch (button) {
        case 'edit':
          return (
            <Tooltip title={t('buttons.edit.tooltip')}>
              <Button shape="circle" icon={<Icon component={FaPen} />} onClick={onEdit} disabled={disabled} />
            </Tooltip>
          );

        case 'fee':
          return (
            <Tooltip title={t('buttons.fee.tooltip')}>
              <Button shape="circle" icon={<Icon component={FaMoneyBill} />} onClick={onFee} disabled={disabled} />
            </Tooltip>
          );

        default:
          throw new Error('not implemented buttom');
      }
    },
    [getDisabled, onEdit, onFee, t]
  );

  return (
    <Space>
      {buttons.map((button, index) => {
        const b = typeof button === 'string' ? button : button.button;
        const key = `${b}-${index}`;
        return <React.Fragment key={key}>{renderButton(b)}</React.Fragment>;
      })}
    </Space>
  );
};

ActionButtons.defaultProps = defaultProps;

export default ActionButtons;
