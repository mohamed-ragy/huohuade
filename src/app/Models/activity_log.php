<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class activity_log extends Model
{
    use HasFactory;
    protected $collection = 'activity_logs';
    protected  $connection = 'mongodb';
    public $timestamps = false;

    protected $fillable = [
        'coach_id','coach_name_en','coach_name_ch',
        'player_id','player_name_en','player_name_ch',
        'location_id','location_name_en','location_name_ch',
        'payment_id','lesson_id',
        'created_by','created_at',
    ];

    public function coach(){
        return $this->belongsTo(coach::class,'created_by','id');
    }

}
