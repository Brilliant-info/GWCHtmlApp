var filtercol = "ALL";
var filterval = "0";
var CurrentPage = '1';
var recordLimit = '100';
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
/*
wmsLoadLayout(function () {
    initInternalTransfer();
});
*/

function initInternalTransfer(){
    getTransferList(filtercol, filterval);
    $("#wms-srv-Loacation-popup-close").click(function()
    {        
        $("#txtLocationSrch").val('');
        $("#txtLocationSrch").html('');
        getFromLocation();
    });
    $("#wms-srv-Pallet-popup-close").click(function()
    {
        $("#txtPalletVal").val('');
        $("#txtPalletVal").html('');
        getFromPalletList();
    });
    $("#wms-srv-SkU-popup-close").click(function()
    {
        $("#txtSkuVal").val('');
        $("#txtSkuVal").html('');
        getSKUList();
    });
    $("#wms-srv-Lottable-popup-close").click(function()
    {
        $("#txtLottableVal").val('');
        $("#txtLottableVal").html('');
        getLottableList();
    });
    $('.wms-srv-add-order').off();
    $('.wms-srv-add-order').click(function () {
        // addOrder();
         viewOrder('0');
     });
     $("#ddlLocationType").click(function()
     {
        bindLocationDropDown();
     });
     
     $("#wms-srv-addtransfer-popup-close").click(function()
     {
        debugger;
         clearInput();
         getTransferList(filtercol,filterval) ;
            $("#wms-srv-addtransfer-popup").hide();
        }
     )
     $("#wms-srv-Viewtransfer-popup-close").click(function()
    {
        $("#wms-srv-Viewtransfer-popup").hide();
    });
}

function viewOrder(strCurrentOrder) {
    //checkBusinessRule();
    viewTransferHead(strCurrentOrder);   
}


function TransferPopup() {
   $('#wms-srv-addtransfer-popup').show();
    $('#wms-srv-createtask-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-addtransfer-popup-close').off();
    $('#wms-srv-addtransfer-popup-close').click(function () {
        getTransferList(filtercol,filterval) ;
        clearInput();   
        $('#wms-srv-createtask-popup .wms-srv-datepicker').datepicker('destroy');
        $('#wms-srv-addtransfer-popup').hide();
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
    LocationType();
}

function CloseSkuSearchPopup() {
    $('#wms-srv-skusearch-popup-close').click(function () {
        $('#wms-srv-skusearch-popup').hide();
    });

}
function CloselocationPopup() {
    $('#wms-srv-formlocation-popup-close').click(function () {
        $("#txtLocationSrch").val('');
        $("#txtLocationSrch").html('');
        $('#wms-srv-formlocation-popup').hide();
    });
}
function CloseTolocationPopup() {
    $('#wms-srv-Tolocation-popup-close').click(function () {
        $("#txtToLocSrch").val('');
        $("#txtToLocSrch").html('');
        $('#wms-srv-Tolocation-popup').hide();
    });
}

function CloselottablePopup() {
    $('#wms-srv-lottable-popup-close').click(function () {
        $('#wms-srv-lottable-popup').hide();
    });
}
function ClosepalletPopup() {
    $('#wms-srv-palletlist-popup-close').click(function () {
        $("#txtPalletVal").val('');

        $('#wms-srv-palletlist-popup').hide();
    });
}

function CloseTopalletPopup() {
    $('#wms-srv-Topalletlist-popup-close').click(function () {
        $("#txtToPalletVal").val('');

        $('#wms-srv-Topalletlist-popup').hide();
    });
}

function openstatusPopup() {
    $('#wms-srv-status-popup').show();
    $('#wms-srv-status-popup-close').off();
    $('#wms-srv-status-popup-close').click(function () {
        $('#wms-srv-status-popup').hide();
    });
}

function checkScanMode(chkobj) 
{
    var isChecked = $('chkScanMode').prop('checked');
    if ($(chkobj).prop('checked')) {
        $('#wmsScannerHolder').show();
    } else {
        $('#wmsScannerHolder').hide();
    }
}
function clearSearchFilter()
{
$('#ddlTransferSearch').val('ALL');
$('#ddlTransferFilterValue').val('');
    getTransferList(filtercol,filterval)
}

//Transfer List
function getTransferList(filtercol,filterval) 
{
    debugger;
    checkBusinessRule()
    var globalOrderType = "";
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/GetTransferList";
   var apiPath = wmsApiPath + "Transfer/GetTransferList";

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
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "Filter": filtercol,
        "Search": filterval
    }
    
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblTransferList').html('');

            var myGridList = data.Result.Table[0];
            var getTotalRecords = myGridList.TotalRecords;

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Transfer No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Transfer Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Transfer By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>'
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) 
            {
                var gettransferNo = getGridData[i].TransferID;
                var gettransferDate = getGridData[i].TransferDate;
                var gettransferBy = getGridData[i].TransferBy;
                var getorderType = getGridData[i].isReplenishment;
                var getStatusName = getGridData[i].StatusName;
                var getStatusCode = getGridData[i].Status;

                // var getdate = getInvoiceDate.slice(0, 10);
                // var gettotal = getTotal.toFixed(2),
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + gettransferNo + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + gettransferDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + gettransferBy + "</div>";
                if (getorderType == 1) {
                    globalOrderType = "Replanishment"
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + globalOrderType + "</div>";
                }
                else {
                    globalOrderType = "Normal"
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + globalOrderType + "</div>";
                }
                //gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + gettotal + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindStatusControl(gettransferNo, getStatusName) + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#tblTransferList').html(gridTable);
            
    //isBusinessRule = globalInternalBusinessPalletRule;
        }
        else {
            alert('Unable to connect Server!!');
        }
        setupGridPagingList('tbltranferlistpager', CurrentPage, getTotalRecords, getTransferList);
        //setupGridPagingList('tbltranferlistpager', CurrentPage, getTotalRecords, getTransferList);
    });
}

//Search Transfer List
function SearchTransferList() {
    debugger;
    filtercol = $('#ddlTransferSearch').val();
    filterval = $('#ddlTransferFilterValue').val();

    if (filterval == '') {
        alert('Please Enter value for filter');
    }
    else {
        getTransferList(filtercol, filterval);
    }
    if (filtercol == '' && filterval == '') {
        getTransferList(filtercol, filterval);
    }
}

//Transfer List StatusContrl
function bindStatusControl(gettransferNo, strStatus) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getStatusColor('Transfer Complete', strStatus) + '" data-orderid="' + gettransferNo + '" data-status="' + strStatus + '" title = "Open Task" onclick ="viewOrderDetails(\''+gettransferNo+'\');"></div>';

    //htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Transfer', strStatus) + '" data-orderid="' + gettransferNo + '" data-status="' + strStatus + '" title = "Complete Task"></div>';

    //htmlControl = htmlControl + ' <div class="wms-srv-dot wmsStatusQualityCheck wms-srv-' + getStatusColor('Pending', strStatus) + '" data-orderid="' + gettransferNo + '" data-status="' + strStatus + '" title = "Overdue Task"></div>';


    //htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Put Away', strStatus) + '" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Put Away" onclick="viewPutAway(\'' + orderId + '\');return false;"></div>';

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

