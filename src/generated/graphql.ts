import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  YearMonth: { input: string; output: string; }
};

export type Attendance = {
  __typename?: 'Attendance';
  id: Scalars['ID']['output'];
  member: Member;
  course: Course;
  from: Scalars['Float']['output'];
  to: Scalars['Float']['output'];
};

export type AttendanceCreateInput = {
  memberId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
  from: Scalars['Float']['input'];
  to: Scalars['Float']['input'];
};

export type AttendanceCreateManyInput = {
  memberIds: Array<Scalars['ID']['input']>;
  courseId: Scalars['ID']['input'];
  from: Scalars['Float']['input'];
  to: Scalars['Float']['input'];
};

export type AttendanceCreateManyPayload = {
  __typename?: 'AttendanceCreateManyPayload';
  attendances: Array<Attendance>;
};

export type AttendanceCreatePayload = {
  __typename?: 'AttendanceCreatePayload';
  attendance: Attendance;
};

export type AttendanceDeleteInput = {
  id: Scalars['ID']['input'];
};

export type AttendanceDeleteManyInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type AttendanceDeleteManyPayload = {
  __typename?: 'AttendanceDeleteManyPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AttendanceDeletePayload = {
  __typename?: 'AttendanceDeletePayload';
  attendance: Attendance;
};

export type AttendanceFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};

export type AttendancePagination = {
  __typename?: 'AttendancePagination';
  data: Array<Attendance>;
  pageInfo: PageInfo;
};

export type AttendanceUpdateInput = {
  id: Scalars['ID']['input'];
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};

export type AttendanceUpdatePayload = {
  __typename?: 'AttendanceUpdatePayload';
  attendance: Attendance;
};

export enum CommunicationRecipientEnum {
  ALL = 'ALL',
  EXCLUDE = 'EXCLUDE'
}

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  shifts: Array<Array<Shift>>;
  emails: Array<Email>;
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type CourseCreateInput = {
  name: Scalars['String']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  shifts?: InputMaybe<Array<Array<ShiftInput>>>;
};

export type CourseCreatePayload = {
  __typename?: 'CourseCreatePayload';
  course: Course;
};

export type CourseDeleteInput = {
  id: Scalars['ID']['input'];
};

export type CourseDeletePayload = {
  __typename?: 'CourseDeletePayload';
  course: Course;
};

export type CourseFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<CourseSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type CoursePagination = {
  __typename?: 'CoursePagination';
  data: Array<Course>;
  pageInfo: PageInfo;
};

export enum CourseSortEnum {
  NAME = 'NAME',
  CREATED_AT = 'CREATED_AT'
}

export type CourseUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  shifts?: InputMaybe<Array<Array<ShiftInput>>>;
};

export type CourseUpdatePayload = {
  __typename?: 'CourseUpdatePayload';
  course: Course;
};

export type DayAttendances = {
  __typename?: 'DayAttendances';
  ids: Array<Scalars['ID']['output']>;
  members: Array<Member>;
  course: Course;
  from: Scalars['Float']['output'];
  to: Scalars['Float']['output'];
};

export type DayAttendancesFilter = {
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  startFrom?: InputMaybe<Scalars['Float']['input']>;
  endFrom?: InputMaybe<Scalars['Float']['input']>;
};

export type DayExpireMedicalCertificates = {
  __typename?: 'DayExpireMedicalCertificates';
  expireAt: Scalars['Float']['output'];
  members: Array<Member>;
};

export type DayExpireMedicalCertificatesFilter = {
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  startFrom?: InputMaybe<Scalars['Float']['input']>;
  endFrom?: InputMaybe<Scalars['Float']['input']>;
};

export type Email = {
  __typename?: 'Email';
  id: Scalars['ID']['output'];
  member: Member;
  course?: Maybe<Course>;
  type: EmailTypeEnum;
  to: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  body: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
};

export type EmailAttachmentInput = {
  path: Scalars['String']['input'];
  filename: Scalars['String']['input'];
};

export type EmailFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  type?: InputMaybe<EmailTypeEnum>;
  to?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<EmailSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type EmailPagination = {
  __typename?: 'EmailPagination';
  data: Array<Email>;
  pageInfo: PageInfo;
};

export type EmailSettings = {
  __typename?: 'EmailSettings';
  host: Scalars['String']['output'];
  port: Scalars['Int']['output'];
  secure: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
};

