function eventListener(userId, element) {
  
  dataReloadPhone = false;
  setInterval(function () {
    dataReloadPhone = element.attr("data-reload");
    if (dataReloadPhone === "true") {
      whichElementReload(userId, element);
      element.attr("data-reload", false);
    }
  }, 500);


  function whichElementReload(userId, element) {

    if (element === $('#bodyContactPhonesTable')) {
      listContactPhones(userId, bodyContactPhonesTable);
    }
    
  }

}