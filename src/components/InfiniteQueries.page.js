import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  // 'pageParam' is injected from the 'useInfiniteQuery' hook, and we set it's default value to 1
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined; // returning undefined will set 'hasNextPage' to false
      }
    },
  });
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Infinite Queries Page</h2>
      {data?.pages.map((group, index) => {
        return (
          <div key={index}>
            {group.data.map((color) => (
              <h2 key={color.id}>
                {color.id}. {color.label}
              </h2>
            ))}
          </div>
        );
      })}
      <button onClick={fetchNextPage} disabled={!hasNextPage}>
        Load More
      </button>
      <div>{isFetching && !isFetchingNextPage && "Fetching..."}</div>
    </>
  );
};
