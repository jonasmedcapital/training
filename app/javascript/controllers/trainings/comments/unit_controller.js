import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["main", "replyInput", "commentBody", "commentBodyTrix", "saveBtn", "replyBtn", "replyTable", "8888", "9999"]

  connect() {
  }

  cancelCreateComment() {
    this.replyBtnTarget.classList.remove("d-none")
    this.replyInputTarget.remove()
  }

  replyComment() {
    var id = this.element.dataset.id
    this.replyBtnTarget.classList.add("d-none")
    this.mainTarget.insertAdjacentHTML("beforeend", this.replyInput(id))
  }

  deleteReply() {
    var id = this.element.dataset.id
    var data = { comment: { id: id, reply: false }, current_user: { current_user_id: this.application.currentUserId } }
    this.requestUpdate(data)
  }

  deleteComment() {
    var id = this.element.dataset.id
    var data = { comment: { id: id, active: false }, current_user: { current_user_id: this.application.currentUserId } }
    this.requestUpdate(data)
  }

  saveReply(ev) {
    var id = this.element.dataset.id
    if (this.commentBodyTarget.value != "") {
      if ((ev.type == "keyup" && ev.key == "Escape" && ev.shiftKey == false)) {
        this.commentBodyTarget.value = ""
      } else if ((ev.type == "keyup" && ev.key == "Enter" && ev.shiftKey == false) || ev.type == "click") {
        if (this.application.current_user) {
          var replyerName = this.application.current_user.name
        } else {
          var replyerName = this.application.metrics.student_name
        }
        this.saveBtnTarget.disabled = true
        var data = { comment: { id: id, reply: true, reply_name: replyerName, reply_body: this.commentBodyTarget.value.trim() }, current_user: { current_user_id: this.application.currentUserId } }
        this.requestUpdate(data)
      }
    }
  }

  requestUpdate(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/comments/update"
    const init = { method: "PUT", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          
          var comment = response.data.cln
          var comments = this.application.comments
          
          if (comment.active) {
            comments.forEach((element, i) => {
              if (element.id == comment.id) {
                comments.splice(comments.indexOf(element), 1, comment)
              }
            })

            if (comment.reply) {
              this.replyTableTarget.insertAdjacentHTML("afterbegin", this.replyPartial(comment))
              this.replyInputTarget.remove()
            } else {
              this.replyTableTarget.innerHTML = ""
              this.replyBtnTarget.classList.remove("d-none")
            }
          } else {
            comments.forEach((element, i) => {
              if (element.id == comment.id) {
                comments.splice(comments.indexOf(element), 1)
              }
            })

            this.mainTarget.remove()
          }
          
          
        } else {
          this.saveBtnTarget.disabled = false
        }
        processingSnackbar(response.type, response.message) //, device)
      })
  }

  replyPartial(comment) {
    // if (this.application.training_comments && this.application.training_comments.can_delete && this.application.current_user) {
    if (this.application.training_comments && this.application.current_user) {
      var deleteBtnHtml = `<td class="p-1 table-10 pointer text-center align-middle"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Apagar Comentário"><span class="material-icons md-sm md-dark" data-action="click->trainings--comments--unit#deleteReply">delete</span></button></td>`
    } else {
      var deleteBtnHtml = ``
    }

    var html = `<table class="table table-sm border-top-primary" style="font-size:80%;">
                  <tbody">
                    <tr style="font-size: 90%;">
                      <td style="font-size: 90%;height:0.5rem;" class="table-90">${comment.reply_name} respondeu em ${Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(comment.reply_date))} às ${Intl.DateTimeFormat('pt-BR', { timeStyle: "short" }).format(new Date(comment.reply_date))}</td>
                      ${deleteBtnHtml}
                    </tr>
                    <tr>
                      <td style="border:none;height: 4rem;" colspan="2">${comment.reply_body}</td>
                    </tr>
                  </tbody>
                </table>`

    return html
  }

  replyInput(id) {
    var html = `<div class="row my-1 d-flex align-items-center w-100" data-target="trainings--comments--unit.replyInput">
                  <div class="col-6 offset-2">
                    <div class="form-group">
                      <div class="floating-label floating-label-sm has-value">
                        <label for="commentTrainingForm-${id}">Comentário</label>
                        <input type="hidden" class="form-control" id="commentTrainingForm-${id}" placeholder="Texto" data-target="trainings--comments--unit.commentBody">
                        <trix-editor input="commentTrainingForm-${id}" class="trix-content trix-med" id="commentTrainingFormTrix-${id}" rows="3" placeholder="Digite seu comentário ... " data-action="keyup->trainings--comments--unit#saveReply" data-target="trainings--comments--unit.commentBodyTrix"></trix-editor>
                        <small id="passwordHelpBlock" class="form-text text-muted">Utilize <em>SHIFT + Enter</em> para iniciar um novo parágrafo.</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    <button type="button" class="btn btn-primary s-title-0p7rem btn-sm" data-action="click->trainings--comments--unit#saveReply" data-target="trainings--comments--unit.saveBtn">Responder</button>
                    <button type="button" class="btn btn-secondary s-title-0p7rem btn-sm mt-2" data-action="click->trainings--comments--unit#cancelCreateComment">Cancelar</button>
                  </div>
                </div>`

    return html
  }

  commentPartial(comment) {
    // if (this.application.training_comments && this.application.training_comments.can_delete && this.application.current_user) {
    if (true) {
      var deleteBtnHtml = `<td class="p-1 table-10 pointer text-center align-middle"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Apagar Comentário"><span class="material-icons md-sm md-dark" data-action="click->trainings--comments--unit#deleteComment">delete</span></button></td>`
    } else {
      var deleteBtnHtml = ``
    }

    // if (this.application.training_comments && this.application.training_comments.can_update && this.application.current_user && comment.reply == false) {
    if (true) {
      var replyBtnHtml = `<td style="border:none;height: 4rem;" class="p-1 table-10 pointer text-center align-middle"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Responder"><span class="material-icons md-sm md-dark" data-action="click->trainings--comments--unit#replyComment" data-target="trainings--comments--unit.replyBtn">reply</span></button></td>`
    } else {
      var replyBtnHtml = `<td style="border:none;height: 4rem;" class="p-1 table-10 pointer text-center align-middle"><button type="button" class="btn btn-sm btn-table p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Responder"><span class="material-icons md-sm md-dark d-none" data-action="click->trainings--comments--unit#replyComment" data-target="trainings--comments--unit.replyBtn">reply</span></button></td>`
    }

    if (comment.reply) {
      var replyHtml = this.replyPartial(comment)
    } else {
      var replyHtml = ``
    }

    var html = `<div class="row my-1 d-flex align-items-center" data-controller="trainings--comments--unit" data-target="trainings--comments--unit.main" data-id="${comment.id}">
                  <div class="col-9 offset-1">
                    <table class="table table-sm border-top-primary" style="font-size:80%;">
                      <tbody">
                        <tr style="font-size: 90%;">
                          <td style="font-size: 90%;height:0.5rem;" class="table-90">${comment.name} escreveu em ${Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(comment.date))} às ${Intl.DateTimeFormat('pt-BR', { timeStyle: "short" }).format(new Date(comment.date))}</td>
                          ${deleteBtnHtml}
                        </tr>
                        <tr>
                          <td style="border:none;height: 4rem;">${comment.body}</td>
                          ${replyBtnHtml}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-8 offset-2" data-target="trainings--comments--unit.replyTable">
                    ${replyHtml}
                  </div>
                </div>`

    return html
  }



}
