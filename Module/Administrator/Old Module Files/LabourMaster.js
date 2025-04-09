

//var apiFolder = 'http://173.212.244.46/WebAPITest/';
//var apiFolder = 'http://localhost:50068/';
//var wmsApiPath = apiFolder + 'api/staging/v1/';

var strCurrentPage = '1'; //paging var declare
var getTotalRecords = '10'; ////paging var declare
var searchfilter = "0";
var searchvalue = "0";
var getClientId = "";
var globalClientID = "0";
var getClientName;
var companyid = mBrillWmsSession.getCompanyId();
var getUserId = mBrillWmsSession.getUserId();
var CustomerID = mBrillWmsSession.getCustomerId();
var WarehouseID = $('#ddlwarehouse').val();
var getClientCode;
var getLedgerNo;
var getWebsite;
var getClient="0";
var ClGroupCode;
var SAPCode;
var getId = 0;
var getLbrId = 0;
var getLbrDetails = 0;
var lbrDetailRowId = 0;
var getZoneId = 0;
var getActivityId = 0;
var GlobalShiftId = "";
var objectName = [];
var objectid = [];
var spnVendorLabourtype = [];
var spnVendorLabourtypeId = [];
var spnLabourType = [];
var spnLabourypeId = [];
var obj = 'objrexta';
var ObjectClientPara = "Client";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";
var getSearchFromDate = "";
var getSearchToDate = "";


