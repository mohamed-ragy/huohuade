$('html,body').on('click','.menu_icon_m',function(e){
    e.stopImmediatePropagation();
    if($('.menu_container_m').hasClass('menu_container_m_expanded')){
        $('.menu_container_m').removeClass('menu_container_m_expanded')
        $('.menu_icon_m').find('.menu_icon_img').removeClass('ico-close').addClass('ico-menu')
    }else{
        $('.menu_container_m').addClass('menu_container_m_expanded')
        $('.menu_icon_m').find('.menu_icon_img').removeClass('ico-menu').addClass('ico-close')
    }
})

$('html,body').on('click','.menu_elem_m',function(e){
    e.stopImmediatePropagation();
    showPage($(this).attr('page'))
})