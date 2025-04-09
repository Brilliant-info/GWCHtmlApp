// wmsLoadLayout(function(){
// 	init();
// });

//var apiFolder = 'http://173.212.244.46/WebAPITest/';
//var apiFolder = 'http://localhost:50068/';
//var wmsAppFiles = "http://localhost/wmsAppFiles/";
//var apiServerPath = apiFolder + 'api/staging/v1/';
//var wmsApiPath = apiFolder + 'api/staging/v1/';
//var wmsAppFiles = "http://173.212.244.46/wmsAppFiles/";

var wmsAppImageFiles = apiDomain + "";

var getIsPartOfOutward;
var getIsPartOfInward;
var getIsUnique;
//var apilabelServer = 'http://173.212.244.46/WebAPITest/api/staging/v1/';
var getCurrentPage = "1";
var getRecordLimit = "30";
var getCompanyId = mBrillWmsSession.getCompanyId();
var getUserId = mBrillWmsSession.getUserId();
var getCustomerId = $("#ddlcustomer").val(); // mBrillWmsSession.getCustomerId();
var WarehouseID = $('#ddlwarehouse').val();
var searchfilter = '0';
var searchvalue = '0';
var getTotalRecords = "100";//Pageing
var strCurrentPage = "1";//pageing
var getSkuCategoryId = "1";
var getId;
var getCategoryId = "0";
var prodcatName = [];
var prodcatid = [];
var getprodcategoryname = "";
var ObjectNamepara = "Product";
var globalskuid = "";
var Editlottableid = 0;
var globalLogoPath = '';
var GlobalDownloadPath = '';

function initProductMaster() {
    getProductList(strCurrentPage, searchfilter, searchvalue);

    $("#wms-srv-InvntryLoc-popup-close").click(function () {
        $("#wms-srv-InvntryLoc-popup").hide();
    })

}

