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
        Schema::connection('mongodb')->drop('lesson_notes');
        Schema::connection('mongodb')->create('lesson_notes', function ($collection) {
            $collection->index('lesson_id');
            $collection->index('coach_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mongodb')->drop('lesson_notes');
        Schema::dropIfExists('lesson_notes');
    }
};
