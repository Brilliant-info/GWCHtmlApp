

//var apiFolder = 'http://173.212.244.46/WebAPITest/';
//var apiFolder = 'http://localhost:50068/';
//var wmsApiPath = apiFolder + 'api/staging/v1/';

var strCurrentPage = '1'; //paging var declare
var getTotalRecords = '100'; ////paging var declare
var searchfilter = "0";
var searchvalue = "0";
var getClientId = "";
var globalClientID = "0";
var getClientName;
var companyid = mBrillWmsSession.getCompanyId();
var getUserId = mBrillWmsSession.getUserId();
var CustomerID = mBrillWmsSession.getCustomerId();
var WarehouseID = $('#ddlwarehouse').val();
var getClientCode;
var getLedgerNo;
var getWebsite;
var getClient = "0";
var ClGroupCode;
var SAPCode;

var ObjectClientPara = "Client";
function initClientMaster() {

    ClientList(strCurrentPage, searchfilter, searchvalue)
}
function clearSearchFilter() {
    $('#drop-down-search').val('ALL');
    $('#text-value-search').val('');
    ClientList(strCurrentPage, searchfilter, searchvalue);
}
function ClientList(strCurrentPage, searchfilter, searchvalue) {
    debugger;
    //var apiPath = wmsApiPath + 'Client/GetClientList';
    var apiPath = wmsApiPath + 'Client/GetClientList';

    var searchfilter = $("#drop-down-search").val();
    var searchvalue = $("#text-value-search").val();

    // var strCurrentPage = '1';

    if (searchfilter == '0') {
        searchfilter = '0';
        searchvalue = '0';
    }
    debugger;

    var postData =
    {
        "CurrentPage": strCurrentPage, //paging var assign 
        "RecordLimit": getTotalRecords, ////paging var assign 
        "CustomerId": CustomerID,
        "UserID": getUserId,
        "Search": searchfilter,
        "Filter": searchvalue
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;

            var getTotalRecords = gridList.Table[0].TotalRecord;
            // alert (getTotalRecords);
            var strCurrentPage = gridList.Table[0].CurrentPage;
            $("#gridbind").html();
            var gridTable = "";

            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width:115px;text-align: center;">Client Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Client Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">SAP Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Email</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Contact No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">LedgerNo</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">GSTIN/UIN</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Category</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Active</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtclientname" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtclientcode" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddsapcode" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtEmailId" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" value="" class="wms-srv-grid-cell-input" onkeypress="javascript:return isPhNumber(event);" minlength =10 maxlength =10 id="txtContactNo"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" value="" class="wms-srv-grid-cell-input" id="txtledgerno"></div>';

            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtgstinuin" class="wms-srv-grid-cell-input"></div>';

            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<select  class="wms-srv-grid-cell-input" id="ddlCategoryList">';
            gridTable = gridTable + '</select>';
            gridTable = gridTable + '</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input class="wms-srv-grid-cell-input" type="checkbox" id="myCheck1" checked="True" value=""></div>';;
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action">';
            gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveNewClient();"><i class="fas fa-check-circle" style="color:black !important" ></i></a>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < gridList.Table1.length; i++) {
                var getClientID = gridList.Table1[i].MID;
                var getClientName = gridList.Table1[i].Name;
                var getClientCode = gridList.Table1[i].Code;
                var getSAPCode = gridList.Table1[i].SAPCode;
                var getClGroupCode = gridList.Table1[i].ClGroupCode;
                var getLedgerNo = gridList.Table1[i].Ledgerno;
                var getClientContactNo = gridList.Table1[i].ClientContactNo;
                var getClientEmail = gridList.Table1[i].ClientEmail;
                var getgstinuin = gridList.Table1[i].GSTINUIN;
                var getClientcategory = gridList.Table1[i].Category;

                var getActive = gridList.Table1[i].Active;

                //var getAction = gridList.Table.Action;

                //  GRID ROW

                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getClientID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getClientName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getClientCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSAPCode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getClientEmail + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getClientContactNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getLedgerNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getgstinuin + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getClientcategory + "</div>";

                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActive + "</div>";

                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ClientEditGrid(\'' + getClientID + '\',\'' + getClientName + '\',\'' + getClientCode + '\',\'' + getSAPCode + '\',\'' + getClientEmail + '\',\'' + getClientContactNo + '\',\'' + getClGroupCode + '\',\'' + getLedgerNo + '\',\'' + getWebsite + '\',\'' + getActive + '\',\'' + getClientcategory + '\',\'' + getgstinuin + '\')";></i></a><div class="wms-srv-action-sep"> | </div>';
                //gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ClientEditGrid(\'' + getClientID + '\',\'' + getClientName + '\',\'' + getClientCode + '\',\'' + getSAPCode + '\',\''+getClientEmail+'\',\''+getClientContactNo+'\',\'' + getClGroupCode + '\',\'' + getLedgerNo + '\',\'' + getWebsite + '\',\'' + getActive + '\')";></i></a><div class="wms-srv-action-sep"> | </div>';
                //
                //gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ClientEditGrid()";></i></a><div class="wms-srv-action-sep">|</div>';
                gridTable = gridTable + '<i class="fas fa-code" title="Parameter" onclick="openparameterPopup(' + getClientID + ')" ></i></a>  <div class="wms-srv-action-sep"> | </div>';
                gridTable = gridTable + '<i class="fas fa-user-plus" title="Contact Info" onclick="openContactPopUp(' + getClientID + ')"></i></a>';

                // gridTable = gridTable + '<i class="fas fa-receipt" title="Bank Details" onclick="openBankDetailsPopUp(' + getClientID + ')"></i></a>';

                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                //gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';

            }
            $("#gridbind").html(gridTable);
            GetCategoryList(); // added by suraj khopade
            setupGridPagingList('paging-client', strCurrentPage, getTotalRecords, ClientList);
        }

    });
}

var spnCategoryValue = [];
var spnCategoryId = [];


function GetCategoryList() {
    debugger;
    // var apiPath = wmsApiPath + 'User/GetCategoryList'; 

    var apiPath = wmsApiPath + 'Client/BindClientCategory';
    //var apiPath =  'http://localhost:50068/api/staging/v1/Client/BindClientCategory';
    var postData = {
        "CompanyId": companyid,
        "UserId": getUserId,
        "CustomerId": CustomerID,
        "WarehouseId": WarehouseID
    };
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnCategoryValue = [];
            spnCategoryId = [];
            // $("#ddlCategoryList").html('<option >--Select--</option>');
            spnCategoryValue.push('--Select List--');
            spnCategoryId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            $("#ddlCategoryList").append('<option value = 0>--Select List--</option>');
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var typeId = grnContainerSize[i].ID;
                    var typevalue = grnContainerSize[i].Category;
                    spnCategoryValue.push(typevalue);
                    spnCategoryId.push(typeId);
                    $("#ddlCategoryList").append('<option value = "' + typeId + '">' + typevalue + '</option>');
                }
            }
        }
    });
}
function SearchClient() {
    searchfilter = $('#drop-down-search').val();
    searchvalue = $('#text-value-search').val();

    if (searchvalue == '0') {
        alert('Please Enter value for filter');
    }
    else {
        ClientList(strCurrentPage, searchfilter, searchvalue)

    }
    if (searchfilter == '' && searchvalue == '') {
        ClientList(strCurrentPage, searchfilter, searchvalue)
    }
}

