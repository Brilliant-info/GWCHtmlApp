
var CompanyId = '1';
var UserId = '1';

var CompanyId = mBrillWmsSession.getCompanyId();
var UserId = mBrillWmsSession.getUserId();
var getCustomerID = mBrillWmsSession.getCustomerId();
//var warehouseID = '2216';
var warehouseID = $('#ddlwarehouse').val();
var UserDoct = '';
var NewUserID = '0';
var strCurrentPage = '1'; //use variable
var getTotalRecords = '10'; //use variable 
var searchfilter = '0'; //use variable
var searchvalue = '0'; //use variable
var globalCustomerId = '0'; //use variable
var EditCustomerId = '0';     //use variable
//var getCustomerID = '';
var ObjectName = "CustomerDocument"; //use variable
var GetNewProduct = 'newProduct';
var GetValueType = 'Int';
var getParaValue = '25';
var getActiveVal = 'Y';
var addCountry = '';
var addCountry = $('#ddlAddCountry').val(); //use variable
var GetCustomer = 'Customer';
var objWarehouse = 'searchwarehouse'; //use variable

var DocumentwarehouseID = '11375';
var globalDocumentFilePath = ''; //use variable
var globalDocumentFileType = ''; //use variable
var globalLogoPath = '';
var myGridList = '';
var CustomerNameReload = ''
var CustomerCodeReload = ''
var GlobalDownloadPath = '';

var EditCompanyId = '';

var emailConfigId = '0';

var getEmailOTP = '';
var getCustomerValue = '';
var getVerifiedOTP = '';


function initCompanyMaster() {
	companyList(strCurrentPage, searchfilter);

	$('.closeAddNew').click(function () {
		$('#wms-srv-addnew-popup').hide();
	});
}
function setCountry(country, state) {
	var ddlCountry = document.getElementById("ddlCountry");

	ddlCountry.value = country;

	print_state('ddlState', ddlCountry.selectedIndex);

	ddlState = document.getElementById("ddlState");
	ddlState.value = state;

}
function isNumber(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}
function openAddnewPopupCompany() {
	debugger;
	EditCompanyId = 0;
	$('#wms-srv-addnew-popup-Company-open').show();
	print_country('ddlComAddCountry');
	//var imagepath = $("#imgCustomerLogo").val();
	$('#wms-srv-addnew-popup-Company-Close').off();
	$('#wms-srv-addnew-popup-Company-Close').click(function () {
		$('#wms-srv-addnew-popup-Company-open').hide();
	});
}
function openeditPopupCompany() {
	debugger;

	$('#wms-srv-addnew-popup-Company-open').show();
	print_country('ddlComAddCountry');
	//var imagepath = $("#imgCustomerLogo").val();
	$('#wms-srv-addnew-popup-Company-Close').off();
	$('#wms-srv-addnew-popup-Company-Close').click(function () {
		$('#wms-srv-addnew-popup-Company-open').hide();
	});
}
function companyList(strCurrentPage, searchfilter, searchvalue) {
	var myGridList = "";
	debugger;
	//var apiPath = wmsApiPath + 'Customer/GetCustomerList';
	//apiPath = wmsApiPath + "Company/GetCompanyList"
	//var apiPath = "http://localhost:50068/api/staging/v1/Company/GetCompanyList"
	var apiPath = wmsApiPath + 'Company/GetCompanyList';
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
	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
		if (getStatus == 200) {
			$("#companyList").html('');

			var myGridList = data.Result.Table


			var gridTable = '';
			// GRID HEADER
			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Company Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Company Website</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Address</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="width:215px;text-align: center;">City</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Phone No</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Email ID</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Active</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Action</div>';
			gridTable = gridTable + '</div>';

			for (var i = 0; i < myGridList.length; i++) {
				var getCustomerID = myGridList[i].ID;
				var getName = myGridList[i].CompanyName;
				var getCustomerCode = myGridList[i].CompanyWebsite;
				var getAddress = myGridList[i].Address;
				var getCity = myGridList[i].City;
				var getPhoneNo = myGridList[i].PhoneNo;
				var getEmailID = myGridList[i].EmailID;
				var getActive = myGridList[i].Active;

				/*			if(getActive == "Yes")
						{		
							var stsActive  = 'Yes';				
						}
						else{
							var stsActive  ='No';
						}		*/

				gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getName + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCustomerCode + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getAddress + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCity + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPhoneNo + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getEmailID + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getActive + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell">';
				gridTable = gridTable + '<div class="wms-srv-grid-action">';
				gridTable = gridTable + '<i class="fas fa-edit" title="Company Info" onclick="EditCompany(' + getCustomerID + ');"></i>';
				gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
				gridTable = gridTable + ' <i class="fas fa-cogs" title="Configuration" onclick="openConfigPopup()"></i>';
				gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
				// gridTable = gridTable + '<i class="fas fa-holly-berry" title="Holiday" onclick="openholidayPopup(' + getCustomerID + ');"></i>';
				// gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
				// gridTable = gridTable + '<i class="fas fa-receipt" title="Bank Details" onclick="openBankDetailsPopUp(' + getCustomerID + ')"></i></a>';
				// gridTable = gridTable + '</i><div class="wms-srv-action-sep"> |</div>';
				// gridTable = gridTable + '<i class="fas fa-money-bill" title="GST" onclick="openGSTPopup(' + getCustomerID + ')">';
				// gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
				gridTable = gridTable + ' <i class="fas fa-receipt" title="Suspend / Discontinue" onclick="opensusdisopenPopup();"></i>';
				gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
				gridTable = gridTable + ' <i class="fas fa-file-invoice" title="Invoice" onclick="openInvoicePopup();"></i>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
			}
			$('#companyList').html(gridTable);
			setupGridPaging('checkCustomerListPager', strCurrentPage, RecordLimit, customerList);
		}
		else {

			alert("Record not found!!");
		}
	});
}

function openSubscriptionInvoiceDetails() {
	window.open('Invoice/Invoice.html');
}

function openInvoicePopup() {
	$('#wms-srv-popup-company-invoice').show();
	$('#wms-srv-popup-company-invoice-close').off();
	$('#wms-srv-popup-company-invoice-close').click(function () {
		$('#wms-srv-popup-company-invoice').hide();
	});
}

function openPaymentBookingPopup() {
	// alert('Open invoice.... !!!');
	$('#wms-srv-popup-payment-booking').show();
	$("#wms-srv-popup-payment-booking #txtPaymentDate").datepicker();
	$('#wms-srv-popup-payment-booking-close').off();
	$('#wms-srv-popup-payment-booking-close').click(function () {
		$("#wms-srv-popup-payment-booking #txtPaymentDate").datepicker("destroy");
		$('#wms-srv-popup-payment-booking').hide();
	});
}

function updatePendingBalance(obj) {
	var getPaymentAmount = $(obj).val();
	var getPendingAmount = 100000 - Number(getPaymentAmount);
	$('#spnInvPendingAmount').html(getPendingAmount);
}

