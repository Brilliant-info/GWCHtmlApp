wmsLoadLayout(function () {
    //showWMSThemeLoading();
    debugger;
   // chkpagevalidity();

    hideWMSDummyDataLoading();
    CheckDummyData();
    getDashboardCounter();
    getWmsDashAssetDropdown();
    wmsAppDefaultPageFunction = getDashboardCounter;
    // createBarChart('pnlInboundOrderStatus', ['Expected Receipt', 'Receiving', 'Put Away', ''], ['100', '200', '300', '0'], ['#00acd7', '#00acd7', '#00acd7', '#ffffff'], 'Inbound Order Status');
    // createPieChart('pnlInboundOrder', ['Expected Receipt', 'Receiving', 'Put Away'], ['100', '200', '300'], ['#00acd7', '#006c87', '#235271'], 'Inbound Order');

    // createBarChart('pnlDispatchSalesOrder', ['Aug', 'Sept', 'Oct', 'Nov', 'Dec', ''], ['250', '650', '200', '500', '700', '0'], ['#00acd7', '#00acd7', '#00acd7', '#00acd7', '#ffffff'], 'Dispatch Sales Order');


    // createBarChart('pnlOutboundOrder', ['Outbound Order', 'Picking', 'Staging',''], ['250','200','310','0'], ['red', 'blue', 'green','white'], 'Outbound Order');

    //createPieChart('pnlDaywiseInvoice', ['1-Nov', '2-Nov', '3-Nov', '4-Nov','5-Nov'], ['3200', '1500','2560','2000','1756'], ['pink', 'red', 'blue', 'green','yellow'], 'Day Wise Invoice');
    //createPieChart('pnlUtilization', ['Empty', 'Full', 'Partial'], ['640','713','340'], ['red', 'yellow', 'green'], 'Utilization');

    // createBarChart('pnlInboundOrderStatus', ['Expected Receipt', 'Receiving', 'Put Away',''], ['100','200','300','0'], ['red', 'blue', 'green','white'], 'Inbound Order Status');
    // createPieChart('pnlInboundOrder', ['Expected Receipt', 'Receiving', 'Put Away'], ['100','200','300'], ['red', 'blue', 'green'], 'Inbound Order');

    // createBarChart('pnlDispatchSalesOrder', ['Aug', 'Sept', 'Oct', 'Nov','Dec',''], ['250', '650','200','500','700','0'], ['red', 'blue', 'green','pink','white'], 'Dispatch Sales Order');
    // createBarChart('pnlOutboundOrder', ['Outbound Order', 'Picking', 'Staging',''], ['250','200','310','0'], ['red', 'blue', 'green','white'], 'Outbound Order');

    // createPieChart('pnlDaywiseInvoice', ['1-Nov', '2-Nov', '3-Nov', '4-Nov','5-Nov'], ['3200', '1500','2560','2000','1756'], ['pink', 'red', 'blue', 'green','yellow'], 'Day Wise Invoice');
    // createPieChart('pnlUtilization', ['Empty', 'Full', 'Partial'], ['640','713','340'], ['red', 'yellow', 'green'], 'Utilization');
});


function chkpagevalidity()
{
    debugger;
    var CustomerID = $("#ddlcustomer").val();  
    var UserID = mBrillWmsSession.getUserId();
    var apiPath = "http://localhost:50068/api/staging/v1/loginpage/ChkPackageValidity";

    var postData = 
    {
      "CustomerID":CustomerID,
      "UserID":UserID
    }
    callHttpUrl(apiPath,postData,function(data){
     var Status = data.StatusCode;
     var result = data.Result.Message;
     if(Status=="Success")
     {
        if(result=="success")
        {
            hideWMSDummyDataLoading();
          //  CheckDummyData();
             getDashboardCounter();
            wmsAppDefaultPageFunction = getDashboardCounter;
        }        
     }
     else{
        if(result=="Expired")
        {
             alert("Your package is expired.Please contact support team");
        }
        else
        {           
            hideWMSDummyDataLoading();
           // CheckDummyData();
            getDashboardCounter();
            wmsAppDefaultPageFunction = getDashboardCounter;
            alert(result);
        }
     }
    });
}


