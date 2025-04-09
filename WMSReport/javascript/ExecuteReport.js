var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId= mBrillWmsSession.getClientId();

var currentReportId = 1;
var currentUserId = mBrillWmsSession.getUserId();
var currentWarehouseId = mBrillWmsSession.getWarehouseId();
var currentCustomerId = mBrillWmsSession.getCustomerId();

var currentDetailActionType = '';

var currentPageNo = 1;
var totalPageNo = 1;
var recordLimit = 10;

var currentTotalRecords = 0;
var currentFilterTable = "";
var currentAdvanceFilter = "";

var stringDataType = ['char', 'varchar', 'text', 'nchar', 'nvarchar', 'ntext', 'binary', 'varbinary', 'image'];
var numberDataType = ['bit', 'tinyint', 'smallint', 'int', 'bigint', 'decimal', 'numeric', 'float', 'smallmoney', 'money', 'real'];
var dateTimeDataType = ['datetime', 'datetime2', 'smalldatetime', 'date', 'time', 'datetimeoffset', 'timestamp'];
var queryNumericOperators = ['=', '<', '<=', '>', '>='];
var queryStringOperators = ['LIKE', 'NOT LIKE'];

var reportQuery = "";
var rptSection = 'Warehouse';
var rptHeaderObj = 'header-template-style-1';
var rptFooterObj = 'footer-template-style-1';
var Pixel_Unit = 100;
var CM_Unit = 2.54;
var pageOrientation = 'PagePortrait';
var pageWidth = 8.5;
var pageHeight = 11;
var pageTitle = "";
var pageDescription = "";
var pageMarginLeft = 0.25;
var pageMarginTop = 0.25;
var pageMarginRight = 0.25;
var pageMarginBottom = 0.25;
/* ======================= Header Style =======================  */
var rptH_CompanyName = '';
var rptH_CompanyAddressLine1 = '';
var rptH_CompanyAddressLine2 = '';
var rptH_CompanyContact1 = '';
var rptH_CompanyContact2 = '';
/* ======================= Header Style =======================  */
var reportColumns = [];
// var draggedColumn = '';
var reportDetailType = '';
var reportDetailColumn = '';
var reportDetailColWidth = 80;
var groupByItem = '';
var isAdvanceSearchOn = false;

function openDetailReport(dataVal) {
    mBrillWmsSession.setReportDetailId(dataVal);
    window.open("DetailReport/"+ currentDetailActionType +".html"); 
}

$(document).ready(function () {
    debugger;
    app_report_init();
    callAPItoGetData(true);
    // generateReport('execute');
    //getwarehousereport();
});

function loadDefaultValues() {
    // Section 
    rptSection = 'Warehouse';

    // Header and Footer
    rptHeaderObj = 'header-template-style-1';
    rptFooterObj = 'footer-template-style-1';

    //Load Company Details 
    rptH_CompanyName = 'Brilliant Info Systems Pvt. Ltd. ';
    rptH_CompanyAddressLine1 = '6, 3rd Floor, Punit-Yash-Arcade, Opp, Hotel Konkan Express,';
    rptH_CompanyAddressLine2 = 'Near Kothrud Bus Stand, Kothrud, Pune - 411038, Maharashtra India.';
    rptH_CompanyContact1 = '+91-9146232773';
    rptH_CompanyContact2 = '+91-7218370532';

    // Page Setup
    pageOrientation = 'PagePortrait';
    pageWidth = 8.5;
    pageHeight = 11;
    pageTitle = "SKU Report for Jan 2020 to March 2020";
    pageDescription = "This report shows SKU details for period Jan 2020 to March 2020";
    pageMarginLeft = 0.00;
    pageMarginTop = 0.00;
    pageMarginRight = 0.00;
    pageMarginBottom = 0.00;
}

function bindReportValues() {

}

function cmToInch(cm) {
    var singleInchUnit = 1 / CM_Unit;
    var getCMToInch = singleInchUnit * cm;
    return getCMToInch;
}

function inchToPixel(inch) {
    var getInchToPixel = inch * Pixel_Unit;
    var strPixel = Math.round(getInchToPixel);
    return strPixel;
}

function cmToPixel(cm) {
    var getCMInInch = cmToInch(cm);
    var getInchToPixel = inchToPixel(getCMInInch);
    var strPixel = Math.round(getInchToPixel);
    return strPixel;
}

function exportReportToCSV(ExportType) {
    var getReportId = $('#hdnReportId').val();
    var getColumnWidth = $('#hdnColumnWidth').val();
    var getColumns = $('#hdnColumns').val();
    var getGroupBy = $(".reportGroupByContent").data('value');
    var groupByHeaderWidth = $(".reportGroupByCell").css('width');
    var setGroupByCondition = '';
    var getTotalRecords = $('#divRecordDetails').data('totalcount');
    totalPageNo = Math.round(getTotalRecords / recordLimit);

    var ExportAPI = '';
    var TargetWindow = '_self';
    if (ExportType == 'pdf') {
        ExportAPI = 'ExportReportToPDF.ashx';
        TargetWindow = '_self';
    } else if (ExportType == 'csv') {
        ExportAPI = 'ExportReportToCSV.ashx';
        TargetWindow = '_self';
    } else if (ExportType == 'print') {
        ExportAPI = 'PrintReport.aspx';
        TargetWindow = '_blank';
    } else {
        alert('Invalid Export Type');
    }

    $('body').append(postData);
    $('#frmExportReportToCSV').remove();
    var postData = "<form id=\"frmExportReportToCSV\" action=\"" + ExportAPI + "\" target=\"" + TargetWindow + "\" name=\"frmExportReportToCSV\" method=\"POST\">" +
        "<input type=\"hidden\" name=\"rptid\" value=\"" + getReportId + "\" />" +
        "<input type=\"hidden\" name=\"col\" value=\"" + getColumns + "\" />" +
        "<input type=\"hidden\" name=\"limit\" value=\"" + recordLimit + "\" />" +
        "<input type=\"hidden\" name=\"pageno\" value=\"" + currentPageNo + "\" />" +
        "<input type=\"hidden\" name=\"colwidth\" value=\"" + getColumnWidth + "\" />" +
        "<input type=\"hidden\" name=\"groupby\" value=\"" + groupByItem + "\" />" +
        "<input type=\"hidden\" name=\"groupbyheaderwidth\" value=\"" + groupByHeaderWidth + "\" />" +
        "<input type=\"hidden\" name=\"filtercondition\" value=\"" + getWhereFilterCondition() + "\" />" +
        "<input type=\"hidden\" name=\"totalpages\" value=\"" + totalPageNo + "\" />" +
        +"</form>";
    $('body').append(postData);
    $('#frmExportReportToCSV').submit();
    /*
    $.ajax({
        type: "POST",
        url: "../ReportDesigner/ExportReportToCSV.ashx",
        data: {
            'rptid': getReportId,
            'col': getColumns,
            'limit': recordLimit,
            'pageno': currentPageNo,
            'colwidth': getColumnWidth,
            'groupby': groupByItem,
            'groupbyheaderwidth': groupByHeaderWidth,
            'filtercondition': getWhereFilterCondition()
        },
        beforeSend: function () {
            showWMSThemeLoading();
        },
        success: function (data) {
            alert(data);
            // Do nothing...
            hideWMSThemeLoading();
        }
    });
    */
}

function bindHeaderFooter(headertemplateFile, footertemplateFile, myReportCompanyName, MyAddress, MyPhoneNo, MyEmailID, MyWebsite, MyDateTime, myreportlogo, myFunctionCall) {
    var headerStyle = "";
    $.get('Module-Style/HeaderTemplates/' + headertemplateFile + '.css', function (data) {
        // $('#spnHeaderTemplateCSS').html('<style>' + data + "</style>");
        headerStyle = "<style>" + data + "</style>";
        $.get('Views/HeaderTemplates/' + headertemplateFile + '.html', function (data) {
            var linkCSS = '';
            var updateData1 = data.replace('[COMPANY_NAME]', myReportCompanyName);
            var updateData2 = updateData1.replace('[ADDRESS1]', MyAddress);
            var updateData3 = updateData2.replace('[CONTACT1]', MyPhoneNo);
           // var updateData4 = updateData3.replace('[Logo]', 'data:image/png;base64, ' + myreportlogo);
           var updateData4 = updateData3;
            var finalUpdateData = updateData4.replace('[EMAIL]', MyEmailID);
            $('#previewPageHeader').html(headerStyle + finalUpdateData);
            $('.reportHeaderLogo').html('<img src="data:image/png;base64, ' + myreportlogo + '" style="max-width:200px;" />');
            // alert('data:image/png;base64, ' + myreportlogo);
            var splitDateTime = MyDateTime.split('T');
            var footerStyle = "";
            $.get('Module-Style/FooterTemplates/' + footertemplateFile + '.css', function (data) {
                // $('#spnHeaderTemplateCSS').html('<style>' + data + "</style>");
                footerStyle = "<style>" + data + "</style>";
                $.get('Views/FooterTemplates/' + footertemplateFile + '.html', function (data) {
                    var linkCSS = '';
                    var updateData1 = data.replace('[COMPANY_NAME]', myReportCompanyName);
                    var updateData2 = updateData1.replace('[WEBSITE]', MyWebsite);
                    var updateData3 = updateData2.replace('[EMAIL]', MyEmailID);
                    var updateData4 = updateData3.replace('[DATE]', splitDateTime[0]);
                    var finalUpdateData = updateData4.replace('[TIME]', splitDateTime[1]);
                    $('#previewPageFooter').html(footerStyle + finalUpdateData);

                    generateReport('Execute');
                    adjustReportDesign();
                    if (myFunctionCall != null) {
                        setTimeout(function () {
                            myFunctionCall();
                        }, 500)

                    }
                });
            });
        });
    });
}

function bindHeaderTemplate(headertemplateFile, myReportCompanyName, MyAddress, MyPhoneNo, MyEmailID) {
    var headerStyle = "";
    $.get('Module-Style/HeaderTemplates/' + headertemplateFile + '.css', function (data) {
        // $('#spnHeaderTemplateCSS').html('<style>' + data + "</style>");
        headerStyle = "<style>" + data + "</style>";
        $.get('Views/HeaderTemplates/' + headertemplateFile + '.html', function (data) {
            var linkCSS = '';
            var updateData1 = data.replace('[COMPANY_NAME]', myReportCompanyName);
            var updateData2 = updateData1.replace('[ADDRESS1]', MyAddress);
            var updateData3 = updateData2.replace('[CONTACT1]', MyPhoneNo);
            var finalUpdateData = updateData3.replace('[EMAIL]', MyEmailID);
            $('#previewPageHeader').html(headerStyle + finalUpdateData);
        });
    });
}

function bindFooterTemplate(footertemplateFile, myReportCompanyName, MyWebsite, MyEmailID, MyDateTime) {
    var splitDateTime = MyDateTime.split('T');
    var footerStyle = "";
    $.get('Module-Style/FooterTemplates/' + footertemplateFile + '.css', function (data) {
        // $('#spnHeaderTemplateCSS').html('<style>' + data + "</style>");
        footerStyle = "<style>" + data + "</style>";
        $.get('Views/FooterTemplates/' + footertemplateFile + '.html', function (data) {
            var linkCSS = '';
            var updateData1 = data.replace('[COMPANY_NAME]', myReportCompanyName);
            var updateData2 = updateData1.replace('[WEBSITE]', MyWebsite);
            var updateData3 = updateData2.replace('[EMAIL]', MyEmailID);
            var updateData4 = updateData3.replace('[DATE]', splitDateTime[0]);
            var finalUpdateData = updateData4.replace('[TIME]', splitDateTime[1]);
            $('#previewPageFooter').html(footerStyle + finalUpdateData);
        });
    });
}

function storeColumnName(gridColumns) {
    $('#dataColumnHolder').html('');
    var splitColumns = gridColumns.split(',');
    for (var i = 0; i < splitColumns.length; i++) {
        var getColumn = splitColumns[i].split('|');
        var FieldName = getColumn[0];
        var DisplayName = getColumn[1];
        var FilterCriteria = "";
        var FilterValue = "";
        var columnData = "<div class='rptColumnOpt activeColumn' id='" + FieldName + "' data-title='" + DisplayName + "' data-type='nvarchar' data-displayname='" + DisplayName + "' data-value='" + FieldName + "' data-filter='" + FilterCriteria + "' data-filtervalue='" + FilterValue + "'></div>";
        $('#dataColumnHolder').append(columnData);
    }
}

