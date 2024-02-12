// src/components/AddProductForm.js
import React, { useState } from 'react';
import { addProduct } from '../firebaseActions';
import * as yup from 'yup';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [error, setError] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required('El nombre del producto es obligatorio'),
    price: yup.number().positive('El precio debe ser un número positivo').required('El precio es obligatorio'),
    stock: yup.number().integer('El stock debe ser un número entero').required('El stock es obligatorio'),
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Validar los datos antes de continuar
      await schema.validate({ name: productName, price: productPrice, stock: productStock }, { abortEarly: false });

      const newProduct = {
        name: productName,
        price: parseFloat(productPrice),
        stock: parseInt(productStock),
      };

      await addProduct(newProduct);

      // Limpiar el formulario después de agregar un producto
      setProductName('');
      setProductPrice('');
      setProductStock('');
      setError(null);
    } catch (validationError) {
      // Manejar el error de validación
      setError(validationError.message);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Producto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />
        </label>
        <br />
        <label>
          Precio:
          <input type="text" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Stock:
          <input type="text" value={productStock} onChange={e => setProductStock(e.target.value)} />
        </label>
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AddProductForm;
