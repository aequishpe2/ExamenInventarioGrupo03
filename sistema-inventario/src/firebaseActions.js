// firebaseActions.js
import { db } from './firebase';

// Obtener todos los productos
const getProducts = async () => {
  try {
    const snapshot = await db.collection('productos').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Agregar un nuevo producto
const addProduct = async product => {
  try {
    await db.collection('productos').add(product);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
};

// Actualizar la información de un producto existente
const updateProduct = async (id, updatedProduct) => {
  try {
    await db.collection('productos').doc(id).update(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

// Eliminar un producto
const deleteProduct = async id => {
  try {
    await db.collection('productos').doc(id).delete();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct };
