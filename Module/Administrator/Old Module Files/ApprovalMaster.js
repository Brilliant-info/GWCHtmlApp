var currentApprovalHeadId = 0;
var maxApprovalLevel = 0;
var currentApprovalMaxLevel = 0;
var currentRowObject = '';
var currentRowApplication = '';
var strCurrentPage = "1";
var searchfilter = "0";
var searchvalueuser = "0";
var getCustomerId = $("#ddlcustomer").val();
var WarehouseID = $('#ddlwarehouse').val();
var getUserId = mBrillWmsSession.getUserId();
var getCompanyId = mBrillWmsSession.getCompanyId();

//var apiFolder = 'http://localhost:50068/';
//var wmsApiPath = 'http://localhost:50068/api/staging/v1/';

function initApprovalMaster() {
    addApprovalHeader();
    //activateApprovalMasterControl();
    $('.pnlEventControl').hide();
    $('.pnlEventApprover').hide();
    //GetApprovalList();
}

function resetAndRecallApprovalList() {
    $('#tblApprovalMasterList').html('');
    currentApprovalHeadId = 0;
    maxApprovalLevel = 0;
    currentApprovalMaxLevel = 0;
    currentRowObject = '';
    currentRowApplication = '';
    strCurrentPage = "1";
    searchfilter = "0";
    searchvalueuser = "0";
    getCustomerId = $("#ddlcustomer").val();
    WarehouseID = $('#ddlwarehouse').val();
    getUserId = mBrillWmsSession.getUserId();
    getCompanyId = mBrillWmsSession.getCompanyId();
}

function addApprovalHeader() {

    var levelClass = getColumnLevelClass('Level ' + maxApprovalLevel);
    var Approvalgrd = "";
    //#region Start Header Row of Grid
    Approvalgrd = Approvalgrd + '<div class="wms-srv-grid-header">';
    Approvalgrd = Approvalgrd + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Application</div>';
    Approvalgrd = Approvalgrd + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Object</div>';
    Approvalgrd = Approvalgrd + '<div class="wms-srv-grid-cell wms-align prependHere" style="text-align: center;">Action</div>';
    Approvalgrd = Approvalgrd + '</div>';
    Approvalgrd = Approvalgrd + '<div class="wms-srv-grid-row wms-align" data-recid="0">';
    Approvalgrd = Approvalgrd + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;"><select class="wms-srv-grid-cell-input" id="ddlapplication" onchange="BindObject();"></select></div>';
    Approvalgrd = Approvalgrd + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;"><select class="wms-srv-grid-cell-input" id="ddlobject"></select></div>' +
        // Approvalgrd = Approvalgrd + '<div class="wms-srv-grid-cell wms-align prependHere" style="text-align: center;">'+
        '<div class="wms-srv-grid-cell prependHere">' +
        '<div class="toggleHolder">' +
        '<div class="ctrlEvent ctrlAddEvent" data-levelnum="' + maxApprovalLevel + '"><i class="fas fa-cogs" data-original-title="" title=""></i></div>' +
        '<i class="fas fa-toggle-on btnToggle" data-isactive="Yes"></i>' +
        '<i class="fas fa-check-circle btnApprovalSave"></i>' +
        '<i class="fas fa-times-circle btnApprovalClear"></i>' +
        '</div>' +
        '</div>';

    $('#tblApprovalMasterList').html(Approvalgrd);
    // $("#ddlapplication").html('<option value="">--Select--</option>');
    // $("#ddlobject").html('<option value="">--Select--</option>');
    //BindApplication();
    GetApprovalList();
}

