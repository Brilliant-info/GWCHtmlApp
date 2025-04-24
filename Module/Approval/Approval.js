
var getUserIdInward = mBrillWmsSession.getUserId();
var getWarehouseIdInward = mBrillWmsSession.getWarehouseId();
var getCustomerIdInward = mBrillWmsSession.getCustomerId();
var getCompanyIdInward = mBrillWmsSession.getCompanyId();


var globalActiveTab = 'ExpectedReceipt';
var searchfilter = 'ALL';
var CurrentPage = 1;
var searchvalue = 'none';
var hasQualityCheck = true;
var hastaskassign = false;
var getPageObject = "";
var more = true;
var isChecked = '';
var getglobalTotalRecords = '100';

var weekPickerCtrlId = 0;
/*
$(document).ready(function ()
 {
    init();
});

alert('script loaded');
*/
wmsLoadLayout(function () {
    init();
});

function init() {
    //checkQcval();
    grnload();
    qcload();
    getPageObject = $('#ddlPageObject').val();
    $(".putinscancheck").click(function () {

        if ($(this).is(":checked")) {
            $(".putinenablescan").show();
        } else {
            $(".putinenablescan").hide();
        }
    });

    $('.wms-srv-more-btn-holder button').click(function () {
        $('.wms-srv-grid-more-navbar').show();
    });

    $('.wms-srv-grid-more-navbar a').click(function () {
        //$('.wms-srv-grid-more-navbar').hide();
    });

    $('.pnlWmsDetail .wms-srv-btn-status-action').off();
    $('.pnlWmsDetail .wms-srv-btn-status-action').click(function () {
        var obj = $(this).offset();
        var getPopupWidth = $('#wmsSrvActionPopupMenu').width();
        var getPopupHeight = $('#wmsSrvActionPopupMenu').height();
        var popupTop = obj.top - getPopupHeight;
        var popupLeft = obj.left;
        $('#wmsSrvActionPopupMenu').css('top', popupTop + 'px');
        $('#wmsSrvActionPopupMenu').css('left', popupLeft + 'px');

        $('#wmsSrvActionPopupMenu a').off();
        $('#wmsSrvActionPopupMenu a').click(function () {
            $('#wmsSrvActionPopupMenu').hide();
        });
        $('#wmsSrvActionPopupMenu').show();
        return false;
    });

    $('.wms-srv-add-order').click(function () {
        // addOrder();
        viewOrder('0', true);
    });

    $('.wms-srv-allocation-plan').click(function () {
        openAllocationPlan();
    });
    $('#ddlPageObject').change(function () {
        getPageObject = $('#ddlPageObject').val();



        if (getPageObject == 'PurchaseOrder') {
            $("#lblExpectedReceipt").show();
            $("#lblExpectedReceiptreturn").hide();
            $("#lblExpectedReceipttransfer").hide();
        }
        else if (getPageObject == 'SalesReturn') {
            $("#lblExpectedReceiptreturn").show();
            $("#lblExpectedReceipt").hide();
            $("#lblExpectedReceipttransfer").hide();
        }
        else if (getPageObject == 'Transfer') {
            $("#lblExpectedReceipttransfer").show();
            $("#lblExpectedReceiptreturn").hide();
            $("#lblExpectedReceipt").hide();

        }
        loadOrderRequestList();
    });

    $('.wms-srv-count-box-holder').click(function () {
        // $('.wms-srv-count-box-holder').removeClass('dashboardActiveTab');
        // $(this).addClass('dashboardActiveTab');
        // loadOrderRequestList();

        debugger;
        $('.wms-srv-count-box-holder').removeClass('dashboardActiveTab');
        $(this).addClass('dashboardActiveTab');

        var getCountActiveTab = $('.dashboardActiveTab').attr('data-id');

        if (getCountActiveTab == "CompletedOrder") {
            LoadTaskCompletOrders();
        }
        else {
            loadOrderRequestList();
        }
    });

    $('#ddlsearch').change(function () {


        searchfilter = $("#ddlsearch").val();
        searchvalue = $("#txtvalue").val();
        if (searchfilter == 'ALL') {
            searchvalue = 'none';
            loadOrderRequestList();

            $('#txtvalue').val('');

        }

    });
    $('.wms-srv-more-btn-holder button').click(function () {
        if (more == true) {
            more = false;
            $('.wms-srv-grid-more-navbar').show();
        }
        else {
            more = true;
            $('.wms-srv-grid-more-navbar').hide();
        }
    });

    // $('#wms-srv-communication-popup .wms-srv-richtexteditor textarea').Editor();
    $('#hdnObject').val(getPageObject);
    loadOrderRequestList();

}
function selectAllTask(chkObj) {
    debugger;
    isChecked = $(chkObj).prop('checked');
    if (isChecked) {
        $('#tlbInboundGrid .wms-srv-grid-row input[type="checkbox"]').prop('checked', true);

    } else {
        $('#tlbInboundGrid .wms-srv-grid-row input[type="checkbox"]').prop('checked', false);
    }
}

function showAdvanceSearch() {
    $('#wms-srv-advance-search-popup').show();
    $('#wms-srv-advance-search-popup .wms-srv-datepicker').datepicker();
    $('#wms-srv-advance-search-popup-close').off();
    $('#wms-srv-advance-search-popup-close').click(function () {
        $('#wms-srv-advance-search-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-advance-search-popup').hide();
    });
}

function showAllocateDriverPopup() {
    $('#wms-srv-allocate-driver-popup').show();
    $('#wms-srv-allocate-driver-popup-close').off();
    $('#wms-srv-allocate-driver-popup-close').click(function () {
        $('#wms-srv-allocate-driver-popup').hide();
    });
}

function showReasonCodePopup() {
    $('#wms-srv-reason-code-popup').show();
    $('#wms-srv-reason-code-popup-close').off();
    $('#wms-srv-reason-code-popup .fa-check-circle').off();
    $('#wms-srv-reason-code-popup .fa-check-circle').click(function () {
        alert("Order Successfully Cancel");
        $('#wms-srv-reason-code-popup').hide();
    });
    $('#wms-srv-reason-code-popup-close').click(function () {
        $('#wms-srv-reason-code-popup').hide();
    });
}

function cancelOrder() {
    if (confirm('Are you sure to cancel this order?')) {
        showReasonCodePopup();
    }
}
function cancelOrder_old_17_April_2025() {
    debugger;
    var SelectedOrder = document.getElementById("hdnSelectedInboundOrder");
    SelectedOrder.value = "";

    $('input[class="messageCheckbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("data-id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("data-id");
            }
        }
    });

    //var apiPath = "http://localhost:50068/api/staging/v1/PO/cancelPO";
    var apiPath = wmsApiPath + 'PO/cancelPO';
    var postData =
    {
        "OrderId": SelectedOrder.value,
        "UserId": getUserIdInward,
        "WarehouseId": getWarehouseIdInward,
        "CompanyId": getCompanyIdInward,
        "CustomerId": getCustomerIdInward
    }

    callHttpUrl(apiPath, postData, function (result) {

        var getCode = result.StatusCode;
        var fresult = result.Result.Message;


        if (getCode == "Success") {
            alert("Order Successfully Cancel");
            loadOrderRequestList();
        }
        else {
            alert(fresult);
        }
    });
}

