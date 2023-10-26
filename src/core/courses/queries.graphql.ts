import { gql } from '@apollo/client';

export const COURSE_LIST_ITEM_FRAGMENT = gql`
  fragment CourseListItem on Course {
    id
    name
  }
`;

export const COURSE_DETAIL_FRAGMENT = gql`
  fragment CourseDetail on Course {
    ...CourseListItem
    shifts {
      id
      from
      to
    }
  }
  ${COURSE_LIST_ITEM_FRAGMENT}
`;

export const COURSES_SEARCH_QUERY = gql`
  query CoursesSearcher($filter: CourseFilter) {
    courses(pageIndex: 0, pageSize: 20, filter: $filter) {
      data {
        id
        name
      }
    }
  }
`;

export const COURSE_SEARCH_QUERY = gql`
  query CourseSearcher($id: ID!) {
    course(id: $id) {
      id
      name
    }
  }
`;

export const COURSES_QUERY = gql`
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
  ${COURSE_LIST_ITEM_FRAGMENT}
`;

export const COURSE_QUERY = gql`
  query Course($id: ID!) {
    course(id: $id) {
      ...CourseDetail
    }
  }
  ${COURSE_DETAIL_FRAGMENT}
`;

export const COURSE_CREATE_MUTATION = gql`
  mutation CourseCreate($input: CourseCreateInput!) {
    courseCreate(input: $input) {
      course {
        ...CourseDetail
      }
    }
  }
  ${COURSE_DETAIL_FRAGMENT}
`;

export const COURSE_UPDATE_MUTATION = gql`
  mutation CourseUpdate($input: CourseUpdateInput!) {
    courseUpdate(input: $input) {
      course {
        ...CourseDetail
      }
    }
  }
  ${COURSE_DETAIL_FRAGMENT}
`;

export const COURSE_DELETE_MUTATION = gql`
  mutation CourseDelete($input: CourseDeleteInput!) {
    courseDelete(input: $input) {
      course {
        ...CourseDetail
      }
    }
  }
  ${COURSE_DETAIL_FRAGMENT}
`;
