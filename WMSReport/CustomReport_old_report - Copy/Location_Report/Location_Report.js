

// wmsLoadLayout(function(){
//     initReport()
// });
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var getSearchFilter = 'ALL';
    var getCustomerOrder ='';
    var getSearchVal ='';

function openDetailReport(dataVal) {
    debugger;
sessionStorage["reportdetailid"] = dataVal;
window.open("../../DetailReport/Purchase-Order-Template.html");  
}

function openDatePopup() 
{
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



    loadCurrentDate();
    getPurchaseOrderList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    loadLocationType();
    $("#btnSearchReport" + obj).click(function () {
        getPurchaseOrderList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    })
    // $(".iconClose").click(function () {
    //     $("#dateSelecter" + obj).hide();
    // });
    //getSevenDateData();
    // $('#txt_FromdatePicker' + obj).datepicker({
    //     dateFormat: 'yy/mm/dd',
    //     onSelect: function (date) {
    //         var getFromDate = $('#txt_FromdatePicker' + obj).val();
    //         var getToDate = $('#txt_TodatePicker' + obj).val();
    //         $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
    //         $("#hideFromDate").val(getFromDate);
    //     }
    // });
    // $('#txt_TodatePicker' + obj).datepicker({
    //     dateFormat: 'yy/mm/dd',
    //     onSelect: function (date) {
    //         var getFromDate = $('#txt_FromdatePicker' + obj).val();
    //         var getToDate = $('#txt_TodatePicker' + obj).val();
    //         $('#txtFromToDate' + obj).val(getFromDate + " to " + getToDate);
    //         $("#hideToDate").val(getToDate);
    //     }
    // });

    // globalDefaultFromDate = $("#hideFromDate" + obj).val();
    // globalDefaultToDate = $("#hideToDate" + obj).val();

    // var getFromDate = $("#txtFromToDate" + obj).val();
    // var getSearchFromDate = "";
    // getSearchFromDate = getFromDate.substr(0, 10);
    // getSearchToDate = getFromDate.substr(14, 24);
    // getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);



})
var getSelectedDateCatg = "";

function loadLocationType()
{
    debugger;
    var apiPath = wmsApiPath + "ReportStatic/getLocationlTypeList";
   // var apiPath = "http://localhost:50068/api/staging/v1/ReportStatic/getLocationlTypeList";
    
    var postData = {
        "Companyid": getCompanyId,
        "Customerid": getCustomerId,
        "Warehouseid": getWarehouseId
      };
      
      $("#ddlLocationType").html('');      
    

      callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.Code;
        if (getStatus == 200) {
            var getResult = data.Result.Table;
            var gridObject ='';
            gridObject = gridObject +'<option value=""> --Select Location Type-- </option>';
      for(i=0; i < getResult.length; i++ )
      {
        var getLocationId = getResult[i].Id;
        var getLocationType = getResult[i].LocationType;
        gridObject = gridObject +'<option value="'+getLocationId+'">'+getLocationType+' </option>';
      }
      $("#ddlLocationType").append(gridObject); 
    }
});
    
}


