import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient()
    //? the queryClient instance have access to the query cache, which we can now access to set the initial data.
    //? we use the data from the first fetch as the initial value, and display it (instead of 'Loading...')
    //? until we receive the data from the latest fetch.
    return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId),
        {
            refetchInterval: 5000, // refetch every 5 seconds 
            initialData: () => {
                const hero = queryClient.getQueryData('super-heroes')?.data?.find(hero => hero.id === parseInt(heroId))
                // we are using parseInt to make sure the id is numeric
                if (hero) {
                    return {
                        data: hero // it's important to keep this format, since we are destructuring it as 'data.data'
                    }
                } else {
                    return undefined
                }
            }
        })
}