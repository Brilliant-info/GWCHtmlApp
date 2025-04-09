//var apiFolder = 'http://localhost:50068/';
//var apiFolder = 'http://173.212.244.46/WebAPITest/';
//var wmsApiPath = apiFolder + 'api/staging/v1/';

var importObject = "";
var templateId = '0';
var hdnsrchlocatnid = '0';
var hdnsrchpalletid = '0';
var getUserId = mBrillWmsSession.getUserId();
var companyid = mBrillWmsSession.getCompanyId();
var getCustomerId = $("#ddlcustomer").val();// mBrillWmsSession.getCustomerId();  // 1;//$("#ddlcustomer").val();
var getWarehouseId = $('#ddlwarehouse').val();
var selectedsku = "";
var CurrentPage = 1;
var adskuid = '', adlocationid = '', adpalletid = '', adavailqty, adlot1 = '0', adlot2 = '0', adlot3 = '0', adlot4 = '0', adlot5 = '0', adlot6 = '0', adlot7 = '0', adlot8 = '0', adlot9 = '0', adlot10 = '0';
var Trnsskuid = '', Trnslocationid = '', Trnspalletid = '', Trnslot1 = '', Trnslot2 = '', Trnslot3 = '', Trnslot4 = '', Trnslot5 = '', Trnslot6 = '', Trnslot7 = '', Trnslot8 = '', Trnslot9 = '', Trnslot10 = '', tranavailQty = '';
var getglobalMID = '0';
var SKuSearchvalue = '';
var searchfilter = "0";
var searchvalue = "0";
var GetPalletBusinesRule = "YES";
var GetStockAdjustmentBusinesRule = "NO";

wmsLoadLayout(function () {
	getinventorylistgrid();
	//  init();
});

function Getbusinessrule() {
	debugger;
	//var LocalAPIPath = 'http://localhost:50068/api/staging/v1/';
	//apiPath = LocalAPIPath + 'Inventory/GetInvBusinessrule';
	apiPath = wmsApiPath + 'Inventory/GetInvBusinessrule';
	var postData =
	{
		"warehouseid": getWarehouseId,
		"customerid": getCustomerId,
		"UserID": getUserId
	};
	callHttpUrl(apiPath, postData, function (data) {
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") {
			GetPalletBusinesRule = getresult.Table[0].Active;
			/*if(getresult.Table1.length != 0){
				GetStockAdjustmentBusinesRule = getresult.Table1[0].Active;
			}*/
		}
	});
}
function clearSearchFilter() {
	$('#txtSearchSkuInventry').val('ALL');
	$('#txtSearchSkuInventry').val('');
	getinventorylistgrid();
}
function getSelectedCheckbox() {
	var selectedIds = '';
	$('.chkInventorySnapshot').each(function () {
		var isSelected = $(this).prop('checked');
		var myVal = $(this).val();
		if (isSelected) {
			if (selectedIds == '') {
				selectedIds = myVal;
			} else {
				selectedIds = selectedIds + ',' + myVal;
			}
		}
	});
	//alert(selectedIds);
	return selectedIds;
}
function getSelectedradiobutton() {
	var selectedlocIds = '';
	$('.chkInventorySnapshot').each(function () {
		var isSelected = $(this).prop('checked');
		var myVal = $(this).val();
		if (isSelected) {
			if (selectedlocIds == '') {
				selectedlocIds = myVal;
			} else {
				selectedlocIds = selectedlocIds + ',' + myVal;
			}
		}
	});
	//alert(selectedlocIds);
	return selectedlocIds;
}
function clearSearchFilter() {
	$('#txtSearchSkuInventry').val('ALL');
	$('#txtSearchSkuInventry').val('');
	getinventorylistgrid();
}
function getinventorylistgrid() {
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetInventoryList';
	//var getCurrentPage = 1;
	var getRecordLimit = 100;
	var getFilter = SKuSearchvalue;

	var postData =
	{
		"CurrentPage": CurrentPage,
		"RecordLimit": getRecordLimit,
		"UserId": getUserId,
		"CustomerId": getCustomerId,
		"WarehouseId": getWarehouseId,
		"Filter": getFilter

	};

	callHttpUrl(apiPath, postData, function (data) {
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") {
			var totalrowcount = getresult.Table[0].RecCount;
			var getinventrylist = getresult.Table1;
			var gridTable = '';

			gridTable = gridTable + '<div class="wms-srv-grid-header">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">UPC Code</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Name</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Category</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Total</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Available</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Allocated</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Hold</div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Rejected</div>';
			gridTable = gridTable + '</div>';

			/*gridTable = gridTable + '<div class="wms-srv-grid-row">';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"></div>';                          
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';                    
			gridTable = gridTable + '</div>';   */


			for (var il = 0; il < getinventrylist.length; il++) {
				var getrowno = getinventrylist[il].rownumber;
				var getskuid = getinventrylist[il].TID;
				var getSkuCode = getinventrylist[il].SkuCode;
				var getUPCCode = getinventrylist[il].UPCCode;
				var getSkuName = getinventrylist[il].SkuName;
				var getCategory = getinventrylist[il].Category;
				var getTotal = getinventrylist[il].Total;
				var getAvailable = getinventrylist[il].Available;
				var getAllocated = getinventrylist[il].Allocated;
				var getholdqty = getinventrylist[il].holdqty;
				var getRejected = getinventrylist[il].Rejected;

				gridTable = gridTable + '<div id="divinvntrylstrow ' + getskuid + '" class="wms-srv-grid-row wms-align">'; gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="Checkbox" name ="check" class="chkInventorySnapshot" id="' + getskuid + '"  class="messageCheckbox" value="' + getskuid + '"></div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSkuCode + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getUPCCode + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSkuName + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getCategory + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getTotal + '</div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell inventory" style="text-align:center;"> <a href="#" title="" data-prefix="" onclick="openavailableinventorydetails(' + getskuid + ');">' + getAvailable + '</a></div>';
				gridTable = gridTable + '<div class="wms-srv-grid-cell inventory" style="text-align: center;"><a href="#" title="" data-prefix="" onclick="openallocatedinventorydetails(' + getskuid + ');"> ' + getAllocated + ' </a></div>';

				gridTable = gridTable + '<div class="wms-srv-grid-cell inventory" style="text-align: center;"><a href="#" title="" data-prefix="" onclick="openholdinventorydetails(' + getskuid + ');"> ' + getholdqty + ' </a> </div>';

				gridTable = gridTable + '<div class="wms-srv-grid-cell inventory" style="text-align: center;"><a href="#" title="" data-prefix="" onclick="openrejectedinventory(' + getskuid + ');"> ' + getRejected + ' </a> </div>'
				gridTable = gridTable + '</div>';
			}

			$('#tblinventrylistgrid').html(gridTable);
			Getbusinessrule();
			setupGridPagingList('AllinvenreylistPager', CurrentPage, totalrowcount, getinventorylistgrid);		//,invskuid		 
		}
		else {
			alert('Something went wrong.');
		}
	});
}

function openavailableinventorydetails(skuid) {
	CurrentPage = 1;
	getavailableinventry(skuid);
	$('#wms-srv-availableinventorydetails-popup').show();
	$('#wms-srv-availableinventorydetails-popup-close').off();
	$('#wms-srv-availableinventorydetails-popup-close').click(function () {
		$('#wms-srv-availableinventorydetails-popup').hide();
	});
}