function isContainsDetailColumn(columns){
    var isContainDetail = false;
    for (var i = 0; i < columns.length; i++) {
        var getColumn = columns[i].split('|');
        var DisplayName = getColumn[0];
        var FieldName = getColumn[1];
        if (DisplayName == 'Detail' || FieldName == 'Detail') {
            isContainDetail = true;
        }
    }
    return isContainDetail;
}

function callAPItoGetData(isFirstTimeCalling) {
    debugger;
    var getReportId = $('#hdnReportId').val();
    var getColumnWidth = $('#hdnColumnWidth').val();
    var getColumns = $('#hdnColumns').val();
    var getGroupBy = $(".reportGroupByContent").data('value');
    var groupByHeaderWidth = $(".reportGroupByCell").css('width');
    var setGroupByCondition = '';
    var getWhereFilter = '';
    if (!isFirstTimeCalling) {
        getWhereFilter = getWhereFilterCondition();
    }

    currentReportId = window.parent.document.getElementById('hdnDetailReportId_FromMain').value;
    
    var postData =
    {
        "CurrentPage": currentPageNo,
        "RecordLimit": recordLimit,
        "UserId": currentUserId,
        "CustomerId": currentCustomerId,
        "WarehouseId": currentWarehouseId,
        "Filter": getWhereFilter,
        "ReportID": currentReportId
    };

    if (isFirstTimeCalling == null) {
        isFirstTimeCalling = false;
    }
    /* 
    type: "POST",
          //url: "../WMSReport/getReportQueryResult.html",     
          url:"http://164.68.123.40/WebAPITest/api/staging/v1/Report/WarehouseDocListReport",
          data:postData, 
          */

    /*
  type: "GET",
  url: "http://localhost/HTMLContainerApp2.1/StaticAPI/ReportPage.json",
    */
   // http://173.212.244.46/WebAPITest/api/staging/v1/Report/WarehouseDocListReport
  // var apiPath = "http://173.212.244.46/WebAPITest/api/staging/v1/Report/WarehouseDocListReport";
   var apiPath = wmsApiPath + "Report/GetGlobalReportList";
    $.ajax({
        type: "POST",
        //url: "../WMSReport/getReportQueryResult.html",     
        url: apiPath,
        data: postData,
        beforeSend: function () {
            showWMSThemeLoading();
        },
        success: function (data) {
            debugger;
            $('.previewTable .reportRow').remove();
            $('#divRecordDetails').remove();
            if (isFirstTimeCalling) {
                $('.previewTable').html("");
            }

            var gridTable = '';
            var myGridList = data.Result;
            var myReportCompanyName = myGridList.Table[0].CompanyName;
            var myreportlogo = myGridList.Table[0].logo;
            var MyReportTitle = myGridList.Table[0].ReportName;
            var MyAddress = myGridList.Table[0].Address;
            var MyEmailID = myGridList.Table[0].EmailID;
            var MyPhoneNo = myGridList.Table[0].PhoneNo;
            var MyWebsite = myGridList.Table[0].Website;
            var MyDateTime = myGridList.Table[0].DateTime;
            var MyHeaderColumn = myGridList.Table[0].headercolumn;
            var myReportDetailType = myGridList.Table[0].reportDetailType;
            $('.previewPageTitle').html(MyReportTitle);
            $('#reportAddress').html(MyAddress);
            $('#reportContact').html(MyPhoneNo);
            $('#reportEmail').html(MyEmailID);
            $('#reportlogo').attr('src', 'data:image/png;base64, ' + myreportlogo);

            reportDetailType = myReportDetailType;
            $('#hdnDetailActionType').val(myReportDetailType);

            /* =========== Update Header Fields ================*/


            var headertemplateFile = myGridList.Table1[0].HeaderID;
            var footertemplateFile = myGridList.Table1[0].FooterID;
            currentDetailActionType = myGridList.Table1[0].DetailActionType;

            // Section 
            rptSection = 'Warehouse';

            // Header and Footer
            rptHeaderObj = myGridList.Table1[0].HeaderID;
            rptFooterObj = myGridList.Table1[0].FooterID;

            //Load Company Details 
            rptH_CompanyName = myGridList.Table[0].CompanyName;
            rptH_CompanyAddressLine1 = myGridList.Table[0].Address;
            rptH_CompanyAddressLine2 = '';
            rptH_CompanyContact1 = myGridList.Table[0].PhoneNo;
            rptH_CompanyContact2 = '';

            // Page Setup
            var getPageOrientation = myGridList.Table1[0].PageOrientation
            if (getPageOrientation == 1) {
                pageOrientation = 'PagePortrait';
            } else {
                pageOrientation = 'PageLandscape';
            }

            pageWidth = myGridList.Table1[0].PageWidth;
            pageHeight = myGridList.Table1[0].PageHeight;
            pageTitle = myGridList.Table1[0].ResTitle;
            pageDescription = myGridList.Table1[0].ResDescription;
            pageMarginLeft = myGridList.Table1[0].LeftMargin;
            pageMarginTop = myGridList.Table1[0].TopMargin;
            pageMarginRight = myGridList.Table1[0].RightMargin;
            pageMarginBottom = myGridList.Table1[0].BottomMargin;

            pageMarginLeft = 0.50;
            pageMarginTop = 0.50;
            pageMarginRight = 0.50;
            pageMarginBottom = 0.50;

            var getTotalRecords = myGridList.Table2[0].TotalRecord;

            var currentTotalRecords = Number(getTotalRecords);
            currentPageNo = myGridList.Table2[0].CurrentPage;
            currentFilterTable = myGridList.Table2[0].FilterTable;
            currentAdvanceFilter = myGridList.Table2[0].AdvanceFilter;

            /*
             bindHeaderTemplate(headertemplateFile, myReportCompanyName, MyAddress, MyPhoneNo, MyEmailID);
            bindFooterTemplate(footertemplateFile, myReportCompanyName, MyWebsite, MyEmailID, MyDateTime); */
            var getFirstTimeCalling = isFirstTimeCalling;
            $('.previewPageTitle').html(pageTitle);
            bindHeaderFooter(headertemplateFile, footertemplateFile, myReportCompanyName, MyAddress, MyPhoneNo, MyEmailID, MyWebsite, MyDateTime, myreportlogo, function () {
                debugger;
                var splitColumns = MyHeaderColumn.split(',');

                var widthDistribution = 0;
                var getNumOfColumn = 0;
                var getPageWidthInPx = 0;
                var widthGroupBy = 0;
                debugger;
                if(getFirstTimeCalling){
                    if(isContainsDetailColumn(splitColumns) == true){
                        reportDetailColWidth = 80;
                    }else{
                        reportDetailColWidth = 0;
                    }
                }

                if(reportDetailColWidth == 80){
                    getNumOfColumn = splitColumns.length - 1;
                }else{
                    getNumOfColumn = splitColumns.length;
                }
                
                getPageWidthInPx = $('.reportHeader').width();
                widthDistribution = ((getPageWidthInPx - (reportDetailColWidth + 2))) / getNumOfColumn;
                widthGroupBy = (widthDistribution * getNumOfColumn) + (reportDetailColWidth + 2);                

                if (getFirstTimeCalling) {

                    var getAdvanceFilterObj = myGridList.Table3;
                    generateAdvanceFilter(getAdvanceFilterObj);

                    gridTable = gridTable + '<div class="reportRowGroupBy" style="display:none;">';
                    gridTable = gridTable + '<div class="reportGroupByCell" id="reportGroupByCell" style="width:' + widthGroupBy + 'px;">';
                    gridTable = gridTable + '<div class="reportGroupByContent ui-droppable" data-value=""><b>Drag a column header here to group by that column.</b></div>';
                    gridTable = gridTable + '</div>';
                    gridTable = gridTable + '</div>';
                    gridTable = gridTable + '<div class="reportHeaderRow">';

                    for (var i = 0; i < splitColumns.length; i++) {
                        var getColumn = splitColumns[i].split('|');
                        var DisplayName = getColumn[0];
                        var FieldName = getColumn[1];
                        var FilterCriteria = "";
                        var FilterValue = "";

                        if (DisplayName == 'Detail' || FieldName == 'Detail') {
                            gridTable = gridTable + '<div class="reportHeaderCell detailIconHeader ui-draggable ui-draggable-handle" style="width: ' + reportDetailColWidth + 'px;">';
                            gridTable = gridTable + '<div class="reportHeaderContent btnViewDetailsHolder" data-value="' + DisplayName + '" style="text-align:center;">' + DisplayName + '</div>';
                            gridTable = gridTable + '</div>';
                        } else {
                            gridTable = gridTable + '<div class="reportHeaderCell ui-draggable ui-draggable-handle" style="width: ' + widthDistribution + 'px;">';
                            gridTable = gridTable + '<div class="reportHeaderContent btnViewDetailsHolder" data-value="' + DisplayName + '" style="text-align:center;">' + DisplayName + '</div>';
                            gridTable = gridTable + '</div>';
                        }


                        var columnData = "<div class='rptColumnOpt activeColumn' id='" + FieldName + "' data-title='" + DisplayName + "' data-type='nvarchar' data-displayname='" + DisplayName + "' data-value='" + FieldName + "' data-filter='" + FilterCriteria + "' data-filtervalue='" + FilterValue + "'></div>";
                        $('#dataColumnHolder').append(columnData);
                    }

                    /*
                    gridTable = gridTable + '<div class="reportHeaderCell ui-draggable ui-draggable-handle" style="width:80px;">';
                    gridTable = gridTable + '<div class="reportHeaderContent btnViewDetailsHolder" data-value="Detail" style="text-align:center;">Detail</div>';
                    gridTable = gridTable + '</div>';
                    */

                    gridTable = gridTable + '</div>';

                    gridTable = gridTable + '<div class="reportFilterRow">';

                    for (var fl = 0; fl < splitColumns.length; fl++) {
                        var fl_getColumn = splitColumns[fl].split('|');
                        var fl_DisplayName = fl_getColumn[0].replace('\r\n', '');
                        var fl_FieldName = fl_getColumn[1].replace('\r\n', '');
                        var fl_FilterCriteria = "";
                        var fl_FilterValue = "";
                        var fl_FilterType = "Text";

                        if (fl_FieldName == 'Detail' || fl_DisplayName == 'Detail') {
                            gridTable = gridTable + '<div class="reportFilterCell" style="width:' + reportDetailColWidth + 'px;" data-value="Detail" data-type="' + fl_FilterType + '"><div class="reportFilterContent"> </div></div>';
                        } else {
                            // strFilterRow += '<div class="reportFilterCell" style="width:' + widthDistribution + 'px;"><div class="reportFilterContent" data-value="' + splitColumnGroup[0] + '">' + createFilterDropDown(splitColumnGroup[0]) + createFilterUserInput(splitColumnGroup[0], splitColumnGroup[2]) + createFilterUserInputSecond(splitColumnGroup[0], splitColumnGroup[2]) + '</div></div>';
                            gridTable = gridTable + '<div class="reportFilterCell" style="width:' + widthDistribution + 'px;" data-value="' + fl_FieldName + '" data-type="' + fl_FilterType + '"><div class="reportFilterContent">' + createFilterDropDown(fl_FieldName) + createFilterUserInput(fl_FieldName, fl_FilterType) + createFilterUserInputSecond(fl_FieldName, fl_FilterType) + '</div></div>';
                            // gridTable = gridTable + '<div class="reportFilterCell" style="width:' + widthDistribution + 'px;"><div class="reportFilterContent" data-value="' + fl_FieldName + '">' + createFilterDropDown(fl_FieldName) + '</div></div>';
                        }
                    }
                    gridTable = gridTable + '</div>';

                }

                var MyArrGridRow = myGridList.Table4;
                for (var k = 0; k < MyArrGridRow.length; k++) {
                    gridTable = gridTable + '<div class="reportRow">';

                    for (var i = 0; i < splitColumns.length; i++) {
                        var getColumn = splitColumns[i].split('|');
                        var DisplayName = getColumn[0];
                        var FieldName = getColumn[1].trim();
                        var NodeAtrribute = getColumn[2].trim();
                        var cellFieldValue = MyArrGridRow[k][NodeAtrribute];
                        if (DisplayName == 'Detail') {
                            gridTable = gridTable + '<div class="reportRowCell detailIconCell" style="width: ' + reportDetailColWidth + 'px; display: inline-block; height: 56.8px;"><div class="reportRowContent btnViewDetailsHolder"><a href="#" class="btnViewDetails" onclick="openDetailReport(\'' + cellFieldValue + '\');"><i class="fas fa-search"></i></a></div></div>';
                        } else {
                            gridTable = gridTable + '<div class="reportRowCell" style="width: ' + widthDistribution + 'px; display: inline-block; height: 56.8px;"><div class="reportRowContent">' + cellFieldValue + '</div></div>';
                        }

                    }
                    gridTable = gridTable + '</div>';
                }

                $('.previewTable').append(gridTable);
                if (getFirstTimeCalling) {
                    // DO NOT DELETE BELOW CODE AS IT IS COMMENTED TEMPORARILY
                  /*  $(".previewTable .reportHeaderCell").draggable({
                        revert: true, helper: "clone", drag: function (event, ui) {
                            groupByItem = $(this).find('.reportHeaderContent').data('value').trim();
                            document.title = groupByItem;
                        }
                    });
                    $(".reportGroupByContent").droppable({
                        drop: function (event, ui) {
                            $(".reportGroupByContent").data('value', groupByItem);
                            $(this).html("Group By: <div class='GroupByItem'>" + groupByItem + "</div><div class='btnRemoveGroupBy' onclick='removeGroupBy();'>X</div>");
                            currentPageNo = 1;
                            callAPItoGetData();
                        }
                    });*/
                    // DO NOT DELETE ABOVE CODE AS IT IS COMMENTED TEMPORARILY
                }

                // // //$('.previewTable').append(data);
                // // /* Adjust Cell Height  */
                // // //alert('Hi...');
                // // $(".reportRowCell").each(function () {
                // //   //  var parentRowHeight = $(this).parent().height();
                // //   //  $(this).css('height', parentRowHeight + 'px');
                // // });
                // // /* Adjust Cell Height  */

                //  var getTotalRecords = $('#divRecordDetails').data('totalcount');
                totalPageNo = Math.round(currentTotalRecords / recordLimit);
                $('.pagePreviewCount').html(currentPageNo + '/' + totalPageNo);
                $('#txtReportPageNo').val(currentPageNo);
                //  }
            });

            // storeColumnName(MyHeaderColumn);

            // adjustReportDesign();
            /* =========== Update Header Fields ================*/

            isFirstTimeCalling = false;
            hideWMSThemeLoading();
        }
    });
}

