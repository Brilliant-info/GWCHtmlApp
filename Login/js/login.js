
var UserGloblEmailID = '';
var gloablUserValidate = 'fail'
function loginForWmsApp() {
    if (validateLoginForm()) {
        //  debugger;
        var getUserName = $('#username').val();
        var getUserPass = $('#password').val();

        var apiPath = wmsApiPath + "loginpage/GetLogin";
        //var apiPath = "http://13.234.114.114:5000/api/staging/v1/loginpage/GetLogin";

        //var apiPath = "http://localhost:50068/api/staging/v1/loginpage/GetLogin";
        var postData = {
            "UserName": getUserName,
            "Password": getUserPass
        };
        callHttpUrl(apiPath, postData, function (data) {
            debugger;
            var getStatus = data.Status;
            var getStatusCode = data.StatusCode;
            if (getStatusCode.toLocaleLowerCase() == 'success') {
                var getUserLoginData = data.Result.Table[0];
                if (getUserLoginData.UserName != null) {
                    mBrillWmsSession.setApiAccessKey(getUserLoginData.UserID, getUserLoginData.Token);
                    mBrillWmsSession.setLoginUserName(getUserName);
                    mBrillWmsSession.setUserName(getUserLoginData.UserName);
                    mBrillWmsSession.setUserType(getUserLoginData.UserType);
                    mBrillWmsSession.setUserId(getUserLoginData.UserID);

                    mBrillWmsSession.setCustomerId(getUserLoginData.CustomerID);
                    mBrillWmsSession.setCustomerName(getUserLoginData.CustomerName);

                    mBrillWmsSession.setWarehouseId(getUserLoginData.WarehoueId);
                    mBrillWmsSession.setWarehouseName(getUserLoginData.WarehouseName);

                    mBrillWmsSession.setCompanyId(getUserLoginData.CompanyID);
                    mBrillWmsSession.setCompanyName(getUserLoginData.CompanyName);

                    mBrillWmsSession.setClientId(getUserLoginData.clientId);
                    mBrillWmsSession.setClientName(getUserLoginData.clientName);

                    mBrillWmsSession.setUserRoleId(getUserLoginData.RoleId);
                    mBrillWmsSession.setUserRole(getUserLoginData.RoleName);

                    mBrillWmsSession.setEmailID(getUserLoginData.EmailID);
                    //  CheckDummyData();
                    var loginToApp = setTimeout(function () {
                        //location.href = 'WMSApp.html';
                        location.href = '';
                    }, 1000);
                    //  getSkuDetailsBySalesOrder();
                    // alert('Please wait!Dummy Data is currently being processed.')
                } else {
                    var getError = getUserLoginData.Result;
                    $('#spnFailureMsg').html(getError);
                    $('#spnFailureMsg').show();
                    mBrillWmsSession.clearSession();
                }

            } else {
                var getMessage = data.Result.Message;
                // alert(getMessage);
                $('#spnFailureMsg').html(getMessage);
                $('#spnFailureMsg').show();
                mBrillWmsSession.clearSession();
            }
        });
    }
}

function validateLoginForm() {
    var isValid = true;
    var getUserName = $('#username').val().trim();
    var getUserPass = $('#password').val().trim();
    var validationmsg = '';
    if (getUserName == '') {
        validationmsg = 'Please enter user name!!';
        isValid = false;
    } else if (getUserPass == '') {
        validationmsg = 'Please enter password!!';
        isValid = false;
    }
    if (!isValid) {
        $('#spnFailureMsg').html(validationmsg);
        $('#spnFailureMsg').show();
    } else {
        $('#spnFailureMsg').hide();
    }
    return isValid;
}
//  var currentSlideText = 'Work Smart. Overhaul your warehouse Operations with Us...';
var currentSlideText = ['Work Smart.Overhaul your Warehouse Operations with Us...',
    'Multiply Your E-Commerce Business with our OMS...',
    'Customizable 3PL Solutions for Your Unique Needs...',
    'Improve Your Delivery Logistics by Brilliant’s DMS...',
    'Download Free Mobile App...'];

