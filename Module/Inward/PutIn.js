//////////////////////////////////////////////////Putway///////////////////////////////////////////////////////////////////////////

var objPutin='PutIn';
var IsQC = 'NO';
var IsPallet = 'NO';
var refHiddenFeild = '';
var isPalletFlow = false;
var globalGrnId = 0;
var globalQcId = 0;
var globalCurrentPutAwayQty = 0;
var globalTotalPutAwayQty = 0;
var globalOrgLocationId = 0;
var globalOrgLocationQty = 0;
var selectedPutAwayLocation = [];

var getUserName = mBrillWmsSession.getUserName();

function openPIviewdetail(oid)
 {
    $('#wms-srv-PIviewdetail-popup').show();
    $('#wms-srv-PIviewdetail-popup-close').off();
    $('#wms-srv-PIviewdetail-popup-close').click(function ()
	{
        $('#wms-srv-PIviewdetail-popup').hide();
    });
}

// function OpenLocationPopup() 
// {
//     $('#wms-srv-location-popup').show();
//     $('#wms-srv-location-popup-close').off();
//     $('#wms-srv-location-popup-close').click(function () {
//         $("#txtputinlocfilter").val('');
//         $('#wms-srv-location-popup').hide();
//     });
// }

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

///Commented by dilip on 29082023 (Task Assingment)  
// function viewPutAway(strOrderId)
// {
// debugger;
// 		var apiPath = wmsApiPath + 'PutIn/Putinlist';
// 		var  cID= $("#ddlcustomer").val();
//         var wrid = mBrillWmsSession.getWarehouseId();
//         var userid = mBrillWmsSession.getUserId();

// 		var postData =
// 		{
// 			OrderID:strOrderId,
//             userID:getUserIdInward,
// 			customerID:cID,
//             WarehouseId:wrid,
//             userID:userid
// 		}
// 		callHttpUrl(apiPath, postData, function (data)
// 		{
// 			//alert(data);
// 			//var getStatus = data.Status;
// 			var getStatusCode = data.StatusCode;
// 			if (getStatusCode == 'Success')
// 			{
// 				$('#Putwaygrid').html('');
// 				var getResult = data.Result;
// 				var myGridList = getResult.Table;
				

// 				var gridTable = '';

//                 var getGridData = myGridList;
//                 IsQC = getGridData[0].IsQC;

// 				// GRID HEADER
// 				gridTable = gridTable + '<div class="wms-srv-grid-header">';
// 				gridTable = gridTable + '<div class="wms-srv-grid-cell">Expected Receipt No  </div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell">Batch No</div>'; 

//                 if(IsQC == 'YES'){
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Number</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Date</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">QC By</div>';
//                 }
//                 else{
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Number</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Date</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN By</div>';
//                 }
				
// 				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:200px;">Status</div>';
// 				gridTable = gridTable + '</div>';
				
//                 var getgrnno='',getgrndatesplit='',getgrndate='',grnby='',getQCID;
// 				for (var i = 0; i < getGridData.length; i++)
// 				{
// 					var getExpectedReceiptNo = getGridData[i].ExpectedReceiptNo;
//                     var batchno = getGridData[i].BatchNo;
//                     if(IsQC == 'YES'){
//                         getgrnno = getGridData[i].GRNID;
//                         getQCID = getGridData[i].QCID;
//                         getgrndatesplit = getGridData[i].QCdate.split('T');
//                         getgrndate = convertDate(getgrndatesplit[0]);
//                         grnby = getGridData[i].QCNby;
//                     }
//                     else{
//                         getgrnno = getGridData[i].GRNID;
//                         getgrndatesplit = getGridData[i].GRNDate.split('T');
//                         getgrndate = convertDate(getgrndatesplit[0]);
//                         grnby = getGridData[i].GRNby;
//                     }

// 					var getstatus = getGridData[i].status;
//                     var putinID= getGridData[i].putinID;
//                     $('#hdnputinid').val(putinID);
                   
// 					//grid row
// 					gridTable = gridTable + '<div class="wms-srv-grid-row">';
// 					gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getExpectedReceiptNo+'</div>';
//                     gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +batchno+'</div>';
// 					gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +getgrnno+'</div>';
// 					gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getgrndate+'</div>';
// 					gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +grnby+'</div>';
//                  //  if(IsQC == 'YES'){
//                        //  gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus,IsQC) +'</div>';
//                     // }
//                    //  else{
//                     //    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus,IsQC) +'</div>';
//                     //}
//                     gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus,IsQC,getQCID) +'</div>';
				   
// 					gridTable = gridTable + '</div>';
				   
// 					$('#Putwaygrid').html(gridTable);
// 				}
//         }
		
//          else
//             {
//              alert('Unable to connect Server!!');
//             }        
//       });	  
// 						 $('#wms-srv-putaway-popup').show();
// 					$('#wms-srv-putaway-popup-close').off();
// 					$('#wms-srv-putaway-popup-close').click(function ()
// 					{
// 						$('#wms-srv-putaway-popup').hide();
// 					});
// 	}


// function viewPutAway(strOrderId)
// {
// debugger;
// 		var apiPath = wmsApiPath + 'PutIn/Putinlist';
// 		var  cID= $("#ddlcustomer").val();
//         var wrid = mBrillWmsSession.getWarehouseId();
//         var userid = mBrillWmsSession.getUserId();

// 		var postData =
// 		{
// 			OrderID:strOrderId,
//             userID:getUserIdInward,
// 			customerID:cID,
//             WarehouseId:wrid,
//             userID:userid
// 		}
// 		callHttpUrl(apiPath, postData, function (data)
// 		{
// 			//alert(data);
// 			//var getStatus = data.Status;
// 			var getStatusCode = data.StatusCode;
// 			if (getStatusCode == 'Success')
// 			{
// 				$('#Putwaygrid').html('');
// 				var getResult = data.Result;
// 				var myGridList = getResult.Table;
				

// 				var gridTable = '';

//                 var getGridData = myGridList;
//                 IsQC = getGridData[0].IsQC;

// 				// GRID HEADER
// 				gridTable = gridTable + '<div class="wms-srv-grid-header">';
// 				gridTable = gridTable + '<div class="wms-srv-grid-cell">Inward Order No  </div>';
//                 gridTable = gridTable + '<div class="wms-srv-grid-cell">Batch No</div>'; 

//                 if(IsQC == 'YES'){
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Number</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Date</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">QC By</div>';
//                 }
//                 else{
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Number</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Date</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN By</div>';
//                 }
				
// 				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:200px;">Status</div>';
// 				gridTable = gridTable + '</div>';
				
//                 var getgrnno='',getgrndatesplit='',getgrndate='',grnby='',getQCID;
// 				for (var i = 0; i < getGridData.length; i++)
// 				{
//                     var getTaskAssignUserCount = getGridData[i].TaskAssignUserCount ;
//                     if(getTaskAssignUserCount==1){
//                         alert('Put Away Order not assign to this User...!');
//                         $('#wms-srv-putaway-popup').off();
//                         $('#wms-srv-putaway-popup-close').off();
//                         loadInboundList();
//                     }else{

//                             var getExpectedReceiptNo = getGridData[i].ExpectedReceiptNo;
//                             var batchno = getGridData[i].BatchNo;
//                             if(IsQC == 'YES'){
//                                 getgrnno = getGridData[i].GRNID;
//                                 getQCID = getGridData[i].QCID;
//                                 getgrndatesplit = getGridData[i].QCdate.split('T');
//                                 getgrndate = convertDate(getgrndatesplit[0]);
//                                 grnby = getGridData[i].QCNby;
//                             }
//                             else{
//                                 getgrnno = getGridData[i].GRNID;
//                                 getgrndatesplit = getGridData[i].GRNDate.split('T');
//                                 getgrndate = convertDate(getgrndatesplit[0]);
//                                 grnby = getGridData[i].GRNby;
//                             }

//                             var getstatus = getGridData[i].status;
//                             var putinID= getGridData[i].putinID;
//                         if (getstatus == 'Receiving' || getstatus == 'Quality Check')
//                                 {
//                                     $('#hdnputinid').val(putinID);
//                                 }
//                             //grid row
//                             gridTable = gridTable + '<div class="wms-srv-grid-row">';
//                             gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getExpectedReceiptNo+'</div>';
//                             gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +batchno+'</div>';
//                             gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +getgrnno+'</div>';
//                             gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getgrndate+'</div>';
//                             gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +grnby+'</div>';
//                         //  if(IsQC == 'YES'){
//                             //  gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus,IsQC) +'</div>';
//                             // }
//                         //  else{
//                             //    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus,IsQC) +'</div>';
//                             //}
//                             gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus,IsQC,getQCID) +'</div>';
                        