// function SaveNewClient() {
//     debugger;
//     var getClient= globalClientID;
//     var apiPath = apipath + "Client/AddEditClient";
//     if (getClient == '0') {
//         var getClientName = $("#txtclientname").val();
//         var getClientcode = $("#txtclientcode").val();
//         var getSAPCode = $("#txtsapcode").val();
//         var getClGroupCode = $("#txtclgroupcode").val();
//         var getLedgerNo = $("#txtledgerno").val();
//         var getWebsite = $("#txtWebsite").val();

//         //	var getActive=$("#myCheck1").is(":checked");
//     }
//     //Edit Parameter
//     else {

//         var getClientName = $("#txtclientName").val();
//         var getClientcode = $("#txtclientCode").val();
//         var getSAPCode = $("#txtSAPCode").val();
//         var getClGroupCode = $("#txtCLGroupCode").val();
//         var getLedgerNo = $("#txtledgerNo").val();
//         var getWebsite = $("#txtwebsite").val();
//          // var getActive;
//         //	var getActive = $("#txtEditactive").is(":checked");
//     }

//     var postData =
//     {
//         "ClientId": "0",
//         "CompanyID": "1",
//         "CustomerId": "1",
//          "UserId": "1",
//         "ClientName": getClientName,
//         "ClientCode": getClientcode,
//         "SAPCode": getSAPCode,
//         "ClGroupCode": getClGroupCode,
//         "LedgerNo": getLedgerNo,
//         "Website": getWebsite,
//         "Sector": "lkk",
//         "Active": "Yes"
//     };

//     callHttpUrl(apiPath, postData, function (data) {
//         var getStatus = data.Status;
//         if (getStatus == 200) {
//             var myGridList = data.Result.Message;
//             alert('Record Save Success!!');
//            // ClientList("1", "0", "");
//             ClientList(strCurrentPage,searchfilter)
//         }
//     else{
//         alert('Unable to connect server !!')
//     }
//     });

// }

// function SaveNewClient() {
//     debugger;

//     var getClient = globalClientID;
//     if(validateClientSave(getClient) != false)	
// 	{

//     var apiPath = wmsApiPath + "Client/AddEditClient";
//     //var apiPath="http://localhost:50068/api/staging/v1/Client/AddEditClient";
//     var Active = 'No';
//     // Add New Client
//     if (getClient == '0') {
//         var getClientName = $("#txtclientname").val();
//         var getClientCode = $("#txtclientcode").val();
//         var getSAPCode = $("#txtAddsapcode").val();
//         var getClGroupCode = $("#txtAddClGroupcode").val();
//         var getLedgerNo = $("#txtledgerno").val();
//         var getWebsite = $("#txtWebsite").val();
//         var getClEmail = $("#txtEmailId").val();
//         var getClContactNo = $("#txtContactNo").val();
//         if ($('#myCheck1').is(':checked')) {
//             Active = 'Yes';
//         }
//     }

//     //Edit Existing Client
//     else {

//         var getClientName = $("#txtEditclientName").val();
//         var getClientCode = $("#txtEditclientCode").val();
//         var getSAPCode = $("#txtEditSAPCode").val();
//         var getClGroupCode = $("#txtEditCLGroupCode").val();
//         var getLedgerNo = $("#txtEditledgerNo").val();
//         var getWebsite = $("#txtEditwebsite").val();
//         var getClEmail = $("#txtEditEmailId").val();
//         var getClContactNo = $("#txtEditContactNo").val();

//         if ($('#txtEditactive').is(':checked')) {
//             Active = 'Yes';
//         }

//     }

//     var postData =
//     {
//         "ClientId": getClient,
//         "CompanyID": companyid,
//         "CustomerId": CustomerID, // $("#ddlcustomer").val();
//         "UserId": getUserId,
//         "ClientName": getClientName,
//         "ClientCode": getClientCode,
//         "Sector": "IT",
//         "LedgerNo": getLedgerNo,
//         "Website": '',
//         "Active": Active,
//         "SAPCode": getSAPCode,
//         "ClGroupCode": '',
//         "Email":getClEmail,
//         "ContactNo":getClContactNo
//     };

//     callHttpUrl(apiPath, postData, function (data) {
//         var getstatuscode = data.StatusCode;
//         var isSuccess = data.Status;
//         var getresult = data.Result;
//         if (isSuccess == 200) {
//             var returnmsg = getresult.Message;
//             if (returnmsg == "success") {
//                 if (getClient == '0') {
//                     alert('Client Saved Successfully!!');
//                 }
//                 else {
//                     alert('Client Updated Successfully!!');

//                 }
//                 ClientList(strCurrentPage, 0, 0);
//             }
//             else {
//                 alert(returnmsg);
//             }
//         }
//         else if (isSuccess == "300") {
//             var returnmsg = getresult.Message;
//             alert(returnmsg);
//         }
//         else {
//             alert("Client Save failed");
//         }
//         globalClientID="0";
//     });
//     }

// }


function SaveNewClient() {
    debugger;

    var getClient = globalClientID;
    if (validateClientSave(getClient) != false) {

        var apiPath = wmsApiPath + "Client/AddEditClient";
        //var apiPath="http://localhost:50068/api/staging/v1/Client/AddEditClient";
        var Active = 'No';
        // Add New Client
        if (getClient == '0') {
            var getClientName = $("#txtclientname").val();
            var getClientCode = $("#txtclientcode").val();
            var getSAPCode = $("#txtAddsapcode").val();
            var getClGroupCode = $("#txtAddClGroupcode").val();
            var getLedgerNo = $("#txtledgerno").val();
            var getWebsite = $("#txtWebsite").val();
            var getClEmail = $("#txtEmailId").val();
            var getClContactNo = $("#txtContactNo").val();

            var getGSTINUIN = $("#txtgstinuin").val();
            var getCategoryValue = $("#ddlCategoryList").val();

            if ($('#myCheck1').is(':checked')) {
                Active = 'Yes';
            }
        }

        //Edit Existing Client
        else {

            var getClientName = $("#txtEditclientName").val();
            var getClientCode = $("#txtEditclientCode").val();
            var getSAPCode = $("#txtEditSAPCode").val();
            var getClGroupCode = $("#txtEditCLGroupCode").val();
            var getLedgerNo = $("#txtEditledgerNo").val();
            var getWebsite = $("#txtEditwebsite").val();
            var getClEmail = $("#txtEditEmailId").val();
            var getClContactNo = $("#txtEditContactNo").val();

            var getGSTINUIN = $("#txtEditgstinuin").val();
            var getCategoryValue = $("#ddlCategoryList").val();


            if ($('#txtEditactive').is(':checked')) {
                Active = 'Yes';
            }

        }

        var postData =
        {
            "ClientId": getClient,
            "CompanyID": companyid,
            "CustomerId": CustomerID, // $("#ddlcustomer").val();
            "UserId": getUserId,
            "ClientName": getClientName,
            "ClientCode": getClientCode,
            "Sector": "IT",
            "LedgerNo": getLedgerNo,
            "Website": '',
            "Active": Active,
            "SAPCode": getSAPCode,
            "ClGroupCode": '',
            "Email": getClEmail,
            "ContactNo": getClContactNo,

            "GSTINUIN": getGSTINUIN,
            "CategoryId": getCategoryValue

        };

        callHttpUrl(apiPath, postData, function (data) {
            var getstatuscode = data.StatusCode;
            var isSuccess = data.Status;
            var getresult = data.Result;
            if (isSuccess == 200) {
                var returnmsg = getresult.Message;
                if (returnmsg == "success") {
                    if (getClient == '0') {
                        alert('Client Saved Successfully!!');
                    }
                    else {
                        alert('Client Updated Successfully!!');

                    }
                    ClientList(strCurrentPage, 0, 0);
                }
                else {
                    alert(returnmsg);
                }
            }
            else if (isSuccess == "300") {
                var returnmsg = getresult.Message;
                alert(returnmsg);
            }
            else {
                alert("Client Save failed");
                //globalClientID="0";
            }

        });
    }

}

