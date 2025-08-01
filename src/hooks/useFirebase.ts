import { useState, useEffect } from 'react';
import { Product, Pharmacy } from '../types';
import * as firebaseService from '../services/firebaseService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await firebaseService.getProducts();
      setProducts(fetchedProducts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const id = await firebaseService.addProduct(product);
      const newProduct = { ...product, id };
      setProducts(prev => [newProduct, ...prev]);
      return id;
    } catch (err) {
      setError('Failed to add product');
      throw err;
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    try {
      await firebaseService.updateProduct(productId, updates);
      setProducts(prev => prev.map(product => 
        product.id === productId ? { ...product, ...updates } : product
      ));
    } catch (err) {
      setError('Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await firebaseService.deleteProduct(productId);
      setProducts(prev => prev.filter(product => product.id !== productId));
    } catch (err) {
      setError('Failed to delete product');
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};

export const usePharmacies = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      const fetchedPharmacies = await firebaseService.getPharmacies();
      setPharmacies(fetchedPharmacies);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pharmacies');
      console.error('Error fetching pharmacies:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPharmacyByEmail = async (email: string): Promise<Pharmacy | null> => {
    try {
      return await firebaseService.getPharmacyByEmail(email);
    } catch (err) {
      setError('Failed to get pharmacy');
      throw err;
    }
  };

  const addPharmacy = async (pharmacy: Omit<Pharmacy, 'id'>) => {
    try {
      const id = await firebaseService.addPharmacy(pharmacy);
      const newPharmacy = { ...pharmacy, id };
      setPharmacies(prev => [...prev, newPharmacy]);
      return id;
    } catch (err) {
      setError('Failed to add pharmacy');
      throw err;
    }
  };

  return {
    pharmacies,
    loading,
    error,
    fetchPharmacies,
    getPharmacyByEmail,
    addPharmacy
  };
};