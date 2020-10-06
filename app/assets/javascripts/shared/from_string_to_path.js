function fromStringToPath(value) {

  path = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  path = path.toLowerCase();
  var path = path.replace(/ /gi, "-");
  return path

  

}