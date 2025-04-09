var wmsNavStatus = 'visible';
var isWmsDashboard = 'no';
var isPreferenceArrowsActivated = 'no';
$(document).ready(function () {
    initWMS();
	
	
	$('#appNavClose').click(function () {
       // var getWindowHeight = $(window).height();        
        if (wmsNavStatus == 'visible') {
            $('body').removeClass('wmsNavActive');
            hideThemeWMSNav();
            //wmsNavStatus = 'hidden';
            //$('#themeWMSNavPanel').css('width', '42px');
            //$('.themeWMSNavHolder').css('width', '42px');            
            //$('.themeWMSClientLogo').css('display', 'none');   
            //$('.themeWMSNavSearchHolder').css('display', 'none');
            //$('.themeWMSNav').addClass('onlyIconNav');
            //$('#themeWMSNavPanel').css('overflow-y', 'hidden');  
            //$('#themeWMSNavPanel').css('height', getWindowHeight + 'px');
        } else {
            $('body').addClass('wmsNavActive');
            showThemeWMSNav();
            //wmsNavStatus = 'visible';
            //$('#themeWMSNavPanel').css('width', '250px');
            //$('.themeWMSNavHolder').css('width', '250px');
            //$('.themeWMSClientLogo').css('display', 'block');   
            //$('.themeWMSNavSearchHolder').css('display', 'block');
            //$('.themeWMSNav').removeClass('onlyIconNav');
            //$('#themeWMSNavPanel').css('overflow-y', 'auto');  
            //$('#themeWMSNavPanel').css('height', (getWindowHeight - 63) + 'px');
        }       
        
    });
	
    $('#appNav').click(function () {
       // var getWindowHeight = $(window).height();        
        if (wmsNavStatus == 'visible') {
            $('body').removeClass('wmsNavActive');
            hideThemeWMSNav();
            //wmsNavStatus = 'hidden';
            //$('#themeWMSNavPanel').css('width', '42px');
            //$('.themeWMSNavHolder').css('width', '42px');            
            //$('.themeWMSClientLogo').css('display', 'none');   
            //$('.themeWMSNavSearchHolder').css('display', 'none');
            //$('.themeWMSNav').addClass('onlyIconNav');
            //$('#themeWMSNavPanel').css('overflow-y', 'hidden');  
            //$('#themeWMSNavPanel').css('height', getWindowHeight + 'px');
        } else {
            $('body').addClass('wmsNavActive');
            showThemeWMSNav();
            //wmsNavStatus = 'visible';
            //$('#themeWMSNavPanel').css('width', '250px');
            //$('.themeWMSNavHolder').css('width', '250px');
            //$('.themeWMSClientLogo').css('display', 'block');   
            //$('.themeWMSNavSearchHolder').css('display', 'block');
            //$('.themeWMSNav').removeClass('onlyIconNav');
            //$('#themeWMSNavPanel').css('overflow-y', 'auto');  
            //$('#themeWMSNavPanel').css('height', (getWindowHeight - 63) + 'px');
        }       
        
    });
    $(window).resize(function () {
        adjustNavHeight();
        adjustMobileGrid();
    });
   
    // .themeWMSNav
    $('.themeWMSNav li a').click(function () {
        $('.themeWMSNav  li').removeClass('themeWMSActiveNav');
        //$(this).parent().addClass("themeWMSActiveNav");
        var getParent = $(this).parent();
        var getParentOfParent = $(this).parent().parent().parent();

       // $(this).parent().toggleClass("themeWMSActiveNav");
        if (getParent[0].nodeName.toLowerCase() == "li") {
            $(this).parent().addClass("themeWMSActiveNav");
        }
        if (getParentOfParent[0].nodeName.toLowerCase() == "li") {
            $(this).parent().parent().parent().addClass("themeWMSActiveNav");
        }
        var getChildLength = $(this).parent().children("ul").length;

        // THIS WILL SAVE NAV STATUS
        saveThemeNavStatus();

        if (getChildLength > 0) {
            var firstUl = $(this).parent().find("ul").find("li").length;
            if (firstUl > 0) {
                showThemeWMSNav();
                event.stopImmediatePropagation();
                return false;
            } else {
                return true;
            }
 
        } else { 
            return true;
        }
    });
    
    $('#shortcut').click(function () {
        var getWindowWidth = $(window).width();
        var getWindowHeight = $(window).height();
        var getPopupMarginLeft = Math.round((getWindowWidth - 360) / 2);
        var getPopupHeight = $('.themeWmsPopupContent').height();
        $('#txtShortcutURL').val($(location).attr("href"));
        $('.themeWmsPopup').attr('style', 'display:block;');
        $('.themeWmsPopupContent').attr('style', 'margin-left:' + getPopupMarginLeft + 'px;width:360px;');
        var getPopupHeight = $('.themeWmsPopupContent').height();
        var getPopupMarginTop = Math.round((getWindowHeight - getPopupHeight) / 2);
        $('.themeWmsPopupContent').attr('style', 'margin-left:' + getPopupMarginLeft + 'px;margin-top:' + getPopupMarginTop + 'px;width:360px;');
    });
    $('#btnCloseShortcutPopup').click(function () {
        $('.themeWmsPopup').attr('style', 'display:none;');
        event.stopImmediatePropagation();
        return false;
    });
    $('.themeWMSPopupShortcutIcons i').click(function () {
        $('.themeWMSPopupShortcutIcons i').attr('style', 'background-color:#fffff;');
        $(this).attr('style', 'background-color:#cccccc;');
        $('#hdnShortcutIcon').val($(this).attr('class'));
    });

    $("#themeWMSNavSearchInputBox").keyup(function () {
        //  alert('Hello');
        $('#themeWMSNavPanel').addClass('themeWMSSearchMode');
        var getNavSearchKey = $('#themeWMSNavSearchInputBox').val().trim().toLowerCase();
        if (getNavSearchKey != '') {
            try {
                $(".themeWMSSearchMode li").each(function (index) {
                    var getSearchNavString = $(this).text().toLowerCase();;
                    $(this).removeClass('themeWMSActiveNav');
                    if (getSearchNavString.indexOf(getNavSearchKey) > -1) {
                        $(this).addClass('themeWMSSearchFound');
                    } else {
                        $(this).removeClass('themeWMSSearchFound');
                    }
                });
            } catch (err) {
                // alert(err);
            }
        } else {
            $('.themeWMSSearchMode li').removeClass('themeWMSSearchFound');
            $('#themeWMSNavPanel').removeClass('themeWMSSearchMode');
            loadThemeNavStatus();
        }
     
    });
    $('.themeWMSLblLang').click(function () {
        $('.themeWmsLangNav').addClass('showlanguage');
        $('#google_translate_element select').change(function () {
            var getLangPrefix = $(this).val().toUpperCase();
            sessionStorage.setItem("wmsThemeLang", getLangPrefix);
            $('#langPrefix').html(getLangPrefix);
            $('.themeWmsLangNav').removeClass('showlanguage');
        });
    });
    // Application Level Search
    $('#wmsThemeAppSelectedSearch').click(function () {
        $('#wmsThemeAppSearchFilterUl ul').attr('style','display:block');
    });
    $('#wmsThemeAppSearchFilterUl ul li').click(function () {
        var elIClass = $(this).find("i").attr('class');
      //  var appSearchType = $(this).find("span").html();
        var appSearchType = $(this).find("span").attr('data');
        $('#wmsThemeAppSelectedSearch').html('<i class="' + elIClass + '"></i><i class="fas fa-caret-down"></i>');
        $('#txtWmsAppSearchType').val(appSearchType);
        $('#wmsThemeAppSearchFilterUl ul').attr('style', 'display:none');
    });

    // APPLICATION SEAARCH....
    $("#txtWmsAppSearch").keyup(function (e) {
        if (e.key != "Escape") {
            showSearchSuggestionList();
        }
    });
    $("#txtWmsAppSearch").keypress(function (e) {
        if (e.key != "Escape") {
            showSearchSuggestionList();
        }
    });
    $('body').keyup(function (e) {
        if (e.key === "Escape") {
            $('#wmsThemeAppSearchFilterUl ul').attr('style', 'display:none');
            $('#wmsThemeAppSearchSuggestions').css('display', 'none');
            $('.themeWmsLangNav').removeClass('showlanguage');
        }
    });
    hidePageLoading();
    //$("#themeWMSNavPanel").mouseover(function () {
    //    showThemeWMSNav();
    //});
    //$("#themeWMSNavPanel").mouseout(function () {
    //    hideThemeWMSNav();
    //});
});