function addApprovalColumn() {
    debugger;
    maxApprovalLevel = maxApprovalLevel + 1;
    var levelClass = getColumnLevelClass('Level ' + maxApprovalLevel);
    $('#tblApprovalMasterList .wms-srv-grid-header .prependHere').before('<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Level ' + maxApprovalLevel + '</div>');
    $('#tblApprovalMasterList .wms-srv-grid-row .prependHere').before('<div class="wms-srv-grid-cell">' +
        '<div class="pnlApprovalHolder ' + levelClass + '">' +
        '<div class="ctrlEvent" data-levelnum="' + maxApprovalLevel + '"><i class="fas fa-cogs" title=""></i></div> ' +
        '<div class="ctrlUserGroup"></div>' +
        '&nbsp;<div class="ctrlAdd" style="visibility:hidden;"><i class="fas fa-user-cog"></i></div>' +
        '</div>' +
        '</div>');
    $('.userProfile img').tooltip({
        template: '<div class="tooltip approvalToolTip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    $('.ctrlEvent i').tooltip({
        template: '<div class="tooltip approvalToolTip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    var nextLevel = maxApprovalLevel + 1;
    $('#tblApprovalMasterList .wms-srv-grid-row .prependHere').find('.ctrlEvent').attr('data-levelnum', nextLevel);
}



function activateApprovalMasterControl() {
    $('#tblApprovalMasterList .ctrlEvent').each(function () {
        var getEventTitle = $(this).find('i').attr('title');
        var getEventOrgTitle = $(this).find('i').attr('data-original-title');
        if (getEventOrgTitle == '' && getEventTitle == '') {
            var hasAddClass = $(this).find('i').hasClass('ctrlAddEvent');
            if (hasAddClass != true) {
                $(this).addClass('ctrlAddEvent');
            }
        }
    });
    $('.ctrlAddEvent').off();
    $('.ctrlAddEvent').click(function () {
        var getParentObj = $(this).parent().parent().parent();
        var getParentObjRecId = $(getParentObj).attr('data-recid');
        var getAddEventLevel = $(this).attr('data-levelnum');
        GetEventList(this, getParentObjRecId, getAddEventLevel);
    });

    $('.ctrlAdd').off();
    $('.ctrlAdd').click(function () {
        //GetEventList(this);
        GetApproUserList(this);
    });

    $('.btnToggle').off();
    $('.btnToggle').click(function () {
        var isToggleActive = $(this).attr('data-isactive');
        if (isToggleActive == 'Yes') {
            $(this).attr('data-isactive', 'no');
            $(this).addClass('fa-flip-horizontal');
            $(this).css('color', '#cccccc');
        } else {
            $(this).attr('data-isactive', 'Yes');
            $(this).removeClass('fa-flip-horizontal');
            $(this).css('color', '#00acd7');
        }
    });
    $('.wms-srv-approver-member-list-popup').show();

    // MOVED CODE IS HERE
    $('.userProfile').off();
    $('.userProfile').each(function () {
        var myFilePath = $(this).find('img').attr('src').split('/');
        // $(this).find('img').attr('title', myFilePath[myFilePath.length - 1]);

        // $(this).find('img').attr('title', 'S.R. Deshmukh');
    });
    $('.userProfile img').tooltip({
        template: '<div class="tooltip approvalToolTip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    $('.ctrlEvent i').tooltip({
        template: '<div class="tooltip approvalToolTip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    $('#tblApprovalMasterList .wms-srv-grid-row').each(function () {
        $(this).find('.ctrlAddEvent').css('visibility', 'hidden');
        $(this).find('.ctrlAddEvent').eq(0).css('visibility', 'visible');
    });



    $('.btnApprovalSave').off();
    $('.btnApprovalSave').click(function () {
        var getParentObjDraft = $(this).parent().parent().parent();
        var getParentObjApproId = $(getParentObjDraft).attr('data-recid');
        FinalSaveRemoveDraftRec('Save', getParentObjApproId);
    });
    $('.btnApprovalClear').off();
    $('.btnApprovalClear').click(function () {
        var getParentObjDraft = $(this).parent().parent().parent();
        var getParentObjApproId = $(getParentObjDraft).attr('data-recid');
        FinalSaveRemoveDraftRec('Remove', getParentObjApproId);
    });
}
function activateApprovalEventPopupControl(obj, recid, ValApplication, ValObject, getAddEventLevel) {
    var position = $(obj).parent().position();
    //var position =  { top: -1, left: -1 };
    // position.left = event.pageX;
    // position.top = event.pageY;

    var getEventPopupWidth = $('.pnlEventControl').width();
    var evtTop = position.top + 0;
    var evtLeft = (position.left - 35) - getEventPopupWidth;
    // var evtTop = position.top - 20;
    // var evtLeft = position.left - 20;
    $('.pnlEventControl').css('left', evtLeft + 'px');
    $('.pnlEventControl').css('top', evtTop + 'px');
    $('.pnlEventControl').show();
    $('.pnlEventControl .eventItem').off();
    $('.pnlEventControl .eventItem').click(function () {
        //addApprovalColumn();
        // Save Event Details
        var eventTitle = $(this).text();
        SaveApprovalHead(obj, recid, ValApplication, ValObject, getAddEventLevel, eventTitle);
        $('.pnlEventControl').hide();
    });
    $('.btnCloseEventPanel').off();
    $('.btnCloseEventPanel').click(function () {
        $('.pnlEventControl').hide();
    });
}

function activateApprovalMemberPopupControl(obj) {
    debugger;
    var parentPosition = $(obj).parent().position();
    var position = $(obj).position();
    // var position =  { top: -1, left: -1 };
    // position.left = event.pageX;
    // position.top = event.pageY;

    //var evtTop = position.top + 30;
    //var evtLeft = position.left + 30;
    $('.eventApproverItem').show();
    $('.pnlEventApprover').show();
    var getEventPopupWidth = $('.pnlEventApprover').width();
    var evtTop = parentPosition.top + position.top + 0;
    var evtLeft = (parentPosition.left + position.left) - (getEventPopupWidth + 10);
    $('.pnlEventApprover').css('left', evtLeft + 'px');
    $('.pnlEventApprover').css('top', evtTop + 'px');

    /* $('.pnlEventApprover .eventApproverItem').off();
    $('.pnlEventApprover .eventApproverItem').click(function(){
        var isSelected = $(this).attr('data-isselected');
        if(isSelected == 'yes'){
            $(this).attr('data-isselected','no');
            $(this).removeClass('approverSelected');
        }else{
            $(this).attr('data-isselected','yes');
            $(this).addClass('approverSelected');
        }
    }); */
    $('.btnCloseEventApprover').off();
    $('.btnCloseEventApprover').click(function () {
        $('.pnlEventApprover').hide();
        resetAndRecallApprovalList();
        initApprovalMaster();
    });
    $('.pnlEventApprover .btnRemoveApprover').off();
    $('.pnlEventApprover .btnRemoveApprover').click(function () {
        // $('.pnlEventApprover').hide();
        $(this).parent().hide();
        return false;
    });
    $('.pnlEventApprover .btnAddApprover').off();
    $('.pnlEventApprover .btnAddApprover').click(function () {
        $('#wms-srv-approver-member-list-popup').show();
    });
    $('#wms-srv-approver-member-list-popup-close').off();
    $('#wms-srv-approver-member-list-popup-close').click(function () {
        $('#wms-srv-approver-member-list-popup').hide();
    });

    $('.btnSelectApproverFromList').off();
    $('.btnSelectApproverFromList').click(function () {

    });
}

//#region Start Approval Grid Binding code

function GetApprovalList() {
    debugger;
    var apiPath = wmsApiPath + 'ApprovalMaster/GetMApprovalhead';
    searchfilter = $("#ddlUserSearch").val();
    searchvalueuser = $("#txtsearchuser").val();

    if (searchfilter == '0') {
        searchfilter = '0';
        searchvalueuser = '0';
    }

    var postData =
    {
        "Customerid": getCustomerId,
        "warehouseid": WarehouseID,
        "UserID": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isDraftFound = 'no';
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
            // var strTotalRecords = getresult.Table[0].TotalRecord;
            var currentDraftRowNum = 0;
            var getAllApprovallist = getresult.Table;

            for (var il = 0; il < getAllApprovallist.length; il++) {
                // var getrowno = getAllApprovallist[il].rownumber;
                var getApprovalID = getAllApprovallist[il].ApprovalID;
                var getApplication = getAllApprovallist[il].Application;
                var getObject = getAllApprovallist[il].Object;
                var getActive = getAllApprovallist[il].Active;
                var getEvent = getAllApprovallist[il].Event;
                var getCondition = getAllApprovallist[il].Condition;
                var getApproLevel = getAllApprovallist[il].ApproLevel;
                var getLevelInfo = getAllApprovallist[il].LevelInfo;
                var getDraftstatus = getAllApprovallist[il].Draftstatus;

                //#region Start First Row of Grid to Add Records
                if (currentRowObject == getObject && currentRowApplication == getApplication) {
                    // Do nothing here...
                } else {
                    var createApprovalId = getApprovalRowId(getApplication, getObject);
                    var ApprovalgrdRow = '';
                    ApprovalgrdRow = ApprovalgrdRow + '<div class="wms-srv-grid-row wms-align approvalRowNum' + il + '" data-recid="' + getApprovalID + '" data-rowapp="' + getApplication + '" data-rowobj="' + getObject + '" id="' + createApprovalId + '">';
                    //if(il == 0){
                    if (getDraftstatus.trim() == 'Draft') {
                        ApprovalgrdRow = ApprovalgrdRow + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;"><select class="wms-srv-grid-cell-input" id="ddlapplication" onchange="BindObject();" disabled="disabled"><option value="' + getApplication + '">' + getApplication + '</option></select></div>';
                        ApprovalgrdRow = ApprovalgrdRow + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;"><select class="wms-srv-grid-cell-input" id="ddlobject" disabled="disabled"><option value="' + getObject + '">' + getObject + '</option></select></div>';
                        isDraftFound = 'yes';
                        currentDraftRowNum = il;
                    } else {
                        ApprovalgrdRow = ApprovalgrdRow + '<div class="wms-srv-grid-cell">';
                        ApprovalgrdRow = ApprovalgrdRow + getApplication;
                        ApprovalgrdRow = ApprovalgrdRow + '</div>';
                        ApprovalgrdRow = ApprovalgrdRow + '<div class="wms-srv-grid-cell">';
                        ApprovalgrdRow = ApprovalgrdRow + getObject;
                        // ApprovalgrdRow = ApprovalgrdRow + '</select>';
                        ApprovalgrdRow = ApprovalgrdRow + '</div>';
                    }

                    ApprovalgrdRow = ApprovalgrdRow +
                        '<div class="wms-srv-grid-cell prependHere">' +
                        '<div class="toggleHolder">' +
                        '<div class="ctrlEvent ctrlAddEvent" data-levelnum="' + maxApprovalLevel + '"><i class="fas fa-cogs" data-original-title="" title=""></i></div>' +
                        '<i class="fas fa-toggle-on btnToggle" data-isactive="Yes"></i>';
                    if (getDraftstatus.trim() == 'Draft') {
                        ApprovalgrdRow = ApprovalgrdRow + '<i class="fas fa-check-circle btnApprovalSave"></i>' +
                            '<i class="fas fa-times-circle btnApprovalClear"></i>';
                    }
                    ApprovalgrdRow = ApprovalgrdRow + '</div>' +
                        '</div>';
                    ApprovalgrdRow = ApprovalgrdRow + '</div>';
                    $('#tblApprovalMasterList').append(ApprovalgrdRow);
                    if (il == 0) {
                        if (getDraftstatus.trim() == 'Draft') {
                            $('#tblApprovalMasterList .wms-srv-grid-row[data-recid="0"]').remove();
                            //BindApplication(getApplication, getObject);
                        } else {
                            BindApplication('', '');
                        }
                    }
                }
                currentRowObject = getObject;
                currentRowApplication = getApplication;
                var myApprovalColNum = checkForApprovalColumn(getApproLevel);
                //#endregion End First Row of Grid to Add Records
            }
            if (getAllApprovallist.length == 0) {
                BindApplication('', '');
            }

            /*
            if(isDraftFound == 'yes'){
                $('#tblApprovalMasterList .wms-srv-grid-row[data-recid="0"]').remove();
            } */
            for (var i = 0; i <= currentApprovalMaxLevel; i++) {
                addApprovalColumn();
            }
            for (var usr = 0; usr < getAllApprovallist.length; usr++) {
                debugger;
                var getUserObj = getAllApprovallist[usr].Object;
                var getUserApplication = getAllApprovallist[usr].Application;
                var getApprovalId = getApprovalRowId(getUserApplication, getUserObj);
                var getUserLevel = getAllApprovallist[usr].ApproLevel;
                var getLevelInfo = getAllApprovallist[usr].LevelInfo;
                //if(getLevelInfo.trim() != ''){
                var getEvent = getAllApprovallist[usr].Event;
                var breakLevelInfo = getLevelInfo.split('|');
                for (var bl = 0; bl < breakLevelInfo.length; bl++) {
                    var levelClass = getColumnLevelClass(getUserLevel);
                    if (getLevelInfo.trim() != '') {
                        var breakUserInfo = breakLevelInfo[bl].split(':');
                        var getApproverId = breakUserInfo[0];
                        var getApprovalName = breakUserInfo[1];
                        var userProfile = '<div class="userProfile"><img src="Images/profile-pic/nopic.png" title="' + getApprovalName + '" data-original-title="' + getApprovalName + '"></div> ';
                        $('#' + getApprovalId + ' .' + levelClass + ' .ctrlUserGroup').append(userProfile);
                    }

                    $('#' + getApprovalId + ' .' + levelClass + ' .ctrlEvent i').attr('title', getEvent);
                    $('#' + getApprovalId + ' .' + levelClass + ' .ctrlEvent i').attr('data-original-title', getEvent);
                    $('#' + getApprovalId + ' .' + levelClass + ' .ctrlUserGroup').parent().find('.ctrlAdd').css('visibility', 'visible');
                    //  $('#' + getApprovalId  + ' .' + levelClass + ' .ctrlUserGroup').parent().append('<div class="ctrlAdd"><i class="fas fa-user-cog"></i></div>');
                }
                // }
            }
            activateApprovalMasterControl();
        }
        else {
            alert('Something went wrong.');
        }
    });
}