function initLabourMaster(){
    debugger;
    labourList();
    bindVendorList();
    bindShfitList();
    $("#pnlLabourMaster").show();
    $('#txtLabourdListDatePicker .wms-srv-datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
    $("#wms-srv-LabourDetails-popup-close").click(function()
    {
        $("#wms-srv-LabourDetails-popup").off();
        $("#wms-srv-LabourDetails-popup").hide();
    });
    // var getFromDate = $("#txtFromToDate" + obj).val();
   
    // getSearchFromDate = getFromDate.substr(0, 10);
    // getSearchToDate = getFromDate.substr(14, 24);

}

function lodDatesAllFunction()
{

    loadCurrentDate();
    debugger;
    $('#txt_FromdatePicker' + obj).datepicker({
        //dateFormat: 'dd/mm/yy',
        dateFormat: 'dd/mm/yy',
        onSelect: function (date) {
            debugger;
            var getFromDate = $('#txt_FromdatePicker' + obj).val();
            var getToDate = $('#txt_TodatePicker' + obj).val();
            $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
            $("#hideFromDate").val(getFromDate);
        }
    });

    $('#txt_TodatePicker' + obj).datepicker({
        dateFormat: 'dd/mm/yy',
        onSelect: function (date) {
            debugger;
            var getFromDate = $('#txt_FromdatePicker' + obj).val();
            var getToDate = $('#txt_TodatePicker' + obj).val();
            $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
            $("#hideToDate").val(getToDate);
        }
    });

    globalDefaultFromDate = $("#hideFromDate" + obj).val();
    globalDefaultToDate = $("#hideToDate" + obj).val();

    var getFromDate = $("#txtFromToDate" + obj).val();
   
    getSearchFromDate = getFromDate.substr(0, 10);
    getSearchToDate = getFromDate.substr(14, 24);
}

function showAddNewShift()
{
    $("#wms-srv-AddNewShift-popup").show();
    bindShiftList();
    $("#wms-srv-AddNewShift-popup-close").click(function()
    {
        $("#wms-srv-AddNewShift-popup").off();
        $("#wms-srv-AddNewShift-popup").hide();
        labourList();
        bindVendorList();
        bindShfitList();
    });
}


function getSevenDateData(dateType) {
    debugger;
    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate - dateType;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getThirtyDateData(dateType) {
    debugger;
    var today = new Date();
    var todaydate = today.getDate();
    var dd = dateType - todaydate;

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    //yyyy-mm-dd
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getPreviousdate(dateType) {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate - dateType;
    //var getDateIndex = day.indexOf("-");
    // var dd ="";
    // if( getDateIndex == 0)
    // {
    //     dd= day.slice(0);

    // }   
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    //yyyy-mm-dd
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getcurrentFYData(dateType) {

    //     var today  = new Date();
    //     var todaydate = today.getDate();
    //     var dd = dateType - todaydate;

    //     var mm = today.getMonth()+1; 
    //     var yyyy = today.getFullYear();
    //     if(dd<10) 
    //     {
    //     dd='0'+dd;
    //     } 
    // //yyyy-mm-dd
    //     if(mm<10) 
    //     {
    //     mm='0'+mm;
    //     } 
    //     today = yyyy+'-'+mm+'-'+dd;

    //     //userSelectedDate = today.split("-").reverse().join("/");
    //     userSelectedDate = today.replaceAll("-","/");
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function loadCurrentDate() {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    GetCurrentUserDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
}


//Time Tracking Report



function searchTimeTrackingReport()
{
    debugger;
    var getFromDate = $("#txtFromToDate" + obj).val();
    
    var apiPath = wmsApiPath + 'Labour/TimeTrackingReport';
    var searchZoneTTval = $("#ZoneDropDownList").val();
    var searchActivityval = $("#ActivityDropDown").val();
    var searchTTLbrOrderId = $("#txtLbrTimeTrackOrderId").val();
    var searchFromDate = $("#hideFromDate"+obj).val();
    var searchToDate = $("#hideToDate"+obj).val();
    if(searchTTLbrOrderId == "")
    {
        searchTTLbrOrderId = 0;
    }
        searchFromDate= getSearchFromDate; 
        searchToDate = getSearchToDate

	var postData = {
		"UserId": getUserId,
        "CustomerId":CustomerID, 
        "WarehouseId": WarehouseID,
        "ZoneId": searchZoneTTval,
        "ActivityId": searchActivityval,
        "OrderId": searchTTLbrOrderId,
        "searchFromDate": searchFromDate,
        "searchToDate": searchToDate
    }
	callHttpUrl(apiPath, postData, function (data) {
        debugger;
		var isStatus = data.Status;
        var myGridData = data.Result.Table;
		if (isStatus == 200) {

            $("#gridLabourDetailsList").html(" ");
        var  gridList = "";
        gridList = gridList + '<div class="wms-srv-grid-header">';
        gridList = gridList + '<div class="wms-srv-grid-cell">Date</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">Zone</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">Activity</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">Order</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">Unit Type</div>';                                      
        gridList = gridList + '<div class="wms-srv-grid-cell">Qty</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">Start Time</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">End Time</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">Elapsed</div>';  
        // gridList = gridList + '<div class="wms-srv-grid-cell">Action</div>';                                                            
        gridList = gridList + '</div>';

            for(var i=0; i <myGridData.length;i++)
     {

            var getReportId = myGridData[i].Id;
            var getReportDate = myGridData[i].Date;
            var getReportZoneId = myGridData[i].ZoneId;
            var getReportZoneName = myGridData[i].ZoneName;
            var getReportActivityID = myGridData[i].ActivityID;
            var getReportActivityName = myGridData[i].ActivityName;
            var getReportOrderId = myGridData[i].OrderId;
            var getReportOrdergroupName = myGridData[i].OrdergroupName;
            var getReportQuantity = myGridData[i].Quantity;
            var getReportactivitystarttimey = myGridData[i].activitystarttime;
            var getReportactivityendtime = myGridData[i].activityendtime;
            var getReportElapsed = myGridData[i].Elapsed;

            gridList = gridList + '<div class="wms-srv-grid-row">';
            gridList = gridList + '<div class="wms-srv-grid-cell">'+getReportDate+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell" value="">'+getReportZoneName+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell" value="">'+getReportActivityName+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell">'+getReportOrderId+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell">'+getReportOrdergroupName+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell">'+getReportQuantity+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell">'+getReportactivitystarttimey+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell">'+getReportactivityendtime+'</div>';                                        
            gridList = gridList + '<div class="wms-srv-grid-cell">'+getReportElapsed+'</div> '; 
            // gridList = gridList + '<div class="wms-srv-grid-cell">';
            // gridList = gridList + '<div class="wms-srv-grid-action">';
            // gridList = gridList + '<a href="#" title="Save" class="wms-srv-save">';
            //  gridList = gridList + '<i class="fas fa-edit"></i></a>';
            // gridList = gridList + '</div>';                                      
            // gridList = gridList + '</div>';
            gridList = gridList + '</div>';
     }

                $("#gridLabourDetailsList").append(gridList);

        }
    });
}

//Time Tracking Report

function getDate() {
    $("#dateSelecter" + obj).show();
}

function regreshPage()
{
    location.reload(true);
}

function showLabourDetailReport(getLbrId)
{

    loadCurrentDate();
   // labourDetailsList(getLbrId);
   
}

// Date Code
var getSelectedDateCatg = "";
var GetCurrentUserDate = "";
var currentfinacial = "2022/04/01";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";

var obj = 'objrexta';

function isNumber(evt)
 {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false; 
         return true;
 }


function openDatePopup() 
{
    debugger;
    $('#dateSelecterobjrexta').hide();
}

function openDatePopup() 
{
    $('#dateSelecterobjrexta').hide();
}

function OpenPopup() {
    $('#app' + obj).show();
    $('#wms-srv-' + obj + '-popup').show();

}

function closePopup() {
    $('#app' + obj).hide();
    $('#wms-srv-' + obj + '-popup').hide();
}

var getSelectedDateCatg = "";

var divHeight = $('#header-wrap').height(); 
 $('#gettopfiveorder').css('margin-top', divHeight+'px');

function getSevenDateData(dateType) {
    debugger;
    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate - dateType;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getThirtyDateData(dateType) {
    debugger;
    var today = new Date();
    var todaydate = today.getDate();
    var dd = dateType - todaydate;

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    //yyyy-mm-dd
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getPreviousdate(dateType) {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate - dateType;
    //var getDateIndex = day.indexOf("-");
    // var dd ="";
    // if( getDateIndex == 0)
    // {
    //     dd= day.slice(0);

    // }   
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    //yyyy-mm-dd
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getcurrentFYData(dateType) {

    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function loadCurrentDate() {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    GetCurrentUserDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
}

function getDate() {
    $("#dateSelecter" + obj).show();
}

$("#wms-srv-objrexta-popup-close").click(function () {
   debugger;
    $('#wms-srv-objrexta-popup').hide();
})
//Date Code
function bindVendorList(getLabourId,GeteditVendorId)
{
    var apiPath = wmsApiPath + 'Labour/getLabourVendorList';
	var postData = {
		"UserId": getUserId,
        "CustomerId":CustomerID, 
        "WarehouseId": WarehouseID
          }
	callHttpUrl(apiPath, postData, function (data) {
        debugger;
		isStatus = data.Status;
		if (isStatus == 200) {
			CompanyName = [];
			Companyid = [];
            if(GeteditVendorId !="")
            {

                $("#EditddlLbrVendorId_"+getLabourId).html('<option value="0">--Select Vendor--</option>');
                    var myGridList = data.Result;
                    var grnContainerSize = myGridList.Table;
                    if (grnContainerSize.length > 0)
                    {
                        for (var i = 0; i < grnContainerSize.length; i++) {
                            var getId = grnContainerSize[i].Id;
                            var getName = grnContainerSize[i].Name;
                            CompanyName.push(getName);
                            Companyid.push(getId);
                            $("#EditddlLbrVendorId_"+getLabourId).append('<option value = "' + getId + '">' + getName + '</option>');
                        }
                        $("#EditddlLbrVendorId_"+getLabourId).val(GeteditVendorId);
                       
        
			        }
            }
            else
            {            
			$("#txtddlLbrVendorId").html('<option value="0">--Select Vendor--</option>');
			// CompanyName.push('--Select List--');
			// Companyid.push('0');
			var myGridList = data.Result;
			var grnContainerSize = myGridList.Table;
			if (grnContainerSize.length > 0) {
				for (var i = 0; i < grnContainerSize.length; i++) {
					var getId = grnContainerSize[i].Id;
					var getName = grnContainerSize[i].Name;
					CompanyName.push(getName);
					Companyid.push(getId);
					$("#txtddlLbrVendorId").append('<option value = "' + getId + '">' + getName + '</option>');
				}
				//$("#txtddlLbrVendorId").val(selcomnyid);
			}
        }
		}
	});
}


function validateAddLabour(objId)
{
    if(objId == 0)
    {
        var VallabourName = $("#txtLabourName").val();
        var ValChargeRate = $("#txtChargeableRate").val();
        var ValBilableRate = $("#txtBillableRate").val();
        var ValLedgerCode = $("#txtLedgerCode").val();
       var ValshiftID = $("#ddlLbrShiftId").val();
        var ValStartDate = $("#getStartDate").val();
        var ValEndDate = $("#getEndDate").val();    
        var ValgetVendorId = $("#txtddlLbrVendorId").val();

        if(VallabourName == "")
        {
            alert("Please Enter Labour Name");
            return false;
        }
        else if(ValChargeRate == "")
        {
            alert("Please Enter Chargeable Rate");
            return false;
        }
        else if(ValBilableRate == "")
        {
            alert("Please Enter Bilable Rate");
            return false;
        }
        else if(ValgetVendorId == "")
        {
            alert("Please Select Vendor");
            return false;
        }
        else if(ValgetVendorId == '0')
        {
            alert("Please Select Vendor");
            return false;
        }

        else if(ValLedgerCode == "")
        {
            alert("Please Enter Ledger Code");
            return false;
        }
        else if(ValshiftID == "")
        {
            alert("Please Select Shift");
            return false;
        }
        else if(ValshiftID == '0')
        {
            alert("Please Select Shift");
            return false;
        }
        else if(ValStartDate == "")
        {
            alert("Please Select Start Date");
            return false;
        }
        else if(ValEndDate == "")
        {
            alert("Please Select End Date");
            return false;
        }
        else{
            return true;
        }
    }
    else{
        var ValEditlabourName = $("#txtEditLabourName_"+objId).val();
        var ValEditChargeRate = $("#txtEditChargeableRate_"+objId).val();
        var ValEditBilableRate = $("#txtEditBillableRate_"+objId).val();
        var ValEditgetVendorId = $("#EditddlLbrVendorId_"+objId).val();
        var ValEditLedgerCode = $("#EditTxtLedgerCode_"+objId).val();
       var ValEditshiftID = $("#EditddlShiftName_"+objId).val();
        var ValEditStartDate = $("#editStartDate_"+objId).val();
        var ValEditEndDate = $("#editEndDate_"+objId).val();   


        if(ValEditlabourName == "")
        {
            alert("Please Enter Labour Name");
            return false;
        }
        else if(ValEditChargeRate == "")
        {
            alert("Please Enter Chargeable Rate");
            return false;
        }
        else if(ValEditBilableRate == "")
        {
            alert("Please Enter Bilable Rate");
            return false;
        }
        else if(ValEditgetVendorId == "")
        {
            alert("Please Select Vendor");
            return false;
        }
        else if(ValEditgetVendorId == '0')
        {
            alert("Please Select Vendor");
            return false;
        }
        else if(ValEditLedgerCode == "")
        {
            alert("Please Enter Ledger Code");
            return false;
        }
        else if(ValEditshiftID == "")
        {
            alert("Please Select Shift");
            return false;
        }
        else if(ValEditshiftID == '0')
        {
            alert("Please Select Shift");
            return false;
        }
        else if(ValEditStartDate == "")
        {
            alert("Please Select Start Date");
            return false;
        }
        else if(ValEditEndDate == "")
        {
            alert("Please Select End Date");
            return false;
        }
        else{
            return true;
        }
    }
}



function addLabour(getId)
{
    debugger;
    apiPath = wmsApiPath + "Labour/InsertUpdateLabour";
    var labourId = "";

    if(validateAddLabour(getId) != false)	
    {
    if(getId ==0)
    {
        labourId = getId;
        var labourName = $("#txtLabourName").val();
        var ChargeRate = $("#txtChargeableRate").val();
        var BilableRate = $("#txtBillableRate").val();
        var LedgerCode = $("#txtLedgerCode").val();
       var shiftID = $("#ddlLbrShiftId").val();
        var StartDate = $("#getStartDate").val();
        var EndDate = $("#getEndDate").val();    
        var getVendorId = $("#txtddlLbrVendorId").val();
        var postData = {
            "LabourId": labourId,
            "UserId": getUserId,
            "customerId": CustomerID,
            "companyId": companyid,
            "WarehouseId": WarehouseID,
            "LabourName": labourName,
            "ChargeRate": ChargeRate,
            "BilableRate": BilableRate,
            "VendorId": getVendorId,
            "LedgerCode": LedgerCode,
            "ShiftId": shiftID,
            "StartDate": StartDate,
            "EndDate": EndDate
          }

    }
    else{
        labourId = getId;
    var EditlabourName = $("#txtEditLabourName_"+getId).val();
    var EditChargeRate = $("#txtEditChargeableRate_"+getId).val();
    var EditBilableRate = $("#txtEditBillableRate_"+getId).val();
    var EditgetVendorId = $("#EditddlLbrVendorId_"+getId).val();
    var EditLedgerCode = $("#EditTxtLedgerCode_"+getId).val();
   var EditshiftID = $("#EditddlShiftName_"+getId).val();
    var EditStartDate = $("#editStartDate_"+getId).val();
    var EditEndDate = $("#editEndDate_"+getId).val();    
    var postData = {
        "LabourId": labourId,
        "UserId": getUserId,
        "customerId": CustomerID,
        "companyId": companyid,
        "WarehouseId": WarehouseID,
        "LabourName": EditlabourName,
        "ChargeRate": EditChargeRate,
        "BilableRate": EditBilableRate,
        "VendorId": EditgetVendorId,
        "LedgerCode": EditLedgerCode,
        "ShiftId": EditshiftID,
        "StartDate": EditStartDate,
        "EndDate": EditEndDate
      }
    }
    
      callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
        debugger;
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
        var getResult = data.Result.Message;
        if (getStatus == 200) {
            if(getResult == "success")
            {
                    alert("Record Save Successfully.");
                    labourList();
            }
            else{
                alert("Record Not Save..!!");
            }
        }
        else{
            alert("Unable To connect sever");
        }

    });
}        
}

function bindShfitList(getLaborrowId,getShiftrowId)
{
    debugger;
    var apiPath = wmsApiPath + 'Labour/getShfitList';
	var postData = {
		"UserId": getUserId,
        "CustomerId":CustomerID, 
        "WarehouseId": WarehouseID
        }
	callHttpUrl(apiPath, postData, function (data) {
        debugger;
		isStatus = data.Status;
		if (isStatus == 200) {
   
            if(getLaborrowId !="" || getLaborrowId !=0) 
            {
                        $("#EditddlShiftName_"+getLaborrowId).html('');
                        $("#EditddlShiftName_"+getLaborrowId).html('<option value="0">--Select Shift--</option>');
                        var myGridList = data.Result;
                    var grnContainerSize = myGridList.Table;
                    if (grnContainerSize.length > 0) {
                        for (var i = 0; i < grnContainerSize.length; i++) {
                            var getId = grnContainerSize[i].Id;
                            var getName = grnContainerSize[i].shiftName;
                            CompanyName.push(getName);
                            Companyid.push(getId);                         

                                $("#EditddlShiftName_"+getLaborrowId).append('<option value = "' + getId + '">' + getName + '</option>');
                            
                        }	
                        $("#EditddlShiftName_"+getLaborrowId).val(getShiftrowId);
                       // $("#EditddlShiftName_"+getLaborrowId).val(getShiftrowId);
                    }
           }
            else{
            CompanyName = [];
			Companyid = [];
            $("#ddlLbrShiftId").html('');
			$("#ddlLbrShiftId").html('<option value="0">--Select Shift--</option>');
			// CompanyName.push('--Select List--');
			// Companyid.push('0');
			var myGridList = data.Result;
			var grnContainerSize = myGridList.Table;
			if (grnContainerSize.length > 0) {
				for (var i = 0; i < grnContainerSize.length; i++) {
					var getId = grnContainerSize[i].Id;
					var getName = grnContainerSize[i].shiftName;
					CompanyName.push(getName);
					Companyid.push(getId);
					$("#ddlLbrShiftId").append('<option value = "' + getId + '">' + getName + '</option>');
				}				
			}  
                  }
                }
	});
}


// function bindVendortypeDropDownEdit(vendorEditId, vendortype){
// 	debugger;
//     venodrGlbalID = vendorEditId;
// 	var ddlVendortype = '';
// 	ddlVendortype = '<select class="wms-srv-grid-cell-input" id="txtEditVenodrtype'+ vendorEditId +'">';
// 	for(var i=0; i < spnVendortype.length; i++){
// 		if(spnVendortype[i] == vendortype){
// 			ddlVendortype += '<option value = "'+ spnVendortypeId[i]+'" selected="selected">'+ spnVendortype[i] +'</option>';
// 		}else{
// 			ddlVendortype += '<option value = "'+ spnVendortypeId[i]+'">'+ spnVendortype[i] +'</option>';
// 		}
// 	}
// 	ddlVendortype += '</select>';
// 	return ddlVendortype;
// }

function editLabourDetails(getId,LabourCode,getLabourName,ChargeableRate,BilableRate,VendorId,geteditVendorName,editLedgerCode,getEditShiftId,getEditShift,editstartDate,editEndDate)
{
    debugger;
    $("#gridLabourRow_"+getId).html('');
    var gridList = "";
    //gridList = gridList +'<div class="wms-srv-grid-row wms-align" id="gridLabourRow_'+ getId+'">';
    gridList = gridList +'<div class="wms-srv-grid-cell">';
    gridList = gridList +'<input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="234503">';
    gridList = gridList +'</div>';
    gridList = gridList +'<div class="wms-srv-grid-cell">'+LabourCode+'</div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" id="txtEditLabourName_'+getId+'" value="'+getLabourName+'"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" id="txtEditChargeableRate_'+getId+'" value="'+ChargeableRate+'"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" id="txtEditBillableRate_'+getId+'" value="'+BilableRate+'"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell">';
    gridList = gridList +'<select id="EditddlLbrVendorId_'+getId+'">'+bindVendorList(getId,VendorId)+'</select>';
    gridList = gridList +'</div>';    
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" id="EditTxtLedgerCode_'+getId+'" class="wms-srv-grid-cell-input" value="'+editLedgerCode+'"></div>';
    gridList = gridList + '<div class="wms-srv-grid-cell" style="width: 170px;">';
    gridList = gridList + '<div class="wms-srv-suggestion-holder">';
    gridList = gridList +'<select id="EditddlShiftName_'+getId+'">'+bindShfitList(getId,getEditShiftId)+'</select>';
    gridList = gridList + '<a href="#" onclick="showAddNewShift();">';
    gridList = gridList + '<i class="fas fa-plus-circle" title="Search"></i></a>';
    gridList = gridList + '</div>';
    gridList = gridList + '</div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" id="editStartDate_'+getId+'" class="wms-srv-grid-cell-input wms-srv-datepicker" value="'+editstartDate+'"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" id="editEndDate_'+getId+'" class="wms-srv-grid-cell-input wms-srv-datepicker" value="'+editEndDate+'"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell">';
    gridList = gridList +'<div class="wms-srv-grid-action">';
    gridList = gridList +'<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="addLabour('+getId+');">';
    gridList = gridList +'<i class="fas fa-check-circle"></i></a>';                
    gridList = gridList +'<div class="wms-srv-action-sep">  |  </div>';
    gridList = gridList +'<a href="#" title="view Labour" class="wms-srv-save" data-prefix="SV" onclick="labourList();">';
    gridList = gridList +'<i class="fas fa-times-circle"></i></a>';
    gridList = gridList +'</div>';
    gridList = gridList +'</div>';
    //gridList = gridList +'</div>';
    $("#gridLabourRow_"+getId).html(gridList);
    $('#tblGridLabourlist  .wms-srv-datepicker').datepicker({ dateFormat: 'yy-mm-dd' });    
}




function labourList()
{
    debugger;
	var apiPath = wmsApiPath + "Labour/GetAll";

    var searchfilter = $("#ddlLbrSeachFilter").val();
	var searchvalue = $("#txtsearchLabourVal").val();

    if(searchvalue == "")
    {
        searchfilter = "";
        searchvalue = "";
    }

	var postData =
	{
		CurrentPage: strCurrentPage,
		RecordLimit: getTotalRecords,
		CustomerId: CustomerID,
		UserId: getUserId,
		Search: searchvalue,
		Filter: searchfilter
	};
	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
        debugger;
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
        var getTotalRecords = data.Result.Table[0].TotalRecord;
        var getCurrentPage = data.Result.Table[0].CurrentPage;
        var getGridData = data.Result.Table1;
		if (getStatus == 200) {

    $("#tblGridLabourlist").html('');
    var myGridList = "";
    myGridList = myGridList + '<div class="wms-srv-grid-header">';
    myGridList = myGridList + '<div class="wms-srv-grid-cell"></div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Labour Code</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Labour Name</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Chargeable Rate</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Billable Rate</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Vendor</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Ledger Code</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Shift</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Start Date</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">End Date</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell wms-align">Action</div>';
    myGridList = myGridList + '</div>';

    // input Feild here

    myGridList = myGridList + '<div class="wms-srv-grid-row wms-align" id="commonaDatePicker">';                        
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id=""/></div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<label id="txtGenerateId"></label></div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<input type="text" id="txtLabourName" value="" class="wms-srv-grid-cell-input"/></div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<input type="text" id="txtChargeableRate" onkeypress="return isNumber(event)" data-id="" value="" class="wms-srv-grid-cell-input"/></div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell"> ';
    myGridList = myGridList + '<input type="text" id="txtBillableRate" onkeypress="return isNumber(event)" data-id="" value="" class="wms-srv-grid-cell-input"/></div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<select id="txtddlLbrVendorId">'+bindVendorList('',0)+'</select></div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<input type="text" id="txtLedgerCode" data-id="" value="" class="wms-srv-grid-cell-input"/></div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell" style="width: 170px;">';
    myGridList = myGridList + '<div class="wms-srv-suggestion-holder">';
    //myGridList = myGridList + '<select id="ddlLbrShiftId">''</select>';
    myGridList = myGridList +'<select id="ddlLbrShiftId">'+bindShfitList('',0)+'</select>';
    myGridList = myGridList + '<a href="#" onclick="showAddNewShift();">';
    myGridList = myGridList + '<i class="fas fa-plus-circle" title="Search"></i></a>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell"> ';
    myGridList = myGridList + '<input type="text" value="" class="wms-srv-datepicker wms-srv-grid-cell-input" onchange="expDateSetasRetrn();"  id="getStartDate" readonly/>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<input type="text"  value="" class="wms-srv-datepicker wms-srv-grid-cell-input" onchange="expDateCollectionDate();" id="getEndDate" readonly/>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<div class="wms-srv-grid-action">';
    myGridList = myGridList + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="addLabour(0);"><i class="fas fa-check-circle"></i></a>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '</div>';

    for(var i= 0; i < getGridData.length;i++)
    {
        var getLabourId = getGridData[i].LabourId;
        var getLabourCode = getGridData[i].labourCode;
        var getLabourName = getGridData[i].labourName;
        var getChargeableRate = getGridData[i].ChargeableCost;
        var getBilableRate = getGridData[i].BillableCost;
        var getVendorId = getGridData[i].VendorId;
        var getVendor = getGridData[i].VendorName;
        var getLedgerCode = getGridData[i].LabourId;
        var getShift = getGridData[i].LabourId;
        var getStartDate = getGridData[i].StartDate;
        var getEndDate = getGridData[i].Enddate;
        var getActive = getGridData[i].Active;
        var getRunningSerialNo = getGridData[i].RunningSerialNo;
        var getCreationDate = getGridData[i].CreationDate;
        var getCreatedBy = getGridData[i].CreatedBy;
        var ModifiedDate = getGridData[i].ModifiedDate;
        var ModifiedBy = getGridData[i].ModifiedBy;
        var getCompanyID = getGridData[i].CompanyID;
        var getCustomerId = getGridData[i].CustomerId;
        var getBarcode = getGridData[i].Barcode;
        var getLedgerCode = getGridData[i].LedgerCode;
        var getShiftId = getGridData[i].ShiftId;
        var getShiftName = getGridData[i].ShiftName;

    myGridList = myGridList + '<div class="wms-srv-grid-row wms-align" id="gridLabourRow_'+getLabourId+'">';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="234503"/>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">'+getLabourCode+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">'+getLabourName+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">'+getChargeableRate+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">'+getBilableRate+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell" value= "'+getVendorId+'">'+getVendor+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">'+getLedgerCode+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell" value="'+getShiftId+'">'+getShiftName+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">'+getStartDate+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">'+getEndDate+'</div>';
    myGridList = myGridList + '<div class="wms-srv-grid-cell">';
    myGridList = myGridList + '<div class="wms-srv-grid-action">';
    myGridList = myGridList + '<a href="#" title="Save" class="wms-srv-save" onclick="editLabourDetails(\''+getLabourId+'\',\''+getLabourCode+'\',\''+getLabourName+'\',\''+getChargeableRate+'\',\''+getBilableRate+'\',\''+getVendorId+'\',\''+getVendor+'\',\''+getLedgerCode+'\',\''+getShiftId+'\',\''+getShift+'\',\''+getStartDate+'\',\''+getEndDate+'\');">';
    myGridList = myGridList + '<i class="fas fa-edit"></i></a>';                 
    myGridList = myGridList + '<div class="wms-srv-action-sep">  |  </div>';
    myGridList = myGridList + '<a href="#" title="view Labour" class="wms-srv-save" data-prefix="SV" onclick="labourDetailsList(\''+getLabourId+'\');">';
    myGridList = myGridList + '<i class="fas fa-users"></i></a>';
    myGridList = myGridList + '<div class="wms-srv-action-sep">  |  </div>';
    myGridList = myGridList + '<a href="#" title="view Labour" class="wms-srv-save" data-prefix="SV" onclick="removeLabour(\''+getLabourId+'\');">';
    myGridList = myGridList + '<i class="fas fa-times-circle"></i></a>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '</div>';
    myGridList = myGridList + '</div>';
    }
    $("#tblGridLabourlist").append(myGridList);
    $('#commonaDatePicker .wms-srv-datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
    setupGridPagingList('pagingabourMaster', getCurrentPage, getTotalRecords, labourList);
    }
});
}


function expDateSetasRetrn() {
 debugger;
    var getreturnDate = $("#getStartDate").val();
    var dateInput = document.getElementById('getEndDate');
    var currentDate = new Date(getreturnDate);

    var todaysDate = new Date();
    var year = todaysDate.getFullYear();
    var month = (todaysDate.getMonth() + 1).toString().padStart(2, '0');
    var day = todaysDate.getDate().toString().padStart(2, '0');
    var SelectedCurntDate = year + '-' + month + '-' + day;

    if (SelectedCurntDate <= getreturnDate)
    {
        currentDate.setDate(currentDate.getDate() + 1);
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var day = currentDate.getDate().toString().padStart(2, '0');
        var nextDate = year + '-' + month + '-' + day;
        //dateInput.value = nextDate;
    }
    else {
        alert("Please Select Current Or Future Date");
        $("#getStartDate").val('');
        //$("#getStartDate").val(SelectedCurntDate);
    }  
}

function expDateCollectionDate() {
 
    debugger;
    var dateInput = $('#getEndDate').val();
    var getreturnDate = $("#getStartDate").val();

    var todaysDate = new Date();
    var year = todaysDate.getFullYear();
    var month = (todaysDate.getMonth() + 1).toString().padStart(2, '0');
    var day = todaysDate.getDate().toString().padStart(2, '0');
    var SelectedCurntDate = year + '-' + month + '-' + day;

    if (SelectedCurntDate <= dateInput && getreturnDate <= dateInput) {
        currentDate.setDate(currentDate.getDate() + 1);
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var day = currentDate.getDate().toString().padStart(2, '0');
        var nextDate = year + '-' + month + '-' + day;
        dateInput.value = nextDate;
    }
    else {
        alert("Please Select Current Or Future Date");
        $("#getEndDate").val('');
    } 
}




// Shfit Realted Code

function validateNewShiftFeild()
{
    var SrtTime = $("#txtShiftStartTime").val();
    var EndTime = $("#txtShiftEndTime").val();

    var shfitName = $("#txtAddNewShiftName").val();

    if(SrtTime =="")
    {
        alert("Please Select Start Time");
        return false;
    }
    else if(EndTime == "")
    {
        alert("Please Select End Time");
        return false;
    }
    else if(shfitName == "")
    {
        alert("Please Enter Shift Name");
        return false;
    }
    else if(SrtTime == EndTime)
    {
        alert("Please Enter Different Shift Time");
        return false;
    }
    else{
        return true;
    }
}


function removeLabour(getLbrRowId)
{
    var apiPath = wmsApiPath + "Labour/removeLabour";
    var postData = {
        "UserId": getUserId,  
        "CustomerId": CustomerID,
        "WarehouseId": WarehouseID,
        "LabourId":getLbrRowId      
      }
      debugger;
      callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
        debugger;
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;

        if (getStatus == 200) {
        alert("Record Remove Successfully");
        labourList();
        }
    });
}

function addNewShift()
{
        debugger;
    var apiPath = wmsApiPath + "Labour/addNewShift";
    if(validateNewShiftFeild() != false)
    {
    var SrtTime = $("#txtShiftStartTime").val();
    var EndTime = $("#txtShiftEndTime").val();

    var shfitName = $("#txtAddNewShiftName").val();
    var ShfitActive = "Yes";

    var ShfitStartTime = document.getElementById('txtShiftStartTime');
    var ShiftEndTime =document.getElementById('txtShiftEndTime');

    var selectedStartTime = ShfitStartTime.value;
    var selectedEndTime = ShiftEndTime.value;

    var timeAsDate = new Date('1970-01-01T' + selectedStartTime);
    var hours = timeAsDate.getHours();
    var startTimeShift = hours >= 12 ? 'PM' : 'AM';     
    var endTimeasDate = new Date('1970-01-01T' + selectedEndTime);

    var endhours = timeAsDate.getHours();
    var EndTimeType =  endTimeasDate.getHours();												
    var EndTimeShift = EndTimeType >= 12 ? 'PM' : 'AM';  

    var getStartTime = SrtTime + '|' + startTimeShift;
    var getEndTime = EndTime + '|' + EndTimeShift;


    debugger;
    var postData = {
        "UserId": getUserId,
        "CompanyId": companyid,
        "CustomerId": CustomerID,
        "WarehouseId": WarehouseID,
        "ShiftName": shfitName,
        "Starttime": getStartTime,
        "EndTime": getEndTime,
        "Active": ShfitActive
      }
      debugger;
      callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
        debugger;
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
        var  getMessage = data.Result.Message;
        if (getMessage == 'success'){
            alert("New Shift Added Successfully.");
            clearShiftTime();
            bindShiftList();
        }   
        else if(getMessage == 'failed')
        {
            alert("Enter Shift Name Already Present,Please Change the Shift Name")
        }
        else{
            alert("Unbable To Connect Server!!");
        }
    });
}

}

function bindShiftList()
{
    var apiPath = wmsApiPath + "Labour/getShfitList";
    var postData = {
		"UserId": getUserId,
        "CustomerId":CustomerID, 
        "WarehouseId": WarehouseID
        }
    callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
        debugger;
		var getStatus = data.Status;
        var myGridList = data.Result;
        var grnContainerSize = myGridList.Table;
		if (getStatus == 200) {
            var getGridData = data.Result.Table;
            $("#wms-srv-ShfitList").html('');
             var gridShiftList = "";

gridShiftList = gridShiftList + '<div class="wms-srv-grid-header">';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell wms-srv-align">Shift Name</div>';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell wms-srv-align">Start Time</div>';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell wms-srv-align">End Time</div>';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell wms-srv-align">Action</div>';
gridShiftList = gridShiftList + '</div>';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-row wms-srv-grid-add">';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell">';
gridShiftList = gridShiftList + '<input type="text" data-prefix="SESKU" value="" id="txtAddNewShiftName" name="" class="wms-srv-grid-cell-input"></div>';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell">';
gridShiftList = gridShiftList + '<input type="time" data-prefix="SESKU" value="" id="txtShiftStartTime" name="" class="wms-srv-grid-cell-input"></div>';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell"><input type="time" data-prefix="SESKU" data-id="" value="" id="txtShiftEndTime" class="wms-srv-grid-cell-input"></div>';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell">';
gridShiftList = gridShiftList + '<div class="wms-srv-grid-action"><a href="#" title="Save" onclick="addNewShift();" class="wms-srv-save" data-prefix="SV">';
gridShiftList = gridShiftList + '<i class="fas fa-check-circle" ></i></a></div></div></div>';

        for(var i = 0 ; i < getGridData.length ; i++)
        {
            var getId = getGridData[i].Id;
            var getShiftName = getGridData[i].shiftName;
            var getStartTime  =  getGridData[i].StartTime.replace('|',' ');
            var getEndTime  =  getGridData[i].EndTime.replace('|',' ');
       
        gridShiftList = gridShiftList + '<div class="wms-srv-grid-row wms-align" id="rowParaShift_"'+getId+'"">';
        gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell  wms-srv-align">'+getShiftName+'</div>';
        gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell  wms-srv-align">'+getStartTime+'</div>';
        gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell  wms-srv-align">'+getEndTime+'</div>';
        gridShiftList = gridShiftList + '<div class="wms-srv-grid-cell  wms-srv-align"></div></div>';
        }
        $("#wms-srv-ShfitList").append(gridShiftList);

    }
    });
}

