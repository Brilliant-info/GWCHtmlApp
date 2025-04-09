
// wmsLoadLayout(function(){
//     initReport();
    
//  });

var getUserId = mBrillWmsSession.getUserId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCompanyId();

var getDepartmentType ='';
var getProjectNameType ='';
var getLocationtype ='';
var getEmpIDtype ='';
var getBUHeadtype ='';
var getTitletype = '';
var getFlagtype = '';


// function showListByDepartment(obj,dropvalue)
// {
//     //debugger
//     if (dropvalue == 'Department')
//     {
//         var myDept = obj.value;
//         getDepartmentType = myDept;
//     }
//     else if(dropvalue == 'Project')
//     {
//     var myprojectname = obj.value;
//     getProjectNameType = myprojectname;
//     }
//     else if(dropvalue == 'Location')
//     {
//     var getLocation = obj.value;
//     getLocationtype = getLocation;
//     }
//     else if(dropvalue == 'Emp')
//     {
//     var EmpID = obj.value;
//     getEmpIDtype = EmpID;
//     }
//     else if(dropvalue == 'Head')
//     {
//     var BUHead = obj.value;
//     getBUHeadtype = BUHead
//     }
//     else if(dropvalue == 'title')
//     {
//     var Title = obj.value;
//     getTitletype = Title;
//     }
//     else if(dropvalue == 'Flag')
//     {
//     var flag = obj.value;
//     getFlagtype = flag;
//     }

    
// }


function AssentinitReport() 
{
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
//alert("Success");
//AssetDropdown();
//getAssetPieChart();
AssetDropdown();

}


