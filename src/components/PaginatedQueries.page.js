import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching, isSuccess } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true, // off by default
      //? React Query will maintain the data from the last successful fetch,
      //? instead of showing the 'Loading...' msg on and off and breaking the layout
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Paginated Queries Page</h2>
      {isSuccess && data.data.map((color) => {
        return (
          <div key={color.id}>
            {color.id}. {color.label}
          </div>
        );
      })}
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching && "Loading..."}
    </>
  );
};
