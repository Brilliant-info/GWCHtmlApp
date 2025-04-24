/////////////////////////////////////////#region GoodRecieptNoteJs///////////////////////////////////////////////////////////////////////

var objgrn = 'GRN';
var checkSaveBClose = "";
var chksavegrnid = '0';
getBarcodeGrid = "tblgrndetail";
var poidsku = 0;
var IsPallet = 'NO';
var productCode = [];
var productDesc = [];
var allLottable = [];
var batchCode = [];
var grnQty = [];
var getInwardOrdersIDList = [];
var getPassID = '';
var getPassOrderID = [];
var getPassItemCode = [];
var getPassItemName = [];
var getPassReqQty = [];
var getPassUOM = [];
var getPassOrderQty = [];
var getPassLottable = [];
var globalgetPassObj = '';
var getglobalallowGRNexc = 'NO';

var ObjectGrn = $('#ddlPageObject').val();
var getUserName = mBrillWmsSession.getUserName();
var getUserId = mBrillWmsSession.getUserId();
var checkassignstatus = "";

function grnload() {
    $(".grnscancheck").click(function () {
        debugger;
        if ($(this).is(":checked")) {
            var curentval = $('#grnddl').val();
            $(".grnenablescan").show();
            $(".grnheadboxhead").hide();
            $(".grnheadboxdetail").hide();
            $(".divgrnsave").hide();
            if (curentval > 0) {
                $(".grnheadboxhead").show();
            }
        }

        else {
            $(".grnenablescan").hide();
            $(".divgrnsave").show();
            $(".grnheadboxhead").show();
            $(".grnheadboxdetail").show();
            $(".divgrnsave").show();
        }
    });
    //$("#hdnSelectedOrderCheck").val(0);
    $('#pnlTransportHead .wms-srv-datepicker .hasDatepicker').datepicker({ dateFormat: 'dd-M-yy' });
}
function viewGRNDetails(oid) {
    debugger;

    $('#wms-srv-grndetails-popup').show();
    $('#wms-srv-grndetails-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-grndetails-popup-close').off();
    $('#wms-srv-grndetails-popup-close').click(function () {
        // $('#wms-srv-grndetails-popup .wms-srv-datepicker').datepicker('destroy');
        // $('#wms-srv-grndetails-popup').hide();
        // Closegrnbtn();
        // clearArrayVal();
        var isvalid = Closegrnbtn();
        if (isvalid == true) {
            $('#wms-srv-grndetails-popup .wms-srv-datepicker').datepicker('destroy');
            $('#wms-srv-grndetails-popup').hide();
            clearArrayVal();
        }

    });



}
function viewReceiving(strOrderId) {
    openTransport(strOrderId, true);
}
function opengrntab(strOrderId, type) {
    debugger;
    // Hide main popup...
    $('#wms-srv-transport-popup').hide();


    if (type != 'GRN') {
        $('#lbpoid').html(strOrderId);
        $("#hdnorderid").html(strOrderId);
        $('#hdnPoOid').val(strOrderId);

    }


    $('#wms-srv-grndetails-popup').show();
    $('#wms-srv-grndetails-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-grndetails-popup-close').off();
    $('#wms-srv-grndetails-popup-close').click(function () {

        var isvalid = Closegrnbtn();
        if (isvalid == true) {
            $('#wms-srv-grndetails-popup .wms-srv-datepicker').datepicker('destroy');
            $('#wms-srv-grndetails-popup').hide();
            clearArrayVal();
        }

    });
    // //viewgrnOrder(strOrderId);
    // $('#wms-srv-grndetails-popup').show();
    // $('.wms-srv-datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
    // $('#wms-srv-grndetails-popup-close').off();
    // $('#wms-srv-grndetails-popup-close').click(function ()
    //  {
    //     debugger;
    //     Closegrnbtn();
    //     clearArrayVal();
    //    // $('#wms-srv-grndetails-popup').hide();
    //   //  clearSuggestionList();

    // });

}
function getgrnddl(pid) {
    debugger;

    var objectPort = 'Port'
    var apiPath = wmsApiPath + 'GRN/getGRNID';
    // var apiPath = apiServerPath + 'locdropdown?obj="Port" ';
    var postData =
    {
        poid: pid
    }
    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            $('#grnddl').html('');
            var gridDetail = '';
            var getResult = data.Result;


            $("#grnddl").html('<option value = "0">--Select--</option>');
            var getDropDownSize = getResult.Table;
            if (getDropDownSize.length > 0) {
                for (var i = 0; i < getDropDownSize.length; i++) {
                    var getgrnId = getDropDownSize[i].ID;

                    $("#grnddl").append('<option value = "' + getgrnId + '">' + getgrnId + '</option>');
                }
                //if(getgrnId>0)
                //{
                //    $("#grnddl").html('<option value = "' + getgrnId + '">' + getgrnId + '</option>');
                //    $('#btnGRNSave').hide();                   
                //     $("#hdngrnid").val(getgrnId);
                //     viewOrdergrnDetails(getgrnId, "GRN");
                //}
            }

        }
        $('#grnddl').off();
        $('#grnddl').change(function () {
            debugger;
            if ($(this).val() != "0") {
                $('#btnGRNSave').hide();
                var curentval = $(this).val();
                $("#hdngrnid").val(curentval);
                viewOrdergrnDetails(curentval, "GRN", checkassignstatus);
            }
            else {
                $('#btnGRNSave').show();
                viewOrdergrnDetails('0', "GRN", checkassignstatus);
                $("#hdngrnid").val(0);
            }
        });

    });
}
function getGetePassddl(pid) {
    debugger;

    var objectPort = 'Port'
    //var apiPath = wmsApiPath + 'GRN/getPass';
    var apiPath = wmsApiPath + 'GRN/getPass';
    // var apiPath = "http://localhost:50068/api/staging/v1/GRN/getPass";

    var postData =
    {
        poid: pid
    }
    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success') {
            $('#grngetPass').html('');
            var gridDetail = '';
            var getResult = data.Result;


            $("#grngetPass").html('<option value = "0">--Select--</option>');
            var getDropDownSize = getResult.Table;
            if (getDropDownSize.length > 0) {
                for (var i = 0; i < getDropDownSize.length; i++) {
                    var getgrnId = getDropDownSize[i].ID;

                    $("#grngetPass").append('<option value = "' + getgrnId + '">' + getgrnId + '</option>');
                }
                //if(getgrnId>0)
                //{
                //    $("#grnddl").html('<option value = "' + getgrnId + '">' + getgrnId + '</option>');
                //    $('#btnGRNSave').hide();                   
                //     $("#hdngrnid").val(getgrnId);
                //     viewOrdergrnDetails(getgrnId, "GRN");
                //}
            }

        }
    });
}
function viewgrnOrder(strCurrentOrder) {
    checkassignornot(strCurrentOrder);
    //viewgrnHead(strCurrentOrder);
}
function checkassignornot(ReceivingID) {
    debugger;
    // var LocalPath = "http://localhost:50068/api/staging/v1/";
    // var apiPath = LocalPath + 'PickUp/ChkOrderAssignToUser';
    var apiPath = wmsApiPath + 'PickUp/ChkOrderAssignToUser';
    var getCustomerId = $("#ddlcustomer").val();
    var postData =
    {
        "customerid": getCustomerId,
        "userid": getUserId,
        "objectname": "Receiving",
        "referenceid": ReceivingID
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getResult = data.Result;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            var assignorder = data.Result.Message;
            checkassignstatus = assignorder;
        }
        else {
            checkassignstatus = "notask";
        }
        viewgrnHead(ReceivingID, checkassignstatus);
        //getPickingDetails(pickupId, batchId,soid,checkassignstatus);
    });

}
function viewgrnHead(strCurrentOrder, checkassignstatus) {
    debugger;
    checkSaveBClose = "";
    poidsku = strCurrentOrder;
    $('#btnGRNSave').show();

    if (strCurrentOrder != '0') {
        var apiPath = wmsApiPath + 'GRN/GetGRNHead';
        //var apiPath = "http://localhost:50068/api/staging/v1/GRN/GetGRNHead"
        var getCustomerId = $("#ddlcustomer").val();
        var getWarehouseID = $("#ddlwarehouse").val();
        // var getUserId = $("#hdnUserID").val();
        var strOrderId = strCurrentOrder;

        var postData =
        {
            CustomerId: getCustomerId,
            WarehouseId: getWarehouseID,
            //UserId: getUserId,
            UserId: getUserId,
            OrderId: strOrderId,
            OrderType: "GRN"
        };
        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.StatusCode;
            var getStatus = data.Status.toLocaleLowerCase();
            var docRow = '';
            if (getCode == "Success") {
                var getResult = data.Result;
                var getPoHead = getResult.Table;

                var getTaskAssignUserCount = getPoHead[0].TaskAssignUserCount;
                // if(getTaskAssignUserCount==0){
                //     alert('Receiving Order not assign to this User...!');
                //     loadInboundList();
                // }else{
                var grnID = getPoHead[0].GRNID;
                var inReceiptDate = getPoHead[0].GRNDate;
                var getgrnDate = formatCustomDate(inReceiptDate);
                var batchno = getPoHead[0].BatchNO;
                getglobalallowGRNexc = getPoHead[0].AllowGRNexc;
                var getCreatedBy = getPoHead[0].CreatedBy;
                IsPallet = getPoHead[0].IsPallet;
                if (getPoHead[0].CreatedBy == "") {
                    getCreatedBy = getUserName;
                }
                $('#lblgrnby').html(getCreatedBy);
                $('#dtgrndate').val(getgrnDate);
                $('#hdngrnid').val(grnID);
                //getgrnddl(strCurrentOrder);
                viewOrdergrnDetails(strCurrentOrder, "PurchaseOrder", checkassignstatus);
                getgrnddl(strCurrentOrder);
                getGetePassddl(strCurrentOrder);
                //viewOrdergrnDetails(0, "PurchaseOrder");
                //}  
            }
            else {
                alert('Failed to open order!!');
            }
            // After success
        });
    }
    else {
        $('#spnPoOid').html('To be Generated');
        $('#hdnPoOid').val(strCurrentOrder);
        var getCurrentDate = isBlankDate('');

        // $('#lblgrnby').html('');
        $("#lblgrnby").html(getUserName);
        $('#dtgrndate').val('');
        $('#hdngrnid').val('0');
        viewOrdergrnDetails(strCurrentOrder, "PurchaseOrder", checkassignstatus);
    }
}
// function viewgrnOrder(strCurrentOrder) {
//     viewgrnHead(strCurrentOrder);
// }
function viewOrdergrnDetails(strCurrentOrder, ordertype, ChkassignOrder) {
    debugger;
    var apiPath = wmsApiPath + 'GRN/GetGRNDetail';
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();
    // var poidsku =  $('#hdnPoOid').val();

    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseID,
        "UserId": getUserId,
        "OrderId": strCurrentOrder,
        "ordertype": ordertype

    };

    // BIND DATA GRID
    var gridTable = '';

    // GRID HEADER


    gridTable = gridTable + '<div class="wms-srv-grid-header grnheadboxhead" style="white-space:nowrap; text-align:center;">';

    gridTable = gridTable + '<div class="wms-srv-grid-cell">Select</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code <span class="requiredStar">*</span></div>';
    if (IsPallet == 'YES') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Pallet Code<span class="requiredStar">*</span></div>';
    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell">PO Quantity</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Quantity<span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">UOM<span class="requiredStar">*</span></div>';

    var getPrdLottable = mBrillWmsSession.getCustomerLottable();
    var breakCustLot = getPrdLottable.split(',');

    for (var ghl = 0; ghl < breakCustLot.length; ghl++) {
        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + ghl + '" data-lottype="' + breakCustLot[ghl] + '" style="width:82px;text-align:center;display:none;">' + breakCustLot[ghl] + '</div>';
    }
    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Lottable</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
    gridTable = gridTable + '</div>';
    // GRID HEADER
    // GRID ADD NEW
    gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow grnheadboxdetail">';
    gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><input type="checkbox" onclick="selectAllST(this)" id="SellectAll" value=""></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtskucode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getSuggestionList(this,\'' + objgrn + '\');"> <i class="fas fa-search" onclick="skuForGrnSearch(' + poidsku + ')"; title="Search"></i>  <input type="hidden" id="hdnrecstatus" value="0" /></div>';
    if (IsPallet == 'YES') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtpalletcode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getPalletSuggestionList(this);"> <i class="fas fa-search"  onclick="GetPalletMirrior()" title="Search"   ></i></div>';
    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtpoqty" disabled></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtgrnqty" onkeypress="return isNumber(event)"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlUOM" onchange="updateOrderQty();"></select></div>';
    //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="grnLottable"></div></div>';

    // ADD NEW - GRN LOTTABLE PLACE HOLDER
    for (var ghl = 0; ghl < breakCustLot.length; ghl++) {
        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + ghl + '" data-lottype="' + breakCustLot[ghl] + '" style="width:82px;text-align:center;display:none;"></div>';
    }
    // ADD NEW - GRN LOTTABLE PLACE HOLDER

    if (ChkassignOrder == "assign" || ChkassignOrder == "notask") {
        gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="saveGrnDetails(objgrn);"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';

        $("#btnGRNSave").attr("disabled", false);
        //$("#btnGRNSave").fadeIn();
        $("#btnGRNSave").css('opacity', 1.0).fadeIn();
        // btnGRNSave
    }
    else {
        gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="NoAccess();return false;" style="opacity: 0.3;"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
        $("#btnGRNSave").attr("disabled", true);
        // $("#btnGRNSave").fadeTo(1000, 0.5);
    }
    gridTable = gridTable + '</div>'
    // GRID ADD NEW

    $('#tblgrndetail').html(gridTable);
    if (strCurrentOrder != '0' && ordertype == 'GRN') {
        callHttpUrl(apiPath, postData, function (data) {
            var getPOId = $('#lbpoid').text().trim();
            $('#btnPrintGrnBarcodeLabel').attr('data-orderid', getPOId);
            //alert(data);
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                var getPrdLottable = mBrillWmsSession.getCustomerLottable();
                var breakCustLot = getPrdLottable.split(',');
                // var getResult = data.GRNOrderDetails;
                // var myGridList = JSON.parse(getResult);
                var getResult = data.Result;

                var myGridList = getResult.Table;

                // var getGridData = myGridList.InboundResult[0].InboundList;
                var getGridData = myGridList;
                var batchno = getGridData[0].BatchNo;

                for (var i = 0; i < getGridData.length; i++) {
                    var getId = getGridData[i].ID;
                    var getSkuId = getGridData[i].skuID;
                    var getProdId = getGridData[i].Prodid;
                    var getItemCode = getGridData[i].Prod_Code;
                    var getpalletName = getGridData[i].Palletname;

                    var getUOM = getGridData[i].UOM;
                    var getUOMId = getGridData[i].UOMID;
                    var getOrderQty = getGridData[i].POQty;
                    var getGrnQty = getGridData[i].GRNqty;
                    var getLottable = getGridData[i].lottables;
                    var getBatchNo = getGridData[i].BatchNo;
                    var isvalue = getGridData[i].isstatus;
                    var ProdDescptn = getGridData[i].Description;
                    var IsContainSerial = getGridData[i].IsContainSerial;
                    var getstatusid = getGridData[i].Status;
                    var getstatusname = getGridData[i].StatusName;
                    $('#hdnrecstatus').val(getstatusid);

                    productCode.push(getItemCode);
                    batchCode.push(getBatchNo);
                    productDesc.push(ProdDescptn);
                    var splitLottable = [];
                    getLottable.split('|');
                    splitLottable = getLottable.split('|');
                    allLottable.push(splitLottable[0]);
                    grnQty.push(getGrnQty);


                    // GRID ROW
                    gridTable = '';

                    gridTable = gridTable + '<div class="wms-srv-grid-row wmSkuDetailsGrnRow">';

                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" class="chkGrnDetails" value="' + getItemCode + '" data-iscontainserial="' + IsContainSerial + '" data-dtid="' + getId + '" data-prodid = "' + getProdId + '" data-prodcode="' + getItemCode + '" data-palletname="' + getpalletName + '" data-uom="' + getUOM + '" data-poqty="' + getOrderQty + '" data-grnqty="' + getGrnQty + '" data-lottables="' + getLottable + '"></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
                    if (IsPallet == 'YES') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getpalletName + '</div>';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGrnQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';

                    var breakLottable = getLottable.split('|');

                    for (var lt = 0; lt < breakLottable.length; lt++) {
                        if (breakLottable[lt].trim() == '0') {
                            breakLottable[lt] = '';
                        }
                        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + lt + '" data-lottype="' + breakCustLot[lt] + '" style="width: 82px; text-align: center;display:none;">' + filterForAutoSerialNo(breakLottable[lt]) + '</div>';
                        if (breakLottable[lt] != '' && breakLottable[lt] != '0') {
                            $('#tblgrndetail .gridCellLottable[data-lotindex="' + lt + '"]').show();
                        }
                    }
                    //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + filterForAutoSerialNo(getLottable) + '</div>';

                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action" id="removegrnbtndiv" ><button class="wms-srv-input wms-srv-button" type="button" onclick="removeGRNSkuItem(' + getId + ',\'grnremove\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button>';
                    // gridTable = gridTable + '  | '
                    // gridTable = gridTable + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" onclick="printlabel (\'' + getItemCode + '\',\'' + getBatchNo + '\');"><i class="fas fa-barcode"></i></a>'
                    gridTable = gridTable + '</div>'
                    gridTable = gridTable + '</div>'
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                    gridTable = gridTable + '</div>';

                    // GRID ROW
                    if (isvalue == '27') {
                        $("#removegrnbtndiv").hide();
                        $(".divgrnsave").hide();
                    }
                    else {
                        $("#removegrnbtndiv").show();
                        $(".divgrnsave").show();


                    }
                    $('#tblgrndetail').append(gridTable);
                }
                showHideLottableCellForGRNRow();
                opengrntab(strCurrentOrder, ordertype);
                $(".grnheadboxhead").show();

            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
    else {
        opengrntab(strCurrentOrder, ordertype);
    }
}

function showHideLottableCellForGRNRow() {
    var getAddNewRowCount = $('#tblgrndetail .wmsFrmAddRow').length;
    var getViewRowCount = $('#tblgrndetail .wmSkuDetailsGrnRow').length;
    var getTotalLotRowCount = getAddNewRowCount + getViewRowCount;
    $('#tblgrndetail .gridCellLottable').show();
    for (var l = 0; l < 10; l++) {
        // CHECK FOR VIEW ONLY EMPTY CELL
        var getCell = $('#tblgrndetail .wmSkuDetailsGrnRow .gridCellLottable[data-lotindex="' + l + '"]').length;
        var getAddCell = $('#tblgrndetail .wmsFrmAddRow .gridCellLottable[data-lotindex="' + l + '"]').length;
        var totalCell = getCell + getAddCell;

        var getEmptyCell = $('#tblgrndetail .wmSkuDetailsGrnRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;
        var getAddEmptyCell = $('#tblgrndetail .wmsFrmAddRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;
        var totalEmptyCell = getEmptyCell + getAddEmptyCell;

        if (totalCell > 0) {
            if (totalCell != totalEmptyCell) {
                $('#tblgrndetail .gridCellLottable[data-lotindex="' + l + '"]').show();
            } else {
                $('#tblgrndetail .gridCellLottable[data-lotindex="' + l + '"]').hide();
            }
        } else {
            $('#tblgrndetail .gridCellLottable[data-lotindex="' + l + '"]').hide();
        }
    }
}

function filterForAutoSerialNo(lottable) {
    var prodLottable = lottable.replace('AutoSerialNo', '');
    return prodLottable;
}
function NoAccess() {
    alert("Do not have access to perform operation");
}
function viewOrdergrnDetails_BK16082023(strCurrentOrder, ordertype) {
    debugger;
    var apiPath = wmsApiPath + 'GRN/GetGRNDetail';
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();
    // var poidsku =  $('#hdnPoOid').val();

    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseID,
        "UserId": getUserId,
        "OrderId": strCurrentOrder,
        "ordertype": ordertype

    };

    // BIND DATA GRID
    var gridTable = '';

    // GRID HEADER


    gridTable = gridTable + '<div class="wms-srv-grid-header grnheadboxhead" style="white-space:nowrap; text-align:center;">';

    gridTable = gridTable + '<div class="wms-srv-grid-cell">Select</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code <span class="requiredStar">*</span></div>';
    if (IsPallet == 'YES') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Pallet Code<span class="requiredStar">*</span></div>';
    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell">PO Quantity</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Quantity<span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">UOM<span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Lottable</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
    gridTable = gridTable + '</div>';
    // GRID HEADER
    // GRID ADD NEW

    // var grnddlval =  $('#grnddl').val();
    // if(grnddlval=='--Select--'){    //grnddlval!='0' || 

    //     gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow grnheadboxdetail">';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><input type="checkbox" onclick="selectAllST(this)" id="SellectAll" value=""></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtskucode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getSuggestionList(this,\'' + objgrn + '\');"> <i class="fas fa-search" onclick="skuForGrnSearch(' + poidsku + ')"; title="Search"></i></div>';
    //     if(IsPallet == 'YES'){

    //     gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtpalletcode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getPalletSuggestionList(this);"> <i class="fas fa-search"  onclick="GetPalletMirrior()" title="Search"   ></i></div>';
    //     }
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtpoqty" disabled></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtgrnqty" onkeypress="return isNumber(event)"></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlUOM" onchange="updateOrderQty();"></select></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="grnLottable"></div></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="saveGrnDetails(objgrn);"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';

    // }else if(grnddlval=="0"){

    //     gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow grnheadboxdetail">';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><input type="checkbox" onclick="selectAllST(this)" id="SellectAll" value=""></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtskucode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getSuggestionList(this,\'' + objgrn + '\');"> <i class="fas fa-search" onclick="skuForGrnSearch(' + poidsku + ')"; title="Search"></i></div>';
    //     if(IsPallet == 'YES'){
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtpalletcode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getPalletSuggestionList(this);"> <i class="fas fa-search"  onclick="GetPalletMirrior()" title="Search"   ></i></div>';
    //     }
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtpoqty" disabled></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtgrnqty" onkeypress="return isNumber(event)"></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlUOM" onchange="updateOrderQty();"></select></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="grnLottable"></div></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="saveGrnDetails(objgrn);"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';

    // }else{

    //     gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow grnheadboxdetail">';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><input type="checkbox" id="SellectAll" value=""></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtskucode" class="wms-srv-grid-cell-input wms-srv-suggestion" disabled> </div>';
    //     if(IsPallet == 'YES'){
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtpalletcode" class="wms-srv-grid-cell-input wms-srv-suggestion" disabled> <i class="fas fa-search"   title="Search"   ></i></div>';
    //     }
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtpoqty" disabled></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtgrnqty" disabled></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlUOM" ></select></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="grnLottable"></div></div>';
    //     gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" disabled><span>Save</span></button></div>';

    // }
    gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow grnheadboxdetail">';
    gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><input type="checkbox" onclick="selectAllST(this)" id="SellectAll" value=""></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtskucode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getSuggestionList(this,\'' + objgrn + '\');"> <i class="fas fa-search" onclick="skuForGrnSearch(' + poidsku + ')"; title="Search"></i></div>';
    if (IsPallet == 'YES') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtpalletcode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getPalletSuggestionList(this);"> <i class="fas fa-search"  onclick="GetPalletMirrior()" title="Search"   ></i></div>';
    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtpoqty" disabled></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtgrnqty" onkeypress="return isNumber(event)"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlUOM" onchange="updateOrderQty();"></select></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="grnLottable"></div></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="saveGrnDetails(objgrn);"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';

    gridTable = gridTable + '</div>'
    // GRID ADD NEW

    $('#tblgrndetail').html(gridTable);
    if (strCurrentOrder != '0' && ordertype == 'GRN') {

        callHttpUrl(apiPath, postData, function (data) {
            //alert(data);
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                // var getResult = data.GRNOrderDetails;
                // var myGridList = JSON.parse(getResult);
                var getResult = data.Result;

                var myGridList = getResult.Table;

                // var getGridData = myGridList.InboundResult[0].InboundList;
                var getGridData = myGridList;
                var batchno = getGridData[0].BatchNo;

                for (var i = 0; i < getGridData.length; i++) {
                    var getId = getGridData[i].ID;
                    var getSkuId = getGridData[i].skuID;
                    var getItemCode = getGridData[i].Prod_Code;
                    var getpalletName = getGridData[i].Palletname;

                    var getUOM = getGridData[i].UOM;
                    var getUOMId = getGridData[i].UOMID;
                    var getOrderQty = getGridData[i].POQty;
                    var getGrnQty = getGridData[i].GRNqty;
                    var getLottable = getGridData[i].lottables;
                    var getBatchNo = getGridData[i].BatchNo;
                    var isvalue = getGridData[i].isstatus;
                    var ProdDescptn = getGridData[i].Description;

                    productCode.push(getItemCode);
                    batchCode.push(getBatchNo);
                    productDesc.push(ProdDescptn);
                    var splitLottable = [];
                    getLottable.split('|');
                    splitLottable = getLottable.split('|');
                    allLottable.push(splitLottable[0]);
                    grnQty.push(getGrnQty);


                    // GRID ROW
                    gridTable = '';

                    gridTable = gridTable + '<div class="wms-srv-grid-row ">';

                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" value="' + getItemCode + '" ></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
                    if (IsPallet == 'YES') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getpalletName + '</div>';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGrnQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable + '</div>';


                    // if(grnddlval=='--Select--'){ 
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action" id="removegrnbtndiv" ><button class="wms-srv-input wms-srv-button" type="button" onclick="removeGRNSkuItem(' + getId + ',\'grnremove\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button>';
                    // gridTable = gridTable +   '  | ' 





                    // gridTable = gridTable + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" onclick="printlabel (\''+ getItemCode +'\',\''+ getBatchNo+'\');"><i class="fas fa-barcode"></i></a>'






                    // }else if(grnddlval=="0"){
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action" id="removegrnbtndiv" ><button class="wms-srv-input wms-srv-button" type="button" onclick="removeGRNSkuItem(' + getId + ',\'grnremove\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button>';
                    // gridTable = gridTable +   '  | ' 
                    // gridTable = gridTable + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" onclick="printlabel (\''+ getItemCode +'\',\''+ getBatchNo+'\');"><i class="fas fa-barcode"></i></a>'

                    // }else{
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action" id="removegrnbtndiv" ><button class="wms-srv-input wms-srv-button" type="button"  title="Cancel" data-prefix="CN"><span>Cancel</span></button>';
                    // //gridTable = gridTable +   '  | ' 
                    // gridTable = gridTable + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" ></a>'

                    // }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action" id="removegrnbtndiv" ><button class="wms-srv-input wms-srv-button" type="button" onclick="removeGRNSkuItem(' + getId + ',\'grnremove\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button>';
                    gridTable = gridTable + '  | '
                    gridTable = gridTable + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" onclick="printlabel (\'' + getItemCode + '\',\'' + getBatchNo + '\');"><i class="fas fa-barcode"></i></a>'

                    gridTable = gridTable + '</div>'
                    gridTable = gridTable + '</div>'
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                    gridTable = gridTable + '</div>';

                    // GRID ROW
                    if (isvalue == '27') {
                        $("#removegrnbtndiv").hide();
                        $(".divgrnsave").hide();

                    }
                    else {

                        $("#removegrnbtndiv").show();
                        $(".divgrnsave").show();


                    }

                    $('#tblgrndetail').append(gridTable);
                }
                showHideLottableCellForGRNRow();
                //opengrntab(strCurrentOrder, ordertype);
                $(".grnheadboxhead").show();
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
    else {
        opengrntab(strCurrentOrder, ordertype);
    }
}
function GetUomGRNBySKU(strSkuId, strSelectedUomId) {
    debugger;
    var apiPath = apiServerPath + 'GetPOSKUUOM';
    //var getWarehouseID = $("#ddlwarehouse").val();
    // var getCustomerId = $("#ddlcustomer").val();
    // var getCompanyID = $('#hdnCompanyID').val();
    // var getUserId = $("#hdnUserID").val();

    var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "SkuId": strSkuId
    };

    $('#ddlUOM').html('<option value="0" data-unitqty="0">-- Select --</option>');

    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            var getResult = data.Result;

            var getUomData = getResult.Table;
            for (var i = 0; i < getUomData.length; i++) {
                var getUom = getUomData[i].Uom;
                var getUomId = getUomData[i].Id;
                var getUnitQty = getUomData[i].UnitQty;
                var isSelected = '';
                if (strSelectedUomId == getUomId) {
                    isSelected = 'selected="selected"';
                }
                var htmlOption = '<option value="' + getUomId + '" data-unitqty="' + getUnitQty + '" ' + isSelected + '>' + getUom + '</option>';
                $('#ddlUOM').append(htmlOption);
            }
        }
    });
}
function saveGrnDetails(Obj) {
    debugger;
    if (validategrnData(Obj) == true) {
        var apiPath = wmsApiPath + 'GRN/SaveGRNSKUDetail';
        // var apiPath =  'http://localhost:50068/api/staging/v1/GRN/SaveGRNSKUDetail';

        //var getWarehouseID = $("#ddlwarehouse").val();
        //var getCustomerId = $("#ddlcustomer").val();
        //var getCompanyID = $('#hdnCompanyID').val();
        //var getUserId = $("#hdnUserID").val();
        var poID = $("#hdnPoOid").val();
        var grnID = $('#hdngrnid').val();
        if (grnID == 0) {
            checkSaveBClose = "NotSaved";
        }
        var getpalletId = "";
        var getdirectorder = 0;
        if (Obj == 'GRN') {
            var grndate = $("#dtgrndate").val();

            var getSkuId = $("#txtskucode").attr('data-id');


            if ($(".isdirectOrder").prop("checked") == true) {
                getdirectorder = 1;
            }

            if (IsPallet == 'NO') {
                getpalletId = "0";
            }
            else {
                if (getPageObject == 'SalesReturn') {
                    getpalletId = $("#txtpalletcode").attr('data-id');
                }
                else {
                    getpalletId = $("#txtpalletcode").attr('data-id');
                }
            }

            var getUOM = $("#ddlUOM option:selected").text();
            var getUOMId = $("#ddlUOM").val();
            var getRequestedQty = $("#txtpoqty").val();
            var getOrderQty = $("#txtgrnqty").val();
            var getGetPassId = $("#grngetPass").val();
            var getPODTID = $('#hdnPODTID').val();
            var getLot = '';

            // COMMENTED AS ON 14 MARCH 2024
            // var getAllLottables = $('#grnLottable input');
            // $(getAllLottables).each(function () {
            //     var getLotId = $(this).attr('data-id');
            //     var getLotType = $(this).attr('data-description');
            //     var getLotVal = $(this).val();
            //     if (getLotVal.trim() != '') {
            //         if (getLot == '') {
            //             getLot += getLotId + ':' + getLotVal;
            //         } else {
            //             getLot += '|' + getLotId + ':' + getLotVal;
            //         }
            //     }
            // });
            // COMMENTED AS ON 14 MARCH 2024

            // NEW LOTTABLE CODE AS ON 14 MARCH 2024
            var getAllLottables = $('#tblgrndetail .wmsFrmAddRow .gridCellLottable');
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
            // NEW LOTTABLE CODE AS ON 14 MARCH 2024

        }
        else if (Obj = 'ScanGRN') {
            var grndate = 0;
            var batchno = 0;

            var getUOMId = 0;

            var getSkuId = $("#hdngrnskuscnID").val();
            var getpalletId = $("#hdngrnpltscnID").val();
            var getRequestedQty = $("#lblposcnqty").html();
            var getOrderQty = $("#txtgrnscanqty").val();
            var getLot = '';
            // COMMENTED AS ON 14 MARCH 2024
            // var getAllLottables = $('#lblgrnscnlottable input');

            // $(getAllLottables).each(function () {
            //     var getLotId = $(this).attr('data-id');
            //     var getLotType = $(this).attr('data-description');
            //     var getLotVal = $(this).val();
            //     if (getLotVal.trim() != '') {
            //         if (getLot == '') {
            //             getLot += getLotId + ':' + getLotVal;
            //         }
            //         else {
            //             getLot += '|' + getLotId + ':' + getLotVal;
            //         }
            //     }
            // });
            // COMMENTED AS ON 14 MARCH 2024

            // NEW LOTTABLE CODE AS ON 14 MARCH 2024
            var getAllLottables = $('#tblgrndetail .wmsFrmAddRow .gridCellLottable');
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
            // NEW LOTTABLE CODE AS ON 14 MARCH 2024
        }
        var extrarec = "yes";
        if (getglobalallowGRNexc == "YES") {
            if (Number(getRequestedQty) < Math.round(Number(getOrderQty))) {
                alert("don't not accept extra quantity!!")
                extrarec = "no";
            }
            else {
                extrarec = "yes";
            }
        }
        else {

            if (Number(getRequestedQty) < Math.round(Number(getOrderQty))) {
                if (confirm("Do you want to receive extra quantity..?")) {
                    extrarec = "yes";
                }
                else {
                    extrarec = "no";
                }
            }
            else {
                extrarec = "yes";
            }
        }
        if (extrarec == "yes") {
            var postData =
            {

                "CustomerId": getCustomerIdInward,
                "WarehouseId": getWarehouseIdInward,
                "companyID": getCompanyIdInward,
                "UserId": getUserIdInward,
                "poID": poID,
                "obj": getPageObject,
                "grnID": grnID,
                "grnDate": grndate,
                "batchno": batchno,
                "prodID": isBlankString(getSkuId),
                "palletID": isBlankString(getpalletId),
                "RequestedQty": isBlankNumber(getRequestedQty),
                "GRNQty": isBlankNumber(getOrderQty),
                "UOMId": getUOMId,
                "Lottables": isBlankString(getLot),
                "type": Obj,
                "directpickup": getdirectorder,
                "GetPassId": getGetPassId,
                "PODTId": getPODTID

            };

            callHttpUrl(apiPath, postData, function (result) {

                // After success
                var getCode = result.StatusCode;
                // var getStatus = result.Status.toLocaleLowerCase();

                var getStatus = result.Status.toLocaleLowerCase();
                var grnID = result.Result.Message;


                if (getCode == "Success") {

                    if (grnID == 'duplicate') {
                        alert('Already GRN done for this SKU.');

                    }
                    else if (grnID == 'duplicateLott') {
                        alert('Please add Unique Lottable.');
                    }
                    // else if (grnID == 'Please select Pallet code!!') {
                    //     alert('Please select Pallet code!!');
                    // }
                    else if (grnID != '0') {
                        $("#grnddl").append('<option value = "' + grnID + '">' + grnID + '</option>');
                        $("#grnddl").val(grnID);
                        $('#hdngrnid').val(grnID);

                        $("#grnddl option").each(function () {
                            $(this).siblings('[value="' + this.value + '"]').remove();
                        });

                        chksavegrnid = grnID;

                        if (Obj != 'GRN') {
                            UpdateGrnStatus(Obj);
                            cleargrnscan();

                        }
                        viewOrdergrnDetails(grnID, "GRN", checkassignstatus);
                    }

                    //  viewgrnOrder(poID);
                }
                else if (grnID == 'Lotfaild') {
                    alert('Please enter lottable value');
                }
                else {
                    alert('Failed to save document');
                }
                // After success
            });
        }
    }
}
function cleargrnscan() {
    $('#txtgrnscanvalue').val('');
    $('#hdngrnskuscnID').val('');
    $('#lblgrnscnskucode').html('');
    $('#lblgrnscnqty').html('');
    $('#lblposcnqty').html('');
    $('#lblgrnscnpallet').html('');
    $('#hdngrnpltscnID').val('');
    $('#txtgrnscanvalue').val('');
    $('#txtgrnscanqty').val('');
    $('#lblgrnscnlottable').html('');




}
function addnewgrn() {
    debugger;
    $('#dtgrndate').val('');
    $('#wms-srv-order-popup').hide();
    var pid = $('#hdnPoOid').val();
    getgrnddl(pid);
    viewOrdergrnDetails(pid, "PurchaseOrder", checkassignstatus);
}
function viewGenerateLabelPopup() {
    // Hide main popup...
    $('#wms-srv-labelgenerate-popup').show();
    $('#wms-srv-labelgenerate-popup-close').off();
    $('#wms-srv-labelgenerate-popup-close').click(function () {
        $('#wms-srv-labelgenerate-popup').hide();
    });
}
function viewgatepass() {

    //$("#wms-srv-transport-popup").show();
    var poID = $("#hdnPoOid").val();

    openTransport(poID, false);
    //$('#btnSactionSaveGrnTransport').css("display", "none");
}
function UpdateGrnStatus(obj) {
    debugger;
    if ($('#hdnrecstatus').val() == 30) {
        alert('This order is already putin!!');
    } else {
        var grnID = $("#hdngrnid").val();
        if (grnID == '0') {
            alert('Please fill out Mandatory Fields.');
        }
        else {
            var apiPath = wmsApiPath + 'GRN/UpdateGrnStatus';
            var poID = $("#hdnPoOid").val();
            var postData =
            {
                "poID": poID,
                "grnId": grnID

            };

            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.StatusCode;
                var orderstatus = result.Result.Message;
                if (getCode == 'Success') {
                    if (orderstatus == 'Completed') {
                        alert('Record Saved successfully!!');
                        $('#wms-srv-grndetails-popup').hide();
                        checkSaveBClose = "Saved";
                        chksavegrnid = '0';
                        loadInboundList();
                    }
                    else if (orderstatus == 'Partial') {
                        if (obj == 'ScanGRN') {
                            $(".grnheadboxdetail").hide();
                        }
                        else {
                            alert('Record Saved successfully!!');
                            $('#wms-srv-grndetails-popup').hide();
                            checkSaveBClose = "Saved";
                            chksavegrnid = '0';
                            loadInboundList();
                        }
                    }

                }

            });


        }
    }
}
function validategrnData(obj) {
    if (obj == 'GRN') {

        var getLot = '';
        var getLotVal = '';
        var chklotVal = '';
        var lotablename = '';
        // var getAllLottables = $('#grnLottable input');
        // if (getAllLottables.length > 0) {
        //     $(getAllLottables).each(function () {
        //         var getLotId = $(this).attr('data-id');
        //         var getLotType = $(this).attr('data-description');
        //         getLotVal = $(this).val();
        //         //alert(getLotId);
        //         //alert(getLotType)
        //         if ((getLotVal == '0' || getLotVal == "") && getAllLottables.length > 0) {
        //             chklotVal = 'found';
        //             lotablename = getLotType;
        //         }

        //     });

        // }

        var getAllLottables = $('#tblgrndetail .wmsFrmAddRow .gridCellLottable');
        if (getAllLottables.length > 0) {
            $(getAllLottables).each(function () {
                var getLotInput = $(this).find('input');
                if (getLotInput.length > 0) {
                    var getLotId = $(getLotInput).attr('data-id');
                    var getLotType = $(getLotInput).attr('data-description');
                    var getLotVal = $(getLotInput).val();
                    if ((getLotVal == '0' || getLotVal == "") && getAllLottables.length > 0) {
                        chklotVal = 'found';
                        lotablename = getLotType;
                    }
                }
            });

        }




        if ($('#dtgrndate').val() == '') {
            alert('Please enter GRN Date!!')
            return false;
        }

        else if ($('#txtskucode').val() == '') {
            alert('Please enter SKU Code!!')
            return false;
        }
        else if ($('#txtpalletcode').val() == '') {
            alert('Please enter Pallet Code!!')
            return false;
        }

        else if ($('#ddlUOM').val() == 0) {
            alert('Please select UOM!!');
            return false;
        }
        else if ($('#txtgrnqty').val() == '') {
            alert('Please enter GRN Quantity!!');
            return false;


        }
        else if ($('#txtgrnqty').val() == 0) {
            alert('Zero GRN Quantity not allowed!!');
            return false;
        }
        // else if ($('#txtgrnqty').val() <= $('#txtpoqty').val()) 
        // {
        //     if(confirm('Zero GRN Quantity not allowed!!')==true)
        //     {
        //         return true;
        //     }
        //     else
        //     {
        //         return false;
        //     }


        // }

        else if (chklotVal == 'found') {
            alert('Please enter Lottable values!!');
            return false;
        }
        else if (IsPallet == 'YES') {
            if ($("#txtpalletcode").attr('data-id') == 0 || $("#txtpalletcode").attr('data-id') == null || $("#txtpalletcode").attr('data-id') == undefined) {
                alert('Please select Pallet Id!!');
                return false;
            }
        }
        return true;
    }
    else if ('ScanGRN') {
        var grnscnqty = $('#lblgrnscnqty').html();
        var grnscntotalqty = $('#lblposcnqty').html();

        if ($('#txtgrnscanqty').val() == '') {
            alert('Please enter GRN scan quantity!!');
            return false;
        }
        else if ($('#lblgrnscnskucode').html() == '') {
            alert('Please enter GRN scan SKU!!');
            return false;
        }
        else if ($('#lblgrnscnpallet').html() == '') {
            alert('Please enter GRN scan Pallet!!');
            return false;
        }
        if (grnscnqty == grnscntotalqty) {
            alert('GRN scan quantity already done!!');
            return false;
        }
        else if (IsPallet == 'YES') {
            if ($("#hdngrnpltscnID").val() == 0 || $("#hdngrnpltscnID").val() == null || $("#hdngrnpltscnID").val() == undefined) {
                alert('Please select Pallet Id!!');
                return false;
            }
        }
        return true;
    }

}

function removeGRNSkuItem(recordID, obj) {
    debugger;
    /*if(obj=='NotSaved')
    {
                        var apiPath = wmsApiPath + 'GRN/RemoveSKU';
                        var grnID = $("#hdngrnid").val();
                        if (grnID != '0') 
                        {                            
                            var postData = 
                            {
                                "gID":grnID,
                                "recordID": recordID,
                                "obj":obj
                            };
                                callHttpUrl(apiPath, postData, function (result) 
                                {
                                // After success
                                var getCode = result.StatusCode;
                                var getStatus = result.Status.toLocaleLowerCase();
                                //var getDescription = result.Description;
                                 var docRow = '';
                                    if (getCode == "Success") 
                                    {
                                        viewOrdergrnDetails(grnID, "GRN");
                                    }
                                    else 
                                    {
                                    alert('Failed to remove item!!');
                                }
                            });
                        }

    }
    else
    {*/
    if (confirm('Are you sure you want to remove SKU Item?')) {

        var apiPath = wmsApiPath + 'GRN/RemoveSKU';
        var grnID = $("#hdngrnid").val();
        if (checkSaveBClose == "NotSaved") {
            if (chksavegrnid != '0' && chksavegrnid == grnID) {
                obj = "GRNSKURecRemove";
            }
        }
        if (grnID != '0') {

            var postData =
            {
                "gID": grnID,
                "recordID": recordID,
                "obj": obj
            };
            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.StatusCode;
                var getStatus = result.Status.toLocaleLowerCase();
                var getdata = result.Result.Message;
                //var getDescription = result.Description;
                var docRow = '';
                if (getdata == "success") {
                    viewOrdergrnDetails(grnID, "GRN", checkassignstatus);
                }
                else if (getdata == "notallowed") {
                    alert('GRN Completed can not allowed to delete');
                }
                else {
                    alert('Failed to remove item!!');
                }
            });
        }
    }
    // }

}

function Closegrnbtn() {
    debugger;
    if (checkSaveBClose == "NotSaved") {
        if (confirm("If You Close Window without Save Will remove added Record from GRN Details.Do you want to close?")) {

            var apiPath = wmsApiPath + 'GRN/RemoveSKU';
            //var apiPath = "http://localhost:50068/api/staging/v1/GRN/RemoveSKU";
            //  var grnID = $("#hdngrnid").val();
            var grnID = chksavegrnid;
            var recordID1 = 0;
            if (grnID != '0') {
                var postData =
                {
                    "gID": grnID,
                    "recordID": recordID1,
                    "obj": checkSaveBClose
                };
                callHttpUrl(apiPath, postData, function (result) {
                    // After success
                    var getCode = result.StatusCode;
                    var getStatus = result.Status.toLocaleLowerCase();
                    //var getDescription = result.Description;
                    var docRow = '';
                    if (getCode == "Success") {
                        /* $('#wms-srv-grndetails-popup-close').off();
                            $('#wms-srv-grndetails-popup-close').click(function ()
                            {
                                
                            });*/
                        $('#wms-srv-grndetails-popup .wms-srv-datepicker').datepicker('destroy');
                        $('#wms-srv-grndetails-popup').hide();
                        checkSaveBClose == "";
                        // viewOrdergrnDetails(grnID, "GRN");
                    }
                    else {
                        alert('Failed to remove item!!');
                    }
                });
            }
            else {
                debugger;
                $('#wms-srv-grndetails-popup .wms-srv-datepicker').datepicker('destroy');
                $('#wms-srv-grndetails-popup').hide();
                checkSaveBClose = '';

            }
        }
        else {
            if (checkSaveBClose == 'NotSaved') {
                checkSaveBClose = "NotSaved";
            }
            else { checkSaveBClose = ''; }
        }
    }
    else {
        debugger;
        $('#wms-srv-grndetails-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-grndetails-popup').hide();
        checkSaveBClose == "";
    }
}



///////////////////////////////////////////#endregion///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////#GRN GATE PASS & Transport///////////////////////////////////////////////////////////////////////////////

var globalpoID = '0';
var getPoHead = {

};
var gtpInReceiptDate = '';
var gtpInboundReceiptDate = '';
var gtpExpDelivery = '';
var gtpExpDeliveryDate = '';
var gtpVendorName = '';
var gtpVendorId = '';

function setDefaultGatePassValues() {
    var getCurrentGatePassId = $('#wms-srv-transport-popup #txtgetPassId').val();
    if (getCurrentGatePassId == '' || getCurrentGatePassId == '0') {
        $('#wms-srv-transport-popup #txtShippingDate').val(gtpInboundReceiptDate);
        $('#wms-srv-transport-popup #txtExpDeliveryDate').val(gtpExpDeliveryDate);
        $('#wms-srv-transport-popup #txtTransporterName').val(gtpVendorId);
    }
}
function openTransport(strOrderId, isOpenedForGrn) {
    $('#btnPrintTransportBarcodeLabel').attr('data-orderid', strOrderId);
    //  bindGetPassIdList(strOrderId, isOpenedForGrn);
    createObjectHead('pnlTransportHead', strOrderId, function (headData) {
        debugger;
        getPoHead = headData.Result.Table;
        gtpInReceiptDate = getPoHead[0].InboundReceiptDate;
        gtpInboundReceiptDate = formatCustomDate(gtpInReceiptDate);
        gtpExpDelivery = getPoHead[0].ExpDeliveryDate;
        gtpExpDeliveryDate = formatCustomDate(gtpExpDelivery);
        gtpVendorName = getPoHead[0].Vendor;
        gtpVendorId = getPoHead[0].VendorId;
        // onchange="bindGetPassData('+ isOpenedForGrn +');" 
        $('#pnlTransportHead .wms-srv-grid-header').prepend('<div class="wms-srv-grid-cell">Get Pass ID</div>');
        $('#pnlTransportHead .wms-srv-grid-row').prepend('<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input notranslate" id="txtgetPassId">' +
            '<option selected value="0">-- To Be Generated --</option>' +
            '</select></div>');
        $('#wms-srv-transport-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
        globalpoID = strOrderId;

        getDropDownList(strOrderId, 0);
        if (isOpenedForGrn == true) {
            $('#btnSaveGrnTransport span').html('Next');
            $('#btnSaveGrnTransport').attr('data-isopenedforgrn', "true");
            $('#pnlTransportHead #txtgetPassId').attr('data-isopenedforgrn', "true");
        }
        else {
            $('#btnSaveGrnTransport span').html('Save');
            $('#btnSaveGrnTransport').attr('data-isopenedforgrn', "false");
            $('#pnlTransportHead #txtgetPassId').attr('data-isopenedforgrn', "false");
        }

        $('#wms-srv-transport-popup').show();
        $('#wms-srv-transport-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });

        $('#wms-srv-transport-popup-close').click(function () {
            debugger;
            clearGetPassPoup();
            $('#wms-srv-transport-popup').hide();
            $('#wms-srv-transport-popup-close').off();
            // $('#wms-srv-transport-popup .wms-srv-datepicker').datepicker('destroy');

        });
    });
}

function saveTransportMaster() {
    debugger;

    var chkIfOpendForGrn = $('#btnSaveGrnTransport').attr('data-isopenedforgrn');
    var gpassID = $("#txtgetPassId").val();

    if (gpassID == '') {
        gpassID = 0
    }
    if (checkGetPassFeilds() == true) {
        if (getInwardOrdersIDList == '') {
            getPoOrderId = globalpoID;
        }
        else {
            getPoOrderId = getInwardOrdersIDList
        }

        var apiPath = wmsApiPath + 'GRN/SaveGatePass';
        //var apiPath = "http://localhost:50068/api/staging/v1/GRN/SaveGatePass";

        var strOrderId = $('#btnSaveGrnTransport').attr('data-id');
        var getGrnId = $('#txtgetPassId').val();
        var getCustomerId = $("#ddlcustomer").val();
        var getWarehouseID = $("#ddlwarehouse").val();
        var getUserId = $("#hdnUserID").val();
        var OrderId = strOrderId;
        var getAirwayBill = $('#txtAirwayBill').val();
        var getShippingType = $('#txtShippingType').val();
        var getShippingDate = $('#txtShippingDate').val();
        //var getExpDeliveryDate = issavelot = 'Lot'? '-': $('#txtExpDeliveryDate').val();
        var getExpDeliveryDate = $('#txtExpDeliveryDate').val();
        if (getExpDeliveryDate.trim() == '') {
            if (issavelot == 'Lot') {
                getExpDeliveryDate = '';
            }
        }

        var getTransporterName = $('#txtTransporterName').val();
        if (getTransporterName.trim() == '') {
            getTransporterName = '-';
        }

        var getTruckNo = $('#txtTruckNo').val();
        if (getTruckNo.trim() == '') {
            getTruckNo = '-';
        }

        var getLRNo = $('#txtLrNo').val();
        if (getLRNo.trim() == '') {
            getLRNo = '-';
        }
        //var getTransporterName = issavelot = 'Lot'? '-':$('#txtTransporterName option:selected').html();
        var getTransporterNameId = issavelot = 'Lot' ? '0' : $('#txtTransporterName option:selected').val();
        var getTransporterRemark = $('#txtTransporterRemark').val();
        var getDockNo = $('#txtDockNo option:selected').html();
        var getDockId = $('#txtDockNo option:selected').val();
        //var getTruckNo = issavelot = 'Lot'? '-': $('#txtTruckNo').val();
        // var getLRNo = issavelot = 'Lot'? '-': $('#txtLrNo').val();
        var getInTime = $('#txtInTime').val();
        var getOutTime = $('#txtOutTime').val();
        var getContainerID = $('#txtContainerId').val();
        var getTrailer = $('#txtTrailer').val();
        var getSeal = $('#txtSeal').val();
        var getCarrier = $('#txtCarrier').val();

        var postData = {
            GetPassID: gpassID,
            CustomerId: getCustomerId,
            WarehouseId: getWarehouseID,
            UserId: getUserId,
            OrderId: getPoOrderId,
            Object: ObjectGrn,
            AirwayBill: getAirwayBill,
            ShippingType: getShippingType,
            ShippingDate: getShippingDate,
            ExpDeliveryDate: getExpDeliveryDate,
            TransporterName: getTransporterName,
            TransporterNameId: getTransporterNameId,
            TransporterRemark: getTransporterRemark,
            DockNo: getDockNo,
            DockId: getDockId,
            TruckNo: getTruckNo,
            LRNo: getLRNo,
            InTime: getInTime,
            OutTime: getOutTime,
            ContainerID: getContainerID,
            Trailer: getTrailer,
            Seal: getSeal,
            Carrier: getCarrier
        }
        callHttpUrl(apiPath, postData, function (result) {
            // After success
            var getCode = result.Status;
            var getMessage = result.Message;
            var isSuccess = result.StatusCode;
            if (isSuccess == 'Success') {
                var getResponse = result.Result.Message;
                if (getResponse == "found" || getResponse == "success") {
                    //viewgrnOrder(strOrderId);
                    alert("Saved Sucessfully");
                    $("#wms-srv-transport-popup").hide();
                    clearGetPassPoup();
                    viewgrnOrder(getPoOrderId);
                }
                else {
                    //openTransport(strOrderId);
                    alert("Saved Sucessfully");
                    $("#wms-srv-transport-popup").hide();
                    clearGetPassPoup();
                }
                //openTransport(strOrderId);
            }
            else if (isSuccess == "Validate") {
                alert('Please fill all Mandatory details!!')
            }
            else {
                alert('Failed to save transport details!!');
            }
            // After success
        }, function () {
            // On Fail...
            if (chkIfOpendForGrn == "true") {
                viewRecevingDetails(strOrderId);
            } else {
                openTransport(strOrderId);
            }
        });
    }
}

function saveTransport(issavelot, callBackTransport) {
    debugger;

    var chkIfOpendForGrn = $('#btnSaveGrnTransport').attr('data-isopenedforgrn');
    var gpassID = $("#txtgetPassId").val();

    if (gpassID == '') {
        gpassID = 0
        if (checkGetPassFeilds(issavelot) == true) {
            if (getInwardOrdersIDList == '') {
                getPoOrderId = globalpoID;
            }
            else {
                getPoOrderId = getInwardOrdersIDList
            }

            var apiPath = wmsApiPath + 'GRN/SaveGatePass';
            //var apiPath = "http://localhost:50068/api/staging/v1/GRN/SaveGatePass";

            var strOrderId = $('#btnSaveGrnTransport').attr('data-id');
            var getGrnId = $('#txtgetPassId').val();
            var getCustomerId = $("#ddlcustomer").val();
            var getWarehouseID = $("#ddlwarehouse").val();
            var getUserId = $("#hdnUserID").val();
            var OrderId = strOrderId;
            var getAirwayBill = $('#txtAirwayBill').val();
            var getShippingType = $('#txtShippingType').val();
            var getShippingDate = issavelot = 'Lot' ? '-' : $('#txtShippingDate').val();
            var getExpDeliveryDate = issavelot = 'Lot' ? '-' : $('#txtExpDeliveryDate').val();
            var getTransporterName = issavelot = 'Lot' ? '-' : $('#txtTransporterName option:selected').html();
            var getTransporterNameId = issavelot = 'Lot' ? '0' : $('#txtTransporterName option:selected').val();
            var getTransporterRemark = $('#txtTransporterRemark').val();
            var getDockNo = $('#txtDockNo option:selected').html();
            var getDockId = $('#txtDockNo option:selected').val();
            var getTruckNo = issavelot = 'Lot' ? '-' : $('#txtTruckNo').val();
            var getLRNo = issavelot = 'Lot' ? '-' : $('#txtLrNo').val();
            var getInTime = $('#txtInTime').val();
            var getOutTime = $('#txtOutTime').val();
            var getContainerID = $('#txtContainerId').val();
            var getTrailer = $('#txtTrailer').val();
            var getSeal = $('#txtSeal').val();
            var getCarrier = $('#txtCarrier').val();

            var postData = {
                GetPassID: gpassID,
                CustomerId: getCustomerId,
                WarehouseId: getWarehouseID,
                UserId: getUserId,
                OrderId: getPoOrderId,
                Object: ObjectGrn,
                AirwayBill: getAirwayBill,
                ShippingType: getShippingType,
                ShippingDate: getShippingDate,
                ExpDeliveryDate: getExpDeliveryDate,
                TransporterName: getTransporterName,
                TransporterNameId: getTransporterNameId,
                TransporterRemark: getTransporterRemark,
                DockNo: getDockNo,
                DockId: getDockId,
                TruckNo: getTruckNo,
                LRNo: getLRNo,
                InTime: getInTime,
                OutTime: getOutTime,
                ContainerID: getContainerID,
                Trailer: getTrailer,
                Seal: getSeal,
                Carrier: getCarrier
            }
            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.Status;
                var getMessage = result.Result.Message;

                var isSuccess = result.StatusCode;
                if (issavelot == '') {
                    if (isSuccess == 'Success') {
                        var getResponse = result.Result.Message;

                        if (getResponse == "found" || getResponse == "success") {
                            //viewgrnOrder(strOrderId);
                            alert("Saved Sucessfully");
                            $("#wms-srv-transport-popup").hide();
                            clearGetPassPoup();
                            viewgrnOrder(getPoOrderId);
                        }
                        else {
                            //openTransport(strOrderId);
                            alert("Saved Sucessfully");
                            $("#wms-srv-transport-popup").hide();
                            clearGetPassPoup();
                        }

                        //openTransport(strOrderId);
                    }
                    else if (isSuccess == "Validate") {
                        alert('Please fill all Mandatory details!!')
                    }
                    else {
                        alert('Failed to save transport details!!');
                    }
                }
                else {
                    /*
                    bindGetPassIdList(strOrderId, isOpenedForGrn);
                    const myArrayval = getMessage.split("|");
                    //$('#txtgetPassId').val(myArrayval[1]);
                     openTransport(myArrayval[1]);
                    */

                    // getGatePassIdListForLot(strOrderId, callBackTransport);
                    getGatePassIdListForLot(getPoOrderId, callBackTransport);

                    //  if(callBackTransport != null){
                    //     callBackTransport();
                    //     openTransport(globalpoID);
                    //  }
                }
                // After success
            }, function () {
                // On Fail...
                if (chkIfOpendForGrn == "true") {
                    viewRecevingDetails(strOrderId);
                } else {
                    openTransport(strOrderId);
                }
            });
        }
    } else {
        if (callBackTransport != null) {
            var mGetPassID = $('#txtgetPassId').val();
            callBackTransport(mGetPassID, mGetPassID);

            // Commented as function is moved to other... 
            //openTransport(globalpoID);
        }
    }

}

function getGatePassIdListForLot(getOrderId, callBackTransport) {
    debugger
    var apiPath = wmsApiPath + 'GRN/getPassIdListByID';
    var postData = {
        CustomerId: getCustomerIdInward,
        WarehouseId: getWarehouseIdInward,
        UserId: getUserIdInward,
        OrderId: getOrderId
    };
    callHttpUrl(apiPath, postData, function (data) {
        // After success
        var getCode = data.StatusCode;
        var getStatus = data.Status;
        if (getCode == 'Success') {
            var ddList = '';
            var getData = data.Result.Table;
            var getGetPassId = getData[getData.length - 1].Id;

            if (callBackTransport != null) {
                callBackTransport(getGetPassId, getGetPassId);
                openTransport(globalpoID);
            }
        }
    });
}

function bindGetPassIdList(getOrderId, isOpenedForGrn) {
    debugger
    //alert('Binding GatePass Id list !!');
    var apiPath = wmsApiPath + 'GRN/getPassIdListByID';
    //var apiPath = "http://localhost:50068/api/staging/v1/GRN/getPassIdListByID";
    var postData = {
        CustomerId: getCustomerIdInward,
        WarehouseId: getWarehouseIdInward,
        UserId: getUserIdInward,
        OrderId: getOrderId
    };
    callHttpUrl(apiPath, postData, function (data) {
        // After success
        var getCode = data.StatusCode;
        var getStatus = data.Status;
        if (getCode == 'Success') {
            $("#txtgetPassId").html('');
            var ddList = '';
            var getData = data.Result.Table;

            ddList = ddList + '<option value="">-- To be Generate --</option>'

            for (var i = 0; i < getData.length; i++) {
                var getGetPassId = getData[i].Id;
                ddList = ddList + '<option value=' + getGetPassId + '>' + getGetPassId + '</option>';
            }
            $("#txtgetPassId").append(ddList);

            // Set first GatePass no as default... 
            if (getData.length > 0) {
                var getFirstDefaultVal = $("#txtgetPassId option").eq(1).val();
                $("#txtgetPassId").val(getFirstDefaultVal);
                $('#pnlTransportHead #txtgetPassId').off();
                $('#pnlTransportHead #txtgetPassId').change(function () {
                    var isOpenedForGrn = $('#pnlTransportHead #txtgetPassId');
                    //bindGetPassData(isOpenedForGrn);
                });
                TransportDisp(getFirstDefaultVal, isOpenedForGrn);
            } else {
                // Commented as on 24 May 2024
                // viewOrderGatePassDetails(getOrderId);

                // New code as on 24 May 2024
                var getpid = $("#txtgetPassId").val();
                saveTransport('Lot', function (getpid, getOrderId) {
                    openTransport(globalpoID);
                });
            }
            // Call View Gate Pass Details after data binding...
            // 19 December 2023
            //viewOrderGatePassDetails(getOrderId);
        }
    });
}

function bindGetPassData(isOpenedForGrn) {
    debugger
    var getGetPassId = $("#txtgetPassId").val();
    //$('#btnSactionSaveGrnTransport').css("display", "none");
    if (getGetPassId != '-- To be Generate --') {
        getPassID = getGetPassId;
        TransportDisp(getGetPassId, isOpenedForGrn);
        //$('#btnSactionSaveGrnTransport').css("display", "none");
    }
    else {
        $('#txtAirwayBill').val('');
        $('#txtShippingType').val('');
        $('#txtShippingDate').val('');
        $('#txtExpDeliveryDate').val('');
        $('#txtTransporterRemark').val('');
        $('#txtTruckNo').val('');
        $('#txtLrNo').val('');
        $('#txtInTime').val('');
        $('#txtOutTime').val('');
        $('#txtContainerId').val('');
        $('#txtTrailer').val('');
        $('#txtSeal').val('');
        $('#txtCarrier').val('');
        // $('#btnSactionSaveGrnTransport').css("display", "block");

    }
    //saveTransport(getGetPassId);

}


function TransportDisp(strOrderId, isOpenedForGrn) {
    debugger


    var apiPath = wmsApiPath + 'GRN/GetGRNTransportDetail';
    //var apiPath = "http://localhost:50068/api/staging/v1/GRN/GetGRNTransportDetail";  
    //globalpoID = strOrderId;
    var postData =
    {
        CustomerId: getCustomerIdInward,
        WarehouseId: getWarehouseIdInward,
        UserId: getUserIdInward,
        OrderId: strOrderId,
        Object: ObjectGrn
    };
    callHttpUrl(apiPath, postData, function (result) {
        // After success
        var getCode = result.StatusCode;
        var getStatus = result.Status;
        var docRow = '';
        if (getCode == 'Success') {
            $("#popupDocumentList").html('');
            var getTransporterNameId = '0';
            try {
                var getResponse = result.Result;

                var getGrnTransportDetails = getResponse.Table[0];
                var getAirwayBill = getGrnTransportDetails.AirwayBill;
                var getShippingType = getGrnTransportDetails.ShippingType;
                var getShippingDate = getGrnTransportDetails.ShippingDate;
                var getExpDeliveryDate = getGrnTransportDetails.ExpDeliveryDate;
                var getTransporterName = getGrnTransportDetails.TransporterName;
                getTransporterNameId = getGrnTransportDetails.TransporterNameId;
                var getTransporterRemark = getGrnTransportDetails.TransporterRemark;
                var getDockNo = getGrnTransportDetails.DockNo;
                var getDockId = getGrnTransportDetails.DockId;
                var getTruckNo = getGrnTransportDetails.TruckNo;
                var getLRNo = getGrnTransportDetails.LRNo;
                var getInTime = getGrnTransportDetails.InTime;
                var getOutTime = getGrnTransportDetails.OutTime;
                var getContainerID = getGrnTransportDetails.ContainerID;
                var getTrailer = getGrnTransportDetails.Trailer;
                var getSeal = getGrnTransportDetails.Seal;
                var getCarrier = getGrnTransportDetails.Carrier;
                var POID = getGrnTransportDetails.POID

                $('#txtAirwayBill').val(getAirwayBill);
                $('#txtShippingType').val(getShippingType);
                $('#txtShippingDate').val(formatCustomDate(getShippingDate));
                $('#txtExpDeliveryDate').val(formatCustomDate(getExpDeliveryDate));
                //   $('#txtTransporterName').val(getTransporterName);
                //    $('#txtTransporterName').val(getTransporterNameId);
                $('#txtTransporterRemark').val(getTransporterRemark);
                // $('#txtDockNo').val(getDockNo);
                // $('#txtDockNo').val(getDockId);
                $('#txtTruckNo').val(getTruckNo);
                $('#txtLrNo').val(getLRNo);
                $('#txtInTime').val(getInTime);
                $('#txtOutTime').val(getOutTime);
                $('#txtContainerId').val(getContainerID);
                $('#txtTrailer').val(getTrailer);
                $('#txtSeal').val(getSeal);
                $('#txtCarrier').val(getCarrier);
                $('#btnSaveGrnTransport').attr('data-id', strOrderId);
                $('#txtgetPassId').val(strOrderId)

            }
            catch (ex) {
                // Do nothing... 
            }
            // getDropDownList(POID, getTransporterNameId);

            viewOrderGatePassDetails(POID);

            if (isOpenedForGrn == true) {
                $('#btnSaveGrnTransport span').html('Next');
                $('#btnSaveGrnTransport').attr('data-isopenedforgrn', "true");
            }
            else {
                $('#btnSaveGrnTransport span').html('Save');
                $('#btnSaveGrnTransport').attr('data-isopenedforgrn', "false");
            }

            $('#wms-srv-transport-popup').show();
            $('#wms-srv-transport-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });

            $('#wms-srv-transport-popup-close').off();
            $('#wms-srv-transport-popup-close').click(function () {
                $('#wms-srv-transport-popup .wms-srv-datepicker').datepicker('destroy');
                $('#wms-srv-transport-popup').hide();
                getGetePassddl($('#hdnPoOid').val());
            });
        }
        else {
            alert('Unable to load document data');
        }
        // After success
    });
    // });

}

function getDropDownList(strOrderId, getTransporterNameId, getDockId) {
    debugger;
    // alert('Opening document...');
    //$('#wms-srv-document-popup').show();
    var apiPath = wmsApiPath + 'GRN/GetTransportList';
    // var apiPath = apiServerPath + 'document';
    var getCustomerId = $("#ddlcustomer").val();
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();
    var postData = {
        CustomerId: getCustomerIdInward,
        WarehouseId: getWarehouseIdInward,
        UserId: getUserIdInward,
        OrderId: strOrderId,
        Object: ObjectGrn
    };
    callHttpUrl(apiPath, postData, function (result) {
        // After success
        var getCode = result.StatusCode;
        var getStatus = result.Status;
        if (getCode == 'Success') {
            $("#txtTransporterName").html('');
            /* ---------- Transporter List ---------- */
            var getResponse = result.Result;

            var getGrnTransportList = getResponse.Table;
            //  var ddlTransport = '<option value="0">-- Select Option--</option>';
            var ddlTransport = '';
            for (var i = 0; i < getGrnTransportList.length; i++) {
                var getId = getGrnTransportList[i].ID;
                var getTransportName = getGrnTransportList[i].TransportName;
                ddlTransport += '<option value="' + getId + '">' + getTransportName + '</option>';
            }
            $('#txtTransporterName').html(ddlTransport);
            //$('#txtTransporterName').val(getTransporterNameId);
            /* ---------- Transporter List ---------- */
            /* ---------- Dock List ---------- */
            var getDockList = result.Result;
            var getGrnDockList = getDockList.Table1;
            //var ddlDock = '<option value="0">-- Select --</option>';
            var ddlDock = '';
            var getDockId = '';
            for (var i = 0; i < getGrnDockList.length; i++) {
                getDockId = getGrnDockList[i].ID;
                var getDockName = getGrnDockList[i].Dock;
                ddlDock += '<option value="' + getDockId + '">' + getDockName + '</option>';
            }
            $('#txtDockNo').html(ddlDock);
            $('#txtDockNo').val(getDockId);
            setDefaultGatePassValues();
            /* ---------- Dock List ---------- */
        }
        // After success
    });
}
// View Get Pass Order Details

function viewOrderGatePassDetails(strCurrentOrder) {
    debugger;

    var SelectedOrder = document.getElementById("hdnSelectedOrderCheck");
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
    var apiPath = wmsApiPath + 'GRN/GetGatePassDetail';
    //var apiPath = "http://localhost:50068/api/staging/v1/GRN/GetGatePassDetail";  
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();
    var getGatePassId = $("#txtgetPassId").val();
    var getFinalOrderID = '';
    var grnID = '0';
    if (getInwardOrdersIDList == '') {
        getFinalOrderID = strCurrentOrder
    }
    else {
        getFinalOrderID = getInwardOrdersIDList;
    }
    var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "OrderId": getFinalOrderID,
        "grnID": grnID,
        "GatePassId": getGatePassId
    };


    // BIND DATA GRID
    var gridTable = '';

    // GRID HEADER
    gridTable = gridTable + '<div class="wms-srv-grid-header" style="white-space:nowrap; text-align:center">';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTransPoter(this)" id="SellectAll" value=""></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:60px;">SR. No.</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Id</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Name</div>';
    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Description</div>';
    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Requested Qty <span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Quantity</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Unit Of Measurement</div>';

    var getPrdLottable = mBrillWmsSession.getCustomerLottable();
    var breakCustLot = getPrdLottable.split(',');

    for (var ghl = 0; ghl < breakCustLot.length; ghl++) {
        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + ghl + '" data-lottype="' + breakCustLot[ghl] + '" style="width:82px;text-align:center;display:none;">' + breakCustLot[ghl] + '</div>';
    }

    //gridTable = gridTable + '<div class="wms-srv-grid-cell">Lottable</div>';
    //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:200px;">Received Qty <span class="requiredStar">*</span></div>';
    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Case Net Weight</div>';
    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Case Gross Weight</div>';
    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Total Carton</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:60px;">Action</div>';
    gridTable = gridTable + '</div>';
    // GRID HEADER

    $('#tlbPoGatepassDetailsGrid').html(gridTable);
    if (strCurrentOrder != '0') {
        callHttpUrl(apiPath, postData, function (data) {
            //alert(data);
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                var getResult = data.Result;
                var getGridData = getResult.Table;

                // var getGridData = myGridList.InboundResult[0].InboundList;

                var totalOrderQty = 0;
                var totalReceivedQty = 0;

                $('#tlbPoGatepassDetailsGrid .wms-srv-grid-row').remove();
                var getPrdLottable = mBrillWmsSession.getCustomerLottable();
                var breakCustLot = getPrdLottable.split(',');
                for (var i = 0; i < getGridData.length; i++) {
                    var getRowNumber = i + 1;
                    var getId = getGridData[i].ID;
                    var getSkuId = getGridData[i].skuID;
                    var getOrderId = getGridData[i].orderId;
                    var getItemCode = getGridData[i].Prod_code;
                    var getItemName = getGridData[i].Prod_Name;
                    var getRequestedQty = getGridData[i].Orderqty;
                    var getUOM = getGridData[i].UOM;
                    var getUOMId = getGridData[i].UOMID;
                    var getOrderQty = getGridData[i].Orderqty;

                    var lot1 = getGridData[i].Lottable1;
                    var lot2 = getGridData[i].Lottable2;
                    var lot3 = getGridData[i].Lottable3;
                    var lot4 = getGridData[i].Lottable4;
                    var lot5 = getGridData[i].Lottable5;
                    var lot6 = getGridData[i].Lottable6;
                    var lot7 = getGridData[i].Lottable7;
                    var lot8 = getGridData[i].Lottable8;
                    var lot9 = getGridData[i].Lottable9;
                    var lot10 = getGridData[i].Lottable10;

                    var getLottable = [];
                    getLottable.push(isGatePassEmptyLottable(lot1));
                    getLottable.push(isGatePassEmptyLottable(lot2));
                    getLottable.push(isGatePassEmptyLottable(lot3));
                    getLottable.push(isGatePassEmptyLottable(lot4));
                    getLottable.push(isGatePassEmptyLottable(lot5));
                    getLottable.push(isGatePassEmptyLottable(lot6));
                    getLottable.push(isGatePassEmptyLottable(lot7));
                    getLottable.push(isGatePassEmptyLottable(lot8));
                    getLottable.push(isGatePassEmptyLottable(lot9));
                    getLottable.push(isGatePassEmptyLottable(lot10));

                    var IsContainSerial = getGridData[i].IsContainSerial;

                    totalOrderQty = totalOrderQty + Number(getOrderQty);
                    totalReceivedQty = totalOrderQty;

                    getPassOrderID.push(getOrderId);
                    getPassItemCode.push(getItemCode);
                    getPassItemName.push(getItemName);
                    getPassReqQty.push(getRequestedQty);
                    getPassUOM.push(getUOM);
                    getPassOrderQty.push(getOrderQty);
                    getPassLottable.push(lot1);
                    // GRID ROW
                    gridTable = '';

                    gridTable = gridTable + '<div class="wms-srv-grid-row wmSkuDetailsGatePassRow" id="GatePassRow_' + getId + '">';
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'><input type='checkbox' id='checkTranspoter' class='transpoterBarcode' data-DTID='" + getId + "' data-OrderNo='" + getOrderId + "' data-SkuId='" + getSkuId + "' data-ItemName='" + getItemName + "' data-OrderQty = '" + getOrderQty + "' data-Unit='" + getUOM + "' data-Lottable = '" + getLottable + "' data-ItemCode='" + getItemCode + "' data-IsContainSerial='" + IsContainSerial + "'></div>";
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRowNumber + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderId + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemName + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getDescription + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRequestedQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';

                    for (var gtl = 0; gtl < getLottable.length; gtl++) {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + gtl + '" data-lottype="' + breakCustLot[gtl] + '" style="width: 82px; text-align: center;display:none;">' + getLottable[gtl] + '</div>';
                    }

                    //gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="lottableControlHolder GatePassLottable" data-lottable="' + getLottable + '">' + getLottable + '</div></div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" class="txtGateReceivedQty" id="txtGateReceivedQty' + getId +'" value="' + getOrderQty + '" class="wms-srv-grid-cell-input notranslate"></div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getCaseNetWeight + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGrossWeight + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getTotalCarton + '</div>';
                    //gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><i class="fas fa-check-circle" onclick="updatreceiveqty(' + strCurrentOrder + ',' + getId + ');"></i></div></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +
                        '<i class="fas fa-tag btnEditLottable" onclick="addLottableToGatePass(' + getSkuId + ',' + getOrderId + ',' + getId + ');" style="display:block;"></i>' +
                        '<i class="fas fa-check-circle btnSaveLottable" onclick="saveSkuLottableForGatePass(' + getOrderId + ',' + getSkuId + ',' + getOrderQty + ',\'' + getUOM + '\',' + getUOMId + ',' + getId + ');" style="display:none;"></i>' +
                        '</div></div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW
                    $('#tlbPoGatepassDetailsGrid').append(gridTable);
                }
                showHideLottableCellForGatePassRow();
                $('#spnReceivedGatepassQty').html(totalReceivedQty + '/' + totalOrderQty);
                // Commented as not required...
                //$("#txtDockNo").val(0);
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
    $("#globalgetPassObj").val('');
}

function isGatePassEmptyLottable(lot) {
    var filterLot = '';
    if (lot != null) {
        if ((lot.trim() != '0') && (lot.trim() != '')) {
            filterLot = lot;
        }
    }
    return filterLot;
}

function showHideLottableCellForGatePassRow() {
    var getViewRowCount = $('#tlbPoGatepassDetailsGrid .wmSkuDetailsGatePassRow').length;
    $('#tlbPoGatepassDetailsGrid .gridCellLottable').show();
    for (var l = 0; l < 10; l++) {
        // CHECK FOR VIEW ONLY EMPTY CELL
        var totalCell = $('#tlbPoGatepassDetailsGrid .wmSkuDetailsGatePassRow .gridCellLottable[data-lotindex="' + l + '"]').length;
        var totalEmptyCell = $('#tlbPoGatepassDetailsGrid .wmSkuDetailsGatePassRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;

        if (totalCell > 0) {
            if (totalCell != totalEmptyCell) {
                $('#tlbPoGatepassDetailsGrid .gridCellLottable[data-lotindex="' + l + '"]').show();
            } else {
                $('#tlbPoGatepassDetailsGrid .gridCellLottable[data-lotindex="' + l + '"]').hide();
            }
        } else {
            $('#tlbPoGatepassDetailsGrid .gridCellLottable[data-lotindex="' + l + '"]').hide();
        }
    }
}

function addLottableToGatePass(skuId, strCurrentOrder, recId) {
    debugger;
    // var GetPassId = $('#txtgetPassId').val();
    // if (GetPassId.trim() != '') {
    //     if (checkGetPassFeilds() == true) {
    var GatePassRowId = 'GatePassRow_' + recId;
    $('#' + GatePassRowId + ' .GatePassLottable').html('');
    $("#hdnGatePassId").val(strCurrentOrder);
    getLottableBySku(skuId, 'GatePass', '0', '', true, recId);
    //    }
    // } else {
    //     alert('Please select GatePass Id or save GatePass details first to add lottables!!');
    // }
}

function getGatePassLotInputVal(lotType, recId) {
    debugger;
    var lotVal = '0';
    // var lotLottableObj = $('#GatePassRow_' + recId + ' .GatePassLottable input[data-description="' + lotType + '"]');
    var lotLottableObj = $('#GatePassRow_' + recId + ' .gridCellLottable[data-lottype="' + lotType + '"] input[data-lottype="' + lotType + '"]');
    var lotLottableObjCount = $(lotLottableObj).length;
    if (lotLottableObjCount > 0) {
        lotVal = $(lotLottableObj).val();
        if (lotVal.trim() == '') {
            lotVal = '0';
        }
    }
    return lotVal;
}

function saveSkuLottableForGatePass(inwardOrderNo, skuId, qty, UOM, UomId, recId) {
    debugger;
    if (validateGatePassLottable(recId)) {
        //  var mGetPassID = $('#txtgetPassId').val();
        saveTransport('Lot', function (newGatePassId, inwardOrderNo) {
            // var mGetPassID = $('#txtgetPassId').val();
            var mGetPassID = newGatePassId;
            var mSkuId = skuId;
            var mQty = qty;
            //var mGrnId = '0';
            var getLottable = mBrillWmsSession.getCustomerLottable();
            var breakCustLot = getLottable.split(',');

            var mGrnId = recId;
            // var mLottable1 = getGatePassLotInputVal('Lottable-1', recId);
            // var mLottable2 = getGatePassLotInputVal('Lottable-2', recId);
            // var mLottable3 = getGatePassLotInputVal('Lottable-3', recId);
            // var mLottable4 = getGatePassLotInputVal('Lottable-4', recId);
            // var mLottable5 = getGatePassLotInputVal('Lottable-5', recId);
            // var mLottable6 = getGatePassLotInputVal('Lottable-6', recId);
            // var mLottable7 = getGatePassLotInputVal('Lottable-7', recId);
            // var mLottable8 = getGatePassLotInputVal('Lottable-8', recId);
            // var mLottable9 = getGatePassLotInputVal('Lottable-9', recId);
            // var mLottable10 = getGatePassLotInputVal('Lottable-10', recId);
            var mLottable1 = getGatePassLotInputVal(breakCustLot[0], recId);
            var mLottable2 = getGatePassLotInputVal(breakCustLot[1], recId);
            var mLottable3 = getGatePassLotInputVal(breakCustLot[2], recId);
            var mLottable4 = getGatePassLotInputVal(breakCustLot[3], recId);
            var mLottable5 = getGatePassLotInputVal(breakCustLot[4], recId);
            var mLottable6 = getGatePassLotInputVal(breakCustLot[5], recId);
            var mLottable7 = getGatePassLotInputVal(breakCustLot[6], recId);
            var mLottable8 = getGatePassLotInputVal(breakCustLot[7], recId);
            var mLottable9 = getGatePassLotInputVal(breakCustLot[8], recId);
            var mLottable10 = getGatePassLotInputVal(breakCustLot[9], recId);
            var mUomId = UomId;
            var mUOM = UOM;
            var mUserId = mBrillWmsSession.getUserId();
            var mWarehouseId = mBrillWmsSession.getWarehouseId();
            var mCustomerId = mBrillWmsSession.getCustomerId();

            var apiPath = wmsApiPath + 'GRN/SaveGatePassLottable';
            var postData =
            {
                GetPassID: mGetPassID,
                SkuId: mSkuId,
                Qty: mQty,
                GrnId: mGrnId,
                Lottable1: mLottable1,
                Lottable2: mLottable2,
                Lottable3: mLottable3,
                Lottable4: mLottable4,
                Lottable5: mLottable5,
                Lottable6: mLottable6,
                Lottable7: mLottable7,
                Lottable8: mLottable8,
                Lottable9: mLottable9,
                Lottable10: mLottable10,
                UomId: mUomId,
                UOM: mUOM,
                UserId: mUserId,
                WarehouseId: mWarehouseId,
                CustomerId: mCustomerId,
                InwardOrderNo: inwardOrderNo
            };
            callHttpUrl(apiPath, postData, function (result) {
                debugger;
                var GatePassRowId = 'GatePassRow_' + recId;
                $('#' + GatePassRowId + ' .btnEditLottable').show();
                $('#' + GatePassRowId + ' .btnSaveLottable').hide();
                var getNewLottable = mLottable1 + ',' + mLottable2 + ',' + mLottable3;
                $('#' + GatePassRowId + ' .GatePassLottable').attr('data-lottable', getNewLottable);
                $('#' + GatePassRowId + ' .GatePassLottable').html(getNewLottable);
                $('#' + GatePassRowId + ' .btnSaveLottable').hide();
                // function moved here... 
                openTransport(globalpoID);
            });
        });
    }
}

function validateGatePassLottable(recId) {
    var isValid = true;
    $('#GatePassRow_' + recId + ' .GatePassLottable input[type="text"]').each(function () {
        var lottableType = $(this).attr('placeholder');
        if (lottableType != 'SerialNo') {
            var getLotVal = $(this).val();
            if (getLotVal.trim() == '' || getLotVal.trim() == '0') {
                isValid = false;
            }
        }
    });
    if (!isValid) {
        alert('Please enter all lottable values!!')
    }
    return isValid;
}

function getSelectedIdForBarcodeGRN() {
    var strBarcode = [];
    //var SelectedId = document.getElementById("hdnGrnIdForBarcode");
    $("input[class='chkGrnDetails']").each(function () {
        if ($(this).prop("checked") == true) {
            var SkuId = $(this).attr("data-prodid");
            //    if(SelectedId.value == "") {
            strBarcode.push(SkuId);
            // }else{
            //     SelectedId.value = SelectedId.value + "," +SkuId;
            // }
        }
    });
    return strBarcode;
}

function getSelectedIdForBarcodeTransport() {
    var strBarcode = [];
    //var SelectedTranspoterId = $("#hdnTranspoterIdForBarcode").val();
    var SelectedTranspoterId = document.getElementById("hdnTranspoterIdForBarcode");
    $("input[class='transpoterBarcode']").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedTranspoterId.value == "") {
                //SelectedTranspoterId.value = $(this).attr("data-batchid");
                // var OrderId = $(this).attr("data-OrderNo");
                // strBarcode.push(OrderId);
                var SkuId = $(this).attr("data-SkuId");
                //var SkuId = $(this).attr("data-DTID");
                strBarcode.push(SkuId);
            }

            else {
                SelectedTranspoterId.value = SelectedTranspoterId.value + "," + $(this).attr("id");
            }
        }
    });

    // $('#' + getBarcodeGrid + ' input[type="checkbox"]').each(function () {
    //     var isSelected = $(this).prop('checked');
    //     if (isSelected) {
    //         var getLabel = $(this).val();
    //         strBarcode.push(getLabel);
    //     }
    // });

    return strBarcode;
}
function getSelectedDTIDForBarcodeTransport() {
    var strBarcode = [];
    //var SelectedTranspoterId = $("#hdnTranspoterIdForBarcode").val();
    var SelectedTranspoterlotable = document.getElementById("hdnTranspoterlotableForBarcode");
    $("input[class='transpoterBarcode']").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedTranspoterlotable.value == "") {
                //SelectedTranspoterId.value = $(this).attr("data-batchid");
                // var OrderId = $(this).attr("data-OrderNo");
                // strBarcode.push(OrderId);
                var lottable = $(this).attr("data-DTId");
                strBarcode.push(lottable);
            }

            else {
                SelectedTranspoterlotable.value = SelectedTranspoterlotable.value + "," + $(this).attr("data-DTId");
            }
        }
    });

    // $('#' + getBarcodeGrid + ' input[type="checkbox"]').each(function () {
    //     var isSelected = $(this).prop('checked');
    //     if (isSelected) {
    //         var getLabel = $(this).val();
    //         strBarcode.push(getLabel);
    //     }
    // });

    return strBarcode;
}
function validateForSerialSelect() {
    var selectedChkCount = 0;
    var isSerialSelected = 'No';
    var isValid = true;
    $('#pnlGenerateSerialLabels').hide();
    $('#pnlPrintLabelSize').show();
    $('#hdnCurrentLabelPrintType').val('normal');
    $("input[class='transpoterBarcode']").each(function () {
        var isChkSelected = $(this).prop('checked');
        if (isChkSelected) {
            selectedChkCount = selectedChkCount + 1;
            var chkIsSerialLottable = $(this).attr('data-IsContainSerial');
            if (chkIsSerialLottable == 'Yes') {
                isSerialSelected = 'Yes';
                //$('#pnlGenerateSerialLabels').show();
                //$('#pnlPrintLabelSize').hide();
                $('#hdnCurrentLabelPrintType').val('serial');
            }
        }
    });
    if ((selectedChkCount > 1) && (isSerialSelected == 'Yes')) {
        isValid = false;
    }
    return isValid;
}

