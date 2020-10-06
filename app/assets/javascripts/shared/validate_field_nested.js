function validateFieldNested(value, element, modal) {
  params = {
    objClass: modal.data("obj-nested-class"),
    objColumn: element.data('obj-column'),
    objValue: value,
    filterColumn: element.data("filter-column"),
    filterValue: element.data("filter-value"),
    associationColumn: element.data("association-column"),
    associationValue: element.data("association-value"),
  }

  doValidation(params);

  $('body').off('focus', '.form-valid-nested-value').on('focus', '.form-valid-nested-value', function () {
    $(this).removeClass("valid-field")
    $(this).removeClass("invalid-field")
    $(this).siblings(".invalid-warning").each(function () {
      $(this).remove();
    });
    $(this).parents('.input-group').find('.input-group-validation').each(function () {
      $(this).remove();
    });
  });

  function doValidation(params) {
    validations = {
      obj_class: params.objClass,
      obj_column: params.objColumn,
      obj_value: params.objValue,
      filter_column: params.filterColumn,
      filter_value: params.filterValue,
      association_column: params.associationColumn,
      association_value: params.associationValue
    }

    token = $('meta[name=csrf-token]').attr('content');
    url = '/validations/forms/validate_field';
    $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: {
        authenticity_token: token,
        validations: validations,
      },
      success: function (response) {
        element.parents('.form-valid-group').attr("is-valid", response.valid);
        if (response.valid) {
        } else {
          invalidField(element, response.message)
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
    element.attr("input-error", true)
  }

  function validField(element) {
    html = '<div class="input-group-append input-group-validation"><span class="input-group-icon"><i class="material-icons md-success md-sm">check</i></span></div>'
    element.parents('.input-group').append(html);
  }

}