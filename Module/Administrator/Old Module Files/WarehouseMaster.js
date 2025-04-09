// wmsLoadLayout(function(){
// 	init();
// });
//var wmsApiPath = 'http://173.212.244.46/WebAPITest/api/staging/v1/';
//var wmsApiPath = 'http://localhost:50068/api/staging/v1/';

var searchfilter = '0';
var searchfilterLocation = '0';
var searchvalue = '0';
var searchlocationfilter = '0';
var searchlocationvalue = '0';
var strCurrentPage = '1';
var CurrentPage = '1';
var RecordLimit = '100';
var companyID = mBrillWmsSession.getCompanyId();
var userid = mBrillWmsSession.getUserId();
//var CustomerId = $("#ddlcustomer").val();// mBrillWmsSession.getCustomerId();
var CustomerId = mBrillWmsSession.getCustomerId();
//var warehouseid='1';
var globalEditWarehouseID = '0';
var getListWarehouseID = '0';
var globalwarehouseid = '0';
//var ddlCustomerID = 1; //$("#ddlcustomer").val();
var ddlGlobalWarehouseID = $("#ddlwarehouse").val();
//var getWarehouseEditId = '';
var getEditLocationID = '0';
var LocationListId = '';
var getCapacityValue = '';
var getCapacityText = '';
var LocgrdCurrentpage = 1;

function initWarehouseMaster() {
	getWarhouseList(strCurrentPage, searchfilter, searchvalue);
	// WarehouseLocationList(WarehouseLocationList);
	$("#wms-srv-Location-popup-close").click(function () {
		ClearLocationfill();
	});
}

function openwarehouselistPopup(chkobj) {
	var isClicked = $('openwarehouselistPopup').prop('clicked');
	if ($(chkobj).prop('clicked')) {
		$('#wms-srv').show();
	} else {
		$('#wms-srv').hide();
	}

}
function clearSearchFilterLocation()
{
	debugger;
    $('#ddlsearchlocation').val('');
    $('#txtfilterLocation').val('');
	WarehouseLocationList(CurrentPage, searchlocationfilter, searchlocationvalue);
}
function showAddWarehouseRow() {
	globalEditWarehouseID = 0;
	$('#wms-srv-add-new').show();
	$('#checkAddWarehouse').prop('checked', true);	
}
function hideAddWarehouseRow() {
	$('#wms-srv-add-new').hide();

}
function saveWarehouseRecord() {
	alert("record save successfully!!");
	$('#wms-srv-add-new').hide();
}

function opencontactpopup() {
	$('#wms-srv-contact-popup').show();
	$('#wms-srv-contact-popup-close').off();
	$('#wms-srv-contact-popup-close').click(function () {
		$('#wms-srv-contact-popup').hide();
	});
}

function openLocationPopup(selectWarehouseID) {
	$('#wms-srv-Location-popup').show();
	$('#wms-srv-Location-popup-close').off();
	$('#wms-srv-Location-popup-close').click(function () {
		$('#wms-srv-Location-popup').hide();
	});
	$('#ddlsearchlocation').val("");
	$('#txtfilterLocation').val("");
	globalwarehouseid = selectWarehouseID;
	WarehouseLocationList(strCurrentPage, searchlocationfilter, searchlocationvalue);
}
function getCapacity(objId) {
	debugger;
	//var getValue = $("#ddlCapacity_0").val();
	//var getValue = $("#ddlCapacity_" + objid).val();
	var getCapacitytext = $("#ddlCapacitywarehouse_" + objId + " option:selected").text();
	var getValue = $("#ddlCapacitywarehouse_" + objId).val();
	getCapacityValue = getValue;
	getCapacityText = getCapacitytext;

	if (getCapacitytext == "Area(L x W)") {

		$("#rowLocationParam_" + objId + " .input2").hide();
		$("#rowLocationParam_" + objId + " .input3").hide();
		$("#rowLocationParam_" + objId + " .input4").hide();
		$("#rowLocationParam_" + objId + " .input1").show();
	}

	if (getCapacitytext == "Number") {

		$("#rowLocationParam_" + objId + " .input3").hide();
		$("#rowLocationParam_" + objId + " .input4").hide();
		$("#rowLocationParam_" + objId + " .input1").hide();
		$("#rowLocationParam_" + objId + " .input2").show();
	}

	if (getCapacitytext == "Cubic Capacity(L x W x H)") {

		$("#rowLocationParam_" + objId + " .input4").hide();
		$("#rowLocationParam_" + objId + " .input1").hide();
		$("#rowLocationParam_" + objId + " .input2").hide();
		$("#rowLocationParam_" + objId + " .input3").show();

	}
	if (getCapacitytext == "Liter") {
		$("#rowLocationParam_" + objId + " .input1").hide();
		$("#rowLocationParam_" + objId + " .input2").hide();
		$("#rowLocationParam_" + objId + " .input3").hide();
		$("#rowLocationParam_" + objId + " .input4").show();

	}

}
function openeditpopup() {
	$('.wms-showtext').show();

}
function shownewWarehouseRow() {
	$('#wms-srv-add-newcell').show();
}
function hidenewWarehouseRow() {
	$('#wms-srv-cancel-newcell').hide();
}

function showEditWarehouseRow() {
	$('#wms-srv-beforeedit-warehouse').hide();
	$('#wms-srv-edit-warehouse').show();
}

function hideEditWarehouseRow() {
	$('#wms-srv-beforeedit-warehouse').show();
	$('#wms-srv-edit-warehouse').hide();
}

function saveEditWarehouseRecord() {
	hideEditWarehouseRow();
	alert('Warehouse record saved!!');
}
function showEditWarehouseRow1() {
	$('#wms-srv-beforeedit-warehouse1').hide();
	$('#wms-srv-edit-warehouse1').show();
}
function hideEditWarehouseRow1() {
	$('#wms-srv-beforeedit-warehouse1').show();
	$('#wms-srv-edit-warehouse1').hide();
}