function validateForGRNSerialSelect() {
    debugger;
    var selectedChkCount = 0;
    var isSerialSelected = 'No';
    var isValid = true;
    $('#pnlGenerateSerialLabels').hide();
    $('#pnlPrintLabelSize').show();
    $('#hdnCurrentLabelPrintType').val('normal');
    $("input[class='chkGrnDetails']").each(function () {
        var isChkSelected = $(this).prop('checked');
        if (isChkSelected) {
            selectedChkCount = selectedChkCount + 1;
            var chkIsSerialLottable = $(this).attr('data-iscontainserial');
            if (chkIsSerialLottable == 'Yes') {
                isSerialSelected = 'Yes';
                //$('#pnlGenerateSerialLabels').show();
                //$('#pnlPrintLabelSize').hide();
                $('#hdnCurrentLabelPrintType').val('serial');
            }
        }
    });
    if ((selectedChkCount > 1) && (isSerialSelected == 'Yes')) {
        isValid = false;
    }
    return isValid;
}

function changeBarcodePrintFormat() {
    debugger;
    var getBarcodeType = $('#txtPrintBarcodeTypeTransport').val();
    if (getBarcodeType == '2D - 128') {
        $('#popupContentprintbarcode .BarcodeBoxHolder .BarcodeStringToPrint').hide();
        $('#popupContentprintbarcode .BarcodeBoxHolder .Barcode2DStringToPrint').show();
    } else {
        $('#popupContentprintbarcode .BarcodeBoxHolder .BarcodeStringToPrint').show();
        $('#popupContentprintbarcode .BarcodeBoxHolder .Barcode2DStringToPrint').hide();
    }
}

