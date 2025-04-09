var isEdiAdvanceSearchOn = "no";
var isSingleSKUOn = "no";
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId= mBrillWmsSession.getClientId();
var getobject = "SalesOrder";
var SKUSearch = "no";
var filtercol = '0'; 
var filterval = '0'; 
var globalActiveTab = 'OutboundOrder';
var searchfilter = 'ALL';
var searchvalue = '';
var CurrentPage = '1';
var getTotalRecords = '200';
var OutwardOrderListLimit = 200;
var recordLimit = '5';
var IsQC = 'NO';    
var more = true;

wmsLoadLayout(function()
{
	init();
	
});

// $(document).ready(function () {
    // init();
// });

function init() {
    debugger;
	getOutWardOrderList(filtercol,filterval);
	
	 $(".scancheck").click(function () {
        
        if ($(this).is(":checked")) {
            $(".enablescan").show();
        } else {
            $(".enablescan").hide();
        }
    });
    
    $('.wms-srv-grid-action a').click(function () {
        var getActionType = $(this).attr('data-prefix');
        // var getOrderId = $(this).attr('data-id');
        var getOrderId = '123';
        if (getActionType == 'APP') {
            openApproval(getOrderId);
        } else if (getActionType == 'DOC') {
            openDocument(getOrderId);
        } else if (getActionType == 'CMM') {
            openCommunication(getOrderId);
        } else if (getActionType == 'TRN') {
            openTransport(getOrderId);
        } else if (getActionType == '3PL') {
            open3PL(getOrderId);
        }
    });

    $('.wms-srv-more-btn-holder button').click(function () {
        if (more == true) {
            more = false;
            $('.wms-srv-grid-more-navbar').show();
        }
        else {
            more = true;
            $('.wms-srv-grid-more-navbar').hide();
        }
    });

    $('.wms-srv-grid-more-navbar a').click(function () 
	{
        $('.wms-srv-grid-more-navbar').hide();
    });

    $('.pnlWmsDetail .wms-srv-btn-status-action').off();
    $('.pnlWmsDetail .wms-srv-btn-status-action').click(function () {
        var obj = $(this).offset();
        var getPopupWidth = $('#wmsSrvActionPopupMenu').width();
        var getPopupHeight = $('#wmsSrvActionPopupMenu').height();
        var popupTop = obj.top - getPopupHeight;
        var popupLeft = obj.left;
        $('#wmsSrvActionPopupMenu').css('top', popupTop + 'px');
        $('#wmsSrvActionPopupMenu').css('left', popupLeft + 'px');

        $('#wmsSrvActionPopupMenu a').off();
        $('#wmsSrvActionPopupMenu a').click(function () {
            $('#wmsSrvActionPopupMenu').hide();
        });
        $('#wmsSrvActionPopupMenu').show();
        return false;
    });

    $('.wms-srv-add-order').click(function () {
        addOrder();
    });

    $('#ddlOrderType').change(function () {
        var getOrderType = $('#ddlOrderType').val();
        $('#purchaseOrderGrid').hide();
        $('#EdiSearchGrid').hide();
        $('#EcommerceGrid').hide();
        $("#batchlistGrid").hide();
        $("#pickinglistGrid").hide()
        $("#staginglistGrid").hide();
        $("#QualityCheckGrid").hide();
        $("#PassedBatchGrid").hide();
        isEdiAdvanceSearchOn = "no";

        if (getOrderType == 'SalesOrder' || getOrderType == 'ScrapOrder' || getOrderType == 'TransferOut' || getOrderType == 'VendorReturn') {
            getOutWardOrderList(filtercol,filterval);
            $('#purchaseOrderGrid').show();
        } else if (getOrderType == 'Edi') {
            getEDIOrderlist(1);
            $('#EdiSearchGrid').show();
        } else if (getOrderType == 'Ecommerce') {
            getECommOrderlist(1);
            $('#EcommerceGrid').show();
        }
    });

    $('.btnAdvanceEdiSearch').click(function () {
        if (isEdiAdvanceSearchOn == "no") {
            isEdiAdvanceSearchOn = "yes";
            $('.wms-srv-advance-cell').show();
        } else {
            isEdiAdvanceSearchOn = "no";
            $('.wms-srv-advance-cell').hide();
        }
    });
    $('#ddlOrderType').val('SalesOrder');


    $(".btnHeadOutbound").click(function () {
        var getOrderType = $('#ddlOrderType').val();
        $("#batchlistGrid").hide();
        $('#purchaseOrderGrid').hide();
        $('#EdiSearchGrid').hide();
        $('#EcommerceGrid').hide();
        $("#pickinglistGrid").hide()
        $("#staginglistGrid").hide();
        $("#QualityCheckGrid").hide();
        $("#PassedBatchGrid").hide();

        if (getOrderType == 'SalesOrder' || getOrderType == 'ScrapOrder' || getOrderType == 'TransferOut' || getOrderType == 'VendorReturn') 
		{
            getOutWardOrderList(filtercol,filterval);
            $('#purchaseOrderGrid').show();
        } else if (getOrderType == 'Edi') {
            getEDIOrderlist(1);
            $('#EdiSearchGrid').show();
        } else if (getOrderType == 'Ecommerce') {
            getECommOrderlist(1);
            $('#EcommerceGrid').show();
        }
    });


    //batch list
    $(".btnHeadAllocate").click(function () 
	{
        $("#batchlistGrid").show();
        // getBatchListForSo(1);

        $('#purchaseOrderGrid').hide();
        $('#EdiSearchGrid').hide();
        $('#EcommerceGrid').hide();
        $("#pickinglistGrid").hide()
        $("#staginglistGrid").hide();
        $("#QualityCheckGrid").hide();
        $("#PassedBatchGrid").hide(); 
        initbatchlist();  
    });
    //picking List
    $(".btnHeadPicking").click(function () 
	{
        $("#pickinglistGrid").show();
        $('#purchaseOrderGrid').hide();
        $('#EdiSearchGrid').hide();
        $('#EcommerceGrid').hide();
        $("#batchlistGrid").hide();
        $("#staginglistGrid").hide();
        $("#QualityCheckGrid").hide();
        $("#PassedBatchGrid").hide();
        initpicking();
        
    });
    //Satging List
    $(".btnHeadStaging").click(function () {
        $("#staginglistGrid").show();
        $("#pickinglistGrid").hide();
        $('#purchaseOrderGrid').hide();
        $('#EdiSearchGrid').hide();
        $('#EcommerceGrid').hide();
        $("#batchlistGrid").hide();
        $("#QualityCheckGrid").hide();
        $("#PassedBatchGrid").hide();
        initpacking();
    });
    //QualityCheck List
    $(".btnHeadQualityCheck").click(function () {
        $("#QualityCheckGrid").show();
        $("#staginglistGrid").hide();
        $("#pickinglistGrid").hide();
        $('#purchaseOrderGrid').hide();
        $('#EdiSearchGrid').hide();
        $('#EcommerceGrid').hide();
        $("#batchlistGrid").hide();
        $("#PassedBatchGrid").hide();
        initQClist();
    });
    //PassedBatch List
    $(".btnHeadPassedBatch").click(function () {
        $("#PassedBatchGrid").show();
        $("#staginglistGrid").hide();
        $("#pickinglistGrid").hide();
        $('#purchaseOrderGrid').hide();
        $('#EdiSearchGrid').hide();
        $('#EcommerceGrid').hide();
        $("#batchlistGrid").hide();
        $("#QualityCheckGrid").hide();
        initDispatch();
    });

    //Completed list
    // $(".btnTaskCompleted").click(function () {
    //     $("#PassedBatchGrid").show();
    //     $("#staginglistGrid").hide();
    //     $("#pickinglistGrid").hide();
    //     $('#purchaseOrderGrid').hide();
    //     $('#EdiSearchGrid').hide();
    //     $('#EcommerceGrid').hide();
    //     $("#batchlistGrid").hide();
    //     $("#QualityCheckGrid").hide();
    //     initDispatch();
    // });


    $('.wms-srv-count-box-holder').click(function () 
    {
        $('.wms-srv-count-box-holder').removeClass('dashboardActiveTab');
        $(this).addClass('dashboardActiveTab');
    });

}