var slideCounter = 0;
$(document).ready(function () {
    mBrillWmsSession.setApiRequestKey();
    mBrillWmsSession.setApiAccessKey();
    $('#slideshow1').cycle({
        speed: 1000,
        timeout: 1000,
        shuffle: { left: -300, top: 30 },
        clip: 'zoom',
        //fx:       'all',
        // fx: 'scrollLeft,scrollDown,scrollRight,scrollUp',
        fx: 'turnLeft,zoom,turnRight,curtainX,scrollRight',
        randomizeEffects: false,
        before: function (c, n, o) { $(o.caption).html(o.currFx); hideSliderText(); },
        after: function () { rotateSliderText(); },
        caption: '#caption1'
    });
    var getHash = location.hash;
    if (getHash.trim() != '') {
        if (getHash == '#register') {
            OpneEmailTab();
        }
    }
});
function hideSliderText() {
    $('#themeWMSLoginBannerText').css('left', '-450px');
}
function rotateSliderText() {
    $('#themeWMSLoginBannerText').html(currentSlideText[slideCounter]);
    $('#themeWMSLoginBannerText').css({ 'left': '-450px' }).animate({
        'left': '0px'
    });
    if (slideCounter < 4) {
        slideCounter = slideCounter + 1;
    } else {
        slideCounter = 0;
    }
}
function ClearTextboxes() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function sendNewUserRegOTP() {
    debugger;
    if (validateEmailID() == true) {
        var apiPath = wmsApiPath + 'DemandPortal/getOTP'
        //var apiPath = "http://localhost:50068/api/staging/v1/DemandPortal/getOTP";
        getUserEmailId = $("#txtUserEmailId").val();
        $("#txtUserEmailIdView").val(getUserEmailId);
        $("#txtUserMailID").val(getUserEmailId);
        var postData = {
            "Email": getUserEmailId,
            "OTP": ""
        };
        callHttpUrl(apiPath, postData, function (result) {
            var isSuccess = result.Status;
            var getResult = result.Result;
            if (isSuccess == 200) {
                $("#OpenOTPTab").attr("disabled", true);
                alert('OTP send succesfully to your register mail id');
                $("#OTPTab").show();
                $("#EmailTab").hide();
                $("#LogInTab").hide();
                $("#txtUserEmailId").val('');
                // sendNewUserRegOTP();

            }
            else {
                alert('Email Id already registered with us.')
                $("#EmailTab").show();
                $("#OTPTab").hide();
            }
        });
    }
}

function VelidateOTP() {
    //var apiPath = "http://localhost:50068/api/staging/v1/DemandPortal/otpvalidate";
    var apiPath = wmsApiPath + 'DemandPortal/otpvalidate'
    var getOtpValue = $("#txtOTPVal").val();
    $("#txtUserEmailIdView").val(getUserEmailId);
    var postData = {
        "Email": getUserEmailId,
        "OTP": getOtpValue
    };
    callHttpUrl(apiPath, postData, function (Result) {
        var isSuccess = Result.Status;
        var getResult = Result.Result;
        if (isSuccess == 200) {

            alert('Verification Successful.');
            $("#wms-srv-companydetails-popup").show();
            $("#OTPTab").hide();
            $("#EmailTab").hide();
            $("#LogInTab").hide();

        }
        else {
            alert("Invalid OTP.")
        }
    });

}

function SaveCompanyDetails() {
    debugger;
    //var apiPath = 'http://localhost:50068/api/staging/v1/Subscription/DemoRegistration';
    var apiPath = wmsApiPath + "Subscription/DemoRegistration";
    $("#txtUserMailID").val(getUserEmailId);
    if (validate() == true) {
        var getComapnyEmailId = $("#txtCompanyEmailId").val();
        var getCompanyName = $("#txtCompanyName").val();
        var getWebsiteName = $("#txtWebsiteName").val();
        var getMobileNo = $("#txtMobileNo").val();
        var getAddress = $("#txtAddress").val();
        var getCityName = $("#txtCityName").val();
        var getStateName = $("#txtStateName").val();
        var getCountryName = $("#txtCountryName").val();
        var getZipcode = $("#txtZIPCode").val();
        var getFirstName = $("#txtFirstName").val();
        var getLastName = $("#txtLastName").val();
        var getUserName = $("#txtUserNameReg").val();
        var getUserMailID = $("#txtUserMailID").val();
        var postData = {
            "CompanyName": getCompanyName,
            "Website": getWebsiteName,
            "EmailID": getComapnyEmailId,
            "Address": getAddress,
            "Country": getCountryName,
            "Landmark": "Bus Stop",
            "State": getStateName,
            "City": getCityName,
            "ZipCode": getZipcode,
            "PhoneNo": getMobileNo,
            "Logopath": "sample string 11",
            "FirstName": getFirstName,
            "LastName": getLastName,
            "UserEmail": getUserMailID,
            "UserName": getUserName
        };
        callHttpUrl(apiPath, postData, function (result) {
            var isSuccess = result.Status;
            var getResult = result.Result.Message;
            if (isSuccess == 200) {
                alert('You have successfully registered with the system.');
                // $("#OTPTab").show();
                // $("#EmailTab").hide();
                // $("#LogInTab").hide();
                // $("#txtOTPVal").val('');
                // clearRegisterPopup();
                location.href = 'http://173.212.244.46/BWMSWebApp2.2/Public/login.html'
            }
            else if (isSuccess == 300) {
                alert(getResult);
                // alert("Email Id Already Registered, Please Change Email Id");
                clearRegisterPopup()
            }
            else {
                alert("Error Occured");
            }
        });
        $("#txtOTPVal").val('');
    }
}

