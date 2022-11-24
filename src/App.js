import './App.css';
import WeatherComponent from './WeatherComponent'
import { Container } from 'react-bootstrap/Container';

function App() {
  
  return (
    <div className="background">
    <h1>My weather forecast app</h1>
    <WeatherComponent/>
    </div>
  );
}

export default App;
