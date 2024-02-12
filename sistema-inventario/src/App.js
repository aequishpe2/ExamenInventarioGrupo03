// src/App.js
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import UpdateProductForm from './components/UpdateProductForm';
import './styles.css'; // Importa el archivo CSS


const App = () => {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'addProduct':
        return <AddProductForm />;
      case 'updateProduct':
        return <UpdateProductForm />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="container">
      {renderView()}
      <button onClick={() => setView('addProduct')}>Registrar Producto</button>
      {/* Agrega otros botones o enlaces según sea necesario */}
    </div>
  );
};

export default App;

