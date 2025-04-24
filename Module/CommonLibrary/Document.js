var getCustomerId = $('#ddlcustomer').val();
var getWarehouseID = $('#ddlwarehouse').val();
var documentOrderId = '';
var documentObject = '';
var documentHeadData = 'Request No|VC1103,Department|Vodafone Business,Request Date|15-Jan-2025,Request By|Mahesh Mane';
var globalFileName = [];
var globalFilePath = [];

var wmsAppDocumentFiles = apiDomain + "";

function openDocumentObject(oid, obj, wmsHeadGridId) {
  //alert();
  // currentDocumentOrderId = oid;
  globalFileName = [];
  globalFilePath = [];
  documentOrderId = oid;
    documentObject = obj;
    if (wmsHeadGridId != null) {
        documentHeadData = wmsHeadGridId;
    }
  getDocumentListByObject();
  $('#wms-srv-document-popup').show();
  $('#wms-srv-document-popup-close').off();
  $('#wms-srv-document-popup-close').click(function () {
    $('#wms-srv-document-popup').hide();
  });
  cleartextboxes();
}

function getDocumentFileExtension() {
  debugger;
  fileName = document.querySelector('#wms-srv-cmDocument-file-upload').value;
  extension = fileName.split('.').pop();
  $('#txtCommonDocument_FileType').val(extension);
  //  $('#txtCommonDocument_Name').val(fileName);
}

function createCommonObjectHead() {
  var breakObjectHead = documentHeadData.split(',');
  var strHeadCell = '<div class="wms-srv-grid-header" style="white-space: nowrap;">';
  var strRowCell = '<div class="wms-srv-grid-row">';
  for (var i = 0; i < breakObjectHead.length; i++) {
    var breakCellData = breakObjectHead[i].split('|');
    strHeadCell = strHeadCell + '<div class="wms-srv-grid-cell">' + breakCellData[0] + '</div>';
    strRowCell = strRowCell + '<div class="wms-srv-grid-cell">' + breakCellData[1] + '</div>';
  }
  strHeadCell = strHeadCell + '</div>';
  strRowCell = strRowCell + '</div>';
  $('#pnlCommonDocumentHead').html(strHeadCell + strRowCell);
}

function getDocumentListByObject() {
  debugger;
  $('#hdnCommonDocument_RefId').val(documentOrderId);
  $('#hdnCommonDocument_RefObject').val(documentObject);
  if (documentHeadData != null) {
    createCommonObjectHead();
  }

  var getCompanyId = mBrillWmsSession.getCompanyId();
  var getWarehouseId = mBrillWmsSession.getWarehouseId();
  var getUserId = mBrillWmsSession.getUserId();

  $('.wmsDocumentRow').remove();
  var apiPath = wmsApiPath + "Document/GetDocumentList";
  var postData = {
    "CompanyId": getCompanyId,
    "WarehouseId": getWarehouseId,
    "UserId": getUserId,
    "ReferenceID": documentOrderId,
    "ObjectName": documentObject
    };

    // STATIC API DATA
    apiPath = "StaticAPI/GetDocumentList.json";
    postData = null;
    // STATIC API DATA

  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
    if (getStatusCode.toLocaleLowerCase() == 'success') {
      var getDocumentList = data.Result.Table;
      $('#txtCommonDocument_Total').html(getDocumentList.length);
      for (var i = 0; i < getDocumentList.length; i++) {
        var getDocumentId = getDocumentList[i].DocumentId;
        var getDocumentTitle = getDocumentList[i].DocumentTitle;
        var getDescription = getDocumentList[i].Description;
        var getDocumentType = getDocumentList[i].DocumentType;
        var getFileType = getDocumentList[i].FileType;
        var getFilePath = getDocumentList[i].FilePath;
        var getRefId = getDocumentList[i].ReferenceID;

        var strDocumentRow = '<div class="wms-srv-grid-row wmsDocumentRow" id="wmsDocumentRow_' + getDocumentId + '">' +
          '<div class="wms-srv-grid-cell">' + getDocumentTitle + '</div>' +
          '<div class="wms-srv-grid-cell">' + getDescription + '</div>' +
          '<div class="wms-srv-grid-cell">' + getDocumentType + '</div>' +
          '<div class="wms-srv-grid-cell">' + getFileType + '</div>' +
          '<div class="wms-srv-grid-cell">' + getDocumentAttachmentHtml(getFilePath, getRefId) + '</div>' +
          '<div class="wms-srv-grid-cell">' +
          '<div class="wms-srv-grid-action">' +
          //'<div class="wms-srv-file-upload-holder">' + 
          //'<label><i class="fas fa-paperclip"></i><span class="wms-srv-badge" style="display: none;">0</span></label>' + 
          //'<div class="wms-srv-action-sep">|</div>' + 
          // '</div>' + 
          '<a href="#" title="Cancel" class="wms-srv-cancel" data-prefix="CN" onclick="removeDocumentObject(' + getDocumentId + ');"><i class="fas fa-times-circle"></i></a>' +
          '</div>' +
          '</div>' +
          '</div>';
        $('#wmsGridDocumentList').append(strDocumentRow);
      }
    } else {
      alert(getMessage);
    }
  });
}



