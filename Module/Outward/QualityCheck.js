
var isEdiAdvanceSearchOn = "no";
var isSingleSKUOn = "no";
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId= mBrillWmsSession.getClientId();
var getobject = $('#ddlOrderType').val();
var SKUSearch = "no";
var filtercol = 'All';
var filterval = '0';
var globalActiveTab = 'BatchList';
var searchfilter = 'All';
var CurrentPage = '1';
var getTotalRecords = '20';
var recordLimit = '5';
var getQCRecordLimit = 200;
var hasQualityCheck = false;
var more = true;
var batchn = '';
var pickupNon = '';
var getSoId = '';
var PageObject = '';
var checkSaveBClose = '';
var checkassignstatus = "";
var getISPack = '0';
var getglobalQCID = '0';
// var Object2= $("#OutQualityCheck .wms-srv-count-label").html();

function initQClist() {
    getQCList();
    
}

function openQClist(QcNo, BatchID,getOrderId) {
    debugger;
    openQCBatchList(QcNo, BatchID,getOrderId)
    $('#wms-srv-QClist-popup').show();
    $('#wms-srv-QClist-popup-close').off();
    $('#wms-srv-QClist-popup-close').click(function () {
        $('#wms-srv-QClist-popup').hide();
    });
}

function openQCdetail( QcNo, BatchID, getPickUpNo,statusid,getOrderId, getQCID) {
    debugger;   
    getglobalQCID = getQCID; 
    checkassignornotQC(getPickUpNo, BatchID,getOrderId,getQCID);
    // bindQCDetails(getPickUpNo, BatchID);     
        $('#wms-srv-QCdetail-popup').show();
        $('#wms-srv-QCdetail-popup-close').off();
        $('#wms-srv-QCdetail-popup-close').click(function () {
            ChkCloseButton();
            
            //$('#wms-srv-QCdetail-popup').hide();
        });

        if(statusid == 31 || statusid == 32 ){
            $('#btnSave').show();
        }
        else{
            $('#btnSave').hide();
        }
}

function openviewdetail(oid) {
    $('#wms-srv-viewdetail-popup').show();
    $('#wms-srv-viewdetail-popup-close').off();
    $('#wms-srv-viewdetail-popup-close').click(function () {
        Closegrnbtn();
        
        
    });
}
function ChkCloseButton()
{
    debugger;
    if(checkSaveBClose == "NotSaved")
    {
        if (confirm("If You Close Window without Save Will remove added Record from Quality Check Details.Do you want to close?")) {
            
            var SelectedPickId = document.getElementById("hdnAfterQAId");
            //var apiPath = "http://localhost:50068/api/staging/v1/OutboundQC/QCRemoveSKU";

            var apiPath = wmsApiPath + 'OutboundQC/QCRemoveSKU';
            var postData = {
              "gID": SelectedPickId.value,
              "recordID": getUserId,
              "obj": checkSaveBClose
            };
            callHttpUrl(apiPath, postData, function (data) {
                var getStatusCode = data.StatusCode;
                var getStatus = data.Status;
                if (getStatus == '200' && getStatusCode == 'Success') {
                    checkSaveBClose = "";
                    
                    clearSuggestionList();
                    $('#wms-srv-QCdetail-popup').hide();
                }
              });



            
            
        }
        // else{
        // //checkSaveBClose = "";
        // //$('#wms-srv-QCdetail-popup').hide();
        // }

    }
    else{
        //$('#wms-srv-viewdetail-popup').hide();
        $('#wms-srv-QCdetail-popup').hide();
    }

}
/// Mark as Pack
function MarkPackedQA(){
    debugger;   
    var SelectedPickId = document.getElementById("hdnQAId");
    SelectedPickId.value = "";
    var batchid = "";
	 var getOrderId = "";					
    // alert(getActiveObj);
    $("input[class=cancelpick]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedPickId.value == "") {
                SelectedPickId.value = $(this).attr("id");
                batchid = $(this).attr("data-batchid");
				 getOrderId = $(this).attr("data-Orderid");										  
            }
            else {
                SelectedPickId.value = SelectedPickId.value + "," + $(this).attr("id");
            }
        }
    });

    var ids = SelectedPickId.value.split(',');
    if(SelectedPickId.value == ""){
        alert("Please Select one Quality Check No..!");
    }
    else if(ids.length==1){
        if(confirm("This will Pack all sales orders related to selected Quality Check No..!")){
            
          var apiPath = wmsApiPath + 'PickUp/MarkPacked';
            //var apiPath = "http://localhost:50068/api/staging/v1/PickUp/MarkPacked";
            var postData =
            {
                "CustomerId": getCustomerId,
                "WarehouseId": getWarehouseId,
                "UserId": getUserId,
                "PickUpId": SelectedPickId.value,
                "BatchId": batchid,
                "compid":getCompanyId,
                "OrderId":getOrderId
            };

            callHttpUrl(apiPath, postData, function (data) {
                var getStatus = data.Status;
                var getStatusCode = data.StatusCode;
                var getResult = data.Result;
                if (getStatusCode.toLocaleLowerCase() == 'success') {
                    alert('Mark Packed successfully..!');
                    var filtercol = '0';
                    var filterval = '0';
                  
                 
                    if(getActiveObj == 'Picking')
                    {

                        getPickingList(filtercol,filterval);
                    }
                    else{
                        getQCList(filtercol,filterval);
                    }
                }else{
                    var getMessage = getResult.Message;
                    alert(getMessage);
                }
            });
        }
    }
    else{
        alert("Please Select one Quality Check No..!");
    }
}

