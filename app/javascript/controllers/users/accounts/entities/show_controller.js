import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["form", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  showHtml() {

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
                            <input aria-describedby="accountNameHelp" class="form-control" id="accountName" placeholder="Nome" type="text" data-target="users--accounts--entities--show.name">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group">
                          <div class="floating-label">
                            <label for="accountCpf">CPF</label>
                            <input aria-describedby="accountCpfHelp" class="form-control" id="accountCpf" placeholder="CPF" type="text" data-target="users--accounts--entities--show.cpf">
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

  

}
