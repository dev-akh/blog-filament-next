<?php

namespace App\Filament\Widgets;

use App\Models\Post;
use Filament\Widgets\ChartWidget;

class PostsPublishedChart extends ChartWidget
{
    protected static ?int $sort = 3;
    protected static ?string $heading = 'Publish & Unpublish posts';
    protected static ?string $pollingInterval = '10s';

    protected function getData(): array
    {
        $data = $this->getPublishedPosts();
        return [
           'datasets' => [
                [
                    'label' => "Posts",
                    'data'  => $data
                ]
            ]
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    function getPublishedPosts(): array {
        $published   = Post::where('published',true)->count();
        $unpublished = Post::where('published',false)->count();
            
        return [
            'Published'     => $published,
            'Unpublished'   => $unpublished
        ];
    }
}
