var strCurrentPage = '1';
var getTotalRecords = '10';
var searchfilter = '0';
var searchvalue = '0';
var getImageDirPath = wmsAppFiles;
var getCustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId = mBrillWmsSession.getClientId();

wmsLoadLayout(function()
{
	
	initSkuConversion();  
});

function initSkuConversion()
{
	$("#SkuConversion").show();
    getConversionList(strCurrentPage, searchfilter, searchvalue);
}



function openSkuConversionAddPopup() 
{
    $('#wms-srv-SkuConversion-popup-open').show();
    $('#wms-srv-SkuConversion-popup-Close').off();
    $('#wms-srv-SkuConversion-popup-Close').click(function () {
        $('#wms-srv-SkuConversion-popup-open').hide();
    });
}

function openSkuConversionSkuCodePopup() 
{
    $('#wms-srv-SkuConversion-popup-open').show();
   
    $('#wms-srv-SkuConversion-popup-Close').off();
    $('#wms-srv-SkuConversion-popup-Close').click(function () {
        $('#wms-srv-SkuConversion-popup-open').hide();
    });
    $('#txtSo_ProdSearchpopup').val('');
    $('#txtSo_ProdSearchLottablepopup').val('');
    $('#txtSkuName').val('');
    $('#txtLottable').val('');
    $('#txtqty' ).val('');
    $('#txtUOM').val('');
    $('#txtSkuCode').val('');
    $('#txtlocation').val('');
    $('#txtpalletname').val('');
    $('#txtSKUName').val('');
    $('#txtlottablelist').val('');
    $('#txtQuantitylist').val('');
    $('#txtSkuCodelist').val('');
    $('#txtUOMlist').val('');
    
}

function getConversionList(strCurrentPage, searchfilter, searchvalue) 
{
    debugger;
	//var apiPath = 'http://localhost:50068/api/staging/v1/Dashboard/GetConversionSKUList';
    var apiPath = wmsApiPath + "ConversionSKU/GetConversionSKUList";
    var searchfilter = $('#searchConversion').val();
    var searchvalue = $('#valueConversion').val();
    if (searchfilter == '')
    {
        searchfilter = '0';
        searchvalue = '0';
    }	
    var postData =
    {
        "CurrentPage": strCurrentPage,
        "RecordLimit": getTotalRecords,
        "CustomerID": getCustomerId,
        "WarehouseID": getWarehouseId,
        "CompanyID": getCompanyId,
        "UserID": getUserId,
        "Search": searchfilter,
        "Filter": searchvalue
    };
   
    callHttpUrl(apiPath, postData, function (data) {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            var myGridList = data.Result;
			var getTotalRecords = myGridList.Table[0].TotalRecord;
			//currentPage = myGridList.VendorListResult[0].CurrentPage;		 
     
            $('#pnlskuconversion').html('');  	            
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Conversion No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Conversion Date</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Conversion By</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Sku Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;display: none;">Status</div>';
            gridTable = gridTable + '</div>';
			
            
            
            // GRID HEADER
            for (var i = 0; i <myGridList.Table1.length;i++)
             {
                var geID = myGridList.Table1[i].rownumber;
                var getConversionNumber = myGridList.Table1[i].ConversionNumber;
                var getConversionDate = myGridList.Table1[i].ConversionDate;
                var getStatus = myGridList.Table1[i].Status;
                var getConversionBy = myGridList.Table1[i].ConversionBy;
                var getskulist = myGridList.Table1[i].skulist;

                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align"  style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getConversionNumber + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getConversionDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getConversionBy + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getskulist + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell ' style='text-align: center;display: none;' >" + getStatus + "</div>";				
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            
            }
            //debugger;
            $('#pnlskuconversion').html(gridTable);		
            setupGridPagingList('tlbConversionGridPager', strCurrentPage, getTotalRecords, getConversionList);
        }
        else {
            alert('Unable to connect');
        }
    });
}

function Searchconversionfilter()
{
    debugger;
     searchfilter = $('#searchConversion').val();
     searchvalue = $('#valueConversion').val();

    if (searchvalue == "" && searchfilter !="") 
    {
        alert('Please Enter value for filter');
    }
    else 
    {

        getConversionList(strCurrentPage, searchfilter, searchvalue);

    }
}


