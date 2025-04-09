//var apiRfidPath = 'http://localhost:62070/api/rfid/';

var strCurrentPage='1';
var getTotalCount='10';

$(document).ready(function () {
    init();
});

function initRFIDTagging() {
    loadRFIDGrid(1);

    $('.wms-srv-count-box-holder').click(function () {
        $('.wms-srv-count-box-holder').removeClass('dashboardActiveTab');
        $(this).addClass('dashboardActiveTab');
     //   $('#txtSearchGrid').val('');
        loadRFIDGrid(1);
    });
}

function searchForCode() {
    var getSearchKey = $('#txtSearchGrid').val();
    if (getSearchKey.trim() != '') {
        loadRFIDGrid(1);
    } else {
        alert('Enter keyword to search!!');
    }
}

function loadRFIDGrid(strCurrentPage) 
{
    debugger
    var apiPath= wmsApiPath + 'RFID/GetRfidTagging';
    //var apiPath = 'http://173.212.244.46/WebAPITest/api/staging/v1/RFID/GetRfidTagging';
  //  var apiPath = apiServerPath + 'GetInboundList';
    //var getWarehouseID = $("#ddlwarehouse").val();
    //var getCustomerId = $("#ddlcustomer").val();
    //var getCompanyID = $('#hdnCompanyID').val();
   // var getUserId = $("#hdnUserID").val();
    var getListType = $('#ddlListType').val();
    var getSearchKey = $('#txtSearchGrid').val();
    var getActiveTab = $('.dashboardActiveTab').attr('data-id');
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getUserId = mBrillWmsSession.getUserId();

    if (getSearchKey.trim() == '') {
        getSearchKey = 'all';
    }


    var postData = 

    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": getTotalCount,
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "SearchKey": getSearchKey,
        "ListType": getListType,
        "ActiveTab": getActiveTab
    }

    callHttpUrl(apiPath, postData, function (data) {
        $('#tlbRfidTaggingGrid').html('');
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getResponse = data.Result;
        //var jsonObj = JSON.parse(getResponse);

        var getAssignedCount = data.Result.Table1[0].TotalAssigned;
        var getUnassignedCount = data.Result.Table1[0].TotalUnassigned;
        var getTotalCount = data.Result.Table1[0].TotalRecords;

        $('#spnRfidCount').html(getAssignedCount + '/' + getTotalCount);

        $('#dashUnassigned').html(getUnassignedCount);
        $('#dashAssigned').html(getAssignedCount);
        $('#dashAllCodes').html(getTotalCount);
        

        var getGridList = data.Result.Table;

        for (var i = 0; i < getGridList.length; i++) {
            var getId = getGridList[i].Id;
            var getRfidLabel = getGridList[i].RfidLabel;
            var getType = getGridList[i].type;
            var getCode = getGridList[i].code;
            var getCodeId = getGridList[i].codeId;
            var getDescription = getGridList[i].RfidDescription;

            var inputClass = '';
            var defaultStatus = 'Unassigned';
           // var defaultUnassignBtnStyle = 'opacity:0.2';
            var defaultUnassignBtnStyle = 'opacity:1';

            if (getRfidLabel != '') {
                defaultStatus = 'Assigned';
                //      defaultUnassignBtnStyle = 'opacity:1';
            }

            if (i == 0) {
                inputClass = 'wms-srv-grid-cell-input wms-srv-rfid-input wms-srv-first-input';
            } else {
                inputClass = 'wms-srv-grid-cell-input wms-srv-rfid-input';
            }

            var inputBoxAction = 'onblur = "return false;"';
            var disabledAttribute = 'disabled="disabled"';
            var disabledInput = 'style="background-color:#efefef;border:solid 1px #cccccc;color:#000000;"';
            if (getRfidLabel.trim() == '') {
                inputBoxAction = 'onblur = "assignRfid(' + getId + ', \'' + getCode + '\', ' + getCodeId + ', false);"';
                disabledInput = 'style="background-color:#ffffff;border:solid 1px #cccccc;"';
                disabledAttribute = '';
            }


            var rfidGrid = '';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-row" id="rfidRow' + getId +'">';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">';
            rfidGrid = rfidGrid + '<input type="checkbox" value="' + getId + '">';
            rfidGrid = rfidGrid + '</div>';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell" data-id="' + getCodeId +'">' + getCode+ '</div>';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">' + getType +'</div>';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">' + getDescription +'</div>';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell  wms-srv-container-search" style="display: flex;">';
            rfidGrid = rfidGrid + '<input type="text" tabindex="' + (i + 1) + '" class="' + inputClass + '" value="' + getRfidLabel + '" ' + inputBoxAction + ' ' + disabledInput + ' ' + disabledAttribute + '" />';
            rfidGrid = rfidGrid + ' <i class="fas fa-barcode" style="margin:4px;"></i>';
            rfidGrid = rfidGrid + '</div>';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">' + defaultStatus + '</div>';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">';
            rfidGrid = rfidGrid + '<div class="wms-srv-grid-action">';
            // rfidGrid = rfidGrid + '<a href="#" title="Approval" data-prefix="APP" class="wms-srv-icononly"><i class="fas fa-check-circle"></i></a>';
            // rfidGrid = rfidGrid + '<div class="wms-srv-action-sep">|</div>';
            
            if (defaultStatus == 'Assigned') {
                rfidGrid = rfidGrid + '<a href="#" title="Document" data-prefix="DOC" class="wms-srv-icononly" style="' + defaultUnassignBtnStyle + '" onclick="unassignRfid(' + getId + ', \'' + getCode + '\', ' + getCodeId + ');"><i class="fas fa-undo"></i></a>';                
            } else {
                rfidGrid = rfidGrid + '<a href="#" title="Document" data-prefix="DOC" class="wms-srv-icononly" style="' + defaultUnassignBtnStyle + '" onclick="assignRfid(' + getId + ', \'' + getCode + '\', ' + getCodeId + ', true);"><i class="fas fa-check-circle" style="color:black !important"></i></a>';
            }
            


            rfidGrid = rfidGrid + '</div>';
            rfidGrid = rfidGrid + '</div>';
            rfidGrid = rfidGrid + '</div>';
            $('#tlbRfidTaggingGrid').append(rfidGrid);
            setupGridPagingList('tlbInboundGridPager', strCurrentPage, getTotalCount, loadRFIDGrid);
        }
        addGridHeader();
        addNew();
        $('.wms-srv-first-input').focus();
    });
}

