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
    let lessonDate = new Date(window.lesson.start_at * 1000)
    let dayDate = new Date(window.lesson.start_at * 1000).toLocaleDateString(window.lang,{year:'numeric',month:'short',day:'2-digit',timeZone:'Asia/Shanghai'});

    window.calendar.year = lessonDate.getFullYear();
    window.calendar.month = lessonDate.getMonth() + 1;
    let starts_at = new Date(window.lesson.start_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'});
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
                $('<div/>',{tab:'lesson_timeLine',lesson:window.lesson.id,class:`pageTab`,text:text.lesson.timeLine}),
                $('<div/>',{tab:'lesson_notes',class:`pageTab`,text:text.lesson.notes}),
            ),
            $('<div/>',{class:'pageTabArrow pageTabArrowRight'}).append($('<div/>',{class:'ico-arrow-next w15 h15'})),
        ),
        $('<div/>',{tab:'lesson_players',class:'pageTabContainer pageTabContainer_selected'}).append(
            $('<button/>',{class:`btn btn_cancel addPlayerToLesson ${window.lesson.status != 'upcoming' ? 'none' : ''} ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,lesson:window.lesson.id,text:text.calendar.addPlayerToLesson}),
            $('<table/>',{class:'',id:'lesson_players_table'})
        ),
        $('<div/>',{tab:'lesson_coaches',class:'pageTabContainer'}).append(
            $('<button/>',{class:`btn btn_cancel addCoachToLesson ${window.lesson.status != 'upcoming' ? 'none' : ''} ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,lesson:window.lesson.id,text:text.calendar.addCoachToLesson}),
            $('<table/>',{class:'',id:'lesson_coaches_table'})
        ),
        $('<div/>',{tab:'lesson_timeLine',class:'pageTabContainer'}).append(
            $('<div/>',{id:'lesson_timeLine_container'}),
        ),
        $('<div/>',{tab:'lesson_notes',class:'pageTabContainer'}).append(
            $('<div/>',{class:`column alnC jstfyS `}).append(
                $('<div/>',{class:`${window.lesson.status == 'finished' || window.lesson.status == 'canceled' ? 'none' : ''} wfc column alnE jstfyS`}).append(
                    $('<textarea/>',{id:'lesson_note_post',class:'textarea lesson_notes_texarea',placeholder:text.lesson.notePlaceholder}),
                    $('<button/>',{class:'btn mX5 mY10',id:'lesson_note_postBtn',text:text.lesson.postNote})
                ),
                $('<div/>',{class:'line'}),
                $('<div/>',{id:'lesson_notes_container_pinned'}),
                $('<div/>',{id:'lesson_notes_container'}),
            ),
        ),
    )
    draw_lesson_players_table();
    draw_lesson_coaches_table();
    draw_lesson_notes();
    draw_lesson_timeline();
    fixPageTabsArrows();
}
draw_lesson_details = function(){
    let lessonDate = new Date(window.lesson.start_at * 1000).toLocaleDateString(window.lang,{year:'numeric',month:'short',day:'2-digit',weekday:'long',hour12:false,timeZone:'Asia/Shanghai'});
    let start_at = new Date(lesson.start_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'});
    let end_at = new Date(lesson.end_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'});
    return $('<div/>',{class:'lessonDetailsContainer'}).append(
        $('<div/>',{}).append(
            $('<div/>',{class:'lessonDetailsElem'}).append(
                $('<div/>',{class:'',text:text.calendar.date+':'}),
                $('<div/>',{class:'',text:lessonDate})
            ),
            $('<div/>',{class:'lessonDetailsElem'}).append(
                $('<div/>',{class:'',text:text.calendar.time+':'}),
                $('<div/>',{class:'',text:`${start_at}~${end_at}`})
            ),
            $('<div/>',{class:'lessonDetailsElem'}).append(
                $('<div/>',{class:'',text:text.calendar.status+':'}),
                $('<div/>',{class:`${window.lesson.status}`,text:text.calendar[window.lesson.status]})
            ),
            $('<div/>',{class:`lessonDetailsElem ${lesson.status != 'canceled' ? 'none' : ''}`}).append(
                $('<div/>',{class:'',text:text.calendar.cancelReason+':'}),
                $('<div/>',{class:``,text:lesson.cancelation_reason})
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

draw_lesson_coaches_table = function(){
    $('#lesson_coaches_table').text('');
    if(window.lesson.coaches.length == 0){return;}
    $('#lesson_coaches_table').append(
        $('<tr/>',{class:'tableRow_head'}).append(
            $('<td/>',{class:'fs08',text:text.lesson.coach}),
            $('<td/>',{class:'fs08',text:text.lesson.attendance}),
            $('<td/>',{class:'fs08',text:text.lesson.attended_at}),
            $('<td/>',{class:'fs08',text:text.lesson.finished_at}),
            $('<td/>',{class:`fs08 ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,text:''}),
        )
    );
    for(const key in window.lesson.coaches){
        let coach = window.lesson.coaches[key];
        let is_attend = '--'; let btns = '';
        if(window.lesson.status == 'upcoming'){
            btns = $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn pointer btn_cancel removeCoachFromLesson',lesson:window.lesson.id,coach:coach.id,text:text.main.remove})
            )
        }else if(window.lesson.status == 'ongoing' && coach.pivot.is_attend == null){
            btns = $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn btn_cancel pointer mX5 coach_lesson_attend',coach:coach.id,text:text.lesson.attend}),
                $('<button/>',{class:'btn btn_cancel pointer mX5 coach_lesson_absent',lesson:window.lesson.id,coach:coach.id,text:text.lesson.absent}),
            )
        }else if(window.lesson.status == 'ongoing' && coach.pivot.is_attend == true && coach.pivot.finish_at == null){
            btns = $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn pointer btn_cancel coach_lesson_endLesson',lesson:window.lesson.id,coach:coach.id,text:text.lesson.endLesson})
            )
        }
        $('#lesson_coaches_table').append(
            $('<tr/>',{class:'tableRow'}).append(
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<img/>',{class:'h50 w50 br5 mie-5',src:coach.profile_picture}),
                        $('<div/>',{class:'',text:coach[`name_${lang}`]})
                    )
                ),
                $('<td/>',{class:'fs08',}).append($('<div/>',{class:`h25 w25 ${coach.pivot.is_attend == true ? 'ico-yes-green' : coach.pivot.is_attend == false ? 'ico-no-red' : ''}`})),
                $('<td/>',{class:'fs08',}).append(coach.pivot.attend_at == null ? '--' : new Date(coach.pivot.attend_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'})),
                $('<td/>',{class:'fs08',}).append(coach.pivot.finish_at == null ? '--' : new Date(coach.pivot.finish_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'})),
                $('<td/>',{class:`fs08 ${!window.accessibility.lesson_remove_add_coach_player ? 'none' : ''}`,}).append(btns),
            )
        )
    }
}
draw_lesson_timeline = function(){
    window.lesson.activites.sort((a,b)=>{
        return b.created_at - a.created_at;
    });
    $('#lesson_timeLine_container').text('')
    for(const key in window.lesson.activites){
        $('#lesson_timeLine_container').append(
            draw_lesson_activity(window.lesson.activites[key])
        )
    }
}
draw_lesson_activity = function(activity){
    console.log(activity)
    let activityTxt = '';
    switch(activity.code){
        case 'lesson.create':
            activityTxt = text.lesson['lesson.create'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.add_coach':
            activityTxt = text.lesson['lesson.add_coach'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':coach_name:',`<b>${activity[`coach_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.remove_coach':
            activityTxt = text.lesson['lesson.remove_coach'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':coach_name:',`<b>${activity[`coach_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.add_player':
            activityTxt = text.lesson['lesson.add_player'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':player_name:',`<b>${activity[`player_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.remove_player':
            activityTxt = text.lesson['lesson.remove_player'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':player_name:',`<b>${activity[`player_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.start':
            activityTxt = text.lesson['lesson.start'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.end':
            activityTxt = text.lesson['lesson.end'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.cancel':
            activityTxt = text.lesson['lesson.cancel'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.player.attend':
            activityTxt = text.lesson['lesson.player.attend'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':player_name:',`<b>${activity[`player_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.player.absent':
            activityTxt = text.lesson['lesson.player.absent'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':player_name:',`<b>${activity[`player_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.player.endLesson':
            activityTxt = text.lesson['lesson.player.endLesson'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':player_name:',`<b>${activity[`player_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.coach.attend':
            activityTxt = text.lesson['lesson.coach.attend'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':coach_name:',`<b>${activity[`coach_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.coach.absent':
            activityTxt = text.lesson['lesson.coach.absent'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':coach_name:',`<b>${activity[`coach_name_${window.lang}`]}</b>`)
        break;
        case 'lesson.coach.endLesson':
            activityTxt = text.lesson['lesson.coach.endLesson'].replace(':created_by_name:',`<b>${activity[`created_by_name_${window.lang}`]}</b>`).replace(':coach_name:',`<b>${activity[`coach_name_${window.lang}`]}</b>`)
        break;
    }
    return $('<div/>',{class:'lesson_activity_container'}).append(
        $('<div/>',{class:'lesson_activity_container_left'}).append(
            $('<div/>',{class:'column alnC jstyfC wfc'}).append(
                $('<img/>',{class:'w40 h40 ofCover br50p mB5',src:activity.coaches.profile_picture}),
                $('<div/>',{text:new Date(activity.created_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'})}),
                $('<div/>',{text:new Date(activity.created_at * 1000).toLocaleDateString(window.lang,{day:'2-digit',month:'short',timeZone:'Asia/Shanghai'})})
            )
        ),
        $('<div/>',{class:'lesson_activity_container_right'}).append(
            $('<div/>',{class:'lesson_activity_activity',html:activityTxt})
        ),
    )
}
//
draw_lesson_notes = function(){
    window.lesson.notes.sort((a,b)=>{
        return b.created_at - a.created_at;
    });
    $('#lesson_notes_container_pinned').text('');
    $('#lesson_notes_container').text('');
    for(const key in window.lesson.notes){
        let note = window.lesson.notes[key];
        if(note.is_pinned == true){
            $('#lesson_notes_container_pinned').prepend(
                draw_lesson_note(note),
            )
        }else if(note.is_pinned == false){
            $('#lesson_notes_container').append(
                draw_lesson_note(note),
            )
        }

    }
}
draw_lesson_note = function(note){
    return $('<div/>',{class:'lesson_note_container'}).append(
        $('<div/>',{class:`${note.is_pinned ? 'ico-pinned' : 'ico-un-pinned'} lesson_note_pin_toggle`,note:note._id}),
        $('<div/>',{class:'row alnC jstfyS'}).append(
            $('<img/>',{class:'h40 w40 ofCover br50p',src:note.coaches.profile_picture}),
            $('<div/>',{class:'mis-10'}).append(
                $('<div/>',{class:' bold500',text:note.coaches[`name_${lang}`]}),
                $('<div/>',{class:`fs07 c_coach_${note.coaches.coach_level}`,text:text.coaches[`coach_${note.coaches.coach_level}`]})
            )
        ),
        $('<div/>',{class:'mY10',text:note.note}),
        $('<div/>',{class:'fs08 alnsE',text:new Date(note.created_at * 1000).toLocaleTimeString(window.lang,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Shanghai'})})
    )
}
//

