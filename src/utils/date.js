import dayjs from 'dayjs';

const getDate = (daysGap = 0, hoursGap = 0, minutesGap = 0) => {
  const day = dayjs().add(daysGap, 'day');
  const hours = dayjs(day).add(hoursGap, 'hour');

  return dayjs(hours).add(minutesGap, 'minutes');
};

const getFormatedDate = (date) => dayjs(date).format('YY/MM/DD HH:MM');
const getIsoDate = (date) => dayjs(date).format('YYYY-MM-DD[T]HH:mm[:00]');
const getTime = (date) => dayjs(date).format('HH:mm');
const getDayMonthFormatDate = (date) => dayjs(date).format('MMM DD');
const getDateDifferenceInMinutes = (firstDate, anotherDate) => dayjs(anotherDate).diff(dayjs(firstDate), 'minute');
const getDateDifference = (firstDate, anotherDate) => dayjs(anotherDate).diff(dayjs(firstDate));

const getDuration = (time) => {
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;

  const duration = [];
  if (hours) {
    duration.push(`${Math.abs(hours)}H`);
  }

  if (minutes) {
    duration.push(`${Math.abs(minutes)}M`);
  }

  return duration;
};

const sortByDate = (list) => list.slice().sort((firstItem, anotherItem) => firstItem.dateFrom - anotherItem.dateFrom);

export {
  getTime,
  getDate,
  getFormatedDate,
  getIsoDate,
  getDayMonthFormatDate,
  getDateDifference,
  getDateDifferenceInMinutes,
  getDuration,
  sortByDate
};

