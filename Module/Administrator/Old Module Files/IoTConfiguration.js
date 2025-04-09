function initIoTConfiguration() 
{
    //createLineChart('FSN-Line-Chart', ['min-Temp', 'min-Temp', 'min-Temp','min-Temp', 'min-Temp', 'min-Temp','max-temp'],['1069','1078','1024','1189','1310','2220','7810'],'');
	//createLineChart('FSN-Line-Chart', ['12-01-2023', '15-03-2023', '21-04-2023', '11-04-2023', '17-02-2023', '10-01-2023','12-06-2023'], ['100', '200', '250', '300', '330', '350', '380'],'Iot Config Moving');
	//createLineChart('FSN-Line-Tempreture',['#0984e3', '#1B1464', '#ffbe76'],['min-Temp', 'Current-Temp', 'min-Temp'], ['100', '200', '250'],'FSN-Line-Tempreture');
    //createLineChart('FSN-Line-Tempreture', ['10:30', '11:30', '12:30','13:30','14:30', '15:30','16:50'],['15','20','30','40','50','60','70'],'Tempreture-Status');
    //createLineChart('FSN-Line-Tempreture', ['min-Temp', 'min-Temp', 'min-Temp','min-Temp', 'min-Temp', 'min-Temp','max-temp'],['1060','1060','1070','1110','1330','2210','7830','2478'],'');
    //createLineChart('FSN-Line-Tempreture', ['10:30', '11:30', '12:30','13:30','14:30', '15:30','16:50'],['15','20','30','40','50','60','70'],'Tempreture-Status');
    //createBarChart('FSN-Line-Chart', ['(12/01/23)min-Temp','(12/01/23)max-temp','(12/01/23)Curr-temp'], ['8', '15', '30'], ['#FFA500','#008080','#A52A2A'],'');
    //createLineChart('FSN-Line-Tempreture', ['10:30', '11:30', '12:30','13:30','14:30', '15:30','16:50'],['10','20','30','40','50','60','60','70'],'');
    //createDoughnutChart('Inventory-Aging-Chart', ['<30', '31-60', '61-90', '91-120', '121-150', '151-180', '180+'], ['100', '200', '300', '150', '220', '350', '80'], ['#0984e3', '#1B1464', '#ffbe76', '#be2edd', '#f368e0', '#4bcffa', '#feca57'], 'Buckets');
	//createLineChart('FSN-Line-Humidity', ['10:30', '11:30', '12:30','13:30','14:30', '15:30','16:50'], ['15','20','30','40','50','60','70'],'FSN-Line-Humidity');
   
    getIOTConfigList(strCurrentPage,searchfilter, searchvalue);
    BindLocPassage();
    $( ".datepicker" ).datepicker();
    //createMultipleBarChart(checkData);
   // createMultipleBarChart1(checkData2);
    //createBarChart321(checkData32);
    
}
var strCurrentPage = '1';
var getTotalRecords = '10';
var searchfilter = '0';
var searchvalue = '0';
var CurrentPage='1';
var RecordLimit ='5';
var getIOTConfigId ='0'

var getSelectedDateCatg = "";
var GetCurrentUserDate = "";
var currentfinacial = "2022/04/01";
var getFromDateSelected = "";
var getToDateSelected = "";
var globalDefaultFromDate = "";
var globalDefaultToDate = "";

var obj = 'objrexta';

var globalIOTConfigID = '0';
var IOTGlbalID ='';   
var IOtID='';

var getUserId = mBrillWmsSession.getUserId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCompanyId();


function OpenPopup() {
    $('#app' + obj).show();
    $('#wms-srv-' + obj + '-popup').show();

}

function closePopup() 
{

    $('#app' + obj).hide();
    $('#wms-srv-' + obj + '-popup').hide();

}



// var checkData = [{ 
//     data: [17,17,17,17,17,17,17],
//     borderColor: "red",
//     fill: false
//   }, { 
//     data: [20,21,22,23,22,21,20],
//     borderColor: "green",
//     fill: false
//   }, { 
//     data: [28,28,28,28,28,28,28],
//     borderColor: "blue",
//     fill: false
//   }];


function createMultipleBarChart(checkData,xValues)
{
  new Chart("FSN-Line-Tempreture", {
  type: "line",
  data: {
    chartTitle:'',
    labels: xValues,
    datasets: checkData
  },
  options: {
    legend: {display: false}
  },
  
});
}

function createMultipleBarChart1(checkData2, xValues)
{
    new Chart("FSN-Line-Humidity", {
  type: "line",
  data: {
    chartTitle:'',
    labels: xValues,
    datasets: checkData2
  },
  options: {
    legend: {display: false}
  }
});
}



// var checkData2 = [{ 
//     data: [20,20,20,20,20,20,20],
//     borderColor: "red",
//     fill: false
//   }, { 
//     data: [25,25,25,26,27,25,25],
//     borderColor: "green",
//     fill: false
//   }, { 
//     data: [32,32,32,32,32,32,32],
//     borderColor: "blue",
//     fill: false
//   }];


  //var BValues = ['12/01/23', '21/07/23', '10/07/23'];
function createBarChart(checkData32,BValues) {
    //resetCanvas(canvasId);
    new Chart("FSN-Line-Chart", {
        type: "bar",
        data: {
          chartTitle:'',
          labels: BValues,
          datasets: checkData32
        },
        options: {
          legend: {display: false}
        },
      });
}


// var checkData32 = 

// [
//       {
//         label: "American Express",
//         backgroundColor: "pink",
//         borderColor: "red",
//         borderWidth: 1,
//         data: [3, 5, 7]
//       },
//       {
//         label: "Mastercard",
//         backgroundColor: "lightblue",
//         borderColor: "blue",
//         borderWidth: 1,
//         data: [5, 6, 6]
//       },
//       {
//         label: "Paypal",
//         backgroundColor: "lightgreen",
//         borderColor: "green",
//         borderWidth: 1,
//         data: [8,7,5]
//       },
// ];
      
      

function resetCanvas(canvasId) 
{
    var getCanvasHtml = document.getElementById(canvasId).outerHTML;
    var getCanvasParent = $('#' + canvasId).parent();
    $('#' + canvasId).remove();
    getCanvasParent.append(getCanvasHtml);
}

