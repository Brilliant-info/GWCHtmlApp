wmsLoadLayout(function () {
    initLabel();
});
// Variable to store input feild

// save Functionality
//var wmsApiPath = 'http://173.212.244.46/WebAPITest/api/staging/v1/';

var getUserId = mBrillWmsSession.getUserId();
var getLabelType = "";
var getBarcodeGrid = '';
var getBarcodeSizeDropDownId = '';
var getCompanyId = mBrillWmsSession.getCompanyId();
var LblgetCustomerID = $("#ddlcustomer").val();
var warehouseid = $('#ddlwarehouse').val();
var strCurrentPage = '1';
var getTotalRecords = '10';
var getLabelSize = '';





function bindLableStorePalletActionControl(i) {
    debugger;
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
    htmlControl = htmlControl + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" onClick="printlabel(\'' + i + '\',\'' + getLabelSize + '\');return false;"><i class="fas fa-eye"></i></a>';
    htmlControl = htmlControl + ' </div>';

    return htmlControl;


}
/*
function bindLableStorePalletActionControl11(i) 
{
    debugger;
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
    htmlControl = htmlControl + '<a href="#" title="OpenPrintBarcode" class="wms-srv-icononly" onClick="printlabel11(\'' + i + '\');return false;"><i class="fas fa-eye"></i></a>';
    htmlControl = htmlControl + ' </div>';
    return htmlControl;
}
*/

function printlabel11(strBarcode) {
    var myBarcodeStr = '';
    myBarcodeStr += '<div class="BarcodeBoxHolder"><div class="BarcodeBox">' + convertToBarcode(strBarcode) + '</div></div>';
    $('#BarcodeID').html(myBarcodeStr);
    $('#BarcodeTxt').html(strBarcode);
    $('#wms-srv-printbarcode-popup').show();
    $('#wms-srv-printbarcode-popup-close').off();
    $('#wms-srv-printbarcode-popup-close').click(function () {
        $('#wms-srv-printbarcode-popup').hide();
        $('#BarcodeTxt').html('');

    });
}
// Show & Hide  Popups
function initLabel() {

    $('#btnLabelPrintBOX').click(function () {
        debugger;
        getBarcodeGrid = "tlbBOXList";
        getBarcodeSizeDropDownId = 'ddlBOXLabelSize';
        getLabelType = "BOX";
        $('#wms-srv-BOX-popup').show();
        $('#wms-srv-BOX-popup-close').off();
        $('#wms-srv-BOX-popup-close').click(function () {
            $('#wms-srv-BOX-popup').hide();
        });
    });
    $('#btnLabelPrintCrate').click(function () {
        debugger;
        getBarcodeGrid = "tlbCrateList";
        getBarcodeSizeDropDownId = 'ddlCrateLabelSize';
        getLabelType = "Crate";
        $('#wms-srv-Crate-popup').show();
        $('#wms-srv-Crate-popup-close').off();
        $('#wms-srv-Crate-popup-close').click(function () {
            $('#wms-srv-Crate-popup').hide();
        });
    });
    $('#btnLabelPrintContainer').click(function () {
        getBarcodeGrid = "tlbContainerList";
        getBarcodeSizeDropDownId = 'ddlContainerLabelSize';
        getLabelType = "Container";
        $('#wms-srv-Container-popup').show();
        $('#wms-srv-Container-popup-close').off();
        $('#wms-srv-Container-popup-close').click(function () {
            $('#wms-srv-Container-popup').hide();
        });
    });

    $('#btnLabelPrintStorePallet').click(function () {
        getBarcodeGrid = "tlbStorePalletList";
        getBarcodeSizeDropDownId = 'ddlLabelSize';
        getLabelType = "Store Pallet";
        $('#wms-srv-storePalletLabel-popup').show();
        $('#wms-srv-storePalletLabel-popup-close').off();
        $('#wms-srv-storePalletLabel-popup-close').click(function () {
            $('#wms-srv-storePalletLabel-popup').hide();
        });

    });
    $('#btnLabelPrintShippingPallet').click(function () {
        getBarcodeGrid = "tlbLableShipping";
        getBarcodeSizeDropDownId = 'txtLabelSizeShipping';
        getLabelType = "Shipping Pallet";
        $('#wms-srv-shippingPalletLabel-popup').show();
        $('#wms-srv-shippingPalletLabel-popup-close').off();
        $('#wms-srv-shippingPalletLabel-popup-close').click(function () {
            $('#wms-srv-shippingPalletLabel-popup').hide();
        });
    });
    $('#btnLabelPrintCarton').click(function () {
        getBarcodeGrid = "tlbNewCartan";
        getBarcodeSizeDropDownId = 'txtLabelSizeCartan';
        getLabelType = "Carton";
        $('#wms-srv-carton-popup').show();
        $('#wms-srv-carton-popup-close').off();
        $('#wms-srv-carton-popup-close').click(function () {
            $('#wms-srv-carton-popup').hide();
        });
    });
    $('#btnLabelPrintLocation').click(function () {
        getBarcodeGrid = "tlbNewLocation";
        getBarcodeSizeDropDownId = 'ddlLocationLabelSize';
        getLabelType = "Location";
        GetLocationList(strCurrentPage);
        $('#wms-srv-location-popup').show();
        $('#wms-srv-location-popup-close').off();
        $('#wms-srv-location-popup-close').click(function () {
            $('#wms-srv-location-popup').hide();
            $('#txtSearchlocatPType').val('');
        });
    });
    $('#btnLabelPrintSku').click(function () {
        getBarcodeGrid = "tlbNewSKU";
        getBarcodeSizeDropDownId = 'ddlSKULabelSize';
        getLabelType = "Sku";
        $('#wms-srv-sku-popup').show();
        getSkuList(strCurrentPage)
        $('#wms-srv-sku-popup-close').off();
        $('#wms-srv-sku-popup-close').click(function () {
            $('#wms-srv-sku-popup').hide();
            $('#txtSearchForPoSku').val('');
        });
    });

}
//  End Of Show & Hide  Popups

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

function printlabel(strBarcode) {

    var myBarcodeStr = '';
    /*
    if(getLabelSize == '4X2')
    {
        myBarcodeStr += '<div class="BarcodeBox BarcodeTxt" style="font-size: 400%;">' + convertToBarcode(strBarcode) + '</div>';
        //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;"></div>';
    }
    else if(getLabelSize == '4X6')
    {
        myBarcodeStr += '<div class="BarcodeBox BarcodeTxt" style="font-size: 800%;">' + convertToBarcode(strBarcode) + '</div>';
        //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;"></div>';
    }
    */
    myBarcodeStr += '<div class="BarcodePage"><div class="BarcodeBoxHolder"><div class="BarcodeBox">' + convertToBarcode(strBarcode) + '</div></div>';
    myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + strBarcode + '</div></div>';

    //myBarcodeStr += '<div class="BarcodeBox">' + convertToBarcode(strBarcode) + '</div>';
    $('#BarcodeID').html(myBarcodeStr);
    var getPaperPageMargin = getPaperPrintMargin();
    var getPrintSize = getPrintSizeFromDropDown();
    var getPaperPageSize = getPaperPrintSizeForCSS(getPrintSize);
    $('#BarcodeID').attr('data-printsize', getPrintSize);

    //$('#BarcodeTxt').html(strBarcode);
    $('#wms-srv-printbarcode-popup').show();
    $('#wms-srv-printbarcode-popup-close').off();
    $('#wms-srv-printbarcode-popup-close').click(function () {
        $('#wms-srv-printbarcode-popup').hide();
        $('#BarcodeTxt').html('');

    });
}

function printAlllabel() {
    debugger;
    var myBarcode = getSelectedIdForBarcode();
    var myBarcodeStr = '';
    var isSelected = $('#SellectAll').prop('checked');
    if (isSelected) {
        for (var i = 0; i < myBarcode.length - 1; i++) {
            myBarcodeStr += '<div class="BarcodePage"><div class="BarcodeBoxHolder"><div class="BarcodeBox">' + convertToBarcode(myBarcode[i + 1]) + '</div></div>';
            myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div></div>';
        }

    }
    else {
        for (var i = 0; i < myBarcode.length; i++) {
            myBarcodeStr += '<div class="BarcodePage"><div class="BarcodeBoxHolder"><div class="BarcodeBox">' + convertToBarcode(myBarcode[i]) + '</div></div>';
            myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i] + '</div></div>';
        }
    }
    $('#BarcodeID').html(myBarcodeStr);


    var getPaperPageMargin = getPaperPrintMargin();
    var getPrintSize = getPrintSizeFromDropDown();
    var getPaperPageSize = getPaperPrintSizeForCSS(getPrintSize);
    $('#BarcodeID').attr('data-printsize', getPrintSize);

    $('#wms-srv-printbarcode-popup').show();
    $('#wms-srv-printbarcode-popup-close').off();
    $('#wms-srv-printbarcode-popup-close').click(function () {
        $('#wms-srv-printbarcode-popup').hide();
    });
}



