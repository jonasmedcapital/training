function changeStringToPath(element) {

  // filter what user type (only numbers and functional keys)
  function key_check(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var functional = false;

    // allow key chars, a to z
    if (code >= 48 && code <= 57) functional = true;
    if (code >= 97 && code <= 122) functional = true;

    // check Backspace, Tab, Enter, Delete, and left/right arrows
    // if (code == 8) functional = true;
    // if (code == 9) functional = true;
    // if (code == 13) functional = true;
    // if (code == 46) functional = true;
    // if (code == 37) functional = true;
    // if (code == 39) functional = true;
    if (code == 32) functional = true;


    return functional;

  }

  // element.keypress(function (e) {
  element.keypress(function (e) {
    v = $(this).val();
    vLength = v;
    functional = key_check(e);
    if (functional === true && vLength.length < 100) {
      value = $(this).val();
      value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      value = value.toLowerCase();
      $(this).val(value.replace(" ","-"));
    } else {
      e.preventDefault();
      e.stopPropagation();
      value = v;
      $(this).val(value);
    }

  });
  
}