// NEW FUNCTION FOR PRINT...
// NEW CODE BY ABHIJIT - 10 APRIL 2024
function sendDataToPrinter() {
    window.frames["winPrintTemplate"].focus();
    window.frames["winPrintTemplate"].print();
}
// TEMP RENAMED BY ABHIJIT - 10 APRIL 2024
function sendDataToPrinter_Current() {
    debugger;
    var getPaperPageMargin = '0.25';
    var getPrintSize = $('#txtPrintPaperSizeTransport').val();
    if (getPrintSize.trim() != '') {
        var getPaperPageSize = '';
        var getPrintPageSizeClass = 'PrinatPaperSize4in2in';
        if (getPrintSize == '3x2') {
            getPaperPageSize = 'size:3in 2in';
            getPrintPageSizeClass = 'PrinatPaperSize3in2in';
        } else if (getPrintSize == '4x6') {
            getPaperPageSize = 'size:6in 4in';
            getPrintPageSizeClass = 'PrinatPaperSize4in6in';
        } else {
            getPaperPageSize = 'size:4in 2in';
            getPrintPageSizeClass = 'PrinatPaperSize4in2in';
        }

        //$('body').append('');
        alert('Printing for 3 x 2');
        $('body').append('<style id="winPageSizeSetup">@page{' + getPaperPageSize + ';margin: ' + getPaperPageMargin + 'in;}</style><div id="winPrintContent" class="' + getPrintPageSizeClass + '" data-printsize="' + getPrintSize + '"></div>');
        var getPrintableContent = $('#grnBarcodeID').html();
        // alert('Please select following paper size in printing dialog box to print labels properly.\n' + getPaperPageSize.toUpperCase());
        $('#winPrintContent').html(getPrintableContent);
        window.print();
        $('#winPrintContent').remove();
        $('#winPageSizeSetup').remove();
    } else {
        alert('Select Paper Size to Print!!');
    }
    return false;
}
function printBarcodeLabelForTransport() {
    debugger;
    var isValidForPrint = validateForSerialSelect();
    var arrSkuId = getSelectedIdForBarcodeTransport();

    var arrDTID = getSelectedDTIDForBarcodeTransport();
    $('#txtPrintBarcodeTypeTransport').val('1D - 128');
    if (arrSkuId.length > 0) {
        if (isValidForPrint) {
            var currentPrintLabelType = $('#hdnCurrentLabelPrintType').val();
            var OrderId = $('#btnPrintTransportBarcodeLabel').attr('data-orderid');
            if (currentPrintLabelType != 'serial') {
                var grpSkuId = '';
                var grpDTId = '';
                for (var i = 0; i < arrSkuId.length; i++) {
                    if (grpSkuId == '') {
                        grpSkuId = arrSkuId[i];
                    } else {
                        grpSkuId = grpSkuId + ',' + arrSkuId[i];
                    }
                }
                for (var i = 0; i < arrDTID.length; i++) {
                    if (grpDTId == '') {
                        grpDTId = arrDTID[i];
                    } else {
                        grpDTId = grpDTId + ',' + arrDTID[i];
                    }
                }
                var GatePassId = $('#txtgetPassId').val();
                if (GatePassId.trim() == '') {
                    GatePassId = '0';
                }
                var apiPath = wmsApiPath + 'GRN/GetBarcodePrintData';
                var postData = {
                    "SkuId": grpSkuId,
                    "OrderId": OrderId,
                    "objectType": "GatePass",
                    "objectId": GatePassId,
                    "DTID": grpDTId
                };
                callHttpUrl(apiPath, postData, function (result) {
                    debugger;
                    var getCode = result.StatusCode;
                    var getStatus = result.Status;
                    if (getCode == 'Success') {
                        var getResult = result.Result.Table;
                        var myBarcodeStr = '';
                        var SerialObj = {};
                        var getLottable = mBrillWmsSession.getCustomerLottable();
                        var breakCustLot = getLottable.split(',');
                        printableData = [];
                        for (var i = 0; i < getResult.length; i++) {
                            var custLotVal = [];
                            custLotVal.push(getResult[i].Lottable1);
                            custLotVal.push(getResult[i].Lottable2);
                            custLotVal.push(getResult[i].Lottable3);
                            custLotVal.push(getResult[i].Lottable4);
                            custLotVal.push(getResult[i].Lottable5);
                            custLotVal.push(getResult[i].Lottable6);
                            custLotVal.push(getResult[i].Lottable7);
                            custLotVal.push(getResult[i].Lottable8);
                            custLotVal.push(getResult[i].Lottable9);
                            custLotVal.push(getResult[i].Lottable10);

                            var getPassLottable = '';
                            var getLottablewithlabel = '';

                            for (var ctl = 0; ctl < custLotVal.length; ctl++) {
                                if (custLotVal[ctl].trim() != '0' && custLotVal[ctl].trim() != '') {
                                    if (getPassLottable == '') {
                                        getPassLottable = breakCustLot[ctl] + ':' + custLotVal[ctl];
                                        getLottablewithlabel = custLotVal[ctl];
                                    } else {
                                        getPassLottable = getPassLottable + ' | ' + breakCustLot[ctl] + ':' + custLotVal[ctl];
                                        getLottablewithlabel = getLottablewithlabel + ' | ' + custLotVal[ctl];
                                    }
                                }
                            }

                            SerialObj = getResult[i];

                            var printObj = {
                                OrderId: getResult[i].OrderId,
                                OrderRefNo: getResult[i].OrderRefNo,
                                PurchaseOrderDate: getResult[i].PurchaseOrderDate,
                                ProductCode: getResult[i].ProductCode,
                                ProductName: getResult[i].Name,
                                ProdDescription: getResult[i].ProdDescription,
                                VendorCode: getResult[i].VendorCode,
                                ObjQty: getResult[i].OrderQty,
                                Lottable: getPassLottable,
                                Lottablewithlabel: getLottablewithlabel,
                                UOM: getResult[i].UOM,
                                Barcode1D: convertToBarcode(getResult[i].BarcodeString),
                                Barcode2D: getResult[i].QRCode.split('\n').join('<br />')
                            };

                            printableData.push(printObj);
                        }
                        $('#btnChangePrintTemplate').attr('data-objecttype', 'GatePass');
                        getPrintTemplateForCustomer('GatePass', false);
                    }
                });
            } else {
                debugger;
                var arrSkuId = getSelectedIdForBarcodeTransport();
                if (arrSkuId.length == 1) {
                    $('#grnBarcodeID').html('');
                    var getSubObjectId = $('#txtgetPassId').val();
                    //if(getSubObjectId.trim() != '' && getSubObjectId.trim() != '0'){
                    generateSerialNoLabel(OrderId, 'GatePass', getSubObjectId, 'No');
                    // }else{
                    //     alert('Please save gatepass details before printing label!! Kindly select proper GatePass Id to print label!!');
                    // }
                } else {
                    alert('Please select only one Serial SKU at a time to generate labels!!');
                }

            }
        } else {
            alert("Please select multiple SKU without serial no lottable for print.\n Or Only select one SKU of serial no lottable for print!!");
        }
    } else {
        alert("Please select atleast one record..!");
    }
}

