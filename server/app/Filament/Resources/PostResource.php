<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Filament\Resources\PostResource\RelationManagers;
use App\Filament\Resources\PostResource\RelationManagers\CategoriesRelationManager;
use App\Filament\Resources\PostResource\RelationManagers\CommentsRelationManager;
use App\Models\Category;
use App\Models\Post;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Forms\Set;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Illuminate\Support\Str;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    public static function form(Form $form): Form
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

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->words(3)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->limit(20)
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
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            CategoriesRelationManager::class,
            CommentsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
