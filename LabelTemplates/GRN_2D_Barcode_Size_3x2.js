var printConfig = {
    pageWidth:3,
    pageHeight:2,
    pageMargin:0.25
};

let GRNNo = '';
let GRNDate = '';

$(document).ready(function(){
   var getData = window.parent.printableData;
    // var commonObj={
    //     CompanyName:sessionStorage["companyname"],
    //     GINNo:$('#grnddl', window.parent.document).val(),
    //     GINDate:$('#dtgrndate', window.parent.document).val()
    // };
    var commonObj={
        CompanyName:sessionStorage["companyname"]
    };
    setCommonDataToAllLabel(commonObj);
    loadPrintTemplateConfig(getData);
});