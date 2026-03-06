import React from 'react';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';
import { useMutation } from '@apollo/client/react';
import { PaymentSendReceiptDocument } from '../gql/graphql';
import PDF from '../core/payments/pdfs/receipt-pdf';

interface UsePaymentSendOptions {
  refetchQueries: string[];
}

interface UsePaymentSendReturn {
  sendingIds: string[];
  sendError: ReturnType<typeof useMutation>[1]['error'];
  handlePrint: (paymentId: string) => void;
  handleSend: (paymentId: string) => Promise<void>;
}

const usePaymentSend = ({ refetchQueries }: UsePaymentSendOptions): UsePaymentSendReturn => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [sendingIds, setSendingIds] = React.useState<string[]>([]);

  const [sendEmail, { error: sendError }] = useMutation(PaymentSendReceiptDocument, {
    refetchQueries,
    onCompleted: () => {
      message.success(t('payments.sent'));
    },
  });

  const handlePrint = React.useCallback((paymentId: string): void => {
    PDF.print(paymentId);
  }, []);

  const handleSend = React.useCallback(
    async (paymentId: string): Promise<void> => {
      const attachmentUri = await PDF.print(paymentId, 'data-url');
      if (!attachmentUri) {
        message.error(t('payments.printError'));
        return;
      }

      setSendingIds((prev) => [...prev, paymentId]);

      sendEmail({
        variables: {
          input: {
            id: paymentId,
            attachmentUri,
          },
        },
      }).finally(() => {
        setSendingIds((prev) => prev.filter((id) => id !== paymentId));
      });
    },
    [message, sendEmail, t]
  );

  return { sendingIds, sendError, handlePrint, handleSend };
};

export default usePaymentSend;