function getWarhouseList(strCurrentPage, searchfilter, searchvalue) {
	debugger;
	//var wmsApiPath = 'http://localhost:50068/api/staging/v1/'
	var apiPath = wmsApiPath + 'Warehouse/GetWarehouseList';
	//var apiPath='http://173.212.244.46/WebAPITest/api/staging/v1/Warehouse/GetWarehouseList';
	searchfilter = $('#ddlsearch').val();
	searchvalue = $('#txtvalue').val();
	var searchFilter = '';

	if (searchfilter == '') {
		searchfilter = '0';
		searchvalue = '0';
	}
	var postData =
	{
		CurrentPage: strCurrentPage,
		RecordLimit: RecordLimit,
		CompanyId: companyID,
		UserId: userid,
		CustomerId: CustomerId,
		Search: searchfilter,
		Filter: searchvalue
	};
	callHttpUrl(apiPath, postData, function (data) {

		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;

		if (getStatus == '200') {

			var myGridList = data.Result.WarehouseListResult[0];

			var RecordLimit = myGridList.TotalRecord;
			var currentPage = myGridList.CurrentPage;


			$("#gridWarehouseList").html('');
			var gridHead = ''

			gridHead = gridHead + '<div class="wms-srv-grid-header">';
			gridHead = gridHead + '<div class="wms-srv-grid-cell wms-align">Warehouse Code</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell wms-align">Warehouse Name</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell wms-align">Type</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell wms-align" style="width: 215px;">Remark</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell wms-align" style="width: 215px;">Local Rate</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell wms-align" style="width: 215px;">Outstation Rate</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell wms-align">Active</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell wms-align">Action</div>';
			gridHead = gridHead + '</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-row wms-srv-edit" id="wms-srv-add-new" style="display:none;">';
			gridHead = gridHead + '<div class="wms-srv-grid-cell"><input type="text" id="txtWarehouseCode" data-prefix="SESKU" data-id="" value=""';
			gridHead = gridHead + 'class="wms-srv-grid-cell-input"></div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell"><input type="text" id="txtWarehouseName" data-prefix="SESKU" data-id="" value=""';
			gridHead = gridHead + 'class="wms-srv-grid-cell-input"></div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell">';
			gridHead = gridHead + '<select class="wms-srv-grid-cell-input" id="txtWarehouseType"><option value="">Select</option><option value="Standard" > Standard</option><option value="Virtual" > Virtual</option></select>';
			gridHead = gridHead + '</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" id="txtWarehousRemark" value=""';
			gridHead = gridHead + 'class="wms-srv-grid-cell-input"></div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" onkeypress="return isNumber(event)" id="txtLocalRate" value=""';
			gridHead = gridHead + 'class="wms-srv-grid-cell-input"></div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" onkeypress="return isNumber(event)" id="txtOutstationRate" value=""';
			gridHead = gridHead + 'class="wms-srv-grid-cell-input"></div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell">';
			gridHead = gridHead + '<div class="wms-srv-suggestion-holder" style="display:inline-flexbox; width: 100px; margin-left: auto; margin-right: auto;">';
			gridHead = gridHead + '<input type="checkbox" name="checkgroup1" id="checkAddWarehouse" value="Yes" class="wms-srv-grid-cell-input notranslate" style:""><a href="#"></a>';
			gridHead = gridHead + '</div>';
			gridHead = gridHead + '</div>';
			gridHead = gridHead + '<div class="wms-srv-grid-cell">';
			gridHead = gridHead + '<div class="wms-srv-grid-action">';
			gridHead = gridHead + '<a href="#" title="Save" class="wms-srv-save" onclick="ValidateWarehouse();">'; //saveWarehouse(' + globalEditWarehouseID + ');
			gridHead = gridHead + '<i class="fas fa-check-circle" style="color:black !important"></i></a>';
			gridHead = gridHead + '<div class="wms-srv-action-sep">|</div>';
			gridHead = gridHead + '<a href="#" title="Cancel" class="wms-srv-cancel" onclick="hideAddWarehouse();">';
			gridHead = gridHead + '<i class="fas fa-times-circle" ></i></a>';
			gridHead = gridHead + '</div>';
			gridHead = gridHead + '</div>';
			gridHead = gridHead + '</div>';

			//Binding Grid list here		

			/*gridHead = gridHead + '<div class="wms-srv-grid-row wms-align" id="wms-srv-edit-warehouse" style="display:none;">';
			
			gridHead = gridHead + '</div>';*/

			for (var i = 0; i < myGridList.Table.length; i++) {

				var getListWarehouseID = myGridList.Table[i].Id;
				var getWarehouseCode = myGridList.Table[i].WarehouseCode;
				var getWarehouseName = myGridList.Table[i].WarehouseName;
				var getWarehouseType = myGridList.Table[i].Type;
				var getActive = myGridList.Table[i].Active;
				var getRemark = myGridList.Table[i].Remark;
				var getLocalRate = myGridList.Table[i].LocalRate;
				var getOutstationRate = myGridList.Table[i].OutstationRate;

				//Binding Grid List here
				gridHead = gridHead + '<div class="wms-srv-grid-row wms-align" id="rowParameter_' + getListWarehouseID + '">';
				gridHead = gridHead + '<div class="wms-srv-grid-cell">' + getWarehouseCode + '</div>';
				gridHead = gridHead + '<div class="wms-srv-grid-cell">' + getWarehouseName + '</div>';
				gridHead = gridHead + '<div class="wms-srv-grid-cell">' + getWarehouseType + '</div>';
				gridHead = gridHead + '<div class="wms-srv-grid-cell">' + getRemark + '</div>';
				gridHead = gridHead + '<div class="wms-srv-grid-cell">' + getLocalRate + '</div>';
				gridHead = gridHead + '<div class="wms-srv-grid-cell">' + getOutstationRate + '</div>';
				gridHead = gridHead + '<div class="wms-srv-grid-cell">' + getActive + '</div>';
				gridHead = gridHead + '<div class="wms-srv-grid-cell">';
				gridHead = gridHead + '<div class="wms-srv-grid-action">';
				//gridHead = gridHead + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV" onclick="editWarehouselist('+globalEditWarehouseID+');showEditWarehouseRow();"><i class="fas fa-edit"></i></a>';
				gridHead = gridHead + '<i class="fas fa-edit" title="Edit" onclick="WarehouseEditGrid(\'' + getListWarehouseID + '\',\'' + getWarehouseCode + '\',\'' + getWarehouseName + '\',\'' + getWarehouseType + '\',\'' + getRemark + '\',\'' + getLocalRate + '\',\'' + getOutstationRate + '\',\'' + getActive + '\')";></i></a>';
				gridHead = gridHead + '<div class="wms-srv-action-sep">|</div>';
				gridHead = gridHead + '<a href="#" title="Contact Info" class="wms-srv-cancel" data-prefix="CN" onclick="openWareContactPopUp(' + getListWarehouseID + ');return false"><i class="fas fa-user-plus"></i></a>';
				gridHead = gridHead + '<div class="wms-srv-action-sep">|</div>';
				gridHead = gridHead + '<a href="#" title="Location" class="wms-srv-cancel" data-prefix="CN" onclick="openLocationPopup(' + getListWarehouseID + ');"><i class="fas fa-map-marker-alt"></i></a>';
				gridHead = gridHead + '</div>';
				gridHead = gridHead + '</div>';
				gridHead = gridHead + '</div>';

			}
			$("#gridWarehouseList").html(gridHead);
			setupGridPagingList('checkWarehousePager', strCurrentPage, RecordLimit, getWarhouseList);
		}
		else {
			alert('Unable to connect Server!!');
		}
	});
}

function WarehouseEditGrid(WarehouseEditId, WarehouseCode, WarehouseName, WarehouseType, WarehouseRemark,LocalRate,OutstationRate, Active) {
	debugger;
	globalEditWarehouseID = WarehouseEditId;

	var gridHead = '';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" class="wms-srv-grid-cell-input" id="editWarehouseCode" value="' + WarehouseCode + '"/>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" class="wms-srv-grid-cell-input" id="editWarehouseName" value="' + WarehouseName + '"/>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<select class="wms-srv-grid-cell-input" id="editWarehouseType"><option value="Standard" >Standard</option><option value="Virtual" >Virtual</option></select>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" class="wms-srv-grid-cell-input" id="editWarehousRemark" value="' + WarehouseRemark + '"/>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" class="wms-srv-grid-cell-input" id="editLocalRate" onkeypress="return isNumber(event)" value="' + LocalRate + '"/>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" class="wms-srv-grid-cell-input" id="editOutstationRate" onkeypress="return isNumber(event)"  value="' + OutstationRate + '"/>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<div class="wms-srv-suggestion-holder" style="display:inline-flexbox; width: 100px; margin-left: auto; margin-right: auto;">';
	//gridHead = gridHead + '<input type="checkbox" name="checkgroup2" id="warehouseActiveY" value="'+Active+'" class="wms-srv-grid-cell-input " ><a href="#"></a>';

	if (Active == 'Yes') {
		gridHead = gridHead + '<input type="checkbox" id="warehouseActiveY" class="wms-srv-grid-cell-input" value="' + Active + '" checked="checked" />';
	} else {
		gridHead = gridHead + '<input type="checkbox" id="warehouseActiveY" class="wms-srv-grid-cell-input" value="' + Active + '" />';
	}
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<div class="wms-srv-grid-action">';
	gridHead = gridHead + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="saveWarehouse();">';
	gridHead = gridHead + '<i class="fas fa-check-circle" style="color:black !important"></i></a>';
	gridHead = gridHead + '<div class="wms-srv-action-sep">|</div>';
	gridHead = gridHead + '<a href="#" title="Cancel" class="wms-srv-cancel" data-prefix="CN" onclick="EditGridWarehouseHide(' + WarehouseEditId + ');">';
	gridHead = gridHead + '<i class="fas fa-times-circle"></i></a>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '</div>';
	$("#rowParameter_" + WarehouseEditId).html(gridHead);

}
//Edit Warehouse Grid
function EditGridWarehouseHide(parameterEditId) {

	$("#rowParameter_" + parameterEditId).html('');
	getWarhouseList(strCurrentPage, searchfilter, searchvalue);
}

function hideAddWarehouse() {
	$("#wms-srv-add-new").html('');
	getWarhouseList(strCurrentPage, searchfilter, searchvalue);
}

// function setupGridPagingwarehouse(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) {

//     var global_max_record_count = 10;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 10) + 1;
//     var recordTo = recordFrom + 9;
//     var totalRecord = Number(strTotalRecords);
//     var pagerLinks = '';     

//     $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//     var lnkCounter = 1;
//     var currentCounter = global_max_record_count;
//     //var currentCounter = 0;
//     var lastPage = 0;
//     while (currentCounter < totalRecord) {
//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         global_last_page_no = lnkCounter;
//         currentCounter = currentCounter + global_max_record_count;
//         lnkCounter = lnkCounter + 1;
//     }

//     /* Add Page linke for remaining record */
//     if (currentCounter > totalRecord) {

//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         // Update last page count - 21 Sept 2021
//         this.global_last_page_no = lnkCounter;
//     }
//     /* Add Page linke for remaining record */
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left" title="First"></i></a>';
//    // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//   //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//     pagerNavLinks += '<a href="#" data-page="' + lastPage +'"><i class="fas fa-angle-double-right" title="Last"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//     $('#c .wms-srv-pager-links a').off();
//     $('#checkWarehousePager .wms-srv-pager-links a').click(function () {  
//         var getDataPage = $(this).attr('data-page');
//         if (callBackFunction != null) 
// 		{   
//             callBackFunction(getDataPage,searchfilter,searchvalue);
//         }
//     });

// 	 $('#checkWarehousePager a.wms-srv-pager-go').off();
// 	$('#checkWarehousePager a.wms-srv-pager-go').click(function ()
// 	{
//         var getDataPage = $('#checkWarehousePager input[name="txtGridPageNo"]').val();
// 		if(Number(getDataPage) < 1)
// 		{
// 			alert('Please enter valid page number!!');
// 		}else if(Number(getDataPage)  > Number(lastPage))
// 		{
// 			//alert('Page number should not be greater than '+ lastPage +' !!');
// 			alert('Please enter valid page number!!');
// 		}else
// 		{
// 			 if (callBackFunction != null) {
// 				callBackFunction(getDataPage,searchfilter,searchvalue);
// 			}
// 		}       
//     });
// }