// Store Pallet
function savebtn() {
    var apiPath = wmsApiPath + "SavePackingMaster";

    var txtLabelRange = $('#txtLabelRange').val();
    var txtLabelSize = $('#ddlLabelSize').val();
    var txtLabelPrinter = $('#txtLabelPrinter').val();

    var postData =
    {
        "CompanyId": getCompanyId,
        "UserId": getUserId,
        "Type": getLabelType,
        "label": txtLabelSize,
        "Number": txtLabelRange


    }



    callHttpUrl(apiPath, postData, function (data) {

        GetPackingMasterList(txtLabelRange);
    });
}
function GetPackingMasterList(txtLabelRange) {
    debugger;
    var apiPath = wmsApiPath + 'GetPackingMasterList';

    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": txtLabelRange,
        "UserId": getUserId,
        "Type": getLabelType
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $("#tlbStorePalletList").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="checkbox" onclick="selectAllST(this)"  id="SellectAll"> </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Serial No. </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Packing Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> Label Size </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="width:215px;text-align:center;">Creation Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell wms-align" style="text-align:center;">Action</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < myGridList.Table.length; i++) {
                var GetSerialNo = myGridList.Table[i].Serialno;
                var getPackingType = myGridList.Table[i].packingtype;
                var getLabelSize = myGridList.Table[i].Label;
                var getCreationDate = myGridList.Table[i].Creationdate;

                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" id="btnCheckStatus"><input type="checkbox" class="messageCheckbox11"  value="' + GetSerialNo + ' "></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> ' + GetSerialNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPackingType + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLabelSize + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCreationDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(GetSerialNo, getLabelSize) + '</div>';
                gridTable = gridTable + '</div>';
            }
            $('#tlbStorePalletList').html(gridTable);

        }
    });

}
//End Of Store Pallet


