showPage = function(page){
    // window.history.state.page = page;
    // window.history.state.tab = tab;
    $(`.menu_elem`).removeClass('menu_elem_selected')
    $(`.menu_elem_m`).removeClass('menu_elem_selected_m')
    $('.menu_container_m').removeClass('menu_container_m_expanded')
    $('.menu_icon_m').find('.menu_icon_img').removeClass('ico-close').addClass('ico-menu')
    let tab = '';
    $('#page').text('')
    $('#page_m').text('')
    switch (page) {
        case 'locations':
            tab = 'locations';
            drawPage_locations();
            break;
        case 'coaches':
            tab = 'coaches';
            drawPage_coaches();
            break;
        case 'create_new_coach':
            tab = 'coaches';
            drawPage_create_new_coach();
            break;
        default:
            break;
    }
    $(`.menu_elem[page="${tab}"]`).addClass('menu_elem_selected')
    $(`.menu_elem_m[page="${tab}"]`).addClass('menu_elem_selected_m')
}
