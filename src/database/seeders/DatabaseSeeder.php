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
            'login_name' => 'huohuade',
            'password' => bcrypt('huohuade'),
            'name_en' => 'huohuade',
            'name_ch' => '霍华德',
            'job_title' => 'GM',
            'is_master' => true,
            'authorities' => '1111111111',
            'salary' => null,
            'created_at' => Carbon::now()->timestamp,
            'created_by' => null,
            'is_deleted' => false,
            'language' => 'en',
        ]);
    }
}
