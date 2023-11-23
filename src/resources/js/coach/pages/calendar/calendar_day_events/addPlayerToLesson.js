$('html,body').on('click','.addPlayerToLesson',function(e){
    e.stopImmediatePropagation();
    let lesson_id = $(this).attr('lesson');
    let lesson;
    if(window.history.state.page == 'lesson'){
        lesson = window.lesson;
    }else if(window.history.state.page == 'calendar_day'){
        lesson = window.lessons.find(item=>item.id == lesson_id)
    }
    let players_container;
    $('.popupTitle').text(text.calendar.addPlayerToLesson);
    $('.popupBody').addClass('w100p').text('').append(
        $('<div/>',{class:'btn_container m20'}).append(
            $('<button/>',{class:'btn',id:'addPlayerToLesson_confirm',lesson:lesson_id,text:text.main.add})
        ),
        $('<input/>',{type:'text',class:'inputText addPlayerToLessonFindPlayer',placeholder:text.calendar.findPlayer}),
        players_container = $('<div/>',{class:'m5 w100p-10 h300'}),
    )
    for(const key in players){
        let player = players[key];
        if(!player.is_deleted){
            if(typeof(lesson.players.find(item2=>item2.id === player.id)) === 'undefined'){
                players_container.append(
                    $('<div/>',{class:'row alnC jstfySB w100p pointer pY5 addPlayerToLessonPlayerElem',player_name:player[`name_${window.lang}`]}).append(
                        $('<div/>',{class:'row alnC jstfyS'}).append(
                            $('<img/>',{class:'h40 w40 ofCover br50p',src:player.profile_picture}),
                            $('<div/>',{class:'fs09 mX10',text:player[`name_${window.lang}`]})
                        ),
                        $('<div/>',{class:'h20 w20 ico-check0 addPlayerToLesson_check',player:player.id})
                    )
                )
            }
        }


    }
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.addPlayerToLessonPlayerElem',function(e){
    e.stopImmediatePropagation();
    if($(this).find('.addPlayerToLesson_check').hasClass('ico-check1')){
        $(this).find('.addPlayerToLesson_check').removeClass('ico-check1').addClass('ico-check0');
    }else if($(this).find('.addPlayerToLesson_check').hasClass('ico-check0')){
        $(this).find('.addPlayerToLesson_check').removeClass('ico-check0').addClass('ico-check1')
    }
})
$('html,body').on('input change','.addPlayerToLessonFindPlayer',function(e){
    e.stopImmediatePropagation();
    $('.addPlayerToLessonPlayerElem').each(function(){
        if(!$(this).attr('player_name').toLowerCase().includes($('.addPlayerToLessonFindPlayer').val().toLowerCase())){
            $(this).addClass('none')
        }else{
            $(this).removeClass('none')
        }
    })
})
$('html,body').on('click','#addPlayerToLesson_confirm',function(e){
    e.stopImmediatePropagation();
    let playersIds = [];
    let lesson_id = $(this).attr('lesson');
    $('.addPlayerToLesson_check').each(function(){
        if($(this).hasClass('ico-check1')){
            playersIds.push($(this).attr('player'))
        }
    })
    if(playersIds.length == 0){return;}
    $('.popupContainer').addClass('none')
    showLoadingBar($('#loading'))
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:`post`,
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            addPlayerToLesson:true,
            playersIds:playersIds,
            lesson_id:lesson_id,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.stats == 1){

                if(window.history.state.page == 'lesson'){
                    for(const key in r.players){
                        r.players[key].pivot = {
                            'is_attend':null,
                            'attend_at':null,
                            'finish_at':null,
                        }
                        window.lesson.players.push(r.players[key]);
                    }
                    draw_lesson_players_table();
                }else if(window.history.state.page == 'calendar_day'){
                    for(const key in r.players){
                        window.lessons.find(item=>item.id == lesson_id).players.push(r.players[key]);
                    }
                    draw_calendarDay_lesson_players($(`.lessonTableRow_players-${lesson_id}`),window.lessons.find(item=>item.id == lesson_id).players,window.lessons.find(item=>item.id == lesson_id))
                }
            }

        }
    })
})
