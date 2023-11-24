import { gql } from '@apollo/client';

export const ATTENDANCE_LIST_ITEM_FRAGMENT = gql`
  fragment AttendanceListItem on Attendance {
    id
    member {
      id
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

export const ATTENDANCE_CREATE_MUTATION = gql`
  mutation AttendanceCreate($input: AttendanceCreateInput!) {
    attendanceCreate(input: $input) {
      attendance {
        ...AttendanceListItem
      }
    }
  }
`;
