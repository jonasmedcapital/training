import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  fromStringToBoolean(string) {
    if (string === "true") {
      return true
    } else if (string === "false") {
      return false
    }
  }

  titleize(sentence) {
    if (!sentence.split) return sentence;
    var _titleizeWord = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
      result = [];
    sentence.split(" ").forEach(function (w) {
      result.push(_titleizeWord(w));
    });
    return result.join(" ");
  }

}