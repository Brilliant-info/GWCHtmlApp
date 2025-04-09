var UserId = mBrillWmsSession.getUserId();
var WarehouseId = mBrillWmsSession.getWarehouseId();
var CustomerId = mBrillWmsSession.getCustomerId();
var CompanyId = mBrillWmsSession.getCompanyId();
var getRoleId = mBrillWmsSession.getUserRoleId();

var getsql = '';
var getqueryobj = '';
var globalQueryId = '';
var globalobjectName = '';
var getNotificationId = '0';
var IDEmail = '';
var currentTableAlias = '';
var currentfinacial = '';

var stringDataType = ['char', 'varchar', 'text', 'nchar', 'nvarchar', 'ntext', 'binary', 'varbinary', 'image'];
var numberDataType = ['bit', 'tinyint', 'smallint', 'int', 'bigint', 'decimal', 'numeric', 'float', 'smallmoney', 'money', 'real'];
var dateTimeDataType = ['datetime', 'datetime2', 'smalldatetime', 'date', 'time', 'datetimeoffset', 'timestamp'];
var queryNumericOperators = ['=', '<', '<=', '>', '>='];
var queryStringOperators = ['LIKE', 'NOT LIKE'];

var sqlTableName = '';
var sqlCurrentColumnName = '';
var sqlCurrentColumnType = '';
var sqlFinalQuery = '';
var sqlConditionGroupCounter = 0;


function myFunction1() {
    //debugger;
    $('#intDaily').attr('style', 'Background:var(--wms-color-primary)');
    $('#intWeekly').attr('style', '');
    $('#intMonthly').attr('style', '');

}
function myFunction2() {
    //debugger;
    $('#intDaily').attr('style', '');
    $('#intWeekly').attr('style', 'Background:var(--wms-color-primary)');
    $('#intMonthly').attr('style', '');
}
function myFunction3() {
    //debugger;
    $('#intDaily').attr('style', '');
    $('#intWeekly').attr('style', '');
    $('#intMonthly').attr('style', 'Background:var(--wms-color-primary)');
}

function initQueryBuilder() {
    loadCurrentDate();
    $('#txt_FromdatePicker').datepicker({
        dateFormat: 'yy/mm/dd',
        onSelect: function (date) {
            var getFromDate = $('#txt_FromdatePicker').val();
            var getToDate = $('#txt_TodatePicker').val();
            $('#txtFromToDate').val(getFromDate + " to " + getToDate);
            $("#hideFromDate").val(getFromDate);
        }
    });
    $('#txt_TodatePicker').datepicker({
        dateFormat: 'yy/mm/dd',
        onSelect: function (date) {
            var getFromDate = $('#txt_FromdatePicker').val();
            var getToDate = $('#txt_TodatePicker').val();
            $('#txtFromToDate').val(getFromDate + " to " + getToDate);
            $("#hideToDate").val(getToDate);
        }
    });

    $(".iconClose").click(function () {
        $("#dateSelecter").hide();
    });
    getQueryBuilderList();
}

function opennewquery(getQueryId, getTableAlias) {
    sqlTableName = getTableAlias;
    globalQueryId = getQueryId;
    $('#wms-srv-executequery').html('');
    $('#wms-srv-newquery-popup').show();
    $('#wms-srv-newquery-popup-close').off();
    $('#wms-srv-newquery-popup-close').click(function () {
        $('#wms-srv-newquery-popup').hide();
        $("#dateSelecter").hide();
    });
    QueryBuilderExec(getQueryId);
    // BindDropDown();
    QryBldrBindDropDown();
    // getQueryBuilderButton();
}

function openquerybuildernotification(ID, getQueryId, getQueryObjectName) {
    //debugger)
    $('#themeQueryBuilderSetNotification').show();
    IDEmail = ID
    globalQueryId = getQueryId;
    globalobjectName = getQueryObjectName
    $('#btnCloseSqlNotificationPopup').off();
    $('#btnCloseSqlNotificationPopup').click(function () {
        $('#themeQueryBuilderSetNotification').hide();
    });
    $("#txtQueryNotificationTo").val('');
    QueryBuilderNotification(getQueryId);
    // $("#txtHH").val('');
    // $("#txtMM").val('');
}

function openqueryresult() {
    getQueryBuilderButton();
}

function openquerytext() {
    $('#wms-srv-querytext').show();
    $('#wms-srv-grid-queryresult').hide();
}

function saveQuery() {
    $('#theme-savequery-popup').show();
    $('#theme-savequery-popup-close').off();
    $('#theme-savequery-popup-close').click(function () {
        $('#theme-savequery-popup').hide();
    });
}

function openQuery() {
    $('#theme-openquery-popup').show();
    $('#theme-openquery-popup-close').off();
    $('#theme-openquery-popup-close').click(function () {
        $('#theme-openquery-popup').hide();
    });
}

function openQuerylist(rowPos) {
    var getQuery = $('#hdnQRBuilderSqlQuery' + rowPos).val();
    $('#txtQRBuilderQuery').html(getQuery);
    $('#theme-openquerylist-popup').show();
    $('#theme-openquerylist-popup-close').off();
    $('#theme-openquerylist-popup-close').click(function () {
        $('#theme-openquerylist-popup').hide();
    });
}


function openEditPopup() {
    debugger;
    loadQueryObjects();
    $('#wms-srv-editquery-popup').show();
    $('#wms-srv-editquery-popup-close').off();
    $('#wms-srv-editquery-popup-close').click(function () {
        var getFinalQueryText = $('#lblSQLQueryText').html();
        $('#txtopenquery').html(getFinalQueryText);
        $('#wms-srv-editquery-popup').hide();
        $("#dateSelecter").hide();
    });
}

function getDate() {
    //debugger;
    var element = document.getElementById("dateSelecter");
    element.classList.remove("listDateView");
    element.classList.add("dateGridView");
    $("#dateSelecter").show();
}

function editgetDate() {
    //debugger;
    var element = document.getElementById("dateSelecter");
    element.classList.remove("dateGridView");
    element.classList.add("listDateView");
    $("#dateSelecter").show();
}

function loadCurrentDate() {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    GetCurrentUserDate = today.replaceAll("-", "/");

    var prvMM = Number(mm) - 1;
    if (prvMM == 0) {
        prvMM = 12;
        yyyy = Number(yyyy) - 1;
    }
    var prvDate = yyyy + '-' + prvMM + '-' + dd;
    var GetPreviousDate = prvDate.replaceAll("-", "/");

    $('#txtFromToDate').val(GetPreviousDate + " to " + GetCurrentUserDate);
}

// Last 1 Day Data
function getPreviousdate(dateType) {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate - dateType;
    //var getDateIndex = day.indexOf("-");
    // var dd ="";
    // if( getDateIndex == 0)
    // {
    //     dd= day.slice(0);

    // }   
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    //yyyy-mm-dd
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate').val(userSelectedDate + " to " + GetCurrentUserDate);

}

