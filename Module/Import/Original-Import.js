//var apiFolder = 'http://localhost:50068/';
//var apiFolder = 'http://164.68.123.40/WebAPIImportTest/';
//var apiServerPath = apiFolder + 'api/staging/v1/';
//var wmsApiPathimp = 'http://173.212.244.46/BWMSImportAPI2.1/api/staging/v1/';
var wmsApiPathimp = 'http://localhost:5242/api/Import/';
//http://awswebaap.easycloudwms.com:5001/api/Import/GetImportTemplate
//var wmsApiPathimp = 'http://awswebaap.easycloudwms.com:5001/api/Import/';
var importObject = "";
var templateId = '0';
var getCustomerId = $("#ddlcustomer").val(); // 1;// $("#ddlcustomer").val();
var getCompanyID = mBrillWmsSession.getCompanyId(); //1;// $('#hdnCompanyID').val();
var getUserId = mBrillWmsSession.getUserId(); //1; // $('#hdnUser').val();
var warehouseid = $('#ddlwarehouse').val();

/*wmsLoadLayout(function ()
{
    init();
    initWmsImport();
});*/

wmsLoadLayout(function () {
    initImport();
});

var stepFileType = 'step_filetype';
var stepMapColumns = 'step_mapcolumns';
var stepValidateFile = 'step_validatefile';
var stepImport = 'step_import';
var currentImportStep = stepImport;
var isContainsHeader = false;
var charToSplit = '';
var minYear = 2000;
var maxYear = 2120;
var currentDateCell = '';
var currentUploadProgress = 0;
var totalRecordToUpload = 0;
var batchRecordCount = 1;
var intervalProgress;
var file;
var fileName;
var fileType;
var currentFileType;
var isRevalidate = false;

var disablemessages = 'No';

// DATA TYPE
var stringDataType = ['char', 'varchar', 'text', 'nchar', 'nvarchar', 'ntext', 'binary', 'varbinary', 'image'];
var numberDataType = ['bit', 'tinyint', 'smallint', 'int', 'bigint', 'decimal', 'numeric', 'float', 'smallmoney', 'money', 'real'];
var dateTimeDataType = ['datetime', 'datetime2', 'smalldatetime', 'date', 'time', 'datetimeoffset', 'timestamp'];
// DATA TYPE

// DEMO CONTENT... 
var templateHeaderData = '';
//var templateHeader = ['Prod_Code:nvarchar', 'Prod_Name:nvarchar', 'Prod_Category:nvarchar', 'Prod_SubCategory:nvarchar', 'AliasSKUCode:nvarchar', 'Cost:decimal', 'RetailPrice:decimal', 'PickingMethod:nvarchar', 'UPCBarcode:nvarchar', 'Brand:nvarchar', 'CartonType:nvarchar', 'Height:nvarchar', 'Width:nvarchar', 'Length:nvarchar', 'Weight:nvarchar', 'UOM1Name:nvarchar', 'UOM1Quantity:nvarchar', 'UOM2Name:nvarchar', 'UOM2Quantity:nvarchar', 'UOM3Name:nvarchar', 'UOM3Quantity:nvarchar'];
templateHeader = [];
var userColumnSequence = [];
// DEMO CONTENT...

function initImport() {
    debugger;
    createSession();
    getimportobject();
    importObject = "";
    $('.btnopenimportwizardsteps[data-obj]').hide();
    $(".btnopenimportwizardsteps").click(function () {
        importObject = $(this).data("obj");
        //alert(importObject);
        $("#import_wizard_steps").show();
        $("#import_wizard_grid").hide();
        Loadimporttemplate();
    });

    initWmsImport();
}

function callHttpUrl1(apiPath, postData, callback) {
    $.ajax({
        url: apiPath,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (response) {
            callback(response);
        },
        error: function (xhr, status, error) {
            console.error('Error: ' + error);
            alert('Failed to call API.');
        }
    });
}

function getimportobject() {
    debugger;
    var apiPath = wmsApiPathimp + 'GetImportObject';
    var postData = {
        CompanyId: getCompanyID,
        CustomerId: getCustomerId
    };

    callHttpUrl1(apiPath, postData, function (data) {
        var getCode = data.StatusCode;
        var getStatus = data.Status.toLocaleLowerCase();

        if (getStatus == "success") {
            //var getResult = data.Result;
            var getImportObject = JSON.parse(data.Result);
            var Objectlist = getImportObject.Table;
            var gridTable = '';

            for (var i = 0; i < Objectlist.length; i++) {

                var Objectid = Objectlist[i].ObjectId;
                var ObjectName = Objectlist[i].ObjectName;
                $('.btnopenimportwizardsteps[data-obj="' + ObjectName + '"]').show();
            }
        }
        else {
            alert("Failed to load Import.");
        }

    });


}

function Loadimporttemplate() {

    debugger;
    // showWMSThemeLoading();
    var apiPath = wmsApiPathimp + 'GetImportTemplate';
    // var getCompanyId = 1; //$('#hdnCompanyId').val();
    //var getCustomerId = 1;// $('#ddlcustomer').val();
    // var getUserId = 3; // $('#hdnUser').val();
    var getImportObject = importObject; //$('#hdnImportObject').val();

    var postData = {
        CompanyId: getCompanyID,
        CustomerId: getCustomerId,
        UserId: getUserId,
        Object: getImportObject
    };

    callHttpUrl1(apiPath, postData, function (data) {
        var getCode = data.StatusCode;
        var getStatus = data.Status.toLocaleLowerCase();

        if (getStatus == "success") {
            var getImportObject = JSON.parse(data.Result);
            // var Objectlist = getImportObject.Table;

            templateId = getImportObject.TemplateId;
            if (templateId != '0') {
                var templateCompanyId = getImportObject.CompanyId;
                var templateCustomerId = getImportObject.CustomerId;
                var templateUserId = getImportObject.UserId;
                var templateObject = getImportObject.Object;
                var templateColumnName = getImportObject.ColumnName;
                templateHeader = templateColumnName.split("|");
            } else {
                // alert('Error to load template details for selected customer!!');
            }
            //   hideWMSThemeLoading();
            goToStep(stepFileType);
        }
        else {
            //error: function (jqXhr, textStatus, errorThrown) {
            hideWMSThemeLoading();
            alert('Error to load import template details');
        }
    });


}


function loadTemplateData() {
    debugger;
    showWMSThemeLoading();
    //var getCompanyId = $('#hdnCompanyId').val();
    //var getCustomerId = $('#ddlcustomer').val();
    //var getUserId = $('#hdnUser').val();
    var getImportObject = $('#hdnImportObject').val();
    var dataObject = {
        "CompanyId": getCompanyID,
        "CustomerId": getCustomerId,
        "UserId": getUserId,
        "Object": getImportObject
        //"CompanyId": "10322",
        //"CustomerId": "10082",
        //"UserId": "10650",
        //"Object": "Product"
    }
    var dataParentObject = {
        "TempDetails": dataObject
    }
    var apiPath = wmsApiPathimp + 'GetTemplate';
    jQuery.ajax({
        type: "POST",
        //url: "https://w5production.westcoastwarehouse.com/ImportService/DImportService.svc/GetTemplate",
        url: apiPath,
        //url: "template-details.ashx",
        // beforeSend: function (request) {
        //     // request.setRequestHeader("apikey", "************************");
        // },
        beforeSend: function (request) {
            request.setRequestHeader("api-request-key", wmsApiRequestKey);
            request.setRequestHeader("api-access-key", wmsApiAccessKey);
            showWMSThemeLoading();
        },
        data: JSON.stringify(dataParentObject),
        dataType: "json",
        contentType: "application/json",
        success: function (data, textStatus, jQxhr) {
            var templateDataResponse = data;
            templateId = templateDataResponse["GetTempDataResult"]["templateId"];
            if (templateId != '0') {
                var templateCompanyId = templateDataResponse["GetTempDataResult"]["CompanyId"];
                var templateCustomerId = templateDataResponse["GetTempDataResult"]["CustomerId"];
                var templateUserId = templateDataResponse["GetTempDataResult"]["UserId"];
                var templateObject = templateDataResponse["GetTempDataResult"]["Object"];
                var templateColumnName = templateDataResponse["GetTempDataResult"]["columnName"];
                templateHeader = templateColumnName.split("|");
            } else {
                // alert('Error to load template details for selected customer!!');
            }
            hideWMSThemeLoading();
            goToStep(stepFileType);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            hideWMSThemeLoading();
            alert('Error to load import template details');
            console.log(errorThrown);
        }
    });
}

function importCSV() {

}
function validateColumn() {

}

