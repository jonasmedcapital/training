import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["modal", "name", "title", "path", "contentTrainingDropdown", "contentTrainingInput", "contentList", "formatTrainingDropdown", "formatTrainingInput", "formatList", "sharingTrainingDropdown", "sharingTrainingInput", "sharingList", "description", "notes", "saveBtn", "input", "output", "validGroup", "kindTrainingDropdown", "kindTrainingInput", "kindList", "deleteBtn"]

  connect() {
  }

  saveTraining() {
    if (this.validateSelectors().valid) {
      this.stopRefreshing()
      this.saveBtnTarget.disabled = true
      if (this.hasDeleteBtnTarget) {
        this.deleteBtnTarget.disabled = true
      }
      var data = {
        training: {
          id: this.element.dataset.id,
          name: this.nameTarget.value,
          title: this.titleTarget.value,
          path: this.pathTarget.value,
          description: this.descriptionTarget.value,
          content: this.contentTrainingInputTarget.dataset.content,
          format: "free",
          kind: "training",
          sharing: this.sharingTrainingInputTarget.dataset.sharing,
          notes: this.notesTarget.value
        },
        current_user: { current_user_id: currentUser.id }
      }
      this.requestSave(data)
    } else {
      alert(this.validateSelectors().error)
    }
  }

  deleteTraining() {
    this.stopRefreshing()
    this.saveBtnTarget.disabled = true
    if (this.hasDeleteBtnTarget) {
      this.deleteBtnTarget.disabled = true
    }
    var data = { training: { id: this.element.dataset.id, active: false }, current_user: { current_user_id: currentUser.id } }
    this.requestSave(data)
  }

  requestSave(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    if (data.training.id) {
      var url = "/trainings/entities/update"
      var method = "PUT"
    } else {
      var url = "/trainings/entities/create"
      var method = "POST"
    }
    const init = { method: method, credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var training = response.data.cln
          this.close()
          if (this.getControllerByIdentifier("trainings--entities--index").nameTarget("viewTrainingBody")) {
            this.getControllerByIdentifier("trainings--entities--index").nameTarget("viewTrainingBody").remove()
            this.getControllerByIdentifier("trainings--entities--index").nameTarget("viewTitle").innerText = "Nenhum Treinamento Selecionado"
          }
          if (data.training.id) {
            if (training.active) {
              this.application.trainings.forEach((element, i) => {
                if (element.id == training.id) {
                  this.application.trainings.splice(this.application.trainings.indexOf(element), 1, training)
                }
              })
            } else {
              this.application.trainings.forEach((element, i) => {
                if (element.id == training.id) {
                  this.application.trainings.splice(this.application.trainings.indexOf(element), 1)
                }
              })
            }
          } else {
            this.application.trainings[this.application.trainings.length] = training
          }
          this.getControllerByIdentifier("trainings--entities--index").doDataTable()
        } else {
          this.saveBtnTarget.disabled = false
          if (this.hasDeleteBtnTarget) {
            this.deleteBtnTarget.disabled = true
          }
        }
        processingSnackbar(response.type, response.message) //, device)
      })
  }

  modalHtml(mode, trainingId) {

    // if (this.application.training_entities.can_create) {
      var saveBtnHtml = `<button type="button" class="btn btn-primary" data-action="click->trainings--entities--modal#saveTraining" data-target="trainings--entities--modal.saveBtn">Salvar</button>`
    // } else {
      // var saveBtnHtml = ``
    // }

    // if (this.application.training_entities.can_delete && mode == "edit") {
      var deleteBtnHtml = `<button type="button" class="btn btn-danger" data-action="click->trainings--entities--modal#deleteTraining" data-target="trainings--entities--modal.deleteBtn">Apagar</button>`
    // } else {
    //   var deleteBtnHtml = ``
    // }

    var html = `<div class="modal fade" data-controller="trainings--entities--modal" data-target="trainings--entities--modal.modal" id="trainingModal" tabindex="-1 role="dialog" aria-labelledby="trainingModalTitle" aria-hidden="true" data-id="${trainingId}" data-keyboard="false" data-backdrop="static">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header border-bottom">
                        <h6 class="modal-title"><strong>Novo Treinamento</strong></h6><br>
                        <button type="button" class="close" data-dismiss="modal" data-action="click->trainings--entities--modal#close" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body p-3" data-target="trainings--entities--modal.body">
                        <div class="row">
                          <div class="col-6">
                            <div class="form-group form-valid-group" data-target="trainings--entities--modal.validGroup" data-valid="false">
                              <div class="floating-label floating-label-sm">
                                <label for="nameTrainingForm">Nome</label>
                                <input aria-describedby="nameTrainingFormHelp" class="form-control form-valid-control" id="nameTrainingForm" data-target="trainings--entities--modal.name" data-action="blur->trainings--entities--modal#validateField focus->trainings--entities--modal#cleanValidations" placeholder="Nome" type="text" required>
                              </div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group form-valid-group" data-target="trainings--entities--modal.validGroup" data-valid="false">
                              <div class="floating-label floating-label-sm">
                                <label for="titleTrainingForm">Título</label>
                                <input aria-describedby="titleTrainingFormHelp" class="form-control form-valid-control" id="titleTrainingForm" data-action="keyup->trainings--entities--modal#bindInput blur->trainings--entities--modal#validateField focus->trainings--entities--modal#cleanValidations" data-target="trainings--entities--modal.title trainings--entities--modal.output" placeholder="Título" type="text" required>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <div class="form-group form-valid-group" data-target="trainings--entities--modal.validGroup" data-valid="false">
                              <div class="input-group input-group-sm">
                                <div class="floating-label floating-label-sm">
                                  <label for="pathTrainingForm">URL para Training</label>
                                  <input readonly aria-describedby="pathTrainingFormHelp" class="form-control form-valid-control" id="pathTrainingForm" data-target="trainings--entities--modal.path trainings--entities--modal.input" data-action="blur->trainings--entities--modal#validateField focus->trainings--entities--modal#cleanValidations" placeholder="URL do Treinamento" type="text" required>
                                </div>
                                <span class="input-group-icon mr-2">/</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <div class="form-group form-valid-group" data-target="trainings--entities--modal.validGroup" data-valid="false">
                              <div class="floating-label floating-label-sm">
                                <label for="descriptionTrainingForm">Descrição</label>
                                <textarea aria-describedby="descriptionTrainingFormHelp" class="form-control textarea form-valid-control" id="descriptionTrainingForm" placeholder="Descrição" type="text" required rows="3" data-target="trainings--entities--modal.description" data-action="blur->trainings--entities--modal#validateField focus->trainings--entities--modal#cleanValidations"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4 pr-1">
                            <div class="form-group">
                              <div class="floating-label floating-label-sm">
                                <label>Conteúdo</label>
                                <div class="dropdown dropdown-selector dropdown-valid-selector" data-target="trainings--entities--modal.contentTrainingDropdown">
                                  <button class="dropdown-toggle form-control d-flex" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:32px;"><span class="mr-auto w-100 selected-item" id="selected" data-target="trainings--entities--modal.contentTrainingInput"></span></button>
                                  <div class="dropdown-menu dropdown-menu-selector w-100 box-shadow-selector">
                                    <input class="form-control form-control-selector dropdown-search-input" type="text" placeholder="Buscar ...">
                                    <ul class="ul-select" data-target="trainings--entities--modal.contentList">
                                      <li data-content="education" class="li-selector dark" >Educação</li>
                                      <li data-content="development" class="li-selector dark" >Desenvolvimento</li>
                                      <li data-content="operation" class="li-selector dark" >Operação</li>
                                      <li data-content="financial" class="li-selector dark" >Financeiro</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-3 pl-1">
                            <div class="form-group">
                              <div class="floating-label floating-label-sm">
                                <label>Compartilhamento</label>
                                <div class="dropdown dropdown-selector dropdown-valid-selector" data-target="trainings--entities--modal.sharingTrainingDropdown">
                                  <button class="dropdown-toggle form-control d-flex" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:32px;"><span class="mr-auto w-100 selected-item" id="selected" data-target="trainings--entities--modal.sharingTrainingInput"></span></button>
                                  <div class="dropdown-menu dropdown-menu-selector w-100 box-shadow-selector">
                                    <input class="form-control form-control-selector dropdown-search-input" type="text" placeholder="Buscar ...">
                                    <ul class="ul-select" data-target="trainings--entities--modal.sharingList">
                                      <li data-sharing="client" class="li-selector dark">Clientes</li>
                                      <li data-sharing="intern" class="li-selector dark">Interno</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <div class="form-group">
                              <div class="floating-label floating-label-sm">
                                <label for="notesTrainingForm">Anotações</label>
                                <input aria-describedby="notesTrainingFormHelp" class="form-control" id="notesTrainingForm" data-target="trainings--entities--modal.notes" placeholder="Anotações" type="text" required>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer border-top">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-action="click->trainings--entities--modal#close" style="width:85px;">Fechar</button>
                        ${deleteBtnHtml}
                        ${saveBtnHtml}
                      </div>
                    </div>
                  </div>
                </div>`
    var controller = this
    new Promise(function (resolve) {
      resolve($('body').append(html))
    }).then(() => {
      this.application.getControllerForElementAndIdentifier(document.querySelector('#trainingModal'), "trainings--entities--modal").open()
      this.application.getControllerForElementAndIdentifier(document.querySelector('#trainingModal'), "trainings--entities--modal").refreshSaveBtn()
      this.application.getControllerForElementAndIdentifier(document.querySelector('#trainingModal'), "trainings--entities--modal").dataValidation(trainingId)
      if (mode == "edit") {
        this.application.getControllerForElementAndIdentifier(document.querySelector('#trainingModal'), "trainings--entities--modal").fetchTraining(trainingId)
      }
      changeStringToPath($('#pathTrainingForm'))
      selector()
    })
  }

  open() {
    document.body.classList.add("modal-open");
    this.element.setAttribute("style", "display: block;");
    this.element.classList.add("show");
    const html = `<div class="modal-backdrop fade show"></div>`
    document.body.insertAdjacentHTML("beforeend", html)
    floatingLabel();
    selector()
  }

  close() {
    document.body.classList.remove("modal-open");
    this.element.removeAttribute("style");
    this.element.classList.remove("show");
    document.getElementsByClassName("modal-backdrop")[0].remove();
    this.modalTarget.remove()
  }

  refreshSaveBtn() {
    var controller = this
    this.refreshTimer = setInterval(function () {
      var len = 0
      controller.validGroupTargets.forEach(element => {
        if (this.fromStringToBoolean(element.dataset.valid) == false) {
          len += 1
        }
      });
      if (len == 0) {
        controller.saveBtnTarget.disabled = false
      } else {
        controller.saveBtnTarget.disabled = true
      }
    }, 200);
  }

  fetchTraining(trainingId) {
    var training = ``
    this.application.trainings.forEach(element => {
      if (element.id == trainingId) {
        training = element
      }
    });

    
    this.nameTarget.value = training.name
    this.titleTarget.value = training.title
    this.pathTarget.value = training.path
    this.descriptionTarget.value = training.description
    this.notesTarget.value = training.notes
    this.contentTrainingDropdownTarget.value = training.content
    this.contentTrainingInputTarget.innerText = training.content_pretty
    this.sharingTrainingDropdownTarget.value = training.sharing
    this.sharingTrainingInputTarget.innerText = training.sharing_pretty

    this.validGroupTargets.forEach(element => {
      element.dataset.valid = true
    });

    this.getControllerByIdentifier("app--helpers--forms").floatingLabel()
  }

  dataValidation(trainingId) {
    this.nameTarget.dataset.objColumn = "name"
    this.nameTarget.dataset.filterColumn = "id"
    this.nameTarget.dataset.filterValue = trainingId
    this.titleTarget.dataset.objColumn = "title"
    this.titleTarget.dataset.filterColumn = "id"
    this.titleTarget.dataset.filterValue = trainingId
    this.pathTarget.dataset.objColumn = "path"
    this.pathTarget.dataset.filterColumn = "id"
    this.pathTarget.dataset.filterValue = trainingId
    this.descriptionTarget.dataset.objColumn = "description"
    this.descriptionTarget.dataset.filterColumn = "id"
    this.descriptionTarget.dataset.filterValue = trainingId
  }

  cleanValidations(ev) {
    ev.target.classList.remove("invalid-field")
    if (ev.target.nextElementSibling) {
      ev.target.nextElementSibling.remove()
    }
  }

  validateField(ev) {
    var data = {
      validations: {
        obj_column: ev.target.dataset.objColumn,
        obj_value: ev.target.value,
        filter_column: ev.target.dataset.filterColumn,
        filter_value: ev.target.dataset.filterValue,
      }
    }


    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/entities/validate_field"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.valid) {
          ev.target.closest(".form-valid-group").dataset.valid = true
        } else {
          ev.target.closest(".form-valid-group").dataset.valid = false
          ev.target.classList.add("invalid-field")
          const html = '<div class="invalid-warning my-1 py-1" data-target="trainings--entities--modal.invalid"></div>'
          ev.target.parentElement.insertAdjacentHTML("beforeend", html);
          response.messages.forEach(message => {
            ev.target.nextElementSibling.insertAdjacentHTML("beforeend", message);
          });
        }
      })
  }

  validateSelectors() {
    if (this.contentTrainingInputTarget.innerText == "") {
      return { valid: false, error: "Conteúdo não pode ficar em branco" }
    } else if (this.sharingTrainingInputTarget.innerText == "") {
      return { valid: false, error: "Compartilhamento não pode ficar em branco" }
    } else {
      return { valid: true }
    }
  }

  stopRefreshing() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }

  bindInput() {
    var value = this.outputTarget.value
    if (value.length >= 1) {
      this.inputTarget.focus()
      this.inputTarget.value = fromStringToPath(value)
      this.inputTarget.closest('.floating-label').classList.add("has-value")
      this.inputTarget.closest('.floating-label').classList.add("is-focused")
      this.inputTarget.blur()
      this.outputTarget.focus()
    }
  }

  fromStringToBoolean(string) {
    if (string === "true") {
      return true
    } else if (string === "false") {
      return false
    }
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

}