function ReportviewPopup(reportID,getdevicecode) 
{
    debugger
    $('#wms-srv-popup-IoTconfig-open').show();
    BinddeviceIDView(reportID,getdevicecode);
    
    $('#wms-srv-popup-IoTconfig-close').off();
    $('#wms-srv-popup-IoTconfig-close').click(function () {
        $('#wms-srv-popup-IoTconfig-open').hide();
    });
   
    //alert("Hi");
    //loadCurrentDate();
    $("#btnSearchReport" + obj).click(function () {
        getReportList(reportID,getdevicecode);
    })
    $(".iconClose").click(function () {
        $("#dateSelecter" + obj).hide();
    });
    
    
}
function BinddeviceIDView(reportID,devicecode) 
{     
    debugger;
    //var apiPath = wmsApiPath + 'IOTConfig/deviceTypeIOTConfig';
    //var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTdeviceIDbind'; 
    var apiPath = wmsApiPath + 'IOTConfig/IOTdeviceIDbind';
    var postData =
    {
        ID: reportID,
        CustId: getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnparameter = [];
            spnparameterID = [];
            $("#ddlPageView").html('<option >--Select--</option>');
            spnparameter.push('--Select--');
			spnparameterID.push('--Select--');
            var myParamList = data.Result;
            var ObjectParamList = myParamList.Table;
            if (ObjectParamList.length > 0) 
            {
                for (var i = 0; i < ObjectParamList.length; i++) 
                    {
                    var typedeviceId =ObjectParamList[i].deviceId;
                    //var typevalue = ObjectParamList[i].value;
                    spnparameter.push(typedeviceId);
                    //spnparameterID.push(typeId);
                    $("#ddlPageView").append('<option value = "'+ typedeviceId +'">'+ typedeviceId +'</option>');
                    }
                    $('#ddlPageView').val(devicecode);
            }
        }
         if($('#ddlPageView').val() == devicecode)
           {
            
            getReportList(reportID,getdevicecode);
          }        
    });    
}

function TemperturePopup(reportID,devicecode) 
{
    $('#wms-srv-popup-Temp-open').show();
    $('#wms-srv-popup-Temp-close').off();
    $('#wms-srv-popup-Temp-close').click(function () {
        $('#wms-srv-popup-Temp-open').hide();
    });
    BinddeviceID(reportID,devicecode);
       
}
function HumadityPopup(reportID,devicecode) 
{
    $('#wms-srv-popup-Humadity-open').show();
    $('#wms-srv-popup-Humadity-close').off();
    $('#wms-srv-popup-Humadity-close').click(function () {
        $('#wms-srv-popup-Humadity-open').hide();
    });
   // var devicecode = ddlPageObjectobjrexta.val();
    BinddeviceIDHumidity(reportID,devicecode);
   
    
}

function showEditIoTConfigRow()
{
    $('#wms-srv-beforeedit-IoTConfigopen').hide(); 
    $('#wms-srv-beforeedit-close').show(); 
}
function hideEditIoTConfigRow()
{
    $('#wms-srv-beforeedit-IoTConfigopen').show(); 
    $('#wms-srv-beforeedit-close').hide(); 
}

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
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function getThirtyDateData(dateType) {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = dateType - todaydate;

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
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

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
    $('#txtFromToDate' + obj).val(userSelectedDate + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

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
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
    //getPurchaseOrderList(userSelectedDate);
}

function openDatePopup() 
{
    $('#dateSelecterobjrexta').hide();
}

function loadCurrentDate() {

    var today = new Date();
    var todaydate = today.getDate();
    var dd = todaydate
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
    $('#txtFromToDate' + obj).val(currentfinacial + " To " + GetCurrentUserDate);
}

function getDate() 
{
    $("#dateSelecter" + obj).show();
}


wmsLoadLayout(function()
{
   
});

var getSelectedDateCatg = "";

function getIOTConfigList(strCurrentPage,searchfilter, searchvalue)
{
    //debugger;
    var apiPath = wmsApiPath + 'IOTConfig/IOTConfigList';
	//var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTConfigList';
    var searchfilter = $('#searchIOT').val();
    var searchvalue = $('#valueIOT').val();
    if (searchfilter == '')
    {
        searchfilter = '0';
        searchvalue = '0';
    }	
    var postData =
    {
        Currentpage:strCurrentPage,
        Recordlimit: getTotalRecords,
        CustomerID: getCustomerId,
        WarehouseID: getWarehouseId,
        UserID: getUserId,
        CompanyID:getCompanyId,
        Search: searchfilter,
        Filter: searchvalue
    }
   
    callHttpUrl(apiPath, postData, function (data) {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            var myGridList = data.Result;
			var getTotalRecords = myGridList.Table[0].TotalRecord;
			 currentPage = myGridList.Table[0].CurrentPage;		 
     
            $('#GridBindIOTConfig').html('');  	            
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Location </div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Passage</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Section</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Shelf</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Device Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Device Code</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Min Temp</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Max Temp</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Min Humidity</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Max Humidity</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Current Temp</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Current Humidity</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Active/Inactive</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';
			
            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';        
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<select  class="wms-srv-grid-cell-input" onchange="BindLocPassage();" id="ddlLocType">';     
            //gridTable = gridTable + '<option>Loc1</option>';     
            gridTable = gridTable + '</select>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtPassage"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtSection"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtShelf"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<select  class="wms-srv-grid-cell-input" id="ddldevicetype">';      
            //gridTable = gridTable + '<option>Loc1</option>';      
            gridTable = gridTable + '</select>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtdevicecode"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtmintemp"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtmaxtemp"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtminhumidity"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtmaxhumidity"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtCurrenttemp"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtCurrenthumidity"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="Checkbox" value="" class="wms-srv-grid-cell-input" required id="txtActiveIOT"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action">';
            gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" onclick="SaveIOTConfig(0)">';
            gridTable = gridTable + '<i class="fas fa-check-circle" style="color:black !important"></i></a></div></div>';
            gridTable = gridTable + '</div>';  		


            
            // GRID HEADER
            for (var i = 0; i <myGridList.Table1.length;i++)
             {
                var getid = myGridList.Table1[i].id;
                var getLocType = myGridList.Table1[i].Code;
                var getPathway = myGridList.Table1[i].Pathway;
                var getSection = myGridList.Table1[i].Section;
                var getShelf = myGridList.Table1[i].Shelf;
                var getdevicetype = myGridList.Table1[i].devicetype;
                var getdevicecode = myGridList.Table1[i].devicecode;
                var getminTemp = myGridList.Table1[i].minTemp;
                var getmaxTemp = myGridList.Table1[i].maxTemp;
                var getminhumidity = myGridList.Table1[i].minhumidity;
                var getmaxhumidity = myGridList.Table1[i].maxhumidity;
                var getcurrtemp = myGridList.Table1[i].currtemp;
                var getcurrHumidity = myGridList.Table1[i].currHumidity;
                var getActive = myGridList.Table1[i].Active;

                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="rowParameter_'+ getid +'" style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getLocType + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getPathway + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSection + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getShelf + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getdevicetype + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getdevicecode + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getminTemp + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getmaxTemp + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getminhumidity + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getmaxhumidity + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getcurrtemp + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getcurrHumidity + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActive + "</div>";
                //gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getAction + "</div>";
               
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV" onclick="IOTConfigEditGrid(\''+getid+'\',\''+getLocType+'\',\''+getPathway+'\',\''+getSection+'\',\''+getShelf+'\',\''+getdevicetype+'\',\''+getdevicecode+'\',\''+getminTemp+'\',\''+getmaxTemp+'\',\''+getminhumidity+'\',\''+getmaxhumidity+'\',\''+getcurrtemp+'\',\''+getcurrHumidity+'\',\''+getActive+'\')">';
                gridTable = gridTable + '<i class="fas fa-edit"></i></a>';
                gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
                gridTable = gridTable + '<a href="#" title="View" class="wms-srv-save" data-prefix="SV" onclick="ReportviewPopup('+ getid +',\''+ getdevicecode +'\');"><i class="fas fa-eye"></i></a>';
                gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
                gridTable = gridTable + '<a href="#" title="Temperature" class="wms-srv-save" data-prefix="SV" onclick="TemperturePopup('+ getid +',\''+ getdevicecode +'\');"><i class="fa fa-thermometer-half"></i></a>';
                gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
                gridTable = gridTable + '<a href="#" title="Humidity"  data-prefix="SV" onclick="HumadityPopup('+ getid +',\''+ getdevicecode +'\');"><i class="fas fa-temperature-low"></i></a>';
                gridTable = gridTable + '</div>';				
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
               
                if(getActive == "Y")
                {		
                $('#checkvendorList wms-srv-grid-cell-input notranslate input[type="checkbox"]').prop('checked', true);				
                }
                else
                 {
                $('#checkvendorList').prop('checked', false);
                }

            }
            //debugger;
            $('#GridBindIOTConfig').html(gridTable);			
            setupGridPagingList('pagingIOTConfig', strCurrentPage, getTotalRecords, getIOTConfigList);
        }
        else {
            alert('Unable to connect');
        }
        BindLocTypeDrop();
       
    });
}

function SearchIOTfilter()
{
    //debugger;
     searchfilter = $('#searchIOT').val();
     searchvalue = $('#valueIOT').val();

    if (searchvalue == '0') 
    {
        alert('Please Enter value for filter');
    }
    else {

        getIOTConfigList(strCurrentPage,searchfilter,searchvalue);

    }
}


function BindLocTypeDrop()
{     
   // debugger;
    var apiPath = wmsApiPath + 'IOTConfig/LocationTypeIOTConfig';
    //var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/LocationTypeIOTConfig'; 
    var postData=
    {
        
            UserID: getUserId,
            WarehouseID:getWarehouseId,
            "LocationType": "1",
            CompanyID: getCompanyId,
            CustomerID:  getCustomerId,
          
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnparameter = [];
            spnparameterID = [];
            $("#ddlLocType").html('<option >--Select--</option>');
            spnparameter.push('--Select--');
			spnparameterID.push('--Select--');
            var myParamList = data.Result;
            var ObjectParamList = myParamList.Table;
            if (ObjectParamList.length > 0) {
                for (var i = 0; i < ObjectParamList.length; i++) 
                    {
                    var typeId =ObjectParamList[i].ID;
                    var typeCode = ObjectParamList[i].Code;
                    spnparameter.push(typeCode);
                    spnparameterID.push(typeId);
                    $("#ddlLocType").append('<option value = "'+ typeId +'">'+ typeCode +'</option>');
                    }
            }
        }  
        BindDeviceTypeDrop();      
    });    
}

