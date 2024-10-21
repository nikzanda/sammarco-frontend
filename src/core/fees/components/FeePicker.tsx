import React from 'react';
import { Select, SelectProps, Typography } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import {
  FeeFilter,
  FeesSearcherQuery,
  useFeesSearcherLazyQuery,
  useFeesSearcherQuery,
} from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  value: undefined,
  queryFilters: {},
  showCourse: true,
  onChange: () => {},
};

interface Props extends Omit<SelectProps, 'onChange'> {
  value?: string[];
  queryFilters?: FeeFilter;
  showCourse?: boolean;
  onChange?: (value: string[], fees: FeesSearcherQuery['fees']['data']) => void;
}

const FeePicker: React.FC<Props> = ({ value, queryFilters, showCourse, onChange, ...selectProps }) => {
  const [fetchFees, { data: feesData, loading: feesLoading, error: feesError, refetch: feesRefetch }] =
    useFeesSearcherLazyQuery({
      variables: {
        filter: queryFilters,
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
        ...queryFilters,
      },
    });
  }, 500);

  const handleChange = (values: string[]) => {
    const selectedFees = fees.filter(({ id }) => values.includes(id));
    onChange!(values, selectedFees);
  };

  return (
    <Select
      {...selectProps}
      value={value}
      mode="multiple"
      onFocus={() => fetchFees()}
      options={options}
      onChange={handleChange}
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

export type { Props as FeePickerProps };