// Cartan Pallet
function cartansavebtn() {
    debugger;
    var apiPath = wmsApiPath + "SavePackingMaster";

    var txtLabelRange = $('#txtLabelRangeCartan').val();
    var txtLabelSize = $('#txtLabelSizeCartan').val();
    var txtLabelPrinter = $('#txtLabelPrinterCartan').val();

    var postData =
    {
        "CompanyId": getCompanyId,
        "UserId": getUserId,
        "Type": getLabelType,
        "label": txtLabelSize,
        "Number": txtLabelRange


    }



    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        GetPackingMasterListCartan(txtLabelRange);
    });
}
function GetPackingMasterListCartan(txtLabelRange) {
    debugger;
    var apiPath = wmsApiPath + 'GetPackingMasterList';

    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": txtLabelRange,
        "UserId": getUserId,
        "Type": getLabelType
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $("#tlbNewCartan").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" > <input type="checkbox"   onclick="selectAllST(this)" id="SellectAll"> </div>';
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
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" id="btnCheckStatus" ><input type="checkbox"  class="messageCheckbox11" value="' + GetSerialNo + ' "></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> ' + GetSerialNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPackingType + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLabelSize + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCreationDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(GetSerialNo, getLabelSize) + '</div>';
                gridTable = gridTable + '</div>';
            }
            $('#tlbNewCartan').html(gridTable);

        }
    });

}
//End Of Cartan Pallet


// Cartan Pallet
function Shippingsavebtn() {
    debugger;
    var apiPath = wmsApiPath + "SavePackingMaster";

    var txtLabelRange = $('#txtLabelRangeShipping').val();
    var txtLabelSize = $('#txtLabelSizeShipping').val();
    var txtLabelPrinter = $('#txtLabelPrinterShipping').val();

    var postData =
    {
        "CompanyId": getCompanyId,
        "UserId": getUserId,
        "Type": getLabelType,
        "label": txtLabelSize,
        "Number": txtLabelRange


    }



    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        GetPackingMasterListShipping(txtLabelRange);
    });
}
function GetPackingMasterListShipping(txtLabelRange) {
    debugger;
    var apiPath = wmsApiPath + 'GetPackingMasterList';

    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": txtLabelRange,
        "UserId": getUserId,
        "Type": getLabelType
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $("#tlbLableShipping").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" > <input type="checkbox" onclick="selectAllST(this)"   id="SellectAll" > </div>';
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
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" id="btnCheckStatus"><input type="checkbox"  class="messageCheckbox11" value="' + GetSerialNo + ' "></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> ' + GetSerialNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPackingType + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLabelSize + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCreationDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(GetSerialNo, getLabelSize) + '</div>';
                gridTable = gridTable + '</div>';
            }
            $('#tlbLableShipping').html(gridTable);

        }
    });

}
//End Of Cartan Pallet


