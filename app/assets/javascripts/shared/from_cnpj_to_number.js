function fromCnpjToNumber(value) {
  return value.replace(".", "").replace(".", "").replace("-", "").replace("/", "");
}