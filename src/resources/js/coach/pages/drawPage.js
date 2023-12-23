showPage = function(page){
    // window.history.state.page = page;
    // window.history.state.tab = tab;
    $('.page').removeClass('page_show')
    window.lessons = [];

    setTimeout(()=>{
        $(`.menu_elem`).removeClass('menu_elem_selected')
        $(`.menu_elem_m`).removeClass('menu_elem_selected_m')
        $('.menu_container_m').removeClass('menu_container_m_expanded')
        $('.menu_icon_m').find('.menu_icon_img').removeClass('ico-close').addClass('ico-menu')
        let tab = '';
        $('.page').text('')
        switch (page) {
            case 'lesson':
                tab:'calendar';
                drawPage_lesson()
            break;
            case 'create_new_lesson':
                tab = 'calendar';
                drawPage_create_new_lesson()
            break;
            case 'calendar_day':
                tab = 'calendar';
                drawPage_calendar_day()
            break;
            case 'calendar':
                tab = 'calendar';
                drawPage_calendar();
            break;
            ////////////////////////////////////
            case 'manage_location':
                tab = 'locations';
                drawPage_manage_location(window.history.state.location,'edit_location_profile');
            break;
            case 'create_new_location':
                tab = 'locations',
                drawPage_create_new_location();
            break;
            case 'locations':
                tab = 'locations';
                drawPage_locations();
            break;
            ////////////////////////////////////
            case 'coaches':
                tab = 'coaches';
                drawPage_coaches();
            break;
            case 'create_new_coach':
                tab = 'coaches';
                drawPage_create_new_coach();
            break;
            case 'manage_coach':
                tab = 'coaches';
                drawPage_manage_coach(window.history.state.coach,'edit_coach_profile');
            break;
            /////////////////////////////////////
            case 'players':
                tab = 'players';
                drawPage_players();
            break;
            case 'create_new_player':
                tab = 'players';
                drawPage_create_new_player();
            break;
            case 'manage_player':
                tab = 'players';
                drawPage_manage_player(window.history.state.player);
            break;
            default:
            break;
        }
        $(`.menu_elem[page="${tab}"]`).addClass('menu_elem_selected')
        $(`.menu_elem_m[page="${tab}"]`).addClass('menu_elem_selected_m')
        fixPageTabsArrows();
        $('.page').addClass('page_show')
    },200)

}
