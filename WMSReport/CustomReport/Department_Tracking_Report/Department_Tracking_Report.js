var getSelectedDateCatg = "";
var getSearchFromDate = "";
var getSearchToDate = "";

$(document).ready(function () 
{
    loadCurrentDate();
    $("#btnSearchReport" + obj).click(function () 
    {
        getconsumptiondashboardList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    })
    $(".iconClose").click(function () 
    {
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
    //createPieChartconsum('Consumption-Chart21', ['WEEK', 'DAY' ,'MONTH'], ["12", "25" ,"10"], ['#ff2f2f', '#84e15a','#00acd7'],'');
    getconsumptiondashboardList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);
    
    
});

// function createPieChartconsum(canvasId, xValues, yValues, barColors, chartTitle) 
// {
//     resetCanvas(canvasId);
//     new Chart(canvasId, 
//     {
//         type: "bar",
//         data: {
//             labels: xValues,
//             datasets: 
//             [{
//                 label: chartTitle,
//                 backgroundColor: barColors,
//                 data: yValues
//             }]
//         },
//         options: 
//         {
//             title: 
//             {
//                 display: true,
//                 text: chartTitle
//             },
//             resposive: false
//         }
//     });
// }

// function resetCanvas(canvasId) {
//     var getCanvasHtml = document.getElementById(canvasId).outerHTML;
//     var getCanvasParent = $('#' + canvasId).parent();
//     $('#' + canvasId).remove();
//     getCanvasParent.append(getCanvasHtml);
// }

var getSelectedDateCatg = "";
var GetCurrentUserDate = "";
var currentfinacial = "2025/01/01";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";

var obj = 'objrexta';
var getSelectedDateCatg = "";

function getconsumptiondashboardList(getSelectedDateCatg, fromDate, toDate) 
{
    debugger;
    if (fromDate == "") 
    {
        var getFromDate = $("#txtFromToDate" + obj).val();
        var getSearchFromDate = "";
        getSearchFromDate = getFromDate.substr(0, 10);
        getSearchToDate = getFromDate.substr(14, 24);
        getconsumptiondashboardList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);
    }
    var getSearchToDate = "";
    var apiPath = wmsApiPath + "ReportStatic/ConsumtionDashboard";
    var getSearchFilter = "AssetCode";
    var SearchByDate = "SearchByDate";
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();

    var getItemname = $("#ddlItemname :selected").text();
    if(getItemname == '--Select--')
    {
        getItemname ='';
    }

    if (getSelectedDateCatg == "") 
    {

        var getSearch = $("#txtfilter" + obj).val();
        var getCustomerOrder = $("#txtfilter" + obj).val();
        //getSearchVal = getSearch.split("/").reverse().join("/");

        // if (getSearchVal != "" && getCustomerOrder == "") {
        //     getCustomerOrder = getSearchVal;
        //     getSearchFilter = SearchByDate
        // }


        if (getCustomerOrder == "") 
        {

            var postData =
            {
                customerId: getCustomerId,
                companyId: getCompanyId,
                fromDate: fromDate,
                toDate: toDate,
                itemName: getItemname
            };
        }
        else 
        {
            var postData =
            {
                customerId: getCustomerId,
                companyId: getCompanyId,
                fromDate: fromDate,
                toDate: toDate,
                itemName: getItemname
            };
        }
    }
    else {

        var searchByDate = getSelectedDateCatg.split("-").reverse().join("/");
        var CurrentDate = GetCurrentUserDate.split("-").reverse().join("/");

        var postData =
        {
            customerId: getCustomerId,
            companyId: getCompanyId,
            fromDate: fromDate,
            toDate: toDate,
            itemName: getItemname
        };
    }

    callHttpUrl(apiPath, postData, function (data) 
    {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == 200) 
        {
            var myGridList = data.Result.Table;
            if (obj == 'objrexta') 
            {
                $("#gettopfiveorder" + obj).html("");
                var myGrid = "";
                myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow" style="background-color: #1c8fca;" id="header-wrap">';
                myGrid = myGrid + '<div class="wms-srv-grid-cell" reportHeaderCell style="text-align:center;color: #b3b3b3;font-weight: 500;"><b style="color:rgb(5, 15, 20);font-size: 13px;">Company Name</b></div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell" reportHeaderCell style="text-align:center;color: #b3b3b3;font-weight: 500;"><b style="color:rgb(5, 15, 20);font-size: 13px;">Company Code</b></div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell" reportHeaderCell style="text-align:center;color: #b3b3b3;font-weight: 500;"><b style="color:rgb(5, 15, 20);font-size: 13px;">Licence Code</b></div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell" reportHeaderCell style="text-align:center;color: #b3b3b3;font-weight: 500;"><b style="color:rgb(5, 15, 20);font-size: 13px;">Item Name</b></div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell" reportHeaderCell style="text-align:center;color: #b3b3b3;font-weight: 500;"><b style="color:rgb(5, 15, 20);font-size: 13px;">Qty</b></div>';
                myGrid = myGrid + '</div>';

                for (var i = 0; i < myGridList.length; i++) 
                {
                    var getcompanyname = myGridList[i].companyname;
                    var getcompanycode = myGridList[i].companycode;
                    var getlicencecode = myGridList[i].licencecode;
                    var getItemName = myGridList[i].ItemName;
                    var getQty = myGridList[i].Qty;

                    myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getcompanyname + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getcompanycode + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getlicencecode + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getItemName + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getQty + '</div>';
                    //myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getQty + '</div>';
                    myGrid = myGrid + '</div>';

                }
                $('#gettopfiveorder' + obj).html(myGrid);
                ddlItemName();
                getBarChart();
                
            }

        }
    });
    $("#dateSelecter" + obj).hide();
}

