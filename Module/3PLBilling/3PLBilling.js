var companyid = mBrillWmsSession.getCompanyId();
var getUserId = mBrillWmsSession.getUserId();
var CustomerID = mBrillWmsSession.getCustomerId();
var WarehouseID = $('#ddlwarehouse').val();
var strCurrentPage = '1'; //paging var declare
var getTotalRecords = '5'; ////paging var declare
var searchfilter = "0";
var searchvalue = "0";

$('.wms-srv-count-box-holder').click(function () 
{
    debugger;
    $('.wms-srv-count-box-holder').removeClass('dashboardActiveTab');
    $(this).addClass('dashboardActiveTab');

});

function setCurrentDate() {
    var arrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    var myDate = new Date();
    var getCurrentDate = myDate.getDate();
    var getCurrentMonth = arrMonth[myDate.getMonth()];
    var getCurrentYear = myDate.getFullYear();
  
    if (getCurrentDate < 10) {
      getCurrentDate = "0" + getCurrentDate;
    }
    var getCompleteDate = getCurrentDate + "-" + getCurrentMonth + "-" + getCurrentYear;
    return getCompleteDate;
  }


wmsLoadLayout(function(){
	init3plBilling();  
});


var obj = 'objrexta';

function init3plBilling(){
    InvoiceList(strCurrentPage, searchfilter, searchvalue);
	$('#3plBilling').show();
}

function showPayment()
{
    debugger;
    
    $("#wms-srv-showPayment-popup").show();
        $("#wms-srv-showPayment-popup-close").click(function()
        {
            $("#wms-srv-showPayment-popup").off();
            $("#wms-srv-showPayment-popup").hide();
        });
}

function shwoPaymentPopUp(InvId)
{
    PaymentDetail(InvId);
    $("#wms-srv-3PLPaymentMethod-view").show();
    $("#wms-srv-3PLPaymentMethod-close").click(function()
    {
        $("#wms-srv-3PLPaymentMethod-view").off();
        $("#wms-srv-3PLPaymentMethod-view").hide();
    })
}

function showApproveTab()
{
    $("#wms-srv-approval-popup").show();
    $("#wms-srv-approval-popup-close").click(function()
    {
        $("#wms-srv-approval-popup").off();
        $("#wms-srv-approval-popup").hide();
    })
}



function showDetailsTransaction(rateid)
{
    getTransactionDetail(rateid);
    $("#wms-srv-DetailTransaction-popup").show();
    $("#wms-srv-DetailTransaction-popup-close").click(function()
    {
        $("#wms-srv-DetailTransaction-popup").hide();
        $("#wms-srv-DetailTransaction-popup").off();
    });
}


function openDatePopup() 
{
    //debugger;
    $('#dateSelecterobjrexta').hide();
}

var getSelectedDateCatg = "";
var GetCurrentUserDate = "";
var currentfinacial = "2022/04/01";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";

var obj = 'objrexta';



function OpenPopup() {
    $('#app' + obj).show();
    $('#wms-srv-' + obj + '-popup').show();

}

function showAddNewInvoice()
{
    $("#dvTransactionList").html('');
    getRateCard();
    getBillingGroup();

    $("#wms-srv-AddNewInovice-popup").show();
    $("#wms-srv-AddNewInovice-popup-close").click(function()
    {
        $("#wms-srv-AddNewInovice-popup").off();
        $("#wms-srv-AddNewInovice-popup").hide();
    });
}

function showReviewInvoice()
{
    debugger;
    $("#wms-srv-AddNewInovice-popup").hide();
    $("#wms-srv-ReviewInovice-popup").show();
    $(".addNewInvoiceIcon .txt3PlIcon").removeClass('txt3PlIcon'); 
    $(".addNewInvoiceIcon .SetBlur").addClass('iconblur');
    $(".addNewInvoiceIcon .setActive").addClass('txt3PlIcon');
    
    $("#iconBlurStatus1").addClass('txt3PlIcon');
    $("#iconBlurStatus2").addClass('txt3PlIcon');
    $("#wms-srv-ReviewInovice-popup-close").click(function()
    {
        $("#wms-srv-ReviewInovice-popup").off();
        $("#wms-srv-ReviewInovice-popup").hide();
    });
}


