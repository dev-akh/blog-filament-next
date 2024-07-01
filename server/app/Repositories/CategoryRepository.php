<?php 

namespace App\Repositories;

use App\Models\Category;
use App\Interfaces\CategoryInterface;
use Illuminate\Http\Request;

class CategoryRepository implements CategoryInterface {

    protected $request;
    public function __construct(Request $request) {
        $this->request = $request;
    }

    function index($request) {
        $per_page = (int)$request->per_page ?? 20;
        $sorting  = $request->sorting ?? 'desc';    
        $categories = Category::orderBy('created_at',$sorting)
                              ->paginate($per_page);
        return $categories;
    }
}