function getavailableinventry(availskuid) {
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetAvailInventoryList';
	var getCurrentPage = 1;
	var getRecordLimit = 10;
	var getSkuId = availskuid;
	var getFilter = '';

	var postData =
	{
		"CurrentPage": CurrentPage,
		"RecordLimit": getRecordLimit,
		"UserId": getUserId,
		"CustomerId": getCustomerId,
		"WarehouseId": getWarehouseId,
		"SkuId": getSkuId,
		"Filter": getFilter

	};

	callHttpUrl(apiPath, postData, function (data) {
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") {
			var getLottable = mBrillWmsSession.getCustomerLottable();
			var breakCustLot = getLottable.split(',');
			//alert(getresult);			  
			var totalrowcount = getresult.Table[0].RecCount;
			/*var allrowcount = getresult.Table;
		   for(var al=0; il < allrowcount.length; al++)
		   {
			   var rowcount = allrowcount[il].reccount;
		   }*/
			var getavailinventrylist = getresult.Table1;
			var getreasonlist = getresult.Table2;
			var availgridTable = '';
			availgridTable = availgridTable + '<div class="wms-srv-grid-header">';

			availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
			availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">UPC Code</div>';
			availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Batch Code</div>';
			availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>';
			if (GetPalletBusinesRule == "YES") {
				availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet</div>';
			}
			// availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Lottable</div>';
			for (var pl = 0; pl < breakCustLot.length; pl++) {
				var custLotLabel = breakCustLot[pl];
				availgridTable = availgridTable + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + custLotLabel + '">' + custLotLabel + '</div>';
			}
			availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Available Qty</div>';
			availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
			availgridTable = availgridTable + '</div>';

			/* availgridTable = availgridTable + '<div class="wms-srv-grid-row">';                          
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';                    
			 availgridTable = availgridTable + '</div>';  */

			for (var il = 0; il < getavailinventrylist.length; il++) {
				var getrowno = getavailinventrylist[il].rownumber;
				var getskuid = getavailinventrylist[il].SkuId;
				var getSkuCode = getavailinventrylist[il].Skucode;
				var getUPCCode = getavailinventrylist[il].UPCCode;
				var getBatchCode = "";
				if (getavailinventrylist[il].BatchCode != null) {
					getBatchCode = getavailinventrylist[il].BatchCode;
				}

				var getLocation = getavailinventrylist[il].location;
				var getlocationid = getavailinventrylist[il].LocationID;
				var getpallet = getavailinventrylist[il].pallet;
				var getMID = getavailinventrylist[il].MID;
				var getpalletid = 0;
				if (GetPalletBusinesRule == "YES") {
					getpalletid = getavailinventrylist[il].palletid;
				}

				var getlot1 = '0'; var getlot2 = "0"; var getlot3 = "0";
				var getlot4 = '0'; var getlot5 = "0"; var getlot6 = "0";
				var getlot7 = '0'; var getlot8 = "0"; var getlot9 = "0"; var getlot10 = "0";
				if (getavailinventrylist[il].lot1 != 0) {
					getlot1 = getavailinventrylist[il].lot1;
				}
				if (getavailinventrylist[il].lot2 != 0) {
					getlot2 = getavailinventrylist[il].lot2;
				}
				if (getavailinventrylist[il].lot3 != 0) {
					getlot3 = getavailinventrylist[il].lot3;
				}
				if (getavailinventrylist[il].lot4 != 0) {
					getlot4 = getavailinventrylist[il].lot4;
				}
				if (getavailinventrylist[il].lot5 != 0) {
					getlot5 = getavailinventrylist[il].lot5;
				}
				if (getavailinventrylist[il].lot6 != 0) {
					getlot6 = getavailinventrylist[il].lot6;
				}
				if (getavailinventrylist[il].lot7 != 0) {
					getlot7 = getavailinventrylist[il].lot7;
				}
				if (getavailinventrylist[il].lot8 != 0) {
					getlot8 = getavailinventrylist[il].lot8;
					//alert(getlot8);
				}
				if (getavailinventrylist[il].lot9 != 0) {
					getlot9 = getavailinventrylist[il].lot9;
				}
				if (getavailinventrylist[il].lot10 != 0) {
					getlot10 = getavailinventrylist[il].lot10;
				}
				var getAvailable = getavailinventrylist[il].Available;

				var getlottable = "";
				// if(getlot1 !="0" && getLot2 != "0" && getlot3 !="0")
				// {
				getlottable = getlot1 + ', ' + getlot2 + ', ' + getlot3 + ', ' + getlot4 + ', ' + getlot5 + ', ' + getlot6 + ', ' + getlot7 + ', ' + getlot8 + ', ' + getlot9 + ', ' + getlot10;
				// }



				availgridTable = availgridTable + '<div id="divinvntrylstrow ' + getskuid + '" class="wms-srv-grid-row wms-align">';
				availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSkuCode + '</div>';
				availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getUPCCode + '</div>';
				availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getBatchCode + '</div>';
				availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLocation + '</div>';
				if (GetPalletBusinesRule == "YES") {
					availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getpallet + '</div>';
				}
				// availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getlottable +'</div>';
				for (var pi = 0; pi < breakCustLot.length; pi++) {
					var custLotLabel = breakCustLot[pi];
					//var custLotVal = getLottableGroup[pi];
					var lotNum = pi + 1;
					var custLotVal = getavailinventrylist[il]["lot" + lotNum];

					if (custLotVal != null && custLotVal.trim() == '0') {
						custLotVal = '';
					}
					availgridTable = availgridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + pi + '" data-lottype="' + custLotLabel + '" style="width: 82px; text-align: center;">' + custLotVal + '</div>';
				}
				availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getAvailable + '</div>';
				availgridTable = availgridTable + '<div class="wms-srv-grid-cell">';
				availgridTable = availgridTable + '<div class="wms-srv-grid-action">';
				availgridTable = availgridTable + '<a href="#" title="Hold" class="wms-srv-icononly" onclick="hold(' + getskuid + ',' + getlocationid + ',' + getpalletid + ',\'' + getlot1 + '\',\'' + getlot2 + '\',\'' + getlot3 + '\',\'' + getlot4 + '\',\'' + getlot5 + '\',\'' + getlot6 + '\',\'' + getlot7 + '\',\'' + getlot8 + '\',\'' + getlot9 + '\',\'' + getlot10 + '\');"><i class="fas fa-pause-circle"></i></a>';

				availgridTable = availgridTable + '<div class="wms-srv-action-sep"> | </div>';

				availgridTable = availgridTable + '<a href="#" title="Transfer" class="wms-srv-icononly" onclick="opentransferplan(' + getMID + ',' + getskuid + ',' + getlocationid + ',' + getpalletid + ',\'' + getlot1 + '\',\'' + getlot2 + '\',\'' + getlot3 + '\',\'' + getlot4 + '\',\'' + getlot5 + '\',\'' + getlot6 + '\',\'' + getlot7 + '\',\'' + getlot8 + '\',\'' + getlot9 + '\',\'' + getlot10 + '\',' + getAvailable + ');"><i class="fas fa-exchange-alt"></i></a>';

				availgridTable = availgridTable + '<div class="wms-srv-action-sep"> | </div>';

				//availgridTable = availgridTable + '<a href="#" title="Adjustment" class="wms-srv-icononly" onclick="openadjustmentplan('+ getskuid +','+ getlocationid +','+ getpalletid +',\''+ getlot1 +'\',\''+ getlot2 +'\',\''+ getlot3 +'\',\''+ getlot4 +'\',\''+ getlot5 +'\',\''+ getlot6 +'\',\''+ getlot7 +'\',\''+ getlot8 +'\',\''+ getlot9 +'\',\''+ getlot10 +'\','+ getAvailable +');"><i class="fas fa-sliders-h"></i></a>';
				if (getresult.Table3.length != 0) {
					GetStockAdjustmentBusinesRule = getresult.Table3[0].Active;
				}
				if (GetStockAdjustmentBusinesRule == 'YES') {
					var GetUserType = getresult.Table4[0].UserType;
					if (GetUserType == 'Admin') {
						availgridTable = availgridTable + '<a href="#" title="Adjustment" class="wms-srv-icononly" onclick="openadjustmentplan(' + getskuid + ',' + getlocationid + ',' + getpalletid + ',\'' + getlot1 + '\',\'' + getlot2 + '\',\'' + getlot3 + '\',\'' + getlot4 + '\',\'' + getlot5 + '\',\'' + getlot6 + '\',\'' + getlot7 + '\',\'' + getlot8 + '\',\'' + getlot9 + '\',\'' + getlot10 + '\',' + getAvailable + ');"><i class="fas fa-sliders-h"></i></a>';
					} else {
						availgridTable = availgridTable + '<a href="#" title="Adjustment"  class="wms-srv-icononly" style="pointer-events: none; color: grey;" onclick="return false;"><i class="fas fa-sliders-h"></i></a>';
					}

				} else {
					availgridTable = availgridTable + '<a href="#" title="Adjustment" class="wms-srv-icononly" onclick="openadjustmentplan(' + getskuid + ',' + getlocationid + ',' + getpalletid + ',\'' + getlot1 + '\',\'' + getlot2 + '\',\'' + getlot3 + '\',\'' + getlot4 + '\',\'' + getlot5 + '\',\'' + getlot6 + '\',\'' + getlot7 + '\',\'' + getlot8 + '\',\'' + getlot9 + '\',\'' + getlot10 + '\',' + getAvailable + ');"><i class="fas fa-sliders-h"></i></a>';
				}
				availgridTable = availgridTable + '</div>';
				availgridTable = availgridTable + '</div>';
				availgridTable = availgridTable + '</div>';
			}
			$('#tblavailinventrylistgrid').html(availgridTable);
			$("#ddladjustfilter").html('');
			if (getreasonlist.length > 0) {
				for (var i = 0; i < getreasonlist.length; i++) {
					var getcatedName = getreasonlist[i].ReasonCode;
					var getcatedId = getreasonlist[i].Id;
					$("#ddladjustfilter").append('<option value = "' + getcatedId + '">' + getcatedName + '</option>');
				}
			}

			showHideLotCellForInvtListRow('tblavailinventrylistgrid');
			setupGridPagingList('AvailinvenreylistPager', CurrentPage, totalrowcount, function () {
				getavailableinventry(availskuid);
			}, 10); //

		}
		else {
			alert('Something went wrong.');
		}
	});
}

