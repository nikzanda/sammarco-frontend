import React from 'react';
import {
  addDays,
  endOfDay,
  format,
  isSameDay,
  isSameMonth,
  lastDayOfMonth,
  lastDayOfYear,
  set,
  subDays,
} from 'date-fns';
import { App, Badge, Button, CalendarProps, Popconfirm, Spin, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  AttendanceDeleteDocument,
  AttendanceFilter,
  AttendanceListItemFragment,
  AttendancesDocument,
  MemberDetailFragment,
} from '../../../gql/graphql';
import { Calendar } from '../../../components';
import { useDisplayGraphQLErrors } from '../../../hooks';

interface Props {
  member: MemberDetailFragment;
}

const MemberCalendar: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { message } = App.useApp();

  const [date, setDate] = React.useState(new Date());
  const [calendarMode, setCalendarMode] = React.useState<CalendarProps<Date>['mode']>('month');

  const queryFilter = React.useMemo(() => {
    const from = subDays(
      set(date, {
        ...(calendarMode === 'year' && { month: 0 }),
        date: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      14
    ).getTime();

    const to = addDays(
      calendarMode === 'month' ? endOfDay(lastDayOfMonth(date)) : endOfDay(lastDayOfYear(date)),
      14
    ).getTime();

    const result: AttendanceFilter = {
      memberIds: [member.id],
      from,
      to,
    };
    return result;
  }, [calendarMode, date, member.id]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(AttendancesDocument, {
    variables: {
      filter: queryFilter,
    },
  });

  const [deleteAttendance, { loading: mutationLoading, error: mutationError }] = useMutation(AttendanceDeleteDocument, {
    refetchQueries: ['Attendances', 'Member'],
    onCompleted: () => {
      message.success(t('attendances.deleted'));
    },
  });

  useDisplayGraphQLErrors(queryError, mutationError);

  const attendances = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.attendances.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const handleDelete = (attendanceId: string) => {
    deleteAttendance({
      variables: {
        input: {
          id: attendanceId,
        },
      },
    });
  };

  const monthCellRender = (current: Date) => {
    const lessons = attendances.filter((attendance) => isSameMonth(current, attendance.from));
    if (lessons.length === 0) {
      return undefined;
    }

    const lessonsByCourse = lessons.reduce(
      (acc: { course: AttendanceListItemFragment['course']; count: number }[], { course }) => {
        const found = acc.find((row) => row.course.id === course.id);
        if (!found) {
          acc.push({
            course,
            count: 1,
          });
        } else {
          found.count++;
        }
        return acc;
      },
      []
    );

    return (
      <ul className="events">
        {member.medicalCertificate && isSameMonth(member.medicalCertificate.expireAt, current) && (
          <li>
            <Badge color="gold" text={t('members.alerts.medicalCertificate.expire')} />
          </li>
        )}
        {lessonsByCourse.map(({ course, count }) => (
          <li key={course.id}>
            <Badge color={course.color || token.colorSuccess} text={t('members.lessons', { number: count, count })} />
          </li>
        ))}
      </ul>
    );
  };

  const dateCellRender = (current: Date) => {
    const currentAttendances = attendances
      .filter((attendance) => isSameDay(current, attendance.from))
      .sort((a, b) => a.from - b.from);

    return (
      <ul className="events">
        {member.medicalCertificate && isSameDay(member.medicalCertificate.expireAt, current) && (
          <li>
            <Badge color="gold" text={t('members.alerts.medicalCertificate.expire')} />
          </li>
        )}
        {currentAttendances.map(({ id, course, from, to }) => {
          const text = [format(from, 'HH:mm'), format(to, 'HH:mm')].join(' - ');

          return (
            <li key={from} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
              <Badge
                color={course.color || token.colorSuccess}
                text={
                  <>
                    {text}{' '}
                    <Popconfirm
                      title={t('attendances.delete.confirm')}
                      description={t('attendances.delete.description')}
                      onConfirm={() => handleDelete(id)}
                    >
                      <Button
                        size="small"
                        shape="circle"
                        danger
                        icon={<Icon component={FaTrash} />}
                        loading={mutationLoading}
                      />
                    </Popconfirm>
                  </>
                }
              />
            </li>
          );
        })}
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
    <Spin spinning={queryLoading}>
      <Calendar
        cellRender={cellRender}
        onPanelChange={(date, mode) => {
          setDate(date);
          setCalendarMode(mode);
        }}
      />
    </Spin>
  );
};

export default MemberCalendar;
