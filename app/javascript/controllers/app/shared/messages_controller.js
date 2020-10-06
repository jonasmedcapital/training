import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"]

  connect() {
  }

  generalError() {
    return "Aconteceu um erro, favor atualizar a página. Se o erro persistir, favor entrar em contato no develop@medcapital.com.br"
  }



}
