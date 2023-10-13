$('html,body').on('mouseleave','[tooltip]',function(e){
    // e.stopImmediatePropagation();
    $('#tooltipDiv').text('');
    $('#tooltipDiv').hide();
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
                'display':'block',
            });
            // console.log('up left')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
            $('#tooltipDiv').css({
                'top':e.pageY - $('#tooltipDiv').height() - 5,
                'left':e.pageX + 5,
                'display':'block',
            });
            // console.log('down left')
        }else if(e.pageY < ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
            $('#tooltipDiv').css({
                'top':e.pageY + 15,
                'left':e.pageX - $('#tooltipDiv').width() - 15,
                'display':'block',
            });
            // console.log('up right')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
            $('#tooltipDiv').css({
                'left':e.pageX - $('#tooltipDiv').width() - 10,
                'top':e.pageY - $('#tooltipDiv').height() - 10,
                'display':'block',
            });
        }
    }
});
$('html,body').on('touchstart','[tooltip]',function(e){
    // e.stopImmediatePropagation();
    if($(this).attr('tooltip') == ''){return;}
    window.toolTipElem = $(this);
    if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX < ($(window).width()/2)){
        $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
        $('#tooltipDiv').css({
            'top':e.originalEvent.touches[0].pageY + 15 ,
            'left':e.originalEvent.touches[0].pageX + 15,
            'display':'block',
        });
        // console.log('up left')
    }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) && e.originalEvent.touches[0].pageX < ($(window).width()/2)){
        $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
        $('#tooltipDiv').css({
            'top':e.originalEvent.touches[0].pageY - $('#tooltipDiv').height() - 5,
            'left':e.originalEvent.touches[0].pageX + 5,
            'display':'block',
        });
        // console.log('down left')
    }else if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
        $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
        $('#tooltipDiv').css({
            'top':e.originalEvent.touches[0].pageY + 15,
            'left':e.originalEvent.touches[0].pageX - $('#tooltipDiv').width() - 15,
            'display':'block',
        });
        // console.log('up right')
    }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
        $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
        $('#tooltipDiv').css({
            'left':e.originalEvent.touches[0].pageX - $('#tooltipDiv').width() - 10,
            'top':e.originalEvent.touches[0].pageY - $('#tooltipDiv').height() - 10,
            'display':'block',
        });
        // console.log('down right')
    }
});
$('html,body').on('mousemove',function(e){
    // e.stopImmediatePropagation();
    if($('[tooltip]:hover').length == 0){
        $('#tooltipDiv').text('');
        $('#tooltipDiv').hide();
    }
});
$('html,body').on('touchend',function(e){
    // e.stopImmediatePropagation();
    $('#tooltipDiv').text('');
    $('#tooltipDiv').hide();
});

updateToolTip = function(){
    if(typeof(window.toolTipElem) === 'undefined'){return;}
    $('#tooltipDiv').html(window.toolTipElem.attr('tooltip'));
}
