<?php

namespace App\Http\Controllers;

use App\Models\activity_log;
use App\Models\coach;
use App\Models\location;
use App\Models\salary;
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
use Illuminate\Support\Str;

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
            $locations = location::get();
        }
        return view('coach.home',[
            'text' => collect(Lang::get('coach/coach')),
            'lang' => $request->lang,
            'coaches' => $coaches ?? collect([]),
            'locations' => $locations ?? collect([]),
        ]);
    }
    public function login(Request $request){
        return view('coach.login',[
            'text'=> collect(Lang::get('coach/login')),
            'lang' => $request->lang
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
                'phone' => strip_tags($request->phone),
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
                'phone' => 'required',
                'job_title' => ['required',Rule::in(['0','1','2','3','4'])],
                'salary' => 'required|integer',
                'salary_currency' => ['required',Rule::in(['CNY','USD','HKD','EUR'])],

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

                'phone.required' => Lang::get('coach/coach.coaches.phone_required'),

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
            }
            $create_coach = coach::create([
                'login_name' => strip_tags($request->login_name),
                'password' => bcrypt($request->password),
                'profile_picture' => $profile_picture,
                'name_en' => strip_tags($request->name_en),
                'name_ch' => strip_tags($request->name_ch),
                'coach_level' => strip_tags($request->job_title),
                'gender' => strtolower(strip_tags($request->gender)),
                'phone' => strip_tags($request->phone),
                'salary' => strip_tags($request->salary),
                'salary_currency' => strip_tags($request->salary_currency),
                'created_at' => Carbon::now()->timestamp,
            ]);
            activity_log::create([
                'code' => 'coach.create',
                'created_at' => Carbon::now()->timestamp,
                'created_by' => Auth::guard('coach')->user()->id,
                'created_by_name_en' => Auth::guard('coach')->user()->name_en,
                'created_by_name_ch' => Auth::guard('coach')->user()->name_ch,
                'coach_id' => $create_coach->id,
                'coach_name_en' => $create_coach->name_en,
                'coach_name_ch' => $create_coach->name_ch,
            ]);
            ///create activity
            return response(['status'=>1,'coach' => $create_coach]);
        }else if($request->has('edit_coach')){
            if(Auth::guard('coach')->user()->coach_level !== 0){return;}

            $validation = Validator::make([
                'name_en' => strip_tags($request->name_en),
                'name_ch' => strip_tags($request->name_ch),
                'gender' => strtolower(strip_tags($request->gender)),
                'phone' => strip_tags($request->phone),
                'job_title' => $request->job_title,
                'salary' => strip_tags($request->salary),
                'salary_currency' => $request->salary_currency,
            ],[
                'name_en' => 'required',
                'name_ch' => 'required',
                'gender' => ['required',Rule::in(['male', 'female'])],
                'phone' => 'required',
                'job_title' => ['required',Rule::in(['0','1','2','3','4'])],
                'salary' => 'required|integer',
                'salary_currency' => ['required',Rule::in(['CNY','USD','HKD','EUR'])],

            ],[
                'name_en.required' => Lang::get('coach/coach.coaches.name_en_required'),
                'name_ch.required' => Lang::get('coach/coach.coaches.name_ch_required'),

                'gender.required' => Lang::get('coach/coach.coaches.gender_required'),
                'gender.in' => Lang::get('coach/coach.coaches.gender_required'),

                'phone.required' => Lang::get('coach/coach.coaches.phone_required'),

                'job_title.required' => Lang::get('coach/coach.coaches.job_title_required'),
                'job_title.in' => Lang::get('coach/coach.coaches.job_title_required'),

                'salary.required' => Lang::get('coach/coach.coaches.salary_required'),
                'salary.integer' => Lang::get('coach/coach.coaches.salary_integer'),

                'salary_currency.required' => Lang::get('coach/coach.coaches.salary_currency_required'),
                'salary_currency.in' => Lang::get('coach/coach.coaches.salary_currency_required'),
            ]);
            $coach = coach::where('id',$request->coach_id)->first();

            $profile_picture = null;
            $file = $request->file('profile_picture');
            if($file == null){
                $profile_picture = $coach->profile_picture;
            }else{
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
                $file_name = strip_tags($coach->login_name);
                $profile_picture = $file_name .'.'.$fileExtention;
                File::delete('storage/imgs/coaches/'.$file_name.'.png',
                'storage/imgs/coaches/'.$file_name.'.jpg',
                'storage/imgs/coaches/'.$file_name.'.jpeg',
                'storage/imgs/coaches/'.$file_name.'.gif',
                'storage/imgs/coaches/'.$file_name.'.webp',
                'storage/imgs/coaches/'.$file_name.'.bmp');
                $thumbnail = Image::make($file);
                $thumbnail->resize(800, 800, function ($constraint) { $constraint->aspectRatio(); $constraint->upsize(); });
                $thumbnail->save( public_path('storage/imgs/coaches/'). $file_name .'.'.$fileExtention);
            }
            $coach->update([
                'profile_picture' => $profile_picture,
                'name_en' => strip_tags($request->name_en),
                'name_ch' => strip_tags($request->name_ch),
                'coach_level' => strip_tags($request->job_title),
                'gender' => strtolower(strip_tags($request->gender)),
                'phone' => strip_tags($request->phone),
                'salary' => strip_tags($request->salary),
                'salary_currency' => strip_tags($request->salary_currency),
            ]);
            activity_log::create([
                'code' => 'coach.edit_profile',
                'created_at' => Carbon::now()->timestamp,
                'created_by' => Auth::guard('coach')->user()->id,
                'created_by_name_en' => Auth::guard('coach')->user()->name_en,
                'created_by_name_ch' => Auth::guard('coach')->user()->name_ch,
                'coach_id' => $coach->id,
                'coach_name_en' => $coach->name_en,
                'coach_name_ch' => $coach->name_ch,
            ]);
            return response(['status'=>1,'coach' => $coach]);

        }else if($request->has('change_coach_password')){
            if(Auth::guard('coach')->user()->coach_level !== 0){return;}
            $validation = Validator::make([
                'password' => strip_tags($request->password),
                'password_confirm' => strip_tags($request->password_confirm),
            ],[
                'password' => 'required|same:password_confirm',
                'password_confirm' => 'required|same:password',
            ],[
                'password.required' => Lang::get('coach/coach.coaches.password_required'),
                'password.same' => Lang::get('coach/coach.coaches.password_same'),

                'password_confirm.required' => Lang::get('coach/coach.coaches.password_confirm_required'),
                'password_confirm.same' => Lang::get('coach/coach.coaches.password_confirm_same'),
            ]);
            if($validation->fails()){
                return response(['status'=>0,'errors' => $validation->errors()]);
            }
            $coach = coach::where('id',$request->coach_id)->first();
            $coach->update([
                'password' => bcrypt($request->password),
            ]);
            activity_log::create([
                'code' => 'coach.password_change',
                'created_at' => Carbon::now()->timestamp,
                'created_by' => Auth::guard('coach')->user()->id,
                'created_by_name_en' => Auth::guard('coach')->user()->name_en,
                'created_by_name_ch' => Auth::guard('coach')->user()->name_ch,
                'coach_id' => $coach->id,
                'coach_name_en' => $coach->name_en,
                'coach_name_ch' => $coach->name_ch,
            ]);
            return response(['status'=>1]);

        }else if($request->has('delete_coach')){
            if(Auth::guard('coach')->user()->coach_level !== 0){return;}
            if(Auth::guard('coach')->user()->id == $request->coach_id){return;}
            $coach = coach::where('id',$request->coach_id)->first();
            $delete = coach::where('id',$request->coach_id)->delete();
            if($delete){
                File::delete('storage/imgs/coaches/'.$coach->profile_picture);
                activity_log::create([
                    'code' => 'coach.delete',
                    'created_at' => Carbon::now()->timestamp,
                    'created_by' => Auth::guard('coach')->user()->id,
                    'created_by_name_en' => Auth::guard('coach')->user()->name_en,
                    'created_by_name_ch' => Auth::guard('coach')->user()->name_ch,
                    'coach_id' => $request->coach_id,
                    'coach_name_en' => $request->coach_name_en,
                    'coach_name_ch' => $request->coach_name_ch,
                ]);
                return response(['stats' => 1]);
            }
        }else if($request->has('get_coach_salaries')){
            if(Auth::guard('coach')->user()->coach_level !== 0){return;}
            $salaries = salary::where('coach_id',$request->coach_id)->orderBy('created_at','desc')->skip($request->skip)->take(10)->get();
            $count = salary::where('coach_id',$request->coach_id)->count();
            return response(['salaries' => $salaries,'count' => $count]);
        }else if($request->has('delete_salary')){
            if(Auth::guard('coach')->user()->coach_level !== 0){return;}
            $deleteSalary = salary::where('id',$request->salary_id)->delete();
            if($deleteSalary){
                $coach = coach::where('id',$request->coach_id)->first();
                activity_log::create([
                    'code' => 'coach.salary.delete',
                    'created_at' => Carbon::now()->timestamp,
                    'created_by' => Auth::guard('coach')->user()->id,
                    'created_by_name_en' => Auth::guard('coach')->user()->name_en,
                    'created_by_name_ch' => Auth::guard('coach')->user()->name_ch,
                    'coach_id' => $coach->id,
                    'coach_name_en' => $coach->name_en,
                    'coach_name_ch' => $coach->name_ch,
                ]);
                return response(['stats' => 1]);
            }
        }else if($request->has('submit_coach_salary')){
            if(Auth::guard('coach')->user()->coach_level !== 0){return;}
            $validation = Validator::make([
                'salary' => strip_tags($request->salary),
                'salary_currency' => $request->salary_currency,
            ],[
                'salary' => 'required|integer',
                'salary_currency' => ['required',Rule::in(['CNY','USD','HKD','EUR'])],

            ],[
                'salary.required' => Lang::get('coach/coach.coaches.salary_required'),
                'salary.integer' => Lang::get('coach/coach.coaches.salary_integer'),

                'salary_currency.required' => Lang::get('coach/coach.coaches.salary_currency_required'),
                'salary_currency.in' => Lang::get('coach/coach.coaches.salary_currency_required'),

            ]);
            $coach = coach::where('id',$request->coach_id)->first();
            if($validation->fails()){
                return response(['status'=>0,'errors' => $validation->errors()]);
            }
            salary::create([
                'coach_id' => $coach->id,
                'coach_name_en' => $coach->name_en,
                'coach_name_ch' => $coach->name_ch,
                'amount' => $request->salary,
                'currency' => $request->salary_currency,
                'description' => $request->description,
                'created_at' => Carbon::now()->timestamp,
            ]);

            activity_log::create([
                'code' => 'coach.salary.create',
                'created_at' => Carbon::now()->timestamp,
                'created_by' => Auth::guard('coach')->user()->id,
                'created_by_name_en' => Auth::guard('coach')->user()->name_en,
                'created_by_name_ch' => Auth::guard('coach')->user()->name_ch,
                'coach_id' => $coach->id,
                'coach_name_en' => $coach->name_en,
                'coach_name_ch' => $coach->name_ch,
            ]);
            return response(['status'=>1,'coach' => $coach]);

        }
    }
    public function location(Request $request){
        if($request->has('create_location')){
            if(Auth::guard('coach')->user()->coach_level !== 0){return;}
            $validation = Validator::make([
                'name_en' => strip_tags($request->name_en),
                'name_ch' => strip_tags($request->name_ch),
                'lat' => strip_tags($request->lat),
                'lng' => strip_tags($request->lng),
            ],[
                'name_en' => 'required',
                'name_ch' => 'required',
                'lat' => 'required|not_in:0',
                'lng' => 'required|not_in:0',

            ],[
                'name_en.required' => Lang::get('coach/coach.locations.name_en_required'),
                'name_ch.required' => Lang::get('coach/coach.locations.name_ch_required'),
                'lat.required' => Lang::get('coach/coach.locations.latlng_required'),
                'lat.not_in' => Lang::get('coach/coach.locations.latlng_required'),
                'lng.required' => Lang::get('coach/coach.locations.latlng_required'),
                'lng.not_in' => Lang::get('coach/coach.locations.latlng_required'),

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
                    $validation->getMessageBag()->add('profile_picture', Lang::get('coach/coach.locations.profile_picture_mimes'));
                    return response(['status'=>0, 'errors'=>$validation->errors()]);
                }
            }
            if($validation->fails()){
                return response(['status'=>0,'errors' => $validation->errors()]);
            }

            if($file != null){
                $fileExtention = $file->guessExtension();
                $file_name = Str::uuid();
                $profile_picture = $file_name .'.'.$fileExtention;
                File::delete('storage/imgs/coaches/'.$file_name.'.png',
                'storage/imgs/coaches/'.$file_name.'.jpg',
                'storage/imgs/coaches/'.$file_name.'.jpeg',
                'storage/imgs/coaches/'.$file_name.'.gif',
                'storage/imgs/coaches/'.$file_name.'.webp',
                'storage/imgs/coaches/'.$file_name.'.bmp');
                $thumbnail = Image::make($file);
                $thumbnail->resize(800, 800, function ($constraint) { $constraint->aspectRatio(); $constraint->upsize(); });
                $thumbnail->save( public_path('storage/imgs/locations/'). $file_name .'.'.$fileExtention);
            }

            $create_location = location::create([
                'name_en' => strip_tags($request->name_en),
                'name_ch' => strip_tags($request->name_ch),
                'lat' => strip_tags($request->lat),
                'lng' => strip_tags($request->lng),
                'profile_picture' => $profile_picture,
                'contact_info' => [],
                'created_at' => Carbon::now()->timestamp,
            ]);
            activity_log::create([
                'code' => 'location.create',
                'created_at' => Carbon::now()->timestamp,
                'created_by' => Auth::guard('coach')->user()->id,
                'created_by_name_en' => Auth::guard('coach')->user()->name_en,
                'created_by_name_ch' => Auth::guard('coach')->user()->name_ch,
                'location_id' => $create_location->id,
                'location_name_en' => $create_location->name_en,
                'location_name_ch' => $create_location->name_ch,
            ]);
            return response(['status'=>1,'location' => $create_location]);
        }
    }
}
