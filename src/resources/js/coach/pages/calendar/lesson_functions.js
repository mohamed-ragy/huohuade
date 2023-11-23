lesson_status_change_loading = function(loading){
    if(loading){
        showLoadingBar($('#loading'))
        $('#lesson_cancel').prop('disabled',true)
        $('#lesson_start').prop('disabled',true)
        $('#lesson_end').prop('disabled',true)

    }else{
        hideLoadingBar($('#loading'))
        $('#lesson_cancel').prop('disabled',false)
        $('#lesson_start').prop('disabled',false)
        $('#lesson_end').prop('disabled',false)
    }
}
