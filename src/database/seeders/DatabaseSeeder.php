<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\coach;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $administrator = coach::create([
            'login_name' => 'admin',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Yuan feng zheng',
            'name_ch' => '元冯郑',
            'coach_level' => 0,
            'gendar' => 'male',
            'salary' => null,
            'created_at' => Carbon::now()->timestamp,
            'created_by' => null,
            'is_deleted' => false,
        ]);
        $manager = coach::create([
            'login_name' => 'manager',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Xin Zhao',
            'name_ch' => '新招',
            'coach_level' => 1,
            'gendar' => 'male',
            'salary' => 10000,
            'created_at' => Carbon::now()->timestamp,
            'created_by' => $administrator->id,
            'is_deleted' => false,
        ]);
        $senior = coach::create([
            'login_name' => 'senior',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Li Wang',
            'name_ch' => '王丽',
            'coach_level' => 2,
            'gendar' => 'female',
            'salary' => 7500,
            'created_at' => Carbon::now()->timestamp,
            'created_by' => $administrator->id,
            'is_deleted' => false,
        ]);
        $basic = coach::create([
            'login_name' => 'basic',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Ming Ping',
            'name_ch' => '明平',
            'coach_level' => 3,
            'gendar' => 'male',
            'salary' => 3000,
            'created_at' => Carbon::now()->timestamp,
            'created_by' => $administrator->id,
            'is_deleted' => false,
        ]);
        $coach = coach::create([
            'login_name' => 'coach',
            'password' => bcrypt('huohuade'),
            'profile_picture' => null,
            'name_en' => 'Mu Yang',
            'name_ch' => '穆阳',
            'coach_level' => 4,
            'gendar' => 'male',
            'salary' => 1000,
            'created_at' => Carbon::now()->timestamp,
            'created_by' => $administrator->id,
            'is_deleted' => false,
        ]);
    }
}
