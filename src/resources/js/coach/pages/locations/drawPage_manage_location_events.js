$('html,body').on('click','#edit_location_img_btn',function(e){
    e.stopImmediatePropagation();
    $('#edit_location_img_input').trigger('click')
})

$('html,body').on('change','#edit_location_img_input',function(e){
    e.stopImmediatePropagation();
    var image = document.getElementById('output');
    $('#edit_location_img_preview').attr('src',URL.createObjectURL(e.target.files[0]))
})

$('html,body').on('click','#edit_location_btn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.edit_location_error').text('')
    $('.edit_location_input').prop('disabled',true);
    let formData = new FormData();
    formData.append('edit_location', true);
    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
    formData.append('location_id', window.history.state.location);
    formData.append('profile_picture', $('#edit_location_img_input').prop('files')[0]);
    formData.append('name_en', $('#edit_location_name_en').val());
    formData.append('name_ch', $('#edit_location_name_ch').val());
    formData.append('lat', window.edit_location_location_marker.getLatLng().lat);
    formData.append('lng', window.edit_location_location_marker.getLatLng().lng);
    $.ajax({
        url:`/${lang}/api/location`,
        type:'post',
        processData: false,
        contentType: false,
        data:formData,
        success:function(r){
            console.log(r)
            $('.edit_location_input').prop('disabled',false);
            hideLoadingBar($('#loading'));
            if(r.status == 1){
                r.location.profile_picture = r.location.profile_picture == null ? '../storage/imgs/profile_location.png' :
                `../storage/imgs/locations/${r.location.profile_picture}`;
                for(const key in locations){
                    if(window.locations[key].id == window.history.state.location){
                        window.locations[key] = r.location;
                        showPage('manage_location')
                        setTimeout(()=>{$('.edit_location_success').text(text.main.dataSaved).removeClass('opacity0')},500)
                        setTimeout(()=>{$('.edit_location_success').addClass('opacity0')},5000)
                    }
                }
            }else if(r.status == 0){
                if(r.errors.profile_picture){
                    $('.edit_location_img_error').text(r.errors.profile_picture[0])
                }
                if(r.errors.name_en){
                    $('.edit_location_name_en_error').text(r.errors.name_en[0])
                }
                if(r.errors.name_ch){
                    $('.edit_location_name_ch_error').text(r.errors.name_ch[0])
                }
                if(r.errors.lat){
                    $('.edit_location_location_error').text(r.errors.lat[0])
                }
                if(r.errors.lng){
                    $('.edit_location_location_error').text(r.errors.lng[0])
                }
            }
        }
    });
});


$('html,body').on('click','#create_location_contact_info_confirmBtn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.create_location_contact_info_error').text('')
    $('.create_location_contact_info_input').prop('disabled',true);
    let location = locations.find(item=>item.id == window.history.state.location);
    $.ajax({
        url:`/${lang}/api/location`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            create_location_contact_info:true,
            location_id:window.history.state.location,
            name_en:$('#create_location_contact_info_name_en').val(),
            name_ch:$('#create_location_contact_info_name_ch').val(),
            phone:$('#create_location_contact_info_phone').val(),
            wechat_id:$('#create_location_contact_info_wechatId').val(),
        },success:function(r){
            $('.create_location_contact_info_input').prop('disabled',false);
            hideLoadingBar($('#loading'));
            $('#create_location_contact_info_error').text('')
            if(r.status == 1){
                $('#create_location_contact_info_name_en').val('');
                $('#create_location_contact_info_name_ch').val('');
                $('#create_location_contact_info_phone').val('');
                $('#create_location_contact_info_wechatId').val('');
                for(const key in window.locations){
                    if(window.locations[key].id == window.history.state.location){
                        window.locations[key].contact_info = r.contact_info;
                        draw_location_contact_info_table(window.locations[key])
                    }
                }
                $('.pageTab[tab="location_contact_info"]').trigger('click');
            }else if(r.status == 0){
                if(r.errors.name_en){
                    $('.create_location_contact_info_name_en_error').text(r.errors.name_en[0])
                }
                if(r.errors.name_ch){
                    $('.create_location_contact_info_name_ch_error').text(r.errors.name_ch[0])
                }
                if(r.errors.phone){
                    $('.create_location_contact_info_phone_error').text(r.errors.phone[0])
                }
                if(r.errors.wechat_id){
                    $('.create_location_contact_info_wechatId_error').text(r.errors.wechat_id[0])
                }
            }
        }
    });
})
//
$('html,body').on('click','.deleteLocationContactInfo',function(e){
    e.stopImmediatePropagation();
    $('.popupTitle').text(text.main.deleteConfirmation);
    $('.popupBody').text('').append(
        $('<div/>',{class:'column alnC jstfyC m10 p20 mB20 red_msg'}).append(
            $('<div/>',{class:'w50 h50 ico-warning'}),
            $('<div/>',{class:'c_red mT10 ',text:text.locations.deletelocationContactConfirmMsg.replace(':contact:',$(this).attr('contact_name'))}),
        ),
        $('<div/>',{class:'btn_container'}).append(
            $('<button/>',{class:'btn btn_cancel popupClose mX5',text:'Cancel'}),
            $('<button/>',{contact_id:$(this).attr('contact_id'),class:'btn btn_delete deleteLocationContactInfo_confirm mX5',text:'Delete'}),

        ),
        $('<div/>',{class:'loadingBar ',id:'deleteLocationContactInfoLoadingBar'})
    )
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.deleteLocationContactInfo_confirm',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#deleteLocationContactInfoLoadingBar'))
    let contact_id = $(this).attr('contact_id')
    $.ajax({
        url:`/${lang}/api/location`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            delete_contact:true,
            loaction_id:window.history.state.location,
            contact_id:contact_id,
        },success:function(r){
            if(r.status == 1){
                hideLoadingBar($('#deleteLocationContactInfoLoadingBar'))
                // $(`.locationContactInfoRow[contact_id="${contact_id}"]`).remove();
                for(const key in window.locations){
                    if(window.locations[key].id == window.history.state.location){
                        window.locations[key].contact_info = r.contact_info;
                        draw_location_contact_info_table(window.locations[key])
                    }
                }
                $('.popupContainer').addClass('none');
                // $('.pageTab[tab="location_contact_info"]').trigger('click');
            }
        }
    })
})
//
