var getSelectedDateCatg = "";
var GetCurrentUserDate = "";
var currentfinacial = "01/02/2022";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";
var getSkuId = "";
// Session parameters ;
var getUserId = mBrillWmsSession.getUserId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCompanyId();
//var wmsApiPath = 'http://173.212.244.46/BWMSWebAPITest/api/staging/v1/'
var obj = 'objrexta';

function openDatePopup() {
    $('#dateSelecterobjrexta').hide();
}

function getDate() {
    $("#dateSelecter" + obj).show();


}

$(document).ready(function () {
    
    //createLineChart('FSN-Line-Chart', ['SKU 1', 'SKU-2', 'SKU-3', 'SKU-4', 'SKU-5', 'SKU-6', 'SKU-7'], ['100', '200', '250', '300', '330', '350', '380'], 'FSN Moving');
 //   createPieChart('FSN-Pie-Chart', ['Fast-Moving', 'Slow-Moving', 'Non-Moving'], ['50', '30', '20'], ['#0984e3', '#1B1464', '#ffbe76'], 'FSN Moving');
   
    loadCurrentDate();
    $("#btnSearchReport" + obj).click(function () {
        getPurchaseOrderList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    //    getFSNPieChart();
    //    getFSNLineChart();

    })
    $(".iconClose").click(function () {
        $("#dateSelecter" + obj).hide();
    });
   getSevenDateData(7);
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
    getPurchaseOrderList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    //  getFSNReportList() ;
    // getFSNPieChart();
  //  getFSNLineChart();
})

