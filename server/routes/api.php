<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/refresh-token', [AuthController::class, 'refreshToken']);

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.reset');

Route::get('/categories', [CategoryController::class, 'index'])->name('category.index');
Route::get('/posts', [PostController::class, 'index'])->name('post.index');
Route::get('/posts/{slug}', [PostController::class, 'show'])->name('post.show');

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/verify-user/{user}/{has}', [AuthController::class, 'verify'])->name('verify.user');
    Route::post('/post/comment/{post}', [PostController::class, 'comment'])->name('post.comment');
});