//Location List
function GetLocationList(strCurrentPage) {
    debugger;

    var searchlocationvaluecam = $('#txtSearchlocatPType').val()
    if (searchlocationvaluecam != '') {
        var searchlocationvalue = 'Code';
        var searchlocationfilter = searchlocationvaluecam;

    }
    else {
        searchlocationvalue = '0';
        searchlocationfilter = '0';


    }

    debugger;
    apiPath = wmsApiPath + 'Warehouse/LocationList'

    postData = {

        CurrentPage: strCurrentPage,
        recordlimit: getTotalRecords,
        CompanyId: getCompanyId,
        UserId: getUserId,
        CustomerId: LblgetCustomerID,
        WarehouseId: warehouseid,
        Search: searchlocationvalue,
        Filter: searchlocationfilter
    }
    callHttpUrl(apiPath, postData, function (data) {

        getStatus = data.Status
        myGridList = data.Result
        gridTable = '';
        if (getStatus == 200) {

            $('#tlbNewLocation').html('')
            var getTotalRecords = myGridList.Table[0].TotalRecord;
            var currentPage = myGridList.Table[0].CurrentPage;

            gridTable = gridTable + '  <div class="wms-srv-grid-header">';
            gridTable = gridTable + '  <div class="wms-srv-grid-cell"><input type="checkbox"  onclick="selectAllST(this)" id="SellectAll"> </div>';
            gridTable = gridTable + '  <div class="wms-srv-grid-cell">Location Id</div>';
            gridTable = gridTable + '  <div class="wms-srv-grid-cell">Building</div>';
            gridTable = gridTable + '  <div class="wms-srv-grid-cell">Floor</div>';
            gridTable = gridTable + '  <div class="wms-srv-grid-cell">Passage</div>';
            gridTable = gridTable + '  <div class="wms-srv-grid-cell">Section</div>';
            gridTable = gridTable + '  <div class="wms-srv-grid-cell">Shelf</div>';
            gridTable = gridTable + '   <div class="wms-srv-grid-cell">Location</div>';
            gridTable = gridTable + '   <div class="wms-srv-grid-cell">Location Code</div>';
            gridTable = gridTable + '   <div class="wms-srv-grid-cell">Sort Code</div>';
            gridTable = gridTable + '   <div class="wms-srv-grid-cell">Zone Location</div>';
            gridTable = gridTable + '   <div class="wms-srv-grid-cell">Capacity In</div>';
            gridTable = gridTable + '   <div class="wms-srv-grid-cell">Capacity</div>';
            gridTable = gridTable + '   <div class="wms-srv-grid-cell">Active</div>';
            gridTable = gridTable + '  <div class="wms-srv-grid-cell">Action</div>';
            gridTable = gridTable + '  </div>';

            for (var i = 0; i < myGridList.Table1.length; i++) {

                var getLocationId = myGridList.Table1[i].MID;
                var getLocationType = myGridList.Table1[i].Locationvalue;
                var getLocationTypeId = myGridList.Table1[i].LocationType;
                var getZoneType = myGridList.Table1[i].ZoneValue;
                var getZoneTypeID = myGridList.Table1[i].ZoneType
                var LocationListId = myGridList.Table1[i].MID;
                var getLocationCode = myGridList.Table1[i].LocationCode;
                var getSortCode = myGridList.Table1[i].SortCode;
                var getNumber = myGridList.Table1[i].number;
                var getlength = myGridList.Table1[i].length;
                var getWidth = myGridList.Table1[i].width;
                var getHeight = myGridList.Table1[i].height;
                var getCompany = myGridList.Table1[i].Company;
                var getShelf = myGridList.Table1[i].Shelf;
                var getSection = myGridList.Table1[i].Section;
                var getPathway = myGridList.Table1[i].Pathway;
                var getFloar = myGridList.Table1[i].Floor;
                var getBuilding = myGridList.Table1[i].Building;
                var getCapacityIn = myGridList.Table1[i].CapacityIn;
                var getCapacity = myGridList.Table1[i].Capacity;
                var getCapacityValue = myGridList.Table1[i].capacityvalue;
                var getCapacityID = myGridList.Table1[i].CapacityIn;
                var getWarehouseName = myGridList.Table1[i].WarehouseName;
                var getWarehouseCode = myGridList.Table1[i].Code;
                var getCompanyID = myGridList.Table1[i].CompanyID;
                var getWarehouseRemark = myGridList.Table1[i].Section;
                var geActive = myGridList.Table1[i].Active;



                gridTable = gridTable + '  <div class="wms-srv-grid-row">';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell" id="btnCheckStatus"><input type="checkbox"  class="messageCheckbox11" value="' + getLocationCode + '"></div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getLocationId + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getBuilding + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getFloar + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getPathway + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getSection + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getShelf + '</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">' + getLocationType + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getLocationCode + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getSortCode + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getZoneType + '</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">' + getCapacityIn + '</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">' + getCapacity + '</div>';
                gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + geActive + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(getLocationCode) + '</div>';
                // gridTable = gridTable + '  <div class="wms-srv-grid-action"><i class="fas fa-eye"></i>';


                gridTable = gridTable + '  </div>';
                gridTable = gridTable + '  </div>';


                $('#tlbNewLocation').html(gridTable)

            }
            setupGridPagingList('LabellocationListSOGridPager', strCurrentPage, getTotalRecords, GetLocationList);

        }



    });
}
// function setupGridPaginglabellocation(gridObjId, strCurrentPage, getTotalRecords, callBackFunction) {
//     var global_max_record_count = 10;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 10) + 1;
//     var recordTo = recordFrom + 9;
//     var totalRecord = Number(getTotalRecords);
//     var pagerLinks = '';

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

//     /* Add Page linke for remaining record */
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
//     /* Add Page linke for remaining record */
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
//     // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//     //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//     pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//     $('#LabellocationListSOGridPager .wms-srv-pager-links a').off();
//     $('#LabellocationListSOGridPager .wms-srv-pager-links a').click(function () {
//         var getDataPage = $(this).attr('data-page');
//         if (callBackFunction != null) {

//             callBackFunction(getDataPage);
//         }
//     });

