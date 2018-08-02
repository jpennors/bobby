<?php

use Illuminate\Http\Request;
use App\User;
use App\ItemType;
use App\Item;
use App\Association;
use Illuminate\Support\Str;
use App\Booking;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')->group(function () {
	Route::apiResources([
			'associations'		=> 'AssociationController',
			'bookings'	=> 'BookingController',
			'users'			=> 'UserController',
			'bookinglines'			=> 'BookingLineController',
			'items'			=> 'ItemController',
			'itemtypes'		=> 'ItemTypeController',
			'assousers'		=>	'AssoUserController',
            'itemplaces'    =>  'ItemPlaceController',
	]);

    Route::get('items/categories/{categorie}',function ($categorie){

        $items = Item::all()->where('type', $categorie)->where('status', '<', 3);
        foreach ($items as $item) {
            $item->associationName = $item->associations->name;
            $item->placeName = $item->itemplaces->name;
        }
        return $items;
    });


    Route::get('association/items/{asso_id}', function($asso_id){
        $items = Item::all()->where('association', $asso_id);
        foreach ($items as $item) {
            if($item->type)
                $item->typeName = $item->itemtypes->name;
            if($item->place)
                $item->placeName = $item->itemplaces->name;
            switch ($item->status) {
                case '1':
                    $item->statusName = 'Visible';
                    break;
                case '2':
                    $item->statusName = 'Visible et non empruntable';
                    break;
                case '3':
                    $item->statusName = 'Invisible';
                    break;

                default:
                    $item->statusName = 'Visible';
                    break;
            }
            $item->edit = null;
        }
        return $items;
    });

    Route::get('booking/assos/{asso_id}', function($asso_id){
        return $assos = Association::all()->where('id', '<>', $asso_id);
    });

    Route::get('booking/items/{asso_id}', function($asso_id){
        return $items = Item::all()->where('association', $asso_id);
        //->where('status', 1);
    });

    Route::get('booking/validation/item/{item_id}', function($item_id){
        $item = Item::find($item_id)->caution;
        return($item);
    });

    Route::post('booking/validation/items', 'bookingController@calculCaution');


	Route::get('assousers/users/{user}', function ($user_id) {

    	return $assos = User::find($user_id)->associations();
    });

    Route::get('bookings/asso/{asso_id}', 'bookingController@indexAssociation');


    Route::get('associations/booking/{owner}/{type}', function($association_id, $type_id) {
    	return Association::find($association_id)->bookings()->where('status', $type_id)->with('bookinglines')->get();

    	return Association::find($association_id)->bookings()->where('bookings.status', $type_id)->join('booking_lines', 'bookings.id', '=', 'booking_lines.booking')->join('items', 'booking_lines.item', '=', 'items.id')->get();
    });
});
