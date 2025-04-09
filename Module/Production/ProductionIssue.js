function initProductionIssue()
{
	$('.ProductionIssue').show();
}

// wmsLoadLayout(function(){
// 	initProductionIssue();
//     hideAdminPages();
// });

function hideAdminPages() {
    $('.wmsMasterTypePage').hide();
}


wmsLoadLayout(function () {
    hideAdminPages();
   // loadAdminPages('pnlAdministrator');
   $('#ProductionIssue').show();
   // loadAdministratorMenu();
});


