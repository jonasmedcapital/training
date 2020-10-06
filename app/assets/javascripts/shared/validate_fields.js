function validateFields(modal, saveBtn, mode) {

  oneParent = false
  $('body').off('blur', '.form-valid-control').on('blur', '.form-valid-control', function () {
    if ($(this).hasClass("hidden-output")) {
      value = $(".hidden-input").val()
      column = $(".hidden-input").attr("data-field")
    } else {
      value = $(this).val()
      column = $(this).data('obj-column')
    }
    params = {
      objClass: modal.data("obj-class"),
      objColumn: column,
      objValue: value,
      filterColumn: $(this).data("filter-column"),
      filterValue: $(this).data("filter-value"),
      associationColumn: $(this).data("association-column"),
      associationValue: $(this).data("association-value"),
      element: $(this)
    }
    oneParent = false
    doValidation(params);
  });

  $('body').off('click', '.custom-valid-control').on('click', '.custom-valid-control', function () {
    $(this).removeClass("valid-field")
    $(this).removeClass("invalid-field")
    $(this).parents('.form-valid-group').find('.invalid-warning').each(function () {
      $(this).remove();
    });
    if (this.checked) {
      value = true
    } else {
      value = false
    }
    params = {
      objClass: modal.data("obj-class"),
      objColumn: $(this).data('obj-column'),
      objValue: value,
      filterColumn: $(this).data("filter-column"),
      filterValue: $(this).data("filter-value"),
      associationColumn: $(this).data("association-column"),
      associationValue: $(this).data("association-value"),
      element: $(this)
    }
    oneParent = true
    doValidation(params);
  });

  $('body').off('focus', '.form-valid-control').on('focus', '.form-valid-control', function () {
    $(this).removeClass("valid-field")
    $(this).removeClass("invalid-field")
    $(this).siblings(".invalid-warning").each(function () {
      $(this).remove();
    });
    $(this).parents('.input-group').find('.input-group-validation').each(function () {
      $(this).remove();
    });
  });

  $('body').off('click', '.dropdown-valid-selector').on('click', '.dropdown-valid-selector', function () {
    $(this).off('show.bs.dropdown').on('show.bs.dropdown', function () {
      $(this).find('.form-control').removeClass("invalid-field")
      $(this).find(".invalid-warning").each(function () {
        $(this).remove();
      });
    });
    $(this).off('hide.bs.dropdown').on('hide.bs.dropdown', function () {
      if ($(this).val()) {
        $(this).parents('.form-valid-group').attr("is-valid", true);
        $(this).find('.form-control').removeClass("invalid-field")
        $(this).find('.form-control').siblings(".invalid-warning").each(function () {
          $(this).remove();
        });
      } else {
        $(this).parents('.form-valid-group').attr("is-valid", false);
        invalidField($(this).find('.form-control'), "Não pode ficar em branco")
      }
    });    
  });

  $('body').off('keydown', '.bind-output').on('keydown', '.bind-output', function () {
    bindInput = $('.bind-input')
    bindInput.siblings(".invalid-warning").each(function () {
      $(this).remove();
    });
    bindInput.removeClass("valid-field")
    bindInput.removeClass("invalid-field")
  });
  $('body').off('keyup', '.bind-output').on('keyup', '.bind-output', function () {
    value = $(this).val();
    bindInput = $('.bind-input')
    bindInput.focus();
    bindInput.val(fromStringToPath(value));
    bindInput.parents('.floating-label').addClass("has-value");
    bindInput.parents('.floating-label').addClass("is-focused");
    bindInput.blur();
    $(this).focus()
  });

  validValidationInterval = setInterval(function () {
    len = modal.find('[is-valid="false"]').length
    if (len === 0) {
      saveBtn.prop('disabled', false);
    } else {
      saveBtn.prop('disabled', true);
    }
  }, 200);

  modal.on('hidden.bs.modal', function (e) {
    clearInterval(validValidationInterval);
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
    if (oneParent) {
      element.parents(".form-valid-group").append(html);
      element.parents(".form-valid-group").find(".invalid-warning").first().html(message);
    } else {
      element.parent().append(html);
      element.siblings(".invalid-warning").html(message);
    }
  }

  function validField(element) {
    html = '<div class="input-group-append input-group-validation"><span class="input-group-icon"><i class="material-icons md-success md-sm">check</i></span></div>'
    element.parents('.input-group').append(html);
  }
}