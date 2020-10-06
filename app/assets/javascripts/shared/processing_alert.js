function processingAlert(type, message) {

  if (type === "success") {
    strong = "Parabéns! "
  } else if (type === "danger") {
    strong = "Opss! "
  }

  doAlert();

  validInterval = setInterval(function () {
    $(".alert").alert("close");
  }, 1500);

  $('.alert').on('closed.bs.alert', function () {
    clearInterval(validInterval);
    $(this).remove();
  })



  function doAlert() {
    html = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert" style="display:flex;justify-content:center;width:70%;">';
    html += '<strong>' + strong + ' </strong> ' + message;
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    html += '<span aria-hidden="true">&times;</span>';
    html += '</button>';
    html += '</div>';

    // html = '<div id="alertMessage" style="display:flex;justify-content:center;padding-top:20px;padding-bottom:20px;background-color:rgba(80,81,79,0.1);width:100%;">'
    // html += '<div class="alert alert-' + type + ' alert-dismissible fade in" role="alert" style="display:flex;justify-content:space-between;width:50%;margin-bottom:0px;">';
    // // html += '<strong>' + strong + '</strong> ' + message;
    // html += message;
    // html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    // html += '<span aria-hidden="true">&times;</span>';
    // html += '</button>';
    // html += '</div>';
    // html += '</div>';

    $('#myAlerts').html(html);
  }

}