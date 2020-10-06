import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["form", "name", "cpf", "saveBtn", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  saveAccount() {
    var data = { account: { name: this.nameTarget.value, cpf: this.cpfTarget.value }, current_user: { current_user_id: currentUser.id } }
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/users/accounts/entities/create"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    var controller = this
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        if (response.save) {

          if (controller.mode == "new") {
            controller.application.accounts[controller.application.accounts.length] = response.data.cln
          } else if (controller.mode == "edit") {
            
          }
          controller.getControllerByIdentifier(`users--accounts--entities--index`).doDataTable()
          controller.formTarget.innerHTML = ""
        } else {
          processingSnackbar(response.type, response.message, device)
        }
      })
      .catch(error => {
        processingSnackbar("danger", "Aconteceu um erro, favor atualizar a página. Se o erro persistir, favor entrar em contato no develop@medcapital.com.br", device)
      })
  }

  saveHtml() {
    var html = `<div class="card">
                  <div class="card-header">
                    <h5>Nova Conta</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                          <div class="floating-label">
                            <label for="accountName">Nome</label>
                            <input aria-describedby="accountNameHelp" class="form-control" id="accountName" placeholder="Nome" type="text" data-target="users--accounts--entities--save.name">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                          <div class="floating-label">
                            <label for="accountCpf">CPF</label>
                            <input aria-describedby="accountCpfHelp" class="form-control" id="accountCpf" placeholder="CPF" type="text" data-target="users--accounts--entities--save.cpf">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-right">
                    <button class="btn btn-flat btn-flat-secondary" type="button">Cancelar</button>
                    <button class="btn btn-primary" type="button" data-target="users--accounts--entities--save.saveBtn" data-action="click->users--accounts--entities--save#saveAccount">Salvar</button>
                  </div>
                </div>`

    this.formTarget.innerHTML = html
    // this.formTarget.insertAdjacentHTML("beforeend", html)
    
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

}
