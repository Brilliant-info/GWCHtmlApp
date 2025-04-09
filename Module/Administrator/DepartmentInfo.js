
var CompanyId = mBrillWmsSession.getCompanyId();
var UserId = mBrillWmsSession.getUserId();
var getUserName = mBrillWmsSession.getUserName();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getClientId = mBrillWmsSession.getClientId();
var getTotalRecords = 100;

function initDepartmentInfo() {
	departmentInfoList("1", "");
	$('.closeAddNew').click(function () {
		$('#wms-srv-addnew-popup').hide();
	});
}

function departmentInfoList(strCurrentPage, searchfilter, searchvalue) {
	var myGridList = "";
	debugger;
	
	apiPath = wmsApiPath + "Customer/GetDepartmentList"
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
	var apiPath = "StaticAPI/GetDepartmentList.json"
	var postData = null;
	/* STATIC API CODE */
	
	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
		if (getStatus == 200) {
			$("#departmentList").html('');

			var myGridList = data.Result.Table
			var gridTable = '';
			// GRID HEADER
			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Department Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Department</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Approval Level</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Auto Cancel</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Cancel Days</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">GWC Deliveries</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Ecommerce</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Fin Approver</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Address Type</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Prime Hours</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Express Hours</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Regular Hours</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
			gridTable = gridTable + '</div>';

			for (var i = 0; i < myGridList.length; i++) {
				var getID = myGridList[i].ID;
				var getDepartmentName = myGridList[i].DepartmentName;
				var getDepartment = myGridList[i].Department;
				var getCustomer = myGridList[i].Customer;
				var getApprovalLevel = myGridList[i].ApprovalLevel;
				var getAutoCancel = myGridList[i].AutoCancel;
				var getCancelDays = myGridList[i].CancelDays;
				var getGWCDeliveries = myGridList[i].GWCDeliveries;
				var getEcommerce = myGridList[i].Ecommerce;
				var getFinApprover = myGridList[i].FinApprover;
				var getAddressType = myGridList[i].AddressType;
				var getPrimeHours = myGridList[i].PrimeHours;
				var getExpressHours = myGridList[i].ExpressHours;
				var getRegularHours = myGridList[i].RegularHours;

				gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getDepartmentName + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getDepartment + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCustomer + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getApprovalLevel + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getAutoCancel + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCancelDays + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getGWCDeliveries + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getEcommerce + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getFinApprover + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getAddressType + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPrimeHours + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getExpressHours + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRegularHours + '</div>';
						
				gridTable = gridTable + '<div class="wms-srv-grid-cell">';
				gridTable = gridTable + '<div class="wms-srv-grid-action">';
				gridTable = gridTable + '<i class="fas fa-edit" title="Customer Information" onclick="editDepartmentInfo(' + getID + ');"></i>';
				gridTable = gridTable + ' <div class="wms-srv-action-sep"> | </div> ';
				gridTable = gridTable + ' <i class="fas fa-credit-card" title="Delivery Contact" onclick="openDepartmentPaymentInfo(\'' + getID + '\');"></i>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
			}
			$('#departmentList').html(gridTable);
			setupGridPaging('checkCustomerListPager', strCurrentPage, RecordLimit, departmentInfoList);
		}
		else {
			alert("Record not found!!");
		}
	});
}
function openAddNewDepartmentPopup() {
	$('#ddlDeptCustomerName').val('');
	$('#txtDeptName').val('');
	$('#txtDepartmentCode').val('');
	$('#txtDeptApprovalLevel').val('');
	$('#ddlDeptAutoCancel').val('');
	$('#txtDeptAutoCancellationDays').val('');
	$('#txtDeptReminderSchedule').val('');
	$('#txtDeptMaxDeliveryDays').val('');
	$('#txtDeptNormalOrder').val('');
	$('#txtDeptPreOrder').val('');
	$('#txtDeptExpiryDate').val('');

	$('#wms-srv-department-edit-popup').show();
	$('#wms-srv-department-edit-popup-close').off();
	$('#wms-srv-department-edit-popup-close').click(function () {
		$('#wms-srv-department-edit-popup').hide();
	});
}
function editDepartmentInfo(recId) {
	$('#ddlDeptCustomerName').val('Vodafone Technical');
	$('#txtDeptName').val('Vodafone Fixed Active Equipment');
	$('#txtDepartmentCode').val('VF5264FAE');
	$('#txtDeptApprovalLevel').val('1');
	$('#ddlDeptAutoCancel').val('Yes');
	$('#txtDeptAutoCancellationDays').val('7');
	$('#txtDeptReminderSchedule').val('0');
	$('#txtDeptMaxDeliveryDays').val('10');
	$('#txtDeptNormalOrder').val('0');
	$('#txtDeptPreOrder').val('0');
	$('#txtDeptExpiryDate').val('0');

	$('#wms-srv-department-edit-popup').show();
	$('#wms-srv-department-edit-popup-close').off();
	$('#wms-srv-department-edit-popup-close').click(function () {
		$('#wms-srv-department-edit-popup').hide();
	});
}

