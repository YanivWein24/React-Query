import axios from 'axios'
import { useQuery } from 'react-query'

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId),
        {
            refetchInterval: 5000, // refetch every 5 seconds 
        })
}