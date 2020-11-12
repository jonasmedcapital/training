import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["uploadCol", "showCol", "tableBody", "saveBtn", "tableRow", "uploadReceipt", "labelUploadReceipt", "fileNameReceipt", "progressUploadReceipt", "progressUploadReceiptBar", "progressUploadReceiptCounter", "buttonDisable", "spanEdit"]

  connect() {
    console.log("Hello From Dropzone Controller")
    this.files = []
    this.filesUploadeds = []
    this.filesNames = []
    this.canUpload = []
    this.types = ["pdf", "png", "jpeg", ".xlsx", ".docx", ".txt"]
    this.indexFetch = 0
    this.douploadColHtml()
    this.doShowColHtml()
  }

  douploadColHtml() {
    var html = `
                  <label class="drop-area" style="height: 500;" for="dropzoneArea" data-action="dragover->dropzones--entities--upload#dragOverHandler drop->dropzones--entities--upload#dropHandler">
                    <p class="font-weight-bold">*Clique ou arraste arquivos para área pontilhada</p>
                    <p class="font-weight-bold">*O tamanho dos arquivos deve ser menor que 5MB</p>
                    <p class="font-weight-bold">*Doc do carro</p>
                  </label>
                  <input class="file-input mt-0" type="file" id="dropzoneArea" multiple data-action="change->dropzones--entities--upload#dropHandler"></input>`

    this.uploadColTarget.insertAdjacentHTML("beforeend", html)
  }

  doShowColHtml() {
    var html = `
                <div class="card mt-2 mb-3" style="width:100%;height:550px;display:relative;" data-target="dropzones--entities--upload.cardBody">
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
                                <th scope="col-md-1"></th>
                                <th scope="col-md-4">Nome</th>
                                <th scope="col-md-1"></th>
                                <th scope="col-md-1">Tamanho</th>
                                <th scope="col-md-1">Tipo</th>
                                <th scope="col-md-1">Progresso</th>
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
                  <div class="card-footer py-0" data-target="dropzones--entities--upload.footerTable">
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
      var index = controller.files.indexOf(element)
      
      var erro = ""

      if ((element.size / 1000000).toFixed(2) <= 5 && controller.types.includes(element.type.split("/")[1])) {
        var spanError = `<span style="color:#26C485;"><i class="fas fa-check-double" data-toggle="tooltip" data-placement="top" title data-original-title="ok">`
        
        controller.canUpload[index] = true
      } else {
        
        if ((element.size / 1000000).toFixed(2) > 5) {
          erro += "Arquivo deve ser menor que 5MB.\n"
        }

        if (!controller.types.includes(element.type.split("/")[1])) {
          erro += "Formato do arquivo não é permitido."
        }

        var spanError = `<span style="color:#F25F5C;"><i class="fas fa-times-circle" data-toggle="tooltip" data-placement="top" title data-original-title="${erro}">`
        controller.canUpload[index] = false
      }

      if (element.name.length > 40) {
        var name = element.name.split('.').slice(0, -1).join('.').slice(0, 40)
      } else {
        var name = element.name.split('.').slice(0, -1).join('.')
      }

      var size = ((element.size / 1000000).toFixed(2) + "MB")

      var type = element.name.substr(element.name.lastIndexOf('.') + 1)

      html = `<tr id="${index}" data-target="dropzones--entities--upload.tableRow-${index}">

                <td col-md-1 style="font-size:80%;">${spanError}</td>
                
                <td col-md-4 style="font-size:80%;"><span class="text-bold justify">${name}</span><input autofocus data-field="order" data-action="keyup->dropzones--entities--upload#saveUnit change->dropzones--entities--upload#saveUnit blur->dropzones--entities--upload#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required></td>
                
                <td col-md-1 style="font-size:80%;"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Editar nome" data-target="dropzones--entities--upload.buttonDisable" data-action="click->dropzones--entities--upload#editUnit"><span class="material-icons md-sm md-dark data-target="dropzones--entities--upload.spanEdit-${index}" >edit</span></button></td>
                
                <td col-md-1 style="font-size:80%;">${size}</td>
                
                <td col-md-1 style="font-size:80%;">.${type}</td>
                
                <td>
                  <div class="form-group form-valid-group my-0 text-center">
                    <span class="fileNameForm" class="mx-2"></span>
                    <h7 class="progress"><span class="progress_count"></span></h7>
                    <div class="progress" style="height: 6px;overflow: inherit;" data-target="dropzones--entities--upload.progressUploadReceipt">
                      <div class="progress-bar" role="progressbar" style="width:0%;border-bottom:0.5rem solid #053B5E;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-target="dropzones--entities--upload.progressUploadReceiptBar-${index}"></div>
                    </div>
                    <span data-target="dropzones--entities--upload.progressUploadReceiptCounter-${index}" class="d-block"></span>
                  </div>
                </td>
                
                <td id="${index}" col-md-1 style="font-size:80%;"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Apagar arquivo" data-target="dropzones--entities--upload.buttonDisable" data-action="click->dropzones--entities--upload#deleteFile"><span class="material-icons md-sm md-dark">delete</span></button></td>
              </tr>`

      this.tableBodyTarget.insertAdjacentHTML("beforeend", html)
    });

    this.getControllerByIdentifier("app--helpers--elements").tooltip()

  }

  editUnit(ev) {

    ev.target.innerHTML = ``
    ev.target.innerHTML = `<span class="material-icons md-sm md-dark" data-target="dropzones--entities--upload.spanEdit-${"0"}">save</span>`

    var span = ev.target.parentElement.parentElement.previousElementSibling.childNodes[0]
    var input = ev.target.parentElement.parentElement.previousElementSibling.childNodes[1]
    span.classList.add("d-none")
    input.classList.remove("d-none")
    input.value = span.innerText
    input.focus()
  }

  saveUnit(ev) {
    var index = ev.target.parentElement.parentElement.id
    var span = ev.target.previousElementSibling
    var input = ev.target

    this.nameTarget(`spanEdit-${index}`).innerHTML = ``
    this.nameTarget(`spanEdit-${index}`).innerHTML = `<span class="material-icons md-sm md-dark" data-target="dropzones--entities--upload.spanEdit-${index}">edit</span>`

    if ((ev.type == "keyup" && ev.key == "Escape" && ev.shiftKey == false)) {
      span.classList.remove("d-none")
      input.classList.add("d-none")
    } else if ((ev.type == "keyup" && ev.key == "Enter" && ev.shiftKey == false) || ev.type == "blur") {
      const value = input.value.trim()
      const field = input.dataset.field
      span.classList.remove("d-none")
      input.classList.add("d-none")
      if (value != span.innerText && value != "") {
        this.filesNames[index] = value
        this.bindOutput(span, field, value)
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
    if (ev.type == "click") {
    var index = ev.target.parentElement.parentElement.id
    } else {
      var index = ev
    }
    if (index > -1) {
      this.files.splice(index, 1)
    }
    
    this.doBodyHtml()
  }

  saveUploads() {
    this.disableBtns()
    this.fetchFiles()
  }

  disableBtns() {
    this.buttonDisableTargets.forEach(element => {
      element.children[0].style.color = "#fbfcff"
      element.children[0].classList.remove("md-dark")
      element.disabled = true
    });
  }

  fetchFiles() {
    if (this.canUpload[this.indexFetch]) {
      this.progressCount(0, this.indexFetch)
      var file = this.files[this.indexFetch]
      var name = this.filesNames[this.indexFetch]
      var data = { upload: { file: file, name: name } }
      const token = $('meta[name=csrf-token]').attr('content');
      const url = "/dropzones/entities/upload"
      const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
      var controller = this
      fetch(url, init)
        .then(response => response.json())
        .then(response => {
          if (response.save) {
            if (controller.indexFetch == controller.files.length - 1) {
              controller.progressCount(100, controller.indexFetch)
              controller.stopRefreshing()
                // controller.nameTarget(`tableRow-${controller.indexFetch}`).remove()
              controller.filesUploadeds.push(controller.indexFetch)
              controller.removeFilesAfterUploads()
              controller.enableBtns()
              console.log("ultimo arquivo upado")
              
            } else {
              controller.progressCount(100, controller.indexFetch)
              controller.stopRefreshing()
              // controller.nameTarget(`tableRow-${controller.indexFetch}`).remove()
              controller.filesUploadeds.push(controller.indexFetch)
              controller.indexFetch++
              controller.fetchFiles()
            }
          } else {
            console.log("nao consegui salvar o arquivo")
            if (conroller.indexFetch == controller.files.length - 1) {
              controller.enableBtns()
              controller.removeFilesAfterUploads()
              console.log("ultimo arquivo upado")
            }
          }
        })

    } else {
      if (this.indexFetch == this.files.length - 1) {
        this.removeFilesAfterUploads()
        this.enableBtns()
        console.log("ultimo arquivo upado")
      } else {
        this.indexFetch++
        this.fetchFiles()
      }
    }
  }

  enableBtns() {
    this.buttonDisableTargets.forEach(element => {
      element.children[0].classList.add("md-dark")
      element.children[0].style.color = "#fbfcff"
      element.disabled = false
    });
  }

  removeFilesAfterUploads() {
    for (var i = this.filesUploadeds.length - 1; i >= 0; i--) {
      this.deleteFile(this.filesUploadeds[i])
    }
  }

  progressCount(value, index) {
    var controller = this
    this.nameTarget(`progressUploadReceiptBar-${index}`).style.width = value + `%`
    var i = 0
    if (value != 100) {
      this.progressTimer = setInterval(function () {
        controller.nameTarget(`progressUploadReceiptBar-${index}`).style.width = Math.floor(i + 1) + `%`
        controller.nameTarget(`progressUploadReceiptCounter-${index}`).innerText = Math.floor(i + 1) + `%`
        i++
        if (i == 95) {
          i = 94
        }
      }, 500);
    }
  }

  stopRefreshing() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
    }
  }

  nameTarget(target) {
    return this.targets.find(target)
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

}