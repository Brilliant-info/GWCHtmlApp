var CurrentPage = 1;
var getTotalRecords = '100';
var getDispatchRecLimit = 200;
var searchfilter = '0';
var searchvalue = '0';
var globalDispatchID = '0';
var getBatchNo = '0';
var getOrderNo = '0';
var getobject = "SalesOrder";
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId = mBrillWmsSession.getClientId();
var getglobleId = '';

function initDispatch() {
    prepareGrid('pnlWmsDispatchHead', 60);
    prepareGrid('pnlDispatchScanner', 80);
    getDispatchList(searchfilter, searchvalue);
}

wmsLoadLayout(function () {
    initDispatch();
    getDispatchList();
});

function openDispacthlist(oid) {
    debugger;
    $('#wms-srv-dispatchlist-popup').show();
    $('#wms-srv-dispatchlist-popup-close').off();
    $('#wms-srv-dispatchlist-popup-close').click(function () {
        $('#wms-srv-dispatchlist-popup').hide();
    });
    getBatchDispatchList(oid);
}

function openDispacthViewDetails(oid) {
    $('#wms-srv-dispatchviewdetail-popup').show();
    $('#wms-srv-dispatchviewdetail-popup-close').off();
    $('#wms-srv-dispatchviewdetail-popup-close').click(function () {
        $('#wms-srv-dispatchviewdetail-popup').hide();
    });
}

function openDispacthDetails(oid, batchID, getStatus, getpackingNo) {

    $('#wms-srv-dispatchdetail-popup').show();
    $('#wms-srv-dispatchdetail-popup-close').off();
    $('#wms-srv-dispatchdetail-popup-close').click(function () {
        $('#wms-srv-dispatchdetail-popup').hide();
    });
    Carriertype();
    getBatchDispatchDetailList(oid, getStatus, batchID, getpackingNo);
}

function opendispatchlabelprint(oid) {
    $('#wms-srv-dispatchlabelprint-popup').show();
    $('#wms-srv-dispatchlabelprint-popup-close').off();
    $('#wms-srv-dispatchlabelprint-popup-close').click(function () {
        $('#wms-srv-dispatchlabelprint-popup').hide();
    });
}

function openbulkdispacth(oid) {
    $('#wms-srv-bulkdispacth-popup').show();
    $('#wms-srv-bulkdispacth-popup-close').off();
    $('#wms-srv-bulkdispacth-popup-close').click(function () {
        $('#wms-srv-bulkdispacth-popup').hide();
    });
}

function openTrackingno(getOrderNo) {
    $('#wms-srv-Trackingno-popup').show();
    $('#wms-srv-Trackingno-popup-close').off();
    $('#wms-srv-Trackingno-popup-close').click(function () {
        $('#wms-srv-Trackingno-popup').hide();
    });
    getTrackingList(getOrderNo)
    showCurrentDate();
}

function showCurrentDate() {
    var getOrderNo = $('#txtDate').val().trim();
    if (getOrderNo == 'To be generated') {
        getCurrentDate = setCurrentDate();
        $('#txtDate').val(getCurrentDate);
    }
}

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

