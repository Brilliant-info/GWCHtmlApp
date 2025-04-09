var getUniqueID = '0';
var strCurrentPage = 1;
var globalRecevingObjectType = '';
var globalActiveTab = 'ExpectedReceipt';
var globalDockIdforlive = '';
var gblobalDocNameforlive = '';
var getUserName = mBrillWmsSession.getUserName();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId = mBrillWmsSession.getClientId();
var getCompanyID = mBrillWmsSession.getCompanyId();
wmsLoadLayout(function () {
    //alert("Hello World!!");
    $('#pnlTransload').show();
   loadTransloadList(strCurrentPage);
   Transload();
});

function Transload() {
    // $('#btnAddTransload').click(function () {
    //     $('#wms-srv-popup').show();
    // });
    $('.dashboardCell').click(function () {
        debugger;
        $('.dashboardCell').removeClass('appointmentActiveTab');
        $(this).addClass('appointmentActiveTab');
        var tabParam = $(this).attr('data-id');
        globalActiveTab = tabParam;
        loadTransloadList('1');
    });
    $('.btnAddNewTransloadOrder').mouseup(function () {
        openAddNewPopup();
    });

    $('.btnDispatch').click(function () {
        $('#wms-srv-dispatch-popup').show();
    });

    $('#wms-srv-dispatch-popup-close').click(function () {
        $('#wms-srv-dispatch-popup').hide();
    });

    $('.btnStaging').click(function () {
        $('#wms-srv-staging-popup').show();
    });

    $('#wms-srv-staging-popup-close').click(function () {
        $('#wms-srv-staging-popup').hide();
    });

    $('.btnStagingLive').click(function () {
        $('#wms-srv-staging-live-popup').show();
    });

    $('#wms-srv-staging-live-popup-close').click(function () {
        $('#wms-srv-staging-live-popup').hide();
    });

    $('.btnDocument').click(function () {
        //$('#wms-srv-document-popup').show();
        openDocument();
      
    });

    $('#wms-srv-document-popup-close').click(function () {
        $('#wms-srv-document-popup').hide();
    });

    $('.btnCommunication').click(function () {
        $('#wms-srv-communication-popup').show();
    });

    $('#wms-srv-communication-popup-close').click(function () {
        $('#wms-srv-communication-popup').hide();
    });

	$('.btn3pl').click(function () {
        $('#wms-srv-3pl-popup').show();
    });

    $('#wms-srv-3pl-popup-close').click(function () {
        $('#wms-srv-3pl-popup').hide();
    });

    $('.btnOrderAdjustment').click(function () {
        $('#wms-srv-orderadjustment-popup').show();

    });

    $('#wms-srv-orderadjustment-popup-close').click(function () {
        $('#wms-srv-orderadjustment-popup').hide();
    });
   
    $('#saveDocData').click(function () {
        saveDocument();
    });

    
    
   // transloadList();
    $('#wms-srv-communication-popup .wms-srv-richtexteditor textarea').Editor();
}

// START - data binding for grid 30-06-2022
//Transload Index Page Binding Function

function searchTransloadList() {
    var getSearchFilter = $('#txtGridSearchFilter').val();
    var getSearchValue = $('#txtGridSearchValue').val();

    if (getSearchFilter == '0') {
        alert('Select search filter!!');
    } else if (getSearchValue == '') {
        alert('Enter search text!!');
    } else {
        globalCurrentPage = '1';
        loadTransloadList(globalCurrentPage);
    }
    
}

function loadTransloadList(strCurrentPage) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/GetAll';
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCustomerId = $("#ddlcustomer").val();   
    // var getUserId = $("#hdnUserID").val();
    var getSearchFilter = $('#txtGridSearchFilter').val();
    var getSearchValue = $('#txtGridSearchValue').val();

    if (getSearchFilter == '' || getSearchFilter == '0') {
        getSearchFilter = '-';
    }
    if (getSearchValue == '') {
        getSearchValue = '-';
    }
    var postData = {
        recordlimit: "10",
        CurrentPage: strCurrentPage,
        CompanyId: getCompanyID,
        WhId: getWarehouseID,
        CustId: getCustomerId,
        UserId: getUserId,
        ActiveTab: globalActiveTab,
        SerchPara: getSearchFilter,
        SerchVal: getSearchValue
    };
    $('#tlbTansloadGrid').html('');
    var gridTable = '';
    // GRID HEADER
    gridTable = gridTable + '<div class="wms-srv-grid-header">';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" value="ID"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Expected Receipt No</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Warehouse Code</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Date</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Customer Code</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Container Id</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Quantity</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Reference No</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px;">Status</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
    gridTable = gridTable + '</div>';
                // GRID HEADER
    $('#tlbTansloadGrid').html(gridTable);

    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
          
            var myGridList = data.Result;

            if (myGridList.Table.length > 0) {
                // var getTotalRecords = myGridList.InboundResult[0].TotalRecords;
                //var getPutAway = myGridList.InboundResult[0].Dashboard[0].PutAway;
                var getExpectedReceipt = myGridList.Table[0].Expected;
                var getReceiving = myGridList.Table[0].Receving;
                var getPartialReceving = myGridList.Table[0].PartialReceving;
                var getPartialStaging = myGridList.Table[0].PartialStaging;
                var getStaging = myGridList.Table[0].Staging;
                var getTotalRecords = myGridList.Table[0].TotalRecord;

                // GET DASHBOARD COUNTS                       

                $('#txtExpectedRecpt').html(getExpectedReceipt);
                $('#txtReceving').html(getReceiving);
                $('#txtPartialStaging').html(getPartialStaging);
                $('#txtPartialReceving').html(getPartialReceving);
                $('#txtStaging').html(getStaging);
                // GET DASHBOARD COUNTS

                // BIND DATA GRID

                var getGridData = myGridList.Table;
                for (var i = 0; i < getGridData.length; i++) {
                    var getListId = getGridData[i].Id;
                    var getExpectedReceiptNo = getGridData[i].ExpReceiptNo;
                    getUniqueID = getExpectedReceiptNo;
                    var getWarehouseCode = getGridData[i].WCode;
                    var getOrderDate = formatCustomDate(getGridData[i].Orderdate);
                    var getCustomerCode = getGridData[i].CustCode;
                    var getContainerId = getGridData[i].ContainId;
                    var getQuantity = getGridData[i].OrderQty;
                    var getReferenceNo = getGridData[i].ReferenceNo;
                    var getOrdStatus = getGridData[i].Orderstatus;
                    var getTransloadOrderType = getGridData[i].OrderType;

                    var gridTableBody = '';
                    // GRID ROW
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-row">';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell"><input type="checkbox" value="ID"></div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + getExpectedReceiptNo + '</div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + getWarehouseCode + '</div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + getOrderDate + '</div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + getCustomerCode + '</div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + getContainerId + '</div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + getQuantity + '</div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + getReferenceNo + '</div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + bindStatusControl(getExpectedReceiptNo, getOrdStatus, getTransloadOrderType) + '</div>';
                    gridTableBody = gridTableBody + '<div class="wms-srv-grid-cell">' + bindActionControl(getExpectedReceiptNo, getTransloadOrderType, getOrdStatus) + '</div>';
                    gridTableBody = gridTableBody + '</div>';
                    $('#tlbTansloadGrid').append(gridTableBody);
                }
                // GRID ROW
                // Upload Data in the HTML
               
                $('#tlbTansloadGrid .wms-srv-gray').prop('disabled', 'disabled');
                $('#tlbTansloadGrid .wms-srv-gray').removeAttr('onclick');

               /* $('#tlbTansloadGrid').html(gridTableBody);*/
               $('#tlbTansloadGrid .wms-srv-gray').attr('onclick', 'return false;');
          
               setupGridPagingList('gridTransloadListHolder', strCurrentPage, getTotalRecords, loadTransloadList);
                // Upload Data in the HTML
                // setupGridPaging(getTotalRecords);
                //setupGridPaging('tlbInboundGridPager', getCurrentPage, getTotalRecords, loadInboundList);
                //  setupGridPaging('tlbInboundGridPager', getCurrentPage, getTotalRecords, function () {
                //       $('#tlbInboundGridPager .wms-srv-pager-links a').off();
                //       $('#tlbInboundGridPager .wms-srv-pager-links a').click(function () {
                //           var getDataPage = $(this).attr('data-page');
                //           loadInboundList(getDataPage);
                //       });
                //   });
                // alert(getGridData.length);
                // BIND DATA GRID
            }
            //else
            //{
            //    $('#tlbInboundGrid').html('');
            //}
        } else {
            alert('Unable to connect Server!!');
        }
    });
}
//setupGridPaging('tlbInboundGridPager', getCurrentPage, getTotalRecords, loadInboundList);
// function setupGridPaging(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) {
//     var global_max_record_count = 10;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 10) + 1;
//     var recordTo = recordFrom + 9;
//     var totalRecord = Number(strTotalRecords);
//     var pagerLinks = '';

//     /* var breakDataRange = dataLine.split(',');
//      for (var dr = 0; dr < breakDataRange.length; dr++) {
//          var dataItem = breakDataRange[dr].split(":");
//          var dataName = dataItem[0].trim();
//          var dataValue = Number(dataItem[1].trim());
//          if (dataName == 'pageno') {
//              pageNo = dataValue;
//          } else if (dataName == 'start') {
//              recordFrom = dataValue;
//          } else if (dataName == 'to') {
//              recordTo = dataValue;
//          } else if (dataName == 'total') {
//              totalRecord = dataValue;
//          }
//      }
     
//      if (placeHolderId == undefined) {
//          placeHolderId = 'pnlWmsDetail';
//      }
//      */

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

//     $('#tlbInboundGridPager .wms-srv-pager-links a').off();
//     $('#tlbInboundGridPager .wms-srv-pager-links a').click(function () {
//         var getDataPage = $(this).attr('data-page');
//         if (callBackFunction != null) {
//             callBackFunction(getDataPage);
//         }
//     });


//     $('#tlbParcelGridPager a.wms-srv-pager-go').off();
//     $('#tlbParcelGridPager a.wms-srv-pager-go').click(function () {
//         var getDataPage = $('#tlbParcelGridPager input[name="txtGridPageNo"]').val();
//         if (Number(getDataPage) < 1) {
//             alert('Please enter valid page number!!');
//         } else if (Number(getDataPage) > Number(lastPage)) {
//             alert('Page number should not be greater than ' + lastPage + ' !!');
//         } else {
//             if (callBackFunction != null) {
//                 callBackFunction(getDataPage, globalActiveTab, searchfilter, searchvalue);
//             }
//         }

//     });
//     /* if (callBackFunction != null) {
//          callBackFunction();
//      }*/
// }
//Transload Index Page Binding Function

function viewPoOrder() {
    debugger;
    $('#wms-srv-popup').show();   
    $('#wms-srv-popup-close').click(function () {
        $('#wms-srv-popup').off();
        $('#wms-srv-popup').hide();
        loadTransloadList(strCurrentPage);
    });



    $('#wms-srv-orderadjustment-popup-close').off();
    $('#wms-srv-orderadjustment-popup-close').click(function () {
        $('#wms-srv-orderadjustment-popup').hide();
    });


}  
            
function receivingLiveDetailsSaveing() {
    debugger;
    var apiPath = wmsApiPath + 'Transload/TranloadSaveRecDT';
    //var apiPath = 'http://localhost/TransloadWebServices/api/V2/Savedocument';
    //var apiPath = wmsApiPath + 'Savedocument';
    var getDocumentTitle = $('#txtDocTitle').val();
    var getDescription = $('#txtDocDescription').val();
    var getDocumentKeyWords = $('#txtDocKeyWords').val();
    var getDocumentType = $('#txtDocDocumentType').val();
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    //var getUserId = $("#hdnUserID").val();

    var postData = 
    {
	"HeadId": "15",
	"StagingId": "0",
	"DockId": "12",
	"PalletId": "1",
    "PalletType":"2",
	"Noofcarton": "1" ,
    "TotWeight": "2" ,
    "Remark": "Receving Details" ,
    "CreatedBy": "15" 
    };

    callHttpUrl(apiPath, postData, function (result)
    {
        // After success
        var getCode = result.Code;
        var getMessage = result.Message;
        var isSuccess = result.Success;
        var docRow = '';
        if (isSuccess == true) {
            var getResponse = result.Response;
            var myJsonObj = JSON.parse(getResponse);
            openDocument(strOrderId);
        } else {
            alert('Failed to save document');
        }
        // After success
    });
}

function SaveLiveDetails() {
    debugger;
    var apiPath = wmsApiPath + 'Transload/TranloadSaveRecDT';
    //var apiPath = 'http://localhost/TransloadWebServices/api/V2/Savedocument';
    //var apiPath = wmsApiPath + 'Savedocument';
    var getDockLocation = $("#txtContainerID").val();
    var getPallet = $("#txtPallet").val();
    var getPalletType = $("#txtPalletType").val();
    var getNoOfCarton = $("#txtNoofcarton").val();
    var getWeight = $("#txtTotWeight").val();
    var getRemark = $("#txtStgRemark").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();

    var postData = {
        "HeadId": "15",
        "StagingId": "12",
        "DockId": getDockLocation,
        "PalletId": getPallet,
        "PalletType": getPalletType,
        "Noofcarton": getNoOfCarton,
        "TotWeight": getWeight,
        "Remark": getRemark,
        "CreatedBy": "15"
    };
    callHttpUrl(apiPath, postData, function (result) {
        // After success
        var getCode = result.Code;
        var getMessage = result.Message;
        var isSuccess = result.Success;
        var docRow = '';
        if (isSuccess == true)
        {
            var getResponse = result.Response;
            var myJsonObj = JSON.parse(getResponse);
            receivingStagingDetails(strOrderId);
        } else {
            alert('Failed to save document');
        }
        // After success
    });
}

// function RemoveReceivingLiveDetails() {
//     debugger;
//     var apiPath = wmsApiPath + '/Transload/TranloadRemove_RecDT';
//     var getDockLocation = $("#txtContainerID").val();
//     var getPallet = $("#txtPallet").val();
//     var getPalletType = $("#txtPalletType").val();
//     var getNoOfCarton = $("#txtNoofcarton").val();
//     var getWeight = $("#txtTotWeight").val();
//     var getRemark = $("#txtStgRemark").val();
//     // var getCompanyID = $('#hdnCompanyID').val();
//     // var getUserId = $("#hdnUserID").val();

//     var postData = {
//         "WarehouseId": getWarehouseId,
//         "CustomerId": getCustomerId,
//         "CompanyID": getCompanyID,
//         "UserId": getUserId,
//         "TranloadDTId": "4"
//     };
//     callHttpUrl(apiPath, postData, function (data)
//     {
//         // After success
       
//         var getStatus = data.StatusCode;
//         var docRow = '';
//         if (getStatus == 'Success')
//         {
//             var getResponse = data.Response;
//             var myJsonObj = JSON.parse(getResponse);
//             receivingStagingDetails(strOrderId);
//         } else {
//             alert('Failed to delete document');
//         }
//         // After success
//     });
// }

// Popup Head Save Code
//Receiving Staging Details Function Popup

function TranloadRecvDataStagingorder(strOrderId) {
    debugger;
    var apiPath = wmsApiPath + 'Transload/TranloadSaveRecDT';
    var getexpectedReceiptNo = $("#txtContainer").val();
    var getWarehouseCode = $("#ddlUOM").val();
    var getOrderDate = $('#txtCartonQty').val();
    var getCustomerCode = $("#txtGrossWeight").val();
    var getContainerCode = $("#ddlwarehouse").val();
    var getQuantity = $("#ddlwarehouse").val();
    var getReferenceNo = $("#ddlwarehouse").val();
    var getStatus = $("#ddlwarehouse").val();
    var getAction = $("#ddlwarehouse").val();    
    var getCompanyID = $('#hdnCompanyID').val();
    //var getUserId = $("#hdnUserID").val();
    //(above id change is pending )
    //receiptNo
    //ReceiptDate
    //CreatedBy
    //Date
    //Status
    //Remark
    //Action
    var postData = {
        //"HeadId": strOrderId,
        "HeadId": "1",
        "StagingId": "12",
        "DockId": "0",
        "PalletId": "1",
        "PalletType": "2",
        "Noofcarton": "1",
        "TotWeight": "2",
        "Remark": "Receving Details",
        "CreatedBy": "15"
    };
    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var getResult = data.Response;
            // var myGridList = JSON.parse(getResult);

            alert(getResult);
            // alert(getGridData.length);
            // BIND DATA GRID

        } else {
            alert('Unable to connect Server!!');
        }
    });
}

