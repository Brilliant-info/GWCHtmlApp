//var apiFolder = 'http://localhost:50068/';
//var apiFolder = 'http://173.212.244.46/WebAPITest/';
//var wmsApiPath = apiFolder + 'api/staging/v1/';

var importObject = "";
var templateId = '0';
var hdnsrchlocatnid='0';
var hdnsrchpalletid = '0';
var getUserId = mBrillWmsSession.getUserId();
var companyid = mBrillWmsSession.getCompanyId();
var getCustomerId = mBrillWmsSession.getCustomerId();  // 1;//$("#ddlcustomer").val();
var getWarehouseId = $('#ddlwarehouse').val();
var selectedsku = "";
var CurrentPage = 1;
var adskuid = '',adlocationid = '',adpalletid='',adavailqty ,adlot1='',adlot2='',adlot3= 0;
var Trnsskuid = '',Trnslocationid = '',Trnspalletid='',Trnslot1='',Trnslot2='',Trnslot3='';
var SKuSearchvalue ='';
var searchfilter = "0";
var searchvalue = "0";

wmsLoadLayout(function () {
	getinventorylistgrid(CurrentPage);
    init();

});

function getSelectedCheckbox(){
	var selectedIds = '';
	$('.chkInventorySnapshot').each(function(){
		var isSelected = $(this).prop('checked');
		var myVal = $(this).val();
		if(isSelected){
			if(selectedIds == ''){
				selectedIds = myVal;
			}else{
				selectedIds = selectedIds + ',' + myVal;
			}
		}
	});
	//alert(selectedIds);
	return selectedIds;
}
function getSelectedradiobutton(){
	var selectedlocIds = '';
	$('.chkInventorySnapshot').each(function(){
		var isSelected = $(this).prop('checked');
		var myVal = $(this).val();
		if(isSelected){
			if(selectedlocIds == ''){
				selectedlocIds = myVal;
			}else{
				selectedlocIds = selectedlocIds + ',' + myVal;
			}
		}
	});
	//alert(selectedlocIds);
	return selectedlocIds;
}
function getinventorylistgrid(getCurrentPage)
{
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetInventoryList';
	//var getCurrentPage = 1;
	var getRecordLimit = 5;
	var getFilter=SKuSearchvalue;

	
	var postData = 
	{ 
        "CurrentPage": getCurrentPage,
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
		 if(getstatus=="200" && getstatuscode=="Success")
		 {
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
                            

			 for(var il=0; il < getinventrylist.length; il++)
			 {
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
				 
				 gridTable = gridTable + '<div id="divinvntrylstrow '+ getskuid +'" class="wms-srv-grid-row wms-align">';gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="Checkbox" name ="check" class="chkInventorySnapshot" id="'+ getskuid +'"  class="messageCheckbox" value="' + getskuid + '"></div>';								
			     gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getSkuCode +'</div>';
			     gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getUPCCode +'</div>';
				 gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getSkuName +'</div>';
				 gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getCategory +'</div>';
				 gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getTotal +'</div>';		
				 gridTable = gridTable + '<div class="wms-srv-grid-cell inventory" style="text-align:center;"> <a href="#" title="" data-prefix="" onclick="openavailableinventorydetails('+ getskuid +');">'+ getAvailable +'</a></div>';                                    
				gridTable = gridTable + '<div class="wms-srv-grid-cell inventory" style="text-align: center;"><a href="#" title="" data-prefix="" onclick="openallocatedinventorydetails('+ getskuid +');"> '+ getAllocated +' </a></div>';

				 gridTable = gridTable + '<div class="wms-srv-grid-cell inventory" style="text-align: center;"><a href="#" title="" data-prefix="" onclick="openholdinventorydetails('+ getskuid +');"> '+ getholdqty +' </a> </div>';

				 gridTable = gridTable + '<div class="wms-srv-grid-cell inventory" style="text-align: center;"><a href="#" title="" data-prefix="" onclick="openrejectedinventory('+ getskuid +');"> '+ getRejected +' </a> </div>'                       
			     gridTable = gridTable + '</div>';				    
			 }
			 
			 $('#tblinventrylistgrid').html(gridTable);	
             setupGridPagingList('AllinvenreylistPager',getCurrentPage,totalrowcount,getinventorylistgrid);		//,invskuid		 
		 }
		 else
		 {
			 alert('Something went wrong.');
		 }
	 });
}

function openavailableinventorydetails(skuid) {
	 getavailableinventry(skuid,CurrentPage);
    $('#wms-srv-availableinventorydetails-popup').show();
    $('#wms-srv-availableinventorydetails-popup-close').off();
    $('#wms-srv-availableinventorydetails-popup-close').click(function () {
        $('#wms-srv-availableinventorydetails-popup').hide();
    });
}

