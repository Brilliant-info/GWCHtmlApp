
var CompanyId = mBrillWmsSession.getCompanyId();
var UserId = mBrillWmsSession.getUserId();
var getUserName = mBrillWmsSession.getUserName();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getClientId = mBrillWmsSession.getClientId();
var getTotalRecords = 100;

function initCustomerMaster() {
	customerList("1", "");
	$('.closeAddNew').click(function () {
		$('#wms-srv-addnew-popup').hide();
	});
}

function customerList(strCurrentPage, searchfilter, searchvalue) {
	var myGridList = "";
	debugger;
	
	apiPath = wmsApiPath + "Customer/GetCustomerList"
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
	var apiPath = "StaticAPI/GetCustomerList.json"
	var postData = null;
	/* STATIC API CODE */
	
	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
		if (getStatus == 200) {
			$("#customerList").html('');

			var myGridList = data.Result.Table
			var gridTable = '';
			// GRID HEADER
			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Address Line 1</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">City</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="width:215px;text-align: center;">Phone No</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Email ID</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Action</div>';
			gridTable = gridTable + '</div>';

			for (var i = 0; i < myGridList.length; i++) {
				var getCustomerID = myGridList[i].ID;
				var getName = myGridList[i].custmoreName;
				var getAddress = myGridList[i].Address;
				var getCity = myGridList[i].City;
				var getPhoneNo = myGridList[i].PhoneNo;
				var getEmailID = myGridList[i].EmailID;

				gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getName + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getAddress + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCity + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPhoneNo + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getEmailID + '</div>';
						
				gridTable = gridTable + '<div class="wms-srv-grid-cell">';
				gridTable = gridTable + '<div class="wms-srv-grid-action">';
				gridTable = gridTable + '<i class="fas fa-edit" title="Customer Information" onclick="editCustomerInfo(' + getCustomerID + ');"></i>';
				gridTable = gridTable + ' <div class="wms-srv-action-sep"> | </div> ';
				gridTable = gridTable + ' <i class="fas fa-address-book" title="Delivery Contact" onclick="openDeliveryContact(\'' + getCustomerID + '\',\'' + getName + '\',\'' + searchFilter + '\');"></i>';
				gridTable = gridTable + ' <div class="wms-srv-action-sep"> | </div> ';
				gridTable = gridTable + ' <i class="fas fa-solid fa-truck" title="Delivery Address" onclick="openDeliveryAddress(\'' + getCustomerID + '\');"></i>';
								
				gridTable = gridTable + ' <div class="wms-srv-action-sep"> | </div> ';
				gridTable = gridTable + ' <i class="fas fa-receipt" title="Cost Center" onclick="openCostCenter(\'' + getCustomerID + '\');"></i>';
				
				gridTable = gridTable + ' <div class="wms-srv-action-sep"> | </div> ';
				gridTable = gridTable + ' <i class="fas fa-upload" title="SFTP Details" onclick="openSftpDetails(\'' + getCustomerID + '\');"></i>';
				
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
			}
			$('#customerList').html(gridTable);
			setupGridPaging('checkCustomerListPager', strCurrentPage, RecordLimit, customerList);
		}
		else {
			alert("Record not found!!");
		}
	});
}
function openAddNewCustomerPopup() {
	$('#txtEditCustomerName').val('');
	$('#txtEditWebsite').val('');
	$('#txtEditEmailId').val('');
	$('#ddlEditCountry').val('');
	$('#ddlEditState').val('');
	$('#ddlEditCity').val('');
	$('#txtEditAddressLine1').val('');
	$('#txtEditZipCode').val('');
	$('#txtEditLandmark').val('');
	$('#txtEditPhoneNo').val('');
	$('#txtEditFaxNo').val('');
	$('#txtEditOrderNoPrefix').val('');
	$('#txtEditOrderNoFormat').val('');
	$('#txtEditSourceEmail').val('');

	$('#wms-srv-customer-edit-popup').show();
	$('#wms-srv-customer-edit-popup-close').off();
	$('#wms-srv-customer-edit-popup-close').click(function () {
		$('#wms-srv-customer-edit-popup').hide();
	});
}
function editCustomerInfo(customerId) {
	$('#txtEditCustomerName').val('Ketan Kulkarni');
	$('#txtEditWebsite').val('');
	$('#txtEditEmailId').val('ketan@gwclogistics.com');
	$('#ddlEditCountry').val('India');
	$('#ddlEditState').val('Maharashtra');
	$('#ddlEditCity').val('Pune');
	$('#txtEditAddressLine1').val('D RING ROAD - DOHA, QATAR P.O BOX : 24434');
	$('#txtEditZipCode').val('411001');
	$('#txtEditLandmark').val('Near Khandoba Mandir');
	$('#txtEditPhoneNo').val('020-2236556');
	$('#txtEditFaxNo').val('020-66332115');
	$('#txtEditOrderNoPrefix').val('ELS');
	$('#txtEditOrderNoFormat').val('0000001');
	$('#txtEditSourceEmail').val('support@gwclogistics.com');

	$('#wms-srv-customer-edit-popup').show();
	$('#wms-srv-customer-edit-popup-close').off();
	$('#wms-srv-customer-edit-popup-close').click(function () {
		$('#wms-srv-customer-edit-popup').hide();
	});
}
function openDeliveryContact(customerId) {
	$('#wms-srv-delivery-contact-popup').show();
	$('#wms-srv-delivery-contact-popup-close').off();
	$('#wms-srv-delivery-contact-popup-close').click(function () {
		$('#wms-srv-delivery-contact-popup').hide();
	});
}
function openDeliveryAddress(customerId) {
	$('#wms-srv-delivery-address-popup').show();
	$('#wms-srv-delivery-address-popup-close').off();
	$('#wms-srv-delivery-address-popup-close').click(function () {
		$('#wms-srv-delivery-address-popup').hide();
	});
}

function openCostCenter(customerId) {
	$('#wms-srv-cost-center-popup').show();
	$('#wms-srv-cost-center-popup-close').off();
	$('#wms-srv-cost-center-popup-close').click(function () {
		$('#wms-srv-cost-center-popup').hide();
	});
}

function openSftpDetails(customerId) {
	$('#wms-srv-sftp-details-popup').show();
	$('#wms-srv-sftp-details-popup-close').off();
	$('#wms-srv-sftp-details-popup-close').click(function () {
		$('#wms-srv-sftp-details-popup').hide();
	});
}
