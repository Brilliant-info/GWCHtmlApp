// function initProduction()
// {
// 	$('#Production').show();
// }

// wmsLoadLayout(function(){
// 	hideAdminPages();
//     $('#Production').show();
//     loadproductionMenu();
// });



wmsLoadLayout(function () {
    activateTransferTabs();
});

function showActiveTab(getActiveTab){
  debugger;
    $('.pnlProduction').hide();
    $('.pnlProductionRequest').hide();
    $('.pnlProductionIssue').hide();

   // $('#tabTransfer').removeClass('listActiveTab');
   // $('#tabSkuConversion').removeClass('listActiveTab');

    
    if(getActiveTab == 'ProductionRequest'){
       // $('#tabTransfer').addClass('listActiveTab');
        $('.ProductionRequest').show();
     // initProductionRequest();
      getProductionList(filtercol, filterval);
    }else if(getActiveTab == 'ProductionIssue'){
      
       // $('#tabSkuConversion').addClass('listActiveTab');
        $('.ProductionIssue').show();
       // initProductionIssue();
      //   getConversionList(strCurrentPage, searchfilter, searchvalue);
    }
}

function activateTransferTabs(){
  debugger;
    $('.listTab').off();
    $('.listTab').click(function(){
        var getActiveTab = $(this).attr('data-tab');
        showActiveTab(getActiveTab);
    });
}
