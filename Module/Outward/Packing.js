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
var getTotalRecords = '5';
var getPackingRecordLimit = 200;
var recordLimit = '5';
var hasQualityCheck = false;
var more = true;
var IsQC = 'NO';
var qcid=0;
var PageObject = '';
var QCID=0;
var checkassignstatus = "";
var checkSaveBClose = '';

function initpacking() {
  getPackingList(filtercol,filterval);
     $("#theme-createtemplate-popup-close").click(function()
  {
      $("#theme-createtemplate-popup").hide();

  });						   
}

function openPackingSkuList() {
  $('#wms-srv-packingskulist-popup').show();
  $('#wms-srv-packingskulist-popup-close').off();
  $('#wms-srv-packingskulist-popup-close').click(function () {
    $('#wms-srv-packingskulist-popup').hide();
    resetPackingSkuListPopup();
  });
  getPackingSkuList();
}

function resetPackingSkuListPopup() {
  $('#packingSkuList').html('');
}

function getPackingSkuList() {
  debugger;
  var getLottable = mBrillWmsSession.getCustomerLottable();
  var breakCustLot = getLottable.split(',');

  $('#packingSkuList').html('');
  var skuListHead = '<div class="wms-srv-grid-header">' +
    '<div class="wms-srv-grid-cell">Id</div>' +
    '<div class="wms-srv-grid-cell">SKU Code</div>' +
    '<div class="wms-srv-grid-cell">SKU Name</div>';
    //'<div class="wms-srv-grid-cell">Lottable</div>' +
    for(var pl=0; pl < breakCustLot.length; pl++){
        var custLotLabel = breakCustLot[pl];
        skuListHead = skuListHead + '<div class="wms-srv-grid-cell" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
    }
    skuListHead = skuListHead + '<div class="wms-srv-grid-cell">Action</div>' +
    '</div>';
  $('#packingSkuList').append(skuListHead);
  var getOrderId = $('#pkgSoDetails_OrderNo').text().trim();
  var apiPath = wmsApiPath + "Packing/StagingSKUList";
  var getqcid = $('#pkgSoDetails_OrderNo').attr('data-id');
  var postData = {
    "OrderID": getOrderId,
    "skey": "",
    "qcid":getqcid,
    "userId":getUserId
  };
  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode.trim();
    if (getStatusCode == 'Success') {
      var getSKUList = data.Result.Table;
      for (var i = 0; i < getSKUList.length; i++) {
        var getProdId = getSKUList[i].ProdID;
        var getProdCode = getSKUList[i].SKUCode;
        var getProdName = getSKUList[i].SKUName;
        var getLot = getSKUList[i].Lot;
        var getLottableGroup = getLot.split('|');
        var skuListRow = '<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell">' + getProdId + '</div>' +
          '<div class="wms-srv-grid-cell">' + getProdCode + '</div>' +
          '<div class="wms-srv-grid-cell">' + getProdName + '</div>';
          for(var pi=0; pi < breakCustLot.length; pi++){
              var custLotLabel = breakCustLot[pi];
              var custLotVal = getLottableGroup[pi];
              if(custLotVal!= null && custLotVal.trim() == '0'){
                custLotVal = '';
              }
              skuListRow = skuListRow + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
          }

         // '<div class="wms-srv-grid-cell">' + getLot + '</div>' +
          skuListRow = skuListRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
          '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="getSkuDetailsById_Packing(\'' + getOrderId + '\', \'' + getProdId + '\',\'' + getLot + '\',\'' + qcid + '\');"><i class="fas fa-check-circle"></i></a>' +
          '</div></div>' +
          '</div>';
        $('#packingSkuList').append(skuListRow);
      }
    }
  });
}

function openPackingShippingPalletList() {
  debugger
  $('#wms-srv-packingstagingpalletlist-popup').show();
  $('#wms-srv-packingstagingpalletlist-popup-close').off();
  $('#wms-srv-packingstagingpalletlist-popup-close').click(function () {
   
    $('#wms-srv-packingstagingpalletlist-popup').hide();
    resetPackingShippingPalletListPopup();
  });
  getPackingShippingPalletList();
}
function resetPackingShippingPalletList(){
  $('#pnlsearchpacking').val('');
  getPackingShippingPalletList();

}
function getPackingShippingPalletList() {
  var getOrderId = $('#pkgSoDetails_OrderNo').text().trim();
  $('#packingStagingPalletList').html('');
  var shippingPalletListHead = '<div class="wms-srv-grid-header" id="header-wrap">' +
    '<div class="wms-srv-grid-cell">Id</div>' +
    '<div class="wms-srv-grid-cell">Carton</div>' +
    '<div class="wms-srv-grid-cell">Action</div>' +
    '</div>';
  $('#packingStagingPalletList').append(shippingPalletListHead);
  //var getSkey = '';
  var getSkey =  $('#pnlsearchpacking').val();
  var apiPath = wmsApiPath + "Packing/ShippingPallet";
  var postData = {
    "CustomerId": getCustomerId,
    "SKey": getSkey,
    "OrderId":getOrderId
  };
  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode.trim();
    if (getStatusCode == 'Success') {
      var getShippingPalletList = data.Result.Table;
      for (var i = 0; i < getShippingPalletList.length; i++) {
        var getShippingPalletId = getShippingPalletList[i].ID;
        var getShippingPalletName = getShippingPalletList[i].serialno;
        var shippingPalletListRow = '<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell">' + getShippingPalletId + '</div>' +
          '<div class="wms-srv-grid-cell">' + getShippingPalletName + '</div>' +
          '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
          '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="addShippingPalletToGrid(\'' + getShippingPalletId + '\', \'' + getShippingPalletName + '\');"><i class="fas fa-check-circle"></i></a>' +
          '</div></div>' +
          '</div>';
        $('#packingStagingPalletList').append(shippingPalletListRow);
      }
    }
  });
}

function addShippingPalletToGrid(palletId, palletName) {
  $('#txtShippingPallet_Packing').val(palletName);
  $('#txtShippingPallet_Packing').attr('data-id', palletId);
  $('#wms-srv-packingstagingpalletlist-popup').hide();
  resetPackingShippingPalletListPopup();
}

function resetPackingShippingPalletListPopup() {
  $('#packingStagingPalletList').html('');
}

