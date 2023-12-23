drawPage_coaches = function(){
    $('.pageContainerTree').text('').append(
        $('<div/>',{class:'bold500',text:text.menu.coaches})
    )
    $('.page').text('').append(
        $('<div/>',{class:''}).append(
            $('<div/>',{class:`w100p column alnS jstfyS ${!window.accessibility.coaches_manage ? 'none' : ''}`}).append(
                $('<div/>',{class:'btn_container'}).append(
                    $('<button/>',{class:'showPage btn btn_cancel',page:'create_new_coach',text:text.coaches.createNewCoach})
                )
            ),
            $('<div/>',{class:`row alnC jstfyS pointer mY20 mX10 deleted_coaches_toggle ${!window.accessibility.coaches_manage ? 'none' : ''}`}).append(
                $('<span/>',{class:'ico-check0 h15 w15 mie-5'}),
                $('<span/>',{class:'fs08',text:text.coaches.seeDeletedcoaches})
            ),
            $('<table/>',{id:'coachesTable'}),

        )
    )


    for(const key in window.coaches){
        let coach = window.coaches[key];
        $('#coachesTable').append(
            $('<tr/>',{class:`tableRow ${coach.is_deleted ? 'deleted_coaches none' : ''}`}).append(
                $('<td/>',{}).append(
                    $('<img/>',{src:coach.profile_picture,class:'coachTableImg'})
                ),
                $('<td/>',{class:'w100p'}).append(
                    $('<div/>',{class:`bold500 ${coach.is_deleted ? 'lthrow' : '' }`,text:coach[`name_${window.lang}`]}),
                    $('<div/>',{class:`fs08 c_coach_${coach.coach_level}`,text:text.coaches[`coach_${coach.coach_level}`]})
                ),
                $('<td/>',{class:!window.accessibility.coaches_manage ? 'none' : ''}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<a/>',{class:`${coach.is_deleted ? 'none' : ''} ico-phone mX10 w25 h25 pointer call`,phone:coach.phone,tooltip:text.main.call,}),
                        $('<div/>',{coach:coach.id,class:`${coach.is_deleted ? 'none' : ''} ico-activity_logs mX10 w25 h25 pointer`,tooltip:text.main.activities}),
                        $('<div/>',{coach:coach.id,class:`${coach.is_deleted ? 'none' : ''} ico-settings mX10 w25 h25 pointer showPage`,page:'manage_coach',tooltip:text.main.manage}),
                        $('<div/>',{coach:coach.id,class:`${coach.is_deleted ? 'none' : ''} ${window.coach.id == coach.id ? 'none' : ''} soft_delete_coach ico-delete mX10 w25 h25 pointer`,tooltip:text.main.delete}),
                        $('<div/>',{coach:coach.id,class:`${!coach.is_deleted ? 'none' : ''} recover_coach ico-recover mX10 w25 h25 pointer`,tooltip:text.main.recover}),
                        // $('<div/>',{coach:coach.id,class:`${!coach.is_deleted ? 'none' : ''} delete_coach ico-delete mX10 w25 h25 pointer`,tooltip:`<span class="c_red">${text.main.deletePermanently}</span>`}),
                    )
                )
            )
        )
    }

}