var spnparameter = [];
var spnparameterID = [];

function BindDeviceTypeDrop()
{     
    //debugger;
    var apiPath = wmsApiPath + 'IOTConfig/deviceTypeIOTConfig';
    //var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/deviceTypeIOTConfig'; 
    var postData=
    {
      UserID: getUserId,
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnparameter = [];
            spnparameterID = [];
            $("#ddldevicetype").html('<option >--Select--</option>');
            spnparameter.push('--Select--');
			spnparameterID.push('--Select--');
            var myParamList = data.Result;
            var ObjectParamList = myParamList.Table;
            if (ObjectParamList.length > 0) 
            {
                for (var i = 0; i < ObjectParamList.length; i++) 
                    {
                    var typeId =ObjectParamList[i].Id;
                    var typevalue = ObjectParamList[i].value;
                    spnparameter.push(typevalue);
                    spnparameterID.push(typeId);
                    $("#ddldevicetype").append('<option value = "'+ typevalue +'">'+ typevalue +'</option>');
                    }
            }
        }        
    });    
}

function IOTConfigEditGrid(IOTEditId,Locationtype,Passage,Section,Shelf,devicetype,devicecode,mintemp,maxtemp,minhumidity,maxhumidity,Currenttemp,Currenthumidity,Active)
{ 
        debugger;
		globalIOTConfigID = IOTEditId;
	    var gridRow = '';
        gridRow = gridRow + '<div class="wms-srv-grid-cell">';
        gridRow = gridRow +  bindIOTConfigDropDownEdit(IOTEditId,Locationtype);
        gridRow = gridRow + '</div>';
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditPassage" class="wms-srv-grid-cell-input" value="'+Passage+'" /></div>';
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditSection" class="wms-srv-grid-cell-input" value="'+Section+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditShelf" class="wms-srv-grid-cell-input" value="'+Shelf+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell">';
        gridRow = gridRow +  bindIOTConfigdevicetypeEdit(IOTEditId,devicetype);
        // gridRow = gridRow + '<select type="text" id="txtdevicetype" class="wms-srv-grid-cell-input">';
        // gridRow = gridRow + '</select>';
        gridRow = gridRow + '</div>';
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditdevicecode" class="wms-srv-grid-cell-input" value="'+devicecode+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditmintemp" class="wms-srv-grid-cell-input" value="'+mintemp+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditmaxtemp" class="wms-srv-grid-cell-input" value="'+maxtemp+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditminhumidity" class="wms-srv-grid-cell-input" value="'+minhumidity+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditmaxhumidity" class="wms-srv-grid-cell-input" value="'+maxhumidity+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditCurrenttemp" class="wms-srv-grid-cell-input" value="'+Currenttemp+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditCurrenthumidity" class="wms-srv-grid-cell-input" value="'+Currenthumidity+'"/></div>';
       
        if(Active == 'Yes'){
            gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txteditActive" class="wms-srv-grid-cell-input" value="'+Active+'" checked="checked" /></div>';
        }else{
            gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txteditActive" class="wms-srv-grid-cell-input" value="'+Active+'" /></div>';
        }
       
	   	gridRow = gridRow + '<div class="wms-srv-grid-cell">';
        gridRow = gridRow + '<div class="wms-srv-grid-action">';
        gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV">';
        gridRow = gridRow + '<i class="fas fa-check-circle" id="SaveCustParameter" title="Save" style="color:black !important" onclick="SaveIOTConfig('+IOTEditId+')"></i></a>';
        gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV">';
        gridRow = gridRow + '<i class="fas fa-times-circle" title="Cancel" onclick="gridEditIOTConfigHide('+IOTEditId+')"></i></a>';
        gridRow = gridRow + '</div>';
        gridRow = gridRow + '</div>';
        
		
        $("#rowParameter_" + IOTEditId).html(gridRow);
				
}
function gridEditIOTConfigHide(IOTEditId)
{	
	$("#rowParameter_" + IOTEditId).html('');	
	getIOTConfigList();	
}

