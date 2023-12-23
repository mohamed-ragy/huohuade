drawPage_create_new_player = function(){
    $('.pageContainerTree').text('').append(
        $('<span/>',{class:'pointer c_huohuade bold500 showPage',page:'players',text:text.menu.players}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:text.players.createNewPlayer}),
    );
    $('.page').append(
        $('<input/>',{id:'create_new_player_img_input',type:'file',hidden:true,accept:'image/png, image/jpeg, image/jpg, image/jpg, image/webp, image/bmp'}),
        $('<div/>',{class:'wfc'}).append(
            $('<div/>',{class:'wfc m20 mB40 create_new_player_img_container'}).append(
                $('<div/>',{class:'m10 fs09',text:text.main.profile_picture}),
                $('<div/>',{class:' row alnE jstfyS'}).append(
                    $('<img/>',{class:'mX10 h150 ofCover',id:'create_new_player_img_preview',src:'../storage/imgs/profile_male.png'}),
                    $('<button/>',{class:'btn btn_cancel create_player_input',id:'create_new_player_img_btn',text:text.main.browse}),
                ),
                $('<div/>',{class:'mT10 create_player_error create_player_img_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_en}),
                $('<input/>',{class:'inputText create_player_input',id:'create_new_player_name_en'}),
                $('<div/>',{class:'create_player_error create_player_name_en_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_ch}),
                $('<input/>',{class:'inputText create_player_input',id:'create_new_player_name_ch'}),
                $('<div/>',{class:'create_player_error create_player_name_ch_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 zx20 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.gender}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect create_player_input',id:'create_new_player_gender',readonly:true}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.main.male,key:'male'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.main.female,key:'female'}),
                    )
                ),
                $('<div/>',{class:'create_player_error create_player_gender_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.birthdate}),
                $('<div/>',{class:'row alnC jstyfC'}).append(
                    $('<input/>',{type:'number',placeholder:'DD',class:'inputText create_player_input create_new_player_birthdate_day',id:'create_new_player_birthdate_day'}),
                    $('<input/>',{type:'number',placeholder:'MM',class:'inputText create_player_input create_new_player_birthdate_month',id:'create_new_player_birthdate_month'}),
                    $('<input/>',{type:'number',placeholder:'YYYY',class:'inputText create_player_input create_new_player_birthdate_year',id:'create_new_player_birthdate_year'}),
                ),
                $('<div/>',{class:'create_player_error create_player_birthdate_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.phone}),
                $('<input/>',{class:'inputText create_player_input',id:'create_new_player_phone',type:'number'}),
                $('<div/>',{class:'create_player_error create_player_phone_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'btn_container relative'}).append(
                $('<button/>',{class:'btn m10 create_player_input',id:'create_player_btn',text:text.main.create})
            ),
        )
    )
}
