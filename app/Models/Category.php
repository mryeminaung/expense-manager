<?php

namespace App\Models;

use App\Enums\CategoryType;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'type'];

    protected function casts(): array
    {
        return [
            'type' => CategoryType::class,
        ];
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