//Last 30 days data
function getThirtyDateData(dateType) {
    //debugger;
    /*var today  = new Date();   
    var no_of_months = 1;
    today.setMonth(today.getMonth() - no_of_months);
    alert(today);*/

    let dt = new Date();
    let no_of_months = 1;

    var todaydate = dt.getDate();
    var cuurnetMonth = dt.getMonth();
    var getMonth = cuurnetMonth + 1;
    var yyyy = dt.getFullYear();
    var lastMonth = getMonth - 1;
    dt = yyyy + '-' + lastMonth + '-' + todaydate;



    userSelectedDate = dt.replaceAll("-", "/");
    $('#txtFromToDate').val(userSelectedDate + " to " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

//Last 7 days data
function getSevenDateData(dateType) {
    //debugger;
    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate - dateType;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //userSelectedDate = today.split("-").reverse().join("/");
    userSelectedDate = today.replaceAll("-", "/");
    $('#txtFromToDate').val(userSelectedDate + " to " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

//Current Finace days data
function getcurrentFYData(dateType) {

    //     var today  = new Date();
    //     var todaydate = today.getDate();
    //     var dd = dateType - todaydate;

    //     var mm = today.getMonth()+1; 
    //     var yyyy = today.getFullYear();
    //     if(dd<10) 
    //     {
    //     dd='0'+dd;
    //     } 
    // //yyyy-mm-dd
    //     if(mm<10) 
    //     {
    //     mm='0'+mm;
    //     } 
    //     today = yyyy+'-'+mm+'-'+dd;

    //     //userSelectedDate = today.split("-").reverse().join("/");
    //     userSelectedDate = today.replaceAll("-","/");
    $('#txtFromToDate').val(currentfinacial + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getQueryBuilderList() {
    //debugger;
    var apiPath = wmsApiPath + 'QueryBuilder/List';
    var postData =
    {
        "CustomerID": CustomerId,
        "CompanyID": CompanyId,
        "UserID": UserId,
        "RoleID": getRoleId
    };

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;

        if (getStatus == 200) {
            var myGridList = data.Result;
            $('#txtquarybuilder').html('');
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Query ID</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Title</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">SQL Query</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Object Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';

            // GRID HEADER
            for (var i = 0; i < myGridList.Table.length; i++) {
                var ID = myGridList.Table[i].ID;
                var getQueryId = myGridList.Table[i].QueryId;
                var getSqlTitle = myGridList.Table[i].SqlTitle;
                var getsqlQuery = myGridList.Table[i].sqlQuery;
                var getQueryObjectName = myGridList.Table[i].QueryObjectName;
                var getTableAlias = myGridList.Table[i].tableAlias;
                var getFlag = myGridList.Table[i].Flag;

                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" style="text-align: center;" id="qrBuilderRow' + i + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getQueryId + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSqlTitle + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'><i class='fas fa-solid fa-eye' onclick=openQuerylist(" + i + ");><input id='hdnQRBuilderSqlQuery" + i + "' type='hidden' value='" + getsqlQuery + "'></span></i></div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getQueryObjectName + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                // gridTable = gridTable + '<a href="#" title="Edit" data-prefix="" class="wms-srv-icononly" onclick="openEditPopup();">';
                // gridTable = gridTable + '<i class="fas fa-edit"></i></a>';      
                //gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
                gridTable = gridTable + '<a href="#" title="Execute Query" data-prefix="" class="wms-srv-icononly" onclick="opennewquery(' + getQueryId + ',\'' + getTableAlias + '\');">';
                gridTable = gridTable + '<i class="fas fa-play"></i></a>';
                gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
                gridTable = gridTable + '<a href="#" title="Alert" data-prefix="" class="wms-srv-icononly" onclick="openquerybuildernotification(' + ID + ',\'' + getQueryId + '\');">';
                gridTable = gridTable + '<i class="fas fa-envelope"></i></a>';
                gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
                gridTable = gridTable + '<a href="#" title=' + getFlag + ' data-prefix="" class="wms-srv-icononly" data-flag="' + getFlag + '">';
                if (getFlag == 'Public') {
                    gridTable = gridTable + '<i class="fas fa-users"></i>';
                }
                else if (getFlag == 'Private') {
                    gridTable = gridTable + '<i class="fas fa-user-lock" style="color:var(--wms-color-primary);"></i>';
                }
                gridTable = gridTable + '</a>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';


            }
            $('#txtquarybuilder').html(gridTable);
            //setupGridPagingList('vendorListSOGridPager', strCurrentPage, getTotalRecords, getvendorList);
        }
        else {
            alert('Unable to connect');
        }
    });
}


function QueryBuilderExec(getQueryId) {

    //debugger;
    var apiPath = wmsApiPath + 'QueryBuilder/Exec';
    var postData =
    {
        "CustomerID": CustomerId,
        "CompanyID": CompanyId,
        "UserID": UserId,
        "RoleID": getRoleId,
        "QueryID": getQueryId,
        "WarehouseID": WarehouseId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var popup = data.Result.Table;
        if (getStatus == 200) {
            getQueryId1 = popup[0].QueryId;
            getQueryObjectName = popup[0].QueryObjectName;
            getquerytitle = popup[0].querytitle;
            getsqlQuery = popup[0].sqlQuery;
            getCustomername = popup[0].Customername;
            getWarehouseName = popup[0].WarehouseName;
            getDefaultCriteria = popup[0].DefaultCriteria;

            // $("#").val(getID)
            $('#txtqueryID').html(getQueryId1);
            $('#txttitle1').html(getquerytitle);
            $('#txtobjectName').html(getQueryObjectName);
            $('#txtopenquery').html(getsqlQuery);
            $('#txtopenquerylist').html(getsqlQuery);
            $('#txtcustomer').html(getCustomername);
            $('#txtwarehouse').html(getWarehouseName);
            $('#txtFromToDate').html(getDefaultCriteria);
            // $('#queryIDnotification').val(getQueryId1);
            // $('#querybuildertitle').val(getquerytitle);
            // $('#querybuilderObject').val(getQueryObjectName);
            loadQueryObjects();
        }
        else {
            alert('Unable to connect Server!!');
        }
        QueryObjectCol();
    });

}


function AddNotification() {

    //debugger;
    var apiPath = wmsApiPath + 'QueryBuilder/NotificationSave';

    var getEmailNotificationSave = $("#txtEmailNotificationsave").val();

    var postData =
    {
        EmailTemplateID: IDEmail,
        WarehouseID: WarehouseId,
        CustomerID: CustomerId,
        UserID: UserId,
        QueryId: globalQueryId,
        NotificationId: getNotificationId,
        AddEmail: getEmailNotificationSave
    }

    callHttpUrl(apiPath, postData, function (data) {
        var isSuccess = data.Status;
        var getEmailNotificationresult = data.Result;
        if (isSuccess == 200) {
            var returvnmsg = getEmailNotificationresult.Message;
            if (returvnmsg == "success") {

                alert('Save Successfully!!');
                var getEmailNotificationSave = $("#txtEmailNotificationsave").val();

                $('#pnlEmailAddGroup1').append('<div class="pnlEmailBlockNotification"> <label id="txtNotificationTo">' + getEmailNotificationSave + '</label> <i class="fas fa-times-circle" onclick="RemoveNotification(\'' + IDEmail + '\',\'' + getEmailNotificationSave + '\',this);"></i></div>');
                $("#txtEmailNotificationsave").val('');
                $('#txtshowEmail').hide();

            }
            else {
                alert(returnmsg);
            }

        }
        else {
            alert('Error Occured!!');
        }
    });
}

function RemoveNotification(templateID, txtEmail, obj) {
    //debugger;
    var apiPath = wmsApiPath + 'QueryBuilder/RemoveNotification';
    var getEmailSave = $("#txtEmailsave").val();

    postData =
    {
        "EmailTemplateID": templateID,
        "WarehouseID": WarehouseId,
        "CustomerID": CustomerId,
        "UserID": UserId,
        "QueryId": globalQueryId,
        "NotificationId": getNotificationId,
        "AddEmail": txtEmail
    }

    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatusCode = data.StatusCode;
        var getStatus = data.Status;
        if (getStatus == '200' && getStatusCode == 'Success') {
            $(obj).parent().remove();
        }
    });
}

function SaveNotification() {
    //debugger
    var apiPath = wmsApiPath + 'QueryBuilder/AddUpdateNotifications';

    if (getNotificationId == '0') {
        var NotificationTo = $("#txtNotificationTo").html();
        var getDaily = $("#intDaily").html();
        var getWeekly = $("#intWeekly").html();
        var getMonthly = $("#intMonthly").html();
        var getInterval = getDaily + getWeekly + getMonthly;
        var HH = $("#txtHH").val();
        var MM = $("#txtMM").val();
        var ampm = $("#txtAMPM").val();
        var getSendAt = HH + ':' + MM + ' ' + ampm;
        var getActiveMon = $("#txtMon").is(":checked");
        var getActiveTUE = $("#txtTUE").is(":checked");
        var getActiveWED = $("#txtWED").is(":checked");
        var getActiveTHU = $("#txtTHU").is(":checked");
        var getActiveFRI = $("#txtFRI").is(":checked");
        var getActiveSAT = $("#txtSAT").is(":checked");
        var getActiveSUN = $("#txtSUN").is(":checked");
        var getNotiDayOfWeek = getActiveMon + getActiveTUE + getActiveWED + getActiveTHU + getActiveFRI + getActiveSAT + getActiveSUN;

    }


    var postData =
    {
        "Title": '-',
        "Message": "Saved Notification",
        "NotificationTo": NotificationTo,
        "Interval": getInterval,
        "SendAt": getSendAt,
        "NotiDayOfWeek": getNotiDayOfWeek,
        "NotiDayOfMonth": "-",
        "UserID": UserId,
        "ObjectName": "Outward",
        "QueryId": globalQueryId,
        "NotificationId": getNotificationId,
        "msgbody": "-",
    }

    callHttpUrl(apiPath, postData, function (data) {
        var isSuccess = data.Status;
        var getNotificationresult = data.Result;
        if (isSuccess == 200) {
            var returvnmsg = getNotificationresult.Message;
            if (returvnmsg == "success") {
                alert('Notification Saved Successfully!!');
                $("#pnlEmailAddGroup1").html('')
                $("#txtHH").val('');
                $("#txtMM").val('');
                $("#txtAMPM").val('');
            }
            else {
                alert('Error');
            }

        }
        else {
            alert('Error!!');
            $("#txtQueryNotificationTo").val('');
            //$("#txtHH").val('');
            //$("#txtMM").val('');
        }
    });
}
function validateEmail() {
    var empt = document.getElementById("txtEmailsave").value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (empt == "") {
        alert("Email Id cannot be blank.");
        return false;
    }
    else if (empt == "" || (!empt.match(mailformat))) {
        alert("Not a Valid email address!");
        return false;
    }
    else {
        return true;
    }
}

function showNotification() {
    $('#txtshowEmail').show();
    $('#txthideEmail').off();
    $('#txthideEmail').click(function () {
        $('#txtshowEmail').hide();
    });
    // $('#txtEmailsave').val('');

}

function getQueryBuilderButton() {
    debugger;
    if (validateExecuteQueryForm()) {
        $('#wms-srv-executequery').html('');
        var getFromToDate = $('#txtFromToDate').val();
        var splitFromToDate = getFromToDate.split(' to ');
        var fromDate = splitFromToDate[0];
        var toDate = splitFromToDate[1];
        var getCustomerId = $('#ddlQryCustomer').val();
        var getWarehouseId = $('#ddlQryWarehouse').val();
        var getSqlQuery = $('#txtopenquery').text();
        var getFilterSqlQuery = getSqlQuery.split("'").join('[qt]');
        var getObjectName = $('#txtobjectName').html();
        var apiPath = wmsApiPath + 'QueryBuilder/ExecButton';
        var postData =
        {
            "UserID": UserId,
            "SqlQry": getSqlQuery,
            "frDate": fromDate,
            "ToDate": toDate,
            "Obj": getObjectName,
            "CustId": getCustomerId,
            "WId": getWarehouseId,
            "QueryId": globalQueryId
        };

        callHttpUrl(apiPath, postData, function (data) {
            var getStatus = data.Status;

            if (getStatus == 200) {
                var myGridList = data.Result;
                $('#wms-srv-executequery').html('');
                var getHeaderKeys = [];
                var getHeaderObj = myGridList.Table[0];
                var arrKeys = Object.keys(getHeaderObj);
                var gridTable = '';
                // GRID HEADER        
                gridTable = gridTable + '<div class="wms-srv-grid-header">';
                for (var k = 0; k < arrKeys.length; k++) {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + arrKeys[k] + '</div>';
                }
                gridTable = gridTable + '</div>';

                // GRID HEADER
                for (var i = 0; i < myGridList.Table.length; i++) {
                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" style="text-align: center;">';
                    for (var j = 0; j < arrKeys.length; j++) {
                        gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + myGridList.Table[i][arrKeys[j]] + '</div>';
                    }
                    gridTable = gridTable + '</div>';
                }
                $('#wms-srv-executequery').html(gridTable);
                $('#wms-srv-executequery').show();
                $('#wms-srv-grid-queryresult').show();
                //setupGridPagingList('vendorListSOGridPager', strCurrentPage, getTotalRecords, getvendorList);
            }
            else {
                alert('Unable to connect');
            }
        });
    }
}

function printQueryBuilderReport() {
    var exportFinalData = '';
    var getPageTitle = 'Export';
    $('#wms-srv-executequery .wms-srv-grid-header').each(function () {
        var getMyCell = $(this).find('.wms-srv-grid-cell');
        exportData = '';
        $(getMyCell).each(function () {
            var getMyText = $(this).text();
            if (exportData == '') {
                exportData = getMyText;
            } else {
                exportData = exportData + ", " + getMyText;
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });
    $('#wms-srv-executequery .wms-srv-grid-row').each(function () {
        var getMyCell = $(this).find('.wms-srv-grid-cell');
        exportData = '';
        $(getMyCell).each(function () {
            var getMyText = $(this).text();
            if (exportData == '') {
                exportData = getMyText;
            } else {
                exportData = exportData + ", " + getMyText;
            }
        });
        exportFinalData = exportFinalData + exportData + "\n";
    });
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([exportFinalData], { type: "text/plain" }));
    a.download = getPageTitle + ".csv";
    a.click();
}

function validateExecuteQueryForm() {
    var isValid = true;
    var validationMsg = '';
    var getFromToDate = $('#txtFromToDate').val();
    var getCustomerId = $('#ddlQryCustomer').val();
    var getWarehouseId = $('#ddlQryWarehouse').val();
    var getSqlQuery = $('#txtopenquery').html();
    var getObjectName = $('#txtobjectName').html();

    if (getFromToDate.indexOf('to') > -1) {
        var splitFromToDate = getFromToDate.split('to');

        var fromDate = splitFromToDate[0].trim();
        var toDate = splitFromToDate[1].trim();
        if (fromDate.trim() == '') {
            validationMsg = 'Select valid from date!!';
        } else if (toDate.trim() == '') {
            validationMsg = 'Select valid to date!!';
        } else if (getCustomerId.trim() == '' || getCustomerId.trim() == '0') {
            validationMsg = 'Please select Customer!!';
            isValid = false;
        } else if (getWarehouseId.trim() == '' || getWarehouseId.trim() == '0') {
            validationMsg = 'Please select Warehouse!!';
            isValid = false;
        } else if (getSqlQuery.trim() == '') {
            validationMsg = 'Invalid SQL Query!!';
            isValid = false;
        } else if (getObjectName.trim() == '') {
            validationMsg = 'Invalid Object Name!!';
            isValid = false;
        }
    } else {
        validationMsg = 'Invalid input dates!!';
        isValid = false;
    }

    if (validationMsg.trim() != '') {
        isValid = false;
        alert(validationMsg);
    }

    return isValid;
}

function QryBldrBindDropDown() {
    var apiPath = wmsApiPath + 'Dashboard/GetDropdownList';
    var postData =
    {
        UserId: UserId,
    };

    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            var myGridList = data.Result;
            var customer = myGridList.Table;
            $("#ddlQryCustomer").html('<option value = "0">-- Select --</option>');
            if (customer.length > 0) {
                for (var i = 0; i < customer.length; i++) {
                    var CustId = customer[i].ID;
                    var custname = customer[i].Name;
                    $("#ddlQryCustomer").append('<option value = "' + CustId + '">' + custname + '</option>');
                }
                $("#ddlQryCustomer").off();
                $("#ddlQryCustomer").change(function () {
                    var getName = $(this).find('option:selected').text();
                    var getNameId = $(this).val();
                    // mBrillWmsSession.setCustomerName(getName);
                    // mBrillWmsSession.setCustomerId(getNameId);
                    /*  if(wmsAppDefaultPageFunction != null){
                          wmsAppDefaultPageFunction();
                      } */
                    //    wmsNavigatePage(wmsAppPage);
                });
                // var getDefaultCustomer = mBrillWmsSession.getCustomerId();
                // $("#ddlQryCustomer").val(getDefaultCustomer);
                $("#ddlQryCustomer").val(customer[0].ID);
            }

            var warehouse = myGridList.Table1;
            $("#ddlQryWarehouse").html('<option value = "0">-- Select --</option>');
            if (warehouse.length > 0) {
                for (var i = 0; i < warehouse.length; i++) {
                    var wrId = warehouse[i].ID;
                    var wrname = warehouse[i].WarehouseName;
                    $("#ddlQryWarehouse").append('<option value = "' + wrId + '">' + wrname + '</option>');
                }
                $("#ddlQryWarehouse").off();
                $("#ddlQryWarehouse").change(function () {
                    var getName = $(this).find('option:selected').text();
                    var getNameId = $(this).val();
                    // mBrillWmsSession.setWarehouseName(getName);
                    // mBrillWmsSession.setWarehouseId(getNameId);
                    /* if(wmsAppDefaultPageFunction != null){
                        wmsAppDefaultPageFunction();
                    }*/
                    // wmsNavigatePage(wmsAppPage);
                });
                //var getDefaultWarehouse = mBrillWmsSession.getWarehouseId();
                //$("#ddlwarehouse").val(getDefaultWarehouse);
                $("#ddlQryWarehouse").val(warehouse[0].ID);
            }

            var client = myGridList.Table2;
            $("#ddlclient").html('<option value = "0"> -- Select All -- </option>');
            if (client.length > 0) {
                for (var i = 0; i < client.length; i++) {
                    var clId = client[i].ID;
                    var clname = client[i].Name;
                    $("#ddlclient").append('<option value = "' + clId + '">' + clname + '</option>');
                }
                $("#ddlclient").off();
                $("#ddlclient").change(function () {
                    var getName = $(this).find('option:selected').text();
                    var getNameId = $(this).val();
                    mBrillWmsSession.setClientName(getName);
                    mBrillWmsSession.setClientId(getNameId);
                    /* if(wmsAppDefaultPageFunction != null){
                        wmsAppDefaultPageFunction();
                    } */
                    wmsNavigatePage(wmsAppPage);
                });
                var getDefaultClient = mBrillWmsSession.getClientId();
                //$("#ddlclient").val(getDefaultClient);
                $("#ddlclient").val('0');
                mBrillWmsSession.setClientName('');
                mBrillWmsSession.setClientId('0');
            }
        }
    });
}