function showHideLotCellForInvtListRow(objId) {
	var getTotalLotRowCount = $('#' + objId + ' .wms-srv-grid-row ').length;
	$('#' + objId + ' .gridCellLottable').show();
	for (var l = 0; l < 10; l++) {
		// CHECK FOR VIEW ONLY EMPTY CELL
		var totalCell = $('#' + objId + ' .wms-srv-grid-row .gridCellLottable[data-lotindex="' + l + '"]').length;
		var totalEmptyCell = $('#' + objId + ' .wms-srv-grid-row .gridCellLottable[data-lotindex="' + l + '"]:empty').length;

		if (totalCell > 0) {
			if (totalCell != totalEmptyCell) {
				$('#' + objId + ' .gridCellLottable[data-lotindex="' + l + '"]').show();
			} else {
				$('#' + objId + ' .gridCellLottable[data-lotindex="' + l + '"]').hide();
			}
		} else {
			$('#' + objId + ' .gridCellLottable[data-lotindex="' + l + '"]').hide();
		}
	}
}

function openallocatedinventorydetails(skuid) {
	CurrentPage = 1;
	getallocatedinventry(skuid);
	$('#wms-srv-allocatedinventorydetails-popup').show();
	$('#wms-srv-allocatedinventorydetails-popup-close').off();
	$('#wms-srv-allocatedinventorydetails-popup-close').click(function () {
		$('#wms-srv-allocatedinventorydetails-popup').hide();
	});
}

function getallocatedinventry(availskuid) {
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetAllocateInventoryList';
	var getRecordLimit = 10;
	var getSkuId = availskuid;
	var getFilter = '';

	var postData =
	{
		"CurrentPage": CurrentPage,
		"RecordLimit": getRecordLimit,
		"UserId": getUserId,
		"CustomerId": getCustomerId,
		"WarehouseId": getWarehouseId,
		"SkuId": getSkuId,
		"Filter": getFilter
	};
	callHttpUrl(apiPath, postData, function (data) {
		var getLottable = mBrillWmsSession.getCustomerLottable();
		var breakCustLot = getLottable.split(',');

		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") {
			var totalrowcount = getresult.Table[0].RecCount;
			var getalocatinventrylist = getresult.Table1;
			var alctgridTable = '';

			alctgridTable = alctgridTable + '<div class="wms-srv-grid-header">';

			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Order ID</div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Order Number</div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Order Date</div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Allocated Date</div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>';

			if (GetPalletBusinesRule == "YES") {
				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet</div>';
			}


			// alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Lottable</div>';
			for (var pl = 0; pl < breakCustLot.length; pl++) {
				var custLotLabel = breakCustLot[pl];
				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + custLotLabel + '">' + custLotLabel + '</div>';
			}

			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Allocated Qty</div>';
			// alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">DeAllocated</div>';
			alctgridTable = alctgridTable + '</div>';


			/*alctgridTable = alctgridTable + '<div class="wms-srv-grid-row">';                          
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';                    
			alctgridTable = alctgridTable + '</div>'; */

			for (var il = 0; il < getalocatinventrylist.length; il++) {
				var getrowno = getalocatinventrylist[il].rownumber;
				var getOrderID = getalocatinventrylist[il].OrderID;
				var getOrderNumber = getalocatinventrylist[il].OrderNumber;
				var getOrderDate = getalocatinventrylist[il].OrderDate;
				//var getCancelDate = getalocatinventrylist[il].CancelDate;
				var getcreationdate = getalocatinventrylist[il].creationdate;
				var getProductCode = getalocatinventrylist[il].ProductCode;
				var getskuid = getalocatinventrylist[il].skuid;
				var getLocationCode = getalocatinventrylist[il].LocationCode;
				var getlocid = getalocatinventrylist[il].locid;

				var getpalletid = getalocatinventrylist[il].palletid;
				var getPalletName = getalocatinventrylist[il].PalletName;
				var getAllocateqty = getalocatinventrylist[il].Allocateqty;

				var getlot1 = "0"; var getLot2 = "0"; var getlot3 = "0";
				if (getalocatinventrylist[il].Lottable1 != 0) {
					getlot1 = getalocatinventrylist[il].Lottable1;
				}
				if (getalocatinventrylist[il].Lottable2 != null) {
					getLot2 = getalocatinventrylist[il].Lottable2;
				}
				if (getalocatinventrylist[il].Lottable3 != null) {
					getlot3 = getalocatinventrylist[il].Lottable3;
				}

				var getlottable = "";
				getlottable = getlot1 + ', ' + getLot2 + ', ' + getlot3;

				alctgridTable = alctgridTable + '<div id="divinvntrylstrow ' + getskuid + '" class="wms-srv-grid-row wms-align">';
				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getOrderID + '</div>';
				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getOrderNumber + '</div>';
				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getOrderDate + '</div>';
				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getcreationdate + '</div>';
				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getProductCode + '</div>';
				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLocationCode + '</div>';
				if (GetPalletBusinesRule == "YES") {
					alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getPalletName + '</div>';
				}

				//alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getlottable +'</div>';	
				for (var pi = 0; pi < breakCustLot.length; pi++) {
					var custLotLabel = breakCustLot[pi];
					//var custLotVal = getLottableGroup[pi];
					var lotNum = pi + 1;
					var custLotVal = getalocatinventrylist[il]["lot" + lotNum];

					if (custLotVal != null && custLotVal.trim() == '0') {
						custLotVal = '';
					}
					alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + pi + '" data-lottype="' + custLotLabel + '" style="width: 82px; text-align: center;">' + custLotVal + '</div>';
				}

				alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getAllocateqty + '</div>';
				/*alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell">';
				alctgridTable = alctgridTable  + '<div class="wms-srv-grid-action">';				 
				alctgridTable = alctgridTable  + '<a href="#" title="Cancel" class="wms-srv-cancel" data-prefix="CN" ><i class="fas fa-times-circle" onclick="cancel('+ getskuid +','+ getlocid +','+ getpalletid +',\''+ getlot1 +'\',\''+ getLot2 +'\',\''+ getlot3 +'\','+ getOrderID +','+ getAllocateqty +');"></i></a>';  				 				 			 		                
				alctgridTable = alctgridTable  + '</div>';*/
				alctgridTable = alctgridTable + '</div>';
				alctgridTable = alctgridTable + '</div>';
			}
			$('#tblalocatinventrylistgrid').html(alctgridTable);
			showHideLotCellForInvtListRow('tblalocatinventrylistgrid');

			setupGridPagingList('AllocatinvenreylistPager', CurrentPage, totalrowcount, getallocatedinventry, availskuid);
		}
		else {
			alert('Something went wrong.');
		}
	});
}

