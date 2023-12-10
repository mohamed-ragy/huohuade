<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\HybridRelations;

class lesson extends Model
{
    use HybridRelations;
    protected $connection = 'mysql';
    protected $table = 'lessons';
    public $timestamps = false;
    protected $fillable = [
        'status',
        'cancelation_reason',
        'start_at',
        'end_at',
        'started_at',
        'ended_at',
        'location_id',
        'court',
        // 'canceled_by',
        // 'canceled_at',
    ];

    public function location(){
        return $this->hasOne(location::class,'id','location_id');
    }
    public function players(){
        return $this->belongsToMany(player::class,'lessons_players','lesson_id','player_id')->withPivot('is_attend','attend_at','finish_at');
    }
    public function coaches(){
        return $this->belongsToMany(coach::class,'lessons_coaches','lesson_id','coach_id')->withPivot('is_attend','attend_at','finish_at');;
    }
    public function notes(){
        return $this->hasMany(lesson_note::class);
    }
    public function activites(){
        return $this->hasMany(activity_log::class);
    }
    // public function canceled_by(){
    //     return $this->hasOne(coach::class,'canceled_by','id');
    // }
}
///statuses
//=> upcoming
//=> ongoing
//=> finished
//=> canceled
