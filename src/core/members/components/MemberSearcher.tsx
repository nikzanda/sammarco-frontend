import React from 'react';
import { Select, SelectProps } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import {
  MemberFilter,
  MemberSearcherDocument,
  MemberSearcherQuery,
  MembersSearcherDocument,
} from '../../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

interface Props extends Omit<SelectProps, 'onChange'> {
  queryFilters?: MemberFilter;
  onChange?: (value: string, member: MemberSearcherQuery['member']) => void;
}

const MemberSearcher: React.FC<Props> = ({ value, queryFilters = {}, onChange = () => {}, ...selectProps }) => {
  const [fetchMembers, { data: membersData, loading: membersLoading, error: membersError, refetch: membersRefetch }] =
    useLazyQuery(MembersSearcherDocument);

  const {
    data: memberData,
    loading: memberLoading,
    error: memberError,
  } = useQuery(MemberSearcherDocument, {
    variables: {
      id: value!,
    },
    skip: !value,
  });

  useDisplayGraphQLErrors(membersError, memberError);

  const members = React.useMemo(() => {
    if (!membersLoading && !membersError && membersData) {
      return membersData.members.data;
    }
    return [];
  }, [membersData, membersError, membersLoading]);

  const member = React.useMemo(() => {
    if (!memberLoading && !memberError && memberData) {
      return memberData.member;
    }
    return undefined;
  }, [memberData, memberError, memberLoading]);

  const options = React.useMemo(() => {
    const result = members.map((member) => ({
      label: member.fullName,
      value: member.id,
    }));
    if (member && !members.some(({ id }) => id === member.id)) {
      result.unshift({
        label: member.fullName,
        value: member.id,
      });
    }
    return result;
  }, [member, members]);

  const handleSearch = useDebouncedCallback((search: string) => {
    membersRefetch({
      filter: {
        search,
        ...queryFilters,
      },
    });
  }, 500);

  const handleChange = (value: string) => {
    const selectedMember = members.find(({ id }) => id === value);
    onChange!(value, selectedMember!);
  };

  return (
    <Select
      {...selectProps}
      value={value}
      onFocus={() => fetchMembers({ variables: { filter: queryFilters } })}
      options={options}
      onChange={handleChange}
      showSearch={{ filterOption: false, onSearch: handleSearch }}
      loading={membersLoading || memberLoading}
    />
  );
};

export default MemberSearcher;
