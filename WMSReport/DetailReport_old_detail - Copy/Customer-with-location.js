$(document).ready(function () {
    debugger;
    var reportUserId = mBrillWmsSession.getUserId();
    var reportDetailId = mBrillWmsSession.getReportDetailId();
    var apiPath = wmsApiPath + 'Report/CustomerInventoryLoc';
    var postData = 
     {
        "ID": "1",
        "UserId":reportUserId
      };
    loadDetailReport(apiPath, postData, function(data){
        bindWmsData();
    });
});