<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\coach;
use App\Models\location;
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

        $administrator = coach::create([
            'login_name' => 'admin',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Yuan feng zheng',
            'name_ch' => '元冯郑',
            'coach_level' => 0,
            'gender' => 'male',
            'salary' => 0,
            'salary_currency' => 'CNY',
            'created_at' => Carbon::now()->timestamp,
        ]);
        $manager = coach::create([
            'login_name' => 'manager',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Xin Zhao',
            'name_ch' => '新招',
            'coach_level' => 1,
            'gender' => 'male',
            'salary' => 10000,
            'salary_currency' => 'CNY',
            'created_at' => Carbon::now()->timestamp,
        ]);
        $senior = coach::create([
            'login_name' => 'senior',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Li Wang',
            'name_ch' => '王丽',
            'coach_level' => 2,
            'gender' => 'female',
            'salary' => 7500,
            'salary_currency' => 'CNY',
            'created_at' => Carbon::now()->timestamp,
        ]);
        $basic = coach::create([
            'login_name' => 'basic',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Ming Ping',
            'name_ch' => '明平',
            'coach_level' => 3,
            'gender' => 'male',
            'salary' => 3000,
            'salary_currency' => 'CNY',
            'created_at' => Carbon::now()->timestamp,
        ]);
        $coach = coach::create([
            'login_name' => 'coach',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Mu Yang',
            'name_ch' => '穆阳',
            'coach_level' => 4,
            'gender' => 'male',
            'salary' => 1000,
            'salary_currency' => 'CNY',
            'created_at' => Carbon::now()->timestamp,
        ]);

        $coaches = coach::where('login_name','!=','admin')->get();
        foreach($coaches as $coach){
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
            'name_en' => 'Hong Kong', 'name_ch' => '香港特别行政區', 'profile_picture'=>null,
            'lng' => '114.177216', 'lat' => '22.302711',
            'contact_info' => [
                0 => ['name_en'=>'Li Wang', 'name_ch'=>'李王', 'phone'=>'123456789', 'description'=>$this->faker->paragraph()],
            ],
            'created_at' => Carbon::now()->timestamp,
        ]);
        location::create([
            'name_en' => 'Beijing', 'name_ch' => '北京市', 'profile_picture'=>null,
            'lng' => '116.383331', 'lat' => '	39.916668',
            'contact_info' => [
                0 => ['name_en'=>'Liu Zhang', 'name_ch'=>'刘张', 'phone'=>'123456789', 'description'=>$this->faker->paragraph()],
                1 => ['name_en'=>'Wu Zhang', 'name_ch'=>'吴张', 'phone'=>'123456789', 'description'=>''],
            ],
            'created_at' => Carbon::now()->timestamp,
        ]);
        location::create([
            'name_en' => 'Shanghai', 'name_ch' => '上海市', 'profile_picture'=>null,
            'lng' => '121.469170', 'lat' => '31.224361',
            'contact_info' => [
                0 => ['name_en'=>'Chen Huang', 'name_ch'=>'陈黄', 'phone'=>'123456789', 'description'=>$this->faker->paragraph()],
            ],
            'created_at' => Carbon::now()->timestamp,
        ]);

    }
}