function HideAddC() {
	$('#wms-srv-addnew-popup-Company-open').hide();
	companyList(strCurrentPage, searchfilter, searchvalue)
}
function AddCompany(ID) {
	debugger;
	if (ID != 0) {
		UseCompanyId = ID
	}
	if (validateCompany()) {
		//var LocalPath = "http://localhost:50068/api/staging/v1/Company/AddCompany"

		var apiPath = wmsApiPath + "Company/AddCompany"
		//var apiPath = LocalPath;
		var getCustomerName = $("#txtCompanyName").val();
		//var getCustomerCode = $("#txtCustomerCode").val();
		var getCountry = $("#ddlComAddCountry").val();
		var getState = $("#ddlComState").val();
		//print_state(getState, addCountry)
		var getCity = $("#txtCompanyCity").val();
		var getAddress = $("#txtCompanyAddress").val();
		var getZipCode = $("#txtCompanyZipcode").val().trim();
		var getLandmark = $("#txtCompanyLandMark").val().trim();
		var getPhoneNo = $("#txtCompanyPhoneNo").val().trim();
		var getEmailID = $("#txtCompanyEmailID").val().trim();
		var getWebsite = $("#txtCompanyWebsite").val().trim();
		var getActiveSts = $('input[name="checkgroup1"]:checked').val();

		if (getCity == '') {
			getCity = '-';
		}
		if (getAddress == '') {
			getAddress = '-';
		}
		if (getZipCode == '') {
			getZipCode = '-';
		}
		if (getLandmark == '') {
			getLandmark = '-';
		}
		if (getPhoneNo == '') {
			getPhoneNo = '-';
		}
		if (getEmailID == '') {
			getEmailID = '-';
		}
		if (getActiveSts == '') {
			getActiveSts = '-';
		}

		var postData =
		{
			CompanyId: EditCompanyId,
			UserId: UserId,
			CompanyName: getCustomerName,
			Country: getCountry,
			State: getState,
			City: getCity,
			Address: getAddress,
			Zipcode: getZipCode,
			Landmark: getLandmark,
			MobileNo: getPhoneNo,
			EmailID: getEmailID,
			Website: getWebsite,
			Active: getActiveSts,
			logopath: GlobalDownloadPath,
			logo: '0'
		};
		callHttpUrl(apiPath, postData, function (result) {
			var isSuccess = result.Status;

			if (isSuccess == 200) {
				if (EditCompanyId == 0) {
					alert('Details Saved Successfully!!');
					$('#wms-srv-addnew-popup-Company-open').hide();
					companyList(strCurrentPage, searchfilter, searchvalue)
					clearAddCompany();
				}
				else {
					alert('Details Updated  Successfully !!');
					$('#wms-srv-addnew-popup-Company-open').hide();
					companyList(strCurrentPage, searchfilter, searchvalue)
					clearAddCompany();
				}


				$('#wms-srv-addnew-popup-Company-close').click(function () {
					//clearAddCompany();
					$('#wms-srv-addnew-popup-Company-open').hide();

				});

				//EditCustomer(0);
				//globalLogoPath = '';
				//document.getElementById("imgCustomerLogo").src = "data:image/png;base64," + getLogoByte;
			}
			else {
				if (isSuccess == 300) {
					alert('Error occured');
					//companyList(strCurrentPage, searchfilter, searchvalue)
					//clearAddCompany();
					$('#wms-srv-addnew-popup-Company-open').hide();
				}
			}

		});
	}
}
function EditCompany(Cid) {
	debugger;
	openAddnewPopupCompany()
	var FIFO = 'First In First Out';
	var LILO = 'Last In First Out';
	var Manual = 'Manual';
	EditCompanyId = Cid;                     //Customer ID Editing
	//var apiPathlocal = 'http://localhost:50068/api/staging/v1/';
	//var apiPath = apiPathlocal + 'Company/Editcompany';
	var apiPath = wmsApiPath + 'Company/Editcompany';
	var postData = {
		UserId: UserId,
		CID: Cid
	};
	callHttpUrl(apiPath, postData, function (data) {
		var getStatus = data.Status;
		var getStatusCode = data.Code;
		if (getStatus == 200) {
			var myGridList = '';
			myGridList = data.Result;
			var Active = myGridList.Table[0].Active;
			//this is for test
			$("#txtCompanyName").val(data.Result.Table[0].Name);
			$("#ddlComAddCountry").val(myGridList.Table[0].Country);
			var getSelectedCountryIndex = document.getElementById('ddlComAddCountry').selectedIndex;
			print_state('ddlComState', getSelectedCountryIndex);

			$("#ddlComState").val(myGridList.Table[0].State);
			$("#txtCompanyCity").val(myGridList.Table[0].City);
			$("#txtCompanyAddress").val(myGridList.Table[0].Address);
			$("#txtCompanyZipcode").val(myGridList.Table[0].ZipCode);
			$("#txtCompanyLandMark").val(myGridList.Table[0].Landmark);
			$("#txtCompanyPhoneNo").val(myGridList.Table[0].PhoneNo);
			$("#txtCompanyEmailID").val(myGridList.Table[0].EmailID);
			$("#txtCompanyWebsite").val(myGridList.Table[0].WebSite);
			var getLogoPath = myGridList.Table[0].LogoPath
			var getLogoByte = myGridList.Table[0].Logo

			if (Active == 'Yes') {
				$('input:radio[id="CompanyInfoY"]:nth(0)').attr('checked', true);
			}
			else {
				$('input:radio[id="CompanyInfoN"]:nth(0)').attr('checked', false);
			}
			var Logopathed = wmsAppFiles + getLogoPath;
			document.getElementById("imgCompanyLogo").src = Logopathed; // "data:image/png;base64," + getLogoByte;
			globalLogoPath = getLogoPath;
			GlobalDownloadPath = getLogoPath;

		}

	});
}
function clearAddCompany() {
	debugger;
	$("#txtCompanyName").val('');
	$("#txtCompanyCode").val('');
	$("#ddlComAddCountry").val('');
	$("#ddlComState").val('');
	$("#txtCompanyCity").val('');
	$("#txtCompanyAddress").val('');
	$("#txtCompanyZipcode").val('');
	$("#txtCompanyLandMark").val('');
	$("#txtCompanyPhoneNo").val('');
	$("#txtCompanyEmailID").val('');
	$("#txtCompanyWebsite").val('');

	var Active = $('input[name="checkgroup1"]').val();
	var getImagePath = document.getElementById("imgCompanyLogo").removeAttribute('src');
	//getImagePath.removeAttribute();
	getImagePath = '';
	$('#wms-srv-addnew-popup-Company-open').hide();
	// $('#wms-srv-addnew-popup-Customer').hide();
	globalLogoPath = '';
	GlobalDownloadPath = '';
}
function validateCompany() {
	debugger;

	var getCustomerName = $("#txtCompanyName").val();
	var getCountry = $("#ddlComAddCountry").val();
	var getState = $("#ddlComState").val();
	var getCity = $("#txtCompanyCity").val();
	var txtCompanyPhoneNo = $("#txtCompanyPhoneNo").val();
	var getEmailID = $("#txtCompanyEmailID").val().trim();
	var getWebsite = $("#txtCompanyWebsite").val().trim();
	var getActiveSts = $('input[name="checkgroup1"]:checked').val();
	var mailformat = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (getCustomerName == "") {
		alert("Company Name can't be blank!");
		return false;
	}
	else if (getCountry == "0") {
		alert("Country can't be blank!");
		return false;
	}
	else if (getState == "0") {
		alert(" state can't be blank!");
		return false;
	}
	else if (getCity == "") {
		alert("City can't be blank!");
		return false;
	}
	else if (txtCompanyPhoneNo == "") {
		alert(" Phone No. can't be blank!");
		return false;
	}
	else if (getEmailID == "" || (!getEmailID.match(mailformat))) {
		alert("Not a Valid email address!");
		return false;
	}
	else if (getActiveSts == "") {
		alert(" Active can't be blank!");
		return false;
	}

	else if (GlobalDownloadPath == "") {
		alert("Please upload logo");
		return false;
	}
	else {
		return true;
	}


	// else if (globalLogoPath == ""){
	// 	alert(" FileUpload can't be blank!");
	// 	return false;
	// }		
}