//var spnVendortype = [];
var spnIOTType=[];
var spnIOTTypeId = [];

function bindIOTConfigDropDownEdit(IOTEditId,Locationtype)
{
	//debugger;
    IOTGlbalID = IOTEditId;
	var ddlIOTtype = '';
	ddlIOTtype = '<select class="wms-srv-grid-cell-input" id="txtEditLocType'+ IOTEditId +'">';
	for(var i=0; i < spnIOTType.length; i++)
    {
		if(spnIOTType[i] == Locationtype){
			ddlIOTtype += '<option value = "'+ spnIOTTypeId[i]+'" selected="selected">'+ spnIOTType[i] +'</option>';
		}else{
			ddlIOTtype += '<option value = "'+ spnIOTTypeId[i]+'">'+ spnIOTType[i] +'</option>';
		}
	}
	ddlIOTtype += '</select>';
	return ddlIOTtype;
}

function bindIOTConfigdevicetypeEdit(IOTEditId,devicetype)
{
	//debugger;
    IOTGlbalID = IOTEditId;
	var ddldevicetype = '';
	ddldevicetype = '<select class="wms-srv-grid-cell-input" id="txtEditdevicetype'+ IOTEditId +'">';
	for(var i=0; i < spnIOTType.length; i++)
    {
		if(spnIOTType[i] == devicetype){
			ddldevicetype += '<option value = "'+ spnIOTTypeId[i]+'" selected="selected">'+ spnIOTType[i] +'</option>';
		}else{
			ddldevicetype += '<option value = "'+ spnIOTTypeId[i]+'">'+ spnIOTType[i] +'</option>';
		}
	}
	ddldevicetype += '</select>';
	return ddldevicetype;
}



function SaveIOTConfig(IOTConfigId)
{	
    //debugger;
	var getIOTConfigId = IOTConfigId;// globalvendorID
	//var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/SaveIOTConfig';
    var apiPath = wmsApiPath + 'IOTConfig/SaveIOTConfig';
   
	if(getIOTConfigId =='0')
	{		
        var getLocationType = $("#ddlLocType").val();	
		var getPassage = $("#txtPassage").val();	
		var getSection = $("#txtSection").val();		 
        var getShelf = $("#txtShelf").val();		 
		var getdevicetype = $("#ddldevicetype").val();	
        var getdevicecode = $("#txtdevicecode").val();	
		var getmintemp = $("#txtmintemp").val();		 
        var getmaxtemp = $("#txtmaxtemp").val();	
		var getminhumidity = $("#txtminhumidity").val();		 
		var getmaxhumidity  = $("#txtmaxhumidity").val();
        var getCurrenttemp = $("#txtCurrenttemp").val();		 
        var getCurrenthumidity = $("#txtCurrenthumidity").val();
		var getActive = $("#txtActiveIOT").is(":checked");
	}
  
	//Edit Parameter
	else
    {
	    var getLocationType = $("#txtEditLocType"+ IOTGlbalID).val();	
		var getPassage = $("#txteditPassage").val();	
		var getSection = $("#txteditSection").val();		 
        var getShelf = $("#txteditShelf").val();		 
		var getdevicetype = $("#txtEditdevicetype"+ IOTGlbalID).val();	
        var getdevicecode = $("#txteditdevicecode").val();	
		var getmintemp = $("#txteditmintemp").val();		 
        var getmaxtemp = $("#txteditmaxtemp").val();	
		var getminhumidity = $("#txteditminhumidity").val();		 
		var getmaxhumidity  = $("#txteditmaxhumidity").val();
        var getCurrenttemp = $("#txteditCurrenttemp").val();		 
        var getCurrenthumidity = $("#txteditCurrenthumidity").val();
		var getActive = $("#txteditActive").is(":checked");
       
	}   
   
	
	if(getActive == true)
	{
		getActive = 'Yes';
        
	}
	else
	{
		getActive = 'No';
	}
	
    var postData = 
    {
        CustomerID: getCustomerId,
        WarehouseID: getWarehouseId,
        UserID: getUserId,
        CompanyID: getCompanyId,
        Locationtype: getLocationType,
        Pathway: getPassage,
        Section: getSection,
        Shelf: getShelf,
        devicetype: getdevicetype,
        devicecode: getdevicecode,
        minTemp: getmintemp,
        maxTemp: getmaxtemp,
        minhumidity: getminhumidity,
        maxhumidity: getmaxhumidity,
        Currtemp: getCurrenthumidity,
        CurrHumidity: getCurrenttemp,
        Active: getActive,
        IOTConfigID: getIOTConfigId
     };
	 
    callHttpUrl(apiPath, postData, function(data)
      {
        var isSuccess = data.Status;
        var returvnmsg = data.StatusCode
       
        if (isSuccess == 200)
        {
           
            if(returvnmsg == "Success")
			 {
              
                  alert('Saved Successfully!!');
                  getIOTConfigList(strCurrentPage,searchfilter, searchvalue);
             }
            //  else
            //  {
            //     alert('Error');
                
            //  }	
           
        }
        else 
        {
            alert('Error Occured!!');
        }
    });


	
}


