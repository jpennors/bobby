<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BookingLineRequest;
use App\Http\Controllers\Controller;
use App\BookingLine;
use App\Booking;
use App\Item;

class BookingLineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $bookinglines = BookingLine::all();
        return response()->json($bookinglines, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function storeOne(Array $request)
    {
        //dd($request);
        $b = Booking::findOrFail($request['booking']);
        /*dd($b);*/

        $bookingline = new BookingLine();
        $bookingline->booking = $request['booking'];
        $bookingline->item = $request['item'];
        $bookingline->quantity = $request['quantity'];
        $bookingline->startDate = $request['startDate'];
        $bookingline->endDate = $request['endDate'];
        $bookingline->status = $request['status'];

        $bookingline->save();

        if($bookingline)
        {
            $bookingline->item = Item::find($bookingline['item']);
            return response()->json($bookingline, 200);
        }
        else
        {
            return response()->json(["message" => "Impossible de créer l'objet"], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        $bookingline = BookingLine::find($id);
        //$bookingline->item = $bookingline->items()->get();
        
        $bookingline->item = Item::find($bookingline->item);
        if($bookingline)
            return response()->json($bookingline, 200);
        else
            return response()->json(["message" => "Impossible de trouver l'objet"], 500);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        $bookingline = BookingLine::find($id);
        if($bookingline){
            $value = $bookingline->update($request->input());
            if($value)
                return response()->json($value, 201);
            return response()->json(['message'=>'An error ocured'],500);
        }
        return response()->json(["message" => "Impossible de trouver l'objet"], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $bookingline = BookingLine::find($id);
        if ($bookingline)
        {
            $bookingline->delete();
            return response()->json([], 200);
        }
        else
            return response()->json(["message" => "Impossible de trouver l'objet"], 500);
    }

    public function store(Request $request){

       $bookinglines = [];
        foreach ($request->items as $item) {
            array_push($bookinglines, $this->storeOne($item));
        }

        return response()->json($bookinglines, 200);
    }
    
}