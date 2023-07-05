const ONE_SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_MILLISECONDS = 60 * ONE_SECOND_IN_MILLISECONDS;
const HOUR_IN_MILLISECONDS = 3600 * ONE_SECOND_IN_MILLISECONDS;
const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;
const WEEK_IN_MILLISECONDS = 7 * DAY_IN_MILLISECONDS;

const formatDate = (dateString: Date | string) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return [year, month, day].join('-');
};

export const formatRelativeTime = (dateString: Date | string) => {
  const currentDate = new Date();
  const dateToCompare = new Date(dateString);

  const relativeTimeDifference = dateToCompare.getTime() - currentDate.getTime();
  const absTimeDifference = Math.abs(relativeTimeDifference);

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'always', style: 'long' });

  if (absTimeDifference <= HOUR_IN_MILLISECONDS) {
    return formatter.format(Math.round(relativeTimeDifference / MINUTE_IN_MILLISECONDS), 'minute');
  }

  if (absTimeDifference <= DAY_IN_MILLISECONDS) {
    return formatter.format(Math.round(relativeTimeDifference / HOUR_IN_MILLISECONDS), 'hour');
  }

  if (absTimeDifference <= WEEK_IN_MILLISECONDS) {
    return formatter.format(Math.round(relativeTimeDifference / DAY_IN_MILLISECONDS), 'day');
  }

  return formatDate(dateString);
};
