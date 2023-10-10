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
        'name_en',
        'name_ch',
        'job_title',
        'is_master',
        'authorities',
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
