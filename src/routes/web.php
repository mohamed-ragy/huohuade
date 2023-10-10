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
    Route::get('/install',[installController::class,'install'])->name('coach.install');
    Route::get('/',[coachController::class,'home'])->name('coach.home');
    Route::get('/login',[coachController::class,'login'])->name('coach.login');


    Route::get('/api/dologin',[coachController::class,'dologin']);
});
$homeRoutes = function(){
    Route::get('/',function(){
        return 'coming soon';
    });
};
Route::domain(env('APP_URL'))->group($homeRoutes);
Route::domain('www.'.env('APP_URL'))->group($homeRoutes);
