import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["addSpeakerAction", "addSpeakerInput", "editSpeakerDropdown", "editSpeakerInput", "speakerList", "cardBodySpeaker",
                    "speakersCard", "8888", "9999"]

  connect() {
    this.doSpeakerIndexHtml()
  }

  listSpeakers() {
    var allSpeakers = this.sortByKeyAsc(this.application.speakers, "speaker_name")
    this.cardBodySpeakerTarget.innerHTML = ""
    allSpeakers.forEach(element => {
      this.cardBodySpeakerTarget.insertAdjacentHTML("beforeend", this.getControllerByIdentifier("trainings--speakers--unit").speakerPartial(element))
    });
    this.getControllerByIdentifier("app--helpers--elements").tooltip()
  }

  addSpeaker(ev) {
    this.addSpeakerActionTarget.classList.add("d-none")
    this.addSpeakerInputTarget.classList.remove("d-none")

    var html = ``
    this.application.all_speakers.forEach(speaker => {
      html += `<li data-action="click->trainings--speakers--index#saveSpeaker" data-id="${speaker.id}" class="li-selector dark">${speaker.name}</li>`
    });
    this.speakerListTarget.innerHTML = html
    floatingLabel();
    selector()
  }

  cancelAddSpeaker() {
    this.addSpeakerActionTarget.classList.remove("d-none")
    this.addSpeakerInputTarget.classList.add("d-none")
  }

  saveSpeaker(ev) {
    this.editSpeakerDropdownTarget.value = ""
    this.editSpeakerInputTarget.innerText = ""
    const data = { speaker: { course_id: this.application.training.id, speaker_id: parseInt(ev.target.dataset.id) }, current_user: { current_user_id: currentUser.id } }
    this.cancelAddSpeaker()
    this.requestSaveSpeaker(data)
    floatingLabel()
    this.getControllerByIdentifier("app--helpers--elements").tooltip()
  }

  requestSaveSpeaker(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/speakers/create"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var speaker = response.data.cln
          controller.application.speakers[controller.application.speakers.length] = speaker
          controller.listSpeakers()
          // controller.cardBodySpeakerTarget.insertAdjacentHTML("beforeend", controller.getControllerByIdentifier("trainings--speakers--unit").speakerPartial(speaker))          
          controller.getControllerByIdentifier("app--helpers--elements").tooltip()
        }
        processingSnackbar(response.type, response.message, device)
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError(), device)
      })
  }
  
  doSpeakerIndexHtml() {
    var html = `<div class="card border-top-primary">
                  <div class="card-body">
                    <div class="row d-flex align-items-center">
                      <div style="width:100%;display:relative;">
                        <div class="card-header d-flex align-items-center card-header-table-list">
                          <h6 class="card-title display-4 card-title-table-list">Speakers</h6>
                          <div class="card-actions ml-auto py-0 mr-3" data-target="trainings--speakers--index.addSpeakerAction">
                            <span data-action="click->trainings--speakers--index#addSpeaker" data-controller="trainings--speakers--unit"><span class="material-icons pointer" data-toggle="tooltip" data-placement="top" title data-original-title="Adicionar Speaker">add</span></span>
                          </div>
                          <div class="card-actions py-0 mr-3 ml-5 w-100 d-flex align-items-center d-none" data-target="trainings--speakers--index.addSpeakerInput">
                            <div class="form-group board-task-filter my-0 w-100">
                              <div class="floating-label floating-label-sm">
                                <label>Selecione o Speaker</label>
                                <div class="dropdown dropdown-selector dropdown-valid-selector multiple" data-target="trainings--speakers--index.editSpeakerDropdown">
                                  <button class="dropdown-toggle form-control d-flex" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:32px;"><span class="mr-auto w-100 selected-item" data-target="trainings--speakers--index.editSpeakerInput"></span></button>
                                  <div class="dropdown-menu dropdown-menu-selector w-100 box-shadow-selector">
                                    <input class="form-control form-control-selector dropdown-search-input" type="text" placeholder="Buscar ...">
                                    <ul class="ul-select" data-target="trainings--speakers--index.speakerList"></ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-1 px-0 d-flex align-items-center text-right" data-action="click->trainings--speakers--index#cancelAddSpeaker"><span class="material-icons md-sm ml-auto pointer" data-toggle="tooltip" data-placement="top" title data-original-title="Cancelar Ação">clear</span></div>
                          </div>
                        </div>
                        <div class="card-body" style="overflow:scroll;" data-target="trainings--speakers--index.cardBodySpeaker">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`

    var controller  = this
    new Promise(function (resolve) {
      resolve(controller.speakersCardTarget.innerHTML = html)
    }).then(() => {
      controller.listSpeakers()
    })
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

  sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}