function EditClient() {
    debugger;
    var apiPath = wmsApiPath + "EditClientDEtail";
    var postData =
    {
        "ID": "1"
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            var myGridList = data.Result.Table;


            ClientList(searchfilter, searchvalue)
        }
        else {
            alert('Unable to connect Server!!');
        }
    });

}


function ClientEditGrid(clienteditid, getClientName, getClientCode, getSAPCode, getEmail, getContact, getClGroupCode, getLedgerNo, getWebsite, getActive, getClientcategory, getgstinuin)
// var getClientName;
{
    globalClientID = clienteditid;
    debugger;
    //  alert('function call');

    var gridRow = '';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditclientName" class="wms-srv-grid-cell-input" value="' + getClientName + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditclientCode" class="wms-srv-grid-cell-input" value="' + getClientCode + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditSAPCode" class="wms-srv-grid-cell-input" value="' + getSAPCode + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditEmailId" class="wms-srv-grid-cell-input" value="' + getEmail + '"/></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditContactNo" class="wms-srv-grid-cell-input" value="' + getContact + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditledgerNo" class="wms-srv-grid-cell-input" value="' + getLedgerNo + '" /></div>';

    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditgstinuin" class="wms-srv-grid-cell-input" value="' + getgstinuin + '" /></div>';
    // gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditwebsite" class="wms-srv-grid-cell-input" value="' + getWebsite + '" /></div>';
    // gridRow = gridRow + '<select class="wms-srv-grid-cell-input" id="editWarehouseType"><option value="Standard" >Standard</option><option value="Virtual" >Virtual</option></select>';
    gridRow = gridRow + bindClientCategoryDropDown(getClientcategory);
    if (getActive == 'Yes') {
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditactive" class="wms-srv-grid-cell-input" value="' + getActive + '" checked="checked" /></div>';
    } else {
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditactive" class="wms-srv-grid-cell-input" value="' + getActive + '" /></div>';
    }


    gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><a href="#" title="Save" class="wms-srv-save" data-prefix="SV"> <i class="fas fa-check-circle" id="SaveClientParameter" onclick="SaveNewClient(\'' + clienteditid + '\')";></i></a><a href="#" title="cancel" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditClientHide(' + clienteditid + ')"></i></a></div></div>';

    $("#RowParameter" + clienteditid).html(gridRow);
}
function bindClientCategoryDropDown(getClientcategory) {
    debugger;
    //venodrGlbalID = UserID;
    var ddlVendortype = '';
    ddlVendortype = '<select class="wms-srv-grid-cell-input" id="ddlCategoryList">';  // txtEditUsertype'+ UserID +'"
    for (var i = 0; i < spnCategoryValue.length; i++) {
        if (spnCategoryValue[i] == getClientcategory) {
            ddlVendortype += '<option value = "' + spnCategoryId[i] + '" selected="selected">' + spnCategoryValue[i] + '</option>';
        } else {
            ddlVendortype += '<option value = "' + spnCategoryId[i] + '">' + spnCategoryValue[i] + '</option>';
        }
    }
    ddlVendortype += '</select>';
    return ddlVendortype;
}


function gridEditClientHide(clienteditid) {
    $("#RowParameter" + clienteditid).html('');
    ClientList(strCurrentPage, searchfilter, searchvalue);
}





// function SaveNewContact(ContactID) {
//     debugger;
//     var getContactid = ContactID;
//     var apiPath6 = apipath + "Contact/AddEditContact";
//     if (getContactid == '0') {
//         var getContactName = $("#txtcontactname").val();
//         var getEmailId = $("#txtemailid").val();
//         var getMobileNo = $("#txtmobileno").val();
//         var getWebsite = $("#Address").val();
//         var getWebsite = $("#txtcountry").val();
//         var getWebsite = $("#txtstate").val();
//         var getcity = $("#txtcity").val();
//         var getPostalcode=$("#txtpostalcode")
//         //	var getActive=$("#myCheck1").is(":checked");
//     }
//     //Edit Parameter
//     else {

//         var getContactName = $("#txtcontactname").val();
//         var getEmailId = $("#txtemailid").val();
//         var getMobileNo = $("#txtmobileno").val();
//         var getWebsite = $("#Address").val();
//         var getWebsite = $("#txtcountry").val();
//         var getWebsite = $("#txtstate").val();
//         var getcity = $("#txtcity").val();
//         var getPostalcode=$("#txtpostalcode");

//         //	var getActive = $("#txtEditactive").is(":checked");
//     }

//     var postData =
//     {
//         "ClientId": getClientId,
//         "CompanyID": "1",
//         "CustomerId": "1",
//         "UserId": "1",
//         "ClientName": getClientName,
//         "ClientCode": getClientcode,
//         "LedgerNo": getLedgerNo,
//         "Website": getWebsite,
//         "Sector": "lkk",
//         "Active": "Yes"
//     };

//     callHttpUrl(apiPath2, postData, function (data) {
//         var getStatus = data.Status;
//         if (getStatus == 200) {
//             var myGridList = data.Result.Message;
//             alert('Record Save Success!!');
//             //getclientList("1", "0", "");
//             ClientList(searchfilter, searchvalue)
//         }
//         else {
//             alert('Unable to connect Server!!');
//         }
//     });

// }

// function setupGridPagingClient(gridObjId, strCurrentPage, getTotalRecords, callBackFunction) { 
//     debugger;
//     var global_max_record_count = 10;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 10) + 1;
//     var recordTo = recordFrom + 9;
//     var totalRecord = Number(getTotalRecords);
//     var pagerLinks = '';

//     if (totalRecord < recordTo) {
//         recordTo = totalRecord;
//     }

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

//     /* Add Page linke for remaining record */
//     if (currentCounter >= totalRecord) {

//         if (lnkCounter == pageNo) {
//             pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//         } else {
//             pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//             lastPage = lnkCounter;
//         }
//         // Update last page count - 21 Sept 2021
//         this.global_last_page_no = lnkCounter;
//     }
//     /* Add Page linke for remaining record */
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left" title="First"></i></a>';
//     // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//     //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//     pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right" title="Last"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//     $('#paging-client .wms-srv-pager-links a').off();
//     $('#paging-client .wms-srv-pager-links a').click(function () {
//         var getDataPage = $(this).attr('data-page');
//         strCurrentPage = getDataPage;
//         if (callBackFunction != null) {
//             callBackFunction(getDataPage, searchfilter, searchvalue);
//         }
//     });

//     $('#paging-client a.wms-srv-pager-go').off();
//     $('#paging-client a.wms-srv-pager-go').click(function () {
//         var getDataPage = $('#paging-client input[name="txtGridPageNo"]').val();
//         strCurrentPage = getDataPage;
//         if (Number(getDataPage) < 1) {
//             alert('Please enter valid page number!!');
//         } else if (Number(getDataPage) > Number(lastPage)) {
//             alert('Please enter valid page number!!');
//         } else {
//             if (callBackFunction != null) {
//                 callBackFunction(getDataPage, searchfilter, searchvalue);
//             }
//         }
//     });
// }



