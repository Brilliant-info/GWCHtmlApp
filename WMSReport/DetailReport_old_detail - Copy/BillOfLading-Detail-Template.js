var reportUserId = mBrillWmsSession.getUserId();
var getCustomerId = mBrillWmsSession.getCustomerId();
var getWarehouseId = mBrillWmsSession.getWarehouseId();
var getCompanyId = mBrillWmsSession.getCompanyId();
//var getheadingname = mBrillWmsSession.Setname();

$(document).ready(function () {
    debugger;
    // if(getheadingname == 'BOL'){
    //     $('#txtheadernameName').html("Bill Of Landing");
    // }else{
    //     $('#txtheadernameName').html("Master Bill Of Landing");
    // }

    //  var reportUserId = mBrillWmsSession.getUserId();


    var reportDetailId = mBrillWmsSession.getReportDetailId();
    var apiPath = wmsApiPath + 'BillofLanding/GetData';
    //var apiPath = 'http://localhost:50068/api/staging/v1/BillofLanding/GetData';
    var postData =
    {
        "BillORDER_ID": reportDetailId
    };
    loadDetailReport(apiPath, postData, function (data) {
        var getTransporterNamebind = data.Result.Table[0].TransporterName;
        bindWmsData();
        openTransporterPoup(getTransporterNamebind);
        //alignMergedLabel();
        readFrightCharges();
        readMBOL();
        readCODDetails();
        readTrailerLoadedFreightCounted();
        //GetAllBasicDetails();
        //readsign();
    });
});


function openTransporterPoup(getTransporterNamebind) {
    debugger;
    var getTransId = parseInt(getTransporterNamebind);
    var apiPath = wmsApiPath + 'Packing/getTransportList';
    //var apiPath = 'http://localhost:50068/api/staging/v1/Packing/getTransportList';
    var postData =
    {
        "UserID": reportUserId,
        "CustomerId": getCustomerId,
        "WarehouseId": getWarehouseId,
        "VenodrId": 0,
        "CompanyId": getCompanyId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            var myGridList = data.Result;

            var getTransportList = myGridList.Table;
            $("#ddlTransportList").html('<option value = "0"> -- Select Option -- </option>');
            if (getTransportList.length > 0) {
                for (var i = 0; i < getTransportList.length; i++) {
                    var TransportListId = getTransportList[i].ID;
                    var TransportListname = getTransportList[i].Name;
                    $("#ddlTransportList").append('<option value = "' + TransportListId + '">' + TransportListname + '</option>');
                }
                $("#ddlTransportList").val(getTransId);
            }

        }
    });

}

// function SaveBilloflanding()
// {	
//   debugger;
// 	//var apiPath = wmsApiPath + 'Vendor/AddEditVendor';
//   var apiPath="http://localhost:50068/api/staging/v1/Vendor/AddEditVendor";

// 		var getShipFromName = $("#txtvendorname").val();	
// 		var getShipFromAddress = $("#txtvendorcode").val();		 
// 		var getShipFromCityStateZip = $("#txtvendortype").val();	
//     var getShipFromSid = $("#txtVendorEmail").val();
//     var getFOB = $("#txtVendorContact").val();
// 		var getShipToName = $("#txtledgerno").val();
//     var getShipToAddress = $("#txtvendorname").val();	
// 		var getShipToCityStateZip = $("#txtvendorcode").val();		 
// 		var getShipToSid = $("#txtvendortype").val();	
//     var getShipToFob = $("#txtVendorEmail").val();
//     var getThirdPartyName = $("#txtVendorContact").val();
// 		var getThirdPartyAddress = $("#txtledgerno").val();

