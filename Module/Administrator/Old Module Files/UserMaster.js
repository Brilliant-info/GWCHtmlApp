// wmsLoadLayout(function () {loginCustomerId
//     init();
// });

//var apiFolder = 'http://173.212.244.46/WebAPITest/';
//var apiFolder = 'http://localhost:50068/';
//var apiServerPath = apiFolder + 'api/staging/v1/';
//var wmsApiPath = apiFolder + 'api/staging/v1/';

var getUserId = mBrillWmsSession.getUserId();
var companyid = mBrillWmsSession.getCompanyId();
var loginCustomerId = $("#ddlcustomer").val(); // mBrillWmsSession.getCustomerId();
var selectedsku = "";
var strCurrentPage = "1";
var globalUserID = '0';  
var chkcountrole =""; 
var searchfilter = "0";
var searchvalueuser = "0";
var strTotalRecords=10;
var searchvalue = "";

function initUserMaster() {
    
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





function getuserlist(strCurrentPage,searchfilter, searchvalueuser)
{
    debugger;
    
	var apiPath = wmsApiPath + 'User/GetUserlist';

     //  $("#ddlcustomer").val();
	// var getFilter='';
    // var Search = '';
     searchfilter = $("#ddlUserSearch").val();
     searchvalueuser = $("#txtsearchuser").val();

    if (searchfilter == '0'  ) {
        searchfilter = '0';
        searchvalueuser = '0';
    }
    var userGridMaxRecordLimit = "10";
	var postData = 
	{ 
        "CurrentPage": strCurrentPage,
        "RecordLimit": userGridMaxRecordLimit,
        "CustomerId": loginCustomerId,
		"UserId": getUserId,		
		"Search": searchfilter,
		"Filter": searchvalueuser
		
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var strTotalRecords = getresult.Table[0].TotalRecord;
             //alert(strTotalRecords);
			 var getAlluserlist = getresult.Table1;
             var usergrid="";
             var stateadd = "Add";

             usergrid = usergrid + '<div class="wms-srv-grid-header">';
            // usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;"></div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">User Type</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">First Name</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Last Name</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Employee No</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Email ID</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Mobile No</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Reporting To</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">User Name</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Active/Inactive</div>';
             usergrid = usergrid + '<div class="wms-srv-grid-cell wms-align" style="text-align: center;">Action</div>';
             usergrid = usergrid + '</div>';


            usergrid = usergrid + '<div class="wms-srv-grid-row wms-align">';                       
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<select  class="wms-srv-grid-cell-input" id="txtusertype">';           
            usergrid = usergrid + '</select>';
            usergrid = usergrid + '</div>';
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtfirstname"></div>';
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<input type="text" value="" class="wms-srv-grid-cell-input" required id="txtlastname"></div>';    
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<input type="text"  class="wms-srv-grid-cell-input" required id="txtempno"></div>';
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<input class="wms-srv-grid-cell-input" type="text" id="txtemail" onfocusout="validateEmailAddress(this,"0")" value=""></div>';
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<input class="wms-srv-grid-cell-input" type="text" maxlength=10 onkeypress="return isNumber(event)" id="txtmobile" value=""></div>';
            
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';  
            usergrid = usergrid + '<select  class="wms-srv-grid-cell-input" id="txtuserreportingto">';           
            usergrid = usergrid + '</select>';
            usergrid = usergrid + '</div>';

            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<input class="wms-srv-grid-cell-input" type="text" id="txtusername" value=""></div>';
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<input class="wms-srv-grid-cell-input" type="checkbox" id="myCheck1" checked="True" value=""></div>';
          //  usergrid = usergrid + '<input class="wms-srv-grid-cell-input" type="text" id="txtactinc" value=""></div>';
           // usergrid = usergrid + '<input class="wms-srv-grid-cell-input" type="checkbox" id="chkactive" value=""></div>'
            usergrid = usergrid + '<div class="wms-srv-grid-cell">';
            usergrid = usergrid + '<div class="wms-srv-grid-action">';
            usergrid = usergrid + '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV" onclick="SaveUser(\''+ stateadd +'\');">';
            usergrid = usergrid + '<i class="fas fa-check-circle"></i></a></div></div>';
            usergrid = usergrid + '</div>';
            for(var il=0; il < getAlluserlist.length; il++)
            {
                var getrowno = getAlluserlist[il].rownumber;
                var getuserid = getAlluserlist[il].userid;
				var getFirstName = getAlluserlist[il].FirstName;
                var getLastName = getAlluserlist[il].LastName;
                var getEmployeeNo = getAlluserlist[il].EmployeeNo;
                var getUserCompanyId = getAlluserlist[il].CompanyID;
                var getEmailID = getAlluserlist[il].EmailID;
                var getMobileNo = getAlluserlist[il].MobileNo;
                var getActive = getAlluserlist[il].Active;
                var getUserType = getAlluserlist[il].UserType;
                var getUsername = getAlluserlist[il].Username;
                var getlockunlock = getAlluserlist[il].lockunlock;
                var getSessionStatus = getAlluserlist[il].SessionStatus;
                var getreportingTo = getAlluserlist[il].reportingtoval;

                usergrid = usergrid + '<div class="wms-srv-grid-row wms-align" id="rowParameter_'+ getuserid+'" style="text-align: center;">';
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getUserType + "</div>";
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getFirstName + "</div>";
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getLastName + "</div>";
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getEmployeeNo + "</div>";
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getEmailID + "</div>";
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getMobileNo + "</div>";   
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getreportingTo + "</div>";               
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getUsername + "</div>";
                usergrid = usergrid + "<div class='wms-srv-grid-cell'>" + getActive + "</div>";

                usergrid = usergrid + '<div class="wms-srv-grid-cell">';
                usergrid = usergrid + '<div class="wms-srv-grid-action">';
                //usergrid = usergrid + '<a href="#" title="Notification" class="wms-srv-save" onclick="hold('+ getuserid +');"><i class="fas fa-solid fa-comment"></i></a>';
               // usergrid = usergrid + '<div class="wms-srv-action-sep"> | </div>';
                /* if(getlockunlock=="lock")
                {
				usergrid = usergrid + '<a href="#" title="Lock/Unlock" class="wms-srv-save" onclick="lockUnlock('+ getuserid +',\''+getlockunlock+'\',this);"><i class="fas fa-solid fa-lock"></i></a>'; 
                }
                else{
                usergrid = usergrid + '<a href="#" title="Lock/Unlock" class="wms-srv-save" onclick="lockUnlock('+ getuserid +',\''+getlockunlock+'\',this);"><i class="fas fa-solid fa-lock-open"></i></a>'; 
                } */
                if(getSessionStatus=="online")
                {
				    usergrid = usergrid + '<a href="#" title="Online" class="wms-srv-save" onclick="closeAllSession('+ getuserid +',\''+getUserCompanyId+'\',this);"><i class="fas fa-solid fa-lock"></i></a>'; 
                }
                else{
                    usergrid = usergrid + '<a href="#" title="Offline" class="wms-srv-save" onclick="closeAllSession('+ getuserid +',\''+getUserCompanyId+'\',this);" style="opacity:0.2;"><i class="fas fa-solid fa-lock-open"></i></a>'; 
                }
                
                usergrid = usergrid + '<div class="wms-srv-action-sep"> | </div>';
                usergrid = usergrid + '<a href="#" title="Edit" class="wms-srv-save" onclick="editGridDetails(\''+getuserid+'\',\''+getUserType+'\',\''+getFirstName+'\',\''+getLastName+'\',\''+getEmployeeNo+'\',\''+getEmailID+'\',\''+getMobileNo+'\',\''+getreportingTo+'\',\''+getUsername+'\',\''+getActive+'\');"><i class="fas fa-edit"></i></a>';
                usergrid = usergrid + '<div class="wms-srv-action-sep"> | </div>';
                usergrid = usergrid + '<a href="#" title="Role Master" class="wms-srv-save" onclick="openRoleMaster('+ getuserid +');"><i class="fas fa-solid fa-user-tag"></i></a>';
                usergrid = usergrid + '<div class="wms-srv-action-sep"> | </div>';
                usergrid = usergrid + '<a href="#" title="Add Customer" class="wms-srv-save" onclick="openCustomerPop('+ getuserid +');"><i class="fas fa-user-plus"></i></a>';
                usergrid = usergrid + '<div class="wms-srv-action-sep"> | </div>';
                usergrid = usergrid + '<a href="#" title="Add Warehouse" class="wms-srv-save" onclick="openUserWarhouseList('+ getuserid +');"><i class="fas fa-warehouse"></i></a>';
                usergrid = usergrid + '<div class="wms-srv-action-sep"> | </div>';
                usergrid = usergrid + '<a href="#" title="Add Client" class="wms-srv-save" onclick="openUserClientPopmain('+ getuserid +');"><i class="fas fa-user-plus"></i></a>';
 
                usergrid = usergrid + '</div>';				
                usergrid = usergrid + '</div>';
                usergrid = usergrid + '</div>';
            }
            $('#tbluserlist').html(usergrid);
            usertype();
            ReportingTo();
           // alert(strTotalRecords);
            setupGridPagingList('pagingUserMaster', strCurrentPage, strTotalRecords, getuserlist, userGridMaxRecordLimit);
         }
        else
        {
            alert('Something went wrong.');
        }	 

    });
    
}

