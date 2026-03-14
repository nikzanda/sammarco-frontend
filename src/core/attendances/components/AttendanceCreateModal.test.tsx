import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockLink } from '@apollo/client/testing';
import { AttendanceCreateManyDocument, ShiftsDocument } from '../../../gql/graphql';
import { render } from '../../../test/test-utils';
import AttendanceCreateModal from './AttendanceCreateModal';

// Mock CourseSearcher to avoid complex Apollo query nesting
vi.mock('../../courses/components', () => ({
  CourseSearcher: ({ value, onChange, ...props }: any) => (
    <select data-testid="course-searcher" value={value || ''} onChange={(e) => onChange?.(e.target.value)} {...props}>
      <option value="">Select course</option>
      <option value="course-1">Karate</option>
    </select>
  ),
  ShiftPicker: ({ value, onChange, disabled, ...props }: any) => (
    <select
      data-testid="shift-picker"
      value={value?.[0] || ''}
      disabled={disabled}
      onChange={(e) => {
        const shiftId = e.target.value;
        if (shiftId) {
          // Simulate shift data
          onChange?.(
            [shiftId],
            [
              {
                id: shiftId,
                weekDay: 1,
                from: [17, 0],
                to: [18, 30],
                course: { name: 'Karate' },
              },
            ]
          );
        }
      }}
      {...props}
    >
      <option value="">Select shift</option>
      <option value="shift-1">Karate - Lunedì: 17:00 - 18:30</option>
    </select>
  ),
}));

const MEMBER_IDS = ['member-1', 'member-2'];
const COURSE_IDS = ['course-1'];

const shiftsMock: MockLink.MockedResponse = {
  request: {
    query: ShiftsDocument,
    variables: () => true,
  },
  result: {
    data: {
      shifts: [
        {
          id: 'shift-1',
          weekDay: 1,
          from: [17, 0],
          to: [18, 30],
          course: { id: 'course-1', name: 'Karate' },
        },
      ],
    },
  },
};

const createAttendanceMock: MockLink.MockedResponse = {
  request: {
    query: AttendanceCreateManyDocument,
    variables: () => true,
  },
  result: {
    data: {
      attendanceCreateMany: {
        attendances: [
          { id: 'att-1', member: { id: 'member-1' }, course: { id: 'course-1' }, from: 0, to: 0 },
          { id: 'att-2', member: { id: 'member-2' }, course: { id: 'course-1' }, from: 0, to: 0 },
        ],
      },
    },
  },
};

const defaultMocks: MockLink.MockedResponse[] = [shiftsMock, createAttendanceMock];

const renderModal = (mocks = defaultMocks) => {
  const onCancel = vi.fn();
  const result = render(<AttendanceCreateModal memberIds={MEMBER_IDS} courseIds={COURSE_IDS} onCancel={onCancel} />, {
    mocks,
  });
  return { ...result, onCancel };
};

describe('AttendanceCreateModal', () => {
  it('should render the modal with title and form fields', () => {
    renderModal();

    expect(screen.getByText('Nuova presenza')).toBeInTheDocument();
    expect(screen.getByText('Corso')).toBeInTheDocument();
    expect(screen.getByText('Turno')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Dalle ore - alle ore')).toBeInTheDocument();
  });

  it('should pre-select course when only one courseId is provided', () => {
    renderModal();

    const courseSelect = screen.getByTestId('course-searcher') as HTMLSelectElement;
    expect(courseSelect.value).toBe('course-1');
  });

  it('should NOT pre-select course when multiple courseIds are provided', () => {
    const onCancel = vi.fn();
    render(<AttendanceCreateModal memberIds={MEMBER_IDS} courseIds={['course-1', 'course-2']} onCancel={onCancel} />, {
      mocks: defaultMocks,
    });

    const courseSelect = screen.getByTestId('course-searcher') as HTMLSelectElement;
    expect(courseSelect.value).toBe('');
  });

  it('should call onCancel(false) when cancel button is clicked', async () => {
    const { onCancel } = renderModal();
    const user = userEvent.setup();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(onCancel).toHaveBeenCalledWith(false);
  });

  it('should have shift picker disabled when no course is selected', () => {
    const onCancel = vi.fn();
    render(<AttendanceCreateModal memberIds={MEMBER_IDS} courseIds={['course-1', 'course-2']} onCancel={onCancel} />, {
      mocks: defaultMocks,
    });

    const shiftPicker = screen.getByTestId('shift-picker');
    expect(shiftPicker).toBeDisabled();
  });

  it('should enable shift picker when a course is selected', async () => {
    const onCancel = vi.fn();
    render(<AttendanceCreateModal memberIds={MEMBER_IDS} courseIds={['course-1', 'course-2']} onCancel={onCancel} />, {
      mocks: defaultMocks,
    });

    const courseSelect = screen.getByTestId('course-searcher');
    fireEvent.change(courseSelect, { target: { value: 'course-1' } });

    await waitFor(() => {
      const shiftPicker = screen.getByTestId('shift-picker');
      expect(shiftPicker).not.toBeDisabled();
    });
  });
});
