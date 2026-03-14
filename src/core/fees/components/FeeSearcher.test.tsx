import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor, fireEvent, act } from '@testing-library/react';
import { MockLink } from '@apollo/client/testing';
import { FeesSearcherDocument, FeeSearcherDocument, FeeTypeEnum, RecurrenceEnum } from '../../../gql/graphql';
import { render } from '../../../test/test-utils';
import FeeSearcher from './FeeSearcher';

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
    variables: () => true,
  },
  maxUsageCount: Infinity,
  result: {
    data: {
      fees: {
        data: [feeMonthly, feeAnnual],
      },
    },
  },
};

const feeSearcherMock: MockLink.MockedResponse = {
  request: {
    query: FeeSearcherDocument,
    variables: () => true,
  },
  maxUsageCount: Infinity,
  result: {
    data: {
      fee: feeMonthly,
    },
  },
};

const defaultMocks: MockLink.MockedResponse[] = [feesSearcherMock, feeSearcherMock];

/**
 * Opens the Ant Design Select dropdown.
 * Ant Design Select fires onFocus which triggers fetchFees.
 */
const openDropdown = async (): Promise<void> => {
  const select = screen.getByRole('combobox');
  await act(async () => {
    fireEvent.focus(select);
    fireEvent.mouseDown(select);
  });
};

/**
 * Selects an option from the dropdown by matching text content.
 */
const selectOption = async (name: string): Promise<void> => {
  await openDropdown();

  const option = await waitFor(() => {
    const options = document.querySelectorAll('.ant-select-item-option');
    const match = Array.from(options).find((el) => el.textContent?.includes(name));
    if (!match) {
      throw new Error(`Option containing "${name}" not found`);
    }
    return match;
  });
  await act(async () => {
    fireEvent.click(option);
  });
};

describe('FeeSearcher', () => {
  it('should render a Select component', () => {
    render(<FeeSearcher />, { mocks: defaultMocks });

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should load and display fee options on focus', async () => {
    render(<FeeSearcher />, { mocks: defaultMocks });

    await openDropdown();

    await waitFor(() => {
      const options = document.querySelectorAll('.ant-select-item-option');
      expect(options.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should call onChange with selected fee data', async () => {
    const onChange = vi.fn();
    render(<FeeSearcher onChange={onChange} />, { mocks: defaultMocks });

    await selectOption('Quota mensile Karate');

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(
      'fee-1',
      expect.objectContaining({ id: 'fee-1', name: 'Quota mensile Karate' })
    );
  });

  it('should render with pre-selected value', () => {
    render(<FeeSearcher value="fee-1" />, { mocks: defaultMocks });

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