function getProductList(strCurrentPage, searchfilter, searchvalue) {
    debugger;

    /* Static API Binding */
    var apiPath = "StaticAPI/GetProductList.json";
    var postData = null;
    /* Static API Binding */

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var popup = data.Result.Table;
        var getdetailData = data.Result.Table;
        if (getStatus == 200) {

            $('#omsSkuList').html('');
            var htmlbindhead = '';

            htmlbindhead = '<div class="wms-srv-grid-header">';
            htmlbindhead += '<div class="wms-srv-grid-cell" style="width: 15%;">WMS SKU Code</div>';
            htmlbindhead += '<div class="wms-srv-grid-cell">SKU Code</div>';
            htmlbindhead += '<div class="wms-srv-grid-cell">SKU Name</div>';
            htmlbindhead += '<div class="wms-srv-grid-cell">Description</div>';
            htmlbindhead += '<div class="wms-srv-grid-cell">Customer</div>';
            htmlbindhead += '<div class="wms-srv-grid-cell">Department</div>';
            // htmlbindhead += '<div class="wms-srv-grid-cell">Group Set</div>';
            // htmlbindhead += '<div class="wms-srv-grid-cell">Retail Price</div>';
            htmlbindhead += '<div class="wms-srv-grid-cell">MOQ</div>';
            // htmlbindhead += '<div class="wms-srv-grid-cell">Virtual Quantity</div>';
            // htmlbindhead += '<div class="wms-srv-grid-cell">Available Balance</div>';
            htmlbindhead += '<div class="wms-srv-grid-cell">Active</div>';
            htmlbindhead += '<div class="wms-srv-grid-cell" style="text-align:center;">Action</div>';
            htmlbindhead += '</div>';

            var htmlbindDetail = '';

            for (var i = 0; i < getdetailData.length; i++) {
                let getID = getdetailData[i].ID;
                let getWMSSKUCode = getdetailData[i].WMSSKUCode;
                let getSKUCode = getdetailData[i].SKUCode;
                let getSKUName = getdetailData[i].SKUName;
                let getDescription = getdetailData[i].Description;
                let getCustomer = getdetailData[i].Customer;
                let getDepartment = getdetailData[i].Department;
                let getGroupSet = getdetailData[i].GroupSet;
                let getRetailPrice = getdetailData[i].RetailPrice;
                let getMOQ = getdetailData[i].MOQ;
                let getVirtualQuantity = getdetailData[i].VirtualQuantity;
                let getAvailableBalance = getdetailData[i].AvailableBalance;
                let getActive = getdetailData[i].Active;


                htmlbindDetail += '<div class="wms-srv-grid-row">';
                htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getWMSSKUCode + ' </div>';
                htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getSKUCode + ' </div>';
                htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getSKUName + ' </div>';
                htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getDescription + ' </div>';
                htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getCustomer + ' </div>';
                htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getDepartment + ' </div>';
                // htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getGroupSet + ' </div>';
                // htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getRetailPrice + ' </div>';
                htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getMOQ + ' </div>';
                // htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getVirtualQuantity + ' </div>';
                // htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getAvailableBalance + ' </div>';
                htmlbindDetail += '<div class="wms-srv-grid-cell"> ' + getActive + ' </div>';
                htmlbindDetail += '<div class="wms-srv-grid-cell">';
                htmlbindDetail += ' <div class="wms-srv-grid-action">';
                htmlbindDetail += '<i class="fas fa-edit" title="Edit" onclick="openSKUEditPopup(' + getID + ')"></i>';
                htmlbindDetail += '<div class="wms-srv-action-sep" > | </div> ';
                htmlbindDetail += '<i class="fas fa-file-image" title = "Image" onclick = "openImagesPopup(' + getID + ')" ></i> ';
                htmlbindDetail += '<div class="wms-srv-action-sep" > | </div> ';
                htmlbindDetail += '<i class="fas fa-pallet" title = "Inventory" onclick = "openinventoryPopup(' + getID + ')" ></i> ';
                htmlbindDetail += '<div class="wms-srv-action-sep" > | </div> ';
                htmlbindDetail += '<i class="fas fa-pen-square" title = "Pack" onclick = "openUOMPopup(' + getID + ')" ></i> ';
                // htmlbindDetail += '<div class="wms-srv-action-sep" > | </div> ';
                // htmlbindDetail += '<i class="fas fa-tag" title = " Serial Flag" onclick = "updateSerialFlag(' + getID + ')" ></i> ';
                htmlbindDetail += '<div class="wms-srv-action-sep" > | </div> ';
                htmlbindDetail += '<i class="fas fa-tag" title = "UDF List" onclick = "openUDFList(' + getID + ')" ></i> ';
                htmlbindDetail += ' </div>';
                htmlbindDetail += '</div>';
                htmlbindDetail += '</div>';

            }

            $('#omsSkuList').html(htmlbindhead + htmlbindDetail);

        }
        else {
            alert('Unable to connect Server!!');
        }
    });
}

