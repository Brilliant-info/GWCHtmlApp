// wmsLoadLayout(function(){
//     initReport()
// });
var getUserId = mBrillWmsSession.getUserId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCompanyId();

function openDetailReport(dataVal) {
    debugger;
    sessionStorage["reportdetailid"] = dataVal;
    window.open("../../DetailReport/");
}

function openDatePopup() {
    $('#dateSelecterobjrexta').hide();
}


function initReport() {

    $('.reportCategory a').click(function () {
        $('.reportCategory a i').attr('class', 'fas fa-folder');
        $('.reportCategory a').removeAttr('style');
        $(this).find('i').attr('class', 'fas fa-folder-open');
        $(this).attr('style', 'background-color:#ffffff;');

        $('.reportListByCategory').hide();
        var myPanelId = $(this).data('id');
        $('#' + myPanelId).show();
    });

    $('.printablesType').click(function () {
        var getReportId = $(this).attr('data-id');
        $('#hdnDetailReportId_FromMain').val(getReportId);
        openReportPopup();
    });
    getReportlist();
}

function openDetailReportById(obj) {
    var getReportId = $(obj).attr('data-id');
    $('#hdnDetailReportId_FromMain').val(getReportId);
    openReportPopup();
}

function openReportPopup() {
    //debugger;
    $('#wms-srv-report-popup').show();

    $('#wms-srv-report-popup-close').off();
    $('#iframeReport').attr('src', 'WMSReport/ExecuteReport.html');
    $('#wms-srv-report-popup-close').click(function () {
        $('#iframeReport').attr('src', 'about:blank');
        $('#wms-srv-report-popup').hide();
    });

}

// function myFunction() 
// {
//     alert("Enter Sku Code");
// }

function openDetailedReport(detailReportId) {
    $('#wms-srv-reportdetail-popup').show();
    $('#wms-srv-reportdetail-popup-close').off();
    $('#hdnDetailReportId_FromMain').val(detailReportId);
    $('#iframeDetailReport').attr('src', 'WMSReport/Detail-Report-Template/GroupSummary-Template.html');
    $('#wms-srv-reportdetail-popup-close').click(function () {
        $('#iframeDetailReport').attr('src', 'about:blank');
        $('#wms-srv-reportdetail-popup').hide();
    });
}

function exportAtClient() {
    var exportFinalData = '';
    var getPageTitle = $('.previewPageTitle').text();
    $('.previewTable .reportHeaderRow').each(function () {
        var getMyCell = $(this).find('.reportHeaderCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconHeader');
            if (!isDetailIconHeader) {
                var getMyText = $(this).text();
                if (exportData == '') {
                    exportData = getMyText;
                } else {
                    exportData = exportData + ", " + getMyText;
                }
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });
    $('.previewTable .reportRow').each(function () {
        var getMyCell = $(this).find('.reportRowCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconCell');
            if (!isDetailIconHeader) {
                var getMyText = $(this).text();
                if (exportData == '') {
                    exportData = getMyText;
                } else {
                    exportData = exportData + ", " + getMyText;
                }
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });

    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([exportFinalData], { type: "text/plain" }));
    a.download = getPageTitle + ".csv";
    a.click();
}

function getReportListByCategary(categoryId) {
    debugger;
    $('.lnkReportCategory').attr('style', '');
    $('.lnkReportCategory i').attr('class', 'fas fa-folder');
    $('.lnkCategory_' + categoryId).attr('style', 'background-color:#fcfcfc');
    $('.lnkCategory_' + categoryId + ' i').attr('class', 'fas fa-folder-open');


    var apiPath = wmsApiPath + 'Report/GetReportCategoryMenu';
    var getRoleId = mBrillWmsSession.getUserRoleId();
    var getUserId = mBrillWmsSession.getUserId();

    var postData =
    {
        CategoryId: categoryId,
        RoleId: getRoleId,
        UserId: getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;

        if (getStatus == 200) {
            var myGridList = data.Result;

            $('#reportInbound').html('');
            var gridTable = '';

            for (var i = 0; i < myGridList.Table.length; i++) {
                var getId = myGridList.Table[i].Id;
                var getReportName = myGridList.Table[i].ReportName;
                var getIcon = myGridList.Table[i].Icon;

                gridTable = gridTable + '<div class="col-md-4 nopadding">';
                gridTable = gridTable + '<div class="printablesType" data-id="' + getId + '" data-label="' + getReportName + '" onclick="openDetailReportById(this);">';
                gridTable = gridTable + '<div class="printablesTitle">';
                gridTable = gridTable + '<i class="' + getIcon + '"></i>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '<div class="printablesTitle">' + getReportName + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';

            }

            $('#reportInbound').html(gridTable);
        }
        else {
            alert('Unable to connect');
        }
    });
}


