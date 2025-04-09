var isEdiAdvanceSearchOn = "no";
var isSingleSKUOn = "no";
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
//var getClientId= mBrillWmsSession.getClientId();
var getClientId= 0;
var getobject = "SalesOrder";
var SKUSearch = "no";
var filtercol = '0'; 
var filterval = '0'; 
var globalActiveTab = 'BatchList';
var searchfilter = 'All';
var CurrentPage = '1';
var getAllocationRecLimit = 5;
var recordLimit = '5';
var hasQualityCheck = false;    
var more = true;
var SelectedBatch = "";
var IsPallet = 'YES';
var IsQC = 'NO';

function openblallocation() {
    debugger;
    $('#btnCreatedirectBatch').show();
    var SelectedOrder = document.getElementById("hdnSelectedRec");
    var hdnapprovalflag = document.getElementById("hdnapprovalflag"); 
    SelectedOrder.value = "";
    SelectedBatch = "";
    hdnapprovalflag.value = "No";

    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("id");
                hdnapprovalflag.value = $(this).attr("approval");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });

    if(SelectedOrder.value == ""){
        alert("Please select atleast one order");
    }
    else{
        $("input[class=messageCheckbox]").each(function () {
            if ($(this).prop("checked") == true) {
                if (SelectedBatch == "") {
                    SelectedBatch = $(this).attr("name");
                }
                else {
                    SelectedBatch = SelectedBatch + "," + $(this).attr("name");
                }
            }
        });

        if(SelectedBatch == ""){
            var status = IscancelOrder();
            if(status == "success"){
                createdirectplanofso(SelectedOrder.value);
                $('#wms-srv-blallocation-popup').show();
                $('#wms-srv-blallocation-popup-close').off();
                $('#wms-srv-blallocation-popup-close').click(function () {
                $('#wms-srv-blallocation-popup').hide();
                });
            }
            else{
                alert(status);
            }
        }
        else{
            alert("Please select order having no batch created..!");
        }
    }
    
}
function clearSearchFilter()
{
    $('#ddlBatchlistsearch').val('All');
    $('#txtBatchlistvalue').val('');
    getBatchList(filtercol,filterval);
}

function IscancelOrder(){
    var status = "success";    
    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
           // if ($(this).attr("data-status") == "24") {
            //if ($(this).attr("orderstatus") == "Cancel Order" && $(this).attr("orderstatus") == "Pending for Approval" && $(this).attr("orderstatus") =="Order Rejected") {
                if ($(this).attr("orderstatus") =="Cancel Order") {
                status = "One or more selected orders has been cancelled.";
                }
                else if($(this).attr("orderstatus") == "Pending for Approval")
                {
                    status = "One or more selected orders is Pending for Approval";
                }
                else if($(this).attr("orderstatus") == "Order Rejected"){
                    status = "One or more selected orders is Rejected";
                }
        }
    });
    return status;
}

function initbatchlist() {
    getBatchList();
}