function closePopup() {
    $('#app' + obj).hide();
    $('#wms-srv-' + obj + '-popup').hide();
}



$(document).ready(function () {
    debugger;
    loadCurrentDate();
    $(".iconClose").click(function () {
        $("#dateSelecter" + obj).hide();
    });
    //getSevenDateData();
    $('#txt_FromdatePicker' + obj).datepicker({
        dateFormat: 'yy/mm/dd',
        onSelect: function (date) {
            var getFromDate = $('#txt_FromdatePicker' + obj).val();
            var getToDate = $('#txt_TodatePicker' + obj).val();
            $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
            $("#hideFromDate").val(getFromDate);
        }
    });
    $('#txt_TodatePicker' + obj).datepicker({
        dateFormat: 'yy/mm/dd',
        onSelect: function (date) {
            var getFromDate = $('#txt_FromdatePicker' + obj).val();
            var getToDate = $('#txt_TodatePicker' + obj).val();
            $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
            $("#hideToDate").val(getToDate);
        }
    });

    globalDefaultFromDate = $("#hideFromDate" + obj).val();
    globalDefaultToDate = $("#hideToDate" + obj).val();

    var getFromDate = $("#txtFromToDate" + obj).val();
    var getSearchFromDate = "";
    getSearchFromDate = getFromDate.substr(0, 10);
    getSearchToDate = getFromDate.substr(14, 24);
})

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
    
}

function getcurrentFYData(dateType) {

    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
   
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
    debugger;
    $("#dateSelecter" + obj).show();
    $("#hideFromDateobjrexta").val();

}

$("#wms-srv-objrexta-popup-close").click(function () {
   debugger;
    $('#wms-srv-objrexta-popup').hide();
})


//Inovice Code
function OpenInvoiceReport(InvId)
{	//, defaultTemplateId
    sessionStorage["reportdetailid"] = InvId;
    //window.open("../../DetailReport/");

    window.open("../WMSReport/DetailReport/Invoice-Template.html"); 

//     debugger;
// //var apiPath = wmsApiPath + 'Report/GetInvoiceTemplate';
// var apiPath = 'http://localhost:44370/api/staging/v1/Report/GetInvoiceTemplate';

// var getClientId = $("#ddlclient").val();
// var getWarehouseID = $("#ddlwarehouse").val();

// //getClientId_SO = sessionStorage['Demandclient'];

// getWarehouseId_SO = sessionStorage['Demandwarehouse'];
// getCustomerId_SO = sessionStorage['DemandCustomerId'];
// getUserId_SO = sessionStorage['DemandUserID'];

// var postData = 
// {
//    "UserId": getUserId_SO,
//    "ClientId": getClientId,
//    "WarehouseId": getWarehouseID,
//    "CustomerId": getCustomerId_SO
// };
// callHttpUrl(apiPath, postData, function (data) {
//    var getStatus = data.Status;
//    if (getStatus == 200) {
//        debugger;
//        var gridList = data.Result;
//           var getID = gridList.Table[0].ID;
       
//        debugger;
//          var defaultTemplateStyle = 0;
//         sessionStorage["OrderId"] = getOrderId;
//         if(sessionStorage["DefaultTemplateStyle"] != null){
//          defaultTemplateStyle = sessionStorage["DefaultTemplateStyle"];
//         }/*else{
//          sessionStorage["DefaultTemplateStyle"] = defaultTemplateId;
//          defaultTemplateStyle = defaultTemplateId;
//         }*/

//         if(getID == 2){//defaultTemplateStyle
//          window.open("../WMSReport/DetailReport/Invoice-Template-Style-1.html"); 
//         }else if(getID == 3){//defaultTemplateStyle
//          window.open("../WMSReport/DetailReport/Invoice-Template-Style-2.html"); 
//         }else{
//          window.open("../WMSReport/DetailReport/Invoice-Template.html"); 
//         }
//    }
// });


}

