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
            $('<table/>',{id:'locationsTable'})
        )
    )

    for(const key in window.locations){
        let location = window.locations[key];
        $('#locationsTable').append(
            $('<tr/>',{class:'tableRow'}).append(
                $('<td/>',{}).append(
                    $('<img/>',{src:location.profile_picture,class:'locationTableImg'})
                ),
                $('<td/>',{class:'w100p'}).append(
                    $('<div/>',{class:'bold500',text:location[`name_${window.lang}`]})
                ),
                $('<td/>',{class:!window.accessibility.locations_manage ? 'none' : ''}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'ico-activity_logs mX10 w25 h25 pointer',tooltip:text.main.activities}),
                        $('<div/>',{location:location.id,class:'ico-settings mX10 w25 h25 pointer showPage',page:'manage_location',tooltip:text.main.manage}),
                        $('<div/>',{location:location.id,class:`delete_location ico-delete mX10 w25 h25 pointer`,tooltip:text.main.delete}),
                    )
                )
            )
        )
    }
}


//
