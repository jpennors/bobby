<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingLinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking_lines', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('booking')->unsigned();
            $table->integer('item')->unsigned();
            $table->integer('quantity')->unsigned();
            $table->timestamp('startDate');
            $table->timestamp('endDate');
            $table->integer('status');

            $table->foreign('item')->references('id')->on('items');
            $table->foreign('booking')->references('id')->on('bookings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('booking_lines');
    }
}
