import * as moment from 'moment';

export const humantime = function(value) {
  let datetime = value;
  let humanize = moment(datetime).locale('es').fromNow();
  return humanize;
};

export const parse = function (value, format) {
  let datetime = value;
  let parse = moment(datetime).locale('es').format(format);
  return parse;
};

export default {
  humantime,
  parse,
};