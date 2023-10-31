$('html,body').on('click','.delete_coach',function(e){
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
