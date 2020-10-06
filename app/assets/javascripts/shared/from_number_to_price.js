function fromNumberToPrice(number) {
  var price = number.priceFormat({
    prefix: 'R$ ',
    centsSeparator: ',',
    thousandsSeparator: '.',  
  });
  return price
};
