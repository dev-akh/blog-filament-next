<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(150),
                TextInput::make('email')
                    ->label('Email address')
                    ->required()
                    ->email()
                    ->maxLength(150)
                    ->unique(column: 'email', ignoreRecord: true),
                TextInput::make('password')
                    ->required()
                    ->password()
                    ->maxLength(20)
                    ->minLength(6)
                    ->revealable(),
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->words(4)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->limit(60)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email_verified_at')
                    ->badge()
                    ->label('Email Verified')
                    ->getStateUsing(fn ($record) => $record->email_verified_at ? 'Verified' : 'Not Verified')
                    ->colors([
                        'success' => 'Verified',
                        'danger' => 'Not Verified',
                    ]),
                TextColumn::make('created_at')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                TernaryFilter::make('email_verified_at')
                    ->label('Email Verified')
                    ->trueLabel('Verified')
                    ->falseLabel('Not Verified')
                    ->queries(
                        true: fn (Builder $query) => $query->whereNotNull('email_verified_at'),
                        false: fn (Builder $query) => $query->whereNull('email_verified_at'),
                    ),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
