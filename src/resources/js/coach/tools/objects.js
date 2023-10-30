
window.accessibility = {};
switch (coach.coach_level) {
    case 0:
        window.accessibility = {
            'coaches_see':true,
            'coaches_manage':true,
            'locations_see':true,
            'locations_manage':true,
        };
        break;
    case 1:
        window.accessibility = {
            'coaches_see':true,
            'coaches_manage':false,
            'locations_see':true,
            'locations_manage':false,
        };
        break;
    case 2:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
            'locations_see':false,
            'locations_manage':false,
        };
        break;
    case 3:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
            'locations_see':false,
            'locations_manage':false,
        };
        break;
    case 4:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
            'locations_see':false,
            'locations_manage':false,
        };
        break;
    default:
        break;
}

coach.profile_picture == null && coach.gender == 'male' ? window.coach.profile_picture =  '../storage/imgs/profile_male.png' :
coach.profile_picture == null && coach.gender == 'female' ? window.coach.profile_picture =  '../storage/imgs/profile_female.png' :
window.coach.profile_picture =  `../storage/imgs/coaches/${window.coach.profile_picture}`;

for(const key in coaches){
    coaches[key].profile_picture = coaches[key].profile_picture == null && coaches[key].gender == 'male' ? '../storage/imgs/profile_male.png' :
    coaches[key].profile_picture == null && coaches[key].gender == 'female' ? '../storage/imgs/profile_female.png' :
    `../storage/imgs/coaches/${coaches[key].profile_picture}`;
}
for(const key in locations){
    locations[key].profile_picture = locations[key].profile_picture == null ? '../storage/imgs/profile_location.png' :
    `../storage/imgs/locations/${locations[key].profile_picture}`;
}
