function floatingLabel() {
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