function printBarcodeLabelForTransport_Old() {
    debugger;
    var isValidForPrint = validateForSerialSelect();
    var arrSkuId = getSelectedIdForBarcodeTransport();

    var arrDTID = getSelectedDTIDForBarcodeTransport();
    $('#txtPrintBarcodeTypeTransport').val('1D - 128');
    if (arrSkuId.length > 0) {
        if (isValidForPrint) {
            var currentPrintLabelType = $('#hdnCurrentLabelPrintType').val();
            var OrderId = $('#btnPrintTransportBarcodeLabel').attr('data-orderid');
            if (currentPrintLabelType != 'serial') {
                var grpSkuId = '';
                var grpDTId = '';
                for (var i = 0; i < arrSkuId.length; i++) {
                    if (grpSkuId == '') {
                        grpSkuId = arrSkuId[i];
                    } else {
                        grpSkuId = grpSkuId + ',' + arrSkuId[i];
                    }
                }
                for (var i = 0; i < arrDTID.length; i++) {
                    if (grpDTId == '') {
                        grpDTId = arrDTID[i];
                    } else {
                        grpDTId = grpDTId + ',' + arrDTID[i];
                    }
                }
                var GatePassId = $('#txtgetPassId').val();
                if (GatePassId.trim() == '') {
                    GatePassId = '0';
                }
                var apiPath = wmsApiPath + 'GRN/GetBarcodePrintData';
                var postData = {
                    "SkuId": grpSkuId,
                    "OrderId": OrderId,
                    "objectType": "GatePass",
                    "objectId": GatePassId,
                    "DTID": grpDTId
                };
                callHttpUrl(apiPath, postData, function (result) {
                    debugger;
                    var getCode = result.StatusCode;
                    var getStatus = result.Status;
                    if (getCode == 'Success') {
                        var getResult = result.Result.Table;
                        var myBarcodeStr = '';
                        var SerialObj = {};
                        $('#btnChangePrintTemplate').attr('data-objecttype', 'GatePass');
                        var getLottable = mBrillWmsSession.getCustomerLottable();
                        var breakCustLot = getLottable.split(',');
                        for (var i = 0; i < getResult.length; i++) {
                            var custLotVal = [];
                            custLotVal.push(getResult[i].Lottable1);
                            custLotVal.push(getResult[i].Lottable2);
                            custLotVal.push(getResult[i].Lottable3);
                            custLotVal.push(getResult[i].Lottable4);
                            custLotVal.push(getResult[i].Lottable5);
                            custLotVal.push(getResult[i].Lottable6);
                            custLotVal.push(getResult[i].Lottable7);
                            custLotVal.push(getResult[i].Lottable8);
                            custLotVal.push(getResult[i].Lottable9);
                            custLotVal.push(getResult[i].Lottable10);

                            //var getPassLottable = getResult[i].Lottable1 + ' | ' + getResult[i].Lottable2 + ' | ' + getResult[i].Lottable3;
                            var getPassLottable = '';

                            myBarcodeStr += '<div class="BarcodeBoxHolder"><div class="BarcodeBox"><div class="barcodeGrid" style="display: grid">';
                            //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';
                            //myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle">' + '<label class="prodbarTitle">Order No: </label></div>';
                            //myBarcodeStr += '<div class="">' + getResult[i].OrderId + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Sku Code: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].ProductCode + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Sku Name: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].Name + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Order QTY: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].OrderQty + '</div></span>';

                            //myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                            //myBarcodeStr += '<div class="">' + getPassLottable + '</div></span>';

                            for (var ctl = 0; ctl < custLotVal.length; ctl++) {
                                if (custLotVal[ctl].trim() != '0' && custLotVal[ctl].trim() != '') {
                                    // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">'+ breakCustLot[ctl] +': </label></div>';
                                    // myBarcodeStr += '<div class="">' + custLotVal[ctl] + '</div></span>';

                                    if (getPassLottable == '') {
                                        getPassLottable = breakCustLot[ctl] + ':' + custLotVal[ctl];
                                    } else {
                                        getPassLottable = getPassLottable + ' | ' + breakCustLot[ctl] + ':' + custLotVal[ctl];
                                    }
                                }
                            }
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                            myBarcodeStr += '<div class="">' + getPassLottable + '</div></span>';

                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">UOM: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].UOM + '</div></span></br>';
                            myBarcodeStr += '<div class="BarcodeStringToPrint">' + convertToBarcode(getResult[i].BarcodeString) + '</div>';
                            myBarcodeStr += '<div class="Barcode2DStringToPrint" style="display:none;">' + getResult[i].QRCode.split('\n').join('<br />') + '</div>';
                            myBarcodeStr += '</div></div></div><div class="barcodePageBreak"></div>';
                            SerialObj = getResult[i];
                        }
                        $('#grnBarcodeID').html(myBarcodeStr);
                        // if (currentPrintLabelType != 'serial') {
                        //     $('#grnBarcodeID').html(myBarcodeStr);
                        // }else{
                        //     $('#grnBarcodeID').html('');
                        //     $('#btnGenerateSerialNoLabel').off();
                        //     $('#btnGenerateSerialNoLabel').click(function(){
                        //         var serialFrom = $('#txtSerialBarcodeFrom').val();
                        //         var serialTo = $('#txtSerialBarcodeTo').val();
                        //         generateSerialNoLabel(OrderId);
                        //     });
                        // }  

                        $('#wms-srv-grnprintbarcode-popup').show();
                        $('#wms-srv-grnprintbarcode-popup-close').off();
                        $('#wms-srv-grnprintbarcode-popup-close').click(function () {
                            //clearArrayVal();
                            $('#wms-srv-grnprintbarcode-popup').hide();

                        });
                    }
                });
            } else {
                debugger;
                var arrSkuId = getSelectedIdForBarcodeTransport();
                if (arrSkuId.length == 1) {
                    $('#grnBarcodeID').html('');
                    var getSubObjectId = $('#txtgetPassId').val();
                    //if(getSubObjectId.trim() != '' && getSubObjectId.trim() != '0'){
                    generateSerialNoLabel(OrderId, 'GatePass', getSubObjectId, 'No');
                    // }else{
                    //     alert('Please save gatepass details before printing label!! Kindly select proper GatePass Id to print label!!');
                    // }
                } else {
                    alert('Please select only one Serial SKU at a time to generate labels!!');
                }

            }
        } else {
            alert("Please select multiple SKU without serial no lottable for print.\n Or Only select one SKU of serial no lottable for print!!");
        }
    } else {
        alert("Please select atleast one record..!");
    }
}

