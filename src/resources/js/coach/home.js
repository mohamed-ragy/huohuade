require('../bootstrap.js');

require('./tools/objects.js')
require('./tools/links.js')
require('./tools/pageTabs.js')

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
        case 'manage_coach':
            window.history.replaceState({page:params.get('page'),coach:params.get('coach')},'',`/${window.lang}/?page=${params.get('page')}&coach=${params.get('coach')}`);
            showPage(window.history.state.page)
            break;
        default:
            window.history.replaceState({page:params.get('page')},'',`/${window.lang}/?page=${params.get('page')}`);
            showPage(window.history.state.page)
            break;
    }


}



//
