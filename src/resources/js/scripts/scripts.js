require('./loadingBar.js')
require('./inputTxtSelect.js')
require('./form.js')
require('./tooltip.js')


setPagination = function(elem,count,page){
    elem.attr('page',page);
    elem.find('.pagination_text').text(`${page}/${Math.ceil(count/10)}`)
    if(page == Math.ceil(count/10) == 1){
        elem.addClass('none')
    }else{
        elem.removeClass('none')
    }
    page == 1 ? elem.find('.pagination_prev').addClass('pagination_arrow_disabled') : elem.find('.pagination_prev').removeClass('pagination_arrow_disabled');
    page == Math.ceil(count/10) ? elem.find('.pagination_next').addClass('pagination_arrow_disabled') : elem.find('.pagination_next').removeClass('pagination_arrow_disabled');
    count == 0 ? elem.addClass('none') : elem.removeClass('none');
}