function getApprovalRowId(applicationName, objName) {
    var cnApplicationName = applicationName.split(' ').join('-');
    var cnObjectName = objName.split(' ').join('-');
    var approvalRowId = cnApplicationName + '_' + cnObjectName;
    return approvalRowId;
}

function getColumnLevelClass(levelName) {
    var cnLevelnName = levelName.split(' ').join('-');
    return cnLevelnName;
}

function checkForApprovalColumn(approvalLevel) {
    var apprvalColNum = 0;
    var extractColNum = Number(approvalLevel.replace('Level ', ''));
    if (extractColNum > maxApprovalLevel) {
        apprvalColNum = extractColNum;
        currentApprovalMaxLevel = extractColNum;
        //addApprovalColumn();
    }
    return apprvalColNum;
}

//#endregion End Approval Grid Binding code


//#region  Start Application DropDown Code
var spnapplication = [];
var spnapplicationid = [];

function BindApplication(getApplication, getObject) {
    debugger;
    var apiPath = wmsApiPath + 'ApprovalMaster/GetApplication';
    var postData = {
        "CompanyId": getCompanyId,
        "CustomerID": getCustomerId,
        "UserId": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnapplication = [];
            spnapplicationid = [];
            $("#ddlapplication").html('<option value="">--Select--</option>');
            spnapplication.push('--Select List--');
            spnapplicationid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    //var typeId =grnContainerSize[i].ID;
                    var typeId = grnContainerSize[i].Value;
                    var typevalue = grnContainerSize[i].Value;
                    spnapplication.push(typevalue);
                    spnapplicationid.push(typeId);
                    var isSelectedApp = '';
                    if (getApplication == typevalue) {
                        isSelectedApp = 'selected="selected"';
                    }
                    $("#ddlapplication").append('<option value = "' + typeId + '" ' + isSelectedApp + '>' + typevalue + '</option>');
                }
            }
            BindObject(getObject);
        }
    });
}

