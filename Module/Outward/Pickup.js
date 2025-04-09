var isEdiAdvanceSearchOn = "no";
var isSingleSKUOn = "no";
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId= mBrillWmsSession.getClientId();
var getCompanyId = mBrillWmsSession.getCompanyId();
var getobject = "SalesOrder";
var SKUSearch = "no";
var filtercol = 'All'; 
var filterval = ''; 
var globalActiveTab = 'PickingList';
var searchfilter = 'All';
var CurrentPage = '1';
var getTotalRecords = '100';
var recordLimit = '100';
var getPickUpListLimit = 200;
var hasQualityCheck = false;    
var more = true;
var IsQC = 'NO';
var IsPallet = 'NO';
var soid = '0';
var getActiveObj = '';
var checkassignstatus="";
var ispickedit = 'NO';


function initpicking() {
    getPickingList();
}

function openpickedit(pickupId, batchId, soid) {
    $('#wms-srv-pickedit-popup').show();
    $('#wms-srv-pickedit-popup-close').off();
    $('#wms-srv-pickedit-popup-close').click(function () {
        // $('#wms-srv-pickedit-popup').hide();
        // resetPickUp();
        debugger;
        if(ispickedit=='YES')
        {
            var batchId = $('#txtPickup_GroupNo').text().trim();
            if (confirm("If You Close Window without Save Will revert the changes from Pickup Details.Do you want to close?")) {
                var apiPath = wmsApiPath + 'PickUp/RevertPickUpQty';
                var postData =
                {
                    "batchID": batchId,
                    "UserId": getUserId
                };
                callHttpUrl(apiPath, postData, function (result) {
                    var getCode = result.StatusCode;
                    if (getCode == "Success")
                    {
                       $('#wms-srv-pickedit-popup').hide();
                       resetPickUp();
                    }
                    else {
                        alert('Failed to remove item!!');
                    }
                });
            }

        }
        else
        {
            $('#wms-srv-pickedit-popup').hide();
            resetPickUp();
        }
        //resetPickUp();

    });
    checkassignornot(pickupId, batchId, soid);
    // getPickingDetails(pickupId, batchId,soid);
}

