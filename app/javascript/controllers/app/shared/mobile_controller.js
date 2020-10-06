import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
    this.application.device = this.element.dataset.device
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

}