function changeOrderType(strOrderId, transloadrderType ) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/ChangeOrdertype';
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCustomerId = $("#ddlcustomer").val();
    // var getUserId = $("#hdnUserID").val();
    var postData = {
        "WhId": getWarehouseID,
        "CustId": getCustomerId,
        "CompanyID": getCompanyID,
        "UserId": getUserId,
        "OrderId": strOrderId,
        "OrderType": transloadrderType
    };
    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success'){
            var getResult = data.Response;
            var getMessage = data.Message;
            //var myGridList = JSON.parse(getResult);
           
            loadTransloadList(globalCurrentPage);
        }
    });
}


/*abhijit sir function start*/
function bindStatusControl(orderId, strStatus, transloadOrderType) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';
    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getStatusColor('Expected Receipt', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" onclick="RequestDetailsHead(' + orderId+');"></div>';
    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Receiving', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '"onclick="showRecevingPopup(' + orderId + ', \'' + transloadOrderType +'\');"></div>';
    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Staging', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '"onclick="showDispatchDetails(' + orderId + ');"></div>';
  //  htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Put Away', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '"></div>';
  //  htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Receiving', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '"onclick="RecvStagingHead(' + orderId + ');"></div>';

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function getStatusColor(dataFor, currentStatus) {
    var myColor = 'gray';

    if (dataFor == 'Expected Receipt') {
        if (currentStatus == 'Expected Receipt' || currentStatus == 'Receiving' || currentStatus == 'Partial Receving' || currentStatus == 'Partial Staging' || currentStatus == 'Staging') {
            myColor = 'green';
        }
    } else if (dataFor == 'Receiving') {
        if (currentStatus == 'Receiving' || currentStatus == 'Partial Staging' || currentStatus == 'Staging') {
            myColor = 'green';
        } else if (currentStatus == 'Partial Receving') {
            myColor = 'partial';
        } else if (currentStatus == 'Expected Receipt') {
            myColor = 'red';
        }

    } else if (dataFor == 'Staging') {
        if (currentStatus == 'Staging') {
            myColor = 'green';
        } else if (currentStatus == 'Partial Staging') {
            myColor = 'partial';
        } else if (currentStatus == 'Receiving' || currentStatus == 'Partial Receving') {
            myColor = 'red';
        }
    }
    return myColor;
}
  
function bindActionControl(orderId, transloadrderType, orderStatus) {
    var htmlControl = '';
    var orderTypeIcon = 'fas fa-exchange-alt';
    if (transloadrderType == 'Live') {
        orderTypeIcon = 'fas fa-exchange-alt';
    } else {
        orderTypeIcon = 'fas fa-truck-loading';
    }
    htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
    if (globalActiveTab == 'ExpectedReceipt') {
        htmlControl = htmlControl + '<a href="#" title="' + transloadrderType + '" data-prefix="APP" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="changeOrderType(' + orderId + ',\'' + transloadrderType + '\');"><i class="' + orderTypeIcon + '"></i></a>';
    } else {
        htmlControl = htmlControl + '<a href="#" title="' + transloadrderType + '" data-prefix="APP" data-orderid=0 class="wms-srv-icononly" onClick="return false;" style="opacity:0.2;"><i class="' + orderTypeIcon + '" ></i></a>';
     }
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    //htmlControl = htmlControl + '<a href="#" title="Approval" data-prefix="APP" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openApproval(' + orderId + ');"><i class="fas fa-user-check"></i></a>';
    //htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    //if (transloadrderType == 'Staging' && (orderStatus != 'Expected Receipt' && orderStatus != 'Staging')) {
    //if (globalActiveTab != 'ExpectedReceipt')  {
    if (globalActiveTab == 'Staging') {
       // htmlControl = htmlControl + '<a href="#" title="Order Adjustment" data-prefix="ORDADJ" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openOrderAdjustment(' + orderId + ');"><i class="fas fa-edit"></i></a>';
       htmlControl = htmlControl + '<a href="#" title="Order Adjustment" data-prefix="ORDADJ" data-orderid="0" class="wms-srv-icononly" onClick="return false;"><i class="fas fa-edit" style="opacity:0.2;"></i></a>';
    } else {
        htmlControl = htmlControl + '<a href="#" title="Order Adjustment" data-prefix="ORDADJ" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openOrderAdjustment(' + orderId + ');"><i class="fas fa-edit"></i></a>';
        //htmlControl = htmlControl + '<a href="#" title="Order Adjustment" data-prefix="ORDADJ" data-orderid="0" class="wms-srv-icononly" onClick="return false;"><i class="fas fa-edit" style="opacity:0.2;"></i></a>';
    }
   /* if (globalActiveTab == 'Staging') {
        //htmlControl = htmlControl + '<a href="#" title="Order Adjustment" data-prefix="ORDADJ" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openOrderAdjustment(' + orderId + ');"><i class="fas fa-edit"></i></a>';
        htmlControl = htmlControl + '<a href="#" title="Order Adjustment" data-prefix="ORDADJ" data-orderid="0" class="wms-srv-icononly" onClick="return false;"><i class="fas fa-edit" style="opacity:0.2;"></i></a>';
    }*/
   
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="Document" data-prefix="DOC" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openDocument(' + orderId + ');"><i class="fas fa-file-alt"></i></a>';

    /*htmlControl = htmlControl + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="RequestDetails(' + orderId + ');""><i class="fas fa-check-circle"></i></a> ';*/

     htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="Communication" data-prefix="CMM" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openCommunication(' + orderId + ');"><i class="fas fa-envelope"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="Transport" data-prefix="TRN" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openTransport(' + orderId + ', \'self\');"><i class="fas fa-truck-moving"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="Staging Transport Details" data-prefix="TRN" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openDispatchTransport(' + orderId + ', \'self\');"><i class="fas fa-truck-moving fa-flip-horizontal"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';

    htmlControl = htmlControl + '<a href="#" title="3PL" data-prefix="3PL" data-orderid="' + orderId + '" class="wms-srv-icononly btn3pl" onClick="open3PL(' + orderId + ');"><i class="fa fa-receipt"></i></a>';
    htmlControl = htmlControl + ' </div>';

    return htmlControl;
}

// END - data binding for grid 30-06-2022

$('.btnRecevingTransport').click(function () {
    $('#wms-srv-transport-popup').show();
});

$('#wms-srv-transport-popup-close').click(function () {
    $('#wms-srv-transport-popup').hide();
});

$('.btnDispatchTransport').click(function () {
    $('#wms-srv-disptransport-popup').show();
});

$('#wms-srv-disptransport-popup-close').click(function () {
    $('#wms-srv-disptransport-popup').hide();
});

// function saveTransport() {
//    var getOrderId = $('#btnSaveRecevingTransport').attr('data-id');
// }




//popup Function for show and hide
function openTransport(strOrderId) {
    debugger;
   $('#btnSaveRecevingTransport').attr('data-id', strOrderId);
   $('#wms-srv-transport-popup').show();
   $('#wms-srv-transport-popup-close').click(function () {
       $('#wms-srv-transport-popup').hide();
   });
}

//Transport Detail
var objectOpenType_TransportDetails = 'self';

function openTransport(strOrderId, openObjType, orderType) {
    debugger;
    objectOpenType_TransportDetails = openObjType;
    createObjectHead('pnlHeadGrnTransport', strOrderId, function () {
        if (objectOpenType_TransportDetails != 'self') {
            $('#btnSaveRecevingTransport span').html('Next');
        }
         else 
         {
             receivingStagingTransloadDetails
             $('#btnSaveRecevingTransport span').html('Save');

         }
    });
        $('#btnSaveRecevingTransport').attr('data-id', strOrderId);
        $('#wms-srv-transport-popup').attr('data-id', strOrderId);
        GetTransportDetails(strOrderId);
        
}



/*function RequestDetailsIdData(strOrderId) {
    $('#btnSaveReqDetails').attr('data-id', strOrderId);
    $('#wms-srv-transport-popup').show();
    $('#wms-srv-transport-popup-close').click(function () {
        $('#wms-srv-transport-popup').hide();
    });
}
*/

// function openDispatchTransport(strOrderId) {
//     $('#wms-srv-disptransport-popup').show();
//     $('#wms-srv-disptransport-popup-close').click(function () {
//         $('#wms-srv-disptransport-popup').hide();
//     });
// } 

function openOrderAdjustment(strOrderId) {
    $('#wms-srv-orderadjustment-popup').show();
    $('#wms-srv-orderadjustment-popup-close').off();
    $('#wms-srv-orderadjustment-popup-close').click(function () {
        $('#wms-srv-orderadjustment-popup').hide();
    });
}

function StagingDetails() {
    $('#wms-srv-dispatch-popup').show();
    $('#wms-srv-dispatch-popup-close').off();
    $('#wms-srv-dispatch-popup-close').click(function () {
        $('#wms-srv-dispatch-popup').hide();
    });
}

function OrderAdjsutmentPopup() {
    $('#wms-srv-popup').show();
    $('#wms-srv-orderadjustment-popup-close').off();
    $('#wms-srv-orderadjustment-popup-close').click(function () {
        $('#wms-srv-orderadjustment-popup').hide();
    });
}

function showRecevingPopup(strOrderId, orderType) {
    debugger;
    globalRecevingObjectType = orderType;

    openTransport(strOrderId, 'recevingStatus', orderType);

    //  if (orderType == 'Live') {
    //    receivingStagingLiveDetails(strOrderId);
    // } else {
    //     receivingStagingTransloadDetails(strOrderId);
    // } 
}

function RecevingStagingPopup() {

}

function createObjectHead(placeHolder, strOrderId, callBackFunction) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/TLHeadDetail';
    // var apiPath = wmsApiPath + 'document';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var postData = {
        CompanyId: getCompanyID,
        custId: getCustomerId,
        whId: getWarehouseID,
        userId: getUserId,
        OrderId: strOrderId
    };

    callHttpUrl(apiPath, postData, function (result) {
        // After success
        var getCode = result.StatusCode;
        var getMessage = result.Message;
        var isSuccess = result.Success;
        if (getCode == 'Success') {
            var getResponse = result.Result;
            //var myJsonResponse = JSON.parse(getResponse);
            var myJsonObj = getResponse.Table;
            if (myJsonObj.length > 0) {
                var i = 0;
                var getHeadOrderId = myJsonObj[i].ID;
                var getHeadWarehousecode = myJsonObj[i].Warehousecode;
                var getHeadOrderDate = myJsonObj[i].OrderDate;
                var getHeadCreatedBy= myJsonObj[i].createdBy;
                var getHeadCustomerCode = myJsonObj[i].CustomerCode;
                var getHeadCustomerReferenceNO = myJsonObj[i].CustomerReferenceNO;

                var getHeadReceivingDate = myJsonObj[i].ReceivedDate;
                var getHeadReceivingRemark = myJsonObj[i].Remark;

                var gridTable = '<div class="wms-srv-grid">';
               //GRID HEADER
                gridTable = gridTable + '<div class="wms-srv-grid-header">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Id</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Warehouse</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Created By</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Customer Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Ref. No.</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellGrnHead" style="display:none;">Receiving Date</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellGrnHead" style="display:none;">Remark</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellGrnHead" style="display:none;">Action</div>';
                gridTable = gridTable + '</div>';
              //GRID HEADER
                //GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getHeadOrderId + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getHeadWarehousecode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getHeadOrderDate +'</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getHeadCreatedBy +'</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getHeadCustomerCode +'</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getHeadCustomerReferenceNO + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellGrnHead" style="display:none;"><input type="text" class="wms-srv-grid-cell-input wms-srv-datepicker" id="txtGrnHeadRecevingDate" value="' + formatCustomDate(getHeadReceivingDate) + '" /></div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellGrnHead" style="display:none;"><input type="text" class="wms-srv-grid-cell-input" id="txtGrnHeadRemark" value="' + getHeadReceivingRemark + '" /></div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellGrnHead" style="display:none;"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button" id="btnSaveGrnHead" title="Save" type="button" data-prefix="SV" onClick="saveGrnStagingHead(' + strOrderId + ');"><i class="fas fa-check-circle"></i><span>Save</span></button></div></div>';
                gridTable = gridTable + '</div>';
              //GRID ROW
                gridTable = gridTable + '</div>';
                $("#" + placeHolder).html(gridTable);

                if (callBackFunction != null) {
                    callBackFunction();
                }
            }
        }
    });
}

function saveGrnStagingHead(strOrderId) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/TranloadSave_Receiving';
    var txtRecevingDate = $("#txtGrnHeadRecevingDate").val();
    var txtRemark = $("#txtGrnHeadRemark").val();
    var getUserId = $("#hdnUserID").val();

    var postData = {
        "HeadId": strOrderId,
        "ReceivedDate": txtRecevingDate,
        "Statuscode": "0",
        "Remark": txtRemark,
        "ReceivedBy": getUserId,
        "OrderType": "Staging"
    };
    callHttpUrl(apiPath, postData, function (result) {
        // After success
        var getCode = result.Code;
        var getMessage = result.Message;
        var isSuccess = result.Success;
        if (getCode == 'Success') {
            var myJsonObj = result.Result;
            //var myJsonObj = JSON.parse(getResponse);
            receivingStagingTransloadDetails(strOrderId);
        } else {
            alert('Failed to save document');
        }
        // After success
    });
}


//popup Function for show and hide
function formatCustomDate(strDate) {
    var finalDate = strDate;
    try {
        var d = new Date(strDate);
        var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        var mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        // var finalDate = ${da}-${mo}-${ye};
        finalDate = da + '-' + mo + '-' + ye;
    } catch (ex) {
        // Do nothing here... 
        finalDate = strDate;
    }
  
    return finalDate;
}


var getUniqueID = '0';
var globalCurrentPage = '1';
var globalUomList = '';
var recOrderTransloadRecordCount = 0;
recOrderTransloadRecordCount = 0;

function OrderRemove(OrderId, OrderDTId) {
    debugger;
    if (recOrderTransloadRecordCount > 1) {
        if (confirm("Are you sure you want to remove record?")) {
            var apiPath = wmsApiPath + '/Transload/TranloadRemoveDT';
            // var getCustomerId = $("#ddlcustomer").val();
            // var getWarehouseID = $("#ddlwarehouse").val();
            // var getCompanyID = $('#hdnCompanyID').val();
            // var getUserId = $("#hdnUserID").val();

            var postData = {
                //WarehouseId: getWarehouseID,
                "WarehouseId": getWarehouseID,
                "CustomerId": getCustomerId,
                "CompanyID": getCompanyID,
                "UserId": getUserId,
                "TranloadDTId": OrderDTId
            }

            callHttpUrl(apiPath, postData, function (data) {
                var getStatus = data.StatusCode;
                var getStatusCode = data.Code;
                if (getStatus == 'Success') {
                    var getResult = data.Response;
                    //BindRow(getUniqueID);
                    RequestDetailsHead(OrderId);
                }
                else {
                    alert('Unable to connect Server!!');
                }
            });
        }

    }
    else {
        alert('Please keep atleast one record!!');
    }
   

}
function closeAddNewPopup() {
    $('#wms-srv-popup .wms-srv-datepicker').datepicker('destroy');
    $('#wms-srv-popup').hide();
    loadTransloadList('1');
}