function clearShiftTime()
{
    $("#txtAddNewShiftName").val('');
    $("#txtShiftEndTime").val('');
    $("#txtShiftStartTime").val('');
}

// Shfit Realted Code End Here
  // Zone  Drop Down
function LabourZoneDDL(lbrDetailRowId,getZoneId) {
    debugger;
    var apiPath = wmsApiPath + 'RateCard/getObjectZone';
    var postData = {
        "UserId": getUserId,
        "CustomerId": getCustomerId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {

            if(lbrDetailRowId !=0)
            {
                objectName = [];
                objectid = [];
                $("#EditddlLbrZone_"+lbrDetailRowId).html('<option value="0">--Select--</option>');
                objectName.push('--Select List--');
                objectid.push('0');
                var myGridList = data.Result;
                var grnContainerSize = myGridList.Table1;
                if (grnContainerSize.length > 0) {
                    for (var i = 0; i < grnContainerSize.length; i++) {
                        var getcatName = grnContainerSize[i].ZoneName;
                        var getcatId = grnContainerSize[i].ID;
                        objectName.push(getcatName);
                        objectid.push(getcatId);
                        $("#EditddlLbrZone_"+lbrDetailRowId).append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
                    }
                    $("#EditddlLbrZone_"+lbrDetailRowId).val(getZoneId);
                }
            }
            else
            {
                objectName = [];
                objectid = [];
                $("#ddlLabourDetailZone").html('<option value="0">--Select--</option>');
                objectName.push('--Select List--');
                objectid.push('0');
                var myGridList = data.Result;
                var grnContainerSize = myGridList.Table1;
                if (grnContainerSize.length > 0) {
                    for (var i = 0; i < grnContainerSize.length; i++) {
                        var getcatName = grnContainerSize[i].ZoneName;
                        var getcatId = grnContainerSize[i].ID;
                        objectName.push(getcatName);
                        objectid.push(getcatId);
                        $("#ddlLabourDetailZone").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
                    }
                }
            }  
            $("#ZoneDropDownList").html('');
            $("#ZoneDropDownList").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table1;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var getcatName = grnContainerSize[i].ZoneName;
                    var getcatId = grnContainerSize[i].ID;
                    objectName.push(getcatName);
                    objectid.push(getcatId);
                    $("#ZoneDropDownList").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
                }
            }        
        }
    });
}

  //Activity Drop Down
