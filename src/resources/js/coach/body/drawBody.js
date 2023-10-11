drawbody = function(){
    $('body').append(
        $('<div/>',{class:'row alnS jstfyS w100p h100p'}).append(
            $('<div/>',{class:'shrink0'}).append(
                $('<div/>',{class:'menu_container menu_container_expanded'}).append(
                    $('<div/>',{class:'row alnC jstfyS mB20'}).append(
                        $('<div/>',{class:'menu_icon btn_icon_25'}).append($('<div/>',{class:'menu_icon_img'})),
                        $('<div/>',{class:'row alnC jstfyS'}).append(
                            $('<img/>',{src:`../storage/imgs/logo.jpeg`,class:'menu_logo'}),
                            $('<div/>',{class:'menu_huohuade',text:window.text.main.huohuade})
                        ),
                    ),
                    $('<div/>',{class:'row alnC jstfyS mB30'}).append(
                        $('<img/>',{src:`../storage/imgs/coaches/${window.coach.profile_picture}`,class:'menu_coach_img'}),
                        $('<div/>',{class:''}).append(
                            $('<div/>',{class:'menu_coach_name',text:window.coach[`name_${window.lang}`]}),
                            $('<div/>',{class:'menu_coach_jobtitle',text:window.coach[`job_title_${window.lang}`]}),
                        )
                    ),
                    $('<div/>',{class:'menu_elem menu_elem_selected'}).append(
                        $('<div/>',{class:'menu_elem_img menu_elem_img_calendar'}),
                        $('<div/>',{text:text.menu.calendar,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:'menu_elem'}).append(
                        $('<div/>',{class:'menu_elem_img menu_elem_img_coach'}),
                        $('<div/>',{text:text.menu.coaches,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:'menu_elem'}).append(
                        $('<div/>',{class:'menu_elem_img menu_elem_img_location'}),
                        $('<div/>',{text:text.menu.locations,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:'menu_elem'}).append(
                        $('<div/>',{class:'menu_elem_img menu_elem_img_player'}),
                        $('<div/>',{text:text.menu.players,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:'menu_elem'}).append(
                        $('<div/>',{class:'menu_elem_img menu_elem_img_insights'}),
                        $('<div/>',{text:text.menu.insights,class:'menu_elem_txt'})
                    ),
                )
            ),
            $('<div/',{id:'body',class:'grow2 shrink0',style:'background-color:red'}),
        )
    )

}
