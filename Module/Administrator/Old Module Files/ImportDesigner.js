// wmsLoadLayout(function(){
// 	init();

// });
var UserId = mBrillWmsSession.getUserId();
var getCustomerId = mBrillWmsSession.getCustomerId();   //use
var companyid = mBrillWmsSession.getCompanyId();

var myImoprtdesignStr = "";
//var getimportDesignerData="";
var myData = "";
var gobalimportID = "";
var ObjecttypeId = [];
var Objecttype = [];
var getobjectvalue = "";
var getViewname = "";
var globImport = "";
function initImportDesigner() {
    ImportDesignerList();
}

function ImportDesignerList() {

    debugger;
    var apiPath = wmsApiPath + 'ImportDesigner/ImportDesignerList';

    //var apiPath = "http://localhost:50068/api/staging/v1/ImportDesigner/ImportDesignerList";

    var postData =
    {
        "CustomerID": getCustomerId,
        "CompanyID": companyid,
        "UserID": UserId
    }
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        if (getStatus == 200) {
            var gridList = data.Result;
            $("#BindGrid").html();
            var gridTable = "";

            // HTML Grid Table Header Bind
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Import File</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Description</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Object</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Company</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Customer</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell" style="text-align: center;">Creation Date</div>';
            // gridTable = gridTable + ' <div class="wms-srv-grid-cell" style="text-align: center;">Action</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < gridList.Table.length; i++) {
                var getImportID = gridList.Table[i].ImportID
                var getImportFile = gridList.Table[i].importTilte;
                var getDescription = gridList.Table[i].Description;
                var getObject = gridList.Table[i].Object;
                var getCompany = gridList.Table[i].CompanyName;
                var getCustomer = gridList.Table[i].CustomerName;
                var getCreationDate = gridList.Table[i].CreationDate;
                var getAction = gridList.Table[i].Action;
                //  GRID ROW

                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align" id="RowParameter' + getImportID + '">';
                gridTable = gridTable + "<div class='wms-srv-grid-cell'  style='text-align: center;'>" + getImportFile + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'  style='text-align: center;'>" + getDescription + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'  style='text-align: center;'>" + getObject + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'  style='text-align: center;'>" + getCompany + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'  style='text-align: center;'>" + getCustomer + "</div>";
                gridTable = gridTable + "<div class='wms-srv-grid-cell'  style='text-align: center;'>" + getCreationDate + "</div>";
                // gridTable = gridTable + '<div class="wms-srv-grid-cell">';
                // gridTable = gridTable + '<i class="fas fa-edit"  title="Edit" onclick="openAddNewImport(' + getImportID + ')";></i>';
                gridTable = gridTable + '</div>';
                gridTable = gridTable + '</div>';
            }

            $("#BindGrid").html(gridTable);


        }
        else {
            alert('unable to conect server');
        }
    });
}

function ImportObjectList() {
    debugger;
    var apiPath = wmsApiPath + 'ImportDesignerObjectList/CompanyActive';
    // var apiPath = "http://localhost:50068/api/staging/v1/ImportDesignerObjectList/CompanyActive";

    var postData = {
        // "ViewName": getViewname,
        "UserID": UserId
    };
    callHttpUrl(apiPath, postData, function (data) {
        var isStatus = data.Status;
        if (isStatus == 200) {
            var ObjecttypeId = [];
            var Objecttype = [];

            $("#Objecttype").html('<option >--Select--</option>');
            Objecttype.push('--Select List--');
            ObjecttypeId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var objectId = grnContainerSize[i].ID;
                    var objectvalue = grnContainerSize[i].ObjectName;
                    getobjectvalue = objectvalue;
                    Objecttype.push(objectvalue);
                    ObjecttypeId.push(objectId);
                    $("#Objecttype").append('<option value = "' + objectId + '">' + objectvalue + '</option>');
                }
            }
        }
    });
}

