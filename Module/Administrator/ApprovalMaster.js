
function openApprovaladdnew()
{
	$('#wms-srv-Approval-New-popup').show();
	$('#wms-srv-Approval-New-popup-close').off();
	$('#wms-srv-Approval-New-popup-close').click(function(){
	   $('#wms-srv-Approval-New-popup').hide();
	});
}

function openApprovaledit()
{
	$('#wms-srv-Approval-edit-popup').show();
	$('#wms-srv-Approval-edit-popup-close').off();
	$('#wms-srv-Approval-edit-popup-close').click(function(){
	   $('#wms-srv-Approval-edit-popup').hide();
	});
}