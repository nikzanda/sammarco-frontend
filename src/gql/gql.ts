import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  mutation VerifyEmailSettings {\n    verifyEmailSettings {\n      verified\n    }\n  }\n': typeof types.VerifyEmailSettingsDocument;
  '\n  mutation SettingUpdate($input: SettingUpdateInput!) {\n    settingUpdate(input: $input) {\n      setting {\n        emailSettings {\n          host\n          port\n          secure\n          name\n          email\n        }\n        emailTextList {\n          receipt {\n            subject\n            body\n          }\n          reminder {\n            subject\n            body\n          }\n          medicalCertificateExpiration {\n            subject\n            body\n          }\n        }\n        attendancesPerMonthToSendReminder\n        daysBeforeMedicalCertificateExpiresToSendEmail\n      }\n    }\n  }\n': typeof types.SettingUpdateDocument;
  '\n  fragment AttendanceListItem on Attendance {\n    id\n    member {\n      fullName\n    }\n    course {\n      id\n      name\n      color\n    }\n    from\n    to\n  }\n': typeof types.AttendanceListItemFragmentDoc;
  '\n  query Attendances($filter: AttendanceFilter!) {\n    attendances(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        ...AttendanceListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n': typeof types.AttendancesDocument;
  '\n  query DayAttendances($filter: DayAttendancesFilter!) {\n    dayAttendances(pageIndex: 0, pageSize: 0, filter: $filter) {\n      ids\n      members {\n        fullName\n      }\n      course {\n        id\n        name\n        color\n      }\n      from\n      to\n    }\n  }\n': typeof types.DayAttendancesDocument;
  '\n  query DayExpireMedicalCertificates($filter: DayExpireMedicalCertificatesFilter!) {\n    dayExpireMedicalCertificates(pageIndex: 0, pageSize: 0, filter: $filter) {\n      expireAt\n      members {\n        fullName\n      }\n    }\n  }\n': typeof types.DayExpireMedicalCertificatesDocument;
  '\n  mutation AttendanceCreateMany($input: AttendanceCreateManyInput!) {\n    attendanceCreateMany(input: $input) {\n      attendances {\n        ...AttendanceListItem\n      }\n    }\n  }\n': typeof types.AttendanceCreateManyDocument;
  '\n  mutation AttendanceDelete($input: AttendanceDeleteInput!) {\n    attendanceDelete(input: $input) {\n      attendance {\n        ...AttendanceListItem\n      }\n    }\n  }\n': typeof types.AttendanceDeleteDocument;
  '\n  mutation AttendanceDeleteMany($input: AttendanceDeleteManyInput!) {\n    attendanceDeleteMany(input: $input) {\n      success\n    }\n  }\n': typeof types.AttendanceDeleteManyDocument;
  '\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n    }\n  }\n': typeof types.LoginDocument;
  '\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n': typeof types.MeDocument;
  '\n  query Setting {\n    setting {\n      emailSettings {\n        host\n        port\n        secure\n        name\n        email\n      }\n      emailTextList {\n        receipt {\n          subject\n          body\n        }\n        reminder {\n          subject\n          body\n        }\n        medicalCertificateExpiration {\n          subject\n          body\n        }\n      }\n      attendancesPerMonthToSendReminder\n      daysBeforeMedicalCertificateExpiresToSendEmail\n    }\n  }\n': typeof types.SettingDocument;
  '\n  mutation SendCommunication($input: SendCommunicationInput!) {\n    sendCommunication(input: $input) {\n      result\n    }\n  }\n': typeof types.SendCommunicationDocument;
  '\n  fragment CourseListItem on Course {\n    id\n    name\n    color\n  }\n': typeof types.CourseListItemFragmentDoc;
  '\n  fragment CourseDetail on Course {\n    ...CourseListItem\n    shifts {\n      id\n      from\n      to\n    }\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n': typeof types.CourseDetailFragmentDoc;
  '\n  query CoursesSearcher($filter: CourseFilter) {\n    courses(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        name\n      }\n    }\n  }\n': typeof types.CoursesSearcherDocument;
  '\n  query CourseSearcher($id: ID!) {\n    course(id: $id) {\n      id\n      name\n    }\n  }\n': typeof types.CourseSearcherDocument;
  '\n  query Shifts($filter: ShiftFilter) {\n    shifts(filter: $filter) {\n      id\n      course {\n        id\n        name\n      }\n      weekDay\n      from\n      to\n    }\n  }\n': typeof types.ShiftsDocument;
  '\n  query Courses($pageIndex: Int!, $pageSize: Int!, $filter: CourseFilter) {\n    courses(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...CourseListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n': typeof types.CoursesDocument;
  '\n  query Course($id: ID!) {\n    course(id: $id) {\n      ...CourseDetail\n    }\n  }\n  \n': typeof types.CourseDocument;
  '\n  mutation CourseCreate($input: CourseCreateInput!) {\n    courseCreate(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n': typeof types.CourseCreateDocument;
  '\n  mutation CourseUpdate($input: CourseUpdateInput!) {\n    courseUpdate(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n': typeof types.CourseUpdateDocument;
  '\n  mutation CourseDelete($input: CourseDeleteInput!) {\n    courseDelete(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n': typeof types.CourseDeleteDocument;
  '\n  fragment PaymentListItem on Payment {\n    id\n    counter\n    member {\n      id\n      fullName\n    }\n    fee {\n      id\n      name\n      course {\n        name\n      }\n    }\n    amount\n    month\n    years\n    type\n    sent\n  }\n': typeof types.PaymentListItemFragmentDoc;
  '\n  fragment PaymentDetail on Payment {\n    ...PaymentListItem\n    fee {\n      id\n      name\n      amount\n      recurrence\n      reason\n      course {\n        name\n      }\n    }\n    date\n    reason\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n': typeof types.PaymentDetailFragmentDoc;
  '\n  fragment PaymentPdf on Payment {\n    counter\n    date\n    amount\n    reason\n    member {\n      name\n      surname\n      taxCode\n      birthday\n      address\n      parent {\n        name\n        surname\n        taxCode\n      }\n    }\n  }\n': typeof types.PaymentPdfFragmentDoc;
  '\n  query Payments($pageIndex: Int!, $pageSize: Int!, $filter: PaymentFilter) {\n    payments(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...PaymentListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n': typeof types.PaymentsDocument;
  '\n  query Payment($id: ID!) {\n    payment(id: $id) {\n      ...PaymentDetail\n    }\n  }\n  \n': typeof types.PaymentDocument;
  '\n  query PaymentsPdf($filter: PaymentFilter!) {\n    payments(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        ...PaymentPdf\n      }\n    }\n  }\n  \n': typeof types.PaymentsPdfDocument;
  '\n  query PaymentPdf($id: ID!) {\n    payment(id: $id) {\n      ...PaymentPdf\n    }\n  }\n  \n': typeof types.PaymentPdfDocument;
  '\n  query PaymentsCsv($filter: PaymentFilter!) {\n    payments(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        counter\n        member {\n          fullName\n        }\n        fee {\n          name\n          course {\n            name\n          }\n        }\n        amount\n        date\n        month\n        years\n        type\n      }\n    }\n  }\n': typeof types.PaymentsCsvDocument;
  '\n  mutation PaymentCreate($input: PaymentCreateInput!) {\n    paymentCreate(input: $input) {\n      payment {\n        ...PaymentDetail\n      }\n    }\n  }\n  \n': typeof types.PaymentCreateDocument;
  '\n  mutation PaymentUpdate($input: PaymentUpdateInput!) {\n    paymentUpdate(input: $input) {\n      payment {\n        ...PaymentDetail\n      }\n    }\n  }\n  \n': typeof types.PaymentUpdateDocument;
  '\n  mutation PaymentUpdateMany($input: PaymentUpdateManyInput!) {\n    paymentUpdateMany(input: $input) {\n      payments {\n        id\n        sent\n      }\n    }\n  }\n  \n': typeof types.PaymentUpdateManyDocument;
  '\n  mutation PaymentSendReceipt($input: PaymentSendReceiptInput!) {\n    paymentSendReceipt(input: $input) {\n      email {\n        id\n      }\n    }\n  }\n': typeof types.PaymentSendReceiptDocument;
  '\n  mutation PaymentDelete($input: PaymentDeleteInput!) {\n    paymentDelete(input: $input) {\n      payment {\n        id\n      }\n      updatedPayments {\n        id\n      }\n    }\n  }\n': typeof types.PaymentDeleteDocument;
  '\n  fragment MemberListItem on Member {\n    id\n    fullName\n    payments(years: $years) {\n      id\n      month\n      years\n    }\n    attendances(years: $years) {\n      id\n      course {\n        id\n      }\n      from\n      to\n    }\n    courses {\n      id\n      name\n      shifts {\n        id\n        from\n        to\n      }\n    }\n    medicalCertificate {\n      expireAt\n    }\n    currentMonthReminderEmails {\n      id\n    }\n    shiftIds\n    socialCardNumber\n  }\n': typeof types.MemberListItemFragmentDoc;
  '\n  fragment MemberDetail on Member {\n    ...MemberListItem\n    name\n    surname\n    taxCode\n    address\n    qualification\n    email\n    excludeFromCommunications\n    registrationRequestDate\n    registrationAcceptanceDate\n    asiCardNumber\n    csenCardNumber\n    parent {\n      name\n      surname\n      taxCode\n    }\n    shiftIds\n    medicalCertificate {\n      base64\n      expireAt\n    }\n    skipMedicalCertificateExpirationEmail\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n': typeof types.MemberDetailFragmentDoc;
  '\n  query MembersSearcher($filter: MemberFilter) {\n    members(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        fullName\n        email\n      }\n    }\n  }\n': typeof types.MembersSearcherDocument;
  '\n  query MemberSearcher($id: ID!) {\n    member(id: $id) {\n      id\n      fullName\n      email\n    }\n  }\n': typeof types.MemberSearcherDocument;
  '\n  query Members($pageIndex: Int!, $pageSize: Int!, $filter: MemberFilter, $years: [Int!]) {\n    members(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...MemberListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n': typeof types.MembersDocument;
  '\n  query Member($id: ID!, $years: [Int!]) {\n    member(id: $id) {\n      ...MemberDetail\n    }\n  }\n  \n': typeof types.MemberDocument;
  '\n  query MembersCsv($years: [Int!]!, $filter: MemberFilter) {\n    members(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        socialCardNumber\n        registrationRequestDate\n        registrationAcceptanceDate\n        fullName\n        birthday\n        taxCode\n        address\n        qualification\n        paidMembershipFee(years: $years)\n        csenCardNumber\n        asiCardNumber\n      }\n    }\n  }\n': typeof types.MembersCsvDocument;
  '\n  query MembersSync($ids: [ID!]!) {\n    members(pageIndex: 0, pageSize: 0, filter: { ids: $ids }) {\n      data {\n        id\n        name\n        surname\n        taxCode\n        address\n        qualification\n        email\n        parent {\n          name\n          surname\n          taxCode\n        }\n        courses {\n          id\n        }\n        shiftIds\n        medicalCertificate {\n          base64\n          expireAt\n        }\n      }\n    }\n  }\n': typeof types.MembersSyncDocument;
  '\n  mutation MemberCreate($input: MemberCreateInput!, $years: [Int!]) {\n    memberCreate(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n': typeof types.MemberCreateDocument;
  '\n  mutation MemberUpdate($input: MemberUpdateInput!, $years: [Int!]) {\n    memberUpdate(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n': typeof types.MemberUpdateDocument;
  '\n  mutation MemberUpdateMany($input: MemberUpdateManyInput!) {\n    memberUpdateMany(input: $input) {\n      modifiedCount\n    }\n  }\n': typeof types.MemberUpdateManyDocument;
  '\n  mutation MemberDelete($input: MemberDeleteInput!, $years: [Int!]) {\n    memberDelete(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n': typeof types.MemberDeleteDocument;
  '\n  fragment FeeListItem on Fee {\n    id\n    name\n    course {\n      id\n      name\n    }\n    amount\n    enabled\n  }\n': typeof types.FeeListItemFragmentDoc;
  '\n  fragment FeeDetail on Fee {\n    ...FeeListItem\n    recurrence\n    reason\n    createdAt\n    updatedAt\n    canDelete\n  }\n  \n': typeof types.FeeDetailFragmentDoc;
  '\n  query FeesSearcher($filter: FeeFilter) {\n    fees(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        name\n        amount\n        recurrence\n        reason\n        course {\n          name\n        }\n      }\n    }\n  }\n': typeof types.FeesSearcherDocument;
  '\n  query FeeSearcher($id: ID!) {\n    fee(id: $id) {\n      id\n      name\n      amount\n      recurrence\n      reason\n      course {\n        name\n      }\n    }\n  }\n': typeof types.FeeSearcherDocument;
  '\n  query Fees($pageIndex: Int!, $pageSize: Int!, $filter: FeeFilter) {\n    fees(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...FeeListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n': typeof types.FeesDocument;
  '\n  query Fee($id: ID!) {\n    fee(id: $id) {\n      ...FeeDetail\n    }\n  }\n  \n': typeof types.FeeDocument;
  '\n  mutation FeeCreate($input: FeeCreateInput!) {\n    feeCreate(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n': typeof types.FeeCreateDocument;
  '\n  mutation FeeUpdate($input: FeeUpdateInput!) {\n    feeUpdate(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n': typeof types.FeeUpdateDocument;
  '\n  mutation FeeDelete($input: FeeDeleteInput!) {\n    feeDelete(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n': typeof types.FeeDeleteDocument;
  '\n  query Emails($pageIndex: Int!, $pageSize: Int!, $filter: EmailFilter) {\n    emails(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        id\n        course {\n          name\n        }\n        type\n        to\n        subject\n        body\n        createdAt\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n': typeof types.EmailsDocument;
  '\n  mutation PaymentSendReminder($input: PaymentSendReminderInput!) {\n    paymentSendReminder(input: $input) {\n      email {\n        id\n      }\n    }\n  }\n': typeof types.PaymentSendReminderDocument;
  '\n  mutation SendMonthlyReminders($input: SendMonthlyRemindersInput!) {\n    sendMonthlyReminders(input: $input) {\n      sentReminders\n    }\n  }\n': typeof types.SendMonthlyRemindersDocument;
};
const documents: Documents = {
  '\n  mutation VerifyEmailSettings {\n    verifyEmailSettings {\n      verified\n    }\n  }\n':
    types.VerifyEmailSettingsDocument,
  '\n  mutation SettingUpdate($input: SettingUpdateInput!) {\n    settingUpdate(input: $input) {\n      setting {\n        emailSettings {\n          host\n          port\n          secure\n          name\n          email\n        }\n        emailTextList {\n          receipt {\n            subject\n            body\n          }\n          reminder {\n            subject\n            body\n          }\n          medicalCertificateExpiration {\n            subject\n            body\n          }\n        }\n        attendancesPerMonthToSendReminder\n        daysBeforeMedicalCertificateExpiresToSendEmail\n      }\n    }\n  }\n':
    types.SettingUpdateDocument,
  '\n  fragment AttendanceListItem on Attendance {\n    id\n    member {\n      fullName\n    }\n    course {\n      id\n      name\n      color\n    }\n    from\n    to\n  }\n':
    types.AttendanceListItemFragmentDoc,
  '\n  query Attendances($filter: AttendanceFilter!) {\n    attendances(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        ...AttendanceListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n':
    types.AttendancesDocument,
  '\n  query DayAttendances($filter: DayAttendancesFilter!) {\n    dayAttendances(pageIndex: 0, pageSize: 0, filter: $filter) {\n      ids\n      members {\n        fullName\n      }\n      course {\n        id\n        name\n        color\n      }\n      from\n      to\n    }\n  }\n':
    types.DayAttendancesDocument,
  '\n  query DayExpireMedicalCertificates($filter: DayExpireMedicalCertificatesFilter!) {\n    dayExpireMedicalCertificates(pageIndex: 0, pageSize: 0, filter: $filter) {\n      expireAt\n      members {\n        fullName\n      }\n    }\n  }\n':
    types.DayExpireMedicalCertificatesDocument,
  '\n  mutation AttendanceCreateMany($input: AttendanceCreateManyInput!) {\n    attendanceCreateMany(input: $input) {\n      attendances {\n        ...AttendanceListItem\n      }\n    }\n  }\n':
    types.AttendanceCreateManyDocument,
  '\n  mutation AttendanceDelete($input: AttendanceDeleteInput!) {\n    attendanceDelete(input: $input) {\n      attendance {\n        ...AttendanceListItem\n      }\n    }\n  }\n':
    types.AttendanceDeleteDocument,
  '\n  mutation AttendanceDeleteMany($input: AttendanceDeleteManyInput!) {\n    attendanceDeleteMany(input: $input) {\n      success\n    }\n  }\n':
    types.AttendanceDeleteManyDocument,
  '\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n    }\n  }\n':
    types.LoginDocument,
  '\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n': types.MeDocument,
  '\n  query Setting {\n    setting {\n      emailSettings {\n        host\n        port\n        secure\n        name\n        email\n      }\n      emailTextList {\n        receipt {\n          subject\n          body\n        }\n        reminder {\n          subject\n          body\n        }\n        medicalCertificateExpiration {\n          subject\n          body\n        }\n      }\n      attendancesPerMonthToSendReminder\n      daysBeforeMedicalCertificateExpiresToSendEmail\n    }\n  }\n':
    types.SettingDocument,
  '\n  mutation SendCommunication($input: SendCommunicationInput!) {\n    sendCommunication(input: $input) {\n      result\n    }\n  }\n':
    types.SendCommunicationDocument,
  '\n  fragment CourseListItem on Course {\n    id\n    name\n    color\n  }\n': types.CourseListItemFragmentDoc,
  '\n  fragment CourseDetail on Course {\n    ...CourseListItem\n    shifts {\n      id\n      from\n      to\n    }\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n':
    types.CourseDetailFragmentDoc,
  '\n  query CoursesSearcher($filter: CourseFilter) {\n    courses(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        name\n      }\n    }\n  }\n':
    types.CoursesSearcherDocument,
  '\n  query CourseSearcher($id: ID!) {\n    course(id: $id) {\n      id\n      name\n    }\n  }\n':
    types.CourseSearcherDocument,
  '\n  query Shifts($filter: ShiftFilter) {\n    shifts(filter: $filter) {\n      id\n      course {\n        id\n        name\n      }\n      weekDay\n      from\n      to\n    }\n  }\n':
    types.ShiftsDocument,
  '\n  query Courses($pageIndex: Int!, $pageSize: Int!, $filter: CourseFilter) {\n    courses(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...CourseListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n':
    types.CoursesDocument,
  '\n  query Course($id: ID!) {\n    course(id: $id) {\n      ...CourseDetail\n    }\n  }\n  \n': types.CourseDocument,
  '\n  mutation CourseCreate($input: CourseCreateInput!) {\n    courseCreate(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n':
    types.CourseCreateDocument,
  '\n  mutation CourseUpdate($input: CourseUpdateInput!) {\n    courseUpdate(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n':
    types.CourseUpdateDocument,
  '\n  mutation CourseDelete($input: CourseDeleteInput!) {\n    courseDelete(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n':
    types.CourseDeleteDocument,
  '\n  fragment PaymentListItem on Payment {\n    id\n    counter\n    member {\n      id\n      fullName\n    }\n    fee {\n      id\n      name\n      course {\n        name\n      }\n    }\n    amount\n    month\n    years\n    type\n    sent\n  }\n':
    types.PaymentListItemFragmentDoc,
  '\n  fragment PaymentDetail on Payment {\n    ...PaymentListItem\n    fee {\n      id\n      name\n      amount\n      recurrence\n      reason\n      course {\n        name\n      }\n    }\n    date\n    reason\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n':
    types.PaymentDetailFragmentDoc,
  '\n  fragment PaymentPdf on Payment {\n    counter\n    date\n    amount\n    reason\n    member {\n      name\n      surname\n      taxCode\n      birthday\n      address\n      parent {\n        name\n        surname\n        taxCode\n      }\n    }\n  }\n':
    types.PaymentPdfFragmentDoc,
  '\n  query Payments($pageIndex: Int!, $pageSize: Int!, $filter: PaymentFilter) {\n    payments(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...PaymentListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n':
    types.PaymentsDocument,
  '\n  query Payment($id: ID!) {\n    payment(id: $id) {\n      ...PaymentDetail\n    }\n  }\n  \n':
    types.PaymentDocument,
  '\n  query PaymentsPdf($filter: PaymentFilter!) {\n    payments(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        ...PaymentPdf\n      }\n    }\n  }\n  \n':
    types.PaymentsPdfDocument,
  '\n  query PaymentPdf($id: ID!) {\n    payment(id: $id) {\n      ...PaymentPdf\n    }\n  }\n  \n':
    types.PaymentPdfDocument,
  '\n  query PaymentsCsv($filter: PaymentFilter!) {\n    payments(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        counter\n        member {\n          fullName\n        }\n        fee {\n          name\n          course {\n            name\n          }\n        }\n        amount\n        date\n        month\n        years\n        type\n      }\n    }\n  }\n':
    types.PaymentsCsvDocument,
  '\n  mutation PaymentCreate($input: PaymentCreateInput!) {\n    paymentCreate(input: $input) {\n      payment {\n        ...PaymentDetail\n      }\n    }\n  }\n  \n':
    types.PaymentCreateDocument,
  '\n  mutation PaymentUpdate($input: PaymentUpdateInput!) {\n    paymentUpdate(input: $input) {\n      payment {\n        ...PaymentDetail\n      }\n    }\n  }\n  \n':
    types.PaymentUpdateDocument,
  '\n  mutation PaymentUpdateMany($input: PaymentUpdateManyInput!) {\n    paymentUpdateMany(input: $input) {\n      payments {\n        id\n        sent\n      }\n    }\n  }\n  \n':
    types.PaymentUpdateManyDocument,
  '\n  mutation PaymentSendReceipt($input: PaymentSendReceiptInput!) {\n    paymentSendReceipt(input: $input) {\n      email {\n        id\n      }\n    }\n  }\n':
    types.PaymentSendReceiptDocument,
  '\n  mutation PaymentDelete($input: PaymentDeleteInput!) {\n    paymentDelete(input: $input) {\n      payment {\n        id\n      }\n      updatedPayments {\n        id\n      }\n    }\n  }\n':
    types.PaymentDeleteDocument,
  '\n  fragment MemberListItem on Member {\n    id\n    fullName\n    payments(years: $years) {\n      id\n      month\n      years\n    }\n    attendances(years: $years) {\n      id\n      course {\n        id\n      }\n      from\n      to\n    }\n    courses {\n      id\n      name\n      shifts {\n        id\n        from\n        to\n      }\n    }\n    medicalCertificate {\n      expireAt\n    }\n    currentMonthReminderEmails {\n      id\n    }\n    shiftIds\n    socialCardNumber\n  }\n':
    types.MemberListItemFragmentDoc,
  '\n  fragment MemberDetail on Member {\n    ...MemberListItem\n    name\n    surname\n    taxCode\n    address\n    qualification\n    email\n    excludeFromCommunications\n    registrationRequestDate\n    registrationAcceptanceDate\n    asiCardNumber\n    csenCardNumber\n    parent {\n      name\n      surname\n      taxCode\n    }\n    shiftIds\n    medicalCertificate {\n      base64\n      expireAt\n    }\n    skipMedicalCertificateExpirationEmail\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n':
    types.MemberDetailFragmentDoc,
  '\n  query MembersSearcher($filter: MemberFilter) {\n    members(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        fullName\n        email\n      }\n    }\n  }\n':
    types.MembersSearcherDocument,
  '\n  query MemberSearcher($id: ID!) {\n    member(id: $id) {\n      id\n      fullName\n      email\n    }\n  }\n':
    types.MemberSearcherDocument,
  '\n  query Members($pageIndex: Int!, $pageSize: Int!, $filter: MemberFilter, $years: [Int!]) {\n    members(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...MemberListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n':
    types.MembersDocument,
  '\n  query Member($id: ID!, $years: [Int!]) {\n    member(id: $id) {\n      ...MemberDetail\n    }\n  }\n  \n':
    types.MemberDocument,
  '\n  query MembersCsv($years: [Int!]!, $filter: MemberFilter) {\n    members(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        socialCardNumber\n        registrationRequestDate\n        registrationAcceptanceDate\n        fullName\n        birthday\n        taxCode\n        address\n        qualification\n        paidMembershipFee(years: $years)\n        csenCardNumber\n        asiCardNumber\n      }\n    }\n  }\n':
    types.MembersCsvDocument,
  '\n  query MembersSync($ids: [ID!]!) {\n    members(pageIndex: 0, pageSize: 0, filter: { ids: $ids }) {\n      data {\n        id\n        name\n        surname\n        taxCode\n        address\n        qualification\n        email\n        parent {\n          name\n          surname\n          taxCode\n        }\n        courses {\n          id\n        }\n        shiftIds\n        medicalCertificate {\n          base64\n          expireAt\n        }\n      }\n    }\n  }\n':
    types.MembersSyncDocument,
  '\n  mutation MemberCreate($input: MemberCreateInput!, $years: [Int!]) {\n    memberCreate(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n':
    types.MemberCreateDocument,
  '\n  mutation MemberUpdate($input: MemberUpdateInput!, $years: [Int!]) {\n    memberUpdate(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n':
    types.MemberUpdateDocument,
  '\n  mutation MemberUpdateMany($input: MemberUpdateManyInput!) {\n    memberUpdateMany(input: $input) {\n      modifiedCount\n    }\n  }\n':
    types.MemberUpdateManyDocument,
  '\n  mutation MemberDelete($input: MemberDeleteInput!, $years: [Int!]) {\n    memberDelete(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n':
    types.MemberDeleteDocument,
  '\n  fragment FeeListItem on Fee {\n    id\n    name\n    course {\n      id\n      name\n    }\n    amount\n    enabled\n  }\n':
    types.FeeListItemFragmentDoc,
  '\n  fragment FeeDetail on Fee {\n    ...FeeListItem\n    recurrence\n    reason\n    createdAt\n    updatedAt\n    canDelete\n  }\n  \n':
    types.FeeDetailFragmentDoc,
  '\n  query FeesSearcher($filter: FeeFilter) {\n    fees(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        name\n        amount\n        recurrence\n        reason\n        course {\n          name\n        }\n      }\n    }\n  }\n':
    types.FeesSearcherDocument,
  '\n  query FeeSearcher($id: ID!) {\n    fee(id: $id) {\n      id\n      name\n      amount\n      recurrence\n      reason\n      course {\n        name\n      }\n    }\n  }\n':
    types.FeeSearcherDocument,
  '\n  query Fees($pageIndex: Int!, $pageSize: Int!, $filter: FeeFilter) {\n    fees(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...FeeListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n':
    types.FeesDocument,
  '\n  query Fee($id: ID!) {\n    fee(id: $id) {\n      ...FeeDetail\n    }\n  }\n  \n': types.FeeDocument,
  '\n  mutation FeeCreate($input: FeeCreateInput!) {\n    feeCreate(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n':
    types.FeeCreateDocument,
  '\n  mutation FeeUpdate($input: FeeUpdateInput!) {\n    feeUpdate(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n':
    types.FeeUpdateDocument,
  '\n  mutation FeeDelete($input: FeeDeleteInput!) {\n    feeDelete(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n':
    types.FeeDeleteDocument,
  '\n  query Emails($pageIndex: Int!, $pageSize: Int!, $filter: EmailFilter) {\n    emails(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        id\n        course {\n          name\n        }\n        type\n        to\n        subject\n        body\n        createdAt\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n':
    types.EmailsDocument,
  '\n  mutation PaymentSendReminder($input: PaymentSendReminderInput!) {\n    paymentSendReminder(input: $input) {\n      email {\n        id\n      }\n    }\n  }\n':
    types.PaymentSendReminderDocument,
  '\n  mutation SendMonthlyReminders($input: SendMonthlyRemindersInput!) {\n    sendMonthlyReminders(input: $input) {\n      sentReminders\n    }\n  }\n':
    types.SendMonthlyRemindersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation VerifyEmailSettings {\n    verifyEmailSettings {\n      verified\n    }\n  }\n'
): (typeof documents)['\n  mutation VerifyEmailSettings {\n    verifyEmailSettings {\n      verified\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SettingUpdate($input: SettingUpdateInput!) {\n    settingUpdate(input: $input) {\n      setting {\n        emailSettings {\n          host\n          port\n          secure\n          name\n          email\n        }\n        emailTextList {\n          receipt {\n            subject\n            body\n          }\n          reminder {\n            subject\n            body\n          }\n          medicalCertificateExpiration {\n            subject\n            body\n          }\n        }\n        attendancesPerMonthToSendReminder\n        daysBeforeMedicalCertificateExpiresToSendEmail\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation SettingUpdate($input: SettingUpdateInput!) {\n    settingUpdate(input: $input) {\n      setting {\n        emailSettings {\n          host\n          port\n          secure\n          name\n          email\n        }\n        emailTextList {\n          receipt {\n            subject\n            body\n          }\n          reminder {\n            subject\n            body\n          }\n          medicalCertificateExpiration {\n            subject\n            body\n          }\n        }\n        attendancesPerMonthToSendReminder\n        daysBeforeMedicalCertificateExpiresToSendEmail\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AttendanceListItem on Attendance {\n    id\n    member {\n      fullName\n    }\n    course {\n      id\n      name\n      color\n    }\n    from\n    to\n  }\n'
): (typeof documents)['\n  fragment AttendanceListItem on Attendance {\n    id\n    member {\n      fullName\n    }\n    course {\n      id\n      name\n      color\n    }\n    from\n    to\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Attendances($filter: AttendanceFilter!) {\n    attendances(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        ...AttendanceListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  query Attendances($filter: AttendanceFilter!) {\n    attendances(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        ...AttendanceListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query DayAttendances($filter: DayAttendancesFilter!) {\n    dayAttendances(pageIndex: 0, pageSize: 0, filter: $filter) {\n      ids\n      members {\n        fullName\n      }\n      course {\n        id\n        name\n        color\n      }\n      from\n      to\n    }\n  }\n'
): (typeof documents)['\n  query DayAttendances($filter: DayAttendancesFilter!) {\n    dayAttendances(pageIndex: 0, pageSize: 0, filter: $filter) {\n      ids\n      members {\n        fullName\n      }\n      course {\n        id\n        name\n        color\n      }\n      from\n      to\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query DayExpireMedicalCertificates($filter: DayExpireMedicalCertificatesFilter!) {\n    dayExpireMedicalCertificates(pageIndex: 0, pageSize: 0, filter: $filter) {\n      expireAt\n      members {\n        fullName\n      }\n    }\n  }\n'
): (typeof documents)['\n  query DayExpireMedicalCertificates($filter: DayExpireMedicalCertificatesFilter!) {\n    dayExpireMedicalCertificates(pageIndex: 0, pageSize: 0, filter: $filter) {\n      expireAt\n      members {\n        fullName\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AttendanceCreateMany($input: AttendanceCreateManyInput!) {\n    attendanceCreateMany(input: $input) {\n      attendances {\n        ...AttendanceListItem\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation AttendanceCreateMany($input: AttendanceCreateManyInput!) {\n    attendanceCreateMany(input: $input) {\n      attendances {\n        ...AttendanceListItem\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AttendanceDelete($input: AttendanceDeleteInput!) {\n    attendanceDelete(input: $input) {\n      attendance {\n        ...AttendanceListItem\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation AttendanceDelete($input: AttendanceDeleteInput!) {\n    attendanceDelete(input: $input) {\n      attendance {\n        ...AttendanceListItem\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AttendanceDeleteMany($input: AttendanceDeleteManyInput!) {\n    attendanceDeleteMany(input: $input) {\n      success\n    }\n  }\n'
): (typeof documents)['\n  mutation AttendanceDeleteMany($input: AttendanceDeleteManyInput!) {\n    attendanceDeleteMany(input: $input) {\n      success\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n    }\n  }\n'
): (typeof documents)['\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n'
): (typeof documents)['\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Setting {\n    setting {\n      emailSettings {\n        host\n        port\n        secure\n        name\n        email\n      }\n      emailTextList {\n        receipt {\n          subject\n          body\n        }\n        reminder {\n          subject\n          body\n        }\n        medicalCertificateExpiration {\n          subject\n          body\n        }\n      }\n      attendancesPerMonthToSendReminder\n      daysBeforeMedicalCertificateExpiresToSendEmail\n    }\n  }\n'
): (typeof documents)['\n  query Setting {\n    setting {\n      emailSettings {\n        host\n        port\n        secure\n        name\n        email\n      }\n      emailTextList {\n        receipt {\n          subject\n          body\n        }\n        reminder {\n          subject\n          body\n        }\n        medicalCertificateExpiration {\n          subject\n          body\n        }\n      }\n      attendancesPerMonthToSendReminder\n      daysBeforeMedicalCertificateExpiresToSendEmail\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SendCommunication($input: SendCommunicationInput!) {\n    sendCommunication(input: $input) {\n      result\n    }\n  }\n'
): (typeof documents)['\n  mutation SendCommunication($input: SendCommunicationInput!) {\n    sendCommunication(input: $input) {\n      result\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CourseListItem on Course {\n    id\n    name\n    color\n  }\n'
): (typeof documents)['\n  fragment CourseListItem on Course {\n    id\n    name\n    color\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CourseDetail on Course {\n    ...CourseListItem\n    shifts {\n      id\n      from\n      to\n    }\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n'
): (typeof documents)['\n  fragment CourseDetail on Course {\n    ...CourseListItem\n    shifts {\n      id\n      from\n      to\n    }\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CoursesSearcher($filter: CourseFilter) {\n    courses(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query CoursesSearcher($filter: CourseFilter) {\n    courses(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CourseSearcher($id: ID!) {\n    course(id: $id) {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  query CourseSearcher($id: ID!) {\n    course(id: $id) {\n      id\n      name\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Shifts($filter: ShiftFilter) {\n    shifts(filter: $filter) {\n      id\n      course {\n        id\n        name\n      }\n      weekDay\n      from\n      to\n    }\n  }\n'
): (typeof documents)['\n  query Shifts($filter: ShiftFilter) {\n    shifts(filter: $filter) {\n      id\n      course {\n        id\n        name\n      }\n      weekDay\n      from\n      to\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Courses($pageIndex: Int!, $pageSize: Int!, $filter: CourseFilter) {\n    courses(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...CourseListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  query Courses($pageIndex: Int!, $pageSize: Int!, $filter: CourseFilter) {\n    courses(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...CourseListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Course($id: ID!) {\n    course(id: $id) {\n      ...CourseDetail\n    }\n  }\n  \n'
): (typeof documents)['\n  query Course($id: ID!) {\n    course(id: $id) {\n      ...CourseDetail\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CourseCreate($input: CourseCreateInput!) {\n    courseCreate(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation CourseCreate($input: CourseCreateInput!) {\n    courseCreate(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CourseUpdate($input: CourseUpdateInput!) {\n    courseUpdate(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation CourseUpdate($input: CourseUpdateInput!) {\n    courseUpdate(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CourseDelete($input: CourseDeleteInput!) {\n    courseDelete(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation CourseDelete($input: CourseDeleteInput!) {\n    courseDelete(input: $input) {\n      course {\n        ...CourseDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PaymentListItem on Payment {\n    id\n    counter\n    member {\n      id\n      fullName\n    }\n    fee {\n      id\n      name\n      course {\n        name\n      }\n    }\n    amount\n    month\n    years\n    type\n    sent\n  }\n'
): (typeof documents)['\n  fragment PaymentListItem on Payment {\n    id\n    counter\n    member {\n      id\n      fullName\n    }\n    fee {\n      id\n      name\n      course {\n        name\n      }\n    }\n    amount\n    month\n    years\n    type\n    sent\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PaymentDetail on Payment {\n    ...PaymentListItem\n    fee {\n      id\n      name\n      amount\n      recurrence\n      reason\n      course {\n        name\n      }\n    }\n    date\n    reason\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n'
): (typeof documents)['\n  fragment PaymentDetail on Payment {\n    ...PaymentListItem\n    fee {\n      id\n      name\n      amount\n      recurrence\n      reason\n      course {\n        name\n      }\n    }\n    date\n    reason\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PaymentPdf on Payment {\n    counter\n    date\n    amount\n    reason\n    member {\n      name\n      surname\n      taxCode\n      birthday\n      address\n      parent {\n        name\n        surname\n        taxCode\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment PaymentPdf on Payment {\n    counter\n    date\n    amount\n    reason\n    member {\n      name\n      surname\n      taxCode\n      birthday\n      address\n      parent {\n        name\n        surname\n        taxCode\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Payments($pageIndex: Int!, $pageSize: Int!, $filter: PaymentFilter) {\n    payments(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...PaymentListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  query Payments($pageIndex: Int!, $pageSize: Int!, $filter: PaymentFilter) {\n    payments(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...PaymentListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Payment($id: ID!) {\n    payment(id: $id) {\n      ...PaymentDetail\n    }\n  }\n  \n'
): (typeof documents)['\n  query Payment($id: ID!) {\n    payment(id: $id) {\n      ...PaymentDetail\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PaymentsPdf($filter: PaymentFilter!) {\n    payments(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        ...PaymentPdf\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  query PaymentsPdf($filter: PaymentFilter!) {\n    payments(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        ...PaymentPdf\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PaymentPdf($id: ID!) {\n    payment(id: $id) {\n      ...PaymentPdf\n    }\n  }\n  \n'
): (typeof documents)['\n  query PaymentPdf($id: ID!) {\n    payment(id: $id) {\n      ...PaymentPdf\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PaymentsCsv($filter: PaymentFilter!) {\n    payments(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        counter\n        member {\n          fullName\n        }\n        fee {\n          name\n          course {\n            name\n          }\n        }\n        amount\n        date\n        month\n        years\n        type\n      }\n    }\n  }\n'
): (typeof documents)['\n  query PaymentsCsv($filter: PaymentFilter!) {\n    payments(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        counter\n        member {\n          fullName\n        }\n        fee {\n          name\n          course {\n            name\n          }\n        }\n        amount\n        date\n        month\n        years\n        type\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PaymentCreate($input: PaymentCreateInput!) {\n    paymentCreate(input: $input) {\n      payment {\n        ...PaymentDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation PaymentCreate($input: PaymentCreateInput!) {\n    paymentCreate(input: $input) {\n      payment {\n        ...PaymentDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PaymentUpdate($input: PaymentUpdateInput!) {\n    paymentUpdate(input: $input) {\n      payment {\n        ...PaymentDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation PaymentUpdate($input: PaymentUpdateInput!) {\n    paymentUpdate(input: $input) {\n      payment {\n        ...PaymentDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PaymentUpdateMany($input: PaymentUpdateManyInput!) {\n    paymentUpdateMany(input: $input) {\n      payments {\n        id\n        sent\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation PaymentUpdateMany($input: PaymentUpdateManyInput!) {\n    paymentUpdateMany(input: $input) {\n      payments {\n        id\n        sent\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PaymentSendReceipt($input: PaymentSendReceiptInput!) {\n    paymentSendReceipt(input: $input) {\n      email {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation PaymentSendReceipt($input: PaymentSendReceiptInput!) {\n    paymentSendReceipt(input: $input) {\n      email {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PaymentDelete($input: PaymentDeleteInput!) {\n    paymentDelete(input: $input) {\n      payment {\n        id\n      }\n      updatedPayments {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation PaymentDelete($input: PaymentDeleteInput!) {\n    paymentDelete(input: $input) {\n      payment {\n        id\n      }\n      updatedPayments {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment MemberListItem on Member {\n    id\n    fullName\n    payments(years: $years) {\n      id\n      month\n      years\n    }\n    attendances(years: $years) {\n      id\n      course {\n        id\n      }\n      from\n      to\n    }\n    courses {\n      id\n      name\n      shifts {\n        id\n        from\n        to\n      }\n    }\n    medicalCertificate {\n      expireAt\n    }\n    currentMonthReminderEmails {\n      id\n    }\n    shiftIds\n    socialCardNumber\n  }\n'
): (typeof documents)['\n  fragment MemberListItem on Member {\n    id\n    fullName\n    payments(years: $years) {\n      id\n      month\n      years\n    }\n    attendances(years: $years) {\n      id\n      course {\n        id\n      }\n      from\n      to\n    }\n    courses {\n      id\n      name\n      shifts {\n        id\n        from\n        to\n      }\n    }\n    medicalCertificate {\n      expireAt\n    }\n    currentMonthReminderEmails {\n      id\n    }\n    shiftIds\n    socialCardNumber\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment MemberDetail on Member {\n    ...MemberListItem\n    name\n    surname\n    taxCode\n    address\n    qualification\n    email\n    excludeFromCommunications\n    registrationRequestDate\n    registrationAcceptanceDate\n    asiCardNumber\n    csenCardNumber\n    parent {\n      name\n      surname\n      taxCode\n    }\n    shiftIds\n    medicalCertificate {\n      base64\n      expireAt\n    }\n    skipMedicalCertificateExpirationEmail\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n'
): (typeof documents)['\n  fragment MemberDetail on Member {\n    ...MemberListItem\n    name\n    surname\n    taxCode\n    address\n    qualification\n    email\n    excludeFromCommunications\n    registrationRequestDate\n    registrationAcceptanceDate\n    asiCardNumber\n    csenCardNumber\n    parent {\n      name\n      surname\n      taxCode\n    }\n    shiftIds\n    medicalCertificate {\n      base64\n      expireAt\n    }\n    skipMedicalCertificateExpirationEmail\n    canDelete\n    createdAt\n    updatedAt\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MembersSearcher($filter: MemberFilter) {\n    members(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        fullName\n        email\n      }\n    }\n  }\n'
): (typeof documents)['\n  query MembersSearcher($filter: MemberFilter) {\n    members(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        fullName\n        email\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MemberSearcher($id: ID!) {\n    member(id: $id) {\n      id\n      fullName\n      email\n    }\n  }\n'
): (typeof documents)['\n  query MemberSearcher($id: ID!) {\n    member(id: $id) {\n      id\n      fullName\n      email\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Members($pageIndex: Int!, $pageSize: Int!, $filter: MemberFilter, $years: [Int!]) {\n    members(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...MemberListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  query Members($pageIndex: Int!, $pageSize: Int!, $filter: MemberFilter, $years: [Int!]) {\n    members(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...MemberListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Member($id: ID!, $years: [Int!]) {\n    member(id: $id) {\n      ...MemberDetail\n    }\n  }\n  \n'
): (typeof documents)['\n  query Member($id: ID!, $years: [Int!]) {\n    member(id: $id) {\n      ...MemberDetail\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MembersCsv($years: [Int!]!, $filter: MemberFilter) {\n    members(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        socialCardNumber\n        registrationRequestDate\n        registrationAcceptanceDate\n        fullName\n        birthday\n        taxCode\n        address\n        qualification\n        paidMembershipFee(years: $years)\n        csenCardNumber\n        asiCardNumber\n      }\n    }\n  }\n'
): (typeof documents)['\n  query MembersCsv($years: [Int!]!, $filter: MemberFilter) {\n    members(pageIndex: 0, pageSize: 0, filter: $filter) {\n      data {\n        socialCardNumber\n        registrationRequestDate\n        registrationAcceptanceDate\n        fullName\n        birthday\n        taxCode\n        address\n        qualification\n        paidMembershipFee(years: $years)\n        csenCardNumber\n        asiCardNumber\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MembersSync($ids: [ID!]!) {\n    members(pageIndex: 0, pageSize: 0, filter: { ids: $ids }) {\n      data {\n        id\n        name\n        surname\n        taxCode\n        address\n        qualification\n        email\n        parent {\n          name\n          surname\n          taxCode\n        }\n        courses {\n          id\n        }\n        shiftIds\n        medicalCertificate {\n          base64\n          expireAt\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query MembersSync($ids: [ID!]!) {\n    members(pageIndex: 0, pageSize: 0, filter: { ids: $ids }) {\n      data {\n        id\n        name\n        surname\n        taxCode\n        address\n        qualification\n        email\n        parent {\n          name\n          surname\n          taxCode\n        }\n        courses {\n          id\n        }\n        shiftIds\n        medicalCertificate {\n          base64\n          expireAt\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MemberCreate($input: MemberCreateInput!, $years: [Int!]) {\n    memberCreate(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation MemberCreate($input: MemberCreateInput!, $years: [Int!]) {\n    memberCreate(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MemberUpdate($input: MemberUpdateInput!, $years: [Int!]) {\n    memberUpdate(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation MemberUpdate($input: MemberUpdateInput!, $years: [Int!]) {\n    memberUpdate(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MemberUpdateMany($input: MemberUpdateManyInput!) {\n    memberUpdateMany(input: $input) {\n      modifiedCount\n    }\n  }\n'
): (typeof documents)['\n  mutation MemberUpdateMany($input: MemberUpdateManyInput!) {\n    memberUpdateMany(input: $input) {\n      modifiedCount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MemberDelete($input: MemberDeleteInput!, $years: [Int!]) {\n    memberDelete(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation MemberDelete($input: MemberDeleteInput!, $years: [Int!]) {\n    memberDelete(input: $input) {\n      member {\n        ...MemberDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment FeeListItem on Fee {\n    id\n    name\n    course {\n      id\n      name\n    }\n    amount\n    enabled\n  }\n'
): (typeof documents)['\n  fragment FeeListItem on Fee {\n    id\n    name\n    course {\n      id\n      name\n    }\n    amount\n    enabled\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment FeeDetail on Fee {\n    ...FeeListItem\n    recurrence\n    reason\n    createdAt\n    updatedAt\n    canDelete\n  }\n  \n'
): (typeof documents)['\n  fragment FeeDetail on Fee {\n    ...FeeListItem\n    recurrence\n    reason\n    createdAt\n    updatedAt\n    canDelete\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query FeesSearcher($filter: FeeFilter) {\n    fees(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        name\n        amount\n        recurrence\n        reason\n        course {\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query FeesSearcher($filter: FeeFilter) {\n    fees(pageIndex: 0, pageSize: 20, filter: $filter) {\n      data {\n        id\n        name\n        amount\n        recurrence\n        reason\n        course {\n          name\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query FeeSearcher($id: ID!) {\n    fee(id: $id) {\n      id\n      name\n      amount\n      recurrence\n      reason\n      course {\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query FeeSearcher($id: ID!) {\n    fee(id: $id) {\n      id\n      name\n      amount\n      recurrence\n      reason\n      course {\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Fees($pageIndex: Int!, $pageSize: Int!, $filter: FeeFilter) {\n    fees(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...FeeListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  query Fees($pageIndex: Int!, $pageSize: Int!, $filter: FeeFilter) {\n    fees(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        ...FeeListItem\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Fee($id: ID!) {\n    fee(id: $id) {\n      ...FeeDetail\n    }\n  }\n  \n'
): (typeof documents)['\n  query Fee($id: ID!) {\n    fee(id: $id) {\n      ...FeeDetail\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation FeeCreate($input: FeeCreateInput!) {\n    feeCreate(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation FeeCreate($input: FeeCreateInput!) {\n    feeCreate(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation FeeUpdate($input: FeeUpdateInput!) {\n    feeUpdate(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation FeeUpdate($input: FeeUpdateInput!) {\n    feeUpdate(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation FeeDelete($input: FeeDeleteInput!) {\n    feeDelete(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation FeeDelete($input: FeeDeleteInput!) {\n    feeDelete(input: $input) {\n      fee {\n        ...FeeDetail\n      }\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Emails($pageIndex: Int!, $pageSize: Int!, $filter: EmailFilter) {\n    emails(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        id\n        course {\n          name\n        }\n        type\n        to\n        subject\n        body\n        createdAt\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Emails($pageIndex: Int!, $pageSize: Int!, $filter: EmailFilter) {\n    emails(pageIndex: $pageIndex, pageSize: $pageSize, filter: $filter) {\n      data {\n        id\n        course {\n          name\n        }\n        type\n        to\n        subject\n        body\n        createdAt\n      }\n      pageInfo {\n        total\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PaymentSendReminder($input: PaymentSendReminderInput!) {\n    paymentSendReminder(input: $input) {\n      email {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation PaymentSendReminder($input: PaymentSendReminderInput!) {\n    paymentSendReminder(input: $input) {\n      email {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SendMonthlyReminders($input: SendMonthlyRemindersInput!) {\n    sendMonthlyReminders(input: $input) {\n      sentReminders\n    }\n  }\n'
): (typeof documents)['\n  mutation SendMonthlyReminders($input: SendMonthlyRemindersInput!) {\n    sendMonthlyReminders(input: $input) {\n      sentReminders\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