function getBillingGroup() {
    debugger;
    var apiPath = wmsApiPath + '3PLBilling/getBillingGroupList';
    var postData = {
        "CustomerId": CustomerID
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            objectName = [];
            objectid = [];
            $("#ddlBillingGroup").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var getcatName = grnContainerSize[i].BillingGroup;
                    objectName.push(getcatName);
                    $("#ddlBillingGroup").append('<option value = "' + getcatName + '" name='+getcatName+'>' + getcatName + '</option>');
                }
            }
        }
    });
  }

  function getRateCard() {
    debugger;
    var apiPath = wmsApiPath + '3PLBilling/getRateCardList';
    var postData = {
        "CustomerId": CustomerID
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            objectName = [];
            objectid = [];
            $("#ddlRateCard").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var getcatName = grnContainerSize[i].RateTitle;
                    var getcatid = grnContainerSize[i].Id;
                    objectName.push(getcatName);
                    objectName.push(getcatName);
                    $("#ddlRateCard").append('<option value = "' + getcatid + '" name='+getcatName+'>' + getcatName + '</option>');
                }
            }
        }
    });
  }

  function getTransactionList() {
    debugger;
    var apiPath = wmsApiPath + '3PLBilling/getTransactionList';

    var getFromDate = $("#txtFromToDate" + obj).val();
    var getSearchFromDate = getFromDate.substr(0, 10);
    var getSearchToDate = getFromDate.substr(14, 24);

    var status = $('#ddlStatus').val();
    var group = $('#ddlBillingGroup').val();
    var frmdate = getSearchFromDate;
    var todate = getSearchToDate;
    var rateid = $('#ddlRateCard').val();
  
    var postData =
    {
        
        "CustomerId": CustomerID,
        "WarehouseId": WarehouseID,
        "Status": status,
        "Group": group,
        "FromDate": frmdate,
        "ToDate": todate,
        "RateId": rateid       
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;
           
            $("#dvTransactionList").html();
            var gridTable = "";
  
            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Seq No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Title</div>'; 
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Unit</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Per Unit</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">System Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Bill Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Line Total</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Billing Status</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';
  
            for (var i = 0; i < gridList.Table.length; i++) {
                var getRateID = gridList.Table[i].RateID;
                var getRateTitle = gridList.Table[i].RateTitle;
                var getRateType = gridList.Table[i].RateType;
                var getUnit = gridList.Table[i].Unit;
                var getRatePerUnit = gridList.Table[i].RatePerUnit;
                var getSystemQty = gridList.Table[i].SystemQty;
                var getBillQty = gridList.Table[i].BillQty;
                var getTotal = gridList.Table[i].Total;
                var getStatus = gridList.Table[i].Status;
                var seq = Number(i)+1;
  
                //  GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="div' + getRateID +'">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'><input type='checkbox' id='"+getRateID+"' onclick='selectTransactionList(this);' class='messageCheckbox'></div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + seq + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRateTitle + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRateType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getUnit + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRatePerUnit + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getSystemQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getBillQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getTotal + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getStatus + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
                // gridTable = gridTable + '<a href="#" title="ApproveTab" class="wms-srv-icononly" onclick="showApproveTab();"><i class="fas fa-clipboard-check"></i></a>';
                // gridTable = gridTable + '<div class="wms-srv-action-sep">|</div> ';
                // gridTable = gridTable + '<a href="#" title="Document" class="wms-srv-icononly" onclick="openDocumentObject(207345, "\'outward\'", "\'Order No|207345,Order Date|11/30/2023,Delivery Date|11/30/2023,Order Reference No|,Priority|High,Delivery Type|Standard\');"><i class="fas fa-file-alt"></i></a>';
                // gridTable = gridTable + '<div class="wms-srv-action-sep">|</div> ';
                gridTable = gridTable + '<a href="#" title="Transaction Detail" class="wms-srv-icononly" onclick="showDetailsTransaction('+getRateID+');"><i class="fas fa-solid fa-eye"></i></a>'
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }
            $("#dvTransactionList").html(gridTable);
        }
    });
  }

  function selectTransactionList(chkObj) {
    debugger;
    var getChkId = chkObj.id;
    if ($(chkObj).prop('checked')) {
        $('#div' + getChkId).css("background", "#efefef");
        $('#' + getChkId).prop("checked", true);
    } else {
        $('#div' + getChkId).css("background", "#ffffff");
        $('#' + getChkId).prop("checked", false);
    }
}

