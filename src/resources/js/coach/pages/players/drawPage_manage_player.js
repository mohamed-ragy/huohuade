drawPage_manage_player = function(player_id){
    let player = players.find(item=>item.id == player_id);
    if(typeof(player) === 'undefined'){
        window.history.pushState({page:'players'},'',`/${window.lang}/?page=players`)
        showPage('players')
        return;
    }
    $('.pageContainerTree').text('').append(
        $('<span/>',{class:'pointer c_huohuade bold500 showPage',page:'players',text:text.menu.players}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:player[`name_${window.lang}`]}),
    );
    $('.page').text('').append(
        $('<div/>',{class:'wfc'}).append(
            $('<input/>',{id:'edit_player_img_input',type:'file',hidden:true,accept:'image/png, image/jpeg, image/jpg, image/jpg, image/webp, image/bmp'}),
            $('<div/>',{class:'wfc m20 mB40 edit_player_img_container'}).append(
                $('<div/>',{class:'m10 fs09',text:text.main.profile_picture}),
                $('<div/>',{class:' row alnE jstfyS'}).append(
                    $('<img/>',{class:'mX10 h150 ofCover',id:'edit_player_img_preview',src:player.profile_picture}),
                    $('<button/>',{class:'btn btn_cancel edit_player_input',id:'edit_player_img_btn',text:text.main.browse}),
                ),
                $('<div/>',{class:'mT10 edit_player_error edit_player_img_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_en}),
                $('<input/>',{class:'inputText edit_player_input',id:'edit_player_name_en',value:player.name_en}),
                $('<div/>',{class:'edit_player_error edit_player_name_en_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_ch}),
                $('<input/>',{class:'inputText edit_player_input',id:'edit_player_name_ch',value:player.name_ch}),
                $('<div/>',{class:'edit_player_error edit_player_name_ch_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 zx20 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.gender}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect edit_player_input',id:'edit_player_gender',readonly:true,value:text.main[player.gender],key:player.gender}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.main.male,key:'male'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.main.female,key:'female'}),
                    )
                ),
                $('<div/>',{class:'edit_player_error edit_player_gender_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.birthdate}),
                $('<div/>',{class:'row alnC jstyfC'}).append(
                    $('<input/>',{type:'number',placeholder:'DD',class:'inputText edit_player_input create_new_player_birthdate_day',id:'edit_player_birthdate_day',value:player.birthdate.split('-')[2]}),
                    $('<input/>',{type:'number',placeholder:'MM',class:'inputText edit_player_input create_new_player_birthdate_month',id:'edit_player_birthdate_month',value:player.birthdate.split('-')[1]}),
                    $('<input/>',{type:'number',placeholder:'YYYY',class:'inputText edit_player_input create_new_player_birthdate_year',id:'edit_player_birthdate_year',value:player.birthdate.split('-')[0]}),
                ),
                $('<div/>',{class:'create_player_error create_player_birthdate_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.phone}),
                $('<input/>',{class:'inputText edit_player_input',id:'edit_new_player_phone',type:'number',value:player.phone}),
                $('<div/>',{class:'edit_player_error edit_player_phone_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'btn_container relative'}).append(
                $('<button/>',{class:'btn m10 edit_player_input',id:'edit_player_btn',text:text.main.save}),
                $('<div/>',{class:'edit_player_success opacity0 td200 c_green mX10',text:''})
            ),
        )
    )
}
