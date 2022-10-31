import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { ParallelQueriesPage } from './components/ParallelQueries.page';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-parallel'>RQ Parallel</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' element={<SuperHeroesPage />}>
            </Route>
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />}>
            </Route>
            <Route path='/rq-super-heroes/:Id' element={<RQSuperHeroPage />}>
            </Route>
            <Route path='/rq-parallel' element={<ParallelQueriesPage />}>
            </Route>
            <Route path='/' element={<HomePage />}>
            </Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