function addRfid() 
{
    debugger;
    if (validateAddNewForm()) {
        var apiPath = wmsApiPath + 'RFID/InsertRfid';
        var getRfidLabel = $('#txtAdd_RfidCode').val();
        var recType = $('#txtAdd_Type').val();
        var recCode = $('#txtAdd_Code').val();
        var recCodeId = 0;
        var recDescription = $('#txtAdd_Description').val();
        var getUserId = mBrillWmsSession.getUserId();

        var postData = {
            "RfidLabel": getRfidLabel,
            "RfidType": recType,
            "Code": recCode,
            "CodeId": recCodeId,
            "Description": recDescription,
            "UserId": getUserId
        };

        callHttpUrl(apiPath, postData, function (data) {
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                loadRFIDGrid(1);
            } else {
                alert('Failed to update record!!');
            }
        });
    }
}

function validateAddNewForm() 
{
     debugger;
    var isFormValid = true;
    var getRfidLabel = $('#txtAdd_RfidCode').val();
    var recType = $('#txtAdd_Type').val();
    var recCode = $('#txtAdd_Code').val();
    var recCodeId = 0;
    var recDescription = $('#txtAdd_Description').val();
    var getUserId = $("#hdnUserID").val();

    if (recCode.trim() == '') {
        alert('Please enter Code!!');
        isFormValid = false;
    } else if (recDescription.trim() == '') {
        alert('Please enter Description!!');
        isFormValid = false;
    } else if (getRfidLabel.trim() == '') {
        alert('Please enter RFID Code!!');
        isFormValid = false;
    }

    return isFormValid;
}

