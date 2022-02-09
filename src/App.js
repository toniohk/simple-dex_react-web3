import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from './common/Loader'
import './main.css'

const Swap = lazy(() => import('./swap/swap'))
const Farm = lazy(() => import('./farm/farm'))
const Compound = lazy(() => import('./compound/compound'))

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/swap" component={Swap} />
            <Route path="/farm" component={Farm} />
            <Route path="/compound" component={Compound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
