import dayjs from 'dayjs';

const DATE_FORMAT = 'DD MMMM, YYYY';

export default function formatDate(
  date: Date,
  dateFormat: string = DATE_FORMAT
) {
  const dayJsDate = dayjs(date);
  return dayJsDate.format(dateFormat);
}
