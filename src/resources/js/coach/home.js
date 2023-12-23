require('../bootstrap.js');

require('./tools/objects.js')
require('./tools/links.js')
require('./tools/pageTabs.js')
require('./tools/map.js')
require('./tools/datePicker.js')
require('./tools/timePicker.js')

require('./body/body.js')
require('./pages/pages.js')

drawbody();

let params = new URLSearchParams(window.location.search)
console.log(params.get('page'))
if(params.get('page') == null){
    window.history.replaceState({page:'calendar'},'',`/${window.lang}/?page=calendar`)
    showPage(window.history.state.page)
}else{
    switch(params.get('page')){
        case 'lesson':
            window.history.pushState({page:params.get('page'),lesson:params.get('lesson')},'',`/${window.lang}/?page=${params.get('page')}&lesson=${params.get('lesson')}`)
        break;
        case 'create_new_lesson':
            window.calendar = {
                month:params.get('month') ?? new Date().getMonth() + 1,
                year:params.get('year') ?? new Date().getFullYear()
            }
            window.history.pushState({page:params.get('page'),day:params.get('day'),month:window.calendar.month,year:window.calendar.year},'',`/${window.lang}/?page=${params.get('page')}&day=${params.get('day')}&month=${window.calendar.month}&year=${window.calendar.year}`)
        break;
        case 'calendar_day':
            window.calendar = {
                month:params.get('month') ?? new Date().getMonth() + 1,
                year:params.get('year') ?? new Date().getFullYear()
            }
            window.history.pushState({page:params.get('page'),day:params.get('day'),month:window.calendar.month,year:window.calendar.year},'',`/${window.lang}/?page=${params.get('page')}&day=${params.get('day')}&month=${window.calendar.month}&year=${window.calendar.year}`)
        break;
        case 'calendar':
            window.calendar = {
                month:params.get('month') ?? new Date().getMonth() + 1,
                year:params.get('year') ?? new Date().getFullYear()
            }
            window.history.pushState({page:params.get('page'),month:window.calendar.month,year:window.calendar.year},'',`/${window.lang}/?page=${params.get('page')}&month=${window.calendar.month}&year=${window.calendar.year}`)
        break;
        case 'manage_coach':
            window.history.replaceState({page:params.get('page'),coach:params.get('coach')},'',`/${window.lang}/?page=${params.get('page')}&coach=${params.get('coach')}`);
        break;
        case 'manage_location':
            window.history.replaceState({page:params.get('page'),location:params.get('location')},'',`/${window.lang}/?page=${params.get('page')}&location=${params.get('location')}`);
        break;
        case 'manage_player':
            window.history.replaceState({page:params.get('page'),player:params.get('player')},'',`/${window.lang}/?page=${params.get('page')}&player=${params.get('player')}`);
        break;
        default:
            window.history.replaceState({page:params.get('page')},'',`/${window.lang}/?page=${params.get('page')}`);
        break;
    }
    showPage(window.history.state.page)


}



//
