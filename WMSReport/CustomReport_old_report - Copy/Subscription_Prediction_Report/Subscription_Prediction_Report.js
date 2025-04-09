// wmsLoadLayout(function(){
//     initReport()
// });
function openDetailReport(dataVal) {
    debugger;
    sessionStorage["reportdetailid"] = dataVal;
    window.open("../../DetailReport/Purchase-Order-Template.html");
}


function initReport() {

    $('.reportCategory a').click(function () {
        $('.reportCategory a i').attr('class', 'fas fa-folder');
        $('.reportCategory a').removeAttr('style');
        $(this).find('i').attr('class', 'fas fa-folder-open');
        $(this).attr('style', 'background-color:#ffffff;');

        $('.reportListByCategory').hide();
        var myPanelId = $(this).data('id');
        $('#' + myPanelId).show();
    });

    $('.printablesType').click(function () {
        var getReportId = $(this).attr('data-id');
        $('#hdnDetailReportId_FromMain').val(getReportId);
        openReportPopup();
    });
    getReportlist();
    
}

function openDetailReportById(obj) {
    var getReportId = $(obj).attr('data-id');
    $('#hdnDetailReportId_FromMain').val(getReportId);
    openReportPopup();
}

function openReportPopup() {
    $('#wms-srv-report-popup').show();
    $('#wms-srv-report-popup-close').off();
    $('#iframeReport').attr('src', 'WMSReport/ExecuteReport.html');
    $('#wms-srv-report-popup-close').click(function () {
        $('#iframeReport').attr('src', 'about:blank');
        $('#wms-srv-report-popup').hide();
    });

}

function openDatePopup() {
    $('#dateSelecterobjrexta').hide();
}

function openDetailedReport(detailReportId) {
    $('#wms-srv-reportdetail-popup').show();
    $('#wms-srv-reportdetail-popup-close').off();
    $('#hdnDetailReportId_FromMain').val(detailReportId);
    $('#iframeDetailReport').attr('src', 'WMSReport/Detail-Report-Template/GroupSummary-Template.html');
    $('#wms-srv-reportdetail-popup-close').click(function () {
        $('#iframeDetailReport').attr('src', 'about:blank');
        $('#wms-srv-reportdetail-popup').hide();
    });
}


function exportAtClient() {
    var exportFinalData = '';
    var getPageTitle = $('.previewPageTitle').text();
    $('.previewTable .reportHeaderRow').each(function () {
        var getMyCell = $(this).find('.reportHeaderCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconHeader');
            if (!isDetailIconHeader) {
                var getMyText = $(this).text();
                if (exportData == '') {
                    exportData = getMyText;
                } else {
                    exportData = exportData + ", " + getMyText;
                }
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });
    $('.previewTable .reportRow').each(function () {
        var getMyCell = $(this).find('.reportRowCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconCell');
            if (!isDetailIconHeader) {
                var getMyText = $(this).text();
                if (exportData == '') {
                    exportData = getMyText;
                } else {
                    exportData = exportData + ", " + getMyText;
                }
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });

    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([exportFinalData], { type: "text/plain" }));
    a.download = getPageTitle + ".csv";
    a.click();
}

function getReportListByCategary(categoryId) 
{
    debugger;
    $('.lnkReportCategory').attr('style', '');
    $('.lnkReportCategory i').attr('class', 'fas fa-folder');
    $('.lnkCategory_' + categoryId).attr('style', 'background-color:#fcfcfc');
    $('.lnkCategory_' + categoryId + ' i').attr('class', 'fas fa-folder-open');


    var apiPath = wmsApiPath + 'Report/GetReportCategoryMenu';
    var getRoleId = mBrillWmsSession.getUserRoleId();
    var getUserId = mBrillWmsSession.getUserId();

    var postData =
    {
        CategoryId: categoryId,
        RoleId: getRoleId,
        UserId: getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;

        if (getStatus == 200) {
            var myGridList = data.Result;

            $('#reportInbound').html('');
            var gridTable = '';

            for (var i = 0; i < myGridList.Table.length; i++) {
                var getId = myGridList.Table[i].Id;
                var getReportName = myGridList.Table[i].ReportName;
                var getIcon = myGridList.Table[i].Icon;

                gridTable = gridTable + '<div class="col-md-4 nopadding">';
                gridTable = gridTable + '<div class="printablesType" data-id="' + getId + '" data-label="' + getReportName + '" onclick="openDetailReportById(this);">';
                gridTable = gridTable + '<div class="printablesTitle">';
                gridTable = gridTable + '<i class="' + getIcon + '"></i>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '<div class="printablesTitle">' + getReportName + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';

            }

            $('#reportInbound').html(gridTable);
        }
        else {
            alert('Unable to connect');
        }
    });
}


