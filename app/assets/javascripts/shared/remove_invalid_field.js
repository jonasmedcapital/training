function removeInvalidField(element) {
  

  element.removeClass("valid-field")
  element.removeClass("invalid-field")
  element.siblings(".invalid-warning").each(function () {
    $(this).remove();
  });
  element.parents('.input-group').find('.input-group-validation').each(function () {
    $(this).remove();
  });

}