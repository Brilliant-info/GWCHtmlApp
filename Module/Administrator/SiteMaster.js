
function AddNewpopup()
{
    $('#wms-srv-Site-New-popup').show();
    $('#wms-srv-Site-New-popup-close').off();
	$('#wms-srv-Site-New-popup-close').click(function () {
		$('#wms-srv-Site-New-popup').hide();
	});
}

function Editpopup()
{
    $('#wms-srv-Site-edit-popup').show();
    $('#wms-srv-Site-edit-popup-close').off();
	$('#wms-srv-Site-edit-popup-close').click(function () {
		$('#wms-srv-Site-edit-popup').hide();
	});
}

$('#wms-srv-New-popup').click(function () {
	$('#showtext').show();
});

$('#hidecirclenew').click(function () {
	$('#showtext').hide();
});

$('#showele').click(function () {
	$('#showtexter').show();
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