function openQCviewdetail(oid) {
    $('#wms-srv-QCviewdetail-popup').show();
    $('#wms-srv-QCviewdetail-popup-close').off();
    $('#wms-srv-QCviewdetail-popup-close').click(function () {
        $('#wms-srv-QCviewdetail-popup').hide();
    });
}

function openQCProductListPopup() {
    getQCSuggestionListPopup();
    //alert('ProductList');
    $('#wms-srv-qc-product-list-popup').show();
    $('#wms-srv-qc-product-list-popup-close').off();
    $('#wms-srv-qc-product-list-popup-close').click(function () {
      $('#wms-srv-qc-product-list-popup').hide();
    });
    //loadSalesProductListPopup(recId);
  }

function getQCList(filtercol, filterval) {
    debugger;
    var apiPath = wmsApiPath + 'OutboundQC/GetQCList';
    var getPageObject = $('#ddlOrderType').val();
    getActiveObj = 'QualityCheck';
   
    if(filtercol != 0 && filterval !=0)
    {
        var filtercol = $('#ddlQCsearch').val();
        var filterval = $('#txtQCvalue').val();
    }



    if (filtercol == '') {
        filtercol = '';
        filterval = '';
    }

    var postData =
    {
        CurrentPage: CurrentPage,
        recordLimit: getQCRecordLimit,
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        UserId: getUserId,
        Object: getPageObject,
        whereFilterCondtion: filtercol,
        SearchValue: filterval,
        ClientId: getClientId
    }

    //QCListGrid
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblgetQCList').html('');
            var myGridList = data.Result;
            //var getTotalRecords = Number(myGridList.QCListResult[0].Dashboard[0].QC) + Number(myGridList.QCListResult[0].Dashboard[0].Packing) + Number(myGridList.QCListResult[0].Dashboard[0].Shipped);
            var getTotalRecords = myGridList.QCListResult[0].Dashboard[0].QC;
            // GET DASHBOARD COUNTS
            var getOutboundOrder = myGridList.QCListResult[0].Dashboard[0].OutboundOrder;
            var getAllocated = myGridList.QCListResult[0].Dashboard[0].Allocated;
            var getPicking = myGridList.QCListResult[0].Dashboard[0].Picking;
            var getQualityCheck = myGridList.QCListResult[0].Dashboard[0].QC;
            var getPacking = myGridList.QCListResult[0].Dashboard[0].Packing;
            var getDispatch = myGridList.QCListResult[0].Dashboard[0].Shipped;

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
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Quality Check No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Quality Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Quality By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px; text-align:center;">Status</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.QCListResult[0].QCList;

            for (var i = 0; i < getGridData.length; i++) {
                var getQCNo = getGridData[i].QualityNo;
                var getBatchNo = getGridData[i].BatchNo;
                var getBatchName = getGridData[i].BatchName;
                var getOrderNo = getGridData[i].OrderNo;
                var getQCDate = getGridData[i].QualityDate;
                var getQCBy = getGridData[i].QualityBy;
                var getStatus = getGridData[i].Status;
                var getStatusId = getGridData[i].StatusID;
                var getOrderType = getGridData[i].OrderType;
                // GRID ROW
                gridTable = gridTable + '<div id="div' + getOrderNo + '" class="wms-srv-grid-row">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'><input type='checkbox' class='cancelpick' value='"+getQCNo+"' data-batchid='"+getBatchNo+"' data-Orderid='"+getOrderNo+"' id='"+getQCNo+"'></div>";        
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getQCNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getQCDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getQCBy + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindQCListStatusControl(getQCNo, getBatchNo, getStatus,getStatusId,getOrderNo) + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#tblgetQCList').html(gridTable);
            $('.wms-srv-grey').attr('onclick', 'return false');
            $(".btnHeadPicking .wms-srv-count-label").html();
            setupGridPagingList('tlbOutboundQCGridPager', CurrentPage, getTotalRecords, getQCList, getQCRecordLimit);
            // BIND DATA GRID
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function clearSearchFilterQC()
{
   $('#ddlQCsearch').val('All');
   $('#txtQCvalue').val('');
   getQCList();
}

// Check Order is assign to user or not.
function checkassignornotQC(pickupId, batchId,getOrderId,getQCID)
{
    debugger;
    // var LocalPath = "http://localhost:50068/api/staging/v1/";
    // var apiPath = LocalPath + 'PickUp/ChkOrderAssignToUser';
    var apiPath = wmsApiPath + 'PickUp/ChkOrderAssignToUser';
   // var checkassignstatus = "";
    var postData=
    {
        "customerid":getCustomerId,
        "userid":getUserId,
        "objectname":"OutwardQC",
        "referenceid":pickupId
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
        }
        else
        {
            checkassignstatus ="notask";
        }    
        bindQCDetails(pickupId, batchId,checkassignstatus,getOrderId,getQCID)
      // getPickingDetails(pickupId, batchId,checkassignstatus);
    }); 
   
}
// function setupGridPagingQCList(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) { //Changed Respective ID 
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

function SearchQCList() {
     var filtercol = $('#ddlQCsearch').val();
    var filterval = $('#txtQCvalue').val();
    if (filterval == '') {
        alert('Please Enter value for filter');
    }
    else {
        getQCList(filtercol, filterval);
    }
}

function QCListDateFilter(){
    debugger;
 var isQualityDate=$('#ddlQCsearch').val();
    if(isQualityDate=='QualityDate'){
        $('#txtQCvalue').datepicker({ dateFormat: 'mm/dd/yy' })
    
    }
    else
{
    $('#txtQCvalue').datepicker('destroy')
}

}

