import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { DynamicParallelPage } from "./components/DynamicParallel.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">RQ Dynamic Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dependent">RQ Dependent Queries</Link>
              </li>
              <li>
                <Link to="/rq-paginated">RQ Paginated Queries</Link>
              </li>
              <li>
                <Link to="/rq-infinite">RQ Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />}></Route>
            <Route
              path="/rq-super-heroes"
              element={<RQSuperHeroesPage />}
            ></Route>
            <Route
              path="/rq-super-heroes/:Id"
              element={<RQSuperHeroPage />}
            ></Route>
            <Route
              path="/rq-parallel"
              element={<ParallelQueriesPage />}
            ></Route>
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelPage heroesIds={[4, 3, 1]} />}
            ></Route>
            <Route
              path="/rq-dependent"
              element={<DependentQueriesPage email={"john@doe.com"} />}
            ></Route>
            <Route
              path="/rq-paginated"
              element={<PaginatedQueriesPage />}
            ></Route>
            <Route
              path="/rq-infinite"
              element={<InfiniteQueriesPage />}
            ></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
