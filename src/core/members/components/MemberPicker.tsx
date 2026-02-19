import React from 'react';
import { Select, SelectProps } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import { MembersSearcherDocument, MembersSearcherQuery } from '../../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

interface Props extends Omit<SelectProps, 'onChange'> {
  value?: string[];
  onChange?: (value: string[], members: MembersSearcherQuery['members']['data']) => void;
}

const MemberPicker: React.FC<Props> = ({ value = undefined, onChange = () => {}, ...selectProps }) => {
  const [fetchMembers, { data: membersData, loading: membersLoading, error: membersError, refetch: membersRefetch }] =
    useLazyQuery(MembersSearcherDocument);

  const {
    data: valuesData,
    loading: valuesLoading,
    error: valuesError,
  } = useQuery(MembersSearcherDocument, {
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
      {...selectProps}
      mode="multiple"
      value={value}
      onFocus={() => fetchMembers({ variables: { filter: {} } })}
      options={options}
      onChange={handleChange}
      showSearch={{ filterOption: false, onSearch: handleSearch }}
      loading={membersLoading || valuesLoading}
      style={{ width: '100%' }}
    />
  );
};

export default MemberPicker;

export type { Props as MemberPickerProps };
