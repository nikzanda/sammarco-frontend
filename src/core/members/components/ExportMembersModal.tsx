import React from 'react';
import { Checkbox, CheckboxProps, Divider, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { CSVDownload } from 'react-csv';
import { format } from 'date-fns';
import { useMembersCsvLazyQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const fields = ['name', 'surname', 'taxCode', 'email', 'enrolledAt', 'address', 'csenCardNumber', 'courses'];

interface Props {
  onCancel: () => void;
}

const ExportMembersModal: React.FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();

  const [checkedList, setCheckedList] = React.useState<string[]>(fields);

  const isIncluded = React.useCallback(
    (field: string) => {
      const result = checkedList.includes(field);
      return result;
    },
    [checkedList]
  );

  const options = fields.map((field) => ({
    label: t(`members.csv.${field}`),
    value: field,
  }));

  const headers = React.useMemo(() => {
    const result = fields
      .map((field) => ({
        label: t(`members.csv.${field}`),
        key: field,
      }))
      .filter(({ key }) => isIncluded(key));
    return result;
  }, [isIncluded, t]);

  const [getMembers, { data: queryData, loading: queryLoading, error: queryError }] = useMembersCsvLazyQuery({
    variables: {
      includeName: isIncluded('name'),
      includeSurname: isIncluded('surname'),
      includeTaxCode: isIncluded('taxCode'),
      includeEmail: isIncluded('email'),
      includeAddress: isIncluded('address'),
      includeCsenCardNumber: isIncluded('csenCardNumber'),
      includeCourses: isIncluded('courses'),
    },
  });

  useDisplayGraphQLErrors(queryError);

  const csvData = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.members.data.map(({ courses, ...member }) => ({
        ...member,
        courses: courses?.map(({ name }) => name).join(', '),
      }));
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? options.map(({ value }) => value) : []);
  };

  const handleExport = () => {
    if (checkedList.length > 0) {
      getMembers();
    }
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
        disabled: checkedList.length === 0,
      }}
    >
      <Checkbox
        indeterminate={checkedList.length > 0 && checkedList.length < options.length}
        onChange={onCheckAllChange}
        checked={options.length === checkedList.length}
      >
        {t('commons.checkAll')}
      </Checkbox>
      <Divider plain />
      <Checkbox.Group options={options} value={checkedList} onChange={onChange} />

      {csvData && <CSVDownload data={csvData} headers={headers} filename={format(Date.now(), 'yyyy-MM-dd_HH:mm:ss')} />}
    </Modal>
  );
};

export default ExportMembersModal;
