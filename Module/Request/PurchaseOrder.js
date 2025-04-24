var getImageDirPath = wmsAppFiles;
var getUserName = mBrillWmsSession.getUserName();
var getCompanyId = mBrillWmsSession.getCompanyId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var SelectedOrder = "";
var addInwardRowCounter = 0;
var dataUniquePos = 0;
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

function createObjectHead(placeHolder, strOrderId, callBackFunction) {
    debugger;
    if (strOrderId != '0') {

        var apiPath = wmsApiPath + 'PO/GetPOHead';
        //var apiPath = "http://localhost:50068/api/staging/v1/PO/GetPOHead";        


        var postData =
        {
            CustomerId: getCustomerIdInward,
            WarehouseId: getWarehouseIdInward,
            UserId: getUserIdInward,
            OrderId: strOrderId,
            OrderType: getPageObject
        };
        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.StatusCode;
            var getStatus = data.Status.toLocaleLowerCase();
            var docRow = '';
            if (getCode == "Success") {

                var getResult = data.Result;
                // var getPoHead = JSON.parse(getResult);
                var getPoHead = getResult.Table;
                var getInboundReceiptNo = getPoHead[0].InboundReceiptNo;
                var inReceiptDate = getPoHead[0].InboundReceiptDate;
                var getInboundReceiptDate = formatCustomDate(inReceiptDate);
                var expDeliveryDate = getPoHead[0].ExpDeliveryDate;
                var getExpDeliveryDate = formatCustomDate(expDeliveryDate);
                var getCustomerRefNo = getPoHead[0].CustomerRefNo;
                var getRemark = getPoHead[0].Remark;
                var getCreatedBy = getPoHead[0].CreatedBy;
                var getContainerID = getPoHead[0].ContainerID;
                var getSeal = getPoHead[0].Seal;
                var getCarrier = getPoHead[0].Carrier;
                var getRateGroupId = getPoHead[0].RateGroupID;
                var getPassID = getPoHead[0].getPassID;
                if (getPassID != 0) {
                    SelectedOrder = document.getElementById("hdnSelectedOrderCheck");
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
                    getInwardOrdersIDList = SelectedOrder.value;
                    bindGetPassIdList(strOrderId);
                }




                var gridTable = '<div class="wms-srv-grid">';
                //GRID HEADER
                gridTable = gridTable + '<div class="wms-srv-grid-header" data-rategroupid="' + getRateGroupId + '">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Inward Order No</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Expected Delivery Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Customer Ref. No</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Created By</div>';
                gridTable = gridTable + '</div>';
                //GRID HEADER
                //GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                if (getInwardOrdersIDList == '') {

                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getInboundReceiptNo + '</div>';
                }
                else {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getInwardOrdersIDList + '</div>';
                }
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getInboundReceiptDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getExpDeliveryDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getCustomerRefNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getCreatedBy + '</div>';
                gridTable = gridTable + '</div>';
                //GRID ROW
                gridTable = gridTable + '</div>';
                $("#" + placeHolder).html(gridTable);

                if (callBackFunction != null) {
                    callBackFunction(data);
                }
            }
            else {
                alert('Failed to open order!!');
            }
            // After success
        });
    }
}

//#region CreateOrderJs
var lotId = 1;
var poobj = "PurchaseOrder";

