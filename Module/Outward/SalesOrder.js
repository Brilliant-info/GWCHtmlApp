var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId = mBrillWmsSession.getClientId();
var getUserName = mBrillWmsSession.getUserName();
var getCurrentDate = "";
var getImageDirPath = wmsAppFiles;
var addNewRowCounter = 0;
var getIsEdit = '0';

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

function viewOrder(orderId, orderStatus) {
  debugger;
  var getLottable = mBrillWmsSession.getCustomerLottable();
  var breakCustLot = getLottable.split(',');
  for (var pl = 0; pl < breakCustLot.length; pl++) {
    var custLotLabel = breakCustLot[pl];
    $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').html(custLotLabel);
    $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').attr('data-lottype', custLotLabel);
    $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').hide();
  }

  $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').remove();
  $('#wms-srv-order-popup').show();
  $('#wms-srv-order-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
  var getOrderNo = $('#txtSo_ReqNo').text().trim();
  var getOrderStatus = orderStatus.trim();
  $('#wms-srv-order-popup').attr('data-status', orderStatus);
  $('#wms-srv-order-popup-close').off();
  $('#wms-srv-order-popup-close').click(function () {
    if (getOrderNo != 'To be generated' && getOrderStatus == 'Composing') {
      alert('Your order will be saved in composing mode!!');
    }
    closeCreateSalesOrderForm();
  });

  bindOrderHead(orderId, orderStatus);
  bindClientSuggestion();
  bindBillToAddressSuggestion();
  bindShipToAddressSuggestion();
  bindSkuCodeSuggestion();
  showCurrentDate();
}

function bindOrderHead(orderId, orderStatus) {
  debugger;
  var getSource = salesOrderHeadArr[orderId].Source;
  var getOrderNo = salesOrderHeadArr[orderId].OrderNo;
  var getSAPNo = salesOrderHeadArr[orderId].SAPOrderNo;
  var getCustomerPo = salesOrderHeadArr[orderId].CustomerPO;
  var getGroupName = salesOrderHeadArr[orderId].GroupName;
  var getOrderDate = salesOrderHeadArr[orderId].OrderDate;
  var getExpectedDeliveryDate = salesOrderHeadArr[orderId].ExpDeliveryDt;
  var getPriority = salesOrderHeadArr[orderId].Priority;
  var getDeliveryType = salesOrderHeadArr[orderId].DeliveryType;
  var getBillingAddress = salesOrderHeadArr[orderId].BillToAddress;
  var getBillingAddressId = salesOrderHeadArr[orderId].BillToAddressId;
  var getShippingAddress = salesOrderHeadArr[orderId].ShippingAddress;
  var getShippingAddressId = salesOrderHeadArr[orderId].ShippingAddressId;
  var getClientCode = salesOrderHeadArr[orderId].ClientCode;
  var getClientId = salesOrderHeadArr[orderId].ClientId;
  var getCreatedByUser = salesOrderHeadArr[orderId].CreatedByUser;
  var getCreatedById = salesOrderHeadArr[orderId].CreatedBy;
  var getRemark = salesOrderHeadArr[orderId].Remark;
  var getStatus = salesOrderHeadArr[orderId].Status;

  $('#txtSo_ReqNo').html(getOrderNo);
  $('#txtSo_ReqDate').html(getOrderDate);
  $('#txtSo_DeliveryDate').val(getExpectedDeliveryDate);
  $('#txtSo_CustomerPoNo').val(getCustomerPo);
  $('#txtSo_DeliveryType').val(getDeliveryType);
  $('#txtSo_SAPOrderNo').val(getSAPNo);
  $('#txtSo_Client').val(getClientCode);
  $('#txtSo_Client').attr('data-id', getClientId);
  $('#txtSo_BillToAddress').val(getBillingAddress);
  $('#txtSo_BillToAddress').attr('data-id', getBillingAddressId);
  $('#txtSo_ShipToAddress').val(getShippingAddress);
  $('#txtSo_ShipToAddress').attr('data-id', getShippingAddressId);
  $('#txtSo_Priority').val(getPriority);
  $('#txtSo_CreatedBy').html(getCreatedByUser);
  $('#txtSo_CreatedBy').attr('data-id', getCreatedById);
  $('#txtSo_Remark').val(getRemark);
  getSkuDetailsBySalesOrder();
  var getSalesOrderStatus = $('#wms-srv-order-popup').attr('data-status');
  if (getSalesOrderStatus != 'addnew' && getSalesOrderStatus != '37' && getIsEdit != 0) {
    deactiveSalesOrderEditing(getSalesOrderStatus);
  } else {
    activateSalesOrderEditing();
  }
}

function activateSalesOrderEditing() {
  $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').show();
  $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-cell:last-child').show();
  $('#wms-srv-order-popup .wms-srv-productsearch').show();
  $('#btnCloseCreateSalesOrderForm').show();
  $('#wms-srv-order-popup i.fa-search').show();
  $('#wms-srv-order-popup .pnlWmsHead select, #wms-srv-order-popup .pnlWmsHead input').not('[id="txtSo_SAPOrderNo"]').prop('disabled', false);
}

function deactiveSalesOrderEditing(getstatuschk) {
  debugger;
  $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').hide();
  // if(getstatuschk != 31 )
  // {
  //   $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-cell:last-child').hide();
  // }
  if (getIsEdit == 1) {
    $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-cell:last-child').hide();
  }

  $('#wms-srv-order-popup .wms-srv-productsearch').hide();
  $('#btnCloseCreateSalesOrderForm').hide();
  $('#wms-srv-order-popup i.fa-search').hide();
  $('#wms-srv-order-popup .pnlWmsHead select, #wms-srv-order-popup .pnlWmsHead input').prop('disabled', true);
}

function addOrder() {
  debugger;

  var getLottable = mBrillWmsSession.getCustomerLottable();
  var breakCustLot = getLottable.split(',');
  for (var pl = 0; pl < breakCustLot.length; pl++) {
    var custLotLabel = breakCustLot[pl];
    $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').html(custLotLabel);
    $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').attr('data-lottype', custLotLabel);
    $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + pl + '"]').hide();
  }

  if ($('#ddlOrderType').val() == 'TransferOut') {
    $('#dvclient').html('Warehouse Name <span class="requiredStar">*</span>');
  }
  if ($('#ddlOrderType').val() == 'SalesOrder' || $('#ddlOrderType').val() == 'ScrapOrder') {
    $('#dvclient').html('Client Name <span class="requiredStar">*</span>');
  }
  $('#txtSo_CreatedBy').html(getUserName);
  $('#txtSo_SAPOrderNo').val('');
  $('#txtSo_ProdSearch').val('');
  $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').remove();
  $('#wms-srv-order-popup').show();
  $('#wms-srv-order-popup').attr('data-status', 'addnew');
  $('#pnlNoSkuRecord').show();
  $('#wms-srv-order-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
  $('#wms-srv-order-popup-close').off();
  $('#wms-srv-order-popup-close').click(function () {
    var getOrderNo = $('#txtSo_ReqNo').text().trim();
    if (getOrderNo != 'To be generated') {
      alert('Your order will be saved in composing mode!!');
    }
    closeCreateSalesOrderForm();
  });

  var getSelectedClientId = $('#ddlclient').val();
  BindAddressAsClient(getSelectedClientId);
  var getSelectedClientName = $('#ddlclient option:selected').text();
  if (getSelectedClientId != '0') {
    $('#txtSo_Client').val(getSelectedClientName);
    $('#txtSo_Client').attr('data-id', getSelectedClientId);
  } else {
    $('#txtSo_Client').val('');
    $('#txtSo_Client').attr('data-id', '0');
  }

  bindClientSuggestion();
  bindBillToAddressSuggestion();
  bindShipToAddressSuggestion();
  bindSkuCodeSuggestion();
  showCurrentDate();
  activateSalesOrderEditing();
}

function showCurrentDate() {
  var getOrderNo = $('#txtSo_ReqNo').text().trim();
  if (getOrderNo == 'To be generated') {
    getCurrentDate = setCurrentDate();
    $('#txtSo_ReqDate').html(getCurrentDate);
  }
}

function closeCreateSalesOrderForm(reloadList) {
  resetCreateSalesOrderForm();
  $('#wms-srv-order-popup .wms-srv-datepicker').datepicker('destroy');
  $('#wms-srv-order-popup').hide();
  if (reloadList) {
    getOutWardOrderList(filtercol, filterval);
  }
}

function validateSalesOrderForm(rowId, isFinalSave) {
  debugger;
  var isValidForm = true;
  var orderno = $('#txtSo_ReqNo').html();
  if (isFinalSave == 'yes') {
    if (orderno.trim() == 'To be generated') {
      alert('Please save at least one sku record !!');
      isValidForm = false;
    } else {
      isValidForm = true;
    }
  } else {
    var getDeliveryDate = $('#txtSo_DeliveryDate').val();
    var getCustomerPoNo = $('#txtSo_CustomerPoNo').val();
    var getClient = $('#txtSo_Client').val();
    var getClientId = $('#txtSo_Client').attr('data-id');
    var getBillToAddress = $('#txtSo_BillToAddress').val();
    var getBillToAddressId = $('#txtSo_BillToAddress').attr('data-id');
    var getShipToAddress = $('#txtSo_ShipToAddress').val();
    var getShipToAddressId = $('#txtSo_ShipToAddress').attr('data-id');
    var getRemark = $('#txtSo_Remark').val();

    var getSkuCode = $('#txtSo_SKUCode_' + rowId).val();
    var getSkuCodeId = $('#txtSo_SKUCode_' + rowId).val();
    var getRequestQty = $('#txtSo_RequestedQty_' + rowId).val();

    if (getDeliveryDate.trim() == '') {
      alert('Please enter Delivery Date !!');
      isValidForm = false;
    } else if (getCustomerPoNo.trim() == '') {
      alert('Please enter Order Reference Number !!');
      isValidForm = false;
    } else if (getClient.trim() == '' || getClientId == '0') {
      alert('Please select valid Client !!');
      isValidForm = false;
    } else if (getBillToAddress.trim() == '' || getBillToAddressId == '0') {
      alert('Please select valid Bill to Address !!');
      isValidForm = false;
    } else if (getShipToAddress.trim() == '' || getShipToAddressId == '0') {
      alert('Please select valid Ship to Address !!');
      isValidForm = false;
    }
    //  else if (getRemark.trim() == '') {
    //   alert('Please enter Remark !!');
    //   isValidForm = false;
    // } 
    else if (getSkuCode.trim() == '' || getSkuCodeId == '0') {
      alert('Please select valid SKU !!');
      isValidForm = false;
      // } else if ((getSkuCode.trim() != '' || getSkuCodeId != '0') && orderno == 'To be generated' && isFinalSave == 'yes') {
    } else if ((getSkuCode.trim() != '' || getSkuCodeId != '0') && isFinalSave == 'yes') {
      alert('Please add atleast One SKU !!');
      isValidForm = false;
      // } else if (getRequestQty.trim() == '' && orderno == 'To be generated') {
    }
    else if (getRequestQty.trim() == '') {
      alert('Please enter valid Request Qty !!');
      isValidForm = false;
    }
    else if (getRequestQty < 1) {
      alert('Please enter valid Request Qty !!');
      isValidForm = false;
    }
    else if (!validateIsNumber(getRequestQty)) {
      alert('Please enter valid Request Qty !!');
      isValidForm = false;
    }
  }
  return isValidForm;
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

function removeSalesAddSKURow(rowId) {
  $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow_' + rowId).remove();
}


function resetSalesAddSKUForm() {
  // RESET SKU FORM
  var rowId = 0;
  $('#txtSo_SKUCode_' + rowId).attr('data-id');
  $('#txtSo_SKUCode_' + rowId).val('');
  $('#txtSo_SKUName_' + rowId).val('');
  $('#txtSo_CurrentStock_' + rowId).val('');
  $('#txtSo_ReserveQty_' + rowId).val('');
  $('#txtSo_RequestedQty_' + rowId).val('');
  $('#txtSo_UOM_' + rowId).html('');
  $('#txtSo_OrderQty_' + rowId).val('');
  $('#txtSo_Lottable_' + rowId).html('');
}

function resetCreateSalesOrderForm() {
  $('#txtSo_ReqNo').html('To be generated');
  $('#txtSo_ReqDate').html(getCurrentDate);
  $('#txtSo_DeliveryDate').val('');
  $('#txtSo_CustomerPoNo').val('');
  $('#txtSo_Client').val('');
  $('#txtSo_Client').attr('data-id', '0');
  $('#txtSo_BillToAddress').val('');
  $('#txtSo_BillToAddress').attr('data-id', '0');
  $('#txtSo_ShipToAddress').val('');
  $('#txtSo_ShipToAddress').attr('data-id', '0');
  $('#txtSo_Remark').val('');

  // RESET SKU FORM
  $('#wmsSkuDetailsSalesOrderGrid .wmSkuDetailsSalesOrderRow').remove();
  resetSalesAddSKUForm();

}

function finalSaveSalesOrder() {
  saveSalesOrderHead('0', 'yes');
}

function saveSalesOrderHead(rowId, isFinalSave) {
  debugger;
  if (validateSalesOrderForm(rowId, isFinalSave)) {
    var apiPath = wmsApiPath + "SO/SaveSOHead";
    //---
    var getObject = $('#ddlOrderType').val();
    //---
    var getRequestNo = $('#txtSo_ReqNo').text();
    var getRequestDate = $('#txtSo_ReqDate').text();
    var getDeliveryDate = $('#txtSo_DeliveryDate').val();
    var getCustomerPoNo = $('#txtSo_CustomerPoNo').val();
    var getClient = $('#txtSo_Client').val();
    var getClientId = $('#txtSo_Client').attr('data-id');
    var getBillToAddress = $('#txtSo_BillToAddress').val();
    var getBillToAddressId = $('#txtSo_BillToAddress').attr('data-id');
    var getShipToAddress = $('#txtSo_ShipToAddress').val();
    var getShipToAddressId = $('#txtSo_ShipToAddress').attr('data-id');
    var getCreatedBy = $('#txtSo_CreatedBy').val();
    var getRemark = $('#txtSo_Remark').val();
    var getPriority = $('#txtSo_Priority').val();
    var getDeliveryType = $('#txtSo_DeliveryType').val();
    var getSAPOrderNo = $('#txtSo_SAPOrderNo').val();

    var gettSoId = "0";
    var getRequestNo = $('#txtSo_ReqNo').text();
    if (getRequestNo.trim() != 'To be generated') {
      gettSoId = getRequestNo;
    }

    var postData = {
      "Soid": gettSoId,
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "UserId": getUserId,
      "Object": getObject,
      "RequestedDate": getRequestDate,
      "StartDate": getRequestDate,
      "EndDate": getDeliveryDate,
      "CustomerPO": getCustomerPoNo,
      "Client": getClient,
      "ClientId": getClientId,
      "BillToAddress": getBillToAddress,
      "BillToAddressId": getBillToAddressId,
      "ShipToAddress": getShipToAddress,
      "ShipToAddressId": getShipToAddressId,
      "Remark": getRemark,
      "Priority": getPriority,
      "DeliveryType": getDeliveryType,
      "SAPOrderNo": getSAPOrderNo,
      "FinalSave": isFinalSave,
      "OrderFrom": "WMS"
    };
    callHttpUrl(apiPath, postData, function (data) {
      debugger;
      var getStatus = data.Status;
      var getStatusCode = data.StatusCode;
      var getResult = data.Result;
      var getMessage = getResult.Message;
      if (getStatusCode.toLocaleLowerCase() == 'success') {
        if (isFinalSave != 'yes') {
          var getNewOrderNo = getResult.OrderNo;
          $('#txtSo_ReqNo').html(getNewOrderNo);
          saveSalesOrerSkuDetails(rowId);
        } else {
          alert('Order saved successfully!!');
          closeCreateSalesOrderForm(true);
        }
      } else {
        alert(getMessage);
      }
    });
  }
}

function saveSalesOrerSkuDetails(rowId) {
  debugger;
  if (validateSalesOrderForm(rowId, 'no')) {
    var getRequestNo = $('#txtSo_ReqNo').text();

    if (getRequestNo.trim() != 'To be generated') {
      var apiPath = wmsApiPath + "SO/SaveSOSKUDetail";
      var getSkuId = $('#txtSo_SKUCode_' + rowId).attr('data-id');
      var getItemCode = $('#txtSo_SKUCode_' + rowId).val();
      var getItemName = $('#txtSo_SKUName_' + rowId).val();
      var getCurrentStock = $('#txtSo_CurrentStock_' + rowId).val();
      var getReserveQty = $('#txtSo_ReserveQty_' + rowId).val();
      var getRequestedQty = $('#txtSo_RequestedQty_' + rowId).val();
      var getUOM = $('#txtSo_UOM_' + rowId + ' option:selected').text();
      var getUOMId = $('#txtSo_UOM_' + rowId + ' option:selected').val();
      var getOrderQty = $('#txtSo_OrderQty_' + rowId).val();
      /*var getLottableGroup = $('#txtSo_Lottable_' + rowId + ' input[type="text"]');
      var strLottable = "";
      $(getLottableGroup).each(function () {
        if (strLottable == '') {
          strLottable = strLottable + $(this).val();
        } else {
          strLottable = strLottable + "|" + $(this).val();
        }
      }); */
      //var strLottable = $('#txtSo_Lottable_' + rowId).text().trim();

      var getSkuLotGrp = $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow_' + rowId).attr('data-lotgrp');
      var strLottable = getSkuLotGrp.trim();

      var postData = {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "OrderId": getRequestNo,
        "SkuId": getSkuId,
        "ItemCode": getItemCode,
        "ItemName": getItemName,
        "CurrentStock": getCurrentStock,
        "ReserveQty": getReserveQty,
        "RequestedQty": getRequestedQty,
        "UOM": getUOM,
        "UOMId": getUOMId,
        "OrderQty": getOrderQty,
        "Lottable": strLottable
      };
      callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getResult = data.Result;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
          alert('SKU details added successfully!!');
          //resetSalesAddSKUForm();
          removeSalesAddSKURow(rowId);
          getSkuDetailsBySalesOrder();
        }
      });
    } else {
      saveSalesOrderHead(rowId, 'no');
    }
  }
}