function openReportPopup() 
{
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
//debugger;
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


function getReportlist() 
{
//debugger;
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

var obj = 'objrexta';



function OpenPopup() 
{

$('#app' + obj).show();
$('#wms-srv-' + obj + '-popup').show();


}


function closePopup() {

$('#app' + obj).hide();
$('#wms-srv-' + obj + '-popup').hide();

}


 $(document).ready(function () 
{
    
    AssentinitReport();
//     alert("HI");
});

function resetCanvas(canvasId) 
{
var getCanvasHtml = document.getElementById(canvasId).outerHTML;
var getCanvasParent = $('#' + canvasId).parent();
$('#' + canvasId).remove();
getCanvasParent.append(getCanvasHtml);
}



function createPieChart(canvasId, xValues, yValues, barColors, chartTitle)
{
    // var Departmentarry = [xValues];
    // var Totalarry = [yValues];
    // var color = [barColors];

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
        




function getAssestList() 
{
    //debugger;
    var apiPath = wmsApiPath + 'ReportStatic/AssetReportlist';
	//var apiPath = 'http://localhost:50068/api/staging/v1/ReportStatic/AssetReportlist';
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();


    // var getDepartmentType = $('#txtDepartmentTypedropdown').val();
    // var getProjectName = $('#txtProjectNamedropdown').val();
    // var getLocation = $('#txtLocationdropdown').val();
    // var getEmpID = $('#txtEmpIDdropdown').val();
    // var getBUHead = $('#txtBUHeaddropdown').val(); 
    var getTitletype = $('#txtTitledropdown option:selected').text();
    var getDepartmentType = $('#txtDepartmentTypedropdown option:selected').text();
    var getProjectNameType = $('#txtProjectNamedropdown option:selected').text();
    var getLocationtype = $('#txtLocationdropdown option:selected').text();
    var getEmpIDtype = $('#txtEmpIDdropdown option:selected').text();
    var getBUHeadtype = $('#txtBUHeaddropdown option:selected').text();
    var getFlagtype = $('#txtFlagdropdown option:selected').text();
    //var getmytitle = $('#txtTitledropdown option:selected').text();


    if (getDepartmentType == '--Select--')
    {
        getDepartmentType = 'All'
    }
    if (getProjectNameType == '--Select--')
    {
        getProjectNameType = 'All'
    }
    if (getLocationtype == '--Select--')
    {
        getLocationtype = 'All'
    }
    if (getEmpIDtype == '--Select--')
    {
        getEmpIDtype = 'All'
    }
    if (getBUHeadtype == '--Select--')
    {
        getBUHeadtype = 'All'
    }
    if (getTitletype == '--Select--')
    {
        getTitletype = 'All'
    }
    if (getFlagtype == '--Select--')
    {
        getFlagtype = 'All'
    }
    //alert(myDept);
    var postData =
    {
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "WarehouseId":getWarehouseId,
        "CompanyId": getCompanyId,
        "DepartmentType": getDepartmentType,
        "ProjectName": getProjectNameType,
        "Location": getLocationtype,
        "EmpID": getEmpIDtype,
        "BUHead": getBUHeadtype,
        "Title": getTitletype,
        "flag": getFlagtype
    }
   
    callHttpUrl(apiPath, postData, function (data) 
    {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            var myGridList = data.Result.Table;
            $('#pnlAssetgridlist').html('');  	            
            var gridTable = '';

            if(myGridList == '')
            {
                gridTable = gridTable + '<div class="wms-srv-grid-header  reportHeaderRow" id="header-wrap" style="background-color:#efefef !important;display:none;">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">New Asset Tag</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">OLD Asset Tag</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Ticket No.</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Location Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Flag</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Date Of Purchase</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Year</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">EMAIL ID</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">EMP ID</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Department</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">BU Head</div>';      
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Project Name</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">PR Details</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Project Code</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Title</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Requirements Types</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">IMEINO</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Make</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Model</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-header  reportHeaderRow" id="header-wrap" style="background-color:#efefef !important;">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">No Record Found!!</div>';
                gridTable = gridTable + '</div>';
            }
            else
            {
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header  reportHeaderRow" id="header-wrap" style="background-color:#efefef !important;">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">New Asset Tag</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">OLD Asset Tag</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Ticket No.</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Location Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Flag</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Date Of Purchase</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Year</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">EMAIL ID</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">EMP ID</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Department</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">BU Head</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Project Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">PR Details</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Project Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Title</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Requirements Types</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">IMEINO</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Make</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Model</div>';
            gridTable = gridTable + '</div>';
            // GRID HEADER
            }

            for (var i = 0; i <myGridList.length;i++)
             {
                var getNewAssetTag = myGridList[i].NewAssetTag;
                var getTicketNo = myGridList[i].TicketNo;
                var getBUHead = myGridList[i].BUHead;
                var getDateOfPurchase = myGridList[i].DateOfPurchase;
                var getDepartment = myGridList[i].Department;
                var getEMAILID = myGridList[i].EMAILID;
                var getEMPID = myGridList[i].EMPID;
                var getPRDetails = myGridList[i].PRDetails;
                //var getproductcode = myGridList.Table[i].productcode;
                var getYear = myGridList[i].Year;
                var getRequirementsTypes = myGridList[i].RequirementsTypes;
                var getProjectName = myGridList[i].ProjectName;
                var getProjectCode = myGridList[i].ProjectCode;
                var getTitle = myGridList[i].Title;
                var getoldAssetTag = myGridList[i].oldAssetTag;
                var getlocationcode = myGridList[i].locationcode;
                var getflag = myGridList[i].flag;
                var getIMEINO= myGridList[i].IMEINO;
                var getMake = myGridList[i].Make;
                var getModel = myGridList[i].Model;
                
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row reportRow" style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getNewAssetTag + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getoldAssetTag + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getTicketNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getlocationcode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getflag + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getDateOfPurchase + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getYear + "</div>";             
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getEMAILID + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getEMPID + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getDepartment + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getBUHead + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getProjectName + "</div>";             
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getPRDetails + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getProjectCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getTitle + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getRequirementsTypes + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getIMEINO + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getMake + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell reportRowCell'>" + getModel + "</div>";
                gridTable = gridTable + '</div>';

            }
            $('#pnlAssetgridlist').html(gridTable);
            var myGridList = data.Result;
            $('#pnlDeptlist').html('');  	            
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap" style="background-color:#efefef !important;">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Department</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Total</div>';
            gridTable = gridTable + '</div>';
            // GRID HEADER

            for (var i = 0; i <myGridList.Table1.length;i++)
             {
                var getDepartment = myGridList.Table1[i].Department;
                var getTotal = myGridList.Table1[i].Total;
                //var getLoccode = myGridList.Table[i].Loccode;
                
                
                
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getDepartment + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getTotal + "</div>";
                gridTable = gridTable + '</div>';

            }
            $('#pnlDeptlist').html(gridTable);
        }
        else {
            alert('Unable to connect');
        }
    });
}

var divHeight = $('#header-wrap').height(); 
$('#pnlAssetgridlist').css('margin-top', divHeight+'px');

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


function AssetDropdown()
{     
   //debugger;
    var getUserId = mBrillWmsSession.getUserId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getCompanyId = mBrillWmsSession.getCompanyId();

    var apiPath = wmsApiPath + 'ReportStatic/AssetReportDropdown'; 
    //var apiPath = 'http://localhost:50068/api/staging/v1/ReportStatic/AssetReportDropdown'; 
    var postData=
    {
        WarehouseId: getWarehouseId,
        CompanyId:getCompanyId,
        CustomerId: getCustomerId,
        UserId: getUserId
    }
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) 
        {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtDepartmentTypedropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table1;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var getDepartment = grnContainerSize[i].Department;
                    spnVendortype.push(getDepartment);
                    //spnVendortypeId.push(vendorId);
                    $("#txtDepartmentTypedropdown").append('<option value = '+getDepartment+'>'+ getDepartment +'</option>');
                    }
                    //$("#txtDepartmentTypedropdown option:selected").val(grnContainerSize[1]);
            }
            
        }
        if(isStatus == 200) 
        {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtProjectNamedropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table2;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var ProjectName = grnContainerSize[i].ProjectName;
                    spnVendortype.push(ProjectName);
                    //spnVendortypeId.push(vendorId);
                    $("#txtProjectNamedropdown").append('<option value = '+ ProjectName +'>'+ ProjectName +'</option>');
                    }
            }
        }
        if(isStatus == 200) 
        {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtLocationdropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var LocationType = grnContainerSize[i].Code;
                    spnVendortype.push(LocationType);
                    //spnVendortypeId.push(vendorId);
                    $("#txtLocationdropdown").append('<option value = '+ LocationType +'>'+ LocationType +'</option>');
                    }
            }
        }  
        if(isStatus == 200) 
        {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtEmpIDdropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table3;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var EMPID = grnContainerSize[i].EMPID;
                    spnVendortype.push(EMPID);
                    //spnVendortypeId.push(vendorId);
                    $("#txtEmpIDdropdown").append('<option value = '+ EMPID +'>'+ EMPID +'</option>');
                    }
            }
        }  
        if(isStatus == 200) 
        {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtBUHeaddropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table4;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var BUHead= grnContainerSize[i].BUHead;
                    spnVendortype.push(BUHead);
                    //spnVendortypeId.push(vendorId);
                    $("#txtBUHeaddropdown").append('<option value = '+ BUHead +'>'+ BUHead +'</option>');
                    }
            }
        } 
        if(isStatus == 200) 
        {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtTitledropdown").html();
            //spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table5;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var Title= grnContainerSize[i].Title;
                    spnVendortype.push(Title);
                    //spnVendortypeId.push(vendorId);
                    $("#txtTitledropdown").append('<option value = '+ Title +'>'+ Title +'</option>');
                    }
            }
        } 
        if(isStatus == 200) 
        {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtFlagdropdown").html('<option >--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table6;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    //var vendorId =grnContainerSize[i].Id;
                    var Flag= grnContainerSize[i].Flag;
                    spnVendortype.push(Flag);
                    //spnVendortypeId.push(vendorId);
                    $("#txtFlagdropdown").append('<option value = '+ Flag +'>'+ Flag +'</option>');
                    }
            }
        }  
        //  getDepartmentType =$("#txtDepartmentTypedropdown").val();
        //  getProjectNameType =$("#txtProjectNamedropdown").val();
        //  getLocationtype =$("#txtLocationdropdown").val();
        //  getEmpIDtype =$("#txtEmpIDdropdown").val();
        //  getBUHeadtype =$("#txtBUHeaddropdown").val();
        //  getTitletype =$("#txtTitledropdown").val();
        //  getFlagtype =$("#txtFlagdropdown").val();
         getAssestList();  
         getDeptPieChart()
         //getDeptList();          
    }); 
    
}

