import React from 'react';
import { Select, SelectProps } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { CoursesSearcherQuery, useCoursesSearcherQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  value: undefined,
  disabled: false,
  allowClear: true,
  placeholder: undefined,
  onChange: () => {},
  onClear: () => {},
};

interface Props {
  value?: string[];
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  placeholder?: SelectProps['placeholder'];
  onChange?: (value: string[], courses: CoursesSearcherQuery['courses']['data']) => void;
  onClear?: SelectProps['onClear'];
}

const CoursePicker: React.FC<Props> = ({ value, disabled, allowClear, placeholder, onChange, onClear }) => {
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
    data: valuesData,
    loading: valuesLoading,
    error: valuesError,
  } = useCoursesSearcherQuery({
    variables: {
      filter: {
        ids: value!,
      },
    },
    skip: !value,
  });

  useDisplayGraphQLErrors(coursesError, valuesError);

  const courses = React.useMemo(() => {
    if (!coursesLoading && !coursesError && coursesData) {
      return coursesData.courses.data;
    }
    return [];
  }, [coursesData, coursesError, coursesLoading]);

  const values = React.useMemo(() => {
    if (!valuesLoading && !valuesError && valuesData) {
      return valuesData.courses.data;
    }
    return undefined;
  }, [valuesData, valuesError, valuesLoading]);

  const options = React.useMemo(() => {
    const result = courses.map((course) => ({
      label: course.name,
      value: course.id,
    }));
    if (values) {
      const courseIds = courses.map(({ id }) => id);
      result.unshift(
        ...values
          .filter(({ id }) => !courseIds.includes(id))
          .map((course) => ({
            label: course.name,
            value: course.id,
          }))
      );
    }
    return result;
  }, [courses, values]);

  const handleSearch = useDebouncedCallback((search: string) => {
    coursesRefetch({
      filter: {
        search,
      },
    });
  }, 500);

  const handleChange = (values: string[]) => {
    const selectedCourses = courses.filter(({ id }) => values.includes(id));
    onChange!(values, selectedCourses);
  };

  return (
    <Select
      mode="multiple"
      value={value}
      options={options}
      allowClear={allowClear}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      onClear={onClear}
      filterOption={false}
      onSearch={handleSearch}
      loading={coursesLoading || valuesLoading}
      showSearch
      style={{ width: '100%' }}
    />
  );
};

CoursePicker.defaultProps = defaultProps;

export default CoursePicker;
