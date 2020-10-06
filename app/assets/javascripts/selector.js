function selector() {

  multiple = false;
  dataArray = []
  valueSelectorArray = []

  $('body').off('click', '.dropdown-selector').on('click', '.dropdown-selector', function () {
    if (($('.modal').length > 0)) {
      height = $(this).parents('.modal').height()
      // $(this).find('.dropdown-menu-selector').css('height', height * 0.3);
    }
  
    if ($(this).hasClass("multiple")) {
      multiple = true
    }
  })

  $('body').off('click', '.li-selector').on('click', '.li-selector', function () {
    $(this).parents(".floating-label").addClass("has-value");
    $(this).parents(".dropdown-selector").find('.form-control').addClass("d-flex");
    $(this).parents(".dropdown-selector").find('.form-control').find('.dropdown-toggle').css("width", "none");
    dataAttributes = $(this).data()
    valueSelector = $(this)[0].innerText
    selectedItemTag = $(this).parents(".dropdown-selector").find(".selected-item");
    $(this).parents(".dropdown-selector").val(valueSelector);
    // $(this).parents(".dropdown-selector").find('select').html('<option value="' + valueSelector + '"></option>');
    $(this).parents(".dropdown-selector").data("data-change", true);
    if (multiple) {
      if ($(this).hasClass("li-selected")) {
        $(this).removeClass("li-selected");
        valueSelectorArray.splice(valueSelectorArray.indexOf(valueSelector), 1)
        for (x in dataAttributes) {
          dataArray.splice(dataArray.indexOf(dataAttributes[x]), 1)
        }
      } else {
        $(this).addClass("li-selected");
        valueSelectorArray[valueSelectorArray.length] = valueSelector
        for (x in dataAttributes) {
          dataArray[dataArray.length] = dataAttributes[x]
        }
      }
      selectedItemTag.html(valueSelectorArray.join(", "));
      selectedItemTag.data("data-" + x, dataArray)
      selectedItemTag.attr("data-" + x, dataArray)
    } else {

      $('body').find('.li-selector').each(function () {
        $(this).removeClass("li-selected");
      });
      $(this).addClass("li-selected");
      selectedItemTag.html(valueSelector);
      for (x in dataAttributes) {
        selectedItemTag.data("data-" + x, dataAttributes[x])
        selectedItemTag.attr("data-" + x, dataAttributes[x])
      }
    }
  });

  $(".dropdown-search-input").on("keyup", function () {
    value = $(this).val().toLowerCase();
    valueUnaccent = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    $(this).parents(".dropdown-menu-selector").find('.ul-select li').filter(function () {
      txtValue = $(this).text()
      txtValueUnaccent = txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      $(this).toggle((txtValue.toLowerCase().indexOf(value) > -1) || txtValueUnaccent.toLowerCase().indexOf(valueUnaccent) > -1)
    });
  });

  $('.dropdown-selector').on('hidden.bs.dropdown', function () {
    $(this).find('.dropdown-search-input').val("");
    $(this).find('.ul-select li').each(function () {
      $(this).toggle(true);
    });

    if ($(this).find('.selected-item').html() == "") {
      $(this).parents(".floating-label").removeClass("has-value");
    } else {
      $(this).parents(".floating-label").addClass("has-value");
    }
  });

  $('body').off('keyup', '.dropdown-selector').on('keyup', '.dropdown-selector', function (e) {
    if (e.keyCode === 27) {
      e.preventDefault();
      $(".dropdown-selector").removeClass('show');
      $(".dropdown-menu-selector").removeClass('show');
    }
  });
}