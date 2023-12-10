<?php

namespace App\Console;

use App\Models\activity_log;
use App\Models\lesson;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function(){

            $unfinished_lessons = lesson::where([
                'status' => 'upcoming'
            ])->where('date','<',Carbon::today()->timestamp)->get();
            foreach($unfinished_lessons as $lesson){
                lesson::where('id',$lesson->id)->update([
                    'status' => 'canceled',
                    'cancelation_reason' => '--',
                ]);
                activity_log::create([
                    'code' => 'lesson.cancel',
                    'created_at' => Carbon::now()->timestamp,
                    'created_by' => 0,
                    'created_by_name_en' => 'The system',
                    'created_by_name_ch' => '系统',
                    'lesson_id' => $lesson->id,
                ]);
            }

        // })->dailyAt('04:00');
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');


    }
}