function getReportList(reportID,devicecode) 
{
   debugger;
   var getDate=$("#txtFromToDateobjrexta").val();
    // if (getDate == "") {
    //     //var getFromDate = $("#txtFromToDate" + obj).val();
    //     var getDate=$("#txtFromToDateobjrexta").val();
        
    //     getReportList(reportID,devicecode);
    // }
    var getSearchToDate = "";
    var apiPath = wmsApiPath + 'IOTConfig/IOTConfigReport';
    var getSearchFilter = "OrderNo"
    var SearchByDate = "SearchByDate";
    var getdevicecode = $('#ddlPageView').val();

    var postData = 
    {
        "ID":reportID,
        "UserId":getUserId,
        "CustId":getCustomerId,                 
        "WhId":getWarehouseId,
        "CompId":getCompanyId,
        "fromDate": getDate,
        "toDate": getdevicecode
    };

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.Code;
        if (getStatus == 200) {
            var getResult = data.Result.Table;
            if (obj == 'objrexta') {
                $("#pnlIOTReportlist" + obj).html("");
                var myGrid = "";
                myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">DeviceID</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Date</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Minimum Temperture</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Maximum Temperture</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Minimum Humidity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Maximum Humidity</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Current Temperture</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Current Humidity</div>';
                myGrid = myGrid + '</div>';


                for (var i = 0; i < getResult.length; i++) 
                {
                    var getid = getResult[i].id;
                    var getDeviceID = getResult[i].DeviceID;
                    var getCreationDate = getResult[i].CreationDate;
                    var getminTemp = getResult[i].minTemp;
                    var getmaxTemp = getResult[i].maxTemp;
                    var getminhumidity = getResult[i].minhumidity;
                    var getmaxhumidity = getResult[i].maxhumidity;
                    var getCurrTemp = getResult[i].CurrTemp;
                    var getCurrHumidity = getResult[i].CurrHumidity;
                   
                    myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminTemp + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxTemp + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminhumidity + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxhumidity + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrTemp + '</div>';
                    myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrHumidity + '</div>';
                    myGrid = myGrid + '</div>';

                }
                $('#pnlIOTReportlist').html(myGrid);
            }

        }
    //     if (getStatus == 200) {
    //         var getResult = data.Result.Table;
    //         if (obj == 'objrexta') {
    //             $("#pnlReport" + obj).html("");
    //             var myGrid = "";
    //             myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow" id="header-wrap">';
    //             myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center; color: #b3b3b3;font-weight: 500;">DeviceID</div>';
    //             myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Time</div>';
    //             myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Minimum Temperture</div>';
    //             myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Maximum Temperture</div>';
    //             myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Minimum Humidity</div>';
    //             myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Maximum Humidity</div>';
    //             myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;color: #b3b3b3;font-weight: 500;">Current Temperture</div>';
    //             myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style=" text-align:center;color: #b3b3b3;font-weight: 500;">Current Humidity</div>';
    //             myGrid = myGrid + '</div>';


    //             for (var i = 0; i < getResult.length; i++) 
    //             {
    //                 var getid = getResult[i].id;
    //                 var getTime = getResult[i].dtTime;
    //                 var getDeviceID = getResult[i].DeviceID;
    //                 var getCreationDate = getResult[i].CreationDate;
    //                 var getminTemp = getResult[i].minTemp;
    //                 var getmaxTemp = getResult[i].maxTemp;
    //                 var getminhumidity = getResult[i].minhumidity;
    //                 var getmaxhumidity = getResult[i].maxhumidity;
    //                 var getCurrTemp = getResult[i].CurrTemp;
    //                 var getCurrHumidity = getResult[i].CurrHumidity;
                   
    //                 myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
    //                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
    //                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getTime + '</div>';
    //                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminTemp + '</div>';
    //                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxTemp + '</div>';
    //                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminhumidity + '</div>';
    //                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxhumidity + '</div>';
    //                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrTemp + '</div>';
    //                 myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrHumidity + '</div>';
    //                 myGrid = myGrid + '</div>';

    //             }
    //             $('#pnlReport').html(myGrid);
    //         }

    //     }
    //     if (getStatus == 200) 
    //     {
    //     //var getStatus = data.Status;
    //     var getStatusCode = data.StatusCode;
    //     var getDataLength = data.Result.Table.length;
    //     var getDataTable = data.Result.Table;
    //     //alert(getDataLength);
    //     var minTemp = [];
    //     var maxTemp = [];
    //     var currentTemp = [];
    //     var BValues = [];
    //     for(var i=0; i <getDataLength; i++){
    //         var getMinTemp = getDataTable[i].minTemp;
    //         var getMaxTemp = getDataTable[i].maxTemp;
    //         var getCurrentTemp = getDataTable[i].CurrTemp;
    //         var getDateVal = getDataTable[i].CreationDate;
    //         minTemp.push(getMinTemp);
    //         maxTemp.push(getMaxTemp);
    //         currentTemp.push(getCurrentTemp);
    //         //BValues.push(getDateVal);
    //     }
    //     if (getStatusCode.toLocaleLowerCase() == 'success') 
    //     {
    //         // var getminhumidity = data.Result.Table[0].minhumidity;
    //         // var getmaxhumidity = data.Result.Table[0].maxhumidity;
    //         // var getCurrHumidity = data.Result.Table[0].CurrHumidity;
    //         var BValues = ['12/01/23', '21/07/23', '10/07/23'];
            
    //         var checkData32 = 

    //   [{
    //     backgroundColor: "pink",
    //     borderColor: "red",
    //     borderWidth: 1,
    //     data: [3, 5, 7]
    //     //data: [minTemp, currentTemp, maxTemp]
    //   },
    //   {
    //     backgroundColor: "lightblue",
    //     borderColor: "blue",
    //     borderWidth: 1,
    //     data: [5, 6, 6]
    //     //data: [minTemp, currentTemp, maxTemp]
    //   },
    //   {
    //     backgroundColor: "lightgreen",
    //     borderColor: "green",
    //     borderWidth: 1,
    //     data: [8,7,5]
    //     //data: [minTemp, currentTemp, maxTemp]
    //   }];
     
    //         //var xValues = ['10:30', '11:30', '12:30','13:30','14:30', '15:30','16:50'];

    //         createBarChart(checkData32,BValues);
    //     }
    // }
    });
    $("#dateSelecter" + obj).hide();

}