function getimageList(GrdSkuID) {
    debugger;
    var apiPath = wmsApiPath + 'Product/ImageList';
    globalskuid = GrdSkuID;
    var postData = {
        "UserId": getUserId,
        "SkuId": GrdSkuID
    };

    /* STATIC API CODE */
    apiPath = 'StaticAPI/ImageList.json';
    postData = null;
    /* STATIC API CODE */

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;

        if (getStatus == 200) {
            $("#wms-srv-grid-ImagePopup").html('');

            var myImgGridList = data.Result;
            var getTotalRecords = myImgGridList.Table[0].TotalRecord;
            var GetImagelistvalues = myImgGridList.Table1;
            var gridTable = '';

            gridTable += '<div class="wms-srv-grid-header">';
            gridTable += '<div class="wms-srv-grid-cell">Image</div>';
            gridTable += '<div class="wms-srv-grid-cell">Image Title</div>';
            gridTable += '<div class="wms-srv-grid-cell">Description</div>';
            gridTable += '<div class="wms-srv-grid-cell">Attachment</div>';
            gridTable += '<div class="wms-srv-grid-cell">Action</div>';
            gridTable += '</div>';
            gridTable += '<div class="wms-srv-grid-row wms-srv-grid-add">';
            gridTable += '<div class="wms-srv-grid-cell"><img src="" id="wmsAddUploadedImage" style="width:50px;height:50px;" /></div>';
            gridTable += '<div class="wms-srv-grid-cell">';
            gridTable += '<input type="text" data-prefix="SESKU" data-id="" value="" class="wms-srv-grid-cell-input" id="txtInputImageTitel">';
            gridTable += '</div>';
            gridTable += '<div class="wms-srv-grid-cell">';
            gridTable += '<input type="text" data-prefix="SESKU" data-id="" value="" class="wms-srv-grid-cell-input" id="txtInputImageDiscription">';
            gridTable += '</div>';
            gridTable += '<div class="wms-srv-grid-cell">.jpg, .png, .jpeg (Max. Size 100kb)</div>';
            gridTable += '<div class="wms-srv-grid-cell">';
            gridTable += '<div class="wms-srv-grid-action">';
            gridTable += '<label for="wms-srv-ctrl-Customer-file-upload"><i class="fas fa-paperclip" title="Attachment"></i><span class="wms-srv-badge" style="display: none;"></span></label>';
            gridTable += '<div class="wms-srv-action-sep">|</div>';
            gridTable += '<input type="file" id="wms-srv-ctrl-Customer-file-upload" accept="image/png, image/gif, image/jpeg, image/jpg" data-srvpath="" onchange="uploadSKUImage();" style="display: none;">';
            gridTable += '<input type="text" hidden id="uploaded-file-LogoPath" data-srvpath="">';
            gridTable += '<i class="fas fa-info" style=" margin-left: 5px; margin-right: 9px;" title="Image File only" class="hoverlogo"></i>';
            gridTable += '<div class="wms-srv-action-sep">|</div>';
            gridTable += '<a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" onclick="saveImageDetails(' + GrdSkuID + ')"></i></a>';
            gridTable += '</div>';
            gridTable += '</div>';
            gridTable += '</div>';

            for (var i = 0; i < GetImagelistvalues.length; i++) {
                var getImageTitle = GetImagelistvalues[i].ImageTitle;
                var getDescription = GetImagelistvalues[i].Description;
                var getAttachment = GetImagelistvalues[i].Attachment;
                var getimageID = GetImagelistvalues[i].Srno;
                //var getdownloadpath = wmsAppImageFiles + 'Attachment/' + GetImagelistvalues[i].ImageDownloadPath;
                var getdownloadpath = wmsAppImageFiles + GetImagelistvalues[i].ImageDownloadPath;

                gridTable += '<div class="wms-srv-grid-row wms-srv-grid-add">';
                gridTable += '<div class="wms-srv-grid-cell"><img src="' + getdownloadpath + '" id="wmsAddUploadedImage1" style="width:50px;height:50px;" /></div>';
                gridTable += '<div class="wms-srv-grid-cell"> ' + getImageTitle + '</div>';
                gridTable += '<div class="wms-srv-grid-cell"> ' + getDescription + '</div>';
                gridTable += '<div class="wms-srv-grid-cell">' + getAttachment + '</div>';
                gridTable += '<div class="wms-srv-grid-cell">';
                gridTable += '<div class="wms-srv-grid-action">';
                gridTable += '<a href="#" title="Cancel" class="wms-srv-cancel" data-prefix="CN"><i class="fas fa-times-circle" onclick="DeletImage(' + getimageID + ',' + GrdSkuID + ')"></i></a>';
                gridTable += '</div>';
                gridTable += '</div>';
                gridTable += '</div>';
            }
            $("#wms-srv-grid-ImagePopup").html(gridTable);
        } else {
            alert("Record not found!!");
        }
    });
}

