function OpenTaskAssignment(oid) {
    $('#theme-taskassignment-popup').show();
    $('#theme-taskassignment-popup .wms-srv-datepicker').datepicker({ dateFormat: 'dd-M-yy' });
    $('#theme-taskassignment-popup-close').off();
    $('#theme-taskassignment-popup-close').click(function () {
        $('#theme-taskassignment-popup .wms-srv-datepicker').datepicker('destroy');
        $('#theme-taskassignment-popup').hide();
    });
}

function openUser() {
    $('#wms-srv-user-popup').show();
    $('#wms-srv-user-popup-close').off();
    $('#wms-srv-user-popup-close').click(function () {
        $('#wms-srv-user-popup').hide();
    });
}