var dashboardSearchType = 'Monthly';

function CheckDummyData() {
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/CheckDummyData";
    var apiPath = wmsApiPath + "Subscription/CheckDummyData";
    var postData =
    {
        "CompanyID": mBrillWmsSession.getCompanyId(),
        "CustomerID": mBrillWmsSession.getCustomerId(),
        "UserID": mBrillWmsSession.getUserId(),
    };

    callHttpUrl(apiPath, postData, function (result) {
        var isSuccess = result.Status;
        var getResult = result.Result.Message;

        if (getResult == "success") {

            //location.href = 'WMSApp.html';
          //  InsertDummyData();
        }

        //else if (getResult == "DirectLogin") {
        //  var loginToApp = setTimeout(function () {
        //     location.href = 'WMSApp.html';
        //}, 1000);
        //}

        else if (isSuccess == 300) {
            alert('Your subscription plan is no longer active. ');
        };

    });
}

function InsertDummyData() {
    debugger;
    showWMSDummyDataLoading();
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/InsertDummyData";
    var apiPath = wmsApiPath + "Subscription/InsertDummyData";
    var wareID = 0;
    //mBrillWmsSession.getWarehouseId();
    var postData =
    {
        "companyid": mBrillWmsSession.getCompanyId(),
        "userid": mBrillWmsSession.getUserId(),
        "customerid": mBrillWmsSession.getCustomerId(),
    };
    callHttpUrl(apiPath, postData, function (result) {
        var isSuccess = result.Status;
        var getResult = result.Result.Message;

        if (getResult == "success") {
            if (wareID == 0) {
                getwarehouseIDName();
            }

        }
        hideWMSDummyDataLoading();

        // showWMSThemeLoading();
    });

}

function showWMSDummyDataLoading() {
    $('#DummyDataLoading').css('display', 'block');
}

function hideWMSDummyDataLoading() {
    $('#DummyDataLoading').css('display', 'none');
}

function getwarehouseIDName() {
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/getWarehouseIDandName";
    var apiPath = wmsApiPath + "Subscription/getWarehouseIDandName";


    var postData =
    {
        "CompanyID": mBrillWmsSession.getCompanyId(),
        "CustomerID": mBrillWmsSession.getCustomerId(),
        "UserID": mBrillWmsSession.getUserId(),
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        // var getResult = result.Result.Table;

        if (getStatus == '200') {
            var getGridData = data.Result.Table;

            var getWarehouseId = getGridData[0].ID;
            var getWarehouseName = getGridData[0].WarehouseName;
        }
        mBrillWmsSession.setWarehouseId(getWarehouseId);
        mBrillWmsSession.setWarehouseName(getWarehouseName);
        // showWMSThemeLoading();
        getDashboardCounter();
    });
}