function getSkuDetailsById_Packing(getOrderId, getProdId,lot,getQCId) {
  debugger;
  var apiPath = wmsApiPath + "Packing/StagingSKUDetail";
  var postData = {
    "OrderID": getOrderId,
    "SKUID": getProdId,
    "Lot":lot,
    "QCId":getQCId
  };
  callHttpUrl(apiPath, postData, function (data) {
    
    $('#wmsGridPackingSkuList .wms-srv-grid-add .gridCellLottable').html('');
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode.trim();
    if (getStatusCode == 'Success') {
      var getLottable = mBrillWmsSession.getCustomerLottable();
      var breakCustLot = getLottable.split(',');
      var getSKUDetails = data.Result.Table;
      var getProdId = getSKUDetails[0].ProdID;
      var getSkuCode = getSKUDetails[0].SKUCode;
      var getUom = getSKUDetails[0].UOM;
      var getUomId = getSKUDetails[0].UOMID;
      var getPickUpQty = getSKUDetails[0].PickUpQty;
      var getPackingQty = getSKUDetails[0].PackingQty;
      //var getLottable = getSKUDetails[0].Lottable;
      //var getLottableGroup = getLottable.split('|');
      $('#txtSkuCode_Packing').val(getSkuCode);
      $('#txtSkuCode_Packing').attr('data-id', getProdId);
      $('#txtUOM_Packing').html(getUom);
      $('#txtUOM_Packing').attr('data-id', getUomId);
      $('#txtPickupQty_Packing').val(getPickUpQty);
      $('#txtPackingQty_Packing').val(getPackingQty);
      // $('#txtLottable_Packing').html(getLottable);
      // $('#txtLottable_Packing').attr('data-lottable', getLottable);
      var getLottableGroupPacking = getSKUDetails[0].lottable1 + '|' + getSKUDetails[0].lottable2 + '|' + getSKUDetails[0].lottable3 + 
      '|' + getSKUDetails[0].lottable4  + '|' + getSKUDetails[0].lottable5  + '|' + getSKUDetails[0].lottable6  + '|' + getSKUDetails[0].lottable7
      + '|' + getSKUDetails[0].lottable8  + '|' + getSKUDetails[0].lottable9  + '|' + getSKUDetails[0].lottable10;
      
      $('#wmsGridPackingSkuList .wmsFrmAddRow').attr('data-lotgroup', getLottableGroupPacking);
      
      for(var pi=0; pi < breakCustLot.length; pi++){
          var custLotLabel = breakCustLot[pi];
          //var custLotVal = getLottableGroup[pi];
          var lotNum = pi + 1;
          var custLotVal = getSKUDetails[0]["lottable" + lotNum]; 
          if(custLotVal!= null && custLotVal.trim() == '0'){
            custLotVal = '';
          }
          $('#wmsGridPackingSkuList .wms-srv-grid-add .gridCellLottable[data-lotindex="'+pi+'"]').html(custLotVal);
          $('#wmsGridPackingSkuList .wms-srv-grid-add .gridCellLottable[data-lotindex="'+pi+'"]').attr('data-lottype', custLotLabel);     
      }
      $('#wms-srv-packingskulist-popup').hide();
      resetPackingSkuListPopup();
      showHideLottableCellForPackingViewRow();
    }
  });
}

function showHideLottableCellForPackingViewRow(){
  var getAddNewRowCount = $('#wmsGridPackingSkuList .wmsFrmAddRow').length;
  var getViewRowCount = $('#wmsGridPackingSkuList .wmSkuDetailsPackingRow').length;
  var getTotalLotRowCount = getAddNewRowCount + getViewRowCount;
  $('#wmsGridPackingSkuList .gridCellLottable').show();
  for(var l=0; l<10; l++){
       // CHECK FOR VIEW ONLY EMPTY CELL
       var getCell = $('#wmsGridPackingSkuList .wmSkuDetailsPackingRow .gridCellLottable[data-lotindex="'+ l +'"]').length;
       var getAddCell = $('#wmsGridPackingSkuList .wmsFrmAddRow .gridCellLottable[data-lotindex="'+ l +'"]').length;
       var totalCell = getCell + getAddCell;

       var getEmptyCell = $('#wmsGridPackingSkuList .wmSkuDetailsPackingRow .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
       var getAddEmptyCell = $('#wmsGridPackingSkuList .wmsFrmAddRow .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
       var totalEmptyCell = getEmptyCell + getAddEmptyCell;

      if(totalCell > 0){
          if(totalCell != totalEmptyCell){
              $('#wmsGridPackingSkuList .gridCellLottable[data-lotindex="'+ l +'"]').show();
           }else{
              $('#wmsGridPackingSkuList .gridCellLottable[data-lotindex="'+ l +'"]').hide();
           }
      }else{
          $('#wmsGridPackingSkuList .gridCellLottable[data-lotindex="'+ l +'"]').hide();
      }
  }
}

function savePackingSkuDetails() {
  debugger;
  if (validatePackingSkuDetails()) {
    var apiPath = wmsApiPath + 'Packing/SaveStagingSKUDetail';
    var getBatchId = $('#pkgSoDetails_GroupId').html().trim();
    var getOrderId = $('#pkgSoDetails_OrderNo').html().trim();
    var getShippingPalletId = $('#txtShippingPallet_Packing').attr('data-id');
    var getShippingPallet = $('#txtShippingPallet_Packing').val();
    var getSkuId = $('#txtSkuCode_Packing').attr('data-id');
    var getPackingQty = $('#txtPackingQty_Packing').val();
    var getNoOfBoxes = $('#txtNoOfPackage_Packing').val();
    var getPickUpQty = $('#txtPickupQty_Packing').val();
    var getPackingLocId = $('#pkgSoDetails_location').attr('data-id');

    var getWidth = $('#txtWidth_Packing').val();
    var getHeight = $('#txtHeight_Packing').val();
    var getLength = $('#txtLength_Packing').val();
    var getDimension = getWidth + 'x' + getHeight + 'x' + getLength;

    var getWeight = $('#txtWeight_Packing').val();
    var getNotes = $('#txtNotes_Packing').val();
    var getRemark = $('#pkgSoDetails_Remark').val();
    var getObj = $('#ddlOrderType').val();
    var getUomId = $('#txtUOM_Packing').attr('data-id');
   // var getLottable = $('#txtLottable_Packing').attr('data-lottable');
    var getLottable = $('#wmsGridPackingSkuList .wmsFrmAddRow').attr('data-lotgroup');
    var getPickupId = $('#pkgSoDetails_OrderNo').attr('data-id');

    var getCustomerId = $('#ddlcustomer').val();
    var getWarehouseID = $('#ddlwarehouse').val();

    var getProdCodeObj = $('[data-prodcode="' + getSkuId + '' + getLottable + '"]');
    //var getProdCodeWithCarton = $('[data-prodwithcarton="' + getShippingPalletId + '' + getSkuId + '' + getLottable + '"]');
    var getProdCartonRowLength = $('#popupContentstagingdetail [data-prodwithcarton="' + getShippingPalletId + '' + getSkuId + '' + getLottable + '"]').length;

    var getpackQtyTotal = 0;
    for (var i = 0; i < getProdCodeObj.length; i++) {
      if(getProdCartonRowLength <= 0){
        var getCurrentpackQty = Number($('[data-prodcode="' + getSkuId + '' + getLottable + '"]').eq(i).text());
        getpackQtyTotal = getpackQtyTotal + getCurrentpackQty;
      }      
    }

    if(Number(getPickUpQty) < Number(getpackQtyTotal) + Number(getPackingQty)){
      alert("Packing quantity should not greater than pick up quantity..!");
    }
    else{
    var postData = {
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "UserId": getUserId,
      "BatchID": getBatchId,
      "OrderID": getOrderId,
      "PalletID": getShippingPalletId,
      "Pallet": getShippingPallet,
      "SKUID": getSkuId,
      "StagingQty": getPackingQty,
      "NoOfBox": getNoOfBoxes,
      "Height": getHeight,
      "Width": getWidth,
      "Length": getLength,
      "Weight": getWeight,
      "Notes": getNotes,
      "remark": getRemark,
      "obj": getObj,
      "UOMID": getUomId,
      "Lotttable": getLottable,
      "PackingLocationId":getPackingLocId,
      "PickupId":getPickupId
    };

    callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      var getStatusCode = data.StatusCode;
      if (getStatusCode == 'Success') {
        var getMessage = data.Result.Message;
        var filterMessage = getMessage.toLowerCase().trim();
        if(filterMessage == 'success'){
          resetPackingSkuDetails();
          QCID = qcid;
          chkasignornotPack(getBatchId, getOrderId,QCID);     // CHange for TASK
          // getPackingSkuDetails(getBatchId, getOrderId);
          checkSaveBClose = 'Saved';
        }else{
          alert(getMessage);
        }
      }
    });
  }
  }
}

