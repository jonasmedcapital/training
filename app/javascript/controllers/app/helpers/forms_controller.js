import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  floatingLabel() {
    // $('.floating-label .form-control').floatinglabel();

    $('.floating-label .form-control').each(function () {
      if (($(this).val() === "") || $(this).val() === null) {
        $(this).parents('.floating-label').removeClass("has-value");
      } else {
        $(this).parents('.floating-label').addClass("has-value");
      }
    });

    $('.floating-label .trix-content').each(function () {
      if (($(this).val().length === 0) && $(this).html().length === 0) {
        $(this).parents('.floating-label').removeClass("has-value");
      } else {
        $(this).parents('.floating-label').addClass("has-value");
      }
    });

    $('.floating-label .dropdown-selector').each(function () {
      if (($(this).val() === "") || $(this).val() === null) {
        $(this).parents('.floating-label').removeClass("has-value");
      } else {
        $(this).parents('.floating-label').addClass("has-value");
      }
    });

    $('.floating-label .custom-select').each(function () {
      if (($(this).val() === "") || $(this).val() === null) {
        $(this).parents('.floating-label').removeClass("has-value");
      } else {
        $(this).parents('.floating-label').addClass("has-value");
      }
    });
  }

}