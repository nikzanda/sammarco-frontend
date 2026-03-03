import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { CSVDownload } from 'react-csv';
import { format } from 'date-fns';
import { useLazyQuery } from '@apollo/client/react';
import { MembersCsvDocument, MemberSortEnum, SortDirectionEnum } from '../../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { getBirthPlace } from '../../../utils';
import { SocialYearContext } from '../../../contexts';

interface Props {
  onCancel: () => void;
}

const ExportMembersModal: React.FC<Props> = ({ onCancel }) => {
  const { socialYearLabel } = React.useContext(SocialYearContext);
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
    { label: t('members.csv.csenCardNumber'), key: 'csenCardNumber' },
    { label: t('members.csv.asiCardNumber'), key: 'asiCardNumber' },
  ];

  const [getMembers, { data: queryData, loading: queryLoading, error: queryError }] = useLazyQuery(MembersCsvDocument);

  useDisplayGraphQLErrors(queryError);

  const csvData = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.members.data.map(({ fullName, birthday, taxCode, address, currentEnrollment }) => ({
        fullName,
        taxCode,
        address,
        birthPlace: getBirthPlace(taxCode),
        birthday: format(birthday, 'dd/MM/yyyy'),
        registrationRequestDate:
          currentEnrollment?.registrationRequestDate && format(currentEnrollment.registrationRequestDate, 'dd/MM/yyyy'),
        registrationAcceptanceDate:
          currentEnrollment?.registrationAcceptanceDate &&
          format(currentEnrollment.registrationAcceptanceDate, 'dd/MM/yyyy'),
        socialYear: socialYearLabel,
        qualification: currentEnrollment?.qualification
          ? t(`members.qualification.${currentEnrollment.qualification}`)
          : '',
        socialCardNumber: currentEnrollment?.socialCardNumber,
        csenCardNumber: currentEnrollment?.csenCardNumber,
        asiCardNumber: currentEnrollment?.asiCardNumber,
      }));
    }
    return undefined;
  }, [queryData, queryError, queryLoading, socialYearLabel, t]);

  const handleExport = () => {
    getMembers({
      variables: {
        filter: {
          sortBy: MemberSortEnum.SOCIAL_CARD_NUMBER,
          sortDirection: SortDirectionEnum.ASC,
        },
      },
    });
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
      zIndex={1100}
    >
      {csvData && <CSVDownload data={csvData} headers={headers} filename={format(Date.now(), 'yyyy-MM-dd_HH:mm:ss')} />}
    </Modal>
  );
};

export default ExportMembersModal;