function openholdinventorydetails(skuid) {
	CurrentPage = 1;
	getholdinventry(skuid);
	$('#wms-srv-holdinventorydetails-popup').show();
	$('#wms-srv-holdinventorydetails-popup-close').off();
	$('#wms-srv-holdinventorydetails-popup-close').click(function () {
		$('#wms-srv-holdinventorydetails-popup').hide();
	});
}

function getholdinventry(holdskuid) {
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetHoldInventoryList';
	//var getCurrentPage = 1;
	var getRecordLimit = 10;
	var getSkuId = holdskuid;
	var getFilter = '';

	var postData =
	{
		"CurrentPage": CurrentPage,
		"RecordLimit": getRecordLimit,
		"UserId": getUserId,
		"CustomerId": getCustomerId,
		"WarehouseId": getWarehouseId,
		"SkuId": getSkuId,
		"Filter": getFilter
	};
	callHttpUrl(apiPath, postData, function (data) {
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") {
			var getLottable = mBrillWmsSession.getCustomerLottable();
			var breakCustLot = getLottable.split(',');

			var totalrowcount = getresult.Table[0].RecCount;
			var getholdinventrylist = getresult.Table1;
			var holdgridTable = '';
			holdgridTable = holdgridTable + '<div class="wms-srv-grid-header">';

			holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
			holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">UPC Code</div>';
			holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>';
			if (GetPalletBusinesRule == "YES") {
				holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet</div>';
			}
			// holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Lottable</div>';

			for (var pl = 0; pl < breakCustLot.length; pl++) {
				var custLotLabel = breakCustLot[pl];
				holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + custLotLabel + '">' + custLotLabel + '</div>';
			}

			holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Hold Qty</div>';
			holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
			holdgridTable = holdgridTable + '</div>';

			/* holdgridTable = holdgridTable + '<div class="wms-srv-grid-row">';                          
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';		
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';                    
			 holdgridTable = holdgridTable + '</div>'; */

			for (var il = 0; il < getholdinventrylist.length; il++) {
				var getrowno = getholdinventrylist[il].rownumber;
				var getskuid = getSkuId;
				var getSkuCode = getholdinventrylist[il].SkuCode;
				var getUPCCode = getholdinventrylist[il].UPCCode;
				var getLocation = getholdinventrylist[il].Location;
				var getpallet = getholdinventrylist[il].pallet;
				var getHold = getholdinventrylist[il].Hold;
				var getLocationID = getholdinventrylist[il].locationId;
				var getPalletid = 0;
				if (GetPalletBusinesRule == "YES") {
					getPalletid = getholdinventrylist[il].palletid;
				}

				let getlot1 = "0"; let getlot2 = "0"; let getlot3 = "0";
				let getlot4 = "0"; let getlot5 = "0"; let getlot6 = "0";
				let getlot7 = "0"; let getlot8 = "0"; let getlot9 = "0"; let getlot10 = "0";
				if (getholdinventrylist[il].lot1 != 0) {
					getlot1 = getholdinventrylist[il].lot1;
				}
				if (getholdinventrylist[il].lot2 != 0) {
					getlot2 = getholdinventrylist[il].lot2;
				}
				if (getholdinventrylist[il].lot3 != 0) {
					getlot3 = getholdinventrylist[il].lot3;
				}
				if (getholdinventrylist[il].lot4 != 0) {
					getlot4 = getholdinventrylist[il].lot4;
				}
				if (getholdinventrylist[il].lot5 != 0) {
					getlot5 = getholdinventrylist[il].lot5;
				}
				if (getholdinventrylist[il].lot6 != 0) {
					getlot6 = getholdinventrylist[il].lot6;
				}
				if (getholdinventrylist[il].lot7 != 0) {
					getlot7 = getholdinventrylist[il].lot7;
				}
				if (getholdinventrylist[il].lot8 != 0) {
					getlot8 = getholdinventrylist[il].lot8;
				}
				if (getholdinventrylist[il].lot9 != 0) {
					getlot9 = getholdinventrylist[il].lot9;
				}
				if (getholdinventrylist[il].lot10 != 0) {
					getlot10 = getholdinventrylist[il].lot10;
				}
				var getlottable = "";
				// if(getlot1 !="0" && getLot2 != "0" && getlot3 !="0")
				// {
				getlottable = getlot1 + ', ' + getlot2 + ', ' + getlot3 + ', ' + getlot4 + ', ' + getlot5 + ', ' + getlot6
					+ ', ' + getlot7 + ', ' + getlot8 + ', ' + getlot9 + ', ' + getlot10;
				// }

				holdgridTable = holdgridTable + '<div id="divinvntrylstrow ' + getskuid + '" class="wms-srv-grid-row wms-align">';
				holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSkuCode + '</div>';
				holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getUPCCode + '</div>';
				holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLocation + '</div>';
				if (GetPalletBusinesRule == "YES") {
					holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getpallet + '</div>';
				}

				// holdgridTable = holdgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getlottable +'</div>';
				for (var pi = 0; pi < breakCustLot.length; pi++) {
					var custLotLabel = breakCustLot[pi];
					//var custLotVal = getLottableGroup[pi];
					var lotNum = pi + 1;
					var custLotVal = getholdinventrylist[il]["lot" + lotNum];

					if (custLotVal != null && custLotVal.trim() == '0') {
						custLotVal = '';
					}
					holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + pi + '" data-lottype="' + custLotLabel + '" style="width: 82px; text-align: center;">' + custLotVal + '</div>';
				}

				holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getHold + '</div>';
				holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell">';
				holdgridTable = holdgridTable + '<div class="wms-srv-grid-action">';
				holdgridTable = holdgridTable + '<a href="#" title="Release" class="wms-srv-icononly" onclick="release(' + getskuid + ',' + getLocationID + ',' + getPalletid + ',\'' + getlot1 + '\',\'' + getlot2 + '\',\'' + getlot3 + '\',\'' + getlot4 + '\',\'' + getlot5 + '\',\'' + getlot6 + '\',\'' + getlot7 + '\',\'' + getlot8 + '\',\'' + getlot9 + '\',\'' + getlot10 + '\');"><i class="fas fa-share-square"></i></a>';

				holdgridTable = holdgridTable + '</div>';
				holdgridTable = holdgridTable + '</div>';
				holdgridTable = holdgridTable + '</div>';

			}
			$('#tblholdinventrylistgrid').html(holdgridTable);
			showHideLotCellForInvtListRow('tblholdinventrylistgrid');
			setupGridPagingList('HoldinvenreylistPager', CurrentPage, totalrowcount, getholdinventry, getSkuId);
		}
		else {
			alert('Something went wrong.');
		}

	});

}

function opencyclecountplan() {
	debugger;
	var getSelectedRecords = "";
	getSelectedRecords = getSelectedCheckbox();
	if (getSelectedRecords != "") {
		//$('.chkInventorySnapshot').prop('checked', false);   -- line to create selected checkbox values

		$('#theme-cyclecount-popup').show();
		$('#theme-cyclecount-popup-close').off();
		$('#theme-cyclecount-popup-close').click(function () {
			$('#theme-cyclecount-popup').hide();
		});
	}
	else {
		alert("Please select SKU to create Cycle Count Plan.");
	}
}

