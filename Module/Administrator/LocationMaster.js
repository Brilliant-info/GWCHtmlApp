
function openAddNewpopup()
{
    $('#wms-srv-Location-New-popup').show();
    $('#wms-srv-Location-New-popup-close').off();
    $('#wms-srv-Location-New-popup-close').click(function(){
        $('#wms-srv-Location-New-popup').hide();
    });
}

function openeditpopup()
{
    $('#wms-srv-Location-edit-popup').show();
    $('#wms-srv-Location-edit-popup-close').off();
    $('#wms-srv-Location-edit-popup-close').click(function(){
        $('#wms-srv-Location-edit-popup').hide();
    });
}

function openpopupContact()
{
    $('#wms-srv-Contact-details-popup').show();
    $('#wms-srv-Contact-details-popup-close').off();
    $('#wms-srv-Contact-details-popup-close').click(function(){
        $('#wms-srv-Contact-details-popup').hide();
    });
}