function getPurchaseOrderList(getSelectedDateCatg, fromDate, toDate) 
{
    debugger;
    if (fromDate == "") {
        var getFromDate = $("#txtFromToDate" + obj).val();
        var getSearchFromDate = "";
        getSearchFromDate = getFromDate.substr(0, 10);
        getSearchToDate = getFromDate.substr(14, 24);
        getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);
    }
    var getSearchToDate = "";
    var apiPath = wmsApiPath + "ReportStatic/getFSNReport";
    //var apiPath = "http://localhost:50068/api/staging/v1/ReportStatic/getFSNReport";
    var getSearchFilter = "OrderNo"
    var SearchByDate = "SearchByDate";
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();



    if (getSelectedDateCatg == "") {

        var getSearch = $("#txtfilter" + obj).val();
        var getCustomerOrder = $("#txtCustomerOrderNo" + obj).val();
        getSearchVal = getSearch.split("/").reverse().join("/");

        if (getSearchVal != "" && getCustomerOrder == "") {
            getCustomerOrder = getSearchVal;
            getSearchFilter = SearchByDate
        }


        if (getCustomerOrder == "") {


            var postData = 
            {

                "CustId":getCustomerId,
                "WhId": getWarehouseId,
                "UserId":getUserId,
                "CompanyId": getCompanyId,
                "FrmDate": fromDate,
                "ToDate": toDate,
                "skuid": "2"
            };
        }
        else {
            var postData = 
            {
                "CustId":getCustomerId,
                "WhId": getWarehouseId,
                "UserId":getUserId,
                "CompanyId": getCompanyId,
                "FrmDate": "01/02/2022",
                "ToDate": "02/02/2023",
                "skuid": "2"
            };
        }
        // else{
        //     alert("Please Enter Valid Data..!!");
        // }

    }
    else {

        var searchByDate = getSelectedDateCatg.split("-").reverse().join("/");
        var CurrentDate = GetCurrentUserDate.split("-").reverse().join("/");

        var postData = 
        {
            "CustId":getCustomerId,
            "WhId": getWarehouseId,
            "UserId":getUserId,
            "CompanyId": getCompanyId,
            "FrmDate": searchByDate,
            "ToDate": CurrentDate,
            "skuid": "2"
        };
    }

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.Code;
        if (getStatus == 200) {
            var getResult = data.Result.Table;
            if (obj == 'GRNRPT') {
                $("#gettopfiveorderobjrexta" + obj).html("");
                var myGrid = "";
                myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">SKU Code</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Average Qty</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Turnover Ratio</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Usable Qty</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Category</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell" style="text-align:center;color: #b3b3b3;font-weight: 500;"></div>';

                myGrid = myGrid + '</div>';
                for (var i = 0; i < getGridData.Table.length; i++) 
            {   
                var getProductCode = data.Result.Table.ProductCode;
                var getAverage = data.Result.Table.Average;
                var getTurnoverRatio = data.Result.Table.Turnover_Ratio;
                var getAnualUseQty = data.Result.Table.UseQty;
                var getcategory = data.Result.Table.category;

                    myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getProductCode + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getAverage + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getTurnoverRatio + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getAnualUseQty + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getcategory + '</div>';
                    myGrid = myGrid + '</div>';

                }
                $('#gettopfiveorderobjrexta' + obj).html(myGrid);
            }

        }
        if(getStatus == 200)
        {
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            var Data = data.Result;
        if (getStatusCode.toLocaleLowerCase() == 'success') 
          {
            var getFastMoving = Data.Table1[0].FastMoving;
            var getSlowMoving = Data.Table1[0].SlowMoving;
            var getNonMoving = Data.Table1[0].NonMoving;

            createPieChart('FSN-Pie-Chart', ['Fast-Moving','Slow-Moving','Non-Moving'], [getFastMoving,getSlowMoving,getNonMoving], ['#ff2f2f', '#008080', '#DEB887'], '');
          }
        }
        if(getStatus == 200)
        {
           var getStatus = data.Status;
           var getStatusCode = data.StatusCode;
           var Data = data.Result;
           if (getStatusCode == 'Success') 
           {
            var getFastMoving = Data.Table2[0].FastMoving;
            var getSlowMoving = Data.Table2[0].SlowMoving;
            var getNonMoving = Data.Table2[0].NonMoving;
            var getTurnover_Ratio = Data.Table2[0].Turnover_Ratio;

            //createLineChart('FSN-Line-Chart', ['Fast-Moving'], [getFastMoving], 'SKU');
            createLineChart('FSN-Line-Chart', ['FastMoving','SlowMoving','NonMoving','Turnover_Ratio'], [getFastMoving,getSlowMoving,getNonMoving,getTurnover_Ratio],'FSN Moving');
           }
        }
        if(getStatus == 200)
        {
            var myGridList = data.Result;
            var getGridData = myGridList;

            var gridTable = '';

            // GRID HEADER' 
        
            
            gridTable = gridTable + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Warehouse Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Sku Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Sku Description</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Category</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Turnover Ratio</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Usable Ratio</div>';
            gridTable = gridTable + '</div>';
        
            $('#gettopfiveorderobjrexta').html(gridTable);

            for (var i = 0; i < getGridData.Table.length; i++) 
            {   
                var getWarehouseName = data.Result.Table[0].WarehouseName;
                var getProductCode = data.Result.Table[0].ProductCode;
                var getSkuDescription = data.Result.Table[0].SkuDescription;
                var getCategoryName = data.Result.Table[0].CategoryName;
                var getTurnover_Ratio = data.Result.Table[0].Turnover_Ratio;
                var getUseQty = data.Result.Table[0].UseQty;

                // GRID ROW
                gridTable = '';

                gridTable = gridTable + '<div class="wms-srv-grid-row reportRow" id="header">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getWarehouseName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getProductCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getSkuDescription + '</div>'; 
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getCategoryName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getTurnover_Ratio + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getUseQty + '</div>';
                gridTable = gridTable + '</div>';

                $('#gettopfiveorderobjrexta').append(gridTable);
            }
        }
        else 
        {
            alert('Unable to connect Server!!');
        }

    });
    $("#dateSelecter" + obj).hide();
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

function createLineChart(canvasId, xValues, yValues, chartTitle) {
    resetCanvas(canvasId);
    new Chart(canvasId, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: chartTitle,
                //backgroundColor: barColors,
                borderColor: "blue",
                data: yValues,
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: chartTitle
            },
            resposive: false
        }
    });
}

function createPieChart(canvasId, xValues, yValues, barColors, chartTitle) {
    resetCanvas(canvasId);
    new Chart(canvasId, {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                label: chartTitle,
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: chartTitle
            },
            resposive: false
        }
    });
}

// function getFSNPieChart() 
// {
//     debugger;
//     var apiPath = wmsApiPath + "ReportStatic/getFSNReport";
//     //var apiPath = "http://localhost:50068/api/staging/v1/ReportStatic/getFSNReport";
//     getFromDateSelected = $("#txt_FromdatePickerobjrexta").val();
//     getToDateSelected = $("#txt_TodatePickerobjrexta").val();
//     var postData = 
//     {
        
