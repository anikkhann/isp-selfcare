import { DatePicker } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

const AppDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export default AppDatePicker;