//Transfer List StatusColor
function getStatusColor(dataFor, currentStatus) {
    var myColor = 'gray';

    if (dataFor == 'Transfer Complete') {
        if (currentStatus == 'Transfer Complete' || currentStatus == 'Transfer' || currentStatus == 'Pending') {
            myColor = 'green';
        }
    } else if (dataFor == 'Transfer') {
        if (currentStatus == 'Transfer' || currentStatus == 'Pending') {
            myColor = 'green';
        } else if (currentStatus == 'Pending') {
            myColor = 'red';
        }

    } else if (dataFor == 'Pending') {
        if (currentStatus == 'Pending') {
            myColor = 'green';
        } else if (currentStatus == 'Transfer Complete' || currentStatus == 'Transfer') {
            myColor = 'red';
        }

    }
    return myColor;
}

//Location Type DropDown
function bindLocationDropDown(objid, selectedVal) {
    debugger;
    var ddlLocation = '';
    ddlLocation = '<select class="wms-srv-grid-cell-input" id="ddlLocationType' + objid + '">';
    for (var i = 0; i < spnLocationType.length; i++) {
        if (spnLocationTypeId[i] == selectedVal) {
            ddlLocation += '<option value = "' + spnLocationTypeId[i] + '" selected="selected">' + spnLocationType[i] + '</option>';
        } else {
            ddlLocation += '<option value = "' + spnLocationTypeId[i] + '">' + spnLocationType[i] + '</option>';
        }
    }
    ddlLocation += '</select>';
    return ddlLocation;
}

//Location Type
function LocationType() {
    debugger;
    var apiPath = wmsApiPath + 'Transfer/ddlTransferLocationList';
    //var apiPath="http://localhost:50068/api/staging/v1/Transfer/ddlTransferLocationList";
 
    var postData = {
        userId: getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) 
        {
            spnLocationType = [];
            spnLocationTypeId = [];
            
            $("#ddlLocationType").html('<option value="0">--Select List--</option>');
            $("#ddlToLocationType").html('<option value="0">--Select List--</option>');
            spnLocationType.push('--Select List--');
            spnLocationTypeId.push('0');
            // $("#ddlZoneLocation").html('<option >--Select List--</option>');
            // spnZoneLocation.push('--Select List--');
            // spnZoneLocationId.push('0');
            // $("#ddlCapacity").html('<option >--Select List--</option>');
            // spnCapacity.push('--Select List--');
            // spnCapacityId.push('0');
            var myGridList = data.Result;
            var getLocationType = myGridList;
            //var getZoneLocation = myGridList;
            if (getLocationType.Table.length > 0) {
                for (var i = 0; i < getLocationType.Table.length; i++) {
                    var LocationId = getLocationType.Table[i].ID;
                    var LocationValue = getLocationType.Table[i].value;
                    spnLocationType.push(LocationValue);
                    spnLocationTypeId.push(LocationId);
                    $("#ddlLocationType").append('<option value = "' + LocationId + '">' + LocationValue + '</option>');
                    //$("#ddlToLocationType").append('<option value = "' + LocationId + '">' + LocationValue + '</option>');
                }
                for (var i = 0; i < getLocationType.Table1.length; i++) {
                    var LocationId = getLocationType.Table1[i].ID;
                    var LocationValue = getLocationType.Table1[i].value;
                    spnLocationType.push(LocationValue);
                    spnLocationTypeId.push(LocationId);
                    $("#ddlToLocationType").append('<option value = "' + LocationId + '">' + LocationValue + '</option>');
                }
            }
        }
    });
}

//From Location List
function getFromLocation() {
   
    debugger;
    var checkFromLocTypeval = $("#ddlLocationType").val();
    if(checkFromLocTypeval == 0)
    {
        alert("Please Select From Location Type");
    }
    else{
        var apiPath = wmsApiPath + "Transfer/GetLocation";
       //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/GetLocation";
        var getFromLocationType = $("#ddlLocationType").val();
        getFilterval = $("#txtLocationSrch").val();
        getLocation ='0';
        var postData =
        {
        
            "WarehouseId": getWarehouseId,
            "UserId": getUserId,
            "LocationType":getFromLocationType,
            "CompanyId": getCompanyID,
            "CustomerId": getCustomerId,
            "checkLocAvl":getLocation,
            "Object":"FromLoc",
            "Filter": getFilterval
        }    
    
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#wms-srv-formlocation-popup').show();
            $('#popupLocationSearchList').html('');
            
            // var myGridList = data.Result.Table[0];
            // var getTotalRecords = myGridList.TotalRecords;
            
            // BIND DATA GRID
            var gridTable = '';
            
            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Location Code</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Available Balance</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>'
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) {
                var getLocationID = getGridData[i].ID;
                var getLocationCode = getGridData[i].Code;
                var getAvailableBalance = getGridData[i].AvailableBalance;
                var getSKUCode = getGridData[i].SKUCode;
                var getskuname = getGridData[i].SkuName;
                //var getStatusCode = getGridData[i].Status;

                // var getdate = getInvoiceDate.slice(0, 10);
                // var gettotal = getTotal.toFixed(2),
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLocationCode + '</div>';
                //gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getAvailableBalance + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="selectFromLocation(' + getLocationID + ',\'' + getLocationCode + '\');"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                // GRID ROW
                //globalFromLocationID = getLocationID
            }

            $('#popupLocationSearchList').html(gridTable);

            //setupGridPagingList('tbltranferlistpager', CurrentPage, getTotalRecords, getTransferList);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
    //$("#txtLocationSrch").val('');

}
}
//Save From Location
function selectFromLocation(getLocationID, getLocationCode) {
debugger;
    $("#textFromLocation").val(getLocationCode);
    $("#texthdnFromLocationID").val(getLocationID);

    $('#wms-srv-formlocation-popup').hide();
}