function hidePageLoading() {
    $('#themeWMSLoading').css('display', 'none');
    $('#themeWMSLoading').css('background', 'transparent');
    $('#themeWMSMain').css('visibility', 'visible');
}
function showThemeWMSNav() {
    var getWindowHeight = $(window).height();    
    wmsNavStatus = 'visible';
    $('#themeWMSNavPanel').css('width', '250px');
  //  $('.themeWMSNavHolder').css('width', '250px');
   $('.themeWMSNavHolder').css('width', '42px');
    $('.themeWMSNavHolder').addClass('mobileNavOn');
    $('.themeWMSClientLogo').css('display', 'block');
    $('.themeWMSNavSearchHolder').css('display', 'block');
    $('.themeWMSNav').removeClass('onlyIconNav');
    $('#themeWMSNavPanel').css('overflow-y', 'auto');
    $('#themeWMSNavPanel').css('height', (getWindowHeight - 63) + 'px');
	$('#appNavClose').show();
	// $('.themeWMSContentHolder').attr('style', 'filter: blur(5px);-webkit-filter: blur(5px);');
	$('#menuContentOverlay').show();
    //$('[data-toggle="tooltip"]').tooltip('dispose');
}

function hideThemeWMSNav() {
    var getWindowHeight = $(window).height();    
    wmsNavStatus = 'hidden';
    $('#themeWMSNavPanel').css('width', '42px');
    $('.themeWMSNavHolder').css('width', '42px');
    $('.themeWMSNavHolder').removeClass('mobileNavOn');
    $('.themeWMSClientLogo').css('display', 'none');
    $('.themeWMSNavSearchHolder').css('display', 'none');
    $('.themeWMSNav').addClass('onlyIconNav');
    $('#themeWMSNavPanel').css('overflow-y', 'hidden');
    $('#themeWMSNavPanel').css('height', getWindowHeight + 'px');
	$('#appNavClose').hide();
	// $('.themeWMSContentHolder').attr('style', '');
	$('#menuContentOverlay').hide();
    //$('[data-toggle="tooltip"]').tooltip();
}