function markasReceiving() {
    debugger;
    var SelectedOrder = document.getElementById("hdnSelectedRecevingOrder");
    SelectedOrder.value = "";

    $('input[class="messageCheckbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("data-id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("data-id");
            }
        }
    });
    var apiPath = wmsApiPath + 'PO/completeReceving';
    //var apiPath = "http://localhost:50068/api/staging/v1/PO/completeReceving";

    var postData =
    {
        "OrderId": SelectedOrder.value,
        "UserId": getUserIdInward,
        "WarehouseId": getWarehouseIdInward,
        "CompanyId": getCompanyIdInward,
        "CustomerId": getCustomerIdInward
    }

    callHttpUrl(apiPath, postData, function (result) {

        var getCode = result.StatusCode;
        var grnID = result.Result.Message;


        if (getCode == "Success") {
            alert("Order Successfully Completed");
            loadOrderRequestList();
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function openCancelOrder() {
    var getActiveTab = $('.dashboardActiveTab').attr('data-id');
    var ddlList = '';
    $("#gridDrodown").html('');
    if (getActiveTab == 'ExpectedReceipt') {
        ddlList = '<a href="#" data-prefix="CO" onclick="cancelOrder();"><i class="fas fa-times-circle" style="padding: 3px;"></i>Cancel Order</a>';
    }
    else if (getActiveTab == 'Receiving') {
        ddlList = '<a href="#" data-prefix="CO" onclick="markasReceiving();"><i class="fas fa-times-circle" style="padding: 3px;"></i>Mark As Complete</a>';
    }
    else {
        (".ddlMorebtn").css("display:none;");
    }

    $("#gridDrodown").html(ddlList);

}


function loadOrderRequestList() {
    var getOrderType = $('#ddlRequestOrderType').val();
    if (getOrderType == 'NormalOrder') {
        loadNormalRequestList();
    } else {
        loadEcommerceRequestList();
    }
}

function loadEcommerceRequestList() {
    /* Static API Call */
    apiPath = "StaticAPI/GetEcommerceApprovalList.json";
    postData = null;
    /* Static API Call */

    callHttpUrl(apiPath, postData, function (data) {

        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            $('#tlbInboundGrid').html('');
            var getResult = data.Result;
            var myGridListcount = getResult.Table;
            var myGridList = getResult.Table1;

            // Start New Task code to check task assighn not availble hide comple order dashboard
            if (myGridList != "") {
                // GET DASHBOARD COUNTS

                // BIND DATA GRID
                var gridTable = '';

                // GRID HEADER
                gridTable = gridTable + '<div class="wms-srv-grid-header" style="text-align: center;">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Request No</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Web Order No</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Department</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Request Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Exp. Delivery Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Type</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Category</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Payment Method</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Amount To Be Collected</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Amount Paid</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">First Name</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Last Name</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Delivery Type</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">VIP Customer</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px;">Status</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
                gridTable = gridTable + '</div>';
                // GRID HEADER

                for (var i = 0; i < myGridList.length; i++) {
                    var getID = myGridList[i].ID;
                    var getRequestNo = myGridList[i].RequestNo;
                    var getWebOrderNo = myGridList[i].WebOrderNo;
                    var getDepartment = myGridList[i].Department;
                    var getRequestDate = myGridList[i].RequestDate;
                    var getExpDeliveryDate = myGridList[i].ExpDeliveryDate;
                    // var getTitle = myGridList[i].Title;
                    // var getRequestBy = myGridList[i].RequestBy;
                    var getOrderType = myGridList[i].OrderType;
                    var getOrderCategory = myGridList[i].OrderCategory;
                    var getPaymentMethod = myGridList[i].PaymentMethod;
                    var getAmountToBeCollected = myGridList[i].AmountToBeCollected;
                    var getAmountPaid = myGridList[i].AmountPaid;
                    var getFirstName = myGridList[i].FirstName;
                    var getLastName = myGridList[i].LastName;
                    var getDeliveryType = myGridList[i].DeliveryType;
                    var getVIPCustomer = myGridList[i].VIPCustomer;

                    var getStatus = myGridList[i].Status;

                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getRequestNo + '" ></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRequestNo + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getWebOrderNo + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getDepartment + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRequestDate + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getExpDeliveryDate + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getTitle + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRequestBy + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderType + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderCategory + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPaymentMethod + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getAmountToBeCollected + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getAmountPaid + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getFirstName + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLastName + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getDeliveryType + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getVIPCustomer + '</div>';

                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-status-holder" title="Status">' +
                        '<div class="wms-srv-status-display">' +
                        '<div class="wms-srv-status-label">Pending for Approval</div>' +
                        '<div class="wms-srv-status-progress">' +
                        '<div class="wms-srv-dot wms-srv-green" data-orderid="' + getRequestNo + '" data-status="Expected Receipt" title="Request" onclick="viewOrder(\'' + getRequestNo + '\', true);return false;"></div>' +
                        ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + getRequestNo + '" data-status="Expected Receipt" title="Approval" onclick="openApprovalTrans(\'' + getRequestNo + '\');return false;"></div>' +
                        // ' <div class="wms-srv-dot wms-srv-gray" data-orderid="' + getRequestNo + '" data-status="Expected Receipt" title="Dispatch" onclick="openDispatchPopup(\'' + getRequestNo + '\');return false;"></div>' +
                        '</div>' +
                        '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>' +
                        '</div>' +
                        '</div ></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
                        '<a href = "#" title = "Document" data-prefix="DOC" data-orderid="' + getRequestNo + '" class="wms-srv-icononly" onclick="openDocumentObject(\'' + getRequestNo + '\');"><i class="fas fa-file-alt"></i></a>' +
                        '<div class="wms-srv-action-sep" >|</div> ' +
                        '<a href = "#" title = "Communication" data-prefix="CMM" data-orderid="' + getRequestNo + '" class="wms-srv-icononly" onclick="openCommunicationObject(\'' + getRequestNo + '\');" > <i class="fas fa-envelope"></i></a> ' +
                        '<div class="wms-srv-action-sep" >|</div> ' +
                        '<a href = "#" title = "Approval" data-prefix="APR" data-orderid="' + getRequestNo + '" class="wms-srv-icononly" onclick="openApprovalTrans(\'' + getRequestNo + '\');" > <i class="fas fa-user-check"></i></a> ' +
                        '<div class="wms-srv-action-sep" >|</div> ' +
                      //  '<a href = "#" title = "Dispatch" data-prefix="TRN" data-orderid="' + getRequestNo + '" class="wms-srv-icononly" onclick="openDispatchPopup(\'' + getRequestNo + '\');" > <i class="fas fa-truck-moving fa-flip-horizontal"></i></a> ' +
                       // '<div class="wms-srv-action-sep" >|</div> ' +
                        '<a href = "#" title = "Parameter" data-prefix="PRA" data-orderid="" class="wms-srv-icononly" onclick="openOrderParameterPopup(\'' + getRequestNo + '\');"> <i class="fas fa-tag"></i></a>' +
                        '</div>' +
                        '</div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW
                }

                $('#tlbInboundGrid').html(gridTable);

                setupGridPagingList('tlbInboundGridPager', CurrentPage, getTotalRecords, loadOrderRequestList, getglobalTotalRecords);
            }
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function openOrderParameterPopup() {
    $('#wms-srv-order-parameter-popup').show();
    loadOrderParameterList();
    $('#wms-srv-order-parameter-popup-close').off();
    $('#wms-srv-order-parameter-popup-close').click(function () {
        $('#wms-srv-order-parameter-popup').hide();
    });
}

function loadOrderParameterList() {
    /* Static API Call */
    apiPath = "StaticAPI/GetOrderParameter.json";
    postData = null;
    /* Static API Call */

    callHttpUrl(apiPath, postData, function (data) {

        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            $('#tlbOrderParameterGrid').html('');
            var getResult = data.Result;
            var myGridList = getResult.Table;

            // Start New Task code to check task assighn not availble hide comple order dashboard
            if (myGridList != "") {
                // GET DASHBOARD COUNTS

                // BIND DATA GRID
                var gridTable = '';

                // GRID HEADER
                gridTable = gridTable + '<div class="wms-srv-grid-header">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Sr. No.</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Group Name</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Value</div>';
                gridTable = gridTable + '</div>';
                // GRID HEADER

                for (var i = 0; i < myGridList.length; i++) {
                    var getID = myGridList[i].ID;
                    var getParamName = myGridList[i].ParamName;
                    var getParamValue = myGridList[i].ParamValue;
                    var getSrNo = i + 1;

                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getSrNo + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getParamName + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getParamValue + '</div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW
                }

                $('#tlbOrderParameterGrid').html(gridTable);

               // setupGridPagingList('tlbInboundGridPager', CurrentPage, getTotalRecords, loadOrderRequestList, getglobalTotalRecords);
            }
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function loadNormalRequestList() {
    /* Static API Call */
    apiPath = "StaticAPI/GetApprovalList.json";
    postData = null;
    /* Static API Call */

    callHttpUrl(apiPath, postData, function (data) {

        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            $('#tlbInboundGrid').html('');
            var getResult = data.Result;
            var myGridListcount = getResult.Table;
            var myGridList = getResult.Table1;

            // Start New Task code to check task assighn not availble hide comple order dashboard
            if (myGridList != "") {
                // GET DASHBOARD COUNTS

                // BIND DATA GRID
                var gridTable = '';

                // GRID HEADER
                gridTable = gridTable + '<div class="wms-srv-grid-header" style="text-align: center;">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Request No</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Department</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Request Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Exp. Delivery Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Title</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Request By</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px;">Status</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
                gridTable = gridTable + '</div>';
                // GRID HEADER

                for (var i = 0; i < myGridList.length; i++) {
                    var getID = myGridList[i].ID;
                    var getRequestNo = myGridList[i].RequestNo;
                    var getDepartment = myGridList[i].Department;
                    var getRequestDate = myGridList[i].RequestDate;
                    var getExpDeliveryDate = myGridList[i].ExpDeliveryDate;
                    var getTitle = myGridList[i].Title;
                    var getRequestBy = myGridList[i].RequestBy;
                    var getStatus = myGridList[i].Status;

                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getRequestNo + '" ></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRequestNo + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getDepartment + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRequestDate + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getExpDeliveryDate + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getTitle + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRequestBy + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-status-holder" title="Status">' + 
                       '<div class="wms-srv-status-display">' + 
                            '<div class="wms-srv-status-label">Pending for Approval</div>' +
                            '<div class="wms-srv-status-progress">' +
                        '<div class="wms-srv-dot wms-srv-green" data-orderid="' + getRequestNo + '" data-status="Expected Receipt" title="Request" onclick="viewOrder(\'' + getRequestNo + '\', true);return false;"></div>' +
                        ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + getRequestNo + '" data-status="Expected Receipt" title="Approval" onclick="openApprovalTrans(\'' + getRequestNo + '\');return false;"></div>' +
                       // ' <div class="wms-srv-dot wms-srv-gray" data-orderid="' + getRequestNo + '" data-status="Expected Receipt" title="Dispatch" onclick="openDispatchPopup(\'' + getRequestNo + '\');return false;"></div>' +
                            '</div>' +
                            '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>' +
                        '</div>' +
                       '</div ></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' + 
                        '<a href = "#" title = "Document" data-prefix="DOC" data-orderid="' + getRequestNo + '" class="wms-srv-icononly" onclick="openDocumentObject(\'' + getRequestNo + '\');"><i class="fas fa-file-alt"></i></a>' +
                        '<div class="wms-srv-action-sep" >|</div> ' +
                        '<a href = "#" title = "Communication" data-prefix="CMM" data-orderid="' + getRequestNo + '" class="wms-srv-icononly" onclick="openCommunicationObject(\'' + getRequestNo + '\');" > <i class="fas fa-envelope"></i></a> ' +
                        '<div class="wms-srv-action-sep" >|</div> ' +
                        '<a href = "#" title = "Approval" data-prefix="APR" data-orderid="' + getRequestNo + '" class="wms-srv-icononly" onclick="openApprovalTrans(\'' + getRequestNo + '\');" > <i class="fas fa-user-check"></i></a> ' +
                        // '<div class="wms-srv-action-sep" >|</div> ' +
                        // '<a href = "#" title = "Dispatch" data-prefix="TRN" data-orderid="' + getRequestNo + '" class="wms-srv-icononly" onclick="openDispatchPopup(\'' + getRequestNo + '\');" > <i class="fas fa-truck-moving fa-flip-horizontal"></i></a> ' +
                        // '<div class="wms-srv-action-sep" >|</div> ' +
                        // '<a href = "#" title = "Parameter" data-prefix="PRA" data-orderid="" class="wms-srv-icononly" onclick="openOrderParameterPopup(\'' + getRequestNo + '\');"> <i class="fas fa-tag"></i></a>' +
                        '</div>' + 
                        '</div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW
                }

                $('#tlbInboundGrid').html(gridTable);

                setupGridPagingList('tlbInboundGridPager', CurrentPage, getTotalRecords, loadOrderRequestList, getglobalTotalRecords);
            }
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function clearSearchFilter() {
    debugger
    $('#ddlsearch').val('ALL');
    $('#txtvalue').val('');
    searchfilter = 'ALL';
    searchvalue = 'none';
    loadOrderRequestList();
}

function checkQcval() {
    var apiPath = wmsApiPath + 'PO/getQualityvalues';
    var getCustomerId = $("#ddlcustomer").val();
    var postData =
    {
        "customerID": getCustomerIdInward

    };
    callHttpUrl(apiPath, postData, function (result) {
        var isSuccess = result.StatusCode;
        var result = result.Result;
        //var qcresult = JSON.parse(result);
        var qcresult = result.Table;
        hasQualityCheck = qcresult[0].Qc;
        if (hasQualityCheck == true) {
            $('#dashQualityCheck').show();
            $('#dashExpectedReceipt').removeClass('col-md-3');
            $('#dashReceiving').removeClass('col-md-3');
            $('#dashPutAway').addClass('col-md-2');
            //  $('#dashCancelOrder').addClass('col-md-2');
            $('#dashCompletelOrder').addClass('col-md-2');
        }
        else {

            $('#QualityCheck').hide();
            $('#dashQualityCheck').hide();
            $('#dashExpectedReceipt').removeClass('col-md-2');
            $('#dashReceiving').removeClass('col-md-2');
            $('#dashPutAway').addClass('col-md-3');
            // $('#dashCancelOrder').addClass('col-md-3');
            $('#dashCompletelOrder').addClass('col-md-3');
        }

    });
}

function inboundSearch() {

    searchfilter = $("#ddlsearch").val();
    searchvalue = $("#txtvalue").val();
    if (searchvalue == '') {
        alert('Please Enter value for filter');

    }
    else {
        loadOrderRequestList();
    }
}

function bindStatusControl(orderId, strStatus)//,getTaskAssignstatus
{
    
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getStatusColor('Expected Receipt', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Expected Receipt" onclick="viewOrder(\'' + orderId + '\', true);return false;"></div>';

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Receiving', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Receiving" onclick="viewgrnOrder(\'' + orderId + '\');return false;"></div>';

    if (hasQualityCheck == true) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wmsStatusQualityCheck wms-srv-' + getStatusColor('Quality Check', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Quality Check" onclick="viewQualityCheck(\'' + orderId + '\');return false;"></div>';
    }

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Put Away', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Put Away" onclick="viewPutAway(\'' + orderId + '\');return false;"></div>';

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}
function getStatusColor(dataFor, currentStatus) {
    var myColor = 'gray';


    if (dataFor == 'Expected Receipt') {
        if (currentStatus == 'Expected Receipt' || currentStatus == 'Receiving' || currentStatus == 'Partially Completed' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        }
    }
    else if (dataFor == 'Receiving') {
        if (currentStatus == 'Receiving' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        }
        else if (currentStatus == 'Partially Completed') {
            myColor = 'partial';
        }
        else if (currentStatus == 'Expected Receipt') {
            myColor = 'red';
        }

    }

    else if (dataFor == 'Quality Check') {
        if (currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        }
        else if (currentStatus == 'Receiving' || currentStatus == 'Partially Completed') {
            myColor = 'red';
        }

    }

    else if (dataFor == 'Put Away') {
        if (currentStatus == 'Put Away') {
            myColor = 'green';
        }
        else if (hasQualityCheck == true) {
            if (currentStatus == 'Quality Check') {
                myColor = 'red';
            }
        }

        else if (currentStatus == 'Receiving') {
            myColor = 'red';
        }

    }
    else if (dataFor == 'Task Completed') {
        if (currentStatus == 'Completed') {
            myColor = 'green';
        }
    }
    return myColor;
}

function bindActionControl(orderId, objectHeadData, obj) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
    /* TEMP UNCOMMENTED 21 Nov 2023 */
    //htmlControl = htmlControl + '<a href="#" title="Approval" data-prefix="APP" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openApproval(' + orderId + ');"><i class="fas fa-user-check"></i></a>';
    //htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    /* TEMP UNCOMMENTED 21 Nov 2023 */
    htmlControl = htmlControl + '<a href="#" title="Document" data-prefix="DOC" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openDocumentObject(' + orderId + ', \'inward\', \'' + objectHeadData + '\');"" ><i class="fas fa-file-alt"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="Communication" data-prefix="CMM" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openCommunicationObject(' + orderId + ', \'inward\', \'' + objectHeadData + '\');"><i class="fas fa-envelope"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    if (obj == 'ExpectedReceipt' || obj == 'Receiving') {
        htmlControl = htmlControl + '<a href="#" title="Transport" data-prefix="TRN" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openTransport(' + orderId + ', false);"><i class="fas fa-truck-moving fa-flip-horizontal"></i></a>';

        htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    }
    // htmlControl = htmlControl + '<a href="#" title="Task Assignment" data-prefix="" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="OpenTaskAssignment(\'' + 'Inward' +'\',' + orderId + ');"><i class="fas fa-tasks"></i></a>';

    // htmlControl = htmlControl + '<a href="#" title="Task Assignment" data-prefix="" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="assignGetPass();"><i class="fas fa-tasks"></i></a>';


    //htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="3PL" data-prefix="3PL" data-orderid="" class="wms-srv-icononly btn3pl" onClick="open3PL(' + orderId + ');"><i class="fa fa-receipt"></i></a>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

// function setupGridPaging(gridObjId,strCurrentPage,strTotalRecords,callBackFunction)
//  {
//     debugger;
//     var global_max_record_count = 10;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 10) + 1;
//     var recordTo = recordFrom + 9;
//     var totalRecord = Number(strTotalRecords);
//     var pagerLinks = '';

//    /* var breakDataRange = dataLine.split(',');
//     for (var dr = 0; dr < breakDataRange.length; dr++) {
//         var dataItem = breakDataRange[dr].split(":");
//         var dataName = dataItem[0].trim();
//         var dataValue = Number(dataItem[1].trim());
//         if (dataName == 'pageno') {
//             pageNo = dataValue;
//         } else if (dataName == 'start') {
//             recordFrom = dataValue;
//         } else if (dataName == 'to') {
//             recordTo = dataValue;
//         } else if (dataName == 'total') {
//             totalRecord = dataValue;
//         }
//     }

//     if (placeHolderId == undefined) {
//         placeHolderId = 'pnlWmsDetail';
//     }
//     */

//     $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//     var lnkCounter = 1;
//     var currentCounter = global_max_record_count;
//     //var currentCounter = 0;
//     var lastPage = 0;
//     while (currentCounter < totalRecord) 
// 	{
//         if (lnkCounter == pageNo) 
//         {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else 
//         {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         global_last_page_no = lnkCounter;
//         currentCounter = currentCounter + global_max_record_count;
//         lnkCounter = lnkCounter + 1;
//     }

//     /* Add Page linke for remaining record */
//     if (currentCounter > totalRecord) 
// 	{
//         if (lnkCounter == pageNo)
//          {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         // Update last page count - 21 Sept 2021
//         this.global_last_page_no = lnkCounter;
//     }
//     /* Add Page linke for remaining record */
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left" title="Previous"></i></a>';
//    // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//   //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//     pagerNavLinks += '<a href="#" data-page="' + lastPage +'"><i class="fas fa-angle-double-right" title="Next"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//     $('#tlbInboundGridPager .wms-srv-pager-links a').off();
//     $('#tlbInboundGridPager .wms-srv-pager-links a').click(function ()
// 	{
//         var getDataPage = $(this).attr('data-page');
//         if (callBackFunction != null)
// 			{
//             callBackFunction(getDataPage,globalActiveTab, searchfilter, searchvalue);
//         }
//     });
//    /* if (callBackFunction != null) {
//         callBackFunction();
//     }*/
// }
function openAllocationPlan() {
    $('#wms-srv-allocation-popup').show();
    $('#wms-srv-allocation-popup-close').off();
    $('#wms-srv-allocation-popup-close').click(function () {
        $('#wms-srv-allocation-popup').hide();
    });
}
// function open3PL(oid) 
// {
//     $('#wms-srv-3pl-popup').show();
//     $('#wms-srv-3pl-popup-close').off();
//     $('#wms-srv-3pl-popup-close').click(function () {
//         $('#wms-srv-3pl-popup').hide();
//     });
// }

function openDocument(oid) {
    $('#wms-srv-document-popup').show();
    $('#wms-srv-document-popup-close').off();
    $('#wms-srv-document-popup-close').click(function () {
        $('#wms-srv-document-popup').hide();
    });
}
/* COMMON FUNCTION FOR FORM */
function validateEmailAddress(emailVal) {
    var isEmailValid = true;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailVal.match(mailformat)) {
        isEmailValid = true;
    }
    else {
        isEmailValid = false;
    }
    return isEmailValid;
}
function validatePhoneNo(phoneNoVal) {
    var phonePattern = /^\d{10}$/;
    if (phoneNoVal.match(phonePattern)) {
        return true;
    }
    else {
        return false;
    }
}
/*
 VALIDATE WITH COUNTRY PREFIX
 Example
    +XX-XXXX-XXXX
    +XX.XXXX.XXXX
    +XX XXXX XXXX
 */
function validatePhoneWithCountryPrefix(phoneNoVal) {
    var phonePattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (phoneNoVal.match(phonePattern)) {
        return true;
    } else {
        return false;
    }
}
/*
 VALIDATE WITHOUT COUNTRY PREFIX
 Example
    XXX-XXX-XXXX
    XXX.XXX.XXXX
    XXX XXX XXXX
 */
function validatePhoneWithoutPrefix(phoneNoVal) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNoVal.match(phoneno)) {
        return true;
    } else {
        alert("message");
        return false;
    }
}
function validateIsNumber(num) {
    var isNumber = true;
    var chkNum = Number.isNaN(Number(num) / 1);
    if (chkNum) {
        isNumber = false;
    } else {
        var roundNo = Math.round(num);
        var chkNo = Number(num);
        if (roundNo != chkNo) {
            isNumber = false;
        }
    }
    return isNumber;
}
function validateIsFloatNumber(num) {
    var isFloatNumber = true;
    var chkNum = Number.isNaN(Number(num) / 1);
    if (chkNum) {
        isFloatNumber = false;
    } else {
        var strNum = num.toString();
        if (strNum.indexOf('.') > -1) {
            var breakDot = strNum.split('.');
            if (breakDot.length == 2) {
                isFloatNumber = true;
            } else {
                isFloatNumber = false;
            }
        } else {
            isFloatNumber = false;
        }
    }
    return isFloatNumber;
}
/* COMMON FUNCTION FOR FORM */
function isBlankString(strVal) {
    if (strVal == null || strVal == undefined || strVal.trim() == '') {
        strVal = '-';
    }
    return strVal;
}
function isBlankNumber(strVal) {
    if (strVal == null || strVal == undefined || strVal.trim() == '') {
        strVal = '0';
    }
    return strVal;
}
function isBlankDate(strDate) {
    var strCurrentDate = '';
    if (strDate.trim() != '') {
        strCurrentDate = formatCustomDate(strDate);
    } else {
        var currentDate = new Date();
        strCurrentDate = formatCustomDate(currentDate);
    }
    return strCurrentDate;
}
/////////////////////////////////////////////comman API Start//////////////////////////////////////////////////
//#region SuggestionList

function getSuggestionList(wmsSuggestionControl, objvalue) {
    debugger;
    var apiPath = wmsApiPath + 'CommFunAPI/GetSKUSuggest';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var strOrderId = $('#hdnPoOid').val();
    var strid = $('#hdnorderid').val();
    var obj = objvalue;
    var orderobject = $('#ddlPageObject').val();

    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }
    if (objvalue == 'QC') {
        strOrderId = $('#lblgrnno').html();
    }


    var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "OrderId": strOrderId,
        "skuobject": obj,
        "skey": getSkey,
        "orderobj": orderobject
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            var getSkuSuggestion = data.Result;
            // var suggestionListObj = JSON.parse(getSkuSuggestion);
            // var suggestionList = suggestionListObj.SkuSuggestionResult;

            var suggestionList = getSkuSuggestion.Table;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }
            if (obj == 'PurchaseOrder') {
                for (var i = 0; i < suggestionList.length; i++) {
                    var getId = suggestionList[i].ID;
                    var getSKU = suggestionList[i].Sku;
                    var getSKUName = suggestionList[i].Name;
                    var getSKUDescription = suggestionList[i].Description;
                    $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getSKU + '" data-name="' + getSKUName + '"  data-description="' + getSKUDescription + '">' + getSKU + '</div>');
                }
            }
            else if (obj == 'GRN') {
                for (var i = 0; i < suggestionList.length; i++) {
                    if (getPageObject == 'SalesReturn') {
                        var getId = suggestionList[i].ID;
                        var getSKU = suggestionList[i].Sku;
                        var getpoqty = suggestionList[i].POQty;
                        var palletID = suggestionList[i].PackID;
                        var palletname = suggestionList[i].palletname;
                        var getSKUDescription = suggestionList[i].Description;
                        $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getSKU + '" data-name="' + getpoqty + '"  data-description="' + getSKUDescription + '"  data-grnpalletID="' + palletID + '"  data-grnpalletname="' + palletname + '">' + getSKU + '</div>');
                    }
                    else {
                        var getId = suggestionList[i].ID;
                        var getSKU = suggestionList[i].Sku;
                        var getpoqty = suggestionList[i].POQty;
                        var getSKUDescription = suggestionList[i].Description;
                        $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getSKU + '" data-name="' + getpoqty + '"  data-description="' + getSKUDescription + '">' + getSKU + '</div>');
                    }
                }
            }
            else if (obj == 'QC') {
                for (var i = 0; i < suggestionList.length; i++) {
                    var getId = suggestionList[i].ID;
                    var getSKU = suggestionList[i].Sku;
                    var getQCName = suggestionList[i].Name
                    var getQCUOMID = suggestionList[i].UOMID;
                    var getUOM = suggestionList[i].UOM;
                    var getQCPallet = suggestionList[i].PalletName;
                    var getpoqty = suggestionList[i].POQty;
                    var getGRNQty = suggestionList[i].GRNQty;

                    $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getSKU + '"data-name="' + getpoqty + '"data-grnqty="' + getGRNQty + '"data-description="' + getQCName + '"data-palletname="' + getQCPallet + '"data-uomqcID="' + getQCUOMID + '"data-UOM="' + getUOM + '">' + getSKU + '</div>');
                }
            }
            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();

            $('.wms-srv-suggestion-options').click(function () {
                // $(wmsSuggestionControl).attr('data-id', getListId);


                if (obj == 'PurchaseOrder') {

                    var listItemObj = $(this);

                    // wmsListOptClick(listItemObj);
                    var getListId = $(this).attr('data-id');
                    var getListLabel = $(this).attr('data-label');
                    var getSKUName = $(this).attr('data-name');
                    var getSKUDescription = $(this).attr('data-description');

                    $('#addNew_ItemCode').val(getListLabel);
                    $('#addNew_ItemCode').attr('data-id', getListId);
                    $('#addNew_Name').val(getSKUName);
                    $('#addNew_Description').val(getSKUDescription);
                    $('#addNew_RequestedQty').val('');
                    // $('#addNew_UOM').val();
                    $('#addNew_OrderQty').val('');
                    $('#addNew_Lottable').val('');
                    $('#addNew_CaseNetWeight').val('');
                    $('#addNew_CaseGrossWeight').val('');
                    $('#addNew_TotalCarton').val('');
                    clearSuggestionList();
                    GetUomBySKU(getListId, '0', 'PurchaseOrder');
                    getLottableBySku(getListId, 'PurchaseOrder', '0', '');
                }
                else if (obj == 'GRN') {

                    var listItemObj = $(this);
                    // wmsListOptClick(listItemObj);
                    var getListId = $(this).attr('data-id');
                    var getListLabel = $(this).attr('data-label');
                    var getPoqty = $(this).attr('data-name');
                    var getListSkuDescription = $(this).attr('data-description');
                    $('#txtskucode').val(getListLabel);
                    $('#txtskucode').attr('data-id', getListId);
                    $('#txtpoqty').val(getPoqty);
                    if (getPageObject == 'SalesReturn') {
                        var palletID = $(this).attr('data-grnpalletID');
                        var palletname = $(this).attr('data-grnpalletname');
                        $('#txtpalletcode').val(palletname);
                        $('#txtpalletcode').attr('data-grnpalletID', palletID);



                    }

                    clearSuggestionList();
                    //GetUomGRNBySKU(getListId, '0');
                    GetUomBySKU(getListId, '0', 'GRN');
                    getLottableBySku(getListId, 'GRN', '0', '');
                }
                else if (obj == 'QC') {

                    var listItemObj = $(this);
                    // wmsListOptClick(listItemObj);
                    var getListId = $(this).attr('data-id');
                    var getListLabel = $(this).attr('data-label');
                    var getPoqty = $(this).attr('data-name');
                    var getGRNqty = $(this).attr('data-grnqty');
                    var getName = $(this).attr('data-description');
                    var getpallet = $(this).attr('data-palletname');
                    var getpalletID = $(this).attr('data-palletID');

                    var getUOM = $(this).attr('data-UOM');
                    var getuomiD = $(this).attr('data-uomqcID');
                    $('#txtQCskucode').val(getListLabel);
                    $('#txtQCskucode').attr('data-id', getListId);
                    $('#txtQCskuname').val(getName);
                    $('#txtQCPOqty').val(getPoqty);
                    $('#txtQCGrnqty').val(getGRNqty);
                    $('#txtqcPallet').val(getpallet);
                    $('#txtqcPallet').attr('data-palid', getpalletID);
                    $('#txtQCUOM').val(getUOM);
                    $('#txtQCUOM').attr('data-uomqcID', getuomiD);

                    clearSuggestionList();
                    //GetUomGRNBySKU(getListId, '0');
                    //GetUomBySKU(getListId, '0','QC');
                    getLottableBySku(getListId, 'QC', getpallet, '');
                }

            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}

function getLottableBySku(strSkuId, obj, qcpallet, lottable, strIsMultiple, strCounterNum) {
    debugger;
    //var apiPath ='http://localhost:50068/api/staging/v1/CommFunAPI/getLottablevalues';
    var apiPath = wmsApiPath + 'CommFunAPI/getLottablevalues';
    var poID = $("#hdnPoOid").val();
    var grnID = $("#hdngrnid").val();

    var addNewLottableId = 'addNew_Lottable';
    if (strIsMultiple != null && strIsMultiple == true) {
        addNewLottableId = 'addNew_Lottable_' + strCounterNum;
    }

    var postData =
    {
        "prodID": strSkuId,
        "orderID": poID,
        "obj": obj,
        "GrnID": grnID,
        "palletname": qcpallet,
        "lottable": lottable
    };

    if (strSkuId != '') {

        callHttpUrl(apiPath, postData, function (data) {
            //alert(data);
            var lottableInput = '';
            $('#grnLottable').html('');
            $('#lblgrnscnlottable').html('');
            $('#' + addNewLottableId).html('');
            $('#QCLottable').html('');


            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                var getResult = data.Result;

                var getLottableList = getResult.Table;
                if (getLottableList.length > 0) {
                    for (var i = 0; i < getLottableList.length; i++) {
                        var getlotvalue = '';
                        var getId = getLottableList[i].ID;
                        var getPODTId = getLottableList[i].PODTID;
                        var getLottableDescription = getLottableList[i].LottableTitle;
                        var getLottableFormat = getLottableList[i].LottableFormat.toLowerCase();
                        var lottype = getLottableList[i].Lottabledescription;

                        var gtlotcnt = getLottableList[i].lotcnt;
                        if (obj != 'PurchaseOrder') {
                            if (gtlotcnt > 0) {
                                if (getLottableDescription == 'Lottable-1') {
                                    getlotvalue = getLottableList[i].Lot1;
                                }
                                else if (getLottableDescription == 'Lottable-2') {
                                    getlotvalue = getLottableList[i].Lot2;

                                }
                                else if (getLottableDescription == 'Lottable-3') {
                                    getlotvalue = getLottableList[i].Lot3;

                                }
                                else if (getLottableDescription == 'Lottable-4') {
                                    getlotvalue = getLottableList[i].Lot4;

                                }
                                else if (getLottableDescription == 'Lottable-5') {
                                    getlotvalue = getLottableList[i].Lot5;

                                }
                                else if (getLottableDescription == 'Lottable-6') {
                                    getlotvalue = getLottableList[i].Lot6;

                                }
                                else if (getLottableDescription == 'Lottable-7') {
                                    getlotvalue = getLottableList[i].Lot7;

                                }
                                else if (getLottableDescription == 'Lottable-8') {
                                    getlotvalue = getLottableList[i].Lot8;

                                }
                                else if (getLottableDescription == 'Lottable-9') {
                                    getlotvalue = getLottableList[i].Lot9;

                                }
                                else if (getLottableDescription == 'Lottable-10') {
                                    getlotvalue = getLottableList[i].Lot10;
                                }

                            }
                        }

                        var datepickerClass = '', readtext = '';

                        if (getLottableFormat == 'Date' || getLottableFormat == 'dd/mm/yyyy' || getLottableFormat == 'mmm-yy' || getLottableFormat == 'wwyy') {
                            if (getLottableFormat != 'wwyy') {
                                datepickerClass = 'wms-srv-datepicker';
                                readtext = 'readonly';
                            } else {
                                weekPickerCtrlId = weekPickerCtrlId + 1;
                                datepickerClass = 'wms-srv-weekpicker wms-srv-weekpicker_' + weekPickerCtrlId;
                                //readtext='readonly';
                            }

                        }
                        if (obj == 'GRN') {

                            lottableInput = '<input type="text" ' + readtext + ' value="' + getlotvalue + '" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '"> ';
                            //  $('#grnLottable').append(lottableInput);

                            $('#tblgrndetail .wmsFrmAddRow .gridCellLottable[data-lottype="' + lottype + '"]').append(lottableInput);
                            showHideLottableCellForGRNRow();
                        }
                        else if (obj == 'PurchaseOrder') {

                            lottableInput = '<input type="text" ' + readtext + ' value="" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '" style="width:100%;"> ';
                            var getLottableHead = $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lottype="' + lottype + '"]');
                            if (getLottableHead.length == 0) {
                                var getFirstEmptyLotCell = $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lottype=""]').eq(0);
                                $(getFirstEmptyLotCell).show();
                                $(getFirstEmptyLotCell).html(lottype);
                                $(getFirstEmptyLotCell).attr('data-lottype', lottype);
                                var getLotIndex = $(getFirstEmptyLotCell).attr('data-lotindex');
                                $('#addNew_Lottable_' + getLotIndex + '_' + strCounterNum).append(lottableInput);
                                $('#addNew_Lottable_' + getLotIndex + '_' + strCounterNum).attr('data-lottype', lottype);
                                // $('#addNew_Lottable_'+ getLotIndex +'_' + strCounterNum).show();
                            } else {
                                $('#tlbPoOrderDetailsGrid .wmsFrmAddRow_' + strCounterNum + ' .gridCellLottable[data-lottype="' + lottype + '"]').append(lottableInput);
                                // $('#tlbPoOrderDetailsGrid .wmsFrmAddRow_'+ strCounterNum +' .gridCellLottable[data-lottype="' + lottype + '"]').show();
                            }
                            // showHideLottableCellForPO();
                            showHideLottableCellForPOViewRow();
                            //alert(getEmptyLottableHead.length);
                            // $('#' + addNewLottableId).append(lottableInput);
                        }
                        else if (obj == 'ScanGRN') {
                            lottableInput = '<input type="text" ' + readtext + ' value="' + getlotvalue + '" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '"> ';

                            $('#lblgrnscnlottable').append(lottableInput);
                        }
                        else if (obj == 'QC') {
                            lottableInput = '<input type="text" ' + readtext + ' disabled value="' + getlotvalue + '" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '"> ';
                            $('#tblQCGrid .wmsFrmAddRow .gridCellLottable[data-lottype="' + lottype + '"]').html(lottableInput);
                            //  $('#QCLottable').append(lottableInput);
                            showHideLottableCellForQCList();
                        } else if (obj == 'GatePass') {
                            var GatePassRowId = 'GatePassRow_' + strCounterNum;
                            lottableInput = '<input type="text" ' + readtext + ' value="' + getlotvalue + '" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '"> ';
                            //$('#'+ GatePassRowId +' .GatePassLottable').append(lottableInput);
                            $('#' + GatePassRowId + '  .gridCellLottable[data-lottype="' + lottype + '"]').html(lottableInput);
                            $('#' + GatePassRowId + ' .btnEditLottable').hide();
                            $('#' + GatePassRowId + ' .btnSaveLottable').show();
                            showHideLottableCellForGatePassRow();
                        }

                        if (getLottableFormat == 'Date' || getLottableFormat == 'dd/mm/yyyy') {
                            //$('.wms-srv-datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
                            $('.wms-srv-datepicker').datepicker({
                                onSelect: function (dateText, inst) {
                                    debugger;
                                    var ltype = $(this).attr('data-lottype');

                                    const today = new Date();
                                    const yyyy = today.getFullYear();
                                    let mm = today.getMonth() + 1; // Months start at 0!
                                    let dd = today.getDate();
                                    var tddate = mm + '/' + dd + '/' + yyyy;

                                    const seldate = new Date(dateText);
                                    let yy = seldate.getFullYear();
                                    let m = seldate.getMonth() + 1; // Months start at 0!
                                    let d = seldate.getDate();

                                    if (Number(d) < 10) {
                                        d = "0" + d;
                                    }
                                    if (Number(m) < 10) {
                                        m = "0" + m;
                                    }

                                    if (ltype.toLowerCase() == 'MfgDate'.toLowerCase() || ltype.toLowerCase() == 'Week MFG'.toLowerCase()) {
                                        if (Date.parse(dateText) >= Date.parse(tddate)) {
                                            alert('Please select date less than Todays Date..!');
                                            $(this).val('');
                                        }
                                        else {
                                            $(this).val(d + '/' + m + '/' + yy);
                                        }
                                    }
                                    else if (ltype.toLowerCase() == 'ExpDate'.toLowerCase()) {
                                        if (Date.parse(dateText) <= Date.parse(tddate)) {
                                            alert('Please select date greater than Todays Date..!');
                                            $(this).val('');
                                        }
                                        else {
                                            $(this).val(d + '/' + m + '/' + yy);
                                        }
                                    }
                                    else {
                                        $(this).val(d + '/' + m + '/' + yy);
                                    }
                                }
                            });
                        }
                        else if (getLottableFormat == 'mmm-yy') {
                            //$('.wms-srv-datepicker').datepicker({ dateFormat: 'M-yy' });
                            $('.wms-srv-datepicker').datepicker({
                                onSelect: function (dateText, inst) {
                                    debugger;
                                    var ltype = $(this).attr('data-lottype');

                                    const today = new Date();
                                    let yyyy = today.getFullYear();
                                    let mm = today.getMonth() + 1; // Months start at 0!
                                    let dd = today.getDate();

                                    var tddate = mm + '/' + dd + '/' + yyyy;

                                    const tday = new Date(dateText)
                                    var m = tday.toLocaleString('en-US', { month: 'short' })
                                    var y = dateText.toString().substr(-2);


                                    if (ltype.toLowerCase() == 'MfgDate'.toLowerCase() || ltype.toLowerCase() == 'Week MFG'.toLowerCase()) {
                                        if (Date.parse(dateText) >= Date.parse(tddate)) {
                                            alert('Please select date less than Todays Date..!');
                                            $(this).val('');
                                        }
                                        else {
                                            $(this).val(m + '-' + y);
                                        }
                                    }
                                    else if (ltype.toLowerCase() == 'ExpDate'.toLowerCase()) {
                                        if (Date.parse(dateText) < Date.parse(tddate)) {
                                            alert('Please select date greater than Todays Date..!');
                                            $(this).val('');
                                        }
                                        else {
                                            $(this).val(m + '-' + y);
                                        }
                                    }
                                    else {
                                        $(this).val(m + '-' + y);
                                    }
                                }
                            });
                        }
                        else if (getLottableFormat == 'wwyy') {
                            $('.wms-srv-weekpicker_' + weekPickerCtrlId).bisplWeekPicker({
                                onValidate: function (wObj, userWeek, userYear) {
                                    debugger;
                                    var isValidWeekMfg = true;
                                    var ltype = $(wObj).attr('data-lottype');

                                    const today = new Date();
                                    let yyyy = Number(today.getFullYear());
                                    let mm = today.getMonth() + 1; // Months start at 0!
                                    let dd = today.getDate();

                                    var tddate = mm + '/' + dd + '/' + yyyy;
                                    var currentWeek = today.getWeek();
                                    if (ltype.toLowerCase() == 'MfgDate'.toLowerCase() || ltype.toLowerCase() == 'Week MFG'.toLowerCase()) {
                                        if (((userWeek == currentWeek || (userWeek > currentWeek)) && userYear == yyyy) || (userYear > yyyy)) {
                                            alert('Please select week less than Current Week..!');
                                            isValidWeekMfg = false;
                                        }
                                    }
                                    else if (ltype.toLowerCase() == 'ExpDate'.toLowerCase()) {
                                        if ((userWeek <= currentWeek && userYear == yyyy) || (userYear < yyyy)) {
                                            alert('Please select Week greater than Current Week..!');
                                            isValidWeekMfg = false;
                                        }
                                    }
                                    return isValidWeekMfg;
                                }
                            });
                            /* $('.wms-srv-datepicker').datepicker({ 
                                onSelect: function(dateText, inst) {
                                debugger;
                                var wk = '';
                                var year = dateText.toString().substr(-2);
                                var ltype = $(this).attr('data-lottype');

                                const today = new Date();
                                let yyyy = today.getFullYear();
                                let mm = today.getMonth() + 1; // Months start at 0!
                                let dd = today.getDate();

                                var tddate = mm+'/'+dd+'/'+yyyy;

                                if($.datepicker.iso8601Week(new Date(dateText)).toString().length == 1){
                                    wk = '0'+$.datepicker.iso8601Week(new Date(dateText)).toString();
                                } else{
                                    wk = $.datepicker.iso8601Week(new Date(dateText)).toString();
                                }

                                if(ltype == 'MfgDate' || ltype == 'Week MFG'){
                                    if(Date.parse(dateText) >= Date.parse(tddate)){
                                        alert('Please select date less than Todays Date..!');
                                        $(this).val('');
                                    }
                                    else{
                                        $(this).val(wk+year);
                                    }
                                }
                                else if(ltype == 'ExpDate'){
                                    if(Date.parse(dateText) < Date.parse(tddate)){
                                        alert('Please select date greater than Todays Date..!');
                                        $(this).val('');
                                    }
                                    else{
                                        $(this).val(wk+year);
                                    }
                                }
                                else{
                                    $(this).val(wk+year);
                                }
                            }
                        }); */
                        }
                    }
                }
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
}

// function getLottableBySku(strSkuId, obj, qcpallet, lottable, strIsMultiple, strCounterNum) {
//     debugger;
//     //var apiPath ='http://localhost:50068/api/staging/v1/CommFunAPI/getLottablevalues';
//     var apiPath = wmsApiPath + 'CommFunAPI/getLottablevalues';
//     var poID = $("#hdnPoOid").val();
//     var grnID = $("#hdngrnid").val();
//     var addNewLottableId = 'addNew_Lottable';
//     if (strIsMultiple != null && strIsMultiple == true) {
//         addNewLottableId = 'addNew_Lottable_' + strCounterNum;
//     }
//     var postData =
//     {
//         "prodID": strSkuId,
//         "orderID": poID,
//         "obj": obj,
//         "GrnID": grnID,
//         "palletname": qcpallet,
//         "lottable": lottable
//     };
//     if (strSkuId != '') {
//         callHttpUrl(apiPath, postData, function (data) {
//             //alert(data);
//             var lottableInput = '';
//             $('#grnLottable').html('');
//             $('#lblgrnscnlottable').html('');
//             $('#' + addNewLottableId).html('');
//             $('#QCLottable').html('');
//             var getStatus = data.Status;
//             var getStatusCode = data.StatusCode;
//             if (getStatusCode == 'Success') {
//                 var getResult = data.Result;
//                 var getLottableList = getResult.Table;
//                 if (getLottableList.length > 0) {
//                     for (var i = 0; i < getLottableList.length; i++) {
//                         var getlotvalue = '';
//                         var getId = getLottableList[i].ID;
//                         var getPODTId = getLottableList[i].PODTID;
//                         var getLottableDescription = getLottableList[i].LottableTitle;
//                         var getLottableFormat = getLottableList[i].LottableFormat.toLowerCase();
//                         var lottype = getLottableList[i].Lottabledescription;
//                         var gtlotcnt = getLottableList[i].lotcnt;
//                         if (obj != 'PurchaseOrder') {
//                             if (gtlotcnt > 0) {
//                                 if (getLottableDescription == 'Lottable-1') {
//                                     getlotvalue = getLottableList[i].Lot1;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-2') {
//                                     getlotvalue = getLottableList[i].Lot2;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-3') {
//                                     getlotvalue = getLottableList[i].Lot3;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-4') {
//                                     getlotvalue = getLottableList[i].Lot4;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-5') {
//                                     getlotvalue = getLottableList[i].Lot5;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-6') {
//                                     getlotvalue = getLottableList[i].Lot6;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-7') {
//                                     getlotvalue = getLottableList[i].Lot7;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-8') {
//                                     getlotvalue = getLottableList[i].Lot8;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-9') {
//                                     getlotvalue = getLottableList[i].Lot9;
//                                 }
//                                 else if (getLottableDescription == 'Lottable-10') {
//                                     getlotvalue = getLottableList[i].Lot10;
//                                 }
//                             }
//                         }
//                         var datepickerClass = '', readtext = '';
//                         if (getLottableFormat == 'Date' || getLottableFormat == 'dd/mm/yyyy' || getLottableFormat == 'mmm-yy' || getLottableFormat == 'wwyy') {
//                             if (getLottableFormat != 'wwyy') {
//                                 datepickerClass = 'wms-srv-datepicker';
//                                 readtext = 'readonly';
//                             } else {
//                                 weekPickerCtrlId = weekPickerCtrlId + 1;
//                                 datepickerClass = 'wms-srv-weekpicker wms-srv-weekpicker_' + weekPickerCtrlId;
//                                 //readtext='readonly';
//                             }
//                         }
//                         if (obj == 'GRN') {
//                             lottableInput = '<input type="text" ' + readtext + ' value="' + getlotvalue + '" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '"> ';
//                             //  $('#grnLottable').append(lottableInput);
//                             $('#tblgrndetail .wmsFrmAddRow .gridCellLottable[data-lottype="' + lottype + '"]').append(lottableInput);
//                             showHideLottableCellForGRNRow();
//                         }
//                         else if (obj == 'PurchaseOrder') {
//                             lottableInput = '<input type="text" ' + readtext + ' value="" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '" style="width:100%;"> ';
//                             var getLottableHead = $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lottype="' + lottype + '"]');
//                             if (getLottableHead.length == 0) {
//                                 var getFirstEmptyLotCell = $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lottype=""]').eq(0);
//                                 $(getFirstEmptyLotCell).show();
//                                 $(getFirstEmptyLotCell).html(lottype);
//                                 $(getFirstEmptyLotCell).attr('data-lottype', lottype);
//                                 var getLotIndex = $(getFirstEmptyLotCell).attr('data-lotindex');
//                                 $('#addNew_Lottable_' + getLotIndex + '_' + strCounterNum).append(lottableInput);
//                                 $('#addNew_Lottable_' + getLotIndex + '_' + strCounterNum).attr('data-lottype', lottype);
//                                 // $('#addNew_Lottable_'+ getLotIndex +'_' + strCounterNum).show();
//                             } else {
//                                 $('#tlbPoOrderDetailsGrid .wmsFrmAddRow_' + strCounterNum + ' .gridCellLottable[data-lottype="' + lottype + '"]').append(lottableInput);
//                                 // $('#tlbPoOrderDetailsGrid .wmsFrmAddRow_'+ strCounterNum +' .gridCellLottable[data-lottype="' + lottype + '"]').show();
//                             }
//                             // showHideLottableCellForPO();
//                             showHideLottableCellForPOViewRow();
//                             //alert(getEmptyLottableHead.length);
//                             // $('#' + addNewLottableId).append(lottableInput);
//                         }
//                         else if (obj == 'ScanGRN') {
//                             lottableInput = '<input type="text" ' + readtext + ' value="' + getlotvalue + '" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '"> ';
//                             $('#lblgrnscnlottable').append(lottableInput);
//                         }
//                         else if (obj == 'QC') {
//                             lottableInput = '<input type="text" ' + readtext + ' disabled value="' + getlotvalue + '" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '"> ';
//                             $('#tblQCGrid .wmsFrmAddRow .gridCellLottable[data-lottype="' + lottype + '"]').html(lottableInput);
//                             //  $('#QCLottable').append(lottableInput);
//                             showHideLottableCellForQCList();
//                         } else if (obj == 'GatePass') {
//                             var GatePassRowId = 'GatePassRow_' + strCounterNum;
//                             lottableInput = '<input type="text" ' + readtext + ' value="' + getlotvalue + '" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '"> ';
//                             //$('#'+ GatePassRowId +' .GatePassLottable').append(lottableInput);
//                             $('#' + GatePassRowId + '  .gridCellLottable[data-lottype="' + lottype + '"]').html(lottableInput);
//                             $('#' + GatePassRowId + ' .btnEditLottable').hide();
//                             $('#' + GatePassRowId + ' .btnSaveLottable').show();
//                             showHideLottableCellForGatePassRow();
//                         }
//                         if (getLottableFormat == 'Date' || getLottableFormat == 'dd/mm/yyyy') {
//                             //$('.wms-srv-datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
//                             $('.wms-srv-datepicker').datepicker({
//                                 onSelect: function (dateText, inst) {
//                                     debugger;
//                                     var ltype = $(this).attr('data-lottype');
//                                     const today = new Date();
//                                     const yyyy = today.getFullYear();
//                                     let mm = today.getMonth() + 1; // Months start at 0!
//                                     let dd = today.getDate();
//                                     var tddate = mm + '/' + dd + '/' + yyyy;
//                                     //const seldate = new Date(dateText);
//                                     let yy = seldate.getFullYear();
//                                     let m = seldate.getMonth() + 1; // Months start at 0!
//                                     let d = seldate.getDate();
//                                     if (Number(d) < 10) {
//                                         d = "0" + d;
//                                     }
//                                     if (Number(m) < 10) {
//                                         m = "0" + m;
//                                     }
//                                     if (ltype.toLowerCase() == 'MfgDate'.toLowerCase() || ltype.toLowerCase() == 'Week MFG'.toLowerCase()) {
//                                         if (Date.parse(dateText) >= Date.parse(tddate)) {
//                                             alert('Please select date less than Todays Date..!');
//                                             $(this).val('');
//                                         }
//                                         else {
//                                             $(this).val(d + '/' + m + '/' + yy);
//                                         }
//                                     }
//                                     else if (ltype.toLowerCase() == 'ExpDate'.toLowerCase()) {
//                                         if (Date.parse(dateText) <= Date.parse(tddate)) {
//                                             alert('Please select date greater than Todays Date..!');
//                                             $(this).val('');
//                                         }
//                                         else {
//                                             $(this).val(d + '/' + m + '/' + yy);
//                                         }
//                                     }
//                                     else {
//                                         $(this).val(d + '/' + m + '/' + yy);
//                                     }
//                                 }
//                             });
//                         }
//                         else if (getLottableFormat == 'mmm-yy') {
//                             //$('.wms-srv-datepicker').datepicker({ dateFormat: 'M-yy' });
//                             $('.wms-srv-datepicker').datepicker({
//                                 onSelect: function (dateText, inst) {
//                                     debugger;
//                                     var ltype = $(this).attr('data-lottype');
//                                     const today = new Date();
//                                     let yyyy = today.getFullYear();
//                                     let mm = today.getMonth() + 1; // Months start at 0!
//                                     let dd = today.getDate();
//                                     var tddate = mm + '/' + dd + '/' + yyyy;
//                                     const tday = new Date(dateText)
//                                     var m = tday.toLocaleString('en-US', { month: 'short' })
//                                     var y = dateText.toString().substr(-2);
//                                     var ddN = dateText.toString().slice(3, 5);
//                                     if (ltype.toLowerCase() == 'MfgDate'.toLowerCase() || ltype.toLowerCase() == 'Week MFG'.toLowerCase()) {
//                                         if (Date.parse(dateText) == Date.parse(tddate)) {
//                                             $(this).val(m + '-' + ddN);
//                                         }
//                                         else {
//                                             if (Date.parse(dateText) > Date.parse(tddate)) {
//                                                 alert('Please select date less than Todays Date..!');
//                                                 $(this).val('');
//                                             }
//                                             else {
//                                                 $(this).val(m + '-' + ddN);
//                                             }
//                                         }
//                                     }
//                                     else if (ltype.toLowerCase() == 'ExpDate'.toLowerCase()) {
//                                         if (Date.parse(dateText) < Date.parse(tddate)) {
//                                             alert('Please select date greater than Todays Date..!');
//                                             $(this).val('');
//                                         }
//                                         else {
//                                             $(this).val(m + '-' + y);
//                                         }
//                                     }
//                                     else {
//                                         $(this).val(m + '-' + y);
//                                     }
//                                 }
//                             });
//                         }
//                         else if (getLottableFormat == 'wwyy') {
//                             $('.wms-srv-weekpicker_' + weekPickerCtrlId).bisplWeekPicker({
//                                 onValidate: function (wObj, userWeek, userYear) {
//                                     debugger;
//                                     var isValidWeekMfg = true;
//                                     var ltype = $(wObj).attr('data-lottype');
//                                     const today = new Date();
//                                     let yyyy = Number(today.getFullYear());
//                                     let mm = today.getMonth() + 1; // Months start at 0!
//                                     let dd = today.getDate();
//                                     var tddate = mm + '/' + dd + '/' + yyyy;
//                                     var currentWeek = today.getWeek();
//                                     if (ltype.toLowerCase() == 'MfgDate'.toLowerCase() || ltype.toLowerCase() == 'Week MFG'.toLowerCase()) {
//                                         if (((userWeek == currentWeek || (userWeek > currentWeek)) && userYear == yyyy) || (userYear > yyyy)) {
//                                             alert('Please select week less than Current Week..!');
//                                             isValidWeekMfg = false;
//                                         }
//                                     }
//                                     else if (ltype.toLowerCase() == 'ExpDate'.toLowerCase()) {
//                                         if ((userWeek <= currentWeek && userYear == yyyy) || (userYear < yyyy)) {
//                                             alert('Please select Week greater than Current Week..!');
//                                             isValidWeekMfg = false;
//                                         }
//                                     }
//                                     return isValidWeekMfg;
//                                 }
//                             });
//                             /* $('.wms-srv-datepicker').datepicker({ 
//                             onSelect: function(dateText, inst) {
//                             debugger;
//                             var wk = '';
//                             var year = dateText.toString().substr(-2);
//                             var ltype = $(this).attr('data-lottype');
//                             const today = new Date();
//                             let yyyy = today.getFullYear();
//                             let mm = today.getMonth() + 1; // Months start at 0!
//                             let dd = today.getDate();
//                             var tddate = mm+'/'+dd+'/'+yyyy;
//                             if($.datepicker.iso8601Week(new Date(dateText)).toString().length == 1){
//                             wk = '0'+$.datepicker.iso8601Week(new Date(dateText)).toString();
//                             } else{
//                             wk = $.datepicker.iso8601Week(new Date(dateText)).toString();
//                             }
//                             if(ltype == 'MfgDate' || ltype == 'Week MFG'){
//                             if(Date.parse(dateText) >= Date.parse(tddate)){
//                             alert('Please select date less than Todays Date..!');
//                             $(this).val('');
//                             }
//                             else{
//                             $(this).val(wk+year);
//                             }
//                             }
//                             else if(ltype == 'ExpDate'){
//                             if(Date.parse(dateText) < Date.parse(tddate)){
//                             alert('Please select date greater than Todays Date..!');
//                             $(this).val('');
//                             }
//                             else{
//                             $(this).val(wk+year);
//                             }
//                             }
//                             else{
//                             $(this).val(wk+year);
//                             }
//                             }
//                             }); */
//                         }
//                     }
//                 }
//             }
//             else {
//                 alert('Unable to connect Server!!');
//             }
//         });
//     }
// }



function getpalletList(wmsSuggestionControl, objvalue) {
    var apiPath = wmsApiPath + 'GRN/GetPalletSuggest';
    //var getCustomerId = $("#ddlcustomer").val();
    //var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    //var getUserId = $("#hdnUserID").val();
    var strOrderId = $('#hdnPoOid').val();
    var strid = $('#hdnorderid').val();
    var obj = objvalue;

    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "OrderId": strOrderId,
        "skuobject": obj,
        "skey": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == 'Success') {
            var getPalletSuggestion = data.Result;
            var suggestionListObj = JSON.parse(getPalletSuggestion);
            var suggestionList = suggestionListObj.PalletSuggestionResult;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            }
            else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getSKU = suggestionList[i].Sku;
                var getSKUName = suggestionList[i].Sku;
                var getSKUDescription = suggestionList[i].Sku;
                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getSKU + '" data-name="' + getSKUName + '"  data-description="' + getSKUDescription + '">' + getSKU + '</div>');
            }
            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();

            $('.wms-srv-suggestion-options').click(function () {
                var listItemObj = $(this);
                // wmsListOptClick(listItemObj);
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');




                // $(wmsSuggestionControl).val(getListLabel);
                // $(wmsSuggestionControl).attr('data-id', getListId);
                if (obj == 'PurchaseOrder') {
                    $('#addNew_ItemCode').val(getListLabel);
                    $('#addNew_ItemCode').attr('data-id', getListId);
                    $('#addNew_Name').val(getListSkuName);
                    $('#addNew_Description').val(getListSkuDescription);
                    $('#addNew_RequestedQty').val('');
                    // $('#addNew_UOM').val();
                    $('#addNew_OrderQty').val('');
                    $('#addNew_Lottable').val('');
                    $('#addNew_CaseNetWeight').val('');
                    $('#addNew_CaseGrossWeight').val('');
                    $('#addNew_TotalCarton').val('');
                    clearPalletSuggestionList();
                    GetUomBySKU(getListId, '0', 'PurchaseOrder');
                    getLottableListBySku(getListId);
                }
                else if (obj == 'GRN') {
                    $('#txtpalletcode').val(getListLabel);
                    $('#txtpalletcode').attr('data-id', getListId);

                    clearPalletSuggestionList();

                }


            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {

                clearPalletSuggestionList();
            }
        }
    });
}
function GetUomBySKU(strSkuId, strSelectedUomId, strObj, strIsMultiple, strCounterNum) {
    var ddlAddNew_UomId = 'addNew_UOM';
    if (strIsMultiple != null && strIsMultiple == true) {
        ddlAddNew_UomId = 'addNew_UOM_' + strCounterNum;
    }
    var apiPath = wmsApiPath + 'CommFunAPI/GetSKUUOM';
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();

    var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "SkuId": strSkuId
    };
    if (strObj == 'PurchaseOrder') {
        // $('#' + ddlAddNew_UomId).html('<option value="0" data-unitqty="0">-- Select --</option>');
    }
    else if (strObj == 'GRN') {
        //  $('#ddlUOM').html('<option value="0" data-unitqty="0">-- Select --</option>');
    }
    else if (strObj == 'QC') {
        $('#ddlQCUOM').html('<option value="0" data-unitqty="0">-- Select --</option>');
    }

    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            var getResult = data.Result;
            $('#' + ddlAddNew_UomId).html('');
            $('#ddlUOM').html('');
            $('#ddlQCUOM').html('');
            var getUomData = getResult.Table;
            for (var i = 0; i < getUomData.length; i++) {
                var getUom = getUomData[i].Uom;
                var getUomId = getUomData[i].Id;
                var getUnitQty = getUomData[i].UnitQty;
                var isSelected = '';
                if (strSelectedUomId == getUomId) {
                    isSelected = 'selected="selected"';
                }
                if (strObj == 'PurchaseOrder') {

                    var htmlOption = '<option value="' + getUomId + '" data-unitqty="' + getUnitQty + '" ' + isSelected + '>' + getUom + '</option>';
                    $('#' + ddlAddNew_UomId).append(htmlOption);
                }
                else if (strObj == 'GRN') {

                    var htmlOption = '<option value="' + getUomId + '" data-unitqty="' + getUnitQty + '" ' + isSelected + '>' + getUom + '</option>';
                    $('#ddlUOM').append(htmlOption);
                }
                else if (strObj == 'QC') {
                    var htmlOption = '<option value="' + getUomId + '" data-unitqty="' + getUnitQty + '" ' + isSelected + '>' + getUom + '</option>';
                    $('#ddlQCUOM').append(htmlOption);
                }
            }
        }
    });
}
function openviewdetail(obj) {
    var apiPath = wmsApiPath + 'CommFunAPI/GetScanSuggest';
    // var getWarehouseID = $("#ddlwarehouse").val();
    //ar getCustomerId = $("#ddlcustomer").val();
    //var getCompanyID = $('#hdnCompanyID').val();
    //var getUserId = $("#hdnUserID").val();

    var orderID = 0;
    if (obj == 'GRN') {
        orderID = $('#hdnPoOid').val();
    }
    else if (obj == 'PutIN') {
        orderID = $('#hdngrnid').val();
    }
    else if (obj == 'QC') {
        orderID = $('#hdngrnid').val();
    }


    var postData =
    {

        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "OrderId": orderID,
        "obj": obj,
        "currentpg": 1,
        "recordlmt": "10",

    };


    callHttpUrl(apiPath, postData, function (data) {

        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {

            var getResult = data.Result;
            var myGridList = getResult.Table;

            if (obj == 'GRN') {
                // BIND DATA GRID

                $('#grnviewdetail').html('');
                // GRID HEADER
                var gridTable = '';
                gridTable = gridTable + '<div class="wms-srv-grid-header">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Qty</div>';
                gridTable = gridTable + '</div>';

                for (var i = 0; i < myGridList.length; i++) {
                    var ProductCode = myGridList[i].Productcode;
                    var Qty = myGridList[i].POQty;
                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + ProductCode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + Qty + '</div>';

                    gridTable = gridTable + '</div>';
                    // GRID ROW
                }
                $('#grnviewdetail').html(gridTable);
                $('#wms-srv-receivingviewdetail-popup').show();
                $('#wms-srv-receivingviewdetail-popup-close').off();
                $('#wms-srv-receivingviewdetail-popup-close').click(function () {
                    $('#wms-srv-receivingviewdetail-popup').hide();
                });

            }
            else if (obj == 'PutIN') {

                $('#putinviewgrid').html('');
                // GRID HEADER
                var gridTable = '';
                gridTable = gridTable + '<div class="wms-srv-grid-header">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Pallet</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Lottable 1</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Lottable 2</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Lottable 3</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Qty</div>';
                gridTable = gridTable + '</div>';

                for (var i = 0; i < myGridList.length; i++) {
                    var palletname = myGridList[i].PalletName;
                    var ProductCode = myGridList[i].Productcode;
                    var lot1 = myGridList[i].Lottable1;
                    var lot2 = myGridList[i].Lottable2;
                    var lot3 = myGridList[i].Lottable3;
                    var Qty = myGridList[i].GRNQty;
                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + palletname + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + ProductCode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + lot1 + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + lot2 + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + lot3 + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + Qty + '</div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW
                }
                $('#putinviewgrid').html(gridTable);

                $('#wms-srv-PIviewdetail-popup').show();
                $('#wms-srv-PIviewdetail-popup-close').off();
                $('#wms-srv-PIviewdetail-popup-close').click(function () {
                    $('#wms-srv-PIviewdetail-popup').hide();
                });
            }

            else if (obj == 'QC') {
                // BIND DATA GRID

                $('#viewQCgrid').html('');
                // GRID HEADER
                var gridTable = '';
                gridTable = gridTable + '<div class="wms-srv-grid-header">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Qty</div>';
                gridTable = gridTable + '</div>';

                for (var i = 0; i < myGridList.length; i++) {
                    var ProductCode = myGridList[i].Sku;
                    var Qty = myGridList[i].GRNQty;
                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + ProductCode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + Qty + '</div>';

                    gridTable = gridTable + '</div>';
                    // GRID ROW
                }
                $('#viewQCgrid').html(gridTable);
                $('#wms-srv-QCviewdetail-popup').show();
                $('#wms-srv-QCviewdetail-popup-close').off();
                $('#wms-srv-QCviewdetail-popup-close').click(function () {
                    $('#wms-srv-QCviewdetail-popup').hide();
                });

            }

        }
        else {
            alert('Unable to connect Server!!');
        }
    });


}
function scanInboundAPI(obj) {
    debugger;
    if (validateScanInboundData(obj) == true) {
        var apiPath = wmsApiPath + 'CommFunAPI/ScanInbound';

        //var getCompanyID = $('#hdnCompanyID').val();
        var orderID = 0;
        var scanvalue = '';




        if (obj == 'GRN') {
            orderID = $('#hdnPoOid').val();
            scanvalue = $("#txtgrnscanvalue").val();
        }
        else if (obj == 'ScanPutIN') {
            orderID = $('#hdngrnid').val();
            scanvalue = $("#txtputinscanvalue").val();
        }
        else if (obj == 'QC') {
            orderID = $('#hdngrnid').val();
            scanvalue = $("#txtQcscanvalue").val();
        }
        var postData =
        {
            value: scanvalue,
            companyID: getCompanyIdInward,
            obj: obj,
            orderID: orderID
        }
        callHttpUrl(apiPath, postData, function (data) {
            //alert(data);
            var getStatus = data.StatusCode;
            var getStatusCode = data.Code;
            var getresult = data.Result;

            if (getStatus == 'Success') {
                var result = getresult.Table[0].Result;
                var scantype = getresult.Table[0].Scantype;
                var scanvalue = getresult.Table[0].value;

                if (result == "found") {
                    if (obj == 'GRN') {

                        if (scantype == "Pallet") {
                            $('#lblgrnscnpallet').html(scanvalue);
                            var palletID = getresult.Table[0].ID;
                            $('#hdngrnpltscnID').val(palletID);
                            $('#txtgrnscanvalue').val('');
                        }
                        else if (scantype == "Product") {
                            $('#lblgrnscnskucode').html(scanvalue);
                            var proID = getresult.Table[0].ID;
                            var orderqty = getresult.Table[0].Poqty;
                            var grnqty = getresult.Table[0].GRNQty;
                            $('#hdngrnskuscnID').val(proID);
                            $('#lblgrnscnqty').html(grnqty);
                            $('#lblposcnqty').html(orderqty);
                            getLottableBySku(proID, 'ScanGRN', '0', '');
                            $('#txtgrnscanvalue').val('');
                            // lblgrnscnlottable
                        }
                    }

                    else if (obj == 'ScanPutIN') {

                        if (scantype == "Pallet") {
                            $('#lblputPallet').html(scanvalue);
                            pallet = $('#lblputPallet').html();
                            var palletID = getresult.Table[0].ID;
                            var orderqty = getresult.Table[0].Poqty;
                            var grnqty = getresult.Table[0].GRNQty;
                            $('#lblputscanqty').html(grnqty);
                            $('#lblputTotalqty').html(orderqty);
                            $('#hdnputpltID').val(palletID);
                            $('#txtputinscanvalue').val('');
                        }
                        else if (scantype == "Location") {
                            $('#lblputLocation').html(scanvalue);
                            var locID = getresult.Table[0].ID;
                            $('#hdnputlocID').val(locID);
                            $('#txtputinscanvalue').val('');
                            if ($('#hdnputpltID').val() != '') {
                                SavePutinDetail(obj);
                            }
                            // lblgrnscnlottable
                        }
                    }
                    else if (obj == 'QC') {

                        if (scantype == "Product") {
                            $('#lblscanQCcode').html(scanvalue);

                            var prodID = getresult.Table[0].ID;
                            var grnqty = getresult.Table[0].GRNQTY;
                            var qcQty = getresult.Table[0].QCQTY;
                            $('#lblscanqcqty').html(qcQty);
                            $('#lblscanqctotalqty').html(grnqty);
                            $('#hdnscanQCskuID').val(prodID);
                            $('#txtQcscanvalue').val('');
                        }

                    }
                }
                else {
                    alert('Scan value not found');
                }
            }
            else {
                alert('Unable to connect Server!!');
            }


        });
    }


}
function validateScanInboundData(obj) {


    if (obj == 'GRN') {
        if ($('#txtgrnscanvalue').val() == '') {
            alert('Please enter scan value');
            return false;
        }
        return true;

    }
    else if (obj == 'QC') {
        if ($('#txtQcscanvalue').val() == '') {
            alert('Please enter scan value');
            return false;
        }
        return true;
    }
    else if (obj == 'ScanPutIN') {
        if ($('#txtputinscanvalue').val() == '') {
            alert('Please enter scan value');
            return false;
        }

        return true;
    }


}
////////////////////////////////////comman API END////////////////////////////////////////////////////////////////
function clearPalletSuggestionList() {
    $('.wms-srv-suggestion-list').remove();
}
function clearSuggestionList() {
    $('.wms-srv-suggestion-list').remove();
}
function getClientSuggestionList(wmsSuggestionControl) {
    var apiPath = apiServerObjectPath + '/CommFunAPI/clientSugg';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyIdInward,
        "custId": getCustomerIdInward,
        "whId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "ClientName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getSuccess = data.Success;
        var getStatusCode = data.Code;
        if (getSuccess == true) {
            var getSkuSuggestion = data.Response;
            var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = suggestionListObj.jsonObject;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getClientName = suggestionList[i].Name;
                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getClientName + '" data-name="' + getClientName + '"  data-description="' + getClientName + '">' + getClientName + '</div>');
            }

            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();
            $('.wms-srv-suggestion-options').click(function () {
                var listItemObj = $(this);
                // wmsListOptClick(listItemObj);
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');
                var getListSkuName = $(this).attr('data-name');
                var getListSkuDescription = $(this).attr('data-description');
                //   $('#txtReqDetailsCilent').val(getListLabel);
                //    $('#txtReqDetailsCilent').attr('data-id', getListId);
                $(wmsSuggestionControl).val(getListLabel);
                $(wmsSuggestionControl).attr('data-id', getListId);
                clearSuggestionList();
            }); n
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}
function getAddressSuggestionList(wmsSuggestionControl) {
    var apiPath = apiServerObjectPath + '/CommFunAPI/AddSugg';
    var getCustomerId = $("#ddlcustomer").val();
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyIdInward,
        "custId": getCustomerIdInward,
        "whId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "AddresstName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getSuccess = data.Success;
        var getStatusCode = data.Code;
        if (getSuccess == true) {
            var getSkuSuggestion = data.Response;
            var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = suggestionListObj.jsonObject;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getAddressName = suggestionList[i].AddressLine1;
                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getAddressName + '" data-name="' + getAddressName + '"  data-description="' + getAddressName + '">' + getAddressName + '</div>');
            }

            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();
            $('.wms-srv-suggestion-options').click(function () {
                var listItemObj = $(this);
                // wmsListOptClick(listItemObj);
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');
                // $('#txtReqDetailsAddress').val(getListLabel);
                // $('#txtReqDetailsAddress').attr('data-id', getListId);
                $(wmsSuggestionControl).val(getListLabel);
                $(wmsSuggestionControl).attr('data-id', getListId);
                clearSuggestionList();
            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}
function getDockSuggestionList(wmsSuggestionControl) {
    var apiPath = apiServerObjectPath + '/CommFunAPI/DockSugg';
    var getCustomerId = $("#ddlcustomer").val();
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyIdInward,
        "custId": getCustomerIdInward,
        "whId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "DockName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getSuccess = data.Success;
        var getStatusCode = data.Code;
        if (getSuccess == true) {
            var getSkuSuggestion = data.Response;
            var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = suggestionListObj.jsonObject;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getDockName = suggestionList[i].Code;
                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getDockName + '" data-name="' + getDockName + '"  data-description="' + getDockName + '">' + getDockName + '</div>');
            }

            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();
            $('.wms-srv-suggestion-options').click(function () {
                var listItemObj = $(this);
                // wmsListOptClick(listItemObj);
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');
                //   $('#txtDockNo').val(getListLabel);
                //   $('#txtDockNo').attr('data-id', getListId);
                $(wmsSuggestionControl).val(getListLabel);
                $(wmsSuggestionControl).attr('data-id', getListId);
                clearSuggestionList();
            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}
function getPalletSuggestionList(wmsSuggestionControl) {
    var apiPath = wmsApiPath + 'CommFunAPI/PalletList';

    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyIdInward,
        "custId": getCustomerIdInward,
        "whId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "PalletName": getSkey,
        "obj": getPageObject,
        "grnId": 0,
        "POId": 0
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getSuccess = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            var getSkuSuggestion = data.Result;

            var suggestionList = getSkuSuggestion.Table;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getPalletName = suggestionList[i].PalletName;
                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getPalletName + '" data-name="' + getPalletName + '"  data-description="' + getPalletName + '">' + getPalletName + '</div>');
            }

            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();
            $('.wms-srv-suggestion-options').click(function () {
                var listItemObj = $(this);
                // wmsListOptClick(listItemObj);
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');
                //   $('#txtDockNo').val(getListLabel);
                //   $('#txtDockNo').attr('data-id', getListId);
                $(wmsSuggestionControl).val(getListLabel);
                $(wmsSuggestionControl).attr('data-id', getListId);
                clearSuggestionList();
            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}
function getTransporterSuggestionList(wmsSuggestionControl) {
    var apiPath = apiServerObjectPath + '/CommFunAPI/TransportSugg';
    var getCustomerId = $("#ddlcustomer").val();
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyIdInward,
        "custId": getCustomerIdInward,
        "whId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "vendorName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getSuccess = data.Success;
        var getStatusCode = data.Code;
        if (getSuccess == true) {
            var getSkuSuggestion = data.Response;
            var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = suggestionListObj.jsonObject;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getTransportName = suggestionList[i].Name;
                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getTransportName + '" data-name="' + getTransportName + '"  data-description="' + getTransportName + '">' + getTransportName + '</div>');
            }

            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();
            $('.wms-srv-suggestion-options').click(function () {
                var listItemObj = $(this);
                // wmsListOptClick(listItemObj);
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');
                // $('#txtTransporterName').val(getListLabel);
                // $('#txtTransporterName').attr('data-id', getListId);
                $(wmsSuggestionControl).val(getListLabel);
                $(wmsSuggestionControl).attr('data-id', getListId);

                clearSuggestionList();
            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}
function getStagingLocationSuggestionList(wmsSuggestionControl) {
    var apiPath = apiServerObjectPath + '/CommFunAPI/StagingSugg';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyIdInward,
        "custId": getCustomerIdInward,
        "whId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "StagingName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getSuccess = data.Success;
        var getStatusCode = data.Code;
        if (getSuccess == true) {
            var getSkuSuggestion = data.Response;
            var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = suggestionListObj.jsonObject;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getStagingLocName = suggestionList[i].locName;
                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getStagingLocName + '" data-name="' + getStagingLocName + '"  data-description="' + getStagingLocName + '">' + getStagingLocName + '</div>');
            }

            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();
            $('.wms-srv-suggestion-options').click(function () {
                var listItemObj = $(this);
                // wmsListOptClick(listItemObj);
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');
                // $('#txtTransporterName').val(getListLabel);
                // $('#txtTransporterName').attr('data-id', getListId);
                $(wmsSuggestionControl).val(getListLabel);
                $(wmsSuggestionControl).attr('data-id', getListId);

                clearSuggestionList();
            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}
function getActivitySuggestionList(wmsSuggestionControl, orderId) {
    // var apiPath = apiServerObjectPath + '/CommFunAPI/RateActivitylist';
    var apiPath = 'https://w5production.westcoastwarehouse.com/WestCoastAPITestService/api/V2/CommFunAPI/RateActivitylist';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }
    var postData = {
        "CompanyId": getCompanyIdInward,
        "custId": getCustomerIdInward,
        "whId": getWarehouseIdInward,
        "userId": getUserIdInward,
        "ObjName": "Inbound",
        "OrderID": orderId,
        "ActivityName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getSuccess = data.Success;
        var getStatusCode = data.Code;
        if (getSuccess == true) {
            var getSkuSuggestion = data.Response;
            var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = suggestionListObj.jsonObject;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getStagingLocName = suggestionList[i].ActivityName;
                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getStagingLocName + '" data-name="' + getStagingLocName + '"  data-description="' + getStagingLocName + '">' + getStagingLocName + '</div>');
            }

            //if (wmsListOptClick != null) {
            var ctrlHeight = $(wmsSuggestionControl).height();
            var pos = $(wmsSuggestionControl).offset();
            var mouseLeft = Math.round(pos.left);
            var mouseTop = Math.round(pos.top + ctrlHeight);
            if (listPostion != null) {
                if (listPostion == 'bottom') {
                    var suggestionListHeight = $('.wms-srv-suggestion-list').height();
                    mouseTop = Math.round(pos.top - suggestionListHeight);
                }
            }
            $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            $('.wms-srv-suggestion-options').off();
            $('.wms-srv-suggestion-options').click(function () {
                var listItemObj = $(this);
                // wmsListOptClick(listItemObj);
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');
                // $('#txtTransporterName').val(getListLabel);
                // $('#txtTransporterName').attr('data-id', getListId);
                $(wmsSuggestionControl).val(getListLabel);
                $(wmsSuggestionControl).attr('data-id', getListId);
                clearSuggestionList();
                addAdditioanlActivity(orderId, '0');
            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}
function selectAllInwardOrder(obj) {
    debugger;
    var isSelected = $(obj).prop('checked');
    if (isSelected) {
        $('#tlbInboundGrid .wms-srv-grid-row input[type="checkbox"]').prop('checked', true);
    }
    else {
        $('#tlbInboundGrid .wms-srv-grid-row input[type="checkbox"]').prop('checked', false);
    }
    $('#tlbInboundGrid .wms-srv-grid-row input[type="checkbox"]').off();
    $('#tlbInboundGrid .wms-srv-grid-row input[type="checkbox"]').click(function () {
        var isSubSelected = $(this).prop('checked');
        if (!isSubSelected) {
            $('#chkHeaderInwardOrder').prop('checked', false);
        }
    });
}


function DirectPickupOrder() {
    debugger;

    var selectOrderID = "";
    $('input.directpickupCheckbox').each(function () {
        if ($(this).prop("checked") == true) {
            if (selectOrderID == '') {
                selectOrderID = $(this).attr("id");
            }
            else {
                selectOrderID = selectOrderID + ',' + $(this).attr("id");
                //SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });

    return selectOrderID;

}
function selectGridRow(chkObj) {
    debugger;

    var getChkId = chkObj.id;
    if ($(chkObj).prop('checked')) {
        $('#div' + getChkId).css("background", "#efefef");
        $('#' + getChkId).prop("checked", true);
    }
    else {
        $('#div' + getChkId).css("background", "#ffffff");
        $('#' + getChkId).prop("checked", false);
    }
}
//#endregion
//#region------------------Validation---------------------------------------
function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
//End  

function assignGetPass() {
    var SelectedOrder = document.getElementById("hdnSelectedTaskCheck");
    SelectedOrder.value = "";

    $('input[class="messageCheckbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("data-id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("data-id");
            }
        }
    });
    alert(SelectedOrder.value);
}
function bindTaskAction(getObject, getOrderID) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-grid-action">';

    htmlControl = htmlControl + '<a href="#" title="View SKU Details" data-prefix="" data-orderid="' + getOrderID + '" class="wms-srv-icononly" onClick="ViewSKUDetails(\'' + getObject + '\',\'' + getOrderID + '\');"><i class="fas fa-solid fa-eye"></i></a>';

    htmlControl = htmlControl + ' </div>';

    return htmlControl;
}
function bindTASKStatusControl(orderId, strStatus)//,getTaskAssignstatus
{

    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Task Completed', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Put Away" onclick="viewPutAway(\'' + orderId + '\');return false;"></div>';

    htmlControl = htmlControl + '</div>';
    // htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';
    return htmlControl;
}


function LoadTaskCompletOrders() {
    debugger;

    var apiPath = wmsApiPath + 'PO/GetTaskComplete';
    // var apiPath = "http://localhost:50068/api/staging/v1/PO/GetTaskComplete"

    var getGroupName = "chkinwargroup";

    var getActiveTab = $('.dashboardActiveTab').attr('data-id');

    var postData =
    {
        "CurrentPage": CurrentPage,
        "recordLimit": "10",
        "UserID": getUserIdInward,
        "CustomerID": getCustomerIdInward,
        "warehouseID": getWarehouseIdInward,
        "searchFilter": searchfilter,
        "searchValue": searchvalue
    };

    callHttpUrl(apiPath, postData, function (data) {

        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            $('#tlbInboundGrid').html('');
            var getResult = data.Result;
            var myGridListcount = getResult.Table;
            var myGridList = getResult.Table1;
            var getTotalRecords = myGridListcount[0].TotalRecords;
            var getIsQC = myGridListcount[0].IsQC;
            // GET DASHBOARD COUNTS
            /*var getCancelCount = myGridListcount[0].CancelOrder;
            var getExpectedReceipt = myGridListcount[0].ExpectedReceipt;
            var getPutAway = myGridListcount[0].PutAway;
            var getReceiving = myGridListcount[0].Receiving;
             var getQualitycheck = myGridListcount[0].Qualitycheck;
             var getIsQC = myGridListcount[0].IsQC;
             var getCompleted  = myGridListcount[0].Completed;*/
            if (getIsQC == 'NO') {
                hasQualityCheck = false;
            }

            // $('#dashCancelOrder').html(getCancelCount);
            $('#dashCompletelOrder').html(getTotalRecords);
            $('#dashReceiving').html(0);
            $('#dashPutAway').html(0);
            $('#dashExpectedReceipt').html(0);
            $('#dashQualityCheck').html(0);

            if (hasQualityCheck == false) {
                $('.wms-srv-count-box-holder[data-id="QualityCheck"]').parent().hide();
                $('.wms-srv-count-box-holder').each(function () {
                    var getMyParent = $(this).parent();
                    var hasClass = $(getMyParent).hasClass('col-md-3');
                    if (hasClass) {
                        $(getMyParent).removeClass('col-md-3');
                        $(getMyParent).addClass('col-md-4');
                    }
                });
            }
            else {
                $('.wms-srv-count-box-holder[data-id="QualityCheck"]').parent().show();
                $('.wms-srv-count-box-holder').each(function () {
                    var getMyParent = $(this).parent();
                    var hasClass = $(getMyParent).hasClass('col-md-4');
                    if (hasClass) {
                        $(getMyParent).removeClass('col-md-4');
                        $(getMyParent).addClass('col-md-3');
                    }
                });
            }

            if (myGridList != "") {
                // GET DASHBOARD COUNTS

                // BIND DATA GRID
                var gridTable = '';

                // GRID HEADER
                gridTable = gridTable + '<div class="wms-srv-grid-header" style="text-align: center;">';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" value="" onclick="selectAllTask(this);" class="messageCheckbox"></div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" value="ID" id="chkHeaderInwardOrder" onclick="selectAllInwardOrder(this);"></div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Inward Order No</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Reference No</div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">SAP Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Type</div>';
                //  gridTable = gridTable + '<div class="wms-srv-grid-cell">Warehouse Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order No.</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell">ContainerID</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px;">Status</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
                gridTable = gridTable + '</div>';
                // GRID HEADER

                //var getGridData = myGridList.InboundResult[0].InboundList;

                for (var i = 0; i < myGridList.length; i++) {
                    var getPOID = myGridList[i].POID;
                    var getReferenceNo = myGridList[i].ReferenceNo;
                    var getOrderID = myGridList[i].OrderID;
                    var getObject = myGridList[i].Object;
                    var getOrdStatus = myGridList[i].Status;

                    // var getTaskAssignstatus = myGridList[i].TaskAssignstatus;
                    var sapcode = myGridList[i].MaterialDoc;

                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getExpectedReceiptNo + '" ></div>';
                    //gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" value="ID"></div>';
                    //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="selectGridRow(this);" class="directpickupCheckbox" name="'+getGroupName+'" value="' + getExpectedReceiptNo + '" id="' + getExpectedReceiptNo+'"></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPOID + '</div>';
                    //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + sapcode +'</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getReferenceNo + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getObject + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getWarehouseCode +'</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderID + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getContainerId +'</div>';
                    // var objectHeadData = "Order No|" + getExpectedReceiptNo + ",Order Date|" + getOrderDate + ",Ref. No|" + getReferenceNo + ",Warehouse|" + getWarehouseCode + "";
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + bindTASKStatusControl(getOrderID, getOrdStatus) + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + bindActionControl(getExpectedReceiptNo,objectHeadData,getActiveTab) +'</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + bindTaskAction(getOrderID, getObject) + '</div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW
                }

                $('#tlbInboundGrid').html(gridTable);

                setupGridPagingList('tlbInboundGridPager', CurrentPage, getTotalRecords, LoadTaskCompletOrders);
            }
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function viewTASKSKUDetails() {
    debugger;
    $('#tlbTaskcompletedGrid').show();
    $('#wms-srv-order-task-Completed-popup').show();
    $('#wms-srv-order-task-Completed-popup-close').off();
    $('#wms-srv-order-task-Completed-popup-close').click(function () {
        $('wms-srv-order-task-Completed-popup').hide();
    });
}


function TASKPOPupclosepopup() {
    $('#wms-srv-order-task-Completed-popup-close').off();
    $('#wms-srv-order-task-Completed-popup-close').click(function () {
        $('#wms-srv-order-task-Completed-popup').hide();
    });
}

function ViewSKUDetails(TaskOrderID, taskObject) {
    debugger;


    //if (strCurrentOrder != '0') {
    var apiPath = wmsApiPath + 'PO/GetTaskCompleteSKULst';
    //var apiPath = "http://localhost:50068/api/staging/v1/PO/GetTaskCompleteSKULst";
    var getCustomerId = $("#ddlcustomer").val();
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCompanyID = $('#hdnCompanyID').val();
    //var getUserId = $("#hdnUserID").val();
    // var strOrderId = strCurrentOrder;

    var postData =
    {
        "CurrentPage": CurrentPage,
        "recordLimit": "10",
        "OrderID": TaskOrderID,
        "ObjectName": taskObject,
        "UserID": getUserIdInward,
        "searchFilter": searchfilter,
        "searchValue": searchvalue
    };

    // BIND DATA GRID
    var gridTable = '';

    // GRID HEADER
    gridTable = gridTable + '<div class="wms-srv-grid-header" style="text-align:center">';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Product Code</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Product Name</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Description</div>';
    if (taskObject == 'Receiving') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">PO Qty</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">GRN Qty</div>';

    }
    else if (taskObject == 'Qualitycheck') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">GRN Qty</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">QC Qty</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Rejected Qty</div>';
    }
    else if (taskObject == 'PutIn') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">PutIn Qty</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Location Code</div>';
    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">UOM</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable1</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable2</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable3</div>';
    gridTable = gridTable + '</div>';

    // GRID ADD NEW

    $('#tlbTaskcompletedGrid').html(gridTable);

    callHttpUrl(apiPath, postData, function (data) {
        // After success
        var getCode = data.StatusCode;
        var getStatus = data.Status.toLocaleLowerCase();
        var docRow = '';
        if (getCode == "Success") {
            var getResult = data.Result;
            var gettaskdetail = getResult.Table;

            for (var i = 0; i < gettaskdetail.length; i++) {

                var getProdCode = gettaskdetail[i].ProductCode;
                var getName = gettaskdetail[i].Name;
                var getdescription = gettaskdetail[i].Description;
                if (taskObject == "Receiving") {
                    var getPOQty = gettaskdetail[i].POQty;
                    var getGRNQty = gettaskdetail[i].GRNQty;
                }
                else if (taskObject == "Qualitycheck") {
                    var getQCGRNQty = gettaskdetail[i].GRNQty;
                    var getQCQty = gettaskdetail[i].QCQty;
                    var getRejectedQty = gettaskdetail[i].RejectedQty;
                }
                else if (taskObject == "PutIn") {
                    var getPutInQty = gettaskdetail[i].PutInQty;
                    var getLocationCode = gettaskdetail[i].LocationCode;
                }

                var getUOM = gettaskdetail[i].UOM;
                var getLottable1 = gettaskdetail[i].lottable1;
                var getLottable2 = gettaskdetail[i].lottable2;
                var getLottable3 = gettaskdetail[i].lottable3;
                //var getLottable4 = getPoHead[0].Lottable4;
                //var getLottable5 = getPoHead[0].Lottable5;


                // GRID ROW
                gridTable = '';

                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getProdCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getdescription + '</div>';
                if (taskObject == "Receiving") {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getPOQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getGRNQty + '</div>';
                }
                else if (taskObject == "Qualitycheck") {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getQCGRNQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getQCQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getRejectedQty + '</div>';
                }
                else if (taskObject == "PutIn") {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getPutInQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getLocationCode + '</div>';
                }

                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getUOM + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getLottable1 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getLottable2 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getLottable3 + '</div>';

                // gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                gridTable = gridTable + '</div>';
                // GRID ROW

                $('#tlbTaskcompletedGrid').append(gridTable);
            }
            viewTASKSKUDetails();

        }
        else {
            alert('Failed to open !!');
        }
        // After success
    });
    // }
    // else {
    //viewOrderPoDetails(strCurrentOrder,0);
    // }
    //  }
}



// 3pl object //

function open3PL(orderId) {
    $('#wms-srv-popup-open-3plInbound').show();
    $('#wms-srv-popup-Close-3plInbound').off();
    $('#wms-srv-popup-Close-3plInbound').click(function () {
        $('#wms-srv-popup-open-3plInbound').hide();
    });
    GetobjectList(orderId);
}

function showActivityList() {
    $("#wms-srv-ActivityList-popup-open").show();
    $("#wms-srv-ActivityList-popup-close").click(function () {
        $("#wms-srv-ActivityList-popup").off();
        $("#wms-srv-ActivityList-popup-open").hide();
    });
    GetActivityListobject(CurrentPage, searchfilter, searchvalue);
}

function showZoneMasterInward() {
    $("#wms-srv-ZoneMaster-popup").show();
    $("#wms-srv-ZoneMaster-popup-close").click(function () {
        $("#wms-srv-ZoneMaster-popup").off();
        $("#wms-srv-ZoneMaster-popup").hide();
    });
}



function GetobjectList(orderId) {
    debugger;

    //globalskuid = selectedSkuid;
    var apiPath = wmsApiPath + '3PLBilling/getValueAdd';
    //var apiPath =  'http://localhost:50068/api/staging/v1/Product/GetGSTList';

    var postData =
    {
        "Object": "Inward",
        "OrderId": orderId
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
            var Getobjectlist = getresult.Table;
            var objectGrid = "";

            objectGrid = objectGrid + '<div class="wms-srv-grid-header">';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Activity Type</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Rate</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Unit Type</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Bill Qty</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Remark</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Status</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
            objectGrid = objectGrid + '</div>';

            objectGrid = objectGrid + '<div class="wms-srv-grid-row wms-align divgstlstrow_0">';

            // objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input" required ></div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">';
            objectGrid = objectGrid + '<div class="wms-srv-suggestion-holder"><input type="text" id="txtaccname" value="" class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="showActivityList();"><i class="fas fa-search"></i></a><input type="hidden" data-prefix="SESKU" id="" value="" class="wms-srv-grid-cell-input notranslate"></div></div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input" Id="txtrate"></div>';

            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<select  class="wms-srv-grid-cell-input" id="ddlunittypeobject">';
            //  objectGrid = objectGrid + '<option value="">--Select All--</option>';
            //  objectGrid = objectGrid + '<option value="VAT">VAT</option>';
            //  objectGrid = objectGrid + '<option value="CGST">CGST</option>';
            objectGrid = objectGrid + '</select>';
            objectGrid = objectGrid + '</div>';

            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input " Id="txtbillqty"></div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input " Id="txtremark" ></div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell"></div>';
            //objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input " Id="" value="" disabled></div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<div class="wms-srv-grid-action">';
            objectGrid = objectGrid + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="Savevalueaddservice(0,' + orderId + ');">';
            objectGrid = objectGrid + '<i class="fas fa-check-circle"></i></a></div></div>';
            objectGrid = objectGrid + '</div>';

            for (var li = 0; li < Getobjectlist.length; li++) {

                var getID = Getobjectlist[li].ID;
                var getActivityName = Getobjectlist[li].ActivityName;
                var getRate = Getobjectlist[li].Rate;
                var getUnitTypeID = Getobjectlist[li].UnitTypeID;
                var getSystemQty = Getobjectlist[li].SystemQty;
                var getRemark = Getobjectlist[li].remark;
                var getStatus = Getobjectlist[li].Status;
                var getUnittypevalue = Getobjectlist[li].Unittypevalue;

                //var rowno = getReferenceID;

                objectGrid = objectGrid + '<div class="wms-srv-grid-row wms-align" id="ParameterRowobject' + getID + '">';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getActivityName + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRate + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getUnittypevalue + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSystemQty + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRemark + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getStatus + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
                objectGrid = objectGrid + '<div class="wms-srv-grid-action">';
                objectGrid = objectGrid + '<a href="#" title="Edit" class="wms-srv-save" onclick="EditobjectGrid(' + getID + ',' + orderId + ',\'' + getActivityName + '\',\'' + getRate + '\',\'' + getUnittypevalue + '\',\'' + getSystemQty + '\',\'' + getRemark + '\',\'' + getStatus + '\')"><i class="fas fa-edit"></i></a>';
                objectGrid = objectGrid + '</div>';
                objectGrid = objectGrid + '</div>';
                objectGrid = objectGrid + '</div>';
            }
            $('#pnlobjectInward').html(objectGrid);
            UnitTypeobjectInward();
        }
        else {
            alert('Something went wrong.');
        }
    });
}

function EditobjectGrid(getID, orderId, getActivityType, getRate, getUnitType, getBillQty, getRemark, getStatus) {
    debugger;
    var gridRow = '';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getActivityType + '"  class="wms-srv-grid-cell-input" Id="" disabled></div>';
    //gridRow = gridRow + '<div class="wms-srv-grid-cell">'+getActivityType+'</div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getRate + '" class="wms-srv-grid-cell-input" Id="txteditrate"></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell" >';
    gridRow = gridRow + bindUOMDropDownEdit(getID, getUnitType);
    gridRow = gridRow + '</div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getBillQty + '" class="wms-srv-grid-cell-input" Id="txteditqty"></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getRemark + '" class="wms-srv-grid-cell-input" Id="txteditremark"></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getStatus + '" class="wms-srv-grid-cell-input" Id="txteditstatus"></div>';
    // gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getIFSCCode + '" class="wms-srv-grid-cell-input txtifsccode"></div>';
    // gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getSwiftCode + '" class="wms-srv-grid-cell-input txtswiftcode"></div>';


    gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
    gridRow = gridRow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"> <i class="fas fa-check-circle" id="EditBankDetails" onclick="Savevalueaddservice(' + getID + ',' + orderId + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditobjectHide(' + getID + ',' + orderId + ')"></i></a></div></div>';
    $("#ParameterRowobject" + getID).html(gridRow);
}

function gridEditobjectHide(getID, orderId) {
    debugger;
    $("#ParameterRowobject" + getID).html('');
    //var getClient = globalClientID; 
    GetobjectList(orderId);
}



function UnitTypeobjectInward() {
    debugger;
    var apiPath = wmsApiPath + 'RateCard/getUnitType';
    var postData =
    {
        "UserId": getUserIdInward,
        "CompanyId": getCompanyIdInward
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            objectName = [];
            objectid = [];
            $("#ddlunittypeobject").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var getcatName = grnContainerSize[i].Value;
                    var getcatId = grnContainerSize[i].ID;
                    objectName.push(getcatName);
                    objectid.push(getcatId);
                    $("#ddlunittypeobject").append('<option value = "' + getcatId + '" name=\'' + getcatName + '\'>' + getcatName + '</option>');

                }
            }
        }
    });
}

function GetActivityListobject(CurrentPage, searchfilter, searchvalue) {
    debugger;

    //globalskuid = selectedSkuid;
    var apiPath = wmsApiPath + '3PLBilling/getActivityList';
    //var apiPath =  'http://localhost:50068/api/staging/v1/Product/GetGSTList';

    var searchfilter = $("#drop-down-search-activity-3plobject").val();
    var searchvalue = $("#text-value-search-activity-3plobject").val();

    //    if (searchfilter == '0')
    //    {
    //        searchfilter = '0';
    //        searchvalue = '0';
    //    }

    var postData =
    {
        "CurrentPage": CurrentPage,
        "RecordLimit": getglobalTotalRecords,
        "CustomerId": getCustomerIdInward,
        "UserId": getUserIdInward,
        "Search": searchfilter,
        "Filter": searchvalue
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
            var Getobjectlist = getresult.Table1;
            var objectGrid = "";

            //$('#pnlactivitylistobject').html('');

            objectGrid = objectGrid + '<div class="wms-srv-grid-header">';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Object</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Activity Name</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Remark</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Zone</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
            objectGrid = objectGrid + '</div>';

            objectGrid = objectGrid + '<div class="wms-srv-grid-row wms-align">';

            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<select  class="wms-srv-grid-cell-input" id="ddlobject">';
            //  objectGrid = objectGrid + '<option value="">--Select All--</option>';
            //  objectGrid = objectGrid + '<option value="VAT">VAT</option>';
            //  objectGrid = objectGrid + '<option value="CGST">CGST</option>';
            objectGrid = objectGrid + '</select>';
            objectGrid = objectGrid + '</div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input txtvalue" required id="txtaccnameobject"></div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input " required id="txtRemarkobject"></div>';
            objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;"><div class="wms-srv-suggestion-holder"><select id="ddlZone"></select><a href="#" onclick="showZoneMaster();return false;"><i class="fas fa-plus-circle btnAddEmailInToField"></i></a><input type="hidden" data-prefix="SESKU" id="texthdnFromLocationID" value="" class="wms-srv-grid-cell-input notranslate"></div></div>';

            objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
            objectGrid = objectGrid + '<div class="wms-srv-grid-action">';
            objectGrid = objectGrid + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveActivityobject();">';
            objectGrid = objectGrid + '<i class="fas fa-check-circle"></i></a></div></div>';
            objectGrid = objectGrid + '</div>';

            for (var li = 0; li < Getobjectlist.length; li++) {

                var getID = Getobjectlist[li].ID;
                var getObjectName = Getobjectlist[li].ObjectName;
                var getActivityName = Getobjectlist[li].ActivityName;
                var getRemark = Getobjectlist[li].Remark;
                var getZoneName = Getobjectlist[li].ZoneName;
                //   var getRemark = Getobjectlist[li].Remark;
                //   var getStatus = Getobjectlist[li].Status;

                //var rowno = getReferenceID;

                objectGrid = objectGrid + '<div class="wms-srv-grid-row wms-align divgstlstrow_">';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getObjectName + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getActivityName + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRemark + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getZoneName + '</div>';
                objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
                objectGrid = objectGrid + '<div class="wms-srv-grid-action">';
                objectGrid = objectGrid + '<a href="#" title="Edit" class="wms-srv-save" onclick=" getAccountIdobject(' + getID + ',\'' + getActivityName + '\');"><i class="fas fa-check-circle"></i></a>';
                objectGrid = objectGrid + '</div>';
                objectGrid = objectGrid + '</div>';
                objectGrid = objectGrid + '</div>';
            }
            $('#pnlactivitylistobject').html(objectGrid);
            ObjectDDL();
        }
        else {
            alert('Something went wrong.');
        }
    });
}