function getTemperture(reportID,devicecode,calltype)
{
    debugger;
	//var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTConfigTemp';
    var apiPath = wmsApiPath + 'IOTConfig/IOTConfigTemp';
    var getDate=$("#dtpdate").val();
    
    if(calltype != 1)
    {
        reportID = 0
        devicecode = $('#ddlPageObjectobjrexta').val();

    }


    var postData =
    {
        "ID": reportID,
        "CustId":getCustomerId,
        "WhId": getWarehouseId,
        "UserId": getUserId,
        "CompId": getCompanyId,
        "deviceId": devicecode,
        "Date": getDate,
        "obj": "Temp"
    }
   
    callHttpUrl(apiPath, postData, function (data) {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
        $('#pnlTempReport').html('');  
        var getResult = data.Result;
        var myGrid = "";
        myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow">';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">DeviceID</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Date</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Temperture</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Temperture</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Temperture</div>';
        myGrid = myGrid + '</div>';


        for (var i = 0; i <getResult.Table.length; i++) 
        {
            var getid = getResult.Table[i].id;
            var getDeviceID = getResult.Table[i].DeviceID;
            var getCreationDate = getResult.Table[i].CreationDate;
            var getminTemp = getResult.Table[i].minTemp;
            var getmaxTemp = getResult.Table[i].maxTemp;
            var getCurrTemp = getResult.Table[i].CurrTemp;
           
            myGrid = myGrid + '<div id="" class="wms-srv-grid-row reportRow">';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminTemp + '</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxTemp + '</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrTemp + '</div>';
            myGrid = myGrid + '</div>';

        }
        $('#pnlTempReport').html(myGrid);

    } 

    if (getStatus == 200)
    {
      $('#pnllisttempReport').html('');  
      var getResult = data.Result;
      var myGrid = "";
      myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow">';
      myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">DeviceID</div>';
      myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Date</div>';
      myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Temperture</div>';
      myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Temperture</div>';
      myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Temperture</div>';
      myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Humidity</div>';
      myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Humidity</div>';
      myGrid = myGrid + '</div>';


      for (var i = 0; i <getResult.Table.length; i++) 
      {
          var getid = getResult.Table[i].id;
          var getDeviceID = getResult.Table[i].DeviceID;
          var getCreationDate = getResult.Table[i].CreationDate;
          var getminTemp = getResult.Table[i].minTemp;
          var getmaxTemp = getResult.Table[i].maxTemp;
          var getCurrTemp = getResult.Table[i].CurrTemp;
          var getminhumidity = getResult.Table[i].minhumidity;
          var getmaxhumidity = getResult.Table[i].maxhumidity;

         
          myGrid = myGrid + '<div  class="wms-srv-grid-row reportRow">';
          myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
          myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
          myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminTemp + '</div>';
          myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxTemp + '</div>';
          myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrTemp + '</div>';
          myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminhumidity + '</div>';
          myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxhumidity + '</div>';
          myGrid = myGrid + '</div>';

      }
      $('#pnllisttempReport').html(myGrid);

  } 
  if (getStatus == 200)
  {
    $('#pnllisttempReport').html('');  
    var getResult = data.Result;
    var myGrid = "";
    myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow">';
    myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">DeviceID</div>';
    myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Date</div>';
    myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Temperture</div>';
    myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Temperture</div>';
    myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Temperture</div>';
    myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Humidity</div>';
    myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Humidity</div>';
    myGrid = myGrid + '</div>';


    for (var i = 0; i <getResult.Table.length; i++) 
    {
        var getid = getResult.Table[i].id;
        var getDeviceID = getResult.Table[i].DeviceID;
        var getCreationDate = getResult.Table[i].CreationDate;
        var getminTemp = getResult.Table[i].minTemp;
        var getmaxTemp = getResult.Table[i].maxTemp;
        var getCurrTemp = getResult.Table[i].CurrTemp;
        var getminhumidity = getResult.Table[i].minhumidity;
        var getmaxhumidity = getResult.Table[i].maxhumidity;

       
        myGrid = myGrid + '<div  class="wms-srv-grid-row reportRow">';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminTemp + '</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxTemp + '</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrTemp + '</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminhumidity + '</div>';
        myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxhumidity + '</div>';
        myGrid = myGrid + '</div>';

    }
    $('#pnllisttempReport').html(myGrid);

  } 

  var getStatus = data.Status;
  var getStatusCode = data.StatusCode;
  var getDataLength = data.Result.Table.length;
  var getDataTable = data.Result.Table;
  //alert(getDataLength);
  var minTemp = [];
  var maxTemp = [];
  var currentTemp = [];
  var xValues = [];
  for(var i=0; i <getDataLength; i++){
      var getMinTemp = getDataTable[i].minTemp;
      var getMaxTemp = getDataTable[i].maxTemp;
      var getCurrentTemp = getDataTable[i].CurrTemp;
      var getTimeVal = getDataTable[i].Time;
      minTemp.push(getMinTemp);
      maxTemp.push(getMaxTemp);
      currentTemp.push(getCurrentTemp);
      xValues.push(getTimeVal);
  }
  if (getStatusCode.toLocaleLowerCase() == 'success') 
  {
      // var getminhumidity = data.Result.Table[0].minhumidity;
      // var getmaxhumidity = data.Result.Table[0].maxhumidity;
      // var getCurrHumidity = data.Result.Table[0].CurrHumidity;
      
      var checkData = [{ 
          data: minTemp,
          borderColor: "red",
          fill: false
        }, { 
          data: currentTemp,
          borderColor: "green",
          fill: false
        }, { 
          data: maxTemp,
          borderColor: "blue",
          fill: false
        }];

        //var xValues = ['10:30', '11:30', '12:30','13:30','14:30', '15:30','16:50'];

       createMultipleBarChart(checkData,xValues);
      
  }

        else 
        {
            alert('Unable to connect');
        }
    });
}

// function getHumidity(reportID,devicecode)
// {
//     //debugger;
// 	var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTConfigTemp';
//     //var apiPath = wmsApiPath + 'IOTConfig/IOTConfigTemp';
//     var postData =
//     {
//         "ID": reportID,
//         "CustId": getCustomerId,
//         "WhId": getWarehouseId,
//         "UserId": getUserId,
//         "CompId": getCompanyId,
//         "deviceId": devicecode,
//         "Date": "28/07/2023",
//         "obj": "Temp"
//     }
   
//     callHttpUrl(apiPath, postData, function (data) {
       
//         var getStatus = data.Status;
       
//         if (getStatus == 200)
//       {
//         $('#pnlIOThumidity').html('');  
//         var getResult = data.Result;
//         var myGrid = "";
//         myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow">';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">DeviceID</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Date</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Humidity</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Humidity</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Humidity</div>';
//         myGrid = myGrid + '</div>';


