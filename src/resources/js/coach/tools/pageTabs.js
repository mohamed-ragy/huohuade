$('html,body').on('click','.pageTab',function(e){
    // e.stopImmediatePropagation();

    $(this).closest('.pageTabs').find('.pageTab').removeClass('pageTab_selected');
    $(this).addClass('pageTab_selected');

    $(`.pageTabContainer[tab="${$(this).attr('tab')}"]`).parent().find('.pageTabContainer').removeClass('pageTabContainer_selected');
    $(`.pageTabContainer[tab="${$(this).attr('tab')}"]`).addClass('pageTabContainer_selected');

    $(this).closest('.pageTabs').find('.pageTabContainer').scrollLeft($(this).offset().left)
    try{
        $(this).closest('.pageTabs').find('.pageTabsContainer').animate({
            'scrollLeft':$(this).offset().left - 40 - $(this).closest('.pageTabs').find('.pageTabsContainer').offset().left + $(this).closest('.pageTabs').find('.pageTabsContainer').scrollLeft(),
        },300,'swing');
    }catch{}

})

fixPageTabsArrows = function(){
    $('.pageTabsContainer').each(function(key,val){
        if(val.offsetWidth >= val.scrollWidth){
            $(this).closest('.pageTabs').find('.pageTabArrow').addClass('none');
        }else{
            $(this).closest('.pageTabs').find('.pageTabArrow').removeClass('none');
        }
})

}
$(window).resize(function(){
    fixPageTabsArrows();
})

$('html,body').on('click','.pageTabArrowLeft',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.pageTabs').find('.pageTab_selected').prev().trigger('click');

})

$('html,body').on('click','.pageTabArrowRight',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.pageTabs').find('.pageTab_selected').next().trigger('click');

})
