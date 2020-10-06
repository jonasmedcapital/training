function processingData(mode, url, method, data, btnSave, btnDelete, element, modal, device, change) {
  changeBtnDisabled(true);
  changeBtnSaying("Salvando", "Apagando");

  $.ajax({
    url: url,
    method: method,
    dataType: 'json',
    data: data,
    success: function (response) {
      if (response.save !== undefined && response.save) {
        if (modal != "") {
          modal.modal("hide");
        }
        processingSnackbar(response.type, response.message, device);
        $('body').find(element).attr('data-reload', true);
        changeBtnSaying("Salvo", "Apagado");
      } else if (response.save !== undefined && !response.save) {
        if (modal != "") {
          modal.modal("hide");
        }
        processingSnackbar(response.type, response.message, device);
        changeBtnDisabled(false);
        changeBtnSaying("Salvar", "Apagar");
      }

      if (response.process !== undefined && response.process && (response.save || response.data)) {
        if (modal != "") {
          modal.modal("hide");
        }
        processingSnackbar(response.type, response.message, device);
        $('body').find(element).attr('data-reload', true);
        changeBtnSaying("Salvo", "Apagado");

        if (change) {
          html = '<input id="dataChangeInput" hidden type="text">';
          $('#dataChange').html(html)
          $("#dataChange").data("change", true);
          $.each(response.data_update.cln, function (i, item) {
            for (x in item) {
              $("#dataChangeInput").data(x, item[x]);
            }
          });
        }

      } else if (response.process === undefined || !response.save || !response.data) {
        // if (modal != "") {
        //   modal.modal("hide");
        // }
        processingSnackbar(response.type, response.message, device);
        changeBtnDisabled(false);
        changeBtnSaying("Salvar", "Apagar");
      }
    },
    error: function (response) {
      processingSnackbar("danger", "Erro ao salvar o registro!", device);
      changeBtnDisabled(false);
      changeBtnSaying("Salvar", "Apagar");
    }
  });

  function changeBtnDisabled(state) {
    btnSave.prop("disabled", state);
    btnDelete.prop("disabled", state);
  }

  function changeBtnSaying(saveSaying, deleteSaying) {
    if (mode === "create" || mode === "update" || mode === "save") {
      btnSave.html(saveSaying);
    } else if (mode === "delete" || mode === "destroy") {
      btnDelete.html(deleteSaying);
    }
  }
}