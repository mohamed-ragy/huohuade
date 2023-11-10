$('html,body').on('click','#calendar_select_btn',function(e){
    e.stopImmediatePropagation();
    window.calendar = {
        year:$('#calendarDatePicker').attr('year'),
        month:$('#calendarDatePicker').attr('month')
    }
    setCalendar();
})
