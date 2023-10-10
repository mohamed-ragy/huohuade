$('html,body').on('keypress','.form_container',function(e){
    e.stopImmediatePropagation();
    if(e.which == 13){
        $(this).find('.btn_submit').trigger('click')
    }
})