function getavailableinventry(availskuid,getCurrentPage)
{
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetAvailInventoryList';
	//var getCurrentPage = 1;
	var getRecordLimit = 10;
	var getSkuId = availskuid;
	var getFilter='';
	
	var postData = 
	{ 
       "CurrentPage": getCurrentPage,
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
		 if(getstatus=="200" && getstatuscode=="Success")
		 {
			 //alert(getresult);			  
			  var totalrowcount = getresult.Table[0].RecCount;
			  /*var allrowcount = getresult.Table;
			 for(var al=0; il < allrowcount.length; al++)
			 {
				 var rowcount = allrowcount[il].reccount;
			 }*/
			  var getavailinventrylist =getresult.Table1 ;
			  var availgridTable = '';
			  availgridTable = availgridTable + '<div class="wms-srv-grid-header">';
			  
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
             availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">UPC Code</div>';
             availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Batch Code</div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet</div>';
			 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Lottable</div>';
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
			 
			 for(var il=0; il < getavailinventrylist.length; il++)
			 {
				 var getrowno = getavailinventrylist[il].rownumber;
				 var getskuid = getavailinventrylist[il].SkuId;
				 var getSkuCode = getavailinventrylist[il].Skucode;
				 var getUPCCode = getavailinventrylist[il].UPCCode;
				 var getBatchCode = "";
				 if(getavailinventrylist[il].BatchCode != null)
				 {
					 getBatchCode  = getavailinventrylist[il].BatchCode;
				 }
			
				 var getLocation = getavailinventrylist[il].location;
				 var getlocationid = getavailinventrylist[il].LocationID;
				 var getpallet = getavailinventrylist[il].pallet;
				 var getpalletid = getavailinventrylist[il].palletid;
				 
				 var getlot1 ='0';var getLot2 = "0"; var getlot3 = "0";
				 if(getavailinventrylist[il].lot1 !=0 )
				 {
					 getlot1 = getavailinventrylist[il].lot1;
		     	 }
				 if(getavailinventrylist[il].Lot2 != null)
				 {
					 getLot2 = getavailinventrylist[il].Lot2;
		     	 }
				 if(getavailinventrylist[il].lot3 != null)
				 {
					 getlot3 = getavailinventrylist[il].lot3;
		     	 }
				
				 var getAvailable = getavailinventrylist[il].Available;
				 
				 var getlottable="";
				 if(getlot1 !="0" && getLot2 != "0" && getlot3 !="0")
				 {
					 getlottable = getlot1 +', '+ getLot2 +', '+ getlot3;
				 }
				 
				 
				 
				 availgridTable = availgridTable + '<div id="divinvntrylstrow '+ getskuid +'" class="wms-srv-grid-row wms-align">';
			     availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getSkuCode +'</div>';
			     availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getUPCCode +'</div>';
				 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getBatchCode +'</div>';
				  availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getLocation +'</div>';
				 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getpallet +'</div>';
				 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getlottable +'</div>';
				 availgridTable = availgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getAvailable +'</div>';	
				 availgridTable = availgridTable + '<div class="wms-srv-grid-cell">';
				 availgridTable = availgridTable + '<div class="wms-srv-grid-action">';
				 availgridTable = availgridTable + '<a href="#" title="Hold" class="wms-srv-icononly" onclick="hold('+ getskuid +','+ getlocationid +','+ getpalletid +',\''+ getlot1 +'\',\''+ getLot2 +'\',\''+ getlot3 +'\');"><i class="fas fa-pause-circle"></i></a>';
				 
                 availgridTable = availgridTable + '<div class="wms-srv-action-sep"> | </div>';
				 
				 availgridTable = availgridTable + '<a href="#" title="Transfer" class="wms-srv-icononly" onclick="opentransferplan('+ getskuid +','+ getlocationid +','+ getpalletid +',\''+ getlot1 +'\',\''+ getLot2 +'\',\''+ getlot3 +'\');"><i class="fas fa-exchange-alt"></i></a>';
				 
				 availgridTable = availgridTable + '<div class="wms-srv-action-sep"> | </div>';
				 
				 availgridTable = availgridTable + '<a href="#" title="Adjustment" class="wms-srv-icononly" onclick="openadjustmentplan('+ getskuid +','+ getlocationid +','+ getpalletid +',\''+ getlot1 +'\',\''+ getLot2 +'\',\''+ getlot3 +'\','+ getAvailable +');"><i class="fas fa-sliders-h"></i></a>';
				                
				 availgridTable = availgridTable + '</div>';
                 availgridTable = availgridTable + '</div>'; 				 
				 availgridTable = availgridTable + '</div>'; 		    
			 }
			  $('#tblavailinventrylistgrid').html(availgridTable);
			  
			  setupGridPagingList('AvailinvenreylistPager',getCurrentPage,totalrowcount,getavailableinventry,availskuid); //
		 }
		  else
		 {
			 alert('Something went wrong.');
		 }
	 });
}

