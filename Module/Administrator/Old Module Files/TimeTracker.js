

//var apiFolder = 'http://173.212.244.46/WebAPITest/';
//var apiFolder = 'http://localhost:50068/';
//var wmsApiPath = apiFolder + 'api/staging/v1/';

var strCurrentPage = '1'; //paging var declare
var getTotalRecords = '5'; ////paging var declare
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

var ObjectClientPara = "Client";
function initTimeTracker(){

    $("#pnlTimeTrackerMaster").show();
   
    $("#txtStartDatePick").datepicker();
    $("#txtEndDatePick").datepicker();

    $('.wms-srv-switch-on, .wms-srv-switch-off').click(function () {
      var isOn = $(this).hasClass('wms-srv-switch-on');
      if (isOn) {
          $(this).removeClass('wms-srv-switch-on');
          $(this).addClass('wms-srv-switch-off');
      } else {
          $(this).removeClass('wms-srv-switch-off');
          $(this).addClass('wms-srv-switch-on');
      }
  });

  $('.fa-lock, .fa-lock-open').click(function () {
      var isOn = $(this).hasClass('fa-lock-open');
      if (isOn) {
          $(this).removeClass('fa-lock-open');
          $(this).addClass('fa-lock');
      } else {
          $(this).removeClass('fa-lock');
          $(this).addClass('fa-lock-open');
      }
  });

  $("#wms-srv-WarehouseList-popup-close").click(function () {
      $("#wms-srv-Opn-WarehouseList-popup").hide();
  })   
  
  $("#wms-srv-formlocation-popup-close").click(function () {
      $("#wms-srv-formlocation-popup").hide();
  }) 

  $("#wms-srv-Customer-popup-close").click(function () {
      $("#wms-srv-Opn-Customer-popup").hide();
  })

  $("#wms-srv-formallcustomer-popup-close").click(function () {
      $("#wms-srv-formallcustomer-popup").hide();
  }) 

  $("#wms-srv-Client-popup-close").click(function () {
      $("#wms-srv-Opn-Client-popup").hide();
  })

  $("#wms-srv-formallClient-popup-close").click(function () {
      $("#wms-srv-formallClient-popup").hide();
  })
  

  $("#wms-srv-roleMaster-popup-close").click(function () {
      $("#wms-srv-Opn-RoleMaster-popup").hide();
  })
  $("#hideGridEditRow").click(function () {
      $("#gridValues").hide();
      $("#editGridValues").show();
  });
  $('.gridRoleMaster i').click(function () {
      var getOpacity = $(this).css('opacity');
      if (getOpacity == 1) {
          $(this).css('opacity', '0.2');
      } else {
          $(this).css('opacity', '1');
      }
  });

  $(".administratorview").click(function () {
      $('#wms-aministratorview-grid').show();
      $("#wms-userview_grid").hide();

  });
  
  $(".userview").click(function () {
      $("#wms-userview_grid").show();
      $('#wms-aministratorview-grid').hide();
  });
  getuserlist(strCurrentPage,searchfilter,searchvalue);
 // usertype();
}


function editLabourDetails(getId)
{
    debugger;
    $("#gridLabourRow_"+getId).html('');
    var gridList = "";
    //gridList = gridList +'<div class="wms-srv-grid-row wms-align" id="gridLabourRow_'+ getId+'">';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="Vendor 4"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="LR0012"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="John"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="8595"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="12059"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="01/01/2024"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="15/02/2024"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="Morning"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell"><input Type="text" class="wms-srv-grid-cell-input" value="LR1d"></div>';
    gridList = gridList +'<div class="wms-srv-grid-cell">';
    gridList = gridList +'<div class="wms-srv-grid-action">';
    gridList = gridList +'<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="regreshPage();">';
    gridList = gridList +'<i class="fas fa-check-circle"></i></a>';                
    gridList = gridList +'<div class="wms-srv-action-sep">  |  </div>';
    gridList = gridList +'<a href="#" title="view Labour" class="wms-srv-save" data-prefix="SV" onclick="">';
    gridList = gridList +'<i class="fas fa-users"></i></a>';
    gridList = gridList +'</div>';
    gridList = gridList +'</div>';
    //gridList = gridList +'</div>';
    $("#gridLabourRow_"+getId).html(gridList);
    
}

function regreshPage()
{
    debugger;
    location.reload(true);
}

function showLabourDetailReport()
{
    $("#wms-srv-LabourDetails-popup").show();
    $("#wms-srv-LabourDetails-popup-close").click(function()
    {
        $("#wms-srv-LabourDetails-popup").off();
        $("#wms-srv-LabourDetails-popup").hide();
    });
}