// wmsLoadLayout(function(){
// 	init();
// });


function initBarcodeConfiguration(){

}


function openviewPopup() {
    $('#wms-srv-view-popup').show();
    $('#wms-srv-view-popup-close').off();
    $('#wms-srv-view-popup-close').click(function () {
        $('#wms-srv-view-popup').hide();
    });
}

function addLottable(objNum) {
    if (!checkIfLottableExist()) {
        var getLottable = $('#addNew_Lottable').val();
        if (getLottable.trim() != '') {
            var getLottableType = $('#addNew_LottableType').val();
            lotId = lotId + 1;
            var myLottable = '<div class="lottableBox" id="lottableBox' + lotId + '" data-id="' + lotId + '" data-type="' + getLottableType + '">' +
                '<label>' + getLottable + '</label> <a href="#" onclick="removeLottable(' + lotId + ');return false;"><i class="fas fa-times-circle"></i></a>' +
                '</div>';
            $('#pnlLottableHolder').append(myLottable);
            $('#pnlLottableHolder').show();
            $('#addNew_Lottable').val('');
            $('#addNew_LottableType').val('');
        } else {
            alert('Please enter lottable!!');
        }
        
    } else {
        alert('Lottable type already added!!');
    }
}