function openallocatedinventorydetails(skuid) {
	getallocatedinventry(skuid,CurrentPage);
    $('#wms-srv-allocatedinventorydetails-popup').show();
    $('#wms-srv-allocatedinventorydetails-popup-close').off();
    $('#wms-srv-allocatedinventorydetails-popup-close').click(function () {
        $('#wms-srv-allocatedinventorydetails-popup').hide();
    });
}

function getallocatedinventry(availskuid,getCurrentPage)
{
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetAllocateInventoryList';
	//var getCurrentPage = 1;
	var getRecordLimit = 10;
	var getSkuId = availskuid;
	var getFilter='';
	
	var postData = 
	{ 
       "CurrentPage": getCurrentPage,
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
         if(getstatus=="200" && getstatuscode=="Success")
		 {
			  var totalrowcount = getresult.Table[0].RecCount;
			  var getalocatinventrylist = getresult.Table1;
			  var alctgridTable = '';
			  
			  alctgridTable = alctgridTable + '<div class="wms-srv-grid-header">';
			  
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Order ID</div>';
            alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Order Number</div>';    
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Order Date</div>';
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Cancel Date</div>';
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>';
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet</div>';
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Lottable</div>';
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Allocated Qty</div>';
			 alctgridTable = alctgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">DeAllocated</div>';
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
			 
			 for(var il=0; il < getalocatinventrylist.length; il++)
			 {
				 var getrowno = getalocatinventrylist[il].rownumber;
				 var getOrderID = getalocatinventrylist[il].OrderID;
				 var getOrderNumber = getalocatinventrylist[il].OrderNumber;

				  var getOrderDate = getalocatinventrylist[il].OrderDate;
				  var getCancelDate = getalocatinventrylist[il].CancelDate;
				  var getProductCode = getalocatinventrylist[il].ProductCode;
				 var getskuid = getalocatinventrylist[il].skuid;
				 var getLocationCode = getalocatinventrylist[il].LocationCode;
				 var getlocid = getalocatinventrylist[il].locid;
				 var getpalletid = getalocatinventrylist[il].palletid;
				 var getPalletName = getalocatinventrylist[il].PalletName;				
				 var getAllocateqty= getalocatinventrylist[il].Allocateqty;

				 var getlot1 = "0";var getLot2 = "0"; var getlot3 = "0";
				 if(getalocatinventrylist[il].Lottable1 != 0)
				 {
					 getlot1 = getalocatinventrylist[il].Lottable1;
		     	 }
				 if(getalocatinventrylist[il].Lottable2 != null)
				 {
					 getLot2 = getalocatinventrylist[il].Lottable2;
		     	 }
				 if(getalocatinventrylist[il].Lottable3 != null)
				 {
					 getlot3 = getalocatinventrylist[il].Lottable3;
		     	 }
				
				 var getlottable="";
				 if(getlot1 !="0" && getLot2 != "0" && getlot3 !="0")
				 {
					 getlottable = getlot1 +', '+ getLot2 +', '+ getlot3;
				 }
				 
				 
				 alctgridTable = alctgridTable  + '<div id="divinvntrylstrow '+ getskuid +'" class="wms-srv-grid-row wms-align">';
			     alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getOrderID +'</div>';
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getOrderNumber +'</div>';
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getOrderDate +'</div>';
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getCancelDate +'</div>';
			     alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getProductCode +'</div>';
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getLocationCode +'</div>';
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getPalletName +'</div>';
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getlottable +'</div>';	
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getAllocateqty +'</div>';	
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-cell">';
				 alctgridTable = alctgridTable  + '<div class="wms-srv-grid-action">';
				 
				 alctgridTable = alctgridTable  + '<a href="#" title="Cancel" class="wms-srv-cancel" data-prefix="CN" ><i class="fas fa-times-circle" onclick="cancel('+ getskuid +','+ getlocid +','+ getpalletid +',\''+ getlot1 +'\',\''+ getLot2 +'\',\''+ getlot3 +'\','+ getOrderID +','+ getAllocateqty +');"></i></a>';  
				 
				 			 		                
				 alctgridTable = alctgridTable  + '</div>';
                 alctgridTable = alctgridTable  + '</div>'; 				 
				 alctgridTable = alctgridTable  + '</div>'; 		  
				 
			 }
			  $('#tblalocatinventrylistgrid').html(alctgridTable);
              setupGridPagingList('AllocatinvenreylistPager',getCurrentPage,totalrowcount,getallocatedinventry,availskuid); 			  
			 
		 }
         else{ 
		  alert('Something went wrong.');
		 }		 
		 
		}); 
	
}

