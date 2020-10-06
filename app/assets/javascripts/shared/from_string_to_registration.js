function fromStringToRegistration(value) {

  value = fromRegistrationToString(value);
  value = value.toUpperCase()
  if (value.length === 0) {
    return value;
  } else if (value.length === 1) {
    return value;
    // return value.replace(/(\d{1})/g, "\$1.");
  } else if (value.length === 2) {
    return value;
    // return value.replace(/(\d{1})(\d{1})/g, "\$1.\$2");
  } else if (value.length === 3) {
    return value;
  } else if (value.length === 4) {
    return value.replace(/(\w{4})/g, "\$1\-");
  } else if (value.length === 5) {
    return value.replace(/(\w{4})(\w{1})/g, "\$1\-\$2");
  } else if (value.length === 6) {
    return value.replace(/(\w{4})(\w{2})/g, "\$1\-\$2\-");
  } else if (value.length === 7) {
    return value.replace(/(\w{4})(\w{2})(\w{1})/g, "\$1\-\$2\-\$3");
  } else if (value.length === 8) {
    return value.replace(/(\w{4})(\w{2})(\w{2})/g, "\$1\-\$2\-\$3");
  } else if (value.length === 9) {
    return value.replace(/(\w{4})(\w{2})(\w{3})/g, "\$1\-\$2\-\$3");
  } else if (value.length === 10) {
    return value.replace(/(\w{4})(\w{2})(\w{4})/g, "\$1\-\$2\-\$3");
  }
  return value
  
}