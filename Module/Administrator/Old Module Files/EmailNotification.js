
var UserId = mBrillWmsSession.getUserId();
var WarehouseId = mBrillWmsSession.getWarehouseId();
var CustomerId = mBrillWmsSession.getCustomerId();
var CompanyId = mBrillWmsSession.getCompanyId();
var IDEmail = '';


function initEmailNotification() {
  $('.gridCallBackAPISetup i.fa-check-circle').click(function () {
    var getOpacity = $(this).css('opacity');
    if (getOpacity == 1) {
      $(this).css('opacity', '0.2');
    } else {
      $(this).css('opacity', '1');
    }
  });
  getEmailSMSList();

}

function TemplatelistWhatsapp(ID) {
  $('#wms-srv-Template-Whatsapp-popup-show').show();
  IDEmail = ID
  $('#wms-srv-Template-Whatsapp-popup-close').off();
  $('#wms-srv-Template-Whatsapp-popup-close').click(function () {
    $('#wms-srv-Template-Whatsapp-popup-show').hide();
  });
  BindWhatsupTemplate();
  $('#txtAddWhatsup').val('');
  $('#txtshowWatsapp').hide();
  $('.txtAddRoles').val('');
  $('#txtshowRoles').hide();


}

function TemplatelistEMail(ID) {
  $('#wms-srv-Template-popup-show').show();
  IDEmail = ID
  $('#wms-srv-Template-popup-close').off();

  $('#wms-srv-Template-popup-close').click(function () {
    $('#wms-srv-Template-popup-show').hide();
  });
  BindEmailTemplate();
  $('#txtEmailsave').val('');
  //$("#pnlEmailBlock").show();
  $('#txtshow').hide();
  $('#txtAddRolesEmail').val('');
  $('#txtshowRolesEmail').hide();

}

function TemplatelistSMS(ID) {
  $('#wms-srv-Template-SMS-popup-show').show();
  IDEmail = ID
  $('#wms-srv-Template-SMS-popup-close').off();
  $('#wms-srv-Template-SMS-popup-close').click(function () {
    $('#wms-srv-Template-SMS-popup-show').hide();
  });
  BindSMSTemplate();
  $("#txtAddSMS").val('');
  $('#txtshowSMS').hide();
  $('#txtAddRoleSMS').val('');
  $('#txtshowRoleSMS').hide();


}

