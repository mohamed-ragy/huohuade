drawPage_lesson = function(){
    $('.pageContainerTree').text('').append(
        $('<a/>',{class:'bold500 showPage',text:text.menu.calendar,page:'calendar'}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:text.calendar.lesson}),
    );
    showLoadingBar($('#loading'))
    $.ajax({
        url:`/${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getLesson:true,
            lesson_id:window.history.state.lesson
        },success:function(r){
            hideLoadingBar($('#loading'))
            window.lesson = JSON.parse(JSON.stringify(r.lesson))
            drawLesson_page()
        }
    })

}
drawLesson_page = function(){
    console.log(window.lesson)
    let lessonDate = new Date(window.lesson.date * 1000)
    let dayDate = new Date(window.lesson.date * 1000).toLocaleDateString(window.lang,{year:'numeric',month:'short',day:'2-digit',timeZone:'Asia/Shanghai'});

    window.calendar.year = lessonDate.getFullYear();
    window.calendar.month = lessonDate.getMonth() + 1;
    let starts_at = new Date(window.lesson.date * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'});
    let lessonName = `${window.lesson.location[`name_${lang}`]}-${window.lesson.court} (${starts_at})`
    $('.pageContainerTree').text('').append(
        $('<a/>',{class:'bold500 showPage',text:text.menu.calendar,page:'calendar'}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<a/>',{class:'bold500 showPage',page:'calendar_day',text:dayDate,day:new Date(lessonDate.toLocaleString('en',{timeZone:'Asia/Shanghai'})).getDate()}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:lessonName}),
    );
    $('.page').text('').append(
        $('<div/>',{class:'wfc'}).append(
            draw_lesson_details(),
            draw_lesson_status_btns(),
        ),
        $('<div/>',{class:'line'}),
        $('<div/>',{class:'pageTabs mT20'}).append(
            $('<div/>',{class:'pageTabArrow pageTabArrowLeft'}).append($('<div/>',{class:'ico-arrow-prev w15 h15'})),
            $('<div/>',{class:'pageTabsContainer'}).append(
                $('<div/>',{tab:'lesson_players',class:`pageTab pageTab_selected`,text:text.lesson.players}),
                $('<div/>',{tab:'lesson_coaches',class:`pageTab `,text:text.lesson.coaches}),
                $('<div/>',{tab:'lesson_timeLine',class:`pageTab`,text:text.lesson.timeLine}),
                $('<div/>',{tab:'lesson_notes',class:`pageTab`,text:text.lesson.notes}),
            ),
            $('<div/>',{class:'pageTabArrow pageTabArrowRight'}).append($('<div/>',{class:'ico-arrow-next w15 h15'})),
        ),
        $('<div/>',{tab:'lesson_players',class:'pageTabContainer pageTabContainer_selected'}).append(
            $('<button/>',{class:`btn btn_cancel addPlayerToLesson ${window.lesson.status != 'upcoming' ? 'none' : ''} ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,lesson:window.lesson.id,text:text.calendar.addPlayerToLesson}),
            $('<table/>',{class:'',id:'lesson_players_table'})
        ),
        $('<div/>',{tab:'lesson_coaches',class:'pageTabContainer'}).append(
            $('<button/>',{class:`btn btn_cancel addCoachToLesson  ${window.lesson.status != 'upcoming' ? 'none' : ''} ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,lesson:window.lesson.id,text:text.calendar.addCoachToLesson}),
            $('<table/>',{class:'',id:'lesson_coahces_table'})
        ),
        $('<div/>',{tab:'lesson_timeLine',class:'pageTabContainer'}).append(
            'timeline'
        ),
        $('<div/>',{tab:'lesson_notes',class:'pageTabContainer'}).append(
            'notes'
        ),
        draw_lesson_coaches(),
        draw_lesson_timeline(),
        draw_lesson_notes(),
    )
    draw_lesson_players_table(),
    fixPageTabsArrows();
}
draw_lesson_details = function(){
    let lessonDate = new Date(window.lesson.date * 1000).toLocaleDateString(window.lang,{year:'numeric',month:'short',day:'2-digit',weekday:'long',hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'});
    return $('<div/>',{class:'lessonDetailsContainer'}).append(
        $('<div/>',{}).append(
            $('<div/>',{class:'lessonDetailsElem'}).append(
                $('<div/>',{class:'',text:text.calendar.date+':'}),
                $('<div/>',{class:'',text:lessonDate})
            ),
            $('<div/>',{class:'lessonDetailsElem'}).append(
                $('<div/>',{class:'',text:text.calendar.status+':'}),
                $('<div/>',{class:`${window.lesson.status}`,text:text.calendar[window.lesson.status]})
            ),
        ),
        $('<div/>',{}).append(
            $('<div/>',{class:'lessonDetailsElem'}).append(
                $('<div/>',{class:'',text:text.calendar.location+':'}),
                $('<a/>',{class:'location_popup',location:window.lesson.location.id,text:window.lesson.location[`name_${lang}`]})
            ),
            $('<div/>',{class:'lessonDetailsElem'}).append(
                $('<div/>',{class:'',text:text.calendar.court+':'}),
                $('<div/>',{class:'',text:window.lesson.court})
            ),
        ),
        $('<div/>',{}).append(
            $('<div/>',{class:`lessonDetailsElem ${window.lesson.started_at == null ? 'none' : ''}`}).append(
                $('<div/>',{class:'',text:text.calendar.started_at+':'}),
                $('<div/>',{class:'',text:new Date(window.lesson.started_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'})})
            ),
            $('<div/>',{class:`lessonDetailsElem ${window.lesson.ended_at == null ? 'none' : ''}`}).append(
                $('<div/>',{class:'',text:text.calendar.ended_at+':'}),
                $('<div/>',{class:'',text:new Date(window.lesson.ended_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'})})
            ),
        ),
    )
}
draw_lesson_status_btns = function(){
    return $('<div/>',{class:`btn_container ${!window.accessibility.lesson_manage_status ? 'none' : ''}`}).append(
        $('<button/>',{class:`btn mX5 ${window.lesson.status != 'ongoing' ? 'none' : ''}`,text:text.lesson.endLesson,id:'lesson_end'}),
        $('<button/>',{class:`btn mX5 ${window.lesson.status != 'upcoming' ? 'none' : ''}`,text:text.lesson.startLesson,id:'lesson_start'}),
        $('<button/>',{class:`btn btn_delete mX5 ${window.lesson.status != 'upcoming' && lesson.status != 'ongoing' ? 'none' : ''}`,text:text.lesson.cancelLesson,id:'lesson_cancel'}),
    )
}
//
draw_lesson_players_table = function(){
    $('#lesson_players_table').text('')
    if(window.lesson.players.length == 0){return;}
    $('#lesson_players_table').text('').append(
        $('<tr/>',{class:'tableRow_head'}).append(
            $('<td/>',{class:'fs08',text:text.lesson.player}),
            $('<td/>',{class:'fs08',text:text.lesson.attendance}),
            $('<td/>',{class:'fs08',text:text.lesson.attended_at}),
            $('<td/>',{class:'fs08',text:text.lesson.finished_at}),
            $('<td/>',{class:`fs08 ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,text:''}),
        )
    );
    for(const key in window.lesson.players){
        let player = window.lesson.players[key];
        let is_attend = '--'; let btns = '';
        if(window.lesson.status == 'upcoming'){
            btns = $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn pointer btn_cancel removePlayerFromLesson',lesson:window.lesson.id,player:player.id,text:text.main.remove})
            )
        }else if(window.lesson.status == 'ongoing' && player.pivot.is_attend == null){
            btns = $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn btn_cancel pointer mX5 player_lesson_attend',player:player.id,text:text.lesson.attend}),
                $('<button/>',{class:'btn btn_cancel pointer mX5 player_lesson_absent',lesson:window.lesson.id,player:player.id,text:text.lesson.absent}),
            )
        }else if(window.lesson.status == 'ongoing' && player.pivot.is_attend == true && player.pivot.finish_at == null){
            btns = $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn pointer btn_cancel player_lesson_endLesson',lesson:window.lesson.id,player:player.id,text:text.lesson.endLesson})
            )

        }
        $('#lesson_players_table').append(
            $('<tr/>',{class:'tableRow'}).append(
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<img/>',{class:'h50 w50 br5 mie-5',src:player.profile_picture}),
                        $('<div/>',{class:'',text:player[`name_${lang}`]})
                    ),
                ),
                $('<td/>',{class:'fs08',}).append($('<div/>',{class:`h25 w25 ${player.pivot.is_attend == true ? 'ico-yes-green' : player.pivot.is_attend == false ? 'ico-no-red' : ''}`})),
                $('<td/>',{class:'fs08',}).append(player.pivot.attend_at == null ? '--' : new Date(player.pivot.attend_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'})),
                $('<td/>',{class:'fs08',}).append(player.pivot.finish_at == null ? '--' : new Date(player.pivot.finish_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'})),
                $('<td/>',{class:`fs08 ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,}).append(btns),
            ),
        )
    }
}

draw_lesson_coaches = function(lesson){
    $('#lesson_coahces_table').text('');
    if(window.lesson.players.length == 0){return;}
    $('#lesson_coahces_table').append(
        
    )
}
draw_lesson_timeline = function(lesson){

}
draw_lesson_notes = function(lesson){

}


 //
