import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  fromNumberToPretty(element) {
    var elementPretty = element.priceFormat({
      prefix: '',
      centsLimit: 0,
      thousandsSeparator: '.',
    });

    return elementPretty
  }

  fromCpfToNumber(value) {
    return value.replace(".", "").replace(".", "").replace("-", "");
  }

  changeNumberToCpf(ev) {
    if (ev.type == "keypress") {
      var v = ev.target.value
      var vLength = v.replace(".", "").replace(".", "").replace("-", "");
      var functional = this.filterKeyCheck(ev);

      if (functional === true && vLength.length < 11) {
        var value = this.cpfMask(ev.target.value)
        ev.target.value = value
      } else {
        ev.preventDefault()
        ev.stopPropagation()
        ev.target.value = v
      }
    } else if (ev.type == "blur") {
      ev.target.value = this.cpfMask(ev.target.value)
    }
  }






  cpfMask(value) {
    value = this.fromCpfToNumber(value);
    if (value.length === 0) {
      return value;
    } else if (value.length === 1) {
      return value;
    } else if (value.length === 2) {
      return value;
    } else if (value.length === 3) {
      return value.replace(/(\d{3})/g, "\$1.");
    } else if (value.length === 4) {
      return value.replace(/(\d{3})/g, "\$1.");
    } else if (value.length === 5) {
      return value.replace(/(\d{3})/g, "\$1.");
    } else if (value.length === 6) {
      return value.replace(/(\d{3})(\d{3})/g, "\$1.\$2.");
    } else if (value.length === 7) {
      return value.replace(/(\d{3})(\d{3})/g, "\$1.\$2.");
    } else if (value.length === 8) {
      return value.replace(/(\d{3})(\d{3})/g, "\$1.\$2.");
    } else if (value.length === 9) {
      return value.replace(/(\d{3})(\d{3})(\d{3})/g, "\$1.\$2.\$3\-");
    } else if (value.length === 10) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/g, "\$1.\$2.\$3\-\$4");
    } else if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    }
    return value
  }



  filterKeyCheck(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var metaKey = e.metaKey;
    var functional = false;

    // allow key numbers, 0 to 9
    // if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) functional = true;
    if (code >= 48 && code <= 57) functional = true;
    if (code == 192) functional = true;

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

}