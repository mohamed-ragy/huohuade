$('html,body').on('click','.showPage',function(e){
    e.stopImmediatePropagation();
    showPage($(this).attr('page'),$(this).attr('tab'))
})
