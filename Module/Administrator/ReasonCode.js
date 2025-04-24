
function openAddNewpopup()
{
    $('#wms-srv-Reason-New-popup').show();
    $('#wms-srv-Reason-New-popup-close').off();
	$('#wms-srv-Reason-New-popup-close').click(function () {
		$('#wms-srv-Reason-New-popup').hide();
	});
}

function editpopup()
{
    $('#wms-srv-Reason-edit-popup').show();
    $('#wms-srv-Reason-edit-popup-close').off();
	$('#wms-srv-Reason-edit-popup-close').click(function () {
		$('#wms-srv-Reason-edit-popup').hide();
	});
}