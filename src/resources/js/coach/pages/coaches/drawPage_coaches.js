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
            $('<table/>',{id:'coachesTable'})
        )
    )


    for(const key in window.coaches){
        let coach = window.coaches[key];
        $('#coachesTable').append(
            $('<tr/>',{class:'tableRow'}).append(
                $('<td/>',{}).append(
                    $('<img/>',{src:coach.profile_picture,class:'coachTableImg'})
                ),
                $('<td/>',{class:'w100p'}).append(
                    $('<div/>',{class:'bold500',text:coach[`name_${window.lang}`]}),
                    $('<div/>',{class:'fs08 ',text:text.coaches[`coach_${coach.coach_level}`]})
                ),
                $('<td/>',{class:!window.accessibility.coaches_manage ? 'none' : ''}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'ico-phone mX10 w25 h25 pointer call',phone:coach.phone,tooltip:text.main.call}),
                        $('<div/>',{class:'ico-activity_logs mX10 w25 h25 pointer',tooltip:text.main.activities}),
                        $('<div/>',{coach:coach.id,class:'ico-settings mX10 w25 h25 pointer showPage',page:'manage_coach',tooltip:text.main.manage}),
                        $('<div/>',{coach:coach.id,class:`${window.coach.id == coach.id ? 'none' : ''} delete_coach ico-delete mX10 w25 h25 pointer`,tooltip:text.main.delete}),
                    )
                )
            )
        )
    }

}
