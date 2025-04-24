///////////////////////////////////////////#Quality Check///////////////////////////////////////////////////////////////////////////////

var getUserName = mBrillWmsSession.getUserName();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getUserId = mBrillWmsSession.getUserId();

var checkQCSaveClose = "";
var chksaveQCid = '0';
var grnid = 0;
var IsPallet = 'NO';
var objQC = 'QC';
var globalAddNewLottables = '';

$(function ()
{
    $('#QCdll').change(function ()
    {
        debugger;
        if ($(this).val() != "0") {
            $('#qcsavebnt').hide();
            var curentval = $(this).val();
            $("#hdnqcid").val(curentval);
            viewOrderQCDetails(curentval, "QC");
        }
        else{
            $('#qcsavebnt').show();
        }
    });

});
function qcload()
{
$(".qcscancheck").click(function ()
{

      if ($(this).is(":checked")) 
      {
          $(".qcenablescan").show();
          $(".qcheadboxhead").hide();
                $(".qcheadboxdetail").hide(); 
                $(".qcsavebnt").hide(); 
                

      } else 
      {
          $(".qcenablescan").hide();
          $(".qcheadboxhead").show();
          $(".qcheadboxdetail").show(); 
          $(".qcsavebnt").show();
      }
});
}
function openQCviewdetail(oid) 
{
	
	debugger;
    $('#wms-srv-QCviewdetail-popup').show();
    $('#wms-srv-QCviewdetail-popup-close').off();
    $('#wms-srv-QCviewdetail-popup-close').click(function () {
        CloseQCbtn();
       // $('#wms-srv-QCviewdetail-popup').hide();
    });
}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

function viewQualityCheck(strOrderId)
{
debugger;
    
    var apiPath = wmsApiPath + 'InboundQC/QCList';
    //var apiPath = "http://localhost:50068/api/staging/v1/InboundQC/QCList"
    var postData =
    {
        OrderId:strOrderId,
        customerID:getCustomerId,
        UserID:getUserId
    }
    callHttpUrl(apiPath, postData, function (data)
    {
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success')
        {
            $('#gridqcList').html('');
            var getResult = data.Result;
            var myGridList = getResult.Table;
            

            var gridTable = '';

            // GRID HEADER
            gridTable = gridTable + '<div class="wms-srv-grid-header" style="text-align:center;">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Inward Order No  </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Number</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Batch No</div>';
           
            gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:200px;">Status</div>';
            gridTable = gridTable + '</div>';
       
            var getGridData = myGridList;
            for (var i = 0; i < getGridData.length; i++)
            {
               
                var getTaskAssignUserCount = getGridData[i].TaskAssignUserCount ;
                if(getTaskAssignUserCount==0){
                    alert('QC Order not assign to this User...!');
                    $('#wms-srv-qualitycheck-popup').off();
                    $('#wms-srv-qualitycheck-popup-close').off();
                    loadInboundList();
                }else{
                    var getExpectedReceiptNo = getGridData[i].ExpectedReceiptNo ;
                    var getgrnno = getGridData[i].GrnID;
                    
                    var GRNDatesplit = getGridData[i].GrnDate.split('T');
                    var getgrndate = convertDate(GRNDatesplit[0]);
                    var batchno = getGridData[i].BatchNo;
                    var grnby = getGridData[i].GRNby;
                    var getstatus = getGridData[i].status;
                    //grid row
                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getExpectedReceiptNo+'</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +getgrnno+'</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getgrndate+'</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +batchno+'</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +grnby+'</div>';
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindQCStatusControl(getExpectedReceiptNo, getgrnno, getstatus) +'</div>';
                
                    gridTable = gridTable + '</div>';
                
                    $('#gridqcList').html(gridTable);
                }
            }
            if(getTaskAssignUserCount!=0){
            $('#wms-srv-qualitycheck-popup').show();
             }

            $('#wms-srv-qualitycheck-popup-close').click(function ()
            {
            // CloseQCbtn();
                $('#wms-srv-qualitycheck-popup').hide();
            });
        }
         else
            {
             alert('Unable to connect Server!!');
            }        
      });

    
    // $('#wms-srv-qualitycheck-popup').show();
    // $('#wms-srv-qualitycheck-popup-close').off();
    // $('#wms-srv-qualitycheck-popup-close').click(function ()
    // {
    //    // CloseQCbtn();
    //     $('#wms-srv-qualitycheck-popup').hide();
    // });
}

function viewQualityCheckDetails(strQCId)
{
    // Hide main popup...
    debugger;
    $('#wms-srv-qualitycheck-popup').hide();
   
    $('#wms-srv-qualitycheckdetails-popup').show();
    $('.wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-qualitycheckdetails-popup-close').off();
    $('#wms-srv-qualitycheckdetails-popup-close').click(function ()
    {
        CloseQCbtn();
        $('.wms-srv-datepicker').datepicker('destroy');
       // $('#wms-srv-qualitycheckdetails-popup').hide();
    });
}


