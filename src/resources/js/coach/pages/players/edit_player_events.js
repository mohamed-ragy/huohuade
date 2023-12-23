$('html,body').on('click','#edit_player_img_btn',function(e){
    e.stopImmediatePropagation();
    $('#edit_player_img_input').trigger('click')
})
$('html,body').on('change','#edit_player_img_input',function(e){
    e.stopImmediatePropagation();
    var image = document.getElementById('output');
    $('#edit_player_img_preview').attr('src',URL.createObjectURL(e.target.files[0]))
})
$('html,body').on('click','#edit_player_btn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.edit_player_error').text('')
    $('.edit_player_input').prop('disabled',true);

    let formData = new FormData();
    formData.append('edit_player', true);
    formData.append('player_id', window.history.state.player);
    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
    formData.append('profile_picture', $('#edit_player_img_input').prop('files')[0]);
    formData.append('name_en', $('#edit_player_name_en').val());
    formData.append('name_ch', $('#edit_player_name_ch').val());
    formData.append('gender', $('#edit_player_gender').attr('key'));
    formData.append('phone', $('#edit_new_player_phone').val());
    formData.append('birthdate_day', $('#edit_player_birthdate_day').val());
    formData.append('birthdate_month', $('#edit_player_birthdate_month').val());
    formData.append('birthdate_year', $('#edit_player_birthdate_year').val());
    $.ajax({
        url:`/${lang}/api/player`,
        type:'post',
        processData: false,
        contentType: false,
        cache: false,
        data:formData,
        success:function(r){
            $('.edit_player_input').prop('disabled',false);
            hideLoadingBar($('#loading'))
            if(r.status == 1){
                for(const key in window.players){
                    if(window.players[key].id == window.history.state.player){
                        window.players[key] = r.player;
                        showPage('manage_player')
                        setTimeout(()=>{$('.edit_player_success').text(text.main.dataSaved).removeClass('opacity0')},500)
                        setTimeout(()=>{$('.edit_player_success').addClass('opacity0')},5000)

                    }
                }

            }else if(r.status == 0){
                if(r.errors.profile_picture){
                    $('.edit_player_img_error').text(r.errors.profile_picture[0])
                }
                if(r.errors.name_en){
                    $('.edit_player_name_en_error').text(r.errors.name_en[0])
                }
                if(r.errors.name_ch){
                    $('.edit_player_name_ch_error').text(r.errors.name_ch[0])
                }
                if(r.errors.gender){
                    $('.edit_player_gender_error').text(r.errors.gender[0])
                }
                if(r.errors.phone){
                    $('.edit_player_phone_error').text(r.errors.phone[0])
                }
                if(r.errors.birthdate_day){
                    $('.create_player_birthdate_error').text(r.errors.birthdate_day[0])
                }
                if(r.errors.birthdate_month){
                    $('.create_player_birthdate_error').text(r.errors.birthdate_month[0])
                }
                if(r.errors.birthdate_year){
                    $('.create_player_birthdate_error').text(r.errors.birthdate_year[0])
                }
            }
        }
    });
});