function getPackingSKUSum(){
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

function validatePackingSkuDetails() {
  var isValid = true;
  
  var packlocation = $('#pkgSoDetails_location').val();
  var getShippingPalletId = $('#txtShippingPallet_Packing').attr('data-id');
  var getShippingPallet = $('#txtShippingPallet_Packing').val().trim();
  var getSkuId = $('#txtSkuCode_Packing').attr('data-id');
  var getSku = $('#txtSkuCode_Packing').val().trim();
  var getPackingQty = $('#txtPackingQty_Packing').val();
  var getNoOfBoxes = $('#txtNoOfPackage_Packing').val();

  var getWidth = $('#txtWidth_Packing').val();
  var getHeight = $('#txtHeight_Packing').val();
  var getLength = $('#txtLength_Packing').val();

  var getWeight = $('#txtWeight_Packing').val();
  var getNotes = $('#txtNotes_Packing').val();
  var getReference = $('#txtReference_Packing').val();

  if(packlocation == ''){
    alert('Please select Packing Location!!');
    isValid = false;
  }
  else if (getShippingPalletId == '0' || getShippingPallet == '') {
   // alert('Please select valid Shipping Pallet!!');
    alert('Please select valid Carton!!');
    //Carton
    isValid = false;
  } else if (getSkuId == '0' || getSku == '') {
    alert('Please select valid SKU!!');
    isValid = false;
  } else if (getPackingQty == '' || getPackingQty <= '0') {
    alert('Please enter valid Packing Qty!!');
    isValid = false;
  } else if (getNoOfBoxes == '' || getNoOfBoxes <= '0') {
    alert('Please enter valid No of Boxes!!');
    isValid = false;
  } else if (getWidth == ''|| getWidth <= '0') {
    alert('Please enter valid Width!!');
    isValid = false;
  } else if (getHeight == '' || getHeight <= '0') {
    alert('Please enter valid Height!!');
    isValid = false;
  } else if (getLength == '' || getLength <= '0') {
    alert('Please enter valid Length!!');
    isValid = false;
  } else if (getWeight == '' || getWeight <= '0') {
    alert('Please enter valid Weight!!');
    isValid = false;
  } else if (getReference == '') {
    alert('Please enter Reference!!');
    isValid = false;
  // } else if (getNotes == '') {
  //   alert('Please enter Notes!!');
  //   isValid = false;
   } 
  return isValid;
}

function openSTviewdetail(oid) {
  $('#wms-srv-STviewdetail-popup').show();
  $('#wms-srv-STviewdetail-popup-close').off();
  $('#wms-srv-STviewdetail-popup-close').click(function () {
    $('#wms-srv-STviewdetail-popup').hide();
  });
}

function openstaginglist(qc,batchId) {
  debugger;
  qcid = qc;
  QCID = qc;
  $('#wms-srv-staginglist-popup').show();
  $('#wms-srv-staginglist-popup-close').off();
  $('#wms-srv-staginglist-popup-close').click(function () {
    $('#wms-srv-staginglist-popup').hide();
    $('#packingSalesOrderGrid').html('');
  });
  getPackingSalseOrderList(batchId,qc);
}

function openstagingdetail(batchId, salesOrderId,QCID) {
  var getLottable = mBrillWmsSession.getCustomerLottable();
  var breakCustLot = getLottable.split(',');
  for(var pl=0; pl < breakCustLot.length; pl++){
    var custLotLabel = breakCustLot[pl];
    $('#wmsGridPackingSkuList .wms-srv-grid-header .gridCellLottable[data-lotindex="'+pl+'"]').html(custLotLabel);
    $('#wmsGridPackingSkuList .wms-srv-grid-header .gridCellLottable[data-lotindex="'+pl+'"]').attr('data-lottype', custLotLabel);
    $('#wmsGridPackingSkuList .wms-srv-grid-header .gridCellLottable[data-lotindex="'+pl+'"]').hide();
    $('#wmsGridPackingSkuList .wms-srv-grid-add .gridCellLottable[data-lotindex="'+pl+'"]').html('');
    $('#wmsGridPackingSkuList .wms-srv-grid-add .gridCellLottable[data-lotindex="'+pl+'"]').attr('data-lottype', custLotLabel);
    $('#wmsGridPackingSkuList .wms-srv-grid-add .gridCellLottable[data-lotindex="'+pl+'"]').hide();
  }

  $('#wms-srv-stagingdetail-popup').show();
  $('#wms-srv-stagingdetail-popup-close').off();
  $('#wms-srv-stagingdetail-popup-close').click(function () {
    resetPackingSkuDetails();
    if (checkSaveBClose == "NotSaved") {
      if (confirm("If You Close Window without Save Will remove added Record from Packing Details.Do you want to close?")) {
        checkSaveBClose == '';
      }
    }
    $('#wms-srv-stagingdetail-popup').hide();
  });
  //QCID = qcid;
  chkasignornotPack(batchId, salesOrderId,QCID);

  // getPackingSkuDetails(batchId, salesOrderId);
}

function getPackingList(filtercol,filterval) {
  debugger;
  var apiPath = wmsApiPath + 'Packing/GetStagingList';
  var getPageObject = $('#ddlOrderType').val();
  if(filtercol != 0 && filterval !=0)
  {
    
    var filtercol = $('#ddlpackingfilter').val();
    var filterval = $('#txtpackingfilter').val();

  }   
 var filtertxtval="0"
  if(filterval!=''){
    filtertxtval=filterval
  }

  if (filtercol == '')
  {
      filtercol = '';
      filterval = '';
  }

  var postData =
  {
    CurrentPage: CurrentPage,
    recordLimit: getPackingRecordLimit,
    CustomerId: getCustomerId,
    WarehouseId: getWarehouseId,
    UserId: getUserId,
    Object: getPageObject,
    whereFilterCondtion: filtercol,
    SearchValue: filtertxtval,
    ClientId: getClientId
  }

  //PickingListGrid
  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
    if (getStatus == '200') {
      $('#tblgetPackingList').html('');
      var myGridList = data.Result;

      var getCurrentPage = myGridList.PackingListResult[0].CurrentPage;
      //var getTotalRecords = Number(myGridList.PackingListResult[0].Dashboard[0].Packing) + Number(myGridList.PackingListResult[0].Dashboard[0].Shipped);
      var getTotalRecords = myGridList.PackingListResult[0].Dashboard[0].Packing;
      // GET DASHBOARD COUNTS
      var getOutboundOrder = myGridList.PackingListResult[0].Dashboard[0].OutboundOrder;
      var getAllocated = myGridList.PackingListResult[0].Dashboard[0].Allocated;
      var getPicking = myGridList.PackingListResult[0].Dashboard[0].Picking;
      var getQualityCheck = myGridList.PackingListResult[0].Dashboard[0].QC;
      var getPacking = myGridList.PackingListResult[0].Dashboard[0].Packing;
      var getDispatch = myGridList.PackingListResult[0].Dashboard[0].Shipped;



      
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
  gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(this);" class="messageCheckbox"></div>';	  
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Packing No.</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Packing Date</div>';
      
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Name</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order No.</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Reference No.</div>'     
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">WH Code</div>'     
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Client Code</div>'     
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Shipping Address</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Delivery Type</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Packing By</div>';
		 gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Transporter Name</div>';																										
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px; text-align:center;">Status</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
      gridTable = gridTable + '</div>';
      //Bind Header

      var getGridData = data.Result.PackingListResult[0].PackingList;
      debugger;
      for (var i = 0; i < getGridData.length; i++) {
        var getpackingNo = getGridData[i].PackingNo;
        var getPackingDate = getGridData[i].PackingDate;
        var getBatchNo = getGridData[i].BatchNo;
        var getBatchName = getGridData[i].BatchName;
        var getOrderNo = getGridData[i].OrderNo;
        var getCustPONo = getGridData[i].CustPONo;
        var getPickUpBy = getGridData[i].PackingBy;
        var getShippingAddress = getGridData[i].ShippingAddress;
        var getStatus = getGridData[i].Status;
        var getStatusId = getGridData[i].StatusID;
        var getOrderType = getGridData[i].OrderType;
		    var getTranspoterID = getGridData[i].TranspoterId;
        var getTranspoterName = getGridData[i].TranspoterName;	

        var getWarehouseCode = getGridData[i].code;	
        var getClientCode = getGridData[i].ClientCode;	
        var getDeliveryType = getGridData[i].DeliveryType;	
        

        var getBOLFlag = getGridData[i].BOLFlag;	
        var getBOLMASTERFlag = getGridData[i].MBOLFlag;
        
        var getBOL = getGridData[i].BOL;
        var getMBOL = getGridData[i].MBOL;


        //// GRID ROW
        // gridTable = gridTable + '<div id="div' + getOrderNo +'" class="wms-srv-grid-row">';
		    // gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getpackingNo + '" ></div>';																										   
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getpackingNo + "</div>";
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingDate + "</div>";
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustPONo + "</div>";
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPickUpBy + "</div>";
		    // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTranspoterName + "</div>";																																								   
        // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindPackingListStatusControl(getpackingNo,getBatchNo, getStatus,getStatusId) + "</div>";
        // gridTable = gridTable + '</div>';


         
           gridTable = gridTable + '<div id="div' + getOrderNo +'" class="wms-srv-grid-row">';
           gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getOrderNo + '"></div>';																										   
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getpackingNo + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPackingDate + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getBatchName + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustPONo + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getWarehouseCode + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDeliveryType + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPickUpBy + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTranspoterName + "</div>";																																								   
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindPackingListStatusControl(getpackingNo,getBatchNo, getStatus,getStatusId) + "</div>";
           gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindPackingActionControl(getpackingNo,getBatchNo, getStatus,getStatusId,getOrderNo,getBOLFlag,getBOLMASTERFlag,getBOL,getMBOL) + "</div>";
           gridTable = gridTable + '</div>';
          
        //// GRID ROW
      }

      $('#tblgetPackingList').html(gridTable);
      $('.wms-srv-grey').attr('onclick', 'return false');
    
      setupGridPagingList('tlbOutboundPackingGridPager', CurrentPage, getTotalRecords, getPackingList,getPackingRecordLimit);
      // BIND DATA GRID
    }
    else {
      alert('Unable to connect Server!!');
    }
  });
}
function openPackingDetailReport(dataVal) {
  debugger;
 mBrillWmsSession.setReportDetailId(dataVal);
 window.open("WMSReport/DetailReport/Packing-Template.html"); 
}

