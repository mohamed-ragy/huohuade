$('html,body').on('click','.timePickerDown',function(e){
    e.stopImmediatePropagation();
    if($(this).closest('.timePicker').attr('type') == 'hour' && parseInt($(this).closest('.timePicker').find('.timePickerNumber').text()) == 0){
        $(this).closest('.timePicker').find('.timePickerNumber').text(23)
    }else if($(this).closest('.timePicker').attr('type') == 'minute' && parseInt($(this).closest('.timePicker').find('.timePickerNumber').text()) == 0){
        $(this).closest('.timePicker').find('.timePickerNumber').text(59)
    }else{
        $(this).closest('.timePicker').find('.timePickerNumber').text(parseInt($(this).closest('.timePicker').find('.timePickerNumber').text()) - 1)

    }
})
$('html,body').on('click','.timePickerUp',function(e){
    e.stopImmediatePropagation();
    if($(this).closest('.timePicker').attr('type') == 'hour' && parseInt($(this).closest('.timePicker').find('.timePickerNumber').text()) == 23){
        $(this).closest('.timePicker').find('.timePickerNumber').text('0')
    }else if($(this).closest('.timePicker').attr('type') == 'minute' && parseInt($(this).closest('.timePicker').find('.timePickerNumber').text()) == 59){
        $(this).closest('.timePicker').find('.timePickerNumber').text('0')
    }else{
        $(this).closest('.timePicker').find('.timePickerNumber').text(parseInt($(this).closest('.timePicker').find('.timePickerNumber').text()) + 1)

    }
})
