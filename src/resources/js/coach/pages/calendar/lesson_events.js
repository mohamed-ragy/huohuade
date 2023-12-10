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
    let reason = $("#cancel_lesson_reason").val();
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:`post`,
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            cancelLesson:true,
            lesson_id:window.history.state.lesson,
            cancel_reason:reason,
        },success:function(r){
            lesson_status_change_loading(false);
            if(r.state == 1){
                window.lesson.status = 'canceled';
                window.lesson.cancelation_reason = reason;
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
$('html,body').on('click','.coach_lesson_attend',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('btn_confirm')){$(this).addClass('btn_confirm');return;}
    showLoadingBar($('#loading'))
    let coach_id = $(this).attr('coach');
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"').attr('content'),
            coach_lesson_attend:true,
            coach_id:coach_id,
            lesson_id:window.history.state.lesson,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.state == 1){
                window.lesson.coaches.find(item=>item.id == coach_id).pivot.is_attend = 1;
                window.lesson.coaches.find(item=>item.id == coach_id).pivot.attend_at = r.now;
                draw_lesson_coaches_table();
            }
        }
    })
})
$('html,body').on('click','.coach_lesson_absent',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('btn_confirm')){$(this).addClass('btn_confirm');return;}
    showLoadingBar($('#loading'))
    let coach_id = $(this).attr('coach');
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"').attr('content'),
            coach_lesson_absent:true,
            coach_id:coach_id,
            lesson_id:window.history.state.lesson,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.state == 1){
                window.lesson.coaches.find(item=>item.id == coach_id).pivot.is_attend = 0;
                draw_lesson_coaches_table();
            }
        }
    })
})
$('html,body').on('click','.coach_lesson_endLesson',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('btn_confirm')){$(this).addClass('btn_confirm');return;}
    showLoadingBar($('#loading'))
    let coach_id = $(this).attr('coach');
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"').attr('content'),
            coach_lesson_endLesson:true,
            coach_id:coach_id,
            lesson_id:window.history.state.lesson,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.state == 1){
                window.lesson.coaches.find(item=>item.id == coach_id).pivot.finish_at = r.now;
                draw_lesson_coaches_table();
            }
        }
    })
})
//
$('html,body').on('click','#lesson_note_postBtn',function(e){
    e.stopImmediatePropagation();
    if($('#lesson_note_post').val() == ''){alert('gg');}
    showLoadingBar($('#loading'))
    $('#lesson_note_postBtn').prop('disabled',true)
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            lesson_post_note:true,
            lesson_id:window.history.state.lesson,
            note:$('#lesson_note_post').val(),
        },success:function(r){
            hideLoadingBar($('#loading'))
            $('#lesson_note_postBtn').prop('disabled',false)
            if(r.state == 1){
                $('#lesson_note_post').val('')
                window.lesson.notes.push(r.note);
                // draw_lesson_notes();
                $('#lesson_notes_container').prepend(
                    draw_lesson_note(r.note),
                )
            }
        }
    })
})
//
$('html,body').on('click','.lesson_note_pin_toggle',function(e){
    e.stopImmediatePropagation();
    let is_pinned;
    let thisElem = $(this);
    if($(this).hasClass('ico-pinned')){
        is_pinned = 0;
    }else if($(this).hasClass('ico-un-pinned')){
        is_pinned = 1;
    }
    showLoadingBar($('#loading'))
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            pin_lesson_note:true,
            lesson_id:window.history.state.lesson,
            note_id:thisElem.attr('note'),
            is_pinned:is_pinned,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.state == 1){
                // thisElem.parent().remove();
                window.lesson.notes.find(item=>item._id == thisElem.attr('note')).is_pinned = is_pinned;
                if(is_pinned){
                    thisElem.parent().remove();
                    $('#lesson_notes_container_pinned').prepend(
                        draw_lesson_note(window.lesson.notes.find(item=>item._id == thisElem.attr('note'))),
                    )
                }else{
                    draw_lesson_notes();
                    // $('#lesson_notes_container').prepend(
                    //     draw_lesson_note(window.lesson.notes.find(item=>item._id == thisElem.attr('note'))),
                    // )
                }

            }
        }
    })
})
//
$('html,body').on('click','.lesson_timeLine',function(e){
    e.stopImmediatePropagation();
    console.log($(this).attr('lesson'))
});
//