function SaveCycleCount() {
	debugger;
	if (validatecyclecount() != false) {
		var GetCycleUserid = getUserId;
		var getSelectedskuids = getSelectedCheckbox();
		var gettitle = $("#txtplantitle").val();
		var getplanid = $("#txtplanid").val();

		var postData =
		{
			"Obj": "Product",
			"UserId": GetCycleUserid,
			"CustomerId": getCustomerId,
			"WarehouseId": getWarehouseId,
			"SkuId": getSelectedskuids,
			"PlanTitle": gettitle,
			"PlanID": getplanid
		};
		var apiPath = wmsApiPath + 'Inventory/CreateCyclePlan';
		callHttpUrl(apiPath, postData, function (data) {
			var getstatus = data.Status;
			var getstatuscode = data.StatusCode;
			var getresult = data.Result;
			if (getstatus == "200" && getstatuscode == "Success") {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					//-- line to create selected checkbox values
					alert("Cycle Count Plan created Successfully.");
					$('.chkInventorySnapshot').prop('checked', false);
					$('#theme-cyclecount-popup').hide();

				}
				else {
					alert("Cycle Count Plan creation failed.");
					$('.chkInventorySnapshot').prop('checked', false);
					$('#theme-cyclecount-popup').hide();
				}
			}
			else if (getstatus == "Validate" && getstatuscode == "300") {
				alert("Cycle Count Plan ID allready available.");
				$('.chkInventorySnapshot').prop('checked', false);
				$('#theme-cyclecount-popup').hide();
			}
			else {
				alert("Error Occured.");
				$('.chkInventorySnapshot').prop('checked', false);
				$('#theme-cyclecount-popup').hide();
			}
			$('#txtplantitle').val('');
			$('#txtplanid').val('');

		});
	}
}

/*function opencyclecountplan() {
	$('#theme-cyclecount-popup').show();
	$('#theme-cyclecount-popup-close').off();
	$('#theme-cyclecount-popup-close').click(function () {
		$('#theme-cyclecount-popup').hide();
	});
}*/



function opentransferplan(getMID, Tskuid, Tlocationid, Tpalletid, Tlot1, Tlot2, Tlot3, Tlot4, Tlot5, Tlot6, Tlot7, Tlot8, Tlot9, Tlot10, AvailableQty) {
	$('#theme-transfer-popup').show();
	$('#theme-transfer-popup-close').off();
	if (GetPalletBusinesRule == "NO") {
		$('#divpalletNotificationFor').css("display", "none");
	}
	$('#txttranslocation').val('');
	$('#txttranspallet').val('');
	$('#txttransqty').val('');

	Trnsskuid = Tskuid; Trnslocationid = Tlocationid; Trnspalletid = Tpalletid; Trnslot1 = Tlot1; Trnslot2 = Tlot2; Trnslot3 = Tlot3; Trnslot4 = Tlot4;
	Trnslot5 = Tlot5; Trnslot6 = Tlot6; Trnslot7 = Tlot7; Trnslot8 = Tlot8; Trnslot9 = Tlot9; Trnslot10 = Tlot10;
	tranavailQty = AvailableQty;
	getglobalMID = getMID;

	$('#theme-transfer-popup-close').click(function () {
		$('#theme-transfer-popup').hide();
	});
}

function TransferSave() {
	debugger;
	if (validateTransfer() != false) {
		var gettransTolocation = hdnsrchlocatnid; // $('#txttranslocation').val();
		var gettransTopallet = hdnsrchpalletid; //$('#txttranspallet').val();
		var gettransqty = $('#txttransqty').val();

		//var wmsApiIMpPath = "http://localhost:50068/api/staging/v1/";
		//var apiPath = wmsApiIMpPath + 'Inventory/SaveTransfer';

		var apiPath = wmsApiPath + 'Inventory/SaveTransfer';

		if (tranavailQty >= gettransqty) {
			if (gettransqty > 0) {
				var postData =
				{
					"transid": 0,
					"CompanyId": companyid,
					"CustomerId": getCustomerId,
					"WarehouseId": getWarehouseId,
					"UserId": getUserId,
					"Remark": "Inventory - transfer",
					"FromLocation": Trnslocationid,
					"FromPallet": Trnspalletid,
					"SkuId": Trnsskuid,
					"Lotable1": Trnslot1,
					"Lotable2": Trnslot2,
					"Lotable3": Trnslot3,
					"Lotable4": Trnslot4,
					"Lotable5": Trnslot5,
					"Lotable6": Trnslot6,
					"Lotable7": Trnslot7,
					"Lotable8": Trnslot8,
					"Lotable9": Trnslot9,
					"Lotable10": Trnslot10,
					"Quantity": gettransqty,
					"ToLocation": gettransTolocation,
					"ToPallet": gettransTopallet,
					"FrmTRID": getglobalMID
				};

				callHttpUrl(apiPath, postData, function (data) {
					var getstatus = data.Status;
					var getstatuscode = data.StatusCode;
					var getresult = data.Result;
					if (getstatus == "200" && getstatuscode == "Success") {
						var returnmsg = getresult.Message;
						if (returnmsg == "success") {
							alert("Quantity Transferred Successfully.");
							$('#theme-transfer-popup').hide();
							$('#wms-srv-availableinventorydetails-popup').hide();
							getinventorylistgrid(CurrentPage);

						}
						else {
							alert("Quantity Transfer failed.");
							$('#theme-transfer-popup').hide();
						}
					}
					else if (getstatus == "Validate" && getstatuscode == "300") {
						var validatemsg = getresult.Message;
						alert(validatemsg);
						//$('.chkInventorySnapshot').prop('checked', false);
						// $('#theme-cyclecount-popup').hide();
					}
					else {
						alert("Error Occured.");
						$('#theme-transfer-popup').hide();
					}
					$('#txttranslocation').val('');
					$('#txttranspallet').val('');
					$('#txttransqty').val('');
					hdnsrchlocatnid = '0';
				});
			}
			else {
				alert("Transfer quantity must be greater than 0.");
			}
		}
		else {
			alert("Can not transfer more than available quantity.");
		}



	}
}

function openrejectedinventory(skuid) {
	CurrentPage = 1;
	getrejectedinventry(skuid);
	$('#wms-srv-rejectedinventorydetails-popup').show();
	$('#wms-srv-rejectedinventorydetails-popup-close').off();
	$('#wms-srv-rejectedinventorydetails-popup-close').click(function () {
		$('#wms-srv-rejectedinventorydetails-popup').hide();
	});
}

