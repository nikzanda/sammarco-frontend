import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { CSVDownload } from 'react-csv';
import { format } from 'date-fns';
import { useMembersCsvLazyQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

interface Props {
  onCancel: () => void;
}

const ExportMembersModal: React.FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();

  const headers = [
    { label: t('members.csv.name'), key: 'name' },
    { label: t('members.csv.surname'), key: 'surname' },
    { label: t('members.csv.taxCode'), key: 'taxCode' },
    { label: t('members.csv.csenCardNumber'), key: 'csenCardNumber' },
  ];

  const [getMembers, { data: queryData, loading: queryLoading, error: queryError }] = useMembersCsvLazyQuery();

  useDisplayGraphQLErrors(queryError);

  const csvData = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.members.data;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const handleExport = () => {
    getMembers();
  };

  return (
    <Modal
      title={t('commons.export.title')}
      open
      onCancel={onCancel}
      okText={t('commons.export.button')}
      okButtonProps={{
        loading: queryLoading,
        onClick: handleExport,
      }}
    >
      {csvData && <CSVDownload data={csvData} headers={headers} filename={format(Date.now(), 'yyyy-MM-dd_HH:mm:ss')} />}
    </Modal>
  );
};

export default ExportMembersModal;