function callAPItoGetData_temp() {
    var getReportId = $('#hdnReportId').val();
    var getColumnWidth = $('#hdnColumnWidth').val();
    var getColumns = $('#hdnColumns').val();
    var getGroupBy = $(".reportGroupByContent").data('value');
    var groupByHeaderWidth = $(".reportGroupByCell").css('width');
    var setGroupByCondition = '';
    $.ajax({
        type: "POST",
        url: "../ReportDesigner/getReportQueryResult.ashx",
        data: {
            'rptid': getReportId,
            'col': getColumns,
            'limit': recordLimit,
            'pageno': currentPageNo,
            'colwidth': getColumnWidth,
            'groupby': groupByItem,
            'groupbyheaderwidth': groupByHeaderWidth,
            'reportDetailColumn': reportDetailColumn,
            'reportDetailColWidth': reportDetailColWidth,
            'filtercondition': getWhereFilterCondition()
        },
        beforeSend: function () {
            showWMSThemeLoading();
        },
        success: function (data) {
            //  alert(data);
            if (data.trim() != '') {
                $('.previewTable .reportRow').remove();
                $('#divRecordDetails').remove();
                $('.previewTable').append(data);
                /* Adjust Cell Height  */
                //alert('Hi...');
                $(".reportRowCell").each(function () {
                    var parentRowHeight = $(this).parent().height();
                    $(this).css('height', parentRowHeight + 'px');
                });
                /* Adjust Cell Height  */
                var getTotalRecords = $('#divRecordDetails').data('totalcount');
                totalPageNo = Math.round(getTotalRecords / recordLimit);
                $('.pagePreviewCount').html(currentPageNo + '/' + totalPageNo);
                $('#txtReportPageNo').val(currentPageNo);
            }
            hideWMSThemeLoading();
        }
    });
}
//Backwordcopy//
function callAPItoGetData_backup_chaitanya() {
    var getReportId = $('#hdnReportId').val();
    var getColumnWidth = $('#hdnColumnWidth').val();
    var getColumns = $('#hdnColumns').val();
    var getGroupBy = $(".reportGroupByContent").data('value');
    var groupByHeaderWidth = $(".reportGroupByCell").css('width');
    var setGroupByCondition = '';
    $.ajax({
        type: "GET",
        url: "../WMSReport/getReportQueryResult.html",
        beforeSend: function () {
            showWMSThemeLoading();
        },
        success: function (data) {
            //  alert(data);
            if (data.trim() != '') {
                $('.previewTable .reportRow').remove();
                $('#divRecordDetails').remove();
                $('.previewTable').append(data);
                /* Adjust Cell Height  */
                //alert('Hi...');
                $(".reportRowCell").each(function () {
                    //  var parentRowHeight = $(this).parent().height();
                    //  $(this).css('height', parentRowHeight + 'px');
                });
                /* Adjust Cell Height  */
                var getTotalRecords = $('#divRecordDetails').data('totalcount');
                totalPageNo = Math.round(getTotalRecords / recordLimit);
                $('.pagePreviewCount').html(currentPageNo + '/' + totalPageNo);
                $('#txtReportPageNo').val(currentPageNo);
            }
            hideWMSThemeLoading();
        }
    });
}
//Backwordcopy//

function goToNextPage() {
    if (currentPageNo < totalPageNo) {
        currentPageNo = Number(currentPageNo) + 1;
        callAPItoGetData();
    }
}

function goToPreviousPage() {
    if (currentPageNo > 1) {
        currentPageNo = Number(currentPageNo) - 1;
        callAPItoGetData();
    }
}

function jumpToPage() {
    var requestedPageNo = $('#txtReportPageNo').val();
    if ((requestedPageNo > 0) && (requestedPageNo <= totalPageNo)) {
        currentPageNo = requestedPageNo;
        callAPItoGetData();
    }
}

function adjustReportDesign() {
    var getPageWidthInPx = 0;
    var getPageHeightInPx = 0;

    var getPageMarginLeftInPx = 0;
    var getPageMarginTopInPx = 0;
    var getPageMarginRightInPx = 0;
    var getPageMarginBottomInPx = 0;

    var getPageHeaderWidth = 0;
    var getPageFooterWidth = 0;

    if (pageOrientation == 'PageLandscape') {
        getPageWidthInPx = pageHeight * Pixel_Unit;
        getPageHeightInPx = pageWidth * Pixel_Unit;

        getPageMarginLeftInPx = pageMarginTop * Pixel_Unit;
        getPageMarginTopInPx = pageMarginRight * Pixel_Unit;
        getPageMarginRightInPx = pageMarginBottom * Pixel_Unit;
        getPageMarginBottomInPx = pageMarginLeft * Pixel_Unit;
    } else {
        getPageWidthInPx = pageWidth * Pixel_Unit;
        getPageHeightInPx = pageHeight * Pixel_Unit;

        getPageMarginLeftInPx = pageMarginLeft * Pixel_Unit;
        getPageMarginTopInPx = pageMarginTop * Pixel_Unit;
        getPageMarginRightInPx = pageMarginRight * Pixel_Unit;
        getPageMarginBottomInPx = pageMarginBottom * Pixel_Unit;
    }

    getPageHeaderWidth = getPageWidthInPx - (getPageMarginLeftInPx + getPageMarginRightInPx);
    getPageFooterWidth = getPageWidthInPx - (getPageMarginLeftInPx + getPageMarginRightInPx);

    $('.reportCanvas').css('width', getPageWidthInPx + 'px');
    $('.reportCanvas').css('height', getPageHeightInPx + 'px');

    $('.reportHeader').css('width', getPageHeaderWidth + 'px');
    $('#previewPageHeader').css('width', getPageHeaderWidth + 'px');
    $('#previewPageHeader').css('top', getPageMarginTopInPx + 'px');
    $('#previewPageHeader').css('left', getPageMarginLeftInPx + 'px');

    $('.reportFooter').css('width', getPageFooterWidth + 'px');
    $('#previewPageFooter').css('width', getPageFooterWidth + 'px');
    $('#previewPageFooter').css('left', getPageMarginLeftInPx + 'px');
    $('#previewPageFooter').css('bottom', getPageMarginBottomInPx + 'px');

    // alert('hi');
    var getHeaderHeight = $('.reportHeader').outerHeight();
    var getFooterHeight = $('.reportFooter').outerHeight();

    // var getContentAvailableSpace = getPageHeightInPx - (getHeaderHeight + getFooterHeight);
    var getContentAvailableSpace = getPageHeightInPx - (getHeaderHeight + getFooterHeight + getPageMarginTopInPx + getPageMarginBottomInPx);

    var getAvailableWidthForTable = getPageWidthInPx - (getPageMarginLeftInPx + getPageMarginRightInPx + 1);

    $('.rptCanvasContent').css('top', (getHeaderHeight + getPageMarginTopInPx) + 'px');
    $('.rptCanvasContent').css('height', getContentAvailableSpace + 'px');

    var getReportTitleHeight = $('.reportPageTitle').outerHeight();

    var getAvailableHeightForTable = getContentAvailableSpace - getReportTitleHeight;
    generateReportTable(getAvailableHeightForTable, getPageWidthInPx);
}

function callAPItoGetObjectColumn(sqlTableName) {
    if (sqlTableName != '') {
        // $('#hdnObjectName').val(sqlTableName);
        // $('#winQueryHeader').html(sqlTableName);
        // buildSQLQuery();
        $('#dataColumnHolder').empty();

        $.ajax({
            type: "POST",
            url: "../ReportDesigner/getReportColumns.ashx",
            data: { 'objname': sqlTableName },
            beforeSend: function () {
                showWMSThemeLoading();
            },
            success: function (data) {
                // alert(data);
                if (data.trim() != '') {
                    loadReportColumns(data, sqlTableName);
                } else {
                    hideWMSThemeLoading();
                }
            }
        });
    } else {
        hideWMSThemeLoading();
    }
}

function addQueryColumns(dataLabel, dataType) {
    // $('#dataColumnHolder').append('<div class="rptColumnOpt" id="' + dataLabel + '" data-title="' + dataLabel + '" data-type="' + dataType + '" data-value="' + dataLabel + '"><input type="checkbox" selected="selected" name="rptColumn1" value="' + dataLabel + '" /> ' + dataLabel + '<div class="rptBtnSummation"><i class="fas fa-calculator"></i></div></div>');
    $('#dataColumnHolder').append('<div class="rptColumnOpt" id="' + dataLabel + '" data-title="' + dataLabel + '" data-type="' + dataType + '" data-value="' + dataLabel + '"><input type="checkbox" selected="selected" name="rptColumn1" value="' + dataLabel + '" /> ' + dataLabel + '<div class="rptBtnSummation" data-isactive="no"><i class="fas fa-calculator"></i></div></div>');
    // $('#dataFilterColumnHolder').append('<div class="rptColumnOpt" id="fl' + dataLabel + '" data-title="' + dataLabel + '" data-type="' + dataType + '" data-value="' + dataLabel + '"><i class="fas fa-filter"></i> ' + dataLabel + '</div>');
}

