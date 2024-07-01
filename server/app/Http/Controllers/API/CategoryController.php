<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Interfaces\CategoryInterface;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $categoryRepository;
    public function __construct(CategoryInterface $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = $this->categoryRepository->index($request);
        if($categories){
            return CategoryResource::collection($categories)->additional([
                'success' => true,
                'message'=>"Categories list is successfully fetched.",
            ]);
        }
        return response()->json([
            'success' => false,
            'statusCode' => 404,
            'message' => 'Not found categories list data!',
        ], 404);
    }
}
