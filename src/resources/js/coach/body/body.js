require('./drawBody.js');
require('./menu.js');
require('./menu_m.js');


$('html,body').on('click','.switch_lang_ch',function(e){
    e.stopImmediatePropagation();
    window.location.href = '../ch'
})

$('html,body').on('click','.switch_lang_en',function(e){
    e.stopImmediatePropagation();
    window.location.href = '../en'
})

$('html,body').on('click','.coach_logout',function(e){
    e.stopImmediatePropagation();
    $.ajax({
        url:'../api/coach',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            coach_logout:true,
        },success:function(){
            window.location.href = '../'
        }
    })

})

