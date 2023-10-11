$('html,body').on('click','.menu_icon',function(e){
    e.stopImmediatePropagation();
    if($('.menu_container').hasClass('menu_container_expanded')){
        $('.menu_container').removeClass('menu_container_expanded')
    }else{
        $('.menu_container').addClass('menu_container_expanded')
    }
})


$('html,body').on('click','.menu_elem',function(e){
    e.stopImmediatePropagation();
    $('.menu_elem').removeClass('menu_elem_selected');
    $(this).addClass('menu_elem_selected')
})
