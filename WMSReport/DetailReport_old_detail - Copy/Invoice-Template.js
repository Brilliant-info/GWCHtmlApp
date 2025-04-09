$(document).ready(function () 
{
	debugger;
    activateInvoiceTemplatesControl();
    var reportUserId = mBrillWmsSession.getUserId();
    var reportDetailId = mBrillWmsSession.getReportDetailId();
	//var Id = sessionStorage["InvoiceId"];
    var apiPath = wmsApiPath + 'Report/InvoiceDetail';
	//var apiPath = 'http://localhost:50068/api/staging/v1/Report/InvoiceDetail';
    var postData = 
    {
        "InvoiceId": reportDetailId,
        "UserId": reportUserId
    };
    loadDetailReport(apiPath, postData, function(data)
    {
        bindWmsData();
    });
});
$(window).resize(function(){
    $('.templateListHolder').remove();
});
$(document).click(function(evt){
    if(evt.target.id == "showTemplates"){
        return false;
    }else{
        $('.templateListHolder').remove();
        return true;
    }
    
});


function activateInvoiceTemplatesControl(){
    
    var getCurrentTemplateStyle = sessionStorage["DefaultTemplateStyle"];
    var getDefaultTemplateStyle = $('#hdnCurrentTemplateStyle').val();
    if(Number(getDefaultTemplateStyle) == Number(getCurrentTemplateStyle)){
        $('.setDefaultTemplates').hide();
    }else{
        $('.setDefaultTemplates').show();
    }
    $('.showTemplates').click(function(){
        $('.templateListHolder').remove();
        var pageStyle = 'display: inline-block;text-align: center;background-color: #ffffff;margin: 10px;box-shadow: 0px 0px 10px #636363;';
        var templatePopupStyle = 'border: solid 1px #c8c8c8;padding: 10px;display: inline-block;background-color: #c8c8c8;position: absolute;border-radius: 12px;box-shadow: 5px 5px 5px #8f8f8f;';
        var templateData = '<div class="templateListHolder" style="'+ templatePopupStyle +'"><div class="templateList">'+
        '<div class="templateHolder" style="'+ pageStyle +'"><a href="Invoice-Template.html"><img src="Invoice-Template-style-1.png"></a></div>' + 
        '<div class="templateHolder" style="'+ pageStyle +'"><a href="Invoice-Template-style-1.html"><img src="Invoice-Template-style-2.png"></a></div>' + 
        '<div class="templateHolder" style="'+ pageStyle +'"><a href="Invoice-Template-style-2.html"><img src="Invoice-Template-style-3.png"></a></div>' + 
        '</div></div>';
        $('body').append(templateData);
        var position = $(this).position();
       // var getPopupWidth = $('.templateListHolder').width();
       var getPopupWidth = 567;
         var evtTop = position.top + ($(this).height() * 2);
         var evtLeft = (position.left + 10) - (getPopupWidth - $(this).width());
        $('.templateListHolder').css('left', evtLeft + 'px');
        $('.templateListHolder').css('top', evtTop + 'px');
    });

    $('.setDefaultTemplates').click(function(){
		var myTemplateId =  $('#hdnCurrentTemplateStyle').val();
		saveTemplate(myTemplateId);
    });
}


// function saveTemplate(templateId){
// 	debugger;
// 	debugger;
//  //var apiPath = wmsApiPath + 'Report/SaveInvoiceTemplate';
//  	var apiPath = 'http://localhost:44370/api/staging/v1/Report/SaveInvoiceTemplate';
  
//   var getClientId = $("#ddlclient").val();
//   var getWarehouseID = $("#ddlwarehouse").val();

//   getClientId_SO = sessionStorage['Demandclient'];

//   getWarehouseId_SO = sessionStorage['Demandwarehouse'];
//   getCustomerId_SO = sessionStorage['DemandCustomerId'];
//   getUserId_SO = sessionStorage['DemandUserID'];
  
//   var postData = 
//     {
// 		"templateId":templateId,
//         "UserId": getUserId_SO,
// 		"ClientId": getClientId_SO,
// 		"WarehouseId": getWarehouseId_SO,
// 		"CustomerId": getCustomerId_SO
//     };
// 	callHttpUrl(apiPath, postData, function (data) {
//         var getstatuscode = data.StatusCode;
//         var isSuccess = data.Status;
//         var getresult = data.Result;
//         if (isSuccess == 200) {
//             var returnmsg = getresult.Message;
//             if (returnmsg == "success") {
// 				window.opener.sessionStorage["DefaultTemplateStyle"] = templateId;
// 				alert('Templated saved as Default template!!');
// 				$('.setDefaultTemplates').hide();
//             }
//             else {
//                 alert(returnmsg);
//             }
//         }
//         else if (isSuccess == "300") {
//             var returnmsg = getresult.Message;
//             alert(returnmsg);
//         }
//         else {
//             alert("Save failed");
//         }
//     });
// 	/*callHttpUrl(function(){
// 		window.opener.sessionStorage["DefaultTemplateStyle"] = templateId;
//         alert('Templated saved as Default template!!');
//         $('.setDefaultTemplates').hide();
// 	});*/
// }