function QueryObjectCol() {

    debugger;
    var apiPath = wmsApiPath + 'QueryBuilder/ObjectCol';
    var postData =
    {
        "UserID": UserId,
        "QueryId": globalQueryId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var popup = data.Result.Table;
        if (getStatus == 200) {
            getCOLUMN_NAME0 = popup[0].COLUMN_NAME;
            getCOLUMN_NAME1 = popup[1].COLUMN_NAME;
            getCOLUMN_NAME2 = popup[2].COLUMN_NAME;
            getCOLUMN_NAME3 = popup[3].COLUMN_NAME;
            getCOLUMN_NAME4 = popup[4].COLUMN_NAME;
            getCOLUMN_NAME5 = popup[5].COLUMN_NAME;
            getCOLUMN_NAME6 = popup[6].COLUMN_NAME;
            getCOLUMN_NAME7 = popup[7].COLUMN_NAME;
            getCOLUMN_NAME8 = popup[8].COLUMN_NAME;
            getCOLUMN_NAME9 = popup[9].COLUMN_NAME;
            getCOLUMN_NAME10 = popup[10].COLUMN_NAME;

            // $("#").val(getID)
            $('#sqlCol-FirstName').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME0);
            $('#sqlCol-LastName').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME1);
            $('#sqlCol-RoleName').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME2);
            $('#sqlCol-Warehouse').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME3);
            $('#sqlCol-CompanyID').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME4);
            $('#sqlCol-Company').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME5);
            $('#sqlCol-Customer').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME6);
            $('#sqlCol-MobileAccess').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME7);
            $('#sqlCol-Active').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME8);
            $('#sqlCol-ModifiedBy').html('<input type="checkbox" value="" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);>' + getCOLUMN_NAME9);
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}


function resetQueryVariables() {
    sqlTableName = '';
    //sqlCurrentColumnName = '';
    sqlCurrentColumnType = '';
    sqlFinalQuery = '';
    sqlConditionGroupCounter = 0;
    resetQueryUI();
}

function resetQueryUI() {
    $('#dataConditionHolder').empty();
    $('#winQueryConditionHeader').html('Condition: ');
    //$('#txtSqlConditionColumn').empty();
    $('#dataColumnHolder').empty();
    $('#hdnSQLQueryText').val('');
    $('#lblSQLQueryText').html('');
    $('#txtSqlCondition').val('=');
    $('#txtSqlConditionValue').val('');
    $('#hdnObjectName').val('');
}

function loadQueryColumns(result, sqlTableName, cacheCurrentSQL) {
    //debugger;
    var arrSqlColumns = result.Result.Table;
    for (rc = 0; rc <= (arrSqlColumns.length - 1); rc++) {
        //  var arrColumnDetails = arrSqlColumns[rc].split(":");
        var getColumnName = arrSqlColumns[rc].COLUMN_NAME;
        var getDataType = arrSqlColumns[rc].DATA_TYPE;
        addQueryColumns(getColumnName, getDataType);
    }
    $('#dataColumnHolder .winQueryColumnItem').click(function (e) {
        $('#dataColumnHolder .winQueryColumnItem').removeClass('sqlActiveQueryColumn');
        $(this).addClass('sqlActiveQueryColumn');
        sqlCurrentColumnName = $(this).data('label');
        sqlCurrentColumnType = $(this).data('type');
        $('#winQueryConditionHeader').html('Condition: ' + sqlCurrentColumnName);
        $('#txtSqlConditionColumn').html(sqlCurrentColumnName);
        $('#txtSqlCondition').val('=');
        $('#txtSqlConditionValue').val('');
        changeSqlControlType();
    });

    $("#dataColumnHolder").sortable({
        update: function (event, ui) {
            buildSQLQuery();
        }
    });
    $("#dataColumnHolder").disableSelection();
    if (cacheCurrentSQL != 'na') {
        extractSelectedDBColumnView(cacheCurrentSQL, sqlTableName);
    }
    hideWMSThemeLoading();
}

