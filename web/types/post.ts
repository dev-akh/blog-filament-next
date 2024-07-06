import { Category } from '@/types/category';
import { Comment } from '@/types/comment';
import { User } from '@/types/user';

export interface Post {
    id: number;
    title: string;
    slug: string;
    image: string;
    content: string;
    updated_at: string;
    created_at: string;
    categories: Category[];
    comments: Comment[];
    user?: User
}