function getTransactionDetail(rateid) {
    debugger;
    var apiPath = wmsApiPath + '3PLBilling/getTransactionDetail';
    var frmdate = '2024/01/29';
    var todate = '2024/01/29';
  
    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": getTotalRecords,
        "FromDate": frmdate,
        "ToDate": todate,
        "RateId": rateid       
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;

            var getTotalRecord = gridList.Table[0].TotalRecord;
            var strCurrentPage = gridList.Table[0].CurrentPage;
           
            $("#dvTransactionDetail").html();
            var gridTable = "";
  
            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">TransactionID</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Transaction Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Container ID</div>'; 
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Per Unit</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Quantity</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Total</div>';
            gridTable = gridTable + '</div>';
  
            for (var i = 0; i < gridList.Table1.length; i++) {
                var getID = gridList.Table1[i].ID;
                var getOrderID = gridList.Table1[i].OrderID;
                var getTransDate = gridList.Table1[i].TransDate;
                var getContainer = gridList.Table1[i].Container;
                var getRateType = gridList.Table1[i].RateType;
                var getRatePerUnit = gridList.Table1[i].RatePerUnit;
                var getQty = gridList.Table1[i].Qty;
                var getRate = gridList.Table1[i].Rate;
                var getTotal = gridList.Table1[i].Total;
  
                //  GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="div' + getID +'">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getOrderID + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getTransDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getContainer + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRateType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRatePerUnit + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getTotal + "</div>";
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }
            $("#dvTransactionDetail").html(gridTable);
            setupGridPagingList('paging-Transdetail', strCurrentPage, getTotalRecord, getTransactionDetail);
        }
    });
  }

function save3plData(){
    var rateids = "";
    var frmdate = "2024/01/29";
    var todate = "2024/01/29";
    debugger;
    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (rateids == "") {
                rateids = $(this).attr("id");
            }
            else {
                rateids = rateids + "," + $(this).attr("id");
            }
        }
    });

    if(rateids == ""){
        alert("Please select atleast on Record..!");
    }
    else{
        var apiPath = wmsApiPath + '3PLBilling/save3PLData';
        var postData = {
            "RateID": rateids,
            "UserId": getUserId,
            "CustomerId": CustomerID,
            "FromDate": frmdate,
            "ToDate": todate
        }

        callHttpUrl(apiPath, postData, function (data) {
            var getStatusCode = data.Status;
            if (getStatusCode == 200) {
                getPreBillDetail();
                showReviewInvoice();
            }
            else{
            alert(getStatusCode.Result.Message);
            }
        });
    }
}