function ImportViewList() {
    debugger;

    var apiPath = wmsApiPath + "ImportDesigner/ImportDesignerViewList";
    // var apiPath = "http://localhost:50068/api/staging/v1/ImportDesigner/ImportDesignerViewList";
    var postData =
    {
        "CustomerID": getCustomerId,
        "CompanyID": companyid,
        "UserID": UserId,
        //"ObjectID": "2"
    }

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var viewlist = data.Result.Table;
        if (getStatus == 200) {
            getViewname = viewlist[3].Vievname;
            getViewname2 = viewlist[2].Vievname;
            getViewname3 = viewlist[1].Vievname;
            getViewname4 = viewlist[4].Vievname;
            getViewname5 = viewlist[0].Vievname;
            getViewname6 = viewlist[6].Vievname;
            getViewname7 = viewlist[7].Vievname;
            getViewname8 = viewlist[5].Vievname;

            $('#SalesOrder').html(getViewname);
            $('#PurchaseOrder').html(getViewname2);
            $('#Location').html(getViewname3);
            $('#Cyclecount').html(getViewname4);
            $('#Product').html(getViewname5);
            $('#Receiving').html(getViewname8);

            $('#Client').html(getViewname6);
            $('#Vendor').html(getViewname7);

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function ImportComloumList() {
    debugger;
    var apiPath = wmsApiPath + 'ImportDesigner/ImpDesignTblColoumDataType';
    //var apiPath = "http://localhost:50068/api/staging/v1/ImportDesigner/ImpDesignTblColoumDataType";

    var postData =
    {
        "UserID": UserId,
        "CompanyID": companyid,
        "CustomerID": getCustomerId,
        "ObjectID": "2"
    }
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        var viewlist = data.Result.Table;
        var list = ""
        var myImoprtdesignStr = "";
        $("#gridlist").html();
        if (getStatus == 200) {

            for (var i = 0; i < viewlist.length; i++) {
                var getfieldName = viewlist[i].fieldName
                var getfieldDatatype = viewlist[i].fieldDatatype;
                var getIsNULL = viewlist[i].IsNULL;
                var getflength = viewlist[i].flength;

                list = list + '<div class="winQueryColumnItem sqlCol" data-type="' + getfieldDatatype + '" data-label="' + getfieldName + '" id="">'
                list = list + '<li>'
                list = list + '<table class="dataTable" style="width:99%">'
                list = list + '<tbody>'
                list = list + '<tr>'
                list = list + '<td style="width:31%"><input type="checkbox" class="chkIsSelected chkViewColumn" value="" id="chkbox1"><span> &nbsp ' + getfieldName + '</span></td>'
                list = list + '<td style="width:20%" align="center">'
                list = list + '<select name="dataType" class="dataType" data-value="' + getfieldDatatype + '" id="drpdwn' + i + '">'
                list = list + '<option value="Number">Number</option>'
                list = list + '<option value="string">string</option>'
                list = list + '<option value="Float">Float</option>'
                list = list + '<option value="DD/MM/YYYY">DD/MM/YYYY</option>'
                list = list + '<option value="MM/DD/YYYY">MM/DD/YYYY</option>'
                list = list + '<option value="YYYY/MM/DD">YYYY/MM/DD</option>'
                list = list + '</select> </td>'
                list = list + '<td style="width:10%"><input type="checkbox" class="isNull" value="' + getIsNULL + '" id="txtnull1"></td>'
                list = list + '<td style="width:20%"><input type="Text" maxlength="4" size="4" class="length" id="txtflength" value="' + getflength + '"><td>'
                list = list + '</tr>'
                list = list + '</tbody>'
                list = list + '</table>'
                list = list + '</li>'
                list = list + '</div>'

                $('#drpdwn' + i).val(getfieldDatatype);

                if (myImoprtdesignStr == "") {
                    myImoprtdesignStr = myImoprtdesignStr + getfieldDatatype + ":" + getfieldName + ":" + getflength;
                } else {
                    myImoprtdesignStr = myImoprtdesignStr + "|" + getfieldDatatype + ":" + getfieldName + ":" + getflength;
                }
            }
            $("#gridlist").html(list);
            // alert('Calling saved data');
            getsaveImportComloumdata();
            //alert(myImoprtdesignStr);
            $('.dataType').each(function () {
                var mydefaultval = $(this).attr('data-value');
                $(this).val(mydefaultval);
            });
        }
        else {
            alert('Unable to connect Server!!');
        }

    });
}