function saveWarehouse() {
	debugger;
	var apiPath = wmsApiPath + 'Warehouse/SaveWarehouse';
	//var apiPath='http://localhost:50068/api/staging/v1/Warehouse/SaveWarehouse';

	var getWarehouseId = globalEditWarehouseID;



	if (getWarehouseId == '0') {
		var getWarehouseCode = $("#txtWarehouseCode").val();
		var getWarehouseName = $("#txtWarehouseName").val();
		var getType = $("#txtWarehouseType").val();
		var getRemark = $("#txtWarehousRemark").val();
		var getLocalRate = $("#txtLocalRate").val();
		var getOutstationRate = $("#txtOutstationRate").val();
		//var getActiveSts = $('input[name="checkgroup1"]:checked').val();	
		var getActiveSts = $("#checkAddWarehouse").is(":checked");
	}
	//Edit Parameter
	else {

		var getWarehouseCode = $("#editWarehouseCode").val();
		var getWarehouseName = $("#editWarehouseName").val();
		var getType = $("#editWarehouseType").val();
		var getRemark = $("#editWarehousRemark").val();
		var getLocalRate = $("#editLocalRate").val();
		var getOutstationRate = $("#editOutstationRate").val();
		//var getActiveSts = $('input[name="checkgroup2"]:checked').val();
		var getActiveSts = $("#warehouseActiveY").is(":checked");
	}

	if (getActiveSts == true) {
		getActiveSts = 'Yes'
	}
	else {
		getActiveSts = 'No'
	}
	if(getRemark == '')
	{
		getRemark = 'NA';
	}
	

	var postData =
	{
		CompanyId: companyID,
		CustomerId: CustomerId,
		WarehouseId: ddlGlobalWarehouseID,
		UserId: userid,
		WarehouseCode: getWarehouseCode,
		WarehouseName: getWarehouseName,
		Type: getType,
		Remark: getRemark,
		LocalRate: getLocalRate,
		OutstationRate: getOutstationRate,
		Active: getActiveSts,
		ID: getWarehouseId
	};
	callHttpUrl(apiPath, postData, function (data) {

		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
		var retmessage = data.Result.Message;

		if (getStatus == '200') {
			var myGridList = data.Result.Message;
			
			alert("Warehouse save successfully!!");			
		}
		else if (getStatus == "300") {
			alert(retmessage);editWarehouselist
		}
		getWarhouseList(strCurrentPage, searchfilter);
	});
}

//Edit Warehouse
function editWarehouselist(warehouseId) {
	debugger;
	var apiPath = wmsApiPath + 'Warehouse/EditWarehouseList';
	var postData =
	{
		ID: warehouseId
	};
	callHttpUrl(apiPath, postData, function (data) {

		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;

		if (getStatus == '200') {
			var myGridList = data.Result;
			$("#editWarehouseCode").val(myGridList.Table[0].Code);
			$("#editWarehouseName").val(myGridList.Table[0].WarehouseName);
			$("#editWarehouseType").val(myGridList.Table[0].Type);
			$("#editWarehousRemark").val(myGridList.Table[0].Remark);
			var getActive = myGridList.Table[0].Active;

			if (getActive == true) {
				$('#warehouseActiveY wms-srv-grid-cell-input notranslate input[type="checkbox"]').prop('checked', true);
			}
			else {
				$('#warehouseActiveY').prop('checked', false);
			}
		}
	});
}


function SearchWarehouseList() {

	searchfilter = $('#ddlsearch').val();
	searchvalue = $('#txtvalue').val();

	if (searchvalue == '' && searchfilter != "") {
		alert('Please Enter value for filter');
	}
	else {
		getWarhouseList(strCurrentPage, searchfilter, searchvalue);
	}
	if (searchfilter == '' && searchvalue == '') {
		getWarhouseList(strCurrentPage, searchfilter, searchvalue);
	}
}


var spnLocationType = [];
var spnLocationTypeId = [];
var spnZoneLocation = [];
var spnZoneLocationId = [];
var spnCapacity = [];
var spnCapacityId = [];

function bindLocationDropDown(objid, selectedVal) {
	debugger;
	var ddlLocation = '';
	ddlLocation = '<select class="wms-srv-grid-cell-input" id="ddlLocationType' + objid + '">';
	for (var i = 0; i < spnLocationType.length; i++) {
		if (spnLocationTypeId[i] == selectedVal) {
			ddlLocation += '<option value = "' + spnLocationTypeId[i] + '" selected="selected">' + spnLocationType[i] + '</option>';
		} else {
			ddlLocation += '<option value = "' + spnLocationTypeId[i] + '">' + spnLocationType[i] + '</option>';
		}
	}
	ddlLocation += '</select>';
	return ddlLocation;
}

function bindZoneDropDown(objid, selectedVal) {
	debugger;
	var ddlZoneLocation = '';
	ddlZoneLocation = '<select class="wms-srv-grid-cell-input" id="ddlZoneLocation' + objid + '">';
	for (var i = 0; i < spnZoneLocation.length; i++) {
		if (spnZoneLocationId[i] == selectedVal) {
			ddlZoneLocation += '<option value = "' + spnZoneLocationId[i] + '" selected="selected">' + spnZoneLocation[i] + '</option>';
		} else {
			ddlZoneLocation += '<option value = "' + spnZoneLocationId[i] + '">' + spnZoneLocation[i] + '</option>';
		}
	}
	ddlZoneLocation += '</select>';
	return ddlZoneLocation;
}

function bindCapacityDropDown(objid, selectedVal) {
	debugger;
	var ddlCapacity = '';
	ddlCapacity = '<select class="wms-srv-grid-cell-input" id="ddlCapacitywarehouse_' + objid + '" name="getCapacityValue" onchange="getCapacity(\'' + objid + '\')">';
	for (var i = 0; i < spnCapacity.length; i++) {
		if (spnCapacityId[i] == selectedVal) {
			ddlCapacity += '<option value = "' + spnCapacityId[i] + '" selected="selected">' + spnCapacity[i] + '</option>';
		} else {
			ddlCapacity += '<option value = "' + spnCapacityId[i] + '">' + spnCapacity[i] + '</option>';
		}
	}
	ddlCapacity += '</select>';
	return ddlCapacity;
}

//Location Type
function LocationType() {
	debugger;
	var apiPath = wmsApiPath + 'Warehouse/LocationType';
	//var apiPath='http://173.212.244.46/WebAPITest/api/staging/v1/Warehouse/LocationType';

	var postData = {
		userId: "1"
	};
	callHttpUrl(apiPath, postData, function (data) {
		var isStatus = data.Status;
		if (isStatus == 200) {
			spnLocationType = [];
			spnLocationTypeId = [];
			spnZoneLocation = [];
			spnZoneLocationId = [];
			spnCapacity = [];
			spnCapacityId = [];
			$("#ddlLocationType").html('<option >--Select List--</option>');
			spnLocationType.push('--Select List--');
			spnLocationTypeId.push('0');
			$("#ddlZoneLocation").html('<option >--Select List--</option>');
			spnZoneLocation.push('--Select List--');
			spnZoneLocationId.push('0');
			$("#ddlCapacity").html('<option >--Select List--</option>');
			spnCapacity.push('--Select List--');
			spnCapacityId.push('0');
			var myGridList = data.Result;
			var getLocationType = myGridList;
			var getZoneLocation = myGridList;
			if (getLocationType.Table.length > 0) {
				for (var i = 0; i < getLocationType.Table.length; i++) {
					var LocationId = getLocationType.Table[i].ID;
					var LocationValue = getLocationType.Table[i].value;
					spnLocationType.push(LocationValue);
					spnLocationTypeId.push(LocationId);
					$("#ddlLocationType").append('<option value = "' + LocationId + '">' + LocationValue + '</option>');
				}
			}
			if (getZoneLocation.Table1.length > 0) {
				for (var j = 0; j < getZoneLocation.Table1.length; j++) {
					var ZoneId = getZoneLocation.Table1[j].ID;
					var ZoneValue = getZoneLocation.Table1[j].value;
					spnZoneLocation.push(ZoneValue);
					spnZoneLocationId.push(ZoneId);
					$("#ddlZoneLocation").append('<option value = "' + ZoneId + '">' + ZoneValue + '</option>');
				}
			}
			if (getZoneLocation.Table2.length > 0) {
				for (var k = 0; k < getZoneLocation.Table2.length; k++) {
					var CapacityID = getZoneLocation.Table2[k].ID;
					var CapacityValue = getZoneLocation.Table2[k].value;
					spnCapacity.push(CapacityValue);
					spnCapacityId.push(CapacityID);
					$("#ddlCapacity").append('<option value = "' + CapacityID + '">' + CapacityValue + '</option>');
				}
			}
			var getCapacityDropDown = bindCapacityDropDown(0, 0);
			$('#cellCapacityDropDown').html(getCapacityDropDown);
		}
	});
}
//Edit Location Type
function EditLocationType() {
	var apiPath = wmsApiPath + 'Warehouse/LocationType';
	//var apiPath='http://173.212.244.46/WebAPITest/api/staging/v1/Warehouse/LocationType';

	var postData = {
		userId: "1"
	};
	callHttpUrl(apiPath, postData, function (data) {
		var isStatus = data.Status;
		if (isStatus == 200) {
			$("#EditddlLocationType").html('<option >--Select List--</option>');
			$("#EditddlZoneLocation").html('<option >--Select List--</option>');
			$("#EditddlCapacity").html('<option >--Select List--</option>');
			var myGridList = data.Result;
			var getLocationType = myGridList;
			var getZoneLocation = myGridList;
			if (getLocationType.Table.length > 0) {
				for (var i = 0; i < getLocationType.Table.length; i++) {
					var CustomerId = getLocationType.Table[i].ID;
					var CustomerValue = getLocationType.Table[i].value;
					$("#EditddlLocationType").append('<option value = "' + CustomerId + '">' + CustomerValue + '</option>');
				}
			}
			if (getZoneLocation.Table1.length > 0) {
				for (var j = 0; j < getZoneLocation.Table1.length; j++) {
					var editZoneLocationId = getZoneLocation.Table1[j].ID;
					var editZoneLocationValue = getZoneLocation.Table1[j].value;
					$("#EditddlZoneLocation").append('<option value = "' + editZoneLocationId + '">' + editZoneLocationValue + '</option>');
				}
			}
			if (getZoneLocation.Table2.length > 0) {
				for (var k = 0; k < getZoneLocation.Table2.length; k++) {
					var CapacityID = getZoneLocation.Table2[k].ID;
					var CapacityValue = getZoneLocation.Table2[k].value;
					$("#EditddlCapacity").append('<option value = "' + CapacityID + '">' + CapacityValue + '</option>');
				}
			}

		}
	});
}



