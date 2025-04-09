function initThirdPartyConfiguration() {
    getAPITPActiveList(strCurrentPage, searchfilter, searchvalue);

}

var WarehouseId = mBrillWmsSession.getWarehouseId();
var CustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCompanyId();
var getUserId = mBrillWmsSession.getUserId();
var getCurrentPage = "1";
var getRecordLimit = "30";
var getCustomerId = $("#ddlcustomer").val();
var WarehouseID = $('#ddlwarehouse').val();
var searchfilter = '0';
var searchvalue = '0';
var getTotalRecords = "10";//Pageing
var strCurrentPage = "1";//pageing
var getSkuCategoryId = "1";
var getId;


function getAPITPActiveList(fromDate, toDate) {

    debugger;

    apiPath = wmsApiPath + 'APITP/APITPActiveList'
    // var apiPath = 'http://localhost:50068/api/staging/v1/APITP/APITPActiveList'

    if (searchfilter == '') {
        searchfilter = '0';//filter 
        searchvalue = '0';// filter
    }

    var postData =
    {
        //  "CurrentPage": CurrentPage,//pageing
        // "RecordLimit": getTotalRecords,//pageing
        "CustomerId": CustomerId,//'1',
        "CompnayId": getCompanyId,//'1',
        "UserId": getUserId //'1',
        //  "Filter": searchvalue,//filter
        //  "Search": searchfilter//filter

    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == 200) {
            $(".wms-srv-grid2").html('');
            var myGridList = data.Result;
            var getTotalRecords = myGridList.Table[0].TotalRecord;//Pageing
            strCurrentPage = myGridList.Table[0].CurrentPage;	//Pageing

            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">API Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">API Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">API Method</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width: 215px;">API Key</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Remark</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < myGridList.Table.length; i++) {

                getrownumber = myGridList.Table[i].rownumber;
                getID = myGridList.Table[i].ID;
                getAPI = myGridList.Table[i].API;
                getMETHOD = myGridList.Table[i].METHOD;
                getAPIKEYS = myGridList.Table[i].APIKEYS;
                getISACTIVE = myGridList.Table[i].ISACTIVE;
                getREMARK = myGridList.Table[i].REMARK;
                getAPI_Name = myGridList.Table[i].API_Name;
                getAPI_Code = myGridList.Table[i].API_Code;


                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getAPI_Name + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getAPI_Code + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getMETHOD + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width: 215px;">' + getAPIKEYS + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width: 215px;">' + getREMARK + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<i class="fas fa-key" title="Key" onclick="openAPIKeyPopup(' + getID + ')"></i>';
                gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
                gridTable = gridTable + '<i class="fa fa-list" title="API Log" onclick="openAPILogListPopup(' + getID + ')"></i>';
                gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
                gridTable = gridTable + '<i class="fa fa-info-circle" title="Help Parameter"onclick="openhelpPopup(' + getID + ')"></i>';
                //gridTable = gridTable + '</i></div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';

            }
            $(".wms-srv-grid2").html(gridTable);
            // setupGridPagingList('wms-srv-grid-pager-ProductMaster', CurrentPage, getTotalRecords, getProductList);
        }

        else {
            alert("Record not found!!");
        }


    });
}


function openhelpJson() {

    $('#wms-srv-UOM-popup').show();
    $('#wms-srv-UOM-popup-close').off();
    $('#wms-srv-UOM-popup-close').click(function () {
        $('#wms-srv-UOM-popup').hide();
    });
}

function openAPIKeyPopup(getID) {

    $('#wms-srv-Lottable-popup').show();
    $('#wms-srv-Lottable-popup-close').off();
    $('#wms-srv-Lottable-popup-close').click(function () {
        $('#wms-srv-Lottable-popup').hide();
    });
    getAPITPKeyList(getID);
    //lottabelDdl();
}