// function bindPackingActionControl(getpackingNo,getBatchNo, getStatus,getStatusId) {
//   debugger;
//  var htmlControl = '';

//  htmlControl = htmlControl + '<a href="#" title="Report" data-orderid="' + getpackingNo + '" class="wms-srv-icononly" onclick="openPackingDetailReport(' + getpackingNo + ');return false;"><i class="fas fa-solid fa-eye"></i></a>';



//  return htmlControl;
// }
function bindPackingActionControl(getpackingNo,getBatchNo, getStatus,getStatusId,getOID,getBOLFlag,getBOLMASTERFlag,getBOL,getMBOL)
{
  debugger;
  var htmlControl = '';

 
if (getBOLFlag == 'Y')
{

  htmlControl = htmlControl + '<a href="#" title="' + getBOL + '"   data-orderid="' + getOrderNo + '" class="wms-srv-icononly" onclick="GotoBillOF('+ getOID +')"><i class="fas fa-file" style="color:#000000"></i></a>';

}
else{
 htmlControl = htmlControl + '<a href="#" title="' + getBOL + '"  data-orderid="' + getOrderNo + '" class="wms-srv-icononly" onclick="GotoBillOF('+ getOID +')"><i class="fas fa-file" style="color:darkgray"></i></a>';

}
 htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
 htmlControl = htmlControl + '<a href="#" title="Report" data-orderid="' + getpackingNo + '" class="wms-srv-icononly" onclick="openPackingDetailReport(' + getpackingNo + ');return false;"><i class="fas fa-solid fa-eye"></i></a>';
 htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';


 if(getBOLMASTERFlag =='Y')
 {

  
  htmlControl = htmlControl + '<a href="#" title="' + getMBOL + '" data-orderid="' + getOrderNo + '" class="wms-srv-icononly" onclick="GetMasterBOL();AlreadyCreateBOL();" ><i class="fas fa-copy" class="text" style="color:#000000;"></i></a>';
   
 }
 else 
 {
  htmlControl = htmlControl + '<a href="#" title="' + getMBOL + '" data-orderid="' + getOrderNo + '" class="wms-srv-icononly" onclick="GetMasterBOL();" ><i class="fas fa-copy" class="text" style="color:darkgray"></i></a>';


 }

 return htmlControl;

}
function GetMasterBOL()
{
    debugger;
    var apiPath = wmsApiPath + 'BillofLanding/MasterBOL';
    //var apiPath = 'http://localhost:50068/api/staging/v1/BillofLanding/MasterBOL';

    var SelectedOrder = document.getElementsByClassName("messageCheckbox");
    SelectedOrder.value = "";
  
    $('input[class="messageCheckbox"]').each(function ()
    {
        if ($(this).prop("checked") == true) 
        {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("data-id");
            }
            else 
            {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("data-id");
            }
        }
    });
    if(SelectedOrder.value!="")
    {
      // if (confirm("Do you want to Process?")) 
      // {

      var postData = 
        {
            "orderNo": SelectedOrder.value,
            "EntryType": 'Add',
            "customerId": getCustomerId
        }
        callHttpUrl(apiPath, postData, function (data) 
          {
              var isStatus = data.Status;
              if (isStatus == 200) 
              {
                //alert("Create MasterBOL");
                mBrillWmsSession.setReportDetailId(SelectedOrder.value);
                //window.open("WMSReport/DetailReport/BillOfLading-Detail-Template.html"); 
                window.open("WMSReport/DetailReport/Master-Bill-of-Landing.html"); 
              }
              else
              {
                alert("Error Occured");
              }
              // isSelectedMBOL();
        }); 
    //}
    }
    else{
      alert("Please select Orders!!");
    }

}
function AlreadyCreateBOL()
{
  alert("Already Create Master Bill Of Landing");
} 
function GotoBillOF(getOID)
{
  debugger;
  
  mBrillWmsSession.setReportDetailId(getOID);
  window.open("WMSReport/DetailReport/BillOfLading-Detail-Template.html"); 
}
function openTransportPoup ()
{
  $("#theme-createtemplate-popup").show();
debugger;
    var apiPath = wmsApiPath + 'Packing/getTransportList';
    //var apiPath = 'http://localhost:50068/api/staging/v1/Packing/getTransportList';
    var postData = 
    {
      "UserID": getUserId,
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "VenodrId": 0,
      "CompanyId": getCompanyId
    };
    callHttpUrl(apiPath, postData, function (data) 
      {
          var isStatus = data.Status;
          if (isStatus == 200) {
              var myGridList = data.Result;
  
              var getTransportList = myGridList.Table;
              $("#ddlTransportList").html('<option value = "0"> -- Select Option -- </option>');
              if (getTransportList.length > 0) {
                  for (var i = 0; i < getTransportList.length; i++) {
                      var TransportListId = getTransportList[i].ID;
                      var TransportListname = getTransportList[i].Name;
                      $("#ddlTransportList").append('<option value = "' + TransportListId + '">' + TransportListname + '</option>');
                  }
                 
              }
      }
    }); 

}

function selectAllTask(chkObj) {
  debugger;
  var isChecked = $(chkObj).prop('checked');
  if (isChecked) {
    $('#tblgetPackingList .wms-srv-grid-row input[type="checkbox"]').prop('checked', true);
   
  } else {
    $('#tblgetPackingList .wms-srv-grid-row input[type="checkbox"]').prop('checked', false);
  }
}

