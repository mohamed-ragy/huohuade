<?php

namespace App\Http\Controllers;

use App\Models\coach;
use Illuminate\Http\Request;

class installController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware(function ($request, $next) {
            return $next($request);
        })->only(['install']);

    }
    public function install(Request $request){
        if(coach::count() > 0){return redirect()->route('coach.home');}
        return view('install');
    }
}
