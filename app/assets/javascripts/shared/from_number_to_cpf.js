function fromNumberToCpf(value) {

  value = fromCpfToNumber(value);

  if (value.length === 0) {
    return value;
  } else if (value.length === 1) {
    return value;
  } else if (value.length === 2) {
    return value;
  } else if (value.length === 3) {
    return value.replace(/(\d{3})/g, "\$1.");
  } else if (value.length === 4) {
    return value.replace(/(\d{3})/g, "\$1.");
  } else if (value.length === 5) {
    return value.replace(/(\d{3})/g, "\$1.");
  } else if (value.length === 6) {
    return value.replace(/(\d{3})(\d{3})/g, "\$1.\$2.");
  } else if (value.length === 7) {
    return value.replace(/(\d{3})(\d{3})/g, "\$1.\$2.");
  } else if (value.length === 8) {
    return value.replace(/(\d{3})(\d{3})/g, "\$1.\$2.");
  } else if (value.length === 9) {
    return value.replace(/(\d{3})(\d{3})(\d{3})/g, "\$1.\$2.\$3\-");
  } else if (value.length === 10) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/g, "\$1.\$2.\$3\-\$4");
  } else if (value.length === 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
  } else {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
  }
}
