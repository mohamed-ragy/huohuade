<?php

namespace App\Http\Controllers;

use App\Models\coach;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Image;
class coachController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware(function ($request, $next) {
            if($request->lang == 'en'){
                Cookie::queue(Cookie::make('lang','en',9999999999));
            }else if($request->lang == 'ch'){
                Cookie::queue(Cookie::make('lang','ch',9999999999));
            }
            App::setLocale($request->lang);
            return $next($request);
        });
        $this->middleware(function ($request, $next) {
            if(!Auth::guard('coach')->check()){
                return redirect()->route('coach.login', ['lang' => Cookie::get('lang') ?? 'ch']);
            }
            return $next($request);
        })->only(['home']);
        $this->middleware(function ($request, $next) {
            if(Auth::guard('coach')->check()){
                return redirect()->route('coach.home', ['lang' => Cookie::get('lang') ?? 'ch']);
            }
            return $next($request);
        })->only(['login']);

    }
    public function home(Request $request){
        if(Auth::guard('coach')->user()->coach_level == 0 || Auth::guard('coach')->user()->coach_level == 1){
            $coaches = coach::get();
        }
        return view('coach.home',[
            'text' => collect(Lang::get('coach/coach')),
            'lang' => $request->lang,
            'coaches' => $coaches ?? collect([]),
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
        }else if($request->has('coach_logout')){
            Auth::guard('coach')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }else if($request->has('create_coach')){
            if(Auth::guard('coach')->user()->coach_level !== 0){return;}
            $validation = Validator::make([
                'login_name' => strip_tags($request->login_name),
                'password' => strip_tags($request->password),
                'password_confirm' => strip_tags($request->password_confirm),
                'name_en' => strip_tags($request->name_en),
                'name_ch' => strip_tags($request->name_ch),
                'gender' => strtolower(strip_tags($request->gender)),
                'job_title' => $request->job_title,
                'salary' => strip_tags($request->salary),
                'salary_currency' => $request->salary_currency,
            ],[
                'login_name' => 'required|regex:/^[a-z0-9_-]+$/|unique:coaches,login_name',
                'password' => 'required|same:password_confirm',
                'password_confirm' => 'required|same:password',
                'name_en' => 'required',
                'name_ch' => 'required',
                'gender' => ['required',Rule::in(['male', 'female'])],
                'job_title' => ['required',Rule::in(['0','1','2','3','4'])],
                'salary' => 'required|integer',
                'salary_currency' => ['required',Rule::in(['RMB','USD','HKD','EUR'])],

            ],[
                'login_name.required' => Lang::get('coach/coach.coaches.login_name_required'),
                'login_name.regex' => Lang::get('coach/coach.coaches.login_name_regex'),
                'login_name.unique' => Lang::get('coach/coach.coaches.login_name_unique'),

                'password.required' => Lang::get('coach/coach.coaches.password_required'),
                'password.same' => Lang::get('coach/coach.coaches.password_same'),

                'password_confirm.required' => Lang::get('coach/coach.coaches.password_confirm_required'),
                'password_confirm.same' => Lang::get('coach/coach.coaches.password_confirm_same'),

                'name_en.required' => Lang::get('coach/coach.coaches.name_en_required'),
                'name_ch.required' => Lang::get('coach/coach.coaches.name_ch_required'),

                'gender.required' => Lang::get('coach/coach.coaches.gender_required'),
                'gender.in' => Lang::get('coach/coach.coaches.gender_required'),

                'job_title.required' => Lang::get('coach/coach.coaches.job_title_required'),
                'job_title.in' => Lang::get('coach/coach.coaches.job_title_required'),

                'salary.required' => Lang::get('coach/coach.coaches.salary_required'),
                'salary.integer' => Lang::get('coach/coach.coaches.salary_integer'),

                'salary_currency.required' => Lang::get('coach/coach.coaches.salary_currency_required'),
                'salary_currency.in' => Lang::get('coach/coach.coaches.salary_currency_required'),

            ]);
            $profile_picture = null;
            $file = $request->file('profile_picture');
            if($file != null){
                $validation2 = Validator::make([
                    'profile_picture' => $request->profile_picture,
                ],[
                    'profile_picture' => 'mimes:jpg,png,jpeg,bmp,webp,gif'
                ]);
                if($validation2->fails()){
                    $validation->getMessageBag()->add('profile_picture', Lang::get('coach/coach.coaches.profile_picture_mimes'));
                    return response(['status'=>0, 'errors'=>$validation->errors()]);
                }

            }

            if($validation->fails()){
                return response(['status'=>0,'errors' => $validation->errors()]);
            }

            if($file != null){
                $fileExtention = $file->guessExtension();
                $file_name = strip_tags($request->login_name);
                $profile_picture = $file_name .'.'.$fileExtention;
                File::delete('storage/imgs/coaches/'.$file_name.'.png',
                'storage/imgs/coaches/'.$file_name.'.jpg',
                'storage/imgs/coaches/'.$file_name.'.jpeg',
                'storage/imgs/coaches/'.$file_name.'.gif',
                'storage/imgs/coaches/'.$file_name.'.webp',
                'storage/imgs/coaches/'.$file_name.'.bmp');
                // return response($fileExtention);
                $thumbnail = Image::make($file);
                $thumbnail->resize(800, 800, function ($constraint) { $constraint->aspectRatio(); $constraint->upsize(); });
                $thumbnail->save( public_path('storage/imgs/coaches/'). $file_name .'.'.$fileExtention);
                // $file->storeAs('public/imgs/coaches/' ,$request->login_name.'.'.$fileExtention);
            }
            $create_coach = coach::create([
                'login_name' => strip_tags($request->login_name),
                'password' => bcrypt($request->password),
                'profile_picture' => $profile_picture,
                'name_en' => strip_tags($request->name_en),
                'name_ch' => strip_tags($request->name_ch),
                'coach_level' => strip_tags($request->job_title),
                'gender' => strtolower(strip_tags($request->gender)),
                'salary' => strip_tags($request->salary),
                'salary_currency' => strip_tags($request->salary_currency),
                'created_at' => Carbon::now()->timestamp,
            ]);
            ///create activity
            return response(['status'=>1,'coach' => $create_coach]);
        }
    }
}