function getPreBillDetail() {
    debugger;
    var apiPath = wmsApiPath + '3PLBilling/getPreBillDetail';

    var postData =
    {
        "CustomerId": CustomerID,
        "WarehouseId": WarehouseID,
        "UserId": getUserId
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;

            var getBillDate = gridList.Table[0].BillDate;
            var getName = gridList.Table[0].Name;
            var getTaxCode = gridList.Table[0].TaxCode;
            var getCustomerCode = gridList.Table[0].CustomerCode;
            var getBillToAddr = gridList.Table[0].BillToAddr;
            var getShipToAddr = gridList.Table[0].ShipToAddr;
            var getBillAmt = gridList.Table[0].BillAmt;
            var getTaxAmt = gridList.Table[0].TaxAmt;
            var getTotalAmt = gridList.Table[0].TotalAmt;
            var getCurrency = gridList.Table[0].Currency;

            $('#lblDate').html(getBillDate);
            $('#lblCustomername').html(getName);
            $('#lblTaxcode').html(getTaxCode);
            $('#lblAccCode').html(getCustomerCode);
            $('lblfrmbilldate').html('2024-01-01');
            $('#lbltobilldate').html('2024-02-29');
            $('#txtBilltoAddress').val(getBillToAddr);
            $('#txtShiptoAddress').val(getShipToAddr);
            $('#lblBillAmt').html(getCurrency+' '+getBillAmt);
            $('#lblTaxAmt').html(getCurrency+' '+getTaxAmt);
            $('#lblTotalAmt').html(getCurrency+' '+getTotalAmt);
           
            $("#dvPreBillDetail").html();
            var gridTable = "";
  
            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Seq No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Title</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Type</div>'; 
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Unit</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Per Unit</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">System Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">BillQty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Line Total</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';
  
            for (var i = 0; i < gridList.Table1.length; i++) {
                var getID = gridList.Table1[i].ID;
                var getRateTitle = gridList.Table1[i].RateTitle;
                var getRateType = gridList.Table1[i].RateType;
                var getUnit = gridList.Table1[i].Unit;
                var getRate = gridList.Table1[i].Rate;
                var getSysQty = gridList.Table1[i].SysQty;
                var getQuantity = gridList.Table1[i].Quantity;
                var getTotal = gridList.Table1[i].Total;
                var seq = Number(i) + 1;
                var rate = 'rate';
                var qty = 'qty';
  
                //  GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="div' + getID +'">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + seq + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRateTitle + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRateType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getUnit + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;width:150px;"><input type="text" id="txtRate_'+getID+'" onChange="updateBill(\'rate\','+getID+');" value=' + getRate + ' class="wms-srv-grid-cell-input"></div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getSysQty + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;width:150px;"><input type="text" id="txtQty_'+getID+'" onChange="updateBill(\'qty\','+getID+');" value=' + getQuantity + ' class="wms-srv-grid-cell-input"></div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getTotal + "</div>";
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                //gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
                //gridTable = gridTable + '<a href="#" title="Review Transaction Detail" class="wms-srv-icononly" onclick="showPreBillDetails('+getID+');"><i class="fas fa-solid fa-eye"></i></a>'
                //gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }
            $("#dvPreBillDetail").html(gridTable);
        }
    });
  }

function updateBill(param,id){
    debugger;
    var rate = $('#txtRate_'+id+'').val();
    var qty = $('#txtQty_'+id+'').val();

    var apiPath = wmsApiPath + '3PLBilling/updateBill';
    var postData = {
        "Paramater": param,
        "ID": id,
        "Rate": rate,
        "Qty": qty,
        "UserId": getUserId       
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.Status;
        if (getStatusCode == 200) {
            getPreBillDetail();
        }
        else{
          alert(getStatusCode.Result.Message);
        }
    });
}

function generateInvoice(){
    debugger;
    var total = $('#lblTotalAmt').html();
    var totaltax = $('#lblTaxAmt').html();
    var tot = total.split(" ");
    var tax = totaltax.split(" ");
    var billadr = $('#txtBilltoAddress').val();
    var shipadr = $('#txtShiptoAddress').val();

    var apiPath = wmsApiPath + '3PLBilling/saveInvoice';
    var postData = {
        "CustomerId": CustomerID,
        "Total": tot[1],
        "Tax": tax[1],
        "CompanyId": companyid,
        "BillAddress": billadr,
        "ShipAddress" : shipadr,
        "UserId" :  getUserId    
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.Status;
        if (getStatusCode == 200) {
            $("#wms-srv-ReviewInovice-popup").off();
            $("#wms-srv-ReviewInovice-popup").hide();
            InvoiceList(strCurrentPage, searchfilter, searchvalue);
        }
        else{
          alert(data.Result.Message);
        }
    });
}

