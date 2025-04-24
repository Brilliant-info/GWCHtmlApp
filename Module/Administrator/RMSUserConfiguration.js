
function openpopupUser()
{
   $('#wms-srv-UserList-popup').show();
   $('#wms-srv-UserList-popup-close').off();
   $('#wms-srv-UserList-popup-close').click(function()
   {
    $('#wms-srv-UserList-popup').hide();
   });
}