function getDocumentAttachmentHtml(filePath, Refid) {
  var strAttachment = '';
  if (filePath.trim() != '') {
    strAttachment = '<span class="wmsTicketAttachment1">' +
      '<i class="fas fa-paperclip"></i> ' +
      '<span class="themeWMSImportHighlight">' +
      '<a href="' + wmsAppDocumentFiles + 'Attachment/' + 'document/' + Refid + '/' + filePath + '" style="cursor: pointer" target="_blank">' + filePath + '</a>' +
      '</span>' +
      '</span>';
  }
  return strAttachment;
}

function saveDocumentObject() {
  if (validateDocumentDetails()) {
    debugger;
    // $('.wmsDocumentRow').remove();
    var apiPath = wmsApiPath + "Document/Savedocument";
    var getUserId = mBrillWmsSession.getUserId();
    var getcustomerid = mBrillWmsSession.getCustomerId();
    var getCompanyID = mBrillWmsSession.getCompanyId();

    var getDocumentName = $('#txtCommonDocument_Title').val();
    var getDescription = $('#txtCommonDocument_Description').val();
    var getDocumentType = $('#txtCommonDocument_Type').val();
    var getFileType = $('#txtCommonDocument_FileType').val();
    var getFileAttachmentPath = $('#txtCommonDocument_Name').html().trim();
    var postData = {
      "ObjectName": documentObject,
      "CompanyId": getCompanyID,
      "CustomerID": getCustomerId,
      "UserId": getUserId,
      "ReferenceID": documentOrderId,
      "DocumentName": getDocumentName,
      "Description": getDescription,
      "DocumentType": getDocumentType,
      "FileType": getFileType,
      "DocumentDownloadPath": getFileAttachmentPath,
      "DocumentSavePath": getFileAttachmentPath
    }
      ;
    callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      var getStatusCode = data.StatusCode;
      if (getStatusCode.toLocaleLowerCase() == 'success') {
        var getMessage = data.Result.Message;
        if (getMessage.toLocaleLowerCase() == 'success') {
          alert("Document Saved Successfully");
          cleartextboxes();
          getDocumentListByObject();
        }
        else {
          alert("Something Went Wrong !!");
        }
      }
      else {
        alert("Please Fill All The Details..!!");

      }
    });
  }
}

function removeDocumentObject(getDocumentId) {
  debugger;
  var getUserId = mBrillWmsSession.getUserId();
  var getCustomerId = mBrillWmsSession.getCustomerId();
  var apiPath = wmsApiPath + "Document/Removedocument";

  var postData = {
    "CustomerHeadId": getCustomerId,
    "UserId": getUserId,
    "RefferenceId": getDocumentId,
    "ObjectName": documentObject
  }
  callHttpUrl(apiPath, postData, function (data) {

    var getStatus = data.Status;
    var getStatusCode = data.StatusCode;
    if (getStatusCode.toLocaleLowerCase() == 'success') {
      var getMessage = data.Result.Message;
      if (getMessage.toLocaleLowerCase() == 'success') {
        $('.wmsDocumentRow').remove();
        // getDocumentListByObject();
        alert("Document Removed Successfully");
        cleartextboxes();
        // $('#wmsDocumentRow_' + getDocumentId).remove();
        getDocumentListByObject();
      } else {
        alert(getMessage);
      }
    } else {
      alert(getMessage);
    }
  });
}

