<?php

namespace App\Http\Controllers;

use App\Models\coach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

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
        })->only(['login']);

    }
    public function home(Request $request){
        return view('coach.home',[
            'text' => collect(Lang::get('coach/coach')),
        ]);
    }
    public function login(Request $request){
        return view('coach.login',[
            'text'=> collect(Lang::get('coach/login')),
        ]);
    }
    public function coach(Request $request){
        if($request->has('login')){
            if(Auth::guard('coach')->attempt(['login_name'=>$request->login_name,'password'=>$request->password])){
                return response(['status'=>1]);
            }else{
                return response(['status'=>0]);
            }
            // return response($request);
        }
    }
}