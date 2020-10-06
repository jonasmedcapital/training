function fromNumberToPhone(value) {

  value = fromPhoneToNumber(value);
  if (value.length === 0) {
    return value;
  } else if (value.length === 1) {
    return value;
  } else if (value.length === 2) {
    return value;
  } else if (value.length === 3) {
    return value;
  } else if (value.length === 4) {
    return value.replace(/(\d{4})(\d{0})/g, "\$1-\$2");
  } else if (value.length === 5) {
    return value.replace(/(\d{4})(\d{1})/g, "\$1-\$2");
  } else if (value.length === 6) {
    return value.replace(/(\d{4})(\d{2})/g, "\$1-\$2");
  } else if (value.length === 7) {
    return value.replace(/(\d{4})(\d{2})/g, "\$1-\$2");
  } else if (value.length === 8) {
    // return value.replace(/(\d{1})(\d{4})(\d{2})/g, "\$1 \$2-\$3");
    return value.replace(/(\d{4})(\d{2})/g, "\$1-\$2");
  } else {
    return value.replace(/(\d{1})(\d{4})(\d{2})/g, "\$1 \$2-\$3");
  }
}