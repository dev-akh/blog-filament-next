<?php

namespace App\Filament\Resources\CategoryResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Illuminate\Support\Str;
use Filament\Forms\Set;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PostsRelationManager extends RelationManager
{
    protected static string $relationship = 'posts';

    public function form(Form $form): Form
    {
        return $form
        ->schema([
            Group::make()
                ->schema([
                    Section::make('Create a post')
                    ->description('create a post over here.')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(200)
                            ->live()
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(150)
                            ->readOnly()
                            ->unique(column: 'slug', ignoreRecord: true),
                        Select::make('categories')
                            ->multiple()
                            ->required()
                            ->relationship('categories','name')
                            ->columnSpan(2)
                    ])->columns(2)
                ])->columns([
                    'sm' => 1,
                    'md' => 1,
                    'xl' => 2,
                    '2xl' => 2,
                ])
                ->columnSpan([
                    'sm' => 1,
                    'md' => 1,
                    'xl' => 2,
                    '2xl' => 2,
                ]),
            Group::make()
                ->schema([
                    Section::make('Post Image')
                        ->schema([
                            FileUpload::make('image')
                                ->image()
                                ->imageEditor()
                                ->required(),
                        ]),
                ])
                ->columns(1)
                ->columnSpan(1),
            Section::make('Create pretty content here')
                ->schema([
                    RichEditor::make('content')
                    ->disableToolbarButtons([
                        'attachFiles',
                    ])
                    ->required(),
                ])
                ->columnSpan([
                    'md' => 3,
                    'xl' => 3
                ]),
            Section::make('Publish or Unpublish')
                ->schema([
                    Toggle::make('published')
                        ->onColor('success')
                        ->offColor('danger')
                ]),
        ])->columns([
            'sm' => 1,
            'md' => 3,
            'xl' => 3,
            '2xl' => 3,
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                TextColumn::make('title')
                    ->words(4)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->limit(60)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('categories.name')
                    ->badge()
                    ->separator(','),
                ToggleColumn::make('published'),
                TextColumn::make('created_at')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                TernaryFilter::make('published')
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
