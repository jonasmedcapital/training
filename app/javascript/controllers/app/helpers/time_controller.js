import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  doDurationFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + "hr " + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + "min " + (secs < 10 ? "0" : "");
    ret += "" + secs + "s";
    return ret;
  }

}