function openhelpPopup(getID) {

    $('#wms-srv-help-popup').show();
    $('#wms-srv-help-popup-close').off();
    $('#wms-srv-help-popup-close').click(function () {
        $('#wms-srv-help-popup').hide();
    });
    gethelpparamterList(getID);

}

function openAPILogListPopup(getID) {
    $('#wms-srv-apiloglist-popup').show();
    $('#wms-srv-apiloglist-popup-close').off();
    $('#wms-srv-apiloglist-popup-close').click(function () {
        $('#wms-srv-apiloglist-popup').hide();
    });
    getAPIListLog(getID);
}

function getAPITPKeyList(getkeyid) {
    debugger;
    apiPath = wmsApiPath + 'APITP/APITPKEY'
    // var apiPath = "http://localhost:50068/api/staging/v1/APITP/APITPKEY";
    var postData =
    {
        "CustomerId": CustomerId, //'1',
        "CompnayId": getCompanyId,//'1',
        "WarehouseId": WarehouseId,//'1',
        "UserId": getUserId,//'1',
        "getkeyid": getkeyid
    }
    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            $("#GetLottableList").html('')
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Security Keys</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Security Code</div>';
            gridTable = gridTable + ' <div class="wms-srv-grid-cell">Pass code</div>';
            gridTable = gridTable + ' <div class="wms-srv-grid-cell">Warehouse code</div>';
            gridTable = gridTable + '</div>';

            var myGridList = data.Result;

            for (var i = 0; i < myGridList.Table.length; i++) {
                var GetID = myGridList.Table[i].ID;
                var GetSecurityKeys = myGridList.Table[i].SecurityKeys
                var getSecurity_Code = myGridList.Table[i].Security_Code
                var getPass_code = myGridList.Table[i].Pass_code
                var getWarehouse_code = myGridList.Table[i].Warehouse_code
                gridTable = gridTable + '<div class="wms-srv-grid-cell" >' + GetSecurityKeys + ' <a href="#" title="Copy Security Keys"style="text-align: center;" onclick="copykeys(this,\'' + GetSecurityKeys + '\');"><i class="fas fa-copy" ></i></a>  </div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getSecurity_Code + ' <a href="#" title="Copy Security Code"style="text-align: center;" onclick="copykeys(this,\'' + getSecurity_Code + '\');"><i class="fas fa-copy" ></i></a> </div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPass_code + ' <a href="#" title="Copy Pass code"" style="text-align: center;" onclick="copykeys(this,\'' + getPass_code + '\');"><i class="fas fa-copy" ></i></a></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell "  id="txtSetActivationLink"  >' + getWarehouse_code + ' <a href="#" title="Copy Warehouse code"style="text-align: center;" onclick="copykeys(this,\'' + getWarehouse_code + '\');"><i class="fas fa-copy" ></i></a>  </div>';

                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }

            $("#GetLottableList").html(gridTable);
        }
    });

}

function gethelpparamterList(getHelpid) {
    debugger;

    var ObjectID = getHelpid
    apiPath = wmsApiPath + 'APITP/getAPITPParameterlist'
    //var apiPath = "http://localhost:50068/api/staging/v1/APITP/HelpParamter";
    var postData =
    {
        "CompanyID": getCompanyId,//'1',
        "CustomerID": CustomerId,//'1',
        "UserID": getUserId,//'1',
        "ObjectID": ObjectID
    }

    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            $("#GethelpList").html('')
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Data Type</div>';
            gridTable = gridTable + ' <div class="wms-srv-grid-cell">Required</div>';
            gridTable = gridTable + ' <div class="wms-srv-grid-cell">Description</div>';
            gridTable = gridTable + '</div>';
            var myGridList = data.Result;
            for (var i = 0; i < myGridList.Table.length; i++) {
                var GetID = myGridList.Table[i].ID;
                var GetfieldName = myGridList.Table[i].fieldName
                var getDataType = myGridList.Table[i].DataType
                var getRequired = myGridList.Table[i].Required
                var getDescription = myGridList.Table[i].Description
                var getSampleJSON = myGridList.Table[i].SampleJSON
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + GetfieldName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center; ">' + getDataType + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center; ">' + getRequired + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center; ">' + getDescription + '</div>';
                gridTable = gridTable + '</div>';
            }
            $("#GethelpList").html(gridTable);
            SampleJSON(getSampleJSON);
        }
    });

}

