<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class location extends Model
{
    protected $connection = 'mysql';
    protected $table = 'locations';
    public $timestamps = false;
    protected $fillable = [
        'name_en','name_ch','profile_picture',
        'lng','lat',
        'contact_info',
        'created_at',
    ];
    protected $casts = ['contact_info'=>'array'];
}