function OrderSaveHead() {
    debugger;
        var apiPath = wmsApiPath + '/Transload/TranloadSave';
        //var getCustomerId = $("#ddlcustomer").val();
        //var getWarehouseID = $("#ddlwarehouse").val();
        //var getCompanyID = $('#hdnCompanyID').val();
        //var getUserId = $("#hdnUserID").val();
        var getOrderId = $('#hdnPoOid').val();
        var getClientId = $('#txtReqDetailsCilent').attr('data-id');
        var getAddressId = $('#txtReqDetailsAddress').attr('data-id');
        var getTitle = $("#txtReqDetailTitle").val();
        var getCustomerReference = $("#txtReqDetailsCustRefNo").val();

        var postData = {
            "WarehouseId": getWarehouseID,
            "CustomerId": getCustomerId,
            "CompanyID": getCompanyID,
            "UserId": getUserId,
            "OrderId": getOrderId,
            "ClientCode": 1,
            "Address1": 1,
            "CreatedBy": getUserId,
            "Title": getTitle,
            "CustrefNo": getCustomerReference
        }

        callHttpUrl(apiPath, postData, function (data) {
            var getStatus = data.StatusCode;
            var getStatusCode = data.Code;
            if (getStatus == 'Success') {
                var getResult = data.Response;
                var getHeadId = data.Result.Message
                const headSaveID = parseInt(getHeadId);
                $("#spnPoOid").html(headSaveID);
                $("#hdnPoOid").val(headSaveID);
                OrderSaveDetails();
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
}

function disableHead() {
    $('#txtReqDetailTitle').attr('disabled', 'disabled');
    $('#txtReqDetailsCilent').attr('disabled', 'disabled');
    $('#txtReqDetailsCustRefNo').attr('disabled', 'disabled');
    $('#txtReqDetailsAddress').attr('disabled', 'disabled');
    $('#txtReqDetailsDate').attr('disabled', 'disabled');
}
function enableHead() {
    $('#txtReqDetailTitle').removeAttr('disabled');
    $('#txtReqDetailsCilent').removeAttr('disabled');
    $('#txtReqDetailsCustRefNo').removeAttr('disabled');
    $('#txtReqDetailsAddress').removeAttr('disabled');
    $('#txtReqDetailsDate').removeAttr('disabled');
}

function OrderSaveDetails() {
    debugger;
    if (isValidAddNewForm()) {
        var getOrderId = $("#hdnPoOid").val();
        if (getOrderId != '' && getOrderId != '0') {
            var apiPath = wmsApiPath + '/Transload/TranloadSaveDT';
            var getContainer = $("#txtContainer").val();
            var getUOM = $("#wms-srv-popup #ddlUOM option:selected").val();
            var getCartonQty = $('#txtCartonQty').val();
            var getGrossWeight = $("#txtGrossWeight").val();
            //var getUserId = $("#hdnUserID").val();

            // var OrderID = 12;
            var postData = {
                //WarehouseId: getWarehouseID,
                "HeadID": getOrderId,
                "ContainerID": getContainer,
                "UOMID": getUOM,
                "NoOfBoxes": getCartonQty,
                "Weight": getGrossWeight,
                "CreatedBy": getUserId
            }

            callHttpUrl(apiPath, postData, function (data) {
                var getStatus = data.StatusCode;
                var getStatusCode = data.Code;
                if (getStatus == 'Success') {
                    var getResult = data.Response;
                    //BindRow(getUniqueID);
                    RequestDetailsHead(getOrderId);
                }
                else {
                    alert('Unable to connect Server!!');
                }
            });
        } else {
            OrderSaveHead();
        }
    }
}

function RequestDetailsHead(strCurrentOrder) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/TransloadListID';
    //var getCustomerId = $("#ddlcustomer").val();
    //var getWarehouseID = $("#ddlwarehouse").val();
    //var getCompanyID = $('#hdnCompanyID').val();
    //var getUserId = $("#hdnUserID").val();

    var postData = {
        "CompanyId": getCompanyID,
        "WhId": getWarehouseID,
        "CustId": getCustomerId,
        "UserId": getUserId,
        "OrderId": strCurrentOrder
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            //var getResult = data.Result.Table;
            var getGridreqDataHead = data.Result;
            var gridTable = '';
            //$("#tlbPoOrderDetailsGrid").html('');
            var getTransloadId = getGridreqDataHead.Table[0].TransloadId;
            var getTitle = getGridreqDataHead.Table[0].Title;
            var getClient = getGridreqDataHead.Table[0].ClientCode;
            var getClientId = getGridreqDataHead.Table[0].ClientId;
            var getCustomerRef = getGridreqDataHead.Table[0].custRefNo;
            var getAdress = getGridreqDataHead.Table[0].Address1;
            var getDate = getGridreqDataHead.Table[0].ReceivedDate;
            var getAdressId = getGridreqDataHead.Table[0].AddressId;

            //BIND DATA GRID
            $("#hdnPoOid").val(getTransloadId);
            $("#spnPoOid").html(getTransloadId);
            $('#txtReqDetailTitle').val(getTitle);
            $('#txtReqDetailsCilent').val(getClient);
            $('#txtReqDetailsCilent').attr('data-id', getClientId);
            $('#txtReqDetailsCustRefNo').val(getCustomerRef);
            $('#txtReqDetailsAddress').val(getAdress);
            $('#txtReqDetailsAddress').attr('data-id', getAdressId);
            $('#txtReqDetailsDate').val(formatCustomDate(getDate));
            //GRID HEADER
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Container</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">UOM</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Carton Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Gross Weight</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
            gridTable = gridTable + '</div>';
            //GRID HEADER

            //GRID FORM
            gridTable = gridTable + '<div class="wms-srv-grid-row">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" value="" id="txtContainer" class="wms-srv-grid-cell-input" /></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><select name="ddlUOM" id="ddlUOM" class="wms-srv-grid-cell-input notranslate"><option value="0">-- Select --</option><option value="11">Carton</option><option value="47">Pallet (PF)</option></select></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"  value="" id="txtCartonQty" class="wms-srv-grid-cell-input" /></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" value="" id="txtGrossWeight" class="wms-srv-grid-cell-input" /></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="OrderSaveDetails();"><i class="fas fa-check-circle"></i><span>Save</span></button></div></div>';
            gridTable = gridTable + '</div>';
            //GRID FORM

            // var getGridData = myGridList.InboundResult[0].InboundList;
            for (var i = 0; i < getGridreqDataHead.Table1.length; i++) {
                var getTransloadDTId = getGridreqDataHead.Table1[i].TransloadDTId;
                var getContainer = getGridreqDataHead.Table1[i].Container;
                var getUOMID = getGridreqDataHead.Table1[i].UOMID;
                var getUOMName = getGridreqDataHead.Table1[i].UOMName;
                var getcatrtonQty = getGridreqDataHead.Table1[i].catrtonQty;
                var getGrossWeight = getGridreqDataHead.Table1[i].GrossWeight;


                //GRID FORM
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getContainer + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOMName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getcatrtonQty + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGrossWeight + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Remove" data-prefix="CN" type="button" onclick="OrderRemove(' + strCurrentOrder + ', ' + getTransloadDTId + ');"><i class="fas fa-times-circle"></i><span>Remove</span></button></div></div>';
                gridTable = gridTable + '</div>';
                //GRID FORM
            }
            recOrderTransloadRecordCount = getGridreqDataHead.Table1.length;
            $("#tlbPoOrderDetailsGrid").html(gridTable);
            disableHead();
            $('#wms-srv-popup').show();
            $("#tlbRequestDetailsGridNew").click(function()
            {
                $('#wms-srv-popup').off();
                $('#wms-srv-popup').hide();
            });
            
        } else {
            alert('Unable to connect Server!!');
        }
    });
}

// old code
function RequestDetailsHead_old(strCurrentOrder) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/TransloadListID';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();

    var postData = {
        "CompanyId": getCompanyID,
        "WhId": getWarehouseID,
        "CustId": getCustomerId,
        "UserId": getUserId,
        "OrderId": strCurrentOrder
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var getGridreqDataHead = data.Response;
            //var getGridreqDataHead = JSON.parse(getResult);
            var gridTable = '';

            var getTransloadId = getGridreqDataHead.RespTransloadHead.TransloadId;
            var getTitle = getGridreqDataHead.RespTransloadHead.Title;
            var getClient = getGridreqDataHead.RespTransloadHead.Client;
            var getClientId = getGridreqDataHead.RespTransloadHead.ClientId;
            var getAdress = getGridreqDataHead.RespTransloadHead.Adress;
            var getDate = getGridreqDataHead.RespTransloadHead.Date;
            var getAdressId = getGridreqDataHead.RespTransloadHead.AdressId;

            //BIND DATA GRID
            $("#hdnPoOid").val(getTransloadId);
            $("#spnPoOid").html(getTransloadId);
            $('#txtReqDetailTitle').val(getTitle);
            $('#txtReqDetailsCilent').val(getClient);
            $('#txtReqDetailsCilent').attr('data-id', getClientId);
            $('#txtReqDetailsCustRefNo').val();
            $('#txtReqDetailsAddress').val(getAdress);
            $('#txtReqDetailsAddress').attr('data-id', getAdressId);
            $('#txtReqDetailsDate').val(getDate);
            //GRID HEADER
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Container</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">UOM</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Carton Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Gross Weight</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
            gridTable = gridTable + '</div>';
            //GRID HEADER

            //GRID FORM
            gridTable = gridTable + '<div class="wms-srv-grid-row">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" value="" id="txtContainer" class="wms-srv-grid-cell-input" /></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">' + globalUomList +'</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"  value="" id="txtCartonQty" class="wms-srv-grid-cell-input" /></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" value="" id="txtGrossWeight" class="wms-srv-grid-cell-input" /></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="OrderSaveDetails();"><i class="fas fa-check-circle"></i><span>Save</span></button></div></div>';
            gridTable = gridTable + '</div>';
            //GRID FORM

            // var getGridData = myGridList.InboundResult[0].InboundList;
            for (var i = 0; i < getGridreqDataHead.RespTransloadDetail.length; i++) {
                var getTransloadDTId = getGridreqDataHead.RespTransloadDetail[i].TransloadDTId;
                var getContainer = getGridreqDataHead.RespTransloadDetail[i].Container;
                var getUOMID = getGridreqDataHead.RespTransloadDetail[i].UOMID;
                var getUOMName = getGridreqDataHead.RespTransloadDetail[i].UOMName;
                var getcatrtonQty = getGridreqDataHead.RespTransloadDetail[i].catrtonQty;
                var getGrossWeight = getGridreqDataHead.RespTransloadDetail[i].GrossWeight;


                //GRID FORM
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getContainer +'</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOMName +'</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getcatrtonQty +'</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGrossWeight +'</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Remove" data-prefix="CN" type="button" onclick="OrderRemoveDetails(' + strCurrentOrder +', ' + getTransloadDTId +');"><i class="fas fa-times-circle"></i><span>Remove</span></button></div></div>';
                gridTable = gridTable + '</div>';
                //GRID FORM
            }
            $("#tlbPoOrderDetailsGrid").html(gridTable);
            disableHead();
            $('#wms-srv-popup').show();
        } else {
            alert('Unable to connect Server!!');
        }
    });
}
function openAddNewPopup() {
    debugger;
    var apiPath = wmsApiPath + '/Transload/UOMList';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    globalUomList = '';

   
    var postData = {
        "CompanyId": getCompanyID,
        "whId": getWarehouseID,
        "custId": getCustomerId,
        "userId": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;

        globalUomList += '<select name="ddlUOM" id="ddlUOM" class="wms-srv-grid-cell-input notranslate">';
        globalUomList += '<option value="0">-- Select --</option>';
        if (getStatus == 'Success'){
            var getResult = data.Result;
            var getUomList = getResult.Table;
            for (var i = 0; i < getUomList.length; i++) {
                var getUomId = getUomList[i].UnitId;
                var getUomName = getUomList[i].UOMName;
                // GRID ROW
                globalUomList += '<option value="' + getUomId +'">' + getUomName +'</option>';
            }
        } else {
            alert('Unable to connect Server!!');
        }
        globalUomList += '</select>';
        $('#spnPoOid').html('To be Generated');
        $('#hdnPoOid').val('0');

        $('#txtReqDetailTitle').val('');
        $('#txtReqDetailsCilent').val('');
        $('#txtReqDetailsCilent').attr('data-id', '0');
        $('#txtReqDetailsCustRefNo').val('');
        $('#txtReqDetailsAddress').val('');
        $('#txtReqDetailsAddress').attr('data-id', '0');

        // var getCurrentDate = isBlankDate('');
        // $('#txtReqDetailsDate').val(getCurrentDate);
        enableHead();
        var gridTable = '';

        //GRID HEADER
        gridTable = gridTable + '<div class="wms-srv-grid-header">';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Container</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">UOM</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Carton Qty</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Gross Weight</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
        gridTable = gridTable + '</div>';
        //GRID HEADER

        //GRID FORM
        gridTable = gridTable + '<div class="wms-srv-grid-row">';
        gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" value="" id="txtContainer" class="wms-srv-grid-cell-input" /></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + globalUomList + '</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"  value="" id="txtCartonQty" class="wms-srv-grid-cell-input" /></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" value="" id="txtGrossWeight" class="wms-srv-grid-cell-input" /></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="OrderSaveDetails();"><i class="fas fa-check-circle"></i><span>Save</span></button></div></div>';
        gridTable = gridTable + '</div>';
        //GRID FORM

        $("#tlbPoOrderDetailsGrid").html(gridTable);
        $('#wms-srv-popup').show();
        $('#wms-srv-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });

        $('#wms-srv-popup #ddlUOM').html(globalUomList);
    });
}
function isBlankString(strVal) {
    if (strVal.trim() == '') {
        strVal = '-';
    }
    return strVal;
}
function isBlankNumber(strVal) {
    if (strVal.trim() == '') {
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


function isValidAddNewForm() {
    var isValid = true;
    var getClientId = $('#txtReqDetailsCilent').attr('data-id');
    var getReferenceNo = $("#txtReqDetailsCustRefNo").val();

    var getContainer = $("#txtContainer").val();
    var getUOM = $("#ddlUOM").val();
    var getCartonQty = $("#txtCartonQty").val();
    var getGrossWeight = $("#txtGrossWeight").val();

    var validationMsg = '';
    if (getClientId == '0') {
        validationMsg = 'Please select Client!!';
        isValid = false;
    } else if (getReferenceNo == '') {
        validationMsg = 'Please enter Reference No!!';
        isValid = false;
    } else if (getContainer == '') {
        validationMsg = 'Please enter Container Id!!';
        isValid = false;
    } else if (getUOM == '0') {
        validationMsg = 'Please select UOM!!';
        isValid = false;
    } else if (getCartonQty == '') {
        validationMsg = 'Please enter Carton Qty!!';
        isValid = false;
    } else if (getCartonQty == '0') {
        validationMsg = 'Carton Qty can not be zero!!';
        isValid = false;
    }else if (getGrossWeight == '') {
        validationMsg = 'Please enter Gross Weight!!';
        isValid = false;
    } else if (getGrossWeight == '0') {
        validationMsg = 'Gross Weight can not be zero!!';
        isValid = false;
    }
    if ((!isValid) && (validationMsg != '')) {
        alert(validationMsg);
    } 
    return isValid;
}

function getSuggestionList(wmsSuggestionControl) {
    var apiPath = 'https://w5production.westcoastwarehouse.com/WestCoastAPITestService/api/PO/GetPOSKUSuggest';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var strOrderId = $('#hdnPoOid').val();
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseID,
        "UserId": getUserId,
        "OrderId": strOrderId,
        "OrderType": "PurchaseOrder",
        "skey": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == 'Success') {
            var getSkuSuggestion = data.Result;
            var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = suggestionListObj.SkuSuggestionResult;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getSKU = suggestionList[i].Sku;
                var getSKUName = suggestionList[i].Name;
                var getSKUDescription = suggestionList[i].Description;
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
                    var getListSkuName = $(this).attr('data-name');
                    var getListSkuDescription = $(this).attr('data-description');

                    // $(wmsSuggestionControl).val(getListLabel);
                    // $(wmsSuggestionControl).attr('data-id', getListId);
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
                    clearSuggestionList();
                    GetUomBySKU(getListId, '0');
                });
           // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}

function clearSuggestionList() {
    $('.wms-srv-suggestion-list').remove();
}

function getClientSuggestionList(wmsSuggestionControl) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/clientSugg';
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyID,
        "custId": getCustomerId,
        "whId": getWarehouseID,
        "UserId": getUserId,
        "ClientName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var suggestionList = data.Result;
            //var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = suggestionList.Table;

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
                $('#txtReqDetailsCilent').val(getListLabel);
                $('#txtReqDetailsCilent').attr('data-id', getListId);
                $('#hdnCliendId').val(getListId);
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

function getAddressSuggestionList(wmsSuggestionControl) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/AddSugg';
    //var getClientId = $("#hdnCliendId").val(); 
    var getSkey = $(wmsSuggestionControl).val();
    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyID,
        "custId": getCustomerId,
        "whId": getWarehouseID,
        "UserId": getUserId,
        "AddresstName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var getSkuSuggestion = data.Result;
            //var suggestionListObj = JSON.parse(getSkuSuggestion);
            var suggestionList = getSkuSuggestion.Table;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getAddressName = suggestionList[i].Address;
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
                $('#txtReqDetailsAddress').val(getListLabel);
                $('#txtReqDetailsAddress').attr('data-id', getListId);
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
    debugger;
    var apiPath = wmsApiPath + '/Transload/DockSugg';
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
        "CompanyId": getCompanyID,
        "custId": getCustomerId,
        "whId": getWarehouseID,
        "UserId": getUserId,
        "DockName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success'){
            var suggestionList = data.Result;
            //var suggestionListObj = JSON.parse(getSkuSuggestion);
            //var suggestionList = suggestionListObj;

            var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
            if (hasSuggestionListPanel.length <= 0) {
                $('body').append('<div class="wms-srv-suggestion-list"></div>');
            } else {
                $('.wms-srv-suggestion-list').html('');
            }

            for (var i = 0; i < suggestionList.Table.length; i++) {
                var getId = suggestionList.Table[i].ID;
                var getDockName = suggestionList.Table[i].Code;
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
                $('#txtDockNo').val(getListLabel);
                $('#txtDockNo').attr('data-id', getListId);
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
    debugger;
   var apiPath = wmsApiPath + '/Transload/PalletSugg';
   
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
        "CompanyId": getCompanyID,
        "custId": getCustomerId,
        "whId": getWarehouseID,
        "UserId": getUserId,
        "PalletName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var suggestionList = data.Result.Table;
            //var suggestionListObj = JSON.parse(getSkuSuggestion);
            //var suggestionList = suggestionListObj.jsonObject;

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

                $('#txtRecTransload_Pallet').val(getListLabel);
                $('#txtRecTransload_Pallet').attr('data-id', getListId);
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
    debugger;
    var apiPath = wmsApiPath + '/Transload/TransportSugg';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var getSkey = "";
    getSkey = $('#txtTransporterName').val();
    if(getSkey == "")
    {
        getSkey = $("#txtSTransporterName").val();
    }  

    var listPostion = 'bottom';

    if (getSkey == '') {
        getSkey = 'NODATAFORSUGGESTION';
    }

    var postData = {
        "CompanyId": getCompanyID,
        "custId": getCustomerId,
        "whId": getWarehouseID,
        "UserId": getUserId,
        "vendorName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var suggestionList = data.Result.Table;
            //var suggestionListObj = JSON.parse(getSkuSuggestion);
            //var suggestionList = suggestionListObj.jsonObject;

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
    debugger;
    var apiPath = wmsApiPath + '/Transload/StagingSugg';
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
        "CompanyId": getCompanyID,
        "custId": getCustomerId,
        "whId": getWarehouseID,
        "UserId": getUserId,
        "StagingName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var suggestionList = data.Result.Table;
            //var suggestionListObj = JSON.parse(getSkuSuggestion);
            //var suggestionList = suggestionListObj.jsonObject;

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

                $('#txtRecTransload_StagingLocation').val(getListLabel);
                $('#txtRecTransload_StagingLocation').attr('data-id', getListId);
                
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

function getActivitySuggestionList(wmsSuggestionControl) {
    debugger;
    var apiPath = wmsApiPath + '/Transload/RateActivitylist';

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
        "CompanyId": getCompanyID,
        "CustId": getCustomerId,
        "WhId": getWarehouseID,
        "UserId": getUserId,
        "ObjName": "Transload",
        "ActivityName": getSkey
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
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
            });
            // }
            var suggestionLength = suggestionList.length;
            if (suggestionLength <= 0) {
                clearSuggestionList();
            }
        }
    });
}