function getSqlSelectedColumns() {
    var selectedColumns = '';
    var sqlArrLen = $('.rptColumnOpt').length;
    // var sqlSelectedColumn = $('#dataColumnHolder input[type=checkbox]').filter(":checked").length;
    if (sqlArrLen > 0) {
        var qbCnt = 0;
        $('.rptColumnOpt').each(function () {
            var getColumnId = $(this).attr('id');
            var getDisplayName = $(this).data('displayname');
            var getInputType = $(this).data('type');

            //  var isQueryCheckboxChecked = $('#' + getColumnId + ' input[type=checkbox]').prop('checked');
            //  if (isQueryCheckboxChecked) {
            //  var originalSqlColName = $('#' + getColumnId + ' input[type=checkbox]').val();
            var originalSqlColName = getDisplayName;
            var finalSqlColName = getColumnId;
            var finalSqlColName = getColumnId;
            if (qbCnt == 0) {
                selectedColumns += finalSqlColName + ":" + getDisplayName + ":" + getInputType;
            } else {
                selectedColumns += ', ' + finalSqlColName + ":" + getDisplayName + ":" + getInputType;
            }
            qbCnt = qbCnt + 1;
            //}
        });
    } else {
        //  selectedColumns = '*';
    }
    return selectedColumns;
}

function getWhereFilterCondition() {
    var whereCondtion = '';
    var selectedColumns = '';
    var sqlArrLen = $('.reportFilterCell').length;
    if (sqlArrLen > 0) {
        var qbCnt = 0;
        $('.reportFilterCell').each(function () {
            var getColumnId = $(this).data('value');
            if (getColumnId != 'Detail') {
                var getColumnType = $(this).data('type');
                var getFilter = $(this).find('select').val();

                var getFilterValue = '';
                if (getFilter == 'In Between') {
                    // getFilterValue_1 = $('#inFl1_' + getColumnId).val();
                    // getFilterValue_2 = $('#inFl2_' + getColumnId).val();
                    getFilterValue_1 = $('[id="inFl1_' + getColumnId + '"]').val();
                    getFilterValue_2 = $('[id="inFl2_' + getColumnId + '"]').val();
                    getFilterValue = getFilterValue_1 + '-' + getFilterValue_2;
                } else {
                    // getFilterValue = $('#inFl_' + getColumnId).val();
                    getFilterValue = $('[id="inFl_' + getColumnId + '"]').val();
                }

                var isFilterValueRequires = 'yes';
                if (getFilter != "") {
                    if ((getFilterValue != "") || ((getFilter == 'Is Null') || (getFilter == 'Is Not Null') || (getFilter == 'Is Empty') || (getFilter == 'Is Not Empty'))) {
                        if (qbCnt == 0) {
                            //whereCondtion += 'WHERE (' + getColumnId + ' ' + filterToOperator(getFilter, getFilterValue, getColumnType) + ')';
                            whereCondtion += '(' + getColumnId + ' ' + filterToOperator(getFilter, getFilterValue, getColumnType) + ')';
                        } else {
                            whereCondtion += ' AND (' + getColumnId + ' ' + filterToOperator(getFilter, getFilterValue, getColumnType) + ')';
                        }
                        qbCnt = qbCnt + 1;
                    }
                }
            }
        });
    } else {
        //  selectedColumns = '*';
    }
    // GET ADVANCE SEARCH PARAMETERS...
    var advanceSearchCondition = whereCondtion;
    var advtSearchCount = 0;
    $('.ctrlAdvanceSearch input, .ctrlAdvanceSearch select, .ctrlAdvanceSearch input, .ctrlAdvanceSearch input[type="text"]').each(function () {
        var getAdvtColId = $(this).data('id');
        var getAdvtColType = $(this).data('type');
        //var getAdvtColFilter = $(this).data('filter');

        var getAdvtColFilter = '';
        if(getAdvtColType == 'DropDown'){
            getAdvtColFilter = 'Equal To';
        }else{
            getAdvtColFilter = 'Contains';
        }

        var getAdvtValue = $(this).val();
        if (getAdvtValue != '') {
            var advtQueryJoinner = ' AND  ';
            if (advtSearchCount == 0 && advanceSearchCondition == '') {
                //advtQueryJoinner = 'WHERE ';
                advtQueryJoinner = ' ';
            }
            if ($(this).hasClass('txtAdvanceSearchSingle')) {
                advanceSearchCondition += advtQueryJoinner + '(' + getAdvtColId + ' ' + filterToOperator(getAdvtColFilter, getAdvtValue, getAdvtColType) + ')';
            } else if ($(this).hasClass('txtAdvanceSearchInBetweenA')) {
                var inputBetweenA = $('#advSearch1_' + getAdvtColId).val();
                var inputBetweenB = $('#advSearch2_' + getAdvtColId).val();
                if (inputBetweenA != '' && inputBetweenB != '') {
                    var inputBetweenVal = inputBetweenA + "-" + inputBetweenB;
                    advanceSearchCondition += advtQueryJoinner + '(' + getAdvtColId + ' ' + filterToOperator(getAdvtColFilter, inputBetweenVal, getAdvtColType) + ')';
                }
            }
            advtSearchCount = advtSearchCount + 1;
            //alert(getAdvtValue);
        }
    });
    // GET ADVANCE SEARCH PARAMETERS...
    return advanceSearchCondition;
}

function getWhereFilterCondition_old() {
    var whereCondtion = '';
    var selectedColumns = '';
    var sqlArrLen = $('.rptColumnOpt').length;
    if (sqlArrLen > 0) {
        var qbCnt = 0;
        $('.rptColumnOpt').each(function () {
            var getColumnId = $(this).attr('id').trim();
            var getColumnType = $('#dataColumnHolder #' + getColumnId).data('type');
            var getFilter = $('#dataColumnHolder #' + getColumnId).data('filter');
            var getFilterValue = $('#dataColumnHolder #' + getColumnId).data('filtervalue');
            var isFilterValueRequires = 'yes';
            if (getFilter != "") {
                if ((getFilterValue != "") || ((getFilter == 'Is Null') || (getFilter == 'Is Not Null') || (getFilter == 'Is Empty') || (getFilter == 'Is Not Empty'))) {
                    if (qbCnt == 0) {
                        whereCondtion += 'WHERE (' + getColumnId + ' ' + filterToOperator(getFilter, getFilterValue, getColumnType) + ')';
                    } else {
                        whereCondtion += ' AND (' + getColumnId + ' ' + filterToOperator(getFilter, getFilterValue, getColumnType) + ')';
                    }
                    qbCnt = qbCnt + 1;
                }
            }

        });
    } else {
        //  selectedColumns = '*';
    }
    // GET ADVANCE SEARCH PARAMETERS...
    var advanceSearchCondition = whereCondtion;
    var advtSearchCount = 0;
    $('.ctrlAdvanceSearch input, .ctrlAdvanceSearch select').each(function () {
        var getAdvtColId = $(this).data('id');
        var getAdvtColType = $(this).data('type');
        var getAdvtColFilter = $(this).data('filter');
        var getAdvtValue = $(this).val();
        if (getAdvtValue != '') {
            var advtQueryJoinner = ' AND  ';
            if (advtSearchCount == 0 && advanceSearchCondition == '') {
                advtQueryJoinner = 'WHERE ';
            }
            if ($(this).hasClass('txtAdvanceSearchSingle')) {
                advanceSearchCondition += advtQueryJoinner + '(' + getAdvtColId + ' ' + filterToOperator(getAdvtColFilter, getAdvtValue, getAdvtColType) + ')';
            } else if ($(this).hasClass('txtAdvanceSearchInBetweenA')) {
                var inputBetweenA = $('#advSearch1_' + getAdvtColId).val();
                var inputBetweenB = $('#advSearch2_' + getAdvtColId).val();
                if (inputBetweenA != '' && inputBetweenB != '') {
                    var inputBetweenVal = inputBetweenA + "-" + inputBetweenB;
                    advanceSearchCondition += advtQueryJoinner + '(' + getAdvtColId + ' ' + filterToOperator(getAdvtColFilter, inputBetweenVal, getAdvtColType) + ')';
                }
            }
            advtSearchCount = advtSearchCount + 1;
            //alert(getAdvtValue);
        }
    });
    // GET ADVANCE SEARCH PARAMETERS...
    return advanceSearchCondition;
}

function filterToOperator(condition, conditionVal, columnType) {
    var operator = '';
    if (condition == 'No Filter') {
        operator = '';
    } else if (condition == 'Contains') {
        operator = 'LIKE \'\'\'\'%' + conditionVal + '%\'\'\'\'';
    } else if (condition == 'Does Not Contain') {
        operator = 'NOT LIKE \'\'\'\'%' + conditionVal + '%\'\'\'\'';
    } else if (condition == 'Starts With') {
        operator = 'LIKE \'\'\'\'' + conditionVal + '%\'\'\'\'';
    } else if (condition == 'Ends With') {
        operator = 'LIKE \'\'\'\'%' + conditionVal + '\'\'\'\'';
    } else if (condition == 'Equal To') {
        operator = '= \'\'\'\'' + conditionVal + '\'\'\'\'';
    } else if (condition == 'Not Equal To') {
        operator = '!= \'\'\'\'' + conditionVal + '\'\'\'\'';
    } else if (condition == 'In Between') {
        var getInBetweenVal = conditionVal.split('-');
        operator = 'BETWEEN  \'\'\'\'' + getInBetweenVal[0] + '\' AND \'' + getInBetweenVal[1] + '\'';
    } else if (condition == 'Smaller Than') {
        operator = '< \'\'\'\'' + conditionVal + '\'\'\'\'';
    } else if (condition == 'Greater Than') {
        operator = '> \'\'\'\'' + conditionVal + '\'\'\'\'';
    } else if (condition == 'Smaller Than Or Equal To') {
        operator = '<= \'\'\'\'' + conditionVal + '\'\'\'\'';
    } else if (condition == 'Greater Than Or Equal To') {
        operator = '>= \'\'\'\'' + conditionVal + '\'\'\'\'';
    } else if (condition == 'Is Null') {
        operator = '= \'\'\'\'\'\'\'\'';
    } else if (condition == 'Is Not Null') {
        operator = '!= \'\'\'\'\'\'\'\'';
    } else if (condition == 'Is Empty') {
        operator = '= \'\'\'\'\'\'\'\'';
    } else if (condition == 'Is Not Empty') {
        operator = '!= \'\'\'\'\'\'\'\'';
    }
    return operator;
}

function filterToOperator_old(condition, conditionVal, columnType) {
    var operator = '';
    if (condition == 'No Filter') {
        operator = '';
    } else if (condition == 'Contains') {
        operator = 'LIKE \'%' + conditionVal + '%\'';
    } else if (condition == 'Does Not Contain') {
        operator = 'NOT LIKE \'%' + conditionVal + '%\'';
    } else if (condition == 'Starts With') {
        operator = 'LIKE \'' + conditionVal + '%\'';
    } else if (condition == 'Ends With') {
        operator = 'LIKE \'%' + conditionVal + '\'';
    } else if (condition == 'Equal To') {
        operator = '= \'' + conditionVal + '\'';
    } else if (condition == 'Not Equal To') {
        operator = '!= \'' + conditionVal + '\'';
    } else if (condition == 'In Between') {
        var getInBetweenVal = conditionVal.split('-');
        operator = 'BETWEEN  \'' + getInBetweenVal[0] + '\' AND \'' + getInBetweenVal[1] + '\'';
    } else if (condition == 'Smaller Than') {
        operator = '< \'' + conditionVal + '\'';
    } else if (condition == 'Greater Than') {
        operator = '> \'' + conditionVal + '\'';
    } else if (condition == 'Smaller Than Or Equal To') {
        operator = '<= \'' + conditionVal + '\'';
    } else if (condition == 'Greater Than Or Equal To') {
        operator = '>= \'' + conditionVal + '\'';
    } else if (condition == 'Is Null') {
        operator = '= \'\'';
    } else if (condition == 'Is Not Null') {
        operator = '!= \'\'';
    } else if (condition == 'Is Empty') {
        operator = '= \'\'';
    } else if (condition == 'Is Not Empty') {
        operator = '!= \'\'';
    }
    return operator;
}