function openQCBatchList(QcNo, BatchID,OrderId) {
    debugger;
     var apiPath = wmsApiPath + 'OutboundQC/GetBatchQCList';
    //var apiPath = "http://localhost:50068/api/staging/v1/OutboundQC/GetBatchQCList";
    postData = {
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        UserId: getUserId,
        BatchID: BatchID,
        OrderId:OrderId
    }

    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            //checkSaveBClose = "Disp"
            $('#batchListQC').html('');
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Batch No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Order No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Ref No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Pick Up No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Pick Up Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Pick Up By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">QC ID</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Status</div>';
            gridTable = gridTable + '</div>';

            $('#batchListQC').html(gridTable)

            var myGridList = data.Result.BatchQCListResult[0]
            for (i = 0; i < myGridList.Table.length; i++) 
            {
                getGroupNo = myGridList.Table[i].GroupNo;
                getPickUpNo = myGridList.Table[i].PickUpNo;
                var pkdate = myGridList.Table[i].PickUpDate.split('T');
                getPickUpDate = pkdate[0];
                getPickUpBy = myGridList.Table[i].PickUpBy
                getStatus = myGridList.Table[i].Status
                getStatusName = myGridList.Table[i].StatusName
                getpickup = myGridList.Table[i].pickup
                getqc = myGridList.Table[i].qc
                getOrderRefNo = myGridList.Table[i].OrderRefNo
                getOrderNo = myGridList.Table[i].OrderQty
                var getOrderId = myGridList.Table[i].OrderId;
                var getQCID = myGridList.Table[i].QCID;

                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderId + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderRefNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPickUpNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPickUpDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPickUpBy + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getQCID + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindBatchQCListStatusControl(QcNo,BatchID,getPickUpNo,getStatus,getStatusName,getOrderId,getQCID) + "</div>";
                gridTable = gridTable + '</div>';
            }
            $('#batchListQC').html(gridTable)
        }
    });
}

function bindBatchQCListStatusControl(ID,BatchID,getPickUpNo,statusid,strStatus,getOrderId,getQCID) {
    debugger;
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';
 
    //Picking = 32
    if(statusid == 31){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "OpenPickEdit" onclick="onclick="openpickedit('+getPickUpNo + ',\'' + BatchID + '\',\'' + 0 + '\');return false;"></div>';
    }
    else if (statusid == 32 || statusid == 28 || statusid == 33 || statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "OpenPickEdit" onclick="openpickedit('+getPickUpNo + ',\'' + BatchID + '\',\'' + 0 + '\');return false;"></div>';
    }
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "OpenPickEdit" onclick="openpickedit('+getPickUpNo + ',\'' + BatchID + '\',\'' + 0 + '\');return false;"></div>';
    }
   
    //QC = 28
    if(statusid == 31){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQCdetail(' + ID + ',' + BatchID + ',' + getPickUpNo + ',' + statusid + ' ,' + getOrderId + ','+  getQCID + ');return false;"></div>';
    }
    else if(statusid == 32 || statusid == 57){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQCdetail(' + ID + ',' + BatchID + ',' + getPickUpNo + ',' + statusid + ',' + getOrderId + ','+  getQCID + ' );return false;"></div>';
    }
    else if(statusid == 28 || statusid == 33 || statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQCdetail(' + ID + ',' + BatchID + ',' + getPickUpNo + ',' + statusid + ',' + getOrderId + ','+  getQCID + ' );return false;"></div>';
    }   
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQCdetail(' + ID + ',' + BatchID + ',' + getPickUpNo + ',' + statusid + ',' + getOrderId + ','+  getQCID + ' );return false;"></div>';
    }
    
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function bindResonCodeDDL() {
    apiPath = wmsApiPath + 'OutboundQC/GetReasonCode';
    postData = {
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        UserId: getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            spnResonCode = [];
            spnID = [];
            $("#ddlResonCodeQC").html('<option value="0">--Select--</option>');
            spnResonCode.push('--Select List--');
            spnID.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var getResonCode = grnContainerSize[i].ReasonCode;
                    var getID = grnContainerSize[i].ID;
                    spnResonCode.push(getResonCode);
                    spnID.push(getID);
                    $("#ddlResonCodeQC").append('<option value = "' + getID + '">' + getResonCode + '</option>');

                }
            }
        }
    });
}

