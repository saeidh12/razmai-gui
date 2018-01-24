import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Menu from './Pages/Menu';
import Play from './Pages/Play';
import BuildMap from './Pages/BuildMap';

class App extends Component {
   render() {
      return (
         <Router>
            <div>
               <Switch>
                  <Route exact path='/menu'       component={ Menu }  />
                  <Route exact path='/play'       component={ Play }  />
                  <Route exact path='/build-map'  component={ BuildMap }  />
               </Switch>
            </div>
         </Router>
      );
   }
}
export default App;