function checkFileSize() {
	var isValidSize = true;
	var input = document.getElementById('wms-srv-ctrl-Company-file-upload');
	if (!input.files) { // This is VERY unlikely, browser support is near-universal
		alert("This browser doesn't seem to support the `files` property of file inputs.");
		isValidSize = false;
	} else if (!input.files[0]) {
		alert("Please select a file before clicking 'Load'");
		isValidSize = false;
	} else {
		var file = input.files[0];
		var getFileSizeInKB = Math.round(file.size / 1024);

		if (getFileSizeInKB <= 100000) {
			isValidSize = true;
		} else {
			alert("File size is " + getFileSizeInKB + " KB! It should not be more than 100 KB!");
			isValidSize = false;
		}
	}

	return isValidSize;
}
function isLocalDevelopement() {
	var apiRequestedUrl = location.href;
	var isLocalDev = "no";
	var getRefererUrlSub = apiRequestedUrl.substring(0, 17);
	if ((getRefererUrlSub == "http://localhost/") || (getRefererUrlSub == "http://localhost:")) {
		isLocalDev = "yes";
	}
	return isLocalDev;
}
function uploadCompanyLogo() {
	debugger;
	if (checkFileSize()) {
		var objType = 'CompanyLogo';
		//var apiPath = apiServer + 'Customer/UploadDocument';	
		var file = document.getElementById('wms-srv-ctrl-Company-file-upload').files[0];
		var frmFile = new FormData();
		frmFile.append(file.name, file);
		var currentFileName = file.name;
		// showWMSThemeLoading();
		var filterFileName = currentFileName.replace(' ', '_');

		//var localcustwmsapi = 'http://localhost:50068/api/staging/v1/';
		//var apiPath = localcustwmsapi + 'Customer/UploadLogo?uploadedfilename=' + filterFileName + '&objectname=' + objType + '';

		var apiPath = wmsApiPath + 'Customer/UploadLogo?uploadedfilename=' + filterFileName + '&objectname=' + objType + '';

		//  if (globalFileName.length < 2) {
		var isLocalDev = isLocalDevelopement();
		wmsApiRequestKey = mBrillWmsSession.getApiRequestKey();
		wmsApiAccessKey = mBrillWmsSession.getApiAccessKey();
		if (isLocalDev == "yes") {
			postData.apiRequestKey = wmsApiRequestKey;
			postData.apiAccessKey = wmsApiAccessKey;
		}

		$.ajax({
			url: apiPath,
			type: "POST",
			contentType: false,
			beforeSend: function (request) {
				if (isLocalDev != "yes") {
					request.setRequestHeader("api-request-key", wmsApiRequestKey);
					request.setRequestHeader("api-access-key", wmsApiAccessKey);
				}
				showWMSThemeLoading();
			},
			processData: false,
			data: frmFile,
			success: function (result) {
				debugger;
				var jsonObj = JSON.parse(result);
				//alert('Success')
				var getStatus = jsonObj["upload_result"][0].status;
				var getPath = jsonObj["upload_result"][0].path;
				var GetDownloadpath = jsonObj["upload_result"][0].DownloadPath;
				if (getStatus == 'success') {
					alert('File uploaded successfully!!');
					globalLogoPath = getPath;
					GlobalDownloadPath = GetDownloadpath;
					var UploadImagepath = wmsAppFiles + GetDownloadpath;
					var fileListHtml = '';
					$('#uploaded-file-LogoPathcmp').val(globalLogoPath);
					//	$('#imgCustomerLogo').val(globalLogoPath);
					$('#imgCompanyLogo').attr('src', UploadImagepath);
					//	$('#wmsAddUploadedImage').attr('src', UploadImagepath);


				} else {
					$('#wms-srv-ctrl-Company-file-upload').data('srvpath', '');
				}
				//alert(result);
				hideWMSThemeLoading();
			},
			error: function (err) {
				hideWMSThemeLoading();
				showWmsAlert('Error!!', err.statusText, 'error');
				//alert(err.statusText);
			}
		});
	}
}
//Configuration function prachi
function openConfigPopup() {
	$('#wms-srv-addnew-popup-Configuration-open').show();
	EmailConfigList();
	$('#wms-srv-Email-popup-Configuration-Close').click(function () {
		$('#wms-srv-addnew-popup-Configuration-open').hide();
	});
}

function OpenEmailOtpPopup() {
	if (ConfirmPasswordVal() == true) {
		EmailConfigSave();
		$('#Open-EmailOTP-Verifiaction-Popup').show();
		$('#Emailotp-Verification-popup-close').click(function () {
			$('#Open-EmailOTP-Verifiaction-Popup').hide();
		});
	}

}

function EmailConfigList() {
	var myGridList = "";
	debugger;

	//var apiPath = "http://localhost:50068/api/staging/v1/Company/EmailConfigList"
	var apiPath = wmsApiPath + 'Company/EmailConfigList';
	var postData =
	{

		CompanyId: CompanyId,
		UserId: UserId,
		CustomerId: getCustomerID,
		WarehouseId: warehouseID

	};
	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
		var popup = data.Result.Table;
		if (getStatus == 200) {

			//getAddWhatsup = popup[0].AddWhatsup;
			getDefaultsenderID = popup[0].DefaultsenderID;
			getProtocol = popup[0].Protocol;
			getHostname = popup[0].Hostname;
			getEmailPort = popup[0].EmailPort;
			getSecurityMode = popup[0].SecurityMode;
			getCustomerKey = popup[0].CustomerKey;
			getCustomerValue = popup[0].CustomerValue;
			getSecurityMode = popup[0].SecurityMode;
			getCustomerKey = popup[0].CustomerKey;

			$('#txtEmailConfigDefaultSendrId').val(getDefaultsenderID);
			$('#txtEmailConfigHostname').val(getHostname);
			$('#txtEmailConfigPort').val(getEmailPort);
			$('#txtEmailConfigCustomerKey').val(getCustomerKey);
			$('#txtEmailConfigCustomValue').val(getCustomerValue);
			$('#ddlEmailConfigProtocol').val(getProtocol);
			$('#ddlEmailConfigSecurityMode').val(getSecurityMode);

			//$('#txtEmailConfigPassword').val("dk")
		}
		else {

			alert("Record not found!!");
		}
	});
}
function EmailConfigSave() {
	debugger;
	//openConfigPopup();
	//var apiPath = "http://localhost:50068/api/staging/v1/Company/EmailConfigSave"
	var apiPath = wmsApiPath + 'Company/EmailConfigSave';
	// if (ID != 0) {
	// 	UseCompanyId = ID
	// }

	var getDefaultsenderID = $('#txtEmailConfigDefaultSendrId').val();
	var getProtocol = $('#ddlEmailConfigProtocol').val();
	var getHostName = $('#txtEmailConfigHostname').val();
	var getPort = $('#txtEmailConfigPort').val();
	var getSecurityMode = $('#ddlEmailConfigSecurityMode').val();
	var getCustomerKey = $('#txtEmailConfigCustomerKey').val();
	var getCustomValue = $('#txtEmailConfigCustomValue').val();
	var getPassword = $('#txtEmailConfigPassword').val();
	var getActiveECS = $("#chkEmailConfigAtive").is(":checked");


	if (getCustomValue == '') {
		getCustomValue = '-';
	}
	if (getDefaultsenderID == '') {
		getDefaultsenderID = '-';
	}
	// if (getProtocol == '') {
	// 	getProtocol = '-';
	// }
	if (getHostName == '') {
		getHostName = '-';
	}
	if (getPort == '') {
		getPort = '-';
	}
	// if (getSecurityMode == '') {
	// 	getSecurityMode = '-';
	// }
	if (getCustomerKey == '') {
		getCustomerKey = '-';
	}
	if (getCustomValue == '') {
		getCustomValue = '-';
	}
	if (getPassword == '') {
		getPassword = '-';
	}
	if (getActiveECS == '') {
		getActiveECS = '-';
	}
	if (getEmailOTP == '') {
		getEmailOTP = '-';
	}
	if (getVerifiedOTP == '') {
		getVerifiedOTP = '-';
	}

	var postData =
	{
		EmailConfigId: emailConfigId,
		CompanyId: CompanyId,
		CustomerId: getCustomerID,
		WarehouseId: warehouseID,
		UserId: UserId,
		DefaultsenderID: getDefaultsenderID,
		Protocol: getProtocol,
		Hostname: getHostName,
		EmailPort: getPort,
		SecurityMode: getSecurityMode,
		CustomerKey: getCustomerKey,
		CustomerValue: getCustomValue,
		EmailPassword: getPassword,
		Active: getActiveECS,
		EmailOTP: getEmailOTP,
		VerifiedOTP: getVerifiedOTP

	};

	callHttpUrl(apiPath, postData, function (result) {
		var isSuccess = result.Status;

		if (isSuccess == 200) {
			if (emailConfigId == 0) {
				alert('Details Saved Successfully!!');

			}
			else {
				alert('Details Updated  Successfully !!');

			}


			$('#wms-srv-Email-popup-Configuration-Close').click(function () {

				$('#wms-srv-addnew-popup-Configuration-open').hide();

			});

		}
		else {
			if (isSuccess == 400) {
				alert('Error occured');
			}
		}

	});
}

function ConfirmPasswordVal() {
	var password = $('#txtEmailConfigPassword').val();
	var ConPassword = $('#txtEmailConfigConfirmPassword').val();

	if (password != ConPassword) {
		alert('Password Did Not Match');
		$('txtEmailConfigConfirmPassword').val('');
		return false;
	}
	else {
		return true;
	}
}

