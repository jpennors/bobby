<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
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
            'owner'             =>  'integer|min:0'.($this->isMethod('put')?'':'|required'),
            'booker'            =>  'integer|min:0'.($this->isMethod('put')?'':'|required'),
            'user'              =>  'integer'.($this->isMethod('put')?'':'|required'),
            /*'login'             =>  'string|size:8'.($this->isMethod('put')?'':'|required')*/
            'status'            =>  'integer|min:1|max:4'.($this->isMethod('put')?'':'|required'),
            'cautionReceived'   =>  'boolean'.($this->isMethod('put')?'':'|required'),
            'caution'           =>  'integer|min:0'.($this->isMethod('put')?'':'|required'),
        ];
    }
}
