// src/components/UpdateProductForm.js
import React, { useState } from 'react';
import { updateProduct } from '../firebaseActions';

const UpdateProductForm = ({ productId, productName, productPrice, productStock, onUpdate }) => {
  const [newName, setNewName] = useState(productName);
  const [newPrice, setNewPrice] = useState(productPrice);
  const [newStock, setNewStock] = useState(productStock);

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedProduct = {
      name: newName,
      price: parseFloat(newPrice),
      stock: parseInt(newStock),
    };

    await updateProduct(productId, updatedProduct);

    // Limpia el formulario y llama a la función de actualización en el componente padre
    setNewName('');
    setNewPrice('');
    setNewStock('');
    onUpdate();
  };

  return (
    <div>
      <h2>Actualizar Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nuevo Nombre:
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
        </label>
        <br />
        <label>
          Nuevo Precio:
          <input type="text" value={newPrice} onChange={e => setNewPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Nuevo Stock:
          <input type="text" value={newStock} onChange={e => setNewStock(e.target.value)} />
        </label>
        <br />
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
