// COMMON OBJECT VARIABLE
/* var warehouse_id = '10520';
var customer_id = '10186';
var user_id = '10798';
var user_name = 'Abhijit K';
var serverPath = 'http://164.52.198.68/CustomServiceProject/WMS/'; */

var warehouse_id = '10509';
var customer_id = '10190';
var user_id = '10650';
var user_name = 'Abhijit K';
var serverDomain = 'http://w5production.westcoastwarehouse.com/';
var serverPath = serverDomain + 'CustomServiceProject/WMS/'; 
var currentSuggestionObject = null;

// BEGIN OF CLASS
class wmsDataObject{
	constructor(wmsDataHolder, wmsObject, wmsChildObject, wmsDetailObject, wmsDetailObjectId, orderNumber) {
		this.wmsDataHolder = wmsDataHolder;
		// Default values
		this.global_main_obj = wmsObject;
		this.global_main_obj_id = '';
		
		this.global_child_object = wmsChildObject;
		
		this.global_detail_object = wmsDetailObject;
		this.global_detail_object_id = wmsDetailObjectId;
		
		this.global_page_title = '';
		this.global_page_no = 0;
		this.global_last_page_no = 0;
		this.global_first_row_id = 0;
		this.global_last_row_id = 0;
		this.global_max_record_count = 10;
		this.global_search_key = '';
		this.global_search_type = '';
		this.global_search_column = '';
		this.global_is_header_required = 'yes';
		this.global_data_loading_status = '';
		this.global_insert_update_type = '';
		this.global_insert_update_record = '';
		this.global_can_upload_file = false;
		this.global_additional_header_control = '';
		this.global_action_on_data_row = '';
		this.global_on_data_function = null;
		this.global_can_bind_data_onresult = true;
	}
	loadData(fnLoadCallBack){
		this.o_bindWmsPageData("1", "", fnLoadCallBack);
	}
	assignAction(btnPrefix, btnHolder, fnCallBack){
		var currentObj = this;
		var btnHolderClass = '';
		if(btnHolder == 'head'){
			btnHolderClass = '.pnlWmsHead';
		}else if(btnHolder == 'detail'){
			btnHolderClass = '.pnlWmsDetail .wms-srv-grid';
		}else if(btnHolder == 'action-panel'){
			btnHolderClass = '.wms-srv-grid-action-panel';
		}else{
			btnHolderClass = '.' + btnHolder;
		}
		if(this.global_data_loading_status == 'done' || this.global_data_loading_status == 'error'){
			$('#'+ this.wmsDataHolder + ' ' + btnHolderClass + ' [data-prefix="' + btnPrefix + '"]').off();
			$('#'+ this.wmsDataHolder + ' ' + btnHolderClass + ' [data-prefix="' + btnPrefix + '"]').click(function(){
				var myObj = $(this);
				var myFunction = fnCallBack(myObj);
				return false;
			});
		}else{
			setTimeout(function(){currentObj.assignAction(btnPrefix, btnHolder, fnCallBack);}, 500);
		}
	}
	
	createNewDataObject(){
		var wmsPlaceHolder = this.wmsDataHolder;
		var wmsObject = this.global_main_obj;
		var wmsChildObject = this.global_child_object;		
		var wmsDetailObject = this.global_detail_object;
		var wmsDetailObjectId = this.global_detail_object_id;
		var orderNumber = "";
		
		let myNewDataObject = new wmsDataObject(wmsPlaceHolder, wmsObject, wmsChildObject, wmsDetailObject, wmsDetailObjectId, orderNumber);
		return myNewDataObject;
	}
	