function addOrder() {
    debugger;
    $('#wms-srv-order-popup input').val('');
    $('#wms-srv-order-popup select').val('0');

    $('#spnPoOid').html('To be Generated');
    $('#hdnPoOid').val('0');
    var getCurrentDate = isBlankDate('');
    $('#txtPoReceiptDate').val(getCurrentDate);
    $('#txtPoDeliveryDate').val(getCurrentDate);
    $('#tlbPoOrderDetailsGrid').hide();
    $('#tlbPoOrderDetailsGridNew').show();
    $('#wms-srv-order-popup').show();
}
function viewPoOrder() {
    debugger;
    $('#tlbPoOrderDetailsGrid').show();
    $('#tlbPoOrderDetailsGridNew').hide();
    $('#wms-srv-order-popup').show();
    $('#wms-srv-order-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-order-popup-close').off();
    $('#wms-srv-order-popup-close').click(function () {
        $('#wms-srv-order-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-order-popup').hide();
        clearSuggestionList();
    });
}
function viewOrder(strCurrentOrder, isPopupOpenCalled) {
    $('#btnAdd').show();
    debugger;
    var getLottable = mBrillWmsSession.getCustomerLottable();
    var breakCustLot = getLottable.split(',');
    for (var pl = 0; pl < breakCustLot.length; pl++) {
        var custLotLabel = breakCustLot[pl];
        $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').html(custLotLabel);
        $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').attr('data-lottype', custLotLabel);
        $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').hide();
    }
    // $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable').hide();

    if (isPopupOpenCalled != null && isPopupOpenCalled == true) {
        $('#tlbPoOrderDetailsGrid .wmsFrmAddRow').remove();
        $('#tlbPoOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow').remove();
        //checkForAddNewSkuRowInward();
    }
    viewPOHead(strCurrentOrder);
}
function viewOrderPoDetails(strCurrentOrder, orderstatus, getorderfrom) {
    debugger;
    var obj = $('#ddlPageObject').val();
    var apiPath = wmsApiPath + 'PO/DispPODetail';
    //var apiPath = 'http://localhost:50068/api/staging/v1/PO/GetPODetail'; 
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();


    var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "OrderId": strCurrentOrder
    };

    // STATIC API DATA
    apiPath = 'StaticAPI/DispPODetail.json';
    postData = null;
    // STATIC API DATA

    // BIND DATA GRID
    
    if (strCurrentOrder != '0') {
        callHttpUrl(apiPath, postData, function (data) {
            $('#tlbPoOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow').remove();
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {

                var getResult = data.Result;
                var getGridData = getResult.PurchaseOrderDetails;
                var visibleLottable = $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable:visible').length;
                for (var i = 0; i < getGridData.length; i++) {
                    var getId = getGridData[i].Id;
                    var getSkuId = getGridData[i].SkuId;
                    var getItemCode = getGridData[i].ItemCode;
                    var getItemName = getGridData[i].ItemName;
                    var getDescription = getGridData[i].ItemDescription;

                    var getMOQ = getGridData[i].MOQ;
                    var getCurrentStock = getGridData[i].CurrentStock;
                    var getReserveQty = getGridData[i].ReserveQty;

                    var getRequestedQty = getGridData[i].RequestedQty;
                    var getUOMList = getGridData[i].UomList;
                    var getUOM = getGridData[i].UOM;
                    var getUOMId = getGridData[i].UOMId;
                    var getOrderQty = getGridData[i].OrderQty;

                    var getPrice = getGridData[i].Price;
                    var getTotal = getGridData[i].Total;
                    var getisPriceChange = getGridData[i].isPriceChange;


                    var getLottable = getGridData[i].Lot1;
                    var getCaseNetWeight = getGridData[i].CaseNetWeight;
                    var getGrossWeight = getGridData[i].CaseGrossWeight;
                    var getTotalCarton = getGridData[i].TotalCarton;
                    var isvisible = getGridData[i].isfinal;
                    var orderfrom = getGridData[i].orderfrom;

                    // GRID ROW
                    var skuRow = '';

                    skuRow = skuRow + '<div class="wms-srv-grid-row wmSkuDetailsPurchaseOrderRow">';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getId + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getItemName + '</div>';
                    // skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getDescription + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getMOQ + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getCurrentStock + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getReserveQty + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getRequestedQty + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';

                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getPrice + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getTotal + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getisPriceChange + '</div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell" style="text-align:center;"><div class="wms-srv-grid-action"><a href="#" title="Add Serial" data-prefix="RM" onclick="return false;" class="wms-srv-icononly"><i class="fas fa-plus-circle"></i></a></div></div>';
                    skuRow = skuRow + '<div class="wms-srv-grid-cell" style="text-align:center;"><div class="wms-srv-grid-action"><a href="#" title="Remove" data-prefix="RM" onclick="return false;" class="wms-srv-icononly"><i class="fas fa-trash"></i></a></div></div>';

                    /*
                    var breakLottable = getLottable.split('|');

                    for (var lt = 0; lt < breakLottable.length; lt++) {
                        if (breakLottable[lt].trim() == '0') {
                            breakLottable[lt] = '';
                        }
                        skuRow = skuRow + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + lt + '" data-lottype="" style="width: 82px; text-align: center;display:none;">' + breakLottable[lt] + '</div>';
                        if (breakLottable[lt] != '' && breakLottable[lt] != '0') {
                            $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + lt + '"]').show();
                        }
                    }
                    */

                    //skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getLottable + '</div>';
                    //skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getCaseNetWeight + '</div>';
                    //skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getGrossWeight + '</div>';
                    //skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getTotalCarton + '</div>';
                    if ((orderstatus == 34) || (orderstatus == 0)) {
                        skuRow = skuRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action removediv" id="removebtndiv" style="display:none;"><button class="wms-srv-input wms-srv-button" type="button" onclick="removePOSkuItem(' + getSkuId + ',\'POremove\',\'' + getId + '\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button></div></div>';
                    }
                    else {
                        skuRow = skuRow + '<div class="wms-srv-grid-cell"></div>';
                    }
                    //skuRow = skuRow + '<div class="wms-srv-grid-cell"></div>';
                    skuRow = skuRow + '</div>';
                    // GRID ROW

                    if ((orderstatus == '27') || (orderstatus == '30') || (orderstatus == '28')) {
                        $("#btnPOSave").hide();
                        $("#btnAdd").hide();
                    }
                    else {
                        $("#btnPOSave").show();
                        $("#btnAdd").show();
                    }

                    $('#tlbPoOrderDetailsGrid').append(skuRow);

                    if (isvisible == '0') {
                        $(".removediv").show();

                    }
                    else {
                        $(".removediv").hide();
                        $("#divbtnsavepo").hide();
                    }
                }
                viewPoOrder();
                checkForAddNewSkuRowInward();
                showHideLottableCellForPOViewRow();
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    } else {
        viewPoOrder();
        checkForAddNewSkuRowInward();
        showHideLottableCellForPOViewRow();
    }
}
function formatCustomDate(strDate) {
    var d = new Date(strDate);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    var finalDate = da + '-' + mo + '-' + ye;
    return finalDate;
}
function viewPOHead(strCurrentOrder) {
    debugger;
    var obj = $('#ddlPageObject').val();
    if (obj == "PurchaseOrder") {
        $('#dvvtype').html('Vendor Name <span class="requiredStar">*</span>');
    }
    if (obj == "SalesReturn") {
        $('#dvvtype').html('Client Name <span class="requiredStar">*</span>');
    }
    if (obj == "Transfer") {
        $('#dvvtype').html('Warehouse Name <span class="requiredStar">*</span>');
    }

    if (strCurrentOrder != '0') {
        var apiPath = wmsApiPath + 'PO/GetPOHead';
        //var apiPath = 'http://localhost:50068/api/staging/v1/PO/GetPOHead'; 
        var getCustomerId = $("#ddlcustomer").val();
        var getWarehouseID = $("#ddlwarehouse").val();
        var getCompanyID = $('#hdnCompanyID').val();
        var getUserId = $("#hdnUserID").val();
        var strOrderId = strCurrentOrder;

        var postData =
        {
            CustomerId: getCustomerIdInward,
            WarehouseId: getWarehouseIdInward,
            UserId: getUserIdInward,
            OrderId: strOrderId,
            OrderType: getPageObject
        };

        // STATIC API DATA
        apiPath = 'StaticAPI/GetPOHead.json';
        postData = null;
        // STATIC API DATA

        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.StatusCode;
            var getStatus = data.Status.toLocaleLowerCase();
            var docRow = '';
            if (getCode == "Success") {
                var getResult = data.Result;
                var getPoHead = getResult.Table;
                var getTitle = getPoHead[0].Title;
                var getCustomerOrderRefNo = getPoHead[0].CustomerOrderRefNo;
                var getRequestNo = getPoHead[0].RequestNo;
                var getStatus = getPoHead[0].Status;
                var getStatusId = getPoHead[0].StatusId;
                var getCustomerName = getPoHead[0].CustomerName;
                var getCustomerId = getPoHead[0].CustomerId;
                var getDepartment = getPoHead[0].Department;
                var getDepartmentId = getPoHead[0].DepartmentId;
                var getRequestedBy = getPoHead[0].RequestedBy;
                var getRequestedById = getPoHead[0].RequestedById;
                var getRequestedDate = getPoHead[0].RequestedDate;
                var getExpDeliveryDate = getPoHead[0].ExpDeliveryDate;
                var getDefaultContact = getPoHead[0].DefaultContact;
                var getAlternateContact = getPoHead[0].AlternateContact;
                var getLocationID = getPoHead[0].LocationID;
                var getAlternateDeliveryAddress = getPoHead[0].AlternateDeliveryAddress;
                var getLocationDetails = getPoHead[0].LocationDetails;
                var getAddressDetails = getPoHead[0].AddressDetails;
                var getProjectType = getPoHead[0].ProjectType;
                var getSiteCode = getPoHead[0].SiteCode;
                var getSiteName = getPoHead[0].SiteName;
                var getLatitude = getPoHead[0].Latitude;
                var getLongitude = getPoHead[0].Longitude;
                var getAccessRequirement = getPoHead[0].AccessRequirement;
                var getRemark = getPoHead[0].Remark;
                var getPaymentMethod = getPoHead[0].PaymentMethod;
                var getPaymentMethodId = getPoHead[0].PaymentMethodId;

                $('#txtPOTitle').val(getTitle);
                $('#txtPoCustOrderRef').val(getCustomerOrderRefNo);
                $('#txtPoRequestNo').val(getRequestNo);
                // $('#').val(Status);
                $('#txtPoStatus').val(getStatusId);
                // $('#').val(CustomerName);
                $('#txtPoCustomerName').val(getCustomerId);
                // $('#').val(Department);
                $('#txtPoDepartmentName').val(getDepartmentId);
                // $('#').val(RequestedBy);
                $('#txtPoRequestedBy').val(getRequestedById);
                $('#txtPORequestDate').val(getRequestedDate);
                $('#txtPoExpDeliveryDate').val(getExpDeliveryDate);
                $('#txtPoDefaultContact').val(getDefaultContact);
                $('#txtPoAlternateContact').val(getAlternateContact);
                $('#txtPoLocationId').val(getLocationID);
                $('#txtPoAltDeliveryAddress').val(getAlternateDeliveryAddress);
                $('#txtPOLocationDetails').val(getLocationDetails);
                $('#txtPoAddressDetails').val(getAddressDetails);
                $('#txtPoProjectType').val(getProjectType);
                $('#txtPoSiteCode').val(getSiteCode);
                $('#txtPoSiteName').val(getSiteName);
                $('#txtPoLatitude').val(getLatitude);
                $('#txtPoLongitude').val(getLongitude);
                $('#txtPoAccessRequirement').val(getAccessRequirement);
                $('#txtPoRemark').val(getRemark);
                // $('#').val(PaymentMethod);
                $('#txtPoPaymentMode').val(getPaymentMethodId);
                var getorderfrom = $('#ddlRequestOrderType').val();
                viewOrderPoDetails(strCurrentOrder, getStatus, getorderfrom);
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
        $('#txtPoDeliveryDate').val(getCurrentDate);
        $('#txtPoCustomerRefNo').val('');
        $('#txtVendor').val('');
        $('#txtPoRemark').val('');
        $('#txtPoUserName').html(getUserName);
        $('#removebtndiv').show();
        $('#divbtnsavepo').show();
        $('#btnPOSave').show();
        viewOrderPoDetails(strCurrentOrder, 0, '');
    }
}

function savePOHead(rowId, isFinalSave) {
    debugger;
    if (validateHeadData(rowId, isFinalSave)) {
        var apiPath = wmsApiPath + 'PO/SavePOHead';
        var strOrderId = $('#hdnPoOid').val();
        var getInboundReceiptDate = $('#txtPoReceiptDate').val();
        var getExpectedDeliveryDate = $('#txtPoDeliveryDate').val();
        var getCustomerRefNo = $('#txtPoCustomerRefNo').val();
        var getRemark = $('#txtPoRemark').val();
        var getVendorId = $('#txtVendor').attr('data-id');

        var postData =
        {
            CustomerId: getCustomerIdInward,
            WarehouseId: getWarehouseId,
            UserId: getUserIdInward,
            Object: getPageObject,
            InboundReceiptDate: getInboundReceiptDate,
            ExpectedDeliveryDate: getExpectedDeliveryDate,
            CustomerRefNo: isBlankString(getCustomerRefNo),
            Remark: isBlankString(getRemark),
            Poid: strOrderId,
            VendorId: getVendorId
        };
        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.StatusCode;
            if (getCode == "Success") {
                if (isFinalSave != 'yes') {
                    var PoID = data.Result.OrderNo;
                    $('#spnPoOid').html(PoID);
                    $('#hdnPoOid').val(PoID);
                    savePODetails(rowId);
                } else {
                    // alert('Order saved successfully!!');
                    UpdatePOStatus();
                }
            }
            else {
                alert(data.Result.Message);
            }
            // After success
        });
    }
}
function savePODetails(rowId) {
    debugger;
    if (validatePoDetails(rowId)) {
        debugger;
        var apiPath = wmsApiPath + 'PO/SavePOSKUDetail';
        //var apiPath = 'http://localhost:50068/api/staging/v1/PO/SavePOSKUDetail';	
        var strCurrentOrder = $('#hdnPoOid').val();
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
            var getUOM = $("#addNew_UOM_" + rowId + " option:selected").text();
            var getUOMId = $("#addNew_UOM_" + rowId).val();
            var getOrderQty = $("#addNew_OrderQty_" + rowId).val();

            //if(getSkuId!=''||getItemCode!=''||getItemName!=''||getItemDescription!=''||getRequestedQty!=''||getUOM!=''||getOrderQty!='')

            var getLot = '';

            // COMMENTED AS ON 11 MARCH 2024
            /*
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
                */
            // COMMENTED AS ON 11 MARCH 2024

            // NEW LOTTABLE CODE AS ON 11 MARCH 2024
            var getAllLottables = $('.wmsFrmAddRow_' + rowId + ' .gridCellLottable');
            $(getAllLottables).each(function () {
                var getLotInput = $(this).find('input');
                if (getLotInput.length > 0) {
                    var getLotId = $(getLotInput).attr('data-id');
                    var getLotType = $(getLotInput).attr('data-description');
                    var getLotVal = $(getLotInput).val();
                    if (getLotVal.trim() != '') {
                        if (getLot == '') {
                            getLot += getLotId + ':' + getLotVal;
                        } else {
                            getLot += '|' + getLotId + ':' + getLotVal;
                        }
                    }
                }
            });
            // NEW LOTTABLE CODE AS ON 11 MARCH 2024

            var getCaseNetWeight = $("#addNew_CaseNetWeight_" + rowId).val();
            var getCaseGrossWeight = $("#addNew_CaseGrossWeight_" + rowId).val();
            var getTotalCarton = $("#addNew_TotalCarton_" + rowId).val();

            var postData =
            {
                "CustomerId": getCustomerIdInward,
                "WarehouseId": getWarehouseIdInward,
                "UserId": getUserIdInward,
                "OrderId": strCurrentOrder,
                "SkuId": getSkuId,
                "ItemCode": getItemCode,
                "ItemName": isBlankString(getItemName),
                "ItemDescription": isBlankString(getItemDescription),
                "RequestedQty": isBlankNumber(getRequestedQty),
                "UOM": getUOM,
                "UOMId": getUOMId,
                "OrderQty": isBlankNumber(getOrderQty),
                "Lottables": isBlankString(getLot),
                "CaseNetWeight": isBlankNumber(getCaseNetWeight),
                "CaseGrossWeight": isBlankNumber(getCaseGrossWeight),
                "TotalCarton": isBlankNumber(getTotalCarton)
            };
            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.StatusCode;
                var getvalidmsg = result.Result.Message;
                var docRow = '';
                if (getCode == "Success") {
                    removeAddNewRowInward(rowId);
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
            savePOHead(rowId, 'no');
        }
    }
}


function UpdatePOStatus() {

    debugger;
    var poid = $('#hdnPoOid').val();
    if (poid == '0') {
        alert('Please fill mandatory fields And add atleast One SKU !!');
    }
    else {
        var apiPath = wmsApiPath + 'PO/UpdatePOStatus';
        var poID = $("#hdnPoOid").val();
        var pooject = $('#ddlPageObject').val();
        var postData =
        {
            "OrderID": poID


        };

        callHttpUrl(apiPath, postData, function (result) {
            // After success
            var getCode = result.StatusCode;
            var orderstatus = result.Result.Message;
            if (getCode == 'Success') {
                loadInboundList();
                $('#wms-srv-order-popup').hide();

            }

        });


    }
}
function removePOSkuItem(recordId, obj, getLottable) {
    debugger;
    if (confirm('Are you sure you want to remove SKU Item?')) {
        var apiPath = wmsApiPath + 'PO/RemovePOSKU';

        // var apiPath = 'http://localhost:50068/api/staging/v1/PO/RemovePOSKU';	
        var strCurrentOrder = $('#hdnPoOid').val();
        if (strCurrentOrder != '0') {

            var postData =
            {

                "OrderId": strCurrentOrder,
                "Id": recordId,
                "obj": obj,
                "POIDDT": getLottable

            };
            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.StatusCode;
                var getStatus = result.Status.toLocaleLowerCase();
                //var getDescription = result.Description;
                var docRow = '';
                if (getCode == "Success") {
                    viewOrder(strCurrentOrder, false);
                }
                else {
                    alert('Failed to remove item!!');
                }
            });
        }
    }
}