function bindQCStatusControl(orderId,grnID, strStatus)
{
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getQCStatusColor('Receiving', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Receiving" onclick="viewgrnOrder(\'' + orderId + '\');return false;"></div>';

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getQCStatusColor('Quality Check', strStatus) + '" data-orderid="' + grnID + '" data-status="' + strStatus + '" title = "Quality Check" onclick="viewQCOrder(\'' + grnID + '\');return false;"></div>';
   

   

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function getQCStatusColor(dataFor, currentStatus)
{
	debugger;
    var myColor = 'gray';

    if (dataFor == 'Receiving')
    {
        if (currentStatus == 'Receiving' || currentStatus == 'Quality Check') 
        {
            myColor = 'green';
        }
        if (currentStatus == 'Put Away') 
        {
            myColor = 'green';
        }
    }
    else if (dataFor == 'Quality Check')
    {
        if (currentStatus == 'Quality Check')
        {
            myColor = 'green';
        } 
		else if (currentStatus == 'Partially Completed')
        {
            myColor = 'partial';
        }
		else if (currentStatus == 'Receiving')
        {
            myColor = 'red';
        }
        else if (currentStatus == 'Put Away') 
        {
            myColor = 'green';
        }

    }
    return myColor;
}



function openQCtab(strOrderId, type)
{
    // Hide main popup...
    debugger;
    $('#wms-srv-qualitycheck-popup').hide();
    if (type != 'QC')
    {
        $('#lbpoid').html(strOrderId);
        $("#hdnorderid").html(strOrderId);       
    }
    //viewgrnOrder(strOrderId);
    $('#wms-srv-qualitycheckdetails-popup').show();
    $('.wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-qualitycheckdetails-popup-close').off();
    $('#wms-srv-qualitycheckdetails-popup-close').click(function ()
    {
        CloseQCbtn();
       // $('.wms-srv-datepicker').datepicker('destroy');
       // $('#wms-srv-qualitycheckdetails-popup').hide();
    });
}

function getQCddl(pid)
{
	debugger;
    var objectPort = 'Post'
    var apiPath = wmsApiPath + 'InboundQC/getQCID';
    var getPageObj = $("#ddlPageObject").val();
    // var apiPath = apiServerPath + 'locdropdown?obj="Port" ';
    var postData =
    {
        grnid: pid,
        pageObj:getPageObj
    }
    callHttpUrl(apiPath, postData, function (data)
    {
        //alert(data);
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success')
        {
            $('#QCdll').html('');
            var gridDetail = '';
            var getResult = data.Result;
            var myGridList = getResult.Table;
            $("#QCdll").html('<option value = "0">--Select--</option>');
            var getDropDownSize = myGridList;
            if (getDropDownSize.length > 0)
            {
                for (var i = 0; i < getDropDownSize.length; i++)
                {
                    var getqcId = getDropDownSize[i].ID;
                    $("#QCdll").append('<option value = "' + getqcId + '">' + getqcId + '</option>');
                }
                if(getqcId>0)
                {
                    $("#QCdll").html('<option value = "' + getqcId + '">' + getqcId + '</option>');
                    $('#qcsavebnt').hide();                   
                    $("#hdnqcid").val(getqcId);
                    viewOrderQCDetails(getqcId, "QC");
                }
            }

        }
		
		
        $('#QCdll').off();
		 $('#QCdll').change(function ()
		 {		
        if ($(this).val() != "0")
        {
            $('#qcsavebnt').hide();
            var curentval = $(this).val();
            $("#hdnqcid").val(curentval);
            viewOrderQCDetails(curentval, "QC");
        }
        else
        {
            $('#qcsavebnt').show();
            viewOrderQCDetails('0', "QC");
            $("#hdnqcid").val(0);
        }

    });

    });
}


function getQCReasonddl()
{
	debugger;
    var objectPort = 'Port'
    var apiPath = wmsApiPath + 'InboundQC/GetReasoncode';
	var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    // var apiPath = apiServerPath + 'locdropdown?obj="Port" ';
    var postData =
    {
        CustomerId:getCustomerIdInward,
		CompanyID:getCompanyIdInward 
    }
    callHttpUrl(apiPath, postData, function (data)
    {
        //alert(data);
        var getStatus = data.StatusCode;
        var getStatusCode = data.Code;
        if (getStatus == 'Success')
        {
            $('#ddlreason').html('');
            var gridDetail = '';
            var getResult = data.Result;
            var myGridList = getResult.Table;

            $("#ddlreason").html('<option value = "0">--Select--</option>');
            var getDropDownSize = myGridList;
            if (getDropDownSize.length > 0)
            {
                for (var i = 0; i < getDropDownSize.length; i++)
                {
                    var getreId = getDropDownSize[i].ID;
					var getReason=getDropDownSize[i].ReasonCode;
					var isSelected = '';
               
               
				
                    $("#ddlreason").append('<option value = "' + getreId + '">' + getReason + '</option>');
                }
            }

        }
		
		

    });
}
function viewQCOrder(strCurrentOrder)
{
    grnid = strCurrentOrder;
    $(".qcenablescan").hide();
    viewQCHead(strCurrentOrder);
}
function viewQCHead(strCurrentOrder)
{
	debugger;
    checkQCSaveClose = "";
    $('#qcsavebnt').show();
    if (strCurrentOrder != '0')
    {
        //apiFolder = +'GetPOHead';
        var apiPath = wmsApiPath + 'InboundQC/GetQCHead';;
        var getPageObj = $("#ddlPageObject").val();
        var strOrderId = strCurrentOrder;

        var postData =
        {
            CustomerId: getCustomerIdInward,
            WarehouseId: getWarehouseIdInward,
            UserId: getUserIdInward ,
            grnID: strOrderId,
            pageObj : getPageObj,
            OrderType: objQC,
        };
        callHttpUrl(apiPath, postData, function (data)
        {
            // After success
            var getCode = data.StatusCode;
            var getStatus = data.Status.toLocaleLowerCase();
            var docRow = '';
            if (getCode == "Success")
            {
                var getResult = data.Result;
                var getQCHead = getResult.Table;
                var grnID = getQCHead[0].grnID;
                var inQCDate = getQCHead[0].QCDate;
                var getqcDate = formatCustomDate(inQCDate);
                var poID = getQCHead[0].InboundReceiptNo;
                var getCreatedBy = getQCHead[0].CreatedBy;
                IsPallet = getQCHead[0].IsPallet;
                if(getCreatedBy=="")
                {
                    getCreatedBy = getUserName;
                }

                $('#hdngrnid').val(grnID);
                $('#lblpo').html(poID);
				$('#hdnPoOid').val(poID);
                $('#lblgrnno').html(grnID);
                $('#lblqcby').html(getCreatedBy);
                $('#dtQcDate').val(getqcDate);
                $("#hdnqcid").val('0');
                getQCddl(strCurrentOrder);
				getQCReasonddl();
                viewOrderQCDetails(strCurrentOrder, "GRN");
            }
            else
            {
                alert('Failed to open order!!');
            }
            // After success
        });
    }
    else
    {
        $('#spnPoOid').html('To be Generated');
        
        var getCurrentDate = isBlankDate('');
        $('#txtbatchno').val('');
        $('#lblgrnby').html(getUserName);
        $('#dtgrndate').val('');
        $("#hdnqcid").val('0');
        viewOrderQCDetails(strCurrentOrder, "GRN");
    }
}
function qualitycheckdetails()
{
	debugger;
	$('#wms-srv-qualitycheckdetails-popup').hide();
}

function viewOrderQCDetails(strCurrentOrder, ordertype)
{
	debugger;
    var qcgrnid = grnid;
    var apiPath = wmsApiPath + 'InboundQC/GetQCDetail';
     var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward,
        "OrderId": strCurrentOrder,
        "ordertype": ordertype
    };

    // BIND DATA GRID
    var gridTable = '';

    // GRID HEADER
    gridTable = gridTable + '<div class="wms-srv-grid-header qcheadboxhead" style="white-space:nowrap; text-align:center" >';
    //gridTable = gridTable + '<div class="wms-srv-grid-cell">SR. No</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Select</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code <span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Name</div>';
    if(IsPallet == 'YES'){
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Pallet Name</div>';
    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Expected Qty</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Received Qty</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Accepted Qty</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Rejected Qty</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">UOM <span class="requiredStar">*</span></div>';
    //gridTable = gridTable + '<div class="wms-srv-grid-cell">Lottable</div>';
    var getLottable = mBrillWmsSession.getCustomerLottable();
    var breakCustLot = getLottable.split(',');
    for(var lt=0; lt<breakCustLot.length; lt++){
        //var grnLotNum = lt + 1;
        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+lt+'" data-lottype="'+ breakCustLot[lt] +'" style="width:82px;text-align:center;display:none;">'+ breakCustLot[lt] +'</div>';
    }

    gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Reason</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
    gridTable = gridTable + '</div>';
    // GRID HEADER

    // GRID ADD NEW
    gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow qcheadboxdetail">';
    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'><input type='checkbox' onclick='selectAllQC(this)' id='SellectQCAll' value=''></div>";
    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtQCskucode" class="wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getSuggestionList(this,\'' + objQC + '\');"> <i class="fas fa-search" onclick="openQCProductListPopup('+qcgrnid+')" title="Search"></i></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" value="" id="txtQCskuname" class="wms-srv-grid-cell-input" disabled></div>';
    if(IsPallet == 'YES'){
        gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtqcPallet" disabled></div>';
    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtQCPOqty" disabled></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtQCGrnqty" disabled></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtacceptedqty" onchange="updateacceptedQty();" keyup="updateacceptedQty();"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtrejectedqty" disabled></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text"  class="wms-srv-grid-cell-input" id="txtQCUOM" disabled></select></div>';
    
    //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="QCLottable"></div></div>';
    // ADD NEW - GRN LOTTABLE PLACE HOLDER
    for(var ghl=0; ghl<breakCustLot.length; ghl++){
        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+ ghl +'" data-lottype="'+ breakCustLot[ghl] +'" style="width:82px;text-align:center;display:none;"></div>';
    }
    // ADD NEW - GRN LOTTABLE PLACE HOLDER

    gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlreason" onchange="updateOrderQty();"></select></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="saveQCDetails(objQC);"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
    // GRID ADD NEW

    $('#tblQCGrid').html(gridTable);
    if (strCurrentOrder != '0' && ordertype == 'QC')
    {
        callHttpUrl(apiPath, postData, function (data)
        {
            //alert(data);
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success')
				{
                var getResult = data.Result;
                var myGridList =getResult.Table;
                
                // var getGridData = myGridList.InboundResult[0].InboundList;
                var getGridData = myGridList;
                for (var i = 0; i < getGridData.length; i++)
                {
                    var getId = getGridData[i].ID;
                    var getSkuId = getGridData[i].skuID;
                    var getItemCode = getGridData[i].Prod_Code;
					var getskuname= getGridData[i].ProductName;                 
                    var getPalletName= getGridData[i].PalletName; 
                    var getUOM = getGridData[i].UOM;
                    var getUOMId = getGridData[i].UOMID;
                    var getOrderQty = getGridData[i].OQty;
                    var getGrnQty = getGridData[i].GRNqty;
					var getQCqty = getGridData[i].QCQty;
					var getRejqty = getGridData[i].RejectedQty;
					var getReasoncode = getGridData[i].ReasonCode;
                    var getLottable = getGridData[i].lottables;
                    var IsContainSerial = getGridData[i].IsContainSerial;

                    // GRID ROW
                    gridTable = '';
                    gridTable = gridTable + '<div class="wms-srv-grid-row wmSkuDetailsQCRow">';
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'><input type='checkbox' id='checkboxQC' class='checkboxQC' data-dtid='" + getId + "' data-OrderNo='" + strCurrentOrder + "' data-SkuId='" + getSkuId + "' data-ItemName='" + getskuname + "' data-OrderQty = '" + getOrderQty + "' data-qcqty='"+ getQCqty +"' data-Unit='" + getUOM + "' data-Lottable = '" + getLottable + "' data-ItemCode='" + getItemCode + "' data-IsContainSerial='" + IsContainSerial + "'></div>";
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';					
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getskuname + '</div>';
                    if(IsPallet == 'YES'){
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPalletName + '</div>';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGrnQty + '</div>';
					gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getQCqty + '</div>';
					gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRejqty + '</div>';					
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                
                    var breakLottable = getLottable.split(',');
                    //alert(breakLottable.length);
                    for(var gl=0; gl<breakLottable.length; gl++){
                        var skuLotVal = '';
                        if(breakLottable[gl].trim() != '0'){
                            skuLotVal = breakLottable[gl];
                        }
                        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+gl+'" data-lottype="'+ breakCustLot[gl] +'" style="text-align:center;display:none;">' + skuLotVal + '</div>';
                    }
                    //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getReasoncode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button" type="button" onclick="removeQCsku(' + getId + ',\'BeforeSave\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button></div></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW

                    $('#tblQCGrid').append(gridTable);
                }
                showHideLottableCellForQCList();
                openQCtab(strCurrentOrder, ordertype);
            }
            else
            {
                alert('Unable to connect Server!!');
            }
        });
    }
    else
    {
        openQCtab(strCurrentOrder, ordertype);
    }
}

function showHideLottableCellForQCList(){
    var getAddNewRowCount = $('#tblQCGrid .wmsFrmAddRow').length;
    var getViewRowCount = $('#tblQCGrid .wmSkuDetailsQCRow').length;
    var getTotalLotRowCount = getAddNewRowCount + getViewRowCount;
    $('#tblQCGrid .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var getCell = $('#tblQCGrid .wmSkuDetailsQCRow .gridCellLottable[data-lotindex="'+ l +'"]').length;
         var getAddCell = $('#tblQCGrid .wmsFrmAddRow .gridCellLottable[data-lotindex="'+ l +'"]').length;
         var totalCell = getCell + getAddCell;

         var getEmptyCell = $('#tblQCGrid .wmSkuDetailsQCRow .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
         var getAddEmptyCell = $('#tblQCGrid .wmsFrmAddRow .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
         var totalEmptyCell = getEmptyCell + getAddEmptyCell;

        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#tblQCGrid .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#tblQCGrid .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#tblQCGrid .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
}

function selectAllQC(obj) {
    debugger;
    var isSelected = $(obj).prop('checked');
    if (isSelected) {
        $('#tblQCGrid .wms-srv-grid-row input[type="checkbox"]').prop('checked', true);
    }
    else {
        $('#tblQCGrid .wms-srv-grid-row input[type="checkbox"]').prop('checked', false);
    }
    $('#tblQCGrid .wms-srv-grid-row input[type="checkbox"]').off();
    $('#tblQCGrid .wms-srv-grid-row input[type="checkbox"]').click(function () {
        var isSubSelected = $(this).prop('checked');
        if (!isSubSelected) {
            $('#SellectQCAll').prop('checked', false);
        }
    });
}
function updateacceptedQty() 
{
    debugger;
    var grnqtyval = $("#txtQCGrnqty").val();
    var qcqtyval = $("#txtacceptedqty").val();

    let grnqty = parseInt(grnqtyval);
    let qcqty = parseInt(qcqtyval);
    if (qcqty > grnqty) 
    {
        alert('accepted qty should not more than grn qty');
        $("#txtacceptedqty").val('');


    }
    else if (qcqty < 0) 
    {
        alert('Accepted Quantity Shuld Not Be Negative');
        $("#txtacceptedqty").val('');


    }
    else
     {
        qcqty = $("#txtacceptedqty").val();
        var rejqcqty = grnqty - qcqty;
        if (rejqcqty >= 0) 
        {
            $('#txtrejectedqty').val(rejqcqty);
        }
        else {
            alert('accepted qty should not more than grn qty');
            $('#txtrejectedqty').val('');

        }
    }
}

function saveQCDetails(obj) {
	debugger;
    if (validateQCData(obj) == true) {
     //var apiPath = 'http://localhost:50068/api/staging/v1/InboundQC/SaveQCDetail';
        var apiPath = wmsApiPath + 'InboundQC/SaveQCDetail';
        var getWarehouseID = $("#ddlwarehouse").val();
        var getCustomerId = $("#ddlcustomer").val();
        var getCompanyID = $('#hdnCompanyID').val();
        var getUserId = $("#hdnUserID").val();
        var poID = $("#hdnPoOid").val();
        var grnID = $('#hdngrnid').val();
        var qcID = $('#hdnqcid').val();
        if(qcID==0)
        {
            checkQCSaveClose = "NotSaved";
        }
		var qcdate = 0;      
        var getSkuId = 0;
        var getUOM = 0;
        var getUOMId = 0;
        var getpoQty = 0;
        var getGrnQty = 0;
        var getQcqty = 0;
        var getrejqty = 0;
        var getReason = 0;
        var getpalletname = '';
        var getpalletid = 0;
        if (obj == 'QC') {
        qcdate = $("#dtQcDate").val();       
        getSkuId = $("#txtQCskucode").attr('data-id');      
        getUOM = $("#txtQCUOMs").val();
        getUOMId = $("#txtQCUOM").attr('data-uomqcID');
        getpoQty = $("#txtQCPOqty").val();
         getGrnQty = $("#txtQCGrnqty").val();
		 getQcqty= $("#txtacceptedqty").val();
		 getrejqty=$("#txtrejectedqty").val();
		 getReason=$("#ddlreason").val();
         if(IsPallet == 'YES'){
            getpalletname=$("#txtqcPallet").val();
            getpalletid=$("#txtqcPallet").attr('data-palid');
         }
         

		}
		else if(obj=='ScanQC')
		{
			getSkuId=$("#hdnscanQCskuID").val();
			getQcqty= $("#txtscanqcqty").val();
		}

        var getLot = '';
        // COMMENTED AS ON 18 MARCH 2024
        // var getAllLottables = $('#QCLottable input');
        // $(getAllLottables).each(function () 
		// {
        //     var getLotId = $(this).attr('data-id');
        //     var getLotType = $(this).attr('data-description');
        //     var getLotVal = $(this).val();
        //     if (getLotVal.trim() != '') 
		// 	{
        //         if (getLot == '') 
		// 		{
        //             getLot += getLotId + ':' + getLotVal;
        //         } else {
        //             getLot += '|' + getLotId + ':' + getLotVal;
        //         }
        //     }
        // });
        // COMMENTED AS ON 18 MARCH 2024

        // NEW LOTTABLE CODE AS ON 18 MARCH 2024
        var getAllLottables = $('#tblQCGrid .wmsFrmAddRow .gridCellLottable');
        $(getAllLottables).each(function () {
            var getLotInput = $(this).find('input');
            if(getLotInput.length > 0){
                var getLotId = $(getLotInput).attr('data-id');
                var getLotType = $(getLotInput).attr('data-description');
                var getLotVal = $(getLotInput).val();
                if (getLotVal.trim() != '') {
                    if (getLot == '') {
                    getLot += getLotId + ':' + getLotVal;
                } else {
                    getLot += '|' + getLotId + ':' + getLotVal;
                }
            }
            }
        });
        // NEW LOTTABLE CODE AS ON 18 MARCH 2024

        var postData =
        {
            "CustomerId": getCustomerIdInward,
            "WarehouseId": getWarehouseIdInward,
            "companyID": getCompanyIdInward ,
            "UserId": getUserIdInward ,
            "poID": poID,
            "palletname":getpalletname,
            "obj": getPageObject,
            "grnID": grnID,
            "qcDate": qcdate,
            "qcID": qcID,
            "prodID": getSkuId,
            "reasonID": getReason,
            "RequestedQty":getpoQty,
            "GRNQty":getGrnQty,
			"qcQty":getQcqty,
			"rejectedQty": getrejqty,
            "UOMId": getUOMId,
            "Lottables": isBlankString(getLot),            
            "type":obj,
            "PalletID": getpalletid
        };
        callHttpUrl(apiPath, postData, function (result) 
		{
            // After success
            var getCode = result.StatusCode;
            var getStatus = result.Status.toLocaleLowerCase();
              qcID = result.Result.Message   
            if (getCode == "Success")
            { if (qcID == 'duplicate') 
            {
                alert('Already QC done for this SKU.')
                $("#txtQCskucode").val('');
                $("#txtQCUOMs").val('');
                $("#txtQCPOqty").val('');
                $("#txtQCGrnqty").val('');
                $("#txtacceptedqty").val('');
                $("#txtrejectedqty").val('');
                $("#txtQCskuname").val('');
                $("#txtqcPallets").val('');
                $("#txtQCUOM").val('');  
                $("#txtqcPallet").val('');    
            }
             else  if (qcID != '0') 
                    {
                        $("#QCdll").append('<option value = "' + qcID + '">' + qcID + '</option>');
                        $("#QCdll").val(qcID);
                        $('#hdnqcid').val(qcID);
                        chksaveQCid = qcID;

                        $("#QCdll option").each(function() {
                            $(this).siblings('[value="'+ this.value +'"]').remove();
                        });

                        $('#wms-srv-qualitycheckdetails-popup').show();
                        viewOrderQCDetails(qcID,'QC');
                        getQCReasonddl();
                        clearQCscan();
                        if(obj!='QC')
                        {
                            UpdateQCStatus(obj);
                            
                            
                        }
                    }
                    
            }
            else 
			{
                alert('Failed to save SKU');
            }
            // After success
        });
    }
}


function UpdateQCStatus(obj)
{
	debugger;
	var qcID=$("#hdnqcid").val();
	if(qcID=='0')
	{
		alert('Please fill out Mandatory Fields.');
	}
	else
	{
            var getPageObject = $('#ddlPageObject').val();
			var apiPath = wmsApiPath + 'InboundQC/UpdateQCStatus';   
			var poID = $("#hdnPoOid").val();
				var grnID=$("#hdngrnid").val();			
			var postData =
			{       
				"poID": poID,
				"GRNID":grnID,
                "pageObj":getPageObject	
			};

			callHttpUrl(apiPath, postData, function (result)
			{
				// After success
				//var getCode = result.StatusCode;
               var getCode= result.Result.Message;
				if (getCode == "success")
				{
					alert('QC Saved successfully!!');
                    checkQCSaveClose="Saved";
                    chksaveQCid='0';
					$('#wms-srv-qualitycheckdetails-popup').hide();                   
					//loadInboundList(strCurrentPage, globalActiveTab, searchfilter, searchvalue);
                    loadInboundList();

				}
                else if(getCode == "partial")
                {
                    alert('SKU pending for QC!!');
                }
                else if(getCode == "notmatch")
                {
                    alert('SKU pending for QC!!');
                }
			});
			
			
	}
}

function clearQCscan()
{
	  $('#txtQcscanvalue').val('');
	  $('#txtscanqcqty').val('');      
      $('#lblscanqcqty').html('');
	  $('#lblscanqctotalqty').html('');   

    

}
function validateQCData(obj)
{
    if(obj=='QC')
	{

    if ($('#dtQcDate').val() == '')
    {
        alert('Please enter QC Date!!')
        return false;
    }
   
    else if ($('#txtQCskucode').val() == '')
    {
        alert('Please enter Sku Code!!')
        return false;
    }
    else if ($('#txtacceptedqty').val() == '')
    {
        alert('Please enter Accepted qty!!')
        return false;
    }

    else if ($('#ddlQCUOM').val() == 0)
    {
        alert('Please select UOM!!');
        return false;
    }
    else if ($('#txtQCGrnqty').val() == '')
    {
        alert('Please enter GrnQty!!');
        return false;
    }
    if($('#ddlreason').val() == 0 && $('#txtrejectedqty').val() > 0){
        alert("Please select reason code..!");
        return false;
    }
    
    return true;
	}
	else if('ScanQC')
	{
		var qcscanqty=$('#lblscanqcqty').html();
		var qctotalqty=$('#lblscanqctotalqty').html();
		
       if($('#txtscanqcqty').val()=='')
		{
			alert('Please enter QC scan quantity!!');
        return false;
		}
        else if( $('#lblscanQCcode').html()=='')
		{
			alert('Please enter QC scan SKU!!');
        return false;
		}
       
        if(qcscanqty==qctotalqty)
		{
			alert('QC scan qty already done!!');
        return false;
		}

		 return true;
	}
    
}

function openQCProductListPopup(strCurrentOrder) {
    getQCSuggestionListPopup(strCurrentOrder);
    //alert('ProductList');
    $('#wms-srv-qc-product-list-popup').show();
    $('#wms-srv-qc-product-list-popup-close').off();
    $('#wms-srv-qc-product-list-popup-close').click(function () {
        $('#wms-srv-qc-product-list-popup').hide();
    });
    //loadSalesProductListPopup(recId);
}

function getQCSuggestionListPopup(strCurrentOrder) {
    debugger;
    var getSkey = "";
    var apiPath = wmsApiPath + 'CommFunAPI/GetSKUSuggestInQC';

    var postData =
    {
        "CustomerId": getCustomerIdInward,
        "WarehouseId": getWarehouseIdInward,
        "UserId": getUserIdInward ,
        "OrderId": strCurrentOrder,
        "skuobject": objQC,
        "orderobj":"PurchaseOrder"
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getLottable;
        var tableData = data.Result.Table
        if (getStatusCode == 'Success') {
            $('#pnlQCProductList').html('')
            var gridTable1 = '';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-header">';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">SKU Code</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">SKU Name</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">UOM</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">PO Qty</div>';
            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">GRN Qty</div>';
            if(IsPallet == 'YES'){
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">Pallet</div>';
            }
            //gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">Lottable</div>';

            var getLottable = mBrillWmsSession.getCustomerLottable();
            var breakCustLot = getLottable.split(',');
            for(var lt=0; lt<breakCustLot.length; lt++){
                //var grnLotNum = lt + 1;
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+lt+'" data-lottype="'+ breakCustLot[lt] +'" style="width:82px;text-align:center;display:table-cell;">'+ breakCustLot[lt] +'</div>';
            }

            gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell" style="width:60px;">Select</div>';
            gridTable1 = gridTable1 + '</div>';

            for (var i = 0; i < tableData.length; i++)
            {
                getSkuId = tableData[i].ID;
                getSKUCode = tableData[i].Sku;
                getSKUName = tableData[i].Name;
                getUOM = tableData[i].UOM;
                getUOMID = tableData[i].UOMID;
                getGRNQty = tableData[i].GRNQty;
                getPOQty = tableData[i].POQty;
                getPalletName = tableData[i].PalletName;
                getLottable = tableData[i].lot
                var GRNpalletid = '0';
                if(IsPallet == 'YES'){
                    GRNpalletid = tableData[i].PalletID;
                }

                gridTable1 = gridTable1 + '<div class="wms-srv-grid-row wmSkuDetailsQCSearchRow">';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getSKUCode + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getSKUName + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getPOQty + '</div>';
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getGRNQty + '</div>';
                if(IsPallet == 'YES'){
                    gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getPalletName + '</div>';
                }
                //gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell">' + getLottable + '</div>';
                var breakLottable = getLottable.split('|');
                for(var gl=0; gl<breakLottable.length; gl++){
                    var skuLotVal = '';
                    if(breakLottable[gl] != '0'){
                        skuLotVal = breakLottable[gl];
                    }
                    gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+gl+'" data-lottype="'+ breakCustLot[gl] +'" style="text-align:center">' + skuLotVal + '</div>';
                }
                gridTable1 = gridTable1 + '<div class="wms-srv-grid-cell" style="width:60px;text-align:center;"><i  class="fas fa-check-circle" onclick="selQCSku(' + getSkuId + ',\'' + getSKUCode  + '\',\''+getSKUName+'\',' + getPOQty + ',' + getGRNQty + ',\'' + getUOM + '\',\'' + getPalletName + '\',\'' + getLottable + '\',' + getUOMID + ',' + GRNpalletid + ');" ></i></div>';
                gridTable1 = gridTable1 + '</div>';

                $('#pnlQCProductList').html(gridTable1)
                showHideLotCellForQCSkuList();
            }
           
        }
    });
}

function showHideLotCellForQCSkuList(){
    var getViewRowCount = $('#pnlQCProductList .wmSkuDetailsQCSearchRow').length;
    $('#pnlQCProductList .gridCellLottable').show();
    for(var l=0; l<10; l++){
            // CHECK FOR VIEW ONLY EMPTY CELL
            var getCell = $('#pnlQCProductList .wmSkuDetailsQCSearchRow .gridCellLottable[data-lotindex="'+ l +'"]').length;
            var getEmptyCell = $('#pnlQCProductList .wmSkuDetailsQCSearchRow .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;

        if(getCell > 0){
            if(getCell != getEmptyCell){
                $('#pnlQCProductList .gridCellLottable[data-lotindex="'+ l +'"]').show();
                }else{
                $('#pnlQCProductList .gridCellLottable[data-lotindex="'+ l +'"]').hide();
                }
        }else{
            $('#pnlQCProductList .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
}

function selQCSku(getSkuId,getItemCode,getSKUName,getPOQty,getGRNQty,getUOM,getPalletName,getLottable,getUOMId,GRNpalletid) {
    debugger;
   // $('#txtpoqty').val(getRequestedQty);
    $('#txtQCskucode').val(getItemCode);
    $('#txtQCskucode').attr('data-id',getSkuId);
    $('#txtQCskuname').val(getSKUName);   
    $('#txtQCPOqty').val(getPOQty);
    $('#txtQCGrnqty').val(getGRNQty);
    $('#txtacceptedqty').val(getGRNQty);
    $('#txtrejectedqty').val('0');
    $('#txtqcPallet').val(getPalletName);
    $('#txtqcPallet').attr('data-palid',GRNpalletid);
    $('#txtQCUOM').val(getUOM);
    $('#txtQCUOM').attr('data-uomqcID',getUOMId);


    GetUomBySKU(getSkuId,getUOMId,objQC)
    getLottableBySku(getSkuId, objQC, getPalletName,getLottable)
   // $('#wms-srv-GrnSKuSearch-popup .wms-srv-datepicker').datepicker('destroy');
    $('#wms-srv-qc-product-list-popup').hide();
}


function removeQCsku(recordID,obj)
{
    debugger;    
            if (confirm('Are you sure you want to remove SKU?')) 
            {
               // var wmsApiPath = "http://localhost:50068/api/staging/v1/";
                var apiPath = wmsApiPath + 'InboundQC/RemoveQCSKU';
                var QCID = $("#hdnqcid").val();
                if(checkQCSaveClose=="NotSaved")
                {
                    if(chksaveQCid !='0' && chksaveQCid == QCID)
                    {
                    obj="QCSKURecRemove";
                    }
                }
                if(obj == "QCSKURecRemove")
                {
                            if (QCID != '0') 
                            {                                
                                var postData = 
                                {
                                    "QCid":QCID,
                                    "recordID": recordID,
                                    "obj":obj
                                };
                                    callHttpUrl(apiPath, postData, function (result) 
                                    {
                                    // After success
                                    var getCode = result.StatusCode;
                                    var getStatus = result.Status.toLocaleLowerCase();
                                    var getdata=result.Result.Message;
                                    //var getDescription = result.Description;
                                    var docRow = '';
                                        if (getdata == "success") 
                                        {
                                            viewOrderQCDetails(QCID, "QC");
                                            getQCReasonddl();
                                        }                                        
                                        else 
                                        {
                                        alert('Failed to remove SKU!!');
                                    }
                                });
                            }
                }
                else{
                    alert('QC Completed SKU can not be Removed');
                }
            }
   
}

function CloseQCbtn()
{
    debugger;
    if(checkQCSaveClose == "NotSaved")
    {
        if (confirm("If You Close Window without Save Will remove added Record from QC Details.Do you want to close?")) {

          //  var wmsApiPath = "http://localhost:50068/api/staging/v1/";
            var apiPath = wmsApiPath + 'InboundQC/RemoveQCSKU';
          //  var grnID = $("#hdngrnid").val();
            var grnID = chksaveQCid;
            var recordID1 = 0;
            if (grnID != '0') 
            {                            
                var postData = 
                {
                    "QCid":grnID,
                    "recordID": recordID1,
                    "obj":checkQCSaveClose
                };
                    callHttpUrl(apiPath, postData, function (result) 
                    {
                    // After success
                    var getCode = result.StatusCode;
                    var getStatus = result.Status.toLocaleLowerCase();
                    //var getDescription = result.Description;
                     var docRow = '';
                        if (getCode == "Success") 
                        {
                          
                         // $('#wms-srv-QCviewdetail-popup').hide();
                          $('#wms-srv-qualitycheckdetails-popup').hide();
                          checkQCSaveClose == "";
                        }
                        else 
                        {
                        alert('Failed to remove SKU!!');
                    }
                });
            }
            else
            {
                $('#wms-srv-qualitycheckdetails-popup').hide();
                checkQCSaveClose == ""; 
            }
    }
    }
    else{       
       // $('#wms-srv-QCviewdetail-popup').hide();
        $('#wms-srv-qualitycheckdetails-popup').hide();
        checkQCSaveClose == "";
    }   
}
///////////////////////////////////////////#endregion///////////////////////////////////////////////////////////////////////////////

function getSelectedDTIDForBarcodeQC() {
    var SelectedQClotable = '';
    $("#tblQCGrid .wmSkuDetailsQCRow input[class='checkboxQC']").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedQClotable == "") {
                SelectedQClotable = $(this).attr("data-dtid");
            } else {
                SelectedQClotable = SelectedQClotable + "," + $(this).attr("data-dtid");
            }
        }
    });
    return SelectedQClotable;
}

// Changes as on 05 December 2024 for QC Label Print... 

function printBarcodeLabelForQC() {
    var isValidForPrint = validateForQCSerialSelect();
    var arrSkuId = getSelectedIdForBarcodeQC();
    $('#txtPrintBarcodeTypeTransport').val('1D - 128');
    if (arrSkuId.length > 0) {
        if (isValidForPrint) {
            var currentPrintLabelType = $('#hdnCurrentLabelPrintType').val();
          //  var OrderId = $('#btnPrintQcBarcodeLabel').attr('data-orderid');
              var OrderId = $('#lblpo').html();
            if (currentPrintLabelType != 'serial') {
                var grpSkuId = '';
                for (var i = 0; i < arrSkuId.length; i++) {
                    if (grpSkuId == '') {
                        grpSkuId = arrSkuId[i];
                    } else {
                        grpSkuId = grpSkuId + ',' + arrSkuId[i];
                    }
                }
                var grpDTId = getSelectedDTIDForBarcodeQC();
                var GateQCHeadId = $('#QCdll').val();
                var apiPath = wmsApiPath + 'GRN/GetBarcodePrintData';
                var postData = {
                    "SkuId": grpSkuId,
                    "OrderId": OrderId,
                    "objectType": "QC",
                    "objectId": GateQCHeadId,
                    "DTID":grpDTId
                };
                callHttpUrl(apiPath, postData, function (result) {
                    debugger;
                    var getCode = result.StatusCode;
                    var getStatus = result.Status;
                    if (getCode == 'Success') {
                        var getResult = result.Result.Table;
                        var myBarcodeStr = '';
                        var SerialObj = {};

                        var getLottable = mBrillWmsSession.getCustomerLottable();
                            var breakCustLot = getLottable.split(',');

                        for (var i = 0; i < getResult.length; i++) {
                            var custLotVal =[];
                            custLotVal.push(getResult[i].Lottable1);
                            custLotVal.push(getResult[i].Lottable2);
                            custLotVal.push(getResult[i].Lottable3);
                            custLotVal.push(getResult[i].Lottable4);
                            custLotVal.push(getResult[i].Lottable5);
                            custLotVal.push(getResult[i].Lottable6);
                            custLotVal.push(getResult[i].Lottable7);
                            custLotVal.push(getResult[i].Lottable8);
                            custLotVal.push(getResult[i].Lottable9);
                            custLotVal.push(getResult[i].Lottable10);

                            // var getPassLottable = getResult[i].Lottable1 + ' | ' + getResult[i].Lottable2 + ' | ' + getResult[i].Lottable3;
                            var getPassLottable = '';

                            myBarcodeStr += '<div class="BarcodeBoxHolder"><div class="BarcodeBox"><div class="barcodeGrid" style="display: grid">';
                            //myBarcodeStr += '<div class="BarcodeTxt" style="font-size: 200%;">' + myBarcode[i + 1] + '</div>';
                            
                            // myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle">' + '<label class="prodbarTitle">Order No: </label></div>';
                            // myBarcodeStr += '<div class="">' + getResult[i].OrderId + '</div></span>';
                            
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Sku Code: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].ProductCode + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div><label class="prodbarTitle">Sku Name: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].Name + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">QC QTY: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].ObjQty + '</div></span>';
                            
                            for(var ctl=0; ctl < custLotVal.length; ctl++){
                                if(custLotVal[ctl].trim() != '0' && custLotVal[ctl].trim() != ''){
                                    if(getPassLottable == ''){
                                        getPassLottable = breakCustLot[ctl]+ ':' +custLotVal[ctl];
                                    }else{
                                        getPassLottable = getPassLottable +' | '+ breakCustLot[ctl]+ ':' +custLotVal[ctl];
                                    }
                                }
                            }
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">Lottable: </label></div>';
                            myBarcodeStr += '<div class="">' + getPassLottable + '</div></span>';
                            myBarcodeStr += '<span class="RowGridView" style="display:inline-flex"><div class="prodbarTitle"><label class="prodbarTitle">UOM: </label></div>';
                            myBarcodeStr += '<div class="">' + getResult[i].UOM + '</div></span></br>';
                            myBarcodeStr += '<div class="BarcodeStringToPrint">' + convertToBarcode(getResult[i].BarcodeString) + '</div>';
                            myBarcodeStr += '<div class="Barcode2DStringToPrint" style="display:none;">' + getResult[i].QRCode.split('\n').join('<br />') + '</div>';
                            myBarcodeStr += '</div></div></div><div class="barcodePageBreak"></div>';
                            SerialObj = getResult[i];
                        }
                        $('#grnBarcodeID').html(myBarcodeStr);
                        // if (currentPrintLabelType != 'serial') {
                        //     $('#grnBarcodeID').html(myBarcodeStr);
                        // }else{
                        //     $('#grnBarcodeID').html('');
                        //     $('#btnGenerateSerialNoLabel').off();
                        //     $('#btnGenerateSerialNoLabel').click(function(){
                        //         var serialFrom = $('#txtSerialBarcodeFrom').val();
                        //         var serialTo = $('#txtSerialBarcodeTo').val();
                        //         generateSerialNoLabel(OrderId);
                        //     });
                        // }  

                        $('#wms-srv-grnprintbarcode-popup').show();
                        $('#wms-srv-grnprintbarcode-popup-close').off();
                        $('#wms-srv-grnprintbarcode-popup-close').click(function () {
                            //clearArrayVal();
                            $('#wms-srv-grnprintbarcode-popup').hide();

                        });
                    }
                });
            } else {
                var arrSkuId = getSelectedIdForBarcodeQC();
                if(arrSkuId.length == 1){
                    $('#grnBarcodeID').html('');
                    var getSubObjectId = $('#QCdll').val();
                    generateSerialNoLabel(OrderId, 'QC', getSubObjectId, 'No');
                }else{
                    alert('Please select only one Serial SKU at a time to generate labels!!');
                }
               
            }
        } else {
            alert("Please select multiple SKU without serial no lottable for print.\n Or Only select one SKU of serial no lottable for print!!");
        }
    } else {
        alert("Please select atleast one record..!");
    }
}

function validateForQCSerialSelect() {
    debugger;
    var selectedChkCount = 0;
    var isSerialSelected = 'No';
    var isValid = true;
    $('#pnlGenerateSerialLabels').hide();
    $('#pnlPrintLabelSize').show();
    $('#hdnCurrentLabelPrintType').val('normal');
    $("input[class='checkboxQC']").each(function () {
        var isChkSelected = $(this).prop('checked');
        if (isChkSelected) {
            selectedChkCount = selectedChkCount + 1;
            var chkIsSerialLottable = $(this).attr('data-iscontainserial');
            if (chkIsSerialLottable == 'Yes') {
                isSerialSelected = 'Yes';
                //$('#pnlGenerateSerialLabels').show();
                //$('#pnlPrintLabelSize').hide();
                $('#hdnCurrentLabelPrintType').val('serial');
            }
        }
    });
    if ((selectedChkCount > 1) && (isSerialSelected == 'Yes')) {
        isValid = false;
    }
    return isValid;
}

function getSelectedIdForBarcodeQC() {
    var strBarcode = [];
    //var SelectedId = document.getElementById("hdnGrnIdForBarcode");
    $("input[class='checkboxQC']").each(function () {
        if ($(this).prop("checked") == true) {
            var SkuId = $(this).attr("data-skuid");
        //    if(SelectedId.value == "") {
                strBarcode.push(SkuId);
            // }else{
            //     SelectedId.value = SelectedId.value + "," +SkuId;
            // }
        }
    });
    return strBarcode;
}