function LaborActivityDDL(lbrDetailRowId,getActivityId) {
    debugger;
    var apiPath = wmsApiPath + 'Labour/getLabourActivityList';
    var postData = {
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "WarehouseId":WarehouseID
    };
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var isStatus = data.Status;
        if (isStatus == 200) {
            
            if(lbrDetailRowId !=0)
            {
                $("#EditddlLbrActivity_"+lbrDetailRowId).html('<option value="0">--Select--</option>');
                objectName.push('--Select List--');
                objectid.push('0');
                var myGridList = data.Result;
                var grnContainerSize = myGridList.Table;
                if (grnContainerSize.length > 0) {
                    for (var i = 0; i < grnContainerSize.length; i++) {
                        var getcatName = grnContainerSize[i].ActivityName;
                        var getcatId = grnContainerSize[i].Id;
                        objectName.push(getcatName);
                        objectid.push(getcatId);
                        $("#EditddlLbrActivity_"+lbrDetailRowId).append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
                    }
                    $("#EditddlLbrActivity_"+lbrDetailRowId).val(getActivityId);
                }
            }
            else{
            
            objectName = [];
            objectid = [];
            $("#ddlLabourDetailActivity").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var getcatName = grnContainerSize[i].ActivityName;
                    var getcatId = grnContainerSize[i].Id;
                    objectName.push(getcatName);
                    objectid.push(getcatId);
                    $("#ddlLabourDetailActivity").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
                }
            }
        }
        $("#ActivityDropDown").html('<option value="0">--Select--</option>');
        objectName.push('--Select List--');
        objectid.push('0');
        var myGridList = data.Result;
        var grnContainerSize = myGridList.Table;
        if (grnContainerSize.length > 0) {
            for (var i = 0; i < grnContainerSize.length; i++) {
                var getcatName = grnContainerSize[i].ActivityName;
                var getcatId = grnContainerSize[i].Id;
                objectName.push(getcatName);
                objectid.push(getcatId);
                $("#ActivityDropDown").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
            }
        }


        }
    });
}