function openholdinventorydetails(skuid) {
	getholdinventry(skuid,CurrentPage);
    $('#wms-srv-holdinventorydetails-popup').show();
    $('#wms-srv-holdinventorydetails-popup-close').off();
    $('#wms-srv-holdinventorydetails-popup-close').click(function () {
        $('#wms-srv-holdinventorydetails-popup').hide();
    });
}

function getholdinventry(holdskuid,getCurrentPage)
{
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetHoldInventoryList';
	//var getCurrentPage = 1;
	var getRecordLimit = 10;
	var getSkuId = holdskuid;
	var getFilter='';
	
	var postData = 
	{ 
       "CurrentPage": getCurrentPage,
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
         if(getstatus=="200" && getstatuscode=="Success")
		 {
			  var totalrowcount = getresult.Table[0].RecCount;
			  var getholdinventrylist = getresult.Table1;
			  var holdgridTable = '';
			  holdgridTable = holdgridTable + '<div class="wms-srv-grid-header">';
			  
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
             holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">UPC Code</div>';       
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>';
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet</div>';
			 holdgridTable = holdgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Lottable</div>';
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
			 
			 for(var il=0; il < getholdinventrylist.length; il++)
			 {
				 var getrowno = getholdinventrylist[il].rownumber;
				 var getskuid =getSkuId;
				 var getSkuCode = getholdinventrylist[il].SkuCode;
				 var getUPCCode = getholdinventrylist[il].UPCCode;
				 var getLocation = getholdinventrylist[il].Location;
				 var getpallet = getholdinventrylist[il].pallet;				
				 var getHold = getholdinventrylist[il].Hold;
				 var getLocationID = getholdinventrylist[il].locationId;
				 var getPalletid = getholdinventrylist[il].palletid;
				 
				var getlot1 ="0";var getLot2 = "0"; var getlot3 = "0";
				 if(getholdinventrylist[il].lot1 !=0)
				 {
					 getlot1 = getholdinventrylist[il].lot1;
		     	 }
				 if(getholdinventrylist[il].Lot2 != null)
				 {
					 getLot2 = getholdinventrylist[il].Lot2;
		     	 }
				 if(getholdinventrylist[il].lot3 != null)
				 {
					 getlot3 = getholdinventrylist[il].lot3;
		     	 }
				
				 var getlottable="";
				 if(getlot1 !="0" && getLot2 != "0" && getlot3 !="0")
				 {
					 getlottable = getlot1 +', '+ getLot2 +', '+ getlot3;
				 }
				 
				 holdgridTable = holdgridTable  + '<div id="divinvntrylstrow '+ getskuid +'" class="wms-srv-grid-row wms-align">';
			     holdgridTable = holdgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getSkuCode +'</div>';
			     holdgridTable = holdgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getUPCCode +'</div>';
				 holdgridTable = holdgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getLocation +'</div>';
				 holdgridTable = holdgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getpallet +'</div>';
				 holdgridTable = holdgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getlottable +'</div>';
				 holdgridTable = holdgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getHold +'</div>';	
				 holdgridTable = holdgridTable  + '<div class="wms-srv-grid-cell">';
				 holdgridTable = holdgridTable  + '<div class="wms-srv-grid-action">';
				 holdgridTable = holdgridTable  + '<a href="#" title="Release" class="wms-srv-icononly" onclick="release('+ getskuid +','+ getLocationID +','+ getPalletid +','+ getlot1 +','+ getLot2 +','+ getlot3 +');"><i class="fas fa-share-square"></i></a>';
				                  			                
				 holdgridTable = holdgridTable  + '</div>';
                 holdgridTable = holdgridTable  + '</div>'; 				 
				 holdgridTable = holdgridTable  + '</div>'; 		  
				 
			 }
			 $('#tblholdinventrylistgrid').html(holdgridTable);	
			 setupGridPagingList('HoldinvenreylistPager',getCurrentPage,totalrowcount,getholdinventry,getSkuId); 
		 }
         else{ 
		  alert('Something went wrong.');
		 }		 
		 
		}); 
	
}

function opencyclecountplan() {
	debugger;
	var getSelectedRecords = "";
	getSelectedRecords = getSelectedCheckbox();
	if(getSelectedRecords !="")
	{	
	//$('.chkInventorySnapshot').prop('checked', false);   -- line to create selected checkbox values
	
    $('#theme-cyclecount-popup').show();
    $('#theme-cyclecount-popup-close').off();
    $('#theme-cyclecount-popup-close').click(function () {
        $('#theme-cyclecount-popup').hide();
    });
	}
	else
	{
		alert("Please select SKU to create Cycle Count Plan.");
	}
}

