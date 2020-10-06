function validate(id, filter, field, fieldClass, value, feedbackValid, feedbackInvalid, messageValid, messageInvalid) {

  validation = {
    id: id,
    filter: filter,
    field: field,
    field_class: fieldClass,
    value: value
  }

  token = $('meta[name=csrf-token]').attr('content');
  url = '/validations/forms/validate';
  $.ajax({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: {
      authenticity_token: token,
      validations: validation,
    },
    success: function (response) {
      if (response.valid) {
        feedbackValid.show();
        feedbackValid.parents('.form-group').attr("is-valid", response.valid);
        messageValid.html(response.message);
      } else {
        feedbackInvalid.show();
        feedbackInvalid.parents('.form-group').attr("is-valid", response.valid);
        messageInvalid.html(response.message);
      }
    },
    error: function (response) {
      processingSnackbar("danger", "Favor preencher corretamente!", device);
    }
  });  
}