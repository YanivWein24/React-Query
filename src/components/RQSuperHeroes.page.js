import { useSuperHeroesData } from './../hooks/useSuperHeroesData';



export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data.data)
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering error:', error.message)
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)

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
      {/* {data?.data.map((heros) => {
        return <div key={heros.name}>{heros.name}</div>
      })} */}
      {
        data.map(heroName => {
          return <div key={heroName}>{heroName}</div>
        })
      }
    </>
  )
}
