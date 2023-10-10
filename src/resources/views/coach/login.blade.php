<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ trans('coach/login.title') }}</title>
    <link rel="stylesheet" href="./css/coach/login.css">
</head>
<body class="">
    <div class="m10 p20 loginForm shdow1 br5 column alnC jstfyC">
        <img src="./storage/imgs/logo.jpeg" class="h30 mB10" alt="">
        <div class="fs102">{{ trans('coach/login.coachLogin') }}</div>
        <div class="column alnC jstfyC mT20">
            <input placeholder="{{ trans('coach/login.loginName') }}" class="inputText" type="text" id="loginName" id="">
            <input placeholder="{{ trans('coach/login.password') }}" class="inputText" type="password" id="password" id="">
            <div class="btnContainer">
                <button class="btn">{{ trans('coach/login.login') }}</button>
            </div>
        </div>
    </div>
</body>
</html>