function SampleJSON(getSampleJSON) {
    debugger
    // var bindhtml = JSON.stringify(getSampleJSON);
    var bindhtml = getSampleJSON;
    $('#databind-txtarea-samplejson').html(bindhtml);
    $('#wms-srv-help-popup').show();
}

function copykeys(obj, copytext) {
    debugger;
    $(obj).css('color', '#00acd7');
    navigator.clipboard.writeText(copytext);
}

copytext()
{
    navigator.clipboard.writeText(copytext);

}

function copyLink() {
    debugger;
    const myElement = document.querySelector("#txtSetActivationLink");
    const text = myElement.textContent;
    navigator.clipboard.writeText(text)

}



function myFunction() {
    debugger;
    // Get the text field
    var copyText = document.getElementById("databind-txtarea-samplejson");
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    // Alert the copied text
    //alert("Copied the text: " + copyText.value);
}



function OpenPopup() {
    $('#app' + obj).show();
    $('#wms-srv-' + obj + '-popup').show();
}

function closePopup() {

    $('#app' + obj).hide();
    $('#wms-srv-' + obj + '-popup').hide();
}


var getSelectedDateCatg = "";
var GetCurrentUserDate = "";
var currentfinacial = "2022/04/01";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";

var obj = 'objrexta';


$(document).ready(function () {
    loadCurrentDate();
    $("#btnSearchReport" + obj).click(function () {
        getAPIListLog(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    })
    $(".iconClose").click(function () {
        $("#dateSelecter" + obj).hide();
    });
    //getSevenDateData();
    $('#txt_FromdatePicker' + obj).datepicker({
        dateFormat: 'dd/mm/yyyy',
        onSelect: function (date) {
            var getFromDate = $('#txt_FromdatePicker' + obj).val();
            var getToDate = $('#txt_TodatePicker' + obj).val();
            $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
            $("#hideFromDate").val(getFromDate);
        }
    });
    $('#txt_TodatePicker' + obj).datepicker({
        dateFormat: 'dd/mm/yyyy',
        onSelect: function (date) {
            var getFromDate = $('#txt_FromdatePicker' + obj).val();
            var getToDate = $('#txt_TodatePicker' + obj).val();
            $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
            $("#hideToDate").val(getToDate);
        }
    });

    globalDefaultFromDate = $("#hideFromDate" + obj).val();
    globalDefaultToDate = $("#hideToDate" + obj).val();

    var getFromDate = $("#txtFromToDate" + obj).val();
    var getSearchFromDate = "";
    getSearchFromDate = getFromDate.substr(0, 10);
    getSearchToDate = getFromDate.substr(14, 24);
    getAPIListLog(getSelectedDateCatg, getSearchFromDate, getSearchToDate);

})

var getSelectedDateCatg = "";
// function getAPIListLog(getSelectedDateCatg, fromDate, toDate) {

//     debugger;
//     if (fromDate == "") {
//         var getFromDate = $("#txtFromToDate" + obj).val();
//         var getSearchFromDate = "";
//         getSearchFromDate = getFromDate.substr(0, 10);
//         getSearchToDate = getFromDate.substr(14, 24);
//         getAPIListLog(getSelectedDateCatg, getSearchFromDate, getSearchToDate);
//     }
//     var getSearchToDate = "";

//     apiPath = wmsApiPath + 'APITP/APITPLogList'

//     var getSearchFilter = "OrderNo"
//     var SearchByDate = "SearchByDate";
//     var getObject = $("#ddlPageObjectobjrexta").val();

//     if (getSelectedDateCatg == "") {

//         var getSearch = $("#txtfilter" + obj).val();
//         var getCustomerOrder = $("#txtCustomerOrderNo" + obj).val();
//         getSearchVal = getSearch.split("/").reverse().join("/");

//         if (getSearchVal != "" && getCustomerOrder == "") {
//             getCustomerOrder = getSearchVal;
//             getSearchFilter = SearchByDate
//         }


//         if (getCustomerOrder == "") {


//             var postData =
//             {
//                 "UserId": getUserId,
//                 "CustomerId": CustomerId,
//                 "WarehouseId": WarehouseId,
//                 "CompanyID": getCompanyId,
//                 "SearchFilter": "",
//                 "SearchValue": "",
//                 "fromDate": fromDate,
//                 "toDate": toDate,
//                 "OrderType": ""
//             };
//         }
//         else {
//             var postData =
//             {
//                 "UserId": getUserId,
//                 "CustomerId": CustomerId,
//                 "WarehouseId": WarehouseId,
//                 "CompanyID": getCompanyId,
//                 "SearchFilter": getSearchFilter,
//                 "SearchValue": '',
//                 "fromDate": "-",
//                 "toDate": "-",
//                 "OrderType": ""

//             };
//         }
//         // else{
//         //     alert("Please Enter Valid Data..!!");
//         // }

//     }
//     else {

//         // var searchByDate = getSelectedDateCatg.split("-").reverse().join("/");
//         // var CurrentDate = GetCurrentUserDate.split("-").reverse().join("/");

//         var postData =
//         {
//             "UserId": getUserId,
//             "CustomerId": CustomerId,
//             "WarehouseId": WarehouseId,
//             "CompanyID": getCompanyId,
//             "SearchFilter": "",
//             "SearchValue": "",
//             "fromDate": searchByDate,
//             "toDate": CurrentDate,
//             "OrderType": ""
//         };
//     }

//     callHttpUrl(apiPath, postData, function (data) {

//         var getStatus = data.Status;
//         var getStatusCode = data.Code;
//         if (getStatus == 200) {
//             var gridTable = data.Result.Table;
//             if (obj == 'objrexta') {

//                 var myGridList = data.Result.Table1[0];
//                 //  var getTotalRecords = myGridList.TotalRecords;
//                 // GET DASHBOARD COUNTS
//                 var getOpenTask = myGridList.APISuccess1;
//                 var getCompleteTask = myGridList.APIFail;


//                 $('#cntTotalISuccess').html(getOpenTask);
//                 $('#cntTotalFail').html(getCompleteTask);
//                 // $("#gettopfiveorder" + obj).html("");
//                 $("#GetAPIList").html(gridTable);
//                 var gridTable = '';

//                 gridTable = gridTable + '<div class="wms-srv-grid-row">';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell">' + GetAPIID + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getCreatedDate + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getDocumentRefNo + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getTOKENSTATUS + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getAPIMethod + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getIPAddress + '</div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell">';
//                 gridTable = gridTable + '<div class="wms-srv-grid-action">';
//                 gridTable = gridTable + '<a href="#" title="Open JSON for Request" class="wms-srv-save" data-prefix="SV"><i class="fas fa-file-code" onclick=" openRequest(' + GetAPIID + ',\'' + getRequestParaJson + '\')"></i></a>';
//                 gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
//                 gridTable = gridTable + '<a href="#" title="Open JSON for Response" class="wms-srv-save" data-prefix="SV"><i class="fas fa-solid fa-eye" onclick=" openResponse(' + GetAPIID + ',\'' + getResponseParaJson + '\')"></i></a>';
//                 gridTable = gridTable + '</div>';
//                 gridTable = gridTable + '</div>';
//                 gridTable = gridTable + '</div>';


//                 var myGridList = data.Result;

//                 for (var i = 0; i < myGridList.Table.length; i++) {
//                     var GetAPIID = myGridList.Table[i].ID;
//                     var getToken = myGridList.Table[i].Token;
//                     var getAPIKeys = myGridList.Table[i].APIKeys;
//                     var getAPIURL = myGridList.Table[i].APIURL;
//                     var getAPIMethod = myGridList.Table[i].APIMethod;
//                     var getIPAddress = myGridList.Table[i].IPAddress;
//                     var getBrowserDetails = myGridList.Table[i].BrowserDetails;
//                     var getRequestParaJson = myGridList.Table[i].RequestParaJson;
//                     var getRequestStatus = myGridList.Table[i].RequestStatus;
//                     var getRequestMessage = myGridList.Table[i].RequestMessage;
//                     var getResponseParaJson = myGridList.Table[i].ResponseParaJson;
//                     var getResponseStatus = myGridList.Table[i].ResponseStatus;
//                     var getResponseMessage = myGridList.Table[i].ResponseMessage;
//                     var getTOKENSTATUS = myGridList.Table[i].TOKENSTATUS;
//                     var getCreatedDate = myGridList.Table[i].CreatedDate;
//                     var getDocumentRefNo = myGridList.Table[i].DocumentRefNo;


//                     myGrid = myGrid + '<div id="" class="wms-srv-grid-row  reportRow">';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getExpectedRec + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getOrderReferenceNo + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getVendorName + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getName + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getWarehouseName + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getExpectedDate + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getStatus + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell detailIconCell"  onclick="openDetailReport(' + getExpectedRec + ');"style="text-align:center;"><i class="fas fa-solid fa-eye"></i></div>';
//                     myGrid = myGrid + '</div>';

//                 }
//                 $("#GetAPIList").html(gridTable);
//             }

//         }
//     });
//     $("#dateSelecter" + obj).hide();
// }


function getAPIListLog(searchvalue) {
    debugger;

    // searchfilter = $('#wms-srv-search-filter-ProductMasterList').val();// filter ddl

    // searchvalue = $('#wms-srv-simple-search-ProductMasterList').val();// search txt

    var getToDate = $('#txtfilterTo').val();

    apiPath = wmsApiPath + 'APITP/APITPLogList'
    // var apiPath = "http://localhost:50068/api/staging/v1/APITP/APITPLogList";
    var getFromDate = $('#txtfilterFrom').val();
    var getToDate = $('#txtfilterTo').val();

    var searchvalue = $('#txtfilterSearch').val();

    if (searchvalue == '') {
        searchvalue = '0';
    }
    var postData =
    {
        "UserId": getUserId,//'1',
        "CustomerId": CustomerId,// '1',
        "WarehouseId": WarehouseId,//'1',
        "CompanyID": getCompanyId,//'1',
        "SearchFilter": "",
        "SearchValue": searchvalue,
        "fromDate": "",
        "toDate": "",
        "OrderType": ""
    }
    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status
        if (isStatus == 200) {
            $("#GetAPIList").html('')

            var myGridList = data.Result.Table1[0];
            //  var getTotalRecords = myGridList.TotalRecords;
            // GET DASHBOARD COUNTS
            var getOpenTask = myGridList.APISuccess1;
            var getCompleteTask = myGridList.APIFail;
            $('#cntTotalISuccess').html(getOpenTask);
            $('#cntTotalFail').html(getCompleteTask);

            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"> ID</div>';
            gridTable = gridTable + ' <div class="wms-srv-grid-cell">Date And Time</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Document Ref No </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Status</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">API Method</div>';
            gridTable = gridTable + ' <div class="wms-srv-grid-cell">IP Address</div>';
            //  gridTable = gridTable + '<div class="wms-srv-grid-cell">Browser Details</div>';
            gridTable = gridTable + ' <div class="wms-srv-grid-cell">Action</div>';
            gridTable = gridTable + '</div>';

            var myGridList = data.Result;
            for (var i = 0; i < myGridList.Table.length; i++) {
                var GetAPIID = myGridList.Table[i].ID;
                var getToken = myGridList.Table[i].Token;
                var getAPIKeys = myGridList.Table[i].APIKeys;
                var getAPIURL = myGridList.Table[i].APIURL;
                var getAPIMethod = myGridList.Table[i].APIMethod;
                var getIPAddress = myGridList.Table[i].IPAddress;
                var getBrowserDetails = myGridList.Table[i].BrowserDetails;
                var getRequestParaJson = myGridList.Table[i].RequestParaJson;
                var getRequestStatus = myGridList.Table[i].RequestStatus;
                var getRequestMessage = myGridList.Table[i].RequestMessage;
                var getResponseParaJson = myGridList.Table[i].ResponseParaJson;
                var getResponseStatus = myGridList.Table[i].ResponseStatus;
                var getResponseMessage = myGridList.Table[i].ResponseMessage;
                var getTOKENSTATUS = myGridList.Table[i].TOKENSTATUS;
                var getCreatedDate = myGridList.Table[i].CreatedDate;
                var getDocumentRefNo = myGridList.Table[i].DocumentRefNo;

                // var specification = " Fixed Length : " + getFixedLength + ", From Range : " + getFromRange + ",  To Range : " + getToRange;
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + GetAPIID + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getCreatedDate + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getDocumentRefNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getTOKENSTATUS + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getAPIMethod + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getIPAddress + '</div>';
                //   gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + getBrowserDetails + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<a href="#" title="Open JSON for Request" class="wms-srv-save" data-prefix="SV"><i class="fas fa-file-code" onclick=" openRequest(' + GetAPIID + ',\'' + getRequestParaJson + '\')"></i></a>';
                gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
                gridTable = gridTable + '<a href="#" title="Open JSON for Response" class="wms-srv-save" data-prefix="SV"><i class="fas fa-solid fa-eye" onclick=" openResponse(' + GetAPIID + ',\'' + getResponseParaJson + '\')"></i></a>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }
            $("#GetAPIList").html(gridTable);
            //lottabelDdl();
        }
    });

}
function searchfilterAPILog() {
    debugger;
    searchvalue = $('#txtfilterSearch').val();

    if (searchvalue == "") {
        // alert('Please Enter value for filter');
        getAPIListLog(searchvalue);
    }
    else {
        getAPIListLog(searchvalue);
    }
}

