import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["uploadCol", "showCol", "tableBody", "saveBtn", "tableRow", "uploadReceipt", "labelUploadReceipt", "fileNameReceipt", "progressUploadReceipt", "progressUploadReceiptBar", "progressUploadReceiptCounter", "buttonDisable", "spanEdit", "spanSave", "inputName", "spanName", "buttonRemove" ]

  connect() {
    console.log("Hello From Dropzone Controller")
    
    // THE SAME INDEX OF THESE 4 ARRAYS REFER TO THE SAME FILE
    this.files = [] // LIST OF FILES SELECTED BY USERS, EVEN THE FILES NOT ALLOWED
    this.filesNames = [] // TO EDIT THE FILES NAMES WE NEED ANOTHER ARRAY BECAUSE FILES TYPE DON HAVE SETTERS
    this.canUpload = [] // ARRAY THAT DETERMINES IF THE FILES CAN BE LOADED
    this.alreadyUploaded = [] // ARRAY WITH WITH UPLOADED FLAG
    
    this.filesPermittedTypes = ["pdf", "png", "jpeg", ".xlsx", ".docx", ".txt", "PDF", "PNG", "JPEG", ".XLSX", ".DOCX", ".TXT"] // DEFINE ALLOWED EXTENSIONS
    this.indexFetch = 0 // INDEX TO INCREASE IN THE FETCH RECURSIVE CALL
    this.doUploadColumnHtml() 
    this.doShowColumnHtml()
  }

  // START BASIC HTML
  doUploadColumnHtml() {
    var html = `
                  <label class="drop-area" style="height: 500;" for="dropzoneArea" data-action="dragover->dropzones--entities--upload#dragOverHandler drop->dropzones--entities--upload#dropHandler">
                    <p class="font-weight-bold">*Clique ou arraste arquivos para área pontilhada</p>
                    <p class="font-weight-bold">*O tamanho dos arquivos deve ser menor que 5MB</p>
                    <p class="font-weight-bold">*Doc do carro</p>
                  </label>
                  <input class="file-input mt-0" type="file" id="dropzoneArea" multiple data-action="change->dropzones--entities--upload#dropHandler"></input>`

    this.uploadColTarget.insertAdjacentHTML("beforeend", html)
  }

  doShowColumnHtml() {
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
    this.doBodyTableHtml()
  }

  // END BASIC HTML

  // START DROP ACTION
  dragOverHandler(ev) { // DETECTS IF ANY FILE IS BEING DRAGGED IN THE DROP AREA

    // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
    ev.preventDefault();
  }

  dropHandler(ev) { // DETECTS EVENT DROP
    ev.preventDefault();

    if (ev.type == "drop") { // DROP IN DROPZONE

      if (ev.dataTransfer.items) {

        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          
          this.found = false // RESET THE FLAG THAT DETECTS FILES WITH THE SAME NAME
          
          if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile();
            
            for (var j = 0; j < this.files.length; j++) {
              if (this.files[j].name == file.name) {
                if (this.files[j].size == file.size) {
                  this.found = true // DETECTED FILES WITH THE SAME NAME
                  break
                }
              }
            }
            
            if (!this.found) { // NOW WE CAN COPY THE FILE AND ITS NAME
              this.files[this.files.length] = file
              this.filesNames[this.filesNames.length] = file.name
              this.alreadyUploaded[this.alreadyUploaded.length] = false
            }
          }
        }
      } else { 
        console.log("WE DONT WANT GET HERE")
      }

    } else if (ev.type == "change") { // CLICK ON DROPZONE
      for (var i = 0; i < ev.target.files.length; i++) {
        
        this.found = false // RESET THE FLAG THAT DETECTS FILES WITH THE SAME NAME
        
        for (var j = 0; j < this.files.length; j++) {
          if (this.files[j].name == ev.target.files[i].name) {
            if (this.files[j].size == ev.target.files[i].size) {
              this.found = true // DETECTED FILES WITH THE SAME NAME
              break
            }
          }
        }

        if (!this.found) { // NOW WE CAN COPY THE FILE AND ITS NAME
          this.files[this.files.length] = ev.target.files[i]
          this.filesNames[this.filesNames.length] = ev.target.files[i].name
          this.alreadyUploaded[this.alreadyUploaded.length] = false
        } 
      }
    }

    this.doBodyTableHtml()
  }

  // END DROP ACTION

  // STAR INSERT FILES IN THE TABLE

  doBodyTableHtml() {
    this.tableBodyTarget.innerHTML = ``
    var html = ``
    var controller = this

    if (controller.files == undefined || controller.files == [] || controller.files.length == 0) {
      
      var noData = `<td colspan="9" class="p-5 align-middle text-center" style="font-size:200%;">
                      <span class="fa-stack fa-2x">
                        <i class="fas fa-list fa-stack-1x"></i>
                        <i class="fas fa-ban fa-stack-2x" style="color:#EFEFEF;"></i>
                      </span>
                      <h5>Você não inseriu nenhum arquivo, clique ou arraste para área lateral</h5>
                    </td>`

      controller.tableBodyTarget.innerHTML = noData

    } else {

      this.files.forEach(element => {

        var index = controller.files.indexOf(element) // INDEX TO TARGETS AND IDS

        if (this.files.length == 1) {
          var tableRow = `<tr id="${index}" data-target="dropzones--entities--upload.tableRow-${index}" class="itemRow" style="height:50px;">`

        } else {
          var tableRow = `<tr id="${index}" data-target="dropzones--entities--upload.tableRow-${index}" class="itemRow">`
        }
       
        var erro = ""

        // FILE SIZE AND EXTENSION VALIDATION
        if ((element.size / 1000000).toFixed(2) <= 5 && controller.filesPermittedTypes.includes(element.type.split("/")[1])) {
          var spanError = `<span style="color:#26C485;"><i class="fas fa-check-double" data-toggle="tooltip" data-placement="top" title data-original-title="ok">`
          
          controller.canUpload[index] = true // FLAG ALLOW UPLOAD DURING FETCH
        } else {
          
          if ((element.size / 1000000).toFixed(2) > 5) { // ADD TOOLTIP: GREATER THAN 5 MB
            erro += "Arquivo deve ser menor que 5MB.\n"
          }

          if (!controller.filesPermittedTypes.includes(element.type.split("/")[1])) { // ADD TOOLTIP: EXTESION NOT PERMITTED
            erro += "Formato do arquivo não é permitido." 
          }

          var spanError = `<span style="color:#F25F5C;"><i class="fas fa-times-circle" data-toggle="tooltip" data-placement="top" title data-original-title="${erro}">`
          controller.canUpload[index] = false // FLAG NOT ALLOW UPLOAD DURING FETCH
        }

        if (element.name.length > 40) { // REDUCE FILE NAME LENGTH AND SPLIT EXTENSION
          var name = element.name.split('.').slice(0, -1).join('.').slice(0, 40)
        } else {
          var name = element.name.split('.').slice(0, -1).join('.')
        }

        var size = ((element.size / 1000000).toFixed(2) + "MB") // CALCULATE SIZE

        var type = element.name.substr(element.name.lastIndexOf('.') + 1) // GET ONLY EXTENSION

        if (!controller.alreadyUploaded[index]) {

          // MOUNT TABLE ROW
          html = `${tableRow}

                    <td col-md-1 style="font-size:80%;">${spanError}</td>
                    
                    <td col-md-4 style="font-size:80%;">
                      <span class="text-bold justify" data-target="dropzones--entities--upload.spanName-${index}">${name}</span>
                      <input autofocus data-field="order" data-action="keyup->dropzones--entities--upload#saveFileName change->dropzones--entities--upload#saveFileName blur->dropzones--entities--upload#saveFileName" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required data-target="dropzones--entities--upload.inputName-${index}">
                    </td>
                    
                    <td col-md-1 style="font-size:80%;">
                      <button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Editar nome" data-target="dropzones--entities--upload.buttonDisable dropzones--entities--upload.buttonRemove-${index}" data-action="click->dropzones--entities--upload#editFileName">
                        <span class="material-icons md-sm md-dark" data-target="dropzones--entities--upload.spanEdit-${index}">edit</span>
                        <span class="material-icons md-sm md-dark d-none" data-target="dropzones--entities--upload.spanSave-${index}">save</span>
                      </button>
                    </td>
                    
                    <td col-md-1 style="font-size:80%;">${size}</td>
                    
                    <td col-md-1 style="font-size:80%;">.${type}</td>
                    
                    <td>
                      <div class="form-group form-valid-group my-0 text-center">
                        <span class="fileNameForm" class="mx-2"></span>
                        <h7 class="progress">
                          <span class="progress_count"></span>
                        </h7>
                        <div class="progress" style="height: 6px;overflow: inherit;" data-target="dropzones--entities--upload.progressUploadReceipt">
                          <div class="progress-bar" role="progressbar" style="width:0%;border-bottom:0.5rem solid #053B5E;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-target="dropzones--entities--upload.progressUploadReceiptBar-${index}"></div>
                        </div>
                        <span data-target="dropzones--entities--upload.progressUploadReceiptCounter-${index}" class="d-block"></span>
                      </div>
                    </td>
                    
                    <td id="${index}" col-md-1 style="font-size:80%;">
                      <button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Apagar arquivo" data-target="dropzones--entities--upload.buttonDisable dropzones--entities--upload.buttonRemove-${index}" data-action="click->dropzones--entities--upload#deleteFile"><span class="material-icons md-sm md-dark">delete</span></button>
                    </td>
                  </tr>`

        } else {
          html = `${tableRow}

                    <td col-md-1 style="font-size:80%;">${spanError}</td>
                    
                    <td col-md-4 style="font-size:80%;">
                      <span class="text-bold justify" data-target="dropzones--entities--upload.spanName-${index}">${name}</span>
                      <input autofocus data-field="order" data-action="keyup->dropzones--entities--upload#saveFileName change->dropzones--entities--upload#saveFileName blur->dropzones--entities--upload#saveFileName" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required data-target="dropzones--entities--upload.inputName-${index}">
                    </td>
                    
                    <td col-md-1 style="font-size:80%;">
                    </td>
                    
                    <td col-md-1 style="font-size:80%;">${size}</td>
                    
                    <td col-md-1 style="font-size:80%;">.${type}</td>
                    
                    <td>
                      <div class="form-group form-valid-group my-0 text-center">
                        <span class="fileNameForm" class="mx-2"></span>
                        <h7 class="progress">
                          <span class="progress_count"></span>
                        </h7>
                        <div class="progress" style="height: 6px;overflow: inherit;" data-target="dropzones--entities--upload.progressUploadReceipt">
                          <div class="progress-bar" role="progressbar" style="width:100%;border-bottom:0.5rem solid #053B5E;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-target="dropzones--entities--upload.progressUploadReceiptBar-${index}"></div>
                        </div>
                        <span data-target="dropzones--entities--upload.progressUploadReceiptCounter-${index}" class="d-block">100%</span>
                      </div>
                    </td>
                    
                    <td id="${index}" col-md-1 style="font-size:80%;">
                    </td>
                  </tr>`

                }

        this.tableBodyTarget.insertAdjacentHTML("beforeend", html)
      });

      this.getControllerByIdentifier("app--helpers--elements").tooltip()
    }

  }

  // END INSERT FILES IN THE TABLE

  // START EDIT FILE NAME

  editFileName(ev) { // EDIT BUTTON DATA-ACTION
    var index = ev.currentTarget.parentElement.parentElement.id

    this.nameTarget(`spanEdit-${index}`).classList.add("d-none")
    this.nameTarget(`spanSave-${index}`).classList.remove("d-none")

    var span = this.nameTarget(`spanName-${index}`)
    var input = this.nameTarget(`inputName-${index}`)
    span.classList.add("d-none")
    input.classList.remove("d-none")
    input.value = span.innerText
    input.focus()
  }

  saveFileName(ev) { // SAVE BUTTON DATA-ACTION
    var index = ev.currentTarget.parentElement.parentElement.id

    var span = this.nameTarget(`spanName-${index}`)
    var input = this.nameTarget(`inputName-${index}`)

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
        this.bindOutput(span, field, value, index)
      } else {
        this.nameTarget(`spanSave-${index}`).classList.add("d-none")
        this.nameTarget(`spanEdit-${index}`).classList.remove("d-none")
      }
    }
  }

  bindOutput(span, field, value, index) { // REPLACE NEW FILE NAME
    this.nameTarget(`spanSave-${index}`).classList.add("d-none")
    this.nameTarget(`spanEdit-${index}`).classList.remove("d-none")

    if (field == "order") {
      span.innerText = value
    } else {
      span.innerText = value
    }
  }

  // END EDIT FILE NAME

  // START REMOVE LINE FROM THE TABLE

  deleteFile(ev) { // REMOVE BUTTON DATA-ACTION
    if (ev.type == "click") {
    var index = ev.target.parentElement.parentElement.id
    } else {
      var index = ev
    }
    if (index > -1) {
      this.files.splice(index, 1)
      this.filesNames.splice(index, 1)
      this.canUpload.splice(index, 1)
      this.alreadyUploaded.splice(index, 1)
    }
    
    this.indexFetch--
    this.doBodyTableHtml()
  }

  // END REMOVE LINE FROM THE TABLE

  // START UPLOAD TO SERVER

  saveUploads() {
    this.disableButtons()
    this.fetchFiles()
  }

  disableButtons() { // DONT ALLOW USER TO PRESS BUTTON WHILE UPLOADING TO SERVER
    this.buttonDisableTargets.forEach(element => {
      element.children[0].style.color = "#fbfcff"
      element.children[0].classList.remove("md-dark")
      element.disabled = true
    });
  }

  fetchFiles() { 
    
    // USE THIS TO COMPARE SERVER SIDE LOG AND CLIENT LOG UPLOADS AND NAMES
    // console.log(this.indexFetch)
    // console.log(this.files[this.indexFetch])
    // console.log(this.filesNames[this.indexFetch])

    if (this.files.length - this.indexFetch == 0) {

      console.log("Não temos arquivos para subir")
      this.enableButtons()

    } else if (this.canUpload[this.indexFetch]) { // IF FILE IN INDEXFETCH POSITION LESS THAN 5 MB AND THE EXTENSION IS ALLOWED
      this.progressCount(0, this.indexFetch) // START COUNT
      
      var file = this.files[this.indexFetch]  
      var name = this.filesNames[this.indexFetch] 
      var data = { upload: { file: file, name: name } } // SET DATA
      
      const token = $('meta[name=csrf-token]').attr('content');
      const url = "/dropzones/entities/upload"
      const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
      
      var controller = this
      
      fetch(url, init)
        .then(response => response.json())
        .then(response => {
          if (response.save) {
            if (controller.indexFetch == controller.files.length - 1) { // LAST FILE FROM THE TABLE, LAST FETCH, NEED TO RESET SOME THINGS
              
              controller.tagUploadedFiles() // SET UPLOADED FLAG TRUE AND PROGRESS BAR TO 100%

              controller.resetAfterUpload() // RESET SOME THINGS

            } else { // ANOTHER FILE BUT NOT THE LAST IN THE TABLE
              
              controller.tagUploadedFiles() // SET UPLOADED FLAG TRUE AND PROGRESS BAR TO 100%

              controller.indexFetch++ // RECURSIVE FETCH NEED INCREASE INDEX
              controller.fetchFiles() // RECURSIVE CALL

            }
          } else {
            console.log("nao consegui salvar o arquivo")
            if (conroller.indexFetch == controller.files.length - 1) { // LAST FILE FROM THE TABLE, LAST FETCH, NEED TO RESET SOME THINGS
              
              controller.resetAfterUpload() // RESET SOME THINGS

            }
          }
        })

    } else { // FILE GREATER THAN 5 MB OR EXTENSION UNPERMITTED
      if (this.indexFetch == this.files.length - 1) { // LAST FILE FROM THE TABLE, LAST FETCH, NEED TO RESET SOME THINGS
        
        this.resetAfterUpload() // RESET SOME THINGS
        
      } else { // ANOTHER FILE BUT NOT THE LAST IN THE TABLE

        this.indexFetch++ // RECURSIVE FETCH NEED INCREASE INDEX
        this.fetchFiles() // RECURSIVE CALL

      }
    }
  }

  tagUploadedFiles() { // SET UPLOADED FLAG TRUE AND PROGRESS BAR TO 100%
    this.nameTarget(`buttonRemove-${this.indexFetch}`).remove()
    this.nameTarget(`buttonRemove-${this.indexFetch}`).remove()
    this.progressCount(100, this.indexFetch) // PROGRESS BAR TO 100%
    this.stopRefreshing()
    this.alreadyUploaded[this.indexFetch] = true
  }

  resetAfterUpload() {
    this.enableButtons() // ENABLE EDIT AND DELETE BUTTONS
    this.indexFetch++ // INCREASE TO NEW UPLOAD
    console.log("ultimo arquivo upado")   
  }

  enableButtons() { // WHEN UPLOADS END ALLOW USER TO PRESS BUTTON 
    this.buttonDisableTargets.forEach(element => {
      element.children[0].classList.add("md-dark")
      element.children[0].style.color = "#fbfcff"
      element.disabled = false
    });
  }

  progressCount(value, index) { // FAKE COUNTER PROGRESS
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
    } else {
      this.stopRefreshing()
      this.nameTarget(`progressUploadReceiptCounter-${index}`).innerText = value + `%`
    }
  }

  stopRefreshing() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
    }
  }

  // END UPLOAD TO SERVER

  // START COMMON FUNCTIONS

  nameTarget(target) {
    return this.targets.find(target)
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

  // END COMMON FUNCTIONS


}