function getrejectedinventry(releaseskuid) {
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetRejectedInventoryList';
	//var getCurrentPage = getCurrentPage;
	var getRecordLimit = 10;
	//var getSkuId = skuid;
	var getFilter = '';

	var postData =
	{
		"CurrentPage": CurrentPage,
		"RecordLimit": getRecordLimit,
		"UserId": getUserId,
		"CustomerId": getCustomerId,
		"WarehouseId": getWarehouseId,
		"SkuId": releaseskuid,
		"Filter": getFilter
	};
	callHttpUrl(apiPath, postData, function (data) {
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;
		if (getstatus == "200" && getstatuscode == "Success") {
			var getLottable = mBrillWmsSession.getCustomerLottable();
			var breakCustLot = getLottable.split(',');

			var totalrowcount = getresult.Table[0].RecCount;
			var getrejectinventrylist = getresult.Table1;
			var rejectgridTable = '';

			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-header">';

			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">UPC Code</div>';
			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Batch Code</div>';
			// rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location Type</div>';
			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>';
			if (GetPalletBusinesRule == "YES") {
				rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet</div>';
			}
			// rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Lottable</div>';

			for (var pl = 0; pl < breakCustLot.length; pl++) {
				var custLotLabel = breakCustLot[pl];
				rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + custLotLabel + '">' + custLotLabel + '</div>';
			}

			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Qty</div>';
			rejectgridTable = rejectgridTable + '</div>';

			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-row" style="display:none;">';
			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			//rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			for (var pt = 0; pt < breakCustLot.length; pt++) {
				var custLotLabel = breakCustLot[pt];
				rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell gridCellLottable" style="text-align:center;" data-lotindex="' + pl + '" data-lottype="' + custLotLabel + '"><input type="text" value="" data-id="" data-lottype="' + custLotLabel + '" style="width:100%;"></div>';
			}
			//  rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			//  rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			//  rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';

			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			rejectgridTable = rejectgridTable + '</div>';

			for (var il = 0; il < getrejectinventrylist.length; il++) {
				var getrowno = getrejectinventrylist[il].rownumber;
				var getskuid = getrejectinventrylist[il].MID;
				var getSkuCode = getrejectinventrylist[il].SkuCode;
				var getUPCCode = getrejectinventrylist[il].UPCCode;
				var getBatchCode = "";
				if (getrejectinventrylist[il].BatchCode != null) {
					getBatchCode = getrejectinventrylist[il].BatchCode;
				}
				var getLocation = getrejectinventrylist[il].Location;
				var getpallet = getrejectinventrylist[il].pallet;
				var getRejected = getrejectinventrylist[il].Rejected;

				var getlot1 = ""; var getLot2 = ""; var getlot3 = "";
				if (getrejectinventrylist[il].lot1 != 0) {
					getlot1 = getrejectinventrylist[il].lot1;
				}
				if (getrejectinventrylist[il].lot2 != null) {
					getLot2 = getrejectinventrylist[il].lot2;
				}
				if (getrejectinventrylist[il].lot3 != null) {
					getlot3 = getrejectinventrylist[il].lot3;
				}

				var getlottable = "";
				// if(getlot1 !="" && getLot2 != "" && getlot3 !="")
				// {
				getlottable = getlot1 + ', ' + getLot2 + ', ' + getlot3;
				// }

				rejectgridTable = rejectgridTable + '<div id="divinvntrylstrow ' + getskuid + '" class="wms-srv-grid-row wms-align">';
				rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSkuCode + '</div>';
				rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getUPCCode + '</div>';
				rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getBatchCode + '</div>';
				rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLocation + '</div>';
				if (GetPalletBusinesRule == "YES") {
					rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getpallet + '</div>';
				}
				// rejectgridTable = rejectgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getlottable +'</div>';

				for (var pt = 0; pt < breakCustLot.length; pt++) {
					var custLotLabel = breakCustLot[pt];
					//var custLotVal = getLottableGroup[pt];
					var lotNum = pt + 1;
					var custLotVal = getrejectinventrylist[il]["lot" + lotNum];

					if (custLotVal != null && custLotVal.trim() == '0') {
						custLotVal = '';
					}
					rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell gridCellLottable" data-lotindex="' + pt + '" data-lottype="' + custLotLabel + '" style="width: 82px; text-align: center;">' + custLotVal + '</div>';
				}


				rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRejected + '</div>';

				rejectgridTable = rejectgridTable + '</div>';


			}
			$('#tblrejectinventrylistgrid').html(rejectgridTable);
			showHideLotCellForInvtListRow('tblrejectinventrylistgrid');
			setupGridPagingList('RejectinvenreylistPager', CurrentPage, totalrowcount, getrejectedinventry, releaseskuid);
		}
		else {
			alert('Something went wrong.');
		}
	});
}

function openadjustmentplan(Askuid, Alocationid, Apalletid, Alot1, Alot2, Alot3, Alot4, Alot5, Alot6, Alot7, Alot8, Alot9, Alot10, AavailQty) {
	$('#theme-adjustment-popup').show();
	$('#theme-adjustment-popup-close').off();
	//var adskuid = '',adlocationid = '',adpalletid='',adlot1='',adlot2='',adlot3='',adavailqty = 0;
	adskuid = Askuid; adlocationid = Alocationid; adpalletid = Apalletid;
	adlot1 = Alot1; adlot2 = Alot2; adlot3 = Alot3
	adlot4 = Alot4; adlot5 = Alot5; adlot6 = Alot6
	adlot7 = Alot7; adlot8 = Alot8; adlot9 = Alot9; adlot10 = Alot10
		;

	adavailqty = AavailQty;
	$('#theme-adjustment-popup-close').click(function () {
		$('#theme-adjustment-popup').hide();
	});
}

function adjustmentqty() {
	debugger;

	if (validateadjustment() != false) {
		//var getSelectedskuids = getSelectedCheckbox();
		var adjustqty = $("#txtadjusntqty").val();
		selectElement = document.querySelector('#ddladjustfilter');
		var reasoncode = selectElement.value;

		var postData =
		{
			"UserId": getUserId,
			"CustomerId": getCustomerId,
			"WarehouseId": getWarehouseId,
			"SkuId": adskuid,
			"locationid": adlocationid,
			"palletid": adpalletid,
			"lot1": adlot1,
			"lot2": adlot2,
			"lot3": adlot3,
			"lot4": adlot4,
			"lot5": adlot5,
			"lot6": adlot6,
			"lot7": adlot7,
			"lot8": adlot8,
			"lot9": adlot9,
			"lot10": adlot10,
			//"AvaiQty": adavailqty,
			"Qty": adjustqty,
			"ReasonID": reasoncode

		};


		var apiPath = wmsApiPath + 'Inventory/AdjustInventory';
		callHttpUrl(apiPath, postData, function (data) {
			var getstatus = data.Status;
			var getstatuscode = data.StatusCode;
			var getresult = data.Result;
			if (getstatus == "200" && getstatuscode == "Success") {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					//-- line to create selected checkbox values
					alert("Quantity Adjusted Successfully.");
					// $('.chkInventorySnapshot').prop('checked', false); 
					$('#theme-adjustment-popup').hide();
					$('#wms-srv-availableinventorydetails-popup').hide();
					getinventorylistgrid(CurrentPage);

				}
				else {
					alert("Quantity Adjustment failed.");
					// $('.chkInventorySnapshot').prop('checked', false);
					$('#theme-adjustment-popup').hide();
				}
			}
			/* else if(getstatus=="Validate" && getstatuscode=="300")
			 {
				 alert("Cycle Count Plan ID allready available.");
				 $('.chkInventorySnapshot').prop('checked', false);
				 $('#theme-cyclecount-popup').hide();
			 }*/
			else {
				alert("Error Occured.");
				// $('.chkInventorySnapshot').prop('checked', false);
				$('#theme-adjustment-popup').hide();
			}
			$('#txtadjusntqty').val('');
			// $('#txtplanid').val('');

		});

	}

}

function hold(hskuid, hlocationid, hpalletid, hlot1, hlot2, hlot3, hlot4, hlot5, hlot6, hlot7, hlot8, hlot9, hlot10) {
	debugger;
	if (confirm("Are you sure you want to hold SKU qty?")) {

		var GetCycleUserid = getUserId;
		var gethskuid = hskuid;
		var getlocation = hlocationid;
		var getpalletid = hpalletid;
		var getlot1 = hlot1;
		var getlot2 = hlot2;
		var getlot3 = hlot3;
		var getlot4 = hlot4;
		var getlot5 = hlot5;
		var getlot6 = hlot6;
		var getlot7 = hlot7;
		var getlot8 = hlot8;
		var getlot9 = hlot9;
		var getlot10 = hlot10;

		var postData =
		{
			"UserId": GetCycleUserid,
			"CustomerId": getCustomerId,
			"WarehouseId": getWarehouseId,
			"SkuId": gethskuid,
			"locationid": getlocation,
			"palletid": getpalletid,
			"lot1": getlot1,
			"lot2": getlot2,
			"lot3": getlot3,
			"lot4": getlot4,
			"lot5": getlot5,
			"lot6": getlot6,
			"lot7": getlot7,
			"lot8": getlot8,
			"lot9": getlot9,
			"lot10": getlot10
		};
		var apiPath = wmsApiPath + 'Inventory/HoldInventory';
		callHttpUrl(apiPath, postData, function (data) {
			var getstatus = data.Status;
			var getstatuscode = data.StatusCode;
			var getresult = data.Result;
			if (getstatus == "200" && getstatuscode == "Success") {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					alert("SKU Qty hold successfully.");
					// $('#wms-srv-availableinventorydetails-popup-close').off();
					$('#wms-srv-availableinventorydetails-popup').hide();
					// $('#wms-srv-holdinventorydetails-popup').hide();
					getinventorylistgrid(CurrentPage);

				}
				else {
					alert("SKU Qty hold failed.");
				}
			}
			else {
				alert("Error Occured.");
				// alert(getresult.Message);
			}

		});
	}
}