function createBarChartTest(canvasId, xValues, yValues, barColors, chartTitle) {
    resetCanvas(canvasId);
    new Chart(canvasId, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [
                {
                    label: 'Expected Receipt',
                    data: yValues,
                    backgroundColor: 'red'
                }
            ]
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

function createBarChart(canvasId, xValues, yValues, barColor, chartTitle) {
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

function resetCanvas(canvasId) {
    var getCanvasHtml = document.getElementById(canvasId).outerHTML;
    var getCanvasParent = $('#' + canvasId).parent();
    $('#' + canvasId).remove();
    getCanvasParent.append(getCanvasHtml);
}

function getDashboardCounter() {
    debugger;
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getClientId = mBrillWmsSession.getClientId();
    var getUserId = mBrillWmsSession.getUserId();
    var apiPath = wmsApiPath + "DashboradPage/CounterDashboardList";
    var postData = {
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "CompanyID": getCompanyId,
        "ClientID": getClientId,
        "WarehouseID": getWarehouseId
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            debugger;
            var getCounts = data.Result.Table[0];
            var cntTotalInward = getCounts.TotalInward;
            var cntTotalReceived = getCounts.TotalReceiving;
            var cntTotalOutward = getCounts.TotalOutward;
            var cntTotalDispatch = getCounts.TotalDispatch;
            var cntTotalCancel = getCounts.TotalCancel;

            $('#cntTotalInward').html(cntTotalInward);
            $('#cntTotalReceived').html(cntTotalReceived);
            $('#cntTotalOutward').html(cntTotalOutward);
            $('#cntTotalDispatch').html(cntTotalDispatch);
            $('#cntTotalCancel').html(cntTotalCancel);
            getInwardBarchart();
        }
    });
}

function getInwardBarchart() {
    debugger;
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getClientId = mBrillWmsSession.getClientId();
    var getUserId = mBrillWmsSession.getUserId();

    var apiPath = wmsApiPath + "DashboradPage/InwardBarchartList";

    var postData = {
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "CompanyID": getCompanyId,
        "VendorID": "0",
        "WarehouseID": getWarehouseId
    }
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            var getTotalPurchaseOrder = data.Result.Table[0].TotalPurchaseOrder;
            var getTotalReceiving = data.Result.Table[0].TotalReceiving;
            var getTotalPutAway = data.Result.Table[0].TotalPutAway;

            createBarChart('pnlInboundOrderStatus', ['Expected Receipt', 'Receiving', 'Quality Check', 'Put Away', ''], [getTotalPurchaseOrder, getTotalReceiving, getTotalPutAway, '0'], ['#00acd7', '#00acd7', '#00acd7', '#ffffff'], 'Inward Order Status');
            createBarChart('pnlInboundOrderStatus', ['Expected Receipt', 'Receiving', 'Put Away', ''], [getTotalPurchaseOrder, getTotalReceiving, getTotalPutAway, '0'], ['#FFA500', '#008080', '#A52A2A', '#D3D3D3'], 'Inward Order Status');
        }
        getOutwardPieChart();
    });
}

function getOutwardPieChart() {
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getClientId = mBrillWmsSession.getClientId();
    var getUserId = mBrillWmsSession.getUserId();

    var apiPath = wmsApiPath + "DashboradPage/OutwardPieChart";

    var postData = {
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "CompanyID": getCompanyId,
        "ClientID": getClientId,
        "WarehouseID": getWarehouseId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            var getTotalSaleOrder = data.Result.Table[0].TotalSaleOrder;
            var getTotalPicking = data.Result.Table[0].TotalPicking;
            var getTotalDispatch = data.Result.Table[0].TotalDispatch;

            createPieChart('pnlInboundOrder', ['Sales Order', 'Picking', 'Dispatch'], [getTotalSaleOrder, getTotalPicking, getTotalDispatch], ['#ff2f2f', '#84e15a', '#00acd7',], 'Outward Order');
        }
        getDispatchBarChart();
    });
}

function getDispatchBarChart() {
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getClientId = mBrillWmsSession.getClientId();
    var getUserId = mBrillWmsSession.getUserId();

    var apiPath = wmsApiPath + "DashboradPage/DispatchCountLast4Month";

    var postData = {
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "CompanyID": getCompanyId,
        "ClientID": getClientId,
        "WarehouseID": getWarehouseId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            var getDispatch1Month = data.Result.Table[0].firstMonth;
            var getDispatch2Month = data.Result.Table[0].secondMonth;
            var getDispatch3Month = data.Result.Table[0].thirdMonth;
            var getDispatch4Month = data.Result.Table[0].fourthMonth;

            var getMonthLabel1 = data.Result.Table1[0].label1;
            var getMonthLabel2 = data.Result.Table1[0].label2;
            var getMonthLabel3 = data.Result.Table1[0].label3;
            var getMonthLabel4 = data.Result.Table1[0].label4;

            createBarChart('pnlDispatchSalesOrder', [getMonthLabel1, getMonthLabel2, getMonthLabel3, getMonthLabel4, ''], [getDispatch1Month, getDispatch2Month, getDispatch3Month, getDispatch4Month, '0'], ['#8a2be2', '#00acd7', '#deb887', '#00acd7', '#ffffff'], 'Dispatch Sales Order');
        }
        getPendingOrderDashboard();
    });


}