function loadReportColumns(result, sqlTableName) {
    //   $('#dataColumnHolder').html('');
    var reportColumns = [];
    var arrSqlColumns = result.split("|");
    for (rc = 0; rc <= (arrSqlColumns.length - 1); rc++) {
        var arrColumnDetails = arrSqlColumns[rc].split(":");
        var getColumnName = arrColumnDetails[0];
        var getDataType = arrColumnDetails[1];
        addQueryColumns(getColumnName, getDataType);
    }
    $('.rptBtnSummation').click(function (e) {
        //alert('hi');
        var getParentClass = $(this).parent().hasClass('activeColumn');
        if (getParentClass) {
            var isActive = $(this).data('isactive');
            if (isActive == 'no') {
                $(this).data('isactive', 'yes');
                $(this).addClass('activeSummation');
            } else {
                $(this).data('isactive', 'no');
                $(this).removeClass('activeSummation');
            }
            adjustReportDesign();
        }
        return false;
    });
    $('#dataColumnHolder .rptColumnOpt').click(function (e) {
        var isQueryCheckboxChecked = $(this).find('input[type=checkbox]').prop('checked');
        if (isQueryCheckboxChecked) {
            $(this).find('input[type=checkbox]').prop("checked", false);
            $(this).removeClass('activeColumn');
            $(this).find('.rptBtnSummation').removeClass('activeSummation');
            $(this).find('.rptBtnSummation').data('isactive', 'no');
        } else {
            $(this).find('input[type=checkbox]').prop("checked", true);
            $(this).addClass('activeColumn');
        }
        adjustReportDesign();
    });
    $('.btnCloseFilterWin').click(function (e) {
        $('#filterListPanel').hide();
    });
    $('#dataFilterColumnHolder .rptColumnOpt').click(function (e) {
        var getColName = $(this).data('value');
        addFilterToReport(getColName);
        /* $('#filterListPanel row' + getColName).show();
         $('#filterListPanel').show();
         $('#txtSqlConditionColumn').html(getColName); */

    });
    hideWMSThemeLoading();
    showPropertyWindow('rptWinQuery', 'rptWinColumns');
}

function showFilterCogMenu() {

}

function deleteConditionFromList(colName, obj) {
    $(obj).parent().parent().remove();
    var sqlArrLen = $('#pnlConditionListHolder .row').length;
    if (sqlArrLen <= 0) {
        $('#fl' + colName).removeClass('activeColumn');
    }
}
function addFilterToReport(objFilterColumn) {
    var reportWindow = '<div class="rptFilter">' +
        '<div class="rptFilterTitle" data-column="' + objFilterColumn + '">' + objFilterColumn + '<div class="rptFilterMenu"><i class="fas fa-cog"></i></div></div>' +
        '<div class="rptFilterConditions">' +
        '</div>' +
        '</div>';
    $('.reportFilters').append(reportWindow);
    $(".rptFilter").draggable({ cancel: "div.rptFilterConditions" });
    $('.rptFilterMenu').click(function (e) {
        $('#rptFilterCogOption').show();
    });
}

function addConditionToListOld() {
    $('.reportFilters').html()
    var columnName = $('#txtSqlConditionColumn').html();
    var getOperator = $('#txtSqlCondition').val();
    var getConditionVal = 'Hide on Report';
    var showOnReport = $('#txtSqlConditionValue').prop("checked");
    if (showOnReport) {
        getConditionVal = 'Show on Report';
    }

    var isActiveColumn = $('#fl' + columnName).hasClass('activeColumn');
    if (!isActiveColumn) {
        $('#fl' + columnName).addClass('activeColumn');
    }
    $('#pnlConditionListHolder').append('<div class="row row' + columnName + '"><div class="col-md-3">' + columnName + '</div><div class="col-md-3">' + getOperator + '</div><div class="col-md-3">' + getConditionVal + '</div><div class="col-md-3"><div class="btnDeleteCondition" onclick="deleteConditionFromList(\'' + columnName + '\', this);"><i class="fas fa-trash"></i></div></div></div>');
}
/*
function addConditionToListOld() {
    var columnName = $('#txtSqlConditionColumn').html();
    var getOperator = $('#txtSqlCondition').val();
    var getConditionVal = 'Hide on Report';
    var showOnReport = $('#txtSqlConditionValue').prop("checked");
    if (showOnReport) {
        getConditionVal = 'Show on Report';
    }

    var isActiveColumn = $('#fl' + columnName).hasClass('activeColumn');
    if (!isActiveColumn) {
        $('#fl' + columnName).addClass('activeColumn');
    }
    $('#pnlConditionListHolder').append('<div class="row row' + columnName + '"><div class="col-md-3">' + columnName + '</div><div class="col-md-3">' + getOperator + '</div><div class="col-md-3">' + getConditionVal + '</div><div class="col-md-3"><div class="btnDeleteCondition" onclick="deleteConditionFromList(\'' + columnName + '\', this);"><i class="fas fa-trash"></i></div></div></div>');
}
*/
function resetQueryVariables() {

}

function addQueryObjects(dataLabel) {
    $('#dataObjectHolder').append('<option>' + dataLabel + '</option>');
    // $('#dataObjectHolder').append('<div class="rptQueryOpt" data-title=' + dataLabel +'" data-value="' + dataLabel + '"><input type="radio" name="rptQuery" /> ' + dataLabel +'</div>');
}

function loadQueryObjects() {
    $('#dataObjectHolder').html('');
    addQueryObjects('V_WMS_LocationObj');
    addQueryObjects('V_WMS_UserObj');
    addQueryObjects('V_WMS_SkuObj');
    addQueryObjects('V_WMS_InboundObj');

    $('#dataObjectHolder').change(function (e) {
        resetQueryVariables();
        sqlTableName = $(this).val();
        callAPItoGetObjectColumn(sqlTableName, 'na');
    });

    /* $('#dataObjectHolder .rptQueryOpt').click(function (e) {
        resetQueryVariables();
        sqlTableName = $(this).data('value');
        $('#dataObjectHolder .rptQueryOpt').removeClass('activeQuery');
        $(this).find('input').prop("checked", true);
        $(this).addClass('activeQuery');
        callAPItoGetObjectColumn(sqlTableName, 'na');
    }); */

    var chkEditQueryId = $('#hdnQueryId').val();
    var cacheCurrentSQL = $('#hdnSQLQueryText').val();
    if (chkEditQueryId.trim() != '') {
        sqlTableName = $('#hdnObjectName').val();
        callAPItoGetObjectColumn(sqlTableName, cacheCurrentSQL);
    }
}

function generateReportTable(getAvailableHeightForTable, getPageWidthInPx) {
    var getNumOfColumn = 0;
    var getRowCount = 0;

    var getColumns = getSqlSelectedColumns();
    ///alert(getColumns);
    reportColumns = getColumns.split(',');
    getNumOfColumn = reportColumns.length;
    $('.reportTable').html('');
    if ((getNumOfColumn > 0) && (getColumns.trim() != '')) {
        var widthDistribution = (getPageWidthInPx - getNumOfColumn) / getNumOfColumn;
        // Report Header Cell... 
        /// alert(getNumOfColumn);
        for (var cl = 0; cl < getNumOfColumn; cl++) {
            $('.reportTable').append('<div class="reportHeaderCell" style="width:' + widthDistribution + 'px;"><div class="reportHeaderContent" data-value="' + reportColumns[cl] + '" contenteditable="true">' + reportColumns[cl] + '</div></div>');
        }
        // Report Row Cell... 
        // for (var r = 0; r < getRowCount; r++) {
        var getReportTableHeight = $('.reportTableHeight').height();
        var r = 0;
        while (r < 5) {
            // while ($('.reportTable').height() < getAvailableHeightForTable) {
            var rowStr = '<div class="reportRow">';
            for (var rcl = 0; rcl < getNumOfColumn; rcl++) {
                rowStr = rowStr + '<div class="reportRowCell" style="width:' + widthDistribution + 'px;"><div class="reportRowContent">#VALUE(' + reportColumns[rcl] + ')</div></div>';
            }
            rowStr = rowStr + '</div>';
            $('.reportTable').append(rowStr);
            r = r + 1;
        }

        // Summation Row
        var sumColLen = $('#dataColumnHolder .activeSummation').length;
        if (sumColLen > 0) {
            for (var sm = 0; sm < getNumOfColumn; sm++) {
                var summationHtml = '-';
                var colName = reportColumns[sm].trim();
                var isColumnHaveSummation = $('#dataColumnHolder #' + colName).find('.rptBtnSummation').hasClass('activeSummation');
                if (isColumnHaveSummation) {
                    summationHtml = '<b> = SUM </b>';
                }
                $('.reportTable').append('<div class="reportSummationCell" style="width:' + widthDistribution + 'px;"><div class="reportSummationContent" data-value="' + reportColumns[sm] + '">' + summationHtml + '</div></div>');
            }
        }
        // Summation Row
        //  }
        // 
        $('.reportHeaderCell').click(function () {
            $('.reportHeaderCell').removeClass('activeColumnHeader');
            $(this).addClass('activeColumnHeader');
        });
    }
}

function generatePreviewTable(getAvailableHeightForTable, getPageWidthInPx, getPageMarginLeftInPx, getPageMarginRightInPx, runMode) {
    var getNumOfColumn = 0;
    var getRowCount = 0;
    var getColumns = getSqlSelectedColumns();
    reportColumns = getColumns.split(',');
    getNumOfColumn = reportColumns.length;
    //$('.previewTable').html('');

    // $('.previewTable').css('margin-left', getPageMarginLeftInPx + 'px');
    //$('.previewTable').css('margin-right', getPageMarginRightInPx + 'px');

    if ((getNumOfColumn > 0) && (getColumns.trim() != '')) {
        // var widthDistribution = (getPageWidthInPx - getNumOfColumn) / getNumOfColumn;		
        var widthDistribution = 0;
        if (reportDetailColumn != '') {
            widthDistribution = ((getPageWidthInPx - (reportDetailColWidth + 2)) - getNumOfColumn) / getNumOfColumn;
        } else {
            widthDistribution = (getPageWidthInPx - getNumOfColumn) / getNumOfColumn;
        }

        $('#hdnColumnWidth').val(widthDistribution);
        /*
        // Group By Row
        if (runMode == 'execute') {
            var rowGroupByWidth = widthDistribution * getNumOfColumn;
            if (reportDetailColumn != '') {
                rowGroupByWidth = rowGroupByWidth + reportDetailColWidth;
            }
            $('.previewTable').append('<div class="reportRowGroupBy"><div class="reportGroupByCell" id="reportGroupByCell" style="width:' + rowGroupByWidth + 'px;"><div class="reportGroupByContent" data-value=""><b>Drag a column header here to group by that column.</b></div></div></div>');
        }

        // Header Row
        var strHeaderRow = '<div class="reportHeaderRow">';
        if (reportDetailColumn != '') {
            strHeaderRow += '<div class="reportHeaderCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportHeaderContent btnViewDetailsHolder" data-value="Detail">Detail</div></div>';
        }
        for (var cl = 0; cl < getNumOfColumn; cl++) {
            var splitColumnGroup = reportColumns[cl].split(":");
            strHeaderRow += '<div class="reportHeaderCell" style="width:' + widthDistribution + 'px;"><div class="reportHeaderContent" data-value="' + splitColumnGroup[0] + '">' + splitColumnGroup[1] + '</div></div>';
        }
        strHeaderRow += '</div>';
        $('.previewTable').append(strHeaderRow);
        */
        if (runMode == 'execute') {
            // Filter Row
            var strFilterRow = '<div class="reportFilterRow">';
            if (reportDetailColumn != '') {
                strFilterRow += '<div class="reportFilterCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportFilterContent"> </div></div>';
            }
            for (var fl = 0; fl < getNumOfColumn; fl++) {
                var splitColumnGroup = reportColumns[fl].split(":");
                strFilterRow += '<div class="reportFilterCell" style="width:' + widthDistribution + 'px;"><div class="reportFilterContent" data-value="' + splitColumnGroup[0] + '">' + createFilterDropDown(splitColumnGroup[0]) + createFilterUserInput(splitColumnGroup[0], splitColumnGroup[2]) + createFilterUserInputSecond(splitColumnGroup[0], splitColumnGroup[2]) + '</div></div>';
            }
            strFilterRow += '</div>';
            $('.previewTable').append(strFilterRow);
        }
        var getReportTableHeight = $('.reportTableHeight').height();

        // Commented by Abhijit as on 09 Jan 2023
        // callAPItoGetData();


        // Commented to get real data... 
        /*
        var r = 0;
        while (r < 10) {
            var rowStr = '<div class="reportRow">';
            for (var rcl = 0; rcl < getNumOfColumn; rcl++) {
                rowStr = rowStr + '<div class="reportRowCell" style="width:' + widthDistribution + 'px;"><div class="reportRowContent">#VALUE(' + reportColumns[rcl] + ')</div></div>';
            }
            rowStr = rowStr + '</div>';
            $('.previewTable').append(rowStr);
            r = r + 1;
        }*/


        // Summation Row
        var sumColLen = $('#dataColumnHolder .activeSummation').length;
        if (sumColLen > 0) {
            if (reportDetailColumn != '') {
                $('.previewTable').append('<div class="reportSummationCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportSummationContent btnViewDetailsHolder">-</div></div>');
            }
            for (var sm = 0; sm < getNumOfColumn; sm++) {
                var summationHtml = '-';
                var splitColumnGroup = reportColumns[sm].split(":");
                //var colName = reportColumns[sm].trim();
                var colName = splitColumnGroup[0].trim();
                var isColumnHaveSummation = $('#dataColumnHolder #' + colName).find('.rptBtnSummation').hasClass('activeSummation');
                if (isColumnHaveSummation) {
                    summationHtml = '<b> = SUM </b>';
                }
                $('.previewTable').append('<div class="reportSummationCell" style="width:' + widthDistribution + 'px;"><div class="reportSummationContent" data-value="' + splitColumnGroup[0] + '">' + summationHtml + '</div></div>');
            }
        }
        // Summation Row
        if (runMode == 'execute') {
            $(".previewTable .reportHeaderCell").draggable({
                revert: true, helper: "clone", drag: function (event, ui) {
                    groupByItem = $(this).find('.reportHeaderContent').data('value').trim();
                }
            });
            $(".reportGroupByContent").droppable({
                drop: function (event, ui) {
                    $(".reportGroupByContent").data('value', groupByItem);
                    $(this).html("Group By: <div class='GroupByItem'>" + groupByItem + "</div><div class='btnRemoveGroupBy' onclick='removeGroupBy();'>X</div>");
                    currentPageNo = 1;
                    callAPItoGetData();
                }
            });
        }
    }
}

