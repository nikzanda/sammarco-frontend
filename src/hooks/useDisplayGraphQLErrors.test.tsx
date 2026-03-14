import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { createTestProviders } from '../test/test-utils';
import useDisplayGraphQLErrors from './useDisplayGraphQLErrors';

describe('useDisplayGraphQLErrors', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not show message when no errors are passed', () => {
    const { result } = renderHook(() => useDisplayGraphQLErrors(undefined, undefined), {
      wrapper: createTestProviders(),
    });

    // Should not throw
    expect(result.current).toBeUndefined();
  });

  it('should not throw for a simple error', () => {
    const error = new Error('GENERIC_ERROR');

    expect(() => {
      renderHook(() => useDisplayGraphQLErrors(error), {
        wrapper: createTestProviders(),
      });
    }).not.toThrow();
  });

  it('should not throw for CombinedGraphQLErrors', () => {
    const error = new CombinedGraphQLErrors({
      errors: [{ message: 'NOT_FOUND', extensions: {} }],
    });

    expect(() => {
      renderHook(() => useDisplayGraphQLErrors(error), {
        wrapper: createTestProviders(),
      });
    }).not.toThrow();
  });

  it('should not throw for multiple errors', () => {
    const error1 = new Error('ERROR_1');
    const error2 = new Error('ERROR_2');

    expect(() => {
      renderHook(() => useDisplayGraphQLErrors(error1, error2), {
        wrapper: createTestProviders(),
      });
    }).not.toThrow();
  });

  it('should show error message in the DOM for a simple error', async () => {
    const error = new Error('GENERIC_ERROR');

    renderHook(() => useDisplayGraphQLErrors(error), {
      wrapper: createTestProviders(),
    });

    // Ant Design message renders an error notice in the DOM
    await waitFor(() => {
      const errorMessage = document.querySelector('.ant-message-notice-error');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should show error message in the DOM for CombinedGraphQLErrors', async () => {
    const error = new CombinedGraphQLErrors({
      errors: [{ message: 'SOME_ERROR', extensions: {} }],
    });

    renderHook(() => useDisplayGraphQLErrors(error), {
      wrapper: createTestProviders(),
    });

    await waitFor(() => {
      const errorMessage = document.querySelector('.ant-message-notice-error');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should handle CombinedGraphQLErrors with response extensions', async () => {
    const error = new CombinedGraphQLErrors({
      errors: [
        {
          message: 'NOT_FOUND',
          extensions: {
            response: {
              body: {
                errors: [
                  {
                    message: 'NOT_FOUND',
                    extensions: {
                      code: 'NOT_FOUND',
                      type: 'member',
                      multiple: false,
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    });

    expect(() => {
      renderHook(() => useDisplayGraphQLErrors(error), {
        wrapper: createTestProviders(),
      });
    }).not.toThrow();
  });

  it('should not show error message when all errors are undefined', async () => {
    renderHook(() => useDisplayGraphQLErrors(undefined, undefined), {
      wrapper: createTestProviders(),
    });

    // Give it time to ensure no message appears
    await vi.advanceTimersByTimeAsync(100);

    const errorMessage = document.querySelector('.ant-message-notice-error');
    expect(errorMessage).toBeNull();
  });
});