function getPendingOrderDashboard() {
    debugger;
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getClientId = mBrillWmsSession.getClientId();
    var getUserId = mBrillWmsSession.getUserId();
    var getVendorId = mBrillWmsSession.getUserId();

    $('#tlbPendingOrderDashboard').html('');
    var strPendingOrder = '<div class="wms-srv-grid-header">' +
        '<div class="wms-srv-grid-cell">Order</div>' +
        '<div class="wms-srv-grid-cell">Order Date</div>' +
        '<div class="wms-srv-grid-cell">Order Type</div>' +
        '<div class="wms-srv-grid-cell">Status</div>' +
        '<div class="wms-srv-grid-cell">Created By</div>' +
        '</div>';
    $('#tlbPendingOrderDashboard').append(strPendingOrder);
    var apiPath = wmsApiPath + "DashboradPage/GetInwardOutwardList";
    var postData = {
        "WarehouseID": getWarehouseId,
        "VendorID": "0",
        "UserID": getUserId,
        "ClientID": getClientId,
        "CustomerID": getCustomerId
    };
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            var getPendingOrder = data.Result.Table;
            for (var i = 0; i < getPendingOrder.length; i++) {
                var getOrderNumber = getPendingOrder[i].OrderNumber;
                var getOrderDate = getPendingOrder[i].POdate;
                var getOrderType = getPendingOrder[i].OrderType;
                var getOrderStatus = getPendingOrder[i].StatusName;
                var getOrderCreatedBy = getPendingOrder[i].CreatedBy;
                var strPendingOrderRow =
                    '<div class="wms-srv-grid-row">' +
                    '<div class="wms-srv-grid-cell">' + getOrderNumber + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getOrderDate + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getOrderType + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getOrderStatus + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getOrderCreatedBy + '</div>' +
                    '</div>';
                $('#tlbPendingOrderDashboard').append(strPendingOrderRow);
            }
        }
        getSkuInventoryDashboard();
    });

}

// function getSkuInventoryDashboard(){
//     var getCompanyId = mBrillWmsSession.getCompanyId();
//     var getWarehouseId = mBrillWmsSession.getWarehouseId();
//     var getCustomerId = mBrillWmsSession.getCustomerId();
//     var getClientId = mBrillWmsSession.getClientId();
//     var getUserId = mBrillWmsSession.getUserId();

//     $('#tlbSkuInventoryDashboard').html('');
//     var strSkuInventory = '<div class="wms-srv-grid-header">' +
//         '<div class="wms-srv-grid-cell">SKU Code</div>' +
//         '<div class="wms-srv-grid-cell">Description</div>' +
//         '<div class="wms-srv-grid-cell">Qty In Hand</div>' +
//         '<div class="wms-srv-grid-cell">Allocated Qty</div>' +
//         '<div class="wms-srv-grid-cell">Hold Qty</div>' +
//         '<div class="wms-srv-grid-cell">Total Qty</div>' +
//         '</div>';
//     $('#tlbSkuInventoryDashboard').append(strSkuInventory);
//     var apiPath = wmsApiPath + "DashboradPage/GetTopInventoryList";
//     var postData = {
//         "UserId": getUserId,
//         "CustomerId": getCustomerId,
//         "CompanyID": getCompanyId
//     }
//     callHttpUrl(apiPath, postData, function (data) {
//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         if (getStatusCode.toLocaleLowerCase() == 'success') {
//             var getSkuInventory = data.Result.Table;
//             for (var i = 0; i < getSkuInventory.length; i++) {
//                 var getSkuCode = getSkuInventory[i].SkuCode;
//                 var getDescription = getSkuInventory[i].Description;
//                 var getQtyinhand = getSkuInventory[i].Qtyinhand;
//                 var getAllocated = getSkuInventory[i].Allocated;
//                 var getHold = getSkuInventory[i].Hold;
//                 var getTotal = getSkuInventory[i].Total;

