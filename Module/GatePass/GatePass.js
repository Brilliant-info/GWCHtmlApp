wmsLoadLayout(function(){
	init();
	
});

function openTransportpopup(oid) {
    $('#wms-srv-transport-popup').show();
    $('#wms-srv-transport-popup-close').off();
    $('#wms-srv-transport-popup-close').click(function () {
        $('#wms-srv-transport-popup').hide();
    });
}