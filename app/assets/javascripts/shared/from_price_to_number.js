function fromPriceToNumber(element) {
  if (element.length > 13) {
    var number = Number(element.replace("R$ ", "").replace(".", "").replace(".", "").replace(",", "."));
  } else {
    var number = Number(element.replace("R$ ", "").replace(".", "").replace(",", "."));
  }
  return number
};