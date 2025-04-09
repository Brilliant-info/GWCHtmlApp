var gridTable = "";
var UserId = mBrillWmsSession.getUserId(); //mBrillWmsSession.getUserId();
var WarehouseId = $('#ddlwarehouse').val(); //mBrillWmsSession.getWarehouseId();
var CustomerId = $("#ddlcustomer").val(); //mBrillWmsSession.getCustomerId();
var CompanyId =  mBrillWmsSession.getCompanyId(); 

function initBusinessRule(){
    BusinessRuleList();
}
   
  function BusinessRuleList() {
     debugger;
    var apiPath = wmsApiPath + 'BusinessRule/GetBusinessRuleList';
    var getBusinessCode = $("#txtBusinessCode").text();
    var postData =
    {
      "CompanyID": CompanyId,
      "CustomerID": CustomerId,
      "WarehouseID": WarehouseId,
      "CreatedBy": UserId
    }
    callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
  
        var gridList = data.Result;
  
        $('#BusinessGridList').html('');
        var tablerows = '';
        // HTML Grid Table Header Bind
  
        tablerows = tablerows + '<div class="wms-srv-grid-header">'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Customer Name</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Business Rule Code</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Business Rule</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Business Rule Description</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Module</div>'
        tablerows = tablerows + ' <div class="wms-srv-grid-cell" style="text-align:center">Active</div>'
        tablerows = tablerows + '</div>'
  
  
        for (var i = 0; i < gridList.Table.length; i++) {
          debugger;
          var getID = gridList.Table[i].ID;
          var getBusinessRulecode = gridList.Table[i].BusinessRulecode;
          var getBusinessRuleName = gridList.Table[i].BusinessRuleName;
          var getDescription = gridList.Table[i].Description;
          var getModule = gridList.Table[i].Module;
          var getActive = gridList.Table[i].Active;
          var getCustomerName = gridList.Table[i].CustomerName;
          var allowOrNotEdit = gridList.Table[i].IETransaction;
  
          // if(getActive == "YES")
          // {
          //   $("#check").prop('checked')
  
          // }
  
          tablerows = tablerows + '<div class="wms-srv-grid-row wms-align" id="RowParameter">';
          tablerows = tablerows + '<div class="wms-srv-grid-cell">' + getCustomerName + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell" value="' + getBusinessRulecode + '" id="txtBusinessCode">' + getBusinessRulecode + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell">' + getBusinessRuleName + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell">' + getDescription + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell">' + getModule + '</div>';
          //tablerows =  tablerows + '<div class="wms-srv-grid-cell"><input type="checkbox" id="cheStatus" id="check" class="wms-srv-grid-cell-input checkStatus" onclick="saveBusinessRule('+getBusinessRulecode+');"/></div>';
          
          if(allowOrNotEdit=='NoTransaction')
          {
          if (getActive == "YES") {
            tablerows = tablerows + '<div class="wms-srv-grid-cell"><input type="checkbox" enabled="true" class="wms-srv-grid-cell-input checkSts" value="' + getActive + '" id="chk_' + getID + '" onchange="saveBusinessRule( \'' + getBusinessRulecode + '\',\'' + getID + '\');" checked="checked"></div>';
          }
          else {
            tablerows = tablerows + '<div class="wms-srv-grid-cell"><input type="checkbox" enabled="true" class="wms-srv-grid-cell-input checkSts" value="' + getActive + '" id="chk_' + getID + '" onchange="saveBusinessRule( \'' + getBusinessRulecode + '\',\'' + getID + '\');"></div>';  
          }
         }
         else{
          if (getActive == "YES") {
            tablerows = tablerows + '<div class="wms-srv-grid-cell"><input type="checkbox" disabled="true" class="wms-srv-grid-cell-input checkSts" value="' + getActive + '" id="chk_' + getID + '" onchange="saveBusinessRule( \'' + getBusinessRulecode + '\',\'' + getID + '\');" checked="checked"></div>';
          }
          else {
            tablerows = tablerows + '<div class="wms-srv-grid-cell"><input type="checkbox" disabled="true" class="wms-srv-grid-cell-input checkSts" value="' + getActive + '" id="chk_' + getID + '" onchange="saveBusinessRule( \'' + getBusinessRulecode + '\',\'' + getID + '\');"></div>';  
          }
         }
          tablerows = tablerows + '</div>';
  
        }
  
        $('#BusinessGridList').html(tablerows);
      }
      else {
        alert('unable to conect server');
      }
    });
  }
  
  function saveBusinessRule(getBusinessRulecode, getID) {
    debugger;
    var yes = "YES";
    var no = "NO";
    var apiPath = wmsApiPath + 'BusinessRule/SaveBusinessRule';
    var getActive = $("#chk_" + getID).is(":checked");
    var getBusinessCode = $("#txtBusinessCode").val();
     getBusinessCode = getBusinessRulecode;
    if (getActive) {
      getActive = yes;
    }
    else {
      getActive = no;
    }
  
    var postData =
    {
      "CompanyID": CompanyId,
      "CustomerID": CustomerId,
      "WarehouseID": WarehouseId,
      "CreatedBy": UserId,
      "BusinessCode": getBusinessCode,
      "Active": getActive
    }
    callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
  
        var gridList = data.Result;
       // alert("You have Successfully Actived");
      }
      else {
        alert("Error");
      }
    });
  }
  
  
  
  
  