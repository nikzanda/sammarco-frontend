import React from 'react';
import { App, Result, Skeleton, Space, Spin, Tabs, Form, FormProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPrint, FaTrash } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { useFeeDeleteMutation, useFeeQuery, useFeeUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { FeeForm } from './components';
import PDF from '../payments/pdfs/receipt-pdf';
import { EditPageHeader, Updates } from '../../commons';
import { getURLTab, setURLTab } from '../../utils';

const DEFAULT_TAB = 'details';

const FeeEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message, modal } = App.useApp();

  const [tab, setTab] = React.useState(getURLTab() || DEFAULT_TAB);

  React.useEffect(() => {
    setURLTab(getURLTab() || DEFAULT_TAB);
  }, []);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useFeeQuery({
    variables: {
      id: id!,
    },
  });

  const [updateFee, { loading: updateLoading, error: updateError }] = useFeeUpdateMutation({
    refetchQueries: ['Fees', 'Fee'],
    onCompleted: () => {
      message.success(t('fees.edited'));
    },
  });

  const [deleteFee, { loading: deleteLoading, error: deleteError }] = useFeeDeleteMutation({
    refetchQueries: ['Fees'],
    onCompleted: () => {
      message.success(t('fees.deleted'));
      navigate('/fees');
    },
  });

  useDisplayGraphQLErrors(queryError, updateError, deleteError);

  const fee = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.fee;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const title = React.useMemo(() => {
    if (!fee) {
      return <Spin />;
    }
    return fee.name;
  }, [fee]);

  const initialValues = React.useMemo(() => {
    if (fee) {
      const result = {
        ...fee,
        courseId: fee.course?.id,
      };
      return result;
    }
    return undefined;
  }, [fee]);

  const handleDelete = () => {
    deleteFee({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  };

  const handlePrint = () => {
    PDF.printFacSimile(fee!);
  };

  const handleFinish: FormProps['onFinish'] = (values) => {
    const { courseId, ...input } = values;

    updateFee({
      variables: {
        input: {
          id: id!,
          ...input,
        },
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <EditPageHeader
        title={title}
        submitButtonProps={{
          loading: updateLoading,
        }}
        actions={[
          {
            key: 'print',
            label: t('buttons.printFacSimile.label'),
            icon: <Icon component={FaPrint} />,
            onClick: () => handlePrint(),
          },
          {
            key: 'delete',
            label: t('buttons.delete.label'),
            disabled: !fee?.canDelete,
            icon: <Icon component={FaTrash} spin={deleteLoading} />,
            danger: true,
            onClick: () => {
              modal.confirm({
                title: t('fees.delete.description', { name: fee?.name }),
                content: t('fees.delete.confirm'),
                onOk: () => handleDelete(),
              });
            },
          },
        ]}
      />

      {queryLoading && <Skeleton active />}
      {queryError && <Result status="500" title="500" subTitle={t('errors.somethingWentWrong')} />}
      {fee && (
        <Tabs
          activeKey={tab}
          onChange={(newTab) => {
            setURLTab(newTab);
            setTab(newTab);
          }}
          items={[
            {
              label: t('fees.tab.details'),
              key: 'details',
              children: (
                <>
                  <Form
                    id="form"
                    initialValues={initialValues}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleFinish}
                  >
                    <FeeForm fee={fee} />
                  </Form>

                  <Updates updates={fee} />
                </>
              ),
            },
          ]}
        />
      )}
    </Space>
  );
};

export default FeeEditPage;
