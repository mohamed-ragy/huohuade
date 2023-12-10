$('html,body').on('click','.datePicker',function(e){
    e.stopImmediatePropagation();
    $(this).find('.datePicker_select').removeClass('none')
})

$(document).on('click',function(){
    if(window.history.state.page == 'calendar'){
        if(!$('.datePicker').is(':hover') ){
            $('.datePicker_select').addClass('none')
        }
    }

})
///
$('html,body').on('click','.datePicker_select_year_prev',function(e){
    e.stopImmediatePropagation();
    let year = parseInt($(this).parent().find('.datePicker_select_year').attr('year')) - 1;
    $(this).parent().find('.datePicker_select_year').attr('year',year).text(year);
})
$('html,body').on('click','.datePicker_select_year_next',function(e){
    e.stopImmediatePropagation();
    let year = parseInt($(this).parent().find('.datePicker_select_year').attr('year')) + 1;
    $(this).parent().find('.datePicker_select_year').attr('year',year).text(year);
})
//
$('html,body').on('click','.datePicker_select_month_prev',function(e){
    e.stopImmediatePropagation();
    let month = parseInt($(this).parent().find('.datePicker_select_month').attr('month')) - 1;
    month == 0 ? month = 12 : null;
    $(this).parent().find('.datePicker_select_month').attr('month',month).text(text.months[month]);
})
$('html,body').on('click','.datePicker_select_month_next',function(e){
    e.stopImmediatePropagation();
    let month = parseInt($(this).parent().find('.datePicker_select_month').attr('month')) + 1;
    month == 13 ? month = 1 : null;
    $(this).parent().find('.datePicker_select_month').attr('month',month).text(text.months[month]);
})
//
$('html,body').on('click','.datePicker_select_btn',function(e){
    // e.stopImmediatePropagation();
    let datePicker = $(this).closest('.datePicker');
    let month = datePicker.find('.datePicker_select_month').attr('month');
    let year = datePicker.find('.datePicker_select_year').attr('year');
    datePicker.attr('month',month).attr('year',year);
    datePicker.find('.datePicker_month').text(text.months[month]);
    datePicker.find('.datePicker_year').text(year);
    datePicker.find('.datePicker_select').addClass('none');
})
//
