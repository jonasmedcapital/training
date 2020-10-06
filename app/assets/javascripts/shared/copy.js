function copy() {
  $('body').off('click', '.copy').on('click', '.copy', function () {
    itemValue = $(this).parent().attr("data-copy");
    var $temp = $('<input id="inputCopyElement">');
    $("body").append($temp);
    $temp.val(itemValue).select();
    document.execCommand("copy");
    $temp.remove();
    var tooltip = $('[role="tooltip"]');
    tooltip["0"].innerText = "Copiado!";
  });
}