function InvoiceList(strCurrentPage, searchfilter, searchvalue) {
    debugger;
    var apiPath = wmsApiPath + '3PLBilling/getInvoiceList';
  
    var searchfilter = $("#ddlsearch").val();
    var searchvalue = $("#txtvalue").val();
  
    if (searchfilter == '0') {
        searchfilter = '0';
        searchvalue = '0';
    }
    debugger;
  
    var postData =
    {
        "CurrentPage": strCurrentPage, //paging var assign 
        "RecordLimit": getTotalRecords, ////paging var assign 
        "CustomerId": CustomerID,
        "UserID": getUserId,
        "Search": searchfilter,
        "Filter": searchvalue
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;
  
            var getTotalRecord = gridList.Table[0].TotalRecord;
            var strCurrentPage = gridList.Table[0].CurrentPage;
            var getUnbilled = gridList.Table[0].Unbilled;
            var getPending = gridList.Table[0].Pending;
            var getUnpaid60 = gridList.Table[0].Unpaid60;
            var getUnpaid90 = gridList.Table[0].Unpaid90;
            var getTotal = gridList.Table[0].Total;

            $('#dashUnbilledInvoice').html(getUnbilled);
            $('#dashPendingApprvl').html(getPending);
            $('#dashUnpaidInvoice').html(dashUnpaidInvoice);
            $('#dashUnpaid60').html(getUnpaid60);
            $('#dashUnpaid90').html(getUnpaid90);
            $('#dashTotal').html(getTotal);


            $("#dvInvoiceList").html();
            var gridTable = "";
  
            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Invoice No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Invoice Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Account Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">ERP Code</div>';            
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Aging</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Amount</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Recover Amount</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">OutStanding Amount</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Status</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';
            
            for (var i = 0; i < gridList.Table1.length; i++) 
            {
                var getInvoiceID = gridList.Table1[i].ID;
                var getInvoiceNo = gridList.Table1[i].InvoiceNo;
                var getInvoiceDate = gridList.Table1[i].InvoiceDate;
                var getName = gridList.Table1[i].Name;
                var getERPCode = gridList.Table1[i].ERPCode;  
                var getAging = gridList.Table1[i].Aging;
                var getAmount = gridList.Table1[i].Amount;
                var getRecAmt = gridList.Table1[i].RecAmt;
                var getOutAmt = Number(getAmount)-Number(getRecAmt);
                var getApproval = gridList.Table1[i].Approval;
                var getInvoiceStatus = gridList.Table1[i].InvoiceStatus;
  
                //  GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getInvoiceID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getInvoiceNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getInvoiceDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getERPCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getAging + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getAmount + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRecAmt + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getOutAmt + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getInvoiceStatus + "</div>";
                var objectHeadData = "Order No|" + getInvoiceID + ",Order Date|" + getInvoiceDate + ",Order Reference No|" + getInvoiceNo + ",Warehouse Code|" + getAmount + "";
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
                gridTable = gridTable + '<a href="#" title="Invoice List"  class="wms-srv-icononly" onclick="OpenInvoiceReport('+getInvoiceID+');"><i class="fas fa-tasks"></i></a><div class="wms-srv-action-sep">|</div>';
                //gridTable = gridTable + '<a href="#" title="ApproveTab"  class="wms-srv-icononly" onclick="showApproveTab();"><i class="fas fa-clipboard-check"></i></a><div class="wms-srv-action-sep">|</div>';
                if(getApproval== 'Yes') 
                {
                    gridTable = gridTable + '<a href="#" title="Approval" data-prefix="APP" data-orderid="' + getInvoiceID + '" class="wms-srv-icononly" onClick="openApprovalTrans(' + getInvoiceID + ', \'Invoice\');"><i class="fas fa-user-check"></i></a>';    
                    gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
                }
                gridTable = gridTable + '<a href="#" title="Payment"  class="wms-srv-icononly" onclick="shwoPaymentPopUp('+getInvoiceID+');"><i class="fas fa-receipt"></i></a><div class="wms-srv-action-sep">|</div>';
                gridTable = gridTable + '<a href="#" title="Document"  class="wms-srv-icononly" onclick="openDocumentObject(' + getInvoiceID + ', \'3pl\', \''+ objectHeadData +'\');"><i class="fas fa-file-alt"></i></a>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }
            $("#dvInvoiceList").html(gridTable);
            setupGridPagingList('paging-invoicelist', strCurrentPage, getTotalRecord, InvoiceList);
        }
    });
  }