// Order AdjustMent

function openOrderAdjustment(strOrderId) {
    createObjectHead('pnlHeadOrderAdjustment', strOrderId, function () {
        loadOrderAdjlist(strOrderId);
        
    });
}

function loadOrderAdjlist(orderid) {
    var apiPath = wmsApiPath + 'GetOrderAdjList';
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCustomerId = $("#ddlcustomer").val();
    // var getUserId = $("#hdnUserID").val();
    var getOrderId = orderid;

    var postData = {
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseID,
        UserId: getUserId,
        OrderId: getOrderId
    };

    callHttpUrl(apiPath, postData, function (data) {
        debugger;
    
        var getStatus = data.StatusCode;
        if (getStatus == 'Success') {
            var myGridList = data.Result;
            $("#hdnTransloadID").val(getOrderId);
            //var myGridList = JSON.parse(getResult);

            // var gridTable = '';
            var griTableDtls = '';
            // GRID HEAD HEADER
            //gridTable = gridTable + '<div class="wms-srv-grid-header">';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell">Expected Receipt No</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell">Warehouse Code</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Date</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell">Customer Code</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell">Container Id</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell">Quantity</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell">Reference No</div>';
            //gridTable = gridTable + '</div>';
            // GRID HEAD HEADER

            // GRID DETAIL HEADER
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-header">';
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">Pallet</div>';
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">Pallet Type</div>';
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">Order Reference No</div>';
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">Staging Location</div>';
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">No of Carton</div>';
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">Weight</div>';
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">Remark</div>';
            griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            griTableDtls = griTableDtls + '</div>';
            // GRID DETAIL HEADER
          
            //var getGridData = myGridList.jsonObject.Table;
            //for (var i = 0; i < getGridData.length; i++) {
            //    var getExpectedReceiptNo = getGridData[i].TransloadId;
            //    $("#hdnTransloadID").val(getExpectedReceiptNo);
                //var getWarehouseCode = getGridData[i].WarehouseCode;
                //var getOrderDate = getGridData[i].OrderDate;
                //var getCustomerCode = getGridData[i].CustCode;
                //var getContainerId = getGridData[i].ContainerID;
                //var getQuantity = getGridData[i].OrderQTY;
                //var getReferenceNo = getGridData[i].CustomerRefNo;

                // GRID HEAD ROW
                //gridTable = gridTable + '<div class="wms-srv-grid-row">';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getExpectedReceiptNo + '</div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getWarehouseCode + '</div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderDate + '</div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getCustomerCode + '</div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getContainerId + '</div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getQuantity + '</div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getReferenceNo + '</div>';
                //gridTable = gridTable + '</div>';

            //}
            // GRID HEAD ROW
          //  $('#div-order-adj-list').html(gridTable);

            var getGridDtlsData = myGridList.Table1;
            for (var i = 0; i < getGridDtlsData.length; i++) {
                var TransloadDTId = getGridDtlsData[i].TransloadDTId;
                var PalletCode = getGridDtlsData[i].PalletCode;
                var PalletType = getGridDtlsData[i].PalletType;
                var Orderrefno = getGridDtlsData[i].CustomerRefNo;
                var Stagingcode = getGridDtlsData[i].Stagingcode;
                var Noofcarton = getGridDtlsData[i].Noofcarton;
                var TotWeight = getGridDtlsData[i].TotWeight;
                var DTRemark = getGridDtlsData[i].DTRemark;

                // GRID HEAD ROW
                griTableDtls = griTableDtls + '<div class="wms-srv-grid-row">';
                griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">' + PalletCode + '</div>';
                griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">' + PalletType + '</div>';
                griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">' + Orderrefno + '</div>';
                griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">' + Stagingcode + '</div>';
                griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">' + Noofcarton + '</div>';
                griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">' + TotWeight + '</div>';
                griTableDtls = griTableDtls + '<div class="wms-srv-grid-cell">' + DTRemark + '</div>';
                griTableDtls = griTableDtls + "<div class='wms-srv-grid-cell' style='text-align:center;'><a href='#' onclick='DeletePallet(" + TransloadDTId + "); return false; '><i class='fas fa-times-circle'></i></a></div>";
                griTableDtls = griTableDtls + '</div>';

            }
            // GRID HEAD ROW
            $('#div-order-adj-dtls-list').html(griTableDtls)
        } else {
            alert('Unable to connect Server!!');
        }
        $('#wms-srv-orderadjustment-popup').show();
        $('#wms-srv-orderadjustment-popup-close').off();
        $('#wms-srv-orderadjustment-popup-close').click(function () {
            $('#wms-srv-orderadjustment-popup').hide();
        });
    });
}

function loadOrderAdjPalletlist() {
    debugger;
    var apiPath = wmsApiPath + 'AddPalletList';
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCustomerId = $("#ddlcustomer").val();
    // var getUserId = $("#hdnUserID").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    var skey = $('#txtSearch').val();
    var TransID = $("#hdnTransloadID").val();
    var postData = {
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseID,
        UserId: getUserId,
        CompanyId: getCompanyID,
        SerchPara: skey,
        TransloadId: TransID
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        if (getStatus == 'Success') {
            var myGridList = data.Result;
            //var myGridList = JSON.parse(getResult);

            var gridTable = '';
            // GRID HEAD HEADER
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Expected Receipt No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Reference No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Pallet</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Pallet Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Staging Location</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">No of Carton</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Weight</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Remark</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';

            gridTable = gridTable + '</div>';
            // GRID HEAD HEADER

            var getGridData = myGridList.Table;
            for (var i = 0; i < getGridData.length; i++) 
            {
                var getExpectedReceiptNo = getGridData[i].ExpectedReceiptNo;
                var getReferenceNo = getGridData[i].CustomerRefNo;
                var PalletCode = getGridData[i].PalletCode;
                var PalletType = getGridData[i].PalletType;
                var Stagingcode = getGridData[i].Stagingcode;
                var Noofcarton = getGridData[i].Noofcarton;
                var TotWeight = getGridData[i].TotWeight;
                var DTRemark = getGridData[i].DTRemark;
                var TransloadDTId = getGridData[i].TransloadDTId;

                // GRID HEAD ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getExpectedReceiptNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getReferenceNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + PalletCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + PalletType + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + Stagingcode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + Noofcarton + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + TotWeight + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + DTRemark + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" class="messageCheckbox" id="' + TransloadDTId + '"></div>';
                gridTable = gridTable + '</div>';

            }
            // GRID HEAD ROW
            $('#div-add-pallet-list').html(gridTable);
        } else {
            alert('Unable to connect Server!!');
        }

        $('#wms-srv-palletlist-popup').show();
        $('#wms-srv-palletlist-popup-close').click(function () {
            $('#wms-srv-palletlist-popup').hide();
        });
    });
}

function DeletePallet(id) {
    debugger;
    var TransloadId = $("#hdnTransloadID").val();
    var apiPath = wmsApiPath + 'OrderAdjRemove';
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCustomerId = $("#ddlcustomer").val();
    // var getUserId = $("#hdnUserID").val();
    var TransloadDTId = id;

    var postData = {
        CompanyId: getCompanyID,
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseID,
        UserId: getUserId,
        TransloadId: TransloadId,
        TransloadDTId: TransloadDTId
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        if (getStatus == 'Success') {
            loadOrderAdjlist(TransloadId);
        } else {
            alert('Unable to connect Server!!');
        }
    });
}

function searchPallelList() {
    loadOrderAdjPalletlist();
}

function SaveNewPallet() {
    debugger;
        var SelectedRecord = document.getElementById("hdnTransDtlsID");
        SelectedRecord.value = "";
        $("input[class=messageCheckbox]").each(function () {
            if ($(this).prop("checked") == true) {
                if (SelectedRecord.value == "") {
                    SelectedRecord.value = $(this).attr("id");
                }
                else {
                    SelectedRecord.value = SelectedRecord.value + "," + $(this).attr("id");
                }
            }
        });

        var apiPath = wmsApiPath + 'OrderAdjSave';
        // var getWarehouseID = $("#ddlwarehouse").val();
        // var getCustomerId = $("#ddlcustomer").val();
        // var getUserId = $("#hdnUserID").val();
        // var getCompanyID = $('#hdnCompanyID').val();
        var TransloadId = $("#hdnTransloadID").val();
        var TransloadDTId = $("#hdnTransDtlsID").val();

        if (TransloadDTId == "") {
            alert("Please select atleast one record..!");
        }
        else {
            var postData = {
                CustomerId: getCustomerId,
                WarehouseId: getWarehouseID,
                UserId: getUserId,
                CompanyId: getCompanyID,
                TransloadId: TransloadId,
                TransloadDTId: TransloadDTId
            };

            callHttpUrl(apiPath, postData, function (data) {
                var getStatus = data.StatusCode;
                if (getStatus == 'Success') {
                    loadOrderAdjlist(TransloadId);
                    $('#wms-srv-palletlist-popup').hide();
                    $('#wms-srv-orderadjustment-popup').show();
                } else {
                    alert('Unable to connect Server!!');
                }
            });
        } 
}

// 3PL Billing
function open3PL(strOrderId) {
    debugger;
    createObjectHead('pnlHead3PL', strOrderId, function () {
        $('#pnlHead3PL .wms-srv-grid-header').append('<div class="wms-srv-grid-cell">Rate</div>');
        $('#pnlHead3PL .wms-srv-grid-row').append('<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input notranslate" id="ddlRateList"></select></div>');
        $('#wms-srv-3pl-popup').show();
        // GetRateCardDetails(strOrderId, strStatus);
        $('#wms-srv-3pl-popup-close').off();
        $('#wms-srv-3pl-popup-close').click(function () {
            $('#wms-srv-3pl-popup').hide();
        });
        get3PlRateGroupList(strOrderId);
    });
}

function get3PlRateGroupList(strOrderId) {
    var apiPath = wmsApiPath + 'GetRateCardDetails';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();

    var postData = {
        "CompanyId": getCompanyID,
        "CustomerId": getCustomerId,
        "ObjectName": "Transload",
        "UserId": getUserId,
        "WarehouseId": getWarehouseID
    };
   
    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.StatusCode;
        var isSuccess = data.Success;
        if (getStatusCode == 'Success') {
            var getRateOption = '<option value="0">-- Select --</option>';
            try {
                var myRateList = data.Result;
                //var myRateList = JSON.parse(getResult);
                for (var i = 0; i < myRateList.length; i++) {
                    var getRateId = myRateList[i].ID;
                    var getRate = myRateList[i].Rate;
                    getRateOption = getRateOption + '<option value="' + getRateId + '">' + getRate + '</option>';

                }
            } catch (ex) {
                // Do nothing...
            }
            $('#ddlRateList').html(getRateOption);
            $('#ddlRateList').off();
            $('#ddlRateList').change(function () {
                var getRateGroupId = $(this).val();
                get3PlActivityDetailsByOrder(strOrderId, getRateGroupId);
            });
            get3PlActivityDetailsByOrder(strOrderId, '0');
        }
    });
}

function get3PlListByRateGroup(strOrderId) {
    var apiPath = wmsApiPath + 'GetRateListInput';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var getRateGroup = $('#ddlRateList option:selected').val();

    var postData = {
        "ObjName": "Transload",
        "OrderId": strOrderId,
        "RateGrpId": getRateGroup,
        "uid": getUserId,
        "frmdt": "2022-05-25 05:59:29.527",
        "todt": "2022-05-25 05:59:29.527"
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.StatusCode;
        var isSuccess = data.Success;
        if (getStatusCode == 'Success') {
            var getRateOption = '';
            try {
                var myRateList = data.Result;
                //var myRateList = JSON.parse(getResult);
                for (var i = 0; i < myRateList.length; i++) {
                    var getRateId = myRateList[i].ID;
                    var getRate = myRateList[i].Rate;
                    getRateOption = getRateOption + '<option value="' + getRateId + '">' + getRate + '</option>';

                }
            } catch (ex) {
                // Do nothing...
            }
            $('#ddlRateList').html(getRateOption);
        }
    });
}

function addAdditioanlActivity(strOrderId, recordId) {
    setTimeout(function () {
        save3PlRecord(strOrderId, recordId);
    }, 500);
}

function save3PlRecord_old(strOrderId, recordId) {

    var apiPath = wmsApiPath + 'SaveDataDT';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var getRateGroup = $('#ddlRateList option:selected').val();

    var getRateGroupId = $('#rec_3pl_' + recordId).attr('data-groupid');
    var getActivityId = $('#rec_3pl_' + recordId + ' .txtActivityType').attr('data-id');
    var getBillQty = $('#rec_3pl_' + recordId + ' .txtBillQty').val();

    var postData = {
        "rategrpId": getRateGroupId,
        "OrderId": strOrderId,
        "BillQty": getBillQty,
        "activityId": getActivityId,
        "uid": getUserId,
        "ObjName": "Transload"
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.StatusCode;
        var isSuccess = data.Success;
        if (getStatusCode == 'Success') {
            var getRateOption = '';
            try {
                var getMessage = data.Result;
                if (getMessage == 'SaveBLRate') {
                    open3PL(strOrderId);
                }
            } catch (ex) {
                // Do nothing...
            }
            $('#ddlRateList').html(getRateOption);
        }
    });
}

