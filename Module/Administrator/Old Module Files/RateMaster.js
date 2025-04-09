

//var apiFolder = 'http://173.212.244.46/WebAPITest/';
//var apiFolder = 'http://localhost:50068/';
//wmsApiPath = apiFolder + 'api/staging/v1/';

var strCurrentPage = '1'; //paging var declare
var getTotalRecords = '10'; ////paging var declare
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
var getClient="0";
var ClGroupCode;
var SAPCode;

var ObjectClientPara = "RateCard";
function initRateMaster() {
  RateCardList(strCurrentPage, searchfilter, searchvalue);
  $("#pnlRateMaster").show();
}

function editRateMaster(rateid)
{
    UnitTypeBillingMethodDDLEdit(rateid);
    GetRateDetailById(rateid);
    $("#wms-srv-EditRateMaster-popup").show();
    $("#wms-srv-EditRateMaster-popup-close").click(function()
    {
        $("#wms-srv-EditRateMaster-popup").hide();
    });
}


function showRateParameter(getrateid)
{
    $("#hdnRateIdParam").val(getrateid);
    RateParameterList(getrateid);
    $("#wms-srv-RatePayment-popup").show();
    $("#wms-srv-RatePayment-popup-close").click(function()
    {
        $("#wms-srv-RatePayment-popup").off();
        $("#wms-srv-RatePayment-popup").hide();
        $('#wms-srv-RatePayment-popup .wms-srv-datepicker').datepicker('destroy');
    });
}


function showRateHistory(RateId)
{
    RateHistoryList(RateId);
    $("#wms-srv-rateHistory-popup").show();
    $("#wms-srv-rateHistory-popup-close").click(function()
    {
        $("#wms-srv-rateHistory-popup").off();
        $("#wms-srv-rateHistory-popup").hide();
    });
}


function showActivityList()
{
    RateActivityList();
    $("#wms-srv-ActivityList-popup").show();
    $("#wms-srv-ActivityList-popup-close").click(function()
    {
        $("#wms-srv-ActivityList-popup").off();
        $("#wms-srv-ActivityList-popup").hide();
    });
}

function showZoneMaster()
{
    ZoneList();
    $("#wms-srv-ZoneMaster-popup").show();
    $("#wms-srv-ZoneMaster-popup-close").click(function()
    {
        $("#wms-srv-ZoneMaster-popup").off();
        $("#wms-srv-ZoneMaster-popup").hide();
    });
}

function showAddKeywordPanel(rateId, rowNum) {
    debugger;
    closeAddKeywordPanel();
    var strAddKeywordBlock = '<div class="pnlAddKeyword keyblock">' +
      '<input type="text" value="" class="txtRateKeyword"><i class="fas fa-check-circle" onclick="addRateKeyword(' + rateId +','+rowNum+')"></i>  <i class="fas fa-times-circle" onclick="closeAddKeywordPanel();"></i>' +
      '</div>';
    $('#cellKeyWordHolder_' + rowNum).prepend(strAddKeywordBlock);
  }

  function showEditKeywordPanel(skuId, rowNum) {
    debugger;
    // closeAddKeywordPanel();
    var strAddKeywordBlock = '<div class="pnlEditKeyword keyblock">' +
      '<input type="text" value="" class="txtEditSkuKeyword"><i class="fas fa-check-circle" onclick="addSkuKeyword(' + skuId +')"></i>  <i class="fas fa-times-circle" onclick="closeAddKeywordPanel();"></i>' +
      '</div>';
    $('#EditCellKeyWordHolder_' + rowNum).prepend(strAddKeywordBlock);
  }

  function addRateKeyword(rateId, rowNum) {
    var apiPath = wmsApiPath + "RateCard/updateRateGroup";
    var keyword = $('.txtRateKeyword').val().trim();
    if (keyword != '') {
      var postData = {
        "ID": rateId,
        "BillGroup": keyword,
        "UserId": getUserId
      };
  
      callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatusCode = data.StatusCode;
        var getStatus = data.Status;
        if (getStatus == '200' && getStatusCode == 'Success') {
          var keyblock = '<div class="keyblock">' + keyword + ' <i class="fas fa-times-circle" onclick="removeRateKeyword(\'' + keyword + '\', ' + rateId + ',\'' + rowNum + '\');"></i></div>';
          $('#cellKeyWordHolder_' + rowNum).append(keyblock);
          closeAddKeywordPanel();
        } else {
          alert('Failed to add group..!!');
        }
      });
    } else {
      alert('Please enter keyword to add!!');
    }
  }

  function removeRateKeyword(keyword, rateId, rowNum) {
    var apiPath = wmsApiPath + "RateCard/removeRateGroup";
  
    postData = {
      "ID": rateId,
      "BillGroup": keyword,
      "UserId": getUserId
    };
  
    callHttpUrl(apiPath, postData, function (data) {
      debugger;
      var getStatusCode = data.StatusCode;
      var getStatus = data.Status;
      if (getStatus == '200' && getStatusCode == 'Success') {
        $('#cellKeyWordHolder_' + rowNum + ' .keyblock').each(function () {
          var getCurrentKeyword = $(this).text().trim();
          if (getCurrentKeyword == keyword) {
            $(this).remove();
            closeAddKeywordPanel();
          }
        });
      }
    });
  }

  function convertToKeyblock(keyword, rateId, rowNum) {
    var keyblock = '';
    if (keyword != '') {
      if (keyword.indexOf('|') > -1) {
        var splitKeyword = keyword.split('|');
        for (var k = 0; k < splitKeyword.length; k++) {
          keyblock = keyblock + '<div class="keyblock">' + splitKeyword[k] + ' <i class="fas fa-times-circle" onclick="removeRateKeyword(\'' + splitKeyword[k] + '\', ' + rateId + ',\'' + rowNum + '\');"></i></div>';
        }
      } else {
        keyblock = '<div class="keyblock">' + keyword + ' <i class="fas fa-times-circle" onclick="removeRateKeyword(\'' + keyword + '\', ' + rateId + ',\'' + rowNum + '\');"></i></div>';
      }
  
    }
    return keyblock;
  }

  function closeAddKeywordPanel() {
    $('.pnlAddKeyword').remove();
  }


  function editRatePara(rowId)
  {
    debugger;
    $("#RowParameter"+rowId).html('');
    var gridData = "";
    gridData  = gridData + '<div class="wms-srv-grid-cell"><input type="text" value="Sku Count"></div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell"><input type="text" value="EditText"></div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell"><input type="text" value="EditText"></div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell"><input type="text" value="EditText"></div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell"><input type="text" value="EditText"></div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell"><input type="text" value="EditText"></div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell"><input type="text" value="14/01/2024"></div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell">'; 
    gridData  = gridData + '<div class="wms-srv-grid-action">';
    gridData  = gridData + '<a href="#" title="Save" onclick="editRatePara();" class="wms-srv-save"><i class="fas fa-edit"></i></a>';
    gridData  = gridData + '<div class="wms-srv-action-sep"> | </div>';
    gridData  = gridData + '<a href="#" title="Save"  onclick="refereshListRatePara('+rowId+')" class="wms-srv-save"><i class="fas fa-check-circle"></i></a>';
    gridData  = gridData + '</div>';
    gridData  = gridData + '</div>';  

    $("#RowParameter"+rowId).append(gridData);

  }


  function refereshListRatePara(rowId)
  {
    debugger;
    $("#RowParameter"+rowId).html('');
    var gridData = "";
    gridData  = gridData + '<div class="wms-srv-grid-cell">Sku Count</div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell">Text</div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell">Text</div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell">Text</div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell">Text</div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell">Text</div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell">14/01/2024</div>';
    gridData  = gridData + '<div class="wms-srv-grid-cell">'; 
    gridData  = gridData + '<div class="wms-srv-grid-action">';
    gridData  = gridData + '<a href="#" title="Save" onclick="editRatePara();" class="wms-srv-save"><i class="fas fa-edit"></i></a>';
    gridData  = gridData + '</div>';
    gridData  = gridData + '</div>';  

    $("#RowParameter"+rowId).append(gridData);

  }

  function showActiveNamePopupList()
  {
    debugger;
    var name = "";
    var code = "";
    var apiPath = wmsApiPath + 'RateCard/getAccountName';
    var getObject = $("#gridAccountName").val();
    if(getObject !=0)
    {
      if(getObject =="Vendor")
      {
        name = "Vendor Name";
        code = "Vendor Code";
      }
      else if(getObject == "Client")
      {
        name = "Client Name";
        code = "Client Code";
      }
      else if(getObject == "Customer")
      {
        name = "Customer Name";
        code = "Customer Code";
      }
    $("#showGridAccountName").html('');
    var gridList = "";
    var postData =
    {
        "ActivityType": getObject, 
        "CompanyId": companyid,
        "UserId": getUserId
    }
    callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
          debugger;
          var gridData = data.Result;

          // HTML Grid Table Header Bind
          gridList = gridList + '<div class="wms-srv-grid-header">';
          gridList = gridList + '<div class="wms-srv-grid-cell " style="text-align:center">'+name+'</div>';
          gridList = gridList + '<div class="wms-srv-grid-cell " style="text-align:center">'+code+'</div>';
          gridList = gridList + '<div class="wms-srv-grid-cell " style="text-align:center">Action</div>';
          gridList = gridList + '</div>';

          for (var i = 0; i < gridData.Table.length; i++) {
              var getID = gridData.Table[i].ID;
              var getName = gridData.Table[i].Name;
              var getCode = gridData.Table[i].Code;
              
              //  GRID ROW
              gridList = gridList + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getID + '">';
              gridList = gridList + '<div class="wms-srv-grid-cell" style="text-align:center">'+getName+'</div>';
              gridList = gridList + '<div class="wms-srv-grid-cell" style="text-align:center">'+getCode+'</div>';
              gridList = gridList + '<div class="wms-srv-grid-cell" >';
              gridList = gridList + '<div class="wms-srv-grid-action">';
              gridList = gridList + '<a href="#" title="Save" class="wms-srv-save" onClick="getAccountId('+getID+',\'' + getName + '\');"><i class="fas fa-check-circle"></i></a>';                                           
              gridList = gridList + '</div>';
              gridList = gridList + '</div>';
              gridList = gridList + '</div>';
          }
          $("#showGridAccountName").html(gridList);
      }
    });

        $("#showGridAccountName").append(gridList);
        $("#wms-srv-AccountName-popup").show();
        $("#wms-srv-AccountName-popup-close").click(function()
        {
            $("#wms-srv-AccountName-popup").hide();
        });
  }
