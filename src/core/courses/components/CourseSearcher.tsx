import { Select, SelectProps } from 'antd';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { CourseSearcherQuery, useCourseSearcherQuery, useCoursesSearcherQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  value: undefined,
  disabled: false,
  allowClear: true,
  onChange: () => {},
  onClear: () => {},
};

type Props = {
  value?: string;
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  onChange?: (value: string, course: CourseSearcherQuery['course']) => void;
  onClear?: SelectProps['onClear'];
};

const CourseSearcher: React.FC<Props> = ({ value, disabled, allowClear, onChange, onClear }) => {
  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError,
    refetch: coursesRefetch,
  } = useCoursesSearcherQuery({
    variables: {
      filter: {},
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

  useDisplayGraphQLErrors([coursesError, courseError]);

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
      },
    });
  }, 500);

  const handleChange = (value: string) => {
    const course = courses.find(({ id }) => id === value);
    onChange!(value, course!);
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