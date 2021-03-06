<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemPlaceRequest extends FormRequest
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
            'name' =>  'string|between:2,191|required|unique:itemPlaces,name,'.\Request::instance()->id.',id,deleted_at,NULL',
        ];
    }
}