function openCompanyConfigWizard(){
	EditCompanyId = 0;
	$('#wms-srv-popup-company-wizard').show();
	// print_country('ddlComAddCountry');
	//var imagepath = $("#imgCustomerLogo").val();
	$('#wms-srv-popup-company-wizard-close').off();
	$('#wms-srv-popup-company-wizard-close').click(function () {
		$('#wms-srv-popup-company-wizard').hide();
	});

	$('#btnWizardActivate').off();
	$('#btnWizardActivate').click(function () {
		$('#wms-srv-popup-company-wizard').hide();
	});
	
	$('#btnWizardPrevious').off();
	$('#btnWizardNext').off();
	$('#btnWizardPrevious').click(function(){
		wizardPreviousPage();
	});
	$('#btnWizardNext').click(function(){
		wizardNextPage();
	});
	
	currentWizardPageNo = 0;
	$('.pnlWizardPage').hide();
	$('.wizardProgressDot').removeClass('wizardActiveProgressDot');
	$('.wizardProgressDot[data-index="'+ currentWizardPageNo +'"]').addClass('wizardActiveProgressDot');
	$('#wizardPopupTitle').html(wizardPageTitle[currentWizardPageNo]);
	$('#wizardPopupIcon').attr('class', wizardPageIcon[currentWizardPageNo]);
	$('#' + wizardPages[currentWizardPageNo]).show();
	showHideWizardNextBackControl();
}
var currentWizardPageNo = 0;
var wizardPages = ["pnlWizCompanyInfo", "pnlWizPackage", "pnlWizBilling", "pnlWizWarehouse", "pnlWizCustomerAccount", "pnlWizUserAccount", "pnlWizFinishWizard"];

var wizardPageTitle = ["Company Information", "Select Package", "Billing Information", "Warehouse Configuration", "Customer Accounts", "User Accounts", "Completed"];

var wizardPageIcon = ["fas fa-building", "fas fa-cubes", "fas fa-file-invoice", "fas fa-warehouse", "fas fa-user-tie", "fas fa-users", "fas fa-clipboard-check"];

function showHideWizardNextBackControl(){
	if(currentWizardPageNo == 0){
		$('#btnWizardPrevious').css('opacity', '0.3');
		$('#btnWizardNext').css('opacity', '1');
		$('#btnWizardNext').show();
		$('#btnWizardActivate').hide();
		$('#pnlWizardProgess').show();
	}else if(currentWizardPageNo == (wizardPages.length - 1)){
		$('#btnWizardPrevious').css('opacity', '1');
		$('#btnWizardNext').css('opacity', '0.3');
		$('#btnWizardNext').hide();
		$('#btnWizardActivate').show();
		$('#pnlWizardProgess').hide();
	}else{
		$('#btnWizardPrevious').css('opacity', '1');
		$('#btnWizardNext').css('opacity', '1');
		$('#btnWizardNext').show();
		$('#btnWizardActivate').hide();
		$('#pnlWizardProgess').show();
	}
}

function wizardNextPage(){
	if(currentWizardPageNo < (wizardPages.length - 1)){
		currentWizardPageNo = currentWizardPageNo + 1;
		$('.pnlWizardPage').hide();
		$('#wizardPopupTitle').html(wizardPageTitle[currentWizardPageNo]);
		$('#wizardPopupIcon').attr('class', wizardPageIcon[currentWizardPageNo]);
		$('.wizardProgressDot').removeClass('wizardActiveProgressDot');
		for(var i=0; i<=currentWizardPageNo; i++){
			$('.wizardProgressDot[data-index="'+ i +'"]').addClass('wizardActiveProgressDot');
		}
		// $('.wizardProgressDot[data-index="'+ currentWizardPageNo +'"]').addClass('wizardActiveProgressDot');
		$('#' + wizardPages[currentWizardPageNo]).show();
	}
	showHideWizardNextBackControl();
}

function wizardPreviousPage(){
	if(currentWizardPageNo > 0){
		currentWizardPageNo = currentWizardPageNo - 1;
		$('.pnlWizardPage').hide();
		$('#wizardPopupTitle').html(wizardPageTitle[currentWizardPageNo]);
		$('#wizardPopupIcon').attr('class', wizardPageIcon[currentWizardPageNo]);
		$('.wizardProgressDot').removeClass('wizardActiveProgressDot');
		for(var i=0; i<=currentWizardPageNo; i++){
			$('.wizardProgressDot[data-index="'+ i +'"]').addClass('wizardActiveProgressDot');
		}
		// $('.wizardProgressDot[data-index="'+ currentWizardPageNo +'"]').addClass('wizardActiveProgressDot');
		$('#' + wizardPages[currentWizardPageNo]).show();
	}
	showHideWizardNextBackControl();
}

function wizardShowImportSection(fromPanelObj){
	$('#' + fromPanelObj).hide();
	$('#pnlWizImport').show();
}

function openholidayPopup(Id) {
	debugger;
	$('#wms-srv-holiday-popup').show();
	$('#wms-srv-holiday-popup-close').off();
	$('#wms-srv-holiday-popup-close').click(function () {
		$('#wms-srv-holiday-popup').hide();
	});
	GetholidayList(Id);
}

function GetholidayList(Id) {
	debugger;
	var apiPath = wmsApiPath + 'Company/GetholidayList';
	//var apiPath = 'http://localhost:50068/api/staging/v1/Company/GetholidayList'; 
	var postData =
	{
		ObjectType: "Company",
		ReferenceId: Id,
		CompanyID: CompanyId
	};

	callHttpUrl(apiPath, postData, function (data) {
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") {
			var GetResult = getresult.Table;
			var holidayparamGrid = "";

			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-header">';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Date</div>';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Description</div>';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Remark</div>';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
			holidayparamGrid = holidayparamGrid + '</div>';

			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-row wms-align">';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell">';
			holidayparamGrid = holidayparamGrid + '<input type="date" value="" class="wms-srv-grid-cell-input txtdateholiday" required id="txtDatevalue">';
			holidayparamGrid = holidayparamGrid + '</div>';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell">';
			holidayparamGrid = holidayparamGrid + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtdesc"></div>';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell">';
			holidayparamGrid = holidayparamGrid + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtremark"></div>';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell">';
			holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-action">';
			holidayparamGrid = holidayparamGrid + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="Saveholidaylist(' + Id + ');">';
			holidayparamGrid = holidayparamGrid + '<i class="fas fa-check-circle"></i></a></div></div>';
			holidayparamGrid = holidayparamGrid + '</div>';

			for (var li = 0; li < GetResult.length; li++) {
				var getID = GetResult[li].ID;
				var getDate = GetResult[li].Date;
				var getdescription = GetResult[li].description;
				var getRemark = GetResult[li].Remark;
				// var ObjectName = GetResult[li].ObjectName;


				holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-row wms-align">';
				holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getDate + '</div>';
				holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getdescription + '</div>';
				holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRemark + '</div>';
				holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-cell">';
				holidayparamGrid = holidayparamGrid + '<div class="wms-srv-grid-action">';
				holidayparamGrid = holidayparamGrid + '<a href="#" title="Edit" class="wms-srv-save" onclick=""></a>';
				holidayparamGrid = holidayparamGrid + '</div>';
				holidayparamGrid = holidayparamGrid + '</div>';
				holidayparamGrid = holidayparamGrid + '</div>';
			}
			$('#pnlholidaylist').html(holidayparamGrid);
			//BindddlClientParamName();
		}
		else {
			alert('Something went wrong.');
		}
	});

}



function Saveholidaylist(Id) {
	debugger;
	if (Validateholiday() != false) {

		var apiPath = wmsApiPath + 'Company/Saveholidaylist';
		//var apiPath = 'http://localhost:50068/api/staging/v1/Company/Saveholidaylist';


		var getDate = $("#txtDatevalue").val();
		var getdescription = $("#txtdesc").val();
		var getRemark = $("#txtremark").val();


		var postData =
		{
			"ObjectType": "Company",
			"ReferenceID": Id,
			"Date": getDate,
			"Description": getdescription,
			"Remark": getRemark,
			"CustomerId": getCustomerID,
			"CompanyId": CompanyId,
			"WarehouseId": warehouseID
		}

		callHttpUrl(apiPath, postData, function (data) {
			var getStatus = data.Status;
			if (getStatus == 200) {
				var myGridList = data.Result.Message;
				alert('Record Save Success!!');
				clearFilled();
				GetholidayList(Id);
			}
			else {
				alert('Unable to connect Server!!');
			}
		});
	}

}

