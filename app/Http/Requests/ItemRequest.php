<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'          =>  'unique:items,name->ignore('.$this->id.')|string|between:2,191'.($this->isMethod('put')?'':'|required'),
            'quantity'      =>  'integer|min:0|'.($this->isMethod('put')?'':'|required'),
            'place'         => 'exists:itemplaces,id|integer|min:0'.($this->isMethod('put')?'':'|required'),
            'status'        =>  'integer|min:1|max:3'.($this->isMethod('put')?'':'|required'),
            'caution'       =>  'integer|min:0'.($this->isMethod('put')?'':'|required'),
            'type'          =>  'exists:itemtypes,id|integer|min:0'.($this->isMethod('put')?'':'|required'),
            'association'   =>  'integer|min:0'.($this->isMethod('put')?'':'|required'),
        ];
    }

 
}