function labourDetailsList(getLabourId)
{
    debugger;

    $("#wms-srv-LabourDetails-popup").show();
    var gridList = "";
    $("#gridLabourDetailsList").html(" ");
    var apiPath = wmsApiPath + "Labour/getDetailLabourList";

	var postData =
	{
		labourId: getLabourId,
		CustomerId: getCustomerId,
		UserId: getUserId
	};
	callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
        debugger;
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
        var getGridData = data.Result.Table;
		if (getStatus == 200) {


// gridList = gridList + '<div class="wms-srv-grid" id="div-add-pallet-list">';
    gridList = gridList + '<div class="wms-srv-grid-header">';
    gridList = gridList + '<div class="wms-srv-grid-cell">Date</div>';
    // gridList = gridList + '<div class="wms-srv-grid-cell">Customer</div>';
    gridList = gridList + '<div class="wms-srv-grid-cell">Zone</div> ';
    gridList = gridList + '<div class="wms-srv-grid-cell">Activity</div> ';
    gridList = gridList + '<div class="wms-srv-grid-cell">Order</div> ';
    gridList = gridList + '<div class="wms-srv-grid-cell">Unit Type</div>';                                      
    gridList = gridList + '<div class="wms-srv-grid-cell">Qty</div>';
    gridList = gridList + '<div class="wms-srv-grid-cell">Start Time</div>';
    gridList = gridList + '<div class="wms-srv-grid-cell">End Time</div>';
    gridList = gridList + '<div class="wms-srv-grid-cell">Elapsed</div> ';  
    gridList = gridList + '<div class="wms-srv-grid-cell">Action</div> ';                                                            
    gridList = gridList + '</div>';
    gridList = gridList + '<div class="wms-srv-grid-row" id="labourgridList">';
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<input type="text" id="txtLabourTTDate" value="" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly></div>'; 
    // gridList = gridList + '<div class="wms-srv-grid-cell">';
    // gridList = gridList + '<input type="text" id="" value="" class="wms-srv-grid-cell-input"></div>'; 
    gridList = gridList + '<div class="wms-srv-grid-cell"><select id="ddlLabourDetailZone"><option> --Select-- </option></select>';
    gridList = gridList + '</div>';  
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<select id="ddlLabourDetailActivity"><option> --Select-- </option></select>';
    gridList = gridList + '</div>';   
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<input type="text" id="txtLabourTTOrder" value="" class="wms-srv-grid-cell-input"></div> ';
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<input type="text" id="txtLabourTTUnitType" value="" class="wms-srv-grid-cell-input"></div> ';
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<input type="text" id="txtLabourTTQty" value="" class="wms-srv-grid-cell-input"></div> ';
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<input type="time" id="txtLabourTTStartTime" value="" class="wms-srv-grid-cell-input"></div> ';
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<input type="time" id="txtLabourTTEndTime" value="" class="wms-srv-grid-cell-input"></div>'; 
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<input type="text" id="txtLabourTTElapsed" value="" class="wms-srv-grid-cell-input"></div>'; 
    gridList = gridList + '<div class="wms-srv-grid-cell">';
    gridList = gridList + '<div class="wms-srv-grid-action">';
    gridList = gridList + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveTimeTracking(\''+0+'\',\''+getLabourId+'\');"><i class="fas fa-check-circle"></i></a>';
    // gridList = gridList + '<div class="wms-srv-action-sep">  |  </div>';
    // gridList = gridList + '<a href="#" title="Save" class="wms-srv-save" onclick=""><i class="fas fa-edit"></i></a';
    gridList = gridList + '</div></div>';                                                                          
    gridList = gridList + '</div>';
    for(var i = 0; i < getGridData.length;i++)
    {

        var lbrDetailsRowId = getGridData[i].LbrDetailID;
        var lbrZoneID = getGridData[i].ZoneID;
        var lbrZoneName = getGridData[i].ZoneName;
        var lbrActivityId = getGridData[i].ActivityId;
        var lbrActivityName = getGridData[i].ActivityNAme;
        var lbrDate = getGridData[i].Date;
        var lbrOrderId = getGridData[i].OrderId;
        var lbrUnitType = getGridData[i].UnitType;
        var lbrQuantity = getGridData[i].Quantity;
        var lbrZoneID = getGridData[i].ZoneID;
        var lbrStartTime = getGridData[i].StartTime;
        var lbrEndTime = getGridData[i].EndTime;
        var lbrElapsed = getGridData[i].Elapsed;

        gridList = gridList + '<div class="wms-srv-grid-row" id="editLabourDetails_'+lbrDetailsRowId+'">';
        gridList = gridList + '<div class="wms-srv-grid-cell">'+lbrDate+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell" value="'+lbrZoneID+'">'+lbrZoneName+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell" value="'+lbrActivityId+'">'+lbrActivityName+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">'+lbrOrderId+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">'+lbrUnitType+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">'+lbrQuantity+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">'+lbrStartTime+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell">'+lbrEndTime+'</div>';                                        
        gridList = gridList + '<div class="wms-srv-grid-cell">'+lbrElapsed+'</div> '; 
        gridList = gridList + '<div class="wms-srv-grid-cell">';
        gridList = gridList + '<div class="wms-srv-grid-action">';
        // gridList = gridList + '<div class="wms-srv-action-sep"> | </div>';
        gridList = gridList + '<a href="#" title="Save" class="wms-srv-save" onclick="editLbrTimeTrackingReport(\''+getLabourId+'\',\''+lbrDetailsRowId+'\',\''+lbrDate+'\',\''+lbrZoneID+'\',\''+lbrZoneName+'\',\''+lbrActivityId+'\',\''+lbrActivityName+'\',\''+lbrOrderId+'\',\''+lbrUnitType+'\',\''+lbrQuantity+'\',\''+lbrStartTime+'\',\''+lbrEndTime+'\',\''+lbrElapsed+'\')">';
        gridList = gridList + '<i class="fas fa-edit"></i></a>';
        // gridList = gridList + '</div>';
        gridList = gridList + '</div>';                                      
        gridList = gridList + '</div>';
        gridList = gridList + '</div>';
     }
        $("#gridLabourDetailsList").append(gridList);            
        $("#labourgridList .wms-srv-datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
       
        LabourZoneDDL(0,0);
        LaborActivityDDL(0,0);
        lodDatesAllFunction();
        }
    });

}

