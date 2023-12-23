drawPage_locations = function(){
    $('.pageContainerTree').text('').append(
        $('<div/>',{class:'bold500',text:text.menu.locations})
    )
    $('.page').text('').append(
        $('<div/>',{class:''}).append(
            $('<div/>',{class:`w100p column alnS jstfyS ${!window.accessibility.locations_manage ? 'none' : ''}`}).append(
                $('<div/>',{class:'btn_container'}).append(
                    $('<button/>',{class:'showPage btn btn_cancel',page:'create_new_location',text:text.locations.createNewLocation})
                )
            ),
            $('<div/>',{class:`row alnC jstfyS pointer mY20 mX10 deleted_locations_toggle ${!window.accessibility.locations_manage ? 'none' : ''}`}).append(
                $('<span/>',{class:'ico-check0 h15 w15 mie-5'}),
                $('<span/>',{class:'fs08',text:text.locations.seeDeletedLocations})
            ),
            $('<table/>',{id:'locationsTable'}),
        )
    )

    for(const key in window.locations){
        let location = window.locations[key];
        $('#locationsTable').append(
            $('<tr/>',{class:`tableRow ${location.is_deleted ? 'deleted_location none' : ''}`}).append(
                $('<td/>',{}).append(
                    $('<img/>',{src:location.profile_picture,class:'locationTableImg'})
                ),
                $('<td/>',{class:'w100p'}).append(
                    $('<div/>',{class:`bold500 ${location.is_deleted ? 'lthrow' : '' }`,text:location[`name_${window.lang}`]})
                ),
                $('<td/>',{class:`${!window.accessibility.locations_manage ? 'none' : ''}`}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{location:location.id,class:`${location.is_deleted ? 'none' : ''} ico-phone mX10 w25 h25 pointer contactInfo_location`,tooltip:text.locations.contactInfo}),
                        $('<div/>',{location:location.id,class:`${location.is_deleted ? 'none' : ''} ico-activity_logs mX10 w25 h25 pointer`,tooltip:text.main.activities}),
                        $('<div/>',{location:location.id,class:`${location.is_deleted ? 'none' : ''} ico-settings mX10 w25 h25 pointer showPage`,page:'manage_location',tooltip:text.main.manage}),
                        $('<div/>',{location:location.id,class:`${location.is_deleted ? 'none' : ''} soft_delete_location ico-delete mX10 w25 h25 pointer`,tooltip:text.main.delete}),
                        $('<div/>',{location:location.id,class:`${!location.is_deleted ? 'none' : ''} recover_location ico-recover mX10 w25 h25 pointer`,tooltip:text.main.recover}),
                        // $('<div/>',{location:location.id,class:`${!location.is_deleted ? 'none' : ''} delete_location ico-delete mX10 w25 h25 pointer`,tooltip:`<span class="c_red">${text.main.deletePermanently}</span>`}),
                    )
                )
            )
        )
    }
}


//
