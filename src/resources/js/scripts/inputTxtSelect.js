$('html,body').on('click','.inputSelectContainer',function(e){
    e.stopImmediatePropagation();
    $(this).find('.inputSelectList').hasClass('none') ? $(this).find('.inputSelectList').removeClass('none')
    : $(this).find('.inputSelectList').addClass('none')
})

$('html,body').on('click','.inputSelectListItem',function(e){
    // e.stopImmediatePropagation();
    let inputSelect = $(this).closest('.inputSelectContainer').find('.inputSelect')
    inputSelect.val($(this).text())
    inputSelect.attr('key',$(this).attr('key'));
//
})
$(document).on('click',function(){
    $('.inputSelectList').addClass('none')
})
