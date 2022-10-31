import axios from 'axios'
import { useQuery } from 'react-query'

const fetchSuperHeros = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery('super-heros', fetchSuperHeros,
    {
      //? cacheTime: 5000, // optional, the default is 5 minutes
      //? refetchInterval: 5000, // refetch every 5 seconds 
      //! The automatic refetching (using 'refetchInterval') is paused if the window loses focus
      //! To change this, we can use: refetchIntervalInBackground: true
      staleTime: 30000, // default is 0 sec (to trigger instantly every time)
      // Makes the query stay fresh for 30 seconds, and will not trigger axios during this time.
      // Often used with data that doesn't change much, and can reduce network traffic.
      refetchOnMount: true, // true by default - the query will refetch on mount if the data is stale
      refetchOnWindowFocus: true, // true by default - any time the tab loses focus and gains focus again,
      // a background refetch is initiated (meaning we won't need to refresh the tab to get the updated data)
      enabled: false, // true by default
      // we can use this if we want to fetch data on user *click*, instead of fetching on mount
    }
  )

  console.log({ isLoading, isFetching })

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2> RQ Super Heros Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((heros) => {
        return <div key={heros.name}>{heros.name}</div>
      })}
    </>
  )
}