//     $('#LabellocationListSOGridPager a.wms-srv-pager-go').off();
//     $('#LabellocationListSOGridPager a.wms-srv-pager-go').click(function () {
//         var getDataPage = $('#LabellocationListSOGridPager input[name="txtGridPageNo"]').val();
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
function GetLocationListKeyDown(strCurrentPage) {
    debugger;

    searchlocationvalue = $('#txtSearchlocatPType').val()
    if (searchlocationvalue == '') {
        searchlocationvalue = '0';
        searchlocationfilter = '0';

        debugger;
        apiPath = wmsApiPath + 'Warehouse/LocationList'

        postData = {

            CurrentPage: strCurrentPage,
            recordlimit: getTotalRecords,
            CompanyId: getCompanyId,
            UserId: getUserId,
            CustomerId: LblgetCustomerID,
            WarehouseId: warehouseid,
            Search: searchlocationvalue,
            Filter: searchlocationfilter
        }
        callHttpUrl(apiPath, postData, function (data) {

            getStatus = data.Status
            myGridList = data.Result
            gridTable = '';
            if (getStatus == 200) {

                $('#tlbNewLocation').html('')

                gridTable = gridTable + '  <div class="wms-srv-grid-header">';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell"><input type="checkbox"  onclick="selectAllST(this)" id="SellectAll"> </div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">Location Id</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">Building</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">Floor</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">Passage</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">Section</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">Shelf</div>';
                gridTable = gridTable + '   <div class="wms-srv-grid-cell">Location</div>';
                gridTable = gridTable + '   <div class="wms-srv-grid-cell">Location Code</div>';
                gridTable = gridTable + '   <div class="wms-srv-grid-cell">Sort Code</div>';
                gridTable = gridTable + '   <div class="wms-srv-grid-cell">Zone Location</div>';
                gridTable = gridTable + '   <div class="wms-srv-grid-cell">Capacity In</div>';
                gridTable = gridTable + '   <div class="wms-srv-grid-cell">Capacity</div>';
                gridTable = gridTable + '   <div class="wms-srv-grid-cell">Active</div>';
                gridTable = gridTable + '  <div class="wms-srv-grid-cell">Action</div>';
                gridTable = gridTable + '  </div>';

                for (var i = 0; i < myGridList.Table1.length; i++) {

                    var getLocationId = myGridList.Table1[i].MID;
                    var getLocationType = myGridList.Table1[i].Locationvalue;
                    var getLocationTypeId = myGridList.Table1[i].LocationType;
                    var getZoneType = myGridList.Table1[i].ZoneValue;
                    var getZoneTypeID = myGridList.Table1[i].ZoneType
                    var LocationListId = myGridList.Table1[i].MID;
                    var getLocationCode = myGridList.Table1[i].LocationCode;
                    var getSortCode = myGridList.Table1[i].SortCode;
                    var getNumber = myGridList.Table1[i].number;
                    var getlength = myGridList.Table1[i].length;
                    var getWidth = myGridList.Table1[i].width;
                    var getHeight = myGridList.Table1[i].height;
                    var getCompany = myGridList.Table1[i].Company;
                    var getShelf = myGridList.Table1[i].Shelf;
                    var getSection = myGridList.Table1[i].Section;
                    var getPathway = myGridList.Table1[i].Pathway;
                    var getFloar = myGridList.Table1[i].Floor;
                    var getBuilding = myGridList.Table1[i].Building;
                    var getCapacityIn = myGridList.Table1[i].CapacityIn;
                    var getCapacity = myGridList.Table1[i].Capacity;
                    var getCapacityValue = myGridList.Table1[i].capacityvalue;
                    var getCapacityID = myGridList.Table1[i].CapacityIn;
                    var getWarehouseName = myGridList.Table1[i].WarehouseName;
                    var getWarehouseCode = myGridList.Table1[i].Code;
                    var getCompanyID = myGridList.Table1[i].CompanyID;
                    var getWarehouseRemark = myGridList.Table1[i].Section;
                    var geActive = myGridList.Table1[i].Active;



                    gridTable = gridTable + '  <div class="wms-srv-grid-row">';
                    gridTable = gridTable + '  <div class="wms-srv-grid-cell" id="btnCheckStatus"><input type="checkbox"  class="messageCheckbox11" value="' + getLocationCode + '"></div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getLocationId + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getBuilding + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getFloar + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getPathway + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getSection + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getShelf + '</div>';
                    gridTable = gridTable + '  <div class="wms-srv-grid-cell">' + getLocationType + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getLocationCode + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getSortCode + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getZoneType + '</div>';
                    gridTable = gridTable + '  <div class="wms-srv-grid-cell">' + getCapacityIn + '</div>';
                    gridTable = gridTable + '  <div class="wms-srv-grid-cell">' + getCapacity + '</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + geActive + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(getLocationCode) + '</div>';

                    gridTable = gridTable + '  </div>';
                    gridTable = gridTable + '  </div>';


                    $('#tlbNewLocation').html(gridTable)

                }

            }

        });
    }

}


// End Of The Location 

