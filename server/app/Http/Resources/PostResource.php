<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{
    protected $message;

    public function __construct($resource, $message) {
        parent::__construct($resource);
        $this->message = $message;
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $commentsWithUserInfo = $this->comments->map(function ($comment) {
            return [
                'id'      => $comment->id,
                'comment' => $comment->comment,
                'user' => [
                    'id'    => $comment->user->id,
                    'name'  => $comment->user->name,
                    'email' => $comment->user->email
                ],
                'created_at' => $comment->created_at,
                'updated_at' => $comment->updated_at,
            ];
        });

        return [
            'id'                => $this->id,
            'title'             => $this->title,
            'slug'              => $this->slug,
            'image'             => $this->image ? url('storage/' . $this->image) : url('/images/blog-default.png'),
            'content'           => $this->content,
            'updated_at'        => $this->updated_at,
            'created_at'        => $this->created_at,
            'categories'        => $this->categories,
            'comments'          => $commentsWithUserInfo->toArray(),
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function with($request)
    {
        return [
            'success' => true,
            'message' => $this->message
        ];
    }
}