function loadSqlQueryResult(result) {
    $('#divSqlResult').html(result);
}

function callNotificationData(queryObj) {
    var queryId = $(queryObj).data('queryid');
    var notificationId = $(queryObj).data('notificationid');
    if (notificationId != '0') {
        $.ajax({
            type: "GET",
            url: "../querybuilder/getNotificationDetails.ashx?ntid=" + notificationId + "&qid=" + queryId,
            data: { 'notificationId': notificationId },
            beforeSend: function () {
                showWMSThemeLoading();
            },
            success: function (data) {
                //    $('#themeQueryBuilderSetNotification').css('display', 'block');
                var obj = JSON.parse(data);
                var getID = obj.getID;
                var getTitle = obj.getTitle;
                var getMessage = obj.getMessage;
                var getNotificationTo = obj.getNotificationTo;
                var getInterval = obj.getInterval;
                var getSendAt = obj.getSendAt;
                var getNotiDayOfWeek = obj.getNotiDayOfWeek;
                var getNotiDayOfMonth = obj.getNotiDayOfMonth;
                var getUserID = obj.getUserID;
                var getObjectName = obj.getObjectName;
                var getQueryId = obj.getQueryId;
                var getCreatedBy = obj.getCreatedBy;
                var getCreationDate = obj.getCreationDate;

                $('#hdnQueryIdForNotification').val(queryId);
                $('#hdnNotificationId').val(notificationId);
                $('#hdnQueryInterval').val(getInterval);
                $('#hdnQuerySendAt').val(getSendAt);
                $('#hdnQueryDayOfWeek').val(getNotiDayOfWeek);
                $('#hdnQueryDayOfMonth').val(getNotiDayOfMonth);
                $('#txtQueryNotificationTitle').val(getTitle);
                $('#txtQueryNotificationMessage').val(getMessage);
                $('#txtQueryNotificationTo').val(getNotificationTo);

                $('.queryBuilderScheduleInterval div').removeClass('qbInteralSelected');
                $('#hdnQueryInterval').val(getInterval);

                if (getInterval == 'DAILY') {
                    $('#intDaily').addClass('qbInteralSelected');
                    $('#intDaily').parent().data('value', getInterval);
                    $('#divDayOfWeek').css('display', '');
                    // $('#divDayOfWeek').css('display', 'none');
                    $('#divDayOfMonth').css('display', 'none');
                    // $('.queryBuilderScheduleDay i').attr('class', 'fas fa-check-square');
                    // $('.queryBuilderScheduleDay div').data('isselected', 'yes');
                    $('.queryBuilderScheduleDay i').attr('class', 'far fa-check-square');
                    $('.queryBuilderScheduleDay div').data('isselected', 'no');
                    $('#divQbCalendarDate').css('display', 'none');
                    /* Select Only Specific Data */
                    var getNotiEachDay = getNotiDayOfWeek.split(":");
                    for (i = 0; i < (getNotiEachDay.length - 1); i++) {
                        // alert("Notification Day: " + getNotiEachDay[i]);
                        $('#ntd' + getNotiEachDay[i]).data('isselected', 'yes');
                        $('#ntd' + getNotiEachDay[i]).find('i').attr('class', 'fas fa-check-square');
                    }
                    /* Select Only Specific Data */

                } else if (getInterval == 'WEEKLY') {
                    $('#intWeekly').addClass('qbInteralSelected');
                    $('#intWeekly').parent().data('value', getInterval);
                    $('#divDayOfWeek').css('display', '');
                    $('#divDayOfMonth').css('display', 'none');
                    $('.queryBuilderScheduleDay i:first-child').attr('class', 'far fa-check-square');
                    $('.queryBuilderScheduleDay div').data('isselected', 'no');
                    $('#divQbCalendarDate').css('display', 'none');
                    /* Select Only Specific Data */
                    var getNotiEachDayWeekly = getNotiDayOfWeek.split(":");
                    for (i = 0; i < (getNotiEachDayWeekly.length - 1); i++) {
                        // alert("Notification Day: " + getNotiEachDay[i]);
                        $('#ntd' + getNotiEachDayWeekly[i]).data('isselected', 'yes');
                        $('#ntd' + getNotiEachDayWeekly[i]).find('i').attr('class', 'fas fa-check-square');
                    }
                    /* Select Only Specific Data */
                } else if (getInterval == 'MONTHLY') {
                    $('#intMonthly').addClass('qbInteralSelected');
                    $('#intMonthly').parent().data('value', getInterval);
                    $('#divDayOfWeek').css('display', 'none');
                    $('#divDayOfMonth').css('display', '');
                    $('.queryBuilderScheduleDay i').attr('class', 'far fa-check-square');
                    $('.queryBuilderScheduleDay div').data('isselected', 'no');
                    /* Select Monthly Data */
                    $('#dmFirstDayOfMonth').data('isselected', 'no');
                    $('#dmLastDayOfMonth').data('isselected', 'no');
                    $('#dmMidDayOfMonth').data('isselected', 'no');
                    $('#dmFirstDayOfMonth i').attr('class', 'far fa-circle');
                    $('#dmLastDayOfMonth i').attr('class', 'far fa-circle');
                    $('#dmMidDayOfMonth i').attr('class', 'far fa-circle');
                    $('#divQbCalendarDate').css('display', 'none');
                    // alert(getNotiDayOfMonth);
                    if (getNotiDayOfMonth == 'FirstDayOfMonth') {
                        $('#dmFirstDayOfMonth').data('isselected', 'yes');
                        $('#dmFirstDayOfMonth i').attr('class', 'far fa-dot-circle');
                        $('#qbDDListDate').val('--Select Date--');
                    } else if (getNotiDayOfMonth == 'LastDayOfMonth') {
                        $('#dmLastDayOfMonth').data('isselected', 'yes');
                        $('#dmLastDayOfMonth i').attr('class', 'far fa-dot-circle');
                        $('#qbDDListDate').val('--Select Date--');
                    } else {
                        $('#dmMidDayOfMonth').data('isselected', 'yes');
                        $('#dmMidDayOfMonth i').attr('class', 'far fa-dot-circle');
                        $('#qbDDListDate').val(getNotiDayOfMonth);
                        $('#divQbCalendarDate').css('display', '');
                        $('#hdnQueryDayOfMonth').val('MidDayOfMonth');
                    }
                    /* Select Monthly Data */
                }

                /* SEND AT TIME */
                var getHH = getSendAt.split(":");
                var getMM = '';
                //  alert(getHH[0]);
                $('#qbDDListHH').val(getHH[0]);

                if (getSendAt.indexOf('AM') > -1) {
                    $('#qbDDListAMPM').val('AM');
                    getMM = getHH[1].replace(' AM', '');
                } else if (getSendAt.indexOf('PM') > -1) {
                    $('#qbDDListAMPM').val('PM');
                    getMM = getHH[1].replace(' PM', '');
                }
                $('#qbDDListMM').val(getMM);
                $('#divBtnSaveNotification i').attr('class', 'fas fa-save');
                $('#divBtnSaveNotification input').val('Update Notification');
                $('#hdnQueryDayOfWeek').val(getSelectedDaysOfWeek());
                /* SEND AT TIME */

                // alert(obj.getMessage);
                openSqlQueryNotificationPopup(queryObj);
                hideWMSThemeLoading();
                //if (data.trim() != '') {
                //    alert(data);
                //} else {
                //    hideWMSThemeLoading();
                //}
            }
        });
    } else {
        $('#divBtnSaveNotification i').attr('class', 'fas fa-plus');
        $('#divBtnSaveNotification input').val('Save Notification');
        openSqlQueryNotificationPopup(queryObj);
        hideWMSThemeLoading();
    }
}

// function callAPItoGetObjectColumn(sqlTableName, cacheCurrentSQL) 
// {
//     debugger;
//     if (sqlTableName != '') {
//         $('#hdnObjectName').val(sqlTableName);
//         $('#winQueryHeader').html(sqlTableName);
//         buildSQLQuery();
//         $('#dataColumnHolder').empty();

//          var getQueryColumnUrl = 'http://localhost:5230/api/staging/v1/QueryBuilder/ObjectCol';
//         //var getQueryColumnUrl = wmsApiPath +'QueryBuilder/ObjectCol';
//         // ../querybuilder/geObjectColumns.ashx

//         var postData = {
//             "UserID": UserId,
//             "QueryId": globalQueryId
//         };

//         $.ajax({
//             type: "POST",
//             url: getQueryColumnUrl,
//             data: postData,
//             beforeSend: function () {
//                 showWMSThemeLoading();
//             },
//             success: function (data) {
//                // alert(data);
//                // if (data.trim() != '') {
//                 if (data != null) {
//                   //  var cacheCurrentSQL = '';
//                     loadQueryColumns(data, sqlTableName, cacheCurrentSQL);
//                 } else {
//                     hideWMSThemeLoading();
//                 }
//             }
//         });
//     } else {
//         hideWMSThemeLoading();
//     }
// }

function callAPItoGetObjectColumn(sqlTableName, cacheCurrentSQL) {
    debugger;
    if (sqlTableName != '') {
        $('#hdnObjectName').val(sqlTableName);
        $('#winQueryHeader').html(sqlTableName);
        buildSQLQuery();
        $('#dataColumnHolder').empty();

        //var getQueryColumnUrl = 'http://localhost:5230/api/staging/v1/QueryBuilder/ObjectCol';
        var apiPath = wmsApiPath + 'QueryBuilder/ObjectCol';
        // ../querybuilder/geObjectColumns.ashx

        var postData =
        {
            "UserID": UserId,
            "QueryId": globalQueryId
        };

        // $.ajax({
        //     type: "POST",
        //     url: getQueryColumnUrl,
        //     data: postData,
        //     beforeSend: function () {
        //         showWMSThemeLoading();
        //     },
        //     success: function (data) {
        //        // alert(data);
        //        // if (data.trim() != '') {
        //         if (data != null) {
        //           //  var cacheCurrentSQL = '';
        //             loadQueryColumns(data, sqlTableName, cacheCurrentSQL);
        //         } else {
        //             hideWMSThemeLoading();
        //         }
        //     }
        // });
        callHttpUrl(apiPath, postData, function (data) {
            var getStatus = data.Status;
            var popup = data.Result.Table;
            if (getStatus == 200) {
                loadQueryColumns(data, sqlTableName, cacheCurrentSQL);
            }
            else {
                alert('Unable to connect Server!!');
            }
        });
    }
}


