function itemRow(rowClass) {
  $(rowClass).hover(function () {
    $(this).addClass("bg-white mb-3 p-3 rounded shadow-1");
  }, function () {
    $(this).removeClass("bg-white mb-3 p-3 rounded shadow-1");
  });
}