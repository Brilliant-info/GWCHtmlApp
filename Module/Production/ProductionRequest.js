// function initProductionRequest()
// {
// 	$('.ProductionRequest').show();
// }

var getImageDirPath = wmsAppFiles;
var filtercol = "ALL";
var filterval = "0";
var CurrentPage = '1';
var recordLimit = '5';
var getUserName = mBrillWmsSession.getUserName();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId = mBrillWmsSession.getClientId();
var getCompanyID = mBrillWmsSession.getCompanyId();
var spnLocationType = [];
var spnLocationTypeId = [];
var globalFromLocationID = "";
var globalToLocationID = "";
var globalActiveBln = "";
var globalInternalBusinessPalletRule = "";
//var isBusinessRule = "";
var getSkupalletID = 0;
var addInwardRowCounter = 0;
var lotId = 1;
var poobj = "PurchaseOrder";


wmsLoadLayout(function(){
    
	initProductionRequest();
        debugger;
    hideAdminPages();
});

initProductionRequest()
{
    $('.ProductionRequest').show();
}
function hideAdminPages() {
    $('.wmsMasterTypePage').hide();
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
        strCurrentDate = formatCustomDatet(strDate);
    } else {
        var currentDate = new Date();
        strCurrentDate = formatCustomDatet(currentDate);
    }
    return strCurrentDate;
}
function formatCustomDatet(strDate) {
    var d = new Date(strDate);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    var finalDate = da + '-' + mo + '-' + ye;
    return finalDate;
}
function getProductionList(filtercol,filterval) 
{
    debugger;
   // checkBusinessRule()
    var globalOrderType = "";
    //var apiPath = "http://localhost:50068/api/staging/v1/Production/getProductionList";
   var apiPath = wmsApiPath + "Production/getProductionList";

    var filtercol = $('#ddlTransferSearch').val();
    var filterval = $('#ddlTransferFilterValue').val();

    if (filtercol == '') {
        filtercol = '';
        filterval = '';
    }

    var postData =
    {
        "CurrentPage": CurrentPage,
        "RecordLimit": recordLimit,
        "CompanyId": getCompanyID,
        "CustomerId": getCustomerId,
       // "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "Filter": "0",
        //"Search": ""
    }
    
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblTransferList1').html('');

            var myGridList = data.Result.Table[0];
           // var getTotalRecords = myGridList.TotalRecords;

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Request Order No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;display: none;">Request By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Reference</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Line</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Date</div>'; 
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Total Quantity</div>'; 
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>'
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) 
            {
                var getReqNo = getGridData[i].id;
                var getorderRefNumber = getGridData[i].orderRefNumber;
                var getOrderdate = getGridData[i].Orderdate;
                var getOrderQTY = getGridData[i].OrderQTY;
                var getStatus = getGridData[i].Status;
                var getLine = getGridData[i].Line;
                var getRequestedBy = getGridData[i].RequestedBy;


                // var getdate = getInvoiceDate.slice(0, 10);
                // var gettotal = getTotal.toFixed(2),
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getReqNo + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;display: none;'>" + getRequestedBy + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getorderRefNumber + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getLine + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderdate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderQTY + "</div>";
               // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getStatus + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindStatusControl(getReqNo, getStatus) + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#tblTransferList1').html(gridTable);
            
           //isBusinessRule = globalInternalBusinessPalletRule;
        }
        else {
            alert('Unable to connect Server!!');
        }
     //   setupGridPagingList('tbltranferlistpager', CurrentPage, getTotalRecords, getProductionList);
        //setupGridPagingList('tbltranferlistpager', CurrentPage, getTotalRecords, getTransferList);
    });
}