//SKU List
function getSkuList(strCurrentPage) {
    debugger;
    searchfilter = 'SkuCode'// filter ddl
    searchvalue = $('#txtSearchForPoSku').val();// search txt


    var apiPath = wmsApiPath + 'Product/GetProductList';

    if (searchvalue == '') {
        searchfilter = '0';//filter 
        searchvalue = '0';// filter
    }

    var postData =
    {
        "CurrentPage": strCurrentPage,//pageing
        "RecordLimit": getTotalRecords,//pageing
        "CompanyId": getCompanyId,
        "UserId": getUserId,
        "CustomerId": LblgetCustomerID,
        "Filter": searchvalue,//filter
        "Search": searchfilter//filter

    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == 200) {
            $("#tlbNewSKU").html('');
            var myGridList = data.Result;
            var getTotalRecords = myGridList.Table[0].TotalRecord;//Pageing
            //var strcurrentPage = Result.Table[0].CurrentPage;	//Pageing

            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><input type="checkbox" onclick="selectAllST(this)"  id="SellectAll"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">SKU Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">SKU Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width: 215px;">Description</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">UPC Code</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < myGridList.Table1.length; i++) {

                getrownumber = myGridList.Table1[i].rownumber;
                getMID = myGridList.Table1[i].MID;
                getSkuCode = myGridList.Table1[i].SkuCode;
                getSkuName = myGridList.Table1[i].SkuName;
                getDescription = myGridList.Table1[i].Description;
                getUPCCode = myGridList.Table1[i].UPCCode;
                getActive = myGridList.Table1[i].Active;
                getProductCategory = myGridList.Table1[i].ProductCategory;
                getProductSubCategory = myGridList.Table1[i].ProductSubCategory;



                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-align" id="btnCheckStatus"><input type="checkbox"  class="messageCheckbox11" value="' + getSkuCode + '"></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getSkuCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getSkuName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width: 215px;">' + getDescription + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getUPCCode + '</div>';


                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(getSkuCode) + '</div>';


                gridTable = gridTable + '</div>';


            }
            $("#tlbNewSKU").html(gridTable);
            setupGridPagingList('LabelskuListSOGridPager11', strCurrentPage, getTotalRecords, getSkuList);

        }

        else {
            alert("Record not found!!");
        }


    });
}
function setupGridPaginglabelsku(gridObjId, strCurrentPage, getTotalRecords, callBackFunction) {
    var global_max_record_count = 10;
    var pageNo = Number(strCurrentPage);
    var recordFrom = ((pageNo - 1) * 10) + 1;
    var recordTo = recordFrom + 9;
    var totalRecord = Number(getTotalRecords);
    var pagerLinks = '';

    $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
    var lnkCounter = 1;
    var currentCounter = global_max_record_count;
    //var currentCounter = 0;
    var lastPage = 0;
    while (currentCounter < totalRecord) {
        if (lnkCounter == pageNo) {
            pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
        } else {
            pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
            lastPage = lnkCounter;
        }
        global_last_page_no = lnkCounter;
        currentCounter = currentCounter + global_max_record_count;
        lnkCounter = lnkCounter + 1;
    }

    /* Add Page linke for remaining record */
    if (currentCounter > totalRecord) {

        if (lnkCounter == pageNo) {
            pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
        } else {
            pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
            lastPage = lnkCounter;
        }
        // Update last page count - 21 Sept 2021
        this.global_last_page_no = lnkCounter;
    }
    /* Add Page linke for remaining record */
    var pagerNavLinks = '';
    pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
    // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
    pagerNavLinks += pagerLinks;
    //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
    pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';

    $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

    $('#LabelskuListSOGridPager11 .wms-srv-pager-links a').off();
    $('#LabelskuListSOGridPager11 .wms-srv-pager-links a').click(function () {
        var getDataPage = $(this).attr('data-page');
        if (callBackFunction != null) {

            callBackFunction(getDataPage);
        }
    });

    $('#LabelskuListSOGridPager11 a.wms-srv-pager-go').off();
    $('#LabelskuListSOGridPager11 a.wms-srv-pager-go').click(function () {
        var getDataPage = $('#LabelskuListSOGridPager11 input[name="txtGridPageNo"]').val();
        if (Number(getDataPage) < 1) {
            alert('Please enter valid page number!!');
        } else if (Number(getDataPage) > Number(lastPage)) {
            alert('Page number should not be greater than ' + lastPage + ' !!');
        } else {
            if (callBackFunction != null) {
                callBackFunction(getDataPage, searchfilter, searchvalue);
            }
        }
    });
}
function getSkuListkeydown(strCurrentPage) {
    debugger;
    searchvalue = $('#txtSearchForPoSku').val()
    if (searchvalue == "") {
        debugger;
        searchfilter = 'SkuCode'// filter ddl
        searchvalue = $('#txtSearchForPoSku').val();// search txt


        var apiPath = wmsApiPath + 'Product/GetProductList';

        if (searchvalue == '') {
            searchfilter = '0';//filter 
            searchvalue = '0';// filter
        }

        var postData =
        {
            "CurrentPage": strCurrentPage,//pageing
            "RecordLimit": getTotalRecords,//pageing
            "CompanyId": getCompanyId,
            "UserId": getUserId,
            "CustomerId": LblgetCustomerID,
            "Filter": searchvalue,//filter
            "Search": searchfilter//filter

        }

        callHttpUrl(apiPath, postData, function (data) {
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatus == 200) {
                $("#tlbNewSKU").html('');
                var myGridList = data.Result;
                var getTotalRecords = myGridList.Table[0].TotalRecord;//Pageing
                //var strcurrentPage = Result.Table[0].CurrentPage;	//Pageing

                var gridTable = '';
                gridTable = gridTable + '<div class="wms-srv-grid-header">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllST(this)" id="SellectAll"  value=""></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">SKU Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">SKU Name</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width: 215px;">Description</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">UPC Code</div>';

                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
                gridTable = gridTable + '</div>';

                for (var i = 0; i < myGridList.Table1.length; i++) {

                    getrownumber = myGridList.Table1[i].rownumber;
                    getMID = myGridList.Table1[i].MID;
                    getSkuCode = myGridList.Table1[i].SkuCode;
                    getSkuName = myGridList.Table1[i].SkuName;
                    getDescription = myGridList.Table1[i].Description;
                    getUPCCode = myGridList.Table1[i].UPCCode;
                    getActive = myGridList.Table1[i].Active;
                    getProductCategory = myGridList.Table1[i].ProductCategory;
                    getProductSubCategory = myGridList.Table1[i].ProductSubCategory;



                    gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" id="btnCheckStatus" class="messageCheckbox11" value="' + getSkuCode + '"></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getSkuCode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getSkuName + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width: 215px;">' + getDescription + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getUPCCode + '</div>';


                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(getSkuCode) + '</div>';


                    gridTable = gridTable + '</div>';


                }
                $("#tlbNewSKU").html(gridTable);


            }

            else {
                alert("Record not found!!");
            }


        });
    }
}
//SelectAll
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
//SelectROw
// function SelectRow(chkObj) 
// {
//     debugger;

