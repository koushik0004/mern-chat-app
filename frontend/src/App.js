import { Route } from 'react-router-dom';
import { Home, Chats } from './pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
      <Route path="/chats" component={Chats} />
    </div>
  );
}

export default App;
