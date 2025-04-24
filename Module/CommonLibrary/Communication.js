var communicationOrderId = '';
var communicationObject = '';
var communicationHeadData = 'Request No|VC1103,Department|Vodafone Business,Request Date|15-Jan-2025,Request By|Mahesh Mane';

var globalFileName = [];
var globalFilePath = [];

function openCommunicationObject(oid, obj, objectHeadData) {
    debugger;
    switchToCommunicationList();
    communicationOrderId = oid;
    communicationObject = obj;
    if (objectHeadData != null) {
        communicationHeadData = objectHeadData;
    }
    globalFileName = [];
    globalFilePath = [];
    getCommunicationListByObject();
    $('#wms-srv-communication-popup').show();
    $('#wms-srv-communication-popup-close').off();
    $('#wms-srv-communication-popup-close').click(function () {
        $('#wms-srv-communication-popup').hide();
    });
}

function createCommunicationObjectHead(){
    var breakObjectHead = communicationHeadData.split(',');
    var strHeadCell = '<div class="wms-srv-grid-header" style="white-space: nowrap;">';
    var strRowCell = '<div class="wms-srv-grid-row">';
    for(var i=0; i < breakObjectHead.length; i++){
      var breakCellData = breakObjectHead[i].split('|');
      strHeadCell = strHeadCell + '<div class="wms-srv-grid-cell">'+ breakCellData[0] +'</div>';
      strRowCell = strRowCell + '<div class="wms-srv-grid-cell">'+ breakCellData[1] +'</div>';
    }
    strHeadCell = strHeadCell + '</div>';
    strRowCell = strRowCell + '</div>';
    $('#pnlCommonCommunicationHead').html(strHeadCell + strRowCell);
  }

function getCommunicationListByObject(){
    debugger;
    //alert("Hello")
    // $('#hdnCommonDocument_RefId').val(oid);
    // $('#hdnCommonDocument_RefObject').val(obj);
     if(communicationHeadData != null){
        createCommunicationObjectHead(communicationHeadData, 'pnlCommonCommunicationHead');
     }
     $('#wmsCommunicationListHolder').html('');
     var getUserId = mBrillWmsSession.getUserId();
      var apiPath = wmsApiPath + "Communication/GetCommunicationList";
      var postData = {
        "OrderId": communicationOrderId,
        "UserId": getUserId,
        "ObjectName": communicationObject
    };

    // STATIC API FOR THE LIST
    apiPath = "StaticAPI/GetCommunicationList.json";
    postData = null;
    // STATIC API FOR THE LIST
        callHttpUrl(apiPath, postData, function (data) {
          var getStatus = data.Status;
          var getStatusCode = data.StatusCode;
          if (getStatusCode.toLocaleLowerCase() == 'success') {
            var getCommunicationList = data.Result.Table;
            $('#txtCommonDocument_Total').html(getCommunicationList.length);
            for(var i=0; i<getCommunicationList.length; i++){
                 // var getDocumentId = getDocumentList[i].DocumentId;
                 var getPONumber = getCommunicationList[i].PONumber;
                 var getInwardorderdate = getCommunicationList[i].Inwardorderdate;
                 var getCustomerName = getCommunicationList[i].CustomerName;
                 //var getRecievedBy = getCommunicationList[i].RecievedBy; 
                 var getReplyBy = getCommunicationList[i].replyby;
                 var getDate = getCommunicationList[i].date;
                 var getMessage = getCommunicationList[i].Message;
                 var getAttachment1 = getCommunicationList[i].Attachment1;
                 var getAttachment2 = getCommunicationList[i].attachment2;
                 var getRefId = getCommunicationList[i].ReferenceId;

                 var strDocumentRow =   ' <div class="row">'+
                         '<div class="col-md-1">'+
                         '<img class="wmsTicketProfilePic" src="Images/User2.jpg" style="width: 100%;">'+
                         '</div>'+
                         '<div class="col-md-11">'+
                         '<div class="wmsChatBoxHolder">'+
                         '<div class="container-fluid wmsChatBox">'+
                         '<div class="row">'+
                         '<div class="col-lg-12">'+
                         '<div class="wmsChatBoxArrow"></div>'+
                         '<span class="wmsTicketRepliedBy">Replied By :   <label>'+ getReplyBy +'</label>'+         
                         '</span><span class="wmsTicketReplyTime">(  <label>'+getDate+'</label>) </span>'+
                         '<hr class="wmsTicketTitleSep">'+
                         '</div>'+
                         '</div>'+
                         '<div class="row">'+
                         '<div class="col-lg-12">'+
                         '<label class="wmsTicketReplyMessage" style="word-break: break-all;">'+getMessage+'<br>'+      
                         '</label>'+
                         '<br>'+
                         '<br>'+
                         getAttachmentHtml(getAttachment1,getRefId) + 
                         getAttachmentHtml(getAttachment2,getRefId) + 
                         '</div>'+
                         '</div>'+
                         '</div>' + 
                         '</div>'+
                         '</div>'+
                         '</div>'
                $('#wmsCommunicationListHolder').append(strDocumentRow);
                $('.pnlCommunicationGrid .wms-srv-grid-scroller').css('width','auto');
            }
          } else {
            alert('getMessage');
          }
        });
  }

  function getAttachmentHtml(filePath,refid){
    debugger;
    var strAttachment = '';
    if(filePath.trim() != ''){
        strAttachment = '<span class="wmsTicketAttachment1">'+ 
        '<i class="fas fa-paperclip"></i> '+
        '<span class="themeWMSImportHighlight">'+
        '<a href="'+ wmsAppFiles + 'document/'+refid+'/'+ filePath +'" style="cursor: pointer" target="_blank">'+ filePath +'</a>'+
        '</span>'+
        '</span>';
    }
    return strAttachment;
  }

  function addNewCommunication() {
    $('#wms-srv-communication-popup .pnlAddCommunicationMsg').show();
    $('#wms-srv-communication-popup .pnlCommunicationGrid').hide();

    $('#wms-srv-communication-popup [data-prefix="AT"]').show();
    $('#wms-srv-communication-popup [data-prefix="SN"]').show();
    $('#wms-srv-communication-popup [data-prefix="CN"]').show();
    $('#wms-srv-communication-popup [data-prefix="AN"]').hide();
}

