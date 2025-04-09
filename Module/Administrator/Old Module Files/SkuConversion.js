var strCurrentPage = '1';
var getTotalRecords = '10';
var searchfilter = '0';
var searchvalue = '0';
var getImageDirPath = wmsAppFiles;
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId = mBrillWmsSession.getClientId();
var addNewRowCounter = 0;

// wmsLoadLayout(function()
// {
	
// 	initSkuConversion();  
// });

function initSkuConversion()
{
  debugger;
	$("#SkuConversion").show();
    getConversionList(strCurrentPage, searchfilter, searchvalue);
}



function openSkuConversionAddPopup() 
{
    clearAll();
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
	//var apiPath = 'http://localhost:50068/api/staging/v1/ConversionSKU/GetConversionSKUList';
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
        "CompanyID": "1",
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
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;display: none;' >" + getStatus + "</div>";				
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


function loadskuconvresionPopup(type) 
{
    debugger
    var obj = $('#ddlskuOrderType').val();
    var getlot = $('#ddlLot').val();
    //var apiPath = 'http://localhost:50068/api/staging/v1/ConversionSKU/GetConvSKUSuggestion';
     var apiPath = wmsApiPath + "ConversionSKU/GetConvSKUSuggestion";
     let getparaskuid = 0;
     if (type =='Main')
     {
        getparaskuid = 0;
     }
     else{
        //getparaskuid = $('#txtSkuCode').attr('data-id');
        getparaskuid = 0;
     }
     

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
        "skuid" : getparaskuid
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
          '<div class="wms-srv-grid-cell" style="width:80px;text-align:center;">Sr. No</div>' +
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
          '<div class="wms-srv-grid-cell" style="text-align:center;">TrId</div>' +
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
        var getUOM = [];
        var getLottable = [];
        var getLottables = [];

        var getCode = [];
        var getpalletname = [];
        var getpalletid = [];
        var getLocationID = [];
        var getTrId = [];
  
        for (var i = 0; i < suggestionList.length; i++) {
          
          //var rowNum = i + 1;
        getId[i] = suggestionList[i].ID;
        getValue[i] = suggestionList[i].ProductCode;
        getProductName[i] = suggestionList[i].Name;
        getProductImage[i] = suggestionList[i].ImagePath;
        getProdDescription[i] = suggestionList[i].Description;
        getCategory[i] = suggestionList[i].Category;
        getSubCategory[i] = suggestionList[i].SubCategory;
        getGroupSet[i] = suggestionList[i].GroupSet;
        getKeyword[i] = suggestionList[i].SKey;
        //getKeyword[i] = 'MySku|Food|Veg';
        getUPCBarcode[i] = suggestionList[i].UPCBarcode;
        getCurrentStock[i] = suggestionList[i].CurrentStock;
        getReserveQty[i] = suggestionList[i].ResurveQty;
        getUOM[i] = suggestionList[i].UOM;
        getLottable[i] = suggestionList[i].Lottable;
        getLottables[i] = suggestionList[i].Lottables;
        getCode [i]= suggestionList[i].Code;
        getpalletname[i] = suggestionList[i].palletname;
        getpalletid[i] = suggestionList[i].palletid;
        getLocationID[i] = suggestionList[i].LocationID;
        getTrId[i] = suggestionList[i].TrnsId;
          
        // var strLottable = '';
        // for (var l = 0; l < getLottable[i].length; l++) {
        //   if (strLottable == '') {
        //     strLottable = getLottable[i][l].Name;
        //   } else {
        //     strLottable = strLottable + ' | ' + getLottable[i][l].Name;
        //   }
        // }
          
  
          $('#pnlskuconvresionList').append('<div class="wms-srv-grid-row">' +
          '<div class="wms-srv-grid-cell" style="width:80px;">' + getId[i] + '</div>' +
          '<div class="wms-srv-grid-cell"><img src="' + getImageDirPath + getProductImage[i] + '" style="width:40px;height:40px;" /></div>' +
          '<div class="wms-srv-grid-cell">' + getValue[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getProductName[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getProdDescription[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getCategory[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getSubCategory[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getLottables[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getGroupSet[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getCurrentStock[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getReserveQty[i] + '</div>' +
          '<div class="wms-srv-grid-cell">' + getTrId[i] + '</div>' +
          '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +  
            
          '<a href="#" class="wms-srv-icononly btnSelectProdFromList" data-isselected="no" onclick="addMultipleProduct(\'' + getId[i] + '\',\'' + getValue[i] + '\', \'' + getProductName[i] + '\', \'' + getCurrentStock[i] + '\',\'' + getLottables[i] + '\', \'' + getUOM[i] + '\', \'' + getCode[i] + '\',\'' + getpalletname[i] + '\',\'' + getpalletid[i] + '\',\'' + getLocationID[i] + '\',\'' + getTrId[i] + '\')"><i class="fas fa-check-circle"></i></a>' +
          '</div></div>' +
          '</div>');


            // $('.btnSelectProdFromList').click(function () {
            //   var isSelected = $(this).attr('data-isselected');
            //   if (isSelected == 'no') {
            //     $(this).attr('data-isselected', 'yes');
            //     $(this).find('i').attr('style', 'color:#78b421');
            //   } else {
            //     $(this).attr('data-isselected', 'no');
            //     $(this).find('i').attr('style', '');
            //   }
            // });

            // $('#btnAddSkuToconversion').off();
            // $('#btnAddSkuToconversion').click(function () {
            //   debugger;
            //   //$('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').remove();
            //   $('.btnSelectProdFromList[data-isselected="yes"]').each(function () {
            //     var listItemObj = $(this);
            //     var k = Number($(this).attr('data-pos'));
            //     addMultipleProduct(getValue[k], getId[k], getProductName[k], getCurrentStock[k], getReserveQty[k], getLottable[k], getLottables[k]);
            //     //checkForAddNewSkuRow();
            //     $('#wms-srv-sku-list-popup').hide();
            //   });
            // });
      
            // $('.btnAddToProductListField').off();
            // $('.btnAddToProductListField').click(function () {
            //   debugger;
            //   var listItemObj = $(this);
            //   var getListPos = Number($(this).attr('data-pos'));
            //   $('#txtSo_SKUCode_' + recId).val(getValue[getListPos]);
            //   $('#txtSo_SKUCode_' + recId).attr('data-id', getId[getListPos]);
            //   $('#txtSo_SKUName_' + recId).val(getProductName[getListPos]);
            //   $('#txtSo_CurrentStock_' + recId).val(getCurrentStock[getListPos]);
            //   $('#txtSo_ReserveQty_' + recId).val(getReserveQty[getListPos]);
            //   var myUomList = '';
            //   var myUomObj = getUOM[getListPos];
            //   for (var k = 0; k < myUomObj.length; k++) {
            //     var getUomId = myUomObj[k].ID;
            //     var getUomName = myUomObj[k].Name;
            //     var getUomUnitValue = myUomObj[k].UnitValue;
            //     myUomList = myUomList + '<option value="' + getUomId + '" data-unitvalue="' + getUomUnitValue + '">' + getUomName + '</option>';
            //   }
      
            //   // $('#txtSo_UOM_' + recId).html(myUomList);
            //   // var myLottableList = '';
            //   // var myLottableObj = getLottable[getListPos];
            //   // var getLottableWidth = Math.round((100 / myLottableObj.length) - 3);
            //   // $('#txtSo_Lottable_' + recId).html(getLottables[getListPos]);
            //   // $('#wms-srv-sales-product-list-popup').hide();
              
            //  });
            
        }
        
        // }
      }
    });
  }
  function addMultipleProduct(getId ,getValue, getProductName, getCurrentStock,getLottables,getUOM,getCode,getpalletname,getpalletid,getLocationID,getTTrId) 
  {
    debugger
    $('#txtSkuName').val('');
    $('#txtLottable').val('');
    $('#txtqty' ).val('');
    $('#txtUOM').val('');
    $('#txtSkuCode').val('');
    $('#txtSkuCode').attr('data-id', '0');
    $('#txtSkuName').attr('data-id', '0');
    $('#txtlocation').val('');
    $('#txtpalletname').val('');

    $('#txtSkuName').val(getProductName);
    $('#txtLottable').val(getLottables);
    $('#txtqty' ).val(getCurrentStock);
    $('#txtUOM').val(getUOM);
    $('#txtSkuCode').val(getValue);
    $('#txtSkuCode').attr('data-id', getId);
    $('#txtSkuName').attr('data-id', getTTrId);
    $('#txtlocation').val(getCode);
    $('#txtpalletname').val(getpalletname);
    $('#wms-srv-sku-list-popup').hide();
    getpalletid = getpalletid;
    getLocationID =getLocationID
    
  }
  var getpalletid = '';
 var getLocationID = '';
 
  function loadskuconvresionPopuplist(recId) 
{
    debugger
    if($('#txtSkuCode').attr('data-id') == '0')
    {
      $('#wms-srv-sku-list-popup').hide();
      alert('Please select Main sku!!')


    }
    else{
    var obj = $('#ddlOrderType').val();
    var getlot = $('#ddlLot').val();
    //var apiPath = 'http://localhost:50068/api/staging/v1/ConversionSKU/GetConvSKUSuggestion';
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
        "skuid" : $('#txtSkuCode').attr('data-id')
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
          '<div class="wms-srv-grid-cell" style="text-align:center;">TrId</div>' +
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

        var getCode = [];
        var getpalletname = [];
        var getpalletid = [];
        var getLocationID = [];
        var gettrId = [];
        
  
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
          gettrId = suggestionList[i].TrnsId;
          getCode [i]= suggestionList[i].Code;
          getpalletname[i] = suggestionList[i].palletname;
          getpalletid[i] = suggestionList[i].palletid;
          getLocationID[i] = suggestionList[i].LocationID;
           
          
  
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
            '<div class="wms-srv-grid-cell">' + gettrId + '</div>' +
            '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">' +  
            
            '<a href="#" class="wms-srv-icononly btnSelectProdFromListmultiple"  data-isselected="no" onclick="addMultipleProductlist(\'' + getId + '\',\'' + getValue + '\', \'' + getProductName + '\', \'' + getCurrentStock + '\',\'' + getLottables + '\', \'' + getUOM + '\', \'' + getCode + '\',\'' + getpalletname + '\',\'' + gettrId + '\')"><i class="fas fa-check-circle"></i></a>' +
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

            $('#btnSelectProdFromListmultiple').off();
            $('#btnSelectProdFromListmultiple').click(function () {
              //$('#wmsSkuDetailsSalesOrderGrid .wmsFrmAddRow').remove();
              $('.btnSelectProdFromList[data-isselected="yes"]').each(function () {
                var listItemObj = $(this);
                var k = Number($(this).attr('data-pos'));
                debugger;
                addMultipleProduct(getValue[k], getId[k], getProductName[k], getCurrentStock[k], getReserveQty[k], getLottable[k], getLottables[k],LocationID[k],gettrId[k]);
                //checkForAddNewSkuRow();
                $('#wms-srv-sku-list-popup').hide();
              });
            });

        }
        
        // }
      }
    });
  }
  }


  function addMultipleProductlist(getId,getValue, getProductName, getReserveQty,getLottables,getUOM,getCode,getpalletname,gettrId) 
  {
    debugger
  

  
    // var addNewRowHeader = '<div class="wms-srv-grid-header" style="text-align:center">';
    // addNewRowHeader +='<div class="wms-srv-grid-cell" style="text-align:center">Sku Code</div>';
    // addNewRowHeader +='<div class="wms-srv-grid-cell" style="text-align:center">SKU Name</div>';
    // addNewRowHeader +='<div class="wms-srv-grid-cell" style="text-align:center">Quantity</div>';
                                            
    // addNewRowHeader +='<div class="wms-srv-grid-cell">Lottable</div>';
    // addNewRowHeader +='<div class="wms-srv-grid-cell">Action</div>';
    // addNewRowHeader +='</div>';
    // //row 
    // addNewRowHeader +='<div class="wms-srv-grid-cell" style="text-align:center">'+ getValue +'</div>';
    // addNewRowHeader +='<div class="wms-srv-grid-cell" style="text-align:center">'+ getProductName +'</div>';
    // addNewRowHeader +='<div class="wms-srv-grid-cell" style="text-align:center">'+ getReserveQty +'</div>';
                                            
    // addNewRowHeader +='<div class="wms-srv-grid-cell">'+ getLottables +'</div>';
    // addNewRowHeader +='<div class="wms-srv-grid-cell"><button class="wms-srv-input wms-srv-button " type="button" title="Save"data-prefix="SV" onclick="saveSkuConversion(' + addNewRowCounter + ');"><i class="fas fa-check-circle"></i><span>Save</span></button><div class="wms-srv-action-sep">|</div></div> <a href="#" title="Cart" data-prefix="RM" onclick="removeAddNewRow(' + addNewRowCounter + ');" class="wms-srv-icononly"><i class="fas fa-times-circle"></i></a>';
    // addNewRowHeader +='</div>';
     
    

    var getselectskuid = getId
    var addNewRowHtml = '<div class="wms-srv-grid-row wmsFrmAddRow wmsFrmAddRow_' + addNewRowCounter + '">' +
    '<div class="wms-srv-grid-cell">' +
    '<div class="wms-srv-suggestion-holder">' +
    '<input type="text" id="txtSkuCodelist_' + addNewRowCounter + '" data-prefix="SESKU" data-id='+ getselectskuid +' value=""' +
    'class="wms-srv-grid-cell-input notranslate" disabled readonly>' +
    '</div>' +
    '</div>' +
    '<div class="wms-srv-grid-cell"><input type="text" id="txtSKUName_' + addNewRowCounter + '" value=""' +
    'class="wms-srv-grid-cell-input" disabled readonly></div>' +
    '<div class="wms-srv-grid-cell"><input type="text" id="txtQuantitylist_' + addNewRowCounter + '" value=""' +
    'class="wms-srv-grid-cell-input" ></div>' +
    '<div class="wms-srv-grid-cell"><input type="text" id="txtlottablelist_' + addNewRowCounter + '" value=""' +
    'class="wms-srv-grid-cell-input" disabled readonly></div>' +
    
    '<div class="wms-srv-grid-cell">' +
    '<div class="wms-srv-grid-action">' +
    '<button class="wms-srv-input wms-srv-button " type="button" title="Save"' +
    'data-prefix="SV" onclick="saveSkuConversionDT(' + addNewRowCounter + ');"><i class="fas fa-check-circle"></i><span>Save</span></button>' +
    '<div class="wms-srv-action-sep">|</div>' +
    '<a href="#" title="Cart" data-prefix="RM" onclick="removeAddNewRow(' + addNewRowCounter + ');" class="wms-srv-icononly"><i class="fas fa-times-circle"></i></a>' +
    '</div>' +
    '</div>' +
    '</div>';
   $('#wmsAddconversiongrid .wms-srv-grid-header').after( addNewRowHtml );
   

  $('#txtSkuCodelist_' + addNewRowCounter).val(getValue);
  
  $('#txtSkuCodelist_' + addNewRowCounter).attr('data-id', getId);

  
  $('#txtSKUName_' + addNewRowCounter).val(getProductName);
  $('#txtSKUName_' + addNewRowCounter).attr('data-id', gettrId);
  $('#txtQuantitylist_' + addNewRowCounter).val(getReserveQty);
  $('#txtlottablelist_' + addNewRowCounter).val(getLottables);
  
   $('#wms-srv-sku-list-popup').hide();

    
  }

  function removeAddNewRow(rowNum) {
    $('#wmsAddconversiongrid .wmsFrmAddRow_' + rowNum).remove();
    checkForAddNewSkuRow();
  }
  
  function checkForAddNewSkuRow() {
    var rowLength = $('#wmsAddconversiongrid .wms-srv-grid-row').length;
    if (rowLength > 0) {
      $('#pnlNoSkuRecord').hide();
    } else {
      $('#pnlNoSkuRecord').show();
    }
  }

  function saveSkuConversionDT(rowId) {
    debugger;
    var getOrderQty = $('#txtQuantitylist_' + rowId).val();
        if(getOrderQty =='0' || getOrderQty == '')
        {
          alert('Please enter the Quantity!!');
        }
        else
      {
    if (validateConvOrderForm(rowId, 'no')) {
      var getRequestNo = $('#spnPoOid').text();
  
      if (getRequestNo.trim() != 'To be generated') {
       var apiPath = wmsApiPath + "ConversionSKU/SaveDTConverstion";
        //var apiPath = "http://localhost:50068/api/staging/v1/ConversionSKU/SaveDTConverstion";
        var getSkuId = $('#txtSkuCodelist_' + rowId).attr('data-id');
        //var getUOM = $('#txtSo_UOM_' + rowId + ' option:selected').text();
        var getUOMId = $('#txtSo_UOM_' + rowId + ' option:selected').val();
        
           /*var getLottableGroup = $('#txtSo_Lottable_' + rowId + ' input[type="text"]');
        var strLottable = "";
        $(getLottableGroup).each(function () {
          if (strLottable == '') {
            strLottable = strLottable + $(this).val();
          } else {
            strLottable = strLottable + "|" + $(this).val();
          }
        }); */
        //var strLottable = $('#txtlottablelist_' + rowId).text().trim();
        var strLottable = $('#txtlottablelist_' + rowId).val().trim()

        var getTrId = $('#txtSKUName_' + rowId).attr('data-id');
        var getMTrId = $('#txtSkuName').attr('data-id');
  
        var postData = {
          "UserId": getUserId,
          "ConvId": getRequestNo,
          "UOMId": getUOMId,
          "Remark": '',

          "SkuId": getSkuId,
          "Locationid": 1,
          "Palletid": 1,
          "Lottable": strLottable,
          "Qty": getOrderQty,
          "MTrId":getMTrId,
          "TrId": getTrId
          
        };
        callHttpUrl(apiPath, postData, function (data) {
          debugger;
          var getStatus = data.Status;
          var getStatusCode = data.StatusCode;
          var getResult = data.Result;
          if (getStatusCode.toLocaleLowerCase() == 'success') {
            alert('SKU details added successfully!!');
            //resetSalesAddSKUForm();
            //removeSkuconversionOrder(rowId);
             getSkuDetailsByConv();
          }
        });
         
       
      } else {
        SaveSkuConversion(rowId, 'no');
      }
    }
  }
    }
    function getSkuDetailsByConv() {
      debugger;
      var getRequestNo = $('#spnPoOid').text();
    
      if (getRequestNo.trim() != 'To be generated') {
        var apiPath = wmsApiPath + "ConversionSKU/GetconvDetail";
        //var apiPath = "http://localhost:50068/api/staging/v1/ConversionSKU/GetconvDetail";

        var postData = {
          "CustomerId": getCustomerId,
          "WarehouseId": getWarehouseId,
          "UserId": getUserId,
          "OrderId": getRequestNo
        };
        callHttpUrl(apiPath, postData, function (data) {
          debugger;
          var getStatus = data.Status;
          var getStatusCode = data.StatusCode;
          if (getStatusCode.toLocaleLowerCase() == 'success') {
            $('#wmsAddconversiongrid .wmsFrmAddRow').remove();
            var getOrderList = data.Result.OrderDetails;
            for (var i = 0; i < getOrderList.length; i++) {
              var getSkuRowId = getOrderList[i].Id;
              var getSkuId = getOrderList[i].SkuId;
              var getItemCode = getOrderList[i].ItemCode;
              var getItemName = getOrderList[i].ItemName;
              var getReserveQty = getOrderList[i].ReserveQty;
             // var getUOM = getOrderList[i].UOM;
              //var getUOMId = getOrderList[i].UOMId;
              var getOrderQty = getOrderList[i].OrderQty;
              var getLottableGroup = getOrderList[i].Lottable;
    
              /*
              var strLottable = getLottableGroup;
              $(getLottableGroup).each(function () {
                if (strLottable == '') {
                  strLottable = strLottable + $(this).val();
                } else {
                  strLottable = + "|" + $(this).val();
                }
              });
              */
    
              var skuRow = '<div class="wms-srv-grid-row wmsFrmAddRow">';
              skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
              skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getItemName + '</div>';
              // skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getCurrentStock + '</div>';
              // skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getReserveQty + '</div>';
              // skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getRequestedQty + '</div>';
              skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
              // skuRow = skuRow + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
              skuRow = skuRow + '<div class="wms-srv-grid-cell" style="width:275px;">' + getLottableGroup + '</div>';
              skuRow = skuRow + '<div class="wms-srv-grid-cell">' +
                '<div class="wms-srv-grid-action">' +
                '<a href="#" title="Cart" data-prefix="RM" class="wms-srv-icononly" onclick="removeSkuconversionOrder(\'' + getSkuRowId + '\');"style="display: none;"><i class="fas fa-times-circle"></i></a>' +
                '</div>' +
                '</div>';
              skuRow = skuRow + '</div>';
              $('#wmsAddconversiongrid').append(skuRow);
            }
            var getSalesOrderStatus = $('#wms-srv-order-popup').attr('data-status');
            if (getSalesOrderStatus != 'addnew' && getSalesOrderStatus != '37') {
              deactiveSalesOrderEditing(getSalesOrderStatus);
            } else {
              activateSalesOrderEditing();
            }
            checkForAddNewSkuRow();
          } else {
            alert(getMessage);
          }
    
        });
      }
    }
  
  function removeSkuconversionOrder(skuRowId) {
    debugger;
    var getRequestNo = $('#spnPoOid').text();
    var apiPath = wmsApiPath + "SO/RemoveSOSKU";
    var postData = {
      "CustomerId": getCustomerId,
      "WarehouseId": getWarehouseId,
      "UserId": getUserId,
      "OrderId": getRequestNo,
      "Id": skuRowId
    };
    callHttpUrl(apiPath, postData, function (data) {
      debugger;
      var getStatus = data.Status;
      var getStatusCode = data.StatusCode;
      if (getStatusCode.toLocaleLowerCase() == 'success') {
        getSkuDetailsBySalesOrder();
      } else {
        var getMessage = data.Result.Message;
        alert(getMessage);
      }
  
    });
  }

  function openSkuProductListPopup() {
    $('#wms-srv-sku-list-popup').show();
    loadskuconvresionPopup('Main');
    $('#wms-srv-sku-list-popup-close').off();
    $('#wms-srv-sku-list-popup-close').click(function () {
      $('#wms-srv-sku-list-popup').hide();
    });
    
    
     
  }
  function openSkuListPopup(recId) 
  {
    $('#wms-srv-sku-list-popup').show();
    loadskuconvresionPopuplist(recId);
    $('#wms-srv-sku-list-popup-close').off();
    $('#wms-srv-sku-list-popup-close').click(function () {
      $('#wms-srv-sku-list-popup').hide();
    });
     
  }
  

  $( function() {
    $( "#txtdatepicker" ).datepicker();
  } );
  function finalSaveSkuConversion() {
    SaveSkuConversion('0', 'yes');
  }
  function validateConvOrderForm(rowId, isFinalSave) {
    debugger;
    var isValidForm = true;
    var orderno = $('#spnPoOid').text();
    if (isFinalSave == 'yes') {
      if(orderno.trim() == 'To be generated'){
        alert('Please save at least one sku record !!');
        isValidForm = false;
      }else{
        isValidForm = true;
      }
    } else {
      var getselectskuid = $('#txtSkuCode').attr('data-id');
      var getSkuCode = $('#txtSkuCode').val();
      var getRequestQty = $("#txtqty").val();
     
      if (getSkuCode.trim() == '' || getselectskuid == '0') {
        alert('Please select first Parent SKU !!');
        isValidForm = false;
       
      } else if ((getSkuCode.trim() != '' || getselectskuid != '0') && isFinalSave == 'yes') {
        alert('Please add atleast One SKU !!');
        isValidForm = false;
        // } else if (getRequestQty.trim() == '' && orderno == 'To be generated') {
      } 
      else if (getRequestQty.trim() == '') {
        alert('Please enter valid Request Qty !!');
        isValidForm = false;
      }
    }
    return isValidForm;
  }
  function SaveSkuConversion(rowId, isFinalSave)
{	
    
    debugger;
    if (validateConvOrderForm(rowId, isFinalSave)) {
    var apiPath = wmsApiPath + 'ConversionSKU/GetSkuConversionSave';
    //var apiPath = "http://localhost:50068/api/staging/v1/ConversionSKU/GetSkuConversionSave";
  
	  var getconvId = $("#spnPoOid").text();	
	  var getConversiondate = $("#txtdatepicker").val();	
	  var getremark = $("#txtremarksku").val()	;	 
	  var getheadlottable = $("#txtLottable").val();	
    var getQty = $("#txtqty").val();
    var getselectskuid = $('#txtSkuCode').attr('data-id');;
    var getTrId = $('#txtSkuName').attr('data-id');
    var getheadLocationID = 0;
    var getheadpalletid = 0;
    var getheadremark = '';
    var postData = 
    {
      "convId":getconvId,
      "CustomerID": getCustomerId,
      "WarehouseID": getWarehouseId,
      "CompanyID": 1,
      "UserID": getUserId,
      "ConversionDate": getConversiondate,
      "Remark": getheadremark,
      "SkuID": getselectskuid,
      "Locationid": getheadLocationID,
      "Palletid": getheadpalletid,
      "Lottable": getheadlottable,
      "Qty": getQty,
      "isFinalSave": isFinalSave,
      "TrId":getTrId
    }
	 
    callHttpUrl(apiPath, postData, function(data)
      {
        var isSuccess = data.Status;
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        var getResult = data.Result;
        var getMessage = getResult.Message;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
          debugger;
          var getNewOrderNo = getResult.OrderNo;
          $('#spnPoOid').html(getNewOrderNo);
          if (isFinalSave != 'yes') {
            var getNewOrderNo = getResult.OrderNo;
            $('#spnPoOid').html(getNewOrderNo);
            saveSkuConversionDT(rowId);
          } else {
            alert('Order saved successfully!!');
            clearAll();
            $('#wms-srv-SkuConversion-popup-open').hide();
            getConversionList(strCurrentPage, searchfilter, searchvalue);
          }
            //saveSalesOrerSkuDetails(rowId);
            // //alert("Saved Successfuly");
            // $('#txtSkuName').val('');
            // $('#txtLottable').val('');
            // $('#txtqty' ).val('');
            // $('#txtUOM').val('');
            // $('#txtSkuCode').val('');
            // $('#txtlocation').val('');
            // $('#txtpalletname').val('');
            // $('#txtSKUName').val('');
            // $('#txtlottablelist').val('');
            // $('#txtQuantitylist').val('');
            // $('#txtSkuCodelist').val('');
            // $('#txtUOMlist').val('');
    
             	
            // $('#wms-srv-SkuConversion-popup-open').hide();
           
        }
        else 
        {
            alert('Error Occured!!');
        }
    });
  }
  }
function clearAll(){
debugger;
        $('#txtSkuName').val('');
        $('#txtLottable').val('');
        $('#txtqty').val('');
        $('#txtUOM').val('');
        $('#txtSkuCode').val('');
        $('#txtlocation').val('');
        $('#txtpalletname').val('');
        $('#txtSKUName').val('');
        $('#txtlottablelist').val('');
        $('#txtQuantitylist').val('');
        $('#txtSkuCodelist').val('');
        $('#txtUOMlist').val('');
        $('#spnPoOid').html('To be generated');
        $('#txtremarksku').val('');
        $('#wmsAddconversiongrid .wmsFrmAddRow').remove();
}

