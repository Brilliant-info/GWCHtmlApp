// wmsLoadLayout(function(){
//     initReport()
// });
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();


function openDatePopup() 
{
   $('#dateSelecterobjrexta').hide();
   
}

function openDetailReport(dataVal) {
    debugger;
sessionStorage["reportdetailid"] = dataVal;
window.open("../../DetailReport/Purchase-Order-Template.html");  
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

   // getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);

   getOccupancyPieChart();

})
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
    var apiPath = wmsApiPath + "ReportStatic/EmptylocationlistReport";
    var getSearchFilter = "OrderNo"
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
                "toDate": toDate
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
                "toDate": "-"
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
            "CustomerId": getCustomerId,
            "WarehouseId": getWarehouseId,
            "CompanyID": getCompanyId,
            "SearchFilter": "",
            "SearchValue": "",
            "fromDate": searchByDate,
            "toDate": CurrentDate
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
                myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow">';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">Inward Order No</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Reference No</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Customer Code</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Name</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Expected Delivery Date</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Status</div>';
              //myGrid = myGrid + '<div class="wms-srv-grid-cell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Action</div>';
                myGrid = myGrid + '</div>';
                for (var i = 0; i < getResult.length; i++) 
                {
                    var getExpectedRec = getResult[i].ExpectedRec;
                    var getOrderReferenceNo = getResult[i].OrderReferenceNo;
                    var getStatus = getResult[i].Status;
                    var getCustomerCode = getResult[i].CustomerCode
                    var getName = getResult[i].Name;
                    var getExpectedDate = getResult[i].ExpectedDate;

                    myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getExpectedRec + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getOrderReferenceNo + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCustomerCode + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getName + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getExpectedDate + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getStatus + '</div>';
                  //myGrid = myGrid + '<div class="wms-srv-grid-cell"  onclick="openDetailReport(' + getExpectedRec + ');"style="text-align:center;"><i class="fas fa-solid fa-eye"></i></div>';
                    myGrid = myGrid + '</div>';

                }
                $('#gettopfiveorder' + obj).html(myGrid);
            }

        }
    });
    $("#dateSelecter" + obj).hide();
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



function resetCanvas(canvasId) 
{
    var getCanvasHtml = document.getElementById(canvasId).outerHTML;
    var getCanvasParent = $('#' + canvasId).parent();
    $('#' + canvasId).remove();
    getCanvasParent.append(getCanvasHtml);
}

function getOccupancyPieChart() 
{
    //debugger
    var apiPath = wmsApiPath + "ReportStatic/getWHOccupancy";

    var postData = 
    {
        
            CustId: getCustomerId,
            WhId: getWarehouseId,
            UserId: getUserId,
            CompId: getCompanyId,
            "Building": "11",
            "Floor": "2",
            "Section": "23",
            "Passage": "3",
            "Rack": "23",
            "RptFilter": "0"
          
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') 
        {
            var getOver = data.Result.Table1[0].Qty;
            var getOccupency = data.Result.Table1[1].Qty;
            var getPartial = data.Result.Table1[2].Qty;
            var getfree = data.Result.Table1[3].Qty;

            createPieChart('pnlInboundOrder', ['Occupied','Free','Partially','Over'], [getOccupency,getfree,getPartial,getOver], ['#ff2f2f', '#008080', '#DEB887','#84e15a'], '');
        }

    });
    getOccupiedList();
    getList();
}

function createPieChart(canvasId, xValues, yValues, barColors, chartTitle) {
    resetCanvas(canvasId);
    new Chart(canvasId, {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                label: chartTitle,
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: chartTitle
            },
            resposive: false
        }
    });
}


function getOccupiedList() 
{
   // debugger;
	var apiPath = wmsApiPath + 'ReportStatic/getWHOccupancy';
   
    var postData =
    {
         CustId: getCustomerId,
         WhId: getWarehouseId,
         UserId: getUserId,
         CompId:  getCompanyId,
        "Building": "11",
        "Floor": "2",
        "Section": "23",
        "Passage": "3",
        "Rack": "23",
        "RptFilter": "0"
      }
   
    callHttpUrl(apiPath, postData, function (data) 
    {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            var myGridList = data.Result;
            $('#txtoccupidorder').html('');  	            
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap">';
             gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Warehouse Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location </div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Pallet</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU </div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Quantity</div>';
             gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Passage</div>';
              gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Building</div>';
            gridTable = gridTable + '</div>';
            // GRID HEADER

            for (var i = 0; i <myGridList.Table.length;i++)
             {
                var getcustname = myGridList.Table[i].custname;
                var getWarehouseName = myGridList.Table[i].WarehouseName;
                var getLoccode = myGridList.Table[i].Loccode;
                var getPallet = myGridList.Table[i].Pallet;
                var getSKU = myGridList.Table[i].SKU;

                var getMatrial = myGridList.Table[i].Matrial;
                var getStock = myGridList.Table[i].Stock;
                var getPassage = myGridList.Table[i].Passage;
                var getBuilding = myGridList.Table[i].Building;
                
                
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getcustname + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getWarehouseName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getLoccode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPallet + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSKU + "</div>";             
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getStock + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPassage + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getBuilding + "</div>";
                gridTable = gridTable + '</div>';

            }
            $('#txtoccupidorder').html(gridTable);
        }
        else {
            alert('Unable to connect');
        }
    });
}

