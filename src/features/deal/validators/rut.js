import { validate } from 'rut.js';

export const format = function(value) {
  return validate(value);
};

export default format;