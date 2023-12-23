$('html,body').on('click','.contactInfo_location',function(e){
    e.stopImmediatePropagation();
    let location = locations.find(item=>item.id == $(this).attr('location'));
    console.log(location)
    $('.popupTitle').text(location[`name_${lang}`]);
    $('.popupBody').text('')
    if(location.contact_info.length == 0){
        $('.popupBody').append(
            $('<div/>',{class:'m10',text:text.locations.noContactInfo})
        );
    }
    for(const key in location.contact_info){
        let contact = location.contact_info[key];
        $('.popupBody').append(
            $('<div/>',{class:`line ${key == 0 ? 'none' : null}`}),
            $('<div/>',{class:'mB10 bold500',text:contact[`name_${lang}`]}),
            $('<div/>',{class:'row alnC jstfyS call pointer mX10 mB10',phone:contact.phone}).append(
                $('<div/>',{class:'h15 w15 ico-phone mie-3'}),
                $('<div/>',{text:contact.phone})
            ),
            $('<div/>',{class:'row alnC jstfyS pointer mX10'}).append(
                $('<div/>',{class:'h15 w15 ico-wechat mie-3'}),
                $('<div/>',{text:contact.wechat_id,class:'copy',copy:contact.wechat_id})
            ),

        )
    }
    $('.popupContainer').removeClass('none')
})
//
$('html,body').on('click','.soft_delete_location',function(e){
    e.stopImmediatePropagation();
    let location = locations.find(item=>item.id == $(this).attr('location'));
    $('.popupTitle').text(text.main.deleteConfirmation);
    $('.popupBody').text('').append(
        $('<div/>',{class:'column alnC jstfyC m10 p20 mB40 red_msg'}).append(
            $('<div/>',{class:'w50 h50 ico-warning'}),
            $('<div/>',{class:'c_red mT10 ',text:text.locations.deleteLocationConfirmMsg.replace(':name:',location[`name_${lang}`])})
        ),
        $('<div/>',{class:'btn_container'}).append(
            $('<button/>',{class:'btn btn_cancel popupClose mX5',text:'Cancel'}),
            $('<button/>',{location:location.id,class:'btn btn_delete soft_delete_location_confirm mX5',text:text.main.delete}),

        ),
        $('<div/>',{class:'loadingBar ',id:'deleteLocationLoadingBar'})
    )
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.soft_delete_location_confirm',function(e){
    e.stopImmediatePropagation();
    let location = locations.find(item=>item.id == $(this).attr('location'));
    showLoadingBar($('#deleteLocationLoadingBar'))
    $.ajax({
        url:`/${lang}/api/location`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            soft_delete_location:true,
            location_id:location.id,
        },success:function(r){
            if(r.stats == 1){
                hideLoadingBar($('#deleteLocationLoadingBar'))
                window.locations.find(item=>item.id == location.id).is_deleted = true;
                showPage('locations');
                $('.popupContainer').addClass('none');
            }
        }
    })
})
//
$('html,body').on('click','.recover_location',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#deleteLocationLoadingBar'))
    let location = locations.find(item=>item.id == $(this).attr('location'));
    $.ajax({
        url:`/${lang}/api/location`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            recover_location:true,
            location_id:location.id,
        },success:function(r){
            if(r.stats == 1){
                hideLoadingBar($('#deleteLocationLoadingBar'))
                window.locations.find(item=>item.id == location.id).is_deleted = false;
                showPage('locations');
                $('.popupContainer').addClass('none');
            }
        }
    })
})
//
// $('html,body').on('click','.delete_location',function(e){
//     e.stopImmediatePropagation();
//     let location = locations.find(item=>item.id == $(this).attr('location'));
//     $('.popupTitle').text(text.main.deleteConfirmation);
//     $('.popupBody').text('').append(
//         $('<div/>',{class:'column alnC jstfyC m10 p20 mB40 red_msg'}).append(
//             $('<div/>',{class:'w50 h50 ico-warning'}),
//             $('<div/>',{class:'c_red mT10 ',html:text.locations.deleteLocationConfirmMsg2.replace(':name:',location[`name_${lang}`])}),
//             $('<div/>',{class:'c_red mT10 bold600',html:text.locations.deleteLocationConfirmMsg3})
//         ),
//         $('<div/>',{class:'btn_container'}).append(
//             $('<button/>',{class:'btn btn_cancel popupClose mX5',text:'Cancel'}),
//             $('<button/>',{location:location.id,class:'btn btn_delete delete_location_confirm mX5',text:text.main.delete}),

//         ),
//         $('<div/>',{class:'loadingBar ',id:'deleteLocationLoadingBar'})
//     )
//     $('.popupContainer').removeClass('none')
// })

// $('html,body').on('click','.delete_location_confirm',function(e){
//     e.stopImmediatePropagation();
//     let location = locations.find(item=>item.id == $(this).attr('location'));
//     showLoadingBar($('#deleteLocationLoadingBar'))
//     $.ajax({
//         url:`/${lang}/api/location`,
//         type:'post',
//         data:{
//             _token:$('meta[name="csrf-token"]').attr('content'),
//             delete_location:true,
//             location_id:location.id,
//         },success:function(r){
//             if(r.stats == 1){
//                 hideLoadingBar($('#deleteLocationLoadingBar'))
//                 for(const key in window.locations){
//                     if(window.locations[key].id == location.id){
//                         window.locations.splice(key,1);
//                         showPage('locations');
//                         $('.popupContainer').addClass('none');
//                     }
//                 }
//             }
//         }
//     })
// })
//

$('html,body').on('click','.deleted_locations_toggle',function(e){
    e.stopImmediatePropagation();
    if($(this).children().first().hasClass('ico-check0')){
        $(this).children().first().removeClass('ico-check0').addClass('ico-check1');
        $('.deleted_location').removeClass('none')
    }else if($(this).children().first().hasClass('ico-check1')){
        $(this).children().first().removeClass('ico-check1').addClass('ico-check0');
        $('.deleted_location').addClass('none')
    }
})

//