function clearFilled() {
	$("#txtDatevalue").val('');
	$("#txtdesc").val('');
	$("#txtremark").val('');
}

function Validateholiday() {
	debugger;
	var getdescription = $("#txtdesc").val();
	var getRemark = $("#txtremark").val();

	if (getdescription == "") {
		alert("Description can't be blank!");
		return false;

	}
}


var globalClientID = '';
function openBankDetailsPopUp(selectedclientid) {
	$('#wms-srv-bankdetails-popup-client').show();
	$('#wms-srv-bankdetails-client-popup-close').off();
	$('#wms-srv-bankdetails-client-popup-close').click(function () {
		$('#wms-srv-bankdetails-popup-client').hide();

	});
	globalClientID = selectedclientid;
	BankDetailstList(selectedclientid);

}


function BankDetailstList(ClientID) {
	debugger;
	var beforeSVcontactid = 0;
	var apiPath = wmsApiPath + '/Client/GetBankDetails';
	//var apiPath =  'http://localhost:50068/api/staging/v1/Client/GetBankDetails';

	var postData =
	{

		"CompanyId": CompanyId,
		"UserId": UserId,
		"CustomerId": getCustomerID,
		"WarehouseId": warehouseID,
		"Object": "Company",
		"ClientId": ClientID
	}

	callHttpUrl(apiPath, postData, function (data) {
		debugger;
		var getStatus = data.Status;
		if (getStatus == 200) {
			var gridList = data.Result;
			$("#gridbind").html();
			var gridTable = "";

			// HTML Grid Table Header Bind
			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width:115px;text-align: center;">A/C Holder Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Bank Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Branch</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Credit Limit</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Credit Day</div>';
			// gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Account Number</div>';
			// gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">IFSC Code</div>';
			// gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Swift Code</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
			gridTable = gridTable + '</div>';

			gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtaccholdername" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtbankname" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtbranchname" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAccNumber" class="wms-srv-grid-cell-input"></div>';
			// gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAccNumber" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcreditday" class="wms-srv-grid-cell-input"></div>';
			// gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtswiftcode" class="wms-srv-grid-cell-input"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell">';
			gridTable = gridTable + '<div class="wms-srv-grid-action">';
			gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveBankDetails();"><i class="fas fa-check-circle" style="color:black !important" ></i></a>';
			gridTable = gridTable + '</div>';
			gridTable = gridTable + '</div>';
			gridTable = gridTable + '</div>';

			for (var i = 0; i < gridList.Table.length; i++) {
				var getID = gridList.Table[i].ID;
				var getHolderName = gridList.Table[i].HolderName;
				var getBankName = gridList.Table[i].BankName;
				var getBranchName = gridList.Table[i].BranchName;
				var getCreditLimit = gridList.Table[i].CreditLimit;
				var getCreditDay = gridList.Table[i].CreditDay;
				// var getAccountNo = gridList.Table[i].AccNumber;
				// var getIFSCCode = gridList.Table[i].IFSCCode;
				// var getSwiftCode = gridList.Table[i].SwiftCode;

				// var getAction = gridList.Table.Action;

				//  GRID ROW

				gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="ParameterRow' + getID + '">';
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getHolderName + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getBankName + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getBranchName + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCreditLimit + "</div>";
				gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCreditDay + "</div>";
				// gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAccountNo + "</div>";
				// gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getIFSCCode + "</div>";
				// gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSwiftCode + "</div>";
				gridTable = gridTable + '<div class="wms-srv-grid-cell">';
				gridTable = gridTable + '<div class="wms-srv-grid-action">';
				gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ContactEditBankDetailsGrid(' + getID + ',\'' + getHolderName + '\',\'' + getBankName + '\',\'' + getBranchName + '\',\'' + getCreditLimit + '\',\'' + getCreditDay + '\')";></i></a><div class="wms-srv-action-sep">|</div>';
				//gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ContactEditBankDetailsGrid('+ getID +',\'' + getHolderName + '\',\'' + getBankName + '\',\'' + getBranchName + '\',\'' + getAccountNo + '\',\'' + getIFSCCode + '\',\'' + getSwiftCode + '\')";></i></a><div class="wms-srv-action-sep">|</div>';

				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';
				gridTable = gridTable + '</div>';

			}
			$("#bankdetailsgridbind").html(gridTable);
		}
	});

}


function SaveBankDetails() {
	debugger;
	if (validatesaveBankDetails() != false) {
		var getClient = globalClientID;
		var apiPath = wmsApiPath + '/Client/SaveBankDetails';
		//var apiPath =  'http://localhost:50068/api/staging/v1/Client/SaveBankDetails';
		var getAccHolderName = $("#txtaccholdername").val();
		var getBankName = $("#txtbankname").val();
		var getBranchName = $("#txtbranchname").val();
		var getCreditlimit = $("#txtAccNumber").val();
		var getCreditday = $("#txtcreditday").val();
		//var getAccNumber = $("#txtAccNumber").val();
		//var getIfscCode = $("#txtifsccode").val();
		//var getSwiftCode = $("#txtswiftcode").val();

		/*var getAccHolderName = $(".txtaccholdername").val();
	var getBankName = $(".txtbankname").val();
	var getBranchName = $(".txtbranchname").val();
	var getAccNumber = $(".txtAccNumber").val();
	var getIfscCode = $(".txtifsccode").val();
	var getSwiftCode = $(".txtswiftcode").val();*/


		var postData =
		{
			"ObjectName": "Company",
			// "clientID": clientid,
			"clientID": getClient,
			"CompanyID": CompanyId,
			"UserId": UserId,
			"CustomerId": getCustomerID,
			"WarehouseId": warehouseID,
			"AccHolderName": getAccHolderName,
			"BankName": getBankName,
			"BranchName": getBranchName,
			"Creditlimit": getCreditlimit,
			"CreditDay": getCreditday
			// "AccNumber": getAccNumber,
			// "IfscCode": getIfscCode,
			// "SwiftCode": getSwiftCode
		};

		callHttpUrl(apiPath, postData, function (data) {
			debugger;
			var getstatuscode = data.StatusCode;
			var isSuccess = data.Status;
			var getresult = data.Result;
			if (isSuccess == 200) {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					alert('Bank Details Saved Successfully!!');
					$('#wms-srv-bankdetails-popup-client').hide();
					ClientList(strCurrentPage, 0, 0);
				}
				else {
					alert(returnmsg);
				}
			}
			else {
				alert("Bank Details Save failed");
			}
		});
	}

}

function validatesaveBankDetails() {
	debugger;
	/*var getAccHolderName = $(".txtaccholdername").val();
	var getBankName = $(".txtbankname").val();
	var getBranchName = $(".txtbranchname").val();
	var getAccNumber = $(".txtAccNumber").val();
	var getIfscCode = $(".txtifsccode").val();
	var getSwiftCode = $(".txtswiftcode").val();*/

	var getAccHolderName = $("#txtaccholdername").val();
	var getBankName = $("#txtbankname").val();
	var getBranchName = $("#txtbranchname").val();
	var getAccNumber = $("#txtAccNumber").val();
	var getcreditday = $("#txtcreditday").val();
	//var getIfscCode = $("#txtifsccode").val();
	// var getSwiftCode = $("#txtswiftcode").val();

	if (getAccHolderName == "") {
		alert("Please Enter Account Holder Name!");
		return false;
	} else if (getBankName == "") {
		alert("Please Enter Bank Name!");
		return false;
	} else if (getBranchName == "") {
		alert("Please Enter Branch Name!");
		return false;
	} else if (getAccNumber == "") {
		alert("Please Enter Credit Limit!");
		return false;
	} else if (getcreditday == "") {
		alert("Please Enter Credit Day!");
		return false;
	}
	// }else if (getIfscCode == "") {
	// 	alert("Please Enter IFSC Code!");
	// 	return false;
	// }else if (getSwiftCode == "") {
	// 	alert("Please Enter Swift Code!");
	// 	return false;
	// }
}