function SearchUser() {
    debugger;
    searchfilter = $('#ddlUserSearch').val();
    searchvalueuser = $('#txtUserSearch').val();

    if (searchvalueuser == '' && searchfilter != "0") {
        alert('Please Enter Value for filter');
        
        getuserlist(strCurrentPage,searchfilter, searchvalueuser);
    }
    else {
        getuserlist(strCurrentPage,searchfilter, searchvalueuser);
    }
    if (searchfilter == '' && searchvalueuser == '') {
        getuserlist(strCurrentPage,searchfilter, searchvalueuser);
            }
}

// function PagingUserMaster(gridObjId, strCurrentPage, strTotalRecords, callBackFunction) { 
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
  
//       $('#pagingUserMaster .wms-srv-pager-links a').off();
//       $('#pagingUserMaster .wms-srv-pager-links a').click(function () {
//           var getDataPage = $(this).attr('data-page');
//           if (callBackFunction != null) {
        
//               //callBackFunction(getDataPage);
//               callBackFunction(getDataPage,'','');
//           }
//       });
   
//       $('#pagingUserMaster a.wms-srv-pager-go').off();
//       $('#pagingUserMaster a.wms-srv-pager-go').click(function ()
//       {
//           var getDataPage = $('#pagingUserMaster input[name="txtGridPageNo"]').val();
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
//                   //callBackFunction(getDataPage,searchfilter,searchvalueuser);
//                   callBackFunction(getDataPage,'','');
//               }
//           }       
//       });	     
// }

//*****Save User Code Start



function isNumber(evt)
 {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false; 
         return true;
 }

 function validateEmailAddress(emailVal,EmailID) {
   // alert(emailVal.value);
   debugger;

   var email = emailVal.value;
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
       $("#txtemail").val('');
       $("#txtemail").focus();
       }
       else{
       // $("#txtEditemailid").val('EmailID');
        $("#txtEditemailid").val('');
       // $("#txtEditemailid").focus();
       }
    }
    //return isEmailValid;
}

var spnUsertype = [];
var spnusertypeId = [];

function usertype()
{     
    debugger;
    var apiPath = wmsApiPath + 'User/GetUserTypeList'; 
    var postData={
        "CompanyId":companyid,
        "UserId":getUserId
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnUsertype = [];
            spnusertypeId = [];
            $("#txtusertype").html('<option >--Select--</option>');
            spnUsertype.push('--Select List--');
			spnusertypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    var typeId =grnContainerSize[i].ID;
                    var typevalue = grnContainerSize[i].Value;
                    spnUsertype.push(typevalue);
                    spnusertypeId.push(typeId);
                    $("#txtusertype").append('<option value = "'+ typeId +'">'+ typevalue +'</option>');
                    }
            }
        }        
    });    
}

var spnUserreportingto = [];
var spnuserreportingtoId = [];

function ReportingTo()
{     
    debugger;
    var apiPath = wmsApiPath + 'User/GetUserReportingToList'; 
    var postData={
        "CompanyId":companyid,
        "UserId":getUserId
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnUserreportingto = [];
            spnuserreportingtoId = [];
            $("#txtuserreportingto").html('<option >--Select--</option>');
            spnUserreportingto.push('--Select List--');
			spnuserreportingtoId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    var typeId =grnContainerSize[i].ID;
                    var typevalue = grnContainerSize[i].Value;
                    spnUserreportingto.push(typevalue);
                    spnuserreportingtoId.push(typeId);
                    $("#txtuserreportingto").append('<option value = "'+ typeId +'">'+ typevalue +'</option>');
                    }
            }
        }        
    });    
}

function SaveUser(adedtstat)
{
    debugger;
	if(validateUsersave(adedtstat) != false)	
	{
        var Usertype =""; getFirstName="";getEmployeeNo="";getEmailId="";getMobileNo="";getusername="";Userreportingto ="";
      var Active = 'No';
      var edituser ='0';
     // var createdby = getUserId;
      if(adedtstat == 'Add')
      {
        Usertype = $("#txtusertype option:selected").text();
        Userreportingto = $("#txtuserreportingto option:selected").val();
        if(Userreportingto == "--Select--"){
            Userreportingto = "0";
        }
        getFirstName = $("#txtfirstname").val();
        getLastName = $("#txtlastname").val();
        getEmployeeNo = $("#txtempno").val();
        getEmailId =  $("#txtemail").val();
        getMobileNo =  $("#txtmobile").val();
        getusername = $("#txtusername").val();  
        if($('#myCheck1').is(':checked'))
       {
        Active = 'Yes';
       }
      }
      else{
        edituser = globalUserID;
        Usertype = $("#txtEditUsertype option:selected").text();
        Userreportingto = $("#txtuserreportingto1 option:selected").val();
        if(Userreportingto == "--Select--"){
            Userreportingto = "0";
        }
        getFirstName = $("#txtEditfname").val();
        getLastName = $("#txtEditlname").val();
        getEmployeeNo = $("#txtEditempno").val();
        getEmailId =  $("#txtEditemailid").val();
        getMobileNo =  $("#txtEditmobno").val();
        getusername = '0';  
        if($('#txtEditactive').is(':checked'))
       {
        Active = 'Yes';
       }
        
      }     


       var postData = 
	{ 
        "CompanyId": companyid,
        "UserId": edituser,
		"UserType": Usertype,
		"FirstName": getFirstName,
		"LastName": getLastName,
		"EmployeeNo": getEmployeeNo,
		"EmailId": getEmailId,
		"MobileNo": getMobileNo,
		"username": getusername,	
        "Active": Active,
		"CreatedBy": getUserId,
        "ReportingTo": Userreportingto		
    };
    var apiPath = wmsApiPath + 'User/SaveUser';
	callHttpUrl(apiPath, postData, function (data) {
		 var getstatus = data.Status; 
		 var getstatuscode = data.StatusCode;
		 var getresult = data.Result;
         if(getstatus=="200" && getstatuscode=="Success")
		 {
			 var returnmsg = getresult.Message;
             if(returnmsg == "success")
			 {
                if(adedtstat == 'Add')
                {
                alert("User created Successfully.");
                }
                else
                {
                alert("User details Updated Successfully.");
                globalUserID='0';
                }
                getuserlist(1,searchfilter,searchvalue);
             }
             else
             {
                alert(returnmsg);
             }
         }
         else if (getstatus=="300")
         {
            var returnmsg = getresult.Message;
            alert(returnmsg);
         }
         else
         {
             alert("Error Occured.");
         }

    });

    }
   
}