//Edit Lccation Type

//Warehouse location
//get This value in function searchfilterLocation
function WarehouseLocationList(CurrentPage, searchlocationfilter, searchlocationvalue) {
	debugger;
	var apiPath = wmsApiPath + 'Warehouse/LocationList';
	//var CurrentPage = '1';
	var searchlocationfilter = $('#ddlsearchlocation').val();
	var searchlocationvalue = $('#txtfilterLocation').val();
	if (searchlocationfilter == '') {
		searchlocationfilter = '0';
		searchlocationvalue = '0';
	}

	//globalwarehouseid=selWarehouseid;

	var postData =
	{
		CurrentPage: CurrentPage,
		recordlimit: RecordLimit,
		CompanyId: companyID,
		UserId: userid,
		CustomerId: CustomerId,
		WarehouseId: globalwarehouseid,
		Search: searchlocationfilter,
		Filter: searchlocationvalue
	}
	callHttpUrl(apiPath, postData, function (data) {
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;

		if (getStatus == '200') {
			var myGridList = data.Result;
			//alert('Success');	
			var RecordLimit = myGridList.Table[0].TotalRecord;
			var currentPage = myGridList.Table[0].CurrentPage;


			$("#gridLocationList").html('');

			var GridList = '';
			GridList = GridList + '<div class="wms-srv-grid-header">';
			GridList = GridList + '<div class="wms-srv-grid-cell" style="text-align:center;"></div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Location type</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell" >Zone Location</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Sort code</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Location code</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Shelf</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Section</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Pathway</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Floor</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Building</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Capacity in</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">Capacity</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell" style="width: 50px;">Active</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell" style="width:100px;">Action</div>';
			GridList = GridList + '</div>';	//Heading End	


			GridList = GridList + '<div class="wms-srv-grid-row" id="rowLocationParam_0" style="text-align: center;">';
			GridList = GridList + '<div class="wms-srv-grid-cell" style="text-align:center;"></div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<select class="wms-srv-grid-cell-input" id="ddlLocationType">';
			GridList = GridList + '<option >--Select List--</option>';
			GridList = GridList + '</select>';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<select class="wms-srv-grid-cell-input" id="ddlZoneLocation">';
			GridList = GridList + '<option >--Select List--</option>';
			GridList = GridList + '</select>';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddSortCode" onkeypress="return isNumber(event)" class="wms-srv-grid-cell-input notranslate">';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddLocationcode" class="wms-srv-grid-cell-input notranslate">';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddShelf"  class="wms-srv-grid-cell-input notranslate">';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddSection" class="wms-srv-grid-cell-input notranslate">';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddPathway"  class="wms-srv-grid-cell-input notranslate"></div>';
			GridList = GridList + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddFloor"  class="wms-srv-grid-cell-input notranslate"></div>';
			GridList = GridList + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddBuilding"  class="wms-srv-grid-cell-input notranslate"></div>';
			GridList = GridList + '<div class="wms-srv-grid-cell" id="cellCapacityDropDown">';
			//GridList = GridList + bindCapacityDropDown(0, 0);
			GridList = GridList + '<select type="text" class="wms-srv-grid-cell-input" onchange="getCapacity(\'0\');" id="ddlCapacitywarehouse_">';
			GridList = GridList + '</select>';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<div class="wms-srv-suggestion-holder">';
			GridList = GridList + '<div class="input1" style="display:none">';   //Capacity HTML CODE
			GridList = GridList + '<span><input type="text" data-prefix="SESKU" id="txtAddAreaValue1" data-id="" value="" class="wms-srv-grid-cell-input" placeholder="height"></span>';
			GridList = GridList + '<span><input type="text" data-prefix="SESKU" id="txtAddAreaValue2" data-id="" value="" class="wms-srv-grid-cell-input" placeholder="width"></span>';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="input2" style="display:none">';
			GridList = GridList + '<span><input type="text" data-prefix="SESKU" id="txtAddNumber3" data-id="" value="" class="wms-srv-grid-cell-input notranslate" placeholder="number"></span>';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="input3" style="display:none"><span>';
			GridList = GridList + '<input type="text" data-prefix="SESKU" id="txtAddCubicValue1" data-id="" value="" class="wms-srv-grid-cell-input notranslate" placeholder="length"></span>';
			GridList = GridList + '<span><input type="text" data-prefix="SESKU" id="txtAddCubicValue2" data-id="" value="" class="wms-srv-grid-cell-input notranslate" placeholder="width"></span>';
			GridList = GridList + '<span><input type="text" data-prefix="SESKU" id="txtAddCubicValue3" data-id="" value="" class="wms-srv-grid-cell-input notranslate" placeholder="height"></span>';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="input4" style="display:none" >';
			GridList = GridList + '<span><input type="text" data-prefix="SESKU" id="txtLiter" data-id="" value="" class="wms-srv-grid-cell-input notranslate" placeholder="liter"></span>';
			GridList = GridList + '</div>';
			GridList = GridList + '</div>';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<div class="wms-srv-suggestion-holder" style="display:inline-flexbox; width: 100px;">';
			GridList = GridList + '<input class="wms-srv-grid-cell-input" type="checkbox" id="checkAddLocationActive" value="" checked="true"><a href="#"></a>';
			GridList = GridList + '</div>';
			GridList = GridList + '</div>';
			GridList = GridList + '<div class="wms-srv-grid-cell">';
			GridList = GridList + '<div class="wms-srv-grid-action">';
			GridList = GridList + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" style="color:black !important" onclick="saveLocation(' + getEditLocationID + ');"></i></a>';
			GridList = GridList + '</div>';
			GridList = GridList + '</div>';
			GridList = GridList + '</div>';
			LocationType();


			for (var i = 0; i < myGridList.Table1.length; i++) {
				var getLastSortCode = myGridList.Table1[0].SortCode;
				$("#txtLastLocSortCode").val(getLastSortCode);
				//getWarehouseEditId = myGridList.Table1[i].WarehouseID;	
				getWarehouseEditId = myGridList.Table1[i].globalwarehouseid;
				var getLocationId = myGridList.Table1[i].MID;
				var getLocationType = myGridList.Table1[i].Locationvalue;
				var getLocationTypeId = myGridList.Table1[i].LocationType;
				var getZoneType = myGridList.Table1[i].ZoneValue;
				var getZoneTypeID = myGridList.Table1[i].ZoneType
				var LocationListId = myGridList.Table1[i].MID;
				var getLocationCode = myGridList.Table1[i].LocationCode;
				var getSortCode = myGridList.Table1[i].SortCode;
				//var getNumber = myGridList.Table1[i].number;
				var getlength = myGridList.Table1[i].length;
				var getWidth = myGridList.Table1[i].width;
				var getHeight = myGridList.Table1[i].height;
				//var getCompany	 = myGridList.Table1[i].Company;
				var getShelf = myGridList.Table1[i].Shelf;
				var getSection = myGridList.Table1[i].Section;
				var getPathway = myGridList.Table1[i].Pathway;
				var getFloar = myGridList.Table1[i].Floor;
				var getBuilding = myGridList.Table1[i].Building;
				var getCapacityIn = myGridList.Table1[i].CapacityIn;
				var getCapacity = myGridList.Table1[i].Capacity;
				var getCapacityValue = myGridList.Table1[i].capacityvalue;

				var getCapacityID = myGridList.Table1[i].CapacityIn;
				var getWarehouseName = myGridList.Table1[i].WarehouseName;
				var getWarehouseCode = myGridList.Table1[i].Code;
				var getCompanyID = myGridList.Table1[i].CompanyID;
				var getWarehouseRemark = myGridList.Table1[i].Section;
				var geActive = myGridList.Table1[i].Active;
				//id="wms-srv-beforeedit-warehouse14"
				var WarehouseGridListId = getWarehouseEditId;
				GridList = GridList + '<div class="wms-srv-grid-row wms-align" id="rowLocationParam_' + getLocationId + '" style="text-align: center;">';
				GridList = GridList + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="Checkbox" name ="check" class="chkLocationSnapshot" id="' + getLocationId + '"  class="messageCheckbox" value="' + getLocationId + '"></div>';

				//GridList = GridList +'<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="" class="messageCheckbox" value="" id=""></div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getLocationType + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getZoneType + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getSortCode + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getLocationCode + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getShelf + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getSection + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getPathway + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getFloar + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getBuilding + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + getCapacityValue + '</div>';

				GridList = GridList + '<div class="wms-srv-grid-cell">';
				GridList = GridList + '<div class="wms-srv-suggestion-holder" id="gridCapacityValues">';

				//$("#txtddlLocationType").val(getLocationType);
				//$("#txtddlLocationType").val(getLocationType);

				if (getCapacityValue == 'Area(L x W)') {
					GridList = GridList + getlength + ' x ' + getWidth;
					//GridList = GridList + '<div class="wms-srv-grid-cell">'+ getlength +'</div>';
					//GridList = GridList + '<input type="text" class="wms-srv-grid-cell-input notranslate" value="'+getlength+'">';

					//GridList = GridList + '<div class="wms-srv-grid-cell">'+ getWidth +'</div>';
					//GridList = GridList + '<input type="text" class="wms-srv-grid-cell-input notranslate" value="'+getWidth+'">';
				}
				else if (getCapacityValue == 'Number') {
					GridList = GridList + getCapacity;
					//GridList = GridList + '<div class="wms-srv-grid-cell">'+getNumber+'</div>';	
					//GridList = GridList + '<input type="text" class="wms-srv-grid-cell-input notranslate" value="'+getCapacity+'">';
				}
				else if (getCapacityValue == 'Liter') {
					GridList = GridList + getCapacity;
					//GridList = GridList + '<div class="wms-srv-grid-cell">'+getNumber+'</div>';	
					//GridList = GridList + '<input type="text" class="wms-srv-grid-cell-input notranslate" value="'+getCapacity+'">';
				}
				else if (getCapacityValue == 'Cubic Capacity(L x W x H)') {
					//GridList = GridList + '<span><div class="wms-srv-grid-cell">'+getlength+'</div></span>';
					//GridList = GridList + '<span><div class="wms-srv-grid-cell">'+getWidth+'</div></span>';
					//GridList = GridList + '<span><div class="wms-srv-grid-cell">'+getHeight+'</div></span>';
					//GridList = GridList + '<input type="text" class="wms-srv-grid-cell-input notranslate" value="'+getlength+'">';
					//GridList = GridList + '<input type="text" class="wms-srv-grid-cell-input notranslate" value="'+getWidth+'">';
					//GridList = GridList + '<input type="text" class="wms-srv-grid-cell-input notranslate" value="'+getHeight+'">';

					GridList = GridList + getlength + ' x ' + getWidth + ' x ' + getHeight;

				}
				else {
					//GridList = GridList + '<span><div class="wms-srv-grid-cell">'+getHeight+'</div></span>'
					//GridList = GridList + '<input type="text" class="wms-srv-grid-cell-input notranslate" value="'+getHeight+'">';
					GridList = GridList + getHeight;
				}
				//GridList = GridList + '<input type="text" data-prefix="SESKU" data-id="" value="" class="wms-srv-grid-cell-input notranslate" placeholder="Number" style="width:55px;"><a href="#"></a>';
				GridList = GridList + '</div>';
				GridList = GridList + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">' + geActive + '</div>';
				GridList = GridList + '<div class="wms-srv-grid-cell">';
				GridList = GridList + '<div class="wms-srv-grid-action">';
				GridList = GridList + '<a href="#" title="Edit" class="wms-srv-save">';
				//GridList = GridList + '<i class="fas fa-edit" onclick="EditLocation(\''+getLocationId+'\',\''+getLocationType+'\',\''+LocationListId+'\',\''+getZoneType+'\',\''+getZoneTypeID+'\',\''+getSortCode+'\',\''+getLocationCode+'\',\''+getShelf+'\',\''+getSection+'\',\''+getPathway+'\',\''+getFloar+'\',\''+getBuilding+'\',\''+getCapacityIn+'\',\''+getCapacityID+'\',\''+getlength+'\',\''+getWidth+'\',\''+getCapacity+'\',\''+getHeight+'\',\''+geActive+'\');"></i></a>';
				GridList = GridList + '<i class="fas fa-edit" onclick="EditLocation(\'' + getLocationId + '\',\'' + getLocationType + '\',\'' + getLocationTypeId + '\',\'' + getZoneType + '\',\'' + getZoneTypeID + '\',\'' + getSortCode + '\',\'' + getLocationCode + '\',\'' + getShelf + '\',\'' + getSection + '\',\'' + getPathway + '\',\'' + getFloar + '\',\'' + getBuilding + '\',\'' + getCapacityIn + '\',\'' + getCapacityID + '\',\'' + getlength + '\',\'' + getWidth + '\',\'' + getHeight + '\',\'' + geActive + '\',' + getCapacity + ');"></i></a>';
				GridList = GridList + '</div>';   //showEditWarehouseRow14();
				GridList = GridList + '</div>';
				GridList = GridList + '</div>';
			}
			$("#gridLocationList").html(GridList);

			setupGridPagingList('locationListSOGridPager', CurrentPage, RecordLimit, WarehouseLocationList);
		}

	});

}

