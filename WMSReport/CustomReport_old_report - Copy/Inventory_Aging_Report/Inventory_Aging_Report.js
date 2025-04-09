var getUserId = mBrillWmsSession.getUserId();
//var getWarehouseId = "1";
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCompanyId();
var getProductCategory="0";
var getProductCode="0";
var getlocationcode="0";
var getAgingdropdown="0";

var obj = 'objrexta';


$(document).ready(function () 
{

    setupFilterPopup();
    $('#btnFilterLottables').click(function(){
        showLottableConfiguration();
    });
    getInventoryList();
    //createDoughnutChart('Inventory-Aging-Chart', ['<30', '31-60', '61-90', '91-120', '121-150', '151-180', '180+'], ['100', '200', '300', '150', '220', '350', '80'], ['#0984e3', '#1B1464', '#ffbe76', '#be2edd', '#f368e0', '#4bcffa', '#feca57'], 'Buckets');
    getBucketsPieChart();
    
})

    $('#txtProductCategory').change(function ()
    {       
        debugger;
        getProductCategory = $("#txtProductCategory").val();
    });

    $('#txtProductCode').change(function ()
    {       
        debugger;
        getProductCode = $("#txtProductCode").val();
    });

    $('#txtlocationcode').change(function ()
    {       
        debugger;
        getlocationcode = $("#txtlocationcode").val();
    });

    $('#ddlPageObjectobjrexta').change(function ()
    {       
        debugger;
        getAgingdropdown = $("#ddlPageObjectobjrexta").val();
    });

function InventoryProductCategoryDropdown()
{     
    //debugger;
    var apiPath = wmsApiPath + 'ReportStatic/getInventoryDropdown';
    var postData=
    {
        CustId: getCustomerId,
        WhId:getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId
    }
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spngetName = [];
            spnId = [];
            $("#txtProductCategory").html('<option >--Select--</option>');
            spngetName.push('--Select List--');
			spnId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    var Id =grnContainerSize[i].ID;
                    var getName = grnContainerSize[i].Name;
                    spngetName.push(getName);
                    spnId.push(Id);
                   // $("#txtProductCategory").append('<option value = "'+Id+'">'+ getName +'</option>');
                   $("#txtProductCategory").append('<option value = "'+getName+'">'+ getName +'</option>');
                    }
            }
        }      
        if (isStatus == 200) 
        {
            spngetName = [];
            spnId = [];
            $("#txtProductCode").html('<option >--Select--</option>');
            spngetName.push('--Select List--');
			spnId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table1;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    var Id =grnContainerSize[i].Id;
                    var getProductCode = grnContainerSize[i].ProductCode;
                    spngetName.push(getProductCode);
                    spnId.push(Id);
                   // $("#txtProductCode").append('<option value = "'+Id+'">'+  getProductCode +'</option>');
                   $("#txtProductCode").append('<option value = "'+getProductCode+'">'+  getProductCode +'</option>');
                    }
            }
        }              
        if (isStatus == 200) 
        {
            spngetName = [];
            spnId = [];
            $("#txtlocationcode").html('<option >--Select--</option>');
            spngetName.push('--Select List--');
			spnId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table2;
            if (grnContainerSize.length > 0) 
            {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    var Id =grnContainerSize[i].Id;
                    var getLoccode = grnContainerSize[i].Loccode;
                    spngetName.push(getLoccode);
                    spnId.push(Id);
                    //$("#txtlocationcode").append('<option value = "'+Id+'">'+  getLoccode +'</option>');
                    $("#txtlocationcode").append('<option value = "'+getLoccode+'">'+  getLoccode +'</option>');
                    }
            }
        }        
    });   
}

// var getProductCategory=$('#txtProductCategory option:selected').text();
// //var getProductCategory = $('#txtProductCategory').find('option:selected').text();
// var getProductCode=$('#txtProductCode option:selected').text();
// var getlocationcode=$('#txtlocationcode option:selected').text();
// var getAgingdropdown=$('#ddlPageObjectobjrexta option:selected').text();

    

function createDoughnutChart(canvasId, xValues, yValues, barColors, chartTitle) 
{

    new Chart(canvasId, {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                label: chartTitle,
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: chartTitle
            },
            resposive: false
        }
    });
}