function bindQCDetails(pkid, batchid,ChkAsignQCorder,getOrderId,getQCID){
    debugger;
    batchn = batchid;
    pickupNon = pkid;
    apiPath = wmsApiPath + 'OutboundQC/GetQCDetail'
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "PickUpNo": pkid,
        "BatchID": batchid,
        "SOID":getOrderId,
        "QCIDPara":getQCID
    }

    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            // Bind Header
            var getLottable = mBrillWmsSession.getCustomerLottable();
            var breakCustLot = getLottable.split(',');

            $('#pnlWmsHeadrQCDtls').html('')

            var headerdata = data.Result.Table[0];
            var getBatchIDheader = headerdata.BatchNo;
            var getPickUpNoheader = headerdata.PickUpID;
            var getQCNumbersheader = headerdata.QCNo;
            var getQCDateheader = headerdata.QCDate.split('T');
            var getQCByheader = headerdata.QCBy;
            

            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid">';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Batch No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Order No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Pick Up No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Numbers</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">QC By </div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-row">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getBatchIDheader + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" data-orderdtid = '+ getOrderId + '>' + getOrderId + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPickUpNoheader + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getQCNumbersheader + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getQCDateheader[0] + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getQCByheader + '<input type="hidden" id="hdnAfterQAId" value='+ getQCNumbersheader +'></div>';
            // Commented following line as hidden field moved in above line
            // gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="hidden" id="hdnAfterQAId" value='+ getQCNumbersheader +'></div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';

            $('#pnlWmsHeadrQCDtls').html(gridTable);
            // Bind Header End

            // Bind Details
            var tableData = data.Result.Table1;

            $('#QCSkuAcptinput').html('');
            var gridTable1 = '';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-header">';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">SR.NO.</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">SKU Code</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">SKU Name</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">UOM</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">Allocate Qty</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">Pick Up Qty</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">Accepted Qty</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">Rejected Qty</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">QC Reason</div>';
            //gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell" style="width:200px;">Lottable</div>';
            for(var pl=0; pl < breakCustLot.length; pl++){
                var custLotLabel = breakCustLot[pl];
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
            }
            
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">Action</div>';
            gridTable1 = gridTable1 + '</div>';

            gridTable1 = gridTable1 + '<div class="wms-srv-grid-row wms-srv-grid-add" id="QCSkuAcptinputrow" data-lotgrp="">';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">New</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"><div class="wms-srv-suggestion-holder"><input type="text" data-prefix="CL" data-id="" id="txtoutqcskucode" onkeyup=" getSuggestionList(this)" value="" placeholder="Enter SKU Code" class="wms-srv-grid-cell-input notranslate"><a href="#"title="Open SKU List"class="wms-srv-search-button" onclick="openQCProductListPopup()"><i class="fas fa-search"></i></a></div></div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"><input type="text" value="" id="txtOQCSkuDtlsname" class="wms-srv-grid-cell-input" disabled></div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"><input type="text" value="" id="txtOQCSkuDtlsUom" class="wms-srv-grid-cell-input" disabled></div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"><input type="text" value="" id="txtOQCSkuDtlsAllotQty" class="wms-srv-grid-cell-input" disabled></div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"><input type="text" value="" class="wms-srv-grid-cell-input" disabled id="txtPickupQty"></div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"><input type="text" value="" class="wms-srv-grid-cell-input" id="txtAcptQty" onchange="updateacceptedQty()"></div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"><input type="text" value="0" class="wms-srv-grid-cell-input" disabled id="txtRejectedQty"></div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"><select class="wms-srv-input wms-srv-search-filter" id="ddlResonCodeQC" style="width: 100%;"></select></div>';
            //gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell" style="width:200px;"><div class="lottableControlHolder" id="dvlottable"></div></div>';

            for(var pi=0; pi < breakCustLot.length; pi++){
                var custLotLabel = breakCustLot[pi];
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;"></div>';       
            }
            //gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell" id="AppendsaveButton"><a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" onclick="saveSKuDetails(  )"></i></a></div>';
            
            if(ChkAsignQCorder == "assign" || ChkAsignQCorder == "notask")
            {
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell" id="AppendsaveButton"><a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" onclick="saveSKuDetails(  )"></i></a></div>';
                $("#btnSave"). attr("disabled", false);
                $("#btnSave").fadeIn();               
            }
            else
            {
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell" id="AppendsaveButton"><a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="NoAccess();return false;" style="opacity: 0.3;"><i class="fas fa-check-circle"></i></a></div>';
                $("#btnSave"). attr("disabled", true);
                $("#btnSave").fadeTo(1000, 0.5);            
            }
            gridTable1 = gridTable1 + '</div>';

            for (var i = 0; i < tableData.length; i++) {
                getSrNo = tableData[i].SrNo;
                getstatus = tableData[i].Status;
                getProdID = tableData[i].ProdID;
                getSKUCode = tableData[i].SKUCode;
                getSKUName = tableData[i].SKUName;
                getUOMID = tableData[i].UOMID;
                getUOM = tableData[i].UOM;
                getPickUpQty = tableData[i].PickUpQty;
                getAcceptedQty = tableData[i].AcceptedQty;
                getRejectedQty = tableData[i].RejectedQty;
                getReasonId = tableData[i].ReasonId;
                getReasonCode = tableData[i].ReasonCode;
                getISPack = tableData[i].ISPack;
                getlottable = tableData[i].lottable1+'|'+tableData[i].lottable2+'|'+tableData[i].lottable3;

                var getLottableGroup = [];
                getLottableGroup.push(tableData[i].lottable1);
                getLottableGroup.push(tableData[i].lottable2);
                getLottableGroup.push(tableData[i].lottable3);
                getLottableGroup.push(tableData[i].lottable4);
                getLottableGroup.push(tableData[i].lottable5);
                getLottableGroup.push(tableData[i].lottable6);
                getLottableGroup.push(tableData[i].lottable7);
                getLottableGroup.push(tableData[i].lottable8);
                getLottableGroup.push(tableData[i].lottable9);
                getLottableGroup.push(tableData[i].lottable10);

                //gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-row">';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getSrNo + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getSKUCode + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getSKUName + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getPickUpQty + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getPickUpQty + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getAcceptedQty + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getRejectedQty + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getReasonCode + '</div>';
               // gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getlottable + '</div>';
               for(var pi=0; pi < breakCustLot.length; pi++){
                    var custLotLabel = breakCustLot[pi];
                    var custLotVal = getLottableGroup[pi];
                    if(custLotVal!= null && custLotVal.trim() == '0'){
                    custLotVal = '';
                    }
                    gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
                }
                if ( getISPack == '0')
                {
                    gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell" id="AppendRemoveButton"><a href="#" title="Remove" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="removeGRNSkuItem('+ getProdID +',\'' + getstatus + '\');"></i></a></div>';

                }else
                {
                    gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"></div>';

                }

                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell"></div>';
                //gridTable1 = gridTable1 + '<div class="wms-srv-grid-action"></div>';
                gridTable1 = gridTable1 + '</div>';
            }
            if (gridTable1 == "")
                {
                    getISPack = 0;
                }
            $('#QCSkuAcptinput').append(gridTable1);
            showHideLottableCellForQCRow();
            // Bind Details End
            //checkSaveBClose = "Disp"
        }
        if(getISPack == '0'){
            $('#btnSave').show();
        }
        else{
            $('#btnSave').hide();
        }
    });
    bindResonCodeDDL();
}