function checkuserval() {
    debugger;
    //var apiPath = apiServerPath + 'checkUsername'; 
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/Checkusername";
    var apiPath = wmsApiPath + "Subscription/Checkusername";

    var getusername = $("#txtUserNameReg").val();
    var postData =
    {
        username: getusername

    };
    callHttpUrl(apiPath, postData, function (result) {
        var isSuccess = result.Status;
        //var result = result.Result;

        if (isSuccess == 300) {
            alert('Username already available');
            $("#txtUserNameReg").val('');
        }

    });
}

function validate() {
    //var getPassword = $("#txtPasswordReg").val();
    //var getConfirmPassword = $("#txtconfirmpassword").val();
    //var getClientID = $("#ddlClientfilter").val();
    //var PasswordLength = getPassword.length;
    var getZipcode = $("#txtZIPCode").val();

    if (document.getElementById("txtCompanyName").value == "") {
        alert("Company Name cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtWebsiteName").value == "") {
        alert("Website Name cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtCompanyEmailId").value == "") {
        alert("Company Email ID cannot be blank.");
        return false;
    }

    else if (document.getElementById("txtMobileNo").value == "") {
        alert("Phone no cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtMobileNo").value.length !== 10) {
        alert("Phone Number should include with 10 digits.");
        return false;
    }

    else if (document.getElementById("txtAddress").value == "") {
        alert("Address cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtCityName").value == "") {
        alert("City cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtStateName").value == "") {
        alert("State cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtCountryName").value == "") {
        alert("Country cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtZIPCode").value == "") {
        alert("Zip code cannot be blank.");
        return false;
    }
    else if (getZipcode.length !== 6) {

        alert("ZipCode length must be 6 characters");
        return false;
    }
    else if (document.getElementById("txtFirstName").value == "") {
        alert("First Name cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtLastName").value == "") {
        alert("Last Name cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtUserNameReg").value == "") {
        alert("User Name cannot be blank.");
        return false;
    }
    else if (document.getElementById("txtUserMailID").value == "") {
        alert("User MailId cannot be blank.");
        return false;
    }
    else {
        return true;
    }
}

