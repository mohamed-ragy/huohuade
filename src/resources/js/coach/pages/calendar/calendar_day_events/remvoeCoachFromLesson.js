$('html,body').on('click','.removeCoachFromLesson',function(e){
    e.stopImmediatePropagation();
    if($(this).prop('disabled') == true){return}
    let lesson_id = $(this).attr('lesson');
    let coach_id = $(this).attr('coach');
    let coach_tag = $(this).closest('.lessonTable_coachTag');
    showLoadingBar($('#loading'))
    $('.removeCoachFromLesson').prop('disabled',true)
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            removeCoachFromLesson:true,
            lesson_id:lesson_id,
            coach_id:coach_id,
        },success:function(r){
            $('.removeCoachFromLesson').prop('disabled',false)
            hideLoadingBar($('#loading'))
            if(r.stats == 1){
                if(window.history.state.page == 'lesson'){
                    window.lesson.activites.push(r.activity)
                    draw_lesson_timeline();
                    for(const key in window.lesson.coaches){
                        if(window.lesson.coaches[key].id == coach_id){
                            window.lesson.coaches.splice(key,1)
                        }
                    }
                    draw_lesson_coaches_table();
                }else if(window.history.state.page == 'calendar_day'){
                    coach_tag.remove();
                    for(const key in window.lessons){
                        if(window.lessons[key].id == lesson_id){
                            for(const key2 in window.lessons[key].coaches){
                                if(window.lessons[key].coaches[key2].id == coach_id){
                                    window.lessons[key].coaches.splice(key2,1)
                                }
                            }
                        }
                    }
                }
            }
        }
    })
})