function getReportlist() {
    debugger;
    var apiPath = wmsApiPath + 'Report/GetReportCategory';
    var getUserId = mBrillWmsSession.getUserId();

    var postData =
    {
        UserId: getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;

        if (getStatus == 200) {
            var myGridList = data.Result;

            $('#reportlist').html('');
            var gridTable = '';


            for (var i = 0; i < myGridList.Table.length; i++) {
                var getId = myGridList.Table[i].Id;
                var getTitle = myGridList.Table[i].Title;

                gridTable = gridTable + '<a href="#" class="lnkReportCategory lnkCategory_' + getId + '" data-id=' + getId + ' onclick="getReportListByCategary(' + getId + ');return false;"><i class="fas fa-folder"></i>' + getTitle + '</a>';
            }

            $('#reportlist').html(gridTable);
            if (myGridList.Table.length > 0) {
                getReportListByCategary(1);
            }
        }
        else {
            alert('Unable to connect');
        }
    });
}







var getSelectedDateCatg = "";
var GetCurrentUserDate = "";
var currentfinacial = "2024/04/01";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";

var obj = 'objrexta';


var today = new Date();
var todaydate = today.getDate();
var dd = todaydate
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;
todaysCurrentUserDate = today.replaceAll("-", "/");



function OpenPopup() {
    $('#app' + obj).show();

    $('#wms-srv-' + obj + '-popup').show();

}


function closePopup() {

    $('#app' + obj).hide();
    $('#wms-srv-' + obj + '-popup').hide();

}



$(document).ready(function () {



    loadCurrentDate();
    $("#btnSearchReport" + obj).click(function () {
        getPurchaseOrderList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    })
    $(".iconClose").click(function () {
        $("#dateSelecter" + obj).hide();
    });
    //getSevenDateData();
    $('#txt_FromdatePicker' + obj).datepicker({
        dateFormat: 'yy/mm/dd',
        onSelect: function (date) {
            var getFromDate = $('#txt_FromdatePicker' + obj).val();
            var getToDate = $('#txt_TodatePicker' + obj).val();
            $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
            $("#hideFromDate").val(getFromDate);
        }
    });
    $('#txt_TodatePicker' + obj).datepicker({
        dateFormat: 'yy/mm/dd',
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
    getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);



})

var getlastSeqno = 0;
var currentscrollHeight = 0;
var count = 0;
var scrollMaxTop = 0;
var scrollCurrentTop = 0;

function activateOnScroll() {
    debugger;
    var objDiv = document.getElementById("pnlScrolldivmoventlist");
    objDiv.scrollTop = objDiv.scrollHeight;
    scrollMaxTop = objDiv.scrollTop;
    objDiv.scrollTop = scrollCurrentTop;
    // alert(getlastSeqno);
    objDiv.onscroll = function () {
        listViewOnScroll();
    };
}

function listViewOnScroll() {
    debugger;
    var objDiv = document.getElementById("pnlScrolldivmoventlist");
    document.title = objDiv.scrollTop + '/' + objDiv.scrollHeight;
    scrollCurrentTop = objDiv.scrollTop;
    if (objDiv.scrollTop == scrollMaxTop) {
        //alert('Reached at bottom of scroll!!');
        getPurchaseOrderList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    }
}


var getSelectedDateCatg = "";
function getPurchaseOrderList(getSelectedDateCatg, fromDate, toDate) {
    debugger;
    if (fromDate == "") {
        var getFromDate = $("#txtFromToDate" + obj).val();
        var getSearchFromDate = "";
        getSearchFromDate = getFromDate.substr(0, 10);
        getSearchToDate = getFromDate.substr(14, 24);
        getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);
    }
    var getSearchToDate = "";
    var apiPath = wmsApiPath + "ReportStatic/MovementReport";
    var getSearchFilter = "productcode"
    var SearchByDate = "SearchByDate";


    if (getSelectedDateCatg == "") {

        var getSearch = $("#txtfilter" + obj).val();
        var getCustomerOrder = $("#txtCustomerOrderNo" + obj).val();
        getSearchVal = getSearch.split("/").reverse().join("/");

        if (getSearchVal != "" && getCustomerOrder == "") {
            getCustomerOrder = getSearchVal;
            getSearchFilter = SearchByDate
        }


        if (getCustomerOrder == "") {


            var postData = {
                "UserId": getUserId,
                "CustomerId": getCustomerId,
                "WarehouseId": getWarehouseId,
                "CompanyID": getCompanyId,
                "SearchFilter": "",
                "SearchValue": "",
                "fromDate": fromDate,
                "toDate": toDate,
                "lastSeqno": getlastSeqno
            };
        }
        else {
            var postData = {
                "UserId": getUserId,
                "CustomerId": getCustomerId,
                "WarehouseId": getWarehouseId,
                "CompanyID": getCompanyId,
                "SearchFilter": getSearchFilter,
                "SearchValue": getCustomerOrder,
                "fromDate": "-",
                "toDate": "-",
                "lastSeqno": getlastSeqno
            };
        }
        // else{
        //     alert("Please Enter Valid Data..!!");
        // }

    }
    else {

        var searchByDate = getSelectedDateCatg.split("-").reverse().join("/");
        var CurrentDate = GetCurrentUserDate.split("-").reverse().join("/");

        var postData = {
            "UserId": getUserId,
            "CustomerId": getUserId,
            "WarehouseId": getWarehouseId,
            "CompanyID": getCompanyId,
            "SearchFilter": "",
            "SearchValue": "",
            "fromDate": searchByDate,
            "toDate": CurrentDate,
            "lastSeqno": getlastSeqno
        };
    }


    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.Code;
        if (getStatus == 200) {
            var getResult = data.Result.Table;
            if (obj == 'objrexta') {

                $("#gettopfiveorder" + obj).html("");
                var myGrid = "";
                myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';

                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">Customer Name</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Warehouse Name</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Order No</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Order Reference No</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Sku Code</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Sku Description</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Pallet</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Location</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 1</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 2</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 3</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 4</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 5</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 6</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 7</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 8</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 9</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable 10</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Order Type</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Order Status</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">In Quantity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Out Quantity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Rejected Quantity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Availble Quantity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">UOM</div>';
                //myGrid = myGrid + '<div class="wms-srv-grid-cell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Action</div>';
                myGrid = myGrid + '</div>';
                for (var i = 0; i < getResult.length; i++) {
                    //var rowNum = counter + i + 1;
                    var getId = getResult[i].id;
                    var getCustomername = getResult[i].Customername;
                    var getWarehousename = getResult[i].Warehousename;
                    var getOrderNumber = getResult[i].OrderNumber;
                    var getOrderrefno = getResult[i].Orderrefno;
                    var getproductcode = getResult[i].productcode;
                    var getDescription = getResult[i].Description;
                    var getPalletno = getResult[i].Palletno;
                    var getLocation = getResult[i].Location;
                    var getLottable1 = getResult[i].Lottable1;
                    var getLottable2 = getResult[i].Lottable2;
                    var getLottable3 = getResult[i].Lottable3;
                    var getLottable4 = getResult[i].Lottable4;
                    var getLottable5 = getResult[i].Lottable5;
                    var getLottable6 = getResult[i].Lottable6;
                    var getLottable7 = getResult[i].Lottable7;
                    var getLottable8 = getResult[i].Lottable8;
                    var getLottable9 = getResult[i].Lottable9;
                    var getLottable10 = getResult[i].Lottable10;
                    var getOrdertype = getResult[i].Ordertype;
                    var getOrderstatus = getResult[i].Orderstatus;
                    var getInqty = getResult[i].Inqty;
                    var getOutqty = getResult[i].Outqty;
                    var getRejectqty = getResult[i].Rejectqty;
                    var getAcceptedqty = getResult[i].Acceptedqty;
                    var getUOM = getResult[i].UOM;

                    myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
                    //myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getId + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCustomername + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getWarehousename + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getOrderNumber + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getOrderrefno + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getproductcode + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDescription + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getPalletno + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLocation + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable1 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable2 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable3 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable4 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable5 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable6 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable7 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable8 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable9 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable10 + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getOrdertype + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getOrderstatus + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getInqty + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getOutqty + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getRejectqty + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getAcceptedqty + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getUOM + '</div>';
                    //myGrid = myGrid + '<div class="wms-srv-grid-cell"  onclick="openDetailReport(' + getSKUId + ');"style="text-align:center;"><i class="fas fa-solid fa-eye"></i></div>';
                    myGrid = myGrid + '</div>';
                }
                getlastSeqno = getId;
                $('#gettopfiveorder' + obj).html(myGrid);
                if (getResult.length > 0) {
                    activateOnScroll();
                }

            }

        }
    });
    $("#dateSelecter" + obj).hide();
}