function SaveCycleCount()
{
	debugger;
	if(validatecyclecount() != false)	
	{
	var GetCycleUserid = getUserId;
	var getSelectedskuids = getSelectedCheckbox();
	var gettitle = $("#txtplantitle").val();
	var getplanid = $("#txtplanid").val();

	var postData = 
	{ 
		"Obj":"Product",
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
		 if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var returnmsg = getresult.Message;
			 if(returnmsg == "success")
			 {
				   //-- line to create selected checkbox values
				 alert("Cycle Count Plan created Successfully.");
				 $('.chkInventorySnapshot').prop('checked', false); 
				 $('#theme-cyclecount-popup').hide();
				 
			 }
			 else
			 {
				  alert("Cycle Count Plan creation failed.");
				  $('.chkInventorySnapshot').prop('checked', false);
				  $('#theme-cyclecount-popup').hide();
			 }
		 }
		 else if(getstatus=="Validate" && getstatuscode=="300")
		 {
			 alert("Cycle Count Plan ID allready available.");
			 $('.chkInventorySnapshot').prop('checked', false);
		     $('#theme-cyclecount-popup').hide();
		 }
		 else
		 {
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



function opentransferplan(Tskuid,Tlocationid,Tpalletid,Tlot1,Tlot2,Tlot3) {
    $('#theme-transfer-popup').show();
    $('#theme-transfer-popup-close').off();
	
	Trnsskuid = Tskuid;Trnslocationid = Tlocationid;Trnspalletid=Tpalletid;Trnslot1=Tlot1;Trnslot2=Tlot2;Trnslot3=Tlot3;
   
   $('#theme-transfer-popup-close').click(function () {
        $('#theme-transfer-popup').hide();
    });
}

function TransferSave()
{
	debugger;
	if(validateTransfer() != false)	
	{
		var gettransTolocation = hdnsrchlocatnid; // $('#txttranslocation').val();
		var gettransTopallet = hdnsrchpalletid; //$('#txttranspallet').val();
		var gettransqty = $('#txttransqty').val();
		
	var postData = 
	{ 
        "transid": 0,
        "CompanyId": companyid,
		"CustomerId": getCustomerId,
		"WarehouseId": getWarehouseId,
		"UserId": getUserId,
		"Remark": "transfer",
		"FromLocation": Trnslocationid,
		"FromPallet": Trnspalletid,
		"SkuId": Trnsskuid,
		"Lotable1": Trnslot1,
		"Lotable2": Trnslot2,
		"Lotable3": Trnslot3,
		"Quantity": gettransqty,
		"ToLocation": gettransTolocation,
		"ToPallet": gettransTopallet
		
    };
	
	var apiPath = wmsApiPath + 'Transfer/SaveTransfer';
	callHttpUrl(apiPath, postData, function (data) {
		 var getstatus = data.Status;
		 var getstatuscode = data.StatusCode;
		 var getresult = data.Result;	
		 if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var returnmsg = getresult.Message;
			 if(returnmsg == "success")
			 {
				 alert("Quantity Transfered Successfully.");				
				 $('#theme-transfer-popup').hide();
				 $('#wms-srv-availableinventorydetails-popup').hide();
				 getinventorylistgrid(CurrentPage);
				 
			 }
			 else
			 {
				  alert("Quantity Transfer failed.");
				  $('#theme-transfer-popup').hide();
			 }
		 }
		 else if(getstatus=="Validate" && getstatuscode=="300")
		 {
			 var validatemsg = getresult.Message;
			 alert(validatemsg);
			 //$('.chkInventorySnapshot').prop('checked', false);
		    // $('#theme-cyclecount-popup').hide();
		 }
		 else
		 {
			  alert("Error Occured.");
		     $('#theme-transfer-popup').hide();
		 }
		 $('#txttranslocation').val('');
		 $('#txttranspallet').val('');
		 $('#txttransqty').val('');
	});
		
	}
}

function openrejectedinventory(skuid) {
	getrejectedinventry(skuid,CurrentPage);
    $('#wms-srv-rejectedinventorydetails-popup').show();
    $('#wms-srv-rejectedinventorydetails-popup-close').off();
    $('#wms-srv-rejectedinventorydetails-popup-close').click(function () {
        $('#wms-srv-rejectedinventorydetails-popup').hide();
    });
}

function getrejectedinventry(releaseskuid,getCurrentPage)
{
	debugger;
	var apiPath = wmsApiPath + 'Inventory/GetRejectedInventoryList';
	//var getCurrentPage = getCurrentPage;
	var getRecordLimit = 10;
	//var getSkuId = skuid;
	var getFilter='';
	
	var postData = 
	{ 
       "CurrentPage": getCurrentPage,
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
         if(getstatus=="200" && getstatuscode=="Success")
		 {
			  var totalrowcount = getresult.Table[0].RecCount;
			  var getrejectinventrylist = getresult.Table1;
			  var rejectgridTable = '';
			  
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-header">';	
			 
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">SKU Code</div>';
             rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">UPC Code</div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Batch Code</div>';
			// rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location Type</div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location</div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet</div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Lottable</div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Qty</div>';
			 rejectgridTable = rejectgridTable + '</div>';
			 
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-row">';                          
		     rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';		
			 //rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="text" value="" data-id="" style="width:100%;"></div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			 rejectgridTable = rejectgridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
             rejectgridTable = rejectgridTable + '</div>';
			 
			 for(var il=0; il < getrejectinventrylist.length; il++)
			 {
				 var getrowno = getrejectinventrylist[il].rownumber;
				 var getskuid = getrejectinventrylist[il].MID;
				 var getSkuCode = getrejectinventrylist[il].SkuCode;
				 var getUPCCode = getrejectinventrylist[il].UPCCode;				
				 var getBatchCode = "";
				 if(getrejectinventrylist[il].BatchCode != null)
				 {
					 getBatchCode  = getrejectinventrylist[il].BatchCode;
				 }
				 var getLocation = getrejectinventrylist[il].Location;
				 var getpallet = getrejectinventrylist[il].pallet;				 
				 var getRejected = getrejectinventrylist[il].Rejected;
				 
				 var getlot1 ="";var getLot2 = ""; var getlot3 = "";
				 if(getrejectinventrylist[il].lot1 !=0)
				 {
					 getlot1 = getrejectinventrylist[il].lot1;
		     	 }
				 if(getrejectinventrylist[il].Lot2 != null)
				 {
					 getLot2 = getrejectinventrylist[il].Lot2;
		     	 }
				 if(getrejectinventrylist[il].lot3 != null)
				 {
					 getlot3 = getrejectinventrylist[il].lot3;
		     	 }
				
				 var getlottable="";
				 if(getlot1 !="" && getLot2 != "" && getlot3 !="")
				 {
					 getlottable = getlot1 +', '+ getLot2 +', '+ getlot3;
				 }
				 
				 rejectgridTable = rejectgridTable  + '<div id="divinvntrylstrow '+ getskuid +'" class="wms-srv-grid-row wms-align">';
			     rejectgridTable = rejectgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getSkuCode +'</div>';
			     rejectgridTable = rejectgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getUPCCode +'</div>';
				 rejectgridTable = rejectgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getBatchCode +'</div>';
				 rejectgridTable = rejectgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getLocation +'</div>';
				 rejectgridTable = rejectgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getpallet +'</div>';
				 rejectgridTable = rejectgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getlottable +'</div>';
				 rejectgridTable = rejectgridTable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getRejected +'</div>';	
					 
				 rejectgridTable = rejectgridTable  + '</div>'; 		  
				 
				 
			 }
			  $('#tblrejectinventrylistgrid').html(rejectgridTable);	
			  setupGridPagingList('RejectinvenreylistPager',getCurrentPage,totalrowcount,getrejectedinventry,releaseskuid);
		 }
		else{ 
		  alert('Something went wrong.');
		 }	
		});
}

function openadjustmentplan(Askuid,Alocationid,Apalletid,Alot1,Alot2,Alot3,AavailQty) {
	 $('#theme-adjustment-popup').show();
    $('#theme-adjustment-popup-close').off();
	//var adskuid = '',adlocationid = '',adpalletid='',adlot1='',adlot2='',adlot3='',adavailqty = 0;
	adskuid = Askuid; adlocationid = Alocationid; adpalletid = Apalletid; adlot1 = Alot1; adlot2 = Alot2; adlot3 = Alot3; adavailqty =  AavailQty;   
    $('#theme-adjustment-popup-close').click(function () {
        $('#theme-adjustment-popup').hide();
    });
}

function adjustmentqty()
{
	debugger;
	
	if(validateadjustment() != false)	
	{
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
		//"AvaiQty": adavailqty,
		"Qty": adjustqty,
		"ReasonID": reasoncode
		
    };
	
	
	var apiPath = wmsApiPath + 'Inventory/AdjustInventory';
	callHttpUrl(apiPath, postData, function (data) {
		 var getstatus = data.Status;
		 var getstatuscode = data.StatusCode;
		 var getresult = data.Result;		 
		 if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var returnmsg = getresult.Message;
			 if(returnmsg == "success")
			 {
				   //-- line to create selected checkbox values
				 alert("Quantity Adjusted Successfully.");
				// $('.chkInventorySnapshot').prop('checked', false); 
				 $('#theme-adjustment-popup').hide();
				 $('#wms-srv-availableinventorydetails-popup').hide();
				 getinventorylistgrid(CurrentPage);
				 
			 }
			 else
			 {
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
		 else
		 {
			  alert("Error Occured.");
			// $('.chkInventorySnapshot').prop('checked', false);
		     $('#theme-adjustment-popup').hide();
		 }
		 $('#txtadjusntqty').val('');
		// $('#txtplanid').val('');

	});
	
	}
	
}

function hold(hskuid,hlocationid,hpalletid,hlot1,hlot2,hlot3){
	debugger;
    if(confirm("Are you sure you want to hold SKU qty?")){

	var GetCycleUserid = getUserId;
	var gethskuid = hskuid;
	var getlocation = hlocationid;
	var getpalletid = hpalletid;
	var getlot1 = hlot1;
	var getlot2 = hlot2;
	var getlot3 = hlot3;
	
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
		"lot3": getlot3	
    };
	var apiPath = wmsApiPath + 'Inventory/HoldInventory';
	callHttpUrl(apiPath, postData, function (data) {
		 var getstatus = data.Status;
		 var getstatuscode = data.StatusCode;
		 var getresult = data.Result;
		 if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var returnmsg = getresult.Message;
			 if(returnmsg == "success")
			 {
				 alert("SKU Qty hold successfully.");
				// $('#wms-srv-availableinventorydetails-popup-close').off();
				$('#wms-srv-availableinventorydetails-popup').hide();
				// $('#wms-srv-holdinventorydetails-popup').hide();
				 getinventorylistgrid(CurrentPage);
				 
			 } 
			 else
				 {
				  alert("SKU Qty hold failed.");
			 }
		 }
		 else
			 {
				 alert("Error Occured.");
				// alert(getresult.Message);
			 }
		 
	});
	}	
}

