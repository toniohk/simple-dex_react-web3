import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from './common/Loader'
import './main.css'

const Swap = lazy(() => import('./swap/swap'))

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/swap" component={Swap} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
