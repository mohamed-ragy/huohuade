<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ trans('coach/coach.main.title') }}</title>
    <link rel="stylesheet" href="./css/coach/home.min.css">
</head>
<body>
    <div id="tooltipDiv"></div>
    <div id="container">

    </div>
</body>
<script>
    window.text = {!! $text !!}
    window.coach = {!! Auth::guard('coach')->user() !!}
    window.lang = "{{ $lang }}"
    window.coaches = {!! $coaches !!}
</script>
<script src="./js/coach/home.min.js"></script>
</html>