//#endregion Start Application DropDOwn Code

//#region Start Object DropdownCode
var spnObject = [];
var spnObjectid = [];

function BindObject(getObject) {
    var getApplicationVal = $('#ddlapplication').val();
    if (getApplicationVal != '') {
        debugger;
        var apiPath = wmsApiPath + 'ApprovalMaster/GetApproObject';
        var Applicationvalue = $("#ddlapplication option:selected").text();
        var postData = {

            "Application": Applicationvalue,
            "CompanyID": getCompanyId,
            "CustomerID": getCustomerId,
            "UserID": getUserId
        };
        callHttpUrl(apiPath, postData, function (data) {
            var isStatus = data.Status;
            if (isStatus == 200) {
                spnObject = [];
                spnObjectid = [];
                $("#ddlobject").html('<option value="">--Select--</option>');
                spnObject.push('--Select List--');
                spnObjectid.push('0');
                var myGridList = data.Result;
                var grnContainerSize = myGridList.Table;
                if (grnContainerSize.length > 0) {
                    for (var i = 0; i < grnContainerSize.length; i++) {
                        //var typeId =grnContainerSize[i].ID;
                        var typeId = grnContainerSize[i].Value;
                        var typevalue = grnContainerSize[i].Value;
                        spnObject.push(typevalue);
                        spnObjectid.push(typeId);
                        var isSelectedObj = '';
                        if (getObject != null && getObject == typevalue) {
                            isSelectedObj = 'selected="selected"';
                        }
                        $("#ddlobject").append('<option value = "' + typeId + '" ' + isSelectedObj + '>' + typevalue + '</option>');
                    }
                }
            }
        });
    } else {
        $("#ddlobject").html('<option value="">--Select--</option>');
    }

}