//         for (var i = 0; i <getResult.Table.length; i++) 
//         {
//             var getid = getResult.Table[i].id;
//             var getDeviceID = getResult.Table[i].DeviceID;
//             var getCreationDate = getResult.Table[i].CreationDate;
//             var getminhumidity = getResult.Table[i].minhumidity;
//             var getmaxhumidity = getResult.Table[i].maxhumidity;
//             var getCurrHumidity = getResult.Table[i].CurrHumidity;
           
//             myGrid = myGrid + '<div  class="wms-srv-grid-row reportRow">';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminhumidity + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxhumidity + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrHumidity + '</div>';
//             myGrid = myGrid + '</div>';

//         }
//         $('#pnlIOThumidity').html(myGrid);

//     } 
//         else 
//         {
//             alert('Unable to connect');
//         }
//     });
// }

// function getlistHumidity(reportID,devicecode)
// {
//     //debugger;
// 	var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTConfigTemp';
//     //var apiPath = wmsApiPath + 'IOTConfig/IOTConfigTemp';
//     var postData =
//     {
//         "ID":reportID,
//         "CustId": getCustomerId,
//         "WhId": getWarehouseId,
//         "UserId": getUserId,
//         "CompId": getCompanyId,
//         "deviceId": devicecode,
//         "Date": "28/07/2023",
//         "obj": "Temp"
//     }
   
//     callHttpUrl(apiPath, postData, function (data) {
       
//         var getStatus = data.Status;
       
//         if (getStatus == 200)
//       {
//         $('#pnlIOtHumidity').html('');  
//         var getResult = data.Result;
//         var myGrid = "";
//         myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow">';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">DeviceID</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Date</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Temperture</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Temperture</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Temperture</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Humidity</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Humidity</div>';
//         myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Humidity</div>';
//         myGrid = myGrid + '</div>';


//         for (var i = 0; i <getResult.Table.length; i++) 
//         {
//             var getid = getResult.Table[i].id;
//             var getDeviceID = getResult.Table[i].DeviceID;
//             var getCreationDate = getResult.Table[i].CreationDate;
//             var getminTemp = getResult.Table[i].minTemp;
//             var getmaxTemp = getResult.Table[i].maxTemp;
//             var getCurrTemp = getResult.Table[i].CurrTemp;
//             var getCurrHumidity = getResult.Table[i].CurrHumidity;
//             var getminhumidity = getResult.Table[i].minhumidity;
//             var getmaxhumidity = getResult.Table[i].maxhumidity;

           
//             myGrid = myGrid + '<div  class="wms-srv-grid-row reportRow">';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminTemp + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxTemp + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrTemp + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrHumidity + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminhumidity + '</div>';
//             myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxhumidity + '</div>';
//             myGrid = myGrid + '</div>';

//         }
//         $('#pnlIOtHumidity').html(myGrid);

//     } 
//         else 
//         {
//             alert('Unable to connect');
//         }
//     });
// }


function getHumiditylineChart(reportID,devicecode,calltype) 
{
    //debugger;

    //var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTConfigTemp';
    var apiPath = wmsApiPath + 'IOTConfig/IOTConfigTemp';
    var getDate=$("#dtpdatetemp").val();
    
    if(calltype != 1)
    {
        reportID = 0
        devicecode = $('#ddlPageObjectobjrextaHumidity').val();

    }
    var postData = 
    {
        "ID": reportID,
        "CustId": getCustomerId,
        "WhId": getWarehouseId,
        "UserId": getUserId,
        "CompId": getCompanyId,
        "deviceId": devicecode,
        "Date": getDate,
        "obj": "Humidity"
    };
    
    callHttpUrl(apiPath, postData, function (data) 
    {
        debugger;
        var getStatus = data.Status;
        if (getStatus == 200)
        {
        //--------Other Section start section 1-------------//
            $('#pnlIOtHumidity').html('');  
            var getResult = data.Result;
            var myGrid = "";
            myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow">';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">DeviceID</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Date</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Temperture</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Temperture</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Temperture</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Humidity</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Humidity</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Humidity</div>';
            myGrid = myGrid + '</div>';


            for (var i = 0; i <getResult.Table.length; i++) 
            {
                var getid = getResult.Table[i].id;
                var getDeviceID = getResult.Table[i].DeviceID;
                var getCreationDate = getResult.Table[i].CreationDate;
                var getminTemp = getResult.Table[i].minTemp;
                var getmaxTemp = getResult.Table[i].maxTemp;
                var getCurrTemp = getResult.Table[i].CurrTemp;
                var getCurrHumidity = getResult.Table[i].CurrHumidity;
                var getminhumidity = getResult.Table[i].minhumidity;
                var getmaxhumidity = getResult.Table[i].maxhumidity;

            
                myGrid = myGrid + '<div  class="wms-srv-grid-row reportRow">';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminTemp + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxTemp + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrTemp + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrHumidity + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminhumidity + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxhumidity + '</div>';
                myGrid = myGrid + '</div>';

            }
            $('#pnlIOtHumidity').html(myGrid);
        //--------Other Section End-------------//


            //--------Other Section start section 2-------------//
            $('#pnlIOThumidity').html('');  
            var getResult = data.Result;
            var myGrid = "";
            myGrid = myGrid + '<div class="wms-srv-grid-header reportHeaderRow">';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">DeviceID</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Date</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Minimum Humidity</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Maximum Humidity</div>';
            myGrid = myGrid + '<div class="wms-srv-grid-cell reportHeaderCell" style="text-align:center;">Current Humidity</div>';
            myGrid = myGrid + '</div>';


            for (var i = 0; i <getResult.Table.length; i++) 
            {
                var getid = getResult.Table[i].id;
                var getDeviceID = getResult.Table[i].DeviceID;
                var getCreationDate = getResult.Table[i].CreationDate;
                var getminhumidity = getResult.Table[i].minhumidity;
                var getmaxhumidity = getResult.Table[i].maxhumidity;
                var getCurrHumidity = getResult.Table[i].CurrHumidity;
            
                myGrid = myGrid + '<div  class="wms-srv-grid-row reportRow">';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getDeviceID  + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCreationDate + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getminhumidity + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getmaxhumidity + '</div>';
                myGrid = myGrid + '<div class="wms-srv-grid-cell reportRowCell" style="text-align:center;">' + getCurrHumidity + '</div>';
                myGrid = myGrid + '</div>';

            }
            $('#pnlIOThumidity').html(myGrid);
            //--------Other Section End-------------//







            var getStatusCode = data.StatusCode;
            var getDataLength = data.Result.Table.length;
            var getDataTable = data.Result.Table;
            //alert(getDataLength);
            var minHumidity = [];
            var maxHumidity = [];
            var currentHumidity = [];
            var xValues = [];
            for(var i=0; i <getDataLength; i++){
                var getMinHumidity = getDataTable[i].minhumidity;
                var getMaxHumidity = getDataTable[i].maxhumidity;
                var getCurrentHumidity = getDataTable[i].CurrHumidity;
                var getTimeVal = getDataTable[i].Time;
                minHumidity.push(getMinHumidity);
                maxHumidity.push(getMaxHumidity);
                currentHumidity.push(getCurrentHumidity);
                xValues.push(getTimeVal);
            }
            if (getStatusCode.toLocaleLowerCase() == 'success') 
            {
                // var getminhumidity = data.Result.Table[0].minhumidity;
                // var getmaxhumidity = data.Result.Table[0].maxhumidity;
                // var getCurrHumidity = data.Result.Table[0].CurrHumidity;
                
                var checkData2 = [{ 
                    data: minHumidity,
                    borderColor: "red",
                    fill: false
                    }, { 
                    data: currentHumidity,
                    borderColor: "green",
                    fill: false
                    }, { 
                    data: maxHumidity,
                    borderColor: "blue",
                    fill: false
                    }];

                    //var xValues = ['10:30', '11:30', '12:30','13:30','14:30', '15:30','16:50'];

                    createMultipleBarChart1(checkData2, xValues);
            }

        





    }

    });
}


