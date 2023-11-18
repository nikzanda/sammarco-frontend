import React from 'react';
import { format, isSameDay, lastDayOfMonth, set } from 'date-fns';
import { Badge, Spin } from 'antd';
import { AttendanceFilter, MemberDetailFragment, useAttendancesQuery } from '../../../generated/graphql';
import { Calendar } from '../../../components';
import { useDisplayGraphQLErrors } from '../../../hooks';

type Props = {
  member: MemberDetailFragment;
};

const MemberAttendances: React.FC<Props> = ({ member }) => {
  const [date, setDate] = React.useState(new Date());

  const queryFilter = React.useMemo(() => {
    const from = set(date, {
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).getTime();

    const to = lastDayOfMonth(date).getTime();

    const result: AttendanceFilter = {
      memberIds: [member.id],
      from,
      to,
    };
    return result;
  }, [date, member.id]);

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

  const cellRender = (current: Date) => {
    const currentAttendances = attendances.filter((attendance) => isSameDay(current, attendance.from));

    const result: React.ReactNode = (
      <>
        {currentAttendances.map(({ from, to }) => {
          const text = [format(from, 'HH:mm'), format(to, 'HH:mm')].join(' - ');

          return <Badge status="success" text={text} />;
        })}
      </>
    );
    return result;
  };

  return (
    <Spin spinning={queryLoading}>
      <Calendar cellRender={cellRender} onPanelChange={setDate} />
    </Spin>
  );
};

export default MemberAttendances;
