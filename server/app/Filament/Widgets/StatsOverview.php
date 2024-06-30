<?php

namespace App\Filament\Widgets;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;
    protected static ?string $pollingInterval = '10s';

    protected function getStats(): array
    {
        return [
            Stat::make('Total Categories',Category::count())
                ->description('Categories count in system')
                ->icon('heroicon-m-arrow-trending-up')
                ->color('warning'),
            Stat::make('Total Posts',Post::count())
                ->description('Posts count in system')
                ->icon('heroicon-m-arrow-trending-up')
                ->color('danger'),
            Stat::make('Total Users',User::count())
                ->description('Users count in system')
                ->icon('heroicon-m-arrow-trending-up')
                ->color('success'),
        ];
    }
}