function goToStep(currentStep) {
    debugger;
    $('#' + stepFileType).removeClass('activeStep');
    $('#' + stepMapColumns).removeClass('activeStep');
    $('#' + stepValidateFile).removeClass('activeStep');
    $('#' + stepImport).removeClass('activeStep');

    // Current Page... 
    currentImportStep = currentStep;
    $('#' + currentImportStep).addClass('activeStep');
    $('.WMSImport_StepsPages').hide();
    $('#WmsPage_' + currentStep).show();
    // Hide All Panels... 


    if (currentStep == stepFileType) {

    } else if (currentStep == stepMapColumns) {

    } else if (currentStep == stepValidateFile) {

    } else if (currentStep == stepImport) {
        uploadFinalData();
    }
}
function initWmsImport() {
    debugger;
    $('#WMSDataCalendar').datepicker({
        dateFormat: 'mm/dd/yy',
        yearRange: minYear + ":" + maxYear,
        onSelect: function (dateText, inst) {
            var date = $(this).val() + '<a href="#" class="btnCalendar" data-id="' + currentDateCell + '" onclick="showCalendar(this);return false;"><i class="far fa-calendar-alt"></i></a>';
            $("#" + currentDateCell).html(date);
            $('#WMSDataCalendar').hide();
        }
    });
    $('#WMSDataCalendar').hide();
    $('#txtFieldSaparator').on('change', function () {
        var getSaparatorVal = this.value;
        if (getSaparatorVal == 'fixwidth') {
            //generateTextPreview();
            $('#divTextPreviewHolder').show();
        } else {
            $('#divTextPreviewHolder').hide();
        }
    });
    $(".WmsImport_Type").click(function () {
        //  var CustomerId = $('#ddlcustomer').val();
        var CustomerId = $('#ddlcustomer').val();
        var importType = $(this).data('type');
        if (CustomerId != '0') {
            if (templateId != '0') {
                var filedSaparatorOption = '';
                var headerOption = '';
                if (importType == 'CSV') {
                    $('#txtFile').attr('accept', 'text/csv');
                    filedSaparatorOption += '<option value="comma">Comma delimited (,)</option>';
                    filedSaparatorOption += '<option value="semicolon">Semi-Colon delimited (;)</option>';
                    $('#txtFieldSaparator').html(filedSaparatorOption);
                    $('#txtFieldSaparator').val('comma');
                    headerOption += '<option value="yes">Contains Header</option>';
                    headerOption += '<option value="no">No Header</option>';
                    $('#txtIsHeader').html(headerOption);
                    goToStep(stepMapColumns);
                } else if (importType == 'Text') {
                    $('#txtFile').attr('accept', 'text/pain');
                    filedSaparatorOption += '<option value="tab">Tab delimited (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</option>';
                    //filedSaparatorOption += '<option value="fixwidth">Fix Width</option>';
                    $('#txtFieldSaparator').html(filedSaparatorOption);
                    $('#txtFieldSaparator').val('tab');
                    headerOption += '<option value="yes">Contains Header</option>';
                    headerOption += '<option value="no">No Header</option>';
                    $('#txtIsHeader').html(headerOption);
                    goToStep(stepMapColumns);
                } else {
                    $('#txtFile').attr('accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    filedSaparatorOption += '<option value="comma">Comma delimited (,)</option>';
                    $('#txtFieldSaparator').val(',');
                    $('#txtFieldSaparator').val('comma');
                    headerOption += '<option value="yes">Contains Header</option>';
                    //headerOption += '<option value="no">No Header</option>';
                    $('#txtIsHeader').html(headerOption);
                    goToStep(stepMapColumns);
                    // alert('Not available');
                }
                currentFileType = importType;
            } else {
                alert('Error to load template details for selected customer!!');
            }
        } else {
            alert('Select customer first!!');
        }

    });
    $("#ddlcustomer").change(function () {
        //  loadTemplateData();
    });
    $("#divWmsCompletedCount").click(function () {
        clearTableFilter();
        $('#WMSFilterOption').val('completedDataOnly');
        $('#WMSImportTable').addClass('completedDataOnly');
    });
    $("#divWmsErrorCount").click(function () {
        clearTableFilter();
        $('#WMSFilterOption').val('errorDataOnly');
        $('#WMSImportTable').addClass('errorDataOnly');
    });
    $("#divWmsWarningCount").click(function () {
        clearTableFilter();
        $('#WMSFilterOption').val('showAll');
        // $('#WMSImportTable').addClass('warningDataOnly');
    });
    $("body").attr("onbeforeunload", "return confirmExit();");
    // TEMP COMMENTED
    // loadTemplateData();
    goToStep(stepFileType);
    debugger;


    //  loadTemplateData();   new commented on


    // goToStep(stepImport);
}

function clearTableFilter() {
    $('#WMSImportTable').removeClass('errorDataOnly');
    $('#WMSImportTable').removeClass('completedDataOnly');
    $('#WMSImportTable').removeClass('warningDataOnly');
}

function showCalendar(btnObj) {
    debugger;
    currentDateCell = $(btnObj).data('id');
    var position = $(btnObj).position();
    $('#WMSDataCalendar').css('top', (position.top + 5) + 'px');
    $('#WMSDataCalendar').css('left', (position.left + 5) + 'px');
    $('#WMSDataCalendar').show();
}

function setFile(objFileCtrl) {
    showFiles(objFileCtrl.files);
}

function updateSize() {
    if (validateFileSelectForm()) {
        //READ Content....
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var strLines = '';
            var lines = this.result.split('\n');
            for (var line = 0; line < lines.length; line++) {
                strLines += lines[line] + '<br />';
            }
            document.getElementById("fileOutput").innerHTML = strLines;
        }
        reader.onerror = function (evt) {
            document.getElementById("fileOutput").innerHTML = "error reading file";
        }
    }
}

function loadHeader() {
    if (validateFileSelectForm()) {
        debugger;
        $('#WmsImportOptionPopup').hide();
        //charToSplit = $("#txtFieldSaparator").val();
        getCharacterToReplace();
        //READ Content....
        //var reader = new FileReader();
        //reader.readAsText(file, "UTF-8");
        //reader.onload = function (evt) {
        var isColumnMatched = true;
        var strLines = '';
        // var fileContent = readAndGetFileContent();
        //var lines = this.result.split('\n');
        var fileContent = $('#txtCSVdata').val();
        var lines = fileContent.split('\n');
        isContainsHeader = getIsContainsHeader();
        $('#fileHeaderContainer').show();
        /* Load Template Header */
        var templateHeaderCount = templateHeader.length;
        $("#templateHeader").html('');
        for (var thc = 0; thc < templateHeaderCount; thc++) {
            var splitTemplateHeader = templateHeader[thc].split(':');
            $("#templateHeader").append('<li class="ui-state-default">' + splitTemplateHeader[0] + '<a href="#" onclick="removeHeader(this);return false;"><i class="fas fa-times-circle" style="display:none;"></i></a></li>');
        }

        /* Load Template Header */
        strLines = lines[0];
        var csvHeader = strLines.split(charToSplit);
        var csvHeaderCount = csvHeader.length;
        $("#sortable").html('');
        for (var hc = 0; hc < csvHeaderCount; hc++) {
            if (isColumnMatched) {
                if (hc <= (templateHeaderCount - 1)) {
                    var getTemplateHeader = templateHeader[hc].split(':');
                    if (getTemplateHeader[0].trim() != csvHeader[hc].trim()) {
                        isColumnMatched = false;
                    }
                } else {
                    isColumnMatched = false;
                }
            }
            $("#sortable").append('<li class="ui-state-default" data-colindex="' + hc + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + csvHeader[hc] + '</li>');
        }
        document.getElementById("fileOutput").innerHTML = strLines;
        $(function () {
            $('#WMSImport_FileForm').hide();
            $("#sortable").sortable();
            $("#sortable").disableSelection();
        });

        if (!isContainsHeader) {
            mapHeaderColumn();
        } else {
            // IF COLUMN MATCHED THEN IT WILL JUMP TO NEXT PAGE
            if (isColumnMatched && ($("#templateHeader li").length == ($("#sortable li").length))) {
                mapHeaderColumn();
            }
        }
        //}
        //reader.onerror = function (evt) {
        //    document.getElementById("fileOutput").innerHTML = "error reading file";
        //}
    }
}

function mapHeaderColumn() {
    debugger;
    var isValidColumns = true;
    var templateHeaderCount = templateHeader.length;
    var userColHeaderCount = $('#sortable li').length;
    if (templateHeaderCount > userColHeaderCount) {
        isValidColumns = false;
        alert('User column count not matched!! ');
    }
    if (isValidColumns) {
        userColumnSequence = [];
        for (var hc = 1; hc <= templateHeaderCount; hc++) {
            $("#templateHeader li:nth-child(" + hc + ") i").attr('class', 'fas fa-arrows-alt-h');
            $("#templateHeader li:nth-child(" + hc + ") i").show();
            $("#sortable li:nth-child(" + hc + ") i").attr('class', 'fas fa-check-circle');
            var userDataIndex = $("#sortable li:nth-child(" + hc + ")").data('colindex');
            userColumnSequence.push(userDataIndex);
        }
        goToStep(stepValidateFile);
        loadDataTable();
    }
}

