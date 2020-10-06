function searchTable() {

  $('body').on('keyup', '.input-search-table', function () {
    var input = $(this);
    var filter = input.val().toUpperCase();
    
    var filterUnaccent = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    var table = $(this).parents('.card').find('.table-search');
    var tr = table.find('tr');
    for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      show = false;
      for (x = 0; x < td.length; x++) {
        if (td[x]) {
          txtValue = td[x].textContent || td[x].innerText;
          txtValueUnaccent = txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValueUnaccent.toUpperCase().indexOf(filterUnaccent) > -1)) {
            show = true;
          }
        }
      }
      if (show == true) {
        tr[i].style.display = "";
        tr[i].classList.add("filter-row")
      } else {
        tr[i].style.display = "none";
        tr[i].classList.remove("filter-row")
      }
    }
  });

}