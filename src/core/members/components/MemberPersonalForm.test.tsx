import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'antd';
import React from 'react';
import { render } from '../../../test/test-utils';
import MemberPersonalForm from './MemberPersonalForm';

// Valid tax code for a minor (born 2015): RSSMRA15A01H501G
const MINOR_TAX_CODE = 'RSSMRA15A01H501G';
// Valid tax code for an adult (born 1985): RSSMRA85M01H501Q
const ADULT_TAX_CODE = 'RSSMRA85M01H501Q';

// Wrapper that provides Form context (MemberPersonalForm uses Form.useFormInstance implicitly via Form.Item)
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical" autoComplete="off">
      {children}
    </Form>
  );
};

const renderForm = () => {
  return render(
    <FormWrapper>
      <MemberPersonalForm />
    </FormWrapper>
  );
};

describe('MemberPersonalForm', () => {
  it('should render basic personal fields', () => {
    renderForm();

    // "Nome" appears both as label for name field and elsewhere,
    // so we check all expected labels exist
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Cognome')).toBeInTheDocument();
    expect(screen.getByLabelText('Codice fiscale')).toBeInTheDocument();
    expect(screen.getByLabelText('Indirizzo')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should NOT show parent fields when tax code is empty', () => {
    renderForm();

    expect(screen.queryByText('Codice fiscale genitore')).not.toBeInTheDocument();
    expect(screen.queryByText('Nome genitore')).not.toBeInTheDocument();
  });

  it('should NOT show parent fields when tax code belongs to an adult', async () => {
    renderForm();
    const user = userEvent.setup();

    const taxCodeInput = screen.getByRole('textbox', { name: /codice fiscale/i });
    await user.type(taxCodeInput, ADULT_TAX_CODE);

    // Trigger blur to update form
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText('Codice fiscale genitore')).not.toBeInTheDocument();
    });
  });

  it('should show parent fields when tax code belongs to a minor', async () => {
    renderForm();
    const user = userEvent.setup();

    const taxCodeInput = screen.getByRole('textbox', { name: /codice fiscale/i });
    await user.type(taxCodeInput, MINOR_TAX_CODE);

    // Trigger blur to update form
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Codice fiscale genitore')).toBeInTheDocument();
      expect(screen.getByText('Nome genitore')).toBeInTheDocument();
      expect(screen.getByText('Cognome genitore')).toBeInTheDocument();
    });
  });

  it('should hide parent fields when minor tax code is replaced with adult tax code', async () => {
    renderForm();
    const user = userEvent.setup();

    const taxCodeInput = screen.getByRole('textbox', { name: /codice fiscale/i });

    // First type a minor tax code
    await user.type(taxCodeInput, MINOR_TAX_CODE);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Codice fiscale genitore')).toBeInTheDocument();
    });

    // Clear and type an adult tax code
    await user.clear(taxCodeInput);
    await user.type(taxCodeInput, ADULT_TAX_CODE);
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText('Codice fiscale genitore')).not.toBeInTheDocument();
    });
  });
});
