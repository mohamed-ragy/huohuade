<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class coach extends Authenticatable
{
    protected $connection = 'mysql';
    protected $table = 'coaches';
    protected $guard = 'coach';
    public $timestamps = false;

    protected $fillable = [
        'login_name',
        'password',
        'profile_picture',
        'name_en',
        'name_ch',
        'coach_level',
        'gendar',
        'salary',
        'created_at',
        'created_by',
        'is_deleted',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
///coach levels
// 0 => Administrator coach
// 1 => Manager coach
// 2 => Senior coach
// 3 => Basic coach
// 4 => Coach in training
