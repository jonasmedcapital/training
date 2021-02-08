import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["container", "uploadCol", "upload", "headTable", "bodyTable", "columnCell", "lineCell", "tableCsv"]

  connect() {
    this.doUpload()
    // this.getCurrentUserPermissions()
    // this.application.uploads = []
  }

  doUpload() {
    var html = `<div class="row justify-content-center">
                  <div class="col-3">
                    <div class="card m-2 border-top-primary">
                      <div class="card-header p-1 text-center s-title-0p7rem">
                        <span>Card 1</span>
                      </div>
                      <div class="card-body text-center s-title-0p7rem">
                        <h7>-</h7>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card m-2 border-top-primary">
                      <div class="card-header p-1 text-center s-title-0p7rem">
                        <span>Card 2</span>
                      </div>
                      <div class="card-body text-center s-title-0p7rem">
                        <h7>-</h7>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card m-2 border-top-primary">
                      <div class="card-header p-1 text-center s-title-0p7rem">
                        <span>Card 3</span>
                      </div>
                      <div class="card-body text-center s-title-0p7rem">
                        <h7>-</h7>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card m-2 border-top-primary">
                      <div class="card-header p-1 text-center s-title-0p7rem">
                        <span>Card 4</span>
                      </div>
                      <div class="card-body text-center s-title-0p7rem">
                        <h7>-</h7>
                      </div>
                    </div>
                  </div>
                </div>  
                <div class="card m-2" style="width:100%;display:relative;" data-target="uploads--entities--index.cardBody">
                  <div class="card-header">
                    <div class="row justify-content-md-center">
                      <div class="col-md-auto">
                        <input type="file" id="fileinput" accept=".csv" data-target="uploads--entities--index.upload" data-action="change->uploads--entities--index#readSingleFile"/>
                      </div>
                      <div class="col-md-auto">
                        <button data-action="click->uploads--entities--index#sendCsv">Submit</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col p-0">
                          <div class="table-responsive">
                          <table data-target="uploads--entities--index.tableCsv" id="table0" class="table table-sm table-hover table-search" style="font-size:80%;">
                            <h7>*Marque as colunas que não deseja valore vazios</h7><br>
                            <h7>*As linhas em vermelho possuem células com o valor |PREENCHER| que corresponde a vazio</h7><br>
                            <thead data-target="uploads--entities--index.headTable" class="align-middle">
                            </thead>
                            <tbody data-target="uploads--entities--index.bodyTable">
                            </tbody>
                          </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer py-0" data-target="uploads--entities--index.footerTable"></div>
                </div>`
    
    this.uploadColTarget.innerHTML = html
  }

  // le o arquivo selecionado no choose file
  // salva ele no this.csv
  // chama csv to table
  readSingleFile(ev) {
    //Retrieve the first (and only!) File from the FileList object
    if(this.has_csv) {
      this.headTableTarget.innerHTML = ``
      this.bodyTableTarget.innerHTML = ``
    } 
    var f = ev.target.files[0];
    if (f) {
      var r = new FileReader();
      const this_controller = this
      r.onload = function (e) {
        var contents = e.target.result;
        this_controller.csv = contents
        this_controller.has_csv = true
        this_controller.csvToTable(this_controller.csv)
      }
      r.readAsText(f)
    } else {
      alert("Failed to load file");
    }
  }

  // transforma o csv na table html
  // chama do header e do body table
  csvToTable(csv) {

    this.tableLines = csv.split("\n")
    this.tableLinesLength = this.tableLines.length
    this.tableHeaders = this.tableLines[0].split(",")
    this.tableHeadLength = this.tableHeaders.length

    this.headTableTarget.insertAdjacentHTML("beforeend", this.doHeadTable())
    this.bodyTableTarget.insertAdjacentHTML("beforeend", this.doBodyTable())

  }

  // constroi o header com a primeira linha do csv
  doHeadTable() {
    var html = `<th>
                <div class="col">
                  <label class="row">Posição</label> 
                </div>
              </th>`
    this.tableHeaders.forEach(element => {
      html += `<th>
                <div class="col">
                  <label class="row">${element}</label>
                  <input class="row align-bottom" type="checkbox" value="${element}" data-action="click->uploads--entities--index#emptyLineValidate" data-target="uploads--entities--index.columnCell-${element}"> 
                </div>
              </th>`
    })
    return html;
  }

  // verifica se o checkbox marcado no header esta vazio nas linhas da tabela
  emptyLineValidate(ev) {
    var controller = this
    for (var r = 1; r < this.tableLinesLength; r++) {

      for (var c = 0; c < this.tableHeadLength; c++) {

        this.tableHeaders.forEach(function (element, i) {
          if (element == ev.target.value && ev.target.checked) {
            // danger if empty
            if (controller.nameTarget(`columnCell-${r}-${i}`).innerText == "|PREENCHER|") {
              controller.nameTarget(`lineCell-${r}`).classList.remove("table-success")
              controller.nameTarget(`lineCell-${r}`).classList.add("table-danger")
            }
          } else if (element == ev.target.value && !ev.target.checked) {
            // success if empty
            if (controller.nameTarget(`columnCell-${r}-${i}`).innerText == "|PREENCHER|") {
              controller.nameTarget(`lineCell-${r}`).classList.remove("table-danger")
              controller.nameTarget(`lineCell-${r}`).classList.add("table-success")
            }
          }
        })
      }
    }
  }

  // constroi a tabela com os dados do csv
  doBodyTable() {
    var htmlColumn = ``
    var htmlRow = ``
    
    for (var i = "1"; i < this.tableLinesLength; i++) {

      var currentline = this.tableLines[i].split(",");
      htmlColumn = ``

      for (var j = 0; j < this.tableHeadLength; j++) {
        if (currentline[j] == '') {
          htmlColumn += `<td id="${i}" style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="uploads--entities--index.columnCell-${i}-${j}">
                          <span class="text-bold justify" data-action="click->uploads--entities--index#editUnit">|PREENCHER|</span>
                          <input autofocus data-field="order" data-action="keyup->uploads--entities--index#saveUnit change->uploads--entities--index#saveUnit blur->uploads--entities--index#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required>
                        </td>`
        } else {
          htmlColumn += `<td id="${i}" style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="uploads--entities--index.columnCell-${i}-${j}">
                          <span class="text-bold justify" data-action="click->uploads--entities--index#editUnit">${currentline[j]}</span>
                          <input autofocus data-field="order" data-action="keyup->uploads--entities--index#saveUnit change->uploads--entities--index#saveUnit blur->uploads--entities--index#saveUnit" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required>
                        </td>`
        }
      }
      htmlRow += `<tr data-target="uploads--entities--index.lineCell-${i}">
                    <td style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="uploads--entities--index.columnCell-${i}">
                      <span class="text-bold">${i}</span>
                      <input autofocus data-field="order" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required>
                    </td>
                    ${htmlColumn}
                    <td style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="uploads--entities--index.columnCell-${i}">
                      <span class="text-bold"></span>
                      <input autofocus data-field="order" class="form-control textarea p-1 s-title-0p85rem d-none" type="string" required>
                    </td>
                    <td style="font-size:80%;" scope="col" class="table-10 p-1 align-middle table-success" data-target="uploads--entities--index.columnCell-${i}">
                      <span class="text-bold"></span>
                      <button id=${i} data-action="click->uploads--entities--index#deleteLine" type="button" class="btn btn-sm btn-table editAuthor p-0" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remover linha"><span class="material-icons md-sm md-dark">delete</span></button>
                    </td>
                  </tr>`
    }

    return htmlRow;
  }

  // remove a linha marcada pelo id
  deleteLine(ev){
    this.nameTarget(`lineCell-${ev.target.parentElement.id}`).remove()
  }

  // edita o valor da celula
  editUnit(ev) {
    var span = ev.target
    var input = ev.target.nextElementSibling
    span.classList.add("d-none")
    input.classList.remove("d-none")
    input.value = span.innerText
    input.focus()
  }

  // salva o valor editado
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
        // const data = { session: { id: this.element.dataset.id, value: value, field: field }, current_user: { current_user_id: currentUser.id } }
      }
    }
  }

  // verifica se a celula ainda esta no estado de danger (quando o checkbox esta marcado na coluna com vazios)
  // ela é chamada quando alguem edita uma celula
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

  // chama func que vai criar um json para enviar para api
  sendCsv() {
    if (this.csv) {
      this.getCellValues()
    }
  }
  
  // func que gera json para enviar para api
  getCellValues() {
    var table = this.tableCsvTarget
    var lines = [];
    for (var r = 1, n = table.rows.length; r < n; r++) {
      // console.log("line")
      var line = [];
      for (var c = 0, m = table.rows[r].cells.length - 3; c < m; c++) {
        line.push(this.tableHeaders[c].replace(/(\r\n|\n|\r)/gm, "") + ": " + table.rows[r].cells[c+1].innerText);
        // line.push(table.rows[r].cells[c].innerText);
      }
      lines.push(line);
    }
    this.saveCsv({ upload: lines })
  }

  // contato com api
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