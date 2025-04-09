function loadPrintTemplateConfig(data){			
    var getPageWidth = printConfig.pageWidth;
    var getPageHeight = printConfig.pageHeight;
    var getPageMargin = printConfig.pageMargin;
    var getPageExtraSpace = 0.10;
    var getPageBorder = 0.01;
    // var getTemplateWidth = (getPageWidth - (getPageMargin * 2)) - getPageExtraSpace;
    var getTemplateWidth = (getPageWidth - (getPageMargin * 2));
    var getTemplateHeight = (getPageHeight - (getPageMargin * 2)) - getPageExtraSpace;

    var printStyle = '@page{' + 
    'size:'+ getPageWidth +'in '+ getPageHeight +'in;' + 
    'margin: '+ getPageMargin +'in;' + 
    '}' + 
    '.printPage{' + 
    'padding: '+ getPageMargin +'in;' + 
    '}'+
    '.printTemplate{' + 
    //'border:solid '+ getPageBorder +'in #636363;' + 
    'width:'+ getTemplateWidth +'in;' + 
    'height:'+ getTemplateHeight +'in;' + 
    '}';
    // alert(printStyle);
    $('#printTemplateStyle').html(printStyle);
    loadPrintData(data);
}

function loadPrintData(data){
    var loadData = data;
    var totalLabelCount = loadData.length;
    for(var i=0; i<loadData.length; i++){
        var newElement = $('.printTemplate[data-type="defaultTemplate"]').clone();
        $(newElement).removeAttr('data-type');
        $(newElement).attr('id','printTemplate_'+ i);
        var printPage = $('<div id="printPage_'+ i +'" class="printPage"></div>');
        $(printPage).append(newElement);
        $(".printDataHolder").append(printPage);
        //$(".printDataHolder").append(newElement);
        $(".printDataHolder").append('<div class="printPageBreak"></div>');
        var currentLabelNum = i + 1;
        loadData[i].LabelNo = currentLabelNum + '/' + loadData.length;
        loadData[i].LabelSr = currentLabelNum;
        loadData[i].TotalPackets = totalLabelCount;
        setPrintLableVal(i, loadData[i]);
    }
    $('.printTemplate[data-type="defaultTemplate"]').hide();
}

function setPrintLableVal(cnt, loadData){
    var printablePlaceHolder = $('#printTemplate_'+ cnt + ' [data-placeholder]');
    $(printablePlaceHolder).each(function(){
        var objLabel = $(this).attr('data-placeholder');
        var labelVal = loadData[objLabel];
        $('#printTemplate_'+ cnt + ' [data-placeholder="'+ objLabel +'"]').html(labelVal);
    });
}

function setCommonDataToAllLabel(commonObj){
    for (var k in commonObj) {
        if (commonObj.hasOwnProperty(k)) {
          // user[k] = data[k];
          $('.printRow [data-placeholder="'+ k +'"]').html(commonObj[k]);
        }
    }   
}