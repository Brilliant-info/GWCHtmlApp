wmsLoadLayout(function () {
    hideAdminPages();
   // loadAdminPages('pnlAdministrator');
   $('#pnlAdministrator').show();
    loadAdministratorMenu();
});

function hideAdminPages() {
    $('.wmsMasterTypePage').hide();
}

function loadAdministratorMenu() {
    var getUserId = mBrillWmsSession.getUserId();
    var getUserRole = mBrillWmsSession.getUserType();
    var apiPath = wmsApiPath + "Menupage/GetMenu";
    var postData = {
        "UserID": getUserId,
        "UserType": getUserRole,
        "ParentId": "7"
    };
	
	/* Static Admin Menu */
	
	apiPath = "StaticAPI/AdminMenu.json";
	postData = null;
	/* Static Admin Menu */
	
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode.toLocaleLowerCase() == 'success') {
            var getUserLoginData = data.Result.Table;
            for (var i = 0; i < getUserLoginData.length; i++) {
                var menuLabel = getUserLoginData[i].MenuLable;
                var menuPage = getUserLoginData[i].MenuURL;
                var menuIcon = getUserLoginData[i].MenuIcon;
                var menuGroup = getUserLoginData[i].GroupName;
                $('#grpAdmin' + menuGroup).append('<a onclick="loadAdminPages(\'' + menuPage + '\');"><i class="' + menuIcon + '"></i> ' + menuLabel + '</a>');
            }
            $('#grpAdminAppMasters').append('<a onclick="loadAdminPages(\'pnlApprovalMaster\');"><i class="fas fa-clipboard-check"></i> Approval Master</a>');
        } else {
            var getMessage = data.Result.Message;
            alert(getMessage);
        }
    });
}


function loadAdminPages(masterPage) {
    loadAdminMasters(masterPage, function(){
        hideAdminPages();
        $('#' + masterPage).show();
        if (masterPage == 'pnlUserMaster') {
            initUserMaster();
        } else if (masterPage == 'pnlCustomerMaster') {
            initCustomerMaster();
        } else if (masterPage == 'pnlDepartmentInfo') {
            initDepartmentInfo();
        } else if (masterPage == 'pnlProductMaster') {
            initProductMaster();
        } else if (masterPage == 'pnlEmailConfiguration') {
            initEmailConfiguration();
        }
    });
}