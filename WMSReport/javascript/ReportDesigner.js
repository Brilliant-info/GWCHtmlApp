var stringDataType = ['char', 'varchar', 'text', 'nchar', 'nvarchar', 'ntext', 'binary', 'varbinary', 'image'];
var numberDataType = ['bit', 'tinyint', 'smallint', 'int', 'bigint', 'decimal', 'numeric', 'float', 'smallmoney', 'money', 'real'];
var dateTimeDataType = ['datetime', 'datetime2', 'smalldatetime', 'date', 'time', 'datetimeoffset', 'timestamp'];
var queryNumericOperators = ['=', '<', '<=', '>', '>='];
var queryStringOperators = ['LIKE', 'NOT LIKE'];

var reportQuery = "";
var rptSection = 'Warehouse';
var rptHeaderObj = 'header-template-style-1';
var rptFooterObj = 'footer-template-style-1';
var rptHeaderLayoutHtml = '';
var rptFooterLayoutHtml = '';
var rptDateFormat = '';
var rptTimeFormat = '';
var Pixel_Unit = 100;
var CM_Unit = 2.54;
var pageOrientation = 'PagePortrait';
var pageWidth = 8.5;
var pageHeight = 11;
var pageTitle = "";
var pageDescription = "";
var pageMarginLeft = "0.75";
var pageMarginTop = "0.75";
var pageMarginRight = "0.75";
var pageMarginBottom = "0.75";
/* ======================= Header Style =======================  */
var rptH_CompanyName = '';
var rptH_CompanyAddressLine1 = '';
var rptH_CompanyAddressLine2 = '';
var rptH_CompanyContact1 = '';
var rptH_CompanyContact2 = '';
/* ======================= Header Style =======================  */
var reportColumns = [];
var reportDetailColumn = '';
var reportDetailColWidth = 0;
var currentExePageNo = 1;
var finalPreviewWidth = 0;
var totalPageNo = 0;
var groupByItem = '';
$(document).ready(function () {
    app_report_init();
    loadReport();
});
$(window).resize(function(){
  loadCanvasHolder();
});


function loadReport() {
    var getReportId = $('#hdnReportID').val();
    if ((getReportId != '0' || getReportId != '')) {
        var getReportObject = $('#hdnSelQuery').val();
        if (getReportObject != '') {
            // Setup Page Orientation
            var getPageOrientation = $('#hdnpageOrientation').val();
            $('.rptPageOpt').removeClass('activePageOpt');
            $('.rptPageOpt').each(function () {
                var getPageType = $(this).data('value');
                if (getPageOrientation == '1') {
                    if (getPageType == 'PageLandscape') {
                        $(this).addClass('activePageOpt');
                    }
                } else {
                    if (getPageType == 'PagePortrait') {
                        $(this).addClass('activePageOpt');
                    }
                }
            });

            // Setup Header 
            var getPageHeader = $('#hdnReportHeader').val();
            $('.rptHeaderOpt').removeClass('activeHeader');
            $('.rptHeaderOpt').each(function () {
                var getHeaderTemplate = $(this).data('value');
                if (getHeaderTemplate == getPageHeader) {
                    $(this).addClass('activeHeader');
                    rptHeaderObj = getPageHeader;
                }
            });
            // Setup Footer
            var getPageFooter = $('#hdnReportFooter').val();
            $('.rptFooterOpt ').removeClass('activeFooter');
            $('.rptFooterOpt').each(function () {
                var getFooterTemplate = $(this).data('value');
                if (getFooterTemplate == getPageFooter) {
                    $(this).addClass('activeFooter');
                    rptFooterObj = getFooterTemplate;
                }
            });
            loadHeaderObject(rptHeaderObj);
            loadFooterObject(rptFooterObj);
            $('#dataObjectHolder').val(getReportObject);
            callAPItoGetObjectColumn(getReportObject);

            // Setup Date Type
            var getDateFormat = $('#hdnDateFormat').val();
            $('.rptRadioDateGroup input').each(function () {
                var getRadioDate = $(this).val();
                if (getRadioDate == getDateFormat) {
                    if ($(this).is(':checked') === false) {
                        $(this).prop('checked', true);
                    }
                }
            });

            // Setup Time Format
            var getTimeFormat = $('#hdnTimeFormat').val();
            $('.rptRadioTimeGroup input').each(function () {
                var getRadioTime = $(this).val();
                if (getRadioTime == getTimeFormat) {
                    if ($(this).is(':checked') === false) {
                        $(this).prop('checked', true);
                    }
                }
            });
            // Setup Icon for Report
            var getReportIcon = $('#hdnReporticon').val();
            $('#rptFrmReportIconPreview').attr('class', getReportIcon);
        }        
    }
}

function loadDefaultValues() {
    // Section 
    rptSection = 'Warehouse';

    // Header and Footer
    rptHeaderObj = 'header-template-style-1';
    rptFooterObj = 'footer-template-style-1';

    //Load Company Details 
    rptH_CompanyName = 'Brilliant Info Systems Pvt. Ltd. ';
    rptH_CompanyAddressLine1 = '6, 3rd Floor, Punit-Yash-Arcade, Opp, Hotel Konkan Express,';
    rptH_CompanyAddressLine2 = 'Near Kothrud Bus Stand, Kothrud, Pune – 411038, Maharashtra India.';
    rptH_CompanyContact1 = '+91-9146232773';
    rptH_CompanyContact2 = '+91-7218370532';

    // Page Setup
    pageOrientation = 'PagePortrait';
    pageWidth = 8.5;
    pageHeight = 11;
    pageTitle = "SKU Report for Jan 2020 to March 2020";
    pageDescription = "This report shows SKU details for period Jan 2020 to March 2020";
    pageMarginLeft = 0.75;
    pageMarginTop = 1.00;
    pageMarginRight = 0.75;
    pageMarginBottom = 0.75;
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
	$('#rptCanvasHeader').css('top', getPageMarginTopInPx + 'px');
	$('#rptCanvasHeader').css('left', getPageMarginLeftInPx + 'px');
    $('.reportFooter').css('width', getPageFooterWidth + 'px');
	$('#rptCanvasFooter').css('left', getPageMarginLeftInPx + 'px');
	$('#rptCanvasFooter').css('bottom', getPageMarginBottomInPx + 'px');
    // alert('hi');
    var getHeaderHeight = $('.reportHeader').outerHeight();
    var getFooterHeight = $('.reportFooter').outerHeight();
    var getContentAvailableSpace = getPageHeightInPx - (getHeaderHeight + getFooterHeight + getPageMarginTopInPx + getPageMarginBottomInPx);
    $('.rptCanvasContent').css('top', (getHeaderHeight + getPageMarginTopInPx) + 'px');
    $('.rptCanvasContent').css('height', getContentAvailableSpace + 'px');
	$('.reportPageTitle').css('margin-left', getPageMarginLeftInPx + 'px');
	$('.reportPageTitle').css('margin-right', getPageMarginRightInPx + 'px');
    var getReportTitleHeight = $('.reportPageTitle').outerHeight();

    var getAvailableHeightForTable = getContentAvailableSpace - (getReportTitleHeight + getPageMarginTopInPx + getPageMarginBottomInPx + 1);
	
	var getAvailableWidthForTable = getPageWidthInPx - (getPageMarginLeftInPx + getPageMarginRightInPx + 1);
    generateReportTable(getAvailableHeightForTable, getAvailableWidthForTable, getPageMarginLeftInPx, getPageMarginRightInPx);
}

