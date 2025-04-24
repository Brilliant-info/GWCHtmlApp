
$('#btnAddNewTemplateData').click(function () {
	$('#showtextgh').show();
});

$('#hidecirclenewbn').click(function () {
	$('#showtextgh').hide();
});

$('#showelenn').click(function () {
	$('#showseg43').show();
});

$('#hidecirclee').click(function () {
	$('#showtexter').hide();
});

$('#txtedit2').click(function () {
	$('#showtextergh').show();
});

$('#hidecircleeb').click(function () {
	$('#showtextergh').hide();
});

function openpopupAddNew()
{
    $('#wms-srv-Request-New-popup').show();
    $('#wms-srv-Request-New-popup-close').off();
    $('#wms-srv-Request-New-popup-close').click(function(){
        $('#wms-srv-Request-New-popup').hide();
    });
}

function openpopupEdit()
{
    $('#wms-srv-Edit-Request-New-popup').show();
    $('#wms-srv-Request-New-popup-closeo').off();
    $('#wms-srv-Request-New-popup-closeo').click(function(){
        $('#wms-srv-Edit-Request-New-popup').hide();
    });
}
