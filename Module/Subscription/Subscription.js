debugger;
var getCustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCompanyId();
var getUserId = mBrillWmsSession.getUserId();
var getmasterSetup = "Master Setup";
var getorderManagement = "Order Management";
var getinwardProcess = "Inward Process";
var getoutwardProcess = "Outward Process";
var getthreePLBilling = "Three PL Billing";
var getqueryBuilder = "Query Builder";
var getcrossDock = "Cross Dock";
var getemailandSMSConfig = "Email and SMS Config";
var getIOTconfig = "IOT Config";
var getlabourManagement = "Labour Management";
var getecommerceSetup = "Ecommerce Setup";
var getsalesReturn = "Sales Return";
var getcustomerportal = "Customer Portal";
var getreverselogistics = "Reverse Logistics";
var getinventoryanalyticsreport="Inventory Analytics Report";
var getHHTapps = "HHT APPS";
var getApiaccess = "API Access";
var getbasicwmsfunctionality = "Basic WMS Functionality";
var getmultiplewarehouse = "Multiple Warehouse Management";
var getlimitedsupport = "Limited Support";
var getprioritysupport = "Priority Support";
var getdedicatedsupport = "Dedicated Support";
var getassetrental = "Asset Rental";
var globalplancode = "";
var globalplantitle = "";
var globalplanId = "";


wmsLoadLayout(function () {

    getCompanyDetail();
    getSubscriptionDetail();
    getInvoiceTable();
});
function init() {

}
function opensubscriptionplan() {
    $("#Product-Wrapper .product-holder").off();
    $("#Product-Wrapper .product-holder").click(function () {
        $("#Product-Wrapper .product-holder").removeClass("active-class");
        $(this).addClass("active-class");
    });

    $('#wms-srv-view-product-popup').show();
    $('#wms-srv-view-product-popup-close').off();
    $('#wms-srv-view-product-popup-close').click(function () {
        $('#wms-srv-view-product-popup').hide();
    });

    $('#SupportPackageBtn').click(function () {
        $('#wms-srv-supportpackage').show();
        $('#wms-srv-productpackage').hide();
    });
    getSubscriptionPlans('SAAS Model');
    // $('.ProductBtn').click(function () {
    //     $('#wms-srv-supportpackage').hide();
    //     $('#wms-srv-productpackage').show();
    // });

}
function OpenPackages(getPlanCode) {
    $('#wms-srv-productpackage').show();
    $('#wms-srv-supportpackage').hide();
}
function OpenInvoice() {
    $('#wms-srv-invoice-popup').show();
    $('#wms-srv-invoice-popup-close').off();
    $('#wms-srv-invoice-popup-close').click(function () {
        $('#wms-srv-invoice-popup').hide();
    });
}

function CloseAddtoCartTab() {
    $('#wms-srv-view-product-popup').hide();
    $('#wms-srv-confirm-order-popup').hide();
    getSubscriptionDetail();
    getInvoiceTable();
}