function removeSkuDetailsBySalesOrder(skuRowId) {
  debugger;
  var getRequestNo = $('#txtSo_ReqNo').text();
  var apiPath = wmsApiPath + "SO/RemoveSOSKU";
  var postData = {
    "CustomerId": getCustomerId,
    "WarehouseId": getWarehouseId,
    "UserId": getUserId,
    "OrderId": getRequestNo,
    "Id": skuRowId
  };
  callHttpUrl(apiPath, postData, function (data) {
    debugger;
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
    if (getStatusCode.toLocaleLowerCase() == 'success') {
      getSkuDetailsBySalesOrder();
    } else {
      var getMessage = data.Result.Message;
      alert(getMessage);
    }

  });
}

function getSkuDetailsBySalesOrder() {
  debugger;
  var getRequestNo = $('#txtSo_ReqNo').text();

  if (getRequestNo.trim() != 'To be generated') {
    var apiPath = wmsApiPath + "SO/GetSODetail";
    var postData = {
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "UserId": getUserId,
      "OrderId": getRequestNo
    };
    callHttpUrl(apiPath, postData, function (data) {
      debugger;
      var getStatus = data.Status;
      var getStatusCode = data.StatusCode;
      if (getStatusCode.toLocaleLowerCase() == 'success') {
        $('#wmsSkuDetailsSalesOrderGrid .wmSkuDetailsSalesOrderRow').remove();
        var getOrderList = data.Result.OrderDetails;
        for (var i = 0; i < getOrderList.length; i++) {
          var getSkuRowId = getOrderList[i].Id;
          var getSkuId = getOrderList[i].SkuId;
          var getItemCode = getOrderList[i].ItemCode;
          var getItemName = getOrderList[i].ItemName;
          var getCurrentStock = getOrderList[i].CurrentStock;
          var getReserveQty = getOrderList[i].ReserveQty;
          var getRequestedQty = getOrderList[i].RequestedQty;
          var getUOM = getOrderList[i].UOM;
          var getUOMId = getOrderList[i].UOMId;
          var getOrderQty = getOrderList[i].OrderQty;
          var getLottableGroup = getOrderList[i].Lottable;
          getIsEdit = getOrderList[i].IsEdit;

          /*
          var strLottable = getLottableGroup;
          $(getLottableGroup).each(function () {
            if (strLottable == '') {
              strLottable = strLottable + $(this).val();
            } else {
              strLottable = + "|" + $(this).val();
            }
          });
          */

          var skuRow = '<div class="wms-srv-grid-row wmSkuDetailsSalesOrderRow">';
          skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
          skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getItemName + '</div>';
          skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getCurrentStock + '</div>';
          skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getReserveQty + '</div>';
          skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getRequestedQty + '</div>';
          skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
          skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
          //skuRow = skuRow + '<div class="wms-srv-grid-cell" style="width:275px;">' + getLottableGroup + '</div>';

          var breakLottable = getLottableGroup.split('|');

          for (var lt = 0; lt < breakLottable.length; lt++) {
            if (breakLottable[lt].trim() == '0') {
              breakLottable[lt] = '';
            }
            skuRow = skuRow + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + lt + '" data-lottype="" style="width: 82px; text-align: center;display:none;">' + breakLottable[lt] + '</div>';
            if (breakLottable[lt] != '' && breakLottable[lt] != '0') {
              $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header .gridCellLottable[data-lotindex="' + lt + '"]').show();
            }
          }
          if (getIsEdit == 0) {
            skuRow = skuRow + '<div class="wms-srv-grid-cell">' +
              '<div class="wms-srv-grid-action">' +
              '<a href="#" title="Cart" data-prefix="RM" class="wms-srv-icononly" onclick="removeSkuDetailsBySalesOrder(\'' + getSkuRowId + '\');"><i class="fas fa-times-circle"></i></a>' +
              '</div>' +
              '</div>';
          }

          skuRow = skuRow + '</div>';
          $('#wmsSkuDetailsSalesOrderGrid').append(skuRow);
        }
        var getSalesOrderStatus = $('#wms-srv-order-popup').attr('data-status');
        if (getSalesOrderStatus != 'addnew' && getSalesOrderStatus != '37' && getIsEdit != 0) {
          deactiveSalesOrderEditing(getSalesOrderStatus);
        } else {
          activateSalesOrderEditing();
        }
        if (getIsEdit == 1) {
          $('#btnaddsku').hide();
        }
        else {
          $('#btnaddsku').show();
        }
        checkForAddNewSkuRow();
        showHideLottableCellForSOViewRow();
      } else {
        alert(getMessage);
      }

    });
  }
}