function release(Rskuid,Rlocationid,Rpalletid,Rlot1,Rlot1,Rlot3){
	debugger;
    if(confirm("Are you sure you want to release SKU qty?")){
	//var GetCycleUserid = getUserId;
	var gethskuid = Rskuid;
	var getlocation = Rlocationid;
	var getpalletid = Rpalletid;
	var getlot1 = Rlot1;
	var getlot2 = Rlot1;
	var getlot3 = Rlot3;
	
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
		"lot3": getlot3	
    };
	var apiPath = wmsApiPath + 'Inventory/ReleaseInventory';
	callHttpUrl(apiPath, postData, function (data) {
		 var getstatus = data.Status;
		 var getstatuscode = data.StatusCode;
		 var getresult = data.Result;
		 if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var returnmsg = getresult.Message;
			 if(returnmsg == "success")
			 {
				 alert("SKU Qty released successfully.");				
				  $('#wms-srv-holdinventorydetails-popup').hide();
				 getinventorylistgrid(CurrentPage);
				 //getholdinventry(Rskuid,strCurrentPage);
				 
			 } 
			 else
				 {
				  alert("SKU Qty release failed.");
			 }
		 }
		 else
			 {
				 alert("Error Occured.");
				// alert(getresult.Message);
			 }
		 
	});
	}
}

