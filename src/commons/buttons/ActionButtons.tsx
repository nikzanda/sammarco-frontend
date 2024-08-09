import React from 'react';
import Icon from '@ant-design/icons';
import { Badge, Button, Popconfirm, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaBell, FaCalendarCheck, FaClone, FaMoneyBill, FaPaperPlane, FaPen, FaPrint } from 'react-icons/fa';

export type ActionButton = 'edit' | 'clone' | 'print' | 'send' | 'fee' | 'attendance' | 'reminder';
export interface ActionButtonObject {
  button: ActionButton;
  disabled?: boolean;
  printed?: boolean;
  sent?: boolean;
  sentRemindersCount?: number;
}
export type ActionButtonsType = (ActionButton | ActionButtonObject)[];

const defaultProps = {
  onEdit: () => {},
  onClone: () => {},
  onPrint: () => {},
  onSend: () => {},
  onFee: () => {},
  onAttendance: () => {},
  onReminder: () => {},
};

interface Props {
  buttons: ActionButtonsType;
  onEdit?: () => void;
  onClone?: () => void;
  onPrint?: () => void;
  onSend?: () => void;
  onFee?: () => void;
  onAttendance?: () => void;
  onReminder?: () => void;
}

const ActionButtons: React.FC<Props> = ({
  buttons,
  onEdit,
  onClone,
  onPrint,
  onSend,
  onFee,
  onAttendance,
  onReminder,
}) => {
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

  const getPrinted = React.useCallback(
    (actionButton: ActionButton, defaultPrinted = undefined) => {
      const button = objectButtons.find(({ button }) => button === actionButton);
      if (button && button.printed != null) {
        return button.printed;
      }
      return defaultPrinted;
    },
    [objectButtons]
  );

  const getSent = React.useCallback(
    (actionButton: ActionButton, defaultSent = undefined) => {
      const button = objectButtons.find(({ button }) => button === actionButton);
      if (button && button.sent != null) {
        return button.sent;
      }
      return defaultSent;
    },
    [objectButtons]
  );

  const getSentRemindersCount = React.useCallback(
    (actionButton: ActionButton, defaultSentRemindersCount = undefined) => {
      const button = objectButtons.find(({ button }) => button === actionButton);
      if (button && button.sentRemindersCount != null) {
        return button.sentRemindersCount;
      }
      return defaultSentRemindersCount;
    },
    [objectButtons]
  );

  const renderButton = React.useCallback(
    (button: ActionButton) => {
      const disabled = getDisabled(button);
      const printed = getPrinted(button);
      const sent = getSent(button);
      const sentRemindersCount = getSentRemindersCount(button);

      switch (button) {
        case 'edit':
          return (
            <Tooltip title={t('buttons.edit.tooltip')}>
              <Button shape="circle" icon={<Icon component={FaPen} />} onClick={onEdit} disabled={disabled} />
            </Tooltip>
          );

        case 'clone':
          return (
            <Tooltip title={t('buttons.clone.tooltip')}>
              <Button shape="circle" icon={<Icon component={FaClone} />} onClick={onClone} disabled={disabled} />
            </Tooltip>
          );

        case 'print':
          return (
            <Tooltip title={t('buttons.print.tooltip')}>
              <Badge dot={typeof printed === 'boolean'} color={printed ? 'green' : 'red'}>
                <Button shape="circle" icon={<Icon component={FaPrint} />} onClick={onPrint} disabled={disabled} />
              </Badge>
            </Tooltip>
          );

        case 'send':
          return (
            <Tooltip title={t('buttons.send.tooltip')} placement="bottom">
              <Popconfirm
                title={t('buttons.send.confirm.title')}
                description={t('buttons.send.confirm.description')}
                onConfirm={onSend}
                disabled={disabled}
              >
                <Badge dot={typeof sent === 'boolean'} color={sent ? 'green' : 'red'}>
                  <Button shape="circle" icon={<Icon component={FaPaperPlane} />} disabled={disabled} />
                </Badge>
              </Popconfirm>
            </Tooltip>
          );

        case 'fee':
          return (
            <Tooltip title={t('buttons.fee.tooltip')}>
              <Button shape="circle" icon={<Icon component={FaMoneyBill} />} onClick={onFee} disabled={disabled} />
            </Tooltip>
          );

        case 'reminder':
          return (
            <Tooltip title={t('buttons.reminder.tooltip')}>
              <Badge count={sentRemindersCount}>
                <Button shape="circle" icon={<Icon component={FaBell} />} onClick={onReminder} disabled={disabled} />
              </Badge>
            </Tooltip>
          );

        case 'attendance':
          return (
            <Tooltip title={t('buttons.attendance.tooltip')}>
              <Button
                shape="circle"
                icon={<Icon component={FaCalendarCheck} />}
                onClick={onAttendance}
                disabled={disabled}
              />
            </Tooltip>
          );

        default:
          throw new Error('not implemented buttom');
      }
    },
    [
      getDisabled,
      getPrinted,
      getSent,
      getSentRemindersCount,
      onAttendance,
      onClone,
      onEdit,
      onFee,
      onPrint,
      onReminder,
      onSend,
      t,
    ]
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