function getUomList(GrdSkuID) {
    debugger;
    var apiPath = wmsApiPath + 'Product/UomList';

    var postData =
    {
        "UserId": getUserId,
        "SkuID": GrdSkuID
    }

    /* STATIC API CODE */
    apiPath = 'StaticAPI/UomList.json';
    postData = null;
    /* STATIC API CODE */

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == 200) {

            $("#wms-srv-grid-GetUomList").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Sr.No</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Unit Of Measurement</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Quantity</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-row wms-srv-grid-add">';
            // gridTable = gridTable + '<div class="wms-srv-grid-cell"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><select class="wms-srv-grid-cell-input" id="DdlUomList" ><option value="0">--SELECT--</option></select></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell"><input type="text" data-prefix="SESKU" data-id=""  id="TxtInputAddUOM"value=""class="wms-srv-grid-cell-input"></div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell">';
            gridTable = gridTable + '<div class="wms-srv-grid-action"><a href="#" title="Save" class="wms-srv-save" data-prefix="SV"><i class="fas fa-check-circle" onclick="AddUom(' + GrdSkuID + ')"></i></a></div>';
            gridTable = gridTable + '</div></div>'

            for (var i = 0; i < myGridList.Table.length; i++) {

                getpackuomid = myGridList.Table[i].ID;
                getDescription = myGridList.Table[i].Description;
                getQuantity = myGridList.Table[i].Quantity
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
                // gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + i + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">' + getDescription + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"> ' + getQuantity + '</div>';
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><a href="#"title="Remove" class="wms-srv-cancel" data-prefix="CN"><i class="fas fa-times-circle" onclick="removeUom(' + getpackuomid + ',' + GrdSkuID + ')"></i></a></div>';
                gridTable = gridTable + '</div>';
            }
            $("#wms-srv-grid-GetUomList").html(gridTable);
            UOMDdlList();
        }
        else {
            alert("Record not found!!");
        }
    });
}

function UOMDdlList() {
    var apiPath = wmsApiPath + 'Product/Uomddl'
    var postData = {
        "UserId": getUserId
    }

    /* STATIC API CODE */
    apiPath = 'StaticAPI/Uomddl.json';
    postData = null;
    /* STATIC API CODE */

    callHttpUrl(apiPath, postData, function (data) {
        isStatus = data.Status;
        if (isStatus == 200) {
            spnName = [];
            spnId = [];
            $("#DdlUomList").html('<option value="0">--Select--</option>');
            spnName.push('--Select--');
            spnId.push('0');
            var myGridList = data.Result;
            var grnContainerSize = myGridList.Table;
            if (grnContainerSize.length > 0) {
                for (var i = 0; i < grnContainerSize.length; i++) {
                    var getName = grnContainerSize[i].Name;
                    var getId = grnContainerSize[i].ID;
                    spnName.push(getName);
                    spnId.push(getId);
                    $("#DdlUomList").append('<option value = "' + getId + '">' + getName + '</option>');
                }
            }
        }
    });
}

function getSkuUdfList(GrdSkuID) {
    debugger;
    var apiPath = wmsApiPath + 'Product/UDFList';

    var postData =
    {
        "UserId": getUserId,
        "SkuID": GrdSkuID
    }

    /* STATIC API CODE */
    apiPath = 'StaticAPI/UDFList.json';
    postData = null;
    /* STATIC API CODE */

    callHttpUrl(apiPath, postData, function (data) {
        var getStatus = data.Status;
        var getStatusCode = data.StatusCode;
        if (getStatus == 200) {

            $("#tblSkuUdf").html('');
            var myGridList = data.Result;
            var gridTable = '';
            gridTable = gridTable + '<div class="wms-srv-grid-header">';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">User Defined Field</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Value</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Active</div>';
            gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align">Action</div>';
            gridTable = gridTable + '</div>';

            for (var i = 0; i < myGridList.Table.length; i++) {
                getpackuomid = myGridList.Table[i].ID;
                getName = myGridList.Table[i].Name;
                getFieldValue = myGridList.Table[i].FieldValue
                getIsActive = myGridList.Table[i].isActive
                
                gridTable = gridTable + '<div class="wms-srv-grid-row wms-align">';
                if (i == 2) {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-align"><input type="text" value="' + getName + '" class="wms-srv-grid-cell-input" style="text-align:center;" /></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-align"> <input type="text" value="' + getFieldValue + '" class="wms-srv-grid-cell-input" style="text-align:center;" /></div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-align"><input type="radio" name="txtIsUdfActive" id="txtIsUdfActiveY" data-id="" value="" checked="checked"><a href="#" style="margin-right: 20px;">Yes</a> <input type="radio" name="txtIsUdfActive" id="txtIsUdfActiveN" data-id="" value=""><a href="#">No</a></div>';

                } else {
                    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-align">' + getName + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-align"> ' + getFieldValue + '</div>';
                    gridTable = gridTable + '<div class="wms-srv-grid-cell wms-srv-align"> ' + getIsActive + '</div>';
                }
                
                gridTable = gridTable + '<div class="wms-srv-grid-cell  wms-srv-align"><i class="fas fa-edit"></i></div>';
                gridTable = gridTable + '</div>';
            }
            $("#tblSkuUdf").html(gridTable);
        }
        else {
            alert("Record not found!!");
        }
    });
}

