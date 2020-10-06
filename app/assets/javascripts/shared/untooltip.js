function untooltip() {
  $('[data-toggle="tooltip"]').mouseover(function () {
    $(this).tooltip('hide');
  });

  $('[data-toggle="tooltip"]').each(function () {
    $(this).tooltip('hide');
  });

  $('[role="tooltip"]').each(function () {
    $(this).tooltip('hide');
  });

}