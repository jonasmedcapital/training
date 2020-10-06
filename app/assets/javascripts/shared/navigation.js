function navigation(currentUserId, currentUserSlug, currentUserName, permission, permissions) {

  token = $('meta[name=csrf-token]').attr('content');

  if (permissions.account.doctor) {
    userAccount = "Médico"
  } else if (permissions.account.admin) {
    userAccount = "Admin"
  } else if (permissions.account.team) {
    userAccount = "Time"
  }

  // doNavibar();
  // doSidebar();

  // $('#signOutBtn').on('click', function () {
  //   $.ajax({
  //     url: '/sair',
  //     method: 'DELETE',
  //     dataType: 'json',
  //     data: { authenticity_token: token, user: { id: currentUserId } },
  //     success: function (response) {
  //     },
  //     error: function (response) {
  //     }
  //   });
  // });

  function doNavibar() {

    // <span class="material-icons">notification_important</span>
    // <i class="material-icons">notification_important</i>

    html = `<ul class="nav navbar-nav navbar-right">
              <li>
                <a class="d-flex align-items-center nav-link nav-link-text a-dark pointer" id="appConnection"></span></a>
              </li>
              <li>
                <a class="d-flex align-items-center nav-link nav-link-text a-dark pointer" data-toggle="tooltip" data-placement="top" title="Meu Perfil" href="/a/meu-perfil/${currentUser.token}">${currentUser.name.split(" ")[0]}</span></a>
              </li>`
              // <li>
              //   <a class="notice nav-link nav-link-text a-dark pointer" style="padding:5px;" data-toggle="tooltip" data-placement="bottom" title="Notificações"><span class="material-icons">notification_important</span><span class="badge badge-danger notice-badge">6</span></a>
              // </li>
    html +=  `<li>
                <a class="d-flex align-items-center nav-link nav-link-text nav-link-danger a-dark" data-method="delete" href="/sair" data-toggle="tooltip" data-placement="bottom" title="Sair"><i class="material-icons">exit_to_app</i></a>
              </li>
            </ul>`
    
    // html = '<ul class="nav navbar-nav navbar-right">';
    // html += '<li>';
    // html += '<a class="d-flex align-items-center nav-link nav-link-text a-dark" href="#">' + currentUserName + '</span></a>';
    // html += '</li>';
    // html += '<li>';
    // html += '<a class="d-flex align-items-center nav-link nav-link-text a-dark" href="#">' + userAccount + '</span></a>';
    // html += '</li>';
    // html += '<li>';
    // html += '<a class="d-flex align-items-center nav-link nav-link-text a-dark" href="#" id="appConnection"></span></a>';
    // html += '</li>';
    // html += '<li>';
    // html += '<a class="d-flex align-items-center nav-link nav-link-text" href="#"><i class="material-icons">notification_important</i><span class="badge badge-danger">6</span></a>';
    // html += '</li>';
    // html += '<li>';
    // html += '<a class="d-flex align-items-center nav-link nav-link-text nav-link-danger a-dark" data-method="delete" href="/sair" data-toggle="tooltip" data-placement="bottom" title="Sair"><i class="material-icons">exit_to_app</i></span></a>';
    // html += '</li>';
    // html += '</ul>  ';
    
    $('.navbar').append(html);
  }

  function doSidebar() {

    html = '<div class="navdrawer-header" style="background-color:#fbfcff;height:57px;">';
    html += '<a class="navbar-brand px-0"></a>';
    html += '</div>';
    html += '<ul class="navdrawer-nav">';
    html += '<li class="nav-item">';
    html += '<a class="nav-link" href="/dashboard" disabled="true"><i class="material-icons" data-toggle="tooltip" data-placement="top" title data-original-title="Dashboard">dashboard</i></a>';
    html += '</li>';
    html += '<li class="nav-item">';
    html += '<a class="nav-link" href="/a/atividades/' + currentUserSlug + '" disabled="true"><i class="material-icons" data-toggle="tooltip" data-placement="top" title data-original-title="Atividades">format_list_numbered</i></a>';
    html += '</li>';
    if (permissions.page.marketing) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" href="/a/marketing" ><i class="material-icons" data-toggle="tooltip" data-placement="top" title data-original-title="Marketing">track_changes</i></a>';
      html += '</li>';
    }
    if (permissions.page.sales) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" href="/a/vendas" ><i class="material-icons" data-toggle="tooltip" data-placement="top" title data-original-title="Vendas">record_voice_over</i></a>';
      html += '</li>';
    }
    if (permissions.page.operations) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" href="/a/operacoes" ><i class="material-icons" data-toggle="tooltip" data-placement="top" title data-original-title="Operações">category</i></a>';
      html += '</li>';
    }
    if (permissions.page.marketing && permissions.page.contents) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" href="/a/conteudo"><img data-toggle="tooltip" data-placement="top" title data-original-title="Conteúdo" src="https://medcapital-site-main.s3-sa-east-1.amazonaws.com/images/icon-descanso-invert.png" alt="descancomedico" style="width:0.8rem;cursor:pointer;"></a>';
      html += '</li>';
    } else {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" href="/descanso-medico"><img data-toggle="tooltip" data-placement="top" title data-original-title="Descanso Médico" src="https://medcapital-site-main.s3-sa-east-1.amazonaws.com/images/icon-descanso-invert.png" alt="descancomedico" style="width:0.8rem;cursor:pointer;"></a>';
      html += '</li>';
    }
    html += '</ul>';
    html += '<div class="navdrawer-divider"></div>';
    html += '<ul class="navdrawer-nav">';
    if (permissions.page.profile) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" href="/a/meu-perfil/' + currentUserSlug + '" disabled="true" id="navbarProfile"><i class="material-icons" data-toggle="tooltip" data-placement="top" title="Meu Perfil">account_box</i></a>';
      html += '</li>';
    }
    html += '</ul>';
    html += '<div class="navdrawer-divider"></div>';
    html += '<ul class="navdrawer-nav">';
    // if (permissions.account.admin && permissions.page.settings) {
    if (permissions.page.settings) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" href="/a/configuracoes" disabled="true" id="navbarProfile"><i class="material-icons" data-toggle="tooltip" data-placement="top" title="Configurações">settings</i></a>';
      html += '</li>';
    }
    if (permissions.account.admin && permissions.page.generators) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" style="text-align:left;" href="/a/geradores" id="navbarGenerators" target="_blank"><i class="material-icons" data-toggle="tooltip" data-placement="top" title="Geradores">file_copy</i></i></a>';
      html += '</li>';
    }
    if (permissions.account.admin && permissions.page.develop) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" style="text-align:left;" href="/dev-page" id="navbarDevelop" target="_blank"><i class="material-icons" data-toggle="tooltip" data-placement="top" title="Página Teste">code</i></a>';
      html += '</li>';
    }
    if (permissions.account.admin && permissions.page.reports) {
      html += '<li class="nav-item">';
      html += '<a class="nav-link" style="text-align:left;" href="/a/relatorios"><i class="material-icons" data-toggle="tooltip" data-placement="top" title="Relatórios">table_chart</i></a>';
      html += '</li>';
    }
      html += '</ul>';  

    $('.navdrawer-content').html(html);
    tooltip();
  }

}








