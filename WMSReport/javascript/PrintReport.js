var currentPageNo = 1;
var currentLayoutPage = 1;
var currentRowCount = 1;
var pageLoadCount = 0;
var recordLimit = 10;
var Pixel_Unit = 96;

var pageOrientation = 'PagePortrait';
var pageWidth = '8.5';
var pageHeight = '11';
var getPageWidthInPx = 0;
var getPageHeightInPx = 0;
var pageTitle = "SKU Report for Jan 2020 to March 2020";
var pageMarginLeft = "0.5";
var pageMarginTop = "0.5";
var pageMarginRight = "0.5";
var pageMarginBottom = "0.5";

var pageMarginLeftInPx = 0;
var pageMarginTopInPx = 0;
var pageMarginRightInPx = 0;
var pageMarginBottomInPx = 0;
var pageMarginStyle = '';
var getPageTitleHeight = 0;
var availableSpaceForContent = 0;
var availableSpaceWithoutTitle = 0;
var tableContentMarginTop = 20; 
var tableContentMarginBottom = 20;

$(document).ready(function () {
    setupPage();
});

function setupPage() {
    // GET DEFAULT PAGE SETUP VALUES
    pageWidth = $('#hdnPageWidth').val();
    pageHeight = $('#hdnPageHeight').val();
    pageMarginLeft = $('#hdnLeftMargin').val();
    pageMarginTop = $('#hdnTopMargin').val();
    pageMarginRight = $('#hdnRightMargin').val();
    pageMarginBottom = $('#hdnBottomMargin').val();

    pageMarginLeftInPx = inchToPixel(Number(pageMarginLeft));
    pageMarginTopInPx = inchToPixel(Number(pageMarginTop));
    pageMarginRightInPx = inchToPixel(Number(pageMarginRight));
    pageMarginBottomInPx = inchToPixel(Number(pageMarginBottom));

    var PageWidthAfterMargin = Number(pageWidth) - (Number(pageMarginLeft) + Number(pageMarginRight));
    var PageWidthHeightMargin = Number(pageHeight) - (Number(pageMarginTop) + Number(pageMarginBottom));
    getPageWidthInPx = inchToPixel(Number(PageWidthAfterMargin));
    getPageHeightInPx = inchToPixel(Number(PageWidthHeightMargin));

    pageMarginStyle = pageMarginTopInPx + 'px ' + pageMarginRightInPx + 'px ' + pageMarginBottomInPx + 'px ' + pageMarginLeftInPx + 'px';

    $('.previewPage').css('width', getPageWidthInPx + 'px');
    $('.previewPage').css('height', getPageHeightInPx + 'px');
    $('.previewPage').css('padding', pageMarginStyle);
    var getHeaderHeight = $('.reportHeader').outerHeight();
    var getFooterHeight = $('.reportFooter').outerHeight();
    $('#previewPageFooter_1').css('bottom', pageMarginBottomInPx + 'px');
    $('#previewPageFooter_1').css('width', getPageWidthInPx + 'px');
    getPageTitleHeight = $('.previewPageTitle').outerHeight();
    var totalFixedContentHeight = getHeaderHeight + getFooterHeight + getPageTitleHeight + tableContentMarginTop + tableContentMarginBottom;
    availableSpaceForContent = getPageHeightInPx - totalFixedContentHeight;
    availableSpaceWithoutTitle = (getPageHeightInPx - totalFixedContentHeight) + getPageTitleHeight;
   // alert(totalFixedContentHeight);
    callAPItoGetData();
}