	apiPath(isScanApi){
		var setApiPath = '';		
		if(isScanApi){
			setApiPath = serverPath + 'scan_barcode.ashx';
		}else if(this.global_main_obj == 'Inbound'){
			setApiPath = serverPath + 'get_obj_data.ashx';
		}else if(this.global_main_obj == 'Outbound'){
			/* if(this.global_child_object == 'SalesOrder' && this.global_detail_object == 'AN'){
				setApiPath = '../WMSCommonLibrary/static-test-data.ashx?fl=create-sales-order';
			}else{
				setApiPath = serverPath + 'WMSOutbound.ashx';
			}*/
			setApiPath = serverPath + 'WMSOutbound.ashx';
		}else if(this.global_main_obj == 'CapacityPlanning'){
			//setApiPath = serverPath + 'capacity_plan.ashx';
			// Overwrite Path... 
            //setApiPath = serverDomain + 'TransAppointmentProject/WMS/capacity_plan.ashx'; 
            setApiPath = serverDomain + 'AppointmentManagement/WMS/capacity_plan.ashx'; 
			// setApiPath = '../WMSCommonLibrary/get-static-data.ashx?fl=capacity-planner-list';
		}else if(this.global_main_obj == 'Appointment'){
			//setApiPath = serverPath + 'capacity_plan.ashx';
			// Overwrite Path... 
            //setApiPath = serverDomain + 'TransAppointmentProject/WMS/appointment_plan.ashx'; 
            setApiPath = serverDomain + 'AppointmentManagement/WMS/appointment_plan.ashx';
			// setApiPath = '../WMSCommonLibrary/get-static-data.ashx?fl=capacity-planner-list';
		}else{
			setApiPath = serverPath + 'get_obj_data.ashx';
		}
		//setApiPath = 'static-test-data.ashx?fl=receving-total';
		return setApiPath;
	}
	o_bindWmsPageData(pageno, action, fnLoadCallBack){
		this.global_data_loading_status = 'loading';
		this.global_page_no = pageno;
		var ActionOnDataRow = '';
        
		// if (localStorage.getItem("userDbId") != null) {
		//	customer_id = Number(localStorage.getItem("customerId"));
		//	warehouse_id = Number(localStorage.getItem("warehouseId"));
		//	user_id = Number(localStorage.getItem("userDbId"));
		//} 
        
        var hdnCustomerId = document.getElementById('hdnCustomerId');
        var hdnWarehouseId = document.getElementById('hdnWarehouseId');
        var hdnUserId = document.getElementById('hdnUserId');
        if (hdnCustomerId != null) {
            if (hdnCustomerId != "0" && hdnCustomerId != "") {
                customer_id = hdnCustomerId.value;
            }
        }
        if (hdnWarehouseId != null) {
            if (hdnWarehouseId != "0" && hdnWarehouseId != "") {
                warehouse_id = hdnWarehouseId.value;
            }
        } 
        if (hdnUserId != null) {
            if (hdnUserId != "0" && hdnUserId != "") {
                user_id = hdnUserId.value;
            }
        }
        

		if(action != ''){
			var customActionOnDataRow = this.global_action_on_data_row;
			if(customActionOnDataRow == ''){
				ActionOnDataRow = this.o_selectedCheckBoxVal(this.wmsDataHolder);
			}else{
				ActionOnDataRow = customActionOnDataRow;
			}
			
		}
		this.global_last_row_id = (pageno - 1) * this.global_max_record_count;
		var currentObj = this;
		var postData = {
				"Object":this.global_main_obj,
				"Childobject":this.global_child_object,
				"DetailObjectName":this.global_detail_object,
				"DetailObjectOrderId":this.global_detail_object_id,
				"CustomerId":customer_id,
				"WarehouseId":warehouse_id,
				"UserId":user_id,
				"Action":action,
				"ActionOnDataRow":ActionOnDataRow,
				"InsertUpdateType":this.global_insert_update_type,
				"InsertUpdateRecord":this.global_insert_update_record,				
				"SearchKey":this.global_search_key,
				"SearchType":this.global_search_type,
				"SearchColumn":this.global_search_column,
				"isHeaderRequired":this.global_is_header_required,
				"PageNo":pageno,
				"LastID":this.global_last_row_id,
				"MaxRowCount":this.global_max_record_count
			};
			var showInputPrams = $('#WmsDevShowInput').prop("checked");
			if(showInputPrams){
				alert(JSON.stringify(postData));
			}
		jQuery.ajax({
			type: "POST",
			url:this.apiPath(false),
			beforeSend: function (request) {
				// request.setRequestHeader("apikey", "************************");
                showWMSThemeLoading();
			},
			data: postData,
            success: function (data, textStatus, jQxhr) {
                hideWMSThemeLoading();
				var showOutputResult = $('#WmsDevShowOutput').prop("checked");
				if(showOutputResult){
					alert(data);
				}
				if(currentObj.global_can_bind_data_onresult){
					if(currentObj.wmsDataHolder.trim() != ''){
						$('#'+ currentObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid').html('');
					}
					var fileContent = data;
					var tLines = fileContent.split('\n');
					for (var tLine = 0; tLine < tLines.length; tLine++) {					
						currentObj.o_readLineAndSetup(tLines[tLine]);
					}
					if(currentObj.wmsDataHolder.trim() != ''){
						currentObj.o_setupSearchFilters();
						currentObj.o_bindControlEvent();
					}
					// Line moved....
					// currentObj.global_is_header_required = "no";
					//currentObj.global_data_loading_status = 'done';
					currentObj.o_onWmsObjectLoad();
					if(currentObj.global_detail_object == 'UPRF'){
						init();
					}else{
						currentObj.o_loadWmsLanguage();
					}
				}
				
				//Reset One Time Variables 
				currentObj.global_insert_update_type = '';
				currentObj.global_insert_update_record = '';
				currentObj.global_action_on_data_row = '';
				currentObj.global_can_bind_data_onresult = true;
				currentObj.global_data_loading_status = 'done';
				
				if(fnLoadCallBack != null){
					fnLoadCallBack(data);
				}
			},
            error: function (jqXhr, textStatus, errorThrown) {
                hideWMSThemeLoading();
				currentObj.global_data_loading_status = 'error';
				showWmsAlert('Error!!', 'Error to load data', 'error');
			}
		});
	}
	
	o_selectedCheckBoxVal(wmsDataHolder){
		var ActionOnDataRow = '';
		$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-row').each(function(){
			var getCheckBox = $(this).find('.wms-srv-grid-cell').eq("0").find('input[type="checkbox"]');
			var isCheckBoxChecked = $(getCheckBox).prop("checked");
			if(isCheckBoxChecked){
				if(ActionOnDataRow == ''){
					ActionOnDataRow = getCheckBox.val();
				}else{
					ActionOnDataRow += ',' + getCheckBox.val();
				}
			}			
		});
		//alert(ActionOnDataRow);
		return ActionOnDataRow;
	}
	
	o_scanWmsBarcode(barcode){
		this.global_data_loading_status = 'loading';
		if (localStorage.getItem("userDbId") != null) {
			customer_id = Number(localStorage.getItem("customerId"));
			warehouse_id = Number(localStorage.getItem("warehouseId"));
			user_id = Number(localStorage.getItem("userDbId"));
		}
		var currentObj = this;
		var postData = {
				"Object":this.global_main_obj,
				"Childobject":this.global_child_object,
				"DetailObject":this.global_detail_object,
				"DetailObjectOrderId":this.global_detail_object_id,
				"CustomerId":customer_id,
				"WarehouseId":warehouse_id,
				"UserId":user_id,
				"Barcode":barcode
			};
			//alert(JSON.stringify(postData));
		var getObjectMain = this.global_main_obj;
		var getChildObject = this.global_detail_object;
		
		var showInputPrams = $('#WmsDevShowInput').prop("checked");
		if(showInputPrams){
			alert(JSON.stringify(postData));
		}
		
		jQuery.ajax({
			type: "POST",
			url:this.apiPath(true),
			beforeSend: function (request) {
				// request.setRequestHeader("apikey", "************************");
			},
			data: postData,
			success: function (data, textStatus, jQxhr) {
				var showOutputResult = $('#WmsDevShowOutput').prop("checked");
				if(showOutputResult){
					alert(data);
				}
				var fileContent = data;
				var tLines = fileContent.split('\n');
				var scanResultArr = {};
				for (var tLine = 0; tLine < tLines.length; tLine++) {					
					var getScanData = currentObj.o_readBarcodeResultLine(tLines[tLine]);
					var breakScanData = getScanData.split(':');
					scanResultArr[breakScanData[0]] = breakScanData[1];
				}
				currentObj.global_data_loading_status = 'done';
				if(scanResultArr["status"] == 'success'){
					if(scanResultArr["scanType"] == 'SKU'){
						$('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('sku', scanResultArr["barcode"]);
						$('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('skuid', scanResultArr["barcodeObjId"]);
					}else if(scanResultArr["scanType"] == 'Pallet'){
						$('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('pallet', scanResultArr["barcode"]);
						$('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('palletid', scanResultArr["barcodeObjId"]);
					}else if(scanResultArr["scanType"] == 'Location'){
						$('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('location', scanResultArr["barcode"]);
						$('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('locationid', scanResultArr["barcodeObjId"]);
					}
					currentObj.o_processBarcodeScanLabel(scanResultArr["scanType"], scanResultArr["barcode"], scanResultArr["barcodeObjId"]);
				}else{
					if(scanResultArr["reason"].trim() != ''){
						showWmsAlert('Error!!', scanResultArr["reason"], 'error');
						//alert(scanResultArr["reason"]);
					}else{
						showWmsAlert('Error!!', 'Failed to scan barcode.', 'error');
						//alert('Failed to scan barcode.');
					}
				}
				
				// Show last scanned...
				var getLastPallet = $('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('pallet').trim();
				var getLastSku = $('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('sku').trim();
				var getLastLocation = $('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('location').trim();
				var strSurrentScanned = '';
				if(getLastPallet != ''){
					strSurrentScanned += '<span>Pallet: ' + getLastPallet + '</span>';
				}
				if(getLastSku != ''){
					if(strSurrentScanned != ''){
						strSurrentScanned += ' | ';
					}
					strSurrentScanned += '<span>SKU: ' + getLastSku + '</span>';
				}
				if(getLastLocation != ''){
					if(strSurrentScanned != ''){
						strSurrentScanned += ' | ';
					}
					strSurrentScanned += '<span>Location: ' + getLastLocation + '</span>';
				}
				// Show last scanned...
				$('.WMSLastScanned').html('<span><b>Recent Scanned: </b></span> ' + strSurrentScanned);
				$('.WMSLastScanned').show();
				// currentObj.o_onWmsObjectLoad();
			},
			error: function (jqXhr, textStatus, errorThrown) {
				currentObj.global_data_loading_status = 'error';
				showWmsAlert('Error!!', 'Error to load data', 'error');
				//alert('Error to load data');
			}
		});
	}
	
	o_findDetailHeaderIndex(headerLabel){
		var myIndex = -1;
		$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-header .wms-srv-grid-cell').each(function(){
			var getMyText = $(this).text().trim();
			var filterHeaderLabel = headerLabel.toLowerCase();
			var filterMyText = getMyText.toLowerCase();
			//if(headerLabel == getMyText){
			if(filterHeaderLabel == filterMyText){
				myIndex = $(this).index();
			}
		});
		return myIndex;
	}
	
	o_processBarcodeScanLabel(scanType, scanLabel, scanId){
		var currentObj = this;
		var mainObj = currentObj.global_main_obj;
		var childObj = currentObj.global_child_object;
		var detailObj = currentObj.global_detail_object;
		var sKey = currentObj.global_search_key;
		
		if(mainObj == 'CycleCount' && detailObj == 'CyclePlanUpdate' && sKey == 'Pending'){
			ProcessCycleCountBarcode(scanType, scanLabel, scanId, currentObj);
		}else if(mainObj == 'Inbound' && childObj == 'Receiving' && detailObj == 'PO' && sKey == 'Pending'){
			ProcessReceivingBarcode(scanType, scanLabel, scanId, currentObj);
		}else if(mainObj == 'Inbound' && childObj == 'Put Away' && detailObj == 'PO' && sKey == 'Pending'){
			ProcessPutAwayBarcode(scanType, scanLabel, scanId, currentObj);
		}
	}
	
	o_processBarcodeScanLabel_Old(scanType, scanLabel, scanId){
		var currentObj = this;
		if(scanType == 'SKU'){
			var indexOfSKU = this.o_findDetailHeaderIndex('Sku Code');
			var indexOfPallet = this.o_findDetailHeaderIndex('Pallet');
			var indexOfReceiveQty = this.o_findDetailHeaderIndex('Receive Qty');
			var indexOfPendingQty = this.o_findDetailHeaderIndex('Pending Qty');
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-row').each(function(){
				var mySkuCode = $(this).find('.wms-srv-grid-cell').eq(indexOfSKU).text().trim();
				if(scanLabel == mySkuCode){
					var myPalletCode = $(this).find('.wms-srv-grid-cell').eq(indexOfPallet).find('input').val().trim();
					var myReceivedQty = $(this).find('.wms-srv-grid-cell').eq(indexOfReceiveQty).find('input').val().trim();
					var myPendingQty = $(this).find('.wms-srv-grid-cell').eq(indexOfPendingQty).text().trim();
					
					if(myPalletCode == ''){
						var getCurrentPalletCode = $('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('pallet');
						if(getCurrentPalletCode != ''){
							$(this).find('.wms-srv-grid-cell').eq(indexOfPallet).find('input').val(getCurrentPalletCode);
							if(Number(myReceivedQty) < Number(myPendingQty)){
								var updatedQty = Number(myReceivedQty) + 1;
								$(this).find('.wms-srv-grid-cell').eq(indexOfReceiveQty).find('input').val(updatedQty);
							}else{
								showWmsAlert('Warning!!', 'You have reached to maximum quanity.', 'warning');
								//alert('You have reached to maximum quanity.');
							}
						}else{
							showWmsAlert('Warning!!', 'Please scan pallet code first!!', 'warning');
							//alert('Please scan pallet code first!!');
						}
					}else{
						var getCurrentPalletCode = $('#'+ currentObj.wmsDataHolder +' .wms-srv-barcodescan').data('pallet');
						if(myPalletCode == getCurrentPalletCode){
							if(Number(myReceivedQty) < Number(myPendingQty)){
								var updatedQty = Number(myReceivedQty) + 1;
								$(this).find('.wms-srv-grid-cell').eq(indexOfReceiveQty).find('input').val(updatedQty);
							}else{
								showWmsAlert('Warning!!', 'You have reached to maximum quanity.', 'warning');
								//alert('You have reached to maximum quanity.');
							}
						}
					}
				}
			});
			//alert(indexOfRow);
		}else if(scanType == 'Pallet'){
			// Do nothing here... 
		}
		// Reset scanning field
		$('.wms-srv-barcodescan .wms-srv-scan-input').val('');
	}
	
	o_readBarcodeResultLine(textLine){
		var returnScanData = '';
		if (textLine.trim() != "") {
			var getFirstTwoLetter = textLine.trim().substring(0,2);
			if(getFirstTwoLetter != '//'){
				var getStartChar = textLine.indexOf('$');
				var getEndChar = textLine.indexOf('@');
				var getObjType = textLine.substring((getStartChar + 1), getEndChar);
				if(getObjType != ''){
					var dataLine = textLine.replace('$' + getObjType + '@', '');
					returnScanData = getObjType + ':' + dataLine.replace('\r','');
				}
			}
		}
		return returnScanData;
	}
	
	o_isSuggestionObject(){
		var myDetailObject = this.global_detail_object;
        if (myDetailObject == 'SESKU' || myDetailObject == 'SKU' || myDetailObject == 'RT' || myDetailObject == 'VE' || myDetailObject == 'UM' || myDetailObject == 'LT' || myDetailObject == 'CAR' || myDetailObject == 'PAL' || myDetailObject == 'LOC' || myDetailObject == 'CRORD'){
			return true;
		}else{
			return false;
		}		
	}
	
	o_onWmsObjectLoad(){
		var currentObj = this;
		$( function() {
			$( ".wms-srv-datepicker" ).datepicker({ dateFormat: 'dd-MM-yy' });
		});
/*
		$('.wms-srv-suggestion').off();
		$('.wms-srv-suggestion').keyup(function(){
			currentSuggestionObject = this;
			$('.wms-srv-suggestion-list').html('');
			var myDataPrefix = $(this).data('prefix');
			var mySearchVal = $(this).val();
			let mySuggestionList = new SuggestionList("pnlSuggestionList", currentSuggestionObject.global_main_obj, currentSuggestionObject.global_child_object, myDataPrefix, '', '', mySearchVal);
		});
		
		$('.wms-srv-suggestion-options').off();
		$('.wms-srv-suggestion-options').click(function(){
			var getMyOptId = $(this).data('id');
			var getMyOptLabel = $(this).data('label');
			$(currentSuggestionObject).data('id', getMyOptId);
			$(currentSuggestionObject).val(getMyOptLabel);
			$('.wms-srv-suggestion-list').remove();
		});
		*/
		// Put Away Code... 
		var get_childObject = this.global_child_object;
		var get_detailObject = this.global_detail_object;
		var get_globalSearchKey =  this.global_search_key;
		// alert(get_detailObject + ":" + get_globalSearchKey);
		if(get_detailObject == 'PO' && get_globalSearchKey == 'Pending'){
			$('.pnlWmsDetail .wms-srv-grid-row .wms-srv-grid-cell .wms-srv-grid-action [data-prefix="SV"]').off();
			$('.pnlWmsDetail .wms-srv-grid-row .wms-srv-grid-cell .wms-srv-grid-action [data-prefix="SV"]').click(function(){
				var getSavedRecord = '';
				var strComma = '';
				var getMyParent = $(this).parent().parent().parent();
				var getMyHeader = $(this).parent().parent().parent().parent().find('.wms-srv-grid-header');
				$(getMyParent).find('.wms-srv-grid-cell').each(function(){
					var myIndex = $(this).index();
					var myHeaderLabel = $(getMyHeader).find('.wms-srv-grid-cell').eq(myIndex).text();
					if(myHeaderLabel == '' && myIndex == 0){
						myHeaderLabel = 'Id';
					}
					//alert(myIndex + '...')
					if(getSavedRecord != ''){
						strComma = ',';
					}
					var getCellHtml = $(this).html();
					if(myHeaderLabel != 'Action'){
						if(getCellHtml.indexOf('input') > -1){
							getSavedRecord += strComma + myHeaderLabel + '|' + $(this).find('input').val();
						}else if(getCellHtml.indexOf('select') > -1){
							getSavedRecord += strComma + myHeaderLabel + '|' + $(this).find('select').val();
						}else{
							getSavedRecord += strComma + myHeaderLabel + '|' + $(this).text();
						}
					}
				});
				getSavedRecord += ',ExtraQty|Not Allowed,ExtraSku|Not Allowed';
				//alert(getSavedRecord);
				currentObj.global_insert_update_type = 'New';
				currentObj.global_insert_update_record = getSavedRecord;
				currentObj.o_bindWmsPageData(currentObj.global_page_no,"SV", function(data){
						var myObj = currentObj.o_dataToObject(data);
						var getStatus = myObj["status"];
						//var getReceiptNo = myObj["receiptNo"];
						var getMessage = myObj["message"];
						
						currentObj.global_insert_update_type = '';
						currentObj.global_insert_update_record = '';
						if(getStatus == 'success'){
							$('.wms-srv-dashboard-panel .wms-srv-count-content').each(function(){
								var checkPendingLabel = $(this).find('.wms-srv-count-label').text();
								if(checkPendingLabel == 'Pending'){
									var checkPendingCount = $(this).find('.wms-srv-count').text();
									if(checkPendingCount == "0"){
										$('.pnlWmsDetail .wms-srv-grid-action-panel [data-prefix="FSV"]').click();
									}
								}
							});
						}else{
							//RECALL PAGE CONTENT ON FAIL ... 							
							currentObj.o_bindWmsPageData(currentObj.global_page_no,"", function(data){
								if(getStatus != 'success'){
									showWmsAlert('Failed!!', getMessage, 'error');
									//alert(getMessage);
								}
							});
							//RECALL PAGE CONTENT ON FAIL ... 
						}
						
				});
				return false;
			});
			$('.pnlWmsDetail .wms-srv-grid-action-panel [data-prefix="FSV"]').off();
			$('.pnlWmsDetail .wms-srv-grid-action-panel [data-prefix="FSV"]').click(function(){
				currentObj.global_insert_update_type = 'New';
				currentObj.global_insert_update_record = 'FSV';
				//alert('Calling Final Save...');
				currentObj.o_bindWmsPageData(currentObj.global_page_no,"FSV", function(data){
					var myObj = currentObj.o_dataToObject(data);
						var getStatus = myObj["status"];
						var getReceiptNo = myObj["receiptNo"];
						var getMessage = myObj["message"];
						
						//RECALL PAGE CONTENT... 
						currentObj.global_insert_update_type = '';
						currentObj.global_insert_update_record = '';
						
						if(getStatus == 'success'){	
							currentObj.global_child_object = 'PurchaseOrder';	
							currentObj.global_detail_object = '';
							currentObj.global_detail_object_id = '';	
							window.location.href = 'inbound.aspx';							
						}else{
							/* currentObj.o_bindWmsPageData(currentObj.global_page_no,"", function(data){
								if(getStatus != 'success'){
									showWmsAlert('Failed!!', getMessage, 'error');
								}
							}); */
							showWmsAlert('Failed!!', getMessage, 'error');
						}
						//RECALL PAGE CONTENT...
				});
				return false;
			});
		}else if(get_childObject == 'Receiving' && get_detailObject == 'PO' && get_globalSearchKey == 'Done'){
			alignReceivingGridTable(currentObj);
		}else if(get_detailObject == 'CyclePlanUpdate' && get_globalSearchKey == 'Pending'){
			bindCycleCountPendingActions(currentObj);
		}
		
		if(get_childObject == 'Receiving' || get_childObject == 'Put Away'){
			$('.pnlWmsDetail .wms-srv-grid-pager').hide();
		}
	}
	
	o_loadWmsLanguage(){
		if (localStorage.getItem("langDictionary") != null) {
			var breakLangArr = localStorage.getItem("langDictionary").split(',');
			for(var i=0; i<breakLangArr.length; i++){
				var langWord = breakLangArr[i].split(':');
				// TEMP COMMENTED...
				//this.o_replaceLangWord(langWord[0], langWord[1]);
			}
		}
	}
	
	o_replaceLangWord(oldWord, newWord){
		$('div :not(:has(*))').each(function() {
			var divText = $(this).text();
			 $(this).text(divText.replace(oldWord, newWord)); 
		});
	}
	
	o_uploadWmsAttachment() {
		var file = document.getElementById('wms-srv-ctrl-file-upload').files[0];
		//alert(file.name);
		var frmFile = new FormData();
		frmFile.append(file.name, file);
		// showWMSThemeLoading();
		$.ajax({
			url: serverPath + 'fileupload.ashx',
			type: "POST",
			contentType: false,
			processData: false,
			data: frmFile,
			success: function (result) {
				if(result != 'failed'){
					var getFileList = $('#wms-srv-ctrl-file-upload').data('srvpath');
					var appendFileList = '';
					var fileCount = '';
					var fileListHtml = '';
					if(getFileList.trim() != ''){
						appendFileList = getFileList + '|' + result;
						var breakFileList = appendFileList.split('|');
						fileCount = breakFileList.length;
						for(var i=0; i < fileCount; i++){
							fileListHtml += '<div class="wms-srv-filename">'+breakFileList[i]+' <i class="fas fa-times-circle"></i></div>';
						}
					}else{
						appendFileList = result;
						fileCount = '1';
						fileListHtml += '<div class="wms-srv-filename">'+appendFileList+' <i class="fas fa-times-circle"></i></div>';
					}
					$('#wms-srv-attachment-files').html(fileListHtml);
					$('#wms-srv-ctrl-file-upload').data('srvpath', appendFileList);
					$('.wms-srv-file-upload-holder .wms-srv-badge').html(fileCount);
					$('.wms-srv-file-upload-holder .wms-srv-badge').show();
				}else{
					$('#wms-srv-ctrl-file-upload').data('srvpath', '');
				}
				//alert(result);
				// hideWMSThemeLoading();
			},
			error: function (err) {
				showWmsAlert('Error!!', err.statusText, 'error');
				//alert(err.statusText);
			}
		});
	}
	
	/* o_readLineAndSetup(textLine){
		if (textLine.trim() != "") {
			var getFirstTwoLetter = textLine.trim().substring(0,2);
			if(getFirstTwoLetter != '//'){
				var getStartChar = textLine.indexOf('$');
				var getEndChar = textLine.indexOf('@');
				var getObjType = textLine.substring((getStartChar + 1), getEndChar);
				if(getObjType != ''){
					var dataLine = textLine.replace('$' + getObjType + '@', '');
					if(this.global_detail_object == 'UPRF'){
						this.o_setupUserPreference(getObjType, dataLine);
					}else if(this.o_isSuggestionObject()){
						this.o_displaySuggestionList(getObjType, dataLine);
					}else{
						this.o_setupWmsObjControl(getObjType, dataLine);
					}
				}
			}
		}
	} */
	
	o_readLineAndSetup(textLine){
		var getObjType = this.o_getTagName(textLine);
		if(getObjType != ''){
			var dataLine = textLine.replace('$' + getObjType + '@', '');
			if(this.global_detail_object == 'UPRF'){
				this.o_setupUserPreference(getObjType, dataLine);
			}else if(this.o_isSuggestionObject()){
				this.o_displaySuggestionList(getObjType, dataLine);
			}else{
				this.o_setupWmsObjControl(getObjType, dataLine);
			}
		}
	}
	
	o_getTagName(textLine){
		var tagName = '';
			if (textLine.trim() != "") {
				var getFirstTwoLetter = textLine.trim().substring(0,2);
				if(getFirstTwoLetter != '//'){
					var getStartChar = textLine.indexOf('$');
					var getEndChar = textLine.indexOf('@');
					var tagName = textLine.substring((getStartChar + 1), getEndChar);
				}
			}
		return tagName;
	}
	
	o_dataToObject(data){
		var myDataObject = {};
		if((data != null) && (data != '')){
			var tLines = data.split('\n');
			for (var tLine = 0; tLine < tLines.length; tLine++) {					
				var textLine = tLines[tLine];
				if (textLine.trim() != "") {
					var getFirstTwoLetter = textLine.trim().substring(0,2);
					if(getFirstTwoLetter != '//'){
						var getStartChar = textLine.indexOf('$');
						var getEndChar = textLine.indexOf('@');
						var getObjType = textLine.substring((getStartChar + 1), getEndChar);
						if(getObjType != ''){
							var dataLine = textLine.replace('$' + getObjType + '@', '').replace('\r', '');
							myDataObject[getObjType] = dataLine;
						}
					}
				}
			}
		}
		return myDataObject
	}
	
	o_loadUserPreference(){		
		this.o_setupWMSCustomerDDList();
		this.o_setupWMSWarehouseDDList();
		// this.o_loadWmsLanguage();
	}
	
	o_displaySuggestionList(getObjType, dataLine){
		if(getObjType == 'row'){
			var hasSuggestionListPanel = $(document).has('.wms-srv-suggestion-list');
			if(hasSuggestionListPanel.length <= 0){
				$('body').append('<div class="wms-srv-suggestion-list"></div>');
			}
			var reformatDataLine = reformatLine(dataLine);
			var breakDataLine = reformatDataLine.split(',');
			var dataArrCtrl = {};
			var dataArrVal = {};
			for(var i = 0; i < breakDataLine.length; i++){
				var splitDataWords = breakDataLine[i].split('|');
				dataArrCtrl[i] = splitDataWords[0];
				dataArrVal[i] = splitDataWords[1];
			}
			
			$('.wms-srv-suggestion-list').append('<div class="wms-srv-suggestion-options" data-id="'+ dataArrVal[0] +'" data-label="'+ dataArrVal[1] +'" data-info="'+ reformatDataLine +'">'+ dataArrVal[1] +'</div>');
		}
	}
	
	o_setupUserPreference(getObjType, dataLine){
		localStorage.setItem(getObjType, dataLine);
		// Clear all local Storage
		// localStorage.clear();
	}
	
	o_setupWMSWarehouseDDList(){
		if (localStorage.getItem("warehouselist") != null) {
			var getWarehouseList = localStorage.getItem("warehouselist");
			var getWarehouseSelectedId = localStorage.getItem("warehouseId");
			var ddHtml = '<div class="wms-srv-icon-input wms-srv-warehouse-input">';
			ddHtml += '<i class="fas fa-warehouse"></i>';
			ddHtml += '<select class="wms-srv-input">';
			ddHtml += '<option value="">--Select Warehouse--</option>';
			// Generate DropDown Options
			var breakOptions = getWarehouseList.split('|');
			for(var i = 0; i < breakOptions.length; i++){
				var breakOptionVal = breakOptions[i].split(':');
				var isSelected = '';
				if(getWarehouseSelectedId == breakOptionVal[0]){
					isSelected = 'selected="selected"';
				}
				ddHtml += '<option value="'+ breakOptionVal[0] +'" '+ isSelected +'>'+ breakOptionVal[1] +'</option>';
			}
			// Generate DropDown Options
			ddHtml += '</select>';
			ddHtml += '</div>';
			$( ".wms-srv-warehouse-input" ).remove();
			$( ".themeWMSTopHeaderIconNav" ).prepend(ddHtml);
			
			// Assign onChange event to dropdown...
			$('.wms-srv-warehouse-input select').change(function(){
				var myVal = $(this).val();
				localStorage.setItem("warehouseId", myVal);
				init();
			});
		}
	}
	
	o_setupWMSCustomerDDList(){
		if (localStorage.getItem("customerList") != null) {
			var getCustomerList = localStorage.getItem("customerList");
			var getCustomerSelectedId = localStorage.getItem("customerId");
			var ddHtml = '<div class="wms-srv-icon-input wms-srv-customer-input">';
			ddHtml += '<i class="fas fa-user"></i>';
			ddHtml += '<select class="wms-srv-input">';
			ddHtml += '<option>--Select Customer --</option>';
			// Generate DropDown Options
			var breakOptions = getCustomerList.split('|');
			for(var i = 0; i < breakOptions.length; i++){
				var breakOptionVal = breakOptions[i].split(':');
				var isSelected = '';
				if(getCustomerSelectedId == breakOptionVal[0]){
					isSelected = 'selected="selected"';
				}
				ddHtml += '<option value="'+ breakOptionVal[0] +'" '+ isSelected +'>'+ breakOptionVal[1] +'</option>';
			}
			// Generate DropDown Options
			ddHtml += '</select>';
			ddHtml += '</div>';
			$( ".wms-srv-customer-input" ).remove();
			$( ".themeWMSTopHeaderIconNav" ).prepend(ddHtml);
			
			// Assign onChange event to dropdown...
			$('.wms-srv-customer-input select').change(function(){
				var myVal = $(this).val();
				localStorage.setItem("customerId", myVal);
				init();
			});
		}
	}
	
	o_setupWmsObjControl(getObjType, dataLine){
		//alert(dataLine);
		switch(getObjType) {
		case 'object':
			if(this.global_is_header_required == 'yes'){
				this.o_setupMainObject(dataLine);
			}
		break;
		case 'childObject':
			if(this.global_is_header_required == 'yes'){
				this.o_setupChildObjectSelector(dataLine);
			}
		break;
		case 'dataTitle':
			if(this.global_is_header_required == 'yes'){
				this.o_setupTitle(dataLine);
			}
		break;
		case 'dashboard':
			this.o_setupDashboard(dataLine);
		break;
		case 'detailObjHead':
			if(this.global_is_header_required == 'yes'){
				this.o_setupObjectHead(dataLine);
			}
		break;
		case 'headerAction':
			if(this.global_is_header_required == 'yes'){
				this.o_setupHeaderAction(dataLine);
			}
		break;
		case 'header':
			//if(this.global_is_header_required == 'yes'){
				this.o_setupGridHeader(dataLine);
			//}
		break;
		case 'dataIdRange':
			this.o_setupDataRange(dataLine);
		break;
		case 'row':
			if(this.global_detail_object == 'CMM'){
				this.o_setupCommunicationRow(dataLine);
			}else{
				this.o_setupGridRow(dataLine);
			}
			
		break;
		case 'rowChild':
			this.o_setupGridRowChild(dataLine);			
		break;
		case 'frm':
			this.o_setupFormRow(dataLine);			
		break;		
		case 'frmGrid':
			this.o_setupFormGrid(dataLine);			
		break;
		default:
			// code block
		}
	}
	
	o_setupMainObject(dataLine){
		var mainObjData = dataLine.split(':');
		this.global_main_obj = mainObjData[0];
		this.global_main_obj_id = mainObjData[1];
	}
	
	o_setupChildObjectSelector(dataLine){
		var selOption = '<div class="wms-srv-fieldset">';
		selOption += '<div class="wms-srv-fieldset-title">'+ this.global_main_obj +' Order Type</div>';
		selOption += '<select>';
		var breakData = dataLine.split(',');
		for(var i=0; i< breakData.length; i++){
			var breakChildData = breakData[i].split(':');
			var isOptionSelected = '';
			if(breakChildData[0] == this.global_child_object){
				isOptionSelected = 'selected="selected"';
			}
			selOption += '<option value="'+ breakChildData[1] +'" '+ isOptionSelected +'>'+ breakChildData[0] +'</option>';
		}
		selOption += '</select>';
		selOption += '</div>';
		$('#'+ this.wmsDataHolder +' .wms-srv-child-obj').html(selOption);
	}
	
	o_setupTitle(dataLine){
		this.global_page_title = dataLine;
		$('#'+ this.wmsDataHolder +' .wms-srv-data-title').html(this.global_page_title);
	}
	
	o_setupDashboard(dataLine){
		var dashCntStr = '';
		var breakData = dataLine.split(']');
		var dashboardLength = breakData.length - 1;
		var maxBoxLength = 4;
		var isTotalBox = false;
		var isPendingBox = false;		
		if(maxBoxLength > dashboardLength){
			maxBoxLength = dashboardLength;
		}
		var btstrpCssNum = Math.round(12 / maxBoxLength);
		dashCntStr += '<div class="container-fluid wms-srv-dashboard-panel">';
		dashCntStr += '<div class="row">';
		for(var i=0; i < dashboardLength; i++){
			var breakChildData = breakData[i].split('[');
			var boxLabel = breakChildData[0].replace(',' , '').replace(':','');
			var breakValues = breakChildData[1].split(',');
			var boxCount = breakValues[0];
			var boxIcon = breakValues[1];
			var boxBackground = breakValues[2];
			dashCntStr += '<div class="col-md-'+ btstrpCssNum +' nopadding">';
			dashCntStr += '<div class="wms-srv-count-box-holder">';
			dashCntStr += '<div class="wms-srv-count-box">';
			// Icon and Background Color
			dashCntStr += '<div class="wms-srv-count-icon" style="background-color:'+ boxBackground +';"><i class="'+ boxIcon +'"></i></div>';
			dashCntStr += '<div class="wms-srv-count-content">';
			dashCntStr += '<div class="wms-srv-count">'+ boxCount +'</div>';
			dashCntStr += '<div class="wms-srv-count-label">'+ boxLabel +'</div>';
			dashCntStr += '</div>';
			dashCntStr += '</div>';
			dashCntStr += '</div>';
			dashCntStr += '</div>';
			
			if(boxLabel.trim() == 'Total'){
				isTotalBox = true;
			}else if(boxLabel.trim() == 'Pending'){
				isPendingBox = true;
			}
		}
		dashCntStr += '</div>';
		dashCntStr += '</div>';
		$('#'+ this.wmsDataHolder +' .wms-srv-counter-dashboard').html(dashCntStr);
		$('.wms-srv-dashboard-panel .wms-srv-count-box-holder').off();
		var getWmsDataObj = this;
		// alert(isTotalBox +" : "+ isPendingBox);
		$('.wms-srv-dashboard-panel .wms-srv-count-box-holder').click(function(){
			var myLabel = $(this).find('.wms-srv-count-label').text().trim();
			if(isTotalBox && isPendingBox){
				if(myLabel != 'Total' && myLabel != 'Pending'){
					myLabel = 'Done';
				}
				getWmsDataObj.global_search_type = '';
				getWmsDataObj.global_search_column = '';
				getWmsDataObj.global_is_header_required = 'yes';
			}else{
				getWmsDataObj.global_search_type = 'ByColumn';
				getWmsDataObj.global_search_column = 'Status';
				getWmsDataObj.global_is_header_required = 'no';	
			}
			getWmsDataObj.global_search_key = myLabel;
			getWmsDataObj.loadData(function(){
				
			});
		});
	}
	
	o_setupObjectHead(dataLine){
		var filterLine = reformatLine(dataLine);
		var strHeaderCell = '<div class="wms-srv-grid-header">';
		var strCell = '<div class="wms-srv-grid-row">';
		var objHead = filterLine.split(',');
		for(var i=0; i < objHead.length; i++){
			var breakData = objHead[i].split('|');
			strHeaderCell += '<div class="wms-srv-grid-cell">'+ breakData[1] +'</div>';
			//strCell += '<div class="wms-srv-grid-cell">'+ breakData[2] +'</div>';
			strCell += '<div class="wms-srv-grid-cell">'+ renderGridValue(breakData[0].trim(), breakData[2]) +'</div>';
		}
		strHeaderCell += '</div>';
		strCell += '</div>';
		var finalObjHead = strHeaderCell + strCell;
		$('#'+ this.wmsDataHolder +' .pnlWmsHead .wms-srv-grid').append(finalObjHead);
		$('#'+ this.wmsDataHolder +' .pnlWmsHead').show();
	}
	
	o_setupHeaderAction(dataLine){
		var filterLine = reformatLine(dataLine);
		var ctrlObj = filterLine.split(',');
		var strCell = '';
		for(var i=0; i < ctrlObj.length; i++){
			
			strCell += renderControl(ctrlObj[i].trim()) + ' ';
		}
		var getAdditionalHeaderControl = this.global_additional_header_control;
		if(getAdditionalHeaderControl.trim() != ''){
			if(getAdditionalHeaderControl.indexOf(',') > -1){
				var breakAdditionalCtrl = getAdditionalHeaderControl.split(',');
				for(var k=0; k < breakAdditionalCtrl.length; k++){
					strCell += renderControl(breakAdditionalCtrl[k].trim()) + ' ';
				}
			}else{
				strCell += renderControl(getAdditionalHeaderControl.trim()) + ' ';
			}
		}
		 strCell += '<div class="wms-srv-grid-title">'+ this.global_page_title +'</div>';
		$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-action-panel').html(strCell);
	}

	o_setupGridHeader(dataLine, placeHolderId){
		var filterLine = reformatLine(dataLine);
		var strHeaderCell = '<div class="wms-srv-grid-header">';
		
		var headerObj = filterLine.split(',');
		for(var i=0; i < headerObj.length; i++){
			var headerCell = headerObj[i].split('|');
			var controlType = headerCell[0].trim();
			var cellContent = renderGridValue(controlType, headerCell[1]);
			strHeaderCell += '<div class="wms-srv-grid-cell">'+ renderGridValue(controlType, headerCell[1]) +'</div>';
		}
		strHeaderCell += '</div>';
		
		var getDataGrid = '';
		if(placeHolderId != undefined){
			//$('#'+ this.wmsDataHolder +' .'+ placeHolderId +' .wms-srv-grid').append(strHeaderCell);
			getDataGrid = '#'+ this.wmsDataHolder +' .'+ placeHolderId +' .wms-srv-grid';
		}else{
			//$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid').append(strHeaderCell);
			getDataGrid = '#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid';
		}
		$(getDataGrid).append(strHeaderCell);
		
		var dataGridObjectId = 'gridObject_' + this.global_main_obj + '_' + this.global_child_object;
		if(this.global_detail_object != ''){
			dataGridObjectId += '_' + this.global_detail_object;
		}
		if(this.global_search_key != ''){
			dataGridObjectId += '_' + this.global_search_key;
		}
		$(getDataGrid).attr('data-gridobjectid', dataGridObjectId);
	}
	
	o_setupAddForm(){
		var hasAddForm = $('#'+ this.wmsDataHolder +' .pnlWmsDetail').has('.wms-srv-grid-add').length ? true : false;
		if(!hasAddForm){
			this.global_insert_update_type = 'New';
			var canUploadFile = this.global_can_upload_file;
			var strAddFormCell = '<div class="wms-srv-grid-row wms-srv-grid-add">';
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-header .wms-srv-grid-cell').each(function(){
				var cellContent = $(this).html();
				if(cellContent.trim() == 'Action'){
					/* -- Attach File Icon -- */
					var fileAttachIcon = '';
					if(canUploadFile){
						fileAttachIcon = '<div class="wms-srv-file-upload-holder"><label for="wms-srv-ctrl-file-upload"><i class="fas fa-paperclip"></i><span class="wms-srv-badge" style="display:none;">0</span></label> <div class="wms-srv-action-sep">|</div><input type="file" id="wms-srv-ctrl-file-upload" data-srvpath="" /></div>';
						//fileAttachIcon = '<div class="wms-srv-file-upload-holder"><label for="wms-srv-ctrl-file-upload"><a href="#" title="Attach File" class="wms-srv-attach" data-prefix="AT"><i class="fas fa-paperclip"></i></a></label> <div class="wms-srv-action-sep">|</div> <input type="file" id="wms-srv-ctrl-file-upload" /></div>';
					}
					/* -- Attach File Icon -- */
					strAddFormCell += '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">'+ fileAttachIcon +' <a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle"></i></a> <div class="wms-srv-action-sep">|</div> <a href="#" title="Cancel" class="wms-srv-cancel" data-prefix="CN"><i class="fas fa-times-circle"></i></a></div></div>';
				}else if(cellContent.trim().toLowerCase().indexOf('checkbox') > -1){
					strAddFormCell += '<div class="wms-srv-grid-cell"></div>';
				}else{
					strAddFormCell += '<div class="wms-srv-grid-cell"><input type="text" data-for="'+ cellContent +'" /></div>';
				}
			});
			strAddFormCell += '</div>';
			$(strAddFormCell).insertAfter('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-header');
			var getWmsDataObj = this;
			var frmAdd = $('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-add');
			var frmCtrlFile = $('#'+ this.wmsDataHolder +' .pnlWmsDetail #wms-srv-ctrl-file-upload');
			var frmBtnSave = $('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-add [data-prefix="SV"]');
			var frmBtnCancel = $('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-add [data-prefix="CN"]');
			$(frmCtrlFile).change(function(){
				getWmsDataObj.o_uploadWmsAttachment();
			});
			$(frmBtnSave).click(function(){
				getWmsDataObj.o_setupSaveForm();
				//$(frmAdd).remove();
			});
			$(frmBtnCancel).click(function(){
				getWmsDataObj.global_insert_update_type = '';
				getWmsDataObj.global_insert_update_record = '';
				$(frmAdd).remove();
			});
		}
	}
	o_setupSaveForm(){
		var getWmsDataObj = this;
		var strSaveFormCell = '';
		var strComma = '';
		var isValidForm = true;
		var validationMessage = '';
		getWmsDataObj.global_insert_update_record = '';
		$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-header .wms-srv-grid-cell').each(function(){
			var myIndex = $(this).index();
			var cellContent = $(this).html();
			if((cellContent.trim() != 'Action') && (cellContent.trim().toLowerCase().indexOf('checkbox') == -1)){
				var getInputVal = $('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-add .wms-srv-grid-cell:eq('+ myIndex +') input').val();
				var filterInputVal = getInputVal.split(',').join('--wmscmm--');
				strSaveFormCell += strComma + cellContent + '|' + filterInputVal;
				strComma = ',';
				if(getInputVal.trim() == ''){
					isValidForm = false;
					validationMessage = 'All fields required!!';
				}
			}
			if(cellContent.trim() == 'Action'){
				var canUploadFile = getWmsDataObj.global_can_upload_file;
				if(canUploadFile){
					var getAttachment = $('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-add .wms-srv-grid-cell:eq('+ myIndex +') #wms-srv-ctrl-file-upload').data('srvpath');
					strSaveFormCell += strComma + 'Attachment' + '|' + getAttachment;
					if((isValidForm) && (getAttachment.trim() == '')){
						isValidForm = false;
						validationMessage = 'Attach File!!';
					}
				}
			}
		});
		
		if(isValidForm){
			var bindactionType = "";
			if(getWmsDataObj.global_detail_object == "DOC" || getWmsDataObj.global_detail_object == "TRN"){
				bindactionType = "SV";
			}
			getWmsDataObj.global_insert_update_record = strSaveFormCell;
			getWmsDataObj.o_bindWmsPageData("1", bindactionType, function(){
				if(getWmsDataObj.global_detail_object == "DOC"){
					$('#' + getWmsDataObj.wmsDataHolder + ' .pnlWmsHead .wms-srv-grid').find('.wms-srv-grid-header').eq(0).remove();
					$('#' + getWmsDataObj.wmsDataHolder + ' .pnlWmsHead .wms-srv-grid').find('.wms-srv-grid-row').eq(0).remove();
				}
			});
			$(frmAdd).remove();
		}else{
			showWmsAlert('Warning!!', validationMessage, 'warning');
			//showWmsAlert('Warning!!', err.statusText, 'warning');
			//alert(validationMessage);
		}
	}
	o_setupDataRange(dataLine, placeHolderId){		
		var pageNo = 0;
		var recordFrom = 0;
		var recordTo = 0;
		var totalRecord = 0;
		var pagerLinks = '';
		var breakDataRange = dataLine.split(',');
		for(var dr=0; dr < breakDataRange.length; dr++){
			var dataItem = breakDataRange[dr].split(":");
			var dataName = dataItem[0].trim();
			var dataValue = Number(dataItem[1].trim());
			if(dataName == 'pageno'){
				pageNo = dataValue;
			}else if(dataName == 'start'){
				recordFrom = dataValue;
			}else if(dataName == 'to'){
				recordTo = dataValue;
			}else if(dataName == 'total'){
				totalRecord = dataValue;
			}
		}
		if(placeHolderId == undefined){
			placeHolderId = 'pnlWmsDetail';
		}
		
		$('#'+ this.wmsDataHolder +' .' + placeHolderId + ' .wms-srv-pager-records').html(recordFrom + '-'+ recordTo +' of '+ totalRecord +' Records');
		var lnkCounter = 1;
		var currentCounter = this.global_max_record_count;
		var lastPage = 0;
		while(currentCounter < totalRecord){
			if(lnkCounter == pageNo){
				pagerLinks += '<a href="#" class="wms-srv-active" data-page="'+ lnkCounter +'">' + lnkCounter + '</a>';
			}else{
				pagerLinks += '<a href="#" data-page="'+ lnkCounter +'">' + lnkCounter + '</a>';
				lastPage = lnkCounter;
			}
			this.global_last_page_no = lnkCounter;
			currentCounter = currentCounter + this.global_max_record_count;
			lnkCounter = lnkCounter + 1;
		}
		
		/* Add Page linke for remaining record */
		if(currentCounter > totalRecord){
			if(lnkCounter == pageNo){
				pagerLinks += '<a href="#" class="wms-srv-active" data-page="'+ lnkCounter +'">' + lnkCounter + '</a>';
			}else{
				pagerLinks += '<a href="#" data-page="'+ lnkCounter +'">' + lnkCounter + '</a>';
				lastPage = lnkCounter;
            }
            // Update last page count - 21 Sept 2021
            this.global_last_page_no = lnkCounter;
		}
		/* Add Page linke for remaining record */
		var pagerNavLinks = '<a href="#" data-page="firstpage"><i class="fas fa-angle-double-left"></i></a>';
		pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
		pagerNavLinks += pagerLinks;
		pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
		pagerNavLinks += '<a href="#" data-page="lastpage"><i class="fas fa-angle-double-right"></i></a>';
		
		$('#'+ this.wmsDataHolder +' .' + placeHolderId + ' .wms-srv-pager-links').html(pagerNavLinks);
	}

	o_setupGridRow(dataLine, placeHolderId){
		var filterLine = reformatLine(dataLine);
		var strCell = '<div class="wms-srv-grid-row">';
		var cellObj = filterLine.split(',');
		for(var i=0; i < cellObj.length; i++){
			if((cellObj[i].indexOf('act[') > -1) && (cellObj[i].indexOf('|') == -1)){
				var reConstructCellObj = 'ACT|' + cellObj[i];
				cellObj[i] = reConstructCellObj;
			}
			if(cellObj[i].indexOf('|') > -1){
				var rowCell = cellObj[i].split('|');
				var controlType = rowCell[0].trim();
				strCell += '<div class="wms-srv-grid-cell">'+ renderGridValue(controlType, rowCell[1]) +'</div>';
			}else{
				var mergeCellVal = strCell.substring(0, strCell.length - 6);
				strCell = mergeCellVal +', '+ cellObj[i] + '</div>';
			}
		
		}
		strCell += '</div>';
		// alert(placeHolder);
		if(placeHolderId != undefined){
			$('#'+ this.wmsDataHolder +' .'+ placeHolderId +' .wms-srv-grid').append(strCell);
		}else{
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid').append(strCell);
		}
		
	}
	o_setupFormGrid(dataLine, placeHolderId){
		var filterLine = reformatLine(dataLine);
		// alert(filterLine);
		var strHeaderCell = '<div class="wms-srv-grid-header">';
		var strCell = '<div class="wms-srv-grid-row">';
		var objHead = filterLine.split(',');
		for(var i=0; i < objHead.length; i++){
			var breakData = objHead[i].split('|');
			strHeaderCell += '<div class="wms-srv-grid-cell">'+ breakData[1] +'</div>';
			//strCell += '<div class="wms-srv-grid-cell">'+ breakData[2] +'</div>';
			strCell += '<div class="wms-srv-grid-cell">'+ renderGridValue(breakData[0].trim(), breakData[2]) +'</div>';
		}
		strHeaderCell += '</div>';
		strCell += '</div>';
		var finalObjHead = '<div class="wms-srv-grid">' + strHeaderCell + strCell + '</div><br />';
		
		//$('#'+ this.wmsDataHolder +' .pnlWmsHead .wms-srv-grid').append(finalObjHead);
		//$('#'+ this.wmsDataHolder +' .pnlWmsHead').show();
		
		if(placeHolderId != undefined){
			$('#'+ this.wmsDataHolder +' .'+ placeHolderId).append(finalObjHead);
		}else{
			$('#'+ this.wmsDataHolder +' .pnlFormGrid').append(finalObjHead);
		}
		
	}
	
	o_setupFormRow(dataLine, placeHolderId){
		var filterLine = reformatLine(dataLine);
		var strCell = '<div class="container-fluid">';
		strCell += '<div class="row">';
		var cellObj = filterLine.split(',');
		for(var i=0; i < cellObj.length; i++){
			var getBtStrpNum = Math.round(12 / cellObj.length);			
			strCell += '<div class="col-md-'+ getBtStrpNum +'">';
			strCell += '<div class="container-fluid">';
			strCell += '<div class="row">';
				if((cellObj[i].indexOf('act[') > -1) && (cellObj[i].indexOf('|') == -1)){
					var reConstructCellObj = 'ACT|' + cellObj[i];
					cellObj[i] = reConstructCellObj;
				}
				if(cellObj[i].indexOf('|') > -1){
					var rowCell = cellObj[i].split('|');
					var controlType = rowCell[0].trim();
					
					var controlLabel = rowCell[1];
					var controlValue = rowCell[2];
					
					if(controlType == 'frmact'){
						controlLabel = '';
						controlValue = rowCell[1];
					}else if(controlType == 'CHKGRP'){
						controlValue = rowCell[1];
					}
					
					if(controlType == 'CHKGRP' || controlType == 'frmact'){
						strCell += '<div class="col-md-12">'+ renderGridValue(controlType, controlValue) +'</div>';
					}else if(controlType == 'TX'){
						strCell += '<div class="col-md-12">'+ controlLabel +'</div>';
					}else{
						strCell += '<div class="col-md-4">'+ controlLabel +'</div>';
						strCell += '<div class="col-md-8">'+ renderGridValue(controlType, controlValue) +'</div>';
					}
					
				}else{
					var mergeCellVal = strCell.substring(0, strCell.length - 6);
					strCell = mergeCellVal +', '+ cellObj[i] + '</div>';
				}
			strCell += '</div>';
			strCell += '</div>';
			strCell += '</div>';
		}
		strCell += '</div>';
		strCell += '</div>';
		// alert(placeHolder);
		if(placeHolderId != undefined){
			$('#'+ this.wmsDataHolder +' .'+ placeHolderId +' .wms-srv-grid').append(strCell);
		}else if(controlType == 'frmact'){
			$('#'+ this.wmsDataHolder +' .pnlFormGrid').append(strCell);
		}else{
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid').append(strCell);
		}
	}
	
	o_setupGridRowChild(dataLine, placeHolderId){
		var filterLine = reformatLine(dataLine);
		var breakLine = filterLine.split('|');
		var strCell = '<div class="wms-srv-grid-row-child placeHolder_'+ breakLine[1] +'" data-parentid="'+ breakLine[1] +'" style="display:none;"><div class="wms-srv-grid-detail-child"></div></div>';
		
		if(placeHolderId != undefined){
			$('#'+ this.wmsDataHolder +' .'+ placeHolderId +' .wms-srv-grid').append(strCell);
		}else{
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid').append(strCell);
		}
	}
	
	o_setupCommunicationRow(dataLine){
		var filterDataLine1 = dataLine.split('CHK|').join('[wms-col]');
		var filterDataLine2 = filterDataLine1.split(',TX|').join('[wms-col]');
		var filterDataLine3 = filterDataLine2.split(',LN|').join('[wms-col]');
		var breakCommDataLine = filterDataLine3.split('[wms-col]');
		
		var cmmId = breakCommDataLine[1];
		var cmmProfilePic = breakCommDataLine[2];
		var cmmBy = breakCommDataLine[3];
		var cmmMsg = breakCommDataLine[4];
		var cmmTime = breakCommDataLine[5];
		var cmmAtt1 = breakCommDataLine[6];
		var cmmAtt2 = breakCommDataLine[7];
		
		// Setup Profile Pic
		$('#commChatTemplate .wmsTicketProfilePic').attr('src', cmmProfilePic);
		// Communication By
		$('#commChatTemplate .wmsTicketRepliedBy label').html(cmmBy);
		// Message
		$('#commChatTemplate .wmsTicketReplyMessage').html(cmmMsg);
		// Time
		$('#commChatTemplate .wmsTicketReplyTime label').html(cmmTime);
		// Attachment1
		$('#commChatTemplate .wmsTicketAttachment1 a').html(cmmAtt1);
		$('#commChatTemplate .wmsTicketAttachment1 a').attr('href', cmmAtt1);
		// Attachment2
		$('#commChatTemplate .wmsTicketAttachment2 a').html(cmmAtt2);
		$('#commChatTemplate .wmsTicketAttachment2 a').attr('href', cmmAtt2);
		
		var nextCommunication = $('#commChatTemplate').html();
		var cmmHtml = '<div class="row">' + nextCommunication + '</div>';
		var getCommunicationHolder = $('#commChatTemplate').parent();
		getCommunicationHolder.append(cmmHtml);
	}

	o_setupSearchFilters(){
		var getWmsDataObj = this;
		if(this.global_is_header_required == 'yes'){
			var hasDateColumn = false;
			var dateFilterOptions = '';
			var filterOptions = '<optgroup label="Search By Columns">';
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-header .wms-srv-grid-cell').each(function(){
				var cellLabel = $(this).text();
				if(cellLabel != ''){
					filterOptions += '<option>'+ cellLabel +'</option>';
				}
				if(cellLabel.toLowerCase().indexOf('date') > -1){
					hasDateColumn = true;
				}
			});
			filterOptions += '</optgroup>';
			if(hasDateColumn){
				dateFilterOptions += '<optgroup label="Search By Date/Period">';
				dateFilterOptions += '<option>For Current Year</option>';
				dateFilterOptions += '<option>For Previous Year</option>';
				dateFilterOptions += '</optgroup>';
			}
			var finalSearchOptions = dateFilterOptions + filterOptions;
			
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search .wms-srv-search-filter').append(finalSearchOptions);
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-year').hide();
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-prev-year').hide();
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-simple-search').show();
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail i.fa-search').show();
			
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-filter').change(function(){
				var searchVal = $(this).val();
				// Reset Values
				$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-simple-search').val('');
				$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-year').val('');
				$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-prev-year').val('');
				this.global_search_key = '';
				this.global_search_type = '';
				this.global_search_column = '';		
				
				if(searchVal == 'For Current Year'){
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-year').show();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-prev-year').hide();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-simple-search').hide();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail i.fa-search').hide();
					this.global_search_type = 'CurrentYear';
				}else if(searchVal == 'For Previous Year'){
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-year').hide();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-prev-year').show();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-simple-search').hide();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail i.fa-search').hide();
					this.global_search_type = 'PreviousYear';
				}else{
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-year').hide();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-prev-year').hide();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-simple-search').show();
					$('#'+ this.wmsDataHolder +' .pnlWmsDetail i.fa-search').show();
					this.global_search_type = 'ByColumn';
					this.global_search_column = searchVal;
				}
			});
			
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-simple-search').keydown(function(e){
				if(e.which == 13){
					
					return false;
				}
				
			});
			
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-simple-search').keyup(function(e){
				if(e.which == 13){
					var searchKey = $(this).val();				
					getWmsDataObj.global_search_key = searchKey;
					if(searchKey != ''){
						getWmsDataObj.o_bindWmsPageData(getWmsDataObj.global_page_no,"SE", function(){
							// Do nothing...
							/* alert('Hello' + searchKey); */
						});
					}
				}
			});
			
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-by-year').change(function(){
				var searchKey = $(this).val();
				getWmsDataObj.global_search_key = searchKey;
				if(searchKey != ''){
					getWmsDataObj.o_bindWmsPageData(getWmsDataObj.global_page_no,"SE", function(){
						// Do nothing...
					});
				}
			});
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-search-filter').change(function(){
				var searchFilter = $(this).val();
				getWmsDataObj.global_search_column = searchFilter;
				if(searchFilter == 'For Current Year'){
					getWmsDataObj.global_search_type = 'CurrentYear';
				}else if(searchFilter == 'For Previous Year'){
					getWmsDataObj.global_search_type = 'PreviousYear';
				}else{
					getWmsDataObj.global_search_type = 'ByColumn';
				}
				if(searchFilter != ''){
					/*
					getWmsDataObj.o_bindWmsPageData(getWmsDataObj.global_page_no,"SE", function(){
						// Do nothing...
					});
					*/
				}
			});
		}
	}
	o_bindControlEvent(){
		var getWmsDataObj = this;
		// Event [#1]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-btn-status-action').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-btn-status-action').click(function(){
			var obj = $(this).offset();
			var getPopupWidth = $('#wmsSrvActionPopupMenu').width();
			var getPopupHeight = $('#wmsSrvActionPopupMenu').height();
			var popupTop = obj.top - getPopupHeight;
			var popupLeft = obj.left;
			$('#wmsSrvActionPopupMenu').css('top', popupTop + 'px');
			$('#wmsSrvActionPopupMenu').css('left', popupLeft + 'px');
			var getParent = $(this).parent().parent();
			//var getCheckboxVal =  $(this).parent().parent().parent().find('input[type="checkbox"]:eq(0)').val();
			var getCheckboxVal =  $(this).parent().parent().parent().parent().parent().find('input[type="checkbox"]:eq(0)').val();
			$('#wmsSrvActionPopupMenu').data('id', getCheckboxVal);
			//alert(getCheckboxVal);
			$('#wmsSrvActionPopupMenu').html('');
			
			var getCurrentRow = $(this).parent().parent().parent().parent().parent();
			var getCurrentTable = $(this).parent().parent().parent().parent().parent().parent().find('.wms-srv-grid-header');
			var getHeaderObj = getWmsDataObj.o_captureHeaderForObject(getCurrentRow, getCurrentTable);
			
			var populateMenu = '';
			$(getParent).find('.wms-srv-dot').each(function(){
				var getData = $(this).data('for');
				var getColor = $(this).data('color');
				populateMenu += '<a href="#" data-id="'+ getCheckboxVal +'" data-color="'+ getColor +'"><div class="wms-srv-dot wms-srv-'+ getColor +'"></div> '+ getData +'</a>';
				//alert(getData);
			});
			$('#wmsSrvActionPopupMenu').html(populateMenu);
				// Assign DropDown Menu Click Again...
				$('#wmsSrvActionPopupMenu a').off();
				$('#wmsSrvActionPopupMenu a').click(function(){
					var myDataId = $(this).data('id');
					var myDataColor = $(this).data('color');
					var myLabel = $(this).text().trim();
					if(myLabel != 'Expected Receipt' && myLabel != 'Outbound Order'){
						if(myDataColor != 'gray'){
							getWmsDataObj.global_child_object = myLabel;
							if (myLabel == 'CycleCount') {
								getWmsDataObj.global_detail_object = 'CyclePlanUpdate';
							}
							else {
								getWmsDataObj.global_detail_object = 'PO';
							}
							getWmsDataObj.global_detail_object_id = myDataId;
							getWmsDataObj.global_search_key = 'Total';
							
							//For Generating Header... 
							/* var getCurrentRow = $(this).parent().parent().parent();
							var getCurrentTable = $(this).parent().parent().parent().parent().find('.wms-srv-grid-header');
							var getHeaderObj = getWmsDataObj.o_captureHeaderForObject(getCurrentRow, getCurrentTable);
							alert(getHeaderObj); */
							getWmsDataObj.loadData(function(){
								//Generate Header
								$('.wms-srv-child-obj').hide();
								$('#pnlInbound .pnlWmsHead .wms-srv-grid').html('');
								 getWmsDataObj.o_readLineAndSetup(getHeaderObj);
								//do Nothing here... 
							});
						}else{
							return false;
						}
					}else if(myLabel == 'Outbound Order'){
						getWmsDataObj.o_showWmsSrvPopup('Sales Order', 'fas fa-file-alt', 'content-template/create-sales-order-template.html', function(){
							let mySalesOrder = new CreateSalesOrder("pnlCreateSalesOrder", getWmsDataObj.global_main_obj, getWmsDataObj.global_child_object, 'SO', myDataId, '');
						});
					}else{
						getWmsDataObj.o_showWmsSrvPopup('Create Purchase Order', 'fas fa-file-alt', '../WMSCommonLibrary/content-template/create-purchase-order-template.html', function(){
							let myPurchaseOrder = new CreatePurchaseOrder("pnlCreatePurchaseOrder", getWmsDataObj.global_main_obj, getWmsDataObj.global_child_object, 'PO', myDataId, '');
						});
					}
					$('#wmsSrvActionPopupMenu').hide();
				});
			$('#wmsSrvActionPopupMenu').show();
			return false;
		});
		
		// Event [#3]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-more-btn-holder button').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-more-btn-holder button').click(function(){
			//$(getWmsDataObj).parent().find('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-more-navbar').show();
			$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-more-navbar').show();
			return false;
		});
		
		// Event [#4]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-more-navbar a').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-more-navbar a').click(function(){
			//var getActionType = $(getWmsDataObj).data('prefix');
			var getActionType = $(this).data('prefix');
			getWmsDataObj.o_bindWmsPageData(getWmsDataObj.global_page_no, getActionType, function(){
				// Do nothing...
			});
			$(getWmsDataObj).parent().hide();
			return false;
		});
		
		// Event [#5]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="AN"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="AN"]').click(function(){
			getWmsDataObj.o_setupAddForm();
			return false;
		});
		
		// Event [#5]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="LP"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="LP"]').click(function(){
			//getWmsDataObj.o_setupAddForm();			
			var ActionOnDataRow = getWmsDataObj.o_selectedCheckBoxVal(getWmsDataObj.wmsDataHolder);
			
			var labelPrintingURL = '';
			if(getWmsDataObj.global_child_object == 'Receiving'){
				labelPrintingURL = 'http://w5production.westcoastwarehouse.com/NewGUIWestcoastDev/ReportDesigner/Detail-Report-Template/SKU-LablePrint.aspx?Ids='+ ActionOnDataRow +'&Object=GRN';
			}else if(getWmsDataObj.global_child_object == 'Put Away'){
				labelPrintingURL = 'http://w5production.westcoastwarehouse.com/NewGUIWestcoastDev/ReportDesigner/Detail-Report-Template/SKU-LablePrint.aspx?Ids='+ ActionOnDataRow +'&Object=Put%20Away';
			}
			if(labelPrintingURL != ''){
				window.open(labelPrintingURL);
			}
			return false;
		});
		
		// Event [#5]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="PR"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="PR"]').click(function(){
			//getWmsDataObj.o_setupAddForm();			
			var ActionOnDataRow = getWmsDataObj.o_selectedCheckBoxVal(getWmsDataObj.wmsDataHolder);
			
			var labelPrintingURL = '';
			if(getWmsDataObj.global_child_object == 'Receiving'){
				labelPrintingURL = 'http://w5production.westcoastwarehouse.com/NewGUIWestcoastDev/ReportDesigner/Detail-Report-Template/Receiving-Receipt.aspx?GRNID='+ ActionOnDataRow;
			}else if(getWmsDataObj.global_child_object == 'Put Away'){
				labelPrintingURL = 'http://w5production.westcoastwarehouse.com/NewGUIWestcoastDev/ReportDesigner/Detail-Report-Template/Putaway-Receipt.aspx?PutInID='+ ActionOnDataRow;
			}
			if(labelPrintingURL != ''){
				window.open(labelPrintingURL);
			}
			return false;
		});
		
		// Event [#5]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="CMM"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="CMM"]').click(function(){
			var getParentClass = $(this).parent().parent().attr('class');
			var getCheckboxVal =  $(this).parent().parent().parent().find('input[type="checkbox"]:eq(0)').val();
			getWmsDataObj.o_showWmsSrvPopup('Correspondence', 'fas fa-envelope', '../WMSCommonLibrary/content-template/communication-template.html', function(){
				if(getParentClass == 'wms-srv-grid-cell'){
					//getCheckboxVal = '66071';
					let myCommunication = new Communication("pnlCommunication", getWmsDataObj.global_main_obj, getWmsDataObj.global_child_object, 'CMM', getCheckboxVal, '');
					
				}
			});
		});
		
		// Event [#6]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="DOC"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="DOC"]').click(function(){
			var getParentClass = $(this).parent().parent().attr('class');
			var getCheckboxVal =  $(this).parent().parent().parent().find('input[type="checkbox"]:eq(0)').val();
			getWmsDataObj.o_showWmsSrvPopup('Document', 'fas fa-file-alt', '../WMSCommonLibrary/content-template/document-template.html', function(){
				if(getParentClass == 'wms-srv-grid-cell'){
					//getCheckboxVal = '66054';
					//	wmsDataHolder, wmsObject, wmsChildObject, wmsDetailObject, wmsDetailObjectId, orderNumber
					let myDocument = new Document("pnlDocument", getWmsDataObj.global_main_obj, getWmsDataObj.global_child_object, 'DOC', getCheckboxVal, '');
				}
			});
		});
		
		// Event [#7]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="APP"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="APP"]').click(function(){
			var getParentClass = $(this).parent().parent().attr('class');
			var getCheckboxVal =  $(this).parent().parent().parent().find('input[type="checkbox"]:eq(0)').val();
			getWmsDataObj.o_showWmsSrvPopup('Approval', 'fas fa-user-check', '../WMSCommonLibrary/content-template/approval-template.html', function(){				
				if(getParentClass == 'wms-srv-grid-cell'){
					//let myApproval = new Approval("pnlApproval", getCheckboxVal);
					let myApproval = new Approval("pnlApproval", getWmsDataObj.global_main_obj, getWmsDataObj.global_child_object, 'APP', getCheckboxVal, '');
				}
			});
		});
		
		// Event [#6]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="TRN"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="TRN"]').click(function(){
			var getParentClass = $(this).parent().parent().attr('class');
			var getCheckboxVal =  $(this).parent().parent().parent().find('input[type="checkbox"]:eq(0)').val();
			
			var getCurrentRow = $(this).parent().parent().parent();
			var getCurrentTable = $(this).parent().parent().parent().parent().find('.wms-srv-grid-header');
			
			var getHeaderObj = getWmsDataObj.o_captureHeaderForObject(getCurrentRow, getCurrentTable);
			
			getWmsDataObj.o_showWmsSrvPopup('Transport', 'fas fa-file-alt', '../WMSCommonLibrary/content-template/transport-template.html', function(){
				if(getParentClass == 'wms-srv-grid-cell'){
					let myTransport = new Transport("pnlTransport", getWmsDataObj.global_main_obj, getWmsDataObj.global_child_object, 'TRN', getCheckboxVal, '', getHeaderObj);
				}
			});
		});
		
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-action-panel [data-prefix="TRN"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-action-panel [data-prefix="TRN"]').click(function(){
			
			var getCheckboxVal =  getWmsDataObj.global_detail_object_id;			
			var getCurrentRow = $('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsHead').find('.wms-srv-grid-row');
			var getCurrentTable = $('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsHead').find('.wms-srv-grid-header');
			
			var getHeaderObj = getWmsDataObj.o_captureHeaderForObject(getCurrentRow, getCurrentTable);
			
			getWmsDataObj.o_showWmsSrvPopup('Transport', 'fas fa-file-alt', '../WMSCommonLibrary/content-template/transport-template.html', function(){
				let myTransport = new Transport("pnlTransport", getWmsDataObj.global_main_obj, getWmsDataObj.global_child_object, 'TRN', getCheckboxVal, '', getHeaderObj);
			});
		});
		
		// Event [#7]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="CG"]').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail [data-prefix="CG"]').click(function(){
			getWmsDataObj.o_showWmsSrvPopup('Customize Grid', 'fas fa-edit', '../WMSCommonLibrary/content-template/customize-grid.html', function(){
				$( "#popupContentDocument ul.droptrue" ).sortable({
				  connectWith: "ul"
				});
			 
				$( "#popupContentDocument ul.dropfalse" ).sortable({
				  connectWith: "ul"
				});
			});
		});
		
		// Event [#8]
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-pager-links a').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .pnlWmsDetail .wms-srv-pager-links a').click(function(){
			var getPageNo = $(this).data("page");
			if(getPageNo == 'firstpage'){
				getWmsDataObj.global_page_no = 1;
			}else if(getPageNo == 'previous'){
				if(getWmsDataObj.global_page_no > 1){
					getWmsDataObj.global_page_no = getWmsDataObj.global_page_no - 1;
				}
			}else if(getPageNo == 'next'){
				if(getWmsDataObj.global_page_no < getWmsDataObj.global_last_page_no){
					getWmsDataObj.global_page_no = getWmsDataObj.global_page_no + 1;
				}
			}else if(getPageNo == 'lastpage'){
				getWmsDataObj.global_page_no = getWmsDataObj.global_last_page_no;
			}else{
				getWmsDataObj.global_page_no = Number(getPageNo);
			}
			getWmsDataObj.o_bindWmsPageData(getWmsDataObj.global_page_no,"", function(){
				// Do nothing...
			});
			return false;
        });
		
		//Event [#9]
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-child-obj select').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-child-obj select').change(function(){
			var selectedText = $(this).find('option:selected').text().trim();
			getWmsDataObj.global_child_object = selectedText;
			getWmsDataObj.o_bindWmsPageData(getWmsDataObj.global_page_no,"", function(){
				// Do nothing...
			});
		});
		
		//Event to scan barcode[#9]
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-barcodescan .wms-srv-scan-button').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-barcodescan .wms-srv-scan-button').click(function(){
			var isActive = $(this).data('isactive');
			if(isActive == 'yes'){
				var barcodeText = $('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-barcodescan .wms-srv-scan-input').val().trim();
				if(barcodeText != ''){
					getWmsDataObj.o_scanWmsBarcode(barcodeText);
				}else{
					showWmsAlert('Warning!!', 'Enter barcode', 'warning');
					//alert('Enter barcode');
				}
			}
		});
		
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-barcodescan input[type="checkbox"]').click(function(){
			activateDeactiveWithScan(getWmsDataObj);
		});
		
		/*
		//Event to scan barcode[#9]
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-search .wms-srv-simple-search').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-search .wms-srv-simple-search').keyup(function(){
			getWmsDataObj.o_searchInGrid(this);			
		});
		
		//Event to scan barcode[#9]
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-search .wms-srv-search-filter').off();
		$('#'+ getWmsDataObj.wmsDataHolder +' .wms-srv-search .wms-srv-search-filter').change(function(){
			getWmsDataObj.o_searchInGrid(this);			
		});
		*/
	}
	
	/*
	o_searchInGrid(ctrlObj){
		var findSearchParent = $(ctrlObj).parent();
		var findGridParent = $(ctrlObj).parent().parent().parent();
		var findGrid = $(findGridParent).find('.wms-srv-grid').html();
		var searchFilter = $(findSearchParent).find('.wms-srv-search-filter').val();
		var searchKey = $(findSearchParent).find('.wms-srv-simple-search').val().toLowerCase();
		// Remove found record css
		$(findGrid).removeClass('wms-srv-search-mode');
		//$(findGrid).find('.wms-srv-grid-row').removeClass('wms-srv-search-found');
		$(findGrid).find('.wms-srv-grid-row').hide();		
		if(searchKey.trim() != ''){
			$(findGrid).addClass('wms-srv-search-mode');			
			if(searchFilter.trim() == '-- Filters --'){				
				$(findGrid).find('.wms-srv-grid-row').each(function(){
					var getGridCellText = $(this).text().toLowerCase();
					alert(getGridCellText);
					if(getGridCellText.indexOf(searchKey) > -1){
						$(findGrid).addClass('wms-srv-search-mode');
						$(this).show();
					}
				});
			}
		}
	}
	*/
	
	o_isHeaderColumnAllowed(column){
		var isAllowed = true;
		var deniedColumns = ["VendorCode","Company","Customer","Action"];
		var columnIndex = deniedColumns.indexOf(column);
		if(columnIndex > -1){
			isAllowed = false;
		}
		return isAllowed;
	}
	
	o_captureHeaderForObject(objRow, objHeader){
		var headerObj = '';
		var getWmsDataObj = this;
		$(objHeader).find('.wms-srv-grid-cell').each(function(){
			var headerIndex = $(this).index();
			var getHeaderText = $(this).text().trim();
			//if(getHeaderText != '' && getHeaderText != 'Action'){
			if(getHeaderText != '' && getWmsDataObj.o_isHeaderColumnAllowed(getHeaderText)){
				var rowValue = $(objRow).find('.wms-srv-grid-cell').eq(headerIndex).text();
				if(headerObj == ''){
					headerObj +=  '$detailObjHead@' + 'TX' + '|' + getHeaderText + '|' + rowValue;
				}else{
					headerObj +=  ',' + 'TX' + '|' + getHeaderText + '|' + rowValue;
				}
			}
		});
		return headerObj;
	}
	
	o_setupGridTitle(objTitle){
		var hasGridTitle = $('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-action-panel').has('.wms-srv-grid-title');
		if(hasGridTitle.length > 0){
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-action-panel .wms-srv-grid-title').html(objTitle);
	//	alert('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-action-panel .wms-srv-grid-title');
		}else{
			$('#'+ this.wmsDataHolder +' .pnlWmsDetail .wms-srv-grid-action-panel').append('<div class="wms-srv-grid-title">' + objTitle + '</div>');
		}
	}
	
	o_showWmsSrvPopup(popTitle, popIcon, popTemplate, popObjFunction){
		var popupTitleObj = $('#wms-srv-popup .wms-srv-popup-title span');
		var popupTitleIcon = $('#wms-srv-popup .wms-srv-page-title i');
		var popupContentTemplate = '';
		$(popupTitleObj).html(popTitle);
		$(popupTitleIcon).attr('class', popIcon);
		popupContentTemplate = popTemplate;
		$('#wms-srv-popup-close').off();
		$('#wms-srv-popup-close').click(function(){
			$('#wms-srv-popup').hide();
		});
		$.get(popupContentTemplate, function(data) {
			$('#popupContentDocument').html(data);
			$('#wms-srv-popup').show();
			popObjFunction();
		});
		
	}
	
	o_setupRichTextEditor(){
		$('#'+ this.wmsDataHolder +' .wms-srv-richtexteditor textarea').Editor();
	}
	o_getRichTextEditorHtml(){
		var myHtmlText = '';
		myHtmlText = $('#'+ this.wmsDataHolder +' .wms-srv-richtexteditor textarea').Editor("getText");
		return myHtmlText;
	}
	o_sendCommunicationMessage(){
		
	}
}

