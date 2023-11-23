drawPage_calendar_day = function(){
    let dayDate = new Date(window.history.state.year,window.history.state.month - 1,window.history.state.day).toLocaleDateString(window.lang,{year:'numeric',month:'short',day:'2-digit'});
    $('.pageContainerTree').text('').append(
        $('<a/>',{class:'bold500 showPage',text:text.menu.calendar,page:'calendar'}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:dayDate}),
    );
    showLoadingBar($('#loading'))
    $.ajax({
        url:`/${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getCalendarDay:true,
            month:window.calendar.month,
            year:window.calendar.year,
            day:window.history.state.day,
        },success:function(r){
            hideLoadingBar($('#loading'))
            window.lessons = r.lessons;
            drawCalendarDay_page(r.lessons)
        }
    })
}
drawCalendarDay_page = function(lessons){
    let can_create_lesson = true;
    let today = new Date(Date.parse(new Date().toLocaleString('en',{timeZone:'Asia/Shanghai'})));


    if(parseInt(window.history.state.year) < today.getFullYear()){
        can_create_lesson = false;
    }else if(
        parseInt(window.history.state.year) == today.getFullYear() &&
        parseInt(window.history.state.month) < today.getMonth() + 1
    ){
        can_create_lesson = false;
    }else if(
        parseInt(window.history.state.year) == today.getFullYear() &&
        parseInt(window.history.state.month) ==  today.getMonth() + 1 &&
        parseInt(window.history.state.day) < today.getDate()
    ){
        can_create_lesson = false;
    }

    $('.page').text('').append(
        $('<div/>',{class:`w100p column alnS jstfyS`}).append(
            $('<div/>',{class:`btn_container ${!window.accessibility.lessons_create || !can_create_lesson ? 'none' : ''}`}).append(
                $('<button/>',{class:'showPage btn btn_cancel',page:'create_new_lesson',text:text.calendar.createNewLesson})
            ),
            $('<div/>',{class:`row alnC jstfyS pointer m20 canceled_lessons_toggle`}).append(
                $('<span/>',{class:'ico-check0 h15 w15 mie-5'}),
                $('<span/>',{class:'fs08',text:text.calendar.seeCanceledLessons})
            ),
            $('<div/>',{class:'lessonsTableContainer'}).append(
                $('<table/>',{id:'lessonsTable'}).append(
                    $('<tr/>',{class:`tableRow_head`}).append(
                        $('<td/>',{class:'fs08 tnw',text:text.calendar.location}),
                        $('<td/>',{class:'fs08 tnw',text:text.calendar.status}),
                        $('<td/>',{class:'fs08 tnw',text:text.calendar.time}),
                        $('<td/>',{class:'fs08 tnw',text:text.calendar.coaches}),
                        $('<td/>',{class:'fs08 tnw',text:text.calendar.players}),
                    )
                ),
            )
        ),
    );
    if(lessons.length == 0){
        $('.lessonsTableContainer').text('').append(
            $('<div/>',{class:'mX20',text:text.calendar.noLessons})
        )
    }
    for(const key in lessons){
        let lesson = lessons[key];
        let starts_at = new Date(lesson.date * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'});
        $('#lessonsTable').append(
            $('<tr/>',{class:`tableRow pointer lessonTableRow-${lesson.id} ${lesson.status == 'canceled' ? 'canceledLesson_tableRow none' : ''} showPage`,page:'lesson',lesson:lesson.id}).append(
                $('<td/>',{class:'fs08 location_popup',location:lesson.location.id}).append(
                    $('<img/>',{src:lesson.location.profile_picture,class:'locationTableImg',tooltip:lesson.location[`name_${window.lang}`]}),
                    $('<div/>',{class:'fs08 tnw',text:`${lesson.location[`name_${lang}`]}-${lesson.court}`})
                ),
                $('<td/>',{}).append(
                    $('<div/>',{class:`fs08 ${lesson.status}`,text:text.calendar[lesson.status]})
                ),
                $('<td/>',{class:'fs08',text:starts_at}),
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:`row wrap alnC jstfyS lessonTableRow_coaches-${lesson.id}`}),
                ),
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:`row wrap alnC jstfyS lessonTableRow_players-${lesson.id}`})
                ),
            )
        );
        draw_calendarDay_lesson_coaches($(`.lessonTableRow_coaches-${lesson.id}`),lesson.coaches,lesson)
        draw_calendarDay_lesson_players($(`.lessonTableRow_players-${lesson.id}`),lesson.players,lesson)
    }
}

draw_calendarDay_lesson_coaches = function(container,coahces,lesson){

    container.text('')
    for(const key in coahces){
        let coach = coahces[key];
        container.append(
            $('<div/>',{class:'lessonTable_coachTag'}).append(
                $('<img/>',{class:'lessonTable_coachTagImg',src:coach.profile_picture}),
                $('<div/>',{class:'fs08 mX5',text:coach[`name_${window.lang}`]}),
                $('<button/>',{class:`removeCoachFromLesson ${lesson.status == 'finished' || lesson.status == 'canceled' ? 'none' : ''} ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,tooltip:text.main.remove,lesson:lesson.id,coach:coach.id}).append($('<div/>',{class:'ico-close-white h15 w15'}))
            )
        )
    }
    container.append(
        $('<div/>',{class:`ico-add h25 w25 m5 addCoachToLesson pointer ${lesson.status == 'finished' || lesson.status == 'canceled' ? 'none' : ''} ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,tooltip:text.main.add,lesson:lesson.id}),
    )
}
draw_calendarDay_lesson_players = function(container,players,lesson){
    container.text('')
    for(const key in players){
        let player = players[key];
        container.append(
            $('<div/>',{class:'lessonTable_playerTag'}).append(
                $('<img/>',{class:'lessonTable_playerTagImg  ',src:player.profile_picture}),
                $('<div/>',{class:'fs08 mX5',text:player[`name_${window.lang}`]}),
                $('<button/>',{class:`removePlayerFromLesson removePlayerFromLesson_icon ${lesson.status == 'finished' || lesson.status == 'canceled' ? 'none' : ''} ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,tooltip:text.main.remove,lesson:lesson.id,player:player.id}).append($('<div/>',{class:'ico-close-white h15 w15'}))
            )
        )
    }
    container.append(
        $('<div/>',{class:`ico-add h25 w25 m5 addPlayerToLesson pointer ${lesson.status == 'finished' || lesson.status == 'canceled' ? 'none' : ''} ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,tooltip:text.main.add,lesson:lesson.id}),

    )
}
