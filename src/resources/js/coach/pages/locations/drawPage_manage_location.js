drawPage_manage_location = function(location_id,tab){
    let location = locations.find(item=>item.id == location_id);
    if(typeof(location) === 'undefined'){
        window.history.pushState({page:'locations'},'',`/${window.lang}/?page=locations`)
        showPage('locations')
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
            ),
            $('<div/>',{class:'pageTabArrow pageTabArrowRight'}).append($('<div/>',{class:'ico-arrow-next w15 h15'})),
        ),
        draw_edit_location_profile(location,tab),
        draw_location_contact_info(location,tab)

    );
}
draw_edit_location_profile=function(location,tab){

}
draw_location_contact_info=function(location,tab){

}