function getBatchList(filtercol,filterval) {
    debugger;
    var apiPath = wmsApiPath + 'AllocationPlan/batchlist';
   // var apiPath = "http://localhost:50068/api/staging/v1/AllocationPlan/batchlist";
    var getPageObject = $('#ddlOrderType').val();
    var filtercol = $('#ddlBatchlistsearch').val();
    var filterval = $('#txtBatchlistvalue').val();


    if (filtercol == '')
    {
        filtercol = '';
        filterval = '';
    }	

    var postData =
    {
        CurrentPage: CurrentPage,
        recordLimit: getAllocationRecLimit,
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        UserId: getUserId,
        Object: getPageObject,
        filtercol: filtercol,
        filterval: filterval,
        ClientId: getClientId
      }

     
    //BatchListGrid
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tlbBatchListGrid').html('');
            var myGridList = data.Result;
            //var getTotalRecords = Number(myGridList.BatchListResult[0].Dashboard[0].Allocated) + Number(myGridList.BatchListResult[0].Dashboard[0].Picking) + Number(myGridList.BatchListResult[0].Dashboard[0].QC) + Number(myGridList.BatchListResult[0].Dashboard[0].Packing) + Number(myGridList.BatchListResult[0].Dashboard[0].Shipped);
            var getTotalRecords = myGridList.BatchListResult[0].Dashboard[0].Allocated;
            // GET DASHBOARD COUNTS
            var getOutboundOrder = myGridList.BatchListResult[0].Dashboard[0].OutboundOrder;
            var getAllocated = myGridList.BatchListResult[0].Dashboard[0].Allocated;
            var getPicking = myGridList.BatchListResult[0].Dashboard[0].Picking;
            var getQualityCheck = myGridList.BatchListResult[0].Dashboard[0].QC;
            var getPacking = myGridList.BatchListResult[0].Dashboard[0].Packing;
            var getDispatch = myGridList.BatchListResult[0].Dashboard[0].Shipped;
            IsQC = myGridList.BatchListResult[0].Dashboard[0].IsQC.toUpperCase();
            //var getCancelOrder = myGridList.OutboundListResult[0].Dashboard[0].CancelOrder;

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
            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Reference No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Warehouse Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Client Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Shipping Address</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Delivery Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Created By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Creation Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px; text-align:center;">Status</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            gridTable = gridTable + '</div>';
            //Bind Header
            
            var getGridData = data.Result.BatchListResult[0].BatchList;
            for (var i = 0; i < getGridData.length; i++) {
                var getID = getGridData[i].BatchID;
                var getBatchName = getGridData[i].BatchName;
                var getBatchCreatedBy = getGridData[i].BatchCreatedBy;
                var getCreationDate = getGridData[i].CreationDate;
                var getStatus = getGridData[i].Status;
                var getStatusID = getGridData[i].StatusID;
                var getOrderType = getGridData[i].OrderType;
                var getOrderIds = getGridData[i].OrderIds.toString();
                var getOrderRefNumber = getGridData[i].OrderNumber;
                var getWarehouseCode = getGridData[i].code;
                
                var getClientCode = getGridData[i].ClientCode;
                var getShippingAddress = getGridData[i].ShippingAddress;
                var getshippingcode = getGridData[i].DeliveryType;


                //// GRID ROW
                // gridTable = gridTable + '<div class="wms-srv-grid-row">';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="selectGridRow(this);" class="batchCheckbox" value="' + getID + '" id="' + getID+'|'+getStatusID+'"></div>';
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getID + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderRefNumber + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getWarehouseCode + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchCreatedBy + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCreationDate + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindBatchListStatusControl(getID,getStatus,getStatusID) + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindBatchListActionControl(getOrderIds,getStatusID,getID) + "</div>";
                // gridTable = gridTable + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="selectGridRow(this);" class="batchCheckbox" value="' + getID + '" id="' + getID+'|'+getStatusID+'"></div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getID + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderRefNumber + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getWarehouseCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getshippingcode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchCreatedBy + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCreationDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindBatchListStatusControl(getOrderIds,getID,getStatus,getStatusID) + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindBatchListActionControl(getOrderIds,getStatusID,getID) + "</div>";
                gridTable = gridTable + '</div>';

                //// GRID ROW
            }

            $('#tlbBatchListGrid').html(gridTable);
            $('.wms-srv-grey').attr('onclick', 'return false'); 

            setupGridPagingList('tlbBatchListSOGridPager', CurrentPage, getTotalRecords, getBatchList, getAllocationRecLimit);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

// function setupGridPagingbatchList(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) { //Changed Respective ID 
//     debugger;
//     var global_max_record_count = 5;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 5) + 1;
//     var recordTo = recordFrom + 4;
//     var totalRecord = Number(strTotalRecords);
//     var pagerLinks = '';

//     if (totalRecord < recordTo) {
//         recordTo = totalRecord;
//     }

//     $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//     var lnkCounter = 1;
//     var currentCounter = global_max_record_count;
//     //var currentCounter = 0;
//     var lastPage = 0;
//     while (currentCounter < totalRecord) {
//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         global_last_page_no = lnkCounter;
//         currentCounter = currentCounter + global_max_record_count;
//         lnkCounter = lnkCounter + 1;
//     }

//     / Add Page linke for remaining record /
//     if (currentCounter > totalRecord) {

//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         // Update last page count - 21 Sept 2021
//         this.global_last_page_no = lnkCounter;
//     }
//     / Add Page linke for remaining record /
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
//     // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//     //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//     pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//     $('#' + gridObjId + ' .wms-srv-pager-links a').off();
//     $('#' + gridObjId + ' .wms-srv-pager-links a').click(function () {
//         var getDataPage = $(this).attr('data-page');
//         CurrentPage = getDataPage;
//         if (callBackFunction != null) {
//             callBackFunction(getDataPage, searchfilter, searchvalue);
//         }
//     });

//     $('#' + gridObjId + ' a.wms-srv-pager-go').off();
//     $('#' + gridObjId + ' a.wms-srv-pager-go').click(function () {
//         var getDataPage = $('#' + gridObjId + ' input[name="txtGridPageNo"]').val();
//         CurrentPage = getDataPage;
//         if (Number(getDataPage) < 1) {
//             alert('Please enter valid page number!!');
//         } else if (Number(getDataPage) > Number(lastPage)) {
//             alert('Page number should not be greater than ' + lastPage + ' !!');
//         } else {
//             if (callBackFunction != null) {
//                 callBackFunction(getDataPage, searchfilter, searchvalue);
//             }
//         }
//     });
// }

function SearchBatchList(){	

	filtercol = $('#ddlBatchlistsearch').val();
	filterval = $('#txtBatchlistvalue').val();
	
	if(filterval =='')
	{
		alert('Please Enter value for filter');		
	}
	else
	{	
		getBatchList(filtercol,filterval);	
	}
	if(filtercol =='' && filterval =='')
	{
		getBatchList(filtercol,filterval);	
	}
}

function BatchListDateFilter(){
    debugger;
 var isCreationDate=$('#ddlBatchlistsearch').val();
    if(isCreationDate=='CreationDate'){
        $('#txtBatchlistvalue').datepicker({ dateFormat: 'mm/dd/yy' })
    
    }
    else
{
    $('#txtBatchlistvalue').datepicker('destroy')
}

}

function bindStatusControl(ID, strStatus) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getStatusColor('Expected Receipt', strStatus) + '" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Expected Receipt" onclick="viewOrder(\'' + orderId + '\');return false;"></div>';

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Receiving', strStatus) + '" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Receiving" onclick="viewgrnOrder(\'' + orderId + '\');return false;"></div>';
    if (hasQualityCheck == true) {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wmsStatusQualityCheck wms-srv-' + getStatusColor('Quality Check', strStatus) + '" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Quality Check" onclick="viewQualityCheck(\'' + orderId + '\');return false;"></div>';
    }

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Put Away', strStatus) + '" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Put Away" onclick="viewPutAway(\'' + orderId + '\');return false;"></div>';

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function bindBatchListStatusControl(getOrderIds,ID, strStatus,statusid) {
    debugger;
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    //Outward Order = 31
    //htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Outbound Order"></div>';
    
    //Picking = 32 , Partial = 57
    if(statusid == 31){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Picking" onclick="openpickedit(' + 0 + ',\'' + ID + '\',0);return false;"></div>';
    }
    else if(statusid == 57){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-partial" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Picking" onclick="openpickedit(' + 0 + ',\'' + ID + '\',0);return false;"></div>';
    }
    else if (statusid == 32 || statusid == 28 || statusid == 33 || statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Picking" onclick="openpickedit(' + 0 + ',\'' + ID + '\',0);return false;"></div>';
    }
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openpickedit(' + 0 + ',\'' + ID + '\',0);return false;"></div>';
    }
   
    if(IsQC == 'YES'){
        //QC = 28
        if(statusid == 31){
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openQClist(' + 0 + ',\'' + ID + '\',\'' + getOrderIds +'\');return false;"></div>';
        }
        else if(statusid == 32 || statusid == 57){
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQClist(' + 0 + ',\'' + ID + '\',\'' + getOrderIds +'\');return false;"></div>';
        }
        else if(statusid == 28 || statusid == 33 || statusid == 59){
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQClist(' + 0 + ',\'' + ID + '\',\'' + getOrderIds +'\');return false;"></div>';
        }   
        else{
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openQClist(' + 0 + ',\'' + ID + '\',\'' + getOrderIds +'\');return false;"></div>';
        }
    }
    
    //Packing = 33
    if(statusid == 31 || statusid == 32 || statusid == 57){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openstaginglist(\'' + ID + '\');return false;"></div>';
    }
    else if(statusid == 28){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstaginglist(\'' + ID + '\');return false;"></div>';
    }
    else if(statusid == 33 || statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstaginglist(\'' + ID + '\');return false;"></div>';
    }
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openstaginglist(\'' + ID + '\');return false;"></div>';
    }
    
    //Dispatch = 59
    if(statusid == 31 || statusid == 32 || statusid == 28){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthlist(\'' + ID + '\');return false;"></div>';
    }
    else if(statusid == 33){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthlist(\'' + ID + '\');return false;"></div>';
    }
    else if(statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthlist(\'' + ID + '\');return false;"></div>';
    }
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthlist(\'' + ID + '\');return false;"></div>';
    }
    
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
function openAllocationPlanDetailReport(dataVal) {
    debugger;
   mBrillWmsSession.setReportDetailId(dataVal);
   window.open("WMSReport/DetailReport/Allocation-Order-Template.html"); 
}
function bindBatchListActionControl(orderids,statusid,batchId) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
    //htmlControl = htmlControl + '<a href="#" title="AllocationPlan" class="wms-srv-icononly" onClick="openblallocationbyBatch(\''+orderids+'\',\''+statusid+'\');return false;"><i class="fas fa-edit"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="Report" data-orderid="' + batchId + '" class="wms-srv-icononly" onclick="openAllocationPlanDetailReport(' + batchId + ');return false;"><i class="fas fa-solid fa-eye"></i></a>';
    // htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    // htmlControl = htmlControl + '<a href="#" title="Task Assignment" data-prefix="" data-orderid="' + batchId + '" class="wms-srv-icononly" onClick="OpenTaskAssignment(\'' + 'Outward' +'\',' + batchId + ');"><i class="fas fa-tasks"></i></a>';
    htmlControl = htmlControl + ' </div>';

    return htmlControl;
}

// Allocation Plan By Suraj G

function getAllocationHeadData(orderids) {
    debugger;
    var apiPath = wmsApiPath + 'AllocationPlan/getallocationplansummary';
    //apiPath: 'http://localhost:50068/api/staging/v1/AllocationPlan/getallocationplansummary',
    var getSoId = orderids;
    $('#wms-srv-grid-header-alloplan').html('');
    var constructRow = '<div class="wms-srv-grid-header">';
    constructRow += '<div class="wms-srv-grid-cell">Total Order Qty</div>';
    constructRow += '<div class="wms-srv-grid-cell">Total Allocated Qty</div>';
    constructRow += '<div class="wms-srv-grid-cell">Total Short Qty</div>';
    constructRow += '<div class="wms-srv-grid-cell">Hold Qty</div>';
    constructRow += '</div>';

    $('#wms-srv-grid-header-alloplan').append(constructRow);

    var postData = {
        'orderid': getSoId
    };  
    callHttpUrl(apiPath, postData, function (data) {
            var myJson = data;
            var getStatus = myJson.Status;
            var getStatusCode = myJson.StatusCode;
            if (getStatusCode == 'Success') {
                var getJsonObj = myJson.Result;
                for (var i = 0; i < getJsonObj.Table.length; i++) {
                    var myRecord = getJsonObj.Table[i];
                    var getTotalOrderQty = myRecord.TotalOrderQty;
                    var getTotalAllocatedQty = myRecord.TotalAllocatedQty;
                    var getTotalShortQty = myRecord.TotalShortQty;
                    var getHoldQty = myRecord.HoldQty;
                    IsPallet = myRecord.IsPallet.toUpperCase();

                    var constructRow = '<div class="wms-srv-grid-row">';
                   
                    constructRow += '<div class="wms-srv-grid-cell" id="dvOrderqty">' + getTotalOrderQty + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell" id="dvAllocateqty">' + getTotalAllocatedQty + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell" ><a id="dvShortqty" style="color:#00acd7;text-decoration: underline;font-weight: bold;" href ="#" title="" data-prefix="" onclick="TotalQtyallocation('+ getSoId +');">' + getTotalShortQty + '</a></div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getHoldQty + '</div>';
                    constructRow += '</div>';

                    $('#wms-srv-grid-header-alloplan').append(constructRow);
                }
                getAllocationData(orderids);
            }
    },function(){
        alert('Server error..!');
    });
}

function getAllocationData(orderids) {
    var obj = $('#ddlOrderType').val();
    var apiPath = wmsApiPath + 'AllocationPlan/getSearchallocationplandetails';
    //apiPath: 'http://localhost:50068/api/staging/v1/AllocationPlan/getSearchallocationplandetails',
    var getSoId = orderids;
    var whereFilterCondition = "";

    var getLottable = mBrillWmsSession.getCustomerLottable();
    var breakCustLot = getLottable.split(',');

    $('#wms-srv-grid-detail-alloplan').html('');
    var constructHeaderRow = '<div class="wms-srv-grid-header tdHeadRow">';
    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Order No</label></div>';
    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Order Date</label></div>';
    if(obj == 'SalesOrder' || obj == 'ScrapOrder'){
        constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Client Name</label></div>';
    }
    else{
        constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Warehouse Name</label></div>';
    }
    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Delivery Center</label></div>';
    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>SKU Code</label></div>';
    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>UOM</label></div>';
    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Location Code</label></div>';
    if(IsPallet == 'YES'){
        constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Pallet Name</label></div>';
    }
    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Batch No</label></div>';
    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Allocate Qty</label></div>';
    // constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Lottable</label></div>';
    for(var pl=0; pl < breakCustLot.length; pl++){
        var custLotLabel = breakCustLot[pl];
        constructHeaderRow = constructHeaderRow + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
    }

    constructHeaderRow += '</div>';

    $('#wms-srv-grid-detail-alloplan').append(constructHeaderRow);
    var postData = {
        'ordrid': getSoId,
        'wherecondition': whereFilterCondition
    };    
    callHttpUrl(apiPath, postData, function (data) {
        var myJson = data;
            var getStatus = myJson.Status;
            var getStatusCode = myJson.StatusCode;
            if (getStatusCode == 'Success') {
                
                var totalAllocateQty = 0;
                var totalIntransitQty = 0;

                var getJsonObj = myJson.Result;
                for (var i = 0; i < getJsonObj.Table.length; i++) {
                    var myRecord = getJsonObj.Table[i];
                    var getId = myRecord.ID;
                    var getOrderId = myRecord.Orderid;
                    var getOrderDate = myRecord.orderdate;
                    var getClientName = myRecord.clientname;
                    var getDeliveryCenter = myRecord.deliverycenter;
                    var getProductCode = myRecord.Productcode;
                    var getUOM = myRecord.uom;
                    var getLocationCode = myRecord.locationcode;
                    var getPalletName = myRecord.palletname;
                    var getBatchNo = myRecord.batchno;
                    var getOrderQty = myRecord.Orderqty;
                    var getAllocateQty = myRecord.allocateqty;
                    var getIntransitQty = myRecord.intransitqty;
                    var getInTransitAllocateQty = '0';
                    var getLottable1 = myRecord.lottable1;
                    var getLottable2 = myRecord.lottable2;
                    var getLottable3 = myRecord.lottable3;
                    var getLottable4 = myRecord.lottable4;
                    var getLottable5 = myRecord.lottable5;
                    var getLottable6 = myRecord.lottable6;
                    var getLottable7 = myRecord.lottable7;
                    var getLottable8 = myRecord.lottable8;
                    var getLottable9 = myRecord.lottable9;
                    var getLottable10 = myRecord.lottable10;

                    var getBatchId = myRecord.batchID;
                    var getProdId = myRecord.prodid;
                    var getLocType = myRecord.LocationType;

                    totalAllocateQty = totalAllocateQty + Number(getAllocateQty);
                    totalIntransitQty = '0';
                    debugger;

                    var highlightCSS = '';
                    if (getAllocateQty == '0' && getInTransitAllocateQty == '0') {
                        highlightCSS = 'wms-grid-highlight-row';
                    }
                    else if(getLocType == '334'){
                        highlightCSS = 'wms-grid-transload-row';
                    }
                    var constructRow = '<div class="wms-srv-grid-row ' + highlightCSS +'">';
                    constructRow += '<div class="wms-srv-grid-cell">' + getOrderId + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getOrderDate + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getClientName + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getDeliveryCenter + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getProductCode + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getLocationCode + '</div>';
                    if(IsPallet == 'YES'){
                        constructRow += '<div class="wms-srv-grid-cell">' + getPalletName + '</div>';
                    }
                    constructRow += '<div class="wms-srv-grid-cell">' + getBatchNo + '</div>';
                    if (getAllocateQty != '0') {
                        constructRow += '<div class="wms-srv-grid-cell"><input type="text" class="txtAllocationQty" style="width:75px;" value="' + getAllocateQty + '" id="txtAllocationQty_' + getId + '" data-allocationqty="' + getAllocateQty + '" onchange="updateQty(\'' + getId + '\',\'' + getAllocateQty + '\',\'AllocationQty\', this);" /> <i class="fas fa-solid fa-pen" onclick="openManualAllocation(\'' + getProdId + '\', \'txtAllocationQty_' + getId + '\', \'' + getOrderId + '\');"></i></div>';
                    } else {
                        constructRow += '<div class="wms-srv-grid-cell"><input type="text" class="txtAllocationQty" style="width:75px;" value="' + getAllocateQty + '" id="txtAllocationQty_' + getId + '" disabled="disabled" /> <i class="fas fa-solid fa-pen" style="opacity:0.3;cursor:default;"></i></div>';
                    }

                    for(var slt=0; slt < breakCustLot.length; slt++){
                        var custLotLabel = breakCustLot[slt];
                        //var custLotVal = breakLottableVal[slt];
                        var lotNum = slt + 1;
                        var custLotVal = myRecord["lottable" + lotNum];
                        if(custLotVal!= null && custLotVal.trim() == '0'){
                          custLotVal = '';
                        }
                        constructRow = constructRow + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ slt +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';
                      }

                    // constructRow += '<div class="wms-srv-grid-cell">' + getLottable1 + ' | '+getLottable2+' | '+getLottable3+'</div>';
                    constructRow += '</div>';

                    $('#wms-srv-grid-detail-alloplan').append(constructRow);
                }

                if (totalAllocateQty == 0) {
                    $('#btnCreatedirectBatch').prop('disabled', true);
                    $('#btnCreatedirectBatch').css('opacity', '0.2');
                    $('#btnCreatedirectBatch').css('cursor', 'not-allowed');
                } else {
                    $('#btnCreatedirectBatch').prop('disabled', false);
                    $('#btnCreatedirectBatch').css('opacity', '1');
                    $('#btnCreatedirectBatch').css('cursor', 'default');
                }
                getAllocationSum();
                showHideLotCellForAllocViewRow();
            }        
    },function(){
        alert('Server Error..!');
    });
}

function showHideLotCellForAllocViewRow(){
    var getTotalLotRowCount = $('#wms-srv-grid-detail-alloplan .wms-srv-grid-row ').length;
    $('#wms-srv-grid-detail-alloplan .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var totalCell = $('#wms-srv-grid-detail-alloplan .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]').length;
        var totalEmptyCell = $('#wms-srv-grid-detail-alloplan .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
  
        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#wms-srv-grid-detail-alloplan .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#wms-srv-grid-detail-alloplan .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#wms-srv-grid-detail-alloplan .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
  }

// function TotalQtyallocation()
// {
//     $('#wms-srv-TotalQtyAll-popup-open').show();
//     $('#wms-srv-TotalQtyAll-popup-Close').off();
//     $('#wms-srv-TotalQtyAll-popup-Close').click(function () {
//     $('#wms-srv-TotalQtyAll-popup-open').hide();
//     });
// }
function TotalQtyallocation(getSoId)
{
    $('#wms-srv-TotalQtyAll-popup-open').show();
    $('#wms-srv-TotalQtyAll-popup-Close').off();
    $('#wms-srv-TotalQtyAll-popup-Close').click(function () {
    $('#wms-srv-TotalQtyAll-popup-open').hide();
    });
    getTotalOrderQty(getSoId);
}

function getTotalOrderQty(orderids) 
{
    debugger;
	var apiPath = wmsApiPath + 'AllocationPlan/TotalShrotQty';

    var postData =
    {
        
            OrderId: orderids,
            BatchId: "1",
            BatchName: "Cough Syrup",
            CompId: getCompanyId,
            CustId: getCustomerId,
            whId: getWarehouseId
          
    };
   
    callHttpUrl(apiPath, postData, function (data) {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            var myGridList = data.Result;
            $('#totalqtyAll').html('');  	            
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Sku Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Order Qty</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Allocate Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Short Qty</div>';
            gridTable = gridTable + '</div>';			
            
            // GRID HEADER
            for (var i = 0; i <myGridList.Table.length;i++)
             {
                var getName = myGridList.Table[i].Name;
                var getOrderQty = myGridList.Table[i].OrderQty;
                var getallocateqty = myGridList.Table[i].allocateqty;
                var getShortQty = myGridList.Table[i].ShortQty;
				
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getOrderQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getallocateqty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getShortQty + "</div>";
                gridTable = gridTable + '</div>';				
               
            }
            $('#totalqtyAll').html(gridTable);
        }
        else {
            alert('Unable to connect');
        }
    });
}
function createdirectplanofso(orderids) {
    var apiPath = wmsApiPath + 'AllocationPlan/saveplandirect';
    //apiPath: 'http://localhost:50068/api/staging/v1/AllocationPlan/saveplandirect',
    var getSoId = orderids;
    //var isRedirected = $('#isRedirectedAgain').val();
    var isRedirected = "No";
    if (isRedirected == 'No') {
        var postData = {
            'ordernumber': getSoId,
            'userid': getUserId,
            'customerid':getCustomerId
        };  
        callHttpUrl(apiPath, postData, function (data) {
            var myJson = data;
            var getStatus = myJson.Status;
            var getStatusCode = myJson.StatusCode;
            if (getStatusCode == 'Success') {
                getAllocationHeadData(orderids);
            }
        },function(){
            alert('Server error..!');
        });
    } else {
        getAllocationHeadData(orderids);
    }
}

var confirmation = "no";
function createBatchData() {
    debugger;
    $('#btnCreatedirectBatch').hide();
    var getSoId = $('#hdnSelectedRec').val();
    var approflag = $('#hdnapprovalflag').val();
    var apiPath = wmsApiPath + 'AllocationPlan/CreateCustomBatch';
    //var apiPath = 'http://localhost:50068/api/staging/v1/AllocationPlan/CreateCustomBatch';

    var postData = {
        'soid': getSoId,
        'confirm':confirmation
    };    
    callHttpUrl(apiPath, postData, function (data) {
        var myJson = data;
        var getStatus = myJson.Status;
        var getStatusCode = myJson.StatusCode;
        var res = myJson.Result;
        if (getStatusCode == 'Success') {
            if(res.Message == 'success'){
                $('#wms-srv-blallocation-popup').hide();
                $('#wms-srv-blallocation-popup-close').on();

                $("#batchlistGrid").show();
                $('#purchaseOrderGrid').hide();
                $('#EdiSearchGrid').hide();
                $('#EcommerceGrid').hide();
                $("#pickinglistGrid").hide()
                $("#staginglistGrid").hide();
                $("#QualityCheckGrid").hide();
                $("#PassedBatchGrid").hide(); 
                alert("Batch Created Successfully..!");

                //Start Approval Code for big SAM
                if(approflag == 'Yes')
                { 
                    InsertApprovalTrans(getSoId);
                }
                 //End Approval Code for big SAM

                initbatchlist();
            }
            else if(res.Message == 'confirm'){
                if(confirm("Do you want to allocate from direct picking location..?")){
                    confirmation = "yes";
                    createBatchData();

                //Start Approval Code for big SAM
                if(approflag == 'Yes')
                {                
                    InsertApprovalTrans(getSoId);                
                }
                //End Approval Code for big SAM
                }
                else{
                    alert("Please change allocation");
                    $('#btnCreatedirectBatch').show();
                }
           }
        }
        else{
            alert(res.Message);
            $('#btnCreatedirectBatch').show();
        }
        },function(){
            alert('Batch not created..!');
            $('#btnCreatedirectBatch').show();
        });
}

function openManualAllocation(ProdId , Id , OrderId){
    getmanualallocation(ProdId,OrderId);
    $('#wms-srv-blmanualallocation-popup').show();
}

function closeManualPopUp(){
    var SelectedOrder = "";
    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder == "") {
                SelectedOrder = $(this).attr("id");
            }
            else {
                SelectedOrder = SelectedOrder + "," + $(this).attr("id");
            }
        }
    });
    getAllocationHeadData(SelectedOrder);
    $('#wms-srv-blmanualallocation-popup').hide();
}

function getmanualallocation(ProdId,OrderId) {
    var obj = $('#ddlOrderType').val();
    var apiPath = wmsApiPath + 'AllocationPlan/ManualallocationSearch';
    //var apiPath = 'http://localhost:50068/api/staging/v1/AllocationPlan/ManualallocationSearch';
    var getPrd = ProdId;
    var getSoid = OrderId;
    var whereFilterCondition = "";

    var postData = {
        'prdid': getPrd,
        'soid': getSoid,
        'whereFilterCondition': whereFilterCondition
    };

    callHttpUrl(apiPath, postData, function (data) {
        var myJson = data;
        var getStatus = myJson.Status;
        var getStatusCode = myJson.StatusCode;
        if (getStatusCode == 'Success') {
                var getLottable = mBrillWmsSession.getCustomerLottable();
                var breakCustLot = getLottable.split(',');
                $('#wms-srv-grid-detail-manualalloplan').html('');
                var constructHeaderRow = '<div class="wms-srv-grid-header tdHeadRow">';
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Order No</label></div>';
                if(obj == 'SalesOrder' || obj == 'ScrapOrder'){
                    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Client Name</label></div>';
                }
                else{
                    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Warehouse Name</label></div>';
                }
                
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Delivery Center</label></div>';
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Location Code</label></div>';
                if(IsPallet == 'YES'){
                    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Pallet Name</label></div>';
                }
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Batch No</label></div>';
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Closing Balance</label></div>';
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Allocate Qty</label></div>';                
                // constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Lottable</label></div>';
                for(var pl=0; pl < breakCustLot.length; pl++){
                    var custLotLabel = breakCustLot[pl];
                    constructHeaderRow = constructHeaderRow + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="' + custLotLabel + '">'+ custLotLabel +'</div>';
                }
                constructHeaderRow += '</div>';

                $('#wms-srv-grid-detail-manualalloplan').append(constructHeaderRow);

                var getJsonObj = myJson.Result;
                for (var i = 0; i < getJsonObj.Table.length; i++) {
                    var myRecord = getJsonObj.Table[i];
                    var getId = myRecord.ID;
                    var getOrderId = myRecord.orderid;                   
                    var getClientName = myRecord.clientname;
                    var getDeliveryCenter = myRecord.deliverycenter;
                    var getLocationCode = myRecord.locationcode;
                    var getPalletName = myRecord.palletname;
                    var getBatchNo = myRecord.batchno;
                    var getClosingBalance = myRecord.closingbalance;
                    var getAllocateQty = myRecord.allocateqty;
                    var getLottable1 = myRecord.lottable1;
                    var getLottable2 = myRecord.lottable2;
                    var getLottable3 = myRecord.lottable3;
                    var getBatchId = myRecord.batchID;
                    var getProdId = myRecord.prodid;

                    var constructRow = '<div class="wms-srv-grid-row">';
                    constructRow += '<div class="wms-srv-grid-cell">' + getOrderId + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getClientName + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getDeliveryCenter + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getLocationCode + '</div>';
                    if(IsPallet == 'YES'){
                        constructRow += '<div class="wms-srv-grid-cell">' + getPalletName + '</div>';
                    }
                    constructRow += '<div class="wms-srv-grid-cell">' + getBatchNo + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getClosingBalance + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell"><input type="text" style="width:100%;" value="' + getAllocateQty + '" id="txtAllocationQty_' + getId + '" data-allocationqty="' + getAllocateQty + '"  onchange="updateQty(\'' + getId + '\',\'' + getAllocateQty + '\',\'AllocationQty\', this);" /></div>';                    
                    //constructRow += '<div class="wms-srv-grid-cell">' + getLottable1 + ' | '+getLottable2+' | '+getLottable3+'</div>';
                    for(var pi=0; pi < breakCustLot.length; pi++){
                        var custLotLabel = breakCustLot[pi];
                        //var custLotVal = getLottableGroup[pi];
                        var lotNum = pi + 1; 
                        var custLotVal = myRecord["lottable" + lotNum];
                        if(custLotVal!= null && custLotVal.trim() == '0'){
                          custLotVal = '';
                        }
                        constructRow = constructRow + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
                    }
                    constructRow += '</div>';

                    $('#wms-srv-grid-detail-manualalloplan').append(constructRow);
                }
                showHideLotAllocEditRow();
                restoreDropDownHeaderVal();
                restoreInputHeaderVal();
                hideWMSThemeLoading();
                getCustomGridPagging();
               
        }
    },function(){
        alert('Server error occured..!');
    });
}

function showHideLotAllocEditRow(){
    var getTotalLotRowCount = $('#wms-srv-grid-detail-manualalloplan .wms-srv-grid-row').length;
    $('#wms-srv-grid-detail-manualalloplan .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
        var totalCell = $('#wms-srv-grid-detail-manualalloplan .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]').length;
        var totalEmptyCell = $('#wms-srv-grid-detail-manualalloplan .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
  
        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#wms-srv-grid-detail-manualalloplan .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#wms-srv-grid-detail-manualalloplan .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#wms-srv-grid-detail-manualalloplan .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
}

function getAllocationSum(){
    debugger;
    var total = 0;
    $('.txtAllocationQty').each(function(){
        var myNum = $(this).val();
        if(myNum.trim() != ''){
            total = total + Number(myNum);
        }       
    });
    $('#dvAllocateqty').html(total);
    $('#dvShortqty').html(Number($('#dvOrderqty').html()) - Number(total));
}

function openblallocationbyBatch(orderids,statusid){
    debugger;
    getAllocationHeadData(orderids);
    $('#wms-srv-blallocation-popup').show();
    $('#wms-srv-blallocation-popup-close').off();
    $('#wms-srv-blallocation-popup-close').click(function () {
    $('#wms-srv-blallocation-popup').hide();
    });
     if(statusid==31){
         $('#btnCreatedirectBatch').show();   
          $('.fas fa-solid fa-pen').show();
      }
      else{
         $('#btnCreatedirectBatch').hide();
         $('.fas fa-solid fa-pen').hide();
      }
      $('#btnCreatedirectBatch').hide();
        $('.fas fa-solid fa-pen').hide();
}

function updateQty(oid, orgQty, type, obj) {
    debugger;
    var obj1 = $('#ddlOrderType').val();
    var getId = oid;
    //var originalQty = orgQty;
    var originalQty = $(obj).attr('data-allocationqty');
    var getType = type;
    var newQty = obj.value;
    var apiPath = wmsApiPath + 'AllocationPlan/UpdateQtyManualallocation';
    //var apiPath = 'http://localhost:50068/api/staging/v1/AllocationPlan/UpdateQtyManualallocation';
    if(newQty == ''){
        alert("Please enter Quantity..!");
        obj.value = originalQty;
    }
    else{
        var postData = {
            'id': getId,
            'orgQty': originalQty,
            'newQty': newQty,
            'Object' : obj1
        };    
        callHttpUrl(apiPath, postData, function (data) {
            var myJson = data;
            var getStatus = myJson.Status;
            var getStatusCode = myJson.StatusCode;
            if (getStatusCode == 'Success') {
                //alert("Record Updated Successfully");
                $(obj).attr('data-allocationqty', newQty);
            }
            else{
                var errormsg = myJson.Result;
                alert(errormsg.Message)
                if(Number(newQty) < Number(originalQty)){
                    obj.value = newQty;
                }
                else{
                    obj.value = originalQty;
                }
            }
        },function(){
            alert('Server error occured..!');
            obj.value = originalQty;
        });
        getAllocationSum();
    }
}

function selectGridRow(chkObj) {
    var getChkId = chkObj.id;
    if ($(chkObj).prop('checked')) {
        $('#div' + getChkId).css("background", "#efefef");
        $('#' + getChkId).prop("checked", true);
    } else {
        $('#div' + getChkId).css("background", "#ffffff");
        $('#' + getChkId).prop("checked", false);
    }
}

function DeAllocate(){
    debugger;
    var SelectedOrder = document.getElementById("hdnSelectedBatch");
    SelectedOrder.value = "";
   
    $("input[class=batchCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });

    var ids = SelectedOrder.value.split(',');
    if(SelectedOrder.value == ""){
        alert("Please Select one Batch..!");
    }
    else if(ids.length==1){
        var data = ids[0].split('|');
        var getBatchId = data[0];       
        var getStatus = data[1];
        var apiPath = wmsApiPath + 'AllocationPlan/deAllocatePlan';
        //var apiPath = 'http://localhost:50068/api/staging/v1/AllocationPlan/deAllocatePlan';
        var postData = {
            'BatchId': getBatchId,
            'UserId': getUserId
        };    
        if(getStatus == "31"){
            callHttpUrl(apiPath, postData, function (data) {
                var myJson = data;
                var getStatus = myJson.Status;
                var getStatusCode = myJson.StatusCode;
                if (getStatusCode == 'Success') {
                    alert("batch De-Allocate Successfully..!");
                    getBatchList();
                }
                else{
                    var errormsg = myJson.Result;
                    alert(errormsg.Message)
                }
            },function(){
                alert('Server error occured..!');
            });
        }
        else{
            alert("Not Allowed..!");
        }
    }
    else{
        alert("Please Select one Batch..!");
    }

    
}

//Allocation Plan End

//#region  Start code for Big SAM Approval after allocation for order profit approval
function InsertApprovalTrans(SOID) {
    debugger;  
    var apiPath = wmsApiPath + 'ApprovalMaster/InsertApprovalTrans';
    var postData = {
        'Object': 'SalesOrder',
        'ReferenceID': SOID,
        'ApproEvent': 'Contribution Approval',
        'Customerid': getCustomerId,
        'UserID': getUserId,
        'warehouseID': getWarehouseId,
    };    
    callHttpUrl(apiPath, postData, function (data) {

     var getStatusCode = data.StatusCode;
     if (getStatusCode.toLocaleLowerCase() == 'success')
      {
      }    
});
}

//#endregion End code for Big SAM Approval after allocation for order profit approval