function getPickingList(filtercol,filterval) {
    debugger
    var apiPath = wmsApiPath + 'PickUp/GetPickUpList';
   // var apiPath = "http://localhost:50068/api/staging/v1/PickUp/GetPickUpList";
    var getPageObject = $('#ddlOrderType').val();
    getActiveObj = 'Picking';
 
    if(filtercol != 0 && filterval !=0)
    {
        var filtercol = $('#ddlPickingsearch').val();
        var filterval = $('#txtPickingvalue').val();
  
    }

    if (filtercol == '')
    {
        filtercol = '';
        filterval = '';
    }	

    var postData =
    {
        CurrentPage: CurrentPage,
        recordLimit: getPickUpListLimit,
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        UserId: getUserId,
        Object: getPageObject,
        whereFilterCondtion: filtercol,
        SearchValue: filterval,
        ClientId: getClientId
      }
     
    //PickingListGrid
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblgetPickingList').html('');
            var myGridList = data.Result;   

            //var getTotalRecords = Number(myGridList.PickUpListResult[0].Dashboard[0].Picking) + Number(myGridList.PickUpListResult[0].Dashboard[0].QC) + Number(myGridList.PickUpListResult[0].Dashboard[0].Packing) + Number(myGridList.PickUpListResult[0].Dashboard[0].Shipped);
            var getTotalRecords = myGridList.PickUpListResult[0].Dashboard[0].Picking;
            
            // GET DASHBOARD COUNTS
            var getOutboundOrder = myGridList.PickUpListResult[0].Dashboard[0].OutboundOrder;
            var getAllocated = myGridList.PickUpListResult[0].Dashboard[0].Allocated;
            var getPicking = myGridList.PickUpListResult[0].Dashboard[0].Picking;
            var getQualityCheck = myGridList.PickUpListResult[0].Dashboard[0].QC;
            var getPacking = myGridList.PickUpListResult[0].Dashboard[0].Packing;
            var getDispatch = myGridList.PickUpListResult[0].Dashboard[0].Shipped;
            IsQC = myGridList.PickUpListResult[0].Dashboard[0].IsQC.toUpperCase();
           
            // if(IsQC=="YES")
            // {
            //     $('#MarPacked').hide();
            // }
            // else{$('#MarPacked').show();}
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
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Picking No.</div>';
        
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Reference No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">WH Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Picking Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Client Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Shipping Address</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Delivery Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Picking By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px; text-align:center;">Status</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"  text-align:center;">Action</div>';
            gridTable = gridTable + '</div>';
            //Bind Header
            
            var getGridData = data.Result.PickUpListResult[0].PickUpList;
            for (var i = 0; i < getGridData.length; i++) {
                var getpickupNo = getGridData[i].PickUpNo;
                var getBatchNo = getGridData[i].BatchNo;
                var getBatchName = getGridData[i].BatchName;
                var getOrderNo = getGridData[i].OrderNo;
                var getPickUpDate = getGridData[i].PickUpDate;
                var getPickUpBy = getGridData[i].PickUpBy;
                var getStatus = getGridData[i].Status;
                var getStatusId = getGridData[i].StatusID;
                var getOrderType = getGridData[i].OrderType;
                var getOrderRefNumber = getGridData[i].OrderNumber;
                var getWarehouseCode = getGridData[i].code;
                var getClientCode = getGridData[i].ClientCode;
                var getShippingAddress = getGridData[i].ShippingAddress;
                var getDeliveryType = getGridData[i].DeliveryType;
                //// GRID ROW
              
                // gridTable = gridTable + '<div class="wms-srv-grid-row">';         
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'><input type='checkbox' class='cancelpick' value='"+getpickupNo+"' data-OrderPickupid='"+getOrderNo+"'  data-batchid='"+getBatchNo+"' id='"+getpickupNo+"'></div>";    
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getpickupNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderRefNumber + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPickUpDate + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPickUpBy + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindPickingListStatusControl(getpickupNo, getBatchNo, getStatus,getStatusId,getOrderNo) + "</div>";
                // gridTable = gridTable + '</div>';

                gridTable = gridTable + '<div class="wms-srv-grid-row">';         
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'><input type='checkbox' class='cancelpick' value='"+getpickupNo+"' data-OrderPickupid='"+getOrderNo+"'  data-batchid='"+getBatchNo+"' id='"+getpickupNo+"'></div>";    
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getpickupNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderRefNumber + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getWarehouseCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPickUpDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDeliveryType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPickUpBy + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindPickingListStatusControl(getpickupNo, getBatchNo, getStatus,getStatusId,getOrderNo) + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindPickupActionControl(getpickupNo) + "</div>";
                gridTable = gridTable + '</div>';

                //// GRID ROW
            }

            $('#tblgetPickingList').html(gridTable);
            $('.wms-srv-grey').attr('onclick', 'return false'); 

            setupGridPagingList('tlbOutboundPickingGridPager', CurrentPage, getTotalRecords, getPickingList, getPickUpListLimit);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}
function openPickingDetailReport(dataVal) {
    debugger;
   mBrillWmsSession.setReportDetailId(dataVal);
   window.open("WMSReport/DetailReport/Picking-Detail-Report.html"); 
}
function bindPickupActionControl(getpickupNo) {
    debugger;
   var htmlControl = '';
  
   htmlControl = htmlControl + '<a href="#" title="Report" data-orderid="' + getpickupNo + '" class="wms-srv-icononly" onclick="openPickingDetailReport(' + getpickupNo + ');return false;"><i class="fas fa-solid fa-eye"></i></a>';
   htmlControl = htmlControl + ' </div>';

   return htmlControl;
}
function cancelPickUp(){
    debugger;
    var SelectedPickId = document.getElementById("hdnPickUpId");
    // alert(getActiveObj);
    SelectedPickId.value = "";
    var batchid = "";
    $("input[class=cancelpick]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedPickId.value == "") {
                SelectedPickId.value = $(this).attr("id");
                batchid = $(this).attr("data-batchid");
            }
            else {
                SelectedPickId.value = SelectedPickId.value + "," + $(this).attr("id");
            }
        }
    });

    var ids = SelectedPickId.value.split(',');
    if(SelectedPickId.value == ""){
        alert("Please Select one Picking No..!");
    }
    else if(ids.length==1){
        if(confirm("This will cancel all sales orders related to selected Picking No..!")){
            
            var apiPath = wmsApiPath + 'PickUp/cancelPickUp';
            var postData =
            {
                "CustomerId": getCustomerId,
                "WarehouseId": getWarehouseId,
                "UserId": getUserId,
                "PickUpId": SelectedPickId.value,
                "BatchId": batchid
            };

            callHttpUrl(apiPath, postData, function (data) {
                var getStatus = data.Status;
                var getStatusCode = data.StatusCode;
                var getResult = data.Result;
                if (getStatusCode.toLocaleLowerCase() == 'success') {
                    alert('Pickup Cancel successfully..!');
                    var filtercol = '0';
                    var filterval = '0';
                    getPickingList(filtercol,filterval);
                }else{
                    var getMessage = getResult.Message;
                    alert(getMessage);
                }
            });
        }
    }
    else{
        alert("Please Select one Picking No..!");
    }
}
/// Mark as Pack
function MarkPacked(){
    debugger;
    var SelectedPickId = document.getElementById("hdnPickUpId");
    SelectedPickId.value = "";
    var batchid = "";
    var getPickupOrderId = "";
    //   alert(getActiveObj);
    $("input[class=cancelpick]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedPickId.value == "") {
                SelectedPickId.value = $(this).attr("id");
                batchid = $(this).attr("data-batchid");
                getPickupOrderId = $(this).attr("data-OrderPickupid");
            }
            else {
                SelectedPickId.value = SelectedPickId.value + "," + $(this).attr("id");
            }
        }
    });

    var ids = SelectedPickId.value.split(',');
    if(SelectedPickId.value == ""){
        alert("Please Select one Picking No..!");
    }
    else if(ids.length==1){
        if(confirm("This will Pack all sales orders related to selected Picking No..!")){
            
            var apiPath = wmsApiPath + 'PickUp/MarkPacked';
        //var apiPath = "http://localhost:50068/api/staging/v1/PickUp/MarkPacked";
            var postData =
            {
                "CustomerId": getCustomerId,
                "WarehouseId": getWarehouseId,
                "UserId": getUserId,
                "PickUpId": SelectedPickId.value,
                "BatchId": batchid,
                "OrderId":getPickupOrderId,
                "compid":getCompanyId
            };

            callHttpUrl(apiPath, postData, function (data) {
                var getStatus = data.Status;
                var getStatusCode = data.StatusCode;
                var getResult = data.Result;
                if (getStatusCode.toLocaleLowerCase() == 'success') {
                    alert('Mark Packed successfully..!');
                    getPickingList(filtercol,filterval);
                }else{
                    var getMessage = getResult.Message;
                    alert(getMessage);
                }
            });
        }
    }
    else{
        alert("Please Select one Picking No..!");
    }
}

