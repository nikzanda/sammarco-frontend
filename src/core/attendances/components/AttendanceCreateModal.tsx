import { App, Form, Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { set } from 'date-fns';
import { CourseSearcher, ShiftPicker } from '../../courses/components';
import { DatePicker } from '../../../components';
import { ShiftsQuery, useAttendanceCreateManyMutation } from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

type Props = {
  memberIds: string[];
  courseIds: string[];
  // TODO: shiftIds
  onCancel: () => void;
};

const AttendanceCreateModal: React.FC<Props> = ({ memberIds, courseIds, onCancel }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [selectedShift, setSelectedShift] = React.useState<ShiftsQuery['shifts'][number]>();

  const initialValues = React.useMemo(() => {
    const result = {
      ...(courseIds.length === 1 && { courseId: courseIds[0] }),
      date: Date.now(),
    };
    return result;
  }, [courseIds]);

  const [createAttendances, { loading: mutationLoading, error: mutationError }] = useAttendanceCreateManyMutation({
    refetchQueries: ['Attendances'],
    onCompleted: () => {
      message.success(t('attendances.created'));
      onCancel();
    },
  });

  useDisplayGraphQLErrors(mutationError);

  const handleSubmit = (values: any) => {
    const { courseId, date: inputDate, fromTo } = values;

    const [inputFrom, inputTo] = fromTo;

    const date = new Date(inputDate);

    const from = set(inputFrom, {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      seconds: 0,
      milliseconds: 0,
    }).getTime();

    const to = set(inputTo, {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      seconds: 0,
      milliseconds: 0,
    }).getTime();

    createAttendances({
      variables: {
        input: {
          memberIds,
          courseId,
          from,
          to,
        },
      },
    });
  };

  return (
    <Modal
      title={t('attendances.new')}
      open
      okButtonProps={{
        htmlType: 'submit',
        form: 'form',
        loading: mutationLoading,
      }}
      onCancel={onCancel}
    >
      <Form
        id="form"
        form={form}
        initialValues={initialValues}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label={t('attendances.form.course')}
          name="courseId"
          rules={[{ required: true, message: t('validations.required') }]}
        >
          <CourseSearcher
            queryFilters={{ ids: courseIds }}
            allowClear={false}
            onChange={() => {
              if (form.getFieldValue('shiftId')) {
                form.setFieldValue('shiftId', undefined);
              }
            }}
          />
        </Form.Item>

        <Form.Item noStyle dependencies={['courseId']}>
          {({ getFieldValue }) => {
            const courseId = getFieldValue('courseId');

            return (
              <Form.Item label={t('attendances.form.shift')} name="shiftId">
                <ShiftPicker
                  queryFilters={{ courseIds: courseId }}
                  disabled={!courseId}
                  onChange={(_value, shifts) => {
                    const [shift] = shifts;
                    if (shift) {
                      setSelectedShift(shift);
                      const from = set(Date.now(), {
                        hours: shift.from[0],
                        minutes: shift.from[1],
                        seconds: 0,
                        milliseconds: 0,
                      }).getTime();
                      const to = set(Date.now(), {
                        hours: shift.to[0],
                        minutes: shift.to[1],
                        seconds: 0,
                        milliseconds: 0,
                      }).getTime();
                      form.setFieldValue('fromTo', [from, to]);
                    }
                  }}
                />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Form.Item
          label={t('attendances.form.date')}
          name="date"
          rules={[{ required: true, message: t('validations.required') }]}
          getValueProps={(v: number) => {
            if (v) {
              return { value: new Date(v) };
            }
            return { value: undefined };
          }}
          getValueFromEvent={(v: Date) => {
            if (v) {
              return v.getTime();
            }
            return null;
          }}
        >
          <DatePicker
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
            disabledDate={(date) => {
              if (!selectedShift) {
                return false;
              }

              return date.getDay() !== selectedShift.weekDay;
            }}
          />
        </Form.Item>

        <Form.Item
          label={t('attendances.form.fromTo')}
          name="fromTo"
          rules={[{ required: true, message: t('validations.required') }]}
          getValueProps={(v: [number, number]) => {
            if (v?.length) {
              return { value: v.map((d) => new Date(d)) };
            }
            return { value: [] };
          }}
          getValueFromEvent={(v: [Date, Date]) => {
            if (v?.length) {
              return v.map((d) => d.getTime());
            }
            return null;
          }}
        >
          <DatePicker.RangePicker picker="time" format="HH:mm" showSecond={false} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AttendanceCreateModal;
