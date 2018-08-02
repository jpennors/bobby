<?php

use Illuminate\Database\Seeder;
use App\BookingLine;

class BookingLinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $booking_lines = [
        	[
        		'booking' => 1,
        		'item'	=>	2,
        		'quantity'	=>	1,
                'startDate' => '2018-04-14',
                'endDate' => '2018-04-14',
                'status' =>  1,
	        ],
	        [
        		'booking' => 1,
        		'item'	=>	2,
        		'quantity'	=>	1,
                'startDate' => '2018-04-14',
                'endDate' => '2018-04-14',
                'status' =>  1,
	        ],
	        [
        		'booking' => 3,
        		'item'	=>	1,
        		'quantity'	=>	10,
                'startDate' => '2018-04-14',
                'endDate' => '2018-04-14',
                'status' =>  1,
	        ],
        ];

        foreach ($booking_lines as $booking_line => $values){
            BookingLine::create($values);
        }

    }
}