function getCharacterToReplace() {
    var fieldSaparator = $("#txtFieldSaparator").val();
    if (fieldSaparator == 'comma') {
        charToSplit = ',';
    } else if (fieldSaparator == 'semicolon') {
        charToSplit = ';';
    } else if (fieldSaparator == 'tab') {
        charToSplit = /\t/;
    } else if (fieldSaparator == 'fixwidth') {
        charToSplit = '[-tb-]';
    }
}

function loadDataTable() {
    debugger;
    $('#validationHolder').hide();
    var winWidth = $('#WmsImport_Title_Validate').width();
    var winHeight = 500;
    $('#WMSImportTableHolder').css('width', winWidth + 'px');
    $('#WMSImportTableHolder').css('height', 'auto');
    $('#WMSImportTableHolder').css('max-height', winHeight + 'px');
    // Read and Add File... 
    var startLine = 0;
    //charToSplit = $("#txtFieldSaparator").val();
    getCharacterToReplace();

    //READ Content....
    //var reader = new FileReader();
    //reader.readAsText(file, "UTF-8");
    //reader.onload = function (evt) {
    var strLines = '';
    //var fileContent = readAndGetFileContent();
    //var lines = this.result.split('\n');
    var fileContent = $('#txtCSVdata').val();
    var lines = fileContent.split('\n');
    isContainsHeader = getIsContainsHeader();
    // ADD TABLE HEADER
    strLines += '<tr class="WMSImportRow WMSImportHeaderRow"><td class="WMSRowNo"></td>';
    var templateHeaderCount = templateHeader.length;
    if (isContainsHeader) {
        startLine = 1;
        var dataLines = lines[0];
        var csvHeader = dataLines.split(charToSplit);
        for (var thc = 0; thc < templateHeaderCount; thc++) {
            strLines += '<td class="WMSImportCell">' + csvHeader[userColumnSequence[thc]] + '</td>';
        }

    } else {
        for (var thc = 0; thc < templateHeaderCount; thc++) {
            var splitTemplateHeader = templateHeader[thc].split(':');
            strLines += '<td class="WMSImportCell">' + splitTemplateHeader[0] + '</td>';
        }
    }
    // ADD TABLE HEADER
    strLines += '</tr>';
    $('#WMSImportTable').append(strLines);

    // ADD TABLE CONTENT
    //for (var line = startLine; line < (lines.length - startLine); line++) {
    for (var line = startLine; line < (lines.length - startLine); line++) {
        var rRowNo = line;
        if (startLine == 0) {
            rRowNo = line + 1;
        }
        if (lines[line] != "") {
            strLines = '<tr class="WMSImportRow" id="WMSImportRow_' + rRowNo + '"><td class="WMSRowNo">' + rRowNo + '</td>';
            dataLines = lines[line];
            var csvContent = dataLines.split(charToSplit);

            for (var thc = 0; thc < templateHeaderCount; thc++) {
                var tCellNo = thc + 1;
                strLines += '<td id="l' + rRowNo + 't' + tCellNo + '" class="WMSImportCell">' + csvContent[userColumnSequence[thc]].replace(/--wmscmm--/g, ',') + '</td>';
            }
            strLines += '</tr>';
            $('#WMSImportTable').append(strLines);
        }
    }
    validateTableData();
    $('html, body').animate({ scrollTop: $(document).height() }, 1200);
    // ADD TABLE CONTENT
    //}
    //reader.onerror = function (evt) {
    //    document.getElementById("fileOutput").innerHTML = "error reading file";
    //}
}

function removeHeader(objHeader) {
    // var objectToRemove
}

function validateFileSelectForm() {
    var isValidForm = true;
    var fileSeparator = document.getElementById("txtFieldSaparator");
    if (!file) {
        isValidForm = false;
        alert('Please select file first!!');
    } else if (fileSeparator.value == '') {
        isValidForm = false;
        alert('Please enter file separator!!');
    }
    return isValidForm;
}

