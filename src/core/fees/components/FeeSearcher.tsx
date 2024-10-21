import React from 'react';
import { Select, SelectProps, Typography } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { FeeFilter, FeeSearcherQuery, useFeeSearcherQuery, useFeesSearcherLazyQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  queryFilters: {},
  showCourse: true,
  onChange: () => {},
};

interface Props extends Omit<SelectProps, 'onChange'> {
  queryFilters?: FeeFilter;
  showCourse?: boolean;
  onChange?: (value: string, fee: FeeSearcherQuery['fee']) => void;
}

const FeeSearcher: React.FC<Props> = ({ value, queryFilters, showCourse, onChange, ...selectProps }) => {
  const [fetchFees, { data: feesData, loading: feesLoading, error: feesError, refetch: feesRefetch }] =
    useFeesSearcherLazyQuery({
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

  useDisplayGraphQLErrors(feesError, feeError);

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
      label: (
        <>
          {fee.name} {showCourse && <Typography.Text type="secondary">{fee.course.name}</Typography.Text>}
        </>
      ),
      value: fee.id,
    }));
    if (fee && !fees.some(({ id }) => id === fee.id)) {
      result.unshift({
        label: (
          <>
            {fee.name} {showCourse && <Typography.Text type="secondary">{fee.course.name}</Typography.Text>}
          </>
        ),
        value: fee.id,
      });
    }
    return result;
  }, [fee, fees, showCourse]);

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
      {...selectProps}
      value={value}
      onFocus={() => fetchFees()}
      options={options}
      onChange={handleChange}
      filterOption={false}
      onSearch={handleSearch}
      loading={feesLoading || feeLoading}
      showSearch
    />
  );
};

FeeSearcher.defaultProps = defaultProps;

export default FeeSearcher;