function cleartextboxes() {
  $("input").val("");
  $('.wms-srv-file-upload-holder .wms-srv-badge').hide();
  $('#txtCommonDocument_Name').html('');
}

// function uploadDocumentAttachment()

//  {
//     debugger;

//     var file = document.getElementById('wms-srv-cmDocument-file-upload').files[0];
//     //alert(file.name);
//     var frmFile = new FormData();
//     frmFile.append(file.name, file);
//     var currentFileName = file.name;

//     var isLocalDev = isLocalDevelopement();
//     wmsApiRequestKey = mBrillWmsSession.getApiRequestKey();
//     wmsApiAccessKey = mBrillWmsSession.getApiAccessKey();


//     // showWMSThemeLoading();
//     var filterFileName = 'document_' + currentFileName.replace(' ','_');
//    var apiPath = wmsApiPath + 'Document/UploadDocument?OrderId=' + documentOrderId + '&uploadedfilename=' + filterFileName + '&objectname=' + documentObject;
//     if (globalFileName.length < 1) {
//       var isLocalDev = isLocalDevelopement();
//       wmsApiRequestKey = mBrillWmsSession.getApiRequestKey();
//       wmsApiAccessKey = mBrillWmsSession.getApiAccessKey();

//       /*if(isLocalDev == "yes"){
//         postData.apiRequestKey = wmsApiRequestKey;
//         postData.apiAccessKey = wmsApiAccessKey;
//       }*/

//         $.ajax({
//             url: apiPath,
//             type: "POST",

//             contentType: false,
//             processData: false,
//             beforeSend: function (request) {
//               if(isLocalDev != "yes"){
//                 request.setRequestHeader("api-request-key", wmsApiRequestKey);
//                 request.setRequestHeader("api-access-key", wmsApiAccessKey);
//               }
//               showWMSThemeLoading();
//             },
//             data: frmFile,
//             success: function (result) {
//                 var jsonObj = JSON.parse(result);
//                 var getStatus = jsonObj["upload_result"][0].status;
//                 var getPath = jsonObj["upload_result"][0].path;
//                 if (getStatus == 'success') {
//                     alert('File uploaded successfully!!');
//                     globalFileName.push(currentFileName);
//                     globalFilePath.push(getPath);
//                     getDocumentFileExtension();
//                    /* var fileListHtml = '';
//                     for (var i = 0; i < globalFileName.length; i++) {
//                         fileListHtml += '<div class="wms-srv-filename">' + globalFileName[i] + ' <i class="fas fa-times-circle"></i></div>';
//                     }

//                     $('#wms-srv-attachment-files').html(fileListHtml);*/
//                     $('#txtCommonDocument_Name').html(getPath);
//                     $('.wms-srv-file-upload-holder .wms-srv-badge').html(globalFileName.length);
//                     $('.wms-srv-file-upload-holder .wms-srv-badge').show();

//                 } else {
//                     $('#wms-srv-cmDocument-file-upload').data('srvpath', '');
//                 }
//                 //alert(result);
//                  hideWMSThemeLoading();
//             },
//             error: function (err) {
//                 showWmsAlert('Error!!', err.statusText, 'error');
//                 //alert(err.statusText);
//             }
//         });
//     } else {
//         alert('Maximum 1 attachment are allowed!!');
//     }
// }