//     var getChkId = chkObj.id;
//     if ($(chkObj).prop('checked')) 
//     {
//         $('#div' + getChkId).css("background", "#efefef");
//         $('#' + getChkId).prop("checked", true);
//     }
//      else
//      {
//         $('#div' + getChkId).css("background", "#ffffff");
//         $('#' + getChkId).prop("checked", false);
//     }
// }


// BOX
function savebtnBox() {
    var apiPath = wmsApiPath + "SavePackingMaster";

    var txtLabelRange = $('#txtBOXLabelRange').val();
    var txtLabelSize = $('#ddlBOXLabelSize').val();
    var txtLabelPrinter = $('#txtBOXLabelPrinter').val();

    var postData =
    {
        "CompanyId": getCompanyId,
        "UserId": getUserId,
        "Type": getLabelType,
        "label": txtLabelSize,
        "Number": txtLabelRange


    }



    callHttpUrl(apiPath, postData, function (data) {

        GetPackingMasterListBOX(txtLabelRange)
    });
}

function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function GetPackingMasterListBOX(txtLabelRange) {
    debugger;
    var apiPath = wmsApiPath + 'GetPackingMasterList';

    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": txtLabelRange,
        "UserId": getUserId,
        "Type": getLabelType
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $("#tlbBOXList").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="checkbox" onclick="selectAllST(this)" id="SellectAll"> </div>';
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
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;" id="btnCheckStatus"><input  class="messageCheckbox11" type="checkbox"  value="' + GetSerialNo + ' "></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"> ' + GetSerialNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPackingType + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLabelSize + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCreationDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(GetSerialNo, getLabelSize) + '</div>';
                gridTable = gridTable + '</div>';
            }
            $('#tlbBOXList').html(gridTable);

        }
    });

}
//End BOX

// CRATE
function savebtnCrate() {
    var apiPath = wmsApiPath + "SavePackingMaster";

    var txtLabelRange = $('#txtCrateLabelRange').val();
    var txtLabelSize = $('#ddlCrateLabelSize').val();
    var txtLabelPrinter = $('#txtCrateLabelPrinter').val();

    var postData =
    {
        "CompanyId": getCompanyId,
        "UserId": getUserId,
        "Type": getLabelType,
        "label": txtLabelSize,
        "Number": txtLabelRange


    }



    callHttpUrl(apiPath, postData, function (data) {

        GetPackingMasterListCrate(txtLabelRange)
    });
}
function GetPackingMasterListCrate(txtLabelRange) {
    debugger;
    var apiPath = wmsApiPath + 'GetPackingMasterList';

    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": txtLabelRange,
        "UserId": getUserId,
        "Type": getLabelType
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $("#tlbCrateList").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="checkbox" onclick="selectAllST(this)"  id="SellectAll"></div>';
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
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" id="btnCheckStatus"><input type="checkbox" class="messageCheckbox11" value="' + GetSerialNo + ' "></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> ' + GetSerialNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPackingType + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLabelSize + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCreationDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(GetSerialNo, getLabelSize) + '</div>';
                gridTable = gridTable + '</div>';
            }
            $('#tlbCrateList').html(gridTable);

        }
    });

}
//End CRATE

