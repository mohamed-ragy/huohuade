drawPage_calendar = function(){
    $('.pageContainerTree').text('').append(
        $('<div/>',{class:'bold500',text:text.menu.calendar}),
    );
    $('.page').text('').append(
        $('<div/>',{class:'datePicker',id:'calendarDatePicker',month:window.calendar.month,year:window.calendar.year}).append(
            $('<div/>',{class:'datePicker_month',text:text.months[window.calendar.month]}),
            $('<div/>',{class:'datePicker_year',text:window.calendar.year}),
            $('<div/>',{class:'pointer ico-arrow-down h15 w15'}),
            $('<div/>',{class:'datePicker_select none'}).append(
                $('<div/>',{class:'row alnC jstfySB w100p mY20'}).append(
                    $('<div/>',{class:'datePicker_select_month_prev ico-arrow-prev h15 w15  pointer'}),
                    $('<div/>',{class:'tac datePicker_select_month mX40 mnw100',month:window.calendar.month,text:text.months[window.calendar.month]}),
                    $('<div/>',{class:'datePicker_select_month_next ico-arrow-next h15 w15  pointer'}),
                ),
                $('<div/>',{class:'row alnC jstfySB w100p mY30'}).append(
                    $('<div/>',{class:'datePicker_select_year_prev ico-arrow-prev h15 w15  pointer'}),
                    $('<div/>',{class:'tac datePicker_select_year mX40 mnw100',year:window.calendar.year,text:window.calendar.year}),
                    $('<div/>',{class:'datePicker_select_year_next ico-arrow-next h15 w15  pointer'}),
                ),
                $('<div/>',{class:'w100p tae mT40'}).append(
                    $('<button/>',{text:text.main.select,class:'btn_cancel btn datePicker_select_btn',id:'calendar_select_btn'})
                )
            )
        ),
        $('<div/>',{class:'',id:'calendar_calendar'}).append(
            $('<div/>',{class:'calendar_row'}).append(
                $('<div/>',{class:'calendar_row_head',text:text.days[0]}),
                $('<div/>',{class:'calendar_row_head',text:text.days[1]}),
                $('<div/>',{class:'calendar_row_head',text:text.days[2]}),
                $('<div/>',{class:'calendar_row_head',text:text.days[3]}),
                $('<div/>',{class:'calendar_row_head',text:text.days[4]}),
                $('<div/>',{class:'calendar_row_head',text:text.days[5]}),
                $('<div/>',{class:'calendar_row_head',text:text.days[6]}),
            ),
            $('<div/>',{class:'calendar_row'}).append(
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:0}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:1}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:2}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:3}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:4}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:5}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:6}),
            ),
            $('<div/>',{class:'calendar_row'}).append(
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:7}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:8}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:9}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:10}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:11}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:12}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:13}),
            ),
            $('<div/>',{class:'calendar_row'}).append(
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:14}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:15}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:16}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:17}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:18}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:19}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:20}),
            ),
            $('<div/>',{class:'calendar_row'}).append(
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:21}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:22}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:23}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:24}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:25}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:26}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:27}),
            ),
            $('<div/>',{class:'calendar_row'}).append(
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:28}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:29}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:30}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:31}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:32}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:33}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:34}),
            ),
            $('<div/>',{class:'calendar_row'}).append(
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:35}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:36}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:37}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:38}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:39}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:40}),
                $('<div/>',{page:'calendar_day',class:'calendar_dayCard',day_code:41}),
            ),
        )
    )
    setCalendar();

}
