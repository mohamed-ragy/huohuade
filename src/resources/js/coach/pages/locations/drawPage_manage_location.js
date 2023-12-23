drawPage_manage_location = function(location_id,tab){
    let location = locations.find(item=>item.id == location_id);
    if(typeof(location) === 'undefined'){
        window.history.pushState({page:'locations'},'',`/${window.lang}/?page=locations`)
        showPage('locations')
        return;
    }
    $('.pageContainerTree').text('').append(
        $('<span/>',{class:'pointer c_huohuade bold500 showPage',page:'locations',text:text.menu.locations}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:location[`name_${window.lang}`]}),
    );
    $('.page').text('').append(
        $('<div/>',{class:'pageTabs'}).append(
            $('<div/>',{class:'pageTabArrow pageTabArrowLeft'}).append($('<div/>',{class:'ico-arrow-prev w15 h15'})),
            $('<div/>',{class:'pageTabsContainer'}).append(
                $('<div/>',{tab:'edit_location_profile',class:`pageTab ${tab == 'edit_location_profile' ? 'pageTab_selected' : ''}`,text:text.main.editProfile}),
                $('<div/>',{tab:'location_contact_info',class:`pageTab ${tab == 'location_contact_info' ? 'pageTab_selected' : ''}`,text:text.locations.contactInfo}),
                $('<div/>',{tab:'location_courts',class:`pageTab ${tab == 'location_courts' ? 'pageTab_selected' : ''}`,text:text.locations.courts}),
            ),
            $('<div/>',{class:'pageTabArrow pageTabArrowRight'}).append($('<div/>',{class:'ico-arrow-next w15 h15'})),
        ),
        draw_edit_location_profile(location,tab),
        draw_edit_location_courts(location,tab),
        draw_location_contact_info(location,tab),
        draw_create_location_contact_info(location,tab),

    );
    draw_location_map('edit_location_location',location.lat,location.lng)
    draw_location_contact_info_table(location);
    draw_location_courts_table(location);

}
draw_edit_location_profile=function(location,tab){
    return $('<div/>',{class:`pageTabContainer ${tab == 'edit_location_profile' ? 'pageTabContainer_selected' : ''}`,tab:'edit_location_profile'}).append(
        $('<input/>',{id:'edit_location_img_input',type:'file',hidden:true,accept:'image/png, image/jpeg, image/jpg, image/jpg, image/webp, image/bmp'}),
        $('<div/>',{class:'wfc wxw100p'}).append(
            $('<div/>',{class:'wfc m20 mB40 edit_location_img_container'}).append(
                $('<div/>',{class:'m10 fs09',text:text.main.profile_picture}),
                $('<div/>',{class:' row alnE jstfyS'}).append(
                    $('<img/>',{class:'mX10 h150 ofCover',id:'edit_location_img_preview',src:location.profile_picture}),
                    $('<button/>',{class:'btn btn_cancel edit_location_input',id:'edit_location_img_btn',text:text.main.browse}),
                ),
                $('<div/>',{class:'mT10 edit_location_error edit_location_img_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_en}),
                $('<input/>',{class:'inputText edit_location_input',id:'edit_location_name_en',value:location.name_en}),
                $('<div/>',{class:'edit_location_error edit_location_name_en_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_ch}),
                $('<input/>',{class:'inputText edit_location_input',id:'edit_location_name_ch',value:location.name_ch}),
                $('<div/>',{class:'edit_location_error edit_location_name_ch_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'line'}),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.locations.locationOnMap}),
                $('<div/>',{id:'edit_location_location',class:'locationMap'}),
                $('<div/>',{class:'edit_location_error edit_location_location_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'btn_container relative'}).append(
                $('<button/>',{class:'btn m10 edit_location_input',id:'edit_location_btn',text:text.main.save}),
                $('<div/>',{class:'edit_location_success opacity0 td200 c_green mX10',text:''})
            ),
        )
    )

}
draw_edit_location_courts=function(location,tab){
    return $('<div/>',{class:`pageTabContainer ${tab == 'location_courts' ? 'pageTabContainer_selected' : ''}`,tab:'location_courts'}).append(
        $('<div/>',{class:'wfc mnw300'}).append(
            $('<div/>',{id:'location_courts_table',class:'m10 column alnS jstfyS'}),
            $('<div/>',{class:`fs09 location_courts_table_noResults ${location.courts.length > 0 ? 'none' : null}`,text:text.locations.noCourts}),
            $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn m5 btn_cancel',id:'location_courts_cancel',text:text.main.cancel}),
                $('<button/>',{class:'btn m5 ',id:'location_courts_save',text:text.main.save}),
            ),
            $('<div/>',{class:'c_green none location_courts_saved mxw300 tae fs09',text:text.locations.courtsSaved})
        )
    )
}
draw_location_courts_table = function(location){
    $('.location_courts_saved').addClass('none')
    $('#location_courts_table').text('')
    for(const key in location.courts){
        let court = location.courts[key];
        $('#location_courts_table').append(
            $('<div/>',{class:'row alnC jstfyS '}).append(
                $('<input/>',{class:'inputText edit_location_court input_60',value:court,maxlength:8}),
                $('<div/>',{class:'ico-close pointer w10 h10 location_court_delete'})
            )
        );
    }
    $('#location_courts_table').append(
        $('<div/>',{class:'m10 pointer location_court_add h25 w25 ico-add',tooltip:text.locations.addNewCourt})
    )
}
draw_location_contact_info=function(location,tab){
    return $('<div/>',{class:`pageTabContainer ${tab == 'location_contact_info' ? 'pageTabContainer_selected' : ''}`,tab:'location_contact_info'}).append(
        $('<div/>',{class:'w100p'}).append(
            $('<button/>',{class:'btn m10 btn_cancel pageTab',tab:'create_location_contact_info',id:'create_location_contact_info_btn',text:text.locations.createNewContactInfo}),
            $('<table/>',{id:'location_contact_info_table',class:'m10'}),
            $('<div/>',{class:`fs09 location_contact_info_table_noResults ${location.contact_info.length > 0 ? 'none' : null}`,text:text.locations.noContactInfo})
        )
    )
}
draw_location_contact_info_table = function(location){
    $('#location_contact_info_table').text('').append(
        $('<tr/>',{class:'tableRow_head'}).append(
            $('<td/>',{class:'tnw fs08',text:text.main.name}),
            $('<td/>',{class:'tnw fs08',text:text.main.phone}),
            $('<td/>',{class:'tnw fs08',text:text.main.wechatId})
        )
    );
    location.contact_info.length == 0 ? $('.location_contact_info_table_noResults').removeClass('none') : $('.location_contact_info_table_noResults').addClass('none');
    location.contact_info.length == 0 ? $('#location_contact_info_table').addClass('none') : $('#location_contact_info_table').removeClass('none');
    for(const key in location.contact_info){
        drawLocationContactInfoRow(location.contact_info[key]);
    }
}
drawLocationContactInfoRow=function(contact){
    $('#location_contact_info_table').append(
        $('<tr/>',{class:'tableRow locationContactInfoRow',contact_id:contact.id}).append(
            $('<td/>',{class:'w33033p tnw',text:contact[`name_${window.lang}`]}),
            $('<td/>',{class:'w33033p tnw call pointer',phone:contact.phone,text:contact.phone}),
            $('<td/>',{class:'w33033p tnw copy pointer',text:contact.wechat_id,copy:contact.wechat_id}),
            $('<td/>',{class:'vaT fs08 pointer deleteLocationContactInfo',tooltip:text.main.delete,contact_id:contact.id,contact_name:contact[`name_${window.lang}`]}).append($('<div/>',{class:'deleteCoachSalaryIcon ico-delete w15 h15'})),
        )
    )
}

draw_create_location_contact_info=function(location,tab){
    return $('<div/>',{class:'pageTabContainer relative',tab:'create_location_contact_info'}).append(
        $('<div/>',{class:'wfc relative'}).append(
            $('<div/>',{class:'m20 '}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_en}),
                $('<input/>',{type:'text',class:'inputText create_location_contact_info_input',id:'create_location_contact_info_name_en'}),
                $('<div/>',{class:'create_location_contact_info_error create_location_contact_info_name_en_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 '}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_ch}),
                $('<input/>',{type:'text',class:'inputText create_location_contact_info_input',id:'create_location_contact_info_name_ch'}),
                $('<div/>',{class:'create_location_contact_info_error create_location_contact_info_name_ch_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 '}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.phone}),
                $('<input/>',{type:'number',class:'inputText create_location_contact_info_input',id:'create_location_contact_info_phone'}),
                $('<div/>',{class:'create_location_contact_info_error create_location_contact_info_phone_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 '}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.wechatId}),
                $('<input/>',{type:'text',class:'inputText create_location_contact_info_input',id:'create_location_contact_info_wechatId'}),
                $('<div/>',{class:'create_location_contact_info_error create_location_contact_info_wechatId_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn m10',id:'create_location_contact_info_confirmBtn',text:text.main.save})
            )
        )
    )
}

//
