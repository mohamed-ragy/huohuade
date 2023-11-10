<?php

use App\Http\Controllers\coachController;
use App\Http\Controllers\installController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::domain('coach.'.env('APP_URL'))->group(function(){
    Route::get('/', function (){
        return redirect()->route('coach.home', ['lang' => Cookie::get('lang') ?? 'ch']);
    })->name('root');

    Route::get('{lang}/install',[installController::class,'install'])->name('coach.install');
    Route::get('{lang}/',[coachController::class,'home'])->name('coach.home');
    Route::get('{lang}/login',[coachController::class,'login'])->name('coach.login');


    Route::post('{lang}/api/coach',[coachController::class,'coach']);
    Route::post('{lang}/api/location',[coachController::class,'location']);
    Route::post('{lang}/api/calendar',[coachController::class,'calendar']);
});
$homeRoutes = function(){
    Route::get('/',function(){
        return 'coming soon';
    });
};
Route::domain(env('APP_URL'))->group($homeRoutes);
Route::domain('www.'.env('APP_URL'))->group($homeRoutes);