export type EmailSettingsInput = {
  host?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  secure?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export enum EmailSortEnum {
  CREATED_AT = 'CREATED_AT'
}

export type EmailText = {
  __typename?: 'EmailText';
  subject?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
};

export type EmailTextInput = {
  subject?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
};

export type EmailTextList = {
  __typename?: 'EmailTextList';
  receipt: EmailText;
  reminder: EmailText;
  medicalCertificateExpiration: EmailText;
};

export type EmailTextListInput = {
  receipt?: InputMaybe<EmailTextInput>;
  reminder?: InputMaybe<EmailTextInput>;
  medicalCertificateExpiration?: InputMaybe<EmailTextInput>;
};

export enum EmailTypeEnum {
  RECEIPT = 'RECEIPT',
  REMINDER = 'REMINDER',
  MEDICAL_CERTIFICATE_EXPIRATION = 'MEDICAL_CERTIFICATE_EXPIRATION'
}

export type Fee = {
  __typename?: 'Fee';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  course: Course;
  amount: Scalars['Float']['output'];
  recurrence?: Maybe<RecurrenceEnum>;
  reason: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type FeeCreateInput = {
  name: Scalars['String']['input'];
  courseId: Scalars['ID']['input'];
  amount: Scalars['Float']['input'];
  recurrence?: InputMaybe<RecurrenceEnum>;
  reason: Scalars['String']['input'];
};

export type FeeCreatePayload = {
  __typename?: 'FeeCreatePayload';
  fee: Fee;
};

export type FeeDeleteInput = {
  id: Scalars['ID']['input'];
};

export type FeeDeletePayload = {
  __typename?: 'FeeDeletePayload';
  fee: Fee;
};

export type FeeFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  reason?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<FeeSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type FeePagination = {
  __typename?: 'FeePagination';
  data: Array<Fee>;
  pageInfo: PageInfo;
};

export enum FeeSortEnum {
  NAME = 'NAME',
  CREATED_AT = 'CREATED_AT'
}

export type FeeUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  recurrence?: InputMaybe<RecurrenceEnum>;
  reason?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FeeUpdatePayload = {
  __typename?: 'FeeUpdatePayload';
  fee: Fee;
};

export type LoginInput = {
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  token: Scalars['String']['output'];
};

export type MedicalCertificate = {
  __typename?: 'MedicalCertificate';
  base64?: Maybe<Scalars['String']['output']>;
  expireAt: Scalars['Float']['output'];
};

export enum MedicalCertificateExpirationEnum {
  EXPIRED = 'EXPIRED',
  IS_EXPIRING = 'IS_EXPIRING',
  NOT_ENTERED = 'NOT_ENTERED'
}

export type MedicalCertificateInput = {
  base64?: InputMaybe<Scalars['String']['input']>;
  expireAt?: InputMaybe<Scalars['Float']['input']>;
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  taxCode: Scalars['String']['output'];
  birthday: Scalars['Float']['output'];
  isMinor: Scalars['Boolean']['output'];
  address?: Maybe<Scalars['String']['output']>;
  qualification: QualificationEnum;
  email?: Maybe<Scalars['String']['output']>;
  excludeFromCommunications: Scalars['Boolean']['output'];
  registrationRequestDate?: Maybe<Scalars['Float']['output']>;
  registrationAcceptanceDate?: Maybe<Scalars['Float']['output']>;
  socialCardNumber?: Maybe<Scalars['Int']['output']>;
  asiCardNumber?: Maybe<Scalars['String']['output']>;
  csenCardNumber?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Parent>;
  courses: Array<Course>;
  shiftIds: Array<Scalars['ID']['output']>;
  medicalCertificate?: Maybe<MedicalCertificate>;
  skipMedicalCertificateExpirationEmail: Scalars['Boolean']['output'];
  paidMembershipFee: Scalars['Float']['output'];
  payments: Array<Payment>;
  currentMonthPayments: Array<Payment>;
  currentEnrollmentPayment?: Maybe<Payment>;
  attendances: Array<Attendance>;
  emails: Array<Email>;
  currentMonthReminderEmails: Array<Email>;
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};


export type MemberPaidMembershipFeeArgs = {
  years: Array<Scalars['Int']['input']>;
};


export type MemberPaymentsArgs = {
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MemberAttendancesArgs = {
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MemberCreateInput = {
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<QualificationEnum>;
  email?: InputMaybe<Scalars['String']['input']>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
  registrationRequestDate?: InputMaybe<Scalars['Float']['input']>;
  registrationAcceptanceDate?: InputMaybe<Scalars['Float']['input']>;
  socialCardNumber?: InputMaybe<Scalars['Int']['input']>;
  asiCardNumber?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<ParentInput>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  medicalCertificate?: InputMaybe<MedicalCertificateInput>;
  skipMedicalCertificateExpirationEmail?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MemberCreateManyInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<QualificationEnum>;
  email?: InputMaybe<Scalars['String']['input']>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
  asiCardNumber?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<ParentInput>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  medicalCertificate?: InputMaybe<MedicalCertificateInput>;
  skipMedicalCertificateExpirationEmail?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MemberCreateManyPayload = {
  __typename?: 'MemberCreateManyPayload';
  members: Array<Member>;
};

export type MemberCreatePayload = {
  __typename?: 'MemberCreatePayload';
  member: Member;
};

export type MemberDeleteInput = {
  id: Scalars['ID']['input'];
};

export type MemberDeletePayload = {
  __typename?: 'MemberDeletePayload';
  member: Member;
};

export type MemberFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
  socialCardNumber?: InputMaybe<Scalars['String']['input']>;
  asiCardNumber?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  unpaidRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  monthsNotPaid?: InputMaybe<Array<Scalars['Float']['input']>>;
  medicalCertificateExpiration?: InputMaybe<Array<MedicalCertificateExpirationEnum>>;
  sortBy?: InputMaybe<MemberSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type MemberPagination = {
  __typename?: 'MemberPagination';
  data: Array<Member>;
  pageInfo: PageInfo;
};

export enum MemberSortEnum {
  NAME = 'NAME',
  SURNAME = 'SURNAME',
  TAX_CODE = 'TAX_CODE',
  SOCIAL_CARD_NUMBER = 'SOCIAL_CARD_NUMBER',
  REGISTRATION_REQUEST_DATE = 'REGISTRATION_REQUEST_DATE',
  REGISTRATION_ACCEPTANCE_DATE = 'REGISTRATION_ACCEPTANCE_DATE',
  CREATED_AT = 'CREATED_AT'
}

export type MemberUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<QualificationEnum>;
  email?: InputMaybe<Scalars['String']['input']>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
  registrationRequestDate?: InputMaybe<Scalars['Float']['input']>;
  registrationAcceptanceDate?: InputMaybe<Scalars['Float']['input']>;
  socialCardNumber?: InputMaybe<Scalars['Int']['input']>;
  asiCardNumber?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<ParentInput>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  medicalCertificate?: InputMaybe<MedicalCertificateInput>;
  skipMedicalCertificateExpirationEmail?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MemberUpdateManyInput = {
  ids: Array<Scalars['ID']['input']>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
  skipMedicalCertificateExpirationEmail?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MemberUpdateManyPayload = {
  __typename?: 'MemberUpdateManyPayload';
  modifiedCount: Scalars['Int']['output'];
};

export type MemberUpdatePayload = {
  __typename?: 'MemberUpdatePayload';
  member: Member;
};

export type Mutation = {
  __typename?: 'Mutation';
  verifyEmailSettings: VerifyEmailSettingsPayload;
  login: LoginPayload;
  settingUpdate: SettingUpdatePayload;
  paymentUpdateMany: PaymentUpdateManyPayload;
  paymentUpdate: PaymentUpdatePayload;
  paymentSendReceipt: PaymentSendReceiptPayload;
  paymentDelete: PaymentDeletePayload;
  paymentCreate: PaymentCreatePayload;
  memberUpdateMany: MemberUpdateManyPayload;
  memberUpdate: MemberUpdatePayload;
  memberDelete: MemberDeletePayload;
  memberCreateMany: MemberCreateManyPayload;
  memberCreate: MemberCreatePayload;
  feeUpdate: FeeUpdatePayload;
  feeDelete: FeeDeletePayload;
  feeCreate: FeeCreatePayload;
  paymentSendReminder: PaymentSendReminderPayload;
  sendMonthlyReminders: SendMonthlyRemindersPayload;
  sendDailyMedicalCertificateExpiration: SendDailyMedicalCertificateExpirationPayload;
  sendCommunication: SendCommunicationPayload;
  courseUpdate: CourseUpdatePayload;
  courseDelete: CourseDeletePayload;
  courseCreate: CourseCreatePayload;
  attendanceUpdate: AttendanceUpdatePayload;
  attendanceDeleteMany: AttendanceDeleteManyPayload;
  attendanceDelete: AttendanceDeletePayload;
  attendanceCreateMany: AttendanceCreateManyPayload;
  attendanceCreate: AttendanceCreatePayload;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSettingUpdateArgs = {
  input: SettingUpdateInput;
};


export type MutationPaymentUpdateManyArgs = {
  input: PaymentUpdateManyInput;
};


export type MutationPaymentUpdateArgs = {
  input: PaymentUpdateInput;
};


export type MutationPaymentSendReceiptArgs = {
  input: PaymentSendReceiptInput;
};


export type MutationPaymentDeleteArgs = {
  input: PaymentDeleteInput;
};


export type MutationPaymentCreateArgs = {
  input: PaymentCreateInput;
};


export type MutationMemberUpdateManyArgs = {
  input: MemberUpdateManyInput;
};


export type MutationMemberUpdateArgs = {
  input: MemberUpdateInput;
};


export type MutationMemberDeleteArgs = {
  input: MemberDeleteInput;
};


export type MutationMemberCreateManyArgs = {
  input: Array<MemberCreateManyInput>;
};


export type MutationMemberCreateArgs = {
  input: MemberCreateInput;
};


export type MutationFeeUpdateArgs = {
  input: FeeUpdateInput;
};


export type MutationFeeDeleteArgs = {
  input: FeeDeleteInput;
};


export type MutationFeeCreateArgs = {
  input: FeeCreateInput;
};


export type MutationPaymentSendReminderArgs = {
  input: PaymentSendReminderInput;
};


export type MutationSendMonthlyRemindersArgs = {
  input: SendMonthlyRemindersInput;
};


export type MutationSendDailyMedicalCertificateExpirationArgs = {
  input: SendDailyMedicalCertificateExpirationInput;
};


export type MutationSendCommunicationArgs = {
  input: SendCommunicationInput;
};


export type MutationCourseUpdateArgs = {
  input: CourseUpdateInput;
};


export type MutationCourseDeleteArgs = {
  input: CourseDeleteInput;
};


export type MutationCourseCreateArgs = {
  input: CourseCreateInput;
};


export type MutationAttendanceUpdateArgs = {
  input: AttendanceUpdateInput;
};


export type MutationAttendanceDeleteManyArgs = {
  input: AttendanceDeleteManyInput;
};


export type MutationAttendanceDeleteArgs = {
  input: AttendanceDeleteInput;
};


export type MutationAttendanceCreateManyArgs = {
  input: AttendanceCreateManyInput;
};


export type MutationAttendanceCreateArgs = {
  input: AttendanceCreateInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  total: Scalars['Int']['output'];
};

export type Parent = {
  __typename?: 'Parent';
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  taxCode: Scalars['String']['output'];
};

export type ParentInput = {
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['ID']['output'];
  counter: Scalars['Int']['output'];
  member: Member;
  fee: Fee;
  amount: Scalars['Float']['output'];
  date: Scalars['Float']['output'];
  month?: Maybe<Scalars['YearMonth']['output']>;
  years?: Maybe<Array<Scalars['Int']['output']>>;
  type: PaymentTypeEnum;
  reason: Scalars['String']['output'];
  sent: Scalars['Boolean']['output'];
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type PaymentCreateInput = {
  memberId: Scalars['ID']['input'];
  feeId: Scalars['ID']['input'];
  amount: Scalars['Float']['input'];
  date: Scalars['Float']['input'];
  type: PaymentTypeEnum;
  month?: InputMaybe<Scalars['YearMonth']['input']>;
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
  reason: Scalars['String']['input'];
};

export type PaymentCreatePayload = {
  __typename?: 'PaymentCreatePayload';
  payment: Payment;
};

export type PaymentDeleteInput = {
  id: Scalars['ID']['input'];
};

export type PaymentDeletePayload = {
  __typename?: 'PaymentDeletePayload';
  payment: Payment;
};

export type PaymentFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  counter?: InputMaybe<Scalars['Int']['input']>;
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  feeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  months?: InputMaybe<Array<Scalars['YearMonth']['input']>>;
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
  dateFrom?: InputMaybe<Scalars['Float']['input']>;
  dateTo?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PaymentTypeEnum>;
  reason?: InputMaybe<Scalars['String']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtFrom?: InputMaybe<Scalars['Float']['input']>;
  createdAtTo?: InputMaybe<Scalars['Float']['input']>;
  sortBy?: InputMaybe<PaymentSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type PaymentPagination = {
  __typename?: 'PaymentPagination';
  data: Array<Payment>;
  pageInfo: PageInfo;
};

export type PaymentSendReceiptInput = {
  id: Scalars['ID']['input'];
  attachmentUri: Scalars['String']['input'];
};

export type PaymentSendReceiptPayload = {
  __typename?: 'PaymentSendReceiptPayload';
  email: Email;
};

export type PaymentSendReminderInput = {
  memberId: Scalars['ID']['input'];
  month: Scalars['YearMonth']['input'];
  courseId: Scalars['ID']['input'];
};

export type PaymentSendReminderPayload = {
  __typename?: 'PaymentSendReminderPayload';
  email: Email;
};

export enum PaymentSortEnum {
  COUNTER = 'COUNTER',
  MONTH = 'MONTH',
  AMOUNT = 'AMOUNT',
  CREATED_AT = 'CREATED_AT'
}

export enum PaymentTypeEnum {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  POS = 'POS'
}

export type PaymentUpdateInput = {
  id: Scalars['ID']['input'];
  memberId?: InputMaybe<Scalars['ID']['input']>;
  feeId?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PaymentTypeEnum>;
  month?: InputMaybe<Scalars['YearMonth']['input']>;
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
  reason?: InputMaybe<Scalars['String']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentUpdateManyInput = {
  ids: Array<Scalars['ID']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentUpdateManyPayload = {
  __typename?: 'PaymentUpdateManyPayload';
  payments: Array<Payment>;
};

export type PaymentUpdatePayload = {
  __typename?: 'PaymentUpdatePayload';
  payment: Payment;
};

export enum QualificationEnum {
  PRESIDENT = 'PRESIDENT',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  SECRETARY = 'SECRETARY',
  COUNCILOR = 'COUNCILOR',
  ORDINARY_MEMBER = 'ORDINARY_MEMBER'
}

export type Query = {
  __typename?: 'Query';
  me: User;
  setting: Setting;
  members: MemberPagination;
  member: Member;
  courses: CoursePagination;
  course: Course;
  shifts: Array<ShiftDetail>;
  payments: PaymentPagination;
  payment: Payment;
  fees: FeePagination;
  fee: Fee;
  attendances: AttendancePagination;
  attendance: Attendance;
  emails: EmailPagination;
  email: Email;
  dayAttendances: Array<DayAttendances>;
  dayExpireMedicalCertificates: Array<DayExpireMedicalCertificates>;
};


export type QueryMembersArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<MemberFilter>;
};


export type QueryMemberArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<CourseFilter>;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShiftsArgs = {
  filter?: InputMaybe<ShiftFilter>;
};


export type QueryPaymentsArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<PaymentFilter>;
};


export type QueryPaymentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeesArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<FeeFilter>;
};


export type QueryFeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAttendancesArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<AttendanceFilter>;
};


export type QueryAttendanceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmailsArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<EmailFilter>;
};


export type QueryEmailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDayAttendancesArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<DayAttendancesFilter>;
};


export type QueryDayExpireMedicalCertificatesArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<DayExpireMedicalCertificatesFilter>;
};

export enum RecurrenceEnum {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL'
}

export type SendCommunicationInput = {
  recipient: CommunicationRecipientEnum;
  subject: Scalars['String']['input'];
  body: Scalars['String']['input'];
  attachments?: InputMaybe<Array<EmailAttachmentInput>>;
};

export type SendCommunicationPayload = {
  __typename?: 'SendCommunicationPayload';
  result: Scalars['Boolean']['output'];
};

export type SendDailyMedicalCertificateExpirationInput = {
  daysBeforeMedicalCertificateExpires?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type SendDailyMedicalCertificateExpirationPayload = {
  __typename?: 'SendDailyMedicalCertificateExpirationPayload';
  sentEmails: Scalars['Int']['output'];
};

export type SendMonthlyRemindersInput = {
  month: Scalars['YearMonth']['input'];
};

export type SendMonthlyRemindersPayload = {
  __typename?: 'SendMonthlyRemindersPayload';
  sentReminders: Scalars['Int']['output'];
};

export type Setting = {
  __typename?: 'Setting';
  emailSettings: EmailSettings;
  emailTextList: EmailTextList;
  attendancesPerMonthToSendReminder: Scalars['Int']['output'];
  daysBeforeMedicalCertificateExpiresToSendEmail: Array<Scalars['Int']['output']>;
};

export type SettingUpdateInput = {
  emailSettings?: InputMaybe<EmailSettingsInput>;
  emailTextList?: InputMaybe<EmailTextListInput>;
  attendancesPerMonthToSendReminder?: InputMaybe<Scalars['Int']['input']>;
  daysBeforeMedicalCertificateExpiresToSendEmail?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type SettingUpdatePayload = {
  __typename?: 'SettingUpdatePayload';
  setting: Setting;
};

export type Shift = {
  __typename?: 'Shift';
  id: Scalars['ID']['output'];
  from: Array<Scalars['Int']['output']>;
  to: Array<Scalars['Int']['output']>;
};

export type ShiftDetail = {
  __typename?: 'ShiftDetail';
  id: Scalars['ID']['output'];
  course: Course;
  weekDay: Scalars['Int']['output'];
  from: Array<Scalars['Int']['output']>;
  to: Array<Scalars['Int']['output']>;
};

export type ShiftFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  weekDay?: InputMaybe<Scalars['Int']['input']>;
};

export type ShiftInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  from: Array<Scalars['Int']['input']>;
  to: Array<Scalars['Int']['input']>;
};

export enum SortDirectionEnum {
  ASC = 'asc',
  DESC = 'desc'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type VerifyEmailSettingsPayload = {
  __typename?: 'VerifyEmailSettingsPayload';
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type AttendanceListItemFragment = { __typename?: 'Attendance', id: string, from: number, to: number, member: { __typename?: 'Member', fullName: string }, course: { __typename?: 'Course', id: string, name: string, color?: string | null } };

export type AttendancesQueryVariables = Exact<{
  filter: AttendanceFilter;
}>;


export type AttendancesQuery = { __typename?: 'Query', attendances: { __typename?: 'AttendancePagination', data: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, member: { __typename?: 'Member', fullName: string }, course: { __typename?: 'Course', id: string, name: string, color?: string | null } }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type DayAttendancesQueryVariables = Exact<{
  filter: DayAttendancesFilter;
}>;


export type DayAttendancesQuery = { __typename?: 'Query', dayAttendances: Array<{ __typename?: 'DayAttendances', ids: Array<string>, from: number, to: number, members: Array<{ __typename?: 'Member', fullName: string }>, course: { __typename?: 'Course', id: string, name: string, color?: string | null } }> };

export type DayExpireMedicalCertificatesQueryVariables = Exact<{
  filter: DayExpireMedicalCertificatesFilter;
}>;


export type DayExpireMedicalCertificatesQuery = { __typename?: 'Query', dayExpireMedicalCertificates: Array<{ __typename?: 'DayExpireMedicalCertificates', expireAt: number, members: Array<{ __typename?: 'Member', fullName: string }> }> };

export type AttendanceCreateManyMutationVariables = Exact<{
  input: AttendanceCreateManyInput;
}>;


export type AttendanceCreateManyMutation = { __typename?: 'Mutation', attendanceCreateMany: { __typename?: 'AttendanceCreateManyPayload', attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, member: { __typename?: 'Member', fullName: string }, course: { __typename?: 'Course', id: string, name: string, color?: string | null } }> } };

export type AttendanceDeleteMutationVariables = Exact<{
  input: AttendanceDeleteInput;
}>;


export type AttendanceDeleteMutation = { __typename?: 'Mutation', attendanceDelete: { __typename?: 'AttendanceDeletePayload', attendance: { __typename?: 'Attendance', id: string, from: number, to: number, member: { __typename?: 'Member', fullName: string }, course: { __typename?: 'Course', id: string, name: string, color?: string | null } } } };

export type AttendanceDeleteManyMutationVariables = Exact<{
  input: AttendanceDeleteManyInput;
}>;


export type AttendanceDeleteManyMutation = { __typename?: 'Mutation', attendanceDeleteMany: { __typename?: 'AttendanceDeleteManyPayload', success?: boolean | null } };

export type VerifyEmailSettingsMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyEmailSettingsMutation = { __typename?: 'Mutation', verifyEmailSettings: { __typename?: 'VerifyEmailSettingsPayload', verified?: boolean | null } };

export type SettingUpdateMutationVariables = Exact<{
  input: SettingUpdateInput;
}>;


export type SettingUpdateMutation = { __typename?: 'Mutation', settingUpdate: { __typename?: 'SettingUpdatePayload', setting: { __typename?: 'Setting', attendancesPerMonthToSendReminder: number, daysBeforeMedicalCertificateExpiresToSendEmail: Array<number>, emailSettings: { __typename?: 'EmailSettings', host: string, port: number, secure: boolean, name?: string | null, email?: string | null }, emailTextList: { __typename?: 'EmailTextList', receipt: { __typename?: 'EmailText', subject?: string | null, body?: string | null }, reminder: { __typename?: 'EmailText', subject?: string | null, body?: string | null }, medicalCertificateExpiration: { __typename?: 'EmailText', subject?: string | null, body?: string | null } } } } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', token: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string } };

export type SettingQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingQuery = { __typename?: 'Query', setting: { __typename?: 'Setting', attendancesPerMonthToSendReminder: number, daysBeforeMedicalCertificateExpiresToSendEmail: Array<number>, emailSettings: { __typename?: 'EmailSettings', host: string, port: number, secure: boolean, name?: string | null, email?: string | null }, emailTextList: { __typename?: 'EmailTextList', receipt: { __typename?: 'EmailText', subject?: string | null, body?: string | null }, reminder: { __typename?: 'EmailText', subject?: string | null, body?: string | null }, medicalCertificateExpiration: { __typename?: 'EmailText', subject?: string | null, body?: string | null } } } };

export type MemberListItemFragment = { __typename?: 'Member', id: string, fullName: string, shiftIds: Array<string>, socialCardNumber?: number | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, medicalCertificate?: { __typename?: 'MedicalCertificate', expireAt: number } | null, currentMonthReminderEmails: Array<{ __typename?: 'Email', id: string }> };

export type MemberDetailFragment = { __typename?: 'Member', name: string, surname: string, taxCode: string, address?: string | null, qualification: QualificationEnum, email?: string | null, excludeFromCommunications: boolean, registrationRequestDate?: number | null, registrationAcceptanceDate?: number | null, asiCardNumber?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, skipMedicalCertificateExpirationEmail: boolean, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, socialCardNumber?: number | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', base64?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, currentMonthReminderEmails: Array<{ __typename?: 'Email', id: string }> };

export type MembersSearcherQueryVariables = Exact<{
  filter?: InputMaybe<MemberFilter>;
}>;


export type MembersSearcherQuery = { __typename?: 'Query', members: { __typename?: 'MemberPagination', data: Array<{ __typename?: 'Member', id: string, fullName: string, email?: string | null }> } };

export type MemberSearcherQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MemberSearcherQuery = { __typename?: 'Query', member: { __typename?: 'Member', id: string, fullName: string, email?: string | null } };

export type MembersQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<MemberFilter>;
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MembersQuery = { __typename?: 'Query', members: { __typename?: 'MemberPagination', data: Array<{ __typename?: 'Member', id: string, fullName: string, shiftIds: Array<string>, socialCardNumber?: number | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, medicalCertificate?: { __typename?: 'MedicalCertificate', expireAt: number } | null, currentMonthReminderEmails: Array<{ __typename?: 'Email', id: string }> }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type MemberQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MemberQuery = { __typename?: 'Query', member: { __typename?: 'Member', name: string, surname: string, taxCode: string, address?: string | null, qualification: QualificationEnum, email?: string | null, excludeFromCommunications: boolean, registrationRequestDate?: number | null, registrationAcceptanceDate?: number | null, asiCardNumber?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, skipMedicalCertificateExpirationEmail: boolean, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, socialCardNumber?: number | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', base64?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, currentMonthReminderEmails: Array<{ __typename?: 'Email', id: string }> } };

export type MembersCsvQueryVariables = Exact<{
  years: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  filter?: InputMaybe<MemberFilter>;
}>;


export type MembersCsvQuery = { __typename?: 'Query', members: { __typename?: 'MemberPagination', data: Array<{ __typename?: 'Member', socialCardNumber?: number | null, registrationRequestDate?: number | null, registrationAcceptanceDate?: number | null, fullName: string, birthday: number, taxCode: string, address?: string | null, qualification: QualificationEnum, paidMembershipFee: number, csenCardNumber?: string | null, asiCardNumber?: string | null }> } };

export type MembersSyncQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type MembersSyncQuery = { __typename?: 'Query', members: { __typename?: 'MemberPagination', data: Array<{ __typename?: 'Member', id: string, name: string, surname: string, taxCode: string, address?: string | null, qualification: QualificationEnum, email?: string | null, shiftIds: Array<string>, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, courses: Array<{ __typename?: 'Course', id: string }>, medicalCertificate?: { __typename?: 'MedicalCertificate', base64?: string | null, expireAt: number } | null }> } };

export type MemberCreateMutationVariables = Exact<{
  input: MemberCreateInput;
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MemberCreateMutation = { __typename?: 'Mutation', memberCreate: { __typename?: 'MemberCreatePayload', member: { __typename?: 'Member', name: string, surname: string, taxCode: string, address?: string | null, qualification: QualificationEnum, email?: string | null, excludeFromCommunications: boolean, registrationRequestDate?: number | null, registrationAcceptanceDate?: number | null, asiCardNumber?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, skipMedicalCertificateExpirationEmail: boolean, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, socialCardNumber?: number | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', base64?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, currentMonthReminderEmails: Array<{ __typename?: 'Email', id: string }> } } };

export type MemberUpdateMutationVariables = Exact<{
  input: MemberUpdateInput;
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MemberUpdateMutation = { __typename?: 'Mutation', memberUpdate: { __typename?: 'MemberUpdatePayload', member: { __typename?: 'Member', name: string, surname: string, taxCode: string, address?: string | null, qualification: QualificationEnum, email?: string | null, excludeFromCommunications: boolean, registrationRequestDate?: number | null, registrationAcceptanceDate?: number | null, asiCardNumber?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, skipMedicalCertificateExpirationEmail: boolean, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, socialCardNumber?: number | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', base64?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, currentMonthReminderEmails: Array<{ __typename?: 'Email', id: string }> } } };

export type MemberUpdateManyMutationVariables = Exact<{
  input: MemberUpdateManyInput;
}>;


export type MemberUpdateManyMutation = { __typename?: 'Mutation', memberUpdateMany: { __typename?: 'MemberUpdateManyPayload', modifiedCount: number } };

export type MemberDeleteMutationVariables = Exact<{
  input: MemberDeleteInput;
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MemberDeleteMutation = { __typename?: 'Mutation', memberDelete: { __typename?: 'MemberDeletePayload', member: { __typename?: 'Member', name: string, surname: string, taxCode: string, address?: string | null, qualification: QualificationEnum, email?: string | null, excludeFromCommunications: boolean, registrationRequestDate?: number | null, registrationAcceptanceDate?: number | null, asiCardNumber?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, skipMedicalCertificateExpirationEmail: boolean, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, socialCardNumber?: number | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', base64?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, currentMonthReminderEmails: Array<{ __typename?: 'Email', id: string }> } } };

export type CourseListItemFragment = { __typename?: 'Course', id: string, name: string, color?: string | null };

export type CourseDetailFragment = { __typename?: 'Course', canDelete: boolean, createdAt: number, updatedAt: number, id: string, name: string, color?: string | null, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> };

export type CoursesSearcherQueryVariables = Exact<{
  filter?: InputMaybe<CourseFilter>;
}>;


export type CoursesSearcherQuery = { __typename?: 'Query', courses: { __typename?: 'CoursePagination', data: Array<{ __typename?: 'Course', id: string, name: string }> } };

export type CourseSearcherQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CourseSearcherQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string } };

export type ShiftsQueryVariables = Exact<{
  filter?: InputMaybe<ShiftFilter>;
}>;


export type ShiftsQuery = { __typename?: 'Query', shifts: Array<{ __typename?: 'ShiftDetail', id: string, weekDay: number, from: Array<number>, to: Array<number>, course: { __typename?: 'Course', id: string, name: string } }> };

export type CoursesQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<CourseFilter>;
}>;


export type CoursesQuery = { __typename?: 'Query', courses: { __typename?: 'CoursePagination', data: Array<{ __typename?: 'Course', id: string, name: string, color?: string | null }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type CourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', canDelete: boolean, createdAt: number, updatedAt: number, id: string, name: string, color?: string | null, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> } };

export type CourseCreateMutationVariables = Exact<{
  input: CourseCreateInput;
}>;


export type CourseCreateMutation = { __typename?: 'Mutation', courseCreate: { __typename?: 'CourseCreatePayload', course: { __typename?: 'Course', canDelete: boolean, createdAt: number, updatedAt: number, id: string, name: string, color?: string | null, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> } } };

export type CourseUpdateMutationVariables = Exact<{
  input: CourseUpdateInput;
}>;


export type CourseUpdateMutation = { __typename?: 'Mutation', courseUpdate: { __typename?: 'CourseUpdatePayload', course: { __typename?: 'Course', canDelete: boolean, createdAt: number, updatedAt: number, id: string, name: string, color?: string | null, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> } } };

export type CourseDeleteMutationVariables = Exact<{
  input: CourseDeleteInput;
}>;


export type CourseDeleteMutation = { __typename?: 'Mutation', courseDelete: { __typename?: 'CourseDeletePayload', course: { __typename?: 'Course', canDelete: boolean, createdAt: number, updatedAt: number, id: string, name: string, color?: string | null, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> } } };

export type EmailsQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<EmailFilter>;
}>;


export type EmailsQuery = { __typename?: 'Query', emails: { __typename?: 'EmailPagination', data: Array<{ __typename?: 'Email', id: string, type: EmailTypeEnum, to: string, subject: string, body: string, createdAt: number, course?: { __typename?: 'Course', name: string } | null }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type PaymentSendReminderMutationVariables = Exact<{
  input: PaymentSendReminderInput;
}>;


export type PaymentSendReminderMutation = { __typename?: 'Mutation', paymentSendReminder: { __typename?: 'PaymentSendReminderPayload', email: { __typename?: 'Email', id: string } } };

export type SendMonthlyRemindersMutationVariables = Exact<{
  input: SendMonthlyRemindersInput;
}>;


export type SendMonthlyRemindersMutation = { __typename?: 'Mutation', sendMonthlyReminders: { __typename?: 'SendMonthlyRemindersPayload', sentReminders: number } };

export type SendCommunicationMutationVariables = Exact<{
  input: SendCommunicationInput;
}>;


export type SendCommunicationMutation = { __typename?: 'Mutation', sendCommunication: { __typename?: 'SendCommunicationPayload', result: boolean } };

export type FeeListItemFragment = { __typename?: 'Fee', id: string, name: string, amount: number, enabled: boolean, course: { __typename?: 'Course', id: string, name: string } };

export type FeeDetailFragment = { __typename?: 'Fee', recurrence?: RecurrenceEnum | null, reason: string, createdAt: number, updatedAt: number, canDelete: boolean, id: string, name: string, amount: number, enabled: boolean, course: { __typename?: 'Course', id: string, name: string } };

export type FeesSearcherQueryVariables = Exact<{
  filter?: InputMaybe<FeeFilter>;
}>;


export type FeesSearcherQuery = { __typename?: 'Query', fees: { __typename?: 'FeePagination', data: Array<{ __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }> } };

export type FeeSearcherQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FeeSearcherQuery = { __typename?: 'Query', fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } } };

export type FeesQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<FeeFilter>;
}>;


export type FeesQuery = { __typename?: 'Query', fees: { __typename?: 'FeePagination', data: Array<{ __typename?: 'Fee', id: string, name: string, amount: number, enabled: boolean, course: { __typename?: 'Course', id: string, name: string } }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type FeeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FeeQuery = { __typename?: 'Query', fee: { __typename?: 'Fee', recurrence?: RecurrenceEnum | null, reason: string, createdAt: number, updatedAt: number, canDelete: boolean, id: string, name: string, amount: number, enabled: boolean, course: { __typename?: 'Course', id: string, name: string } } };

export type FeeCreateMutationVariables = Exact<{
  input: FeeCreateInput;
}>;


export type FeeCreateMutation = { __typename?: 'Mutation', feeCreate: { __typename?: 'FeeCreatePayload', fee: { __typename?: 'Fee', recurrence?: RecurrenceEnum | null, reason: string, createdAt: number, updatedAt: number, canDelete: boolean, id: string, name: string, amount: number, enabled: boolean, course: { __typename?: 'Course', id: string, name: string } } } };

export type FeeUpdateMutationVariables = Exact<{
  input: FeeUpdateInput;
}>;


export type FeeUpdateMutation = { __typename?: 'Mutation', feeUpdate: { __typename?: 'FeeUpdatePayload', fee: { __typename?: 'Fee', recurrence?: RecurrenceEnum | null, reason: string, createdAt: number, updatedAt: number, canDelete: boolean, id: string, name: string, amount: number, enabled: boolean, course: { __typename?: 'Course', id: string, name: string } } } };

export type FeeDeleteMutationVariables = Exact<{
  input: FeeDeleteInput;
}>;


export type FeeDeleteMutation = { __typename?: 'Mutation', feeDelete: { __typename?: 'FeeDeletePayload', fee: { __typename?: 'Fee', recurrence?: RecurrenceEnum | null, reason: string, createdAt: number, updatedAt: number, canDelete: boolean, id: string, name: string, amount: number, enabled: boolean, course: { __typename?: 'Course', id: string, name: string } } } };

export type PaymentListItemFragment = { __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, sent: boolean, member: { __typename?: 'Member', id: string, fullName: string }, fee: { __typename?: 'Fee', id: string, name: string, course: { __typename?: 'Course', name: string } } };

export type PaymentDetailFragment = { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } };

export type PaymentPdfFragment = { __typename?: 'Payment', counter: number, date: number, amount: number, reason: string, member: { __typename?: 'Member', name: string, surname: string, taxCode: string, birthday: number, address?: string | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null } };

export type PaymentsQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<PaymentFilter>;
}>;


export type PaymentsQuery = { __typename?: 'Query', payments: { __typename?: 'PaymentPagination', data: Array<{ __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, sent: boolean, member: { __typename?: 'Member', id: string, fullName: string }, fee: { __typename?: 'Fee', id: string, name: string, course: { __typename?: 'Course', name: string } } }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type PaymentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PaymentQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } } };

export type PaymentsPdfQueryVariables = Exact<{
  filter: PaymentFilter;
}>;


export type PaymentsPdfQuery = { __typename?: 'Query', payments: { __typename?: 'PaymentPagination', data: Array<{ __typename?: 'Payment', counter: number, date: number, amount: number, reason: string, member: { __typename?: 'Member', name: string, surname: string, taxCode: string, birthday: number, address?: string | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null } }> } };

export type PaymentPdfQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PaymentPdfQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', counter: number, date: number, amount: number, reason: string, member: { __typename?: 'Member', name: string, surname: string, taxCode: string, birthday: number, address?: string | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null } } };

export type PaymentsCsvQueryVariables = Exact<{
  filter: PaymentFilter;
}>;


export type PaymentsCsvQuery = { __typename?: 'Query', payments: { __typename?: 'PaymentPagination', data: Array<{ __typename?: 'Payment', counter: number, amount: number, date: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, member: { __typename?: 'Member', fullName: string }, fee: { __typename?: 'Fee', name: string, course: { __typename?: 'Course', name: string } } }> } };

export type PaymentCreateMutationVariables = Exact<{
  input: PaymentCreateInput;
}>;


export type PaymentCreateMutation = { __typename?: 'Mutation', paymentCreate: { __typename?: 'PaymentCreatePayload', payment: { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } } } };

export type PaymentUpdateMutationVariables = Exact<{
  input: PaymentUpdateInput;
}>;


export type PaymentUpdateMutation = { __typename?: 'Mutation', paymentUpdate: { __typename?: 'PaymentUpdatePayload', payment: { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } } } };

export type PaymentUpdateManyMutationVariables = Exact<{
  input: PaymentUpdateManyInput;
}>;


export type PaymentUpdateManyMutation = { __typename?: 'Mutation', paymentUpdateMany: { __typename?: 'PaymentUpdateManyPayload', payments: Array<{ __typename?: 'Payment', id: string, sent: boolean }> } };

export type PaymentSendReceiptMutationVariables = Exact<{
  input: PaymentSendReceiptInput;
}>;


export type PaymentSendReceiptMutation = { __typename?: 'Mutation', paymentSendReceipt: { __typename?: 'PaymentSendReceiptPayload', email: { __typename?: 'Email', id: string } } };

export type PaymentDeleteMutationVariables = Exact<{
  input: PaymentDeleteInput;
}>;


export type PaymentDeleteMutation = { __typename?: 'Mutation', paymentDelete: { __typename?: 'PaymentDeletePayload', payment: { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } } } };

export const AttendanceListItemFragmentDoc = gql`
    fragment AttendanceListItem on Attendance {
  id
  member {
    fullName
  }
  course {
    id
    name
    color
  }
  from
  to
}
    `;
export const MemberListItemFragmentDoc = gql`
    fragment MemberListItem on Member {
  id
  fullName
  payments(years: $years) {
    id
    month
    years
  }
  attendances(years: $years) {
    id
    course {
      id
    }
    from
    to
  }
  courses {
    id
    name
    shifts {
      id
      from
      to
    }
  }
  medicalCertificate {
    expireAt
  }
  currentMonthReminderEmails {
    id
  }
  shiftIds
  socialCardNumber
}
    `;
export const MemberDetailFragmentDoc = gql`
    fragment MemberDetail on Member {
  ...MemberListItem
  name
  surname
  taxCode
  address
  qualification
  email
  excludeFromCommunications
  registrationRequestDate
  registrationAcceptanceDate
  asiCardNumber
  csenCardNumber
  parent {
    name
    surname
    taxCode
  }
  shiftIds
  medicalCertificate {
    base64
    expireAt
  }
  skipMedicalCertificateExpirationEmail
  canDelete
  createdAt
  updatedAt
}
    ${MemberListItemFragmentDoc}`;
export const CourseListItemFragmentDoc = gql`
    fragment CourseListItem on Course {
  id
  name
  color
}
    `;
export const CourseDetailFragmentDoc = gql`
    fragment CourseDetail on Course {
  ...CourseListItem
  shifts {
    id
    from
    to
  }
  canDelete
  createdAt
  updatedAt
}
    ${CourseListItemFragmentDoc}`;
export const FeeListItemFragmentDoc = gql`
    fragment FeeListItem on Fee {
  id
  name
  course {
    id
    name
  }
  amount
  enabled
}
    `;
export const FeeDetailFragmentDoc = gql`
    fragment FeeDetail on Fee {
  ...FeeListItem
  recurrence
  reason
  createdAt
  updatedAt
  canDelete
}
    ${FeeListItemFragmentDoc}`;
export const PaymentListItemFragmentDoc = gql`
    fragment PaymentListItem on Payment {
  id
  counter
  member {
    id
    fullName
  }
  fee {
    id
    name
    course {
      name
    }
  }
  amount
  month
  years
  type
  sent
}
    `;
export const PaymentDetailFragmentDoc = gql`
    fragment PaymentDetail on Payment {
  ...PaymentListItem
  fee {
    id
    name
    amount
    recurrence
    reason
    course {
      name
    }
  }
  date
  reason
  canDelete
  createdAt
  updatedAt
}
    ${PaymentListItemFragmentDoc}`;
export const PaymentPdfFragmentDoc = gql`
    fragment PaymentPdf on Payment {
  counter
  date
  amount
  reason
  member {
    name
    surname
    taxCode
    birthday
    address
    parent {
      name
      surname
      taxCode
    }
  }
}
    `;
export const AttendancesDocument = gql`
    query Attendances($filter: AttendanceFilter!) {
  attendances(pageIndex: 0, pageSize: 0, filter: $filter) {
    data {
      ...AttendanceListItem
    }
    pageInfo {
      total
    }
  }
}
    ${AttendanceListItemFragmentDoc}`;

/**
 * __useAttendancesQuery__
 *
 * To run a query within a React component, call `useAttendancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttendancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttendancesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAttendancesQuery(baseOptions: Apollo.QueryHookOptions<AttendancesQuery, AttendancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttendancesQuery, AttendancesQueryVariables>(AttendancesDocument, options);
      }
export function useAttendancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttendancesQuery, AttendancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttendancesQuery, AttendancesQueryVariables>(AttendancesDocument, options);
        }
export type AttendancesQueryHookResult = ReturnType<typeof useAttendancesQuery>;
export type AttendancesLazyQueryHookResult = ReturnType<typeof useAttendancesLazyQuery>;
export type AttendancesQueryResult = Apollo.QueryResult<AttendancesQuery, AttendancesQueryVariables>;
export const DayAttendancesDocument = gql`
    query DayAttendances($filter: DayAttendancesFilter!) {
  dayAttendances(pageIndex: 0, pageSize: 0, filter: $filter) {
    ids
    members {
      fullName
    }
    course {
      id
      name
      color
    }
    from
    to
  }
}
    `;

/**
 * __useDayAttendancesQuery__
 *
 * To run a query within a React component, call `useDayAttendancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDayAttendancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDayAttendancesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDayAttendancesQuery(baseOptions: Apollo.QueryHookOptions<DayAttendancesQuery, DayAttendancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DayAttendancesQuery, DayAttendancesQueryVariables>(DayAttendancesDocument, options);
      }
export function useDayAttendancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DayAttendancesQuery, DayAttendancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DayAttendancesQuery, DayAttendancesQueryVariables>(DayAttendancesDocument, options);
        }
export type DayAttendancesQueryHookResult = ReturnType<typeof useDayAttendancesQuery>;
export type DayAttendancesLazyQueryHookResult = ReturnType<typeof useDayAttendancesLazyQuery>;
export type DayAttendancesQueryResult = Apollo.QueryResult<DayAttendancesQuery, DayAttendancesQueryVariables>;
export const DayExpireMedicalCertificatesDocument = gql`
    query DayExpireMedicalCertificates($filter: DayExpireMedicalCertificatesFilter!) {
  dayExpireMedicalCertificates(pageIndex: 0, pageSize: 0, filter: $filter) {
    expireAt
    members {
      fullName
    }
  }
}
    `;

/**
 * __useDayExpireMedicalCertificatesQuery__
 *
 * To run a query within a React component, call `useDayExpireMedicalCertificatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDayExpireMedicalCertificatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDayExpireMedicalCertificatesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDayExpireMedicalCertificatesQuery(baseOptions: Apollo.QueryHookOptions<DayExpireMedicalCertificatesQuery, DayExpireMedicalCertificatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DayExpireMedicalCertificatesQuery, DayExpireMedicalCertificatesQueryVariables>(DayExpireMedicalCertificatesDocument, options);
      }
export function useDayExpireMedicalCertificatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DayExpireMedicalCertificatesQuery, DayExpireMedicalCertificatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DayExpireMedicalCertificatesQuery, DayExpireMedicalCertificatesQueryVariables>(DayExpireMedicalCertificatesDocument, options);
        }
export type DayExpireMedicalCertificatesQueryHookResult = ReturnType<typeof useDayExpireMedicalCertificatesQuery>;
export type DayExpireMedicalCertificatesLazyQueryHookResult = ReturnType<typeof useDayExpireMedicalCertificatesLazyQuery>;
export type DayExpireMedicalCertificatesQueryResult = Apollo.QueryResult<DayExpireMedicalCertificatesQuery, DayExpireMedicalCertificatesQueryVariables>;
export const AttendanceCreateManyDocument = gql`
    mutation AttendanceCreateMany($input: AttendanceCreateManyInput!) {
  attendanceCreateMany(input: $input) {
    attendances {
      ...AttendanceListItem
    }
  }
}
    ${AttendanceListItemFragmentDoc}`;
export type AttendanceCreateManyMutationFn = Apollo.MutationFunction<AttendanceCreateManyMutation, AttendanceCreateManyMutationVariables>;

/**
 * __useAttendanceCreateManyMutation__
 *
 * To run a mutation, you first call `useAttendanceCreateManyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendanceCreateManyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendanceCreateManyMutation, { data, loading, error }] = useAttendanceCreateManyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAttendanceCreateManyMutation(baseOptions?: Apollo.MutationHookOptions<AttendanceCreateManyMutation, AttendanceCreateManyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttendanceCreateManyMutation, AttendanceCreateManyMutationVariables>(AttendanceCreateManyDocument, options);
      }
export type AttendanceCreateManyMutationHookResult = ReturnType<typeof useAttendanceCreateManyMutation>;
export type AttendanceCreateManyMutationResult = Apollo.MutationResult<AttendanceCreateManyMutation>;
export type AttendanceCreateManyMutationOptions = Apollo.BaseMutationOptions<AttendanceCreateManyMutation, AttendanceCreateManyMutationVariables>;
export const AttendanceDeleteDocument = gql`
    mutation AttendanceDelete($input: AttendanceDeleteInput!) {
  attendanceDelete(input: $input) {
    attendance {
      ...AttendanceListItem
    }
  }
}
    ${AttendanceListItemFragmentDoc}`;
export type AttendanceDeleteMutationFn = Apollo.MutationFunction<AttendanceDeleteMutation, AttendanceDeleteMutationVariables>;

/**
 * __useAttendanceDeleteMutation__
 *
 * To run a mutation, you first call `useAttendanceDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendanceDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendanceDeleteMutation, { data, loading, error }] = useAttendanceDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAttendanceDeleteMutation(baseOptions?: Apollo.MutationHookOptions<AttendanceDeleteMutation, AttendanceDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttendanceDeleteMutation, AttendanceDeleteMutationVariables>(AttendanceDeleteDocument, options);
      }
export type AttendanceDeleteMutationHookResult = ReturnType<typeof useAttendanceDeleteMutation>;
export type AttendanceDeleteMutationResult = Apollo.MutationResult<AttendanceDeleteMutation>;
export type AttendanceDeleteMutationOptions = Apollo.BaseMutationOptions<AttendanceDeleteMutation, AttendanceDeleteMutationVariables>;
export const AttendanceDeleteManyDocument = gql`
    mutation AttendanceDeleteMany($input: AttendanceDeleteManyInput!) {
  attendanceDeleteMany(input: $input) {
    success
  }
}
    `;
export type AttendanceDeleteManyMutationFn = Apollo.MutationFunction<AttendanceDeleteManyMutation, AttendanceDeleteManyMutationVariables>;

/**
 * __useAttendanceDeleteManyMutation__
 *
 * To run a mutation, you first call `useAttendanceDeleteManyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendanceDeleteManyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendanceDeleteManyMutation, { data, loading, error }] = useAttendanceDeleteManyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAttendanceDeleteManyMutation(baseOptions?: Apollo.MutationHookOptions<AttendanceDeleteManyMutation, AttendanceDeleteManyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttendanceDeleteManyMutation, AttendanceDeleteManyMutationVariables>(AttendanceDeleteManyDocument, options);
      }
export type AttendanceDeleteManyMutationHookResult = ReturnType<typeof useAttendanceDeleteManyMutation>;
export type AttendanceDeleteManyMutationResult = Apollo.MutationResult<AttendanceDeleteManyMutation>;
export type AttendanceDeleteManyMutationOptions = Apollo.BaseMutationOptions<AttendanceDeleteManyMutation, AttendanceDeleteManyMutationVariables>;
export const VerifyEmailSettingsDocument = gql`
    mutation VerifyEmailSettings {
  verifyEmailSettings {
    verified
  }
}
    `;
export type VerifyEmailSettingsMutationFn = Apollo.MutationFunction<VerifyEmailSettingsMutation, VerifyEmailSettingsMutationVariables>;

/**
 * __useVerifyEmailSettingsMutation__
 *
 * To run a mutation, you first call `useVerifyEmailSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailSettingsMutation, { data, loading, error }] = useVerifyEmailSettingsMutation({
 *   variables: {
 *   },
 * });
 */
export function useVerifyEmailSettingsMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailSettingsMutation, VerifyEmailSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailSettingsMutation, VerifyEmailSettingsMutationVariables>(VerifyEmailSettingsDocument, options);
      }
export type VerifyEmailSettingsMutationHookResult = ReturnType<typeof useVerifyEmailSettingsMutation>;
export type VerifyEmailSettingsMutationResult = Apollo.MutationResult<VerifyEmailSettingsMutation>;
export type VerifyEmailSettingsMutationOptions = Apollo.BaseMutationOptions<VerifyEmailSettingsMutation, VerifyEmailSettingsMutationVariables>;
export const SettingUpdateDocument = gql`
    mutation SettingUpdate($input: SettingUpdateInput!) {
  settingUpdate(input: $input) {
    setting {
      emailSettings {
        host
        port
        secure
        name
        email
      }
      emailTextList {
        receipt {
          subject
          body
        }
        reminder {
          subject
          body
        }
        medicalCertificateExpiration {
          subject
          body
        }
      }
      attendancesPerMonthToSendReminder
      daysBeforeMedicalCertificateExpiresToSendEmail
    }
  }
}
    `;
export type SettingUpdateMutationFn = Apollo.MutationFunction<SettingUpdateMutation, SettingUpdateMutationVariables>;

/**
 * __useSettingUpdateMutation__
 *
 * To run a mutation, you first call `useSettingUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingUpdateMutation, { data, loading, error }] = useSettingUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSettingUpdateMutation(baseOptions?: Apollo.MutationHookOptions<SettingUpdateMutation, SettingUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SettingUpdateMutation, SettingUpdateMutationVariables>(SettingUpdateDocument, options);
      }
export type SettingUpdateMutationHookResult = ReturnType<typeof useSettingUpdateMutation>;
export type SettingUpdateMutationResult = Apollo.MutationResult<SettingUpdateMutation>;
export type SettingUpdateMutationOptions = Apollo.BaseMutationOptions<SettingUpdateMutation, SettingUpdateMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SettingDocument = gql`
    query Setting {
  setting {
    emailSettings {
      host
      port
      secure
      name
      email
    }
    emailTextList {
      receipt {
        subject
        body
      }
      reminder {
        subject
        body
      }
      medicalCertificateExpiration {
        subject
        body
      }
    }
    attendancesPerMonthToSendReminder
    daysBeforeMedicalCertificateExpiresToSendEmail
  }
}
    `;

/**
 * __useSettingQuery__
 *
 * To run a query within a React component, call `useSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingQuery(baseOptions?: Apollo.QueryHookOptions<SettingQuery, SettingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
      }
export function useSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
        }
export type SettingQueryHookResult = ReturnType<typeof useSettingQuery>;
export type SettingLazyQueryHookResult = ReturnType<typeof useSettingLazyQuery>;
export type SettingQueryResult = Apollo.QueryResult<SettingQuery, SettingQueryVariables>;
export const MembersSearcherDocument = gql`
    query MembersSearcher($filter: MemberFilter) {
  members(pageIndex: 0, pageSize: 20, filter: $filter) {
    data {
      id
      fullName
      email
    }
  }
}
    `;

/**
 * __useMembersSearcherQuery__
 *
 * To run a query within a React component, call `useMembersSearcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersSearcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersSearcherQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMembersSearcherQuery(baseOptions?: Apollo.QueryHookOptions<MembersSearcherQuery, MembersSearcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembersSearcherQuery, MembersSearcherQueryVariables>(MembersSearcherDocument, options);
      }
export function useMembersSearcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembersSearcherQuery, MembersSearcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembersSearcherQuery, MembersSearcherQueryVariables>(MembersSearcherDocument, options);
        }
export type MembersSearcherQueryHookResult = ReturnType<typeof useMembersSearcherQuery>;
export type MembersSearcherLazyQueryHookResult = ReturnType<typeof useMembersSearcherLazyQuery>;
export type MembersSearcherQueryResult = Apollo.QueryResult<MembersSearcherQuery, MembersSearcherQueryVariables>;
export const MemberSearcherDocument = gql`
    query MemberSearcher($id: ID!) {
  member(id: $id) {
    id
    fullName
    email
  }
}
    `;

/**
 * __useMemberSearcherQuery__
 *
 * To run a query within a React component, call `useMemberSearcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberSearcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberSearcherQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMemberSearcherQuery(baseOptions: Apollo.QueryHookOptions<MemberSearcherQuery, MemberSearcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MemberSearcherQuery, MemberSearcherQueryVariables>(MemberSearcherDocument, options);
      }
export function useMemberSearcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MemberSearcherQuery, MemberSearcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MemberSearcherQuery, MemberSearcherQueryVariables>(MemberSearcherDocument, options);
        }
export type MemberSearcherQueryHookResult = ReturnType<typeof useMemberSearcherQuery>;
export type MemberSearcherLazyQueryHookResult = ReturnType<typeof useMemberSearcherLazyQuery>;
export type MemberSearcherQueryResult = Apollo.QueryResult<MemberSearcherQuery, MemberSearcherQueryVariables>;
export const MembersDocument = gql`
    query Members($pageIndex: Int!, $pageSize: Int!, $filter: MemberFilter, $years: [Int!]) {
  members(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
    data {
      ...MemberListItem
    }
    pageInfo {
      total
    }
  }
}
    ${MemberListItemFragmentDoc}`;

/**
 * __useMembersQuery__
 *
 * To run a query within a React component, call `useMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersQuery({
 *   variables: {
 *      pageIndex: // value for 'pageIndex'
 *      pageSize: // value for 'pageSize'
 *      filter: // value for 'filter'
 *      years: // value for 'years'
 *   },
 * });
 */
export function useMembersQuery(baseOptions: Apollo.QueryHookOptions<MembersQuery, MembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembersQuery, MembersQueryVariables>(MembersDocument, options);
      }
export function useMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembersQuery, MembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembersQuery, MembersQueryVariables>(MembersDocument, options);
        }
export type MembersQueryHookResult = ReturnType<typeof useMembersQuery>;
export type MembersLazyQueryHookResult = ReturnType<typeof useMembersLazyQuery>;
export type MembersQueryResult = Apollo.QueryResult<MembersQuery, MembersQueryVariables>;
export const MemberDocument = gql`
    query Member($id: ID!, $years: [Int!]) {
  member(id: $id) {
    ...MemberDetail
  }
}
    ${MemberDetailFragmentDoc}`;

/**
 * __useMemberQuery__
 *
 * To run a query within a React component, call `useMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberQuery({
 *   variables: {
 *      id: // value for 'id'
 *      years: // value for 'years'
 *   },
 * });
 */
export function useMemberQuery(baseOptions: Apollo.QueryHookOptions<MemberQuery, MemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MemberQuery, MemberQueryVariables>(MemberDocument, options);
      }
export function useMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MemberQuery, MemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MemberQuery, MemberQueryVariables>(MemberDocument, options);
        }
export type MemberQueryHookResult = ReturnType<typeof useMemberQuery>;
export type MemberLazyQueryHookResult = ReturnType<typeof useMemberLazyQuery>;
export type MemberQueryResult = Apollo.QueryResult<MemberQuery, MemberQueryVariables>;
export const MembersCsvDocument = gql`
    query MembersCsv($years: [Int!]!, $filter: MemberFilter) {
  members(pageIndex: 0, pageSize: 0, filter: $filter) {
    data {
      socialCardNumber
      registrationRequestDate
      registrationAcceptanceDate
      fullName
      birthday
      taxCode
      address
      qualification
      paidMembershipFee(years: $years)
      csenCardNumber
      asiCardNumber
    }
  }
}
    `;

/**
 * __useMembersCsvQuery__
 *
 * To run a query within a React component, call `useMembersCsvQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersCsvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersCsvQuery({
 *   variables: {
 *      years: // value for 'years'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMembersCsvQuery(baseOptions: Apollo.QueryHookOptions<MembersCsvQuery, MembersCsvQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembersCsvQuery, MembersCsvQueryVariables>(MembersCsvDocument, options);
      }
export function useMembersCsvLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembersCsvQuery, MembersCsvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembersCsvQuery, MembersCsvQueryVariables>(MembersCsvDocument, options);
        }
export type MembersCsvQueryHookResult = ReturnType<typeof useMembersCsvQuery>;
export type MembersCsvLazyQueryHookResult = ReturnType<typeof useMembersCsvLazyQuery>;
export type MembersCsvQueryResult = Apollo.QueryResult<MembersCsvQuery, MembersCsvQueryVariables>;
export const MembersSyncDocument = gql`
    query MembersSync($ids: [ID!]!) {
  members(pageIndex: 0, pageSize: 0, filter: {ids: $ids}) {
    data {
      id
      name
      surname
      taxCode
      address
      qualification
      email
      parent {
        name
        surname
        taxCode
      }
      courses {
        id
      }
      shiftIds
      medicalCertificate {
        base64
        expireAt
      }
    }
  }
}
    `;

/**
 * __useMembersSyncQuery__
 *
 * To run a query within a React component, call `useMembersSyncQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersSyncQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersSyncQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useMembersSyncQuery(baseOptions: Apollo.QueryHookOptions<MembersSyncQuery, MembersSyncQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembersSyncQuery, MembersSyncQueryVariables>(MembersSyncDocument, options);
      }
export function useMembersSyncLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembersSyncQuery, MembersSyncQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembersSyncQuery, MembersSyncQueryVariables>(MembersSyncDocument, options);
        }
export type MembersSyncQueryHookResult = ReturnType<typeof useMembersSyncQuery>;
export type MembersSyncLazyQueryHookResult = ReturnType<typeof useMembersSyncLazyQuery>;
export type MembersSyncQueryResult = Apollo.QueryResult<MembersSyncQuery, MembersSyncQueryVariables>;
export const MemberCreateDocument = gql`
    mutation MemberCreate($input: MemberCreateInput!, $years: [Int!]) {
  memberCreate(input: $input) {
    member {
      ...MemberDetail
    }
  }
}
    ${MemberDetailFragmentDoc}`;
export type MemberCreateMutationFn = Apollo.MutationFunction<MemberCreateMutation, MemberCreateMutationVariables>;

/**
 * __useMemberCreateMutation__
 *
 * To run a mutation, you first call `useMemberCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberCreateMutation, { data, loading, error }] = useMemberCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *      years: // value for 'years'
 *   },
 * });
 */
export function useMemberCreateMutation(baseOptions?: Apollo.MutationHookOptions<MemberCreateMutation, MemberCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberCreateMutation, MemberCreateMutationVariables>(MemberCreateDocument, options);
      }
export type MemberCreateMutationHookResult = ReturnType<typeof useMemberCreateMutation>;
export type MemberCreateMutationResult = Apollo.MutationResult<MemberCreateMutation>;
export type MemberCreateMutationOptions = Apollo.BaseMutationOptions<MemberCreateMutation, MemberCreateMutationVariables>;
export const MemberUpdateDocument = gql`
    mutation MemberUpdate($input: MemberUpdateInput!, $years: [Int!]) {
  memberUpdate(input: $input) {
    member {
      ...MemberDetail
    }
  }
}
    ${MemberDetailFragmentDoc}`;
export type MemberUpdateMutationFn = Apollo.MutationFunction<MemberUpdateMutation, MemberUpdateMutationVariables>;

/**
 * __useMemberUpdateMutation__
 *
 * To run a mutation, you first call `useMemberUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberUpdateMutation, { data, loading, error }] = useMemberUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *      years: // value for 'years'
 *   },
 * });
 */
export function useMemberUpdateMutation(baseOptions?: Apollo.MutationHookOptions<MemberUpdateMutation, MemberUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberUpdateMutation, MemberUpdateMutationVariables>(MemberUpdateDocument, options);
      }
export type MemberUpdateMutationHookResult = ReturnType<typeof useMemberUpdateMutation>;
export type MemberUpdateMutationResult = Apollo.MutationResult<MemberUpdateMutation>;
export type MemberUpdateMutationOptions = Apollo.BaseMutationOptions<MemberUpdateMutation, MemberUpdateMutationVariables>;
export const MemberUpdateManyDocument = gql`
    mutation MemberUpdateMany($input: MemberUpdateManyInput!) {
  memberUpdateMany(input: $input) {
    modifiedCount
  }
}
    `;
export type MemberUpdateManyMutationFn = Apollo.MutationFunction<MemberUpdateManyMutation, MemberUpdateManyMutationVariables>;

/**
 * __useMemberUpdateManyMutation__
 *
 * To run a mutation, you first call `useMemberUpdateManyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberUpdateManyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberUpdateManyMutation, { data, loading, error }] = useMemberUpdateManyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMemberUpdateManyMutation(baseOptions?: Apollo.MutationHookOptions<MemberUpdateManyMutation, MemberUpdateManyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberUpdateManyMutation, MemberUpdateManyMutationVariables>(MemberUpdateManyDocument, options);
      }
export type MemberUpdateManyMutationHookResult = ReturnType<typeof useMemberUpdateManyMutation>;
export type MemberUpdateManyMutationResult = Apollo.MutationResult<MemberUpdateManyMutation>;
export type MemberUpdateManyMutationOptions = Apollo.BaseMutationOptions<MemberUpdateManyMutation, MemberUpdateManyMutationVariables>;
export const MemberDeleteDocument = gql`
    mutation MemberDelete($input: MemberDeleteInput!, $years: [Int!]) {
  memberDelete(input: $input) {
    member {
      ...MemberDetail
    }
  }
}
    ${MemberDetailFragmentDoc}`;
export type MemberDeleteMutationFn = Apollo.MutationFunction<MemberDeleteMutation, MemberDeleteMutationVariables>;

/**
 * __useMemberDeleteMutation__
 *
 * To run a mutation, you first call `useMemberDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberDeleteMutation, { data, loading, error }] = useMemberDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *      years: // value for 'years'
 *   },
 * });
 */
export function useMemberDeleteMutation(baseOptions?: Apollo.MutationHookOptions<MemberDeleteMutation, MemberDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberDeleteMutation, MemberDeleteMutationVariables>(MemberDeleteDocument, options);
      }
export type MemberDeleteMutationHookResult = ReturnType<typeof useMemberDeleteMutation>;
export type MemberDeleteMutationResult = Apollo.MutationResult<MemberDeleteMutation>;
export type MemberDeleteMutationOptions = Apollo.BaseMutationOptions<MemberDeleteMutation, MemberDeleteMutationVariables>;
export const CoursesSearcherDocument = gql`
    query CoursesSearcher($filter: CourseFilter) {
  courses(pageIndex: 0, pageSize: 20, filter: $filter) {
    data {
      id
      name
    }
  }
}
    `;

/**
 * __useCoursesSearcherQuery__
 *
 * To run a query within a React component, call `useCoursesSearcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesSearcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesSearcherQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCoursesSearcherQuery(baseOptions?: Apollo.QueryHookOptions<CoursesSearcherQuery, CoursesSearcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesSearcherQuery, CoursesSearcherQueryVariables>(CoursesSearcherDocument, options);
      }
export function useCoursesSearcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesSearcherQuery, CoursesSearcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesSearcherQuery, CoursesSearcherQueryVariables>(CoursesSearcherDocument, options);
        }
export type CoursesSearcherQueryHookResult = ReturnType<typeof useCoursesSearcherQuery>;
export type CoursesSearcherLazyQueryHookResult = ReturnType<typeof useCoursesSearcherLazyQuery>;
export type CoursesSearcherQueryResult = Apollo.QueryResult<CoursesSearcherQuery, CoursesSearcherQueryVariables>;
export const CourseSearcherDocument = gql`
    query CourseSearcher($id: ID!) {
  course(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useCourseSearcherQuery__
 *
 * To run a query within a React component, call `useCourseSearcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseSearcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseSearcherQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseSearcherQuery(baseOptions: Apollo.QueryHookOptions<CourseSearcherQuery, CourseSearcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseSearcherQuery, CourseSearcherQueryVariables>(CourseSearcherDocument, options);
      }
export function useCourseSearcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseSearcherQuery, CourseSearcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseSearcherQuery, CourseSearcherQueryVariables>(CourseSearcherDocument, options);
        }
export type CourseSearcherQueryHookResult = ReturnType<typeof useCourseSearcherQuery>;
export type CourseSearcherLazyQueryHookResult = ReturnType<typeof useCourseSearcherLazyQuery>;
export type CourseSearcherQueryResult = Apollo.QueryResult<CourseSearcherQuery, CourseSearcherQueryVariables>;
export const ShiftsDocument = gql`
    query Shifts($filter: ShiftFilter) {
  shifts(filter: $filter) {
    id
    course {
      id
      name
    }
    weekDay
    from
    to
  }
}
    `;

/**
 * __useShiftsQuery__
 *
 * To run a query within a React component, call `useShiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShiftsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useShiftsQuery(baseOptions?: Apollo.QueryHookOptions<ShiftsQuery, ShiftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShiftsQuery, ShiftsQueryVariables>(ShiftsDocument, options);
      }
export function useShiftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShiftsQuery, ShiftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShiftsQuery, ShiftsQueryVariables>(ShiftsDocument, options);
        }
export type ShiftsQueryHookResult = ReturnType<typeof useShiftsQuery>;
export type ShiftsLazyQueryHookResult = ReturnType<typeof useShiftsLazyQuery>;
export type ShiftsQueryResult = Apollo.QueryResult<ShiftsQuery, ShiftsQueryVariables>;
export const CoursesDocument = gql`
    query Courses($pageIndex: Int!, $pageSize: Int!, $filter: CourseFilter) {
  courses(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
    data {
      ...CourseListItem
    }
    pageInfo {
      total
    }
  }
}
    ${CourseListItemFragmentDoc}`;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *      pageIndex: // value for 'pageIndex'
 *      pageSize: // value for 'pageSize'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCoursesQuery(baseOptions: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const CourseDocument = gql`
    query Course($id: ID!) {
  course(id: $id) {
    ...CourseDetail
  }
}
    ${CourseDetailFragmentDoc}`;

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const CourseCreateDocument = gql`
    mutation CourseCreate($input: CourseCreateInput!) {
  courseCreate(input: $input) {
    course {
      ...CourseDetail
    }
  }
}
    ${CourseDetailFragmentDoc}`;
export type CourseCreateMutationFn = Apollo.MutationFunction<CourseCreateMutation, CourseCreateMutationVariables>;

/**
 * __useCourseCreateMutation__
 *
 * To run a mutation, you first call `useCourseCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCourseCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [courseCreateMutation, { data, loading, error }] = useCourseCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCourseCreateMutation(baseOptions?: Apollo.MutationHookOptions<CourseCreateMutation, CourseCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CourseCreateMutation, CourseCreateMutationVariables>(CourseCreateDocument, options);
      }
export type CourseCreateMutationHookResult = ReturnType<typeof useCourseCreateMutation>;
export type CourseCreateMutationResult = Apollo.MutationResult<CourseCreateMutation>;
export type CourseCreateMutationOptions = Apollo.BaseMutationOptions<CourseCreateMutation, CourseCreateMutationVariables>;
export const CourseUpdateDocument = gql`
    mutation CourseUpdate($input: CourseUpdateInput!) {
  courseUpdate(input: $input) {
    course {
      ...CourseDetail
    }
  }
}
    ${CourseDetailFragmentDoc}`;
export type CourseUpdateMutationFn = Apollo.MutationFunction<CourseUpdateMutation, CourseUpdateMutationVariables>;

/**
 * __useCourseUpdateMutation__
 *
 * To run a mutation, you first call `useCourseUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCourseUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [courseUpdateMutation, { data, loading, error }] = useCourseUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCourseUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CourseUpdateMutation, CourseUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CourseUpdateMutation, CourseUpdateMutationVariables>(CourseUpdateDocument, options);
      }
export type CourseUpdateMutationHookResult = ReturnType<typeof useCourseUpdateMutation>;
export type CourseUpdateMutationResult = Apollo.MutationResult<CourseUpdateMutation>;
export type CourseUpdateMutationOptions = Apollo.BaseMutationOptions<CourseUpdateMutation, CourseUpdateMutationVariables>;
export const CourseDeleteDocument = gql`
    mutation CourseDelete($input: CourseDeleteInput!) {
  courseDelete(input: $input) {
    course {
      ...CourseDetail
    }
  }
}
    ${CourseDetailFragmentDoc}`;
export type CourseDeleteMutationFn = Apollo.MutationFunction<CourseDeleteMutation, CourseDeleteMutationVariables>;

/**
 * __useCourseDeleteMutation__
 *
 * To run a mutation, you first call `useCourseDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCourseDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [courseDeleteMutation, { data, loading, error }] = useCourseDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCourseDeleteMutation(baseOptions?: Apollo.MutationHookOptions<CourseDeleteMutation, CourseDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CourseDeleteMutation, CourseDeleteMutationVariables>(CourseDeleteDocument, options);
      }
export type CourseDeleteMutationHookResult = ReturnType<typeof useCourseDeleteMutation>;
export type CourseDeleteMutationResult = Apollo.MutationResult<CourseDeleteMutation>;
export type CourseDeleteMutationOptions = Apollo.BaseMutationOptions<CourseDeleteMutation, CourseDeleteMutationVariables>;
export const EmailsDocument = gql`
    query Emails($pageIndex: Int!, $pageSize: Int!, $filter: EmailFilter) {
  emails(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
    data {
      id
      course {
        name
      }
      type
      to
      subject
      body
      createdAt
    }
    pageInfo {
      total
    }
  }
}
    `;

/**
 * __useEmailsQuery__
 *
 * To run a query within a React component, call `useEmailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmailsQuery({
 *   variables: {
 *      pageIndex: // value for 'pageIndex'
 *      pageSize: // value for 'pageSize'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEmailsQuery(baseOptions: Apollo.QueryHookOptions<EmailsQuery, EmailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmailsQuery, EmailsQueryVariables>(EmailsDocument, options);
      }
export function useEmailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmailsQuery, EmailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmailsQuery, EmailsQueryVariables>(EmailsDocument, options);
        }
export type EmailsQueryHookResult = ReturnType<typeof useEmailsQuery>;
export type EmailsLazyQueryHookResult = ReturnType<typeof useEmailsLazyQuery>;
export type EmailsQueryResult = Apollo.QueryResult<EmailsQuery, EmailsQueryVariables>;
export const PaymentSendReminderDocument = gql`
    mutation PaymentSendReminder($input: PaymentSendReminderInput!) {
  paymentSendReminder(input: $input) {
    email {
      id
    }
  }
}
    `;
export type PaymentSendReminderMutationFn = Apollo.MutationFunction<PaymentSendReminderMutation, PaymentSendReminderMutationVariables>;

/**
 * __usePaymentSendReminderMutation__
 *
 * To run a mutation, you first call `usePaymentSendReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentSendReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentSendReminderMutation, { data, loading, error }] = usePaymentSendReminderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentSendReminderMutation(baseOptions?: Apollo.MutationHookOptions<PaymentSendReminderMutation, PaymentSendReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentSendReminderMutation, PaymentSendReminderMutationVariables>(PaymentSendReminderDocument, options);
      }
export type PaymentSendReminderMutationHookResult = ReturnType<typeof usePaymentSendReminderMutation>;
export type PaymentSendReminderMutationResult = Apollo.MutationResult<PaymentSendReminderMutation>;
export type PaymentSendReminderMutationOptions = Apollo.BaseMutationOptions<PaymentSendReminderMutation, PaymentSendReminderMutationVariables>;
export const SendMonthlyRemindersDocument = gql`
    mutation SendMonthlyReminders($input: SendMonthlyRemindersInput!) {
  sendMonthlyReminders(input: $input) {
    sentReminders
  }
}
    `;
export type SendMonthlyRemindersMutationFn = Apollo.MutationFunction<SendMonthlyRemindersMutation, SendMonthlyRemindersMutationVariables>;

/**
 * __useSendMonthlyRemindersMutation__
 *
 * To run a mutation, you first call `useSendMonthlyRemindersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMonthlyRemindersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMonthlyRemindersMutation, { data, loading, error }] = useSendMonthlyRemindersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMonthlyRemindersMutation(baseOptions?: Apollo.MutationHookOptions<SendMonthlyRemindersMutation, SendMonthlyRemindersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMonthlyRemindersMutation, SendMonthlyRemindersMutationVariables>(SendMonthlyRemindersDocument, options);
      }
export type SendMonthlyRemindersMutationHookResult = ReturnType<typeof useSendMonthlyRemindersMutation>;
export type SendMonthlyRemindersMutationResult = Apollo.MutationResult<SendMonthlyRemindersMutation>;
export type SendMonthlyRemindersMutationOptions = Apollo.BaseMutationOptions<SendMonthlyRemindersMutation, SendMonthlyRemindersMutationVariables>;
export const SendCommunicationDocument = gql`
    mutation SendCommunication($input: SendCommunicationInput!) {
  sendCommunication(input: $input) {
    result
  }
}
    `;
export type SendCommunicationMutationFn = Apollo.MutationFunction<SendCommunicationMutation, SendCommunicationMutationVariables>;

/**
 * __useSendCommunicationMutation__
 *
 * To run a mutation, you first call `useSendCommunicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendCommunicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendCommunicationMutation, { data, loading, error }] = useSendCommunicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendCommunicationMutation(baseOptions?: Apollo.MutationHookOptions<SendCommunicationMutation, SendCommunicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendCommunicationMutation, SendCommunicationMutationVariables>(SendCommunicationDocument, options);
      }
export type SendCommunicationMutationHookResult = ReturnType<typeof useSendCommunicationMutation>;
export type SendCommunicationMutationResult = Apollo.MutationResult<SendCommunicationMutation>;
export type SendCommunicationMutationOptions = Apollo.BaseMutationOptions<SendCommunicationMutation, SendCommunicationMutationVariables>;
export const FeesSearcherDocument = gql`
    query FeesSearcher($filter: FeeFilter) {
  fees(pageIndex: 0, pageSize: 20, filter: $filter) {
    data {
      id
      name
      amount
      recurrence
      reason
      course {
        name
      }
    }
  }
}
    `;

/**
 * __useFeesSearcherQuery__
 *
 * To run a query within a React component, call `useFeesSearcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeesSearcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeesSearcherQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFeesSearcherQuery(baseOptions?: Apollo.QueryHookOptions<FeesSearcherQuery, FeesSearcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeesSearcherQuery, FeesSearcherQueryVariables>(FeesSearcherDocument, options);
      }
export function useFeesSearcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeesSearcherQuery, FeesSearcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeesSearcherQuery, FeesSearcherQueryVariables>(FeesSearcherDocument, options);
        }
export type FeesSearcherQueryHookResult = ReturnType<typeof useFeesSearcherQuery>;
export type FeesSearcherLazyQueryHookResult = ReturnType<typeof useFeesSearcherLazyQuery>;
export type FeesSearcherQueryResult = Apollo.QueryResult<FeesSearcherQuery, FeesSearcherQueryVariables>;
export const FeeSearcherDocument = gql`
    query FeeSearcher($id: ID!) {
  fee(id: $id) {
    id
    name
    amount
    recurrence
    reason
    course {
      name
    }
  }
}
    `;

/**
 * __useFeeSearcherQuery__
 *
 * To run a query within a React component, call `useFeeSearcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeeSearcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeeSearcherQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFeeSearcherQuery(baseOptions: Apollo.QueryHookOptions<FeeSearcherQuery, FeeSearcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeeSearcherQuery, FeeSearcherQueryVariables>(FeeSearcherDocument, options);
      }
export function useFeeSearcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeeSearcherQuery, FeeSearcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeeSearcherQuery, FeeSearcherQueryVariables>(FeeSearcherDocument, options);
        }
export type FeeSearcherQueryHookResult = ReturnType<typeof useFeeSearcherQuery>;
export type FeeSearcherLazyQueryHookResult = ReturnType<typeof useFeeSearcherLazyQuery>;
export type FeeSearcherQueryResult = Apollo.QueryResult<FeeSearcherQuery, FeeSearcherQueryVariables>;
export const FeesDocument = gql`
    query Fees($pageIndex: Int!, $pageSize: Int!, $filter: FeeFilter) {
  fees(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
    data {
      ...FeeListItem
    }
    pageInfo {
      total
    }
  }
}
    ${FeeListItemFragmentDoc}`;

/**
 * __useFeesQuery__
 *
 * To run a query within a React component, call `useFeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeesQuery({
 *   variables: {
 *      pageIndex: // value for 'pageIndex'
 *      pageSize: // value for 'pageSize'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFeesQuery(baseOptions: Apollo.QueryHookOptions<FeesQuery, FeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeesQuery, FeesQueryVariables>(FeesDocument, options);
      }
export function useFeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeesQuery, FeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeesQuery, FeesQueryVariables>(FeesDocument, options);
        }
export type FeesQueryHookResult = ReturnType<typeof useFeesQuery>;
export type FeesLazyQueryHookResult = ReturnType<typeof useFeesLazyQuery>;
export type FeesQueryResult = Apollo.QueryResult<FeesQuery, FeesQueryVariables>;
export const FeeDocument = gql`
    query Fee($id: ID!) {
  fee(id: $id) {
    ...FeeDetail
  }
}
    ${FeeDetailFragmentDoc}`;

/**
 * __useFeeQuery__
 *
 * To run a query within a React component, call `useFeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFeeQuery(baseOptions: Apollo.QueryHookOptions<FeeQuery, FeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeeQuery, FeeQueryVariables>(FeeDocument, options);
      }
export function useFeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeeQuery, FeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeeQuery, FeeQueryVariables>(FeeDocument, options);
        }
export type FeeQueryHookResult = ReturnType<typeof useFeeQuery>;
export type FeeLazyQueryHookResult = ReturnType<typeof useFeeLazyQuery>;
export type FeeQueryResult = Apollo.QueryResult<FeeQuery, FeeQueryVariables>;
export const FeeCreateDocument = gql`
    mutation FeeCreate($input: FeeCreateInput!) {
  feeCreate(input: $input) {
    fee {
      ...FeeDetail
    }
  }
}
    ${FeeDetailFragmentDoc}`;
export type FeeCreateMutationFn = Apollo.MutationFunction<FeeCreateMutation, FeeCreateMutationVariables>;

/**
 * __useFeeCreateMutation__
 *
 * To run a mutation, you first call `useFeeCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeeCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feeCreateMutation, { data, loading, error }] = useFeeCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeeCreateMutation(baseOptions?: Apollo.MutationHookOptions<FeeCreateMutation, FeeCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FeeCreateMutation, FeeCreateMutationVariables>(FeeCreateDocument, options);
      }
export type FeeCreateMutationHookResult = ReturnType<typeof useFeeCreateMutation>;
export type FeeCreateMutationResult = Apollo.MutationResult<FeeCreateMutation>;
export type FeeCreateMutationOptions = Apollo.BaseMutationOptions<FeeCreateMutation, FeeCreateMutationVariables>;
export const FeeUpdateDocument = gql`
    mutation FeeUpdate($input: FeeUpdateInput!) {
  feeUpdate(input: $input) {
    fee {
      ...FeeDetail
    }
  }
}
    ${FeeDetailFragmentDoc}`;
export type FeeUpdateMutationFn = Apollo.MutationFunction<FeeUpdateMutation, FeeUpdateMutationVariables>;

/**
 * __useFeeUpdateMutation__
 *
 * To run a mutation, you first call `useFeeUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeeUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feeUpdateMutation, { data, loading, error }] = useFeeUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeeUpdateMutation(baseOptions?: Apollo.MutationHookOptions<FeeUpdateMutation, FeeUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FeeUpdateMutation, FeeUpdateMutationVariables>(FeeUpdateDocument, options);
      }
export type FeeUpdateMutationHookResult = ReturnType<typeof useFeeUpdateMutation>;
export type FeeUpdateMutationResult = Apollo.MutationResult<FeeUpdateMutation>;
export type FeeUpdateMutationOptions = Apollo.BaseMutationOptions<FeeUpdateMutation, FeeUpdateMutationVariables>;
export const FeeDeleteDocument = gql`
    mutation FeeDelete($input: FeeDeleteInput!) {
  feeDelete(input: $input) {
    fee {
      ...FeeDetail
    }
  }
}
    ${FeeDetailFragmentDoc}`;
export type FeeDeleteMutationFn = Apollo.MutationFunction<FeeDeleteMutation, FeeDeleteMutationVariables>;

/**
 * __useFeeDeleteMutation__
 *
 * To run a mutation, you first call `useFeeDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeeDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feeDeleteMutation, { data, loading, error }] = useFeeDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeeDeleteMutation(baseOptions?: Apollo.MutationHookOptions<FeeDeleteMutation, FeeDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FeeDeleteMutation, FeeDeleteMutationVariables>(FeeDeleteDocument, options);
      }
export type FeeDeleteMutationHookResult = ReturnType<typeof useFeeDeleteMutation>;
export type FeeDeleteMutationResult = Apollo.MutationResult<FeeDeleteMutation>;
export type FeeDeleteMutationOptions = Apollo.BaseMutationOptions<FeeDeleteMutation, FeeDeleteMutationVariables>;
export const PaymentsDocument = gql`
    query Payments($pageIndex: Int!, $pageSize: Int!, $filter: PaymentFilter) {
  payments(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {
    data {
      ...PaymentListItem
    }
    pageInfo {
      total
    }
  }
}
    ${PaymentListItemFragmentDoc}`;

/**
 * __usePaymentsQuery__
 *
 * To run a query within a React component, call `usePaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsQuery({
 *   variables: {
 *      pageIndex: // value for 'pageIndex'
 *      pageSize: // value for 'pageSize'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePaymentsQuery(baseOptions: Apollo.QueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
      }
export function usePaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
        }
export type PaymentsQueryHookResult = ReturnType<typeof usePaymentsQuery>;
export type PaymentsLazyQueryHookResult = ReturnType<typeof usePaymentsLazyQuery>;
export type PaymentsQueryResult = Apollo.QueryResult<PaymentsQuery, PaymentsQueryVariables>;
export const PaymentDocument = gql`
    query Payment($id: ID!) {
  payment(id: $id) {
    ...PaymentDetail
  }
}
    ${PaymentDetailFragmentDoc}`;

/**
 * __usePaymentQuery__
 *
 * To run a query within a React component, call `usePaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePaymentQuery(baseOptions: Apollo.QueryHookOptions<PaymentQuery, PaymentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
      }
export function usePaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentQuery, PaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
        }
export type PaymentQueryHookResult = ReturnType<typeof usePaymentQuery>;
export type PaymentLazyQueryHookResult = ReturnType<typeof usePaymentLazyQuery>;
export type PaymentQueryResult = Apollo.QueryResult<PaymentQuery, PaymentQueryVariables>;
export const PaymentsPdfDocument = gql`
    query PaymentsPdf($filter: PaymentFilter!) {
  payments(pageIndex: 0, pageSize: 0, filter: $filter) {
    data {
      ...PaymentPdf
    }
  }
}
    ${PaymentPdfFragmentDoc}`;

/**
 * __usePaymentsPdfQuery__
 *
 * To run a query within a React component, call `usePaymentsPdfQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsPdfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsPdfQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePaymentsPdfQuery(baseOptions: Apollo.QueryHookOptions<PaymentsPdfQuery, PaymentsPdfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentsPdfQuery, PaymentsPdfQueryVariables>(PaymentsPdfDocument, options);
      }
export function usePaymentsPdfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentsPdfQuery, PaymentsPdfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentsPdfQuery, PaymentsPdfQueryVariables>(PaymentsPdfDocument, options);
        }
export type PaymentsPdfQueryHookResult = ReturnType<typeof usePaymentsPdfQuery>;
export type PaymentsPdfLazyQueryHookResult = ReturnType<typeof usePaymentsPdfLazyQuery>;
export type PaymentsPdfQueryResult = Apollo.QueryResult<PaymentsPdfQuery, PaymentsPdfQueryVariables>;
export const PaymentPdfDocument = gql`
    query PaymentPdf($id: ID!) {
  payment(id: $id) {
    ...PaymentPdf
  }
}
    ${PaymentPdfFragmentDoc}`;

/**
 * __usePaymentPdfQuery__
 *
 * To run a query within a React component, call `usePaymentPdfQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentPdfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentPdfQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePaymentPdfQuery(baseOptions: Apollo.QueryHookOptions<PaymentPdfQuery, PaymentPdfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentPdfQuery, PaymentPdfQueryVariables>(PaymentPdfDocument, options);
      }
export function usePaymentPdfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentPdfQuery, PaymentPdfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentPdfQuery, PaymentPdfQueryVariables>(PaymentPdfDocument, options);
        }
export type PaymentPdfQueryHookResult = ReturnType<typeof usePaymentPdfQuery>;
export type PaymentPdfLazyQueryHookResult = ReturnType<typeof usePaymentPdfLazyQuery>;
export type PaymentPdfQueryResult = Apollo.QueryResult<PaymentPdfQuery, PaymentPdfQueryVariables>;
export const PaymentsCsvDocument = gql`
    query PaymentsCsv($filter: PaymentFilter!) {
  payments(pageIndex: 0, pageSize: 0, filter: $filter) {
    data {
      counter
      member {
        fullName
      }
      fee {
        name
        course {
          name
        }
      }
      amount
      date
      month
      years
      type
    }
  }
}
    `;

/**
 * __usePaymentsCsvQuery__
 *
 * To run a query within a React component, call `usePaymentsCsvQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsCsvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsCsvQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePaymentsCsvQuery(baseOptions: Apollo.QueryHookOptions<PaymentsCsvQuery, PaymentsCsvQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentsCsvQuery, PaymentsCsvQueryVariables>(PaymentsCsvDocument, options);
      }
export function usePaymentsCsvLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentsCsvQuery, PaymentsCsvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentsCsvQuery, PaymentsCsvQueryVariables>(PaymentsCsvDocument, options);
        }
export type PaymentsCsvQueryHookResult = ReturnType<typeof usePaymentsCsvQuery>;
export type PaymentsCsvLazyQueryHookResult = ReturnType<typeof usePaymentsCsvLazyQuery>;
export type PaymentsCsvQueryResult = Apollo.QueryResult<PaymentsCsvQuery, PaymentsCsvQueryVariables>;
export const PaymentCreateDocument = gql`
    mutation PaymentCreate($input: PaymentCreateInput!) {
  paymentCreate(input: $input) {
    payment {
      ...PaymentDetail
    }
  }
}
    ${PaymentDetailFragmentDoc}`;
export type PaymentCreateMutationFn = Apollo.MutationFunction<PaymentCreateMutation, PaymentCreateMutationVariables>;

/**
 * __usePaymentCreateMutation__
 *
 * To run a mutation, you first call `usePaymentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentCreateMutation, { data, loading, error }] = usePaymentCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentCreateMutation(baseOptions?: Apollo.MutationHookOptions<PaymentCreateMutation, PaymentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentCreateMutation, PaymentCreateMutationVariables>(PaymentCreateDocument, options);
      }
export type PaymentCreateMutationHookResult = ReturnType<typeof usePaymentCreateMutation>;
export type PaymentCreateMutationResult = Apollo.MutationResult<PaymentCreateMutation>;
export type PaymentCreateMutationOptions = Apollo.BaseMutationOptions<PaymentCreateMutation, PaymentCreateMutationVariables>;
export const PaymentUpdateDocument = gql`
    mutation PaymentUpdate($input: PaymentUpdateInput!) {
  paymentUpdate(input: $input) {
    payment {
      ...PaymentDetail
    }
  }
}
    ${PaymentDetailFragmentDoc}`;
export type PaymentUpdateMutationFn = Apollo.MutationFunction<PaymentUpdateMutation, PaymentUpdateMutationVariables>;

/**
 * __usePaymentUpdateMutation__
 *
 * To run a mutation, you first call `usePaymentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentUpdateMutation, { data, loading, error }] = usePaymentUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentUpdateMutation(baseOptions?: Apollo.MutationHookOptions<PaymentUpdateMutation, PaymentUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentUpdateMutation, PaymentUpdateMutationVariables>(PaymentUpdateDocument, options);
      }
export type PaymentUpdateMutationHookResult = ReturnType<typeof usePaymentUpdateMutation>;
export type PaymentUpdateMutationResult = Apollo.MutationResult<PaymentUpdateMutation>;
export type PaymentUpdateMutationOptions = Apollo.BaseMutationOptions<PaymentUpdateMutation, PaymentUpdateMutationVariables>;
export const PaymentUpdateManyDocument = gql`
    mutation PaymentUpdateMany($input: PaymentUpdateManyInput!) {
  paymentUpdateMany(input: $input) {
    payments {
      id
      sent
    }
  }
}
    `;
export type PaymentUpdateManyMutationFn = Apollo.MutationFunction<PaymentUpdateManyMutation, PaymentUpdateManyMutationVariables>;

/**
 * __usePaymentUpdateManyMutation__
 *
 * To run a mutation, you first call `usePaymentUpdateManyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentUpdateManyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentUpdateManyMutation, { data, loading, error }] = usePaymentUpdateManyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentUpdateManyMutation(baseOptions?: Apollo.MutationHookOptions<PaymentUpdateManyMutation, PaymentUpdateManyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentUpdateManyMutation, PaymentUpdateManyMutationVariables>(PaymentUpdateManyDocument, options);
      }
export type PaymentUpdateManyMutationHookResult = ReturnType<typeof usePaymentUpdateManyMutation>;
export type PaymentUpdateManyMutationResult = Apollo.MutationResult<PaymentUpdateManyMutation>;
export type PaymentUpdateManyMutationOptions = Apollo.BaseMutationOptions<PaymentUpdateManyMutation, PaymentUpdateManyMutationVariables>;
export const PaymentSendReceiptDocument = gql`
    mutation PaymentSendReceipt($input: PaymentSendReceiptInput!) {
  paymentSendReceipt(input: $input) {
    email {
      id
    }
  }
}
    `;
export type PaymentSendReceiptMutationFn = Apollo.MutationFunction<PaymentSendReceiptMutation, PaymentSendReceiptMutationVariables>;

/**
 * __usePaymentSendReceiptMutation__
 *
 * To run a mutation, you first call `usePaymentSendReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentSendReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentSendReceiptMutation, { data, loading, error }] = usePaymentSendReceiptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentSendReceiptMutation(baseOptions?: Apollo.MutationHookOptions<PaymentSendReceiptMutation, PaymentSendReceiptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentSendReceiptMutation, PaymentSendReceiptMutationVariables>(PaymentSendReceiptDocument, options);
      }
export type PaymentSendReceiptMutationHookResult = ReturnType<typeof usePaymentSendReceiptMutation>;
export type PaymentSendReceiptMutationResult = Apollo.MutationResult<PaymentSendReceiptMutation>;
export type PaymentSendReceiptMutationOptions = Apollo.BaseMutationOptions<PaymentSendReceiptMutation, PaymentSendReceiptMutationVariables>;
export const PaymentDeleteDocument = gql`
    mutation PaymentDelete($input: PaymentDeleteInput!) {
  paymentDelete(input: $input) {
    payment {
      ...PaymentDetail
    }
  }
}
    ${PaymentDetailFragmentDoc}`;
export type PaymentDeleteMutationFn = Apollo.MutationFunction<PaymentDeleteMutation, PaymentDeleteMutationVariables>;

/**
 * __usePaymentDeleteMutation__
 *
 * To run a mutation, you first call `usePaymentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentDeleteMutation, { data, loading, error }] = usePaymentDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<PaymentDeleteMutation, PaymentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentDeleteMutation, PaymentDeleteMutationVariables>(PaymentDeleteDocument, options);
      }
export type PaymentDeleteMutationHookResult = ReturnType<typeof usePaymentDeleteMutation>;
export type PaymentDeleteMutationResult = Apollo.MutationResult<PaymentDeleteMutation>;
export type PaymentDeleteMutationOptions = Apollo.BaseMutationOptions<PaymentDeleteMutation, PaymentDeleteMutationVariables>;