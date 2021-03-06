function fromNumberToCnpj(value) {

  value = fromCnpjToNumber(value);
  if (value.length === 0) {
    return value;
  } else if (value.length === 1) {
    return value;
  } else if (value.length === 2) {
    return value.replace(/(\d{2})/g, "\$1.");
  } else if (value.length === 3) {
    return value.replace(/(\d{2})/g, "\$1.");
  } else if (value.length === 4) {
    return value.replace(/(\d{2})(\d{2})/g, "\$1.\$2");
  } else if (value.length === 5) {
    return value.replace(/(\d{2})(\d{3})/g, "\$1.\$2.");
  } else if (value.length === 6) {
    return value.replace(/(\d{2})(\d{3})/g, "\$1.\$2.");
  } else if (value.length === 7) {
    return value.replace(/(\d{2})(\d{3})/g, "\$1.\$2.");
  } else if (value.length === 8) {
    return value.replace(/(\d{2})(\d{3})(\d{3})/g, "\$1.\$2.\$3/");
  } else if (value.length === 9) {
    return value.replace(/(\d{2})(\d{3})(\d{3})/g, "\$1.\$2.\$3/");
  } else if (value.length === 10) {
    return value.replace(/(\d{2})(\d{3})(\d{3})/g, "\$1.\$2.\$3/");
  } else if (value.length === 11) {
    return value.replace(/(\d{2})(\d{3})(\d{3})/g, "\$1.\$2.\$3/");
  } else if (value.length === 12) {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/g, "\$1.\$2.\$3\/\$4\-");
  } else if (value.length === 13) {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/g, "\$1.\$2.\$3\/\$4\-");
  } else if (value.length === 14) {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
  }
  
  // return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
  return value

}

