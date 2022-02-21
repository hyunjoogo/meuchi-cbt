import moment from 'moment'

export const Format = {
  YYYY_MM_DD: 'YYYY-MM-DD',
  YY_MM_DD: 'YY-MM-DD',
  YYYY_MM_DD_HHmmss: 'YYYY-MM-DD HH:mm:ss',
  YYYY_MM_DD_HHmm: 'YYYY-MM-DD HH:mm',
  YYYY_MM: 'YYYY-MM',
  YYYYMM: 'YYYYMM',
  HH_mm_ss: 'HH:mm:ss',
  LT: 'LT'
};

export function format(value, format = Format.YYYY_MM_DD) {
  return moment(value).format(format);
}

export function toTimeStamp(value) {
  return moment(value).toDate().getTime();
}

export function subtractDay(value, format = Format.YYYY_MM_DD) {
  return moment(value).subtract(1, 'day').format(format)
}

export function addDay(value, format = Format.YYYY_MM_DD) {
  return moment(value).add(1, 'day').format(format)
}

export function toStartOfTimeStamp(value) {
  return moment(value).startOf('day').toDate().getTime();
}

export function toEndOfTimeStamp(value) {
  return moment(value).endOf('day').toDate().getTime();
}

export function toStartOfMonthTimeStamp(value) {
  return moment(value).startOf('month').toDate().getTime();
}

export function toEndOfMonthTimeStamp(value) {
  return moment(value).endOf('month').toDate().getTime();
}

export function toStartOfYearTimeStamp(value) {
  return moment(value).startOf('year').toDate().getTime();
}

export function toEndOfYearTimeStamp(value) {
  return moment(value).endOf('year').toDate().getTime();
}

export function diff(startTimeStamp, endTimeStamp, unitOfTime) {
  return Math.abs(moment(startTimeStamp).diff(moment(endTimeStamp), unitOfTime));
}

export function add(amount, unit) {
  return moment().add(amount, unit).toDate().getTime();
}

export function now() {
  return moment().toDate().getTime();
}

export function addValue(value, amount, unit) {
  return moment(value).add(amount, unit).toDate().getTime();
}
