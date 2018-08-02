<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingLineRequest extends FormRequest
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
            'booking'  =>  'integer'.($this->isMethod('put')?'':'|required'),
            'item'  =>  'integer|exists:Items,id',
            'quantity'  =>  'integer'.($this->isMethod('put')?'':'|required'),
            'startDate'  =>  'date'.($this->isMethod('put')?'':'|required'),
            'endDate'  =>  'date'.($this->isMethod('put')?'':'|required'),
            'status'    =>  'integer'.($this->isMethod('put')?'':'|required'),
        ];
    }
}
