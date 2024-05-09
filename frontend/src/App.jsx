import React,{ useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Component from './components/component/component';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductDetails } from './components/component/product-details';

// Créez un contexte pour le basename
const BasenameContext = React.createContext();

function App() {
  const [count, setCount] = useState(0);

  // Initialisez la valeur du basename
  const basename = '/';

  return (
    // Fournissez le contexte du basename à l'intérieur du Router
    <BasenameContext.Provider value={basename}>
      <Router>
        <div>
          <ProductDetails />

        </div>
      </Router>
    </BasenameContext.Provider>
  );
}

export default App;
