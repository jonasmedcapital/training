function validateLeadForm(id, filter, field, fieldClass, value, feedbackValid, feedbackInvalid, messageValid, messageInvalid) {

  validations = {
    id: id,
    filter: filter,
    field: field,
    field_class: fieldClass,
    value: value
  }

  // validations = {
  //   filter_value: id,
  //   filter_column: filter,
  //   obj_column: field,
  //   obj_class: fieldClass,
  //   obj_value: value
  // }

  $('body').off('focus', '.form-control').on('focus', '.form-control', function () {
    $(this).removeClass("valid-field")
    $(this).removeClass("invalid-field")
    $(this).siblings(".invalid-warning").each(function () {
      $(this).remove();
    });
    $(this).parents('.input-group').find('.input-group-validation').each(function () {
      $(this).remove();
    });
  });

  token = $('meta[name=csrf-token]').attr('content');
  // url = '/validations/forms/validate_lead';
  url = '/validations/forms/validate';
  
  $.ajax({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: {
      authenticity_token: token,
      validations: validations,
    },
    success: function (response) {
      
      if (response.valid) {
        feedbackValid.parents('.form-group').attr("is-valid", response.valid);
      } else {
        // feedbackInvalid.show();
        // feedbackInvalid.parents('.form-group').attr("is-valid", response.valid);
        // messageInvalid.html(response.message);
        invalidField(feedbackValid.parents('.form-group').find('.form-control'), response.message)
      }
    },
    error: function (response) {
      // alert("Opss... a página será recarregada!");
      processingSnackbar("danger", "Opss... a página será recarregada!", device);
      path = window.location.origin + window.location.pathname
      // window.open(path, "_self")
      // window.location.reload();
    }
  });

  function invalidField(element, message) {
    element.addClass("invalid-field");
    html = '<div class="invalid-warning my-1 py-1"></div>'
    element.parent().append(html);
    element.siblings(".invalid-warning").html(message);
  }
}