// END OF THE CLASS

// BEGIN GRID FUNCTIONS
function reformatLine(dataLine){
	var breakChar = dataLine.split('');
	var constructLine = '';
	var isSubOption = 'no';
	for(var i=0; i<breakChar.length; i++){
		if(breakChar[i] == '['){
			isSubOption = 'yes';
		}else if(breakChar[i] == ']'){
			isSubOption = 'no';
		}
		if(isSubOption == 'yes' && breakChar[i] == ','){
			breakChar[i] = '--wmscmm--';
		}
		constructLine += breakChar[i];
	}
	return constructLine;
}
// END OF GRID FUNCTIONS

// BEGIN GRID CONTROLS...
function renderGridValue(ctrlType, ctrlValue){
	var ctrlHtml = '';
	if(ctrlType == 'TX'){
		ctrlHtml = ctrlValue;
	}else if(ctrlType == 'CHK'){
		ctrlHtml = '<input type="checkbox" value="'+ ctrlValue +'" />';
	}else if(ctrlType == 'ED'){
		ctrlHtml = '<input type="text" value="'+ ctrlValue +'" class="wms-srv-grid-cell-input" />';
    } else if (ctrlType == 'TM') {
		ctrlHtml = '<select class="wms-srv-grid-cell-input" placeholder="00:00AM">';
		for(var tm = 8; tm < 21; tm++){
			var timeRow = '';
			var amPm = 'AM'; 
			var finalTime = tm;
			if(tm > 12){
				var finalTime = tm - 12;
			}
			if(tm > 11){
				amPm = 'PM';
			}
			var currentTime = finalTime +':00'+ amPm;
			var isSelected = "";
			if(currentTime == ctrlValue){
				isSelected = 'selected="selected"';
			}
			ctrlHtml += '<option value="'+ currentTime +'" '+ isSelected +'>'+ currentTime +'</option>';
		} 
		ctrlHtml += '</select>';
		//ctrlHtml = '<input type="text" value="'+ ctrlValue +'" class="wms-srv-grid-cell-input" placeholder="00:00AM" />';
	}else if(ctrlType == 'DT'){
		ctrlHtml = '<input type="text" value="'+ ctrlValue +'" class="wms-srv-grid-cell-input wms-srv-datepicker" />';
	}else if(ctrlType == 'SESKU' || ctrlType == 'SKU' || ctrlType == 'RT' || ctrlType == 'VE' || ctrlType == 'UM' || ctrlType == 'LT' || ctrlType == 'CAR' || ctrlType == 'PAL' || ctrlType == 'LOC'){
		// SUGGESTION CONTROLS... 
		var btnSuggestionDetails = '';
		if(ctrlType == 'RT'){
			btnSuggestionDetails = '<a href="#"><i class="far fa-eye"></i></a>';
		}
		ctrlHtml = '<div class="wms-srv-suggestion-holder"><input type="text" data-prefix="'+ ctrlType +'" data-id="" value="'+ ctrlValue +'" class="wms-srv-grid-cell-input wms-srv-suggestion" />'+ btnSuggestionDetails +'</div>';
	}else if(ctrlType == 'CL' || ctrlType == 'BTA' || ctrlType == 'STA'){
		btnSuggestionDetails = '<a href="#"><i class="fas fa-search"></i></a>';
		ctrlHtml = '<div class="wms-srv-suggestion-holder"><input type="text" data-prefix="'+ ctrlType +'" data-id="" value="'+ ctrlValue +'" class="wms-srv-grid-cell-input" disabled="disabled" />'+ btnSuggestionDetails +'</div>';		
	}else if(ctrlType == 'ST'){
		var strCtrlStatus = '';
		if(ctrlValue != ''){
			var splitCtrlValue = ctrlValue.split('[');
			strCtrlStatus += '<div class="wms-srv-status-holder" title="Status">';
			strCtrlStatus += '<div class="wms-srv-status-display">';
			strCtrlStatus += '<div class="wms-srv-status-label">';
			strCtrlStatus += splitCtrlValue[0];
			strCtrlStatus += '</div>';
			strCtrlStatus += '<div class="wms-srv-status-progress">';
			
			var extractStatusVal = splitCtrlValue[1].replace(']','')
			var arrStatusVal = extractStatusVal.split('--wmscmm--');
			for(var arS=0; arS < arrStatusVal.length; arS++){
				var extractArr = arrStatusVal[arS].split(':');
				strCtrlStatus += '<div class="wms-srv-dot wms-srv-'+ extractArr[1] +'" data-for="'+ extractArr[0] +'" data-color="'+ extractArr[1] +'"></div> ';
			}
			
			/* strCtrlStatus += '<div class="wms-srv-dot wms-srv-green">';
			strCtrlStatus += '</div> ';
			strCtrlStatus += '<div class="wms-srv-dot wms-srv-red">';
			strCtrlStatus += '</div> ';
			strCtrlStatus += '<div class="wms-srv-dot wms-srv-gray">';
			strCtrlStatus += '</div> '; */
			strCtrlStatus += '</div>';
			strCtrlStatus += '<div class="wms-srv-status-action">';
			strCtrlStatus += '<a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a>';
			strCtrlStatus += '</div>';
			strCtrlStatus += '</div>';
			strCtrlStatus += '</div>';
		}
		ctrlHtml = strCtrlStatus;
	}else if(ctrlType == 'DD'){
		var strCtrlStatus = '';
		if(ctrlValue != ''){
			var splitCtrlValue = ctrlValue.split('[');
			var seletedLabel = splitCtrlValue[0];
			strCtrlStatus += '<select class="wms-srv-grid-cell-input">';
			var extractStatusVal = splitCtrlValue[1].replace(']','')
			var arrStatusVal = extractStatusVal.split('--wmscmm--');
			for(var arS=0; arS < arrStatusVal.length; arS++){
				var extractArr = arrStatusVal[arS].split(':');
				var isSelected = "";
				if(seletedLabel == extractArr[0]){
					isSelected = 'selected="selected"';
				}
				
				var extraInfo = '';
				if(extractArr.length == 3){
					extraInfo = extractArr[2];
				}
				strCtrlStatus += '<option value="'+ extractArr[1] +'" data-info="'+ extraInfo +'" '+ isSelected +'>'+ extractArr[0] +'</option> ';
			}
			strCtrlStatus += '</select>';
		}
		ctrlHtml = strCtrlStatus;
	}else if(ctrlType == 'ACT'){
		var splitCtrlValue = ctrlValue.split('[');
		var ctrlOptions = splitCtrlValue[1].replace(']', '');
		var breakCtrlOptions = ctrlOptions.split('--wmscmm--');
		var actHtml = '<div class="wms-srv-grid-action">';
		for(var op = 0; op < breakCtrlOptions.length; op++){
			if(op == 0){
				actHtml += renderControl(breakCtrlOptions[op].trim());
			}else{
				actHtml += ' <div class="wms-srv-action-sep">|</div> ' + renderControl(breakCtrlOptions[op].trim());
			}
		}
		actHtml += '</div>';
		var strCtrlAction = '<div class="wms-srv-grid-cell wms-srv-grid-action">';
		strCtrlAction += actHtml;
		strCtrlAction += '</div>';
		ctrlHtml = actHtml;
	}else if(ctrlType == 'frmact'){
		var splitCtrlValue = ctrlValue.split('[');
		var ctrlOptions = splitCtrlValue[1].replace(']', '');
		var breakCtrlOptions = ctrlOptions.split('--wmscmm--');
		var actHtml = '<div class="wms-srv-grid-action">';
		for(var op = 0; op < breakCtrlOptions.length; op++){
			//actHtml += renderControl(breakCtrlOptions[op].trim());
			
			var frmCtrl = renderControl(breakCtrlOptions[op].trim());
			//alert(frmCtrl);
			if(frmCtrl != ''){
				actHtml += frmCtrl;
			}else{
				actHtml += '<button data-prefix="btn'+ breakCtrlOptions[op].replace(' ','') +'" class="wms-srv-input wms-srv-button"><span>'+ breakCtrlOptions[op] +'</span></button>';
			}
		}
		actHtml += '</div>';
		var strCtrlAction = '<div class="wms-srv-grid-cell wms-srv-grid-action">';
		strCtrlAction += actHtml;
		strCtrlAction += '</div>';
		ctrlHtml = actHtml;
	}else if(ctrlType == 'CHKGRP'){
		//alert('Process: ' + ctrlValue);
		var actHtml = '';
		if(ctrlValue.indexOf('#') > -1){
			var splitCtrlValue = ctrlValue.split('#');
			for(var i=0; i < splitCtrlValue.length; i++){
				var getChk = splitCtrlValue[i].split(':');
				var isSelected = getChk[1];
				var isChecked = '';
				if(isSelected == 'True'){
					isChecked = 'checked="checked"';
				}
				actHtml += '<div class="wms-srv-chkgrp"><input type="checkbox" value="frmChk'+ getChk[0] +'" '+ isChecked +' />' + getChk[0] + '</div>';				
			}
		}else{
			var getChk = ctrlValue.split(':');
			var isSelected = getChk[1];
			var isChecked = '';
			if(isSelected == 'True'){
				isChecked = 'checked="checked"';
			}
			actHtml += '<div class="wms-srv-chkgrp"><input type="checkbox" value="frmChk'+ getChk[0] +'" '+ isChecked +' />' + getChk[0] + '</div>';
		}
		
		var strCtrlAction = '<div class="wms-srv-grid-cell wms-srv-grid-action">';
		strCtrlAction += actHtml;
		strCtrlAction += '</div>';
		ctrlHtml = actHtml;
	}
	return ctrlHtml;
}

