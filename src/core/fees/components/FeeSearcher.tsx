import { Select, SelectProps } from 'antd';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FeeFilter, FeeSearcherQuery, useFeeSearcherQuery, useFeesSearcherQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  value: undefined,
  queryFilters: {},
  disabled: false,
  allowClear: true,
  onChange: () => {},
  onClear: () => {},
};

type Props = {
  value?: string;
  queryFilters?: FeeFilter;
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  onChange?: (value: string, fee: FeeSearcherQuery['fee']) => void;
  onClear?: SelectProps['onClear'];
};

const FeeSearcher: React.FC<Props> = ({ value, queryFilters, disabled, allowClear, onChange, onClear }) => {
  const {
    data: feesData,
    loading: feesLoading,
    error: feesError,
    refetch: feesRefetch,
  } = useFeesSearcherQuery({
    variables: {
      filter: queryFilters,
    },
  });

  const {
    data: feeData,
    loading: feeLoading,
    error: feeError,
  } = useFeeSearcherQuery({
    variables: {
      id: value!,
    },
    skip: !value,
  });

  useDisplayGraphQLErrors([feesError, feeError]);

  const fees = React.useMemo(() => {
    if (!feesLoading && !feesError && feesData) {
      return feesData.fees.data;
    }
    return [];
  }, [feesData, feesError, feesLoading]);

  const fee = React.useMemo(() => {
    if (!feeLoading && !feeError && feeData) {
      return feeData.fee;
    }
    return undefined;
  }, [feeData, feeError, feeLoading]);

  const options = React.useMemo(() => {
    const result = fees.map((fee) => ({
      label: fee.name,
      value: fee.id,
    }));
    if (fee && !fees.some(({ id }) => id === fee.id)) {
      result.unshift({
        label: fee.name,
        value: fee.id,
      });
    }
    return result;
  }, [fee, fees]);

  const handleSearch = useDebouncedCallback((search: string) => {
    feesRefetch({
      filter: {
        name: search,
        ...queryFilters,
      },
    });
  }, 500);

  const handleChange = (value: string) => {
    const selectedFee = fees.find(({ id }) => id === value);
    onChange!(value, selectedFee!);
  };

  return (
    <Select
      value={value}
      options={options}
      allowClear={allowClear}
      disabled={disabled}
      onChange={handleChange}
      onClear={onClear}
      filterOption={false}
      onSearch={handleSearch}
      loading={feesLoading || feeLoading}
      showSearch
    />
  );
};

FeeSearcher.defaultProps = defaultProps;

export default FeeSearcher;