function openSKUEditPopup(getSkuRecId) {
    $('#txtWMSSkuCode').val('ROAMING_PACK_30');
    $('#txtWMSSkuName').val('ROAMING_PACK_30');
    $('#ddlSkuCustomer').val('1');
    $('#ddlSkuDepartment').val('1');
    $('#txtSkuCode').val('ROAMING_PACK_30-10233-10384');
    $('#txtSkuCost').val('0.00');
    $('#txtRetailPrice').val('30.00');
    $('#ddlGroupSet').val('No');
    $('#txtMOQ').val('1');
    $('#txtDescription').val('Roaming Recharge 30');
    $('#ddlSkuType').val('Virtual SKU');

    $('#wms-srv-edit-sku-popup').show();
    $('#wms-srv-edit-sku-popup-close').off();
    $('#wms-srv-edit-sku-popup-close').click(function () {
        $('#wms-srv-edit-sku-popup').hide();
    });
}

function OpenAddNewSKUPopup() {
    $('#txtWMSSkuCode').val('');
    $('#txtWMSSkuName').val('');
    $('#ddlSkuCustomer').val('0');
    $('#ddlSkuDepartment').val('0');
    $('#txtSkuCode').val('');
    $('#txtSkuCost').val('');
    $('#txtRetailPrice').val('');
    $('#ddlGroupSet').val('No');
    $('#txtMOQ').val('');
    $('#txtDescription').val('');
    $('#ddlSkuType').val('General SKU');

    $('#wms-srv-edit-sku-popup').show();
    $('#wms-srv-edit-sku-popup-close').off();
    $('#wms-srv-edit-sku-popup-close').click(function () {
        $('#wms-srv-edit-sku-popup').hide();
    });
}

function openImagesPopup(getSkuRecId) {
    getimageList(getSkuRecId);
    $('#wms-srv-Images-popup').show();
    $('#wms-srv-Images-popup-close').off();
    $('#wms-srv-Images-popup-close').click(function () {
        $('#wms-srv-Images-popup').hide();
    });
}
function openinventoryPopup(getSkuRecId) {
    $('#wms-srv-inventory-popup').show();
    $('#wms-srv-inventory-popup-close').off();
    $('#wms-srv-inventory-popup-close').click(function () {
        $('#wms-srv-inventory-popup').hide();
    });
}
function openUOMPopup(getSkuRecId) {
    getUomList(getSkuRecId);
    $('#wms-srv-UOM-popup').show();
    $('#wms-srv-UOM-popup-close').off();
    $('#wms-srv-UOM-popup-close').click(function () {
        $('#wms-srv-UOM-popup').hide();
    });
}

function openUDFList(getSkuRecId) {
    getSkuUdfList(getSkuRecId);
    $('#wms-srv-udf-popup').show();
    $('#wms-srv-udf-popup-close').off();
    $('#wms-srv-udf-popup-close').click(function () {
        $('#wms-srv-udf-popup').hide();
    });
}

function updateSerialFlag(getSkuRecId) {
    if (confirm('Are You Sure to Update SKU Serial Flag?')) {
        alert('Serial flag updated successfully');
    }
}