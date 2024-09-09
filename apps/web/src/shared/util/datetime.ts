import { DateTime } from 'luxon';

export const getLocaleDateTime = (
  dateTime = '',
  timeZone = 'local',
  locale = 'en-US'
): DateTime => {
  const isoDateTime = dateTime.replace(' ', 'T');

  return DateTime.fromISO(isoDateTime).setZone(timeZone).setLocale(locale);
};