function validateUsersave(state){
    if(state=="Add")
    {
	selectElement = document.querySelector('#txtusertype');
    if (selectElement.value == "--Select--"){
		alert("Please select User Type!");
		return false;
    }
	else if (document.getElementById("txtfirstname").value == "") 
	{
                alert("Please add FirstName!");	
				return false;				
	}	
	else if (document.getElementById("txtemail").value == ""){
		alert("Please add Email ID!");
		return false;
	}
	else if (document.getElementById("txtusername").value == ""){
		alert("Please add Username!");
		return false;
	}
}

    else{
        selectElement = document.querySelector('#txtEditUsertype');
        if (selectElement.value == "0"){
            alert("Please select User Type!");
            return false;
        }
       else if (document.getElementById("txtEditfname").value == "") 
	    {
                alert("Please add FirstName!");	
				return false;				
	    }	
	    else if (document.getElementById("txtEditemailid").value == ""){
		alert("Please add Email ID!");
		return false;
	}

    }
}

//*****Save User Code End


//***** User lock/unlock Code start

function lockUnlock(Userid,lockunlock,btnLock)
{
debugger;
   var lockunlockvalue = 'lock';
   if(lockunlock=="lock"){
    lockunlockvalue="unlock";
   }

   if(confirm("Do you want to "+ lockunlockvalue +" this User?")== true)
   {
   var postData = 
   {        
       "UserId": Userid,
       "lockunlock": lockunlockvalue	
   };
   var apiPath = wmsApiPath + 'User/LockUnlockUser';
   callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status; 
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if(getstatus=="200" && getstatuscode=="Success")
        {
            var returnmsg = getresult.Message;
            if(returnmsg == "success")
            {
               alert("User Successfully "+ lockunlockvalue +"."); 
              /* if(lockunlockvalue == 'lock'){
                $(btnLock).find('i').attr('class', 'fas fa-solid fa-lock');
               }else{
                $(btnLock).find('i').attr('class', 'fas fa-solid fa-lock-open');
               }*/
               getuserlist(strCurrentPage,searchfilter,searchvalue);
            }
            else
            {
               alert(returnmsg);
            }

        }
        else if (getstatus=="300")
         {
            var returnmsg = getresult.Message;
            alert(returnmsg);
         }
         else
         {
             alert("Error Occured.");
         }

   });
}

}

//***** User lock/unlock Code end

function closeAllSession(sessionUserId, sessionCompanyId, btnObj){
    var getRequesterUserId = mBrillWmsSession.getUserId();
    var getRequesterUserName = mBrillWmsSession.getLoginUserName();
    if(confirm("Do you want to clear all session for this user?")== true)
    {
    var postData = 
    {        
        "RequesterUserId": getRequesterUserId,
        "UserName": getRequesterUserName,
        "SessionUserId": sessionUserId,
        "SessionCompanyId": sessionCompanyId,
    };
    var apiPath = wmsApiPath + 'loginpage/CloseUserSessions';
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
         var getstatus = data.Status; 
         var getstatuscode = data.StatusCode;
         if(getstatus=="200" && getstatuscode=="Success")
         {
            var getResultData = data.Result;
            var getResult = getResultData.Table[0].Result;
            var getMessage = getResultData.Table[0].Message;
             if(getResult.toLowerCase() == "success")
             {
                alert("All session cleared for selected user."); 
                $(btnObj).attr('style', 'opacity:0.2;');
                $(btnObj).find('i').attr('class', 'fas fa-solid fa-lock-open');
             }
             else
             {
                alert(getMessage);
             }
         }
         else
          {
              alert("Failed to clear all sessions for selected user!!");
          }
    });
 }
}



//*****User Role Code Start



function searchInRoleMasterList(obj) {
    var getSearchKey = $(obj).val();
    if (getSearchKey.trim() != '') {
        $('.gridRoleMaster .wms-srv-group-head').hide();
        $('.gridRoleMaster .wms-srv-grid-row').hide();
        $('.gridRoleMaster .wms-srv-group-item').each(function () {
            var getMyText = $(this).text().toLowerCase();
            // alert(getSearchKey.toLowerCase());
            if (getMyText.indexOf(getSearchKey.toLowerCase()) > -1) {
                var getHeadTitle = $(this).data('head');
                $('.gridRoleMaster div[data-headgroup="' + getHeadTitle + '"]').show();
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }
        });
    } else {
        $('.gridRoleMaster .wms-srv-grid-row').show();
    }

}

//*****User Role Code End



//*****User Warehouse Code Start

function openUserWarhouseList(seluserid) {
    $("#wms-srv-Opn-WarehouseList-popup").show();
    GetUserWarehouseList(seluserid);
}