function getCompanyDetail() {

    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetSubscriptiondetail";
    var apiPath = wmsApiPath + "Subscription/GetSubscriptiondetail";
    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        UserID: getUserId,
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblCompanyDetails').html('');

            // BIND DATA GRID
            var gridTable = '';
            var getGridData = data.Result.Table[0];
            var getCompanyName = getGridData.Name;
            var getCompanyID = getGridData.EmailID;
            var getmembersince = getGridData.membersince;
            var getdate = getmembersince.slice(0, 10)

            // GRID ROW
            gridTable = gridTable + "<div><h5>" + getCompanyName + "</h5></div>";
            gridTable = gridTable + "<div><i class='fas fa-envelope' style='margin-right: 5px;'></i>" + getCompanyID + "</div>";
            gridTable = gridTable + "<div><i class='fas fa-calendar-alt' style='margin-right: 5px;'></i><span>" + 'Member since: ' + "</span>" + getdate + "</div>";
            $('#tblCompanyDetails').html(gridTable);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getSubscriptionDetail() {

    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetSubscriptiondetail";
    var apiPath = wmsApiPath + "Subscription/GetSubscriptiondetail";
    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        UserID: getUserId,
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblSubscription').html('');

            // BIND DATA GRID
            var gridTable = '';

            var getGridData = data.Result.Table1[0];
            var getPlanCode = getGridData.PlanCode;
            //var getPlanTitle = getGridData.PlanTitle;
            var getPlanDescription = getGridData.PlanDescription;
            var getPlanStartDate = getGridData.PlanStartDate;
            var getPlanEndDate = getGridData.PlanEndDate;
            var getdate = getPlanStartDate.slice(0, 10);
            var getenddate = getPlanEndDate.slice(0, 10);
            // date.innerHTML = getdate.split('9,0');



            // GRID ROW
            gridTable = gridTable + "<div style='font-size: 20px;'>Subscription Details</div><br>";
            gridTable = gridTable + "<div><span style='width: 100px;display: inline-block;'>" + 'Package Name ' + "</span>" + getPlanCode + "</div>";
            gridTable = gridTable + "<div><span style='width: 100px;display: inline-block;'>" + 'Plan Type ' + "</span>" + getPlanDescription + "</div>";
            gridTable = gridTable + "<div><span style='width: 100px;display: inline-block;'>" + 'Start Date ' + "</span>" + getdate + "</div>";
            gridTable = gridTable + "<div><span style='width: 100px;display: inline-block;'>" + 'End Date ' + "</span>" + getenddate + "</div>";
            $('#tblSubscription').html(gridTable);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getInvoiceTable() {
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetSubscriptiondetail";
    var apiPath = wmsApiPath + "Subscription/GetSubscriptiondetail";
    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        UserID: getUserId,
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#tblInvoice').html('');

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Sr. No.</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Invoice Number</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Invoice Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Plan Title</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Amount</div>'
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table2;
            for (var i = 0; i < getGridData.length; i++) {
                var getInvoiceID = getGridData[i].InvoiceID;
                var getInvoiceNo = getGridData[i].InvoiceNo;
                var getInvoiceDate = getGridData[i].InvoiceDate;
                var getPlanTitle = getGridData[i].PlanTitle;
                var getTotal = getGridData[i].Total;

                var getdate = getInvoiceDate.slice(0, 10);
                var gettotal = getTotal.toFixed(2),
                    // GRID ROW
                    gridTable = gridTable + '<div class="wms-srv-grid-row">';
                gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getInvoiceID + '</div>';
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getInvoiceNo + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getdate + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getPlanTitle + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + gettotal + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align: center;'><a href='#' onclick = getInvoiceDetail(" + getInvoiceID + ");><i class='fas fa-eye' title='Download'></i></a></div>";
                gridTable = gridTable + '</div>';
                // GRID ROW
            }

            $('#tblInvoice').html(gridTable);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getInvoiceDetail(getInvoiceID) {
    debugger;
    OpenInvoice();
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceRpt";
    var apiPath = wmsApiPath + "Subscription/GetInvoiceRpt";
    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        InvoiceID: getInvoiceID
    }

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#AddressDetails').html('');

            // BIND DATA GRID
            // var gridTable = '';

            //Bind Header
            // var gridTable = '';
            // gridTable = gridTable + '<div class="wms-srv-grid-header">';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell">Bill To</div>';
            // gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table[0];
            var getName = getGridData.Name;
            var getAddress = getGridData.Address;
            var getCity = getGridData.City;
            var getState = getGridData.State;
            var getCountry = getGridData.Country;
            var getZipCode = getGridData.ZipCode;
            // GRID ROW

            $('#invoiceName').html(getName);
            $('#invoiceAddress').html(getAddress + ', ' + getCity + ', ' + getZipCode);

            // gridTable = gridTable + '<p style="line-height:5px;margin-top: 8px;margin-bottom: 10px;">' + getName + '</p>';
            // gridTable = gridTable + '<p style="line-height:5px;margin-top: 8px;margin-bottom: 10px;">' + getAddress + ', ' + getCity + '</p>';
            // gridTable = gridTable + '<p style="line-height:5px;margin-top: 8px;margin-bottom: 10px;">' + getState + ', ' + getCountry + '</p>';
            // gridTable = gridTable + '<p style="line-height:5px;margin-top: 8px;margin-bottom: 10px;">' + getZipCode + '</p>';

            // GRID ROW

            //$('#AddressDetails').html(gridTable);
            getInvoiceDate(getInvoiceID);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getInvoiceDate(getInvoiceID) {
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceRpt";
    var apiPath = wmsApiPath + "Subscription/GetInvoiceRpt";

    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        InvoiceID: getInvoiceID
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#DateHolder').html('');

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Date</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Invoice No</div>';
            gridTable = gridTable + '</div>';
            //Bind Header

            var getGridData = data.Result.Table1[0];
            var getInvoiceID = getGridData.InvoiceID;
            var getInvoiceDate = getGridData.InvoiceDate;



            // var getCity = getGridData.City;
            // var getState = getGridData.State;
            // var getCountry = getGridData.Country;
            // var getZipCode = getGridData.ZipCode;
            // GRID ROW
            var getdate = getInvoiceDate.slice(0, 10);
            $('#invoiceDate').html(getdate);
            $('#invoiceOrderNo').html(getInvoiceID);

            gridTable = gridTable + '<div class="wms-srv-grid-row">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">' + getdate + '</div>';
            gridTable = gridTable + "<div class='wms-srv-grid-cell' style='text-align:center;'>" + getInvoiceID + "</div>";
            gridTable = gridTable + '</div>';


            // GRID ROW

            $('#DateHolder').html(gridTable);
            getProductInvoice(getInvoiceID);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getProductInvoice(getInvoiceID) {
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceRpt";
    var apiPath = wmsApiPath + "Subscription/GetInvoiceRpt";

    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        InvoiceID: getInvoiceID
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#ProductInvoices').html('');

            // BIND DATA GRID
            var gridTable = '';

            //Bind Header
            var gridTable = '';
            //gridTable = gridTable + '<h5>Product Details:</h5>';
            gridTable = gridTable + '<thead>';
            gridTable = gridTable + '<tr style="color: var(--wms-color-primary);">';
            gridTable = gridTable + '<th style="border-bottom: none;">Product</th>';
            gridTable = gridTable + '<th style="border-bottom: none;">Description</th>';
            gridTable = gridTable + '<th style="text-align: right;border-bottom: none;">Amount</th>';
            gridTable = gridTable + '</tr>'
            gridTable = gridTable + '</thead>';
            //Bind Header

            var getGridData = data.Result.Table1[0];
            var getPlanCode = getGridData.PlanCode;
            var getPlanTitle = getGridData.PlanTitle;
            var getTotalTax = getGridData.TotalTax.toFixed(2);
            var getTotal = getGridData.Total.toFixed(2);
            var getPlanAmount = getGridData.PlanAmount;
            //var getZipCode = getGridData.ZipCode;
            var gettotal = getPlanAmount.toFixed(2);
            $('#invoiceSrNo').html('1');
            $('#invoiceProduct').html(getPlanCode);
            $('#invoiceProdDescription').html(getPlanTitle);
            $('#invoiceAmount').html(getPlanAmount);
            $('#invoiceTax').html(getTotalTax);
            $('#invoiceTotalAmount').html(gettotal);
            // GRID ROW
            gridTable = gridTable + '<tbody>';
            gridTable = gridTable + '<tr>';
            gridTable = gridTable + '<td>' + getPlanCode + '</td>';
            gridTable = gridTable + "<td>";
            gridTable = gridTable + '<p>' + getPlanTitle + '</p>';
            gridTable = gridTable + '<p>Tax</p>';
            gridTable = gridTable + "</td>"
            gridTable = gridTable + "<td style='text-align: right'>";
            gridTable = gridTable + '<p>' + gettotal + '</p>';
            gridTable = gridTable + '<p>' + getTotalTax + '</p>';
            gridTable = gridTable + "</td>"
            gridTable = gridTable + '</tr>';
            gridTable = gridTable + '<tr>';
            gridTable = gridTable + '<td></td>';
            gridTable = gridTable + '<td>Total</td>';
            gridTable = gridTable + "<td style='text-align: right'>" + getTotal + '</td>';
            gridTable = gridTable + '</tr>';
            gridTable = gridTable + '<tbody>';


            // // GRID ROW

            $('#ProductInvoices').html(gridTable);

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getSubscriptionPlans(getPlanCode) {
    debugger;
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetSubscriptionPlans";
    var apiPath = wmsApiPath + "Subscription/GetSubscriptionPlans";

    var postData =

    {
        "PlanCode": getPlanCode,

    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#SubscriptionPackageTbl').html('');

            // BIND DATA GRID
            var gridTable = '';



            var getGridData = data.Result.Table;
            for (var i = 0; i < getGridData.length; i++) {
                var getPlanID = getGridData[i].PlanID;
                var getPlanTitle = getGridData[i].PlanTitle;
                var getNoOfWarehouse = getGridData[i].NoOfWarehouse;
                var getNoOfUser = getGridData[i].NoOfUser;
                var getNoOfCustomer = getGridData[i].NoOfCustomer;
                var getMasterSetup = getGridData[i].MasterSetup;
                var getOrderManagement = getGridData[i].OrderManagement;
                var getInboundProcess = getGridData[i].InboundProcess;
                var getOutboundProcess = getGridData[i].OutboundProcess;
                var getThreePLBilling = getGridData[i].ThreePLBilling;
                var getQueryBuilder = getGridData[i].QueryBuilder;
                var getCrossDock = getGridData[i].CrossDock;
                var getEmailandSMSConfig = getGridData[i].EmailandSMSConfig;
                var getIOTConfig = getGridData[i].IOTConfig;
                var getLabourManagement = getGridData[i].LabourManagement;
                var getEcommerceSetup = getGridData[i].EcommerceSetup;
                var getSalesReturn = getGridData[i].SalesReturn;
                var getCustomerPortal = getGridData[i].CustomerPortal; 
                var getReverseLogistics = getGridData[i].ReverseLogistics; 
                var getInventoryAnalyticsReport = getGridData[i].InventoryAnalyticsReport; 
                var getHHTAPPS = getGridData[i].HHTAPPS; 
                var getAPIACCESS = getGridData[i].APIACCESS; 
                var getBasicWMSFunctionality=getGridData[i].BasicWMSFunctionality; 
                var getMultipleWarehouse = getGridData[i].MultipleWarehouse; 
                var getLimitedSupport = getGridData[i].LimitedSupport; 
                var getPrioritySupport = getGridData[i].PrioritySupport; 
                var getDedicatedSupport = getGridData[i].DedicatedSupport; 
                var getAssetRental = getGridData[i].AssetRental; 
                //var getTotal = getGridData[i].Total;
                // GRID ROW


                gridTable = gridTable + "<div class='card bg-light'>";
                gridTable = gridTable + "<div class='card-header'>";
                gridTable = gridTable + "<h4 class='card-text'>" + getPlanTitle + "</h4>";
                gridTable = gridTable + '</div>';
                gridTable = gridTable + "<div class='card-body'>";
                gridTable = gridTable + "<div class='feature-list'>";
                gridTable = gridTable + '</div>';
                gridTable = gridTable + ' <ul class="package-details" style="padding: 0px;margin-left: 8px;">';
                gridTable = gridTable + "<li><i class=\"fas fa-check\"></i><span'>" + 'No of Warehouse: ' + "</span>" + getNoOfWarehouse + "</li>";
                gridTable = gridTable + "<li><i class=\"fas fa-check\"></i><span'>" + 'No of User: ' + "</span>" + getNoOfUser + "</li>";
               // gridTable = gridTable + "<li><i class=\"fas fa-check\"></i><span'>" + 'No of Customer: ' + "</span>" + getNoOfCustomer + "</li>";
                //gridTable = gridTable + '</ul>';
                //gridTable = gridTable + '<hr>';
                //gridTable = gridTable + '<ul style="padding: 0px;margin-left: 8px;">';
                if (getBasicWMSFunctionality == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getbasicwmsfunctionality + "</li>"
                }
                if (getMultipleWarehouse == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getmultiplewarehouse + "</li>"
                }
                // if (getMasterSetup == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getmasterSetup + "</li>"
                // }

                // if (getOrderManagement == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getorderManagement + "</li>"
                // }

                // if (getInboundProcess == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getinwardProcess + "</li>"
                // }
                // if (getOutboundProcess == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getoutwardProcess + "</li>"
                // }
                // if (getThreePLBilling == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getthreePLBilling + "</li>"
                // }
                if (getQueryBuilder == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getqueryBuilder + "</li>"
                }
                // if (getCrossDock == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getcrossDock + "</li>"
                // }
                // if (getEmailandSMSConfig == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getemailandSMSConfig + "</li>"
                // }
                // if (getIOTConfig == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getIOTconfig + "</li>"
                // }
                // if (getLabourManagement == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getlabourManagement + "</li>"
                // }
                // if (getEcommerceSetup == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getecommerceSetup + "</li>"
                // }
                // if (getSalesReturn == "Yes") {
                //     gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getsalesReturn + "</li>"
                // }
                if (getCustomerPortal == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getcustomerportal + "</li>"
                }
                if (getReverseLogistics == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getreverselogistics + "</li>"
                }
                if (getInventoryAnalyticsReport == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getinventoryanalyticsreport + "</li>"
                }
                if (getHHTAPPS == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getHHTapps + "</li>"
                }
                if (getAPIACCESS == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getApiaccess + "</li>"
                }
                if (getLimitedSupport == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getlimitedsupport + "</li>"
                }
                if (getPrioritySupport == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getprioritysupport + "</li>"
                }
                if (getDedicatedSupport == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getdedicatedsupport + "</li>"
                }
                if (getAssetRental == "Yes") {
                    gridTable = gridTable + "<li><i class=\"fas fa-check\"></i>" + getassetrental + "</li>"
                }
               
                gridTable = gridTable + '</ul>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + "<div class='card-footer text-center'>";
                gridTable = gridTable + '<a class="btnAddToCart card-link btn btn-primary p-2" href="#" onclick="OpenAddtoCart(\'' + getPlanCode + '\',\'' + getPlanTitle + '\',\'' + getPlanID + '\'); return false;">' + "Add To Cart" + '</a>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }



            // GRID ROW

            $('#SubscriptionPackageTbl').html(gridTable);
            $('#wms-srv-supportpackage').hide();
            $('#wms-srv-productpackage').show();

            // BIND DATA GRID

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function OpenAddtoCart(planCode, planTitle, planID) {
    debugger;
    globalPlanCode = planCode;
    globalPlanTitle = planTitle;
    globalPlanID = planID
    // alert(planCode);
    // alert(planTitle);
    // window.open("Addtocart.html");
    resetConfirmOrderForm();
    $('#wms-srv-confirm-order-popup').show();
    $('#wms-srv-confirm-order-popup-close').off();
    $('#wms-srv-confirm-order-popup-close').click(function () {
        $('#wms-srv-confirm-order-popup').hide();
    });
    getConfirmOrderCompanyDetails(planCode, planTitle);
}

/* ==========================  CONFIRM ORDER FUNCTIONS ================================ */
function getConfirmOrderCompanyDetails(planCode, planTitle) {
    debugger;
    //window.open("Addtocart.html");

    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceDetails";
    var apiPath = wmsApiPath + "Subscription/GetInvoiceDetails";
    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        UserID: getUserId,
        PlanCode: planCode,
        PlanTitle: planTitle

    }

    callHttpUrl(apiPath, postData, function (data) {

        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {

            // BIND DATA GRID
            var gridTable = '';
            var getGridData = data.Result.Table[0];
            var getCompanyName = getGridData.Name;
            var getCompanyMailID = getGridData.EmailID;
            var getPhoneNo = getGridData.PhoneNo;
            var getAddress = getGridData.Address;
            var getCity = getGridData.City;
            var getState = getGridData.State;
            var getCountry = getGridData.Country;
            var getZipCode = getGridData.ZipCode;
            var getGridData1 = data.Result.Table1[0];
            var getplancode = getGridData1.planCode;
            var getplanTitle = getGridData1.PlanTitle;

            $('#txtCompanyName').val(getCompanyName);
            $('#txtCompanyEmailId').val(getCompanyMailID);
            $('#txtPhoneNo').val(getPhoneNo);
            $('#txtAddress').val(getAddress);
            $('#txtCity').val(getCity);
            $('#txtState').val(getState);
            $('#txtCountry').val(getCountry);
            $('#txtZipCode').val(getZipCode);

            $('#frmConfirmOrderHolder').show();
            $('#pnlOrderConfirmStatus').hide();
            // window.open = '/BWMSWebApp2.2/Addtocart.html';
            getConfirmOrderInvoice(planCode, planTitle);
            getOrderSummary(planCode, planTitle);
            // window.open('/BWMSWebApp2.2/Addtocart.html');
            // BIND DATA GRID
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getConfirmOrderInvoice(planCode, planTitle) {
    debugger;

    // alert("hi")
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceDetails";
    var apiPath = wmsApiPath + "Subscription/GetInvoiceDetails";
    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        UserID: getUserId,
        PlanCode: planCode,
        PlanTitle: planTitle


    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            $('#ConfirmOrderInvoiceDetails').remove('.trProdDetailsRow');
            var gridTable = '';
            var getGridData = data.Result.Table1[0];
            var getPlanCode = getGridData.planCode;
            var getPlanTitle = getGridData.PlanTitle;
            var getNoOfWarehouse = getGridData.NoOfWarehouse;
            var getNoOfUser = getGridData.NoOfUser;
            var getNoOfCustomer = getGridData.NoOfCustomer;
            var getTotal = getGridData.Amount;
            //var getPlanAmount = getGridData.PlanAmount;
            //var getZipCode = getGridData.ZipCode;
            var gettotal = getTotal.toFixed(2);
            // GRID ROW
            gridTable = gridTable + '<tr class="trProdDetailsRow wms-srv-grid-row">';
            gridTable = gridTable + '<td class="wms-srv-grid-cell">' + getPlanCode + '</td>';
            gridTable = gridTable + '<td class="wms-srv-grid-cell">' + getPlanTitle + '</td>';
            gridTable = gridTable + '<td class="wms-srv-grid-cell">';
            gridTable = gridTable + '<span>' + 'No of Warehouse: ' + getNoOfWarehouse + ', </span><span>' + 'No of User: ' + getNoOfUser + ', </span><span>' + 'No of Customer: ' + getNoOfCustomer + '</span>';
            gridTable = gridTable + "</td>"
            gridTable = gridTable + '<td class="wms-srv-grid-cell" style="text-align:right;">' + gettotal + '</td>';
            gridTable = gridTable + '</tr>';
            $('#ConfirmOrderInvoiceDetails').append(gridTable);

            // GRID ROW
            globalTotal = getTotal;

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getOrderSummary(planCode, planTitle) {

    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceDetails";
    var apiPath = wmsApiPath + "Subscription/GetInvoiceDetails";

    var postData =
    {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        UserID: getUserId,
        PlanCode: planCode,
        PlanTitle: planTitle


    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200') {
            //$('#OrderSummary').html('');

            //Bind Header
            var gridTable = '';

            var getGridData = data.Result.Table1[0];
            var getPlanCode = getGridData.planCode;
            var getPlanTitle = getGridData.PlanTitle;
            var getNoOfWarehouse = getGridData.NoOfWarehouse;
            var getNoOfUser = getGridData.NoOfUser;
            var getNoOfCustomer = getGridData.NoOfCustomer;
            var getTotal = getGridData.Amount;
            //var getPlanAmount = getGridData.PlanAmount;
            //var getZipCode = getGridData.ZipCode;
            var gettotal = getTotal.toFixed(2);
            $('#spnSubTotal').html(gettotal);
            $('#spnTotal').html(gettotal);
            paypal.Buttons({

                createOrder: function (data, actions) {
                    debugger;
                    // CheckSubScription();
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: globalTotal
                                //value: 11.00
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {

                    return actions.order.capture().then(function (details) {
                        /* alert('Transaction completed by ' + details.payer.name.given_name);
                         console.log(JSON.stringify(details));
                         location.href = 'http://localhost/HTMLContainerApp_2.1/WMSApp.html#'; */
                        //  globalPlanCode = planCode;
                        //  globalPlanTitle = planTitle;
                        //  globalPlanID = planID
                        // var planId = planID;
                        var planId = globalPlanID;
                        var planAmount = details.purchase_units[0].amount.value;
                        var transactionNo = details.purchase_units[0].payments.captures[0].id;
                        var paymentMethd = data.paymentSource;
                        //alert(data.orderID);
                        saveTransactionDetails(planId, planAmount, transactionNo, paymentMethd);
                        //$('#wms-srv-confirm-order-popup').hide();
                        //$('#wms-srv-view-product-popup').hide();
                        //getCompanyDetail();

                    });


                },
                // onApprove(data) {
                //     //alert('You have successfully created subscription ' + data.subscriptionID);
                //     $('#frmConfirmOrderHolder').hide();
                //     $('#pnlOrderConfirmStatus').show();
                //     alert('You have successfully subscribed for Brilliant WMS Plan!! \n Your Order reference no is ' + data.orderID);
                // },
                onCancel(data) {
                    $('#pnlOrderConfirmMessage').html('<h4 style="color:#ff0000;">You have cancelled order payment!!</h4>');
                    $('#frmConfirmOrderHolder').hide();
                    $('#pnlOrderConfirmStatus').show();
                }
            }).render('#paypal-button-container');
        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function saveTransactionDetails(planId, planAmount, transactionNo, paymentMethd) {
    //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/SaveSubscribeplan";
    var apiPath = wmsApiPath + "Subscription/SaveSubscribeplan";

    var postData = {
        CompanyID: getCompanyId,
        CustomerID: getCustomerId,
        UserID: getUserId,
        PlanID: planId,
        PlanAmount: planAmount,
        Discount: "0",
        TotalTax: "0",
        TransactionNo: transactionNo,
        paymentmethod: paymentMethd
    };
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == '200' && getStatusCode == 'Success') {
            $('#pnlOrderConfirmMessage').html('<h4>Order saved!! Your order reference no is: <span style="color:#007bff;">' + transactionNo + '</span></h4>');
            // alert('Order saved!! Your order reference no is: ' + transactionNo);
            // location.href = 'WMSApp.html';
        } else {
            $('#pnlOrderConfirmMessage').html('<h4 style="color:#ff0000;">Some error occured!! Kindly contact admin with your order reference no: ' + transactionNo + ')</h4>');
        }
        $('#frmConfirmOrderHolder').hide();
        $('#pnlOrderConfirmStatus').show();
    });
}

function resetConfirmOrderForm() {
    $('#txtCompanyName').val('');
    $('#txtCompanyEmailId').val('');
    $('#txtPhoneNo').val('');
    $('#txtAddress').val('');
    $('#txtCity').val('');
    $('#txtState').val('');
    $('#txtCountry').val('');
    $('#txtZipCode').val('');
    $('#spnSubTotal').html(' - ');
    $('#spnTotal').html(' - ');
    $('.trProdDetailsRow').remove();
    $('#paypal-button-container').html('');
}
/* ==========================  CONFIRM ORDER FUNCTIONS ================================ */

// function getProfessionalSubscriptionPlans(getPlanCode) {
//     var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetSubscriptionPlans";

//     var postData =

//     {
//         "PlanCode": getPlanCode
//     }

//     callHttpUrl(apiPath, postData, function (data) {
//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         if (getStatus == '200') {
//             $('#ProfessionalPackageList').html('');

//             // BIND DATA GRID
//             var gridTable = '';

//             var getGridData = data.Result.Table[1];
//             var getNoOfWarehouse = getGridData.NoOfWarehouse;
//             var getNoOfUser = getGridData.NoOfUser;
//             var getNoOfCustomer = getGridData.NoOfCustomer;
//             var getMasterSetup = getGridData.MasterSetup;
//             var getOrderManagement = getGridData.OrderManagement;
//             var getInboundProcess = getGridData.InboundProcess;
//             var getOutboundProcess = getGridData.OutboundProcess;
//             var getThreePLBilling = getGridData.ThreePLBilling;
//             var getQueryBuilder = getGridData.QueryBuilder;
//             var getCrossDock = getGridData.CrossDock;
//             var getEmailandSMSConfig = getGridData.EmailandSMSConfig;
//             var getIOTConfig = getGridData.IOTConfig;
//             var getLabourManagement = getGridData.LabourManagement;
//             var getEcommerceSetup = getGridData.EcommerceSetup;
//             var getSalesReturn = getGridData.SalesReturn;

//             // GRID ROW
//             gridTable = gridTable + ' <div class="package-details" style="text-align: center;">';
//             gridTable = gridTable + "<div><span'>" + 'No of Warehouse: ' + "</span>" + getNoOfWarehouse + "</div>";
//             gridTable = gridTable + "<div><span'>" + 'No of User: ' + "</span>" + getNoOfUser + "</div>";
//             gridTable = gridTable + "<div><span'>" + 'No of Customer: ' + "</span>" + getNoOfCustomer + "</div>";
//             gridTable = gridTable + '</div>';
//             gridTable = gridTable + '<hr>';
//             gridTable = gridTable + '<ul>';
//             if (getMasterSetup == "Yes") {
//                 gridTable = gridTable + "<li>" + getmasterSetup + "</li>"
//             }

//             if (getOrderManagement == "Yes") {
//                 gridTable = gridTable + "<li>" + getorderManagement + "</li>"
//             }

//             if (getInboundProcess == "Yes") {
//                 gridTable = gridTable + "<li>" + getinwardProcess + "</li>"
//             }
//             if (getOutboundProcess == "Yes") {
//                 gridTable = gridTable + "<li>" + getoutwardProcess + "</li>"
//             }
//             if (getThreePLBilling == "Yes") {
//                 gridTable = gridTable + "<li>" + getthreePLBilling + "</li>"
//             }
//             if (getQueryBuilder == "Yes") {
//                 gridTable = gridTable + "<li>" + getqueryBuilder + "</li>"
//             }
//             if (getCrossDock == "Yes") {
//                 gridTable = gridTable + "<li>" + getcrossDock + "</li>"
//             }
//             if (getEmailandSMSConfig == "Yes") {
//                 gridTable = gridTable + "<li>" + getemailandSMSConfig + "</li>"
//             }
//             if (getIOTConfig == "Yes") {
//                 gridTable = gridTable + "<li>" + getIOTconfig + "</li>"
//             }
//             if (getLabourManagement == "Yes") {
//                 gridTable = gridTable + "<li>" + getlabourManagement + "</li>"
//             }
//             if (getEcommerceSetup == "Yes") {
//                 gridTable = gridTable + "<li>" + getecommerceSetup + "</li>"
//             }
//             if (getSalesReturn == "Yes") {
//                 gridTable = gridTable + "<li>" + getsalesReturn + "</li>"
//             }
//             gridTable = gridTable + '</ul>';

//             // GRID ROW

//             $('#ProfessionalPackageList').html(gridTable);

//             // BIND DATA GRID

//         }
//         else {
//             alert('Unable to connect Server!!');
//         }
//     });
// }

// function getEnterpriseSubscriptionPlans(getPlanCode) {
//     var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetSubscriptionPlans";

//     var postData =

//     {
//         "PlanCode": getPlanCode
//     }

//     callHttpUrl(apiPath, postData, function (data) {
//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         if (getStatus == '200') {
//             $('#EnterprisePackageList').html('');

//             // BIND DATA GRID
//             var gridTable = '';

//             //Bind Header
//             // var gridTable = '';
//             // gridTable = gridTable + '<div class="wms-srv-grid-header">';
//             // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Sr. No.</div>';
//             // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Invoice Number</div>';
//             // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Invoice Date</div>';
//             // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Plan Title</div>';
//             // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Amount</div>'
//             // gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align:center;">Download</div>';
//             // gridTable = gridTable + '</div>';
//             //Bind Header

//             var getGridData = data.Result.Table[2];
//             var getNoOfWarehouse = getGridData.NoOfWarehouse;
//             var getNoOfUser = getGridData.NoOfUser;
//             var getNoOfCustomer = getGridData.NoOfCustomer;
//             var getMasterSetup = getGridData.MasterSetup;
//             var getOrderManagement = getGridData.OrderManagement;
//             var getInboundProcess = getGridData.InboundProcess;
//             var getOutboundProcess = getGridData.OutboundProcess;
//             var getThreePLBilling = getGridData.ThreePLBilling;
//             var getQueryBuilder = getGridData.QueryBuilder;
//             var getCrossDock = getGridData.CrossDock;
//             var getEmailandSMSConfig = getGridData.EmailandSMSConfig;
//             var getIOTConfig = getGridData.IOTConfig;
//             var getLabourManagement = getGridData.LabourManagement;
//             var getEcommerceSetup = getGridData.EcommerceSetup;
//             var getSalesReturn = getGridData.SalesReturn;

//             // GRID ROW
//             gridTable = gridTable + ' <div class="package-details" style="text-align: center;">';
//             gridTable = gridTable + "<div><span'>" + 'No of Warehouse: ' + "</span>" + getNoOfWarehouse + "</div>";
//             gridTable = gridTable + "<div><span'>" + 'No of User: ' + "</span>" + getNoOfUser + "</div>";
//             gridTable = gridTable + "<div><span'>" + 'No of Customer: ' + "</span>" + getNoOfCustomer + "</div>";
//             gridTable = gridTable + '</div>';
//             gridTable = gridTable + '<hr>';
//             gridTable = gridTable + '<ul>';
//             if (getMasterSetup == "Yes") {
//                 gridTable = gridTable + "<li>" + getmasterSetup + "</li>"
//             }

//             if (getOrderManagement == "Yes") {
//                 gridTable = gridTable + "<li>" + getorderManagement + "</li>"
//             }

//             if (getInboundProcess == "Yes") {
//                 gridTable = gridTable + "<li>" + getinwardProcess + "</li>"
//             }
//             if (getOutboundProcess == "Yes") {
//                 gridTable = gridTable + "<li>" + getoutwardProcess + "</li>"
//             }
//             if (getThreePLBilling == "Yes") {
//                 gridTable = gridTable + "<li>" + getthreePLBilling + "</li>"
//             }
//             if (getQueryBuilder == "Yes") {
//                 gridTable = gridTable + "<li>" + getqueryBuilder + "</li>"
//             }
//             if (getCrossDock == "Yes") {
//                 gridTable = gridTable + "<li>" + getcrossDock + "</li>"
//             }
//             if (getEmailandSMSConfig == "Yes") {
//                 gridTable = gridTable + "<li>" + getemailandSMSConfig + "</li>"
//             }
//             if (getIOTConfig == "Yes") {
//                 gridTable = gridTable + "<li>" + getIOTconfig + "</li>"
//             }
//             if (getLabourManagement == "Yes") {
//                 gridTable = gridTable + "<li>" + getlabourManagement + "</li>"
//             }
//             if (getEcommerceSetup == "Yes") {
//                 gridTable = gridTable + "<li>" + getecommerceSetup + "</li>"
//             }
//             if (getSalesReturn == "Yes") {
//                 gridTable = gridTable + "<li>" + getsalesReturn + "</li>"
//             }
//             gridTable = gridTable + '</ul>';
//             // GRID ROW

//             $('#EnterprisePackageList').html(gridTable);

//             // BIND DATA GRID

//         }
//         else {
//             alert('Unable to connect Server!!');
//         }
//     });
// }

// function getConfirmOrderCompanyDetails(getplan, getTitle) {
//     debugger;
//     window.open("Addtocart.html");

//     //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceDetails";
//     var apiPath = wmsApiPath + "Subscription/GetInvoiceDetails";
//     var postData =
//     {
//         "CompanyID": "1",
//         "CustomerID": "1",
//         "UserID": "1",
//         "PlanCode": getplan,
//         "PlanTitle": getTitle

//     }

//     callHttpUrl(apiPath, postData, function (data) {

//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         if (getStatus == '200') {
//             $('#ConfirmOrderCompanyDetails').html('');

//             // BIND DATA GRID
//             var gridTable = '';

//             var getGridData = data.Result.Table[0];
//             var getCompanyName = getGridData.Name;
//             var getCompanyMailID = getGridData.EmailID;
//             var getPhoneNo = getGridData.PhoneNo;
//             var getAddress = getGridData.Address;
//             var getCity = getGridData.City;
//             var getState = getGridData.State;
//             var getCountry = getGridData.Country;
//             var getZipCode = getGridData.ZipCode;
//             var getGridData1 = data.Result.Table1[0];
//             var getplancode = getGridData1.planCode;
//             var getplanTitle = getGridData1.PlanTitle;
//             alert(getplancode);
//             alert(getplanTitle);
//             // GRID ROW
//             // gridTable = gridTable + "<div class='form-row'>";
//             // gridTable = gridTable + "<div class='form-group col-md-6'>";
//             // gridTable = gridTable + " <input type='text' class='form-control'  placeholder='First Name'/>";
//             // gridTable = gridTable + "</div>";
//             // gridTable = gridTable + "<div class='form-group col-md-6'>";
//             // gridTable = gridTable + " <input type='text' class='form-control'  placeholder='Last Name'/>";
//             // gridTable = gridTable + "</div>";
//             // gridTable = gridTable + "</div>";
//             gridTable = gridTable + "<div class='form-group'>";
//             gridTable = gridTable + " <input type='text' class='form-control'  value=" + getCompanyName + ">";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "<div class='form-row'>";
//             gridTable = gridTable + "<div class='form-group col-md-6'>";
//             gridTable = gridTable + " <input type='text' class='form-control' value=" + getCompanyMailID + ">";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "<div class='form-group col-md-6'>";
//             gridTable = gridTable + " <input type='text' class='form-control'  value=" + getPhoneNo + ">";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "<div class='form-group'>";
//             gridTable = gridTable + " <input type='text' class='form-control'  value=" + getAddress + ">";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "<div class='form-row'>";
//             gridTable = gridTable + "<div class='form-group col-md-6'>";
//             gridTable = gridTable + " <input type='text' class='form-control' value=" + getCity + ">";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "<div class='form-group col-md-6'>";
//             gridTable = gridTable + " <input type='text' class='form-control'  value=" + getState + ">";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "<div class='form-group col-md-6'>";
//             gridTable = gridTable + " <input type='text' class='form-control'  value=" + getCountry + ">";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "<div class='form-group col-md-6'>";
//             gridTable = gridTable + " <input type='text' class='form-control'  value=" + getZipCode + ">";
//             gridTable = gridTable + "</div>";
//             gridTable = gridTable + "</div>";

//             $('#ConfirmOrderCompanyDetails').html(gridTable);

//             window.open = '/BWMSWebApp2.2/Addtocart.html';
//             getConfirmOrderInvoice(getplancode, getplanTitle);
//             getOrderSummary(getplancode, getplanTitle);
//             // window.open('/BWMSWebApp2.2/Addtocart.html');
//             // BIND DATA GRID

//         }
//         else {
//             alert('Unable to connect Server!!');
//         }
//     });
// }

// function getConfirmOrderInvoice(getplancode, getplanTitle) {
//     debugger;

//     alert("hi")
//     //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceDetails";
//     var apiPath = wmsApiPath + "Subscription/GetInvoiceDetails";
//     var postData =
//     {
//         "CompanyID": "1",
//         "CustomerID": "1",
//         "UserID": "1",
//         "PlanCode": getplancode,
//         "PlanTitle": getplanTitle


//     }

//     callHttpUrl(apiPath, postData, function (data) {
//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         if (getStatus == '200') {
//             $('#ConfirmOrderInvoiceDetails').html('');

//             //Bind Header
//             var gridTable = '';
//             //gridTable = gridTable + '<h5>Product Details:</h5>';
//             gridTable = gridTable + '<thead>';
//             gridTable = gridTable + '<tr style="color: var(--wms-color-primary); text-align: center">';
//             gridTable = gridTable + '<th>Product</th>';
//             gridTable = gridTable + '<th>Package</th>';
//             gridTable = gridTable + '<th>Description</th>';
//             gridTable = gridTable + '<th>Amount</th>';
//             gridTable = gridTable + '</tr>'
//             gridTable = gridTable + '</thead>';
//             //Bind Header

//             var getGridData = data.Result.Table1[0];
//             var getPlanCode = getGridData.planCode;
//             var getPlanTitle = getGridData.PlanTitle;
//             var getNoOfWarehouse = getGridData.NoOfWarehouse;
//             var getNoOfUser = getGridData.NoOfUser;
//             var getNoOfCustomer = getGridData.NoOfCustomer;
//             var getTotal = getGridData.Amount;
//             //var getPlanAmount = getGridData.PlanAmount;
//             //var getZipCode = getGridData.ZipCode;
//             // GRID ROW
//             gridTable = gridTable + '<tbody>';
//             gridTable = gridTable + '<tr>';
//             gridTable = gridTable + '<td>' + getPlanCode + '</td>';
//             gridTable = gridTable + '<td>' + getPlanTitle + '</td>';
//             gridTable = gridTable + "<td >";
//             gridTable = gridTable + '<p><span>' + 'No of Warehouse: ' + + getNoOfWarehouse + ', </span><span>' + 'No of User: ' + + getNoOfUser + ', </span><span>' + 'No of Customer: ' + + getNoOfCustomer + '</span></p>';
//             gridTable = gridTable + "</td>"
//             gridTable = gridTable + "<td style='text-align: right'>" + getTotal + '</td>';
//             gridTable = gridTable + '</tr>';
//             gridTable = gridTable + '<tbody>';

//             $('#ConfirmOrderInvoiceDetails').html(gridTable);

//             // GRID ROW

//         }
//         else {
//             alert('Unable to connect Server!!');
//         }
//     });
// }

// function getOrderSummary(getplancode, getplanTitle) {
//     debugger;
//     //var apiPath = "http://localhost:50068/api/staging/v1/Subscription/GetInvoiceDetails";
//     var apiPath = wmsApiPath + "Subscription/GetInvoiceDetails";

//     var postData =
//     {
//         "CompanyID": "1",
//         "CustomerID": "1",
//         "UserID": "1",
//         "PlanCode": getplancode,
//         "PlanTitle": getplanTitle


//     }

//     callHttpUrl(apiPath, postData, function (data) {
//         var getStatus = data.Status;
//         var getStatusCode = data.StatusCode;
//         if (getStatus == '200') {
//             $('#OrderSummary').html('');

//             //Bind Header
//             var gridTable = '';

//             var getGridData = data.Result.Table1[0];
//             var getPlanCode = getGridData.planCode;
//             var getPlanTitle = getGridData.PlanTitle;
//             var getNoOfWarehouse = getGridData.NoOfWarehouse;
//             var getNoOfUser = getGridData.NoOfUser;
//             var getNoOfCustomer = getGridData.NoOfCustomer;
//             var getTotal = getGridData.Amount;
//             //var getPlanAmount = getGridData.PlanAmount;
//             //var getZipCode = getGridData.ZipCode;
//             // GRID ROW
//             gridTable = gridTable + '<table class="table text-center">';
//             gridTable = gridTable + '<tbody>';
//             gridTable = gridTable + '<tr>';
//             gridTable = gridTable + '<th style = "color: var(--wms-color-primary)">Sub Total</th>';
//             gridTable = gridTable + '<td>' + getTotal + '</td>';
//             gridTable = gridTable + '</tr>';
//             gridTable = gridTable + '<tr>';
//             gridTable = gridTable + '<th style = "color: var(--wms-color-primary)">Total</th>';
//             gridTable = gridTable + '<td>' + getTotal + '</td>';
//             gridTable = gridTable + '</tr>';
//             gridTable = gridTable + '<tbody>';
//             gridTable = gridTable + '</table>';

//             $('#OrderSummary').html(gridTable);

//             // GRID ROW

//         }
//         else {
//             alert('Unable to connect Server!!');
//         }
//     });
// }
