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
    $('.page').text('').append(
        $('<div/>',{class:`w100p column alnS jstfyS`}).append(
            $('<div/>',{class:`btn_container ${!window.accessibility.lessons_create ? 'none' : ''}`}).append(
                $('<button/>',{class:'showPage btn btn_cancel',page:'create_new_lesson',text:text.calendar.createNewLesson})
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

    for(const key in lessons){
        let lesson = lessons[key];
        let location_img = '../storage/imgs/profile_location.png';
        let starts_at = new Date(lesson.date * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'});

        lesson.location.profile_picture == null ? location_img = '../storage/imgs/profile_location.png' : location_img = `../storage/imgs/locations/${lesson.location.profile_picture}` ;
        $('#lessonsTable').append(
            $('<tr/>',{class:`tableRow pointer lessonTableRow-${lesson.id}`}).append(
                $('<td/>',{class:'fs08',}).append(
                    $('<img/>',{src:location_img,class:'locationTableImg',tooltip:lesson.location[`name_${window.lang}`]})
                ),
                $('<td/>',{class:'fs08',text:text.calendar[lesson.status]}),
                $('<td/>',{class:'fs08',text:starts_at}),
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:`row wrap alnC jstfyS lessonTableRow_coaches-${lesson.id}`}),
                ),
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:`row wrap alnC jstfyS lessonTableRow_players-${lesson.id}`})
                ),
            )
        );
        draw_calendarDay_lesson_coaches($(`.lessonTableRow_coaches-${lesson.id}`),lesson.coaches,lesson.id)
        draw_calendarDay_lesson_players($(`.lessonTableRow_players-${lesson.id}`),lesson.players,lesson.id)
    }
}

draw_calendarDay_lesson_coaches = function(container,coahces,lesson_id){
    container.text('')
    for(const key in coahces){
        let coach = coahces[key];
        let coach_img = coach.profile_picture == null && coach.gender == 'male' ? '../storage/imgs/profile_male.png' :
        coach.profile_picture == null && coach.gender == 'female' ? '../storage/imgs/profile_female.png' :
        `../storage/imgs/coaches/${coach.profile_picture}`;
        container.append(
            $('<div/>',{class:'lessonTable_coachTag'}).append(
                $('<img/>',{class:'lessonTable_coachTagImg',src:coach_img}),
                $('<div/>',{class:'fs08 mX5',text:coach[`name_${window.lang}`]}),
                $('<button/>',{class:`removeCoachFromLesson ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,tooltip:text.main.remove,lesson:lesson_id,coach:coach.id}).append($('<div/>',{class:'ico-close-white h15 w15'}))
            )
        )
    }
    container.append(
        $('<div/>',{class:`ico-add h25 w25 m5 addCoachToLesson pointer ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,tooltip:text.main.add,lesson:lesson_id}),
    )
}
draw_calendarDay_lesson_players = function(container,players,lesson_id){
    container.text('')
    for(const key in players){
        let player = players[key];
        let player_img = player.profile_picture == null && player.gender == 'male' ? '../storage/imgs/profile_male.png' :
        player.profile_picture == null && player.gender == 'female' ? '../storage/imgs/profile_female.png' :
        `../storage/imgs/players/${player.profile_picture}`;
        container.append(
            $('<div/>',{class:'lessonTable_playerTag'}).append(
                $('<img/>',{class:'lessonTable_playerTagImg  ',src:player_img}),
                $('<div/>',{class:'fs08 mX5',text:player[`name_${window.lang}`]}),
                $('<button/>',{class:`removePlayerFromLesson ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,tooltip:text.main.remove,lesson:lesson_id,player:player.id}).append($('<div/>',{class:'ico-close-white h15 w15'}))
            )
        )
    }
    container.append(
        $('<div/>',{class:`ico-add h25 w25 m5 addPlayerToLesson pointer ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,tooltip:text.main.add,lesson:lesson_id}),

    )
}
