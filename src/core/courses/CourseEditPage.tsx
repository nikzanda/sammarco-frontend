import React from 'react';
import { App, Card, Flex, Form, FormProps, Result, Skeleton, Spin, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaTrash } from 'react-icons/fa';
import { set } from 'date-fns';
import { useMutation, useQuery } from '@apollo/client/react';
import { CourseDeleteDocument, CourseDocument, CourseUpdateDocument, ShiftInput } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { CourseForm } from './components';
import { EditPageHeader, Updates } from '../../commons';
import { getURLTab, setURLTab } from '../../utils';

const DEFAULT_TAB = 'details';

const CourseEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message, modal } = App.useApp();

  const [tab, setTab] = React.useState(getURLTab() || DEFAULT_TAB);

  React.useEffect(() => {
    setURLTab(getURLTab() || DEFAULT_TAB);
  }, []);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(CourseDocument, {
    variables: {
      id: id!,
    },
  });

  const [updateCourse, { loading: updateLoading, error: updateError }] = useMutation(CourseUpdateDocument, {
    refetchQueries: ['Courses', 'Course'],
    onCompleted: () => {
      message.success(t('courses.edited'));
    },
  });

  const [deleteCourse, { loading: deleteLoading, error: deleteError }] = useMutation(CourseDeleteDocument, {
    refetchQueries: ['Courses'],
    onCompleted: () => {
      message.success(t('courses.deleted'));
      navigate('/courses');
    },
  });

  useDisplayGraphQLErrors(queryError, updateError, deleteError);

  const course = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.course;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const title = React.useMemo(() => {
    if (!course) {
      return <Spin />;
    }
    return course.name;
  }, [course]);

  const initialValues = React.useMemo(() => {
    if (!course) {
      return undefined;
    }

    return {
      ...course,
      shifts: course.shifts.map((dayShifts) =>
        dayShifts.map((shift) => {
          const from = set(Date.now(), {
            hours: shift.from[0],
            minutes: shift.from[1],
            seconds: 0,
            milliseconds: 0,
          });

          const to = set(Date.now(), {
            hours: shift.to[0],
            minutes: shift.to[1],
            seconds: 0,
            milliseconds: 0,
          });

          return {
            id: shift.id,
            range: [from, to],
          };
        })
      ),
    };
  }, [course]);

  const handleDelete = () => {
    deleteCourse({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  };

  const handleFinish: FormProps['onFinish'] = (values) => {
    const { color, shifts, ...input } = values;

    const timestampToHourMinutes = (timestamp: number) => {
      const date = new Date(timestamp);
      return [date.getHours(), date.getMinutes()];
    };

    updateCourse({
      variables: {
        input: {
          id: id!,
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
      <EditPageHeader
        title={title}
        submitButtonProps={{
          loading: updateLoading,
        }}
        actions={[
          {
            key: 'delete',
            label: t('buttons.delete.label'),
            disabled: !course?.canDelete,
            icon: <Icon component={FaTrash} spin={deleteLoading} />,
            danger: true,
            onClick: () => {
              modal.confirm({
                title: t('courses.delete.description', { name: course?.name }),
                content: t('courses.delete.confirm'),
                onOk: () => handleDelete(),
              });
            },
          },
        ]}
      />

      {queryLoading && <Skeleton active />}
      {queryError && <Result status="500" title="500" subTitle={t('errors.somethingWentWrong')} />}
      {course && (
        <Card styles={{ body: { paddingTop: 0 } }}>
          <Tabs
            activeKey={tab}
            onChange={(newTab) => {
              setURLTab(newTab);
              setTab(newTab);
            }}
            items={[
              {
                label: t('courses.tab.details'),
                key: 'details',
                children: (
                  <>
                    <Form
                      id="form"
                      initialValues={initialValues}
                      layout="vertical"
                      autoComplete="off"
                      onFinish={handleFinish}
                    >
                      <CourseForm />
                    </Form>

                    <Updates updates={course} />
                  </>
                ),
              },
            ]}
          />
        </Card>
      )}
    </Flex>
  );
};

export default CourseEditPage;
