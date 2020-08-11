import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">

        </div>
      </Router>
    </Provider>
  );
}

export default App;