function uploadDocumentAttachment() {
  debugger;

  var file = document.getElementById('wms-srv-cmDocument-file-upload').files[0];
  var frmFile = new FormData();
  frmFile.append('uploadedFile', file); // Ensure the key matches what the server expects
  var currentFileName = file.name;

  var isLocalDev = isLocalDevelopement();
  var wmsApiRequestKey = mBrillWmsSession.getApiRequestKey();
  var wmsApiAccessKey = mBrillWmsSession.getApiAccessKey();

  var filterFileName = 'document_' + currentFileName.replace(' ', '_');
  // var documentOrderId = 254368; // Assuming this is set somewhere in your code
  // var documentObject = 'outward'; // Assuming this is set somewhere in your code

  //var apiPath = `http://localhost:5230/api/staging/v1/Document/UploadDocument?orderId=${documentOrderId}&uploadedfilename=${filterFileName}&objectName=${documentObject}`;

  var apiPath = wmsApiPath + 'Document/UploadDocument?orderId=' + documentOrderId + '&uploadedfilename=' + filterFileName + '&objectName=' + documentObject;

  if (globalFileName.length < 1) {
    $.ajax({
      url: apiPath,
      type: "POST",
      contentType: false,
      processData: false,
      beforeSend: function (request) {
        if (isLocalDev !== "yes") {
          request.setRequestHeader("api-request-key", wmsApiRequestKey);
          request.setRequestHeader("api-access-key", wmsApiAccessKey);
        }
        showWMSThemeLoading();
      },
      data: frmFile,
      success: function (result) {
        console.log('Raw result:', result); // Log the raw result for debugging
        var jsonObj;

        // Parse result if it's a string
        if (typeof result === 'string') {
          try {
            jsonObj = JSON.parse(result);
          } catch (e) {
            console.error('Error parsing JSON:', e);
            showWmsAlert('Error!!', 'Error parsing server response', 'error');
            hideWMSThemeLoading();
            return;
          }
        } else {
          jsonObj = result; // If result is already a JSON object
        }

        console.log('Parsed JSON object:', jsonObj); // Log the parsed JSON object

        // Ensure the structure is as expected
        if (jsonObj.upload_result && jsonObj.upload_result.length > 0) {
          var getStatus = jsonObj.upload_result[0].status;
          var getPath = jsonObj.upload_result[0].path;
          if (getStatus === 'success') {
            alert('File uploaded successfully!!');
            globalFileName.push(currentFileName);
            globalFilePath.push(getPath);
            getDocumentFileExtension();

            $('#txtCommonDocument_Name').html(getPath);
            $('.wms-srv-file-upload-holder .wms-srv-badge').html(globalFileName.length);
            $('.wms-srv-file-upload-holder .wms-srv-badge').show();
          } else {
            $('#wms-srv-cmDocument-file-upload').data('srvpath', '');
          }
        } else {
          console.error('Unexpected response structure:', jsonObj);
          showWmsAlert('Error!!', 'Unexpected response structure', 'error');
        }
        hideWMSThemeLoading();
      },
      error: function (err) {
        showWmsAlert('Error!!', err.statusText, 'error');
      }
    });
  } else {
    alert('Maximum 1 attachment is allowed!!');
  }
}



function validateDocumentDetails() {

  var getDocumentName = $('#txtCommonDocument_Title').val();
  var getDescription = $('#txtCommonDocument_Description').val();
  var getDocumentType = $('#txtCommonDocument_Type').val();
  var getFileType = $('#txtCommonDocument_FileType').val();
  var getFileAttachmentPath = $('#txtCommonDocument_Name').html().trim();


  var isValid = true;
  var validationMsg = '';
  if (getDocumentName == '') {
    validationMsg = 'Please enter Document Title!!';
    isValid = false;
  }
  else if (getDescription == '') {
    validationMsg = 'Please enter Document Description!!';
    isValid = false;
  }
  else if (getDocumentType == '') {
    validationMsg = 'Please enter Document type!!';
    isValid = false;
  }
  else if (getFileType == '') {
    validationMsg = 'Please enter file type!!';
    isValid = false;
  }
  else if (getFileAttachmentPath == '') {
    validationMsg = 'Please select Document Attachment!!';
    isValid = false;
  }


  if (isValid != true) {
    if (validationMsg != '') {
      // showAlert(validationMsg, 'Warning', '#');
      alert(validationMsg);
    }
  }
  return isValid;
}