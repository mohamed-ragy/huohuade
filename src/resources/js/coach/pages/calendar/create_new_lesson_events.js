$('html,body').on('click','.create_lesson_location_item',function(e){
    // e.stopImmediatePropagation();
    let location = locations.find(item=>item.id == $(this).attr('key'));
    $('.create_lesson_location_court_container').removeClass('none');
    $('.create_lesson_location_court_container').find('.inputSelectList').text('')
    $('.create_lesson_location_court_container').find('.inputSelect').val('').attr('key',null)
    for(const key in location.courts){
        $('.create_lesson_location_court_container').find('.inputSelectList').append(
            $('<div/>',{class:'inputSelectListItem',text:location.courts[key],key:location.courts[key]}),
        )
    }
})
//
$('html,body').on('click','#create_lesson_btn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.create_lesson_location_error').text('')
    $('.create_lesson_input').prop('disabled',true);
    $.ajax({
        url:`/${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            create_new_lesson:true,
            location_id:$('#create_lesson_location').attr('key'),
            court:$('#create_lesson_location_court').attr('key'),
            year:window.history.state.year,
            month:window.history.state.month,
            day:window.history.state.day,
            start_hour:$('#create_lesson_startHour').text(),
            start_minute:$('#create_lesson_startMinute').text(),
            end_hour:$('#create_lesson_endHour').text(),
            end_minute:$('#create_lesson_endMinute').text(),
        },success:function(r){
            $('.create_lesson_input').prop('disabled',false);
            hideLoadingBar($('#loading'))
            if(r.stats == 0){
                $('.create_lesson_location_error').text(text.calendar.selectLocation)
            }else if(r.stats == 2){
                $('.create_lesson_location_court_error').text(text.calendar.selectCourt)
            }else if(r.stats == 1){
            window.history.pushState({page:'calendar_day',day:window.history.state.day,month:window.calendar.month,year:window.calendar.year},'',`/${window.lang}/?page=calendar_day&day=${window.history.state.day}&month=${window.calendar.month}&year=${window.calendar.year}`)
            drawPage_calendar_day()
            }
        }
    })
})
///
