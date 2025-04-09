var getUserId = mBrillWmsSession.getUserId();
var getWarehouseId = "1";
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
   // createDoughnutChart('Self-Life-Aging-Chart', ['<30', '31-60', '61-90', '91-120', '121-150', '151-180', '180+'], ['100', '200', '300', '150', '220', '350', '80'], ['#0984e3', '#1B1464', '#ffbe76', '#be2edd', '#f368e0', '#4bcffa', '#feca57'], 'Buckets');
    getSelfLifeAgingPieChart();
    getSelfAgingList();
    getStockList();
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

function InventoryProductCategory()
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
            $("#txtProductcate").html('<option >--Select--</option>');
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
                    $("#txtProductcate").append('<option value = "'+getName+'">'+ getName +'</option>');
                    }
            }
        }       
        if (isStatus == 200) 
        {
            spngetName = [];
            spnId = [];
            $("#txtProductCo").html('<option >--Select--</option>');
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
                    $("#txtProductCo").append('<option value = "'+getProductCode+'">'+  getProductCode +'</option>');
                    }
            }
        }        
        if (isStatus == 200) 
        {
            spngetName = [];
            spnId = [];
            $("#txtProductLoc").html('<option >--Select--</option>');
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
                    $("#txtProductLoc").append('<option value = "'+getLoccode+'">'+  getLoccode +'</option>');
                    }
            }
        }        
    });   
}

function createDoughnutChart(canvasId, xValues, yValues, barColors, chartTitle) {

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

function getSelfLifeAgingPieChart() 
{
    debugger;
    var apiPath = wmsApiPath + "ReportStatic/getSelfLifeAgingReport";
    var gridObjId = 'gettopfiveorderobjrexta' + obj;
    var reportLottableFilter = getLottableFilterValues(gridObjId);
    
    var postData = 
    {
        CustId:  getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId,
        ProdGrpId:getProductCategory,
        PrdId: getProductCode,
        LocId: getlocationcode,
        AgingDay:getAgingdropdown,
        filterLottable:reportLottableFilter
    };
    
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') 
        {
          //  var getDays-0 = data.Result.Table[0].Days-0;
            var getDays0 = data.Result.Table[0].Days00;
            var getDays30 = data.Result.Table[0].Days30;
            var getDays60 = data.Result.Table[0].Days60;
            var getDays90 = data.Result.Table[0].Days90;
            var getDays120 = data.Result.Table[0].Days120;
            var getDays150 = data.Result.Table[0].Days150;
            var getDays180 = data.Result.Table[0].Days180;
           

            createDoughnutChart('Self-Life-Aging-Chart', ['0 Days', '30 Days', '60 Days','90 Days','120 Days','150 Days','180 Days'], [getDays0, getDays30, getDays60,getDays90,getDays120,getDays150,getDays180], ['#0984e3', '#1B1464', '#ffbe76', '#be2edd', '#f368e0', '#4bcffa', '#feca57'], 'Buckets');
        }
      //  getDispatchBarChart();
    });
}

function resetCanvas(canvasId) {
    var getCanvasHtml = document.getElementById(canvasId).outerHTML;
    var getCanvasParent = $('#' + canvasId).parent();
    $('#' + canvasId).remove();
    getCanvasParent.append(getCanvasHtml);
}