function updateOrderQty(rowNum) {
    debugger;
    var getRequestQty = $('#addNew_RequestedQty_' + rowNum).val();
    var getUnitQty = $('#addNew_UOM_' + rowNum + ' option:selected').attr('data-unitqty');
    var totalOrderQty = Number(getRequestQty) * Number(getUnitQty);
    $('#addNew_OrderQty_' + rowNum).val(totalOrderQty);
}
function validateHeadData(rowId, isFinalSave) {
    var getPoDeliveryDate = $('#txtPoDeliveryDate').val();

    $('#txtPoDeliveryDate').removeClass('errorField');

    var isValid = true;
    var validationMsg = '';
    if (getPoDeliveryDate == '') {
        validationMsg = 'Please enter Exp. Delivery Date!!';
        $('#txtPoDeliveryDate').addClass('errorField');
        isValid = false;
    }

    if ($('#ddlPageObject').val() == "PurchaseOrder") {
        if ($('#txtVendor').val() == "") {
            validationMsg = 'Please select Vendor Name';
            $('#txtVendor').addClass('errorField');
            isValid = false;
        }
    }
    if ($('#ddlPageObject').val() == "SalesReturn") {
        if ($('#txtVendor').val() == "") {
            validationMsg = 'Please select Client Name';
            $('#txtVendor').addClass('errorField');
            isValid = false;
        }
    }
    if ($('#ddlPageObject').val() == "Transfer") {
        if ($('#txtVendor').val() == "") {
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
function validatePoDetails(rowId) {
    debugger;
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
    } else if (txtrefno == "") {
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
function searchForPoOrder() {
    var strOrderId = $('#hdnPoOid').val();
    var searchKey = $('#txtSearchForPoSku').val();
    SearchForSku(strOrderId, searchKey);
}
function addLottable(objNum) {
    if (!checkIfLottableExist()) {
        var getLottable = $('#addNew_Lottable').val();
        var getLottableType = $('#addNew_LottableType').val();
        if (getLottable.trim() != '' && getLottableType.trim() != '') {

            lotId = lotId + 1;
            var myLottable = '<div class="lottableBox" id="lottableBox' + lotId + '" data-id="' + lotId + '" data-type="' + getLottableType + '">' +
                '<label>' + getLottable + '</label> <a href="#" onclick="removeLottable(' + lotId + ');return false;"><i class="fas fa-times-circle"></i></a>' +
                '</div>';
            $('#pnlLottableHolder').append(myLottable);
            $('#pnlLottableHolder').show();
            $('#addNew_Lottable').val('');
            $('#addNew_LottableType').val('');
        }
        else {
            alert('Please enter lottable and lottable type!!');
        }

    } else {
        alert('Lottable type already added!!');
    }
}
function resetLottableInput() {
    $('#addNew_Lottable').val('');
    var getLottbleType = $('#addNew_LottableType').val();
    $('#addNew_Lottable').datepicker('destroy');
    if (getLottbleType == 'mfgdate') {
        $('#addNew_Lottable').datepicker({ dateFormat: 'dd-M-yy' });
    }
}
function checkIfLottableExist() {
    var isExist = false;
    var getLottbleType = $('#addNew_LottableType').val();
    var checkExistingLottableType = $('[data-type="' + getLottbleType + '"]');
    if (checkExistingLottableType.length > 0) {
        isExist = true;
    }
    return isExist;
}
function removeLottable(objNum) {
    $('#lottableBox' + objNum).remove();
    var getAllLottables = $('#pnlLottableHolder').text().trim();
    $('#lottableBox' + objNum).remove();
    if (getAllLottables == '') {
        $('#pnlLottableHolder').hide();
    }
}

function getLottableListBySku(strSkuId) {
    debugger;
    var apiPath = wmsApiPath + 'PO/getLottablevalues';

    //var apiPath ='http://localhost:50068/api/staging/v1/PO/getLottablevalues';

    var postData =
    {
        "prodID": strSkuId
    };

    if (strSkuId != '') {

        callHttpUrl(apiPath, postData, function (data) {
            //alert(data);
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                var getResult = data.Result;

                var getLottableList = getResult.Table;
                if (getLottableList.length > 0) {
                    for (var i = 0; i < getLottableList.length; i++) {
                        var getId = getLottableList[i].ID;
                        var getLottableDescription = getLottableList[i].LottableDescription;
                        var getLottableFormat = getLottableList[i].Lottableformat;
                        var datepickerClass = '';

                        if (getLottableFormat == 'Date') {
                            datepickerClass = 'wms-srv-datepicker';
                        }

                        var lottableInput = '<input type="text" value="" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + getLottableDescription + '" class="wmsLottableInput ' + datepickerClass + '"> ';
                        $('#addNew_Lottable').append(lottableInput);
                    }
                    $('.wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
                }
            }
            else {
                alert('Unable to connect!!');
            }
        });
    }
}



//Region Start 
function openPurchaseProductListPopup() {
    $('#wms-srv-Purchase-product-list-popup').show();
    $('#wms-srv-Purchase-product-list-popup-close').off();
    $('#wms-srv-Purchase-product-list-popup-close').click(function () {
        resetSkuListCart();
        $('#wms-srv-Purchase-product-list-popup').hide();
    });
    $('#pnlSkuListCart').off();
    $('#pnlSkuListCart').click(function () {
        showPOCartList();
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
    resetSkuList();
    getSkuList(0, 0);
}

function resetSkuList() {
    dataUniquePos = 0;
    getId = [];
    getValue = [];
    getProductName = [];
    getProductImage = [];
    getProdDescription = [];
    getCategory = [];
    getSubCategory = [];
    getGroupSet = [];
    getKeyword = [];
    getUPCBarcode = [];
    getCurrentStock = [];
    getReserveQty = [];
    getUOM = [];
    getLottable = [];
    getLottables = [];
}

function addToCartPurchaseOrder(objRow) {
    var getHeadCount = $('#pnlCartPurchaseOrder .wms-srv-grid-header').length;
    var getProdCount = $('#pnlCartPurchaseOrder .wms-srv-grid-row').length;
    var cartItem = $(objRow).clone().appendTo('#pnlCartPurchaseOrder');

    $(cartItem).find('.wms-srv-grid-action i').attr('class', 'fas fa-times-circle');
    $(cartItem).find('.wms-srv-grid-action i').attr('style', 'color:#000000;');

    if (getHeadCount <= 0) {
        var getHead = $(objRow).parent().find('.wms-srv-grid-header').clone().prependTo('#pnlCartPurchaseOrder');
        //$('#pnlCartPurchaseOrder').prepend(getHead);
    }

    $(cartItem).find('.btnSelectInwardProdFromList').off();
    $(cartItem).find('.btnSelectInwardProdFromList').click(function () {
        var objRow = $(this).parent().parent().parent();
        var skuId = $(objRow).attr('data-id');
        removeFromCartPurchaseOrder(skuId);
    });
    updateSkuListCartCount();
}

function removeFromCartPurchaseOrder(skuId) {
    //$(objRow).remove();
    $('#pnlPurchaseOrderProductList .wms-srv-grid-row[data-id="' + skuId + '"]').find('.wms-srv-grid-action i').attr('style', 'color:#000000');
    $('#pnlPurchaseOrderProductList .wms-srv-grid-row[data-id="' + skuId + '"]').find('.wms-srv-grid-action a.btnSelectInwardProdFromList').attr('data-isselected', 'no');
    $('#pnlCartPurchaseOrder .wms-srv-grid-row[data-id="' + skuId + '"]').remove();
    showEmptyPONoSkuMsg();
    updateSkuListCartCount();
}

function checkSkuWithCart() {
    $('#pnlCartPurchaseOrder .wms-srv-grid-row').each(function () {
        var getSkuId = $(this).attr('data-id');
        var skuListRow = $('#pnlPurchaseOrderProductList .wms-srv-grid-row[data-id="' + getSkuId + '"]');
        $(skuListRow).find('.btnSelectInwardProdFromList i').attr('style', 'color:#78b421');
        $(skuListRow).find('.btnSelectInwardProdFromList').attr('data-isselected', 'yes');
    });
}

function updateSkuListCartCount() {
    var skuListCartCount = $('#pnlCartPurchaseOrder .wms-srv-grid-row').length;
    $('#pnlSkuListCartCount').html(skuListCartCount);
}

function resetSkuListCart() {
    $('#pnlCartPurchaseOrder').html('');
    $('#pnlSkuListCartCount').html('0');
}

function showEmptyPONoSkuMsg() {
    var getCartCount = $('#pnlCartPurchaseOrder .wms-srv-grid-row').length;
    if (getCartCount <= 0) {
        $('#pnlCartPurchaseOrder').hide();
        $('#pnlEmptyPurchaseOrderCart').show();
    } else {
        $('#pnlCartPurchaseOrder').show();
        $('#pnlEmptyPurchaseOrderCart').hide();
    }
}

function showPOCartList() {
    showEmptyPONoSkuMsg();
    $('#wms-srv-PO-cart-list-popup').show();
    $('#wms-srv-Purchase-product-list-popup').hide();
    $('#wms-srv-PO-cart-list-popup-close').off();
    $('#wms-srv-PO-cart-list-popup-close').click(function () {
        $('#wms-srv-Purchase-product-list-popup').show();
        $('#wms-srv-PO-cart-list-popup').hide();
    });

    $('#btnSelectFromPOSkuList').off();
    $('#btnSelectFromPOSkuList').click(function () {
        $('#wms-srv-Purchase-product-list-popup').show();
        $('#wms-srv-PO-cart-list-popup').hide();
    });
}

// function getPoLotBySkuClientSide(lotId, lotLabel, lotFormat, strIsMultiple, strCounterNum) {
//     debugger;

//     var addNewLottableId = 'addNew_Lottable';
//     if (strIsMultiple != null && strIsMultiple == true) {
//         addNewLottableId = 'addNew_Lottable_' + strCounterNum;
//     }

//     var lottableInput = '';
//     $('#' + addNewLottableId).html('');

//     //var getlotvalue = '';
//     var getId = lotId;
//     //var getPODTId = getLottableList[i].PODTID;
//     var getLottableDescription = lotLabel;
//     var getLottableFormat = lotFormat.trim().toLowerCase();
//     var lottype = lotLabel;
//     //var gtlotcnt = getLottableList[i].lotcnt;

//     var datepickerClass = '', readtext = '';

//     if (getLottableFormat == 'Date' || getLottableFormat == 'dd/mm/yyyy' || getLottableFormat == 'mmm-yy' || getLottableFormat == 'wwyy') {
//         if (getLottableFormat != 'wwyy') {
//             datepickerClass = 'wms-srv-datepicker';
//             readtext = 'readonly';
//         } else {
//             weekPickerCtrlId = weekPickerCtrlId + 1;
//             datepickerClass = 'wms-srv-weekpicker wms-srv-weekpicker_' + weekPickerCtrlId;
//             readtext='readonly';
//         }

//     }
//     // if (obj == 'PurchaseOrder') {

//         lottableInput = '<input type="text" ' + readtext + ' value="" data-lottype="' + lottype + '" data-id="' + getId + '" data-description="' + getLottableDescription + '" placeholder="' + lottype + '" class="wmsLottableInput ' + datepickerClass + '" style="width:100%;"> ';
//         var getLottableHead = $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lottype="' + lottype + '"]');
//         if (getLottableHead.length == 0) {
//             var getFirstEmptyLotCell = $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable[data-lottype=""]').eq(0);
//             $(getFirstEmptyLotCell).show();
//             $(getFirstEmptyLotCell).html(lottype);
//             $(getFirstEmptyLotCell).attr('data-lottype', lottype);
//             var getLotIndex = $(getFirstEmptyLotCell).attr('data-lotindex');
//             $('#addNew_Lottable_' + getLotIndex + '_' + strCounterNum).append(lottableInput);
//             $('#addNew_Lottable_' + getLotIndex + '_' + strCounterNum).attr('data-lottype', lottype);
//             // $('#addNew_Lottable_'+ getLotIndex +'_' + strCounterNum).show();
//         } else {
//             $('#tlbPoOrderDetailsGrid .wmsFrmAddRow_' + strCounterNum + ' .gridCellLottable[data-lottype="' + lottype + '"]').append(lottableInput);
//             // $('#tlbPoOrderDetailsGrid .wmsFrmAddRow_'+ strCounterNum +' .gridCellLottable[data-lottype="' + lottype + '"]').show();
//         }
//         // showHideLottableCellForPO();
//         showHideLottableCellForPOViewRow();
//         //alert(getEmptyLottableHead.length);
//         // $('#' + addNewLottableId).append(lottableInput);
//     //}

//     if (getLottableFormat == 'Date' || getLottableFormat == 'dd/mm/yyyy') {
//         //$('.wms-srv-datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
//         $('.wms-srv-datepicker').datepicker({
//             onSelect: function (dateText, inst) {
//                 debugger;
//                 var ltype = $(this).attr('data-lottype');

//                 const today = new Date();
//                 const yyyy = today.getFullYear();
//                 let mm = today.getMonth() + 1; // Months start at 0!
//                 let dd = today.getDate();
//                 var tddate = mm + '/' + dd + '/' + yyyy;

//                 const seldate = new Date(dateText);
//                 let yy = seldate.getFullYear();
//                 let m = seldate.getMonth() + 1; // Months start at 0!
//                 let d = seldate.getDate();

//                 if (Number(d) < 10) {
//                     d = "0" + d;
//                 }
//                 if (Number(m) < 10) {
//                     m = "0" + m;
//                 }

//                 if (ltype == 'MfgDate' || ltype == 'Week MFG') {
//                     if (Date.parse(dateText) >= Date.parse(tddate)) {
//                         alert('Please select date less than Todays Date..!');
//                         $(this).val('');
//                     }
//                     else {
//                         $(this).val(d + '/' + m + '/' + yy);
//                     }
//                 }
//                 else if (ltype == 'ExpDate') {
//                     if (Date.parse(dateText) <= Date.parse(tddate)) {
//                         alert('Please select date greater than Todays Date..!');
//                         $(this).val('');
//                     }
//                     else {
//                         $(this).val(d + '/' + m + '/' + yy);
//                     }
//                 }
//                 else {
//                     $(this).val(d + '/' + m + '/' + yy);
//                 }
//             }
//         });
//     }
//     else if (getLottableFormat == 'mmm-yy') {
//         //$('.wms-srv-datepicker').datepicker({ dateFormat: 'M-yy' });
//         $('.wms-srv-datepicker').datepicker({
//             onSelect: function (dateText, inst) {
//                 debugger;
//                 var ltype = $(this).attr('data-lottype');

//                 const today = new Date();
//                 let yyyy = today.getFullYear();
//                 let mm = today.getMonth() + 1; // Months start at 0!
//                 let dd = today.getDate();

//                 var tddate = mm + '/' + dd + '/' + yyyy;

//                 const tday = new Date(dateText)
//                 var m = tday.toLocaleString('en-US', { month: 'short' })
//                 var y = dateText.toString().substr(-2);


//                 if (ltype == 'MfgDate' || ltype == 'Week MFG') {
//                     if (Date.parse(dateText) >= Date.parse(tddate)) {
//                         alert('Please select date less than Todays Date..!');
//                         $(this).val('');
//                     }
//                     else {
//                         $(this).val(m + '-' + y);
//                     }
//                 }
//                 else if (ltype == 'ExpDate') {
//                     if (Date.parse(dateText) < Date.parse(tddate)) {
//                         alert('Please select date greater than Todays Date..!');
//                         $(this).val('');
//                     }
//                     else {
//                         $(this).val(m + '-' + y);
//                     }
//                 }
//                 else {
//                     $(this).val(m + '-' + y);
//                 }
//             }
//         });
//     }
//     else if (getLottableFormat == 'wwyy') {
//         $('.wms-srv-weekpicker_' + weekPickerCtrlId).bisplWeekPicker({
//             onValidate: function (wObj, userWeek, userYear) {
//                 debugger;
//                 var isValidWeekMfg = true;
//                 var ltype = $(wObj).attr('data-lottype');

//                 const today = new Date();
//                 let yyyy = Number(today.getFullYear());
//                 let mm = today.getMonth() + 1; // Months start at 0!
//                 let dd = today.getDate();

//                 var tddate = mm + '/' + dd + '/' + yyyy;
//                 var currentWeek = today.getWeek();
//                 if (ltype == 'MfgDate' || ltype == 'Week MFG') {
//                     if (((userWeek == currentWeek || (userWeek > currentWeek)) && userYear == yyyy) || (userYear > yyyy)) {
//                         alert('Please select week less than Current Week..!');
//                         isValidWeekMfg = false;
//                     }
//                 }
//                 else if (ltype == 'ExpDate') {
//                     if ((userWeek <= currentWeek && userYear == yyyy) || (userYear < yyyy)) {
//                         alert('Please select Week greater than Current Week..!');
//                         isValidWeekMfg = false;
//                     }
//                 }
//                 return isValidWeekMfg;
//             }
//         });
//     }
// }


function returnDateToCompare(filterdate) {
    var breakDate = filterdate.split('/');
    var strDate = breakDate[1] + "/" + breakDate[0] + "/" + breakDate[2];
    var myDate = new Date(strDate);
    return myDate;
}


function getPoLotBySkuClientSide(lotId, lotLabel, lotFormat, strIsMultiple, strCounterNum) {
    debugger;

    var addNewLottableId = 'addNew_Lottable';
    if (strIsMultiple != null && strIsMultiple == true) {
        addNewLottableId = 'addNew_Lottable_' + strCounterNum;
    }

    var lottableInput = '';
    $('#' + addNewLottableId).html('');

    //var getlotvalue = '';
    var getId = lotId;
    //var getPODTId = getLottableList[i].PODTID;
    var getLottableDescription = lotLabel;
    var getLottableFormat = lotFormat.trim().toLowerCase();
    var lottype = lotLabel;
    //var gtlotcnt = getLottableList[i].lotcnt;

    var datepickerClass = '', readtext = '';

    if (getLottableFormat == 'Date' || getLottableFormat == 'dd/mm/yyyy' || getLottableFormat == 'mmm-yy' || getLottableFormat == 'wwyy') {
        if (getLottableFormat != 'wwyy') {
            datepickerClass = 'wms-srv-datepicker';
            readtext = 'readonly';
        } else {
            weekPickerCtrlId = weekPickerCtrlId + 1;
            datepickerClass = 'wms-srv-weekpicker wms-srv-weekpicker_' + weekPickerCtrlId;
            readtext = 'readonly';
        }

    }
    // if (obj == 'PurchaseOrder') {

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
    //}

    if (getLottableFormat == 'Date' || getLottableFormat == 'dd/mm/yyyy') {
        //$('.wms-srv-datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
        $('.wms-srv-datepicker').datepicker({
            dateFormat: 'dd/mm/yy',
            onSelect: function (dateText, inst) {
                debugger;
                var ltype = $(this).attr('data-lottype');

                today = new Date();
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                //var tddate = mm + '/' + dd + '/' + yyyy;
                tddate = dd + '/' + mm + '/' + yyyy;

                seldate = new Date(dateText);
                let yy = seldate.getFullYear();
                let m = seldate.getMonth() + 1; // Months start at 0!
                let d = seldate.getDate();

                /* if (Number(d) < 10) {
                     d = "0" + d;
                 }
                 if (Number(m) < 10) {
                     m = "0" + m;
                 }*/

                if (ltype == 'MfgDate' || ltype == 'Week MFG') {

                    //const tday = new Date(dateText)
                    // var m1 = tday.toLocaleString('en-US', { month: 'short' })
                    //var m1 = tday.getMonth() + 1;
                    //var y2 = dateText.toString().substr(-2);

                    // if (Date.parse(dateText) >= Date.parse(tddate)) {
                    if (returnDateToCompare(dateText) >= returnDateToCompare(tddate)) {
                        alert('Please select date less than Todays Date..!');
                        $(this).val('');
                    }
                    else {
                        //    $(this).val(d + '/' + m1 + '/' + yy);
                        //$(this).val(m1 + '/' + d + '/' + yy);
                    }
                }
                else if (ltype == 'ExpDate') {
                    // if (Date.parse(dateText) <= Date.parse(tddate)) {
                    if (returnDateToCompare(dateText) <= returnDateToCompare(tddate)) {
                        alert('Please select date greater than Todays Date..!');
                        $(this).val('');
                    }
                    else {
                        //  $(this).val(d + '/' + m + '/' + yy);
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


                if (ltype == 'MfgDate' || ltype == 'Week MFG') {
                    if (Date.parse(dateText) >= Date.parse(tddate)) {
                        alert('Please select date less than Todays Date..!');
                        $(this).val('');
                    }
                    else {
                        $(this).val(m + '-' + y);
                    }
                }
                else if (ltype == 'ExpDate') {
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
                if (ltype == 'MfgDate' || ltype == 'Week MFG') {
                    if (((userWeek == currentWeek || (userWeek > currentWeek)) && userYear == yyyy) || (userYear > yyyy)) {
                        alert('Please select week less than Current Week..!');
                        isValidWeekMfg = false;
                    }
                }
                else if (ltype == 'ExpDate') {
                    if ((userWeek <= currentWeek && userYear == yyyy) || (userYear < yyyy)) {
                        alert('Please select Week greater than Current Week..!');
                        isValidWeekMfg = false;
                    }
                }
                return isValidWeekMfg;
            }
        });
    }
}


function getSkuList(sequenceNo, counter) {
    debugger;
    apiPath = wmsApiPath + "CommFunAPI/GetPOSKUSuggest";
    var skey = $('#txtSo_ProdSearchpopup').val();
    postData = {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "ClientId": getCustomerIdInward,
        "OrderId": "0",
        "skey": skey,
        "isSuggestionList": "no",
        "lastSeqno": sequenceNo
    }


    callHttpUrl(apiPath, postData, function (data) {
        getStatus = data.Status
        if (getStatus = 200) {

            var suggestionList = data.Result.SKUSuggestList;

            // $('#pnlPurchaseOrderProductList').html('');
            // $('#pnlPurchaseOrderProductList').append('<div class="wms-srv-grid-header">' +
            //     '<div class="wms-srv-grid-cell" style="width:80px;">Sr. No</div>' +
            //     '<div class="wms-srv-grid-cell">Image</div>' +
            //     '<div class="wms-srv-grid-cell">SKU Code</div>' +
            //     '<div class="wms-srv-grid-cell">SKU Name</div>' +
            //     '<div class="wms-srv-grid-cell">Description</div>' +
            //     '<div class="wms-srv-grid-cell">Category</div>' +
            //     '<div class="wms-srv-grid-cell">Sub Category</div>' +
            //     //'<div class="wms-srv-grid-cell">Lottable</div>' +
            //     //'<div class="wms-srv-grid-cell">Keyword</div>' +
            //     '<div class="wms-srv-grid-cell">Group Set</div>' +
            //     '<div class="wms-srv-grid-cell">Current Stock</div>' +
            //     '<div class="wms-srv-grid-cell">Reserve Qty</div>' +
            //     '<div class="wms-srv-grid-cell" style="width:80px;">Action</div>' +
            //     '</div>');

            // var getId = [];
            // var getValue = [];
            // var getProductName = [];
            // var getProductImage = [];
            // var getProdDescription = [];
            // var getCategory = [];
            // var getSubCategory = [];
            // var getGroupSet = [];
            // var getKeyword = [];
            // var getUPCBarcode = [];
            // var getCurrentStock = [];
            // var getReserveQty = [];
            // var getUOM = [];
            // var getLottable = [];
            // var getLottables = [];


            for (var i = 0; i < suggestionList.length; i++) {
                var rowNum = counter + i + 1;
                dataUniquePos = dataUniquePos + 1;
                getId[dataUniquePos] = suggestionList[i].ID;
                getValue[dataUniquePos] = suggestionList[i].ProductCode;
                getProductName[dataUniquePos] = suggestionList[i].Name;
                getProductImage[dataUniquePos] = suggestionList[i].ImagePath;
                getProdDescription[dataUniquePos] = suggestionList[i].Description;
                getCategory[dataUniquePos] = suggestionList[i].Category;
                getSubCategory[dataUniquePos] = suggestionList[i].SubCategory;
                getGroupSet[dataUniquePos] = suggestionList[i].GroupSet;
                getKeyword[dataUniquePos] = suggestionList[i].SKey;
                //getKeyword[i] = 'MySku|Food|Veg';
                getUPCBarcode[dataUniquePos] = suggestionList[i].UPCBarcode;
                getCurrentStock[dataUniquePos] = suggestionList[i].CurrentStock;
                getReserveQty[dataUniquePos] = suggestionList[i].ResurveQty;
                getUOM[dataUniquePos] = suggestionList[i].UOM;
                getLottable[dataUniquePos] = suggestionList[i].Lottable;
                getLottables[dataUniquePos] = suggestionList[i].Lottables;

                var strLottable = '';
                for (var l = 0; l < getLottable[dataUniquePos].length; l++) {
                    var lotID = getLottable[dataUniquePos][l].ID;
                    var lotName = getLottable[dataUniquePos][l].Name;
                    var lotType = getLottable[dataUniquePos][l].DataType;
                    if (strLottable == '') {
                        strLottable = lotID + ':' + lotName + ':' + lotType;
                    } else {
                        strLottable = strLottable + ' | ' + lotID + ':' + lotName + ':' + lotType;
                    }
                }

                //  getId[dataUniquePos], getValue[dataUniquePos], getProductName[dataUniquePos], getProdDescription[dataUniquePos]


                $('#pnlPurchaseOrderProductList').append('<div class="wms-srv-grid-row" data-id="' + getId[dataUniquePos] + '" data-value="' + getValue[dataUniquePos] + '" data-prodname="' + getProductName[dataUniquePos] + '"  data-proddesc="' + getProdDescription[dataUniquePos] + '" data-lot="' + strLottable + '">' +
                    '<div class="wms-srv-grid-cell" style="width:80px;">' + rowNum + '</div>' +
                    '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage[dataUniquePos] + '" style="width:40px;height:40px;" /></div>' +
                    '<div class="wms-srv-grid-cell">' + getValue[dataUniquePos] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getProductName[dataUniquePos] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getProdDescription[dataUniquePos] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getCategory[dataUniquePos] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getSubCategory[dataUniquePos] + '</div>' +
                    // '<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>' +
                    //'<div class="wms-srv-grid-cell" id="cellKeyWordHolder_' + rowNum + '"><i class="fas fa-plus-circle btnAddProductKeyword" onclick="showAddKeywordPanel(' + getId[i] + ',' + rowNum + ')"></i> ' + convertToKeyblock(getKeyword[i], getId[i], rowNum) + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getGroupSet[dataUniquePos] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getCurrentStock[dataUniquePos] + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getReserveQty[dataUniquePos] + '</div>' +
                    '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
                    // '<a href="#" class="wms-srv-icononly btnAddToProductListField" data-pos="' + i + '"><i class="fas fa-check-circle"></i></a>' +
                    '<a href="#" class="wms-srv-icononly btnSelectInwardProdFromList" data-pos="' + dataUniquePos + '"  data-isselected="no"><i class="fas fa-check-circle"></i></a>' +
                    '</div></div>' +
                    '</div>');
            }
            var scrollObj = '#wms-srv-Purchase-product-list-popup .wms-srv-popup';
            var scrollContentObj = '#wms-srv-Purchase-product-list-popup .wms-srv-popup-content';
            attachScrollBottomEvent(scrollObj, scrollContentObj, function () {
                var lastArrNum = getId.length - 1;
                var newCounter = counter + (lastArrNum + 1);
                getSkuList(getId[lastArrNum], newCounter);
            });
            $('#pnlPurchaseOrderProductList .btnSelectInwardProdFromList').off();
            $('#pnlPurchaseOrderProductList .btnSelectInwardProdFromList').click(function () {
                var isSelected = $(this).attr('data-isselected');
                if (isSelected == 'no') {
                    $(this).attr('data-isselected', 'yes');
                    $(this).find('i').attr('style', 'color:#78b421');
                    // FOR CART CODE - 22 April 2024
                    var k = Number($(this).attr('data-pos'));
                    var objRow = $(this).parent().parent().parent();
                    addToCartPurchaseOrder(objRow);
                    // FOR CART CODE - 22 April 2024
                } else {
                    $(this).attr('data-isselected', 'no');
                    $(this).find('i').attr('style', '');
                    var objRow = $(this).parent().parent().parent();
                    var skuId = $(objRow).attr('data-id');
                    removeFromCartPurchaseOrder(skuId);
                }

            });

            $('#btnAddSkuToInwardOrder').off();
            $('#btnAddSkuToInwardOrder').click(function () {
                //$('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').remove();
                /* $('.btnSelectInwardProdFromList[data-isselected="yes"]').each(function () {
                    var listItemObj = $(this);
                    var k = Number($(this).attr('data-pos'));
                    addMultipleInwardProduct(getId[k], getValue[k], getProductName[k], getProdDescription[k]);
                   // addMultipleProduct(getValue[k], getId[k], getProductName[k], getCurrentStock[k], getReserveQty[k], getUOM[k], getLottable[k], getLottables[k]);
                    $('#wms-srv-Purchase-product-list-popup').hide();
                }); */
                //showWMSThemeLoading();                
                $('#pnlCartPurchaseOrder .wms-srv-grid-row').each(function () {
                    var getId = $(this).attr('data-id');
                    var getValue = $(this).attr('data-value');
                    var getProductName = $(this).attr('data-prodname');
                    var getProdDescription = $(this).attr('data-proddesc');
                    var getProdLottableGroup = $(this).attr('data-lot');
                    addMultipleInwardProduct(getId, getValue, getProductName, getProdDescription, getProdLottableGroup);
                    //$('#wms-srv-Purchase-product-list-popup').hide();
                });
                $('#wms-srv-Purchase-product-list-popup').hide();
                resetSkuListCart();
                checkForAddNewSkuRowInward();
                //hideWMSThemeLoading();
            });

            $('.btnAddToProductListField').off();
            $('.btnAddToProductListField').click(function () {
                debugger;
                $('#txtSo_ProdSearchpopup').val('');
                $('#txtSo_ProdSearchLottablepopup').val('');
                var listItemObj = $(this);
                var getListPos = Number($(this).attr('data-pos'));

                $('#addNew_ItemCode').val(getId[getListPos]);
                $('#addNew_ItemCode').attr('data-id', getId[getListPos]);
                $('#addNew_ItemCode').val(getValue[getListPos]);

                $('#addNew_Name').val(getProductName[getListPos]);

                $('#addNew_Description').val(getProdDescription[getListPos]);

                GetUomBySKU(getId[getListPos], '0', 'PurchaseOrder');
                getLottableBySku(getId[getListPos], 'PurchaseOrder', '0', '');

                $('#wms-srv-Purchase-product-list-popup').hide();
            });
            checkSkuWithCart();
        }
    });
}

function GetUomForMultipleSKU(strCounterNum, strSkuId, strSelectedUomId, strObj) {
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
    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            var getResult = data.Result;
            $('#addNew_UOM_' + strCounterNum).html('');
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
                    $('#addNew_UOM_' + strCounterNum).append(htmlOption);
                }
            }
        }
    });
}

function addMultipleInwardProduct(getId, getValue, getProductName, getProdDescription, getProdLottables) {
    debugger;
    var isValidSkuCode = isValidSkuToAdd(getValue);
    if (isValidSkuCode) {
        var getLottableHead = $('#tlbPoOrderDetailsGrid .wms-srv-grid-header .gridCellLottable');
        var lotType0 = $(getLottableHead).eq(0).attr('data-lottype');
        var lotType1 = $(getLottableHead).eq(1).attr('data-lottype');
        var lotType2 = $(getLottableHead).eq(2).attr('data-lottype');
        var lotType3 = $(getLottableHead).eq(3).attr('data-lottype');
        var lotType4 = $(getLottableHead).eq(4).attr('data-lottype');
        var lotType5 = $(getLottableHead).eq(5).attr('data-lottype');
        var lotType6 = $(getLottableHead).eq(6).attr('data-lottype');
        var lotType7 = $(getLottableHead).eq(7).attr('data-lottype');
        var lotType8 = $(getLottableHead).eq(8).attr('data-lottype');
        var lotType9 = $(getLottableHead).eq(9).attr('data-lottype');
        var addNewRowHtml = '<div class="wms-srv-grid-row wmsFrmAddRow wmsFrmAddRow_' + addInwardRowCounter + '">' +
            '<div class="wms-srv-grid-cell" style="text-align:center">0</div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center">' +
            '<div class="wms-srv-suggestion-holder"><input type="text" id="addNew_ItemCode_' + addInwardRowCounter + '" data-prefix="SESKU" value="" class="txtItemCode wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getSuggestionList(this,\'' + poobj + '\');" style="min-width:100px;">' +
            '<a href="#" data-prefix="SE"><i class="fas fa-search" onclick="openPurchaseProductListPopup()"></i></a>' +
            '</div></div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_Name_' + addInwardRowCounter + '" value="" class="wms-srv-grid-cell-input" disabled="" style="min-width:100px;"></div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_Description_' + addInwardRowCounter + '" value="" class="wms-srv-grid-cell-input" disabled=""></div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_RequestedQty_' + addInwardRowCounter + '" onchange="updateOrderQty(' + addInwardRowCounter + ');" onkeypress="return isNumber(event)" value="" class="wms-srv-grid-cell-input"></div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center"><select class="wms-srv-grid-cell-input" id="addNew_UOM_' + addInwardRowCounter + '" onchange="updateOrderQty(' + addInwardRowCounter + ');"></select></div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_OrderQty_' + addInwardRowCounter + '" value="" class="wms-srv-grid-cell-input" disabled=""></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="0" data-lottype="' + lotType0 + '" id="addNew_Lottable_0_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="1" data-lottype="' + lotType1 + '" id="addNew_Lottable_1_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="2" data-lottype="' + lotType2 + '" id="addNew_Lottable_2_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="3" data-lottype="' + lotType3 + '" id="addNew_Lottable_3_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="4" data-lottype="' + lotType4 + '" id="addNew_Lottable_4_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="5" data-lottype="' + lotType5 + '" id="addNew_Lottable_5_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="6" data-lottype="' + lotType6 + '" id="addNew_Lottable_6_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="7" data-lottype="' + lotType7 + '" id="addNew_Lottable_7_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="8" data-lottype="' + lotType8 + '" id="addNew_Lottable_8_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="9" data-lottype="' + lotType9 + '" id="addNew_Lottable_9_' + addInwardRowCounter + '" style="width:82px;text-align:center;display:none;"></div>' +
            // '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="addNew_Lottable_'+ addInwardRowCounter +'"></div></div>'+
            '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number" id="addNew_CaseNetWeight_' + addInwardRowCounter + '" value="" class="wms-srv-grid-cell-input"></div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number" id="addNew_CaseGrossWeight_' + addInwardRowCounter + '" value="" class="wms-srv-grid-cell-input"></div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number" onkeypress="return isNumber(event)" id="addNew_TotalCarton_' + addInwardRowCounter + '" value="" class="wms-srv-grid-cell-input"></div>' +
            '<div class="wms-srv-grid-cell" style="text-align:center"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="savePODetails(' + addInwardRowCounter + ');"><i class="fas fa-check-circle"></i><span>Save</span></button>' +
            '<div class="wms-srv-action-sep">|</div>' +
            '<a href="#" title="Cart" data-prefix="RM" onclick="removeAddNewRowInward(' + addInwardRowCounter + ');" class="wms-srv-icononly"><i class="fas fa-times-circle"></i></a>' +
            '</div></div></div>';
        $('#tlbPoOrderDetailsGrid .wms-srv-grid-header').after(addNewRowHtml);

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
        showHideLottableCellForPOViewRow();

        GetUomBySKU(getId, '0', 'PurchaseOrder', true, addInwardRowCounter);

        // GET LOTTABLE - NEW CODE BY ABHIJIT - 27 MAY 2024
        if (getProdLottables.trim() != '') {
            if (getProdLottables.indexOf('|' > -1)) {
                var groupProdLot = getProdLottables.split('|');
                for (var grp = 0; grp < groupProdLot.length; grp++) {
                    if (groupProdLot[grp].indexOf(':' > -1)) {
                        var breakProdLot = groupProdLot[grp].split(':');
                        var lotId = breakProdLot[0];
                        var lotLabel = breakProdLot[1];
                        var lotFormat = breakProdLot[2];
                        getPoLotBySkuClientSide(lotId, lotLabel, lotFormat, true, addInwardRowCounter);

                    }
                }
            } else {
                if (getProdLottables.indexOf(':' > -1)) {
                    var breakProdLot = getProdLottables.split(':');
                    var lotId = breakProdLot[0];
                    var lotLabel = breakProdLot[1];
                    var lotFormat = breakProdLot[2];
                    getPoLotBySkuClientSide(lotId, lotLabel, lotFormat, true, addInwardRowCounter);
                }
            }
        }
        // GET LOTTABLE - TEMP COMMENTED BY ABHIJIT - 27 MAY 2024
        // getLottableBySku(getId, 'PurchaseOrder', '0', '', true, addInwardRowCounter);

        $('#wms-srv-Purchase-product-list-popup').hide();
    } else {
        alert('The SKU "' + getValue + '" already added in the list');
    }
    addInwardRowCounter = addInwardRowCounter + 1;
}

// ASYNC FUNCTION 
// function myDisplayer(some) {
//     alert(some);
// }

// async function myFunction() {return "Hello";}

// myFunction().then(
//     function(value) {
//         myDisplayer(value);
//     }
//   );

// ASYNC  function 

function showHideLottableCellForPOViewRow() {
    var getAddNewRowCount = $('#tlbPoOrderDetailsGrid .wmsFrmAddRow').length;
    var getViewRowCount = $('#tlbPoOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow').length;
    var getTotalLotRowCount = getAddNewRowCount + getViewRowCount;
    $('#tlbPoOrderDetailsGrid .gridCellLottable').show();
    for (var l = 0; l < 10; l++) {
        // CHECK FOR VIEW ONLY EMPTY CELL
        var getCell = $('#tlbPoOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow .gridCellLottable[data-lotindex="' + l + '"]').length;
        var getAddCell = $('#tlbPoOrderDetailsGrid .wmsFrmAddRow .gridCellLottable[data-lotindex="' + l + '"]').length;
        var totalCell = getCell + getAddCell;

        var getEmptyCell = $('#tlbPoOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;
        var getAddEmptyCell = $('#tlbPoOrderDetailsGrid .wmsFrmAddRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;
        var totalEmptyCell = getEmptyCell + getAddEmptyCell;

        if (totalCell > 0) {
            if (totalCell != totalEmptyCell) {
                $('#tlbPoOrderDetailsGrid .gridCellLottable[data-lotindex="' + l + '"]').show();
            } else {
                $('#tlbPoOrderDetailsGrid .gridCellLottable[data-lotindex="' + l + '"]').hide();
            }
        } else {
            $('#tlbPoOrderDetailsGrid .gridCellLottable[data-lotindex="' + l + '"]').hide();
        }


        // // CHECK FOR VIEW ONLY EMPTY CELL
        // if(getViewRowCount > 0){
        //     var getEmptyCell = $('#tlbPoOrderDetailsGrid .wmSkuDetailsPurchaseOrderRow .gridCellLottable[data-lotindex="'+ l +'"]:empty');
        //     if(getEmptyCell.length <= 0){
        //         $('#tlbPoOrderDetailsGrid .gridCellLottable[data-lotindex="'+ l +'"]').show();
        //     }
        // }
        // // CHECK FOR ADD ROW EMPTY CELL
        // if(getAddNewRowCount > 0){
        //     var getAddEmptyCell = $('#tlbPoOrderDetailsGrid .wmsFrmAddRow .gridCellLottable[data-lotindex="'+ l +'"]:empty');
        //     if(getAddEmptyCell.length <= 0){
        //         $('#tlbPoOrderDetailsGrid .gridCellLottable[data-lotindex="'+ l +'"]').show();
        //     }
        // }
    }
}

function isValidSkuToAdd(skuCode) {
    var isValid = true;
    $('#tlbPoOrderDetailsGrid .txtItemCode').each(function () {
        var addedSkuCode = $(this).val();
        if (skuCode == addedSkuCode) {
            isValid = false;
        }
    });
    return isValid;
}

function removeAddNewRowInward(rowNum) {
    $('#tlbPoOrderDetailsGrid .wmsFrmAddRow_' + rowNum).remove();
    checkForAddNewSkuRowInward();
}

function checkForAddNewSkuRowInward() {
    var rowLength = $('#tlbPoOrderDetailsGrid .wms-srv-grid-row').length;
    if (rowLength > 0) {
        $('#pnlNoInwardSkuRecord').hide();
    } else {
        $('#pnlNoInwardSkuRecord').show();
    }
}

function valid_numbers(e) {
    if (e < 0) {
        alert('Please enter  valid numbers')
        return false;
    }
    return true;
}

function POPupclosepopup() {

    debugger;
    var poval = $('#spnPoOid').html();
    if (poval != 'To be Generated') {

        var apiPath = wmsApiPath + 'PO/closePOPopUP';
        var poID = $("#hdnPoOid").val();
        if (poID != '0') {
            var postData =
            {

                "orderID": poID

            };
            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.StatusCode;
                var getStatus = result.Status.toLocaleLowerCase();
                var getdata = result.Result.Message;
                //var getDescription = result.Description;
                var docRow = '';
                if (getdata == "Found") {

                    $('#wms-srv-order-popup-close').off();
                    $('#wms-srv-order-popup-close').click(function () {
                        $('#wms-srv-order-popup').hide();
                    });
                }
                else if (getdata == "Notfound") {

                    removePOSkuItem(0, 'ClosePO', '');
                }
                else {
                    alert('Failed to remove item!!');
                }
            });
        }
    }
}
// End Region 
//#endregion

function openVendorListPopup() {
    $('#wms-srv-Vendor-list-popup').show();
    $('#wms-srv-Vendor-list-popup-close').off();
    $('#wms-srv-Vendor-list-popup-close').click(function () {
        $('#wms-srv-Vendor-list-popup').hide();
    });
    loadVendorList();
}

function loadVendorList() {
    debugger;
    if ($('#ddlPageObject').val() == "PurchaseOrder") {
        $('#lblvendor').html('Search Vendor: ');
        $('#spnheader').html('Vendor List');
    }
    if ($('#ddlPageObject').val() == "SalesReturn") {
        $('#lblvendor').html('Search Client: ');
        $('#spnheader').html('Client List');
    }
    if ($('#ddlPageObject').val() == "Transfer") {
        $('#lblvendor').html('Search Warehouse: ');
        $('#spnheader').html('Warehouse List');
    }

    var obj = $('#ddlPageObject').val();
    var skey = $('#txtvendorsearch').val();
    var apiPath = wmsApiPath + "PO/vendorList";
    //var apiPath = "http://localhost:50068/api/staging/v1/PO/vendorList";
    getCompanyId = mBrillWmsSession.getCompanyId();
    var postData = {
        "CompanyId": getCompanyId,
        "WarehouseId": getWarehouseId,
        "CustomerId": getCustomerId,
        "UserId": getUserId,
        "Object": obj,
        "Skey": skey
    };


    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.StatusCode;
        var getStatus = data.Status;
        if (getStatus == '200' && getStatusCode == 'Success') {
            var suggestionList = data.Result.Table;
            $('#pnlPOVendorList').html('');
            $('#pnlPOVendorList').append('<div class="wms-srv-grid-header">' +
                '<div class="wms-srv-grid-cell" style="width:80px;">Sr. No</div>' +
                '<div class="wms-srv-grid-cell"> Name</div>' +
                '<div class="wms-srv-grid-cell" style="width:80px;">Action</div>' +
                '</div>');

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getValue = suggestionList[i].Name;
                var rowNum = i + 1;
                $('#pnlPOVendorList').append('<div class="wms-srv-grid-row">' +
                    '<div class="wms-srv-grid-cell">' + rowNum + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getValue + '</div>' +
                    '<div class="wms-srv-grid-cell">' +
                    '<div class="wms-srv-grid-action">' +
                    '<a href="#" class="wms-srv-icononly" onclick="addToVendorField(' + getId + ', \'' + getValue + '\');return false;"><i class="fas fa-check-circle"></i></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
            }
        }
    });
}

function VendorList() {
    debugger;
    $('#txtvendorsearch').val('');
    if ($('#ddlPageObject').val() == "PurchaseOrder") {
        $('#lblvendor').html('Search Vendor: ');
        $('#spnheader').html('Vendor List');
    }
    if ($('#ddlPageObject').val() == "SalesReturn") {
        $('#lblvendor').html('Search Client: ');
        $('#spnheader').html('Client List');
    }
    if ($('#ddlPageObject').val() == "Transfer") {
        $('#lblvendor').html('Search Warehouse: ');
        $('#spnheader').html('Warehouse List');
    }

    var apiPath = wmsApiPath + "PO/vendorList";

    var obj = $('#ddlPageObject').val();

    var postData = {
        "CompanyId": getCompanyId,
        "WarehouseId": getWarehouseId,
        "CustomerId": getCustomerId,
        "UserId": getUserId,
        "Object": obj,
        "Skey": ''
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.StatusCode;
        var getStatus = data.Status;
        if (getStatus == '200' && getStatusCode == 'Success') {
            var suggestionList = data.Result.Table;
            $('#pnlPOVendorList').html('');
            $('#pnlPOVendorList').append('<div class="wms-srv-grid-header">' +
                '<div class="wms-srv-grid-cell" style="width:80px;">Sr. No</div>' +
                '<div class="wms-srv-grid-cell"> Name</div>' +
                '<div class="wms-srv-grid-cell" style="width:80px;">Action</div>' +
                '</div>');

            for (var i = 0; i < suggestionList.length; i++) {
                var getId = suggestionList[i].ID;
                var getValue = suggestionList[i].Name;
                var rowNum = i + 1;
                $('#pnlPOVendorList').append('<div class="wms-srv-grid-row">' +
                    '<div class="wms-srv-grid-cell">' + rowNum + '</div>' +
                    '<div class="wms-srv-grid-cell">' + getValue + '</div>' +
                    '<div class="wms-srv-grid-cell">' +
                    '<div class="wms-srv-grid-action">' +
                    '<a href="#" class="wms-srv-icononly" onclick="addToVendorField(' + getId + ', \'' + getValue + '\');return false;"><i class="fas fa-check-circle"></i></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
            }
        }
    });
}

function addToVendorField(cId, cName) {
    $('#txtVendor').attr('data-id', cId);
    $('#txtVendor').val(cName);
    $('#wms-srv-Vendor-list-popup').hide();
}