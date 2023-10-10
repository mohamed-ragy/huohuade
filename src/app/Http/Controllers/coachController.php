<?php

namespace App\Http\Controllers;

use App\Models\coach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class coachController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware(function ($request, $next) {
            if(!Auth::guard('coach')->check()){
                return redirect()->route('coach.login');
            }
            return $next($request);
        })->only(['home']);
        $this->middleware(function ($request, $next) {
            if(Auth::guard('coach')->check()){
                return redirect()->route('coach.home');
            }
            return $next($request);
        })->only(['home']);

    }
    public function home(Request $request){
        dd(coach::get());
    }
    public function login(Request $request){
        return view('coach.login');
    }
    public function dologin(Request $request){

    }
}
