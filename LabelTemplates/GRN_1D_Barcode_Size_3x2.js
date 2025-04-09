var printConfig = {
    pageWidth:4,
    pageHeight:2,
    pageMargin:0.25
};

$(document).ready(function(){
   // var getData = printJson.Table;
   var getData = window.parent.printableData;
    loadPrintTemplateConfig(getData);
});