function getReportlist() {
    debugger;
    var apiPath = wmsApiPath + 'Report/GetReportCategory';
    var getUserId = mBrillWmsSession.getUserId();

    var postData =
    {
        UserId: getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;

        if (getStatus == 200) {
            var myGridList = data.Result;

            $('#reportlist').html('');
            var gridTable = '';


            for (var i = 0; i < myGridList.Table.length; i++) {
                var getId = myGridList.Table[i].Id;
                var getTitle = myGridList.Table[i].Title;

                gridTable = gridTable + '<a href="#" class="lnkReportCategory lnkCategory_' + getId + '" data-id=' + getId + ' onclick="getReportListByCategary(' + getId + ');return false;"><i class="fas fa-folder"></i>' + getTitle + '</a>';
            }

            $('#reportlist').html(gridTable);
            if (myGridList.Table.length > 0) {
                getReportListByCategary(1);
            }
        }
        else {
            alert('Unable to connect');
        }
    });
}

var getSelectedDateCatg = "";
var GetCurrentUserDate = "";
var currentfinacial = "2024/04/01";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";

var obj = 'objrexta';


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
todaysCurrentUserDate = today.replaceAll("-", "/");



function OpenPopup() {
    $('#app' + obj).show();
    $('#wms-srv-' + obj + '-popup').show();

}


function closePopup() {

    $('#app' + obj).hide();
    $('#wms-srv-' + obj + '-popup').hide();

}



