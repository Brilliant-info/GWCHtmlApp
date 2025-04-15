$(document).ready(function () {
    loadPurchaseOrderDetail();
});


function loadPurchaseOrderDetail() 
{
    restoreTemplate();
    var reportUserId = mBrillWmsSession.getUserId();
    var reportDetailId = mBrillWmsSession.getReportDetailId();
    var reportLottableFilter = getLottableFilterValues();
    var apiPath = wmsApiPath + 'Report/GetPurchaseorderRecieptdetail';
    var postData =
    {
        "ID": reportDetailId,
        "UserId": reportUserId,
        "filterLottable": reportLottableFilter
    };
    /* loadDetailReport(apiPath, postData, function (data) {
        debugger;
        bindWmsData();
    }); */
}