function renderControl(prefix){
	/* var badgeCount = '';
	if(prefix.indexOf('(') > -1){
		var extractBadge = prefix.split('(');
		badgeCount = '<span class="wms-srv-badge">' + extractBadge[1].replace(')','') + '</span>';
		prefix = extractBadge[0]; <i class="fas fa-barcode"></i>
	} */
	var renHtml = '';
    if (prefix == 'VW') {
        renHtml = renderButtonUI(prefix, 'far fa-eye', 'View', 'icononly');
    } else if(prefix == 'INF'){
		renHtml = renderButtonUI(prefix, 'fas fa-info-circle', 'Info', 'icononly');
	}else if(prefix == 'SC'){
		renHtml = renderButtonUI(prefix, 'fas fa-barcode', 'Scan Barcode', 'barcodescan');
	}else if(prefix == 'MD'){
		renHtml = renderButtonUI(prefix, 'fas fa-pen', 'Modify', 'icononly');
    } else if (prefix == 'RS') {
        renHtml = renderButtonUI(prefix, 'far fa-calendar-alt', 'Reschedule', 'icononly');
    }else if(prefix.indexOf('CRT') > -1 ){
		renHtml = renderButtonUI(prefix, 'fas fa-shopping-cart', 'Cart', 'icononly');
	}else if(prefix == 'RM'){
		renHtml = renderButtonUI(prefix, 'fas fa-times-circle', 'Cart', 'icononly');
	}else if(prefix == 'TRN'){
		renHtml = renderButtonUI(prefix, 'fas fa-truck-moving fa-flip-horizontal', 'Transport', 'icononly');
	}else if(prefix == 'DW'){
		renHtml = renderButtonUI(prefix, 'fas fa-download', 'Download', 'icononly');
	}else if(prefix == 'APR'){
		renHtml = renderButtonUI(prefix, 'fas fa-check-circle', 'Approve', 'icononly');
	}else if(prefix == 'REJ'){
		renHtml = renderButtonUI(prefix, 'fas fa-times-circle', 'Reject', 'icononly');
	}else if(prefix.indexOf('APP') > -1 ){
		renHtml = renderButtonUI(prefix, 'fas fa-user-check', 'Approval', 'icononly');
	}else if(prefix.indexOf('CMM') > -1 ){
		renHtml = renderButtonUI(prefix, 'fas fa-envelope', 'Communication', 'icononly');
	}else if(prefix.indexOf('DOC') > -1 ){
		renHtml = renderButtonUI(prefix, 'fas fa-file-alt', 'Document', 'icononly');
	// new controls from here... 
	}else if(prefix == 'AN'){
		renHtml = renderButtonUI(prefix, 'fas fa-plus', 'Add New', 'button-highlight');
	}else if(prefix == 'AT'){
		renHtml = renderButtonUI(prefix, 'fas fa-paperclip', 'Attach', 'button-file-browser');
	}else if(prefix == 'EX'){
		renHtml = renderButtonUI(prefix, 'fas fa-file-export', 'Export', 'button');
	}else if(prefix == 'IM'){
		renHtml = renderButtonUI(prefix, 'fas fa-file-import', 'Import', 'button');
	}else if(prefix == 'PR'){
		renHtml = renderButtonUI(prefix, 'fas fa-print', 'Print', 'button');
	}else if(prefix == 'LP'){
		renHtml = renderButtonUI(prefix, 'fas fa-print', 'Label Print', 'button');
	}else if(prefix == 'SV'){
		renHtml = renderButtonUI(prefix, 'fas fa-check-circle', 'Save', 'button');
	}else if(prefix == 'FSV'){
		renHtml = renderButtonUI(prefix, 'fas fa-check-circle', 'Final Save', 'button');
	}else if(prefix == 'SN'){
		renHtml = renderButtonUI(prefix, 'fas fa-paper-plane', 'Send', 'button');
	}else if(prefix == 'CN'){
		renHtml = renderButtonUI(prefix, 'fas fa-times-circle', 'Cancel', 'button');
	}else if(prefix == 'MO' || prefix.indexOf('MO') > -1){
		renHtml = renderButtonUI(prefix, 'fas fa-chevron-down', 'More', 'button-with-menulist');
	}else if(prefix == 'AR'){
		renHtml = renderButtonUI(prefix, 'fas fa-archive', 'Archive', 'icononly-title-left');
		//renHtml = '<div class="wms-srv-grid-common-action"><a href="#" onclick="archiveUnarchieve();" data-prefix="'+ prefix +'"><i class="fas fa-archive"></i></a></div>';
	}else if(prefix == 'MKCM'){
		renHtml = renderButtonUI(prefix, 'fas fa-clipboard-check', 'Mark as Complete', 'link');
	}else if(prefix == 'CLR'){
		renHtml = renderButtonUI(prefix, 'fas fa-times-circle', 'Clear', 'button');
	}else if(prefix == 'CO'){
		renHtml = renderButtonUI(prefix, 'fas fa-times-circle', 'Cancel Order', 'link');
	}else if(prefix == 'CG'){
		renHtml = renderButtonUI(prefix, 'fas fa-edit', 'Customize Grid', 'icononly-title-left');
		//renHtml = '<div class="wms-srv-grid-common-action"><a href="#" onclick="showWmsSrvPopup(\'customizegrid\');" data-prefix="'+ prefix +'"><i class="fas fa-edit"></i></a></div>';
	}else if(prefix == 'SE'){
		renHtml = renderButtonUI(prefix, 'fas fa-search', 'Search Filter', 'grid-search');
	}else if(prefix == 'PRSE'){
		renHtml = renderButtonUI(prefix, 'fas fa-search', 'Search Product', 'product-search');
	}/*else if(prefix == 'SE'){
		renHtml = '<a href="#" title="Document"><i class="fas fa-file-alt"></i>'+ badgeCount +'</a>';
	} */
	return renHtml;
}

