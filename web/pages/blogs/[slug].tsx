import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';
import DOMPurify from 'dompurify';
import { FaClock, FaUser } from 'react-icons/fa';
import { Post } from '@/types/post';
import { Comment as CommentType } from '@/types/comment';
import { formatDate } from '@/services/dateFormat';
import defaultBlogImage from '@/assets/images/blog-320x200.png';
import { getPost, posts as postsEndpoint, comment as commentEndpoint } from "@/services/endpoints";
import * as api from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SOCKET_URL } from '@/config';

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const [safeContent, setSafeContent] = useState<string>('');

  useEffect(() => {
    setComments(post.comments);
    if (post.content) {
      setSafeContent(DOMPurify.sanitize(post.content));
    }
    const token = localStorage.getItem('access_token');
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
  }, [post.comments, post.content]);

  useEffect(() => {
      const socket = io(SOCKET_URL);
      socket.on('comment', (newComment: CommentType) => {
        if (!comments.some(comment => comment.id === newComment.id) && newComment.post?.id === post.id) {
          setComments(prevComments => [...prevComments, newComment]);
        }
      });

      setSocket(socket);
      return () => {
        socket.disconnect();
      };
  }, [comments, post.id]);

  const handleCommentSubmit = async () => {
    setIsSubmit(true);
    try {
      const singlePostComment = commentEndpoint.replace(':postId', String(post.id));
      const response = await api.post(singlePostComment, { comment }, { Authorization: `Bearer ${token}` });

      if (response.data && socket) {
        if (!comments.some(comment => comment.id === response.data.id) && response.data.post?.id === post.id) {
          socket.emit("comment", response.data);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmit(false);
      setComment('');
    }
  };

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  const imageSrc: string = post.image ?? defaultBlogImage;
  const postDate: string = formatDate(post.created_at);

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
            <div dangerouslySetInnerHTML={{ __html: safeContent }} />
          </div>
          <div className="mt-6 border-t border-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Comments <span className='text-xl'>({comments.length})</span></h2>
            <ul className="list-none">
              {comments.map((comment) => (
                <li key={comment.id} className="border-b border-gray-200 py-4">
                  <div className="flex items-center mb-2">
                  <div className="flex items-center text-gray-700 font-semibold">
                    <FaUser className="mr-1" />
                    <span>{comment.user?.name}</span>
                  </div>
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
              <button
                onClick={handleCommentSubmit}
                className={`mt-2 px-4 py-2 ${isSubmit ? 'bg-blue-300' : 'bg-blue-600'} text-white rounded ${isSubmit ? 'hover:bg-blue-100' : 'hover:bg-blue-700'}`}
                disabled={isSubmit}
              >
                {isSubmit ? 'Submitting . . .' : 'Submit Comment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await api.get(`${postsEndpoint}?per_page=1`);
  const paths = posts.data.map((post: Post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
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
