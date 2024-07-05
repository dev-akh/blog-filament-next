import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { posts as postendpoint } from "@/services/endpoints";
import * as api from '@/services/api';
import { Paginate } from "@/types/paginate";
import HeroBanner from "@/components/HeroBanner";
import LoadingSpinner from "@/components/LoadingSpinner";

const defaultPaginate: Paginate = {
  current_page: 1,
  from: 1,
  last_page: 1,
  per_page: 9,
  to: 1,
  total: 9
};

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginate, setPaginate] = useState<Paginate>(defaultPaginate);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const endpoint = `${postendpoint}?per_page=${paginate.per_page}&page=${paginate.current_page}`;
        const data = await api.get(endpoint);
    
        const currentIds = new Set(posts.map(post => post.id));
        const newData = data.data.filter((post: Post) => !currentIds.has(post.id));

        const uniquePosts = [...posts, ...newData];
        setPosts(uniquePosts);
        setPaginate(data.meta);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [paginate.current_page]);

  const handlePageChange = async (newPage: number) => {
    setPaginate(prevPaginate => ({
      ...prevPaginate,
      current_page: newPage
    }));
  };

  return (
    <>
      <HeroBanner>
        <main className="container my-12 mx-auto grid grid-cols-1 gap-3 md:gap-4 lg:gap-5 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {posts.map((item: Post) => (
            <Card key={item.id} item={item} />
            ))}
        </main>
        {isFetching?(
          <LoadingSpinner/>
        ):(
          <Pagination 
            page={paginate?.current_page}
            pageSize={paginate?.per_page}
            totalItems={paginate?.total}
            onPageChange={handlePageChange}
        />
        )}
      </HeroBanner>
    </>
  );
}
