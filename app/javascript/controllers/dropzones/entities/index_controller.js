import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["statusCol", "ticketsCol", "historyCol", "saveBtn" ]

  connect() {
    console.log("Hello From IR Controller")
    this.doStatusColHtml()
    this.doTicketsColHtml()
    this.doHistoryColHtml()
  }

  doStatusColHtml() {
    var html = `<h1>status</h1>`

    this.statusColTarget.insertAdjacentHTML("beforeend", html)
  }

  doTicketsColHtml() {
    var html = `<div class="card mt-3 mb-3" style="width:100%;height:550px;display:relative;" data-target="trainings--entities--upload.cardBody">
                  <div class="card-header d-flex align-items-center card-header-table-list">
                    <h6 class="card-title display-4" style="padding:1rem;font-size:110%;margin-bottom:0px;">Arquivos para upload</h6>
                  </div>
                  <div class="card-body" style="overflow:scroll;">
                    <div class="row">
                      <div class="col p-0">
                        <div class="table-responsive">
                          <table class="table table-sm table-hover table-search">
                            <thead>
                              <tr>
                                <th scope="col-md-4">Nome</th>
                                <th scope="col-md-1">Tamanho</th>
                                <th scope="col-md-1">Tipo</th>
                              </tr>
                            </thead>
                            <tbody data-target="dropzones--entities--upload.tableBody">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer py-0" data-target="trainings--entities--upload.footerTable">
                  </div>
                </div>
                <div class="d-flex flex-row-reverse">  
                  <button type="button" class="btn btn-secondary" data-action="click->dropzones--entities--upload#saveUploads" data-target="dropzones--entities--upload.saveBtn">Upload</button>
                </div>`

    this.ticketsColTarget.insertAdjacentHTML("beforeend", html)
  }

  doHistoryColHtml() {
    var html = `<div class="card mt-3 mb-3" style="width:100%;height:550px;display:relative;" data-target="trainings--entities--upload.cardBody">
                  <div class="card-header d-flex align-items-center card-header-table-list">
                    <h6 class="card-title display-4" style="padding:1rem;font-size:110%;margin-bottom:0px;">Arquivos para upload</h6>
                  </div>
                  <div class="card-body" style="overflow:scroll;">
                    <div class="row">
                      <div class="col p-0">
                        <div class="table-responsive">
                          <table class="table table-sm table-hover table-search">
                            <thead>
                              <tr>
                                <th scope="col-md-4">Nome</th>
                                <th scope="col-md-1">Tamanho</th>
                                <th scope="col-md-1">Tipo</th>
                              </tr>
                            </thead>
                            <tbody data-target="dropzones--entities--upload.tableBody">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer py-0" data-target="trainings--entities--upload.footerTable">
                  </div>
                </div>
                <div class="d-flex flex-row-reverse">  
                  <button type="button" class="btn btn-secondary" data-action="click->dropzones--entities--upload#saveUploads" data-target="dropzones--entities--upload.saveBtn">Upload</button>
                </div>`

    this.historyColTarget.insertAdjacentHTML("beforeend", html)
  }

}