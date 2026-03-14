import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { MockLink } from '@apollo/client/testing';
import { PaymentSendReceiptDocument } from '../gql/graphql';
import { createTestProviders } from '../test/test-utils';
import usePaymentSend from './usePaymentSend';

// Mock receipt-pdf
vi.mock('../core/payments/pdfs/receipt-pdf', () => ({
  default: {
    print: vi.fn(),
  },
}));

import PDF from '../core/payments/pdfs/receipt-pdf';

const PAYMENT_ID = 'payment-1';

const sendReceiptMock: MockLink.MockedResponse = {
  request: {
    query: PaymentSendReceiptDocument,
    variables: () => true,
  },
  maxUsageCount: Infinity,
  result: {
    data: {
      paymentSendReceipt: true,
    },
  },
};

describe('usePaymentSend', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state with empty sendingIds', () => {
    const { result } = renderHook(() => usePaymentSend({ refetchQueries: ['Payments'] }), {
      wrapper: createTestProviders({ mocks: [sendReceiptMock] }),
    });

    expect(result.current.sendingIds).toEqual([]);
    expect(result.current.sendError).toBeUndefined();
    expect(typeof result.current.handlePrint).toBe('function');
    expect(typeof result.current.handleSend).toBe('function');
  });

  it('should call PDF.print when handlePrint is called', () => {
    const { result } = renderHook(() => usePaymentSend({ refetchQueries: ['Payments'] }), {
      wrapper: createTestProviders({ mocks: [sendReceiptMock] }),
    });

    act(() => {
      result.current.handlePrint(PAYMENT_ID);
    });

    expect(PDF.print).toHaveBeenCalledWith(PAYMENT_ID);
  });

  it('should not add to sendingIds when PDF.print returns null', async () => {
    vi.mocked(PDF.print).mockResolvedValueOnce(null);

    const { result } = renderHook(() => usePaymentSend({ refetchQueries: ['Payments'] }), {
      wrapper: createTestProviders({ mocks: [sendReceiptMock] }),
    });

    await act(async () => {
      await result.current.handleSend(PAYMENT_ID);
    });

    // Should NOT have added to sendingIds since PDF failed
    expect(result.current.sendingIds).toEqual([]);
  });

  it('should call PDF.print with data-url mode on handleSend', async () => {
    vi.mocked(PDF.print).mockResolvedValueOnce('data:application/pdf;base64,mock');

    const { result } = renderHook(() => usePaymentSend({ refetchQueries: ['Payments'] }), {
      wrapper: createTestProviders({ mocks: [sendReceiptMock] }),
    });

    await act(async () => {
      await result.current.handleSend(PAYMENT_ID);
    });

    expect(PDF.print).toHaveBeenCalledWith(PAYMENT_ID, 'data-url');
  });

  it('should remove paymentId from sendingIds after send completes', async () => {
    vi.mocked(PDF.print).mockResolvedValueOnce('data:application/pdf;base64,mock');

    const { result } = renderHook(() => usePaymentSend({ refetchQueries: ['Payments'] }), {
      wrapper: createTestProviders({ mocks: [sendReceiptMock] }),
    });

    await act(async () => {
      await result.current.handleSend(PAYMENT_ID);
    });

    await waitFor(() => {
      expect(result.current.sendingIds).toEqual([]);
    });
  });
});
