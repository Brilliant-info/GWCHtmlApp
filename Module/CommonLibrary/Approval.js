var getAppCustomerId = $("#ddlcustomer").val();
var getAppWarehouseID = $('#ddlwarehouse').val();
var getAppUserId = mBrillWmsSession.getUserId();
var getAppCompanyId = mBrillWmsSession.getCompanyId();
var currentApprovalTransLevel = '';
var currentApprovalOrderId = '';
var currentApprovalOrderTitle = '';
var CurrentUserApprolLevel = '';

//var wmsApiPath = 'http://localhost:50068/api/staging/v1/';


function openApprovalTrans(oid, objTitle) {
    debugger;
    currentApprovalOrderId = oid;
    currentApprovalOrderTitle = objTitle;
    $('#wms-srv-approval-popup').show();
    $('#wms-srv-approval-popup-close').off();
    $('#wms-srv-approval-popup-close').click(function () {
        $('#wms-srv-approval-popup').hide();
    });
    addApprovalGridHead();
    GetApprovalRecordbyOrder(oid, objTitle);
    //activateApprovalControl();
}

function resetAndRecallApprovalGrid(){
    $('#tblApprovalTransHead .wmsApprovalHeadColumn').remove();
    $('#wmsGridApprovalList .wmsApproverRow').remove();
    currentApprovalTransLevel = '';
    $('#wmsGridApprovalList').html('');
    addApprovalGridHead();
    GetApprovalRecordbyOrder(currentApprovalOrderId, currentApprovalOrderTitle);
}

function addApprovalColumn(eventTitle, levelTitle, levelNum){
    $('#tblApprovalTransHead .wms-srv-grid-header').append('<div class="wms-srv-grid-cell wms-align wmsApprovalHeadColumn" style="text-align: center;">'+ levelTitle +'</div>');
    $('#tblApprovalTransHead .wms-srv-grid-row').append('<div class="wms-srv-grid-cell wmsApprovalHeadColumn">' + 
    '<div class="pnlApprovalHolder wmsApprovalHeadLevel'+ levelNum +'">' + 
        '<div class="ctrlEvent" onclick="showHideLevelWiseColumn('+ levelNum +');"><i class="fas fa-cogs" title="'+ eventTitle +'"></i></div>'+
        '</div>' + 
    '</div>');
}

function addApprovalGridHead(){
    $('#tblApprovalTransHead').html('<div class="wms-srv-grid-header"><div class="wms-srv-grid-cell wms-align" style="text-align: center;">Application</div>' + 
    '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Object</div></div>' + 
    '<div class="wms-srv-grid-row wms-align"><div class="wms-srv-grid-cell" id="divApprovalApplication" >-</div>' + 
    '<div class="wms-srv-grid-cell" id="divApprovalObject">-</div></div>');

    $('#wmsGridApprovalList').html('<div class="wms-srv-grid-header">' + 
    '<div class="wms-srv-grid-cell" style="width: 35px;"></div>' + 
    '<div class="wms-srv-grid-cell">Approver Name</div>' + 
    '<div class="wms-srv-grid-cell">Level</div>' + 
    '<div class="wms-srv-grid-cell">Date</div>' + 
    '<div class="wms-srv-grid-cell">Remark</div>' + 
    '<div class="wms-srv-grid-cell">Approval</div>' +
    '</div>');
}

function addApproverMemberToLevel(approverTitle, approvalLevelNum, isCurrentActive){
   // $('.activeUserProfile').removeClass('activeUserProfile');
    var currentActiveClass = '';
    if(isCurrentActive == 'Yes'){
        currentActiveClass = 'activeUserProfile';
    }else{
        currentActiveClass = '';
    }
    $('.wmsApprovalHeadLevel' + approvalLevelNum).append('<div class="userProfile '+ currentActiveClass +'"><img src="Images/profile-pic/nopic.png" title="'+ approverTitle +'" /></div>&nbsp;');
    
}

function showHideLevelWiseColumn(levelNum){
    $('#wmsGridApprovalList .wms-srv-grid-row').hide();
    $('#wmsGridApprovalList .wmsApprovalLevel'+ levelNum).show();
    var getLevelTitle = $('.wmsApprovalHeadLevel' + levelNum).find('i').attr('data-original-title');
    $('#pnlApprovalGridTitle').html('Approval Level '+ levelNum +' - ' + getLevelTitle);
}

