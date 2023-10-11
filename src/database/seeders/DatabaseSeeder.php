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
        coach::create([
            'login_name' => 'howard',
            'password' => bcrypt('huohuade'),
            'profile_picture' => 'coach.png',
            'name_en' => 'Yuan feng zheng',
            'name_ch' => '元冯郑',
            'job_title_en' => 'Huohuade GM',
            'job_title_ch' => '霍华德 总经理',
            'is_master' => true,
            'authorities' => '1111111111',
            'salary' => null,
            'created_at' => Carbon::now()->timestamp,
            'created_by' => null,
            'is_deleted' => false,
            // 'language' => 'en',
        ]);
    }
}
