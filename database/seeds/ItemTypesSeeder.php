<?php

use Illuminate\Database\Seeder;
use App\ItemType;

class ItemTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $item_types = [
        	[
        		'name' => 'Mobilier intérieur',
	        ],
	        [
                'name' => 'Mobilier extérieur',
            ],
	        [
                'name' => 'Sécurité',
            ],
            [
                'name' => 'Outils',
            ],
            [
                'name' => 'Cuisine',
            ],
            [
                'name' => 'Décoration',
            ],
            [
                'name' => 'Jeux',
            ],
            [
                'name' => 'High Tech',
            ],
            [
                'name' => 'Divers',
            ],
        ];

        foreach ($item_types as $item_type => $values){
            ItemType::create($values);
        }

    }
}
