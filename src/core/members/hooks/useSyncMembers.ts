import React from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { useMutation } from '@apollo/client/react';
import { MembersSyncDocument, MemberUpdateManyDocument } from '../../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { getRealCurrentYears } from '../../../utils';

const REACT_APP_GRAPHQLURI = import.meta.env.VITE_GRAPHQLURI;
const REACT_APP_SOCIAL_YEAR = import.meta.env.VITE_SOCIAL_YEAR;

const getEndpoint = (uri: string, instanceSocialYear: number) => {
  if (!uri.includes(instanceSocialYear.toString())) {
    return uri;
  }

  const [currentSocialYear] = getRealCurrentYears();

  const result = uri.replace(instanceSocialYear.toString(), currentSocialYear.toString());
  return result;
};

const useSyncMembers = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [loading, setLoading] = React.useState(false);

  const [getMembers, { error: queryError }] = useLazyQuery(MembersSyncDocument);
  const [updateMembers] = useMutation(MemberUpdateManyDocument);

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

    await updateMembers({
      variables: {
        input: {
          ids: selectedIds,
          skipMedicalCertificateExpirationEmail: true,
        },
      },
    }).catch(() => {});

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
