import React from 'react';
import { Select, SelectProps } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { CoursesSearcherQuery, useCoursesSearcherLazyQuery, useCoursesSearcherQuery } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

const defaultProps = {
  value: undefined,
  onChange: () => {},
};

interface Props extends Omit<SelectProps, 'value' | 'onChange' | 'mode'> {
  value?: string[];
  onChange?: (value: string[], courses: CoursesSearcherQuery['courses']['data']) => void;
}

const CoursePicker: React.FC<Props> = ({ value, onChange, ...selectProps }) => {
  const [fetchCourses, { data: coursesData, loading: coursesLoading, error: coursesError, refetch: coursesRefetch }] =
    useCoursesSearcherLazyQuery({
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
        ids: value,
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

  const handleChange: SelectProps['onChange'] = (values) => {
    const selectedCourses = courses.filter(({ id }) => values.includes(id));
    onChange!(values, selectedCourses);
  };

  return (
    <Select
      {...selectProps}
      value={value}
      mode="multiple"
      onFocus={() => fetchCourses()}
      options={options}
      onChange={handleChange}
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

export type { Props as CoursePickerProps };