function getDate() {
    $("#dateSelecter" + obj).show();


}
function openDatePopup() {
    $('#dateSelecterobjrexta').hide();
}

function SearchAPILOGList() {	//Search

    searchfilter = $('#wms-srv-search-filter-ProductMasterList').val();
    searchvalue = $('#wms-srv-simple-search-ProductMasterList').val();

    if (searchvalue == '' && searchfilter != '') {
        alert('Please Enter value for filter');
    }
    else {
        getAPIListLog(searchvalue, searchvalue);
    }
    if (searchfilter == '') {
        getAPIListLog(searchfilter, searchvalue);
    }
}

function openWin(GetAPIID) {
    window.open("WMSReport/DetailReport/Purchase-Order.html");
}

function openRequest(GetAPIID, filePath) {
    // alert('Open request');
    requestloadJson(GetAPIID, filePath);
    $('#wms-srv-apiloglist-popup').hide();
    $('#wms-request-popup-close').off();
    $('#wms-request-popup-close').click(function () {
        $('#wms-requestpopup').hide();
        $('#wms-srv-apiloglist-popup').show();
    });
}

function requestloadJson(GetAPIID, filePath) {
    debugger;
    apiPath = wmsApiPath + 'APITP/APITPReqReadJSON'
    // var apiPath = "http://localhost:50068/api/staging/v1/APITP/APITPReqReadJSON";
    var postData =
    {
        "getapiLogId": GetAPIID,
        "fileLogPath": filePath    //"E:\\RequestJSON\\890723334-ReqJson.txt"

    }
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        var getresult = data.Result;
        //w3review

        // $('#w3review').();

        //document.getElementById("w3review").innerHTML=getresult;
        //  $('#w3review').remove();
        //  alert(JSON.stringify(getresult));

        if (isStatus == 200) {
            var bindhtml = JSON.stringify(getresult);
            // bindhtml = '<textarea id="w3review" disabled="disabled" name="w3review" style="width:100%;height:500px;background-color: #efefef;font-family: Courier New;color: #030303;"> '+getresult+'</textarea>';

            //  bindhtml += getresult;
            //   bindhtml += '  </textarea> ';
            $('#databind-txtarea-request').html(bindhtml);

            $('#wms-requestpopup').show();
        }
    });
    $('#wms-requestpopup').show();
}