function ContactEditBankDetailsGrid(getID, getHolderName, getBankName, getBranchName, getcreditlimit, getcreditDay) {
	debugger;
	var gridRow = '';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getHolderName + '"  class="wms-srv-grid-cell-input txtaccholdername"></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getBankName + '" class="wms-srv-grid-cell-input txtbankname"></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getBranchName + '" class="wms-srv-grid-cell-input txtbranchname"></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getcreditlimit + '" class="wms-srv-grid-cell-input txtAccNumber"></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getcreditDay + '" class="wms-srv-grid-cell-input txtcreditday"></div>';
	// gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getAccountNo + '" class="wms-srv-grid-cell-input txtAccNumber"></div>';
	// gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getIFSCCode + '" class="wms-srv-grid-cell-input txtifsccode"></div>';
	// gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getSwiftCode + '" class="wms-srv-grid-cell-input txtswiftcode"></div>';


	gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
	gridRow = gridRow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"> <i class="fas fa-check-circle" id="EditBankDetails" onclick="EditBankDetails(' + getID + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditBankDetailsHide(' + getID + ')"></i></a></div></div>';
	$("#ParameterRow" + getID).html(gridRow);
}

function gridEditBankDetailsHide(getID) {
	$("#ParameterRow" + getID).html('');
	var getClient = globalClientID;
	BankDetailstList(getClient);
}


/*
function BankDetails(getID){
	$("#ParameterRow" + getID).html('');
	var getClient = globalClientID; 
	BankDetailstList(getClient);
}*/


function EditBankDetails(getID) {
	debugger;
	if (validateEditBankDetails(getID) != false) {
		var getClient = globalClientID;
		//var apiPath = wmsApiPath + '/Client/EditBankDetails';
		var apiPath = 'http://localhost:50068/api/staging/v1/Client/EditBankDetails';
		var getAccHolderName = $(".txtaccholdername").val();
		var getBankName = $(".txtbankname").val();
		var getBranchName = $(".txtbranchname").val();
		var getCreditlimit = $(".txtAccNumber").val();
		var getCreditDay = $(".txtcreditday").val();
		// var getIfscCode = $(".txtifsccode").val();
		// var getSwiftCode = $(".txtswiftcode").val();



		var postData =
		{
			"ID": getID,
			"ObjectName": "Client",
			// "clientID": clientid,
			"clientID": getClient,
			"CompanyID": CompanyId,
			"UserId": UserId,
			"CustomerId": getCustomerID,
			"WarehouseId": warehouseID,
			"AccHolderName": getAccHolderName,
			"BankName": getBankName,
			"BranchName": getBranchName,
			"Creditlimit": getCreditlimit,
			"CreditDay": getCreditDay
			// "AccNumber": getAccNumber,
			// "IfscCode": getIfscCode,
			// "SwiftCode": getSwiftCode
		};

		callHttpUrl(apiPath, postData, function (data) {
			debugger;
			var getstatuscode = data.StatusCode;
			var isSuccess = data.Status;
			var getresult = data.Result;
			if (isSuccess == 200) {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					alert('Bank Details Edit Successfully!!');
					$('#wms-srv-bankdetails-popup-client').hide();
					//ClientList(strCurrentPage, 0, 0);
				}
				else {
					alert(returnmsg);
				}
			}
			else {
				alert("Bank Details Edit failed");
			}
		});
	}

}

function validateEditBankDetails(getID) {

	debugger;
	var getAccHolderName = $(".txtaccholdername").val();
	var getBankName = $(".txtbankname").val();
	var getBranchName = $(".txtbranchname").val();
	var getAccNumber = $(".txtAccNumber").val();
	var getcreditday = $(".txtcreditday").val();
	// var getIfscCode = $(".txtifsccode").val();
	// var getSwiftCode = $(".txtswiftcode").val();

	if (getAccHolderName == "") {
		alert("Please Enter Account Holder Name!");
		return false;
	} else if (getBankName == "") {
		alert("Please Enter Bank Name!");
		return false;
	} else if (getBranchName == "") {
		alert("Please Enter Branch Name!");
		return false;
	} else if (getAccNumber == "") {
		alert("Please Enter Credit Limit!");
		return false;
	} else if (getcreditday == "") {
		alert("Please Enter Credit Day!");
		return false;
	}
	// }else if (getIfscCode == "") {
	// 	alert("Please Enter IFSC Code!");
	// 	return false;
	// }else if (getSwiftCode == "") {
	// 	alert("Please Enter Swift Code!");
	// 	return false;
	// }
}
//end bank details code
//#endregion start bank details Code


//GST Code start 

var globalskuid = "";

function openGSTPopup(SelectedgrdSKUID) {

	//  searchskulocation();
	$('#wms-srv-GST-popup-Company').show();
	$('#wms-srv-GST-popup-close-Company').off();
	$('#wms-srv-GST-popup-close-Company').click(function () {
		$('#wms-srv-GST-popup-Company').hide();
	});
	//$('#txtskulocfilter').val('');
	GetGSTList(SelectedgrdSKUID);
	BindddlGST();
}




function GetGSTList(selectedSkuid) {
	debugger;

	globalskuid = selectedSkuid;
	var apiPath = wmsApiPath + 'Company/GetTaxList';
	//var apiPath =  'http://localhost:50068/api/staging/v1/Product/GetGSTList';

	var postData =
	//   {
	//       "CompanyId": CompanyId,
	//       "CustomerID": getCustomerID,
	//       "WarehouseID": warehouseID,
	//       "SkuID": selectedSkuid,
	//       "UserID": UserId
	//   };
	{
		"CompanyId": CompanyId,
		"CustomerID": getCustomerID,
		"WarehouseID": warehouseID,
		"ReferenceID": selectedSkuid,
		"UserID": UserId
	}
	callHttpUrl(apiPath, postData, function (data) {
		debugger;
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") {
			var GetGSTlistTb = getresult.Table;
			var skuGSTGrid = "";
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-header">';
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">GST</div>';
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">VALUE</div>';
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">REMARK</div>';
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
			skuGSTGrid = skuGSTGrid + '</div>';

			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-row wms-align divgstlstrow_0">';
			//skuparamGrid = skuparamGrid + '<div class="wms-srv-grid-cell">';
			// skuparamGrid = skuparamGrid + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtcategoryvalue"></div>';
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell">';
			//skuparamGrid = skuparamGrid + '<select  class="wms-srv-grid-cell-input" id="txtusertype" class="txtcategory">';
			//   skuGSTGrid = skuGSTGrid + '<select class="txtGST">';
			//   skuGSTGrid = skuGSTGrid + '<option value="">--Select All--</option>';
			//   skuGSTGrid = skuGSTGrid + '<option value="VAT">VAT</option>';
			//   skuGSTGrid = skuGSTGrid + '<option value="CGST">CGST</option>';
			//   skuGSTGrid = skuGSTGrid + '</select>';
			//   skuGSTGrid = skuGSTGrid + '</div>';
			skuGSTGrid = skuGSTGrid + '<select  class="wms-srv-grid-cell-input" id="txtGST">';
			skuGSTGrid = skuGSTGrid + '</select>';
			skuGSTGrid = skuGSTGrid + '</div>';

			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell">';
			skuGSTGrid = skuGSTGrid + '<input type="text" value="" class="wms-srv-grid-cell-input txtvalue" required ></div>';
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell">';
			skuGSTGrid = skuGSTGrid + '<input type="text" value="" class="wms-srv-grid-cell-input txtremark" required ></div>';
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell">';
			skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-action">';
			skuGSTGrid = skuGSTGrid + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveGST(\'' + globalskuid + '\',0);">';
			skuGSTGrid = skuGSTGrid + '<i class="fas fa-check-circle"></i></a></div></div>';
			skuGSTGrid = skuGSTGrid + '</div>';

			for (var li = 0; li < GetGSTlistTb.length; li++) {
				//var getReferenceID = 0;
				var getReferenceID = GetGSTlistTb[li].id;
				var GSTName = GetGSTlistTb[li].TaxName
				var Value = GetGSTlistTb[li].TaxRate
				var Remark = GetGSTlistTb[li].Remark;
				//var Discount = GetGSTlistTb[li].Discount;
				//  var ObjectName = GetGSTlistTb[li].ObjectName;

				//var rowno = li+1;
				var rowno = getReferenceID;

				skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-row wms-align divgstlstrow_' + rowno + '">';
				skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + GSTName + '</div>';
				skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + Value + '</div>';
				skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + Remark + '</div>';
				skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-cell">';
				skuGSTGrid = skuGSTGrid + '<div class="wms-srv-grid-action">';
				skuGSTGrid = skuGSTGrid + '<a href="#" title="Edit" class="wms-srv-save" onclick="editSKUGSTGridDetails(\'' + GSTName + '\',' + Value + ',\'' + Remark + '\',' + globalskuid + ',' + rowno + ');"><i class="fas fa-edit"></i></a>';
				skuGSTGrid = skuGSTGrid + '</div>';
				skuGSTGrid = skuGSTGrid + '</div>';
				skuGSTGrid = skuGSTGrid + '</div>';
			}
			$('#tblGSTlst').html(skuGSTGrid);
			// BindddlskuParamName();
		}
		else {
			alert('Something went wrong.');
		}
	});

}