function ValidateClient() {
    debugger;
    var getClientName = $("#txtclientname").val();
    var getClientcode = $("#txtclientcode").val();
    var getSAPCode = $("#txtAddsapcode").val();
    // var getClGroupCode = $("#txtCLGroupCode").val();
    // var getLedgerNo = $("#txtledgerno").val();
    var getwebsite = $("#txtWebsite").val();

    if (getClientName == "") {
        alert("Client Name can't be blank!");

    }
    else if (getClientcode == "") {
        alert("Client Code can't be blank!");

    }
    else if (getSAPCode == "") {
        alert("SAP Code can't be blank!");
    }
    else if (getwebsite == "") {
        alert("Website can't be blank!");
    }
    else {
        SaveNewClient();
    }
}


// function setupGridPagingwarehouse(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) {

//     var global_max_record_count = 10;
//     var pageNo = Number(strCurrentPage);
//     var recordFrom = ((pageNo - 1) * 10) + 1;
//     var recordTo = recordFrom + 9;
//     var totalRecord = Number(strTotalRecords);
//     var pagerLinks = '';

// if (totalRecord < recordTo) {
//     recordTo = totalRecord;
// }


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

//     // Add Page linke for remaining record 
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
//     // Add Page linke for remaining record 
//     var pagerNavLinks = '';
//     pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a>';
//     // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//     pagerNavLinks += pagerLinks;
//     //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//     pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right"></i></a>';

//     $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);

//     $('#paging-client .wms-srv-pager-links a').off();
//     $('#paging-client .wms-srv-pager-links a').click(function () {
//         var getDataPage = $(this).attr('data-page');
//         if (callBackFunction != null) {
//             callBackFunction(getDataPage);
//         }
//     });

//     $('#paging-client a.wms-srv-pager-go').off();
//     $('#paging-client a.wms-srv-pager-go').click(function () {
//         var getDataPage = $('#paging-client input[name="txtGridPageNo"]').val();
//         if (Number(getDataPage) < 1) {
//             alert('Please enter valid page number!!');
//         } else if (Number(getDataPage) > Number(lastPage)) {
//             alert('Page number should not be greater than ' + lastPage + ' !!');
//         } else {
//             if (callBackFunction != null) {
//                 callBackFunction(getDataPage, searchfilter, searchvalue);
//             }
//         }
//     });
// }



/*function ContactList(ClientID) {
    debugger;
    var beforeSVcontactid= 0;
    var apiPath = apiServerPath + 'Contact/ContactList';
    var postData =
    {
        "CurrentPage": "1",
        "RecordLimit": "10",
        "CompanyId": "1",
        "UserId": "1",
        "CustomerId": "1",
        "WarehouseId": "1",
        "Filter": "0",
        "Search": "0",
        "Object": "Client",
        "ObjectId": ClientID
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;
            $("#gridbind").html();
            var gridTable = "";

            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width:115px;text-align: center;">Contact Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Email id</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Mobile no</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Address</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Country</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">State</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">City</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Postal code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Active</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcontactname" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtemailid" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtmobileno" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddress" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcountry" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtstate" class="wms-srv-grid-cell-input"></div>';
          //  gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlAddCountry" onchange="print_state('+ddlState+' ,this.selectedIndex);" ><option value="">-- Select --</option><option value=""></option></select></div>';
          //  gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlState"><option value="">-- Select --</option><option value="State"></option></select></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcity" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtpostalcode" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input class="wms-srv-grid-cell-input" type="checkbox" id="myclientCheck1" checked="True" value=""></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action">';
            gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveContAddress('+ ClientID +','+ beforeSVcontactid +');"><i class="fas fa-check-circle" style="color:black !important" ></i></a>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < gridList.Table.length; i++) {
                var getContactID = gridList.Table[i].ID;
                var getContactName = gridList.Table[i].ContactName;
                var getEmailId = gridList.Table[i].EmailID;
                var getMobileNo = gridList.Table[i].MobileNo;
                var getAddress = gridList.Table[i].Address;
                var getCountry = gridList.Table[i].Country;
                var getState = gridList.Table[i].State;
                var getCity = gridList.Table[i].City;
                var getPostalCode = gridList.Table[i].PostalCode;
                var getActive = gridList.Table[i].Active;
                // var getAction = gridList.Table.Action;

                //  GRID ROW

                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="ParameterRow' + getContactID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getContactName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getEmailId + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getMobileNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAddress + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCountry + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getState + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCity + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPostalCode + "</div>";
               // gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCountry + "</div>"
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActive + "</div>"
                // gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAction + "</div>"
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ContactEditGrid(\'' + getContactID + '\',\'' + getContactName + '\',\'' + getEmailId + '\',\'' + getMobileNo + '\',\'' + getAddress + '\')";></i></a><div class="wms-srv-action-sep">|</div>';

                // gridTable = gridTable + '<i class="fas fa-edit" title="Edit" ></i></a><div class="wms-srv-action-sep">|</div>';
                // gridTable = gridTable + '<i class="fas fa-code" title="Parameter" ></i></a>  <div class="wms-srv-action-sep">|</div>';
                // gridTable = gridTable + '<i class="fas fa-user-plus" title="Contact Info" onclick="openContactPopUp();"></i></a>';

                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';

            }
            $("#contactgridbind").html(gridTable);
            // setupGridPagingwarehouse('paging-client', strCurrentPage, getTotalRecords, ClientList);
        }

    });
}*/




function setCountry(country, state) {
    var ddlCountry = document.getElementById("ddlCountry");

    ddlCountry.value = country;

    print_state('ddlState', ddlCountry.selectedIndex);

    ddlState = document.getElementById("ddlState");
    ddlState.value = state;

}



function showListEditWarehouseRow() {
    $('#wms-srv-edit-beforeclient').hide();
    $('#wms-srv-edit-client').show();
}

function hideListEditWarehouseRow() {
    $('#wms-srv-edit-beforeclient').show();
    $('#wms-srv-edit-client').hide();
}

function showEditWarehouseRow6() {
    $('#wms-srv-beforeedit-warehouse6').hide();
    $('#wms-srv-edit-warehouse6').show();
}
function hideEditWarehouseRow6() {
    $('#wms-srv-beforeedit-warehouse6').show();
    $('#wms-srv-edit-warehouse6').hide();
}

function validateClientSave(clientID) {
    var getClEmail = $("#txtEmailId").val();
    var getClContactNo = $("#txtContactNo").val();
    if (clientID == "0") {
        if (document.getElementById("txtclientname").value == "") {
            alert("Please add Client Name!");
            return false;
        }
        else if (document.getElementById("txtclientcode").value == "") {
            alert("Please add Client Code!");
            return false;
        }
        else if (document.getElementById("txtAddsapcode").value == "") {
            alert("Please add SAP Code!");
            return false;
        }

        else if (validateEmailID(getClEmail) == false) {
            // alert("Please Check Email Id");
            return false;
        }
        else if (getClContactNo == '') {
            alert("Please add ContactNo...!");
            return false;
        }
        else if (getClContactNo.length < 10) {
            alert("Please Enter 10 Digit ContactNo...!");
            return false;
        }
        else if (document.getElementById("txtledgerno").value == "") {
            alert("Please add LedgerNo!");
            return false;
        }
    }
}

function isPhNumber(evt) {
    var keyCode = (evt.which) ? evt.which : event.keyCode
    /* if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
 
     return true;*/

    if ((keyCode >= 48 && keyCode <= 57) || (keyCode == 8))
        return true;
    else if (keyCode == 43) {
        var curVal = document.activeElement.value;
        if (curVal != null && curVal.trim().indexOf('.') == -1)
            return true;
        else
            return false;
    }
    else
        return false;
}

