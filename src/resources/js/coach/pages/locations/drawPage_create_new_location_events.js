$('html,body').on('click','#create_new_location_img_btn',function(e){
    e.stopImmediatePropagation();
    $('#create_new_location_img_input').trigger('click')
})

$('html,body').on('change','#create_new_location_img_input',function(e){
    e.stopImmediatePropagation();
    var image = document.getElementById('output');
    $('#create_new_location_img_preview').attr('src',URL.createObjectURL(e.target.files[0]))
})

$('html,body').on('click','#create_location_btn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.create_location_error').text('')
    $('.create_location_input').prop('disabled',true);
    let formData = new FormData();
    formData.append('create_location', true);
    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
    formData.append('profile_picture', $('#create_new_location_img_input').prop('files')[0]);
    formData.append('name_en', $('#create_new_location_name_en').val());
    formData.append('name_ch', $('#create_new_location_name_ch').val());
    formData.append('lat', window.create_location_location_marker.getLatLng().lat);
    formData.append('lng', window.create_location_location_marker.getLatLng().lng);
    $.ajax({
        url:`/${lang}/api/location`,
        type:'post',
        processData: false,
        contentType: false,
        data:formData,
        success:function(r){
            console.log(r)
            $('.create_location_input').prop('disabled',false);
            hideLoadingBar($('#loading'));
            if(r.status == 1){
                r.location.profile_picture = r.location.profile_picture == null ? '../storage/imgs/profile_location.png' :
                `../storage/imgs/locations/${r.location.profile_picture}`;
                window.locations.push(r.location);
                showPage('locations')
            }else if(r.status == 0){
                if(r.errors.profile_picture){
                    $('.create_location_img_error').text(r.errors.profile_picture[0])
                }
                if(r.errors.name_en){
                    $('.create_location_name_en_error').text(r.errors.name_en[0])
                }
                if(r.errors.name_ch){
                    $('.create_location_name_ch_error').text(r.errors.name_ch[0])
                }
                if(r.errors.lat){
                    $('.create_location_location_error').text(r.errors.lat[0])
                }
                if(r.errors.lng){
                    $('.create_location_location_error').text(r.errors.lng[0])
                }
            }
        }
    });
});