function cancel(Cskuid,Clocationid,Cpalletid,Clot1,Clot2,Clot3,CSOid,CAlloqty){
	debugger;
    if(confirm("Are you sure you want to DeAllocate qty?")){
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
		 if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var returnmsg = getresult.Message;
			 if(returnmsg == "success")
			 {
				 alert("SKU Qty deallocated successfully.");				
				  $('#wms-srv-allocatedinventorydetails-popup').hide();
				 getinventorylistgrid(CurrentPage);
				 //getholdinventry(Rskuid,strCurrentPage);
				 
			 } 
			 else
				 {
				  alert("SKU Qty deallocation failed.");
			 }
		 }
		 else
			 {
				 alert("Error Occured.");
				// alert(getresult.Message);
			 }
		 
	});
	}
}

function validatecyclecount(){
	
	if (document.getElementById("txtplantitle").value == "") 
	{
                alert("Please enter plan title!");	
				return false;				
	}
	
	else if (document.getElementById("txtplanid").value == ""){
		alert("Please enter plan ID!");
		return false;
	}
}

function validateadjustment(){
	selectElement = document.querySelector('#ddladjustfilter');
	if (document.getElementById("txtadjusntqty").value == "") 
	{
                alert("Please enter Qty. to adjust!");	
				return false;				
	}
	else if (selectElement.value == "Select"){
		alert("Please select reason code!");
		return false;
	}
}

