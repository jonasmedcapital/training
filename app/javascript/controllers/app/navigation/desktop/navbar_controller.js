import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["main", "result"]

  connect() {
    this.doNavbarHtml()
  }


  doNavbarHtml() {
    var html = `<ul class="nav navbar-nav navbar-right">
              <li>
                <a class="d-flex align-items-center nav-link nav-link-text a-dark pointer" id="appConnection"></span></a>
              </li>
              <li>
                
              </li>
              <li>
                <a class="d-flex align-items-center nav-link nav-link-text nav-link-danger a-dark" data-method="delete" href="/sair" data-toggle="tooltip" data-placement="bottom" title="Sair"><i class="material-icons">exit_to_app</i></a>
              </li>
            </ul>`
    // <li>
    //   <a class="notice nav-link nav-link-text a-dark pointer" style="padding:5px;" data-toggle="tooltip" data-placement="bottom" title="Notificações"><span class="material-icons">notification_important</span><span class="badge badge-danger notice-badge">6</span></a>
    // </li>

    
    this.mainTarget.insertAdjacentHTML("beforeend", html)
  }


}
