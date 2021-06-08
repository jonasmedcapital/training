import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["uploadCol", "upload", "headerTable", "bodyTable", "columnCell", "lineCell", "tableCsv"]

  connect() {
    this.controllerName = `uploads--entities--index`
    this.doUpload()
  }

  doUpload() {
    var html = `<div class="card m-2" style="width:100%;display:relative;" data-target="${this.controllerName}.cardBody">
                  <div class="card-header">
                    <div class="row justify-content-md-center">
                      <div class="col-md-auto">
                        <input type="file" id="fileinput" accept=".csv" data-target="${this.controllerName}.upload" data-action="change->${this.controllerName}#readSingleFile"/>
                      </div>
                      <div class="col-md-auto">
                        <button data-action="click->${this.controllerName}#sendCsv">Submit</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col p-0">
                          <div class="table-responsive">
                          <table data-target="${this.controllerName}.tableCsv" id="table0" class="table table-sm table-hover table-search" style="font-size:80%;">
                            <h7>*Marque as colunas que não deseja valore vazios</h7><br>
                            <h7>*As linhas em vermelho possuem células com o valor |PREENCHER| que corresponde a vazio</h7><br>
                            <thead data-target="${this.controllerName}.headerTable" class="align-middle">
                            </thead>
                            <tbody data-target="${this.controllerName}.bodyTable">
                            </tbody>
                          </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer py-0" data-target="${this.controllerName}.footerTable"></div>
                </div>`
    
    this.uploadColTarget.innerHTML = html
  }

  // leitura de arquivo carregado atraves do input de arquivos na pagina
  // funcao captura o evento de change no input
  readSingleFile(ev) {
    // verifica se existe arquivo carregado na pagina
    if(this.hasCsvOnPage) {
      // controle para esvaziar o header gerado de arquivo anteriormente carregado
      this.headerTableTarget.innerHTML = ``
      
      // controle para esvaziar a tabela gerada de arquivo anteriormente carregado 
      this.bodyTableTarget.innerHTML = `` 
    } 

    // insercao do arquivo em uma variavel local file
    var file = ev.target.files[0];

    // verifica se existe arquivo
    if (file) { 
      // leitura do arquivo carregado na pagina atraves da funcao do JS
      var readedFile = new FileReader() 
      var controller = this 

      readedFile.onload = function (e) {
        // inserir o conteudo do arquivo carreado em uma variavel global da pagina
        controller.csv = e.target.result
        // controlar se existe arquivo carregado na pagina 
        controller.hasCsvOnPage = true 
        // funcao que inicia o processo de quebrar o arquivo e inserir em uma tabela html
        controller.csvToTable(controller.csv) 
      }

      // necessario no script encontrado na internet
      readedFile.readAsText(file) 
    } else {
      // falha na leitura do arquivo
      console.log("Falha ao ler o arquivo") 
    }
  }

  // split dos headers por virgulas em um array em variavel global
  // insercao   
  csvToTable(csv) {
    // quebra do conteudo do arquivo em linhas procurando o fim do arquivo procurando o '\n'
    // insercao dessa quebra no array global tableLines
    this.tableLines = csv.split("\n")
    
    // insercao do tamanho do tableLines na variavel global tableLinesLength
    this.tableLinesLength = this.tableLines.length

    // quebra do conteudo dos headers procurando as ','
    // insercao dessa quebra no array global tableHeaders
    this.tableHeaders = this.tableLines[0].split(",")
    
    // insercao do tamanho do tableHeaders na variavel global tableHeadersLength
    this.tableHeadersLength = this.tableHeaders.length
    
    // adiciona o html dos headers na pagina
    this.headerTableTarget.insertAdjacentHTML("beforeend", this.doHeadTable())
    
    // adiciona o html da table na pagina
    this.bodyTableTarget.insertAdjacentHTML("beforeend", this.doBodyTable())

  }

  // constroi o header a partir da variavel global tableHeaders
  doHeadTable() {
    var html = `<th>
                <div class="col">
                  <label class="row">Posição</label> 
                </div>
              </th>`

    // each nos headers para adicionar o html na pagina
    this.tableHeaders.forEach(element => {
      html += `<th>
                <div class="col">
                  <label class="row">${element}</label>
                  <input class="row align-bottom" type="checkbox" value="${element}" data-action="click->${this.controllerName}#emptyLineValidate" data-target="${this.controllerName}.columnCell-${element}"> 
                </div>
              </th>`
    })
    return html
  }

  // consulta na tabela se o checkbox marcado relacionado 
  // possui alguma linha na tabela com valor vazio "|PREENCHER|""  
  emptyLineValidate(ev) {
    var controller = this
    // caminha pelas linhas da tabela fora a linha 
    // dos headers, por isso o index parte do 1
    for (var r = 1; r < this.tableLinesLength; r++) {

      // utiliza do tamanho do array global tableHeadersLength para caminhar pelas celulas 
      for (var c = 0; c < this.tableHeadersLength; c++) {

        this.tableHeaders.forEach(function (element, i) {
          if (element == ev.target.value && ev.target.checked) {
            // se o valor da celula estiver vazio "|PREENCHER|" 
            // a linha fica vermelha como alerta para o cliente 
            if (controller.nameTarget(`columnCell-${r}-${i}`).innerText == "|PREENCHER|") {
              controller.nameTarget(`lineCell-${r}`).classList.remove("table-success")
              controller.nameTarget(`lineCell-${r}`).classList.add("table-danger")

            }
          } else if (element == ev.target.value && !ev.target.checked) {
            // se nao existir valor vazio a linha fica verde
            if (controller.nameTarget(`columnCell-${r}-${i}`).innerText == "|PREENCHER|") {
              controller.nameTarget(`lineCell-${r}`).classList.remove("table-danger")
              controller.nameTarget(`lineCell-${r}`).classList.add("table-success")
            }
          }
        })
      }
    }
  }

  // constroi o html da tabela
  doBodyTable() {
    // remove html da tabela de arquivos antigos
    var htmlColumn = ``
    var htmlRow = ``
    
    // caminha pelas linhas da tabela fora a linha 
    // dos headers, por isso o index parte do 1
    for (var i = 1; i < this.tableLinesLength; i++) {

      // insere na variavel local currentLine o conteudo da linha 
      var currentLine = this.tableLines[i].split(",")
      htmlColumn = ``

      // utiliza do tamanho do array global tableHeadersLength para caminhar pelas celulas 
      for (var j = 0; j < this.tableHeadersLength; j++) {
        // insere uma celula com valor vazio |PREENCHER| caso a celular esteja vazia
        if (currentLine[j] == '') {
          htmlColumn += `<td id="${i}" style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="${this.controllerName}.columnCell-${i}-${j}">
                          <span class="text-bold justify" data-action="click->${this.controllerName}#editUnit">|PREENCHER|</span>
                          <input autofocus data-field="order" data-action="keyup->${this.controllerName}#saveUnit change->${this.controllerName}#saveUnit blur->${this.controllerName}#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required>
                        </td>`
        
        // insere uma celula com o valor da currentLine
        } else {
          htmlColumn += `<td id="${i}" style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="${this.controllerName}.columnCell-${i}-${j}">
                          <span class="text-bold justify" data-action="click->${this.controllerName}#editUnit">${currentLine[j]}</span>
                          <input autofocus data-field="order" data-action="keyup->${this.controllerName}#saveUnit change->${this.controllerName}#saveUnit blur->${this.controllerName}#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required>
                        </td>`
        }
      }

      // adiciona na linha o conteudo das celulas
      htmlRow += `<tr data-target="${this.controllerName}.lineCell-${i}">
                    <td style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="${this.controllerName}.columnCell-${i}">
                      <span class="text-bold">${i}</span>
                      <input autofocus data-field="order" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required>
                    </td>
                    ${htmlColumn}
                    <td style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="${this.controllerName}.columnCell-${i}">
                      <span class="text-bold"></span>
                      <input autofocus data-field="order" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required>
                    </td>
                    <td style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="${this.controllerName}.columnCell-${i}">
                      <span class="text-bold"></span>
                      <button id=${i} data-action="click->${this.controllerName}#deleteLine" type="button" class="btn btn-sm btn-table editAuthor p-0" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remover linha"><span class="material-icons md-sm md-dark">delete</span></button>
                    </td>
                  </tr>`
    }

    return htmlRow;
  }

  // remove a linha marcada pelo id usando o icone lixeira
  deleteLine(ev){
    this.nameTarget(`lineCell-${ev.target.parentElement.id}`).remove()
  }

  // edita o valor da celula ao clicar em cima da celula
  editUnit(ev) {
    var span = ev.target
    var input = ev.target.nextElementSibling
    span.classList.add("d-none")
    input.classList.remove("d-none")
    input.value = span.innerText
    input.focus()
  }

  // salva o valor apos editar
  saveUnit(ev) {
    var span = ev.target.previousElementSibling
    var input = ev.target

    if ((ev.type == "keyup" && ev.key == "Escape" && ev.shiftKey == false)) {
      span.classList.remove("d-none")
      input.classList.add("d-none")
    } else if ((ev.type == "keyup" && ev.key == "Enter" && ev.shiftKey == false) || ev.type == "blur") {
      const value = input.value.trim()
      const field = input.dataset.field
      span.classList.remove("d-none")
      input.classList.add("d-none")
      if (value != span.innerText && value != "") {
        this.bindOutput(span, field, value)
        this.dangerToSuccessRow(ev)
      }
    }
  }

  // verifica se a celula ainda esta no estado vermelho
  // ela e chamada quando o cliente edita uma celula
  dangerToSuccessRow(ev) {
    var controller = this
    if (ev.target.value == "|PREENCHER|") {
      
    } else {
      controller.dangerCell = false
      this.tableHeaders.forEach(function (element, i) {
        if (controller.nameTarget(`columnCell-${element}`).checked){
          if (controller.nameTarget(`columnCell-${ev.target.parentElement.id}-${i}`).innerText == "|PREENCHER|"){
            // cell with danger
            controller.dangerCell = true
          }
        }        
      })
      if (!controller.dangerCell){
        // line ok - success
        ev.target.parentElement.parentElement.classList.remove("table-danger")
        ev.target.parentElement.parentElement.classList.add("table-success")
      }
    }
  }


  bindOutput(span, field, value) {
    if (field == "order") {
      span.innerText = value
    } else {
      span.innerText = value
    }
  }

  // evento chamado quando botao submit é clicado
  sendCsv() {
    if (this.csv) {
      this.getCellValues()
    }
  }
  
  // criar json a partir da tabela html alterada pelo clinete
  getCellValues() {
    var table = this.tableCsvTarget
    var lines = [];
    for (var r = 1, n = table.rows.length; r < n; r++) {
      var line = [];
      for (var c = 0, m = table.rows[r].cells.length - 3; c < m; c++) {
        line.push(this.tableHeaders[c].replace(/(\r\n|\n|\r)/gm, "") + ": " + table.rows[r].cells[c+1].innerText);
        // line.push(table.rows[r].cells[c].innerText);
      }
      lines.push(line);
    }
    this.saveCsv({ upload: lines })
  }

  // fetch api
  saveCsv(data) {
    const token = $('meta[name=csrf-token]').attr('content');
    const url = "/uploads/entities/upload"
    const init = { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    fetch(url, init)
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        if (response.save) {
          // console.log(response)    
        } else {
          
        }
        processingSnackbar(response.type, response.message) //, device)
      })
  }

  nameTarget(target) {
    return this.targets.find(target)
  }

}