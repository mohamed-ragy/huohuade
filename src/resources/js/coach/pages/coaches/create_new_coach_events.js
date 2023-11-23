$('html,body').on('click','#create_new_coach_img_btn',function(e){
    e.stopImmediatePropagation();
    $('#create_new_coach_img_input').trigger('click')
})

$('html,body').on('change','#create_new_coach_img_input',function(e){
    e.stopImmediatePropagation();
    var image = document.getElementById('output');
    $('#create_new_coach_img_preview').attr('src',URL.createObjectURL(e.target.files[0]))
})

$('html,body').on('click','#create_coach_btn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.create_coach_error').text('')
    $('.create_coach_input').prop('disabled',true);
    let formData = new FormData();
    formData.append('create_coach', true);
    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
    formData.append('login_name', $('#create_new_coach_loginName').val());
    formData.append('password', $('#create_new_coach_password').val());
    formData.append('password_confirm', $('#create_new_coach_passwordConfirm').val());
    formData.append('profile_picture', $('#create_new_coach_img_input').prop('files')[0]);
    formData.append('name_en', $('#create_new_coach_name_en').val());
    formData.append('name_ch', $('#create_new_coach_name_ch').val());
    formData.append('gender', $('#create_new_coach_gender').attr('key'));
    formData.append('phone', $('#create_new_coach_phone').val());
    formData.append('job_title', $('#create_new_coach_job_title').attr('key'));
    formData.append('salary', $('#create_new_coach_salary').val());
    formData.append('salary_currency', $('#create_new_coach_salary_currency').attr('key'));

    // console.log(profile_picture)
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        processData: false,
        contentType: false,
        cache: false,
        data:formData,
        success:function(r){
            $('.create_coach_input').prop('disabled',false);
            hideLoadingBar($('#loading'))
            if(r.status == 1){
                window.coaches.push(r.coach);
                showPage('coaches')
                window.history.pushState({page:'coaches'},'',`/${window.lang}/?page=coaches`)
            }else if(r.status == 0){
                if(r.errors.login_name){
                    $('.create_coach_loginName_error').text(r.errors.login_name[0])
                }
                if(r.errors.password){
                    $('.create_coach_password_error').text(r.errors.password[0])
                }
                if(r.errors.password_confirm){
                    $('.create_coach_passwordConfirm_error').text(r.errors.password_confirm[0])
                }
                if(r.errors.profile_picture){
                    $('.create_coach_img_error').text(r.errors.profile_picture[0])
                }
                if(r.errors.name_en){
                    $('.create_coach_name_en_error').text(r.errors.name_en[0])
                }
                if(r.errors.name_ch){
                    $('.create_coach_name_ch_error').text(r.errors.name_ch[0])
                }
                if(r.errors.gender){
                    $('.create_coach_gender_error').text(r.errors.gender[0])
                }
                if(r.errors.phone){
                    $('.create_coach_phone_error').text(r.errors.phone[0])
                }
                if(r.errors.job_title){
                    $('.create_coach_job_title_error').text(r.errors.job_title[0])
                }
                if(r.errors.salary){
                    $('.create_coach_salary_error').text(r.errors.salary[0])
                }
                if(r.errors.salary_currency){
                    $('.create_coach_salary_currency_error').text(r.errors.salary_currency[0])
                }
            }
        }
    })
})
