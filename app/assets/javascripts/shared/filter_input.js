function filterInput() {

  next = -1
  current = -1
  $('body').keyup(function (e) {
    if (e.keyCode === 27) { $('.ul-filter').addClass("d-none") }   // esc
    
    // if (e.keyCode === 40 || e.keyCode === 38) {
    //   li = $('body').find(".li-filter.filter-row")
    //   liFiltereds = []
    //   for (let i = 0; i < li.length + 1; i++) {
    //     liFiltereds[liFiltereds.length] = i
    //   }
    //   if (e.keyCode === 40) {
    //     if (liFiltereds.includes(next + 1)) {
    //       next += 1
    //       li[next].classList.add("li-filtered")
    //       current = next - 1
    //       if (liFiltereds.includes(current)) {
    //         li[current].classList.remove("li-filtered")
    //       }
    //     } else {
    //       next = 0
    //       current = 0
    //     }
    //   } else if (e.keyCode === 38) {
    //     if (liFiltereds.includes(next - 1)) {
    //       current = next
    //       next -= 1
    //     } else {
    //       next = 0
    //       current = 0
    //     } 
    //   }
    // }
  });

  $('body').off('click', '.previousTablePage').on('click', '.previousTablePage', function () {
    if (numberPages.includes(pageNumber - 1)) {
      pageNumber -= 1
      doDataTable(pages[pageNumber], pageNumber)
    }
  });

  $('body').off('mousedown', '.li-filter').on('mousedown', '.li-filter', function (e) {
    e.preventDefault();
    $(this).dblclick();
  });


  $('body').off('focus', '.input-filter').on('focus', '.input-filter', function () {
    inputValue = $(this).val()
    ul = $(this).siblings('.ul-filter')
    input = $(this)
    filterMode = input.attr("filter-mode")
    if (inputValue.length > 2) {
      if (filterMode == "simple") {
        filterListSimple(input, ul)
      } else {
        filterListComplete(input, ul)
      }
      $(this).siblings('.ul-filter').removeClass("d-none")
    } else {
      $(this).siblings('.ul-filter').addClass("d-none")
    }
  });

  $('body').off('keyup', '.input-filter').on('keyup', '.input-filter', function () {
    inputValue = $(this).val()
    ul = $(this).siblings('.ul-filter')
    input = $(this)
    filterMode = input.attr("filter-mode")
    if (inputValue.length > 2) {
      if (filterMode == "simple") {
        filterListSimple(input, ul)
      } else {
        filterListComplete(input, ul)
      }
      $(this).siblings('.ul-filter').removeClass("d-none")
    } else {
      $(this).siblings('.ul-filter').addClass("d-none")
    }

    next = -1
    current = -1
    $('body').find('.li-filter').each(function () {
      $(this).removeClass("li-filtered");
    });
  });

  $('body').off('blur', '.input-filter').on('blur', '.input-filter', function () {
    $(this).siblings('.ul-filter').addClass("d-none")
  });

  $('body').off('click', '.li-filter').on('click', '.li-filter', function (event) {
    event.stopPropagation();

    $(this).parents(".floating-label").addClass("has-value");
    dataAttributes = $(this).data()
    valueSelector = $(this)[0].innerText
    filteredInput = $(this).parents(".form-group").find(".input-filter");
    filteredInput.val(valueSelector);

    $('body').find('.li-filter').each(function () {
      $(this).removeClass("li-filtered");
    });
    $(this).addClass("li-filtered");
    filteredInput.html(valueSelector);
    for (x in dataAttributes) {
      filteredInput.data("data-" + x, dataAttributes[x])
    }
    $(this).parents(".filter-list").addClass("d-none");
  });


  function filterListSimple(input, ul) {
    // testar includes ao inves da sequencial de string
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    filter = input.val().toUpperCase();
    filterUnaccent = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    li = ul.children();

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {      
      show = false;
      txtValue = li[i].textContent || li[i].innerText;
      txtValueUnaccent = txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValueUnaccent.toUpperCase().indexOf(filterUnaccent) > -1)) {
        show = true;
      }
      if (show == true) {
        li[i].style.display = "";
        li[i].classList.add("filter-row")
      } else {
        li[i].style.display = "none";
        li[i].classList.remove("filter-row")
      }
    }
  }

  function filterListComplete(input, ul) {
    // testar includes ao inves da sequencial de string
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    filter = input.val().toUpperCase();
    filterUnaccent = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    filter = filter.split(" ")
    filterUnaccent = filterUnaccent.split(" ")
    li = ul.children();

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      show = false;
      txtValue = li[i].textContent || li[i].innerText;
      txtValueUnaccent = txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      filter.forEach(function (w) {
        if (txtValue.toUpperCase().split(" ").includes(w) || txtValueUnaccent.toUpperCase().split(" ").includes(w.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          // if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValueUnaccent.toUpperCase().indexOf(filterUnaccent) > -1)) {
          show = true;
        }
      });
      
      if (show == true) {
        li[i].style.display = "";
        li[i].classList.add("filter-row")
      } else {
        li[i].style.display = "none";
        li[i].classList.remove("filter-row")
      }
    }
  }

  // if (numberPages.includes(pageNumber - 1)) {
  //   pageNumber -= 1
  //   doDataTable(pages[pageNumber], pageNumber)
  // }


}