function release(Rskuid, Rlocationid, Rpalletid, Rlot1, Rlot2, Rlot3, Rlot4, Rlot5, Rlot6, Rlot7, Rlot8, Rlot9, Rlot10) {
	debugger;
	if (confirm("Are you sure you want to release SKU qty?")) {
		//var GetCycleUserid = getUserId;
		var gethskuid = Rskuid;
		var getlocation = Rlocationid;
		var getpalletid = Rpalletid;
		var getlot1 = Rlot1;
		var getlot2 = Rlot2;
		var getlot3 = Rlot3;
		var getlot4 = Rlot4;
		var getlot5 = Rlot5;
		var getlot6 = Rlot6;
		var getlot7 = Rlot7;
		var getlot8 = Rlot8;
		var getlot9 = Rlot9;
		var getlot10 = Rlot10;


		var postData =
		{
			"UserId": getUserId,
			"CustomerId": getCustomerId,
			"WarehouseId": getWarehouseId,
			"SkuId": gethskuid,
			"locationid": getlocation,
			"palletid": getpalletid,
			"lot1": getlot1,
			"lot2": getlot2,
			"lot3": getlot3,
			"lot4": getlot4,
			"lot5": getlot5,
			"lot6": getlot6,
			"lot7": getlot7,
			"lot8": getlot8,
			"lot9": getlot9,
			"lot10": getlot10
		};
		var apiPath = wmsApiPath + 'Inventory/ReleaseInventory';
		callHttpUrl(apiPath, postData, function (data) {
			var getstatus = data.Status;
			var getstatuscode = data.StatusCode;
			var getresult = data.Result;
			if (getstatus == "200" && getstatuscode == "Success") {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					alert("SKU Qty released successfully.");
					$('#wms-srv-holdinventorydetails-popup').hide();
					getinventorylistgrid(CurrentPage);
					//getholdinventry(Rskuid,strCurrentPage);

				}
				else {
					alert("SKU Qty release failed.");
				}
			}
			else {
				alert("Error Occured.");
				// alert(getresult.Message);
			}

		});
	}
}

function cancel(Cskuid, Clocationid, Cpalletid, Clot1, Clot2, Clot3, CSOid, CAlloqty) {
	debugger;
	if (confirm("Are you sure you want to DeAllocate qty?")) {
		//var GetCycleUserid = getUserId;
		var gethskuid = Cskuid;
		var getlocation = Clocationid;
		var getpalletid = Cpalletid;
		var getlot1 = Clot1;
		var getlot2 = Clot2;
		var getlot3 = Clot3;

		var postData =
		{
			"UserId": getUserId,
			"CustomerId": getCustomerId,
			"WarehouseId": getWarehouseId,
			"SkuId": gethskuid,
			"locationid": getlocation,
			"palletid": getpalletid,
			"lot1": getlot1,
			"lot2": getlot2,
			"lot3": getlot3,
			"availqty": CAlloqty,
			"soid": CSOid
		};
		var apiPath = wmsApiPath + 'Inventory/DeallocateInventory';
		callHttpUrl(apiPath, postData, function (data) {
			var getstatus = data.Status;
			var getstatuscode = data.StatusCode;
			var getresult = data.Result;
			if (getstatus == "200" && getstatuscode == "Success") {
				var returnmsg = getresult.Message;
				if (returnmsg == "success") {
					alert("SKU Qty deallocated successfully.");
					$('#wms-srv-allocatedinventorydetails-popup').hide();
					getinventorylistgrid(CurrentPage);
					//getholdinventry(Rskuid,strCurrentPage);

				}
				else {
					alert("SKU Qty deallocation failed.");
				}
			}
			else {
				alert("Error Occured.");
				// alert(getresult.Message);
			}

		});
	}
}

function validatecyclecount() {

	if (document.getElementById("txtplantitle").value == "") {
		alert("Please enter plan title!");
		return false;
	}

	else if (document.getElementById("txtplanid").value == "") {
		alert("Please enter plan ID!");
		return false;
	}
}

function validateadjustment() {
	selectElement = document.querySelector('#ddladjustfilter');
	if (document.getElementById("txtadjusntqty").value == "") {
		alert("Please enter Qty. to adjust!");
		return false;
	}
	else if (selectElement.value == "Select") {
		alert("Please select reason code!");
		return false;
	}
}

function validateTransfer() {

	if (document.getElementById("txttranslocation").value == "") {
		alert("Please add Location!");
		return false;
	}
	else if (document.getElementById("txttransqty").value == "") {
		alert("Please add quantity!");
		return false;
	}
	else if (document.getElementById("txttranspallet").value == "") {
		if (GetPalletBusinesRule == "YES") {
			alert("Please add Pallet!");
			return false;
		}
	}
}

// main invntry list grid paging function
// function setupGridPaging(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) {
//      debugger;
//     var global_max_record_count = 10;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 10) + 1;
//     var recordTo = recordFrom + 9;
//     var totalRecord = Number(strTotalRecords);
//     var pagerLinks = '';     

//     $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//     var lnkCounter = 1;
//     var currentCounter = global_max_record_count;
//     //var currentCounter = 0;
//     var lastPage = 0;
//     while (currentCounter < totalRecord) {
//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         global_last_page_no = lnkCounter;
//         currentCounter = currentCounter + global_max_record_count;
//         lnkCounter = lnkCounter + 1;
//     }

//     / Add Page linke for remaining record /
//     if (currentCounter > totalRecord) {

//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         // Update last page count - 21 Sept 2021
//         this.global_last_page_no = lnkCounter;
//     }
//     / Add Page linke for remaining record /
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left" title="First"></i></a>';
//    // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//   //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//     pagerNavLinks += '<a href="#" data-page="' + lastPage +'"><i class="fas fa-angle-double-right" title="Last"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//    // $('#AllinvenreylistPager .wms-srv-pager-links a').off();
//    $('#' + gridObjId + ' .wms-srv-pager-links a').off();
//    $('#' + gridObjId + ' .wms-srv-pager-links a').click(function () {  
//         var getDataPage = $(this).attr('data-page');
//         if (callBackFunction != null) 
// 		{   
// 	        if(gridObjId == "AllinvenreylistPager") 
// 			{
//             callBackFunction(getDataPage);
// 			}

//         }
//     });

// 	 $('#' + gridObjId + ' a.wms-srv-pager-go').off();
// 	$('#' + gridObjId + ' a.wms-srv-pager-go').click(function ()
// 	{
//         var getDataPage = $('#' + gridObjId + ' input[name="txtGridPageNo"]').val();
// 		if(Number(getDataPage) < 1)
// 		{
// 			alert('Please enter valid page number!!');
// 		}else if(Number(getDataPage)  > Number(lastPage))
// 		{
// 			alert('Page number should not be greater than '+ lastPage +' !!');
// 		}else
// 		{
// 			 if (callBackFunction != null) {
// 				callBackFunction(getDataPage);
// 			}
// 		}       
//     });
// }

// // inventry other grid paging functions 
// function setupSubGridPaging(gridObjId, strCurrentPage, strTotalRecords, callBackFunction,pageskuid) {
//      debugger;
//     var global_max_record_count = 10;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 10) + 1;
//     var recordTo = recordFrom + 9;
//     var totalRecord = Number(strTotalRecords);
//     var pagerLinks = '';     

//     $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//     var lnkCounter = 1;
//     var currentCounter = global_max_record_count;
//     //var currentCounter = 0;
//     var lastPage = 0;
//     while (currentCounter < totalRecord) {
//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         global_last_page_no = lnkCounter;
//         currentCounter = currentCounter + global_max_record_count;
//         lnkCounter = lnkCounter + 1;
//     }

//     / Add Page linke for remaining record /
//     if (currentCounter > totalRecord) {

