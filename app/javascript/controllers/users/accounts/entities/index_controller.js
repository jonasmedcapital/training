import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["indexPage", "list", "show", "header", "bodyTable", "cardBody", "checkboxShow", "viewAccountBody", "viewTitle"]

  connect() {
    this.doPageGrid()
    this.doHeader()
  }

  newAccount() {
    var html = `<div class="row">
                  <div class="col-12" data-controller="users--accounts--entities--save" data-target="users--accounts--entities--save.form"></div>
                </div>`

    var controller = this
    new Promise(function (resolve) {
      resolve(controller.showTarget.innerHTML = html)
    }).then(() => {
      controller.getControllerByIdentifier("users--accounts--entities--save").mode = "new"
      controller.getControllerByIdentifier("users--accounts--entities--save").saveHtml()
    }) 
  }

  showAccount(ev) {
    // set como false todos ids nao marcados
    // nao entra no if
    this.checkboxShowTargets.forEach(target => {
      if (ev.target.id != target.id) {
        target.checked = false
      }
    });

    // ev.target.checked verifica o checkbox marcado
    if (ev.target.checked) {

      // verifica se possui os targets abaixo, remove e apaga o conteudo
      if (this.hasFormTarget) {
        this.viewAccountBodyTarget.remove() 
        this.viewTitleTarget.innerText = ""
      }

      // procura o item row para set id, nao ta funcionando
      var id = ev.target.id.split("-")[1] // .closest(".itemRow")
      
      // limpa account
      var account = ``

      // preenche a variavel account procurando no for pelos ids
      this.application.accounts.forEach(element => {
        if (element.id == id) {
          account = element
        }
      });

      var html = `<div class="card">
                  <div class="card-header">
                    <h5>Nova Conta</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                          <div class="">
                            <label for="accountName">Nome</label>
                          </div>
                          <div class="">
                            <label for="accountName">${account.name}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                          <div class="">
                            <label for="accountName">Cpf</label>
                          </div>
                          <div class="">
                            <label for="accountName">${account.cpf_pretty}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-right">
                  </div>
                </div>`

      this.showTarget.innerHTML = html        
      // // salva o this na var controller
      // var controller = this

      // new Promise(function (resolve) {
      //   resolve(controller.showTarget.innerHTML = html)
      // }).then(() => {
      //   controller.getControllerByIdentifier("users--accounts--entities--show").mode = "show"
      //   controller.getControllerByIdentifier("users--accounts--entities--show").showHtml()
      // })
      } //  else {
      //   this.viewTitleTarget.innerText = "Nenhum Treinamento Selecionado"
      //   this.viewTrainingBodyTarget.remove()
      // }

  }

  doPageGrid() {
    var html = `<div class="row my-5">
                  <div class="col-12" data-target="users--accounts--entities--index.header"></div>
                </div>
                <div class="row my-3">
                  <div class="col-6" data-target="users--accounts--entities--index.list"></div>
                  <div class="col-6" data-target="users--accounts--entities--index.show"></div>
                </div>`

    this.indexPageTarget.innerHTML = html
    this.doHeader()
    this.doListCard()
    this.fechtAccounts()
  }

  doHeader() {
    var html = `<div class="media d-flex align-items-center">
                  <span class="material-icons mr-3">account_circle</span>
                  <div class="media-body">
                    <h5 class="m-0">Página de Contas</h5>
                    Gerencia Contas
                  </div>
                </div>`

    this.headerTarget.innerHTML = html
  }

  doListCard() {
    var html = `<div class="card">
                  <div class="card-header d-flex align-items-center py-2">
                    <h5 class="card-title mb-0">Card title</h5>
                    <div class="card-actions ml-auto py-0">
                      <div class="dropdown">
                        <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline my-0" data-toggle="dropdown" id="cardTableDrop2" type="button"><i class="material-icons">more_vert</i></button>
                        <div aria-labelledby="cardTableDrop2" class="dropdown-menu dropdown-menu-right menu">
                          <a class="dropdown-item" style="cursor:pointer;" data-action="click->users--accounts--entities--index#newAccount">Novo</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body" data-target="users--accounts--entities--index.cardBody"></div>
                  <div class="card-footer p-0" data-target="users--accounts--entities--index.cardBody">
                    <div class="card-actions align-items-center justify-content-end">
                      <span class="align-self-center mb-1 mx-1 text-muted">Rows per page:</span>
                      <div class="dropdown">
                        <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline dropdown-toggle" data-toggle="dropdown" type="button">3</button>
                        <div class="dropdown-menu dropdown-menu-right menu">
                          <a class="dropdown-item active" href="#">3</a>
                          <a class="dropdown-item" href="#">10</a>
                          <a class="dropdown-item" href="#">100</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="#">Show all</a>
                        </div>
                      </div>
                      <span class="align-self-center mb-1 mr-2 text-muted">1-3 of 300</span>
                      <a class="btn btn-outline" href="#"><i class="material-icons">chevron_left</i></a>
                      <a class="btn btn-outline" href="#"><i class="material-icons">chevron_right</i></a>
                    </div>
                  </div>
                </div>`

    this.listTarget.innerHTML = html
    this.cardBodyTarget.style.height = ($(window).height() * 0.5) + "px"
  }

  doDataTable() {
    var html = `<table class="table mb-0 table-sm table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                      </tr>
                    </thead>
                    <tbody data-target="users--accounts--entities--index.bodyTable"></tbody>
                  </table>`
    

    this.cardBodyTarget.innerHTML = html
    this.application.accounts.forEach(element => {
      this.bodyTableTarget.insertAdjacentHTML("beforeend", this.accountPartial(element))
    });
  }

  accountPartial(element) {
    var check = `<div class="custom-control custom-checkbox pl-1 d-flex align-items-center">
                  <input type="checkbox" class="custom-control-input" id="check-${element.id}" data-target="marketing--accounts--entities--index.checkboxShow" data-action="click->users--accounts--entities--index#showAccount">
                  <label class="custom-control-label pointer" for="check-${element.id}"></label>
                </div>`

    var html = `<tr class="itemRow">
                  <td>${check}</td>
                  <td>${element.name}</td>
                  <td>${element.cpf_pretty}</td>
                </tr>`

    return html
  }

  fechtAccounts() {
    var data = { current_user: { current_user_id: currentUser.id } }
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/users/accounts/entities/list"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.process) {
          controller.application.accounts = response.data.cln
        } else {
          processingSnackbar(response.type, response.message, device)
        }
        controller.doDataTable()
      })
      .catch(error => {
        processingSnackbar("danger", "Aconteceu um erro, favor atualizar a página. Se o erro persistir, favor entrar em contato no develop@medcapital.com.br", device)
        // form.innerHTML = error.response.data.template
      })
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

}
