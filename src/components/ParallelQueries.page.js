import axios from 'axios'
import { useQuery } from 'react-query'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {

    //? Executing parallel queries with React Query is as simple as invoking 'useQuery' multiple times!
    const { data: superHeroes, isLoading: isLoadingHeroes } = useQuery('super-heroes', fetchSuperHeroes)
    const { data: friends, isLoading: isLoadingFriends } = useQuery('friends', fetchFriends)
    // This should call the 2 fetch functions and invoke useQuery for both 'super-heroes' and 'friends'

    if (isLoadingHeroes || isLoadingFriends) {
        return <h2>Loading...</h2>
    }

    return <div>
        <h2>Parallel Queries Page</h2>
        {superHeroes?.data.map(hero => (
            <div key={hero.id}>{hero.name}</div>
        ))}
        <br />
        {friends?.data.map(friend => (
            <div key={friend.id}>{friend.name}</div>
        ))}
    </div>
}