function getPurchaseOrderList(getSelectedDateCatg, fromDate, toDate) {
    debugger;
    var getSearchToDate = "";
    var apiPath = wmsApiPath + "ReportStatic/locationlistReport";
   // var apiPath = "http://localhost:50068/api/staging/v1/ReportStatic/locationlistReport";
    
    
    if (getSelectedDateCatg == "") {
        var getSearch = $("#txtfilter").val();
        var getLocationType = "";
        var getCustomerOrder = $("#txtCustomerOrderNo").val();
        var getSearchVal = ""; // Declare and initialize getSearchVal

        if (getSearch == "") {
            if (getLocationType != "") {
                getSearchVal = getLocationType;
            } else if (getCustomerOrder != "") {
                getSearchVal = getCustomerOrder;
            } else {
                getSearchVal = ""; // Assign an empty string to ensure getSearchVal is initialized
            }
        } else {
            getSearchVal = getSearch;
        }

        var postData = {
            "UserId": getUserId,
            "CustomerId": getCustomerId,
            "WarehouseId": getWarehouseId,
            "CompanyID": getCompanyId,
            "SearchFilter": getSearchFilter, // Ensure getSearchFilter is defined elsewhere in your code
            "SearchValue": getSearchVal,
            "fromDate": "-",
            "toDate": "-",
          //  "loctype": getLocationType
        };
    }


    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.Code;
        if (getStatus == 200) {
            var getResult = data.Result.Table;
            $("#gettopfiveorder" + obj).html("");
            if(getResult.length >0)
            {
                
           
            if (obj == 'objrexta') {
                var myGrid = "";
                myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">Customer Name</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Warehouse Name</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">Location Code</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">Location Type</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Shelf</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Section </div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Passage </div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Floor</div>';                
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Building</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Sort Code</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Capacity Type</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Capacity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Created By</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Created Date</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Last Modified Date</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Last Modified By</div>';
                
                myGrid = myGrid + '</div>';
                
                for (var i = 0; i < getResult.length; i++) {
                    var getID = getResult[i].ID;
                    var getCode = getResult[i].Code;
                    var getShelf = getResult[i].Shelf;
                    var getSection = getResult[i].Section;
                    var getPathway = getResult[i].Pathway
                    var getFloor = getResult[i].Floor;
                    var getBuilding = getResult[i].Building;
                    var getLocationType = getResult[i].LocationType;
                    var getCapacityIn = getResult[i].CapacityIn;
                    var getCapacity = getResult[i].Capacity;
                    var getWarehouseCode = getResult[i].WarehouseCode;
                    var getWarehouseName = getResult[i].WarehouseName;
                    var getCustName = getResult[i].CustName;
                    var getUsername = getResult[i].Username;
                    var getCreationDate = getResult[i].CreationDate;
                    var getSortCode = getResult[i].SortCode;
                    var getLastModifiedBy = getResult[i].LastModifiedBy;
                    var getLastModifiedDate = getResult[i].LastModifiedDate;
                    

                    myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
                    // myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getID + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCustName + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getWarehouseName + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCode + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLocationType + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getShelf + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getSection + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getPathway + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getFloor + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getBuilding + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getSortCode + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCapacityIn + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCapacity + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getUsername + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLastModifiedDate + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLastModifiedBy + '</div>';
                    
                  //  myGrid = myGrid + '<div class="wms-srv-grid-cell"  onclick="openDetailReport(' + getID + ');"style="text-align:center;"><i class="fas fa-solid fa-eye"></i></div>';
                    myGrid = myGrid + '</div>';
                }
                $('#gettopfiveorder' + obj).html(myGrid);
            }
        }
        else{
            alert("Data not found..!!");
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



// old Backup copy of the function
// function getPurchaseOrderList(getSelectedDateCatg, fromDate, toDate) {
//     debugger;
//     if (fromDate == "") {
//         var getFromDate = $("#txtFromToDate" + obj).val();
//         var getSearchFromDate = "";
//         getSearchFromDate = getFromDate.substr(0, 10);
//         getSearchToDate = getFromDate.substr(14, 24);
//         getPurchaseOrderList(getSelectedDateCatg, getSearchFromDate, getSearchToDate);
//     }
//     var getSearchToDate = "";
//     var apiPath = wmsApiPath + "ReportStatic/locationlistReport";
//     var getSearchFilter = "OrderNo"
//     var SearchByDate = "SearchByDate";


//     if (getSelectedDateCatg == "") {

//         var getSearch = $("#txtfilter" + obj).val();
//         var getCustomerOrder = $("#txtCustomerOrderNo" + obj).val();
//         getSearchVal = getSearch.split("/").reverse().join("/");

//         if (getSearchVal != "" && getCustomerOrder == "") {
//             getCustomerOrder = getSearchVal;
//             getSearchFilter = SearchByDate
//         }


//         if (getCustomerOrder == "") {


//             var postData = {
//                 "UserId": getUserId,
//                 "CustomerId": getCustomerId ,
//                 "WarehouseId": getWarehouseId,
//                 "CompanyID": getCompanyId ,
//                 "SearchFilter": "",
//                 "SearchValue": "",
//                 "fromDate": fromDate,
//                 "toDate": toDate
//             };
//         }
//         else {
//             var postData = {
//                 "UserId": getUserId,
//                 "CustomerId": getCustomerId ,
//                 "WarehouseId": getWarehouseId ,
//                 "CompanyID": getCompanyId ,
//                 "SearchFilter": getSearchFilter,
//                 "SearchValue": getCustomerOrder,
//                 "fromDate": "-",
//                 "toDate": "-"
//             };
//         }
//         // else{
//         //     alert("Please Enter Valid Data..!!");
//         // }

//     }
//     else {

//         var searchByDate = getSelectedDateCatg.split("-").reverse().join("/");
//         var CurrentDate = GetCurrentUserDate.split("-").reverse().join("/");

//         var postData = {
//             "UserId": getUserId,
//             "CustomerId": getCustomerId ,
//             "WarehouseId": getWarehouseId,
//             "CompanyID": getCompanyId ,
//             "SearchFilter": "",
//             "SearchValue": "",
//             "fromDate": searchByDate,
//             "toDate": CurrentDate
//         };
//     }

//     callHttpUrl(apiPath, postData, function (data) {

//         var getStatus = data.Status;
//         var getStatusCode = data.Code;
//         if (getStatus == 200) {
//             var getResult = data.Result.Table;
//             if (obj == 'objrexta') {
//                 $("#gettopfiveorder" + obj).html("");
//                 var myGrid = "";
//                 myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
//                 // myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">ID</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">Code</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">Warehouse Code</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Shelf</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Section </div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Pathway </div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Floor</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Building</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Location Type</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Capacity In</div>';
//                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Capacity</div>';
//                 myGrid = myGrid + '</div>';
                
//                 for (var i = 0; i < getResult.length; i++) {
//                     var getID = getResult[i].ID;
//                     var getCode = getResult[i].Code;
//                     var getShelf = getResult[i].Shelf;
//                     var getSection = getResult[i].Section;
//                     var getPathway = getResult[i].Pathway
//                     var getFloor = getResult[i].Floor;
//                     var getBuilding = getResult[i].Building;
//                     var getLocationType = getResult[i].LocationType;
//                     var getCapacityIn = getResult[i].CapacityIn;
//                     var getCapacity = getResult[i].Capacity;
//                     var getWarehouseCode = getResult[i].WarehouseCode;

//                     myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
//                     // myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getID + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCode + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getWarehouseCode + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getShelf + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getSection + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getPathway + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getFloor + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getBuilding + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getLocationType + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCapacityIn + '</div>';
//                     myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCapacity + '</div>';
//                   //  myGrid = myGrid + '<div class="wms-srv-grid-cell"  onclick="openDetailReport(' + getID + ');"style="text-align:center;"><i class="fas fa-solid fa-eye"></i></div>';
//                     myGrid = myGrid + '</div>';
//                 }
//                 $('#gettopfiveorder' + obj).html(myGrid);
//             }

//         }
//     });
//     $("#dateSelecter" + obj).hide();
// }             