else
  {
    alert("Please select Account Type..!!");
  }

}

function getAccountId(Id, Name){
  debugger;
  $("#hdnaccountid").val(Id);
  $("#textAccName").val(Name);
  $("#wms-srv-AccountName-popup").hide();
}

function RateCardList(strCurrentPage, searchfilter, searchvalue) {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getRateCardList';

  var searchfilter = $("#drop-down-search").val();
  var searchvalue = $("#text-value-search").val();

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

          var getTotalRecord = gridList.Table[0].TotalRecord;
         // alert (getTotalRecords);
          var strCurrentPage = gridList.Table[0].CurrentPage;
          $("#gridRateMaster").html();
          var gridTable = "";

          // HTML Grid Table Header Bind
          gridTable = gridTable + '<div class="wms-srv-grid-header">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Account Type</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Account Name</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Activity Type</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">ERP Code</div>';            
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate Title</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate For Unit</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Unit Type</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Billing Frequency</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Billing Group</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Billing Method</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><select id="gridAccountName" class="wms-srv-grid-cell-input"><option value="0">-- Select --</option><option value="Vendor">Vendor</option><option value="Client">Client</option><option value="Carrier">Carrier</option><option value="Customer">Customer</option></select></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><div class="wms-srv-suggestion-holder"><input type="text" id="textAccName" value="" class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="showActiveNamePopupList();"><i class="fas fa-search"></i></a><input type="hidden" data-prefix="SESKU" id="texthdnAccNameID" value="" class="wms-srv-grid-cell-input notranslate"></div></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><div class="wms-srv-suggestion-holder"><input type="text" id="textActType" value="" class="wms-srv-grid-cell-input notranslate"><a href="#"onclick="showActivityList();return false;"><i class="fas fa-search"></i></a><input type="hidden" data-prefix="SESKU" id="texthdntextActTypeID" value="" class="wms-srv-grid-cell-input notranslate"></div></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtERPCode" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtRateTitle" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtRate" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" value="" class="wms-srv-grid-cell-input" id="txtRateforUnit"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><select id="ddlUnitType" class="wms-srv-grid-cell-input"></select></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><select id="ddlBillfreqncy" class="wms-srv-grid-cell-input"><option value="0">-- Select --</option><option value="Weekly">Weekly</option><option value="Weekly">Yearly</option><option value="Weekly">Quaterly</option><option value="Weekly">Daily</option></select></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><select id="ddlBillingMethod" class="wms-srv-grid-cell-input"></select></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
          gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
          gridTable = gridTable + ' </div><a href="#" title="Save" class="wms-srv-save" onClick="saveRateCard();"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep">';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';

          for (var i = 0; i < gridList.Table1.length; i++) {
              var rowNum = i + 1;
              var getRateID = gridList.Table1[i].ID;
              var getAccountType = gridList.Table1[i].AccountType;
              var getAccountName = gridList.Table1[i].AccountName;
              var getActivityType = gridList.Table1[i].ActivityType;
              var getERPCode = gridList.Table1[i].ERPCode;
              var getRateTitle = gridList.Table1[i].RateTitle;
              var getRate = gridList.Table1[i].Rate;
              var getRateForUnit = gridList.Table1[i].RateForUnit;
              var getUnitType = gridList.Table1[i].UnitType;
              var getBillingFrequency = gridList.Table1[i].BillingFrequency;
              var getBillingMethod = gridList.Table1[i].BillingMethod;
              var getBillingGroup = gridList.Table1[i].BillingGroup;
              var getActive = gridList.Table1[i].Active;

              //  GRID ROW
              gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getRateID + '">';
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getAccountType + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getAccountName + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getActivityType + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getERPCode + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRateTitle + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRateForUnit + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getUnitType + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getBillingFrequency + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'><div class='wms-srv-grid-cell' id='cellKeyWordHolder_"+rowNum+"'><i class='fas fa-plus-circle btnAddProductKeyword' onclick='showAddKeywordPanel("+getRateID+","+rowNum+")'></i> </div>" + convertToKeyblock(getBillingGroup, getRateID, rowNum) + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getBillingMethod + "</div>";

              gridTable = gridTable + '<div class="wms-srv-grid-cell">';
              gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
              gridTable = gridTable + '<a href="#" title="Rate Parameter" onclick="editRateMaster('+getRateID+');" class="wms-srv-save"><i class="fas fa-edit"></i></a><div class="wms-srv-action-sep">';
              gridTable = gridTable + ' | </div><a href="#" title="Rate Parameter" onclick="showRateParameter('+getRateID+');"class="wms-srv-save"><i class="fas fa-clipboard-check"></i></a><div class="wms-srv-action-sep">';
              gridTable = gridTable + ' | </div><a href="#" title="Rate History" onclick="showRateHistory('+getRateID+');"class="wms-srv-save"><i class="fas fa-file-invoice"></i></a><div class="wms-srv-action-sep">';
              if(getActive == 'Yes'){
                gridTable = gridTable + ' | </div><label class="switch"> <input type="checkbox" checked onclick="activeRate(' + getRateID + ',\'No\',' + getUserId +');"><span class="slider round"></span></label>';
              }
              else{
                gridTable = gridTable + ' | </div><label class="switch"> <input type="checkbox" onclick="activeRate(' + getRateID + ',\'Yes\',' + getUserId +');"><span class="slider round"></span></label>';
              }
              
              gridTable = gridTable + '</div>';
              gridTable = gridTable + '</div>';
              gridTable = gridTable + '</div>';
          }
          $("#gridRateMaster").html(gridTable);
          UnitTypeBillingMethodDDL();
          setupGridPagingList('paging-ratemaster', strCurrentPage, getTotalRecord, RateCardList);
      }

  });
}