function validateTransfer(){
	
	if (document.getElementById("txttranslocation").value == "") 
	{
                alert("Please add Location!");	
				return false;				
	}	
	else if (document.getElementById("txttranspallet").value == ""){
		alert("Please add Pallet!");
		return false;
	}
	else if (document.getElementById("txttransqty").value == ""){
		alert("Please add Qty. to transfer!");
		return false;
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
function searchlocation()
{
	debugger;
	var apiPath = wmsApiPath + 'Transfer/GetLocation';
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
		 
		  if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var getlocsearchlist = getresult.Table;
			 var locgridtable = '';
			  
			 locgridtable = locgridtable + '<div class="wms-srv-grid-header">';	
			 locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			 locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location Code</div>';
             locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;">Availble Balance</div>';		
			 locgridtable = locgridtable + '</div>';
			 
			 for(var li=0; li < getlocsearchlist.length; li++)
			 {
				 var getlocid = getlocsearchlist[li].ID;
				 var getloccode = getlocsearchlist[li].Code;
				 var getavailbnc = getlocsearchlist[li].AvailableBalance;
				 
				  locgridtable = locgridtable  + '<div id="divinvntrylstrow '+ getlocid +'" class="wms-srv-grid-row wms-align">';
				 locgridtable = locgridtable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="radio" name ="check" class="chkInventorySnapshot" id="'+ getlocid +'"  class="messageCheckbox" value="' + getlocid + ','+ getloccode +'"></div>';			
			     locgridtable = locgridtable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getloccode +'</div>';
			     locgridtable = locgridtable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getavailbnc +'</div>';
				 locgridtable = locgridtable  + '</div>'; 	
			 }
			  $('#popuplocsarchList').html(locgridtable);	
			 
		 }
		 else{ 
		  alert('Something went wrong.');
		 }	
		 });
	
}
function getselectedloc()
{
	hdnsrchlocatnid='';
	var selectedloc = getSelectedradiobutton();
	var locdetails = selectedloc.split(",");
	hdnsrchlocatnid = locdetails[0];
	var locationcode = locdetails[1];
	$('#wms-srv-formlocation-popup').hide();
	$('#theme-transfer-popup').show();
	$('#txttranslocation').val(locationcode);	
}
function openpalletPopup() {
	searchPallet();
	$('#theme-transfer-popup').hide();
    $('#wms-srv-palletlist-popup').show();
    $('#wms-srv-palletlist-popup-close').off();
    $('#wms-srv-palletlist-popup-close').click(function () {
        $('#wms-srv-palletlist-popup').hide();
    });
}
function searchPallet()
{
	debugger;
	var apiPath = wmsApiPath + 'Transfer/GetPallet';
	var getRecordLimit = 10;
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
		 
		  if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var getpalletsearchlist = getresult.Table;
			 var palletgridtable = '';
			 
			 palletgridtable = palletgridtable + '<div class="wms-srv-grid-header">';	
			 palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
			 palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet Code</div>'; 
			 palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align: center;">Pallet Type</div>';             
			 palletgridtable = palletgridtable + '</div>';
			 
			 for(var li=0; li < getpalletsearchlist.length; li++)
			 {
				 var getLocationID = getpalletsearchlist[li].LocationID;
				 var getpalletid = getpalletsearchlist[li].palletid;
				 var getpalletname = getpalletsearchlist[li].palletname;
				 var getpalletType = getpalletsearchlist[li].pallettype;
				 
				  palletgridtable = palletgridtable  + '<div id="divinvntrylstrow '+ getpalletid +'" class="wms-srv-grid-row wms-align">';
				 palletgridtable = palletgridtable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="radio" name ="check" class="chkInventorySnapshot" id="'+ getpalletid +'"  class="messageCheckbox" value="' + getpalletid + ','+ getpalletname +'"></div>';			
			     palletgridtable = palletgridtable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getpalletname +'</div>';			  
				 palletgridtable = palletgridtable  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getpalletType +'</div>';
				 palletgridtable = palletgridtable  + '</div>'; 	
			 }
			  $('#popuptPalleSrchList').html(palletgridtable);	
			 
		 }
		 else{ 
		  alert('Something went wrong.');
		 }	
		 });
	
}
function getselectedPallet()
{
	hdnsrchpalletid='';
	var selectedpallet = getSelectedradiobutton();
	var palletdetails = selectedpallet.split(",");
	hdnsrchpalletid = palletdetails[0];
	var Palletcode = palletdetails[1];
	$('#wms-srv-palletlist-popup').hide();
	//$('#wms-srv-formlocation-popup').hide();
	$('#theme-transfer-popup').show();
	$('#txttranspallet').val(Palletcode);	
}
/*function jumptogridpage(object)
{
	var pageno = $('#invmainSearchPageno').val();
	var objectvalue = object;
	alert(objectvalue);

}*/

function inventryskusearch()
{
	debugger;
	SKuSearchvalue = $('#txtSearchSkuInventry').val();
	getinventorylistgrid(CurrentPage);
}





