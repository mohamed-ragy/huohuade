<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ trans('coach/login.title') }}</title>
    <link rel="stylesheet" href="../css/coach/login.min.css">
</head>
<body class="">
    <div class="relative ovh m10 p20 w400 mxw100p-60 login_form shdow1 br5 column alnC jstfyC">
        <div class="loadingBar" id="loginLoadingBar"></div>
        <img src="../storage/imgs/logo.jpeg" class="h30 mB10" alt="">
        <div class="fs102">{{ trans('coach/login.coachLogin') }}</div>
        <div class="form_container column alnC jstfyC mT20">
            <div class="login_msg tac p10 fs09 none"></div>
            <input placeholder="{{ trans('coach/login.loginName') }}" class="inputText" type="text" id="login_name" id="">
            <input placeholder="{{ trans('coach/login.password') }}" class="inputText" type="password" id="password" id="">
            <div class="btn_container">
                <button id="loginBtn" class="btn btn_submit">{{ trans('coach/login.login') }}</button>
            </div>
        </div>
    </div>
</body>
<script>
    window.text = {!! $text !!}
</script>
<script src="../js/coach/login.min.js"></script>
</html>