function validateRateCard(){
  var result = "";
  if($("#hdnactivityid").val()=="0")
  {
    result = "Please select Activity Type..!";
  }
  else if($("#hdnaccountid").val() == "0")
  {
    result = "Please select Account Name..!";
  }
  else if($("#txtERPCode").val()=="")
  {
    result = "Please enter ERP code..!";
  }
  else if($("#txtRateTitle").val()=="")
  {
    result = "Please enter Rate Title..!";
  }
  else if($("#txtRate").val()=="")
  {
    result = "Please enter Rate..!";
  }
  else if($("#txtRateforUnit").val()=="")
  {
    result = "Please enter Rate for unit..!";
  }
  else if($("#ddlUnitType").val()=="0")
  {
    result = "Please select unit type..!";
  }
  else if($("#ddlBillfreqncy").val()=="0")
  {
    result = "Please select Billing frequency..!";
  }
  else if($("#ddlBillingMethod").val()=="0")
  {
    result = "Please select Billing method..!";
  }
  return result;
}

function saveRateCard(){
  var result = validateRateCard();
  if(result == ""){
    var accounttype = $("#gridAccountName option:selected").text();
    var accountid = $("#hdnaccountid").val();
    var accountname = $("#textAccName").val();
    var activityid = $("#hdnactivityid").val();
    var erpcode = $("#txtERPCode").val();
    var ratetitle = $("#txtRateTitle").val();
    var rate = $("#txtRate").val();
    var rateforunit = $("#txtRateforUnit").val();
    var unittypeid = $("#ddlUnitType").val()
    var billfreqncy = $("#ddlBillfreqncy option:selected").text();
    var billmethodid = $("#ddlBillingMethod").val();

    var apiPath = wmsApiPath + 'RateCard/addRateCard';
    var postData = {
        "ID": "0",
        "AccountType": accounttype,
        "AccountName": accountname,
        "AccountTypeID": accountid,
        "ActivityTypeID": activityid,
        "ERPCode": erpcode,
        "RateTitle": ratetitle,
        "Rate": rate,
        "RateForUnit": rateforunit,
        "UnitTypeID": unittypeid,
        "BillFrequency": billfreqncy,
        "BillMethodID": billmethodid,
        "BillGroup": "",
        "CompanyID": companyid,
        "UserID": getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.Status;
        if (getStatusCode == 200) {
            alert("Record saved successfully..!")
            $("#hdnaccountid").val("0");
            $("#hdnactivityid").val("0");
            RateCardList(strCurrentPage, searchfilter, searchvalue);
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

function isNumber(evt)
 {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false; 
         return true;
 }

 function SearchRateMaster() {
  searchfilter = $('#drop-down-search').val();
  searchvalue = $('#text-value-search').val();

  if (searchvalue == '0') {
      alert('Please Enter value for filter');
  }
  else {
    RateCardList(strCurrentPage,searchfilter, searchvalue);

  }
  if (searchfilter == '' && searchvalue == '') {
    RateCardList(strCurrentPage,searchfilter, searchvalue);
  }
}

function activeRate(getID,isactive,getUID) {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/updateRateActive';
  var postData = {
      "ID": getID,
      "Active": isactive,
      "UserId": getUID
  }
  callHttpUrl(apiPath, postData, function (data) {
      var getStatusCode = data.Status;
      if (getStatusCode == 200) {
          alert("Rate Card updated successfully..!")
          RateCardList(strCurrentPage,searchfilter, searchvalue);
      }
      else{
        alert(getStatusCode.Message);
      }
  });
}

function RateActivityList(strCurrentPage, searchfilter, searchvalue) {
  debugger;
  strCurrentPage = "1";
  var apiPath = wmsApiPath + 'RateCard/getActivityType';

  var searchfilter = $("#drop-down-search-activity").val();
  var searchvalue = $("#text-value-search-activity").val();

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
      "UserId": getUserId,
      "Search": searchfilter,
      "Filter": searchvalue
  }
  callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
          debugger;
          var gridList = data.Result;

          var getTotalRecords = gridList.Table[0].TotalRecord;
          var strCurrentPage = gridList.Table[0].CurrentPage;
          $("#gridbindActivity").html();
          var gridTable = "";

          // HTML Grid Table Header Bind
          gridTable = gridTable + '<div class="wms-srv-grid-header">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Object</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Activity Name</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Remark</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Zone</div>';  
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><select id="gridObjectName" class="wms-srv-grid-cell-input"></select></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtActivityName" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtRemark" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><div class="wms-srv-suggestion-holder"><select id="ddlZone"></select><a href="#" onclick="showZoneMaster();return false;"><i class="fas fa-plus-circle btnAddEmailInToField"></i></a><input type="hidden" data-prefix="SESKU" id="texthdnFromLocationID" value="" class="wms-srv-grid-cell-input notranslate"></div></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
          gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
          gridTable = gridTable + ' </div><a href="#" title="Save" class="wms-srv-save" onClick="saveRateActivity();"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep"></label>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';

          for (var i = 0; i < gridList.Table1.length; i++) {
              var getID = gridList.Table1[i].ID;
              var getObjectID = gridList.Table1[i].ObjectID;
              var getObjectName = gridList.Table1[i].ObjectName;
              var getActivityName = gridList.Table1[i].ActivityName;
              var getRemark = gridList.Table1[i].Remark;
              var getZoneID = gridList.Table1[i].ZoneID;
              var getZoneName = gridList.Table1[i].ZoneName;
              var getActive = gridList.Table1[i].Active;

              //  GRID ROW
              gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getID + '">';
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getObjectName + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getActivityName + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRemark + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getZoneName + "</div>";
              gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
              gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
              gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" onClick="getActivityId('+getID+',\''+getActivityName+'\')"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep"></label>';
              if(getActive == 'Yes'){
                gridTable = gridTable + ' | </div><label class="switch"> <input type="checkbox" checked onclick="activeActivity(' + getID + ',\'No\',' + getUserId +');"><span class="slider round"></span></label>';
              }
              else{
                gridTable = gridTable + ' | </div><label class="switch"> <input type="checkbox" onclick="activeActivity(' + getID + ',\'Yes\',' + getUserId +');"><span class="slider round"></span></label>';
              }
              
              gridTable = gridTable + '</div>';
              gridTable = gridTable + '</div>';
              gridTable = gridTable + '</div>';
          }
          $("#gridbindActivity").html(gridTable);
          ObjectZoneDDL();
      }

  });
}

function validateRateActivity(){
  var result = "";
  if($("#gridObjectName").val() == "0"){
    result = "Please select Object Name..!";
  }
  else if($("#txtActivityName").val() == ""){
    result = "Please enter Activity Name..!";
  }
  else if($("#txtRemark").val() == ""){
    result = "Please enter Remark..!";
  }
  else if($("#ddlZone").val() == "0"){
    result = "Please select Zone..!";
  }
  return result;
}

function saveRateActivity(){
  var result = validateRateActivity();
  if(result == ""){
    var objectid = $("#gridObjectName").val();
    var activityname = $("#txtActivityName").val();
    var remark = $("#txtRemark").val();
    var zoneid = $("#ddlZone").val();

    var apiPath = wmsApiPath + 'RateCard/addRateActivity';
    var postData = {
        "CompanyId": companyid,
        "UserId": getUserId,
        "CustomerId": CustomerID,
        "ObjectID": objectid,
        "ActivityName": activityname,
        "Remark": remark,
        "ZoneId": zoneid
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.Status;
        if (getStatusCode == 200) {
            alert("Record saved successfully..!")
            RateActivityList(strCurrentPage, searchfilter, searchvalue);
        }
        else{
          var msg = data.Result;
          alert(msg.Message);
        }
    });
  }
  else{
    alert(result);
  }
}