//     var getThirdPartyCityStateZip = $("#txtvendorname").val();	
// 		var getThirdPartySpecialInstuction = $("#txtvendorcode").val();		 
// 		var getBillOfLadingNo = $("#txtvendortype").val();	
//     var getCarrier = $("#txtVendorEmail").val();
//     var getTrailerNumber = $("#txtVendorContact").val();
// 		var getSealNumbers = $("#txtledgerno").val();
//     var getSCAC = $("#txtvendorname").val();	
// 		var getProNumber = $("#txtvendorcode").val();		 
// 		var getFreightChargeTerms = $("#txtvendortype").val();	
//     var getPrepaid = $("#txtVendorEmail").val();
//     var getCollect = $("#txtVendorContact").val();
// 		var getThrdParty = $("#txtledgerno").val();

//     var getMasterBillofLading = $("#txtledgerno").val();
//     var getCODCollect = $("#txtvendorname").val();	
// 		var getCODPrepaid = $("#txtvendorcode").val();		 
// 		var getCODCustAccept = $("#txtvendortype").val();	
//     var getTrailerByShipper = $("#txtVendorEmail").val();
//     var getTrailerByDriver = $("#txtVendorContact").val();
// 		var getFreightByShipper = $("#txtledgerno").val();

//     var getFreightByDriver = $("#txtledgerno").val();
//     var getCODCollect = $("#txtvendorname").val();	
// 		var getCODPrepaid = $("#txtvendorcode").val();		 
// 		var getCODCustAccept = $("#txtvendortype").val();	
//     var getTrailerByShipper = $("#txtVendorEmail").val();
//     var getTrailerByDriver = $("#txtVendorContact").val();
// 		var getFreightByShipper = $("#txtledgerno").val();

//     var postData = 
//     {

//         "CustomerOrderNo": 1,
//         "ShipFromName": "sample string 2",
//         "ShipFromAddress": "sample string 3",
//         "ShipFromCityStateZip": "sample string 4",
//         "ShipFromSid": "sample string 5",
//         "FOB": "sample string 6",
//         "ShipToName": "sample string 7",
//         "ShipToAddress": "sample string 8",
//         "ShipToCityStateZip": "sample string 9",
//         "ShipToSid": "sample string 10",
//         "ShipToFob": "sample string 11",
//         "ThirdPartyName": "sample string 12",
//         "ThirdPartyAddress": "sample string 13",
//         "ThirdPartyCityStateZip": "sample string 14",
//         "ThirdPartySpecialInstuction": "sample string 15",
//         "BillOfLadingNo": "sample string 16",
//         "Carrier": "sample string 17",
//         "TrailerNumber": "sample string 18",
//         "SealNumbers": "sample string 19",
//         "SCAC": "sample string 20",
//         "ProNumber": "sample string 21",
//         "FreightChargeTerms": "sample string 22",
//         "Prepaid": "sample string 23",
//         "Collect": "sample string 24",
//         "ThrdParty": "sample string 25",
//         "MasterBillofLading": "sample string 26",
//         "CODCollect": "sample string 27",
//         "CODPrepaid": "sample string 28",
//         "CODCustAccept": "sample string 29",
//         "TrailerByShipper": "sample string 30",
//         "TrailerByDriver": "sample string 31",
//         "FreightByShipper": "sample string 32",
//         "FreightByDriver": "sample string 33",
//         "FreightByPieces": "sample string 34",
//         "UserId": reportUserId,
//         "WarehouseId": getWarehouseId,
//         "CustomerId": getCustomerId,
//         "CompanyID": getCompanyId

//      };

//     callHttpUrl(apiPath, postData, function(data)
//       {
//         var isSuccess = data.Status;
//         //var getvendorresult = data.Result;
//         if (isSuccess == 200)
//         {
//             alert("Update Record Successfully..");
//         }
//         else 
//         {
//             alert('Error Occured!!');
//         }
//     });

// }

function hideSignature(obj) {
    $(obj).css('visibility', 'hidden');
}
function showSignature(obj) {
    $(obj).css('visibility', 'visible');
}

// function readsign() {
//   var BillOfLanding = $('#hdnBOLID').val();
//   $('#imgCarrier').attr('src', 'getBOLCarrierimage.ashx?bill=' + BillOfLanding +'&IsMasterFlag=No')
//   $('#imgShipper').attr('src', 'getBOLShipperimage.ashx?bill=' + BillOfLanding +'&IsMasterFlag=No');
// }

