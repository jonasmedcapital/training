// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
import { jsPDF } from "jspdf";

export default class extends Controller {
  static targets = [ "formCol", "printCol", "printElement" ]

  connect() {
    console.log("Hello from printing")

    this.doFormColHtml()
    this.doPrintColHtml()
  }

  doFormColHtml() {
    var html = `<div>
                  <div>
                    <h3 class="text-center">Nosso forms</h3>
                    <br/>
                    <button type="button" class="btn btn-danger btn-lg btn-block" data-action="printings--entities--index#printReceipt">PRINT</button>
                  </div>
                </div>`

    this.formColTarget.insertAdjacentHTML("beforeend", html)
  }

  doPrintColHtml() {

    var spaceRow = `<td colspan="10" style="height:2rem;padding-top:1rem;padding-bottom:1rem;" scope="col"></td>`
    
    var html = `<div id="printReceipt">
                  <div class="card" style = "width:100%;display:relative;" data - target="operations--products--bookings--receipts--show.previewCard" id = "printReceipt" data - action="resize@window->operations--products--bookings--receipts--show#layout" >
                  <div class="card-header d-flex align-items-center card-header-table-list f-065">
                    <h6 class="card-title display-4" style="padding:1rem;font-size:110%;margin-bottom:0px;" data-target="operations--products--bookings--receipts--show.previewTitle">Recibo</h6>
                    <div class="card-actions ml-auto py-0">
                      <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline my-0" data-toggle="tooltip" data-placement="top" data-original-title="Imprimir Recibo" data-target="operations--products--bookings--receipts--show.editReceiptBtn" data-action="click->operations--products--bookings--receipts--show#editReceipt" type="button"><i class="material-icons f-1p25">edit</i></button>
                      <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline my-0" data-toggle="tooltip" data-placement="top" data-original-title="Imprimir Recibo" data-target="operations--products--bookings--receipts--show.printReceiptBtn" data-action="click->operations--products--bookings--receipts--show#printReceipt" type="button"><i class="material-icons f-1p25">print</i></button>
                    </div>
                  </div>
                  <div class="card-body py-0" style="overflow:auto;" data-target="operations--products--bookings--receipts--show.previewCardBody printings--entities--index.printElement">
                    <div class="row my-1">
                      <div class="col-12">
                        <table class="table table-sm table-borderless" style="font-size:80%;">
                          <tbody>
                            <tr>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                              <td style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;" scope="col" class="table-10 align-middle"></td>
                            </tr>

                            <tr>
                              <td colspan="10" class="text-center s-title-6F706F s-title-500 s-title-1rem" >
                    Recibo Médico
                              </td>
                            </tr>

                            <tr>
                              <th colspan="1" class="f-065 align-middle px-0">
                                <strong>Médico</strong> <br>
                                <strong>CPF</strong>
                              </th>
                              <td colspan="9" class="f-065 align-middle px-0 text-left">
                      doctor name <br>
                        11111111
                              </td>
                            </tr>

                            <tr>
                      ${spaceRow}
                            </tr>

                            <tr>
                              <td colspan="10" class="f-065 align-middle px-0 text-left">
                        Recebi a importância de 200,
                                em dinheiro, no form,
                                do Jonas Trindade, CPF: 113002155
                                referente a consulta, conforme descrição abaixo, do paciente, CPF: 11111111
                              </td>
                            </tr>

                            <tr>
                              <td colspan="10" class="f-065 align-middle px-0 text-left">
                                <strong>Descrição</strong>: consulta
                              </td>
                            </tr>

                            <tr>
                              <td colspan="10" class="f-065 align-middle px-0 text-left">
                        bhorizonte, 11/11/2020
                              </td>
                            </tr>
                            
                            <tr>
                      ${spaceRow}
                            </tr>

                            <tr>
                              <td colspan="3" class="f-065 align-middle px-0"></td>
                              <td colspan="4" class="f-065 align-middle px-0 text-center" style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;">
                                <hr class="m-0"> <br>
                          nome do assinatura <br>
                            titulo da assinatura <br>
                              numero da assinatura
                              </td>
                              <td colspan="3" class="f-065 align-middle px-0"></td>
                            </tr>

                            <tr>
                            ${spaceRow}
                            </tr>

                            <tr>
                              <td colspan="10" class="f-065 align-middle px-0 text-center" style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;">
                                <small>nome do escritorio</small> <br>
                                <small>
                                  rua, numero, complemento,
                                  bairro, bhorizonte/mg,
                                  CEP: 3000000
                                </small>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="10" class="f-065 align-middle px-0 text-center" style="font-size:80%;height:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;">
                                <small>Documento <strong>com validade</strong> para comprovante de gasto com saúde apenas na Declaração de Ajuste Anual Ano-Exercício ano.</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                </div>`

    this.printColTarget.insertAdjacentHTML("beforeend", html)
  }

  printReceipt() {
    var element = this.printElementTarget
   
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(element, {
      callback: function (pdf) { 
        pdf.save('arq.pdf')
      }
    });
    
  }
  
}