
$('html,body').on('click','.removePlayerFromLesson',function(e){
    e.stopImmediatePropagation();
    if($(this).prop('disabled') == true){return}
    let lesson_id = $(this).attr('lesson');
    let player_id = $(this).attr('player');
    let player_tag = $(this).closest('.lessonTable_playerTag');
    showLoadingBar($('#loading'))
    $('.removePlayerFromLesson').prop('disabled',true)
    $.ajax({
        url:`../${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            removePlayerFromLesson:true,
            lesson_id:lesson_id,
            player_id:player_id,
        },success:function(r){
            $('.removePlayerFromLesson').prop('disabled',false)
            hideLoadingBar($('#loading'))
            if(r.stats == 1){
                player_tag.remove();
                for(const key in window.lessons){
                    if(window.lessons[key].id == lesson_id){
                        for(const key2 in window.lessons[key].players){
                            if(window.lessons[key].players[key2].id == player_id){
                                window.lessons[key].players.splice(key2,1)
                            }
                        }
                    }
                }
            }
        }
    })
})