//To Location List
function getToLocation() {
 debugger;
    if(validateToLocation() == true)
   {
    
    getFilterval = $("#txtToLocSrch").val();
    var getToLocationType = $("#ddlToLocationType").val();
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/GetToLocation";
    var apiPath = wmsApiPath + "Transfer/GetToLocation";
    var getLocation = $("#texthdnFromLocationID").val();
    var postData =
    {
        
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "LocationType":getToLocationType,
        "CompanyId": getCompanyID,
        "CustomerId": getCustomerId,
        "checkLocAvl":getLocation,
        "Object":"ToLoc",
        "Filter": getFilterval
    }
    
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#wms-srv-Tolocation-popup').show();
            $('#ToLocationListGrid').html('');
            
            // var myGridList = data.Result.Table[0];
            // var getTotalRecords = myGridList.TotalRecords;

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Location Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Available Balance</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) {
                var getLocationID = getGridData[i].ID;
                var getLocationCode = getGridData[i].Code;
                var getAvailableBalance = getGridData[i].AvailableBalance;
                var getSKUCode = getGridData[i].SKUCode;
                var getskuname = getGridData[i].SkuName;
                //var getStatusCode = getGridData[i].Status;

                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLocationCode + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getAvailableBalance + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="selectToLocation(' + getLocationID + ',\'' + getLocationCode + '\');"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#ToLocationListGrid').html(gridTable);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
    $("#txtToLocSrch").val('');
}
}
//Save From Location
function selectToLocation(getLocationID, getLocationCode) {
   debugger;
    $("#texthdnToLocationID").val(getLocationID);
    $("#textToLocation").val(getLocationCode);
    if (globalInternalBusinessPalletRule != "YES")
        {
            let getFromLocationID = $("#texthdnFromLocationID").val();
            let getFromPalletID = $("#texthdnFromPalletID").val();
            let getToPalletID = $("#texthdnToPalletID").val();
            var apiPath = wmsApiPath + 'Transfer/getTRIDTO';
            var postData =
            {
                "FrTrID": $('#texthdnFromTrId').val(),  
                "FrLocId": getFromLocationID,  
                "FrPalletId": getFromPalletID,  
                "Tolocid": getLocationID,
                "ToPalletId": getToPalletID,
            }
            callHttpUrl(apiPath, postData, function (data) {
                var getStatus = data.Status;
                if (getStatus == 200) {
                    var getFromSPToTrId = data.Result.Table[0].TOTRID;
                    $('#texthdnToTrId').val(getFromSPToTrId);
                }});
        }
    
    $('#wms-srv-Tolocation-popup').hide();
}

//From Pallet List
function getFromPalletList() {
    debugger;
    var getlocationid = $("#texthdnFromLocationID").val();
    var getlocationval = $("#texthdnFromLocationID").html();
    var skuId = $("#texthdnSKUID").val();
    if(getlocationid == '' && getlocationval == '')
    {
        alert("Please Select Location..!!");
    }
    else{
    
    $('#wms-srv-palletlist-popup').show();
    var getFilterPallet = $("#txtPalletVal").val();
    var apiPath = wmsApiPath + "Transfer/GetPallet";
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/GetPallet";

    var postData =
    {

        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "LocationID": getlocationid,
        "CompanyID": getCompanyID,
        "SkuId":skuId,
        "Object": "FromPallet",
        "Filter": getFilterPallet

    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#popupPalletSearchList').html('');

            // var myGridList = data.Result.Table[0];
            // var getTotalRecords = myGridList.TotalRecords;

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Pallet Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Pallet Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>'
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) {
                var getPalletID = getGridData[i].palletid;
                var getPalletName = getGridData[i].palletname;
                var getLocationID = getGridData[i].LocationID;
                var getPalletType = getGridData[i].pallettype;
                //var getskuname = getGridData[i].SkuName;
                //var getStatusCode = getGridData[i].Status;

                // var getdate = getInvoiceDate.slice(0, 10);
                // var gettotal = getTotal.toFixed(2),
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPalletID + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPalletName + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="selectFromPallet(' + getPalletID + ',\'' + getPalletName + '\');"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#popupPalletSearchList').html(gridTable);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
    $("#txtPalletVal").val('');
};
}

//Save From Pallet
function selectFromPallet(getPalletID, getPalletName) {
    //alert(getPalletID);
    $("#texthdnFromPalletID").val(getPalletID);
    $("#textfromPallet").val(getPalletName);

    $('#wms-srv-palletlist-popup').hide();
}

//To Pallet List
function getToPalletList() {
    var gettolocationid = $("#texthdnToLocationID").val();
    var skuId = $("#texthdnSKUID").val();
    debugger;
    if(validatePallet() == true)
    {
        $('#wms-srv-Topalletlist-popup').show();
         var apiPath = wmsApiPath + "Transfer/GetPallet";
        //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/GetPallet";

    var getFilterToPallet = $("#txtToPalletVal").val();
    var postData =
    {

        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "LocationID": gettolocationid,
        "CompanyID": getCompanyID,
        "SkuId":skuId,
        "Object":"ToPallet",
        "Filter": getFilterToPallet,

    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#ToPalletSearchList').html('');

            // var myGridList = data.Result.Table[0];
            // var getTotalRecords = myGridList.TotalRecords;

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Pallet Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Pallet Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>'
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) {
                var getPalletID = getGridData[i].palletid;
                var getPalletName = getGridData[i].palletname;
                var getLocationID = getGridData[i].LocationID;
                var getPalletType = getGridData[i].pallettype;
                //var getskuname = getGridData[i].SkuName;
                //var getStatusCode = getGridData[i].Status;

                // var getdate = getInvoiceDate.slice(0, 10);
                // var gettotal = getTotal.toFixed(2),
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPalletID + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPalletName + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="selectToPallet(' + getPalletID + ',\'' + getPalletName + '\');"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#ToPalletSearchList').html(gridTable);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
    $("#txtToPalletVal").val('');
}
}

//Save TO Pallet
function selectToPallet(getPalletID, getPalletName) {
    $("#texthdnToPalletID").val(getPalletID);
    $("#textToPallet").val(getPalletName);
    if (globalInternalBusinessPalletRule == "YES")
        {
            let getFromLocationID = $("#texthdnFromLocationID").val();
            let getFromPalletID = $("#texthdnFromPalletID").val();
            let getToPalletID = $("#texthdnToPalletID").val();
            let getLocationID = $("#texthdnToLocationID").val();
            var apiPath = wmsApiPath + 'Transfer/getTRIDTO';
            var postData =
            {
                "FrTrID": $('#texthdnFromTrId').val(),  
                "FrLocId": getFromLocationID,  
                "FrPalletId": getFromPalletID,  
                "Tolocid": getLocationID,
                "ToPalletId": getToPalletID,
            }
            callHttpUrl(apiPath, postData, function (data) {
                var getStatus = data.Status;
                if (getStatus == 200) {
                    var getFromSPToTrId = data.Result.Table[0].TOTRID;
                    $('#texthdnToTrId').val(getFromSPToTrId);
                }});
        }
    $('#wms-srv-Topalletlist-popup').hide();
}

function validateSkulist()
{
    var getlocationid = $("#texthdnFromLocationID").val();
    var palletID = $("#texthdnFromPalletID").val();
    var getFilterVal = $("#txtSkuVal").val();
    if(getlocationid =="")
    {
        alert("Please Select Location");
        return false;
    }
    
    else if(globalInternalBusinessPalletRule == "YES")
    {        
        if (palletID =="")
        {
            alert("Please Select Pallet");
            return false;
        }
        else{
            return true;
        } 
       
    } 
    else{
        return true;
    } 
}

//SKU List
function getSKUList() {
    debugger;
    var getlocationid = $("#texthdnFromLocationID").val();
    // getSkupalletID = $("#texthdnFromPalletID").val();
    getSkupalletID ="";
    var getFilterVal = $("#txtSkuVal").val();   
    var apiPath = wmsApiPath + "Transfer/GetSkuList";
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/GetSkuList";
    
 if(validateSkulist() == true)
 {
    
    debugger;
    if(globalInternalBusinessPalletRule == "YES")
{
   
    var postData =
    {
        "UserId": getUserId,
        "LocationID": getlocationid,
        "PalletId": getSkupalletID,
        "CustomerId":getCustomerId,
        "Filter": getFilterVal,
    }
}
else{
    
    var postData =
    {
        "UserId": getUserId,
        "LocationID": getlocationid,
        "PalletId": '',
        "CustomerId":getCustomerId,
        "Filter": getFilterVal,
    }

}
    

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200' && data.Result.Table.length > 0) {
            $('#wms-srv-skusearch-popup').show();
            $('#popupSKUSearchList').html('');

            // var myGridList = data.Result.Table[0];
            // var getTotalRecords = myGridList.TotalRecords;

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;display: none;">SKU Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>'
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) {
                var getSKUID = getGridData[i].SkuID;
                var getSKUCode = getGridData[i].SKUCode
                var getSKUName = getGridData[i].SkuName;
                var getAvailableBalance = getGridData[i].AvailableBalance;
                
                //var getPalletType = getGridData[i].pallettype;
                //var getskuname = getGridData[i].SkuName;
                //var getStatusCode = getGridData[i].Status;

                // var getdate = getInvoiceDate.slice(0, 10);
                // var gettotal = getTotal.toFixed(2),
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSKUCode + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getSKUName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;display: none;'>" + getAvailableBalance + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="selectSKU(' + getSKUID + ',\'' + getSKUCode + '\',\''+getAvailableBalance+'\');"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#popupSKUSearchList').html(gridTable);
           
            // BIND DATA GRID

        }
        else {
            alert('Sku Not Available');
        }
    });
    //$("#txtSkuVal").val('');
}
}








