var isLottableBindingDone = 'no';

$(document).ready(function () {
    loadPickingOrderDetail();
});

function HideLottableCell(startlot) {
    for (var lot = startlot + 1; lot <= 10; lot++) {
        $('.invLotHead[data-lotindex="' + lot + '"]').hide();
        $('.invProductGridCell[data-lotlabel="Lottable' + lot + '"]').hide()
    }
}


function loadPickingOrderDetail() {
    restoreTemplate();
    var reportUserId = mBrillWmsSession.getUserId();
    var reportDetailId = mBrillWmsSession.getReportDetailId();
    var reportLottableFilter = getLottableFilterValues();
    var apiPath = wmsApiPath + 'Report/GetPickingdetail';
    var postData =
    {
        "ID": reportDetailId,
        "UserId": reportUserId,
        "filterLottable": reportLottableFilter
    };
    loadDetailReport(apiPath, postData, function (data) {
        bindWmsData();
        var getLottableHeader = data.Result.Table4;
        bindLottableHeader(getLottableHeader);
    });
};

// function exportCSVAtPickingDT() {
//     debugger;
//     var apiPath = wmsApiPath + 'Report/PickingDetailsExportCsv';
//     var reportUserId = mBrillWmsSession.getUserId();
//     var reportDetailId = mBrillWmsSession.getReportDetailId();
//     var wmsApiRequestKeytemp = mBrillWmsSession.getApiRequestKey();
//     var wmsApiAccessKeytemp = mBrillWmsSession.getApiAccessKey();

//     var postData =
//     {
//         "reportDetailId": reportDetailId,
//         "UserId": reportUserId
//     }
//     var getCSVDownloadForm = $('#frmReportCsvDownload');
//     if (getCSVDownloadForm.length == 0) {
//         $('body').append('<form id="frmReportCsvDownload" method="POST" action="' + apiPath + '" target="_blank">' +
//             '<input type="hidden" name="reportDetailId" class="reportDetailId" id="reportDetailId" value="' + reportDetailId + '" />' +
//             '<input type="hidden" name="UserId" id="UserId" class="UserId" value="' + reportUserId + '" />' +
//             '<input type="hidden" name="api-request-key" id="api-request-key" class="api-request-key" value="' + wmsApiRequestKeytemp + '" />' +
//             '<input type="hidden" name="api-access-key" id="api-access-key" class="api-access-key" value="' + wmsApiAccessKeytemp + '" />' +
//             '</form>');
//     } else {
//         $('#frmReportCsvDownload .reportDetailId').val(reportDetailId);
//         $('#frmReportCsvDownload .UserId').val(reportUserId);
//         $('#frmReportCsvDownload .api-request-key').val(wmsApiRequestKeytemp);
//         $('#frmReportCsvDownload .api-access-key').val(wmsApiAccessKeytemp);
//     }
//     $('#frmReportCsvDownload').submit();
//     // callHttpUrl(apiPath, postData, function(data)
//     // {
//     //     window.open(window.URL.createObjectURL(new Blob([data.Result.Table1], { type: "text/csv" })),'self');
//     // });

//     // callHttpUrl(apiPath, postData, function(data)
//     // {
//     //     var a = document.createElement("a");
//     //     a.href = window.URL.createObjectURL(new Blob([data], { type: "text/plain" }));
//     //     a.download = "dk.csv";
//     //     a.click();
//     //    // window.open(data.Result,'self');
//     //     // var isSuccess = data.Status;
//     //     // if (isSuccess == "200")
//     //     // {
//     //     // }
//     //     // else 
//     //     // {
//     //     //     var res = data.Result;
//     //     //     $(dataobj).val(actqty);
//     //     //     alert(res.Message);
//     //     // }
//     // });
// }


// function exportCSVAtPickingDT() {
//     debugger;
//     //var apiPath = wmsApiPath + 'Report/PickingDetailsExportCsvStatus';
//     var apiPath = 'http://localhost:5230/api/staging/v1/Report/PickingDetailsExportCsv';
//     var reportUserId = mBrillWmsSession.getUserId();
//     var reportDetailId = mBrillWmsSession.getReportDetailId();
//     var wmsApiRequestKeytemp = mBrillWmsSession.getApiRequestKey();
//     var wmsApiAccessKeytemp = mBrillWmsSession.getApiAccessKey();

//     var getCSVDownloadForm = $('#frmReportCsvDownload');
//     if (getCSVDownloadForm.length == 0) {
//         $('body').append('<form id="frmReportCsvDownload" method="POST" action="' + apiPath + '" target="_blank">' +
//             '<input type="hidden" name="reportDetailId" class="reportDetailId" id="reportDetailId" value="' + reportDetailId + '" />' +
//             '<input type="hidden" name="UserId" id="UserId" class="UserId" value="' + reportUserId + '" />' +
//             '<input type="hidden" name="api-request-key" id="api-request-key" class="api-request-key" value="' + wmsApiRequestKeytemp + '" />' +
//             '<input type="hidden" name="api-access-key" id="api-access-key" class="api-access-key" value="' + wmsApiAccessKeytemp + '" />' +
//             '</form>');
//     } else {
//         $('#frmReportCsvDownload .reportDetailId').val(reportDetailId);
//         $('#frmReportCsvDownload .UserId').val(reportUserId);
//         $('#frmReportCsvDownload .api-request-key').val(wmsApiRequestKeytemp);
//         $('#frmReportCsvDownload .api-access-key').val(wmsApiAccessKeytemp);
//     }
//     $('#frmReportCsvDownload').submit();
// }

