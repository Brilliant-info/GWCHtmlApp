var filtercol = "ALL";
var filterval = "0";
var CurrentPage = '1';
var getTotalRecords = '100';
//var recordLimit = '10';
//var getTotalRecords = '';

var strCurrentPage = '1';
var CurrentPage = '1';
var RecordLimit = '5';
var searchItemFilter = '';
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getUserId = mBrillWmsSession.getUserId();
var getClientId = mBrillWmsSession.getClientId();
var getCompanyID = mBrillWmsSession.getCompanyId();
var globalUserID = "";
var globalOrderID = "0";
var getGlobalTaskId = "";
var globalItem = "0";
var globalOrderdetailID = "0";
var globalTaskType = "";
var getOrdercnt = "0";
var getassingCnt = "0";
var searchfilter = 'ALL';
var searchvalue = '0';
var globalObj = "Receiving";
var RefObject = '0';



//var searchfilter = 'ALL';


$('#ddlTaskobj').change(function () {
    debugger;
    globalObj = $("#ddlTaskobj").val();
    $('#rdoGroup').prop('checked', true);
    $('#rdoItem').prop('checked', false);
    getTaskList(searchfilter, searchvalue, globalObj, CurrentPage, getTotalRecords);


});

$('#AssignDate').change(function () {
    debugger;
    //    var today = new Date()
    //    var todaydate = today.getDate();
    //    var dd = todaydate;
    //    var mm = today.toLocaleString('default', { month: 'short' });
    //    var yyyy = today.getFullYear();
    //    today = dd + '-' + mm + '-' + yyyy;

    //$('#AssignDate').val(today)
    // $('#AssignDate').datepicker();
    //  globalObj = $("#AssignDate").val();
    //getTaskList(searchfilter,searchvalue,globalObj,CurrentPage,getTotalRecords);

    //  $("#AssignDate").datepicker({ dateFormat: "dd-mmm-yyyy" });

    //   var date = $("#AssignDate").datepicker({ dateFormat: 'dd-MMM-yyyy' }).val();
    //     alert(date);


    $('#AssignDate').datepicker('option', 'dateFormat', 'dd-M-yy');

    //var result = $('#AssignDate').val();

    //alert('result: ' + result);

    // $("#AssignDate").on("change",function(){
    //     var selected = $(this).val();
    //     //alert(selected);
    //     $('#AssignDate').val(selected)
    // });
    // $("#AssignDate").datepicker({ 
    //         dateFormat: "dd-mmm-yyyy", 
    //         onSelect: function(){
    //             var selected = $(this).datepicker("getDate");
    //             //alert(selected);
    //             $('#AssignDate').val(selected)
    //         }
    //     });


});

wmsLoadLayout(function () {

    getTaskAssignmentList(filterval, filtercol);
    //getGroupList(filterval, filtercol,globalObj);
    $('.wms-srv-count-box-holder').click(function () {
        $('.wms-srv-count-box-holder').removeClass('dashboardActiveTab');
        $(this).addClass('dashboardActiveTab');
        getTaskAssignmentList(filtercol, filterval);
    });

    // $("#wms-srv-createtask-popup-close").click(function()
    //     {
    //         $("#wms-srv-createtask-popup").hide();

    //     });
});

function openCreateTask() {

    debugger;
    $("#txtassinguserName").val('');
    $('#wms-srv-createtask-popup').show();
    //$('#wms-srv-createtask-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-createtask-popup .wms-srv-datepicker').datepicker({ minDate: new Date() });
    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    $('#ddltimehr').val(hours);
    $('#ddlassingminute').val(minutes);
    $('#ddltime').val(ampm);

    $("#wms-srv-grid-row-pqr").html('');
    $('#tlbgetSKUList').html('');
    $('#wms-srv-createtask-popup-close').off();
    $('#rdoGroup').prop('checked', true);
    $('#rdoItem').prop('checked', false);
    // $('.wms-srv-popup-close').click(function ()
    //  {
    //     $('#wms-srv-createtask-popup .wms-srv-datepicker').datepicker('destroy');
    //     $('#wms-srv-createtask-popup').hide();
    // });

    $("#wms-srv-createtask-popup-close").click(function () {
        debugger;
        $("#wms-srv-grid-row-pqr").html('');
        $('#tlbgetSKUList').html('');
        finalSubmit(globalObj, RefObject);
    })

    var today = new Date()
    // $(function () {
    //     $("#date").datepicker({ 
    //         minDate: today 
    //     });
    // });
    var todaydate = today.getDate();
    var dd = todaydate;
    //var dd = String(todaydate.getDate()).padStart(2, '0');
    var mm = today.toLocaleString('default', { month: 'short' });
    //var mm = String(todaydate.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    $('#AssignDate').val(today);
    //$('#AssignDate').attr('min',today);


    // getTaskList('ALL','0',globalObj);

    getTaskList(searchfilter, searchvalue, globalObj, CurrentPage, getTotalRecords);

}

function checkTaskAssignment() {
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/checkTaskAssignment"
    var apiPath = wmsApiPath + 'TaskAssignment/checkTaskAssignment';
    var postData =
    {
        "CustomerId": getCustomerId,
        "UserId": getUserId,
    }
    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {

            var getResult = data.Result;
            var Result = getResult.Message;
            if (Result == 'YES') {
                openCreateTask()
            } else if (Result == 'NO') {
                alert('Task Assignment not applicable for this customer...!');
            }
        }
        else {
            alert('Unable to connect Server!!');
        }

    });
}

function openSelectBatch() {
    debugger;
    $("#wms-orderlist-grid").css("display", "none");
    $("#wms-skulist-grid").css("display", "block");
    $('#wms-srv-selectbatch-popup').show();
    $('#wms-srv-selectbatch-popup-close').off();
    $('#wms-srv-selectbatch-popup-close').click(function () {
        debugger;
        $('#ddlOrderSearchCol').val('');
        $('#txtOrdervalue').val('');
        $('#wms-srv-selectbatch-popup').hide();
        $('#tlbgetSKUList').html('');
        $("#wms-srv-grid-row-pqr").html('');
        filtercol = 'ALL';
        filterval = '';

    });
    getGroupList(filterval, filtercol, globalObj);

}


function openOrderList() {
    $("#wms-orderlist-grid").css("display", "block");
    $("#wms-skulist-grid").css("display", "none");

}


function SelectGroup(getGroupID) {
    $('#wms-srv-selectbatch-popup').hide();
    $('#wms-srv-createtask-popup').show();
    getSKUList(getGroupID, searchfilter, searchvalue, globalObj);

}
function clearTaskListSearch() {
    debugger;
    $('#ddlTaskAssignmentsearch').val('');
    $('#txtTaskAssignmentvalue').val('');
    filterval = 'ALL';
    getTaskAssignmentList(filtercol, filterval)
}