function validateTableData() {
    debugger;
    var line = 0;
    var templateHeaderCount = templateHeader.length;
    $('#WMSImportTable tr').removeClass('errorRow');
    $('#WMSImportTable tr td').removeClass('errorCell');
    $('#WMSImportTable tr td').removeAttr('contenteditable');
    $('#WMSImportTable tr').each(function () {
        var isValidRow = true;
        var isHeader = $(this).hasClass('WMSImportHeaderRow');
        if (!isHeader) {
            for (var thc = 0; thc < templateHeaderCount; thc++) {
                var getHeaderObj = templateHeader[thc].split(':');
                var getColumnName = getHeaderObj[0];
                var getDataType = "";
                var getDataLimit = "";
                var getCanNull = getHeaderObj[2];
                if ((getHeaderObj[1].indexOf('(') > -1) && (getHeaderObj[1].indexOf(')') > -1)) {
                    var splitDataType = getHeaderObj[1].split("(");
                    getDataType = splitDataType[0].toLowerCase();;
                    getDataLimit = splitDataType[1].replace(")", "");
                } else {
                    getDataType = getHeaderObj[1].toLowerCase();;
                }

                var startLine = 0;
                if (isContainsHeader) {
                    startLine = 1;
                }

                var rRowNo = line;
                /*if (startLine == 0) {
                    rRowNo = line + 1;
                }*/

                var tCellNo = thc + 1;
                var getCellId = 'l' + rRowNo + 't' + tCellNo;
                var isValidData = validateCell(getCellId, getDataType, getColumnName, rRowNo, tCellNo, getDataLimit, getCanNull);
                if (!isValidData) {
                    $(this).addClass('errorRow');
                    isValidRow = false;
                }
            }
        }
        line = line + 1;
    });
    var countWarning = $('#WMSImportTable tr').length - 1;
    var getRowCount = 0;
    if (isContainsHeader) {
        getRowCountheader = $('#WMSImportTable tr').length;
        getRowCount = getRowCountheader - 1;
    }
    else {
        getRowCount = $('#WMSImportTable').length;
    }
    if (getRowCount == 0) {
        $('#lnkValidateCorrection').hide();
        $('#lnkUploadImportData').hide();
        $('#validationMessage').addClass('dataSuccessMessage');
        $('#validationMessage').html(' No Record founds !!');
        $("#lnkUploadImportData").click(function () {
            $('#WMSImportTable').removeClass('errorDataOnly');
            $('#WMSImportTable tr').removeClass('errorRow');
            goToStep(stepImport);
        });
    }
    else {
        var getErrorRowCount = $('#WMSImportTable .errorRow').length;

        if (getErrorRowCount > 0) {
            $('#lnkValidateCorrection').show();
            $('#lnkUploadImportData').hide();
            $('#lnkwmsWizNavActiveImportData').hide();
            $('#validationMessage').html('Errors in ' + getErrorRowCount + ' records !!');
        } else {
            $('#lnkValidateCorrection').hide();
            $('#lnkUploadImportData').show();
            $('#validationMessage').addClass('dataSuccessMessage');
            $('#validationMessage').html('Great! No errors found in your records !!');
            $("#lnkUploadImportData").click(function () {
                $('#WMSImportTable').removeClass('errorDataOnly');
                $('#WMSImportTable tr').removeClass('errorRow');
                goToStep(stepImport);
            });
        }
    }
    // var getRowCount = $('#WMSImportTable').length;

    showDashboardCount();
    $('#validationHolder').show();
}
function validateCell(objCellId, objDataType, objColumnName, rowNo, cellNo, objDataLimit, objCanNull) {
    debugger;
    var isValid = true;
    var getValue = $('#' + objCellId).text();
    // getValue = getValue.replace(/--wmscmm--/g, ',');
    var setMsg = '';

    if ((objDataLimit == '') && (getValue.length == 0) && (objCanNull == "0")) {
        if (objColumnName != 'Lottable1') {
            if (objColumnName != 'Lottable2') {
                if (objColumnName != 'Lottable3') {
                    setMsg = 'The ' + objColumnName + ' should not be blank';
                }
            }
        }
    } else if ((objDataLimit != '') && (getValue.length < parseInt(objDataLimit))) {
        setMsg = 'The ' + objColumnName + ' should contain minimum ' + objDataLimit + ' character.';
    } else if (objDataType == 'float' || objDataType == 'decimal') {
        if (!(isNumber(getValue))) {  //|| getValue.indexOf('.') <= -1
            setMsg = 'Enter valid decimal number for ' + objColumnName + '. Example: 120.25';
        }
    } else if (objDataType == 'number') {
        if (!(isNumber(getValue)) || getValue.indexOf('.') > -1) {
            setMsg = 'Enter valid integer number for ' + objColumnName + '. Example: 120';
        }
    } else if (objDataType == 'dd/mm/yyyy' && objCanNull != '1') {
        var isDateError = false;
        try {
            if (getValue.indexOf('/') <= -1) {
                isDateError = true;
            } else {
                var splitValueForDate = getValue.split('/');
                if (isNaN(splitValueForDate[0]) == true || isNaN(splitValueForDate[1]) == true || isNaN(splitValueForDate[2]) == true) {
                    isDateError = true;
                } else if (splitValueForDate.length < 3 || splitValueForDate.length > 3) {
                    isDateError = true;
                } else if (splitValueForDate[0].length > 2) {
                    isDateError = true;
                } else if (splitValueForDate[1].length > 2) {
                    isDateError = true;
                } else if (splitValueForDate[2].length > 4 || splitValueForDate[2].length < 4) {
                    isDateError = true;
                } else if (splitValueForDate[2] > maxYear || splitValueForDate[2] < minYear) {
                    isDateError = true;
                }// else if (splitValueForDate[0] > 31 || splitValueForDate[0] < 1)
                else if (splitValueForDate[1] > getMaxDate((splitValueForDate[1]), (splitValueForDate[2])) || splitValueForDate[1] < 1) {
                    isDateError = true;
                } else if (splitValueForDate[1] > 12 || splitValueForDate[1] < 1) {
                    isDateError = true;
                }
            }
        } catch (err) {
            isDateError = true;
        }
        if (isDateError) {
            setMsg = 'Enter valid date in format of DD/MM/YYYY for ' + objColumnName + '. Example: 31/12/2020';
        }
    }
    else if (objDataType == 'mm/dd/yyyy' && objCanNull != '1') {
        var isDateError = false;
        try {
            if (getValue.indexOf('/') <= -1) {
                isDateError = true;
            } else {
                var splitValueForDate = getValue.split('/');
                if (isNaN(splitValueForDate[0]) == true || isNaN(splitValueForDate[1]) == true || isNaN(splitValueForDate[2]) == true) {
                    isDateError = true;
                } else if (splitValueForDate[0].length > 2) {
                    isDateError = true;
                } else if (splitValueForDate[1].length > 2) {
                    isDateError = true;
                } else if (splitValueForDate[2].length > 4 || splitValueForDate[2].length < 4) {
                    isDateError = true;
                } else if (splitValueForDate[2] > maxYear || splitValueForDate[2] < minYear) {
                    isDateError = true;
                }// else if (splitValueForDate[1] > 31 || splitValueForDate[1] < 1) 
                else if (splitValueForDate[1] > getMaxDate((splitValueForDate[0]), (splitValueForDate[2])) || splitValueForDate[1] < 1) {
                    isDateError = true;
                } else if (splitValueForDate[0] > 12 || splitValueForDate[0] < 1) {
                    isDateError = true;
                }
            }
        } catch (err) {
            isDateError = true;
        }
        if (isDateError) {
            setMsg = 'Enter valid date in format of MM/DD/YYYY for ' + objColumnName + '. Example: 12/31/2020';
        }
    }
    else if (objDataType == 'yyyy/mm/dd' && objCanNull != '1') {
        var isDateError = false;
        try {
            if (getValue.indexOf('/') <= -1) {
                isDateError = true;
            } else {
                var splitValueForDate = getValue.split('/');
                //    if (splitValueForDate.length < 3 || splitValueForDate.length > 3) {
                if (isNaN(splitValueForDate[0]) == true || isNaN(splitValueForDate[1]) == true || isNaN(splitValueForDate[2]) == true) {

                    isDateError = true;
                } else if (splitValueForDate[1].length > 2) {
                    isDateError = true;
                } else if (splitValueForDate[2].length > 2) {
                    isDateError = true;
                } else if (splitValueForDate[0].length > 4 || splitValueForDate[2].length < 4) {
                    isDateError = true;
                } else if (splitValueForDate[1] > maxYear || splitValueForDate[2] < minYear) {
                    isDateError = true;
                } //else if (splitValueForDate[2] > 31 || splitValueForDate[1] < 1)
                else if (splitValueForDate[1] > getMaxDate((splitValueForDate[1]), (splitValueForDate[0])) || splitValueForDate[1] < 1) {
                    isDateError = true;
                } else if (splitValueForDate[0] > 12 || splitValueForDate[0] < 1) {
                    isDateError = true;
                }
            }
        } catch (err) {
            isDateError = true;
        }
        if (isDateError) {
            setMsg = 'Enter valid date in format of YYYY/MM/DD for ' + objColumnName + '. Example: 2020/12/31';
        }
    }
    if (setMsg != '') {
        isValid = false;
        if (objDataType == 'mm/dd/yyyy') {
            $('#' + objCellId).html('<a href="#" onclick="showDataErrorMsg(this);return false;" data-msg="' + setMsg + '"><i class="fas fa-info-circle"></i></a>' + getValue + '<a href="#" class="btnCalendar" data-id="' + objCellId + '" onclick="showCalendar(this);return false;"><i class="far fa-calendar-alt"></i></a>');
        }
        else if (objDataType == 'dd/mm/yyyy') {
            $('#' + objCellId).html('<a href="#" onclick="showDataErrorMsg(this);return false;" data-msg="' + setMsg + '"><i class="fas fa-info-circle"></i></a>' + getValue + '<a href="#" class="btnCalendar" data-id="' + objCellId + '" onclick="showCalendar(this);return false;"><i class="far fa-calendar-alt"></i></a>');
        }
        else if (objDataType == 'yyyy/mm/dd') {
            $('#' + objCellId).html('<a href="#" onclick="showDataErrorMsg(this);return false;" data-msg="' + setMsg + '"><i class="fas fa-info-circle"></i></a>' + getValue + '<a href="#" class="btnCalendar" data-id="' + objCellId + '" onclick="showCalendar(this);return false;"><i class="far fa-calendar-alt"></i></a>');
        } else {
            $('#' + objCellId).html('<a href="#" onclick="showDataErrorMsg(this);return false;" data-msg="' + setMsg + '"><i class="fas fa-info-circle"></i></a>' + getValue);
            $('#' + objCellId).attr('contenteditable', 'true');
        }
        $('#' + objCellId).attr('data-errorval', getValue);
        $('#' + objCellId).keyup(function () {
            var getOldData = $(this).data('errorval') + '_val';
            var getNewData = $(this).text() + '_val';
            if (getOldData != getNewData) {
                $('#' + objCellId + ' a').remove();
            }
        });
    }
    return isValid;
}
function getMaxDate(month, year) {
    return new Date(year, month, 0).getDate();
}
//function leapyear(year) {
//    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
//}
//function isLeapYear(year) {
//    return year % 4 == 0 &&
//        (year % 100 !== 0 || year % 400 === 0);
//}
function isNumber(objVal) {
    var isNumber = false;
    try {
        var chkNum = objVal / 1;
        if (objVal == chkNum) {
            isNumber = true;
        }
    } catch (err) {
        isNumber = false;
    }
    return isNumber;
}

function showDataErrorMsg(objInfo) {
    var getErrorMsg = $(objInfo).data('msg');
    if (getErrorMsg != 'CatchError' && getErrorMsg != 'TimeOut') {
        alert(getErrorMsg);
        if (getErrorMsg.indexOf('valid decimal') > -1) {
            if (confirm('Do you want to convert all number value of this column to decimal?')) {
                var getParentId = $(objInfo).parent().attr('id');
                var splitParentId = getParentId.split('t');
                var getColumnIndex = splitParentId[1];
                var totalRecordToCheck = $('#WMSImportTable tr').length - 1;
                for (var d = 1; d <= totalRecordToCheck; d++) {
                    var getCellIdToCheck = 'l' + d + 't' + getColumnIndex;
                    var getCellValue = $('#' + getCellIdToCheck).text();
                    if (isNumber(getCellValue)) {
                        if (getCellValue.indexOf('.') <= -1) {
                            $('#' + getCellIdToCheck).html(getCellValue + '.00');
                        }
                    }

                }
                validateTableData();
            }
        }
        if (getErrorMsg.indexOf('valid integer') > -1) {
            if (confirm('Do you want to convert all number value of this column to Number?')) {
                var getParentId = $(objInfo).parent().attr('id');
                var splitParentId = getParentId.split('t');
                var getColumnIndex = splitParentId[1];
                var totalRecordToCheck = $('#WMSImportTable tr').length - 1;
                for (var d = 1; d <= totalRecordToCheck; d++) {
                    var getCellIdToCheck = 'l' + d + 't' + getColumnIndex;
                    var getCellValue = $('#' + getCellIdToCheck).text();
                    if (isNumber(getCellValue)) {
                        if (getCellValue.indexOf('0') <= -1) {
                            $('#' + getCellIdToCheck).html(getCellValue + '0');
                        }
                    }
                    else {
                        $('#' + getCellIdToCheck).html('0');
                    }
                }
                validateTableData();
            }
        }
    }
    else if (getErrorMsg == 'CatchError') {
        var getParentId = $(objInfo).parent().attr('id');
        var splitParentId = getParentId.split('t');
        var rowNo = splitParentId[0].replace('l', '');
        if (confirm('Critical error occured while importing row no. ' + rowNo + '.\n Do you want to skip this row and import remaining?')) {
            var hasSkipRowCSS = $('#WMSImportRow_' + rowNo).hasClass('criticalErrorRow');
            if (!hasSkipRowCSS) {
                $('#WMSImportRow_' + rowNo).addClass('criticalErrorRow');
            }
            sendDataToService();
        }
    } else if (getErrorMsg == 'TimeOut') {
        /* var getParentId = $(objInfo).parent().attr('id');
         var splitParentId = getParentId.split('t');
         var rowNo = splitParentId[0].replace('l', '');
         var fromRow = rowNo;
         var toRow = parseInt(rowNo) + parseInt(batchRecordCount);
         if (confirm('Time out issue occured while importing data from row no. ' + fromRow + ' to ' + toRow +'.\n Do you want to resubmit these row again?')) {            
             sendDataToService();
         }
         */
        if (confirm('Time out issue occured while importing data. \nDo you want to resubmit these row again?')) {
            sendDataToService();
        }
    }
}

