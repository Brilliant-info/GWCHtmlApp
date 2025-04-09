var wmsApiPath = "http://173.212.244.46/BWMSWebAPITest/api/staging/v1/";
//alert(window.opener.globalPlanCode)
//alert(window.opener.globalPlanTitle)
var planCode = window.opener.globalPlanCode;
var planTitle = window.opener.globalPlanTitle;
var planID = window.opener.globalPlanID
var globalTotal = "";
var getCustomerId = mBrillWmsSession.getCustomerId();
var getCompanyId = mBrillWmsSession.getCompanyId();
var getUserId = mBrillWmsSession.getUserId();
var cleardummydata = "";

// alert(planCode);
// alert(planTitle);




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
            $('#ConfirmOrderCompanyDetails').html('');

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
            // alert(getplancode);
            // alert(getplanTitle);
            // GRID ROW
            // gridTable = gridTable + "<div class='form-row'>";
            // gridTable = gridTable + "<div class='form-group col-md-6'>";
            // gridTable = gridTable + " <input type='text' class='form-control'  placeholder='First Name'/>";
            // gridTable = gridTable + "</div>";
            // gridTable = gridTable + "<div class='form-group col-md-6'>";
            // gridTable = gridTable + " <input type='text' class='form-control'  placeholder='Last Name'/>";
            // gridTable = gridTable + "</div>";
            // gridTable = gridTable + "</div>";
            gridTable = gridTable + "<div class='form-group'>";
            gridTable = gridTable + " <input type='text' class='form-control'  value=" + getCompanyName + ">";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "<div class='form-row'>";
            gridTable = gridTable + "<div class='form-group col-md-6'>";
            gridTable = gridTable + " <input type='text' class='form-control' value=" + getCompanyMailID + ">";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "<div class='form-group col-md-6'>";
            gridTable = gridTable + " <input type='text' class='form-control'  value=" + getPhoneNo + ">";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "<div class='form-group'>";
            gridTable = gridTable + " <input type='text' class='form-control'  value=" + getAddress + ">";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "<div class='form-row'>";
            gridTable = gridTable + "<div class='form-group col-md-6'>";
            gridTable = gridTable + " <input type='text' class='form-control' value=" + getCity + ">";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "<div class='form-group col-md-6'>";
            gridTable = gridTable + " <input type='text' class='form-control'  value=" + getState + ">";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "<div class='form-group col-md-6'>";
            gridTable = gridTable + " <input type='text' class='form-control'  value=" + getCountry + ">";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "<div class='form-group col-md-6'>";
            gridTable = gridTable + " <input type='text' class='form-control'  value=" + getZipCode + ">";
            gridTable = gridTable + "</div>";
            gridTable = gridTable + "</div>";

            $('#ConfirmOrderCompanyDetails').html(gridTable);

            window.open = '/BWMSWebApp2.2/Addtocart.html';
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
            $('#ConfirmOrderInvoiceDetails').html('');

            //Bind Header
            var gridTable = '';
            //gridTable = gridTable + '<h5>Product Details:</h5>';
            gridTable = gridTable + '<thead>';
            gridTable = gridTable + '<tr style="color: var(--wms-color-primary); text-align: center">';
            gridTable = gridTable + '<th>Product</th>';
            gridTable = gridTable + '<th>Package</th>';
            gridTable = gridTable + '<th>Description</th>';
            gridTable = gridTable + '<th>Amount</th>';
            gridTable = gridTable + '</tr>'
            gridTable = gridTable + '</thead>';
            //Bind Header

            var getGridData = data.Result.Table1[0];
            var getPlanCode = getGridData.planCode;
            var getPlanTitle = getGridData.PlanTitle;
            var getNoOfWarehouse = getGridData.NoOfWarehouse;
            var getNoOfUser = getGridData.NoOfUser;
            var getNoOfCustomer = getGridData.NoOfCustomer;
            var getTotal = getGridData.Amount.toFixed(2);
            //var getPlanAmount = getGridData.PlanAmount;
            //var getZipCode = getGridData.ZipCode;
            // var gettotal = getTotal.toFixed(2),
            // GRID ROW
            gridTable = gridTable + '<tbody>';
            gridTable = gridTable + '<tr>';
            gridTable = gridTable + '<td>' + getPlanCode + '</td>';
            gridTable = gridTable + '<td>' + getPlanTitle + '</td>';
            gridTable = gridTable + "<td >";
            gridTable = gridTable + '<p><span>' + 'No of Warehouse: ' + + getNoOfWarehouse + ', </span><span>' + 'No of User: ' + + getNoOfUser + ', </span><span>' + 'No of Customer: ' + + getNoOfCustomer + '</span></p>';
            gridTable = gridTable + "</td>"
            gridTable = gridTable + "<td style='text-align: right'>" + getTotal + '</td>';
            gridTable = gridTable + '</tr>';
            gridTable = gridTable + '<tbody>';

            $('#ConfirmOrderInvoiceDetails').html(gridTable);

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
            $('#OrderSummary').html('');

            //Bind Header
            var gridTable = '';

            var getGridData = data.Result.Table1[0];
            var getPlanCode = getGridData.planCode;
            var getPlanTitle = getGridData.PlanTitle;
            var getNoOfWarehouse = getGridData.NoOfWarehouse;
            var getNoOfUser = getGridData.NoOfUser;
            var getNoOfCustomer = getGridData.NoOfCustomer;
            var getTotal = getGridData.Amount.toFixed(2);
            //var getPlanAmount = getGridData.PlanAmount;
            //var getZipCode = getGridData.ZipCode;
            var gettotal = getTotal.toFixed(2),
                // GRID ROW
                gridTable = gridTable + '<table class="table text-center">';
            gridTable = gridTable + '<tbody>';
            gridTable = gridTable + '<tr>';
            gridTable = gridTable + '<th style = "color: var(--wms-color-primary)">Sub Total</th>';
            gridTable = gridTable + '<td>' + gettotal + '</td>';
            gridTable = gridTable + '</tr>';
            gridTable = gridTable + '<tr>';
            gridTable = gridTable + '<th style = "color: var(--wms-color-primary)">Total</th>';
            gridTable = gridTable + '<td>' + gettotal + '</td>';
            gridTable = gridTable + '</tr>';
            gridTable = gridTable + '<tbody>';
            gridTable = gridTable + '</table>';

            $('#OrderSummary').html(gridTable);

            // GRID ROW

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}
paypal.Buttons({

    createOrder: function (data, actions) {
        debugger;
        // CheckSubScription();
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: globalTotal
                }
            }]
        });
    },
    onApprove: function (data, actions) {

        return actions.order.capture().then(function (details) {
            /* alert('Transaction completed by ' + details.payer.name.given_name);
             console.log(JSON.stringify(details));
             location.href = 'http://localhost/HTMLContainerApp_2.1/WMSApp.html#'; */
            var planId = planID;
            var planAmount = details.purchase_units[0].amount.value;
            var transactionNo = details.purchase_units[0].payments.captures[0].id;
            var paymentMethd = data.paymentSource;
            //alert(data.orderID);
            saveTransactionDetails(planId, planAmount, transactionNo, paymentMethd);
        });


    }
    // onApprove(data) {
    //     //alert('You have successfully created subscription ' + data.subscriptionID);
    //     alert('You have successfully subscribed for Brilliant WMS Plan!! \n Your Order reference no is ' + data.orderID);
    // },
    // onCancel(data) {
    //     alert('You have cancelled order payment!!');
    // }
}).render('#paypal-button-container');

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
            alert('Order saved!! Your order reference no is: ' + transactionNo);
            location.href = 'WMSApp.html';
        }
    });
}

