import { Route } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { Home, Chats } from './pages';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Route path='/' component={Home} exact />
      <Route path='/chats' component={Chats} />
      <Button colorScheme='blue' variant='outline'>
        Button
      </Button>
    </div>
  );
}

export default App;
