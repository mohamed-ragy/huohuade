$('html,body').on('click','.addCoachToLesson',function(e){
    e.stopImmediatePropagation();
    let lesson_id = $(this).attr('lesson');
    let coaches_container;
    $('.popupTitle').text(text.calendar.addCoachToLesson);
    $('.popupBody').addClass('w100p').text('').append(
        $('<div/>',{class:'btn_container m20'}).append(
            $('<button/>',{class:'btn',id:'addCoachToLesson_confirm',lesson:lesson_id,text:text.main.add})
        ),
        $('<input/>',{type:'text',class:'inputText addCoachToLessonFindCoach',placeholder:text.calendar.findCoach}),
        coaches_container = $('<div/>',{class:'m5 w100p-10 h300'}),
    )
    for(const key in coaches){
        let coach = coaches[key];
        if(!coach.is_deleted)
        console.log(window.lessons.find(item=>item.id == lesson_id).coaches.find(item2=>item2.id === coach.id))
        if(typeof(window.lessons.find(item=>item.id == lesson_id).coaches.find(item2=>item2.id === coach.id)) === 'undefined'){
            coaches_container.append(
                $('<div/>',{class:'row alnC jstfySB w100p pY5 addCoachToLessonCoachElem',coach_name:coach[`name_${window.lang}`]}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<img/>',{class:'h40 w40 ofCover br50p',src:coach.profile_picture}),
                        $('<div/>',{class:'fs09 mX10',text:coach[`name_${window.lang}`]})
                    ),
                    $('<div/>',{class:'h20 w20 pointer ico-check0 addCoachToLesson_check',coach:coach.id})
                )
            )
        }

    }
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.addCoachToLesson_check',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('ico-check1')){
        $(this).removeClass('ico-check1').addClass('ico-check0');
    }else if($(this).hasClass('ico-check0')){
        $(this).removeClass('ico-check0').addClass('ico-check1')
    }
})
$('html,body').on('input change','.addCoachToLessonFindCoach',function(e){
    e.stopImmediatePropagation();
    $('.addCoachToLessonCoachElem').each(function(){
        if(!$(this).attr('coach_name').toLowerCase().includes($('.addCoachToLessonFindCoach').val().toLowerCase())){
            $(this).addClass('none')
        }else{
            $(this).removeClass('none')
        }

    })
})
$('html,body').on('click','#addCoachToLesson_confirm',function(e){
    e.stopImmediatePropagation();
    let coachesIds = [];
    let lesson_id = $(this).attr('lesson');
    $('.addCoachToLesson_check').each(function(){
        if($(this).hasClass('ico-check1')){
            coachesIds.push($(this).attr('coach'))
        }
    })
    if(coachesIds.length == 0){return;}

    showLoadingBar($('#loading'))
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:`post`,
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            addCoachsToLesson:true,
            coachesIds:coachesIds,
            lesson_id:lesson_id,
        },success:function(r){
            hideLoadingBar($('#loading'))
            if(r.stats == 1){
                for(const key in r.coaches){
                    window.lessons.find(item=>item.id == lesson_id).coaches.push(r.coaches[key]);
                }
                draw_calendarDay_lesson_coaches($(`.lessonTableRow_coaches-${lesson_id}`),window.lessons.find(item=>item.id == lesson_id).coaches,lesson_id)
                $('.popupContainer').addClass('none')
            }

        }
    })
})