function getSelectedDTIDForBarcodeGRN() {
    var SelectedGRNlotable = '';
    $("#tblgrndetail .wmSkuDetailsGrnRow input[class='chkGrnDetails']").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedGRNlotable == "") {
                SelectedGRNlotable = $(this).attr("data-dtid");
            } else {
                SelectedGRNlotable = SelectedGRNlotable + "," + $(this).attr("data-dtid");
            }
        }
    });
    //alert(SelectedGRNlotable);
    return SelectedGRNlotable;
}

// TEST CODE BY ABHIJIT - 10 APRIL 2024
var printableData = [];
function printBarcodeLabelForGRN() {
    printableData = [];
    var isValidForPrint = validateForGRNSerialSelect();
    var arrSkuId = getSelectedIdForBarcodeGRN();
    $('#txtPrintBarcodeTypeTransport').val('1D - 128');
    if (arrSkuId.length > 0) {
        if (isValidForPrint) {
            var currentPrintLabelType = $('#hdnCurrentLabelPrintType').val();
            var OrderId = $('#btnPrintGrnBarcodeLabel').attr('data-orderid');
            if (currentPrintLabelType != 'serial') {
                var grpSkuId = '';
                for (var i = 0; i < arrSkuId.length; i++) {
                    if (grpSkuId == '') {
                        grpSkuId = arrSkuId[i];
                    } else {
                        grpSkuId = grpSkuId + ',' + arrSkuId[i];
                    }
                }

                var grpDTId = getSelectedDTIDForBarcodeGRN();

                var GateGrnHeadId = $('#grnddl').val();
                var apiPath = wmsApiPath + 'GRN/GetBarcodePrintData';
                var postData = {
                    "SkuId": grpSkuId,
                    "OrderId": OrderId,
                    "objectType": "GRN",
                    "objectId": GateGrnHeadId,
                    "DTID": grpDTId
                };
                callHttpUrl(apiPath, postData, function (result) {
                    debugger;
                    var getCode = result.StatusCode;
                    var getStatus = result.Status;
                    if (getCode == 'Success') {
                        var getResult = result.Result.Table;
                        var myBarcodeStr = '';
                        var SerialObj = {};

                        var getLottable = mBrillWmsSession.getCustomerLottable();
                        var breakCustLot = getLottable.split(',');

                        for (var i = 0; i < getResult.length; i++) {
                            //var getPassLottable = getResult[i].Lottable1 + ' | ' + getResult[i].Lottable2 + ' | ' + getResult[i].Lottable3;
                            var custLotVal = [];
                            custLotVal.push(getResult[i].Lottable1);
                            custLotVal.push(getResult[i].Lottable2);
                            custLotVal.push(getResult[i].Lottable3);
                            custLotVal.push(getResult[i].Lottable4);
                            custLotVal.push(getResult[i].Lottable5);
                            custLotVal.push(getResult[i].Lottable6);
                            custLotVal.push(getResult[i].Lottable7);
                            custLotVal.push(getResult[i].Lottable8);
                            custLotVal.push(getResult[i].Lottable9);
                            custLotVal.push(getResult[i].Lottable10);

                            var getPassLottable = '';
                            var getLottablewithlabel = '';

                            for (var ctl = 0; ctl < custLotVal.length; ctl++) {
                                if (custLotVal[ctl].trim() != '0' && custLotVal[ctl].trim() != '') {
                                    if (getPassLottable == '') {
                                        getPassLottable = breakCustLot[ctl] + ':' + custLotVal[ctl];
                                        getLottablewithlabel = custLotVal[ctl];
                                    } else {
                                        getPassLottable = getPassLottable + ' | ' + breakCustLot[ctl] + ':' + custLotVal[ctl];
                                        getLottablewithlabel = getLottablewithlabel + ' | ' + custLotVal[ctl];
                                    }
                                }
                            }
                            SerialObj = getResult[i];

                            var printObj = {
                                OrderId: getResult[i].OrderId,
                                OrderRefNo: getResult[i].OrderRefNo,
                                PurchaseOrderDate: getResult[i].PurchaseOrderDate,
                                ProductCode: getResult[i].ProductCode,
                                ProductName: getResult[i].Name,
                                ProdDescription: getResult[i].ProdDescription,
                                VendorCode: getResult[i].VendorCode,
                                ObjQty: getResult[i].ObjQty,
                                Lottable: getPassLottable,
                                Lottablewithlabel: getLottablewithlabel,
                                UOM: getResult[i].UOM,
                                Barcode1D: convertToBarcode(getResult[i].BarcodeString),
                                Barcode2D: getResult[i].QRCode.split('\n').join('<br />')
                            };
                            printableData.push(printObj);
                        }
                        var getPrintTemplates = result.Result.Table1;
                        // showPrintTemplates(getPrintTemplates);
                        getPrintTemplateForCustomer('GRN', false);
                    }
                });
            } else {
                var arrSkuId = getSelectedIdForBarcodeGRN();
                if (arrSkuId.length == 1) {
                    $('#grnBarcodeID').html('');
                    var getSubObjectId = $('#grnddl').val();
                    generateSerialNoLabel(OrderId, 'GRN', getSubObjectId, 'No');
                } else {
                    alert('Please select only one Serial SKU at a time to generate labels!!');
                }

            }
        } else {
            alert("Please select multiple SKU without serial no lottable for print.\n Or Only select one SKU of serial no lottable for print!!");
        }
    } else {
        alert("Please select atleast one record..!");
    }
}

