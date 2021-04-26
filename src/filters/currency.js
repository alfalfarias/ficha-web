const currency = function (value) {
  if (!value && value != 0) return '';
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(value);
};

export default currency;