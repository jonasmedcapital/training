import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["indexPage", "navBar", "pageBody", "video", "sessions", "tabs", "tabs", "7", "8"]

  connect() {
    this.doPageGrid()
    // this.doHeader()
  }

  doPageGrid() {
    var html = `<div data-target="trainings--entities--index.navBar"></div>
                <div class="row my-3">
                  <div class="container" data-target="trainings--entities--index.pageBody"></div>
                </div>`    
    this.indexPageTarget.innerHTML = html
    this.doNavBar()
    this.doPageBody()
    // this.doPageBody()
  }

  doNavBar() {
    var html = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
                  <a class="navbar-brand" href="#">Treinamentos</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                </nav>`

    this.navBarTarget.innerHTML = html
  }

  doPageBody() {
    var html = `<div class="row my-3">
                  <div class="col-6" data-target="trainings--entities--index.video"></div>
                  <div class="col-6" data-target="trainings--entities--index.sessions"></div>
                  <div class="col-12" data-target="trainings--entities--index.tabs"></div>
                </div>`

    this.pageBodyTarget.innerHTML = html
    this.doVideo()
    this.doSessions()
    this.doTabs()
  }

  doVideo() {
    var html = `<iframe width="560" height="315" src="https://www.youtube.com/embed/392fMTyw6po" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`    

    this.videoTarget.innerHTML = html
  }

  doSessions() {
    var html = `<div id="accordion">
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Collapsible Group Item #1
                        </button>
                      </h5>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body">
                        Hello 1
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingTwo">
                      <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Collapsible Group Item #2
                        </button>
                      </h5>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                      <div class="card-body">
                        Hello 2
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Collapsible Group Item #3
                        </button>
                      </h5>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                      <div class="card-body">
                        Hello 3
                      </div>
                    </div>
                  </div>
                </div>`

    this.sessionsTarget.innerHTML = html
  }

  doTabs() {
    var html = `<ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="comments-tab" data-toggle="tab" href="#comments" role="tab" aria-controls="comments" aria-selected="true">Comentários</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="questions-tab" data-toggle="tab" href="#questions" role="tab" aria-controls="questions" aria-selected="false">Perguntas</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="material-tab" data-toggle="tab" href="#material" role="tab" aria-controls="material" aria-selected="false">Material</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="metrics-tab" data-toggle="tab" href="#metrics" role="tab" aria-controls="metrics" aria-selected="false">Métricas</a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="comments" role="tabpanel" aria-labelledby="comments-tab">...</div>
                  <div class="tab-pane fade" id="questions" role="tabpanel" aria-labelledby="questions-tab">...</div>
                  <div class="tab-pane fade" id="material" role="tabpanel" aria-labelledby="material-tab">...</div>
                  <div class="tab-pane fade" id="metrics" role="tabpanel" aria-labelledby="contact-tab">...</div>
                </div>`

    this.tabsTarget.innerHTML = html
  }



  

}