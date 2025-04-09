/* =====================  LOTTABLE SUPPORT  ===================== */

var isLottableBindingDone = 'no';

function HideLottableCell(startlot)
{
    for(var lot = startlot+1;lot<=10;lot++)
        {
            $('.invLotHead[data-lotindex="'+ lot +'"]').hide();
            $('.invProductGridCell[data-lotlabel="Lottable'+ lot +'"]').hide();
        }
}


function bindLottableHeader(gridObjId, lotHeader)
{
    if(isLottableBindingDone != "yes"){
        $('#pnlLotConfigHolder .pnlLotConfigCell').html('');
        var getLengthHalf = Math.round(lotHeader.length / 2);
        if(lotHeader.length > 0){
            for(var lt=0; lt < lotHeader.length; lt++ ){
                var lotHeaderLabel = lotHeader[lt].Lottable;
                $('#'+ gridObjId +' .invLotHead[data-lotindex="'+lt+'"]').html(lotHeaderLabel);
                var lotNum = lt + 1;
                $('#'+ gridObjId +' .invLotHead[data-lotindex="'+lt+'"]').attr('data-lotlabel', 'Lottable'+ lotNum);
                $('#'+ gridObjId +' .invLotCell[data-lotindex="'+lt+'"]').attr('data-lotlabel', 'Lottable'+ lotNum);
                $('#pnlLotConfigHolder .pnlLotConfigCell').append('<div class="invLottableChkItem"><input type="checkbox" value="" id="" data-lotlabel="Lottable'+ lotNum +'" data-lottype="'+ lotHeaderLabel +'"  /> ' +lotHeaderLabel + '</div>');
            }
        }
        isLottableBindingDone = "yes";
    }else{
        for(var lt=0; lt < lotHeader.length; lt++ ){
            var lotHeaderLabel = lotHeader[lt].Lottable;
            $('#'+ gridObjId +' .invLotHead[data-lotindex="'+lt+'"]').html(lotHeaderLabel);
            var lotNum = lt + 1;
            $('#'+ gridObjId +' .invLotHead[data-lotindex="'+lt+'"]').attr('data-lotlabel', 'Lottable'+ lotNum);
            $('#'+ gridObjId +' .invLotCell[data-lotindex="'+lt+'"]').attr('data-lotlabel', 'Lottable'+ lotNum);
        }
    }
    $('#'+ gridObjId +' .invLotCell').each(function(){
        var lotHtml = $(this).html().trim();
        if(lotHtml == '0'){
            $(this).html('');
        }
    });
}

function getLottableFilterValues(gridObjId){
    var selectedLottable = '';
    var getLotLen =  $('#pnlLotConfigHolder .invLottableChkItem').length;
    if(getLotLen > 0){
        $('#pnlLotConfigHolder .invLottableChkItem').each(function(){
            var chkLot = $(this).find('input[type="checkbox"]');
            var isChkSelected = $(chkLot).prop('checked');
            var getLotLabel = $(chkLot).attr('data-lotlabel');
            if(isChkSelected){
                if(selectedLottable.trim() == ''){
                    selectedLottable = getLotLabel;
                }else{
                    selectedLottable = selectedLottable + ',' + getLotLabel;
                }
            }
        });
    }else{
        selectedLottable = 'all';
    }
    return selectedLottable;
}

function showHideLottableReportCell(gridObjId){
    debugger;
    var selectedLottable = '';
    var getLotLen =  $('#pnlLotConfigHolder .invLottableChkItem').length;
    $('#'+ gridObjId +' .invLotHead').show();
    $('#'+ gridObjId +' .invLotCell').show();
    if(getLotLen > 0){
        $('#pnlLotConfigHolder .invLottableChkItem').each(function(){
            var chkLot = $(this).find('input[type="checkbox"]');
            var isChkSelected = $(chkLot).prop('checked');
            var getLotLabel = $(chkLot).attr('data-lotlabel');
            if(isChkSelected){
                $('#'+ gridObjId +' .invLotHead[data-lotlabel="'+ getLotLabel +'"]').show();
                $('#'+ gridObjId +' .invLotCell[data-lotlabel="'+ getLotLabel +'"]').show();
            }else{
                $('#'+ gridObjId +' .invLotHead[data-lotlabel="'+ getLotLabel +'"]').hide();
                $('#'+ gridObjId +' .invLotCell[data-lotlabel="'+ getLotLabel +'"]').hide();
            }
        });
    }
}

function saveLottableConfiguration()
{
    //getPurchaseOrderList(getSelectedDateCatg, globalDefaultFromDate, globalDefaultToDate);
    $('#wms-srv-lottableconfig-popup').hide();
}
function showLottableConfiguration(){
   $('#wms-srv-lottableconfig-popup').show();
   $('#wms-srv-lottableconfig-popup-close').off();
   $('#wms-srv-lottableconfig-popup-close').click(function(){
    $('#wms-srv-lottableconfig-popup').hide();
   });
}

function setupFilterPopup(){
    var objLottableConfigPopup = $('#wms-srv-lottableconfig-popup');
    if(objLottableConfigPopup.length <= 0){
        var filterPopup = '<div class="wms-srv-popup-holder" id="wms-srv-lottableconfig-popup" style="display: none;">' + 
        '<div class="wms-srv-popup-bg"></div>' + 
        '<div class="wms-srv-popup" style="height:auto;">' + 
        '<div class="wms-srv-popup-content">' + 
        '<div class="wms-srv-popup-title">' + 
        '<div class="wms-srv-page-title"><span>Lottable Filter</span></div>' + 
        '<a href="#" id="wms-srv-lottableconfig-popup-close" class="wms-srv-popup-close"><i class="fas fa-times-circle"></i></a></div>' + 
        '<div class="wms-srv-popup-content-body" id="wms-srv-popup-content-body">' + 
        '<div id="pnlLotConfigHolder"><div class="pnlLotConfigCell"></div></div></div></div></div></div>';

        $('body').append(filterPopup);
    }
}

/* =====================  LOTTABLE SUPPORT  =====================*/