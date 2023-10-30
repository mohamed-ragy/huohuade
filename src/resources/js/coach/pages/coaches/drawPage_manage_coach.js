drawPage_manage_coach = function(coach_id,tab){
    let coach = coaches.find(item=>item.id == coach_id);
    if(typeof(coach) === 'undefined'){
        window.history.pushState({page:'coaches'},'',`/${window.lang}/?page=coaches`)
        showPage('coaches')
    }
    $('.pageContainerTree').text('').append(
        $('<span/>',{class:'pointer c_huohuade bold500 showPage',page:'coaches',text:text.menu.coaches}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{class:'bold500',text:coach[`name_${window.lang}`]}),
    );
    $('.page').text('').append(
        $('<div/>',{class:'pageTabs'}).append(
            $('<div/>',{class:'pageTabArrow pageTabArrowLeft'}).append($('<div/>',{class:'ico-arrow-prev w15 h15'})),
            $('<div/>',{class:'pageTabsContainer'}).append(
                $('<div/>',{tab:'edit_coach_profile',class:`pageTab ${tab == 'edit_coach_profile' ? 'pageTab_selected' : ''}`,text:text.coaches.editProfile}),
                $('<div/>',{tab:'change_coach_password',class:`pageTab ${tab == 'change_coach_password' ? 'pageTab_selected' : ''}`,text:text.coaches.changePassword}),
                $('<div/>',{tab:'coach_salary',class:`pageTab_coach_salary pageTab ${tab == 'coach_salary' ? 'pageTab_selected' : ''}`,text:text.coaches.salary}),
            ),
            $('<div/>',{class:'pageTabArrow pageTabArrowRight'}).append($('<div/>',{class:'ico-arrow-next w15 h15'})),
        ),
        draw_edit_coach_profile(coach,tab),
        draw_change_coach_password(coach,tab),
        draw_coach_salaries(coach,tab),
        draw_submit_new_salary(coach,tab),
    )
    for(const key in coach.salaries){
        draw_coach_salary_row(coach.salaries[key])
    }
}