function PaymentDetail(InvoiceId) {
debugger;
var apiPath = wmsApiPath + '3PLBilling/paymentDetail';

var postData =
{
    "InvoiceID": InvoiceId
    
}
callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    if (getStatus == 200) {
        debugger;
        var gridList = data.Result;

        $("#dvPaymentDetail").html();
        var gridTable = "";

        // HTML Grid Table Header Bind
        gridTable = gridTable + '<div class="wms-srv-grid-header">';
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Date</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Doc Ref No</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Transaction Type</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Particular</div>';            
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Transaction Amount</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Credit</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Debit</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Closing Balance</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
        gridTable = gridTable + '</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" value="" id="txtDate" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtDocRefNo" value="" class="wms-srv-grid-cell-input"></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><select id="ddlTransType" class="wms-srv-grid-cell-input"><option value="0">-- Select --</option><option value="Payment">Payment</option><option value="Credit Note">Credit Note</option><option value="Debit Note">Debit Note</option></select></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtPerticular" value="" class="wms-srv-grid-cell-input"></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtTranAmt" value="" class="wms-srv-grid-cell-input"></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
        gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
        gridTable = gridTable + ' </div><a href="#" title="Save" class="wms-srv-save" onClick="PaymentBooking('+InvoiceId+');"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep">';
        gridTable = gridTable + '</div>';
        gridTable = gridTable + '</div>';
        gridTable = gridTable + '</div>';
        
        for (var i = 0; i < gridList.Table.length; i++) {
            var getPaymentDate = gridList.Table[i].PaymentDate;
            var getDecRefNo = gridList.Table[i].DecRefNo;
            var getTransactiontype = gridList.Table[i].Transactiontype;
            var getPerticular = gridList.Table[i].Perticular;
            var getPaymentAmount = gridList.Table[i].PaymentAmount;
            var getCredit = gridList.Table[i].Credit;
            var getDebit = gridList.Table[i].Debit;
            var getOutstandingAmount = gridList.Table[i].OutstandingAmount;

            //  GRID ROW
            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter">';
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getPaymentDate + "</div>";
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getDecRefNo + "</div>";
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getTransactiontype + "</div>";
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getPerticular + "</div>";
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getPaymentAmount + "</div>";
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getCredit + "</div>";
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getDebit + "</div>";
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getOutstandingAmount + "</div>";
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
        }
        $("#dvPaymentDetail").html(gridTable);

        $('#dvPaymentDetail  .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' }); 
    }
});
}

function PaymentBooking(InvId){
    debugger;
    var result = ValidatePayment();
    if(result == ""){
        var apiPath = wmsApiPath + '3PLBilling/paymentBooking';

        var paymentdate = $('#txtDate').val();
        var paymentamt = $('#txtTranAmt').val();
        var docrefno = $('#txtDocRefNo').val();
        var perticular = $('#txtPerticular').val();
        var transtype = $('#ddlTransType').val();

        var postData = {
            "InvoiceID": InvId,
            "PaymentDate": paymentdate,
            "PaymentAmount": paymentamt,
            "DocRefNo": docrefno,
            "Perticular": perticular,
            "UserId": getUserId,
            "CustomerID": CustomerID,
            "CompanyID": companyid,
            "Transtype": transtype
        }

        callHttpUrl(apiPath, postData, function (data) {
            var getStatusCode = data.Status;
            if (getStatusCode == 200) {
                PaymentDetail(InvId);
            }
            else{
            alert(data.Result.Message);
            }
        });
    }
    else{
        alert(result);
    }
}

function ValidatePayment(){
    var result = "";
    if($('#txtDate').val() == ""){
        result = "Please select Date";
    }
    else if($('#txtDocRefNo').val() == ""){
        result = "Please enter Document Reference No.";
    }
    else if($('#ddlTransType').val() == "0"){
        result = "Please select Transaction Type";
    }
    else if($('#txtPerticular').val() == ""){
        result = "Please Enter perticular";
    }
    else if($('#txtTranAmt').val() == ""){
        result = "Please enter Transaction amount";
    }
    return result;
}

function invoiceSearch(){
    InvoiceList(strCurrentPage, searchfilter, searchvalue);
}

