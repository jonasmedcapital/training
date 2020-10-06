import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["uploadVideo", "fileNameVideo", "noVideo", "newUploadedVideo", "video", "progressUploadVideo", "progressUploadVideoBar", "labelUploadVideo", "collapseTable"]

  connect() {
  }

  deleteLesson() {
    const data = { lesson: { id: this.element.dataset.id, active: false }, current_user: { current_user_id: currentUser.id } }
    this.requestUpdate(data)
    untooltip()
  }

  showCollapseTable(ev) {
    if (ev.target.clicked) {
      ev.target.clicked = false
      this.collapseTableTarget.classList.add("d-none")  
    } else {
      ev.target.clicked = true
      this.collapseTableTarget.classList.remove("d-none")  
    }
    
  }

  editUnit(ev) {
    var trix = this.getControllerByIdentifier("app--helpers--strings").fromStringToBoolean(ev.target.parentElement.dataset.trix)
    

    if (trix) {
      var span = ev.target.parentElement
      var input = ev.target.parentElement.nextElementSibling
      span.classList.add("d-none")
      input.classList.remove("d-none")
      input.lastElementChild.value = span.innerHTML
      input.firstElementChild.value = span.innerHTML
      input.lastElementChild.focus()
    } else {
      var span = ev.target
      var input = ev.target.nextElementSibling
      span.classList.add("d-none")
      input.classList.remove("d-none")
      input.value = span.innerText
      input.focus()
    }
    
  }

  saveUnit(ev) {
    var trix = this.getControllerByIdentifier("app--helpers--strings").fromStringToBoolean(ev.target.parentElement.dataset.trix)

    if (trix) {
      var span = ev.target.parentElement.previousElementSibling
      var input = ev.target.parentElement
      var value = input.firstElementChild.value
      var field = input.dataset.field
      var comparison = value != span.innerText
    } else {
      var span = ev.target.previousElementSibling
      var input = ev.target
      var value = input.value.trim()
      var field = input.dataset.field
      var comparison = value != span.innerText
    }

    if ((ev.type == "keyup" && ev.key == "Escape" && ev.shiftKey == false)) {
      span.classList.remove("d-none")
      input.classList.add("d-none")
    } else if ((ev.type == "keyup" && ev.key == "Enter" && ev.shiftKey == false) || ev.type == "blur") {
      ev.preventDefault()
      span.classList.remove("d-none")
      input.classList.add("d-none")
      if (comparison && value != "") {
        this.bindOutput(span, field, value)
        const data = { lesson: { id: this.element.dataset.id, value: value, field: field }, current_user: { current_user_id: currentUser.id } }
        this.requestUpdate(data)
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

  requestUpdate(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/lessons/update"
    const init = { method: "PUT", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var lesson = response.data.cln
          var lessons = this.getControllerByIdentifier("trainings--lessons--index").lessons
          if (lesson.active) {
            lessons.forEach((element, i) => {
              if (element.id == lesson.id) {
                lessons.splice(lessons.indexOf(element), 1, lesson)
              }
            })
          } else {
            lessons.forEach((element, i) => {
              if (element.id == lesson.id) {
                lessons.splice(lessons.indexOf(element), 1)
              }
            })
          }

          this.getControllerByIdentifier("trainings--lessons--index").listLessons()
          tooltip()
        }
        processingSnackbar(response.type, response.message) //, device)
      })
      .catch(error => {
        processingSnackbar("danger", "Aconteceu um erro, favor atualizar a página. Se o erro persistir, favor entrar em contato no develop@medcapital.com.br", device)
      })
  }

  addVideo(ev) {
    this.uploadVideoTarget.classList.remove("d-none")
    if (this.hasNoVideoTarget) {
      this.noVideoTarget.classList.add("d-none")
    }
    if (this.hasVideoTarget) {
      this.videoTarget.classList.add("d-none")
    }
  }

  cancelUpload() {
    this.uploadVideoTarget.classList.add("d-none")
    this.noVideoTarget.classList.remove("d-none")
  }

  progressCount(value) {
    this.progressUploadVideoBarTarget.style.width = value + `%`

    var controller = this
    var i = 0
    if (value != 100) {
      this.refreshTimer = setInterval(function () {
        controller.progressUploadVideoBarTarget.style.width = Math.floor(i + 1) + `%`
        i++
        if (i == 95) {
          i = 94
        }
      }, 500);
    }
  }

  saveUpload(ev) {

    if (ev.type == "click" && ev.target.type == "submit") {
      var formData = new FormData();
      var field = ev.target.dataset.field
      formData.append('lesson_id', this.element.dataset.id);
      formData.append('file', this.file);
      formData.append('file_name', this.file.name);
      formData.append('user_id', currentUser.id);
      formData.append('field', field);

      const token = $('meta[name=csrf-token]').attr('content');
      const url = "/trainings/lessons/save_upload"
      const init = { method: "PUT", credentials: "same-origin", headers: { "X-CSRF-Token": token }, body: formData }
      var controller = this
      this.progressUploadVideoTarget.classList.remove("d-none")
      this.progressCount(0)
      this.labelUploadVideoTarget.classList.remove("btn-primary")
      this.labelUploadVideoTarget.classList.add("btn-disabled")
      this.labelUploadVideoTarget.classList.add("progress")
      fetch(url, init)
        .then(response => response.json())
        .then(response => {
          this.progressCount(100)
          this.stopRefreshing()
          this.application.training = response.data.cln
          if (response.save) {
            var lesson = response.data.cln
            var lessons = this.getControllerByIdentifier("trainings--lessons--index").lessons
            lessons.forEach((element, i) => {
              if (element.id == lesson.id) {
                lessons.splice(lessons.indexOf(element), 1, lesson)
              }
            })
            controller.uploadVideoTarget.remove()
            if (this.hasNoVideoTarget) {
              this.noVideoTarget.classList.add("d-none")
            }
            if (this.hasVideoTarget) {
              this.videoTarget.classList.add("d-none")
            }
            controller.newUploadedVideoTarget.classList.remove("d-none")
            controller.newUploadedVideoTarget.innerHTML = `<video controls height="100">
                                                            <source src="${lesson.video_url}" type="video/ogg">
                                                            Seu navegador não suporta o elemento <code>video</code>.
                                                          </video>`
          } else {
          }
          processingSnackbar(response.type, response.message, device, 3000)
        })
        .catch(error => {
          processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError(), device)
        })

    } else if (ev.type == "change" && ev.target.type == "file") {
      this.file = ev.target.files[0]
      if (ev.target.dataset.field == "video") {
        this.fileNameVideoTarget.innerText = ev.target.files[0].name
      }
      ev.target.type = "submit"
      ev.target.nextElementSibling.innerText = "SALVAR VÍDEO"
    }

  }

  lessonPartial(element) {

    // if (element.video_url) {
    //   var videoHtml = `<video controls height="100" data-target="trainings--lessons--unit.video">
    //                     <source src="${element.video_url}" type="video/ogg">
    //                     Seu navegador não suporta o elemento <code>video</code>.
    //                   </video>`
    // } else {
    //   var videoHtml = `<span class="fa-stack fa-2x" data-target="trainings--lessons--unit.noVideo">
    //                     <i class="fab fa-youtube fa-stack-2x"></i>
    //                     <i class="fas fa-ban fa-stack-2x" style="color:#EFEFEF;"></i>
    //                   </span>`
    // }
    //  Link da Aula
    //  `<button type="button" class="btn btn-sm btn-table p-0 ml-1" data-toggle="tooltip" data-placement="top" title data-original-title="Adicionar Vídeo"><span class="material-icons md-sm md-dark" data-action="click->trainings--lessons--unit#addVideo">queue</span></button>`
    // `${videoHtml}
    // <div class="py-2 d-flex align-items-center justify-content-center d-none" data-target="trainings--lessons--unit.uploadVideo">
    //   <div class="form-group form-valid-group my-0 text-center">
    //     <input data-direct-upload-url="http://localhost:3000/rails/active_storage/direct_uploads" type="file" id="lessonVideo-${element.id}" name="lessonVideo-${element.id}" class="file-input" data-action="change->trainings--lessons--unit#saveUpload click->trainings--lessons--unit#saveUpload" data-field="video">
    //     <label for="lessonVideo-${element.id}" id="lessonVideo-${element.id}-LabelForm" class="btn btn-primary" data-target="trainings--lessons--unit.labelUploadVideo">Selecione o Video</label>
    //     <span data-target="trainings--lessons--unit.fileNameVideo" class="d-block"></span>
    //     <div class="progress d-none" style="height: 6px;overflow: inherit;" data-target="trainings--lessons--unit.progressUploadVideo">
    //       <div class="progress-bar" role="progressbar" style="width:0%;border-bottom:0.5rem solid #053B5E;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-target="trainings--lessons--unit.progressUploadVideoBar"></div>
    //     </div>
    //   </div>
    //   <button type="button" class="close ml-3" data-dismiss="modal" data-action="click->trainings--lessons--unit#cancelUpload" aria-label="Close">
    //     <span aria-hidden="true">&times;</span>
    //   </button>
    // </div>`

    var html = `<div class="card my-3" data-id="${element.id}" data-controller="trainings--lessons--unit">
                  <div class="card-body py-0 px-1">
                    <table class="table table-sm" style="font-size:80%;">
                      <tbody>
                        <tr style="height:45px;">
                          <td class="table-5 align-middle pointer px-0 text-center" style="height:inherit;" rowspan="2">
                            <span class="text-bold" data-action="click->trainings--lessons--unit#editUnit">${element.order}</span>
                            <input autofocus data-field="order" data-action="keyup->trainings--lessons--unit#saveUnit change->trainings--lessons--unit#saveUnit blur->trainings--lessons--unit#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="number" required>
                          </td>
                          <td style="font-size:80%;" scope="col" class="p-1 table-40 align-middle">Nome da Aula</td>
                          <td class="p-1 table-5 pointer text-center align-middle"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Mostrar Descrição e Transcrição"><span class="material-icons md-sm md-dark" data-action="click->trainings--lessons--unit#showCollapseTable">description</span></button></td>
                          <td style="font-size:80%;" scope="col" class="p-1 table-30 align-middle text-center">
                            Link da Aula
                          </td>
                          <td style="font-size:80%;" scope="col" class="p-1 table-20 align-middle text-center">Tempo em Segundos</td>
                          <td class="p-1 table-5 pointer text-center align-middle"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Apagar Aula"><span class="material-icons md-sm md-dark" data-action="click->trainings--lessons--unit#deleteLesson">delete</span></button></td>
                        </tr>
                        <tr style="height:45px;">
                          <td scope="col" class="p-1 align-middle pointer">
                            <span class="text-bold" data-action="click->trainings--lessons--unit#editUnit">${element.name}</span>
                            <input autofocus data-field="name" data-action="keyup->trainings--lessons--unit#saveUnit change->trainings--lessons--unit#saveUnit blur->trainings--lessons--unit#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required>
                          </td>
                          <td></td>
                          <td scope="col" class="p-1 align-middle pointer text-center" data-target="trainings--lessons--unit.newUploadedVideo">
                            <span class="text-bold" data-action="click->trainings--lessons--unit#editUnit">${element.link}</span>
                            <input autofocus data-field="link" data-action="keyup->trainings--lessons--unit#saveUnit change->trainings--lessons--unit#saveUnit blur->trainings--lessons--unit#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required>
                          </td>
                          <td scope="col" class="p-1 align-middle pointer text-center">
                            <span class="text-bold" data-action="click->trainings--lessons--unit#editUnit">${element.duration}</span>
                            <input autofocus data-field="duration" data-action="keyup->trainings--lessons--unit#saveUnit change->trainings--lessons--unit#saveUnit blur->trainings--lessons--unit#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="number" required>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table class="table table-sm d-none" style="font-size:80%;" data-target="trainings--lessons--unit.collapseTable">
                      <tbody>
                        <tr style="height:45px;">
                          <td style="font-size:80%;" scope="col" class="p-1 table-30 align-middle">Descrição Aula</td>
                          <td scope="col" class="p-1 align-middle table-70 pointer">
                            <span class="text-bold trix-content" data-trix="true" data-action="click->trainings--lessons--unit#editUnit">${element.description}</span>
                            <span class="d-none">
                              <input type="hidden" class="form-control" id="descriptionLessonForm-${element.id}" placeholder="Texto" data-target="trainings--comments--index.commentBody">
                              <trix-editor style="font-size: 0.85rem !important;" input="descriptionLessonForm-${element.id}" data-trix="true" data-field="description" class="trix-content trix-med textarea p-1" rows="3" placeholder="Descrição" data-action="keyup->trainings--lessons--unit#saveUnit change->trainings--lessons--unit#saveUnit blur->trainings--lessons--unit#saveUnit" data-target="trainings--comments--index.commentBodyTrix"></trix-editor>
                            </span>
                          </td>
                        </tr>
                         <tr style="height:45px;">
                          <td style="font-size:80%;" scope="col" class="p-1 table-30 align-middle">Transcrição Aula</td>
                          <td scope="col" class="p-1 align-middle table-70 pointer">
                            <span class="text-bold trix-content" data-trix="true" data-action="click->trainings--lessons--unit#editUnit">${element.transcription}</span>
                            <span class="d-none">
                              <input type="hidden" class="form-control" id="transcriptionLessonForm-${element.id}" placeholder="Texto" data-target="trainings--comments--index.commentBody">
                              <trix-editor style="font-size: 0.85rem !important;" input="transcriptionLessonForm-${element.id}" data-trix="true" data-field="transcription" class="trix-content trix-med textarea p-1" rows="3" placeholder="Transcrição" data-action="keyup->trainings--lessons--unit#saveUnit change->trainings--lessons--unit#saveUnit blur->trainings--lessons--unit#saveUnit" data-target="trainings--comments--index.commentBodyTrix"></trix-editor>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>`

    return html
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

  stopRefreshing() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }

}