//#endregion End Object Dropdown Code

//#region Start Code for Event list binding
function GetEventList(obj, recid, getAddEventLevel) {
    debugger;
    var ValApplication = $("#ddlapplication option:selected").text();
    var ValObject = $("#ddlobject option:selected").text();

    if (recid == 0) {
        ValApplication = $("#ddlapplication option:selected").text();
        ValObject = $("#ddlobject option:selected").text();
    } else {
        ValApplication = $('#tblApprovalMasterList div[data-recid="' + recid + '"]').attr('data-rowapp');
        ValObject = $('#tblApprovalMasterList div[data-recid="' + recid + '"]').attr('data-rowobj');
    }

    var apiPath = wmsApiPath + 'ApprovalMaster/GetApproEvent';
    var postData = {
        "Object": ValObject,
        "Application": ValApplication,
        "CompanyID": getCompanyId,
        "CustomerID": getCustomerId,
        "UserID": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            $('.pnlEventControl .eventItemHolder').html('');
            var myEventList = data.Result;
            var ApproEventList = myEventList.Table;
            for (var i = 0; i < ApproEventList.length; i++) {
                var getEvent = ApproEventList[i].Event;
                $('.pnlEventControl .eventItemHolder').append('<div class="eventItem">' + getEvent + '</div>');
            }
            activateApprovalEventPopupControl(obj, recid, ValApplication, ValObject, getAddEventLevel);
        }
    });
}
//#endregion End Code for Event list binding

