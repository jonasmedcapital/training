function upload(parentObjId, bodyTable, title, urlUpload, urlDownload, currentUserId, device) {

  doModal();

  $('#uploadModal').on('hidden.bs.modal', function (e) {
    $(this).remove();
  });

  dataUrl = ""
  headers = ""
  errorLength = 0

  $('body').off('change', 'input[type=file]').on('change', 'input[type=file]', function () {
    var fileInput = document.querySelector('input[type=file]');
    $('#tableUploads').empty();
    
    var reader = new FileReader();
    reader.onload = function () {
      dataUrl = reader.result;
      doTable(dataUrl)
    };
    reader.readAsDataURL(fileInput.files[0]);

  });



  $('body').off('click', '#btnUploadForm').on('click', '#btnUploadForm', function () {
    $('#btnUploadForm').prop("disabled", true);
    $('#tableHandlingFeedback').addClass("d-none");
    $('#tableUploadsFeedback').removeClass("d-none");

    uploadFeedbacks()

    var fileInput = document.querySelector('input[type=file]');
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append('current_user_id', currentUserId);
    formData.append('file', file);

    rows = $(".upload-row").length
    columns = $(".upload-column").length

    requests = []
    dataRow = []
    for (let rowIndex = 1; rowIndex < rows + 1; rowIndex++) {
      values = []
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        values[values.length] = $("#upload-r" + rowIndex + "-c-" + columnIndex).html();
      }
      dataRow[dataRow.length] = { headers: headers, values: values }
    }


    for (let index = 0; index < rows; index++) {
      requests[requests.length] = {
        url: urlUpload,
        method: 'POST',
        dataType: 'json',
        data: { authenticity_token: token, model: dataRow[index], current_user: { current_user_id: currentUserId } },
        success: function (response) {
          if (response.process !== undefined && response.process) {
            if (response.new_record) {
              if (response.data) {
                $("#row-" + Number(index + 1)).addClass("upload-success")
                $("#feedback-" + Number(index + 1)).html('<span class="material-icons help" data-toggle="tooltip" data-placement="right" title data-original-title="' + response.message + '">done</span>')
              } else {
                $("#row-" + Number(index + 1)).addClass("upload-failed")
                $("#feedback-" + Number(index + 1)).html('<span class="material-icons help" data-toggle="tooltip" data-placement="right" title data-original-title="' + response.message + '">pan_tool</span>')
              }
            } else {
              if (response.data) {
                $("#row-" + Number(index + 1)).addClass("upload-edited")
                $("#feedback-" + Number(index + 1)).html('<span class="material-icons help" data-toggle="tooltip" data-placement="right" title data-original-title="' + response.message + '">done</span>')
              } else {
                $("#row-" + Number(index + 1)).addClass("upload-failed")
                $("#feedback-" + Number(index + 1)).html('<span class="material-icons help" data-toggle="tooltip" data-placement="right" title data-original-title="' + response.message + '">pan_tool</span>')
              }
            }

            html = '<input id="dataChangeInput" hidden type="text">';
            $('#dataChange').html(html)
            $("#dataChange").data("change", true);
            $.each(response.data_update.cln, function (i, item) {
              for (x in item) {
                $("#dataChangeInput").data(x, item[x]);
              }
            });
              
          } else {
            processingSnackbar(response.type, response.message, device);
            $("#row-" + rowIndex).addClass("upload-failed")
          }
          tooltip();
        },
        error: function (response) {
          $('#btnUploadForm').prop("disabled", false);
          processingSnackbar("danger", "Aconteceu um erro, favor atualizar a página. Se o erro persistir, favor entrar em contato no atendimento@medcapital.com.br", device);
        }
      }
    }

    w = 0
    function requestNext() {
      w += 1
      if (requests.length) {
        $.ajax(requests.shift()).then(requestNext);
      } else {
        $('#btnUploadForm').addClass("d-none");
        $('#tableFinishedFeedback').removeClass("d-none");
      }

      $('body').find(bodyTable).attr('data-reload', true);
    }
    requestNext();

  });

  $('body').off('click', '#downloadModel').on('click', '#downloadModel', function () {
    fields = []
    data = {
      authenticity_token: token,
      parent_obj: { id: parentObjId },
      model: { fields: fields, mockup: true },
      current_user: { current_user_id: currentUserId }
    };

    $.ajax({
      url: urlDownload,
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function (response) {
        if (response.process !== undefined && response.process) {
          processingCsv(response, "planilha-modelo")
          processingSnackbar(response.type, response.message, device);
        } else {
          processingSnackbar(response.type, response.message, device);
        }
      },
      error: function (response) {
        processingSnackbar("danger", "Aconteceu um erro, favor atualizar a página. Se o erro persistir, favor entrar em contato no atendimento@medcapital.com.br", device);
      }
    });
  });


  function doModal() {
    html = '<div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">'
    html += '<div class="modal-dialog modal-dialog-centered modal-slg" role="document">'
    html += '<div class="modal-content">'
    html += '<div class="modal-header border-bottom">'
    html += '<h5 class="modal-title" id="uploadModalTitle">' + title + '</h5>'
    html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    html += '<span aria-hidden="true">&times;</span>'
    html += '</button>'
    html += '</div>'
    html += '<div class="modal-body py-0">'
    html += '<div class="row my-2 text-center">'
    html += '<div class="col-12">';
    html += '<span><small>Baixe <span class="pointer" id="downloadModel">aqui</span> a planilha modelo</small></span> ';
    html += '</div>';
    html += '</div>';
    html += '<div class="row text-center">'
    html += '<div class="col-12">';
    html += '<div class="form-group form-valid-group my-0" is-valid="false">';
    html += '<input data-direct-upload-url="http://localhost:3000/rails/active_storage/direct_uploads" type="file" id="imageFieldForm" name="imageFieldForm" class="file-input" multiple>';
    html += '<label for="imageFieldForm" class="btn btn-primary btn-sm mb-3">Selecione o Arquivo</label><br>';
    html += '<span id="" class="fileNameFieldForm"></span>';
    html += '<h4 class="progress" style="display: none">Progress: <span class="progress_count"></span>%</h4>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="row">';
    html += '<div class="col-sm-12 text-center d-none mb-4" id="tableFinishedFeedback">';
    html += '<h6><strong>Upload finalizado!</strong></h6>'
    html += '</div>';
    html += '<div class="col-sm-12" id="tableHandlingFeedback"></div>';
    html += '</div>';
    html += '<div class="row my-2 d-none" id="tableUploadsFeedback">';
    html += '<div class="col-sm-4 uploadsFilter pointer text-center" data-filter="upload-success">';
    html += '<a class="chip chip-action blog-chip uploadsFilter pointer text-center" data-filter="upload-success"><i class="chip-icon" id="newUploadFeedback"></i>Novos</a>';
    html += '</div>';
    html += '<div class="col-sm-4 uploadsFilter pointer text-center" data-filter="upload-edited">';
    html += '<a class="chip chip-action blog-chip uploadsFilter pointer text-center" data-filter="upload-edited"><i class="chip-icon" id="editUploadFeedback"></i>Editados</a>';
    html += '</div>';
    html += '<div class="col-sm-4 uploadsFilter pointer text-center" data-filter="upload-failed">';
    html += '<a class="chip chip-action blog-chip uploadsFilter pointer text-center" data-filter="upload-failed"><i class="chip-icon" id="failUploadFeedback"></i>Erros</a>';
    html += '</div>';
    html += '</div>';

    html += '<div class="row my-2">';
    html += '<div class="col-sm-12" id="tableUploads" style="overflow:scroll;"></div>';
    html += '</div>';

    html += '</div>';
    html += '<div class="modal-footer border-top">'
    html += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>'
    html += '<button type="button" class="btn btn-primary" id="btnUploadForm">Salvar</button>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    html += '</div>'

    $('body').append(html);
    $("#uploadModal").modal();
    $("#uploadModal").modal('show');
    selector();
  }


  function doTable(dataUrl) {
    $.ajax({
      url: dataUrl,
      dataType: 'text',
      success: function (data) {
        var csv_data = data.split(/\r?\n|\r/);
        tbody = ''
        thead = '<th></th>'
        headers = csv_data[0].split(",");
        for (let index = 0; index < headers.length; index++) {
          thead += '<th scope="col" class="text-center upload-column">' + headers[index] + '</th>';
        }

        table = '<div class="table-responsive">';
        table += '<table class="table table-sm table-hover table-search" style="font-size:80%;">';
        table += '<thead>';
        table += '<tr>';
        table += thead;
        table += '</tr>';
        table += '</thead>';
        table += '<tbody id="bodyUploadsTable" data-reload="false">';
        table += '</tbody>';
        table += '</table>';
        table += '</div>'

        $('#tableUploads').html(table);


        errorPrev = 'Primeiro'
        error = ''
        for (let rowIndex = 1; rowIndex < csv_data.length; rowIndex++) {
          tbody = ''
          // const element = csv_data[rowIndex].split(",");
          element = CSVtoArray(csv_data[rowIndex]);
          try {
            error = element[1]
          }
          catch (err) {
            error = errorPrev
          }
          tbody += '<tr class="upload-row itemUploadRow" style="font-size:40%;" id="row-' + rowIndex + '">';
          tbody += '<td class="text-center p-0 align-middle" style="font-size:200%" id="feedback-' + rowIndex + '"></td>';
          
          try {
            for (let columnIndex = 0; columnIndex < element.length; columnIndex++) {
              tbody += '<td class="text-center p-0 align-middle" style="font-size:200%" data-field="' + headers[columnIndex] + '" id="upload-r' + rowIndex + '-c-' + columnIndex + '">' + element[columnIndex] + '</td>';
            }
          }
          catch (err) {
            tbody += '<td colspan="14" class="text-center p-0 align-middle error-handling cell-danger" style="font-size:200%" sibling-error="' + errorPrev + '">Erro na Linha de Parametrização</td>';
          }

          errorPrev = error
          tbody += '</tr>'

          $('#bodyUploadsTable').append(tbody);
        }

        
        itemRow(".itemUploadRow")
        errorLength = $('#tableUploads').find(".error-handling").length

        if (errorLength == 0) {
          message = "<span>Planilha Tratada Corretamente</span>"
          $('#btnUploadForm').prop("disabled", false);
        } else {
          message = "<span>"
          message += "Planilha com seguintes erros: "
          errorLength = $('#tableUploads').find(".error-handling").each(function (i) {
            error = $(this).attr("sibling-error")
            message += '<div class="chip fade show" id="chipDismissible-' + i + '">Próximo ao Item: ' + error + '<button class="close" data-dismiss="alert" data-target="#chipDismissible-' + i + '" type="button"><i class="material-icons">cancel</i></button></div>';
          });
          message += "</span><br>"
          $('#btnUploadForm').prop("disabled", true);
        }
        $("#tableHandlingFeedback").html(message)
      },
      error: function (data) {
      }
    });

    height = $(window).height();
    $('#tableUploads').css('height', height * 0.4)
  }

  function CSVtoArray(text) {
    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null;
    var a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
      function (m0, m1, m2, m3) {
        // Remove backslash from \' in single quoted values.
        if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
        // Remove backslash from \" in double quoted values.
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
        else if (m3 !== undefined) a.push(m3);
        return ''; // Return empty string.
      });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
  };

  function uploadFeedbacks() {
    
    uploadFeedbackInterval = setInterval(function () {
      newRecords = $('body').find('.upload-success').length
      editRecords = $('body').find('.upload-edited').length
      failRecords = $('body').find('.upload-failed').length

      $('#newUploadFeedback').html(newRecords);
      $('#editUploadFeedback').html(editRecords);
      $('#failUploadFeedback').html(failRecords);
    }, 500);

  }

  $('body').off('click', '.uploadsFilter').on('click', '.uploadsFilter', function () {
    filter = $(this).attr("data-filter");
    rows = $('body').find('tr.upload-row')
    // $('tr').each(function () {
    rows.each(function () {
      // if ($(this).hasClass("upload-column")) {
      // } else {
      // }

      if ($(this).hasClass(filter)) {
        $(this).removeClass("d-none")
      } else {
        $(this).addClass("d-none")
      }
    });
  });


}