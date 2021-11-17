import logo from './logo.svg';
import './App.css';
import DelayedToggle from './components/DelayToggle';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <DelayedToggle />
      <UserProfile id={1} />
    </div>
  );
}

export default App;