//#region  Start Code for Approver User List
function GetApproUserList(obj) {
    debugger;
    var ValApplication = $("#ddlapplication").val();
    var ValObject = $("#ddlobject").val();

    var getEventCell = $(obj).parent().find('.ctrlEvent i').attr('data-original-title');
    var getLevelNum = $(obj).parent().find('.ctrlEvent').attr('data-levelnum');
    var UsrApproLevel = 'Level ' + getLevelNum;

    var objParent = $(obj).parent().parent().parent();
    var UsrApproHheadid = $(objParent).attr('data-recid');

    var apiPath = wmsApiPath + 'ApprovalMaster/GetApproverList';
    var postData = {
        "CompanyID": getCompanyId,
        "CustomerID": getCustomerId,
        "WarehouseID": WarehouseID,
        "ApproHeadID": UsrApproHheadid,
        "Level": UsrApproLevel,
        "UserID": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            $('.pnlEventApprover .eventApproverHolder').html('');
            var myUserList = data.Result;
            var Condition = myUserList.Table.Condition;
            var ApproUserlist = myUserList.Table1;

            var getTableCondition = myUserList.Table[0].Condition;
            if (getTableCondition.trim() == 'AND') {
                $('.pnlEventApprover .eventCodition input[value="OR"]').prop('checked', false);
                $('.pnlEventApprover .eventCodition input[value="AND"]').prop('checked', true);
            } else {
                $('.pnlEventApprover .eventCodition input[value="OR"]').prop('checked', true);
                $('.pnlEventApprover .eventCodition input[value="AND"]').prop('checked', false);
            }

            for (var i = 0; i < ApproUserlist.length; i++) {
                var getapproverID = ApproUserlist[i].ID;
                var GetApproverName = ApproUserlist[i].UserName;
                var GetApproverAssign = ApproUserlist[i].Assigntolevel;

                var isSelectedCSS = '';
                var isSelectedAttr = GetApproverAssign.trim().toLocaleLowerCase();
                if (GetApproverAssign.trim() == 'Yes') {
                    isSelectedCSS = 'approverSelected';
                }

                $('.pnlEventApprover .eventApproverHolder').append('<div class="eventApproverItem ' + isSelectedCSS + '" data-isselected="' + isSelectedAttr + '" data-uid="' + getapproverID + '">' +
                    '<div class="userProfile"><img src="Images/profile-pic/nopic.png" data-original-title="" title=""></div>' +
                    '<div class="profileName">' + GetApproverName + '</div>' +
                    '<i class="fas fa-check-circle" data-uid="' + getapproverID + '"></i>' +
                    '</div>');
                // $('.pnlEventApprover .eventApproverHolder').append('<div class="eventItem">'+ getEvent +'</div>');
            }

            $('.pnlEventApprover .eventApproverItem').off();
            $('.pnlEventApprover .eventApproverItem').click(function () {
                var getApproverId = $(this).attr('data-uid');
                var isSelected = $(this).attr('data-isselected');
                if (isSelected == 'yes') {
                    //$(this).attr('data-isselected','no');
                    // $(this).removeClass('approverSelected');
                    RemoveApproverUser(UsrApproHheadid, UsrApproLevel, getApproverId, this);
                } else {
                    // $(this).attr('data-isselected','yes');
                    // $(this).addClass('approverSelected');

                    var checkCondition = '';
                    var isAndSelected = $('.pnlEventApprover .eventCodition input[value="AND"]').prop('checked');
                    if (isAndSelected == true) {
                        checkCondition = 'AND';
                    } else {
                        checkCondition = 'OR';
                    }
                    SaveApprovalDetail(UsrApproHheadid, UsrApproLevel, getApproverId, getEventCell, checkCondition, this);
                }
            });

            activateApprovalMemberPopupControl(obj);
        }
    });
}