function callAPItoGetObjectColumn(sqlTableName) {
    var getResourceId = $('#hdnReportID').val();
    if (sqlTableName != '') {
        // $('#hdnObjectName').val(sqlTableName);
        // $('#winQueryHeader').html(sqlTableName);
        // buildSQLQuery();
        $('#dataColumnHolder').empty();

        $.ajax({
            type: "POST",
            url: "../ReportDesigner/getReportColumns.ashx",
            data: { 'objname': sqlTableName, 'rptid': getResourceId  },
            beforeSend: function () {
                showWMSThemeLoading();
            },
            success: function (data) {
               //  alert(data);
                if (data.trim() != '') {
                //    alert(data);
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

function addQueryColumns(dataLabel, dataType, isSelected, forumla, isDetailColumn, getAdvanceFilter, getAdvanceFilterValue, getAdvanceFilterTypeControl) {
	// alert(isDetailColumn);
	var activeAdvanceSearchClass = 'rptBtnAdvanceSearch';
    var activeSummationClass = 'rptBtnSummation';
    var activeDetailClass = 'rptBtnDetail';
	var isAdvanceSearchSelected = 'no';
    var isInputChecked = '';
    var parentColumnClass = '';
    var btnSummation = '';
	var btnAdvanceSearch = '';
    if (isSelected == 'yes') {
        parentColumnClass = 'rptColumnOpt activeColumn';
        isInputChecked = 'checked';
    } else {
        parentColumnClass = 'rptColumnOpt';
        isInputChecked = '';
    }
    if (forumla == 'SUM') {
        activeSummationClass = 'rptBtnSummation activeSummation';
    }
    if (isDetailColumn == 'yes') {
        activeDetailClass = 'rptBtnDetail activeDetail';
    }
    if (dataType == 'numeric' || dataType == 'decimal' || dataType == 'float' || dataType == 'int' || dataType == 'bigint' || dataType == 'tinyint' || dataType == 'smallint') {
        btnSummation = '<div class="' + activeSummationClass + '" data-isactive="' + isSelected +'"><i class="fas fa-calculator"></i></div>';
    }
	if(getAdvanceFilter != ''){
		activeAdvanceSearchClass = 'rptBtnAdvanceSearch activeAdvanceSearch';
		isAdvanceSearchSelected = 'yes';
	}
	
	btnAdvanceSearch = '<div class="' + activeAdvanceSearchClass + '" data-isactive="' + isAdvanceSearchSelected +'"><i class="fas fa-filter"></i></div>';
	
    // $('#dataColumnHolder').append('<div class="rptColumnOpt" id="' + dataLabel + '" data-title="' + dataLabel + '" data-type="' + dataType + '" data-value="' + dataLabel + '"><input type="checkbox" selected="selected" name="rptColumn1" value="' + dataLabel + '" /> ' + dataLabel + '<div class="rptBtnSummation"><i class="fas fa-calculator"></i></div></div>');
    $('#dataColumnHolder').append('<div class="' + parentColumnClass + '" id="' + dataLabel + '" data-title="' + dataLabel + '" data-type="' + dataType + '" data-value="' + dataLabel + '" data-displayname="' + dataLabel + '" data-filter="" data-filtervalue="" data-advfilter="'+ getAdvanceFilter +'" data-advfiltervalue="'+ getAdvanceFilterValue +'" data-advfilterctrltype="'+ getAdvanceFilterTypeControl +'"><input type="checkbox" ' + isInputChecked + ' name="rptColumn1" value="' + dataLabel + '" /> <a href="#" class="dataColumnLabelLink" title="' + dataLabel + '" alt="' + dataLabel + '">' + dataLabel + '<span class="rptColumnToolTip">' + dataLabel + '</span></a><div class="' + activeDetailClass + '" data-isdetailcolumn="' + isDetailColumn + '"><i class="fas fa-search"></i></div>' + btnAdvanceSearch + btnSummation + '</div>');
    // $('#dataFilterColumnHolder').append('<div class="rptColumnOpt" id="fl' + dataLabel + '" data-title="' + dataLabel + '" data-type="' + dataType + '" data-value="' + dataLabel + '"><i class="fas fa-filter"></i> ' + dataLabel + '</div>');    
}

function openAdvanceFilterPopup(columnName, getPageX, getPageY){
	$('#rptAdvFilterCurrentColumn').val(columnName);
	$('#winAdvanceFilterTitle .rptAdvFilterSpnTitle').html('Advance Title:' + columnName);
	generateAdvFilterControlType(columnName);
	var isAdvFilterActive = $('#' + columnName + ' .rptBtnAdvanceSearch').data('isactive');
	if(isAdvFilterActive == 'yes'){	
		var getAdvFilter = $('#' + columnName).data('advfilter');
		var getAdvFilterValue = $('#' + columnName).data('advfiltervalue');
		var getAdvFilterCtrlType = $('#' + columnName).data('advfilterctrltype');
		$('#winAdvanceFilterSelect').val(getAdvFilter);
		$('#winAdvanceFilterCtrlType').val(getAdvFilterCtrlType);
		
		showAdvControlByType();
		if(getAdvFilterCtrlType == 'RangeInput'){
			var getInBetweenVal = getAdvFilterValue.split('-');
			if(getInBetweenVal[0] == 'na'){
				getInBetweenVal[0] = '';
			}
			if(getInBetweenVal[1] == 'na'){
				getInBetweenVal[1] = '';
			}
			$('#winAdvanceFilterDefaultValueA').val(getInBetweenVal[0]);
			$('#winAdvanceFilterDefaultValueB').val(getInBetweenVal[1]);
			$('#winAdvanceFilterDefaultValue').val('');
		}else{
			if(getAdvFilterValue == 'na'){
				getAdvFilterValue = '';
			}
			$('#winAdvanceFilterDefaultValueA').val('');
			$('#winAdvanceFilterDefaultValueB').val('');
			$('#winAdvanceFilterDefaultValue').val(getAdvFilterValue);
		}		
	}else{
		$('.rptPopupFrmCtrlSingle').show();
		$('.rptPopupFrmCtrlInBetween').hide();
	}	
	$('#rptAdavanceFilterPopup').show();
	var getAdvFilterPopupHeight = $('#rptAdavanceFilterPopup').outerHeight();
	var getAdvFilterPopupWidth = $('#rptAdavanceFilterPopup').outerWidth();
	var menuHeight = $('#' + columnName).height();
	// var popupY = getPageY - (getAdvFilterPopupHeight - menuHeight);
	var popupY = getPageY - menuHeight;
	var popupX = popupX + getPageX;
	var winHeight = ($(window).height() - getAdvFilterPopupHeight) - 10;
	if(popupY < 10){
		popupY = 10;
	}else if(popupY > winHeight){
		popupY = winHeight;
	}
	 $('#rptAdavanceFilterPopup').css('top', popupY + 'px');
	 $('#rptAdavanceFilterPopup').css('left', getPageX + 'px');
}

function showAdvControlByType(){
	var ctrlValue = $('#winAdvanceFilterCtrlType').val();
	if(ctrlValue == 'RangeInput'){
		$('.rptPopupFrmCtrlSingle').hide();
		$('.rptPopupFrmCtrlInBetween').show();
	}else{
		$('.rptPopupFrmCtrlSingle').show();
		$('.rptPopupFrmCtrlInBetween').hide();
	}
}

function generateAdvFilterControlType(columnName){
	var dataType = $('#' + columnName).data('type');
	var listOption = '<option value="SingleInput">Single Input</option>' +
                '<option value="DropDownList">DropDown List</option>';
	  if (dataType == 'numeric' || dataType == 'decimal' || dataType == 'float' || dataType == 'int' || dataType == 'bigint' || dataType == 'tinyint' || dataType == 'smallint' || dataType == 'datetime') {
		 listOption += '<option value="RangeInput">Range Input</option>'; 
	  }
	  $('#winAdvanceFilterCtrlType').html(listOption);
}

function closeAdvanceFilterPopup(){
	/* var getAdvFilterCol = $('#rptAdvFilterCurrentColumn').val();
	var getAdvFilter = $('#winAdvanceFilterSelect').val();
	var getAdvFilterValue = $('#winAdvanceFilterDefaultValue').val();
	if((getAdvFilter == '') && (getAdvFilterValue == '')){
		$('#' + getAdvFilterCol).data('advfilter', '');
		$('#' + getAdvFilterCol).data('advfiltervalue', '');
		$('#' + getAdvFilterCol + ' .rptBtnAdvanceSearch').removeClass('activeAdvanceSearch');
		$('#' + getAdvFilterCol + ' .rptBtnAdvanceSearch').data('isactive', 'no');
	} */
	$('#winAdvanceFilterSelect').val('');
	$('#winAdvanceFilterDefaultValue').val('');
	$('#winAdvanceFilterDefaultValueA').val(''); 
	$('#winAdvanceFilterDefaultValueB').val('');
	$('#rptAdavanceFilterPopup').hide();
}

function saveAdvanceFilter(){
	var getAdvFilterCol = $('#rptAdvFilterCurrentColumn').val();
	var getAdvFilter = $('#winAdvanceFilterSelect').val();
	var getAdvFilterValue = $('#winAdvanceFilterDefaultValue').val();
	var getAdvFilterValueA = $('#winAdvanceFilterDefaultValueA').val();
	var getAdvFilterValueB = $('#winAdvanceFilterDefaultValueB').val();
	var getAdvFilterCtrlType = $('#winAdvanceFilterCtrlType').val();
	
	if(getAdvFilterCtrlType == 'RangeInput'){
		getAdvFilterValue = getAdvFilterValueA + "-" + getAdvFilterValueB;
	}
	
	//alert(getAdvFilterCol + " : " + getAdvFilter + " : " + getAdvFilterValue);
	if(getAdvFilter != '' && getAdvFilterCtrlType != ''){
		if(getAdvFilterValue == ''){
			getAdvFilterValue = 'na';
		}else if(getAdvFilterValue == '-'){
			getAdvFilterValue = 'na-na';
		}
		$('#' + getAdvFilterCol + ' .rptBtnAdvanceSearch').data('isactive', 'yes');
		$('#' + getAdvFilterCol + ' .rptBtnAdvanceSearch').addClass('activeAdvanceSearch');		
		$('#' + getAdvFilterCol).data('advfilter', getAdvFilter);
		$('#' + getAdvFilterCol).data('advfiltervalue', getAdvFilterValue);
		$('#' + getAdvFilterCol).data('advfilterctrltype', getAdvFilterCtrlType);		
		closeAdvanceFilterPopup();
	}else{
		if(getAdvFilter == ''){
			alert('Please select filter!!');
		}else if(getAdvFilterCtrlType == ''){
			alert('Please select input type!!');
		}
		
	}
}

function removeAdvanceFilter(){
	var getAdvFilterCol = $('#rptAdvFilterCurrentColumn').val();
	$('#' + getAdvFilterCol + ' .rptBtnAdvanceSearch').data('isactive', 'no');
	$('#' + getAdvFilterCol + ' .rptBtnAdvanceSearch').removeClass('activeAdvanceSearch');		
	$('#' + getAdvFilterCol).data('advfilter', '');
	$('#' + getAdvFilterCol).data('advfiltervalue', '');
	closeAdvanceFilterPopup();
}

function getSqlSelectedColumns() {
    var selectedColumns = '';
    var sqlArrLen = $('.rptColumnOpt').length;
    var sqlSelectedColumn = $('#dataColumnHolder input[type=checkbox]').filter(":checked").length;
    if (sqlSelectedColumn > 0) {
        var qbCnt = 0;
        $('.rptColumnOpt').each(function () {
            var getColumnId = $(this).attr('id');
            var isQueryCheckboxChecked = $('#' + getColumnId + ' input[type=checkbox]').prop('checked');
            if (isQueryCheckboxChecked) {
                // var modifiedSqlColName = $('#' + getColumnId + ' input[type=text]').val();
                var originalSqlColName = $('#' + getColumnId + ' input[type=checkbox]').val();
                var finalSqlColName = originalSqlColName;

                //if (modifiedSqlColName.trim() != originalSqlColName.trim()) {
                //    finalSqlColName = originalSqlColName + ' AS ' + modifiedSqlColName;
                //}

                if (qbCnt == 0) {
                    selectedColumns += finalSqlColName;
                } else {
                    selectedColumns += ', ' + finalSqlColName;
                }
                qbCnt = qbCnt + 1;
            }
        });
    } else {
        //  selectedColumns = '*';
    }
    return selectedColumns;
}

function loadReportColumns(result, sqlTableName) {
    //   $('#dataColumnHolder').html('');
    var reportColumns = [];
    var arrSqlColumns = result.split("|");
    for (rc = 0; rc <= (arrSqlColumns.length - 1); rc++) {
        var arrColumnDetails = arrSqlColumns[rc].split(":");
        var getColumnName = arrColumnDetails[0];
        var getDataType = arrColumnDetails[1];
        var getIsSelected = arrColumnDetails[2];
        var getForumla = arrColumnDetails[3];
        var getIsDetailColumn = arrColumnDetails[4];
		var getAdvanceFilter = arrColumnDetails[5];
		var getAdvanceFilterValue = arrColumnDetails[6];
		var getAdvanceFilterTypeControl = arrColumnDetails[7];
        addQueryColumns(getColumnName, getDataType, getIsSelected, getForumla, getIsDetailColumn, getAdvanceFilter, getAdvanceFilterValue, getAdvanceFilterTypeControl);
    }
	$('.winAdvanceFilterSubmit').click(function (e) {
        saveAdvanceFilter();
        return false;
    });
	$('.winRemoveAdvanceFilter').click(function (e) {
        removeAdvanceFilter();
        return false;
    });
	$('.rptBtnAdvanceSearch').click(function (e) {
           /*  var isActive = $(this).data('isactive');
            if (isActive == 'no') {
                $(this).data('isactive', 'yes');
                $(this).addClass('activeAdvanceSearch');
				var getAdvtFilterColumnName = $(this).parent().data('value');
				openAdvanceFilterPopup(getAdvtFilterColumnName);
            } else {
                $(this).data('isactive', 'no');
				$(this).parent().data('advfilter','');
				$(this).parent().data('advfiltervalue','');
                $(this).removeClass('activeAdvanceSearch'); 
				closeAdvanceFilterPopup();
            }
            adjustReportDesign(); */
		var getPageX = e.pageX;
		var getPageY = e.pageY;
		var getAdvtFilterColumnName = $(this).parent().data('value');
		openAdvanceFilterPopup(getAdvtFilterColumnName, getPageX, getPageY);
        return false;
    });
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
    $('.rptBtnDetail').click(function (e) {
        var isActive = $(this).data('isdetailcolumn');
        if (isActive == 'no') {
            // Reset All....
            $('.rptBtnDetail').removeClass('activeDetail');
            $('.rptBtnDetail').data('isdetailcolumn', 'no');
            // Reset All....
            $(this).data('isdetailcolumn', 'yes');
            $(this).addClass('activeDetail');
			reportDetailColWidth = 80;
            reportDetailColumn = $(this).parent().data('value');            
            //alert(rptBtnDetail);
        } else {
            $(this).data('isdetailcolumn', 'no');
            $(this).removeClass('activeDetail');
			reportDetailColWidth = 0;
            reportDetailColumn = '';
        }
        $('#hdnDetailActionColumn').val(reportDetailColumn);
        adjustReportDesign();
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
    // showPropertyWindow('rptWinQuery', 'rptWinColumns');
    adjustReportDesign();
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
    //$('#dataObjectHolder').html('');
    //addQueryObjects('V_WMS_LocationObj');
    //addQueryObjects('V_WMS_UserObj');
    //addQueryObjects('V_WMS_SkuObj');
    //addQueryObjects('V_WMS_InboundObj');

    $('#dataObjectHolder').change(function (e) {
        resetQueryVariables();
        sqlTableName = $(this).val();
        callAPItoGetObjectColumn(sqlTableName, 'na');
        $("#hdnSelQuery").val(sqlTableName);        
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

function generateReportTable(getAvailableHeightForTable, getPageWidthInPx, getPageMarginLeftInPx, getPageMarginRightInPx) {
    var getNumOfColumn = 0;
    var getRowCount = 0;
    // var getDetailTemplate = $('#rpcxDetailedReportType').val();   
    var getColumns = getSqlSelectedColumns();
    reportColumns = getColumns.split(',');
    getNumOfColumn = reportColumns.length;
    $('.reportTable').html('');
	$('.reportTable').css('margin-left', getPageMarginLeftInPx + 'px');
	$('.reportTable').css('margin-right', getPageMarginRightInPx + 'px');
    if ((getNumOfColumn > 0) && (getColumns.trim() != '')) {
        var widthDistribution = 0;
        if (reportDetailColumn != '') {
            widthDistribution = ((getPageWidthInPx - (reportDetailColWidth + 2)) - getNumOfColumn) / getNumOfColumn;
        } else {
            widthDistribution = (getPageWidthInPx - getNumOfColumn) / getNumOfColumn;
        }
        
        // Report Header Cell... 
        /// alert(getNumOfColumn);
        if (reportDetailColumn != '') {
            $('.reportTable').append('<div class="reportHeaderCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportHeaderContent btnViewDetailsHolder" data-value="Detail" contenteditable="true">Detail</div></div>');
        }
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
            if (reportDetailColumn != '') {
                rowStr = rowStr + '<div class="reportRowCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportRowContent btnViewDetailsHolder"><a href="#" class="btnViewDetails"><i class="fas fa-search"></i></a></div></div>';
            }
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
			if (reportDetailColumn != '') {
				$('.reportTable').append('<div class="reportSummationCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportSummationContent">-</div></div>');
            }
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
		/* Adjust Cell Height  */
		//alert('Hi...');
		$(".reportRowCell").each(function () {
			var parentRowHeight = $(this).parent().height();
			$(this).css('height', parentRowHeight + 'px');
		});
		/* Adjust Cell Height  */
    }
}

function getSummationColumns() {
    // Summation Row
    var getNumOfColumn = 0;
    var getRowCount = 0;

    var getColumns = getSqlSelectedColumns();
    ///alert(getColumns);
    reportColumns = getColumns.split(',');
    getNumOfColumn = reportColumns.length;
    var summationColList = '';
    //var sumColLen = $('#dataColumnHolder .activeSummation').length;
   var sumColLen = reportColumns.length;
    if (sumColLen > 0) {
        for (var sm = 0; sm < getNumOfColumn; sm++) {
            var summationHtml = '-';
            var colName = reportColumns[sm].trim();
            var isColumnHaveSummation = $('#dataColumnHolder #' + colName).find('.rptBtnSummation').hasClass('activeSummation');
           // if (isColumnHaveSummation) {
                // summationHtml = '<b> = SUM </b>';
                if (summationColList == '') {
                    summationColList += reportColumns[sm] + ':' + isColumnHaveSummation;
                } else {
                    summationColList += '|' + reportColumns[sm] + ':' + isColumnHaveSummation;
                }
            // }
        //    $('.reportTable').append('<div class="reportSummationCell" style="width:' + widthDistribution + 'px;"><div class="reportSummationContent" data-value="' + reportColumns[sm] + '">' + summationHtml + '</div></div>');
        }
    }
    return summationColList;
        // Summation Row
}

function generatePreviewTable(getAvailableHeightForTable, getPageWidthInPx, runMode) {
    var getNumOfColumn = 0;
    var getRowCount = 0;
    var getColumns = getSqlSelectedColumns();
    reportColumns = getColumns.split(',');
    getNumOfColumn = reportColumns.length;
   // var getDetailTemplate = $('#rpcxDetailedReportType').val();
    $('.previewTable').html('');
    if ((getNumOfColumn > 0) && (getColumns.trim() != '')) {
        var widthDistribution = 0;
        if (reportDetailColumn != '') {
            widthDistribution = ((getPageWidthInPx - (reportDetailColWidth + 2)) - getNumOfColumn) / getNumOfColumn;
        } else {
            widthDistribution = (getPageWidthInPx - getNumOfColumn) / getNumOfColumn;
        }

        // Group By Row
        if (runMode == 'execute') {
            var rowGroupByWidth = widthDistribution * getNumOfColumn;
            if (reportDetailColumn != '') {
                rowGroupByWidth = rowGroupByWidth + reportDetailColWidth;
            }
            //$('.previewTable').append('<div class="reportRow"><div class="reportGroupByCell" id="reportGroupByCell" style="width:' + rowGroupByWidth + 'px;"><div class="reportGroupByContent" data-value=""><b>Drag a column header here to group by that column.</b></div></div></div>');
			$('.previewTable').append('<div class="reportRowGroupBy"><div class="reportGroupByCell" id="reportGroupByCell" style="width:' + rowGroupByWidth + 'px;"><div class="reportGroupByContent" data-value=""><b>Drag a column header here to group by that column.</b></div></div></div>');
        }

        // Header Row
		var strHeaderRow = '<div class="reportHeaderRow">';
        if (reportDetailColumn != '') {
            strHeaderRow += '<div class="reportHeaderCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportHeaderContent btnViewDetailsHolder" data-value="Detail">Detail</div></div>';
        }
        for (var cl = 0; cl < getNumOfColumn; cl++) {
            strHeaderRow += '<div class="reportHeaderCell" style="width:' + widthDistribution + 'px;"><div class="reportHeaderContent" data-value="' + reportColumns[cl] + '">' + reportColumns[cl] + '</div></div>';
        }
		strHeaderRow += '</div>';
		 $('.previewTable').append(strHeaderRow);
		
        if (runMode == 'execute') {
            // Filter Row
			var strFilterRow = '<div class="reportFilterRow">';
            if (reportDetailColumn != '') {
                strFilterRow += '<div class="reportFilterCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportFilterContent"> </div></div>';
            }
            for (var fl = 0; fl < getNumOfColumn; fl++) {
                strFilterRow += '<div class="reportFilterCell" style="width:' + widthDistribution + 'px;"><div class="reportFilterContent" data-value="' + reportColumns[fl] + '">' + createFilterDropDown(reportColumns[fl].trim()) + createFilterUserInput(reportColumns[fl].trim()) + '</div></div>';
            }
			strFilterRow += '</div>';
			$('.previewTable').append(strFilterRow);
        }
        var getReportTableHeight = $('.reportTableHeight').height();
        var r = 0;
        // while ($('.previewTable').height() < getAvailableHeightForTable) {
		// alert(getAvailableHeightForTable);
		/* while($('.previewPageContent').outerHeight() < (getAvailableHeightForTable - 40)){
        // while (r < 10) {
            var rowStr = '<div class="reportRow">';
            if (reportDetailColumn != '') {
                rowStr = rowStr + '<div class="reportRowCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportRowContent btnViewDetailsHolder"><a href="#" class="btnViewDetails" onclick="openDetailReport(0);"><i class="fas fa-search"></i></a></div></div>';
            }
            for (var rcl = 0; rcl < getNumOfColumn; rcl++) {
                rowStr = rowStr + '<div class="reportRowCell" style="width:' + widthDistribution + 'px;"><div class="reportRowContent">#VALUE(' + reportColumns[rcl] + ')</div></div>';
            }
            rowStr = rowStr + '</div>';
            $('.previewTable').append(rowStr);
            r = r + 1;
        } */
		
		
        // Summation Row
       /* var sumColLen = $('#dataColumnHolder .activeSummation').length;
        if (sumColLen > 0) {
			var strSummationRow = '<div class="reportSummationRow">';
            if (reportDetailColumn != '') {
                strSummationRow += '<div class="reportSummationCell" style="width:' + reportDetailColWidth + 'px;"><div class="reportSummationContent btnViewDetailsHolder">-</div></div>';
            }
            for (var sm = 0; sm < getNumOfColumn; sm++) {
                var summationHtml = '-';
                var colName = reportColumns[sm].trim();
                var isColumnHaveSummation = $('#dataColumnHolder #' + colName).find('.rptBtnSummation').hasClass('activeSummation');
                if (isColumnHaveSummation) {
                    summationHtml = '<b> = SUM </b>';
                }
                strSummationRow += '<div class="reportSummationCell" style="width:' + widthDistribution + 'px;"><div class="reportSummationContent" data-value="' + reportColumns[sm] + '">' + summationHtml + '</div></div>';
            }
			$('.previewTable').append(strSummationRow);
        } */
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
                    currentExePageNo = 1;
                    callPreviewAPItoGetData();
                }
            });				
        }else{
			groupByItem = '';
		}
		totalPageNo = 0;
		currentExePageNo = 1;
		finalPreviewWidth = widthDistribution;	
		callPreviewAPItoGetData();
		/* Adjust Cell Height  */
		//alert('Hi...');
		$(".reportRowCell").each(function () {
			var parentRowHeight = $(this).parent().height();
			$(this).css('height', parentRowHeight + 'px');
		});
		/* Adjust Cell Height  */
		
    }
}
function removeGroupBy() {
    $(".reportGroupByContent").data('value','');
    $(".reportGroupByContent").html('<b>Drag a column header here to group by that column.</b>');
}

function loadDefaults() {
	reportDetailColumn = $('#hdnDetailActionColumn').val();
	if(reportDetailColumn != ''){
		reportDetailColWidth = 80;
	}else{
		reportDetailColWidth = 0;
	}
	
	
}

function generateReportPreview(runMode) {
    $('body').css('overflow', 'hidden');
    $('.previewReportPanel').show();
    var getCanvasHeader = $('#rptCanvasHeader').html();
    $('.previewPageHeader').html(getCanvasHeader);
    var getCanvasFooter = $('#rptCanvasFooter').html();
    $('.previewPageFooter').html(getCanvasFooter);
	if(runMode == 'execute'){
		$('.reportPreviewNavControls').css('visibility','visible');
	}else{
		$('.reportPreviewNavControls').css('visibility','hidden');
	}
	
	/*  NEW CODE FOR PREVIEW */
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
	/*  NEW CODE FOR PREVIEW */

    // var getPageWidthInPx = pageWidth * Pixel_Unit;
    // var getPageHeightInPx = pageHeight * Pixel_Unit;
    $('.previewPage').css('width', getPageWidthInPx + 'px');
    $('.previewPage').css('height', getPageHeightInPx + 'px');

    $('.previewPageHeader').css('width', getPageHeaderWidth + 'px');
	$('.previewPageHeader').css('top', getPageMarginTopInPx + 'px');
	$('.previewPageHeader').css('left', getPageMarginLeftInPx + 'px');
	
    $('.previewPageFooter').css('width', getPageFooterWidth + 'px');
	$('.previewPageFooter').css('left', getPageMarginLeftInPx + 'px');
	$('.previewPageFooter').css('bottom', getPageMarginBottomInPx + 'px');
	
    var getHeaderHeight = $('.previewPageHeader').outerHeight();
    var getFooterHeight = $('.previewPageFooter').outerHeight();
    //alert(getHeaderHeight+ " : " + getFooterHeight);

   // var getContentAvailableSpace = getPageHeightInPx - (getHeaderHeight + getFooterHeight);
   var getContentAvailableSpace = getPageHeightInPx - (getHeaderHeight + getFooterHeight + getPageMarginTopInPx + getPageMarginBottomInPx);
   
   var getAvailableWidthForTable = getPageWidthInPx - (getPageMarginLeftInPx + getPageMarginRightInPx + 1);
   
    $('.previewPageContent').css('width', getAvailableWidthForTable + 25 + 'px');
	$('.previewPageContent').css('margin-left', getPageMarginLeftInPx + 'px');
	$('.previewPageContent').css('margin-right', getPageMarginRightInPx + 'px');
    $('.previewPageContent').css('top', (getHeaderHeight + getPageMarginTopInPx) + 'px');
    $('.previewPageContent').css('height', getContentAvailableSpace + 'px');
	$('.previewPageContent').attr('data-height', getContentAvailableSpace);
	$('.previewPageContent').css('overflow', 'auto');
	
    var getPageTitle = $('.reportPageTitle').html();
    $('.previewPageTitle').html(getPageTitle);

    var getReportTitleHeight = $('.previewPageTitle').outerHeight();
    var getAvailableHeightForTable = getContentAvailableSpace - getReportTitleHeight;
    generatePreviewTable(getAvailableHeightForTable, getAvailableWidthForTable, runMode);
}

function app_report_init() {
    loadDefaults();
    $('.closeReportPreview').click(function () {
		$('#dataColumnHolder').data('filter', '');
		$('#dataColumnHolder').data('filtervalue', '');
        $('#previewPage').html('');
        $('body').css('overflow', 'auto');
        $('.previewReportPanel').hide();
    });
    $('.rptHeaderOpt').click(function () {
        $('.rptHeaderOpt').removeClass('activeHeader');
        $(this).addClass('activeHeader');
        var templatePage = $(this).data('value');
        rptHeaderObj = templatePage;
        loadHeaderObject(rptHeaderObj);
        $("#hdnReportHeader").val(templatePage);
        //alert(hdnReportHeader.value);
    });
    $('.rptFooterOpt').click(function () {
        $('.rptFooterOpt').removeClass('activeFooter');
        $(this).addClass('activeFooter');
        var templatePage = $(this).data('value');
        rptFooterObj = templatePage;
        loadFooterObject(rptFooterObj);
        $("#hdnReportFooter").val(templatePage);
        //alert(hdnReportFooter.value);
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
    $('.rptTabSave').click(function () {
        saveReport();
    });
    $('.rptTabColumns').click(function () {
        showPropertyWindow('rptWinQuery', 'rptWinColumns');
    });
    $('.rptTabPreview').click(function () {
        generateReportPreview('preview');
    });
    $('.rptTabExecute').click(function () {
        generateReportPreview('execute');
    });
    $('.rptRadioDateGroup').click(function () {
        $('.rptRadioDateGroup input').prop("checked", false);
        $(this).find('input').prop("checked", true);
        $('#hdnDateFormat').val($(this).find('input').val());
		setFooterObjectVal();
        adjustReportDesign();
    });
   
    $('.rptRadioTimeGroup').click(function () {
        $('.rptRadioTimeGroup input').prop("checked", false);
        $(this).find('input').prop("checked", true);
        $('#hdnTimeFormat').val($(this).find('input').val());
		setFooterObjectVal();
        adjustReportDesign();
    });
    $('.rptQueryOpt').click(function () {
        $('.rptQueryOpt input').prop("checked", false);
        $(this).find('input').prop("checked", true);
    });
    $('.rptFrmIconList i').click(function () {
        var getIconClass = $(this).attr('class');
        $('#rptFrmReportIconPreview').attr('class', getIconClass);
        $("#hdnReporticon").val(getIconClass);
        //alert(hdnReporticon.value);
    });
    $("#rpcxReportTitle").change(function () {
        var getPageTitle = $(this).val();
        if (getPageTitle.trim() != '') {
            $('.reportPageTitle').html(getPageTitle);
        } else {
            $('.reportPageTitle').html('Add Report Page Title');
        }
    });

    $("#rpcxDetailedReportType").change(function () {
        var getDetailedReportType = $(this).val();
        $('#hdnDetailActionType').val(getDetailedReportType);
        adjustReportDesign();
    });

    $("#rpcxPageSize").change(function () {

        var getPageType = $("#rpcxPageSize option:selected").text();
        //alert(getPageType);
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
        $('#ddlrpcxPageSize').val(getPageType);
        //document.getElementById(ddlrpcxPageSize).value = rpcxPageSize.options(rpcxPageSize).value;
    });

    $("#rpcxPageWidth").change(function () {
        pageWidth = $(this).val();
        var getLastPageTypeIndex = $("#rpcxPageSize option:last-child").val();
        $("#rpcxPageSize").val(getLastPageTypeIndex);
        adjustReportDesign();
    });
    $("#rpcxPageHeight").change(function () {
        pageHeight = $(this).val();
        var getLastPageTypeIndex = $("#rpcxPageSize option:last-child").val();
        $("#rpcxPageSize").val(getLastPageTypeIndex);
        adjustReportDesign();
    });

    $('.rptPageOpt').click(function () {
        $('.rptPageOpt').removeClass('activePageOpt');
        $(this).addClass('activePageOpt');
        var getPageOrientationVal = $(this).data('value');
        pageOrientation = getPageOrientationVal;

        $("#hdnpageOrientation").val(getPageOrientationVal);

        adjustReportDesign();
    });
	
	 $('#rpcxCompanyName').change(function () {
        setHeaderObjectVal();
        adjustReportDesign();
    });
	$('#rpcxddressLine1').change(function () {
        setHeaderObjectVal();
        adjustReportDesign();
    });
	$('#rpcxddressLine2').change(function () {
        setHeaderObjectVal();
        adjustReportDesign();
    });
	$('#rpcxContactA').change(function () {
        setHeaderObjectVal();
        adjustReportDesign();
    });
	$('#rpcxContactB').change(function () {
        setHeaderObjectVal();
        adjustReportDesign();
    });
	
	$('#rpcxFooterCompanyName').change(function () {
        setFooterObjectVal();
        adjustReportDesign();
    });
	$('#rpcxWebsite').change(function () {
        setFooterObjectVal();
        adjustReportDesign();
    });
	$('#rpcxEmail').change(function () {
        setFooterObjectVal();
        adjustReportDesign();
    });

    showPropertyWindow('rptWinSection', 'rptWinResource');
    loadCanvasHolder();
    loadHeaderObject(rptHeaderObj);
    loadFooterObject(rptFooterObj);
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
	$('body').css('overflow', 'hidden');
    var getNavHeight = $('.themeWMSTopNav').outerHeight();
    var getWhiteBarHeight = $('.fixed_page').outerHeight();
    var getReportToolBarHeight = $('.rptToolBar').outerHeight();
    var getFinalHeaderHeight = getNavHeight + getWhiteBarHeight + getReportToolBarHeight;
    var getWindowHeight = $(window).height();
    var canvasHolderHeight = getWindowHeight - getFinalHeaderHeight;
    var canvasHolderWidth = $('.reportDesignPanel').outerWidth();
	// alert(canvasHolderWidth);	
    $('.reportCanvasHolder').css('width', canvasHolderWidth + 'px');
    $('.reportCanvasHolder').css('height', canvasHolderHeight + 'px');
    $('.reportCanvasHolder').css('overflow', 'auto');
    $('.reportPropertyPanelContent').css('height', (canvasHolderHeight - 10) + 'px');
    $('.reportPropertyPanelContent').css('overflow', 'auto');
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
    var finalURLToPost = serverURL + obj + ".html";
    $("#rptCanvasHeader").load(finalURLToPost, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success"){
            //   alert("Success");
			rptHeaderLayoutHtml = $("#rptCanvasHeader").html();
			setHeaderObjectVal();			
            adjustReportDesign();
		}
        if (statusTxt == "error"){
            alert("Error: " + xhr.status + ": " + xhr.statusText);
		}
    })//;
}

function setHeaderObjectVal(){
	var getCompanyName = $('#rpcxCompanyName').val();
	var getAddressLine1 = $('#rpcxddressLine1').val();
	var getAddressLine2 = $('#rpcxddressLine2').val();
	var getContactA = $('#rpcxContactA').val();
	var getContactB = $('#rpcxContactB').val();
	var getLogoSrc = $('.themeWMSClientLogo').attr('src');
	var setHeaderHtml = rptHeaderLayoutHtml;
	setHeaderHtml = setHeaderHtml.replace('[Logo]', getLogoSrc);
	setHeaderHtml = setHeaderHtml.replace('[COMPANY_NAME]', getCompanyName);
	setHeaderHtml = setHeaderHtml.replace('[ADDRESS1]', getAddressLine1);
	setHeaderHtml = setHeaderHtml.replace('[ADDRESS2]', getAddressLine2);
	setHeaderHtml = setHeaderHtml.replace('[CONTACT1]', getContactA);
	setHeaderHtml = setHeaderHtml.replace('[CONTACT2]', getContactB);
	$("#rptCanvasHeader").html(setHeaderHtml);
}

function loadFooterObject(obj) {
    var serverURL = '';
    var myDate = new Date();
    var finalURLToPost = serverURL + obj + ".html";
    $("#rptCanvasFooter").load(finalURLToPost, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success"){
            //  alert("Success");
			rptFooterLayoutHtml = $("#rptCanvasFooter").html();
			setFooterObjectVal();
            adjustReportDesign();
		}
        if (statusTxt == "error"){
            alert("Error: " + xhr.status + ": " + xhr.statusText);
		}
    })//;
}

function setFooterObjectVal(){
	var getCompanyName = $('#rpcxFooterCompanyName').val();
	var getWebsite = $('#rpcxWebsite').val();
	var getEmail = $('#rpcxEmail').val();
	var getDateFormat = $('#hdnDateFormat').val();
	var getTimeFormat = $('#hdnTimeFormat').val();
	if(getDateFormat == ''){
		getDateFormat = 'dd/MM/yyyy';
	}
	if(getTimeFormat == ''){
		getTimeFormat = 'hh:mm:ss (24 Hrs)';
	}
	var getCurrentDate = getDateInFormat(getDateFormat);
	var getCurrentTime = getTimeInFormat(getTimeFormat);
	
	var setFooterHtml = rptFooterLayoutHtml;
	setFooterHtml = setFooterHtml.replace('[COMPANY_NAME]', getCompanyName);
	setFooterHtml = setFooterHtml.replace('[WEBSITE]', getWebsite);
	setFooterHtml = setFooterHtml.replace('[EMAIL]', getEmail);
	setFooterHtml = setFooterHtml.replace('[DATE]', getCurrentDate);
	setFooterHtml = setFooterHtml.replace('[TIME]', getCurrentTime);
	$("#rptCanvasFooter").html(setFooterHtml);
}

function getDateInFormat(dateFormat){
	var rptDate = new Date();
	var getCurrentDate = rptDate.getDate();
	var getCurrentMonth = rptDate.getMonth();
	var getCurrentYear = rptDate.getFullYear();
	var filterDate = dateFormat.replace('dd' , getCurrentDate);
	filterDate = filterDate.replace('MM', getCurrentMonth);
	if(dateFormat.indexOf('yyyy') > -1){		
		filterDate = filterDate.replace('yyyy', getCurrentYear);
	}else{
		var shortYearString = getCurrentYear.toString().substring(2, 4);
		filterDate = filterDate.replace('yy', shortYearString);
	}
	return filterDate;
}

function getTimeInFormat(timeFormat){
	var rptDate = new Date();
	var hrsExraZero = '';
	var minExraZero = '';
	var secExraZero = '';
	var getCurrentHrs = rptDate.getHours();
	var getCurrentMins = rptDate.getMinutes();
	var getCurrentSec = rptDate.getSeconds();	
	
	if(getCurrentMins < 10){
		minExraZero = '0';
	}
	if(getCurrentSec < 10){
		secExraZero = '0';
	}
	
	var filterTime = timeFormat.replace('mm', minExraZero + getCurrentMins);
	filterTime = filterTime.replace('ss', secExraZero + getCurrentSec);
	if(timeFormat.indexOf('(24 Hrs)') > -1){		
		filterTime = filterTime.replace('(24 Hrs)' , '');
	}else if(timeFormat.indexOf('AM/PM') > -1){
		getCurrentHrs = getCurrentHrs - 12;
		if(getCurrentHrs > 12){			
			filterTime = filterTime.replace(' AM/PM' , ' PM');
		}else{
			filterTime = filterTime.replace(' AM/PM' , ' AM');
		}
		
	}
	if(getCurrentHrs < 10){
		hrsExraZero = '0';
	}
	filterTime = filterTime.replace('hh' , hrsExraZero + getCurrentHrs);
	return filterTime;
}

function createFilterDropDown(filterId) {
   var getFieldName = filterId.trim();
    var getDropDownDefault = $('#dataColumnHolder #' + getFieldName).data('filter');

    var ddlFilter = '<select id="selFl_' + getFieldName + '" value="' + getDropDownDefault + '" onchange="updateFilter(\'' + getFieldName +'\');">' +
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

function createDropDownOption(optVal, defaultVal) {
    var ddlOpt = '';
    if (optVal == defaultVal) {
        ddlOpt = '<option value="' + optVal + '" selected="selected">' + optVal + '</option>';
    } else {
        ddlOpt = '<option value="' + optVal + '">' + optVal + '</option>';
    }
    return ddlOpt;
}

function createFilterUserInput(filterId) {
    var userFilterInput = '<input type="text" id="inFl_' + filterId + '" onchange="updateFilterValue(\'' + filterId + '\');" />';
    return userFilterInput;
}

function getObjectID() {
    var selobj = document.getElementById(ddlSection).value;
    var hdnSelectedObj = document.getElementById("hdnSelectedObj");
    hdnSelectedObj.value = selobj; 
}
function validateReportDesigner() {
    return true;
}

function validateFormRpt(divName) {
    var validate = true;
    var tablename = document.getElementById(divName.toString());
    //var allinput = tablename.getElementsByTagName("input");
    var allinput = document.getElementsByTagName("input");
    var allselect = document.getElementsByTagName("select");
    var allspan = document.getElementsByTagName("span");
    var alltextarea = document.getElementsByTagName("textarea");

    var regex = /^\d+(?:\.\d{0,2})$/;

    for (var i = 0; i < allinput.length; i++) {
        if (allinput[i].type == "text" && allinput[i].accessKey == '1' && allinput[i].value == '') {
            var txtbox = allinput[i];
            txtbox.style.borderColor = "red";
            validate = false;
        }
        else { allinput[i].style.borderColor = ""; }
    }

    for (var i = 0; i < allselect.length; i++) {
        if (allselect[i].accessKey == '1' && allselect[i].selectedIndex <= 0) {
            var ddl = allselect[i];
            ddl.style.borderColor = "red";
            validate = false;
        }
        else {
            allselect[i].style.borderColor = "";
        }
    }

    for (var i = 0; i < alltextarea.length; i++) {
        if (alltextarea[i].accessKey == '1' && alltextarea[i].value == '') {
            var txtarea = alltextarea[i];
            txtarea.style.borderColor = "red";
            validate = false;
        }
        else { alltextarea[i].style.borderColor = ""; }
    }
    return validate;
}

function openDetailReport(dataVal) {
    var getDetailTemplate = $('#rpcxDetailedReportType').val();
    if (getDetailTemplate != '0' && getDetailTemplate != '') {
        if (getDetailTemplate == 'Invoice'){
            window.open("Detail-Report-Template/Detail-Invoice-Template.aspx?invid=" + dataVal); 
        } else if (getDetailTemplate == 'PaymentReceipt') {
            window.open("Detail-Report-Template/Payment-Receipt-Template.aspx?invid=" + dataVal);
        } else if (getDetailTemplate == 'PurchaseOrder') {
            window.open("Detail-Report-Template/Purchase-Order-Template.aspx?poid=" + dataVal);
        } else if (getDetailTemplate == 'SalesOrder') {
             window.open("Detail-Report-Template/Sales-Order-Template.aspx?soid=" + dataVal);
        } else if (getDetailTemplate == 'DispatchOrder') {
            alert('Dispatch Template in progress');
        }        
    } else {
        alert('Detail report type not selected!!');
    }
}

function saveReportDesignData(obj1, summationColumns) {
    var getResourceId = $('#hdnReportID').val();
    $.ajax({
        type: "POST",
        url: "../ReportDesigner/save-report-data.ashx",
        data: {
            'rptID': getResourceId,
            'Address1hdr': obj1.Address1hdr,
            'Address2hdr': obj1.Address2hdr,
            'BottomMargin': obj1.BottomMargin,
            'CompanyNameFtr': obj1.CompanyNameFtr,
            'CompanyNameHdr': obj1.CompanyNameHdr,
            'Contact1Hdr': obj1.Contact1Hdr,
            'Contact2Hdr': obj1.Contact2Hdr,
            'Dateformate': obj1.Dateformate,
            'Email': obj1.Email,
            'HtmlTemplateFtr': obj1.HtmlTemplateFtr,
            'HtmlTemplateHdr': obj1.HtmlTemplateHdr,
            'LeftMargin': obj1.LeftMargin,
            'PageSize': obj1.PageSize,
            'QryName': obj1.QryName,
            'ResCode': obj1.ResCode,
            'ResDescription': obj1.ResDescription,
            'ResIcon': obj1.ResIcon,
            'ResTitle': obj1.ResTitle,
            'RightMargin': obj1.RightMargin,
            'TimeFormate': obj1.TimeFormate,
            'TopMargin': obj1.TopMargin,
            'Website': obj1.Website,
            'pageHeight': obj1.pageHeight,
            'pageOrientation': obj1.pageOrientation,
            'objname': obj1.objname,
            'pageWidth': obj1.pageWidth,
           'Dateformate ':obj1.Dateformate, 
            'TimeFormate':obj1.TimeFormate, 
            'summationColumns': summationColumns,
            'DetailActionColumn': obj1.DetailActionColumn,
            'DetailActionType': obj1.DetailActionType,
			'AdvanceFilters': saveAdvanceFiltersToDB()
        },
        beforeSend: function ()
        {
            showWMSThemeLoading();
        },
        success: function (data) {
            // alert(data);
            if (data.trim() == 'success') {
                showAlert("Report Saved Successfully.", "info", "../ReportDesigner/CustomizeReportList.aspx");
            } else {
                showAlert("Error occurred", "Error", "#");
            }
            hideWMSThemeLoading();
        }
    });
}

function saveReport(){
   // var validate = validateFormRpt('rptDesignDetail');
   // var validate = validateReportDesigner();
   var validate = true;
	
	var obj1 = new Object();
        var hdnSelectedObj = document.getElementById("hdnSelectedObj");
        if (hdnSelectedObj.value != "") {
            obj1.ResCode = hdnSelectedObj.value;
        } else {
            if (rpcxNewSection.value != "")
            {
                obj1.ResCode = rpcxNewSection.value;
            }
            else
            {
                obj1.ResCode = hdnSelectedObj.value;
            }
        }
        if (rpcxReportTitle.value == "") {						
            alert("Please Add Report Title");
			validate = false;
			return false;
        } else {
            obj1.ResTitle = rpcxReportTitle.value;
        }
        if (rpcxDescription.value == "") {
            alert("Please Add Report Description");
			validate = false;
			return false;
        } else {
            obj1.ResDescription = rpcxDescription.value;
        }
        if (hdnReporticon.value == "") {
            obj1.ResIcon = "fas fa-truck-moving";
        } else {
            obj1.ResIcon = hdnReporticon.value;
        }
        if (ddlrpcxPageSize.value == "0") {
            alert("Please select Page Size");
			validate = false;
			return false;
        } else {
            $('#ddlrpcxPageSize').val($('#rpcxPageSize option:selected').text());
            obj1.PageSize = ddlrpcxPageSize.value;
        }
        if (rpcxPageWidth.value == "") {
            obj1.pageWidth = "0";
        } else {
            obj1.pageWidth = rpcxPageWidth.value;
        }
        if (rpcxPageHeight.value == "") {
            obj1.pageHeight = "0";
        } else {
            obj1.pageHeight = rpcxPageHeight.value;
        }
        if (hdnpageOrientation.value == "") {
            obj1.pageOrientation = "0";
        } else {
            if (hdnpageOrientation.value == "PagePortrait") {
                obj1.pageOrientation = "0";
            } else {
                obj1.pageOrientation = "1";
            }
        }
        if (rpcxPageMarginLeft.value == "") {
            obj1.LeftMargin = "0";
        } else {
            obj1.LeftMargin = rpcxPageMarginLeft.value;
        }
        if (rpcxPageMarginTop.value == "") {
            obj1.TopMargin = "0";
        } else {
            obj1.TopMargin = rpcxPageMarginTop.value;
        }
        if (rpcxPageMarginRight.value == "") {
            obj1.RightMargin = "0";
        } else {
            obj1.RightMargin = rpcxPageMarginRight.value;
        }
        if (rpcxPageMarginBottom.value == "") {
            obj1.BottomMargin = "0";
        } else {
            obj1.BottomMargin = rpcxPageMarginBottom.value;
        }
        if (hdnReportHeader.value == "") {
            obj1.HtmlTemplateHdr = "header-template-style-1";
        } else {
            obj1.HtmlTemplateHdr = hdnReportHeader.value;
        }
        if (rpcxCompanyName.value == "") {
            alert("Please Add Company Name for Header");
			validate = false;
			return false;
        } else {
            obj1.CompanyNameHdr = rpcxCompanyName.value;
        }
        obj1.Address1hdr = rpcxddressLine1.value;
        obj1.Address2hdr = rpcxddressLine2.value;
        obj1.Contact1Hdr = rpcxContactA.value;
        obj1.Contact2Hdr = rpcxContactB.value;

        if (hdnReportFooter.value == "") {
            obj1.HtmlTemplateFtr = "footer-template-style-1";
        } else {
            obj1.HtmlTemplateFtr = hdnReportFooter.value;
        }
        if (rpcxFooterCompanyName.value == "") {
            alert("Please Add Company Name for Footer");
			validate = false;
			return false;
        } else {
            obj1.CompanyNameFtr = rpcxFooterCompanyName.value;
        }
        obj1.Email = rpcxEmail.value;
        obj1.Website = rpcxWebsite.value;
        obj1.Dateformate = hdnDateFormat.value;
        obj1.TimeFormate = hdnTimeFormat.value;
        if (hdnSelQuery.value == "") {
            alert("Please Select Query for Report.");
			validate = false;
			return false;
        } else {
            obj1.QryName = hdnSelQuery.value;
        }
       
        var summationColumns = getSummationColumns();
        if (summationColumns == '') {
            alert('Please Select At Leat One Field for Report...');
			validate = false;
			return false;
        } else {
           // alert(summationColumns);
        }

        if (hdnDetailActionColumn.value != '') {
            if (hdnDetailActionType.value == '') {
                alert('Please Select Detail Action Type');
				validate = false;
				return false;
            } else {
                obj1.DetailActionColumn = hdnDetailActionColumn.value;
                obj1.DetailActionType = hdnDetailActionType.value;
            }
        }else{
			obj1.DetailActionColumn = '';
            obj1.DetailActionType = '';
		}
	
    if (validate == true) {        
        /*
        Object.size = function (obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        var size = Object.size(obj1);
        */
        // PageMethods.WMSaveReportDesign(obj1, summationColumns, WMSaveReportDesign_onSuccessed, WMSaveReportDesign_onFailed);
        saveReportDesignData(obj1, summationColumns);
        
    } else {
        showAlert("Fill All Mandatory Fields...", "error", "#");
    }
}

function WMSaveReportDesign_onSuccessed(result) {
    showAlert("Report Saved Successfully.", "info", "../ReportDesigner/ReportDesigner.aspx");
}

function WMSaveReportDesign_onFailed(result) {
    alert(result);
    showAlert("Error occurred", "Error", "#");
}
function GetPageSizeID(rpcxPageSize) {
  //  document.getElementById(ddlrpcxPageSize).value = rpcxPageSize.options(rpcxPageSize).value;
}

function callPreviewAPItoGetData() {
    var getReportId = '0';
    var getColumnWidth = finalPreviewWidth;
	var recordLimit = 10;
    var getColumns = getSqlSelectedColumns();
    var getGroupBy = $(".reportGroupByContent").data('value');
    var groupByHeaderWidth = $(".reportGroupByCell").css('width');
    var setGroupByCondition = '';
	//var groupByItem = $(".reportGroupByContent").data('value');
	var getObjectName = $('#dataObjectHolder').val();
	var getSummationColDetails = getSummationColumns();
	//-------------	
        $.ajax({
            type: "POST",
            url: "../ReportDesigner/getPreviewReportQueryResult.ashx",
            data: {
                'rptid': getReportId,
				'objname': getObjectName,
				'summationColumns': getSummationColDetails,
                'col': getColumns,
                'limit': recordLimit,
                'pageno': currentExePageNo,
                'colwidth': getColumnWidth,                
                'groupby': groupByItem,
                'groupbyheaderwidth': groupByHeaderWidth,
				'reportDetailColumn': reportDetailColumn,
				'reportDetailColWidth': reportDetailColWidth,
                'filtercondition': getPreviewWhereFilterCondition()
            },
            beforeSend: function () {
                showWMSThemeLoading();
            },
            success: function (data) {
               // alert(data);
                if (data.trim() != '') {
                    $('.previewTable .reportRow').remove();
                    $('#divRecordDetails').remove();
                    $('.previewTable').append(data);
                    $(".reportRowCell").each(function () {
                        var parentRowHeight = $(this).parent().height();
                        $(this).css('height', parentRowHeight + 'px');
                    });
                    var getTotalRecords = $('#divRecordDetails').data('totalcount');
                    totalPageNo = Math.round(getTotalRecords / recordLimit);                    
                    $('.pagePreviewCount').html(currentExePageNo + '/' + totalPageNo);
                    $('#txtReportPageNo').val(currentExePageNo);
                }
                hideWMSThemeLoading();
            }
        });
}

function getPreviewWhereFilterCondition(){
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
    return whereCondtion;
}

function goToNextPage() {
    if (currentExePageNo < totalPageNo) {
        currentExePageNo = Number(currentExePageNo) + 1;
        callPreviewAPItoGetData();
    }
}

function goToPreviousPage() {
    if (currentExePageNo > 1) {
        currentExePageNo = Number(currentExePageNo) - 1;
        callPreviewAPItoGetData();
    }
}

function jumpToPage() {
    var requestedPageNo = $('#txtReportPageNo').val();
    if ((requestedPageNo > 0) && (requestedPageNo <= totalPageNo)) {
        currentExePageNo = requestedPageNo;
        callPreviewAPItoGetData();
    }
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
            currentExePageNo = 1;
            callPreviewAPItoGetData();
        }       
    } else {
        $('#dataColumnHolder #' + filterId).data('filtervalue', getFilterVal);
        currentExePageNo = 1;
        callPreviewAPItoGetData();
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
        callPreviewAPItoGetData();
    } else if (getFilter == 'In Between'){
        $('#inFl_' + filterId).hide();
        $('#inFl1_' + filterId).show();
        $('#inFl2_' + filterId).show();
    }
    // callAPItoGetData();
}
function filterToOperator(condition, conditionVal, columnType) {
    var operator = '';
    if (condition == 'No Filter') {
        operator = '';
    } else if (condition == 'Contains') {
        operator = 'LIKE \'%' + conditionVal +'%\'';
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

function saveAdvanceFiltersToDB(){
	var getAllAdvanceFilters = '';
	var firstFilterColon = '';
	$('.rptColumnOpt').each(function () {		
		var getColName = $(this).attr('id').trim();     
		var getColDisplayName = $(this).attr('id').trim();
		var getColType = $('#dataColumnHolder #' + getColName).data('type');
		var getAdvFilter = $('#dataColumnHolder #' + getColName).data('advfilter');
		var getAdvFilterValue = $('#dataColumnHolder #' + getColName).data('advfiltervalue');
		var getAdvControlType = $('#dataColumnHolder #' + getColName).data('advfilterctrltype');
		if(getAdvFilter != ''){
			if(getAdvFilterValue == ''){
				getAdvFilterValue = 'na';
			}
		getAllAdvanceFilters += firstFilterColon + getColName + ':' + getColDisplayName + ':' + getColType + ':' + getAdvFilter + ':' + getAdvFilterValue + ':' + getAdvControlType;
		firstFilterColon = '|';	
		}
	});
	return getAllAdvanceFilters;
}