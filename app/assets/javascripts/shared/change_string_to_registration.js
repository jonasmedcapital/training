function changeStringToRegistration(element) {

  // 4.14.01.54-9

  element.blur(function () {
    $(this).val(codeMask($(this).val()));
  });

  function codeMask(value) {
    v = value
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

  // element.focus(function () {
  //   $(this).val($(this).val().replace(/(\.|\/|\-)/g, ""));
  // });

  // filter what user type (only numbers and functional keys)
  function key_check(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var metaKey = e.metaKey;
    // var typed = String.fromCharCode(code);
    var functional = false;
    // var str = value;
    // var newValue = str + typed;

    // allow key numbers, 0 to 9
    // if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) functional = true;
    if (code >= 48 && code <= 57) functional = true;
    if (code == 192) functional = true;

    // allow key chars, a to z
    if (code >= 48 && code <= 57) functional = true;
    if (code >= 97 && code <= 122) functional = true;

    // check Backspace, Tab, Enter, Delete, and left/right arrows
    if (code == 8) functional = true;
    if (code == 9) functional = true;
    if (code == 13) functional = true;
    // if (code == 46) functional = true;
    if (code == 37) functional = true;
    if (code == 39) functional = true;
    // Minus Sign, Plus Sign
    //if ((code == 189 || code == 109 || code == 173)) functional = true;
    if ((code == 189 || code == 173)) functional = true;
    // if ((code == 187 || code == 107 || code == 61)) functional = true;
    if ((code == 187 || code == 61)) functional = true;
    //Allow Home, End, Shift, Caps Lock, Esc
    if (code >= 16 && code <= 20) functional = true;
    if (code == 27) functional = true;
    if (code >= 33 && code <= 40) functional = true;
    // if (code >= 44 && code <= 46) functional = true;

    // allow Ctrl shortcuts (copy, paste etc.)
    if (window.ctrl_down || metaKey) {
      if (code == 86) functional = true; // v: paste
      if (code == 67) functional = true; // c: copy
      if (code == 88) functional = true; // x: cut
      if (code == 82) functional = true; // r: reload
      if (code == 84) functional = true; // t: new tab
      if (code == 76) functional = true; // l: URL bar
      if (code == 87) functional = true; // w: close window/tab
      if (code == 81) functional = true; // q: quit
      if (code == 78) functional = true; // n: new window/tab
      if (code == 65) functional = true; // a: select all
    }

    return functional;

  }

  // function onlyNumber(e) {
  //   // Allow: backspace, delete, tab, escape, enter and .
  //   if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
  //     // Allow: Ctrl+A, Command+A
  //     (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
  //     // Allow: home, end, left, right, down, up
  //     (e.keyCode >= 35 && e.keyCode <= 40)) {
  //     // let it happen, don't do anything
  //     return;
  //   }
  //   // Ensure that it is a number and stop the keypress
  //   if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
  //     e.preventDefault();
  //   }
  // }

  // element.keypress(function (e) {
  element.keypress(function (e) {

    // onlyNumber(e);
    v = $(this).val()
    vLength = fromRegistrationToString(v);
    functional = key_check(e);
    if (functional === true && vLength.length < 10) {
      value = codeMask(v);
      $(this).val(value);
    } else {
      e.preventDefault();
      e.stopPropagation();
      // value = v;
      //$(this).val(value);
    }
  });

}