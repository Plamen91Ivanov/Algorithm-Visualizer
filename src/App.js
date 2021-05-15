import React from 'react';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import SortingVisualizer from './Components/SortingAlgorithms/SortingVisualizer';
import PathfindingVisualizer from './Components/PathfindingVisualizer/PathfindingVisualizer';
import Home from './Components/UI/Home';
import Navbar from './Components/UI/Navbar'
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
       <div className='content'>
          <Switch>
            <Route exact path='/algo-visualizer'>
                <Home/>
            </Route>
            <Route path='/sorting'>
                <SortingVisualizer/>
            </Route>
            <Route path='/pathfinding'>
                <PathfindingVisualizer/>
            </Route>
          </Switch>
       </div>
  </div>
  </Router>
  );
}

export default App;
