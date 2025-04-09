wmsLoadLayout(function () {
    activateTransferTabs();
});

function showActiveTab(getActiveTab){
    $('.pnlTransfer').hide();
    $('.pnlInternalTransfer').hide();
    $('.pnlSkuConversion').hide();

   // $('#tabTransfer').removeClass('listActiveTab');
   // $('#tabSkuConversion').removeClass('listActiveTab');

    
    if(getActiveTab == 'Transfer'){
       // $('#tabTransfer').addClass('listActiveTab');
        $('.pnlInternalTransfer').show();
        initInternalTransfer();
        getTransferList(filtercol, filterval);
    }else if(getActiveTab == 'SkuConversion'){
       // $('#tabSkuConversion').addClass('listActiveTab');
        $('.pnlSkuConversion').show();
        getConversionList(strCurrentPage, searchfilter, searchvalue);
    }
}

function activateTransferTabs(){
    $('.listTab').off();
    $('.listTab').click(function(){
        var getActiveTab = $(this).attr('data-tab');
        showActiveTab(getActiveTab);
    });
}