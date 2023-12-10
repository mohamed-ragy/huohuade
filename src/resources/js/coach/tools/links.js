$(document).on('click',function(e){
    // if($('.btn_confirm').is(':hover')){return;}
    $('.btn_confirm').removeClass('btn_confirm')
})
//
$('html,body').on('click','.showPage',function(e){
    e.stopImmediatePropagation();
    // if($(this).attr('page') == window.history.state.page){
    //     window.history.replaceState({page:$(this).attr('page')},'',`/${window.lang}/?page=${$(this).attr('page')}`)
    //     return
    // }
    switch($(this).attr('page')){
        case 'lesson':
            window.history.pushState({page:$(this).attr('page'),lesson:$(this).attr('lesson')},'',`/${window.lang}/?page=${$(this).attr('page')}&lesson=${$(this).attr('lesson')}`)
        break;
        case 'create_new_lesson':
            window.history.pushState({page:$(this).attr('page'),day:window.history.state.day,month:window.calendar.month,year:window.calendar.year},'',`/${window.lang}/?page=${$(this).attr('page')}&day=${window.history.state.day}&month=${window.calendar.month}&year=${window.calendar.year}`)
        break;
        case 'calendar_day':
            window.history.pushState({page:$(this).attr('page'),day:$(this).attr('day'),month:window.calendar.month,year:window.calendar.year},'',`/${window.lang}/?page=${$(this).attr('page')}&day=${$(this).attr('day')}&month=${window.calendar.month}&year=${window.calendar.year}`)
        break;
        case 'calendar':
            window.history.pushState({page:$(this).attr('page'),month:window.calendar.month,year:window.calendar.year},'',`/${window.lang}/?page=${$(this).attr('page')}&month=${window.calendar.month}&year=${window.calendar.year}`)
        break;
        case 'manage_coach':
            window.history.pushState({page:$(this).attr('page'),coach:$(this).attr('coach')},'',`/${window.lang}/?page=${$(this).attr('page')}&coach=${$(this).attr('coach')}`)
        break;
        case 'manage_location':
            window.history.pushState({page:$(this).attr('page'),location:$(this).attr('location')},'',`/${window.lang}/?page=${$(this).attr('page')}&location=${$(this).attr('location')}`)
        break;
        default:
            window.history.pushState({page:$(this).attr('page')},'',`/${window.lang}/?page=${$(this).attr('page')}`)
        break;
    }
    showPage($(this).attr('page'))

})
$(window).on('popstate',(e)=>{
    // e.stopImmediatePropagation();
    showPage(window.history.state.page)
});
//
$('html,body').on('click','.switch_lang_ch',function(e){
    e.stopImmediatePropagation();
    window.location.href = `../ch?page=${window.history.state.page}`
})
$('html,body').on('click','.switch_lang_en',function(e){
    e.stopImmediatePropagation();
    window.location.href = `../en?page=${window.history.state.page}`
})
$('html,body').on('click','.coach_logout',function(e){
    e.stopImmediatePropagation();
    $.ajax({
        url:`/${lang}/api/coach`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            coach_logout:true,
        },success:function(){
            window.location.href = '../'
        }
    })

})
$('html,body').on('click','.call',function(e){
    e.stopImmediatePropagation();
    window.open(`tel:${$(this).attr('phone')}`, '_self');
})
$('html,body').on('click','.copy',function(e){
    e.stopImmediatePropagation();
    let val = $(this).attr('copy');
    navigator.clipboard.writeText(val);
    $(this).text(text.main.copied)
    setTimeout(()=>{$(this).text(val)},2000)
})
$('html,body').on('click','.popupClose',function(e){
    e.stopImmediatePropagation();
    $('.popupContainer').addClass('none');
})
//
$('html,body').on('click','.location_popup',function(e){
    e.stopImmediatePropagation();
    $('.popupTitle').text(text.main.location);
    $('.popupBody').addClass('mnw400 mnh400').text('').append(
        $('<div/>',{class:'loadingBar loadingBar_3',id:'location_popup_loading'})
    )
    $('.popupContainer').removeClass('none')
    showLoadingBar($('#location_popup_loading'))
    $.ajax({
        url:`../${window.lang}/api/location`,
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getLocation:true,
            location_id:$(this).attr('location'),
        },success:function(r){
            hideLoadingBar($('#location_popup_loading'));
            $('.popupBody').append(
                $('<div/>',{class:'row alnC '}).append(
                    $('<img/>',{src:r.location.profile_picture,class:'h50 w50 br5'}),
                    $('<div/>',{class:'mX5 fs101 ',text:r.location[`name_${lang}`]})
                ),
                $('<div/>',{id:'location_popup_contactInfo',class:' wfc'}),
                $('<div/>',{class:'line'}),
                $('<div/>',{id:'location_popup_map',class:'h300 w100p '}),
            )
            draw_location_map('location_popup_map',r.location.lat,r.location.lng,false)
            for(const key in r.location.contact_info){
                let contact_info = r.location.contact_info[key]
                $('#location_popup_contactInfo').append(
                    // $('<div/>',{class:'line'}),
                    $('<div/>',{class:'row alnC jstfySB mY10'}).append(
                        $('<div/>',{class:'mie-20 fs08',text:contact_info[`name_${lang}`]}),
                        $('<div/>',{class:'mie-20 fs08 pointer call row alnC jstfyS',phone:contact_info.phone}).append(
                            $('<div/>',{class:'ico-phone h15 w15'}),
                            $('<div/>',{text:contact_info.phone})
                        ),
                        $('<div/>',{class:'mie-20 fs08 pointer copy row alnC jstfyS',copy:contact_info.wechat_id}).append(
                            $('<div/>',{class:'ico-wechat h15 w15 mie-5'}),
                            $('<div/>',{text:contact_info.wechat_id})
                        ),
                    )
                )
            }
        }
    })
})
//
