// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts } from '../firebaseActions';
import jsPDF from 'jspdf';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
      applyFilters();
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else {
        return a.stock - b.stock;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = term => {
    setSearchTerm(term);
    applyFilters();
  };

  const handleSortChange = value => {
    setSortBy(value);
    applyFilters();
  };

  const handleGeneratePDF = () => {
    const pdf = new jsPDF();
    pdf.text('Informe de Inventario', 20, 10);

    let y = 20;
    filteredProducts.forEach(product => {
      y += 10;
      pdf.text(`${product.name} - Precio: ${product.price} - Stock: ${product.stock}`, 20, y);
    });

    pdf.save('InformeInventario.pdf');
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <label>
        Buscar:
        <input type="text" value={searchTerm} onChange={e => handleSearch(e.target.value)} />
      </label>
      <label>
        Ordenar por:
        <select value={sortBy} onChange={e => handleSortChange(e.target.value)}>
          <option value="name">Nombre</option>
          <option value="price">Precio</option>
          <option value="stock">Stock</option>
        </select>
      </label>
      <button onClick={handleGeneratePDF}>Generar Informe PDF</button>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - {product.price} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