function getBucketsPieChart() 
{
    debugger;
    var apiPath = wmsApiPath + "ReportStatic/getInventoryAgingReport";
    var gridObjId = 'gettopfiveorder' + obj;
    var reportLottableFilter = getLottableFilterValues(gridObjId);
    
    var postData = 
    {
        CustId: getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId,
        ProdGrpId:getProductCategory,
        PrdId: getProductCode,
        LocId: getlocationcode,
        AgingDay:getAgingdropdown,
        filterLottable:"All"
    };
    
    callHttpUrl(apiPath, postData, function (data) 
    {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') 
        {
            var getDays0 = data.Result.Table[0].Days00;
            var getDays30 = data.Result.Table[4].Days30;
            var getDays60 = data.Result.Table[2].Days60;
            var getDays90 = data.Result.Table[3].Days90;
            var getDays120 = data.Result.Table[1].Days120;
            var getDays150 = data.Result.Table[2].Days150;
            var getDays180 = data.Result.Table[3].Days180;

            createDoughnutChart('Inventory-Aging-Chart', ['<30', '31-60', '61-90', '91-120', '121-150', '151-180', '180+'], [getDays0,getDays30,getDays60,getDays90, getDays120,getDays150,getDays180], ['#0984e3', '#1B1464', '#ffbe76', '#be2edd', '#f368e0', '#4bcffa', '#feca57'], 'Buckets');
        }

    });
    getInventoryList(); 
}

function getInventoryList() 
{
    debugger;
	var apiPath = wmsApiPath + 'ReportStatic/getInventoryAgingReport';
    //var apiPath = "http://localhost:50068/api/staging/v1/ReportStatic/getInventoryAgingReport";
    var gridObjId = 'txtInventoryReport' + obj;
    var reportLottableFilter = getLottableFilterValues(gridObjId);
   
    var postData =
    {
        CustId: getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId,
        ProdGrpId:getProductCategory,
        PrdId: getProductCode,
        LocId: getlocationcode,
        AgingDay:getAgingdropdown,
        filterLottable:reportLottableFilter
      }
   
    callHttpUrl(apiPath, postData, function (data) 
    {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            //var myGridList = data.Result;
            var getResult = data.Result.Table;
            $("#txtInventoryReport" + obj).html("");	            
            var gridTable = ''; 

            gridTable = gridTable + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Sr.No </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Customer Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Warehouse Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">SKU Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">SKU Description</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Lottable1</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Lottable2</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Lottable3</div>';
            for(var i=0; i < 10; i++)
            {
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell invLotHead gridCellLottable" data-lotindex="'+i+'" data-lotlabel="" style="text-align:center;color: #b3b3b3;font-weight: 500;display:none;">Lottable'+ i +'</div>';
            }
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Current Total Stock</div>';
          //  gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">UOM</div>';                
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">0 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">30 Days</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">60 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">90 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">120 Days</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">150 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">180 Days</div>';      
            gridTable = gridTable + '</div>';
         
            for (var i = 0; i <getResult.length;i++)
             { 
                var getSRNO = getResult[i].SRNO;
                var getProductCode = getResult[i].ProductCode;
                var getCustomerName = getResult[i].CustomerName;
                var getWarehouseName = getResult[i].WarehouseName;
                
                var getSkuDesp = getResult[i].SkuDesp;
                var getlot1 = getResult[i].lot1;
                var getlot2 = getResult[i].lot2;
                var getlot3 = getResult[i].lot3;
                var getUOM = getResult[i].UOM;
                var getStock = getResult[i].Stock;
                var getDays0 = getResult[i].Days0;
                var getDays30 = getResult[i].Days30;
                var getDays60 = getResult[i].Days60;
                var getDays90 = getResult[i].Days90;
                var getDays120 = getResult[i].Days120;
                var getDays150 = getResult[i].Days150;
                var getDays180 = getResult[i].Days180;
                
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row reportRow wmSkuDetailsreportRowinventory">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getSRNO + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getCustomerName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getWarehouseName + '</div>';
                 gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getProductCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getSkuDesp + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot1 + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot2 + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot3 + '</div>';
                for(var k=0; k < 10; k++)
                    {
                        var lotNum = k + 1;
                        var getLottable = getResult[i]["Lottable" + lotNum];
                        if(getLottable== null || getLottable == '0' || getLottable == 'null'){
                            getLottable = '';
                        }
                        gridTable = gridTable + '<div class="wms-srv-grid-cell  reportRowCell gridCellLottable" data-lotindex="'+k+'" data-lotlabel="" style="text-align:center;font-weight: 500;display:none;">'+ getLottable +'</div>';
                    }

                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getStock + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays0 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays30 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays60 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays90 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays120 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays150 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays180 + '</div>';
                gridTable = gridTable + '</div>';
            
            }
            //$('#txtInventoryReport').html(gridTable);
            // var divHeight = $('#header-wrap').height(); 
            // $('#gettopfiveorder').css('margin-top', divHeight+'px');
            $('#' + gridObjId).html(gridTable);
            var getLottableHeader = data.Result.Table1;
            bindLottableHeader(gridObjId, getLottableHeader);
            //showHideLottableReportCell(gridObjId);
            showHideLottableCellForreport(gridObjId);
        }
        else {
            alert('Unable to connect');
        }
    });
    getInventoryRecordList();
}

