function fromPrettyToNumber(element) {
  if (element.length > 8) {
    var number = Number(element.replace(".", "").replace(".", ""));
  } else {
    var number = Number(element.replace(".", ""));
  }
  return number
};