function showHideLottableCellForQCRow(){
    var getTotalLotRowCount = $('#QCSkuAcptinput .wms-srv-grid-row ').length;
    $('#QCSkuAcptinput .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var totalCell = $('#QCSkuAcptinput .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]').length;
        var totalEmptyCell = $('#QCSkuAcptinput .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
  
        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#QCSkuAcptinput .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#QCSkuAcptinput .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#QCSkuAcptinput .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
  }

function NoAccess()
{
    alert("Do not have access to perform operation");
}
function removeGRNSkuItem(recordID,getstatus)
{
    debugger;
    if(getstatus == 28 )
    {
        alert('QC Completed SKU can not be Removed');
    }
    else{
    if (confirm('Are you sure you want to remove SKU Item?')) 
    {
        //var apiPath = "http://localhost:50068/api/staging/v1/OutboundQC/QCRemoveSKU";
        var apiPath = wmsApiPath + 'OutboundQC/QCRemoveSKU'
        var SelectedPickId = document.getElementById("hdnAfterQAId");
        //var apiPath = wmsApiPath + 'OutboundQC/QCRemoveSKU';
        var postData = {
          "gID": SelectedPickId.value,
          "recordID": recordID,
          "obj": 'qcremove'
        };
        callHttpUrl(apiPath, postData, function (data) {
            var getStatusCode = data.StatusCode;
            var getStatus = data.Status;
            var getFinalResult =  data.Result.Table[0].Result;
          debugger;
            if ((getStatus == '200' && getStatusCode == 'Success' && getFinalResult == 'success' ) ) {
				var getOrderId2 = $("[data-Orderdtid]").text();
                bindQCDetails(pickupNon,batchn,checkassignstatus,getOrderId2,getglobalQCID);
                clearSuggestionList();
                //$('#wms-srv-QCdetail-popup').hide();
            }
            else{
                alert(getFinalResult);
            }
          });
    }
}
}
//function getQCSkuDetails(getprdcode,lot1,lot2,lot3,getsoidselect) {
function getQCSkuDetails(getprdcode,lotGroup,getsoidselect) {
    debugger;
    //var Lot = lot1+'|'+lot2+'|'+lot3;
    var Lot = lotGroup;
    apiPath = wmsApiPath + 'OutboundQC/GetQCSKUDetail'
    postData =
    {
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        UserId: getUserId,
        PickUpNo: pickupNon,
        BatchID: batchn,
        SKUID: getprdcode,
        Lot:Lot,
        SOID:getsoidselect
    }

    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            var getLottable = mBrillWmsSession.getCustomerLottable();
            var breakCustLot = getLottable.split(',');
            mygridlist = data.Result.Table;
            var getPickUpQty = mygridlist[0].PickUpQty;
            var getProdID = mygridlist[0].ProdID;
            var getSKUCode = mygridlist[0].SKUCode;
            var getSKUName = mygridlist[0].SKUName;
            var getUOM = mygridlist[0].UOM;
            var getUOMID = mygridlist[0].UOMID;

            var getLottableGroup = [];
            getLottableGroup.push(mygridlist[0].lottable1);
            getLottableGroup.push(mygridlist[0].lottable2);
            getLottableGroup.push(mygridlist[0].lottable3);
            getLottableGroup.push(mygridlist[0].lottable4);
            getLottableGroup.push(mygridlist[0].lottable5);
            getLottableGroup.push(mygridlist[0].lottable6);
            getLottableGroup.push(mygridlist[0].lottable7);
            getLottableGroup.push(mygridlist[0].lottable8);
            getLottableGroup.push(mygridlist[0].lottable9);
            getLottableGroup.push(mygridlist[0].lottable10);

            var getlottable1 = mygridlist[0].lottable1;
            var getlottable2 = mygridlist[0].lottable2;
            var getlottable3 = mygridlist[0].lottable3;
            var getlottable4 = mygridlist[0].lottable4;
            var getlottable5 = mygridlist[0].lottable5;
            var getlottable6 = mygridlist[0].lottable6;
            var getlottable7 = mygridlist[0].lottable7;
            var getlottable8 = mygridlist[0].lottable8;
            var getlottable9 = mygridlist[0].lottable9;
            var getlottable10 = mygridlist[0].lottable10;

            $('#txtOQCSkuDtlsname').val(getSKUName);
            $('#txtOQCSkuDtlsUom').val(getUOM);
            $('#txtOQCSkuDtlsAllotQty').val(getPickUpQty);
            $('#txtPickupQty').val(getPickUpQty);
            $('#txtAcptQty').val(getPickUpQty);
           // $('#dvlottable').html(getlottable1+' | '+getlottable2+' | '+getlottable3);
           var setLottableGroup = getlottable1 + ' | ' + getlottable2 + ' | ' + getlottable3 + ' | ' + getlottable4 + ' | ' + getlottable5 + ' | ' + getlottable6 + ' | ' + getlottable7 + ' | ' + getlottable8 + ' | ' + getlottable9 +  ' | ' + getlottable10;
           $('#QCSkuAcptinputrow').attr('data-lotgrp', setLottableGroup);

           for(var pi=0; pi < breakCustLot.length; pi++){
                var custLotLabel = breakCustLot[pi];
                var custLotVal = getLottableGroup[pi];
                if(custLotVal!= null && custLotVal.trim() == '0'){
                    custLotVal = '';
                }
                $('#QCSkuAcptinputrow .gridCellLottable[data-lottype="'+ custLotLabel +'"]').html(custLotVal);
               // skuRow = skuRow + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
            }

            var gridTable = '';

            gridTable = gridTable + '<div class="wms-srv-grid-action">';
            gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" onclick="saveSKuDetails(' + getprdcode + ')"></i></a>';
            gridTable = gridTable + '</div>';
        }
        $('#AppendsaveButton').html(gridTable);
        showHideLottableCellForQCRow();
    });
    bindResonCodeDDL();
}

