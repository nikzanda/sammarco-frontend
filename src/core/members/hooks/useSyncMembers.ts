import React from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMembersSyncLazyQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const { REACT_APP_GRAPHQLURI, REACT_APP_SOCIAL_YEAR } = process.env;

const getEndpoint = (uri: string, year: number) => {
  if (!uri.includes(year.toString())) {
    return uri;
  }

  const result = uri.replace(year.toString(), (year + 1).toString());
  return result;
};

const useSyncMembers = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [loading, setLoading] = React.useState(false);

  const [getMembers, { error: queryError }] = useMembersSyncLazyQuery();

  useDisplayGraphQLErrors(queryError);

  const sync = async (selectedIds: string[]) => {
    if (selectedIds.length === 0) {
      return false;
    }

    setLoading(true);

    const { data: queryData } = await getMembers({
      variables: {
        ids: selectedIds,
      },
    });

    if (!queryData || queryData.members.data.length === 0) {
      setLoading(false);
      return false;
    }

    const {
      members: { data: members },
    } = queryData;

    const endpoint = getEndpoint(REACT_APP_GRAPHQLURI!, parseInt(REACT_APP_SOCIAL_YEAR!, 10));
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const graphqlQuery = {
      operationName: 'MemberCreateMany',
      query:
        'mutation MemberCreateMany($input: [MemberCreateManyInput!]!) {\n  memberCreateMany(input: $input) {\n    members {\n      id\n      name\n    }\n  }\n}',
      variables: {
        input: members.map(({ __typename, parent, courses, medicalCertificate, ...member }) => ({
          ...member,
          courseIds: courses.map(({ id }) => id),
          ...(parent && {
            parent: {
              name: parent.name,
              surname: parent.surname,
              taxCode: parent.taxCode,
            },
          }),
          ...(medicalCertificate && {
            medicalCertificate: {
              base64: medicalCertificate.base64,
              expireAt: medicalCertificate.expireAt,
            },
          }),
        })),
      },
    };

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(graphqlQuery),
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    setLoading(false);

    if (data.data) {
      message.success(t('members.sync.success', { count: members.length }));
      return true;
    }

    if (data.errors) {
      message.error(t('members.sync.error'));
      return false;
    }

    return false;
  };

  return { sync, loading };
};

export default useSyncMembers;
