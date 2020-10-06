import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["validGroup", "userCpf", "userPassword", "btnSignIn", "5555", "6666", "7777", "8888", "9999"]

  connect() {
    this.refreshSignInBtn()
    this.userCpfTarget.focus()
    this.signInProcess = false
  }

  cleanValidations(ev) {
    ev.target.classList.remove("invalid-field")
    while (ev.target.nextElementSibling) {
      ev.target.nextElementSibling.remove()
    }
  }

  validatePassword(ev) {
    if (ev.type == "keyup" && ev.target.value.length != 0 || ev.type == "blur" && ev.target.value.length != 0) {
      ev.target.closest(".form-valid-group").dataset.valid = true
    } else {
      ev.target.closest(".form-valid-group").dataset.valid = false
    }

  }

  validateCpf(ev) {
    if ((ev.type == "keyup" && ev.target.value.length == 14) || ev.type == "blur") {
      var value = this.getControllerByIdentifier("app--helpers--numbers").fromCpfToNumber(ev.target.value)
      var token = $('meta[name=csrf-token]').attr('content');
      var url = "/validations/logins/validate"
      var method = "POST"
      var data = { validation: { value: value } }
      const init = { method: method, credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
      fetch(url, init)
        .then(response => response.json())
        .then(response => {
          if (response.valid) {
            this.cleanValidations(ev)
            ev.target.closest(".form-valid-group").dataset.valid = true
            this.userPasswordTarget.disabled = false
          } else {
            ev.target.closest(".form-valid-group").dataset.valid = false
            this.userPasswordTarget.disabled = true
            ev.target.classList.add("invalid-field")
            const html = '<div class="invalid-warning my-1 py-1" data-target="users--auth--forgotten.invalid"></div>'
            response.messages.forEach(message => {
              if (ev.target.nextElementSibling) {
                ev.target.nextElementSibling.innerText = message
              } else {
                ev.target.parentElement.insertAdjacentHTML("beforeend", html);
                ev.target.nextElementSibling.insertAdjacentHTML("beforeend", message);
              }
            });
          }
        })
    } else {
      this.cleanValidations(ev)
    }
  }

  signIn(ev) {
    if ((ev.type == "keyup" && ev.key == "Enter" && ev.shiftKey == false && ev.target.value.length != 0) || ev.type == "click") {
      this.stopRefreshing()
      this.btnSignInTarget.disabled = true
      this.userPasswordTarget.disabled = true
      var cpf = this.getControllerByIdentifier("app--helpers--numbers").fromCpfToNumber(this.userCpfTarget.value)
      var password = this.userPasswordTarget.value
      var token = $('meta[name=csrf-token]').attr('content');
      var url = "/entrar"
      var method = "POST"
      var data = { user: { cpf: cpf, password: password } }
      const init = { method: method, credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
      fetch(url, init)
        .then(response => response.json())
        .then(response => {
          if (response.process) {
            processingSnackbar(response.type, response.message, this.application.device, 2000)
            window.open(response.location, `_self`)
          } else {
            processingSnackbar(response.type, response.message, this.application.device, 2000)
            this.refreshSignInBtn()
            // this.signInProcess = false
            this.userPasswordTarget.disabled = false
            this.btnSignInTarget.disabled = false
          }
        })
        .catch(error => {
          processingSnackbar("danger", this.getControllerByIdentifier("app--shared--messages").generalError(), this.application.device)
        })
    }
  }

  refreshSignInBtn() {
    var controller = this
    this.refreshTimer = setInterval(function () {
      var len = 0
      controller.validGroupTargets.forEach(element => {
        if (controller.getControllerByIdentifier("app--helpers--strings").fromStringToBoolean(element.dataset.valid) == false) {
          len += 1
        }
      });
      if (len == 0) {
        controller.btnSignInTarget.disabled = false
      } else {
        controller.btnSignInTarget.disabled = true
      }
    }, 200);
  }

  stopRefreshing() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }

  getControllerByIdentifier(identifier) {
    return this.application.controllers.find(controller => {
      return controller.context.identifier === identifier;
    });
  }

}
