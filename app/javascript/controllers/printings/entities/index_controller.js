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

    var data = { contractorName: "Jonas Ferreira da Trindade", contractorCpf : "130.430.676.30", contractorAddress : "Rua Ilacir Pereira Lima", contractorAddressNumber : "195", contractorAddressComplement : "sala 305", contractorAddressDistrict : "Cidade Nova", contractorAddressCity : "Belo Horizonte", contractorAddressState : "Minas Gerais", contractorAddressPostalCode : "31140-540", contractorEmail : "jonas.trindade@medcapital.com.br" }
    
    this.dataContract = data
    
    this.doFormColHtml()
    this.doPrintColHtml()
  }

  doFormColHtml() {
    var html = `<div>
                  <div>
                    <h3 class="text-center">Nosso forms</h3>
                    <br/>
                    <button type="button" class="btn btn-danger btn-lg btn-block" data-action="printings--entities--index#printReceipt">PRINT FROM HTML</button>
                    <button type="button" class="btn btn-danger btn-lg btn-block" data-action="printings--entities--index#printText">PRINT FROM TEXT</button>
                    <button type="button" class="btn btn-danger btn-lg btn-block" data-action="printings--entities--index#printDiv">PRINT FROM FROM HTML</button>
                    <button type="button" class="btn btn-danger btn-lg btn-block" data-action="printings--entities--index#printAnotherDiv">PRINT FROM FROM HTML</button>
                  </div>
                </div>`

    this.formColTarget.insertAdjacentHTML("beforeend", html)
  }

  doPrintColHtml() {

    // var spaceRow = `<td colspan="10" style="height:2rem;padding-top:1rem;padding-bottom:1rem;" scope="col"></td>`
    
    var html = `<div id="printReceipt">
                  <div class="card" style = "width:100%;display:relative;">

                  <div class="card-body py-0" style="overflow:auto;"  data-target="printings--entities--index.printElement" id=printElement>
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
                              <td colspan="10" style="text-align:center;" >
                                <b>CONTRATO DE PRESTAÇÃO DE SERVIÇOS PROFISSIONAIS</b>

                                <br>
                                <br>

                              </td>
                            </tr>

                            <tr>
                              <td colspan="10" class="f-065 align-middle px-0 text-left">

                                <b>CONTRATANTE:</b> ${this.dataContract.contractorName}, CPF nº ${this.dataContract.contractorCpf}, residente e domiciliado na ${this.dataContract.contractorAddress}, nº ${this.dataContract.contractorAddressNumber}, ${this.dataContract.contractorAddressComplement}, bairro ${this.dataContract.contractorAddressDistrict}, cidade de ${this.dataContract.contractorAddressCity}, Estado ${this.dataContract.contractorAddressState}, CEP ${this.dataContract.contractorAddressPostalCode}, E-mail ${this.dataContract.contractorEmail};
                                
                                <br>
                                <br>

                                <b>CONTRATADA:</b> Medcapital Serviços e Assessoria Financeira LTDA - ME, com escritório à Rua Ilacir Pereira Lima, 195, sala 305, Bairro Silveira, Belo Horizonte/MG, inscrita no CNPJ sob o Nº 23.448.747/0001-02;

                                <br>
                                <br>


                                <b>1.CLÁUSULA PRIMEIRA - OBJETO</b>

                                <br>
                                <br>

                                <b>1.1</b> O presente Contrato tem como objeto regular o fornecimento, pela <b>CONTRATADA</b> à <b>CONTRATANTE</b>, dos serviços de Elaboração e Transmissão da Declaração de Ajuste Anual do Imposto de Renda sobre Pessoa Física do exercício de 2021 (DIRPF 2021), ano-calendário de 2020, descritos na cláusula segunda abaixo.

                                <br>
                                <br>

                                <b>2. CLÁUSULA SEGUNDA – SERVIÇOS</b>

                                <br>
                                <br>

                                <b>2.1.</b> A <b>CONTRATADA</b> prestará à <b>CONTRATANTE</b> os serviços de Análise, Preenchimento, Transmissão e Acompanhamento do processamento da Declaração de Ajuste Anual do Imposto de Renda sobre Pessoa Física (DIRPF 2021) do exercício de 2021 (IR 2021), ano-calendário de 2020, com as informações e os comprovantes fornecidos pela <b>CONTRATANTE</b> à <b>CONTRATADA</b>.

                                <br>
                                <br>

                                <b>2.2.</b> O serviço de análise será feita em Reunião de Alinhamento do IRPF 2021, a ser realizada por via eletrônica (vídeo-chamada) ou por ligação telefônica e mediante prévio agendamento, na qual serão tratados os seguintes pontos:

                                <br>
                                <br>

                                I. Verificação da possibilidade de economia tributária;<br>
                                II. Levantamento dos pontos de atenção com enfoque em cruzamentos e questionamentos normalmente realizados pela Receita Federal;<br>
                                III. Preenchimento do Formulário de  Alinhamento IRPF 2021;<br>
                                IV. Solicitação do envio  da documentação comprobatória.<br>

                                <br>
                                <br>

                                <b>2.3.</b> Posteriormente a Reunião de Alinhamento e ao encaminhamento da documentação comprobatória será enviado, por meio da plataforma www.medcapital.com.br, o Rascunho da DIRPF 2021, ato em que a <b>CONTRATANTE</b> será:

                                <br>
                                <br>

                                I. Comunicada sobre a ausência de qualquer informação obrigatória não registrada no Formulário de Alinhamento IRPF 2021;<br>
                                II. Apresentada à opção tributária mais favorável a <b>CONTRATANTE</b>;<br>
                                III. Advertida sobre o relatório de inconsistências e apresentada às sugestões de ajuste;<br>
                                IV. Solicitada a apresentar a documentação comprobatória que esteja faltando.<br>

                                <br>
                                <br>

                                <b>2.4.</b> A transmissão da DIRPF 2021 só ocorrerá após a aprovação pela <b>CONTRATANTE</b> do Rascunho da DIRPF 2021.

                                <br>
                                <br>
                                
                                <b>2.4.1. A CONTRATANTE declara que - caso não emita sua validação expressa até o dia 29/04/2021 - a <b>CONTRATADA</b> está autorizada a transmitir a DIRPF 2021 no dia 30/04/2021 com base nas informações contidas no Rascunho.</b>

                                <br>
                                <br>
                              
                                <b>2.5.</b> Após a transmissão, a <b>CONTRATADA</b>, dentro do período de vigência deste Contrato, fará o acompanhamento do processamento da DIRPF 2021 perante a Receita Federal (portal e-CAC).

                                <br>
                                <br>
                              
                                <b>2.5.1.</b> Caso durante o acompanhamento for constatada alguma pendência vinculada à Declaração DIRPF 2021 a <b>CONTRATADA</b> fará uma única retificação para a regularização da situação fiscal da <b>CONTRATANTE</b>. 

                                <br>
                                <br>
                              
                                <b>2.5.2.</b> Qualquer rerratificação porventura necessária só será realizada mediante a autorização e pagamento imediato pela <b>CONTRATANTE</b> do adicional de R$300,00 (trezentos reais) por rerratificação.

                                <br>
                                <br>
                              
                                <b>2.5.3.</b> O acompanhamento não contempla a prestação de contas de forma presencial na Receita Federal, sendo esta uma responsabilidade da <b>CONTRATANTE</b> ou serviço avulso da <b>CONTRATADA</b>, conforme previsto na Cláusula 3ª, item 3.4.

                                <br>
                                <br>
                              
                                <b>3. CLÁUSULA TERCEIRA – VALORES E FORMAS DE PAGAMENTO</b>

                                <br>
                                <br>
                              
                                <b>3.1.</b> A <b>CONTRATANTE</b> pagará, no prazo de 5 (cinco) dias úteis após a assinatura do presente contrato, o valor de R$ 900,00 (novecentos reais) pelos Serviços descritos na Cláusula 1ª.

                                <br>
                                <br>

                                <b>3.1.1.</b> O valor acima descrito poderá ser pago através de débito no boleto bancário, conforme a escolha da CONTRATANTE.

                                <br>
                                <br>

                                <b>3.1.2.</b> Eventual aceitação da CONTRATADA em receber o valor previsto no item 3.1. Acima intempestivamente, a seu critério, não importará em novação, mas em mera liberalidade da CONTRATADA, permanecendo inalteradas as cláusulas deste Contrato.

                                <br>
                                <br>

                                <b>3.2.</b> Os valores gastos com taxas de órgãos públicos, taxas cartorárias e para execução do serviço, tais como livros, correios, carimbos, pastas de arquivos, CDs, cópias, motoboys, transporte (uber, ônibus, moto táxi, metrô), despachantes, caso necessário, serão antecipados pela CONTRATADA e reembolsados pela CONTRATANTE, mediante apresentação dos respectivos comprovantes.

                                <br>
                                <br>

                                <b>3.3.</b> Para diligências junto a cartórios e órgãos públicos, caso necessário, será cobrado o valor de R$ 300,00 (trezentos reais) por serviço.

                                <br>
                                <br>

                                <b>3.4.</b> Poderá a CONTRATANTE optar pela entrega da documentação comprobatória do IR 2021 por outro meio que não a plataforma www.medcapital.com.br desde que mediante o pagamento imediato do valor adicional de R$ 300,00 (trezentos reais).

                                <br>
                                <br>

                                <b>4. CLÁUSULA QUARTA - VIGÊNCIA</b>

                                <br>
                                <br>

                                <b>4.1.</b> Este Contrato entra em vigor na data do seu aceite pela CONTRATANTE e terá vigência de 12 (doze) meses, contados a partir da assinatura do presente contrato. 

                                <br>
                                <br>

                                <b>4.2.</b> As partes podem rescindir o presente contrato a qualquer tempo, desde que, mediante notificação prévia com 30 (trinta) dias de antecedência da data em que deseje rescindir. A notificação deverá ser enviada para o e-mail: ir2021@medcapital.com.br.

                                <br>
                                <br>

                                <b>4.3.</b> Em caso de rescisão a CONTRATADA não efetuará o reembolso de nenhuma quantia investida a qualquer critério.

                                <br>
                                <br>

                                <b>4.4.</b> A rescisão do presente contrato implicará no vencimento antecipado de todas as parcelas vincendas às quais juntamente com as vencidas e não pagar e as obrigações acessórias previstas na cláusula terceira deverão ser quitadas pela CONTRATANTE no prazo de trinta dias corridos, contados a partir do pedido da rescisão.

                                <br>
                                <br>

                                <b>5. CLÁUSULA QUINTA – OBRIGAÇÕES DA CONTRATANTE</b>

                                <br>
                                <br>

                                <b>5.1.</b> A partir da aceitação e adesão ao presente Contrato a CONTRATANTE compromete-se a:

                                <br>
                                <br>

                                <b>5.1.1.</b> Coletar os documentos do ano-calendário de 2020 e enviá-los em formato digital à CONTRATADA até o dia 31/03/2021 por meio do ambiente www.medcapital.com.br.

                                <b>5.1.2.</b> Fornecer os usuários, códigos de acesso e senhas de acesso da CONTRATANTE nos sistemas da Receita Federal para o acompanhamento da declaração.

                                <b>5.1.3.</b> Manter em sua posse um certificado digital e-CPF A1 válido. 


                                <br>
                                <br>

                                <b>5.2. A CONTRATANTE terá até o dia 31/03/2021 para agendar a Reunião de Alinhamento do IR 2021, sendo que, após esta data,  a reunião não será realizada e a Transmissão da Declaração de Ajuste Anual do Imposto de Renda da Pessoa Física (DIRPF) ocorrerá com base apenas na documentação enviada.</b>

                                <br>
                                <br>

                                <b>5.3.</b> A <b>CONTRATANTE</b> terá até o dia <b>31/03/2021</b> para fazer o envio dos comprovantes. 

                                <br>
                                <br>

                                <b>5.4.</b> Todos os comprovantes da <b>CONTRATANTE</b> deverão ser enviados pela plataforma https://www.medcapital.com.br, com acesso por login e senha fornecidos pela <b>CONTRATADA.</b>

                                <br>
                                <br>

                                <b>5.5.</b> Não serão analisados os comprovantes enviados por WhatsApp, e-mail ou outros meios que não a plataforma  https://www.medcapital.com.br, exceto quando opte o cliente pelo pagamento do adicional previsto no item 3.5 da cláusula 3.


                                <br>
                                <br>

                                <b>5.6.</b> A CONTRATANTE é responsável por disponibilizar à CONTRATADA os arquivos auxiliares referente a Declaração de Ajuste Anual do Imposto de Renda sobre Pessoa Física (DIRPF 2021): 

                                <br>
                                <br>

                                I. Carnê Leão 2020;<br>
                                II. G-Cap 2020;<br>
                                III. Livro-Caixa da Atividade Rural 2020; e os<br>
                                IV. Relatórios de Negociações de Ativos na bolsa de valores, com as devidas DARFs quitadas ao longo do ano de 2020.<br>

                                <br>
                                <br>

                                <b>5.7.</b> A <b>CONTRATANTE</b> fica ciente desde já que, caso sejam identificadas pendências anteriores à competência da DIRPF 2021 serão cobrados, para a sua resolução, valores adicionais àqueles previstos no item 3.1. da cláusula 3ª a serem determinados pela <b>CONTRATADA</b> conforme a complexidade do serviço.

                                <br>
                                <br>

                                <b>5.8.</b> A <b>CONTRATANTE</b> é responsável pelo correto arquivamento on-line de todos os documentos, incluindo informes de rendimentos, comprovantes de despesas e notas fiscais recebidas e demais documentos comprobatórios do IR 2021. 

                                <br>
                                <br>

                                <b>5.9.</b> A <b>CONTRATANTE</b> declara que as informações que serão fornecidas para escrituração e elaboração da DIRPF 2021, obrigações acessórias, apuração de tributos e arquivos eletrônicos exigidos pela fiscalização federal, estadual, municipal, trabalhista e previdenciária são fidedignas. 

                                <br>
                                <br>

                                <b>5.10.</b> A <b>CONTRATANTE</b> é responsável pela veracidade de todas as informações enviadas para a <b>CONTRATADA</b>.

                                <br>
                                <br>

                                <b>5.11.</b> A <b>CONTRATANTE</b> declara não existirem quaisquer fatos ocorridos no ano calendário que afetam ou possam afetar a DIRPF 2021 ou, ainda, a continuidade das operações da <b>CONTRATANTE</b>. 

                                <br>
                                <br>

                                <b>5.12.</b> A CONTRATANTE declara que não realizou e nem realizará nenhum tipo de operação que possa ser considerada ilegal, frente à legislação vigente; bem como não violou leis, normas ou regulamentos cujos efeitos deveriam ser considerados para divulgação da DIRPF 2021, ou mesmo dar origem ao registro de provisão para contingências passivas.

                                <br>
                                <br>

                                <b>6. CLÁUSULA SEXTA - OBRIGAÇÕES DA CONTRATADA.</b>

                                <br>
                                <br>

                                <b>6.1.</b> A partir da aceitação dos termos contratados a <b>CONTRATADA</b>. compromete-se a:

                                <br>
                                <br>

                                <b>6.1.1.</b> desempenhar os serviços com todo zelo, diligência e honestidade, observada a legislação vigente, resguardando os interesses do <b>CONTRATANTE</b>, sem prejuízo da dignidade e independência profissionais, sujeitando-se, ainda, às normas do Código de Ética Profissional do Contabilista.

                                <br>
                                <br>

                                <b>6.1.2.</b> fornecer à <b>CONTRATANTE</b> todas as informações relativas ao andamento dos serviços ora contratados e solução das dúvidas pertinentes a consecução dos objetos deste contrato, desde que no escritório e dentro do horário normal de expediente (09:00 às 18:00, de segunda à sexta) da <b>CONTRATADA</b>. Caso seja necessário, será possível, mediante prévio agendamento, o atendimento fora do horário de atendimento.  

                                <br>
                                <br>

                                <b>7. CLÁUSULA SÉTIMA – DISPOSIÇÕES GERAIS </b>

                                <br>
                                <br>

                                <b>7.1.</b> A  <b>CONTRATADA</b> não se responsabilizará, em nenhuma hipótese, pelas multas, juros e correção monetária, de qualquer natureza, imputadas à <b>CONTRATANTE</b> e decorrentes da presente prestação de serviços. 

                                <br>
                                <br>

                                <b>7.2.</b> A <b>CONTRATADA</b> não assume nenhuma responsabilidade pelas consequências de informações, declarações ou documentação inidôneas ou incompletas que lhe forem apresentadas, bem como por omissões próprias da <b>CONTRATANTE</b> ou decorrentes do desrespeito à orientação prestada.

                                <br>
                                <br>

                                <b>7.3.</b> A <b>CONTRATADA</b> não se responsabiliza pelas consequências decorrentes de atraso na entrega de documentos e declarações por parte da <b>CONTRATANTE</b> ou entidades e pessoas externas que não sejam empregados ou prestadores de serviços da <b>CONTRATADA</b>, bem como nos casos em que não houver tempo hábil para a execução dos serviços e/ou a <b>CONTRATADA</b> não estiverem de posse das informações e documentações necessárias para realização do objeto do presente Contrato.

                                <br>
                                <br>

                                <b>8. CLÁUSULA OITAVA – ELEIÇÃO DE FORO E RESOLUÇÃO DE CONFLITOS</b>

                                <br>
                                <br>

                                <b>8.1.</b>Fica eleito o foro da Comarca de Belo Horizonte/MG para dirimir quaisquer dúvidas ou litígios decorrentes deste Contrato, renunciando expressamente a qualquer outro, mesmo que privilegiado.

                                <br>
                                <br>

                                <b>8.2.</b>E por estarem de comum acordo, assinam o presente instrumento em duas vias, de igual teor e forma, na presença das testemunhas abaixo.

                                <br>
                                <br>

                                Belo Horizonte, XX  de Dezembro de 2020.

                                <br>
                                <br>

                                <br>
                                <br>

                                <br>
                                <br>

                                <br>
                                <br>

                                
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

  printText() {
    var doc = new jsPDF();
    
    
    doc.text(20, 20, 'Hello **World**!')
    
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    doc.save(`arq${Date.now}`)
  }

  printFromHtml() {
    var doc = new jsPDF();


    doc.fromHTML('<b>CONTRATADA:</b> Medcapital Serviços e Assessoria Financeira LTDA - ME, com escritório à Rua Ilacir Pereira Lima, 195, sala 305, Bairro Silveira, Belo Horizonte / MG, inscrita no CNPJ sob o Nº 23.448.747 / 0001 - 02;', 35, 25)

    // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');

    // doc.addPage();
    // doc.text(20, 20, 'Do you like that?');

    doc.save('arq.pdf')
  }

  printDiv(div) {

    div = "printElement"
    var element = document.getElementById(div);
    var domClone = element.cloneNode(true);
    var $printSection = document.createElement("div");
    $printSection.id = "printSection";
    $printSection.appendChild(domClone);
    document.body.insertBefore($printSection, document.body.firstChild);
    window.print();

    var oldElement = document.getElementById('printSection');
    if (oldElement != null) { oldElement.parentNode.removeChild(oldElement); }

    return true;
  }

  printAnotherDiv() {
    
    var divToPrint = document.getElementById('printElement');
    var newWin = window.open();
    newWin.document.write(divToPrint.innerHTML);
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
    
  }
  
}