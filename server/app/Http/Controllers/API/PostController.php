<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Interfaces\PostInterface;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private $postRepository;
    public function __construct(PostInterface $postRepository) {
        $this->postRepository = $postRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $posts = $this->postRepository->index($request);
        if($posts)
        {
            return PostResource::collection($posts)->additional([
                'success' => true,
                'message'=>"Posts list is successfully fetched.",
            ]);
        }
        return response()->json([
            'success' => false,
            'statusCode' => 404,
            'message' => 'Not found posts list data!',
        ], 404);
    }

    /**
     * Display a post of the resource.
     */
    public function show(string $slug)
    {
        $post = $this->postRepository->show($slug);
        if($post){
            return new PostResource($post,"Post data is successfully fetched.");
        }
        return response()->json([
            'success' => false,
            'statusCode' => 404,
            'message' => 'Not found post data!',
        ], 404);
    }

    /**
     * Store comment of the post.
     */
    public function comment(Post $post, CommentRequest $request)
    {
        $user = auth()->user();
        $comment = $this->postRepository->comment($post, $user, $request->comment);
        if($comment){
            return new CommentResource($comment,"Post comment is successfully saved.");
        }
        return response()->json([
            'success' => false,
            'statusCode' => 400,
            'message' => 'Error in saving comment',
        ], 400);
    }
}
