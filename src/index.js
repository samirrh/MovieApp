import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from 'react-router-dom';
import history from './history';

ReactDOM.render(
  <Router history={history}>
    <ChakraProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </Router>,
  document.getElementById('root')
);
