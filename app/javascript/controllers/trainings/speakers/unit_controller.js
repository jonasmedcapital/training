import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  deleteSpeaker() {
    const data = { speaker: { id: this.element.dataset.id, active: false }, current_user: { current_user_id: currentUser.id } }
    this.requestDelete(data)
  }

  speakerPartial(element) {
    var html = `<div class="card my-3" data-id="${element.id}" data-controller="trainings--speakers--unit">
                  <div class="card-body py-1">
                    <table class="table table-sm" style="font-size:80%;">
                      <tbody>
                        <tr style="height:45px;">
                          <td class="table-80 align-middle pointer px-0" style="height:inherit;">
                            <span class="text-bold">${element.speaker_name}</span>
                          </td>
                          <td class="p-1 table-80 align-middle pointer"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Remover Speaker"><span class="material-icons md-sm md-dark" data-action="click->trainings--speakers--unit#deleteSpeaker">delete</span></button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>`

    return html
  }

  requestDelete(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/speakers/destroy"
    const init = { method: "DELETE", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var speaker = response.data.cln

          this.application.speakers.forEach((element, i) => {
            if (element.id == speaker.id) {
              this.application.speakers.splice(this.application.speakers.indexOf(element), 1)
            }
          })

          this.getControllerByIdentifier("trainings--speakers--index").listSpeakers()
          this.getControllerByIdentifier("app--helpers--elements").tooltip()
        }
        processingSnackbar(response.type, response.message) //, device)
      })
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

}