var ActivityId = '';
var ActivityName = '';

function getAccountIdobject(Id, Name) {
    debugger;
    ActivityId = Id;
    ActivityName = Name;

    $("#txtaccname").val(Name);
    $("#wms-srv-ActivityList-popup-open").hide();

}

function SearchActivity3plobject() {
    var searchfilter = $("#drop-down-search-activity-3plobject").val();
    var searchvalue = $("#text-value-search-activity-3plobject").val();

    if (searchvalue == '0') {
        alert('Please Enter value for filter');
    }
    else {
        GetActivityListobject(CurrentPage, searchfilter, searchvalue)

    }
    if (searchfilter == '' && searchvalue == '') {
        GetActivityListobject(CurrentPage, searchfilter, searchvalue)
    }
}



function SaveActivityobject() {
    debugger;

    //globalskuid = selectedSkuid;
    var apiPath = wmsApiPath + '3PLBilling/addActivityValueAdd';

    getobjectValue = $("#ddlobject option:selected").val();

    getactivityName = $('#txtaccnameobject').val();
    getRemark = $('#txtRemarkobject').val();
    getZoneId = $('#ddlZone option:selected').val();


    var postData =
    {
        "ObjectID": getobjectValue,
        "ActivityName": getactivityName,
        "Remark": getRemark,
        "ZoneId": getZoneId,
        "CustomerId": getCustomerIdInward,
        "UserId": getUserIdInward,
        "CompanyId": getCompanyIdInward
    }
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var isStatus = data.Status;
        var getresult = data.Result;
        if (isStatus == 200) {
            var returnmsg = getresult.Message;
            if (returnmsg == "success") {
                alert("Saved Successfully.");

                GetActivityListobject(CurrentPage, searchfilter, searchvalue);
            }
            else {
                alert("Failed to Save.");
            }
        }
        else {
            alert("Error Occured.");
        }
    });
}


