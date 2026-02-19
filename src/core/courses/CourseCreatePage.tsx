import React from 'react';
import { App, Flex, Form, FormProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { CourseCreateDocument, ShiftInput } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { CourseForm } from './components';
import { CreatePageHeader } from '../../commons';

const CourseCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [createCourse, { loading, error }] = useMutation(CourseCreateDocument, {
    refetchQueries: ['Courses', 'CoursesSearcher'],
    onCompleted: () => {
      message.success(t('courses.created'));
      navigate('/courses');
    },
  });

  useDisplayGraphQLErrors(error);

  const handleFinish: FormProps['onFinish'] = (values) => {
    const { color, shifts, ...input } = values;

    const timestampToHourMinutes = (timestamp: number) => {
      const date = new Date(timestamp);
      return [date.getHours(), date.getMinutes()];
    };

    createCourse({
      variables: {
        input: {
          ...input,
          ...(color && { color: typeof color === 'string' ? color : color.toHexString() }),
          shifts: shifts.map((dayShifts: [{ id?: string; range: [number, number] }]) => {
            if (!dayShifts) {
              return [];
            }

            const result: ShiftInput[] = dayShifts.map((shift) => ({
              id: shift.id,
              from: timestampToHourMinutes(shift.range[0]),
              to: timestampToHourMinutes(shift.range[1]),
            }));
            return result;
          }),
        },
      },
    });
  };

  return (
    <Flex vertical gap="middle">
      <CreatePageHeader entity="courses" submitButtonProps={{ loading }} />

      <Form id="form" layout="vertical" autoComplete="off" onFinish={handleFinish}>
        <CourseForm />
      </Form>
    </Flex>
  );
};

export default CourseCreatePage;
