import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import MostSpentInfo from './components/MostSpentInfo/most-spent-info.component';
import { TINK_LINK } from './shared/constants';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/callback">
          <MostSpentInfo />
        </Route>
        <Route render={() => {
          window.location.replace(TINK_LINK);
          return null;
        }} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