function getImportDesignerFromRow() {
    // var myData = '';
    var sequenceNo = -1;
    $('.winQueryColumnItem').each(function () {
        var isChecked = $(this).find('.chkIsSelected').prop('checked');
        if (isChecked) {
            sequenceNo = sequenceNo + 1;
            var columnName = $(this).find('.chkIsSelected').parent().find('span').text().trim();
            var columnDataType = $(this).find('.dataType').val();
            var isNull = $(this).find('.isNull').prop('checked');
            var dataLength = $(this).find('.length').val();
            if (myData.trim() == '') {
                myData = ':' + columnName + ':' + sequenceNo + ':' + columnDataType + ':' + isNull + ':';
            } else {
                myData = myData + '|:' + columnName + ':' + sequenceNo + ':' + columnDataType + ':' + isNull + ':';
            }

        }
    });
    //alert(myData);
}


// function SaveImportDesigner() {
//     debugger;
//     var getImpID = '0';
//     var apiPath = wmsApiPath + 'ImportDesigner/ImportDesignerSave';
//     //var apiPath = "http://localhost:50068/api/staging/v1/ImportDesigner/ImportDesignerSave";

//     var getimportDesignerData = getImportDesignerFromRow();

//     if (getImpID == '0') {
//         var getColoumName = $("#chkbox1").is(":checked");
//         var getDataType = $("#drpdwn").val();
//         var getIsNull = $("#txtnull1").is(":checked");
//         var getDataPagelength = $("#txtflength").val();

//     }

//     //Edit Parameter
//     else {

//         var getColoumName = $("#chkbox1").is(":checked");
//         var getDataType = $("#drpdwn").val();
//         var getIsNull = $("#txtnull1").is(":checked");
//         var getDataPagelength = $("#txtflength").val();

//     }

//     var postData =
//     {
//         "ColumnData": myData, //getfieldName, 
//         // "ObjectName": getobjectvalue,
//         "ViewName": getViewname,
//         "CompanyID": companyid,
//         "CustomerID": getCustomerId,
//         "ImpID": "0", globImport,
//         "UserID": UserId
//     }

//     callHttpUrl(apiPath, postData, function (data) {
//         var isSuccess = data.Status;
//         var getImportresult = data.Result;
//         if (isSuccess == 200) {
//             var returnImportmsg = getImportresult.Message;
//             if (returnImportmsg == "success") {
//                 if (getImpID == "0") {
//                     alert('Import Saved Successfully!!');
//                 }
//                 else {
//                     //alert('Vendor updated Successfully!!');
//                 }
//                 // ImportDesignerList();
//                 ImportComloumList();
//                 ImportDesignerList();

//             }
//             else {
//                 alert(returnmsg);
//             }

//         }
//         else {
//             //alert('Error Occured!!');
//             alert('Import Saved Successfully!!');

//             ImportComloumList();
//             ImportDesignerList();



//         }
//         // myImoprtdesignStr =  "";
//         myData = "";


//     });

// }


