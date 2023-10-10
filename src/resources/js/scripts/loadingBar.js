showLoadingBar = function(elem){
    elem.addClass('loadingBar_load')
}
hideLoadingBar = function(elem){
    elem.addClass('loadingBar_loaded')
    setTimeout(()=>{
        elem.removeClass('loadingBar_load loadingBar_loaded')
    },500)

}