function callAPItoGetQueryResult() {
    if (sqlFinalQuery != '') {
        $('#aspnetForm').attr('target', 'iframeSqlQueryResult');
        $('.themeWmsSqlQueryPopup').css('display', 'block');
        showWMSThemeLoading();
    } else {
        hideWMSThemeLoading();
    }
}

function callAPItoGetQueryResultNew() {
    $('#wms-srv-executequery').html('');
    var getFromToDate = $('#txtFromToDate').val();
    var splitFromToDate = getFromToDate.split(' to ');
    var fromDate = splitFromToDate[0];
    var toDate = splitFromToDate[1];
    var getCustomerId = $('#ddlQryCustomer').val();
    var getWarehouseId = $('#ddlQryWarehouse').val();
    var getSqlQuery = $('#hdnSQLQueryText').val();
    var getFilteredSqlQuery = getSqlQuery.split("'").join("[qt]");
    var getObjectName = $('#txtobjectName').html();
    var apiPath = wmsApiPath + 'QueryBuilder/ExecButton';
    var postData =
    {
        "UserID": UserId,
        "SqlQry": getFilteredSqlQuery,
        "frDate": fromDate,
        "ToDate": toDate,
        "Obj": getObjectName,
        "CustId": getCustomerId,
        "WId": getWarehouseId,
        "QueryId": globalQueryId
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;

        if (getStatus == 200) {
            var myGridList = data.Result;
            var getHeaderKeys = [];
            var getHeaderObj = myGridList.Table[0];
            var arrKeys = Object.keys(getHeaderObj);
            $('#wms-srv-grid-queryresult').html('');
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            for (var k = 0; k < arrKeys.length; k++) {
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + arrKeys[k] + '</div>';
            }
            gridTable = gridTable + '</div>';

            // GRID HEADER
            debugger;
            for (var i = 0; i < myGridList.Table.length; i++) {
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" style="text-align: center;">';
                for (var j = 0; j < arrKeys.length; j++) {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">' + myGridList.Table[i][arrKeys[j]] + '</div>';
                }
                gridTable = gridTable + '</div>';
            }
            $('#wms-srv-grid-queryresult').html(gridTable);
            $('#wms-srv-grid-queryresult').css('display', 'table');
        }
        else {
            alert('Unable to connect');
        }
    });
}

function grdSqlQueryResult_OnSuccess() {
    callAPItoGetData();
}

function loadQueryObjects() {
    debugger;
    // addQueryObjects('V_WMS_LocationObj');
    // addQueryObjects('V_WMS_UserObj');
    // addQueryObjects('V_WMS_SkuObj');
    // addQueryObjects('V_WMS_InboundObj');

    $('#dataObjectHolder li').click(function (e) {
        resetQueryVariables();
        //sqlTableName = $(this).data('value');
        callAPItoGetObjectColumn(sqlTableName, 'na');
    });
    var getSqlQuery = $('#txtopenquery').html();
    $('#hdnSQLQueryText').val(getSqlQuery);
    $('#hdnHtmlWhereObj').val('');
    $('#dataConditionHolder').empty();
    $('#wms-srv-grid-queryresult').html('');
    var chkEditQueryId = $('#hdnQueryId').val();
    var cacheCurrentSQL = $('#hdnSQLQueryText').val();
    if (chkEditQueryId.trim() != '') {
        //sqlTableName = $('#hdnObjectName').val();
        callAPItoGetObjectColumn(sqlTableName, cacheCurrentSQL);
    }
}

function extractSelectedDBColumnView(getCacheCurrentSQL, getObjectName) {
    //debugger;
    var splitSqlByFrom = getCacheCurrentSQL.split(' from ' + getObjectName);
    var removeSelectFromSql = splitSqlByFrom[0].replace('Select ', '');
    var splitSqlByComma = removeSelectFromSql.split(',');
    for (var i = 0; i < splitSqlByComma.length; i++) {
        var getCacheColumn = splitSqlByComma[i].trim();
        if (getCacheColumn.indexOf(' AS ') > -1) {
            var splitSqlColByAs = getCacheColumn.split(' AS ');
            $('#sqlCol-' + splitSqlColByAs[0] + ' input[type=text]').val(splitSqlColByAs[1]);
            $('#sqlCol-' + splitSqlColByAs[0] + ' input[type=checkbox]').prop("checked", true);
            $('#sqlCol-' + splitSqlColByAs[0]).addClass("editableSqlCol");

        } else {
            $('#sqlCol-' + getCacheColumn + ' input[type=text]').val(getCacheColumn);
            $('#sqlCol-' + getCacheColumn + ' input[type=checkbox]').prop("checked", true);
            $('#sqlCol-' + getCacheColumn).addClass("editableSqlCol");
        }
    }
    restoreWhereConditionOnEdit();
    //buildSQLQuery();
}

function addQueryObjects(dataLabel) {
    $('#dataObjectHolder').append('<li data-value="' + dataLabel + '"><i class="fas fa-caret-right"></i>' + dataLabel + '</li>');
}

function addQueryColumns(dataLabel, dataType) {
    $('#dataColumnHolder').append('<div id="sqlCol-' + dataLabel + '" data-type="' + dataType + '" data-label="' + dataLabel + '" class="winQueryColumnItem"><input type="checkbox" id="" value="' + dataLabel + '" onclick="addColumnToSqlQuery(\'' + dataLabel + '\', this);" />' + dataLabel + '<a href="#" class="editSqlColumnName"><i class="fas fa-pen"></i></a><div class="frmSqlColumnEdit">display as <input type="text" value="' + dataLabel + '" onkeyup="editSqlColumnName(\'' + dataLabel + '\',this);" /></div></div>');
}

function saveAndAddCondition() {
    //debugger;
    var _dataConditionValue;
    var dataColumn = sqlCurrentColumnName;
    var dataCondition = $('#txtSqlCondition').val();
    var dataConditionValue = $('#txtSqlConditionValue').val();
    _dataConditionValue = dataConditionValue.replace("-", "/");//This line of code by Abhijit B. On 15 March 2022. For Change date format.Example 2022-02-24 to 2022/02/24
    _dataConditionValue = _dataConditionValue.replace("-", "/");//This line of code by Abhijit B. On 15 March 2022.
    dataConditionValue = _dataConditionValue;
    //if (checkIsValidSqlCondition()) {
    sqlConditionGroupCounter = sqlConditionGroupCounter + 1;
    var dataConditionJoin = 'qb-' + sqlConditionGroupCounter;
    // addQueryCondition(dataColumn, dataCondition, dataConditionValue, dataConditionJoin, sqlCurrentColumnType);
    $('#dataConditionHolder').append('<div style="background-color: yellow;" class="row qbRow' + sqlConditionGroupCounter + '" data-column="' + dataColumn + '" data-condition="' + dataCondition + '" data-conditionvalue="' + dataConditionValue + '" data-join="' + dataConditionJoin + '" data-columntype="' + sqlCurrentColumnType + '"><div class="col-md-3">' + dataColumn + '</div><div class="col-md-3">' + dataCondition + '</div><div class="col-md-3">' + dataConditionValue + '</div><div class="col-md-3 sqlBtnConditionAction"><a href="#"><i class="fas fa-pencil-alt"></i></a> | <a href="#" onclick="deleteSqlCondition(\'qbRow' + sqlConditionGroupCounter + '\', this);"><i class="fas fa-trash-alt"></i></a></div></div>');
    $("#dataConditionHolder").sortable({
        update: function (event, ui) {
            buildSQLQuery();
        }
    });
    $("#dataConditionHolder").disableSelection();
    buildSQLQuery();
    //}  
}

$(document).ready(function () {
    //loadQueryObjects();
});

function restoreWhereConditionOnEdit() {
    var cacheWhereCondition = $('#hdnHtmlWhereObj').val();
    if (cacheWhereCondition.trim() != '') {
        var breakWhereConByRules = cacheWhereCondition.split('[R]');
        for (i = 0; i < breakWhereConByRules.length; i++) {
            var breakRuleBySep = breakWhereConByRules[i].split('[S]');
            var getDataColumn = breakRuleBySep[0];
            var getDataCondition = breakRuleBySep[1];
            var getDataConditionValue = breakRuleBySep[2];
            var getDataJoin = breakRuleBySep[3];
            var getDataColumnType = breakRuleBySep[4];

            sqlConditionGroupCounter = sqlConditionGroupCounter + 1;
            if (getDataColumn == 'QBuilderGrpCondition') {
                $('#dataConditionHolder').append('<div class="row qbRow' + sqlConditionGroupCounter + '"  data-column="' + getDataColumn + '" data-condition="' + getDataCondition + '" data-conditionvalue="' + getDataConditionValue + '" data-join="' + getDataJoin + '" data-columntype="' + getDataColumnType + '"><div class="col-md-9 sqlGrpBrCondition">' + getDataCondition + '</div><div class="col-md-3 sqlGrpBrCondition sqlBtnConditionAction"><a href="#"><i class="fas fa-pencil-alt"></i></a> | <a href="#" onclick="deleteSqlCondition(\'qbRow' + sqlConditionGroupCounter + '\', this);"><i class="fas fa-trash-alt"></i></a></div></div>');
            } else {
                $('#dataConditionHolder').append('<div class="row qbRow' + sqlConditionGroupCounter + '" data-column="' + getDataColumn + '" data-condition="' + getDataCondition + '" data-conditionvalue="' + getDataConditionValue + '" data-join="' + getDataJoin + '" data-columntype="' + getDataColumnType + '"><div class="col-md-3">' + getDataColumn + '</div><div class="col-md-3">' + getDataCondition + '</div><div class="col-md-3">' + getDataConditionValue + '</div><div class="col-md-3 sqlBtnConditionAction"><a href="#"><i class="fas fa-pencil-alt"></i></a> | <a href="#" onclick="deleteSqlCondition(\'qbRow' + sqlConditionGroupCounter + '\', this);"><i class="fas fa-trash-alt"></i></a></div></div>');
            }
        }
        $("#dataConditionHolder").sortable({
            update: function (event, ui) {
                buildSQLQuery();
            }
        });
        $("#dataConditionHolder").disableSelection();
    }
    buildSQLQuery();
}