function bindStatusControl(gettransferNo, strStatus) {
    debugger;
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getStatusColor('Expected Receipt', strStatus) + '" data-orderid="' + gettransferNo + '" data-status="' + strStatus + '" title = "Request" onclick="OpenViewRequestPopup(\'' + gettransferNo + '\', true);return false;"></div>';

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Receiving', strStatus) + '" data-orderid="' + gettransferNo + '" data-status="' + strStatus + '" title = "Issue" onclick="viewOrderDetailsIssue(\'' + gettransferNo + '\');return false;"></div>';

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}


function getStatusColor(dataFor, currentStatus) 
{
    var myColor = 'green';
    

    if (dataFor == 'Expected Receipt') 
	{
        if (currentStatus == 'Expected Receipt' || currentStatus == 'Receiving' || currentStatus == 'Partially Completed' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') 
		{
            myColor = 'green';
        } 
    }
	else if (dataFor == 'Receiving') 
	{
        if (currentStatus == 'Receiving' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') 
		{
            myColor = 'green';
        } 
		else if (currentStatus == 'Partially Completed') 
		{
            myColor = 'partial';
        }
		else if (currentStatus == 'Expected Receipt') 
		{
            myColor = 'red';
        }

    }
			
				else	 if (dataFor == 'Quality Check') 
					{
						if (currentStatus == 'Quality Check' || currentStatus == 'Put Away')
							
							{
							myColor = 'green';
						}
						else if (currentStatus == 'Receiving' || currentStatus == 'Partially Completed') 
						{
							myColor = 'red';
						}

					}
			
	else if (dataFor == 'Put Away') 
	{
        if (currentStatus == 'Put Away') 
		{
            myColor = 'green';
        } 
		else if (hasQualityCheck == true)
			{
					 if (currentStatus == 'Quality Check')
					{
						myColor = 'red';
					}
			}
			
			else if (currentStatus == 'Receiving') 
						{
							myColor = 'red';
						}
			
			}
        else if (dataFor == 'Task Completed')
            {
                if (currentStatus == 'Completed') {
                    myColor = 'green';
                }
            }
    return myColor;
}

$('.wms-srv-add-order').click(function () {
       // addOrder();
        viewOrder('0', true);
    });

function viewOrder(strCurrentOrder, isPopupOpenCalled) {
    debugger;
    if(isPopupOpenCalled != null && isPopupOpenCalled == true){
        $('#tlbProdOrderDetailsGrid .wmsFrmAddRow').remove();
        $('#tlbProdOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow').remove();
        //checkForAddNewSkuRowInward();
    }
    viewPRHead(strCurrentOrder);   
}  


function RemoveProdOrder(strCurrentOrder, isPopupOpenCalled) {
    debugger;
    if(isPopupOpenCalled != null && isPopupOpenCalled == false){
        $('#tlbProdOrderDetailsGrid .wmsFrmAddRow').remove();
        $('#tlbProdOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow').remove();
        //checkForAddNewSkuRowInward();
    }
    //viewPRHead(strCurrentOrder);   
}    

function viewPRHead(strCurrentOrder) {
    debugger;
 
    
    if (strCurrentOrder != '0') {
        //var apiPath = wmsApiPath + 'PO/GetPOHead';
         var apiPath = wmsApiPath + 'Production/ProdHead';

        //var apiPath = 'http://localhost:50068/api/staging/v1/PO/GetPOHead'; 
        var getCustomerId = $("#ddlcustomer").val();
        var getWarehouseID = $("#ddlwarehouse").val();
        var getCompanyID = $('#hdnCompanyID').val();
        var getUserId = $("#hdnUserID").val();
        var strOrderId = strCurrentOrder;

        var postData =
        {
            OrderId: strCurrentOrder,
        };
        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.StatusCode;
            var getStatus = data.Status.toLocaleLowerCase();
            var docRow = '';
            if (getCode == "Success") {
                var getResult = data.Result;
                var getPoHead = getResult.Table;
                var getInboundReceiptNo = getPoHead[0].id;
                var getCustomerRefNo = getPoHead[0].orderRefNumber;
                var getline = getPoHead[0].Line;
                var getRemark = getPoHead[0].Remark;

                $('#spnPoOid').html(getInboundReceiptNo);
                $('#hdnPoOid').val(getInboundReceiptNo);
                $('#txtPoReceiptDate').val(getCustomerRefNo);
                $('#txtProdLine').val(getline);
                $('#txtPoCustomerRefNo').val(getCustomerRefNo);
                $('#txtPoRemark').val(getRemark);

                

                viewOrderProdDetails(strCurrentOrder,getStatus);
            }
            else {
                alert('Failed to open order!!');
            }
            // After success
        });
    }
    else {
        $('#spnPoOid').html('To be Generated');
        $('#hdnPoOid').val('0');
        var getCurrentDate = isBlankDate('');
        $('#txtPoReceiptDate').val(getCurrentDate);
        $('#txtProdLine').val(getCurrentDate);
        $('#txtPoCustomerRefNo').val('');
        $('#txtVendor').val('');
        $('#txtPoRemark').val('');
        $('#txtPoUserName').html(getUserName);
        $('#removebtndiv').show(); 
        $('#divbtnsavepo').show(); 
        $('#btnPOSave').show();
        viewOrderProdDetails(strCurrentOrder,0,'');
    }
}
function clearAll()
{
        var strCurrentOrder=0;
        $('#spnPoOid').html('To be Generated');
        $('#hdnPoOid').val('0');
        var getCurrentDate = isBlankDate('');
        $('#txtPoReceiptDate').val(getCurrentDate);
        $('#txtProdLine').val('');
        $('#txtPoCustomerRefNo').val('');
        $('#txtVendor').val('');
        $('#txtPoRemark').val('');
        $('#txtPoUserName').html(getUserName);
        $('#removebtndiv').show(); 
        $('#divbtnsavepo').show(); 
        $('#btnPOSave').show();
        $('#tlbProdOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow').remove();
       // viewOrderProdDetails(strCurrentOrder,0,'');
}
function viewOrderProdDetails(strCurrentOrder,orderstatus) {
	debugger;
	var obj = $('#ddlPageObject').val();
    var apiPath = wmsApiPath + 'Production/GetDispSaverequestdetail'; 
    //var apiPath = 'http://localhost:50068/api/staging/v1/PO/GetPODetail'; 
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();
    

    var postData =
    {

        "orderid": strCurrentOrder
    };

    if (strCurrentOrder != '0') {
        callHttpUrl(apiPath, postData, function (data) {
            $('#tlbProdOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow').remove();
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
				
                var getResult = data.Result;
                var getGridData = getResult.Table;
                for (var i = 0; i < getGridData.length; i++) {
                    var getId = getGridData[i].ID;
                    var getSkuId = getGridData[i].PRHeadId;
                    var getItemCode = getGridData[i].SKUCode;
                    var getItemName = getGridData[i].SKUName;
                    var getDescription = getGridData[i].SKUDescription;                
                    var getUOM = getGridData[i].UOM;                
                    var getOrderQty = getGridData[i].OrderQTY;                   
                    var getCaseNetWeight = getGridData[i].casegrossweight;
                    var getGrossWeight = getGridData[i].casenetweight;
                    var getLottable = getGridData[i].Lottable1;
                    var getTotalCarton = getGridData[i].TotalCarton;
                    var isvisible = getGridData[i].CreatedDate;

                    // GRID ROW
                    var skuRow = '';

                    skuRow = skuRow + '<div class="wms-srv-grid-row wmSkuDetailsPurchaseOrderRow">';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getId + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getItemName + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getDescription + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getLottable + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getCaseNetWeight + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getGrossWeight + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getTotalCarton + '</div>';
                    
                    skuRow = skuRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action" id="removebtndiv"><button class="wms-srv-input wms-srv-button" type="button" onclick="RemoveProdSKUItem(' + getSkuId + ',\'POremove\',\'' + getId + '\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button></div></div>';
                    
                    
                    //skuRow = skuRow + '<div class="wms-srv-grid-cell"></div>';
                    skuRow = skuRow + '</div>';
                    // GRID ROW

                    $('#tlbProdOrderDetailsGrid').append(skuRow);

                    if (isvisible == '0') {
                        $(".removediv").show();                                      
                      
                    }
                    else {
                        $(".removediv").hide();
                        $("#divbtnsavepo").hide(); 
                    }
                }
                //viewProdOrder();
                //OpenViewRequestPopup();
                checkForAddNewSkuRowInward();
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    } else {
        //viewProdOrder();
       // OpenViewRequestPopup();
        checkForAddNewSkuRowInward();
    }
}


function RemoveProdSKUItem(getDetailID) 
{
    debugger;
    if (confirm('Are you sure you want to remove SKU Item?')) {
       var apiPath = wmsApiPath + 'Production/RemoveProdSKU';
       
       // var apiPath = 'http://localhost:50068/api/staging/v1/PO/RemovePOSKU';	
    var strCurrentOrder = $('#hdnProdid').val();
    if (strCurrentOrder != '0')
     {
        
        var postData = 
		{
            
            "orderid": getDetailID,

        };
            callHttpUrl(apiPath, postData, function (result) {
            // After success
            var getCode = result.StatusCode;
            var getStatus = result.Status.toLocaleLowerCase();
            
            //var getDescription = result.Description;
            var docRow = '';
                if (getCode == "Success") {
                 RemoveProdOrder(strCurrentOrder, false);
            }
                else {
                alert('Failed to remove item!!');
            }
        });
        }
    }
}



function viewProdOrder()
 {
    debugger;
    $('#tlbProdOrderDetailsGrid').show();
    $('#tlbPoOrderDetailsGridNew').hide();
    $('#wms-srv-order-popup').show();
    $('#wms-srv-order-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-order-popup-close').off();
    $('#wms-srv-order-popup-close').click(function () 
    {
        $('#wms-srv-order-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-order-popup').hide();
       // clearSuggestionList();
    });
   
   
} 




function OpenAddNewSKUProdPopup() {
   debugger;
    clearAll();
    $('#wms-srv-order-popup').show();
    $('#wms-srv-order-popup-close').off();
    $('#wms-srv-order-popup-close').click(function () {
        $('#wwms-srv-order-popup').hide();
    });

  
}

function OpenViewRequestPopup(gettransferNo) {
   debugger;
    viewPRHead(gettransferNo);
    $('#wms-srv-viewRequestOrder-popup').show();
    $('#wms-srv-viewRequestOrder-popup-close').off();
    $('#wms-srv-viewRequestOrder-popup-close').click(function () {
        $('#wms-srv-viewRequestOrder-popup').hide();
        getProductionList();
    });

  
}



function POPupclosepopup()
{
     debugger;   
    $('#wms-srv-order-popup-close').off();
    $('#wms-srv-order-popup-close').click(function () {
    $('#wms-srv-order-popup').hide();
    getProductionList();
    });
          
}

function POpissuepopup()
{
        
    $('#wms-srv-Viewtransfer-popup1-close').off();
    $('#wms-srv-Viewtransfer-popup1-close').click(function () {
    $('#wms-srv-Viewtransfer-popup1').hide();
    });
          
}


function TransferPopup() {
   $('#wms-srv-ProdIsuue-popup').show();
    $('#wms-srv-ProdIsuue-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-ProdIsuue-popup-close').off();
    $('#wms-srv-ProdIsuue-popup-close').click(function () {
        // getTransferList(filtercol,filterval) ;
        // clearInput();   
        $('#wms-srv-createtask-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-ProdIsuue-popup').hide();
    });
    var today = new Date()
    var todaydate = today.getDate();
    var dd = todaydate
    var mm = today.toLocaleString('default', { month: 'short' });
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    $('#AssignDate').val(today);
    $('#transferby').html(sessionStorage["username"]);
    //alert(sessionStorage["username"])
    //checkBusinessRule();
    //isBusinessRule = globalInternalBusinessPalletRule;
   // LocationType();
}

function openPurchaseProductListPopup() 
{
    $('#wms-srv-Purchase-product-list-popup').show();
    $('#wms-srv-Purchase-product-list-popup-close').off();
    $('#wms-srv-Purchase-product-list-popup-close').click(function () {
        $('#wms-srv-Purchase-product-list-popup').hide();
    });
    $('#pnlPurchaseOrderProductList').html('');
            $('#pnlPurchaseOrderProductList').append('<div class="wms-srv-grid-header">' +
                '<div class="wms-srv-grid-cell" style="width:80px;">Sr. No</div>' +
                '<div class="wms-srv-grid-cell">Image</div>' +
                '<div class="wms-srv-grid-cell">SKU Code</div>' +
                '<div class="wms-srv-grid-cell">SKU Name</div>' +
                '<div class="wms-srv-grid-cell">Description</div>' +
                '<div class="wms-srv-grid-cell">Category</div>' +
                '<div class="wms-srv-grid-cell">Sub Category</div>' +
                //'<div class="wms-srv-grid-cell">Lottable</div>' +
                //'<div class="wms-srv-grid-cell">Keyword</div>' +
                '<div class="wms-srv-grid-cell">Group Set</div>' +
                '<div class="wms-srv-grid-cell">Current Stock</div>' +
                '<div class="wms-srv-grid-cell">Reserve Qty</div>' +
                '<div class="wms-srv-grid-cell" style="width:80px;">Action</div>' +
                '</div>');
    getSkuList(0, 0);
}

function getSkuList(sequenceNo, counter) 
{
debugger;
    apiPath = wmsApiPath + "CommFunAPI/GetPOSKUSuggest";
    var skey = $('#txtSo_ProdSearchpopup').val();
    postData = {
        "CustomerId": getCustomerId,
        "WarehouseId":getWarehouseId,
        "UserId":getUserId ,
        "ClientId": getCustomerId,
        "OrderId": "0",
        "skey": skey,
        "isSuggestionList": "no",
        "lastSeqno":sequenceNo
    }


    callHttpUrl(apiPath, postData, function (data) {
        getStatus = data.Status
        if (getStatus = 200) {

            var suggestionList = data.Result.SKUSuggestList;


            var getId = [];
            var getValue = [];
            var getProductName = [];
            var getProductImage = [];
            var getProdDescription = [];
            var getCategory = [];
            var getSubCategory = [];
            var getGroupSet = [];
            var getKeyword = [];
            var getUPCBarcode = [];
            var getCurrentStock = [];
            var getReserveQty = [];
            var getUOM = [];
            var getLottable = [];
            var getLottables = [];


            for (var i = 0; i < suggestionList.length; i++) {
                var rowNum = counter + i + 1;
                getId[i] = suggestionList[i].ID;
                getValue[i] = suggestionList[i].ProductCode;
                getProductName[i] = suggestionList[i].Name;
                getProductImage[i] = suggestionList[i].ImagePath;
                getProdDescription[i] = suggestionList[i].Description;
                getCategory[i] = suggestionList[i].Category;
                getSubCategory[i] = suggestionList[i].SubCategory;
                getGroupSet[i] = suggestionList[i].GroupSet;
                getKeyword[i] = suggestionList[i].SKey;
                //getKeyword[i] = 'MySku|Food|Veg';
                getUPCBarcode[i] = suggestionList[i].UPCBarcode;
                getCurrentStock[i] = suggestionList[i].CurrentStock;
                getReserveQty[i] = suggestionList[i].ResurveQty;
                getUOM[i] = suggestionList[i].UOM;
                getLottable[i] = suggestionList[i].Lottable;
                getLottables[i] = suggestionList[i].Lottables;

                var strLottable = '';
                for (var l = 0; l < getLottable[i].length; l++) {
                    if (strLottable == '') {
                        strLottable = getLottable[i][l].Name;
                    } else {
                        strLottable = strLottable + ' | ' + getLottable[i][l].Name;
                    }
                }
                $('#pnlPurchaseOrderProductList').append('<div class="wms-srv-grid-row">' +
                    '<div class="wms-srv-grid-cell" style="width:80px;">' + rowNum + '</div>' +
                    '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage[i] + '" style="width:40px;height:40px;" /></div>' +
                    '<div class="wms-srv-grid-cell">' + getValue[i] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getProductName[i] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getProdDescription[i] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getCategory[i] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getSubCategory[i] + '</div>' +
                   // '<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>' +
                  //'<div class="wms-srv-grid-cell" id="cellKeyWordHolder_' + rowNum + '"><i class="fas fa-plus-circle btnAddProductKeyword" onclick="showAddKeywordPanel(' + getId[i] + ',' + rowNum + ')"></i> ' + convertToKeyblock(getKeyword[i], getId[i], rowNum) + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getGroupSet[i] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getCurrentStock[i] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getReserveQty[i] + '</div>' +
                    '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
                   // '<a href="#" class="wms-srv-icononly btnAddToProductListField" data-pos="' + i + '"><i class="fas fa-check-circle"></i></a>' +
                   '<a href="#" class="wms-srv-icononly btnSelectInwardProdFromList" data-pos="' + i + '"  data-isselected="no"><i class="fas fa-check-circle"></i></a>' +
                   '</div></div>' +
                    '</div>');
            }
            var scrollObj = '#wms-srv-Purchase-product-list-popup .wms-srv-popup';
            var scrollContentObj = '#wms-srv-Purchase-product-list-popup .wms-srv-popup-content';
            attachScrollBottomEvent(scrollObj, scrollContentObj, function(){
                var lastArrNum = getId.length - 1;
                var newCounter = counter + (lastArrNum + 1);
                getSkuList(getId[lastArrNum], newCounter);
            });
            $('.btnSelectInwardProdFromList').off();
            $('.btnSelectInwardProdFromList').click(function () {
                var isSelected = $(this).attr('data-isselected');
                if (isSelected == 'no') {
                    $(this).attr('data-isselected', 'yes');
                    $(this).find('i').attr('style', 'color:#78b421');
                } else {
                    $(this).attr('data-isselected', 'no');
                    $(this).find('i').attr('style', '');
                }
            });

            $('#btnAddSkuToInwardOrder1').off();
            $('#btnAddSkuToInwardOrder1').click(function () {
                //$('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').remove();
                $('.btnSelectInwardProdFromList[data-isselected="yes"]').each(function () {
                    var listItemObj = $(this);
                    var k = Number($(this).attr('data-pos'));
                    addMultipleProductRequest(getId[k], getValue[k], getProductName[k], getProdDescription[k]);
                   // addMultipleProduct(getValue[k], getId[k], getProductName[k], getCurrentStock[k], getReserveQty[k], getUOM[k], getLottable[k], getLottables[k]);
                    $('#wms-srv-Purchase-product-list-popup').hide();
                });
                checkForAddNewSkuRowInward();
            });

            $('.btnAddToProductListField').off();
            $('.btnAddToProductListField').click(function ()
             {
              debugger;
              $('#txtSo_ProdSearchpopup').val('');
              $('#txtSo_ProdSearchLottablepopup').val('');
              var listItemObj = $(this);
              var getListPos = Number($(this).attr('data-pos'));
              
              $('#addNew_ItemCode').val(getId[getListPos]);
              $('#addNew_ItemCode').attr('data-id', getId[getListPos]);
              $('#addNew_ItemCode').val(getValue[getListPos]);
              
              $('#addNew_Name' ).val(getProductName[getListPos]);
             
              $('#addNew_Description').val(getProdDescription[getListPos]);           
                
                GetUomBySKU(getId[getListPos], '0','PurchaseOrder');
               // getLottableBySku(getId[getListPos],'PurchaseOrder','0','');
    
              $('#wms-srv-Purchase-product-list-popup').hide();
            });
        }
    });
}

function RequestSearch()
{

    searchfilter = $("#ddlsearch").val();
    searchvalue = $("#txtvalue").val();
    if (searchvalue == '')
    {
        alert('Please Enter value for filter');

    }
    else 
	{
        getProductionList();
    }
}


   $('#ddlsearch').change(function ()
    {
        
       
        searchfilter = $("#ddlsearch").val();
        searchvalue = $("#txtvalue").val();
    if (searchfilter=='ALL')
    {
        searchvalue = 'none';
        getProductionList();
        
        $('#txtvalue').val('');
       
    }

    });
    

  function checkForAddNewSkuRowInward() {
    var rowLength = $('#tlbPoOrderDetailsGrid .wms-srv-grid-row').length;
    if (rowLength > 0) {
      $('#pnlNoInwardSkuRecord').hide();
    } else {
      $('#pnlNoInwardSkuRecord').show();
    }
  }

function updateOrderQty(rowNum) {
    debugger;
    var getRequestQty = $('#addNew_RequestedQty_' + rowNum).val();
    var getUnitQty = $('#addNew_UOM_' + rowNum +' option:selected').attr('data-unitqty');
    var totalOrderQty = Number(getRequestQty) * Number(getUnitQty);
    $('#addNew_OrderQty_' + rowNum).val(totalOrderQty);
}

function addMultipleProductRequest(getId, getValue, getProductName, getProdDescription){
    debugger;
    var addNewRowHtml = '<div class="wms-srv-grid-row wmsFrmAddRow wmsFrmAddRow_'+ addInwardRowCounter +'">'+
    '<div class="wms-srv-grid-cell" style="text-align:center">0</div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center">'+
    '<div class="wms-srv-suggestion-holder"><input type="text" id="addNew_ItemCode_'+ addInwardRowCounter +'" data-prefix="SESKU" value="" class="txtItemCode wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getSuggestionList(this,\'' + poobj + '\');">'+
    '<a href="#" data-prefix="SE"><i class="fas fa-search" onclick="openPurchaseProductListPopup()"></i></a>'+
    '</div></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_Name_'+ addInwardRowCounter +'" value="" class="wms-srv-grid-cell-input" disabled=""></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_Description_'+ addInwardRowCounter +'" value="" class="wms-srv-grid-cell-input" disabled=""></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_RequestedQty_'+ addInwardRowCounter +'" onchange="updateOrderQty('+ addInwardRowCounter +');" onkeypress="return isNumber(event)" value="" class="wms-srv-grid-cell-input"></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><select class="wms-srv-grid-cell-input" id="addNew_UOM_'+ addInwardRowCounter +'" onchange="updateOrderQty('+ addInwardRowCounter +');"></select></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_OrderQty_'+ addInwardRowCounter +'" value="" class="wms-srv-grid-cell-input" disabled=""></div>'+
    '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="addNew_Lottable_'+ addInwardRowCounter +'"></div></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number" id="addNew_CaseNetWeight_'+ addInwardRowCounter +'" value="" class="wms-srv-grid-cell-input"></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number" id="addNew_CaseGrossWeight_'+ addInwardRowCounter +'" value="" class="wms-srv-grid-cell-input"></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number" onkeypress="return isNumber(event)" id="addNew_TotalCarton_'+ addInwardRowCounter +'" value="" class="wms-srv-grid-cell-input"></div>'+
    '<div class="wms-srv-grid-cell" style="text-align:center"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="saveProdDetails('+ addInwardRowCounter +');"><i class="fas fa-check-circle"></i><span>Save</span></button>'+
    '<div class="wms-srv-action-sep">|</div>' +
    '<a href="#" title="Cart" data-prefix="RM" onclick="removeAddNewRowInward(' + addInwardRowCounter + ');" class="wms-srv-icononly"><i class="fas fa-times-circle"></i></a>' +
    '</div></div></div>';
    $('#tlbProdOrderDetailsGrid .wms-srv-grid-header').after(addNewRowHtml);

    $('#txtSo_ProdSearchpopup').val('');
    $('#txtSo_ProdSearchLottablepopup').val('');
    var listItemObj = $(this);
    var getListPos = Number($(this).attr('data-pos'));

    $('#addNew_ItemCode_' + addInwardRowCounter).val(getId);
    $('#addNew_ItemCode_' + addInwardRowCounter).attr('data-id', getId);
    $('#addNew_ItemCode_' + addInwardRowCounter).val(getValue);

    $('#addNew_Name_' + addInwardRowCounter).val(getProductName);

    $('#addNew_Description_' + addInwardRowCounter).val(getProdDescription);

  //  GetUomForMultipleSKU(addInwardRowCounter, getId, '0', 'PurchaseOrder');
    GetUomBySKU(getId, '0', 'PurchaseOrder', true, addInwardRowCounter);
   // getLottableBySku(getId, 'PurchaseOrder', '0', '', true, addInwardRowCounter);

    $('#wms-srv-Purchase-product-list-popup').hide();
    addInwardRowCounter = addInwardRowCounter + 1;
}
function validatePoDetails(rowId) {
    $('#addNew_ItemCode_' + rowId).removeClass('errorField');
    $('#addNew_RequestedQty_' + rowId).removeClass('errorField');
    $('#addNew_UOM_' + rowId).removeClass('errorField');
    var getItemCode = $('#addNew_ItemCode_' + rowId).val();
    var getRequestedQty = $('#addNew_RequestedQty_' + rowId).val();
    var getRequestUOM = $('#addNew_UOM_' + rowId).val();
    var txtrefno = $('#txtPoCustomerRefNo').val();

    var isValid = true;
    var validationMsg = '';
    if (getItemCode == '') {
        validationMsg = 'Please enter Sku Code!!';
        $('#addNew_ItemCode_' + rowId).addClass('errorField');
        isValid = false;
    }
    else if (getRequestedQty == '') {
        validationMsg = 'Please enter Requested Quantity!!';
        $('#addNew_RequestedQty_' + rowId).addClass('errorField');
        isValid = false;
    } else if (!validateIsNumber(getRequestedQty)) {
        validationMsg = 'Please enter numaric value!!';
        $('#addNew_RequestedQty_' + rowId).addClass('errorField');
        isValid = false;
    } else if (getRequestedQty < 1) {
        validationMsg = 'Request quantity should not be zero!!';
        $('#addNew_RequestedQty_' + rowId).addClass('errorField');
        isValid = false;
    } else if (getRequestUOM == 0) {
        validationMsg = 'Please select UOM!!';
        $('#addNew_UOM_' + rowId).addClass('errorField');
        isValid = false;
    }else if(txtrefno == ""){
        validationMsg = 'Please Enter Reference No.!!';
        $('#txtPoCustomerRefNo').addClass('errorField');
        isValid = false;
    }

    if (isValid != true) {
        if (validationMsg != '') {
           // showAlert(validationMsg, 'Warning', '#');
            alert(validationMsg);
        }
    }
    return isValid;
}

function removeAddNewRowInward(rowNum) {
    $('#tlbProdOrderDetailsGrid .wmsFrmAddRow_' + rowNum).remove();
    checkForAddNewSkuRowInward();
  }

function checkForAddNewSkuRowInward() {
    var rowLength = $('#tlbProdOrderDetailsGrid .wms-srv-grid-row').length;
    if (rowLength > 0) {
      $('#pnlNoInwardSkuRecord').hide();
    } else {
      $('#pnlNoInwardSkuRecord').show();
    }
  }

function GetUomBySKU(strSkuId,strSelectedUomId,strObj,strIsMultiple, strCounterNum)
{
	debugger;
    var ddlAddNew_UomId = 'addNew_UOM';
    if(strIsMultiple != null && strIsMultiple == true){
        ddlAddNew_UomId = 'addNew_UOM_' + strCounterNum;
    }
    var apiPath = wmsApiPath + 'CommFunAPI/GetSKUUOM';
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    //var getUserId = getUserId;

    var postData = 
	{
		"CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId ,
        "SkuId": strSkuId
    };
if(strObj=='PurchaseOrder')
{
	// $('#' + ddlAddNew_UomId).html('<option value="0" data-unitqty="0">-- Select --</option>');
}
else if(strObj=='GRN')
{
  //  $('#ddlUOM').html('<option value="0" data-unitqty="0">-- Select --</option>');
}
else if(strObj=='QC')
{
	$('#ddlQCUOM').html('<option value="0" data-unitqty="0">-- Select --</option>');
}

    callHttpUrl(apiPath, postData, function (data)
    {
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success')
        {
            var getResult = data.Result;
            $('#' + ddlAddNew_UomId).html('');
            $('#ddlUOM').html('');
            $('#ddlQCUOM').html('');
            var getUomData = getResult.Table;
            for (var i = 0; i < getUomData.length; i++) 
			{
                var getUom = getUomData[i].Uom;
                var getUomId = getUomData[i].Id;
                var getUnitQty = getUomData[i].UnitQty;
                var isSelected = '';
                if (strSelectedUomId == getUomId) 
				{
                    isSelected = 'selected="selected"';
                }
				if(strObj=='PurchaseOrder')
				{
                    
					var htmlOption = '<option value="' + getUomId + '" data-unitqty="' + getUnitQty + '" ' + isSelected +'>' + getUom +'</option>';
                $('#' + ddlAddNew_UomId).append(htmlOption);
				}
				else if(strObj=='GRN')
				{  
               
								var htmlOption = '<option value="' + getUomId + '" data-unitqty="' + getUnitQty + '" ' + isSelected + '>' + getUom + '</option>';
								$('#ddlUOM').append(htmlOption);
				}
				else if(strObj=='QC')
				{
								var htmlOption = '<option value="' + getUomId + '" data-unitqty="' + getUnitQty + '" ' + isSelected + '>' + getUom + '</option>';
								$('#ddlQCUOM').append(htmlOption);
				}
            }
        }
    });
}


function saveProdDetails(rowId) {

    if (validatePoDetails(rowId)) {
        debugger;

        //var apiPath = wmsApiPath + 'PO/SavePOSKUDetail';
        var apiPath = wmsApiPath + 'Production/GetSaverequestdetail';

        //var apiPath = 'http://localhost:50068/api/staging/v1/PO/SavePOSKUDetail';	
        var strCurrentOrder = $('#hdnProdid').val();
        if (strCurrentOrder != '0') {
            // var getWarehouseID = $("#ddlwarehouse").val();
            // var getCustomerId = $("#ddlcustomer").val();
            // var getCompanyID = $('#hdnCompanyID').val();
            // var getUserId = $("#hdnUserID").val();
 
            var getSkuId = $("#addNew_ItemCode_" + rowId).attr('data-id');

            var getItemCode = $("#addNew_ItemCode_" + rowId).val();
            var getItemName = $("#addNew_Name_" + rowId).val();
            var getItemDescription = $("#addNew_Description_" + rowId).val();
            var getRequestedQty = $("#addNew_RequestedQty_" + rowId).val();
            var getUOM = $("#addNew_UOM_" + rowId +" option:selected").text();
            var getUOMId = $("#addNew_UOM_" + rowId).val();
            var getOrderQty = $("#addNew_OrderQty_" + rowId).val();  

         //if(getSkuId!=''||getItemCode!=''||getItemName!=''||getItemDescription!=''||getRequestedQty!=''||getUOM!=''||getOrderQty!='')
          
			var getLot = '';
			var getAllLottables = $('#addNew_Lottable_' + rowId +' input');
            $(getAllLottables).each(function () {
					var getLotId = $(this).attr('data-id');
					var getLotType = $(this).attr('data-description');
					var getLotVal = $(this).val();
                if (getLotVal.trim() != '') {
                    if (getLot == '') {
							getLot += getLotId + ':' + getLotVal;
                    } else {
							getLot += '|' + getLotId + ':' + getLotVal;
						}
					}
				});

            var getCaseNetWeight = $("#addNew_CaseNetWeight_" + rowId).val();
            var getCaseGrossWeight = $("#addNew_CaseGrossWeight_" + rowId).val();
            var getTotalCarton = $("#addNew_TotalCarton_" + rowId).val();

            var postData =
            {
                // "CustomerID": "1",
                // "CompanyID":"1",
                // "PRHeadID":"2",
                // "SkuCode":"sku11",
                // "SkuName":"SKU122",
                // "SkuDescription":getItemDescription,
                // "reqQty":"10",
                // "UOM": getUOM,
                // "orderQty": isBlankNumber(getOrderQty),
                // "Lottable":'test',
                // "CaseNetWeight": isBlankNumber(getCaseNetWeight),
                // "CaseGrossWeight": isBlankNumber(getCaseGrossWeight),
                // "TotalCarton": isBlankNumber(getTotalCarton),

                

                // "WarehouseId": "1",
                // "UserId": "1",
                // "OrderId": "2",
                // "SkuId": getSkuId,
                // "ItemCode": getItemCode,
                // "ItemName": isBlankString(getItemName),
                // "ItemDescription": isBlankString(getItemDescription),
                // "RequestedQty": isBlankNumber(getRequestedQty),
                // "UOM": getUOM,
                // "UOMId": getUOMId,
                
                //"Lottables": isBlankString(getLot),


                  "CustomerID": getCustomerId,
                  "CompanyID": getCompanyID,
                  "PRHeadID": strCurrentOrder,
                  "SkuCode": getItemCode,
                  "SkuName": getItemName,
                  "SkuDescription": getItemDescription,
                  "reqQty": getRequestedQty,
                  "UOM": getUOM,
                  "orderQty": getOrderQty,
                  "Lottable":"MFG",
                  "CaseNetweight": getCaseNetWeight,
                  "CaseGrossweight": getCaseGrossWeight,
                  "TotalCartan": getTotalCarton,

                
                
            };
            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.StatusCode;
                var getvalidmsg = result.Result.Message;
                var docRow = '';
                if (getCode == "Success") {
                    removeAddNewRowInward(rowId);
                    alert("saved successfully!!");
                    viewOrder(strCurrentOrder, false);
                }
                else if (getCode == "Validate") {
                    alert(getvalidmsg);
                }
                else {
                    alert('Failed to save..!');
                }
                // After success
            });
        }
         else {
        saveProdHead(rowId, 'no');
        }
    }
}


function saveProdHead(rowId, isFinalSave) {
	debugger;
    if (validateHeadData(rowId, isFinalSave)) {
    debugger;
    var apiPath = wmsApiPath + 'Production/SaverequestHead';

    var strOrderId = $('#hdnProdid').val();
    var getInboundReceiptDate = $('#txtPoReceiptDate').val();
    var getLine = $('#txtProdLine').val();
    var getCustomerRefNo = $('#txtPoCustomerRefNo').val();
    var getRemark = $('#txtPoRemark').val();
    var getVendorId = $('#txtVendor').attr('data-id');

    var postData =
    {


        CustomerID:getCustomerId,
        CompanyID:getCompanyID,
        WarehouseID:getWarehouseId,
        orderdate:getInboundReceiptDate,
        orderrefNo:getCustomerRefNo,
        Line:getLine,
        Remark:getRemark
        // CustomerId: getCustomerIdInward,
        // WarehouseId: getWarehouseId,
        // UserId: getUserIdInward,
        // Object: getPageObject,
        // InboundReceiptDate: getInboundReceiptDate,
        // ExpectedDeliveryDate: getExpectedDeliveryDate,
        // CustomerRefNo: isBlankString(getCustomerRefNo),
        // Remark: isBlankString(getRemark),
        // Poid: strOrderId,
        // VendorId:getVendorId
    };
        callHttpUrl(apiPath, postData, function (data) {
        // After success
        var getCode = data.StatusCode;
            if (getCode == "Success") {
                if (isFinalSave != 'yes') {
                var PoID = data.Result.Table1[0].headid;
                $('#spnPoOid').html(PoID);
                $('#hdnProdid').val(PoID);
                saveProdDetails(rowId);
            }else{
                 alert('Request saved successfully!!');
               // UpdatePOStatus();
            }
        } 
        else {
            alert(data.Result.Message);
        }
        // After success
    });
    }
}


function validateHeadData(rowId, isFinalSave) {
    var getPoDeliveryDate = $('#txtProdLine').val();
    
    $('#txtProdLine').removeClass('errorField');
   
    var isValid = true;
    var validationMsg = '';
    // if (getPoDeliveryDate == '') {
    //     validationMsg = 'Please enter Exp. Delivery Date!!';
    //     $('#txtProdLine').addClass('errorField');
    //     isValid = false;
    // } 

    if($('#ddlPageObject').val() == "PurchaseOrder"){
        if($('#txtVendor').val() == ""){
        validationMsg = 'Please select Vendor Name';
        $('#txtVendor').addClass('errorField');
        isValid = false;
        }
    }
    if($('#ddlPageObject').val() == "SalesReturn"){
        if($('#txtVendor').val() == ""){
        validationMsg = 'Please select Client Name';
        $('#txtVendor').addClass('errorField');
        isValid = false;
        }
    }
    if($('#ddlPageObject').val() == "Transfer"){
        if($('#txtVendor').val() == ""){
        validationMsg = 'Please select Warehouse Name';
        $('#txtVendor').addClass('errorField');
        isValid = false;
        }
    }

    // if($('#txtVendor').val() == ""){
    //     validationMsg = 'Please select Vendor Type';
    //     $('#txtVendor').addClass('errorField');
    //     isValid = false;
    // }
	

    if (isValid != true) {
        if (validationMsg != '') {
         //   showAlert(validationMsg, 'Warning', '#');
            alert(validationMsg);
        }
    }
    return isValid;
}



function viewOrderDetails(getTransferId)
{
    debugger;
   // var apiPath = wmsApiPath + 'Transfer/viewTransferList';
    var apiPath = wmsApiPath + '/Production/GetDispSaverequestdetail';
   
    var postData =
    {  
        CustomerId: getCustomerId,

        WarehouseId: getWarehouseId,
        UserId: getUserId,
        OrderId: "2",
        OrderType: "0"
    }
    callHttpUrl(apiPath, postData, function (data) {
        var gridTable = '';
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') 
        {
            // $("#wms-srv-Viewtransfer-popup").show();

            var getGridData = data.Result.Table;
            var getGridTable2 = data.Result.Table1;
            var getTransferID = getGridData[0].TransferID;
            var getTransferDate = getGridData[0].TransferDate;
            var getUsername = getGridData[0].Username;
            var getRemkar = getGridData[0].Remark;
            var getStatusName = getGridData[0].StatusName;
                $("#pnlViewHeadTransfer").html('');
                var getGridHead = '';

                getGridHead =getGridHead+ '<div class="wms-srv-grid">';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-header">';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">Transfer No</div>';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">Transfer Date</div>';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">Transfer By</div>';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">Remark</div>';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">Status</div>';
                getGridHead =getGridHead+ '</div>';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-row">';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">'+getTransferID+'</div>';                                       
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">'+getTransferDate+'</div>';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">'+getUsername+'</div>';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">'+getRemkar+'</div>';
                getGridHead =getGridHead+ '<div class="wms-srv-grid-cell">'+getStatusName+'</div>';
                getGridHead =getGridHead+ '</div>';
                getGridHead =getGridHead+ '</div>';

                $("#pnlViewHeadTransfer").append(getGridHead);
                $("#ViewTransferDetail").html('');
                var gridDetails = '';
                gridDetails = '<div class="wms-srv-grid-header" style="white-space: nowrap;">';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">From Location Type</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">From Location</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">From Pallet</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">SKU Code</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell" style="width: 295px;">Lottable</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">Quantity</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">To Location Type</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">To Location</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">To Pallet</div>';
                gridDetails = gridDetails + '</div>';

            // for (var i = 0; i < getGridTable2.length; i++) 
            // {
            //     var getTransferID = getGridTable2[i].TransferID;
            //     var getFromLocType = getGridTable2[i].FromLocType;
            //     var getFromLocationCode = getGridTable2[i].FromLocationCode;
            //     var getFromPallet = getGridTable2[i].FromPallet;
            //     var getSkuCode = getGridTable2[i].SkuCode;
            //     var getLot = getGridTable2[i].Lottables;
            //     var getQuantity= getGridTable2[i].Quantity;
            //     var getToLocType = getGridTable2[i].ToLocType;
            //     var getToLocationCode = getGridTable2[i].ToLocationCode;
            //     var getToPallet= getGridTable2[i].ToPallet;
    

            //         var lotVal = getLot.split(',');
            //         var lot1 = lotVal[0];
            //         var lot2 = lotVal[0];
            //         var lot3 = lotVal[0];
            //         var getLottables = lot1+' | '+ lot2+' | '+ lot3;


            //     gridDetails = gridDetails + '<div class="wms-srv-grid-row">';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getFromLocType+'</div>';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getFromLocationCode+'</div>';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getFromPallet+'</div>';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getSkuCode+'</div>';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getLottables+'</div>';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getQuantity+'</div>';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getToLocType+'</div>';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getToLocationCode+'</div>';
            //     gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getToPallet+'</div>';                                
            //     gridDetails = gridDetails + '</div>';
            // };
            
            $("#ViewTransferDetail").append(gridDetails);
           
        }
    });

    
}







