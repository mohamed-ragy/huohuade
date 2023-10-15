coach.profile_picture == null && coach.gendar == 'male' ? window.coach.profile_picture =  '../storage/imgs/profile_male.png' :
coach.profile_picture == null && coach.gendar == 'female' ? window.coach.profile_picture =  '../storage/imgs/profile_female.png' :
window.coach.profile_picture =  `../storage/imgs/coaches/${window.coach.profile_picture}`;

window.accessibility = {};
switch (coach.coach_level) {
    case 0:
        window.accessibility = {
            'coaches_see':true,
            'coaches_manage':true,
        };
        break;
    case 1:
        window.accessibility = {
            'coaches_see':true,
            'coaches_manage':false,
        };
        break;
    case 2:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
        };
        break;
    case 3:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
        };
        break;
    case 4:
        window.accessibility = {
            'coaches_see':false,
            'coaches_manage':false,
        };
        break;
    default:
        break;
}

for(const key in coaches){
    coaches[key].profile_picture = coaches[key].profile_picture == null && coaches[key].gendar == 'male' ? '../storage/imgs/profile_male.png' :
    coaches[key].profile_picture == null && coaches[key].gendar == 'female' ? '../storage/imgs/profile_female.png' :
`../storage/imgs/coaches/${window.coach.profile_picture}`;
}
