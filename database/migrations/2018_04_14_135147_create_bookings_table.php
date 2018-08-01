<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('owner')->unsigned();
            $table->integer('booker')->unsigned();
            $table->integer('user')->unsigned();
            $table->integer('status');
            $table->boolean('cautionReceived');
            $table->integer('caution')->unsigned();

            $table->foreign('owner')->references('id')->on('associations');
            $table->foreign('booker')->references('id')->on('associations');
            $table->foreign('user')->references('id')->on('users');
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
        Schema::dropIfExists('bookings');
    }
}