//                             gridTable = gridTable + '</div>';
                        
//                             $('#Putwaygrid').html(gridTable);
//                     }
// 				}
//                 if(getTaskAssignUserCount!=0){
//                     $('#wms-srv-putaway-popup').show();
//                      }
//                      $('#wms-srv-putaway-popup-close').click(function ()
//                      {
//                      // CloseQCbtn();
//                          $('#wms-srv-putaway-popup').hide();
//                      });
//         }
		
//          else
//             {
//              alert('Unable to connect Server!!');
//             }        
//       });	  
// 					// 	 $('#wms-srv-putaway-popup').show();
// 					// $('#wms-srv-putaway-popup-close').off();
// 					// $('#wms-srv-putaway-popup-close').click(function ()
// 					// {
// 					// 	$('#wms-srv-putaway-popup').hide();
// 					// });
// 	}




function viewPutAway(strOrderId) {
    debugger;
    var apiPath = wmsApiPath + 'PutIn/Putinlist';
    var cID = $("#ddlcustomer").val();
    var wrid = mBrillWmsSession.getWarehouseId();
    var userid = mBrillWmsSession.getUserId();

    var postData =
    {
        OrderID: strOrderId,
        userID: getUserIdInward,
        customerID: cID,
        WarehouseId: wrid,
        userID: userid
    }
    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        //var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            $('#Putwaygrid').html('');
            var getResult = data.Result;
            var myGridList = getResult.Table;


            var gridTable = '';

            var getGridData = myGridList;
            IsQC = getGridData[0].IsQC;

            // GRID HEADER
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Inward Order No  </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Reference No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Batch No</div>';

            if (IsQC == 'YES') {
                gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Number</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">QC By</div>';
            }
            else {
                gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Number</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Date</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN By</div>';
            }

            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:200px;">Status</div>';
            gridTable = gridTable + '</div>';

            var getgrnno = '', getgrndatesplit = '', getgrndate = '', grnby = '', getQCID;
            for (var i = 0; i < getGridData.length; i++) {
                var getTaskAssignUserCount = getGridData[i].TaskAssignUserCount;
                if (getTaskAssignUserCount == 1) {
                    alert('Put Away Order not assign to this User...!');
                    $('#wms-srv-putaway-popup').off();
                    $('#wms-srv-putaway-popup-close').off();
                    loadInboundList();
                } else {

                    var getExpectedReceiptNo = getGridData[i].ExpectedReceiptNo;
                    var getorderrefNo = getGridData[i].orderrefNo;
                    var batchno = getGridData[i].BatchNo;
                    if (IsQC == 'YES') {
                        getgrnno = getGridData[i].GRNID;
                        getQCID = getGridData[i].QCID;
                        getgrndatesplit = getGridData[i].QCdate.split('T');
                        getgrndate = convertDate(getgrndatesplit[0]);
                        grnby = getGridData[i].QCNby;
                    }
                    else {
                        getgrnno = getGridData[i].GRNID;
                        getgrndatesplit = getGridData[i].GRNDate.split('T');
                        getgrndate = convertDate(getgrndatesplit[0]);
                        grnby = getGridData[i].GRNby;
                    }

                    var getstatus = getGridData[i].status;
                    var putinID = getGridData[i].putinID;
                  //  if (getstatus == 'Receiving' || getstatus == 'Quality Check') 
                    if (getstatus == 'Receiving')    
                    {
                        $('#hdnputinid').val(putinID);
                    }
                    //grid row
                    // gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    //gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getExpectedReceiptNo+'</div>';
                    // gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +batchno+'</div>';
                    //gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +getgrnno+'</div>';
                    //gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getgrndate+'</div>';
                    //gridTable = gridTable + ' <div class="wms-srv-grid-cell">' +grnby+'</div>';

                    if (IsQC == 'YES') {
                        gridTable = gridTable + '<div class="wms-srv-grid-row">';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getExpectedReceiptNo + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getorderrefNo + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + batchno + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getQCID + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getgrndate + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + grnby + '</div>';
                    } else {
                        gridTable = gridTable + '<div class="wms-srv-grid-row">';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getExpectedReceiptNo + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getorderrefNo + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + batchno + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getgrnno + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + getgrndate + '</div>';
                        gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + grnby + '</div>';
                    }

                    //  if(IsQC == 'YES'){
                    //  gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus,IsQC) +'</div>';
                    // }
                    //  else{
                    //    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus,IsQC) +'</div>';
                    //}
                    gridTable = gridTable + ' <div class="wms-srv-grid-cell">' + bindPutinStatusControl(getExpectedReceiptNo, getgrnno, getstatus, IsQC, getQCID) + '</div>';

                    gridTable = gridTable + '</div>';

                    $('#Putwaygrid').html(gridTable);
                }
            }
            if (getTaskAssignUserCount != 0) {
                $('#wms-srv-putaway-popup').show();
            }
            $('#wms-srv-putaway-popup-close').click(function () {
                // CloseQCbtn();
                $('#wms-srv-putaway-popup').hide();
            });
        }

        else {
            alert('Unable to connect Server!!');
        }
    });
    // 	 $('#wms-srv-putaway-popup').show();
    // $('#wms-srv-putaway-popup-close').off();
    // $('#wms-srv-putaway-popup-close').click(function ()
    // {
    // 	$('#wms-srv-putaway-popup').hide();
    // });
}

	


