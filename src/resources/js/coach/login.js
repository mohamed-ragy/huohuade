require('../bootstrap.js');

$('html,body').on('click','#loginBtn',function(e){
    e.stopImmediatePropagation();
    $('#loginBtn').prop('disabled',true);
    $('#login_name').prop('readonly',true);
    $('#password').prop('readonly',true);
    showLoadingBar($('#loginLoadingBar'));
    $('.login_msg').removeClass('none c_red c_green').addClass('none').text('')
    $.ajax({
        url:'../api/coach',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            login:true,
            login_name:$('#login_name').val(),
            password:$('#password').val(),
        }
    }).done(function(r){
        hideLoadingBar($('#loginLoadingBar'));
        $('#loginBtn').prop('disabled',false);
        $('#login_name').prop('readonly',false);
        $('#password').prop('readonly',false);
        console.log(r)
        if(r.status == 1){
            $('#loginBtn').addClass('none')
            $('#login_name').addClass('none')
            $('#password').addClass('none')
            $('.login_msg').removeClass('none c_red c_green').addClass('c_green').text(window.text.loginSuccess)
            setTimeout(() => {
                window.location.href = '/'
            }, 1000);
        }else if(r.status == 0){
            $('.login_msg').removeClass('none c_red c_green').addClass('c_red').text(window.text.loginFail)
        }
    })
})