function showSearchSuggestionList() {
    var getAppSearchKey = $('#txtWmsAppSearch').val().trim();
    var getAppSearchFilter = $('#txtWmsAppSearchType').val().trim();
    if (getAppSearchKey != '') {
        // $('#wmsThemeAppSearchSuggestions').css('display', 'block');
        $.ajax({
            type: "POST",
            url: "../MasterPage/filterSearch.ashx",
            data: { 'filter': getAppSearchFilter, 'searchText': getAppSearchKey },
            beforeSend: function () {
                // showWMSThemeLoading();
                //$("#userInput").css("background","transparent url("+ $serverRoot +  +"images/keyword-loader.gif) no-repeat center right");
            },
            success: function (data) {
                if (data.trim() != '') {
                    $('#wmsThemeAppSearchSuggestions').css('display', 'block');
                    $('#wmsThemeAppSearchSuggestions').html(data);
                } else {
                    $('#wmsThemeAppSearchSuggestions').css('display', 'none');
                    $('#wmsThemeAppSearchSuggestions').html('');
                }
            }
        });
    } else {
        $('#wmsThemeAppSearchSuggestions').css('display', 'none');
        $('#wmsThemeAppSearchSuggestions').html('');
    }
}

function showWMSThemeLoading() {
    $('#themeWMSLoading').css('display','block');
}
function hideWMSThemeLoading() {
    $('#themeWMSLoading').css('display', 'none');
}

function callNavigation(getHrefObj) {
    window.location.href = getHrefObj;
}

function adjustNavHeight() {
    var getWindowHeight = $(window).height() - 63;
    $('#themeWMSNavPanel').css('height', getWindowHeight + 'px');
}

function adjustMobileGrid() {
    var getWindowWidth = $(window).width();
    var setMobileGridWidth = getWindowWidth - 40;
    if (getWindowWidth <= 576) {
        $('.wmsThemeMobileGridMain').css('width', setMobileGridWidth + 'px');
        $('.wmsThemeMobileGridHolder').css('width', setMobileGridWidth + 'px');
        $('.wmsThemeMobileGrid').css('width', '1000px');
    } else {
        $('.wmsThemeMobileGridMain').css('width', 'auto');
        $('.wmsThemeMobileGridHolder').css('width', 'auto');
        $('.wmsThemeMobileGrid').css('width', 'auto');
    }
   
}

