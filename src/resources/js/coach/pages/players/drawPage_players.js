drawPage_players = function(){
    $('.pageContainerTree').text('').append(
        $('<div/>',{class:'bold500',text:text.menu.players})
    );
    $('.page').text('').append(
        $('<div/>',{class:''}).append(
            $('<div/>',{class:`w100p column alnS jstfyS ${!window.accessibility.players_manage ? 'none' : ''}`}).append(
                $('<div/>',{class:'btn_container'}).append(
                    $('<button/>',{class:'showPage btn btn_cancel',page:'create_new_player',text:text.players.createNewPlayer})
                )
            ),
            $('<div/>',{class:`row alnC jstfyS pointer mY20 mX10 deleted_players_toggle ${!window.accessibility.players_manage ? 'none' : ''}`}).append(
                $('<span/>',{class:'ico-check0 h15 w15 mie-5'}),
                $('<span/>',{class:'fs08',text:text.players.seeDeletedplyaers})
            ),
            $('<table/>',{id:'playersTable'}),

        )
    )
    for(const key in window.players){
        let player = window.players[key];
        $('#playersTable').append(
            $('<tr/>',{class:`tableRow ${player.is_deleted ? 'deleted_players none' : ''}`}).append(
                $('<td/>',{}).append(
                    $('<img/>',{src:player.profile_picture,class:'playerTableImg'})
                ),
                $('<td/>',{class:'w100p'}).append(
                    $('<div/>',{class:`bold500 ${player.is_deleted ? 'lthrow' : '' }`,text:player[`name_${window.lang}`]}),
                ),
                $('<td/>',{class:!window.accessibility.players_manage ? 'none' : ''}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<a/>',{class:`${player.is_deleted ? 'none' : ''} ico-phone mX10 w25 h25 pointer call`,phone:player.phone,tooltip:text.main.call,}),
                        $('<div/>',{player:player.id,class:`${player.is_deleted ? 'none' : ''} ico-activity_logs mX10 w25 h25 pointer`,tooltip:text.main.activities}),
                        $('<div/>',{player:player.id,class:`${player.is_deleted ? 'none' : ''} ico-settings mX10 w25 h25 pointer showPage`,page:'manage_player',tooltip:text.main.manage}),
                        $('<div/>',{player:player.id,class:`${player.is_deleted ? 'none' : ''} soft_delete_player ico-delete mX10 w25 h25 pointer`,tooltip:text.main.delete}),
                        $('<div/>',{player:player.id,class:`${!player.is_deleted ? 'none' : ''} recover_player ico-recover mX10 w25 h25 pointer`,tooltip:text.main.recover}),
                        // $('<div/>',{player:player.id,class:`${!player.is_deleted ? 'none' : ''} delete_player ico-delete mX10 w25 h25 pointer`,tooltip:`<span class="c_red">${text.main.deletePermanently}</span>`}),
                    )
                )
            )
        )
    }

}