function responseloadJson(GetAPIID, filePath) {

    debugger;
    apiPath = wmsApiPath + 'APITP/APITPRespReadJSON'
    // var apiPath = "http://localhost:50068/api/staging/v1/APITP/APITPRespReadJSON";
    var postData =
    {
        "getapiLogId": GetAPIID,
        "fileLogPath": filePath //"E:\\RequestJSON\\890723334-ReqJson.txt"//filePath //"E:\\RequestJSON\\890723334-ReqJson.txt"

    }

    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        var getresult = data.Result;

        if (isStatus == 200) {
            var bindhtml = JSON.stringify(getresult);
            // bindhtml = '<textarea id="w3review" disabled="disabled" name="w3review" style="width:100%;height:500px;background-color: #efefef;font-family: Courier New;color: #030303;"> '+getresult+'</textarea>';

            //  bindhtml += getresult;
            //   bindhtml += '  </textarea> ';
            $('#databind-txtarea-Response').html(bindhtml);

            $('#wms-responsepopup').show();
        }


    });

    $('#wms-responsepopup').show();
}


function openResponse(GetAPIID, filePath) {
    debugger;
    //alert('Open Response');
    responseloadJson(GetAPIID, filePath);
    $('#wms-srv-apiloglist-popup').hide();
    $('#wms-response-popup-close').off();
    $('#wms-response-popup-close').click(function () {
        $('#wms-responsepopup').hide();
        $('#wms-srv-apiloglist-popup').show();
    });
}



