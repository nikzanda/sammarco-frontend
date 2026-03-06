interface RegistrationParentFormValues {
  name: string;
  surname: string;
  taxCode: string;
  email?: string;
  phone?: string;
}

export interface RegistrationFormValues {
  name: string;
  surname: string;
  taxCode: string;
  address?: string;
  email?: string;
  phone?: string;
  parent?: RegistrationParentFormValues;
  consentPrivacy: boolean;
  consentRules: boolean;
}