function validateEmailID(getEmailObj) {
    var empt = getEmailObj;
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




// Start Client Parameter Code

function openparameterPopup(ClientID) {
    $('#wms-srv-Parameter-popup').show();
    $('#wms-srv-Parameter-popup-close').off();
    $('#wms-srv-Parameter-popup-close').click(function () {
        $('#wms-srv-Parameter-popup').hide();
    });

    GetClientParameterList(ClientID)
    BindddlClientParamName();
}

function GetClientParameterList(selectedClientid) {
    debugger;
    var state = 'Add';
    var statutorydetail = 0;
    globalClientID = selectedClientid;
    var apiPath = wmsApiPath + 'Client/GetObjectParameter';
    var postData =
    {
        "Object": ObjectClientPara,
        "ReferenceID": selectedClientid,
        "CompanyID": companyid,
        "CreatedBy": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
            var GetParalist = getresult.Table;
            var clientparamGrid = "";

            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-header">';
            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Parameter Name</div>';
            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Parameter Value</div>';
            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
            clientparamGrid = clientparamGrid + '</div>';

            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-row wms-align">';
            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell">';
            clientparamGrid = clientparamGrid + '<select  class="wms-srv-grid-cell-input" id="ddlclientparam">';
            clientparamGrid = clientparamGrid + '</select>';
            clientparamGrid = clientparamGrid + '</div>';
            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell">';
            clientparamGrid = clientparamGrid + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtparamvalue"></div>';
            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell">';
            clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-action">';
            clientparamGrid = clientparamGrid + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveClientParameter(\'' + state + '\',' + statutorydetail + ');">';
            clientparamGrid = clientparamGrid + '<i class="fas fa-check-circle"></i></a></div></div>';
            clientparamGrid = clientparamGrid + '</div>';

            for (var li = 0; li < GetParalist.length; li++) {
                var getReferenceID = GetParalist[li].ReferenceID;
                var getstatudetailid = GetParalist[li].stadetailid
                var Name = GetParalist[li].Name;
                var StatutoryValue = GetParalist[li].StatutoryValue;
                var ObjectName = GetParalist[li].ObjectName;


                clientparamGrid = clientparamGrid + '<div id="divparamlstrow_' + getstatudetailid + '" class="wms-srv-grid-row wms-align">';
                clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + Name + '</div>';
                clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell" style="text-align:center;">' + StatutoryValue + '</div>';
                clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-cell">';
                clientparamGrid = clientparamGrid + '<div class="wms-srv-grid-action">';
                clientparamGrid = clientparamGrid + '<a href="#" title="Edit" class="wms-srv-save" onclick="editparamGridDetails(' + getstatudetailid + ',' + getReferenceID + ',\'' + Name + '\',\'' + StatutoryValue + '\');"><i class="fas fa-edit"></i></a>';
                clientparamGrid = clientparamGrid + '</div>';
                clientparamGrid = clientparamGrid + '</div>';
                clientparamGrid = clientparamGrid + '</div>';
            }
            $('#grdparameter').html(clientparamGrid);
            BindddlClientParamName();
        }
        else {
            alert('Something went wrong.');
        }
    });

}

var spnparameter = [];
var spnparameterID = [];

function BindddlClientParamName() {
    debugger;
    var apiPath = wmsApiPath + 'Client/GetDdlObjParamValue';
    var postData = {
        "Object": ObjectClientPara,
        "CompanyID": companyid,
        "CreatedBy": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnparameter = [];
            spnparameterID = [];
            $("#ddlclientparam").html('<option >--Select--</option>');
            spnparameter.push('--Select--');
            spnparameterID.push('--Select--');
            var myParamList = data.Result;
            var ObjectParamList = myParamList.Table;
            if (ObjectParamList.length > 0) {
                for (var i = 0; i < ObjectParamList.length; i++) {
                    var typeId = ObjectParamList[i].ID;
                    var typevalue = ObjectParamList[i].Name;
                    spnparameter.push(typevalue);
                    spnparameterID.push(typeId);
                    $("#ddlclientparam").append('<option value = "' + typeId + '">' + typevalue + '</option>');
                }
            }
        }
    });
}


function bindObjectparamDDlEdit(UserID, UserType) {
    debugger;
    venodrGlbalID = UserID;
    var ddlparamvalue = '';
    ddlparamvalue = '<select class="wms-srv-grid-cell-input" id="txtEditUsertype">';  // txtEditUsertype'+ UserID +'"
    for (var i = 0; i < spnparameter.length; i++) {
        if (spnparameter[i] == UserType) {
            ddlparamvalue += '<option value = "' + spnparameterID[i] + '" selected="selected">' + spnparameter[i] + '</option>';
        } else {
            ddlparamvalue += '<option value = "' + spnparameterID[i] + '">' + spnparameter[i] + '</option>';
        }
    }
    ddlparamvalue += '</select>';
    return ddlparamvalue;
}


function editparamGridDetails(statudetailid, ReferenceID, paramName, ParamValue) {
    $("#editusergridValues").show();
    $("#beforeedituserGridValues").hide();
    paramClientEditGrid(statudetailid, ReferenceID, paramName, ParamValue);
}

function paramClientEditGrid(statudetailid, ReferenceID, paramName, ParamValue) {
    debugger;
    //globalUserID = userid;
    var paramrefeid = ReferenceID;


    var gridRow = '';
    var State = "Edit";

    gridRow = gridRow + '<div class="wms-srv-grid-cell">';
    gridRow = gridRow + bindObjectparamDDlEdit(statudetailid, paramName);
    gridRow = gridRow + '</div>';

    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditParamValue" class="wms-srv-grid-cell-input" value="' + ParamValue + '" /></div>';

    gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="SaveClientParameter" title="Save" onclick="SaveClientParameter(\'' + State + '\',' + statudetailid + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" title="Cancel" onclick="CancelClientParamEdit(' + statudetailid + ')"></i></a></div></div>';
    //gridRow = gridRow + '<div class="wms-srv-grid-action">';		
    //gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="SaveClientParameter" onclick="AddEditVendor(\''+vendorEditId+'\',\''+GetvendorId+'\',\''+VendorName+'\',\''+VendorCode+'\',\''+sector+'\',\''+value+'\',\''+LedgerNo+'\',\''+Active+'\')";></i></a>';
    //gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditvendorHide('+vendorEditId+')"></i></a></div></div>';

    $("#divparamlstrow_" + statudetailid).html(gridRow);

}

function SaveClientParameter(State, statdetailid) {
    debugger;
    var ParameterID = ""; var ParameterValue = "";
    if (State == "Add") {
        ParameterID = $("#ddlclientparam").val();
        ParameterValue = $("#txtparamvalue").val();
    }
    else {
        ParameterID = $("#txtEditUsertype").val();
        ParameterValue = $("#txteditParamValue").val();
    }

    var postData =
    {
        "Objectname": ObjectClientPara,
        "StatuDetailID": statdetailid,
        "ReferenceID": globalClientID,
        "StatutoryID": ParameterID,
        "StatutoryValue": ParameterValue,
        "createdBy": getUserId,
        "CompanyID": companyid
    };

    if (ParameterID != '--Select--') {
        if (ParameterValue != '') {
            var apiPath = wmsApiPath + 'Client/SaveEditParameter';
            callHttpUrl(apiPath, postData, function (data) {
                var getstatus = data.Status;
                var getstatuscode = data.StatusCode;
                var getresult = data.Result;
                if (getstatus == "200" && getstatuscode == "Success") {
                    var returnmsg = getresult.Message;
                    if (returnmsg == "success") {
                        if (State == 'Add') {
                            alert("Parameter Added Successfully.");
                        }
                        else {
                            alert("Parameter Updated Successfully.");
                        }
                        GetClientParameterList(globalClientID);

                    }
                    else {
                        alert(returnmsg);
                    }
                }
                else if (getstatus == "300") {
                    var returnmsg = getresult.Message;
                    alert(returnmsg);
                }
                else {
                    alert("Error Occured.");
                }

            });
        }
        else {
            alert('Please add parameter value');
        }
    }
    else {
        alert('Please select parameter name');
    }


}

