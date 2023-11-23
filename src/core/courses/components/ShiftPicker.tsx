import React from 'react';
import { TreeSelect, TreeSelectProps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { format, set } from 'date-fns';
import { ShiftFilter, ShiftsQuery, useShiftsQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const week = [
  { label: 'monday', weekDay: 1 },
  { label: 'tuesday', weekDay: 2 },
  { label: 'wednesday', weekDay: 3 },
  { label: 'thursday', weekDay: 4 },
  { label: 'friday', weekDay: 5 },
  { label: 'saturday', weekDay: 6 },
  { label: 'sunday', weekDay: 0 },
];

const defaultProps = {
  value: undefined,
  queryFilters: undefined,
  disabled: false,
  allowClear: true,
  onChange: () => {},
  onClear: () => {},
};

type Props = {
  value?: string[];
  queryFilters?: ShiftFilter;
  disabled?: TreeSelectProps['disabled'];
  allowClear?: TreeSelectProps['allowClear'];
  onChange?: (value: string[], shifts: ShiftsQuery['shifts']) => void;
  onClear?: TreeSelectProps['onClear'];
};

const ShiftPicker: React.FC<Props> = ({ value, queryFilters, disabled, allowClear, onChange, onClear }) => {
  const { t } = useTranslation();

  const {
    data: shiftsData,
    loading: shiftsLoading,
    error: shiftsError,
  } = useShiftsQuery({
    variables: {
      ...(queryFilters && {
        filter: queryFilters,
      }),
    },
  });

  useDisplayGraphQLErrors(shiftsError);

  const shifts = React.useMemo(() => {
    if (!shiftsLoading && !shiftsError && shiftsData) {
      return shiftsData.shifts;
    }
    return [];
  }, [shiftsData, shiftsError, shiftsLoading]);

  // TODO: non mostrare in grigio (disabled) le label dei giorni della settimana
  const treeData = React.useMemo(() => {
    const result: TreeSelectProps['treeData'] = week
      .filter(({ weekDay }) => shifts.some(({ weekDay: shiftWeekDay }) => shiftWeekDay === weekDay))
      .map(({ label, weekDay }) => ({
        title: t(`days.${label}`),
        value: label,
        disabled: true,
        children: shifts
          .filter(({ weekDay: shiftWeekDay }) => shiftWeekDay === weekDay)
          .map((shift) => {
            const from = format(
              set(Date.now(), {
                hours: shift.from[0],
                minutes: shift.from[1],
              }),
              'HH:mm'
            );

            const to = format(
              set(Date.now(), {
                hours: shift.to[0],
                minutes: shift.to[1],
              }),
              'HH:mm'
            );

            return {
              value: shift.id,
              title: (
                <>
                  <Typography.Text type="secondary">{shift.course.name}</Typography.Text>: {[from, to].join(' - ')}
                </>
              ),
            };
          }),
      }));
    return result;
  }, [shifts, t]);

  const handleChange = (values: string[]) => {
    const selectedShifts = shifts.filter(({ id }) => values.includes(id));
    onChange!(values, selectedShifts);
  };

  return (
    <TreeSelect
      value={value}
      disabled={disabled}
      allowClear={allowClear}
      treeData={treeData}
      onChange={handleChange}
      onClear={onClear}
      loading={shiftsLoading}
      multiple
    />
  );
};

ShiftPicker.defaultProps = defaultProps;

export default ShiftPicker;
