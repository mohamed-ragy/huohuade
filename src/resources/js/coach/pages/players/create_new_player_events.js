$('html,body').on('click','#create_new_player_img_btn',function(e){
    e.stopImmediatePropagation();
    $('#create_new_player_img_input').trigger('click')
})

$('html,body').on('change','#create_new_player_img_input',function(e){
    e.stopImmediatePropagation();
    var image = document.getElementById('output');
    $('#create_new_player_img_preview').attr('src',URL.createObjectURL(e.target.files[0]))
})
$('html,body').on('click','#create_player_btn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.create_player_error').text('')
    $('.create_player_input').prop('disabled',true);
    let formData = new FormData();
    formData.append('create_player', true);
    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
    formData.append('profile_picture', $('#create_new_player_img_input').prop('files')[0]);
    formData.append('name_en', $('#create_new_player_name_en').val());
    formData.append('name_ch', $('#create_new_player_name_ch').val());
    formData.append('gender', $('#create_new_player_gender').attr('key'));
    formData.append('phone', $('#create_new_player_phone').val());
    formData.append('birthdate_day', $('#create_new_player_birthdate_day').val());
    formData.append('birthdate_month', $('#create_new_player_birthdate_month').val());
    formData.append('birthdate_year', $('#create_new_player_birthdate_year').val());
    $.ajax({
        url:`/${lang}/api/player`,
        type:'post',
        processData: false,
        contentType: false,
        cache: false,
        data:formData,
        success:function(r){
            $('.create_player_input').prop('disabled',false);
            hideLoadingBar($('#loading'))
            if(r.status == 1){
                window.players.push(r.player);
                showPage('players')
                window.history.pushState({page:'players'},'',`/${window.lang}/?page=players`)
            }else if(r.status == 0){
                if(r.errors.profile_picture){
                    $('.create_player_img_error').text(r.errors.profile_picture[0])
                }
                if(r.errors.name_en){
                    $('.create_player_name_en_error').text(r.errors.name_en[0])
                }
                if(r.errors.name_ch){
                    $('.create_player_name_ch_error').text(r.errors.name_ch[0])
                }
                if(r.errors.gender){
                    $('.create_player_gender_error').text(r.errors.gender[0])
                }
                if(r.errors.phone){
                    $('.create_player_phone_error').text(r.errors.phone[0])
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
    })
})