//#endregion End Code for Approver User List

//#region Start Code for Approval User Remove functionality

function RemoveApproverUser(ApproHeadID, ApproLevel, Approverid, icoObj) {
    debugger;
    //if(confirm("Do you want to Remove Approver.Please confirm?")== true)
    // {
    var apiPath = wmsApiPath + 'ApprovalMaster/RemoveApprovalUser';
    var postData =
    {
        "ApprovalHeadID": ApproHeadID,
        "Level": ApproLevel,
        "ApproverID": Approverid,
        "ModifiedByID": getUserId
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
            var returnmsg = getresult.Message;
            if (getstatus == "200") {
                //alert("Approver removed successfully.");               
                //GetApprovalList(strCurrentPage,searchfilter, searchvalueuser)
                $(icoObj).attr('data-isselected', 'no');
                $(icoObj).removeClass('approverSelected');
            }
            else {
                alert("Approver removal failed.");
            }
        }
        else {
            alert("Error Occured.");
        }
    });
    //}
    //else{}

}

//#endregion End Code for Approval User Remove functionality

//#region Start Approval Head Save Code

function SaveApprovalHead(obj, recid, ValApplication, ValObject, getAddEventLevel, eventTitle) {
    debugger;
    var Active = 'No';

    // var ValApplication = $("#ddlapplication").val();
    //  var ValObject = $("#ddlobject").val();
    var getEditObj = $('.wms-srv-grid-row[data-recid="' + recid + '"]');
    var isActive = $(getEditObj).find('i.btnToggle').attr('data-isactive');
    var apiPath = wmsApiPath + 'ApprovalMaster/SaveApprovalHead';
    var postData =
    {
        "Application": ValApplication,
        "Object": ValObject,
        "Event": eventTitle,
        "ApproLevel": "Level " + getAddEventLevel,
        "Active": isActive,
        "CompanyID": getCompanyId,
        "CustomerID": getCustomerId,
        "WarehouseID": WarehouseID,
        "UserID": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getResult = data.Result;
        var getMessage = getResult.Message;
        if (getStatusCode.toLocaleLowerCase() == 'success') {

            var getNewApproHeadid = getResult.OrderNo;
            $("#hdnApprovalID").val(getNewApproHeadid);
            $(getEditObj).attr('data-recid', getNewApproHeadid);
            $(getEditObj).attr('data-rowapp', ValApplication);
            $(getEditObj).attr('data-rowobj', ValObject);
            currentApprovalHeadId = getNewApproHeadid;

            // Code to remove class from event button
            //var getEventButton = $('div[data-recid="'+ recid +'"] .ctrlEvent[data-levelnum="' + getAddEventLevel + '"]');
            var getEventButton = $('div[data-recid="' + getNewApproHeadid + '"] .ctrlEvent[data-levelnum="' + getAddEventLevel + '"]');
            $(getEventButton).removeClass('ctrlAddEvent');
            $(getEventButton).find('i.fa-cogs').attr('title', eventTitle);
            $(getEventButton).find('i.fa-cogs').attr('data-original-title', eventTitle);
            $(getEventButton).parent().find('.ctrlAdd').css('visibility', 'visible');
            activateApprovalMasterControl();
            //  SaveApprovalDetail(getNewApproHeadid,ApprovalLevel)   //***pass Approval Level in this method*/
            // resetAndRecallApprovalList();
            //alert('Save Success');
            //GetApprovalList(strCurrentPage,searchfilter, searchvalueuser);            
        }
        else if (getStatus == '300') {
            alert(getMessage);
        }
        else {
            alert(getMessage);
        }
    });
}