//                 var strSkuInventoryRow = '<div class="wms-srv-grid-row">' +
//                     '<div class="wms-srv-grid-cell">' + getSkuCode + '</div>' +
//                     '<div class="wms-srv-grid-cell">' + getDescription + '</div>' +
//                     '<div class="wms-srv-grid-cell">' + getQtyinhand + '</div>' +
//                     '<div class="wms-srv-grid-cell">' + getAllocated + '</div>' +
//                     '<div class="wms-srv-grid-cell">' + getHold + '</div>' +
//                     '<div class="wms-srv-grid-cell">' + getTotal + '</div>' +
//                     '</div>';
//                 $('#tlbSkuInventoryDashboard').append(strSkuInventoryRow);
//             }
//         }
//     });
// }

// function showWMSThemeLoading() {
//     $('#themeWMSLoading').css('display', 'block');
// }
// function hideDummyDataLoading() {
//     $('#DummyDataLoading').css('display', 'none');
// }

/*=========================== ASSET REPORT =============================*/
function createDashAssetPieChart(canvasId, xValues, yValues, barColors, chartTitle)
{
    // var Departmentarry = [xValues];
    // var Totalarry = [yValues];
    // var color = [barColors];

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

function getWmsDashAssetDropdown()
{     
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();

    var apiPath = wmsApiPath + 'ReportStatic/AssetReportDropdown'; 
    //var apiPath = 'http://localhost:50068/api/staging/v1/ReportStatic/AssetReportDropdown'; 
    var postData=
    {
        WarehouseId: getWarehouseId,
        CompanyId:getCompanyId,
        CustomerId: getCustomerId,
        UserId: getUserId
    }
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if(isStatus == 200) 
        {
        /*    spnVendortype = [];
            spnVendortypeId = [];
            $("#ddlDashAssetReport").html('');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table5;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                {
                    var Title= grnContainerSize[i].Title;
                    spnVendortype.push(Title);
                    $("#ddlDashAssetReport").append('<option value = '+ Title +'>'+ Title +'</option>');
                }
            }
            $("#ddlDashAssetReport").off();
            $("#ddlDashAssetReport").change(function(){
                var getMonth = $(this).find('option:selected').text();
                getWmsAssestDashboard(getMonth);
            });

            var defaultMonth = $('#ddlDashAssetReport option:selected').text(); 
             getWmsAssestDashboard(defaultMonth);
            */
            
             var myGridList = data.Result;
             var grnContainerSize = myGridList.Table5;
            if (grnContainerSize.length > 0) 
            {
                var lastIndex = grnContainerSize.length - 1;
                var defaultMonth = grnContainerSize[lastIndex].Title;
               // alert(defaultMonth);
                getWmsAssestDashboard(defaultMonth);
            }
            
        }
    });
}