function GetUserWarehouseList(selecteduserid)
{
    debugger;  
    globalUserID =  selecteduserid;
    //var wmsApiPathlocal = "http://localhost:50068/api/staging/v1/";
    //var apiPath = wmsApiPathlocal + 'User/WarehouseList'; 

    var apiPath = wmsApiPath + 'User/WarehouseList'; 
    var postData = 
	{    
        "CompanyId": companyid,	    
		"UserId": globalUserID,
        "CreatedBy" : getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		{
            var userwarehouselist = getresult.Table1;
            var UserWareGrid="";

            UserWareGrid = UserWareGrid + '<div class="wms-srv-grid-header">';	
            UserWareGrid = UserWareGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Warehouse Code</div>';
            UserWareGrid = UserWareGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Warehouse Name</div>';	
            UserWareGrid = UserWareGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Type</div>';	
            UserWareGrid = UserWareGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
            UserWareGrid = UserWareGrid + '</div>';
            
            for(var li=0; li < userwarehouselist.length; li++)
            {
                var getUserWarehouseid = userwarehouselist[li].ID;
                var warehouseid = userwarehouselist[li].warehouseid;
                var getwarecode = userwarehouselist[li].warehouseCode;
                var getwareName = userwarehouselist[li].WarehouseName;
                var getwaretype = userwarehouselist[li].Type;
                
                UserWareGrid = UserWareGrid  + '<div id="divinvntrylstrow '+ getUserWarehouseid +'" class="wms-srv-grid-row wms-align">';               		
                UserWareGrid = UserWareGrid  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getwarecode +'</div>';
                UserWareGrid = UserWareGrid  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getwareName +'</div>';
                UserWareGrid = UserWareGrid  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getwaretype +'</div>';
                UserWareGrid = UserWareGrid  + '<div class="wms-srv-grid-cell">';
                UserWareGrid = UserWareGrid  + '<div class="wms-srv-grid-action">';
                UserWareGrid = UserWareGrid  + '<a href="#" title="Remove Warehouse" class="wms-srv-icononly" onclick="RemoveWarehouse('+ warehouseid +');"><i class="fas fa-times-circle"></i></a>';
                UserWareGrid = UserWareGrid  + '</div>'; 	
                UserWareGrid = UserWareGrid  + '</div>'; 
                UserWareGrid = UserWareGrid  + '</div>'; 
            }
             $('#UserWarehouseGrid').html(UserWareGrid);	
        }
        else{ 
            alert('Something went wrong.');
           }	
        });

}

function openallwarehouselist()
{
    $("#wms-srv-formlocation-popup").show();
    
   // var wmsApiPathlocal = "http://localhost:50068/api/staging/v1/";
   // var apiPath = wmsApiPathlocal + 'User/WarehouseList'; 

    var apiPath = wmsApiPath + 'User/WarehouseList'; 
    var postData = 
	{    
        "CompanyId": companyid,	    
		"UserId": globalUserID,
        "CreatedBy" : getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		{
            var getuserwarelist = getresult.Table;
            var Warehousegrd="";

            Warehousegrd = Warehousegrd + '<div class="wms-srv-grid-header">';	
            Warehousegrd = Warehousegrd + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
            Warehousegrd = Warehousegrd + '<div class="wms-srv-grid-cell" style="text-align: center;">Warehouse Code</div>';
            Warehousegrd = Warehousegrd + '<div class="wms-srv-grid-cell" style="text-align: center;">Warehouse Name</div>';		
            Warehousegrd = Warehousegrd + '</div>';
            
            for(var li=0; li < getuserwarelist.length; li++)
            {
                var getWarehouseid = getuserwarelist[li].Id;
                var getwarecode = getuserwarelist[li].warehouseCode;
                var getwareName = getuserwarelist[li].WarehouseName;
                
                Warehousegrd = Warehousegrd  + '<div id="divinvntrylstrow '+ getWarehouseid +'" class="wms-srv-grid-row wms-align">';
                Warehousegrd = Warehousegrd + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="Checkbox" name ="check" class="chkInventorySnapshot" id="'+ getWarehouseid +'"  class="messageCheckbox" value="' + getWarehouseid + '"></div>';			
                Warehousegrd = Warehousegrd  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getwarecode +'</div>';
                Warehousegrd = Warehousegrd  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getwareName +'</div>';
                Warehousegrd = Warehousegrd  + '</div>'; 	
            }
             $('#popupwaarehouselst').html(Warehousegrd);	
        }
        else{ 
            alert('Something went wrong.');
           }	
        });
    

}

function getWareSelectedCheckbox(){
	var selectedIds = '';
	$('.chkInventorySnapshot').each(function(){
		var isSelected = $(this).prop('checked');
		var myVal = $(this).val();
		if(isSelected){
			if(selectedIds == ''){
				selectedIds = myVal;
			}else{
				selectedIds = selectedIds + ',' + myVal;
			}
		}
	});
	//alert(selectedIds);
	return selectedIds;
}

function AddUserWarehouse()
{
	debugger;
    hdnsrchlocatnid='';
	var WarehouseID = getWareSelectedCheckbox();
	//var WarehouseID = selectedloc.split(",");
    if(WarehouseID !="")
	{
    var apiPath = wmsApiPath + 'User/AssginUserWarehouse'; 
    var postData = 
	{    
        "UserId": getUserId,
        "UID": globalUserID,
        "CompanyId": companyid,
        "WarehouseId": WarehouseID	    
		
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if(getstatus=="200" && getstatuscode=="Success")
        {
            var returnmsg = getresult.Message;
            if(returnmsg == "success")
            {
                alert("Warehouse successfully assigned to user.");
                GetUserWarehouseList(globalUserID);
            }
            else{
                alert("Failed to assign warehouse to user.");
            }
        }
        else
        {
            alert("Error Occured.");
        }
    });
    
	$('#wms-srv-formlocation-popup').hide();
}
else
	{
		alert("Please select warehouse.");
	}
	
}

function RemoveWarehouse(selectedwarehouse)
{
    debugger;
    if(confirm("Do you want to Remove warehouse from assigned list.Please confirm?")== true)
    {
    var apiPath = wmsApiPath + 'User/RemoveUserWarehouse'; 
    var postData = 
	{    
        "UserId": globalUserID,
        "WarehouseId": selectedwarehouse,
        "CreatedBy": getUserId      
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if(getstatus=="200" && getstatuscode=="Success")
        {
            var returnmsg = getresult.Message;
            if(returnmsg == "success")
            {
                alert("Warehouse removed from user assigned warehouse list.");
                GetUserWarehouseList(globalUserID);
            }
            else{
                alert("Remove warehouse from assigned list failed.");
            }
        }
        else
        {
            alert("Error Occured.");
        }
    });
}
else{}

}

//*****User Warehouse Code End

//*****User Customer Code start

function openCustomerPop(SelectedUser) {
    $("#wms-srv-Opn-Customer-popup").show();
    GetUserCustomerList(SelectedUser);
}

function GetUserCustomerList(selecteduserid)
{
    debugger;  
    globalUserID =  selecteduserid;
   // var wmsApiPathlocal = "http://localhost:50068/api/staging/v1/";
   // var apiPath = wmsApiPathlocal + 'User/CustomerList'; 

    var apiPath = wmsApiPath + 'User/CustomerList'; 
    var postData = 
	{    
        "CompanyId": companyid,	    
		"UserId": globalUserID,
        "CreatedBy" : getUserId

    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		{
            var usercustomerlist = getresult.Table1;
            var UserCustGrid="";

            UserCustGrid = UserCustGrid + '<div class="wms-srv-grid-header">';	
            UserCustGrid = UserCustGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer Code</div>';
            UserCustGrid = UserCustGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer Name</div>';	       
            UserCustGrid = UserCustGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
            UserCustGrid = UserCustGrid + '</div>';
            
            for(var li=0; li < usercustomerlist.length; li++)
            {
                var getusercustomerID = usercustomerlist[li].Id;               
                var getCustomercode = usercustomerlist[li].CustomerCode;
                var getCustomerName = usercustomerlist[li].CustomerName;
                
                
                UserCustGrid = UserCustGrid  + '<div id="divinvntrylstrow '+ getusercustomerID +'" class="wms-srv-grid-row wms-align">';               		
                UserCustGrid = UserCustGrid  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getCustomercode +'</div>';
                UserCustGrid = UserCustGrid  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getCustomerName +'</div>';              
                UserCustGrid = UserCustGrid  + '<div class="wms-srv-grid-cell">';
                UserCustGrid = UserCustGrid  + '<div class="wms-srv-grid-action">';
                UserCustGrid = UserCustGrid  + '<a href="#" title="Remove Warehouse" class="wms-srv-icononly" onclick="RemoveCustomer('+ getusercustomerID +');"><i class="fas fa-times-circle"></i></a>';
                UserCustGrid = UserCustGrid  + '</div>'; 	
                UserCustGrid = UserCustGrid  + '</div>'; 
                UserCustGrid = UserCustGrid  + '</div>'; 
            }
             $('#tblusercustomer').html(UserCustGrid);	
        }
        else{ 
            alert('Something went wrong.');
           }	
        });

}