function save3PlRecord(strOrderId, recordId) {
    var apiPath = wmsApiPath + 'SaveBLRate';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();
    var getRateGroup = $('#ddlRateList option:selected').val();

    var getRateRecordId = $('#rec_3pl_' + recordId).attr('data-recid');
    var getRateGroupId = $('#rec_3pl_' + recordId).attr('data-groupid');
    var getActivityId = $('#rec_3pl_' + recordId + ' .txtActivityType').attr('data-id');
    var getBillQty = $('#rec_3pl_' + recordId + ' .txtBillQty').val();

    var postData = {
        "rateid": getRateRecordId, 
        "rategrpId": getRateGroupId,
        "OrderId": strOrderId,
        "BillQty": getBillQty,
        "activityId": getActivityId,
        "uid": getUserId,
        "ObjName": "Transload"
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.StatusCode;
        var isSuccess = data.Success;
        if (getStatusCode == 'Success') {
            var getRateOption = '';
            try {
                var getMessage = data.Result;
                if (getMessage == 'SaveBLRate') {
                    open3PL(strOrderId);
                }
            } catch (ex) {
                // Do nothing...
            }
            $('#ddlRateList').html(getRateOption);
        }
    });
}

function Delete3PlRecord(strOrderId, recordId) {
    var apiPath = wmsApiPath + 'RemoveCommunication';
    // var apiPath = 'http://localhost:64443/api/v2/BillPL/RemoveCommunication';
    // var getUserId = $("#hdnUserID").val();
    var getRateRecordId = $('#rec_3pl_' + recordId).attr('data-recid');
    var postData = {
        "RateId": getRateRecordId,
        "UserId": getUserId
    };
    $('#pnl3PlDetails').html('');
    callHttpUrl(apiPath, postData, function (result) {
        var getStatusCode = result.StatusCode;
        var isSuccess = result.Success;
        if (getStatusCode == 'Success') {
            try {
                var getMessage = result.Result;
                alert(getMessage);
            } catch (ex) {
                // Do nothing...
            }
            //$('#ddlRateList').html(getRateOption);
        }
    });
}

function get3PlActivityDetailsByOrder(strOrderId, rateGroupId) {
   /* var data = {
        Code: 200,
        Success:true,
        Response: '{\"jsonObject\":[{\"id\":\"120\",\"srno\":\"1\",\"invoiceno\":\"98823\",\"activitytype\":\"Receving Charges\",\"activitytypeid\":\"223\",\"rate\":\"5.00\",\"unittype\":\"Each\",\"unittypeid\":\"16\",\"systemqty\":\"1200\",\"billedqty\":\"1700\",\"status\":\"Composing\",\"isremovable\":\"yes\"},{\"id\":\"121\",\"srno\":\"2\",\"invoiceno\":\"98826\",\"activitytype\":\"Packing Charges\",\"activitytypeid\":\"224\",\"rate\":\"7.00\",\"unittype\":\"Each\",\"unittypeid\":\"16\",\"systemqty\":\"600\",\"billedqty\":\"620\",\"status\":\"Composing\",\"isremovable\":\"no\"},{\"id\":\"122\",\"srno\":\"3\",\"invoiceno\":\"69558\",\"activitytype\":\"Loading Charges\",\"activitytypeid\":\"336\",\"rate\":\"6.00\",\"unittype\":\"Each\",\"unittypeid\":\"16\",\"systemqty\":\"300\",\"billedqty\":\"360\",\"status\":\"Composing\",\"isremovable\":\"yes\"}]}',
        "RetPk": null
    }; */

    var apiPath = wmsApiPath + 'GetRateList';
    // var getCustomerId = $("#ddlcustomer").val();
    // var getWarehouseID = $("#ddlwarehouse").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();

    var postData = {
        "CompanyId": getCompanyID,
        "CustId": getCustomerId,
        "ObjectName": "Transload",
        "Oid": strOrderId,
        "UserId": getUserId,
        "WhId": getWarehouseID,
        "rategrpid": rateGroupId
    };
    $('#pnl3PlDetails').html('');
    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.StatusCode;
        var isSuccess = data.Success;
        if (getStatusCode == 'Success') {
            var rateDetails = '';
            try {
                var myRateJson = data.Result;
                //var myRateJson = JSON.parse(getResult);
                var myRateDetails = myRateJson.Table;
                rateDetails = rateDetails + '<div class="wms-srv-grid">';
                rateDetails = rateDetails + '<div class="wms-srv-grid-header">';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">SR. No</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">Invoice No</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">Activity Type</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">Rate</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">Unit Type</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">System Qty</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">Billed Qty</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">Status</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">Action</div>';
                rateDetails = rateDetails + '</div>';

                rateDetails = rateDetails + '<div class="wms-srv-grid-row" id="rec_3pl_0" data-recid="0" data-groupid="0">';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell">New</div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell"></div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" value="" data-id="0" class="wms-srv-grid-cell-input txtActivityType" onkeyup="getActivitySuggestionList(this);" onchange="addAdditioanlActivity(\'' + strOrderId +'\', \'0\');" /> <i class="fas fa-search" onclick="getActivitySuggestionList(this);"></i></div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell"></div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell"></div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell"></div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell"><input type="hidden" value="0" class="wms-srv-grid-cell-input txtBillQty" /></div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell"></div>';
                rateDetails = rateDetails + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
               // rateDetails = rateDetails + '<button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV"><i class="fas fa-check-circle"></i><span>Save</span></button>';
                rateDetails = rateDetails + '</div></div>';
                rateDetails = rateDetails + '</div>';

                for (var i = 0; i < myRateDetails.length; i++) {

                    var getId = myRateDetails[i].ID;
                   // var getSrNo = myRateDetails[i].SrNo;
                    var getSrNo = (i + 1);
                    var getRecordId = myRateDetails[i].ID;
                    var getInvoiceNo = myRateDetails[i].invoiceno;
                    var getActivityType = myRateDetails[i].RateTitle;
                    var getRateActivityTitle = myRateDetails[i].RateActivityTitle;
                    var getActivityTypeId = myRateDetails[i].RateTypeId;
                    var getRate = myRateDetails[i].Rate;
                    var getRateGroupId = myRateDetails[i].RateGrpId;
                    var getUnitType = myRateDetails[i].UnitType;
                    var getUnitTypeId = myRateDetails[i].UnitTypeId;
                    var getSystemQty = myRateDetails[i].SystemQty;
                    var getBilledQty = myRateDetails[i].BillQty;
                    var getStatus = myRateDetails[i].StatusName;
                    var getIsRemovable = myRateDetails[i].isremovable;


                    var rowId = i + 1;

                    rateDetails = rateDetails + '<div class="wms-srv-grid-row"  id="rec_3pl_' + getRecordId + '" data-recid="' + getRecordId +'" data-groupid="' + getRateGroupId +'">';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell">' + getSrNo +'</div>';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell">' + getInvoiceNo +'</div>';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" value="' + getRateActivityTitle + '" data-id="' + getActivityTypeId +'" class="wms-srv-grid-cell-input"> <i class="fas fa-search"></i></div>';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell">' + getRate +'</div>';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell">' + getUnitType +'</div>';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell">' + getSystemQty +'</div>';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell"><input type="text" value="' + getBilledQty +'" class="wms-srv-grid-cell-input txtBillQty" /></div>';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell">' + getStatus + '</div>';
                    rateDetails = rateDetails + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
                    rateDetails = rateDetails + '<button class="wms-srv-input wms-srv-button" type="button" onclick="save3PlRecord(\'' + strOrderId +'\', \'' + getRecordId +'\');" title="Save" data-prefix="SV"><i class="fas fa-check-circle"></i><span>Save</span></button>';
                    rateDetails = rateDetails + '<div class="wms-srv-action-sep">|</div> ';
                   // if (getIsRemovable == 'yes') {
                    rateDetails = rateDetails + '<button class="wms-srv-input wms-srv-button" tupe="button" onclick="Delete3PlRecord(\'' + strOrderId + '\', \'' + getRecordId +'\');" title="Cancel" data-prefix="CN"> <i class="fas fa-times-circle"></i> <span>Cancel</span></button>';
                    /*} else {
                        rateDetails = rateDetails + '<button class="wms-srv-input wms-srv-button" title="Cancel" data-prefix="CN" disabled="disabled" style="opacity:0.3;"> <i class="fas fa-times-circle"></i> <span>Cancel</span></button>';
                    }*/
                    
                    rateDetails = rateDetails + '</div></div>';
                    rateDetails = rateDetails + '</div>';
                }
                rateDetails = rateDetails + '</div>';
                $('#pnl3PlDetails').html(rateDetails);
            } catch (ex) {
                // Do nothing...
            }
        }
    });
}


//);
//}
function GetTransportDetails(strOrderId) {
    debugger;
   // var getOrderId = $('#wms-srv-transport-popup').attr('data-id');
    var apiPath = wmsApiPath + 'GetTransportDetail';
 
    var postData = {
        CompanyId: getCompanyID,
        CustId: getCustomerId,
        WhId: getWarehouseID,
        UserId: getUserId,
        OrderId: strOrderId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var myGridList = data.Result;
            
            //var myGridList = JSON.parse(getResult);
            var OrderId = myGridList.Table[0].Id
            var getAirwaybill = myGridList.Table[0].AirwaybillRT;
            var getshippingtype = myGridList.Table[0].shippingtypeRT;
            var getshippingdate = myGridList.Table[0].shippingdateRT;
            var getexpdeldate = myGridList.Table[0].expdeldateRT;
            var getTransporterName = myGridList.Table[0].TransporterName;
            var getTransporterNameId = myGridList.Table[0].TransporterNameRT;
            var getTransporterRemark = myGridList.Table[0].TransporterRemarkRT;
            var getOutTime = myGridList.Table[0].OutTimeRT;
            var getContainerID = myGridList.Table[0].ContainerID;
            var getDockNo = myGridList.Table[0].DockName;
            var getDockNoId = myGridList.Table[0].DockNoRT;
            var getTruckNo = myGridList.Table[0].TruckNo;
            var getLRNo = myGridList.Table[0].LRNoRT;
            var getInTime = myGridList.Table[0].InTimeRT;
            var getTrailer = myGridList.Table[0].Trailer;
            var getSeal = myGridList.Table[0].Seal;
            var getCarrier = myGridList.Table[0].Carrier;
            var getOrderType = myGridList.Table[0].OrderType;

            var getCurrentDate = isBlankDate('');

            if (getshippingdate == '') {
                getshippingdate = getCurrentDate;
            }
            if (getexpdeldate == '') {
                getexpdeldate = getCurrentDate;
            }
            
            $('#txtAirwayBill').val(getAirwaybill);
            $('#txtShippingType').val(getshippingtype);
            $('#txtShippingDate').val(formatCustomDate(getshippingdate));
            $('#txtExpDeliveryDate').val(formatCustomDate(getexpdeldate));
            $('#txtTransporterName').val(getTransporterName);
            $('#txtTransporterName').attr('data-id', getTransporterNameId);            
            $('#txtTransporterRemark').val(getTransporterRemark);
            $("#txtOutTime").val(getOutTime);
            $('#txtContainerId').val(getContainerID);
            $('#txtDockNo').val(getDockNo);
            $('#txtDockNo').attr('data-id', getDockNoId);
            $('#txtTruckNo').val(getTruckNo);
            $('#txtLRNo').val(getLRNo);
            $("#txtInTime").val(getInTime);
            $('#txtTrailer').val(getTrailer);
            $('#txtSeal').val(getSeal);
            $('#txtCarrier').val(getCarrier);
            $('#txtOrderType').val(getOrderType);

        } else {
            alert('Unable to connect Server!!');
        }

        $('#wms-srv-transport-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
        $('#wms-srv-transport-popup').show();
        $('#wms-srv-transport-popup-close').off();
        $('#wms-srv-transport-popup-close').click(function () {
            $('#wms-srv-transport-popup .wms-srv-datepicker').datepicker('destroy');
            $('#wms-srv-transport-popup').hide();
            loadTransloadList('1');
        });
    });
}

function saveTransport() {
    debugger;
    var getOrderId = $('#btnSaveRecevingTransport').attr('data-id');
    var apiPath = wmsApiPath + 'TransportDetail';

    var StrAirwayBill = $("#txtAirwayBill").val();
    var StrShippingType = $("#txtShippingType").val();
    var StrShippingDate = $("#txtShippingDate").val();
    var StrExpDeliveryDate = $("#txtExpDeliveryDate").val();
   // var StrTransporterName = $("#txtTransporterName").val();
    var StrTransporterName = $("#txtTransporterName").attr('data-id');
    var StrTransporterRemark = $("#txtTransporterRemark").val();
    var StrOutTime = $("#txtOutTime").val();
    var StrContainerId = $("#txtContainerId").val();
   // var StrDockNo = $("#txtDockNo").val();
    var StrDockNo = $("#txtDockNo").attr('data-id');
    globalDockIdforlive = StrDockNo;
    gblobalDocNameforlive = $('#txtDockNo').val();
    var StrTruckNo = $("#txtTruckNo").val();
    var StrLRNo = $("#txtLRNo").val();
    var StrInTime = $("#txtInTime").val();
    var StrTrailer = $("#txtTrailer").val();
    var StrSeal = $("#txtSeal").val();
    var StrCarrier = $("#txtCarrier").val();
    var StrOrderType = $("#txtOrderType").val();

    var postData = {      
        Id: getOrderId,
        AirwaybillRT: StrAirwayBill,
        shippingtypeRT: StrShippingType,
        shippingdateRT: StrShippingDate,
        expdeldateRT: StrExpDeliveryDate,
        TransporterNameRT: StrTransporterName,
        TransporterRemarkRT: StrTransporterRemark,
        OutTimeRT: StrOutTime,
        ContainerID: StrContainerId,
        DockNoRT: StrDockNo,
        TruckNo: StrTruckNo,
        LRNoRT: StrLRNo,
        InTimeRT: StrInTime,
        Trailer: StrTrailer,
        Seal: StrSeal,
        Carrier: StrCarrier,
        OrderType: StrOrderType,
        UserId: getUserId

    };
    callHttpUrl(apiPath, postData, function (result) {
        debugger;
        var isSuccess = result.StatusCode;
        if (isSuccess == 'Success') {
            alert('Transport Save Success!!');
            $('#wms-srv-transport-popup .wms-srv-datepicker').datepicker('destroy');
            $('#wms-srv-transport-popup').hide();
            if (objectOpenType_TransportDetails != 'self') {
                //  if (globalRecevingObjectType == 'Live') {
                
                    if (StrOrderType == 'Live') {
                        receivingStagingLiveDetails(getOrderId);
                        //loadTransloadList('1');
                    } else {
                        //loadTransloadList('1');
                        receivingStagingTransloadDetails(getOrderId);
                    }
             
            } else {
                loadTransloadList('1');
            }
        } else {
            //alert(result.Message);
            alert('Unable to connect Server!!');
        }
    });
}

