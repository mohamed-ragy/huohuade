drawPage_create_new_coach = function(){
    $('.pageContainerTree').text('').append(
        $('<span/>',{class:'pointer c_huohuade bold500 showPage',page:'coaches',text:text.menu.coaches}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:text.coaches.createNewCoach}),
    );

    $('.page').append(
        $('<input/>',{id:'create_new_coach_img_input',type:'file',hidden:true,accept:'image/png, image/jpeg, image/jpg, image/jpg, image/webp, image/bmp'}),
        $('<div/>',{class:'wfc'}).append(
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.loginName}),
                $('<input/>',{class:'inputText create_coach_input',id:'create_new_coach_loginName'}),
                $('<div/>',{class:'create_coach_error create_coach_loginName_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.password}),
                $('<input/>',{class:'inputText create_coach_input',id:'create_new_coach_password',type:'password'}),
                $('<div/>',{class:'create_coach_error create_coach_password_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.passwordConfirm}),
                $('<input/>',{class:'inputText create_coach_input',id:'create_new_coach_passwordConfirm',type:'password'}),
                $('<div/>',{class:'create_coach_error create_coach_passwordConfirm_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'line'}),
            $('<div/>',{class:'wfc m20 mB40 create_new_coach_img_container'}).append(
                $('<div/>',{class:'m10 fs09',text:text.main.profile_picture}),
                $('<div/>',{class:' row alnE jstfyS'}).append(
                    $('<img/>',{class:'mX10 h150 ofCover',id:'create_new_coach_img_preview',src:'../storage/imgs/profile_male.png'}),
                    $('<button/>',{class:'btn btn_cancel create_coach_input',id:'create_new_coach_img_btn',text:text.main.browse}),
                ),
                $('<div/>',{class:'mT10 create_coach_error create_coach_img_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_en}),
                $('<input/>',{class:'inputText create_coach_input',id:'create_new_coach_name_en'}),
                $('<div/>',{class:'create_coach_error create_coach_name_en_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_ch}),
                $('<input/>',{class:'inputText create_coach_input',id:'create_new_coach_name_ch'}),
                $('<div/>',{class:'create_coach_error create_coach_name_ch_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 zx20 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.gender}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect create_coach_input',id:'create_new_coach_gender',readonly:true}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.male,key:'male'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.female,key:'female'}),
                    )
                ),
                $('<div/>',{class:'create_coach_error create_coach_gender_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.phone}),
                $('<input/>',{class:'inputText create_coach_input',id:'create_new_coach_phone',type:'number'}),
                $('<div/>',{class:'create_coach_error create_coach_phone_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'line'}),
            $('<div/>',{class:'m20 zx10 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.job_title}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect create_coach_input',id:'create_new_coach_job_title',readonly:true}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_0,key:'0'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_1,key:'1'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_2,key:'2'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_3,key:'3'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_4,key:'4'}),
                    )
                ),
                $('<div/>',{class:'create_coach_error create_coach_job_title_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.salary}),
                $('<input/>',{type:'number',class:'inputText create_coach_input',id:'create_new_coach_salary'}),
                $('<div/>',{class:'create_coach_error create_coach_salary_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 zx5 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.salary_currency}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect create_coach_input',id:'create_new_coach_salary_currency',readonly:true}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.CNY,key:'CNY'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.USD,key:'USD'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.HKD,key:'HKD'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.EUR,key:'EUR'}),
                    )
                ),
                $('<div/>',{class:'create_coach_error create_coach_salary_currency_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'btn_container relative'}).append(
                $('<button/>',{class:'btn m10 create_coach_input',id:'create_coach_btn',text:text.main.create})
            ),

        )
    );
}
