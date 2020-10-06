import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["contentRow", "listCol", "showCol", "bodyTable", "bodyTablePreloader", "footerTable", "viewTrainingCard", "modal", "cardBody", "checkboxShow", "viewTrainingBody", "viewTitle", "publishStatus", "ratingColumn"]

  connect() {
    this.getCurrentUserPermissions()
    this.application.trainings = []
    this.itemsOnPage = 20
    this.pageNumber = 0
    this.numberPages = []
  }

  getCurrentUserPermissions() {
    const featureNames = ["training_entities"]
    const data = { permission: { features: featureNames }, current_user: { current_user_id: currentUser.id } }
    // const token = $('meta[name=csrf-token]').attr('content');
    // const url = "/users/permissions/list_by_features"
    // const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    // fetch(url, init)
    //   .then(response => response.json())
    //   .then(response => {
    //     response.data.cln.forEach(permission => {
    //       controller.application[permission.name] = permission.data
    //     });
    //   })
    controller.doIndexListHtml()
    controller.doViewListHtml()
  }

  doIndexListHtml() {
    var html = `<div class="card" style="width:100%;display:relative;" data-target="trainings--entities--index.cardBody">
                  <div class="card-header d-flex align-items-center card-header-table-list">
                    <input class="form-control s-title-0p7rem ml-auto input-search-table" id="" placeholder="Buscar ..." type="text">
                    <div class="card-actions ml-auto py-0">
                      <div class="dropdown" id="cardFilterEventDropdown">
                        <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline my-0" data-toggle="dropdown" id="cardFilterEventBtn" type="button"><i class="material-icons">filter_list</i></button>
                        <div aria-labelledby="cardFilterEventBtn" class="dropdown-menu dropdown-menu-right menu" id="cardFilterEventDiv"></div>
                      </div>
                      <div class="dropdown">
                        <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline my-0" data-toggle="dropdown" id="actionEventDrop" type="button"><i class="material-icons">more_vert</i></button>
                        <div aria-labelledby="actionEventDrop" class="dropdown-menu dropdown-menu-right menu" style="font-size:80%">
                          <span class="dropdown-item pointer" id="newTrainingModal" data-action="click->trainings--entities--index#newTrainingModal" data-controller="trainings--entities--modal" data-target="trainings--entities--index.modal">Novo Treinamento</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body" style="overflow:scroll;">
                    <div class="row">
                      <div class="col p-0">
                        <div class="table-responsive">
                        <table class="table table-sm table-hover table-search" style="font-size:80%;">
                          <thead>
                            <tr>
                              <th class="table-3"></th>
                              <th style="font-size:80%;" scope="col" class="p-1 table-40 align-middle">Nome</th>
                              <th style="font-size:80%;" scope="col" class="p-1 table-5 align-middle">Link</th>
                              <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle text-center">Conteúdo</th>
                              <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle text-center">Formato</th>
                              <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle text-center">Tipo</th>
                              <th style="font-size:80%;" scope="col" class="p-1 table-10 align-middle text-center">Publicado</th>
                              <th style="font-size:80%;" scope="col" class="p-1 table-5 align-middle text-center">Pontos</th>
                              <th class="table-3"></th>
                            </tr>
                          </thead>
                          <tbody data-target="trainings--entities--index.bodyTable">
                          </tbody>
                        </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer py-0" data-target="trainings--entities--index.footerTable">
                  </div>
                </div>`

    this.listColTarget.innerHTML = html
    var controller = this
    new Promise(function (resolve) {
      resolve(controller.listColTarget.innerHTML = html)
    }).then(() => {
      controller.cardBodyTarget.style.height = ($(window).height() * 0.65) + "px"
      controller.bodyTableTarget.insertAdjacentHTML("beforeend", controller.doTablePreloader())
      controller.getTrainings()
    })
  }

  doTablePreloader() {
    const columns = 9
    const rows = 4
    var columnPreloaderHtml = ''
    for (var i = 0; i < columns; i++) {
      columnPreloaderHtml += `<td class='animated-background animated-background-td'></td>`
    }
    var tablePreloaderHtml = ''
    for (var i = 0; i < rows; i++) {
      tablePreloaderHtml += `<tr class='timeline-item' data-target="trainings--entities--index.bodyTablePreloader">` + columnPreloaderHtml + `</tr>`
    }
    return tablePreloaderHtml
  }

  getTrainings() {
    var data = { current_user: { current_user_id: currentUser.id } }
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/entities/list"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.process) {
          this.application.trainings = response.data.cln.collection
        } else {
          processingSnackbar(response.type, response.message, device)
        }
        this.doDataTable()
      })
      .catch(error => {
        processingSnackbar("danger", controller.getControllerByIdentifier("app--shared--messages").generalError()) // device como parametro
      })
  }

  doDataTable() {
    var trainings = this.application.trainings

    if (trainings.length == 0) {
      this.listData()
    } else {
      var itemsOnPage = this.itemsOnPage
      var pageNumber = this.pageNumber
      var numberPages = this.numberPages
      var pages = []
      var itemLoop = Math.ceil(trainings.length / itemsOnPage)
      var x = 0
      var i = 1
      for (i; i < itemLoop + 1; i++) {
        var internPage = []
        for (x; x < itemsOnPage * i; x++) {
          if (trainings[x] !== undefined) {
            internPage[internPage.length] = trainings[x]
          }
        }
        pages[pages.length] = internPage
        numberPages[numberPages.length] = i - 1
      }

      var fromItem = itemsOnPage * pageNumber + 1
      var toItem = Math.min(itemsOnPage * (pageNumber + 1), (itemsOnPage * pageNumber) + pages[pageNumber].length)
      var pagination = { itemsOnPage: itemsOnPage, fromItem: fromItem, toItem: toItem, totalItems: trainings.length }
      this.listData(pages[pageNumber])
      this.doFooterTable(pagination)
    }
  }

  listData(data) {
    this.bodyTableTarget.innerHTML = ""
    if (data == undefined || data == [] || data.length == 0) {
      var noData = `<td colspan="9" class="p-5 align-middle text-center" style="font-size:200%;">
                      <span class="fa-stack fa-2x">
                        <i class="fas fa-list fa-stack-1x"></i>
                        <i class="fas fa-ban fa-stack-2x" style="color:#EFEFEF;"></i>
                      </span>
                      <h5>Não existem Treinamentos</h5>
                    </td>`

      this.bodyTableTarget.innerHTML = noData
    } else {
      data.forEach(element => {
        this.bodyTableTarget.insertAdjacentHTML("beforeend", this.trainingTablePartial(element))
      });
    }
    this.getControllerByIdentifier("app--helpers--elements").tooltip()
    copy()
  }

  trainingTablePartial(element) {
    // if (this.application.training_entities.can_select) {
      var check = `<div class="custom-control custom-checkbox pl-1 d-flex align-items-center">
                    <input type="checkbox" class="custom-control-input" id="check-${element.id}" data-target="trainings--entities--index.checkboxShow" data-action="click->trainings--entities--index#showTraining">
                    <label class="custom-control-label pointer" for="check-${element.id}"></label>
                  </div>`
    // } else {
    //   var check = ''
    // }

    // if (this.application.training_entities.can_copy) {
      var copyPath = `<button type="button" class="btn btn-sm btn-table copy p-0" data-toggle="tooltip" data-placement="right" title data-original-title="Copiar"><i class="material-icons md-sm md-light">share</i></button>`
    // } else {
    //   var copyPath = ``
    // }

    // if (this.application.training_entities.can_update) {
      var edit = `<button data-action="click->trainings--entities--index#editTrainingModal" type="button" class="btn btn-sm btn-table editAuthor p-0" data-toggle="tooltip" data-placement="top" title data-original-title="Editar"><span class="material-icons md-sm md-dark">edit</span></button>`
    // } else {
    //   var edit = ``
    // }

    if (element.is_published) {
      var statusPublished = `<span style="color:#26C485;"><i class="fas fa-check-double" data-toggle="tooltip" data-placement="top" title data-original-title="Treinamento Publicado">`
    } else {
      var statusPublished = `<span style="color:#F25F5C;"><i class="fas fa-times-circle" data-toggle="tooltip" data-placement="top" title data-original-title="Treinamento Não Publicado">`
    }
    var rowHtml = `<tr class="itemRow" data-slug="${element.slug}" data-id="${element.id}">
                    <th class="table-3">${check}</th>
                    <th style="font-size:80%;" scope="col" class="p-1 table-40 align-middle">${element.name}</th>
                    <th style="font-size:80%;" scope="col" class="p-1 table-10 align-middle" data-copy="${element.public_path}">${copyPath}</th>
                    <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle text-center">${element.content_pretty}</th>
                    <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle text-center">${element.format_pretty}</th>
                    <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle text-center">${element.kind_pretty}</th>
                    <th style="font-size:80%;" scope="col" class="p-1 table-10 align-middle text-center">${statusPublished}</th>
                    <th style="font-size:80%;" scope="col" class="p-1 table-15 align-middle text-center">${Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 2 }).format(element.rating)}</th>
                    <th class="table-3">${edit}</th>
                  </tr>`

    // `<th style="font-size:80%;" scope="col" class="p-1 table-10 align-middle text-center">${element.training_counter_pretty}</th>`

    return rowHtml
  }

  doFooterTable(pagination) {
    var footerHtml = `<div class="card-actions align-items-center justify-content-end py-0">
                        <span class="align-self-center mb-1 mx-1 text-muted">Itens por Página:</span>
                        <div class="dropdown">
                          <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline dropdown-toggle" data-toggle="dropdown" type="button">${pagination.itemsOnPage}</button>
                          <div class="dropdown-menu dropdown-menu-right menu">
                            <span class="dropdown-item pointer" data-action="click->trainings--entities--index#itemsLength" data-items="20">20</span>
                            <span class="dropdown-item pointer" data-action="click->trainings--entities--index#itemsLength" data-items="50">50</span>
                            <span class="dropdown-item pointer" data-action="click->trainings--entities--index#itemsLength" data-items="100">100</span>
                          </div>
                        </div>
                        <span class="align-self-center mb-1 mr-2 text-muted">${pagination.fromItem}-${pagination.toItem} de ${pagination.totalItems}</span>
                        <a class="btn btn-outline py-0" data-action="click->trainings--entities--index#previousTablePage"><i class="material-icons">chevron_left</i></a>
                        <a class="btn btn-outline py-0" data-action="click->trainings--entities--index#nextTablePage"><i class="material-icons">chevron_right</i></a>
                      </div>`

    this.footerTableTarget.innerHTML = footerHtml
    searchTable()
  }

  itemsLength(ev) {
    this.itemsOnPage = ev.target.dataset.items
    this.pageNumber = 0
    this.numberPages = []
    this.doDataTable()
  }

  previousTablePage(ev) {
    if (this.numberPages.includes(this.pageNumber - 1)) {
      this.pageNumber -= 1
      this.doDataTable()
    }
  }

  nextTablePage(ev) {
    if (this.numberPages.includes(this.pageNumber + 1)) {
      this.pageNumber += 1
      this.doDataTable()
    }
  }

  doViewListHtml() {
    var html = `<div class="card" style="width:100%;display:relative;" data-target="trainings--entities--index.viewTrainingCard">
                  <div class="card-header d-flex align-items-center card-header-table-list">
                    <h6 class="card-title display-4" style="padding:1rem;font-size:110%;margin-bottom:0px;" data-target="trainings--entities--index.viewTitle">Nenhum Treinamento Selecionado</h6>
                  </div>
                </div>`

    this.showColTarget.innerHTML = html
  }

  showTraining(ev) {
    this.checkboxShowTargets.forEach(target => {
      if (ev.target.id != target.id) {
        target.checked = false
      }
    });

    if (ev.target.checked) {
      if (this.hasViewTrainingBodyTarget) {
        this.viewTrainingBodyTarget.remove()
        this.viewTitleTarget.innerText = ""
      }
      var id = ev.target.closest(".itemRow").dataset.id
      var training = ``
      this.application.trainings.forEach(element => {
        if (element.id == id) {
          training = element
        }
      });
      var controller = this
      this.viewTitleTarget.innerText = training.name

      new Promise(function (resolve) {
        resolve(controller.viewTrainingCardTarget.insertAdjacentHTML("beforeend", controller.viewTrainingHtml(training)))
      }).then(() => {
        controller.getControllerByIdentifier("app--helpers--elements").tooltip()
      })
    } else {
      this.viewTitleTarget.innerText = "Nenhum Treinamento Selecionado"
      this.viewTrainingBodyTarget.remove()
    }
  }

  viewTrainingHtml(element) {
    // element.is_published = false
    if (element.is_published) {
      var publishHtml = `<span class="material-icons mr-1 pointer md-primary" data-toggle="tooltip" data-placement="top" title data-original-title="Despublicar Treinamento" data-action="click->trainings--entities--index#publishTraining">highlight_off</span>
                        <figcaption class="figure-caption" style="white-space:pre-wrap;">Treinamento Publicado</figcaption>`
    } else {
      var publishHtml = `<span class="material-icons mr-1 pointer md-primary" data-toggle="tooltip" data-placement="top" title data-original-title="Publicar Treinamento?" data-action="click->trainings--entities--index#publishTraining">publish</span>
                        <figcaption class="figure-caption" style="white-space:pre-wrap;">Treinamento Não Publicado</figcaption>`
    }

    var html = `<div class="card-body pt-0" data-target="trainings--entities--index.viewTrainingBody" data-slug="${element.slug}" data-id="${element.id}">
                  <div class="row d-flex align-items-center" style="height:4rem">
                    <div class="col-6 d-flex align-items-center">
                      <figure class="figure btn btn-flat text-center s-title-1rem">
                        <span class="material-icons mr-1 pointer md-primary" data-toggle="tooltip" data-placement="top" title data-original-title="Editar Treinamento" data-action="click->trainings--entities--index#goToEditPage">web</span>
                        <figcaption class="figure-caption">Editar Treinamento</figcaption>
                      </figure>
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <figure class="figure btn btn-flat text-center s-title-1rem" data-target="trainings--entities--index.publishStatus">
                        ${publishHtml}
                      </figure>
                    </div>
                  </div>
                </div>`

    return html
  }

  goToEditPage() {
    var slug = this.viewTrainingBodyTarget.dataset.slug
    window.open(`/a/treinamentos/${slug}`, `_self`)
  }

  publishTraining() {
    var id = this.viewTrainingBodyTarget.dataset.id
    var training = {}
    this.application.trainings.forEach(element => {
      if (element.id == id) {
        training = element
      }
    });

    if (training.is_published) {
      var data = { training: { id: training.id, published_at: null }, current_user: { current_user_id: currentUser.id } }
      var publishHtml = `<span class="material-icons mr-1 pointer md-primary" data-toggle="tooltip" data-placement="top" title data-original-title="Publicar Curso?" data-action="click->trainings--entities--index#publishTraining">publish</span>
                        <figcaption class="figure-caption" style="white-space:pre-wrap;">Curso Não Publicado</figcaption>`
      this.publishStatusTarget.innerHTML = publishHtml
      this.requestSave(data)
    } else {
      var data = { training: { id: training.id, published_at: new Date() }, current_user: { current_user_id: currentUser.id } }
      var publishHtml = `<span class="material-icons mr-1 pointer md-primary" data-toggle="tooltip" data-placement="top" title data-original-title="Despublicar Curso" data-action="click->trainings--entities--index#publishTraining">highlight_off</span>
                        <figcaption class="figure-caption" style="white-space:pre-wrap;">Curso Publicado</figcaption>`
      this.publishStatusTarget.innerHTML = publishHtml
      this.requestSave(data)
    }

    this.getControllerByIdentifier("app--helpers--elements").untooltip()
    this.getControllerByIdentifier("app--helpers--elements").tooltip()
  }

  requestSave(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/trainings/entities/update"
    const init = { method: "PUT", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {
          var training = response.data.cln
          var trainings = this.application.trainings
          trainings.forEach((element, i) => {
            if (element.id == training.id) {
              trainings.splice(trainings.indexOf(element), 1, training)
            }
          });
          this.application.trainings = trainings
          this.doDataTable()
        }
        processingSnackbar(response.type, response.message) //, device)
      })
  }

  editTrainingModal(ev) {
    var trainingId = ev.target.closest(".itemRow").dataset.id
    this.application.getControllerForElementAndIdentifier(this.modalTarget, "trainings--entities--modal").modalHtml("edit", trainingId)
  }

  newTrainingModal() {
    const trainingId = ""
    this.application.getControllerForElementAndIdentifier(this.modalTarget, "trainings--entities--modal").modalHtml("new", trainingId)
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

  nameTarget(target) {
    return this.targets.find(target)
  }

}