function getActivityId(Id, Name){
    $("#hdnactivityid").val(Id);
    $("#textActType").val(Name);
    $("#wms-srv-ActivityList-popup").off();
    $("#wms-srv-ActivityList-popup").hide();
}

function ObjectZoneDDL() {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getObjectZone';
  var postData = {
      "UserId": getUserId,
      "CustomerId": getCustomerId
  };
  callHttpUrl(apiPath, postData, function (data) {
      var isStatus = data.Status;
      if (isStatus == 200) {
          objectName = [];
          objectid = [];
          $("#gridObjectName").html('<option value="0">--Select--</option>');
          objectName.push('--Select List--');
          objectid.push('0');
          var myGridList = data.Result;
          var grnContainerSize = myGridList.Table;
          if (grnContainerSize.length > 0) {
              for (var i = 0; i < grnContainerSize.length; i++) {
                  var getcatName = grnContainerSize[i].ObjectName;
                  var getcatId = grnContainerSize[i].ID;
                  objectName.push(getcatName);
                  objectid.push(getcatId);
                  $("#gridObjectName").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');

              }
          }

          objectName = [];
          objectid = [];
          $("#ddlZone").html('<option value="0">--Select--</option>');
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
                  $("#ddlZone").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');

              }
          }
      }
  });
}

function SearchActivity(){
  searchfilter = $('#drop-down-search-activity').val();
  searchvalue = $('#text-value-search-activity').val();

  if (searchvalue == '0') {
      alert('Please Enter value for filter');
  }
  else {
    RateActivityList(strCurrentPage,searchfilter, searchvalue);

  }
  if (searchfilter == '' && searchvalue == '') {
    RateActivityList(strCurrentPage,searchfilter, searchvalue);
  }
}