function CancelClientParamEdit(statudetailid) {
    $("#divparamlstrow_" + statudetailid).html('');
    GetClientParameterList(globalClientID);
    BindddlClientParamName();
}

// End Client Parameter Code

//#region start contact address code
//start contact address code


function openContactPopUp(selectedclientid) {
    $('#wms-srv-contact-popup-client').show();
    // print_country('ddlAddCountry');
    $('#wms-srv-contact-client-popup-close').off();
    $('#wms-srv-contact-client-popup-close').click(function () {
        $('#wms-srv-contact-popup-client').hide();

    });
    globalClientID = selectedclientid;
    ContactList(selectedclientid);
}

function gridEditContactHide(ContactID, ClientID) {
    $("#ParameterRow" + ContactID).html('');
    ContactList(ClientID);
}

function ContactList(ClientID) {
    debugger;
    var beforeSVcontactid = 0;
    var apiPath = wmsApiPath + 'Contact/ContactList';
    var postData =
    {
        "CurrentPage": "1",
        "RecordLimit": "10",
        "CompanyId": companyid,
        "UserId": getUserId,
        "CustomerId": CustomerID,
        "WarehouseId": WarehouseID,
        "Filter": "0",
        "Search": "0",
        "Object": "Client",
        "ObjectId": ClientID
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;
            $("#gridbind").html();
            var gridTable = "";

            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width:115px;text-align: center;">Contact Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Email id</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Mobile no</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Address</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Country</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">State</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">City</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Postal code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Owner</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Active</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcontactname" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtemailid" onblur="validateclEmailAddress(this,0)" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" onkeypress="return isNumber(event)" data-prefix="SESKU" data-id="" value="" id="txtmobileno" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAddress" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcountry" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtstate" class="wms-srv-grid-cell-input"></div>';
            //  gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlAddCountry" onchange="print_state('+ddlState+' ,this.selectedIndex);" ><option value="">-- Select --</option><option value=""></option></select></div>';
            //  gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="ddlState"><option value="">-- Select --</option><option value="State"></option></select></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcity" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtpostalcode" class="wms-srv-grid-cell-input"></div>';

            // New Code for Owner contact details
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input class="wms-srv-grid-cell-input" type="checkbox" id="myOwnerCheck1" value=""></div>';
            // New Code for Owner contact details

            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input class="wms-srv-grid-cell-input" type="checkbox" id="myclientCheck1" checked="True" value=""></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action">';
            gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveContAddress(' + ClientID + ',' + beforeSVcontactid + ');"><i class="fas fa-check-circle" style="color:black !important" ></i></a>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < gridList.Table.length; i++) {
                var getContactID = gridList.Table[i].ID;
                var getContactName = gridList.Table[i].ContactName;
                var getEmailId = gridList.Table[i].EmailID;
                var getMobileNo = gridList.Table[i].MobileNo;
                var getAddress = gridList.Table[i].Address;
                var getCountry = gridList.Table[i].Country;
                var getState = gridList.Table[i].State;
                var getCity = gridList.Table[i].City;
                var getPostalCode = gridList.Table[i].PostalCode;
                var getActive = gridList.Table[i].Active;
                var getcontactisOwner = gridList.Table[i].clientIsOwner;
                // var getAction = gridList.Table.Action;

                //  GRID ROW

                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="ParameterRow' + getContactID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getContactName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getEmailId + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getMobileNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAddress + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCountry + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getState + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCity + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPostalCode + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCountry + "</div>"
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getcontactisOwner + "</div>"
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActive + "</div>"
                // gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAction + "</div>"
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ContactEditGrid(' + ClientID + ',' + getContactID + ',\'' + getContactName + '\',\'' + getEmailId + '\',\'' + getMobileNo + '\',\'' + getAddress + '\',\'' + getCountry + '\',\'' + getState + '\',\'' + getCity + '\',\'' + getPostalCode + '\',\'' + getActive + '\',\'' + getcontactisOwner + '\')";></i></a><div class="wms-srv-action-sep">|</div>';

                // gridTable = gridTable + '<i class="fas fa-edit" title="Edit" ></i></a><div class="wms-srv-action-sep">|</div>';
                // gridTable = gridTable + '<i class="fas fa-code" title="Parameter" ></i></a>  <div class="wms-srv-action-sep">|</div>';
                // gridTable = gridTable + '<i class="fas fa-user-plus" title="Contact Info" onclick="openContactPopUp();"></i></a>';

                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';

            }
            $("#contactgridbind").html(gridTable);
            // setupGridPagingwarehouse('paging-client', strCurrentPage, getTotalRecords, ClientList);
        }

    });
}

function SaveContAddress(clientid, ContactID) {
    debugger;

    var getClient = globalClientID;
    if (validateClientContact(ContactID) != false) {

        var apiPath = wmsApiPath + "Contact/SaveContact";
        var Active = 'No';
        var ContOwner = 'No';
        // Add New Client
        if (ContactID == '0') {
            var getContactname = $("#txtcontactname").val();
            var getEmailID = $("#txtemailid").val();
            var getMobileNo = $("#txtmobileno").val();
            var getAddress = $("#txtAddress").val();
            var getCountry = $("#txtcountry").val();
            var getState = $("#txtstate").val();
            var getCity = $("#txtcity").val();
            var getPostalcode = $("#txtpostalcode").val();
            if ($('#myOwnerCheck1').is(':checked')) {
                ContOwner = 'Yes';
            }
            if ($('#myclientCheck1').is(':checked')) {
                Active = 'Yes';
            }
        }

        //Edit Existing Client
        else {
            var getContactname = $("#txteditcontactname").val();
            var getEmailID = $("#txteditemailid").val();
            var getMobileNo = $("#txteditmobileno").val();
            var getAddress = $("#editAddress").val();
            var getCountry = $("#txteditcountry").val();
            var getState = $("#txteditstate").val();
            var getCity = $("#txteditcity").val();
            var getPostalcode = $("#txteditpostalcode").val();
            if ($('#txtEditconOwner').is(':checked')) {
                ContOwner = 'Yes';
            }
            if ($('#txtEditconactive').is(':checked')) {
                Active = 'Yes';
            }
        }

        var postData =
        {
            "ContactID": ContactID,
            "ObjectName": "Client",
            "ReferenceID": clientid,
            "ContactName": getContactname,
            "EmailID": getEmailID,
            "MobileNo": getMobileNo,
            "Address": getAddress,
            "Country": getCountry,
            "State": getState,
            "City": getCity,
            "PostalCode": getPostalcode,
            "Active": Active,
            "CompanyID": companyid,
            "CreatedBy": getUserId,
            "clientIsOwner": ContOwner,
        };

        callHttpUrl(apiPath, postData, function (data) {
            var getstatuscode = data.StatusCode;
            var isSuccess = data.Status;
            var getresult = data.Result;
            if (isSuccess == 200) {
                var returnmsg = getresult.Message;
                if (returnmsg == "success") {
                    if (ContactID == '0') {
                        alert('Contact Saved Successfully!!');
                    }
                    else {
                        alert('Contact Updated Successfully!!');
                    }
                    ContactList(clientid);
                }
                else {
                    alert(returnmsg);
                }
            }
            else if (isSuccess == "300") {
                var returnmsg = getresult.Message;
                alert(returnmsg);
            }
            else {
                alert("Contact Save failed");
            }
        });
    }

}