// function setupGridPaginglocation(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) { 
//     debugger;
//       var global_max_record_count = 10;
//       var pageNo = Number(strCurrentPage);
// 	  LocgrdCurrentpage = pageNo;
//       var recordFrom = ((pageNo - 1) * 10) + 1;
//       var recordTo = recordFrom + 9;
//       var totalRecord = Number(strTotalRecords);
//       var pagerLinks = '';

//       $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//       var lnkCounter = 1;
//       var currentCounter = global_max_record_count;
//       //var currentCounter = 0;
//       var lastPage = 0;
//       while (currentCounter < totalRecord) {
//           if (lnkCounter == pageNo) {
//               pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//           } else {
//               pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//               lastPage = lnkCounter;
//           }
//           global_last_page_no = lnkCounter;
//           currentCounter = currentCounter + global_max_record_count;
//           lnkCounter = lnkCounter + 1;
//       }

//       /* Add Page linke for remaining record */
//       if (currentCounter > totalRecord) {

//           if (lnkCounter == pageNo) {
//               pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//           } else {
//               pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//               lastPage = lnkCounter;
//           }
//           // Update last page count - 21 Sept 2021
//           this.global_last_page_no = lnkCounter;
//       }
//       /* Add Page linke for remaining record */
//       var pagerNavLinks = '';
//       pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
//       // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//       pagerNavLinks += pagerLinks;
//       //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//       pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';

//       $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//       $('#c .wms-srv-pager-links a').off();
//       $('#locationListSOGridPager .wms-srv-pager-links a').click(function () {
//           var getDataPage = $(this).attr('data-page');
//           if (callBackFunction != null) {

//               callBackFunction(getDataPage);
//           }
//       });

//       $('#locationListSOGridPager a.wms-srv-pager-go').off();
//       $('#locationListSOGridPager a.wms-srv-pager-go').click(function ()
//       {
//           var getDataPage = $('#locationListSOGridPager input[name="txtGridPageNo"]').val();
//           if(Number(getDataPage) < 1)
//           {
//               alert('Please enter valid page number!!');
//           }else if(Number(getDataPage)  > Number(lastPage))
//           {
//               //alert('Page number should not be greater than '+ lastPage +' !!');
//               alert('Please enter valid page number!!');
//           }else
//           {
//                if (callBackFunction != null) {
//                   callBackFunction(getDataPage,searchfilter,searchvalue);
//               }
//           }       
//       });	     
// }


//End Location cycle count Create 

function getSelectedlocCheckbox() {
	var selectedIds = '';
	$('.chkLocationSnapshot').each(function () {
		var isSelected = $(this).prop('checked');
		var myVal = $(this).val();
		if (isSelected) {
			if (selectedIds == '') {
				selectedIds = myVal;
			} else {
				selectedIds = selectedIds + ',' + myVal;
			}
		}
	});
	//alert(selectedIds);
	return selectedIds;
}

function opencyclecountlocplan() {
	debugger;
	var getSelectedLocRecords = "";
	getSelectedLocRecords = getSelectedlocCheckbox();
	if (getSelectedLocRecords != "") {

		$('#theme-cyclecount-popup').show();
		$('#theme-cyclecount-popup-close').off();
		$('#theme-cyclecount-popup-close').click(function () {
			$('#theme-cyclecount-popup').hide();
		});
	}
	else {
		alert("Please select Location to create Cycle Count Plan.");
	}
}

function SaveCycleCountLoc() {
	debugger;
	if (validatecycleLocCount() != false) {
		var GetCycleUserid = userid;
		//var getCustomerId =1;// $("#ddlcustomer").val();
		var getWarehouseId = $('#ddlwarehouse').val();
		var getSelectedlocIds = getSelectedlocCheckbox();
		var gettitle = $("#txtlocplantitle").val();
		var getplanid = $("#txtlocplanid").val();

		var postData =
		{
			"Object": "Location",
			"UserId": GetCycleUserid,
			"CustomerId": CustomerId,
			"WarehouseId": getWarehouseId,
			"locationids": getSelectedlocIds,
			"PlanTitle": gettitle,
			"PlanID": getplanid
		};
		var apiPath = wmsApiPath + 'Warehouse/CycleCountLocation';
		callHttpUrl(apiPath, postData, function (data) {
			var getstatus = data.Status;
			var getstatuscode = data.StatusCode;
			var getresult = data.Result;
			if (getstatus == "200" && getstatuscode == "Success") {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					//-- line to create selected checkbox values
					alert("Cycle Count Plan created Successfully.");
					$('.chkLocationSnapshot').prop('checked', false);
					$('#theme-cyclecount-popup').hide();

				}
				else {
					alert("Cycle Count Plan creation failed.");
					$('.chkLocationSnapshot').prop('checked', false);
					$('#theme-cyclecount-popup').hide();
				}
			}
			else if (getstatus == "Validate" && getstatuscode == "300") {
				alert("Cycle Count Plan ID allready available.");
				$('.chkLocationSnapshot').prop('checked', false);
				$('#theme-cyclecount-popup').hide();
			}
			else {
				alert("Error Occured.");
				$('.chkLocationSnapshot').prop('checked', false);
				$('#theme-cyclecount-popup').hide();
			}
			$('#txtlocplantitle').val('');
			$('#txtlocplanid').val('');

		});
	}
}

function validatecycleLocCount() {
	debugger;
	if (document.getElementById("txtlocplantitle").value == "") {
		alert("Please enter plan title!");
		return false;
	}

	else if (document.getElementById("txtlocplanid").value == "") {
		alert("Please enter plan ID!");
		return false;
	}
}

//End Location cycle count Create 




