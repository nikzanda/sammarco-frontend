import React from 'react';
import { Badge, Button, CalendarProps, Col, Modal, Row, Space, Spin, theme } from 'antd';
import { set, lastDayOfMonth, lastDayOfYear, isSameMonth, format, isSameDay, endOfDay } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { FaExpand } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { AttendanceFilter, AttendancesQuery, useAttendancesQuery } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { Calendar } from '../../components';
import { CoursePicker } from '../courses/components';

const CalendarPage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [modal, contextHolder] = Modal.useModal();

  const [courseIds, setCourseIds] = React.useState<string[]>();
  const [date, setDate] = React.useState(new Date());
  const [calendarMode, setCalendarMode] = React.useState<CalendarProps<Date>['mode']>('month');

  const queryFilter = React.useMemo(() => {
    const from = set(date, {
      ...(calendarMode === 'year' && { month: 0 }),
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).getTime();

    const to =
      calendarMode === 'month' ? endOfDay(lastDayOfMonth(date)).getTime() : endOfDay(lastDayOfYear(date)).getTime();

    const result: AttendanceFilter = {
      courseIds,
      from,
      to,
    };
    return result;
  }, [calendarMode, courseIds, date]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useAttendancesQuery({
    variables: {
      filter: queryFilter,
    },
  });

  useDisplayGraphQLErrors(queryError);

  const attendances = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.attendances.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const courses = React.useMemo(() => {
    const result = attendances.reduce(
      (acc: { [courseId: string]: AttendancesQuery['attendances']['data'][number]['course'] }, { course }) => {
        if (!acc[course.id]) {
          acc[course.id] = course;
        }
        return acc;
      },
      {}
    );
    return result;
  }, [attendances]);

  const monthCellRender = (current: Date) => {
    const lessons = attendances.filter((attendance) => isSameMonth(current, attendance.from));
    if (lessons.length === 0) {
      return undefined;
    }

    const tmp = lessons
      .reduce(
        (acc: { course: (typeof lessons)[0]['course']; from: number; to: number; memberNumbers: number }[], lesson) => {
          const a = acc.find(
            ({ course, from, to }) => course.id === lesson.course.id && from === lesson.from && to === lesson.to
          );
          if (a) {
            a.memberNumbers++;
          } else {
            acc.push({
              course: lesson.course,
              from: lesson.from,
              to: lesson.to,
              memberNumbers: 1,
            });
          }

          return acc;
        },
        []
      )
      .reduce(
        (
          acc: {
            [courseId: string]: { course: (typeof lessons)[0]['course']; lessons: number; memberNumbers: number };
          },
          lesson
        ) => {
          if (!acc[lesson.course.id]) {
            acc[lesson.course.id] = {
              course: lesson.course,
              lessons: 0,
              memberNumbers: 0,
            };
          }

          acc[lesson.course.id].lessons++;
          acc[lesson.course.id].memberNumbers += lesson.memberNumbers;

          return acc;
        },
        {}
      );

    return (
      <Space direction="vertical" size="small">
        {Object.values(tmp).map(({ course, lessons, memberNumbers }) => {
          const average = Math.floor(memberNumbers / lessons);

          return (
            <Badge
              key={course.id}
              color={course.color || token.colorSuccess}
              text={t('attendances.yearLessons', { lessons, members: average })}
            />
          );
        })}
      </Space>
    );
  };

  // TODO: first day of month - 7
  const dateCellRender = (current: Date) => {
    const currentAttendances = attendances
      .filter((attendance) => isSameDay(current, attendance.from))
      .reduce((acc: { courseId: string; from: number; to: number; memberNames: string[] }[], attendance) => {
        const lesson = acc.find(
          ({ courseId, from, to }) =>
            courseId === attendance.course.id && from === attendance.from && to === attendance.to
        );
        if (lesson) {
          lesson.memberNames.push(attendance.member.fullName);
        } else {
          acc.push({
            courseId: attendance.course.id,
            from: attendance.from,
            to: attendance.to,
            memberNames: [attendance.member.fullName],
          });
        }

        return acc;
      }, [])
      .sort(({ from: aFrom }, { from: bFrom }) => aFrom - bFrom);

    return (
      <>
        {currentAttendances.map(({ courseId, from, to, memberNames }) => (
          <Badge
            key={from}
            color={courses[courseId].color || token.colorSuccess}
            text={
              <>
                {format(from, 'HH:mm')} - {format(to, 'HH:mm')}: {memberNames.length}{' '}
                <Button
                  size="small"
                  shape="circle"
                  icon={<Icon component={FaExpand} />}
                  onClick={() => {
                    modal.info({
                      title: (
                        <>
                          {format(from, 'dd/MM/yyyy')}, {courses[courseId].name}
                        </>
                      ),
                      content: memberNames.sort().join(', '),
                    });
                  }}
                />
              </>
            }
          />
        ))}
      </>
    );
  };

  const cellRender: CalendarProps<Date>['cellRender'] = (current, info) => {
    switch (info.type) {
      case 'date':
        return dateCellRender(current);

      case 'month':
        return monthCellRender(current);

      default:
        return undefined;
    }
  };

  return (
    <Space direction="vertical">
      <Row style={{ marginTop: 10 }}>
        <Col xs={24} sm={12} md={8}>
          <CoursePicker
            value={courseIds}
            onChange={(values) => setCourseIds(values.length > 0 ? values : undefined)}
            placeholder={t('courses.searcher.placeholder')}
          />
        </Col>
      </Row>

      <Spin spinning={queryLoading}>
        <Calendar
          cellRender={cellRender}
          onPanelChange={(date, mode) => {
            setDate(date);
            setCalendarMode(mode);
          }}
        />
      </Spin>

      {contextHolder}
    </Space>
  );
};

export default CalendarPage;