function ObjectDDL() {
    debugger;
    var apiPath = wmsApiPath + 'RateCard/getObjectZone';
    var postData =
    {
        "UserId": getUserIdInward,
        "CustomerId": getCustomerIdInward
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            objectName = [];
            objectid = [];
            $("#ddlobject").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var getcatName = grnContainerSize[i].ObjectName;
                    var getcatId = grnContainerSize[i].ID;
                    objectName.push(getcatName);
                    objectid.push(getcatId);
                    $("#ddlobject").append('<option value = "' + getcatId + '" name=' + getcatName + '>' + getcatName + '</option>');

                }
            }

            objectName = [];
            objectid = [];
            $("#ddlZone").html('<option value="0">--Select--</option>');
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
                    $("#ddlZone").append('<option value = "' + getcatId + '" name=' + getcatName + '>' + getcatName + '</option>');

                }
            }
        }
    });
}

function openDispatchPopup(oid){
    $('#wms-srv-dispatch-popup').show();
    $('#wms-srv-dispatch-popup-close').off();
    $('#wms-srv-dispatch-popup-close').click(function () {
        $('#wms-srv-dispatch-popup').hide();
    });
}

function showZoneMaster() {
    ZoneList();
    $("#wms-srv-ZoneMaster-popup").show();
    $("#wms-srv-ZoneMaster-popup-close").click(function () {
        $("#wms-srv-ZoneMaster-popup").off();
        $("#wms-srv-ZoneMaster-popup").hide();
    });
}