function EditLocation(LocationEditId, getLocationType, LocationListId, getZoneType, getZoneTypeID, getSortCode, getLocationCode, getShelf, getSection, getPathway, getFloar, getBuilding, getCapacityIn, getCapacityID, getlength, getWidth, getHeight, geActive, GetCapacityNum) {
	debugger;
	getEditLocationID = LocationEditId;

	//alert(); 

	var Gridrow = '';
	var getEditLoctionType = getLocationType;
	var geWarehouseLocationEditId = LocationListId;
	var getEditZoneType = getZoneType;
	var getEditSortCode = getSortCode;
	var getEditLocationCode = getLocationCode;
	var getEditShelf = getShelf;
	var getEditSection = getSection;
	var getEditPathway = getPathway;
	var getEditFloar = getFloar;
	var getEditBuilding = getBuilding;
	var getEditCapacityIn = getCapacityIn;
	var getEditlength = getlength;
	var getEditWidth = getWidth;
	//var getEditNumber = getCapacity();
	var getEditNumber = GetCapacityNum;
	var getEditHeight = getHeight;
	var getEditactive = geActive;
	//$("#EditddlLocationType").html(geWarehouseLocationEditId)
	//$("#EditddlZoneLocation").val(getEditZoneType)
	//Gridrow = Gridrow +'<div class="wms-srv-grid-row" style="text-align: center;">';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell" style="text-align:center;"></div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + bindLocationDropDown(LocationEditId, LocationListId);
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + bindZoneDropDown(LocationEditId, getZoneTypeID);
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + '<input type="text" id="txtEditSortCode" class="wms-srv-grid-cell-input notranslate" onkeypress="return isNumber(event)" value="' + getEditSortCode + '">';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + '<input type="text" id="txtEditLocationcode"  class="wms-srv-grid-cell-input notranslate " value="' + getEditLocationCode + '">';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + '<input type="text" id="txtEditShelf"  class="wms-srv-grid-cell-input notranslate" value="' + getEditShelf + '">';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + '<input type="text" id="txtEditSection" class="wms-srv-grid-cell-input notranslate" value="' + getEditSection + '">';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditPathway"  class="wms-srv-grid-cell-input notranslate" value="' + getEditPathway + '"></div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditFloor"  class="wms-srv-grid-cell-input notranslate" value="' + getEditFloar + '"></div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditBuilding"  class="wms-srv-grid-cell-input notranslate" value="' + getEditBuilding + '"></div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	if (getCapacityIn != null || getCapacityIn != 'null') {
		Gridrow = Gridrow + bindCapacityDropDown(LocationEditId, getCapacityID);
	} else {
		Gridrow = Gridrow + bindCapacityDropDown(LocationEditId, 0);
	}
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + '<div class="wms-srv-suggestion-holder">';
	Gridrow = Gridrow + '<div id="Editinput1" class="input1" style="display:none">';   //Capacity HTML CODE
	Gridrow = Gridrow + '<span><input type="text" id="txtEditAreaValue1" class="wms-srv-grid-cell-input" placeholder="Length" value="' + getEditlength + '"></span>';
	Gridrow = Gridrow + '<span><input type="text" id="txtEditAreaValue2" class="wms-srv-grid-cell-input" placeholder="Width"  value="' + getEditWidth + '"></span>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div id="Editinput2" class="input2" style="display:none">';
	Gridrow = Gridrow + '<span><input type="text"id="txtEditNumber3" class="wms-srv-grid-cell-input notranslate" value="' + getEditNumber + '"></span>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div id="Editinput3" class="input3" style="display:none">';
	Gridrow = Gridrow + '<span><input type="text" id="txtEditCubicValue1" class="wms-srv-grid-cell-input notranslate" placeholder="Length" value="' + getEditlength + '"></span>';
	Gridrow = Gridrow + '<span><input type="text" id="txtEditCubicValue2" class="wms-srv-grid-cell-input notranslate" placeholder="Width" value="' + getEditWidth + '"></span>';
	Gridrow = Gridrow + '<span><input type="text" id="txtEditCubicValue3" class="wms-srv-grid-cell-input notranslate" placeholder="Height" value="' + getEditHeight + '"></span>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div id="Editinput4" class="input4" style="display:none">';
	Gridrow = Gridrow + '<span><input type="text" id="txtEditLiter" class="wms-srv-grid-cell-input notranslate" value="' + getEditNumber + '" placeholder="liter"></span>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + '<div class="wms-srv-suggestion-holder" style="display:inline-flexbox; width: 100px;">';
	var strChecked = '';
	if (getEditactive == "Yes") {
		strChecked = 'checked="checked"';
	}
	Gridrow = Gridrow + '<input class="wms-srv-grid-cell-input" type="checkbox" id="checkEditLocationActive" value="" ' + strChecked + ' ><a href="#"></a>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '<div class="wms-srv-grid-cell">';
	Gridrow = Gridrow + '<div class="wms-srv-grid-action">';
	Gridrow = Gridrow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" style="color:black !important" onclick="saveLocation();"></i></a>';

	Gridrow = Gridrow + '<div class="wms-srv-action-sep">|</div>';
	Gridrow = Gridrow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditLocationHide(' + LocationEditId + ',' + globalwarehouseid + ');"></i></a>';
	Gridrow = Gridrow + '</div>';
	//Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '</div>';
	Gridrow = Gridrow + '</div>';
	//Gridrow = Gridrow + '</div>';
	EditLocationType();

	//alert("#rowParameter_" + LocationEditId);
	$("#rowLocationParam_" + LocationEditId).html(Gridrow);
	getCapacity(LocationEditId);
}
function gridEditLocationHide(LocationEditId, getWarehouseEditId) {

	$("#rowParameter_" + LocationEditId).html('');
	//WarehouseLocationList(getWarehouseEditId);
	getEditLocationID = "0";
	WarehouseLocationList(strCurrentPage, searchlocationfilter, searchlocationvalue);
}