function openallCustomerlist()
{
    debugger;
    $("#wms-srv-formallcustomer-popup").show();
   // var wmsApiPathlocal = "http://localhost:50068/api/staging/v1/";
   // var apiPath = wmsApiPathlocal + 'User/CustomerList'; 

    var apiPath = wmsApiPath + 'User/CustomerList'; 
    var postData = 
	{    
        "CompanyId": companyid,	    
		"UserId": globalUserID,
        "CreatedBy" : getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		{
            var getAllCustomerist = getresult.Table;
            var Allcustomergrd="";

            Allcustomergrd = Allcustomergrd + '<div class="wms-srv-grid-header">';	
            Allcustomergrd = Allcustomergrd + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
            Allcustomergrd = Allcustomergrd + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer Code</div>';
            Allcustomergrd = Allcustomergrd + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer Name</div>';		
            Allcustomergrd = Allcustomergrd + '</div>';
            
            for(var li=0; li < getAllCustomerist.length; li++)
            {
                var getuserCustomerID = getAllCustomerist[li].Id;
                var getCustName = getAllCustomerist[li].CustomerName;
                var getCustCode = getAllCustomerist[li].CustomerCode;
                var getCustActive = getAllCustomerist[li].Active;
                
                Allcustomergrd = Allcustomergrd  + '<div id="divinvntrylstrow '+ getuserCustomerID +'" class="wms-srv-grid-row wms-align">';
                Allcustomergrd = Allcustomergrd + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="Checkbox" name ="check" class="chkcustomerSnapshot" id="'+ getuserCustomerID +'"  class="messageCheckbox" value="' + getuserCustomerID + '"></div>';			
                Allcustomergrd = Allcustomergrd  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getCustCode +'</div>';
                Allcustomergrd = Allcustomergrd  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getCustName +'</div>';
                Allcustomergrd = Allcustomergrd  + '</div>'; 	
            }
             $('#tblallCustomerlst').html(Allcustomergrd);	
        }
        else{ 
            alert('Something went wrong.');
           }	
        });
}

function getCustomerCheckbox(){
    debugger;
	var selectedIds = '';
	$('.chkcustomerSnapshot').each(function(){
		var isSelected = $(this).prop('checked');
		var myVal = $(this).val();
		if(isSelected){
			if(selectedIds == ''){
				selectedIds = myVal;
			}else{
				selectedIds = selectedIds + ',' + myVal;
			}
		}
	});
	//alert(selectedIds);
	return selectedIds;
}

function AddUserCustomer()
{
    debugger;
	hdnsrchlocatnid='';
	var selCustomerid = getCustomerCheckbox();
	//var WarehouseID = selectedloc.split(",");
    if(selCustomerid !="")
	{
    var apiPath = wmsApiPath + 'User/AssginUserCustomer'; 
    var postData = 
	{    
        "UserId": globalUserID,
        "CreatedBy": getUserId,
        "CustomerId": selCustomerid	    
		
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if(getstatus=="200" && getstatuscode=="Success")
        {
            var returnmsg = getresult.Message;
            if(returnmsg == "success")
            {
                alert("Customer successfully assigned to user.");
                GetUserCustomerList(globalUserID);
            }
            else{
                alert("Failed to assign Customer to user.");
            }
        }
        else
        {
            alert("Error Occured.");
        }
    });
    
    $("#wms-srv-formallcustomer-popup").hide();
}
else
	{
		alert("Please select Customer.");
	}
	
}

function RemoveCustomer(selectedcustomer)
{
    if(confirm("Do you want to Remove Customer from assigned list.Please confirm?")== true)
    {
    var apiPath = wmsApiPath + 'User/RemoveUserCustomer'; 
    var postData = 
	{    
        "UserId": globalUserID,
        "CustomerId": selectedcustomer,
        "CreatedBy": getUserId      
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getstatus =  data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if(getstatus=="200" && getstatuscode=="Success")
        {
            var returnmsg = getresult.Message;
            if(returnmsg == "success")
            {
                alert("Customer removed from user assigned Customer list.");
                GetUserCustomerList(globalUserID);
            }
            else{
                alert("Remove Customer from assigned list failed.");
            }
        }
        else
        {
            alert("Error Occured.");
        }
    });
}
else
{}

}

//***** User Customer Code End

//***** User Client Code Start

function openUserClientPopmain(selectedclientuser) {
    
  $("#wms-srv-Opn-Client-popup").show();   
  openUserClientPop(selectedclientuser);
}

function openUserClientPop(selecteduserid)
{
    debugger;  
    globalUserID =  selecteduserid;
   // var customerid = 1; // $("#ddlcustomer").val();
    var apiPath = wmsApiPath + 'User/ClientAssignList'; 
    var postData = 
	{   
        "UserId": globalUserID, 
        "CustomerID": loginCustomerId 		
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		{
            var userClientlist = getresult.Table;
            var UserClientGrid="";

            UserClientGrid = UserClientGrid + '<div class="wms-srv-grid-header">';	
            UserClientGrid = UserClientGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Client Code</div>';
            UserClientGrid = UserClientGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Client Name</div>';	       
            UserClientGrid = UserClientGrid + '<div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
            UserClientGrid = UserClientGrid + '</div>';
            
            for(var li=0; li < userClientlist.length; li++)
            {
                var getClientID = userClientlist[li].clientid;               
                var getClientcode = userClientlist[li].ClientCode;
                var getClientName = userClientlist[li].ClientName;
                
                
                UserClientGrid = UserClientGrid  + '<div id="divinvntrylstrow '+ getClientID +'" class="wms-srv-grid-row wms-align">';               		
                UserClientGrid = UserClientGrid  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getClientcode +'</div>';
                UserClientGrid = UserClientGrid  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getClientName +'</div>';              
                UserClientGrid = UserClientGrid  + '<div class="wms-srv-grid-cell">';
                UserClientGrid = UserClientGrid  + '<div class="wms-srv-grid-action">';
                UserClientGrid = UserClientGrid  + '<a href="#" title="Remove Warehouse" class="wms-srv-icononly" onclick="RemoveClient('+ getClientID +');"><i class="fas fa-times-circle"></i></a>';
                UserClientGrid = UserClientGrid  + '</div>'; 	
                UserClientGrid = UserClientGrid  + '</div>'; 
                UserClientGrid = UserClientGrid  + '</div>'; 
            }
             $('#tbluserClient').html(UserClientGrid);	
        }
        else{ 
            alert('Something went wrong.');
           }	
        });

}

