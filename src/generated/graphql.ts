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

export type Query = {
  __typename?: 'Query';
  me: User;
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  emailSettings?: Maybe<EmailSettings>;
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type ShiftDetail = {
  __typename?: 'ShiftDetail';
  id: Scalars['ID']['output'];
  course: Course;
  weekDay: Scalars['Int']['output'];
  from: Array<Scalars['Int']['output']>;
  to: Array<Scalars['Int']['output']>;
};

export type Shift = {
  __typename?: 'Shift';
  id: Scalars['ID']['output'];
  from: Array<Scalars['Int']['output']>;
  to: Array<Scalars['Int']['output']>;
};

export type PaymentPagination = {
  __typename?: 'PaymentPagination';
  data: Array<Payment>;
  pageInfo: PageInfo;
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
  printed: Scalars['Boolean']['output'];
  sent: Scalars['Boolean']['output'];
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Parent = {
  __typename?: 'Parent';
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  taxCode: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  total: Scalars['Int']['output'];
};

export type MemberPagination = {
  __typename?: 'MemberPagination';
  data: Array<Member>;
  pageInfo: PageInfo;
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
  email?: Maybe<Scalars['String']['output']>;
  enrolledAt?: Maybe<Scalars['Float']['output']>;
  parent?: Maybe<Parent>;
  address?: Maybe<Scalars['String']['output']>;
  csenCardNumber?: Maybe<Scalars['String']['output']>;
  courses: Array<Course>;
  shiftIds: Array<Scalars['ID']['output']>;
  payments: Array<Payment>;
  currentMonthPayments: Array<Payment>;
  currentEnrollmentPayment?: Maybe<Payment>;
  attendances: Array<Attendance>;
  medicalCertificate?: Maybe<MedicalCertificate>;
  emails: Array<Email>;
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};


export type MemberPaymentsArgs = {
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MemberAttendancesArgs = {
  years?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MedicalCertificate = {
  __typename?: 'MedicalCertificate';
  attachment?: Maybe<Scalars['String']['output']>;
  expireAt: Scalars['Float']['output'];
};

export type FeePagination = {
  __typename?: 'FeePagination';
  data: Array<Fee>;
  pageInfo: PageInfo;
};

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

export type EmailText = {
  __typename?: 'EmailText';
  subject?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
};

export type EmailSettings = {
  __typename?: 'EmailSettings';
  host: Scalars['String']['output'];
  port: Scalars['Int']['output'];
  secure: Scalars['Boolean']['output'];
  ignoreTLS: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  receiptEmail: EmailText;
  reminderEmail: EmailText;
};

export type EmailPagination = {
  __typename?: 'EmailPagination';
  data: Array<Email>;
  pageInfo: PageInfo;
};

export type Email = {
  __typename?: 'Email';
  id: Scalars['ID']['output'];
  member: Member;
  course: Course;
  to: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  body: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
};

export type DayExpireMedicalCertificates = {
  __typename?: 'DayExpireMedicalCertificates';
  expireAt: Scalars['Float']['output'];
  members: Array<Member>;
};

export type DayAttendances = {
  __typename?: 'DayAttendances';
  ids: Array<Scalars['ID']['output']>;
  members: Array<Member>;
  course: Course;
  from: Scalars['Float']['output'];
  to: Scalars['Float']['output'];
};

export type CoursePagination = {
  __typename?: 'CoursePagination';
  data: Array<Course>;
  pageInfo: PageInfo;
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

export type AttendancePagination = {
  __typename?: 'AttendancePagination';
  data: Array<Attendance>;
  pageInfo: PageInfo;
};

export type Attendance = {
  __typename?: 'Attendance';
  id: Scalars['ID']['output'];
  member: Member;
  course: Course;
  from: Scalars['Float']['output'];
  to: Scalars['Float']['output'];
};

export type VerifyEmailSettingsPayload = {
  __typename?: 'VerifyEmailSettingsPayload';
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type UserUpdateInput = {
  emailSettings?: InputMaybe<EmailSettingsInput>;
};

export type UserUpdatePayload = {
  __typename?: 'UserUpdatePayload';
  user: User;
};

export type LoginInput = {
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  token: Scalars['String']['output'];
};

export type PaymentUpdateManyInput = {
  ids: Array<Scalars['ID']['input']>;
  printed?: InputMaybe<Scalars['Boolean']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentUpdateManyPayload = {
  __typename?: 'PaymentUpdateManyPayload';
  payments: Array<Payment>;
};

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
  printed?: InputMaybe<Scalars['Boolean']['input']>;
  sent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentUpdatePayload = {
  __typename?: 'PaymentUpdatePayload';
  payment: Payment;
};

export type PaymentSendReminderInput = {
  memberId: Scalars['ID']['input'];
  yearMonth: Scalars['YearMonth']['input'];
  courseId: Scalars['ID']['input'];
};

export type PaymentSendReminderPayload = {
  __typename?: 'PaymentSendReminderPayload';
  sent: Scalars['Boolean']['output'];
};

export type PaymentSendReceiptInput = {
  id: Scalars['ID']['input'];
  attachmentUri: Scalars['String']['input'];
};

export type PaymentSendReceiptPayload = {
  __typename?: 'PaymentSendReceiptPayload';
  sent: Scalars['Boolean']['output'];
};

export type PaymentDeleteInput = {
  id: Scalars['ID']['input'];
};

export type PaymentDeletePayload = {
  __typename?: 'PaymentDeletePayload';
  payment: Payment;
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

export type MemberUploadInput = {
  id: Scalars['ID']['input'];
  attachment: Scalars['String']['input'];
  extension: Scalars['String']['input'];
};

export type MemberUploadPayload = {
  __typename?: 'MemberUploadPayload';
  success: Scalars['Boolean']['output'];
};

export type MemberUpdateInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enrolledAt?: InputMaybe<Scalars['Float']['input']>;
  parent?: InputMaybe<ParentInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  certificateExpiryDate?: InputMaybe<Scalars['Float']['input']>;
};

export type MemberUpdatePayload = {
  __typename?: 'MemberUpdatePayload';
  member: Member;
};

export type MemberDeleteInput = {
  id: Scalars['ID']['input'];
};

export type MemberDeletePayload = {
  __typename?: 'MemberDeletePayload';
  member: Member;
};

export type MemberCreateInput = {
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  enrolledAt?: InputMaybe<Scalars['Float']['input']>;
  parent?: InputMaybe<ParentInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  courseIds: Array<Scalars['ID']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type MemberCreatePayload = {
  __typename?: 'MemberCreatePayload';
  member: Member;
};

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

export type FeeDeleteInput = {
  id: Scalars['ID']['input'];
};

export type FeeDeletePayload = {
  __typename?: 'FeeDeletePayload';
  fee: Fee;
};

export type FeeCreateInput = {
  name: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  courseId: Scalars['ID']['input'];
  recurrence?: InputMaybe<RecurrenceEnum>;
  reason: Scalars['String']['input'];
};

export type FeeCreatePayload = {
  __typename?: 'FeeCreatePayload';
  fee: Fee;
};

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

export type CourseDeleteInput = {
  id: Scalars['ID']['input'];
};

export type CourseDeletePayload = {
  __typename?: 'CourseDeletePayload';
  course: Course;
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

export type AttendanceUpdateInput = {
  id: Scalars['ID']['input'];
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};

export type AttendanceUpdatePayload = {
  __typename?: 'AttendanceUpdatePayload';
  attendance: Attendance;
};

export type AttendanceDeleteManyInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type AttendanceDeleteManyPayload = {
  __typename?: 'AttendanceDeleteManyPayload';
  attendances: Array<Attendance>;
};

export type AttendanceDeleteInput = {
  id: Scalars['ID']['input'];
};

export type AttendanceDeletePayload = {
  __typename?: 'AttendanceDeletePayload';
  attendance: Attendance;
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

export type AttendanceCreateInput = {
  memberId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
  from: Scalars['Float']['input'];
  to: Scalars['Float']['input'];
};

export type AttendanceCreatePayload = {
  __typename?: 'AttendanceCreatePayload';
  attendance: Attendance;
};

export type ShiftFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  weekDay?: InputMaybe<Scalars['Int']['input']>;
};

export type PaymentFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  counter?: InputMaybe<Scalars['Int']['input']>;
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  feeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
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

export type MemberFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  csenCardNumber?: InputMaybe<Scalars['String']['input']>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shiftIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  monthsNotPaid?: InputMaybe<Array<Scalars['Float']['input']>>;
  sortBy?: InputMaybe<MemberSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
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

export type EmailFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  to?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<EmailSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type DayExpireMedicalCertificatesFilter = {
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  startFrom?: InputMaybe<Scalars['Float']['input']>;
  endFrom?: InputMaybe<Scalars['Float']['input']>;
};

export type DayAttendancesFilter = {
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  startFrom?: InputMaybe<Scalars['Float']['input']>;
  endFrom?: InputMaybe<Scalars['Float']['input']>;
};

export type CourseFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<CourseSortEnum>;
  sortDirection?: InputMaybe<SortDirectionEnum>;
};

export type AttendanceFilter = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};

export type ShiftInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  from: Array<Scalars['Int']['input']>;
  to: Array<Scalars['Int']['input']>;
};

export type ParentInput = {
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  taxCode: Scalars['String']['input'];
};

export type EmailTextInput = {
  subject?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
};

export type EmailSettingsInput = {
  host?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  secure?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreTLS?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  receiptEmail?: InputMaybe<EmailTextInput>;
  reminderEmail?: InputMaybe<EmailTextInput>;
};

export enum SortDirectionEnum {
  ASC = 'asc',
  DESC = 'desc'
}

export enum RecurrenceEnum {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL'
}

export enum PaymentTypeEnum {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum PaymentSortEnum {
  COUNTER = 'COUNTER',
  MONTH = 'MONTH',
  AMOUNT = 'AMOUNT',
  CREATED_AT = 'CREATED_AT'
}

export enum MemberSortEnum {
  NAME = 'NAME',
  SURNAME = 'SURNAME',
  CREATED_AT = 'CREATED_AT'
}

export enum FeeSortEnum {
  NAME = 'NAME',
  CREATED_AT = 'CREATED_AT'
}

export enum EmailSortEnum {
  CREATED_AT = 'CREATED_AT'
}

export enum CourseSortEnum {
  NAME = 'NAME',
  CREATED_AT = 'CREATED_AT'
}

export type Mutation = {
  __typename?: 'Mutation';
  verifyEmailSettings: VerifyEmailSettingsPayload;
  userUpdate: UserUpdatePayload;
  login: LoginPayload;
  paymentUpdateMany: PaymentUpdateManyPayload;
  paymentUpdate: PaymentUpdatePayload;
  paymentSendReminder: PaymentSendReminderPayload;
  paymentSendReceipt: PaymentSendReceiptPayload;
  paymentDelete: PaymentDeletePayload;
  paymentCreate: PaymentCreatePayload;
  memberUpload: MemberUploadPayload;
  memberUpdate: MemberUpdatePayload;
  memberDelete: MemberDeletePayload;
  memberCreate: MemberCreatePayload;
  feeUpdate: FeeUpdatePayload;
  feeDelete: FeeDeletePayload;
  feeCreate: FeeCreatePayload;
  courseUpdate: CourseUpdatePayload;
  courseDelete: CourseDeletePayload;
  courseCreate: CourseCreatePayload;
  attendanceUpdate: AttendanceUpdatePayload;
  attendanceDeleteMany: AttendanceDeleteManyPayload;
  attendanceDelete: AttendanceDeletePayload;
  attendanceCreateMany: AttendanceCreateManyPayload;
  attendanceCreate: AttendanceCreatePayload;
};


export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPaymentUpdateManyArgs = {
  input: PaymentUpdateManyInput;
};


export type MutationPaymentUpdateArgs = {
  input: PaymentUpdateInput;
};


export type MutationPaymentSendReminderArgs = {
  input: PaymentSendReminderInput;
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


export type MutationMemberUploadArgs = {
  input: MemberUploadInput;
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

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', token: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, emailSettings?: { __typename?: 'EmailSettings', host: string, port: number, secure: boolean, ignoreTLS: boolean, email: string, receiptEmail: { __typename?: 'EmailText', subject?: string | null, body?: string | null }, reminderEmail: { __typename?: 'EmailText', subject?: string | null, body?: string | null } } | null } };

export type VerifyEmailSettingsMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyEmailSettingsMutation = { __typename?: 'Mutation', verifyEmailSettings: { __typename?: 'VerifyEmailSettingsPayload', verified?: boolean | null } };

export type UserUpdateMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UserUpdateMutation = { __typename?: 'Mutation', userUpdate: { __typename?: 'UserUpdatePayload', user: { __typename?: 'User', id: string, username: string, emailSettings?: { __typename?: 'EmailSettings', host: string, port: number, secure: boolean, ignoreTLS: boolean, email: string, receiptEmail: { __typename?: 'EmailText', subject?: string | null, body?: string | null }, reminderEmail: { __typename?: 'EmailText', subject?: string | null, body?: string | null } } | null } } };

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


export type AttendanceDeleteManyMutation = { __typename?: 'Mutation', attendanceDeleteMany: { __typename?: 'AttendanceDeleteManyPayload', attendances: Array<{ __typename?: 'Attendance', id: string }> } };

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


export type EmailsQuery = { __typename?: 'Query', emails: { __typename?: 'EmailPagination', data: Array<{ __typename?: 'Email', id: string, to: string, subject: string, body: string, createdAt: number, course: { __typename?: 'Course', name: string } }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

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

export type MemberListItemFragment = { __typename?: 'Member', id: string, fullName: string, shiftIds: Array<string>, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, medicalCertificate?: { __typename?: 'MedicalCertificate', expireAt: number } | null };

export type MemberDetailFragment = { __typename?: 'Member', name: string, surname: string, taxCode: string, email?: string | null, enrolledAt?: number | null, address?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', attachment?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }> };

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


export type MembersQuery = { __typename?: 'Query', members: { __typename?: 'MemberPagination', data: Array<{ __typename?: 'Member', id: string, fullName: string, shiftIds: Array<string>, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }>, medicalCertificate?: { __typename?: 'MedicalCertificate', expireAt: number } | null }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type MemberQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MemberQuery = { __typename?: 'Query', member: { __typename?: 'Member', name: string, surname: string, taxCode: string, email?: string | null, enrolledAt?: number | null, address?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', attachment?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }> } };

export type MembersCsvQueryVariables = Exact<{
  filter?: InputMaybe<MemberFilter>;
  includeName: Scalars['Boolean']['input'];
  includeSurname: Scalars['Boolean']['input'];
  includeTaxCode: Scalars['Boolean']['input'];
  includeEmail: Scalars['Boolean']['input'];
  includeEnrolledAt: Scalars['Boolean']['input'];
  includeAddress: Scalars['Boolean']['input'];
  includeCsenCardNumber: Scalars['Boolean']['input'];
  includeCourses: Scalars['Boolean']['input'];
}>;


export type MembersCsvQuery = { __typename?: 'Query', members: { __typename?: 'MemberPagination', data: Array<{ __typename?: 'Member', name?: string, surname?: string, taxCode?: string, email?: string | null, enrolledAt?: number | null, address?: string | null, csenCardNumber?: string | null, courses?: Array<{ __typename?: 'Course', name: string }> }> } };

export type MemberCreateMutationVariables = Exact<{
  input: MemberCreateInput;
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MemberCreateMutation = { __typename?: 'Mutation', memberCreate: { __typename?: 'MemberCreatePayload', member: { __typename?: 'Member', name: string, surname: string, taxCode: string, email?: string | null, enrolledAt?: number | null, address?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', attachment?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }> } } };

export type MemberUpdateMutationVariables = Exact<{
  input: MemberUpdateInput;
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MemberUpdateMutation = { __typename?: 'Mutation', memberUpdate: { __typename?: 'MemberUpdatePayload', member: { __typename?: 'Member', name: string, surname: string, taxCode: string, email?: string | null, enrolledAt?: number | null, address?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', attachment?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }> } } };

export type MemberUploadMutationVariables = Exact<{
  input: MemberUploadInput;
}>;


export type MemberUploadMutation = { __typename?: 'Mutation', memberUpload: { __typename?: 'MemberUploadPayload', success: boolean } };

export type MemberDeleteMutationVariables = Exact<{
  input: MemberDeleteInput;
  years?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type MemberDeleteMutation = { __typename?: 'Mutation', memberDelete: { __typename?: 'MemberDeletePayload', member: { __typename?: 'Member', name: string, surname: string, taxCode: string, email?: string | null, enrolledAt?: number | null, address?: string | null, csenCardNumber?: string | null, shiftIds: Array<string>, canDelete: boolean, createdAt: number, updatedAt: number, id: string, fullName: string, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null, medicalCertificate?: { __typename?: 'MedicalCertificate', attachment?: string | null, expireAt: number } | null, payments: Array<{ __typename?: 'Payment', id: string, month?: string | null, years?: Array<number> | null }>, attendances: Array<{ __typename?: 'Attendance', id: string, from: number, to: number, course: { __typename?: 'Course', id: string } }>, courses: Array<{ __typename?: 'Course', id: string, name: string, shifts: Array<Array<{ __typename?: 'Shift', id: string, from: Array<number>, to: Array<number> }>> }> } } };

export type PaymentListItemFragment = { __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, printed: boolean, sent: boolean, member: { __typename?: 'Member', id: string, fullName: string }, fee: { __typename?: 'Fee', id: string, name: string, course: { __typename?: 'Course', name: string } } };

export type PaymentDetailFragment = { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, printed: boolean, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } };

export type PaymentPdfFragment = { __typename?: 'Payment', counter: number, date: number, amount: number, reason: string, member: { __typename?: 'Member', name: string, surname: string, taxCode: string, birthday: number, address?: string | null, parent?: { __typename?: 'Parent', name: string, surname: string, taxCode: string } | null } };

export type PaymentsQueryVariables = Exact<{
  pageIndex: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter?: InputMaybe<PaymentFilter>;
}>;


export type PaymentsQuery = { __typename?: 'Query', payments: { __typename?: 'PaymentPagination', data: Array<{ __typename?: 'Payment', id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, printed: boolean, sent: boolean, member: { __typename?: 'Member', id: string, fullName: string }, fee: { __typename?: 'Fee', id: string, name: string, course: { __typename?: 'Course', name: string } } }>, pageInfo: { __typename?: 'PageInfo', total: number } } };

export type PaymentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PaymentQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, printed: boolean, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } } };

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


export type PaymentCreateMutation = { __typename?: 'Mutation', paymentCreate: { __typename?: 'PaymentCreatePayload', payment: { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, printed: boolean, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } } } };

export type PaymentUpdateMutationVariables = Exact<{
  input: PaymentUpdateInput;
}>;


export type PaymentUpdateMutation = { __typename?: 'Mutation', paymentUpdate: { __typename?: 'PaymentUpdatePayload', payment: { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, printed: boolean, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } } } };

export type PaymentUpdateManyMutationVariables = Exact<{
  input: PaymentUpdateManyInput;
}>;


export type PaymentUpdateManyMutation = { __typename?: 'Mutation', paymentUpdateMany: { __typename?: 'PaymentUpdateManyPayload', payments: Array<{ __typename?: 'Payment', id: string, printed: boolean, sent: boolean }> } };

export type PaymentSendReceiptMutationVariables = Exact<{
  input: PaymentSendReceiptInput;
}>;


export type PaymentSendReceiptMutation = { __typename?: 'Mutation', paymentSendReceipt: { __typename?: 'PaymentSendReceiptPayload', sent: boolean } };

export type PaymentDeleteMutationVariables = Exact<{
  input: PaymentDeleteInput;
}>;


export type PaymentDeleteMutation = { __typename?: 'Mutation', paymentDelete: { __typename?: 'PaymentDeletePayload', payment: { __typename?: 'Payment', date: number, reason: string, canDelete: boolean, createdAt: number, updatedAt: number, id: string, counter: number, amount: number, month?: string | null, years?: Array<number> | null, type: PaymentTypeEnum, printed: boolean, sent: boolean, fee: { __typename?: 'Fee', id: string, name: string, amount: number, recurrence?: RecurrenceEnum | null, reason: string, course: { __typename?: 'Course', name: string } }, member: { __typename?: 'Member', id: string, fullName: string } } } };

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
  shiftIds
}
    `;
export const MemberDetailFragmentDoc = gql`
    fragment MemberDetail on Member {
  ...MemberListItem
  name
  surname
  taxCode
  email
  enrolledAt
  parent {
    name
    surname
    taxCode
  }
  address
  csenCardNumber
  shiftIds
  medicalCertificate {
    attachment
    expireAt
  }
  canDelete
  createdAt
  updatedAt
}
    ${MemberListItemFragmentDoc}`;
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
  printed
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
    emailSettings {
      host
      port
      secure
      ignoreTLS
      email
      receiptEmail {
        subject
        body
      }
      reminderEmail {
        subject
        body
      }
    }
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
export const UserUpdateDocument = gql`
    mutation UserUpdate($input: UserUpdateInput!) {
  userUpdate(input: $input) {
    user {
      id
      username
      emailSettings {
        host
        port
        secure
        ignoreTLS
        email
        receiptEmail {
          subject
          body
        }
        reminderEmail {
          subject
          body
        }
      }
    }
  }
}
    `;
export type UserUpdateMutationFn = Apollo.MutationFunction<UserUpdateMutation, UserUpdateMutationVariables>;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateMutation, { data, loading, error }] = useUserUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateMutation, UserUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateMutation, UserUpdateMutationVariables>(UserUpdateDocument, options);
      }
export type UserUpdateMutationHookResult = ReturnType<typeof useUserUpdateMutation>;
export type UserUpdateMutationResult = Apollo.MutationResult<UserUpdateMutation>;
export type UserUpdateMutationOptions = Apollo.BaseMutationOptions<UserUpdateMutation, UserUpdateMutationVariables>;
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
    attendances {
      id
    }
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
    query MembersCsv($filter: MemberFilter, $includeName: Boolean!, $includeSurname: Boolean!, $includeTaxCode: Boolean!, $includeEmail: Boolean!, $includeEnrolledAt: Boolean!, $includeAddress: Boolean!, $includeCsenCardNumber: Boolean!, $includeCourses: Boolean!) {
  members(pageIndex: 0, pageSize: 0, filter: $filter) {
    data {
      name @include(if: $includeName)
      surname @include(if: $includeSurname)
      taxCode @include(if: $includeTaxCode)
      email @include(if: $includeEmail)
      enrolledAt @include(if: $includeEnrolledAt)
      address @include(if: $includeAddress)
      csenCardNumber @include(if: $includeCsenCardNumber)
      courses @include(if: $includeCourses) {
        name
      }
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
 *      filter: // value for 'filter'
 *      includeName: // value for 'includeName'
 *      includeSurname: // value for 'includeSurname'
 *      includeTaxCode: // value for 'includeTaxCode'
 *      includeEmail: // value for 'includeEmail'
 *      includeEnrolledAt: // value for 'includeEnrolledAt'
 *      includeAddress: // value for 'includeAddress'
 *      includeCsenCardNumber: // value for 'includeCsenCardNumber'
 *      includeCourses: // value for 'includeCourses'
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
export const MemberUploadDocument = gql`
    mutation MemberUpload($input: MemberUploadInput!) {
  memberUpload(input: $input) {
    success
  }
}
    `;
export type MemberUploadMutationFn = Apollo.MutationFunction<MemberUploadMutation, MemberUploadMutationVariables>;

/**
 * __useMemberUploadMutation__
 *
 * To run a mutation, you first call `useMemberUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberUploadMutation, { data, loading, error }] = useMemberUploadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMemberUploadMutation(baseOptions?: Apollo.MutationHookOptions<MemberUploadMutation, MemberUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberUploadMutation, MemberUploadMutationVariables>(MemberUploadDocument, options);
      }
export type MemberUploadMutationHookResult = ReturnType<typeof useMemberUploadMutation>;
export type MemberUploadMutationResult = Apollo.MutationResult<MemberUploadMutation>;
export type MemberUploadMutationOptions = Apollo.BaseMutationOptions<MemberUploadMutation, MemberUploadMutationVariables>;
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
      printed
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
    sent
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