function assignRfid(recId, recCode, recCodeId, showValidation) 
{
    debugger;
    var apiPath = wmsApiPath + 'RFID/UpdateRfid';
    var getRfidLabel = $('#rfidRow' + recId +' .wms-srv-rfid-input').val();
    var getUserId = mBrillWmsSession.getUserId();
    if (getRfidLabel.trim() != '') {
        var postData = 
        {
            "RfidLabel": getRfidLabel,
            "RecordId": recId,
            "Code": recCode,
            "CodeId": recCodeId,
            "UserId": getUserId
        };

        callHttpUrl(apiPath, postData, function (data) {
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                loadRFIDGrid(1);
            } else {
                alert('Failed to update record!!');
            }
        });
    } else {
        if (showValidation) {
            alert('Please add RFID code!!');
        }
    }
}

function unassignRfid(recId, recCode, recCodeId) 
{
    debugger;
    var apiPath = wmsApiPath + 'RFID/UpdateRfid';
    var getUserId = mBrillWmsSession.getUserId();
      
    var postData = {
        "RfidLabel": "-",
        "RecordId": recId,
        "Code": recCode,
        "CodeId": recCodeId,
        "UserId":getUserId
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            loadRFIDGrid(1);
        } else {
            alert('Failed to update record!!');
        }
    });
}

function multipleUnassignRfid() 
{
    debugger
    var apiPath = wmsApiPath + 'RFID/MultipleRfidUnassign';
    var recId = '';
    var getUserId = mBrillWmsSession.getUserId();

    $('#tlbRfidTaggingGrid input[type="checkbox"]').each(function () {
        var isChecked = $(this).prop('checked');
        if (isChecked) {
            var getRowId = $(this).val();
            if (recId == '') {
                recId = getRowId;
            } else {
                recId = recId + ', ' + getRowId;
            }
        }
    });

    var postData = 
    {
        "RecordId": recId,
        "UserId": getUserId
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            loadRFIDGrid(1);
        } else {
            alert('Failed to update record!!');
        }
    });
}

function addGridHeader() {
    // HEADER ROW
    var rfidGrid = '';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-header">';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">';
    rfidGrid = rfidGrid + '<input type="checkbox" value="ID">';
    rfidGrid = rfidGrid + '</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">Code</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">Type</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">Description</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">RFID Code</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">Status</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">Action</div>';
    rfidGrid = rfidGrid + '</div>';
    $('#tlbRfidTaggingGrid').prepend(rfidGrid);
}

function removeAddNewRow() {
    $('#tlbRfidTaggingGrid .wms-srv-grid-add-new-row').remove();
}