function getDispatchList(searchfilter, searchvalue) {
    debugger;
    var apiPath = wmsApiPath + 'Dispatch/GetDispatchList';
    // var apiPath = "http://localhost:50068/api/staging/v1/Dispatch/GetDispatchList";

    var getPageObject = $('#ddlOrderType').val();
    var filtercol = $('#ddlPickingsearch').val();
    var filterval = $('#txtPickingvalue').val();
    var searchfilter = $('#searchdispatch').val();
    var searchvalue = $('#valuedispatch').val();
    if (searchfilter == '') {
        searchfilter = '0';
        searchvalue = '0';
    }

    var postData =
    {
        CurrentPage: CurrentPage,
        recordLimit: getDispatchRecLimit,
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        UserId: getUserId,
        Object: getPageObject,
        filtercol: searchfilter,
        filterval: searchvalue,
        ClientId: getClientId
    }

    //PickingListGrid
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblgetDispatchList').html('');
            var myGridList = data.Result;
            //var getTotalRecords = Number(myGridList.DispatchListResult[0].Dashboard[0].Packing) + Number(myGridList.DispatchListResult[0].Dashboard[0].Dispatch);
            var getTotalRecords = myGridList.DispatchListResult[0].Dashboard[0].Shipped;
            // GET DASHBOARD COUNTS
            var getOutboundOrder = myGridList.DispatchListResult[0].Dashboard[0].OutboundOrder;
            var getAllocated = myGridList.DispatchListResult[0].Dashboard[0].Allocated;
            var getPicking = myGridList.DispatchListResult[0].Dashboard[0].Picking;
            var getQualityCheck = myGridList.DispatchListResult[0].Dashboard[0].QC;
            var getPacking = myGridList.DispatchListResult[0].Dashboard[0].Packing;
            var getDispatch = myGridList.DispatchListResult[0].Dashboard[0].Shipped;

            $('#dashOutboundOrdercount').html(getOutboundOrder);
            $('#dashAllocatedcount').html(getAllocated);
            $('#dashPickingcount').html(getPicking);
            $('#dashQualityCheckcount').html(getQualityCheck);
            $('#dashStagingcount').html(getPacking);
            $('#dashPassedBatchcount').html(getDispatch);
            // GET DASHBOARD COUNTS

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            // gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap">';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Dispatch No.</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch ID</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order No.</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Name</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Reference No</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Client Code</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Shipping By</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Transporter Name</div>';																										  
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Shipping Address</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px; text-align:center;">Status</div>';
            // gridTable = gridTable + '</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Dispatch No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch ID</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Reference No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Warehouse Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Transporter Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Client Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Shipping Address</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Delivery Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Shipping By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px; text-align:center;">Status</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.DispatchListResult[0].DispatchList;
            debugger;
            for (var i = 0; i < getGridData.length; i++) {
                var getpackingNo = getGridData[i].PackingNo;
                var getBatchNo = getGridData[i].BatchNo;
                var getBatchName = getGridData[i].BatchName;
                var getOrderNo = getGridData[i].OrderNo;
                var getCustPONo = getGridData[i].CustPONo;
                var getPickUpBy = getGridData[i].PackingBy;
                var getShippingAddress = getGridData[i].ShippingAddress;
                var getStatus = getGridData[i].Status;
                var getStatusId = getGridData[i].StatusID;
                var getOrderType = getGridData[i].OrderType;
                var getTranspoterName = getGridData[i].TranspoterName;
                var getClientCode = getGridData[i].code;
                var getWarehouseCode = getGridData[i].WarehouseCode;
                var getDeliveryType = getGridData[i].DeliveryType;

                // GRID ROW
                // gridTable = gridTable + '<div id="div' + getOrderNo +'" class="wms-srv-grid-row">';                
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getpackingNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustPONo + "</div>";
                //  gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPickUpBy + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTranspoterName + "</div>";

                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindDispatchListStatusControl(getpackingNo,getBatchNo, getStatus,getStatusId) + "</div>";
                // gridTable = gridTable + '</div>';
                gridTable = gridTable + '<div id="div' + getOrderNo + '" class="wms-srv-grid-row">';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="selectGridRow(this);" class="messageCheckbox"></div>';  
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="selectGridRow(this);" class="messageCheckbox" data-id="' + getpackingNo + '" data-orderid="' + getOrderNo + '"></div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getpackingNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustPONo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getWarehouseCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTranspoterName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDeliveryType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPickUpBy + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindDispatchListStatusControl(getpackingNo, getBatchNo, getStatus, getStatusId) + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindDispatchActionControl(getpackingNo, getBatchNo, getStatus, getStatusId) + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#tblgetDispatchList').html(gridTable);
            $('.wms-srv-grey').attr('onclick', 'return false');

            setupGridPagingList('tlbOutbounddispatchGridPager', CurrentPage, getTotalRecords, getDispatchList, getDispatchRecLimit);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}
function openDispatchDetailReport(dataVal) {
    debugger;
    mBrillWmsSession.setReportDetailId(dataVal);
    window.open("WMSReport/DetailReport/Dispatch-Order-Detail-Template.html");
}

function bindDispatchActionControl(getpackingNo, getBatchNo, getStatus, getStatusId) {
    debugger;
    var htmlControl = '';

    htmlControl = htmlControl + '<a href="#" title="Report" data-orderid="' + getpackingNo + '" class="wms-srv-icononly" onclick="openDispatchDetailReport(' + getpackingNo + ');return false;"><i class="fas fa-solid fa-eye"></i></a>';


    htmlControl = htmlControl + ' </div>';

    return htmlControl;
}
function SearchDispatchList() {

    var searchfilter = $('#searchdispatch').val();
    var searchvalue = $('#valuedispatch').val();

    if (searchvalue == '') {
        alert('Please Enter value for filter');
    }
    else {
        getDispatchList(searchfilter, searchvalue)
    }
}


function bindDispatchListStatusControl(ID, BatchId, strStatus, statusid) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    //Dispatch = 59
    if (statusid == 31 || statusid == 32 || statusid == 28) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openDispacthlist(\'' + BatchId + '\');return false;"></div>';
    }
    else if (statusid == 33) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthlist(\'' + BatchId + '\');return false;"></div>';
    }
    else if (statusid == 59) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthlist(\'' + BatchId + '\');return false;"></div>';
    }
    else {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openDispacthlist(\'' + BatchId + '\');return false;"></div>';
    }

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function getStatusColordispatch(dataFor, currentStatus) {
    var myColor = 'green';

    if (dataFor == 'Expected Receipt') {
        if (currentStatus == 'Expected Receipt' || currentStatus == 'Receiving' || currentStatus == 'Partially Completed' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        }
    }
    return myColor;
}

function getStatusColor(dataFor, currentStatus) {
    var myColor = 'gray';

    if (dataFor == 'Expected Receipt') {
        if (currentStatus == 'Expected Receipt' || currentStatus == 'Receiving' || currentStatus == 'Partially Completed' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        }
    } else if (dataFor == 'Receiving') {
        if (currentStatus == 'Receiving' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        } else if (currentStatus == 'Partially Completed') {
            myColor = 'partial';
        } else if (currentStatus == 'Expected Receipt') {
            myColor = 'red';
        }

    } else if (dataFor == 'Quality Check') {
        if (currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        } else if (currentStatus == 'Receiving' || currentStatus == 'Partially Completed') {
            myColor = 'red';
        }

    } else if (dataFor == 'Put Away') {
        if (currentStatus == 'Put Away') {
            myColor = 'green';
        } else if (currentStatus == 'Quality Check') {
            myColor = 'red';
        }
    }
    return myColor;
}


function getBatchDispatchList(batchid) {
    debugger;

    var apiPath = wmsApiPath + 'Dispatch/GetBatchDispatchList';
    //var apiPath = "http://localhost:50068/api/staging/v1/Dispatch/GetBatchDispatchList";
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "BatchID": batchid
    }

    //PickingListGrid
    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#pnlWmsHead').html('');
            var myGridList = data.Result;

            // BIND DATA GRID
            var gridTable = '';
            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Reference No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Packing No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Packing Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Warehouse Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Client Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Delivery Type</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Packing By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;

            debugger;
            for (var i = 0; i < getGridData.length; i++) {
                var getBatchNo = getGridData[i].BatchNo;
                var getOrderNo = getGridData[i].OrderNo;
                var getPackingNo = getGridData[i].PackingNo;
                var pdate = getGridData[i].PackingDate.split('T');
                var getPackingDate = pdate[0];
                var getPackingBy = getGridData[i].PackingBy;
                var getStatus = getGridData[i].StatusName;
                var getStatusid = getGridData[i].Status;
                var getOrderRefNo = getGridData[i].OrderNumber;
                var getClientCode = getGridData[i].ClientCode;
                var getWarehouseCode = getGridData[i].WarehouseCode;
                var getDeliveryType = getGridData[i].DeliveryType;
                var getShippingAddress = getGridData[i].ShippingAddress;
                var getpickupIdd = getGridData[i].PickUpID;
                // GRID ROW             
                // gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align:center;">'
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderRefNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingDate + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingBy + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindBatchDispatchListStatusControl(getOrderNo,getBatchNo, getStatus, getStatusid) + "</div>";
                // gridTable = gridTable + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align:center;">'
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderRefNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getWarehouseCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDeliveryType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingBy + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindBatchDispatchListStatusControl(getOrderNo, getBatchNo, getStatus, getStatusid, getpickupIdd, getPackingNo) + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }


            $('#pnlWmsHead').html(gridTable);
            // BIND DATA GRID
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function bindBatchDispatchListStatusControl(getOrderNo, ID, strStatus, statusid, getpickupIdd, getpackingNo) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    //Packing = 33
    if (statusid == 31 || statusid == 32 || statusid == 57) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstagingdetail(' + ID + ', ' + getOrderNo + ',' + getpickupIdd + ');return false;"></div>';
    }
    else if (statusid == 28) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstagingdetail(' + ID + ', ' + getOrderNo + ',' + getpickupIdd + ');return false;"></div>';
    }
    else if (statusid == 33 || statusid == 59) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstagingdetail(' + ID + ', ' + getOrderNo + ',' + getpickupIdd + ');return false;"></div>';
    }
    else {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstagingdetail(' + ID + ', ' + getOrderNo + ',' + getpickupIdd + ');return false;"></div>';
    }

    //Dispatch = 59
    if (statusid == 31 || statusid == 32 || statusid == 28) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthDetails(\'' + getOrderNo + '\',\'' + ID + '\',\'' + strStatus + '\',\'' + getpackingNo + '\');return false;"></div>';
    }
    else if (statusid == 33) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthDetails(\'' + getOrderNo + '\',\'' + ID + '\',\'' + strStatus + '\',\'' + getpackingNo + '\');return false;"></div>';
    }
    else if (statusid == 59) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthDetails(\'' + getOrderNo + '\',\'' + ID + '\',\'' + strStatus + '\',\'' + getpackingNo + '\');return false;"></div>';
    }
    else {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthDetails(\'' + getOrderNo + '\',\'' + ID + '\',\'' + strStatus + '\',\'' + getpackingNo + '\');return false;"></div>';
    }

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function getBatchDispatchDetailList(oid, sts, batchid, getpackingNo) {
    debugger;
    var obj = $('#ddlOrderType').val();
    if (sts == "Dispatch" && obj == 'SalesOrder') {
        $("#btnDispatchSave").hide();
        $("#btnDispatchReturn").show();
    }
    else if (sts == "Dispatch" && (obj == 'TransferOut' || obj == 'ScrapOrder')) {
        $("#btnDispatchSave").hide();
        $("#btnDispatchReturn").hide();
    }
    else {
        $("#btnDispatchSave").show();
        $("#btnDispatchReturn").hide();
    }

    var apiPath = wmsApiPath + 'Dispatch/GetBatchDispatchDetail';
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "BatchID": batchid,
        "SOID": oid,
        "DispId": getpackingNo
    }

    //PickingListGrid
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#pnlWmsDispatchDetailHead').html('');
            var myGridList = data.Result;

            var taskAssign = '';
            taskAssign = data.Result.Table3[0].taskAssign;

            if (taskAssign == '0') { $('#btnDispatchSave').hide(); }
            else { $('#btnDispatchSave').show(); }

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Dispatch Number</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Dispatch Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Dispatch By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Reference No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Delivery Date </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Priority</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Delivery Type</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">SAP No</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            debugger;
            for (var i = 0; i < getGridData.length; i++) {
                var getBatchID = getGridData[i].BatchID;
                var getBatchName = getGridData[i].BatchName;
                var getOrderNo = getGridData[i].OrderNo;
                var getDispatchNo = getGridData[i].DispatchNo;
                var getDeliverySlicDate = getGridData[i].DispatchDate;
                var getDispatchDate = getDeliverySlicDate.slice(0, 10);
                var getDispatchBy = getGridData[i].DispatchBy;
                var getOrderRefNo = getGridData[i].OrderRefNo;
                var getDeliverySlicDate = getGridData[i].Deliverydate;
                var getDeliverydate = getDeliverySlicDate.slice(0, 10);
                var getPriority = getGridData[i].Priority;
                var getDeliveryType = getGridData[i].DeliveryType;
                //var getSAPOrderNo = getGridData[i].SAPOrderNo;

                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align:center;">'
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchID + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' id='dvsoid' style='text-align:center;'>" + getOrderNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' id='dvdispid' style='text-align:center;'>" + getDispatchNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDispatchDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDispatchBy + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderRefNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDeliverydate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPriority + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDeliveryType + "</div>";
                //gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getSAPOrderNo + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#pnlWmsDispatchDetailHead').html(gridTable);
            getBatchDetailheadList(oid, batchid, sts, getpackingNo);
            // BIND DATA GRID
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getBatchDetailheadList(oid, batchid, sts, getpackingNo) {
    debugger;
    var obj = $('#ddlOrderType').val();
    getBatchNo = batchid;
    getOrderNo = oid;

    var apiPath = wmsApiPath + 'Dispatch/GetBatchDispatchDetail';
    var postData =
    {

        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "BatchID": batchid,
        "SOID": oid,
        "DispId": getpackingNo
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            var getLottable = mBrillWmsSession.getCustomerLottable();
            var breakCustLot = getLottable.split(',');
            $('#pnlWmsHead11').html('');
            var myGridList = data.Result;
            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">SR.NO.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Carton</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">UOM</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Packing Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Dispatch Qty</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable</div>';
            for (var pl = 0; pl < breakCustLot.length; pl++) {
                var custLotLabel = breakCustLot[pl];
                gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + custLotLabel + '">' + custLotLabel + '</div>';
            }
            if (sts == "Dispatch" && obj == 'SalesOrder') {
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Return Qty</div>';
            }

            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table1;

            for (var i = 0; i < getGridData.length; i++) {
                var getSrNo = getGridData[i].SrNo;
                var getpalletname = getGridData[i].palletname;
                var getpalletid = getGridData[i].palletid;
                var getSKUCode = getGridData[i].SKUCode;
                var getUOM = getGridData[i].UOM;
                var getPackingQty = getGridData[i].PackingQty;
                var getDispatchQty = getGridData[i].DispatchQty;
                var getProdID = getGridData[i].ProdID;
                var getLots = getGridData[i].Lottables;
                var getLottableGroup = getLots.split('|');
                // GRID ROW

                gridTable = gridTable + '<div class="wms-srv-grid-row wmSkuDetailsDispatchRow" style="text-align:center;">'
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getSrNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getpalletname + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getSKUCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getUOM + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingQty + "</div>";
                if (sts == "Dispatch") {
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDispatchQty + "</div>";
                } else {
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'><input type='text' onchange=updateDispatchQty(this) data-prodid='" + getProdID + "' data-cartonid='" + getpalletid + "' data-dispqty='" + getPackingQty + "' data-lot='" + getLots + "' value='" + getDispatchQty + "' class='wms-srv-grid-cell-input myQty'></div>";
                }

                //gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" +  getLots + "</div>";


                for (var pi = 0; pi < breakCustLot.length; pi++) {
                    var custLotLabel = breakCustLot[pi];
                    var custLotVal = getLottableGroup[pi];
                    if (custLotVal != null && custLotVal != undefined && custLotVal.trim() == '0') {
                        custLotVal = '';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + pi + '" data-lottype="' + custLotLabel + '" style="width: 82px; text-align: center;">' + custLotVal + '</div>';
                }

                if (sts == "Dispatch" && obj == 'SalesOrder') {
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'><input type='text' data-lot='" + getLots + "' data-dqty='" + getDispatchQty + "' data-id='" + getProdID + "' value='0' class='wms-srv-grid-cell-input myQty'></div>";
                }
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#pnlWmsHead11').html(gridTable);
            TrackingdetailsEdit(getpackingNo);
            showHideLottableCellForDispatchRow();
            // BIND DATA GRID
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function showHideLottableCellForDispatchRow() {
    var getViewRowCount = $('#pnlWmsHead11 .wmSkuDetailsDispatchRow').length;
    var getTotalLotRowCount = getViewRowCount;
    $('#pnlWmsHead11 .gridCellLottable').show();
    for (var l = 0; l < 10; l++) {
        // CHECK FOR VIEW ONLY EMPTY CELL
        var totalCell = $('#pnlWmsHead11 .wmSkuDetailsDispatchRow .gridCellLottable[data-lotindex="' + l + '"]').length;
        var totalEmptyCell = $('#pnlWmsHead11 .wmSkuDetailsDispatchRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;

        if (totalCell > 0) {
            if (totalCell != totalEmptyCell) {
                $('#pnlWmsHead11 .gridCellLottable[data-lotindex="' + l + '"]').show();
            } else {
                $('#pnlWmsHead11 .gridCellLottable[data-lotindex="' + l + '"]').hide();
            }
        } else {
            $('#pnlWmsHead11 .gridCellLottable[data-lotindex="' + l + '"]').hide();
        }
    }
}

function updateDispatchQty(dataobj) {
    debugger;
    var apiPath = wmsApiPath + 'Dispatch/updateQuantity';
    var dispid = $('#dvdispid').html();
    var soid = $('#dvsoid').html();
    var prodid = $(dataobj).attr('data-prodid');
    var cartonid = $(dataobj).attr('data-cartonid');
    var dispqty = $(dataobj).attr('data-dispqty');
    var lots = $(dataobj).attr('data-lot');
    var qty = $(dataobj).val();
    var actqty = $(dataobj).attr('value');

    if (Number(qty) < 0 || Number(qty) > Number(dispqty)) {
        alert("Quantity should not negative OR greater than Packing qty..!")
        $(dataobj).val(actqty);
    } else {
        var postData =
        {
            "DispatchId": dispid,
            "Soid": soid,
            "ProdId": prodid,
            "CartonId": cartonid,
            "Lottables": lots,
            "DispatchQty": dispqty,
            "Qty": qty,
            "UserId": getUserId
        }

        callHttpUrl(apiPath, postData, function (data) {
            var isSuccess = data.Status;
            if (isSuccess == "200") {
            }
            else {
                var res = data.Result;
                $(dataobj).val(actqty);
                alert(res.Message);
            }
        });
    }
}


function SaveTracking() {
    debugger;
    var getTrackingId = globalDispatchID;
    var apiPath = wmsApiPath + 'Dispatch/saveTrackingDetail';

    if (getTrackingId == '0') {
        var getDate = $("#txtDate").val();
        var getstatus = $("#txtstatus").val();
        var getremark = $("#txtremark").val();
        var hr = $("#txthr").val();
        var min = $("#txtmin").val();
        var ampm = $("#txtampm").val();
        var getTime = hr + ':' + min + ' ' + ampm;
    }

    var postData =
    {
        "OrderId": getOrderNo,
        "BatchID": getBatchNo,
        "UserId": getUserId,
        "TrackDate": getDate,
        "TrackTime": getTime,
        "Status": getstatus,
        "Remark": getremark
    }

    callHttpUrl(apiPath, postData, function (data) {
        var isSuccess = data.Status;
        if (isSuccess == 200) {
            alert('Save Success!!');
            getviewTrackingList();
            getTrackingList();
        }
        else {

        }
    });
}

function Carriertype() {
    debugger;
    var apiPath = wmsApiPath + 'Dispatch/getCarrierList';
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnCarriertype = [];
            spnCarriertypeId = [];
            //   $("#txtcarriertype").html('<option value=0 >--Select--</option>');
            // spnCarriertype.push('--Select List--');
            // spnCarriertypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var CarrierId = grnContainerSize[i].ID;
                    var Carriervalue = grnContainerSize[i].CarrierName;
                    spnCarriertype.push(Carriervalue);
                    spnCarriertypeId.push(CarrierId);
                    $("#txtcarriertype").append('<option value = "' + CarrierId + '">' + Carriervalue + '</option>');
                }
            }

        }

    });
}

function getTrackingList() {
    debugger;
    var apiPath = wmsApiPath + 'Dispatch/getTrackingDetail';

    var postData =
    {
        "OrderId": getOrderNo,
        "BatchID": getBatchNo
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#pnlWmsTracking').html('');
            var myGridList = data.Result;
            // BIND DATA GRID
            var gridTable = '';
            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Carrier Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Tracking No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Dispatch Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            debugger;
            for (var i = 0; i < getGridData.length; i++) {
                var getCarrier = getGridData[i].Carrier;
                var getTrackingNo = getGridData[i].TrackingNo;
                var getDispatchslicDate = getGridData[i].DispatchDate;
                var getDispatchDate = getDispatchslicDate.slice(0, 10)
                var getStatustracking = getGridData[i].Status;

                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align:center;">'
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCarrier + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTrackingNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDispatchDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getStatustracking + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#pnlWmsTracking').html(gridTable);
            getviewTrackingList()
            // BIND DATA GRID
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getviewTrackingList() {
    debugger;
    var apiPath = wmsApiPath + 'Dispatch/getTrackingDetail';

    var postData =
    {
        "OrderId": getOrderNo,
        "BatchID": getBatchNo
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#pnlWmsTrackinglist').html('');
            var myGridList = data.Result;
            // BIND DATA GRID
            var gridTable = '';
            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Time</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Remark</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-row">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" value="" class="wms-srv-grid-cell-input wms-srv-datepicker" id="txtDate" ></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" id="txtvalidatetime">';
            gridTable = gridTable + '<select name="ctl00$CPHolder_Form$qbDDListHH" class="inputElement notranslate" class="wms-srv-grid-cell-input"  id="txthr" onblur="validateCtl(this);">';
            gridTable = gridTable + '<option value="--HH--">--HH--</option>';
            gridTable = gridTable + '<option value="01">01</option>';
            gridTable = gridTable + '<option value="02">02</option>';
            gridTable = gridTable + '<option value="03">03</option>';
            gridTable = gridTable + '<option value="04">04</option>';
            gridTable = gridTable + '<option value="05">05</option>';
            gridTable = gridTable + '<option value="06">06</option>';
            gridTable = gridTable + '<option value="07">07</option>';
            gridTable = gridTable + '<option value="08">08</option>';
            gridTable = gridTable + '<option value="09">09</option>';
            gridTable = gridTable + '<option value="10">10</option>';
            gridTable = gridTable + '<option value="11">11</option>';
            gridTable = gridTable + '<option value="12">12</option>';
            gridTable = gridTable + '</select>';
            gridTable = gridTable + '<select name="ctl00$CPHolder_Form$qbDDListMM"  class="inputElement notranslate" id="txtmin" onblur="validateCtl(this);">';
            gridTable = gridTable + '<option value="--MM--">--MM--</option>';
            gridTable = gridTable + '<option value="00">00</option>';
            gridTable = gridTable + '<option value="15">15</option>';
            gridTable = gridTable + '<option value="30">30</option>';
            gridTable = gridTable + '<option value="45">45</option>';
            gridTable = gridTable + '</select>';
            gridTable = gridTable + '<select name="ctl00$CPHolder_Form$qbDDListAMPM"  class="inputElement notranslate"  id="txtampm" onblur="validateCtl(this);">';
            gridTable = gridTable + '<option value="AM">AM</option>'
            gridTable = gridTable + '<option value="PM">PM</option>'
            gridTable = gridTable + '</select>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" class="wms-srv-grid-cell-input"  id="txtstatus" value=""></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" class="wms-srv-grid-cell-input" id="txtremark" id="txtvalidateremark" value=""></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action">';
            gridTable = gridTable + '<i class="fas fa-check-circle" style="color:black !important" onclick="SaveTracking();" ></i>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';

            //Bind Header

            var getGridData = data.Result.Table1;
            debugger;
            for (var i = 0; i < getGridData.length; i++) {
                var getTrackDate = getGridData[i].TrackDate;
                var getTrackTime = getGridData[i].TrackTime;
                var getTrackStatus = getGridData[i].TrackStatus;
                var getTrackRemark = getGridData[i].TrackRemark;

                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align:center;">'
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTrackDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTrackTime + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTrackStatus + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTrackRemark + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'> </div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#pnlWmsTrackinglist').html(gridTable);
            $('#wms-srv-Trackingno-popup .wms-srv-datepicker').datepicker('destroy');
            $('#wms-srv-Trackingno-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
            // BIND DATA GRID
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}


function TrackingdetailsEdit(getpackingNo) {
    debugger;
    var apiPath = wmsApiPath + "Dispatch/GetBatchDispatchDetail";
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "BatchID": getBatchNo,
        "SOID": getOrderNo,
        "DispId": getpackingNo
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var popup = data.Result.Table;
        if (getStatus == 200) {
            getCarrierID = popup[0].CarrierID;
            getTrackingNo = popup[0].TrackingNo;
            getDriverName = popup[0].DriverName;
            getPickUpBy = popup[0].PickUpBy;
            getScheduleDateTime = popup[0].ScheduleDateTime;
            getActualDateTime = popup[0].ActualDateTime;
            getLRNo = popup[0].LRNo;
            getVehicleNo = popup[0].VehicleNo;
            getTransRemark = popup[0].TransRemark;
            getBOL = popup[0].BOL;
            getTransName = popup[0].TransName;

            $('#txtcarriertype').val(getCarrierID);
            $('#txtTrackingno').val(getTrackingNo);
            $('#txtDrivername').val(getDriverName);
            $('#txtPickupBy').val(getPickUpBy);
            $('#txtScheduleDateandTime').val(getScheduleDateTime);
            $('#txtActualDateandTime').val(getActualDateTime);
            $('#txtlrno').val(getLRNo);
            $('#txtvehicleno').val(getVehicleNo);
            $('#txttransremark').val(getTransRemark);
            $('#txtbol').val(getBOL);
            $('#txttransname').val(getTransName);
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function validate() {
    if ($("#txtlrno").val() == "") {
        $("#txtlrno").focus();
        return false;
    }
    else if ($("#txtvehicleno").val() == "") {
        $("#txtvehicleno").focus();
        return false;
    }
    else {
        return true;
    }
}

function SaveNewDispatch() {
    debugger;
    var getTrackingId = globalDispatchID;
    var apiPath = wmsApiPath + 'Dispatch/saveDispatchbyso';
    // var apiPath = "http://localhost:50068/api/staging/v1/Dispatch/saveDispatchbyso";
    if (getTrackingId == '0') {
        var getcarriertype = $("#txtcarriertype").val();
        var getTrackingno = $("#txtTrackingno").val();
        var getDrivername = $("#txtDrivername").val();
        var getPickupBy = $("#txtPickupBy").val();
        var getScheduleDateandTime = $("#txtScheduleDateandTime").val();
        var getActualDateandTime = $("#txtActualDateandTime").val();
        var getlrno = $("#txtlrno").val();
        var getvehicleno = $("#txtvehicleno").val();
        var gettransremark = $("#txttransremark").val();
        var getbol = $("#txtbol").val();
        var gettransname = $("#txttransname").val();
        var getdispid = $('#dvdispid').text();
    }

    if (validate() == true) {
        var postData =
        {
            "CustomerId": getCustomerId,
            "WarehouseId": getWarehouseId,
            "UserId": getUserId,
            "BatchID": getBatchNo,
            "SOID": getOrderNo,
            "CarrierID": getcarriertype,
            "TrackingNO": getTrackingno,
            "DriverName": getDrivername,
            "PickUpBy": getPickupBy,
            "ScheduleDateTime": getScheduleDateandTime,
            "ActualDateTime": getActualDateandTime,
            "LRNo": getlrno,
            "VehicleNo": getvehicleno,
            "TransportRemark": gettransremark,
            "BOL": getbol,
            "TransportName": gettransname,
            "DispId": getdispid

        }

        callHttpUrl(apiPath, postData, function (data) {
            var isSuccess = data.Status;
            if (isSuccess == "200") {
                alert('Save Success!!');
                $('#wms-srv-dispatchlist-popup').hide();
                $('#wms-srv-dispatchdetail-popup').hide();
                getPackingList('All', '');
            }
            else {
                var res = data.Result;
                alert(res.Message);
            }
        });
    }
    else {
        alert("Please fill Mandatory fields..!");
    }
}

function SaveReturn() {
    debugger;
    var apiPath = wmsApiPath + 'Dispatch/markReturn';
    var strProdQty = '';
    var strneg = true;
    $('.myQty').each(function () {
        var myVal = $(this).val();
        var mydval = $(this).attr('data-dqty');
        if (Number(myVal) > 0 && Number(mydval) >= Number(myVal)) {
            var prodID = $(this).attr('data-id');
            var lot = $(this).attr('data-lot');
            if (strProdQty.trim() == '') {
                strProdQty = prodID + ":" + myVal + ":" + lot;
            } else {
                strProdQty = strProdQty + "@" + prodID + ":" + myVal + ":" + lot;
            }
        }
        else if (Number(myVal) < 0 || Number(mydval) < Number(myVal)) {
            strneg = false;
            strProdQty = "";
            return;
        }
    });

    if (strneg == true) {
        if (strProdQty == "") {
            alert("Please enter atleast one row quantity for Return..!");
        }
        else {
            var postData =
            {
                "CustomerId": getCustomerId,
                "WarehouseId": getWarehouseId,
                "UserId": getUserId,
                "SOID": getOrderNo,
                "Data": strProdQty
            }

            callHttpUrl(apiPath, postData, function (data) {
                var isSuccess = data.Status;
                if (isSuccess == "200") {
                    alert('Save Success!!');
                    $('#wms-srv-dispatchdetail-popup').hide();
                    $('#wms-srv-dispatchlist-popup').hide();
                    getDispatchList(searchfilter, searchvalue);
                }
                else {
                    var res = data.Result;
                    alert(res.Message);
                }
            });
        }
    }
    else {
        alert("Quantity should not be Negative OR greater than dispatch quantity..!");
    }
}


function clearSearchFilterdispatch() {
    $('#searchdispatch').val('All');
    $('#valuedispatch').val('');
    getDispatchList(searchfilter, 'All');
}

function openassigndriver() {
    debugger;
    var SelectedOrder = document.getElementsByClassName("messageCheckbox");
    SelectedOrder.value = "";


    $('input[class="messageCheckbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            //getglobleId = $(this).attr("data-orderid");

            if (getglobleId == "") {
                getglobleId = $(this).attr("data-orderid");

            }
            else {
                getglobleId = getglobleId + "," + $(this).attr("data-orderid");
            }

            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("data-id");

            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("data-id");
            }
        }
    });
    if (SelectedOrder.value != "") {

        /* cmd by suraj khopade
         $('#wms-srv-AssignDriver-popup-open').show();
         $('#wms-srv-AssignDriver-popup-Close').off();
         $('#wms-srv-AssignDriver-popup-Close').click(function () {
             $('#wms-srv-AssignDriver-popup-open').hide();
         });
         $('#txtDriverName').val('');
         $('#txtContactNo').val('');
         $('#txtEmailID').val('');*/

        CheckinvoiceAssign(SelectedOrder.value)
        // trackingdriverlist(SelectedOrder.value ); //cmd by suraj khopade

    }
    else {
        alert("Please select Orders!!");
    }
}
function driverlist() {
    $('#wms-srv-Driverlist-popup').show();
    binddriverlist();
    $('#wms-srv-Driverlist-popup-close').off();
    $('#wms-srv-Driverlist-popup-close').click(function () {
        $('#wms-srv-Driverlist-popup').hide();
    });

}

function binddriverlist() {
    debugger
    //var apiPath = 'http://localhost:50068/api/staging/v1/Dispatch/getDemandDriverList';
    var apiPath = wmsApiPath + 'Dispatch/getDemandDriverList';
    // var globleorderno = $(this).attr('data-id'); 

    var postData =
    {
        "CustomerId": getCustomerId,
        "UserId": getUserId,
        "Object": "Driver",
        "searchValue": ""
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;

        if (getStatus == '200') {
            var gridTable = '';
            $('#pnldriverlist').html('');
            var getGridData = data.Result.Table;

            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Driver Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Mobile No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Email</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < getGridData.length; i++) {
                var getId = getGridData[i].Id;
                var getDrivername = getGridData[i].Drivername;
                var getMobileNo = getGridData[i].MobileNo;
                var getEmail = getGridData[i].Email;

                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align:center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDrivername + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getMobileNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getEmail + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<a href="#" title="Edit" class="wms-srv-save" onclick="addTodriverlistField(' + getId + ',\'' + getDrivername + '\',\'' + getMobileNo + '\',\'' + getEmail + '\')"><i class="fas fa-check-circle"></i></a>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#pnldriverlist').html(gridTable);
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function addTodriverlistField(getId, getDrivername, getMobileNo, getEmail) {
    //debugger;
    DriverId = getId;
    $('#txtDriverName').val(getDrivername);
    $('#txtContactNo').val(getMobileNo);
    $('#txtEmailID').val(getEmail);
    $('#wms-srv-Driverlist-popup').hide();

}


function trackingdriverlist(SelectedOrdervalue) {
    debugger;
    //var apiPath = 'http://localhost:50068/api/staging/v1/Dispatch/GetdriverTransportdetail';
    var apiPath = wmsApiPath + 'Dispatch/GetdriverTransportdetail';
    var postData =
    {
        "DispatchId": SelectedOrdervalue
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var popup = data.Result.Table;
        if (getStatus == 200) {
            // getCarrierID= popup[0].CarrierID;
            // getTrackingNo=popup[0].TrackingNo;
            // getDriverName=popup[0].DriverName;
            // getPickUpBy=popup[0].PickUpBy;
            // getScheduleDateTime=popup[0].ScheduleDateTime;
            // getActualDateTime=popup[0].ActualDateTime;
            getLRNo = popup[0].LRNo;
            getVehicleNo = popup[0].VehicleNo;
            getTransRemark = popup[0].TransRemark;
            getBOL = popup[0].BOL;
            getTransName = popup[0].TransName;

            //$('#txtcarriertype').val(getCarrierID);
            // $('#txtTrackingno').val(getTrackingNo);
            //$('#txtDrivername').val(getDriverName);
            //$('#txtPickupBy').val(getPickUpBy);
            //$('#txtScheduleDateandTime').val( getScheduleDateTime);
            //$('#txtActualDateandTime').val(getActualDateTime);
            $('#txtLRNo').val(getLRNo);
            $('#txtVehicleNo').val(getVehicleNo);
            $('#txtTransporterRemark').val(getTransRemark);
            $('#txtbol').val(getBOL);
            $('#txtTransporterName').val(getTransName);
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

var DriverId = '';
function SaveDriver() {
    debugger;
    //var apiPath = 'http://localhost:50068/api/staging/v1/Dispatch/saveDriver';
    var apiPath = wmsApiPath + 'Dispatch/saveDriver';
    if (validatassigndriverSave() != false) {

        var getEmail = $("#txtEmailID").val();
        var getContactno = $("#txtContactNo").val();


        var postData =
        {
            "CustomerId": getCustomerId,
            "UserId": getUserId,
            "Warehouseid": getWarehouseId,
            "DriverId": DriverId,
            "OrderId": getglobleId,
            "Contactno": getContactno,
            "Email": getEmail,
            "DeviceId": "2",
            "VehicleId": "4"
        }

        callHttpUrl(apiPath, postData, function (data) {
            //var isSuccess = data.Status;
            // if (isSuccess == 200)
            // {
            //     alert('Save Success!!');	
            //     $('#wms-srv-AssignDriver-popup-open').hide();
            //     cleartransportvalue();

            // }
            // else 
            // {
            //    alert("Error Occured!!");
            // }
            var getResult = data.Result;
            var getMessage = getResult.Message;
            if (getMessage == 'success') {
                alert('Save Success!!');
                $('#wms-srv-AssignDriver-popup-open').hide();
                cleartransportvalue();

            }
            else {
                alert("Driver already assign to this order.");
                $('#wms-srv-AssignDriver-popup-open').hide();
                cleartransportvalue();
            }
        });
    }
}

function cleartransportvalue() {
    $("#txtEmailID").val('');
    $("#txtContactNo").val('');
    $('#txtDriverName').val('');
    $('#txtContactNo').val('');
    $('#txtLRNo').val('');
    $('#txtVehicleNo').val('');
    $('#txtTransporterRemark').val('');
    $('#txtbol').val('');
    $('#txtTransporterName').val('');
    getglobleId = '';
}


function validatassigndriverSave() {


    if (document.getElementById("txtDriverName").value == "") {
        alert("Please add Driver Name!");
        return false;
    }


}
function CheckinvoiceAssign(SelectedOrdervalue) {
    debugger;
    //var apiPath = 'http://localhost:50068/api/staging/v1/Dispatch/CheckDriverAssignInvoice';
    var apiPath = wmsApiPath + 'Dispatch/CheckDriverAssignInvoice';

    var postData =
    {
        "CustomerId": getCustomerId,
        "OrderId": SelectedOrdervalue,
    }

    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == "200") {
            var getMessage = data.Result.Message;
            if (getMessage.toLocaleLowerCase() == 'success') {
                $('#wms-srv-AssignDriver-popup-open').show();
                $('#wms-srv-AssignDriver-popup-Close').off();
                $('#wms-srv-AssignDriver-popup-Close').click(function () {
                    $('#wms-srv-AssignDriver-popup-open').hide();
                });
                $('#txtDriverName').val('');
                $('#txtContactNo').val('');
                $('#txtEmailID').val('');
                trackingdriverlist(SelectedOrdervalue);
            } else {
                alert("Driver can't assign because of Invoice not attached.");
            }
        } else {
            if (getMessage == 'InvalidStatus') {
                alert('Please select only dispatch status orders');
            }
            else {
                alert('Please attach Invoice to Orders - ' + getMessage)
            }
        }
    });

}

