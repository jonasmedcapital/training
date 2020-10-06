
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["place", "result"]

  connect() {
    this.doSubmenuHtml()
  }

  goTo(ev) {
    var url = ev.target.dataset.url
    window.open(url, '_self');
  }

  doSubmenuHtml() {
    // `<span data-url="/a/buscas" data-action="click->marketing-dashboard-submenu#goTo" class="dropdown-item py-1 pointer">Buscas</span>`
    // `<span data-url="/a/visitas" data-action="click->marketing-dashboard-submenu#goTo" class="dropdown-item py-1  pointer">Visitas</span>`
    var submenuHtml = `<div class="dropdown" data-toggle="tooltip" data-placement="top" data-original-title="Submenu">
                        <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline my-0" data-toggle="dropdown" id="marketingMenuDrop" type="button"><i class="material-icons">apps</i></button>
                        <div aria-labelledby="marketingMenuDrop" class="dropdown-menu dropdown-menu-right menu" style="font-size:80%">
                          <span data-url="/a/treinamentos" data-action="click->trainings--entities--submenu#goTo" class="dropdown-item py-1 pointer">Dashboard Treinamentos</span>
                        </div>
                      </div>`

    this.placeTarget.innerHTML = submenuHtml
    tooltip()
  }

  

}