$(document).ready(function () 
{

    createpieChart('Self-Life-Aging-Chart', ['Active Subscription', 'Active Customer', 'Avarage Customer Lifetime'], ['100', '200', '300'], ['#0984e3', '#1B1464', '#ffbe76'], '');
    loadCurrentDate();
    $("#btnSearchReport" + obj).click(function () {
        //getPurchaseOrderList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    })
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
    //getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);



})


var getSelectedDateCatg = "";
// function getPurchaseOrderList(getSelectedDateCatg, fromDate, toDate) {
//     debugger;
//     if (fromDate == "") {
//         var getFromDate = $("#txtFromToDate" + obj).val();
//         var getSearchFromDate = "";
//         getSearchFromDate = getFromDate.substr(0, 10);
//         getSearchToDate = getFromDate.substr(14, 24);
//         getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);
//     }
//     var getSearchToDate = "";
//     var apiPath = wmsApiPath + "ReportStatic/PurchaseOrderReport";

//     var getSearchFilter = "OrderNo"
//     var SearchByDate = "SearchByDate";
//     var getUserId = mBrillWmsSession.getUserId();
//     var getWarehouseId = mBrillWmsSession.getWarehouseId();
//     var getCustomerId = mBrillWmsSession.getCustomerId();
//     var getCompanyId = mBrillWmsSession.getCompanyId();
//     var getObject = $("#ddlPageObjectobjrexta").val();

//     if (getSelectedDateCatg == "") {

//         var getSearch = $("#txtfilter" + obj).val();
//         var getCustomerOrder = $("#txtCustomerOrderNo" + obj).val();
//         getSearchVal = getSearch.split("/").reverse().join("/");

//         if (getSearchVal != "" && getCustomerOrder == "") {
//             getCustomerOrder = getSearchVal;
//             getSearchFilter = SearchByDate
//         }


//         if (getCustomerOrder == "") {


//             var postData =
//             {
//                 "UserId": getUserId,
//                 "CustomerId": getCustomerId,
//                 "WarehouseId": getWarehouseId,
//                 "CompnayId": getCompanyId,
//                 "SearchFilter": "",
//                 "SearchValue": "",
//                 "fromDate": fromDate,
//                 "toDate": toDate,
//                 "OrderType": getObject
//             };
//         }
//         else {
//             var postData =
//             {
//                 "UserId": getUserId,
//                 "CustomerId": getCustomerId,
//                 "WarehouseId": getWarehouseId,
//                 "CompnayId": getCompanyId,
//                 "SearchFilter": getSearchFilter,
//                 "SearchValue": getCustomerOrder,
//                 "fromDate": "-",
//                 "toDate": "-",
//                 "OrderType": getObject

//             };
//         }
//         // else{
//         //     alert("Please Enter Valid Data..!!");
//         // }

//     }
//     else {

//         var searchByDate = getSelectedDateCatg.split("-").reverse().join("/");
//         var CurrentDate = GetCurrentUserDate.split("-").reverse().join("/");

//         var postData =
//         {
//             "UserId": getUserId,
//             "CustomerId": getCustomerId,
//             "WarehouseId": getWarehouseId,
//             "CompnayId": getCompanyId,
//             "SearchFilter": "",
//             "SearchValue": "",
//             "fromDate": searchByDate,
//             "toDate": CurrentDate,
//             "OrderType": getObject
//         };
//     }

//     callHttpUrl(apiPath, postData, function (data) {

//         var getStatus = data.Status;
//         var getStatusCode = data.Code;
//         if (getStatus == 200) {
//             var getResult = data.Result.Table;
//             if (obj == 'objrexta') {
//                 $("#gettopfiveorder" + obj).html("");
//                 var myGrid = "";
//                 myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">Inward Order No</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Order Reference No</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Vendor/Client/WH</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Customer Name</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Warehouse Name</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Expected Delivery Date</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500; display:none;">Status</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell detailIconHeader" style="text-align:center;color: #b3b3b3;font-weight: 500;">Action</div>';
//                 myGrid = myGrid + '</div>';
//                 for (var i = 0; i < getResult.length; i++) {
//                     var getExpectedRec = getResult[i].ExpectedRec;
//                     var getOrderReferenceNo = getResult[i].OrderReferenceNo;
//                     var getStatus = getResult[i].Status;
//                     var getCustomerCode = getResult[i].CustomerCode
//                     var getName = getResult[i].Name;

//                     var getVendorName = getResult[i].VendorName;
//                     var getWarehouseName = getResult[i].WarehouseName;
//                     var getExpectedDate = getResult[i].ExpectedDate;


//                     myGrid = myGrid + '<div id="" class="wms-srv-grid-row  reportRow">';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getExpectedRec + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getOrderReferenceNo + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getVendorName + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getName + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getWarehouseName + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getExpectedDate + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center ; display:none;;">' + getStatus + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell detailIconCell"  onclick="openDetailReport(' + getExpectedRec + ');"style="text-align:center;"><i class="fas fa-solid fa-eye"></i></div>';
//                     myGrid = myGrid + '</div>';

//                 }
//                 $('#gettopfiveorder' + obj).html(myGrid);
//             }

//         }
//     });
//     $("#dateSelecter" + obj).hide();
// }

var divHeight = $('#header-wrap').height();
$('#gettopfiveorder').css('margin-top', divHeight + 'px');

// function getSevenDateData(dateType) {
//     debugger;
//     var today = new Date();
//     var todaydate = today.getDate();
//     var dd = todaydate - dateType;
//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();
//     if (dd < 10) {
//         dd = '0' + dd;
//     }

//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     today = yyyy + '-' + mm + '-' + dd;

//     //userSelectedDate = today.split("-").reverse().join("/");
//     userSelectedDate = today.replaceAll("-", "/");
//     $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
//     //getPurchaseOrderList(userSelectedDate);
// }

function getSevenDateData(dateType) 
{
    debugger;
    var today = new Date();

    // Subtract the given number of days from today
    today.setDate(today.getDate() - dateType);

    var dd = today.getDate();
    var mm = today.getMonth() + 1; // Months are zero based in JavaScript
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;

    // Format the date to the desired format
    var userSelectedDate = today.replaceAll("-", "/");

    // Set the date in the input field
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + todaysCurrentUserDate);

    // Optionally, call a function to get purchase order list
    // getPurchaseOrderList(userSelectedDate);
}


// function getThirtyDateData(dateType) {
//     debugger;
//     var today = new Date();
//     var todaydate = today.getDate();
//     var dd = dateType - todaydate;

//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();
//     if (dd < 10) {
//         dd = '0' + dd;
//     }
//     //yyyy-mm-dd
//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     today = yyyy + '-' + mm + '-' + dd;

//     //userSelectedDate = today.split("-").reverse().join("/");
//     userSelectedDate = today.replaceAll("-", "/");
//     $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
//     //getPurchaseOrderList(userSelectedDate);
// }


function getThirtyDateData(dateType) 
{
    debugger;
    var today = new Date();
    // Subtract dateType days from today
    today.setDate(today.getDate() - dateType);

    var dd = today.getDate();
    var mm = today.getMonth() + 1; // Months are zero-based in JavaScript
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    var pastDate = yyyy + '-' + mm + '-' + dd;

    // Format the date to the desired format
    var userSelectedDate = pastDate.replaceAll("-", "/");

    // Set the date in the input field
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + todaysCurrentUserDate);

    // Optionally, call a function to get purchase order list
    // getPurchaseOrderList(userSelectedDate);
}


