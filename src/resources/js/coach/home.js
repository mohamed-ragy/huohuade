require('../bootstrap.js');
require('./objects.js')
require('./links.js')

require('./body/body.js')
require('./pages/pages.js')

drawbody();

let params = new URLSearchParams(window.location.search)
params.get('page') == null ?  window.history.replaceState({page:'calendar'},'',`/${window.lang}/?page=calendar`) : window.history.replaceState({page:params.get('page')},'',`/${window.lang}/?page=${params.get('page')}`);
showPage(window.history.state.page)


//