function showHideLottableCellForSOViewRow() {
  var getAddNewRowCount = $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').length;
  var getViewRowCount = $('#wmsSkuDetailsSalesOrderGrid .wmSkuDetailsSalesOrderRow').length;
  var getTotalLotRowCount = getAddNewRowCount + getViewRowCount;
  $('#wmsSkuDetailsSalesOrderGrid .gridCellLottable').show();
  for (var l = 0; l < 10; l++) {
    // CHECK FOR VIEW ONLY EMPTY CELL
    var getCell = $('#wmsSkuDetailsSalesOrderGrid .wmSkuDetailsSalesOrderRow .gridCellLottable[data-lotindex="' + l + '"]').length;
    var getAddCell = $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow .gridCellLottable[data-lotindex="' + l + '"]').length;
    var totalCell = getCell + getAddCell;

    var getEmptyCell = $('#wmsSkuDetailsSalesOrderGrid .wmSkuDetailsSalesOrderRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;
    var getAddEmptyCell = $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;
    var totalEmptyCell = getEmptyCell + getAddEmptyCell;

    if (totalCell > 0) {
      if (totalCell != totalEmptyCell) {
        $('#wmsSkuDetailsSalesOrderGrid .gridCellLottable[data-lotindex="' + l + '"]').show();
      } else {
        $('#wmsSkuDetailsSalesOrderGrid .gridCellLottable[data-lotindex="' + l + '"]').hide();
      }
    } else {
      $('#wmsSkuDetailsSalesOrderGrid .gridCellLottable[data-lotindex="' + l + '"]').hide();
    }
  }
}

function updateRequestedQty(recId) {
  var getUnitValue = Number($('#txtSo_UOM_' + recId + ' option:selected').attr('data-unitvalue'));
  var getRequestedQty = Number($('#txtSo_RequestedQty_' + recId).val());
  var getOrderQty = getRequestedQty * getUnitValue;
  $('#txtSo_OrderQty_' + recId).val(getOrderQty);
}

function getClientAddress() {
  var apiPath = wmsApiPath + "SO/getSuggestedClientAddress";

  var postData = {
    "ClientID": getClientId,
    "UserId": getUserId
  };

  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
    var getClientAddressList = data.Result.Table;
  });
}

function bindClientSuggestion() {
  var obj = $('#ddlOrderType').val();
  $('#txtSo_Client').off();
  $('#txtSo_Client').keyup(function () {
    var apiPath = wmsApiPath + "SO/getSuggestedClient";
    var getSkey = $(this).val();
    var isSuggestionList = "yes";
    var postData = {
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "UserId": getUserId,
      "SearchKey": getSkey,
      "isSuggestionList": isSuggestionList,
      "Object": obj
    };
    getSuggestion_SO(apiPath, postData, this, isSuggestionList);
  });
}

function bindBillToAddressSuggestion() {
  $('#txtSo_BillToAddress').off();
  $('#txtSo_BillToAddress').keyup(function () {
    var apiPath = wmsApiPath + "SO/getSuggestedClientAddress";
    var getSkey = $(this).val();
    var isSuggestionList = "yes";
    var postData = {
      "ClientID": getClientId,
      "UserId": getUserId,
      "SearchKey": getSkey,
      "isSuggestionList": isSuggestionList
    };
    getSuggestion_SO(apiPath, postData, this, isSuggestionList);
  });
}

function bindShipToAddressSuggestion() {
  $('#txtSo_ShipToAddress').off();
  $('#txtSo_ShipToAddress').keyup(function () {
    var apiPath = wmsApiPath + "SO/getSuggestedClientAddress";
    var getSkey = $(this).val();
    var isSuggestionList = "yes";
    var postData = {
      "ClientID": getClientId,
      "UserId": getUserId,
      "SearchKey": getSkey,
      "isSuggestionList": isSuggestionList
    };
    getSuggestion_SO(apiPath, postData, this, isSuggestionList);
  });
}

function bindSkuCodeSuggestion() {
  var obj = $('#ddlOrderType').val();
  var getlot = $('#ddlLot').val();
  $('#txtSo_SKUCode_0').off();
  $('#txtSo_SKUCode_0').keyup(function () {
    debugger;
    var apiPath = wmsApiPath + "SO/GetSOSKUSuggest";
    var getSkey = $(this).val();
    var isSuggestionList = "yes";
    var postData = {
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "UserId": getUserId,
      "ClientId": getClientId,
      "OrderId": 0,
      "skey": getSkey,
      "isSuggestionList": isSuggestionList,
      "portal": "wms",
      "Object": obj,
      "Lot": getlot
    };
    getSkuCodeSuggestion_SO(apiPath, postData, this, isSuggestionList, 0);
  });
}

function getSuggestion_SO(apiPath, postData, wmsSuggestionControl, isSuggestionList) {
  debugger;
  var getSkey = $(wmsSuggestionControl).val();
  var listPostion = 'bottom';
  callHttpUrl(apiPath, postData, function (data) {
    debugger;
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.Table;

      var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
      if (hasSuggestionListPanel.length <= 0) {
        $('body').append('<div class="wms-srv-suggestion-list"></div>');
      } else {
        $('.wms-srv-suggestion-list').html('');
      }

      for (var i = 0; i < suggestionList.length; i++) {
        var getId = suggestionList[i].ID;
        var getValue = suggestionList[i].Name;
        $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="' + getId + '" data-label="' + getValue + '" data-name="' + getValue + '"  data-description="' + getValue + '">' + getValue + '</div>');
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
        var listItemObj = $(this);
        var getListId = $(this).attr('data-id');
        var getListLabel = $(this).attr('data-label');
        var getListSkuName = $(this).attr('data-name');
        var getListSkuDescription = $(this).attr('data-description');
        $(wmsSuggestionControl).val(getListLabel);
        $(wmsSuggestionControl).attr('data-id', getListId);
        clearSuggestionList();
      });
      var suggestionLength = suggestionList.length;
      if (suggestionLength <= 0) {
        clearSuggestionList();
      }
    }
  });
}