function showeditrow(){
	$('#wms-srv-editrow').show();
	$('#wms-srv-mainrow').hide();
	$('#wms-srv-row-close').off();
	$('#wms-srv-row-close').click(function () {
		$('#wms-srv-editrow').hide();
		$('#wms-srv-mainrow').show();
	});
	$('#wms-srv-row-save').click(function () {
		$('#wms-srv-editrow').hide();
		$('#wms-srv-mainrow').show();
		alert('Your record saved.');
	});
}

// function open3PL(oid) {
//     $('#wms-srv-3pl-popup').show();
//     $('#wms-srv-3pl-popup-close').off();
//     $('#wms-srv-3pl-popup-close').click(function () {
//         $('#wms-srv-3pl-popup').hide();
//     });
// }

function openApproval(oid) {
    $('#wms-srv-approval-popup').show();
    $('#wms-srv-approval-popup-close').off();
    $('#wms-srv-approval-popup-close').click(function () {
        $('#wms-srv-approval-popup').hide();
    });
}

function openDocument(oid) {
    $('#wms-srv-document-popup').show();
    $('#wms-srv-document-popup-close').off();
    $('#wms-srv-document-popup-close').click(function () {
        $('#wms-srv-document-popup').hide();
    });
}

function openCommunication(oid) {
    $('#wms-srv-communication-popup').show();
    $('#wms-srv-communication-popup-close').off();
    $('#wms-srv-communication-popup-close').click(function () {
        $('#wms-srv-communication-popup').hide();
    });
}

function openTransport(oid) {
    $('#wms-srv-transport-popup').show();
    $('#wms-srv-transport-popup-close').off();
    $('#wms-srv-transport-popup-close').click(function () {
        $('#wms-srv-transport-popup').hide();
    });
}

function openlabelprint(oid) {
    $('#wms-srv-labelprint-popup').show();
    $('#wms-srv-labelprint-popup-close').off();
    $('#wms-srv-labelprint-popup-close').click(function () {
        $('#wms-srv-labelprint-popup').hide();
    });
}


function openstockavailability(oid) {
    $('#wms-srv-stockavailability-popup').show();
    $('#wms-srv-stockavailability-popup-close').off();
    $('#wms-srv-stockavailability-popup-close').click(function () {
        $('#wms-srv-stockavailability-popup').hide();
    });
}

var getBatchListRecord;
var salesOrderHeadArr = [];

