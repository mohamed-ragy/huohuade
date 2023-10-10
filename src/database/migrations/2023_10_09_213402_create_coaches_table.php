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
            $table->string('name_en');
            $table->string('name_ch');
            $table->string('job_title');
            $table->boolean('is_master');
            $table->string('authorities');
            $table->string('salary')->nullable();
            $table->string('created_at');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('coaches')->onDelete('set null');
            $table->boolean('is_deleted');
            $table->string('language');

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
