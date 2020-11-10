import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["uploadCol", "showCol", "tableBody", "saveBtn", "tableLine" ]

  connect() {
    console.log("Hello From Dropzone Controller")
    this.files = []
    this.types = ["pdf", "png", "jpeg"]
    this.douploadColHtml()
    this.doShowColHtml()
  }

  douploadColHtml() {
    var html = `
                  <label class="drop-area" for="dropzoneArea" data-action="dragover->dropzones--entities--upload#dragOverHandler drop->dropzones--entities--upload#dropHandler">
                    <p class="font-weight-bold">*Clique ou arraste arquivos para área pontilhada</p>
                    <p class="font-weight-bold">*O tamanho dos arquivos deve ser menor que 5MB</p>
                  </label>
                  <input class="file-input mt-0" type="file" id="dropzoneArea" multiple data-action="change->dropzones--entities--upload#dropHandler"></input>`

    this.uploadColTarget.insertAdjacentHTML("beforeend", html)
  }

  doShowColHtml() {
    var html = `
                <div class="card mt-2 mb-3" style="width:100%;height:550px;display:relative;" data-target="trainings--entities--upload.cardBody">
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
                                <th scope="col-md-1"></th>
                                <th scope="col-md-1">Tamanho</th>
                                <th scope="col-md-1">Tipo</th>
                                <th scope="col-md-1">Erros</th>
                                <th scope="col-md-1"></th>
                              </tr>
                            </thead>
                            <tbody data-target="dropzones--entities--upload.tableBody">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer py-0" data-target="trainings--entities--upload.footerTable">
                  </div>
                </div>
                <div class="d-flex flex-row-reverse">  
                  <button type="button" class="btn btn-secondary" data-action="click->dropzones--entities--upload#saveUploads" data-target="dropzones--entities--upload.saveBtn">Upload</button>
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
          
          this.found = false
          
          // Se os itens soltos não forem arquivos, rejeite-os
          if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile();
            // console.log('... file[' + i + '].name = ' + file.name);
            for (var j = 0; j < this.files.length; j++) {
              if (this.files[j].name == file.name) {
                this.found = true
                console.log("arquivo repetido")
                break
              }
            }
            if (!this.found) {
              this.files[this.files.length] = file
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
        
        this.found = false
        
        // console.log('... file[' + i + '].name = ' + ev.target.files[i].name);
        for (var j = 0; j < this.files.length; j++) {
          if (this.files[j].name == ev.target.files[i].name) {
            this.found = true
            console.log("arquivo repetido")
            break
          }
        }
        if (!this.found) {
          this.files[this.files.length] = ev.target.files[i]
        } 
      }
    }

    this.doBodyHtml()
  }

  doBodyHtml() {
    this.tableBodyTarget.innerHTML = ``
    var html = ``
    var controller = this
    this.files.forEach(element => {
      html = `
              <tr id="${controller.files.indexOf(element)}" class="${((element.size / 1000000).toFixed(2) <= 5 && controller.types.includes(element.type.split("/")[1])) ? "table-success" : "table-danger"}">
                
                <td col-md-4 style="font-size:80%;"><span class="text-bold justify">${element.name.length > 40 ? (element.name.slice(0, 45) + "...") : element.name}</span><input autofocus data-field="order" data-action="keyup->dropzones--entities--upload#saveUnit change->dropzones--entities--upload#saveUnit blur->dropzones--entities--upload#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required></td>
                <td col-md-1 style="font-size:80%;"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Editar nome"><span class="material-icons md-sm md-dark" data-action="click->dropzones--entities--upload#editUnit">edit</span></button></td>
                <td col-md-1 style="font-size:80%;">${((element.size / 1000000).toFixed(2) + "MB")}</td>
                <td col-md-1 style="font-size:80%;">.${element.type.split("/")[1]}</td>
                <td col-md-1 style="font-size:80%;"></td>
                <td id="${controller.files.indexOf(element)}" col-md-1 style="font-size:80%;"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Apagar arquivo"><span class="material-icons md-sm md-dark" data-action="click->dropzones--entities--upload#deleteFile">delete</span></button></td>
              </tr>`

      this.tableBodyTarget.insertAdjacentHTML("beforeend", html)
    });

  }

  editUnit(ev) {
    console.log(ev)
    console.log(ev.target.parentElement.parentElement.previousElementSibling.childNodes[0])
    var span = ev.target.parentElement.parentElement.previousElementSibling.childNodes[0]
    var input = ev.target.parentElement.parentElement.previousElementSibling.childNodes[1]
    span.classList.add("d-none")
    input.classList.remove("d-none")
    input.value = span.innerText
    input.focus()
  }

  saveUnit(ev) {
    var span = ev.target.previousElementSibling
    var input = ev.target

    if ((ev.type == "keyup" && ev.key == "Escape" && ev.shiftKey == false)) {
      span.classList.remove("d-none")
      input.classList.add("d-none")
    } else if ((ev.type == "keyup" && ev.key == "Enter" && ev.shiftKey == false) || ev.type == "blur") {
      const value = input.value.trim()
      const field = input.dataset.field
      span.classList.remove("d-none")
      input.classList.add("d-none")
      if (value != span.innerText && value != "") {
        this.bindOutput(span, field, value)
        // const data = { session: { id: this.element.dataset.id, value: value, field: field }, current_user: { current_user_id: currentUser.id } }
      }
    }
  }

  bindOutput(span, field, value) {
    if (field == "order") {
      span.innerText = value
    } else {
      span.innerText = value
    }
  }

  deleteFile(ev) {
    var index = ev.target.parentElement.parentElement.id
    if (index > -1) {
      this.files.splice(index, 1)
    }

    this.doBodyHtml()
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