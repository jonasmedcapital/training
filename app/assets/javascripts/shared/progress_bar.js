function progressBar() {
  // show spinner on AJAX start
  $(document).ajaxStart(function () {
    //$('.progress').show();
    $('.progress').addClass("show");
  });

  // hide spinner on AJAX stop
  $(document).ajaxStop(function () {
    //$('.progress').hide();
    $('.progress').toggleClass("show");
  });
}