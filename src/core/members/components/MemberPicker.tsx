import React from 'react';
import { Select, SelectProps } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { MembersSearcherQuery, useMembersSearcherQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  value: undefined,
  disabled: false,
  allowClear: true,
  onChange: () => {},
  onClear: () => {},
};

interface Props {
  value?: string[];
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  onChange?: (value: string[], members: MembersSearcherQuery['members']['data']) => void;
  onClear?: SelectProps['onClear'];
}

const MemberPicker: React.FC<Props> = ({ value, disabled, allowClear, onChange, onClear }) => {
  const {
    data: membersData,
    loading: membersLoading,
    error: membersError,
    refetch: membersRefetch,
  } = useMembersSearcherQuery({
    variables: {
      filter: {},
    },
  });

  const {
    data: valuesData,
    loading: valuesLoading,
    error: valuesError,
  } = useMembersSearcherQuery({
    variables: {
      filter: {
        ids: value!,
      },
    },
    skip: !value,
  });

  useDisplayGraphQLErrors(membersError, valuesError);

  const members = React.useMemo(() => {
    if (!membersLoading && !membersError && membersData) {
      return membersData.members.data;
    }
    return [];
  }, [membersData, membersError, membersLoading]);

  const values = React.useMemo(() => {
    if (!valuesLoading && !valuesError && valuesData) {
      return valuesData.members.data;
    }
    return undefined;
  }, [valuesData, valuesError, valuesLoading]);

  const options = React.useMemo(() => {
    const result = members.map((member) => ({
      label: member.fullName,
      value: member.id,
    }));
    if (values) {
      const memberIds = members.map(({ id }) => id);
      result.unshift(
        ...values
          .filter(({ id }) => !memberIds.includes(id))
          .map((member) => ({
            label: member.fullName,
            value: member.id,
          }))
      );
    }
    return result;
  }, [members, values]);

  const handleSearch = useDebouncedCallback((search: string) => {
    membersRefetch({
      filter: {
        search,
      },
    });
  }, 500);

  const handleChange = (values: string[]) => {
    const selectedMembers = members.filter(({ id }) => values.includes(id));
    onChange!(values, selectedMembers);
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
      loading={membersLoading || valuesLoading}
      showSearch
      style={{ width: '100%' }}
    />
  );
};

MemberPicker.defaultProps = defaultProps;

export default MemberPicker;
