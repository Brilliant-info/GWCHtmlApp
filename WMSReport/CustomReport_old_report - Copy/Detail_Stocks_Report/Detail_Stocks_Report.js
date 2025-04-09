// wmsLoadLayout(function(){
//     initReport()
// });
function openDetailReport(dataVal) 
{
    debugger;
    sessionStorage["reportdetailid"] = dataVal;
    //window.open("../../DetailReport/Dispatch-Order-Detail-Template.html");  
}

function initReport() {

    $('.reportCategory a').click(function () 
    {
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
    $('#wms-srv-report-popup').show();
    $('#wms-srv-report-popup-close').off();
    $('#iframeReport').attr('src', 'WMSReport/ExecuteReport.html');
    $('#wms-srv-report-popup-close').click(function () {
        $('#iframeReport').attr('src', 'about:blank');
        $('#wms-srv-report-popup').hide();
    });

}

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

function exportAtClient() 
{
    debugger;
    var exportFinalData = '';
    var getPageTitle = $('.previewPageTitle').text();
    $('.previewTable .reportHeaderRow').each(function () {
        var getMyCell = $(this).find('.reportHeaderCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconHeader');
            if (!isDetailIconHeader) {
				if($(this).css('display') != 'none'){
					var getMyText = $(this).text();
					if (exportData == '') {
						exportData = getMyText;
					} else {
						exportData = exportData + ", " + getMyText;
					}
				}
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });
    $('.previewTable .wmSkuDetailsreportRow').each(function () {
        var getMyCell = $(this).find('.reportRowCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconCell');
            if (!isDetailIconHeader) {
				if($(this).css('display') != 'none'){
					var getMyText = $(this).text();
					if (exportData == '') {
						exportData = getMyText;
					} else {
						exportData = exportData + ", " + getMyText;
					}
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
var currentfinacial = "2022/04/01";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";

var obj = 'objrexta';



function OpenPopup() {
    $('#app' + obj).show();
    $('#wms-srv-' + obj + '-popup').show();

}


function closePopup() {

    $('#app' + obj).hide();
    $('#wms-srv-' + obj + '-popup').hide();

}



$(document).ready(function () {
    setupFilterPopup();
    loadCurrentDate();
    $('#btnFilterLottables').click(function()
    {
        showLottableConfiguration();
    });
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
var getSelectedDateCatg = "";


function getPurchaseOrderList(getSelectedDateCatg, fromDate, toDate) 
{
    debugger;
    if (fromDate == "") {
        var getFromDate = $("#txtFromToDate" + obj).val();
        var getSearchFromDate = "";
        getSearchFromDate = getFromDate.substr(0, 10);
        getSearchToDate = getFromDate.substr(14, 24);
        getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);
    }
    var getSearchToDate = "";
    var apiPath = wmsApiPath + "ReportStatic/CurrentStockReport";
    var getSearchFilter = "OrderNo"
    var SearchByDate = "SearchByDate";
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var gridObjId = 'gettopfiveorder' + obj;
    var reportLottableFilter = getLottableFilterValues(gridObjId);

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
                "UserId":getUserId,
                "CustomerId": getCustomerId,
                "WarehouseId": getWarehouseId,
                "CompanyID": getCompanyId,
                "SearchFilter": "",
                "SearchValue": "",
                "filterLottable":reportLottableFilter
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
                "filterLottable":reportLottableFilter
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
            "UserId":getUserId,
            "CustomerId": getCustomerId,
            "WarehouseId": getWarehouseId,
            "CompanyID": getCompanyId,
            "SearchFilter": "",
            "SearchValue": "",
            "filterLottable":"all"
        };
    }

    callHttpUrl(apiPath, postData, function (data) 
    {

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
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">SKU Code</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">SKU Name</div>';

                // .invLotHead[data-lotindex="'+lt+'"]
                
                for(var i=0; i < 10; i++){
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell invLotHead gridCellLottable" data-lotindex="'+i+'" data-lotlabel="" style="text-align:center;color: #b3b3b3;font-weight: 500;display:none;">Lottable'+ i +'</div>';
                }

                // myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable1</div>';
                // myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable2</div>';
                // myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable3</div>';

                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Pallet</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Location Code</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Total Quantity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Available Quantity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Allocated Quantity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Hold Quantity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Rejected Quantity</div>';
                myGrid = myGrid + '</div>';
                for (var i = 0; i < getResult.length; i++) 
                {
                    var getWarehouseName= getResult[i].WarehouseName;
                    var getCustomerName = getResult[i].CustomerName;
                    var getSkuName = getResult[i].Name;
                    var getSkuCode= getResult[i].ProductCode;
                    var getLocationCode = getResult[i].LocationCode;
                    var getpalletname = getResult[i].palletname;
                    var getAvailableBalance = getResult[i].AvailableBalance;
                    var getAlctQty = getResult[i].AlctQty;
                    var getTotal = getResult[i].Total;
                    // var getLottable1 = getResult[i].Lottable1;
                    // var getLottable2 = getResult[i].Lottable2;
                    // var getLottable3 = getResult[i].Lottable3;
                    var getDate = getResult[i].Date;
                    var getHoldQty = getResult[i].HoldQty;
                    var getRejectedQty = getResult[i].RejectedQty;
    
                    myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow wmSkuDetailsreportRow">';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCustomerName + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getWarehouseName + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getSkuCode + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getSkuName + '</div>';
                    // myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable1 +'</div>';
                    // myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable2 + '</div>';
                    // myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLottable3 + '</div>';

                    for(var k=0; k < 10; k++)
                    {
                        var lotNum = k + 1;
                        var getLottable = getResult[i]["Lottable" + lotNum];
                        if(getLottable== null || getLottable == '0' || getLottable == 'null'){
                            getLottable = '';
                        }
                        myGrid = myGrid + '<div class="wms-srv-grid-cell  reportRowCell gridCellLottable" data-lotindex="'+k+'" data-lotlabel="" style="text-align:center;font-weight: 500;display:none;">'+ getLottable +'</div>';
                    }

                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getpalletname + '</div>'; 
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLocationCode + '</div>'; 
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getTotal + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getAvailableBalance + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getAlctQty + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getHoldQty + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getRejectedQty + '</div>';
                  //myGrid = myGrid + '<div class="wms-srv-grid-cell"  onclick="openDetailReport(' + getExpectedRec + ');"style="text-align:center;"><i class="fas fa-solid fa-eye"></i></div>';
                    myGrid = myGrid + '</div>';
    
                }
                $('#' + gridObjId).html(myGrid);
                var getLottableHeader = data.Result.Table1;
                bindLottableHeader(gridObjId, getLottableHeader);
                //showHideLottableReportCell(gridObjId);
                showHideLottableCellForreport(gridObjId);
            }

        }
    });
    $("#dateSelecter" + obj).hide();
}


function showHideLottableCellForreport(gridObjId)
{
    debugger
    var getViewRowCount = $('#'+ gridObjId +' .wmSkuDetailsreportRow').length;
    $('#'+ gridObjId +' .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var totalCell = $('#'+ gridObjId +' .wmSkuDetailsreportRow .gridCellLottable[data-lotindex="'+ l +'"]').length;
         var totalEmptyCell = $('#'+ gridObjId +' .wmSkuDetailsreportRow .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;

        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#'+ gridObjId +' .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#'+ gridObjId +' .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#'+ gridObjId +' .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
}


var divHeight = $('#header-wrap').height(); 
$('#gettopfiveorder').css('margin-top', divHeight+'px');

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

function loadCurrentDate() {

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
    GetCurrentUserDate = today.replaceAll("-", "/");
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
}

function getDate() {
    $("#dateSelecter" + obj).show();


}

$("#wms-srv-objrexta-popup-close").click(function () {
   debugger;
    $('#wms-srv-objrexta-popup').hide();
})