function ZoneList() {
  debugger;
  strCurrentPage = "1";
  var apiPath = wmsApiPath + 'RateCard/getZone';

  var searchfilter = $("#drop-down-search-zone").val();
  var searchvalue = $("#text-value-search-zone").val();

  if (searchfilter == '0') {
      searchfilter = '0';
      searchvalue = '0';
  }
  debugger;

  var postData =
  {
      
      "CustomerId": CustomerID,
      "UserId": getUserId
  }
  callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
          debugger;
          var gridList = data.Result;
         
          $("#gridbindZone").html();
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

          for (var i = 0; i < gridList.Table.length; i++) {
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
          $("#gridbindZone").html(gridTable);
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

function saveZone(){
  var result = validateZone();
  if(result == ""){
    var zonecode = $("#txtZonecode").val();
    var zonename = $("#txtZoneName").val();

    var apiPath = wmsApiPath + 'RateCard/addZone';
    var postData = {
        "CompanyId": companyid,
        "UserId": getUserId,
        "CustomerId": CustomerID,
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

function ZoneDDL() {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getObjectZone';
  var postData = {
      "UserId": getUserId,
      "CustomerId": getCustomerId
  };
  callHttpUrl(apiPath, postData, function (data) {
      var isStatus = data.Status;
      if (isStatus == 200) {
          objectName = [];
          objectid = [];
          $("#ddlZone").html('<option value="0">--Select--</option>');
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
                  $("#ddlZone").append('<option value = "' + getcatId + '" name='+getcatName+'>' + getcatName + '</option>');
              }
          }
      }
  });
}

function activeActivity(getID,isactive,getUID) {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/updateActivityActive';
  var postData = {
      "ID": getID,
      "Active": isactive,
      "UserId": getUID
  }
  callHttpUrl(apiPath, postData, function (data) {
      var getStatusCode = data.Status;
      if (getStatusCode == 200) {
          alert("Activity updated successfully..!")
          RateActivityList(strCurrentPage,searchfilter, searchvalue);
      }
      else{
        alert(getStatusCode.Message);
      }
  });
}

function UnitTypeBillingMethodDDL() {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getUnitType';
  var postData = {
      "UserId": getUserId,
      "CompanyId": companyid
  };
  callHttpUrl(apiPath, postData, function (data) {
      var isStatus = data.Status;
      if (isStatus == 200) {
          objectName = [];
          objectid = [];
          $("#ddlUnitType").html('<option value="0">--Select--</option>');
          objectName.push('--Select List--');
          objectid.push('0');
          var myGridList = data.Result;
          var grnContainerSize = myGridList.Table;
          if (grnContainerSize.length > 0) {
              for (var i = 0; i < grnContainerSize.length; i++) {
                  var getcatName = grnContainerSize[i].Value;
                  var getcatId = grnContainerSize[i].ID;
                  objectName.push(getcatName);
                  objectid.push(getcatId);
                  $("#ddlUnitType").append('<option value = "' + getcatId + '" name=\''+getcatName+'\'>' + getcatName + '</option>');

              }
          }

          objectName = [];
          objectid = [];
          $("#ddlBillingMethod").html('<option value="0">--Select--</option>');
          objectName.push('--Select List--');
          objectid.push('0');
          grnContainerSize = myGridList.Table1;
          if (grnContainerSize.length > 0) {
              for (var i = 0; i < grnContainerSize.length; i++) {
                  var getcatName = grnContainerSize[i].Value;
                  var getcatId = grnContainerSize[i].ID;
                  objectName.push(getcatName);
                  objectid.push(getcatId);
                  $("#ddlBillingMethod").append('<option value = "' + getcatId + '" name=\''+getcatName+'\'>' + getcatName + '</option>');

              }
          }
      }
  });
}

function RateParameterList(getrateid) {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getRateParameterList';

  var searchfilter = $("#drop-down-search-parameter").val();
  var searchvalue = $("#text-value-search-parameter").val();

  if (searchfilter == '0') {
      searchfilter = '0';
      searchvalue = '0';
  }
  debugger;

  var postData =
  {
      "RateId": getrateid,
      "UserId": getUserId
  }
  callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
          debugger;
          var gridList = data.Result;
         
          $("#gridbindRateParameter").html();
          var gridTable = "";

          // HTML Grid Table Header Bind
          gridTable = gridTable + '<div class="wms-srv-grid-header">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Parameter</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Values</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">From</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">To</div>';  
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">From Date</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">To Date</div>'; 
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Effective Date</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><select id="gridParameter" onChange="showInput();" class="wms-srv-grid-cell-input"></select></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
          gridTable = gridTable + '<input type="text" id="txtValue" value="" class="wms-srv-grid-cell-input hidden">';
          gridTable = gridTable + '<div id="dvRadio" class="hidden">';
          gridTable = gridTable + '<input type="radio" id="rbnYes" value="Yes" name="bitValue" class="wms-srv-grid-cell-input"> Yes&nbsp';
          gridTable = gridTable + '<input type="radio" id="rbnNo" value="No" name="bitValue" class="wms-srv-grid-cell-input"> No';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtFrom" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtTo" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" value="" id="txtfromDate" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" value="" id="txttoDate" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" value="" id="txteffectiveDate" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
          gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
          gridTable = gridTable + ' </div><a href="#" title="Save" onClick="saveRateParameter();" class="wms-srv-save"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep"></label>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';

          for (var i = 0; i < gridList.Table.length; i++) {
              var getID = gridList.Table[i].ID;
              var getParameterId = gridList.Table[i].ParameterID;
              var getParameter = gridList.Table[i].Parameter;
              var getValue = gridList.Table[i].Value;
              var getFrom = gridList.Table[i].From;
              var getTo = gridList.Table[i].To;
              var getFromDate = gridList.Table[i].FromDate;
              var getToDate = gridList.Table[i].ToDate;
              var getEffectiveDate = gridList.Table[i].EffectiveDate;

              //  GRID ROW
              gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowRateParameter_' + getID + '">';
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getParameter + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getValue + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getFrom + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getTo + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getFromDate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getToDate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getEffectiveDate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>";
              gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
              gridTable = gridTable + ' </div><a href="#" title="Save" onclick="RateParameterEdit(\'' + getID + '\',\'' + getParameterId + '\',\'' + getValue + '\',\'' + getFrom + '\',\'' + getTo + '\',\'' + getFromDate + '\',\'' + getToDate + '\',\'' + getEffectiveDate + '\',\'' + getrateid + '\');" class="wms-srv-save"><i class="fas fa-edit"></i></a>';
              gridTable = gridTable + '</div>';
              gridTable = gridTable + '</div>';
              gridTable = gridTable + '</div>';
          }
          $("#gridbindRateParameter").html(gridTable);
          $('#wms-srv-RatePayment-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
          RateParameterDDL();
      }

  });
}

function showInput(){
  debugger;
  var datatype = $("#gridParameter option:selected").attr("data-type");

  if(datatype == "Number" || datatype == "String"){
    $("#txtValue").css("display","block");
    $("#dvRadio").hide();
    $("#txtValue").val("");
  }
  else if(datatype == "Bit"){
    $("#txtValue").css("display","none");
    $("#dvRadio").show();
    $("#dvRadio").css("display","inline-flex");
    $('input[name="bitValue"]').prop('checked',false);
  }
  else if(datatype == "0"){
    $("#txtValue").css("display","none");
    $("#dvRadio").hide();
  }
  else{
    $("#txtValue").style.display = "block";
    $("#dvRadio").hide();
    $("#txtValue").val("");
  }
}

function RateParameterDDL() {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getRateParameter';
  var postData = {
      "UserId": getUserId,
      "CompanyId": companyid
  };
  callHttpUrl(apiPath, postData, function (data) {
      var isStatus = data.Status;
      if (isStatus == 200) {
          objectName = [];
          objectid = [];
          $("#gridParameter").html('<option value="0" data-type="0">--Select--</option>');
          objectName.push('--Select List--');
          objectid.push('0');
          var myGridList = data.Result;
          var grnContainerSize = myGridList.Table;
          if (grnContainerSize.length > 0) {
              for (var i = 0; i < grnContainerSize.length; i++) {
                  var getcatName = grnContainerSize[i].Parameter;
                  var getcatId = grnContainerSize[i].ID;
                  var type = grnContainerSize[i].DataType;
                  objectName.push(getcatName);
                  objectid.push(getcatId);
                  $("#gridParameter").append('<option value = "' + getcatId + '" name='+getcatName+' data-type='+type+'>' + getcatName + '</option>');

              }
          }
      }
  });
}

function RateHistoryList(getrateid) {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getRateHistory';

  var postData =
  {
      "RateID": getrateid
  }
  callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
          debugger;
          var gridList = data.Result;
         
          $("#gridRateHistory").html();
          var gridTable = "";

          // HTML Grid Table Header Bind
          gridTable = gridTable + '<div class="wms-srv-grid-header">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Rate</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Start Date</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">End Date</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Effective Date</div>';  
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Changed By</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Changed Date</div>'; 
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Changed Rate</div>';
          gridTable = gridTable + '</div>';

          for (var i = 0; i < gridList.Table.length; i++) {
              var getRate = gridList.Table[i].Rate;
              var getChangeRate = gridList.Table[i].ChangeRate;
              var getStartDate = gridList.Table[i].StartDate;
              var getEndDate = gridList.Table[i].EndDate;
              var getEffectiveDate = gridList.Table[i].EffectiveDate;
              var getChangeBy = gridList.Table[i].ChangeBy;
              var getChangeDate = gridList.Table[i].ChangeDate;

              //  GRID ROW
              gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getStartDate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getEndDate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getEffectiveDate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getChangeBy + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getChangeDate + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getChangeRate + "</div>";
              gridTable = gridTable + '</div>';
          }
          $("#gridRateHistory").html(gridTable);
      }

  });
}

function showActiveNamePopupListEdit()
{
  debugger;
  var name = "";
  var code = "";
  var apiPath = wmsApiPath + 'RateCard/getAccountName';
  var getObject = $("#ddlaccounttypeedit").val();
  if(getObject !=0)
  {
    if(getObject =="Vendor")
    {
      name = "Vendor Name";
      code = "Vendor Code";
    }
    else if(getObject == "Client")
    {
      name = "Client Name";
      code = "Client Code";
    }
    else if(getObject == "Customer")
    {
      name = "Customer Name";
      code = "Customer Code";
    }
  $("#showGridAccountName").html('');
  var gridList = "";
  var postData =
  {
      "ActivityType": getObject, 
      "CompanyId": companyid,
      "UserId": getUserId
  }
  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    if (getStatus == 200) {
        debugger;
        var gridData = data.Result;

        // HTML Grid Table Header Bind
        gridList = gridList + '<div class="wms-srv-grid-header">';
        gridList = gridList + '<div class="wms-srv-grid-cell " style="text-align:center">'+name+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell " style="text-align:center">'+code+'</div>';
        gridList = gridList + '<div class="wms-srv-grid-cell " style="text-align:center">Action</div>';
        gridList = gridList + '</div>';

        for (var i = 0; i < gridData.Table.length; i++) {
            var getID = gridData.Table[i].ID;
            var getName = gridData.Table[i].Name;
            var getCode = gridData.Table[i].Code;
            
            //  GRID ROW
            gridList = gridList + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getID + '">';
            gridList = gridList + '<div class="wms-srv-grid-cell" style="text-align:center">'+getName+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell" style="text-align:center">'+getCode+'</div>';
            gridList = gridList + '<div class="wms-srv-grid-cell" >';
            gridList = gridList + '<div class="wms-srv-grid-action">';
            gridList = gridList + '<a href="#" title="Save" class="wms-srv-save" onClick="getAccountIdEdit('+getID+',\'' + getName + '\');"><i class="fas fa-check-circle"></i></a>';                                           
            gridList = gridList + '</div>';
            gridList = gridList + '</div>';
            gridList = gridList + '</div>';
        }
        $("#showGridAccountName").html(gridList);
    }
  });

      $("#showGridAccountName").append(gridList);
      $("#wms-srv-AccountName-popup").show();
      $("#wms-srv-AccountName-popup-close").click(function()
      {
          $("#wms-srv-AccountName-popup").hide();
      });
}
else
{
  alert("Please select Account Type..!!");
}

}

