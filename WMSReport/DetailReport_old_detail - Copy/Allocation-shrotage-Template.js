$(document).ready(function () 
{
    var reportUserId = mBrillWmsSession.getUserId();
    var reportDetailId = mBrillWmsSession.getReportDetailId();
    var apiPath = wmsApiPath + 'Report/GetAllocationGroupdetail';
    var postData = 
    {
        "ID": reportDetailId,
        "UserId": reportUserId
    };
    loadDetailReport(apiPath, postData, function(data)
    {
        bindWmsData();
    });
});