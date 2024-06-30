<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'comments';

    protected $fillable = [
        'post_id',
        'user_id',
        'comment'
    ];

    function post(){
        return $this->belongsTo(Post::class,'post_id');
    }

    function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