// function getDeptList() 
// {
//    //debugger;
//    var apiPath = wmsApiPath + 'ReportStatic/AssetReportlist';
//    //var apiPath = 'http://localhost:50068/api/staging/v1/ReportStatic/AssetReportlist';

//    var getTitletype = $('#txtTitledropdown option:selected').text();
//    var getDepartmentType = $('#txtDepartmentTypedropdown option:selected').text();
//    var getProjectNameType = $('#txtProjectNamedropdown option:selected').text();
//    var getLocationtype = $('#txtLocationdropdown option:selected').text();
//    var getEmpIDtype = $('#txtEmpIDdropdown option:selected').text();
//    var getBUHeadtype = $('#txtBUHeaddropdown option:selected').text();
//    var getFlagtype = $('#txtFlagdropdown option:selected').text();

//     if (getDepartmentType == '--Select--')
//     {
//         getDepartmentType = 'All'
//     }
//     if (getProjectNameType == '--Select--')
//     {
//         getProjectNameType = 'All'
//     }
//     if (getLocationtype == '--Select--')
//     {
//         getLocationtype = 'All'
//     }
//     if (getEmpIDtype == '--Select--')
//     {
//         getEmpIDtype = 'All'
//     }
//     if (getBUHeadtype == '--Select--')
//     {
//         getBUHeadtype = 'All'
//     }
//     if (getTitletype == '--Select--')
//     {
//         getTitletype = 'All'
//     }
//     if (getFlagtype == '--Select--')
//     {
//         getFlagtype = 'All'
//     }

