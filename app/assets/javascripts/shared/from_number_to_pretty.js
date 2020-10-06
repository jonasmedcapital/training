function fromNumberToPretty(element) {
  
  var elementPretty = element.priceFormat({
    prefix: '',
    centsLimit: 0,
    thousandsSeparator: '.',
  });

  return elementPretty
}