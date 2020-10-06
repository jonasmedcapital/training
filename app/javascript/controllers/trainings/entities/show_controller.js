import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["contentRow", "name", "link", "general", "addSpeaker", "addSpeakerAction", "addSpeakerInput", "speakerList", "editSpeakerDropdown", "editSpeakerInput", "questions", "figureMaterial", "uploadMaterial", "newUploadedMaterial", "fileNameMaterial", "material", "figureCover", "uploadCover", "fileNameCover", "newUploadedCover", "comments", "progressUploadCover", "progressUploadCoverBar", "labelUploadCover", "progressUploadCoverCounter", "progressUploadMaterial", "progressUploadMaterialBar", "labelUploadMaterial", "progressUploadMaterialCounter"]

  connect() {
    this.trainingSlug = location.pathname.split("/").pop()
    this.pagePreloader()
    this.getCurrentUserPermissions()
  }

  doShowPage() {
    var html = `<ul class="nav nav-justified nav-tabs" id="justifiedSettingsTab" role="tablist">
                  <li class="nav-item">
                    <a aria-controls="general" aria-selected="true" class="nav-link active" data-toggle="tab" href="#general" id="general-tab" role="tab">Informações</a>
                  </li>
                  <li class="nav-item">
                    <a aria-controls="sessions" aria-selected="true" class="nav-link" data-toggle="tab" href="#sessions" id="sessions-tab" role="tab">Sessões</a>
                  </li>
                  <li class="nav-item">
                    <a aria-controls="questions" aria-selected="true" class="nav-link" data-toggle="tab" href="#questions" id="questions-tab" role="tab">Perguntas</a>
                  </li>
                  <li class="nav-item">
                    <a aria-controls="material" aria-selected="true" class="nav-link" data-toggle="tab" href="#material" id="material-tab" role="tab">Material</a>
                  </li>
                  <li class="nav-item">
                    <a aria-controls="comments" aria-selected="true" class="nav-link" data-toggle="tab" href="#comments" id="comments-tab" role="tab">Comentários</a>
                  </li>
                  <li class="nav-item">
                    <a aria-controls="metrics" aria-selected="true" class="nav-link" data-toggle="tab" href="#metrics" id="metrics-tab" role="tab">Métricas</a>
                  </li>
                </ul>
                <div class="tab-content" id="justifiedSettingsTabContent">
                  <div aria-labelledby="general-tab" class="tab-pane fade show active" role="tabpanel" id="general"><div class="list-group" id="tableAccountTabContent" data-target="trainings--entities--show.general"></div></div>
                  <div aria-labelledby="sessions-tab" class="tab-pane fade" role="tabpanel" id="sessions"><div class="list-group" data-target="trainings--entities--show.sessions trainings--sessions--index.main" data-controller="trainings--sessions--index"></div></div>
                  <div aria-labelledby="questions-tab" class="tab-pane fade" role="tabpanel" id="questions"><div class="list-group" data-target="trainings--entities--show.questions"></div></div>
                  <div aria-labelledby="material-tab" class="tab-pane fade" role="tabpanel" id="material"><div class="list-group" data-target="trainings--entities--show.material"></div></div>
                  <div aria-labelledby="comments-tab" class="tab-pane fade" role="tabpanel" id="comments"><div class="list-group" data-target="trainings--entities--show.comments"></div></div>
                  <div aria-labelledby="metrics-tab" class="tab-pane fade" role="tabpanel" id="metrics"><div class="list-group" data-target="trainings--entities--show.metrics"></div></div>
                </div>`

    var controller = this
    new Promise(function (resolve) {
      resolve(controller.contentRowTarget.innerHTML = html)
    }).then(() => {
      controller.doHeaderInfoHtml()
      controller.doContentInfo()
      // controller.doSEOEditHtml()
      controller.doGeneralInfo()
      controller.doQuestionsFrameHtml()
      controller.doUploadHtml()
      controller.doCommentHtml()
    }) 
  }

  doHeaderInfoHtml() {
    // if (this.application.training_entities.can_copy) {
      var copyPath = `<button type="button" class="btn btn-sm btn-table copy p-0" data-toggle="tooltip" data-placement="right" title data-original-title="Copiar"><i class="material-icons md-sm md-light">share</i></button>`
    // } else {
      // var copyPath = ``
    // }
    this.nameTarget.innerHTML = `<strong>Treinamento </strong>| ${this.application.training.name}`
    this.linkTarget.innerHTML = `Link do Treinamento: <span data-copy="${this.application.training.public_path}">${copyPath}</span>`
    copy()
  }

  doContentInfo() {
    var training = this.application.training

    var html = `<div class="row my-3 d-flex justify-content-center">
                  <div class="col-12">
                    <div class="card border-top-primary">
                      <div class="card-body py-0">
                        <div class="col p-0">
                        <div class="table-responsive">
                          <table class="table table-sm table-hover table-search mb-0">
                            <thead>
                              <tr>
                                <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle">Total de Sessões</th>
                                <th scope="col" class="p-1 table-20 align-middle"><strong>${training.total_sessions}</strong></th>
                                <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle">Total de Aulas</th>
                                <th scope="col" class="p-1 table-20 align-middle"><strong>${training.total_lessons}</strong></th>
                                <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle">Duração Total</th>
                                <th scope="col" class="p-1 table-30 align-middle"><strong>${this.getControllerByIdentifier("app--helpers--time").doDurationFormat(training.duration)}</strong></th>
                              </tr>
                            </thead>
                          </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`

    this.generalTarget.insertAdjacentHTML("beforeend", html)
  }

  doGeneralInfo() {
    var training = this.application.training

    var html = `<div class="row d-flex justify-content-center">
                  <div class="col-6">
                    <div class="card border-top-primary">
                      <div class="card-body">
                        <h6>Descrição</h6>
                        <div class="card-text pointer" data-action="click->trainings--entities--show#editTraining">${training.description}</div>
                        <textarea autofocus data-field="description" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-6" data-controller="trainings--speakers--index" data-target="trainings--speakers--index.speakersCard"></div>
                </div>`

    this.generalTarget.insertAdjacentHTML("beforeend", html)
  }

  doQuestionsFrameHtml() {
    var training = this.application.training

    var html = `<div class="row my-3" style="height:20rem;border:1px dashed #50514F;">
                  <div class="col-4">
                    <div class="row h-15">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <h4 class="text-center text-bold"># Pergunta 1</h4>
                      </div>
                    </div>
                    <div class="row h-30">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <h5 class="text-center pointer" data-action="click->trainings--entities--show#editTraining">${training.question_one}</h5>
                        <textarea autofocus data-field="question_one" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                    <div class="row h-50">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <p class="text-center pointer" data-action="click->trainings--entities--show#editTraining">${training.answer_one}</p>
                        <textarea autofocus data-field="answer_one" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="row h-15">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <h4 class="text-center text-bold"># Pergunta 2</h4>
                      </div>
                    </div>
                    <div class="row h-30">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <h5 class="text-center pointer" data-action="click->trainings--entities--show#editTraining">${training.question_two}</h5>
                        <textarea autofocus data-field="question_two" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                    <div class="row h-50">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <p class="text-center pointer" data-action="click->trainings--entities--show#editTraining">${training.answer_two}</p>
                        <textarea autofocus data-field="answer_two" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="row h-15">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <h4 class="text-center text-bold"># Pergunta 3</h4>
                      </div>
                    </div>
                    <div class="row h-30">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <h5 class="text-center pointer" data-action="click->trainings--entities--show#editTraining">${training.question_three}</h5>
                        <textarea autofocus data-field="question_three" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                    <div class="row h-50">
                      <div class="col-12 d-flex align-items-center justify-content-center">
                        <p class="text-center pointer" data-action="click->trainings--entities--show#editTraining">${training.answer_three}</p>
                        <textarea autofocus data-field="answer_three" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                  </div>
                </div>`

    this.questionsTarget.insertAdjacentHTML("beforeend", html)
  }

  doUploadHtml() {
    var training = this.application.training

    if (training.material_url) {
      var materialHtml = `<span class="material-icons" data-url="${training.material_url}" alt="material" data-action="click->trainings--entities--show#trainingMaterial">get_app</span>
                          <figcaption class="figure-caption mt-3">Material</figcaption>`
    } else {
      var materialHtml = `<span class="fa-stack">
                            <i class="fas fa-book fa-stack-2x"></i>
                            <i class="fas fa-ban fa-stack-2x" style="color:#EFEFEF;"></i>
                          </span>
                          <figcaption class="figure-caption mt-3">Sem Material</figcaption>`
    }

    if (training.cover_url) {
      var coverHtml = `<img src="${training.cover_url}" alt="cover" width="100%;">
                      <figcaption class="figure-caption mt-3">Cover</figcaption>`
    } else {
      var coverHtml = `<span class="fa-stack">
                        <i class="far fa-bookmark fa-stack-2x"></i>
                        <i class="fas fa-ban fa-stack-2x" style="color:#EFEFEF;"></i>
                      </span>
                      <figcaption class="figure-caption mt-3">Sem Cover</figcaption>`
    }

    var html = `<div class="row my-3" style="height:20rem;border:1px dashed #50514F;">
                  <div class="col-6">
                    <div class="row h-50">
                      <div class="col-12 d-flex align-items-end justify-content-center">
                        <h4 class="title-two text-center pointer" data-action="click->trainings--entities--show#editTraining">${training.material_name}</h4>
                        <textarea autofocus data-field="material_name" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                    <div class="row h-50">
                      <div class="col-12 py-3 d-flex align-items-start justify-content-center">
                        <p class="subtitle-two text-center pointer" data-action="click->trainings--entities--show#editTraining">${training.material_description}</p>
                        <textarea autofocus data-field="material_description" data-action="keyup->trainings--entities--show#saveTraining change->trainings--entities--show#saveTraining blur->trainings--entities--show#saveTraining" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row d-flex align-items-center h-100">
                      <div class="col-4 py-3 d-flex align-items-center justify-content-center figureMaterial" data-target="trainings--entities--show.figureMaterial" data-field="material">
                        <figure class="figure btn btn-flat text-center s-title-1rem" data-action="click->trainings--entities--show#uploadFile" style="border:1px dashed #50514F;">
                          ${materialHtml}
                        </figure>
                      </div>
                      <div class="col-8 py-2 d-flex align-items-center justify-content-center d-none" data-target="trainings--entities--show.uploadMaterial">
                        <div class="form-group form-valid-group my-0 text-center">
                          <input data-direct-upload-url="http://localhost:3000/rails/active_storage/direct_uploads" type="file" id="trainingMaterial" name="trainingMaterial" class="file-input" data-action="change->trainings--entities--show#saveUpload click->trainings--entities--show#saveUpload" data-field="material">
                          <label for="trainingMaterial" id="trainingMaterialLabelForm" class="btn btn-primary" data-target="trainings--entities--show.labelUploadMaterial">Selecione o Material</label>
                          <span class="fileNameForm" class="mx-2"></span>
                          <h4 class="progress" style="display: none">Progress: <span class="progress_count"></span>%</h4>
                          <span data-target="trainings--entities--show.fileNameMaterial" class="d-block"></span>
                          <div class="progress d-none" style="height: 6px;overflow: inherit;" data-target="trainings--entities--show.progressUploadMaterial">
                            <div class="progress-bar" role="progressbar" style="width:0%;border-bottom:0.5rem solid #053B5E;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-target="trainings--entities--show.progressUploadMaterialBar"></div>
                          </div>
                          <span class="d-none" data-target="trainings--entities--show.progressUploadMaterialCounter" class="d-block"></span>
                        </div>
                        <button type="button" class="close ml-3" data-dismiss="modal" data-action="click->trainings--entities--show#cancelUpload" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="col-4 py-3 d-flex align-items-center justify-content-center d-none" data-target="trainings--entities--show.newUploadedMaterial"></div>
                    </div>
                  </div>
                </div>
                <div class="row my-3" style="height:20rem;border:1px dashed #50514F;">
                  <div class="col-6 d-flex align-items-center">
                    <div class="row h-10">
                      <div class="col-12 d-flex align-items-end justify-content-center">
                        <h4 class="title-two text-center">Imagem da Página do Treinamento</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row d-flex align-items-center h-100">
                      <div class="col-4 py-3 d-flex align-items-center justify-content-center figureCover" data-target="trainings--entities--show.figureCover" data-field="cover">
                        <figure class="figure btn btn-flat text-center s-title-1rem" data-action="click->trainings--entities--show#uploadFile" style="border:1px dashed #50514F;">
                          ${coverHtml}
                        </figure>
                      </div>
                      <div class="col-8 py-2 d-flex align-items-center justify-content-center d-none" data-target="trainings--entities--show.uploadCover">
                        <div class="form-group form-valid-group my-0 text-center">
                          <input data-direct-upload-url="http://localhost:3000/rails/active_storage/direct_uploads" type="file" id="trainingCover" name="trainingCover" class="file-input" data-action="change->trainings--entities--show#saveUpload click->trainings--entities--show#saveUpload" data-field="cover">
                          <label for="trainingCover" id="trainingCoverLabelForm" class="btn btn-primary" data-target="trainings--entities--show.labelUploadCover">Selecione uma Imagem</label>
                          <span class="fileNameForm" class="mx-2"></span>
                          <h4 class="progress" style="display: none">Progress: <span class="progress_count"></span>%</h4>
                          <span data-target="trainings--entities--show.fileNameCover" class="d-block"></span>
                          <div class="progress d-none" style="height: 6px;overflow: inherit;" data-target="trainings--entities--show.progressUploadCover">
                            <div class="progress-bar" role="progressbar" style="width:0%;border-bottom:0.5rem solid #053B5E;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-target="trainings--entities--show.progressUploadCoverBar"></div>
                          </div>
                          <span class="d-none" data-target="trainings--entities--show.progressUploadCoverCounter" class="d-block"></span>
                        </div>
                        <button type="button" class="close ml-3" data-dismiss="modal" data-action="click->trainings--entities--show#cancelUpload" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="col-4 py-3 d-flex align-items-center justify-content-center d-none" data-target="trainings--entities--show.newUploadedCover"></div>
                    </div>
                  </div>
                </div>`

    this.materialTarget.insertAdjacentHTML("beforeend", html)
  }

  doCommentHtml() {

    var html = `<div class="content pt-3" data-controller="trainings--comments--index">
                  <div data-target="trainings--comments--index.commentInput"></div>
                  <div data-target="trainings--comments--index.commentList"></div>
                </div>`

    this.commentsTarget.insertAdjacentHTML("beforeend", html)
  }

  trainingMaterial(ev) {
    var url = ev.target.dataset.url
    window.open(url, `_blank`)
  }

  uploadFile(ev) {
    if (ev.target.closest(".figureCover")) {
      this.uploadCoverTarget.classList.remove("d-none")
    } else if (ev.target.closest(".figureMaterial")) {
      this.uploadMaterialTarget.classList.remove("d-none")
    }
  }

  cancelUpload() {
    this.uploadMaterialTarget.classList.add("d-none")
    this.uploadCoverTarget.classList.add("d-none")
  }

  progressCount(value, field) {
    var controller = this

    if (field == "cover") {
      this.progressUploadCoverBarTarget.style.width = value + `%`
      var i = 0
      if (value != 100) {
        this.refreshTimer = setInterval(function () {
          controller.progressUploadCoverBarTarget.style.width = Math.floor(i + 1) + `%`
          controller.progressUploadCoverCounterTarget.innerText = Math.floor(i + 1) + `%`
          i++
          if (i == 95) {
            i = 94
          }
        }, 500);
      }
    } else if (field == "material") {
      this.progressUploadMaterialBarTarget.style.width = value + `%`
      var i = 0
      if (value != 100) {
        this.refreshTimer = setInterval(function () {
          controller.progressUploadMaterialBarTarget.style.width = Math.floor(i + 1) + `%`
          controller.progressUploadMaterialCounterTarget.innerText = Math.floor(i + 1) + `%`
          i++
          if (i == 95) {
            i = 94
          }
        }, 500);
      }
    }
  }

  saveUpload(ev) {

    if (ev.type == "click" && ev.target.type == "submit") {
      var formData = new FormData();
      var field = ev.target.dataset.field
      formData.append('course_id', this.application.training.id);
      formData.append('file', this.file);
      formData.append('file_name', this.file.name);
      formData.append('user_id', currentUser.id);
      formData.append('field', field);

      const token = $('meta[name=csrf-token]').attr('content');
      const url = "/trainings/entities/save_upload"
      const init = { method: "PUT", credentials: "same-origin", headers: { "X-CSRF-Token": token }, body: formData }

      if (field == "cover") {
        this.progressUploadCoverTarget.classList.remove("d-none")
        this.progressUploadCoverCounterTarget.classList.remove("d-none")
        this.labelUploadCoverTarget.classList.remove("btn-primary")
        this.labelUploadCoverTarget.classList.add("btn-disabled")
      } else if (field == "material") {
        this.progressUploadMaterialTarget.classList.remove("d-none")
        this.progressUploadMaterialCounterTarget.classList.remove("d-none")
        this.labelUploadMaterialTarget.classList.remove("btn-primary")
        this.labelUploadMaterialTarget.classList.add("btn-disabled")
      }
      this.progressCount(0, field)
      ev.target.type = "file"
      ev.preventDefault()
      var controller = this
      fetch(url, init)
        .then(response => response.json())
        .then(response => {
          controller.progressCount(100, field)
          controller.stopRefreshing()
          this.application.training = response.data.cln
          if (response.save) {
            if (field == "cover") {
              controller.uploadCoverTarget.remove()
              controller.figureCoverTarget.innerHTML = ""
              controller.newUploadedCoverTarget.classList.remove("d-none")
              controller.newUploadedCoverTarget.innerHTML = `<figure class="figure btn btn-flat text-center s-title-1rem">
                                                              <img src="${this.application.training.cover_url}" alt="${this.application.training.title}" width="100%;">
                                                              <figcaption class="figure-caption mt-3">Cover</figcaption>
                                                            </figure>`
            } else if (field == "material") {
              controller.uploadMaterialTarget.remove()
              controller.figureMaterialTarget.remove()
              controller.newUploadedMaterialTarget.classList.remove("d-none")
              controller.newUploadedMaterialTarget.innerHTML = `<figure class="figure btn btn-flat text-center s-title-1rem">
                                                                  <span class="material-icons" data-url="${this.application.training.material_url}" alt="${this.application.training.material_name}" data-action="click->trainings--entities--show#trainingMaterial">get_app</span>
                                                                  <figcaption class="figure-caption mt-3">Material</figcaption>
                                                                </figure>`
            }
          } else {
          }
          processingSnackbar(response.type, response.message) //, device, 3000)
        })
        .catch(error => {
          processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError(), device)
        })

    } else if (ev.type == "change" && ev.target.type == "file") {
      this.file = ev.target.files[0]
      if (ev.target.dataset.field == "material") {
        this.fileNameMaterialTarget.innerText = ev.target.files[0].name
      } else if (ev.target.dataset.field == "cover") {
        this.fileNameCoverTarget.innerText = ev.target.files[0].name
      }
      ev.target.type = "submit"
      ev.target.nextElementSibling.innerText = "SALVAR IMAGEM"
    }

  }

  editTraining(ev) {
    var span = ev.target
    var input = ev.target.nextElementSibling
    span.classList.add("d-none")
    input.classList.remove("d-none")
    input.value = span.innerText
    input.focus()
  }

  saveTraining(ev) {
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
      if (value != span.innerText) {
        this.bindOutput(span, field, value)
        const data = { training: { id: this.application.training.id, value: value, field: field }, current_user: { current_user_id: currentUser.id } }
        this.requestUpdate(data)
      }
    }
  }

  bindOutput(span, field, value) {
    if (field == "") {
      this.btnCtaTarget.innerText = value
      span.innerText = value
    } else {
      span.innerText = value
    }
  }

  requestUpdate(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/entities/update"
    const init = { method: "PUT", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          controller.application.training = response.data.cln
        }
        processingSnackbar(response.type, response.message) //, device)
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError()) //, device)
        console.log(error)
      })
  }

  getTraining() {
    var data = { training: { slug: this.trainingSlug }, current_user: { current_user_id: currentUser.id } }
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/entities/read"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.process) {
          controller.application.training = response.data.cln
          controller.application.sessions = controller.application.training.sessions_list
          controller.application.speakers = controller.application.training.speakers_list
          controller.application.comments = controller.application.training.comments_list
          $('#breadcrumbName').html(controller.application.training.name)
          controller.doShowPage()
          controller.fetchAllSpeakers()
        } else {
          processingSnackbar(response.type, response.message) //, device)
        }
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError()) //, device)
      })
  }

  fetchAllSpeakers() {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/contents/authors/list"
    const data = { author: { active: true }, current_user: { current_user_id: currentUser.id } }
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        this.application.all_speakers = response.data.cln.collection
      })
  }

  getCurrentUserPermissions() {
    // const featureNames = ["training_entities", "training_sessions", "training_comments"]
    // const data = { permission: { features: featureNames }, current_user: { current_user_id: currentUser.id } }
    // const token = $('meta[name=csrf-token]').attr('content');
    // const url = "/users/permissions/list_by_features"
    // const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    // fetch(url, init)
    //   .then(response => response.json())
    //   .then(response => {
    //     response.data.cln.forEach(permission => {
    //       controller.application[permission.name] = permission.data
    //     });

    //     if (controller.application.training_entities.can_read) {
      // }
      // })
      controller.getTraining()
      controller.getControllerByIdentifier("identifier")
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

  pagePreloader() {
    const headerHtml = `<div class='card timeline-item m-0 p-1 w-10' style="box-shadow:none;">
                          <div class='animated-background animated-background-5'>
                            <div class='background-masker title'></div>
                          </div>
                        </div>`

    var contentHtml = `<ul class="nav nav-justified nav-tabs timeline-item-nav-tab" id="justifiedSettingsTab" role="tablist">
                        <li class="nav-item">
                          <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;">
                            <div class='animated-background animated-background-5'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </li>
                        <li class="nav-item">
                          <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;">
                            <div class='animated-background animated-background-5'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </li>
                        <li class="nav-item">
                          <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;">
                            <div class='animated-background animated-background-5'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </li>
                        <li class="nav-item">
                          <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;">
                            <div class='animated-background animated-background-5'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </li>
                        <li class="nav-item">
                          <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;">
                            <div class='animated-background animated-background-5'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </li> 
                        <li class="nav-item">
                          <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;">
                            <div class='animated-background animated-background-5'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </li>                       
                      </ul>
                      <div class="row">
                        <div class="col-12">
                          <div class='card timeline-item-100 my-2'>
                            <div class='animated-background animated-background-20'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-3">
                          <div class='card timeline-item-100 my-2'>
                            <div class='animated-background animated-background-20'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class='card timeline-item-100 my-2'>
                            <div class='animated-background animated-background-20'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class='card timeline-item-100 my-2'>
                            <div class='animated-background animated-background-20'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class='card timeline-item-100 my-2'>
                            <div class='animated-background animated-background-20'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>
                        </div>
                      </div>`

    this.nameTarget.innerHTML = headerHtml
    this.linkTarget.innerHTML = headerHtml
    this.contentRowTarget.innerHTML = contentHtml
  }
}
