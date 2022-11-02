import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const addSuperHeroes = (hero) => {
    return axios.post('http://localhost:4000/superheroes', hero)
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes', fetchSuperHeroes,
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
            enabled: true, // true by default
            // we can use this if we want to fetch data on user *click*, instead of fetching on mount.
            onSuccess, // short for - onSuccess: onSuccess
            onError,  // short for - onError: onError
            // select: (data) => {
            //     const superHeroNames = data.data.map((hero) => hero.name)
            //     return superHeroNames
            // the 'select' configuration receives the response data as argument, and is used to select or filter
            // the data we receive. the value we return here will be the the 'final' data we'll use.
            // }
        }
    )
}

export const useAddSuperHeroesData = () => {
    const queryClient = useQueryClient()
    return useMutation(addSuperHeroes, {
        onSuccess: (data) => {
            //! 'data' refers to the *entire* response from the POST request
            // queryClient.invalidateQueries('super-heroes')
            //? Refetch updated data on success 
            queryClient.setQueriesData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data]
                    // this function automatically accepts the "old" data, and we use the response from the 
                    // POST request to to update the data we have without firing another refetch
                    // (instead of 'queryClient.invalidateQueries')
                }
            })
        }
    })
}