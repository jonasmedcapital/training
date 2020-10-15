import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["main", "commentInput", "commentList", "commentBody", "commentBodyTrix", "saveBtn"]

  connect() {
    this.doCommentInput()
  }

  createComment(ev) {
    if (this.commentBodyTarget.value != "") {
      if ((ev.type == "keyup" && ev.key == "Escape" && ev.shiftKey == false)) {
        this.commentBodyTarget.value = ""
      } else if ((ev.type == "keyup" && ev.key == "Enter" && ev.shiftKey == false) || ev.type == "click") {
        // if (this.application.current_user) {
        if (this.application.current_user) {
          var commenterName = this.application.current_user.name
          var commenterEmail = this.application.current_user.email
        } else {
          // var commenterName = this.application.metrics.student_name
          // var commenterEmail = this.application.metrics.student_email
        }
        this.saveBtnTarget.disabled = true
        var data = { comment: { course_id: this.application.training.id, name: commenterName, email: commenterEmail, body: this.commentBodyTarget.value.trim() }, current_user: { current_user_id: this.application.currentUserId } }
        this.requestCreate(data)
      }
    }
  }

  requestCreate(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/comments/create"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var comment = response.data.cln
          this.application.comments[this.application.comments.length] = comment
          this.commentBodyTrixTarget.value = ""
          this.commentListTarget.insertAdjacentHTML("afterbegin", this.getControllerByIdentifier("trainings--comments--unit").commentPartial(comment))
        } else {
          this.saveBtnTarget.disabled = false
        }
        this.saveBtnTarget.disabled = false
        processingSnackbar(response.type, response.message) //, device)
      })
  }

  doCommentInput() {
    var html = `<div class="row my-1 d-flex align-items-center">
                  <div class="col-9 offset-1">
                  <div class="form-group">
                    <div class="floating-label floating-label-sm has-value">
                      <label for="commentTrainingForm">Comentário</label>
                      <input type="hidden" class="form-control" id="commentTrainingForm" placeholder="Texto" data-target="trainings--comments--index.commentBody">
                      <trix-editor input="commentTrainingForm" class="trix-content trix-med" id="commentTrainingFormTrix" rows="3" placeholder="Digite seu comentário ... " data-action="keyup->trainings--comments--index#createComment" data-target="trainings--comments--index.commentBodyTrix"></trix-editor>
                      <small id="commentTrainingFormHelp" class="form-text text-muted">Utilize <em>SHIFT + Enter</em> para iniciar um novo parágrafo.</small>
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <button type="button" class="btn btn-primary s-title-0p7rem btn-sm" data-controller="trainings--comments--unit" data-action="click->trainings--comments--index#createComment" data-target="trainings--comments--index.saveBtn">Comentar</button>
                </div>
              </div>`

    var controller = this
    new Promise(function (resolve) {
      resolve(controller.commentInputTarget.innerHTML = html)
    }).then(() => {
      controller.doCommentListHtml()
    })
  }

  doCommentListHtml() {
    var comments = this.application.comments
    comments.forEach(comment => {
      this.commentListTarget.insertAdjacentHTML("afterbegin", this.getControllerByIdentifier("trainings--comments--unit").commentPartial(comment))
    });
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }



}
