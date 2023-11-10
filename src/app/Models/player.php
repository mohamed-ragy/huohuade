<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class player extends Model
{
    protected $connection = 'mysql';
    protected $table = 'players';
    public $timestamps = false;
    protected $fillable = [
        'profile_picture',
        'name_en',
        'name_ch',
        'birthdate',
        'gender',
        'created_at',
        'is_deleted'
    ];

    public function lessons(){
        return $this->belongsToMany(lesson::class,'lessons_players','player_id','lesson_id');
    }
}
