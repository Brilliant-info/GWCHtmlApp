function setupControls(){
	$('.wms-srv-checkbox').each(function(){
		var isCheckboxChecked = $(this).find('input').prop('checked');
		var checkedCss = '';
		var isChecked = 'no';
		var iconSrc = 'far fa-square';
		if(isCheckboxChecked){
			checkedCss = ' ' + 'wms-srv-selected';
			isChecked = 'yes';
			iconSrc = 'fas fa-check-square';
		}
		var checkBoxHtml = '<div class="wms-srv-checkbox-block'+ checkedCss +'" data-ischecked="'+ isChecked +'"><i class="'+ iconSrc +'"></i></div>';
		$(this).find('input').hide();
		$(this).prepend(checkBoxHtml);
	});
	$('.wms-srv-radio').each(function(){
		var isRadioChecked = $(this).find('input').prop('checked');
		var checkedCss = '';
		var isChecked = 'no';
		var iconSrc = 'far fa-circle';
		if(isRadioChecked){
			checkedCss = ' ' + 'wms-srv-selected';
			isChecked = 'yes';
			iconSrc = 'fas fa-dot-circle';
		}
		var radioHtml = '<div class="wms-srv-radio-block'+ checkedCss +'" data-ischecked="'+ isChecked +'"><i class="'+ iconSrc +'"></i></div>';
		$(this).find('input').hide();
		$(this).prepend(radioHtml);
	});
	$('.wms-srv-checkbox').click(function(){
		var isCheckboxChecked = $(this).find('input').prop('checked');
		if(!isCheckboxChecked){
			$(this).find('input').prop('checked', true);
			$(this).find('.wms-srv-checkbox-block').addClass('wms-srv-selected');
			$(this).find('.wms-srv-checkbox-block').data('ischecked','yes');
			$(this).find('i').attr('class','fas fa-check-square');
		}else{
			$(this).find('input').prop('checked', false);
			$(this).find('.wms-srv-checkbox-block').removeClass('wms-srv-selected');
			$(this).find('.wms-srv-checkbox-block').data('ischecked','no');
			$(this).find('i').attr('class','far fa-square');
		}
	});	
	$('.wms-srv-radio').click(function(){
		var parentEle = $(this).parent();
		$(parentEle).find('input').prop('checked', false);
		$(parentEle).find('.wms-srv-radio-block').removeClass('wms-srv-selected');
		$(parentEle).find('.wms-srv-radio-block').data('ischecked','no');
		$(parentEle).find('i').attr('class','far fa-circle');
			
		$(this).find('input').prop('checked', true);
		$(this).find('.wms-srv-radio-block').addClass('wms-srv-selected');
		$(this).find('.wms-srv-radio-block').data('ischecked','yes');
		$(this).find('i').attr('class','fas fa-dot-circle');
	});
}