// function CheckSubScription() {
//     var apiPath = "http://localhost:50068/api/staging/v1/Subscription/CheckSubScription";
//     var apiPath = wmsApiPath + "Subscription/CheckSubScription";
//     var postData =
//     {
//         "CompanyID": mBrillWmsSession.getCompanyId(),
//         "CustomerID": mBrillWmsSession.getCustomerId(),
//         "UserID": mBrillWmsSession.getUserId(),
//     };

//     callHttpUrl(apiPath, postData, function (result) {
//         var isSuccess = result.Status;
//         var getResult = result.Result.Message;

//         if (getResult == "Success") {


//             cleardummydata = "Notsubscribed"

//             if (confirm('Your Dummy Data will be deleted.') === true){
//                 RemoveDummyData();
//             }
//             else{
//                 alert('Please remove DummyData to continue.');
//             }

//         }
//         else if (getResult == "Fail") {
//             cleardummydata = "subscribed"
//         }

//     });
// }

// function RemoveDummyData() {l
//     var apiPath = "http://localhost:50068/api/staging/v1/Subscription/RemoveDummyData";
//     var apiPath = wmsApiPath + "Subscription/RemoveDummyData";
//     var postData =
//     {
//         "CompanyID": mBrillWmsSession.getCompanyId(),
//         "CustomerID": mBrillWmsSession.getCustomerId(),
//         "UserID": mBrillWmsSession.getUserId(),
//     };