$(window).resize(function () {
    alignMergedLabel();
});

function custCheckClick(obj) {
    debugger;
    var getMyHtml = obj.innerHTML;
    if (getMyHtml == "") {
        obj.innerHTML = "&#10004";
        //txtCODCollect
        //$('#txtCODCollect').html('&#10004');
    }
    else {
        obj.innerHTML = "";
        //$('#txtCODCollect').html("");
    }
}

// function GetAllBasicDetails() {
//    getCompanyID = jsonObject.hdnCompanyId;
//    getUserId = jsonObject.hdnUserId;
//    getWarehouseId = jsonObject.hdnWarehouseId;
//    getCustomerId = jsonObject.hdnCustomerId;
//   $('#hdnCompanyId').val(getCompanyID);
//   $('#hdnUserId').val(getUserId);
//   $('#hdnWarehouseId').val(getWarehouseId);
//   $('#hdnCustomerId').val(getCustomerId);
// }

function alignMergedLabel() {
    // HANDLING UNIT LABEL
    var lblHandlingUnitWidth = $('#handlingUnitCellA').width() + $('#handlingUnitCellB').width();
    $('#handlingUnitCol').css('width', lblHandlingUnitWidth + 'px');

    // PACKAGE LABEL
    var lblPackageWidth = $('#packageCellA').width() + $('#packageCellB').width();
    $('#packageCol').css('width', lblPackageWidth + 'px');

    // LTL LABEL
    var lblLtlOnlyWidth = $('#ltlOnlyCellA').width() + $('#ltlOnlyCellB').width();
    $('#ltlOnlyCol').css('width', lblLtlOnlyWidth + 'px');
}

/*
function readFrightCharges() {
  var frightCharges = 'prepaid';

  $('#txtPrepaid').html('_______');
  $('#txtCollect').html('_______');
  $('#txt3rdParty').html('_______');

  if (frightCharges == 'prepaid') {
      $('#txtPrepaid').html('___X___');
  } else if (frightCharges == 'collect') {
      $('#txtCollect').html('___X___');
  } else if (frightCharges == '3rdParty') {
      $('#txt3rdParty').html('___X___');
  }
}*/

function readFrightCharges() {
    var getPrepaid = jsonObject.PrePaid;
    var getCollect = jsonObject.Collect;
    var getThirdParty = jsonObject.ThirdParty;

    $('#txtPrepaid').html('_______');
    $('#txtCollect').html('_______');
    $('#txt3rdParty').html('_______');

    //if (getPrepaid.toUpperCase == 'y'.toUpperCase) {
    //    $('#txtPrepaid').html('___X___');
    //}
    //if (getCollect.toUpperCase == 'y'.toUpperCase) {
    //    $('#txtCollect').html('___X___');
    //}
    //if (getThirdParty.toUpperCase == 'y'.toUpperCase) {
    //    $('#txt3rdParty').html('___X___');
    //}

    if (getPrepaid == 'y' || getPrepaid == 'Y') {
        $('#txtPrepaid').html('___X___');
    }
    if (getCollect == 'y' || getCollect == 'Y') {
        $('#txtCollect').html('___X___');
    }
    if (getThirdParty == 'y' || getThirdParty == 'Y') {
        $('#txt3rdParty').html('___X___');
    }

    $('#txtPrepaid').off();
    $('#txtCollect').off();
    $('#txt3rdParty').off();

    $('#txtPrepaid').click(function () {
        setFrightCheckMark(this);
    });
    $('#txtCollect').click(function () {
        setFrightCheckMark(this);
    });
    $('#txt3rdParty').click(function () {
        setFrightCheckMark(this);
    });
}

function setFrightCheckMark(obj) {
    var getMyCheck = $(obj).html();
    if (getMyCheck == '___X___') {
        $(obj).html('_______');
    } else {
        $(obj).html('___X___');
    }
}

