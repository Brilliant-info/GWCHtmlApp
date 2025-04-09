// wmsLoadLayout(function(){
// 	init();
// });
//var apiServerPath = 'http://164.68.123.40/WebAPITest/api/staging/v1/'
//var apiLocalPath = 'http://localhost:50068/api/staging/v1/'
var strCurrentPage = '1';
var getTotalRecords = '100';
var CurrentPage='1';
var RecordLimit ='5';
var CustomerId = '1';
var UserId = mBrillWmsSession.getUserId();
var searchfilter = '0';
var searchvalue = '0';
var CompanyId=mBrillWmsSession.getCompanyId();    //use
var getCustomerId=$("#ddlcustomer").val();   //use
//var WarehouseId= $("#ddlwarehouse").val();
var ContactId='2422';
var AddressId='3422';
var globalvendorID = '0'   
var getvendorID = '0';
var ObjectName="vendordocument";
var DocumentwarehouseID = $("#ddlwarehouse").val();
var DocumentUserId = 540;
var DocumentCompanyId = 10095;
var globalDocumentFilePath = '';
var globalDocumentFileType = '';
var ddlVendorType = '';
var venodrGlbalID ='';




function initVendorMaster(){

    getvendorList(strCurrentPage, searchfilter, searchvalue)
 /*   $("#txtSearchRecord").click(function(){
        getvendorList(strCurrentPage, searchfilter, searchvalue);
    });*/
    vendortype()
}
function clearSearchFilter()
{
    debugger
    $('#searchCustomer').val('ALL');
    $('#valueCustomer').val('');
    getvendorList(strCurrentPage, searchfilter, searchvalue);
}


function openDocumentPopup() {

    $('#wms-srv-Document-popup').show();
    $('#wms-srv-Document-popup-close').off();
    $('#wms-srv-Document-popup-close').click(function () {
        $('#wms-srv-Document-popup').hide();
    });
}
function openContactPopup() {
    $('#wms-srv-contact-popup').show();
    $('#wms-srv-contact-popup-close').off();
    $('#wms-srv-contact-popup-close').click(function () {
        $('#wms-srv-contact-popup').hide();
    });
}
function showEditWarehouseRow(){
    $('#wms-srv-edit-beforevendor').hide(); 
    $('#wms-srv-edit-vendor').show(); 
}
function hideEditWarehouseRow(){
    $('#wms-srv-edit-beforevendor').show(); 
    $('#wms-srv-edit-vendor').hide(); 
}


function showEditWarehouseRow1(){
    $('#wms-srv-beforeedit-warehouse6').hide(); 
    $('#wms-srv-edit-warehouse6').show(); 
}
function hideEditWarehouseRow1(){
    $('#wms-srv-beforeedit-warehouse6').show(); 
    $('#wms-srv-edit-warehouse6').hide(); 
}

var spnVendortype = [];
var spnVendortypeId = [];

function vendortype()
{     
    //debugger;
    var apiPath = wmsApiPath + 'Vendor/vendorType'; 
    var postData={

    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnVendortype = [];
            spnVendortypeId = [];
            $("#txtvendortype").html('<option value="">--Select--</option>');
            spnVendortype.push('--Select List--');
			spnVendortypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    var vendorId =grnContainerSize[i].Id;
                    var vendorvalue = grnContainerSize[i].value;
                    spnVendortype.push(vendorvalue);
                    spnVendortypeId.push(vendorId);
                    $("#txtvendortype").append('<option value = "'+ vendorId +'">'+ vendorvalue +'</option>');
                    }
            }
        }        
    });    
}
//Vendor Tyep Drop Down//

