function fromNumberToCurrency(value) {
  // var price = number.priceFormat({
  //   prefix: '',
  //   centsLimit: 0,
  //   thousandsSeparator: '.',
  // });


  value = value.replace(".", ",")
  valueInt = value.split(",")[0]
  valueDec = value.split(",")[1]

  if (valueInt.length === 0) {
    valueInt = valueInt;
  } else if (valueInt.length === 1) {
    valueInt = valueInt;
  } else if (valueInt.length === 2) {
    valueInt = valueInt;
  } else if (valueInt.length === 3) {
    valueInt = valueInt;
  } else if (valueInt.length === 4) {
    valueInt = valueInt.replace(/(\d{1})(\d{3})/g, "\$1.\$2");
  } else if (valueInt.length === 5) {
    valueInt = valueInt.replace(/(\d{2})(\d{3})/g, "\$1.\$2");
  } else if (valueInt.length === 6) {
    valueInt = valueInt.replace(/(\d{3})(\d{3})/g, "\$1.\$2");
  } else if (valueInt.length === 7) {
    valueInt = valueInt.replace(/(\d{3})(\d{3})/g, "\$1.\$2");
  } else if (valueInt.length === 8) {
    valueInt = valueInt.replace(/(\d{3})(\d{3})/g, "\$1.\$2");
  } else if (valueInt.length === 9) {
    valueInt = valueInt.replace(/(\d{3})(\d{3})(\d{3})/g, "\$1.\$2.\$3\-");
  } else if (valueInt.length === 10) {
    valueInt = valueInt.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/g, "\$1.\$2.\$3\-\$4");
  } else if (valueInt.length === 11) {
    valueInt = valueInt.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
  } else {
    valueInt = valueInt.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
  }

  if (valueDec === undefined) {
    valueDec = "00"
  } else if (valueDec.length === 1) {
    valueDec = valueDec + "0"
  }
  return "R$ " + valueInt + "," + valueDec
  
};