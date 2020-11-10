import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["indexCol", "showCol", "tableBody", "saveBtn" ]

  connect() {
    console.log("Hello From Dropzone Controller")
    this.files = []
    this.doIndexColHtml()
    this.doShowColHtml()
  }

  doIndexColHtml() {
    var html = `<div>
                  <input class="file-input" type="file" id="dropzoneArea" multiple data-action="change->dropzones--entities--index#dropHandler"></input>
                  <label class="drop-area" for="dropzoneArea" data-action="dragover->dropzones--entities--index#dragOverHandler drop->dropzones--entities--index#dropHandler">
                    <p class="font-weight-bold">*Clique ou arraste arquivos para área pontilhada ...</p>
                    <p class="font-weight-bold">*O tamanho dos arquivos deve ser menor que 5MB ...</p>
                  </label>
                </div>`

    this.indexColTarget.insertAdjacentHTML("beforeend", html)
  }

  doShowColHtml() {
    var html = `<div class="d-flex flex-row-reverse mb-3">  
                  <button type="button" class="btn btn-secondary" data-action="click->dropzones--entities--index#saveUploads" data-target="dropzones--entities--index.saveBtn">Enviar</button>
                </div>
                <div class="card" style="width:100%;height:550px;display:relative;" data-target="trainings--entities--index.cardBody">
                  <div class="card-header d-flex align-items-center card-header-table-list">
                    <h6 class="card-title display-4" style="padding:1rem;font-size:110%;margin-bottom:0px;">Arquivos para upload</h6>
                  </div>
                  <div class="card-body" style="overflow:scroll;">
                    <div class="row">
                      <div class="col p-0">
                        <div class="table-responsive">
                          <table class="table table-sm table-hover table-search">
                            <thead>
                              <tr>
                                <th scope="col-md-4">Nome</th>
                                <th scope="col-md-1">Tamanho</th>
                                <th scope="col-md-1">Tipo</th>
                              </tr>
                            </thead>
                            <tbody data-target="dropzones--entities--index.tableBody">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer py-0" data-target="trainings--entities--index.footerTable">
                  </div>
                </div>`

    this.showColTarget.insertAdjacentHTML("beforeend", html)
  }

  dragOverHandler(ev) {
    // console.log('File(s) in drop zone');

    // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
    ev.preventDefault();
  }

  dropHandler(ev) {
    // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
    ev.preventDefault();

    if (ev.type == "drop") {
    // console.log('File(s) dropped');

      if (ev.dataTransfer.items) {

        // Use a interface DataTransferItemList para acessar o (s) arquivo (s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {

          // Se os itens soltos não forem arquivos, rejeite-os
          if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile();
            // console.log('... file[' + i + '].name = ' + file.name);
            if ((file.size / 1000000).toFixed(2) <= 5) {
              this.files[this.files.length] = file
            } else {
              processingSnackbar("danger", `Arquivo ${file.name} maior que 5MB`) // device como parametro
            }
          }
        }
      } else {
        console.log("nao entramos aqui")
        // Use a interface DataTransfer para acessar o (s) arquivo (s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          // console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
      }
    } else if (ev.type == "change") {
      // console.log('File(s) inputed');

      // Use a interface Files para acessar o (s) arquivo (s)
      for (var i = 0; i < ev.target.files.length; i++) {
        // console.log('... file[' + i + '].name = ' + ev.target.files[i].name);
        if ((ev.target.files[i].size / 1000000).toFixed(2) <= 5) {
          this.files[this.files.length] = ev.target.files[i]
        } else {
          processingSnackbar("danger", `Arquivos ${ev.target.files[i].name} maior que 5MB`) // device como parametro
        }
      }
    }

    this.doBodyHtml()
  }

  doBodyHtml() {
    this.tableBodyTarget.innerHTML = ``
    var html = ``
    this.files.forEach(element => {
      html = `<tr class="${(element.size / 1000000).toFixed(2) > 5 ? "table-danger" : "table-success"}">
                <td col-md-4 style="font-size:80%;">${element.name.length > 40 ? (element.name.slice(0, 45) + "...") : element.name}</td>
                <td col-md-1 style="font-size:80%;">${((element.size / 1000000).toFixed(2) + "MB")}</td>
                <td col-md-1 style="font-size:80%;">.${element.type.split("/")[1]}</td>
              </tr>`

      this.tableBodyTarget.insertAdjacentHTML("beforeend", html)
    });

  }

  saveUploads() {
    var data = { current_user: { current_user_id: currentUser.id } }
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/dropzones/entities/upload"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.process) {
          this.application.trainings = response.data.cln.collection
        } else {
          processingSnackbar(response.type, response.message, device)
        }
        this.doDataTable()
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError()) // device como parametro
      })
  }

}