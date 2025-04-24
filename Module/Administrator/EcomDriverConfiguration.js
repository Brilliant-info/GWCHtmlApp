
$('#btnAddNewDriverhg').click(function(){
   $('#pnlshowaddnew').show();
});

$('#hidecirclenew').click(function(){
    $('#pnlshowaddnew').hide();
 });

 $('#hidecirclenew429').click(function(){
    $('#pnlshowaddedit').show();
 });

 $('#hidecirclenew4').click(function(){
    $('#pnlshowaddedit').hide();
 });

 function opendriveropoup()
 {
    $('#wms-srv-Driver-details-popup').show();
    $('#wms-srv-Driver-details-popup-close').off();
    $('#wms-srv-Driver-details-popup-close').click(function(){
        $('#wms-srv-Driver-details-popup').hide();
    });
 }