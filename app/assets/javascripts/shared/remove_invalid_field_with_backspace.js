function removeInvalidFieldWithBackspace() {

  $('input').keydown(function (e) {

    var code = (e.keyCode ? e.keyCode : e.which);

    if (code == 8 || code == 46) {
      $(this).removeClass("valid-field")
      $(this).removeClass("invalid-field")
      $(this).siblings(".invalid-warning").each(function () {
        $(this).remove();
      });
      $(this).parents('.input-group').find('.input-group-validation').each(function () {
        $(this).remove();
      });
    }

  })

}