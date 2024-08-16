import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { CSVDownload } from 'react-csv';
import { format } from 'date-fns';
import { MemberSortEnum, SortDirectionEnum, useMembersCsvLazyQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { getYears } from '../../../utils/utils';
import { getBirthPlace } from '../../../utils';

interface Props {
  onCancel: () => void;
}

const socialYear = (() => {
  const [first, second] = getYears();
  const result = `${first}/${second % 100}`;
  return result;
})();

const ExportMembersModal: React.FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();

  const headers = [
    { label: t('members.csv.socialCardNumber'), key: 'socialCardNumber' },
    { label: t('members.csv.registrationRequestDate'), key: 'registrationRequestDate' },
    { label: t('members.csv.registrationAcceptanceDate'), key: 'registrationAcceptanceDate' },
    { label: t('members.csv.fullName'), key: 'fullName' },
    { label: t('members.csv.birthday'), key: 'birthday' },
    { label: t('members.csv.birthPlace'), key: 'birthPlace' },
    { label: t('members.csv.taxCode'), key: 'taxCode' },
    { label: t('members.csv.address'), key: 'address' },
    { label: t('members.csv.qualification'), key: 'qualification' },
    { label: t('members.csv.socialYear'), key: 'socialYear' },
    { label: t('members.csv.paidMembershipFee'), key: 'paidMembershipFee' },
    { label: t('members.csv.csenCardNumber'), key: 'csenCardNumber' },
    { label: t('members.csv.asiCardNumber'), key: 'asiCardNumber' },
  ];

  const [getMembers, { data: queryData, loading: queryLoading, error: queryError }] = useMembersCsvLazyQuery({
    variables: {
      years: getYears(),
      filter: {
        sortBy: MemberSortEnum.REGISTRATION_REQUEST_DATE,
        sortDirection: SortDirectionEnum.ASC,
      },
    },
  });

  useDisplayGraphQLErrors(queryError);

  const csvData = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.members.data.map(
        ({ registrationRequestDate, registrationAcceptanceDate, birthday, taxCode, qualification, ...member }) => ({
          ...member,
          taxCode,
          birthPlace: getBirthPlace(taxCode),
          birthday: format(birthday, 'dd/MM/yyyy'),
          registrationRequestDate: registrationRequestDate && format(registrationRequestDate, 'dd/MM/yyyy'),
          registrationAcceptanceDate: registrationAcceptanceDate && format(registrationAcceptanceDate, 'dd/MM/yyyy'),
          socialYear,
          qualification: t(`members.qualification.${qualification}`),
        })
      );
    }
    return undefined;
  }, [queryData, queryError, queryLoading, t]);

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