function showPrintTemplates(ObjectType, printTemplates) {
    /* $('#grnBarcodeID').html('<iframe name="winPrintTemplate" src="LabelTemplates/report-template-style-1.html" style="width:100%;height:490px;min-width:490px;"></iframe>');
     // $('#grnBarcodeID').html(myBarcodeStr);
     $('#wms-srv-grnprintbarcode-popup').show();
     $('#wms-srv-grnprintbarcode-popup-close').off();
     $('#wms-srv-grnprintbarcode-popup-close').click(function () {
         //clearArrayVal();
         $('#wms-srv-grnprintbarcode-popup').hide();
     });
     */

    $('#popupContentPrintTemplate').html('');
    for (var t = 0; t < printTemplates.length; t++) {
        var templateId = printTemplates[t].Id;
        var template = printTemplates[t].template;
        var filename = printTemplates[t].filename;
        var thumbnail = printTemplates[t].thumbnail;
        var getTemplate = '<div class="printTemplate" data-templateid="' + templateId + '" data-template="' + template + '" data-filename="' + filename + '" style="display:inline-block;margin:10px;width:250px;">' +
            '<img src="LabelTemplates/' + thumbnail + '" style="width:100%;border:solid 1px #636363;box-shadow:5px 5px 5px #636363;" />' +
            '<br /><div style="margin-top:10px;">' + template + '</div>';
        '</div>';
        $('#popupContentPrintTemplate').append(getTemplate);
    }
    $('.printTemplate').off();
    $('.printTemplate').click(function () {
        debugger;
        var getTemplateId = $(this).attr('data-templateid');
        var getTemplateFile = $(this).attr('data-filename');

        // Code commented as we have to save template id first. 
        // $('#grnBarcodeID').html('<iframe name="winPrintTemplate" src="LabelTemplates/'+ getTemplateFile +'" style="width:100%;height:490px;min-width:490px;"></iframe>');
        // // $('#grnBarcodeID').html(myBarcodeStr);
        // $('#wms-srv-grnprintbarcode-popup').show();
        // $('#wms-srv-grnprintbarcode-popup-close').off();
        // $('#wms-srv-grnprintbarcode-popup-close').click(function () {
        //     //clearArrayVal();
        //     $('#wms-srv-grnprintbarcode-popup').hide();
        // });
        // $('#wms-srv-printtemplate-popup').hide();

        var getTmplUserId = mBrillWmsSession.getUserId();
        var getTmplCustomerId = mBrillWmsSession.getCustomerId();

        var apiPath = wmsApiPath + 'GRN/SaveGrnPrintLabelStyle';
        var postData =
        {
            "UserId": getTmplUserId,
            "CustomerId": getTmplCustomerId,
            "TemplateId": getTemplateId,
            "ObjectType": ObjectType
        }
        callHttpUrl(apiPath, postData, function (result) {
            var getCode = result.StatusCode;
            if (getCode.toLocaleLowerCase() == 'success') {
                getPrintTemplateForCustomer('GatePass', false);
                $('#grnBarcodeID').html('<iframe name="winPrintTemplate" src="LabelTemplates/' + getTemplateFile + '" style="width:100%;height:490px;min-width:490px;"></iframe>');
                // $('#grnBarcodeID').html(myBarcodeStr);
                $('#wms-srv-grnprintbarcode-popup').show();
                $('#wms-srv-grnprintbarcode-popup-close').off();
                $('#wms-srv-grnprintbarcode-popup-close').click(function () {
                    //clearArrayVal();
                    $('#wms-srv-grnprintbarcode-popup').hide();
                });
                $('#wms-srv-printtemplate-popup').hide();

            }
        });
    });

    $('#wms-srv-printtemplate-popup').show();
    $('#wms-srv-printtemplate-popup-close').off();
    $('#wms-srv-printtemplate-popup-close').click(function () {
        $('#wms-srv-printtemplate-popup').hide();
    });
}

function getPrintTemplateForCustomer(ObjectType, isChangeTemplate) {
    var getTmplUserId = mBrillWmsSession.getUserId();
    var getTmplCustomerId = mBrillWmsSession.getCustomerId();

    var apiPath = wmsApiPath + 'GRN/GetGrnPrintLabelStyle';
    var postData =
    {
        "UserId": getTmplUserId,
        "CustomerId": getTmplCustomerId,
        "ObjectType": ObjectType
    }
    callHttpUrl(apiPath, postData, function (result) {
        debugger;
        var getCode = result.StatusCode;
        var getResult = result.Result.Table;
        var getTemplateId = '0';
        var getTemplateFile = '';
        if (getResult.length > 0) {
            getTemplateId = getResult[0].TemplateId;
            getTemplateFile = getResult[0].TemplateFile;
        }
        if (getTemplateId != '0' && isChangeTemplate != true) {
            $('#btnChangePrintTemplate').attr('data-objecttype', ObjectType);
            $('#grnBarcodeID').html('<iframe name="winPrintTemplate" src="LabelTemplates/' + getTemplateFile + '" style="width:100%;height:490px;min-width:490px;"></iframe>');
            // $('#grnBarcodeID').html(myBarcodeStr);
            $('#wms-srv-grnprintbarcode-popup').show();
            $('#wms-srv-grnprintbarcode-popup-close').off();
            $('#wms-srv-grnprintbarcode-popup-close').click(function () {
                //clearArrayVal();
                $('#wms-srv-grnprintbarcode-popup').hide();
            });
            $('#wms-srv-printtemplate-popup').hide();
        } else {
            var getPrintTemplates = result.Result.Table1;
            if (getPrintTemplates.length > 0) {
                showPrintTemplates(ObjectType, getPrintTemplates);
            }
        }
    });
}

function savePrintTemplateForCustomer(ObjectType, templateId) {
    var getTmplUserId = mBrillWmsSession.getUserId();
    var getTmplCustomerId = mBrillWmsSession.getCustomerId();

    var apiPath = wmsApiPath + 'GRN/SaveGrnPrintLabelStyle';
    var postData =
    {
        "UserId": getTmplUserId,
        "CustomerId": getTmplCustomerId,
        "TemplateId": templateId,
        "ObjectType": ObjectType
    }
    callHttpUrl(apiPath, postData, function (result) {
    });
}

function changePrintTemplate(ObjectType) {
    debugger;
    // ============= NEW CODE ====================
    var ObjectType = $('#btnChangePrintTemplate').attr('data-objecttype');
    getPrintTemplateForCustomer(ObjectType, true);

    // ============= OLD CODE ====================
    // $('#wms-srv-grnprintbarcode-popup').hide();
    // $('#wms-srv-printtemplate-popup').show();
    // $('#wms-srv-printtemplate-popup-close').off();
    // $('#wms-srv-printtemplate-popup-close').click(function () {
    //     $('#wms-srv-printtemplate-popup').hide();
    // });
    // ============= OLD CODE ====================
}

