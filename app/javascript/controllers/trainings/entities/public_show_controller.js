import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["mainContent", "ratingStar", "videoPlayer", "trainingAbout", "trainingSessions", "videoPlayerControl",
    "progressBar", "currentLesson", "doneLessons", "lessonCheckbox", "leftLessonsDuration",
    "totalLessonsDuration", "leftLessonsWatch", "totalLessonsWatch", "speakers"]

  connect() {
    this.doMainContentHeight()
    this.trainingSlug = location.pathname.split("/").pop()
    this.trainingStarted = false
    this.doTrainingPreloaderHtml()
    this.getTraining()
    this.rating = 0      
  }

  disconnect() {
    this.getControllerByIdentifier("app--shared--cookies").setCookie("training_name", "", "Thu, 01 Jan 1970 00:00:00 UTC")
  }

  viewLesson(ev) {
    this.currentLessonTargets.forEach(element => {
      element.classList.remove("bg-shadow")
    });

    this.doCountDoneLessons(ev.target.dataset.sessionId)

    if (ev.target.checked) {
      ev.target.closest(".currentLesson").classList.add("bg-shadow")
      ev.target.closest(".currentLesson").nextElementSibling.classList.add("bg-shadow")
      var html = `<iframe src ="https://player.vimeo.com/video/${ev.target.dataset.link}" width="100%" height="${$(window).height() * 0.45}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                  <p class="text-center my-1">${ev.target.dataset.name}</p>`
      this.videoPlayerTarget.innerHTML = html
      this.totalProgressDuration += Number(ev.target.dataset.duration)
      this.totalProgressWatch += 1
    } else {
      this.totalProgressDuration -= Number(ev.target.dataset.duration)
      this.totalProgressWatch -= 1
    }
    
    var params = { progress: `${ev.target.dataset.sessionId}-${ev.target.dataset.id}-${ev.target.dataset.duration}-${ev.target.checked}` }
    this.saveTrainingMetrics(params)
    this.doProgressCount()
  }

  ratingTraining(ev) {
    var rating = ev.target.dataset.rating
    
    if (this.rating == 0 || this.rating == null) {
      this.setTrainingRating(rating)
      this.saveTrainingRating(rating)
    } else {
      processingSnackbar("danger", "Você já nos avaliou! Muito obrigado!") //, device)
    }
    //★
    //☆
  }

  setTrainingRating(rating) {
    this.ratingStarTargets.forEach(element => {
      if (element.dataset.rating <= rating) {
        element.innerHTML = `★`
      } else {
        element.innerHTML = `☆`
      }
    });    
  }

  saveTrainingRating(rating) {
    if (rating > 0) {
      this.rating = rating
      this.getControllerByIdentifier("app--shared--cookies").setCookie("training_rating", "", "Thu, 01 Jan 1970 00:00:00 UTC")
      const data = { training: { id: this.application.training.id, rating: rating } }
      this.requestUpdate(data)

      var params = { rating: rating }
      this.saveTrainingMetrics(params)
    }
  }

  doTrainingTitleHtml() {
    var html = `<div class="row d-flex align-items-center my-3">
                  <div class="col-6">
                    <h4 class="title-two text-center my-0">${this.application.training.title}</h4>
                  </div>
                  <div class="col-2">
                    <div class="rating-star">
                      <span data-rating="5" data-action="click->trainings--entities--public-show#ratingTraining" data-target="trainings--entities--public-show.ratingStar">☆</span>
                      <span data-rating="4" data-action="click->trainings--entities--public-show#ratingTraining" data-target="trainings--entities--public-show.ratingStar">☆</span>
                      <span data-rating="3" data-action="click->trainings--entities--public-show#ratingTraining" data-target="trainings--entities--public-show.ratingStar">☆</span>
                      <span data-rating="2" data-action="click->trainings--entities--public-show#ratingTraining" data-target="trainings--entities--public-show.ratingStar">☆</span>
                      <span data-rating="1" data-action="click->trainings--entities--public-show#ratingTraining" data-target="trainings--entities--public-show.ratingStar">☆</span>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="w-100">
                      <button type="button" class="btn btn-outline dropdown-toggle w-100 p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="s-title-0p6rem">Seu Progresso</span>
                        <div class="progress" style="height: 6px;overflow: inherit;">
                          <div class="progress-bar" role="progressbar" style="width: 0%;border-bottom:0.5rem solid #053B5E;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-target="trainings--entities--public-show.progressBar"></div>
                        </div>
                      </button>
                      <div class="dropdown-menu w-80">
                        <span class="s-title-0p6rem">Faltam <span data-target="trainings--entities--public-show.leftLessonsDuration"></span> de <span data-target="trainings--entities--public-show.totalLessonsDuration"></span> total</span><br>
                        <span class="s-title-0p6rem">Faltam <span data-target="trainings--entities--public-show.leftLessonsWatch"></span> de <span data-target="trainings--entities--public-show.totalLessonsWatch"></span> aulas</span><br>
                      </div>
                    </div>
                  </div>
                </div>`
    
    this.mainContentTarget.innerHTML = ""                
    var controller = this
    new Promise(function (resolve) {
      resolve(controller.mainContentTarget.insertAdjacentHTML("beforeend", html))
    }).then(() => {
      controller.leftLessonsDurationTarget.innerText = this.getControllerByIdentifier("app--helpers--time").doDurationFormat(controller.leftLessonsDuration)
      controller.totalLessonsDurationTarget.innerText = this.getControllerByIdentifier("app--helpers--time").doDurationFormat(controller.totalLessonsDuration)
      controller.leftLessonsWatchTarget.innerText = controller.leftLessonsWatch
      controller.totalLessonsWatchTarget.innerText = controller.totalLessonsWatch
    })
  }

  doTrainingContentHtml() {
    var html = `<div class="row">
                  <div class="col-lg-8 px-1">
                    <div class="col-lg-12 px-0" data-target="trainings--entities--public-show.videoPlayer">
                    </div>
                    <div class="col-lg-12 px-0" data-target="trainings--entities--public-show.trainingAbout">
                    </div>
                  </div>
                  <div class="col-lg-4" data-target="trainings--entities--public-show.trainingSessions">
                  </div>
                </div>`

    this.mainContentTarget.insertAdjacentHTML("beforeend", html)
  }

  doTrainingVideoHtml() {
    var html = `<img src="${this.application.training.cover_url}" alt="cover" width="100%;">`

    this.videoPlayerTarget.innerHTML = html
  }

  doTrainingAboutHtml() {
    var speakerHtml = ``
    this.speakers.forEach(speaker => {
      speakerHtml += `<div class="row d-flex align-items-center my-3">
                        <div class="col-1">
                          <img src="${speaker.speaker_avatar_url}" alt="${speaker.speaker_name}" style="width:3rem">
                        </div>
                        <div class="col-6">
                          <h5>${speaker.speaker_name}</h5>
                          <h6 class="trix-content">${speaker.speaker_bio}</h6>
                        </div>
                      </div>`
    });


    var html = `<div class="row my-5">
                  <div class="col-sm-12 px-0">
                    <ul class="nav nav-justified nav-tabs" id="justifiedTab" role="tablist">
                      <li class="nav-item">
                        <a aria-controls="home" aria-selected="true" class="nav-link nav-link-100 active" data-toggle="tab" href="#infoTraining" id="infoTraining-tab" role="tab">
                          Sobre o Treinamento
                        </a>
                      </li>
                      <li class="nav-item">
                        <a aria-controls="profile" aria-selected="false" class="nav-link nav-link-100" data-toggle="tab" href="#questions" id="questions-tab" role="tab">
                          Dúvidas Frequentes
                        </a>
                      </li>
                      <li class="nav-item">
                        <a aria-controls="contact" aria-selected="false" class="nav-link nav-link-100" data-toggle="tab" href="#materialContent" id="materialContent-tab"role="tab">
                          Materiais da Aula
                        </a>
                      </li> 
                      <li class="nav-item">
                        <a aria-controls="contact" aria-selected="false" class="nav-link nav-link-100" data-toggle="tab" href="#comments" id="comments-tab" role="tab">
                          Comentários
                        </a>
                      </li>
                    </ul>
                    <div class="tab-content" id="justifiedTabContent">
                      <div aria-labelledby="infoTraining-tab" class="tab-pane fade show active" id="infoTraining" role="tabpanel">
                        <div class="info-training-content h-80-classroom">
                          <div class="content pt-5">
                            <div class="col-lg-12 col-sm-12 mb-4">
                              <h1 class="title-class-training">Sobre o Treinamento</h1>
                            </div>
                            <div class="row">
                              <div class="col-lg-8 col-sm-12 description-training">
                                <h5 class="stitle-class-training">Descrição</h5>
                                ${this.application.training.description}
                              </div>
                              <div class="col-lg-4 col-sm-12"> 
                                <h5 class="stitle-class-training">Duração</h5>
                                <p class="">${this.getControllerByIdentifier("app--helpers--time").doDurationFormat(this.application.training.duration)}.</p>
                              </div>
                            </div>
                            <div class="col-12 data-target="trainings--entities--public-show.speakers"">
                              <h5 class="stitle-class-training">Palestrantes</h5>
                              ${speakerHtml}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div aria-labelledby="questions-tab" class="tab-pane fade" id="questions" role="tabpanel">
                        <div class="row d-flex align-items-center my-5">
                          <div class="col-sm-10 offset-sm-1">
                            <div class="accordion" id="accordionQuestionsTraining">
                              <div class="card" style="z-index:20;">
                                <div class="card-header" id="headingFour">
                                  <h5 class="mb-0 stitle-class-training">
                                    <button class="btn btn-link btn-wrap collapsed question" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                      ${this.application.training.question_one}
                                    </button>
                                  </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingFour" data-parent="#accordionQuestionsTraining">
                                  <div class="card-body answer">
                                    <span id="answerFour">${this.application.training.answer_one}</span>
                                  </div>
                                </div>
                              </div>
                              <div class="card" style="z-index:20;">
                                <div class="card-header" id="headingFour">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link btn-wrap collapsed question" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                      ${this.application.training.question_two}
                                    </button>
                                </h5>
                              </div>
                              <div id="collapseTwo" class="collapse" aria-labelledby="headingFour" data-parent="#accordionQuestionsTraining">
                                <div class="card-body answer">
                                  <span id="answerFour">${this.application.training.answer_two}</span>
                                </div>
                              </div>
                              </div>
                              <div class="card" style="z-index:20;">
                                <div class="card-header" id="headingFour">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link btn-wrap collapsed question" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                      ${this.application.training.question_three}
                                    </button>
                                  </h5>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingFour" data-parent="#accordionQuestionsTraining">
                                  <div class="card-body answer">
                                    <span id="answerFour">${this.application.training.answer_three}</span>
                                  </div>
                                </div>
                              </div>
                            </div> 
                          </div>
                        </div>
                      </div>
                      <div aria-labelledby="materialContent-tab" class="tab-pane fade" id="materialContent" role="tabpanel">
                        <div class="h-80-classroom">
                          <div class="content pt-5">
                            <div class="col-lg-12 col-sm-12 mb-4">
                              <h1 class="title-class-training">Materiais Complementares</h1>
                            </div>
                            <div class="row">
                              <div class="col-lg-8 col-sm-12 description-training">
                                ${this.application.training.material_description}
                              </div>
                              <div class="col-lg-8 col-sm-12 description-training my-5">
                                <span class="btn btn-primary a-dark" data-action="click->trainings--entities--public-show#getTrainingMaterial">Baixar Material</span>
                              </div>         
                            </div>
                          </div>
                        </div>
                      </div>
                      <div aria-labelledby="comments-tab" class="tab-pane fade" id="comments" role="tabpanel">
                        <div class="h-80-classroom">
                          <div class="content pt-3" data-controller="trainings--comments--index">
                            <div data-target="trainings--comments--index.commentInput"></div>
                            <div data-target="trainings--comments--index.commentList"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`

    this.trainingAboutTarget.innerHTML = html
  }

  getTrainingMaterial() {
    window.open(this.application.training.material_url, `_blank`)
  }

  doCountDoneLessons(sessionId) {
    var countLessons = 0
    if (this.hasLessonCheckboxTarget) {
      this.lessonCheckboxTargets.forEach(checkbox => {
        if ((sessionId == checkbox.dataset.sessionId) && (checkbox.checked)) {
          countLessons++
        }
      })
    }

    this.doneLessonsTargets.forEach(done => {
      if (done.closest(`.session-${sessionId}`)) {
        done.innerText = parseInt(countLessons)
      }
    });

  }

  doTrainingSessionsHtml() {
    var sessionsHtml = ``
    this.application.training.sessions_list.forEach(session => {
      var lessonsHtml = ``

      session.lessons_list.forEach(lesson => {

        lessonsHtml += `<tr class="currentLesson" data-target="trainings--entities--public-show.currentLesson">
                          <td class="table-10" rowspan="2">
                            <div class="custom-control custom-checkbox pl-1 d-flex align-items-center">
                              <input type="checkbox" class="custom-control-input" id="check-${lesson.id}" data-id="${lesson.id}" data-duration="${lesson.duration}" data-session-id="${session.id}" data-link="${lesson.link}" data-name="Parte ${session.order}: ${session.name} | ${lesson.order}: ${lesson.name}" data-target="trainings--entities--public-show.lessonCheckbox" data-action="click->trainings--entities--public-show#viewLesson">
                              <label class="custom-control-label pointer" for="check-${lesson.id}"></label>
                            </div>
                          </td>
                          <td scope="col" class="p-1 table-80 align-middle" style="height: 1rem">
                            ${lesson.order}: ${lesson.name}
                          </td>
                        </tr>
                        <tr style="font-size: 90%;" data-target="trainings--entities--public-show.currentLesson">
                          <td scope="col" class="p-1 table-80 align-middle" style="border:none;height: 1rem;font-size: 90%;"> 
                            <span class="material-icons md-150">play_circle_filled</span> ${this.getControllerByIdentifier("app--helpers--time").doDurationFormat(lesson.duration)}
                          </td>
                        </tr>`

      });

      sessionsHtml += `<div class="expansion-panel list-group-item session-${session.id}">
                        <a aria-controls="collapseSession-${session.id}" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseSession-${session.id}" id="headingSession-${session.id}">
                          <span>
                            <b>Parte ${session.order}: ${session.name}</b><br>
                            <span class="s-title-0p6rem"><span data-target="trainings--entities--public-show.doneLessons">0</span>/<span data-target="trainings--entities--public-show.totalLessons">${session.lessons_list.length}</span> | ${this.getControllerByIdentifier("app--helpers--time").doDurationFormat(session.duration)}</span>
                          </span>
                          <div class="expansion-panel-icon ml-3 text-black-secondary">
                            <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                            <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                          </div>
                        </a>
                        <div aria-labelledby="headingSession-${session.id}" class="collapse" data-parent="#accordionTwo" id="collapseSession-${session.id}">
                          <div class="expansion-panel-body py-0">
                            <table class="table table-sm" style="font-size:80%;">
                              <tbody data-target="trainings--entities--public-show.lesson">
                                ${lessonsHtml}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>`
    });

    var html = `<div class="card">
                  <div class="card-body">
                    <h5 class="text-center title-training">Conteúdo ${this.application.training.kind_pretty}</h5>
                  </div>
                  <div class="list-group list-group-flush" id="accordionTwo">
                    ${sessionsHtml}
                  </div>
                </div>`

    this.trainingSessionsTarget.innerHTML = html
  }

  setDoneLessons(progress) {

    progress.forEach(element => {

      var sessionId = element.split("-")[0]
      var lessonId = element.split("-")[1]

      if (this.hasLessonCheckboxTarget) {
        this.lessonCheckboxTargets.forEach(checkbox => {
          if ((sessionId == checkbox.dataset.sessionId) && (lessonId == checkbox.dataset.id )) {
            checkbox.checked = true
          }
        })
      }

      this.doCountDoneLessons(sessionId)
    });
  }

  getTraining() {
    var data = { training: { slug: this.trainingSlug } }
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/entities/read_public"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.process) {
          controller.application.training = response.data.cln
          controller.sessions = controller.application.training.sessions_list
          controller.speakers = controller.application.training.speakers_list
          controller.application.comments = controller.application.training.comments_list

          controller.leftLessonsDuration = controller.application.training.duration
          controller.totalLessonsDuration = controller.application.training.duration
          controller.leftLessonsWatch = controller.application.training.total_lessons
          controller.totalLessonsWatch = controller.application.training.total_lessons

          // controller.getControllerByIdentifier("app--shared--cookies").setCookie("training_name", controller.application.training.name, 1)

          controller.mainContentTarget.style.height = ""
          controller.doTrainingTitleHtml()
          controller.doTrainingContentHtml()
          controller.doTrainingVideoHtml()
          controller.doTrainingSessionsHtml()
          controller.doTrainingAboutHtml()
          controller.getTrainingMetrics()

        } else {
          processingSnackbar(response.type, response.message) //, device)
        }
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError()) //, device)
      })
  }

  getTrainingMetrics() {
    if (typeof currentUser != "undefined") {
      var userId = currentUser.id
    }
    var data = { metric: { course_id: this.application.training.id, user_id: userId} }

    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/metrics/read_public"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var metrics = response.data.cln
          controller.application.metrics = metrics

          controller.rating = metrics.rating
          controller.setTrainingRating(metrics.rating)

          controller.setDoneLessons(metrics.progress)
          controller.totalProgressDuration = metrics.duration_progress
          controller.totalProgressWatch = metrics.lessons_progress
          controller.doProgressCount()

        } else {
          processingSnackbar(response.type, response.message) //, device)
        }
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError()) //, device)
      })
  }

  saveTrainingMetrics(params) {

    if (typeof currentUser != "undefined") {
      var userId = currentUser.id
    }

    if (this.application.metrics) {
      var data = { metric: { id: this.application.metrics.id, course_id: this.application.training.id, user_id: userId, progress: params.progress, rating: params.rating } }
    } else {
      var data = { metric: { course_id: this.application.training.id, user_id: userId, progress: params.progress, rating: params.rating } }
    }

    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/metrics/save_public"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var metrics = response.data.cln
          controller.application.metrics = metrics

        } else {
          processingSnackbar(response.type, response.message) //, device)
        }
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError()) //, device)
      })
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

  doProgressCount() {
    var totalLessons = 0
    this.sessions.forEach(element => {
      totalLessons += element.lessons_list.length
    });

    this.leftLessonsDurationTarget.innerText = this.getControllerByIdentifier("app--helpers--time").doDurationFormat(this.application.training.duration - this.totalProgressDuration)
    this.leftLessonsWatchTarget.innerText = totalLessons - this.totalProgressWatch

    this.progressBarTarget.style.width = ( this.totalProgressDuration / this.application.training.duration ) * 100 + `%`
  }

  requestUpdate(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/entities/update_public"
    const init = { method: "PUT", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        processingSnackbar(response.type, response.message) //, device)
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError()) //, device)
      })
  }

  doTrainingPreloaderHtml() {
    var simplePreloader = `<div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;max-width:none;">
                            <div class='animated-background animated-background-5'>
                              <div class='background-masker title'></div>
                            </div>
                          </div>`

    var preloaderHtml = ''
    for (var i = 0; i < 8; i++) {
      preloaderHtml += `<div class='card timeline-item m-0 p-1 w-100 my-3' style="box-shadow:none;max-width:none;">
                          <div class='animated-background animated-background-5'>
                            <div class='background-masker title'></div>
                          </div>
                        </div>`
    }

    var html = `<div class="row d-flex align-items-center my-3">
                  <div class="col-2">
                    <img class="" src="https://medcapital-site-main.s3-sa-east-1.amazonaws.com/Logo-MedSchool.png" alt="MedSchool" class="image-10" style="width:10rem;cursor:pointer">
                  </div>
                  <div class="col-6">
                    <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;max-width:none;">
                      <div class='animated-background animated-background-5'>
                        <div class='background-masker title'></div>
                      </div>
                    </div>
                    <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;max-width:none;">
                      <div class='animated-background animated-background-5'>
                        <div class='background-masker title'></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;max-width:none;">
                      <div class='animated-background animated-background-5'>
                        <div class='background-masker title'></div>
                      </div>
                    </div>
                    <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;max-width:none;">
                      <div class='animated-background animated-background-5'>
                        <div class='background-masker title'></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;max-width:none;">
                      <div class='animated-background animated-background-5'>
                        <div class='background-masker title'></div>
                      </div>
                    </div>
                    <div class='card timeline-item m-0 p-1 w-100' style="box-shadow:none;max-width:none;">
                      <div class='animated-background animated-background-5'>
                        <div class='background-masker title'></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row d-flex align-items-center my-3" style="height:20rem;">
                  <div class="col-lg-8 my-5 py-5">
                    ${preloaderHtml}
                  </div>
                  <div class="col-lg-4 my-5 py-5">
                    ${preloaderHtml}
                  </div>
                  <div class="col-lg-2">
                    ${simplePreloader}
                  </div>
                  <div class="col-lg-2">
                    ${simplePreloader}
                  </div>
                  <div class="col-lg-2">
                    ${simplePreloader}
                  </div>
                  <div class="col-lg-2">
                    ${simplePreloader}
                  </div>
                </div>`

                

    this.mainContentTarget.insertAdjacentHTML("beforeend", html)
  }

  doMainContentHeight() {
    this.mainContentTarget.style.height = $(window).height() + `px`
  }

  // `height="30rem"`
  // `width="-webkit-fill-available"`
  // `width="${$(window).width() * 0.7}" height="${$(window).width() * 0.40}"`

  // var html = `<div class="embed-responsive embed-responsive-16by9">
  //               <iframe id="video" class="embed-responsive-item" src="https://www.youtube.com/embed/${ev.target.dataset.link}" allowfullscreen=""></iframe>
  //             </div>`

  // var html = `<video controls preload="auto" autoplay width="${$(window).width() * 0.65}" controlsList="nodownload" data-target="trainings--entities--public-show.videoPlayerControl">
  //               <source src="${ev.target.dataset.link}" type="video/ogg">
  //               Seu navegador não suporta o elemento <code>video</code>.
  //             </video>`

}
