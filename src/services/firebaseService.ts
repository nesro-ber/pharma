import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product, Pharmacy } from '../types';

// Products collection
const PRODUCTS_COLLECTION = 'products';
const PHARMACIES_COLLECTION = 'pharmacies';

// Product operations
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'))
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const getProductsByPharmacy = async (pharmacyId: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION), 
      where('pharmacyId', '==', pharmacyId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products by pharmacy:', error);
    throw error;
  }
};

export const updateProduct = async (productId: string, updates: Partial<Product>): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Pharmacy operations
export const addPharmacy = async (pharmacy: Omit<Pharmacy, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PHARMACIES_COLLECTION), {
      ...pharmacy,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding pharmacy:', error);
    throw error;
  }
};

export const getPharmacies = async (): Promise<Pharmacy[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PHARMACIES_COLLECTION));
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Pharmacy[];
  } catch (error) {
    console.error('Error getting pharmacies:', error);
    throw error;
  }
};

export const getPharmacyByEmail = async (email: string): Promise<Pharmacy | null> => {
  try {
    const q = query(
      collection(db, PHARMACIES_COLLECTION), 
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Pharmacy;
  } catch (error) {
    console.error('Error getting pharmacy by email:', error);
    throw error;
  }
};