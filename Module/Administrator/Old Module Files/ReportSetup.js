// wmsLoadLayout(function(){
//     initReportSetup();
// });

function initReportSetup(){
    $('.gridReportSetup i.fa-check-circle').click(function(){
        var getOpacity = $(this).css('opacity');
        if(getOpacity == 1){
            $(this).css('opacity', '0.2');
        }else{
            $(this).css('opacity', '1');
        }
   });
   $('.gridReportSetup i.fa-eye').click(function(){
        // location.href = 'WMSReport/ExecuteReport.html';
        openReport();
   });
}

function openReport() {
    $('#wms-srv-report-setup-popup').show();
    $('#wms-srv-report-setup-popup-close').off();
    $('#iframeSetupReport').attr('src', 'WMSReport/ExecuteReport.html');
    $('#wms-srv-report-setup-popup-close').click(function () {
        $('#iframeSetupReport').attr('src', 'about:blank');
        $('#wms-srv-report-setup-popup').hide();
    });
}

function openDetailedReport() {
    $('#wms-srv-reportdetail-popup').show();
    $('#wms-srv-reportdetail-popup-close').off();
    $('#iframeDetailReport').attr('src', 'WMSReport/Detail-Report-Template/GroupSummary-Template.html');
    $('#wms-srv-reportdetail-popup-close').click(function () {
        $('#iframeDetailReport').attr('src', 'about:blank');
        $('#wms-srv-reportdetail-popup').hide();
    });
}

function searchReportInList(obj){
    var getSearchKey = $(obj).val();
    if(getSearchKey.trim() != ''){
        $('.gridReportSetup .wms-srv-group-head').hide();
        $('.gridReportSetup .wms-srv-grid-row').hide();
        $('.gridReportSetup .wms-srv-group-item').each(function(){
            var getMyText = $(this).text().toLowerCase();
           // alert(getSearchKey.toLowerCase());
            if(getMyText.indexOf(getSearchKey.toLowerCase()) > -1){
                var getHeadTitle =  $(this).data('head');
                $('div[data-headgroup="'+ getHeadTitle +'"]').show();
                $(this).parent().show();
            }else{
                $(this).parent().hide();
            }
        });
    }else{
        $('.gridReportSetup .wms-srv-grid-row').show();
    }
    
}