function showHideLottableCellForreport(gridObjId)
{
    debugger
    var getViewRowCount = $('#'+ gridObjId +' .wmSkuDetailsreportRowinventory').length;
    $('#'+ gridObjId +' .gridCellLottable').show();
    for(var l=0; l<10; l++){
         // CHECK FOR VIEW ONLY EMPTY CELL
         var totalCell = $('#'+ gridObjId +' .wmSkuDetailsreportRowinventory .gridCellLottable[data-lotindex="'+ l +'"]').length;
         var totalEmptyCell = $('#'+ gridObjId +' .wmSkuDetailsreportRowinventory .gridCellLottable[data-lotindex="'+ l +'"]:empty').length;

        if(totalCell > 0){
            if(totalCell != totalEmptyCell){
                $('#'+ gridObjId +' .gridCellLottable[data-lotindex="'+ l +'"]').show();
             }else{
                $('#'+ gridObjId +' .gridCellLottable[data-lotindex="'+ l +'"]').hide();
             }
        }else{
            $('#'+ gridObjId +' .gridCellLottable[data-lotindex="'+ l +'"]').hide();
        }
    }
}


function getInventoryRecordList() 
{
    //debugger;
	var apiPath = wmsApiPath + 'ReportStatic/getInventoryAgingReport';
    //var apiPath = "http://localhost:50068/api/staging/v1/ReportStatic/getInventoryAgingReport";
    var gridObjId = 'txtInventoryReportlist' + obj;
    var reportLottableFilter = getLottableFilterValues(gridObjId);
   
    var postData =
    {
        CustId: getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId,
        ProdGrpId:getProductCategory,
        PrdId: getProductCode,
        LocId: getlocationcode,
        AgingDay:getAgingdropdown,
        filterLottable:reportLottableFilter
      }
   
    callHttpUrl(apiPath, postData, function (data) 
    {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            var myGridList = data.Result;
            $('#txtInventoryReportlist').html('');  	            
            var gridTable = ''; 

            gridTable = gridTable + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap" style="background-color: #1c8fca;">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Customer Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Warehouse Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">SKU Code </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Sku Name</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Lottable1</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Lottable2</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Lottable3</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Location</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Available Quantity</div>';      
            
          //  gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Lottable</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Inventory Aging Bucket</div>'; 
            gridTable = gridTable + '</div>';
         
            for (var i = 0; i <myGridList.Table.length;i++)
             { 
                var getProductName = myGridList.Table[i].ProductName;
                var getProductCode = myGridList.Table[i].ProductCode;
                
                var getStock = myGridList.Table[i].Stock;
                var getLocCode = myGridList.Table[i].LocCode;
                var getCustomerName = myGridList.Table[i].CustomerName;
                var getWarehouseName = myGridList.Table[i].WarehouseName;
                // var getlot1 = myGridList.Table[i].lot1;
                // var getlot2 = myGridList.Table[i].lot2;
                // var getlot3 = myGridList.Table[i].lot3;
                
                
                
                var getAgingDays = myGridList.Table[i].AgingDays;
                
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row reportRow">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getCustomerName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getWarehouseName + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getProductCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getProductName + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot1 + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot2 + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot3 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getLocCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getStock + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getAgingDays + '</div>';
                gridTable = gridTable + '</div>';
            
            }
            $('#txtInventoryReportlist').html(gridTable);
        }
        else {
            alert('Unable to connect');
        }
    });
    InventoryProductCategoryDropdown();
}

function exportAtClient() 
{
    debugger;
    var exportFinalData = '';
    var getPageTitle = $('.previewPageTitle').text();
    $('.previewTable .reportHeaderRow').each(function () {
        var getMyCell = $(this).find('.reportHeaderCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconHeader');
            if (!isDetailIconHeader) {
				if($(this).css('display') != 'none'){
					var getMyText = $(this).text();
					if (exportData == '') {
						exportData = getMyText;
					} else {
						exportData = exportData + ", " + getMyText;
					}
				}
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });
    $('.previewTable .wmSkuDetailsreportRowinventory').each(function () {
        var getMyCell = $(this).find('.reportRowCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconCell');
            if (!isDetailIconHeader) {
				if($(this).css('display') != 'none'){
					var getMyText = $(this).text();
					if (exportData == '') {
						exportData = getMyText;
					} else {
						exportData = exportData + ", " + getMyText;
					}
				}
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });

    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([exportFinalData], { type: "text/plain" }));
    a.download = getPageTitle + ".csv";
    a.click();
}


