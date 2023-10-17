drawPage_create_new_coach = function(){
    $('.pageContainerTree').text('').append(
        $('<a/>',{class:'showPage',page:'coaches',tab:'coaches',text:text.menu.coaches}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:text.coaches.createNewCoach}),
    );

    $('#page').append(
        create_new_coach_form(),
        $('<input/>',{class:'create_new_coach_img_input',type:'file',hidden:true}),
    );

    $('#page_m').append(
        create_new_coach_form()
    );
}

create_new_coach_form = function(){
    return $('<div/>',{class:'wfc'}).append(
        $('<div/>',{class:'m20'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.loginName}),
            $('<input/>',{class:'inputText create_new_coach_loginName',}),
            $('<div/>',{class:'create_coach_error create_coach_loginName_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'m20'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.password}),
            $('<input/>',{class:'inputText create_new_coach_password',type:'password'}),
            $('<div/>',{class:'create_coach_error create_coach_password_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'m20'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.passwordConfirm}),
            $('<input/>',{class:'inputText create_new_coach_passwordConfirm',type:'password'}),
            $('<div/>',{class:'create_coach_error create_coach_passwordConfirm_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'line'}),
        $('<div/>',{class:'wfc m20 mB40 create_new_coach_img_container'}).append(
            $('<div/>',{class:'m10 fs09',text:text.coaches.profile_picture}),
            $('<div/>',{class:' row alnE jstfyS'}).append(
                $('<img/>',{class:'mX10 h150 ofCover create_new_coach_img_preview',src:'../storage/imgs/profile_male.png'}),
                $('<button/>',{class:'btn btn_cancel create_new_coach_img_btn',text:text.main.browse}),
            ),
            $('<div/>',{class:'create_coach_error create_coach_img_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'m20'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.name_en}),
            $('<input/>',{class:'inputText create_new_coach_name_en'}),
            $('<div/>',{class:'create_coach_error create_coach_name_en_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'m20'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.name_ch}),
            $('<input/>',{class:'inputText create_new_coach_name_ch'}),
            $('<div/>',{class:'create_coach_error create_coach_name_ch_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'m20 zx20 relative'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.gender}),
            $('<div/>',{class:'inputSelectContainer'}).append(
                $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                $('<input/>',{class:'inputText inputSelect create_new_coach_gender',readonly:true}),
                $('<div/>',{class:'inputSelectList none'}).append(
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.male,key:text.coaches.male}),
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.female,key:text.coaches.female}),
                )
            ),
            $('<div/>',{class:'create_coach_error create_coach_gender_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'line'}),
        $('<div/>',{class:'m20 zx10 relative'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.job_title}),
            $('<div/>',{class:'inputSelectContainer'}).append(
                $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                $('<input/>',{class:'inputText inputSelect create_new_coach_job_title',readonly:true}),
                $('<div/>',{class:'inputSelectList none'}).append(
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_0,key:'0'}),
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_1,key:'1'}),
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_2,key:'2'}),
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_3,key:'3'}),
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_4,key:'4'}),
                )
            ),
            $('<div/>',{class:'create_coach_error create_coach_job_title_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'m20'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.salary}),
            $('<input/>',{type:'number',class:'inputText create_new_coach_salary'}),
            $('<div/>',{class:'create_coach_error create_coach_salary_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'m20 relative'}).append(
            $('<div/>',{class:'mX10 fs09',text:text.coaches.salary_currency}),
            $('<div/>',{class:'inputSelectContainer'}).append(
                $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                $('<input/>',{class:'inputText inputSelect create_new_coach_salary_currency',readonly:true}),
                $('<div/>',{class:'inputSelectList none'}).append(
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.RMB,key:'RMB'}),
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.USD,key:'USD'}),
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.HKD,key:'HKD'}),
                    $('<div/>',{class:'inputSelectListItem',text:text.coaches.EUR,key:'EUR'}),
                )
            ),
            $('<div/>',{class:'create_coach_error create_coach_salary_currency_error fs09 mX5 c_red',text:''})
        ),
        $('<div/>',{class:'btn_container'}).append(
            $('<button/>',{class:'btn m10 create_coach_btn',text:text.main.create})
        )
    )
}