function openallClientlist()
{
    debugger;
    $("#wms-srv-formallClient-popup").show();
    var apiPath = wmsApiPath + 'User/ClientList'; 
    var postData = 
	{    
        "UserId": globalUserID,
        "CompanyId": companyid	    
		
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		{
            var getAllClientist = getresult.Table;
            var AllClientgrd="";

            AllClientgrd = AllClientgrd + '<div class="wms-srv-grid-header">';	
            AllClientgrd = AllClientgrd + '<div class="wms-srv-grid-cell" style="text-align: center;"></div>';
            AllClientgrd = AllClientgrd + '<div class="wms-srv-grid-cell" style="text-align: center;">Client Code</div>';
            AllClientgrd = AllClientgrd + '<div class="wms-srv-grid-cell" style="text-align: center;">Client Name</div>';
            AllClientgrd = AllClientgrd + '<div class="wms-srv-grid-cell" style="text-align: center;">SAP Code</div>';		
            AllClientgrd = AllClientgrd + '</div>';
            
            for(var li=0; li < getAllClientist.length; li++)
            {
                var getClientID = getAllClientist[li].Id;
                var getClName = getAllClientist[li].ClientName;
                var getClCode = getAllClientist[li].clientCode;
                var getClSAPcode = getAllClientist[li].SAPCode;
                
                AllClientgrd = AllClientgrd  + '<div id="divinvntrylstrow '+ getClientID +'" class="wms-srv-grid-row wms-align">';
                AllClientgrd = AllClientgrd + '<div class="wms-srv-grid-cell" style="text-align:center;"><input type="Checkbox" name ="check" class="chkclientSnapshot" id="'+ getClientID +'"  class="messageCheckbox" value="' + getClientID + '"></div>';			
                AllClientgrd = AllClientgrd  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getClCode +'</div>';
                AllClientgrd = AllClientgrd  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getClName +'</div>';
                AllClientgrd = AllClientgrd  + '<div class="wms-srv-grid-cell" style="text-align:center;">'+ getClSAPcode +'</div>';
                AllClientgrd = AllClientgrd  + '</div>'; 	
            }
             $('#tblallClientlst').html(AllClientgrd);	
        }
        else{ 
            alert('Something went wrong.');
           }	
        });
}

function getClientCheckbox(){
    debugger;
	var selectedIds = '';
	$('.chkclientSnapshot').each(function(){
		var isSelected = $(this).prop('checked');
		var myVal = $(this).val();
		if(isSelected){
			if(selectedIds == ''){
				selectedIds = myVal;
			}else{
				selectedIds = selectedIds + ',' + myVal;
			}
		}
	});
	//alert(selectedIds);
	return selectedIds;
}

function AddUserClient()
{
    debugger;
	hdnsrchlocatnid='';
	var selClientid = getClientCheckbox();
   // var customer = 1; // $("#ddlcustomer").val();	
	//var WarehouseID = selectedloc.split(",");
    if(selClientid !="")
	{
    var apiPath = wmsApiPath + 'User/AssginUserClient'; 
    var postData = 
	{    
        "UserId": globalUserID ,
        "ClientId":selClientid,
        "CreatedBy": getUserId,
        "CustomerId": loginCustomerId    		
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status; 
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if(getstatus=="200" && getstatuscode=="Success")
        {
            var returnmsg = getresult.Message;
            if(returnmsg == "success")
            {
                alert("Client successfully assigned to user.");
                openUserClientPop(globalUserID);
            }
            else{
                alert("Failed to assign Client to user.");
            }
        }
        else
        {
            alert("Error Occured.");
        }
    });
    
    $("#wms-srv-formallClient-popup").hide();
}
else
	{
		alert("Please select Client.");
	}
	
}

function RemoveClient(selectedClient)
{
    if(confirm("Do you want to Remove Client from assigned list.Please confirm?")== true)
    {
    var apiPath = wmsApiPath + 'User/RemoveUserClient'; 
    var postData = 
	{    
        "UserId": globalUserID,
        "ClientId": selectedClient,
        "CreatedBy": getUserId      
    };

    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status; 
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if(getstatus=="200" && getstatuscode=="Success")
        {
            var returnmsg = getresult.Message;
            if(returnmsg == "success")
            {
                alert("Client removed from user assigned Client list.");
                openUserClientPop(globalUserID);
            }
            else{
                alert("Remove Client from assigned list failed.");
            }
        }
        else
        {
            alert("Error Occured.");
        }
    });
}
else
{}

}

//***** User Client Code End

function editGridDetails(userid,UserType,FName,LName,EmployeeNo,EmailID,MobileNo,getreportingto,getUsername,getActive) {
    $("#editusergridValues").show();
    $("#beforeedituserGridValues").hide();
    userEditGrid(userid,UserType,FName,LName,EmployeeNo,EmailID,MobileNo,getreportingto,getUsername,getActive);
}

