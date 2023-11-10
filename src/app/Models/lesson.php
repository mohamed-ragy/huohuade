<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class lesson extends Model
{
    protected $connection = 'mysql';
    protected $table = 'lessons';
    public $timestamps = false;
    protected $fillable = [
        'status',
        'date',
        'started_at',
        'ended_at',
        'location_id',
        // 'canceled_by',
        // 'canceled_at',
    ];

    public function location(){
        return $this->hasOne(location::class,'id','location_id');
    }
    public function players(){
        return $this->belongsToMany(player::class,'lessons_players','lesson_id','player_id');
    }
    public function coaches(){
        return $this->belongsToMany(coach::class,'lessons_coaches','lesson_id','coach_id');
    }
    public function notes(){
        return $this->hasMany(lesson_note::class,'lesson_id','id');
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
