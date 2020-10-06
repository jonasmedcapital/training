function validateUserPassword(modal, saveBtn) {
  $('body').off('blur', '.form-valid-confirmation').on('blur', '.form-valid-confirmation', function () {
    params = {
      password: $('#passwordUserForm').val(),
      passwordConfirmation: $('#passwordConfirmationUserForm').val(),
      element: $(this)
    }
    doValidation(params);
  });

  $('body').off('focus', '.form-valid-confirmation').on('focus', '.form-valid-confirmation', function () {
    $(this).removeClass("valid-field")
    $(this).removeClass("invalid-field")
    $(this).siblings(".invalid-warning").each(function () {
      $(this).remove();
    });
    $(this).parents('.input-group').find('.input-group-validation').each(function () {
      $(this).remove();
    });
  });

  validPasswordInterval = setInterval(function () {
    len = modal.find('[is-valid="false"]').length
    if (len === 0) {
      saveBtn.prop('disabled', false);
    } else {
      saveBtn.prop('disabled', true);
    }
  }, 200);

  modal.on('hidden.bs.modal', function (e) {
    clearInterval(validPasswordInterval);
  });

  function doValidation(params) {
    validations = {
      password: params.password,
      password_confirmation: params.passwordConfirmation,
    }

    token = $('meta[name=csrf-token]').attr('content');
    url = '/validations/forms/validate_user_password';
    $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: {
        authenticity_token: token,
        validations: validations,
      },
      success: function (response) {
        params.element.parents('.form-valid-group').attr("is-valid", response.valid);
        if (response.valid) {
          // validField(params.element)
        } else {
          invalidField(params.element, response.message)
        }
      },
      error: function (response) {
        processingSnackbar("danger", "Favor preencher corretamente!", device);
      }
    });
  }

  function invalidField(element, message) {
    element.addClass("invalid-field");
    html = '<div class="invalid-warning my-1 py-1"></div>'
    element.parent().append(html);
    element.siblings(".invalid-warning").html(message);
  }

}