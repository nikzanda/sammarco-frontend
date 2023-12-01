import React from 'react';
import { format, isSameDay, isSameMonth, lastDayOfMonth, lastDayOfYear, set } from 'date-fns';
import { App, Badge, Button, CalendarProps, Popconfirm, Spin, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import {
  AttendanceFilter,
  MemberDetailFragment,
  useAttendanceDeleteMutation,
  useAttendancesQuery,
} from '../../../generated/graphql';
import { Calendar } from '../../../components';
import { useDisplayGraphQLErrors } from '../../../hooks';

type Props = {
  member: MemberDetailFragment;
};

const MemberAttendances: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { message } = App.useApp();

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
    const lessonsNumber = attendances.filter((attendance) => isSameMonth(current, attendance.from)).length;
    if (lessonsNumber === 0) {
      return undefined;
    }

    return <Badge status="success" text={t('members.lessons', { number: lessonsNumber, count: lessonsNumber })} />;
  };

  const dateCellRender = (current: Date) => {
    const currentAttendances = attendances.filter((attendance) => isSameDay(current, attendance.from));

    return (
      <>
        {currentAttendances.map(({ id, course, from, to }) => {
          const text = [format(from, 'HH:mm'), format(to, 'HH:mm')].join(' - ');

          return (
            <>
              <Badge key={from} color={course.color || token.colorSuccess} text={text} />{' '}
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
          );
        })}
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

export default MemberAttendances;