function switchToCommunicationList() {
    $('#wms-srv-communication-popup .pnlAddCommunicationMsg').hide();
    $('#wms-srv-communication-popup .pnlCommunicationGrid').show();

    $('#wms-srv-communication-popup [data-prefix="AT"]').hide();
    $('#wms-srv-communication-popup [data-prefix="SN"]').hide();
    $('#wms-srv-communication-popup [data-prefix="CN"]').hide();
    $('#wms-srv-communication-popup [data-prefix="AN"]').show();
  //  $('#txtWmsSrvRichEditor').val('');
    $('#wms-srv-communication-popup .wms-srv-richtexteditor textarea').Editor("setText","");
    $('#wms-srv-attachment-files').html('');
    globalFileName = [];
    globalFilePath = [];
    $('.pnlCommunicationGrid .wms-srv-grid-scroller').css('width', 'auto');
}

function SaveCommunication() 
{
    debugger;
	var getCommunicationMsg = $('#wms-srv-communication-popup .wms-srv-richtexteditor textarea').Editor("getText");
	if (getCommunicationMsg == ""){
		alert("Please Insert Text In Chat Box");
	}
	else{
    //var getOrderId = $('#btnCommunicationSave').attr('data-id');
	//var getBrokerMail = $("#hdnEmailIdBrokerCom").val();	
	
    var apiPath = wmsApiPath + 'Communication/SaveCommunication';
	//var getDownloadPath1 = documentDownloadPath  + '/' +  globalFilePath;
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getWarehouseID = mBrillWmsSession.getWarehouseId();
    var getUserId = mBrillWmsSession.getUserId();
    var getCommunicationMsg = $('#wms-srv-communication-popup .wms-srv-richtexteditor textarea').Editor("getText");	 
	
    var getFilePath1 = '-';
    var getFilePath2 = '-';

    if(globalFilePath.length == 2){
        getFilePath1 = globalFilePath[0];
        getFilePath2 = globalFilePath[1];
    }else if(globalFilePath.length == 1){
        getFilePath1 = globalFilePath[0];
        getFilePath2 = '-';
    }else{
        getFilePath1 = '-';
        getFilePath2 = '-';
    }

    var postData = {
        "Message": getCommunicationMsg,
        "FilePath1": getFilePath1,
        "FilePath2": getFilePath2,
        "OrderId": communicationOrderId,
        "ObjectName": communicationObject,
        "UserId": getUserId,
        "tableName": "-"
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            var getMessage = data.Result.Message;
            if (getMessage.toLocaleLowerCase() == 'success') {
                switchToCommunicationList();
                getCommunicationListByObject();
            }
        }else {
            alert('Unable to load document data');
            switchToCommunicationList();
        }
        // After success
    }, function(){
        alert('Unable to send message!!');
        switchToCommunicationList();
    });
	}
}