function getOutWardOrderList(filtercol,filterval) {
    debugger;
    var apiPath = wmsApiPath + 'SO/GetOutboundList';
    //var apiPath = "http://localhost:50068/api/staging/v1/SO/GetOutboundList";
    var getPageObject = $('#ddlOrderType').val();
    var filtercol = $('#ddlOutwardsearch').val();
    var filterval = $('#txtOutwardvalue').val();

    if (filtercol == '')
    {
        filtercol = '';
        filterval = '';
    }	

    var postData =
    {
        CurrentPage: CurrentPage,
        recordLimit: OutwardOrderListLimit,
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        ClientId : getClientId,
        UserId: getUserId,
        Object: getPageObject,
        filtercol: filtercol,
        filterval: filterval
      };
    
    callHttpUrl(apiPath, postData, function (data) {   
        searchfilter = filtercol;
        searchvalue = filterval;
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tlbOutWardGridSO').html('');
            var myGridList = data.Result;
            var getTotalRecords = myGridList.OutboundListResult[0].TotalRecords;
            var getHeaderList = myGridList.OutboundListResult[0].HeaderList;
            var arrHeaderList = getHeaderList.split(',');
            // GET DASHBOARD COUNTS
            
            var getOutboundOrder = myGridList.OutboundListResult[0].Dashboard[0].OutboundOrder;
            var getAllocated = myGridList.OutboundListResult[0].Dashboard[0].Allocated;
            var getPicking = myGridList.OutboundListResult[0].Dashboard[0].Picking;
            var getQualityCheck = myGridList.OutboundListResult[0].Dashboard[0].QC;
            var getPacking = myGridList.OutboundListResult[0].Dashboard[0].Packing;
            var getDispatch = myGridList.OutboundListResult[0].Dashboard[0].Shipped;
            IsQC = myGridList.OutboundListResult[0].Dashboard[0].IsQC.toUpperCase();

            $('#dashOutboundOrdercount').html(getOutboundOrder);
            $('#dashAllocatedcount').html(getAllocated);
            $('#dashPickingcount').html(getPicking);
            if(IsQC == 'YES'){
                $('#dashQualityCheckcount').html(getQualityCheck);
                $('#OutQualityCheck').show();
            }
            else{
                $('#OutQualityCheck').hide();
            }
            
            $('#dashStagingcount').html(getPacking);
            $('#dashPassedBatchcount').html(getDispatch);
           // $('#dashtaskCompletedcount').html(10);

            if (IsQC == 'NO')
			{
				$('.wms-srv-count-box-holder[id="OutQualityCheck"]').parent().hide();
				$('.dashBoard').each(function(){
					var hasClass = $(this).hasClass('col-md-2');
					if(hasClass)
					{
						$(this).removeClass('col-md-2');
						$(this).addClass('col-md-3');
					}
                    //else{
                    //    $(this).removeClass('col-md-3');
					//	$(this).addClass('col-md-2');
                    //}
				});
			}
            // GET DASHBOARD COUNTS

            // BIND DATA GRID
            var gridTable = '';


            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"></div>'; /*<input type="checkbox" value="ID">*/
            for (var h = 0; h < arrHeaderList.length; h++) {
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + arrHeaderList[h] + "</div>";              
            }
            gridTable = gridTable + '</div>';
            // GRID HEADER

            var getGridData = data.Result.OutboundListResult[0].OutboundList;
            salesOrderHeadArr = [];
            for (var i = 0; i < getGridData.length; i++) {
                 var getSource = getGridData[i].Source;
                var getOrderNo = getGridData[i].OrderNo;
                var getSAPNo = getGridData[i].SAPOrderNo;
                var getCustomerPo = getGridData[i].CustomerPO;
                var getGroupName = getGridData[i].GroupName;
                var getOrderDate = getGridData[i].OrderDate;
                var getExpectedDeliveryDate = getGridData[i].ExpDeliveryDt;
                var getPriority = getGridData[i].Priority;
                var getDeliveryType = getGridData[i].DeliveryType;
                var getShippingAddress = getGridData[i].ShippingAddress;
                var getClientCode = getGridData[i].ClientCode;
                var getOrderType = getGridData[i].OrderType;
                var getStatus = getGridData[i].Status;
                var getStatusID = getGridData[i].StatusID;
                var getWarehouseCode = getGridData[i].code;
                var GetApproval = getGridData[i].Approval;
                salesOrderHeadArr[getOrderNo] = getGridData[i];
               
                // GRID ROW
               gridTable = gridTable + '<div id="div' + getOrderNo +'" class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="selectGridRow(this);" class="messageCheckbox" data-status="'+getStatusID+'" name="'+getGroupName+'" value="' + getOrderNo + '" id="' + getOrderNo+'" approval="' + GetApproval+'" orderstatus="' + getStatus +'"></div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustomerPo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getGroupName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getWarehouseCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getExpectedDeliveryDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPriority + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDeliveryType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
                
                var objectHeadData = "Order No|" + getOrderNo + ",Order Date|" + getOrderDate + ",Delivery Date|" + getExpectedDeliveryDate + ",Order Reference No|" + getSAPNo + ",Priority|" + getPriority + ",Delivery Type|" + getDeliveryType + "";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindOutboundStatusControl(getOrderNo, getStatus, getStatusID) + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindActionControl(getOrderNo, objectHeadData,GetApproval) + "</div>";
                
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#tlbOutWardGridSO').html(gridTable);

            setupGridPagingList('tlbOutWardListGridPager', CurrentPage, getTotalRecords, getOutWardOrderList, OutwardOrderListLimit);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
    // var divHeight = $('#header-wrap').height(); 
    // $('#tlbOutWardGridSO').css('margin-top', divHeight+'px');
}


function SearchOutWardList(){	

	filtercol = $('#ddlOutwardsearch').val();
	filterval = $('#txtOutwardvalue').val();
	
	if(filterval =='')
	{
		alert('Please Enter value for filter');		
	}
	else
	{	
		getOutWardOrderList(filtercol,filterval);	
	}
	if(filtercol =='' && filterval =='')
	{
		getOutWardOrderList(filtercol,filterval);	
	}
}

function getEDIOrderlist(pageNo) 
{
    $('#tlbOutboundGridSO').html('');
    var apiPath = apiServerPath + 'GetOutboundList';
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getUserId = $("#hdnUserID").val();
    var getPageObject = $('#ddlOrderType').val();
    var filtercol = $('#ddlfilteredi').val();
    var filterval = $('#txtfilteredi').val();

    var postData =
    {
        "CurrentPage": pageNo,
        "recordLimit": recordLimit,
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseID,
        "UserId": getUserId,
        "Object": getPageObject,
        "isEdiAdvanceSearch": isEdiAdvanceSearchOn,
        "isSingleSKUOn": isSingleSKUOn,
        "filtercol": filtercol,
        "filterval": filterval,
        "Skusearch": isSingleSKUOn
    };
    //purchaseOrderGrid
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == '200') {
            $('#tlbOutboundGridEDI').html('');
            var getResult = data.Result;
            var myGridList = JSON.parse(getResult);

            var getCurrentPage = myGridList.OutboundListResult[0].CurrentPage;
            var getTotalRecords = myGridList.OutboundListResult[0].TotalRecords;
            var getHeaderList = myGridList.OutboundListResult[0].HeaderList;
            var arrHeaderList = getHeaderList.split(',');
            // GET DASHBOARD COUNTS
            var getOutboundOrder = myGridList.OutboundListResult[0].Dashboard[0].OutboundOrder;
            var getAllocated = myGridList.OutboundListResult[0].Dashboard[0].Allocated;
            var getPicking = myGridList.OutboundListResult[0].Dashboard[0].Picking;
            var getStaging = myGridList.OutboundListResult[0].Dashboard[0].Staging;
            var getShipped = myGridList.OutboundListResult[0].Dashboard[0].Shipped;
            var getCancelOrder = myGridList.OutboundListResult[0].Dashboard[0].CancelOrder;

            $('#dashOutboundOrderedi').html(getOutboundOrder);
            $('#dashAllocatededi').html(getAllocated);
            $('#dashPickingedi').html(getPicking);
            $('#dashStagingedi').html(getStaging);
            $('#dashShippededi').html(getShipped);
            $('#dashCancelOrderedi').html(getCancelOrder);
            // GET DASHBOARD COUNTS

            // BIND DATA GRID
            var gridTable = '';

            // GRID HEADER
            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="checkAll(this);" value="ID" id="chkall"></div>';
            for (var h = 0; h < arrHeaderList.length; h++) {
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + arrHeaderList[h] + "</div>";
            }
            gridTable = gridTable + '</div>';
            // GRID HEADER

            var getGridData = myGridList.OutboundListResult[0].OutboundList;
            for (var i = 0; i < getGridData.length; i++) {
                var getOrderNo = getGridData[i].Id;
                var getCustomerPo = getGridData[i].CustomerPO;
                var getGroupName = getGridData[i].GroupName;
                var getOrderDate = getGridData[i].OrderDate;
                var getStartDate = getGridData[i].StartDate;
                var getEndDate = getGridData[i].EndDate;
                var getShippingAddress = getGridData[i].ShippingAddress;
                var getType = getGridData[i].Type;
                var getClientCode = getGridData[i].ClientCode;
                var getCustomerCode = getGridData[i].CustomerCode;
                var getStatus = getGridData[i].StatusName;
                var getCarrier = "";
                if (isEdiAdvanceSearchOn == "yes") {
                    getCarrier = getGridData[i].Carrier;
                }
                // GRID ROW
                gridTable = gridTable + '<div id="div' + getOrderNo +'" class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" name="check" id="' + getOrderNo+'" onclick="selectGridRowEDI(this);" class="messageCheckboxedi" value="' + getOrderNo + '"></div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustomerPo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getGroupName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getStartDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getEndDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustomerCode + "</div>";
                if (isEdiAdvanceSearchOn == "yes") {
                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCarrier + "</div>";
                }
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindOutboundStatusControl(getOrderNo, getStatus) + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindActionControl(getOrderNo) + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#tlbOutboundGridEDI').html(gridTable);

            setupGridPaging('tlbOutboundEDIGridPager', getCurrentPage, getTotalRecords, getOutboundOrderlist);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getECommOrderlist(pageNo) {
    var apiPath = apiServerPath + 'GetOutboundList';
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getUserId = $("#hdnUserID").val();
    var getPageObject = $('#ddlOrderType').val();
    var filtercol = $('#ddlfilterecomm').val();
    var filterval = $('#txtfilterecomm').val();

    var postData =
    {
        "CurrentPage": pageNo,
        "recordLimit": recordLimit,
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseID,
        "UserId": getUserId,
        "Object": getPageObject,
        "isEdiAdvanceSearch": isEdiAdvanceSearchOn,
        "isSingleSKUOn": isSingleSKUOn,
        "filtercol": filtercol,
        "filterval": filterval,
        "Skusearch": isSingleSKUOn
    };
    //purchaseOrderGrid
    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == '200') {
            $('#tlbOutboundGridEComm').html('');
            var getResult = data.Result;
            var myGridList = JSON.parse(getResult);

            var getCurrentPage = myGridList.OutboundListResult[0].CurrentPage;
            var getTotalRecords = myGridList.OutboundListResult[0].TotalRecords;
            var getHeaderList = myGridList.OutboundListResult[0].HeaderList;
            var arrHeaderList = getHeaderList.split(',');
            // GET DASHBOARD COUNTS
            var getPendingApproval = myGridList.OutboundListResult[0].Dashboard[0].PendingApproval;
            var getAllocated = myGridList.OutboundListResult[0].Dashboard[0].Allocated;
            var getPicking = myGridList.OutboundListResult[0].Dashboard[0].Picking;
            var getPacking = myGridList.OutboundListResult[0].Dashboard[0].Packing;
            var getShipped = myGridList.OutboundListResult[0].Dashboard[0].Shipped;

            $('#dashPendingApproval').html(getPendingApproval);
            $('#dashAllocatedecomm').html(getAllocated);
            $('#dashPickingecomm').html(getPicking);
            $('#dashPacking').html(getPacking);
            $('#dashShippedecomm').html(getShipped);
            // GET DASHBOARD COUNTS

            // BIND DATA GRID
            var gridTable = '';

            // GRID HEADER
            gridTable = gridTable + '<div class="wms-srv-grid-header" id="header-wrap">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="checkAllEcomm(this);" value="ID" id="chkallecomm"></div>';
            for (var h = 0; h < arrHeaderList.length; h++) {
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + arrHeaderList[h] + "</div>";
            }
            gridTable = gridTable + '</div>';
            // GRID HEADER

            var getGridData = myGridList.OutboundListResult[0].OutboundList;
            for (var i = 0; i < getGridData.length; i++) {
                var getOrderNo = getGridData[i].Id;
                var getCustomerPo = getGridData[i].CustomerPO;
                var getGroupName = getGridData[i].GroupName;
                var getOrderDate = getGridData[i].OrderDate;
                var getStartDate = getGridData[i].StartDate;
                var getEndDate = getGridData[i].EndDate;
                var getShippingAddress = getGridData[i].ShippingAddress;
                var getClientCode = getGridData[i].ClientCode;
                var getCustomerCode = getGridData[i].CustomerCode;
                var getTrackingNo = getGridData[i].TrackingNo;
                var getStatus = getGridData[i].Status;
                // GRID ROW
                gridTable = gridTable + '<div id="div' + getOrderNo + '" class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="checkbox" onclick="selectGridRowECOMM(this);" name="checkecomm" class="messageCheckboxecomm" value="' + getOrderNo + '" id="' + getOrderNo + '"></div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustomerPo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getGroupName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getOrderDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getStartDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getEndDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getShippingAddress + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getClientCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCustomerCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindOutboundStatusControl(getOrderNo, getStatus) + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindActionControl(getOrderNo) + "</div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#tlbOutboundGridEComm').html(gridTable);

            setupGridPaging('tlbOutboundECommGridPager', getCurrentPage, getTotalRecords, getOutboundOrderlist);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function bindStatusControl(orderId, strStatus) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getStatusColor('Expected Receipt', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Expected Receipt" onclick="viewOrder(\'' + orderId + '\');return false;"></div>';

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Receiving', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Receiving" onclick="viewgrnOrder(\'' + orderId + '\');return false;"></div>';
    if (IsQC == 'YES') {
        htmlControl = htmlControl + ' <div class="wms-srv-dot wmsStatusQualityCheck wms-srv-' + getStatusColor('Quality Check', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Quality Check" onclick="viewQualityCheck(\'' + orderId + '\');return false;"></div>';
    }

    htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Put Away', strStatus) + '" data-orderid="' + orderId + '" data-status="' + strStatus + '" title = "Put Away" onclick="viewPutAway(\'' + orderId + '\');return false;"></div>';

    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function bindOutboundStatusControl(orderId, strStatus, strStatusid) {
    debugger;
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';

    if(strStatusid == "24"){
        htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-grey" data-orderid="' + orderId + '" data-status="' + strStatusid + '" title = "Outbound Order" onclick="viewOrder(\'' + orderId + '\', \''+ strStatusid +'\');return false;"></div>';
    }
    else{
        htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-green" data-orderid="' + orderId + '" data-status="' + strStatusid + '" title = "Outbound Order" onclick="viewOrder(\'' + orderId + '\', \''+ strStatusid +'\');return false;"></div>';
    }
    
    
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function getStatusColor(dataFor, currentStatus) {
    var myColor = 'gray';

    if (dataFor == 'Expected Receipt') {
        if (currentStatus == 'Expected Receipt' || currentStatus == 'Receiving' || currentStatus == 'Partially Completed' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        }
    } else if (dataFor == 'Receiving') {
        if (currentStatus == 'Receiving' || currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        } else if (currentStatus == 'Partially Completed') {
            myColor = 'partial';
        } else if (currentStatus == 'Expected Receipt') {
            myColor = 'red';
        }

    } else if (dataFor == 'Quality Check') {
        if (currentStatus == 'Quality Check' || currentStatus == 'Put Away') {
            myColor = 'green';
        } else if (currentStatus == 'Receiving' || currentStatus == 'Partially Completed') {
            myColor = 'red';
        }

    } else if (dataFor == 'Put Away') {
        if (currentStatus == 'Put Away') {
            myColor = 'green';
        } else if (currentStatus == 'Quality Check') {
            myColor = 'red';
        }
    }
    return myColor;
}
function openInwardDetailReport(dataVal) {
    debugger;
    mBrillWmsSession.setReportDetailId(dataVal);
    window.open("WMSReport/DetailReport/Sale-order-Template.html"); 
}
function bindActionControl(orderId, objectHeadData,getApproval) {
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-grid-action">'; 

    // start New Approval Column Show hide as per customer approval
    if(getApproval== 'Yes') 
    {
     htmlControl = htmlControl + '<a href="#" title="Approval" data-prefix="APP" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openApprovalTrans(' + orderId + ', \'SalesOrder\');"><i class="fas fa-user-check"></i></a>';    
     htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    }
        // start New Approval Column Show hide as per customer approval

    htmlControl = htmlControl + '<a href="#" title="Document" data-prefix="DOC" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openDocumentObject(' + orderId + ', \'outward\', \''+ objectHeadData +'\');"><i class="fas fa-file-alt"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="Communication" data-prefix="CMM" data-orderid="' + orderId + '" class="wms-srv-icononly" onClick="openCommunicationObject(' + orderId + ', \'outward\', \''+ objectHeadData +'\');"><i class="fas fa-envelope"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    htmlControl = htmlControl + '<a href="#" title="Report" data-orderid="' + orderId + '" class="wms-srv-icononly" onclick="openInwardDetailReport(' + orderId + ');return false;"><i class="fas fa-solid fa-eye"></i></a>';
    htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
        htmlControl = htmlControl + '<a href="#" title="3PL" data-prefix="3PL" data-orderid="" class="wms-srv-icononly btn3pl" onClick="open3PLoutward(' + orderId + ');"><i class="fa fa-receipt"></i></a>';
    htmlControl = htmlControl + ' </div>';

    return htmlControl;
}

function setupGridPaging(gridObjId, CurrentPage, strTotalRecords, callBackFunction) {
    var global_max_record_count = 10;
    var pageNo = Number(CurrentPage);
    var recordFrom = ((pageNo - 1) * 10) + 1;
    var recordTo = recordFrom + 9;
    var totalRecord = Number(strTotalRecords);
    var pagerLinks = '';

    $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
    var lnkCounter = 1;
    var currentCounter = global_max_record_count;
    //var currentCounter = 0;
    var lastPage = 0;
    while (currentCounter < totalRecord) {
        if (lnkCounter == pageNo) {
            pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
        } else {
            pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
            lastPage = lnkCounter;
        }
        global_last_page_no = lnkCounter;
        currentCounter = currentCounter + global_max_record_count;
        lnkCounter = lnkCounter + 1;
    }

    /* Add Page linke for remaining record */
    if (currentCounter > totalRecord) {
        if (lnkCounter == pageNo) {
            pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
        } else {
            pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
            lastPage = lnkCounter;
        }
        // Update last page count - 21 Sept 2021
        this.global_last_page_no = lnkCounter;
    }
    /* Add Page linke for remaining record */
    var pagerNavLinks = '';
    pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
    pagerNavLinks += pagerLinks;   
    pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';

    $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

    $('#' + gridObjId + ' .wms-srv-pager-links a').off();
    $('#' + gridObjId + ' .wms-srv-pager-links a').click(function () {
        var getDataPage = $(this).attr('data-page');
        if (callBackFunction != null) {
            callBackFunction(getDataPage);           
        }
    });

    $('#' + gridObjId + ' a.wms-srv-pager-go').off();
    $('#' + gridObjId + ' a.wms-srv-pager-go').click(function () {
        var getDataPage = $('#tlbOutWardGridPager input[name="txtGridPageNo"]').val();
        if (Number(getDataPage) < 1) {
            alert('Please enter valid page number!!');
        } else if (Number(getDataPage) > Number(lastPage)) {
            alert('Page number should not be greater than ' + lastPage + ' !!');
        } else {
            if (callBackFunction != null) {
                callBackFunction(getDataPage);               
            }
        }

    });
}

function CancelOrder() {
    more = true;
    CancelSO();
}

function selectGridRow(chkObj) {
    var getChkId = chkObj.id;
    if ($(chkObj).prop('checked')) {
        $('#div' + getChkId).css("background", "#efefef");
        $('#' + getChkId).prop("checked", true);
    } else {
        $('#div' + getChkId).css("background", "#ffffff");
        $('#' + getChkId).prop("checked", false);
    }
}

function selectGridRowEDI(chkObj) {
    var getChkId = chkObj.id;
    var selectall = document.getElementById('hdnSelectAll');
    if ($(chkObj).prop('checked')) {
        $('#div' + getChkId).css("background", "#efefef");
        $('#' + getChkId).prop("checked", true);
    } else {
        $('#div' + getChkId).css("background", "#ffffff");
        $('#' + getChkId).prop("checked", false);
    }

    $('#chkall').prop("checked", false);
    selectall.value = "0";
}

function selectGridRowECOMM(chkObj) {
    var getChkId = chkObj.id;
    var selectall = document.getElementById('hdnSelectAll');
    if ($(chkObj).prop('checked')) {
        $('#div' + getChkId).css("background", "#efefef");
        $('#' + getChkId).prop("checked", true);
    } else {
        $('#div' + getChkId).css("background", "#ffffff");
        $('#' + getChkId).prop("checked", false);
    }

    $('#chkallecomm').prop("checked", false);
    selectall.value = "0";
}

function CancelSO()
 {
    debugger;
    var SelectedOrder = document.getElementById("hdnSelectedRec");
    SelectedOrder.value = "";
    var batch="";
    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });

    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (batch == "") {
                batch = $(this).attr("name");
            }
            else {
                batch = batch + "," + $(this).attr("name");
            }
        }
    });

    var val = SelectedOrder.value.split(',');
    if ((val.length == 1) && (SelectedOrder.value != "") && (batch == "")) {
        var orderid = SelectedOrder.value;
        var apiPath = wmsApiPath + 'SO/CancelSO';

        var postData =
        {
            "OrderId": orderid,
            "UserId": getUserId
        };
        callHttpUrl(apiPath, postData, function (data) {
            var myJson = data;
            var getStatus = myJson.Status;
            var getStatusCode = myJson.StatusCode;
            if (getStatusCode == 'Success') {
                alert('Order has been Cancelled..!');
                getOutWardOrderList(filtercol,filterval);
            }
            else if (getStatus == '300') {
                alert(myJson.Result.Message);
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
    else {
        alert("Please Select One Order with no batch created..!");
    }
}

function CreatePlan() 
{
    more = true;
    var SelectedOrder = document.getElementById("hdnSelectedRec");
    var selectall = document.getElementById('hdnSelectAll');
    SelectedOrder.value = "";
    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });
    alert(SelectedOrder.value);
}

function CreatePlanEDI() 
{
    more = true;
    var SelectedOrder = document.getElementById("hdnSelectedRec");
    var selectall = document.getElementById('hdnSelectAll');
    SelectedOrder.value = "";
    $("input[class=messageCheckboxedi]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });
    alert(SelectedOrder.value);
}

function ImportSO() 
{
    more = true;
    window.open('../WMSImport/WMSImport.aspx?obj=SalesOrder', '_self', '');
}

function AdvanceSearch() {
    more = true;
    isEdiAdvanceSearchOn = "yes";
    getEDIOrderlist(1);
}

function CancelOrderedi() {
    more = true;
    var SelectedOrder = document.getElementById("hdnSelectedRecedi");
    SelectedOrder.value = "";
    $("input[class=messageCheckboxedi]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });

    var val = SelectedOrder.value.split(',');
    if ((val.length == 1) && (SelectedOrder.value !="")) {
        var getUserId = $("#hdnUserID").val();
        var orderid = SelectedOrder.value;
        var apiPath = apiServerPath + 'CancelSO';

        var postData =
        {
            "OrderId": orderid,
            "UserId": getUserId
        };
        callHttpUrl(apiPath, postData, function (data) {
            var getStatusCode = data.StatusCode;
            var desc = data.Description;
            if (getStatusCode == '200') {
                alert('Order has been Cancelled..!');
                getEDIOrderlist(1);
            }
            else if (getStatusCode == '300') {
                alert(desc);
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
    else {
        alert("Please Select One Order");
    }
}

function SingleSKUOrder(flag) {
    more = true;
    isSingleSKUOn = flag;
    getEDIOrderlist(1);
}

function checkAll(chkobj) {
    var checkboxes = document.getElementsByName('check');
    var selectall = document.getElementById('hdnSelectAll');
    if ($(chkobj).prop('checked')) {
        for (var i = 0; i < checkboxes.length; i++) {
            $('#div' + checkboxes[i].id).css("background", "#efefef");
            $('#' + checkboxes[i].id).prop("checked", true);
        }
        selectall.value = "1";
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            $('#div' + checkboxes[i].id).css("background", "#ffffff");
            $('#' + checkboxes[i].id).prop("checked", false);
        }
        selectall.value = "0";
    }
}

function checkAllEcomm(chkobj) {
    var checkboxes = document.getElementsByName('checkecomm');
    var selectall = document.getElementById('hdnSelectAll');
    if ($(chkobj).prop('checked')) {
        for (var i = 0; i < checkboxes.length; i++) {
            $('#div' + checkboxes[i].id).css("background", "#efefef");
            $('#' + checkboxes[i].id).prop("checked", true);
        }
        selectall.value = "1";
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            $('#div' + checkboxes[i].id).css("background", "#ffffff");
            $('#' + checkboxes[i].id).prop("checked", false);
        }
        selectall.value = "0";
    }
}

function holdNrelease() {
    more = true;
    var SelectedOrder = document.getElementById("hdnSelectedRececomm");
    SelectedOrder.value = "";
    $("input[class=messageCheckboxecomm]").each(function () {
        if ($(this).prop("checked") == true) {
            if (SelectedOrder.value == "") {
                SelectedOrder.value = $(this).attr("id");
            }
            else {
                SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("id");
            }
        }
    });

    if (SelectedOrder.value != "") {
        var getUserId = $("#hdnUserID").val();
        var getWarehouseID = $("#ddlwarehouse").val();
        var getCustomerId = $("#ddlcustomer").val();
        var orderid = SelectedOrder.value;
        var apiPath = apiServerPath + 'HoldnRelease';

        var postData =
        {
            "CustomerId": getCustomerId,
            "WarehouseId": getWarehouseID,
            "OrderId": orderid,
            "UserId": getUserId
        };
        callHttpUrl(apiPath, postData, function (data) {
            var getStatusCode = data.StatusCode;
            var desc = data.Description;
            if (getStatusCode == '200') {
                alert('Order has been Updated..!');
                getECommOrderlist(1);
            }
            else if (getStatusCode == '300') {
                alert(desc);
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
    else {
        alert("Please Select Atleast One Order");
    }
}

function getJobCardData(obj, gridBatchId) {
    // var isJobDataVisible = $('#chJobData_' + gridBatchId).show();
    if ($('#chJobData_' + gridBatchId).is(":visible")) {
        $('#chJobData_' + gridBatchId).hide();
        $('#chJobData_' + gridBatchId).find('.chProdData').hide();
        $('#chJobData_' + gridBatchId).find('.chLocData').hide();

        $(obj).find('i').attr('class', 'fas fa-plus-square');
        $('#chJobData_' + gridBatchId).find('i').attr('class', 'fas fa-plus-square');
    } else {
        $(obj).find('i').attr('class', 'fas fa-minus-square');
        $('#chJobData_' + gridBatchId).show();
    }
}

function getProductData(obj, gridSalesOrderId) {
    if ($('#chProdData_' + gridSalesOrderId).is(":visible")) {
        $('#chProdData_' + gridSalesOrderId).hide();
        $('#chProdData_' + gridSalesOrderId).find('.chLocData').hide();
        $(obj).find('i').attr('class', 'fas fa-plus-square');
        $('#chProdData_' + gridSalesOrderId).find('i').attr('class', 'fas fa-plus-square');
    } else {
        $(obj).find('i').attr('class', 'fas fa-minus-square');
        $('#chProdData_' + gridSalesOrderId).show();
    }
}

function getLocationData(obj, gridSalesOrderId, gridProductId) {
    if ($('#chLocData_' + gridSalesOrderId + '_' + gridProductId).is(":visible")) {
        $('#chLocData_' + gridSalesOrderId + '_' + gridProductId).hide();
        $(obj).find('i').attr('class', 'fas fa-plus-square');
    } else {
        $(obj).find('i').attr('class', 'fas fa-minus-square');
        $('#chLocData_' + gridSalesOrderId + '_' + gridProductId).show();
    }
}

function deAllocate(){
    debugger;
    var selorder = "";
    var selBatch = "";
    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (selorder == "") {
                selorder = $(this).attr("id");
            }
            else {
                selorder = selorder + "," + $(this).attr("id");
            }
        }
    });

    $("input[class=messageCheckbox]").each(function () {
        if ($(this).prop("checked") == true) {
            if (selBatch == "") {
                selBatch = $(this).attr("name");
            }
            else {
                selBatch = selBatch + "," + $(this).attr("name");
            }
        }
    });
    var selOrderCnt = selorder.split(',');

    if(selorder !="" && selOrderCnt.length == 1 && selBatch != ""){
        var apiPath = wmsApiPath + 'SO/deAllocateOrder';
        //var apiPath = 'http://localhost:50068/api/staging/v1/SO/deAllocateOrder';

        var postData = {
            'UserId': getUserId,
            'OrderId': selorder
        };  
        callHttpUrl(apiPath, postData, function (data) {
            var myJson = data;
            var getStatus = myJson.Status;
            var getStatusCode = myJson.StatusCode;
            if (getStatusCode == 'Success') {
                getOutWardOrderList(filtercol,filterval);
            }
            else{
                var res = myJson.Result;
                alert(res.Message);
            }
        },function(){
            alert('Server error..!');
        });
    }
    else{
        alert("Please select one order having batch created..!");
    }
    
}

// function showHidePagingGroup(gridObjId){
//     var pagingGroup = $('#' + gridObjId + ' .wms-srv-pager-links .wms-paging-link[data-page="'+ CurrentPage +'"]').attr('data-group');
//     $('#' + gridObjId + ' .wms-srv-pager-links .wms-paging-link').hide();
//     $('[data-group="'+ pagingGroup +'"]').show();
//     $('#' + gridObjId + ' .wms-srv-pager-links .wms-first-paging-yes').show();
// }

// function setupGridPagingOutwardList(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) { //Changed Respective ID 
//     var global_max_record_count = 5;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 5) + 1;
//     var recordTo = recordFrom + 4;
//     var totalRecord = Number(strTotalRecords);
//     var pagerLinks = '';

//     if (totalRecord < recordTo) {
//         recordTo = totalRecord;
//     }

//     $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//     var lnkCounter = 1;
//     var currentCounter = global_max_record_count;
//     var pagingGroup = 1;
//     var pagingGroupCounter = 1;
//     var isFirstGroupLink = 'yes';
//     var lastPage = 0;
//     while (currentCounter < totalRecord) {
//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-paging-link wms-first-paging-'+ isFirstGroupLink +' wms-srv-active" data-page="' + lnkCounter + '" data-group="PagingGroup_'+ pagingGroup +'">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" class="wms-paging-link wms-first-paging-'+ isFirstGroupLink +'" data-page="' + lnkCounter + '" data-group="PagingGroup_'+ pagingGroup +'">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         global_last_page_no = lnkCounter;
//         currentCounter = currentCounter + global_max_record_count;
//         // Group Counter 
//         isFirstGroupLink = 'no';
//         pagingGroupCounter = pagingGroupCounter + 1;
//         if(pagingGroupCounter > global_max_record_count){
//             pagingGroup = pagingGroup + 1;
//             pagingGroupCounter = 1;
//             isFirstGroupLink = 'yes';
//             pagerLinks += '<a href="#" style="padding:0px 0px 0px 0px;  ">...</a>';
//         }
//         // Group Counter
//         lnkCounter = lnkCounter + 1;
//     }

//     // Add Page link for remaining record 
//     // if (currentCounter > totalRecord) {
//     if (totalRecord <= currentCounter) {
//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-paging-link wms-first-paging-'+ isFirstGroupLink +' wms-srv-active" data-page="' + lnkCounter + '" data-group="PagingGroup_'+ pagingGroup +'">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" class="wms-paging-link wms-first-paging-'+ isFirstGroupLink +'" data-page="' + lnkCounter + '" data-group="PagingGroup_'+ pagingGroup +'">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         this.global_last_page_no = lnkCounter;
//     } 
//     // Add Page link for remaining record
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//     pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//     $('#' + gridObjId + ' .wms-srv-pager-links a').off();
//     $('#' + gridObjId + ' .wms-srv-pager-links a').click(function () {
//         var getDataPage = $(this).attr('data-page');
//         CurrentPage = getDataPage;
//         showHidePagingGroup(gridObjId);
//         if (callBackFunction != null) {
//             callBackFunction(getDataPage, searchfilter, searchvalue);
//         }
//         return false;
//     });

//     $('#' + gridObjId + ' a.wms-srv-pager-go').off();
//     $('#' + gridObjId + ' a.wms-srv-pager-go').click(function () {
//         var getDataPage = $('#' + gridObjId + ' input[name="txtGridPageNo"]').val();
//         CurrentPage = getDataPage;
//         if (Number(getDataPage) < 1) {
//             alert('Please enter valid page number!!');
//         } else if (Number(getDataPage) > Number(lastPage)) {
//             alert('Page number should not be greater than ' + lastPage + ' !!');
//         } else {
//             showHidePagingGroup(gridObjId);
//             if (callBackFunction != null) {
//                 callBackFunction(getDataPage, searchfilter, searchvalue);
//             }
//         }
//         return false;
//     });
//     showHidePagingGroup(gridObjId);
// }

function clearFilter(){
    $("#ddlOutwardsearch").val("All");
    $('#txtOutwardvalue').val('');
    getOutWardOrderList('All','');
}


// 3pl object //

function open3PLoutward(orderId) 
{
    $('#wms-srv-popup-open-3ploutbound').show();
    $('#wms-srv-popup-Close-3ploutbound').off();
    $('#wms-srv-popup-Close-3ploutbound').click(function () {
        $('#wms-srv-popup-open-3ploutbound').hide();
    });
    GetobjectListoutward(orderId);
}

function showActivityoutward()
{
    $('#wms-srv-ActivityList-popup-open-outward1').show();
    $('#wms-srv-ActivityList-popup-close-outward2').off();
    $('#wms-srv-ActivityList-popup-close-outward2').click(function () {
        $('#wms-srv-ActivityList-popup-open-outward1').hide();
    });
    GetActivityListobjectoutward(CurrentPage,searchfilter,searchvalue);
}

function showZoneMasteroutward()
{
    $("#wms-srv-ZoneMaster-popup-outward").show();
    $("#wms-srv-ZoneMaster-popup-close-outward").click(function()
    {
        $("#wms-srv-ZoneMaster-popup-close-outward").off();
        $("#wms-srv-ZoneMaster-popup-outward").hide();
    });
    ZoneList();
}

function GetobjectListoutward(orderId) 
  {
       debugger;
     
      //globalskuid = selectedSkuid;
      var apiPath = wmsApiPath + '3PLBilling/getValueAdd';
       //var apiPath =  'http://localhost:50068/api/staging/v1/Product/GetGSTList';
		
      var postData =
      {
        "Object": "outward",
        "OrderId": orderId
      }
      callHttpUrl(apiPath, postData, function (data) 
      {
        
          var getstatus = data.Status;
          var getstatuscode = data.StatusCode;
          var getresult = data.Result;
          if (getstatus == "200" && getstatuscode == "Success") 
          {
              var Getobjectlist = getresult.Table;
              var objectGrid = "";

              objectGrid = objectGrid + '<div class="wms-srv-grid-header">';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Activity Type</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Rate</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Unit Type</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Bill Qty</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Remark</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Status</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
              objectGrid = objectGrid + '</div>';
  
              objectGrid = objectGrid + '<div class="wms-srv-grid-row wms-align divgstlstrow_0">';
              
            // objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input" required ></div>';
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">';
             objectGrid = objectGrid + '<div class="wms-srv-suggestion-holder"><input type="text" id="txtaccname" value="" class="wms-srv-grid-cell-input notranslate"><a href="#" onclick="showActivityoutward();"><i class="fas fa-search"></i></a><input type="hidden" data-prefix="SESKU" id="" value="" class="wms-srv-grid-cell-input notranslate"></div></div>';
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input" Id="txtrateoutward"></div>';

             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<select  class="wms-srv-grid-cell-input" id="ddlunittypeobjectoutward">';
            //  objectGrid = objectGrid + '<option value="">--Select All--</option>';
            //  objectGrid = objectGrid + '<option value="VAT">VAT</option>';
            //  objectGrid = objectGrid + '<option value="CGST">CGST</option>';
             objectGrid = objectGrid + '</select>';
             objectGrid = objectGrid + '</div>';
              
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input " Id="txtbillqtyoutward"></div>';
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input " Id="txtremarkoutward" ></div>';
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell"></div>';
             //objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input " Id="" value="" disabled></div>';
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<div class="wms-srv-grid-action">';
             objectGrid = objectGrid + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="Savevalueaddserviceoutward(0,'+orderId+');">';
             objectGrid = objectGrid + '<i class="fas fa-check-circle"></i></a></div></div>';
             objectGrid = objectGrid + '</div>';
  
              for (var li = 0; li < Getobjectlist.length; li++) 
              {
                  
                  var getID = Getobjectlist[li].ID;
                  var getActivityName = Getobjectlist[li].ActivityName;
                  var getRate = Getobjectlist[li].Rate;
                  var getUnitTypeID = Getobjectlist[li].UnitTypeID;
                  var getSystemQty = Getobjectlist[li].SystemQty; 
                  var getRemark = Getobjectlist[li].remark;
                  var getStatus = Getobjectlist[li].Status;
                  var getUnittypevalue = Getobjectlist[li].Unittypevalue;

                  //var rowno = getReferenceID;

                  objectGrid = objectGrid + '<div class="wms-srv-grid-row wms-align" id="ParameterRowobjectoutward' + getID + '">';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getActivityName + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRate + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getUnittypevalue + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getSystemQty + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRemark + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getStatus + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-action">';
                  objectGrid = objectGrid + '<a href="#" title="Edit" class="wms-srv-save" onclick="EditobjectGridoutward('+ getID +','+orderId+',\'' + getActivityName + '\',\'' + getRate + '\',\'' + getUnittypevalue + '\',\'' + getSystemQty + '\',\'' + getRemark + '\',\'' + getStatus + '\')"><i class="fas fa-edit"></i></a>';
                  objectGrid = objectGrid + '</div>';
                  objectGrid = objectGrid + '</div>';
                  objectGrid = objectGrid + '</div>';
              }
              $('#pnlobjectoutward').html(objectGrid);
              UnitTypeobjectoutward();
          }
          else
          {
              alert('Something went wrong.');
          }
      });
  }

  function UnitTypeobjectoutward() 
  {
    debugger;
    var apiPath = wmsApiPath + 'RateCard/getUnitType';

    
    var postData =
    {
        "UserId": getUserId,
        "CompanyId": getCompanyId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            objectName = [];
            objectid = [];
            $("#ddlunittypeobjectoutward").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) 
                {
                    var getcatName = grnContainerSize[i].Value;
                    var getcatId = grnContainerSize[i].ID;
                    objectName.push(getcatName);
                    objectid.push(getcatId);
                    $("#ddlunittypeobjectoutward").append('<option value = "' + getcatId + '" name=\''+getcatName+'\'>' + getcatName + '</option>');
  
                }
            }
        }
    });
  }

  function GetActivityListobjectoutward(CurrentPage,searchfilter,searchvalue) 
  {
       debugger;
     
      //globalskuid = selectedSkuid;
      var apiPath = wmsApiPath + '3PLBilling/getActivityList';
       //var apiPath =  'http://localhost:50068/api/staging/v1/Product/GetGSTList';

       var searchfilter = $("#drop-down-search-activity-3plobject-outward").val();
       var searchvalue = $("#text-value-search-activity-outward").val();
     
    //    if (searchfilter == '0')
    //    {
    //        searchfilter = '0';
    //        searchvalue = '0';
    //    }
    
      var postData =
      {
        "CurrentPage": CurrentPage,
        "RecordLimit": "100",
        "CustomerId": getCustomerId,
        "UserId": getUserId,
        "Search": searchfilter,
        "Filter": searchvalue
      }
      callHttpUrl(apiPath, postData, function (data) 
      {
        
          var getstatus = data.Status;
          var getstatuscode = data.StatusCode;
          var getresult = data.Result;
          if (getstatus == "200" && getstatuscode == "Success") 
          {
              var Getobjectlist = getresult.Table1;
              var objectGrid = "";

              //$('#pnlactivitylistobject').html('');

              objectGrid = objectGrid + '<div class="wms-srv-grid-header">';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Object</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Activity Name</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Remark</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Zone</div>';
              objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
              objectGrid = objectGrid + '</div>';
  
              objectGrid = objectGrid + '<div class="wms-srv-grid-row wms-align">';
              
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<select  class="wms-srv-grid-cell-input" id="ddlobjectoutward">';
            //  objectGrid = objectGrid + '<option value="">--Select All--</option>';
            //  objectGrid = objectGrid + '<option value="VAT">VAT</option>';
            //  objectGrid = objectGrid + '<option value="CGST">CGST</option>';
             objectGrid = objectGrid + '</select>';
             objectGrid = objectGrid + '</div>';
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input txtvalue" required id="txtaccnameobject"></div>';
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<input type="text" value="" class="wms-srv-grid-cell-input " required id="txtRemarkobject"></div>';
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align: center;"><div class="wms-srv-suggestion-holder"><select id="ddlZoneoutward"></select><a href="#" onclick="showZoneMasteroutward();"><i class="fas fa-plus-circle btnAddEmailInToField"></i></a><input type="hidden" data-prefix="SESKU" id="texthdnFromLocationID" value="" class="wms-srv-grid-cell-input notranslate"></div></div>';
             
             objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
             objectGrid = objectGrid + '<div class="wms-srv-grid-action">';
             objectGrid = objectGrid + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveActivityobjectoutward()";">';
             objectGrid = objectGrid + '<i class="fas fa-check-circle"></i></a></div></div>';
             objectGrid = objectGrid + '</div>';
  
              for (var li = 0; li < Getobjectlist.length; li++) 
              {
                  
                  var getID = Getobjectlist[li].ID;
                  var getObjectName = Getobjectlist[li].ObjectName;
                  var getActivityName = Getobjectlist[li].ActivityName;
                  var getRemark = Getobjectlist[li].Remark;
                  var getZoneName = Getobjectlist[li].ZoneName;
                //   var getRemark = Getobjectlist[li].Remark;
                //   var getStatus = Getobjectlist[li].Status;

                  //var rowno = getReferenceID;

                  objectGrid = objectGrid + '<div class="wms-srv-grid-row wms-align divgstlstrow_">';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getObjectName + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getActivityName + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getRemark + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getZoneName + '</div>';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-cell">';
                  objectGrid = objectGrid + '<div class="wms-srv-grid-action">';
                  objectGrid = objectGrid + '<a href="#" title="Edit" class="wms-srv-save" onclick="getAccountIdobjectoutward('+getID+',\'' + getActivityName + '\');"><i class="fas fa-check-circle"></i></a>';
                  objectGrid = objectGrid + '</div>';
                  objectGrid = objectGrid + '</div>';
                  objectGrid = objectGrid + '</div>';
              }
              $('#pnlactivityoutward').html(objectGrid);
              ObjectDDLoutward();
          }
          else
          {
              alert('Something went wrong.');
          }
      });
  }

  var ActivityIdoutward = '';
  var ActivityNameoutward = '';

  function getAccountIdobjectoutward(Id, Name)
{
  debugger;
  ActivityIdoutward = Id;
  ActivityNameoutward = Name;
  
  $("#txtaccname").val(Name);
  $("#wms-srv-ActivityList-popup-open-outward1").hide();

}


  function SearchActivity3plobjectoutward()
  {
    var searchfilter = $("#drop-down-search-activity-3plobject-outward").val();
    var searchvalue = $("#text-value-search-activity-outward").val();
  
    if (searchvalue == '0') {
        alert('Please Enter value for filter');
    }
    else 
    {
        GetActivityListobjectoutward(CurrentPage,searchfilter,searchvalue) 
  
    }
    if (searchfilter == '' && searchvalue == '') 
    {
        GetActivityListobjectoutward(CurrentPage,searchfilter,searchvalue) 
    }
  }

  function ObjectDDLoutward() 
  {
    debugger;
    var apiPath = wmsApiPath + 'RateCard/getObjectZone';
    
    var postData = 
    {
        "UserId": getUserId,
        "CustomerId": getCustomerId
    };
    callHttpUrl(apiPath, postData, function (data) 
    {
        var isStatus = data.Status;
        if (isStatus == 200) 
        {
            objectName = [];
            objectid = [];
            $("#ddlobjectoutward").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) 
                {
                    var getcatName = grnContainerSize[i].ObjectName;
                    var getcatId = grnContainerSize[i].ID;
                    objectName.push(getcatName);
                    objectid.push(getcatId);
                    $("#ddlobjectoutward").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
  
                }
            }

          objectName = [];
          objectid = [];
          $("#ddlZoneoutward").html('<option value="0">--Select--</option>');
          objectName.push('--Select List--');
          objectid.push('0');
          var myGridList = data.Result;
          var grnContainerSize = myGridList.Table1;
          if (grnContainerSize.length > 0) {
              for (var i = 0; i < grnContainerSize.length; i++) {
                  var getcatName = grnContainerSize[i].ZoneName;
                  var getcatId = grnContainerSize[i].ID;
                  objectName.push(getcatName);
                  objectid.push(getcatId);
                  $("#ddlZoneoutward").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');

              }
          }
        }
    });
  }

  

function ZoneList() 
{
    debugger;
    //strCurrentPage = "1";
    var apiPath = wmsApiPath + 'RateCard/getZone';
  
    var searchfilter = $("#drop-down-search-zone").val();
    var searchvalue = $("#text-value-search-zone").val();
  
    if (searchfilter == '0') 
    {
        searchfilter = '0';
        searchvalue = '0';
    }
    debugger;
    
    var postData =
    {
        
        "CustomerId":getCustomerId,
        "UserId": getUserId
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) 
        {
            debugger;
            var gridList = data.Result;
           
            $("#gridbindZoneoutward").html();
            var gridTable = "";
  
            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Zone Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Zone Name</div>';        ;  
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtZonecode" value="" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtZoneName" value="" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
            gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
            gridTable = gridTable + ' </div><a href="#" title="Save" class="wms-srv-save" onClick="saveZone();"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep"></label>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
  
            for (var i = 0; i < gridList.Table.length; i++) 
            {
                var getID = gridList.Table[i].ID;
                var getZoneCode = gridList.Table[i].ZoneCode;
                var getZoneName = gridList.Table[i].ZoneName;
                var getActive = gridList.Table[i].Active;
  
                //  GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getZoneCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getZoneName + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }
            $("#gridbindZoneoutward").html(gridTable);
        }
  
    });
  }
  
  function validateZone(){
    var result = "";
    if($("#txtZonecode").val() == ""){
      result = "Please enter zone code..!";
    }
    else if($("#txtZoneName").val() == ""){
      result = "Please enter zone name..!";
    }
    return result;
  }
  
  function saveZone()
  {
    debugger;
    var result = validateZone();
    if(result == "")
    {
      var zonecode = $("#txtZonecode").val();
      var zonename = $("#txtZoneName").val();
  
      var apiPath = wmsApiPath + 'RateCard/addZone';
      
  
      var postData = 
      {
          "CompanyId": getCompanyId,
          "UserId": getUserId,
          "CustomerId": getCustomerId,
          "ID": "0",
          "ZoneCode": zonecode,
          "ZoneName": zonename
      }
  
      callHttpUrl(apiPath, postData, function (data) {
          var getStatusCode = data.Status;
          if (getStatusCode == 200) {
              alert("Record saved successfully..!")
              ZoneList();
              ZoneDDL();
          }
          else{
            alert(getStatusCode.Message);
          }
      });
    }
    else{
      alert(result);
    }
  }
  

  function ZoneDDL() 
  {
    debugger;
    var apiPath = wmsApiPath + 'RateCard/getObjectZone';
    
    var postData = 
    {
        "UserId": getUserId,
        "CustomerId": getCustomerId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            objectName = [];
            objectid = [];
            $("#ddlZoneoutward").html('<option value="0">--Select--</option>');
            objectName.push('--Select List--');
            objectid.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table1;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) 
                {
                    var getcatName = grnContainerSize[i].ZoneName;
                    var getcatId = grnContainerSize[i].ID;
                    objectName.push(getcatName);
                    objectid.push(getcatId);
                    $("#ddlZoneoutward").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
                }
            }
        }
    });
  }

  function SaveActivityobjectoutward() 
  {
        debugger;
        //globalskuid = selectedSkuid;
        var apiPath = wmsApiPath + '3PLBilling/addActivityValueAdd';

        getobjectValue = $("#ddlobjectoutward option:selected").val();

        getactivityName = $('#txtaccnameobject').val();
        getRemark = $('#txtRemarkobject').val();
        getZoneId = $('#ddlZoneoutward option:selected').val();

          
        var postData =
        {
            "ObjectID": getobjectValue,
            "ActivityName": getactivityName,
            "Remark": getRemark,
            "ZoneId": getZoneId,
            "CustomerId": getCustomerId,
            "UserId": getUserId,
            "CompanyId": getCompanyId
          }
        callHttpUrl(apiPath, postData, function (data) 
        {
            debugger;
            var isStatus = data.Status;
            var getresult = data.Result;
            if (isStatus == 200) {
                var returnmsg = getresult.Message;
                if (returnmsg == "success")
                {
                    alert("Saved Successfully.");
                   
                    GetActivityListobjectoutward(CurrentPage,searchfilter,searchvalue);
                }
                else {
                    alert("Failed to Save.");
                }
            }
            else {
                alert("Error Occured.");
            }
        });
    }

 function Savevalueaddserviceoutward(Id,orderId) 
    {
      debugger;
       
          //globalskuid = selectedSkuid;
          var getvalueId = Id;
          var apiPath = wmsApiPath + '3PLBilling/AddValueAdd';
  
          if(getvalueId =='0')
          {
              getUOMValue = $("#ddlunittypeobjectoutward option:selected").val();
              getrate = $('#txtrateoutward').val();
              getBillqty = $('#txtbillqtyoutward').val();
              getRemark = $('#txtremarkoutward').val();
          }
          else
          {
              getUOMValue = $("#txtEditUOMtypeoutward" + valueGlbalID).val();
              getrate = $('#txteditrateoutward').val();
              getBillqty = $('#txteditqtyoutward').val();
              getRemark = $('#txteditremarkoutward').val();
          }
  
          var postData =
  
          {
              "Id": getvalueId,
              "CustomerId": getCustomerId,
              "ActivityId": ActivityIdoutward,
              "ActivityName": ActivityNameoutward,
              "Rate": getrate,
              "UnitId": getUOMValue,
              "CompanyId": getCompanyId,
              "UserId": getUserId,
              "Object": "outward",
              "OrderId": orderId,
              "OrderNo": orderId,
              "Quantity": getBillqty,
              "WarehouseId": getWarehouseId,
              "Remark": getRemark
            }
      
          callHttpUrl(apiPath, postData, function (data) 
          {
              debugger;
              var isStatus = data.Status;
              var getresult = data.Result;
              if (isStatus == 200) {
                  var returnmsg = getresult.Message;
                  if (returnmsg == "success")
                  {
                      // alert("Saved Successfully.");
                      // GetobjectList(orderId);
                      if(getvalueId == 0)
                      {
                         alert('Saved Successfully!!');
                      }
                      else
                      {
                         alert('Updated Successfully!!');
                      }
                      GetobjectListoutward(orderId);
                  }
                  else {
                      alert("Failed to Save.");
                  }
              }
              else {
                  alert("Error Occured.");
              }
          });
      }

    var valueGlbalID = '';
    var objectName = [];
    var objectid = [];

    function bindUOMDropDownEditoutward(getID , getUnitType)
    {
        debugger;
        valueGlbalID = getID;
        var ddlUOMtype = '';
        ddlUOMtype = '<select class="wms-srv-grid-cell-input" id="txtEditUOMtypeoutward'+ getID +'">';
        for(var i=0; i < objectName.length; i++)
        {
            if(objectName[i] == getUnitType){
                ddlUOMtype += '<option value = "'+ objectid[i]+'" selected="selected">'+ objectName[i] +'</option>';
            }else{
                ddlUOMtype += '<option value = "'+ objectid[i]+'">'+ objectName[i] +'</option>';
            }
        }
        ddlUOMtype += '</select>';
        return ddlUOMtype;
    }

    function EditobjectGridoutward(getID,orderId,getActivityType,getRate,getUnitType,getBillQty,getRemark,getStatus)
    {
        debugger;
        var gridRow = '';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getActivityType + '"  class="wms-srv-grid-cell-input" Id="" disabled></div>';
        //gridRow = gridRow + '<div class="wms-srv-grid-cell">'+getActivityType+'</div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getRate + '" class="wms-srv-grid-cell-input" Id="txteditrateoutward"></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell" >';
        gridRow = gridRow +  bindUOMDropDownEditoutward(getID , getUnitType);
        gridRow = gridRow + '</div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getBillQty + '" class="wms-srv-grid-cell-input" Id="txteditqtyoutward"></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getRemark + '" class="wms-srv-grid-cell-input" Id="txteditremarkoutward"></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell" style="text-align:center;">'+getStatus+'</div>';
        // gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getIFSCCode + '" class="wms-srv-grid-cell-input txtifsccode"></div>';
        // gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getSwiftCode + '" class="wms-srv-grid-cell-input txtswiftcode"></div>';
      
      
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
        gridRow = gridRow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"> <i class="fas fa-check-circle" id="" onclick="Savevalueaddserviceoutward('+getID+','+orderId+')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditobjectHideoutward(' + getID + ','+orderId+')"></i></a></div></div>';
        $("#ParameterRowobjectoutward" + getID).html(gridRow);
    }


function gridEditobjectHideoutward(getID,orderId)
{
    debugger;
    $("#ParameterRowobjectoutward" + getID).html('');
    //var getClient = globalClientID; 
    GetobjectListoutward(orderId); 
}
