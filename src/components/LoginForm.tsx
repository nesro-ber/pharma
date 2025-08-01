import React, { useState } from 'react';
import { X, LogIn, Building2 } from 'lucide-react';
import { Pharmacy } from '../types';

interface LoginFormProps {
  onLogin: (pharmacy: Pharmacy) => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock pharmacy data - in real app this would come from your backend
      // Different pharmacies based on email for demo
      let mockPharmacy: Pharmacy;
      
      if (formData.email.includes('centrale')) {
        mockPharmacy = {
          id: '1',
          name: 'Pharmacie Centrale',
          email: formData.email,
          address: '123 Rue de la Santé, Paris'
        };
      } else if (formData.email.includes('marche')) {
        mockPharmacy = {
          id: '2',
          name: 'Pharmacie du Marché',
          email: formData.email,
          address: '456 Avenue des Roses, Lyon'
        };
      } else if (formData.email.includes('moderne')) {
        mockPharmacy = {
          id: '3',
          name: 'Pharmacie Moderne',
          email: formData.email,
          address: '789 Boulevard de la Liberté, Marseille'
        };
      } else {
        // Default pharmacy for demo
        mockPharmacy = {
          id: '1',
          name: 'Pharmacie Centrale',
          email: formData.email,
          address: '123 Rue de la Santé, Paris'
        };
      }

      onLogin(mockPharmacy);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-sm sm:max-w-md w-full border border-green-100 mx-2">
        <div className="flex items-center justify-between p-6 border-b border-green-100 bg-gradient-to-r from-green-50 to-blue-50">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-green-800">Connexion Pharmacie</h2>
            <p className="text-sm sm:text-base text-green-600 mt-1">Connectez-vous pour gérer vos produits</p>
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
              <Building2 className="h-5 w-5" />
              <span className="text-sm sm:text-base font-medium">Espace Pharmacie</span>
            </div>
            <p className="text-green-700 text-xs sm:text-sm">
              Connectez-vous avec vos identifiants de pharmacie pour ajouter et gérer vos médicaments.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Email de la pharmacie
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="pharmacie@exemple.com"
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>

          <div className="text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-xs sm:text-sm font-medium mb-1">Compte de démonstration:</p>
            <p className="text-xs">Email: centrale@pharmacie.com (Pharmacie Centrale)</p>
            <p className="text-xs">Email: marche@pharmacie.com (Pharmacie du Marché)</p>
            <p className="text-xs">Email: moderne@pharmacie.com (Pharmacie Moderne)</p>
            <p className="text-xs">Mot de passe: n'importe quel mot de passe</p>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-green-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Connexion...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Se connecter
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;