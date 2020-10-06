function changeStringToQuery(element) {

  // filter what user type (only numbers and functional keys)
  function key_check(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var functional = false;

    // allow key chars, a to z
    if (code >= 48 && code <= 57) functional = true; // numbers
    if (code == 45) functional = true; // minus operator
    if (code >= 65 && code <= 90) functional = true; // upcase
    if (code >= 97 && code <= 122) functional = true; // lowercase

    if (code == 222) functional = true; // cedilla
    if (code == 192) functional = true; // back
    if (code == 0) functional = true; // mobile
    if (code == 8) functional = true; // backspace

    // check Backspace, Tab, Enter, Shift, Delete, and left/right arrows
    // if (code == 8) functional = true;
    // if (code == 9) functional = true;
    if (code == 13) functional = true; // enter
    if (code == 16) functional = true; // shift
    // if (code == 46) functional = true;
    // if (code == 37) functional = true;
    // if (code == 39) functional = true;
    if (code == 32) functional = true;


    return functional;

  }

  // element.keypress(function (e) {
  element.keydown(function (e) {
    v = $(this).val();
    vLength = v;
    functional = key_check(e);
    if (functional === true && vLength.length < 100) {
      value = $(this).val();
    } else {
      e.preventDefault();
      e.stopPropagation();
      value = v;
      $(this).val(value);
    }

  });

}