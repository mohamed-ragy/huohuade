setCalendar = function(){
    $('.calendar_dayCard').text('').addClass('calendar_dayCard_dump').attr('day',null).removeClass('calendar_dayCard_hasLessons showPage').text('')
    let numbrOfDays = new Date(window.calendar.year,(parseInt(window.calendar.month)),0).getDate();
    let firstDay = new Date(window.calendar.year,(parseInt(window.calendar.month) - 1),1);
    let skip = firstDay.getDay();
    window.history.replaceState({page:window.history.state.page,month:window.calendar.month,year:window.calendar.year},'',`/${window.lang}/?page=${window.history.state.page}&month=${window.calendar.month}&year=${window.calendar.year}`)
    for(i=0;i<numbrOfDays;i++){
        $(`.calendar_dayCard[day_code="${i+skip}"]`).addClass('showPage').removeClass('calendar_dayCard_dump').attr('day',i+1).append(
            $('<div/>',{class:'calendar_dayCard_dayNum',text:i+1}),
            $('<div/>',{class:'calendar_dayCard_locations'})
        )
    }
    getCalendar()
}

getCalendar = function(){
    showLoadingBar($('#loading'))
    $.ajax({
        url:`/${window.lang}/api/calendar`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getCalendar:true,
            month:window.calendar.month,
            year:window.calendar.year,
        },success:function(r){
            hideLoadingBar($('#loading'))
            drawCalendar(r.lessons)
        }
    })
}
drawCalendar = function(lessons){
    let days = {}
    for(const key in lessons){
        let lesson = lessons[key];
        // let lesson_date = new Date(lesson.date * 1000).toLocaleString('en-US', { timeZone: 'Asia/Shanghai' });
        // lesson_date = Date.parse(lesson_date);
        // console.log(lesson_date)
        let dayNum = new Date(lesson.date * 1000).toLocaleString('en-US', { day:'numeric', timeZone: 'Asia/Shanghai' })
        if(!days.hasOwnProperty(dayNum)){
            days[dayNum] = [];
        }
        days[dayNum].push(lesson)
    }
    for(const key in days){
        drawCalendarDay(key,days[key])
    }
}
drawCalendarDay = function(dayNum,day){
    let locations_in_day = [];
    for(const key in day){
        let lesson = day[key];
        let pp_src = '../storage/imgs/profile_location.png' ;
        lesson.location.profile_picture == null ? pp_src = '../storage/imgs/profile_location.png' : pp_src = `../storage/imgs/locations/${lesson.location.profile_picture}` ;
        if(typeof(locations_in_day.find(item=>item.id == lesson.location.id)) === 'undefined'){
            locations_in_day.push({
                id:lesson.location.id,
                img:pp_src,
                lessons:0,
                name:lesson.location[`name_${window.lang}`]
            })
        }
        locations_in_day.find(item=>item.id == lesson.location.id).lessons++
    }
    let dayTooltip = '<div>';
    for(const key in locations_in_day){
        if($(`.calendar_dayCard[day="${dayNum}"]`).find('.calendar_dayCard_locations').children().length < 2){
            $(`.calendar_dayCard[day="${dayNum}"]`).addClass('calendar_dayCard_hasLessons').find('.calendar_dayCard_locations').append(
                $('<img/>',{src:locations_in_day[key].img,class:'calendar_dayCard_locationImg'}),
            )
        }else if($(`.calendar_dayCard[day="${dayNum}"]`).find('.calendar_dayCard_locations').children().length < 3){
            $(`.calendar_dayCard[day="${dayNum}"]`).addClass('calendar_dayCard_hasLessons').find('.calendar_dayCard_locations').append(
                $('<div/>',{text:`+${locations_in_day.length - 2}`,class:'calendar_dayCard_locationImg'}),
            )
        }
        dayTooltip = dayTooltip + `<div class="mY5">${locations_in_day[key].name} ${locations_in_day[key].lessons} ${locations_in_day[key].lessons == 1 ? text.calendar.lesson : text.calendar.lessons}</div>`
    }
    dayTooltip = dayTooltip+'</div>';
    $(`.calendar_dayCard[day="${dayNum}"]`).find('.calendar_dayCard_locations').attr('tooltip',dayTooltip)
}
