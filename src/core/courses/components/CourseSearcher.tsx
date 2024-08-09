import React from 'react';
import { Select, SelectProps } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import {
  CourseFilter,
  CourseSearcherQuery,
  useCourseSearcherQuery,
  useCoursesSearcherQuery,
} from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  value: undefined,
  queryFilters: {},
  disabled: false,
  allowClear: true,
  onChange: () => {},
  onClear: () => {},
};

interface Props {
  value?: string;
  queryFilters?: CourseFilter;
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  onChange?: (value: string, course: CourseSearcherQuery['course']) => void;
  onClear?: SelectProps['onClear'];
}

const CourseSearcher: React.FC<Props> = ({ value, queryFilters, disabled, allowClear, onChange, onClear }) => {
  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError,
    refetch: coursesRefetch,
  } = useCoursesSearcherQuery({
    variables: {
      filter: queryFilters,
    },
  });

  const {
    data: courseData,
    loading: courseLoading,
    error: courseError,
  } = useCourseSearcherQuery({
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
      value={value}
      options={options}
      allowClear={allowClear}
      disabled={disabled}
      onChange={handleChange}
      onClear={onClear}
      filterOption={false}
      onSearch={handleSearch}
      loading={coursesLoading || courseLoading}
      showSearch
    />
  );
};

CourseSearcher.defaultProps = defaultProps;

export default CourseSearcher;
