/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  YearMonth: { input: string; output: string };
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
  EXCLUDE = 'EXCLUDE',
}

export type Consent = {
  __typename?: 'Consent';
  type: Scalars['String']['output'];
  acceptedAt: Scalars['Float']['output'];
};

export type ConsentInput = {
  type: Scalars['String']['input'];
  acceptedAt: Scalars['Float']['input'];
};

export type CopyCoursesInput = {
  courseIds: Array<Scalars['ID']['input']>;
  toYear: Scalars['Int']['input'];
};

export type CopyCoursesPayload = {
  __typename?: 'CopyCoursesPayload';
  createdCount: Scalars['Int']['output'];
};

export type CopyFeesInput = {
  feeIds: Array<Scalars['ID']['input']>;
  toYear: Scalars['Int']['input'];
};

export type CopyFeesPayload = {
  __typename?: 'CopyFeesPayload';
  createdCount: Scalars['Int']['output'];
};

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
  socialYear?: InputMaybe<Scalars['Int']['input']>;
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
  CREATED_AT = 'CREATED_AT',
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
  CREATED_AT = 'CREATED_AT',
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
  MEDICAL_CERTIFICATE_EXPIRATION = 'MEDICAL_CERTIFICATE_EXPIRATION',
}

export type Enrollment = {
  __typename?: 'Enrollment';
  id: Scalars['ID']['output'];
  member: Member;
  socialYear: Scalars['Int']['output'];
  status: EnrollmentStatusEnum;
  courses: Array<Course>;
  shiftIds: Array<Scalars['ID']['output']>;
  qualification: QualificationEnum;
  socialCardNumber?: Maybe<Scalars['Int']['output']>;
  asiCardNumber?: Maybe<Scalars['String']['output']>;
  csenCardNumber?: Maybe<Scalars['String']['output']>;
  registrationRequestDate?: Maybe<Scalars['Float']['output']>;
  registrationAcceptanceDate?: Maybe<Scalars['Float']['output']>;
  medicalCertificateExpireAt?: Maybe<Scalars['Float']['output']>;
  medicalCertificateType?: Maybe<MedicalCertificateTypeEnum>;
  medicalCertificateKey?: Maybe<Scalars['String']['output']>;
  consents: Array<Consent>;
  excludeFromCommunications: Scalars['Boolean']['output'];
  payments: Array<Payment>;
  attendances: Array<Attendance>;
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type EnrollmentConfirmInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type EnrollmentConfirmPayload = {
  __typename?: 'EnrollmentConfirmPayload';
  modifiedCount: Scalars['Int']['output'];
};

export type EnrollmentCreateInput = {
  memberId: Scalars['ID']['input'];
  socialYear: Scalars['Int']['input'];
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  qualification?: InputMaybe<QualificationEnum>;
  registrationRequestDate?: InputMaybe<Scalars['Float']['input']>;
  registrationAcceptanceDate?: InputMaybe<Scalars['Float']['input']>;
  socialCardNumber?: InputMaybe<Scalars['Int']['input']>;
  asiCardNumber?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  medicalCertificateExpireAt?: InputMaybe<Scalars['Float']['input']>;
  medicalCertificateType?: InputMaybe<MedicalCertificateTypeEnum>;
  consents?: InputMaybe<Array<ConsentInput>>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EnrollmentCreatePayload = {
  __typename?: 'EnrollmentCreatePayload';
  enrollment: Enrollment;
};

export type EnrollmentDeleteInput = {
  id: Scalars['ID']['input'];
};

export type EnrollmentDeletePayload = {
  __typename?: 'EnrollmentDeletePayload';
  enrollment: Enrollment;
};

export type EnrollmentFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  socialYear?: InputMaybe<Scalars['Int']['input']>;
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  status?: InputMaybe<EnrollmentStatusEnum>;
  qualification?: InputMaybe<QualificationEnum>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
  medicalCertificateExpiration?: InputMaybe<Array<MedicalCertificateExpirationEnum>>;
  unpaidRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  monthsNotPaid?: InputMaybe<Array<Scalars['Float']['input']>>;
  sortBy?: InputMaybe<EnrollmentSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type EnrollmentPagination = {
  __typename?: 'EnrollmentPagination';
  data: Array<Enrollment>;
  pageInfo: PageInfo;
};

export enum EnrollmentSortEnum {
  SOCIAL_YEAR = 'SOCIAL_YEAR',
  STATUS = 'STATUS',
  SOCIAL_CARD_NUMBER = 'SOCIAL_CARD_NUMBER',
  MEMBER_NAME = 'MEMBER_NAME',
  QUALIFICATION = 'QUALIFICATION',
  REGISTRATION_REQUEST_DATE = 'REGISTRATION_REQUEST_DATE',
  REGISTRATION_ACCEPTANCE_DATE = 'REGISTRATION_ACCEPTANCE_DATE',
  CREATED_AT = 'CREATED_AT',
}

export enum EnrollmentStatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
}

export type EnrollmentUpdateInput = {
  id: Scalars['ID']['input'];
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  qualification?: InputMaybe<QualificationEnum>;
  registrationRequestDate?: InputMaybe<Scalars['Float']['input']>;
  registrationAcceptanceDate?: InputMaybe<Scalars['Float']['input']>;
  socialCardNumber?: InputMaybe<Scalars['Int']['input']>;
  emptySocialCardNumber?: InputMaybe<Scalars['Boolean']['input']>;
  asiCardNumber?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  medicalCertificateExpireAt?: InputMaybe<Scalars['Float']['input']>;
  medicalCertificateType?: InputMaybe<MedicalCertificateTypeEnum>;
  medicalCertificateKey?: InputMaybe<Scalars['String']['input']>;
  consents?: InputMaybe<Array<ConsentInput>>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EnrollmentUpdatePayload = {
  __typename?: 'EnrollmentUpdatePayload';
  enrollment: Enrollment;
};

export type Fee = {
  __typename?: 'Fee';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: FeeTypeEnum;
  course?: Maybe<Course>;
  amount: Scalars['Float']['output'];
  recurrence?: Maybe<RecurrenceEnum>;
  reason: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  socialYear: Scalars['Int']['output'];
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type FeeCreateInput = {
  name: Scalars['String']['input'];
  type: FeeTypeEnum;
  courseId?: InputMaybe<Scalars['ID']['input']>;
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
  type?: InputMaybe<FeeTypeEnum>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  reason?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  socialYear?: InputMaybe<Scalars['Int']['input']>;
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
  CREATED_AT = 'CREATED_AT',
}

export enum FeeTypeEnum {
  MEMBERSHIP = 'MEMBERSHIP',
  COURSE = 'COURSE',
  INSURANCE = 'INSURANCE',
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
  NOT_ENTERED = 'NOT_ENTERED',
}

export type MedicalCertificateInput = {
  base64?: InputMaybe<Scalars['String']['input']>;
  expireAt?: InputMaybe<Scalars['Float']['input']>;
};

export enum MedicalCertificateTypeEnum {
  AGONISTIC = 'AGONISTIC',
  NON_AGONISTIC = 'NON_AGONISTIC',
}

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  taxCode: Scalars['String']['output'];
  birthday: Scalars['Float']['output'];
  isUnderage: Scalars['Boolean']['output'];
  address?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Parent>;
  enrollments: Array<Enrollment>;
  currentEnrollment?: Maybe<Enrollment>;
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type MemberEnrollmentsArgs = {
  socialYear?: InputMaybe<Scalars['Int']['input']>;
};

export type MemberCreateEnrollmentInput = {
  socialYear: Scalars['Int']['input'];
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  qualification?: InputMaybe<QualificationEnum>;
  registrationRequestDate?: InputMaybe<Scalars['Float']['input']>;
  registrationAcceptanceDate?: InputMaybe<Scalars['Float']['input']>;
  socialCardNumber?: InputMaybe<Scalars['Int']['input']>;
  asiCardNumber?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  medicalCertificateExpireAt?: InputMaybe<Scalars['Float']['input']>;
  medicalCertificateType?: InputMaybe<MedicalCertificateTypeEnum>;
  consents?: InputMaybe<Array<ConsentInput>>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MemberCreateInput = {
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<ParentInput>;
  enrollment?: InputMaybe<MemberCreateEnrollmentInput>;
};

export type MemberCreatePayload = {
  __typename?: 'MemberCreatePayload';
  member: Member;
  enrollment?: Maybe<Enrollment>;
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
  CREATED_AT = 'CREATED_AT',
}

export type MemberUpdateEnrollmentInput = {
  id: Scalars['ID']['input'];
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  qualification?: InputMaybe<QualificationEnum>;
  registrationRequestDate?: InputMaybe<Scalars['Float']['input']>;
  registrationAcceptanceDate?: InputMaybe<Scalars['Float']['input']>;
  socialCardNumber?: InputMaybe<Scalars['Int']['input']>;
  emptySocialCardNumber?: InputMaybe<Scalars['Boolean']['input']>;
  asiCardNumber?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  medicalCertificateExpireAt?: InputMaybe<Scalars['Float']['input']>;
  medicalCertificateType?: InputMaybe<MedicalCertificateTypeEnum>;
  medicalCertificateKey?: InputMaybe<Scalars['String']['input']>;
  consents?: InputMaybe<Array<ConsentInput>>;
  excludeFromCommunications?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MemberUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<ParentInput>;
  enrollment?: InputMaybe<MemberUpdateEnrollmentInput>;
};

export type MemberUpdatePayload = {
  __typename?: 'MemberUpdatePayload';
  member: Member;
  enrollment?: Maybe<Enrollment>;
};

export type Mutation = {
  __typename?: 'Mutation';
  verifyEmailSettings: VerifyEmailSettingsPayload;
  login: LoginPayload;
  settingUpdate: SettingUpdatePayload;
  seasonRenew: SeasonRenewPayload;
  copyFees: CopyFeesPayload;
  copyCourses: CopyCoursesPayload;
  paymentUpdateMany: PaymentUpdateManyPayload;
  paymentUpdate: PaymentUpdatePayload;
  paymentSendReceipt: PaymentSendReceiptPayload;
  paymentDelete: PaymentDeletePayload;
  paymentCreate: PaymentCreatePayload;
  memberUpdate: MemberUpdatePayload;
  memberDelete: MemberDeletePayload;
  memberCreate: MemberCreatePayload;
  feeUpdate: FeeUpdatePayload;
  feeDelete: FeeDeletePayload;
  feeCreate: FeeCreatePayload;
  enrollmentUpdate: EnrollmentUpdatePayload;
  registrationRequest: RegistrationRequestPayload;
  enrollmentDelete: EnrollmentDeletePayload;
  enrollmentCreate: EnrollmentCreatePayload;
  enrollmentConfirm: EnrollmentConfirmPayload;
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

export type MutationSeasonRenewArgs = {
  input: SeasonRenewInput;
};

export type MutationCopyFeesArgs = {
  input: CopyFeesInput;
};

export type MutationCopyCoursesArgs = {
  input: CopyCoursesInput;
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

export type MutationMemberUpdateArgs = {
  input: MemberUpdateInput;
};

export type MutationMemberDeleteArgs = {
  input: MemberDeleteInput;
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

export type MutationEnrollmentUpdateArgs = {
  input: EnrollmentUpdateInput;
};

export type MutationRegistrationRequestArgs = {
  input: RegistrationRequestInput;
};

export type MutationEnrollmentDeleteArgs = {
  input: EnrollmentDeleteInput;
};

export type MutationEnrollmentCreateArgs = {
  input: EnrollmentCreateInput;
};

export type MutationEnrollmentConfirmArgs = {
  input: EnrollmentConfirmInput;
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
  fullName: Scalars['String']['output'];
  taxCode: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type ParentInput = {
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
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
  socialYear: Scalars['Int']['output'];
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
  reason: Scalars['String']['input'];
  socialYear: Scalars['Int']['input'];
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
  updatedPayments: Array<Payment>;
};

export type PaymentFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  counter?: InputMaybe<Scalars['Int']['input']>;
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  feeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  months?: InputMaybe<Array<Scalars['YearMonth']['input']>>;
  socialYear?: InputMaybe<Scalars['Int']['input']>;
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
  CREATED_AT = 'CREATED_AT',
}

export enum PaymentTypeEnum {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  POS = 'POS',
}

export type PaymentUpdateInput = {
  id: Scalars['ID']['input'];
  memberId?: InputMaybe<Scalars['ID']['input']>;
  feeId?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PaymentTypeEnum>;
  month?: InputMaybe<Scalars['YearMonth']['input']>;
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
  ORDINARY_MEMBER = 'ORDINARY_MEMBER',
}

export type Query = {
  __typename?: 'Query';
  me: User;
  setting: Setting;
  members: MemberPagination;
  member: Member;
  enrollments: EnrollmentPagination;
  enrollment: Enrollment;
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

export type QueryEnrollmentsArgs = {
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<EnrollmentFilter>;
};

export type QueryEnrollmentArgs = {
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

export enum RecaptchaVersionEnum {
  V2 = 'V2',
  V3 = 'V3',
}

export enum RecurrenceEnum {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

export type RegistrationRequestInput = {
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<ParentInput>;
  socialYear: Scalars['Int']['input'];
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  qualification?: InputMaybe<QualificationEnum>;
  consents?: InputMaybe<Array<ConsentInput>>;
  captchaToken: Scalars['String']['input'];
  recaptchaVersion: RecaptchaVersionEnum;
};

export type RegistrationRequestPayload = {
  __typename?: 'RegistrationRequestPayload';
  enrollment: Enrollment;
};

export type SeasonRenewInput = {
  enrollmentIds: Array<Scalars['ID']['input']>;
  toYear: Scalars['Int']['input'];
};

export type SeasonRenewPayload = {
  __typename?: 'SeasonRenewPayload';
  createdCount: Scalars['Int']['output'];
};

export type SendCommunicationInput = {
  recipient: CommunicationRecipientEnum;
  subject: Scalars['String']['input'];
  body: Scalars['String']['input'];
  attachments?: InputMaybe<Array<EmailAttachmentInput>>;
};

export type SendCommunicationPayload = {
  __typename?: 'SendCommunicationPayload';
  sentBatches: Scalars['Int']['output'];
  failedBatches: Scalars['Int']['output'];
  totalRecipients: Scalars['Int']['output'];
};

export type SendDailyMedicalCertificateExpirationInput = {
  daysBeforeMedicalCertificateExpires?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type SendDailyMedicalCertificateExpirationPayload = {
  __typename?: 'SendDailyMedicalCertificateExpirationPayload';
  sentEmails: Scalars['Int']['output'];
  failedEmails: Scalars['Int']['output'];
};

export type SendMonthlyRemindersInput = {
  month: Scalars['YearMonth']['input'];
};

export type SendMonthlyRemindersPayload = {
  __typename?: 'SendMonthlyRemindersPayload';
  sentReminders: Scalars['Int']['output'];
  failedReminders: Scalars['Int']['output'];
};

export type Setting = {
  __typename?: 'Setting';
  associationName: Scalars['String']['output'];
  associationAddress: Scalars['String']['output'];
  associationTaxCode: Scalars['String']['output'];
  emailSettings: EmailSettings;
  emailTextList: EmailTextList;
  attendancesPerMonthToSendReminder: Scalars['Int']['output'];
  daysBeforeMedicalCertificateExpiresToSendEmail: Array<Scalars['Int']['output']>;
};

export type SettingUpdateInput = {
  associationName?: InputMaybe<Scalars['String']['input']>;
  associationAddress?: InputMaybe<Scalars['String']['input']>;
  associationTaxCode?: InputMaybe<Scalars['String']['input']>;
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
  socialYear?: InputMaybe<Scalars['Int']['input']>;
  weekDay?: InputMaybe<Scalars['Int']['input']>;
};

export type ShiftInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  from: Array<Scalars['Int']['input']>;
  to: Array<Scalars['Int']['input']>;
};

export enum SortDirectionEnum {
  ASC = 'asc',
  DESC = 'desc',
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

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation'; login: { __typename?: 'LoginPayload'; token: string } };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query'; me: { __typename?: 'User'; id: string; username: string } };

export type SettingQueryVariables = Exact<{ [key: string]: never }>;

export type SettingQuery = {
  __typename?: 'Query';
  setting: {
    __typename?: 'Setting';
    associationName: string;
    associationAddress: string;
    associationTaxCode: string;
    attendancesPerMonthToSendReminder: number;
    daysBeforeMedicalCertificateExpiresToSendEmail: Array<number>;
    emailSettings: {
      __typename?: 'EmailSettings';
      host: string;
      port: number;
      secure: boolean;
      name?: string | null;
      email?: string | null;
    };
    emailTextList: {
      __typename?: 'EmailTextList';
      receipt: { __typename?: 'EmailText'; subject?: string | null; body?: string | null };
      reminder: { __typename?: 'EmailText'; subject?: string | null; body?: string | null };
      medicalCertificateExpiration: { __typename?: 'EmailText'; subject?: string | null; body?: string | null };
    };
  };
};

export type AttendanceListItemFragment = {
  __typename?: 'Attendance';
  id: string;
  from: number;
  to: number;
  member: { __typename?: 'Member'; fullName: string };
  course: { __typename?: 'Course'; id: string; name: string; color?: string | null };
};

export type AttendancesQueryVariables = Exact<{
  filter: AttendanceFilter;
}>;

export type AttendancesQuery = {
  __typename?: 'Query';
  attendances: {
    __typename?: 'AttendancePagination';
    data: Array<{
      __typename?: 'Attendance';
      id: string;
      from: number;
      to: number;
      member: { __typename?: 'Member'; fullName: string };
      course: { __typename?: 'Course'; id: string; name: string; color?: string | null };
    }>;
    pageInfo: { __typename?: 'PageInfo'; total: number };
  };
};

export type DayAttendancesQueryVariables = Exact<{
  filter: DayAttendancesFilter;
}>;

export type DayAttendancesQuery = {
  __typename?: 'Query';
  dayAttendances: Array<{
    __typename?: 'DayAttendances';
    ids: Array<string>;
    from: number;
    to: number;
    members: Array<{ __typename?: 'Member'; fullName: string }>;
    course: { __typename?: 'Course'; id: string; name: string; color?: string | null };
  }>;
};

export type DayExpireMedicalCertificatesQueryVariables = Exact<{
  filter: DayExpireMedicalCertificatesFilter;
}>;

export type DayExpireMedicalCertificatesQuery = {
  __typename?: 'Query';
  dayExpireMedicalCertificates: Array<{
    __typename?: 'DayExpireMedicalCertificates';
    expireAt: number;
    members: Array<{ __typename?: 'Member'; fullName: string }>;
  }>;
};

export type AttendanceCreateManyMutationVariables = Exact<{
  input: AttendanceCreateManyInput;
}>;

export type AttendanceCreateManyMutation = {
  __typename?: 'Mutation';
  attendanceCreateMany: {
    __typename?: 'AttendanceCreateManyPayload';
    attendances: Array<{
      __typename?: 'Attendance';
      id: string;
      from: number;
      to: number;
      member: { __typename?: 'Member'; fullName: string };
      course: { __typename?: 'Course'; id: string; name: string; color?: string | null };
    }>;
  };
};

export type AttendanceDeleteMutationVariables = Exact<{
  input: AttendanceDeleteInput;
}>;

export type AttendanceDeleteMutation = {
  __typename?: 'Mutation';
  attendanceDelete: {
    __typename?: 'AttendanceDeletePayload';
    attendance: {
      __typename?: 'Attendance';
      id: string;
      from: number;
      to: number;
      member: { __typename?: 'Member'; fullName: string };
      course: { __typename?: 'Course'; id: string; name: string; color?: string | null };
    };
  };
};

export type AttendanceDeleteManyMutationVariables = Exact<{
  input: AttendanceDeleteManyInput;
}>;

export type AttendanceDeleteManyMutation = {
  __typename?: 'Mutation';
  attendanceDeleteMany: { __typename?: 'AttendanceDeleteManyPayload'; success?: boolean | null };
};

export type CourseListItemFragment = { __typename?: 'Course'; id: string; name: string; color?: string | null };

export type CourseDetailFragment = {
  __typename?: 'Course';
  canDelete: boolean;
  createdAt: number;
  updatedAt: number;
  id: string;
  name: string;
  color?: string | null;
  shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
};

export type CoursesSearcherQueryVariables = Exact<{
  filter?: InputMaybe<CourseFilter>;
}>;

export type CoursesSearcherQuery = {
  __typename?: 'Query';
  courses: { __typename?: 'CoursePagination'; data: Array<{ __typename?: 'Course'; id: string; name: string }> };
};

export type CourseSearcherQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type CourseSearcherQuery = { __typename?: 'Query'; course: { __typename?: 'Course'; id: string; name: string } };

export type ShiftsQueryVariables = Exact<{
  filter?: InputMaybe<ShiftFilter>;
}>;

export type ShiftsQuery = {
  __typename?: 'Query';
  shifts: Array<{
    __typename?: 'ShiftDetail';
    id: string;
    weekDay: number;
    from: Array<number>;
    to: Array<number>;
    course: { __typename?: 'Course'; id: string; name: string };
  }>;
};

export type CoursesQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<CourseFilter>;
}>;

export type CoursesQuery = {
  __typename?: 'Query';
  courses: {
    __typename?: 'CoursePagination';
    data: Array<{ __typename?: 'Course'; id: string; name: string; color?: string | null }>;
    pageInfo: { __typename?: 'PageInfo'; total: number };
  };
};

export type CourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type CourseQuery = {
  __typename?: 'Query';
  course: {
    __typename?: 'Course';
    canDelete: boolean;
    createdAt: number;
    updatedAt: number;
    id: string;
    name: string;
    color?: string | null;
    shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
  };
};

export type CourseCreateMutationVariables = Exact<{
  input: CourseCreateInput;
}>;

export type CourseCreateMutation = {
  __typename?: 'Mutation';
  courseCreate: {
    __typename?: 'CourseCreatePayload';
    course: {
      __typename?: 'Course';
      canDelete: boolean;
      createdAt: number;
      updatedAt: number;
      id: string;
      name: string;
      color?: string | null;
      shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
    };
  };
};

export type CourseUpdateMutationVariables = Exact<{
  input: CourseUpdateInput;
}>;

export type CourseUpdateMutation = {
  __typename?: 'Mutation';
  courseUpdate: {
    __typename?: 'CourseUpdatePayload';
    course: {
      __typename?: 'Course';
      canDelete: boolean;
      createdAt: number;
      updatedAt: number;
      id: string;
      name: string;
      color?: string | null;
      shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
    };
  };
};

export type CourseDeleteMutationVariables = Exact<{
  input: CourseDeleteInput;
}>;

export type CourseDeleteMutation = {
  __typename?: 'Mutation';
  courseDelete: {
    __typename?: 'CourseDeletePayload';
    course: {
      __typename?: 'Course';
      canDelete: boolean;
      createdAt: number;
      updatedAt: number;
      id: string;
      name: string;
      color?: string | null;
      shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
    };
  };
};

export type VerifyEmailSettingsMutationVariables = Exact<{ [key: string]: never }>;

export type VerifyEmailSettingsMutation = {
  __typename?: 'Mutation';
  verifyEmailSettings: { __typename?: 'VerifyEmailSettingsPayload'; verified?: boolean | null };
};

export type SettingUpdateMutationVariables = Exact<{
  input: SettingUpdateInput;
}>;

export type SettingUpdateMutation = {
  __typename?: 'Mutation';
  settingUpdate: {
    __typename?: 'SettingUpdatePayload';
    setting: {
      __typename?: 'Setting';
      associationName: string;
      associationAddress: string;
      associationTaxCode: string;
      attendancesPerMonthToSendReminder: number;
      daysBeforeMedicalCertificateExpiresToSendEmail: Array<number>;
      emailSettings: {
        __typename?: 'EmailSettings';
        host: string;
        port: number;
        secure: boolean;
        name?: string | null;
        email?: string | null;
      };
      emailTextList: {
        __typename?: 'EmailTextList';
        receipt: { __typename?: 'EmailText'; subject?: string | null; body?: string | null };
        reminder: { __typename?: 'EmailText'; subject?: string | null; body?: string | null };
        medicalCertificateExpiration: { __typename?: 'EmailText'; subject?: string | null; body?: string | null };
      };
    };
  };
};

export type MemberListItemFragment = {
  __typename?: 'Member';
  id: string;
  fullName: string;
  taxCode: string;
  email?: string | null;
  phone?: string | null;
  createdAt: number;
};

export type MemberDetailFragment = {
  __typename?: 'Member';
  name: string;
  surname: string;
  address?: string | null;
  isUnderage: boolean;
  canDelete: boolean;
  updatedAt: number;
  id: string;
  fullName: string;
  taxCode: string;
  email?: string | null;
  phone?: string | null;
  createdAt: number;
  parent?: {
    __typename?: 'Parent';
    name: string;
    surname: string;
    taxCode: string;
    email?: string | null;
    phone?: string | null;
  } | null;
  currentEnrollment?: {
    __typename?: 'Enrollment';
    id: string;
    medicalCertificateExpireAt?: number | null;
    courses: Array<{ __typename?: 'Course'; id: string; name: string }>;
  } | null;
};

export type MembersSearcherQueryVariables = Exact<{
  filter?: InputMaybe<MemberFilter>;
}>;

export type MembersSearcherQuery = {
  __typename?: 'Query';
  members: {
    __typename?: 'MemberPagination';
    data: Array<{ __typename?: 'Member'; id: string; fullName: string; email?: string | null }>;
  };
};

export type MemberSearcherQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type MemberSearcherQuery = {
  __typename?: 'Query';
  member: { __typename?: 'Member'; id: string; fullName: string; email?: string | null };
};

export type MembersQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<MemberFilter>;
}>;

export type MembersQuery = {
  __typename?: 'Query';
  members: {
    __typename?: 'MemberPagination';
    data: Array<{
      __typename?: 'Member';
      id: string;
      fullName: string;
      taxCode: string;
      email?: string | null;
      phone?: string | null;
      createdAt: number;
    }>;
    pageInfo: { __typename?: 'PageInfo'; total: number };
  };
};

export type MemberQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type MemberQuery = {
  __typename?: 'Query';
  member: {
    __typename?: 'Member';
    name: string;
    surname: string;
    address?: string | null;
    isUnderage: boolean;
    canDelete: boolean;
    updatedAt: number;
    id: string;
    fullName: string;
    taxCode: string;
    email?: string | null;
    phone?: string | null;
    createdAt: number;
    parent?: {
      __typename?: 'Parent';
      name: string;
      surname: string;
      taxCode: string;
      email?: string | null;
      phone?: string | null;
    } | null;
    currentEnrollment?: {
      __typename?: 'Enrollment';
      id: string;
      medicalCertificateExpireAt?: number | null;
      courses: Array<{ __typename?: 'Course'; id: string; name: string }>;
    } | null;
  };
};

export type MembersCsvQueryVariables = Exact<{
  filter?: InputMaybe<MemberFilter>;
}>;

export type MembersCsvQuery = {
  __typename?: 'Query';
  members: {
    __typename?: 'MemberPagination';
    data: Array<{
      __typename?: 'Member';
      fullName: string;
      birthday: number;
      taxCode: string;
      address?: string | null;
      currentEnrollment?: {
        __typename?: 'Enrollment';
        socialCardNumber?: number | null;
        registrationRequestDate?: number | null;
        registrationAcceptanceDate?: number | null;
        qualification: QualificationEnum;
        csenCardNumber?: string | null;
        asiCardNumber?: string | null;
      } | null;
    }>;
  };
};

export type MemberCreateMutationVariables = Exact<{
  input: MemberCreateInput;
}>;

export type MemberCreateMutation = {
  __typename?: 'Mutation';
  memberCreate: {
    __typename?: 'MemberCreatePayload';
    member: {
      __typename?: 'Member';
      name: string;
      surname: string;
      address?: string | null;
      isUnderage: boolean;
      canDelete: boolean;
      updatedAt: number;
      id: string;
      fullName: string;
      taxCode: string;
      email?: string | null;
      phone?: string | null;
      createdAt: number;
      parent?: {
        __typename?: 'Parent';
        name: string;
        surname: string;
        taxCode: string;
        email?: string | null;
        phone?: string | null;
      } | null;
      currentEnrollment?: {
        __typename?: 'Enrollment';
        id: string;
        medicalCertificateExpireAt?: number | null;
        courses: Array<{ __typename?: 'Course'; id: string; name: string }>;
      } | null;
    };
  };
};

export type MemberUpdateMutationVariables = Exact<{
  input: MemberUpdateInput;
}>;

export type MemberUpdateMutation = {
  __typename?: 'Mutation';
  memberUpdate: {
    __typename?: 'MemberUpdatePayload';
    member: {
      __typename?: 'Member';
      name: string;
      surname: string;
      address?: string | null;
      isUnderage: boolean;
      canDelete: boolean;
      updatedAt: number;
      id: string;
      fullName: string;
      taxCode: string;
      email?: string | null;
      phone?: string | null;
      createdAt: number;
      parent?: {
        __typename?: 'Parent';
        name: string;
        surname: string;
        taxCode: string;
        email?: string | null;
        phone?: string | null;
      } | null;
      currentEnrollment?: {
        __typename?: 'Enrollment';
        id: string;
        medicalCertificateExpireAt?: number | null;
        courses: Array<{ __typename?: 'Course'; id: string; name: string }>;
      } | null;
    };
  };
};

export type MemberDeleteMutationVariables = Exact<{
  input: MemberDeleteInput;
}>;

export type MemberDeleteMutation = {
  __typename?: 'Mutation';
  memberDelete: {
    __typename?: 'MemberDeletePayload';
    member: {
      __typename?: 'Member';
      name: string;
      surname: string;
      address?: string | null;
      isUnderage: boolean;
      canDelete: boolean;
      updatedAt: number;
      id: string;
      fullName: string;
      taxCode: string;
      email?: string | null;
      phone?: string | null;
      createdAt: number;
      parent?: {
        __typename?: 'Parent';
        name: string;
        surname: string;
        taxCode: string;
        email?: string | null;
        phone?: string | null;
      } | null;
      currentEnrollment?: {
        __typename?: 'Enrollment';
        id: string;
        medicalCertificateExpireAt?: number | null;
        courses: Array<{ __typename?: 'Course'; id: string; name: string }>;
      } | null;
    };
  };
};

export type FeeListItemFragment = {
  __typename?: 'Fee';
  id: string;
  name: string;
  type: FeeTypeEnum;
  amount: number;
  enabled: boolean;
  socialYear: number;
  course?: { __typename?: 'Course'; id: string; name: string } | null;
};

export type FeeDetailFragment = {
  __typename?: 'Fee';
  recurrence?: RecurrenceEnum | null;
  reason: string;
  createdAt: number;
  updatedAt: number;
  canDelete: boolean;
  id: string;
  name: string;
  type: FeeTypeEnum;
  amount: number;
  enabled: boolean;
  socialYear: number;
  course?: { __typename?: 'Course'; id: string; name: string } | null;
};

export type FeesSearcherQueryVariables = Exact<{
  filter?: InputMaybe<FeeFilter>;
}>;

export type FeesSearcherQuery = {
  __typename?: 'Query';
  fees: {
    __typename?: 'FeePagination';
    data: Array<{
      __typename?: 'Fee';
      id: string;
      name: string;
      type: FeeTypeEnum;
      amount: number;
      recurrence?: RecurrenceEnum | null;
      reason: string;
      course?: { __typename?: 'Course'; name: string } | null;
    }>;
  };
};

export type FeeSearcherQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type FeeSearcherQuery = {
  __typename?: 'Query';
  fee: {
    __typename?: 'Fee';
    id: string;
    name: string;
    type: FeeTypeEnum;
    amount: number;
    recurrence?: RecurrenceEnum | null;
    reason: string;
    course?: { __typename?: 'Course'; name: string } | null;
  };
};

export type FeesQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<FeeFilter>;
}>;

export type FeesQuery = {
  __typename?: 'Query';
  fees: {
    __typename?: 'FeePagination';
    data: Array<{
      __typename?: 'Fee';
      id: string;
      name: string;
      type: FeeTypeEnum;
      amount: number;
      enabled: boolean;
      socialYear: number;
      course?: { __typename?: 'Course'; id: string; name: string } | null;
    }>;
    pageInfo: { __typename?: 'PageInfo'; total: number };
  };
};

export type FeeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type FeeQuery = {
  __typename?: 'Query';
  fee: {
    __typename?: 'Fee';
    recurrence?: RecurrenceEnum | null;
    reason: string;
    createdAt: number;
    updatedAt: number;
    canDelete: boolean;
    id: string;
    name: string;
    type: FeeTypeEnum;
    amount: number;
    enabled: boolean;
    socialYear: number;
    course?: { __typename?: 'Course'; id: string; name: string } | null;
  };
};

export type FeeCreateMutationVariables = Exact<{
  input: FeeCreateInput;
}>;

export type FeeCreateMutation = {
  __typename?: 'Mutation';
  feeCreate: {
    __typename?: 'FeeCreatePayload';
    fee: {
      __typename?: 'Fee';
      recurrence?: RecurrenceEnum | null;
      reason: string;
      createdAt: number;
      updatedAt: number;
      canDelete: boolean;
      id: string;
      name: string;
      type: FeeTypeEnum;
      amount: number;
      enabled: boolean;
      socialYear: number;
      course?: { __typename?: 'Course'; id: string; name: string } | null;
    };
  };
};

export type FeeUpdateMutationVariables = Exact<{
  input: FeeUpdateInput;
}>;

export type FeeUpdateMutation = {
  __typename?: 'Mutation';
  feeUpdate: {
    __typename?: 'FeeUpdatePayload';
    fee: {
      __typename?: 'Fee';
      recurrence?: RecurrenceEnum | null;
      reason: string;
      createdAt: number;
      updatedAt: number;
      canDelete: boolean;
      id: string;
      name: string;
      type: FeeTypeEnum;
      amount: number;
      enabled: boolean;
      socialYear: number;
      course?: { __typename?: 'Course'; id: string; name: string } | null;
    };
  };
};

export type FeeDeleteMutationVariables = Exact<{
  input: FeeDeleteInput;
}>;

export type FeeDeleteMutation = {
  __typename?: 'Mutation';
  feeDelete: {
    __typename?: 'FeeDeletePayload';
    fee: {
      __typename?: 'Fee';
      recurrence?: RecurrenceEnum | null;
      reason: string;
      createdAt: number;
      updatedAt: number;
      canDelete: boolean;
      id: string;
      name: string;
      type: FeeTypeEnum;
      amount: number;
      enabled: boolean;
      socialYear: number;
      course?: { __typename?: 'Course'; id: string; name: string } | null;
    };
  };
};

export type EnrollmentListItemFragment = {
  __typename?: 'Enrollment';
  id: string;
  socialYear: number;
  status: EnrollmentStatusEnum;
  shiftIds: Array<string>;
  qualification: QualificationEnum;
  socialCardNumber?: number | null;
  medicalCertificateExpireAt?: number | null;
  excludeFromCommunications: boolean;
  member: { __typename?: 'Member'; id: string; fullName: string };
  courses: Array<{
    __typename?: 'Course';
    id: string;
    name: string;
    shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
  }>;
  payments: Array<{ __typename?: 'Payment'; id: string; month?: string | null }>;
  attendances: Array<{
    __typename?: 'Attendance';
    id: string;
    from: number;
    to: number;
    course: { __typename?: 'Course'; id: string };
  }>;
};

export type EnrollmentDetailFragment = {
  __typename?: 'Enrollment';
  shiftIds: Array<string>;
  asiCardNumber?: string | null;
  csenCardNumber?: string | null;
  registrationRequestDate?: number | null;
  registrationAcceptanceDate?: number | null;
  medicalCertificateType?: MedicalCertificateTypeEnum | null;
  medicalCertificateKey?: string | null;
  excludeFromCommunications: boolean;
  createdAt: number;
  updatedAt: number;
  id: string;
  socialYear: number;
  status: EnrollmentStatusEnum;
  qualification: QualificationEnum;
  socialCardNumber?: number | null;
  medicalCertificateExpireAt?: number | null;
  consents: Array<{ __typename?: 'Consent'; type: string; acceptedAt: number }>;
  member: { __typename?: 'Member'; id: string; fullName: string };
  courses: Array<{
    __typename?: 'Course';
    id: string;
    name: string;
    shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
  }>;
  payments: Array<{ __typename?: 'Payment'; id: string; month?: string | null }>;
  attendances: Array<{
    __typename?: 'Attendance';
    id: string;
    from: number;
    to: number;
    course: { __typename?: 'Course'; id: string };
  }>;
};

export type EnrollmentsQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<EnrollmentFilter>;
}>;

export type EnrollmentsQuery = {
  __typename?: 'Query';
  enrollments: {
    __typename?: 'EnrollmentPagination';
    data: Array<{
      __typename?: 'Enrollment';
      id: string;
      socialYear: number;
      status: EnrollmentStatusEnum;
      shiftIds: Array<string>;
      qualification: QualificationEnum;
      socialCardNumber?: number | null;
      medicalCertificateExpireAt?: number | null;
      excludeFromCommunications: boolean;
      member: { __typename?: 'Member'; id: string; fullName: string };
      courses: Array<{
        __typename?: 'Course';
        id: string;
        name: string;
        shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
      }>;
      payments: Array<{ __typename?: 'Payment'; id: string; month?: string | null }>;
      attendances: Array<{
        __typename?: 'Attendance';
        id: string;
        from: number;
        to: number;
        course: { __typename?: 'Course'; id: string };
      }>;
    }>;
    pageInfo: { __typename?: 'PageInfo'; total: number };
  };
};

export type EnrollmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type EnrollmentQuery = {
  __typename?: 'Query';
  enrollment: {
    __typename?: 'Enrollment';
    shiftIds: Array<string>;
    asiCardNumber?: string | null;
    csenCardNumber?: string | null;
    registrationRequestDate?: number | null;
    registrationAcceptanceDate?: number | null;
    medicalCertificateType?: MedicalCertificateTypeEnum | null;
    medicalCertificateKey?: string | null;
    excludeFromCommunications: boolean;
    createdAt: number;
    updatedAt: number;
    id: string;
    socialYear: number;
    status: EnrollmentStatusEnum;
    qualification: QualificationEnum;
    socialCardNumber?: number | null;
    medicalCertificateExpireAt?: number | null;
    consents: Array<{ __typename?: 'Consent'; type: string; acceptedAt: number }>;
    member: { __typename?: 'Member'; id: string; fullName: string };
    courses: Array<{
      __typename?: 'Course';
      id: string;
      name: string;
      shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
    }>;
    payments: Array<{ __typename?: 'Payment'; id: string; month?: string | null }>;
    attendances: Array<{
      __typename?: 'Attendance';
      id: string;
      from: number;
      to: number;
      course: { __typename?: 'Course'; id: string };
    }>;
  };
};

export type EnrollmentCreateMutationVariables = Exact<{
  input: EnrollmentCreateInput;
}>;

export type EnrollmentCreateMutation = {
  __typename?: 'Mutation';
  enrollmentCreate: {
    __typename?: 'EnrollmentCreatePayload';
    enrollment: {
      __typename?: 'Enrollment';
      shiftIds: Array<string>;
      asiCardNumber?: string | null;
      csenCardNumber?: string | null;
      registrationRequestDate?: number | null;
      registrationAcceptanceDate?: number | null;
      medicalCertificateType?: MedicalCertificateTypeEnum | null;
      medicalCertificateKey?: string | null;
      excludeFromCommunications: boolean;
      createdAt: number;
      updatedAt: number;
      id: string;
      socialYear: number;
      status: EnrollmentStatusEnum;
      qualification: QualificationEnum;
      socialCardNumber?: number | null;
      medicalCertificateExpireAt?: number | null;
      consents: Array<{ __typename?: 'Consent'; type: string; acceptedAt: number }>;
      member: { __typename?: 'Member'; id: string; fullName: string };
      courses: Array<{
        __typename?: 'Course';
        id: string;
        name: string;
        shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
      }>;
      payments: Array<{ __typename?: 'Payment'; id: string; month?: string | null }>;
      attendances: Array<{
        __typename?: 'Attendance';
        id: string;
        from: number;
        to: number;
        course: { __typename?: 'Course'; id: string };
      }>;
    };
  };
};

export type EnrollmentUpdateMutationVariables = Exact<{
  input: EnrollmentUpdateInput;
}>;

export type EnrollmentUpdateMutation = {
  __typename?: 'Mutation';
  enrollmentUpdate: {
    __typename?: 'EnrollmentUpdatePayload';
    enrollment: {
      __typename?: 'Enrollment';
      shiftIds: Array<string>;
      asiCardNumber?: string | null;
      csenCardNumber?: string | null;
      registrationRequestDate?: number | null;
      registrationAcceptanceDate?: number | null;
      medicalCertificateType?: MedicalCertificateTypeEnum | null;
      medicalCertificateKey?: string | null;
      excludeFromCommunications: boolean;
      createdAt: number;
      updatedAt: number;
      id: string;
      socialYear: number;
      status: EnrollmentStatusEnum;
      qualification: QualificationEnum;
      socialCardNumber?: number | null;
      medicalCertificateExpireAt?: number | null;
      consents: Array<{ __typename?: 'Consent'; type: string; acceptedAt: number }>;
      member: { __typename?: 'Member'; id: string; fullName: string };
      courses: Array<{
        __typename?: 'Course';
        id: string;
        name: string;
        shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
      }>;
      payments: Array<{ __typename?: 'Payment'; id: string; month?: string | null }>;
      attendances: Array<{
        __typename?: 'Attendance';
        id: string;
        from: number;
        to: number;
        course: { __typename?: 'Course'; id: string };
      }>;
    };
  };
};

export type EnrollmentDeleteMutationVariables = Exact<{
  input: EnrollmentDeleteInput;
}>;

export type EnrollmentDeleteMutation = {
  __typename?: 'Mutation';
  enrollmentDelete: {
    __typename?: 'EnrollmentDeletePayload';
    enrollment: {
      __typename?: 'Enrollment';
      shiftIds: Array<string>;
      asiCardNumber?: string | null;
      csenCardNumber?: string | null;
      registrationRequestDate?: number | null;
      registrationAcceptanceDate?: number | null;
      medicalCertificateType?: MedicalCertificateTypeEnum | null;
      medicalCertificateKey?: string | null;
      excludeFromCommunications: boolean;
      createdAt: number;
      updatedAt: number;
      id: string;
      socialYear: number;
      status: EnrollmentStatusEnum;
      qualification: QualificationEnum;
      socialCardNumber?: number | null;
      medicalCertificateExpireAt?: number | null;
      consents: Array<{ __typename?: 'Consent'; type: string; acceptedAt: number }>;
      member: { __typename?: 'Member'; id: string; fullName: string };
      courses: Array<{
        __typename?: 'Course';
        id: string;
        name: string;
        shifts: Array<Array<{ __typename?: 'Shift'; id: string; from: Array<number>; to: Array<number> }>>;
      }>;
      payments: Array<{ __typename?: 'Payment'; id: string; month?: string | null }>;
      attendances: Array<{
        __typename?: 'Attendance';
        id: string;
        from: number;
        to: number;
        course: { __typename?: 'Course'; id: string };
      }>;
    };
  };
};

export type EnrollmentConfirmMutationVariables = Exact<{
  input: EnrollmentConfirmInput;
}>;

export type EnrollmentConfirmMutation = {
  __typename?: 'Mutation';
  enrollmentConfirm: { __typename?: 'EnrollmentConfirmPayload'; modifiedCount: number };
};

export type EmailsQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<EmailFilter>;
}>;

export type EmailsQuery = {
  __typename?: 'Query';
  emails: {
    __typename?: 'EmailPagination';
    data: Array<{
      __typename?: 'Email';
      id: string;
      type: EmailTypeEnum;
      to: string;
      subject: string;
      body: string;
      createdAt: number;
      course?: { __typename?: 'Course'; name: string } | null;
    }>;
    pageInfo: { __typename?: 'PageInfo'; total: number };
  };
};

export type PaymentSendReminderMutationVariables = Exact<{
  input: PaymentSendReminderInput;
}>;

export type PaymentSendReminderMutation = {
  __typename?: 'Mutation';
  paymentSendReminder: { __typename?: 'PaymentSendReminderPayload'; email: { __typename?: 'Email'; id: string } };
};

export type SendMonthlyRemindersMutationVariables = Exact<{
  input: SendMonthlyRemindersInput;
}>;

export type SendMonthlyRemindersMutation = {
  __typename?: 'Mutation';
  sendMonthlyReminders: { __typename?: 'SendMonthlyRemindersPayload'; sentReminders: number; failedReminders: number };
};

export type PaymentListItemFragment = {
  __typename?: 'Payment';
  id: string;
  counter: number;
  amount: number;
  month?: string | null;
  socialYear: number;
  type: PaymentTypeEnum;
  sent: boolean;
  member: { __typename?: 'Member'; id: string; fullName: string };
  fee: { __typename?: 'Fee'; id: string; name: string; course?: { __typename?: 'Course'; name: string } | null };
};

export type PaymentDetailFragment = {
  __typename?: 'Payment';
  date: number;
  reason: string;
  canDelete: boolean;
  createdAt: number;
  updatedAt: number;
  id: string;
  counter: number;
  amount: number;
  month?: string | null;
  socialYear: number;
  type: PaymentTypeEnum;
  sent: boolean;
  fee: {
    __typename?: 'Fee';
    id: string;
    name: string;
    type: FeeTypeEnum;
    amount: number;
    recurrence?: RecurrenceEnum | null;
    reason: string;
    course?: { __typename?: 'Course'; name: string } | null;
  };
  member: { __typename?: 'Member'; id: string; fullName: string };
};

export type PaymentPdfFragment = {
  __typename?: 'Payment';
  counter: number;
  date: number;
  amount: number;
  reason: string;
  member: {
    __typename?: 'Member';
    name: string;
    surname: string;
    taxCode: string;
    birthday: number;
    address?: string | null;
    parent?: { __typename?: 'Parent'; name: string; surname: string; taxCode: string } | null;
  };
};

export type PaymentsQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<PaymentFilter>;
}>;

export type PaymentsQuery = {
  __typename?: 'Query';
  payments: {
    __typename?: 'PaymentPagination';
    data: Array<{
      __typename?: 'Payment';
      id: string;
      counter: number;
      amount: number;
      month?: string | null;
      socialYear: number;
      type: PaymentTypeEnum;
      sent: boolean;
      member: { __typename?: 'Member'; id: string; fullName: string };
      fee: { __typename?: 'Fee'; id: string; name: string; course?: { __typename?: 'Course'; name: string } | null };
    }>;
    pageInfo: { __typename?: 'PageInfo'; total: number };
  };
};

export type PaymentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type PaymentQuery = {
  __typename?: 'Query';
  payment: {
    __typename?: 'Payment';
    date: number;
    reason: string;
    canDelete: boolean;
    createdAt: number;
    updatedAt: number;
    id: string;
    counter: number;
    amount: number;
    month?: string | null;
    socialYear: number;
    type: PaymentTypeEnum;
    sent: boolean;
    fee: {
      __typename?: 'Fee';
      id: string;
      name: string;
      type: FeeTypeEnum;
      amount: number;
      recurrence?: RecurrenceEnum | null;
      reason: string;
      course?: { __typename?: 'Course'; name: string } | null;
    };
    member: { __typename?: 'Member'; id: string; fullName: string };
  };
};

export type PaymentsPdfQueryVariables = Exact<{
  filter: PaymentFilter;
}>;

export type PaymentsPdfQuery = {
  __typename?: 'Query';
  payments: {
    __typename?: 'PaymentPagination';
    data: Array<{
      __typename?: 'Payment';
      counter: number;
      date: number;
      amount: number;
      reason: string;
      member: {
        __typename?: 'Member';
        name: string;
        surname: string;
        taxCode: string;
        birthday: number;
        address?: string | null;
        parent?: { __typename?: 'Parent'; name: string; surname: string; taxCode: string } | null;
      };
    }>;
  };
};

export type PaymentPdfQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type PaymentPdfQuery = {
  __typename?: 'Query';
  payment: {
    __typename?: 'Payment';
    counter: number;
    date: number;
    amount: number;
    reason: string;
    member: {
      __typename?: 'Member';
      name: string;
      surname: string;
      taxCode: string;
      birthday: number;
      address?: string | null;
      parent?: { __typename?: 'Parent'; name: string; surname: string; taxCode: string } | null;
    };
  };
};

export type PaymentsCsvQueryVariables = Exact<{
  filter: PaymentFilter;
}>;

export type PaymentsCsvQuery = {
  __typename?: 'Query';
  payments: {
    __typename?: 'PaymentPagination';
    data: Array<{
      __typename?: 'Payment';
      counter: number;
      amount: number;
      date: number;
      month?: string | null;
      socialYear: number;
      type: PaymentTypeEnum;
      member: { __typename?: 'Member'; fullName: string };
      fee: { __typename?: 'Fee'; name: string; course?: { __typename?: 'Course'; name: string } | null };
    }>;
  };
};

export type PaymentCreateMutationVariables = Exact<{
  input: PaymentCreateInput;
}>;

export type PaymentCreateMutation = {
  __typename?: 'Mutation';
  paymentCreate: {
    __typename?: 'PaymentCreatePayload';
    payment: {
      __typename?: 'Payment';
      date: number;
      reason: string;
      canDelete: boolean;
      createdAt: number;
      updatedAt: number;
      id: string;
      counter: number;
      amount: number;
      month?: string | null;
      socialYear: number;
      type: PaymentTypeEnum;
      sent: boolean;
      fee: {
        __typename?: 'Fee';
        id: string;
        name: string;
        type: FeeTypeEnum;
        amount: number;
        recurrence?: RecurrenceEnum | null;
        reason: string;
        course?: { __typename?: 'Course'; name: string } | null;
      };
      member: { __typename?: 'Member'; id: string; fullName: string };
    };
  };
};

export type PaymentUpdateMutationVariables = Exact<{
  input: PaymentUpdateInput;
}>;

export type PaymentUpdateMutation = {
  __typename?: 'Mutation';
  paymentUpdate: {
    __typename?: 'PaymentUpdatePayload';
    payment: {
      __typename?: 'Payment';
      date: number;
      reason: string;
      canDelete: boolean;
      createdAt: number;
      updatedAt: number;
      id: string;
      counter: number;
      amount: number;
      month?: string | null;
      socialYear: number;
      type: PaymentTypeEnum;
      sent: boolean;
      fee: {
        __typename?: 'Fee';
        id: string;
        name: string;
        type: FeeTypeEnum;
        amount: number;
        recurrence?: RecurrenceEnum | null;
        reason: string;
        course?: { __typename?: 'Course'; name: string } | null;
      };
      member: { __typename?: 'Member'; id: string; fullName: string };
    };
  };
};

export type PaymentUpdateManyMutationVariables = Exact<{
  input: PaymentUpdateManyInput;
}>;

export type PaymentUpdateManyMutation = {
  __typename?: 'Mutation';
  paymentUpdateMany: {
    __typename?: 'PaymentUpdateManyPayload';
    payments: Array<{ __typename?: 'Payment'; id: string; sent: boolean }>;
  };
};

export type PaymentSendReceiptMutationVariables = Exact<{
  input: PaymentSendReceiptInput;
}>;

export type PaymentSendReceiptMutation = {
  __typename?: 'Mutation';
  paymentSendReceipt: { __typename?: 'PaymentSendReceiptPayload'; email: { __typename?: 'Email'; id: string } };
};

export type PaymentDeleteMutationVariables = Exact<{
  input: PaymentDeleteInput;
}>;

export type PaymentDeleteMutation = {
  __typename?: 'Mutation';
  paymentDelete: {
    __typename?: 'PaymentDeletePayload';
    payment: { __typename?: 'Payment'; id: string };
    updatedPayments: Array<{ __typename?: 'Payment'; id: string }>;
  };
};

export type SendCommunicationMutationVariables = Exact<{
  input: SendCommunicationInput;
}>;

export type SendCommunicationMutation = {
  __typename?: 'Mutation';
  sendCommunication: {
    __typename?: 'SendCommunicationPayload';
    sentBatches: number;
    failedBatches: number;
    totalRecipients: number;
  };
};

export type RegistrationRequestMutationVariables = Exact<{
  input: RegistrationRequestInput;
}>;

export type RegistrationRequestMutation = {
  __typename?: 'Mutation';
  registrationRequest: {
    __typename?: 'RegistrationRequestPayload';
    enrollment: { __typename?: 'Enrollment'; id: string };
  };
};

export type CopyCoursesMutationVariables = Exact<{
  input: CopyCoursesInput;
}>;

export type CopyCoursesMutation = {
  __typename?: 'Mutation';
  copyCourses: { __typename?: 'CopyCoursesPayload'; createdCount: number };
};

export type CopyFeesMutationVariables = Exact<{
  input: CopyFeesInput;
}>;

export type CopyFeesMutation = {
  __typename?: 'Mutation';
  copyFees: { __typename?: 'CopyFeesPayload'; createdCount: number };
};

export type SeasonRenewMutationVariables = Exact<{
  input: SeasonRenewInput;
}>;

export type SeasonRenewMutation = {
  __typename?: 'Mutation';
  seasonRenew: { __typename?: 'SeasonRenewPayload'; createdCount: number };
};

export const AttendanceListItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AttendanceListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Attendance' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'fullName' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'from' } },
          { kind: 'Field', name: { kind: 'Name', value: 'to' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttendanceListItemFragment, unknown>;
export const CourseListItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CourseListItemFragment, unknown>;
export const CourseDetailFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shifts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CourseDetailFragment, unknown>;
export const MemberListItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MemberListItemFragment, unknown>;
export const MemberDetailFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isUnderage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'parent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentEnrollment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'courses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MemberDetailFragment, unknown>;
export const FeeListItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeeListItemFragment, unknown>;
export const FeeDetailFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeeDetailFragment, unknown>;
export const EnrollmentListItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'qualification' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'month' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendances' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnrollmentListItemFragment, unknown>;
export const EnrollmentDetailFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'asiCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'csenCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationRequestDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationAcceptanceDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateKey' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'consents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'acceptedAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'qualification' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'month' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendances' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnrollmentDetailFragment, unknown>;
export const PaymentListItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'month' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentListItemFragment, unknown>;
export const PaymentDetailFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'month' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentDetailFragment, unknown>;
export const PaymentPdfFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentPdf' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'birthday' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'parent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentPdfFragment, unknown>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'LoginInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'token' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Me' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const SettingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Setting' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'setting' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'associationName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'associationAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'associationTaxCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailSettings' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'host' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'secure' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailTextList' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'receipt' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'subject' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reminder' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'subject' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medicalCertificateExpiration' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'subject' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'attendancesPerMonthToSendReminder' } },
                { kind: 'Field', name: { kind: 'Name', value: 'daysBeforeMedicalCertificateExpiresToSendEmail' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SettingQuery, SettingQueryVariables>;
export const AttendancesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Attendances' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'AttendanceFilter' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendances' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '0' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AttendanceListItem' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AttendanceListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Attendance' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'fullName' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'from' } },
          { kind: 'Field', name: { kind: 'Name', value: 'to' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttendancesQuery, AttendancesQueryVariables>;
export const DayAttendancesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'DayAttendances' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DayAttendancesFilter' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dayAttendances' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '0' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ids' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'members' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'fullName' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DayAttendancesQuery, DayAttendancesQueryVariables>;
export const DayExpireMedicalCertificatesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'DayExpireMedicalCertificates' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DayExpireMedicalCertificatesFilter' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dayExpireMedicalCertificates' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '0' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'expireAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'members' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'fullName' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DayExpireMedicalCertificatesQuery, DayExpireMedicalCertificatesQueryVariables>;
export const AttendanceCreateManyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AttendanceCreateMany' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AttendanceCreateManyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendanceCreateMany' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'attendances' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AttendanceListItem' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AttendanceListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Attendance' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'fullName' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'from' } },
          { kind: 'Field', name: { kind: 'Name', value: 'to' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttendanceCreateManyMutation, AttendanceCreateManyMutationVariables>;
export const AttendanceDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AttendanceDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AttendanceDeleteInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendanceDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'attendance' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AttendanceListItem' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AttendanceListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Attendance' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'fullName' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'from' } },
          { kind: 'Field', name: { kind: 'Name', value: 'to' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttendanceDeleteMutation, AttendanceDeleteMutationVariables>;
export const AttendanceDeleteManyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AttendanceDeleteMany' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AttendanceDeleteManyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendanceDeleteMany' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'success' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttendanceDeleteManyMutation, AttendanceDeleteManyMutationVariables>;
export const CoursesSearcherDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CoursesSearcher' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CourseFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '20' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CoursesSearcherQuery, CoursesSearcherQueryVariables>;
export const CourseSearcherDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CourseSearcher' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CourseSearcherQuery, CourseSearcherQueryVariables>;
export const ShiftsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Shifts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ShiftFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shifts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'weekDay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ShiftsQuery, ShiftsQueryVariables>;
export const CoursesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Courses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CourseFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageIndex' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseListItem' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CoursesQuery, CoursesQueryVariables>;
export const CourseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Course' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseDetail' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shifts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CourseQuery, CourseQueryVariables>;
export const CourseCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CourseCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CourseCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courseCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shifts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CourseCreateMutation, CourseCreateMutationVariables>;
export const CourseUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CourseUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CourseUpdateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courseUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shifts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CourseUpdateMutation, CourseUpdateMutationVariables>;
export const CourseDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CourseDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CourseDeleteInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courseDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CourseDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Course' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CourseListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shifts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CourseDeleteMutation, CourseDeleteMutationVariables>;
export const VerifyEmailSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'VerifyEmailSettings' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'verifyEmailSettings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'verified' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyEmailSettingsMutation, VerifyEmailSettingsMutationVariables>;
export const SettingUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SettingUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SettingUpdateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'settingUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'setting' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'associationName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'associationAddress' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'associationTaxCode' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'emailSettings' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'host' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'secure' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'emailTextList' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'receipt' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'subject' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reminder' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'subject' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'medicalCertificateExpiration' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'subject' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'attendancesPerMonthToSendReminder' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'daysBeforeMedicalCertificateExpiresToSendEmail' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SettingUpdateMutation, SettingUpdateMutationVariables>;
export const MembersSearcherDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersSearcher' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '20' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MembersSearcherQuery, MembersSearcherQueryVariables>;
export const MemberSearcherDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MemberSearcher' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MemberSearcherQuery, MemberSearcherQueryVariables>;
export const MembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Members' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageIndex' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberListItem' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;
export const MemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Member' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberDetail' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isUnderage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'parent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentEnrollment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'courses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MemberQuery, MemberQueryVariables>;
export const MembersCsvDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MembersCsv' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '0' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'birthday' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentEnrollment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'socialCardNumber' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'registrationRequestDate' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'registrationAcceptanceDate' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'qualification' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'csenCardNumber' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'asiCardNumber' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MembersCsvQuery, MembersCsvQueryVariables>;
export const MemberCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MemberCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isUnderage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'parent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentEnrollment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'courses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MemberCreateMutation, MemberCreateMutationVariables>;
export const MemberUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MemberUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberUpdateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isUnderage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'parent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentEnrollment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'courses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MemberUpdateMutation, MemberUpdateMutationVariables>;
export const MemberDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MemberDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MemberDeleteInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memberDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MemberDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Member' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MemberListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isUnderage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'parent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentEnrollment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'courses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MemberDeleteMutation, MemberDeleteMutationVariables>;
export const FeesSearcherDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FeesSearcher' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FeeFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fees' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '20' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'course' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeesSearcherQuery, FeesSearcherQueryVariables>;
export const FeeSearcherDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FeeSearcher' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeeSearcherQuery, FeeSearcherQueryVariables>;
export const FeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Fees' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FeeFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fees' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageIndex' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeListItem' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeesQuery, FeesQueryVariables>;
export const FeeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Fee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeDetail' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeeQuery, FeeQueryVariables>;
export const FeeCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'FeeCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'FeeCreateInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'feeCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeeCreateMutation, FeeCreateMutationVariables>;
export const FeeUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'FeeUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'FeeUpdateInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'feeUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeeUpdateMutation, FeeUpdateMutationVariables>;
export const FeeDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'FeeDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'FeeDeleteInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'feeDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeeDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Fee' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'FeeListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeeDeleteMutation, FeeDeleteMutationVariables>;
export const EnrollmentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Enrollments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'EnrollmentFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'enrollments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageIndex' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentListItem' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'qualification' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'month' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendances' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnrollmentsQuery, EnrollmentsQueryVariables>;
export const EnrollmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Enrollment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'enrollment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentDetail' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'qualification' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'month' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendances' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'asiCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'csenCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationRequestDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationAcceptanceDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateKey' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'consents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'acceptedAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnrollmentQuery, EnrollmentQueryVariables>;
export const EnrollmentCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EnrollmentCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EnrollmentCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'enrollmentCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enrollment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'qualification' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'month' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendances' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'asiCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'csenCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationRequestDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationAcceptanceDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateKey' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'consents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'acceptedAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnrollmentCreateMutation, EnrollmentCreateMutationVariables>;
export const EnrollmentUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EnrollmentUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EnrollmentUpdateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'enrollmentUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enrollment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'qualification' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'month' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendances' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'asiCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'csenCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationRequestDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationAcceptanceDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateKey' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'consents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'acceptedAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnrollmentUpdateMutation, EnrollmentUpdateMutationVariables>;
export const EnrollmentDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EnrollmentDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EnrollmentDeleteInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'enrollmentDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enrollment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'qualification' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateExpireAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'month' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attendances' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnrollmentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EnrollmentListItem' } },
          { kind: 'Field', name: { kind: 'Name', value: 'shiftIds' } },
          { kind: 'Field', name: { kind: 'Name', value: 'asiCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'csenCardNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationRequestDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'registrationAcceptanceDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'medicalCertificateKey' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'consents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'acceptedAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'excludeFromCommunications' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnrollmentDeleteMutation, EnrollmentDeleteMutationVariables>;
export const EnrollmentConfirmDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EnrollmentConfirm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EnrollmentConfirmInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'enrollmentConfirm' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'modifiedCount' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnrollmentConfirmMutation, EnrollmentConfirmMutationVariables>;
export const EmailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Emails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'EmailFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'emails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageIndex' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'course' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'subject' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EmailsQuery, EmailsQueryVariables>;
export const PaymentSendReminderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PaymentSendReminder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentSendReminderInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSendReminder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'email' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentSendReminderMutation, PaymentSendReminderMutationVariables>;
export const SendMonthlyRemindersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendMonthlyReminders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SendMonthlyRemindersInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendMonthlyReminders' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'sentReminders' } },
                { kind: 'Field', name: { kind: 'Name', value: 'failedReminders' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SendMonthlyRemindersMutation, SendMonthlyRemindersMutationVariables>;
export const PaymentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Payments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentFilter' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageIndex' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageIndex' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentListItem' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'month' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentsQuery, PaymentsQueryVariables>;
export const PaymentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Payment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentDetail' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'month' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentQuery, PaymentQueryVariables>;
export const PaymentsPdfDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PaymentsPdf' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentFilter' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '0' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentPdf' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentPdf' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'birthday' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'parent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentsPdfQuery, PaymentsPdfQueryVariables>;
export const PaymentPdfDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PaymentPdf' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentPdf' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentPdf' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'birthday' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'parent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taxCode' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentPdfQuery, PaymentPdfQueryVariables>;
export const PaymentsCsvDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PaymentsCsv' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentFilter' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'pageIndex' }, value: { kind: 'IntValue', value: '0' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'pageSize' }, value: { kind: 'IntValue', value: '0' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'member' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'fullName' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fee' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'course' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'month' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentsCsvQuery, PaymentsCsvQueryVariables>;
export const PaymentCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PaymentCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'payment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'month' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentCreateMutation, PaymentCreateMutationVariables>;
export const PaymentUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PaymentUpdate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentUpdateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentUpdate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'payment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentDetail' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counter' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fullName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'month' } },
          { kind: 'Field', name: { kind: 'Name', value: 'socialYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PaymentDetail' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Payment' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PaymentListItem' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'recurrence' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentUpdateMutation, PaymentUpdateMutationVariables>;
export const PaymentUpdateManyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PaymentUpdateMany' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentUpdateManyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentUpdateMany' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'payments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sent' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentUpdateManyMutation, PaymentUpdateManyMutationVariables>;
export const PaymentSendReceiptDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PaymentSendReceipt' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentSendReceiptInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSendReceipt' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'email' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentSendReceiptMutation, PaymentSendReceiptMutationVariables>;
export const PaymentDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PaymentDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentDeleteInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'payment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updatedPayments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentDeleteMutation, PaymentDeleteMutationVariables>;
export const SendCommunicationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendCommunication' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SendCommunicationInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendCommunication' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'sentBatches' } },
                { kind: 'Field', name: { kind: 'Name', value: 'failedBatches' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalRecipients' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SendCommunicationMutation, SendCommunicationMutationVariables>;
export const RegistrationRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegistrationRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RegistrationRequestInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registrationRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enrollment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegistrationRequestMutation, RegistrationRequestMutationVariables>;
export const CopyCoursesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CopyCourses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CopyCoursesInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'copyCourses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'createdCount' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CopyCoursesMutation, CopyCoursesMutationVariables>;
export const CopyFeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CopyFees' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CopyFeesInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'copyFees' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'createdCount' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CopyFeesMutation, CopyFeesMutationVariables>;
export const SeasonRenewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SeasonRenew' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'SeasonRenewInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'seasonRenew' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'createdCount' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SeasonRenewMutation, SeasonRenewMutationVariables>;