// TEMP RENAMED BY ABHIJIT - 10 APRIL 2024
function printBarcodeLabelForGRN_Current() {
    var isValidForPrint = validateForGRNSerialSelect();
    var arrSkuId = getSelectedIdForBarcodeGRN();
    $('#txtPrintBarcodeTypeTransport').val('1D - 128');
    if (arrSkuId.length > 0) {
        if (isValidForPrint) {
            var currentPrintLabelType = $('#hdnCurrentLabelPrintType').val();
            var OrderId = $('#btnPrintGrnBarcodeLabel').attr('data-orderid');
            if (currentPrintLabelType != 'serial') {
                var grpSkuId = '';
                for (var i = 0; i < arrSkuId.length; i++) {
                    if (grpSkuId == '') {
                        grpSkuId = arrSkuId[i];
                    } else {
                        grpSkuId = grpSkuId + ',' + arrSkuId[i];
                    }
                }

                var grpDTId = getSelectedDTIDForBarcodeGRN();

                var GateGrnHeadId = $('#grnddl').val();
                var apiPath = wmsApiPath + 'GRN/GetBarcodePrintData';
                var postData = {
                    "SkuId": grpSkuId,
                    "OrderId": OrderId,
                    "objectType": "GRN",
                    "objectId": GateGrnHeadId,
                    "DTID": grpDTId
                };
                callHttpUrl(apiPath, postData, function (result) {
                    debugger;
                    var getCode = result.StatusCode;
                    var getStatus = result.Status;
                    if (getCode == 'Success') {
                        var getResult = result.Result.Table;
                        var myBarcodeStr = '';
                        var SerialObj = {};

                        var getLottable = mBrillWmsSession.getCustomerLottable();
                        var breakCustLot = getLottable.split(',');

                        for (var i = 0; i < getResult.length; i++) {
                            //var getPassLottable = getResult[i].Lottable1 + ' | ' + getResult[i].Lottable2 + ' | ' + getResult[i].Lottable3;
                            var custLotVal = [];
                            custLotVal.push(getResult[i].Lottable1);
                            custLotVal.push(getResult[i].Lottable2);
                            custLotVal.push(getResult[i].Lottable3);
                            custLotVal.push(getResult[i].Lottable4);
                            custLotVal.push(getResult[i].Lottable5);
                            custLotVal.push(getResult[i].Lottable6);
                            custLotVal.push(getResult[i].Lottable7);
                            custLotVal.push(getResult[i].Lottable8);
                            custLotVal.push(getResult[i].Lottable9);
                            custLotVal.push(getResult[i].Lottable10);

                            var getPassLottable = '';

                            myBarcodeStr += '<div class="BarcodeBoxHolder"><div class="BarcodeBox"><div class="barcodeGrid" style="display: grid">';
                            //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';

                            // COMMENTED AS DISCUSSED WITH MR. NILESH KASAR - 19 March 2024
                            // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle">' + '<label class="prodbarTitle">Order No: </label></div>';
                            // myBarcodeStr += '<div class="">' + getResult[i].OrderId + '</div></span>';
                            // COMMENTED AS DISCUSSED WITH MR. NILESH KASAR - 19 March 2024

                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Sku Code: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].ProductCode + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Sku Name: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].Name + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">GRN QTY: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].ObjQty + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';

                            for (var ctl = 0; ctl < custLotVal.length; ctl++) {
                                if (custLotVal[ctl].trim() != '0' && custLotVal[ctl].trim() != '') {
                                    if (getPassLottable == '') {
                                        getPassLottable = breakCustLot[ctl] + ':' + custLotVal[ctl];
                                    } else {
                                        getPassLottable = getPassLottable + ' | ' + breakCustLot[ctl] + ':' + custLotVal[ctl];
                                    }
                                }
                            }

                            myBarcodeStr += '<div class="">' + getPassLottable + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">UOM: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].UOM + '</div></span></br>';
                            myBarcodeStr += '<div class="BarcodeStringToPrint">' + convertToBarcode(getResult[i].BarcodeString) + '</div>';
                            myBarcodeStr += '<div class="Barcode2DStringToPrint" style="display:none;">' + getResult[i].QRCode.split('\n').join('<br />') + '</div>';
                            myBarcodeStr += '</div></div></div><div class="barcodePageBreak"></div>';
                            SerialObj = getResult[i];
                        }
                        $('#grnBarcodeID').html(myBarcodeStr);
                        // if (currentPrintLabelType != 'serial') {
                        //     $('#grnBarcodeID').html(myBarcodeStr);
                        // }else{
                        //     $('#grnBarcodeID').html('');
                        //     $('#btnGenerateSerialNoLabel').off();
                        //     $('#btnGenerateSerialNoLabel').click(function(){
                        //         var serialFrom = $('#txtSerialBarcodeFrom').val();
                        //         var serialTo = $('#txtSerialBarcodeTo').val();
                        //         generateSerialNoLabel(OrderId);
                        //     });
                        // }  

                        $('#wms-srv-grnprintbarcode-popup').show();
                        $('#wms-srv-grnprintbarcode-popup-close').off();
                        $('#wms-srv-grnprintbarcode-popup-close').click(function () {
                            //clearArrayVal();
                            $('#wms-srv-grnprintbarcode-popup').hide();

                        });
                    }
                });
            } else {
                var arrSkuId = getSelectedIdForBarcodeGRN();
                if (arrSkuId.length == 1) {
                    $('#grnBarcodeID').html('');
                    var getSubObjectId = $('#grnddl').val();
                    generateSerialNoLabel(OrderId, 'GRN', getSubObjectId, 'No');
                } else {
                    alert('Please select only one Serial SKU at a time to generate labels!!');
                }

            }
        } else {
            alert("Please select multiple SKU without serial no lottable for print.\n Or Only select one SKU of serial no lottable for print!!");
        }
    } else {
        alert("Please select atleast one record..!");
    }
}
function generateSerialNoLabel(orderId, getSubObjectName, getSubObjectId, forceToGenerate) {
    debugger;
    var getUserId = mBrillWmsSession.getUserId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getObjectName = 'PurchaseOrder';
    var getObjectId = orderId;
    //var getSubObjectName = 'GatePass';
    //var getSubObjectId = $('#txtgetPassId').val();

    var arrSkuId = [];
    if (getSubObjectName == 'GRN') {
        arrSkuId = getSelectedIdForBarcodeGRN();
    } else if (getSubObjectName == 'QC') {
        arrSkuId = getSelectedIdForBarcodeQC();
    } else {
        arrSkuId = getSelectedIdForBarcodeTransport();
    }

    var getSkuId = arrSkuId[0];
    var getSkuObj = '';
    var getSkuQty = '';
    if (getSubObjectName == 'GRN') {
        getSkuObj = $('#tblgrndetail input[data-prodid="' + getSkuId + '"]');
        getSkuQty = $(getSkuObj).attr('data-grnqty');
    } else if (getSubObjectName == 'QC') {
        getSkuObj = $('#tblQCGrid input[data-skuid="' + getSkuId + '"]');
        getSkuQty = $(getSkuObj).attr('data-qcqty');
    } else {
        getSkuObj = $('#tlbPoGatepassDetailsGrid input[data-skuid="' + getSkuId + '"]');
        getSkuQty = $(getSkuObj).attr('data-orderqty');
    }
    //var getSkuObj = $('#tlbPoGatepassDetailsGrid input[data-skuid="' + getSkuId + '"]');
    //var getSkuQty = $(getSkuObj).attr('data-orderqty');

    var apiPath = wmsApiPath + 'GRN/CreateGatePassSkuSerials';
    var postData = {
        "SkuId": getSkuId,
        "SkuQty": getSkuQty,
        "ObjectName": getObjectName,
        "ObjectId": getObjectId,
        "SubObjectName": getSubObjectName,
        "SubObjectId": getSubObjectId,
        "OrderId": orderId,
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "forceToGenerate": forceToGenerate
    };
    callHttpUrl(apiPath, postData, function (result) {
        debugger;
        var getCode = result.StatusCode;
        var getStatus = result.Status;
        if (getCode == 'Success') {
            var getResult = result.Result.Table[0].status;
            var getResultMessage = result.Result.Table[0].message;
            if (getResult == 'Success') {
                showGeneratedSerialListInPoup(getSkuId, orderId, getSubObjectName, getSubObjectId);
            } else {
                if (confirm(getResultMessage)) {
                    generateSerialNoLabel(orderId, getSubObjectName, getSubObjectId, 'Yes')
                } else {
                    showGeneratedSerialListInPoup(getSkuId, orderId, getSubObjectName, getSubObjectId);
                }
            }

            // $('#wms-srv-grnprintbarcode-popup').show();
        }
    });
}

function showGeneratedSerialListInPoup(SkuId, OrderId, ObjectType, ObjectTypeId) {
    printableData = [];
    var GatePassId = $('#txtgetPassId').val();
    var apiPath = wmsApiPath + 'GRN/ShowGeneratedSerialList';
    var postData = {
        "SkuId": SkuId,
        "OrderId": OrderId,
        "ObjectType": ObjectType,
        "ObjectTypeId": ObjectTypeId
    };
    callHttpUrl(apiPath, postData, function (result) {
        debugger;
        var getCode = result.StatusCode;
        var getStatus = result.Status;
        if (getCode == 'Success') {
            var getResult = result.Result.Table;
            var myBarcodeStr = '';
            var SerialObj = {};
            var ObjLabel = 'Order QTY: ';
            if (ObjectType == 'GRN') {
                ObjLabel = 'GRN QTY: ';
            } else if (ObjectType == 'QC') {
                ObjLabel = 'QC QTY: ';
            }
            for (var i = 0; i < getResult.length; i++) {
                var getLottable = mBrillWmsSession.getCustomerLottable();
                var breakCustLot = getLottable.split(',');
                var custLotVal = [];
                custLotVal.push(getResult[i].Lottable1);
                custLotVal.push(getResult[i].Lottable2);
                custLotVal.push(getResult[i].Lottable3);
                custLotVal.push(getResult[i].Lottable4);
                custLotVal.push(getResult[i].Lottable5);
                custLotVal.push(getResult[i].Lottable6);
                custLotVal.push(getResult[i].Lottable7);
                custLotVal.push(getResult[i].Lottable8);
                custLotVal.push(getResult[i].Lottable9);
                custLotVal.push(getResult[i].Lottable10);
                var getPassLottable = '';

                // myBarcodeStr += '<div class="BarcodeBoxHolder"><div class="BarcodeBox"><div class="barcodeGrid" style="display: grid">';
                // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Sku Code: </label></div>';
                // myBarcodeStr += '<div class="">' + getResult[i].ProductCode + '</div></span>';
                // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Sku Name: </label></div>';
                // myBarcodeStr += '<div class="">' + getResult[i].Name + '</div></span>';
                // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">'+ ObjLabel +'</label></div>';
                // myBarcodeStr += '<div class="">' + getResult[i].ObjQty + '</div></span>';

                for (var ctl = 0; ctl < custLotVal.length; ctl++) {
                    if (custLotVal[ctl].trim() != '0' && custLotVal[ctl].trim() != '') {
                        if (getPassLottable == '') {
                            getPassLottable = breakCustLot[ctl] + ':' + custLotVal[ctl];
                        } else {
                            getPassLottable = getPassLottable + ' | ' + breakCustLot[ctl] + ':' + custLotVal[ctl];
                        }
                    }
                }

                // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                // myBarcodeStr += '<div class="">' + getPassLottable + '</div></span>';
                // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">UOM: </label></div>';
                // myBarcodeStr += '<div class="">' + getResult[i].UOM + '</div></span></br>';
                // myBarcodeStr += '<div class="BarcodeStringToPrint">' + convertToBarcode(getResult[i].BarcodeString) + '</div>';
                // myBarcodeStr += '<div class="Barcode2DStringToPrint" style="display:none;">' + getResult[i].QRCode.split('\n').join('<br />') + '</div>';
                // myBarcodeStr += '</div></div></div><div class="barcodePageBreak"></div>';

                SerialObj = getResult[i];

                var printObj = {
                    OrderId: getResult[i].OrderId,
                    OrderRefNo: getResult[i].OrderRefNo,
                    PurchaseOrderDate: getResult[i].PurchaseOrderDate,
                    ProductCode: getResult[i].ProductCode,
                    ProductName: getResult[i].Name,
                    ProdDescription: getResult[i].ProdDescription,
                    VendorCode: getResult[i].VendorCode,
                    ObjQty: getResult[i].ObjQty,
                    Lottable: getPassLottable,
                    UOM: getResult[i].UOM,
                    Barcode1D: convertToBarcode(getResult[i].BarcodeString),
                    Barcode2D: getResult[i].QRCode.split('\n').join('<br />')
                };
                printableData.push(printObj);
            }

            var getPrintTemplates = result.Result.Table1;
            //showPrintTemplates(getPrintTemplates);
            getPrintTemplateForCustomer(ObjectType, false);

            // $('#grnBarcodeID').html(myBarcodeStr);

            // $('#wms-srv-grnprintbarcode-popup').show();
            // $('#wms-srv-grnprintbarcode-popup-close').off();
            // $('#wms-srv-grnprintbarcode-popup-close').click(function () {
            //     $('#wms-srv-grnprintbarcode-popup').hide();
            // });
        }
    });
}

function showGeneratedSerialListInPoup_Current(SkuId, OrderId, ObjectType, ObjectTypeId) {
    var GatePassId = $('#txtgetPassId').val();
    var apiPath = wmsApiPath + 'GRN/ShowGeneratedSerialList';
    var postData = {
        "SkuId": SkuId,
        "OrderId": OrderId,
        "ObjectType": ObjectType,
        "ObjectTypeId": ObjectTypeId
    };
    callHttpUrl(apiPath, postData, function (result) {
        debugger;
        var getCode = result.StatusCode;
        var getStatus = result.Status;
        if (getCode == 'Success') {
            var getResult = result.Result.Table;
            var myBarcodeStr = '';
            var SerialObj = {};
            var ObjLabel = 'Order QTY: ';
            if (ObjectType == 'GRN') {
                ObjLabel = 'GRN QTY: ';
            } else if (ObjectType == 'QC') {
                ObjLabel = 'QC QTY: ';
            }
            for (var i = 0; i < getResult.length; i++) {
                //var getPassLottable = getResult[i].Lottable1 + ' | ' + getResult[i].Lottable2 + ' | ' + getResult[i].Lottable3;
                var getLottable = mBrillWmsSession.getCustomerLottable();
                var breakCustLot = getLottable.split(',');
                var custLotVal = [];
                custLotVal.push(getResult[i].Lottable1);
                custLotVal.push(getResult[i].Lottable2);
                custLotVal.push(getResult[i].Lottable3);
                custLotVal.push(getResult[i].Lottable4);
                custLotVal.push(getResult[i].Lottable5);
                custLotVal.push(getResult[i].Lottable6);
                custLotVal.push(getResult[i].Lottable7);
                custLotVal.push(getResult[i].Lottable8);
                custLotVal.push(getResult[i].Lottable9);
                custLotVal.push(getResult[i].Lottable10);

                //var getPassLottable = getResult[i].Lottable1 + ' | ' + getResult[i].Lottable2 + ' | ' + getResult[i].Lottable3;
                var getPassLottable = '';

                myBarcodeStr += '<div class="BarcodeBoxHolder"><div class="BarcodeBox"><div class="barcodeGrid" style="display: grid">';
                //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';

                // ==================== Commented as suggested by Nilesh - 15 March 2024==============
                //myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle">' + '<label class="prodbarTitle">Order No: </label></div>';
                //myBarcodeStr += '<div class="">' + getResult[i].OrderId + '</div></span>';
                // ==================== Commented as suggested by Nilesh - 15 March 2024==============

                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Sku Code: </label></div>';
                myBarcodeStr += '<div class="">' + getResult[i].ProductCode + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Sku Name: </label></div>';
                myBarcodeStr += '<div class="">' + getResult[i].Name + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">' + ObjLabel + '</label></div>';
                //myBarcodeStr += '<div class="">' + getResult[i].OrderQty + '</div></span>';
                myBarcodeStr += '<div class="">' + getResult[i].ObjQty + '</div></span>';
                //myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                //myBarcodeStr += '<div class="">' + getPassLottable + '</div></span>';

                for (var ctl = 0; ctl < custLotVal.length; ctl++) {
                    if (custLotVal[ctl].trim() != '0' && custLotVal[ctl].trim() != '') {
                        // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">'+ breakCustLot[ctl] +': </label></div>';
                        // myBarcodeStr += '<div class="">' + custLotVal[ctl] + '</div></span>';

                        if (getPassLottable == '') {
                            getPassLottable = breakCustLot[ctl] + ':' + custLotVal[ctl];
                        } else {
                            getPassLottable = getPassLottable + ' | ' + breakCustLot[ctl] + ':' + custLotVal[ctl];
                        }
                    }
                }

                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                myBarcodeStr += '<div class="">' + getPassLottable + '</div></span>';

                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">UOM: </label></div>';
                myBarcodeStr += '<div class="">' + getResult[i].UOM + '</div></span></br>';
                myBarcodeStr += '<div class="BarcodeStringToPrint">' + convertToBarcode(getResult[i].BarcodeString) + '</div>';
                myBarcodeStr += '<div class="Barcode2DStringToPrint" style="display:none;">' + getResult[i].QRCode.split('\n').join('<br />') + '</div>';
                myBarcodeStr += '</div></div></div><div class="barcodePageBreak"></div>';
                SerialObj = getResult[i];
            }
            $('#grnBarcodeID').html(myBarcodeStr);
            // if (currentPrintLabelType != 'serial') {
            //     $('#grnBarcodeID').html(myBarcodeStr);
            // }else{
            //     $('#grnBarcodeID').html('');
            //     $('#btnGenerateSerialNoLabel').off();
            //     $('#btnGenerateSerialNoLabel').click(function(){
            //         var serialFrom = $('#txtSerialBarcodeFrom').val();
            //         var serialTo = $('#txtSerialBarcodeTo').val();
            //         generateSerialNoLabel(OrderId);
            //     });
            // }  

            $('#wms-srv-grnprintbarcode-popup').show();
            $('#wms-srv-grnprintbarcode-popup-close').off();
            $('#wms-srv-grnprintbarcode-popup-close').click(function () {
                //clearArrayVal();
                $('#wms-srv-grnprintbarcode-popup').hide();

            });
        }
    });
}

function generateSerialNoLabel_old(SerialObj, serialFrom, serialTo) {
    debugger;
    var getOrderId = SerialObj.OrderId;
    var getProductCode = SerialObj.ProductCode;
    var getName = SerialObj.Name;
    var getOrderQty = SerialObj.OrderQty;
    var getPassLottable = SerialObj.Lottable1 + ' | ' + SerialObj.Lottable2 + ' | ' + SerialObj.Lottable3;
    var getUOM = SerialObj.UOM;
    var getBarcodeString = SerialObj.BarcodeString;
    var myBarcodeStr = '';
    for (var k = serialFrom; k < serialTo; k++) {
        var getPassLottable = SerialObj.Lottable1 + ' | ' + SerialObj.Lottable2 + ' | ' + SerialObj.Lottable3;
        myBarcodeStr += '<div class="BarcodeBoxHolder"><div class="BarcodeBox"><div class="barcodeGrid" style="display: grid">';
        //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';
        myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle">' + '<label class="prodbarTitle">Order No: </label></div>';
        myBarcodeStr += '<div class="">' + getOrderId + '</div></span>';
        myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Sku Code: </label></div>';
        myBarcodeStr += '<div class="">' + getProductCode + '</div></span>';
        myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Sku Name: </label></div>';
        myBarcodeStr += '<div class="">' + getName + '</div></span>';
        myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Order QTY: </label></div>';
        myBarcodeStr += '<div class="">' + getOrderQty + '</div></span>';
        myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
        myBarcodeStr += '<div class="">' + getPassLottable + '</div></span>';
        myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">UOM: </label></div>';
        myBarcodeStr += '<div class="">' + getUOM + '</div></span></br>';
        myBarcodeStr += '<div class="BarcodeStringToPrint">' + convertToBarcode(getBarcodeString) + '</div>';
        myBarcodeStr += '</div></div></div><div class="barcodePageBreak"></div>';
    }
    $('#grnBarcodeID').html(myBarcodeStr);
    $('#pnlGenerateSerialLabels').show();
    $('#pnlPrintLabelSize').hide();
}