function exportCSVAtPickingDT() {
    debugger;
    var apiPath = wmsApiPath + 'Report/PickingDetailsExportCsv';
    // var apiPath = 'http://localhost:5230/api/staging/v1/Report/PickingDetailsExportCsv';
    var reportUserId = mBrillWmsSession.getUserId();
    var reportDetailId = mBrillWmsSession.getReportDetailId();
    var wmsApiRequestKeytemp = mBrillWmsSession.getApiRequestKey();
    var wmsApiAccessKeytemp = mBrillWmsSession.getApiAccessKey();

    var postData = {
        "reportDetailId": reportDetailId,
        "UserId": reportUserId
    };

    $.ajax({
        url: apiPath,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        headers: {
            'api-request-key': wmsApiRequestKeytemp,
            'api-access-key': wmsApiAccessKeytemp
        },
        xhrFields: {
            responseType: 'blob' // Important for handling the binary data in response
        },
        success: function (response, status, xhr) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(response);
            var contentDisposition = xhr.getResponseHeader('Content-Disposition');
            var filename = "PickingReport.csv";

            if (contentDisposition) {
                var match = contentDisposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }

            a.href = url;
            a.download = filename;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('CSV export failed:', textStatus, errorThrown);
        }
    });
}




function bindLottableHeader(lotHeader) {
    debugger;
    if (isLottableBindingDone != "yes") {
        $('#pnlLotConfigHolder .pnlLotConfigCell').html('');
        var getLengthHalf = Math.round(lotHeader.length / 2);
        var lotcntv = lotHeader.length;
        if (lotHeader.length > 0) {
            for (var lt = 0; lt < lotHeader.length; lt++) {
                var lotHeaderLabel = lotHeader[lt].Lottable;
                $('.invLotHead[data-lotindex="' + lt + '"]').html(lotHeaderLabel);
                var lotNum = lt + 1;
                //lotcntv = lt + 1;
                $('#pnlLotConfigHolder .pnlLotConfigCell').append('<div class="invLottableChkItem"><input type="checkbox" value="" id="" data-lotlabel="Lottable' + lotNum + '" data-lottype="' + lotHeaderLabel + '" /> ' + lotHeaderLabel + '</div>');

            }
            HideLottableCell(lotcntv);
            $('.invLotCell').each(function () {
                var lotHtml = $(this).html().trim();
                if (lotHtml == '0') {
                    $(this).html('');
                }
            });
        }
        else {
            $('#btnFilterLottable').hide();

            HideLottableCell(0);
        }
        isLottableBindingDone = "yes";
    }
}


function getLottableFilterValues() {
    var selectedLottable = '';
    var getLotLen = $('#pnlLotConfigHolder .invLottableChkItem').length;
    $('.invLotHead').show();
    $('.invLotCell').show();
    if (getLotLen > 0) {
        $('#pnlLotConfigHolder .invLottableChkItem').each(function () {
            var chkLot = $(this).find('input[type="checkbox"]');
            var isChkSelected = $(chkLot).prop('checked');
            var getLotLabel = $(chkLot).attr('data-lotlabel');
            if (isChkSelected) {
                if (selectedLottable.trim() == '') {
                    selectedLottable = getLotLabel;
                } else {
                    selectedLottable = selectedLottable + ',' + getLotLabel;
                }
                $('.gridLottable .invLotHead[data-lotlabel="' + getLotLabel + '"]').show();
                $('.gridLottable .invLotCell[data-lotlabel="' + getLotLabel + '"]').show();
            } else {
                $('.gridLottable .invLotHead[data-lotlabel="' + getLotLabel + '"]').hide();
                $('.gridLottable .invLotCell[data-lotlabel="' + getLotLabel + '"]').hide();
            }
        });
        HideLottableCell(getLotLen);
    } else {
        selectedLottable = 'all';
    }
    // alert(selectedLottable);
    return selectedLottable;
}
function saveLottableConfiguration() {
    //getLottableFilterValues();
    loadPickingOrderDetail();
    $('#wms-srv-lottableconfig-popup').hide();
}
function showLottableConfiguration() {
    $('#wms-srv-lottableconfig-popup').show();
    $('#wms-srv-lottableconfig-popup-close').off();
    $('#wms-srv-lottableconfig-popup-close').click(function () {
        $('#wms-srv-lottableconfig-popup').hide();
    });
}