function removeGroupBy() {
    $(".reportGroupByContent").data('value', '');
    $(".reportGroupByContent").html('<b>Drag a column header here to group by that column.</b>');
    groupByItem = '';
    $(".reportGroupByContent").data('value', '');
    callAPItoGetData();
}

function loadDefaults() {

}

function generateReport(runMode) {
    $('body').css('overflow', 'hidden');
    $('.previewReportPanel').show();

    var getPageWidthInPx = 0;
    var getPageHeightInPx = 0;

    var getPageMarginLeftInPx = 0;
    var getPageMarginTopInPx = 0;
    var getPageMarginRightInPx = 0;
    var getPageMarginBottomInPx = 0;

    var getPageHeaderWidth = 0;
    var getPageFooterWidth = 0;

    if (pageOrientation == 'PageLandscape') {
        getPageWidthInPx = pageHeight * Pixel_Unit;
        getPageHeightInPx = pageWidth * Pixel_Unit;

        getPageMarginLeftInPx = pageMarginTop * Pixel_Unit;
        getPageMarginTopInPx = pageMarginRight * Pixel_Unit;
        getPageMarginRightInPx = pageMarginBottom * Pixel_Unit;
        getPageMarginBottomInPx = pageMarginLeft * Pixel_Unit;
    } else {
        getPageWidthInPx = pageWidth * Pixel_Unit;
        getPageHeightInPx = pageHeight * Pixel_Unit;

        getPageMarginLeftInPx = pageMarginLeft * Pixel_Unit;
        getPageMarginTopInPx = pageMarginTop * Pixel_Unit;
        getPageMarginRightInPx = pageMarginRight * Pixel_Unit;
        getPageMarginBottomInPx = pageMarginBottom * Pixel_Unit;
    }

    getPageHeaderWidth = getPageWidthInPx - (getPageMarginLeftInPx + getPageMarginRightInPx);
    getPageFooterWidth = getPageWidthInPx - (getPageMarginLeftInPx + getPageMarginRightInPx);

    $('.previewPage').css('width', getPageWidthInPx + 'px');
    $('.previewPage').css('height', getPageHeightInPx + 'px');

    $('.previewPageHeader').css('width', getPageHeaderWidth + 'px');
    $('#previewPageHeader').css('top', getPageMarginTopInPx + 'px');
    $('#previewPageHeader').css('left', getPageMarginLeftInPx + 'px');

    $('.previewPageFooter').css('width', getPageFooterWidth + 'px');
    $('#previewPageFooter').css('left', getPageMarginLeftInPx + 'px');
    $('#previewPageFooter').css('bottom', getPageMarginBottomInPx + 'px');

    var getHeaderHeight = $('.previewPageHeader').outerHeight();
    var getFooterHeight = $('.previewPageFooter').outerHeight();
    //alert(getHeaderHeight+ " : " + getFooterHeight);

    // var getContentAvailableSpace = getPageHeightInPx - (getHeaderHeight + getFooterHeight);
    var getContentAvailableSpace = getPageHeightInPx - (getHeaderHeight + getFooterHeight + getPageMarginTopInPx + getPageMarginBottomInPx);

    var getAvailableWidthForTable = getPageWidthInPx - (getPageMarginLeftInPx + getPageMarginRightInPx + 1);

    $('.previewPageContent').css('width', (getAvailableWidthForTable + 25) + 'px');
    $('.previewPageContent').css('margin-left', getPageMarginLeftInPx + 'px');
    $('.previewPageContent').css('margin-right', getPageMarginRightInPx + 'px');
    $('.previewPageContent').css('top', (getHeaderHeight + getPageMarginTopInPx) + 'px');
    $('.previewPageContent').css('height', getContentAvailableSpace + 'px');
    $('.previewPageContent').css('overflow', 'auto');

    var getPageTitle = $('.reportPageTitle').html();
    $('.previewPageTitle').html(getPageTitle);

    var getReportTitleHeight = $('.previewPageTitle').outerHeight();
    var getAvailableHeightForTable = getContentAvailableSpace - getReportTitleHeight;
    generatePreviewTable(getAvailableHeightForTable, getAvailableWidthForTable, getPageMarginLeftInPx, getPageMarginRightInPx, runMode);
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

function showHideAdvanceSearch() {
    var isAdvtSearchActive = $('#btnToggleAdvanceSearch').hasClass('activeAdvtSearch');
    var previewNavBarHeight = $('.reportPreviewNavBar').outerHeight();

    if (!isAdvtSearchActive) {
        $('#btnToggleAdvanceSearch a span').html('Hide Advance Search');
        $('#btnToggleAdvanceSearch').addClass('activeAdvtSearch');
        $('#reportAdvanceSearchBar').css('position', 'absolute');
        $('#reportAdvanceSearchBar').css('top', previewNavBarHeight + 'px');
        var previewSearchBarHeight = $('.reportAdvanceSearchBar').outerHeight();
        var getPagePaddingTop = previewSearchBarHeight + previewNavBarHeight + 20;
        $('#previewReportPageHolder').css('padding-top', getPagePaddingTop + 'px');
        $('#reportAdvanceSearchBar').show();
    } else {
        $('#btnToggleAdvanceSearch a span').html('Show Advance Search');
        $('#btnToggleAdvanceSearch').removeClass('activeAdvtSearch');
        $('#reportAdvanceSearchBar').hide();
        var getPagePaddingTop = previewNavBarHeight + 20;
        $('#previewReportPageHolder').css('padding-top', getPagePaddingTop + 'px');
    }
}

function getAdvanceSearchResult() {
    currentPageNo = 1;
    callAPItoGetData();
}

function generateAdvanceFilter(advanceFilter) {
    // reportAdvanceSearch = $('#hdnAdvanceSearch').val();
    $('#reportAdvanceSearchBar').html('');
    reportAdvanceSearch = advanceFilter;
    if (reportAdvanceSearch.length > 0) {
        isAdvanceSearchOn = true;
        $('#reportAdvanceSearchBar').append('<b>Advance Search:</b>');
        for (var i = 0; i < reportAdvanceSearch.length; i++) {
            var AdvanceColumnDisplayName = reportAdvanceSearch[i].DisplayLabel.replace('\r\n', '');
            var AdvanceColumnName = reportAdvanceSearch[i].Filter.replace('\r\n', '');
            var AdvanceColumnType = reportAdvanceSearch[i].FilterType.replace('\r\n', '');

            var AdvanceColumnFilter = reportAdvanceSearch[i].Filter.replace('\r\n', '');
            var AdvanceColumnFilterValue = '';
            var AdvanceColumnFilterCtrlType = reportAdvanceSearch[i].FilterType.replace('\r\n', '');
            if (AdvanceColumnFilterValue == 'na') {
                AdvanceColumnFilterValue = '';
            }

            var inputType = 'text';

            if ((AdvanceColumnType == 'datetime') || (AdvanceColumnType == 'date')) {
                inputType = 'date';
            } else if (AdvanceColumnType == 'numeric' || AdvanceColumnType == 'decimal' || AdvanceColumnType == 'float' || AdvanceColumnType == 'int' || AdvanceColumnType == 'bigint' || AdvanceColumnType == 'tinyint' || AdvanceColumnType == 'smallint') {
                inputType = 'number';
            }

            var advanceSearchControl = '<div class="ctrlAdvanceSearch" style="">' +
                '<div>' + AdvanceColumnDisplayName + '</div>';

            if (AdvanceColumnFilterCtrlType == 'RangeInput') {
                var breakAdvColFilterValue = AdvanceColumnFilterValue.split('-');
                if (breakAdvColFilterValue[0] == 'na') {
                    breakAdvColFilterValue[0] = '';
                }
                if (breakAdvColFilterValue[1] == 'na') {
                    breakAdvColFilterValue[1] = '';
                }
                var AdvanceColumnFilterValueA = breakAdvColFilterValue[0];
                var AdvanceColumnFilterValueB = breakAdvColFilterValue[1];
                advanceSearchControl += '<div><input class="txtAdvanceSearchInBetweenA" type="' + inputType + '" step="any" id="advSearch1_' + AdvanceColumnName + '" data-id="' + AdvanceColumnName + '" data-type="' + AdvanceColumnType + '" data-filter="' + AdvanceColumnFilter + '" value="' + AdvanceColumnFilterValueA + '" style="height:22px;" /> - <input class="txtAdvanceSearchInBetweenB" type="' + inputType + '" step="any" id="advSearch2_' + AdvanceColumnName + '" data-id="' + AdvanceColumnName + '" data-type="' + AdvanceColumnType + '" data-filter="' + AdvanceColumnFilter + '" value="' + AdvanceColumnFilterValueB + '" style="height:22px;" /></div>';
            } else if (AdvanceColumnFilterCtrlType == 'DropDown') {
                //var getListOptions = $('#hdnAdvDDList_' + AdvanceColumnName).val();
                //var breakListOptions = getListOptions.split("|");

                advanceSearchControl += '<div><select class="txtAdvanceSearchSingle" type="text" id="advSearch_' + AdvanceColumnName + '" data-id="' + AdvanceColumnName + '" data-type="' + AdvanceColumnType + '" data-filter="' + AdvanceColumnFilter + '" value="' + AdvanceColumnFilterValue + '" style="height:22px;">';
                /* advanceSearchControl += '<option value="">-- Select --</option>';
                 for (var ddlList = 0; ddlList < breakListOptions.length; ddlList++) {
                     var strSelected = '';
                     if ((breakListOptions[ddlList] == AdvanceColumnFilterValue) && (AdvanceColumnFilterValue != '')) {
                         strSelected = 'selected = "selected"';
                     }
                     advanceSearchControl += '<option value="' + breakListOptions[ddlList] + '" ' + strSelected + ' > ' + breakListOptions[ddlList] + '</option>';
                 }
                 */

                advanceSearchControl += '</select></div>';
            } else {
                advanceSearchControl += '<div><input class="txtAdvanceSearchSingle" type="' + inputType + '" step="any" id="advSearch_' + AdvanceColumnName + '" data-id="' + AdvanceColumnName + '" data-type="' + AdvanceColumnType + '" data-filter="' + AdvanceColumnFilter + '" value="' + AdvanceColumnFilterValue + '" style="height:22px;" /></div>';
            }

            advanceSearchControl += '</div>';
            $('#reportAdvanceSearchBar').append(advanceSearchControl);
        }
        $('#reportAdvanceSearchBar').append('<div class="btnAdvanceSearch"><a href="#" onclick="getAdvanceSearchResult();return false;"><i class="fas fa-search"></i>Search</a></div>');
        $('#btnToggleAdvanceSearch').show();

        for (var k = 0; k < reportAdvanceSearch.length; k++) {
            var advFilterCtrlType = reportAdvanceSearch[k].FilterType.replace('\r\n', '');
            if (advFilterCtrlType == 'DropDown') {
                var advDisplayName = reportAdvanceSearch[k].DisplayLabel.replace('\r\n', '');
                var advFilter = reportAdvanceSearch[k].Filter.replace('\r\n', '');
                bindAdvanceFilterDropDown('advSearch_' + advFilter, advFilter);
            }
        }
    } else {
        $('#btnToggleAdvanceSearch').hide();
    }
}

function bindAdvanceFilterDropDown(dropDownId, dropDownColumn) {
    $('#' + dropDownId).html('');
    var postData = {
        "ReportId": currentReportId,
        "FilterColumn": dropDownColumn,
        "UserId": currentUserId,
        "CustomerId": currentCustomerId,
        "WarehouseId": currentWarehouseId
    };

    /*
        type: "GET",
        url: "http://localhost/HTMLContainerApp2.1/StaticAPI/" + dropDownColumn + "_DropDown.json",
    */
   // http://173.212.244.46/WebAPITest/api/staging/v1/Report/getReportFilterValue
   var apiPath = wmsApiPath + "Report/getReportFilterValue";
    $.ajax({
        type: "POST",
        url: apiPath,
        data: postData,
        beforeSend: function () {
            showWMSThemeLoading();
        },
        success: function (data) {
            var getDropDownList = data.Result.Table;
            for (var i = 0; i < getDropDownList.length; i++) {
                var getOption = getDropDownList[i].Name;
                var getOptionValue = getDropDownList[i].Value;
                var ddlOption = '<option value="' + getOptionValue + '">' + getOption + '</option>';
                $('[id="' + dropDownId + '"]').append(ddlOption);
            }
            hideWMSThemeLoading();
        }
    });
}

function generateAdvanceFilter_Old(advanceFilter) {
    // reportAdvanceSearch = $('#hdnAdvanceSearch').val();
    $('#reportAdvanceSearchBar').html('');
    reportAdvanceSearch = advanceFilter;
    if (reportAdvanceSearch != '') {
        isAdvanceSearchOn = true;
        var splitAdvanceSearchCol = reportAdvanceSearch.split('|');
        $('#reportAdvanceSearchBar').append('<b>Advance Search:</b>');
        for (var i = 0; i < splitAdvanceSearchCol.length; i++) {
            var splitAdvtSearchSubCol = splitAdvanceSearchCol[i].split(':');
            var AdvanceColumnDisplayName = splitAdvtSearchSubCol[1];
            var AdvanceColumnName = splitAdvtSearchSubCol[0];
            var AdvanceColumnType = splitAdvtSearchSubCol[2];
            var AdvanceColumnFilter = splitAdvtSearchSubCol[3];
            var AdvanceColumnFilterValue = splitAdvtSearchSubCol[4];
            var AdvanceColumnFilterCtrlType = splitAdvtSearchSubCol[5];
            if (AdvanceColumnFilterValue == 'na') {
                AdvanceColumnFilterValue = '';
            }

            var inputType = 'text';

            if ((AdvanceColumnType == 'datetime') || (AdvanceColumnType == 'date')) {
                inputType = 'date';
            } else if (AdvanceColumnType == 'numeric' || AdvanceColumnType == 'decimal' || AdvanceColumnType == 'float' || AdvanceColumnType == 'int' || AdvanceColumnType == 'bigint' || AdvanceColumnType == 'tinyint' || AdvanceColumnType == 'smallint') {
                inputType = 'number';
            }

            var advanceSearchControl = '<div class="ctrlAdvanceSearch" style="">' +
                '<div>' + AdvanceColumnDisplayName + '</div>';

            if (AdvanceColumnFilterCtrlType == 'RangeInput') {
                var breakAdvColFilterValue = AdvanceColumnFilterValue.split('-');
                if (breakAdvColFilterValue[0] == 'na') {
                    breakAdvColFilterValue[0] = '';
                }
                if (breakAdvColFilterValue[1] == 'na') {
                    breakAdvColFilterValue[1] = '';
                }
                var AdvanceColumnFilterValueA = breakAdvColFilterValue[0];
                var AdvanceColumnFilterValueB = breakAdvColFilterValue[1];
                advanceSearchControl += '<div><input class="txtAdvanceSearchInBetweenA" type="' + inputType + '" step="any" id="advSearch1_' + AdvanceColumnName + '" data-id="' + AdvanceColumnName + '" data-type="' + AdvanceColumnType + '" data-filter="' + AdvanceColumnFilter + '" value="' + AdvanceColumnFilterValueA + '" style="height:22px;" /> - <input class="txtAdvanceSearchInBetweenB" type="' + inputType + '" step="any" id="advSearch2_' + AdvanceColumnName + '" data-id="' + AdvanceColumnName + '" data-type="' + AdvanceColumnType + '" data-filter="' + AdvanceColumnFilter + '" value="' + AdvanceColumnFilterValueB + '" style="height:22px;" /></div>';
            } else if (AdvanceColumnFilterCtrlType == 'DropDownList') {
                var getListOptions = $('#hdnAdvDDList_' + AdvanceColumnName).val();
                var breakListOptions = getListOptions.split("|");

                advanceSearchControl += '<div><select class="txtAdvanceSearchSingle" type="text" id="advSearch_' + AdvanceColumnName + '" data-id="' + AdvanceColumnName + '" data-type="' + AdvanceColumnType + '" data-filter="' + AdvanceColumnFilter + '" value="' + AdvanceColumnFilterValue + '" style="height:22px;">';
                advanceSearchControl += '<option value="">-- Select --</option>';
                for (var ddlList = 0; ddlList < breakListOptions.length; ddlList++) {
                    var strSelected = '';
                    if ((breakListOptions[ddlList] == AdvanceColumnFilterValue) && (AdvanceColumnFilterValue != '')) {
                        strSelected = 'selected = "selected"';
                    }
                    advanceSearchControl += '<option value="' + breakListOptions[ddlList] + '" ' + strSelected + ' > ' + breakListOptions[ddlList] + '</option>';
                }

                advanceSearchControl += '</select></div>';
            } else {
                advanceSearchControl += '<div><input class="txtAdvanceSearchSingle" type="' + inputType + '" step="any" id="advSearch_' + AdvanceColumnName + '" data-id="' + AdvanceColumnName + '" data-type="' + AdvanceColumnType + '" data-filter="' + AdvanceColumnFilter + '" value="' + AdvanceColumnFilterValue + '" style="height:22px;" /></div>';
            }

            advanceSearchControl += '</div>';
            $('#reportAdvanceSearchBar').append(advanceSearchControl);
        }
        $('#reportAdvanceSearchBar').append('<div class="btnAdvanceSearch"><a href="#" onclick="getAdvanceSearchResult();return false;"><i class="fas fa-search"></i>Search</a></div>');
        $('#btnToggleAdvanceSearch').show();
    } else {
        $('#btnToggleAdvanceSearch').hide();
    }
}

function app_report_init() {
    // loadDefaults();
    pageOrientation = $('#hdnPageOrientation').val();
    pageWidth = $('#hdnPageWidth').val();
    pageHeight = $('#hdnPageHeight').val();
    pageMarginLeft = $('#hdnLeftMargin').val();
    pageMarginTop = $('#hdnTopMargin').val();
    pageMarginRight = $('#hdnRightMargin').val();
    pageMarginBottom = $('#hdnBottomMargin').val();

    reportDetailType = $('#hdnDetailActionType').val();
    reportDetailColumn = $('#hdnDetailActionColumn').val();

    // Advance Search

    var previewNavBarHeight = $('.reportPreviewNavBar').outerHeight();
    var getPagePaddingTop = previewNavBarHeight + 20;
    $('#previewReportPageHolder').css('padding-top', getPagePaddingTop + 'px');
    $('#reportAdvanceSearchBar').hide();

    $('.closeReportPreview').click(function () {
        //$('#previewPage').html('');
        //$('body').css('overflow', 'auto');
        //$('.previewReportPanel').hide();
        showAlert("Report Closed.", "info", "../Reports/WmsReports.aspx");
    });
    $('.rptHeaderOpt').click(function () {
        var templatePage = $(this).data('value');
        rptHeaderObj = templatePage;
        loadHeaderObject(rptHeaderObj);
    });
    $('.rptFooterOpt').click(function () {
        var templatePage = $(this).data('value');
        rptFooterObj = templatePage;
        loadFooterObject(rptFooterObj);
    });
    $('.rptTabResource').click(function () {
        showPropertyWindow('rptWinSection', 'rptWinResource');
    });
    $('.rptTabPageSetup').click(function () {
        showPropertyWindow('rptWinPageSetup');
    });
    $('.rptTabHeader').click(function () {
        showPropertyWindow('rptWinHeader');
    });
    $('.rptTabFooter').click(function () {
        showPropertyWindow('rptWinFooter');
    });
    /* $('.rptTabQuery').click(function () {
        showPropertyWindow('rptWinQuery');
    }); */
    /*
    $('.rptTabFilterColumns').click(function () {
        showPropertyWindow('rptWinFilterColumns');
    });
    */
    $('.rptTabColumns').click(function () {
        showPropertyWindow('rptWinQuery', 'rptWinColumns');
    });
    $('.rptTabPreview').click(function () {
        generateReportPreview('preview');
    });
    $('.rptTabExecute').click(function () {
        generateReportPreview('execute');
    });
    $('.rptRadioGroup').click(function () {
        $('.rptRadioGroup input').prop("checked", false);
        $(this).find('input').prop("checked", true);
    });
    $('.rptQueryOpt').click(function () {
        $('.rptQueryOpt input').prop("checked", false);
        $(this).find('input').prop("checked", true);
    });
    $('.rptFrmIconList i').click(function () {
        var getIconClass = $(this).attr('class');
        $('#rptFrmReportIconPreview').attr('class', getIconClass);
    });
    $("#rpcxReportTitle").change(function () {
        var getPageTitle = $(this).val();
        if (getPageTitle.trim() != '') {
            $('.reportPageTitle').html(getPageTitle);
        } else {
            $('.reportPageTitle').html('Add Report Page Title');
        }
    });
    $("#rpcxPageSize").change(function () {
        var getPageType = $(this).val();
        // alert(getPageType);
        if (getPageType.indexOf('x') > -1) {
            var extractPageSize = getPageType.split(': ');
            var extractPageDimention = extractPageSize[1].split(' x ');
            //alert(extractPageDimention[1]);
            $('#rpcxPageWidth').val(extractPageDimention[0]);
            $('#rpcxPageHeight').val(extractPageDimention[1]);
            pageWidth = extractPageDimention[0];
            pageHeight = extractPageDimention[1];
            adjustReportDesign();
        } else if (getPageType == 'Custom Size') {
            $('#rpcxPageWidth').val('');
            $('#rpcxPageHeight').val('');
        } else {
            $('#rpcxPageWidth').val('');
            $('#rpcxPageHeight').val('');
        }
    });

    $('.rptPageOpt').click(function () {
        $('.rptPageOpt').removeClass('activePageOpt');
        $(this).addClass('activePageOpt');
        var getPageOrientationVal = $(this).data('value');
        pageOrientation = getPageOrientationVal;
        adjustReportDesign();
    });

    showPropertyWindow('rptWinSection', 'rptWinResource');
    loadCanvasHolder();
    // loadHeaderObject(rptHeaderObj);
    // loadFooterObject(rptFooterObj);
    adjustReportDesign();
    loadQueryObjects();
    $(function () {
        $("#slider").slider();
    });
    $(function () {
        $("#slider").slider({
            range: "max",
            min: 10,
            max: 100,
            value: 100,
            slide: function (event, ui) {
                $("#zoomCanvas").html(ui.value);
                var getZoom = Number(ui.value) / 100;
                $('.reportCanvas').attr('style', 'transform:scale(' + getZoom + ');');
                adjustReportDesign();
            }
        });
        $("#zoomCanvas").html($("#slider").slider("value"));
        var getZoom = Number($("#slider").slider("value")) / 100;
        $('.reportCanvas').css('style', 'transform:scale(' + getZoom + ');');
    });
}

function loadCanvasHolder() {
    var getNavHeight = $('.themeWMSTopNav').outerHeight();
    var getWhiteBarHeight = $('.fixed_page').outerHeight();
    var getReportToolBarHeight = $('.rptToolBar').outerHeight();
    var getFinalHeaderHeight = getNavHeight + getWhiteBarHeight + getReportToolBarHeight;
    var getWindowHeight = $(window).height();
    var canvasHolderHeight = getWindowHeight - getFinalHeaderHeight;
    var canvasHolderWidth = $('.reportDesignPanel').outerWidth();
    $('.reportCanvasHolder').css('width', canvasHolderWidth + 'px');
    $('.reportCanvasHolder').css('height', canvasHolderHeight + 'px');
    $('.reportCanvasHolder').css('overflow', 'auto');
}
/*
function showPropertyWindow(objClass) {
    $('.rptPropertyWindow').hide();
    $('#' + objClass).show();
}
*/

function showPropertyWindow() {
    $('.rptPropertyWindow').hide();
    for (var i = 0; i < arguments.length; i++) {
        $('#' + arguments[i]).show();
    }
}

function loadHeaderObject(obj) {
    var serverURL = '';
    var myDate = new Date();
    var finalURLToPost = serverURL + "Views/HeaderTemplates/" + obj + ".html";
    $("#previewPageHeader").load(finalURLToPost, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success")
            loadFooterObject(rptFooterObj);
        if (statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
    })//;
}

function loadFooterObject(obj) {
    var serverURL = '';
    var myDate = new Date();
    var finalURLToPost = serverURL + "Views/FooterTemplates/" + obj + ".html";
    $("#previewPageFooter").load(finalURLToPost, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success")
            generateReport('execute');
        if (statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
    })//;
}

function createDropDownOption(optVal, defaultVal) {
    var ddlOpt = '';
    if (optVal == defaultVal) {
        ddlOpt = '<option value="' + optVal + '" selected="selected">' + optVal + '</option>';
    } else {
        ddlOpt = '<option value="' + optVal + '">' + optVal + '</option>';
    }
    return ddlOpt;
}

function updateFilterValue(filterId) {
    var getFilterType = $('#selFl_' + filterId).val();
    var getFilterVal = $('#inFl_' + filterId).val();
    if (getFilterType == 'In Between') {
        var getFromVal = $('#inFl1_' + filterId).val();
        var getToVal = $('#inFl2_' + filterId).val();
        if (getFromVal != '' && getToVal != '') {
            getFilterVal = getFromVal + '-' + getToVal;
            $('#dataColumnHolder #' + filterId).data('filtervalue', getFilterVal);
            currentPageNo = 1;
            callAPItoGetData();
        }
    } else {
        $('#dataColumnHolder #' + filterId).data('filtervalue', getFilterVal);
        currentPageNo = 1;
        callAPItoGetData();
    }
}

function updateFilter(filterId) {
    var getFilter = $('#selFl_' + filterId).val();
    $('#inFl_' + filterId).val('');
    $('#inFl1_' + filterId).val('');
    $('#inFl2_' + filterId).val('');
    $('#dataColumnHolder #' + filterId).data('filter', getFilter);
    $('#inFl_' + filterId).show();
    $('#inFl1_' + filterId).hide();
    $('#inFl2_' + filterId).hide();
    if ((getFilter == '') || (getFilter == 'Is Null') || (getFilter == 'Is Not Null') || (getFilter == 'Is Empty') || (getFilter == 'Is Not Empty')) {
        //$('#dataColumnHolder #' + filterId).data('filter', '');
        $('#dataColumnHolder #' + filterId).data('filtervalue', '');
        //  $('#inFl_' + filterId).val('');
        callAPItoGetData();
    } else if (getFilter == 'In Between') {
        $('#inFl_' + filterId).hide();
        $('#inFl1_' + filterId).show();
        $('#inFl2_' + filterId).show();
    }

    // callAPItoGetData();
}

function createFilterDropDown(filterId) {
    var getFieldName = filterId.trim();
    var getDropDownDefault = $('#dataColumnHolder #' + getFieldName).data('filter');

    var ddlFilter = '<select id="selFl_' + getFieldName + '" value="' + getDropDownDefault + '" onchange="updateFilter(\'' + getFieldName + '\');">' +
        '<option value="">No Filter</option>' +
        // createDropDownOption('No Filter', getDropDownDefault) +
        createDropDownOption('Contains', getDropDownDefault) +
        createDropDownOption('Does Not Contain', getDropDownDefault) +
        createDropDownOption('Starts With', getDropDownDefault) +
        createDropDownOption('Ends With', getDropDownDefault) +
        createDropDownOption('Equal To', getDropDownDefault) +
        createDropDownOption('Not Equal To', getDropDownDefault) +
        createDropDownOption('In Between', getDropDownDefault) +
        createDropDownOption('Smaller Than', getDropDownDefault) +
        createDropDownOption('Greater Than', getDropDownDefault) +
        createDropDownOption('Smaller Than Or Equal To', getDropDownDefault) +
        createDropDownOption('Greater Than Or Equal To', getDropDownDefault) +

        createDropDownOption('Is Null', getDropDownDefault) +
        createDropDownOption('Is Not Null', getDropDownDefault) +
        createDropDownOption('Is Empty', getDropDownDefault) +
        createDropDownOption('Is Not Empty', getDropDownDefault) +
        '</select>';
    return ddlFilter;
}
function createFilterUserInput(filterId, AdvanceColumnType) {
    var getFieldName = filterId.trim();
    var inputType = 'text';
    if ((AdvanceColumnType == 'datetime') || (AdvanceColumnType == 'date')) {
        inputType = 'date';
    } else if (AdvanceColumnType == 'numeric' || AdvanceColumnType == 'decimal' || AdvanceColumnType == 'float' || AdvanceColumnType == 'int' || AdvanceColumnType == 'bigint' || AdvanceColumnType == 'tinyint' || AdvanceColumnType == 'smallint') {
        inputType = 'number';
    }
    var getFilter = $('#dataColumnHolder #' + getFieldName).data('filter');
    // var getDefaultValue = $('#dataColumnHolder #' + getFieldName).data('filtervalue');
    // var userFilterInput = '';
    // if (getFilter != 'In Between') {
    userFilterInput = '<input type="' + inputType + '" id="inFl_' + getFieldName + '" value="" onchange="updateFilterValue(\'' + getFieldName + '\');" />';
    //} else {
    //     var userFilterInput = '<input type="' + inputType + '" id="inFl_' + getFieldName + '" value="" onchange="updateFilterValue(\'' + getFieldName + '\');" style="display:none;" />';
    // }

    return userFilterInput;
}

function createFilterUserInput_old(filterId, AdvanceColumnType) {
    var getFieldName = filterId.trim();
    var inputType = 'text';
    if ((AdvanceColumnType == 'datetime') || (AdvanceColumnType == 'date')) {
        inputType = 'date';
    } else if (AdvanceColumnType == 'numeric' || AdvanceColumnType == 'decimal' || AdvanceColumnType == 'float' || AdvanceColumnType == 'int' || AdvanceColumnType == 'bigint' || AdvanceColumnType == 'tinyint' || AdvanceColumnType == 'smallint') {
        inputType = 'number';
    }
    var getFilter = $('#dataColumnHolder #' + getFieldName).data('filter');
    var getDefaultValue = $('#dataColumnHolder #' + getFieldName).data('filtervalue');
    var userFilterInput = '';
    if (getFilter != 'In Between') {
        userFilterInput = '<input type="' + inputType + '" id="inFl_' + getFieldName + '" value="' + getDefaultValue + '" onchange="updateFilterValue(\'' + getFieldName + '\');" />';
    } else {
        var userFilterInput = '<input type="' + inputType + '" id="inFl_' + getFieldName + '" value="" onchange="updateFilterValue(\'' + getFieldName + '\');" style="display:none;" />';
    }

    return userFilterInput;
}

function createFilterUserInputSecond(filterId, AdvanceColumnType) {
    var getFieldName = filterId.trim();
    var inputType = 'text';
    if ((AdvanceColumnType == 'datetime') || (AdvanceColumnType == 'date')) {
        inputType = 'date';
    } else if (AdvanceColumnType == 'numeric' || AdvanceColumnType == 'decimal' || AdvanceColumnType == 'float' || AdvanceColumnType == 'int' || AdvanceColumnType == 'bigint' || AdvanceColumnType == 'tinyint' || AdvanceColumnType == 'smallint') {
        inputType = 'number';
    }
    var getFilter = $('#dataColumnHolder #' + getFieldName).data('filter');
    //var getDefaultValue = $('#dataColumnHolder #' + getFieldName).data('filtervalue');
    //var userFilterInput = '';
    // if (getFilter == 'In Between') {
    //     var breakDefaultValue = getDefaultValue.split('-');
    //   userFilterInput = '<input type="' + inputType + '" id="inFl1_' + getFieldName + '" class="inputInBetween" value="' + breakDefaultValue[0] + '" onchange="updateFilterValue(\'' + getFieldName + '\');" /><input type="text" id="inFl2_' + getFieldName + '" class="inputInBetween" value="' + breakDefaultValue[1] + '" onchange="updateFilterValue(\'' + getFieldName + '\');" />';
    // } else {
    userFilterInput = '<input type="' + inputType + '" id="inFl1_' + getFieldName + '" class="inputInBetween" value="" onchange="updateFilterValue(\'' + getFieldName + '\');" style="display:none;" /><input type="text" id="inFl2_' + getFieldName + '" class="inputInBetween" value="" onchange="updateFilterValue(\'' + getFieldName + '\');" style="display:none;" />';
    // }
    return userFilterInput;
}

function createFilterUserInputSecond_old(filterId, AdvanceColumnType) {
    var getFieldName = filterId.trim();
    var inputType = 'text';
    if ((AdvanceColumnType == 'datetime') || (AdvanceColumnType == 'date')) {
        inputType = 'date';
    } else if (AdvanceColumnType == 'numeric' || AdvanceColumnType == 'decimal' || AdvanceColumnType == 'float' || AdvanceColumnType == 'int' || AdvanceColumnType == 'bigint' || AdvanceColumnType == 'tinyint' || AdvanceColumnType == 'smallint') {
        inputType = 'number';
    }
    var getFilter = $('#dataColumnHolder #' + getFieldName).data('filter');
    var getDefaultValue = $('#dataColumnHolder #' + getFieldName).data('filtervalue');
    var userFilterInput = '';
    if (getFilter == 'In Between') {
        var breakDefaultValue = getDefaultValue.split('-');
        userFilterInput = '<input type="' + inputType + '" id="inFl1_' + getFieldName + '" class="inputInBetween" value="' + breakDefaultValue[0] + '" onchange="updateFilterValue(\'' + getFieldName + '\');" /><input type="text" id="inFl2_' + getFieldName + '" class="inputInBetween" value="' + breakDefaultValue[1] + '" onchange="updateFilterValue(\'' + getFieldName + '\');" />';
    } else {
        userFilterInput = '<input type="' + inputType + '" id="inFl1_' + getFieldName + '" class="inputInBetween" value="" onchange="updateFilterValue(\'' + getFieldName + '\');" style="display:none;" /><input type="text" id="inFl2_' + getFieldName + '" class="inputInBetween" value="" onchange="updateFilterValue(\'' + getFieldName + '\');" style="display:none;" />';
    }
    return userFilterInput;
}
