<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class activity_log extends Model
{
    protected $collection = 'activity_logs';
    protected  $connection = 'mongodb';
    public $timestamps = false;

    protected $fillable = [
        'code','created_by','created_by_name_en','created_by_name_ch','created_at',
        'coach_id','coach_name_en','coach_name_ch',
        'player_id','player_name_en','player_name_ch',
        'location_id','location_name_en','location_name_ch','location_contact_name_en','location_contact_name_ch',
        'payment_id','lesson_id',
    ];

    public function coach(){
        return $this->belongsTo(coach::class,'created_by','id');
    }

}