function departmentPaymentMethodList(strCurrentPage, searchfilter, searchvalue) {
	var myGridList = "";
	debugger;

	apiPath = wmsApiPath + "Customer/GetDepartmentList"
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
	var apiPath = "StaticAPI/GetDepartmentPaymentMethodList.json"
	var postData = null;
	/* STATIC API CODE */

	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
		if (getStatus == 200) {
			$("#departmentPaymentMethodList").html('');

			var myGridList = data.Result.Table
			var gridTable = '';
			// GRID HEADER
			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Method Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Sequence</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
			gridTable = gridTable + '</div>';

			for (var i = 0; i < myGridList.length; i++) {
				var getID = myGridList[i].ID;
				var getPaymentMethodName = myGridList[i].PaymentMethodName;
				var getPaymentSequence = myGridList[i].PaymentSequence;

				gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPaymentMethodName + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPaymentSequence + '</div>';

				gridTable = gridTable + '<div class="wms-srv-grid-cell">';
				gridTable = gridTable + '<div class="wms-srv-grid-action">';
				gridTable = gridTable + '<i class="fas fa-trash" title="Remove Payment Method" onclick="removePaymentInfo(' + getID + ');"></i>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
			}
			$('#departmentPaymentMethodList').html(gridTable);
			setupGridPaging('checkCustomerListPager', strCurrentPage, RecordLimit, departmentInfoList);
		}
		else {
			alert("Record not found!!");
		}
	});
}

function openDepartmentPaymentInfo(recId) {
	departmentPaymentMethodList("1","");
	$('#wms-srv-department-payment-popup').show();
	$('#wms-srv-department-payment-popup-close').off();
	$('#wms-srv-department-payment-popup-close').click(function () {
		$('#wms-srv-department-payment-popup').hide();
	});
}

function getAllPaymentMethodList(strCurrentPage, searchfilter, searchvalue) {
	var myGridList = "";
	debugger;

	apiPath = wmsApiPath + "Customer/GetDepartmentList"
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
	var apiPath = "StaticAPI/GetDepartmentPaymentMethodList.json"
	var postData = null;
	/* STATIC API CODE */

	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
		if (getStatus == 200) {
			$("#allPaymentMethodList").html('');

			var myGridList = data.Result.Table
			var gridTable = '';
			// GRID HEADER
			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="checkbox" /></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Method Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Sequence</div>';
			gridTable = gridTable + '</div>';

			for (var i = 0; i < myGridList.length; i++) {
				var getID = myGridList[i].ID;
				var getPaymentMethodName = myGridList[i].PaymentMethodName;
				var getPaymentSequence = myGridList[i].PaymentSequence;

				gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" /></div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPaymentMethodName + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPaymentSequence + '</div>';

				gridTable = gridTable + '</div>';
			}
			$('#allPaymentMethodList').html(gridTable);
			setupGridPaging('checkCustomerListPager', strCurrentPage, RecordLimit, departmentInfoList);
		}
		else {
			alert("Record not found!!");
		}
	});
}

function openAllPaymentMethodsPopup(recId) {
	getAllPaymentMethodList("1", "");
	$('#wms-srv-all-paymentlist-popup').show();
	$('#wms-srv-all-paymentlist-popup-close').off();
	$('#wms-srv-all-paymentlist-popup-close').click(function () {
		$('#wms-srv-all-paymentlist-popup').hide();
	});
}