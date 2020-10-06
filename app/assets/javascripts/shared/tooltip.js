function tooltip() {
  $('[data-toggle="tooltip"]').mouseover(function () {
    $(this).tooltip('show');
  });

  $('[data-toggle="tooltip"]').mouseout(function () {
    $(this).tooltip('hide');
  });

}