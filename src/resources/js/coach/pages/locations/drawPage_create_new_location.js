drawPage_create_new_location = function(){
    $('.pageContainerTree').text('').append(
        $('<span/>',{class:'pointer c_huohuade bold500 showPage',page:'locations',text:text.menu.locations}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:text.locations.createNewLocation}),
    );
    $('.page').append(
        $('<input/>',{id:'create_new_location_img_input',type:'file',hidden:true,accept:'image/png, image/jpeg, image/jpg, image/jpg, image/webp, image/bmp'}),
        $('<div/>',{class:'wfc wxw100p'}).append(
            $('<div/>',{class:'wfc m20 mB40 create_new_location_img_container'}).append(
                $('<div/>',{class:'m10 fs09',text:text.main.profile_picture}),
                $('<div/>',{class:' row alnE jstfyS'}).append(
                    $('<img/>',{class:'mX10 h150 ofCover',id:'create_new_location_img_preview',src:'../storage/imgs/profile_location.png'}),
                    $('<button/>',{class:'btn btn_cancel create_location_input',id:'create_new_location_img_btn',text:text.main.browse}),
                ),
                $('<div/>',{class:'mT10 create_location_error create_location_img_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_en}),
                $('<input/>',{class:'inputText create_location_input',id:'create_new_location_name_en'}),
                $('<div/>',{class:'create_location_error create_location_name_en_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_ch}),
                $('<input/>',{class:'inputText create_location_input',id:'create_new_location_name_ch'}),
                $('<div/>',{class:'create_location_error create_location_name_ch_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'line'}),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.locations.locationOnMap}),
                $('<div/>',{id:'create_location_location',class:'locationMap'}),
                $('<div/>',{class:'create_location_error create_location_location_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'btn_container relative'}).append(
                $('<button/>',{class:'btn m10 create_location_input',id:'create_location_btn',text:text.main.create})
            ),
        )
    )
    draw_location_map('create_location_location',0,0)
}


//