function initWMS() {
    $('#themeWMSNavPanel').css('width', '250px');   
    $('#themeWMSNavPanel').css('overflow-y', 'auto');  
    $('#themeWMSNavPanel').css('overflow-x', 'hidden');  
    $('.themeWMSNav li li a i').attr('class', 'fas fa-angle-double-right');
    adjustNavHeight();
    adjustMobileGrid();

    // Load Icons
    $('.wms_ctrl_title i').attr('class', 'fas fa-tag');
    $('.wms_ctrl_website i').attr('class', 'fas fa-link');
    $('.wms_ctrl_email i').attr('class', 'fas fa-envelope');
    $('.wms_ctrl_phone i').attr('class', 'fas fa-phone fa-flip-horizontal');
    $('.wms_ctrl_fax i').attr('class', 'fas fa-fax');
    $('.wms_ctrl_landmark i').attr('class', 'fas fa-landmark');

  //  $('.wms_ctrl_tab_company').attr('class', 'fas fa-landmark');
    // <i class="fas fa-list"></i>
    $(".themeWMS_ctrl_btn").has("input").addClass("wms_show_ctrl");
    loadThemeNavStatus();
    loadCurrentLanguagePrefix();
    setDontTranslateSection();
   /* if (isWmsDashboard == 'yes') {
        showThemeWMSNav();
    } else {
        hideThemeWMSNav();
    } */
	 hideThemeWMSNav();
}
function setDontTranslateSection() {
    $('.gridFrame .ob_gBCont').addClass('notranslate');
    $('input[type=text]').addClass('notranslate');
    $('select').addClass('notranslate');
    $('textarea').addClass('notranslate');
}
function loadCurrentLanguagePrefix() {
    try {
        var getThemeLanguage = sessionStorage.getItem("wmsThemeLang");
        $('#langPrefix').html(getThemeLanguage);
    } catch (err) {
        $('#langPrefix').html('EN');
    }
}

function saveThemeNavStatus() {
    var arrNavPos = "-1";
    $(".themeWMSNav li").each(function (index) {
        if ($(this).hasClass('themeWMSActiveNav')) {
            arrNavPos = index;
        };
    });
    sessionStorage.setItem("wmsThemeNavLevel", arrNavPos);
    // console.log(arrNavPos);
}
function loadThemeNavStatus() {
    try {
        var getThemeNavLevel = sessionStorage.getItem("wmsThemeNavLevel");

        if (getThemeNavLevel != '') {
            var arrStrNav = getThemeNavLevel.split(':');           

            $getLastLi = $(".themeWMSNav li").eq(Number(getThemeNavLevel));
            var getParent = $getLastLi.parent().parent();
            var getParentOfParent = $getLastLi.parent().parent().parent().parent();

            $getLastLi.addClass('themeWMSActiveNav');

            if (getParent[0].nodeName.toLowerCase() == "li") {
                $getLastLi.parent().parent().addClass("themeWMSActiveNav");
            }
            if (getParentOfParent[0].nodeName.toLowerCase() == "li") {
                $getLastLi.parent().parent().parent().parent().addClass("themeWMSActiveNav");
            } 
        }
    } catch (err) {
       // alert(err);
    }
}

function loadReportNavStyle() {
    var getAllLiElements = $(".dvReportMenu a");
    var getFirstReportLink = getAllLiElements[0].remove();

    var getAllCustomReportLi = $(".dvCustomReport a");
    var getFirstCustomReportLink = getAllCustomReportLi[0].remove();
    
    $(".dvReportMenu i").each(function (index) {
        $getThisHtml = $(this).attr('class');
        var getParentOfi = $(this).parent().parent();
        var checkIfHasMoreLi = $(this).parent().parent().has('li').length ? "Yes" : "No";
        if (checkIfHasMoreLi == 'Yes') {
            $(this).replaceWith('<div class="themeWMSAjaxTabPageTitle">' + '<i class="' + $getThisHtml + '"></i>' + '</div>');

        }
    });

    $(".dvReportMenu i").each(function (index) {
        $getThisHtml = $(this).attr('class');
        var getParentOfi = $(this).parent().parent();
        var checkIfHasMoreLi = $(this).parent().parent().has('li').length ? "Yes" : "No";
        if (checkIfHasMoreLi == 'Yes') {
            $(this).replaceWith('<div class="themeWMSAjaxTabPageTitle">' + '<i class="' + $getThisHtml + '"></i>' + '</div>');

        }
    });
   
}

function loadBreadCrumb(title, url, isFirst, isBold) {
    var getBreadCrumbObj = document.getElementById('themeWMSBreadCrump');
    var getBreadCrumb = getBreadCrumbObj.innerHTML;
    var sepHtml = '';
    var boldStart = '';
    var boldEnd = '';
    if (isBold == true) {
        boldStart = '<b>';
        boldEnd = '</b>';
    }
    if (isFirst != true) {
        sepHtml = '<span class="themWMSSep">>></span>';
    }

    getBreadCrumbObj.innerHTML = getBreadCrumb + sepHtml + '<a href="' + url + '">' + boldStart + title + boldEnd + '</a>';
}

