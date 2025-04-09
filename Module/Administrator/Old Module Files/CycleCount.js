var getCycleCountID1 = "";
var strCurrentPage = '1';
var getTotalRecords = '100'; //use variable 
var getStatusName;
var searchfilter = "0";
var searchvalue = "0";
var getCycleEditId = "0";
var getCycleCount;
var getUserName = mBrillWmsSession.getUserName();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
//var getClientId = mBrillWmsSession.getClientId();
var getCompanyID = mBrillWmsSession.getCompanyId();

getBarcodeGrid = "tblgrndetail";

var globalorderid = "0";

function initCycleCount() {
    CycleCountList(strCurrentPage, searchfilter, searchvalue);
}
function clearSearchFilter() {
    $('#ddlCycleCountSearch').val('ALL');
    $('#txtCycleCountSearch').val('');
    CycleCountList(strCurrentPage, searchfilter, searchvalue);
}
function CycleCountList(strCurrentPage, searchfilter, searchvalue) {

    debugger;
    var apiPath = wmsApiPath + 'CycleCount/CycleCountList';
    var searchfilter = $('#ddlCycleCountSearch').val() || '0';
    var searchvalue = $('#txtCycleCountSearch').val() || '0';

    if (searchfilter == '') {
        searchfilter = '0';
        searchvalue = '0';
    }

    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": getTotalRecords,
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "Search": searchfilter,
        "Filter": searchvalue
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;

            var getTotalRecords = gridList.Table[0].TotalRecord;
            // var strCurrentPage = gridList.Table[0].CurrentPage;
            $("#GridBind").html();
            var gridTable = "";

            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width:115px;text-align: center;">Plan Id</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Plan Title</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Count Basis</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Status</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Active</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < gridList.Table1.length; i++) {
                var getCycleCountID = gridList.Table1[i].ID
                var getPlanID = gridList.Table1[i].PlanID;
                var getPlanTitle = gridList.Table1[i].PlanTitle;
                var getDate = gridList.Table1[i].Date;
                var getCountBasis = gridList.Table1[i].CountBasis;
                var getStatusName = gridList.Table1[i].StatusName;
                var getActive = gridList.Table1[i].Active;
                //var getAction = gridList.Table.Action;
                //  GRID ROW

                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getCycleCountID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPlanID + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPlanTitle + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCountBasis + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getStatusName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActive + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick=EditCycleCount(' + getCycleCountID + ');></i>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                //gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                getCycleCountID1 = getCycleCountID;
            }

            $("#GridBind").html(gridTable);

            setupGridPagingList('pagingCycleCount', strCurrentPage, getTotalRecords, CycleCountList);
        }
        else {
            alert('unable to conect server');
        }
    });
}

function CycleCountEditList(getCycleCountID1) {

    //debugger;
    getCycleEditId = getCycleCountID1;
    var apiPath = wmsApiPath + "CycleCount/CycleCountEdit";
    var postData =
    {
        "UserId": "1",
        "CountHeadID": getCycleCountID1
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var popup = data.Result.Table;
        if (getStatus == 200) {
            getID = popup.ID;
            getPlanID = popup[0].PlanID;
            getPlanTitle = popup[0].PlanTitle;
            getDate = popup[0].Date;
            getCountBasis = popup[0].CountBasis;
            getStatus = popup[0].Status;
            getActive = popup[0].Active;
            // $("#").val(getID)
            $('#txtPlanID').val(getPlanID);
            $('#txtPlanTitle').val(getPlanTitle);
            $('#txtDate').val(getDate);
            $('#txtCountBasis').val(getCountBasis);
            $('#ddlStatus').val(getStatus);
            $('#chkActive').val(getActive);

            if (getActive == "yes") {
                $('input[type="checkbox"]').prop('checked', true);
            }
            else {
                $('').prop('checked', false);
            }
        }
        else {
            alert('Unable to connect Server!!');
        }
        CycleCountDetailList(strCurrentPage, getCycleCountID1);
    });
}

function SearchCycleCount() {
    debugger;
    searchfilter = $('#ddlCycleCountSearch').val();
    searchvalue = $('#txtCycleCountSearch').val();

    if (searchvalue == '') {
        alert('Please Enter value for filter');
    }
    else {
        CycleCountList(strCurrentPage, searchfilter, searchvalue);
    }
    if (searchfilter == '' && searchvalue == '') {
        CycleCountList(strCurrentPage, searchfilter, searchvalue)
    }
}



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


function selectAllCyclecount(obj) {
    debugger;
    var isSelected = $(obj).prop('checked');
    if (isSelected) {
        $('#PopupGridBind .wms-srv-grid-row input[type="checkbox"]').prop('checked', true);
    }
    else {
        $('#PopupGridBind .wms-srv-grid-row input[type="checkbox"]').prop('checked', false);
    }
    $('#PopupGridBind .wms-srv-grid-row input[type="checkbox"]').off();
    $('#PopupGridBind .wms-srv-grid-row input[type="checkbox"]').click(function () {
        var isSubSelected = $(this).prop('checked');
        if (!isSubSelected) {
            $('#SellectAll').prop('checked', false);
        }
    });
}


