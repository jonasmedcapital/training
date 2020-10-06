function processingTableData(url, method, data, element, snackbar, device) {
  $.ajax({
    url: url,
    method: method,
    dataType: 'json',
    data: data,
    success: function (response) {
      if (response.save !== undefined && response.save) {
        processingSnackbar(response.type, response.message, device);
        // processingAlert(response.type, response.message);
        $('body').find(element).attr('data-reload', true);
        snackbar.toggleClass("show");
      } else if (response.save !== undefined && !response.save) {
        processingSnackbar(response.type, response.message, device);
        // processingAlert(response.type, response.message);
        snackbar.toggleClass("show");
      }
    },
    error: function (response) {
      snackbar.toggleClass("show");
    }
  });
}