function SaveImportDesigner() {
    debugger;
    var getImpID = '0';
    var apiPath = wmsApiPath + 'ImportDesigner/ImportDesignerSave';
    //var apiPath = "http://localhost:50068/api/staging/v1/ImportDesigner/ImportDesignerSave";

    var getimportDesignerData = getImportDesignerFromRow();

    if (getImpID == '0') {
        var getColoumName = $("#chkbox1").is(":checked");
        var getDataType = $("#drpdwn").val();
        var getIsNull = $("#txtnull1").is(":checked");
        var getDataPagelength = $("#txtflength").val();

    }

    //Edit Parameter
    else {

        var getColoumName = $("#chkbox1").is(":checked");
        var getDataType = $("#drpdwn").val();
        var getIsNull = $("#txtnull1").is(":checked");
        var getDataPagelength = $("#txtflength").val();

    }

    var postData =
    {
        "ColumnData": myData, //getfieldName, 
        // "ObjectName": getobjectvalue,
        "ViewName": getViewname,
        "CompanyID": companyid,
        "CustomerID": getCustomerId,
        "ImpID": "0", globImport,
        "UserID": UserId
    }

    callHttpUrl(apiPath, postData, function (data) {
        var isSuccess = data.Status;
        var getImportresult = data.Result;
        if (isSuccess == 200) {
            if (isSuccess == 200) {
                if (getImpID == "0") {
                    alert('Import Saved Successfully!!');
                }
                else {
                    //alert('Vendor updated Successfully!!');
                }
                // ImportDesignerList();
                ImportComloumList();
                ImportDesignerList();

            }
            else {
                alert(returnmsg);
            }

        }
        else {
            alert('Error Occured!!');
            //  alert('Import Saved Successfully!!');

            ImportComloumList();
            ImportDesignerList();



        }
        // myImoprtdesignStr =  "";
        myData = "";


    });

}



function openAddNewImport(getImportID) {
    debugger;
    $('#wms-srv-newimportdesigner-popup').show();
    $('#wms-srv-newimportdesigner-popup-close').off();
    $('#wms-srv-newimportdesigner-popup-close').click(function () {
        $('#wms-srv-newimportdesigner-popup').hide();
        gobalimportID = getImportID;

    });
    ImportObjectList();
    ImportViewList();
    //ImportComloumList();
    //saveImportComloumList();
}


function getsaveImportComloumdata(objName) {
    debugger;
    var apiPath = wmsApiPath + 'ImportDesigner/CustomImportDetailSavedata';
    //var apiPath = "http://localhost:50068/api/staging/v1/ImportDesigner/ImpDesignTblColoumDataType";

    var postData =
    {
        "UserID": UserId,
        // "CompanyID": companyid,
        "CustomerID": getCustomerId,
        "Object": objName
    }
    callHttpUrl(apiPath, postData, function (data) {
        debugger;
        var getStatus = data.Status;
        var viewlist = data.Result.Table;
        var list = ""
        var myImoprtdesignStr = "";
        $("#gridlist").html();
        if (getStatus == 200) {

            for (var i = 0; i < viewlist.length; i++) {
                var getfieldName = viewlist[i].fieldName
                var getfieldDatatype = viewlist[i].fieldDatatype;
                var getIsNULL = viewlist[i].IsNULL;
                var getflength = viewlist[i].flength;
                //   var currentfield = $('#winQueryColumnItem [data-type="' + getfieldDatatype + '"][data-label="' + getfieldName + '"]');
                var currentChkfield = $('.winQueryColumnItem[data-label="' + getfieldName + '"] input.chkViewColumn');
                var currentChkNullfield = $('.winQueryColumnItem[data-label="' + getfieldName + '"] input.isNull');
                var currentDataTypefield = $('.winQueryColumnItem[data-label="' + getfieldName + '"] select.dataType');
                var currentDataTypeLenfield = $('.winQueryColumnItem[data-label="' + getfieldName + '"] input.length');
                length
                if (currentChkfield.length > 0) {
                    $(currentChkfield).prop('checked', true);
                    if (getIsNULL == '1') {
                        $(currentChkNullfield).prop('checked', true);
                    } else {
                        $(currentChkNullfield).prop('checked', false);
                    }
                    $(currentDataTypefield).val(getfieldDatatype);
                    $(currentDataTypeLenfield).val(getflength);
                    // $(currentfield).find('.chkViewColumn').prop('checked',true);
                }
            }
        }
        else {
            // alert('Unable to connect Server!!');
        }

    });
}