function getWmsAssestDashboard(month)
{
    //debugger;
    var apiPath = wmsApiPath + 'ReportStatic/AssetReportlist';
	//var apiPath = 'http://localhost:50068/api/staging/v1/ReportStatic/AssetReportlist';
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();

    var getDepartmentType = 'All';
    var getProjectNameType = 'All';
    var getLocationtype = 'All';
    var getEmpIDtype = 'All';
    var getBUHeadtype = 'All';
    var getTitletype = month;
    var getFlagtype = 'All';

    var postData =
    {
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "WarehouseId":getWarehouseId,
        "CompanyId": getCompanyId,
        "DepartmentType": getDepartmentType,
        "ProjectName": getProjectNameType,
        "Location": getLocationtype,
        "EmpID": getEmpIDtype,
        "BUHead": getBUHeadtype,
        "Title": getTitletype,
        "flag": getFlagtype
    }
   
    callHttpUrl(apiPath, postData, function (data) 
    {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
        var Departmentarry = [];
        var Totalarry = [];
        var Colorarr = ['#ff2f2f','#008080', '#DEB887','#84e15a','#00acd7','#F4A460','#F5F5F5','#b91d47','#00aba9','#4B0082','#FF6347','#2b5797','#e8c3b9','#1e7145'];

            var myGridList = data.Result.Table;
            $('#pnlAssetgridlist').html('');  	            
            var gridTable = '';

            if(myGridList == '')
            {
                gridTable = gridTable + '<div class="wms-srv-grid-header  reportHeaderRow" id="header-wrap" style="background-color:#efefef !important;display:none;">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">New Asset Tag</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">OLD Asset Tag</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Ticket No.</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Location Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Flag</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Date Of Purchase</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Year</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">EMAIL ID</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">EMP ID</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Department</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">BU Head</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Project Name</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">PR Details</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Project Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Title</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Requirements Types</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">IMEINO</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Make</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Model</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-header  reportHeaderRow" id="header-wrap" style="background-color:#efefef !important;">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">No Record Found!!</div>';
                gridTable = gridTable + '</div>';
            }
            else
            {
                // GRID HEADER        
                gridTable = gridTable + '<div class="wms-srv-grid-header  reportHeaderRow" id="header-wrap" style="background-color:#efefef !important;">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">New Asset Tag</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">OLD Asset Tag</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Ticket No.</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Location Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Flag</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Date Of Purchase</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Year</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">EMAIL ID</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">EMP ID</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Department</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">BU Head</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Project Name</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">PR Details</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Project Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Title</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Requirements Types</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">IMEINO</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Make</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Model</div>';
                gridTable = gridTable + '</div>';
            // GRID HEADER
            }

            for (var i = 0; i <myGridList.length;i++)
             {
                var getNewAssetTag = myGridList[i].NewAssetTag;
                var getTicketNo = myGridList[i].TicketNo;
                var getBUHead = myGridList[i].BUHead;
                var getDateOfPurchase = myGridList[i].DateOfPurchase;
                var getDepartment = myGridList[i].Department;
                var getEMAILID = myGridList[i].EMAILID;
                var getEMPID = myGridList[i].EMPID;
                var getPRDetails = myGridList[i].PRDetails;
                //var getproductcode = myGridList.Table[i].productcode;
                var getYear = myGridList[i].Year;
                var getRequirementsTypes = myGridList[i].RequirementsTypes;
                var getProjectName = myGridList[i].ProjectName;
                var getProjectCode = myGridList[i].ProjectCode;
                var getTitle = myGridList[i].Title;
                var getoldAssetTag = myGridList[i].oldAssetTag;
                var getlocationcode = myGridList[i].locationcode;
                var getflag = myGridList[i].flag;
                var getIMEINO= myGridList[i].IMEINO;
                var getMake = myGridList[i].Make;
                var getModel = myGridList[i].Model;
                
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row reportRow" style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getNewAssetTag + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getoldAssetTag + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getTicketNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getlocationcode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getflag + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getDateOfPurchase + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getYear + "</div>";             
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getEMAILID + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getEMPID + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getDepartment + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getBUHead + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getProjectName + "</div>";             
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getPRDetails + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getProjectCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getTitle + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getRequirementsTypes + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getIMEINO + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getMake + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getModel + "</div>";
                gridTable = gridTable + '</div>';

            }
            $('#pnlAssetgridlist').html(gridTable);

            var myGridList = data.Result;
            $('#pnlDashAssetDept').html('');  	            
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap" style="background-color:#efefef !important;">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Department</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Total</div>';
            gridTable = gridTable + '</div>';
            // GRID HEADER

            var totalAssetCount = 0;
            for (var i = 0; i <myGridList.Table1.length;i++)
             {
                var getDepartment = myGridList.Table1[i].Department;
                var getTotal = myGridList.Table1[i].Total;
                //var getLoccode = myGridList.Table[i].Loccode;
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getDepartment + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getTotal + "</div>";
                gridTable = gridTable + '</div>';
                totalAssetCount = totalAssetCount + Number(getTotal);
                Departmentarry.push(getDepartment);  
                Totalarry.push(getTotal);     
            }
            gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
            gridTable = gridTable + "<div class='wms-srv-grid-cell'><b>Total Asset</b></div>";
            gridTable = gridTable + "<div class='wms-srv-grid-cell'><b>" + totalAssetCount + "</b></div>";
            gridTable = gridTable + '</div>';
            $('#pnlDashAssetDept').html(gridTable);
            createDashAssetPieChart('pnlDashAssetReport',Departmentarry,Totalarry,Colorarr,'Asset Report - ' + month);
        }
        else {
           // alert('Unable to connect');
        }
    });
}
