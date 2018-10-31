export const convertApiDate = dateObject => {
  if (!dateObject) return '';
  let month = dateObject.getUTCMonth() + 1;
  if (month < 10) month = `0${month}`;
  let date = dateObject.getUTCDate();
  if (date < 10) date = `0${date}`;
  let hours = dateObject.getUTCHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = dateObject.getUTCMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let seconds = dateObject.getUTCSeconds();
  if (seconds < 10) seconds = `0${seconds}`;
  return `${dateObject.getUTCFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export const getScheduleDate = calcDays => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + calcDays || 0,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds(),
  );
};

export const getTimezone = () => {
  const now = new Date();
  let timezoneOffset = now.getTimezoneOffset() / -60;
  if (timezoneOffset < 10) timezoneOffset = `0${timezoneOffset}`;
  return `UTC${timezoneOffset}:00`;
};

export const convertBirthdate = dateObject => {
  if (!dateObject) return '';
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  return `${year}年${month}月${date}日`;
};

export const calcAge = dateObject => {
  if (!dateObject) return '';
  const now = new Date();
  const birthday = new Date(
    now.getFullYear(),
    dateObject.getMonth(),
    dateObject.getDate(),
  );
  const age = now.getFullYear() - dateObject.getFullYear();
  if (now < birthday) {
    return age - 1;
  }
  return age;
};