//         "CustId":  getCustomerId,
//         "WhId": getWarehouseId,
//         "UserId": getUserId,
//         "CompanyId": getCompanyId,
//         "FrmDate": "01/02/2022",
//         "ToDate": "02/02/2023",
//         "skuid": "2"
          
//     };
//     callHttpUrl(apiPath, postData, function (data) {
//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         var Data = data.Result;
//         if (getStatusCode.toLocaleLowerCase() == 'success') 
//         {
//             var getFastMoving = Data.Table1[0].FastMoving;
//             var getSlowMoving = Data.Table1[0].SlowMoving;
//             var getNonMoving = Data.Table1[0].NonMoving;

//             createPieChart('FSN-Pie-Chart', ['Fast-Moving','Slow-Moving','Non-Moving'], [getFastMoving,getSlowMoving,getNonMoving], ['#ff2f2f', '#008080', '#DEB887'], '');
//         }
//     });
//     getFSNReportList();
    
// }

// function getFSNLineChart() 
// {
//     debugger;
//     var apiPath = wmsApiPath + "ReportStatic/getFSNReport";
//     //var apiPath = "http://localhost:50068/api/staging/v1/ReportStatic/getFSNReport";
//     var postData = 
//     {
        
//         "CustId":  getCustomerId,
//         "WhId": getWarehouseId,
//         "UserId": getUserId,
//         "CompanyId": getCompanyId,
//         "FrmDate": "01/02/2022",
//         "ToDate": "02/02/2023",
//         "skuid": "2"
          
//     };
//     callHttpUrl(apiPath, postData, function (data) {
//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         if (getStatusCode == 'Success') 
//         {
//             var getFastMoving = data.Result.Table2[0].FastMoving;
//             createLineChart('FSN-Line-Chart', ['Fast-Moving'], [getFastMoving], 'SKU');
//         }
//     });
//     getFSNReportList();
    
// }

// function getFSNReportList() 
// {
//   debugger;
//     var apiPath = wmsApiPath + "ReportStatic/getFSNReport";
//     // var apiPath = "http://localhost:50068/api/staging/v1/ReportStatic/getFSNReport";
//     var postData =
//     {
//         "CustId":  getCustomerId,
//         "WhId": getWarehouseId,
//         "UserId": getUserId,
//         "CompanyId": getCompanyId,
//         "FrmDate": "01/02/2022",
//         "ToDate": "02/02/2023",
//         "skuid": "2"
//     };
//     callHttpUrl(apiPath, postData, function (data) 
//     {
//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         if (getStatusCode == 'Success') 
//         { 
//             var myGridList = data.Result;
//             var getGridData = myGridList;

//             var gridTable = '';

//             // GRID HEADER' 
        
            
//             gridTable = gridTable + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
//             gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">SKU Code</div>';
//             gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Average Qty</div>';
//             gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Turnover Ratio</div>';
//             gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Usable Qty</div>';
//             gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Category</div>';
//             gridTable = gridTable + '</div>';
        
//             $('#gettopfiveorderobjrexta').html(gridTable);

//             for (var i = 0; i < getGridData.Table.length; i++) 
//             {   
//                 var getProductCode = data.Result.Table[0].ProductCode;
//                 var getAverage = data.Result.Table[0].Average;
//                 var getTurnoverRatio = data.Result.Table[0].Turnover_Ratio;
//                 var getAnualUseQty = data.Result.Table[0].UseQty;
//                 var getcategory = data.Result.Table1[0].Category;
                

//                 // GRID ROW
//                 gridTable = '';

//                 gridTable = gridTable + '<div class="wms-srv-grid-row reportRow" id="header">';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getProductCode + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getAverage + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getTurnoverRatio + '</div>'; 
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getAnualUseQty + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getcategory + '</div>';
//                 gridTable = gridTable + '</div>';

//                 $('#gettopfiveorderobjrexta').append(gridTable);
//             }
//         }
//         else {
//             alert('Unable to connect Server!!');
//         }
//     });
// }
var divHeight = $('#header').height(); 
$('#gettopfiveorderobjrexta').css('margin-top', divHeight+'px');

function resetCanvas(canvasId) 
{
    var getCanvasHtml = document.getElementById(canvasId).outerHTML;
    var getCanvasParent = $('#' + canvasId).parent();
    $('#' + canvasId).remove();
    getCanvasParent.append(getCanvasHtml);
}