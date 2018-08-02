<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
		'name','description', 'quantity','place','status','caution','type','association',
	];
	protected $table = 'items';

	public function associations()
	{
		return $this->belongsTo('App\Association', 'association');
	}

	public function itemtypes()
	{
		return $this->belongsTo('App\ItemType', 'type');
	}

	public function itemplaces()
	{
		return $this->belongsTo('App\ItemPlace', 'place');
	}

}
