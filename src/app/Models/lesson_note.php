<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;


class lesson_note extends Model
{
    protected $collection = 'lesson_notes';
    protected  $connection = 'mongodb';
    public $timestamps = false;
    protected $fillable = [
        'lesson_id',
        'coach_id',
        'coach_name_en',
        'coach_name_ch',
        'note',
        'created_at',
    ];
    public function lesson(){
        return $this->hasOne(lesson::class);
    }
}
