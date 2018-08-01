<?php

use Illuminate\Database\Seeder;
use App\Booking;

class BookingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bookings = [
        	[
        		'owner' => 1,
        		'booker'	=>	2,
        		'user'	=>	1,
                'status'    =>  1,
                'cautionReceived' => false,
                'caution' =>  100,
	        ],
	        [
                'owner' => 2,
                'booker'    =>  3,
                'user'  =>  1,
                'status'    =>  1,
                'cautionReceived' => true,
                'caution' =>  100,
            ],
	        [
                'owner' => 1,
                'booker'    =>  2,
                'user'  =>  2,
                'status'    =>  1,
                'cautionReceived' => false,
                'caution' =>  100,
            ],
        ];

        foreach ($bookings as $booking => $values){
            Booking::create($values);
        }

    }
}