function userEditGrid(userid,UserType,FName,LName,EmployeeNo,EmailID,MobileNo,getreportingto,getUsername,getActive)
{ 
        debugger;
		globalUserID = userid;
	    var gridRow = '';
        var Stateedit = "Edit";

        gridRow = gridRow + '<div class="wms-srv-grid-cell">';
        gridRow = gridRow +  bindVendortypeDropDown(userid, UserType);
        gridRow = gridRow + '</div>';

		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditfname" class="wms-srv-grid-cell-input" value="'+FName+'" /></div>';
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditlname" class="wms-srv-grid-cell-input" value="'+LName+'" /></div>';
    
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditempno" class="wms-srv-grid-cell-input" value="'+EmployeeNo+'" /></div>';
        
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" id="txtEditemailid" onfocusout="validateEmailAddress(this,\''+ EmailID +'\')" class="wms-srv-grid-cell-input" value="'+EmailID+'" /></div>';
        
		gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="text" maxlength=10 onkeypress="return isNumber(event)" id="txtEditmobno" class="wms-srv-grid-cell-input" value="'+MobileNo+'" /></div>';
        
        // New Reporting to code
        gridRow = gridRow + '<div class="wms-srv-grid-cell">';
        gridRow = gridRow +  bindreportingToDropDown(userid, getreportingto);
        gridRow = gridRow + '</div>';
       // New Reporting to code 

		gridRow = gridRow + "<div class='wms-srv-grid-cell'>" + getUsername + "</div>";  
        if(getActive == 'Yes'){
            gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditactive" class="wms-srv-grid-cell-input" value="'+getActive+'" checked="checked" /></div>';
        }else{
            gridRow = gridRow + '<div class="wms-srv-grid-cell"><input type="checkbox" id="txtEditactive" class="wms-srv-grid-cell-input" value="'+getActive+'" /></div>';
        }
       
	   	gridRow = gridRow + '<div class="wms-srv-grid-cell"><div class="wms-srv-grid-action"><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="SaveCustParameter" title="Save" onclick="SaveUser(\''+ Stateedit +'\')";></i></a><a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" title="Cancel" onclick="gridEditUserHide('+userid+')"></i></a></div></div>';
		//gridRow = gridRow + '<div class="wms-srv-grid-action">';		
		//gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" id="SaveCustParameter" onclick="AddEditVendor(\''+vendorEditId+'\',\''+GetvendorId+'\',\''+VendorName+'\',\''+VendorCode+'\',\''+sector+'\',\''+value+'\',\''+LedgerNo+'\',\''+Active+'\')";></i></a>';
		//gridRow = gridRow + '<a href="#" title="Edit" class="wms-srv-save" data-prefix="SV"><i class="fas fa-times-circle" onclick="gridEditvendorHide('+vendorEditId+')"></i></a></div></div>';
		
        $("#rowParameter_" + userid).html(gridRow);
				
}

function gridEditUserHide(userid)
{	
	$("#rowParameter_" + userid).html('');	
	getuserlist(strCurrentPage,searchfilter,searchvalue);	
}


function bindVendortypeDropDown(UserID, UserType){
	debugger;
    venodrGlbalID = UserID;
	var ddlVendortype = '';
	ddlVendortype = '<select class="wms-srv-grid-cell-input" id="txtEditUsertype">';  // txtEditUsertype'+ UserID +'"
	for(var i=0; i < spnUsertype.length; i++){
		if(spnUsertype[i] == UserType){
			ddlVendortype += '<option value = "'+ spnusertypeId[i]+'" selected="selected">'+ spnUsertype[i] +'</option>';
		}else{
			ddlVendortype += '<option value = "'+ spnusertypeId[i]+'">'+ spnUsertype[i] +'</option>';
		}
	}
	ddlVendortype += '</select>';
	return ddlVendortype;
}

function bindreportingToDropDown(UserID, UserType){
	debugger;
    venodrGlbalID = UserID;
	var ddlreportingTo = '';
	ddlreportingTo = '<select class="wms-srv-grid-cell-input" id="txtuserreportingto1">';  // txtEditUsertype'+ UserID +'"
	for(var i=0; i < spnUserreportingto.length; i++){
		if(spnUserreportingto[i] == UserType){
			ddlreportingTo += '<option value = "'+ spnuserreportingtoId[i]+'" selected="selected">'+ spnUserreportingto[i] +'</option>';
		}else{
			ddlreportingTo += '<option value = "'+ spnuserreportingtoId[i]+'">'+ spnUserreportingto[i] +'</option>';
		}
	}
	ddlreportingTo += '</select>';
	return ddlreportingTo;
}

//***** Role Master Code start

var spnRole = [];
var spnRoleId = [];

function openRoleMaster(roleselecteduser) {
    $("#wms-srv-Opn-RoleMaster-popup").show();
    globalUserID = roleselecteduser;
    BindRoleDropdown();
   // GetRoleDetailsByID();
}

function addNewRole() {

    let person = prompt("Enter Role Name");
    if (person == "") {
        alert("Please Enter Value");
    }
}


function BindRoleDropdown()
{     
    debugger;
    var apiPath = wmsApiPath + 'User/GetmRoleList'; 
    var postData={
        "CompanyId":companyid,
        "UserID": globalUserID,
        "CreatedBy":getUserId,
        "CustomerID":loginCustomerId
    };
    callHttpUrl(apiPath,postData, function (data)
    {
        var isStatus = data.Status;
        if (isStatus == 200) {
            spnRole = [];
            spnRoleId = [];
            $("#ddlrolelist").html('<option >--Select--</option>');
            spnRole.push('--Select List--');
           spnRole.push('superadmin-');
			spnRoleId.push('1');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            var userroleidresult = myGridList.Table1;
            var userroleid = userroleidresult[0].ID;

            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) 
                    {
                    var rolleid =grnContainerSize[i].ID;
                    var rolevalue = grnContainerSize[i].Name;
                    spnRole.push(rolevalue);
                    spnRoleId.push(rolleid);
                    if(rolleid == userroleid)
                    {
                        $("#ddlrolelist").append('<option value = "'+ rolleid +'" selected="selected">'+ rolevalue +'</option>');
                        GetRoleDetailsByID();
                    }
                    else{
                        $("#ddlrolelist").append('<option value = "'+ rolleid +'">'+ rolevalue +'</option>');
                    }
                    
                    }
            }
        }        
    });    
}


function GetRoleDetailsByID()
{
    debugger;  
   // globalUserID =  selecteduserid;
    var RoleID = $("#ddlrolelist").val();
    if(RoleID !=0)
    {
    var apiPath = wmsApiPath + 'User/GetmRoleDetailList'; 
    var postData = 
	{   
        "Roleid": RoleID, 
        "UserID": globalUserID,
        "CreatedBy": getUserId 		
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;	
        if(getstatus=="200" && getstatuscode=="Success")
		{

            $('#chkallrole').attr('checked',false);

            var RoleDetaillist = getresult.Table;
            var RoleDetail="";

            RoleDetail = RoleDetail + '<div class="wms-srv-grid-header">';	
            RoleDetail = RoleDetail + '<div class="wms-srv-grid-cell">Menu Name</div>';  	       
            RoleDetail = RoleDetail + '<div class="wms-srv-grid-cell">Action</div>';
            RoleDetail = RoleDetail + '</div>';
            
            if(RoleDetaillist.length != 0)
            {
            for(var li=0; li < RoleDetaillist.length; li++)
            {
                var getroledetailID = RoleDetaillist[li].ID;               
                var getMenuName = RoleDetaillist[li].MenuLable;
                var getmenulevel = RoleDetaillist[li].menulevel;
                var getMenuID = RoleDetaillist[li].MenuID;
                var getAssigned = RoleDetaillist[li].Assigned;
                var GetRoleID = RoleDetaillist[li].RoleID;
                             
                
                RoleDetail = RoleDetail  + '<div id="divinvntrylstrow '+ getroledetailID +'" class="wms-srv-grid-row wms-srv-group-head">'; 
                if(getmenulevel == 1) 
                {             		
                RoleDetail = RoleDetail  + '<div class="wms-srv-grid-cell" >'+ getMenuName +'</div>';   
                }
                else if(getmenulevel == 2)  
                {
                  //  RoleDetail = RoleDetail  + '<div class="wms-srv-grid-row" ></div>';  
                    RoleDetail = RoleDetail  + '<div class="wms-srv-grid-cell wms-srv-group-item" data-head="User Master" >'+ getMenuName +'</div>';  
                }                        
                RoleDetail = RoleDetail  + '<div class="wms-srv-grid-cell">';
                RoleDetail = RoleDetail  + '<div class="wms-srv-grid-action">';
                if(getAssigned == 'Y')
                {
                    RoleDetail = RoleDetail  + '<a href="#" title="Add" class="wms-srv-cancel" data-prefix="CN" onclick="SaveUserRoleDetails('+getroledetailID+','+getMenuID+',this)" ><i class="fas fa-check-circle"  style="opacity: 1;"></i></a>'; 
                    if(RoleID == GetRoleID)
                    {
                    $('#chkallrole').prop('checked',true);
                    }
                    else
                    {
                      //  $('#chkallrole').removeAttr('checked');
                     //   $('#chkallrole').attr('checked',false);
                        $('#chkallrole').prop('checked', false);
                    }
                }
                else
                {
                RoleDetail = RoleDetail  + '<a href="#" title="Add" class="wms-srv-cancel" data-prefix="CN" onclick="SaveUserRoleDetails('+getroledetailID+','+getMenuID+',this)" ><i class="fas fa-check-circle"  style="opacity: 0.2;"></i></a>';
               // $('#chkallrole').removeAttr('checked');
              //  $('#chkallrole').attr('checked',false);
                $('#chkallrole').prop('checked', false);
                }
                RoleDetail = RoleDetail  + '</div>'; 	
                RoleDetail = RoleDetail  + '</div>'; 
                RoleDetail = RoleDetail  + '</div>'; 

               
            }
         
             
           }
            else{
                alert('Record Not found.');
                $('#gridRoleMaster').html('');
               
            }
            $('#gridRoleMaster').html(RoleDetail);	
        }
        else{ 
            alert('Something went wrong.');
           }	
        });

    }
    else
    {
        $('#gridRoleMaster').html('');
    }

}

