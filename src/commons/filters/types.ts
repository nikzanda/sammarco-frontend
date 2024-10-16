import { GetProps, InputNumberProps, InputProps, SelectProps } from 'antd';
import { DatePicker } from '../../components';
import { CoursePickerProps, ShiftPickerProps } from '../../core/courses/components';
import { MemberPickerProps } from '../../core/members/components';
import { FeePickerProps } from '../../core/fees/components';

interface ITextFilter {
  type: 'text';
  props?: Omit<InputProps, 'onChange' | 'allowClear' | 'value' | 'onPressEnter' | 'onClear'>;
}

interface INumericFilter {
  type: 'numeric';
  props?: Omit<InputNumberProps<number>, 'onChange' | 'value' | 'onPressEnter'>;
}

interface ISelectFilter {
  type: 'select';
  props?: Omit<SelectProps, 'onChange' | 'allowClear' | 'value' | 'onClear'>;
}

interface ISwitchFilter {
  type: 'switch';
  props?: {
    placeholder: string;
  };
}

interface IDateFilter {
  type: 'date';
  props?: Omit<GetProps<typeof DatePicker.RangePicker>, 'onChange' | 'value'>;
}

interface IMonthFilter {
  type: 'month';
  props?: Omit<GetProps<typeof DatePicker.MonthPicker<Date>>, 'onChange' | 'value'>;
}

interface ICoursesFilter {
  type: 'courses';
  props?: Omit<CoursePickerProps, 'onChange' | 'value'>;
}

interface IMembersFilter {
  type: 'members';
  props?: Omit<MemberPickerProps, 'onChange' | 'value'>;
}

interface IShiftFilter {
  type: 'shift';
  props?: Omit<ShiftPickerProps, 'onChange' | 'value'>;
}

interface IFeesFilter {
  type: 'fees';
  props?: Omit<FeePickerProps, 'onChange' | 'value'>;
}

export type IFilter = {
  key: string;
} & (
  | ITextFilter
  | INumericFilter
  | ISelectFilter
  | ISwitchFilter
  | IDateFilter
  | IMonthFilter
  | ICoursesFilter
  | IMembersFilter
  | IShiftFilter
  | IFeesFilter
);