// OLD FUNCTION FOR PRINT...
function printAlllabelTransport() {
    debugger;
    var myBarcode = getSelectedIdForBarcodeTransport();
    $("#grnBarcodeID").html('');
    $("#grnBarcodeTxt").html('');
    if (myBarcode.length > 0) {
        var myBarcodeStr = '';
        var isSelected = $('#checkTranspoter').prop('checked');

        if (isSelected) {

            for (var i = 0; i < myBarcode.length; i++) {
                myBarcodeStr += '<div class="barcodeGrid" style="display: grid">';
                //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Order No: </label></div>';
                myBarcodeStr += '<div class="">' + getPassOrderID[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Sku Code: </label></div>';
                myBarcodeStr += '<div class="">' + getPassItemCode[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Sku Name: </label></div>';
                myBarcodeStr += '<div class="">' + getPassItemName[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Order QTY: </label></div>';
                myBarcodeStr += '<div class="">' + getPassReqQty[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                myBarcodeStr += '<div class="">' + getPassLottable[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">UOM: </label></div>';
                myBarcodeStr += '<div class="">' + getPassUOM[i] + '</div></span></br>';
                myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(myBarcode[i + 1]) + '</div>';
                myBarcodeStr += '</div>';
            }
        }
        else {
            for (var i = 0; i < myBarcode.length; i++) {
                myBarcodeStr += '<div>';
                myBarcodeStr += '<div class="barcodeGrid" style="display: grid">';
                //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Order Id: </label></div>';
                myBarcodeStr += '<div class="">' + getPassOrderID[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Item Code: </label></div>';
                myBarcodeStr += '<div class="">' + getPassItemCode[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Item Name: </label></div>';
                myBarcodeStr += '<div class="">' + getPassItemName[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Order QTY: </label></div>';
                myBarcodeStr += '<div class="">' + getPassReqQty[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                myBarcodeStr += '<div class="">' + getPassLottable[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">UOM: </label></div>';
                myBarcodeStr += '<div class="">' + getPassUOM[i] + '</div></span></br>';
                myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(myBarcode[i + 1]) + '</div>';
                myBarcodeStr += '</div>';
                myBarcodeStr += '</div>';

            }
        }
        $('#grnBarcodeID').html(myBarcodeStr);

        $('#wms-srv-grnprintbarcode-popup').show();
        $('#wms-srv-grnprintbarcode-popup-close').off();
        $('#wms-srv-grnprintbarcode-popup-close').click(function () {
            //clearArrayVal();
            $('#wms-srv-grnprintbarcode-popup').hide();

        });
    }
    else {
        alert("Please select atleast one record..!");
    }
}




function checkGetPassFeilds(issavelot) {
    var getTruckNo = $("#txtTruckNo").val();
    var getLrno = $("#txtLrNo").val();
    if (issavelot != 'Lot') {
        if (getTruckNo == '') {
            alert("Please Enter Truck No");
            return false;
        }
        else if (getLrno == '') {
            alert("Please Enter LR no");
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function viewGetPass() {
    var apiPath = apiServerPath + 'getQualityvalues';
    var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "OrderId": getFinalOrderID

    };
    callHttpUrl(apiPath, postData, function (result) {
        var getCode = result.StatusCode;
        var getStatus = result.Status;
        if (getCode == 'Success') {
            alert("show data");
        }
    });
}

function saveGatePassRecord(strCurrentOrder, recId) {
    viewOrderGatePassDetails(strCurrentOrder);
}
function updatreceiveqty(strCurrentOrder, recId) {
    var apiPath = apiServerPath + 'getQualityvalues';
    var getCustomerId = $("#ddlcustomer").val();
    var postData =
    {
        "customerID": getCustomerId

    };
    callHttpUrl(apiPath, postData, function (result) {
        var isSuccess = result.StatusCode;
        var result = result.Result;
        var qcresult = JSON.parse(result);
        hasQualityCheck = qcresult.qclist[0].Qc;

    });
}
///////////////////////////////////////////#endregion///////////////////////////////////////////////////////////////////////////////
function skuForGrnSearch(strCurrentOrder) {
    debugger;
    if ($('#hdnrecstatus').val() == 30) {
        alert('This order is already putin!!');
    }
    else {
        var apiPath = wmsApiPath + 'PO/GetPODetail';


        var postData =
        {
            "CustomerId": getCustomerIdInward,
            "WarehouseId": getWarehouseIdInward,
            "UserId": getUserIdInward,
            "OrderId": strCurrentOrder
        };


        // BIND DATA GRID
        var gridTable = '';

        // GRID HEADER
        gridTable = gridTable + '<div class="wms-srv-grid-header" style="text-align:center">';

        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">SKU Code </div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">SKU Name</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Description</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Requested Qty </div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">UOM</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Remaining Qty</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable</div>';
        var getLottable = mBrillWmsSession.getCustomerLottable();
        var breakCustLot = getLottable.split(',');
        for (var lt = 0; lt < breakCustLot.length; lt++) {
            //var grnLotNum = lt + 1;
            gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + lt + '" data-lottype="' + breakCustLot[lt] + '" style="width:82px;text-align:center;display:table-cell;">' + breakCustLot[lt] + '</div>';
        }
        //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable</div>';
        //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Case Net Weight</div>';
        //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Case Gross Weight</div>';
        //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Total Carton</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Action</div>';
        gridTable = gridTable + '</div>';
        // GRID HEADER



        $('#skuForGrnSearchGrid').html(gridTable);
        if (strCurrentOrder != '0') {
            callHttpUrl(apiPath, postData, function (data) {

                var getStatus = data.Status;
                var getStatusCode = data.StatusCode;
                if (getStatusCode == 'Success') {

                    var getResult = data.Result;

                    var getGridData = getResult.PurchaseOrderDetails;

                    for (var i = 0; i < getGridData.length; i++) {
                        var getId = getGridData[i].Id;
                        var getSkuId = getGridData[i].SkuId;
                        var getItemCode = getGridData[i].ItemCode;
                        var getItemName = getGridData[i].ItemName;
                        var getDescription = getGridData[i].ItemDescription;
                        var getRequestedQty = getGridData[i].RequestedQty;
                        var getUOMList = getGridData[i].UomList;
                        var getUOM = getGridData[i].UOM;
                        var getUOMId = getGridData[i].UOMId;
                        var getOrderQty = getGridData[i].OrderQty;
                        var getLottable = getGridData[i].Lot1;
                        var getCaseNetWeight = getGridData[i].CaseNetWeight;
                        var getGrossWeight = getGridData[i].CaseGrossWeight;
                        var getTotalCarton = getGridData[i].TotalCarton;
                        var isvisible = getGridData[i].isfinal;
                        var getRemQty = getGridData[i].RemainingQty;

                        // GRID ROW
                        gridTable = '';

                        gridTable = gridTable + '<div class="wms-srv-grid-row wmSkuDetailsGrnSearchRow">';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getItemCode + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getItemName + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getDescription + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getRequestedQty + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getUOM + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getRemQty + '</div>';

                        var breakLottable = getLottable.split('|');
                        for (var gl = 0; gl < breakLottable.length; gl++) {
                            var skuLotVal = '';
                            if (breakLottable[gl] != '0') {
                                skuLotVal = breakLottable[gl];
                            }
                            gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + gl + '" data-lottype="' + breakCustLot[gl] + '" style="text-align:center">' + skuLotVal + '</div>';
                        }
                        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">' + getLottable + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><i  class="fas fa-check-circle" onclick="selGrnSku(' + getId + ',' + getSkuId + ',' + getRequestedQty + ',\'' + getItemCode + '\',\'' + getUOM + '\',\'' + getUOMId + '\',\'' + getRemQty + '\',\'' + getLottable + '\');" ></i></div>';
                        gridTable = gridTable + '</div>';
                        // GRID ROW

                        $('#skuForGrnSearchGrid').append(gridTable);
                        showHideLottableCellForGrnSearch();
                    }
                    showGrnDetails();
                }
                else {
                    alert('Unable to connect Server!!');
                }
            });
        } else {
            showGrnDetails();
        }
    }
}

function showHideLottableCellForGrnSearch() {
    var getViewRowCount = $('#skuForGrnSearchGrid .wmSkuDetailsGrnSearchRow').length;
    $('#skuForGrnSearchGrid .gridCellLottable').show();
    for (var l = 0; l < 10; l++) {
        // CHECK FOR VIEW ONLY EMPTY CELL
        var getCell = $('#skuForGrnSearchGrid .wmSkuDetailsGrnSearchRow .gridCellLottable[data-lotindex="' + l + '"]').length;
        var getEmptyCell = $('#skuForGrnSearchGrid .wmSkuDetailsGrnSearchRow .gridCellLottable[data-lotindex="' + l + '"]:empty').length;

        if (getCell > 0) {
            if (getCell != getEmptyCell) {
                $('#skuForGrnSearchGrid .gridCellLottable[data-lotindex="' + l + '"]').show();
            } else {
                $('#skuForGrnSearchGrid .gridCellLottable[data-lotindex="' + l + '"]').hide();
            }
        } else {
            $('#skuForGrnSearchGrid .gridCellLottable[data-lotindex="' + l + '"]').hide();
        }
    }
}
function showGrnDetails() {

    $('#skuForGrnSearchGrid').show();
    $('#skuForGrnSearchGridNew').hide();
    $('#wms-srv-GrnSKuSearch-popup').show();
    $('#wms-srv-GrnSKuSearch-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
    $('#wms-srv-GrnSKuSearch-popup-close').off();
    $('#wms-srv-GrnSKuSearch-popup-close').click(function () {
        $('#wms-srv-GrnSKuSearch-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-GrnSKuSearch-popup').hide();
    });




}
function selGrnSku(getPODTID, getSkuId, getRequestedQty, getItemCode, getUOM, getUOMId, remqty, getLottable) {
    debugger;
    $('#tblgrndetail .wmsFrmAddRow .gridCellLottable').html('');
    $('#txtpoqty').val(getRequestedQty);
    $('#txtgrnqty').val(remqty);
    $('#txtskucode').val(getItemCode);
    $('#txtskucode').attr('data-id', getSkuId);
    $('#hdnPODTID').val(getPODTID);

    GetUomBySKU(getSkuId, getUOMId, objgrn)
    getLottableBySku(getSkuId, objgrn, 0, getLottable)
    $('#wms-srv-GrnSKuSearch-popup .wms-srv-datepicker').datepicker('destroy');
    $('#wms-srv-GrnSKuSearch-popup').hide();
}


function GetGrnPalletList() {
    debugger;
    // var apiPath = wmsApiPath + 'GetPackingMasterList';
    var apiPath = wmsApiPath + 'CommFunAPI/PalletList';


    var getSkey = $('#txtpalletgrnsearch').val();  // ''; // Pass pallet search Filter value here    
    if (getSkey == '') {
        getSkey = 'NoValue';
    }
    var GateGrnHeadId = $('#grnddl').val();
    var postData = {
        "CompanyId": getCompanyIdInward,
        "custId": getCustomerIdInward,
        "whId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "PalletName": getSkey,
        "obj": 'purchasepalletsearch',
        "grnId": GateGrnHeadId,
        "POID": $('#lbpoid').text().trim()
    };

    /* var postData =
     {
         "CurrentPage": "1",
         "RecordLimit": "10",
         "UserId":getUserIdInward,
         "Type":"Store Pallet"
     }*/
    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            $("#tlbgrnPalletMirriorList").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" > <input type="checkbox" onclick="selectAllST(this)"  value="Brcode List" id="SellectAll"> </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Serial No. </div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Packing Type</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> Label Size </div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="width:215px;text-align: center;">Creation Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Action</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < myGridList.Table.length; i++) {
                var GetSerialNo = myGridList.Table[i].PalletName;
                //var getPackingType = myGridList.Table[i].packingtype;
                //var getLabelSize = myGridList.Table[i].Label;
                var getMID = myGridList.Table[i].MID;
                (GetSerialNo).toString();
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" name="" value="' + GetSerialNo + ' "></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> ' + GetSerialNo + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPackingType + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLabelSize + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCreationDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;" onclick=SelectpalletSku(\'' + GetSerialNo + '\',\'' + getMID + '\')><i  class="fas fa-check-circle"  ></i></div>';
                gridTable = gridTable + '</div>';
            }
            $('#tlbgrnPalletMirriorList').html(gridTable);

        }
    });

}
function GetPalletMirrior() {
    debugger;
    GetGrnPalletList()
    $('#wms-srv-GrnPalletMirrior-popup').show();
    $('#wms-srv-GrnPalletMirrior-popup-close').off();
    $('#wms-srv-GrnPalletMirrior-popup-close').click(function () {
        $('#wms-srv-GrnPalletMirrior-popup').hide();
    });

};
function SelectpalletSku(text, PalletID) {

    debugger;
    $('#txtpalletcode').val(text);
    $('#txtpalletcode').attr('data-id', PalletID);
    $('#wms-srv-GrnPalletMirrior-popup').hide();
}

function convertToBarcode(str) {
    var toBarcode = '*' + str + '*';
    //var toBarcode = str;
    return toBarcode;
}

function getSelectedIdForBarcode() {
    var strBarcode = [];
    $('#' + getBarcodeGrid + ' input[type="checkbox"]').each(function () {
        var isSelected = $(this).prop('checked');
        if (isSelected) {
            var getLabel = $(this).val();
            strBarcode.push(getLabel);
        }
    });

    return strBarcode;
}


// function printAlllabel() {
//     debugger;
//     var myBarcode = getSelectedIdForBarcode();

//     if(myBarcode.length > 0){
//         var myBarcodeStr = '';
//         for (var i = 0; i < myBarcode.length - 1; i++) {
//             myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(myBarcode[i + 1]) + '</div>';
//             myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';
//         }
//         $('#grnBarcodeID').html(myBarcodeStr);

//         $('#wms-srv-grnprintbarcode-popup').show();
//         $('#wms-srv-grnprintbarcode-popup-close').off();
//         $('#wms-srv-grnprintbarcode-popup-close').click(function () {
//             $('#wms-srv-grnprintbarcode-popup').hide();

//         });
//     }
//     else{
//         alert("Please select atleast one record..!");
//     }

// }

function selectAllST(obj) {
    debugger;
    var isSelected = $(obj).prop('checked');
    if (isSelected) {
        $('#' + getBarcodeGrid + ' .wms-srv-grid-row input[type="checkbox"]').prop('checked', true);
    }
    else {
        $('#' + getBarcodeGrid + ' .wms-srv-grid-row input[type="checkbox"]').prop('checked', false);
    }
    $('#' + getBarcodeGrid + ' .wms-srv-grid-row input[type="checkbox"]').off();
    $('#' + getBarcodeGrid + '  .wms-srv-grid-row input[type="checkbox"]').click(function () {
        var isSubSelected = $(this).prop('checked');
        if (!isSubSelected) {
            $('#SellectAll').prop('checked', false);
        }
    });
}

function selectAllTransPoter(obj) {
    debugger;
    var isSelected = $(obj).prop('checked');
    if (isSelected) {
        $('#tlbPoGatepassDetailsGrid .wms-srv-grid-row input[type="checkbox"]').prop('checked', true);
    }
    else {
        $('#tlbPoGatepassDetailsGrid .wms-srv-grid-row input[type="checkbox"]').prop('checked', false);
    }
    $('#tlbPoGatepassDetailsGrid .wms-srv-grid-row input[type="checkbox"]').off();
    $('#tlbPoGatepassDetailsGrid .wms-srv-grid-row input[type="checkbox"]').click(function () {
        var isSubSelected = $(this).prop('checked');
        if (!isSubSelected) {
            $('#SellectAll').prop('checked', false);
        }
    });
}

function convertToBarcode(str) {
    var toBarcode = '*' + str + '*';
    return toBarcode;
}

function getSelectedIdForBarcode() {
    var strBarcode = [];
    $('#' + getBarcodeGrid + ' input[type="checkbox"]').each(function () {
        var isSelected = $(this).prop('checked');
        if (isSelected) {
            var getLabel = $(this).val();
            strBarcode.push(getLabel);
        }
    });

    return strBarcode;
}

function printlabel(strBarcode, BatchCode) {
    var myBarcodeStr = '';
    myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(strBarcode) + '</div>';
    $('#grnBarcodeID').html(myBarcodeStr);
    $('#grnBarcodeTxt').html(strBarcode);
    $('#wms-srv-grnprintbarcode-popup').show();
    $('#wms-srv-grnprintbarcode-popup-close').off();
    $('#wms-srv-grnprintbarcode-popup-close').click(function () {
        $('#wms-srv-grnprintbarcode-popup').hide();
        $('#grnBarcodeTxt').html('');

    });
}

function btnPrintSelected(strBarcode, BatchCode) {
    var myBarcodeStr = '';
    myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(strBarcode) + '</div>';
    $('#grnBarcodeID').html(myBarcodeStr);
    $('#grnBarcodeTxt').html(strBarcode);
    $('#wms-srv-grnprintbarcode-popup').show();
    $('#wms-srv-grnprintbarcode-popup-close').off();
    $('#wms-srv-grnprintbarcode-popup-close').click(function () {
        $('#wms-srv-grnprintbarcode-popup').hide();
        $('#grnBarcodeTxt').html('');

    });
}



function printAlllabel() {
    debugger;
    var myBarcode = getSelectedIdForBarcode();
    var getbatchCodeVal = [];
    // getproductCodeVal.push(productCode);
    getbatchCodeVal.push(batchCode);
    // getproductDescVal.push(productDesc);
    // getallLottableVal.push(allLottable);
    // getgrnQtyVal.push(grnQty);

    // var getProdCode = getproductCodeVal(0);
    // alert(getProdCode);

    $("#grnBarcodeID").html('');
    $("#grnBarcodeTxt").html('');
    // alert(getValues.length);


    if (myBarcode.length > 0) {
        var myBarcodeStr = '';
        var isSelected = $('#SellectAll').prop('checked');

        if (isSelected) {

            for (var i = 0; i < myBarcode.length - 1; i++) {
                myBarcodeStr += '<div class="barcodeGrid" style="display: grid">';
                //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Sku Code: </label></div>';
                myBarcodeStr += '<div class="">' + productCode[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Desc: </label></div>';
                myBarcodeStr += '<div class="">' + productDesc[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Batch: </label></div>';
                myBarcodeStr += '<div class="">' + batchCode[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                myBarcodeStr += '<div class="">' + allLottable[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">GRN QTY: </label></div>';
                myBarcodeStr += '<div class="">' + grnQty[i] + '</div></span></br>';
                myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(myBarcode[i + 1]) + '</div>';
                myBarcodeStr += '</div>';
            }
        }
        else {

            for (var i = 0; i < myBarcode.length; i++) {
                myBarcodeStr += '<div>';
                myBarcodeStr += '<div class="barcodeGrid" style="display: grid">';
                //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Sku Code: </label></div>';
                myBarcodeStr += '<div class="">' + productCode[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Desc: </label></div>';
                myBarcodeStr += '<div class="">' + productDesc[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Batch: </label></div>';
                myBarcodeStr += '<div class="">' + batchCode[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                myBarcodeStr += '<div class="">' + allLottable[i] + '</div></span>';
                myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">GRN QTY: </label></div>';
                myBarcodeStr += '<div class="">' + grnQty[i] + '</div></span></br>';
                myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(myBarcode[i + 1]) + '</div>';
                myBarcodeStr += '</div>';
                myBarcodeStr += '</div>';

            }
        }
        $('#grnBarcodeID').html(myBarcodeStr);

        $('#wms-srv-grnprintbarcode-popup').show();
        $('#wms-srv-grnprintbarcode-popup-close').off();
        $('#wms-srv-grnprintbarcode-popup-close').click(function () {
            //clearArrayVal();
            $('#wms-srv-grnprintbarcode-popup').hide();

        });
    }
    else {
        alert("Please select atleast one record..!");
    }
}




function bindLableStorePalletActionControl(i) {
    debugger;
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
    htmlControl = htmlControl + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" onClick="printlabel(\'' + i + '\',\'' + 0 + '\');return false;"><i class="fas fa-eye"></i></a>';
    htmlControl = htmlControl + ' </div>';

    return htmlControl;
}

function printbarcode() {
    debugger;
    $('#btngrnPrint').hide();
    window.print();
    $('#btngrnPrint').show();
}

function clearArrayVal() {
    myBarcodeStr = '';
    productCode = [];
    productDesc = [];
    allLottable = [];
    batchCode = [];
    grnQty = [];
}

function clearGetPassPoup() {
    getPoHead = {

    };
    gtpInReceiptDate = '';
    gtpInboundReceiptDate = '';
    gtpExpDelivery = '';
    gtpExpDeliveryDate = '';
    gtpVendorName = '';
    gtpVendorId = '';
    $('#btnSaveGrnTransport').attr('data-id');
    $('#txtgetPassId').val('');
    $("#hdnUserID").val('');
    $('#txtAirwayBill').val('');
    $('#txtShippingType').val('');
    $('#txtShippingDate').val('');
    $('#txtExpDeliveryDate').val('');

    $('#txtTransporterName option:selected').html('');
    $('#txtTransporterName option:selected').val('');
    $('#txtTransporterRemark').val('');
    $('#txtDockNo option:selected').html('');
    $('#txtDockNo option:selected').val('');
    $("#txtDockNo").val(0);
    $('#txtTruckNo').val('');
    $('#txtLrNo').val('');
    $('#txtInTime').val('');
    $('#txtOutTime').val('');
    $('#txtContainerId').val('');
    $('#txtTrailer').val('');
    $('#txtSeal').val('');
    $('#txtCarrier').val('');

}