draw_edit_coach_profile = function(coach,tab){
    return $('<div/>',{class:`pageTabContainer ${tab == 'edit_coach_profile' ? 'pageTabContainer_selected' : ''}`,tab:'edit_coach_profile'}).append(
        $('<div/>',{class:'wfc'}).append(

            $('<input/>',{id:'edit_coach_img_input',type:'file',hidden:true,accept:'image/png, image/jpeg, image/jpg, image/jpg, image/webp, image/bmp'}),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.loginName}),
                $('<input/>',{class:'inputText edit_coach_input',id:'edit_coach_loginName',value:coach.login_name,readonly:true}),
                $('<div/>',{class:'edit_coach_error edit_coach_loginName_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'wfc m20 mB40 edit_coach_img_container'}).append(
                $('<div/>',{class:'m10 fs09',text:text.main.profile_picture}),
                $('<div/>',{class:' row alnE jstfyS'}).append(
                    $('<img/>',{class:'mX10 h150 ofCover',id:'edit_coach_img_preview',src:coach.profile_picture}),
                    $('<button/>',{class:'btn btn_cancel edit_coach_input',id:'edit_coach_img_btn',text:text.main.browse}),
                ),
                $('<div/>',{class:'mT10 edit_coach_error edit_coach_img_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'line'}),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_en}),
                $('<input/>',{class:'inputText edit_coach_input',id:'edit_coach_name_en',value:coach.name_en}),
                $('<div/>',{class:'edit_coach_error edit_coach_name_en_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.main.name_ch}),
                $('<input/>',{class:'inputText edit_coach_input',id:'edit_coach_name_ch',value:coach.name_ch}),
                $('<div/>',{class:'edit_coach_error edit_coach_name_ch_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 zx20 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.gender}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect edit_coach_input',id:'edit_coach_gender',readonly:true,value:text.coaches[coach.gender],key:coach.gender}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.male,key:'male'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.female,key:'female'}),
                    )
                ),
                $('<div/>',{class:'edit_coach_error edit_coach_gender_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'line'}),
            $('<div/>',{class:'m20 zx10 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.job_title}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect edit_coach_input',id:'edit_coach_job_title',readonly:true,key:coach.coach_level,value:text.coaches[`coach_${coach.coach_level}`]}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_0,key:'0'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_1,key:'1'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_2,key:'2'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_3,key:'3'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.coach_4,key:'4'}),
                    )
                ),
                $('<div/>',{class:'edit_coach_error edit_coach_job_title_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.salary}),
                $('<input/>',{type:'number',class:'inputText edit_coach_input',id:'edit_coach_salary',value:coach.salary}),
                $('<div/>',{class:'edit_coach_error edit_coach_salary_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 zx5 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.salary_currency}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect edit_coach_input',id:'edit_coach_salary_currency',readonly:true,key:coach.salary_currency,value:text.coaches[coach.salary_currency]}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.CNY,key:'CNY'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.USD,key:'USD'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.HKD,key:'HKD'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.EUR,key:'EUR'}),
                    )
                ),
                $('<div/>',{class:'edit_coach_error edit_coach_salary_currency_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'btn_container relative'}).append(
                $('<button/>',{class:'btn m10 edit_coach_input',id:'edit_coach_btn',text:text.main.save}),
                $('<div/>',{class:'edit_coach_success c_green mX10',text:''})
            ),
        )
    )
}
draw_change_coach_password = function(coach,tab){
    return $('<div/>',{class:`pageTabContainer ${tab == 'change_coach_password' ? 'pageTabContainer_selected' : ''}`,tab:'change_coach_password'}).append(
        $('<div/>',{class:'wfc'}).append(
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.newPassword}),
                $('<input/>',{class:'inputText change_password_coach_input',id:'change_password_coach_password',type:'password'}),
                $('<div/>',{class:'change_password_coach_error change_password_coach_password_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.passwordConfirm}),
                $('<input/>',{class:'inputText change_password_coach_input',id:'change_password_coach_passwordConfirm',type:'password'}),
                $('<div/>',{class:'change_password_coach_error change_password_coach_passwordConfirm_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'btn_container relative'}).append(
                $('<button/>',{class:'btn m10 edit_coach_input',id:'change_password_coach_btn',text:text.main.save}),
                $('<div/>',{class:'change_password_coach_success c_green mX10',text:''})
            ),
        )
    )
}
draw_coach_salaries = function(coach,tab){
    return $('<div/>',{class:` relative pageTabContainer ${tab == 'coach_salary' ? 'pageTabContainer_selected' : ''}`,tab:'coach_salary'}).append(
        $('<div/>',{class:'w100p-20 m10 row alnC jstfySB'}).append(
            $('<button/>',{class:'btn btn_cancel pageTab',tab:'submit_coach_salary',id:'addNewSalary_btn',text:text.coaches.addNewSalary}),
            $('<div/>',{class:'row alnC jstfyE p10 coach_salaries_table_pagination'}).append(
                $('<div/>',{class:'coach_salaries_table_pagination_prev pagination_prev btn_icon_20 mX5'}).append($('<div/>',{class:'ico-arrow-prev w20 h20 '})),
                $('<div/>',{class:'pagination_text mX5'}),
                $('<div/>',{class:'coach_salaries_table_pagination_next pagination_next btn_icon_20 mX5'}).append($('<div/>',{class:'ico-arrow-next w20 h20 '})),
            ),
        ),

        $('<table/>',{id:'coach_salaries_table',class:'pT10'}),
        $('<div/>',{class:'fs09 none coach_salaries_table_noResults',text:text.coaches.noSalaries})
    )
}
draw_coach_salary_row = function(salary){
    let date = new Date(salary.created_at * 1000)
    $('#coach_salaries_table').append(
        $('<tr/>',{class:'tableRow coachSalaryRow',salary_id:salary.id}).append(
            $('<td/>',{class:'vaT tnw fs08',text:salary.amount+' '+salary.currency}),
            $('<td/>',{class:'vaT tnw fs08',text:date.toLocaleString(window.lang,{ year: 'numeric', month: 'short', day: 'numeric',hour12 :false,timeZone:'Asia/Shanghai'})}),
            $('<td/>',{class:'vaT fs08',text:salary.description}),
            $('<td/>',{class:'vaT fs08 pointer deleteCoachSalary',tooltip:text.main.delete,salary_id:salary.id}).append($('<div/>',{class:'deleteCoachSalaryIcon ico-delete w15 h15'})),
        )
    )
}
//
draw_submit_new_salary = function(coach,tab){
    return $('<div/>',{class:'pageTabContainer relative',tab:'submit_coach_salary'}).append(
        $('<div/>',{class:'wfc relative'}).append(
            $('<div/>',{class:'m20 '}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.salary}),
                $('<input/>',{type:'number',class:'inputText submit_coach_salary_input',id:'submit_coach_salary_salary',value:coach.salary}),
                $('<div/>',{class:'submit_coach_salary_error submit_coach_salary_salary_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 zx5 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.salary_currency}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect submit_coach_salary_input',id:'submit_coach_salary_currency',readonly:true,value:text.coaches[coach.salary_currency],key:coach.salary_currency}),
                    $('<div/>',{class:'inputSelectList none'}).append(
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.CNY,key:'CNY'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.USD,key:'USD'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.HKD,key:'HKD'}),
                        $('<div/>',{class:'inputSelectListItem',text:text.coaches.EUR,key:'EUR'}),
                    )
                ),
                $('<div/>',{class:'submit_coach_salary_error submit_coach_salary_currency_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.coaches.description}),
                $('<textarea/>',{class:'textarea submit_coach_salary_input',id:'submit_coach_salary_description'}),
                // $('<div/>',{class:'submit_coach_salary_error submit_coach_salary_description_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'row alnC jstfyE p20 w100p-40 '}).append(
                $('<button/>',{class:'btn btn_cancel pageTab mX10',tab:'coach_salary',text:text.main.cancel}),
                $('<button/>',{class:'btn',id:'submit_coach_salary_confirmBtn',text:text.main.save})
            )
        )
    );
}
//