// function setupGridPagingPickingList(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) { //Changed Respective ID 
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

function SearchPickingList(){	

	filtercol = $('#ddlPickingsearch').val();
	filterval = $('#txtPickingvalue').val();
	
	if(filterval =='')
	{
		alert('Please Enter value for filter');		
	}
	else
	{	
		getPickingList(filtercol,filterval);	
	}
}

function PickingListDateFilter(){
    debugger;
 var isPickUpDate=$('#ddlPickingsearch').val();
    if(isPickUpDate=='PickUpDate'){
        $('#txtPickingvalue').datepicker({ dateFormat: 'mm/dd/yy' })
    
    }
    else
{
    $('#txtPickingvalue').datepicker('destroy')
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

function bindPickingListStatusControl(ID, BatchId, strStatus,statusid,getOrderNo) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    //Picking = 32
    if(statusid == 31){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Picking" onclick="openpickedit(' + ID + ',\'' + BatchId + '\',\'' + 0 + '\');return false;"></div>';
    }
    else if (statusid == 32 || statusid == 28 || statusid == 33 || statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Picking" onclick="openpickedit(' + ID + ',\'' + BatchId + '\',\'' + 0 + '\');return false;"></div>';
    }
    else if (statusid = 57)
    {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-partial" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Picking Partial" onclick="openpickedit(' + ID + ',\'' + BatchId + '\',\'' + 0 + '\');return false;"></div>';

    }
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openpickedit(' + ID + ',\'' + BatchId + '\',\'' + 0 + '\');return false;"></div>';
    }
    
    if(IsQC == 'YES'){
        //QC = 28
        if(statusid == 31){
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+getOrderNo+'\');return false;"></div>';
        }
        else if(statusid == 32 || statusid == 57){
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+getOrderNo+'\');return false;"></div>';
        }
        else if(statusid == 28 || statusid == 33 || statusid == 59){
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+getOrderNo+'\');return false;"></div>';
        }  
        else if(statusid == 57){
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-partial" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail Partial" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+getOrderNo+'\');return false;"></div>';
        }   
        else{
            htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+getOrderNo+'\');return false;"></div>';
        }
    }
    
    //Packing = 33
    if((statusid == 31 || statusid == 32 || statusid == 57) && (IsQC == 'YES')){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openstaginglist(' + 0 + ',\'' + BatchId + '\');return false;"></div>';
    }
    else if((statusid == 31 || statusid == 32 || statusid == 57) && (IsQC == 'NO')){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstaginglist(' + ID + ',\'' + BatchId + '\');return false;"></div>';
    }
    else if(statusid == 28){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstaginglist(' + 0 + ',\'' + BatchId + '\');return false;"></div>';
    }
    else if(statusid == 33 || statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstaginglist(' + 0 + ',\'' + BatchId + '\');return false;"></div>';
    }
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openstaginglist(' + 0 + ',\'' + BatchId + '\');return false;"></div>';
    }
    
    //Dispatch = 59
    if(statusid == 31 || statusid == 32 || statusid == 28){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openDispacthlist(\'' + BatchId + '\');return false;"></div>';
    }
    else if(statusid == 33){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthlist(\'' + BatchId + '\');return false;"></div>';
    }
    else if(statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Dispatch Detail" onclick="openDispacthlist(\'' + BatchId + '\');return false;"></div>';
    }
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openDispacthlist(\'' + BatchId + '\');return false;"></div>';
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

function resetPickUp(){
    $('#wmsSkuDetailsPickingGrid').html('');
    var skuHeadRow = '<div class="wms-srv-grid-header">' + 
    '<div class="wms-srv-grid-cell">SR.NO.</div>' + 
    '<div class="wms-srv-grid-cell">Location Code</div>' + 
    '<div class="wms-srv-grid-cell">Pallet Name</div>' + 
    '<div class="wms-srv-grid-cell">SKU Code</div>' + 
    '<div class="wms-srv-grid-cell">SKU Name</div>' + 
    '<div class="wms-srv-grid-cell">Lottable</div>' + 
    '<div class="wms-srv-grid-cell">Allocation Qty</div>' + 
    '<div class="wms-srv-grid-cell">Pick Up Qty</div>' + 
    '<div class="wms-srv-grid-cell">UOM</div>' + 
    '</div>';
    $('#wmsSkuDetailsPickingGrid').append(skuHeadRow);

    $('#txtPickup_GroupNo').html('');
    $('#txtPickup_GroupName').html('');
    $('#txtPickup_PickNo').html('To be Generated');
    $('#txtPickup_Date').html('');
    $('#txtPickup_By').html('');
    ispickedit = 'NO';
}

function checkassignornot(pickupId, batchId,soid)
{
    debugger;
    //var LocalPath = "http://localhost:50068/api/staging/v1/";
    var apiPath = wmsApiPath + 'PickUp/ChkOrderAssignToUser';
    //var apiPath = wmsApiPath + 'PickUp/GetPickUpDetail';
   // var checkorderassign = "";
    var postData=
    {
        "customerid":getCustomerId,
        "userid":getUserId,
        "objectname":"Picking",
        "referenceid":batchId
    }
    callHttpUrl(apiPath, postData, function(data)
    {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getResult = data.Result;
        if(getStatusCode.toLocaleLowerCase() == 'success')
        {
            var assignorder = data.Result.Message;
            checkassignstatus = assignorder;
            if ( getResult.Message == "notassign" || getResult.Message == "notask" )
            {
                checkassignstatus = "notask";
            }
            
            // if(getResult.Message == "notassign" || getResult.Message == "notask")
            // {                        
                                  
            //     $("#btnSavePickupDetailsAll"). attr("disabled", true);
            //     $("#btnSavePickupDetailsAll").fadeTo(1000, 0.5);
               
            // }
            // else
            // {      
            //     $("#btnSavePickupDetailsAll"). attr("disabled", false);
            //     // $("#btnSavePickupDetailsAll").fadeIn();
            //     $("#btnSavePickupDetailsAll").css('opacity', 1.0).fadeIn(); 
                
            // }
        }
        else
        {
            checkassignstatus ="notask";
        }    
       getPickingDetails(pickupId, batchId,soid,checkassignstatus);
       debugger;
       if(checkassignstatus == "notassign" || checkassignstatus == "notask")
        {
            // $("#btnSavePickupDetailsAll"). attr("disabled", false);
            // // $("#btnSavePickupDetailsAll").fadeIn();
            //  $("#btnSavePickupDetailsAll").css('opacity', 1.0).fadeIn();
             $("#btnSavePickupDetailsAll").hide();
        }
        else
        {
            // $("#btnSavePickupDetailsAll"). attr("disabled", true);
            // $("#btnSavePickupDetailsAll").fadeTo(1000, 0.5);
            $("#btnSavePickupDetailsAll").show();
        }
    }); 
   
}

function chkIsNullPickLottable(strLot){
    var finalLot = '';
    if(strLot != null && strLot.trim() != '0'){
        finalLot = strLot;
    }
    return finalLot;
}

function getPickingDetails(pickupId, batchId, soid,ChkassignOrder){
    debugger;
    var apiPath = wmsApiPath + 'PickUp/GetPickUpDetail';
   // var apiPath = "http://localhost:50068/api/staging/v1/PickUp/GetPickUpDetail";

    var getPageObject = $('#ddlOrderType').val();
    var filtercol = $('#ddlPickingsearch').val();
    var filterval = $('#txtPickingvalue').val();

    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "BatchID": batchId,
        "PickUpID": pickupId,
        "SOID": soid
      }

      callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getResult = data.Result;
        if (getStatusCode.toLocaleLowerCase() == 'success') {  
            var getLottable = mBrillWmsSession.getCustomerLottable();
            var breakCustLot = getLottable.split(',');

            $('#wmsSkuDetailsPickingGrid').html('');     
            var getPickingHead = data.Result.Table[0];
            var getGroupId = getPickingHead.GroupID;
            var getGroupName = getPickingHead.GroupName;
            var getPickUpNo = getPickingHead.PickUpNo;
            var getPickUpDate = getPickingHead.PickUpDate.split('T');
            var getPickUpBy = getPickingHead.PickUpBy;
            var getOrderNumber = getPickingHead.OrderNumber;
            var getOrderRefNo = getPickingHead.OrderRefNo;
            
            IsPallet = getPickingHead.IsPallet.toUpperCase();

            if(getPickUpNo == '0' && soid == '0'){
                getPickUpNo = 'To be Generated';
                $('#btnSavePickupDetailsAll').show();
            }else{
                $('#btnSavePickupDetailsAll').hide();
            }

            $('#txtPickup_GroupNo').html(getGroupId);
            $('#txtPickup_OrderNo').html(getOrderNumber);
            $('#txtPickup_OrderReferenceNo').html(getOrderRefNo);

            $('#txtPickup_GroupName').html(getGroupName);
            $('#txtPickup_PickNo').html(getPickUpNo);
            $('#txtPickup_Date').html(getPickUpDate[0]);
            $('#txtPickup_By').html(getPickUpBy);

            var getPickingSkuDetails = data.Result.Table1;

            var strPalletDiv = '', action = '';

            if(IsPallet == 'YES'){
                strPalletDiv = '<div class="wms-srv-grid-cell">Pallet Name</div>';
            }

            if(getPickUpNo == 'To be Generated' && soid == '0'){
                action = '<div class="wms-srv-grid-cell">Action</div>';
                action = '<div class="wms-srv-grid-cell" style="display: none;">Action</div>';
            }

            var skuHeadRow = '<div class="wms-srv-grid-header" id="header-wrap">' + 
            '<div class="wms-srv-grid-cell">SR.NO.</div>' + 
            '<div class="wms-srv-grid-cell">Order No.</div>' +
            '<div class="wms-srv-grid-cell">Order Reference No.</div>' +
            '<div class="wms-srv-grid-cell">Location Code</div>' + 
            strPalletDiv + 
            '<div class="wms-srv-grid-cell">SKU Code</div>' + 
            '<div class="wms-srv-grid-cell">SKU Name</div>' + 
            '<div class="wms-srv-grid-cell">Allocation Qty</div>' + 
            '<div class="wms-srv-grid-cell">Pick Up Qty</div>' + 
            '<div class="wms-srv-grid-cell">UOM</div>';
            //'<div class="wms-srv-grid-cell">Lottable</div>' +
            for(var pl=0; pl < breakCustLot.length; pl++){
                var custLotLabel = breakCustLot[pl];
                skuHeadRow = skuHeadRow + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
            }

            skuHeadRow = skuHeadRow + action + 
            '</div>';
            $('#wmsSkuDetailsPickingGrid').append(skuHeadRow);
            if(ChkassignOrder == "notassign" || ChkassignOrder == "notask")
                {
                    $("#btnSavePickupDetailsAll").hide();
                }
                else
                {
                    $("#btnSavePickupDetailsAll").show();
                }
            for (var i = 0; i < getPickingSkuDetails.length; i++) {
                
                var getSrNo = getPickingSkuDetails[i].SrNo;
                var getId = getPickingSkuDetails[i].ID;
                var getLocationID = getPickingSkuDetails[i].LocationID;
                var getLocationCode = getPickingSkuDetails[i].LocationCode;
                var getPalletID = getPickingSkuDetails[i].PalletID;
                var getPalletName = getPickingSkuDetails[i].PalletName;
                var getProdID = getPickingSkuDetails[i].ProdID;
                var getSKUCode = getPickingSkuDetails[i].SKUCode;
                var getSKUName = getPickingSkuDetails[i].SKUName;
                
                var getLottable1 = getPickingSkuDetails[i].Lottable1;
                var getLottable2 = getPickingSkuDetails[i].Lottable2;
                var getLottable3 = getPickingSkuDetails[i].Lottable3;
                var getLottable4 = getPickingSkuDetails[i].Lottable4;
                var getLottable5 = getPickingSkuDetails[i].Lottable5;
                var getLottable6 = getPickingSkuDetails[i].Lottable6;
                var getLottable7 = getPickingSkuDetails[i].Lottable7;
                var getLottable8 = getPickingSkuDetails[i].Lottable8;
                var getLottable9 = getPickingSkuDetails[i].Lottable9;
                var getLottable10 = getPickingSkuDetails[i].Lottable10;

                var getLottableGroup = [];
                getLottableGroup.push(chkIsNullPickLottable(getLottable1));
                getLottableGroup.push(chkIsNullPickLottable(getLottable2));
                getLottableGroup.push(chkIsNullPickLottable(getLottable3));
                getLottableGroup.push(chkIsNullPickLottable(getLottable4));
                getLottableGroup.push(chkIsNullPickLottable(getLottable5));
                getLottableGroup.push(chkIsNullPickLottable(getLottable6));
                getLottableGroup.push(chkIsNullPickLottable(getLottable7));
                getLottableGroup.push(chkIsNullPickLottable(getLottable8));
                getLottableGroup.push(chkIsNullPickLottable(getLottable9));
                getLottableGroup.push(chkIsNullPickLottable(getLottable10));

                var getOrderid = getPickingSkuDetails[i].OrderID;
                var getReferenceno = getPickingSkuDetails[i].OrderNumber;
                var getOrderNo = getPickingSkuDetails[i].OrderNo;
                var getAllocationQty = getPickingSkuDetails[i].allocateqty;

                var finalLottable = '';
                
                
                if(getLottable1 != null && getLottable1.trim() != ''){
                    if(finalLottable.trim() != ''){
                        finalLottable = finalLottable + '|' + getLottable1;
                    }else{
                        finalLottable =  getLottable1;
                    }
                }

                if(getLottable2 != null && getLottable2.trim() != ''){
                    if(finalLottable.trim() != ''){
                        finalLottable = finalLottable + '|' + getLottable2;
                    }else{
                        finalLottable =  getLottable2;
                    }
                }

                if(getLottable3 != null && getLottable3.trim() != ''){
                    if(finalLottable.trim() != ''){
                        finalLottable = finalLottable + '|' + getLottable3;
                    }else{
                        finalLottable =  getLottable3;
                    }
                }
                
                var getPickUpQty = getPickingSkuDetails[i].PickUpQty;
                var getAllocationQty = getPickingSkuDetails[i].allocateqty;
                var getUOMID = getPickingSkuDetails[i].UOMID;
                var getUOM = getPickingSkuDetails[i].UOM;


                

                var skuRow = '<div class="wms-srv-grid-row wmSkuDetailsPickingRow">';
                skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getSrNo + '</div>';
                skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getOrderNo + '</div>';
                skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getReferenceno + '</div>';
                skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getLocationCode + '</div>';
                if(IsPallet == 'YES'){
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getPalletName + '</div>';
                }
                skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getSKUCode + '</div>';
                skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getSKUName + '</div>';
                //skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getPickUpQty + '</div>';
                skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getAllocationQty + '</div>';
                if ( pickupId == 0 )
                {
                    skuRow = skuRow + '<div class="wms-srv-grid-cell"><input type="text" style="width:100%;" value="' + getPickUpQty + '" id="txtAllocationQty_' + getId + '" data-allocationqty="' + getAllocationQty + '" onchange="EditPickUpQty(\'' + getId + '\',\'AllocationQty\', this);" /></div>';

                }
                else{
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getPickUpQty + ' </div>';

                }

                skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                //skuRow = skuRow + '<div class="wms-srv-grid-cell">' + finalLottable + '</div>';
                for(var pi=0; pi < breakCustLot.length; pi++){
                    var custLotLabel = breakCustLot[pi];
                    var custLotVal = getLottableGroup[pi];
                    if(custLotVal!= null && custLotVal.trim() == '0'){
                      custLotVal = '';
                    }
                    skuRow = skuRow + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
                }
                if(getPickUpNo == 'To be Generated' && soid == '0'){
                    //skuRow = skuRow + '<div class="wms-srv-grid-cell" style="text-align:center;"><div class="wms-srv-grid-action"><a href="#" title="Pick Up Edit" class="wms-srv-icononly" onclick="getPickEditPlan('+getProdID+','+getOrderid+');return false;"><i class="fas fa-edit"></i></a> </div></div>';
                    if(ChkassignOrder == "assign" || ChkassignOrder == "notask")
                    {                        
                        //skuRow = skuRow + '<div class="wms-srv-grid-cell" style="text-align:center;"><div class="wms-srv-grid-action"><a href="#" title="Pick Up Edit" class="wms-srv-icononly" onclick="getPickEditPlan('+getProdID+','+getOrderid+');return false;"><i class="fas fa-edit"></i></a> </div></div>';
                       
                        skuRow = skuRow + '<div class="wms-srv-grid-cell" style="text-align:center;display: none;"><div class="wms-srv-grid-action"><a href="#" title="Pick Up Edit" class="wms-srv-icononly" onclick="getPickEditPlan('+getProdID+','+getOrderid+');return false;"><i class="fas fa-edit"></i></a> </div></div>';
                        $("#btnSavePickupDetailsAll"). attr("disabled", false);
                       // $("#btnSavePickupDetailsAll").fadeIn();
                        $("#btnSavePickupDetailsAll").css('opacity', 1.0).fadeIn();
                    }
                    else
                    {                        
                        skuRow = skuRow + '<div class="wms-srv-grid-cell" style="text-align:center;"><div class="wms-srv-grid-action"><a href="#" title="Pick Up Edit" class="wms-srv-icononly" onclick="NoAccess();return false;" style="opacity: 0.3;"><i class="fas fa-edit"></i></a> </div></div>';
                        $("#btnSavePickupDetailsAll"). attr("disabled", true);
                        $("#btnSavePickupDetailsAll").fadeTo(1000, 0.5);
                    }

                }
                skuRow = skuRow + '</div>';
                $('#wmsSkuDetailsPickingGrid').append(skuRow);
              }
              showHideLotCellForPickingRow();

        }else {
            var getMessage = data.Result.Message;
            alert(getMessage);
        }
        if(getStatusCode.toLocaleLowerCase() == 'success')
            {
                var getTotalPickupQty = data.Result.Table2[0];
                var getPickUpQty = getTotalPickupQty.PickUpQty;

                $('#txtpickupQty').html(getPickUpQty);
            }
      });
      
}

function clearSearchFilterpicking()
{
  $('#ddlPickingsearch').val('All');
  $('#txtPickingvalue').val('');
  getPickingList(filtercol,filterval); 
}
function EditPickUpQty(oid, type, obj) {
    debugger;
    var getId = oid;
    var originalQty = $(obj).attr('data-allocationqty');
    var getType = type;
    var newQty = obj.value;
    var apiPath = wmsApiPath + 'PickUp/EditPickUpQty';
    if(newQty == ''){
        alert("Please enter Quantity..!");
        obj.value = originalQty;
    }
    else{
        var postData = {
            'ID': getId,
            'alocQty': originalQty,
            'NewQty': newQty,
            'UserId': getUserId
        };    
        callHttpUrl(apiPath, postData, function (data) {
            var myJson = data;
            var getStatus = myJson.Status;
            var getStatusCode = myJson.StatusCode;
            if (getStatusCode == 'Success') {
                ispickedit = 'YES';
                obj.value = newQty;
                //$(obj).attr('data-allocationqty', newQty);
            }
            else{
                var errormsg = myJson.Result;
                obj.value = newQty;
                alert(errormsg.Message)
            }
        },function(){
            obj.value = originalQty;
            alert('Server error occured..!');
        });
    }
}
function showHideLotCellForPickingRow(){
    var getTotalLotRowCount = $('#wmsSkuDetailsPickingGrid .wms-srv-grid-row ').length;
    $('#wmsSkuDetailsPickingGrid .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var totalCell = $('#wmsSkuDetailsPickingGrid .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]').length;
        var totalEmptyCell = $('#wmsSkuDetailsPickingGrid .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
  
        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#wmsSkuDetailsPickingGrid .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#wmsSkuDetailsPickingGrid .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#wmsSkuDetailsPickingGrid .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
  }

function NoAccess()
{
    alert("Do not have access to perform operation");
}

function savePickupDetailsAll(){
    debugger;
    var getObject = $('#ddlOrderType').val();
    $('#btnSavePickupDetailsAll').hide();
    var batchId = $('#txtPickup_GroupNo').text().trim();
    var apiPath = wmsApiPath + 'PickUp/FinalSavePickUp';
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "BatchID": batchId,
        "Object": getObject
      };

      callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getResult = data.Result;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            alert('Pickup details saved successfully!!');
            $('#wms-srv-pickedit-popup').hide();
            resetPickUp();
            getBatchList();
        }else{
            var getMessage = getResult.Message;
            $('#btnSavePickupDetailsAll').show();
            alert(getMessage);
        }
      });
}

function getPickEditPlan(ProdId, OrderId){
    getpickupedit(ProdId,OrderId);
    $('#wms-srv-pickupedit-popup').show();
}

function getpickupedit(ProdId,OrderId) {
    debugger;
    var obj = $('#ddlOrderType').val();
    var apiPath = wmsApiPath + 'AllocationPlan/ManualallocationSearch';
    var whereFilterCondition = "";

    var postData = {
        'prdid': ProdId,
        'soid': OrderId,
        'whereFilterCondition': whereFilterCondition
    };

    callHttpUrl(apiPath, postData, function (data) {
        var myJson = data;
        var getStatus = myJson.Status;
        var getStatusCode = myJson.StatusCode;
        if (getStatusCode == 'Success') {
                var getLottable = mBrillWmsSession.getCustomerLottable();
                var breakCustLot = getLottable.split(',');
            
                $('#wms-srv-grid-detail-pickupedit').html('');
                var constructHeaderRow = '<div class="wms-srv-grid-header tdHeadRow" id="header-wrap">';
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Order No</label></div>';
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Location Code</label></div>';
                if(IsPallet == 'YES'){
                    constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Pallet Name</label></div>';
                }
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Batch No</label></div>';
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Closing Balance</label></div>';
                constructHeaderRow += '<div class="wms-srv-grid-cell"><label>PickUp Qty</label></div>';                
                // constructHeaderRow += '<div class="wms-srv-grid-cell"><label>Lottable</label></div>';
                for(var pl=0; pl < breakCustLot.length; pl++){
                    var custLotLabel = breakCustLot[pl];
                    constructHeaderRow = constructHeaderRow + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
                }
                constructHeaderRow += '</div>';

                $('#wms-srv-grid-detail-pickupedit').append(constructHeaderRow);

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
                    constructRow += '<div class="wms-srv-grid-cell">' + getLocationCode + '</div>';
                    if(IsPallet == 'YES'){
                        constructRow += '<div class="wms-srv-grid-cell">' + getPalletName + '</div>';
                    }
                    constructRow += '<div class="wms-srv-grid-cell">' + getBatchNo + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell">' + getClosingBalance + '</div>';
                    constructRow += '<div class="wms-srv-grid-cell"><input type="text" style="width:100%;" value="' + getAllocateQty + '" id="txtAllocationQty_' + getId + '" data-allocationqty="' + getAllocateQty + '" onchange="updatePickUpQty(\'' + getId + '\',\'AllocationQty\', this);" /></div>';                    
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

                    $('#wms-srv-grid-detail-pickupedit').append(constructRow);
                    showHideLotCellForPickingEditRow();
                }
        }
    },function(){
        alert('Server error occured..!');
    });
}

function showHideLotCellForPickingEditRow(){
    var getTotalLotRowCount = $('#wms-srv-grid-detail-pickupedit .wms-srv-grid-row ').length;
    $('#wms-srv-grid-detail-pickupedit .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var totalCell = $('#wms-srv-grid-detail-pickupedit .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]').length;
        var totalEmptyCell = $('#wms-srv-grid-detail-pickupedit .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
  
        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#wms-srv-grid-detail-pickupedit .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#wms-srv-grid-detail-pickupedit .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#wms-srv-grid-detail-pickupedit .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
}

function closePickupEditPopUp(){
    debugger;
    $('#wms-srv-pickupedit-popup').hide();
    var batchid = $('#txtPickup_GroupNo').html();
    checkassignornot(0, batchid, 0);
    //getPickingDetails(0, batchid, 0);
}

function updatePickUpQty(oid, type, obj) {
    debugger;
    var getId = oid;
    var originalQty = $(obj).attr('data-allocationqty');
    var getType = type;
    var newQty = obj.value;
    var apiPath = wmsApiPath + 'PickUp/updatePickup';
    if(newQty == ''){
        alert("Please enter Quantity..!");
        obj.value = originalQty;
    }
    else{
        var postData = {
            'ID': getId,
            'OldQty': originalQty,
            'NewQty': newQty,
            'UserId': getUserId
        };    
        callHttpUrl(apiPath, postData, function (data) {
            var myJson = data;
            var getStatus = myJson.Status;
            var getStatusCode = myJson.StatusCode;
            if (getStatusCode == 'Success') {
                //obj.value = originalQty;
                $(obj).attr('data-allocationqty', newQty);
            }
            else{
                var errormsg = myJson.Result;
                obj.value = originalQty;
                alert(errormsg.Message)
            }
        },function(){
            obj.value = originalQty;
            alert('Server error occured..!');
        });
    }
}