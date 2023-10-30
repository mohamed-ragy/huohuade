drawbody = function(){
    $('#container').text('').append(
        $('<div/>',{class:'menu_header_m'}).append(
            $('<div/>',{class:'row alnC jstfyS'}).append(
                $('<img/>',{src:`../storage/imgs/logo.jpeg`,class:'w30 mX10'}),
                $('<div/>',{class:'fs102 bold500 tnw',text:window.text.main.huohuade})
            ),
            $('<div/>',{class:'menu_icon_m btn_icon_30'}).append($('<div/>',{class:'menu_icon_img ico-menu'})),
        ),
        $('<div/>',{class:'menu_container_m'}).append(
            $('<div/>',{class:'row wrap alnC jstfySB mB20'}).append(
                $('<div/>',{class:'row alnC jstfyS grow1 mie-40'}).append(
                    $('<img/>',{src:window.coach.profile_picture,class:'menu_coach_img'}),
                    $('<div/>',{class:''}).append(
                        $('<div/>',{class:'menu_coach_name_m',text:window.coach[`name_${window.lang}`]}),
                        $('<div/>',{class:'menu_coach_jobtitle_m',text:window.text.coaches[`coach_${window.coach.coach_level}`]}),
                    )
                ),
                $('<div/>',{class:'row alnC jstfyE grow1'}).append(
                    $('<div/>',{class:`${window.lang == 'en' ? 'ico-china switch_lang_ch' : 'ico-usa switch_lang_en'} w20 h20 pointer`,tooltip:text.main[window.lang == 'en' ? 'ch' : 'en']}),
                    $('<div/>',{class:'ico-logout coach_logout w20 h20 pointer mX10',tooltip:text.main.logout}),
                ),
            ),
            $('<div/>',{class:'showPage menu_elem_m menu_elem_m_selected',page:'calendar',tab:'calendar'}).append(
                $('<div/>',{class:'menu_elem_img ico-calendar'}),
                $('<div/>',{text:text.menu.calendar,class:'menu_elem_txt_m'})
            ),
            $('<div/>',{class:`showPage menu_elem_m ${!accessibility.coaches_see ? 'none' : ''}`,page:'coaches',tab:'coaches'}).append(
                $('<div/>',{class:'menu_elem_img ico-coach'}),
                $('<div/>',{text:text.menu.coaches,class:'menu_elem_txt_m'})
            ),
            $('<div/>',{class:'showPage menu_elem_m',page:'locations',tab:'locations'}).append(
                $('<div/>',{class:'menu_elem_img ico-location'}),
                $('<div/>',{text:text.menu.locations,class:'menu_elem_txt_m'})
            ),
            $('<div/>',{class:'showPage menu_elem_m',page:'players',tab:'players'}).append(
                $('<div/>',{class:'menu_elem_img ico-player'}),
                $('<div/>',{text:text.menu.players,class:'menu_elem_txt_m'})
            ),
            $('<div/>',{class:'showPage menu_elem_m',page:'insights',tab:'insights'}).append(
                $('<div/>',{class:'menu_elem_img ico-insights'}),
                $('<div/>',{text:text.menu.insights,class:'menu_elem_txt_m'})
            ),
            $('<div/>',{class:'showPage menu_elem_m',page:'activity_logs',tab:'activity_logs'}).append(
                $('<div/>',{class:'menu_elem_img ico-activity_logs'}),
                $('<div/>',{text:text.menu.activity_logs,class:'menu_elem_txt_m'})
            ),
        ),
        $('<div/>',{id:'body',class:'row alnS jstfyS w100p h100p'}).append(

            $('<div/>',{class:'shrink0'}).append(
                $('<div/>',{class:'menu_container menu_container_expanded'}).append(
                    $('<div/>',{class:'row alnC jstfyS mB20 ltr'}).append(
                        $('<div/>',{class:'menu_icon btn_icon_30'}).append($('<div/>',{class:'menu_icon_img ico-menu'})),
                        $('<div/>',{class:'row alnC jstfyS'}).append(
                            $('<img/>',{src:`../storage/imgs/logo.jpeg`,class:'menu_logo'}),
                            $('<div/>',{class:'menu_huohuade',text:window.text.main.huohuade})
                        ),
                    ),
                    $('<div/>',{class:'row alnC jstfyS mB30 ltr'}).append(
                        $('<img/>',{src:window.coach.profile_picture,class:'menu_coach_img'}),
                        $('<div/>',{class:''}).append(
                            $('<div/>',{class:'menu_coach_name',text:window.coach[`name_${window.lang}`]}),
                            $('<div/>',{class:'menu_coach_jobtitle',text:window.text.coaches[`coach_${window.coach.coach_level}`]}),
                        )
                    ),
                    $('<div/>',{class:`showPage menu_elem menu_elem_selected`,page:'calendar',tab:'calendar'}).append(
                        $('<div/>',{tooltip:text.menu.calendar,class:'menu_elem_img ico-calendar'}),
                        $('<div/>',{text:text.menu.calendar,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:`showPage menu_elem ${!accessibility.coaches_see ? 'none' : ''}`,page:'coaches',tab:'coaches'}).append(
                        $('<div/>',{tooltip:text.menu.coaches,class:'menu_elem_img ico-coach'}),
                        $('<div/>',{text:text.menu.coaches,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:`showPage menu_elem ${!accessibility.locations_see ? 'none' : ''}`,page:'locations',tab:'locations'}).append(
                        $('<div/>',{tooltip:text.menu.locations,class:'menu_elem_img ico-location'}),
                        $('<div/>',{text:text.menu.locations,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:'showPage menu_elem',page:'players',tab:'players'}).append(
                        $('<div/>',{tooltip:text.menu.players,class:'menu_elem_img ico-player'}),
                        $('<div/>',{text:text.menu.players,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:'showPage menu_elem',page:'insights',tab:'insights'}).append(
                        $('<div/>',{tooltip:text.menu.insights,class:'menu_elem_img ico-insights'}),
                        $('<div/>',{text:text.menu.insights,class:'menu_elem_txt'})
                    ),
                    $('<div/>',{class:'showPage menu_elem',page:'activity_logs',tab:'activity_logs'}).append(
                        $('<div/>',{tooltip:text.menu.activity_logs,class:'menu_elem_img ico-activity_logs'}),
                        $('<div/>',{text:text.menu.activity_logs,class:'menu_elem_txt'})
                    ),
                )
            ),
            $('<div/>',{id:'pageContainer',class:' '}).append(
                $('<div/>',{class:'pageContainerHead'}).append(
                    $('<div/>',{class:'pageContainerTree'}),
                    $('<div/>',{class:'pageHeaderIcons row alnC jstfyE mX10 grow1'}).append(
                        $('<div/>',{class:`${window.lang == 'en' ? 'ico-china switch_lang_ch' : 'ico-usa switch_lang_en'} pageHeaderIcon`,tooltip:text.main[window.lang == 'en' ? 'ch' : 'en']}),
                        $('<div/>',{class:'ico-notifications pageHeaderIcon',tooltip:text.main.notifications}),
                        $('<div/>',{class:'ico-logout coach_logout pageHeaderIcon',tooltip:text.main.logout}),
                    )
                ),
                $('<div/>',{class:'page'})
            ),
        ),
    )
}

