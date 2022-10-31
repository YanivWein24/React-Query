import axios from 'axios'
import { useQuery } from 'react-query'

const fetchSuperHeros = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery('super-heros', fetchSuperHeros)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2> RQ Super Heros Page</h2>
      {data?.data.map((heros) => {
        return <div key={heros.name}>{heros.name}</div>
      })}
    </>
  )
}