function uploadAttachment()
 {
    debugger;
    var file = document.getElementById('wms-srv-ctrl-file-upload').files[0];
    //alert(file.name);
    var frmFile = new FormData();
    frmFile.append(file.name, file);
    var currentFileName = file.name;
    // showWMSThemeLoading();
    var filterFileName = 'communication_' + currentFileName.replace(' ','_');
    var apiPath = wmsApiPath + 'Document/UploadDocument?OrderId=' + communicationOrderId + '&uploadedfilename=' + filterFileName + '&objectname=' + communicationObject;
    if (globalFileName.length < 2) {
      var isLocalDev = isLocalDevelopement();
      wmsApiRequestKey = mBrillWmsSession.getApiRequestKey();
      wmsApiAccessKey = mBrillWmsSession.getApiAccessKey();
      if(isLocalDev == "yes"){
        postData.apiRequestKey = wmsApiRequestKey;
        postData.apiAccessKey = wmsApiAccessKey;
      }

    $.ajax({
            url: apiPath,
            type: "POST",
            contentType: false,
            processData: false,
            beforeSend: function (request) {
                if(isLocalDev != "yes"){
                  request.setRequestHeader("api-request-key", wmsApiRequestKey);
                  request.setRequestHeader("api-access-key", wmsApiAccessKey);
                }
                showWMSThemeLoading();
              },
            data: frmFile,
            success: function (result) {
                var jsonObj = JSON.parse(result);
                var getStatus = jsonObj["upload_result"][0].status;
                var getPath = jsonObj["upload_result"][0].path;
                if (getStatus == 'success') {
                    alert('File uploaded successfully!!');
                    globalFileName.push(currentFileName);
                    globalFilePath.push(getPath);
                    var fileListHtml = '';
                    for (var i = 0; i < globalFileName.length; i++) {
                        fileListHtml += '<div class="wms-srv-filename">' + globalFileName[i] + ' <i class="fas fa-times-circle" onclick="removeCommunicationAttachment(\'' + globalFileName[i] + '\');"></i></div>';
                    }

                    $('#wms-srv-attachment-files').html(fileListHtml);
                    $('.wms-srv-file-upload-holder .wms-srv-badge').html(globalFileName.length);
                    $('.wms-srv-file-upload-holder .wms-srv-badge').show();

                } else {
                    $('#wms-srv-ctrl-file-upload').data('srvpath', '');
                }
                //alert(result);
                hideWMSThemeLoading();
            },
            error: function (err) {
                showWmsAlert('Error!!', err.statusText, 'error');
                //alert(err.statusText);
            }
        });
    } else {
        alert('Maximum 2 attachments are allowed!!');
    }
}

function removeCommunicationAttachment(fileName){
    var finalIndexToRemove = -1;
    for(var i=0; i<globalFileName.length; i++){
        if(globalFileName[i] == fileName){
            finalIndexToRemove = i;
        }
    }
    if(finalIndexToRemove != -1){
        globalFileName.splice(finalIndexToRemove, 1);
        globalFilePath.splice(finalIndexToRemove, 1);
    }
    var fileListHtml = '';
    for (var i = 0; i < globalFileName.length; i++) {
        fileListHtml += '<div class="wms-srv-filename">' + globalFileName[i] + ' <i class="fas fa-times-circle" onclick="removeCommunicationAttachment(\'' + globalFileName[i] + '\');"></i></div>';
    }
    $('#wms-srv-attachment-files').html(fileListHtml);
    $('.wms-srv-file-upload-holder .wms-srv-badge').html(globalFileName.length);
    $('.wms-srv-file-upload-holder .wms-srv-badge').show();
}

$('#wms-srv-communication-popup .wms-srv-richtexteditor textarea').Editor();