function getSelfAgingList() 
{
    debugger;
    var apiPath = wmsApiPath + 'ReportStatic/getSelfLifeAgingReport';
    var gridObjId = 'txtselfagingReportlist' + obj;
    var reportLottableFilter = getLottableFilterValues(gridObjId);

    var postData =
    {
        CustId:  getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId,
        ProdGrpId:getProductCategory,
        PrdId: getProductCode,
        LocId: getlocationcode,
        AgingDay:getAgingdropdown,
        filterLottable:reportLottableFilter
    };
    callHttpUrl(apiPath, postData, function (data) 
    {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') 
        { 
            // var myGridList = data.Result;
            // var getGridData = myGridList;

            var getResult = data.Result.Table;
            
            $("#txtselfagingReportlist" + obj).html("");

            var gridTable = '';

            // GRID HEADER' 
        
            
            gridTable = gridTable + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Sr.No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">SKU Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">SKU Description</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Lottable1</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Lottable2</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Lottable3</div>';
            for(var i=0; i < 10; i++)
            {
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell invLotHead" data-lotindex="'+i+'" data-lotlabel="" style="text-align:center;color: #b3b3b3;font-weight: 500;">Lottable'+ i +'</div>';
            }

            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">Current Total Stock</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">0 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">30 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">60 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">90 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">120 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">150 Days</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell">180 Days</div>';
            gridTable = gridTable + '</div>';
        
            

            for (var i = 0; i <getResult.length; i++) 
            {   
                var getsrno = getResult[i].SRNO;
                var getProductCode = getResult[i].ProductName;
                var getSkuDesp = getResult[i].SkuDesp;
                var getUOM = getResult[i].UOM;
                // var getlot1 = getResult[i].lot1;
                // var getlot2 = getResult[i].lot2;
                //  var getlot3 = getResult[i].lot3;
                var getCurrentStock = getResult[i].Stock;
                var getDays0 = getResult[0].Days0;
                var getDays30 = getResult[0].Days30;
                var getDays60 = getResult[0].Days60;
                var getDays90 = getResult[0].Days90;
                var getDays120 = getResult[0].Days120;
                var getDays150 = getResult[0].Days150;
                var getDays180 = getResult[0].Days180;
                

                // GRID ROW
                //gridTable = '';

                gridTable = gridTable + '<div class="wms-srv-grid-row reportRow">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getsrno + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getProductCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getSkuDesp + '</div>';
 
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot1 + '</div>'; 
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot2 + '</div>'; 
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot3 + '</div>'; 
                for(var k=0; k < 10; k++)
                    {
                        var lotNum = k + 1;
                        var getLottable = getResult[i]["Lottable" + lotNum];
                        gridTable = gridTable + '<div class="wms-srv-grid-cell invLotCell reportRowCell" data-lotindex="'+k+'" data-lotlabel="" style="text-align:center;font-weight: 500;">'+ getLottable +'</div>';
                    }

                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getCurrentStock + '</div>'; 
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays0 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays30 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays60 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays90 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays120 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays150 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getDays180 + '</div>';
                gridTable = gridTable + '</div>';

                
            }
             //$('#txtselfagingReportlistobjrexta').html(gridTable);
            $('#' + gridObjId).html(gridTable);
            var getLottableHeader = data.Result.Table1;
            bindLottableHeader(gridObjId, getLottableHeader);
            showHideLottableReportCell(gridObjId);
        }
        else {
            alert('Unable to connect Server!!');
        }
    });

    
}


function getStockList() 
{
    //debugger;
    var apiPath = wmsApiPath + 'ReportStatic/getSelfLifeAgingReport';
    var gridObjId = 'tblgridobjrexta' + obj;
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
    };

    callHttpUrl(apiPath, postData, function (data) {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            //var myGridList = data.Result;
            var getResult = data.Result.Table;

            $("#tblgridobjrexta" + obj).html("");
	            
            var gridTable = ''; 

            gridTable = gridTable + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap" style="background-color: #1c8fca;">';
            
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">SKU Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">SKU Name</div>';
            //  gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Mfg Date</div>';
            //  gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Expiry Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Location</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Available Quantity</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align: center;">Inventory Aging Bucket</div>'; 
            gridTable = gridTable + '</div>';
         
            for (var i = 0; i <getResult.length;i++)
             { 
                var getsrno = getResult[i].srno;
                var getProductName = getResult[i].ProductName;
                var getProductCode = getResult[i].ProductCode;
                
                var getStock = getResult[i].Stock;
                var getLocCode = getResult[i].LocCode;
                //var getlot1 = getResult[i].lot1;
                //var getlot2 = getResult[i].lot2;
                
                var getAgingDays = getResult[i].AgingDays;
                
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row reportRow">';
             
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getProductName + '</div>';  
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getProductCode + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot1 + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getlot2 + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getLocCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getStock + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell reportRowCell">' + getAgingDays + '</div>';
                gridTable = gridTable + '</div>';
            
            }
            $('#tblgrid').html(gridTable);
            var divHeight = $('#header-wrap').height(); 
            $('#gettopfiveorder').css('margin-top', divHeight+'px');
        }
        else {
            alert('Unable to connect');
        }
    });
    InventoryProductCategory();
}



function exportAtClient() 
{
    var exportFinalData = '';
    var getPageTitle = $('.previewPageTitle').text();
    $('.previewTable .reportHeaderRow').each(function () {
        var getMyCell = $(this).find('.reportHeaderCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconHeader');
            if (!isDetailIconHeader) {
                var getMyText = $(this).text();
                if (exportData == '') {
                    exportData = getMyText;
                } else {
                    exportData = exportData + ", " + getMyText;
                }
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });
    $('.previewTable .reportRow').each(function () {
        var getMyCell = $(this).find('.reportRowCell');
        exportData = '';
        $(getMyCell).each(function () {
            var isDetailIconHeader = $(this).hasClass('detailIconCell');
            if (!isDetailIconHeader) {
                var getMyText = $(this).text();
                if (exportData == '') {
                    exportData = getMyText;
                } else {
                    exportData = exportData + ", " + getMyText;
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
