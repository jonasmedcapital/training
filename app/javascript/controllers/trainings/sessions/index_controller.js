import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["main", "listCol", "showCol", "cardList", "cardBody", "listLoader", "viewSessionCard", "viewTitle", "viewSessionBody"]

  connect() { 
    this.doSessionIndexHtml()
  }

  newSession() {
    const data = { session: { course_id: this.application.training.id, name: "Nova Sessão", description: "Descrição da Sessão", order: this.application.sessions.length + 1 }, current_user: { current_user_id: currentUser.id } }
    this.requestCreate(data)
  }

  showSession(id) {
    var session = {}
    this.application.sessions.forEach(element => {
      if (element.id == id) {
        session = element
      }
    });

    if (this.hasViewSessionBodyTarget) {
      this.viewSessionBodyTarget.remove()
      this.viewTitleTarget.innerHTML = ""
    }
    
    this.viewTitleTarget.innerHTML = `<strong>Sessão: ${session.name}</strong>`
    var controller = this
    new Promise(function (resolve) {
      resolve(controller.viewSessionCardTarget.insertAdjacentHTML("beforeend", controller.viewSessionHtml(session)))
    }).then(() => {
      controller.viewSessionCardTarget.style.height = ($(window).height() * 0.65) + "px"
      tooltip()
    })

  }

  doSessionIndexHtml() {
    var html = ` <div class="row my-3">
                  <div class="col-4 px-1" id="trainingContentListCol" data-target="trainings--sessions--index.listCol" data-controller="trainings--sessions--unit">list</div>
                  <div class="col-8 px-1" id="trainingContentShowCol" data-target="trainings--sessions--index.showCol">show</div>
                </div>`

    var controller = this
    new Promise(function (resolve) {
      resolve(controller.mainTarget.innerHTML = html)
    }).then(() => {
      controller.doIndexListHtml()
      controller.doViewListHtml()
    })
  }

  doIndexListHtml() {
    var html = `<div class="card" style="width:100%;display:relative;" data-target="trainings--sessions--index.cardList">
                  <div class="card-header d-flex align-items-center card-header-table-list">
                    <h6 class="card-title display-4 card-title-table-list">Todos as Sessões</h6>
                    <div class="card-actions ml-auto py-0 mr-3">
                      <span data-toggle="tooltip" data-placement="top" title data-original-title="Nova Sessão"><span class="material-icons pointer" data-action="click->trainings--sessions--index#newSession">add</span></span>
                    </div>
                  </div>
                  <div class="card-body" style="overflow:scroll;" data-target="trainings--sessions--index.cardBody">
                    
                  </div>
                </div>`

    var controller = this
    new Promise(function (resolve) {
      resolve(controller.listColTarget.innerHTML = html)
    }).then(() => {
      controller.cardListTarget.style.height = ($(window).height() * 0.65) + "px"
      controller.cardBodyTarget.insertAdjacentHTML("beforeend", controller.doSessionListPreloader())
      controller.listSessions()
    })
  }

  doViewListHtml() {
    var html = `<div class="card" style="width:100%;display:relative;" data-target="trainings--sessions--index.viewSessionCard">
                  <div class="card-header d-flex align-items-center card-header-table-list">
                    <h6 class="card-title display-4" style="padding:1rem;font-size:110%;margin-bottom:0px;" data-target="trainings--sessions--index.viewTitle">Nenhuma Sessão Selecionada</h6>
                  </div>
                </div>`

    this.showColTarget.innerHTML = html
  }

  viewSessionHtml(session) {
    var html = `<div class="card-body pt-0" data-target="trainings--sessions--index.viewSessionBody" data-id="${session.id}" style="overflow:scroll;">
                  <div class="row d-flex align-items-center" style="height:4rem">
                    <div class="col-3 d-flex align-items-center">
                      <strong>Descrição da Sessão: </strong>
                    </div>
                    <div class="col-7 d-flex align-items-center" data-controller="trainings--sessions--unit" data-id="${session.id}">
                      <span class="text-bold pointer" data-action="click->trainings--sessions--unit#editUnit">${session.description}</span>
                      <textarea data-field="description" data-action="keyup->trainings--sessions--unit#saveUnit change->trainings--sessions--unit#saveUnit blur->trainings--sessions--unit#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required></textarea>
                    </div>
                    <div class="col-2 d-flex align-items-center">
                      <span class="text-bold">${this.getControllerByIdentifier("app--helpers--time").doDurationFormat(session.duration)}</span>
                    </div>
                  </div>
                  <div class="row d-flex align-items-center" data-controller="trainings--lessons--index" data-session-id="${session.id}">
                    <div style="width:100%;display:relative;" data-target="trainings--lessons--index.cardList">
                      <div class="card-header d-flex align-items-center card-header-table-list" data-controller="trainings--lessons--unit">
                        <h6 class="card-title display-4 card-title-table-list">Todas as Aulas</h6>
                        <div class="card-actions ml-auto py-0 mr-3">
                          <span data-toggle="tooltip" data-placement="top" title data-original-title="Nova Aula"><span class="material-icons pointer" data-action="click->trainings--lessons--index#newLesson">add</span></span>
                        </div>
                      </div>
                      <div class="card-body" style="overflow:scroll;" data-target="trainings--lessons--index.cardBody">
                        
                      </div>
                    </div>
                  </div>
                </div>`

    return html
  }

  listSessions() {
    var allSessions = this.sortByKeyAsc(this.application.sessions, "order")
    this.cardBodyTarget.innerHTML = ""
    allSessions.forEach(element => {
      this.cardBodyTarget.insertAdjacentHTML("beforeend", this.getControllerByIdentifier("trainings--sessions--unit").sessionPartial(element))
    });
    tooltip()
  }

  doSessionListPreloader() {
    const items = 4
    var rowHtml = ''
    for (var i = 0; i < items; i++) {
      rowHtml += `<div class='card timeline-item my-2' data-target="trainings--sessions--index.listLoader">
                    <div class='animated-background animated-background-20'>
                      <div class='background-masker title'></div>
                    </div>
                    <div class='animated-background animated-background-20'>
                      <div class='background-masker title'></div>
                    </div>
                  </div>`
    }
    
    return rowHtml
  }

  requestCreate(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/sessions/create"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          this.application.sessions[this.application.sessions.length] = response.data.cln
          this.cardBodyTarget.insertAdjacentHTML("beforeend", this.getControllerByIdentifier("trainings--sessions--unit").sessionPartial(response.data.cln))
          tooltip()
        }
        processingSnackbar(response.type, response.message, device)
      })
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

  sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}