function editLbrTimeTrackingReport(getLabourId,getLbrDetails,lbrDate,lbrZoneID,lbrZoneName,lbrActivityId,lbrActivityName,lbrOrderId,lbrUnitType,lbrQuantity,lbrStartTime,lbrEndTime,lbrElapsed)
{
    debugger;
    var gridEditList = "";
    $("#editLabourDetails_"+getLbrDetails).html(' ');
    // gridEditList = gridEditList + '<div class="wms-srv-grid-row" id="labourgridList">';
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">';
    gridEditList = gridEditList + '<input type="text" id="EditLabourTTDate_'+getLbrDetails+'" value="'+lbrDate+'" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly></div>'; 
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell"><select id="EditddlLbrZone_'+getLbrDetails+'">'+LabourZoneDDL(getLbrDetails,lbrZoneID)+'</select>';
    gridEditList = gridEditList + '</div>';  
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">';
    gridEditList = gridEditList + '<select id="EditddlLbrActivity_'+getLbrDetails+'">'+LaborActivityDDL(getLbrDetails,lbrActivityId)+'</select>';
    //gridList = gridList +'<select id="EditddlLbrVendorId_'+getId+'">'+bindVendorList(getId,VendorId)+'</select>';
    gridEditList = gridEditList + '</div>';
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">';
    gridEditList = gridEditList + '<input type="text" id="EditLbrTTOrder_'+getLbrDetails+'" value="'+lbrOrderId+'" class="wms-srv-grid-cell-input"></div> ';
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">';
    gridEditList = gridEditList + '<input type="text" id="EditLbrTTUnitType_'+getLbrDetails+'" value="'+lbrUnitType+'" class="wms-srv-grid-cell-input"></div> ';
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">'; 
    gridEditList = gridEditList + '<input type="text" id="EditLbrTTQty_'+getLbrDetails+'" value="'+lbrQuantity+'" class="wms-srv-grid-cell-input"></div> ';
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">';
    gridEditList = gridEditList + '<input type="time" id="EditLbrTTStartTime_'+getLbrDetails+'" value="'+lbrStartTime+'" class="wms-srv-grid-cell-input"></div> ';
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">';
    gridEditList = gridEditList + '<input type="time" id="EditLbrTTEndTime_'+getLbrDetails+'" value="'+lbrEndTime+'" class="wms-srv-grid-cell-input"></div>'; 
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">';
    gridEditList = gridEditList + '<input type="text" id="EditLbrTTElapsed_'+getLbrDetails+'" value="'+lbrElapsed+'" class="wms-srv-grid-cell-input"></div>'; 
    gridEditList = gridEditList + '<div class="wms-srv-grid-cell">';
    gridEditList = gridEditList + '<div class="wms-srv-grid-action">';
    gridEditList = gridEditList + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveTimeTracking(\''+getLbrDetails+'\',\''+getLabourId+'\');"><i class="fas fa-check-circle"></i></a>';
    gridEditList = gridEditList + '<div class="wms-srv-action-sep"> | </div>';
    gridEditList = gridEditList + '<a href="#" title="Save" class="wms-srv-save" onclick="labourDetailsList(0);"><i class="fas fa-times-circle"></i></a></div>';
    gridEditList = gridEditList + '</div>';                                                                          
    // gridEditList = gridEditList + '</div>';
    $("#editLabourDetails_"+getLbrDetails).append(gridEditList);
    $('#gridLabourDetailsList  .wms-srv-datepicker').datepicker({ dateFormat: 'yy-mm-dd' });    
}


function validateDetailsAddLabour(objDetailId)
{
    if(objDetailId == 0)
    {
        var ValLabourTTDate = $("#txtLabourTTDate").val();
        var ValgetZoneId = $("#ddlLabourDetailZone").val();
        var ValActivityId = $("#ddlLabourDetailActivity").val();
        var ValgetLbrOrder = $("#txtLabourTTOrder").val();
       var  ValgetLbrUnitType = $("#txtLabourTTUnitType").val();
        var ValgetLabourQty = $("#txtLabourTTQty").val();
        var ValgetLbrStartTime = $("#txtLabourTTStartTime").val();    
        var ValgetLbrEndTime = $("#txtLabourTTEndTime").val();
        var ValgetLbrElapsedTime = $("#txtLabourTTElapsed").val();

        if(ValLabourTTDate == "")
        {
            alert("Please Enter Labour Date");
            return false;
        }
        else if(ValgetZoneId == "" && ValgetZoneId == '0')
        {
            alert("Please Select Zone");
            return false;
        }
        else if(ValActivityId == "" && ValActivityId == '0')
        {
            alert("Please Select Activity");
            return false;
        }
        else if(ValgetLbrOrder == "" )
        {
            alert("Please Enter Order");
            return false;
        }

        else if(ValgetLbrUnitType == "")
        {
            alert("Please Enter Unit Type");
            return false;
        }
        else if(ValgetLabourQty == "")
        {
            alert("Please Enter Qutantity");
            return false;
        }
        else if(ValgetLbrStartTime == "")
        {
            alert("Please Select Start Time");
            return false;
        }
        else if(ValgetLbrEndTime == "")
        {
            alert("Please Select End Time");
            return false;
        }
        else if(ValgetLbrElapsedTime == "")
        {
            alert("Please Enter ElapsedTime");
            return false;
        }
        else{
            return true;
        }
    }
    else{

        var EditLabourTTDate = $("#EditLabourTTDate_"+objDetailId).val();
        var EditZoneId = $("#EditddlLbrZone_"+objDetailId).val();
        var EditActivityId = $("#EditddlLbrActivity_"+objDetailId).val();
        var EditLbrOrder = $("#EditLbrTTOrder_"+objDetailId).val();
        var EditLbrUnitType = $("#EditLbrTTUnitType_"+objDetailId).val();
        var EditLabourQty = $("#EditLbrTTQty_"+objDetailId).val();
        var EditLbrStartTime = $("#EditLbrTTStartTime_"+objDetailId).val();       
        var EditLbrEndTime = $("#EditLbrTTEndTime_"+objDetailId).val();        
        var EditLbrElapsedTime = $("#EditLbrTTElapsed_"+objDetailId).val();      

        if(EditLabourTTDate == "")
        {
            alert("Please Enter Labour Date");
            return false;
        }
        else if(EditZoneId == "")
        {
            alert("Please Select Zone");
            return false;
        }
        else if(EditZoneId == '0')
        {
            alert("Please Select Zone");
            return false;
        }
        else if(EditActivityId == "")
        {
            alert("Please Select Activity");
            return false;
        }
        else if(EditActivityId == '0')
        {
            alert("Please Select Activity");
            return false;
        }
        else if(EditLbrOrder == "" )
        {
            alert("Please Enter Order");
            return false;
        }

        else if(EditLbrUnitType == "")
        {
            alert("Please Enter Unit Type");
            return false;
        }
        else if(EditLabourQty == "")
        {
            alert("Please Enter Qutantity");
            return false;
        }
        else if(EditLbrStartTime == "")
        {
            alert("Please Select Start Time");
            return false;
        }
        else if(EditLbrEndTime == "")
        {
            alert("Please Select End Time");
            return false;
        }
        else if(EditLbrElapsedTime == "")
        {
            alert("Please Enter Elapsed Time");
            return false;
        }
        else{
            return true;
        }
    }
}





function SaveTimeTracking(getDetailsRowId,getLabourID)
{
    debugger;
    //var getDetailsRowId = parseInt(LbrDetailRowId);
    apiPath = wmsApiPath + "Labour/InsertLabourDetails";
    var getLbrId = "";
    
    if(validateDetailsAddLabour(getDetailsRowId) != false)	
    {

    if(getDetailsRowId == 0)
    {
        getLbrId = getLbrId;
        var LabourTTDate = $("#txtLabourTTDate").val();
        var getZoneId = $("#ddlLabourDetailZone").val();
        var ActivityId = $("#ddlLabourDetailActivity").val();
        var getLbrOrder = $("#txtLabourTTOrder").val();
       var  getLbrUnitType = $("#txtLabourTTUnitType").val();
        var getLabourQty = $("#txtLabourTTQty").val();
        var getLbrStartTime = $("#txtLabourTTStartTime").val();    
        var getLbrEndTime = $("#txtLabourTTEndTime").val();
        var getLbrElapsedTime = $("#txtLabourTTElapsed").val();

          var postData = {
            "TimeTrackerId": getLbrId,
            "UserId": getUserId,
            "labourId": getLabourID,
            "ZoneId": getZoneId,
            "OrderId":getLbrOrder,
            "OrderGroupName": getLbrUnitType,
            "WarehouseId": WarehouseID,
            "ActivityId": ActivityId,         
            "ActivityStartTime": getLbrStartTime,
            "ActivityEndTime": getLbrEndTime,       
            "CompanyId": companyid,
            "CustomerId": CustomerID,
            "CreationDate":LabourTTDate,
            "Quantity":getLabourQty,
            "Elapsed":getLbrElapsedTime
          };
    }
    else 
    {
        getLbrId = getDetailsRowId;
    var EditLabourTTDate = $("#EditLabourTTDate_"+getDetailsRowId).val();
    var EditZoneId = $("#EditddlLbrZone_"+getDetailsRowId).val();
    var EditActivityId = $("#EditddlLbrActivity_"+getDetailsRowId).val();
    var EditLbrOrder = $("#EditLbrTTOrder_"+getDetailsRowId).val();
    var EditLbrUnitType = $("#EditLbrTTUnitType_"+getDetailsRowId).val();
    var EditLabourQty = $("#EditLbrTTQty_"+getDetailsRowId).val();
    var EditLbrStartTime = $("#EditLbrTTStartTime_"+getDetailsRowId).val();
   
    var EditLbrEndTime = $("#EditLbrTTEndTime_"+getDetailsRowId).val();   
    
    var EditLbrElapsedTime = $("#EditLbrTTElapsed_"+getDetailsRowId).val();    
    var postData = {
        "TimeTrackerId": getLbrId,
        "UserId": getUserId,
        "labourId": getLabourID,
        "ZoneId": EditZoneId,
        "OrderId":EditLbrOrder,
        "OrderGroupName": EditLbrUnitType,
        "WarehouseId": WarehouseID,
        "ActivityId": EditActivityId,         
        "ActivityStartTime": EditLbrStartTime,
        "ActivityEndTime": EditLbrEndTime,       
        "CompanyId": companyid,
        "CustomerId": CustomerID,
        "CreationDate":EditLabourTTDate,
        "Quantity":EditLabourQty,
        "Elapsed":EditLbrElapsedTime
      };
    }
    
      callHttpUrl(apiPath, postData, function (data) {
		//alert(data);
        debugger;
		var getStatus = data.Status;
		var getStatusCode = data.StatusCode;
        var getResult = data.Result.Message;
        if (getStatus == 200) {
          
            if(getResult == "success")
            {
                    alert("Record Save Successfully.");

                    labourDetailsList(getLabourID);
            }
            else{
                alert("Record Not Save..!!");
            }
        }
        else{
            alert("Unable To connect sever");
        }

    });
}
}