function readMBOL() {

    var getMBOL = jsonObject.MasterBillLanding;
    if (getMBOL == 'Y') {
        // $('#txtMasterBillofLading').html('<span class="tick">&#10004;</span>');
        $('#txtMasterBillofLading').html("✔");
    } else {
        $('#txtMasterBillofLading').html("");
    }
}

function readCODDetails() {
    debugger
    //var getCODAmount = jsonObject.CODAmount;
    var getCODFeeTermsCollect = jsonObject.CODFeeTermsCollect;
    var getCODFeeTermsPrepaid = jsonObject.CODFeeTermsPrepaid;
    var getCODFeeTermsCustChAccept = jsonObject.CODFeeTermsCustChAccept;

    if (getCODFeeTermsCollect == 'Y') {
        // $('#txtCODCollect').html('<span class="tick">&#10004;</span>');
        $('#txtCODCollect').html("✔");
    } else {
        $('#txtCODCollect').html("");
    }
    if (getCODFeeTermsPrepaid == 'Y') {
        //$('#txtCODPrepaid').html('<span class="tick">&#10004;</span>');
        $('#txtCODPrepaid').html("✔");
    } else {
        $('#txtCODPrepaid').html("");
    }
    if (getCODFeeTermsCustChAccept == 'Y') {
        //$('#txtCODCustAccept').html('<span class="tick">&#10004;</span>');
        $('#txtCODCustAccept').html("✔");
    } else {
        $('#txtCODCustAccept').html("");
    }
}

function readTrailerLoadedFreightCounted() {
    debugger
    var getTrailerByShipper = jsonObject.TrailerByShipper;
    var getTrailerByDriver = jsonObject.TrailerByDriver;
    var getFreightByShipper = jsonObject.FreightByShipper;
    var getFreightByDriver = jsonObject.FreightByDriver;
    var getFreightByPieces = jsonObject.FreightByPieces;

    if (getTrailerByShipper == 'Y') {
        //$('#txtTrailerByShipper').html('<span class="tick">&#10004;</span>');
        $('#txtTrailerByShipper').html("✔");
    } else {
        $('#txtTrailerByShipper').html("");
    }
    if (getTrailerByDriver == 'Y') {
        //$('#txtTrailerByDriver').html('<span class="tick">&#10004;</span>');
        $('#txtTrailerByDriver').html("✔");
    } else {
        $('#txtTrailerByDriver').html("");
    }
    if (getFreightByShipper == 'Y') {
        // $('#txtFreightByShipper').html('<span class="tick">&#10004;</span>');
        $('#txtFreightByShipper').html("✔");
    } else {
        $('#txtFreightByShipper').html("");
    }
    if (getFreightByDriver == 'Y') {
        //$('#txtFreightByDriver').html('<span class="tick">&#10004;</span>');
        $('#txtFreightByDriver').html("✔");
    } else {
        $('#txtFreightByDriver').html("");
    }

    if (getFreightByPieces == 'Y') {
        // $('#txtFreightByPieces').html('<span class="tick">&#10004;</span>');
        $('#txtFreightByPieces').html("✔");
    } else {
        $('#txtFreightByPieces').html("");
    }
}