function activateUserPreferenceArrows(selectObj) {
    var getSelectPrefBoxId = selectObj.id;
    var getSelectedVal = $('#' + getSelectPrefBoxId).val();
    var checkSelBoxClass = $('#' + getSelectPrefBoxId).hasClass('wmsThemePrefBoxLeft');
    var getSelBoxParent = $('#' + getSelectPrefBoxId).parent();
    var getPrefBoxToClear = $('select');
    getSelBoxParent.parent().find(getPrefBoxToClear).val([]);
    if (checkSelBoxClass == true) {
        getSelBoxParent.parent().removeClass('wmsThemeActivePrefRight');
        getSelBoxParent.parent().addClass('wmsThemeActivePrefLeft'); 
    } else {
        getSelBoxParent.parent().removeClass('wmsThemeActivePrefLeft');
        getSelBoxParent.parent().addClass('wmsThemeActivePrefRight');
    }
    $('#' + getSelectPrefBoxId).val(getSelectedVal);
    if (isPreferenceArrowsActivated == 'no') {
        isPreferenceArrowsActivated = 'yes';
        // Dashboard Counters
        activateUserPrefArrows("lstDsAvailableCounters", "lstMyDsSelectedCounters", "btnMoveLeft_DsCounter", "btnMoveRight_DsCounter", "btnMoveUp_DsCounter", "btnMoveDown_DsCounter", "hdnDSCountStatus");
        // Dashboard List
        activateUserPrefArrows("lstAvailableDashboard", "lstMySelectedDashboard", "btnMoveLeft_Dashboard", "btnMoveRight_Dashboard", "btnMoveUp_Dashboard", "btnMoveDown_Dashboard", "hdnDSGraphicStatus");
        // Dashboard ShortCuts
        activateUserPrefArrows("lstAvailableShortCut", "lstMySelectedShortCut", "btnMoveLeft_ShortCut", "btnMoveRight_ShortCut", "btnMoveUp_ShortCut", "btnMoveDown_ShortCut", "hdnDSShortCutStatus");
    }   
}

function activateUserPrefArrows(lstBoxAvailable, lstBoxSelected, btnArrowLeft, btnArrowRight, btnArrowUp, btnArrowDown, hdnField) {
    $('#' + btnArrowLeft).click(function () {
        $getSelectionBox = $('#' + lstBoxSelected);
        $getAvailableListBox = $('#' + lstBoxAvailable);

        $getSelectedText = $("#" + lstBoxSelected +" option:selected").text();
        $getSelectedValue = $("#" + lstBoxSelected + " option:selected").val();

        if ($getSelectedValue.trim() != '') {
            $getSelectedIndex = $("#" + lstBoxSelected +"").prop('selectedIndex');
            $("#" + lstBoxSelected +" option:selected").remove();

            var opt = new Option($getSelectedText, $getSelectedValue);
            $(opt).html($getSelectedText);
            $getAvailableListBox.append(opt);
            updateUserPreferenceList(lstBoxSelected, lstBoxAvailable, hdnField);
        }
    });

    $('#' + btnArrowRight).click(function () {
        $getSelectionBox = $('#' + lstBoxSelected);
        $getAvailableListBox = $('#' + lstBoxAvailable);

        $getSelectedText = $("#" + lstBoxAvailable +" option:selected").text();
        $getSelectedValue = $("#" + lstBoxAvailable + " option:selected").val();

        if ($getSelectedValue.trim() != '') {
            $getSelectedIndex = $("#" + lstBoxAvailable + "").prop('selectedIndex');
            $("#" + lstBoxAvailable + " option:selected").remove();

            var opt = new Option($getSelectedText, $getSelectedValue);
            $(opt).html($getSelectedText);
            $getSelectionBox.append(opt);
            updateUserPreferenceList(lstBoxSelected, lstBoxAvailable, hdnField);
        }
    });

    $('#' + btnArrowUp).click(function () {
        $getSelectionBox = $('#' + lstBoxSelected);
        $getAvailableListBox = $('#' + lstBoxAvailable);

        $getSelectedText = $("#" + lstBoxSelected +" option:selected").text();
        $getSelectedValue = $("#" + lstBoxSelected + " option:selected").val();
        if ($getSelectedValue.trim() != '') {
            $getSelectedIndex = $("#" + lstBoxSelected + "").prop('selectedIndex');
            if ($getSelectedIndex > 0) {
                $beforeIndex = $getSelectedIndex - 1;
                $("#" + lstBoxSelected + " option:eq(" + $getSelectedIndex + ")").after($("#" + lstBoxSelected + " option:eq(" + $beforeIndex + ")"));
            }
            updateUserPreferenceList(lstBoxSelected, lstBoxAvailable, hdnField);
        }
    });

    $('#' + btnArrowDown).click(function () {
        $getSelectionBox = $('#' + lstBoxSelected);
        $getAvailableListBox = $('#' + lstBoxAvailable);
        $getOptMaxIndex = $('#' + lstBoxSelected + '').children('option').length - 1;
       // alert($getOptLength);
        $getSelectedText = $("#" + lstBoxSelected + " option:selected").text();
        $getSelectedValue = $("#" + lstBoxSelected + " option:selected").val();
        if ($getSelectedValue.trim() != '') {
            $getSelectedIndex = $("#" + lstBoxSelected + "").prop('selectedIndex');
            if ($getSelectedIndex < $getOptMaxIndex) {
                $beforeIndex = $getSelectedIndex + 1;
                // alert($getSelectedIndex + ' : ' + $beforeIndex);
                $("#" + lstBoxSelected + " option:eq(" + $getSelectedIndex + ")").before($("#" + lstBoxSelected + " option:eq(" + $beforeIndex + ")"));
            }
            updateUserPreferenceList(lstBoxSelected, lstBoxAvailable, hdnField);
        }
    });
}
/*
window.open = function (open) {
    return function (url, name, features) {
        // set name if missing here
        name = name || "default_window_name";
        return open.call(window, url, name, features);
    };
}(window.open);
*/