function openTransportPoup ()
{
  $("#theme-createtemplate-popup").show();
debugger;
    var apiPath = wmsApiPath + 'Packing/getTransportList';
    //var apiPath = 'http://localhost:50068/api/staging/v1/Packing/getTransportList';
    var postData = 
    {
      "UserID": getUserId,
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "VenodrId": 0,
      "CompanyId": getCompanyId
    };
    callHttpUrl(apiPath, postData, function (data) 
      {
          var isStatus = data.Status;
          if (isStatus == 200) {
              var myGridList = data.Result;
  
              var getTransportList = myGridList.Table;
              $("#ddlTransportList").html('<option value = "0"> -- Select Option -- </option>');
              if (getTransportList.length > 0) {
                  for (var i = 0; i < getTransportList.length; i++) {
                      var TransportListId = getTransportList[i].ID;
                      var TransportListname = getTransportList[i].Name;
                      $("#ddlTransportList").append('<option value = "' + TransportListId + '">' + TransportListname + '</option>');
                  }
                 
              }
      }
    }); 

}
function saveTransportName()
{
  debugger;
  var getTranspoterId = $("#ddlTransportList").val();
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
debugger;
var apiPath = wmsApiPath + 'Packing/UpdateTranspoter';
 // var apiPath = 'http://localhost:50068/api/staging/v1/Packing/UpdateTranspoter';

  var postData = 
  {
    "PackingId":SelectedOrder.value,
    "UserID": getUserId,
    "CustomerId": getCustomerId,
    "WarehouseId": getWarehouseId,
    "CompanyId": getCompanyId,
    "TransportId": getTranspoterId
  };
  callHttpUrl(apiPath, postData, function (data) 
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            var myGridList = data.Result;
            alert("Successfully Asgin Transporter");
            $("#theme-createtemplate-popup").hide();
            getPackingList(filtercol,filterval)
        }
        else{
          alert("unable to connect server..!!");
        }
      });

}

function SearchPackingList(){	
	filtercol = $('#ddlpackingfilter').val();
	filterval = $('#txtpackingfilter').val();
	
	if(filterval =='')
	{
		alert('Please Enter value for filter');		
	}
	else
	{	
		getPackingList(filtercol,filterval);	
	}
	if(filtercol =='' && filterval =='')
	{
		getPackingList(filtercol,filterval);	
	}
}

function PackingDateFilter(){
    debugger;
 var isPackingDate=$('#ddlpackingfilter').val();
    if(isPackingDate=='PackingDate'){
        $('#txtpackingfilter').datepicker({ dateFormat: 'mm/dd/yy' })
    
    }
    else
{
    $('#txtpackingfilter').datepicker('destroy')
}

}

// function setupGridPagingPackingList(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) { //Changed Respective ID 
//   debugger;
//   var global_max_record_count = 5;
//   var pageNo = Number(strCurrentPage);
//   var recordFrom = ((pageNo - 1) * 5) + 1;
//   var recordTo = recordFrom + 4;
//   var totalRecord = Number(strTotalRecords);
//   var pagerLinks = '';

//   if (totalRecord < recordTo) {
//       recordTo = totalRecord;
//   }

//   $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//   var lnkCounter = 1;
//   var currentCounter = global_max_record_count;
//   //var currentCounter = 0;
//   var lastPage = 0;
//   while (currentCounter < totalRecord) {
//       if (lnkCounter == pageNo) {
//           pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//       } else {
//           pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//           lastPage = lnkCounter;
//       }
//       global_last_page_no = lnkCounter;
//       currentCounter = currentCounter + global_max_record_count;
//       lnkCounter = lnkCounter + 1;
//   }

//   / Add Page linke for remaining record /
//   if (currentCounter > totalRecord) {

//       if (lnkCounter == pageNo) {
//           pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//       } else {
//           pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//           lastPage = lnkCounter;
//       }
//       // Update last page count - 21 Sept 2021
//       this.global_last_page_no = lnkCounter;
//   }
//   / Add Page linke for remaining record /
//   var pagerNavLinks = '';
//   pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
//   // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//   pagerNavLinks += pagerLinks;
//   //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//   pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';

//   $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//   $('#' + gridObjId + ' .wms-srv-pager-links a').off();
//   $('#' + gridObjId + ' .wms-srv-pager-links a').click(function () {
//       var getDataPage = $(this).attr('data-page');
//       CurrentPage = getDataPage;
//       if (callBackFunction != null) {
//           callBackFunction(getDataPage, searchfilter, searchvalue);
//       }
//   });

//   $('#' + gridObjId + ' a.wms-srv-pager-go').off();
//   $('#' + gridObjId + ' a.wms-srv-pager-go').click(function () {
//       var getDataPage = $('#' + gridObjId + ' input[name="txtGridPageNo"]').val();
//       CurrentPage = getDataPage;
//       if (Number(getDataPage) < 1) {
//           alert('Please enter valid page number!!');
//       } else if (Number(getDataPage) > Number(lastPage)) {
//           alert('Page number should not be greater than ' + lastPage + ' !!');
//       } else {
//           if (callBackFunction != null) {
//               callBackFunction(getDataPage, searchfilter, searchvalue);
//           }
//       }
//   });
// }

// PACKING FUNCTIONALITY BY ABHIJIT

function getPackingSalseOrderList(batchId,QCID) 
{
  debugger;
  var apiPath = wmsApiPath + 'Packing/GetStagingSOList';
 // var apiPath = "http://localhost:50068/api/staging/v1/Packing/GetStagingSOList";

  var postData = {
    "CustomerId": getCustomerId,
    "WarehouseId": getWarehouseId,
    "UserId": getUserId,
    "BatchID": batchId,
    "QCId":QCID
  };

  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
    var strSalesOrderListHeader = '<div class="wms-srv-grid-header">' +
	 '<div class="wms-srv-grid-cell" style="text-align:center;">Picking/QC Id</div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Batch No</div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Batch Name</div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Order No</div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Order Reference No</div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Warehouse Code</div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Client Code </div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Shipping Address </div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Delivery Type </div>' +
      '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>' +
      '</div>';
    $('#packingSalesOrderGrid').html(strSalesOrderListHeader);
    if (getStatusCode == 'Success') {
      var getSalesOrderList = data.Result.Table;
      IsQC = getSalesOrderList[0].IsQC.toUpperCase();

      for (var i = 0; i < getSalesOrderList.length; i++) {
        var getPkgBatchId = getSalesOrderList[i].BatchID;
        var getPkgBatchName = getSalesOrderList[i].BatchName;
        var getPkgSalesOrder = getSalesOrderList[i].SOID;
        var getPkgStatusId = getSalesOrderList[i].StatusID;
        var getPkgStatusName = getSalesOrderList[i].StatusName;
        var getPkgQc = getSalesOrderList[i].qc;
        var getPkgPacking = getSalesOrderList[i].packing;
        var getOrderRefNumber = getSalesOrderList[i].OrderNumber;
        var getClientCode = getSalesOrderList[i].code;

        var getWarehouseCode = getSalesOrderList[i].WarehouseCode;
        var getShippingAddress = getSalesOrderList[i].ShippingAddress;
        var getShippingCode = getSalesOrderList[i].ShippingCode;
        var getPickUpId = getSalesOrderList[i].PickId;
        var getQCId = getSalesOrderList[i].QcId;

        // var strSalesOrderListRow = '<div class="wms-srv-grid-row">' +
        //   '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgBatchId + '</div>' +
        //   '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgBatchName + '</div>' +
        //   '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgSalesOrder + '</div>' +
        //   '<div class="wms-srv-grid-cell" style="text-align:center;">' + getOrderRefNumber + '</div>' +
        //   '<div class="wms-srv-grid-cell" style="text-align:center;">' + getClientCode + '</div>' +
        //   '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindStatusControlPacking(getPkgBatchId, getPkgSalesOrder, getPkgStatusName,QCID) + '</div>' +
        //   '</div>';
		var strSalesOrderListRow = '';
		if(IsQC == 'YES')
		{
		strSalesOrderListRow = '<div class="wms-srv-grid-row">' +
		 '<div class="wms-srv-grid-cell" style="text-align:center;">' + getQCId + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgBatchId + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgBatchName + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgSalesOrder + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getOrderRefNumber + '</div>' +
         '<div class="wms-srv-grid-cell" style="text-align:center;">' + getWarehouseCode + '</div>' +
         '<div class="wms-srv-grid-cell" style="text-align:center;">' + getClientCode + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getShippingAddress + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getShippingCode + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindStatusControlPacking(getPkgBatchId, getPkgSalesOrder, getPkgStatusName,getQCId,getPickUpId) + '</div>' +
        '</div>';
		}
		else{
			
		 strSalesOrderListRow = '<div class="wms-srv-grid-row">' +
		 '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPickUpId + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgBatchId + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgBatchName + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPkgSalesOrder + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getOrderRefNumber + '</div>' +
         '<div class="wms-srv-grid-cell" style="text-align:center;">' + getWarehouseCode + '</div>' +
         '<div class="wms-srv-grid-cell" style="text-align:center;">' + getClientCode + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getShippingAddress + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + getShippingCode + '</div>' +
        '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindStatusControlPacking(getPkgBatchId, getPkgSalesOrder, getPkgStatusName,getQCId,getPickUpId) + '</div>' +
        '</div>';
		}
        $('#packingSalesOrderGrid').append(strSalesOrderListRow);
      }
    }
  });
}


