
const OneDayMillSeconds = 24 * 60 * 60 * 1000;

function getAfterNDayDate(time, n) {
  const afterDayDate = new Date(new Date(time).getTime() + OneDayMillSeconds * n);
  return formatDate(afterDayDate);
}

function getBeforeNDayDate(time, n) {
  const beforeDayDate = new Date(new Date(time).getTime() - OneDayMillSeconds * n);
  return formatDate(beforeDayDate);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

module.exports = { formatDate, getAfterNDayDate, getBeforeNDayDate };