function ContactEditGrid(getclientid, ContactID, getContactName, getEmailId, getMobileNo, getAddress, getCountry, getState, getCity, getPostalCode, getActive, GetContOwner) {
    debugger;
    var gridRow = '';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcontactname" class="wms-srv-grid-cell-input" value="' + getContactName + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditemailid" onblur="validateclEmailAddress(this,\'' + getEmailId + '\')" class="wms-srv-grid-cell-input" value="' + getEmailId + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text"  onkeypress="return isNumber(event)" id="txteditmobileno" class="wms-srv-grid-cell-input" value="' + getMobileNo + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="editAddress" class="wms-srv-grid-cell-input" value="' + getAddress + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcountry" class="wms-srv-grid-cell-input" value="' + getCountry + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditstate" class="wms-srv-grid-cell-input" value="' + getState + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcity" class="wms-srv-grid-cell-input" value="' + getCity + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditpostalcode" class="wms-srv-grid-cell-input" value="' + getPostalCode + '" /></div>';

    // new code for client owner details contact
    if (GetContOwner == 'Yes') {
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditconOwner" class="wms-srv-grid-cell-input" value="' + getActive + '" checked="checked" /></div>';
    } else {
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditconOwner" class="wms-srv-grid-cell-input" value="' + getActive + '" /></div>';
    }
    // new code for client owner details contact

    if (getActive == 'Yes') {
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditconactive" class="wms-srv-grid-cell-input" value="' + getActive + '" checked="checked" /></div>';
    } else {
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditconactive" class="wms-srv-grid-cell-input" value="' + getActive + '" /></div>';
    }

    gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
    gridRow = gridRow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"> <i class="fas fa-check-circle" id="SaveClientParameter" onclick="SaveContAddress(' + getclientid + ',' + ContactID + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditContactHide(' + ContactID + ',' + getclientid + ')"></i></a></div></div>';

    $("#ParameterRow" + ContactID).html(gridRow);
}

function validateClientContact(clientID) {
    if (clientID == "0") {
        if (document.getElementById("txtcontactname").value == "") {
            alert("Please add Contact Name!");
            return false;
        }
        else if (document.getElementById("txtemailid").value == "") {
            alert("Please add EmailID!");
            return false;
        }
        else if (document.getElementById("txtAddress").value == "") {
            alert("Please add Address!");
            return false;
        }
    }
    else {
        if (document.getElementById("txteditcontactname").value == "") {
            alert("Please add Contact Name!");
            return false;
        }
        else if (document.getElementById("txteditemailid").value == "") {
            alert("Please add EmailID!");
            return false;
        }
        else if (document.getElementById("editAddress").value == "") {
            alert("Please add Address!");
            return false;
        }
    }
}
//end contact address code
//#endregion End contact address code

function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function validateclEmailAddress(emailVal, EmailID) {
    debugger;

    var email = emailVal.value;
    if (email.trim() != '') {
        var isEmailValid = true;

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.match(mailformat)) {
            //isEmailValid = true;

        }
        else {
            // isEmailValid = false;
            alert("Enter correct email.");
            if (EmailID == "0") {
                $("#txtemailid").val('');
                $("#txtemailid").focus();
            }
            else {
                // $("#txtEditemailid").val('EmailID');
                $("#txteditemailid").val('');
                $("#txteditemailid").focus();

            }
        }
    }
    //return isEmailValid;
}

//#region  start bank details Code

//start bank details Code

function openBankDetailsPopUp(selectedclientid) {
    $('#wms-srv-bankdetails-popup-client').show();
    $('#wms-srv-bankdetails-client-popup-close').off();
    $('#wms-srv-bankdetails-client-popup-close').click(function () {
        $('#wms-srv-bankdetails-popup-client').hide();

    });
    globalClientID = selectedclientid;
    BankDetailstList(selectedclientid);
}


function BankDetailstList(ClientID) {
    debugger;
    var beforeSVcontactid = 0;
    var apiPath = wmsApiPath + 'Client/GetBankDetails';
    //var apiPath =  'http://localhost:50068/api/staging/v1/Client/GetBankDetails';
    var postData =
    {

        "CompanyId": companyid,
        "UserId": getUserId,
        "CustomerId": CustomerID,
        "WarehouseId": WarehouseID,
        "Object": "Client",
        "ClientId": ClientID
    }

    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        if (getStatus == 200) {
            var gridList = data.Result;
            $("#gridbind").html();
            var gridTable = "";

            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="width:115px;text-align: center;">A/C Holder Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Bank Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Branch</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Credit Limit</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Credit Day</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Account Number</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">IFSC Code</div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Swift Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';

            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtaccholdername" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtbankname" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtbranchname" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAccNumber" class="wms-srv-grid-cell-input"></div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtAccNumber" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtcreditday" class="wms-srv-grid-cell-input"></div>';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtswiftcode" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action">';
            gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveBankDetails();"><i class="fas fa-check-circle" style="color:black !important" ></i></a>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < gridList.Table.length; i++) {
                var getID = gridList.Table[i].ID;
                var getHolderName = gridList.Table[i].HolderName;
                var getBankName = gridList.Table[i].BankName;
                var getBranchName = gridList.Table[i].BranchName;
                var getCreditLimit = gridList.Table[i].CreditLimit;
                var getCreditDay = gridList.Table[i].CreditDay;
                // var getAccountNo = gridList.Table[i].AccNumber;
                // var getIFSCCode = gridList.Table[i].IFSCCode;
                // var getSwiftCode = gridList.Table[i].SwiftCode;

                // var getAction = gridList.Table.Action;

                //  GRID ROW

                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="ParameterRow' + getID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getHolderName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getBankName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getBranchName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCreditLimit + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCreditDay + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAccountNo + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getIFSCCode + "</div>";
                // gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSwiftCode + "</div>";
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ContactEditBankDetailsGrid(' + getID + ',\'' + getHolderName + '\',\'' + getBankName + '\',\'' + getBranchName + '\',\'' + getCreditLimit + '\',\'' + getCreditDay + '\')";></i></a><div class="wms-srv-action-sep">|</div>';
                //gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="ContactEditBankDetailsGrid('+ getID +',\'' + getHolderName + '\',\'' + getBankName + '\',\'' + getBranchName + '\',\'' + getAccountNo + '\',\'' + getIFSCCode + '\',\'' + getSwiftCode + '\')";></i></a><div class="wms-srv-action-sep">|</div>';

                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';

            }
            $("#bankdetailsgridbind").html(gridTable);
        }
    });

}


