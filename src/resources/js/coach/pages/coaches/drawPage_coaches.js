drawPage_coaches = function(){
    $('.pageContainerTree').text('').append(
        $('<div/>',{class:'bold500 fs102',text:text.menu.coaches})
    )
    $('#page').append(
        $('<div/>',{class:'wfc ma mnw300'}).append(
            $('<div/>',{class:'w100p column alnS jstfyS'}).append(
                $('<div/>',{class:'btn_container'}).append(
                    $('<button/>',{class:'btn btn_cancel',text:text.coaches.createNewCoach})
                )
            ),
            $('<table/>',{id:'coachesTable'})
        )
    )

    $('#page_m').append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            $('<div/>',{class:'fs101 bold500',text:text.menu.locations}),
        ),
        $('<div/>',{class:'w100p column alnS jstfyS'}).append(
            $('<div/>',{class:'btn_container'}).append(
                $('<button/>',{class:'btn btn_cancel',text:text.coaches.createNewCoach})
            )
        )
    )


    for(const key in window.coaches){
        let coach = window.coaches[key];
        console.log(coach)
        $('#coachesTable').append(
            $('<tr/>',{class:''}).append(
                $('<td/>',{}).append(
                    $('<img/>',{src:coach.profile_picture,class:'coachTableImg'})
                ),
                $('<td/>',{class:''}).append(
                    $('<div/>',{class:'',text:coach[`name_${window.lang}`]}),
                    $('<div/>',{class:'',text:text.coaches[`coach_${coach.coach_level}`]})
                )
            )
        )
    }

}
