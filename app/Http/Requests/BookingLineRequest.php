;;             <?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

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
            'booking'   =>  'exists:bookings,id|integer|min:0'.($this->isMethod('put')?'':'|required'),
            'item'      =>  'integer|exists:items,id|min:0'.($this->isMethod('put')?'':'|required'),
            'quantity'  =>  'integer|min:0'.($this->isMethod('put')?'':'|required'),
            'startDate' =>  'date|after_or_equal:'.Carbon::now().''.($this->isMethod('put')?'':'|required'),
            'endDate'   =>  'date|after_or_equal:startDate'.($this->isMethod('put')?'':'|required'),
            'status'    =>  'integer|min:1|max:4'.($this->isMethod('put')?'':'|required'),
        ];
    }
}