function callAPItoGetData() {
    var getReportId = $('#hdnReportId').val();
    var getColumnWidth = $('#hdnColumnWidth').val();
    var getColumns = $('#hdnColumns').val();
    var getGroupBy = $("#hdnGroupBy").val();
    var groupByHeaderWidth = $("#hdnGroupByHeaderWidth").val();
    var getWhereFilterCondition = $("#hdnWhereFilterCondition").val();
    var setGroupByCondition = '';
    var getTotalPages = $("#hdnTotalPages").val();
    var isLastPage = 'no';
    if (currentPageNo == getTotalPages) {
        isLastPage = 'yes';
    }
   // $('#loadingCount').html(currentPageNo + " / " + getTotalPages);
    $.ajax({
        type: "POST",
        url: "../ReportDesigner/PrintReportPageData.ashx",
        data: {
            'rptid': getReportId,
            'col': getColumns,
            'limit': recordLimit,
            'pageno': currentPageNo,
            'colwidth': getColumnWidth,
            'groupby': getGroupBy,
            'groupbyheaderwidth': groupByHeaderWidth,
            'filtercondition': getWhereFilterCondition,
            'islastpage': isLastPage
        },
        beforeSend: function () {            
            showWMSThemeLoading();
        },
        success: function (data) {
            if (data.trim() != '') {
                $('#tblRecordHolder').append(data);
                $('#tblRecordHolder tr').each(function () {
                    var getHeaderHtml = '<tr id="headerRow_' + currentLayoutPage + '">' + $('#previewRow_1').html() + '</tr>';
                    var getMyHtml = '<tr id="previewRow_' + currentRowCount +'">' + $(this).html() + '</tr>';
                    $('#tblRecordHolder_' + currentLayoutPage).append(getMyHtml);
                    var getOuterContentHeight = $('#tblRecordHolder_' + currentLayoutPage).outerHeight();
                    var finalAvailableHeight = availableSpaceWithoutTitle;
                    if (currentLayoutPage == 1) {
                        finalAvailableHeight = availableSpaceForContent;
                    }
                    if (getOuterContentHeight > finalAvailableHeight) {
                        $('#previewRow_' + currentRowCount).remove();
                        currentLayoutPage = currentLayoutPage + 1;
                        var insertPage = '<div class="previewPage" id="previewPage_' + currentLayoutPage + '" style="width:' + getPageWidthInPx + 'px;height:' + getPageHeightInPx + 'px;padding:' + pageMarginStyle + ';">' +
                            '<div id="previewPageHeader_' + currentLayoutPage + '" class="previewPageHeader">' + $('#previewPageHeader_1').html() +'</div>' + 
                            '<div id="previewPageContent_' + currentLayoutPage + '" class="previewPageContent">' +
                            '<div id="previewTable_' + currentLayoutPage + '" class="previewTable">' +
                            '<table cellpadding="1" cellspacing="1" border="0" id="tblRecordHolder_' + currentLayoutPage + '" style="margin-top:' + tableContentMarginTop +'px;">' + getHeaderHtml + getMyHtml +
                            '</table>' + 
                            '</div>' + 
                            '</div>' + 
                            '<div id="previewPageFooter_' + currentLayoutPage + '" class="previewPageFooter" style="width:' + getPageWidthInPx +'px;bottom:' + pageMarginBottomInPx +'px;">' + $('#previewPageFooter_1').html() +'</div>' + 
                            '</div>';
                        ;
                        $('#previewPageFooter_' + currentLayoutPage).html($('#previewPageFooter_' + (currentLayoutPage - 1)).html());
                        $('#previewReportPageHolder').append(insertPage);
                    }
                    currentRowCount = currentRowCount + 1;
                    document.title = getOuterContentHeight;

                    var getDataLoadedInPercent = Math.round((currentPageNo * 100) / getTotalPages);
                    $('#divCurrentProgress').css('width', getDataLoadedInPercent + 'px');
                    $('#loadingCount').html(getDataLoadedInPercent + "%");
                   // alert(getMyHtml);                   
                });
                $('#tblRecordHolder').html('');
                if (currentPageNo < getTotalPages) {
                    currentPageNo = currentPageNo + 1;
                     callAPItoGetData();
                } else {
                    $('#divPageContentLoader').hide();
                    window.print();
                }
            }
            hideWMSThemeLoading();
        }
    });
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

function showWMSThemeLoading() {
    document.title = 'Loading...';
}

function hideWMSThemeLoading() {
    document.title = 'Done...';
}