function CycleCountDetailList(strCurrentPage, getCycleCount) {
    debugger;
    var strCurrentPage = "1";
    var apiPath = wmsApiPath + 'CycleCount/CycleCountdetail';

    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": getTotalRecords,
        "UserId": "1",
        "CountHeadID": getCycleCount,
        "Search": "0",
        "Filter": "0"
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getLottable = mBrillWmsSession.getCustomerLottable();
        var breakCustLot = getLottable.split(',');

        var getStatus = data.Status;
        if (getStatus == 200) {
            // debugger;
            var gridList = data.Result;
            var getTotalRecords = gridList.Table[0].TotalRecord;
            $("#PopupGridBind").html();
            var gridTable = "";
            // HTML Grid Table Header Bind

            // gridTable = gridTable + '<div class="wms-srv-grid-header">';

            gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow grnheadboxdetail">';

            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><input type="checkbox" onclick="selectAllCyclecount(this)" id="SellectAll" value=""></div>';

            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Location</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Pallet</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">SKU Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">System Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Allocated Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Actual Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Difference Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Adjutment Qty</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Adjutment Loc</div>';
            for (var pl = 0; pl < breakCustLot.length; pl++) {
                var custLotLabel = breakCustLot[pl];
                gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + custLotLabel + '">' + custLotLabel + '</div>';
            }
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Remark</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Reason</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < gridList.Table1.length; i++) {
                var getSRNo = gridList.Table1[i].rownumber;
                var getId = gridList.Table1[i].Tcycleid;
                var getProdId = gridList.Table1[i].SKUID;
                var getLocation = gridList.Table1[i].Location;
                var getPallet = gridList.Table1[i].Pallet;
                var getSKUCode = gridList.Table1[i].SkuCode;
                var getSystemQty = gridList.Table1[i].SystemQty;
                var getAllocatedQty = gridList.Table1[i].AllocatedQty;
                var getActualQty = gridList.Table1[i].ActualQty;
                var getDifferenceQty = gridList.Table1[i].DifferenceQty;
                var getAdjutmentQty = gridList.Table1[i].AdjustmentQty;
                var getAdjutmentLoc = gridList.Table1[i].AdjustLocation;

                var getLottableGroup = [];
                getLottableGroup.push(gridList.Table1[i].Lottable1);
                getLottableGroup.push(gridList.Table1[i].Lottable2);
                getLottableGroup.push(gridList.Table1[i].Lottable3);
                getLottableGroup.push(gridList.Table1[i].Lottable4);
                getLottableGroup.push(gridList.Table1[i].Lottable5);
                getLottableGroup.push(gridList.Table1[i].Lottable6);
                getLottableGroup.push(gridList.Table1[i].Lottable7);
                getLottableGroup.push(gridList.Table1[i].Lottable8);
                getLottableGroup.push(gridList.Table1[i].Lottable9);
                getLottableGroup.push(gridList.Table1[i].Lottable10);

                var getRemark = gridList.Table1[i].Remark;
                var getReason = gridList.Table1[i].Reason;
                //  GRID ROW


                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align wmSkuDetailsGrnRow" id="lbpoid">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" class="chkGrnDetails" value="' + getSKUCode + ' " data-dtid="' + getId + '" data-prodid = "' + getProdId + '" data-prodcode="' + getSKUCode + '" data-palletname="' + getPallet + '" data-sysqty="' + getSystemQty + '" data-actualqty="' + getActualQty + '" data-lottables="' + getLottable + '"></div>';


                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getLocation + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPallet + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSKUCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSystemQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAllocatedQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActualQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getDifferenceQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAdjutmentQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAdjutmentLoc + "</div>";
                for (var pi = 0; pi < breakCustLot.length; pi++) {
                    var custLotLabel = breakCustLot[pi];
                    var custLotVal = getLottableGroup[pi];
                    if (custLotVal != null && custLotVal.trim() == '0') {
                        custLotVal = '';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + pi + '" data-lottype="' + custLotLabel + '" style="width: 82px; text-align: center;">' + custLotVal + '</div>';
                }
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getRemark + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getReason + "</div>";
                gridTable = gridTable + '</div>';
            }
            $("#PopupGridBind").html(gridTable);
            showHideLotCellForCycleCountRow();
            setupGridPagingList('CycleCountDetail', strCurrentPage, getTotalRecords, CycleCountDetailList);
        }
        else {
            alert('unable to connect server');
        }
    });
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

