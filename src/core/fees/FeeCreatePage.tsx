import React from 'react';
import { App, Flex, Form, FormProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { FeeCreateDocument, FeeDocument } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { FeeForm } from './components';
import { CreatePageHeader } from '../../commons';

const FeeCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = App.useApp();

  const [getFee, { data: queryData, loading: queryLoading, error: queryError }] = useLazyQuery(FeeDocument);

  const [createFee, { loading: mutationLoading, error: mutationError }] = useMutation(FeeCreateDocument, {
    refetchQueries: ['Fees', 'FeesSearcher'],
    onCompleted: () => {
      message.success(t('fees.created'));
      navigate('/fees');
    },
  });

  useDisplayGraphQLErrors(mutationError, queryError);

  React.useEffect(() => {
    if (location.state) {
      const { feeId } = location.state as { feeId: string };
      getFee({
        variables: {
          id: feeId,
        },
      });
    }
  }, [getFee, location.state]);

  const initialValues = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      const { fee } = queryData;
      return {
        name: fee.name,
        courseId: fee.course.id,
        amount: fee.amount,
        recurrence: fee.recurrence,
        reason: fee.reason,
      };
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const showForm = React.useMemo(() => {
    if (!location.state || initialValues) {
      return true;
    }

    return false;
  }, [initialValues, location.state]);

  const handleFinish: FormProps['onFinish'] = (values) => {
    createFee({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Flex vertical gap="middle">
      <CreatePageHeader entity="fees" submitButtonProps={{ loading: mutationLoading }} />

      {showForm && (
        <Form id="form" initialValues={initialValues} layout="vertical" autoComplete="off" onFinish={handleFinish}>
          <FeeForm />
        </Form>
      )}
    </Flex>
  );
};

export default FeeCreatePage;
