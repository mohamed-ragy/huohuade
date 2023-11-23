drawPage_create_new_lesson = function(){
    let dayDate = new Date(window.history.state.year,window.history.state.month - 1,window.history.state.day).toLocaleDateString(window.lang,{year:'numeric',month:'short',day:'2-digit'});
    $('.pageContainerTree').text('').append(
        $('<a/>',{class:'bold500 showPage',text:text.menu.calendar,page:'calendar'}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<a/>',{class:'bold500 showPage',page:'calendar_day',day:window.history.state.day,text:dayDate}),
        $('<span/>',{text:'>',class:'mX5'}),
        $('<span/>',{text:text.calendar.createNewLesson})
    );
    let inputListLocationList;
    $('.page').text('').append(
        $('<div/>',{class:'wfc'}).append(
            $('<div/>',{class:'m20 zx20 relative'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.calendar.location}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect create_lesson_input',id:'create_lesson_location',readonly:true}),
                    inputListLocationList = $('<div/>',{class:'inputSelectList none'})
                ),
                $('<div/>',{class:'create_lesson_location_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'m20 zx10 relative create_lesson_location_court_container none'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.calendar.court}),
                $('<div/>',{class:'inputSelectContainer'}).append(
                    $('<div/>',{class:'inputSelectArrow ico-arrow-down'}),
                    $('<input/>',{class:'inputText inputSelect create_lesson_input',id:'create_lesson_location_court',readonly:true}),
                    $('<div/>',{class:'inputSelectList none'})
                ),
                $('<div/>',{class:'create_lesson_location_court_error fs08 mX5 c_red',text:''})
            ),
            $('<div/>',{class:'column alnS jstfyS m20'}).append(
                $('<div/>',{class:'mX10 fs09',text:text.calendar.time}),
                $('<div/>',{class:'row alnC jstfyC '}).append(
                    $('<div/>',{class:'timePicker',type:'hour'}).append(
                        $('<div/>',{class:'ico-arrow-up timePickerUp'}),
                        $('<div/>',{class:'timePickerNumber',id:'create_lesson_hour',text:'00'}),
                        $('<div/>',{class:'ico-arrow-down timePickerDown'}),
                        ),
                        $('<div/>',{class:'mX10 bold500 fs103',text:':'}),
                        $('<div/>',{class:'timePicker',type:'minute'}).append(
                            $('<div/>',{class:'ico-arrow-up timePickerUp'}),
                            $('<div/>',{class:'timePickerNumber',id:'create_lesson_minute',text:'00'}),
                            $('<div/>',{class:'ico-arrow-down timePickerDown'}),
                    ),
                )
            ),
            $('<div/>',{class:'btn_container relative'}).append(
                $('<button/>',{class:'btn m10 create_lesson_input',id:'create_lesson_btn',text:text.main.create})
            ),

        )
    )
    for(const key in window.locations){
        let location = window.locations[key];
        if(!location.is_deleted){
            inputListLocationList.append(
                $('<div/>',{class:'inputSelectListItem create_lesson_location_item',text:location[`name_${window.lang}`],key:location.id}),
            )
        }
    }
}
