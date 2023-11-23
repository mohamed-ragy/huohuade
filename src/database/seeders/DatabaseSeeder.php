<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\activity_log;
use App\Models\coach;
use App\Models\lesson;
use App\Models\lesson_note;
use App\Models\location;
use App\Models\player;
use App\Models\salary;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->faker = Faker::create();
        $faker_ch = Faker::create('zh_CN');

        $admin = coach::create([
            'login_name' => 'admin',
            'password' => bcrypt('huohuade'),
            'profile_picture' => '../storage/imgs/coaches/admin.jpg',
            'name_en' => $this->faker->firstName('male').' '.$this->faker->lastName('male'),
            'name_ch' => $faker_ch->firstName('male').' '.$faker_ch->lastName('male'),
            'gender' => 'male',
            'phone' => '012345678',
            'coach_level' => 0,
            'salary' => 0,
            'salary_currency' => 'CNY',
            'created_at' => Carbon::now()->timestamp,
        ]);
        $manager = coach::create([
            'login_name' => 'manager',
            'password' => bcrypt('huohuade'),
            'profile_picture' => '../storage/imgs/coaches/manager.jpg',
            'name_en' => $this->faker->firstName('male').' '.$this->faker->lastName('male'),
            'name_ch' => $faker_ch->firstName('male').' '.$faker_ch->lastName('male'),
            'gender' => 'male',
            'phone' => '012345678',
            'coach_level' => 1,
            'salary' => 10000,
            'salary_currency' => 'CNY',
            'created_at' => Carbon::now()->timestamp,
        ]);
        $gender = 'male';
        for($i=1;$i<=3;$i++){
            $gender == 'male' ? $gender = 'female' : $gender = 'male' ;
            coach::create([
                'login_name' => 'senior'.$i,
                'password' => bcrypt('huohuade'),
                'profile_picture' => '../storage/imgs/coaches/senior'.$i.'.jpg',
                'name_en' => $this->faker->firstName($gender).' '.$this->faker->lastName($gender),
                'name_ch' => $faker_ch->firstName($gender).' '.$faker_ch->lastName($gender),
                'gender' => $gender,
                'phone' => '012345678',
                'coach_level' => 2,
                'salary' => 7500,
                'salary_currency' => 'CNY',
                'created_at' => Carbon::now()->timestamp,
            ]);
        }
        $senior_coaches = coach::where('coach_level',2)->get();
        for($i=1;$i<=5;$i++){
            $gender == 'male' ? $gender = 'female' : $gender = 'male' ;
            coach::create([
                'login_name' => 'basic'.$i,
                'password' => bcrypt('huohuade'),
                'profile_picture' => '../storage/imgs/coaches/basic'.$i.'.jpg',
                'name_en' => $this->faker->firstName($gender).' '.$this->faker->lastName($gender),
                'name_ch' => $faker_ch->firstName($gender).' '.$faker_ch->lastName($gender),
                'gender' => 'male',
                'phone' => '012345678',
                'coach_level' => 3,
                'salary' => 3000,
                'salary_currency' => 'CNY',
                'created_at' => Carbon::now()->timestamp,
            ]);
        }
        $basic_coaches = coach::where('coach_level',3)->get();

        for($i=1;$i<=10;$i++){
            $gender == 'male' ? $gender = 'female' : $gender = 'male' ;
            coach::create([
                'login_name' => 'coach'.$i,
                'password' => bcrypt('huohuade'),
                'profile_picture' => '../storage/imgs/coaches/coach'.$i.'.jpg',
                'name_en' => $this->faker->firstName($gender).' '.$this->faker->lastName($gender),
                'name_ch' => $faker_ch->firstName($gender).' '.$faker_ch->lastName($gender),
                'gender' => 'male',
                'phone' => '012345678',
                'coach_level' => 4,
                'salary' => 1000,
                'salary_currency' => 'CNY',
                'created_at' => Carbon::now()->timestamp,
                'is_deleted' => random_int(0,5) == 0 ? true : false,
            ]);
        }
        $coach_coaches = coach::where('coach_level',4)->get();
        $coaches = coach::get();
        foreach(coach::where('login_name','!=','admin')->get() as $coach){
            $months = random_int(10,50);
            for($i=0;$i<=$months;$i++){
                $amount = $coach->salary;
                if(random_int(0,3) == 0){$amount = $coach->salary + random_int(-5,5) * 1000;}
                if($amount < 0 ){$amount = $amount * -1;}
                salary::create([
                    'coach_id' => $coach->id,
                    'coach_name_en' => $coach->name_en,
                    'coach_name_ch' => $coach->name_ch,
                    'amount' => $amount,
                    'currency' => $coach->salary_currency,
                    'description' => $this->faker->paragraph(),
                    'created_at' => Carbon::now()->subHours(random_int(-48,48))->subMonths($i)->timestamp
                ]);
            }

        }

        /////////////////locations
        location::create([
            'name_en' => 'Hong Kong', 'name_ch' => '香港特别行政區', 'profile_picture'=>'../storage/imgs/locations/hongkong.jpg',
            'lng' => '114.177216', 'lat' => '22.302711',
            'contact_info' => [
                0 => ['id'=>1,'name_en'=>'Li Wang', 'name_ch'=>'李王', 'phone'=>'123456789', 'wechat_id'=>'wxid_0123abcd'],
            ],
            'courts' => ['1','2','3','4','5'],
            'created_at' => Carbon::now()->timestamp,
            'is_deleted' => true,
        ]);
        location::create([
            'name_en' => 'Beijing', 'name_ch' => '北京市', 'profile_picture'=>'../storage/imgs/locations/beijing.jpg',
            'lng' => '116.383331', 'lat' => '	39.916668',
            'contact_info' => [
                0 => ['id'=>1,'name_en'=>'Liu Zhang', 'name_ch'=>'刘张', 'phone'=>'123456789', 'wechat_id'=>'wxid_0123abcd'],
                1 => ['id'=>2,'name_en'=>'Wu Zhang', 'name_ch'=>'吴张', 'phone'=>'123456789', 'wechat_id'=>'wxid_0123abcd'],
            ],
            'courts' => ['A','B','C','D','E','F'],
            'created_at' => Carbon::now()->timestamp,
        ]);
        location::create([
            'name_en' => 'Shanghai', 'name_ch' => '上海市', 'profile_picture'=>'../storage/imgs/locations/shanghai.jpg',
            'lng' => '121.469170', 'lat' => '31.224361',
            'contact_info' => [
                0 => ['id'=>1,'name_en'=>'Chen Huang', 'name_ch'=>'陈黄', 'phone'=>'123456789', 'wechat_id'=>'wxid_0123abcd'],
            ],
            'courts' => ['1','2','3','4','5'],
            'created_at' => Carbon::now()->timestamp,
        ]);
        location::create([
            'name_en' => 'Dongguan', 'name_ch' => '东莞', 'profile_picture'=>'../storage/imgs/profile_location.png',
            'lng' => '113.943916', 'lat' => '22.940195',
            'contact_info' => [
                0 => ['id'=>1,'name_en'=>'Chen Huang', 'name_ch'=>'陈黄', 'phone'=>'123456789', 'wechat_id'=>'wxid_0123abcd'],
            ],
            'courts' => ['A','B','C','D','E','F'],
            'created_at' => Carbon::now()->timestamp,
        ]);
        $locations = location::get();
        /////////////////players
        for($i=1;$i<=25;$i++){
            player::create([
                'profile_picture' => '../storage/imgs/players/player_'.$i.'.jpg',
                'name_en' => $this->faker->firstName('male').' '.$this->faker->lastName('male'),
                'name_ch' => $faker_ch->firstName('male').' '.$faker_ch->lastName('male'),
                'birthdate' => Carbon::now()->subYear(random_int(10,25))->subDays(random_int(0,360)),
                'gender' => 'male',
                'created_at' => Carbon::now()->subDays(random_int(0,100))->timestamp,
            ]);
        }
        for($i=26;$i<=50;$i++){
            player::create([
                'profile_picture' => '../storage/imgs/players/player_'.$i.'.jpg',
                'name_en' => $this->faker->firstName('female').' '.$this->faker->lastName('male'),
                'name_ch' => $faker_ch->firstName('female').' '.$faker_ch->lastName('male'),
                'birthdate' => Carbon::now()->subYear(random_int(10,25))->subDays(random_int(0,360)),
                'gender' => 'female',
                'created_at' => Carbon::now()->subDays(random_int(0,100))->timestamp,
            ]);
        }
        $players = player::get();
        //////lessons
        for($i=30;$i>=1;$i--){
            $today = Carbon::today()->subDays($i);
            for($x=1;$x<=random_int(0,20);$x++){
                $hour = random_int(8,20);
                $started_at =  Carbon::today()->subDays($i)->hour($hour);
                $ended_at =  Carbon::today()->subDays($i)->hour($hour+random_int(1,2));
                $created_at = Carbon::today()->subDays($i + random_int(5,10))->hour(random_int(8,20));

                $status = random_int(0,5) == 0 ? 'canceled' : 'finished';
                $location = $locations->random();
                $lesson = lesson::create([
                    'status' => $status,
                    'date' => $started_at->timestamp,
                    'started_at' => $status == 'canceled' ? null : $started_at->timestamp,
                    'ended_at' => $status == 'canceled' ? null : $ended_at->timestamp,
                    'location_id'=>$location->id,
                    'court' => $location->courts[array_rand($location->courts,1)],
                ]);
                $lesson_creator = random_int(0,1) ? $admin : $manager ;
                activity_log::create([
                    'code' => 'lesson.create',
                    'created_at' => $created_at->timestamp,
                    'created_by' => $lesson_creator->id,
                    'created_by_name_en' => $lesson_creator->name_en,
                    'created_by_name_ch' => $lesson_creator->name_ch,
                    'lesson_id' => $lesson->id,
                ]);
                lesson_note::create([
                    'lesson_id' => $lesson->id,
                    'coach_id' => $lesson_creator->id,
                    'coach_en' => $lesson_creator->name_en,
                    'coach_ch' => $lesson_creator->name_ch,
                    'note' => $this->faker->sentence(random_int(10,30)),
                    'created_at' => Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp,
                ]);
                //add coaches
                for($y=1;$y<=random_int(1,3);$y++){
                    if(random_int(0,1)){
                        $lesson_coach = $coach_coaches->random();
                    }else{
                        $lesson_coach = $basic_coaches->random();
                    }
                    $lesson->coaches()->attach($lesson_coach->id);
                    $lesson_creator = random_int(0,1) ? $admin : $manager;
                    if(random_int(0,2) == 0){
                        lesson_note::create([
                            'lesson_id' => $lesson->id,
                            'coach_id' => $lesson_coach->id,
                            'coach_en' => $lesson_coach->name_en,
                            'coach_ch' => $lesson_coach->name_ch,
                            'note' => $this->faker->sentence(random_int(10,30)),
                            'created_at' => Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp,
                        ]);
                    }
                    activity_log::create([
                        'code' => 'lesson.add_coach',
                        'created_at' => Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp,
                        'created_by' => $lesson_creator->id,
                        'created_by_name_en' => $lesson_creator->name_en,
                        'created_by_name_ch' => $lesson_creator->name_ch,
                        'lesson_id' => $lesson->id,
                        'coach_id' => $lesson_coach->id,
                        'coach_name_en' =>$lesson_coach->name_en,
                        'coach_name_ch' =>$lesson_coach->name_ch,
                    ]);
                }
                $lesson_coach = $senior_coaches->random();
                $lesson->coaches()->attach($lesson_coach->id);
                $lesson_creator = random_int(0,1) ? $admin : $manager;
                if(random_int(0,1) == 0){
                    lesson_note::create([
                        'lesson_id' => $lesson->id,
                        'coach_id' => $lesson_creator->id,
                        'coach_en' => $lesson_creator->name_en,
                        'coach_ch' => $lesson_creator->name_ch,
                        'note' => $this->faker->sentence(random_int(10,30)),
                        'created_at' => Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp,
                    ]);
                }
                // if($status == 'canceled'){
                //     if(random_int(0,2) == 0){
                //         $lesson->update(['canceled_by'=>$lesson_coach->id,'canceled_at'=>Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp]);
                //     }else if(random_int(0,1) == 0){
                //         $lesson->update(['canceled_by'=>$admin->id,'canceled_at'=>Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp]);
                //     }else {
                //         $lesson->update(['canceled_by'=>$manager->id,'canceled_at'=>Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp]);
                //     }
                // }
                activity_log::create([
                    'code' => 'lesson.add_coach',
                    'created_at' => Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp,
                    'created_by' => $lesson_creator->id,
                    'created_by_name_en' => $lesson_creator->name_en,
                    'created_by_name_ch' => $lesson_creator->name_ch,
                    'lesson_id' => $lesson->id,
                    'coach_id' => $lesson_coach->id,
                    'coach_name_en' =>$lesson_coach->name_en,
                    'coach_name_ch' =>$lesson_coach->name_ch,
                ]);
                if(random_int(0,2) == 0){
                    lesson_note::create([
                        'lesson_id' => $lesson->id,
                        'coach_id' => $lesson_coach->id,
                        'coach_en' => $lesson_coach->name_en,
                        'coach_ch' => $lesson_coach->name_ch,
                        'note' => $this->faker->sentence(random_int(10,30)),
                        'created_at' => Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp,
                    ]);
                }
                //add players
                for($z=1;$z<=random_int(1,5);$z++){
                    $lesson_player = $players->random();
                    $lesson->players()->attach($lesson_player->id);
                    activity_log::create([
                        'code' => 'lesson.add_player',
                        'created_at' => Carbon::today()->subDays($i + random_int(1,5))->hour(random_int(8,20))->timestamp,
                        'created_by' => $lesson_creator->id,
                        'created_by_name_en' => $lesson_creator->name_en,
                        'created_by_name_ch' => $lesson_creator->name_ch,
                        'lesson_id' => $lesson->id,
                        'player_id' => $lesson_player->id,
                        'player_name_en' =>$lesson_player->name_en,
                        'player_name_ch' =>$lesson_player->name_ch,
                    ]);
                }
            }

        }
    }
}