function saveLocation() {
	debugger;
	var getGlbLocationID = getEditLocationID;
	if (ValidateLocation(getGlbLocationID) != false) {
		var apiPath = wmsApiPath + 'Warehouse/AddLocation';
		var getLocationType = '';
		var getZoneLocation = '';
		var getSortCode = '';
		var getLocationcode = '';
		var getShelf = '';
		var getSection = '';
		var getPathway = '';
		var getFloor = '';
		var getBuilding = '';
		var getCapacity = '';
		var getValue = '';
		var getLength = '';
		var getWidth = '';
		var getNumber = '0';
		var getHeight = '';
		var getLiter = '';
		var getActive = '';

		if (getGlbLocationID == '0') {
			getLocationType = $("#ddlLocationType").val();
			getZoneLocation = $("#ddlZoneLocation").val();
			getSortCode = $("#txtAddSortCode").val();
			getLocationcode = $("#txtAddLocationcode").val();
			getShelf = $("#txtAddShelf").val();
			getSection = $("#txtAddSection").val();
			getPathway = $("#txtAddPathway").val();
			getFloor = $("#txtAddFloor").val();
			getBuilding = $("#txtAddBuilding").val();
			//getCapacity = $("#ddlCapacitywarehouse_").val();
			//getValue = $("#ddlCapacitywarehouse_").val();

			getCapacity = getCapacityValue;

			//if(getCapacity == '99')
			if (getCapacityText == 'Area(L x W)') {
				getLength = $("#txtAddAreaValue1").val();
				getWidth = $("#txtAddAreaValue2").val();
			}
			//if(getCapacity == '100')
			if (getCapacityText == 'Number') {
				getNumber = $("#txtAddNumber3").val();
			}
			//if(getCapacity == '101')
			if (getCapacityText == 'Cubic Capacity(L x W x H)') {
				getLength = $("#txtAddCubicValue1").val();
				getWidth = $("#txtAddCubicValue2").val();
				getHeight = $("#txtAddCubicValue3").val();

			}
			//if(getCapacity == '102')
			if (getCapacityText == 'Liter') {
				getNumber = $("#txtLiter").val();
			}
			//var getCheckCapacity = $("#chkCapacity").val();	
			getActive = $("#checkAddLocationActive").is(":checked");
		}
		else {
			//Edit Location Parameters		
			getLocationType = $("#ddlLocationType" + getEditLocationID).val();
			getZoneLocation = $("#ddlZoneLocation" + getEditLocationID).val();
			getSortCode = $("#txtEditSortCode").val();
			getLocationcode = $("#txtEditLocationcode").val();
			getShelf = $("#txtEditShelf").val();
			getSection = $("#txtEditSection").val();
			getPathway = $("#txtEditPathway").val();
			getFloor = $("#txtEditFloor").val();
			getBuilding = $("#txtEditBuilding").val();
			//getCapacity = getValue;
			getCapacity = getCapacityValue;

			//if(getCapacity == '99')
			if (getCapacityText == 'Area(L x W)') {
				getLength = $("#txtEditAreaValue1").val();
				getWidth = $("#txtEditAreaValue2").val();
			}
			//if(getCapacity == '100')
			if (getCapacityText == 'Number') {
				getNumber = $("#txtEditNumber3").val();
			}
			//if(getCapacity == '101')
			if (getCapacityText == 'Cubic Capacity(L x W x H)') {
				getLength = $("#txtEditCubicValue1").val();
				getWidth = $("#txtEditCubicValue2").val();
				getHeight = $("#txtEditCubicValue3").val();

			}
			//if(getCapacity == '102')
			if (getCapacityText == 'Liter') {
				var getNumber = $("#txtEditLiter").val();
			}
			//var getCheckCapacity = $("#chkCapacity").val();	checkEditLocationActive
			var getActive = $("#checkEditLocationActive").is(":checked");
		}
		//Edit Location Parameters


		if (getActive == true) {
			getActive = 'Yes'
		}
		else {
			getActive = 'No'
		}

		if (getLength == '') {
			getLength = 0;
		}
		if (getWidth == '') {
			getWidth = 0;
		}
		if (getCapacity == '') {
			getCapacity = 0;
		}
		if (getHeight == '') {
			getHeight = 0;
		}

		var postData =
		{
			LocationCode: getLocationcode,
			ID: getGlbLocationID,
			CompanyID: companyID,
			UserID: userid,
			WarehouseID: globalwarehouseid,
			LocationType: getLocationType,
			ZoneLocation: getZoneLocation,
			SortCode: getSortCode,
			ZoneCode: "Y",
			Shelf: getShelf,
			Section: getSection,
			Pathway: getPathway,
			Floor: getFloor,
			Building: getBuilding,
			CapacityIn: getCapacity,
			Number: getNumber,
			Length: getLength,
			Height: getHeight,
			Width: getWidth,
			CustomerID: CustomerId,
			Active: getActive
		}
		callHttpUrl(apiPath, postData, function (data) {
			//ClearLocationfill();
			var getStatus = data.Status;
			var getStatusCode = data.StatusCode;
			var getresultware = data.Result;
			if (getStatus == '200') {
				var returnmsgw = getresultware.Message;
				if (returnmsgw == "success") {
					if (getGlbLocationID == '0') {
						alert("Location Added Successfully.");
					}
					else {
						alert("Location Updated Successfully.");
						getEditLocationID = "0";
					}
					WarehouseLocationList(strCurrentPage, searchlocationfilter, searchlocationvalue);
				}
				else {
					alert(returnmsgw);
				}

				//WarehouseLocationList(getWarehouseEditId,searchlocationfilter,searchlocationvalue);
			}
			else if (getStatus == '300') {
				var validatemsg = getresultware.Message;
				if (getGlbLocationID == '0') {
					//alert(validatemsg);
					alert("Failed to Add location due to  " + validatemsg);
				}
				else {
					alert("Failed to update location due to  " + validatemsg);
				}
				//	WarehouseLocationList(getWarehouseEditId,searchlocationfilter,searchlocationvalue);
			}
			else {
				alert("Error Occured");
			}
		});
	}
}
function ValidateLocation(validtLocID) {
	debugger;
	var getLength = "", getWidth = "", getHeight = "", getNumber = "", getLiter = "", VgetLocationcode = "", VgetShelf = "", VgetSection = "", VgetPathway = "", VgetFloor = "", VgetBuilding = "";
	var VgetLocationType = "", VgetZoneLocation = "", VGetCapacity = "", VGetArealength = "", VGetAreaWidth = '';
	if (validtLocID == 0) {
		VGetArealength = $("#txtAddAreaValue1").val();
		VGetAreaWidth = $("#txtAddAreaValue2").val();
		getLength = $("#txtAddCubicValue1").val();
		getWidth = $("#txtAddCubicValue2").val();
		getHeight = $("#txtAddCubicValue3").val();
		getNumber = $("#txtAddNumber3").val();
		getLiter = $("#txtLiter").val();
		VgetLocationcode = $("#txtAddLocationcode").val();
		VgetShelf = $("#txtAddShelf").val();
		VgetSection = $("#txtAddSection").val();
		VgetPathway = $("#txtAddPathway").val();
		VgetFloor = $("#txtAddFloor").val();
		VgetBuilding = $("#txtAddBuilding").val();
		VgetLocationType = $("#ddlLocationType option:selected").text();
		VgetZoneLocation = $("#ddlZoneLocation option:selected").text();
		//VGetCapacity = $("#ddlCapacitywarehouse_ option:selected").text();
	}
	else {
		VGetArealength = $("#txtEditAreaValue1").val();
		VGetAreaWidth = $("#txtEditAreaValue2").val();
		getLength = $("#txtEditCubicValue1").val();
		getWidth = $("#txtEditCubicValue2").val();
		getHeight = $("#txtEditCubicValue3").val();
		getNumber = $("#txtEditNumber3").val();
		getLiter = $("#txtEditLiter").val();
		VgetLocationcode = $("#txtEditLocationcode").val();
		VgetShelf = $("#txtEditShelf").val();
		VgetSection = $("#txtEditSection").val();
		VgetPathway = $("#txtEditPathway").val();
		VgetFloor = $("#txtEditFloor").val();
		VgetBuilding = $("#txtEditBuilding").val();
		VgetLocationType = $("#ddlLocationType" + validtLocID + " option:selected").text();
		VgetZoneLocation = $("#ddlZoneLocation" + validtLocID + " option:selected").text();
	}

	if (VgetLocationType == "--Select List--") {
		alert("Please Select Location Type!");
		return false;
	}
	else if (VgetZoneLocation == "--Select List--") {
		alert("Please Select Zone Location!");
		return false;
	}
	else if (getCapacityText == "" || getCapacityText == "--Select List--") {
		alert("Please Select Capacity In!");
		return false;
	}

	else if (VgetLocationcode == "") {
		alert("Please add Location Code!");
		return false;
	}
	else if (VgetShelf == "") {
		alert("Please add Shelf!");
		return false;
	}
	else if (VgetSection == "") {
		alert("Please add Section!");
		return false;
	}
	else if (VgetPathway == "") {
		alert("Please add Pathway!");
		return false;
	}
	else if (VgetFloor == "") {
		alert("Please add Floor!");
		return false;
	}
	else if (VgetBuilding == "") {
		alert("Please add Building!");
		return false;
	}

	if (getCapacityText == "Area(L x W)") {
		if (VGetArealength == "") {
			alert("Length can't be blank!");
			return false;
		}
		else if (VGetAreaWidth == "") {
			alert("Width can't be blank!");
			return false;
		}
	}
	if (getCapacityText == "Cubic Capacity(L x W x H)") {
		if (getLength == "") {
			alert("Length can't be blank!");
			return false;
		}
		else if (getWidth == "") {
			alert("Width can't be blank!");
			return false;
		}
		else if (getHeight == "") {
			alert("Height can't be blank!");
			return false;
		}
	}
	if (getCapacityText == "Number") {
		if (getNumber == "") {
			alert("Number value Can't be blank!");
			return false;
		}
	}
	if (getCapacityText == "Liter") {
		if (getLiter == "") {
			alert("Liter value Can't be blank!");
			return false;
		}
	}

	else {
		//saveWarehouse();
	}

}

function SearchlocationList() {
	debugger
	searchlocationfilter = $('#ddlsearchlocation').val();
	searchlocationvalue = $('#txtfilterLocation').val();

	if (searchlocationvalue == '' && searchlocationfilter != "") {
		alert('Please Enter value for filter');
	}
	else {
		WarehouseLocationList(strCurrentPage, searchlocationfilter, searchlocationvalue);
	}
	// if(searchlocationfilter=='' && searchlocationvalue=='')
	// {
	// 	WarehouseLocationList(getWarehouseEditId,searchlocationfilter,searchlocationvalue);
	// }
}



function getEditCapacity() {
	var getValue = $("#EditddlCapacity").val();
	if (getValue == "102") {
		$("#Editinput2").hide();
		$("#Editinput3").hide();
		$("#Editinput4").hide();
		$("#Editinput1").show();
	}
	if (getValue == "103") {
		$("#Editinput3").hide();
		$("#Editinput4").hide();
		$("#Editinput1").hide();
		$("#Editinput2").show();
	}
	if (getValue == "104") {

		$("#Editinput4").hide();
		$("#Editinput1").hide();
		$("#Editinput2").hide();
		$("#Editinput3").show();
	}
	if (getValue == "105") {
		$("#Editinput1").hide();
		$("#Editinput2").hide();
		$("#Editinput3").hide();
		$("#Editinput4").show();
	}
}

function ClearLocationfill() {
	$("#ddlLocationType").val('');
	$("#ddlZoneLocation").val('');
	$("#txtAddSortCode").val('');
	$("#txtAddLocationcode").val('');
	$("#txtAddShelf").val('');
	$("#txtAddSection").val('');
	$("#txtAddPathway").val('');
	$("#txtAddFloor").val('');
	$("#txtAddBuilding").val('');
	$("#ddlCapacity").val('');
	$("#txtAddAreaValue1").val('');
	$("#txtAddAreaValue2").val('');
	$("#txtAddNumber3").val('');
	$("#txtAddCubicValue1").val('');
	$("#txtAddCubicValue2").val('');
	$("#txtAddCubicValue3").val('');
	$("#txtLiter").val('');
	$("#txtAddNumber3").val('');
}
function isNumber(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}

function ValidateWarehouse() {
	debugger;
	var getWarehouseCode = $("#txtWarehouseCode").val();
	var getWarehouseName = $("#txtWarehouseName").val();
	var getWarehouseType = $("#txtWarehouseType").val();

	if (getWarehouseCode == "") {
		alert("Warehouse Code can't be blank!");

	}
	else if (getWarehouseName == "") {
		alert("Warehouse Name can't be blank!");

	}
	else if (getWarehouseType == "") {
		alert("Warehouse Type can't be blank!");
	}

	else {
		saveWarehouse();
	}

}

//start contact address code

function openWareContactPopUp(selectedWareHouseid) {
	$('#wms-srv-contact-popup-Warehouse').show();
	// print_country('ddlAddCountry');
	$('#wms-srv-contact-Warehouse-popup-close').off();
	$('#wms-srv-contact-Warehouse-popup-close').click(function () {
		$('#wms-srv-contact-popup-Warehouse').hide();

	});
	globalwarehouseid = selectedWareHouseid;
	WarehouseContactList(selectedWareHouseid);
}

