
import { Post } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPostsFromAPI = async (): Promise<Post[]> => {
  try {
    // Simulate network delay for better UX testing
    // await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching posts.');
  }
};
