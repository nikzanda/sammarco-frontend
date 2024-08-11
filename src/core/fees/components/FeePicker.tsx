import React from 'react';
import { Select, SelectProps, Typography } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { FeesSearcherQuery, useFeesSearcherQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  value: undefined,
  showCourse: true,
  disabled: false,
  allowClear: true,
  onChange: () => {},
  onClear: () => {},
};

interface Props {
  value?: string[];
  showCourse?: boolean;
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  onChange?: (value: string[], fees: FeesSearcherQuery['fees']['data']) => void;
  onClear?: SelectProps['onClear'];
}

const FeePicker: React.FC<Props> = ({ value, showCourse, disabled, allowClear, onChange, onClear }) => {
  const {
    data: feesData,
    loading: feesLoading,
    error: feesError,
    refetch: feesRefetch,
  } = useFeesSearcherQuery({
    variables: {
      filter: {},
    },
  });

  const {
    data: valuesData,
    loading: valuesLoading,
    error: valuesError,
  } = useFeesSearcherQuery({
    variables: {
      filter: {
        ids: value!,
      },
    },
    skip: !value,
  });

  useDisplayGraphQLErrors(feesError, valuesError);

  const fees = React.useMemo(() => {
    if (!feesLoading && !feesError && feesData) {
      return feesData.fees.data;
    }
    return [];
  }, [feesData, feesError, feesLoading]);

  const values = React.useMemo(() => {
    if (!valuesLoading && !valuesError && valuesData) {
      return valuesData.fees.data;
    }
    return undefined;
  }, [valuesData, valuesError, valuesLoading]);

  const options = React.useMemo(() => {
    const result = fees.map((fee) => ({
      label: (
        <>
          {fee.name} {showCourse && <Typography.Text type="secondary">{fee.course.name}</Typography.Text>}
        </>
      ),
      value: fee.id,
    }));
    if (values) {
      const feeIds = fees.map(({ id }) => id);
      result.unshift(
        ...values
          .filter(({ id }) => !feeIds.includes(id))
          .map((fee) => ({
            label: (
              <>
                {fee.name} {showCourse && <Typography.Text type="secondary">{fee.course.name}</Typography.Text>}
              </>
            ),
            value: fee.id,
          }))
      );
    }
    return result;
  }, [fees, showCourse, values]);

  const handleSearch = useDebouncedCallback((search: string) => {
    feesRefetch({
      filter: {
        name: search,
      },
    });
  }, 500);

  const handleChange = (values: string[]) => {
    const selectedFees = fees.filter(({ id }) => values.includes(id));
    onChange!(values, selectedFees);
  };

  return (
    <Select
      mode="multiple"
      value={value}
      options={options}
      allowClear={allowClear}
      disabled={disabled}
      onChange={handleChange}
      onClear={onClear}
      filterOption={false}
      onSearch={handleSearch}
      loading={feesLoading || valuesLoading}
      showSearch
      style={{ width: '100%' }}
    />
  );
};

FeePicker.defaultProps = defaultProps;

export default FeePicker;