//#endregion End Approval Head Save Code

//#region Start Approval Detail Save Code


function SaveApprovalDetail(ApprovalHeadID, ApprovalLevel, ApprovedID, EventTitle, Condition, iconBtn) {
    debugger;
    var Active = 'No';

    var ValApplication = $("#ddlapplication").val();
    var ValObject = $("#ddlobject").val();


    var apiPath = wmsApiPath + 'ApprovalMaster/SaveApprovalDetail';
    var postData =
    {
        "ApHeadID": ApprovalHeadID,
        "ApproLevel": ApprovalLevel,
        "ApproverID": ApprovedID,
        "UserID": getUserId,
        "Event": EventTitle,
        "Condition": Condition,

    };
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getstatus = data.Status;
        var getStatusCode = data.StatusCode.trim().toLocaleLowerCase();
        if (getstatus == "200" && getStatusCode == "success") {
            //var returnmsg = data.Result.Message.trim().toLocaleLowerCase();
            if (getstatus == "200") {
                $(iconBtn).attr('data-isselected', 'yes');
                $(iconBtn).addClass('approverSelected');
                // Call Saved Approver User List Here  
            }
            else {
                alert(returnmsg);
            }
        }
        else if (getstatus == "300") {
            var returnmsg = getresult.Message;
            alert(returnmsg);
        }
        else {
            alert("Error Occured.");
        }

    });
}

//#endregion End Approval Detail Save Code


//#region  Final Save Or Remove draft mode record row

function FinalSaveRemoveDraftRec(Param, ApproHeadID) {
    debugger;
    if (confirm("Do you want to Remove Approval record.Please confirm?") == true) {
        var apiPath = wmsApiPath + 'ApprovalMaster/SaveRemoveApprovalRec';
        var postData =
        {
            "Param": Param,
            "ApproHeadID": ApproHeadID,
            "UserID": getUserId
        };

        callHttpUrl(apiPath, postData, function (data) {
            var getstatus = data.Status;
            var getstatuscode = data.StatusCode;
            var getresult = data.Result;
            if (getstatus == "200" && getstatuscode == "Success") {
                var returnmsg = getresult.Message;
                if (returnmsg == "success") {
                    if (Param == 'Save') {
                        alert("Data saved successfully!!");
                    } else {
                        alert("Data removed successfully!!");
                    }

                    resetAndRecallApprovalList();
                    initApprovalMaster();
                    //GetApprovalList(strCurrentPage,searchfilter, searchvalueuser)
                    // $(icoObj).attr('data-isselected','no');
                    // $(icoObj).removeClass('approverSelected');
                }
                else {
                    alert("Action failed.");
                }
            }
            else {
                alert("Error Occured.");
            }
        });
    }
    else { }

}
//#endregion End Final Save Or Remove draft mode record row