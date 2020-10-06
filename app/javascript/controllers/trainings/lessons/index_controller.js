import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["cardList", "cardBody", "listLoader", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
    this.application.sessions.forEach(element => {
      if (element.id == this.element.dataset.sessionId) {
        this.session = element
        this.lessons = this.session.lessons_list
      }
    });

    var controller = this
    new Promise(function (resolve) {
      resolve(controller.cardBodyTarget.insertAdjacentHTML("beforeend", controller.doLessonListPreloader()))
    }).then(() => {
      controller.listLessons()
    }) 
    
  }

  newLesson() {
    const data = { lesson: { session_id: this.session.id, name: "Nova Aula", description: "Descrição da Nova Aula", order: this.lessons.length + 1, link: "sAEWBdKBw0s" }, current_user: { current_user_id: currentUser.id } }
    this.requestCreate(data)
  }

  listLessons() {
    var allLessons = this.sortByKeyAsc(this.lessons, "order")
    this.cardBodyTarget.innerHTML = ""
    allLessons.forEach(element => {
      this.cardBodyTarget.insertAdjacentHTML("beforeend", this.getControllerByIdentifier("trainings--lessons--unit").lessonPartial(element))
    });

    tooltip()
  }

  doLessonListPreloader() {
    const items = 4
    var rowHtml = ''
    for (var i = 0; i < items; i++) {
      rowHtml += `<div class='card timeline-item my-2 mx-0' data-target="trainings--lessons--index.listLoader">
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

  sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

  requestCreate(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/lessons/create"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          controller.lessons[controller.lessons.length] = response.data.cln
          controller.cardBodyTarget.insertAdjacentHTML("beforeend", controller.getControllerByIdentifier("trainings--lessons--unit").lessonPartial(response.data.cln))
          tooltip()
        }
        processingSnackbar(response.type, response.message) //, device)
      })
  }

}