function getSqlWhereCondition() {
    // debugger;
    var currentWhereStatement = '';
    var sqlArrLen = $('#dataConditionHolder .row').length;
    // document.title = sqlArrLen;
    if (sqlArrLen > 0) {
        var qbCnt = 0;
        var getHdnWhereVal = '';
        $('#dataConditionHolder .row').each(function () {
            // data-column="QBuilderGrpCondition" data-condition="AND" data-conditionvalue="qb-1" data-join="qb-1" data-columntype="qb-operator"
            var getDataColumn = $(this).data('column');
            var getDataCondition = $(this).data('condition');
            var getDataConditionValue = $(this).data('conditionvalue');
            var getDataJoin = $(this).data('join');
            var getDataColumnType = $(this).data('columntype');
            var getHdnWhereObj = getDataColumn + '[S]' + getDataCondition + '[S]' + getDataConditionValue + '[S]' + getDataJoin + '[S]' + getDataColumnType;
            if (getHdnWhereVal.trim() == '') {
                getHdnWhereVal += getHdnWhereObj;
            } else {
                getHdnWhereVal += "[R]" + getHdnWhereObj;
            }
            //   alert(getHdnWhereVal);
            $('#hdnHtmlWhereObj').val(getHdnWhereVal);

            var currentSqlWhereArr = [getDataColumn, getDataCondition, getDataConditionValue, getDataJoin, getDataColumnType];
            var getColumnDataType = currentSqlWhereArr[4];
            var constructWhere = '';
            if (getColumnDataType != 'operator') {
                if (getColumnDataType == "int" || getColumnDataType == "bigint" || getColumnDataType == "tinyint" || getColumnDataType == "smallint" || getColumnDataType == "decimal" || getColumnDataType == "numeric") {
                    constructWhere = currentSqlWhereArr[0] + ' ' + currentSqlWhereArr[1] + ' ' + currentSqlWhereArr[2];
                }
                //Below code by Abhijit B. On 14 March 2022.For change sql "2022/02/24" to "cast(POdate as date)=cast('2022/02/24' as date)" --START--
                else if (getColumnDataType == "datetime") {
                    constructWhere = 'cast(' + currentSqlWhereArr[0] + ' as date) ' + currentSqlWhereArr[1] + ' cast(' + "'" + currentSqlWhereArr[2] + "'" + ' as date)';
                }
                //--END--

                else {
                    var getQueryOperator = currentSqlWhereArr[1];
                    if (getQueryOperator == 'LIKE' || getQueryOperator == 'NOT LIKE') {
                        constructWhere = currentSqlWhereArr[0] + ' ' + currentSqlWhereArr[1] + ' \'%' + currentSqlWhereArr[2] + '%\'';
                    } else {
                        constructWhere = currentSqlWhereArr[0] + ' ' + currentSqlWhereArr[1] + ' \'' + currentSqlWhereArr[2] + '\'';
                    }
                }
            }
            // var constructWhere = currentSqlWhereArr[0] + ' ' + currentSqlWhereArr[1] + ' ' + currentSqlWhereArr[2];
            if (currentSqlWhereArr[0] == 'QBuilderGrpCondition') {
                constructWhere = currentSqlWhereArr[1];
            }
            if (qbCnt == 0) {
                currentWhereStatement += ' ' + 'WHERE ' + constructWhere;
            } else {
                currentWhereStatement += ' ' + constructWhere;
            }
            qbCnt = qbCnt + 1;
        });
    }
    return currentWhereStatement;
}

function getSqlSelectedColumns() {
    var selectedColumns = '';
    var sqlArrLen = $('.winQueryColumnItem').length;
    var sqlSelectedColumn = $('#dataColumnHolder input[type=checkbox]').filter(":checked").length;
    if (sqlSelectedColumn > 0) {
        var qbCnt = 0;
        $('.winQueryColumnItem').each(function () {
            var getColumnId = $(this).attr('id');
            var isQueryCheckboxChecked = $('#' + getColumnId + ' input[type=checkbox]').prop('checked');
            if (isQueryCheckboxChecked) {
                var modifiedSqlColName = $('#' + getColumnId + ' input[type=text]').val();
                var originalSqlColName = $('#' + getColumnId + ' input[type=checkbox]').val();
                var finalSqlColName = originalSqlColName;

                if (modifiedSqlColName.trim() != originalSqlColName.trim()) {
                    finalSqlColName = originalSqlColName + ' AS ' + modifiedSqlColName;
                }

                if (qbCnt == 0) {
                    selectedColumns += finalSqlColName;
                } else {
                    selectedColumns += ', ' + finalSqlColName;
                }
                qbCnt = qbCnt + 1;
            }
        });
    } else {
        selectedColumns = '*';
    }
    return selectedColumns;
}

function buildSQLQuery() {
    sqlFinalQuery = "Select " + getSqlSelectedColumns() + " from " + sqlTableName + getSqlWhereCondition();
    $('#hdnSQLQueryText').val(sqlFinalQuery);
    $('#lblSQLQueryText').html(sqlFinalQuery);
}

function addColumnToSqlQuery(dataLabel, getCheckBox) {
    //debugger
    if (getCheckBox.checked) {
        $('#sqlCol-' + dataLabel).addClass('editableSqlCol');
        $('#sqlCol-' + dataLabel + ' input').val(dataLabel);
        $('#txtSqlConditionColumn').html(dataLabel);
    } else {
        $('#sqlCol-' + dataLabel).removeClass('editableSqlCol');
    }
    buildSQLQuery();
}

function editSqlColumnName(dataLabel, txtdisplayAs) {
    // var findColumnIndex = sqlColumnNames.indexOf(dataLabel);n
    // sqlColumnDisplayAs[findColumnIndex] = txtdisplayAs.value;
    buildSQLQuery();
}

function deleteSqlCondition(conditionToDelete) {
    $('#dataConditionHolder .' + conditionToDelete).remove();
    buildSQLQuery();
}

function fnQBKeepNumberOnly(inputObj) {
    var getObjNumber = inputObj.value;
    var chkIsNumber = getObjNumber.trim() / 1;
    while (chkIsNumber != getObjNumber.trim()) {
        var qbNewInputVal = inputObj.value;
        inputObj.value = qbNewInputVal.substring(0, (qbNewInputVal.length - 1));
        getObjNumber = inputObj.value;
        chkIsNumber = getObjNumber.trim() / 1;
    }
}

function fnQBCheckIfValidNumericInput(inputObj, isIntegerOnly) {
    var getObjNumber = inputObj.value;
    var chkIsNumber = getObjNumber.trim() / 1;
    if ((!isIntegerOnly) && (getObjNumber.trim() == '.')) {
        inputObj.value = "0.";
    } else if (isIntegerOnly && (getObjNumber.indexOf('.') > -1) && chkIsNumber == getObjNumber.trim()) {
        //  showAlert('Decimal input is not allowed', 'Error', '#');
        inputObj.value = getObjNumber.replace('.', '');
    } else if (chkIsNumber != getObjNumber.trim()) {
        // showAlert('Enter valid numeric value', 'Error', '#');        
        fnQBKeepNumberOnly(inputObj);
        //alert('Please enter number only');s
    }
    //alert(chkIsNumber);
}

function changeSqlControlType() {
    $("#txtSqlConditionValue").datepicker("destroy");
    if (sqlCurrentColumnType == "int" || sqlCurrentColumnType == "bigint" || sqlCurrentColumnType == "tinyint" || sqlCurrentColumnType == "smallint") {
        //  $('#txtSqlConditionValue').attr('type', 'number');
        $('#txtSqlConditionValue').attr('onkeyup', 'fnQBCheckIfValidNumericInput(this, true);');
        $('#txtSqlConditionValue').attr('onkeydown', 'return true;');
        $('#txtSqlConditionValue').attr('placeholder', '0-9 Only');
    } else if (sqlCurrentColumnType == "decimal" || sqlCurrentColumnType == "numeric") {
        //  $('#txtSqlConditionValue').attr('type', 'number');
        $('#txtSqlConditionValue').attr('onkeyup', 'fnQBCheckIfValidNumericInput(this, false);');
        $('#txtSqlConditionValue').attr('onkeydown', 'return true;');
        $('#txtSqlConditionValue').attr('placeholder', '0-9 and " . " Only');
    } else if (sqlCurrentColumnType == "date" || sqlCurrentColumnType == "datetime") {
        $('#txtSqlConditionValue').attr('placeholder', 'YYYY-MM-DD');
        $("#txtSqlConditionValue").datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('#txtSqlConditionValue').attr('onkeyup', 'return false;');
        $('#txtSqlConditionValue').attr('onkeydown', 'return false;');
        //$('#txtSqlConditionValue').attr('type', 'date');
    } else if (sqlCurrentColumnType == "time") {
        $('#txtSqlConditionValue').attr('placeholder', '00:00');
        $('#txtSqlConditionValue').attr('onkeyup', 'return true;');
        $('#txtSqlConditionValue').attr('onkeydown', 'return true;');
        //   $('#txtSqlConditionValue').attr('type', 'time');
    } else {
        $('#txtSqlConditionValue').attr('placeholder', '');
        $('#txtSqlConditionValue').attr('onkeyup', 'return true;');
        $('#txtSqlConditionValue').attr('onkeydown', 'return true;');
        //   $('#txtSqlConditionValue').attr('type', 'text');
    }
}

