import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Product } from '../types';
import PharmacyLogo from './PharmacyLogo';

interface EditProductFormProps {
  product: Product;
  onEditProduct: (product: Product) => void;
  onClose: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onEditProduct, onClose }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    type: product.type,
    pharmacyComment: product.pharmacyComment,
    price: product.price,
    inStock: product.inStock,
    prescribedBy: product.prescribedBy || '',
    imageUrl: product.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct: Product = {
      ...product,
      ...formData
    };
    onEditProduct(updatedProduct);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      inStock: e.target.checked
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-green-100">
        <div className="flex items-center justify-between p-6 border-b border-green-100 bg-gradient-to-r from-green-50 to-blue-50">
          <div>
            <h2 className="text-2xl font-bold text-green-800">Modifier le produit</h2>
            <p className="text-green-600 mt-1">Mettez à jour les informations de votre médicament</p>
          </div>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-600 transition-colors p-1 rounded-lg hover:bg-green-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <PharmacyLogo className="h-5 w-5" />
              <span className="font-medium">Modification du produit</span>
            </div>
            <p className="text-green-700 text-sm">
              Modifiez les informations de votre médicament. Tous les champs marqués d'un * sont obligatoires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Nom du produit *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
              >
                <option value="Pharmaceutique">Pharmaceutique</option>
                <option value="Parapharmaceutique">Parapharmaceutique</option>
                <option value="Cosmétique">Cosmétique</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Commentaire de la pharmacie *
            </label>
            <textarea
              name="pharmacyComment"
              value={formData.pharmacyComment}
              onChange={handleInputChange}
              required
              rows={2}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Prescrit par (optionnel)
            </label>
            <input
              type="text"
              name="prescribedBy"
              value={formData.prescribedBy}
              onChange={handleInputChange}
              placeholder="Dr. Nom du médecin"
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Image du produit (optionnel)
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="text-xs text-green-600 mt-1">
              Sélectionnez une image depuis votre appareil pour personnaliser l'affichage de votre produit
            </p>
            {formData.imageUrl && (
              <div className="mt-2">
                <img 
                  src={formData.imageUrl} 
                  alt="Aperçu" 
                  className="w-20 h-20 object-cover object-center rounded-lg border border-green-200"
                  style={{ minHeight: '80px', maxHeight: '80px', minWidth: '80px', maxWidth: '80px' }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Prix (DA) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded mr-2"
              />
              <label className="text-sm font-medium text-green-700">
                En stock
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-green-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Save className="h-4 w-4" />
              Sauvegarder les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;