function ZoneList() {
    debugger;
    //strCurrentPage = "1";
    var apiPath = wmsApiPath + 'RateCard/getZone';

    var searchfilter = $("#drop-down-search-zone").val();
    var searchvalue = $("#text-value-search-zone").val();

    if (searchfilter == '0') {
        searchfilter = '0';
        searchvalue = '0';
    }
    debugger;

    var postData =
    {

        "CustomerId": getCustomerIdInward,
        "UserId": getUserIdInward
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;

            $("#gridbindZone").html();
            var gridTable = "";

            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Zone Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Zone Name</div>';;
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtZonecode" value="" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtZoneName" value="" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
            gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
            gridTable = gridTable + ' </div><a href="#" title="Save" class="wms-srv-save" onClick="saveZone();"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep"></label>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < gridList.Table.length; i++) {
                var getID = gridList.Table[i].ID;
                var getZoneCode = gridList.Table[i].ZoneCode;
                var getZoneName = gridList.Table[i].ZoneName;
                var getActive = gridList.Table[i].Active;

                //  GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getZoneCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getZoneName + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }
            $("#gridbindZone").html(gridTable);
        }

    });
}

function validateZone() {
    var result = "";
    if ($("#txtZonecode").val() == "") {
        result = "Please enter zone code..!";
    }
    else if ($("#txtZoneName").val() == "") {
        result = "Please enter zone name..!";
    }
    return result;
}