function validateSqlDataInput(dataInput) {
    var isValidSqlDataInput = true;
    return isValidSqlDataInput;
}

function addSqlGroupCondition() {
    //debugger
    var getGroupBracketIndex = txtSqlGroupBrackets.selectedIndex;
    var getGroupBracketValue = txtSqlGroupBrackets.value;
    if (getGroupBracketIndex > 0) {
        sqlConditionGroupCounter = sqlConditionGroupCounter + 1;
        // addQueryCondition('QBuilderGrpCondition', getGroupBracketValue, 'qb-' + sqlConditionGroupCounter, 'qb-' + sqlConditionGroupCounter, 'qb-operator');
        $('#dataConditionHolder').append('<div id="" class="row qbRow' + sqlConditionGroupCounter + '"  data-column="QBuilderGrpCondition" data-condition="' + getGroupBracketValue + '" data-conditionvalue="qb-' + sqlConditionGroupCounter + '" data-join="qb-' + sqlConditionGroupCounter + '" data-columntype="qb-operator"><div class="col-md-9 sqlGrpBrCondition">' + getGroupBracketValue + '</div><div class="col-md-3 sqlGrpBrCondition sqlBtnConditionAction"><a href="#"><i class="fas fa-pencil-alt"></i></a> | <a href="#" onclick="deleteSqlCondition(\'qbRow' + sqlConditionGroupCounter + '\', this);"><i class="fas fa-trash-alt"></i></a></div></div>');
        buildSQLQuery();
    } else {
        //showAlert('Please select Group Bracket to insert', 'Error', '#');
    }
}

function closeSqlQueryPopup() {
    $('#iframeSqlQueryResult').attr('src', '');
    $('.themeWmsSqlQueryPopup').attr('style', 'display:none;');
    event.stopImmediatePropagation();
    return false;
}
function validateQueryTitle() {
    var getCurrentQueryTitle = $('#txtShortcutTitle').val();
    if (getCurrentQueryTitle != '') {
        return true;
    } else {
        // showAlert('Please enter Query Title!!', 'Error', '#');
        return false;
    }
}

function closeSqlQueryTitlePopup() {
    $('#themeQueryBuilderTitlePopup').css('display', 'none');
    var getSqlId = $('#hdnQueryId').val();
    if (getSqlId.trim() == '' || getSqlId.trim() == '0') {
        $('#txtShortcutTitle').val('');
    }
}

function getSelectedDaysOfWeek() {
    var finalDaysOfWeek = '';
    $('.queryBuilderScheduleDay div').each(function () {
        var isCurrentItemSelected = $(this).data('isselected');
        if (isCurrentItemSelected == 'yes') {
            finalDaysOfWeek += $(this).data('value') + ':';
        }
    });
    return finalDaysOfWeek;
}

function resetQueryNotificationPopup(getQueryId, notificationId) {
    $('.queryBuilderScheduleDay div').unbind();
    $('.queryBuilderScheduleWeek div').unbind();
    $('.queryBuilderScheduleInterval div').unbind();

    $('.queryBuilderScheduleInterval div').removeClass('qbInteralSelected');
    $('.queryBuilderScheduleInterval div:first-child').addClass('qbInteralSelected');

    $('#qbDDListHH').val('--HH--');
    $('#qbDDListMM').val('--MM--');
    $('#qbDDListAMPM').val('AM');
    $('#qbDDListDate').val('--Select Date--');

    $('.queryBuilderScheduleWeek div i').attr('class', 'far fa-circle');
    $('.queryBuilderScheduleWeek div').data('isselected', 'no');
    $('.queryBuilderScheduleWeek div:first-child i').attr('class', 'far fa-dot-circle');
    $('.queryBuilderScheduleWeek div:first-child').data('isselected', 'yes');

    $('#divDayOfWeek').css('display', '');
    //$('#divDayOfWeek').css('display', 'none');
    $('#divDayOfMonth').css('display', 'none');
    $('#divQbCalendarDate').css('display', 'none');

    $('.queryBuilderScheduleDay i').attr('class', 'fas fa-check-square');
    $('.queryBuilderScheduleDay div').data('isselected', 'yes');

    $('#txtQueryNotificationTitle').val('');
    $('#txtQueryNotificationMessage').val('');
    $('#txtQueryNotificationTo').val('');
    $('#hdnQueryIdForNotification').val(getQueryId);
    $('#hdnNotificationId').val(notificationId);
    $('#hdnQueryInterval').val('DAILY');
    $('#hdnQuerySendAt').val('');
    $('#hdnQueryDayOfWeek').val(getSelectedDaysOfWeek());
    $('#hdnQueryDayOfMonth').val('');
}

function openSqlQueryNotificationPopup(queryObj) {
    var getQueryId = $(queryObj).data('queryid');
    var notificationId = $(queryObj).data('notificationid');
    //  alert('Notification ID: ' + notificationId);
    //var notificationId = $('#hdnNotificationId').val();
    if (notificationId == '0') {
        resetQueryNotificationPopup(getQueryId, notificationId);
        $('#hdnQueryIdForNotification').val(getQueryId);
    }

    $('#themeQueryBuilderSetNotification').css('display', 'block');
    $('.queryBuilderScheduleDay div').click(function (e) {
        var getInterval = $('#hdnQueryInterval').val();
        if (getInterval == 'WEEKLY') {
            $('.queryBuilderScheduleDay i').attr('class', 'far fa-check-square');
            $('.queryBuilderScheduleDay div').data('isselected', 'no');
        }
        var checkIsSelected = $(this).data('isselected');
        var getHdnQueryDayOfWeek = $('#hdnQueryDayOfWeek').val();
        // var updatedHdnQueryDayOfWeek = '';
        // var currentScheduleDayVal = $(this).data('value');
        if (checkIsSelected == 'yes') {
            $(this).data('isselected', 'no');
            $(this).find('i').attr('class', 'far fa-check-square');
            //if (getHdnQueryDayOfWeek.indexOf(currentScheduleDayVal) > -1) {
            //    updatedHdnQueryDayOfWeek = getHdnQueryDayOfWeek.replace(currentScheduleDayVal + ':', '');
            //    $('#hdnQueryDayOfWeek').val(updatedHdnQueryDayOfWeek);
            //}
        } else {
            $(this).data('isselected', 'yes');
            $(this).find('i').attr('class', 'fas fa-check-square');
            //if (getHdnQueryDayOfWeek.indexOf(currentScheduleDayVal) < 0) {
            //    updatedHdnQueryDayOfWeek = getHdnQueryDayOfWeek + currentScheduleDayVal + ':';
            //    $('#hdnQueryDayOfWeek').val(updatedHdnQueryDayOfWeek);
            //}
        }
        $('#hdnQueryDayOfWeek').val(getSelectedDaysOfWeek());
        // alert($('#hdnQueryDayOfWeek').val());
    });

    $('.queryBuilderScheduleWeek div').click(function (e) {
        var checkIsSelected = $(this).data('isselected');
        $('.queryBuilderScheduleWeek div i').attr('class', 'far fa-circle');
        $('.queryBuilderScheduleWeek div').data('isselected', 'no');
        $(this).data('isselected', 'yes');
        $(this).find('i').attr('class', 'far fa-dot-circle');
        var getDayOfMonth = $(this).data('value');
        $('#hdnQueryDayOfMonth').val(getDayOfMonth);
        if (getDayOfMonth == 'MidDayOfMonth') {
            $('#divQbCalendarDate').css('display', '');
        } else {
            $('#divQbCalendarDate').css('display', 'none');
        }
    });

    $('.queryBuilderScheduleInterval div').click(function (e) {
        $('.queryBuilderScheduleInterval div').removeClass('qbInteralSelected');
        $(this).addClass('qbInteralSelected');
        var getScheduleInterval = $(this).data('value');
        $('#hdnQueryInterval').val(getScheduleInterval);
        $(this).parent().data('value', getScheduleInterval);
        var getDayOfMonth = $('#hdnQueryDayOfMonth').val();
        // alert(getDayOfMonth);
        if (getScheduleInterval == 'DAILY') {
            $('#divDayOfWeek').css('display', '');
            // $('#divDayOfWeek').css('display', 'none');
            $('#divDayOfMonth').css('display', 'none');
            $('.queryBuilderScheduleDay i').attr('class', 'fas fa-check-square');
            $('.queryBuilderScheduleDay div').data('isselected', 'yes');
            $('#divQbCalendarDate').css('display', 'none');
            $('#hdnQueryDayOfWeek').val(getSelectedDaysOfWeek());
        } else if (getScheduleInterval == 'WEEKLY') {
            $('#divDayOfWeek').css('display', '');
            $('#divDayOfMonth').css('display', 'none');
            $('.queryBuilderScheduleDay i:first-child').attr('class', 'far fa-check-square');
            $('.queryBuilderScheduleDay div').data('isselected', 'no');
            $('#divQbCalendarDate').css('display', 'none');
            $('#hdnQueryDayOfWeek').val(getSelectedDaysOfWeek());
        } else if (getScheduleInterval == 'MONTHLY') {
            $('#divDayOfWeek').css('display', 'none');
            $('#divDayOfMonth').css('display', '');
            $('.queryBuilderScheduleDay i').attr('class', 'far fa-check-square');
            $('.queryBuilderScheduleDay div').data('isselected', 'no');
            if (getDayOfMonth == 'MidDayOfMonth') {
                $('#divQbCalendarDate').css('display', '');
            } else {
                $('#divQbCalendarDate').css('display', 'none');
            }
        }
    });
    return false;
}
function closeSqlQueryNotificationPopup() {
    $('#themeQueryBuilderSetNotification').css('display', 'none');
}

//New Changes

function updateFilterValue(getColumnId) {
    var getFilter = $('#selFl_' + getColumnId).val();
    var getFilterValue = $('#inFl_' + getColumnId).val();
    var getFilterValueA = $('#inFl1_' + getColumnId).val();
    var getFilterValueB = $('#inFl2_' + getColumnId).val();
    if (getFilter == 'In Between') {
        getFilterValue = getFilterValueA + '-' + getFilterValueB;
    }
    if ((getFilterValue != '') || (getFilterValue != '-')) {
        getPageNo = '1';
        callAPItoGetData(document.getElementById(qry_vr).value);
    }
}

