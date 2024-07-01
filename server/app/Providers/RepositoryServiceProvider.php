<?php

namespace App\Providers;

use App\Interfaces\CategoryInterface;
use App\Interfaces\PostInterface;
use App\Repositories\CategoryRepository;
use App\Repositories\PostRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(CategoryInterface::class,CategoryRepository::class);
        $this->app->bind(PostInterface::class,PostRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