function openDatePopup() {
    $('#dateSelecterobjrexta').hide();
}

function getSevenDateData(dateType) {
    debugger;
    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate - dateType;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getThirtyDateData(dateType) {
    debugger;
    var today = new Date();
    var todaydate = today.getDate();
    var dd = dateType - todaydate;

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    //yyyy-mm-dd
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getPreviousdate(dateType) {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate - dateType;
    //var getDateIndex = day.indexOf("-");
    // var dd ="";
    // if( getDateIndex == 0)
    // {
    //     dd= day.slice(0);

    // }   
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    //yyyy-mm-dd
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getcurrentFYData(dateType) {

    //     var today  = new Date();
    //     var todaydate = today.getDate();
    //     var dd = dateType - todaydate;

    //     var mm = today.getMonth()+1; 
    //     var yyyy = today.getFullYear();
    //     if(dd<10) 
    //     {
    //     dd='0'+dd;
    //     } 
    // //yyyy-mm-dd
    //     if(mm<10) 
    //     {
    //     mm='0'+mm;
    //     } 
    //     today = yyyy+'-'+mm+'-'+dd;

    //     //userSelectedDate = today.split("-").reverse().join("/");
    //     userSelectedDate = today.replaceAll("-","/");
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

$(function () {
    $("#wms-srv-apiloglist-popup.wms-srv-simple-search").datepicker();
});






