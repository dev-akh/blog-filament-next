<?php

namespace App\Interfaces;

interface PostInterface
{
    public function index($request);
    public function show($slug);
    public function comment($post, $user, $comment);
}
