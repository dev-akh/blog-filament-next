<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::where('email', 'admin@localhost.com')->doesntExist()) {
            User::factory()->firstUser()->OrCreate();
        }
        User::factory(25)->create();
    }
}