function SaveUserRoleDetails(RoleDetailID,MenuID, btnvalue)
{
    debugger;
    var selectedRoleid = $("#ddlrolelist").val();

    var apiPath = wmsApiPath + 'User/CheckuserPreRole';
    var userpresentrole = '';
    var postData =
    {
        "Roleid": selectedRoleid,
        "UserID": globalUserID,
        "CreatedBy": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
            var checkpreRole = getresult.Table;
            userpresentrole = checkpreRole[0].chkrolesv;


            // Start save/delete role menus code  
            var Actionvalue = "";
            var checkopacity = $(btnvalue).find('i').css('opacity');
            if (checkopacity == "0.2") {
                Actionvalue = "Add";
            }
            else {
                Actionvalue = "Delete";
            }
            var postData =
            {
                "Roleid": selectedRoleid,
                "UserID": globalUserID,
                "CompanyID": companyid,
                "CreatedBy": getUserId,
                "RoleDetailID": RoleDetailID,
                "MenuID": MenuID,
                "Action": Actionvalue
            };
            var apiPath = wmsApiPath + 'User/SaveUserRoleDetails';

            // check if admin change assigned role and try to add different role menu to user then confirm if ok then delete old role all menu and add new role menues.
            // if userpresentrole = NewRole then no need to delete old role menus it is new role
            if (userpresentrole == "NewRole") {

                if (Actionvalue == "Add") {

                    callHttpUrl(apiPath, postData, function (data) {
                        var getstatus = data.Status; 
                        var getstatuscode = data.StatusCode;
                        var getresult = data.Result;
                        if (getstatus == "200" && getstatuscode == "Success") {
                            var returnmsg = getresult.Message;
                            if (returnmsg == "success") {
                                if (Actionvalue == "Add") {
                                    $(btnvalue).find('i').css('opacity', '1');
                                    alert("Menu Added Successfully.")
                                }
                                /*  else{
                                     $(btnvalue).find('i').css('opacity','0.2');
                                     alert("Menu Removed Successfully.")
                                 }*/

                            }
                            else {
                                alert(returnmsg);
                            }

                        }
                    });
                }
                else if (Actionvalue == "Delete") {
                    if (confirm("Do you want to remove user access to this menu?") == true) {
                        callHttpUrl(apiPath, postData, function (data) {
                            var getstatus = data.Status;
                            var getstatuscode = data.StatusCode;
                            var getresult = data.Result;
                            if (getstatus == "200" && getstatuscode == "Success") {
                                var returnmsg = getresult.Message;
                                if (returnmsg == "success") {
                                    $(btnvalue).find('i').css('opacity', '0.2');
                                    alert("Menu Removed Successfully.");
                                }
                                else {
                                    alert(returnmsg);
                                }
                            }
                        });
                    }
                }
            }

            // if userpresentrole = RoleChange then show confirmation messageo ok delete old record and add new role menues.
            else if (userpresentrole == "RoleChange") {
                if (confirm("Adding New Role Menu will remove existing Role all menus?") == true) {

                    if (Actionvalue == "Add") {
                        callHttpUrl(apiPath, postData, function (data) {
                            var getstatus = data.Status; 
                            var getstatuscode = data.StatusCode;
                            var getresult = data.Result;
                            if (getstatus == "200" && getstatuscode == "Success") {
                                var returnmsg = getresult.Message;
                                if (returnmsg == "success") {
                                    if (Actionvalue == "Add") {
                                        $(btnvalue).find('i').css('opacity', '1');
                                        alert("Menu Added Successfully.")
                                    }
                                    else {
                                        $(btnvalue).find('i').css('opacity', '0.2');
                                        alert("Menu Removed Successfully.")
                                    }

                                }
                                else {
                                    alert(returnmsg);
                                }

                            }
                        });
                    }

                }
                else {

                }
            }

            // End save/delete role menus code 

        }
    });


}

/*function SaveSelectAllRole()
{
    debugger;
    var RoleID = $("#ddlrolelist").val();
    var existrolecheck = checkUserPreRole();

    if(existrolecheck == "NewRole")
    var postData =
    {
        "Roleid": RoleID,
        "UserID": globalUserID,
        "CreatedBy": getUserId        
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
       
        }
        else{
            alert("Error Occured.");
        }
    });
}*/

function ActionSelectAllRole(checkRoleExist)
{
    debugger;
    var RoleID = $("#ddlrolelist").val();
    var rolechkboxval = "";// $('#chkallrole').is(':checked'); // $("#chkallrole").val();

    if($('#chkallrole').is(':checked'))
    {
        rolechkboxval="Yes";
    }
    else
    {
        rolechkboxval="No";
    }
   // var localpath = 'http://localhost:50068/api/staging/v1/'
   // var apiPath = localpath + 'User/SaveRemSelectAllRole';

    var apiPath = wmsApiPath + 'User/SaveRemSelectAllRole';
   
    var postData =
    {
        "Roleid": RoleID,
        "UserID": globalUserID,
        "CompanyID": companyid,
        "CreatedBy": getUserId,
        "Action" : checkRoleExist,
        "Checkval" : rolechkboxval,
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
            if(rolechkboxval=="Yes")
            {
                alert("All menus assigned to User.");
                GetRoleDetailsByID();
            }
            else
            {
                alert("All menus removed from user roles.");
                GetRoleDetailsByID();
            }

         
        }
        else{
            alert("Error Occured.");
        }
    });
}

function checkUserPreRole()
{
    debugger;
    var selectedRoleid = $("#ddlrolelist").val();
    //var localpath = 'http://localhost:50068/api/staging/v1/'
    //var apiPath = localpath + 'User/CheckuserPreRole';
    var apiPath = wmsApiPath + 'User/CheckuserPreRole';
    
    var checkRoleExist = '';
    var postData =
    {
        "Roleid": selectedRoleid,
        "UserID": globalUserID,
        "CreatedBy": getUserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getstatus = data.Status;
        var getstatuscode = data.StatusCode;
        var getresult = data.Result;
        if (getstatus == "200" && getstatuscode == "Success") {
            var checkpreRole = getresult.Table;
            checkRoleExist = checkpreRole[0].chkrolesv;
            //return checkRoleExist;
            if(checkRoleExist == "NewRole")
            {
                //alert("On Select All");
                ActionSelectAllRole(checkRoleExist);
            }
            else if(checkRoleExist == "RoleChange")
            {
                if (confirm("Adding New Role Menu will remove existing Role all menus?") == true) {
              // alert("Existing role change");
                    ActionSelectAllRole(checkRoleExist);
                }
            }
        }
        else
        {
            alert("Error Occured");
        }
    });

}




//***** Role Master Code End
