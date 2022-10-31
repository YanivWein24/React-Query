import axios from 'axios'
import { Link } from 'react-router-dom';
import { useQueries } from 'react-query'
//* Here we are using 'useQueries' and not 'useQuery' 

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroesIds }) => {
    const queryResults = useQueries(
        heroesIds.map(id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id),
            }
        }))
    // console.log({ queryResults })

    return (
        <>
            <h2>Dynamic Parallel Page</h2>
            {queryResults.map(query => {
                // console.log(query?.data.data) // using? to console.log data when we get it
                return (
                    <div key={query.data?.data.id}>Id: {query.data?.data.id} &nbsp;
                        Name: <Link to={`/rq-super-heroes/${query.data?.data.id}`}>{query.data?.data.name}</Link>
                    </div>
                )
            })}
        </>
    )
}