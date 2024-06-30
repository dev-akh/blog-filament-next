<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{

    protected $model = Post::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title =  $this->faker->words(5, true);
        $content = $this->faker->paragraphs(3, true);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'image' => $this->faker->imageUrl(),
            'published' => $this->faker->boolean(80),
            'content' => $content,
        ];
    }
}