// CUSTOM APPROVAL CODE... 
function activateApprovalControl(){
    // $('.userProfile').off();
    // $('.userProfile').each(function(){
    //     var myFilePath = $(this).find('img').attr('src').split('/');
    //    // $(this).find('img').attr('title', myFilePath[myFilePath.length - 1]);
    //    $(this).find('img').attr('title', 'S.R. Deshmukh (24/09/2023): The price change looks okay. It is approved by me.');
    // });
    $('#tblApprovalTransHead .wms-srv-grid-row .pnlApprovalHolder').append('<div class="ctrlAdd"><i class="fas fa-user-cog"></i></div>');
    $('#wmsGridApprovalList .wms-srv-grid-header').after($('.currentApprovalRow'));
    var getLevelNum = '1';
    if(CurrentUserApprolLevel.trim() != ''){
        getLevelNum = Number(CurrentUserApprolLevel.replace('Level ', ''));
    }
    
    $('.userProfile img').tooltip({
        template: '<div class="tooltip approvalToolTip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
      });
    $('.ctrlEvent i').tooltip({
        template: '<div class="tooltip approvalToolTip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
      });
      showHideLevelWiseColumn(getLevelNum);
    $('.ctrlAdd').off();
    $('.ctrlAdd').click(function(){
        debugger;
        var parentPosition = $(this).parent().position();
        var position = $(this).position();
        $('.eventApproverItem').show();
        $('.pnlEventApprover').show();
        var getEventPopupWidth = $('.pnlEventApprover').width();
        var evtTop = parentPosition.top + position.top + 0;
        var evtLeft = (parentPosition.left + position.left) - (getEventPopupWidth + 10);
        $('.pnlEventApprover').css('left',evtLeft + 'px');
        $('.pnlEventApprover').css('top',evtTop + 'px');
        $('.btnCloseEventApprover').off();
        $('.btnCloseEventApprover').click(function(){
            $('.pnlEventApprover').hide();
        });
    });
}

//#region Start Code to Get Approval Records for order
function  GetApprovalRecordbyOrder(OrderID,ApproObject)
{
    debugger;
    //resetAndRecallApprovalGrid();
    var apiPath = wmsApiPath + 'ApprovalMaster/GetApprovalTrans';
    var postData = 
    {
            "Object": ApproObject,
            "ReferenceID": OrderID,
            "UserID": getAppUserId,
            "CustomerID": getAppCustomerId,
            "WarehouseID": getAppWarehouseID
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		 {
            var getApplicationName = getresult.Table[0].Application;
            var getObjectName = getresult.Table[0].Object;
            $('#divApprovalApplication').html(getApplicationName);
            $('#divApprovalObject').html(getObjectName);
            if(getresult.Table2.length > 0){
                CurrentUserApprolLevel = getresult.Table2[0].CurrentLevel;
            }
           
            var getApproverlst = getresult.Table1;
            for(var i=0; i < getApproverlst.length; i++){
                var getApproverID = getApproverlst[i].ApproverID;
                var getApproverName = getApproverlst[i].ApproverName;
                var getApproLevel = getApproverlst[i].ApproLevel;
                var getLevelNum = Number(getApproLevel.replace('Level ', ''));
                var getApproEvent = getApproverlst[i].ApproEvent;
                var getCondition = getApproverlst[i].Condition;
                var getApprovalDate = getApproverlst[i].ApprovalDate;
                var getRemark = getApproverlst[i].Remark;
                var getApprovalFlag = getApproverlst[i].ApprovalFlag;
                var getStatus = getApproverlst[i].Status;
                var getApprovedby = getApproverlst[i].Approvedby;

                var icoStatus = '';
                if(getStatus == 'Approved'){
                    icoStatus = '<i class="fas fa-check-circle"></i>';
                }else if(getStatus == 'Rejected'){
                    icoStatus = '<i class="fas fa-times-circle"></i>';
                }
                if(currentApprovalTransLevel != getApproLevel){
                    addApprovalColumn(getApproEvent, getApproLevel, getLevelNum); 
                    currentApprovalTransLevel = getApproLevel;
                }
                var approverTitle= '';
                if(getRemark.trim() != ''){
                    approverTitle= getApproverName + ' ('+ getApprovalDate +'): ' + getRemark;
                }else{
                    approverTitle= getApproverName;
                }
                if((getStatus.trim() == '') && (getApproverID == getAppUserId) && (CurrentUserApprolLevel == ('Level ' + getLevelNum))){
                // // To clear text field and action from previous row... 
                // $('.currentApprovalRow .aprActionCell').html('');
                // var getAprRemark = $('.currentApprovalRow .aprInputCell input').val();
                // $('.currentApprovalRow .aprInputCell').html(getAprRemark);
                // $('.currentApprovalRow').removeClass('currentApprovalRow');
                // // To clear text field and action from previous row... 

                $('#wmsGridApprovalList').append('<div class="wms-srv-grid-row wmsApproverRow currentApprovalRow wmsApprovalLevel'+ getLevelNum +'">' + 
                    '<div class="wms-srv-grid-cell" style="width: 35px;"><div class="userProfile"><img src="Images/profile-pic/nopic.png"></div></div>' + 
                    '<div class="wms-srv-grid-cell">'+ getApproverName +'</div>' + 
                    '<div class="wms-srv-grid-cell">'+ getApproLevel +'</div>' + 
                    '<div class="wms-srv-grid-cell">'+ getApprovalDate +'</div>' + 
                    '<div class="wms-srv-grid-cell aprInputCell"><input type="text" id="txtApproverTransRemark" value="'+ getRemark +'" class="wms-srv-grid-cell-input"></div>' + 
                    '<div class="wms-srv-grid-cell aprActionCell"><div class="wms-srv-grid-action"><i class="fas fa-check-circle" onclick="OrderApprovReject('+ OrderID +','+ getApproverID +',\'Approved\',\''+ getApproLevel +'\',\''+ getApproEvent +'\');"></i><div class="wms-srv-action-sep">|</div>'+
                    '<i class="fas fa-times-circle" onclick="OrderApprovReject('+ OrderID +','+ getApproverID +',\'Rejected\',\''+ getApproLevel +'\',\''+ getApproEvent +'\');"></i></div></div>' +
                    '</div>');
                    addApproverMemberToLevel(approverTitle, getLevelNum, 'Yes')
                }else{
                    $('#wmsGridApprovalList').append('<div class="wms-srv-grid-row wmsApproverRow wmsApprovalLevel'+ getLevelNum +'">' + 
                    '<div class="wms-srv-grid-cell" style="width: 35px;"><div class="userProfile"><img src="Images/profile-pic/nopic.png"></div></div>' + 
                    '<div class="wms-srv-grid-cell">'+ getApproverName +'</div>' + 
                    '<div class="wms-srv-grid-cell">'+ getApproLevel +'</div>' + 
                    '<div class="wms-srv-grid-cell">'+ getApprovalDate +'</div>' + 
                    '<div class="wms-srv-grid-cell aprInputCell">'+ getRemark +'</div>' + 
                    '<div class="wms-srv-grid-cell aprActionCell">'+ icoStatus +'</div>' +
                    '</div>');
                    addApproverMemberToLevel(approverTitle, getLevelNum, 'No');
                }
            }
            activateApprovalControl();
         }
         else
         {
            alert("Something went wrong.");
         }

    });                
}

