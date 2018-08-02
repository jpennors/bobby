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
            'owner' =>  'integer'.($this->isMethod('put')?'':'|required'),
            'booker'    =>  'integer'.($this->isMethod('put')?'':'|required'),
            'user'  =>  'integer'.($this->isMethod('put')?'':'|required'),
            'status'    =>  'integer'.($this->isMethod('put')?'':'|required'),
            'cautionReceived'   => 'boolean'.($this->isMethod('put')?'':'|required'),
            'caution'   =>  'integer'.($this->isMethod('put')?'':'|required'),
        ];
    }
}
