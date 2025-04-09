
var CompanyId = mBrillWmsSession.getCompanyId();
var UserId = mBrillWmsSession.getUserId();
var getUserName = mBrillWmsSession.getUserName();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getClientId = mBrillWmsSession.getClientId();
var getTotalRecords = 100;

function initEmailConfiguration() {
	emailTemplateList("1", "");
	$('.closeAddNew').click(function () {
		$('#wms-srv-addnew-popup').hide();
	});
}

function emailTemplateList(strCurrentPage, searchfilter, searchvalue) {
	var myGridList = "";
	debugger;
	
	apiPath = wmsApiPath + "Customer/GetEmailTemplateList"
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
		RecordLimit: getTotalRecords,
		CompanyId: CompanyId,
		UserId: UserId,
		Search: searchfilter,
		Filter: searchvalue
	};
	
	/* STATIC API CODE */
	var apiPath = "StaticAPI/GetEmailTemplateList.json"
	var postData = null;
	/* STATIC API CODE */
	
	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
		if (getStatus == 200) {
			$("#emailTemplateList").html('');

			var myGridList = data.Result.Table
			var gridTable = '';
			// GRID HEADER
			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Template Title</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Department</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="width:215px;text-align: center;">Activity</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Action</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Active</div>';
			gridTable = gridTable + '</div>';

			for (var i = 0; i < myGridList.length; i++) {
				var getID = myGridList[i].ID;
				var getTemplateTitle = myGridList[i].TemplateTitle;
				var getCustomer = myGridList[i].Customer;
				var getDepartment = myGridList[i].Department;
				var getActivity = myGridList[i].Activity;
				var getIsActive = myGridList[i].IsActive;

				gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getTemplateTitle + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCustomer + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getDepartment + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getActivity + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getIsActive + '</div>';
						
				gridTable = gridTable + '<div class="wms-srv-grid-cell">';
				gridTable = gridTable + '<div class="wms-srv-grid-action">';
				gridTable = gridTable + '<i class="fas fa-edit" title="Email Template" onclick="editEmailTemplate(' + getID + ');"></i>';
				gridTable = gridTable + ' <div class="wms-srv-action-sep"> | </div> ';
				gridTable = gridTable + ' <i class="fas fa-address-book" title="Additional Distribution" onclick="openAdditionalDistribution(\'' + getID + '\');"></i>';
				
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
			}
			$('#emailTemplateList').html(gridTable);
			setupGridPaging('checkCustomerListPager', strCurrentPage, RecordLimit, customerList);
		}
		else {
			alert("Record not found!!");
		}
	});
}
function editEmailTemplate() {
	$('#wms-srv-email-template-popup').show();
	$('#wms-srv-email-template-popup-close').off();
	$('#wms-srv-email-template-popup-close').click(function () {
		$('#wms-srv-email-template-popup').hide();
	});
}
function openAdditionalDistribution(getId) {
	$('#wms-srv-additional-distribution-popup').show();
	$('#wms-srv-additional-distribution-popup-close').off();
	$('#wms-srv-additional-distribution-popup-close').click(function () {
		$('#wms-srv-additional-distribution-popup').hide();
	});
}

function openAllDistributionList() {
	$('#wms-srv-all-distribution-popup').show();
	$('#wms-srv-all-distribution-popup-close').off();
	$('#wms-srv-all-distribution-popup-close').click(function () {
		$('#wms-srv-all-distribution-popup').hide();
	});
}

function btnAddSelectedDistribution() {
	$('#wms-srv-all-distribution-popup').hide();
}