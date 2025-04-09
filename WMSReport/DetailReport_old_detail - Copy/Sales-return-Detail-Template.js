var isLottableBindingDone = 'no';

$(document).ready(function () {
    loadsalesreturnOrderDetail();
});


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
function HideLottableCell(startlot) {
    for (var lot = startlot + 1; lot <= 10; lot++) {
        $('.invLotHead[data-lotindex="' + lot + '"]').hide();
        $('.invProductGridCell[data-lotlabel="Lottable' + lot + '"]').hide()
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


function loadsalesreturnOrderDetail() {
    var reportUserId = mBrillWmsSession.getUserId();
    var reportDetailId = mBrillWmsSession.getReportDetailId();
    var reportLottableFilter = getLottableFilterValues();
    var apiPath = wmsApiPath + 'Report/GetSalesreturndetail';
    var postData =
    {
        "ID": reportDetailId,
        "UserId": reportUserId,
        "filterLottable": reportLottableFilter
    };
    loadDetailReport(apiPath, postData, function (data) {
        bindWmsData();
        var getLottableHeader = data.Result.Table5;
        bindLottableHeader(getLottableHeader);
    });
};



function saveLottableConfiguration() {
    //getLottableFilterValues();
    loadsalesreturnOrderDetail();
    $('#wms-srv-lottableconfig-popup').hide();
}
function showLottableConfiguration() {
    $('#wms-srv-lottableconfig-popup').show();
    $('#wms-srv-lottableconfig-popup-close').off();
    $('#wms-srv-lottableconfig-popup-close').click(function () {
        $('#wms-srv-lottableconfig-popup').hide();
    });
}