import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';
import { Post } from '@/types/post';
import { Comment as CommentType } from '@/types/comment';
import { formatDate } from '@/services/dateFormat';
import defaultBlogImage from '@/assets/images/blog-320x200.png';
import { getPost, posts as postsEndpoint, comment as commentEndpoint } from "@/services/endpoints";
import * as api from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);
  const [token, setToken] = useState<string>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    setComments(post.comments ?? []);
    const token = localStorage.getItem('access_token');
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
  }, [post?.comments]);

  if (router.isFallback) {
    return <div><LoadingSpinner/></div>;
  }

  const imageSrc: string = post.image ?? defaultBlogImage;
  const postDate: string = formatDate(post.created_at);

  const handleCommentSubmit = async () => {
    setIsSubmit(true);
    try {
      const singlePostComment = commentEndpoint.replace(':postId', String(post.id));
      const response = await api.post(singlePostComment, { comment }, { Authorization: `Bearer ${token}` });
      if (response.data) {
        setComments((prev: CommentType[]) => [...prev, response.data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmit(false);
      setComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link href="/" legacyBehavior>
        <a className="text-blue-600">&larr; Back to Blogs</a>
      </Link>
      <div className="mt-4 bg-white shadow-md rounded-md overflow-hidden">
        <Image className="w-full h-64 object-cover" src={imageSrc} alt="Blog Image" width={1000} height={400} />
        <div className="p-6">
          <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <FaClock />
            <span className="ml-2">{postDate}</span>
          </div>
          <div className="mb-4">
            {post.categories.map(category => (
              <span key={category.id} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {category.name}
              </span>
            ))}
          </div>
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <div className="mt-6 border-t border-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <ul className="list-none">
              {comments.length > 0 && comments.map((comment: CommentType) => (
                <li key={comment.id} className="border-b border-gray-200 py-4">
                  <div className="flex items-center mb-2">
                    <div className="text-gray-700 font-semibold">{comment.user?.name}</div>
                    <span className="text-gray-500 text-xs ml-2">{formatDate(comment.created_at)}</span>
                  </div>
                  <p className="text-gray-800">{comment.comment}</p>
                </li>
              ))}
            </ul>
          </div>
          {isLoggedIn && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Enter your comment..."
                className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-100"
              />
              {!isSubmit ? (
                <button
                  onClick={handleCommentSubmit}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit Comment
                </button>
              ) : (
                <button
                  className="mt-2 px-4 py-2 bg-blue-300 text-white rounded" disabled
                >
                  Submitting...
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await api.get(`${postsEndpoint}?per_page=10000`);
  const paths = posts.data.map((post: Post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const singlePost = getPost.replace(':slug', slug);
  const post = await api.get(singlePost);
  if (!post.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: post.data,
    },
    revalidate: 1,
  };
};

export default BlogPost;