function getAccountIdEdit(Id, Name){
  debugger;
  $("#hdnaccidedit").val(Id);
  $("#txtAccountNameedit").val(Name);
  $("#wms-srv-AccountName-popup").hide();
}

function showActivityListEdit()
{
    RateActivityListEdit();
    $("#wms-srv-ActivityList-popup").show();
    $("#wms-srv-ActivityList-popup-close").click(function()
    {
        $("#wms-srv-ActivityList-popup").off();
        $("#wms-srv-ActivityList-popup").hide();
    });
}

function RateActivityListEdit(strCurrentPage, searchfilter, searchvalue) {
  debugger;
  strCurrentPage = "1";
  var apiPath = wmsApiPath + 'RateCard/getActivityType';

  var searchfilter = $("#drop-down-search-activity").val();
  var searchvalue = $("#text-value-search-activity").val();

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
      "UserId": getUserId,
      "Search": searchfilter,
      "Filter": searchvalue
  }
  callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
          debugger;
          var gridList = data.Result;

          var getTotalRecords = gridList.Table[0].TotalRecord;
          var strCurrentPage = gridList.Table[0].CurrentPage;
          $("#gridbindActivity").html();
          var gridTable = "";

          // HTML Grid Table Header Bind
          gridTable = gridTable + '<div class="wms-srv-grid-header">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Object</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Activity Name</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Remark</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Zone</div>';  
          gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align" style="text-align: center;">Action</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><select id="gridObjectName" class="wms-srv-grid-cell-input"></select></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtActivityName" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><input type="text" id="txtRemark" value="" class="wms-srv-grid-cell-input"></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;"><div class="wms-srv-suggestion-holder"><select id="ddlZone"></select><a href="#" onclick="showZoneMaster();return false;"><i class="fas fa-plus-circle btnAddEmailInToField"></i></a><input type="hidden" data-prefix="SESKU" id="texthdnFromLocationID" value="" class="wms-srv-grid-cell-input notranslate"></div></div>';
          gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
          gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
          gridTable = gridTable + ' </div><a href="#" title="Save" class="wms-srv-save" onClick="saveRateActivity();"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep"></label>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';
          gridTable = gridTable + '</div>';

          for (var i = 0; i < gridList.Table1.length; i++) {
              var getID = gridList.Table1[i].ID;
              var getObjectID = gridList.Table1[i].ObjectID;
              var getObjectName = gridList.Table1[i].ObjectName;
              var getActivityName = gridList.Table1[i].ActivityName;
              var getRemark = gridList.Table1[i].Remark;
              var getZoneID = gridList.Table1[i].ZoneID;
              var getZoneName = gridList.Table1[i].ZoneName;
              var getActive = gridList.Table1[i].Active;

              //  GRID ROW
              gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getID + '">';
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getObjectName + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getActivityName + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getRemark + "</div>";
              gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'>" + getZoneName + "</div>";
              gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">';
              gridTable = gridTable + '<div class="wms-srv-grid-action" style="text-align: center;">';
              gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" onClick="getActivityIdEdit('+getID+',\''+getActivityName+'\')"><i class="fas fa-check-circle"></i></a><div class="wms-srv-action-sep"></label>';
              if(getActive == 'Yes'){
                gridTable = gridTable + ' | </div><label class="switch"> <input type="checkbox" checked onclick="activeActivity(' + getID + ',\'No\',' + getUserId +');"><span class="slider round"></span></label>';
              }
              else{
                gridTable = gridTable + ' | </div><label class="switch"> <input type="checkbox" onclick="activeActivity(' + getID + ',\'Yes\',' + getUserId +');"><span class="slider round"></span></label>';
              }
              
              gridTable = gridTable + '</div>';
              gridTable = gridTable + '</div>';
              gridTable = gridTable + '</div>';
          }
          $("#gridbindActivity").html(gridTable);
          ObjectZoneDDL();
      }

  });
}

function getActivityIdEdit(Id, Name){
  $("#hdnactivitytypeidedit").val(Id);
  $("#txtActivityTypeedit").val(Name);
  $("#wms-srv-ActivityList-popup").off();
  $("#wms-srv-ActivityList-popup").hide();
}

function UnitTypeBillingMethodDDLEdit() {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getUnitType';
  var postData = {
      "UserId": getUserId,
      "CompanyId": companyid
  };
  callHttpUrl(apiPath, postData, function (data) {
      var isStatus = data.Status;
      if (isStatus == 200) {
          objectName = [];
          objectid = [];
          $("#ddlUnitTypeedit").html('<option value="0">--Select--</option>');
          objectName.push('--Select List--');
          objectid.push('0');
          var myGridList = data.Result;
          var grnContainerSize = myGridList.Table;
          if (grnContainerSize.length > 0) {
              for (var i = 0; i < grnContainerSize.length; i++) {
                  var getcatName = grnContainerSize[i].Value;
                  var getcatId = grnContainerSize[i].ID;
                  objectName.push(getcatName);
                  objectid.push(getcatId);
                  $("#ddlUnitTypeedit").append('<option value = "' + getcatId + '" name=\''+getcatName+'\'>' + getcatName + '</option>');

              }
          }

          objectName = [];
          objectid = [];
          $("#ddlBillMethodedit").html('<option value="0">--Select--</option>');
          objectName.push('--Select List--');
          objectid.push('0');
          grnContainerSize = myGridList.Table1;
          if (grnContainerSize.length > 0) {
              for (var i = 0; i < grnContainerSize.length; i++) {
                  var getcatName = grnContainerSize[i].Value;
                  var getcatId = grnContainerSize[i].ID;
                  objectName.push(getcatName);
                  objectid.push(getcatId);
                  $("#ddlBillMethodedit").append('<option value = "' + getcatId + '" name=\''+getcatName+'\'>' + getcatName + '</option>');

              }
          }
      }
  });
}

function setSelectedTextByValue(selectElement, value) {
  for (let i = 0; i < selectElement.options.length; i++) {
    var a = selectElement.options[i].value;
    if (selectElement.options[i].value === value) {
      selectElement.selectedIndex = i;
      break;
    }
  }
}

