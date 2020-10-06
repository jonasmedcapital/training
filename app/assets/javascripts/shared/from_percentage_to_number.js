function fromPercentageToNumber(element) {
  var number = (Number(element.replace(" %", "").replace(".", "").replace(",", ".")) / 100).toFixed(4);
  return number
}