function updateacceptedQty() {
    debugger;
    var grnqty = $("#txtPickupQty").val();
    var qcqty = $("#txtAcptQty").val();
    if(Number(qcqty)<0){
        alert('accepted qty should not less than zero');
        $("#txtAcptQty").val('');
        $('#txtRejectedQty').val('0');
    }
    else if (Number(qcqty) > Number(grnqty)) {
        alert('Accepted qty should not more than Pick Up qty');
        $("#txtAcptQty").val('');
        $('#txtRejectedQty').val('0');
    }
    else {
        var rejqcqty = Number(grnqty) - Number(qcqty);
        $('#txtRejectedQty').val(rejqcqty);
    }
}

function saveSKuDetails(getProdID) {
    debugger;
    getobject = $('#ddlOrderType').val();
    var getOrderId = $("[data-Orderdtid]").text();
    apiPath = wmsApiPath + 'OutboundQC/SaveQCSKUDetail'
    //apiPath = 'http://localhost:50068/api/staging/v1/OutboundQC/SaveQCSKUDetail';
    //var lot = $('#dvlottable').text().trim().split('|');

    var getLottableGroup = $('#QCSkuAcptinputrow').attr('data-lotgrp');
    var lot = getLottableGroup.trim().split('|');

    if($('#ddlResonCodeQC').val() == 0 && $('#txtRejectedQty').val() > 0){
        alert("Please select reason code..!");
    }
    else if($('#txtoutqcskucode').val() == ""){
        alert("Please enter SKU details..!");   
    }
    else if(Number($('#txtPickupQty').val()) != (Number($('#txtAcptQty').val())  +  Number($('#txtRejectedQty').val()))){
        alert("Sum of Accepted Qty & Rejected Qty should be equal to Pick Up Qty..!");
    }
    else{
        postData =
        {
            CustomerId: getCustomerId,
            WarehouseId: getWarehouseId,
            UserId: getUserId,
            PickUpNo: pickupNon,
            BatchID: batchn,
            Object: getobject,
            Remark: "QC Done",
            ProdId: getProdID,
            lot1: lot[0],
            Lot2: lot[1],
            Lot3: lot[2],
            lot4: lot[3],
            Lot5: lot[4],
            Lot6: lot[5],
            lot7: lot[6],
            Lot8: lot[7],
            Lot9: lot[8],
            lot10: lot[9],
            Qty: $('#txtAcptQty').val(),
            RejectQty: $('#txtRejectedQty').val(),
            ReasonID: $('#ddlResonCodeQC').val(),
            SOID:getOrderId,
            qcidPara:getglobalQCID
        }
        callHttpUrl(apiPath, postData, function (data) {
            isStatus = data.Status
            if (isStatus == 200) {
                $('#txtoutqcskucode').val('')
                $('#txtOQCSkuDtlsname').val('');
                $('#txtOQCSkuDtlsUom').val('');
                $('#txtOQCSkuDtlsAllotQty').val('');
                $('#txtPickupQty').val('');
                $('#txtAcptQty').val('');
                $('#txtRejectedQty').val('');
                $('#dvlottable').html('');
                var myArray = data.Result.Message.split("|");
                if (getglobalQCID == 0)
                    {
                        getglobalQCID = myArray[1];
                    }
                bindQCDetails(pickupNon,batchn,checkassignstatus,getOrderId,getglobalQCID);
                checkSaveBClose = "NotSaved"
            }
            else if (isStatus == 300) {
                var res = data.Result;
                alert(res.Message);
                checkSaveBClose = ""
            }
            else{
                alert("record not saved..!");
                checkSaveBClose = ""
            }
        });
    }
}

function getQCDetailsHeader(QcNo, BatchID, getPickUpNo) {
    debugger;
    apiPath = wmsApiPath + 'OutboundQC/GetQCDetail'
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "PickUpNo": getPickUpNo,
        "BatchID": BatchID
    }

    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            $('#pnlWmsHeadrQCDtls').html('')
            var headerdata = data.Result.QCDetailResult[0]
            var getBatchIDheader = headerdata.BatchNo
            var getPickUpNoheader = headerdata.PickUpNo
            var getQCNumbersheader = headerdata.QCNo
            var getQCDateheader = headerdata.QCDate
            var getQCByheader = headerdata.QCBy
            var currentdate = new Date();
            var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear()

            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid">';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width: 20%;">Batch ID</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width: 20%;">Pick Up No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width: 20%;">QC Numbers</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width: 20%;">QC Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width: 20%;">QC By </div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-row">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getBatchIDheader + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPickUpNoheader + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getQCNumbersheader + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="' + datetime + '" disabled class="wms-srv-grid-cell-input">';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getQCByheader + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';

            $('#pnlWmsHeadrQCDtls').html(gridTable)
            batchn = BatchID;
            pickupNon = getPickUpNo;
            //SOIDNon = 1;
        }
    });
}