function callAPItoGetData(filterquery) {
    //debugger;

    var whereFilterCondtion = getWhereFilterCondition();
    document.getElementById(hdnwhere_vr).value = whereFilterCondtion;
    //var qry =  document.getElementById(qry_vr).value;
    filterquery = filterquery.replace(/-/g, "'")
    document.getElementById(qry_vr).value = filterquery;
    $.ajax({
        type: "POST",
        url: "QueryBuilder.ashx",
        data: {
            'whereFilterCondtion': whereFilterCondtion,
            'query': filterquery
        },
        beforeSend: function () {
            showWMSThemeLoading();
        },
        success: function (data) {
            if (data.trim() != '') {
                $('#tblRecordHolder .tlbData').html('');
                $('#tblRecordHolder .tlbData').append(data);
                var getRecordMinWidth = $('#tempDataHolder').width();
                $('#tblRecordHolder thead').css('width', getRecordMinWidth + 'px');
                $('#tblRecordHolder tbody').css('width', getRecordMinWidth + 'px');
                //$('#tblRecordHolder tbody').css('display', 'table');
                // $('#tblRecordHolder tbody tr').css('display', 'table');
                // $('#tblRecordHolder tbody tr').css('width', getRecordMinWidth + 'px');
                //$('#tblRecordHolder thead').css('display', 'table');
                $('#tblRecordHolder tr:first-child td').each(function () {
                    var myIndex = $(this).index();
                    var getTdWidth = $(this).width();
                    $('#tblRecordHolder tr').find('td:eq(' + myIndex + ')').css('width', getTdWidth + 'px');
                });
                var getHeaderTrHeightA = $('#tblRecordHolder').find('tr:eq(0)').height();
                var getHeaderTrHeightB = $('#tblRecordHolder').find('tr:eq(1)').height();
                var totalHeaderHeight = getHeaderTrHeightA + getHeaderTrHeightB;
                //$('#tblRecordHolder thead').css('position', 'absolute');
                $('#tblRecordHolder tbody').css('margin-top', totalHeaderHeight + 'px');
                // $('#tblRecordHolder tbody').css('overflow-x', 'auto');
                // $('#tblRecordHolder tbody').css('overflow-y', 'hidden');
                // $('#tblRecordHolder tbody').css('height', '300px');
                //generatePageNo();
                // $('#tblRecordHolder .tlbData').append(data);
            }
            hideWMSThemeLoading();
        }
    });
}

function showWMSThemeLoading() {
    $('#themeWMSLoading').css('display', 'block');
}
function hideWMSThemeLoading() {
    $('#themeWMSLoading').css('display', 'none');
}

function getWhereFilterCondition() {
    var whereCondtion = '';
    var selectedColumns = '';
    var sqlArrLen = $('.reportFilterContent').length;
    if (sqlArrLen > 0) {
        var qbCnt = 0;
        $('.reportFilterContent').each(function () {
            // var getFilterId = $(this).attr('id').trim();
            var getColumnId = $(this).data('value').trim();
            var getColumnType = '';
            var getFilter = $('#selFl_' + getColumnId).val();
            var getFilterValue = $('#inFl_' + getColumnId).val();
            var getFilterValueA = $('#inFl1_' + getColumnId).val();
            var getFilterValueB = $('#inFl2_' + getColumnId).val();
            if (getFilter == 'In Between') {
                getFilterValue = getFilterValueA + '-' + getFilterValueB;
            }
            var isFilterValueRequires = 'yes';
            if (getFilter != "") {
                if ((getFilterValue != "") || ((getFilter == 'Is Null') || (getFilter == 'Is Not Null') || (getFilter == 'Is Empty') || (getFilter == 'Is Not Empty'))) {
                    if (qbCnt == 0) {
                        whereCondtion += '(' + getColumnId + ' ' + filterToOperator(getFilter, getFilterValue, getColumnType) + ')';
                    } else {
                        whereCondtion += ' AND (' + getColumnId + ' ' + filterToOperator(getFilter, getFilterValue, getColumnType) + ')';
                    }
                    qbCnt = qbCnt + 1;
                }
            }

        });
    } else {
        //  selectedColumns = '*';
    }
    return whereCondtion;
}

function filterToOperator(condition, conditionVal, columnType) {
    var operator = '';
    if (condition == 'No Filter') {
        operator = '';
    } else if (condition == 'Contains') {
        operator = 'LIKE \'%' + conditionVal + '%\'';
    } else if (condition == 'Does Not Contain') {
        operator = 'NOT LIKE \'%' + conditionVal + '%\'';
    } else if (condition == 'Starts With') {
        operator = 'LIKE \'' + conditionVal + '%\'';
    } else if (condition == 'Ends With') {
        operator = 'LIKE \'%' + conditionVal + '\'';
    } else if (condition == 'Equal To') {
        operator = '= \'' + conditionVal + '\'';
    } else if (condition == 'Not Equal To') {
        operator = '!= \'' + conditionVal + '\'';
    } else if (condition == 'In Between') {
        var getInBetweenVal = conditionVal.split('-');
        operator = 'BETWEEN  \'' + getInBetweenVal[0] + '\' AND \'' + getInBetweenVal[1] + '\'';
    } else if (condition == 'Smaller Than') {
        operator = '< \'' + conditionVal + '\'';
    } else if (condition == 'Greater Than') {
        operator = '> \'' + conditionVal + '\'';
    } else if (condition == 'Smaller Than Or Equal To') {
        operator = '<= \'' + conditionVal + '\'';
    } else if (condition == 'Greater Than Or Equal To') {
        operator = '>= \'' + conditionVal + '\'';
    } else if (condition == 'Is Null') {
        operator = '= \'\'';
    } else if (condition == 'Is Not Null') {
        operator = '!= \'\'';
    } else if (condition == 'Is Empty') {
        operator = '= \'\'';
    } else if (condition == 'Is Not Empty') {
        operator = '!= \'\'';
    }
    return operator;
}

function updateFilter(columnName) {
    var getFilterValue = $('#selFl_' + columnName).val();
    //alert(getFilterValue);
    if (getFilterValue == 'In Between') {
        $('#inFl_' + columnName).hide();
        $('#inFl1_' + columnName).show();
        $('#inFl2_' + columnName).show();
    } else {
        $('#inFl_' + columnName).show();
        $('#inFl1_' + columnName).hide();
        $('#inFl2_' + columnName).hide();
    }

}


function SaveQuery() {
    debugger;
    var apiPath = wmsApiPath + 'QueryBuilder/QuerySave';
    var getQuerytitle = $("#txtQueryTitle").val();
    //var getwherecondition = $("#txtopenquery").html();
    var getobjectName = $("#txtobjectName").text();
    var getSqlQuery = $("#txtopenquery").html()

    var postData =
    {

        SqlQuery: getSqlQuery,
        titleName: getQuerytitle,
        QueryId: globalQueryId,
        UserId: UserId,
        RoleID: getRoleId,
        CustomerID: CustomerId,
        CompanyID: CompanyId,
        warehouseID: WarehouseId
    };

    callHttpUrl(apiPath, postData, function (data) {
        var isSuccess = data.Status;
        var getsavequeryresult = data.Result;
        if (isSuccess == 200) {
            var returvnmsg = getsavequeryresult.Table[0].result;
            if (returvnmsg == "success") {

                alert('Query Saved Successfully!!');
                $("#txtQueryTitle").val("");
                getQueryBuilderList();

            }
            else {
                alert(returvnmsg);
            }

        }
        else {
            alert('Error Occured!!');
        }
    });

}

function flagQuery(getQueryId, flagobj) {
    getFlag = $(flagobj).attr('data-flag');
    var getfflag = '';
    //debugger;
    var apiPath = wmsApiPath + 'QueryBuilder/QueryFlag';

    if (getFlag == 'Private') {
        getfflag = 'Public';
    }
    else if (getFlag == 'Public') {
        getfflag = 'Private';
    }
    var postData =
    {
        UserID: UserId,
        RoleID: getRoleId,
        CustomerID: CustomerId,
        CompanyID: CompanyId,
        WarehouseID: WarehouseId,
        QueryID: getQueryId,
        Flag: getfflag
    };

    callHttpUrl(apiPath, postData, function (data) {
        var isSuccess = data.Status;
        var getsavequeryresult = data.Result;
        if (isSuccess == 200) {
            var returvnmsg = getsavequeryresult.Table[0].result;
            if (returvnmsg == "success") {
                if (getFlag == 'Private') {
                    $(flagobj).attr('data-flag', 'Public');
                    $(flagobj).html('<i class="fas fa-users"></i>');
                }
                else if (getFlag == 'Public') {
                    $(flagobj).attr('data-flag', 'Private');
                    $(flagobj).html('<i class="fas fa-user-lock" style="color: var(--wms-color-primary);"></i>');
                }


            }
            else {
                alert(returvnmsg);
            }

        }
        else {
            alert('Error Occured!!');
        }
    });

}

function QueryBuilderNotification(getQueryId) {
    //debugger;
    var apiPath = wmsApiPath + 'QueryBuilder/Exec';
    var postData =
    {
        "CustomerID": CustomerId,
        "CompanyID": CompanyId,
        "UserID": UserId,
        "RoleID": getRoleId,
        "QueryID": getQueryId,
        "WarehouseID": WarehouseId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var popup = data.Result.Table;
        if (getStatus == 200) {
            getQueryId = popup[0].QueryId;
            getquerytitle = popup[0].querytitle;
            getQueryObjectName = popup[0].QueryObjectName;

            $('#queryIDnotification').val(getQueryId);
            $('#querybuildertitle').val(getquerytitle);
            $('#querybuilderObject').val(getQueryObjectName);
            loadQueryObjects();
        }
        else {
            alert('Unable to connect Server!!');
        }

    });

}