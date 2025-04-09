var currentStep = '';
wmsLoadLayout(function () {
	init();
});

function openwarehouselcation(oid) {
	$('#wms-srv-whlocation-popup').show();
	$('#wms-srv-whlocation-popup-close').off();
	$('#wms-srv-whlocation-popup-close').click(function () {
		$('#wms-srv-whlocation-popup').hide();
	});
}
function openwarehouse(oid) {
	$('#wms-srv-warehouse-popup').show();
	$('#wms-srv-warehouse-popup-close').off();
	$('#wms-srv-warehouse-popup-close').click(function () {
		$('#wms-srv-warehouse-popup').hide();
	});
}
function openuserwarehouse(oid) {
	$('#wms-srv-userwarehouse-popup').show();
	$('#wms-srv-userwarehouse-popup-close').off();
	$('#wms-srv-userwarehouse-popup-close').click(function () {
		$('#wms-srv-userwarehouse-popup').hide();
	});
}
function opencustomer(oid) {
	$('#wms-srv-customer-popup').show();
	$('#wms-srv-customer-popup-close').off();
	$('#wms-srv-customer-popup-close').click(function () {
		$('#wms-srv-customer-popup').hide();
	});
}
function openvendorcontactinfo(oid) {
	$('#wms-srv-vendorcontactinfo-popup').show();
	$('#wms-srv-vendorcontactinfo-popup-close').off();
	$('#wms-srv-vendorcontactinfo-popup-close').click(function () {
		$('#wms-srv-vendorcontactinfo-popup').hide();
	});
}
function openclientcontactinfo(oid) {
	$('#wms-srv-clientcontactinfo-popup').show();
	$('#wms-srv-clientcontactinfo-popup-close').off();
	$('#wms-srv-clientcontactinfo-popup-close').click(function () {
		$('#wms-srv-clientcontactinfo-popup').hide();
	});
}
function openUOM(oid) {
	$('#wms-srv-UOM-popup').show();
	$('#wms-srv-UOM-popup-close').off();
	$('#wms-srv-UOM-popup-close').click(function () {
		$('#wms-srv-UOM-popup').hide();
	});
}
function openParameter(oid) {
	$('#wms-srv-parameter-popup').show();
	$('#wms-srv-parameter-popup-close').off();
	$('#wms-srv-parameter-popup-close').click(function () {
		$('#wms-srv-parameter-popup').hide();
	});
}

function hideAllWizardPanel() {
	$("#warehouse-grid").hide();
	$('#customerlist-grid').hide();
	$("#userlist-grid").hide();
	$("#Vendorlist-grid").hide();
	$("#Clientlist-grid").hide();
	$("#Productlist-grid").hide();
	$('.stepsNumberHolder').removeClass('activestep');
}

function jumpToStep() {

}

function jumpToNextStep() {
	hideAllWizardPanel();
	switch (currentStep) {
		case "warehouse":
			currentStep = 'customer';
			$("#customerlist-grid").show();
			$('.btnHeadcustomergrid .stepsNumberHolder').addClass('activestep');
			$('.btnHeadcustomergrid').removeClass('disabledStep');
			break;
		case "customer":
			currentStep = 'user';
			$("#userlist-grid").show();
			$('.btnHeadusergrid .stepsNumberHolder').addClass('activestep');
			$('.btnHeadusergrid').removeClass('disabledStep');			
			break;
		case "user":
			sessionStorage["isSetupDone"] = 'yes';
			currentStep = 'vendor';
			$("#Vendorlist-grid").show();
			$('.btnHeadvendorlistgrid .stepsNumberHolder').addClass('activestep');
			$('.btnHeadvendorlistgrid').removeClass('disabledStep');
			getWMSMenu(true);
			//wmsNavigatePage('Dashboard');
			location.href = 'WMSApp.html';
			break;
		case "vendor":
			currentStep = 'client';
			$("#Clientlist-grid").show();
			$('.btnHeadclientlistgrid .stepsNumberHolder').addClass('activestep');
			$('.btnHeadclientlistgrid').removeClass('disabledStep');
			break;
		case "client":
			currentStep = 'product';
			$("#Productlist-grid").show();
			$('.btnHeadproductlistgrid .stepsNumberHolder').addClass('activestep');
			$('.btnHeadproductlistgrid').removeClass('disabledStep');
			break;
		case "product":
			sessionStorage["isSetupDone"] = 'yes';
			//alert(sessionStorage["isSetupDone"]);
			alert('Setup Completed!! Wait while we redirect you to dashboard.');
			$('.btnHeadcustomergrid').removeClass('disabledStep');
			// getWMSMenu(true);
			// wmsNavigatePage('Dashboard');
			break;
		default:
		// code block
	}
}

function init() {
	currentStep = 'warehouse';

	$('.wmsWizardButtonGroup button').click(function(){
		jumpToNextStep();
	});
	$(".btnHeadwarehousegrid").click(function () {
		hideAllWizardPanel();
		$("#warehouse-grid").show();
		$(this).find('.stepsNumberHolder').addClass('activestep');
	});
	$(".btnHeadcustomergrid").click(function () {
		hideAllWizardPanel();
		$("#customerlist-grid").show();
		$(this).find('.stepsNumberHolder').addClass('activestep');
	});
	$(".btnHeadusergrid").click(function () {
		hideAllWizardPanel();
		$("#userlist-grid").show();
		$(this).find('.stepsNumberHolder').addClass('activestep');
	});
	$(".btnHeadvendorlistgrid").click(function () {
		hideAllWizardPanel();
		$("#Vendorlist-grid").show();
		$(this).find('.stepsNumberHolder').addClass('activestep');
	});
	$(".btnHeadclientlistgrid").click(function () {
		hideAllWizardPanel();
		$("#Clientlist-grid").show();
		$(this).find('.stepsNumberHolder').addClass('activestep');
	});
	$(".btnHeadproductlistgrid").click(function () {
		hideAllWizardPanel();
		$("#Productlist-grid").show();
		$(this).find('.stepsNumberHolder').addClass('activestep');
	});

	// $('.wmssetup-steps-holder').click(function ()
	// {
	//     $('.wmssetup-steps-holder').removeClass('activestepb');
	//     $(this).addClass('activestep');
	//     globalActiveTab = $('.activestep').attr('data-id');
	//     loadInboundList(strCurrentPage, globalActiveTab, searchfilter, searchvalue);
	// });
}