function getPreviousdate(dateType) 
{
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
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + todaysCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getcurrentFYData(dateType) 
{
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
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + todaysCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}


// function loadCurrentDate() {

//     var today = new Date();
//     var todaydate = today.getDate();
//     var dd = todaydate
//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();
//     if (dd < 10) {
//         dd = '0' + dd;
//     }

//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     today = yyyy + '-' + mm + '-' + dd;
//     GetCurrentUserDate = today.replaceAll("-", "/");
//     $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
// }

function loadCurrentDate() 
{
    var today = new Date();
    var previousDate = new Date();
    previousDate.setDate(today.getDate() - 7);

    function formatDate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // January is 0!
        var yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        return yyyy + '-' + mm + '-' + dd;
    }

    var todayFormatted = formatDate(today);
    var previousDateFormatted = formatDate(previousDate);

    // Replace "-" with "/"
    var GetCurrentUserDate = todayFormatted.replaceAll("-", "/");
    var PreviousUserDate = previousDateFormatted.replaceAll("-", "/");

    // Assuming 'currentfinacial' is defined somewhere in your code
    $('#txtFromToDate' + obj).val(PreviousUserDate + " to " + GetCurrentUserDate);
}

//Call the function
loadCurrentDate();

function getDate() 
{
    $("#dateSelecter" + obj).show();
}

$("#wms-srv-objrexta-popup-close").click(function () 
{
    debugger;
    $('#wms-srv-objrexta-popup').hide();
});



function createpieChart(canvasId, xValues, yValues, barColors, chartTitle) 
{
    new Chart(canvasId, 
    {
        type: "pie",
        data: 
        {
            labels: xValues,
            datasets: [{
                label: chartTitle,
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: 
        {
            title: {
                display: true,
                text: chartTitle
            },
            resposive: false
        }
    });
}