function clearRegisterPopup() {
    $("#txtPasswordReg").val('');
    $("#txtconfirmpassword").val('');
    $("#txtZIPCode").val('');
    $("#txtCompanyName").val('');
    $("#txtWebsiteName").val('');
    $("#txtMobileNo").val('');
    $("#txtAddress").val('');
    $("#txtCityName").val('');
    $("#txtStateName").val('');
    $("#txtCountryName").val('');
    $("#txtUserNameReg").val('');
    $("#txtFirstName").val('');
    $("#txtLastName").val('');
    $("#txtUserMailID").val('');
    $("#txtCompanyEmailId").val('');
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

function validateEmailID() {
    var empt = document.getElementById("txtUserEmailId").value;
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

function showForgetPasswordPanel() {
    $('#pnlLoginBox').hide();
    $('#pnlForgetPasswordBox').show();
    $('#txtFrEmailId').val('');
    $('#txtFrUserId').val('');
}

function showLoginPanel() {
    $('#pnlLoginBox').show();
    $('#pnlForgetPasswordBox').hide();
    $("#pnlOTPValidateBox").hide();
    $("#pnlConfirmPasswordBox").hide();
    $('#username').val('');
    $('#password').val('');
}
function OtpValidatePopup() {
    $("#pnlForgetPasswordBox").hide();
    $("#pnlOTPValidateBox").show();
    $("#txtOTPVal").val('');
    //resendPassword();
}
function ConfrimPassPopup() {
    $("#pnlOTPValidateBox").hide();
    $("#pnlForgetPasswordBox").hide();
    $("#pnlConfirmPasswordBox").show();
}

function afterPassChangeLogin() {
    $("#pnlConfirmPasswordBox").hide();
    $("#pnlOTPValidateBox").hide();
    $("#pnlForgetPasswordBox").hide();
    $("#txtNewPassword").val('');
    $("#txtConfirmPassword").val('');
    $('#pnlLoginBox').show();
}

function resendPassword() {
    var getEmailID = $("#txtFrEmailId").val();
    UserGloblEmailID = getEmailID;
    var getUserID = $("#txtFrUserId").val();
    debugger;
    if (validateUserDetails() == true) {
        var apiPath = wmsApiPath + 'loginpage/sendOTP';
        //var apiPath = "http://localhost:50068/api/staging/v1/loginpage/sendOTP";

        var postData =
        {
            "EmailID": getEmailID,
            "UserName": getUserID,
            "OTP": ""
        }
        callHttpUrl(apiPath, postData, function (data) {
            var isSuccess = data.Status;
            if (isSuccess == 200) {
                alert('OTP Send To Your Register Mail ID');
                OtpValidatePopup();
            }
            else if (isSuccess == 300) {
                alert(data.Result.Message);
            }
            else {
                alert('Failed to retrive Password!!');
            }
        });
    }
}

function ConfirmOTP() {
    if (validateOtpVal() == true) {

        var apiPath = wmsApiPath + 'loginpage/validateOTP';
        //var apiPath = "http://localhost:50068/api/staging/v1/loginpage/validateOTP";

        var getOTP = $("#txtOTPVal").val();

        var postData =
        {
            "EmailID": UserGloblEmailID,
            "UserName": gloablUserName,
            "OTP": getOTP
        }
        callHttpUrl(apiPath, postData, function (data) {
            var isSuccess = data.Status;
            if (isSuccess == 200) {
                alert('OTP Successfully Validate');
                $("#txtOTPVal").val('');
                ConfrimPassPopup();
            }
            else {
                alert("OTP Wrong, Please Check OTP");
            }
        });
    }

}


function UpdatePassword() {
    debugger;
    if (checkNewPassword() == true) {
        var apiPath = wmsApiPath + 'loginpage/UpdatePassword';
        //var apiPath = "http://localhost:50068/api/staging/v1/loginpage/UpdatePassword";

        var getUserID = $("#txtOTPVal").val();
        var getPassword = $("#txtConfirmPassword").val();
        var postData =
        {
            "EmailID": UserGloblEmailID,
            "UserName": gloablUserName,
            "Password": getPassword
        }
        callHttpUrl(apiPath, postData, function (data) {
            var isSuccess = data.Status;
            if (isSuccess == 200) {
                alert("Password Successfully Change..!!");
                afterPassChangeLogin();
            }
        });
    }
}

function validateUserDetails() {
    var getEmailId = $("#txtFrEmailId").val();
    var getUsername = $("#txtFrUserId").val();
    if (getEmailId == '') {
        alert("Email ID should not be empty");
        return false;
    }
    else if (getUsername == '') {
        alert("User Name should not be empty");
        return false;
    }
    else {
        return true;
    }
}

function validateOtpVal() {
    var getOTPInput = $("#txtOTPVal").val();
    if (getOTPInput == '') {
        alert("OTP should not be blank");
        return false;
    }
    else {
        return true;
    }
}

function checkNewPassword() {
    var getNewPassword = $("#txtNewPassword").val();
    var getconfirmPassword = $("#txtConfirmPassword").val();

    if (getNewPassword == '') {
        alert("New Password Feild should not be blank");
        return false;
    }
    else if (getconfirmPassword == '') {
        alert("confirm Password Feild should not be blank");
        return false;
    }
    else if (getNewPassword.length <= 5) {
        alert("Password must have 6 Character..!!");
        return false;
    }
    else if (getNewPassword != getconfirmPassword) {
        alert("New Password & Confrim Password not Match");
        return false;
    }
    else {
        return true;
    }
}

function checkUserName() {
    debugger;
    if (validateUserDetails() == true) {
        var getEmail = $("#txtFrEmailId").val();
        var getUserName = $("#txtFrUserId").val();
        gloablUserName = getUserName
        var apiPath = wmsApiPath + 'loginpage/validateUserName';
        //var apiPath = "http://localhost:50068/api/staging/v1/loginpage/validateUserName";

        var postData =
        {
            "EmailID": getEmail,
            "UserName": getUserName
        }
        callHttpUrl(apiPath, postData, function (data) {
            var isSuccess = data.Status;
            if (isSuccess != 200) {
                alert("Enter Data Not Valid, Please Check Email or UserName");
            }
            else {
                resendPassword();
            }
        });
    }
}