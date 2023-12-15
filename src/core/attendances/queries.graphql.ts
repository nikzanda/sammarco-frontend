import { gql } from '@apollo/client';

export const ATTENDANCE_LIST_ITEM_FRAGMENT = gql`
  fragment AttendanceListItem on Attendance {
    id
    member {
      id
      fullName
      medicalCertificate {
        expireAt
      }
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

export const ATTENDANCES_QUERY = gql`
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
  ${ATTENDANCE_LIST_ITEM_FRAGMENT}
`;

export const DAY_ATTENDANCES_QUERY = gql`
  query DayAttendances($filter: DayAttendancesFilter!) {
    dayAttendances(pageIndex: 0, pageSize: 0, filter: $filter) {
      ids
      members {
        id
        fullName
        medicalCertificate {
          expireAt
        }
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

export const ATTENDANCE_CREATE_MANY_MUTATION = gql`
  mutation AttendanceCreateMany($input: AttendanceCreateManyInput!) {
    attendanceCreateMany(input: $input) {
      attendances {
        ...AttendanceListItem
      }
    }
  }
`;

export const ATTENDANCE_DELETE_MUTATION = gql`
  mutation AttendanceDelete($input: AttendanceDeleteInput!) {
    attendanceDelete(input: $input) {
      attendance {
        ...AttendanceListItem
      }
    }
  }
`;

export const ATTENDANCE_DELETE_MANY_MUTATION = gql`
  mutation AttendanceDeleteMany($input: AttendanceDeleteManyInput!) {
    attendanceDeleteMany(input: $input) {
      attendances {
        id
      }
    }
  }
`;
