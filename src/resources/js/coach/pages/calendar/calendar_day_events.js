
require('./calendar_day_events/remvoeCoachFromLesson.js')
require('./calendar_day_events/removePlayerFromLesson.js')
require('./calendar_day_events/addCoachToLesson.js')
require('./calendar_day_events/addPlayerToLesson.js')
///
$('html,body').on('click','.canceled_lessons_toggle',function(e){
    e.stopImmediatePropagation();
    if($(this).children().first().hasClass('ico-check0')){
        $(this).children().first().removeClass('ico-check0').addClass('ico-check1');
        $('.canceledLesson_tableRow').removeClass('none')
    }else if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().removeClass('ico-check1').addClass('ico-check0');
        $('.canceledLesson_tableRow').addClass('none')
    }
})
////