function renderButtonUI(prefix, icon, label, type){
	var buttonUI = '';
	if(type == 'button' || type == 'button-highlight'){
		var highlightCSS = '';
		if(type == 'button-highlight'){
			 highlightCSS = 'wms-srv-highlight-btn';
		}
		buttonUI = '<button class="wms-srv-input wms-srv-button '+ highlightCSS +'" title="'+ label +'" data-prefix="'+ prefix +'"><i class="'+ icon +'"></i><span>'+ label +'</span></button>';
	}else if(type == 'button-file-browser'){
		buttonUI = '<span id="wms-srv-attachment-files"></span><label class="wms-srv-input wms-srv-button" for="wms-srv-ctrl-file-upload" title="'+ label +'" data-prefix="'+ prefix +'"><i class="'+ icon +'"></i><span>'+ label +'</span></label><input type="file" id="wms-srv-ctrl-file-upload" data-srvpath="">';
	}else if(type == 'link'){
		buttonUI = '<a href="#" data-prefix="'+ prefix +'"><i class="'+ icon +'"></i> '+ label +'</a>';
	}else if(type == 'icononly' || type == 'icononly-title-left'){
		if(prefix.indexOf('(') > -1){
			var badgeCount = '';
			var extractBadge = prefix.split('(');
			badgeCount = '<span class="wms-srv-badge">' + extractBadge[1].replace(')','') + '</span>';
			var prefix = extractBadge[0];
			// Icon with Badge...
			buttonUI = '<a href="#" title="'+ label +'" data-prefix="'+ prefix +'" class="wms-srv-icononly"><i class="'+ icon +'"></i>'+ badgeCount +'</a>';
		}else{
			buttonUI = '<a href="#" title="'+ label +'" data-prefix="'+ prefix +'" class="wms-srv-icononly"><i class="'+ icon +'"></i></a>';
		}
		if(type == 'icononly-title-left'){
			var applyHolder = '<div class="wms-srv-grid-common-action">'+ buttonUI +'</div>';
			buttonUI = applyHolder;			
		}
	}else if(type == 'button-with-menulist'){
		buttonUI = '<div class="wms-srv-more-btn-holder"><button class="wms-srv-input wms-srv-button wms-srv-highlight-btn-secondary" title="'+ label +'"  data-prefix="'+ prefix +'"><span>'+ label +'</span><i class="'+ icon +'"></i></button><div class="wms-srv-grid-more-navbar" style="display:none;">'
		if(prefix.indexOf('[') > -1){
			var breakPrefix = prefix.split('[');
			var filterPrefixOption = breakPrefix[1].replace(']', '');
			var getMoreOptions = filterPrefixOption.split('--wmscmm--');
			for(var op = 0; op < getMoreOptions.length; op++){
				buttonUI += renderControl(getMoreOptions[op].trim());
			}
		}
		buttonUI +='</div></div>';
	}else if(type == 'grid-search'){
		var wmsDate = new Date();
		var wmsYear = wmsDate.getFullYear();
		var wmsMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		
		buttonUI += '<div class="wms-srv-search">';
		buttonUI += '<label>' + label + ': </label>';
		buttonUI += '<select type="text" class="wms-srv-input wms-srv-search-filter">';
		buttonUI += '<option>-- Filters --</option>';
		buttonUI += '</select>';
		buttonUI += ' <input type="text" value="" class="wms-srv-input wms-srv-simple-search" /><a href="#" data-prefix="'+ prefix +'"><i class="'+ icon +'"></i></a>';
		buttonUI += '</div> ';
		buttonUI += '<select type="text" class="wms-srv-input wms-srv-search-by-year">';
		buttonUI += '<option value="">-- Select Month --</option>';
		var ddlValue = '';
		for(var i=0; i < 12; i++){
			ddlValue = wmsMonths[i] + ' ' + wmsYear;
			buttonUI += '<option value="' + ddlValue + '">' + ddlValue + '</option>';
		}
		buttonUI += '</select>';
		buttonUI += '<select type="text" class="wms-srv-input wms-srv-search-by-prev-year">';
		buttonUI += '<option value="">-- Select Month --</option>';
		var previousStartYear = wmsYear - 1;
		for(var pYear=previousStartYear; pYear > (wmsYear - 11); pYear--){
			for(var i = 11; i > -1; i--){
				ddlValue = wmsMonths[i] + ' ' + pYear;
				buttonUI += '<option value="'+ ddlValue +'">' + ddlValue + '</option>';
			}
		}
		buttonUI += '</select>';
	}else if(type == 'barcodescan'){
		buttonUI += '<div class="wms-srv-barcodescan" data-sku="" data-skuid="" data-pallet="" data-palletid="" data-location="" data-locationid="">';
		buttonUI += '<label>' + label + ': </label>';
		buttonUI += ' <input type="text" value="" class="wms-srv-input wms-srv-scan-input" /><a href="#" data-prefix="'+ prefix +'"  data-isactive="yes" class="wms-srv-scan-button" onclick="return false;"><i class="'+ icon +'"></i></a>';
		buttonUI += ' <input type="checkbox" value="" checked="checked" /> Without Scan';
		buttonUI += '</div>';
	}else if(type == 'product-search'){
		buttonUI += '<div class="wms-srv-productsearch" data-sku="" data-skuid="" data-pallet="" data-palletid="" data-location="" data-locationid="">';
		buttonUI += '<label>' + label + ': </label>';
		buttonUI += ' <input type="text" value="" class="wms-srv-input wms-srv-scan-input" /><a href="#" data-prefix="'+ prefix +'" class="wms-srv-search-button" onclick="return false;"><i class="'+ icon +'"></i></a>';
		buttonUI += '</div>';
	}
	return buttonUI;
}
// END OF GRID CONTROLS...
function showWmsAlert(alertTitle, alertMsg, alertType){
	$('.wms-alert-title').html(alertTitle);
	$('.wms-alert-message').html(alertMsg);
	$('.wms-srv-alert-popup').data('type', alertType);
	$('.wms-srv-alert-popup').fadeIn("slow");
	setTimeout(hideWMSAlert, 2000);
}
function hideWMSAlert(){
	$('.wms-srv-alert-popup').fadeOut("slow");
}
function clearSuggestionList(){
	$('.wms-srv-suggestion-list').remove();
}

