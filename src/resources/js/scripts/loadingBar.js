showLoadingBar = function(elem){
    elem.removeClass('loadingBar_load')
    setTimeout(()=>{
        elem.addClass('loadingBar_load')
    },500)

}
hideLoadingBar = function(elem){
    elem.addClass('loadingBar_loaded')
    setTimeout(()=>{
        elem.removeClass('loadingBar_load loadingBar_loaded')
    },500)

}