//     callHttpUrl(apiPath, postData, function (result) {
//         var isSuccess = result.Status;
//         var getResult = result.Result.Message;

//         if (getResult == "Success") {
//             alert('Your Data is removed')
//         }
//         else  {
//             alert('Something went wrong. Try Again.')
//         }

//     });
// }

// paypal.Buttons({
//     createOrder: function (data, actions) {
//         return actions.order.create({
//             purchase_units: [{
//                 "amount":
//                 {
//                     currency_code: 'USD',
//                     value: '100.00'
//                 },
//                 reference_id: 'd9f80740-38f0-11e8-b467-0ed5f89f718b'
//             }
//             ],
//             intent: 'CAPTURE',
//             // payment_source:
//             // {
//             //     paypal: {
//             //         experience_context: {
//             //             payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
//             //             payment_method_selected: 'PAYPAL',
//             //             brand_name: 'EXAMPLE INC',
//             //             locale: 'en-US',
//             //             landing_page: 'LOGIN',
//             //             shipping_preference: 'SET_PROVIDED_ADDRESS',
//             //             user_action: 'PAY_NOW',
//             //             return_url: 'https://example.com/returnUrl',
//             //             cancel_url: 'https://example.com/cancelUrl'

//             //         }
//             //     }
//             // }
//             // redirect_urls: {
//             //     return_url: 'https://example.com/return',
//             //     cancel_url: 'https://example.com/cancel'
//             // }
//         });
//     },
//     // createOrder: function (data, actions) {
//     //     //alert(globalTotal);

//     //     return actions.order.create(
//     //         {
//     //             purchase_units: [
//     //                 {
//     //                     reference_id: 'store_mobile_world_order_1234',
//     //                     amount: {
//     //                         currency: 'USD',
//     //                         total: '1.44',
//     //                         details: {
//     //                             subtotal: '1.09',
//     //                             shipping: '0.02',
//     //                             tax: '0.33'
//     //                         }
//     //                     },
//     //                     description: 'Mobile World Store order-1234',
//     //                     payee: {
//     //                         email: 'seller@example.com'
//     //                     },
//     //                     items: [
//     //                         {
//     //                             name: 'NeoPhone',
//     //                             sku: 'sku03',
//     //                             price: '0.54',
//     //                             currency: 'USD',
//     //                             quantity: '1'
//     //                         },
//     //                         {
//     //                             name: 'Fitness Watch',
//     //                             sku: 'sku04',
//     //                             price: '0.55',
//     //                             currency: 'USD',
//     //                             quantity: '1'
//     //                         }
//     //                     ],
//     //                     shipping_address: {
//     //                         line1: '2211 N First Street',
//     //                         line2: 'Building 17',
//     //                         city: 'San Jose',
//     //                         country_code: 'US',
//     //                         postal_code: '95131',
//     //                         state: 'CA',
//     //                         phone: '(123) 456-7890'
//     //                     },
//     //                     shipping_method: 'United Postal Service',
//     //                     partner_fee_details: {
//     //                         receiver: {
//     //                             email: 'partner@example.com'
//     //                         },
//     //                         amount: {
//     //                             value: '0.01',
//     //                             currency: 'USD'
//     //                         }
//     //                     },
//     //                     payment_linked_group: 1,
//     //                     custom: 'custom_value_2388',
//     //                     invoice_number: 'invoice_number_2388',
//     //                     payment_descriptor: 'Payment Mobile World'
//     //                 }
//     //             ],
//     //             redirect_urls: {
//     //                 return_url: 'https://example.com/return',
//     //                 cancel_url: 'https://example.com/cancel'
//     //             }
//     //         }
//     //     );
//     // },

//     onApprove(data) {
//         //alert('You have successfully created subscription ' + data.subscriptionID);
//         alert('You have successfully subscribed for Brilliant WMS Plan!! \n Your Order reference no is ' + data.orderID);
//     },
//     onCancel(data) {
//         alert('You have cancelled order payment!!');
//     }
// }).render('#paypal-button-container');