function getTaskAssignmentList(filtercol, filterval) {
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/GetAssingmentList"
    var apiPath = wmsApiPath + 'TaskAssignment/GetAssingmentList';

    var getActiveTab = $('.dashboardActiveTab').attr('data-id');
    if (getActiveTab == "") {
        getActiveTab = 'OpenTask';
    }

    if (filtercol == '') {
        filtercol = '';
        filterval = '';
    }
    if (filterval == 'ALL') {
        filtercol = "ALL";
        filterval = "0";
    }

    var postData =
    {
        "CurrentPage": CurrentPage,
        "recordLimit": getTotalRecords,
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "Object": globalObj,
        "Activetab": getActiveTab,
        "searchFilter": filtercol,
        "searchValue": filterval
    }

    //BatchListGrid
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblTaskAssnmentList').html('');
            var myGridList = data.Result.Table[0];
            //  var getTotalRecords = myGridList.TotalRecords;
            // GET DASHBOARD COUNTS
            var getOpenTask = myGridList.Opentask;
            var getCompleteTask = myGridList.completedtask;
            var getOverdueTask = myGridList.overdue;
            //var getCancelOrder = myGridList.OutboundListResult[0].Dashboard[0].CancelOrder;

            $('#dashOpenTask').html(getOpenTask);
            $('#dashCompleteTask').html(getCompleteTask);
            $('#dashOverdueTask').html(getOverdueTask);
            // GET DASHBOARD COUNTS

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Task Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Number</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Order Ref. No/Group Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Object</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Task Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Creation Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Due Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">User</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:260px; text-align:center;">Status</div>';
            //gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';// comment by suraj khopade
            // if(getActiveTab =='undefined'){
            // 	gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            // }else
            if (getActiveTab == 'CompletedTask') {

                gridTable = gridTable + '</div>';
            } else {
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
                gridTable = gridTable + '</div>';
            }


            //Bind Header
            //var list=data.Result.Table;
            var getTotalRecords = '';
            var getAssingmentList = data.Result.Table;
            for (var i = 0; i < getAssingmentList.length; i++) {
                var getId = getAssingmentList[i].ID;
                var getTaskCode = getAssingmentList[i].TaskCode;
                var getOId = getAssingmentList[i].OID;
                var getObject = getAssingmentList[i].Object;
                var getTaskType = getAssingmentList[i].AssingType;
                var getCreationDate = getAssingmentList[i].Assingmentdate;
                var getDueDate = getAssingmentList[i].DueDate;
                var getUser = getAssingmentList[i].AssingTo;
                var getTaskStatus = getAssingmentList[i].Status;
                getTotalRecords = getAssingmentList[i].TotalRecords;
                var getOrdernumber = getAssingmentList[i].Ordernumber;

                //var getStatusID = getGridData[i].StatusID;
                //var getOrderIds = getGridData[i].OrderIds.toString();
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getTaskCode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getOId + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getOrdernumber + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getObject + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getTaskType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getCreationDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getDueDate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getUser + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindStatusControl(getId, getTaskStatus) + "</div>";

                if (getActiveTab != 'CompletedTask') {

                    gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindTaskAssignmentActionControl(getTaskCode, getTaskStatus, getOId, getObject) + "</div>";
                }

                gridTable = gridTable + '</div>';
                // GRID ROW
                $('#tblTaskAssnmentList').html(gridTable);
            }

            setupGridPagingList('tlbTaskAssignGridPager', CurrentPage, getTotalRecords, getTaskAssignmentList, 100);

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function SearchTaskAssignment() {
    debugger;
    filtercol = $('#ddlTaskAssignmentsearch').val();
    filterval = $('#txtTaskAssignmentvalue').val();
    //alert(filterval);
    if (filtercol != 'ALL') {
        if (filterval == '') {
            alert('Please Enter value for filter');
        }
        else {
            getTaskAssignmentList(filtercol, filterval);
        }
        if (filtercol == '' && filterval == '') {
            getTaskAssignmentList(filtercol, filterval);
        }
    }
    else { getTaskAssignmentList(filtercol, filterval); }
}

function SearchGroupTask() {
    debugger;
    filtercol = $('#ddlGroupFilter').val();
    filterval = $('#txtGroupValue').val();
    //alert(filterval);
    if (filtercol != 'ALL') {
        if (filterval == '') {
            alert('Please Enter value for filter');
        }
        else {
            openCreateTask(filtercol, filterval);
        }
        if (filtercol == '' && filterval == '') {
            openCreateTask(filtercol, filterval);
        }
    }
    else { openCreateTask(filtercol, filterval); }
}

function SearchItemTask() {
    debugger;
    filtercol = $('#ddlItemFilter').val();
    filterval = $('#txtItemValue').val();
    var getGroupID = $("#hdnskuorderID").val();
    //alert(filterval);
    if (filterval == '') {
        alert('Please Enter value for filter');
    }
    else {
        getSKUList(getGroupID, filtercol, filterval, globalObj);
    }
    if (filtercol == '' && filterval == '') {
        getSKUList(getGroupID, filtercol, filterval, globalObj);
    }
}

function bindStatusControl(getId, strStatus) {
    debugger;
    var htmlControl = '';
    htmlControl = htmlControl + '<div class="wms-srv-status-holder" title="Status">';
    htmlControl = htmlControl + '<div class="wms-srv-status-display">';
    htmlControl = htmlControl + '<div class="wms-srv-status-label">' + strStatus + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-progress">';
    // if(strStatus == 'Open Task'){
    htmlControl = htmlControl + '<div class="wms-srv-dot wms-srv-' + getStatusColor(strStatus, strStatus) + '" data-orderid="' + getId + '" data-status="' + strStatus + '" title = "Open Task"></div>';
    // else if(strStatus == 'Completed Task'){
    // htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Complete Task', strStatus) + '" data-orderid="' + getId + '" data-status="' + strStatus + '" title = "Complete Task"></div>';
    // htmlControl = htmlControl + ' <div class="wms-srv-dot wmsStatusQualityCheck wms-srv-' + getStatusColor('Overdue Task', strStatus) + '" data-orderid="' + getId + '" data-status="' + strStatus + '" title = "Overdue Task"></div>';
    //htmlControl = htmlControl + ' <div class="wms-srv-dot wms-srv-' + getStatusColor('Put Away', strStatus) + '" data-orderid="' + ID + '" data-status="' + strStatus + '" title = "Put Away" onclick="viewPutAway(\'' + orderId + '\');return false;"></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '<div class="wms-srv-status-action"><a href="#" class="wms-srv-btn-status-action"><i class="fas fa-play-circle"></i></a></div>';
    htmlControl = htmlControl + '</div>';
    htmlControl = htmlControl + '</div>';

    return htmlControl;
}

function getStatusColor(dataFor, currentStatus) {
    debugger;
    var myColor = 'gray';

    if (dataFor == 'Open Task' && currentStatus == 'Open Task') {
        if (currentStatus == 'Open Task' || currentStatus == 'Completed Task' || currentStatus == 'Partially Completed' || currentStatus == 'Overdue Task') {
            myColor = 'red';
        }
    }
    else if (dataFor == 'Complete Task' || dataFor == 'Completed Task' && currentStatus == 'Completed Task') {
        if (currentStatus == 'Completed Task' || currentStatus == 'Overdue Task') {
            myColor = 'green';
        }
        else if (currentStatus == 'Partially Completed') {
            myColor = 'partial';
        }
        else if (currentStatus == 'Open Task') {
            myColor = 'partial';
        }

    }
    else if (dataFor == 'Overdue Task' && currentStatus == 'Overdue Task') {
        if (currentStatus == 'Overdue Task') {
            myColor = 'orange';
        }
        else if (currentStatus == 'Completed Task' || currentStatus == 'Partially Completed') {
            myColor = 'red';
        }

    }
    return myColor;
}

function bindTaskAssignmentActionControl(TaskCode, getTaskStatus, getOId, getObject) {
    var htmlControl = '';

    htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
    // htmlControl = htmlControl + '<a href="#" title="Task Assignment" class="wms-srv-icononly" onClick="openassingUser(\''+TaskCode+'\',\'' + getTaskStatus + '\');"><i class="fas fa-retweet"></i></a>'; comment by suraj khopade
    //  htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    //  htmlControl = htmlControl + '<a href="#" title="Task Assignment" class="wms-srv-icononly" onClick=""></a>';
    if (getTaskStatus != 'Completed Task') {

        //htmlControl = htmlControl + '<a href="#" title="Task Assignment" class="wms-srv-icononly" onClick="openassingUser(\''+TaskCode+'\');"><i class="fas fa-retweet"></i></a>';
        //htmlControl = htmlControl + '<a href="#" title="Cancel"  class="wms-srv-icononly" onClick="CancelassingUser(\''+TaskCode+'\');"><i class="fas fa-times-circle"></i></a>';
        htmlControl = htmlControl + '<a href="#" title="View Order" class="wms-srv-icononly" onClick="ViewOrder(\'' + TaskCode + '\',\'' + getTaskStatus + '\',\'' + getOId + '\',\'' + getObject + '\');"><i class="fas fa-solid fa-eye"></i></a>';
        htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
        htmlControl = htmlControl + '<a href="#" title="Task Assignment" class="wms-srv-icononly" onClick="openassingUser(\'' + TaskCode + '\',\'' + getTaskStatus + '\');"><i class="fas fa-retweet"></i></a>';
        htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
        htmlControl = htmlControl + '<a href="#" title="Cancel"  class="wms-srv-icononly" onclick ="CancelassingUser(\'' + TaskCode + '\',\'' + getOId + '\');"><i class="fas fa-times-circle"></i></a>';
    }
    // htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
    // htmlControl = htmlControl + '<a href="#" title="Cancel" data-prefix="" data-orderid="" class="wms-srv-icononly"><i class="fas fa-times-circle"></i></a>';
    htmlControl = htmlControl + ' </div>';

    return htmlControl;
}

function ViewOrder(TaskCode, getTaskStatus, getOId, getObject) {
    // $('#wms-srv-order-task-assginment-popup').show();
    // $('#wms-srv-order-task-assginment-popup-close').off();
    // $('#wms-srv-order-task-assginment-popup-close').click(function () 
    // {
    //   //  $('#wms-srv-order-popup .wms-srv-datepicker').datepicker('destroy');
    //     $('#wms-srv-order-task-assginment-popup').hide();
    //     clearSuggestionList();
    // });
    viewPOHead(getOId, getObject);
}
function viewPOHead(strCurrentOrder, Object) {
    debugger;


    if (strCurrentOrder != '0') {
        var apiPath = wmsApiPath + 'TaskAssignment/GetTaskAssignmentPOHead';
        //   var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/GetTaskAssignmentPOHead";
        var getCustomerId = $("#ddlcustomer").val();
        var getWarehouseID = $("#ddlwarehouse").val();
        var getCompanyID = $('#hdnCompanyID').val();
        //var getUserId = $("#hdnUserID").val();
        var strOrderId = strCurrentOrder;

        var postData =
        {
            CustomerId: getCustomerId,
            WarehouseId: getWarehouseId,
            UserId: getUserId,
            OrderId: strOrderId,
            Object: Object
            //OrderType: getPageObject
        };

        // BIND DATA GRID
        var gridTable = '';

        // GRID HEADER
        gridTable = gridTable + '<div class="wms-srv-grid-header" style="text-align:center">';
        //gridTable = gridTable + '<div class="wms-srv-grid-cell" ><input type="checkbox" value="ID"></div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">OrderID</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Product Code</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Product Name</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">UOM</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable1</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable2</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable3</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable4</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable5</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable6</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable7</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable8</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable9</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable10</div>';
        gridTable = gridTable + '</div>';
        // GRID HEADER
        // GRID ADD NEW
        // gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow">';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">0</div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><div class="wms-srv-suggestion-holder"><input type="text" id="addNew_ItemCode" data-prefix="SESKU" value=""   class="txtItemCode wms-srv-grid-cell-input wms-srv-suggestion" ><a href="#" data-prefix="SE"></a></div></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_Name" value="" class="wms-srv-grid-cell-input" disabled></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_Description" value="" class="wms-srv-grid-cell-input" disabled></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_RequestedQty" onchange="updateOrderQty();" onkeypress="return isNumber(event)" value="" class="wms-srv-grid-cell-input"></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell"style="text-align:center" ><select class="wms-srv-grid-cell-input" id="addNew_UOM" onchange="updateOrderQty();"></select></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_OrderQty" value="" class="wms-srv-grid-cell-input" disabled=""></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="addNew_Lottable"></div></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number"   id="addNew_CaseNetWeight" value="" class="wms-srv-grid-cell-input"></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number"  id="addNew_CaseGrossWeight" value="" class="wms-srv-grid-cell-input"></div>';
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number"  onkeypress="return isNumber(event)" id="addNew_TotalCarton" value="" class="wms-srv-grid-cell-input"></div>';

        // if(Number(strCurrentOrder) > 0){//obj != 'PurchaseOrder' && 
        //     gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"></div>'; 
        // }
        // //else if((orderstatus == 34) || (orderstatus == 0)){
        //    // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="savePODetails();"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
        // //}
        // else{
        //    // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"></div>';  
        //     gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="savePODetails();"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';

        // }

        // GRID ADD NEW

        $('#tlbTaskAssignmentPoOrderDetailsGrid').html(gridTable);

        callHttpUrl(apiPath, postData, function (data) {
            // After success
            var getCode = data.StatusCode;
            var getStatus = data.Status.toLocaleLowerCase();
            var docRow = '';
            if (getCode == "Success") {
                var getResult = data.Result;
                var getPoHead = getResult.Table;
                for (var i = 0; i < getPoHead.length; i++) {
                    var getOrderID = getPoHead[i].Orderid;
                    var getProdCode = getPoHead[i].ProductCode;
                    var getName = getPoHead[i].Name;
                    // var getInboundReceiptDate = formatCustomDate(inReceiptDate);
                    //var getUOMID = getPoHead[0].UOMID;
                    //var getExpDeliveryDate = formatCustomDate(expDeliveryDate);
                    var getUOM = getPoHead[i].UOM;
                    // var getLottable1 = getPoHead[i].Lottable1;
                    // var getLottable2 = getPoHead[i].Lottable2;
                    // var getLottable3 = getPoHead[i].Lottable3;
                    // var getLottable4 = getPoHead[0].Lottable4;
                    // var getLottable5 = getPoHead[0].Lottable5;
                    // var getLottable6 = getPoHead[0].Lottable6;
                    // var getLottable7 = getPoHead[0].Lottable7;
                    // var getLottable8 = getPoHead[0].Lottable8;
                    // var getLottable9 = getPoHead[0].Lottable9;
                    // var getLottable10 = getPoHead[0].Lottable10;


                    // GRID ROW
                    gridTable = '';

                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderID + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getProdCode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getName + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable1 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable2 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable3 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable4 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable5 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable6 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable7 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable8 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable9 + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable10 + '</div>';
                    //  gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGrossWeight + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getTotalCarton + '</div>';
                    //  if((orderstatus == 34) || (orderstatus == 0)){
                    //      gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action removediv" id="removebtndiv" style="display:none;"><button class="wms-srv-input wms-srv-button" type="button" onclick="removePOSkuItem(' + getSkuId + ',\'POremove\',\'' + getId + '\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button></div></div>';
                    //  }
                    //  else{
                    //      gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                    //  }
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW

                    $('#tlbTaskAssignmentPoOrderDetailsGrid').append(gridTable);
                }
                viewPoOrder();
                // var getInboundReceiptNo = getPoHead[0].InboundReceiptNo;
                // var inReceiptDate = getPoHead[0].InboundReceiptDate;
                // var getInboundReceiptDate = formatCustomDate(inReceiptDate);
                // var expDeliveryDate = getPoHead[0].ExpDeliveryDate;
                // var getExpDeliveryDate = formatCustomDate(expDeliveryDate);
                // var getCustomerRefNo = getPoHead[0].CustomerRefNo;
                // var getRemark = getPoHead[0].Remark;
                // var getCreatedBy = getPoHead[0].CreatedBy;
                // var getStatus = getPoHead[0].Status;
                // var getVendor = getPoHead[0].Vendor;
                // var getObject = getPoHead[0].Object;
                // if(getPoHead[0].CreatedBy== "")
                // {
                //     getCreatedBy = getUserName;
                // }



                // $('#spnPoOid').html(getInboundReceiptNo);
                // $('#hdnPoOid').val(getInboundReceiptNo);
                // $('#txtPoReceiptDate').val(getInboundReceiptDate);
                // $('#txtPoDeliveryDate').val(getExpDeliveryDate);
                // $('#txtPoCustomerRefNo').val(getCustomerRefNo);
                // $('#txtPoRemark').val(getRemark);
                // $('#txtPoUserName').html(getCreatedBy);
                // $('#txtVendor').val(getVendor);


                // viewOrderPoDetails(strCurrentOrder,getStatus);
            }
            else {
                alert('Failed to open order!!');
            }
            // After success
        });
    }
    else {
        $('#spnPoOid').html('To be Generated');
        $('#hdnPoOid').val('0');
        var getCurrentDate = isBlankDate('');
        $('#txtPoReceiptDate').val(getCurrentDate);
        $('#txtPoDeliveryDate').val(getCurrentDate);
        $('#txtPoCustomerRefNo').val('');
        $('#txtVendor').val('');
        $('#txtPoRemark').val('');
        $('#txtPoUserName').html(getUserName);
        $('#removebtndiv').show();
        $('#divbtnsavepo').show();

        //viewOrderPoDetails(strCurrentOrder,0);
    }
}


function viewOrderPoDetails(strCurrentOrder, orderstatus) {
    debugger;
    var obj = $('#ddlPageObject').val();
    var apiPath = wmsApiPath + 'TaskAssignment/GetTaskAssignmentPODetail';
    // var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/GetTaskAssignmentPODetail";
    var getWarehouseID = $("#ddlwarehouse").val();
    var getCustomerId = $("#ddlcustomer").val();
    var getCompanyID = $('#hdnCompanyID').val();
    var getUserId = $("#hdnUserID").val();


    var postData =
    {
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "UserId": getUserId,
        "OrderId": strCurrentOrder
    };

    // CustomerId: getCustomerId,
    // WarehouseId: getWarehouseId,
    // UserId: getUserId,
    // OrderId: strOrderId

    // BIND DATA GRID
    var gridTable = '';

    // GRID HEADER
    gridTable = gridTable + '<div class="wms-srv-grid-header" style="text-align:center">';
    //gridTable = gridTable + '<div class="wms-srv-grid-cell" ><input type="checkbox" value="ID"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Id</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">SKU Code <span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">SKU Name</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Description</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Requested Qty <span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">UOM<span class="requiredStar">*</span></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Qty</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Lottable</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Case Net Weight</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Case Gross Weight</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Total Carton</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">Action</div>';
    gridTable = gridTable + '</div>';
    // GRID HEADER
    // GRID ADD NEW
    gridTable = gridTable + '<div class="wms-srv-grid-row wmsFrmAddRow">';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center">0</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><div class="wms-srv-suggestion-holder"><input type="text" id="addNew_ItemCode" data-prefix="SESKU" value=""   class="txtItemCode wms-srv-grid-cell-input wms-srv-suggestion" onkeyup="getSuggestionList(this,\'' + poobj + '\');" ><a href="#" data-prefix="SE"><i class="fas fa-search" onclick="openPurchaseProductListPopup()"></i></a></div></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_Name" value="" class="wms-srv-grid-cell-input" disabled></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_Description" value="" class="wms-srv-grid-cell-input" disabled></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_RequestedQty" onchange="updateOrderQty();" onkeypress="return isNumber(event)" value="" class="wms-srv-grid-cell-input"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"style="text-align:center" ><select class="wms-srv-grid-cell-input" id="addNew_UOM" onchange="updateOrderQty();"></select></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="text" id="addNew_OrderQty" value="" class="wms-srv-grid-cell-input" disabled=""></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="width:275px;"><div class="lottableControlHolder" id="addNew_Lottable"></div></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number"   id="addNew_CaseNetWeight" value="" class="wms-srv-grid-cell-input"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number"  id="addNew_CaseGrossWeight" value="" class="wms-srv-grid-cell-input"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><input type="Number"  onkeypress="return isNumber(event)" id="addNew_TotalCarton" value="" class="wms-srv-grid-cell-input"></div>';

    if (obj != 'PurchaseOrder' && Number(strCurrentOrder) > 0) {
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"></div>';
    }
    //else if((orderstatus == 34) || (orderstatus == 0)){
    // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="savePODetails();"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
    //}
    else {
        // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"></div>';  
        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="savePODetails();"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';

    }

    // GRID ADD NEW

    $('#tlbTaskAssignmentPoOrderDetailsGrid').html(gridTable);
    if (strCurrentOrder != '0') {
        callHttpUrl(apiPath, postData, function (data) {
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {

                var getResult = data.Result;
                var getGridData = getResult.PurchaseOrderDetails;
                for (var i = 0; i < getGridData.length; i++) {
                    var getId = getGridData[i].Id;
                    var getSkuId = getGridData[i].SkuId;
                    var getItemCode = getGridData[i].ItemCode;
                    var getItemName = getGridData[i].ItemName;
                    var getDescription = getGridData[i].ItemDescription;
                    var getRequestedQty = getGridData[i].RequestedQty;
                    var getUOMList = getGridData[i].UomList;
                    var getUOM = getGridData[i].UOM;
                    var getUOMId = getGridData[i].UOMId;
                    var getOrderQty = getGridData[i].OrderQty;
                    var getLottable = getGridData[i].Lot1;
                    var getCaseNetWeight = getGridData[i].CaseNetWeight;
                    var getGrossWeight = getGridData[i].CaseGrossWeight;
                    var getTotalCarton = getGridData[i].TotalCarton;
                    var isvisible = getGridData[i].isfinal;

                    // GRID ROW
                    gridTable = '';

                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getId + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemCode + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getItemName + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getDescription + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getRequestedQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getUOM + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderQty + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getLottable + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getCaseNetWeight + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGrossWeight + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getTotalCarton + '</div>';
                    if ((orderstatus == 34) || (orderstatus == 0)) {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action removediv" id="removebtndiv" style="display:none;"><button class="wms-srv-input wms-srv-button" type="button" onclick="removePOSkuItem(' + getSkuId + ',\'POremove\',\'' + getId + '\');" title="Cancel" data-prefix="CN"><i class="fas fa-times-circle"></i><span>Cancel</span></button></div></div>';
                    }
                    else {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
                    gridTable = gridTable + '</div>';
                    // GRID ROW

                    $('#tlbTaskAssignmentPoOrderDetailsGrid').append(gridTable);

                    if (isvisible == '0') {
                        $(".removediv").show();

                    }
                    else {
                        $(".removediv").hide();
                        $("#divbtnsavepo").hide();
                    }
                }
                viewPoOrder();
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    } else {
        viewPoOrder();
    }
}


function viewPoOrder() {
    debugger;
    $('#tlbTaskAssignmentPoOrderDetailsGrid').show();//    tlbPoOrderDetailsGrid
    // $('#tlbPoOrderDetailsGridNew').hide();
    $('#wms-srv-order-task-assginment-popup').show();
    //$('#wms-srv-order-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#wms-srv-order-task-assginment-popup-close').off();
    $('#wms-srv-order-task-assginment-popup-close').click(function () {
        // $('#wms-srv-order-popup .wms-srv-datepicker').datepicker('destroy');
        $('wms-srv-order-task-assginment-popup').hide();
        // clearSuggestionList();
    });


}


function POPupclosepopup() {
    $('#wms-srv-order-task-assginment-popup-close').off();
    $('#wms-srv-order-task-assginment-popup-close').click(function () {
        $('#wms-srv-order-task-assginment-popup').hide();
    });
}

function openassingUser(TaskCode, getTaskStatus) {
    debugger;
    if (getTaskStatus != 'Completed Task') {
        //var result = confirm("Do You Want to Reassgin this order to anthor User...!");
        //if (result == true) {
        //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/getAssingmentUserlist";
        var apiPath = wmsApiPath + 'TaskAssignment/getAssingmentUserlist';
        //var getCompanyID = $('#hdnCompanyID').val();
        globalObj = $("#ddlTaskobj").val();

        var postData =
        {
            "companyID": getCustomerId,
            "Customer": getCustomerId,
            "Warehouse": getWarehouseId,
            "TaskCode": TaskCode,
            "Obj": globalObj
        };

        var gridTable = '';

        // GRID HEADER' 


        gridTable = gridTable + '<div class="wms-srv-grid-header">';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Sr. No</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">User Name</div>';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
        gridTable = gridTable + '</div>';

        $('#listassingUser').html(gridTable);


        callHttpUrl(apiPath, postData, function (data) {
            //alert(data);
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                // var getResult = data.GRNOrderDetails;
                // var myGridList = JSON.parse(getResult);
                var getResult = data.Result;

                var myGridList = getResult.Table;

                // var getGridData = myGridList.InboundResult[0].InboundList;
                var getGridData = myGridList;
                for (var i = 0; i < getGridData.length; i++) {
                    var sequence = getGridData[i].srno;
                    var getId = getGridData[i].ID;
                    var userName = getGridData[i].UserName;
                    globalUserID = getId;


                    // GRID ROW
                    gridTable = '';

                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + sequence + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + userName + '</div>';
                    // gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="selectUser(' + getId + ',\'' + userName + '\',\'' + TaskCode + '\');"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " title="Save" data-prefix="SV" type="button" onclick="selectUser(' + getId + ',\'' + userName + '\',\'' + TaskCode + '\',\'' + getTaskStatus + '\');"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';
                    //getTaskStatus
                    gridTable = gridTable + '</div>';

                    $('#listassingUser').append(gridTable);
                }

            }
            else {
                alert('Unable to connect Server!!');
            }
        });

        $('#wms-srv-user-popup').show();
        $('#wms-srv-user-popup-close').off();
        $('#wms-srv-user-popup-close').click(function () {
            $('#wms-srv-user-popup').hide();
        });
        //}
    } else {
        alert('Completed Order can not reassign to another user...!');
    }
}

function CancelassingUser(TaskCode, getOId) {
    //alert('');,getOId
    debugger;
    var result = confirm("Do you want to Deassign this Order...!");
    if (result == true) {

        //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/RemoveAssignmentTask";
        var apiPath = wmsApiPath + 'TaskAssignment/RemoveAssignmentTask';
        //var getCompanyID = $('#hdnCompanyID').val();

        var postData =
        {
            "OrderID": getOId,
            "TaskCode": TaskCode,
            "UserId": getUserId
        };

        /// $('#listassingUser').html(gridTable);

        callHttpUrl(apiPath, postData, function (data) {
            //alert(data);
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {

                var getResult = data.Result;
                var Result = getResult.Message;
                if (Result == 'Success') {
                    alert('Order Deassign Successfully!!');
                    getTaskAssignmentList(filtercol, filterval);
                } else {
                    alert('Order not Deassign Successfully!!');
                    getTaskAssignmentList(filtercol, filterval);
                }
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
}

function selectUser(userID, username, TaskCode, getTaskStatus) {
    debugger;
    if (username != "") {
        ReassingTheTask(userID, TaskCode, getTaskStatus);

    }
    $("#hdnassinguserID").val(userID);
    $("#txtassinguserName").val(username);
    $('#wms-srv-user-popup').hide();

}

function getTaskList(getSearchfilter, getSearchValue, globalObj) {
    debugger;

    var apiPath = wmsApiPath + 'TaskAssignment/TaskList';
    //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/TaskList";

    getSearchfilter = $("#ddlGroupFilter").val();
    getSearchValue = $("#txtGroupValue").val();
    $("#gridItemSearch").hide();
    if (getSearchfilter == "") {
        getSearchfilter = "";
        getSearchValue = "";
    }
    if (getSearchValue == "") {
        getSearchValue = "N/A";
    }
    globalObj = $("#ddlTaskobj").val();
    var objglobal = globalObj;
    var postData =
    {
        "obj": objglobal,
        "type": "Group",
        "orderID": 0,
        "customerID": getCustomerId,
        "warehouseID": getWarehouseId,
        "userID": getUserId,
        "searchFilter": getSearchfilter,
        "searchValue": getSearchValue,
        "currentpg": CurrentPage,
        "recordlmt": getTotalRecords
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;

        if (getStatusCode == 'Success') {

            $('#tlbgetTaskList').html('');


            $("#wms-srv-grid-row-pqr").html('');
            // $('#tlbgetSKUList').html('');

            var getResult = data.Result;
            var mybr = getResult.Table;
            var getbr = mybr[0].BusinessRule;

            var myGridList = getResult.Table1;
            var getGridData = myGridList;

            var gridTable = '';

            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(this);" class="messageCheckbox"></div>';

            if (objglobal == 'Receiving' || objglobal == 'Picking' || objglobal == 'Dispatch' || objglobal == 'Transfer' || objglobal == 'CycleCount' || objglobal == 'Replenishment') {
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order No</div>';
            }
            else if (objglobal == 'InwardQC') {
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order No</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN No</div>';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Reference No</div>';
            }
            else if (objglobal == 'PutIn') {
                if (getbr == 'YES') {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">QC No</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN No</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">Order No</div>';
                }
                else {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">Order No</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN No</div>';

                }
            }
            if (objglobal == 'OutwardQC') {
                gridTable = gridTable + '<div class="wms-srv-grid-cell">PICK No</div>';
            }
            if (objglobal == 'Packing') {
                gridTable = gridTable + '<div class="wms-srv-grid-cell">PICK No</div>';
            }

            if (objglobal == 'OutwardQC' || objglobal == 'Receiving' || objglobal == 'PutIn') {
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Reference No</div>';
                if (objglobal == 'OutwardQC') {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">Group Name</div>';
                }
            }
            else {
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Reference No</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">Group Name</div>';
            }

            gridTable = gridTable + '<div class="wms-srv-grid-cell">Title</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Assigned User</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Status</div>';
            gridTable = gridTable + '</div>';

            $('#tlbgetTaskList').html(gridTable);

            for (var i = 0; i < getGridData.length; i++) {

                // var getGroupID = getGridData[i].OrderID;
                if (objglobal == 'PutIn') {
                    if (getbr == 'YES') {
                        var getGroupID = getGridData[i].OrderID;
                        var getgrnID = getGridData[i].grnID;
                        var getPOID = getGridData[i].POID;
                    } else {
                        var getGroupID = getGridData[i].OrderID;
                        var getgrnID = getGridData[i].grnID;
                    }
                } else if (objglobal == 'InwardQC') {
                    var getGroupID = getGridData[i].OrderID;
                    var getgrnID = getGridData[i].grnID;
                } else {
                    var getGroupID = getGridData[i].OrderID;
                }

                var getOrderNumber = getGridData[i].OrderNumber;
                var getTitel = getGridData[i].Title;
                var getuser = getGridData[i].UserName;
                var getstatus = getGridData[i].Status;
                var getTotalRecords = getGridData[i].TotalRecords;
                var getPurchaseOrderNumber = getGridData[i].PurchaseOrderNumber;
                var getOrderRefno = getGridData[i].OrderRefNo;

                // GRID ROW

                gridTable = gridTable + '<div class="wms-srv-grid-row">';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(this);" data-id="' + getGroupID + '" class="messageCheckbox"></div>';
                //   gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getGroupID + '" ></div>'; commented by suraj khopade
                if (objglobal == 'PutIn') {
                    if (getbr == 'YES') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getGroupID + '" data-Orderref="' + getOrderNumber + '" ></div>';
                    } else {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getgrnID + '" data-Orderref="' + getOrderNumber + '" ></div>';
                    }
                } else if (objglobal == 'InwardQC') {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getgrnID + '" data-Orderref="' + getOrderNumber + '" ></div>';
                } else {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" onclick="selectAllTask(This);" class="messageCheckbox" data-id="' + getGroupID + '" data-Orderref="' + getOrderRefno + '" ></div>';
                }
                //gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupID + '</div>';
                if (objglobal == 'PutIn') {
                    if (getbr == 'YES') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupID + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getgrnID + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPOID + '</div>';
                    } else {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupID + '</div>';
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getgrnID + '</div>';
                    }
                }
                else if (objglobal == 'InwardQC') {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupID + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getgrnID + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getPurchaseOrderNumber + '</div>';
                }
                else {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupID + '</div>';
                    if (objglobal == 'Picking' || objglobal == 'Packing' || objglobal == 'Dispatch') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderRefno + '</div>';

                    }
                }
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderNumber + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getTitel + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getuser + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getstatus + '</div>';
                gridTable = gridTable + '</div>';

            }
            openOrderList();
            $('#tlbgetTaskList').html(gridTable);
            getGlobalTaskId = getGroupID;
            setupGridPagingList('tblCreateTaskPoupPg', CurrentPage, getTotalRecords, getTaskList, 100);
        }
        else {
            alert('Unable to connect Server!!');
        }
    });

}

// function bindTaskListActionControl() {
//     var htmlControl = '';
//     htmlControl = htmlControl + '<div class="wms-srv-grid-action">';
//     htmlControl = htmlControl + '<a href="#" title="Task Assignment" class="wms-srv-icononly" onClick=""><i class="fas fa-retweet"></i></a>';

//     htmlControl = htmlControl + '<div class="wms-srv-action-sep">|</div>';
//     htmlControl = htmlControl + '<a href="#" title="Cancel" data-prefix=""  class="wms-srv-icononly"><i class="fas fa-times-circle"></i></a>';
//     htmlControl = htmlControl + ' </div>';

//     return htmlControl;
// }

function getGroupList(filterval, filtercol, globalObj) {
    debugger;
    $('#ItemHeadingText').html('Group List For ' + globalObj);
    var apiPath = wmsApiPath + 'TaskAssignment/getAssingGrouplist';
    //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/getAssingGrouplist";
    //var getCompanyID = $('#hdnCompanyID').val();
    globalObj = $("#ddlTaskobj").val();
    var objglobal = globalObj;
    if (objglobal == 'Dispatch') {
        alert('In Dispach Assignment Type ITEM is not allow!!');
        $('#wms-srv-selectbatch-popup').hide();
        $('#wms-srv-selectbatch-popup-close').hide();
    }
    else {
        $("#gridGroupSearch").show();
        $("#gridItemSearch").hide();
        if (filtercol == '') {
            filtercol = '';
            filterval = '';
        }
        if (filtercol == 'ALL') {
            filtercol = "ALL";
            filterval = "0";
        }

        var postData =
        {
            "obj": objglobal,
            "companyID": getCompanyID,
            "customerID": getCustomerId,
            "userID": getUserId,
            "warehouseID": getWarehouseId,
            "filtervalue": filterval,
            "filtercol": filtercol,
            "currentpg": CurrentPage,
            "recordlmt": getTotalRecords
        };

        var gridTable = '';

        // GRID HEADER' 


        gridTable = gridTable + '<div class="wms-srv-grid-header">';
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Order ID</div>';
        if (objglobal == 'PutIn') {
            gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Id</div>';
        }
        else if (objglobal == 'InwardQC') {
            gridTable = gridTable + '<div class="wms-srv-grid-cell">QC Id</div>';
        }
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Reference No</div>';
        if (globalObj == 'Picking' || globalObj == 'OutwardQC' || globalObj == 'Packing' || globalObj == 'Dispatch') {
            gridTable = gridTable + '<div class="wms-srv-grid-cell">Group Name</div>';
        }
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
        gridTable = gridTable + '</div>';

        $('#tblgetGroupList').html(gridTable);


        callHttpUrl(apiPath, postData, function (data) {
            //alert(data);
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode == 'Success') {
                // var getResult = data.GRNOrderDetails;
                // var myGridList = JSON.parse(getResult);
                var getResult = data.Result;

                var myGridList = getResult.Table;
                var getGridData = myGridList;
                var getTotalRecords = getGridData[0].totalrecord;
                getGridData[0].CurrentPage;

                for (var i = 0; i < getGridData.length; i++) {
                    var getGroupID = getGridData[i].GroupID;
                    var getOrderNumber = getGridData[i].OrderNumber;
                    var getGroupName = getGridData[i].GroupName;
                    if (objglobal == 'PutIn' || objglobal == 'InwardQC') {
                        var getgrnID = getGridData[i].GRNID;
                    }



                    // GRID ROW
                    gridTable = '';

                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupID + '</div>';
                    if (objglobal == 'PutIn') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getgrnID + '</div>';
                    }
                    else if (objglobal == 'InwardQC') {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getgrnID + '</div>';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderNumber + '</div>';
                    if (globalObj == 'Picking' || globalObj == 'OutwardQC' || globalObj == 'Packing' || globalObj == 'Dispatch') {

                        gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupName + '</div>';
                    }
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><button class="wms-srv-input wms-srv-button " id="btnSave" title="Select" data-prefix="SV" onclick ="SelectGroup(' + getGroupID + '); return false" type="button"><i class="fas fa-check-circle"></i><span>Save</span></button></div>';

                    gridTable = gridTable + '</div>';

                    $('#tblgetGroupList').append(gridTable);
                }
                // $('#ddlOrderSearchCol').val('');
                // $('#txtOrdervalue').val('');
                setupGridPagingList('tlbgetGroupListPager', CurrentPage, getTotalRecords, getGroupList, 100);
            }
            else {
                alert('Unable to connect Server!!');
            }
            $("#hdnskuorderID").val(getGroupID);
        });
    }
}

function SearchOrder() {
    debugger;
    filtercol = $('#ddlOrderSearchCol').val();
    filterval = $('#txtOrdervalue').val();

    if (filterval == '') {
        alert('Please Enter value for filter');
    }
    else {
        getGroupList(filterval, filtercol, globalObj);
    }
    if (filtercol == '' && filterval == '') {
        getGroupList(filterval, filtercol, globalObj);
    }
}

function getSKUList(getGroupID, searchItemFilter, searchItemValue, globalObj) {
    debugger;

    var apiPath = wmsApiPath + 'TaskAssignment/TaskList';
    //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/TaskList";
    //var getCompanyID = $('#hdnCompanyID').val(); 
    $('#hdnskuorderID').val(getGroupID);

    $("#gridGroupSearch").hide();
    $("#gridItemSearch").show();


    if (searchItemFilter == '' || searchItemFilter == '0') {
        searchItemFilter = "ALL";
        searchItemValue = "";
    }

    if (searchItemFilter == 'ALL') {
        searchItemFilter = "ALL";
        searchItemValue = "";
    }
    var postData =
    {
        "obj": globalObj,
        "type": "Item",
        "orderID": getGroupID,
        "customerID": getCustomerId,
        "warehouseID": getWarehouseId,
        "userID": getUserId,
        "searchFilter": searchItemFilter,
        "searchValue": searchItemValue,
        "currentpg": strCurrentPage,
        "recordlmt": getTotalRecords
    };

    var gridTable = '';

    // GRID HEADER' 

    gridTable = gridTable + '<div class="wms-srv-grid-header">';
    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" name="Check" class="messageCheckbox" onclick="checkAllTask(this); return false;"></div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Group ID</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">Order Reference No</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Code</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">SKU Name</div>';
    if (globalObj == 'PutIn') {
        gridTable = gridTable + '<div class="wms-srv-grid-cell">GRN Quantity</div>';

    }
    else {
        gridTable = gridTable + '<div class="wms-srv-grid-cell">Requested Quantity</div>';


    }
    gridTable = gridTable + '<div class="wms-srv-grid-cell">UOM</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="display: none;">Lottable</div>';
    //gridTable = gridTable + '<div class="wms-srv-grid-cell">Location</div>';
    gridTable = gridTable + '<div class="wms-srv-grid-cell">User</div>';
    //gridTable = gridTable + '<div class="wms-srv-grid-cell">Action</div>';
    gridTable = gridTable + '</div>';

    $('#tlbgetSKUList').html(gridTable);


    callHttpUrl(apiPath, postData, function (data) {
        //alert(data);
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            // var getResult = data.GRNOrderDetails;
            // var myGridList = JSON.parse(getResult);


            var getResult = data.Result;
            var mybr = getResult.Table;
            var getbr = mybr[0].BusinessRule;


            var myGridList = getResult.Table1;

            // var getGridData = myGridList.InboundResult[0].InboundList;
            var getGridData = myGridList;
            for (var i = 0; i < getGridData.length; i++) {
                var getGroupID = getGridData[i].OrderID;
                var getTaskID = getGridData[i].TaskID;
                var getItemID = getGridData[i].ProdID;
                var getOrderdetailID = getGridData[i].OrderdetailID
                var getskucode = getGridData[i].ProdCode;
                var getskuname = getGridData[i].ProdName;
                var getreqqty = getGridData[i].RequestedQty;
                var getuom = getGridData[i].UOM;
                var getlocation = getGridData[i].Location;
                var getuser = getGridData[i].UserName;
                var getlottable1 = getGridData[i].Lottable1;
                var getlottable2 = getGridData[i].Lottable2;
                var getlottable3 = getGridData[i].Lottable3;
                var getOrderReferenceNo = getGridData[i].OrderNumber;



                // GRID ROW
                gridTable = '';

                gridTable = gridTable + '<div class="wms-srv-grid-row" id="wms-srv-grid-row-pqr">';
                //gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" name="Check" data-id="' + getTaskID + '" class="messageCheckbox"></div>';
                //--gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" name="Check" data-id="' + getOrderdetailID + '" class="messageCheckbox"></div>';
                if (getuser == 'N/A') {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" name="Check" data-id="' + getOrderdetailID + '" class="messageCheckbox"></div>';
                } else {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="checkbox" name="Check" data-id="' + getOrderdetailID + '" class="messageCheckbox" disabled></div>';
                }
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getGroupID + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getOrderReferenceNo + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getskucode + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getskuname + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getreqqty + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getuom + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="display: none;">' + getlottable1 + "|" + getlottable2 + "|" + getlottable3 + '</div>';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell">' + getlocation + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell txtCheckAssginUser">' + getuser + '</div>';
                //gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + bindTaskListActionControl() + "</div>";
                gridTable = gridTable + '</div>';

                $('#tlbgetSKUList').append(gridTable);
            }

            // $("#btnSubmitTask").click(function()
            // {
            //     finalSubmit(globalObj,RefObject);
            // })



        }
        else {
            alert('Unable to connect Server!!');
        }
    });

    setupGridPagingList('tlbgetGroupListPager', CurrentPage, getTotalRecords, getSKUList, 100);
}

function checkAllTask(e) {
    debugger;
    var checkboxes = document.getElementsByName('Check');
    var selectall = document.getElementById('hdnSelectAll');
    var getChkId = '';
    if (e.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            getChkId = checkboxes[i].id;
            $('#trTask_' + getChkId + ' td').css('background-color', '#cccccc');
        }
        selectall.value = "1";
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            getChkId = checkboxes[i].id;
            $('#trtrTask_' + getChkId + ' td').css('background-color', '#ffffff');
        }
        selectall.value = "0";
    }
}

function saveAssingment() {
    debugger;
    var SelectedOrder = document.getElementById("hdnSelectedTaskCheck");
    SelectedOrder.value = "";

    $('input[class="messageCheckbox"]').each(function () {
        if ($(this).prop("checked") == true) {
            if ($(this).attr("data-id") != null) {
                if (SelectedOrder.value == "") {
                    SelectedOrder.value = $(this).attr("data-id");
                }
                else {
                    SelectedOrder.value = SelectedOrder.value + "," + $(this).attr("data-id");
                }
            }
        }
    });
    if (SelectedOrder.value == '') {
        alert('Please select at least one record!!')
        return false;
    }
    var apiPath = wmsApiPath + 'TaskAssignment/CreteNewTask';
    //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/CreteNewTask";

    if (validate() == true) {
        debugger;
        //var getCustomerId = $("#ddlcustomer").val();
        //var getCompanyID = $('#hdnCompanyID').val();
        //var getUserId = $("#hdnUserID").val();
        var getTaskObj = $("#ddlTaskobj").val();
        var assingUserID = $("#hdnassinguserID").val();
        var getassingdate = $('#AssignDate').val();
        var asgHour = $('#ddltimehr').val();
        var asgmin = $('#ddlassingminute').val();
        var asgprs = $('#ddltime').val();
        var getTaskType = $('.TaskType:checked').val();
        //alert(getTaskType);
        globalTaskType = getTaskType;
        //var Itemslist = globalItem;
        if (getTaskType == 'Items') {
            globalOrderdetailID = SelectedOrder.value;
            globalItem = "0";
            globalOrderID = $('#hdnskuorderID').val();
        }
        else {
            globalItem = "0";
            globalOrderdetailID = "0";
            globalOrderID = SelectedOrder.value;

        }

        if (globalOrderID == "") {
            alert('Please select at least one order...!');
        } else {
            //start get system time
            var today = new Date();
            var date = today.getDate() + '-' + today.toLocaleString('default', { month: 'short' }) + '-' + today.getFullYear();
            var gethr = today.getHours();
            var getmin = today.getMinutes();
            var amPm = 'AM';
            var finalTime = gethr;
            if (gethr > 12) {
                var finalTime = gethr - 12;
            }
            if (gethr > 11) {
                amPm = 'PM';
            }
            var currentTime = finalTime + ':' + getmin + ' ' + amPm;
            var getSysTime = date + ' ' + currentTime;
            var SysTime = new Date(getSysTime);
            //end get system time

            //start get selected time
            var AsgTime = asgHour + ':' + asgmin + ' ' + asgprs;
            var getSelectedTime = getassingdate + ' ' + AsgTime;
            var SelectedTime = new Date(getSelectedTime);
            //end get selected time

            if (SelectedTime < SysTime) {
                alert('Please select valid Date & Time...!');
                var today = new Date()
                var todaydate = today.getDate();
                var dd = todaydate;
                var mm = today.toLocaleString('default', { month: 'short' });
                var yyyy = today.getFullYear();
                today = dd + '-' + mm + '-' + yyyy;
                $('#AssignDate').val(today);
            } else {
                var timeassing = asgHour + '-' + asgmin + '-' + asgprs;
                //var getOrderID = $("#TaskGroupID").val();
                //alert(getGlobalTaskId);
                var postData =
                {
                    "OrderID": globalOrderID,
                    "OrderdetailID": globalOrderdetailID,
                    "AssingType": getTaskType,
                    "Object": getTaskObj,
                    "Assingdate": getassingdate,
                    "AssingTime": timeassing,
                    "CreatedBy": getUserId,
                    "companyID": getCompanyID,
                    "customerID": getCustomerId,
                    "userID": assingUserID,
                    "warehouseID": getWarehouseId,
                    "Items": globalItem
                }

                callHttpUrl(apiPath, postData, function (result) {

                    // After success
                    var getCode = result.StatusCode;
                    // var getStatus = result.Status.toLocaleLowerCase();

                    var getStatus = result.Status.toLocaleLowerCase();
                    var grnID = result.Result.Message;


                    if (getCode == "Success") {
                        if (getTaskType == "Group") {
                            alert("Task assigned Successfully.")
                            const $select = document.querySelector('#ddlTaskobj');
                            $select.value = 'Receiving'
                            $('#tlbgetTaskList').html('');
                            $("#wms-srv-grid-row-pqr").html('');
                            $("#txtassinguserName").val('');
                            closeCreatePopup();
                            clearAssignmentPopup();
                            $('#wms-srv-createtask-popup').hide();
                            getTaskAssignmentList(searchvalue, searchfilter);

                        }

                        else if (getTaskType == "Items") {
                            alert("Task assigned Successfully.")
                            const $select = document.querySelector('#ddlTaskobj');
                            $select.value = 'Receiving'
                            $("#wms-srv-grid-row-pqr").html('');
                            $('#tlbgetTaskList').html('');
                            $("#txtassinguserName").val('');
                            closeCreatePopup();
                            clearAssignmentPopup();
                            $('#wms-srv-createtask-popup').hide();
                            //getSKUList(globalOrderID,searchvalue,searchfilter,globalObj);
                            getTaskAssignmentList(filtercol, filterval);

                            $("#wms-srv-createtask-popup-close").click(function () {
                                $('#tlbgetSKUList').html('');
                                $("#wms-srv-grid-row-pqr").html('');
                                finalSubmit(getTaskObj);
                            })


                            // if (getOrdercnt == getassingCnt) 
                            // {
                            //     alert("Task assigned Successfully.");
                            //     $("#txtassinguserName").val('');  
                            //     $('#wms-srv-createtask-popup').hide();   
                            //     getTaskAssignmentList(searchvalue,searchfilter);                
                            //     //$('#wms-srv-createtask-popup').show();
                            // }
                            // else 
                            // {
                            //     $('#wms-srv-createtask-popup').show();
                            // }
                        }
                    }

                    else {
                        // alert('Please Select All Field');
                        // alert('Please Select All Field');
                        alert('Unable to connect Server!!');
                    }

                    // $('#AssignDate').val();

                    // After success
                });
            }
        }
    }
}


function closeCreatePopup() {
    $('.txtCheckAssginUser').each(function () {
        var myPickupInputVal = $(this).val().trim();
        if (myPickupInputVal == 'N/A') {
            // isEmptyPalletInput = true;
            alert("");
        }
        else {
            $(this).attr('disabled');
        }
    });
}

function validateAssignOrder(getObj) {
    debugger;
    var apiPath = wmsApiPath + 'TaskAssignment/getOrdervalidation';
    //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/getOrdervalidation";
    globalOrderID = $('#hdnskuorderID').val();
    var postData =
    {
        "orderid": globalOrderID,
        "Obj": getObj
    }

    callHttpUrl(apiPath, postData, function (data) {

        getOrdercnt = data.Result.Table[0].Ordercnt;
        getassingCnt = data.Result.Table[0].assingCnt;

        if (getOrdercnt == getassingCnt) {
            alert("Task assigned Successfully.");
            $("#txtassinguserName").val('');
            $('#wms-srv-createtask-popup').hide();
            getTaskAssignmentList(searchvalue, searchfilter);

        }
        else {
            alert("Please assign the user to all SKU.");
            $("#txtassinguserName").val('');
        }

    });
}

function finalSubmit(ObjectTab, RefObject) {
    // debugger;
    var getTaskType = $('.TaskType:checked').val();
    if (getTaskType == "Items") {
        //validateAssignOrder(ObjectTab);
        $("#txtassinguserName").val('');
        closeCreatePopup();
        $('#wms-srv-createtask-popup').hide();
        $('#tlbgetTaskList').html('');
        getSKUList(globalOrderID, searchvalue, searchfilter, globalObj);

    }
    else if (RefObject == 0) {
        clearAssignmentPopup();
        $('#wms-srv-createtask-popup').off();
        $('#wms-srv-createtask-popup').hide();
        getTaskAssignmentList(searchvalue, searchfilter);
    }
    else {
        alert("Task assigned Successfully.");
        clearAssignmentPopup();
        $('#wms-srv-createtask-popup').off();
        $('#wms-srv-createtask-popup').hide();
        getTaskAssignmentList(searchvalue, searchfilter);

    }

}

function validate() {

    if (document.getElementById("AssignDate").value == "") {
        alert("Date cannot be blank.");
        return false;
    }
    else if (document.getElementById("ddltimehr").value == "") {
        alert("Time cannot be blank.");
        return false;
    }
    else if (document.getElementById("ddlassingminute").value == "") {
        alert("Time cannot be blank.");
        return false;
    }

    else if (document.getElementById("ddltime").value == "") {
        alert("Time cannot be blank.");
        return false;
    }

    else if (document.getElementById("txtassinguserName").value == "") {
        alert("User cannot be blank.");
        return false;
    } else {
        return true;
    }
}

function clearAssignmentPopup(getTaskCode) {

    $("#txtassinguserName").val('');
    $("#AssignDate").val('');
    $("#hdnskuorderID").val('');
    $("#hdnSelectedTaskCheck").val('');
}

function ReassingTheTask(userID, getTaskCode, getTaskStatus) {
    debugger;
    var apiPath = wmsApiPath + 'TaskAssignment/ReassignTask';
    //var apiPath = "http://localhost:50068/api/staging/v1/TaskAssignment/ReassignTask";
    //var getTaskCode = $("#listTaskCode").val();
    var postData =
    {
        TaskCode: getTaskCode,
        UserID: userID,
        CustomerId: getCustomerId,
        WarehouseId: getWarehouseId,
        TaskStatus: getTaskStatus
    }

    callHttpUrl(apiPath, postData, function (result) {

        // After success
        var getCode = result.StatusCode;
        // var getStatus = result.Status.toLocaleLowerCase();
        var getStatus = result.Status.toLocaleLowerCase();
        if (getCode == "Success") {
            alert('Task Successfully Reassgin To New User.');
            getTaskAssignmentList(filtercol, filterval);
        }
    });
}


function selectAllTask(chkObj) {
    debugger;
    var isChecked = $(chkObj).prop('checked');
    if (isChecked) {
        $('#tlbgetTaskList .wms-srv-grid-row input[type="checkbox"]').prop('checked', true);

    } else {
        $('#tlbgetTaskList .wms-srv-grid-row input[type="checkbox"]').prop('checked', false);
    }
}

function setupGridPagingGroupList(strCurrentPage, strTotalRecords, callBackFunction) {
    debugger;
    var global_max_record_count = 10;
    var pageNo = Number(strCurrentPage);
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
    pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left" title="First"></i></a>';
    // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
    pagerNavLinks += pagerLinks;
    //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
    pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right" title="Last"></i></a>';

    $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

    $('#c .wms-srv-pager-links a').off();
    $('#tlbgetGroupListPager .wms-srv-pager-links a').click(function () {
        var getDataPage = $(this).attr('data-page');
        if (callBackFunction != null) {

            callBackFunction(getDataPage);
        }
    });

    $('#tlbgetGroupListPager a.wms-srv-pager-go').off();
    $('#tlbgetGroupListPager a.wms-srv-pager-go').click(function () {
        var getDataPage = $('#tlbgetGroupListPager input[name="txtGridPageNo"]').val();
        if (Number(getDataPage) < 1) {
            alert('Please enter valid page number!!');
        } else if (Number(getDataPage) > Number(lastPage)) {
            //alert('Page number should not be greater than '+ lastPage +' !!');
            alert('Please enter valid page number!!');
        } else {
            if (callBackFunction != null) {
                callBackFunction(getDataPage, searchfilter, searchvalue);
            }
        }
    });
}