function getSelectedIdForBarcodeCyclecount() {
    debugger;
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



function getCyclountdeatilSelectedIdForBarcodeCyclecount() {
    debugger;
    var strBarcodecye = [];
    //var SelectedId = document.getElementById("hdnGrnIdForBarcode");
    $("input[class='chkGrnDetails']").each(function () {
        if ($(this).prop("checked") == true) {
            var SkuId = $(this).attr("data-dtid");
            //    if(SelectedId.value == "") {
            strBarcodecye.push(SkuId);
            // }else{
            //     SelectedId.value = SelectedId.value + "," +SkuId;
            // }
        }
    });
    return strBarcodecye;
}



function getSelectedDTIDForBarcodeGRN() {
    debugger;
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

// main function for Lebel Print

var printableData = [];
function printBarcodeLabelForCycleCount() {
    debugger;
    printableData = [];
    var arrdetailid = getCyclountdeatilSelectedIdForBarcodeCyclecount()
    var isValidForPrint = validateForGRNSerialSelect();
    var arrSkuId = getSelectedIdForBarcodeCyclecount();

    $('#txtPrintBarcodeTypeTransport').val('1D - 128');
    if (arrSkuId.length > 0) {
        if (isValidForPrint) {
            var currentPrintLabelType = $('#hdnCurrentLabelPrintType').val();

            // var OrderId = $('#btnPrintCycleBarcodeLabel').attr('data-orderid');
            var OrderId = getCycleEditId
            if (currentPrintLabelType != 'serial') {
                var grpSkuId = '';
                for (var i = 0; i < arrSkuId.length; i++) {
                    if (grpSkuId == '') {
                        grpSkuId = arrSkuId[i];
                    } else {
                        grpSkuId = grpSkuId + ',' + arrSkuId[i];
                    }
                }

                var grpDetailId = '';
                for (var i = 0; i < arrdetailid.length; i++) {
                    if (grpDetailId == '') {
                        grpDetailId = arrdetailid[i];
                    } else {
                        grpDetailId = grpDetailId + ',' + arrdetailid[i];
                    }
                }

                //var grpDTId = getSelectedDTIDForBarcodeGRN();


                // var GateGrnHeadId = $('#grnddl').val();
                var apiPath = wmsApiPath + 'GRN/GetBarcodePrintData';
                var postData = {
                    "SkuId": grpSkuId,
                    "OrderId": OrderId,
                    "objectType": "CycleCount",
                    "objectId": OrderId,
                    "DTID": grpDetailId
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
                        getPrintTemplateForCustomer('GatePass', false);
                    }
                });
            } else {
                var arrSkuId = getSelectedIdForBarcodeGRN();
                if (arrSkuId.length == 1) {
                    $('#grnBarcodeID').html('');
                    var getSubObjectId = $('#grnddl').val();
                    generateSerialNoLabel(OrderId, 'GatePass', getSubObjectId, 'No');
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

function showHideLotCellForCycleCountRow() {
    var getTotalLotRowCount = $('#PopupGridBind .wms-srv-grid-row ').length;
    $('#PopupGridBind .gridCellLottable').show();
    for (var l = 0; l < 10; l++) {
        // CHECK FOR VIEW ONLY EMPTY CELL
        var totalCell = $('#PopupGridBind .wms-srv-grid-row .gridCellLottable[data-lotindex="' + l + '"]').length;
        var totalEmptyCell = $('#PopupGridBind .wms-srv-grid-row .gridCellLottable[data-lotindex="' + l + '"]:empty').length;

        if (totalCell > 0) {
            if (totalCell != totalEmptyCell) {
                $('#PopupGridBind .gridCellLottable[data-lotindex="' + l + '"]').show();
            } else {
                $('#PopupGridBind .gridCellLottable[data-lotindex="' + l + '"]').hide();
            }
        } else {
            $('#PopupGridBind .gridCellLottable[data-lotindex="' + l + '"]').hide();
        }
    }
}



function UpdateCycleCountDetail() {
    debugger;
    getStatusName = $("#ddlStatus").val();
    var getActive = $("#chkActive").is(":checked");
    if (getActive == true) {
        getActive = 'Yes';
    }
    else {
        getActive = 'No';
    }
    var apiPath = wmsApiPath + "CycleCount/CycleCountUpdate";
    var postData =
    {
        "UserId": "1",
        "Active": getActive,
        "StatusName": getStatusName,
        "CycleCountId": getCycleEditId
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            var myGridList = data.Result.Table;
            CycleCountList(strCurrentPage, searchfilter, searchvalue);
            alert('Record Updated Successfully');
            HideCycleCountDetail();
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function HideCycleCountDetail() {
    $('#wms-srv-order-popup').hide();
    CycleCountList(strCurrentPage, searchfilter, searchvalue);
}

function EditCycleCount(getCycleCountID1) {
    CycleCountEditList(getCycleCountID1)

    $('#wms-srv-order-popup').show();
    $('#wms-srv-order-popup-close').off();
    $('#wms-srv-order-popup-close').click(function () {
        $('#wms-srv-order-popup').hide();
    });
}



function printlabel(strBarcode, BatchCode) {
    debugger;
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
    debugger;
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


function convertToBarcode(str) {
    debugger;
    var toBarcode = '*' + str + '*';
    return toBarcode;
}

function getSelectedIdForBarcode() {
    debugger;
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