// Receving Function
var recStagingTransloadRecordCount = 0;
var globalPalletList = '';
recStagingTransloadRecordCount = 0;
function receivingStagingTransloadDetails(strOrderId) {
    debugger;
    createObjectHead('pnlHeadRecevingStagingTransload', strOrderId, function () {
        $('.gridCellGrnHead').show();
        var apiPath = wmsApiPath + '/Transload/TransloadListReceving';
        var postData = {
            "CompanyId": getCompanyID,
            "WhId": getWarehouseID,
            "CustId": getCustomerId,
            "UserId": getUserId,
            "OrderId": strOrderId
        };
        var getGridBody = '';
        getGridBody = getGridBody + '<div class="wms-srv-grid">';
        // GRID HEADER
        getGridBody = getGridBody + '<div class="wms-srv-grid-header">';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Staging Location</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Pallet</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Pallet Type</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">No of Carton</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">length</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Width</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Height</div>';
       
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Weight</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Remark</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Action</div>';
        getGridBody = getGridBody + '</div>';
        // GRID HEADER
        // GRID ROW
        getGridBody = getGridBody + '<div class="wms-srv-grid-row">';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell wms-srv-container-search">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecTransload_StagingLocation" onkeyup="getStagingLocationSuggestionList(this);" data-id="0" class="wms-srv-grid-cell-input" autocomplete = "off">';
        getGridBody = getGridBody + ' <i class="fas fa-search" onclick="getStagingLocationSuggestionList(this);"></i>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell wms-srv-container-search">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecTransload_Pallet" onkeyup="getPalletSuggestionList(this);" data-id="0" class="wms-srv-grid-cell-input"  autocomplete = "off">';
        getGridBody = getGridBody + ' <i class="fas fa-search" onclick="getPalletSuggestionList(this);"></i>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<select class="wms-srv-grid-cell-input" id="txtRecTransload_PalletType">';
        getGridBody = getGridBody + '<option value="0">--Select--</option>';
        getGridBody = getGridBody + '<option value="1">Internal Pallet</option>';
        getGridBody = getGridBody + '<option value="2">External Pallet</option>';
        getGridBody = getGridBody + '</select>';
        //getGridBody = getGridBody + '<div class="wms-srv-grid-cell">' + globalPalletList + '</div>';
     //   getGridBody = getGridBody + '<div class="wms-srv-grid-cell"> - </div>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecTransload_NoOfCarton" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';

        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecTransload_length" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';

        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecTransload_Width" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecTransload_Height" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';
        
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecTransload_Weight" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecTransload_Remark" class="wms-srv-grid-cell-input"></div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<div class="wms-srv-grid-action">';
        getGridBody = getGridBody + '<button class="wms-srv-input wms-srv-button" title="Save" type="button" onclick="saveRecevingStagingTransloadRecord(' + strOrderId + ');" data-prefix="SV"><i class="fas fa-check-circle"></i><span>Save</span></button>';
        //getGridBody = getGridBody + '<div class="wms-srv-action-sep">|</div>';
       // getGridBody = getGridBody + '<button class="wms-srv-input wms-srv-button " title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '</div>';
        // GRID ROW
        getGridBody = getGridBody + '</div>';

        $('#pnlRecevingStagingTransloadDetails').html(getGridBody);
        callHttpUrl(apiPath, postData, function (data) {
            debugger;
            var getStatusCode = data.StatusCode;
            var isSuccess = data.Success;
            if (getStatusCode == 'Success') 
            {
                try {
                    var myGridList = data.Result;
                    //var myGridList = JSON.parse(getResult);
                    var getReceviningData = myGridList.Table;
                    for (var j = 0; j < getReceviningData.length; j++) {
                        var getTransloadDetailId = getReceviningData[j].TransloadDTId;
                        //var getContainerDock = getReceviningData[j].Dockcode;
                        //var getContainerDockId = getReceviningData[j].DockId;
                        var getContainerPalletTypeId = getReceviningData[j].PalletTypeId;
                        var getContainerPalletType = getReceviningData[j].PalletType;
                        var getContainerNoofcarton = getReceviningData[j].Noofcarton;
                        var getContainerTotWeight = getReceviningData[j].TotWeight;
                        var getContainerRemark = getReceviningData[j].DTRemark;
                        //var getContainerWeightDockLocation = getReceviningData[j].HeadID;
                        //var getContainerTransloadDTIdt = getReceviningData[j].TransloadDTId;
                        var getContainerStagingId = getReceviningData[j].StagingId;
                        var getContainerStagingCode = getReceviningData[j].Stagingcode;
                        var getContainerPalletId = getReceviningData[j].PalletID;
                        var getContainerPalletName = getReceviningData[j].PalletName;
                        //var getContainerCreatedBy = getReceviningData[j].CreatedBy;
                        var getWidth = getReceviningData[j].ToWidth;
                        var getHeight = getReceviningData[j].ToHeight;
                        var getlength = getReceviningData[j].Tolength;


                        var getGridRecord = "";
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-row">';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell wms-srv-container-search">' + getContainerStagingCode + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell wms-srv-container-search">' + getContainerPalletName + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getContainerPalletType + ' </div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getContainerNoofcarton + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getlength + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getWidth + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getHeight + '</div>';
                       
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getContainerTotWeight + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getContainerRemark + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
                        getGridRecord = getGridRecord + '<button class="wms-srv-input wms-srv-button " title="Cancel" data-prefix="CN" type="button" onclick="RemoveReceivingTransloadDetails(' + strOrderId + ', ' + getTransloadDetailId + ');"><i class="fas fa-times-circle" ></i><span>Cancel</span></button>';
                        getGridRecord = getGridRecord + '</div>';
                        getGridRecord = getGridRecord + '</div>';
                        getGridRecord = getGridRecord + '</div>';
                        //Add one emty row
                       
                        $("#pnlRecevingStagingTransloadDetails .wms-srv-grid").append(getGridRecord);
                        var txtStagingLocation = $('#txtRecTransload_StagingLocation').val();
                        if (txtStagingLocation == "")
                        {
                            $("#txtRecTransload_StagingLocation").val(getContainerStagingCode);
                            $("#txtRecTransload_StagingLocation").attr('data-id', getContainerStagingId);
                            $("#txtRecTransload_Pallet").val(getContainerPalletName)
                            $("#txtRecTransload_Pallet").attr('data-id', getContainerPalletId);
                            $("#txtRecTransload_PalletType").val(getContainerPalletTypeId);
                            $("#txtRecTransload_NoOfCarton").val(getContainerNoofcarton);

                            $("#txtRecTransload_Width").val(getWidth);
                            $("#txtRecTransload_Height").val(getHeight);
                            $("#txtRecTransload_length").val(getlength);
                            $("#txtRecTransload_Weight").val(getContainerTotWeight);
                            $("#txtRecTransload_Remark").val(getContainerRemark);
                        }
                    }
                    recStagingTransloadRecordCount = getReceviningData.length;
                } catch (ex) {
                    // do nothing...
                }
            }
            showRecevingStagingTransloadPopup(strOrderId);

        });

        //$('#pnlRecevingStagingTransloadDetails #ddlPalletType').html(globalPalletList);
    });

    }
//}

function RemoveReceivingTransloadDetails(strOrderId, transloadDetailId) {
    debugger;
    if (recStagingTransloadRecordCount > 1) {
        if (confirm("Are you sure you want to remove record?")) {
            var apiPath = wmsApiPath + '/Transload/TranloadRemoveRecDT';
            // var getCustomerId = $("#ddlcustomer").val();
            // var getWarehouseID = $("#ddlwarehouse").val();
            // var getCompanyID = $('#hdnCompanyID').val();
            // var getUserId = $("#hdnUserID").val();

            var postData = {
                "WarehouseId": getWarehouseID,
                "CustomerId": getCustomerId,
                "CompanyID": getCompanyID,
                "UserId": getUserId,
                "TranloadDTId": transloadDetailId
            };
            callHttpUrl(apiPath, postData, function (data) {
                // After success
                var isSuccess = data.Statuscode;
                var docRow = '';
                if (isSuccess == 'Success') {
                    var myJsonObj = data.Result;
                    //var myJsonObj = JSON.parse(getResponse);
                    receivingStagingTransloadDetails(strOrderId);
                } else {
                    alert('Failed to delete document');
                }
                // After success
            });
        }
    } else {
        alert('Please keep atleast one record!!');
    }

}

function saveRecevingStagingTransloadRecord(strOrderId) {
    debugger;
    if (validateTransloadRecevingStagingForm()) {
        var apiPath = wmsApiPath + 'Transload/TranloadSaveRecDT';

        var txtStagingLocation = $('#txtRecTransload_StagingLocation').attr('data-id');
        var txtPallet = $('#txtRecTransload_Pallet').attr('data-id');
        //var txtPalletType = $("#pnlRecevingStagingTransloadDetails #ddlPalletType option:selected").val();;

        var txtPalletType = $('#txtRecTransload_PalletType').val();
        var txtNoOfCarton = $('#txtRecTransload_NoOfCarton').val();
        var txtWidth = $('#txtRecTransload_Width').val();
        var txtHeight = $('#txtRecTransload_Height').val();
        var txtlength = $('#txtRecTransload_length').val();
        var txtWeight = $('#txtRecTransload_Weight').val();
        var txtRemark = $('#txtRecTransload_Remark').val();
      

        var postData = {
            "HeadId": strOrderId,
            "StagingId": txtStagingLocation,
            "DockId": "0",
            "PalletId": txtPallet,
            "PalletType": txtPalletType,
            "Noofcarton": txtNoOfCarton,
            "ToWidth": txtWidth,
            "ToHeight": txtHeight,
            "Tolength": txtlength,
            "TotWeight": txtWeight,
            "Remark": txtRemark,
            "CreatedBy": getUserId
        };
        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.Code;
            var getMessage = data.Message;
            var isSuccess = data.StatusCode;
            var docRow = '';
            if (isSuccess == 'Success') {
                var myJsonObj = data.Result;
                //var myJsonObj = JSON.parse(getResponse);
                //  alert('Save Successfully Enjoy');
                receivingStagingTransloadDetails(strOrderId);
            } else {
                alert('Failed to save document');
            }
            // After success
        });

    }
}

function validateTransloadRecevingStagingForm() {
    debugger;
    var isValid = true;
    var txtStagingLocation = $('#txtRecTransload_StagingLocation').attr('data-id');
   // var txtDockLocation = $('#txtRecTransload_DockLocation').attr('data-id');
    var txtPallet = $('#txtRecTransload_Pallet').attr('data-id');
    var txtPalletType = $('#txtRecTransload_PalletType').val();
    var txtNoOfCarton = $('#txtRecTransload_NoOfCarton').val();
    var txtWeight = $('#txtRecTransload_Weight').val();
    var txtRemark = $('#txtRecTransload_Remark').val();

    var validationMsg = '';
    if (txtStagingLocation == '') {
        validationMsg = 'Please select valid Staging Location!!';
        isValid = false;
    } else  if (txtPallet == '' ) {
        validationMsg = 'Please select valid Pallet!!';
        isValid = false;
    } else  if (txtPalletType == '0' || txtPalletType == '') {
        validationMsg = 'Please select Pallet Type!!';
        isValid = false;
    } else  if (txtNoOfCarton == '') {
        validationMsg = 'Please enter No of Carton!!';
        isValid = false;
    } else if (txtNoOfCarton == '0') {
        validationMsg = 'No of Carton can not be Zero!!';
        isValid = false;
    } else if (txtWeight == '') {
        validationMsg = 'Please enter Weight!!';
        isValid = false;
    } else if (txtWeight == '0') {
        validationMsg = 'Weight can not be Zero!!';
        isValid = false;
    } else if (txtRemark == '') {
        validationMsg = 'Please enter Remark!!';
        isValid = false;
    } 
    if ((!isValid) && (validationMsg != '')) {
        alert(validationMsg);
    }
    return isValid;
}

