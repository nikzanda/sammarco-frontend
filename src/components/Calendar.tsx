import { Calendar } from 'antd';
import dateFnsGenerateConfig from '@rc-component/picker/generate/dateFns';

const MyCalendar = Calendar.generateCalendar<Date>(dateFnsGenerateConfig);

export default MyCalendar;