function BindLocPassage() 
{
    //debugger;
    //var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTLocbind'; 
    var apiPath = wmsApiPath + 'IOTConfig/IOTLocbind';
    var getLocID=$("#ddlLocType").val();
    //alert(LocID);
    var postData =
    {
        LocID: getLocID,
        CustId: getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId
    };

    callHttpUrl(apiPath, postData, function (data) 
    {
        var getStatus = data.Status;
        var popup=data.Result.Table;
        if (getStatus == 200) 
        {
            //getID= popup[0].ID;
            getPassage=popup[0].Passage;
            getSection=popup[0].Section;
            getShelf=popup[0].Shelf;
          
          
            //$('#txtcarriertype').val(getID);
            $('#txtPassage').val(getPassage);
            $('#txtSection').val(getSection);
            $('#txtShelf').val(getShelf);
        }
        else {
            //alert('Unable to connect Server!!');
        }
    });
}


// function BinddeviceID(reportID) 
// {
//     debugger;
//     var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTdeviceIDbind'; 
//     //var getLocID=$("#ddlLocType").val();
//     //alert(LocID);
//     var postData =
//     {
//         ID: reportID,
//         CustId: getCustomerId,
//         WhId: getWarehouseId,
//         UserId: getUserId,
//         CompId: getCompanyId
//     };

//     callHttpUrl(apiPath, postData, function (data) 
//     {
//         var getStatus = data.Status;
//         var popup=data.Result.Table;
//         if (getStatus == 200) 
//         {
//             //getID= popup[0].ID;
//             getdeviceId=popup[0].deviceId;
           
        
//             $('#ddlPageObjectobjrexta').val(getdeviceId);
//         }
//         else {
//             //alert('Unable to connect Server!!');
//         }
//     });
// }

function BinddeviceID(reportID,devicecode) 
{     
    debugger;
    //var apiPath = wmsApiPath + 'IOTConfig/deviceTypeIOTConfig';
   // var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTdeviceIDbind'; 
    var apiPath = wmsApiPath + 'IOTConfig/IOTdeviceIDbind';
    var postData =
    {
        ID: reportID,
        CustId: getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnparameter = [];
            spnparameterID = [];
            $("#ddlPageObjectobjrexta").html('<option >--Select--</option>');
            spnparameter.push('--Select--');
			spnparameterID.push('--Select--');
            var myParamList = data.Result;
            var ObjectParamList = myParamList.Table;
            if (ObjectParamList.length > 0) 
            {
                for (var i = 0; i < ObjectParamList.length; i++) 
                    {
                    var typedeviceId =ObjectParamList[i].deviceId;
                    //var typevalue = ObjectParamList[i].value;
                    spnparameter.push(typedeviceId);
                    //spnparameterID.push(typeId);
                    $("#ddlPageObjectobjrexta").append('<option value = "'+ typedeviceId +'">'+ typedeviceId +'</option>');
                    }
                    $('#ddlPageObjectobjrexta').val(devicecode);
            }
        }
        if($('#ddlPageObjectobjrexta').val() == devicecode)
         {
            
            getTemperture(reportID,devicecode,1);
        }        
    });    
}


function BinddeviceIDHumidity(reportID,devicecode) 
{     
    //debugger;
    //var apiPath = wmsApiPath + 'IOTConfig/deviceTypeIOTConfig';
   // var apiPath = 'http://localhost:50068/api/staging/v1/IOTConfig/IOTdeviceIDbind'; 
    var apiPath = wmsApiPath + 'IOTConfig/IOTdeviceIDbind';
    var postData =
    {
        ID: reportID,
        CustId: getCustomerId,
        WhId: getWarehouseId,
        UserId: getUserId,
        CompId: getCompanyId
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnparameter = [];
            spnparameterID = [];
            $("#ddlPageObjectobjrextaHumidity").html('<option >--Select--</option>');
            spnparameter.push('--Select--');
			spnparameterID.push('--Select--');
            var myParamList = data.Result;
            var ObjectParamList = myParamList.Table;
            if (ObjectParamList.length > 0) 
            {
                for (var i = 0; i < ObjectParamList.length; i++) 
                    {
                    var typedeviceId =ObjectParamList[i].deviceId;
                    //var typevalue = ObjectParamList[i].value;
                    spnparameter.push(typedeviceId);
                    //spnparameterID.push(typeId);
                    $("#ddlPageObjectobjrextaHumidity").append('<option value = "'+ typedeviceId +'">'+ typedeviceId +'</option>');
                    }
            }
            $('#ddlPageObjectobjrextaHumidity').val(devicecode);
        }     
        if($('#ddlPageObjectobjrextaHumidity').val() == devicecode)
        {
            getHumiditylineChart(reportID,devicecode,1); 
            //getHumidity(reportID,devicecode,1);
           // getlistHumidity(reportID,devicecode,1);
        }   
    });    
}















