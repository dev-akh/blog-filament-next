import { Post } from "@/types/post";
import { User } from "@/types/user";

export interface Comment {
    id: number;
    post_id?: number;
    comment: string;
    user_id?: number;
    created_at: string;
    updated_at: string;
    post?: Post,
    user?: User
}