function getList() 
{
    debugger;
	var apiPath = wmsApiPath + 'ReportStatic/getWHOccupancy';
   
    var postData =
    {
        "CustId": getCustomerId,
        "WhId": getWarehouseId,
        "UserId": getUserId,
        "CompId": getCompanyId,
        "Building": "11",
        "Floor": "2",
        "Section": "23",
        "Passage": "3",
        "Rack": "23",
        "RptFilter": "0"
      }
   
    callHttpUrl(apiPath, postData, function (data) 
    {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            var myGridList = data.Result;
            $('#getlist').html('');  	            
            var gridTable = '';
         
            for (var i = 0; i <myGridList.Table.length;i++)
             {

                //if (i === 20) { break; }
 
                var getLoccode = myGridList.Table[i].Loccode;
                var getlocstatus = myGridList.Table[i].locstatus;
                
                
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-occupiedRow">';
                //gridTable = gridTable + '<div class="wms-srv-grid-occupiedCell">' + getlocstatus + '</div>';
               


                if(getlocstatus == 'over')
                {
                    gridTable = gridTable + '<div class="wms-srv-grid-occupiedCell" id="txtvalue" style="background-color:#84e15a;" title='+getLoccode+'>' + getLoccode + '</div>';

                }
                else if(getlocstatus == 'Occupency')
                {
                    gridTable = gridTable + '<div class="wms-srv-grid-occupiedCell" id="txtvalue" style="background-color:#ff2f2f;" title='+getLoccode+'>' + getLoccode + '</div>';

                }
                else if(getlocstatus == 'Partial')
                {
                    gridTable = gridTable + '<div class="wms-srv-grid-occupiedCell" id="txtvalue" style="background-color:#DEB887;" title='+getLoccode+'>' + getLoccode + '</div>';

                }
                else if(getlocstatus == 'free')
                {
                    gridTable = gridTable + '<div class="wms-srv-grid-occupiedCell" id="txtvalue" style="background-color:#008080;" title='+getLoccode+'>' + getLoccode + '</div>';

                   //$('#txtvalue').css({'background-color': 'yellow'}); 
                    
                }
                gridTable = gridTable + '</div>';

            
            }
            $('#getlist').html(gridTable);
        }
        else {
            alert('Unable to connect');
        }
    });
    BuildingDropdown();
    FloorDropdown();
}



function BuildingDropdown()
{     
   // debugger;
    var apiPath = wmsApiPath + 'ReportStatic/OccupencyDropDown'; 
    var postData=
    {
        WarehouseId: getWarehouseId,
        CompID:getCompanyId,
        CustId: getCustomerId,
        UserId: getUserId
    }
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtbuildingdropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var Buildingvalue = grnContainerSize[i].LocationType;
                    spnVendortype.push(Buildingvalue);
                    //spnVendortypeId.push(vendorId);
                    $("#txtbuildingdropdown").append('<option value = "">'+ Buildingvalue +'</option>');
                    }
            }
        }        
    });    
}

function FloorDropdown()
{     
    //debugger;
    var apiPath = wmsApiPath + 'ReportStatic/OccupencyDropDown'; 
    var postData=
    {
        WarehouseId: getWarehouseId,
        CompID:getCompanyId,
        CustId: getCustomerId,
        UserId: getUserId
    }
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtFloordropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table1;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var Floorvalue = grnContainerSize[i].Building;
                    spnVendortype.push(Floorvalue);
                    //spnVendortypeId.push(vendorId);
                    $("#txtFloordropdown").append('<option value = "">'+ Floorvalue +'</option>');
                    }
            }
        }        
    });   
    SectionDropdown(); 
}

function SectionDropdown()
{     
    //debugger;
    var apiPath = wmsApiPath + 'ReportStatic/OccupencyDropDown'; 
    var postData=
    {
        WarehouseId: getWarehouseId,
        CompID:getCompanyId,
        CustId: getCustomerId,
        UserId: getUserId
    }
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtSectiondropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table2;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var Sectionvalue = grnContainerSize[i].Section;
                    spnVendortype.push(Sectionvalue);
                    //spnVendortypeId.push(vendorId);
                    $("#txtSectiondropdown").append('<option value = "">'+ Sectionvalue +'</option>');
                    }
            }
        }        
    }); 
    PassageDropdown();   
}

function PassageDropdown()
{     
    //debugger;
    var apiPath = wmsApiPath + 'ReportStatic/OccupencyDropDown'; 
    var postData=
    {
        WarehouseId: getWarehouseId,
        CompID:getCompanyId,
        CustId: getCustomerId,
        UserId: getUserId
    }
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtPassagedropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table3;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var Pathwayvalue = grnContainerSize[i].Pathway;
                    spnVendortype.push(Pathwayvalue);
                    //spnVendortypeId.push(vendorId);
                    $("#txtPassagedropdown").append('<option value = "">'+ Pathwayvalue +'</option>');
                    }
            }
        }        
    });  
    RackDropdown();  
}

function RackDropdown()
{     
    //debugger;
    var apiPath = wmsApiPath + 'ReportStatic/OccupencyDropDown'; 
    var postData=
    {
        WarehouseId: getWarehouseId,
        CompID:getCompanyId,
        CustId: getCustomerId,
        UserId: getUserId
    }
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtRackdropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table4;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var Shelfvalue = grnContainerSize[i].Shelf;
                    spnVendortype.push(Shelfvalue);
                    //spnVendortypeId.push(vendorId);
                    $("#txtRackdropdown").append('<option value = "">'+ Shelfvalue +'</option>');
                    }
            }
        }        
    });    
}