import { useSuperHeroData } from './../hooks/useSuperHeroData';
import { useParams } from 'react-router-dom';

export const RQSuperHeroPage = () => {
    const { Id } = useParams() // we need to get the id, we can do so by receiving the params from the url
    const { isLoading, data, isError, error } = useSuperHeroData(Id)

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>Super Hero Details:</h2>
            <p>{data?.data.name} - {data.data.alterEgo}</p>
        </>
    )
}