//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         // Update last page count - 21 Sept 2021
//         this.global_last_page_no = lnkCounter;
//     }
//     / Add Page linke for remaining record /
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left" title="First"></i></a>';
//    // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//   //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//     pagerNavLinks += '<a href="#" data-page="' + lastPage +'"><i class="fas fa-angle-double-right" title="First"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//    // $('#AllinvenreylistPager .wms-srv-pager-links a').off();
//    $('#' + gridObjId + ' .wms-srv-pager-links a').off();
//    $('#' + gridObjId + ' .wms-srv-pager-links a').click(function () {  
//         var getDataPage = $(this).attr('data-page');
//         if (callBackFunction != null) 
// 		{   	        
// 				callBackFunction(pageskuid,getDataPage);
//         }
//     });

// 	 $('#' + gridObjId + ' a.wms-srv-pager-go').off();
// 	$('#' + gridObjId + ' a.wms-srv-pager-go').click(function ()
// 	{
//         var getDataPage = $('#' + gridObjId + ' input[name="txtGridPageNo"]').val();
// 		if(Number(getDataPage) < 1)
// 		{
// 			alert('Please enter valid page number!!');
// 		}else if(Number(getDataPage)  > Number(lastPage))
// 		{
// 			alert('Page number should not be greater than '+ lastPage +' !!');
// 		}else
// 		{
// 			 if (callBackFunction != null) {
// 				//callBackFunction(getDataPage,searchfilter,searchvalue);
// 				callBackFunction(pageskuid,getDataPage);
// 			}
// 		}       
//     });
// }
// location search grid
function openformlocationPopup() {
	$('#txtinvlocfilter').val('');
	searchlocation();
	$('#theme-transfer-popup').hide();
	$('#wms-srv-formlocation-popup').show();
	$('#wms-srv-formlocation-popup-close').off();
	$('#wms-srv-formlocation-popup-close').click(function () {
		$('#wms-srv-formlocation-popup').hide();
	});
}
function searchlocation() {
	debugger;
	//var apiPath = wmsApiPath + 'Transfer/GetLocation';
	//var LocalwmsApipath = 'http://localhost:50068/api/staging/v1/';
	//var apiPath = LocalwmsApipath + 'Inventory/InvLocationByWare';
	var apiPath = wmsApiPath + 'Inventory/InvLocationByWare';

	var getRecordLimit = 10;
	// var getWarehouseId = 1;// $('#ddlwarehouse').val();
	var filter = $('#txtinvlocfilter').val();
	var postData =
	{
		"WarehouseId": getWarehouseId,
		"UserId": getUserId,
		"Filter": filter

	};
	callHttpUrl(apiPath, postData, function (data) {
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;

		if (getstatus == "200" && getstatuscode == "Success") {
			var getlocsearchlist = getresult.Table;
			var locgridtable = '';

			locgridtable = locgridtable + '<div class="wms-srv-grid-header">';
			locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location Code</div>';
			locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location Type</div>';
			locgridtable = locgridtable + '</div>';

			for (var li = 0; li < getlocsearchlist.length; li++) {
				var getlocid = getlocsearchlist[li].ID;
				var getloccode = getlocsearchlist[li].Code;
				var getLocType = getlocsearchlist[li].LocType;

				locgridtable = locgridtable + '<div id="divinvntrylstrow ' + getlocid + '" class="wms-srv-grid-row wms-align">';
				locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="radio" name ="check" class="chkInventorySnapshot" id="' + getlocid + '"  class="messageCheckbox" value="' + getlocid + ',' + getloccode + '"></div>';
				locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getloccode + '</div>';
				locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getLocType + '</div>';
				locgridtable = locgridtable + '</div>';
			}
			$('#popuplocsarchList').html(locgridtable);

		}
		else {
			alert('Something went wrong.');
		}
	});

}
function getselectedloc() {
	hdnsrchlocatnid = '';
	var selectedloc = getSelectedradiobutton();
	var locdetails = selectedloc.split(",");
	hdnsrchlocatnid = locdetails[0];
	var locationcode = locdetails[1];
	if (Trnslocationid != hdnsrchlocatnid) {
		$('#wms-srv-formlocation-popup').hide();
		$('#theme-transfer-popup').show();
		$('#txttranslocation').val(locationcode);
	}
	else {
		alert("To Location can not be same as From Location Please select different location");
	}
}
function openpalletPopup() {
	searchPallet();
	$('#theme-transfer-popup').hide();
	$('#wms-srv-palletlist-popup').show();
	$('#wms-srv-palletlist-popup-close').off();
	$('#wms-srv-palletlist-popup-close').click(function () {
		$("#txtinvPallfilter").val('');
		$('#wms-srv-palletlist-popup').hide();
	});
}
function searchPallet() {
	debugger;
	//var wmslocalpathg = 'http://localhost:50068/api/staging/v1/'
	//var apiPath = wmslocalpathg + 'Inventory/GetPallet';

	var apiPath = wmsApiPath + 'Inventory/GetPallet';
	var getRecordLimit = 5;

	//var getWarehouseId = 1;// $('#ddlwarehouse').val();
	var filter = $('#txtinvPallfilter').val();
	var postData =
	{
		"UserId": getUserId,
		"WarehouseId": getWarehouseId,
		"LocationID": hdnsrchlocatnid,
		"CompanyID": companyid,
		"Filter": filter

		/*"UserId": getUserId,
		"WarehouseId": getWarehouseId,	    
		"LocationID": Trnslocationid,
		"Flag": 'FromPallet',
		"FromPalletId": Trnspalletid,
		"ToLocationId": hdnsrchlocatnid,
		"Filter": filter*/

	};
	callHttpUrl(apiPath, postData, function (data) {
		var getstatus = data.Status;
		var getstatuscode = data.StatusCode;
		var getresult = data.Result;

		if (getstatus == "200" && getstatuscode == "Success") {
			var getpalletsearchlist = getresult.Table;
			var palletgridtable = '';

			palletgridtable = palletgridtable + '<div class="wms-srv-grid-header">';
			palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet Code</div>';
			palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet Type</div>';
			palletgridtable = palletgridtable + '</div>';

			for (var li = 0; li < getpalletsearchlist.length; li++) {
				// var getLocationID = getpalletsearchlist[li].LocationID;
				var getpalletid = getpalletsearchlist[li].palletid;
				var getpalletname = getpalletsearchlist[li].palletname;
				var getpalletType = getpalletsearchlist[li].pallettype;

				palletgridtable = palletgridtable + '<div id="divinvntrylstrow ' + getpalletid + '" class="wms-srv-grid-row wms-align">';
				palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="radio" name ="check" class="chkInventorySnapshot" id="' + getpalletid + '"  class="messageCheckbox" value="' + getpalletid + ',' + getpalletname + '"></div>';
				palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getpalletname + '</div>';
				palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getpalletType + '</div>';
				palletgridtable = palletgridtable + '</div>';
			}
			$('#popuptPalleSrchList').html(palletgridtable);

		}
		else {
			alert('Something went wrong.');
		}
	});

}
function getselectedPallet() {
	$("#txtinvPallfilter").val('');
	hdnsrchpalletid = '';
	var selectedpallet = getSelectedradiobutton();
	var palletdetails = selectedpallet.split(",");
	hdnsrchpalletid = palletdetails[0];
	var Palletcode = palletdetails[1];
	if (Trnspalletid != hdnsrchpalletid) {
		$('#wms-srv-palletlist-popup').hide();
		//$('#wms-srv-formlocation-popup').hide();
		$('#theme-transfer-popup').show();
		$('#txttranspallet').val(Palletcode);
	}
	else {
		alert("To Pallet can not be same as From Pallet Please select different Pallet");
	}
}
/*function jumptogridpage(object)
{
	var pageno = $('#invmainSearchPageno').val();
	var objectvalue = object;
	alert(objectvalue);

}*/

function inventryskusearch() {
	debugger;
	SKuSearchvalue = $('#txtSearchSkuInventry').val();
	getinventorylistgrid(CurrentPage);
}