function showRecevingStagingTransloadPopup(strOrderId) {
    debugger;
    $('#wms-srv-staging-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $("#wms-srv-staging-popup").show();
    $('#btnSaveGrnHead').off();
    /*$('#btnSaveGrnHead').click(function () {
       // saveGrnStagingHead(strOrderId);
    });*/
    $("#wms-srv-staging-popup-close").off();
    $("#wms-srv-staging-popup-close").click(function () {
        $('#wms-srv-staging-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-staging-popup').hide();
        loadTransloadList('1');
    });
}

//REceving Staging Javascript

var recStagingLiveRecordCount = 0;
var globalPalletList = '';
var getDockTranId;
var getDockTransName;
function receivingStagingLiveDetails(strOrderId) {
    debugger;
    recStagingLiveRecordCount = 0;
    createObjectHead('pnlHeadRecevingStagingLive', strOrderId, function () {
        $('.gridCellGrnHead').show();
        var apiPath = wmsApiPath + '/Transload/TransloadListReceving';
    
        var postData = {
            "CompanyId": getCompanyID,
            "WhId": getWarehouseID,
            "CustId": getCustomerId,
            "UserId": getUserId,
            "OrderId": strOrderId
        };
        var getGridBody = '';
        getGridBody = getGridBody + '<div class="wms-srv-grid">';
        // GRID HEADER
        getGridBody = getGridBody + '<div class="wms-srv-grid-header">';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Dock Location</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Pallet</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Pallet Type</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">No of Carton</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">length</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Width</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Height</div>';
      
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Weight</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Remark</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Action</div>';
        getGridBody = getGridBody + '</div>';
        // GRID HEADER
        // GRID ROW
        getGridBody = getGridBody + '<div class="wms-srv-grid-row">';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell wms-srv-container-search">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecLive_DockLocation" onkeyup="getDockSuggestionList(this);" data-id="0" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + ' <i class="fas fa-search"></i>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell wms-srv-container-search">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecLive_Pallet" onkeyup="getPalletSuggestionList(this);" data-id="0" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + ' <i class="fas fa-search"></i>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<select class="wms-srv-grid-cell-input" id="txtRecLive_PalletType">';
        getGridBody = getGridBody + '<option value="0">--Select--</option>';
        getGridBody = getGridBody + '<option value="1">Internal Pallet</option>';
        getGridBody = getGridBody + '<option value="2">External Pallet</option>';
        getGridBody = getGridBody + '</select>';
        getGridBody = getGridBody + '</div>';
        //getGridBody = getGridBody + '<div class="wms-srv-grid-cell">' + globalPalletList + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecLive_NoOfCarton" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';
        //getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        //getGridBody = getGridBody + '<input type="text" value="" id="txtRecLive_Weight" class="wms-srv-grid-cell-input">';
        //getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecLiveTransload_length" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecLiveTransload_Width" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecLiveTransload_Height" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';
        
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecLiveTransload_Weight" class="wms-srv-grid-cell-input">';
        getGridBody = getGridBody + '</div>';

        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<input type="text" value="" id="txtRecLive_Remark" class="wms-srv-grid-cell-input"></div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">';
        getGridBody = getGridBody + '<div class="wms-srv-grid-action">';
        getGridBody = getGridBody + '<button class="wms-srv-input wms-srv-button" title="Save" type="button" onclick="saveRecevingStagingLiveRecord(' + strOrderId +');" data-prefix="SV"><i class="fas fa-check-circle"></i><span>Save</span></button>';
       // getGridBody = getGridBody + '<div class="wms-srv-action-sep">|</div>';
        //getGridBody = getGridBody + '<button class="wms-srv-input wms-srv-button " title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '</div>';
        getGridBody = getGridBody + '</div>';
        // GRID ROW
        getGridBody = getGridBody + '</div>';

        $('#pnlRecevingStagingLiveDetails').html(getGridBody);
        callHttpUrl(apiPath, postData, function (data) {
            var getStatusCode = data.Status;
            var isSuccess = data.StatusCode;
            
            if (isSuccess == 'Success') {
                try {
                    var myGridList = data.Result;
                    //var myGridList = JSON.parse(getResult);
                    var getReceviningData = myGridList.Table;
                    for (var j = 0; j < getReceviningData.length; j++) {
                        var getTransloadDetailId = getReceviningData[j].TransloadDTId;
                        var getContainerDock = getReceviningData[j].Dockcode;
                        var getContainerDockId = getReceviningData[j].DockId;
                        var getContainerPalletTypeId = getReceviningData[j].PalletTypeId;
                        var ContainerPalletTypeId = getReceviningData[j].PalletTypeId;
                        var getContainerPalletType = getReceviningData[j].PalletType;
                        var getContainerNoofcarton = getReceviningData[j].Noofcarton;
                        var getContainerTotWeight = getReceviningData[j].TotWeight;
                        var getContainerRemark = getReceviningData[j].DTRemark;
                        var getContainerWeightDockLocation = getReceviningData[j].HeadID;
                        var getContainerTransloadDTIdt = getReceviningData[j].TransloadDTId;
                        var getContainerStagingId = getReceviningData[j].StagingId;
                        var getContainerPalletId = getReceviningData[j].PalletID;
                        var getContainerPalletName = getReceviningData[j].PalletName;
                        var getContainerCreatedBy = getReceviningData[j].CreatedBy;
                        var getWidth = getReceviningData[j].ToWidth;
                        var getHeight = getReceviningData[j].ToHeight;
                        var getlength = getReceviningData[j].Tolength;

                        var getGridRecord = "";
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-row">';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell wms-srv-container-search">' + getContainerDock + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell wms-srv-container-search">' + getContainerPalletName + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getContainerPalletType + ' </div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getContainerNoofcarton + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getlength + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getWidth + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getHeight + '</div>';
                      
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getContainerTotWeight + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getContainerRemark + '</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
                        getGridRecord = getGridRecord + '<button class="wms-srv-input wms-srv-button " title="Cancel" data-prefix="CN" type="button" onclick="RemoveReceivingLiveDetails(' + strOrderId + ', ' + getTransloadDetailId + ');"><i class="fas fa-times-circle" ></i><span>Cancel</span></button>';
                        getGridRecord = getGridRecord + '</div>';
                        getGridRecord = getGridRecord + '</div>';
                        getGridRecord = getGridRecord + '</div>';
                        //Add one emty row

                        $("#pnlRecevingStagingLiveDetails .wms-srv-grid").append(getGridRecord);

                        var txtRecLive_DockLocation = $('#txtRecLive_DockLocation').val();
                        if (txtRecLive_DockLocation == "") {

                            $('#txtRecLive_DockLocation').val(getContainerDock);
                            $('#txtRecLive_DockLocation').attr('data-id', getContainerDockId);
                            $("#txtRecLive_NoOfCarton").val(getContainerNoofcarton);
                            $("#txtRecLive_Pallet").val(getContainerPalletName)
                            $("#txtRecLive_Pallet").attr('data-id', getContainerPalletId);
                            $("#txtRecLive_PalletType").val(getContainerPalletTypeId);
                            //$("#txtRecLive_Pallet").val(getContainerNoofcarton);

                            $("#txtRecLiveTransload_Width").val(getWidth);
                            $("#txtRecLiveTransload_Height").val(getHeight);
                            $("#txtRecLiveTransload_length").val(getlength);
                            $("#txtRecLiveTransload_Weight").val(getContainerTotWeight);
                            $("#txtRecLive_Remark").val(getContainerRemark);
                        }
                    }
                    /*if (globalDockIdforlive != "") {
                        $("#txtRecLive_DockLocation").val(gblobalDocNameforlive);
                        $("#txtRecLive_DockLocation").attr('data-id', globalDockIdforlive);
                    }*/
                    recStagingLiveRecordCount = getReceviningData.length;
                } catch (ex) {
                    // do nothing...
                }
            }
            showRecevingStagingLivePopup(strOrderId);
        });
        //$('#pnlRecevingStagingLiveDetails #ddlPalletType').html(globalPalletList);
    });
}

function RemoveReceivingLiveDetails(strOrderId, transloadDetailId) {
    debugger;
    if (recStagingLiveRecordCount > 1) {
        if (confirm("Are you sure you want to remove record?")) {
            //var apiPath = wmsApiPath + 'TranloadRemove_RecDT';
            var apiPath = wmsApiPath + '/Transload/TranloadRemove_RecDT';
                              
            var postData = {
                "WarehouseId": getWarehouseID,
                "CustomerId": getCustomerId,
                "CompanyID": getCompanyID,
                "UserId": getUserId,
                "TranloadDTId": transloadDetailId
            };
            callHttpUrl(apiPath, postData, function (data) {
                // After success
                var isSuccess = data.Statuscode;
                var docRow = '';
                if (isSuccess == 'Success') {
                    var getResponse = data.Result;
                    //var myJsonObj = JSON.parse(getResponse);
                    receivingStagingLiveDetails(strOrderId);
                } else {
                    alert('Failed to delete document');
                }
                // After success
            });
        }
    } else {
        alert('Please keep atleast one record!!');
    }
    
}

function saveRecevingStagingLiveRecord(strOrderId) {
    debugger;
    if (validateLiveRecevingStagingForm()) {
        var apiPath = wmsApiPath + 'Transload/TranloadSaveRecDT';

        var txtDockLocation = $('#txtRecLive_DockLocation').attr('data-id');
        var isfinalSave = "False";
        if (globalDockIdforlive != '0') {
        if (globalDockIdforlive != txtDockLocation) {
            if (confirm('Previous Dock location (' + gblobalDocNameforlive + ') and you have selected dock location (' + $('#txtRecLive_DockLocation').val() + ') are difference!! Do you want to continue..')) {
                isfinalSave = "True";
            }
            } else { isfinalSave = "True"; }
        }
        else { isfinalSave = "True"; }
        if (isfinalSave == "True") {
            var txtPallet = $('#txtRecLive_Pallet').attr('data-id');
            var txtPalletType = $('#txtRecLive_PalletType').val();
            var txtNoOfCarton = $('#txtRecLive_NoOfCarton').val();
            var txtWidth = $('#txtRecLiveTransload_Width').val();
            var txtHeight = $('#txtRecLiveTransload_Height').val();
            var txtlength = $('#txtRecLiveTransload_length').val();
            //var txtWeight = $('#txtRecLive_Weight').val();//txtRecLiveTransload_Weight
            var txtWeight = $('#txtRecLiveTransload_Weight').val();
            var txtRemark = $('#txtRecLive_Remark').val();
        
            var postData = {
                "HeadId": strOrderId,
                "StagingId": "0",
                "DockId": txtDockLocation,
                "PalletId": txtPallet,
                "PalletType": txtPalletType,
                "Noofcarton": txtNoOfCarton,
                "ToWidth": txtWidth,
                "ToHeight": txtHeight,
                "Tolength": txtlength,
                "TotWeight": txtWeight,
                "Remark": txtRemark,
                "CreatedBy": getUserId
            };
            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.Status;
                var getMessage = result.Message;
                var isSuccess = result.StatusCode;
                var docRow = '';
                if (isSuccess == 'Success') {
                    var myJsonObj = result.Result;
                    //var myJsonObj = JSON.parse(getResponse);
                    //  alert('Save Successfully Enjoy');
                    receivingStagingLiveDetails(strOrderId);
                } else {
                    alert('Failed to save record');
                }
                // After success
            });
        }
    }
}

function validateLiveRecevingStagingForm() {
    debugger;
    var isValid = true;
    var txtDockLocation = $('#txtRecLive_DockLocation').attr('data-id');
    var txtPallet = $('#txtRecLive_Pallet').attr('data-id');
    var txtPalletType = $('#txtRecLive_PalletType').val();
    var txtNoOfCarton = $('#txtRecLive_NoOfCarton').val();
    var txtWeight = $('#txtRecLive_Weight').val();
    var txtRemark = $('#txtRecLive_Remark').val();

    var validationMsg = '';
    if (txtDockLocation == '' || txtDockLocation == '0') {
        validationMsg = 'Please select valid Dock Location!!';
        isValid = false;
    } else if (txtPallet == '' || txtPallet == '0') {
        validationMsg = 'Please select valid Pallet!!';
        isValid = false;
    } else if (txtPalletType == '0') {
        validationMsg = 'Please select Pallet Type!!';
        isValid = false;
    } else if (txtNoOfCarton == '') {
        validationMsg = 'Please enter No of Carton!!';
        isValid = false;
    } else if (txtNoOfCarton == '0') {
        validationMsg = 'No of Carton can not be Zero!!';
        isValid = false;
    } else if (txtWeight == '') {
        validationMsg = 'Please enter Weight!!';
        isValid = false;
    } else if (txtWeight == '0') {
        validationMsg = 'Weight can not be Zero!!';
        isValid = false;
    } else if (txtRemark == '') {
        validationMsg = 'Please enter Remark!!';
        isValid = false;
    }
    if ((!isValid) && (validationMsg != '')) {
        alert(validationMsg);
    }
    //alert(validationMsg);
    return isValid;
}

function showRecevingStagingLivePopup(strOrderId) {
    debugger;
    $('#wms-srv-staging-live-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $("#wms-srv-staging-live-popup").show();
    $('#btnSaveGrnHead').off();
    $('#btnSaveGrnHead').click(function () {
        saveGrnLiveHead(strOrderId);
    });
    $("#wms-srv-staging-live-popup-close").off();
    $("#wms-srv-staging-live-popup-close").click(function () {
        $('#wms-srv-staging-live-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-staging-live-popup').hide();
        loadTransloadList('1');
    });
}

function saveGrnLiveHead(strOrderId) {
    debugger;
    var apiPath = apiServerPath + 'TranloadSave_Receiving';
    var txtRecevingDate = $('#txtGrnHeadRecevingDate').val();
    var txtRemark = $('#txtGrnHeadRemark').val();
    var postData = {
        "HeadId": strOrderId,
        "ReceivedDate": txtRecevingDate,
        "Statuscode": "0",
        "Remark": txtRemark,
        "ReceivedBy": getUserId,
        "OrderType": "Live"
    };
    callHttpUrl(apiPath, postData, function (result) {
        // After success
        var getCode = result.Code;
        var getMessage = result.Message;
        var isSuccess = result.Statuscode;
        if (isSuccess == 'Success') {
            var getResponse = result.Result;
            //var myJsonObj = JSON.parse(getResponse);
            receivingStagingTransloadDetails(strOrderId);
        } else {
            alert('Failed to save document');
        }
        // After success
    });
}

//Transload Dispatch
var getDockTranId = '';
var getDockTransName;
function showDispatchDetails(strOrderId) {
    debugger;
    recStagingLiveRecordCount = 0;
    generateDispatchForm(strOrderId);
    createObjectHead('pnlHeadStagingDispatch', strOrderId, function () {
        var apiPath = wmsApiPath + '/Transload/GetDispatchDetails';

        var postData = {
            "CompanyId": getCompanyID,
            "whId": getWarehouseID,
            "custId": getCustomerId,
            "userId": getUserId,
            "OrderId": strOrderId,
            "OrderDTId": "0"
        };
        var getGridBody = '';
        getGridBody = getGridBody + '<div class="wms-srv-grid">';
        // GRID HEADER
        getGridBody = getGridBody + '<div class="wms-srv-grid-header">';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Pallet</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Order Reference No. </div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">No of Boxes</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Dock</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell">Status</div>';
        getGridBody = getGridBody + '<div class="wms-srv-grid-cell" style="width:50px;">Action</div>';
        getGridBody = getGridBody + '</div>';
        // GRID HEADER
       
        getGridBody = getGridBody + '</div>';

        $('#pnlTransloadDispatchDetails').html(getGridBody);
        callHttpUrl(apiPath, postData, function (data) {
            var getStatusCode = data.Code;
            var isSuccess = data.StatusCode;
            if (isSuccess == 'Success') {
                try {
                    var getReceviningData = data.Result.Table;
                    // var myGridList = JSON.parse(getResult);
                    // var getReceviningData = myGridList.jsonObject.Table;
                  
                    var NoofDockScan = 0;
                    for (var j = 0; j < getReceviningData.length; j++) {
                        var getPalletID = getReceviningData[j].PalletID;
                        var getPalletName = getReceviningData[j].PalletName;
                        var getNoofcarton = getReceviningData[j].Noofcarton;
                        var getDockName= getReceviningData[j].DockName;
                        var getfinalStatus = getReceviningData[j].finalStatus;
                        var getOrderRefNo = getReceviningData[j].OrderRefNo;
                        var getTransloadDTId = getReceviningData[j].ORDERDTID;

                        getDockTranId = getReceviningData[j].DockTranId;
                        
                         getDockTransName = getReceviningData[j].DockTransName;

                        var getGridRecord = "";
                        // GRID ROW
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-row">';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getPalletName +'</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getOrderRefNo +'</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getNoofcarton +'</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">' + getDockName +'</div>';
                        getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">';
                        if (getfinalStatus == 'Shipped') {
                            NoofDockScan = NoofDockScan + 1;
                            //getGridRecord = getGridRecord + '<i class="fas fa-check-circle wms-srv-shipped"></i > ' + getfinalStatus;
                            getGridRecord = getGridRecord + '<i class="fas fa-check-circle wms-srv-shipped"></i> ';

                            getGridRecord = getGridRecord + '</div>';
                           // getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><i class="fas fa-times-circle"></i></div></div>';
                            getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button" title="Remove" data-prefix="CN" type="button" onclick="OrderRemoveDetails(' + strOrderId + ', ' + getTransloadDTId + ', ' + getPalletID + ');"><i class="fas fa-times-circle"></i><span>Remove</span></button></div></div>';
                            getGridRecord = getGridRecord + '</div>';
                        } else {
                            getGridRecord = getGridRecord + getfinalStatus;
                        }

                       // getGridRecord = getGridRecord + '</div>';
                       // getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><i class="fas fa-times-circle"></i></div></div>';
                       // getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button" title="Remove" data-prefix="CN" type="button" onclick="OrderRemoveDetails(' + strOrderId + ', ' + getTransloadDTId + ', ' + getPalletID + ');"><i class="fas fa-times-circle"></i><span>Remove</span></button></div></div>';
                       // getGridRecord = getGridRecord + '</div>';
	                    // GRID ROW
                        //Add one emty row

                        $("#pnlTransloadDispatchDetails .wms-srv-grid").append(getGridRecord);
                       
                        
                    }
                    $('#txtDispatchDock').val(getDockTransName);
                    $('#txtDispatchDock').attr('data-id', getDockTranId);
                    $('#Pallettno').html('Pallet:' + NoofDockScan + '/' + getReceviningData.length);
                    $('#OrderId').html(strOrderId);
                    recStagingLiveRecordCount = getReceviningData.length;
                }
                 catch (ex) {
                    // do nothing...
                }
            }
            showDispatchPopup();
           // showRecevingStagingLivePopup(strOrderId);
        });
    });
}

function saveStagingList() {
    debugger;
    
    //if (validateDispatchForm()) {    
        var apiPath = wmsApiPath + '/Transload/SaveDispatchHead';
        var strOrderId = $("#OrderId").html();
        var postData = {
            "TranloadId": strOrderId,
            "TranloadDTId":"0"
        };
        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.Code;
            var isSuccess = data.data;
            if (isSuccess =='Success') {
                var getReceviningData = data.Result;
                //var myJsonObj = JSON.parse(getResponse);
                //var myGridList = JSON.parse(getResult);
                if (getReceviningData != "") {
                    var getGridRecord = "";
                    // GRID ROW
                    getGridRecord = getGridRecord + '<div class="wms-srv-grid-row">';
                    getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell style="display:none;"></div>';
                    getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell" style="display:none;"></div>';
                    getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell" style="display:none;"></div>';
                    getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell" style="display:none;"></div>';
                    getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell">';
                   // if (getfinalStatus == 'Shipped') {
                      //  NoofDockScan = NoofDockScan + 1;
                        //getGridRecord = getGridRecord + '<i class="fas fa-check-circle wms-srv-shipped"></i > ' + getfinalStatus;
                    getGridRecord = getGridRecord + '<i class="fas fa-check-circle wms-srv-shipped"></i> ' + "Shipped";
                   /*} else {


                        getGridRecord = getGridRecord + getfinalStatus;
                    }*/

                    getGridRecord = getGridRecord + '</div>';
                    // getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><i class="fas fa-times-circle"></i></div></div>';
                   // getGridRecord = getGridRecord + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button" title="Remove" data-prefix="CN" type="button" onclick="OrderRemoveDetails(' + strOrderId + ', ' + getTransloadDTId + ', ' + getPalletID + ');"><i class="fas fa-times-circle"></i><span>Remove</span></button></div></div>';
                    getGridRecord = getGridRecord + '</div>';

                    alert('Shipped All Pallet!!');
                   // showDispatchDetails(strOrderId);
                    $('#wms-srv-dispatch-popup').hide();
                    loadTransloadList('1');
                } else {
                    showDispatchDetails(strOrderId);
                }
          
            } else {
                alert('Unable to connect Server!!');
            }
            // After success
        });
   // }
}

