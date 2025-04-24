
function openpopupNote()
{
   $('#wms-srv-Note-New-popup').show();
   $('#wms-srv-Note-New-popup-close').off();
   $('#wms-srv-Note-New-popup-close').click(function()
   {
    $('#wms-srv-Note-New-popup').hide();
   });
}