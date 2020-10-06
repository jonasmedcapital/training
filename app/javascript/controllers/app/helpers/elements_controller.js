import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  tooltip() {
    $('[data-toggle="tooltip"]').mouseover(function () {
      $(this).tooltip('show');
    });

    $('[data-toggle="tooltip"]').mouseout(function () {
      $(this).tooltip('hide');
    });
  }

  untooltip() {
    $('[data-toggle="tooltip"]').mouseover(function () {
      $(this).tooltip('hide');
    });

    $('[data-toggle="tooltip"]').each(function () {
      $(this).tooltip('hide');
    });

    $('[role="tooltip"]').each(function () {
      $(this).tooltip('hide');
    });
  }

  doMainContentHeight(element) {
    element.style.height = $(window).height() + `px`
  }

}