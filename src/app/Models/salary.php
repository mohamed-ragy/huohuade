<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class salary extends Model
{
    use HasFactory;
    protected $connection = 'mysql';
    protected $table = 'salaries';
    public $timestamps = false;
    protected $fillable = [
        'coach_id',
        'coach_name_en',
        'coach_name_ch',
        'amount',
        'currency',
        'description',
        'created_at',
    ];
}
