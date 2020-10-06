function fromNumberToPercentage(number) {
  percentage = number.priceFormat({
    prefix: '',
    suffix: ' %',
    centsSeparator: ',',
    thousandsSeparator: '.'
  });
  return percentage

  // value = value.toString();
  // if (value.length === 0) {
  //   value = value;
  // } else if (value.length === 1) {
  //   value = value;
  // } else if (value.length === 2) {
  //   value = value;
  // } else if (value.length === 3) {
  //   value = value;
  // } else if (value.length === 4) {
  //   value = value.replace(/(\d{2})(\d{2})/g, "\$1,\$2");
  // } else if (value.length === 5) {
  //   value = value.replace(/(\d{2})(\d{3})/g, "\$1.\$2");
  // } else if (value.length === 6) {
  //   value = value.replace(/(\d{3})(\d{3})/g, "\$1.\$2");
  // } else if (value.length === 7) {
  //   value = value.replace(/(\d{3})(\d{3})/g, "\$1.\$2");
  // } else if (value.length === 8) {
  //   value = value.replace(/(\d{3})(\d{3})/g, "\$1.\$2");
  // } else if (value.length === 9) {
  //   value = value.replace(/(\d{3})(\d{3})(\d{3})/g, "\$1.\$2.\$3\-");
  // } else if (value.length === 10) {
  //   value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/g, "\$1.\$2.\$3\-\$4");
  // } else if (value.length === 11) {
  //   value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
  // } else {
  //   value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
  // }
  // return value + " %"

}