function getSuggestionList(wmsSuggestionControl) {
    debugger;
    var getSkey = $(wmsSuggestionControl).val();
    var apiPath = wmsApiPath + 'OutboundQC/GetQCSuggestSKU';
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';
    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "PickUpNo": pickupNon,
        "BatchID": batchn,
        "skey": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
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
                var getId = suggestionList[i].ProdID;
                var getprdcode = suggestionList[i].SKUCode;

                $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getprdcode + '">' + getprdcode + '</div>');
            }
           
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
                debugger;
                var listItemObj = $(this);              
                var getListId = $(this).attr('data-id');
                var getListLabel = $(this).attr('data-label');
                getListLabel = getListLabel.split(':-');
                var lott = getListLabel[1].split('|');
                var lot1 = lott[0].trim();
                var lot2 = lott[1].trim();
                var lot3 = lott[2].trim();
                $('#txtoutqcskucode').val(getListLabel[0].trim());
                $('#txtoutqcskucode').attr('data-id', getListId);
                clearSuggestionList();
                getQCSkuDetails(getListId,lot1,lot2,lot3);
            });
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
                //$('.wms-srv-suggestion-options').off();
            }
        }
    });
}

function getQCSuggestionListPopup() {
    debugger;
    var getSkey = "";
    var apiPath = wmsApiPath + 'OutboundQC/GetQCSuggestSKU';
   var getOrderId = $("[data-Orderdtid]").text();
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "PickUpNo": pickupNon,
        "BatchID": batchn,
        "skey": getSkey,
        "SOID":getOrderId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getLottable = mBrillWmsSession.getCustomerLottable();
        var breakCustLot = getLottable.split(',');

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            var getSkuSuggestion = data.Result;
            var suggestionList = getSkuSuggestion.Table;

           

            $('#pnlQCProductList').html('');
      
    //   $('#pnlQCProductList').append('<div class="wms-srv-grid-header">' +
    //     '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>' +
    //     '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>' +
    //     '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable</div>' +
    //     '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Action</div>' +
    //     '</div>');

    var strQCProdListHead = '';
    strQCProdListHead = strQCProdListHead + '<div class="wms-srv-grid-header">' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>';

        // '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable</div>' +
        for(var pl=0; pl < breakCustLot.length; pl++){
            var custLotLabel = breakCustLot[pl];
            strQCProdListHead = strQCProdListHead + '<div class="wms-srv-grid-cell" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
        }

        strQCProdListHead = strQCProdListHead + '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Action</div>' +
        '</div>';

        $('#pnlQCProductList').append(strQCProdListHead);

        var getProdID = [];
        var getprdcode = [];
        var getSKUName = [];
        var getLottables = [];
        var getSOID = [];

            for (var i = 0; i < suggestionList.length; i++) {
                var rowNum = i + 1;
                getProdID[i] = suggestionList[i].ProdID;
                getprdcode[i] = suggestionList[i].SKUCode;
                getSKUName[i] = suggestionList[i].SKUName;
                getLottables[i] = suggestionList[i].Lottable;
                getSOID[i] = suggestionList[i].SOID;

                /*var strLottable = '';
                for (var l = 0; l < getLottables[l].length; l++) {
                  if (strLottable == '') {
                    strLottable = getLottables[i][l].Name; 
                  } else {
                    strLottable = strLottable + ' | ' + getLottables[i][l].Name;
                  }
                }*/
        
                // $('#pnlQCProductList').append('<div class="wms-srv-grid-row" style="text-align:center">' +
                //   '<div class="wms-srv-grid-cell" data-setgetid='+ getSOID[i] +' >' + getprdcode[i] + '</div>' +
                //   '<div class="wms-srv-grid-cell">' + getSKUName[i] + '</div>' +
                //   '<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>' +
                //   '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
                //   '<a href="#" class="wms-srv-icononly btnAddToProductListField" data-pos="' + i + '"><i class="fas fa-check-circle"></i></a>' +
                //   '</div></div>' +
                //   '</div>');

                var strQCProdList = ''; 
                strQCProdList = strQCProdList + '<div class="wms-srv-grid-row" style="text-align:center">' +
                  '<div class="wms-srv-grid-cell" data-setgetid='+ getSOID[i] +' >' + getprdcode[i] + '</div>' +
                '<div class="wms-srv-grid-cell">' + getSKUName[i] + '</div>';

                //'<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>' +

                var breakLotVal = getLottables[i].split('|');
                for(var pi=0; pi < breakCustLot.length; pi++){
                    var custLotLabel = breakCustLot[pi];
                    var custLotVal = breakLotVal[pi];
                    if(custLotVal!= null && custLotVal.trim() == '0'){
                      custLotVal = '';
                    }
                    strQCProdList = strQCProdList + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
                }

                strQCProdList = strQCProdList + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
                  '<a href="#" class="wms-srv-icononly btnAddToProductListField" data-pos="' + i + '"><i class="fas fa-check-circle"></i></a>' +
                  '</div></div>' +
                '</div>';
                $('#pnlQCProductList').append(strQCProdList);

                //$('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getprdcode + '">' + getprdcode + '</div>');
            }
            
           
            // var ctrlHeight = $(wmsSuggestionControl).height();
            // var pos = $(wmsSuggestionControl).offset();
            // var mouseLeft = Math.round(pos.left);
            // var mouseTop = Math.round(pos.top + ctrlHeight);
            // if (listPostion != null) {
            //     if (listPostion == 'bottom') {
            //         var suggestionListHeight = $('.wms-srv-suggestion-list').height();
            //         mouseTop = Math.round(pos.top - suggestionListHeight);
            //     }
            // }
            // $('.wms-srv-suggestion-list').attr('style', 'left:' + mouseLeft + 'px;top:' + mouseTop + 'px;');
            // $('.wms-srv-suggestion-options').off();

            $('.btnAddToProductListField').click(function () {   
                debugger;
                var getListPos = Number($(this).attr('data-pos'));
                var getsoidselect = getSOID[getListPos];
                $("#txtoutqcskucode").val(getprdcode[getListPos])
                //var a = $('#dvlottable').text().trim();
                 //getLottables.split('|');

                
                // var lotta = getLottables[getListPos].split('|');
   
                // var Lottable1 = lotta[0].trim();
                // var Lottable2 = lotta[1].trim();
                // var Lottable3 = lotta[2].trim();
                // var Lottable4 = lotta[3].trim();
                // var Lottable5 = lotta[4].trim();
                // var Lottable6 = lotta[5].trim();
                // var Lottable7 = lotta[6].trim();
                // var Lottable8 = lotta[7].trim();
                // var Lottable9 = lotta[8].trim();
                // var Lottable10 = lotta[9].trim();
                  
               // getQCSkuDetails(getProdID[getListPos],Lottable1,Lottable2,Lottable3,getsoidselect);
               getQCSkuDetails(getProdID[getListPos],getLottables[getListPos],getsoidselect);

                $("#wms-srv-qc-product-list-popup").hide();
            });
            
        }
    });
}