function getvendorList(strCurrentPage, searchfilter, searchvalue) {
    debugger;
	var apiPath = wmsApiPath + 'Vendor/GetVendorList';
    var searchfilter = $('#searchCustomer').val();
    var searchvalue = $('#valueCustomer').val();
    if (searchfilter == '')
    {
        searchfilter = '0';
        searchvalue = '0';
    }	
    var postData =
    {
        CurrentPage: strCurrentPage,
        RecordLimit: getTotalRecords,
        CustomerId: getCustomerId,
        UserId: UserId,
        Search: searchfilter,
        Filter: searchvalue,
       // Search: searchfilter
    };
   
    callHttpUrl(apiPath, postData, function (data) {
       
        var getStatus = data.Status;
       
        if (getStatus == 200)
      {
            var myGridList = data.Result;
			var getTotalRecords = myGridList.VendorListResult[0].TotalRecords;
			currentPage = myGridList.VendorListResult[0].CurrentPage;		 
     
            $('#vendorGridList').html('');  	            
            var gridTable = '';
            // GRID HEADER        
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Vendor Name</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Vendor Code</div>';      
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Vendor Type</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Vendor Email</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Vendor Contact</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Ledger No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Active</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';
			
            gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';        
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtvendorname"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtvendorcode"></div>';        
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<select  class="wms-srv-grid-cell-input" id="txtvendortype">';           
            gridTable = gridTable + '</select>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtVendorEmail"></div>';        
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text" value="" class="wms-srv-grid-cell-input" onkeypress="javascript:return isPhNumber(event);" required id="txtVendorContact" maxlength="10"></div>';        
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input type="text"  class="wms-srv-grid-cell-input" required id="txtledgerno"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<input class="wms-srv-grid-cell-input" type="checkbox" id="myCheck1" value="" checked="true"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action">';
            gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveNewVendor(0);">';
            gridTable = gridTable + '<i class="fas fa-check-circle" style="color:black !important" ></i></a></div></div>';
            gridTable = gridTable + '</div>';  			
            
            // GRID HEADER
            for (var i = 0; i <myGridList.VendorListResult[0].Table.length;i++)
             {
                getvendorID = myGridList.VendorListResult[0].Table[i].ID;
                var getName = myGridList.VendorListResult[0].Table[i].VendorName;
                var getCode = myGridList.VendorListResult[0].Table[i].VendorCode;
                //  var getSector = myGridList.Table1[i].Sector;
                var getValue = myGridList.VendorListResult[0].Table[i].VendorType;
                var getVendorEmail = myGridList.VendorListResult[0].Table[i].VendorEmail;
                var getVendorContactNo = myGridList.VendorListResult[0].Table[i].VendorContactNo;
                var getLedgerNo = myGridList.VendorListResult[0].Table[i].ledgerNo;
                var getActive = myGridList.VendorListResult[0].Table[i].Active;
                // GRID ROW
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="rowParameter_'+ getvendorID+'" style="text-align: center;">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getName + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getCode + "</div>";
              //  gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getSector + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getValue + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getVendorEmail + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getVendorContactNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getLedgerNo + "</div>";
               gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActive + "</div>";
               // gridTable = gridTable + '<div class="wms-srv-grid-cell">'
              //  gridTable = gridTable + '<input type="checkbox"  id="checkvendorList"  checked  data-prefix="SESKU" data-id=""  class="wms-srv-grid-cell-input notranslate"></div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                gridTable = gridTable + '<div class="wms-srv-grid-action">';
                gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="vendorEditGrid(\''+getvendorID+'\',\''+getName+'\',\''+getCode+'\',\''+getValue+'\',\''+getVendorEmail+'\',\''+getVendorContactNo+'\',\''+getLedgerNo+'\',\''+getActive+'\')";></i></a>';
                gridTable = gridTable + '<div class="wms-srv-action-sep"> | </div>';
                gridTable = gridTable + '<i class="fas fa-user-plus" title="Contact Info" onclick="openVendorContactPopUp('+getvendorID+')"></i>';
                //gridTable = gridTable + '<div class="wms-srv-action-sep">|</div>';
               // gridTable = gridTable + '<i class="fas fa-file-alt" title="Document" onclick="openDocumentPopup(\''+getvendorID+'\')"></i>';
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
            debugger;
            $('#vendorGridList').html(gridTable);
            vendortype(); 			
            setupGridPagingList('vendorListSOGridPager', strCurrentPage, getTotalRecords, getvendorList);
        }
        else {
            alert('Unable to connect');
        }
    });
}

function isPhNumber(evt)
      {
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

function validateEmailID(getEmailObj)
{
	var empt = getEmailObj;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	        if (empt == "") 
			{
                alert("Email Id cannot be blank.");
				return false;
			}
			else if (empt=="" || (!empt.match(mailformat)))
            {
				alert("Not a Valid email address!");
				return false;
            } 
			else
			{
				return true;
			}
}

function validateVendorSave(vendorid)
{
    var getVendorEmail = $("#txtVendorEmail").val();
    var getVendorContactNo = $("#txtVendorContact").val();
    if(vendorid =='0')
    {
        if (document.getElementById("txtvendorname").value == "") 
	{
                alert("Please add Vendor Name!");	
				return false;				
	}	
	else if (document.getElementById("txtvendorcode").value == ""){
		alert("Please add Vendor Code!");
		return false;
	}
    else if (document.getElementById("txtvendorcode").value == ""){
		alert("Please add Vendor Code!");
		return false;
	}
    else if (document.getElementById("txtvendortype").value == ""){
		alert("Please Select Vendor Type!");
		return false;
	}
    
    else if (validateEmailID(getVendorEmail) == false){
	
		return false;
	}
    else if (getVendorContactNo == ''){
        alert("Please Contact No..!");
		return false;
	}
    else if(getVendorContactNo.length < 10){
        alert("Please Enter 10 Digit ContactNo...!");
		return false;
    }
    else if (document.getElementById("txtledgerno").value == ""){
		alert("Please add Ledger No!");
		return false;
	}
    
    }
}

function SaveNewVendor(vendorid)
{	debugger;
	var getVendorId = vendorid;// globalvendorID
	var apiPath = wmsApiPath + 'Vendor/AddEditVendor';
   //var apiPath="http://localhost:50068/api/staging/v1/Vendor/AddEditVendor";
   if(validateVendorSave(vendorid) != false)	
   {
	if(getVendorId =='0')
	{		
		var getVendorName = $("#txtvendorname").val();	
		var getvendorcode = $("#txtvendorcode").val();		 
		var getvendortype = $("#txtvendortype").val();	
        var getVendorEmail = $("#txtVendorEmail").val();
        var getVendorContact = $("#txtVendorContact").val();
		var getledgerno = $("#txtledgerno").val();
		var getActive=$("#myCheck1").is(":checked");
	}
  
	//Edit Parameter
	else{
	
		var getVendorName = $("#txtEditvendorname").val();	
		var getvendorcode = $("#txtEditvendorcode").val();		 
		var getvendortype = $("#txtEditVenodrtype"+ venodrGlbalID).val();	
		
        var getVendorEmail = $("#txtEditVendorEmail").val();
        var getVendorContact = $("#txtEditVendorContactNo").val();

        var getledgerno = $("#txtEditledgerno").val();
		var getActive = $("#txtEditactive").is(":checked");
        // if(getvendorcode == " ")
        // {
        //     alert("Vendor is already availble,Please change venodor code");
        // }
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
                CompanyID:CompanyId,
                VendorId:getVendorId,
                CustomerId:getCustomerId,
                UserId:UserId,
                VendorName: getVendorName,
                VendorCode:getvendorcode,
                //Sector: "-",
                VendorType:getvendortype,
                VendorEmail : getVendorEmail,
                vendorContact: getVendorContact,
                LedgerNo:getledgerno,
                Active: getActive
     };
	 
    callHttpUrl(apiPath, postData, function(data)
      {
        var isSuccess = data.Status;
        var getvendorresult = data.Result;
        if (isSuccess == 200)
        {
            var returvnmsg = getvendorresult.Message;
            if(returvnmsg == "success")
			 {
                if(vendorid == 0)
                {
                  alert('Vendor Saved Successfully!!');
                }
                else
                {
                    alert('Vendor updated Successfully!!');
                }
                getvendorList(strCurrentPage, searchfilter, searchvalue);
             }
             else
             {
                alert(returnmsg);
             }	
           
        }
        else 
        {
            alert('Error Occured!!');
        }
    });

   }
	
}

function vendorEditGrid(vendorEditId,VendorName,VendorCode,vendorTypeId,getVendorEmail,getVendorContact,LedgerNo,Active)
{ 
        debugger;
		globalvendorID = vendorEditId;
	    var gridRow = '';
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditvendorname" class="wms-srv-grid-cell-input" value="'+VendorName+'" /></div>';
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditvendorcode" class="wms-srv-grid-cell-input" value="'+VendorCode+'" /></div>';
       // gridRow = gridRow + '<div class="wms-srv-grid-cell"><select type="text" id="txtsector" class="wms-srv-grid-cell-input"><option value="">-- Select --</option><option value="String"></option><option value="Number"></option></select></div>';
       // gridRow = gridRow + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="txtEditVenodrtype"><option value="0">-- Select --</option><option value="81">Loader</option><option value="82">Unloader</option><option value="83">Supplier</option><option value="84">Transporter</option><option value="113">Driver</option><option value="224">Labour</option><option value="251">Carrier</option></select></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell" >';
        gridRow = gridRow +  bindVendortypeDropDownEdit(vendorEditId, vendorTypeId);
        gridRow = gridRow + '</div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditVendorEmail" class="wms-srv-grid-cell-input" value="'+getVendorEmail+'" /></div>';
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditVendorContactNo" class="wms-srv-grid-cell-input" value="'+getVendorContact+'" /></div>';
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditledgerno" class="wms-srv-grid-cell-input" value="'+LedgerNo+'" /></div>';
       
        if(Active == 'Yes'){
            gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditactive" class="wms-srv-grid-cell-input" value="'+Active+'" checked="checked" /></div>';
        }else{
            gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditactive" class="wms-srv-grid-cell-input" value="'+Active+'" /></div>';
        }
       
	   	gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="SaveCustParameter" title="Save" style="color:black !important" onclick="SaveNewVendor('+vendorEditId+')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" title="Cancel" onclick="gridEditvendorHide('+vendorEditId+')"></i></a></div></div>';
		//gridRow = gridRow + '<div class="wms-srv-grid-action">';		
		//gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="SaveCustParameter" onclick="AddEditVendor(\''+vendorEditId+'\',\''+GetvendorId+'\',\''+VendorName+'\',\''+VendorCode+'\',\''+sector+'\',\''+value+'\',\''+LedgerNo+'\',\''+Active+'\')";></i></a>';
		//gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditvendorHide('+vendorEditId+')"></i></a></div></div>';
		
        $("#rowParameter_" + vendorEditId).html(gridRow);
				
}
function gridEditvendorHide(vendorEditId)
{	
	$("#rowParameter_" + vendorEditId).html('');	
	getvendorList(strCurrentPage, searchfilter, searchvalue);	
}
// function setupGridPagingcustomer(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) { 
//     debugger;
//       var global_max_record_count = 10;
//       var pageNo = Number(strCurrentPage);
//       var recordFrom = ((pageNo - 1) * 10) + 1;
//       var recordTo = recordFrom + 9;
//       var totalRecord = Number(strTotalRecords);
//       var pagerLinks = '';
  
//       $('#' + gridObjId + ' .wms-srv-pager-records').html(recordFrom + '-' + recordTo + ' of ' + totalRecord + ' Records');
//       var lnkCounter = 1;
//       var currentCounter = global_max_record_count;
//       //var currentCounter = 0;
//       var lastPage = 0;
//       while (currentCounter < totalRecord) {
//           if (lnkCounter == pageNo) {
//               pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//           } else {
//               pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//               lastPage = lnkCounter;
//           }
//           global_last_page_no = lnkCounter;
//           currentCounter = currentCounter + global_max_record_count;
//           lnkCounter = lnkCounter + 1;
//       }
  
//       /* Add Page linke for remaining record */
//       if (currentCounter > totalRecord) {
     
//           if (lnkCounter == pageNo) {
//               pagerLinks += '<a href="#" class="wms-srv-active" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//           } else {
//               pagerLinks += '<a href="#" data-page="' + lnkCounter + '">' + lnkCounter + '</a>';
//               lastPage = lnkCounter;
//           }
//           // Update last page count - 21 Sept 2021
//           this.global_last_page_no = lnkCounter;
//       }
//       /* Add Page linke for remaining record */
//       var pagerNavLinks = '';
//       pagerNavLinks = '<a href="#" data-page="1"><i class="fas fa-angle-double-left" title="First"></i></a>';
//       // pagerNavLinks += '<a href="#" data-page="previous"><i class="fas fa-angle-left"></i></a>';
//       pagerNavLinks += pagerLinks;
//       //  pagerNavLinks += '<a href="#" data-page="next"><i class="fas fa-angle-right"></i></a>';
//       pagerNavLinks += '<a href="#" data-page="' + lastPage + '"><i class="fas fa-angle-double-right" title="Last"></i></a>';
  
//       $('#' + gridObjId + ' .wms-srv-pager-links').html(pagerNavLinks);
  
//       $('#c .wms-srv-pager-links a').off();
//       $('#vendorListSOGridPager .wms-srv-pager-links a').click(function () {
//           var getDataPage = $(this).attr('data-page');
//           if (callBackFunction != null) {
        
//               callBackFunction(getDataPage);
//           }
//       });
   
//       $('#vendorListSOGridPager a.wms-srv-pager-go').off();
//       $('#vendorListSOGridPager a.wms-srv-pager-go').click(function ()
//       {
//           var getDataPage = $('#vendorListSOGridPager input[name="txtGridPageNo"]').val();
//           if(Number(getDataPage) < 1)
//           {
//               alert('Please enter valid page number!!');
//           }else if(Number(getDataPage)  > Number(lastPage))
//           {
//               //alert('Page number should not be greater than '+ lastPage +' !!');
//               alert('Please enter valid page number!!');
//           }else
//           {
//                if (callBackFunction != null) {
//                   callBackFunction(getDataPage,searchfilter,searchvalue);
//               }
//           }       
//       });	     
// }

function SearchVendorfilter()
{
    debugger;
    searchfilter = $('#searchCustomer').val();
    searchvalue = $('#valueCustomer').val();

    if (searchvalue == "" && searchfilter !="") 
    {
        alert('Please Enter value for filter');
    }
    else {

        getvendorList(strCurrentPage, searchfilter, searchvalue);

    }
}


function bindVendortypeDropDownEdit(vendorEditId, vendortype){
	debugger;
    venodrGlbalID = vendorEditId;
	var ddlVendortype = '';
	ddlVendortype = '<select class="wms-srv-grid-cell-input" id="txtEditVenodrtype'+ vendorEditId +'">';
	for(var i=0; i < spnVendortype.length; i++){
		if(spnVendortype[i] == vendortype){
			ddlVendortype += '<option value = "'+ spnVendortypeId[i]+'" selected="selected">'+ spnVendortype[i] +'</option>';
		}else{
			ddlVendortype += '<option value = "'+ spnVendortypeId[i]+'">'+ spnVendortype[i] +'</option>';
		}
	}
	ddlVendortype += '</select>';
	return ddlVendortype;
}



//start contact address code

function openVendorContactPopUp(selectedVendorid) {
    debugger;
    $('#wms-srv-contact-popup-Vendor').show();
    $('#wms-srv-contact-Vendor-popup-close').off();
    $('#wms-srv-contact-Vendor-popup-close').click(function () {
        $('#wms-srv-contact-popup-Vendor').hide();

    });
       globalvendorID = selectedVendorid;
       VendorContactList(selectedVendorid);
}

function gridEditContactHide(ContactID,VendorIDcl){
    $("#ParameterRow" + ContactID).html('');
    VendorContactList(VendorIDcl);
}

function VendorContactList(VendorID) {
    debugger;
    var beforeSVcontactid= 0;
    var apiPath = wmsApiPath + 'Contact/ContactList';
    var postData =
    {
        "CurrentPage": "1",
        "RecordLimit": "10",
        "CompanyId": CompanyId,
        "UserId": UserId,
        "CustomerId": getCustomerId,
        "WarehouseId": DocumentwarehouseID,
        "Filter": "0",
        "Search": "0",
        "Object": "Vendor",
        "ObjectId": VendorID
    }
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        if (getStatus == 200) {
            debugger;
            var gridList = data.Result;
         //   $("#gridbind").html();
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
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id="" value="" id="txtemailid" onblur="validatevlEmailAddress(this,0)" class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU"  onkeypress="return isNumber(event)" data-id="" value="" id="txtmobileno" class="wms-srv-grid-cell-input"></div>';
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
            gridTable = gridTable + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveVendContAddress('+ VendorID +','+ beforeSVcontactid +');"><i class="fas fa-check-circle" style="color:black !important" ></i></a>';
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
                gridTable = gridTable + '<i class="fas fa-edit" title="Edit" onclick="VendContactEditGrid('+ VendorID +',' + getContactID + ',\'' + getContactName + '\',\'' + getEmailId + '\',\'' + getMobileNo + '\',\'' + getAddress + '\',\''+ getCountry +'\',\''+ getState +'\',\''+ getCity +'\',\''+ getPostalCode +'\',\''+ getActive +'\')";></i></a><div class="wms-srv-action-sep">|</div>';

                // gridTable = gridTable + '<i class="fas fa-edit" title="Edit" ></i></a><div class="wms-srv-action-sep">|</div>';
                // gridTable = gridTable + '<i class="fas fa-code" title="Parameter" ></i></a>  <div class="wms-srv-action-sep">|</div>';
                // gridTable = gridTable + '<i class="fas fa-user-plus" title="Contact Info" onclick="openContactPopUp();"></i></a>';

                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';

            }
            $("#VendorContGrid").html(gridTable);
            // setupGridPagingwarehouse('paging-client', strCurrentPage, getTotalRecords, ClientList);
        }

    });
}