function getEmailSMSList() {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/EmailSmSList';

  var postData =
  {
    "UserId": UserId,
    "CustomerID": CustomerId,
    "WarehouseID": WarehouseId
  }

  callHttpUrl(apiPath, postData, function (data) {

    var getStatus = data.Status;

    if (getStatus == 200) {
      var myGridList = data.Result;

      $('#emailsmsList').html('');
      var gridTable = '';
      // GRID HEADER        
      gridTable = gridTable + '<div class="wms-srv-grid-header">';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Event Code</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Event Name</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Module</div>';
      // gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Active</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Application</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">WhatsApp Configuration</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">Email Configuration</div>';
      gridTable = gridTable + '<div class="wms-srv-grid-cell " style="text-align: center;">SMS Configuration</div>';

      gridTable = gridTable + '</div>';


      // GRID HEADER
      for (var i = 0; i < myGridList.Table.length; i++) {
        var ID = myGridList.Table[i].ID;
        var getEventCode = myGridList.Table[i].EventCode;
        var getEventName = myGridList.Table[i].EventName;
        var getModule = myGridList.Table[i].Module;
        var getActive = myGridList.Table[i].Active;
        var getEmailMode = myGridList.Table[i].EmailMode;
        var getSmsMode = myGridList.Table[i].SmsMode;
        var getWhatsupMode = myGridList.Table[i].WhatsupMode;
        var getApplication = myGridList.Table[i].Application;
        // GRID ROW
        gridTable = gridTable + '<div class="wms-srv-grid-row wms-align"  style="text-align: center;">';
        gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getEventCode + "</div>";
        gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getEventName + "</div>";
        gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getModule + "</div>";
        // gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getActive + "</div>";
        gridTable = gridTable + "<div class='wms-srv-grid-cell'>" + getApplication + "</div>";

        gridTable = gridTable + "<div class='wms-srv-grid-cell'>";
        if (getWhatsupMode == "1") {
          gridTable = gridTable + '<input type="checkbox" id="txtmyCheckwhatsup' + ID + '" class="wms-srv-input"  onchange="ActiveEmailSMS(' + ID + ',1,0,0);" checked="checked">';
        }
        else {
          gridTable = gridTable + '<input type="checkbox" id="txtmyCheckwhatsup' + ID + '" onchange="ActiveEmailSMS(' + ID + ',1,0,0);"" class="wms-srv-input" >';
        }
        gridTable = gridTable + "<div class='wms-srv-action-sep'> | </div>";
        gridTable = gridTable + '<i class="fab fa-whatsapp" onclick="TemplatelistWhatsapp(' + ID + ')"></i>';
        gridTable = gridTable + "</div>";

        gridTable = gridTable + "<div class='wms-srv-grid-cell'>";
        if (getEmailMode == "1") {
          gridTable = gridTable + '<input type="checkbox" id="txtmyCheckEmail' + ID + '" class="wms-srv-input"  onchange="ActiveEmailSMS(' + ID + ',0,1,0);" checked="checked">';
        }
        else {
          gridTable = gridTable + '<input type="checkbox" id="txtmyCheckEmail' + ID + '" onchange="ActiveEmailSMS(' + ID + ',0,1,0);"" class="wms-srv-input" >';
        }
        gridTable = gridTable + "<div class='wms-srv-action-sep'> | </div>";
        gridTable = gridTable + '<i class="fas fa-solid fa-envelope" onclick="TemplatelistEMail(' + ID + ')"></i>';
        gridTable = gridTable + "</div>";
        gridTable = gridTable + "<div class='wms-srv-grid-cell'>";
        if (getSmsMode == "1") {
          gridTable = gridTable + '<input type="checkbox" id="txtmyCheckSMS' + ID + '" class="wms-srv-input" onchange="ActiveEmailSMS(' + ID + ',0,0,1);" checked="checked">';
        }
        else {
          gridTable = gridTable + '<input type="checkbox" id="txtmyCheckSMS' + ID + '" onchange="ActiveEmailSMS(' + ID + ',0,0,1);" class="wms-srv-input">'
        }
        gridTable = gridTable + "<div class='wms-srv-action-sep'> | </div>";
        gridTable = gridTable + '<i class="fas fa-sms" onclick="TemplatelistSMS(' + ID + ')"></i>';

        gridTable = gridTable + "</div>"
        gridTable = gridTable + "</div>";

      }
      debugger;
      $('#emailsmsList').html(gridTable);

    }
    else {
      alert('Unable to connect');
    }
  });
}

function BindWhatsupTemplate() {
  debugger;

  var apiPath = wmsApiPath + "EmailSmSNotification/EmailSMSTemplate";
  var postData =
  {
    "EmailTemplateID": IDEmail,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Whatsup"
  }

  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var popup = data.Result.Table;
    if (getStatus == 200) {
      //getID= popup[0].ID;
      // getAddWhatsup = popup[0].AddWhatsup; AddWhatsupNo
      getAddWhatsup = popup[0].AddWhatsupNo;
      getWhatsupBODY = popup[0].SMSBODY;
      getRoleWhatsapp = popup[0].RoleForWhatsapp;

      // $('#txtcarriertype').val(getID);

      // $('#txtAddWhatsup').val(getAddWhatsup);
      //$('#pnlWhatsupAddGroup').html(getAddWhatsup);
      $('#pnlWhatsupAddGroup').html('<div class="pnlEmailBlock"> ' + getAddWhatsup + '</div>');

      $('#txtWhatsupbody').val(getWhatsupBODY);

      //$('.txtwhatRole').html(getRoleWhatsapp);
      $('.txtwhatRole').html('<div class="pnlEmailBlock"> ' + getRoleWhatsapp + '</div>');
    }
    else {
      alert('Unable to connect Server!!');
    }
  });
}

function BindEmailTemplate() {
  debugger;
  var apiPath = wmsApiPath + "EmailSmSNotification/EmailSMSTemplate";
  var postData =
  {
    "EmailTemplateID": IDEmail,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Web"
  }

  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var popup = data.Result.Table;
    if (getStatus == 200) {
      //getID= popup[0].ID;
      getAddEmail = popup[0].AddEmail;
      getEmailSubject = popup[0].EmailSubject;
      getEmailBody = popup[0].EmailBody;
      getEmailFooter = popup[0].EmailFooter;
      getRoleForEmail = popup[0].RoleForEmail;

      //$('#txtcarriertype').val(getID);

      //$('#pnlEmailAddGroup').html(getAddEmail);
      $('#pnlEmailAddGroup').html('<div class="pnlEmailBlock"> ' + getAddEmail + '</div>');


      $('#txtSubject').val(getEmailSubject);
      $('#txtbody').val(getEmailBody);
      $('#txtfooter').val(getEmailFooter);


      // $('.txtEmailRole').html(getRoleForEmail);
      $('.txtEmailRole').html('<div class="pnlEmailBlock"> ' + getRoleForEmail + '</div>');

    }
    else {
      alert('Unable to connect Server!!');
    }

  });
}