var divHeight = $('#header-wrap').height();
$('#gettopfiveorder').css('margin-top', divHeight + 'px');


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
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + todaysCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getThirtyDateData(dateType) {

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
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + todaysCurrentUserDate);
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
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + todaysCurrentUserDate);
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
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + todaysCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

// function loadCurrentDate() {

//     var today = new Date();
//     var todaydate = today.getDate();
//     var dd = todaydate
//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();
//     if (dd < 10) {
//         dd = '0' + dd;
//     }

//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     today = yyyy + '-' + mm + '-' + dd;
//     GetCurrentUserDate = today.replaceAll("-", "/");
//     $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
// }

function loadCurrentDate() {
    var today = new Date();
    var previousDate = new Date();
    previousDate.setDate(today.getDate() - 7);

    function formatDate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // January is 0!
        var yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        return yyyy + '-' + mm + '-' + dd;
    }

    var todayFormatted = formatDate(today);
    var previousDateFormatted = formatDate(previousDate);

    // Replace "-" with "/"
    var GetCurrentUserDate = todayFormatted.replaceAll("-", "/");
    var PreviousUserDate = previousDateFormatted.replaceAll("-", "/");

    // Assuming 'currentfinacial' is defined somewhere in your code
    $('#txtFromToDate' + obj).val(PreviousUserDate + " to " + GetCurrentUserDate);
}



function getDate() {
    $("#dateSelecter" + obj).show();


}

$("#wms-srv-objrexta-popup-close").click(function () {
    debugger;
    $('#wms-srv-objrexta-popup').hide();
})
