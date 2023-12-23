
window.accessibility = {};
switch (coach.coach_level) {
    case 0:
        window.accessibility = {
            'coaches_see':true,
            'coaches_manage':true,
            'locations_see':true,
            'locations_manage':true,
            'players_see':true,
            'players_manage':true,
            'lessons_create':true,
            'lesson_remove_add_coach_player':true,
            'lesson_manage_status':true,
            'lesson_manage_players_attendance':true,
        };
        break;
    case 1:
        window.accessibility = {
            'coaches_see':true,
            'coaches_manage':false,
            'locations_see':true,
            'locations_manage':false,
            'players_see':true,
            'players_manage':false,
            'lessons_create':true,
            'lesson_remove_add_coach_player':true,
            'lesson_manage_status':true,
            'lesson_manage_players_attendance':true,
        };
        break;
    case 2:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
            'locations_see':false,
            'locations_manage':false,
            'players_see':false,
            'players_manage':false,
            'lessons_create':false,
            'lesson_remove_add_coach_player':false,
            'lesson_manage_status':true,
            'lesson_manage_players_attendance':true,
        };
        break;
    case 3:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
            'locations_see':false,
            'locations_manage':false,
            'players_see':false,
            'players_manage':false,
            'lessons_create':false,
            'lesson_remove_add_coach_player':false,
            'lesson_manage_status':false,
            'lesson_manage_players_attendance':false,
        };
        break;
    case 4:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
            'locations_see':false,
            'locations_manage':false,
            'players_see':false,
            'players_manage':false,
            'lessons_create':false,
            'lesson_remove_add_coach_player':false,
            'lesson_manage_status':false,
            'lesson_manage_players_attendance':false,
        };
        break;
    default:
        break;
}


window.calendar = {
    month:new Date().getMonth() + 1,
    year:new Date().getFullYear()
}

window.lessons = [];
