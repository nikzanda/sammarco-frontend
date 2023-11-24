import React from 'react';
import { Badge, CalendarProps, Col, Popover, Row, Space, Spin, theme } from 'antd';
import { set, lastDayOfMonth, lastDayOfYear, isSameMonth, format, isSameDay } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { AttendanceFilter, AttendancesQuery, useAttendancesQuery } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { Calendar } from '../../components';
import { CoursePicker } from '../courses/components';

const CalendarPage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

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

    const to = calendarMode === 'month' ? lastDayOfMonth(date).getTime() : lastDayOfYear(date).getTime();

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
    const lessonsNumber = attendances.filter((attendance) => isSameMonth(current, attendance.from)).length;
    if (lessonsNumber === 0) {
      return undefined;
    }

    return <Badge status="success" text={t('members.lessons', { number: lessonsNumber, count: lessonsNumber })} />;
  };

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
      }, []);

    return (
      <>
        {currentAttendances.map(({ courseId, from, to, memberNames }) => (
          <Popover title={courses[courseId].name} content={memberNames.join(', ')}>
            <Badge
              key={from}
              color={courses[courseId].color || token.colorSuccess}
              text={
                <>
                  {format(from, 'HH:mm')} - {format(to, 'HH:mm')}: {memberNames.length}
                </>
              }
            />
          </Popover>
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
    </Space>
  );
};

export default CalendarPage;