function finalSave() {
    apiPath = wmsApiPath + 'OutboundQC/FinalSaveQCDetail'
    var getOrderId = $("[data-Orderdtid]").text();
    postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "PickUpNo": pickupNon,
        "Object": getobject,
        "BatchID": batchn,
        "SOID":getOrderId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200'){
            $('#wms-srv-QCdetail-popup').hide();
            $('#wms-srv-QClist-popup').hide();
            getBatchList('','');
            checkSaveBClose = "Saved"
        }
        else if(getStatus == '300'){
            var res = data.Result;
            alert(res.Message);
            checkSaveBClose = ""
        }
        else{
            alert("Record not saved..!");
        }
    });
}

function getQCDetailsLIstSku() {
    debugger;
    apiPath = wmsApiPath + 'OutboundQC/GetQCDetail'
    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "PickUpNo": pickupNon,
        "BatchID": batchn
    }

    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            tableData = data.Result.QCDetailResult[0].Table;
            var gridTable1 = '';
            for (i = 0; i < tableData.length; i++) {

                getBatchNO = tableData[i].BatchNO
                getPickUpID = tableData[i].PickUpID
                getQCNo = tableData[i].QCNo
                getQCDate = tableData[i].QCDate
                getQCBy = tableData[i].QCBy
                getSrNo = tableData[i].SrNo
                getProdID = tableData[i].ProdID
                getSKUCode = tableData[i].SKUCode
                getSKUName = tableData[i].SKUName
                getUOMID = tableData[i].UOMID
                getUOM = tableData[i].UOM
                getPickUpQty = tableData[i].PickUpQty
                getAcceptedQty = tableData[i].AcceptedQty
                getRejectedQty = tableData[i].RejectedQty
                getReasonId = tableData[i].ReasonId
                getReasonCode = tableData[i].ReasonCode
                getlottable1 = tableData[i].lottable1
                getlottable2 = tableData[i].lottable2
                getlottable3 = tableData[i].lottable3

                gridTable1 = gridTable1 + '<div class="wms-srv-grid-row wms-srv-grid-add">';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + (i + 1) + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getSKUCode + '</div>';
                gridTable1 = gridTable1 + ' <div class="wms-srv-grid-cell">' + getSKUName + '</div>';
                gridTable1 = gridTable1 + ' <div class="wms-srv-grid-cell">' + getUOM + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getPickUpQty + '</div>';
                gridTable1 = gridTable1 + ' <div class="wms-srv-grid-cell">' + getPickUpQty + '</div>';
                gridTable1 = gridTable1 + ' <div class="wms-srv-grid-cell">' + getAcceptedQty + '</div>';
                gridTable1 = gridTable1 + ' <div class="wms-srv-grid-cell">' + getRejectedQty + '</div>';
                gridTable1 = gridTable1 + ' <div class="wms-srv-grid-cell">' + getReasonCode + '</div>';
                gridTable1 = gridTable1 + ' <div class="wms-srv-grid-cell"><input type="text" style=" width:75Px;display:inline;margin:2px ;" value="' + getlottable1 + '" disabled><input type="text" style=" width:75Px;display:inline;margin:2px ;" value="' + getlottable2 + '" disabled><input type="text" style=" width:75Px;display:inline;margin:2px ;" value="' + getlottable3 + '" disabled></div>';
                gridTable1 = gridTable1 + ' <div class="wms-srv-grid-cell">';
                gridTable1 = gridTable1 + '   <div class="wms-srv-grid-action">';

                gridTable1 = gridTable1 + '</div>';
                gridTable1 = gridTable1 + '</div>';
                gridTable1 = gridTable1 + '</div>';

            }
            $('#QCSkuAcptinput').append(gridTable1)
        }
    });
}

function bindQCListStatusControl(ID, BatchId, strStatus,statusid,OrderId){
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';
    
    //QC = 28
    if(statusid == 31){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+OrderId+'\');return false;"></div>';
    }
    else if(statusid == 32 || statusid == 57){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+OrderId+'\');return false;"></div>';
    }
    else if(statusid == 28 || statusid == 33 || statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "QC Detail" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+OrderId+'\');return false;"></div>';
    }   
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openQClist(' + 0 + ',\'' + BatchId + '\',\''+OrderId+'\');return false;"></div>';
    }
    
    //Packing = 33
    if(statusid == 31 || statusid == 32 || statusid == 57){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openstaginglist(' + ID + ',\'' + BatchId + '\');return false;"></div>';
    }
    else if(statusid == 28){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-red" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstaginglist(' + ID + ',\'' + BatchId + '\');return false;"></div>';
    }
    else if(statusid == 33 || statusid == 59){
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-green" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Packing Detail" onclick="openstaginglist(' + ID + ',\'' + BatchId + '\');return false;"></div>';
    }
    else{
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openstaginglist(' + ID + ',\'' + BatchId + '\');return false;"></div>';
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



