<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class location extends Model
{
    protected $connection = 'mysql';
    protected $table = 'locations';
    public $timestamps = false;
    protected $fillable = [
        'name_en',
        'name_ch',
        'profile_picture',
        'lng',
        'lat',
        'contact_info',
        'courts',
        'created_at',
        'is_deleted',
    ];
    protected $casts = [
        'contact_info' => 'array',
        'courts' => 'array'
]   ;
}
