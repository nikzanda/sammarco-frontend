import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemberSearcherDocument,
  FeesSearcherDocument,
  RecurrenceEnum,
  FeeTypeEnum,
  FeeSortEnum,
  SortDirectionEnum,
} from '../../../gql/graphql';
import { MockLink } from '@apollo/client/testing';
import { render } from '../../../test/test-utils';
import PaymentCreateModal from './PaymentCreateModal';

// Mock receipt-pdf to avoid pdfmake in jsdom
vi.mock('../pdfs/receipt-pdf', () => ({
  default: {
    print: vi.fn().mockResolvedValue('data:application/pdf;base64,mock'),
  },
}));

const MEMBER_ID = 'member-1';
const COURSE_IDS = ['course-1'];

const memberMock: MockLink.MockedResponse = {
  request: {
    query: MemberSearcherDocument,
    variables: { id: MEMBER_ID },
  },
  result: {
    data: {
      member: {
        id: MEMBER_ID,
        fullName: 'Mario Rossi',
        email: 'mario@test.com',
      },
    },
  },
};

const feeMonthly = {
  id: 'fee-1',
  name: 'Quota mensile Karate',
  type: FeeTypeEnum.COURSE,
  amount: 50,
  recurrence: RecurrenceEnum.MONTHLY,
  reason: 'Quota corso [MESE]',
  course: { name: 'Karate' },
};

const feeAnnual = {
  id: 'fee-2',
  name: 'Quota associativa',
  type: FeeTypeEnum.MEMBERSHIP,
  amount: 30,
  recurrence: RecurrenceEnum.ANNUAL,
  reason: 'Quota associativa [ANNO]',
  course: null,
};

const feesSearcherMock: MockLink.MockedResponse = {
  request: {
    query: FeesSearcherDocument,
    variables: {
      filter: {
        courseIds: COURSE_IDS,
        sortBy: FeeSortEnum.NAME,
        sortDirection: SortDirectionEnum.ASC,
      },
    },
  },
  result: {
    data: {
      fees: {
        data: [feeMonthly, feeAnnual],
      },
    },
  },
};

const defaultMocks: MockLink.MockedResponse[] = [memberMock, feesSearcherMock];

const renderModal = (mocks = defaultMocks) => {
  const onCancel = vi.fn();
  const result = render(<PaymentCreateModal memberId={MEMBER_ID} courseIds={COURSE_IDS} onCancel={onCancel} />, {
    mocks,
  });
  return { ...result, onCancel };
};

/**
 * Opens the Ant Design Select (FeeSearcher), waits for Apollo mock to resolve,
 * and clicks the option matching the given fee name.
 *
 * Ant Design Select (rc-select):
 * - Opens dropdown on mouseDown (not click)
 * - onFocus triggers the lazy Apollo query (fetchFees)
 * - Options rendered as .ant-select-item-option elements
 * - Label is JSX so title attr is null — match by textContent
 */
const selectFee = async (feeName: string): Promise<void> => {
  const feeSelect = screen.getByRole('combobox');

  // focus + mouseDown opens the dropdown and triggers onFocus → fetchFees
  fireEvent.focus(feeSelect);
  fireEvent.mouseDown(feeSelect);

  // Wait for Apollo mock to resolve and the option to appear
  const option = await waitFor(() => {
    const options = document.querySelectorAll('.ant-select-item-option');
    const match = Array.from(options).find((el) => el.textContent?.includes(feeName));
    if (!match) {
      throw new Error(`Option containing "${feeName}" not found`);
    }
    return match;
  });
  fireEvent.click(option);
};

describe('PaymentCreateModal', () => {
  it('should render the modal with title and form fields', () => {
    renderModal();

    expect(screen.getByText('Nuovo pagamento')).toBeInTheDocument();
    expect(screen.getByText('Quota')).toBeInTheDocument();
    expect(screen.getByText('Pagato il')).toBeInTheDocument();
    expect(screen.getByText('Tipo pagamento')).toBeInTheDocument();
    expect(screen.getByText('Invia ricevuta via email')).toBeInTheDocument();
  });

  it('should have CASH selected as default payment type', () => {
    renderModal();

    const cashRadio = screen.getByLabelText('Contanti');
    expect(cashRadio).toBeChecked();
  });

  it('should have sendEmail checked by default', () => {
    renderModal();

    const sendEmailCheckbox = screen.getByRole('checkbox');
    expect(sendEmailCheckbox).toBeChecked();
  });

  it('should disable sendEmail when member has no email', async () => {
    const memberNoEmailMock: MockLink.MockedResponse = {
      ...memberMock,
      result: {
        data: {
          member: {
            id: MEMBER_ID,
            fullName: 'Mario Rossi',
            email: null,
          },
        },
      },
    };

    renderModal([memberNoEmailMock, feesSearcherMock]);

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    expect(screen.getByText(/socio non ha la mail/)).toBeInTheDocument();
  });

  it('should disable sendEmail when email settings are not valid', () => {
    const onCancel = vi.fn();
    render(<PaymentCreateModal memberId={MEMBER_ID} courseIds={COURSE_IDS} onCancel={onCancel} />, {
      mocks: defaultMocks,
      settings: { validEmailSettings: false },
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();

    expect(screen.getByText(/email non è configurata/)).toBeInTheDocument();
  });

  it('should show amount field disabled until a fee is selected', () => {
    renderModal();

    const amountInput = screen.getByRole('spinbutton');
    expect(amountInput).toBeDisabled();
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const { onCancel } = renderModal();
    const user = userEvent.setup();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('should render payment type radio options', () => {
    renderModal();

    expect(screen.getByLabelText('Contanti')).toBeInTheDocument();
    expect(screen.getByLabelText('Bonifico bancario')).toBeInTheDocument();
    expect(screen.getByLabelText('POS')).toBeInTheDocument();
  });

  it('should allow switching payment type', async () => {
    renderModal();
    const user = userEvent.setup();

    const bankTransferRadio = screen.getByLabelText('Bonifico bancario');
    await user.click(bankTransferRadio);

    expect(bankTransferRadio).toBeChecked();
    expect(screen.getByLabelText('Contanti')).not.toBeChecked();
  });

  it('should auto-populate amount and reason when a fee is selected', async () => {
    renderModal();

    await selectFee('Quota mensile Karate');

    // Amount should be auto-populated with the fee amount
    await waitFor(() => {
      const amountInput = screen.getByRole('spinbutton');
      expect(amountInput).toHaveValue('50,00');
      expect(amountInput).not.toBeDisabled();
    });

    // Reason (textarea) should be auto-populated with placeholder replaced
    const reasonTextarea = document.querySelector<HTMLTextAreaElement>('textarea#reason');
    expect(reasonTextarea).not.toBeDisabled();
    expect(reasonTextarea!.value).toContain('Quota corso');
    // [MESE] placeholder should have been replaced (not literally present)
    expect(reasonTextarea!.value).not.toContain('[MESE]');
  });

  it('should show month picker when a MONTHLY fee is selected', async () => {
    renderModal();

    await selectFee('Quota mensile Karate');

    await waitFor(() => {
      expect(screen.getByText('Mese')).toBeInTheDocument();
    });
  });

  it('should show year picker when an ANNUAL fee is selected', async () => {
    renderModal();

    await selectFee('Quota associativa');

    await waitFor(() => {
      expect(screen.getByText('Anno sociale')).toBeInTheDocument();
    });
  });
});