var spnparameter = [];
var spnparameterID = [];

function BindddlGST() {
	debugger;
	var apiPath = wmsApiPath + 'Product/ddlGetGST';

	var postData = {
		"CompanyId": CompanyId,
		"CustomerID": getCustomerID,
		"WarehouseID": warehouseID,
	};
	callHttpUrl(apiPath, postData, function (data) {
		var isStatus = data.Status;
		if (isStatus == 200) {
			spnparameter = [];
			spnparameterID = [];
			$("#txtGST").html('<option >--Select--</option>');
			spnparameter.push('--Select List--');
			spnparameterID.push('0');
			var myParamList = data.Result;
			var ObjectParamList = myParamList.Table;
			if (ObjectParamList.length > 0) {
				for (var i = 0; i < ObjectParamList.length; i++) {
					var typeId = ObjectParamList[i].ID;
					var typevalue = ObjectParamList[i].Value;
					spnparameter.push(typevalue);
					spnparameterID.push(typeId);
					$("#txtGST").append('<option value = "' + typeId + '">' + typevalue + '</option>');
				}
			}
		}
	});
}




//function editSKUGSTGridDetails(Category,CategoryId, rate, Discount,globalskuid,rowno) {
function editSKUGSTGridDetails(GSTName, Value, Remark, globalskuid, rowno) {
	debugger;
	$("#editusergridValues").show();
	$("#beforeedituserGridValues").hide();

	GSTEditGrid(GSTName, Value, Remark, globalskuid, rowno);
}



function GSTEditGrid(GSTName, Value, Remark, globalskuid, rowno) {
	debugger;
	//globalUserID = userid;
	// var paramrefeid = ReferenceID;


	var gridRow = '';
	var State = "Edit";

	gridRow = gridRow + '<div class="wms-srv-grid-cell">';
	// gridRow = gridRow + bindObjectGSTDDlEdit(Category,CategoryId);
	//  gridRow = gridRow + '</div>';



	//   gridRow = gridRow + '<select class="txtGST">';
	//     gridRow = gridRow + '<option value="">--Select All--</option>';
	//   gridRow = gridRow + '<option value="VAT">VAT</option>';
	//   gridRow = gridRow + '<option value="CGST">CGST</option>';
	//   gridRow = gridRow + '</select>';
	gridRow = gridRow + bindObjectGSTDDlEdit(GSTName, Value);
	gridRow = gridRow + '</div>';

	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input txtvalue" value="' + Value + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" class="wms-srv-grid-cell-input txtremark" value="' + Remark + '" /></div>';
	gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="EditCustGST" title="Edit" onclick="EditGST(\'' + globalskuid + '\',' + rowno + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" title="Cancel" onclick="CancelGSTEdit(\'' + globalskuid + '\',' + rowno + ')"></i></a></div></div>';
	//gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="SaveCustGST" title="Save" onclick="SaveGST(\'' + globalskuid + '\',' + rowno + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" title="Cancel" onclick="CancelGSTEdit(\'' + globalskuid + '\',' + rowno + ')"></i></a></div></div>';
	//gridRow = gridRow + '<div class="wms-srv-grid-action">';		
	//gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="SaveCustParameter" onclick="AddEditVendor(\''+vendorEditId+'\',\''+GetvendorId+'\',\''+VendorName+'\',\''+VendorCode+'\',\''+sector+'\',\''+value+'\',\''+LedgerNo+'\',\''+Active+'\')";></i></a>';
	//gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditvendorHide('+vendorEditId+')"></i></a></div></div>';

	$(".divgstlstrow_" + rowno).html(gridRow);

}

//var CategoryName = [];
//var CategoryId = [];
var CategoryGlbalID = '';

function bindObjectGSTDDlEdit(GST, GSTId1) {
	debugger;
	CategoryGlbalID = GSTId1;
	var ddlgstvalue = '';
	ddlgstvalue = '<select class="wms-srv-grid-cell-input txtGST" id="">';  // txtcategoryvalue'+ UserID +'"
	for (var i = 0; i < spnparameter.length; i++) {
		if (spnparameter[i] == GST) {
			//ddlgstvalue += '<option value = "' + GSTId[i] + '" selected="selected">' + GSTName[i] + '</option>';
			ddlgstvalue += '<option value = "' + spnparameter[i] + '" selected="selected">' + spnparameter[i] + '</option>';
		} else {
			// ddlgstvalue += '<option value = "' + GSTId[i] + '">' + GSTName[i] + '</option>';
			ddlgstvalue += '<option value = "' + spnparameter[i] + '">' + spnparameter[i] + '</option>';
		}
	}
	ddlgstvalue += '</select>';
	return ddlgstvalue;
}


function CancelGSTEdit(globalskuid, rowno) {
	debugger;
	$(".divgstlstrow_" + rowno).html('');
	GetGSTList(globalskuid);
	//BindCategory();
}
function SaveGST(selectedSkuid, rowno) {
	debugger;
	if (validateGSTsave(rowno) != false) {


		globalskuid = selectedSkuid;
		var apiPath = wmsApiPath + 'Company/SaveTaxlist';
		//var apiPath =  'http://localhost:50068/api/staging/v1/Product/SaveGST';

		var getGSTValue = "", getValue = "", getRemarkValue = "";

		//getGSTValue = $('.divgstlstrow_'+rowno+' .txtGST option:selected').val();
		getGSTValue = $("#txtGST option:selected").text();

		getValue = $('.divgstlstrow_' + rowno + ' .txtvalue').val();
		getRemarkValue = $('.divgstlstrow_' + rowno + ' .txtremark').val();


		var postData =
		//   {
		//   "CompanyId": CompanyId,
		//   "CustomerID": getCustomerID,
		//   "WarehouseID": warehouseID,
		//   "UserID": UserId,
		//   "SkuID": selectedSkuid,
		//   "GSTName": getGSTValue,
		//   "Value": getValue,
		//   "Remark": getRemarkValue
		//   };
		{
			"CompanyId": CompanyId,
			"CustomerId": getCustomerID,
			"WarehouseID": warehouseID,
			"ReferenceID": selectedSkuid,
			"TaxName": getGSTValue,
			"Value": getValue,
			"objectName": "Company",
			"Remark": getRemarkValue
		}
		callHttpUrl(apiPath, postData, function (data) {
			debugger;
			var isStatus = data.Status;
			var getresult = data.Result;
			if (isStatus == 200) {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					alert("GST Saved Successfully.")
					$('#wms-srv-GST-popup-Company').hide();
					//getProductList(1, searchfilter, searchvalue);
				}
				else {
					alert("Failed to Save GST.");
				}
			}
			else {
				alert("Error Occured.");
			}
		});
	}
}

