class brillWmsSession {
    constructor() {
        this.appDefaultRequestKey = "ECW63725lys86^DJD83774nlWs";
        this.appDefaultAccessKey = "235XsPn38482^Nswlsi34BMsT";
        this.clientEncryiptionNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.clientEncryiption = ["LpsX", "XiDt", "NNsq", "OuYz", "PxAw", "NvLs", "QnMe", "UeMf", "IpKj", "TgBc"];
        this.clientDecryption = {
            LpsX: "0",
            XiDt: "1",
            NNsq: "2",
            OuYz: "3",
            PxAw: "4",
            NvLs: "5",
            QnMe: "6",
            UeMf: "7",
            IpKj: "8",
            TgBc: "9"
        }
    }

    resetApiKey() {
        sessionStorage["apirequestkey"] = this.appDefaultRequestKey;
        sessionStorage["apiaccesskey"] = this.appDefaultAccessKey;
    }

    setApiRequestKey() {
        // sessionStorage["apirequestkey"] = "ECW63725lys86^DJD83774nlWs";
    }

    getApiRequestKey() {
        // var apiRequestKey = sessionStorage["apirequestkey"];
        var apiRequestKey = this.appDefaultRequestKey;
        return apiRequestKey;
    }

    setApiAccessKey(userid, token) {
        if (userid != null && token != null) {
            sessionStorage["apiaccesskey"] = userid + '^' + token;
        } else {
            sessionStorage["apiaccesskey"] = this.appDefaultAccessKey;
        }
    }

    getApiAccessKey() {
        var apiAccessKey = sessionStorage["apiaccesskey"];
        return apiAccessKey;
    }

    setUserId(uid) {
        sessionStorage["userid"] = this.encrtypClientSession(uid);
    }
    getUserId() {
        var eUid = sessionStorage["userid"];
        var dUid = this.decryptClientSession(eUid);
        return dUid;
    }
    setLoginUserName(loginusername) {
        sessionStorage["loginusername"] = loginusername;
    }
    getLoginUserName() {
        var loginusername = sessionStorage["loginusername"];
        return loginusername;
    }
    setUserName(userName) {
        sessionStorage["username"] = userName;
    }
    getUserName() {
        var userName = sessionStorage["username"];
        return userName;
    }
    setEmailID(EmailID) {
        sessionStorage["EmailID"] = EmailID;
    }
    getEmailID() {
        var EmailID = sessionStorage["EmailID"];
        return EmailID;
    }
    setUserRole(role) {
        sessionStorage["rolename"] = role;
    }
    getUserRole() {
        var role = sessionStorage["rolename"];
        return role;
    }
    setUserType(userType) {
        sessionStorage["usertype"] = userType;
    }
    getUserType() {
        var userType = sessionStorage["usertype"];
        return userType;
    }
    setUserRoleId(rid) {
        sessionStorage["roleid"] = this.encrtypClientSession(rid);
    }
    getUserRoleId() {
        var eRid = sessionStorage["roleid"];
        var dRid = this.decryptClientSession(eRid);
        return dRid;
    }
    setClientId(cid) {
        sessionStorage["clientid"] = this.encrtypClientSession(cid);
    }
    getClientId() {
        var eCid = sessionStorage["clientid"];
        var dCid = this.decryptClientSession(eCid);
        return dCid;
    }
    setClientName(clientName) {
        sessionStorage["clientname"] = clientName;
    }
    getClientName() {
        var clientName = sessionStorage["clientname"];
        return clientName;
    }
    setCompanyId(cid) {
        sessionStorage["companyid"] = this.encrtypClientSession(cid);
    }
    getCompanyId() {
        var eCid = sessionStorage["companyid"];
        var dCid = this.decryptClientSession(eCid);
        return dCid;
    }
    setCompanyName(companyName) {
        sessionStorage["companyname"] = companyName;
    }
    getCompanyName() {
        var companyName = sessionStorage["companyname"];
        return companyName;
    }
    setCustomerId(cid) {
        sessionStorage["customerid"] = this.encrtypClientSession(cid);
    }
    getCustomerId() {
        var eCid = sessionStorage["customerid"];
        var dCid = this.decryptClientSession(eCid);
        return dCid;
    }
    setCustomerName(customerName) {
        sessionStorage["customername"] = customerName;
    }
    getCustomerName() {
        var customerName = sessionStorage["customername"];
        return customerName;
    }
    setWarehouseId(wid) {
        sessionStorage["warehouseid"] = this.encrtypClientSession(wid);
    }
    getWarehouseId() {
        var eWid = sessionStorage["warehouseid"];
        var dWid = this.decryptClientSession(eWid);
        return dWid;
    }
    setWarehouseName(warehouseName) {
        sessionStorage["warehousename"] = warehouseName;
    }
    getWarehouseName() {
        var warehouseName = sessionStorage["warehousename"];
        return warehouseName;
    }
    setReportDetailId(reportdetailid) {
        sessionStorage["reportdetailid"] = reportdetailid;
    }
    getReportDetailId() {
        var reportdetailid = sessionStorage["reportdetailid"];
        return reportdetailid;
    }
    setReportDispatchId(reportdetailid) {
        sessionStorage["reportdispatchId"] = reportdetailid;
    }
    getReportDispatchId() {
        var reportdetailid = sessionStorage["reportdispatchId"];
        return reportdetailid;
    }

    setIsSubscriptionExpired(isSubscriptionExpired) {
        sessionStorage["isSubscriptionExpired"] = isSubscriptionExpired;
    }
    getIsSubscriptionExpired() {
        var isSubscriptionExpired = sessionStorage["isSubscriptionExpired"];
        return isSubscriptionExpired;
    }

    setCustomerLottable(customerLottable) {
        sessionStorage["customerLottable"] = customerLottable;
    }
    getCustomerLottable() {
        var customerLottable = sessionStorage["customerLottable"];
        return customerLottable;
    }

    clearSession() {
        sessionStorage.clear();
        this.resetApiKey();
    }
    encrtypClientSession(encId) {
        var idToString = "" + encId;
        var splitId = idToString.split('');
        var constructEncryption = '';
        for (var i = 0; i < splitId.length; i++) {
            constructEncryption = constructEncryption + this.clientEncryiption[Number(splitId[i])];
        }
        var finalConstructEncryption = 'NnSrtWs' + constructEncryption + 'MmStrUw';
        return finalConstructEncryption;
    }
    decryptClientSession(decId) {
        var removeStart = decId.replace('NnSrtWs', '');
        var removeEnd = removeStart.replace('MmStrUw', '');
        var getEncWords = removeEnd.split('');
        var constructDecryption = '';
        for (var i = 0; i < getEncWords.length; i++) {
            constructDecryption = constructDecryption + this.clientDecryption[getEncWords[Number(i)] + getEncWords[Number(i + 1)] + getEncWords[Number(i + 2)] + getEncWords[Number(i + 3)]];
            i = i + 3;
        }
        return constructDecryption;
    }
};

let mBrillWmsSession = new brillWmsSession();