//Save SKU
function selectSKU(getSKUID, getSKUCode,AvlblBln) {
    debugger;
    $("#texthdnSKUID").val(getSKUID);
    $("#textSKUCode").val(getSKUCode);
    globalActiveBln = AvlblBln;
    //$("#txtAvilableBln").val(globalActiveBln);
    $('#wms-srv-skusearch-popup').hide();
}

function validateLotblVal()
{
    var getlocationid = $("#texthdnFromLocationID").val();
    var palletID = $("#texthdnFromPalletID").val();
    var skuid = $("#texthdnSKUID").val();
    var getFilterval = $("#txtLottableVal").val();
    //var CheckBusinessRule = globalInternalBusinessPalletRule;
    
if(getlocationid == "")
    {
        alert("Please Select From Location");
        return false;
    }
    else if(globalInternalBusinessPalletRule == "YES")
    {
        if(palletID == "")
        {
            alert("Please Select From Pallet");            
            return false;
        }
        else if(skuid == "")
        {
            alert("Please Select SKU Code");
            return false;
        }
            else
        {
            return true;
        }
    }    
    else
    {
        return true;
    }
}
//Lottable List
function getLottableList() {
    debugger;
    var getlocationid = $("#texthdnFromLocationID").val();
    var palletID = $("#texthdnFromPalletID").val();
    var skuid = $("#texthdnSKUID").val();
    var getFilterval = $("#txtLottableVal").val();
    //var CheckBusinessRule = globalInternalBusinessPalletRule;
    if(validateLotblVal() == true)
    {

 
    $('#wms-srv-lottable-popup').show();
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/GetLottableList";
    var apiPath = wmsApiPath + "Transfer/GetLottableList";

    if(globalInternalBusinessPalletRule == "YES")
    {
            var postData =
            {
                "UserId": getUserId,
                "SKUId": skuid,
                "PalletId": palletID,
                "LocationID": getlocationid,
                "Filter": getFilterval
            }
    }
    else{
            palletID= "";
            var postData =
            {
                "UserId": getUserId,
                "SKUId": skuid,
                "PalletId": palletID,
                "LocationID": getlocationid,
                "Filter": getFilterval
            } 
        }


    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            var getLottable = mBrillWmsSession.getCustomerLottable();
            var breakCustLot = getLottable.split(',');
            $('#popupLottableSearchList').html('');

            // var myGridList = data.Result.Table[0];
            // var getTotalRecords = myGridList.TotalRecords;

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable 1</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable 2</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable 3</div>';
            for(var pl=0; pl < breakCustLot.length; pl++){
                var custLotLabel = breakCustLot[pl];
                gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
            }
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Available Balance</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Type</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Status</div>'
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) {
                var getLottableGroup = [];
                getLottableGroup.push(getGridData[i].lottable1);
                getLottableGroup.push(getGridData[i].lottable2);
                getLottableGroup.push(getGridData[i].lottable3);
                getLottableGroup.push(getGridData[i].lottable4);
                getLottableGroup.push(getGridData[i].lottable5);
                getLottableGroup.push(getGridData[i].lottable6);
                getLottableGroup.push(getGridData[i].lottable7);
                getLottableGroup.push(getGridData[i].lottable8);
                getLottableGroup.push(getGridData[i].lottable9);
                getLottableGroup.push(getGridData[i].lottable10);

                // var getlottable1 = getGridData[i].lottable1;
                // var getlottable2 = getGridData[i].lottable2
                // var getlottable3 = getGridData[i].lottable3;
                var getAvailableBalance = getGridData[i].AvailableBalance;
                var getTrId = getGridData[i].id;

                var lottable = getLottableGroup.join('|');
                //var lottable = getlottable1 + '|' + getlottable2 + '|' + getlottable3;
                //var lottable = "0"
                //alert(lottable);
                //var getPalletType = getGridData[i].pallettype;
                //var getskuname = getGridData[i].SkuName;
                //var getStatusCode = getGridData[i].Status;

                // var getdate = getInvoiceDate.slice(0, 10);
                // var gettotal = getTotal.toFixed(2),
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getlottable1 + '</div>';
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getlottable2 + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getlottable3 + "</div>";
               
                for(var pi=0; pi < breakCustLot.length; pi++){
                    var custLotLabel = breakCustLot[pi];
                    var custLotVal = getLottableGroup[pi];
                    if(custLotVal!= null && custLotVal.trim() == '0'){
                      custLotVal = '';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
                }

                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getAvailableBalance + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="selectLottable(\'' + lottable + '\',\''+getAvailableBalance+'\', '+ getTrId +')"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#popupLottableSearchList').html(gridTable);
            showHideLotCellForInternalTransferRow('popupLottableSearchList');
            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
   // $("#txtLottableVal").val('');
}
}

function showHideLotCellForInternalTransferRow(objId){
    var getTotalLotRowCount = $('#'+ objId +' .wms-srv-grid-row ').length;
    $('#'+ objId +' .gridCellLottable').hide();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var totalCell = $('#'+ objId +' .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]').length;
        var totalEmptyCell = $('#'+ objId +' .wms-srv-grid-row .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
  
        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#'+ objId +' .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#'+ objId +' .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#'+ objId +' .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
  }
function selectLottable(lottable,avlBlnQty,TrId) {
    debugger;
    //$("#texthdnSKUID").val(getSKUID);
    $("#textLottable").val(lottable);

    var getLottable = mBrillWmsSession.getCustomerLottable();
    var breakCustLot = getLottable.split(',');

    var breakLottable = lottable.split('|');
    for(var i=0; i<breakCustLot.length; i++){
        var lotVal = breakLottable[i];
        if(lotVal.trim() == '0'){
            lotVal = '';
        }
        $('#tblTransferDetailsgrid .wmsFrmAddRow .gridCellLottable[data-lotindex="'+ i +'"]').html(lotVal);
    }
    showHideLotCellForInternalTransferRow('tblTransferDetailsgrid');
    $("#txtAvilableBln").val(avlBlnQty);
    $('#texthdnFromTrId').val(TrId);
    $('#wms-srv-lottable-popup').hide();
}



function SaveTransfer() {
    debugger;
    if(validatesaveFeilds() == true)
    {
  //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/SaveTransfer";
  var apiPath = wmsApiPath + "Transfer/SaveTransfer";

    var getTranferID = $("#hdnPoOid").val();
    var getRemark = $("#txtTransferRemark").val();
    var getFromLocation = $("#texthdnFromLocationID").val();
    var getFromPallet = $("#texthdnFromPalletID").val();
    var getSKUId = $("#texthdnSKUID").val();
    var getlottables = $("#textLottable").val();
    var getlottable = getlottables.split("|");
    getlot1 = getlottable[0];
    getlot2 = getlottable[1];
    getlot3 = getlottable[2];
    var getQuantity = $("#textinputQuantity").val();
    var getToLocation = $("#texthdnToLocationID").val();
    var getToPallet = $("#texthdnToPalletID").val();


    var postData =
    {
        "transid": getTranferID,
        "CompanyId": getCompanyID,
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "Remark": getRemark,
        "FromLocation": getFromLocation,
        "FromPallet": getFromPallet,
        "SkuId": getSKUId,
        "Lotable1": getlot1,
        "Lotable2": getlot2,
        "Lotable3": getlot3,
        "Quantity": getQuantity,
        "ToLocation": getToLocation,
        "ToPallet": getToPallet
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Result.Message;
        var getStatusCode = data.StatusCode;
        if (getStatus == 'success') {
            alert('Transfer done successfully')
            $('#wms-srv-addtransfer-popup').hide();
            getTransferList(filtercol, filterval);


        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}
}
// 100 > 5 && 100 < 5
function validateQty()
{
    var getAvilbQty = $("#txtAvilableBln").val();//28
	var getQuantity = $("#textinputQuantity").val();//30
    var avlQty = Number(getAvilbQty);
    var quanty = Number(getQuantity);    
    var getToLocText = $("#textToLocation").val();
    var getHdnToLocID = $("#texthdnToLocationID").val();
    var getToLocationType = $("#ddlToLocationType").val();
    if(getQuantity == '' || getQuantity == '0')
    {
        alert("Please Enter the Quantity!!");
        return false;  
    }
   if(getToLocationType == 0)
   {
        alert("Please Select All Feilds");
        return false;
   }
   else if(getHdnToLocID == '' && getToLocText =='')
    {
        alert("Please Select To Location");
        return false;
    }
   
    if(avlQty >= quanty) // 28 <= 30
    {
       // alert("valid");
        return true;
    }
    else
    {
        alert("Quantity should not be greater than Available Qty");
        return false;
    }
}

function saveTransferHead()
{
    if(validateQty() == true)
    {
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/SaveHeadInternalTrans";
    var apiPath = wmsApiPath + "Transfer/SaveHeadInternalTrans";
    var getTransferRefId = $("#hdnTransferId").val();
    
    getDate  = $("#AssignDate").val();
    
    //getTransferBY = $("#transferby").val();
    getRemkar = $("#txtTransferRemark").val();
    var postData =
    {     
        "transid": getTransferRefId,
        "CompanyId": getCompanyID,
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "TransferBy" : getUserId,
        "Remark" : getRemkar
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            var PoID = data.Result.OrderNo;
            $('#spnTransferid').html(PoID);
            $('#hdnTransferId').val(PoID);
            saveTransferDetails();
        }
        else{        
                alert(data.Result.Message);         
        }
    });
}

}


function saveTransferDetails() {
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/saveDetailList";
    var apiPath = wmsApiPath + "Transfer/saveDetailList";
    var getTransferRefId = $("#hdnTransferId").val();
    var ddlFromLocType = $("#ddlLocationType").val();
    var ddlToLocType = $("#ddlToLocationType").val();
    var getFromTrId = $("#texthdnFromTrId").val();
    var getToTrId = $("#texthdnToTrId").val();
       
if(getTransferRefId !=0)
{
    if(validateQty() == true)
    {

    //var getTranferID = $("#hdnPoOid").val();
        var getRemark = $("#txtTransferRemark").val();
        var getSKUId = $("#texthdnSKUID").val();
        var getlottables = $("#textLottable").val();
        // var getlottable = getlottables.split("|");
        // getlot1 = getlottable[0];
        // getlot2 = getlottable[1];
        // getlot3 = getlottable[2];
        var getQuantity = $("#textinputQuantity").val();
        
        var getFromLocationID = $("#texthdnFromLocationID").val();
        var getToLocationID = $("#texthdnToLocationID").val();
        
        var getFromPalletID = $("#texthdnFromPalletID").val();
        var getToPalletID = $("#texthdnToPalletID").val();

        var getFromTRID = $("#texthdnFromTrId").val();
        var getToTRID = $("#texthdnToTrId").val();

        if(globalInternalBusinessPalletRule == "YES")
        {
            var postData =
            {
                "transferId": getTransferRefId,       
                "fromLocationId": getFromLocationID,
                "fromPallet": getFromPalletID,
                "skuid": getSKUId,
                "Lottable":getlottables,
                "Quantity": getQuantity,       
                "ToLocationId": getToLocationID,
                "ToPallet": getToPalletID,
                "WarehouseId": getWarehouseId,
                "CustomerId": getCustomerId,
                "ComapnyId": getCompanyID,
                "UserId": getUserId,
                "FromLocationType": ddlFromLocType,
                "ToLocationType":ddlToLocType,
                "FromTrId": getFromTRID,
                "ToTrId":getToTRID
              
            }
    }
    else
    {
        getToPalletID = '0';
        getFromPalletID = '0';
        var postData =
        {
            "transferId": getTransferRefId,       
            "fromLocationId": getFromLocationID,
            "fromPallet": getFromPalletID,
            "skuid": getSKUId,
            "Lottable":getlottables,
            "Quantity": getQuantity,       
            "ToLocationId": getToLocationID,
            "ToPallet": getToPalletID,
            "WarehouseId": getWarehouseId,
            "CustomerId": getCustomerId,
            "ComapnyId": getCompanyID,
            "UserId": getUserId,
            "FromLocationType": ddlFromLocType,
            "ToLocationType":ddlToLocType,
            "FromTrId": getFromTRID,
            "ToTrId":getToTRID
        } 
    }
      callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Result.Message;
        var getStatusCode = data.StatusCode;
        if (getStatus == 'success') {
            alert("Transfer done successfully")
            viewOrder(getTransferRefId);
        }
        else{
            alert(getStatus)
            //viewOrder(getTransferRefId);
        }
    });
}
}
else{
    saveTransferHead();
}
}