//     var postData =
//     {
//         "UserId": getUserId,
//         "CustomerId": getCustomerId,
//         "WarehouseId":getWarehouseId,
//         "CompanyId": getCompanyId,
//         "DepartmentType": getDepartmentType,
//         "ProjectName": getProjectNameType,
//         "Location": getLocationtype,
//         "EmpID": getEmpIDtype,
//         "BUHead": getBUHeadtype,
//         "Title": getTitletype,
//         "flag": getFlagtype
//     }
   
//     callHttpUrl(apiPath, postData, function (data) 
//     {
       
//         var getStatus = data.Status;
       
//         if (getStatus == 200)
//       {
//             var myGridList = data.Result;
//             $('#pnlDeptlist').html('');  	            
//             var gridTable = '';
//             // GRID HEADER        
//             gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap" style="background-color:#efefef !important;">';
//             gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Department</div>';
//             gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Total</div>';
//             gridTable = gridTable + '</div>';
//             // GRID HEADER

//             for (var i = 0; i <myGridList.Table1.length;i++)
//              {
//                 var getDepartment = myGridList.Table1[i].Department;
//                 var getTotal = myGridList.Table1[i].Total;
//                 //var getLoccode = myGridList.Table[i].Loccode;
                
                
                
//                 // GRID ROW
//                 gridTable = gridTable + '<div class="wms-srv-grid-row" style="text-align: center;">';
//                 gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getDepartment + "</div>";
//                 gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getTotal + "</div>";
//                 gridTable = gridTable + '</div>';