function saveZone() {
    var result = validateZone();
    if (result == "") {
        var zonecode = $("#txtZonecode").val();
        var zonename = $("#txtZoneName").val();

        var apiPath = wmsApiPath + 'RateCard/addZone';
        var postData =
        {
            "CompanyId": getCompanyIdInward,
            "UserId": getUserIdInward,
            "CustomerId": getCustomerIdInward,
            "ID": "0",
            "ZoneCode": zonecode,
            "ZoneName": zonename
        }

        callHttpUrl(apiPath, postData, function (data) {
            var getStatusCode = data.Status;
            if (getStatusCode == 200) {
                alert("Record saved successfully..!")
                ZoneList();
                ZoneDDL();
            }
            else {
                alert(getStatusCode.Message);
            }
        });
    }
    else {
        alert(result);
    }
}


function ZoneDDL() {
    debugger;
    var apiPath = wmsApiPath + 'RateCard/getObjectZone';
    var postData = {
        "UserId": getUserIdInward,
        "CustomerId": getCustomerIdInward
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            objectName = [];
            objectid = [];
            $("#ddlZone").html('<option value="0">--Select--</option>');
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
                    $("#ddlZone").append('<option value = "' + getcatId + '" name=' + getcatName + '>' + getcatName + '</option>');
                }
            }
        }
    });
}