function bindPutinStatusControl(orderId,grnID, strStatus,IsQC,qcId)
{
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';
    if(IsQC=="YES")
    {
        //orderId = 81843;
        htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getPutinQCStatusColor('Quality Check', strStatus) + '" data-orderid="' + grnID + '" data-status="' + strStatus + '" title = "Quality Check" onclick="viewQCOrder(\'' + grnID + '\');return false;"></div>';
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getPutinQCStatusColor('Putin', strStatus) + '" data-orderid="' + qcId + '" data-status="' + strStatus + '" title = "Putin" onclick="viewPutinHead(\'' + qcId + '\',\''+ strStatus +'\');return false;"></div>';
    
    }
    else{
        htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getPutinQCStatusColor('Receiving', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Receiving" onclick="viewgrnOrder(\'' + orderId + '\');return false;"></div>';
        htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getPutinQCStatusColor('Putin', strStatus) + '" data-orderid="' + grnID + '" data-status="' + strStatus + '" title = "Putin" onclick="viewPutinHead(\'' + grnID + '\',\''+ strStatus +'\');return false;"></div>';
    
    }
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function getPutinQCStatusColor(dataFor, currentStatus)
{
	debugger;
    var myColor = 'gray';

    if (dataFor == 'Receiving')
    {
        if (currentStatus == 'Receiving' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') 
        {
            myColor = 'green';
        }
    }
    else if(dataFor == 'Quality Check'){
        if (currentStatus == 'Put Away')
        {
            myColor = 'green';
        } 
        else if (currentStatus == 'Quality Check')
        {
            myColor = 'green';
        }
		else if(currentStatus=='Receiving')
		{
			myColor = 'red';
		}
    }
    else if (dataFor == 'Putin')
    {
        if (currentStatus == 'Put Away')
        {
            myColor = 'green';
        } 
		else if (currentStatus == 'Partially Completed')
        {
            myColor = 'partial';
        }
        else if (currentStatus == 'Quality Check')
        {
            myColor = 'red';
        }
		else if(currentStatus=='Receiving')
		{
			myColor = 'red';
		}
    }
    return myColor;
}

function viewPutinHead(strCurrentOrder,putinStatus)
{
	debugger;
    if (strCurrentOrder != '0')
    {
        //apiFolder = +'GetPOHead';
        var apiPath = wmsApiPath + 'PutIn/GetPutinHead';       
        var putinid = $("#hdnputinid").val();
        var strOrderId = strCurrentOrder;
        var getPageObj = $("#ddlPageObject").val();

        var postData =
        {
            CustomerId: getCustomerIdInward,
            WarehouseId: getWarehouseIdInward,
            UserId: getUserIdInward ,
            qcID: strOrderId,
            PutinID:putinid,
            OrderType: objPutin,
            pageObj:getPageObj
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
                var getputinHead = getResult.Table;
                IsQC = getputinHead[0].IsQC;
                IsPallet = getputinHead[0].IsPallet;
                var grnID = getputinHead[0].grnID;
				var qcID=getputinHead[0].qcID;
                var inPutinDate = getputinHead[0].PutinDate;
                var getPutinDate = formatCustomDate(inPutinDate);

                var poID = getputinHead[0].InboundReceiptNo;
                var getCreatedBy = getputinHead[0].CreatedBy;

                if(getCreatedBy=="")
                {
                    getCreatedBy = getUserName;
                }

                $('#hdngrnid').val(grnID);
                $('#lblPutPOID').html(poID);
                $('#lblPutGRNID').html(grnID);
				$('#lblPutQCID').html(qcID);
                if(IsQC == 'YES')
                {
                    $('#hdnQCid').val(qcID);
                }
                else
                {
                    $('#hdnQCid').val(grnID);
                    $('#dvqcHead').hide();
                    $('#dvqcdetail').hide();
                }		
                $('#lblputwayby').html(getCreatedBy);
                $('#dtPutinDate').val(getPutinDate);
                
                viewPutAwayDetails(strCurrentOrder,"PutIn","QC",putinStatus);
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
        $('#hdnPoOid').val(strCurrentOrder);
        var getCurrentDate = isBlankDate('');
        $('#txtbatchno').val('');
        $('#lblgrnby').html(getUserName);
        $('#dtgrndate').val('');

        viewPutAwayDetails(strCurrentOrder,"PutIn","QC",putinStatus);
    }
}


// function viewPutAwayDetails(strCurrentOrder,ordertype,obj,putawaystatus)
// {
// 	debugger;
//     var apiPath = wmsApiPath + 'PutIn/getPutinskulist';
//     var wrid = mBrillWmsSession.getWarehouseId();
//     var putinid = $("#hdnputinid").val();
//     var userid = mBrillWmsSession.getUserId();

//     var postData =
//     {		
//         OrderID: strCurrentOrder,
//         PutID: putinid,
//         userID:getUserIdInward,
//         CustomerID:getCustomerIdInward,
//         objectname:obj,
//         WarehousrID:wrid,
//         userID:	userid
//     };


//     // BIND DATA GRID
//     var gridTable = '';
    
//     // GRID HEADER
//     gridTable = gridTable + '<div class="wms-srv-grid-header" style="white-space:nowrap;">';
//     gridTable = gridTable + '<div class="wms-srv-grid-cell">Sort Code</div>';
//     gridTable = gridTable + '<div class="wms-srv-grid-cell">Location Code <span class="requiredStar">*</span></div>';
//     if(IsPallet == 'YES')
//     {
//         gridTable = gridTable + '<div class="wms-srv-grid-cell">Pallet Name <span class="requiredStar">*</span></div>';
//     }
//     gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code <span class="requiredStar">*</span></div>';
//     gridTable = gridTable + '<div class="wms-srv-grid-cell">Location Capacity</div>';   
//     gridTable = gridTable +'<div class="wms-srv-grid-cell">Unit of Measurment</div>';
//     gridTable = gridTable + '<div class="wms-srv-grid-cell">Put Away Qty <span class="requiredStar">*</span></div>';
//     gridTable = gridTable + '<div class="wms-srv-grid-cell">Batch No.</div>';
//    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Lottable</div>';
//    var getLottable = mBrillWmsSession.getCustomerLottable();
//    var breakCustLot = getLottable.split(',');
//     for(var lt=0; lt<breakCustLot.length; lt++){
//         //var grnLotNum = lt + 1;
//         gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+lt+'" data-lottype="'+ breakCustLot[lt] +'" style="width:82px;text-align:center;display:none;">'+ breakCustLot[lt] +'</div>';
//     }

//     gridTable = gridTable + '<input type="hidden" id="hdnRefNo">';
//     gridTable = gridTable + '</div>';
//     // GRID HEADER
    

//     $('#tblputingrid').html(gridTable);
//     if (strCurrentOrder != '0' && ordertype == 'PutIn')
//     {
//         callHttpUrl(apiPath, postData, function (data)
//         {
//             //alert(data);
//             var getStatus = data.Status;
//             var getStatusCode = data.StatusCode;
//             if (getStatusCode == 'Success')
// 				{
//                     refHiddenFeild = '';
//                 var getResult = data.Result;
//                 var myGridList =getResult.Table;  
                
//                 var getGridData = myGridList;
//                 for (var i = 0; i < getGridData.length; i++)
//                 {
//                     var getId = getGridData[i].ID;
// 					var locId = getGridData[i].LocationID;
//                     var Sortcode=getGridData[i].ShortCode;
// 					var LocationCode = getGridData[i].Code;
//                     var getSkuId = getGridData[i].ProdID;
//                     var getItemCode = getGridData[i].ProductCode;
// 					var palletID=getGridData[i].PalletID;
//                     var getpalletName = getGridData[i].Palletname;
//                     var locationcapacity=getGridData[i].Capacity;
// 					var currentstock=getGridData[i].AvailableBalance;
//                     var getUOM = getGridData[i].UOM;
//                     var getUOMId = getGridData[i].UOMID;
//                     var putinqty = getGridData[i].QCQty;
//                     var skuWiseGrnId = getGridData[i].GRNID;
//                     var batchcode = getGridData[i].BatchNo;
//                     // var getLottable = getGridData[i].Lottable1+'|'+getGridData[i].Lottable2+'|'+getGridData[i].Lottable3;
//                      var getLottable = [];
//                     getLottable.push(getGridData[i].Lottable1);
//                     getLottable.push(getGridData[i].Lottable2);
//                     getLottable.push(getGridData[i].Lottable3);
//                     getLottable.push(getGridData[i].Lottable4);
//                     getLottable.push(getGridData[i].Lottable5);
//                     getLottable.push(getGridData[i].Lottable6);
//                     getLottable.push(getGridData[i].Lottable7);
//                     getLottable.push(getGridData[i].Lottable8);
//                     getLottable.push(getGridData[i].Lottable9);
//                     getLottable.push(getGridData[i].Lottable10);

//                     refHiddenFeild = Sortcode;
//                     // GRID ROW
//                     gridTable = '';

//                     gridTable = gridTable + '<div class="wms-srv-grid-row wmSkuDetailsPutInRow">';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell" id="refshortCode">' + Sortcode + '</div>';
// 					//gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtLocationcode" class="wms-srv-grid-cell-input wms-srv-suggestion"  value="'+LocationCode+'"> <i class="fas fa-search" id="IDputinlocserarch" style= title="Search" onclick="OpenLocationPopup('+getId+');"></i></div>';
// 					if(putawaystatus!= 'Put Away')
//                     {
//                        // gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtLocationcode" class="wms-srv-grid-cell-input wms-srv-suggestion"  value="'+LocationCode+'"><i class="fas fa-search" id="IDputinlocserarch" style= title="Search" onclick="OpenLocationPopup('+getId+');"></i> </div>';
//                         gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtLocationcode" class="wms-srv-grid-cell-input wms-srv-suggestion"  value="'+LocationCode+'"><i class="fas fa-search" id="IDputinlocserarch" style= title="Search" onclick="OpenLocationPopup('+getId+', '+ putinqty +', '+ locId +', ' + putinqty + ','+ skuWiseGrnId +', false);"></i> </div>';
//                     }
//                     else
//                     {
//                         //gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtLocationcode" class="wms-srv-grid-cell-input wms-srv-suggestion"  value="'+LocationCode+'"></div>';
//                         gridTable = gridTable + '<div class="wms-srv-grid-cell">' + LocationCode + '</div>';

//                     }
// 					if(IsPallet == 'YES')
//                     {
//                         gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getpalletName + '</div>';
//                     }				
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">' + locationcapacity + '</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">' + putinqty + '</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">' + batchcode + '</div>';
//                     //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable + '</div>';
                   
//                     for(var lt=0; lt<breakCustLot.length; lt++){
//                         //var grnLotNum = lt + 1;
//                         var lotVal = getLottable[lt];
//                         if(lotVal.trim() == '0'){                          
//                             lotVal = '';
//                         }
//                         gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="'+lt+'" data-lottype="'+ breakCustLot[lt] +'" style="width:82px;text-align:center;display:none;">'+ lotVal +'</div>';
//                     }

//                     gridTable = gridTable + '</div>';
//                     // GRID ROW

//                     $('#tblputingrid').append(gridTable);
//                 }
//                 showHideLottableCellForPutInList();
//                 openPutIntab(strCurrentOrder,ordertype,putawaystatus);
//             }
//             else
//             {
//                 alert('Unable to connect Server!!');
//             }
//         });
//     }
//     else
//     {
//         openPutIntab(strCurrentOrder, ordertype,putawaystatus);
//     }
// }

function viewPutAwayDetails(strCurrentOrder, ordertype, obj, putawaystatus) {
    debugger;
    var apiPath = wmsApiPath + 'PutIn/getPutinskulist';
    var wrid = mBrillWmsSession.getWarehouseId();
    var putinid = $("#hdnputinid").val();
    var userid = mBrillWmsSession.getUserId();

    var postData = {
        OrderID: strCurrentOrder,
        PutID: putinid,
        userID: getUserIdInward,
        CustomerID: getCustomerIdInward,
        objectname: obj,
        WarehousrID: wrid,
        userID: userid
    };

    // Clear previous data
    $('#tblputingrid').empty();

    // BIND DATA GRID
    var gridTable = '';

    // GRID HEADER
    gridTable = gridTable + '<div class="wms-srv-grid-header" style="white-space:nowrap;">';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Sort Code</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Location Code <span class="requiredStar">*</span></div>';
    if (IsPallet == 'YES') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Pallet Name <span class="requiredStar">*</span></div>';
    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code <span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Location Capacity</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Unit of Measurement</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Put Away Qty <span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Batch No.</div>';
    var getLottable = mBrillWmsSession.getCustomerLottable();
    var breakCustLot = getLottable.split(',');
    for (var lt = 0; lt < breakCustLot.length; lt++) {
        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + lt + '" data-lottype="' + breakCustLot[lt] + '" style="width:82px;text-align:center;display:none;">' + breakCustLot[lt] + '</div>';
    }
    gridTable = gridTable + '<input type="hidden" id="hdnRefNo">';
    gridTable = gridTable + '</div>';
    // GRID HEADER

    $('#tblputingrid').html(gridTable);

    if (strCurrentOrder != '0' && ordertype == 'PutIn') {
        callHttpUrl(apiPath, postData, function (data) {
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                refHiddenFeild = '';
                var getResult = data.Result;
                var myGridList = getResult.Table;

                var getGridData = myGridList;
                for (var i = 0; i < getGridData.length; i++) {
                    var getId = getGridData[i].ID;
                    var locId = getGridData[i].LocationID;
                    var Sortcode = getGridData[i].ShortCode;
                    var LocationCode = getGridData[i].Code;
                    var getSkuId = getGridData[i].ProdID;
                    var getItemCode = getGridData[i].ProductCode;
                    var palletID = getGridData[i].PalletID;
                    var getpalletName = getGridData[i].Palletname;
                    var locationcapacity = getGridData[i].Capacity;
                    var currentstock = getGridData[i].AvailableBalance;
                    var getUOM = getGridData[i].UOM;
                    var getUOMId = getGridData[i].UOMID;
                    var putinqty = getGridData[i].QCQty;
                    var skuWiseGrnId = getGridData[i].GRNID;
                    var batchcode = getGridData[i].BatchNo;
                    var getLottable = [];
                    getLottable.push(getGridData[i].Lottable1);
                    getLottable.push(getGridData[i].Lottable2);
                    getLottable.push(getGridData[i].Lottable3);
                    getLottable.push(getGridData[i].Lottable4);
                    getLottable.push(getGridData[i].Lottable5);
                    getLottable.push(getGridData[i].Lottable6);
                    getLottable.push(getGridData[i].Lottable7);
                    getLottable.push(getGridData[i].Lottable8);
                    getLottable.push(getGridData[i].Lottable9);
                    getLottable.push(getGridData[i].Lottable10);

                    refHiddenFeild = Sortcode;
                    // GRID ROW
                    gridTable = '';

                    gridTable = gridTable + '<div class="wms-srv-grid-row wmSkuDetailsPutInRow">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" id="refshortCode">' + Sortcode + '</div>';
                    if (putawaystatus != 'Put Away') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-container-search"><input type="text" data-prefix="SESKU" id="txtLocationcode" class="wms-srv-grid-cell-input wms-srv-suggestion" value="' + LocationCode + '"><i class="fas fa-search" id="IDputinlocserarch" style="title=Search" onclick="OpenLocationPopup(' + getId + ', ' + putinqty + ', ' + locId + ', ' + putinqty + ',' + skuWiseGrnId + ', false);"></i></div>';
                    } else {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + LocationCode + '</div>';
                    }
                    if (IsPallet == 'YES') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getpalletName + '</div>';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + locationcapacity + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + putinqty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + batchcode + '</div>';

                    for (var lt = 0; lt < breakCustLot.length; lt++) {
                        var lotVal = getLottable[lt];
                        if (lotVal.trim() == '0') {
                            lotVal = '';
                        }
                        gridTable = gridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + lt + '" data-lottype="' + breakCustLot[lt] + '" style="width:82px;text-align:center;display:none;">' + lotVal + '</div>';
                    }

                    gridTable = gridTable + '</div>';
                    // GRID ROW

                    $('#tblputingrid').append(gridTable);
                }
                showHideLottableCellForPutInList();
                openPutIntab(strCurrentOrder, ordertype, putawaystatus);
            } else {
                alert('Unable to connect Server!!');
            }
        });
    } else {
        openPutIntab(strCurrentOrder, ordertype, putawaystatus);
    }
}


function showHideLottableCellForPutInList(){
    var getViewRowCount = $('#tblputingrid .wmSkuDetailsPutInRow').length;
    var getTotalLotRowCount = getViewRowCount;
    $('#tblputingrid .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var getCell = $('#tblputingrid .wmSkuDetailsPutInRow .gridCellLottable[data-lotindex="'+ l +'"]').length;
         var totalCell = getCell;

         var getEmptyCell = $('#tblputingrid .wmSkuDetailsPutInRow .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;
         var totalEmptyCell = getEmptyCell;

        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#tblputingrid .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#tblputingrid .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#tblputingrid .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
}

function openPutIntab(strOrderId, type,chkstatus)
{
    // Hide main popup...
   
    if (type != 'QC')
    {
        $('#lbpoid').html(strOrderId);
        $("#hdnorderid").html(strOrderId);
        $('#hdnPoOid').val(strOrderId);

    }
    //viewgrnOrder(strOrderId);
    
 // Hide main popup...
    $('#wms-srv-putaway-popup').hide();

    if(chkstatus != 'Put Away')
    {
        $('#btnsubmit').show();
        //$('#btnsubmit').css('opacity', '0.0');
        $("#IDputinlocserarch").show(); 
    }
    else
    {
        $('#btnsubmit').hide();
        $("#IDputinlocserarch").hide(); 
    }
    $('#wms-srv-putawaydetails-popup').show();
    $('.wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-putawaydetails-popup-close').off();
    $('#wms-srv-putawaydetails-popup-close').click(function () 
	{
        
        $('#wms-srv-putawaydetails-popup').hide();
    });
}

function SavePutinDetailNew(obj) {
    debugger;
    if (refHiddenFeild == '') {
        alert("You Can Not Save This Record Due to location is not Assign..!!")
    }
    else {
        var chkputinid = 0;
        chkputinid = $("#hdnputinid").val();
        if (chkputinid == 0) {
            var apiPath = wmsApiPath + 'PutIn/SavePutinDetails';
            var grnid = $('#hdngrnid').val();
            var qcID = $('#hdnQCid').val();
            var getUserId = $("#hdnUserID").val();
            var palletID = 0;
            var locationID = 0;
            if (obj == 'ScanPutIN') {
                palletID = $('#hdnputpltID').val();
                locationID = $('#hdnputlocID').val();
                clearputinscan();
            }
            var postData =
            {
                "grnID": grnid,
                "qcID": qcID,
                "customerID": getCustomerIdInward,
                "uid": getUserIdInward,
                "palletID": palletID,
                "locationID": locationID,
                "type": obj,
                "warehouseID": getWarehouseIdInward
            };
            callHttpUrl(apiPath, postData, function (result) {
                // After success
                var getCode = result.StatusCode;
                var getResult = result.Result.Message;
                if (getCode == "Success") {
                    if (obj != 'PutIN') {
                        putincheckupdate();
                    }
                    else {
                        alert('Status Update successfully!!');
                        $('#btnsubmit').prop('enabled', false);
                        $('#btnsubmit').css('opacity', '0.5');
                        $('#wms-srv-putawaydetails-popup').hide();
                        //  loadInboundList(strCurrentPage, globalActiveTab, searchfilter, searchvalue);
                        loadInboundList();
                    }
                }
                else { alert(getResult); }
            });
        }
        else {
            alert('Put In Already Completed');
        }
    }
}

        
function putincheckupdate()
{
	debugger;	
	var qcID=$("#hdnQCid").val();	
			var apiPath = wmsApiPath + 'PutIn/UpdatePutin';   
		   
			var postData =
			{       
				"qcid": qcID,
                "obj" :'PurchaseOrder'    
				
			};

			callHttpUrl(apiPath, postData, function (result)
			{
				// After success
				var getCode = result.StatusCode;
				var orderstatus=result.Result.Message;
				if (getCode == 'Success')
				{
					if(orderstatus=='Completed')
					{
						alert('Status Update successfully!!');
                        $('#wms-srv-putawaydetails-popup').hide();
                        loadInboundList(strCurrentPage, globalActiveTab, searchfilter, searchvalue);
                        clearputinscan();
					}
                    else if(orderstatus=='Partial')
                    {
                        
                    }

				}
				
			});
					
	
}

 function clearputinscan()
{
	     
      $('#lblputscanqty').html('');
	  $('#lblputTotalqty').html('');
	  $('#lblputPallet').html('');
	  $('#lblputLocation').html('');	

}

function openfilterloclist()
{
    debugger;
    //alert('gunc');
    if($("#txtputinlocfilter").val()=='')
    {
        alert('Please enter location code');
    }
    else
    {      
        // var isValidForLocQty = checkLocQtyBeforeSearch();
        var ID= $("#hdngetlocorderID").val();
        //OpenLocationPopup(ID);
        OpenLocationPopup(ID, globalTotalPutAwayQty, globalOrgLocationId, globalOrgLocationQty, globalGrnId, true);
    }
}

function OpenLocationPopup_old_10_Jan_2024(orderID, totalPutInQty, orgLocationId, orgLocationQty, skuWiseGrnId, isSearch) 
{
    debugger;
    if(!isSearch){
        selectedPutAwayLocation = [];
    }
    $('.pnlSavePutAwayLocationQty').hide();
   $('#pnlTotalPutAwayQtyLocList').hide();
    globalOrgLocationId = orgLocationId;
    globalOrgLocationQty = Number(orgLocationQty).toFixed(2);
    globalTotalPutAwayQty = totalPutInQty;
    globalGrnId = skuWiseGrnId;
    $('#spnSelectedPutAwayQtyCount').html('0');
    $('#spnTotalPutAwayQtyLocList').html(globalTotalPutAwayQty);
    var apiPath = wmsApiPath + 'PutIn/getlocationlist';
    var getWarehouseID = $("#ddlwarehouse").val();  
    var serchLocvalue='N/A'; 
      $("#hdngetlocorderID").val(orderID);
         if($("#txtputinlocfilter").val()=='')
         {
            $("#txtputinlocfilter").val('');   
            serchLocvalue == 'N/A';
         }
         else
         {
            serchLocvalue=$("#txtputinlocfilter").val();
         }    
    var postData =
    {				
        warehouseID:getWarehouseIdInward,
        skey:serchLocvalue,
        tempputidetailid:orderID,
        lastSeqno:sequenceNo
    };

    
   // gridTable = gridTable + '<div class="wms-srv-grid-cell">Availble Balance</div>';
   // gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';

   
   
        callHttpUrl(apiPath, postData, function (data)
        {
            //alert(data);
            // BIND DATA GRID
            var gridTable = '';

            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Sr.No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Location Code</div>';
            if (data.Result.Table[0].IsPallet.toLocaleLowerCase().trim() == 'yes'){
                isPalletFlow = true;
                $('.pnlSavePutAwayLocationQty').hide();
                $('#pnlTotalPutAwayQtyLocList').hide();
            }
            else{
                isPalletFlow = false;
                $('.pnlSavePutAwayLocationQty').show();
                $('#pnlTotalPutAwayQtyLocList').show();
            }
            if(!isPalletFlow){
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Quantity</div>';
            }else{
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
            }
            gridTable = gridTable + '</div>';
            // GRID HEADER
           
            // GRID HEADER
            
        
            $('#putinloclist').html(gridTable);
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
                    var srno=getGridData[i].srno;
                    var getId = getGridData[i].ID;                   
					var loccode = getGridData[i].Code;
                    var availablebance=getGridData[i].Availablebalance;
				
                    // GRID ROW
                    gridTable = '';
                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">'+srno+'</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">'+loccode+'</div>';
                    var getPutAwayQtyVal = '';
                    var getPutAwayQtyIndex = '-1';
                    if(!isPalletFlow){
                        var findLocObj = getLocationObjectForPutAway(getId);
                        var findLocQty = findLocObj['qty'];
                        var getPutAwayQtyIndex = findLocObj['myindex'];
                        if(findLocQty != '0'){
                            getPutAwayQtyVal = findLocQty;
                        }
                        gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" id="txtPutAwayQtyLocation_'+getId+'" value="'+ getPutAwayQtyVal +'" data-value="'+ getPutAwayQtyVal +'" data-index="'+ getPutAwayQtyIndex +'"  onchange="selectlocation('+orderID+','+getId+',\'' + loccode +'\', this);"  /></div>';
                    }else{
                        gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " data-isadded="no" id="btnPutAwayQtyLocation_'+getId+'" title="Save" data-prefix="SV" type="button" onclick="selectlocation('+orderID+','+getId+',\'' + loccode +'\', this);"><i class="fas fa-check-circle"></i><span>Save</span></button></div></div>';
                    }
                   // gridTable = gridTable + '<div class="wms-srv-grid-cell">'+availablebance+'</div>';
                    /*
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                    gridTable = gridTable + '<div class="wms-srv-grid-action">';
                    */
                    // if(){

                    // }else{
                        
                    // }
                    /*
                    gridTable = gridTable + '<button class="wms-srv-input wms-srv-button " data-isadded="no" id="btnPutAwayQtyLocation_'+getId+'" title="Save" data-prefix="SV" type="button" onclick="selectlocation('+orderID+','+getId+',\'' + loccode +'\', this);"><i class="fas fa-check-circle"></i><span>Save</span></button>';
                    gridTable = gridTable + '<button class="wms-srv-input wms-srv-button " data-isadded="no" id="btnRemovePutAwayQtyLocation_'+getId+'" title="Save" data-prefix="SV" type="button" onclick="removelocation('+orderID+','+getId+',\'' + loccode +'\', this);" style="display:none;"><i class="fas fa-times-circle"></i><span>Remove</span></button>';
                    gridTable = gridTable + '</div>';
                    gridTable = gridTable + '</div>';
                    */
                    gridTable = gridTable + '</div>';
                    // GRID ROW

                    $('#putinloclist').append(gridTable);
                }
                recalculateLocationPutAwayQty();
            }
            else
            {
                alert('Unable to connect Server!!');
            }
        });
    $('#wms-srv-location-popup').show();
    $('#wms-srv-location-popup-close').off();
    $('#wms-srv-location-popup-close').click(function () 
    {
        if(!isPalletFlow){
            closeAndRefresh();
        }else{
            $("#txtputinlocfilter").val('');
            $('#wms-srv-location-popup').hide();
        }
    });
}

function OpenLocationPopup(orderID, totalPutInQty, orgLocationId, orgLocationQty, skuWiseGrnId, isSearch) 
{
    debugger;
    loadedLocationIds.clear();
    
    if(!isSearch){
        selectedPutAwayLocation = [];
    }
    $('.pnlSavePutAwayLocationQty').hide();
   $('#pnlTotalPutAwayQtyLocList').hide();
    globalOrgLocationId = orgLocationId;
    globalOrgLocationQty = Number(orgLocationQty).toFixed(2);
    globalTotalPutAwayQty = totalPutInQty;
    globalGrnId = skuWiseGrnId;
    $('#spnSelectedPutAwayQtyCount').html('0');
    $('#spnTotalPutAwayQtyLocList').html(globalTotalPutAwayQty);
    var getWarehouseID = $("#ddlwarehouse").val();  
    $('#putinloclist').html('');
    loadLocationList(0, 0, orderID);

    $('#wms-srv-location-popup').show();
    $('#wms-srv-location-popup-close').off();
    $('#wms-srv-location-popup-close').click(function () 
    {
        if(!isPalletFlow){
            closeAndRefresh();
        }else{
            $("#txtputinlocfilter").val('');
            $('#wms-srv-location-popup').hide();
        }
    });
}

// function loadLocationList(sequenceNo, counter, orderID){
//     var apiPath = wmsApiPath + 'PutIn/getlocationlist';
//     var getWarehouseIdInward = mBrillWmsSession.getWarehouseId();
//     var serchLocvalue='N/A'; 
//     $("#hdngetlocorderID").val(orderID);
//       if($("#txtputinlocfilter").val()=='')
//       {
//           $("#txtputinlocfilter").val('');   
//           serchLocvalue == 'N/A';
//       }
//       else
//       {
//           serchLocvalue=$("#txtputinlocfilter").val();
//       }
//     var postData =
//     {				
//         warehouseID:getWarehouseIdInward,
//         skey:serchLocvalue,
//         tempputidetailid:orderID,
//         lastSeqno:sequenceNo
//     };

//    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Availble Balance</div>';
//    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';

//         callHttpUrl(apiPath, postData, function (data)
//         {
//             //alert(data);
//             // BIND DATA GRID
           
//             var getStatus = data.Status;
//             var getStatusCode = data.StatusCode;
//             if (getStatusCode == 'Success')
// 				{
//                 var getResult = data.Result;
//                 var myGridList =getResult.Table;

//                 // var getGridData = myGridList.InboundResult[0].InboundList;
//                 var getGridData = myGridList;
//                 var gridTableRow = '';
//                 var lastLocationId = '';
//                 for (var i = 0; i < getGridData.length; i++)
//                 {

//                     var hasPutInLocationHeader = $('#putinloclist .wms-srv-grid-header').length; 
//                     if(hasPutInLocationHeader == 0){
//                         var gridTable = '';

//                         gridTable = gridTable + '<div class="wms-srv-grid-header">';
//                         gridTable = gridTable + '<div class="wms-srv-grid-cell">Sr.No</div>';
//                         gridTable = gridTable + '<div class="wms-srv-grid-cell">Location Code</div>';
//                         if (data.Result.Table[0].IsPallet.toLocaleLowerCase().trim() == 'yes'){
//                             isPalletFlow = true;
//                             $('.pnlSavePutAwayLocationQty').hide();
//                             $('#pnlTotalPutAwayQtyLocList').hide();
//                         }
//                         else{
//                             isPalletFlow = false;
//                             $('.pnlSavePutAwayLocationQty').show();
//                             $('#pnlTotalPutAwayQtyLocList').show();
//                         }
//                         if(!isPalletFlow){
//                             gridTable = gridTable + '<div class="wms-srv-grid-cell">Quantity</div>';
//                         }else{
//                             gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
//                         }
//                         gridTable = gridTable + '</div>';
//                         // GRID HEADER
                    
//                         // GRID HEADER
//                         $('#putinloclist').html(gridTable);
//                     }

//                     //var srno=getGridData[i].srno;
//                     var srno= counter + i + 1;
//                     var getId = getGridData[i].ID;  
//                     lastLocationId = getId;
// 					var loccode = getGridData[i].Code;
//                     var availablebance=getGridData[i].Availablebalance;
				
//                     // GRID ROW
//                     gridTableRow = '';
//                     gridTableRow = gridTableRow + '<div class="wms-srv-grid-row">';
//                     gridTableRow = gridTableRow + '<div class="wms-srv-grid-cell">'+srno+'</div>';
//                     gridTableRow = gridTableRow + '<div class="wms-srv-grid-cell">'+loccode+'</div>';
//                     var getPutAwayQtyVal = '';
//                     var getPutAwayQtyIndex = '-1';
//                     if(!isPalletFlow){
//                         var findLocObj = getLocationObjectForPutAway(getId);
//                         var findLocQty = findLocObj['qty'];
//                         var getPutAwayQtyIndex = findLocObj['myindex'];
//                         if(findLocQty != '0'){
//                             getPutAwayQtyVal = findLocQty;
//                         }
//                         gridTableRow = gridTableRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtPutAwayQtyLocation_'+getId+'" value="'+ getPutAwayQtyVal +'" data-value="'+ getPutAwayQtyVal +'" data-index="'+ getPutAwayQtyIndex +'"  onchange="selectlocation('+orderID+','+getId+',\'' + loccode +'\', this);"  /></div>';
//                     }else{
//                         gridTableRow = gridTableRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " data-isadded="no" id="btnPutAwayQtyLocation_'+getId+'" title="Save" data-prefix="SV" type="button" onclick="selectlocation('+orderID+','+getId+',\'' + loccode +'\', this);"><i class="fas fa-check-circle"></i><span>Save</span></button></div></div>';
//                     }
//                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">'+availablebance+'</div>';
//                     /*
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">';
//                     gridTable = gridTable + '<div class="wms-srv-grid-action">';
//                     */
//                     // if(){

//                     // }else{
                        
//                     // }
//                     /*
//                     gridTable = gridTable + '<button class="wms-srv-input wms-srv-button " data-isadded="no" id="btnPutAwayQtyLocation_'+getId+'" title="Save" data-prefix="SV" type="button" onclick="selectlocation('+orderID+','+getId+',\'' + loccode +'\', this);"><i class="fas fa-check-circle"></i><span>Save</span></button>';
//                     gridTable = gridTable + '<button class="wms-srv-input wms-srv-button " data-isadded="no" id="btnRemovePutAwayQtyLocation_'+getId+'" title="Save" data-prefix="SV" type="button" onclick="removelocation('+orderID+','+getId+',\'' + loccode +'\', this);" style="display:none;"><i class="fas fa-times-circle"></i><span>Remove</span></button>';
//                     gridTable = gridTable + '</div>';
//                     gridTable = gridTable + '</div>';
//                     */
//                     gridTableRow = gridTableRow + '</div>';
//                     // GRID ROW

//                     $('#putinloclist').append(gridTableRow);
//                 }
//                 var scrollObj = '#wms-srv-location-popup .wms-srv-grid-scroller';
//                 var scrollContentObj = '#wms-srv-location-popup #putinloclist';
//                 attachScrollBottomEvent(scrollObj, scrollContentObj, function(){
//                     var lastArrNum = getGridData.length - 1;
//                     var newCounter = counter + (lastArrNum + 1);
//                     loadLocationList(lastLocationId, newCounter, orderID)
//                 });
//                 recalculateLocationPutAwayQty();
//             }
//             else
//             {
//                 alert('Unable to connect Server!!');
//             }
//         });
// }


// function OpenLocationPopup(orderID, totalPutInQty, orgLocationId, orgLocationQty, skuWiseGrnId, isSearch) 
// {
//     debugger;
//     if(!isSearch){
//         selectedPutAwayLocation = [];
//     }
   
//     globalOrgLocationId = orgLocationId;
//     globalOrgLocationQty = orgLocationQty.toFixed(2);
//     globalTotalPutAwayQty = totalPutInQty;
//     globalGrnId = skuWiseGrnId;
//     $('#spnSelectedPutAwayQtyCount').html('0');
//     $('#spnTotalPutAwayQtyLocList').html(globalTotalPutAwayQty);
//     var apiPath = wmsApiPath + 'PutIn/getlocationlist';
//     var getWarehouseID = $("#ddlwarehouse").val();  
//     var serchLocvalue='N/A'; 
//       $("#hdngetlocorderID").val(orderID);
//          if($("#txtputinlocfilter").val()=='')
//          {
//             $("#txtputinlocfilter").val('');   
//             serchLocvalue == 'N/A';
//          }
//          else
//          {
//             serchLocvalue=$("#txtputinlocfilter").val();
//          }    
//     var postData =
//     {				
//         warehouseID:getWarehouseIdInward,
//         skey:serchLocvalue,
//         tempputidetailid:orderID		
//     };

//     // BIND DATA GRID
//     var gridTable = '';

//     gridTable = gridTable + '<div class="wms-srv-grid-header">';
//     gridTable = gridTable + '<div class="wms-srv-grid-cell">Sr.No</div>';
//     gridTable = gridTable + '<div class="wms-srv-grid-cell">Location Code</div>';
//     if(!isPalletFlow){
//         gridTable = gridTable + '<div class="wms-srv-grid-cell">Quantity</div>';
//     }
//    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Availble Balance</div>';
//    // gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';

//     gridTable = gridTable + '</div>';
//     // GRID HEADER
   
//     // GRID HEADER
    

//     $('#putinloclist').html(gridTable);
   
//         callHttpUrl(apiPath, postData, function (data)
//         {
//             //alert(data);
//             var getStatus = data.Status;
//             var getStatusCode = data.StatusCode;
//             if (getStatusCode == 'Success')
// 				{
//                 var getResult = data.Result;
//                 var myGridList =getResult.Table;

//                 // var getGridData = myGridList.InboundResult[0].InboundList;
//                 var getGridData = myGridList;
//                 for (var i = 0; i < getGridData.length; i++)
//                 {
//                     var srno=getGridData[i].srno;
//                     var getId = getGridData[i].ID;                   
// 					var loccode = getGridData[i].Code;
//                     var availablebance=getGridData[i].Availablebalance;
				
//                     // GRID ROW
//                     gridTable = '';
//                     gridTable = gridTable + '<div class="wms-srv-grid-row">';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">'+srno+'</div>';
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">'+loccode+'</div>';
//                     var getPutAwayQtyVal = '';
//                     if(!isPalletFlow){
//                         var findLocObj = getLocationObjectForPutAway(getId);
//                         var findLocQty = findLocObj['qty'];
//                         if(findLocQty != '0'){
//                             getPutAwayQtyVal = findLocQty;
//                         }
//                         gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="" id="txtPutAwayQtyLocation_'+getId+'" value="'+ getPutAwayQtyVal +'"  onchange="selectlocation('+orderID+','+getId+',\'' + loccode +'\', this);"  /></div>';
//                     }
//                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">'+availablebance+'</div>';
//                     /*
//                     gridTable = gridTable + '<div class="wms-srv-grid-cell">';
//                     gridTable = gridTable + '<div class="wms-srv-grid-action">';
//                     */
//                     // if(){

//                     // }else{
                        
//                     // }
//                     /*
//                     gridTable = gridTable + '<button class="wms-srv-input wms-srv-button " data-isadded="no" id="btnPutAwayQtyLocation_'+getId+'" title="Save" data-prefix="SV" type="button" onclick="selectlocation('+orderID+','+getId+',\'' + loccode +'\', this);"><i class="fas fa-check-circle"></i><span>Save</span></button>';
//                     gridTable = gridTable + '<button class="wms-srv-input wms-srv-button " data-isadded="no" id="btnRemovePutAwayQtyLocation_'+getId+'" title="Save" data-prefix="SV" type="button" onclick="removelocation('+orderID+','+getId+',\'' + loccode +'\', this);" style="display:none;"><i class="fas fa-times-circle"></i><span>Remove</span></button>';
//                     gridTable = gridTable + '</div>';
//                     gridTable = gridTable + '</div>';
//                     */
//                     gridTable = gridTable + '</div>';
//                     // GRID ROW

//                     $('#putinloclist').append(gridTable);
//                 }
//                 recalculateLocationPutAwayQty();
//             }
//             else
//             {
//                 alert('Unable to connect Server!!');
//             }
//         });
//     $('#wms-srv-location-popup').show();
//     $('#wms-srv-location-popup-close').off();
//     $('#wms-srv-location-popup-close').click(function () 
//     {
//         if(!isPalletFlow){
//             closeAndRefresh();
//         }
//         else
//         {
//             $("#txtputinlocfilter").val('');
//             $('#wms-srv-location-popup').hide();
//         }
//     });
// }

var loadedLocationIds = new Set();

function loadLocationList(sequenceNo, counter, orderID) {
    debugger;
    var apiPath = wmsApiPath + 'PutIn/getlocationlist';
    var getWarehouseIdInward = mBrillWmsSession.getWarehouseId();
    var serchLocvalue = 'N/A';
    $("#hdngetlocorderID").val(orderID);

    if ($("#txtputinlocfilter").val() === '') {
        serchLocvalue = 'N/A';
    } else {
        serchLocvalue = $("#txtputinlocfilter").val();
    }

    var postData = {
        warehouseID: getWarehouseIdInward,
        skey: serchLocvalue,
        tempputidetailid: orderID,
        lastSeqno: sequenceNo
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;

        if (getStatusCode === 'Success') {
            var getResult = data.Result;
            var myGridList = getResult.Table;
            var getGridData = myGridList;
            var gridTableRow = '';
            var lastLocationId = '';

            if ($('#putinloclist .wms-srv-grid-header').length === 0) {
                var gridTable = '<div class="wms-srv-grid-header">';
                gridTable += '<div class="wms-srv-grid-cell">Sr.No</div>';
                gridTable += '<div class="wms-srv-grid-cell">Location Code</div>';

                if (data.Result.Table[0].IsPallet.toLowerCase().trim() === 'yes') {
                    isPalletFlow = true;
                    $('.pnlSavePutAwayLocationQty').hide();
                    $('#pnlTotalPutAwayQtyLocList').hide();
                } else {
                    isPalletFlow = false;
                    $('.pnlSavePutAwayLocationQty').show();
                    $('#pnlTotalPutAwayQtyLocList').show();
                }

                if (!isPalletFlow) {
                    gridTable += '<div class="wms-srv-grid-cell">Quantity</div>';
                } else {
                    gridTable += '<div class="wms-srv-grid-cell">Action</div>';
                }

                gridTable += '</div>';
                $('#putinloclist').html(gridTable);
            }

            for (var i = 0; i < getGridData.length; i++) {
                var getId = getGridData[i].ID;

                if (loadedLocationIds.has(getId)) {
                    continue;
                }

                loadedLocationIds.add(getId);

                var srno = counter + i + 1;
                var loccode = getGridData[i].Code;

                gridTableRow = '<div class="wms-srv-grid-row">';
                gridTableRow += '<div class="wms-srv-grid-cell">' + srno + '</div>';
                gridTableRow += '<div class="wms-srv-grid-cell">' + loccode + '</div>';

                if (!isPalletFlow) {
                    var findLocObj = getLocationObjectForPutAway(getId);
                    var findLocQty = findLocObj['qty'];
                    var getPutAwayQtyIndex = findLocObj['myindex'];
                    var getPutAwayQtyVal = findLocQty !== '0' ? findLocQty : '';

                    gridTableRow += '<div class="wms-srv-grid-cell"><input type="text" id="txtPutAwayQtyLocation_' + getId + '" value="' + getPutAwayQtyVal + '" data-value="' + getPutAwayQtyVal + '" data-index="' + getPutAwayQtyIndex + '" onchange="selectlocation(' + orderID + ',' + getId + ',\'' + loccode + '\', this);" /></div>';
                } else {
                    gridTableRow += '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button" data-isadded="no" id="btnPutAwayQtyLocation_' + getId + '" title="Save" data-prefix="SV" type="button" onclick="selectlocation(' + orderID + ',' + getId + ',\'' + loccode + '\', this);"><i class="fas fa-check-circle"></i><span>Save</span></button></div></div>';
                }

                gridTableRow += '</div>';
                $('#putinloclist').append(gridTableRow);

                lastLocationId = getId;
            }

            var scrollObj = '#wms-srv-location-popup .wms-srv-grid-scroller';
            var scrollContentObj = '#wms-srv-location-popup #putinloclist';

            attachScrollBottomEvent(scrollObj, scrollContentObj, function () {
                var lastArrNum = getGridData.length - 1;
                var newCounter = counter + (lastArrNum + 1);
                loadLocationList(lastLocationId, newCounter, orderID);
            });

            recalculateLocationPutAwayQty();
        } else {
            alert('Unable to connect to Server!!');
        }
    });
}

function closeAndRefresh(){
    if(globalCurrentPutAwayQty == 0 || (globalCurrentPutAwayQty == globalTotalPutAwayQty)){
        var strqcid= $('#hdnQCid').val();
        $("#txtputinlocfilter").val('');
        $('#wms-srv-location-popup').hide();
        viewPutAwayDetails(strqcid,"PutIn","UpdateLocation","Quality Check");
    }else{
        alert('The total location quantity should be ' + globalTotalPutAwayQty);
    }
}
function recalculateLocationPutAwayQty(){
    var totalQty = 0;
    
    for(var i=0; i < selectedPutAwayLocation.length; i++){
        totalQty = totalQty + Number(selectedPutAwayLocation[i]["qty"]);
    }
    $('#spnSelectedPutAwayQtyCount').html(totalQty);
    globalCurrentPutAwayQty = Number(totalQty);
}
function removeLocationPutAwayQty(locId){
    var k = 0;
    while(selectedPutAwayLocation[k]["id"] != locId || k < selectedPutAwayLocation.length){
        if(selectedPutAwayLocation[k]["id"] == locId){
            selectedPutAwayLocation.splice(k, 1);
        }
    }
    recalculateLocationPutAwayQty();
}
function getLocationObjectForPutAway(locId){
    var k = 0;
    var objLoc = {
        id:0,
        code:"",
        qty:0,
        myindex:-1
    };
    if(selectedPutAwayLocation.length > 0){
        //while(selectedPutAwayLocation[k]["id"] != locId || k < selectedPutAwayLocation.length){
        try{
            while(k < selectedPutAwayLocation.length || selectedPutAwayLocation[k]["id"] != locId){
            if(selectedPutAwayLocation[k]["id"] == locId){
                var foundId = selectedPutAwayLocation[k]["id"];
                var foundCode = selectedPutAwayLocation[k]["code"];
                var foundQty = selectedPutAwayLocation[k]["qty"];
                var foundIndex = selectedPutAwayLocation[k]["myindex"];
                objLoc = {
                    id:foundId,
                    code:foundCode,
                    qty:foundQty,
                    myindex:foundIndex
                };
            }
            k = k + 1;
            }
        }catch(ex){
            //alert(ex);
        }
    }
   
    return objLoc;
}
function selectlocation(ID, locID, locationcode, obj)
{ 
   debugger;
   // selectSingleLocation(ID, locID, locationcode, obj);

    if(isPalletFlow){
        //selectSingleLocation(ID, locID, locationcode, obj);
        updateLocationAndQtyOnServer(ID, locID, locationcode, globalTotalPutAwayQty,'');
    }else{
        selectMultipleLocation(ID, locID, locationcode, obj);
    } 
}
function updateLocationAndQtyOnServer(ID, locID, locationcode, putAwayLocQty,ErrorValid){
    debugger;
    var QcId = 0;
    $("#hdnputlocID").val(locID);
    $("#txtLocationcode").val(locationcode);    
    var apiPath = wmsApiPath + 'PutIn/updatelocatoin';    
   var strqcid= $('#hdnQCid').val();
    var postData =
    {		
		orderID:ID,
        locationID:locID,
        locationcode:locationcode,
        PutQty:putAwayLocQty,
        GRNID:globalGrnId,
        QCId:QcId,
        orgQty:globalOrgLocationQty,
        OrgLoctionId:globalOrgLocationId,
        ErrorValid:ErrorValid
    };
    callHttpUrl(apiPath, postData, function (result) 
    {
        debugger;
        // After success
        var getCode = result.StatusCode;
     
        if (getCode == "Success") 
        {
            if(isPalletFlow){
                $("#txtputinlocfilter").val('');
                $('#wms-srv-location-popup').hide();
                viewPutAwayDetails(strqcid,"PutIn","UpdateLocation","Quality Check");
            }
            
            //  viewgrnOrder(poID);
        }
        else 
        {
            alert('Failed to save document');
        }
        // After success
    });  
}


function selectMultipleLocation(ID,locID,locationcode,obj){
    debugger;
    var PutAwayQty = globalTotalPutAwayQty;
    var getPutAwayQty = $('#txtPutAwayQtyLocation_' + locID).val();
   // var isLocationSelected = $('#btnPutAwayQtyLocation_' + locID).attr('data-isadded');
    //if(isLocationSelected == 'no'){
        if(getPutAwayQty.trim() != '' && getPutAwayQty.trim() != '0'){            
            var predictQty = globalCurrentPutAwayQty + Number(getPutAwayQty);
            if(predictQty <= globalTotalPutAwayQty){
               /* $('#btnPutAwayQtyLocation_' + locID).attr('data-isadded', 'yes');
                $('#btnPutAwayQtyLocation_' + locID + ' i').attr('style', 'color:#45c100 !important');
                $('#txtPutAwayQtyLocation_' + locID).prop('disabled',true);
                $('#btnPutAwayQtyLocation_' + locID).hide();
                $('#btnRemovePutAwayQtyLocation_' + locID).show(); */
                var getMyCurrentIndex = $('#txtPutAwayQtyLocation_' + locID).attr('data-index');
                if(getMyCurrentIndex == '-1' || getMyCurrentIndex == -1){
                    var myArrIndex = selectedPutAwayLocation.length;
                    var objLoc = {
                        id:locID,
                        code:locationcode,
                        qty:getPutAwayQty,
                        myindex:myArrIndex
                    };
                    selectedPutAwayLocation.push(objLoc);
                    $('#txtPutAwayQtyLocation_' + locID).attr('data-index', myArrIndex);
                }else{
                    var myArrIndex = selectedPutAwayLocation.length;
                    var objLoc = {
                        id:locID,
                        code:locationcode,
                        qty:getPutAwayQty,
                        myindex:myArrIndex
                    };
                    selectedPutAwayLocation[getMyCurrentIndex] = objLoc;
                }                
                updateLocationAndQtyOnServer(ID, locID, locationcode, getPutAwayQty,'');
            }else{
                clearPutAwayQty(locID);
                alert('Total quantity should not be greater than '+ globalTotalPutAwayQty +'!!');
                updateLocationAndQtyOnServer(ID, locID, locationcode, getPutAwayQty,'Total quantity should not be greater than '+ globalTotalPutAwayQty +'!!');
            }
           
        }else{
            clearPutAwayQty(locID);
            alert('Please enter value for PutAway quantity!!');
        }
    /*}else{
        removeLocationPutAwayQty(locID);
        clearPutAwayQty(locID);
    } */
    reAssignIndex();
    recalculateLocationPutAwayQty();
}
function clearPutAwayQty(locID){
    debugger;
    var getMyIndex = $('#txtPutAwayQtyLocation_' + locID).attr('data-index');
    if(getMyIndex != Number(-1)){
        selectedPutAwayLocation.splice(getMyIndex, 1);
        $('#txtPutAwayQtyLocation_' + locID).attr('data-index', '-1');
    }
    $('#btnPutAwayQtyLocation_' + locID).attr('data-isadded', 'no');
    $('#btnPutAwayQtyLocation_' + locID + ' i').attr('style', 'color:#000000 !important');
    $('#txtPutAwayQtyLocation_' + locID).val('');
    $('#txtPutAwayQtyLocation_' + locID).prop('disabled',false);
}
function reAssignIndex(){
    for(var i=0; i<selectedPutAwayLocation.length; i++){
        selectedPutAwayLocation[i]["myindex"] = i;
        var locID = selectedPutAwayLocation[i]["id"];
        $('#txtPutAwayQtyLocation_' + locID).attr('data-index', i);
    }
}
// function selectlocation(ID,locID,locationcode)
// {
//     debugger;
//     $("#hdnputlocID").val(locID);
//     $("#txtLocationcode").val(locationcode);    
//     var apiPath = wmsApiPath + 'PutIn/updatelocatoin';    
//    var strqcid= $('#hdnQCid').val();
//     var postData =
//     {		
// 		orderID:ID,
//         locationID:locID,
//         locationcode:locationcode,
//         PutQty:1,
//         GRNID:1,
//         QCId:1	

//     };
//     callHttpUrl(apiPath, postData, function (result) 
//     {
        
//         // After success
//         var getCode = result.StatusCode;
     
//         if (getCode == "Success") 
//         {
//             $("#txtputinlocfilter").val('');
//             $('#wms-srv-location-popup').hide();            
//             viewPutAwayDetails(strqcid,"PutIn","UpdateLocation","Quality Check");
            
//             //  viewgrnOrder(poID);
//         }
//         else 
//         {
//             alert('Failed to save document');
//         }
//         // After success
//     });
    
    
// }

///////////////////////////////////////////////////////////////////////END Putway/////////////////////////////////////////////////////////////////////////////////