function getSkuCodeSuggestion_SO(apiPath, postData, wmsSuggestionControl, isSuggestionList, recId) {
  debugger;
  var getSkey = $(wmsSuggestionControl).val();
  var listPostion = 'bottom';
  callHttpUrl(apiPath, postData, function (data) {
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.SKUSuggestList;

      var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
      if (hasSuggestionListPanel.length <= 0) {
        $('body').append('<div class="wms-srv-suggestion-list"></div>');
      } else {
        $('.wms-srv-suggestion-list').html('');
      }

      var getId = [];
      var getValue = [];
      var getProductName = [];
      var getProdDescription = [];
      var getUPCBarcode = [];
      var getCurrentStock = [];
      var getReserveQty = [];
      var getUOM = [];
      var getLottable = [];

      for (var i = 0; i < suggestionList.length; i++) {
        getId[i] = suggestionList[i].ID;
        getValue[i] = suggestionList[i].ProductCode;
        getProductName[i] = suggestionList[i].Name;
        getProdDescription[i] = suggestionList[i].Description;
        getUPCBarcode[i] = suggestionList[i].UPCBarcode;
        getCurrentStock[i] = suggestionList[i].CurrentStock;
        getReserveQty[i] = suggestionList[i].ResurveQty;
        getUOM[i] = suggestionList[i].UOM;
        getLottable[i] = suggestionList[i].Lottable;

        $('#txtSo_SKUName').val();
        $('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-pos="' + i + '" data-id="' + getId[i] + '" data-label="' + getValue[i] + '" data-name="' + getValue[i] + '"  data-description="' + getValue[i] + '">' + getValue[i] + '</div>');
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
        var getListPos = $(this).attr('data-pos');
        $('#txtSo_SKUCode_' + recId).val(getValue[getListPos]);
        $('#txtSo_SKUCode_' + recId).attr('data-id', getId[getListPos]);
        $('#txtSo_SKUName_' + recId).val(getProductName[getListPos]);
        $('#txtSo_CurrentStock_' + recId).val(getCurrentStock[getListPos]);
        $('#txtSo_ReserveQty_' + recId).val(getReserveQty[getListPos]);
        var myUomList = '';
        var myUomObj = getUOM[getListPos];
        for (var k = 0; k < myUomObj.length; k++) {
          var getUomId = myUomObj[k].ID;
          var getUomName = myUomObj[k].Name;
          var getUomUnitValue = myUomObj[k].UnitValue;
          myUomList = myUomList + '<option value="' + getUomId + '" data-unitvalue="' + getUomUnitValue + '">' + getUomName + '</option>';
        }

        $('#txtSo_UOM_' + recId).html(myUomList);
        var myLottableList = '';
        var myLottableObj = getLottable[getListPos];
        var getLottableWidth = Math.round((100 / myLottableObj.length) - 3);
        for (var m = 0; m < myLottableObj.length; m++) {
          var getLottableId = myLottableObj[m].ID;
          var getLottableName = myLottableObj[m].Name;
          var getLottableDataType = myLottableObj[m].DataType.toLocaleLowerCase();
          if (getLottableDataType == 'date') {
            myLottableList = myLottableList + '<input type="text" id="Lottable_' + getLottableId + '" class="wmsLottableInput wms-srv-datepicker" placeholder="' + getLottableName + '" value="" style="width:' + getLottableWidth + '%;display:inline-block;" /> ';
          } else {
            myLottableList = myLottableList + '<input  type="text" id="Lottable_' + getLottableId + '" class="wmsLottableInput" placeholder="' + getLottableName + '" value="" style="width:' + getLottableWidth + '%;display:inline-block;" /> ';
          }
        }
        $('#txtSo_Lottable_' + recId).html(myLottableList);
        $('#txtSo_Lottable_' + recId + ' .wms-srv-datepicker').datepicker('destroy');
        $('#txtSo_Lottable_' + recId + ' .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
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

// CLIENT LIST FUNCTIONS

function openClientListPopup() {
  $('#wms-srv-client-list-popup').show();
  $('#wms-srv-client-list-popup-close').off();
  $('#wms-srv-client-list-popup-close').click(function () {
    $('#wms-srv-client-list-popup').hide();
  });
  loadClientList();
}

function loadClientList() {
  debugger;
  var obj = $('#ddlOrderType').val();
  if (obj == 'SalesOrder' || obj == 'ScrapOrder') {
    $('#spnlist').html('Client List');
    $('#lblsearch').html('Search Client: ');
  }
  if (obj == 'TransferOut') {
    $('#spnlist').html('Warehouse List');
    $('#lblsearch').html('Search Warehouse: ');
  }
  $('#txtclientsearch').val('');
  var apiPath = wmsApiPath + "SO/getSuggestedClient";
  var postData = {
    "CustomerId": getCustomerId,
    "WarehouseId": getWarehouseId,
    "UserId": getUserId,
    "SearchKey": '',
    "isSuggestionList": 'no',
    "Object": obj
  };
  callHttpUrl(apiPath, postData, function (data) {
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.Table;
      $('#pnlSalesOrderClientList').html('');
      $('#pnlSalesOrderClientList').append('<div class="wms-srv-grid-header">' +
        '<div class="wms-srv-grid-cell" style="width:80px;">Sr. No</div>' +
        '<div class="wms-srv-grid-cell">Name</div>' +
        '<div class="wms-srv-grid-cell" style="width:80px;">Action</div>' +
        '</div>');

      for (var i = 0; i < suggestionList.length; i++) {
        var getId = suggestionList[i].ID;
        var getValue = suggestionList[i].Name;
        var getAddress = suggestionList[i].Address;
        var getAddressId = suggestionList[i].AddressID;
        var rowNum = i + 1;
        $('#pnlSalesOrderClientList').append('<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell">' + rowNum + '</div>' +
          '<div class="wms-srv-grid-cell">' + getValue + '</div>' +
          '<div class="wms-srv-grid-cell">' +
          '<div class="wms-srv-grid-action">' +
          '<a href="#" class="wms-srv-icononly" onclick="addToClientField(' + getId + ', \'' + getValue + '\', \'' + getAddressId + '\', \'' + getAddress + '\');return false;"><i class="fas fa-check-circle"></i></a>' +
          '</div>' +
          '</div>' +
          '</div>');
      }
    }
  });
}

function searchClient() {
  debugger;
  var obj = $('#ddlOrderType').val();
  var apiPath = wmsApiPath + "SO/getSuggestedClient";
  var skey = $('#txtclientsearch').val();
  var postData = {
    "CustomerId": getCustomerId,
    "WarehouseId": getWarehouseId,
    "UserId": getUserId,
    "SearchKey": skey,
    "isSuggestionList": 'no',
    "Object": obj
  };
  callHttpUrl(apiPath, postData, function (data) {
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.Table;
      $('#pnlSalesOrderClientList').html('');
      $('#pnlSalesOrderClientList').append('<div class="wms-srv-grid-header">' +
        '<div class="wms-srv-grid-cell" style="width:80px;">Sr. No</div>' +
        '<div class="wms-srv-grid-cell">Name</div>' +
        '<div class="wms-srv-grid-cell" style="width:80px;">Action</div>' +
        '</div>');

      for (var i = 0; i < suggestionList.length; i++) {
        var getId = suggestionList[i].ID;
        var getValue = suggestionList[i].Name;
        var getAddress = suggestionList[i].Address;
        var getAddressId = suggestionList[i].AddressID;
        var rowNum = i + 1;
        $('#pnlSalesOrderClientList').append('<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell">' + rowNum + '</div>' +
          '<div class="wms-srv-grid-cell">' + getValue + '</div>' +
          '<div class="wms-srv-grid-cell">' +
          '<div class="wms-srv-grid-action">' +
          '<a href="#" class="wms-srv-icononly" onclick="addToClientField(' + getId + ', \'' + getValue + '\', \'' + getAddressId + '\', \'' + getAddress + '\');return false;"><i class="fas fa-check-circle"></i></a>' +
          '</div>' +
          '</div>' +
          '</div>');
      }
    }
  });
}

function addToClientField(cId, cName, getAddressID, getAddress) {
  debugger
  $('#txtSo_Client').attr('data-id', cId);
  $('#txtSo_Client').val(cName);
  $('#wms-srv-client-list-popup').hide();
  addToBillToAddressField(getAddressID, getAddress);
  addToShipToAddressField(getAddressID, getAddress)
}

// CLIENT LIST FUNCTIONS

// BILL TO ADDRESS LIST FUNCTIONS

function openBillToListPopup() {
  $('#wms-srv-billto-list-popup').show();
  $('#wms-srv-billto-list-popup-close').off();
  $('#wms-srv-billto-list-popup-close').click(function () {
    $('#wms-srv-billto-list-popup').hide();
  });
  loadBillToList();
}

function loadBillToList() {
  debugger;
  var obj = $('#ddlOrderType').val();
  var apiPath = wmsApiPath + "SO/getSuggestedClientAddress";
  var getOrderClientId = $('#txtSo_Client').attr('data-id');
  var postData = {
    "ClientID": getOrderClientId,
    "UserId": getUserId,
    "SearchKey": '',
    "isSuggestionList": 'no',
    "Object": obj
  };
  callHttpUrl(apiPath, postData, function (data) {
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.Table;
      $('#pnlSalesOrderBillToList').html('');
      $('#pnlSalesOrderBillToList').append('<div class="wms-srv-grid-header">' +
        '<div class="wms-srv-grid-cell" style="width:80px;">Sr. No</div>' +
        '<div class="wms-srv-grid-cell">Address</div>' +
        '<div class="wms-srv-grid-cell" style="width:80px;">Action</div>' +
        '</div>');

      for (var i = 0; i < suggestionList.length; i++) {
        var getId = suggestionList[i].ID;
        var getValue = suggestionList[i].Name;
        var rowNum = i + 1;
        $('#pnlSalesOrderBillToList').append('<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell">' + rowNum + '</div>' +
          '<div class="wms-srv-grid-cell">' + getValue + '</div>' +
          '<div class="wms-srv-grid-cell">' +
          '<div class="wms-srv-grid-action">' +
          '<a href="#" class="wms-srv-icononly" onclick="addToBillToAddressField(' + getId + ', \'' + getValue + '\');return false;"><i class="fas fa-check-circle"></i></a>' +
          '</div>' +
          '</div>' +
          '</div>');
      }
    }
  });
}

function addToBillToAddressField(bId, bName) {
  $('#txtSo_BillToAddress').attr('data-id', bId);
  $('#txtSo_BillToAddress').val(bName);
  $('#wms-srv-billto-list-popup').hide();
}
// BILL TO ADDRESS LIST FUNCTIONS

// SHIP TO ADDRESS LIST FUNCTIONS
function openShipToListPopup() {
  $('#wms-srv-shipto-list-popup').show();
  $('#wms-srv-shipto-list-popup-close').off();
  $('#wms-srv-shipto-list-popup-close').click(function () {
    $('#wms-srv-shipto-list-popup').hide();
  });
  loadShipToList();
}

function loadShipToList() {
  var obj = $('#ddlOrderType').val();
  var apiPath = wmsApiPath + "SO/getSuggestedClientAddress";
  var getOrderClientId = $('#txtSo_Client').attr('data-id');
  var postData = {
    "ClientID": getOrderClientId,
    "UserId": getUserId,
    "SearchKey": '',
    "isSuggestionList": 'no',
    "Object": obj
  };
  callHttpUrl(apiPath, postData, function (data) {
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.Table;
      $('#pnlSalesOrderShipToList').html('');
      $('#pnlSalesOrderShipToList').append('<div class="wms-srv-grid-header">' +
        '<div class="wms-srv-grid-cell" style="width:80px;">Sr. No</div>' +
        '<div class="wms-srv-grid-cell">Address</div>' +
        '<div class="wms-srv-grid-cell" style="width:80px;">Action</div>' +
        '</div>');

      for (var i = 0; i < suggestionList.length; i++) {
        var getId = suggestionList[i].ID;
        var getValue = suggestionList[i].Name;
        var rowNum = i + 1;
        $('#pnlSalesOrderShipToList').append('<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell">' + rowNum + '</div>' +
          '<div class="wms-srv-grid-cell">' + getValue + '</div>' +
          '<div class="wms-srv-grid-cell">' +
          '<div class="wms-srv-grid-action">' +
          '<a href="#" class="wms-srv-icononly" onclick="addToShipToAddressField(' + getId + ', \'' + getValue + '\');return false;"><i class="fas fa-check-circle"></i></a>' +
          '</div>' +
          '</div>' +
          '</div>');
      }
    }
  });
}

function addToShipToAddressField(sId, sName) {
  $('#txtSo_ShipToAddress').attr('data-id', sId);
  $('#txtSo_ShipToAddress').val(sName);
  $('#wms-srv-shipto-list-popup').hide();
}
// SHIP TO ADDRESS LIST FUNCTIONS

// PRODUCT LIST
function openSalesProductListPopup(recId) {
  $('#wms-srv-sales-product-list-popup').show();
  $('#wms-srv-sales-product-list-popup-close').off();
  $('#wms-srv-sales-product-list-popup-close').click(function () {
    resetSkuListCart();
    $('#wms-srv-sales-product-list-popup').hide();
  });
  $('#pnlSkuListCart').off();
  $('#pnlSkuListCart').click(function () {
    showSOCartList();
  });
  $('#txtSo_ProdSearchpopup').val('');
  $('#txtSo_ProdSearchLottablepopup').val('');
  loadSalesProductListPopup(recId);
}

function loadSalesProductListPopup(recId) {
  var obj = $('#ddlOrderType').val();
  var getlot = $('#ddlLot').val();
  var apiPath = wmsApiPath + "SO/GetSOSKUSuggest";
  var getProdSkey = $('#txtSo_ProdSearchpopup').val();
  var getProdLottableSkey = $('#txtSo_ProdSearchLottablepopup').val();
  var getFinalProdSkey = getProdSkey + '|' + getProdLottableSkey;
  if (getProdLottableSkey.trim() == '') {
    getFinalProdSkey = getProdSkey;
  }

  postData = {
    "CustomerId": getCustomerId,
    "WarehouseId": getWarehouseId,
    "UserId": getUserId,
    "ClientId": getClientId,
    "OrderId": 0,
    "skey": getFinalProdSkey,
    "isSuggestionList": "no",
    "portal": "wms",
    "Object": obj,
    "Lot": getlot
  };

  if (recId != null) {
    recId = recId;
  } else {
    recId = 0;
  }

  callHttpUrl(apiPath, postData, function (data) {
    debugger;
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.SKUSuggestList;
      var getLottable = mBrillWmsSession.getCustomerLottable();
      var breakCustLot = getLottable.split(',');

      $('#pnlSalesOrderProductList').html('');
      // $('#pnlSalesOrderProductList').append('<div class="wms-srv-grid-header" id="header-wrap">' +
      //   '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Sr. No</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Image</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Description</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Category</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Sub Category</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Keyword</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Group Set</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Current Stock</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Reserve Qty</div>' +
      //   '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Action</div>' +
      //   '</div>');

      var strSalesOrderProductList = '';
      strSalesOrderProductList = '<div class="wms-srv-grid-header" id="header-wrap" style="z-index: 99;">' +
        '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Sr. No</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Image</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Description</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Category</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Sub Category</div>';

      if (suggestionList.length > 0) {
        for (var pl = 0; pl < breakCustLot.length; pl++) {
          var custLotLabel = breakCustLot[pl];
          strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-cell" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + custLotLabel + '">' + custLotLabel + '</div>';
        }
      }

      strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-cell" style="text-align:center;">Keyword</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Group Set</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Current Stock</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Reserve Qty</div>' +
        '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Action</div>' +
        '</div>';
      $('#pnlSalesOrderProductList').append(strSalesOrderProductList);
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
        var rowNum = i + 1;
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

        // $('#pnlSalesOrderProductList').append('<div class="wms-srv-grid-row">' +
        //   '<div class="wms-srv-grid-cell" style="width:80px;">BTest_' + rowNum + '</div>' +
        //   '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage[i] + '" style="width:40px;height:40px;" /></div>' +
        //   '<div class="wms-srv-grid-cell">' + getValue[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getProductName[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getProdDescription[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getCategory[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getSubCategory[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell" id="cellKeyWordHolder_' + rowNum + '"><i class="fas fa-plus-circle btnAddProductKeyword" onclick="showAddKeywordPanel(' + getId[i] + ',' + rowNum + ')"></i> ' + convertToKeyblock(getKeyword[i], getId[i], rowNum) + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getGroupSet[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getCurrentStock[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getReserveQty[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
        //   // '<a href="#" class="wms-srv-icononly btnAddToProductListField" data-pos="' + i + '"><i class="fas fa-check-circle"></i></a>' +
        //   '<a href="#" class="wms-srv-icononly btnSelectProdFromList" data-pos="' + i + '" data-isselected="no"><i class="fas fa-check-circle"></i></a>' +
        //   '</div></div>' +
        //   '</div>');

        var strSalesOrderProductList = '';
        var jStrUOM = JSON.stringify(getUOM[i]).replace(/\r?\n|\r/g, "");;
        var jStrLottable = JSON.stringify(getLottable[i]).replace(/\r?\n|\r/g, "");;
        strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-row" data-id="' + getId[i] + '" data-value="' + getValue[i] + '" data-prodname="' + getProductName[i] + '" data-stock="' + getCurrentStock[i] + '" data-resqty="' + getReserveQty[i] + '" data-uom=\'' + jStrUOM + '\' data-lottable=\'' + jStrLottable + '\' data-lottables="' + getLottables[i] + '">' +
          '<div class="wms-srv-grid-cell" style="width:80px;">' + rowNum + '</div>' +
          '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage[i] + '" style="width:40px;height:40px;" /></div>' +
          '<div class="wms-srv-grid-cell">' + getValue[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getProductName[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getProdDescription[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getCategory[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getSubCategory[i] + '</div>';
        // '<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>';

        var breakLottableVal = getLottables[i].split('|');
        for (var slt = 0; slt < breakCustLot.length; slt++) {
          var custLotLabel = breakCustLot[slt];
          var custLotVal = breakLottableVal[slt];
          if (custLotVal != null && custLotVal.trim() == '0') {
            custLotVal = '';
          }
          strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + slt + '" data-lottype="' + custLotLabel + '" style="width: 82px; text-align: center;">' + custLotVal + '</div>';
        }

        strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-cell" id="cellKeyWordHolder_' + rowNum + '"><i class="fas fa-plus-circle btnAddProductKeyword" onclick="showAddKeywordPanel(' + getId[i] + ',' + rowNum + ')"></i> ' + convertToKeyblock(getKeyword[i], getId[i], rowNum) + '</div>' +
          '<div class="wms-srv-grid-cell">' + getGroupSet[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getCurrentStock[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getReserveQty[i] + '</div>' +
          '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
          // '<a href="#" class="wms-srv-icononly btnAddToProductListField" data-pos="' + i + '"><i class="fas fa-check-circle"></i></a>' +
          '<a href="#" class="wms-srv-icononly btnSelectProdFromList" data-pos="' + i + '" data-isselected="no"><i class="fas fa-check-circle"></i></a>' +
          '</div></div>' +
          '</div>';
        $('#pnlSalesOrderProductList').append(strSalesOrderProductList);
      }

      if (suggestionList.length > 0) {
        var getFirstLotRecord = getLottable[0];
        for (var fr = 0; fr < getFirstLotRecord.length; fr++) {
          var lotName = getFirstLotRecord[fr].Name;
          var chkIsPartofLottable = getFirstLotRecord[fr].IsPartofOutward;
          if (chkIsPartofLottable != null) {
            if (chkIsPartofLottable.toLocaleLowerCase() == 'false') {
              $('#pnlSalesOrderProductList .wms-srv-grid-cell[data-lottype="' + lotName + '"]').hide();
            }
          }
        }
      }

      $('#pnlSalesOrderProductList .btnAddToProductListField').off();
      $('#pnlSalesOrderProductList .btnSelectProdFromList').click(function () {
        var isSelected = $(this).attr('data-isselected');
        if (isSelected == 'no') {
          $(this).attr('data-isselected', 'yes');
          $(this).find('i').attr('style', 'color:#78b421');
          // FOR CART CODE - 22 April 2024
          var k = Number($(this).attr('data-pos'));
          var objRow = $(this).parent().parent().parent();
          addToCartSalesOrder(objRow);
          // FOR CART CODE - 22 April 2024
        } else {
          $(this).attr('data-isselected', 'no');
          $(this).find('i').attr('style', '');
          var objRow = $(this).parent().parent().parent();
          var skuId = $(objRow).attr('data-id');
          var skuLottables = $(objRow).attr('data-lottables');
          removeFromCartSalesOrder(skuId, skuLottables);
        }
      });
      $('#btnAddSkuToOutwardOrder').off();
      $('#btnAddSkuToOutwardOrder').click(function () {
        //$('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').remove();
        /* $('.btnSelectProdFromList[data-isselected="yes"]').each(function () {
           var listItemObj = $(this);
           var k = Number($(this).attr('data-pos'));
           addMultipleProduct(getValue[k], getId[k], getProductName[k], getCurrentStock[k], getReserveQty[k], getUOM[k], getLottable[k], getLottables[k]);
           checkForAddNewSkuRow();
           showHideLottableCellForSOViewRow();
           $('#wms-srv-sales-product-list-popup').hide();
         }); */

        $('#pnlCartSalesOrder .wms-srv-grid-row').each(function () {
          var getValue = $(this).attr('data-value');
          var getId = $(this).attr('data-id');
          var getProductName = $(this).attr('data-prodname');
          var getCurrentStock = $(this).attr('data-stock');
          var getReserveQty = $(this).attr('data-resqty');
          var getUOM = $(this).attr('data-uom');
          var getLottable = $(this).attr('data-lottable');
          var getLottables = $(this).attr('data-lottables');
          var objGetUOM = JSON.parse(getUOM);
          var objGetLottable = JSON.parse(getLottable);
          addMultipleProduct(getValue, getId, getProductName, getCurrentStock, getReserveQty, objGetUOM, objGetLottable, getLottables);
          checkForAddNewSkuRow();
          showHideLottableCellForSOViewRow();
        });
        resetSkuListCart();
        $('#wms-srv-sales-product-list-popup').hide();
      });

      $('.btnAddToProductListField').off();
      $('.btnAddToProductListField').click(function () {
        debugger;
        var listItemObj = $(this);
        var getListPos = Number($(this).attr('data-pos'));
        $('#txtSo_SKUCode_' + recId).val(getValue[getListPos]);
        $('#txtSo_SKUCode_' + recId).attr('data-id', getId[getListPos]);
        $('#txtSo_SKUName_' + recId).val(getProductName[getListPos]);
        $('#txtSo_CurrentStock_' + recId).val(getCurrentStock[getListPos]);
        $('#txtSo_ReserveQty_' + recId).val(getReserveQty[getListPos]);
        var myUomList = '';
        var myUomObj = getUOM[getListPos];
        for (var k = 0; k < myUomObj.length; k++) {
          var getUomId = myUomObj[k].ID;
          var getUomName = myUomObj[k].Name;
          var getUomUnitValue = myUomObj[k].UnitValue;
          myUomList = myUomList + '<option value="' + getUomId + '" data-unitvalue="' + getUomUnitValue + '">' + getUomName + '</option>';
        }

        $('#txtSo_UOM_' + recId).html(myUomList);
        var myLottableList = '';
        var myLottableObj = getLottable[getListPos];
        var getLottableWidth = Math.round((100 / myLottableObj.length) - 3);
        /*  for (var m = 0; m < myLottableObj.length; m++) {
            var getLottableId = myLottableObj[m].ID;
            var getLottableName = myLottableObj[m].Name;
            var getLottableDataType = myLottableObj[m].DataType.toLocaleLowerCase();
            if (getLottableDataType == 'date') {
              myLottableList = myLottableList + '<input type="text" id="Lottable_' + getLottableId + '" class="wmsLottableInput wms-srv-datepicker" placeholder="' + getLottableName + '" value="" style="width:' + getLottableWidth + '%;display:inline-block;" /> ';
            } else {
              myLottableList = myLottableList + '<input  type="text" id="Lottable_' + getLottableId + '" class="wmsLottableInput" placeholder="' + getLottableName + '" value="" style="width:' + getLottableWidth + '%;display:inline-block;" /> ';
            }
          }
          $('#txtSo_Lottable_' + recId).html(myLottableList); 
          $('#txtSo_Lottable_' + recId + ' .wms-srv-datepicker').datepicker('destroy');
          $('#txtSo_Lottable_' + recId + ' .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' }); */
        $('#txtSo_Lottable_' + recId).html(getLottables[getListPos]);
        $('#wms-srv-sales-product-list-popup').hide();
      });
      // }
      checkSkuWithCart();
    }
  });
}

function addMultipleProduct(getValue, getId, getProductName, getCurrentStock, getReserveQty, getUOM, getLottable, getLottables) {
  //  $('.btnSelectProdFromList[data-isselected="yes"]').each(function(){
  // <a href="#" onclick="openSalesProductListPopup(' + addNewRowCounter + ', false);return false;"><i class="fas fa-search" title="Search"></i></a>
  var getLottableHead = $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header .gridCellLottable');
  // var lotType0 = $(getLottableHead).eq(0).attr('data-lottype');
  // var lotType1 = $(getLottableHead).eq(1).attr('data-lottype');
  // var lotType2 = $(getLottableHead).eq(2).attr('data-lottype');
  // var lotType3 = $(getLottableHead).eq(3).attr('data-lottype');
  // var lotType4 = $(getLottableHead).eq(4).attr('data-lottype');
  // var lotType5 = $(getLottableHead).eq(5).attr('data-lottype');
  // var lotType6 = $(getLottableHead).eq(6).attr('data-lottype');
  // var lotType7 = $(getLottableHead).eq(7).attr('data-lottype');
  // var lotType8 = $(getLottableHead).eq(8).attr('data-lottype');
  // var lotType9 = $(getLottableHead).eq(9).attr('data-lottype');

  var addNewRowHtml = '<div class="wms-srv-grid-row wmsFrmAddRow wmsFrmAddRow_' + addNewRowCounter + '" data-lotgrp="' + getLottables + '">' +
    '<div class="wms-srv-grid-cell">' +
    '<div class="wms-srv-suggestion-holder">' +
    '<input type="text" id="txtSo_SKUCode_' + addNewRowCounter + '" data-prefix="SESKU" data-id="" value=""' +
    'class="wms-srv-grid-cell-input notranslate" disabled="disabled">' +
    '</div>' +
    '</div>' +
    '<div class="wms-srv-grid-cell"><input type="text" id="txtSo_SKUName_' + addNewRowCounter + '" value=""' +
    'class="wms-srv-grid-cell-input" disabled="disabled"></div>' +
    '<div class="wms-srv-grid-cell"><input type="text" id="txtSo_CurrentStock_' + addNewRowCounter + '" value=""' +
    'class="wms-srv-grid-cell-input" disabled="disabled"></div>' +
    '<div class="wms-srv-grid-cell"><input type="text" id="txtSo_ReserveQty_' + addNewRowCounter + '" value=""' +
    'class="wms-srv-grid-cell-input" disabled="disabled"></div>' +
    '<div class="wms-srv-grid-cell"><input type="text" id="txtSo_RequestedQty_' + addNewRowCounter + '" value=""' +
    'class="wms-srv-grid-cell-input" onkeyup="updateRequestedQty(' + addNewRowCounter + ');"></div>' +
    '<div class="wms-srv-grid-cell"><input type="text" id="txtSo_OrderQty_' + addNewRowCounter + '" value=""' +
    'class="wms-srv-grid-cell-input" disabled="disabled" ></div>' +
    '<div class="wms-srv-grid-cell">' +
    '<select id="txtSo_UOM_' + addNewRowCounter + '" class="wms-srv-grid-cell-input" onchange="updateRequestedQty(' + addNewRowCounter + ');">' +
    '</select>' +
    '</div>';

  var breakLotVal = getLottables.split('|');
  for (var bl = 0; bl < breakLotVal.length; bl++) {
    var lotType = $(getLottableHead).eq(0).attr('data-lottype');
    var lotVal = breakLotVal[bl];
    if (lotVal.trim() == '0') {
      lotVal = '';
    }
    addNewRowHtml = addNewRowHtml + '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="' + bl + '" data-lottype="' + lotType + '" id="addNew_Lottable_' + bl + '_' + addNewRowCounter + '" style="width:82px;text-align:center;display:none;">' + lotVal + '</div>';
  }

  //getLottables
  // '<div class="wms-srv-grid-cell" style="width:275px;">' +
  // =========================================== 
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="0" data-lottype="'+ lotType0 +'" id="addNew_Lottable_0_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="1" data-lottype="'+ lotType1 +'" id="addNew_Lottable_1_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="2" data-lottype="'+ lotType2 +'" id="addNew_Lottable_2_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="3" data-lottype="'+ lotType3 +'" id="addNew_Lottable_3_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="4" data-lottype="'+ lotType4 +'" id="addNew_Lottable_4_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="5" data-lottype="'+ lotType5 +'" id="addNew_Lottable_5_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="6" data-lottype="'+ lotType6 +'" id="addNew_Lottable_6_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="7" data-lottype="'+ lotType7 +'" id="addNew_Lottable_7_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="8" data-lottype="'+ lotType8 +'" id="addNew_Lottable_8_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  //     '<div class="wms-srv-grid-cell gridCellLottable"data-lotindex="9" data-lottype="'+ lotType9 +'" id="addNew_Lottable_9_'+ addNewRowCounter +'" style="width:82px;text-align:center;display:none;"></div>'+
  // =========================================== 
  // '<div class="lottableControlHolder"  id="txtSo_Lottable_' + addNewRowCounter + '">' +
  // '</div>' +
  // '</div>' +
  addNewRowHtml = addNewRowHtml + '<div class="wms-srv-grid-cell">' +
    '<div class="wms-srv-grid-action">' +
    '<button class="wms-srv-input wms-srv-button " type="button" title="Save"' +
    'data-prefix="SV" onclick="saveSalesOrerSkuDetails(' + addNewRowCounter + ');"><i class="fas fa-check-circle"></i><span>Save</span></button>' +
    '<div class="wms-srv-action-sep">|</div>' +
    '<a href="#" title="Cart" data-prefix="RM" onclick="removeAddNewRow(' + addNewRowCounter + ');" class="wms-srv-icononly"><i class="fas fa-times-circle"></i></a>' +
    '</div>' +
    '</div>' +
    '</div>';
  $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-header').after(addNewRowHtml);

  // var listItemObj = $(this);
  //   var getListPos = Number($(this).attr('data-pos'));
  $('#txtSo_SKUCode_' + addNewRowCounter).val(getValue);
  $('#txtSo_SKUCode_' + addNewRowCounter).attr('data-id', getId);
  $('#txtSo_SKUName_' + addNewRowCounter).val(getProductName);
  $('#txtSo_CurrentStock_' + addNewRowCounter).val(getCurrentStock);
  $('#txtSo_ReserveQty_' + addNewRowCounter).val(getReserveQty);
  var myUomList = '';
  var myUomObj = getUOM;
  for (var k = 0; k < myUomObj.length; k++) {
    var getUomId = myUomObj[k].ID;
    var getUomName = myUomObj[k].Name;
    var getUomUnitValue = myUomObj[k].UnitValue;
    myUomList = myUomList + '<option value="' + getUomId + '" data-unitvalue="' + getUomUnitValue + '">' + getUomName + '</option>';
  }

  $('#txtSo_UOM_' + addNewRowCounter).html(myUomList);
  var myLottableList = '';
  var myLottableObj = getLottable;
  var getLottableWidth = Math.round((100 / myLottableObj.length) - 3);
  $('#txtSo_Lottable_' + addNewRowCounter).html(getLottables);
  addNewRowCounter = addNewRowCounter + 1;
  //});
  //$('#wms-srv-sales-product-list-popup').hide();
}

function loadSalesProductList(recId) {
  var obj = $('#ddlOrderType').val();
  var getlot = $('#ddlLot').val();
  var apiPath = wmsApiPath + "SO/GetSOSKUSuggest";
  var postData = '';

  if (recId != null) {
    postData = {
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "UserId": getUserId,
      "ClientId": getClientId,
      "OrderId": 0,
      "skey": '',
      "isSuggestionList": "no",
      "portal": "wms",
      "Object": obj,
      "Lot": getlot
    };
  } else {
    var getProdSkey = $('#txtSo_ProdSearchpopup').val();
    var getProdLottableSkey = $('#txtSo_ProdSearchLottablepopup').val();
    var getFinalProdSkey = getProdSkey + '|' + getProdLottableSkey;
    if (getProdLottableSkey.trim() == '') {
      getFinalProdSkey = getProdSkey;
    }

    postData = {
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "UserId": getUserId,
      "ClientId": getClientId,
      "OrderId": 0,
      "skey": getFinalProdSkey,
      "isSuggestionList": "no",
      "portal": "wms"
    };
    recId = 0;
  }

  callHttpUrl(apiPath, postData, function (data) {
    debugger;
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.SKUSuggestList;

      $('#pnlSalesOrderProductList').html('');
      // $('#pnlSalesOrderProductList').append('<div class="wms-srv-grid-header">' +
      //   '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Sr. No</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Image</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Description</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Category</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Sub Category</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Keyword</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Group Set</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Current Stock</div>' +
      //   '<div class="wms-srv-grid-cell" style="text-align:center;">Reserve Qty</div>' +
      //   '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Action</div>' +
      //   '</div>');

      var strSalesOrderProductList = '';

      strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-header">' +
        '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Sr. No</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Image</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Description</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Category</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Sub Category</div>';
      //'<div class="wms-srv-grid-cell" style="text-align:center;">Lottable</div>' +

      var getLottable = mBrillWmsSession.getCustomerLottable();
      var breakCustLot = getLottable.split(',');
      for (var pl = 0; pl < breakCustLot.length; pl++) {
        var custLotLabel = breakCustLot[pl];
        strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-cell" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + + custLotLabel + +'">' + custLotLabel + '</div>';
      }

      strSalesOrderProductList = strSalesOrderProductList = '<div class="wms-srv-grid-cell" style="text-align:center;">Keyword</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Group Set</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Current Stock</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">Reserve Qty</div>' +
        '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Action</div>' +
        '</div>';

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
        var rowNum = i + 1;
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

        // $('#pnlSalesOrderProductList').append('<div class="wms-srv-grid-row">' +
        //   '<div class="wms-srv-grid-cell" style="width:80px;">' + rowNum + '</div>' +
        //   '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage[i] + '" style="width:40px;height:40px;" /></div>' +
        //   '<div class="wms-srv-grid-cell">' + getValue[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getProductName[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getProdDescription[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getCategory[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getSubCategory[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell" id="cellKeyWordHolder_' + rowNum + '"><i class="fas fa-plus-circle btnAddProductKeyword" onclick="showAddKeywordPanel(' + getId[i] + ',' + rowNum + ')"></i> ' + convertToKeyblock(getKeyword[i], getId[i], rowNum) + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getGroupSet[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getCurrentStock[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell">' + getReserveQty[i] + '</div>' +
        //   '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
        //   '<a href="#" class="wms-srv-icononly btnAddToProductListField" data-pos="' + i + '"><i class="fas fa-check-circle"></i></a>' +
        //   '</div></div>' +
        //   '</div>');

        var strSalesOrderProductList = '';

        strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell" style="width:80px;">Test_' + rowNum + '</div>' +
          '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage[i] + '" style="width:40px;height:40px;" /></div>' +
          '<div class="wms-srv-grid-cell">' + getValue[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getProductName[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getProdDescription[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getCategory[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getSubCategory[i] + '</div>';
        //'<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>' +

        var breakLotVal = getLottables[i].split('|');
        for (var bl = 0; bl < breakLotVal.length; bl++) {
          strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-cell">' + breakLotVal[bl] + '</div>';
        }

        strSalesOrderProductList = strSalesOrderProductList + '<div class="wms-srv-grid-cell" id="cellKeyWordHolder_' + rowNum + '"><i class="fas fa-plus-circle btnAddProductKeyword" onclick="showAddKeywordPanel(' + getId[i] + ',' + rowNum + ')"></i> ' + convertToKeyblock(getKeyword[i], getId[i], rowNum) + '</div>' +
          '<div class="wms-srv-grid-cell">' + getGroupSet[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getCurrentStock[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getReserveQty[i] + '</div>' +
          '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
          '<a href="#" class="wms-srv-icononly btnAddToProductListField" data-pos="' + i + '"><i class="fas fa-check-circle"></i></a>' +
          '</div></div>' +
          '</div>';

      }
      $('.btnAddToProductListField').off();
      $('.btnAddToProductListField').click(function () {
        debugger;
        var listItemObj = $(this);
        var getListPos = Number($(this).attr('data-pos'));
        $('#txtSo_SKUCode_' + recId).val(getValue[getListPos]);
        $('#txtSo_SKUCode_' + recId).attr('data-id', getId[getListPos]);
        $('#txtSo_SKUName_' + recId).val(getProductName[getListPos]);
        $('#txtSo_CurrentStock_' + recId).val(getCurrentStock[getListPos]);
        $('#txtSo_ReserveQty_' + recId).val(getReserveQty[getListPos]);
        var myUomList = '';
        var myUomObj = getUOM[getListPos];
        for (var k = 0; k < myUomObj.length; k++) {
          var getUomId = myUomObj[k].ID;
          var getUomName = myUomObj[k].Name;
          var getUomUnitValue = myUomObj[k].UnitValue;
          myUomList = myUomList + '<option value="' + getUomId + '" data-unitvalue="' + getUomUnitValue + '">' + getUomName + '</option>';
        }

        $('#txtSo_UOM_' + recId).html(myUomList);
        var myLottableList = '';
        var myLottableObj = getLottable[getListPos];
        var getLottableWidth = Math.round((100 / myLottableObj.length) - 3);
        /*for (var m = 0; m < myLottableObj.length; m++) {
          var getLottableId = myLottableObj[m].ID;
          var getLottableName = myLottableObj[m].Name;
          var getLottableDataType = myLottableObj[m].DataType.toLocaleLowerCase();
          if (getLottableDataType == 'date') {
            myLottableList = myLottableList + '<input type="text" id="Lottable_' + getLottableId + '" class="wmsLottableInput wms-srv-datepicker" placeholder="' + getLottableName + '" value="" style="width:' + getLottableWidth + '%;display:inline-block;" /> ';
          } else {
            myLottableList = myLottableList + '<input  type="text" id="Lottable_' + getLottableId + '" class="wmsLottableInput" placeholder="' + getLottableName + '" value="" style="width:' + getLottableWidth + '%;display:inline-block;" /> ';
          }
        }
        $('#txtSo_Lottable_' + recId).html(myLottableList);
        $('#txtSo_Lottable_' + recId + ' .wms-srv-datepicker').datepicker('destroy');
        $('#txtSo_Lottable_' + recId + ' .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });*/
        $('#txtSo_Lottable_' + recId).html(getLottables[getListPos]);
        $('#wms-srv-sales-product-list-popup').hide();
      });
      // }
    }
  });
}

function convertToKeyblock(keyword, skuId, rowNum) {
  var keyblock = '';
  if (keyword != '') {
    if (keyword.indexOf('|') > -1) {
      var splitKeyword = keyword.split('|');
      for (var k = 0; k < splitKeyword.length; k++) {
        keyblock = keyblock + '<div class="keyblock">' + splitKeyword[k] + ' <i class="fas fa-times-circle" onclick="removeSkuKeyword(\'' + splitKeyword[k] + '\', ' + skuId + ',\'' + rowNum + '\');"></i></div>';
      }
    } else {
      keyblock = '<div class="keyblock">' + keyword + ' <i class="fas fa-times-circle" onclick="removeSkuKeyword(\'' + keyword + '\', ' + skuId + ',\'' + rowNum + '\');"></i></div>';
    }

  }
  return keyblock;
}

function showAddKeywordPanel(skuId, rowNum) {
  closeAddKeywordPanel();
  var strAddKeywordBlock = '<div class="pnlAddKeyword keyblock">' +
    '<input type="text" value="" class="txtSkuKeyword"><i class="fas fa-check-circle" onclick="addSkuKeyword(' + skuId + ',' + rowNum + ')"></i>  <i class="fas fa-times-circle" onclick="closeAddKeywordPanel();"></i>' +
    '</div>';
  $('#cellKeyWordHolder_' + rowNum).prepend(strAddKeywordBlock);
}

function closeAddKeywordPanel() {
  $('.pnlAddKeyword').remove();
}

function addSkuKeyword(skuId, rowNum) {
  var apiPath = wmsApiPath + "SO/saveSkuKeyWord";
  var keyword = $('.txtSkuKeyword').val().trim();
  if (keyword != '') {
    var postData = {
      "Key": keyword,
      "ProdID": skuId,
      "ClientID": getClientId,
      "CustomerId": getCustomerId,
      "UserId": getUserId,
      "WarehouseId": getWarehouseId
    };

    callHttpUrl(apiPath, postData, function (data) {
      debugger;
      var getStatusCode = data.StatusCode;
      var getStatus = data.Status;
      if (getStatus == '200' && getStatusCode == 'Success') {
        var keyblock = '<div class="keyblock">' + keyword + ' <i class="fas fa-times-circle" onclick="removeSkuKeyword(\'' + keyword + '\', ' + skuId + ',\'' + rowNum + '\');"></i></div>';
        $('#cellKeyWordHolder_' + rowNum).append(keyblock);
        closeAddKeywordPanel();
      } else {
        alert('Failed to add keyword!!');
      }
    });
  } else {
    alert('Please enter keyword to add!!');
  }
}

function removeSkuKeyword(keyword, skuId, rowNum) {
  var apiPath = wmsApiPath + "SO/removeSkuKeyWord";

  postData = {
    "Key": keyword,
    "ProdID": skuId,
    "ClientID": getClientId,
    "CustomerId": getCustomerId,
    "UserId": getUserId,
    "WarehouseId": getWarehouseId
  };

  callHttpUrl(apiPath, postData, function (data) {
    debugger;
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      $('#cellKeyWordHolder_' + rowNum + ' .keyblock').each(function () {
        var getCurrentKeyword = $(this).text().trim();
        if (getCurrentKeyword == keyword) {
          $(this).remove();
          closeAddKeywordPanel();
        }
      });
    }
  });
}
// PRODUCT LIST

//Suraj
function clearFilterSO() {
  $("#ddlLottable").val("Lot1");
  $('#txtSo_ProdSearch').val('');
  $('#txtSo_ProdSearchLottable').val('');
}

function clearItem() {
  $('#txtSo_SKUCode_0').val('');
  $('#txtSo_SKUName_0').val('');
  $('#txtSo_CurrentStock_0').val('');
  $('#txtSo_ReserveQty_0').val('');
  $('#txtSo_RequestedQty_0').val('');
  $('#txtSo_OrderQty_0').val('');
  $('#txtSo_Lottable_0').val('');
}

function removeAddNewRow(rowNum) {
  $('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow_' + rowNum).remove();
  checkForAddNewSkuRow();
}

function checkForAddNewSkuRow() {
  var rowLength = $('#wmsSkuDetailsSalesOrderGrid .wms-srv-grid-row').length;
  if (rowLength > 0) {
    $('#pnlNoSkuRecord').hide();
  } else {
    $('#pnlNoSkuRecord').show();
  }
}
//End

function BindAddressAsClient(getClientId) {
  debugger
  var apiPath = wmsApiPath + 'SO/getSuggestedClientAddress';
  var postData = {
    "ClientID": getClientId,
    "UserId": getUserId,
    "SearchKey": '',
    "isSuggestionList": 'no'
  };

  callHttpUrl(apiPath, postData, function (data) {
    var getStatusCode = data.StatusCode;
    var getStatus = data.Status;
    if (getStatus == '200' && getStatusCode == 'Success') {
      var suggestionList = data.Result.Table;
      var getId = suggestionList[0].ID;
      var getValue = suggestionList[0].Name;

      $('#txtSo_BillToAddress').attr('data-id', getId);
      $('#txtSo_BillToAddress').val(getValue);

      $('#txtSo_ShipToAddress').attr('data-id', getId);
      $('#txtSo_ShipToAddress').val(getValue);

    }
  });
}

/* ============================== CART SKU LIST ============================== */

function addToCartSalesOrder(objRow) {
  var getHeadCount = $('#pnlCartSalesOrder .wms-srv-grid-header').length;
  var getProdCount = $('#pnlCartSalesOrder .wms-srv-grid-row').length;
  var cartItem = $(objRow).clone().appendTo('#pnlCartSalesOrder');

  $(cartItem).find('.wms-srv-grid-action i').attr('class', 'fas fa-times-circle');
  $(cartItem).find('.wms-srv-grid-action i').attr('style', 'color:#000000;');

  if (getHeadCount <= 0) {
    var getHead = $(objRow).parent().find('.wms-srv-grid-header').clone().prependTo('#pnlCartSalesOrder');
    //$('#pnlCartSalesOrder').prepend(getHead);
  }

  $(cartItem).find('.btnSelectProdFromList').off();
  $(cartItem).find('.btnSelectProdFromList').click(function () {
    var objRow = $(this).parent().parent().parent();
    var skuId = $(objRow).attr('data-id');
    var skuLottables = $(objRow).attr('data-lottables');
    removeFromCartSalesOrder(skuId, skuLottables);
  });
  updateSkuListCartCount();
}

function removeFromCartSalesOrder(skuId, skuLottables) {
  $('#pnlSalesOrderProductList .wms-srv-grid-row[data-id="' + skuId + '"][data-lottables="' + skuLottables + '"]').find('.wms-srv-grid-action i').attr('style', 'color:#000000');
  $('#pnlSalesOrderProductList .wms-srv-grid-row[data-id="' + skuId + '"][data-lottables="' + skuLottables + '"]').find('.wms-srv-grid-action a.btnSelectProdFromList').attr('data-isselected', 'no');
  $('#pnlCartSalesOrder .wms-srv-grid-row[data-id="' + skuId + '"][data-lottables="' + skuLottables + '"]').remove();
  showEmptySONoSkuMsg();
  updateSkuListCartCount();
}

function checkSkuWithCart() {
  $('#pnlCartSalesOrder .wms-srv-grid-row').each(function () {
    var getSkuId = $(this).attr('data-id');
    var getSkuLottables = $(this).attr('data-lottables');
    var skuListRow = $('#pnlSalesOrderProductList .wms-srv-grid-row[data-id="' + getSkuId + '"][data-lottables="' + getSkuLottables + '"]');
    $(skuListRow).find('.btnSelectProdFromList i').attr('style', 'color:#78b421');
    $(skuListRow).find('.btnSelectProdFromList').attr('data-isselected', 'yes');
  });
}

function updateSkuListCartCount() {
  var skuListCartCount = $('#pnlCartSalesOrder .wms-srv-grid-row').length;
  $('#pnlSkuListCartCount').html(skuListCartCount);
}

function resetSkuListCart() {
  $('#pnlCartSalesOrder').html('');
  $('#pnlSkuListCartCount').html('0');
}

function showEmptySONoSkuMsg() {
  var getCartCount = $('#pnlCartSalesOrder .wms-srv-grid-row').length;
  if (getCartCount <= 0) {
    $('#pnlCartSalesOrder').hide();
    $('#pnlEmptySalesOrderCart').show();
  } else {
    $('#pnlCartSalesOrder').show();
    $('#pnlEmptySalesOrderCart').hide();
  }
}

function showSOCartList() {
  showEmptySONoSkuMsg();
  $('#wms-srv-SO-cart-list-popup').show();
  $('#wms-srv-Sales-product-list-popup').hide();
  $('#wms-srv-SO-cart-list-popup-close').off();
  $('#wms-srv-SO-cart-list-popup-close').click(function () {
    $('#wms-srv-Sales-product-list-popup').show();
    $('#wms-srv-SO-cart-list-popup').hide();
  });

  $('#btnSelectFromSOSkuList').off();
  $('#btnSelectFromSOSkuList').click(function () {
    $('#wms-srv-Sales-product-list-popup').show();
    $('#wms-srv-SO-cart-list-popup').hide();
  });
}

/* ============================== CART SKU LIST ============================== */