function GetRateDetailById(rateid)
{
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getRateDetailById';
  var postData = {
      "ID": rateid
  };
  callHttpUrl(apiPath, postData, function (data) {
      var isStatus = data.Status;
      if (isStatus == 200) {
          
          var myGridList = data.Result;
          var getData = myGridList.Table;
          if (getData.length > 0) {
              var getAccountType = getData[0].AccountType;
              var getAccountName = getData[0].AccountName;
              var getAccountID = getData[0].AccountID;
              var getActivityTypeID = getData[0].ActivityTypeID;
              var getActivityName = getData[0].ActivityName;
              var getERPCode = getData[0].ERPCode;
              var getRateTitle = getData[0].RateTitle;
              var getRate = getData[0].Rate;
              var getRateForUnit = getData[0].RateForUnit;
              var getUnitTypeID = getData[0].UnitTypeID;
              var getBillingFrequency = getData[0].BillingFrequency;
              var getBillingMethodID = getData[0].BillingMethodID;
             
              const ddlaccounttypeedit = document.getElementById('ddlaccounttypeedit');
              setSelectedTextByValue(ddlaccounttypeedit, getAccountType);

              const ddlBillFreqncyedit = document.getElementById('ddlBillFreqncyedit');
              setSelectedTextByValue(ddlBillFreqncyedit, getBillingFrequency);
              
              $("#hdnRateID").val(rateid);
              $("#ddlUnitTypeedit").val(getUnitTypeID);
              $("#ddlBillMethodedit").val(getBillingMethodID);
              $("#txtAccountNameedit").val(getAccountName);
              $("#hdnaccidedit").val(getAccountID);
              $("#txtActivityTypeedit").val(getActivityName);
              $("#hdnactivitytypeidedit").val(getActivityTypeID);
              $("#txtERPCodeedit").val(getERPCode);
              $("#txtRateTitleedit").val(getRateTitle);
              $("#txtRateedit").val(getRate);
              $("#txtRateForUnitedit").val(getRateForUnit);
          }
      }
  });
}

function validateRateCardEdit(){
  var result = "";
  if($("#hdnactivitytypeidedit").val()=="0")
  {
    result = "Please select Activity Type..!";
  }
  else if($("#hdnaccidedit").val() == "0")
  {
    result = "Please select Account Name..!";
  }
  else if($("#txtERPCodeedit").val()=="")
  {
    result = "Please enter ERP code..!";
  }
  else if($("#txtRateTitleedit").val()=="")
  {
    result = "Please enter Rate Title..!";
  }
  else if($("#txtRateedit").val()=="")
  {
    result = "Please enter Rate..!";
  }
  else if($("#txtRateForUnitedit").val()=="")
  {
    result = "Please enter Rate for unit..!";
  }
  else if($("#ddlUnitTypeedit").val()=="0")
  {
    result = "Please select unit type..!";
  }
  else if($("#ddlBillFreqncyedit").val()=="0")
  {
    result = "Please select Billing frequency..!";
  }
  else if($("#ddlBillMethodedit").val()=="0")
  {
    result = "Please select Billing method..!";
  }
  return result;
}