function activateDeactiveWithScan(myCallObject){
	var placeDataHolder = myCallObject.wmsDataHolder;
	var mainObj = myCallObject.global_main_obj;
	var childObj = myCallObject.global_child_object;
	var detailObj = myCallObject.global_detail_object;
	var sKey = myCallObject.global_search_key;
	
	var isWithoutScan = $('#'+ placeDataHolder +' .wms-srv-barcodescan input[type="checkbox"]').prop('checked');
	var objScanInput = $('#'+ placeDataHolder +' .wms-srv-barcodescan .wms-srv-scan-input');
	var objScanButton = $('#'+ placeDataHolder +' .wms-srv-barcodescan .wms-srv-scan-button');
	
	// FOR CYCLE COUNT
	if(mainObj == 'CycleCount' && detailObj == 'CyclePlanUpdate' && sKey == 'Pending'){
		//ProcessCycleCountBarcode(scanType, scanLabel, scanId, currentObj);
		
	// FOR RECEIVING
	}else if(mainObj == 'Inbound' && childObj == 'Receiving' && detailObj == 'PO' && sKey == 'Pending'){
		$('#'+ placeDataHolder +' .wms-srv-grid .wms-srv-grid-row').each(function(){
			var indexReceivingQty = myCallObject.o_findDetailHeaderIndex('Receive Qty');
			var indexPallet = myCallObject.o_findDetailHeaderIndex('Pallet');
			var objReceivingQty = $(this).find('.wms-srv-grid-cell').eq(indexReceivingQty).find('input');
			var objPallet = $(this).find('.wms-srv-grid-cell').eq(indexPallet).find('input');
			if(isWithoutScan){
				$(objReceivingQty).prop('disabled', false);
				$(objPallet).prop('disabled', false);
			}else{
				$(objReceivingQty).prop('disabled', true);
				$(objPallet).prop('disabled', true);
			}
		});
	// FOR PUT AWAY
	}else if(mainObj == 'Inbound' && childObj == 'Put Away' && detailObj == 'PO' && sKey == 'Pending'){
		$('#'+ placeDataHolder +' .wms-srv-grid .wms-srv-grid-row').each(function(){
			var indexLocation = myCallObject.o_findDetailHeaderIndex('Location');
			var objLocation = $(this).find('.wms-srv-grid-cell').eq(indexLocation).find('input');
			if(isWithoutScan){
				$(objLocation).prop('disabled', false);
			}else{
				$(objLocation).prop('disabled', true);
			}
		});
	}	
	// Disable Search TextBox
	if(isWithoutScan){
		$(objScanInput).prop('disabled', false);
		$(objScanButton).data('isactive', 'yes');
		$(objScanButton).css('opacity', '1');
	}else{
		$(objScanInput).prop('disabled', true);
		$(objScanButton).data('isactive', 'no');
		$(objScanButton).css('opacity', '0.5');
	}
}
function getWarehouseListDropDownHtml(){
	var getWarehouseList = localStorage.getItem("warehouselist");
	var ddHtml = '';
	ddHtml += '<select class="wms-srv-input">';
	ddHtml += '<option value="">--Select Warehouse--</option>';
	// Generate DropDown Options
	var breakOptions = getWarehouseList.split('|');
	for(var i = 0; i < breakOptions.length; i++){
		var breakOptionVal = breakOptions[i].split(':');
		var isSelected = '';
		ddHtml += '<option value="'+ breakOptionVal[0] +'" '+ isSelected +'>'+ breakOptionVal[1] +'</option>';
	}
	// Generate DropDown Options
	ddHtml += '</select>';
	return ddHtml;
}

