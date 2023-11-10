$('html,body').on('click','.delete_coach',function(e){
    e.stopImmediatePropagation();
    let coach = coaches.find(item=>item.id == $(this).attr('coach'))
    $('.popupTitle').text(text.main.deleteConfirmation);
    $('.popupBody').text('').append(
        $('<div/>',{class:'column alnC jstfyC m10 p20 mB40 red_msg'}).append(
            $('<div/>',{class:'w50 h50 ico-warning'}),
            $('<div/>',{class:'c_red mT10 ',html:text.coaches.deleteCoachConfirmMsg2.replace(':name:',coach[`name_${lang}`])}),
            $('<div/>',{class:'c_red mT10 bold600',html:text.coaches.deleteCoachConfirmMsg3})
        ),
        $('<div/>',{class:'btn_container'}).append(
            $('<button/>',{class:'btn btn_cancel popupClose mX5',text:'Cancel'}),
            $('<button/>',{coach:coach.id,class:'btn btn_delete delete_coach_confirm mX5',text:text.main.delete}),

        ),
        $('<div/>',{class:'loadingBar ',id:'deleteCoachLoadingBar'})
    )
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.delete_coach_confirm',function(e){
    e.stopImmediatePropagation();
    let coach = coaches.find(item=>item.id == $(this).attr('coach'))
    showLoadingBar($('#deleteCoachLoadingBar'))
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            delete_coach:true,
            coach_id:coach.id,
        },success:function(r){
            if(r.stats == 1){
                hideLoadingBar($('#deleteCoachLoadingBar'))
                for(const key in window.coaches){
                    if(window.coaches[key].id == coach.id){
                        window.coaches.splice(key,1);
                        showPage('coaches');
                        $('.popupContainer').addClass('none');
                    }
                }
            }
        }
    })
})
//
$('html,body').on('click','.recover_coach',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#deleteLocationLoadingBar'))
    let coach = coaches.find(item=>item.id == $(this).attr('coach'))
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            recover_coach:true,
            coach_id:coach.id,
        },success:function(r){
            if(r.stats == 1){
                hideLoadingBar($('#deleteCoachLoadingBar'))
                window.coaches.find(item=>item.id == coach.id).is_deleted = false;
                showPage('coaches');
                $('.popupContainer').addClass('none');
            }
        }
    })
})
//
$('html,body').on('click','.soft_delete_coach',function(e){
    e.stopImmediatePropagation();
    let coach = coaches.find(item=>item.id == $(this).attr('coach'))
    $('.popupTitle').text(text.main.deleteConfirmation);
    $('.popupBody').text('').append(
        $('<div/>',{class:'column alnC jstfyC m10 p20 mB40 red_msg'}).append(
            $('<div/>',{class:'w50 h50 ico-warning'}),
            $('<div/>',{class:'c_red mT10 ',text:text.coaches.deleteCoachConfirmMsg.replace(':name:',coach[`name_${lang}`])})
        ),
        $('<div/>',{class:'btn_container'}).append(
            $('<button/>',{class:'btn btn_cancel popupClose mX5',text:'Cancel'}),
            $('<button/>',{coach:coach.id,class:'btn btn_delete soft_delete_coach_confirm mX5',text:text.main.delete}),

        ),
        $('<div/>',{class:'loadingBar ',id:'deleteCoachLoadingBar'})
    )
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.soft_delete_coach_confirm',function(e){
    e.stopImmediatePropagation();
    let coach = coaches.find(item=>item.id == $(this).attr('coach'))
    showLoadingBar($('#deleteCoachLoadingBar'))
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            soft_delete_coach:true,
            coach_id:coach.id,
        },success:function(r){
            if(r.stats == 1){
                hideLoadingBar($('#deleteCoachLoadingBar'))
                window.coaches.find(item=>item.id == coach.id).is_deleted = true;
                showPage('coaches');
                $('.popupContainer').addClass('none');
            }
        }
    })
})
//
$('html,body').on('click','.deleted_coaches_toggle',function(e){
    e.stopImmediatePropagation();
    if($(this).children().first().hasClass('ico-check0')){
        $(this).children().first().removeClass('ico-check0').addClass('ico-check1');
        $('.deleted_coaches').removeClass('none')
    }else if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().removeClass('ico-check1').addClass('ico-check0');
        $('.deleted_coaches').addClass('none')
    }
})

//
