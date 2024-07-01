<?php 

namespace App\Repositories;

use App\Models\Post;
use App\Interfaces\PostInterface;
use App\Models\Comment;
use Illuminate\Http\Request;

class PostRepository implements PostInterface {

    protected $request;
    public function __construct(Request $request) {
        $this->request = $request;
    }

    function index($request) {
        $per_page = (int)$request->per_page ?? 20;
        $sorting  = $request->sorting ?? 'desc';    
        $posts = Post::where('published',true)
                    ->orderBy('created_at',$sorting)
                    ->paginate($per_page);
        return $posts;
    }

    function show($slug){
        $post = Post::where('published',true)
                ->where('slug',$slug)
                ->first();
        return $post;
    }

    function comment($post, $user, $comment){
        $comment = Comment::create([
            'post_id' => $post->id,
            'user_id' => $user->id,
            'comment' => $comment
        ]);
        return $comment;
    }
}
