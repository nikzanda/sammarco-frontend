import React from 'react';
import { App, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaSync } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { useMembersSyncLazyQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const { REACT_APP_GRAPHQLURI, REACT_APP_BASENAME } = process.env;

const getEndpoint = (uri: string, year: number) => {
  if (!uri.includes(year.toString())) {
    return uri;
  }

  const currentYear = new Date().getFullYear();
  const result = uri.replace(year.toString(), currentYear.toString());
  return result;
};

interface Props {
  selectedIds: string[];
}

const SyncButton: React.FC<Props> = ({ selectedIds }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const { message } = App.useApp();

  const [getMembers, { error: queryError }] = useMembersSyncLazyQuery();

  useDisplayGraphQLErrors(queryError);

  const sync = async () => {
    if (selectedIds.length === 0) {
      return;
    }

    setLoading(true);

    const { data: queryData } = await getMembers({
      variables: {
        ids: selectedIds,
      },
    });

    if (!queryData || queryData.members.data.length === 0) {
      setLoading(false);
      return;
    }

    const {
      members: { data: members },
    } = queryData;

    const endpoint = getEndpoint(REACT_APP_GRAPHQLURI!, parseInt(REACT_APP_BASENAME!, 10));
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
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    if (data.data) {
      message.success(t('members.sync.success', { count: members.length }));
    } else if (data.errors) {
      message.error(t('members.sync.error'));
    }

    setLoading(false);
  };

  return (
    <Popconfirm title={t('members.sync.title')} onConfirm={() => sync()}>
      <Button size="large" icon={<Icon component={FaSync} />} disabled={selectedIds.length === 0} loading={loading}>
        {t('buttons.sync.label')}
      </Button>
    </Popconfirm>
  );
};

export default SyncButton;
