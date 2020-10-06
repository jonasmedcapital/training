import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  editSession() {
    this.getControllerByIdentifier("trainings--sessions--index").showSession(this.element.dataset.id)
  }

  deleteSession() {
    const data = { session: { id: this.element.dataset.id, active: false }, current_user: { current_user_id: currentUser.id } }
    this.requestUpdate(data)
  }

  editUnit(ev) {
    var span = ev.target
    var input = ev.target.nextElementSibling
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
        const data = { session: { id: this.element.dataset.id, value: value, field: field }, current_user: { current_user_id: currentUser.id } }
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

  sessionPartial(element) {
    var html = `<div class="card my-3" data-id="${element.id}" data-controller="trainings--sessions--unit">
                  <div class="card-body py-1">
                    <table class="table table-sm" style="font-size:80%;">
                      <tbody>
                        <tr style="height:45px;">
                          <td class="table-15 align-middle pointer px-0" style="height:inherit;">
                            <span class="text-bold" data-action="click->trainings--sessions--unit#editUnit">${element.order}</span>
                            <input autofocus data-field="order" data-action="keyup->trainings--sessions--unit#saveUnit change->trainings--sessions--unit#saveUnit blur->trainings--sessions--unit#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="number" required>
                          </td>
                          <td scope="col" class="p-1 table-70 align-middle pointer">
                            <span class="text-bold" data-action="click->trainings--sessions--unit#editUnit">${element.name}</span>
                            <input autofocus data-field="name" data-action="keyup->trainings--sessions--unit#saveUnit change->trainings--sessions--unit#saveUnit blur->trainings--sessions--unit#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="text" required>
                          </td>
                          <td class="p-1 table-80 align-middle pointer"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Editar Sessão"><span class="material-icons md-sm md-dark" data-action="click->trainings--sessions--unit#editSession">keyboard_arrow_right</span></button></td>
                          <td class="p-1 table-80 align-middle pointer"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Apagar Sessão"><span class="material-icons md-sm md-dark" data-action="click->trainings--sessions--unit#deleteSession">delete</span></button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>`

    return html
  }

  requestUpdate(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/sessions/update"
    const init = { method: "PUT", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var session = response.data.cln

          if (session.active) {
            this.application.sessions.forEach((element, i) => {
              if (element.id == session.id) {
                this.application.sessions.splice(this.application.sessions.indexOf(element), 1, session)
              }
            })
          } else {
            this.application.sessions.forEach((element, i) => {
              if (element.id == session.id) {
                this.application.sessions.splice(this.application.sessions.indexOf(element), 1)
              }
            })
          }

          this.getControllerByIdentifier("trainings--sessions--index").listSessions()
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

}