function loadskuconvresionPopup() 
{
    debugger
    var obj = $('#ddlskuOrderType').val();
    var getlot = $('#ddlLot').val();
    //var apiPath = 'http://localhost:50068/api/staging/v1/Dashboard/GetConvSKUSuggestion';
     var apiPath = wmsApiPath + "ConversionSKU/GetConvSKUSuggestion";

    var getProdSkey = $('#txtSo_ProdSearchpopup').val();
    var getProdLottableSkey = $('#txtSo_ProdSearchLottablepopup').val();
    var getFinalProdSkey = getProdSkey + '|' + getProdLottableSkey;
    if (getProdLottableSkey.trim() == '') {
      getFinalProdSkey = getProdSkey;
    }
    
    
      postData = 
      {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "ClientId": getClientId,
        "OrderId": 0,
        "skey": getFinalProdSkey,
        "isSuggestionList": "no",
        "portal": "wms",
        "Object":"SalesOrder",
        "Lot": getlot,
        "skuid" : '1'
      };
  
    
  
    callHttpUrl(apiPath, postData, function (data) {
      debugger;
      var getStatusCode = data.StatusCode;
      var getStatus = data.Status;
      if (getStatus == '200' && getStatusCode == 'Success') 
      {
        var suggestionList = data.Result.Table;
  
        $('#pnlskuconvresionList').html('');
        $('#pnlskuconvresionList').append('<div class="wms-srv-grid-header" id="header-wrap">' +
          //'<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Sr. No</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Image</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Description</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Category</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Sub Category</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable</div>' +
         
          '<div class="wms-srv-grid-cell" style="text-align:center;">Group Set</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Current Stock</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Reserve Qty</div>' +
          '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Action</div>' +
          '</div>');
        var getId = [];
        var getValue = [];
        var getProductName = [];
        var getProductImage = [];
        var getProdDescription = [];
        var getCategory = [];
        var getSubCategory = [];
        var getGroupSet = [];
        var getKeyword = [];
        var getUPCBarcode = [];
        var getCurrentStock = [];
        var getReserveQty = [];
        var getUOM = [];
        var getLottable = [];
        var getLottables = [];
  
        for (var i = 0; i < suggestionList.length; i++) {
          
          getId = suggestionList[i].ID;
          getValue = suggestionList[i].ProductCode;
          getProductName = suggestionList[i].Name;
          getProductImage = suggestionList[i].ImagePath;
          getProdDescription = suggestionList[i].Description;
          getCategory = suggestionList[i].Category;
          getSubCategory = suggestionList[i].SubCategory;
          getGroupSet = suggestionList[i].GroupSet;
          getKeyword = suggestionList[i].SKey;
          //getKeyword[i] = 'MySku|Food|Veg';
          getUPCBarcode = suggestionList[i].UPCBarcode;
          getCurrentStock = suggestionList[i].CurrentStock;
          getReserveQty = suggestionList[i].ResurveQty;
          getUOM = suggestionList[i].UOM;
          getLottable = suggestionList[i].Lottable;
          getLottables = suggestionList[i].Lottables;
          getCode = suggestionList[i].Code;
          getpalletname = suggestionList[i].palletname;
          getpalletid = suggestionList[i].palletid;
          getLocationID = suggestionList[i].LocationID;
          
  
          
  
          $('#pnlskuconvresionList').append('<div class="wms-srv-grid-row">' +
           '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage + '" style="width:40px;height:40px;" /></div>' +
            '<div class="wms-srv-grid-cell">' + getValue + '</div>' +
            '<div class="wms-srv-grid-cell">' + getProductName + '</div>' +
            '<div class="wms-srv-grid-cell">' + getProdDescription + '</div>' +
            '<div class="wms-srv-grid-cell">' + getCategory + '</div>' +
            '<div class="wms-srv-grid-cell">' + getSubCategory + '</div>' +
            '<div class="wms-srv-grid-cell">' + getLottables + '</div>' +
            '<div class="wms-srv-grid-cell">' + getGroupSet + '</div>' +
            '<div class="wms-srv-grid-cell">' + getCurrentStock + '</div>' +
            '<div class="wms-srv-grid-cell">' + getReserveQty + '</div>' +
            '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +  
            
            '<a href="#" class="wms-srv-icononly btnSelectProdFromList"  data-isselected="no" onclick="addMultipleProduct(\'' + getValue + '\', \'' + getProductName + '\', \'' + getReserveQty + '\',\'' + getLottables + '\', \'' + getUOM + '\', \'' + getCode + '\',\'' + getpalletname + '\',\'' + getpalletid + '\',\'' + getLocationID + '\')"><i class="fas fa-check-circle"></i></a>' +
            '</div></div>' +
            '</div>');


            $('.btnSelectProdFromList').click(function () {
              var isSelected = $(this).attr('data-isselected');
              if (isSelected == 'no') {
                $(this).attr('data-isselected', 'yes');
                $(this).find('i').attr('style', 'color:#78b421');
              } else {
                $(this).attr('data-isselected', 'no');
                $(this).find('i').attr('style', '');
              }
            });
            
        }
        
        // }
      }
    });
  }
 
  function loadskuconvresionPopuplist() 
{
    debugger
    var obj = $('#ddlOrderType').val();
    var getlot = $('#ddlLot').val();
    //var apiPath = 'http://localhost:50068/api/staging/v1/Dashboard/GetConvSKUSuggestion';
    var apiPath = wmsApiPath + "ConversionSKU/GetConvSKUSuggestion";
    var getProdSkey = $('#txtSo_ProdSearchpopup').val();
    var getProdLottableSkey = $('#txtSo_ProdSearchLottablepopup').val();
    var getFinalProdSkey = getProdSkey + '|' + getProdLottableSkey;
    if (getProdLottableSkey.trim() == '') {
      getFinalProdSkey = getProdSkey;
    }
    
      postData = 
      {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "ClientId": getClientId,
        "OrderId": 0,
        "skey": getFinalProdSkey,
        "isSuggestionList": "no",
        "portal": "wms",
        "Object":"SalesOrder",
        "Lot": getlot,
        "skuid" : '1'
      };
  
    
  
    callHttpUrl(apiPath, postData, function (data) {
      debugger;
      var getStatusCode = data.StatusCode;
      var getStatus = data.Status;
      if (getStatus == '200' && getStatusCode == 'Success') 
      {
        var suggestionList = data.Result.Table;
  
        $('#pnlskuconvresionList').html('');
        $('#pnlskuconvresionList').append('<div class="wms-srv-grid-header" id="header-wrap">' +
          //'<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Sr. No</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Image</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Code</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">SKU Name</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Description</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Category</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Sub Category</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Lottable</div>' +
         
          '<div class="wms-srv-grid-cell" style="text-align:center;">Group Set</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Current Stock</div>' +
          '<div class="wms-srv-grid-cell" style="text-align:center;">Reserve Qty</div>' +
          '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Action</div>' +
          '</div>');
        var getId = [];
        var getValue = [];
        var getProductName = [];
        var getProductImage = [];
        var getProdDescription = [];
        var getCategory = [];
        var getSubCategory = [];
        var getGroupSet = [];
        var getKeyword = [];
        var getUPCBarcode = [];
        var getCurrentStock = [];
        var getReserveQty = [];
        var getUOM = [];
        var getLottable = [];
        var getLottables = [];
  
        for (var i = 0; i < suggestionList.length; i++) {
          
          getId = suggestionList[i].ID;
          getValue = suggestionList[i].ProductCode;
          getProductName = suggestionList[i].Name;
          getProductImage = suggestionList[i].ImagePath;
          getProdDescription = suggestionList[i].Description;
          getCategory = suggestionList[i].Category;
          getSubCategory = suggestionList[i].SubCategory;
          getGroupSet = suggestionList[i].GroupSet;
          getKeyword = suggestionList[i].SKey;
          //getKeyword[i] = 'MySku|Food|Veg';
          getUPCBarcode = suggestionList[i].UPCBarcode;
          getCurrentStock = suggestionList[i].CurrentStock;
          getReserveQty = suggestionList[i].ResurveQty;
          getUOM = suggestionList[i].UOM;
          getLottable = suggestionList[i].Lottable;
          getLottables = suggestionList[i].Lottables;
          getCode = suggestionList[i].Code;
          getpalletname = suggestionList[i].palletname;
  
          
  
          $('#pnlskuconvresionList').append('<div class="wms-srv-grid-row">' +
           '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage + '" style="width:40px;height:40px;" /></div>' +
            '<div class="wms-srv-grid-cell">' + getValue + '</div>' +
            '<div class="wms-srv-grid-cell">' + getProductName + '</div>' +
            '<div class="wms-srv-grid-cell">' + getProdDescription + '</div>' +
            '<div class="wms-srv-grid-cell">' + getCategory + '</div>' +
            '<div class="wms-srv-grid-cell">' + getSubCategory + '</div>' +
            '<div class="wms-srv-grid-cell">' + getLottables + '</div>' +
            '<div class="wms-srv-grid-cell">' + getGroupSet + '</div>' +
            '<div class="wms-srv-grid-cell">' + getCurrentStock + '</div>' +
            '<div class="wms-srv-grid-cell">' + getReserveQty + '</div>' +
            '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +  
            
            '<a href="#" class="wms-srv-icononly btnSelectProdFromList"  data-isselected="no" onclick="addMultipleProductlist(\'' + getValue + '\', \'' + getProductName + '\', \'' + getReserveQty + '\',\'' + getLottables + '\', \'' + getUOM + '\', \'' + getCode + '\',\'' + getpalletname + '\')"><i class="fas fa-check-circle"></i></a>' +
            '</div></div>' +
            '</div>');


            $('.btnSelectProdFromList').click(function () {
              var isSelected = $(this).attr('data-isselected');
              if (isSelected == 'no') {
                $(this).attr('data-isselected', 'yes');
                $(this).find('i').attr('style', 'color:#78b421');
              } else {
                $(this).attr('data-isselected', 'no');
                $(this).find('i').attr('style', '');
              }
            });

        }
        
        // }
      }
    });
  }

 var getpalletid = '';
 var getLocationID = '';
 

  function addMultipleProduct(getValue, getProductName, getReserveQty,getLottables,getUOM,getCode,getpalletname,getpalletid,getLocationID) 
  {
    debugger
    $('#txtSkuName').val(getProductName);
    $('#txtLottable').val(getLottables);
    $('#txtqty' ).val(getReserveQty);
    $('#txtUOM').val(getUOM);
    $('#txtSkuCode').val(getValue);
    $('#txtlocation').val(getCode);
    $('#txtpalletname').val(getpalletname);
    $('#wms-srv-sku-list-popup').hide();
    getpalletid = getpalletid;
    getLocationID =getLocationID
    
  }

  function addMultipleProductlist(getValue, getProductName, getReserveQty,getLottables,getUOM,getCode,getpalletname) 
  {
    debugger
    $('#txtSKUName').val(getProductName);
    $('#txtlottablelist').val(getLottables);
    $('#txtQuantitylist').val(getReserveQty);
    $('#txtSkuCodelist').val(getValue);
    $('#txtUOMlist').val(getUOM);
    
    $('#wms-srv-sku-list-popup').hide();
    
  }


  function openSkuProductListPopup() {
    $('#wms-srv-sku-list-popup').show();
    loadskuconvresionPopup();
    $('#wms-srv-sku-list-popup-close').off();
    $('#wms-srv-sku-list-popup-close').click(function () {
      $('#wms-srv-sku-list-popup').hide();
    });
    
    
     
  }
  function openSkuListPopup() 
  {
    $('#wms-srv-sku-list-popup').show();
    loadskuconvresionPopuplist();
    $('#wms-srv-sku-list-popup-close').off();
    $('#wms-srv-sku-list-popup-close').click(function () {
      $('#wms-srv-sku-list-popup').hide();
    });
     
  }
  
  $( function() {
    $( "#txtdatepicker" ).datepicker();
  } );

  function SaveSkuConversionlist()
{	
    
    debugger;
    var apiPath = wmsApiPath + 'ConversionSKU/GetSkuConversionSave';
    //var apiPath = "http://localhost:50068/api/staging/v1/Dashboard/GetSkuConversionSave";
  
	  var getConversiondate = $("#txtdatepicker").val();	
	  var getremark = $("#txtremarksku").val()	;	 
	  var getlottable = $("#txtLottable").val();	
    var getQty = $("#txtqty").val();
	
   
    var postData = 
    {
      "CustomerID": "1",
      "WarehouseID": "1",
      "CompanyID": "1",
      "UserID": "1",
      "ConversionDate": getConversiondate,
      "Remark": getremark,
      "SkuID": "132",
      "Locationid": getLocationID,
      "Palletid": getpalletid,
      "Lottable": getlottable,
      "Qty": getQty
    }
	 
    callHttpUrl(apiPath, postData, function(data)
      {
        var isSuccess = data.Status;
        if (isSuccess == 200)
        {
            alert("Saved Successfuly");
            $('#txtSkuName').val('');
            $('#txtLottable').val('');
            $('#txtqty' ).val('');
            $('#txtUOM').val('');
            $('#txtSkuCode').val('');
            $('#txtlocation').val('');
            $('#txtpalletname').val('');
            $('#txtSKUName').val('');
            $('#txtlottablelist').val('');
            $('#txtQuantitylist').val('');
            $('#txtSkuCodelist').val('');
            $('#txtUOMlist').val('');
    
             	
             $('#wms-srv-SkuConversion-popup-open').hide();
           
        }
        else 
        {
            alert('Error Occured!!');
        }
    });
  }