function EditGST(selectedSkuid, rowno) {
	debugger;
	if (validateGSTEdit(rowno) != false) {


		globalskuid = selectedSkuid;
		var apiPath = wmsApiPath + 'Company/EditTax';
		//var apiPath =  'http://localhost:50068/api/staging/v1/Product/SaveGST';

		var getGSTValue = "", getValue = "", getRemarkValue = "";

		getGSTValue = $('.divgstlstrow_' + rowno + ' .txtGST option:selected').val();
		getValue = $('.divgstlstrow_' + rowno + ' .txtvalue').val();
		getRemarkValue = $('.divgstlstrow_' + rowno + ' .txtremark').val();



		var postData =
		// {
		// "CompanyId": CompanyId,
		// "CustomerID": getCustomerID,
		// "WarehouseID": warehouseID,
		// "UserID": UserId,
		// "SkuID": selectedSkuid,
		// "GSTName": getGSTValue,
		// "Value": getValue,
		// "Remark": getRemarkValue,
		// "rowno": rowno
		// };
		{
			"CompanyId": CompanyId,
			"CustomerId": getCustomerID,
			"WarehouseID": warehouseID,
			"RefID": selectedSkuid,
			"TaxName": getGSTValue,
			"Value": getValue,
			"Ramark": getRemarkValue,
			"UserID": UserId,
			"rowno": rowno
		}
		callHttpUrl(apiPath, postData, function (data) {
			debugger;
			var isStatus = data.Status;
			var getresult = data.Result;
			if (isStatus == 200) {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					alert("GST Updated Successfully.")
					$('#wms-srv-GST-popup-Company').hide();
					// getProductList(1, searchfilter, searchvalue);
				}
				else {
					alert("Failed to update GST.");
				}
			}
			else {
				alert("Error Occured.");
			}
		});
	}
}

function validateGSTsave(rowno) {

	debugger;
	//  if (State == "Add") { 
	// var txtGSTVal= $('.divgstlstrow_'+rowno+' .txtGST option:selected').val();
	var txtGSTVal = $("#txtGST option:selected").text();

	var txtVal = $('.divgstlstrow_' + rowno + ' .txtvalue').val();
	var txtRemarkVal = $('.divgstlstrow_' + rowno + ' .txtremark').val();
	// selectElement = document.querySelector('#txtcategoryvalue');
	if (txtGSTVal == "--Select--" || txtGSTVal == "0") {
		alert("Please Select GST!");
		return false;
	}
	else if (txtVal == "") {
		alert("Please add Value!");
		return false;
	}
	else if (txtRemarkVal == "") {
		alert("Please add Remark!");
		return false;
	}

	/*getGSTValue = $('.divgstlstrow_'+rowno+' .txtGST option:selected').val();
getValue = $('.divgstlstrow_'+rowno+' .txtvalue').val();
getRemarkValue = $('.divgstlstrow_'+rowno+' .txtremark').val();*/
}

function validateGSTEdit(rowno) {

	debugger;


	//  if (State == "Add") { 
	var txtGSTVal = $('.divgstlstrow_' + rowno + ' .txtGST option:selected').val();
	//var txtGSTVal= $("#txtGST option:selected").text();
	var txtVal = $('.divgstlstrow_' + rowno + ' .txtvalue').val();
	var txtRemarkVal = $('.divgstlstrow_' + rowno + ' .txtremark').val();
	// selectElement = document.querySelector('#txtcategoryvalue');
	if (txtGSTVal == "--Select--" || txtGSTVal == "0") {
		alert("Please Select GST!");
		return false;
	}
	else if (txtVal == "") {
		alert("Please add Value!");
		return false;
	}
	else if (txtRemarkVal == "") {
		alert("Please add Remark!");
		return false;
	}

}

// CODE BY CHAITANYA AS ON 19 FEB 2025

function opensusdisopenPopup() 
{
	debugger;
	$('#wms-srv-susdis-popup-open-Company').show();
	$('.date').datepicker();
	$('#wms-srv-susdis-popup-Close-Company').off();
	$('#wms-srv-susdis-popup-Close-Company').click(function () 
	{
		$('#wms-srv-susdis-popup-open-Company').hide();
	});
	ClearAccountStatus();
	ddlStatusAcc();
	GetAccountList();
}


function GetAccountList() 
{
	debugger;
	var apiPath = wmsApiPath + 'Company/GetActiveStatusloglist';
	var postData =
	{
		"companyId": CompanyId,
		"packageID": "1"
	}
	callHttpUrl(apiPath, postData, function (data) 
	{
		debugger;
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") 
		{
			var GetGSTlistTb = getresult.Table;
			var ActiveGrid = "";
			ActiveGrid = ActiveGrid + '<div class="wms-srv-grid-header">';
			ActiveGrid = ActiveGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Status</div>';
			ActiveGrid = ActiveGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Date</div>';
			ActiveGrid = ActiveGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Remark</div>';
			ActiveGrid = ActiveGrid + '</div>';

			for (var li = 0; li < GetGSTlistTb.length; li++) 
			{
				var getPackageID = GetGSTlistTb[li].PackageID;
				var getSubscriptionStatus = GetGSTlistTb[li].SubscriptionStatus;
				var getActionDate = GetGSTlistTb[li].ActionDate;
				var getRemark = GetGSTlistTb[li].Remark;

				ActiveGrid = ActiveGrid + '<div class="wms-srv-grid-row wms-align">';
				ActiveGrid = ActiveGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSubscriptionStatus + '</div>';
				ActiveGrid = ActiveGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getActionDate + '</div>';
				ActiveGrid = ActiveGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRemark + '</div>';
				ActiveGrid = ActiveGrid + '</div>';
			}
			$('#AccountStatuslist').html(ActiveGrid);
		}
		else 
		{
			alert('Something went wrong.');
		}
	});

}

var spntype = [];
var spnId = [];

function ddlStatusAcc()
{     
    debugger;
    var apiPath = wmsApiPath + 'Company/ddlSubscriptionstatus'; 
    var postData =
	{
		"companyID": CompanyId,
		"customerID": getCustomerID
	};
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) 
		{
            spntype = [];
            spnId = [];
            $("#ddlstatusacc").html('<option value="">--Select--</option>');
            spntype.push('--Select List--');
			spnId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) 
			{
                for (var i = 0; i < grnContainerSize.length; i++) 
                {
                    var ID = grnContainerSize[i].ID;
                    var Status = grnContainerSize[i].Status;
                    spntype.push(Status);
                    spnId.push(ID);
                    $("#ddlstatusacc").append('<option value = "'+ ID +'">'+ Status +'</option>');
                }
            }
        }        
    });    
}

function SaveAccountStatus() 
{
	    debugger;
	  if (validateAccount() != false) 
	  {
		var apiPath = wmsApiPath + 'Company/SaveActiveStatus';
		var getsubscriptionStatus = $('#ddlstatusacc').val();
		var getactionDate = $('#txtactiondate').val();
		var getremark = $('#txtremark').val();


		var postData =
		{
			"packageID": "1",
			"subscriptionStatus": getsubscriptionStatus,
			"actionDate": getactionDate,
			"remark": getremark,
			"companyID": CompanyId
		};
		callHttpUrl(apiPath, postData, function (data) 
		{
	     	debugger;
			var isStatus = data.Status;
			var getresult = data.Result;
			if (isStatus == 200) 
			{
				var returnmsg = getresult.Message;
				if (returnmsg == "success") 
				{
					alert("Saved Successfully.");
					ClearAccountStatus();
					GetAccountList();
				}
				else 
			    {
					alert("Failed to Saved.");
				}
			}
			else 
			{
				alert("Error Occured.");
			}
		});
	}
}

function ClearAccountStatus()
{
	$('#ddlstatusacc').val('');
	$('#txtactiondate').val('');
	$('#txtremark').val('');
}

function validateAccount()
{
	debugger;
    var getsubscriptionStatus = $('#ddlstatusacc').val();
	var getactionDate = $('#txtactiondate').val();
	var getremark = $('#txtremark').val();

    if (document.getElementById("ddlstatusacc").value == "") 
	{
                alert("Please select status!");	
				return false;				
	}	
	else if (document.getElementById("txtactiondate").value == "")
	{
		alert("Please select date!");
		return false;
	}
    else if (document.getElementById("txtremark").value == "")
	{
		alert("Please enter your remark!");
		return false;
	}
}

// CODE BY CHAITANYA AS ON 19 FEB 2025