function filterDataTable() {
    var filterType = $('#WMSFilterOption').val();
    $('#WMSImportTable').attr('class', 'WMSImportTable ' + filterType);
}

function uploadFinalData() {
    debugger;
    // currentUploadProgress = 0;
    totalRecordToUpload = $('#WMSImportTable tr').length - 1;
    //var upRecordCount = 500;
    intervalProgress = setTimeout(sendDataToService(), 1000);
    $('body').append('<div class="wmsfreezUiBg"></div>');
}

function showDashboardCount() {
    var countCompleted = $('tr.uploadedRow').length;
    var countError = $('tr.errorRow').length;
    //var countWarning = $('tr.criticalErrorRow').length;
    var countWarning = $('#WMSImportTable tr').length - 1;
    var countValidRow = countWarning - countError;

    //if (countCompleted == 0) {
    //    countCompleted = countWarning - countError;
    //}

    $('#wmsCompletedCount').html(countValidRow);
    $('#wmsErrorCount').html(countError);
    $('#wmsWarningCount').html(countWarning);
    // Set counter for progress bar
    $('#prgCompletedCount').html(countCompleted);
    $('#prgErrorCount').html(countError);
    $('#prgWarningCount').html(countWarning);
}

function showProgress() {
    debugger;
    currentUploadProgress = currentUploadProgress + batchRecordCount;
    var currentUploadProgressInPercent = Math.round((currentUploadProgress * 100) / totalRecordToUpload);
    //  document.title = currentUploadProgressInPercent;
    if (currentUploadProgressInPercent > 100) {
        currentUploadProgressInPercent = 100;
    }
    $('.WMSPercentProgress').html(currentUploadProgressInPercent + '% Done');
    $('#WMSProgressBarStatus').css('width', currentUploadProgressInPercent + '%');
    if (currentUploadProgress < totalRecordToUpload) {
        intervalProgress = setTimeout(sendDataToService, 1000);
        showDashboardCount();
    } else {
        showDashboardCount();

        $('body .wmsfreezUiBg').remove();
        $('#divWmsCompletedCount .wmsDashboardCountLabel').html('Completed Record');
        $('#lnkValidateCorrection').html('<i class="fas fa-check-circle"></i>Re-Submit');
        var hasErrorDataOnly = $('#WMSImportTable').hasClass('errorDataOnly');
        if (!hasErrorDataOnly) {
            $('.WMSProgressSubLabel').html('Done. Your data imported successfully...');
            alert('Done. Your data imported successfully...');
            $('#validationMessage').addClass('dataSuccessMessage');
            $('#validationMessage').html('Done. Your data imported successfully...');
            $('#lnkUploadImportData').hide();
            $('#WmsImport_Title_Validate .themeWMSAjaxTabPageTitle span').html('Done... All records imported successfully!!');
            $('#lnkcancel').hide;
            document.getElementById('lnkcancel').style.visibility = 'hidden';
            $('#lnkfinish').hide;
            document.getElementById('lnkfinish').style.visibility = 'visible';
            goToStep(stepValidateFile);
            showLastAsActiveTab();
        } else {
            var errorRowCount = $('#WMSImportTable tr.errorRow').length;
            $('#validationMessage').html('Errors found in ' + errorRowCount + ' records during import !! Please fix it and resubmit record');
            $('#validationMessage').removeClass('dataSuccessMessage');
            $('#validationMessage').show();
            filterDataTable();
            isRevalidate = true;
            currentUploadProgress = 0;
            goToStep(stepValidateFile);
            showLastAsActiveTab();
            $('.WMSPercentProgress').html(0 + '% Done');
            $('#WMSProgressBarStatus').css('width', 0 + '%');
            alert('Done. Your data imported with errors...');
        }
        hideWMSThemeLoading();
    }
}

function showLastAsActiveTab() {
    $('#step_validatefile').removeClass('activeStep');
    var hasActiveSteps = $('#step_import').hasClass('step_import');
    if (!hasActiveSteps) {
        $('#step_import').addClass('activeStep');
    }
}

/*$(document).ready(function () {
    initWmsImport();
});*/

