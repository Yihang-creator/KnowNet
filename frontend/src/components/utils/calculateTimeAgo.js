export const calculateTimeAgo = (timestamp) => {
    if (timestamp === null || timestamp === undefined) {
        return '';
    }
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const elapsed = currentTime - postTime;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 12 * month;

    if (elapsed < minute) {
      return 'Posted just now';
    } else if (elapsed < hour) {
      const minutesAgo = Math.floor(elapsed / minute);
      return `Posted ${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
    } else if (elapsed < day) {
      const hoursAgo = Math.floor(elapsed / hour);
      return `Posted ${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    } else if (elapsed < month) {
      const daysAgo = Math.floor(elapsed / day);
      return `Posted ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    } else if (elapsed < year) {
      const monthsAgo = Math.floor(elapsed / month);
      return `Posted ${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
    } else {
      const yearsAgo = Math.floor(elapsed / year);
      return `Posted ${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
    }
  };