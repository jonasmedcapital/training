function fromCurrencyToNumber(element) {
  var number = (Number(element.replace("R$ ", "").replace(".", "").replace(",", ".")))
  return number
}