function addNew() {
    $('#tlbRfidTaggingGrid .wms-srv-grid-header').remove();
    $('#tlbRfidTaggingGrid .wms-srv-grid-add-new-row').remove();
    var rfidGrid = '';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-row wms-srv-grid-add-new-row">';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">';
    rfidGrid = rfidGrid + '<input type="checkbox" value="">';
    rfidGrid = rfidGrid + '</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell"><input type="text" id="txtAdd_Code" class="wms-srv-grid-cell-input" value="" /></div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">' +
        '<select class="wms-srv-grid-cell-input" id="txtAdd_Type">' + 
        '<option value="">Select</option>' + 
        '<option value="Pallet">Pallet</option>' + 
        '<option value="Shipping Pallet">Shipping Pallet</option>' + 
        '<option value="Location">Location</option>' + 
        '<option value="SKU">SKU</option>' + 
        '</select>' + 
        '</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell"><input type="text" id="txtAdd_Description" class="wms-srv-grid-cell-input" value="" /></div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell  wms-srv-container-search" style="display: flex;"><input type="text" id="txtAdd_RfidCode" class="wms-srv-grid-cell-input" value="" />';
    rfidGrid = rfidGrid + ' <i class="fas fa-barcode" style="margin:4px;"></i>';
    rfidGrid = rfidGrid + '</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">-</div>';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-cell">';
    rfidGrid = rfidGrid + '<div class="wms-srv-grid-action">';
    rfidGrid = rfidGrid + '<a href="#" title="Approval" data-prefix="APP" class="wms-srv-icononly" onclick="addRfid();return false;"><i class="fas fa-check-circle" style="color:black !important"></i></a>';
    rfidGrid = rfidGrid + '<div class="wms-srv-action-sep">|</div>';
    rfidGrid = rfidGrid + '<a href="#" title="Document" data-prefix="DOC" class="wms-srv-icononly" onclick="removeAddNewRow();return false;"><i class="fas fa-times-circle"></i></a>';
    rfidGrid = rfidGrid + '</div>';
    rfidGrid = rfidGrid + '</div>';
    rfidGrid = rfidGrid + '</div>';
    $('#tlbRfidTaggingGrid').prepend(rfidGrid);
    addGridHeader();
   // $('#tlbRfidTaggingGrid').prepend('.wms-srv-grid-header');
}


// function setupGridPagingrfid(gridObjId, strCurrentPage, getTotalCount, callBackFunction) { 
//     var global_max_record_count = 10;
//       var pageNo = Number(strCurrentPage);
//       var recordFrom = ((pageNo - 1) * 10) + 1;
//       var recordTo = recordFrom + 9;
//       var totalRecord = Number(getTotalCount);
//       var pagerLinks = '';
  
//       $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//       var lnkCounter = 1;
//       var currentCounter = global_max_record_count;
//       //var currentCounter = 0;
//       var lastPage = 0;
//       while (currentCounter < totalRecord) {
//           if (lnkCounter == pageNo) {
//               pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//           } else {
//               pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//               lastPage = lnkCounter;
//           }
//           global_last_page_no = lnkCounter;
//           currentCounter = currentCounter + global_max_record_count;
//           lnkCounter = lnkCounter + 1;
//       }
  
//       /* Add Page linke for remaining record */
//       if (currentCounter > totalRecord) {
     
//           if (lnkCounter == pageNo) {
//               pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//           } else {
//               pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//               lastPage = lnkCounter;
//           }
//           // Update last page count - 21 Sept 2021
//           this.global_last_page_no = lnkCounter;
//       }
//       /* Add Page linke for remaining record */
//       var pagerNavLinks = '';
//       pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
//       // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//       pagerNavLinks += pagerLinks;
//       //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//       pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';
  
//       $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);
  
//       $('#tlbInboundGridPager .wms-srv-pager-links a').off();
//       $('#tlbInboundGridPager .wms-srv-pager-links a').click(function () {
//           var getDataPage = $(this).attr('data-page');
//           if (callBackFunction != null) {
        
//               callBackFunction(getDataPage);
//           }
//       });
   
//       $('#tlbInboundGridPager a.wms-srv-pager-go').off();
//       $('#tlbInboundGridPager a.wms-srv-pager-go').click(function ()
//       {
//           var getDataPage = $('#tlbInboundGridPager input[name="txtGridPageNo"]').val();
//           if(Number(getDataPage) < 1)
//           {
//               alert('Please enter valid page number!!');
//           }else if(Number(getDataPage)  > Number(lastPage))
//           {
//               alert('Page number should not be greater than '+ lastPage +' !!');
//           }else
//           {
//                if (callBackFunction != null) {
//                   callBackFunction(getDataPage,searchfilter,searchvalue);
//               }
//           }       
//       });	     
//   }