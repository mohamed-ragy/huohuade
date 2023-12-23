$('html,body').on('click','.deleted_players_toggle',function(e){
    e.stopImmediatePropagation();
    if($(this).children().first().hasClass('ico-check0')){
        $(this).children().first().removeClass('ico-check0').addClass('ico-check1');
        $('.deleted_players').removeClass('none')
    }else if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().removeClass('ico-check1').addClass('ico-check0');
        $('.deleted_players').addClass('none')
    }
})
//
$('html,body').on('click','.soft_delete_player',function(e){
    e.stopImmediatePropagation();
    let player = players.find(item=>item.id == $(this).attr('player'))
    $('.popupTitle').text(text.main.deleteConfirmation);
    $('.popupBody').text('').append(
        $('<div/>',{class:'column alnC jstfyC m10 p20 mB40 red_msg'}).append(
            $('<div/>',{class:'w50 h50 ico-warning'}),
            $('<div/>',{class:'c_red mT10 ',text:text.players.deletePlayerConfirmMsg.replace(':name:',player[`name_${lang}`])})
        ),
        $('<div/>',{class:'btn_container'}).append(
            $('<button/>',{class:'btn btn_cancel popupClose mX5',text:'Cancel'}),
            $('<button/>',{player:player.id,class:'btn btn_delete soft_delete_player_confirm mX5',text:text.main.delete}),

        ),
        $('<div/>',{class:'loadingBar ',id:'deletePlayerLoadingBar'})
    )
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.soft_delete_player_confirm',function(e){
    e.stopImmediatePropagation();
    let player = players.find(item=>item.id == $(this).attr('player'))
    showLoadingBar($('#loading'))
    $.ajax({
        url:`/${lang}/api/player`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            soft_delete_player:true,
            player_id:player.id,
        },success:function(r){
            if(r.stats == 1){
                hideLoadingBar($('#loading'))
                window.players.find(item=>item.id == player.id).is_deleted = true;
                showPage('players');
                $('.popupContainer').addClass('none');
            }
        }
    })
})
//
$('html,body').on('click','.recover_player',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    let player = players.find(item=>item.id == $(this).attr('player'))
    $.ajax({
        url:`/${lang}/api/player`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            recover_player:true,
            player_id:player.id,
        },success:function(r){
            if(r.stats == 1){
                hideLoadingBar($('#loading'))
                window.players.find(item=>item.id == player.id).is_deleted = false;
                showPage('players');
                $('.popupContainer').addClass('none');
            }
        }
    })
})
//
