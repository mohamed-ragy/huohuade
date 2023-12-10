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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('status');
            $table->string('cancelation_reason')->nullable();
            $table->string('start_at');
            $table->string('end_at');
            $table->string('started_at')->nullable();
            $table->string('ended_at')->nullable();
            $table->unsignedBigInteger('location_id');
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('cascade');
            $table->string('court');
            // $table->unsignedBigInteger('canceled_by')->nullable();
            // $table->foreign('canceled_by')->references('id')->on('coaches')->onDelete('set null');
            // $table->string('canceled_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
