import React from 'react';
import { Select, SelectProps } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import {
  CourseFilter,
  CourseSearcherDocument,
  CourseSearcherQuery,
  CoursesSearcherDocument,
} from '../../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

interface Props extends Omit<SelectProps, 'onChange'> {
  queryFilters?: CourseFilter;
  onChange?: (value: string, course: CourseSearcherQuery['course']) => void;
}

const CourseSearcher: React.FC<Props> = ({ value, queryFilters = {}, onChange = () => {}, ...selectProps }) => {
  const [fetchCourses, { data: coursesData, loading: coursesLoading, error: coursesError, refetch: coursesRefetch }] =
    useLazyQuery(CoursesSearcherDocument);

  const {
    data: courseData,
    loading: courseLoading,
    error: courseError,
  } = useQuery(CourseSearcherDocument, {
    variables: {
      id: value!,
    },
    skip: !value,
  });

  useDisplayGraphQLErrors(coursesError, courseError);

  const courses = React.useMemo(() => {
    if (!coursesLoading && !coursesError && coursesData) {
      return coursesData.courses.data;
    }
    return [];
  }, [coursesData, coursesError, coursesLoading]);

  const course = React.useMemo(() => {
    if (!courseLoading && !courseError && courseData) {
      return courseData.course;
    }
    return undefined;
  }, [courseData, courseError, courseLoading]);

  const options = React.useMemo(() => {
    const result = courses.map((course) => ({
      label: course.name,
      value: course.id,
    }));
    if (course && !courses.some(({ id }) => id === course.id)) {
      result.unshift({
        label: course.name,
        value: course.id,
      });
    }
    return result;
  }, [course, courses]);

  const handleSearch = useDebouncedCallback((search: string) => {
    coursesRefetch({
      filter: {
        search,
        ...queryFilters,
      },
    });
  }, 500);

  const handleChange = (value: string) => {
    const selectedCourse = courses.find(({ id }) => id === value);
    onChange!(value, selectedCourse!);
  };

  return (
    <Select
      {...selectProps}
      value={value}
      onFocus={() => fetchCourses({ variables: { filter: queryFilters } })}
      options={options}
      onChange={handleChange}
      showSearch={{ filterOption: false, onSearch: handleSearch }}
      loading={coursesLoading || courseLoading}
    />
  );
};

export default CourseSearcher;
