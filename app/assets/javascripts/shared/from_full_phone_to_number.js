function fromFullPhoneToNumber(value) {
  return value.replace("-", "").replace(" ", "").replace(" ", "").replace("(", "").replace(")", "");
}