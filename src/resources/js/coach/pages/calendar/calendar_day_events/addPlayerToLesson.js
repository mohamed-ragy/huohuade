$('html,body').on('click','.addPlayerToLesson',function(e){
    e.stopImmediatePropagation();
    let lesson_id = $(this).attr('lesson');
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
        if(!player.is_deleted)
        console.log(window.lessons.find(item=>item.id == lesson_id).players.find(item2=>item2.id === player.id))
        if(typeof(window.lessons.find(item=>item.id == lesson_id).players.find(item2=>item2.id === player.id)) === 'undefined'){
            players_container.append(
                $('<div/>',{class:'row alnC jstfySB w100p pY5 addPlayerToLessonPlayerElem',player_name:player[`name_${window.lang}`]}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<img/>',{class:'h40 w40 ofCover br50p',src:player.profile_picture}),
                        $('<div/>',{class:'fs09 mX10',text:player[`name_${window.lang}`]})
                    ),
                    $('<div/>',{class:'h20 w20 pointer ico-check0 addPlayerToLesson_check',player:player.id})
                )
            )
        }

    }
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.addPlayerToLesson_check',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('ico-check1')){
        $(this).removeClass('ico-check1').addClass('ico-check0');
    }else if($(this).hasClass('ico-check0')){
        $(this).removeClass('ico-check0').addClass('ico-check1')
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
                for(const key in r.players){
                    window.lessons.find(item=>item.id == lesson_id).players.push(r.players[key]);
                }
                draw_calendarDay_lesson_players($(`.lessonTableRow_players-${lesson_id}`),window.lessons.find(item=>item.id == lesson_id).players,lesson_id)
                $('.popupContainer').addClass('none')
            }

        }
    })
})