function BindSMSTemplate() {
  debugger;
  var apiPath = wmsApiPath + "EmailSmSNotification/EmailSMSTemplate";
  var postData =
  {
    "EmailTemplateID": IDEmail,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Mobile"
  }

  callHttpUrl(apiPath, postData, function (data) {
    var getStatus = data.Status;
    var popup = data.Result.Table;
    if (getStatus == 200) {
      //getID= popup[0].ID;
      getAddSMSNO = popup[0].AddSMSNO;
      getSMSBODY = popup[0].SMSBODY;

      getRoleForSMS = popup[0].RoleForSMS;

      // $('#txtcarriertype').val(getID);

      // $('#txtAddSMS').val(getAddSMSNO);
      // $('#pnlSMSAddGroup').html(getAddSMSNO);
      $('#pnlSMSAddGroup').html('<div class="pnlEmailBlock"> ' + getAddSMSNO + '</div>');

      $('#txtsmsbody').val(getSMSBODY);

      //$('.txtSMSRole').html(getRoleForSMS);
      $('.txtSMSRole').html('<div class="pnlEmailBlock"> ' + getRoleForSMS + '</div>');

    }
    else {
      alert('Unable to connect Server!!');
    }
  });
}

function ActiveEmailSMS(ID, getWhatsupMode, getEmailMode, getSmsMode,) {
  debugger;
  var apiPath = wmsApiPath + "EmailSmSNotification/EmailSmsActive";
  var getEmailActive = $("#txtmyCheckEmail" + ID + "").is(":checked");
  var getSMSActive = $("#txtmyCheckSMS" + ID + "").is(":checked");
  var getWhatsupActive = $("#txtmyCheckwhatsup" + ID + "").is(":checked");
  var chksms = '0';
  var chkEmail = '0'
  var chkWhatsup = '0'

  if (getEmailActive == true) {
    chkEmail = '1';

  }
  if (getSMSActive == true) {
    chksms = '1';

  }
  if (getWhatsupActive == true) {
    chkWhatsup = '1';

  }

  var postData =
  {
    "TemplateID": ID,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "CompanyID": CompanyId,
    "WarehouseID": WarehouseId,
    "Email": chkEmail,
    "SMS": chksms,
    "whatsup": chkWhatsup
  }

  callHttpUrl(apiPath, postData, function (data) {
    var isSuccess = data.Status;
    var getEmailSMSresult = data.Result;
    if (isSuccess == 200) {
      var returvnmsg = getEmailSMSresult.Message;
      if (returvnmsg == "success") {
        if (getEmailActive == true && getEmailMode == '1') {
          alert('Assigned Successfully!!');
        }
        else if (getSMSActive == true && getSmsMode == '1') {
          alert('Assigned Successfully!!');
        }
        else if (getWhatsupActive == true && getWhatsupMode == '1') {
          alert('Assigned Successfully!!');
        }
        else {
          alert('Un-Assigned Successfully!!');
        }
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
function showWhatsapp() {
  $('#txtshowWatsapp').show();
  $('#txthideWatsapp').off();
  $('#txthideWatsapp').click(function () {
    $('#txtshowWatsapp').hide();
  });
  $('#txtAddWhatsapp').val('');

}
function showEmail() {
  $('#txtshow').show();
  $('#txthide').off();
  $('#txthide').click(function () {
    $('#txtshow').hide();
  });
  $('#txtEmailsave').val('');

}

function showSMS() {
  $('#txtshowSMS').show();
  $('#txthideSMS').off();
  $('#txthideSMS').click(function () {
    $('#txtshowSMS').hide();
  });
  $("#txtAddSMS").val('');
}

function showRoles() {
  $('#txtshowRoles').show();
  $('#txthideRoles').off();
  $('#txthideRoles').click(function () {
    $('#txtshowRoles').hide();
  });
  $('#txtAddRoles').val('');

}
function showRolesEmail() {
  $('#txtshowRolesEmail').show();
  $('#txthideRolesEmail').off();
  $('#txthideRolesEmail').click(function () {
    $('#txtshowRolesEmail').hide();
  });
  $('#txtAddRolesEmail').val('');

}

function showRolesSMS() {
  $('#txtshowRoleSMS').show();
  $('#txthideRoleSMS').off();
  $('#txthideRoleSMS').click(function () {
    $('#txtshowRoleSMS').hide();
  });
  $('#txtAddRoleSMS').val('');

}

///////////////////////////////////////////////////////////
function AddWhatsup() {
  if (WhatsupValidation() == true) {
    debugger;
    var apiPath = wmsApiPath + 'EmailSmSNotification/SaveEmailSMS';

    var getWhatsupSave = $("#txtAddWhatsup").val();

    var postData =
    {

      "EmailTemplateID": IDEmail,
      "WarehouseID": WarehouseId,
      "CompanyID": CompanyId,
      "UserID": UserId,
      "CustomerID": CustomerId,
      "Application": "Whatsup",
      "AddEmail": getWhatsupSave
    }

    callHttpUrl(apiPath, postData, function (data) {
      var isSuccess = data.Status;
      var getEmailSMSresult = data.Result;
      if (isSuccess == 200) {
        var returvnmsg = getEmailSMSresult.Message;
        if (returvnmsg == "success") {

          alert('Save Successfully!!');
          var getWhatsupSave = $("#txtAddWhatsup").val();

          $('#pnlWhatsupAddGroup').append('<div class="pnlEmailBlock"> ' + getWhatsupSave + ' <i class="fas fa-times-circle" onclick="removeWhatsup(\'' + IDEmail + '\',\'' + getWhatsupSave + '\',this);"></i></div>');
          $("#txtAddWhatsup").val('');
          $('#txtshowWatsapp').hide();

          //$('#pnlWhatsupRolesAddGroup').append('<div class="pnlEmailBlock"> ' + getWhatsupSave + ' <i class="fas fa-times-circle" onclick="removeWhatsup(\'' + IDEmail + '\',\'' + getWhatsupSave + '\',this);"></i></div>');

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
  else {

  }
}

function removeWhatsup(templateID, txtEmail, obj) {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/RemoveEmailSMS';
  var getWhatsupSave = $("#txtAddWhatsup").val();

  postData =
  {
    "EmailTemplateID": templateID,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Whatsup",
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

function AddEmail() {
  if (validateEmailID() == true) {
    debugger;
    var apiPath = wmsApiPath + 'EmailSmSNotification/SaveEmailSMS';

    var getEmailSave = $("#txtEmailsave").val();
    var postData =
    {

      "EmailTemplateID": IDEmail,
      "WarehouseID": WarehouseId,
      "CompanyID": CompanyId,
      "UserID": UserId,
      "CustomerID": CustomerId,
      "Application": "Web",
      "AddEmail": getEmailSave
    }

    callHttpUrl(apiPath, postData, function (data) {
      var isSuccess = data.Status;
      var getEmailSMSresult = data.Result;
      if (isSuccess == 200) {
        var returvnmsg = getEmailSMSresult.Message;
        if (returvnmsg == "success") {

          alert('Save Successfully!!');
          var getEmailSave = $("#txtEmailsave").val();

          $('#pnlEmailAddGroup').append('<div class="pnlEmailBlock"> ' + getEmailSave + ' <i class="fas fa-times-circle" onclick="removeEmail(\'' + IDEmail + '\',\'' + getEmailSave + '\',this);"></i></div>');
          $("#txtEmailsave").val('');
          $('#txtshow').hide();

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
}

function removeEmail(templateID, txtEmail, obj) {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/RemoveEmailSMS';
  var getEmailSave = $("#txtEmailsave").val();

  postData =
  {
    "EmailTemplateID": templateID,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Web",
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

function AddSMS() {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/SaveEmailSMS';
  //var apiPath = 'http://localhost:50068/api/staging/v1/EmailSmSNotification/SaveEmailSMS';

  var getSMSSave = $("#txtAddSMS").val();

  var postData =
  {

    "EmailTemplateID": IDEmail,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Mobile",
    "AddEmail": getSMSSave
  }

  callHttpUrl(apiPath, postData, function (data) {
    var isSuccess = data.Status;
    var getEmailSMSresult = data.Result;
    if (isSuccess == 200) {
      var returvnmsg = getEmailSMSresult.Message;
      if (returvnmsg == "success") {

        alert('Save Successfully!!');
        var getSMSSave = $("#txtAddSMS").val();
        $('#pnlSMSAddGroup').append('<div class="pnlEmailBlock">' + getSMSSave + '<i class="fas fa-times-circle" onclick="removeSMS(\'' + IDEmail + '\',\'' + getSMSSave + '\', this);"></i>');
        $("#txtAddSMS").val('');
        $('#txtshowSMS').hide();
        //$('#pnlSMSAddGroup').val(getSMSSave);

      }
      else {
        alert(returnmsg);
      }

    }
    else {
      //alert('Error Occured!!');
    }
  });


}

function removeSMS(templateID, txtEmail, obj) {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/RemoveEmailSMS';
  //var apiPath = 'http://localhost:50068/api/staging/v1/EmailSmSNotification/RemoveEmailSMS';
  var getEmailSave = $("#txtEmailsave").val();

  postData =
  {
    "EmailTemplateID": templateID,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Mobile",
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

function AddRolesWhatsup() {
  debugger;
  // var apiPath = wmsApiPath + 'EmailSmSNotification/GetroleSaveEmailSMS';

  // var getRoleSave = $("#txtAddRolesWhatsup").val();

  // var postData =
  // {

  //   "EmailTemplateID": IDEmail,
  //   "WarehouseID": WarehouseId,
  //   "CompanyID": CompanyId,
  //   "UserID": UserId,
  //   "CustomerID": CustomerId,
  //   "Application": "Mobile",
  //   "AddEmail": getRoleSave
  // }

  // callHttpUrl(apiPath, postData, function (data) {
  //   var isSuccess = data.Status;
  //   var getEmailSMSresult = data.Result;
  //   if (isSuccess == 200) {

  //     var returvnmsg = getEmailSMSresult.Message;
  //     if (returvnmsg == "success") {

  //       alert('Save Successfully!!');
  //       var getRoleSave = $("#txtAddRolesWhatsup").val();
  //       $('#pnlRolesAddGroup').append('<div class="pnlEmailBlock">' + getRoleSave + '<i class="fas fa-times-circle" onclick="removeRoles(\'' + IDEmail + '\',\'' + getRoleSave + '\', this);"></i>');
  //       $("#txtAddRolesWhatsup").val('');
  //       $('#txtshowRoles').hide();


  //     }
  //     else {
  //       alert(returnmsg);
  //     }

  //   }
  //   else {
  //     alert('Error Occured!!');
  //   }
  // });

  var apiPath = wmsApiPath + 'EmailSmSNotification/GetroleSaveEmailSMS';

  var getRoleSave = $("#txtAddRolesWhatsup").val();

  var postData =
  {

    "EmailTemplateID": IDEmail,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Whatsup",
    "AddRole": getRoleSave
  }

  callHttpUrl(apiPath, postData, function (data) {
    var isSuccess = data.Status;
    var getEmailSMSresult = data.Result;
    if (isSuccess == 200) {
      var returvnmsg = getEmailSMSresult.Message;
      if (returvnmsg == "success") {

        alert('Save Successfully!!');
        var getRoleSave = $("#txtAddRolesWhatsup").val();
        //////////////////////////////////////////////////////////////////////////////// this for Role remove 
        $('#pnlRolesAddGroup').append('<div class="pnlEmailBlock"> ' + getRoleSave + ' <i class="fas fa-times-circle" onclick="removeRolesWhatsapp(\'' + IDEmail + '\',\'' + getRoleSave + '\',this);"></i></div>');
        $("#txtAddRolesWhatsup").val('');
        $('#txtshowRoles').hide();

        //$('#pnlWhatsupRolesAddGroup').append('<div class="pnlEmailBlock"> ' + getWhatsupSave + ' <i class="fas fa-times-circle" onclick="removeWhatsup(\'' + IDEmail + '\',\'' + getWhatsupSave + '\',this);"></i></div>');

      }
      else {
        alert(returnmsg);
      }

    }
    else {
      //alert('Error Occured!!');
    }
  });
}


function removeRoles(templateID, txtEmail, obj) {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/RemoveRoleEmailSMS';
  var getRolesSave = $("#txtAddRolesWhatsup").val();

  postData =
  {
    "EmailTemplateID": templateID,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Web",
    "AddRole": txtEmail
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



function AddRolesEmail() {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/GetroleSaveEmailSMS';
  //var apiPath = 'http://localhost:50068/api/staging/v1/EmailSmSNotification/SaveEmailSMS';

  var getRoleEmailSave = $("#txtAddRolesEmail").val();

  var postData =
  {

    "EmailTemplateID": IDEmail,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Web",
    "AddRole": getRoleEmailSave
  }

  callHttpUrl(apiPath, postData, function (data) {
    var isSuccess = data.Status;
    var getEmailSMSresult = data.Result;
    if (isSuccess == 200) {
      var returvnmsg = getEmailSMSresult.Message;
      if (returvnmsg == "success") {

        alert('Save Successfully!!');
        var getRoleEmailSave = $("#txtAddRolesEmail").val();                                               //Remove Role for Email Function
        $('#pnlEmailRolesAddGroup').append('<div class="pnlEmailBlock">' + getRoleEmailSave + '<i class="fas fa-times-circle" onclick="removeRolesEmail(\'' + IDEmail + '\',\'' + getRoleEmailSave + '\', this);"></i>');
        $("#txtAddRolesEmail").val('');
        $('#txtshowRolesEmail').hide();
        //$('#pnlSMSAddGroup').val(getSMSSave); 

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

//Remove Role for Email Function
function removeRolesEmail(templateID, txtEmail, obj) {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/RemoveRoleEmailSMS';
  var getRolesEmailSave = $("#txtAddRolesEmail").val();

  postData =
  {
    "EmailTemplateID": templateID,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Web",
    "AddRole": txtEmail
    //Remove Role for Email Function
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

function AddRolesSMS() {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/GetroleSaveEmailSMS';
  //var apiPath = 'http://localhost:50068/api/staging/v1/EmailSmSNotification/SaveEmailSMS';

  var getRoleSMSSave = $("#txtAddRoleSMS").val();
  var postData =
  {

    "EmailTemplateID": IDEmail,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Mobile",
    "AddRole": getRoleSMSSave
  }

  callHttpUrl(apiPath, postData, function (data) {
    var isSuccess = data.Status;
    var getEmailSMSresult = data.Result;
    if (isSuccess == 200) {
      var returvnmsg = getEmailSMSresult.Message;
      if (returvnmsg == "success") {

        alert('Save Successfully!!');
        var getRoleSMSSave = $("#txtAddRoleSMS").val();
        $('#pnlSMSRolesAddGroup').append('<div class="pnlEmailBlock">' + getRoleSMSSave + '<i class="fas fa-times-circle" onclick="removeRolesSMS(\'' + IDEmail + '\',\'' + getRoleSMSSave + '\', this);"></i>');
        $("#txtAddRoleSMS").val('');
        $('#txtshowRoleSMS').hide();
        //$('#pnlSMSAddGroup').val(getSMSSave);

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

function removeRolesSMS(templateID, txtEmail, obj) {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/RemoveRoleEmailSMS';
  var getRolesSMSSave = $("#txtAddRoleSMS").val();

  postData =
  {
    "EmailTemplateID": templateID,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Mobile",
    "AddRole": txtEmail
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

//Remove Role for WhatsAPP function 
function removeRolesWhatsapp(templateID, txtEmail, obj) {
  debugger;
  var apiPath = wmsApiPath + 'EmailSmSNotification/RemoveRoleEmailSMS';
  // var getRolesSMSSave = $("#txtAddRoleSMS").val();

  postData =
  {
    "EmailTemplateID": templateID,
    "WarehouseID": WarehouseId,
    "CompanyID": CompanyId,
    "UserID": UserId,
    "CustomerID": CustomerId,
    "Application": "Whatsup",
    "AddRole": txtEmail
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

function validateEmailID() {
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

function SMSValidation() {
  var GetSMS = $("#txtAddSMS").val();

  if (GetSMS == '') {
    alert("SMS Can't be blank");
  }
}

function isNumber(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

function WhatsupValidation() {
  var GetSMS = $("#txtAddWhatsup").val();

  if (GetSMS == '') {
    alert("Whatsup Can't be blank");
    return false;
  }
  return true;
}

function RolesValidation() {
  var GetSMS = $(".txtAddRoles").val();

  if (GetSMS == '') {
    alert("Please add Roles");
    return false;
  }
  return true;
}

function EmailRolesValidation() {
  var GetSMS = $("#txtAddRolesEmail").val();

  if (GetSMS == '') {
    alert("Please add Roles");
    return false;
  }
  return true;
}

function SMSRoleValidation() {
  var GetSMS = $("#txtAddRoleSMS").val();

  if (GetSMS == '') {
    alert("Please add Roles");
    return false;
  }
  return true;
}
