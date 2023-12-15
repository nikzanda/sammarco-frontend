import React from 'react';
import { App, Badge, Button, CalendarProps, Col, Modal, Popconfirm, Row, Space, Spin, theme } from 'antd';
import {
  set,
  lastDayOfMonth,
  lastDayOfYear,
  isSameMonth,
  format,
  isSameDay,
  endOfDay,
  subDays,
  addDays,
} from 'date-fns';
import { useTranslation } from 'react-i18next';
import { FaExpand } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import {
  DayAttendancesFilter,
  DayAttendancesQuery,
  useAttendanceDeleteManyMutation,
  useDayAttendancesQuery,
} from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { Calendar } from '../../components';
import { CoursePicker } from '../courses/components';

const CalendarPage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const [modal, contextHolder] = Modal.useModal();

  const [courseIds, setCourseIds] = React.useState<string[]>();
  const [date, setDate] = React.useState(new Date());
  const [calendarMode, setCalendarMode] = React.useState<CalendarProps<Date>['mode']>('month');

  const queryFilter = React.useMemo(() => {
    const startFrom = subDays(
      set(date, {
        ...(calendarMode === 'year' && { month: 0 }),
        date: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      6
    ).getTime();

    const endFrom = addDays(
      calendarMode === 'month' ? endOfDay(lastDayOfMonth(date)) : endOfDay(lastDayOfYear(date)),
      13
    ).getTime();

    const result: DayAttendancesFilter = {
      courseIds,
      startFrom,
      endFrom,
    };
    return result;
  }, [calendarMode, courseIds, date]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useDayAttendancesQuery({
    variables: {
      filter: queryFilter,
    },
  });

  const [deleteAttendances, { loading: mutationLoading, error: mutationError }] = useAttendanceDeleteManyMutation({
    refetchQueries: ['Attendances'],
    onCompleted: () => {
      message.success(t('calendar.deleted'));
      Modal.destroyAll();
    },
  });

  useDisplayGraphQLErrors(queryError, mutationError);

  const attendances = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.dayAttendances;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const members = React.useMemo(() => {
    const result = attendances.reduce((acc: DayAttendancesQuery['dayAttendances'][number]['members'], { members }) => {
      members.forEach((member) => {
        if (!acc.some(({ id }) => id === member.id)) {
          acc.push(member);
        }
      });

      return acc;
    }, []);
    return result;
  }, [attendances]);

  const monthCellRender = (current: Date) => {
    const coursesData = attendances.reduce(
      (
        acc: {
          [courseId: string]: {
            course: DayAttendancesQuery['dayAttendances'][number]['course'];
            lessons: number;
            memberNumbers: number;
          };
        },
        attendance
      ) => {
        if (!isSameMonth(current, attendance.from)) {
          return acc;
        }

        if (!acc[attendance.course.id]) {
          acc[attendance.course.id] = {
            course: attendance.course,
            lessons: 0,
            memberNumbers: 0,
          };
        }

        acc[attendance.course.id].lessons++;
        acc[attendance.course.id].memberNumbers += attendance.members.length;

        return acc;
      },
      {}
    );

    const expires = members
      .filter(({ medicalCertificate }) => medicalCertificate && isSameMonth(medicalCertificate.expireAt, current))
      .map(({ fullName }) => fullName);

    return (
      <ul className="events">
        {expires.length > 0 && (
          <li>
            <Badge
              color="gold"
              text={
                <>
                  {t('calendar.medicalCertificate.expiring', { count: expires.length })}{' '}
                  <Button
                    size="small"
                    shape="circle"
                    icon={<Icon component={FaExpand} />}
                    onClick={() => {
                      modal.info({
                        title: t('calendar.medicalCertificate.title'),
                        content: expires.sort().join(', '),
                      });
                    }}
                  />
                </>
              }
            />
          </li>
        )}
        {Object.values(coursesData).map(({ course, lessons, memberNumbers }) => {
          const average = Math.floor(memberNumbers / lessons);

          return (
            <li key={course.id}>
              <Badge
                color={course.color || token.colorSuccess}
                text={t('attendances.yearLessons', { lessons, members: average })}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const dateCellRender = (current: Date) => {
    const currentAttendances = attendances
      .filter((attendance) => isSameDay(current, attendance.from))
      .sort(({ from: aFrom }, { from: bFrom }) => aFrom - bFrom);

    const expires = members
      .filter(({ medicalCertificate }) => medicalCertificate && isSameDay(medicalCertificate.expireAt, current))
      .map(({ fullName }) => fullName);

    return (
      <ul className="events">
        {expires.length > 0 && (
          <li>
            <Badge
              color="gold"
              text={
                <>
                  {t('calendar.medicalCertificate.expiring', { count: expires.length })}{' '}
                  <Button
                    size="small"
                    shape="circle"
                    icon={<Icon component={FaExpand} />}
                    onClick={() => {
                      modal.info({
                        title: t('calendar.medicalCertificate.title'),
                        content: expires.sort().join(', '),
                      });
                    }}
                  />
                </>
              }
            />
          </li>
        )}
        {currentAttendances.map(({ ids, from, to, course, members }) => (
          <li key={from}>
            <Badge
              color={course.color || token.colorSuccess}
              text={
                <>
                  {format(from, 'HH:mm')} - {format(to, 'HH:mm')}: {members.length}{' '}
                  <Button
                    size="small"
                    shape="circle"
                    icon={<Icon component={FaExpand} />}
                    onClick={() => {
                      modal.info({
                        title: (
                          <>
                            {format(from, 'dd/MM/yyyy')}, {format(from, 'HH:mm')} - {format(to, 'HH:mm')}, {course.name}
                          </>
                        ),
                        content: members.map(({ fullName }) => fullName).join(', '),
                        width: 1000,
                        okText: t('commons.close'),
                        okButtonProps: {
                          type: 'default',
                        },
                        // eslint-disable-next-line react/no-unstable-nested-components
                        footer: (_, { OkBtn }) => (
                          <>
                            <Popconfirm
                              title={t('calendar.deleteAll.confirm')}
                              description={t('calendar.deleteAll.description')}
                              onConfirm={() =>
                                deleteAttendances({
                                  variables: {
                                    input: {
                                      ids,
                                    },
                                  },
                                })
                              }
                            >
                              <Button type="primary" loading={mutationLoading} danger>
                                {t('calendar.deleteAll.label')}
                              </Button>
                            </Popconfirm>
                            <OkBtn />
                          </>
                        ),
                      });
                    }}
                  />
                </>
              }
            />
          </li>
        ))}
      </ul>
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
