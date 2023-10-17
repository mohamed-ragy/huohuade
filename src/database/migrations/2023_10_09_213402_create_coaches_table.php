<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coaches', function (Blueprint $table) {
            $table->id();
            $table->rememberToken();
            $table->string('login_name');
            $table->string('password');
            $table->string('profile_picture')->nullable();
            $table->string('name_en');
            $table->string('name_ch');
            $table->integer('coach_level');
            $table->string('gender');
            $table->integer('salary');
            $table->string('salary_currency');
            $table->string('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coaches');
    }
};
