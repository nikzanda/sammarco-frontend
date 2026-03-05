import React from 'react';
import { Select, SelectProps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import {
  FeeFilter,
  FeeSearcherDocument,
  FeeSearcherQuery,
  FeesSearcherDocument,
  FeesSearcherQuery,
} from '../../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

interface Props extends Omit<SelectProps, 'onChange'> {
  queryFilters?: FeeFilter;
  showCourse?: boolean;
  onChange?: (value: string, fee: FeeSearcherQuery['fee']) => void;
}

const FeeSearcher: React.FC<Props> = ({
  value,
  queryFilters = {},
  showCourse = true,
  onChange = () => {},
  ...selectProps
}) => {
  const { t } = useTranslation();
  const [fetchFees, { data: feesData, loading: feesLoading, error: feesError, refetch: feesRefetch }] =
    useLazyQuery(FeesSearcherDocument);

  const {
    data: feeData,
    loading: feeLoading,
    error: feeError,
  } = useQuery(FeeSearcherDocument, {
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
    const feeToOption = (fee: FeesSearcherQuery['fees']['data'][number]) => ({
      label: (
        <>
          {fee.name}{' '}
          {showCourse && (
            <Typography.Text type="secondary">{fee.course?.name || t(`fees.type.${fee.type}`)}</Typography.Text>
          )}
        </>
      ),
      value: fee.id,
    });

    const result = fees.map(feeToOption);
    if (fee && !fees.some(({ id }) => id === fee.id)) {
      result.unshift(feeToOption(fee));
    }
    return result;
  }, [fee, fees, showCourse, t]);

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
      onFocus={() => fetchFees({ variables: { filter: queryFilters } })}
      options={options}
      onChange={handleChange}
      showSearch={{ filterOption: false, onSearch: handleSearch }}
      loading={feesLoading || feeLoading}
    />
  );
};

export default FeeSearcher;