function sendDataToService() {
    debugger;
    var extractHeader = 'RowNo';
    var extractCell = '';
    var templateHeaderCount = templateHeader.length;
    for (var thc = 0; thc < templateHeaderCount; thc++) {
        var splitTemplateHeader = templateHeader[thc].split(":");
        // if (thc != 0) {
        extractHeader += ',' + splitTemplateHeader[0];
        //} else {
        //    extractHeader += splitTemplateHeader[0];
        //}
    }
    var startUploadRowNum = currentUploadProgress + 1;
    var endUploadRowNum = (startUploadRowNum + batchRecordCount) - 1;
    if (endUploadRowNum > totalRecordToUpload) {
        endUploadRowNum = totalRecordToUpload;
    }
    for (line = startUploadRowNum; line <= endUploadRowNum; line++) {
        var isValidRow = true;
        var isHeader = $('#WMSImportRow_' + line).hasClass('WMSImportHeaderRow');
        var isRowUploaded = $('#WMSImportRow_' + line).hasClass('uploadedRow');
        var isCriticalErrorRow = $('#WMSImportRow_' + line).hasClass('criticalErrorRow');
        if ((!isHeader) && (!isRowUploaded) && (!isCriticalErrorRow)) {
            for (var thc = 0; thc < templateHeaderCount; thc++) {
                var getHeaderObj = templateHeader[thc].split(':');
                var getColumnName = getHeaderObj[0];
                var getDataType = getHeaderObj[1];

                var startLine = 0;
                if (isContainsHeader) {
                    startLine = 1;
                }

                var rRowNo = line;
                if (startLine == 0) {
                    rRowNo = line;// + 1;
                }

                var tCellNo = thc + 1;
                var getCellId = 'l' + rRowNo + 't' + tCellNo;

                var cellText = $('#' + getCellId).text();
                if (isHeader || isRowUploaded || isCriticalErrorRow) {
                    cellText = 'skip';
                }
                // var cleanText = '';              
                // cleanText = cellText;
                //  if (thc == 0 && line == startUploadRowNum) {
                if (extractCell == '') {
                    extractCell += line;
                } else if (thc == 0) {
                    extractCell += ',' + line;
                }
                //if (thc == 0 && line == startUploadRowNum) {
                //    extractCell += cellText;
                //}else{
                extractCell += ',' + cellText.replace(/,/g, '--wmscmm--');
                //}
            }
        }
    }
    // alert(extractCell);
    if (extractCell != '') {
        // var getCompanyId = 1;// $('#hdnCompanyId').val();
        // var getCustomerId = 1;// $('#ddlcustomer').val();
        //  var getUserId = 1; $('#hdnUser').val();
        var getImportObject = importObject;// $('#hdnImportObject').val();
        //var getUploadSessionId = '10650_20211012040';// $('#hdnImportSessionId').val();
        var getUploadSessionId = $('#hdnImportSessionId').val();
        var dataObject = {
            "CompanyId": getCompanyID,
            "CustomerId": getCustomerId,
            "UserId": getUserId,
            "WarehouseID": warehouseid,
            "ImportSession": getUploadSessionId,
            "Object": getImportObject,
            "StartRowNo": startUploadRowNum,
            "Header": extractHeader,
            "Content": extractCell

        }
        var dataParentObject = {
            "ImportSaveRequest": dataObject
        }
        // var wmsapipathimport = 'http://localhost:50068/api/staging/v1/';
        //var apiPath = wmsapipathimport + 'SaveImport';

        // var apiPath = 'http://localhost:5013/api/Import/SaveImport'

        var apiPath = wmsApiPathimp + 'SaveImport';

        jQuery.ajax({
            type: "POST",
            //**url: "https://w5production.westcoastwarehouse.com/ImportService/DImportService.svc/ImportRequst",
            // url: "save-import.ashx?sr=" + startUploadRowNum + "&er=" + endUploadRowNum + "&revalidate=" + isRevalidate,

            url: apiPath,

            // beforeSend: function (request) {
            //     // request.setRequestHeader("apikey", "************************");
            // },
            beforeSend: function (request) {
                request.setRequestHeader("api-request-key", wmsApiRequestKey);
                request.setRequestHeader("api-access-key", wmsApiAccessKey);
                showWMSThemeLoading();
            },
            data: JSON.stringify(dataParentObject),
            //data: dataParentObject,
            dataType: "json",
            contentType: "application/json",
            success: function (data, textStatus, jQxhr) {
                var status = data.Status;
                serverResponseReader(data, startUploadRowNum, endUploadRowNum);

            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    } else {
        showProgress();
    }
}

function createSession() {
    var myDate = new Date();
    var milliseconds = myDate.getTime();
    $('#hdnImportSessionId').val(milliseconds);
}

function findIndexOfCell(columnName) {
    debugger;
    var colIndex = -1;
    for (var h = 0; h <= templateHeader.length; h++) {
        var splitHeaderCol = templateHeader[h].split(":");
        if (splitHeaderCol[0] == columnName) {
            colIndex = h + 1;
            break;
        }
    }
    return colIndex;
}

function serverResponseReader(response, startUploadRowNum, endUploadRowNum) {
    debugger;
    var myJSON = JSON.stringify(response);
    // alert(myJSON);
    // var jsonResponse = JSON.parse(response);
    var serverResult = response["Status"];
    var serverStatusCode = response["StatusCode"];
    var serverFailRows = response["Result"];
    //var serverResult = response["ImportRequstResult"]["Status"];
    // var serverStatusCode = response["ImportRequstResult"]["StatusCode"];
    //var serverFailRows = response["ImportRequstResult"]["Result"];

    /*
    //$('.WMSImportRow').removeClass('errorRow');
    //$('.WMSImportRow td').removeAttr('contenteditable');
    */
    /*
    for (var i = startUploadRowNum; i <= endUploadRowNum; i++) {
        var hasUploadRowClass = $('#WMSImportRow_' + i).hasClass('uploadedRow');
        if (!hasUploadRowClass) {
            $('#WMSImportRow_' + i).addClass('uploadedRow');
        }
    }*/

    if (serverResult == "Success") {
        isRevalidate = false;
        /* for (var i = startUploadRowNum; i <= endUploadRowNum; i++) {
            var hasUploadRowClass = $('#WMSImportRow_' + i).hasClass('uploadedRow');
            if (!hasUploadRowClass) {
                $('#WMSImportRow_' + i).addClass('uploadedRow');
            }
        }*/
        markRowAsCompleted(startUploadRowNum, endUploadRowNum, false, 0);
        showProgress();
    } else {
        /* Display server error row */
        // var splitErrorGroup = serverFailRows.split("$");
        // for (var seg = 1; seg < splitErrorGroup.length; seg++) {
        // var splitErrorGroupRow = serverFailRows.split("|");
        // var splitErrorGroupRow = splitErrorGroup[seg].split("|");
        var errorRowCount = 0;
        var getCriticalErrorRow = '';
        var getTimeoutErrorRow = '';
        if (serverFailRows.indexOf('|') > -1) {
            var splitErrorGroupRow = serverFailRows.split("|");
            for (var ssr = 1; ssr < splitErrorGroupRow.length; ssr++) {
                if (splitErrorGroupRow[ssr].indexOf('CatchError') > -1) {
                    getCriticalErrorRow = splitErrorGroupRow[ssr];
                }
                showErrorRow(splitErrorGroupRow[ssr]);
            }
            errorRowCount = splitErrorGroupRow.length;
        } else {
            showErrorRow(serverFailRows);
            errorRowCount = 1;
            if (serverFailRows.indexOf('CatchError') > -1) {
                getCriticalErrorRow = serverFailRows;
            } else if (serverFailRows.indexOf('TimeOut') > -1) {
                getTimeoutErrorRow = serverFailRows;
            }
        }

        // ADD ERROR CLASS TO TABLE
        var hasErrorDataOnly = $('#WMSImportTable').hasClass('errorDataOnly');
        if (!hasErrorDataOnly) {
            $('#WMSImportTable').addClass('errorDataOnly');
        }
        $('#WMSFilterOption').val('errorDataOnly');

        // REVERT UPLOADED CLASS INCASE OF CATCH ERROR
        if (getCriticalErrorRow != '') {
            var splitCriticalErrorItem = getCriticalErrorRow.split(":");
            var ctrErr_RowNo = splitCriticalErrorItem[0];
            var ctrErr_Column = splitCriticalErrorItem[1];
            var ctrErr_Error = splitCriticalErrorItem[2];
            markRowAsCompleted(startUploadRowNum, endUploadRowNum, true, parseInt(ctrErr_RowNo));

            /*
            for (var i = (parseInt(ctrErr_RowNo) + 1); i <= endUploadRowNum; i++) {
                var hasUploadRowClass = $('#WMSImportRow_' + i).hasClass('uploadedRow');
                if (hasUploadRowClass) {
                    $('#WMSImportRow_' + i).removeClass('uploadedRow');
                }
            }
            */
            sendDataToService();
        } else if (getTimeoutErrorRow != '') {
            for (var i = startUploadRowNum; i <= endUploadRowNum; i++) {
                $('#WMSImportRow_' + i).removeClass('uploadedRow');
                $('#WMSImportRow_' + i).removeClass('errorRow');
            }
            sendDataToService();
        } else {
            markRowAsCompleted(startUploadRowNum, endUploadRowNum, false, 0);
            showProgress();
        }
        // REVERT UPLOADED CLASS INCASE OF CATCH ERROR
        // }

        // TEMP COMMENTED TO MOVE FORWARD
        /*
        $('#validationMessage').html('Errors found in ' + errorRowCount + ' records during import !! Please fix it and resubmit record');
        $('#validationMessage').removeClass('dataSuccessMessage');       
        $('#validationMessage').show();
        filterDataTable();
        isRevalidate = true;
        goToStep(stepValidateFile);
        */
        // TEMP COMMENTED TO MOVE FORWARD

    }
}

function markRowAsCompleted(startUploadRowNum, endUploadRowNum, isCriticalError, criticalErrorNo) {
    for (var i = startUploadRowNum; i <= endUploadRowNum; i++) {
        if (isCriticalError) {
            if (i == criticalErrorNo) {
                var hasCriticalRowClass = $('#WMSImportRow_' + i).hasClass('criticalErrorRow');
                if (!hasCriticalRowClass) {
                    $('#WMSImportRow_' + i).addClass('criticalErrorRow');
                }
                i = i + 1;
            }
        }
        var hasErrorRowClass = $('#WMSImportRow_' + i).hasClass('errorRow');
        if (!hasErrorRowClass) {
            $('#WMSImportRow_' + i).addClass('uploadedRow');
        }
    }
}

function showErrorRow(errorString) {
    debugger;
    var splitErrorItem = errorString.split(":");
    var ssr_RowNo = splitErrorItem[0];
    var ssr_Column = splitErrorItem[1];
    var ssr_Error = splitErrorItem[2];
    //$('#WMSImportRow_' + i).removeClass('uploadedRow');
    var hasErrorRowCss = $('#WMSImportRow_' + ssr_RowNo).hasClass('errorRow');
    if (!hasErrorRowCss) {
        $('#WMSImportRow_' + ssr_RowNo).removeClass('uploadedRow');
        $('#WMSImportRow_' + ssr_RowNo).addClass('errorRow');
    }
    var indexOfCell = findIndexOfCell(ssr_Column);
    var objCellId = 'l' + ssr_RowNo + 't' + indexOfCell;
    var readCellText = $('#' + objCellId).text();
    $('#' + objCellId).html('<a href="#" onclick="showDataErrorMsg(this);return false;" data-msg="' + ssr_Error + '"><i class="fas fa-info-circle"></i></a>' + readCellText);
    $('#' + objCellId).attr('contenteditable', 'true');
}

function allowDrop(ev) {
    $('.WMSdragDropHolder').addClass('fileDragOver');
    ev.preventDefault();
}

function removeDrop(ev) {
    $('.WMSdragDropHolder').removeClass('fileDragOver');
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    $('.WMSdragDropHolder').removeClass('fileDragOver');
    ev.preventDefault();
    var data = ev.dataTransfer.files;
    if (data) {
        showFiles(data);
    }
}
function showFiles(files) {
    var isValidFile = false;
    if (files[0]) {
        file = files[0];
        fileName = files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace('{count}', files.length) : files[0].name;
        $('.WMSdragDropLabel').text(fileName);
        var getFileNameLength = fileName.length;
        var getExtension = fileName.substring(getFileNameLength - 4, getFileNameLength);
        var getBigExtension = fileName.substring(getFileNameLength - 5, getFileNameLength);
        if ((currentFileType == 'CSV') && (getExtension == '.csv')) {
            isValidFile = true;
        } else if ((currentFileType == 'Text') && ((getExtension == '.txt') || (getBigExtension == '.text') || (getExtension == '.TXT') || (getExtension == '.TEXT'))) {
            generateTextPreview();
            isValidFile = true;
        } else if ((currentFileType == 'Excel') && ((getExtension == '.xls') || (getExtension == '.XLS') || (getBigExtension == '.xlsx') || (getBigExtension == '.XLSX'))) {
            isValidFile = true;
        } else {
            $('.WMSdragDropLabel').text('Drag and drop files here to import');
            alert('Select valid \'' + currentFileType + '\' file');
        }
        if (isValidFile) {
            if (currentFileType == 'Excel') {
                $('#pnlFieldSaparator').hide();
                // convertExcelToCSV();
            } else {
                $('#pnlFieldSaparator').show();
                //showFileOptionPoup(currentFileType);
            }
            readAndGetFileContent();
        }
    }
};

function convertExcelToCSV() {
    // var fileUpload = $("#FileUpload1").get(0);
    // var files = fileUpload.files;
    debugger;

    var wmsApiRequestKey = "";
    var wmsApiAccessKey = "";
    wmsApiRequestKey = mBrillWmsSession.getApiRequestKey();
    wmsApiAccessKey = mBrillWmsSession.getApiAccessKey();


    var frmFile = new FormData();
    frmFile.append(file.name, file);

    //var apiPath = wmsApiPathimp + 'ConvertExcelToCSV?filename=' + file.name;
    var apiPath = 'http://localhost:5013/api/ExcelToCSV/' + 'ConvertExcelToCSV?filename=' + file.name;

    //http://localhost:5013/api/Import/ConvertExcelToCSV?filename=Client_19112024_042200.xlsx
    ///api/ExcelToCSV/ConvertExcelToCSV

    showWMSThemeLoading();
    $.ajax({
        url: apiPath,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function (request) {
            request.setRequestHeader("api-request-key", wmsApiRequestKey);
            request.setRequestHeader("api-access-key", wmsApiAccessKey);
            showWMSThemeLoading();
        },
        data: frmFile,
        success: function (result) {
            //  alert(result);
            if ((result != 'Error') || (result != '')) {
                $('#txtCSVdata').val(result);
                hideWMSThemeLoading();
                showFileOptionPoup(currentFileType);
                //loadHeader();
            }
            else {
                alert("Something went wrong.")
            }
        },
        error: function (err) {
            alert(err.statusText);
        }
    });







}

function showFileOptionPoup() {
    $('#WmsImportOptionPopup').show();
    var getWinWidth = $(window).width();
    var getWinHeight = $(window).height();
    var getPopupWidth = $('#WmsImportOptionPopup .themeWmsPopupContent').width();
    var getPopupHeight = $('#WmsImportOptionPopup .themeWmsPopupContent').height();

    var getLeftPos = (getWinWidth - getPopupWidth) / 2;
    var getTopPos = (getWinHeight - getPopupHeight) / 2;

    $('#WmsImportOptionPopup .themeWmsPopupContent').css('left', getLeftPos + 'px');
    $('#WmsImportOptionPopup .themeWmsPopupContent').css('top', getTopPos + 'px');

}

function getIsContainsHeader() {
    var isHeader = false;
    var selObjVal = $('#txtIsHeader').val();
    if (selObjVal == 'yes') {
        isHeader = true;
    } else {
        isHeader = false;
    }
    return isHeader;
}
//function downloadTemplate(tmpltype) {
//    disablemessages = 'Yes';
//    var CustomerId = $('#ddlcustomer').val();
//    if (CustomerId != '0') {
//       // var templateId=
//        var objectName = hdnImportObject.value
//        window.location.href = "DownloadTemplate.ashx?tid=" + templateId + "&type=" + tmpltype + "&ObjectName=" + objectName;
//    } else {
//        alert('Select customer first!!');
//    }
//    disablemessages = 'No';
//}





// function downloadTemplate(tmpltype) {
//     disablemessages = 'Yes';

//     debugger;
//     var apiPath = 'http://localhost:5242/api/DownloadTemplate/generateimpTemplate';
//     var postData = {
//         templateid: templateId,
//         FileType: tmpltype,
//         Object: importObject
//     };

//     if (templateId !== '0') {
//         callHttpUrl1(apiPath, postData, function (data) {
//             console.log("API Response:", data); // Log the full response for debugging
//             var getCode = data.statusCode;
//             var getStatus = data.status.toLocaleLowerCase();

//             if (getStatus === "success") {
//                 var getImportfilepath = data.result;
//                 var pathexc = "http://localhost:5242/wwwroot" + getImportfilepath;

//                 console.log("Generated file path:", pathexc);

//                 // Open the file in a new window/tab
//                 window.open(pathexc, '_blank');
//             } else {
//                 alert('Failed to download template!!');
//             }
//         });
//     } else {
//         alert('Error to load template details for selected customer!!');
//     }

//     disablemessages = 'No';
// }

function downloadTemplate(tmpltype) {
    disablemessages = 'Yes';

    var apiPath = 'http://localhost:5242/api/DownloadTemplate/generateimpTemplate';
    var postData = {
        templateid: templateId,
        FileType: tmpltype,
        Object: importObject
    };

    if (templateId !== '0') {
        callHttpUrl1(apiPath, postData, function (data) {
            console.log("API Response:", data); // Log the full response for debugging
            var getCode = data.statusCode;
            var getStatus = data.status.toLocaleLowerCase();

            if (getStatus === "success") {
                var getImportfilepath = data.result;
                var pathexc = "http://localhost:5242" + getImportfilepath;

                console.log("Generated file path:", pathexc);

                // Open the file in a new window/tab
                window.open(pathexc, '_blank');
            } else {
                alert('Failed to download template!!');
            }
        });
    } else {
        alert('Error to load template details for selected customer!!');
    }

    disablemessages = 'No';
}










function confirmExit() {
    if (disablemessages == 'No') {
        var confirmResult = true;
        console.log("Confirm before leaving page !!!!");
        if (totalRecordToUpload != 0) {
            if (currentUploadProgress == totalRecordToUpload) {
                var hasErrorDataOnly = $('#WMSImportTable').hasClass('errorDataOnly');
                if (hasErrorDataOnly) {
                    //confirmResult = confirm("Do you want to cancel import and leave page?\nThis will stop current import and you may loss any un-imported data.");
                    confirmResult = false;
                } else {
                    confirmResult = true;
                }
            } else {
                //confirmResult = confirm("Do you want to cancel import and leave page?\nThis will stop current import and you may loss any un-imported data.");
                confirmResult = false;
            }
        }
        return confirmResult;
    }
    else { }
}
function readAndGetFileContent() {
    var fileContent = "";
    if (currentFileType != 'Excel') {
        showWMSThemeLoading();
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            fileContent = this.result;
            $('#txtCSVdata').val(this.result);
            hideWMSThemeLoading();
            // loadHeader();
            showFileOptionPoup();
        };
        reader.onerror = function (evt) {
            document.getElementById("fileOutput").innerHTML = "error reading file";
        };
    } else {
        $('#pnlFieldSaparator').hide();
        convertExcelToCSV();
        //fileContent = $('#txtCSVdata').val();
    }
    // return fileContent;
}

/* TEXT COLUMN DEFINER CONTROL */
var markupCount = 0;
function generateTextPreview() {
    //alert('Generating Preview...');
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        var strLines = '';
        var lines = this.result.split('\n');
        if (lines[0] != "") {
            var previewLineCount = 5;
            if (lines.length < 5) {
                previewLineCount = lines.length;
            }
            $('.rulerMarkupLine').remove();
            $('#textPreviewContent').html("");
            var previewLines = "";
            var maxLength = 0;
            for (var line = 0; line < previewLineCount; line++) {
                var rRowNo = line;
                if (lines[line] != "") {
                    var lineToChar = lines[line].split('');
                    var charHtml = '';

                    for (var ch = 0; ch < lineToChar.length; ch++) {
                        charHtml += '<div class="previewChar previewChar_' + ch + '">' + lineToChar[ch] + '</div>';
                        if (lineToChar.length > maxLength) {
                            maxLength = lineToChar.length;
                        }
                    }
                    previewLines += charHtml + '<br />';
                    $('#textPreviewContent').html('<div id="divRuler" class="divRuler">&nbsp;</div>' + previewLines);
                    var rulerLines = '';
                    var rulerLineCounter = 0;
                    for (var rl = 0; rl < maxLength; rl++) {
                        rulerLineCounter = rulerLineCounter + 1;
                        if (rulerLineCounter == 5) {
                            rulerLines += '<div class="divRulerLine divRulerBigLine" data-selected="no" id="divRulerLine_' + rl + '" data-index="' + rl + '">&nbsp;</div>';
                            rulerLineCounter = 0;
                        } else {
                            rulerLines += '<div class="divRulerLine" data-selected="no" id="divRulerLine_' + rl + '" data-index="' + rl + '">&nbsp;</div>';
                        }
                    }
                    var rulerWidth = maxLength * 12;
                    $('#divRuler').html(rulerLines);
                    $('#divRuler').css('width', rulerWidth + 'px');
                    $('.divRulerLine').mouseenter(function () {
                        var rulerLineIsSelected = $(this).data('selected');
                        if (rulerLineIsSelected == 'no') {
                            var rulerLineIndex = $(this).data('index');
                            var getLeftMarkupPos = (Number(rulerLineIndex + 1) * 12) - 1;
                            $('.textPreview').append('<div class="rulerMarkupLine rulerMarkupLine_' + rulerLineIndex + '" style="left:' + getLeftMarkupPos + 'px;">&nbsp;</div>');
                        }
                    });
                    $('.divRulerLine').mouseleave(function () {
                        var rulerLineIsSelected = $(this).data('selected');
                        if (rulerLineIsSelected == 'no') {
                            var rulerLineIndex = $(this).data('index');
                            $('.rulerMarkupLine_' + rulerLineIndex).remove();
                        }
                    });
                    $('.divRulerLine').click(function () {
                        var rulerLineIsSelected = $(this).data('selected');
                        var rulerLineIndex = $(this).data('index');
                        var getLeftMarkupPos = (Number(rulerLineIndex + 1) * 12) - 1;
                        if (rulerLineIsSelected == 'no') {
                            $(this).data('selected', 'yes');
                            markupCount = markupCount + 1;
                            $('.textPreview').append('<div class="finalRulerMarkupLine rulerMarkupLine rulerMarkupLine_' + rulerLineIndex + '" data-index="' + rulerLineIndex + '" style="left:' + getLeftMarkupPos + 'px;">&nbsp;</div>');
                        } else {
                            $(this).data('selected', 'no');
                            markupCount = markupCount - 1;
                            $('.rulerMarkupLine_' + rulerLineIndex).remove();
                        }
                    });
                }
            }
        }
    }
    reader.onerror = function (evt) {
        var err = "error reading file";
    }
}

function saveFileOption() {
    if (currentFileType == 'Text') {
        var getSaparatorVal = $('#txtFieldSaparator').val();
        if (getSaparatorVal == 'fixwidth') {
            var getFixWidthSep = $('.finalRulerMarkupLine');
            var getFixWidthSepCount = getFixWidthSep.length;
            var getHeaderCount = templateHeader.length;
            var breakLinesRequired = getHeaderCount - 1;
            if (getFixWidthSepCount > (breakLinesRequired - 1)) {
                var fileContent = $('#txtCSVdata').val();
                var tLines = fileContent.split('\n');
                for (var tLine = 0; tLine < tLines.length; tLine++) {
                    if (tLines[tLine] != "") {

                        //strLines = '<tr class="WMSImportRow" id="WMSImportRow_' + rRowNo + '"><td class="WMSRowNo">' + rRowNo + '</td>';
                        // dataLines = lines[line];
                        // var csvContent = dataLines.split(charToSplit);
                        var convLine = '';
                        var convStartIndex = 0;
                        for (var br = 0; br < getFixWidthSepCount; br++) {
                            var getBrLineIndex = $(getFixWidthSep[br]).data('index');
                            if (br != 0) {
                                convLine += '[-tb-]' + tLines[tLine].substring(convStartIndex, getBrLineIndex);
                            } else {
                                convLine += tLines[tLine].substring(convStartIndex, getBrLineIndex);
                            }
                            convStartIndex = getBrLineIndex + 1;
                        }
                        //alert(convLine);
                        $('#txtTextdata').append(convLine + '\n');
                        // strLines += '</tr>';
                        // $('#WMSImportTable').append(strLines);
                    }
                }
                var finalTextData = $('#txtTextdata').val();
                $('#txtCSVdata').val(finalTextData);
                loadHeader();
            } else {
                alert('Please add required break lines in text preview.\n\nUser Break Lines: ' + getFixWidthSepCount + '\nMinimum Required Break Lines: ' + breakLinesRequired);
            }
            //alert(getFixWidthSepCount);
        } else {
            loadHeader();
        }
    }
    else {
        loadHeader();
    }

    // loadHeader();
}
function cancleImport() {
    //$('#validationMessage').html('User cancelled data import');
    //$('#validationMessage').removeClass('dataSuccessMessage');
    //$('#validationMessage').show();
    //$('#WmsImport_Title_Validate .themeWMSAjaxTabPageTitle span').html('Import Cancelled!!');
    //$('#lnkUploadImportData').hide();

    //goToStep(stepValidateFile);
    //showLastAsActiveTab();
    //$('body .wmsfreezUiBg').remove();
    alert('You have cancelled data import.');
    wmsNavigatePage('Import');

    //location.reload();
}
function FinishImport() {
    debugger;
    var getImportObjectName = importObject;// $('#hdnImportObject').val();
    var url = "";
    if (getImportObjectName == 'Product') {
        //loadAdminPages('pnlProductMaster'); 
        wmsNavigatePage('Import');
        // window.location.href = '../Product/ProductMaster.aspx';
        // wmsNavigatePage('ProductMaster');

    }
    else if (getImportObjectName == 'DomesticOrder') {
        window.location.href = '../WMS/DomesticList.aspx';

    }
    else if (getImportObjectName == 'DomesticTransfer') {
        window.location.href = '../WMS/DomesticList.aspx';

    }
    else if (getImportObjectName == 'PurchaseOrder') {
        wmsNavigatePage('Inward');
        // window.location.href = '../WMS/InboundList.aspx?JID=0';       

    }
    else if (getImportObjectName == 'ContainerTransfer') {
        window.location.href = '../WMS/ContainerList.aspx';
    }
    else if (getImportObjectName == 'SalesOrder') {
        wmsNavigatePage('Outward');
        // window.location.href = '../WMS/SalesOrderList.aspx?JID=0';

    }
    else if (getImportObjectName == 'ContainerOrder') {
        window.location.href = '../WMS/ContainerList.aspx';
    }
    else if (getImportObjectName == 'Cyclecount') {
        //loadAdminPages('pnlCycleCount');
        wmsNavigatePage('Import');
        // window.location.href = '../Warehouse/CycleCount.aspx';

    }
    else if (getImportObjectName == 'Location') {
        //window.location.href = '../Warehouse/WarehouseMaster.aspx';
        // wmsNavigatePage('WarehouseMaster');
        //loadAdminPages('pnlWarehouseMaster');
        wmsNavigatePage('Import');
    }
    else {
        alert("error...");
    }

}
function showFindReplacePoup() {
    $('#WmsImportFindReplacePopup').show();
    var getWinWidth = $(window).width();
    var getWinHeight = $(window).height();
    var getPopupWidth = $('#WmsImportFindReplacePopup .themeWmsPopupContent').width();
    var getPopupHeight = $('#WmsImportFindReplacePopup .themeWmsPopupContent').height();

    var getLeftPos = (getWinWidth - getPopupWidth) / 2;
    var getTopPos = (getWinHeight - getPopupHeight) / 2;

    $('#WmsImportFindReplacePopup .themeWmsPopupContent').css('left', getLeftPos + 'px');
    $('#WmsImportFindReplacePopup .themeWmsPopupContent').css('top', getTopPos + 'px');
    var templateHeaderCount = templateHeader.length;
    BindddlColumn(templateHeaderData);
}
function BindddlColumn(result) {
    //result = templateHeader[];
    document.getElementById(ddlcolumn).options.length = 0;
    // $('#ddlcolumn').val() = 0;
    for (var i in result) {
        AddOption12(result[i].Name, result[i].Id);
    }
}

function AddOption12(text, value) {
    var option12 = document.createElement('option');
    option12.value = value;
    option12.innerHTML = text;
    document.getElementById(ddlcolumn).options.add(option12);
}
/* TEXT COLUMN DEFINER CONTROL */

$(document).ready(function () {
    $('#btnCloseImportPopup').click(function () {
        $('#WmsImportOptionPopup').hide();
    });
});