function SaveVendContAddress(vendorID,ContactID) {
    debugger;

    var getvendor= globalvendorID;
    if(validateVendorContact(ContactID) != false)	
	{
    
    var apiPath = wmsApiPath + "Contact/SaveContact";
    var Active = 'No';
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
        if ($('#txtEditconactive').is(':checked')) {
            Active = 'Yes';
        }
    }

    var postData =
    {
        "ContactID": ContactID,
        "ObjectName": "Vendor",
        "ReferenceID": vendorID,
        "ContactName": getContactname,
        "EmailID": getEmailID,
        "MobileNo": getMobileNo,
        "Address": getAddress,
        "Country": getCountry,
        "State": getState,
        "City": getCity,
        "PostalCode": getPostalcode,
        "Active": Active,
        "CompanyID": CompanyId,
        "CreatedBy": UserId
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
                VendorContactList(vendorID);
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

function VendContactEditGrid(getVendorid,ContactID,getContactName,getEmailId,getMobileNo,getAddress,getCountry,getState,getCity,getPostalCode,getActive){
    debugger;
    var gridRow = '';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcontactname" class="wms-srv-grid-cell-input" value="' + getContactName + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditemailid" onblur="validatevlEmailAddress(this,\''+ getEmailId +'\')" class="wms-srv-grid-cell-input" value="' + getEmailId + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text"  onkeypress="return isNumber(event)" id="txteditmobileno" class="wms-srv-grid-cell-input" value="' + getMobileNo + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="editAddress" class="wms-srv-grid-cell-input" value="' + getAddress + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcountry" class="wms-srv-grid-cell-input" value="' + getCountry + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditstate" class="wms-srv-grid-cell-input" value="' + getState + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditcity" class="wms-srv-grid-cell-input" value="' + getCity + '" /></div>';
    gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txteditpostalcode" class="wms-srv-grid-cell-input" value="' + getPostalCode + '" /></div>';
   
    if(getActive == 'Yes'){
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditconactive" class="wms-srv-grid-cell-input" value="'+getActive+'" checked="checked" /></div>';
    }else{
        gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditconactive" class="wms-srv-grid-cell-input" value="'+getActive+'" /></div>';
    }

    gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action">';
    gridRow = gridRow + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"> <i class="fas fa-check-circle" id="SaveCustParameter" onclick="SaveVendContAddress('+ getVendorid +',' + ContactID + ')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditContactHide(' + ContactID + ','+ getVendorid +')"></i></a></div></div>';

    $("#ParameterRow" + ContactID).html(gridRow);
}

function validateVendorContact(VendorID){
    if(VendorID == "0")
    {
       if (document.getElementById("txtcontactname").value == "") 
       {
                   alert("Please add Contact Name!");	
                   return false;				
       }	
       else if (document.getElementById("txtemailid").value == ""){
           alert("Please add EmailID!");
           return false;
       }
       else if (document.getElementById("txtAddress").value == ""){
           alert("Please add Address!");
           return false;
       }
   }
   else{
    if (document.getElementById("txteditcontactname").value == "") 
    {
        alert("Please add Contact Name!");	
        return false;				
    }	
    else if (document.getElementById("txteditemailid").value == ""){
        alert("Please add EmailID!");
        return false;
    }
    else if (document.getElementById("editAddress").value == ""){
        alert("Please add Address!");
        return false;
    }
   }
   }

   function isNumber(evt)
   {
           var charCode = (evt.which) ? evt.which : event.keyCode
           if (charCode > 31 && (charCode < 48 || charCode > 57))
              return false; 
           return true;
   }
  
   function validatevlEmailAddress(emailVal,EmailID) {
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
         if(EmailID=="0")
         {
         $("#txtemailid").val('');
         $("#txtemailid").focus();
         }
         else{
         // $("#txtEditemailid").val('EmailID');
          $("#txteditemailid").val('');
          $("#txteditemailid").focus();
  
         }
        }
      }
      //return isEmailValid;
      
  }
  