function SaveBankDetails() {
    debugger;
    if (validatesaveBankDetails() != false) {
        var getClient = globalClientID;
        var apiPath = wmsApiPath + '/Client/SaveBankDetails';
        //var apiPath =  'http://localhost:50068/api/staging/v1/Client/SaveBankDetails';
        var getAccHolderName = $("#txtaccholdername").val();
        var getBankName = $("#txtbankname").val();
        var getBranchName = $("#txtbranchname").val();
        var getCreditlimit = $("#txtAccNumber").val();
        var getCreditday = $("#txtcreditday").val();
        //var getAccNumber = $("#txtAccNumber").val();
        //var getIfscCode = $("#txtifsccode").val();
        //var getSwiftCode = $("#txtswiftcode").val();

        /*var getAccHolderName = $(".txtaccholdername").val();
    var getBankName = $(".txtbankname").val();
    var getBranchName = $(".txtbranchname").val();
    var getAccNumber = $(".txtAccNumber").val();
    var getIfscCode = $(".txtifsccode").val();
    var getSwiftCode = $(".txtswiftcode").val();*/

        var postData =
        {
            "ObjectName": "Client",
            // "clientID": clientid,
            "clientID": getClient,
            "CompanyID": companyid,
            "UserId": getUserId,
            "CustomerId": CustomerID,
            "WarehouseId": WarehouseID,
            "AccHolderName": getAccHolderName,
            "BankName": getBankName,
            "BranchName": getBranchName,
            "Creditlimit": getCreditlimit,
            "CreditDay": getCreditday
            // "AccNumber": getAccNumber,
            // "IfscCode": getIfscCode,
            // "SwiftCode": getSwiftCode
        };

        callHttpUrl(apiPath, postData, function (data) {
            debugger;
            var getstatuscode = data.StatusCode;
            var isSuccess = data.Status;
            var getresult = data.Result;
            if (isSuccess == 200) {
                var returnmsg = getresult.Message;
                if (returnmsg == "success") {
                    alert('Bank Details Saved Successfully!!');
                    $('#wms-srv-bankdetails-popup-client').hide();
                    ClientList(strCurrentPage, 0, 0);
                }
                else {
                    alert(returnmsg);
                }
            }
            else {
                alert("Bank Details Save failed");
            }
        });
    }

}

function validatesaveBankDetails() {
    debugger;
    /*var getAccHolderName = $(".txtaccholdername").val();
    var getBankName = $(".txtbankname").val();
    var getBranchName = $(".txtbranchname").val();
    var getAccNumber = $(".txtAccNumber").val();
    var getIfscCode = $(".txtifsccode").val();
    var getSwiftCode = $(".txtswiftcode").val();*/

    var getAccHolderName = $("#txtaccholdername").val();
    var getBankName = $("#txtbankname").val();
    var getBranchName = $("#txtbranchname").val();
    var getAccNumber = $("#txtAccNumber").val();
    var getcreditday = $("#txtcreditday").val();
    //var getIfscCode = $("#txtifsccode").val();
    // var getSwiftCode = $("#txtswiftcode").val();

    if (getAccHolderName == "") {
        alert("Please Enter Account Holder Name!");
        return false;
    } else if (getBankName == "") {
        alert("Please Enter Bank Name!");
        return false;
    } else if (getBranchName == "") {
        alert("Please Enter Branch Name!");
        return false;
    } else if (getAccNumber == "") {
        alert("Please Enter Credit Limit!");
        return false;
    } else if (getcreditday == "") {
        alert("Please Enter Credit Day!");
        return false;
    }
    // }else if (getIfscCode == "") {
    // 	alert("Please Enter IFSC Code!");
    // 	return false;
    // }else if (getSwiftCode == "") {
    // 	alert("Please Enter Swift Code!");
    // 	return false;
    // }
}


function ContactEditBankDetailsGrid(getID, getHolderName, getBankName, getBranchName, getcreditlimit, getcreditDay) {
    debugger;
    var gridRow = '';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getHolderName + '"  class="wms-srv-grid-cell-input txtaccholdername"></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getBankName + '" class="wms-srv-grid-cell-input txtbankname"></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getBranchName + '" class="wms-srv-grid-cell-input txtbranchname"></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getcreditlimit + '" class="wms-srv-grid-cell-input txtAccNumber"></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getcreditDay + '" class="wms-srv-grid-cell-input txtcreditday"></div>';
    // gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getAccountNo + '" class="wms-srv-grid-cell-input txtAccNumber"></div>';
    // gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getIFSCCode + '" class="wms-srv-grid-cell-input txtifsccode"></div>';
    // gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="' + getSwiftCode + '" class="wms-srv-grid-cell-input txtswiftcode"></div>';


    gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
    gridRow = gridRow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"> <i class="fas fa-check-circle" id="EditBankDetails" onclick="EditBankDetails(' + getID + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditBankDetailsHide(' + getID + ')"></i></a></div></div>';
    $("#ParameterRow" + getID).html(gridRow);
}

function gridEditBankDetailsHide(getID) {
    $("#ParameterRow" + getID).html('');
    var getClient = globalClientID;
    BankDetailstList(getClient);
}


/*
function BankDetails(getID){
    $("#ParameterRow" + getID).html('');
    var getClient = globalClientID; 
    BankDetailstList(getClient);
}*/


function EditBankDetails(getID) {
    debugger;
    if (validateEditBankDetails(getID) != false) {
        var getClient = globalClientID;
        var apiPath = wmsApiPath + '/Client/EditBankDetails';
        //var apiPath =  'http://localhost:50068/api/staging/v1/Client/EditBankDetails';
        var getAccHolderName = $(".txtaccholdername").val();
        var getBankName = $(".txtbankname").val();
        var getBranchName = $(".txtbranchname").val();
        var getCreditlimit = $(".txtAccNumber").val();
        var getCreditDay = $(".txtcreditday").val();
        // var getIfscCode = $(".txtifsccode").val();
        // var getSwiftCode = $(".txtswiftcode").val();

        var postData =
        {
            "ID": getID,
            "ObjectName": "Client",
            // "clientID": clientid,
            "clientID": getClient,
            "CompanyID": companyid,
            "UserId": getUserId,
            "CustomerId": CustomerID,
            "WarehouseId": WarehouseID,
            "AccHolderName": getAccHolderName,
            "BankName": getBankName,
            "BranchName": getBranchName,
            "Creditlimit": getCreditlimit,
            "CreditDay": getCreditDay
            // "AccNumber": getAccNumber,
            // "IfscCode": getIfscCode,
            // "SwiftCode": getSwiftCode
        };

        callHttpUrl(apiPath, postData, function (data) {
            debugger;
            var getstatuscode = data.StatusCode;
            var isSuccess = data.Status;
            var getresult = data.Result;
            if (isSuccess == 200) {
                var returnmsg = getresult.Message;
                if (returnmsg == "success") {
                    alert('Bank Details Edit Successfully!!');
                    $('#wms-srv-bankdetails-popup-client').hide();
                    ClientList(strCurrentPage, 0, 0);
                }
                else {
                    alert(returnmsg);
                }
            }
            else {
                alert("Bank Details Edit failed");
            }
        });
    }

}

function validateEditBankDetails(getID) {

    debugger;
    var getAccHolderName = $(".txtaccholdername").val();
    var getBankName = $(".txtbankname").val();
    var getBranchName = $(".txtbranchname").val();
    var getAccNumber = $(".txtAccNumber").val();
    var getcreditday = $(".txtcreditday").val();
    // var getIfscCode = $(".txtifsccode").val();
    // var getSwiftCode = $(".txtswiftcode").val();

    if (getAccHolderName == "") {
        alert("Please Enter Account Holder Name!");
        return false;
    } else if (getBankName == "") {
        alert("Please Enter Bank Name!");
        return false;
    } else if (getBranchName == "") {
        alert("Please Enter Branch Name!");
        return false;
    } else if (getAccNumber == "") {
        alert("Please Enter Credit Limit!");
        return false;
    } else if (getcreditday == "") {
        alert("Please Enter Credit Day!");
        return false;
    }
    // }else if (getIfscCode == "") {
    // 	alert("Please Enter IFSC Code!");
    // 	return false;
    // }else if (getSwiftCode == "") {
    // 	alert("Please Enter Swift Code!");
    // 	return false;
    // }
}
//end bank details code
//#endregion start bank details Code




