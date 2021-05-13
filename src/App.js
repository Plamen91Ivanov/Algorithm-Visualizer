import logo from './logo.svg';
import './App.css';

import SearchAlgorithm from './components/SearchAlgorithm/SearchAlgorithm';
import Pathfinding from './components/Pathfinding/Pathfinding';
import Snake from './components/SnakeBot/Snake';

function App() {
  // return (
  //   <div className="App">
  //     <SearchAlgorithm></SearchAlgorithm>
  //     <Pathfinding></Pathfinding>
  //     <Snake></Snake>
  //     <div className="card-container"></div>
  //   </div>
  // );
  const [state, setState] = useState('start')

  triggerAddTripState = () => {
    setState('add-trip')
  }

  return (
    <div>
      {state === 'start' && (
        <AddTripButton addTrip={this.triggerAddTripState} />
      )}

      {state === 'add-trip' && <AnotherComponent />}
    </div>
  )
}

export default App;