var getvalueId = '';

function Savevalueaddservice(Id, orderId) {
    debugger;

    //globalskuid = selectedSkuid;
    var getvalueId = Id;
    var apiPath = wmsApiPath + '3PLBilling/AddValueAdd';

    if (getvalueId == '0') {
        getUOMValue = $("#ddlunittypeobject option:selected").val();
        getrate = $('#txtrate').val();
        getBillqty = $('#txtbillqty').val();
        getRemark = $('#txtremark').val();
    }
    else {
        getUOMValue = $("#txtEditUOMtype" + valueGlbalID).val();
        getrate = $('#txteditrate').val();
        getBillqty = $('#txteditqty').val();
        getRemark = $('#txteditremark').val();
    }

    var postData =

    {
        "Id": getvalueId,
        "CustomerId": getCustomerIdInward,
        "ActivityId": ActivityId,
        "ActivityName": ActivityName,
        "Rate": getrate,
        "UnitId": getUOMValue,
        "CompanyId": getCompanyIdInward,
        "UserId": getUserIdInward,
        "Object": "Inward",
        "OrderId": orderId,
        "OrderNo": orderId,
        "Quantity": getBillqty,
        "WarehouseId": getWarehouseIdInward,
        "Remark": getRemark
    }

    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var isStatus = data.Status;
        var getresult = data.Result;
        if (isStatus == 200) {
            var returnmsg = getresult.Message;
            if (returnmsg == "success") {
                // alert("Saved Successfully.");
                // GetobjectList(orderId);
                if (getvalueId == 0) {
                    alert('Saved Successfully!!');
                }
                else {
                    alert('Updated Successfully!!');
                }
                GetobjectList(orderId);
            }
            else {
                alert("Failed to Save.");
            }
        }
        else {
            alert("Error Occured.");
        }
    });
}

var valueGlbalID = '';
var objectName = [];
var objectid = [];

function bindUOMDropDownEdit(getID, getUnitType) {
    debugger;
    valueGlbalID = getID;
    var ddlUOMtype = '';
    ddlUOMtype = '<select class="wms-srv-grid-cell-input" id="txtEditUOMtype' + getID + '">';
    for (var i = 0; i < objectName.length; i++) {
        if (objectName[i] == getUnitType) {
            ddlUOMtype += '<option value = "' + objectid[i] + '" selected="selected">' + objectName[i] + '</option>';
        } else {
            ddlUOMtype += '<option value = "' + objectid[i] + '">' + objectName[i] + '</option>';
        }
    }
    ddlUOMtype += '</select>';
    return ddlUOMtype;
}


