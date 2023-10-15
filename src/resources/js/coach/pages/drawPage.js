showPage = function(page){
    $(`.menu_elem`).removeClass('menu_elem_selected')
    $(`.menu_elem_m`).removeClass('menu_elem_selected_m')
    $(`.menu_elem[page="${page}"]`).addClass('menu_elem_selected')
    $(`.menu_elem_m[page="${page}"]`).addClass('menu_elem_selected_m')
    $('.menu_container_m').removeClass('menu_container_m_expanded')
    $('.menu_icon_m').find('.menu_icon_img').removeClass('ico-close').addClass('ico-menu')
    $('#page').text('')
    $('#page_m').text('')
    switch (page) {
        case 'locations':
            drawPage_locations();
            break;
        case 'coaches':
            drawPage_coaches();
            break;
        default:
            break;
    }
}