//#endregion End Code to Get Approval Records for order

function InsertOrderApproval(OrderID,ApproObject)
{
    var apiPath = wmsApiPath + 'ApprovalMaster/SaveapprovalTrans';
    var postData = 
    {
        "Object": ApproObject,
        "ReferenceID": OrderID,
        "CustomerID": getAppCustomerId,
        "WarehouseID": getAppWarehouseID,
        "UserID": getAppUserId
    };
    callHttpUrl(apiPath,postData,function(data){
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        var getMessage = getResult.Message;
        if(getstatus=="200" && getstatuscode=="Success")
        {
           alert('Success');
        }
        else
        {
         alert(getMessage);
        }
    });
}

function OrderApprovReject(OrderID,ApproverID,status,ApproLevel,ApprovEvent)
{
    debugger;
    var getApplicationName = $('#divApprovalApplication').text();
    var getObjectName = $('#divApprovalObject').text();
    var getRemark = $('#txtApproverTransRemark').val();
    var apiPath = wmsApiPath + 'ApprovalMaster/UpdateApprovalTrans';
    var postData = 
    {        
         "CustomerID": getAppCustomerId,
         "WarehouseID": getAppWarehouseID,
         "Object": getObjectName,
         "ReferenceID": OrderID,
         "Remark": getRemark,
         "ApproverID": ApproverID,
         "Status": status,
         "ApproLevel": ApproLevel,
         "UserID": getAppUserId,
         "AppEvent": ApprovEvent,         
    };
    callHttpUrl(apiPath,postData,function(data)
    {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getResult = data.Result;
        var getMessage = getResult.Message;
        if(getstatus=="200" && getstatuscode=="Success")
        {
           if(status = 'Approved')
           {
            alert("Approved Successfully.");
           }
           else
           {
            alert("Rejection Successful");
           }
           resetAndRecallApprovalGrid();
        }
        else
        {
         alert(getMessage);
        }

    });
}