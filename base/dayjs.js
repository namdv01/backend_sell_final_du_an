const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.getDate = (date = dayjs()) => dayjs(date).tz('Asia/Bangkok');

module.exports = dayjs;