function validateEmailAddress(emailVal) {
    var isEmailValid = true;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailVal.match(mailformat)) {
        isEmailValid = true;
    }
    else {
        isEmailValid = false;
    }
    return isEmailValid;
}

function validatePhoneNo(phoneNoVal) {
    var phonePattern = /^\d{10}$/;
    if (phoneNoVal.match(phonePattern)){
        return true;
    }
    else {
        return false;
    }
}

/*
 VALIDATE WITH COUNTRY PREFIX
 Example
    +XX-XXXX-XXXX
    +XX.XXXX.XXXX
    +XX XXXX XXXX
 */

function validatePhoneWithCountryPrefix(phoneNoVal) {
    var phonePattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (phoneNoVal.match(phonePattern)){
        return true;
    } else {
        return false;
    }
}

/*
 VALIDATE WITHOUT COUNTRY PREFIX
 Example
    XXX-XXX-XXXX
    XXX.XXX.XXXX
    XXX XXX XXXX
 */
function validatePhoneWithoutPrefix(phoneNoVal) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNoVal.match(phoneno)){
        return true;
    }else {
        alert("message");
        return false;
    }
}

function validateIsNumber(num) {
    var isNumber = true;
    var chkNum = Number.isNaN(Number(num) / 1);
    if (chkNum) {
        isNumber = false;
    } else {
        var roundNo = Math.round(num);
        var chkNo = Number(num);
        if (roundNo != chkNo) {
            isNumber = false;
        }
    }
    return isNumber;
}

function validateIsFloatNumber(num) {
    var isFloatNumber = true;
    var chkNum = Number.isNaN(Number(num) / 1);
    if (chkNum) {
        isFloatNumber = false;
    } else {
        var strNum = num.toString();
        if (strNum.indexOf('.') > -1) {
            var breakDot = strNum.split('.');
            if (breakDot.length == 2) {
                isFloatNumber = true;
            } else {
                isFloatNumber = false;
            }
        } else {
            isFloatNumber = false;
        }
    }
    return isFloatNumber;
}

function getAppointmentOrginalWorkflow(newWorkflowName) {
    var originalName = '';
    if (newWorkflowName == 'Bobtail/Trailer') {
        originalName = 'Standard';
    } else if (newWorkflowName == 'Transload') {
        originalName = 'CrossDock';
    } else {
        originalName = newWorkflowName;
    }
    return originalName;
}

function getAppointmentNewWorkflow(newWorkflowName) {
    var newName = '';
    if (newWorkflowName == 'Standard') {
        newName = 'Bobtail/Trailer';
    } else if (newWorkflowName == 'CrossDock') {
        newName = 'Transload';
    } else {
        newName = newWorkflowName;
    }
    return newName;
}