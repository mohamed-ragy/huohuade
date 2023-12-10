<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\HybridRelations;


class lesson_note extends Model
{
    use HybridRelations;
    protected $collection = 'lesson_notes';
    protected  $connection = 'mongodb';
    public $timestamps = false;
    protected $fillable = [
        'lesson_id',
        'coach_id',
        'coach_name_en',
        'coach_name_ch',
        'note',
        'is_pinned',
        'created_at',
    ];
    public function lesson(){
        return $this->hasOne(lesson::class);
    }
    public function coaches(){
        return $this->hasOne(coach::class,'id','coach_id');
    }
}
