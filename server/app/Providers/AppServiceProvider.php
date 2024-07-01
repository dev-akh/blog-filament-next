<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Passport::enablePasswordGrant();
        Passport::tokensExpireIn(now()->addDays(15));
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
        VerifyEmail::createUrlUsing(function (object $notifiable) {
            return $this->generateVerifyLink($notifiable);
        });
    }

    function generateVerifyLink($notifiable) : String {
        $params = [
            "expires" => Carbon::now()
              ->addMinutes(60)
              ->getTimestamp(),
            "id" => $notifiable->getKey(),
            "hash" => sha1($notifiable->getEmailForVerification()),
          ];
    
          ksort($params);
    
          // then create API url for verification. my API have `/api` prefix,
          // so i don't want to show that url to users
          $url = URL::route("verification.verify", $params, true);
    
          // get APP_KEY from config and create signature
          $key = config("app.key");
          $signature = hash_hmac("sha256", $url, $key);
    
          // generate url for yous SPA page to send it to user
          return config('app.frontend_url') .
            "/verify-email/" .
            $params["id"] .
            "/" .
            $params["hash"] .
            "?expires=" .
            $params["expires"] .
            "&signature=" .
            $signature;
    }
}