// CONTAINER
function savebtnContainer() {
    var apiPath = wmsApiPath + "SavePackingMaster";

    var txtLabelRange = $('#txtContainerLabelRange').val();
    var txtLabelSize = $('#ddlContainerLabelSize').val();
    var txtLabelPrinter = $('#txtContainerLabelPrinter').val();

    var postData =
    {
        "CompanyId": getCompanyId,
        "UserId": getUserId,
        "Type": getLabelType,
        "label": txtLabelSize,
        "Number": txtLabelRange


    }



    callHttpUrl(apiPath, postData, function (data) {

        GetPackingMasterListContainer(txtLabelRange)
    });
}
function GetPackingMasterListContainer(txtLabelRange) {
    debugger;
    var apiPath = wmsApiPath + 'GetPackingMasterList';

    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": txtLabelRange,
        "UserId": getUserId,
        "Type": getLabelType
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $("#tlbContainerList").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" > <input type="checkbox" onclick="selectAllST(this)" id="SellectAll"> </div>';
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
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;" id="btnCheckStatus"><input type="checkbox" class="messageCheckbox11"   value="' + GetSerialNo + ' "></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"> ' + GetSerialNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPackingType + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLabelSize + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCreationDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + bindLableStorePalletActionControl(GetSerialNo, getLabelSize) + '</div>';
                gridTable = gridTable + '</div>';
            }
            $('#tlbContainerList').html(gridTable);

        }
    });

}


//End CONTAINER

// function printIt(){
//     $('.myDivToPrint').print()
// }
/*
$('.myDivToPrint').click(function(){
    var getPrintSize = '';
    var getPaperPageMargin = '0.25';
    var getPaperPageSize = '';
    if(getBarcodeSizeDropDownId.trim() != ''){
        getPrintSize = $('#' + getBarcodeSizeDropDownId + ' option:selected').val();
    }
    if(getPrintSize != 0 &&  getPrintSize.trim() != ''){
        if(getPrintSize == '4X6'){
            getPaperPageSize = 'size: 6in 4in';
        }else if(getPrintSize == '4X2'){
            getPaperPageSize = 'size: 4in 2in';
        }else{
            getPaperPageSize = 'size: 11in 8.5in';
        }
    }else{
        getPaperPageSize = 'size: 11in 8.5in';
    }
    //$('body').append('');
    $('body').append('<style id="winPageSizeSetup">@page{'+ getPaperPageSize +';margin: '+ getPaperPageMargin +'in;}</style><div id="winPrintContent" data-printsize="' + getPrintSize + '"></div>');
    var getPrintableContent = $(this).html();
    alert('Please select paper size' + getPaperPageSize + ' in printing dialog box to print properly.');
    $('#winPrintContent').html(getPrintableContent);
    window.print();
    $('#winPrintContent').remove();
    $('#winPageSizeSetup').remove();
    return false;
});
*/

// $('.myDivToPrint').click(function(){
$('#btnPrintBarcodeLabels').click(function () {
    var getPaperPageMargin = getPaperPrintMargin();
    var getPrintSize = getPrintSizeFromDropDown();
    var getPaperPageSize = getPaperPrintSizeForCSS(getPrintSize);

    var chromeCSS = '';
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        // var isChrome = confirm('Are you using chrome??');
        isChrome = true;
        if (isChrome) {
            var chromeZoom = '50%';
            if (getPrintSize == '4X6') {
                chromeZoom = '80%';
            }
            chromeCSS = '#BarcodeID{zoom: ' + chromeZoom + ';position: absolute;text-align: center;width: 100%;}';
            $('#BarcodeID').attr('style', chromeCSS);
        }
    }
    //$('body').append('');
    $('body').append('<style id="winPageSizeSetup">@media print {' + chromeCSS + '}@page{' + getPaperPageSize + ';margin: ' + getPaperPageMargin + 'in;}</style><div id="winPrintContent" data-printsize="' + getPrintSize + '"></div>');
    var getPrintableContent = $('.myDivToPrint').html();
    // alert('Please select following paper size in printing dialog box to print labels properly.\n' + getPaperPageSize.toUpperCase());
    $('#winPrintContent').html(getPrintableContent);



    window.print();
    $('#BarcodeID').attr('style', '');
    $('#winPrintContent').remove();
    $('#winPageSizeSetup').remove();
    return false;
});

function getPrintSizeFromDropDown() {
    var getPrintSize = '';
    if (getBarcodeSizeDropDownId.trim() != '') {
        getPrintSize = $('#' + getBarcodeSizeDropDownId + ' option:selected').val();
    }
    return getPrintSize;
}

function getPaperPrintSizeForCSS(getPrintSize) {
    var getPaperPageSize = '';

    if (getPrintSize != 0 && getPrintSize.trim() != '') {
        if (getPrintSize == '4X6') {
            getPaperPageSize = 'size: 6in 4in';
        } else if (getPrintSize == '4X2') {
            getPaperPageSize = 'size: 4in 2in';
        } else {
            getPaperPageSize = 'size: 6in 4in';
        }
    } else {
        getPaperPageSize = 'size: 6in 4in';
    }
    return getPaperPageSize;
}

function getPaperPrintMargin() {
    var getPaperPageMargin = '0.25';
    return getPaperPageMargin;
}

function openbarcode() {
    debugger;
    //$('#btnCreatedirectBatch').show();
    var SelectedOrder = document.getElementById("btnCheckStatus");
    SelectedOrder.value = "";
    SelectedBatch = "";

    $("input[class=messageCheckbox11]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });

    if (SelectedOrder.value == "") {
        alert("Please select atleast one Barcode");
        $('#wms-srv-printbarcode-popup').hide();
    }


}


