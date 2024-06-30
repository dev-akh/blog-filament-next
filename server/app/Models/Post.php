<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'posts';

    protected $fillable = [
        'title',
        'slug',
        'image',
        'published',
        'content'
    ];

    protected $casts = [
        'published' => 'boolean',
    ];

    function categories() {
        return $this->belongsToMany(Category::class, 'category_posts')->withTimestamps();
    }

    function comments() {
        return $this->hasMany(Comment::class,'post_id');
    }
}