function viewTransferHead(strCurrentOrder) {
    debugger;
    //checkBusinessRule();
    if (strCurrentOrder != '0') 
    {
       
		// var apiPath = "http://localhost:50068/api/staging/v1/Transfer/getHeadList";
        var apiPath = wmsApiPath + 'Transfer/getHeadList';
        var postData =
        {
            CustomerId: getCustomerId,
            CompanyId: getCompanyID,
            WarehouseId: getWarehouseId,
            UserId: getUserId,
            TransferId: strCurrentOrder
        };

        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.StatusCode;
            var getStatus = data.Status.toLocaleLowerCase();
            var docRow = '';
            if (getCode == "Success") {
				var getResult = data.Result;
				var getTransferHead = getResult.Table;
				
                var getID = getTransferHead[0].Id;
				var getTransferDate = getTransferHead[0].TransferDate;
				var getTransferBy = getTransferHead[0].TransferBy;
                var getRemark = getTransferHead[0].Remark;
				var getStatusName = getTransferHead[0].StatusName;
				var getStatusID = getTransferHead[0].Status;
               
                $("#spnTransferid").html(getID);
                $("#hdnTransferId").val(getID);
                $('#AssignDate').html(getTransferDate);
                $('#transferby').val(getTransferBy);
                $('#txtTransferRemark').val(getRemark);
                $('#txtHeadStatus').html(getStatusName);
                getTransferDetails(strCurrentOrder,0);   
            }
        });
    }
    else {
       $("#spnTransferid").html('To be Generated');
       $("#hdnTransferId").val('0');
       var getCurrentDate = isBlankDate('');
       $("#AssignDate").val(getCurrentDate);
       $("#transferby").html(getUserName);
       $("#txtTransferRemark").val();
        $("#txtHeadStatus").val();
        getTransferDetails(strCurrentOrder,0);
    }
}


