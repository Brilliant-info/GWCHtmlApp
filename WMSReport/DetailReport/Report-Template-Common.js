var jsonObject = {};
var jsonRepeatObject = {};
var wmsApiRequestKey = "";
var wmsApiAccessKey = "";
function bindWmsData() {
    $('.wmsCustom64PngImageTag').each(function () {
        var getPageType = $(this).data('value');
        $(this).removeClass('wmsCustom64PngImageTag').addClass('wmsCustom64PngImageTagRes');
        var getWmsDataCol = $(this).html();
        $(this).html('<img src="data:image/png;base64, ' + jsonObject[getWmsDataCol] + '" />');
    });
    $('.wmsCustomImageTag').each(function () {
        var getPageType = $(this).data('value');
        $(this).removeClass('wmsCustomImageTag').addClass('wmsCustomImageTagRes');
        var getWmsDataCol = $(this).html();
        $(this).attr('data-label', getWmsDataCol);
        //alert(jsonObject[getWmsDataCol]);
        $(this).html('<img src="../' + jsonObject[getWmsDataCol] + '" />');
    });
    $('.wmsCustomLogoTag').each(function () {
        var getPageType = $(this).data('value');
        $(this).removeClass('wmsCustomLogoTag').addClass('wmsCustomLogoTagRes');
        var getWmsDataCol = $(this).html();
        $(this).attr('data-label', getWmsDataCol);
        var getLogoPath = jsonObject[getWmsDataCol];
        if(getLogoPath.indexOf('http') > -1){
            $(this).html('<img src="' + jsonObject[getWmsDataCol] + '" />');
        }else{
            $(this).html('<img src="' + wmsAppFiles + jsonObject[getWmsDataCol] + '" />');
        }
    });
    $('.wmsCustomTag').each(function () {
        var getPageType = $(this).data('value');
        $(this).removeClass('wmsCustomTag').addClass('wmsCustomTagRes');
        var getWmsDataCol = $(this).html();
        $(this).attr('data-label', getWmsDataCol);
        $(this).html(jsonObject[getWmsDataCol]);
    });
    $('.wmsBarcodeTag').each(function () {
        var getPageType = $(this).data('value');
       /* $(this).removeClass('wmsBarcodeTag'); */
        var getWmsDataCol = $(this).html();
        $(this).attr('data-label', getWmsDataCol);
        $(this).html('*' + jsonObject[getWmsDataCol] + '*');
    });
    $('.wmsRepeatRow').each(function () {
        var getRepeatColumn = $(this).data('column');
        var getRepeatColumnSize = jsonRepeatObject[getRepeatColumn].length;
        var getFirstRowHtml = $(this).html();
        bindRepeatWmsData(getRepeatColumn, 0);
        for (var i = 1; i < getRepeatColumnSize; i++) {
            $(this).parent().append('<div class="wmsGridRow wmsResetRow wmsRepeatRow" data-column="'+ getRepeatColumn +'">' + getFirstRowHtml + '</div>');
            bindRepeatWmsData(getRepeatColumn, i);
        }
        moveCalculationRowToLast();
    });
    $('.invDecimal').each(function(){
		var getNum = $(this).text().trim();
		var intNum = Number(getNum);
		if(intNum != null && intNum != ''){
			if(getNum.indexOf('.') <= -1){
				$(this).html(getNum + '.00');
			}
		}
	});
}

function moveCalculationRowToLast() {
    $('.wmsLastRow').each(function () {
        var myParent = $(this).parent();
        myParent.find('.wmsLastRow').appendTo(myParent)
    });
}

function bindRepeatWmsData(getRepeatColumn, indexPos) {
    $('.wmsRepeatRow[data-column=' + getRepeatColumn + '] .wmsCustomRepeatTag').each(function () {
        var getPageType = $(this).data('value');
        $(this).removeClass('wmsCustomRepeatTag').addClass('wmsCustomRepeatTagRes');
        var getWmsDataCol = $(this).html();
        $(this).attr('data-label', getWmsDataCol);
        $(this).html(jsonRepeatObject[getRepeatColumn][indexPos][getWmsDataCol]);
    });
}

function loadDetailReport(apiPath, postData, fnLoadCallBack, fnOnErrorCallBack){
	showWMSThemeLoading();
    var isLocalDev = isLocalDevelopement();
    wmsApiRequestKey = mBrillWmsSession.getApiRequestKey();
	wmsApiAccessKey = mBrillWmsSession.getApiAccessKey();
	if(postData != null){
        if(isLocalDev == "yes"){
            postData.apiRequestKey = wmsApiRequestKey;
            postData.apiAccessKey = wmsApiAccessKey;
        }
		jQuery.ajax({
			type: "POST",
			url:apiPath,
			beforeSend: function (request) {
				// request.setRequestHeader("apikey", "************************");
                if(isLocalDev != "yes"){
					request.setRequestHeader("api-request-key", wmsApiRequestKey);
					request.setRequestHeader("api-access-key", wmsApiAccessKey);
				}
				showWMSThemeLoading();
			},
			contentType: 'application/json',
			data: JSON.stringify(postData),
			success: function (data, textStatus, jQxhr) {
				hideWMSThemeLoading();
				jsonObject = data.Result.Table[0];
                jsonRepeatObject = data.Result;
				if(fnLoadCallBack != null){
					fnLoadCallBack(data);
				}
			},
			error: function (jqXhr, textStatus, errorThrown) {
				hideWMSThemeLoading();
                alert('Unable to connect server!!');

                if (fnOnErrorCallBack != null) {
                    fnOnErrorCallBack();
                }
			}
		});
	}else{
		jQuery.ajax({
			type: "GET",
			url:apiPath,
			beforeSend: function (request) {
				// request.setRequestHeader("apikey", "************************");
                request.setRequestHeader("api-request-key", wmsApiRequestKey);
				request.setRequestHeader("api-access-key", wmsApiAccessKey);
				// showWMSThemeLoading();
			},
			success: function (data, textStatus, jQxhr) {
				hideWMSThemeLoading();
				
				if(fnLoadCallBack != null){
					fnLoadCallBack(data);
				}
			},
			error: function (jqXhr, textStatus, errorThrown) {
				hideWMSThemeLoading();
                alert('Unable to connect server!!');

                if (fnOnErrorCallBack != null) {
                    fnOnErrorCallBack();
                }
			}
		});
	}
}

function restoreTemplate(){
   // $(this).removeClass('wmsCustomImageTag').addClass('wmsCustomImageTagRes');
    $('.wmsCustomImageTagRes').each(function(){
        var getDataLabel = $(this).attr('data-label');
        $(this).html(getDataLabel);
        $(this).removeClass('wmsCustomImageTagRes').addClass('wmsCustomImageTag');
    });

    // $(this).removeClass('wmsCustomTag').addClass('wmsCustomTagRes');
    $('.wmsCustomTagRes').each(function(){
        var getDataLabel = $(this).attr('data-label');
        $(this).html(getDataLabel);
        $(this).removeClass('wmsCustomTagRes').addClass('wmsCustomTag');
    });
    // $(this).removeClass('wmsCustomRepeatTag').addClass('wmsCustomRepeatTagRes'); 
    $('.wmsCustomRepeatTagRes').each(function(){
        var getDataLabel = $(this).attr('data-label');
        $(this).html(getDataLabel);
        $(this).removeClass('wmsCustomRepeatTagRes').addClass('wmsCustomRepeatTag'); 
    });
    $('.wmsResetRow').remove();
}

function showWMSThemeLoading(){

}

function hideWMSThemeLoading(){

}
/*
$(document).ready(function () {
    bindWmsData();
});
*/
