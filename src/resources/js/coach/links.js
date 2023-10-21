$('html,body').on('click','.showPage',function(e){
    e.stopImmediatePropagation();
    if($(this).attr('page') == window.history.state.page){
        window.history.replaceState({page:$(this).attr('page')},'',`/${window.lang}/?page=${$(this).attr('page')}`)
        return
    }
    window.history.pushState({page:$(this).attr('page')},'',`/${window.lang}/?page=${$(this).attr('page')}`)
    showPage($(this).attr('page'),$(this).attr('tab'))
})
$(window).on('popstate',(e)=>{
    // e.stopImmediatePropagation();
    showPage(window.history.state.page)
});


$('html,body').on('click','.switch_lang_ch',function(e){
    e.stopImmediatePropagation();
    window.location.href = `../ch?page=${window.history.state.page}`
})

$('html,body').on('click','.switch_lang_en',function(e){
    e.stopImmediatePropagation();
    window.location.href = `../en?page=${window.history.state.page}`
})

$('html,body').on('click','.coach_logout',function(e){
    e.stopImmediatePropagation();
    $.ajax({
        url:'../api/coach',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            coach_logout:true,
        },success:function(){
            window.location.href = '../'
        }
    })

})