// Binding Transfer List
function getTransferDetails(strCurrentOrder,Orderno) {
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/getTransferSkuList";
    var apiPath = wmsApiPath + 'Transfer/getTransferSkuList';
    var getTransferRefId = $("#hdnTransferId").val();
    //checkBusinessRule()
    //isBusinessRule = globalInternalBusinessPalletRule;
    var postData =
    {
        "transferId": getTransferRefId,    
        "CustomerId": getCustomerId,
        "CompanyId": getCompanyID,
        "WarehouseId": getWarehouseId        
    };
    
    var getLottable = mBrillWmsSession.getCustomerLottable();
    var breakCustLot = getLottable.split(',');
    
    $('#tblTransferDetailsgrid').html('');

    var skuCellStyle = '';
    var palletCellStyle = '';
    var lottableBtnCellStyle = 'border-left:none;padding-left:0px;width:29px;';

    if(globalInternalBusinessPalletRule == "YES")
    {
        palletCellStyle = 'border-right:none;padding-right:0px;';
    }else{
        skuCellStyle = 'border-right:none;padding-right:0px;';
    }

    //Bind Header
    var gridTableHeader = '';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-header">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;">From Location Type</div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;">From Location</div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;'+ skuCellStyle +'">SKU Code</div>';
    //alert(strCurrentOrder + '-Rule:- ' + globalInternalBusinessPalletRule);
    if(globalInternalBusinessPalletRule == "YES")
    {
        gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;'+ palletCellStyle +'">From Pallet</div>';

    }
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;'+ lottableBtnCellStyle +'"></div>';
    for(var pl=0; pl < breakCustLot.length; pl++){
        var custLotLabel = breakCustLot[pl];
        gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;display:none;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
    }
    
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;">Available Qty</div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;">Quantity</div>'
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;">To Location Type</div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;">To Location</div>';
    if(globalInternalBusinessPalletRule == "YES")
    {
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;">To Pallet</div>';
    
    }
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
    gridTableHeader = gridTableHeader + '</div>';
    //Bind Header
    //Bind Add New Row
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-row wmsFrmAddRow">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlLocationType" onclick=""><option>--Select List--</option></select></div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-suggestion-holder">';
    gridTableHeader = gridTableHeader + '<input type="text" data-prefix="SESKU" id="textFromLocation" data-id="" value="" disabled class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="getFromLocation();return false;"><i class="fas fa-search"></i></a>';
    gridTableHeader = gridTableHeader + '<input type="hidden" data-prefix="SESKU" id="texthdnFromLocationID" data-id=""value="" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="'+ skuCellStyle +'">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-suggestion-holder">';
    gridTableHeader = gridTableHeader + '<input type="text" data-prefix="SESKU" id="textSKUCode" data-id="" value="" disabled class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="getSKUList();return false;"><i class="fas fa-search"></i></a>';
    gridTableHeader = gridTableHeader + '<input type="hidden" data-prefix="SESKU" id="texthdnSKUID" data-id=""value="" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '</div>';
   
    if(globalInternalBusinessPalletRule == "YES")
    {
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="'+ palletCellStyle +'">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-suggestion-holder">';
    gridTableHeader = gridTableHeader + '<input type="text" data-prefix="SESKU" id="textfromPallet" data-id="" disabled value="" class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="getFromPalletList();return false;"><i class="fas fa-search"></i></a>';
    gridTableHeader = gridTableHeader + '<input type="hidden" data-prefix="SESKU" id="texthdnFromPalletID" data-id=""value="0" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '</div>';
    }
    
    // gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell">';
    // gridTableHeader = gridTableHeader + '<div class="wms-srv-suggestion-holder">';
    // gridTableHeader = gridTableHeader + '<input type="text" data-prefix="SESKU" id="textLottable" data-id="" disabled value=""class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="getLottableList();return false;"><i class="fas fa-search"></i></a>';
   
    // gridTableHeader = gridTableHeader + '</div>';
    // gridTableHeader = gridTableHeader + '</div>';

    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell" style="'+ lottableBtnCellStyle +'">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-suggestion-holder">';
    gridTableHeader = gridTableHeader + '<input type="hidden" data-prefix="SESKU" id="textLottable" data-id="" disabled value=""class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="getLottableList();return false;" title="Select Lottable"><i class="fas fa-tag"></i></a>';
   
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '</div>';

    for(var pl=0; pl < breakCustLot.length; pl++){
        var custLotLabel = breakCustLot[pl];
        gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;display:none;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'"></div>';
    }

    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell">';
    gridTableHeader = gridTableHeader + '<input type="text" disabled  data-prefix="SESKU" id="txtAvilableBln" data-id="" value="" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell">';
    gridTableHeader = gridTableHeader + '<input type="text" data-prefix="SESKU" id="textinputQuantity" onfocusout="checkEnterVal();return false;" data-id="" value="" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlToLocationType" onclick=""><option>--Select List--</option></select></div>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-suggestion-holder">';
    gridTableHeader = gridTableHeader + '<input type="text" data-prefix="SESKU" id="textToLocation" data-id="" value="" disabled class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="getToLocation();return false;"><i class="fas fa-search"></i></a>';
    gridTableHeader = gridTableHeader + '<input type="hidden" data-prefix="SESKU" id="texthdnToLocationID" data-id="" value="" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '<input type="hidden" data-prefix="SESKU" id="texthdnToTrId" data-id="" value="" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '<input type="hidden" data-prefix="SESKU" id="texthdnFromTrId" data-id="" value="" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '</div>';
    
    if(globalInternalBusinessPalletRule == "YES")
    {
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-suggestion-holder">';
    gridTableHeader = gridTableHeader + '<input type="text" data-prefix="SESKU" id="textToPallet" data-id="" value="" disabled class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="getToPalletList();return false;"><i class="fas fa-search"></i></a>';
    gridTableHeader = gridTableHeader + '<input type="hidden" data-prefix="SESKU" id="texthdnToPalletID" data-id=""value="0" class="wms-srv-grid-cell-input notranslate">';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '</div>';
    }
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-cell">';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-grid-action">';
    gridTableHeader = gridTableHeader + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle"onclick="saveTransferDetails(); return false;"></i></a>';
    gridTableHeader = gridTableHeader + '<div class="wms-srv-action-sep">|</div>';
    gridTableHeader = gridTableHeader + '<a href="#" title="Cancel" class="wms-srv-cancel" data-prefix="CN"><i class="fas fa-times-circle" onclick="clearInput();"></i></a>'
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '</div>';
    gridTableHeader = gridTableHeader + '</div>';
    
    //Bind Add New Row
    $('#tblTransferDetailsgrid').html(gridTableHeader);
    
    if(strCurrentOrder !=0)
    {
    callHttpUrl(apiPath, postData, function (data) {
        var gridTable = '';
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {

            // BIND DATA GRID

            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) 
            {
                var getSkuTranferId = getGridData[i].TransferId;
                var getFromLocationTypeList = getGridData[i].FromLocationType;
                var getFromLocation = getGridData[i].FromLocationCode;
                var getFromPallet = getGridData[i].FromPallet
                var getSKUCode = getGridData[i].ProductCode;
                var getLottable1 = getGridData[i].Lottable1;
                var getLottable2 = getGridData[i].Lottable2;
                var getLottable3 = getGridData[i].Lottable3;
                var getQuantity = getGridData[i].Quantity;
                var getToLocationType = getGridData[i].ToLocationType;
                var getToLocationCode = getGridData[i].ToLocationCode;
                var getToPallet = getGridData[i].ToPallet;
                var avilQty = "";
                var lottable = getLottable1 + '|' + getLottable2 + '|' + getLottable3;
                var getLottableGroup = [];
                getLottableGroup.push(getGridData[i].Lottable1);
                getLottableGroup.push(getGridData[i].Lottable2);
                getLottableGroup.push(getGridData[i].Lottable3);
                getLottableGroup.push(getGridData[i].Lottable4);
                getLottableGroup.push(getGridData[i].Lottable5);
                getLottableGroup.push(getGridData[i].Lottable6);
                getLottableGroup.push(getGridData[i].Lottable7);
                getLottableGroup.push(getGridData[i].Lottable8);
                getLottableGroup.push(getGridData[i].Lottable9);
                getLottableGroup.push(getGridData[i].Lottable10);
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getFromLocationTypeList + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getFromLocation + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;"+ skuCellStyle +"'>" + getSKUCode + "</div>";
              
                if(globalInternalBusinessPalletRule == "YES")
                {
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;"+ palletCellStyle +"'>" + getFromPallet + "</div>";
                
                }
                // gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + lottable + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;"+ lottableBtnCellStyle +"'></div>";
                for(var pi=0; pi < breakCustLot.length; pi++){
                    var custLotLabel = breakCustLot[pi];
                    var custLotVal = getLottableGroup[pi];
                    if(custLotVal!= null && custLotVal.trim() == '0'){
                      custLotVal = '';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
                }
                
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + avilQty + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getQuantity + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getToLocationType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getToLocationCode + "</div>";
                if(globalInternalBusinessPalletRule == "YES")
                {
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getToPallet + "</div>";
                }
                gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action removediv" id="removebtndiv" style="display:none;"><button class="wms-srv-input wms-srv-button" type="button" onclick="" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button></div></div>';
                gridTable = gridTable + '</div>';
                // GRID ROW
                
                
                }
                $('#tblTransferDetailsgrid').append(gridTable);           
                // BIND DATA GRID
                TransferPopup();
                showHideLotCellForInternalTransferRow('tblTransferDetailsgrid');
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
        
    }
    else{
        TransferPopup();
    }
    showHideLotCellForInternalTransferRow('tblTransferDetailsgrid');
}
// Binding Transfer List


function checkBusinessRule()
{
    debugger;
   //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/checkTransfBusinessRule";
    var apiPath = wmsApiPath + 'Transfer/checkTransfBusinessRule';
     var getTransferRefId = $("#hdnTransferId").val();
     var postData =
     {  
         "UserId": getUserId,        
         "CustomerId": getCustomerId,
         "CompanyId": getCompanyID,
     }
     callHttpUrl(apiPath, postData, function (data) {
        var gridTable = '';
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) 
            {
                var getBusinessRule = getGridData[i].BusinessRule;

            };

            globalInternalBusinessPalletRule = getBusinessRule
           // alert(globalInternalBusinessPalletRule);
        }
    });
    
   // return getBusinessRule;
}

function validatePallet()
{
    var getlocation = $("#textFromLocation").val();
    var getPallet = $("#textfromPallet").val();
    var getSKUCode = $("#textSKUCode").val();
    var getLottable = $("#textLottable").val();
    var getToLocation = $("#textToLocation").val();
    if(getlocation == '')
    {
        alert("Please select location..!!");
        return false;
    }
    else if(getPallet == '')
    {
        alert("Please select Pallet..!!");
        return false;
    }
    else if(getSKUCode == '')
    {
        alert("Please select sku code..!!");
        return false;
    }
    else if(getLottable == '')
    {
        alert("Please select Lottable..!!");
        return false;
    }
    else if(getToLocation == '')
    {
        alert("Please select to location..!!");
        return false;
    }
    else{
        return true;
    }
}

function validateToLocation()
{
    var getlocation = $("#textFromLocation").val();
    var getPallet = $("#textfromPallet").val();
    var getSKUCode = $("#textSKUCode").val();
    var getLottable = $("#textLottable").val();
    var getToLocation = $("#textToLocation").val();
    var getToLocTypeVal = $("#ddlToLocationType").val();
    if(getToLocTypeVal == 0)
    {
        alert("Please Select To Location Type..!!");
    }
    else if(getlocation == '')
    {
        alert("Please select location..!!");
        return false;
    }
    else if(getPallet == '')
    {
        alert("Please select Pallet..!!");
        return false;
    }
    else if(getSKUCode == '')
    {
        alert("Please select sku code..!!");
        return false;
    }
    else if(getLottable == '')
    {
        alert("Please select Lottable..!!");
        return false;
    }
    else{
        return true;
    }
}
function checkEnterVal()
{
    debugger;
    var getQuantity = $("#textinputQuantity").val();
    if(getQuantity > 0)
    {
        return true;
    }
    else{
        alert("Please Enter Value Above 0");
        $("#textinputQuantity").val('');
        return false;
    }

}


function validatesaveFeilds()
{
    var getlocation = $("#textFromLocation").val();
    var getPallet = $("#textfromPallet").val();
    var getSKUCode = $("#textSKUCode").val();
    var getLottable = $("#textLottable").val();
    var getToLocation = $("#textToLocation").val();
    var getToPallet = $("#textToPallet").val();
    var getQuantity = $("#textinputQuantity").val();
    var getRemakr = $("#txtTransferRemark").val();
    if(getlocation == '')
    {
        alert("Please select location..!!");
        return false;
    }
    
    if(globalInternalBusinessPalletRule == "YES")
    {
        if(getPallet == '')
        {
            alert("Please select Pallet..!!");
            return false;
        }
    }
    else if(getSKUCode == '')
    {
        alert("Please select sku code..!!");
        return false;
    }
    else if(getLottable == '')
    {
        alert("Please select Lottable..!!");
        return false;
    }
    else if(getToLocation == '')
    {
        alert("Please select To Location..!!");
        return false;
    }
    
    if(globalInternalBusinessPalletRule == "YES")
    {
        if(getToPallet == '')
    {
        alert("Please select To Pallet..!!");
        return false;
    }
    }
    else if(getQuantity == '')
    {
        alert("Please select To Quantity..!!");
        return false;
    }
    else if(getRemakr == '')
    {
        alert("Please select To Remark..!!");
        return false;
    }
    else{
        return true;
    }
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

function formatCustomDate(strDate) {
    var d = new Date(strDate);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    var finalDate = da + '-' + mo + '-' + ye;
    return finalDate;
}

function clearInput()
{
    $("#textFromLocation").val('');
    $("#textfromPallet").val('');
    $("#textSKUCode").val('');
    $("#textLottable").val('');
    $("#textinputQuantity").val('');
    $("#textToLocation").val('');
    $("#textToPallet").val('');
    $("#txtTransferRemark").val('');
    $("#ddlLocationType").val(0);
    $("#ddlToLocationType").val(0);
    $("#txtAvilableBln").val('');
    
}


function viewOrderDetails(getTransferId)
{
    debugger;
    var apiPath = wmsApiPath + 'Transfer/viewTransferList';
    //var apiPath = "http://localhost:50068/api/staging/v1/Transfer/viewTransferList";
    var postData =
    {  
        "UserId": getUserId,
        "WarehouseId":getWarehouseId,        
        "CustomerId": getCustomerId,
        "CompanyId": getCompanyID,
        "TransferId":getTransferId
    }
    callHttpUrl(apiPath, postData, function (data) {
        var gridTable = '';
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') 
        {
            var getLottable = mBrillWmsSession.getCustomerLottable();
            var breakCustLot = getLottable.split(',');
            $("#wms-srv-Viewtransfer-popup").show();

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
                // gridDetails = gridDetails + '<div class="wms-srv-grid-cell" style="width: 295px;">Lottable</div>';
                
                for(var pl=0; pl < breakCustLot.length; pl++){
                    var custLotLabel = breakCustLot[pl];
                    gridDetails = gridDetails + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="'+pl+'" data-lottype="'+ custLotLabel +'">'+ custLotLabel +'</div>';
                }
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">Quantity</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">To Location Type</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">To Location</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">To Pallet</div>';
                gridDetails = gridDetails + '</div>';

            for (var i = 0; i < getGridTable2.length; i++) 
            {
                var getTransferID = getGridTable2[i].TransferID;
                var getFromLocType = getGridTable2[i].FromLocType;
                var getFromLocationCode = getGridTable2[i].FromLocationCode;
                var getFromPallet = getGridTable2[i].FromPallet;
                var getSkuCode = getGridTable2[i].SkuCode;
                var getLot = getGridTable2[i].Lottables;
                var getQuantity= getGridTable2[i].Quantity;
                var getToLocType = getGridTable2[i].ToLocType;
                var getToLocationCode = getGridTable2[i].ToLocationCode;
                var getToPallet= getGridTable2[i].ToPallet;
    

                    var lotVal = getLot.split(',');
                    var lot1 = lotVal[0];
                    var lot2 = lotVal[0];
                    var lot3 = lotVal[0];
                    var getLottables = lot1+' | '+ lot2+' | '+ lot3;


                gridDetails = gridDetails + '<div class="wms-srv-grid-row">';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getFromLocType+'</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getFromLocationCode+'</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getFromPallet+'</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getSkuCode+'</div>';
                // gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getLottables+'</div>';

                for(var pi=0; pi < breakCustLot.length; pi++){
                    var custLotLabel = breakCustLot[pi];
                    var custLotVal = lotVal[pi];
                    if(custLotVal!= null && custLotVal.trim() == '0'){
                      custLotVal = '';
                    }
                    gridDetails = gridDetails + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ pi +'" data-lottype="'+ custLotLabel +'" style="width: 82px; text-align: center;">'+ custLotVal +'</div>';       
                }

                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getQuantity+'</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getToLocType+'</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getToLocationCode+'</div>';
                gridDetails = gridDetails + '<div class="wms-srv-grid-cell">'+getToPallet+'</div>';                                
                gridDetails = gridDetails + '</div>';
            };
            
            $("#ViewTransferDetail").append(gridDetails);
           
        }
        showHideLotCellForInternalTransferRow('ViewTransferDetail');
    });

    
}