function BOLUpdate() {
    debugger;
    var reportUserId = mBrillWmsSession.getUserId();
    var getCustomerId = mBrillWmsSession.getCustomerId();
    var getWarehouseId = mBrillWmsSession.getWarehouseId();
    var getCompanyId = mBrillWmsSession.getCompanyId();
    var reportDetailId = mBrillWmsSession.getReportDetailId();

    //var apiPath = 'http://localhost:50068/api/staging/v1/BillofLanding/UpdateData';
    //    var apiPath = wmsApiPath + 'BillofLanding/GetData';
    var apiPath = wmsApiPath + 'BillofLanding/UpdateData';

    var ShipFromName = "";
    var ShipFromAddress = "";
    var ShipFromCityStateZip = "";
    var ShipFromSid = "";
    var FOB = "";
    var ShipToName = "";
    var ShipToAddress = "";
    var ShipToCityStateZip = "";
    var ShipToSid = "";
    var ShipToFob = "";
    var ThirdPartyName = "";
    var ThirdPartyAddress = "";
    var ThirdPartyCityStateZip = "";
    var ThirdPartySpecialInstuction = "";
    var FreightChargeTerms = "";
    var BillOfLadingNo = "";
    var Carrier = "";
    var TrailerNumber = "";
    var SealNumbers = "";
    var SCAC = "";
    var ProNumber = "";
    var Prepaid = $('#txtPrepaid').html();
    var Collect = $('#txtCollect').html();
    var ThrdParty = $('#txt3rdParty').html();
    var MasterBillofLading = $('#txtMasterBillofLading').html();
    var CODCollect = $('#txtCODCollect').html();
    var CODPrepaid = $('#txtCODPrepaid').html();
    var CODCustAccept = $('#txtCODCustAccept').html();
    var TrailerByShipper = $('#txtTrailerByShipper').html();
    var TrailerByDriver = $('#txtTrailerByDriver').html();
    var FreightByShipper = $('#txtFreightByShipper').html();
    var FreightByDriver = $('#txtFreightByDriver').html();
    var FreightByPieces = $('#txtFreightByPieces').html();
    var getTransporterName = $('#ddlTransportList option:selected').text();
    var getTransporterID = $('#ddlTransportList').val();


    var FPrepaid = Prepaid;
    if (FPrepaid.indexOf("X") > -1) {
        FPrepaid = 'Y';
    } else {
        FPrepaid = 'N';
    }

    var FCollect = Collect;
    if (FCollect.indexOf("X") > -1) {
        FCollect = 'Y';
    } else {
        FCollect = 'N';
    }

    var FThrdParty = ThrdParty;
    if (FThrdParty.indexOf("X") > -1) {
        FThrdParty = 'Y';
    } else {
        FThrdParty = 'N';
    }

    var FMasterBillofLading = MasterBillofLading;
    if (FMasterBillofLading.indexOf("✔") > -1) {
        FMasterBillofLading = 'Y';
    } else {
        FMasterBillofLading = 'N';
    }

    var TBShipper = TrailerByShipper
    if (TBShipper.indexOf("✔") > -1) {
        TBShipper = 'Y';
    }
    else {
        TBShipper = 'N';
    }

    var TBDriver = TrailerByDriver
    if (TBDriver.indexOf("✔") > -1) {
        TBDriver = 'Y';
    }
    else {
        TBDriver = 'N';
    }

    var FBShipper = FreightByShipper
    if (FBShipper.indexOf("✔") > -1) {
        FBShipper = 'Y';
    }
    else {
        FBShipper = 'N';
    }

    var FBDriver = FreightByDriver
    if (FBDriver.indexOf("✔") > -1) {
        FBDriver = 'Y';
    }
    else {
        FBDriver = 'N';
    }

    var FBPieces = FreightByPieces
    if (FBPieces.indexOf("✔") > -1) {
        FBPieces = 'Y';
    }
    else {
        FBPieces = 'N';
    }

    var ChCODCollect = CODCollect
    if (ChCODCollect.indexOf("✔") > -1) {
        ChCODCollect = 'Y';
    }
    else {
        ChCODCollect = 'N';
    }

    var ChCODPrepaid = CODPrepaid
    if (ChCODPrepaid.indexOf("✔") > -1) {
        ChCODPrepaid = 'Y';
    }
    else {
        ChCODPrepaid = 'N';
    }

    var ChCODCustAccept = CODCustAccept
    if (ChCODCustAccept.indexOf("✔") > -1) {
        ChCODCustAccept = 'Y';
    }
    else {
        ChCODCustAccept = 'N';
    }


    var postData =
    {
        //Id: $('#hdnId').val(),
        ShipFromName: $('#txtShipFromName').text(),
        ShipFromAddress: $('#txtShipFromAddress').text(),
        ShipFromCityStateZip: $('#txtShipFromCityStateZip').text(),
        ShipFromSid: $('#txtShipFromSid').text(),
        FOB: $('#ShipFromFob').text(),
        ShipToName: $('#txtShipToName').text(),

        ShipToAddress: $('#txtShipToAddress').text(),
        ShipToCityStateZip: $('#txtShipToCityStateZip').text(),
        ShipToSid: $('#txtShipToSid').text(),
        ShipToFob: $('#txtShipToFob').text(),
        ThirdPartyName: $('#txtThirdPartyName').text(),
        ThirdPartyAddress: $('#txtThirdPartyAddress').text(),
        ThirdPartyCityStateZip: $('#txtThirdPartyCityStateZip').text(),
        ThirdPartySpecialInstuction: $('#txtThirdPartySpecialInstuction').text(),
        BillOfLadingNo: $('#txtBillOfLadingNo').text(),
        //Carrier: $('#ddlTransportList').val(),
        TrailerNumber: $('#txtTrailerNumber').text(),
        SealNumbers: $('#txtSealNumbers').text(),
        SCAC: $('#txtSCAC').text(),
        ProNumber: $('#txtProNumber').text(),
        FreightChargeTerms: $('#txtFreightChargeTerms').text(),
        // Prepaid : $('#txtPrepaid').html(),
        // Collect : $('#txtCollect').html(),
        // ThrdParty : $('#txt3rdParty').html(),
        Prepaid: FPrepaid,
        Collect: FCollect,
        ThrdParty: FThrdParty,

        //MasterBillofLading : $('#txtMasterBillofLading').html(),
        MasterBillofLading: FMasterBillofLading,
        /* CODCollect : $('#txtCODCollect').html(),
         CODPrepaid : $('#txtCODPrepaid').html(),
         CODCustAccept : $('#txtCODCustAccept').html(),*/
        CODCollect: ChCODCollect,
        CODPrepaid: ChCODPrepaid,
        CODCustAccept: ChCODCustAccept,
        // TrailerByShipper : $('#txtTrailerByShipper').html(),
        // TrailerByDriver : $('#txtTrailerByDriver').html(),
        // FreightByShipper : $('#txtFreightByShipper').html(),
        // FreightByDriver : $('#txtFreightByDriver').html(),
        // FreightByPieces: $('#txtFreightByPieces').html(),
        // CODAmount: $('#txtFreightChargeTerms').html(),
        TrailerByShipper: TBShipper,
        TrailerByDriver: TBDriver,
        FreightByShipper: FBShipper,
        FreightByDriver: FBDriver,
        FreightByPieces: FBPieces,
        CustomerOrderNo: reportDetailId,
        /* getCompanyID : $('#hdnCompanyId').val(),
         getUserId : $('#hdnUserId').val(),
         getWarehouseId : $('#hdnWarehouseId').val(),
         getCustomerId : $('#hdnCustomerId').val()*/

        CompanyID: getCompanyId,
        UserId: reportUserId,
        WarehouseId: getWarehouseId,
        CustomerId: getCustomerId,
        TransporterName: getTransporterName,
        TransportId: getTransporterID,
        PackingId: reportDetailId

    };


    // var object = {};
    // object.ShipFromName = ShipFromName
    // $.ajax({
    //     url: BOLurl,
    //     //contentType: "application/json; charset=utf-8",
    //     //dataType: "json",
    //    // data: JSON.stringify(object),
    //     data: objectBol,
    //     type: "POST",
    //     success: function (result) {
    //         alert(result);
    //         location.href = "BillOfLading-Detail-Template.aspx?bill=" + $('#txtCustomerOrderNo').text();
    //     },
    //     error: function (result) {
    //         alert(result);
    //     }
    // });
    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatusCode == 'Success') {
            alert("Updated Record Successfully..");

        }
        else {
            alert("Error Occured");
        }
    });
}

