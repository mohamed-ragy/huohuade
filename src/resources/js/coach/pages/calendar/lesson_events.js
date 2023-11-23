$('html,body').on('click','#lesson_start',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('btn_confirm')){$(this).addClass('btn_confirm');return;}
    lesson_status_change_loading(true);
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:`post`,
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            startLesson:true,
            lesson_id:window.history.state.lesson,
        },success:function(r){
            lesson_status_change_loading(false);
            if(r.state == 1){
                window.lesson.status = 'ongoing';
                window.lesson.started_at = r.now;
                drawLesson_page()
            }
        }

    });
})
$('html,body').on('click','#lesson_end',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('btn_confirm')){$(this).addClass('btn_confirm');return;}
    lesson_status_change_loading(true);
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:`post`,
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            endLesson:true,
            lesson_id:window.history.state.lesson,
        },success:function(r){
            lesson_status_change_loading(false);
            if(r.state == 1){
                window.lesson.status = 'finished';
                window.lesson.ended_at = r.now;
                drawLesson_page()
            }
        }

    });
})
$('html,body').on('click','#lesson_cancel',function(e){
    e.stopImmediatePropagation();
    $('.popupTitle').text(text.lesson.cancelLesson);
    $('.popupBody').addClass('w100p').text('').append(
        $('<div/>',{class:'m20'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.lesson.cancelReason}),
            $('<textarea/>',{class:'textarea',id:'cancel_lesson_reason',maxlength:400}),
            $('<div/>',{class:'cancel_lesson_reason_error fs08 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'btn_container'}).append(
            $('<button/>',{class:`btn btn_delete mX5 ${window.lesson.status != 'upcoming' && window.lesson.status != 'ongoing' ? 'none' : ''}`,text:text.lesson.cancelLesson,id:'lesson_cancel_confirm'}),
        )
    )
    $('.popupContainer').removeClass('none')
    setTimeout(()=>{$('#cancel_lesson_reason').focus()},300)
});
$('html,body').on('click','#lesson_cancel_confirm',function(e){
    e.stopImmediatePropagation();
    $('.cancel_lesson_reason_error').text('')
    if($('#cancel_lesson_reason').val() == ''){
        $('.cancel_lesson_reason_error').text(text.lesson.cancelReasonRequire)
    }
    $('.popupContainer').addClass('none')
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:`post`,
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            cancelLesson:true,
            lesson_id:window.history.state.lesson,
            cancel_reason:$("#cancel_lesson_reason").val(),
        },success:function(r){
            lesson_status_change_loading(false);
            if(r.state == 1){
                window.lesson.status = 'canceled';
                drawLesson_page()
            }
        }

    })
})
/////
$('html,body').on('click','.player_lesson_attend',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('btn_confirm')){$(this).addClass('btn_confirm');return;}
    showLoadingBar($('#loading'))
    let player_id = $(this).attr('player');
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"').attr('content'),
            player_lesson_attend:true,
            player_id:player_id,
            lesson_id:window.history.state.lesson,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.state == 1){
                window.lesson.players.find(item=>item.id == player_id).pivot.is_attend = 1;
                window.lesson.players.find(item=>item.id == player_id).pivot.attend_at = r.now;
                draw_lesson_players_table();
            }
        }
    })
})
$('html,body').on('click','.player_lesson_absent',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('btn_confirm')){$(this).addClass('btn_confirm');return;}
    showLoadingBar($('#loading'))
    let player_id = $(this).attr('player');
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"').attr('content'),
            player_lesson_absent:true,
            player_id:player_id,
            lesson_id:window.history.state.lesson,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.state == 1){
                window.lesson.players.find(item=>item.id == player_id).pivot.is_attend = 0;
                draw_lesson_players_table();
            }
        }
    })
})
$('html,body').on('click','.player_lesson_endLesson',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('btn_confirm')){$(this).addClass('btn_confirm');return;}
    showLoadingBar($('#loading'))
    let player_id = $(this).attr('player');
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"').attr('content'),
            player_lesson_endLesson:true,
            player_id:player_id,
            lesson_id:window.history.state.lesson,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.state == 1){
                window.lesson.players.find(item=>item.id == player_id).pivot.finish_at = r.now;
                draw_lesson_players_table();
            }
        }
    })
})
/////
