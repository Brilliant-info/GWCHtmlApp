var printConfig = {
    pageWidth:6,
    pageHeight:4,
    pageMargin:0.25
};

$(document).ready(function(){
   // var getData = printJson.Table;
   var getData = window.parent.printableData;
    loadPrintTemplateConfig(getData);
});