/*
window.open = function (open) {
    return function (url, name, features) {
        // set name if missing here
        name = name || "default_window_name";
        var currentWindowWidth = '500px';
        var currentWindowHeight = '300px'
        var getWinFeatures = features.split(',');
        for (var i = 0; i <= (getWinFeatures.length - 1); i++) {
            var getCurrentFeature = getWinFeatures[i].split('=');
            var pName = getCurrentFeature[0];
            var pValue = getCurrentFeature[1];
            if (pName.trim().toLowerCase() == 'width') {
                currentWindowWidth = pValue;
            } else if (pName.trim().toLowerCase() == 'height') {
                currentWindowHeight = pValue;
            }
        }
        $('body').append('<div class="themeWmsPopup" style="display:block;"><div class="themeWmsPopupContent">' +
            '<div class= "themeWmsPopupTitle">' + name + '<div class= "themeWMS_ctrl_btn wms_show_ctrl" id = "btnCloseWindowPopup" style="float:right;"> <i class="fas fa-times-circle"></i></div ></div>' +
            '<div class="themeWmsPopupContentBody"><iframe style="width:' + currentWindowWidth + ';height:' + currentWindowHeight + ';" src="' + url +'" frameborder="0"></iframe></div>' +
            '</div> <div class="themeWmsPopupBg"></div></div>');
      //  return open.call(window, url, name, features);
        return false;
    };    
}(window.open);
*/

function openThemePopupWindow(winUrl, winTitle, winWidth, winHeight) {
    $('body').append('<div class="themeWmsPopup" style="display:block;"><div class="themeWmsPopupContent">' +
        '<div class= "themeWmsPopupTitle">' + winTitle + '<div class= "themeWMS_ctrl_btn wms_show_ctrl" id="btnCloseWindowPopup" style="float:right;"> <i class="fas fa-times-circle"></i></div ></div>' +
        '<div class="themeWmsPopupContentBody"><iframe style="width:' + winWidth + 'px;height:' + winHeight + 'px;" src="' + winUrl + '" frameborder="0"></iframe></div>' +
        '</div> <div class="themeWmsPopupBg"></div></div>');
        //  return open.call(window, url, name, features);
    $('#btnCloseWindowPopup').click(function () {
        alert('Closing Button...');
    });
}

function readThemeWmsColor(themeColorVar) {
    var getThemeColor = "#ffffff";
    try {
        var checkIfColorClass = $("#divColorReader").css("background-color", "var(--" + themeColorVar + ")");
        getThemeColor = $("#divColorReader").css("background-color");
    } catch (err) {
        // Do nothing...
    }
    return getThemeColor;
}

function showSubNav() {
   
}