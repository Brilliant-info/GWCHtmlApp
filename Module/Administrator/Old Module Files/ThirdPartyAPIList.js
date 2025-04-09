var gridTable = "";

const UserId = mBrillWmsSession.getUserId(); 
const WarehouseId = mBrillWmsSession.getWarehouseId() 
const CustomerId = mBrillWmsSession.getCustomerId(); 
const CompanyId =  mBrillWmsSession.getCompanyId(); 

function initThirdPartyAPIList(){
    ThirdPartyAPIList();
}
   
  function ThirdPartyAPIList() {
     debugger;
    //var apiPath = wmsApiPath + 'APITP/getAPITPList';
    var apiPath = "http://localhost:50068/api/staging/v1/APITP/getAPITPList";
   // var getBusinessCode = $("#txtBusinessCode").text();
    var postData =
    {
      "CustomerId": CustomerId,
      "CompnayId": CompanyId,
       "UserId": UserId
    }
    callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
  
        var gridList = data.Result;
  
        $('#ThirdpartyGridList').html('');
        var tablerows = '';
        // HTML Grid Table Header Bind
  
        tablerows = tablerows + '<div class="wms-srv-grid-header">'
        // tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">API</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">API Code</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">API Name</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Description</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Method</div>'
        // tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">API Key</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Application</div>'
      //  tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Remark</div>'
        tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">Action</div>'
        tablerows = tablerows + '</div>'
  
  
        for (var i = 0; i < gridList.Table.length; i++) {
          debugger;
          var getID = gridList.Table[i].ID;
          var getAPI_Code = gridList.Table[i].API_Code;
          var getAPI_Name = gridList.Table[i].API_Name;
          var getMETHOD = gridList.Table[i].METHOD;
          var getAPIKEYS = gridList.Table[i].APIKEYS;
          var getActive = gridList.Table[i].ISACTIVE;
          var getApplication = gridList.Table[i].Application;
          var getWEBHook = gridList.Table[i].WEBHook;
          var getREMARKS = gridList.Table[i].REMARKS;
          var getAPI= gridList.Table[i].API;
  
          // if(getActive == "YES")
          // {
          //   $("#check").prop('checked')
  
          // }
  
          tablerows = tablerows + '<div class="wms-srv-grid-row wms-align" id="RowParameter">';
          // tablerows = tablerows + '<div class="wms-srv-grid-cell">' + getAPI + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">' + getAPI_Code + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell"  style="text-align:center">'+ getAPI_Name + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">' + getREMARKS + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">' + getMETHOD + '</div>';
          // tablerows = tablerows + '<div class="wms-srv-grid-cell">' + getAPIKEYS + '</div>';
          tablerows = tablerows + '<div class="wms-srv-grid-cell" style="text-align:center">' + getApplication + '</div>';
          
         // tablerows = tablerows + '<div class="wms-srv-grid-cell"><input class="wms-srv-grid-cell-input" type="text" id="txtremark" value=""></input> </div>';
         
          tablerows = tablerows+ '<div class="wms-srv-grid-cell" style="text-align: center;">'
          tablerows = tablerows + '<a href="#" title="Save" data-status=" "  onclick= saveAPIList(\''+ getID +'\',\''+ getAPI +'\',\''+ getMETHOD +'\',\''+ getAPIKEYS +'\')> <i class="fas fa-check-circle" ;></i> </span></a> </div>';


          tablerows = tablerows + '</div>';
  
        }
  
        $('#ThirdpartyGridList').html(tablerows);
      }
      else {
        alert('unable to conect server');
      }
    });
  }
  
  function saveAPIList(getID,getAPI,getMETHOD,getAPIKEYS) {
    debugger;
    //  var getID = '0';
    // var yes = "YES";
    // var no = "NO";
   // var apiPath = wmsApiPath + 'APITP/APITPSave';
    var Remarks="";
    getremark = $("#txtremark").val(); 

    var apiPath = "http://localhost:50068/api/staging/v1/APITP/APITPSave";

    // var getActive = $("#chk_" + getID).is(":checked");
    // var getBusinessCode = $("#txtBusinessCode").val();
    //  getBusinessCode = getBusinessRulecode;
    // if (getActive) {
    //   getActive = yes;
    // }
    // else {
    //   getActive = no;
    // }
  
    var postData =
    {
      "Id": getID,
      "API": getAPI,
      "Method": getMETHOD,
      "APIKeys": getAPIKEYS,    
      "CompnayId": CompanyId,
      "CustomerId": CustomerId,
      "WarehouseId": WarehouseId,
      "IsActive": '1',

      "Remarks": 'TEST',
      //"Remarks":getremark,

      "UserId": UserId

    }
    callHttpUrl(apiPath, postData, function (data) {
      var getStatus = data.Status;
      if (getStatus == 200) {
  
        var gridList = data.Result;
        alert("You have Successfully Activated API");
        Remarks="";
      }
      else {
        alert("Error Occur");
      }
    });
  }
  
  
  
  
  