function bindStatusControlPacking(batchId, orderId, strStatus,QCID,getParaPickUpId) {
  var htmlControl = '';
  htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
  htmlControl = htmlControl + '<div class="wms-srv-status-display">';
  htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
  htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

  var packingQCStatusColor = 'red';
  if (strStatus == 'Picking' || strStatus == 'Quality Check' || strStatus == 'Packing' || strStatus == 'Dispatch') {
    packingQCStatusColor = 'green';
  }
  else if (strStatus == 'Partially Completed')
  {
    packingQCStatusColor = 'partial';
  }
  
  if(IsQC == 'YES'){
    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + packingQCStatusColor + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Quality Check" onclick="openQCdetail(\''+ QCID +'\',\'' + batchId + '\',\'' + getParaPickUpId + '\',0,\'' + orderId + '\');return false;"></div>';
  }
  else{
    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + packingQCStatusColor + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Picking" onclick="openpickedit(\''+ getParaPickUpId +'\',\'' + batchId + '\',\'' + orderId + '\');return false;"></div>';
  }
  var packingStatusColor = 'red';
  if (strStatus == 'Packing' || strStatus == 'Dispatch') {
    packingStatusColor = 'green';
  }
  else if (strStatus == 'Partially Completed')
  {
    packingStatusColor = 'partial';
  }
  if(IsQC == 'YES'){
  htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + packingStatusColor + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Packing" onclick="openstagingdetail(\'' + batchId + '\', \'' + orderId + '\',\'' + QCID + '\');return false;"></div>';

  }
  else
  {
    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + packingStatusColor + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Packing" onclick="openstagingdetail(\'' + batchId + '\', \'' + orderId + '\',\'' + getParaPickUpId + '\');return false;"></div>';

  }
  htmlControl = htmlControl + '</div>';
  //htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
  htmlControl = htmlControl + '</div>';
  htmlControl = htmlControl + '</div>';

  return htmlControl;
}
function clearSearchFilterpacking()
{
   $('#ddlpackingfilter').val('All');
   $('#txtpackingfilter').val('');
   getPackingList(filtercol,'All');
}
function chkasignornotPack(batchId, SOID,QCID)
{
    debugger;
    qcid = QCID;
    QCID = QCID;
    //var LocalPath = "http://localhost:50068/api/staging/v1/";
    var apiPath = wmsApiPath + 'PickUp/ChkOrderAssignToUser';
    //var apiPath = wmsApiPath + 'PickUp/GetPickUpDetail';
   // var checkassignstatus = "";
    var postData=
    {
        "customerid":getCustomerId,
        "userid":getUserId,
        "objectname":"Packing",
        "referenceid":QCID
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
        getPackingSkuDetails(batchId, SOID,checkassignstatus,QCID); 
       // bindQCDetails(pickupId, batchId,checkassignstatus)
      // getPickingDetails(pickupId, batchId,checkassignstatus);
    }); 
   
}
function getPackingSkuDetails(batchId, salesOrderId,checkassignstatus,QCID) {
  debugger;
  $('#packingSave').show();
  $('#dvActionSave').show();
  $('#wmsGridPackingSkuList .wms-srv-grid-packingskurow').remove();
  var getCustomerId = $('#ddlcustomer').val();
  var getWarehouseId = $('#ddlwarehouse').val();
  var apiPath = wmsApiPath + 'Packing/GetStagingSODetail';
  //var apiPath = "http://localhost:50068/api/staging/v1/Packing/GetStagingSODetail";

  var postData = {
    "CustomerId": getCustomerId,
    "WarehouseId": getWarehouseId,
    "UserId": getUserId,
    "BatchID": batchId,
    "SOID": salesOrderId,
    "PickupId":QCID
  };

  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
    if (getStatusCode == 'Success') {
      var getLottable = mBrillWmsSession.getCustomerLottable();
      var breakCustLot = getLottable.split(',');

      var getSalesOrderList = data.Result.Table;
      var getGroupID = getSalesOrderList[0].GroupID;
      var getGroupName = getSalesOrderList[0].GroupName;
      var getOrderNo = getSalesOrderList[0].OrderNo;
      var getPackingNo = getSalesOrderList[0].PackingNo;
      var getPackingDate = getSalesOrderList[0].PackingDate;
      var splitPackingDate = getPackingDate.split('T');
      var getPackingBy = getSalesOrderList[0].PackingBy;
      var getStatus = getSalesOrderList[0].Status;
      var getPackigLocation = getSalesOrderList[0].PackingLocation;
      var PackLocationID = getSalesOrderList[0].StageLocationID;
      var getOrderRefNumber = getSalesOrderList[0].OrderNumber;
      var PickupId = QCID;
      debugger;
      if(getStatus == '33' || getStatus == '59' || checkassignstatus == 'notassign')
      {
          //|| chktaskassign == 'notassign'
        $('#packingSave').hide();
        $('#dvActionSave').hide();
      }

      $('#pkgSoDetails_GroupId').html(getGroupID);
      $('#pkgSoDetails_GroupName').html(getGroupName);
      $('#pkgSoDetails_OrderNo').html(getOrderNo);
      $('#pkgSoDetails_OrderNo').attr('data-id', PickupId);
      $('#pkgSoDetails_OrderReferenceNo').html(getOrderRefNumber);
      $('#pkgSoDetails_PackingNumber').html(getPackingNo);
      $('#pkgSoDetails_PackingDate').html(splitPackingDate[0]);
      $('#pkgSoDetails_PackingBy').html(getPackingBy);
      $('#pkgSoDetails_location').val(getPackigLocation);
      $('#pkgSoDetails_location').attr('data-id', PackLocationID);

      var getSalesOrderSkuDetails = data.Result.Table1;
      debugger;
      for(var i=0; i<getSalesOrderSkuDetails.length; i++){
        var getHeight = getSalesOrderSkuDetails[i].Height;
        var getLength = getSalesOrderSkuDetails[i].Length;
        var getNotes = getSalesOrderSkuDetails[i].Notes;
        var getPackingQty = getSalesOrderSkuDetails[i].PackingQty;
        var getPallet = getSalesOrderSkuDetails[i].Pallet;
        var getPickUpQty = getSalesOrderSkuDetails[i].PickUpQty;
        var getProdID = getSalesOrderSkuDetails[i].ProdID;
        var getSKUCode = getSalesOrderSkuDetails[i].SKUCode;
        var getStagingBy = getSalesOrderSkuDetails[i].StagingBy;
        var getStagingDate = getSalesOrderSkuDetails[i].StagingDate;
        var getStagingNo = getSalesOrderSkuDetails[i].StagingNo;
        var getUOM = getSalesOrderSkuDetails[i].UOM;
        var getUOMID = getSalesOrderSkuDetails[i].UOMID;
        var getWeight = getSalesOrderSkuDetails[i].Weight;
        var getWidth = getSalesOrderSkuDetails[i].Width;
        var getlottable = getSalesOrderSkuDetails[i].Lottable;
        var getnoofpackages = getSalesOrderSkuDetails[i].noofpackages;
        var getpalletid = getSalesOrderSkuDetails[i].palletid;

        var strLottable = '';
        var breakLottable = getlottable.split('|');
        for(var l=0; l<breakLottable.length; l++){
          if(breakLottable[l].trim() != ''){
            if(strLottable != ''){
              strLottable = strLottable + '|' + breakLottable[l];
            }else{
              strLottable = breakLottable[l];
            }
          }
        }
        
        var strPackingSkuRow = '<div class="wms-srv-grid-row wms-srv-grid-packingskurow wmSkuDetailsPackingRow" id="wmsPackingSkuRow_'+ i +'">' +
        '<div class="wms-srv-grid-cell">'+ (i + 1) + '</div>' + 
        '<div class="wms-srv-grid-cell" data-id="'+ getpalletid +'">'+ getPallet +'</div>' + 
        '<div class="wms-srv-grid-cell" data-id="'+ getProdID +'">'+ getSKUCode +'</div>' + 
        '<div class="wms-srv-grid-cell" data-id="'+ getUOMID +'">'+ getUOM +'</div>' + 
        '<div class="wms-srv-grid-cell">'+ getPickUpQty +'</div>' + 
        '<div class="wms-srv-grid-cell" data-prodwithcarton="'+getpalletid+''+getProdID+''+strLottable+'" data-prodcode="'+getProdID+''+strLottable+'">'+ getPackingQty +'</div>' + 
        '<div class="wms-srv-grid-cell">'+ getnoofpackages +'</div>' + 
        '<div class="wms-srv-grid-cell">'+ getWidth +' x '+ getHeight +' x '+ getLength +'</div>' + 
        '<div class="wms-srv-grid-cell">'+ getWeight +'</div>';

        var getLottableGroup = getlottable.split('|');
          for(var pi=0; pi < breakCustLot.length; pi++){
            var custLotLabel = breakCustLot[pi];
            var custLotVal = getLottableGroup[pi];
            if(custLotVal!= null && custLotVal.trim() == '0'){
              custLotVal = '';
            }
            strPackingSkuRow = strPackingSkuRow + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
        }
        //'<div class="wms-srv-grid-cell">'+ strLottable +'</div>' + 
        strPackingSkuRow = strPackingSkuRow + '<div class="wms-srv-grid-cell">'+ getNotes +'</div>' + 
        '<div class="wms-srv-grid-cell">';

        if(getStatus != '33' && getStatus != '59'){
          strPackingSkuRow += '<div class="wms-srv-grid-action" id="dvActionRemove">' +
          '<a href="#" title="Remove" class="wms-srv-save" data-prefix="SV" onclick="removePackingSkuDetails('+ i +', '+ getpalletid +', '+ getProdID +');return false;"><i class="fas fa-times-circle"></i></a>' + 
          '</div>';
        }
       
        strPackingSkuRow += '</div>' + 
        '</div>';
        $('#wmsGridPackingSkuList').append(strPackingSkuRow);
      }
      showHideLottableCellForPackingViewRow();
    }
    else{
      $('#packingSave').show();
      $('#dvActionSave').show();
    }
  });
}

function removePackingSkuDetails(rowIndex, getpalletid, getProdID){
  debugger;
  var apiPath = wmsApiPath + 'Packing/removeSKUDetail';
  var getPackingNo =  $('#pkgSoDetails_PackingNumber').text().trim();
  var getOrderId = $('#pkgSoDetails_OrderNo').text().trim();
  var getBatchId = $('#pkgSoDetails_GroupId').text().trim();
  var postData = {
    "PackingNo": getPackingNo,
    "OrderId": getOrderId,
    "PalletId": getpalletid,
    "ProdId": getProdID,
    "UserId": "1"
  };
  callHttpUrl(apiPath, postData, function (data) {
    debugger;
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
    if (getStatusCode == 'Success') {
        var getMessage = data.Result.Message;
        var filterMessage = getMessage.toLowerCase().trim();
        if(filterMessage == 'success'){
          resetPackingSkuDetails();
          QCID = qcid
          chkasignornotPack(getBatchId, getOrderId,QCID);                 // New CHange for TASK
         // getPackingSkuDetails(getBatchId, getOrderId);
        }else{
          alert(getMessage);
        }
    }
  });
}

function finalSavePackingOrder(){
  debugger;
  var apiPath = wmsApiPath + 'Packing/finalSavePacking';
  var getPackingNo =  $('#pkgSoDetails_PackingNumber').text().trim();
  var getOrderId = $('#pkgSoDetails_OrderNo').text().trim();
  var postData = {
    "PackingNo": getPackingNo,
    "OrderId": getOrderId,
    "UserId" : getUserId,
    "QCID": qcid
  };
  callHttpUrl(apiPath, postData, function (data) {
    debugger;
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
   
    if (getStatusCode == 'Success') {
        var getMessage = data.Result.Message;
        var filterMessage = getMessage.toLowerCase().trim();
        if(filterMessage == 'success'){
          alert('Order saved successfully!!');
          $('#wms-srv-staginglist-popup').hide();
          $('#wms-srv-stagingdetail-popup').hide();
          resetPackingSkuDetails();
          checkSaveBClose = 'NotSaved';
          if(IsQC == 'YES'){
            getQCList();
          }
          else{
            getPickingList();
          }
          //getBatchList('','');
        }else{
          alert(getMessage);
        }
    }
  });
}

function resetPackingSkuDetails() {
  $('#pkgSoDetails_GroupId').html('');
  $('#pkgSoDetails_GroupName').html('');
  $('#pkgSoDetails_OrderNo').html('');
  $('#pkgSoDetails_PackingNumber').html('');
  $('#pkgSoDetails_PackingDate').html('');
  $('#pkgSoDetails_PackingBy').html('');
  $('#pkgSoDetails_Remark').val('');
  $('#txtLottable_Packing').html('');
  $('#wmsGridPackingSkuList .gridCellLottable').hide();
  $('#wmsGridPackingSkuList .wmsFrmAddRow .gridCellLottable').html('');
  resetPackingSkuAddForm();
}

function resetPackingSkuAddForm(){
  $('#txtShippingPallet_Packing').attr('data-id', '0');
  $('#txtShippingPallet_Packing').val('');

  $('#txtSkuCode_Packing').attr('data-id', '0');
  $('#txtSkuCode_Packing').val('');
  $('#txtUOM_Packing').attr('data-id', '0');
  $('#txtUOM_Packing').html('');

  $('#txtPickupQty_Packing').val('');
  $('#txtPackingQty_Packing').val('');
  $('#txtNoOfPackage_Packing').val('');

  $('#txtWidth_Packing').val('');
  $('#txtHeight_Packing').val('');
  $('#txtLength_Packing').val('');
  $('#txtWeight_Packing').val('');
  $('#txtNotes_Packing').val('');

  $('#txtLottable_Packing').attr('data-lottable', '');
  $('#txtLottable_Packing').html();
}

function bindPackingListStatusControl(ID, BatchId, strStatus,statusid){
  debugger;
  var htmlControl = '';
  htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
  htmlControl = htmlControl + '<div class="wms-srv-status-display">';
  htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
  htmlControl = htmlControl + '<div class="wms-srv-status-progress">';
  
  //Packing = 33
  if(statusid == 31 || statusid == 32 || statusid == 57){
      htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-grey" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Not applicable" onclick="openstaginglist(' + 0 + ',\'' + BatchId + '\');return false;"></div>';
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

function openCartonLabelPopup(){  
    $('#wms-srv-carton-popup-packing').show();
    $('#wms-srv-carton-popup-close').off();
    $('#wms-srv-carton-popup-close').click(function () {
        $('#wms-srv-carton-popup-packing').hide();
    });
}

// Cartan Pallet
function cartansavebtn() {
  debugger;
  var apiPath = wmsApiPath + "SavePackingMaster";
  var getLabelType = "Carton";
  var txtLabelRange = $('#txtLabelRangeCartan').val();
  var txtLabelSize =$('#txtLabelSizeCartan').val();
  var txtLabelPrinter = $('#txtLabelPrinterCartan').val();

  var postData =
  {
      "CompanyId": getCompanyId,
      "UserId": getUserId,
      "Type": getLabelType,
      "label":  txtLabelSize,
      "Number":txtLabelRange
  }

  callHttpUrl(apiPath, postData, function (data) {
      debugger;
      GetPackingMasterListCartan(txtLabelRange);
  });
}

function GetPackingMasterListCartan(txtLabelRange) {
  debugger;
  var apiPath = wmsApiPath + 'GetPackingMasterList';
  var getLabelType = "Carton";
  
  var postData =
  {
      "CurrentPage":  CurrentPage,
      "RecordLimit":txtLabelRange,
      "UserId": getUserId,
     "Type": getLabelType
  }
  callHttpUrl(apiPath, postData, function (data) {
     
      var getStatus = data.Status;
      var getStatusCode = data.StatusCode;
      if (getStatus == '200') {
          $("#tlbPoOrderDetailsGridNewCartan").html('');
          var myGridList = data.Result;
          var gridTable = '';
          gridTable = gridTable + '<div class="wms-srv-grid-header">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" > <input type="checkbox" > </div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Serial No. </div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Packing Type</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> Label Size </div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="width:215px;text-align: center;">Creation Date</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Action</div>';
          gridTable = gridTable + '</div>';
      
          for (var i = 0; i < myGridList.Table.length; i++) {
              var GetSerialNo = myGridList.Table[i].Serialno;
              var getPackingType = myGridList.Table[i].packingtype;
              var getLabelSize = myGridList.Table[i].Label;
              var getCreationDate = myGridList.Table[i].Creationdate;
              
              gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
              gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" value="' + GetSerialNo + ' "></div>';
              gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> ' + GetSerialNo + '</div>';
              gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPackingType + '</div>';
              gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLabelSize + '</div>';
              gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCreationDate + '</div>';
              gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(GetSerialNo) + '</div>';
              gridTable = gridTable + '</div>';
          }
          $('#tlbPoOrderDetailsGridNewCartan').html(gridTable);
      }
  });

}

function bindLableStorePalletActionControl(GetSerialNo) {
  var htmlControl = '';
  htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
  htmlControl = htmlControl + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" onClick="printlabel(\'' + GetSerialNo + '\');return false;"><i class="fas fa-eye"></i></a>';
  htmlControl = htmlControl + ' </div>';

  return htmlControl;
}

function printlabel(strBarcode) {
  debugger;
  var myBarcodeStr = '';
  myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(strBarcode) + '</div>';
  $('#BarcodeID').html(myBarcodeStr);
  $('#BarcodeTxt').html(strBarcode);
  $('#wms-srv-printbarcode-popup-packing').show();
  $('#wms-srv-printbarcode-popup-close').off();
  $('#wms-srv-printbarcode-popup-close').click(function () {
      $('#wms-srv-printbarcode-popup-packing').hide();
      $('#BarcodeTxt').html('');
  });
}

function convertToBarcode(str) {
  var toBarcode = '*' + str + '*';
  return toBarcode;
}

function printAlllabel() {
  var myBarcode = getSelectedIdForBarcode();
  var myBarcodeStr = '';
  for (var i = 0; i < myBarcode.length - 1; i++) {
      myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(myBarcode[i+1]) + '</div>';
      myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i+1]+ '</div>';
  }
  $('#BarcodeID').html(myBarcodeStr);
  $('#wms-srv-printbarcode-popup-packing').show();
  $('#wms-srv-printbarcode-popup-close').off();
  $('#wms-srv-printbarcode-popup-close').click(function () {
      $('#wms-srv-printbarcode-popup-packing').hide();

  });
}

function getSelectedIdForBarcode() {
  var strBarcode = [];
  $('#wms-srv-storePalletLabel-popup #tlbPoOrderDetailsGridNew input[type="checkbox"]').each(function () {
      var isSelected = $(this).prop('checked');
      if (isSelected) {
          var getLabel = $(this).val();
          strBarcode.push(getLabel);
      }
  });

  return strBarcode;
}
//End Of Cartan Pallet

function operPackingLOcation(){
  $('#wms-srv-packinglocationlist-popup').show();
  $('#wms-srv-packinglocationlist-popup-close').off();
  $('#wms-srv-packinglocationlist-popup-close').click(function () {
    $('#wms-srv-packinglocationlist-popup').hide();
    resetPackingLocationListPopup();
  });
  getPackingLocationList();  
}

function resetPackingLocationListPopup() {
  $('#packinglocationList').html('');
}

function getPackingLocationList() {
  debugger;
  $('#packinglocationList').html('');
  var packingLocationListHead = '<div class="wms-srv-grid-header" id="header-wrap">' +
    '<div class="wms-srv-grid-cell" style="text-align: center;">Id</div>' +
    '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>' +
    '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>' +
    '</div>';
  $('#packinglocationList').append(packingLocationListHead);
  var getSkey = '';
  var apiPath = wmsApiPath + "Packing/packingLocation";
  var postData = {
    "CustomerId": getCustomerId,
    "SKey": getSkey,
    "WarehouseId":getWarehouseId,
    "UserId":getUserId
  };
  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode.trim();
    if (getStatusCode == 'Success') {
      var getPackingLocationList = data.Result.Table;
      for (var i = 0; i < getPackingLocationList.length; i++) {
        var getLocationId = getPackingLocationList[i].ID;
        var getLocationName = getPackingLocationList[i].Code;
        var PackingLocationListRow = '<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell" style="text-align: center;">' + getLocationId + '</div>' +
          '<div class="wms-srv-grid-cell" style="text-align: center;">' + getLocationName + '</div>' +
          '<div class="wms-srv-grid-cell" style="text-align: center;"><div class="wms-srv-grid-action">' +
          '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="addLocationToGrid(\'' + getLocationId + '\', \'' + getLocationName + '\');"><i class="fas fa-check-circle"></i></a>' +
          '</div></div>' +
          '</div>';
        $('#packinglocationList').append(PackingLocationListRow);
      }
    }
  });
}

function addLocationToGrid(Id, Name) {
  $('#pkgSoDetails_location').val(Name);
  $('#pkgSoDetails_location').attr('data-id', Id);
  $('#wms-srv-packinglocationlist-popup').hide();
  resetPackingLocationListPopup();
}
