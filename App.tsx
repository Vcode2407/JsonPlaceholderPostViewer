
import React, { useState, useEffect, useCallback } from 'react';
import { Post } from './types';
import { fetchPostsFromAPI } from './services/api';
import PostCard from './components/PostCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPosts = await fetchPostsFromAPI();
      setPosts(fetchedPosts);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setPosts([]); // Clear posts on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadPosts]); // loadPosts is memoized, so this runs once on mount as intended.

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 p-4 sm:p-8 transition-colors duration-500">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-4">
          JSONPlaceholder Posts
        </h1>
        <button
          onClick={loadPosts}
          disabled={isLoading}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto group"
          aria-live="polite"
          aria-label={isLoading ? "Refreshing posts" : "Refresh posts"}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.664 0l3.181-3.183m-3.181-3.182L12 12.51m-8.25-3.182L12 12.51m0 0L12 12.51v-4.992m0 0h4.992m-4.993 0L12 12.51m0 0L12 12.51v4.992m0 0h-4.992m4.993 0L12 4.511" />
              </svg>
              Refresh Posts
            </>
          )}
        </button>
      </header>

      <main>
        {isLoading && posts.length === 0 && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && posts.length === 0 && (
          <p className="text-center text-slate-400 text-xl">No posts found. Try refreshing.</p>
        )}
        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <footer className="text-center mt-12 py-4 border-t border-slate-700">
        <p className="text-sm text-slate-500">
          Data from <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">JSONPlaceholder</a>.
        </p>
         <p className="text-xs text-slate-600 mt-1">
          UI by a React & Tailwind enthusiast.
        </p>
      </footer>
    </div>
  );
};

export default App;