function saveRateCardEdit(){
  debugger;
  var result = validateRateCardEdit();
  if(result == ""){
    var rateid = $("#hdnRateID").val();
    var accounttype = $("#ddlaccounttypeedit option:selected").text();
    var accountid = $("#hdnaccidedit").val();
    var accountname = $("#txtAccountNameedit").val();
    var activityid = $("#hdnactivitytypeidedit").val();
    var erpcode = $("#txtERPCodeedit").val();
    var ratetitle = $("#txtRateTitleedit").val();
    var rate = $("#txtRateedit").val();
    var rateforunit = $("#txtRateForUnitedit").val();
    var unittypeid = $("#ddlUnitTypeedit").val()
    var billfreqncy = $("#ddlBillFreqncyedit option:selected").text();
    var billmethodid = $("#ddlBillMethodedit").val();

    var apiPath = wmsApiPath + 'RateCard/addRateCard';
    var postData = {
        "ID": rateid,
        "AccountType": accounttype,
        "AccountName": accountname,
        "AccountTypeID": accountid,
        "ActivityTypeID": activityid,
        "ERPCode": erpcode,
        "RateTitle": ratetitle,
        "Rate": rate,
        "RateForUnit": rateforunit,
        "UnitTypeID": unittypeid,
        "BillFrequency": billfreqncy,
        "BillMethodID": billmethodid,
        "BillGroup": "",
        "CompanyID": companyid,
        "UserID": getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.Status;
        if (getStatusCode == 200) {
            alert("Record saved successfully..!")
            $("#hdnaccidedit").val("0");
            $("#hdnactivitytypeidedit").val("0");
            clearData();
            $("#wms-srv-EditRateMaster-popup").hide();
            RateCardList(strCurrentPage, searchfilter, searchvalue);
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

function clearData(){
    $("#hdnRateID").val("0");
    $("#ddlaccounttypeedit").val("0");
    $("#hdnaccidedit").val("0");
    $("#txtAccountNameedit").val("");
    $("#hdnactivitytypeidedit").val("0");
    $("#txtERPCodeedit").val("");
    $("#txtRateTitleedit").val("");
    $("#txtRateedit").val("");
    $("#txtRateForUnitedit").val("");
    $("#ddlUnitTypeedit").val("0")
    $("#ddlBillFreqncyedit").val("0");
    $("#ddlBillMethodedit").val("0");
}

function validateRateParameter(){
  debugger;
  var result="";
  var datatype = $("#gridParameter option:selected").attr("data-type");
  if($("#gridParameter").val() == "0"){
    result = "Please select parameter..!";
  }
  else if((datatype == "Number" || datatype == "String") && $("#txtValue").val() == ""){
    result = "Please enter value..!";
  }
  else if(datatype == "Bit" && $('input[name="bitValue"]:checked').val() == undefined){   
    result = "Please select value..!";
  }
  else if($("#txtFrom").val() == ""){
    result = "Please enter from value..!";
  }
  else if($("#txtTo").val() == ""){
    result = "Please enter To value..!";
  }
  else if($("#txtfromDate").val() == ""){
    result = "Please select from date..!";
  }
  else if($("#txttoDate").val() == ""){
    result = "Please select to date..!";
  }
  else if($("#txteffectiveDate").val() == ""){
    result = "Please select effective date..!";
  }
  return result;
}

function saveRateParameter(){
  debugger;
  var result = validateRateParameter();
  if(result == ""){
    var Value = "";
    var datatype = $("#gridParameter option:selected").attr("data-type");
    if(datatype == "Number" || datatype == "String"){
      Value = $("#txtValue").val();
    }
    else if(datatype == "Bit"){
      Value = $('input[name="bitValue"]:checked').val();
    }
    else{
      Value = $("#txtValue").val();
    }

    var rateid = $("#hdnRateIdParam").val();
    var gridParameter = $("#gridParameter").val();
    var From = $("#txtFrom").val();
    var To = $("#txtTo").val();
    var fromDate = $("#txtfromDate").val();
    var toDate = $("#txttoDate").val();
    var effectiveDate = $("#txteffectiveDate").val();

    var apiPath = wmsApiPath + 'RateCard/addRateParameter';
    var postData = {
        "ID": "0",
        "RateID": rateid,
        "ParameterID": gridParameter,
        "Value": Value,
        "From": From,
        "To": To,
        "FromDate": fromDate,
        "ToDate": toDate,
        "EffectiveDate": effectiveDate,
        "CustomerID": CustomerID,
        "CompanyID": companyid,
        "UserID": getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.Status;
        if (getStatusCode == 200) {
            alert("Record saved successfully..!")           
            RateParameterList(rateid)
        }
        else{
          var msg = data.Result;
          alert(msg.Message);
        }
    });
  }
  else{
    alert(result);
  }
}

function RateParameterEdit(id, parameterid, value, from, to, fromdate, todate, effectiovedate, rateid) {
	debugger;
	
	var gridHead = '';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<select class="wms-srv-grid-cell-input" id="ddlRateParameterEdit" onChange="showInputEdit();"></select>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	//gridHead = gridHead + '<input type="text" class="wms-srv-grid-cell-input" id="txtValueEdit" value="' + value + '"/>';
  gridHead = gridHead + '<input type="text" id="txtValueEdit" value="" class="wms-srv-grid-cell-input hidden">';
  gridHead = gridHead + '<div id="dvRadioEdit" class="hidden">';
  gridHead = gridHead + '<input type="radio" id="rbnYes" value="Yes" name="bitValueEdit" class="wms-srv-grid-cell-input"> Yes&nbsp';
  gridHead = gridHead + '<input type="radio" id="rbnNo" value="No" name="bitValueEdit" class="wms-srv-grid-cell-input"> No';
  gridHead = gridHead + '</div>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" class="wms-srv-grid-cell-input" id="txtFromEdit" value="' + from + '"/>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" class="wms-srv-grid-cell-input" id="txtToEdit" value="' + to + '"/>';
	gridHead = gridHead + '</div>';
  gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" value="'+fromdate+'" id="txtfromDateEdit" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly>';
	gridHead = gridHead + '</div>';
  gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" value="'+todate+'" id="txttoDateEdit" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly>';
	gridHead = gridHead + '</div>';
  gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<input type="text" value="'+effectiovedate+'" id="txteffectiveDateEdit" class="wms-srv-grid-cell-input wms-srv-datepicker" readonly>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '<div class="wms-srv-grid-cell">';
	gridHead = gridHead + '<div class="wms-srv-grid-action">';
	gridHead = gridHead + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="saveRateParameterEdit('+id+','+rateid+');">';
	gridHead = gridHead + '<i class="fas fa-check-circle" style="color:black !important"></i></a>';
	gridHead = gridHead + '<div class="wms-srv-action-sep">|</div>';
	gridHead = gridHead + '<a href="#" title="Cancel" class="wms-srv-cancel" data-prefix="CN" onclick="RateParameterEditHide(' + id + ','+rateid+');">';
	gridHead = gridHead + '<i class="fas fa-times-circle"></i></a>';
	gridHead = gridHead + '</div>';
	gridHead = gridHead + '</div>';
	$("#RowRateParameter_" + id).html(gridHead);
  $('#wms-srv-RatePayment-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
  RateParameterDDLEdit(parameterid);
}

function showInputEdit(){
  debugger;
  var datatype = $("#ddlRateParameterEdit option:selected").attr("data-type");

  if(datatype == "Number" || datatype == "String"){
    $("#txtValueEdit").css("display","block");
    $("#dvRadioEdit").hide();
    $("#txtValueEdit").val("");
  }
  else if(datatype == "Bit"){
    $("#txtValueEdit").css("display","none");
    $("#dvRadioEdit").show();
    $("#dvRadioEdit").css("display","inline-flex");
    $('input[name="bitValueEdit"]').prop('checked',false);
  }
  else if(datatype == "0"){
    $("#txtValueEdit").css("display","none");
    $("#dvRadioEdit").hide();
  }
  else{
    $("#txtValueEdit").style.display = "block";
    $("#dvRadioEdit").hide();
    $("#txtValueEdit").val("");
  }
}

function RateParameterDDLEdit(parameterid) {
  debugger;
  var apiPath = wmsApiPath + 'RateCard/getRateParameter';
  var postData = {
      "UserId": getUserId,
      "CompanyId": companyid
  };
  callHttpUrl(apiPath, postData, function (data) {
      var isStatus = data.Status;
      if (isStatus == 200) {
          objectName = [];
          objectid = [];
          $("#ddlRateParameterEdit").html('<option value="0">--Select--</option>');
          objectName.push('--Select List--');
          objectid.push('0');
          var myGridList = data.Result;
          var grnContainerSize = myGridList.Table;
          if (grnContainerSize.length > 0) {
              for (var i = 0; i < grnContainerSize.length; i++) {
                  var getcatName = grnContainerSize[i].Parameter;
                  var getcatId = grnContainerSize[i].ID;
                  var type = grnContainerSize[i].DataType;
                  objectName.push(getcatName);
                  objectid.push(getcatId);
                  $("#ddlRateParameterEdit").append('<option value = "' + getcatId + '" name='+getcatName+' data-type='+type+'>' + getcatName + '</option>');

              }
          }
      }
  });
  $("#ddlRateParameterEdit").val(parameterid);
}

function validateRateParameterEdit(){
  var result="";
  var datatype = $("#ddlRateParameterEdit option:selected").attr("data-type");
  if($("#ddlRateParameterEdit").val() == "0"){
    result = "Please select parameter..!";
  }
  else if((datatype == "Number" || datatype == "String") && $("#txtValue").val() == ""){
    result = "Please enter value..!";
  }
  else if(datatype == "Bit" && $('input[name="bitValueEdit"]:checked').val() == undefined){   
    result = "Please select value..!";
  }
  else if($("#txtFromEdit").val() == ""){
    result = "Please enter from value..!";
  }
  else if($("#txtToEdit").val() == ""){
    result = "Please enter To value..!";
  }
  else if($("#txtfromDateEdit").val() == ""){
    result = "Please select from date..!";
  }
  else if($("#txttoDateEdit").val() == ""){
    result = "Please select to date..!";
  }
  else if($("#txteffectiveDateEdit").val() == ""){
    result = "Please select effective date..!";
  }
  return result;
}

function saveRateParameterEdit(id, rateid){
  debugger;
  var result = validateRateParameterEdit();
  if(result == ""){
    var Value = "";
    var datatype = $("#ddlRateParameterEdit option:selected").attr("data-type");
    if(datatype == "Number" || datatype == "String"){
      Value = $("#txtValueEdit").val();
    }
    else if(datatype == "Bit"){
      Value = $('input[name="bitValueEdit"]:checked').val();
    }
    else{
      Value = $("#txtValueEdit").val();
    }

    var gridParameter = $("#ddlRateParameterEdit").val();
    var From = $("#txtFromEdit").val();
    var To = $("#txtToEdit").val();
    var fromDate = $("#txtfromDateEdit").val();
    var toDate = $("#txttoDateEdit").val();
    var effectiveDate = $("#txteffectiveDateEdit").val();

    var apiPath = wmsApiPath + 'RateCard/addRateParameter';
    var postData = {
        "ID": id,
        "RateID": rateid,
        "ParameterID": gridParameter,
        "Value": Value,
        "From": From,
        "To": To,
        "FromDate": fromDate,
        "ToDate": toDate,
        "EffectiveDate": effectiveDate,
        "CustomerID": CustomerID,
        "CompanyID": companyid,
        "UserID": getUserId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatusCode = data.Status;
        if (getStatusCode == 200) {
            alert("Record updated successfully..!")           
            RateParameterList(rateid)
        }
        else{
          var msg = data.Result;
          alert(msg.Message);
        }
    });
  }
  else{
    alert(result);
  }
}

function RateParameterEditHide(Id,rateid) {

	$("#RowRateParameter_" + Id).html('');
	RateParameterList(rateid);
}