var divHeight = $('#header-wrap').height();
$('#gettopfiveorder').css('margin-top', divHeight + 'px');

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
    //getAssetReportList(userSelectedDate);
}

function getThirtyDateData(dateType) {

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
    //getAssetReportList(userSelectedDate);
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
    //getAssetReportList(userSelectedDate);
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
    //getAssetReportList(userSelectedDate);
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
function openDatePopup() 
{
    $('#dateSelecterobjrexta').hide();
}

$("#wms-srv-objrexta-popup-close").click(function () {
   debugger;
    $('#wms-srv-objrexta-popup').hide();
});

function getBarChart()
{
    debugger;
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getClientId = mBrillWmsSession.getClientId();
    var getUserId = mBrillWmsSession.getUserId();

    var apiPath = wmsApiPath + "ReportStatic/ConsumtionDashboard";

    var postData = 
    {
        customerId: getCustomerId,
        companyId: getCompanyId,
        fromDate: "2025-03-01",
        toDate: "2025-03-18",
        itemName: ""
    };
    callHttpUrl(apiPath, postData, function (data) 
    {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') 
        {
            var getCounts = data.Result;
            var cntweek = getCounts.Table1[0].Trweek;
            var cntDAY = getCounts.Table2[0].TrDAY;
            var cntMONTH = getCounts.Table3[0].TrMONTH;
            
            createBarChart('Consumption-Chart21', ['Week','Day','Month'], [cntweek, cntDAY,cntMONTH], ['#ff2f2f', '#84e15a','#ff2f2f'], '');
            
        }
    });
}

function createBarChart(canvasId, xValues, yValues, barColor, chartTitle) 
{
    resetCanvas(canvasId);
    new Chart(canvasId, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: chartTitle,
                backgroundColor: barColor,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: chartTitle
            },
            resposive: false
        }
    });
}

function resetCanvas(canvasId) {
    var getCanvasHtml = document.getElementById(canvasId).outerHTML;
    var getCanvasParent = $('#' + canvasId).parent();
    $('#' + canvasId).remove();
    getCanvasParent.append(getCanvasHtml);
}

var spntype = [];

function ddlItemName()
{     
    debugger;
    var apiPath = wmsApiPath + 'ReportStatic/ddlItemName'; 
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();

    var postData =
    {
        customerID: getCustomerId,
        companyID: getCompanyId
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) 
        {
            spntype = [];
            //spnVendortypeId = [];
            $("#ddlItemname").html('<option value="">--Select--</option>');
            spntype.push('--Select List--');
			//spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var ItemName = grnContainerSize[i].ItemName;
                    spntype.push(ItemName);
                   // spnVendortypeId.push(vendorId);
                    $("#ddlItemname").append('<option value = "'+ ItemName +'">'+ ItemName +'</option>');
                    }
            }
        }        
    });    
}

function exportAtClient() 
{
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