//             }
//             $('#pnlDeptlist').html(gridTable);
//         }
//         else {
//             alert('Unable to connect');
//         }
//         getDeptPieChart();
//     });
   
// }
var divHeight = $('#header-wrap').height(); 
$('#pnlDeptlist').css('margin-top', divHeight+'px');

function getDeptPieChart() 
{
    debugger;
    var apiPath = wmsApiPath + 'ReportStatic/AssetReportlist' 
    //var apiPath = 'http://localhost:50068/api/staging/v1/ReportStatic/AssetReportlist';

    var getTitletype = $('#txtTitledropdown option:selected').text();
    var getDepartmentType = $('#txtDepartmentTypedropdown option:selected').text();
    var getProjectNameType = $('#txtProjectNamedropdown option:selected').text();
    var getLocationtype = $('#txtLocationdropdown option:selected').text();
    var getEmpIDtype = $('#txtEmpIDdropdown option:selected').text();
    var getBUHeadtype = $('#txtBUHeaddropdown option:selected').text();
    var getFlagtype = $('#txtFlagdropdown option:selected').text();

    if (getDepartmentType == '--Select--')
    {
        getDepartmentType = 'All'
    }
    if (getProjectNameType == '--Select--')
    {
        getProjectNameType = 'All'
    }
    if (getLocationtype == '--Select--')
    {
        getLocationtype = 'All'
    }
    if (getEmpIDtype == '--Select--')
    {
        getEmpIDtype = 'All'
    }
    if (getBUHeadtype == '--Select--')
    {
        getBUHeadtype = 'All'
    }
    if (getTitletype == '--Select--')
    {
        getTitletype = 'All'
    }
    if (getFlagtype == '--Select--')
    {
        getFlagtype = 'All'
    }
    var postData =
    {
        "UserId": getUserId,
        "CustomerId": getCustomerId,
        "WarehouseId":getWarehouseId,
        "CompanyId": getCompanyId,
        "DepartmentType": getDepartmentType,
        "ProjectName": getProjectNameType,
        "Location": getLocationtype,
        "EmpID": getEmpIDtype,
        "BUHead": getBUHeadtype,
        "Title": getTitletype,
        "flag": getFlagtype

    }
    callHttpUrl(apiPath, postData, function (data) 
    {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;

        if (getStatus == 200) 
        {
            var Departmentarry = [];
            var Totalarry = [];
            //var Colorarr = ['#ff2f2f','#008080'];
            var Colorarr = ['#ff2f2f','#008080', '#DEB887','#84e15a','#00acd7','#F4A460','#F5F5F5','#b91d47','#00aba9','#4B0082','#FF6347','#2b5797','#e8c3b9','#1e7145'];

     
            var gridList = data.Result.Table1;
            for (var i = 0; i < gridList.length; i++) 
            {
               
             var getDepartmentpie = gridList[i].Department;
             var getTotal = gridList[i].Total;

            //Departmentarry = gridList[i].Department;
            //Totalarry = gridList[i].Total;

            // var getDEM = gridList[i].Total;
            // var getMSBanking = gridList[i].Total;
            // var getMSInsurence = gridList[i].Total;
            // var getPerformanceAssurance = gridList[i].Total;
            // var getCorporate = gridList[i].Total;
            Departmentarry.push(getDepartmentpie);  
            Totalarry.push(getTotal);     
            }
            
          //  createPieChart('pnlAssetreport',[getDepartmentpie],[getTotal],['#ff2f2f'],'');
         // createPieChart('pnlAssetreport',[Departmentarry],[Totalarry],[Colorarr],'AssetReport');
         createPieChart('pnlAssetreport',Departmentarry,Totalarry,Colorarr,'AssetReport');
        }

    });
}