function OrderRemoveDetails(strOrderId, OrderDTId, PalletID) {
    debugger;
    if (confirm("Are you sure you want to remove record?")) {
        var apiPath = wmsApiPath + '/Transload/RemoveDockIdStatus';
       
        var getDispatchDockId = $('#txtDispatchDock').attr('data-id');
        var getDispatchPalletId = $('#txtDispatchPallet').attr('data-id');

        var postData = {
            "WarehouseId": getWarehouseID,
            "CustomerId": getCustomerId,
            "CompanyID": getCompanyID,
            "UserId": getUserId,
            "TranloadDTId": OrderDTId,
            "DockID": getDispatchDockId,
            //"PalletId": getDispatchPalletId,
            "PalletId": PalletID,
            "TranloadId": strOrderId
        };
        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.Code;
            var isSuccess = data.StatusCode;
            if (isSuccess == 'Success') {
                //var getResponse = result.Response;
                //var myJsonObj = JSON.parse(getResponse);
                alert('Record Deleted!!');
                showDispatchDetails(strOrderId);
            } else {
                alert('Unable to connect Server!!');
            }
            // After success
        });
    }
}
function showDispatchPopup() {
    debugger;
    $('#wms-srv-dispatch-popup').show();
    
    $('#wms-srv-dispatch-popup-close').off();
    $('#wms-srv-dispatch-popup-close').click(function () {
        $('#wms-srv-dispatch-popup').hide();
        loadTransloadList('1');
    });
}

function saveDispatchDetails(strOrderId) {
    debugger;
    if (validateDispatchForm()) {
        var getDispatchDockId = $('#txtDispatchDock').attr('data-id');
        var isfinalSave = "False";
        if (getDockTranId != '0') {
            if (getDockTranId != getDispatchDockId) {
                if (confirm('Previous Dock location (' + getDockTransName + ') and you have selected dock location (' + $('#txtDispatchDock').val() + ') are difference!! Do you want to continue..')) {
                    isfinalSave = "True";
                }
            } else { isfinalSave = "True"; }

        } else { isfinalSave = "True"; }
        if (isfinalSave == "True") {
            var apiPath = wmsApiPath + '/Transload/UpdateDockIdStatus';
        

            var getDispatchDockId = $('#txtDispatchDock').attr('data-id');
            var getDispatchPalletId = $('#txtDispatchPallet').attr('data-id');

            var postData = {
                "CompanyID": getCompanyID,
                "WarehouseId": getWarehouseID,
                "CustomerId": getCustomerId,
                "UserId": getUserId,
                "TranloadDTId": "0",
                "DockID": getDispatchDockId,
                "PalletId": getDispatchPalletId,
                "TranloadId": strOrderId
            };

            callHttpUrl(apiPath, postData, function (data) {
                // After success
                var getCode = data.Code;
                var getMessage = data.Message;
                var isSuccess = data.StatusCode;
                alert(isSuccess);
                if (isSuccess == 'Success') {
                    var myJsonObj = data.Result;
                    //var myJsonObj = JSON.parse(getResponse);
                    var getReceviningData = myJsonObj;
                    if (getReceviningData == "-1") {
                        alert('The scanned pallet is not present in receiving');
                       // showDispatchDetails(strOrderId);
                    } else {
                        showDispatchDetails(strOrderId);
                    }
                    
                } else {
                    alert('Failed to save record');
                }
                // After success
            });

        }


        
    }
}

function validateDispatchForm() {
    debugger;
    var getDispatchDockId = $('#txtDispatchDock').attr('data-id');
    var getDispatchPalletId = $('#txtPalletDock').attr('data-id');
    var isValid = true;
    var validationMsg = '';
    if (getDispatchDockId == '' || getDispatchDockId == '0') {
        validationMsg = 'Please select valid Dock Location!!';
        isValid = false;
    } else if (getDispatchPalletId == '' || getDispatchPalletId == '0') {
        validationMsg = 'Please select valid Pallet!!';
        isValid = false;
    }
    if ((!isValid) && (validationMsg != '')) {
        alert(validationMsg);
    }
    return isValid;
}

function generateDispatchForm(strOrderId) {
    debugger;
    var dispatchForm = '';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid">';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid-header">';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid-cell">Dock</div>';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid-cell">Pallet</div>';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid-cell">Action</div>';
    dispatchForm = dispatchForm + '</div>';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid-row">';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" id="txtDispatchDock" value="" onkeyup="getDockSuggestionList(this);" class="wms-srv-grid-cell-input" /> <i class="fas fa-search" onclick="getDockSuggestionList(this);"></i></div>';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" value="" id="txtDispatchPallet" onkeyup="getPalletSuggestionList(this);" class="wms-srv-grid-cell-input" /> <i class="fas fa-search" onclick="getPalletSuggestionList(this);"></i></div>';
    dispatchForm = dispatchForm + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><a href="#" onclick="saveDispatchDetails(' + strOrderId +');return false;"><i class="fas fa-check-circle"></i></a></div></div></div>';
    dispatchForm = dispatchForm + '</div>';

    $('#pnlHeadDispatchForm').html(dispatchForm);
}


//Stagging Transport

var objectOpenType_StagingTransportDetails = 'self';

function StagingDetails() {
    $('#wms-srv-dispatch-popup').show();
    $('#wms-srv-dispatch-popup-close').off();
    $('#wms-srv-dispatch-popup-close').click(function () {
        $('#wms-srv-dispatch-popup').hide();
    });
}

function getStateByCountry() {
    var getCountryId = $('#txtDisTrnsCountry').val();
    //var getCountryIndex = country_arr.indexOf(getCountryId);
    var getCountryIndex = document.getElementById('txtDisTrnsCountry').selectedIndex;
    print_state('txtDisTrnsState', getCountryIndex);
}

function openDispatchTransport(strOrderId, openObjType) {
    debugger;
    objectOpenType_StagingTransportDetails = openObjType;
    if (objectOpenType_StagingTransportDetails != 'self') {
        $('#btnSaveStagingTransport span').html('Next');
    } else {
        $('#btnSaveStagingTransport span').html('Save');
    }
    createObjectHead('pnlHeadDispatchTransport', strOrderId, function () {
        $('#btnSaveStagingTransport').attr('data-id', strOrderId);
        $('#wms-srv-disptransport-popup').attr('data-id', strOrderId);
        print_country('txtDisTrnsCountry');
        GetStagingTransportDetails();
      
    });
}

function GetStagingTransportDetails() {
    debugger;
    var getOrderId = $('#wms-srv-disptransport-popup').attr('data-id');
    var apiPath = wmsApiPath + 'GetStagingTraDetail';

    var postData = {
        CompanyId: getCompanyID,
        WhId: getWarehouseID,
        CustId: getCustomerId,
        UserId: getUserId,
        OrderId: getOrderId

    };
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            var myGridList = data.Result;
            
            var getClientCode = myGridList.Table[0].ClientCode;
            var getAddress1 = myGridList.Table[0].Address1;
            var getAddress2 = myGridList.Table[0].Address2;
            var getCountry = myGridList.Table[0].Country;
            var getState = myGridList.Table[0].State;
            var getCity = myGridList.Table[0].City;
            var getZipCode = myGridList.Table[0].ZipCode;
            var getEmailId = myGridList.Table[0].EmailId;
            var getPhoneNo = myGridList.Table[0].PhoneNo;
            var getappointmentdetail = myGridList.Table[0].appointmentdetail;
            var getappointmentdate = myGridList.Table[0].appointmentdate;
            var gettrailerDT = myGridList.Table[0].trailerDT;
            var gettransporternameDT = myGridList.Table[0].transporternameDT;
            var gettransremarkDT = myGridList.Table[0].transremarkDT;
            var getdocknoDT = myGridList.Table[0].docknoDT;
            var getairwaybillDT = myGridList.Table[0].airwaybillDT;
            var getshippingtypeDT = myGridList.Table[0].shippingtypeDT;
            var getshippingdateDT = myGridList.Table[0].shippingdateDT;
            var getexpdeldateDT = myGridList.Table[0].expdeldateDT;
            var getLrnoDT = myGridList.Table[0].LrnoDT;
            var getintimeDT = myGridList.Table[0].intimeDT;
            var getouttimeDT = myGridList.Table[0].outtimeDT;
            var getdrivername = myGridList.Table[0].drivername;
            var getsealnoDT = myGridList.Table[0].sealnoDT;
            var getbillofladingno = myGridList.Table[0].billofladingno;
            var getpronumber = myGridList.Table[0].pronumber;
            var getfreightchaarges = myGridList.Table[0].freightchaarges;
            var getmasterbilloflading = myGridList.Table[0].masterbilloflading;
            var getcodamount = myGridList.Table[0].codamount;
            var getfeeterm = myGridList.Table[0].feeterm;
            var gettrailerloadedby = myGridList.Table[0].trailerloadedby;
            var getfreightcounteby = myGridList.Table[0].freightcounteby;
            var getcountedtype = myGridList.Table[0].countedtype;
            var getDispatchPlan = myGridList.Table[0].DispatchPlan;
            var getShipmentTrackingNo = myGridList.Table[0].ShipmentTrackingNo;

            var getCurrentDate = isBlankDate('');

            if (getappointmentdate == '') {
                getappointmentdate = getCurrentDate;
            }
            if (getshippingdateDT == '') {
                getshippingdateDT = getCurrentDate;
            }
            if (getexpdeldateDT == '') {
                getexpdeldateDT = getCurrentDate;
            }

            if (getCountry == '') {
                getCountry = '0';
            }
            if (getState == '') {
                getState = '0';
            }

            $("#txtClientCode").val(getClientCode);
            $("#txtAddress1").val(getAddress1);
            $("#txtAddress2").val(getAddress2);
            $("#txtDisTrnsCountry").val(getCountry);
            $("#txtDisTrnsState").val(getState);
            $("#txtCity").val(getCity);
            $("#txtZipCode").val(getZipCode);
            $("#txtEmailId").val(getEmailId);
            $("#txtPhoneNo").val(getPhoneNo);
            $("#txtAppointmentDetails").val(getappointmentdetail);
            $("#txtAppointmentDate").val(formatCustomDate(getappointmentdate));
            $("#txtSTrailer").val(gettrailerDT);
            $("#txtSTransporterName").val(gettransporternameDT);
            $("#txtSTransporterRemark").val(gettransremarkDT);
            $("#txtSDockNo").val(getdocknoDT);
            $("#txtAirwayBillNo").val(getairwaybillDT);
            $("#txtSShippingType").val(getshippingtypeDT);
            $("#txtSShippingDate").val(formatCustomDate(getshippingdateDT));
            $("#txtExpShipDate").val(formatCustomDate(getexpdeldateDT));
            $("#txtSLRNo").val(getLrnoDT);
            $("#txtSInTime").val(getintimeDT);
            $("#txtSOutTime").val(getouttimeDT);
            $("#txtDriverName").val(getdrivername);
            $("#txtSealNo").val(getsealnoDT);
            $("#txtBillofLadingNo").val(getbillofladingno);
            $("#txtPRONumber").val(getpronumber);
            $("#txtFREIGHTCharges").val(getfreightchaarges);
            $("#txtMasterBillofLading").val(getmasterbilloflading);
            $("#txtCODAmount").val(getcodamount);
            $("#txtFeeTerms").val(getfeeterm);
            $("#txtTrailerLoadedBy").val(gettrailerloadedby);
            $("#txtFrieghtCountedBy").val(getfreightcounteby);
            $("#txtCountedBy").val(getcountedtype);
            $("#txtDispatchPlan").val(getDispatchPlan);
            $("#txtShipmentTrackingNo").val(getShipmentTrackingNo);

        } else {
            alert('Unable to connect Server!!');
        }
        $('#wms-srv-disptransport-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
        $('#wms-srv-disptransport-popup').show();
        $('#wms-srv-disptransport-popup-close').off();
        $('#wms-srv-disptransport-popup-close').click(function () {
            $('#wms-srv-disptransport-popup .wms-srv-datepicker').datepicker('destroy');
            $('#wms-srv-disptransport-popup').hide();
            loadTransloadList('1');
        });
    });
}

function saveStagingTransport() {
    debugger;
    var getOrderId = $('#btnSaveStagingTransport').attr('data-id');
    var apiPath = wmsApiPath + 'UpdateStagingTraDetail';

   // var StrClientCode = $("#txtClientCode").val();
    var StrClientCode = $("#txtClientCode").attr('data-id');
    //var StrAddress1 = $("#txtAddress1").val();
    var StrAddress1 = $("#txtAddress1").attr('data-id');

    var StrAddress2 = $("#txtAddress2").val();
    var StrCountry = $("#txtDisTrnsCountry").val();
    //var StrCountry = $("#txtDisTrnsCountry").attr('data-id');
    var StrState = $("#txtDisTrnsState").val();
    //var StrState = $("#txtDisTrnsState").attr('data-id');
    var StrCity = $("#txtCity").val();
    var StrZipCode = $("#txtZipCode").val();
    var StrEmailId = $("#txtEmailId").val();
    var StrPhoneNo = $("#txtPhoneNo").val();
    var StrAppointmentDetails = $("#txtAppointmentDetails").val();
    var StrAppointmentDate = $("#txtAppointmentDate").val();
    var StrSTrailer = $("#txtSTrailer").val();

    // var StrSTransporterName = $("#txtSTransporterName").val();
    var StrSTransporterName = $("#txtSTransporterName").attr('data-id');

    var StrSTransporterRemark = $("#txtSTransporterRemark").val();
    var StrSDockNo = $("#txtSDockNo").val();
    //var StrSDockNo = $("#txtSDockNo").attr('data-id');
    var StrAirwayBillNo = $("#txtAirwayBillNo").val();
    var StrSShippingType = $("#txtSShippingType").val();
    var StrSShippingDate = $("#txtSShippingDate").val();
    var StrExpShipDate = $("#txtExpShipDate").val();
    var StrSLRNo = $("#txtSLRNo").val();
    var StrSInTime = $("#txtSInTime").val();
    var StrSOutTime = $("#txtSOutTime").val();
    var StrDriverName = $("#txtDriverName").val();
    var StrSealNo = $("#txtSealNo").val();
    var StrBillofLadingNo = $("#txtBillofLadingNo").val();
    var StrPRONumber = $("#txtPRONumber").val();
    var StrFREIGHTCharges = $("#txtFREIGHTCharges").val();
    var StrMasterBillofLading = $("#txtMasterBillofLading").val();
    var StrCODAmount = $("#txtCODAmount").val();
    var StrFeeTerms = $("#txtFeeTerms").val();
    var StrTrailerLoadedBy = $("#txtTrailerLoadedBy").val();
    var StrFrieghtCountedBy = $("#txtFrieghtCountedBy").val();
    var StrCountedBy = $("#txtCountedBy").val();
    var StrDispatchPlan = $("#txtDispatchPlan").val();
    var StrShipmentTrackingNo = $("#txtShipmentTrackingNo").val();

    var postData = {
        Id: getOrderId,
        ClientCode: StrClientCode,
        Address1: StrAddress1,
        Address2: StrAddress2,
        Country: StrCountry,
        State: StrState,
        City: StrCity,
        ZipCode: StrZipCode,
        EmailId: StrEmailId,
        PhoneNo: StrPhoneNo,
        appointmentdetail: StrAppointmentDetails,
        appointmentdate: StrAppointmentDate,
        trailerDT: StrSTrailer,
        transporternameDT: StrSTransporterName,
        transremarkDT: StrSTransporterRemark,
        docknoDT: StrSDockNo,
        airwaybillDT: StrAirwayBillNo,
        shippingtypeDT: StrSShippingType,
        shippingdateDT: StrSShippingDate,
        expdeldateDT: StrExpShipDate,
        LrnoDT: StrSLRNo,
        intimeDT: StrSInTime,
        outtimeDT: StrSOutTime,
        drivername: StrDriverName,
        sealnoDT: StrSealNo,
        billofladingno: StrBillofLadingNo,
        pronumber: StrPRONumber,
        freightchaarges: StrFREIGHTCharges,
        masterbilloflading: StrMasterBillofLading,
        codamount: StrCODAmount,
        feeterm: StrFeeTerms,
        trailerloadedby: StrTrailerLoadedBy,
        freightcounteby: StrFrieghtCountedBy,
        countedtype: StrCountedBy,
        DispatchPlan: StrDispatchPlan,
        ShipmentTrackingNo: StrShipmentTrackingNo,
        UserId: getUserId

    };
    callHttpUrl(apiPath, postData, function (data) {
        var isSuccess = data.StatusCode;
        if (isSuccess == 'Success') {
            alert('Staging Transload Details Saved Successfully!!');
            $('#wms-srv-disptransport-popup .wms-srv-datepicker').datepicker('destroy');
            $('#wms-srv-disptransport-popup').hide();
            if (objectOpenType_StagingTransportDetails != 'self') {
                receivingStagingLiveDetails(getOrderId);
            }
        } else {
            alert('StagingTraDetail Unable to connect Server!!');
        }
    });
}