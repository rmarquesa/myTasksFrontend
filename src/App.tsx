import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'
import Header from './componets/Header'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;