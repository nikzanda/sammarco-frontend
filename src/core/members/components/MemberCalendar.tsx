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
import { App, Badge, Button, CalendarProps, Flex, Popconfirm, Space, Spin, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaCalendarCheck, FaTrash } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import {
  AttendanceFilter,
  AttendanceListItemFragment,
  MemberDetailFragment,
  useAttendanceDeleteMutation,
  useAttendancesQuery,
} from '../../../generated/graphql';
import { Calendar } from '../../../components';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { AttendanceCreateModal } from '../../attendances/components';

interface Props {
  member: MemberDetailFragment;
}

const MemberCalendar: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { message } = App.useApp();

  const [newAttendance, setNewAttendance] = React.useState(false);
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
  } = useAttendancesQuery({
    variables: {
      filter: queryFilter,
    },
  });

  const [deleteAttendance, { loading: mutationLoading, error: mutationError }] = useAttendanceDeleteMutation({
    refetchQueries: ['Attendances'],
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
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="end">
        <Button size="large" icon={<Icon component={FaCalendarCheck} />} onClick={() => setNewAttendance(true)}>
          {t('attendances.new')}
        </Button>
      </Flex>

      <Spin spinning={queryLoading}>
        <Calendar
          cellRender={cellRender}
          onPanelChange={(date, mode) => {
            setDate(date);
            setCalendarMode(mode);
          }}
        />
      </Spin>

      {newAttendance && (
        <AttendanceCreateModal
          memberIds={[member.id]}
          courseIds={member.courses.map(({ id }) => id)}
          onCancel={() => setNewAttendance(false)}
        />
      )}
    </Space>
  );
};

export default MemberCalendar;
