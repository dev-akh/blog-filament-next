<?php

namespace App\Filament\Widgets;

use App\Models\Post;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class PostsChart extends ChartWidget
{
    protected static ?int $sort = 2;
    protected static ?string $heading = 'Posts count each month';
    protected static ?string $pollingInterval = '10s';

    protected function getData(): array
    {
        $data = $this->getPostsPerMonth();
        return [
            'datasets' => [
                [
                    'label' => "Blog posts created",
                    'data'  => $data['postsPerMonth']
                ]
            ],
            'labels' => $data['months']

        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    function getPostsPerMonth(): array {
        $now = Carbon::now();
        $postsPerMonth=[];
        $months = collect(range(1,12))->map(function($month) use ($now, &$postsPerMonth){
            $count = Post::whereMonth('created_at', Carbon::parse($now->month($month)->format('Y-m')))->count();
            $postsPerMonth[] = $count;
            return $now->month($month)->format('M');
        })->toArray();
        return [
            'postsPerMonth' => $postsPerMonth,
            'months'        => $months
        ];
    }
}
