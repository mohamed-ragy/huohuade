$('html,body').on('click','#edit_coach_img_btn',function(e){
    e.stopImmediatePropagation();
    $('#edit_coach_img_input').trigger('click')
})

$('html,body').on('change','#edit_coach_img_input',function(e){
    e.stopImmediatePropagation();
    var image = document.getElementById('output');
    $('#edit_coach_img_preview').attr('src',URL.createObjectURL(e.target.files[0]))
})
$('html,body').on('click','#edit_coach_btn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.edit_coach_error').text('')
    $('.edit_coach_input').prop('disabled',true);

    let formData = new FormData();
    formData.append('edit_coach', true);
    formData.append('coach_id', window.history.state.coach);
    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
    formData.append('profile_picture', $('#edit_coach_img_input').prop('files')[0]);
    formData.append('name_en', $('#edit_coach_name_en').val());
    formData.append('name_ch', $('#edit_coach_name_ch').val());
    formData.append('gender', $('#edit_coach_gender').attr('key'));
    formData.append('job_title', $('#edit_coach_job_title').attr('key'));
    formData.append('salary', $('#edit_coach_salary').val());
    formData.append('salary_currency', $('#edit_coach_salary_currency').attr('key'));
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        processData: false,
        contentType: false,
        data:formData,
        success:function(r){
            console.log(r)
            $('.edit_coach_input').prop('disabled',false);
            hideLoadingBar($('#loading'))
            if(r.status == 1){
                r.coach.profile_picture = r.coach.profile_picture == null && r.coach.gender == 'male' ? '../storage/imgs/profile_male.png' :
                r.coach.profile_picture = r.coach.profile_picture == null && r.coach.gender == 'female' ? '../storage/imgs/profile_female.png' :
                `../storage/imgs/coaches/${r.coach.profile_picture}`;
                for(const key in window.coaches){
                    if(window.coaches[key].id == window.history.state.coach){
                        window.coaches[key] = r.coach;
                        drawPage_manage_coach(window.history.state.coach,'edit_coach_profile')
                        $('.edit_coach_success').text(text.main.dataSaved)
                    }
                }

            }else if(r.status == 0){
                if(r.errors.profile_picture){
                    $('.edit_coach_img_error').text(r.errors.profile_picture[0])
                }
                if(r.errors.name_en){
                    $('.edit_coach_name_en_error').text(r.errors.name_en[0])
                }
                if(r.errors.name_ch){
                    $('.edit_coach_name_ch_error').text(r.errors.name_ch[0])
                }
                if(r.errors.gender){
                    $('.edit_coach_gender_error').text(r.errors.gender[0])
                }
                if(r.errors.job_title){
                    $('.edit_coach_job_title_error').text(r.errors.job_title[0])
                }
                if(r.errors.salary){
                    $('.edit_coach_salary_error').text(r.errors.salary[0])
                }
                if(r.errors.salary_currency){
                    $('.edit_coach_salary_currency_error').text(r.errors.salary_currency[0])
                }
            }
        }
    });
});
///////////////////////////
$('html,body').on('click','#change_password_coach_btn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.change_password_coach_error').text('')
    $('.change_password_coach_input').prop('disabled',true);
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            change_coach_password:true,
            coach_id:window.history.state.coach,
            password:$('#change_password_coach_password').val(),
            password_confirm:$('#change_password_coach_passwordConfirm').val(),
        },success:function(r){
            $('.change_password_coach_input').prop('disabled',false);
            hideLoadingBar($('#loading'));
            $('#change_password_coach_password').val('')
            $('#change_password_coach_passwordConfirm').val('')
            if(r.status == 1){
                $('.change_password_coach_success').text(text.main.dataSaved)
            }else if(r.status == 0){
                if(r.errors.password){
                    $('.change_password_coach_password_error').text(r.errors.password[0])
                }
                if(r.errors.password_confirm){
                    $('.change_password_coach_passwordConfirm_error').text(r.errors.password_confirm[0])
                }
            }
        }

    });
});
/////////////////////////
$('html,body').on('click','.pageTab_coach_salary',function(e){
    e.stopImmediatePropagation();
    let coach = coaches.find(item=>item.id == window.history.state.coach);
    $('#coach_salaries_table').text('')
    showLoadingBar($('#loading'))
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            get_coach_salaries:true,
            coach_id:coach.id,
            skip:0,
        },success:function(r){
            r.count == 0 ? $('.coach_salaries_table_noResults').removeClass('none') : $('.coach_salaries_table_noResults').addClass('none');
            hideLoadingBar($('#loading'))
            setPagination($('.coach_salaries_table_pagination'),r.count,1);
            for(const key  in r.salaries){
                draw_coach_salary_row(r.salaries[key])
            }
        }
    })
})
$('html,body').on('click','.coach_salaries_table_pagination_next',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('pagination_arrow_disabled')){return;}
    $('.coach_salaries_table_pagination').find('.pagination_next').addClass('pagination_arrow_disabled')
    $('.coach_salaries_table_pagination').find('.pagination_prev').addClass('pagination_arrow_disabled')
    let coach = coaches.find(item=>item.id == window.history.state.coach);
    $('#coach_salaries_table').text('')
    showLoadingBar($('#loading'))
    $('.coach_salaries_table_pagination').attr('page',parseInt($('.coach_salaries_table_pagination').attr('page')) + 1)
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            get_coach_salaries:true,
            coach_id:coach.id,
            skip:parseInt(($('.coach_salaries_table_pagination').attr('page') - 1) * 10),
        },success:function(r){
            console.log(r)
            hideLoadingBar($('#loading'))
            setPagination($('.coach_salaries_table_pagination'),r.count,parseInt($('.coach_salaries_table_pagination').attr('page')));
            for(const key  in r.salaries){
                draw_coach_salary_row(r.salaries[key])
            }
        }
    })
})
$('html,body').on('click','.coach_salaries_table_pagination_prev',function(e){
    e.stopImmediatePropagation();
    if($(this).hasClass('pagination_arrow_disabled')){return;}
    $('.coach_salaries_table_pagination').find('.pagination_next').addClass('pagination_arrow_disabled')
    $('.coach_salaries_table_pagination').find('.pagination_prev').addClass('pagination_arrow_disabled')
    let coach = coaches.find(item=>item.id == window.history.state.coach);
    $('#coach_salaries_table').text('')
    showLoadingBar($('#loading'))
    $('.coach_salaries_table_pagination').attr('page',parseInt($('.coach_salaries_table_pagination').attr('page')) - 1)
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            get_coach_salaries:true,
            coach_id:coach.id,
            skip:parseInt(($('.coach_salaries_table_pagination').attr('page') - 1) * 10),
        },success:function(r){
            hideLoadingBar($('#loading'))
            setPagination($('.coach_salaries_table_pagination'),r.count,parseInt($('.coach_salaries_table_pagination').attr('page')));
            for(const key  in r.salaries){
                draw_coach_salary_row(r.salaries[key])
            }
        }
    })
})
//
$('html,body').on('click','.deleteCoachSalary',function(e){
    e.stopImmediatePropagation();
    $('.popupTitle').text(text.main.deleteConfirmation);
    $('.popupBody').text('').append(
        $('<div/>',{class:'column alnC jstfyC m10 p20 mB20 red_msg'}).append(
            $('<div/>',{class:'w50 h50 ico-warning'}),
            $('<div/>',{class:'c_red mT10 ',text:text.coaches.deleteCoachSalaryConfirmMsg}),
        ),
        $('<div/>',{class:'btn_container'}).append(
            $('<button/>',{class:'btn btn_cancel popupClose mX5',text:'Cancel'}),
            $('<button/>',{salary_id:$(this).attr('salary_id'),class:'btn btn_delete deleteCoachSalary_confirm mX5',text:'Delete'}),

        ),
        $('<div/>',{class:'loadingBar ',id:'deleteCoachSalaryLoadingBar'})
    )
    $('.popupContainer').removeClass('none')
})
$('html,body').on('click','.deleteCoachSalary_confirm',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#deleteCoachSalaryLoadingBar'))
    let salary_id = $(this).attr('salary_id');
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            delete_salary:true,
            coach_id:window.history.state.coach,
            salary_id:salary_id,
        },success:function(r){
            if(r.stats == 1){
                hideLoadingBar($('#deleteCoachSalaryLoadingBar'))
                $(`.coachSalaryRow[salary_id="${salary_id}"]`).remove();
                $('.popupContainer').addClass('none');
            }
        }
    })
})
//
$('html,body').on('click','#submit_coach_salary_confirmBtn',function(e){
    e.stopImmediatePropagation();
    showLoadingBar($('#loading'))
    $('.submit_coach_salary_error').text('')
    $('.submit_coach_salary_input').prop('disabled',true);
    let coach = coaches.find(item=>item.id == window.history.state.coach);
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            submit_coach_salary:true,
            coach_id:window.history.state.coach,
            salary:$('#submit_coach_salary_salary').val(),
            salary_currency:$('#submit_coach_salary_currency').attr('key'),
            description:$('#submit_coach_salary_description').val(),
        },success:function(r){
            $('.submit_coach_salary_input').prop('disabled',false);
            hideLoadingBar($('#loading'));
            $('#submit_coach_salary_error').text('')
            if(r.status == 1){
                $('#submit_coach_salary_salary').val(coach.salary)
                $('#submit_coach_salary_currency').val(text.coaches[coach.salary_currency]).attr('key',coach.salary_currency)
                $('#submit_coach_salary_description').val('')
                $('.pageTab[tab="coach_salary"]').trigger('click');
            }else if(r.status == 0){
                if(r.errors.salary){
                    $('.submit_coach_salary_salary_error').text(r.errors.salary[0])
                }
                if(r.errors.salary_currency){
                    $('.submit_coach_salary_currency_error').text(r.errors.salary_currency[0])
                }
            }
        }

    });
})

//
