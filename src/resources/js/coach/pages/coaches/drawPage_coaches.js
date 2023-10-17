drawPage_coaches = function(){
    $('.pageContainerTree').text('').append(
        $('<div/>',{class:'bold500',text:text.menu.coaches})
    )
    $('#page').append(
        $('<div/>',{class:''}).append(
            $('<div/>',{class:'w100p column alnS jstfyS'}).append(
                $('<div/>',{class:'btn_container'}).append(
                    $('<button/>',{class:'showPage btn btn_cancel',page:'create_new_coach',tab:'coaches',text:text.coaches.createNewCoach})
                )
            ),
            $('<table/>',{id:'coachesTable'})
        )
    )

    $('#page_m').append(
        $('<div/>',{class:'ma mxw1000'}).append(
            $('<div/>',{class:'w100p column alnS jstfyS'}).append(
                $('<div/>',{class:'btn_container'}).append(
                    $('<button/>',{class:'showPage btn btn_cancel',page:'create_new_coach',tab:'coaches',text:text.coaches.createNewCoach})
                )
            ),
            $('<table/>',{id:'coachesTable_m'})
        )
    )


    for(const key in window.coaches){
        let coach = window.coaches[key];
        console.log(coach)
        $('#coachesTable').append(
            $('<tr/>',{class:'tableRow'}).append(
                $('<td/>',{}).append(
                    $('<img/>',{src:coach.profile_picture,class:'coachTableImg'})
                ),
                $('<td/>',{class:'w100p'}).append(
                    $('<div/>',{class:'bold500',text:coach[`name_${window.lang}`]}),
                    $('<div/>',{class:'fs08 ',text:text.coaches[`coach_${coach.coach_level}`]})
                ),
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:'row alnC jstfyE'}).append(
                        $('<div/>',{class:'ico-activity_logs mX10 w25 h25 pointer',tooltip:text.main.activities}),
                        $('<div/>',{class:'ico-settings mX10 w25 h25 pointer',tooltip:text.main.manage}),
                        $('<div/>',{class:'ico-delete mX10 w25 h25 pointer',tooltip:text.main.delete}),
                    )
                )
            )
        )

        $('#coachesTable_m').append(
            $('<tr/>',{class:'tableRow'}).append(
                $('<td/>',{}).append(
                    $('<img/>',{src:coach.profile_picture,class:'coachTableImg_m'})
                ),
                $('<td/>',{class:'w100p'}).append(
                    $('<div/>',{class:'fs09 bold500',text:coach[`name_${window.lang}`]}),
                    $('<div/>',{class:'fs07 ',text:text.coaches[`coach_${coach.coach_level}`]})
                ),
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:'row alnC jstfyE'}).append(
                        $('<div/>',{class:'ico-activity_logs mX10 w20 h20 pointer',tooltip:text.main.activities}),
                        $('<div/>',{class:'ico-settings mX10 w20 h20 pointer',tooltip:text.main.manage}),
                        $('<div/>',{class:'ico-delete mX10 w20 h20 pointer',tooltip:text.main.delete}),
                    )
                )
            )
        )
    }

}
