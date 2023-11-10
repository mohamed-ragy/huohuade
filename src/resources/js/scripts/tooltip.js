$('html,body').on('mouseleave','[tooltip]',function(e){
    // e.stopImmediatePropagation();
    $('#tooltipDiv').text('');
    $('#tooltipDiv').addClass('none');
});
$('html,body').on('mouseenter mouseover mousemove','[tooltip]',function(e){
    // e.stopImmediatePropagation();
    if($(this).attr('tooltip') == ''){return;}
    window.toolTipElem = $(this);
    if(!window.matchMedia("(pointer: coarse)").matches){
        // console.log($(this).attr('tooltip'));
        if(e.pageY < ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
            $('#tooltipDiv').css({
                'top':e.pageY + 15 ,
                'left':e.pageX + 15,
            }).removeClass('none');

            // console.log('up left')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
            $('#tooltipDiv').css({
                'top':e.pageY - $('#tooltipDiv').height() - 5,
                'left':e.pageX + 5,
            }).removeClass('none');
            // console.log('down left')
        }else if(e.pageY < ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
            $('#tooltipDiv').css({
                'top':e.pageY + 15,
                'left':e.pageX - $('#tooltipDiv').width() - 15,
            }).removeClass('none');
            // console.log('up right')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
            $('#tooltipDiv').css({
                'left':e.pageX - $('#tooltipDiv').width() - 10,
                'top':e.pageY - $('#tooltipDiv').height() - 10,
            }).removeClass('none');
        }
    }
});

$('html,body').on('mousemove',function(e){
    // e.stopImmediatePropagation();
    if($('[tooltip]:hover').length == 0){
        $('#tooltipDiv').text('');
        $('#tooltipDiv').addClass('none');
    }
});

updateToolTip = function(){
    if(typeof(window.toolTipElem) === 'undefined'){return;}
    $('#tooltipDiv').html(window.toolTipElem.attr('tooltip'));
}
