import { Calendar } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

const MyCalendar = Calendar.generateCalendar<Date>(dateFnsGenerateConfig);

export default MyCalendar;
