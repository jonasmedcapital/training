function processingSnackbar(type, message, device, time) {

  if ((time === undefined) || (time === null)) {
    time = 3000
  }

  if (type === "success") {
    strong = "Parabéns!"
  } else if (type === "danger") {
    strong = "Opss!"
  }

  strong = ""

  doSnackbar();

  $('#snackbarAlert').on('click', function (event) {
    $(this).remove();
    // if (event.target.nodeName === "BUTTON") {
    //   $(this).toggleClass("show");
    // } else {
    //   $(this).toggleClass("show");
    // }
  });

  validIntervalSnackbarAlert = setInterval(function () {
    $("#snackbarAlert").remove();
    clearInterval(validIntervalSnackbarAlert);
  }, time);



  function doSnackbar() {
    if (device === "mobile" || device === "tablet") {
      html = '<div id="snackbarAlert" class="snackbar-mc py-0 snackbar-' + type + '" style="margin-bottom:2rem;z-index:40;">'; 
    } else {
      html = '<div id="snackbarAlert" class="snackbar-mc py-2 snackbar-' + type + '" style="z-index:40;">'; 
    }
    html += '<div class="row">';
    html += '<div class="col-12 d-flex align-items-center">';
    html += '<span class="mr-auto"><strong>' + strong + '</strong> ' + message + '</span>';
    html += '<button type="button" class="close ml-auto" data-dismiss="alert" aria-label="Close">';
    html += '<span aria-hidden="true">&times;</span>';
    html += '</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $('body').append(html);


    $('#snackbarAlert').addClass("show");
  }

}