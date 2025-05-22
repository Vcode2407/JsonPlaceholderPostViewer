
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-slate-800 rounded-xl shadow-2xl p-6 hover:shadow-indigo-500/30 transition-all duration-300 ease-in-out flex flex-col h-full transform hover:-translate-y-1">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-sky-400 mb-2 capitalize">{post.title}</h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
        </p>
      </div>
      <div className="mt-auto pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">Post ID: {post.id} | User ID: {post.userId}</p>
      </div>
    </article>
  );
};

export default PostCard;