function CommonImportList(obj) {
    debugger;
    var objectID = 0;
    ObjectName = obj;

    var objectMap = {
        'Location': '2',
        'Product': '1',
        'PurchaseOrder': '3',
        'SalesOrder': '4',
        'Cyclecount': '5',
        'Receiving': '6',
        'Client': '7',
        'Vendor': '8'
    };

    if (objectMap.hasOwnProperty(ObjectName)) {
        var apiPath = wmsApiPath + 'ImportDesigner/ImpDesignTblColoumDataType';
        objectID = objectMap[ObjectName];

        var postData = {
            "ObjectID": objectID,
            "UserID": UserId,
            "CompanyID": companyid,
            "CustomerID": getCustomerId
        };

        callHttpUrl(apiPath, postData, function (data) {
            debugger;
            var getStatus = data.Status;
            var viewlist = data.Result.Table;
            var list = "";
            $("#gridlist").html();

            if (getStatus == 200) {
                for (var i = 0; i < viewlist.length; i++) {
                    var getfieldName = viewlist[i].fieldName;
                    var getfieldDatatype = viewlist[i].fieldDatatype;
                    var getIsNULL = viewlist[i].IsNULL;
                    var getflength = viewlist[i].flength;
                    var getImport = viewlist[i].ID;

                    list += '<div class="winQueryColumnItem sqlCol" data-type="' + getfieldDatatype + '" data-label="' + getfieldName + '">';
                    list += '<li>';
                    list += '<table class="dataTable" style="width:99%">';
                    list += '<tbody>';
                    list += '<tr>';
                    //  var currentfield = $('#winQueryColumnItem [data-type="' + getfieldDatatype + '"][data-label="' + getfieldName + '"]');
                    list += '<td style="width:31%"><input type="checkbox" class="chkIsSelected chkViewColumn" value="" id="chkbox1"><span> &nbsp ' + getfieldName + '</span></td>';
                    list += '<td style="width:20%" align="center">';
                    list += '<select name="dataType" class="dataType" data-value="' + getfieldDatatype + '" id="drpdwn' + i + '">';
                    list += '<option value="Number">Number</option>';
                    list += '<option value="string">string</option>';
                    list += '<option value="Float">Float</option>';
                    list += '<option value="DD/MM/YYYY">DD/MM/YYYY</option>';
                    list += '<option value="MM/DD/YYYY">MM/DD/YYYY</option>';
                    list += '<option value="YYYY/MM/DD">YYYY/MM/DD</option>';
                    list += '</select> </td>';
                    list += '<td style="width:10%"><input type="checkbox" class="isNull" value="' + getIsNULL + '" id="txtnull1"></td>';
                    list += '<td style="width:20%"><input type="Text" maxlength="4" size="4" class="length" id="txtflength" value="' + getflength + '"><td>';
                    list += '</tr>';
                    list += '</tbody>';
                    list += '</table>';
                    list += '</li>';
                    list += '</div>';

                    $('#drpdwn' + i).val(getfieldDatatype);

                    if (myImoprtdesignStr == "") {
                        myImoprtdesignStr = myImoprtdesignStr + getfieldDatatype + ":" + getfieldName + ":" + getflength;
                    } else {
                        myImoprtdesignStr = myImoprtdesignStr + "|" + getfieldDatatype + ":" + getfieldName + ":" + getflength;
                    }
                }
                $("#gridlist").html(list);

                $('.dataType').each(function () {
                    var mydefaultval = $(this).attr('data-value');
                    $(this).val(mydefaultval);
                });

                switch (ObjectName) {
                    case 'Location':
                        getViewname = 'VM_ImportLocation';
                        break;
                    case 'Product':
                        getViewname = 'VM_ImportProduct';
                        break;
                    case 'PurchaseOrder':
                        getViewname = 'VM_ImportPurchaseOrder';
                        break;
                    case 'SalesOrder':
                        getViewname = 'VM_ImportSalesOrder';
                        break;
                    case 'Cyclecount':
                        getViewname = 'VM_ImportCycleCount';
                        break;
                    case 'Receiving':
                        getViewname = 'VM_ImportPurchaseOrderGrn';
                        break;
                    case 'Client':
                        getViewname = 'VM_ImportClient';
                        break;
                    case 'Vendor':
                        getViewname = 'VM_ImportVendor';
                        break;
                }

                // Get and Bind Saved Data...
                getsaveImportComloumdata(obj);
            } else {
                alert('Unable to connect Server!!');
            }
        });
    } else {
        alert('Invalid Object Name');
    }
}