function gridEditContactHide(ContactID, ContWarehouseID) {
	$("#ParameterRow" + ContactID).html('');
	WarehouseContactList(ContWarehouseID);
}

function WarehouseContactList(CntWarehouseID) {
	debugger;
	var beforeSVcontactid = 0;
	var apiPath = wmsApiPath + 'Contact/ContactList';
	var postData =
	{
		"CurrentPage": "1",
		"RecordLimit": "10",
		"CompanyId": companyID,
		"UserId": userid,
		"CustomerId": CustomerId,
		"WarehouseId": CntWarehouseID,// ddlGlobalWarehouseID,
		"Filter": "0",
		"Search": "0",
		"Object": "Warehouse",
		"ObjectId": CntWarehouseID
	}
	callHttpUrl(apiPath, postData, function (data) {
		var getStatus = data.Status;
		if (getStatus == 200) {
			debugger;
			var gridList = data.Result;
			$("#WareHousecontactgrid").html();
			var gridTable = "";

			// HTML Grid Table Header Bind
			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width:115px;text-align: center;">Contact Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Email id</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Mobile no</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Address</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Country</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">State</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">City</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Postal code</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Active</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
			gridTable = gridTable + '</div>';

			gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcontactname" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtemailid" onblur="validatevlEmailAddress(this,0)" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtmobileno" onkeypress="return isNumber(event)" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddress" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcountry" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtstate" class="wms-srv-grid-cell-input"></div>';
			//  gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlAddCountry" onchange="print_state('+ddlState+' ,this.selectedIndex);" ><option value="">-- Select --</option><option value=""></option></select></div>';
			//  gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlState"><option value="">-- Select --</option><option value="State"></option></select></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcity" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtpostalcode" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell">';
			gridTable = gridTable + '<input class="wms-srv-grid-cell-input" type="checkbox" id="myclientCheck1" checked="True" value=""></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell">';
			gridTable = gridTable + '<div class="wms-srv-grid-action">';
			gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveWareContAddress(' + CntWarehouseID + ',' + beforeSVcontactid + ');"><i class="fas fa-check-circle" style="color:black !important" ></i></a>';
			gridTable = gridTable + '</div>';
			gridTable = gridTable + '</div>';
			gridTable = gridTable + '</div>';

			for (var i = 0; i < gridList.Table.length; i++) {
				var getContactID = gridList.Table[i].ID;
				var getContactName = gridList.Table[i].ContactName;
				var getEmailId = gridList.Table[i].EmailID;
				var getMobileNo = gridList.Table[i].MobileNo;
				var getAddress = gridList.Table[i].Address;
				var getCountry = gridList.Table[i].Country;
				var getState = gridList.Table[i].State;
				var getCity = gridList.Table[i].City;
				var getPostalCode = gridList.Table[i].PostalCode;
				var getActive = gridList.Table[i].Active;
				// var getAction = gridList.Table.Action;

				//  GRID ROW

				gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="ParameterRow' + getContactID + '">';
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getContactName + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getEmailId + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getMobileNo + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAddress + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCountry + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getState + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCity + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPostalCode + "</div>";
				// gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCountry + "</div>"
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActive + "</div>"
				// gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAction + "</div>"
				gridTable = gridTable + '<div class="wms-srv-grid-cell">';
				gridTable = gridTable + '<div class="wms-srv-grid-action">';
				gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ContactEditGrid(' + CntWarehouseID + ',' + getContactID + ',\'' + getContactName + '\',\'' + getEmailId + '\',\'' + getMobileNo + '\',\'' + getAddress + '\',\'' + getCountry + '\',\'' + getState + '\',\'' + getCity + '\',\'' + getPostalCode + '\',\'' + getActive + '\')";></i></a><div class="wms-srv-action-sep">|</div>';

				// gridTable = gridTable + '<i class="fas fa-edit" title="Edit" ></i></a><div class="wms-srv-action-sep">|</div>';
				// gridTable = gridTable + '<i class="fas fa-code" title="Parameter" ></i></a>  <div class="wms-srv-action-sep">|</div>';
				// gridTable = gridTable + '<i class="fas fa-user-plus" title="Contact Info" onclick="openContactPopUp();"></i></a>';

				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';

			}
			$("#WareHousecontactgrid").html(gridTable);
			// setupGridPagingwarehouse('paging-client', strCurrentPage, getTotalRecords, ClientList);
		}

	});
}

function SaveWareContAddress(WarehouseID, ContactID) {
	debugger;

	//var getClient = globalClientID;
	if (validateWarehusContact(ContactID) != false) {

		var apiPath = wmsApiPath + "Contact/SaveContact";
		var Active = 'No';
		// Add New Client
		if (ContactID == '0') {
			var getContactname = $("#txtcontactname").val();
			var getEmailID = $("#txtemailid").val();
			var getMobileNo = $("#txtmobileno").val();
			var getAddress = $("#txtAddress").val();
			var getCountry = $("#txtcountry").val();
			var getState = $("#txtstate").val();
			var getCity = $("#txtcity").val();
			var getPostalcode = $("#txtpostalcode").val();
			if ($('#myclientCheck1').is(':checked')) {
				Active = 'Yes';
			}
		}

		//Edit Existing Client
		else {
			var getContactname = $("#txteditcontactname").val();
			var getEmailID = $("#txteditemailid").val();
			var getMobileNo = $("#txteditmobileno").val();
			var getAddress = $("#editAddress").val();
			var getCountry = $("#txteditcountry").val();
			var getState = $("#txteditstate").val();
			var getCity = $("#txteditcity").val();
			var getPostalcode = $("#txteditpostalcode").val();
			if ($('#txtEditconactive').is(':checked')) {
				Active = 'Yes';
			}
		}

		var postData =
		{
			"ContactID": ContactID,
			"ObjectName": "Warehouse",
			"ReferenceID": WarehouseID,
			"ContactName": getContactname,
			"EmailID": getEmailID,
			"MobileNo": getMobileNo,
			"Address": getAddress,
			"Country": getCountry,
			"State": getState,
			"City": getCity,
			"PostalCode": getPostalcode,
			"Active": Active,
			"CompanyID": companyID,
			"CreatedBy": userid
		};

		callHttpUrl(apiPath, postData, function (data) {
			var getstatuscode = data.StatusCode;
			var isSuccess = data.Status;
			var getresult = data.Result;
			if (isSuccess == 200) {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					if (ContactID == '0') {
						alert('Contact Saved Successfully!!');
					}
					else {
						alert('Contact Updated Successfully!!');
					}
					WarehouseContactList(WarehouseID);
				}
				else {
					alert(returnmsg);
				}
			}
			else if (isSuccess == "300") {
				var returnmsg = getresult.Message;
				alert(returnmsg);
			}
			else {
				alert("Contact Save failed");
			}
		});
	}

}

function ContactEditGrid(getWarehouseID, ContactID, getContactName, getEmailId, getMobileNo, getAddress, getCountry, getState, getCity, getPostalCode, getActive) {
	debugger;
	var gridRow = '';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcontactname" class="wms-srv-grid-cell-input" value="' + getContactName + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditemailid" onblur="validatevlEmailAddress(this,\'' + getEmailId + '\'" class="wms-srv-grid-cell-input" value="' + getEmailId + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditmobileno" onkeypress="return isNumber(event)" class="wms-srv-grid-cell-input" value="' + getMobileNo + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="editAddress" class="wms-srv-grid-cell-input" value="' + getAddress + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcountry" class="wms-srv-grid-cell-input" value="' + getCountry + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditstate" class="wms-srv-grid-cell-input" value="' + getState + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcity" class="wms-srv-grid-cell-input" value="' + getCity + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditpostalcode" class="wms-srv-grid-cell-input" value="' + getPostalCode + '" /></div>';

	if (getActive == 'Yes') {
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditconactive" class="wms-srv-grid-cell-input" value="' + getActive + '" checked="checked" /></div>';
	} else {
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditconactive" class="wms-srv-grid-cell-input" value="' + getActive + '" /></div>';
	}

	gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
	gridRow = gridRow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"> <i class="fas fa-check-circle" id="SaveCustParameter" onclick="SaveWareContAddress(' + getWarehouseID + ',' + ContactID + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditContactHide(' + ContactID + ',' + getWarehouseID + ')"></i></a></div></div>';

	$("#ParameterRow" + ContactID).html(gridRow);
}

function validateWarehusContact(ContactID) {
	if (ContactID == "0") {
		if (document.getElementById("txtcontactname").value == "") {
			alert("Please add Contact Name!");
			return false;
		}
		else if (document.getElementById("txtemailid").value == "") {
			alert("Please add EmailID!");
			return false;
		}
		else if (document.getElementById("txtAddress").value == "") {
			alert("Please add Address!");
			return false;
		}
	}
	else {
		if (document.getElementById("txteditcontactname").value == "") {
			alert("Please add Contact Name!");
			return false;
		}
		else if (document.getElementById("txteditemailid").value == "") {
			alert("Please add EmailID!");
			return false;
		}
		else if (document.getElementById("editAddress").value == "") {
			alert("Please add Address!");
			return false;
		}
	}
}

function validateWMEmailAddress(emailVal, EmailID) {
	debugger;

	var email = emailVal.value;
	var isEmailValid = true;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (email.match(mailformat)) {
		//isEmailValid = true;

	}
	else {
		// isEmailValid = false;
		alert("Enter correct email.");
		if (EmailID == "0") {
			$("#txtemailid").val('');
			$("#txtemailid").focus();
		}
		else {
			// $("#txtEditemailid").val('EmailID');
			$("#txteditemailid").val('');
			$("#txteditemailid").focus();

		}
	}
	//return isEmailValid;
}
//end contact address code


