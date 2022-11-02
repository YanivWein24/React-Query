import {
  useAddSuperHeroesData,
  useSuperHeroesData,
} from "./../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import { useState } from "react";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data.data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error:", error.message);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const { mutate: addHero } = useAddSuperHeroesData(); // we get the 'mutate' function from our hook

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  return (
    <>
      <h2> RQ Super Heros Page</h2>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        value={alterEgo}
        onChange={(event) => setAlterEgo(event.target.value)}
      />
      <button onClick={handleAddHeroClick}>Add Hero</button>
      <button onClick={refetch}>Fetch Heroes</button>
      {(isLoading || isFetching) && <h2>Loading...</h2>}
      {isError && <h2>{error.message}</h2>}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {
        data.map(heroName => {
          return <div key={heroName}>{heroName}</div>
        })
      } */}
    </>
  );
};
