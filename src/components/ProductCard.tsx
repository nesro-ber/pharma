import React from 'react';
import { Package, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isOwner = false, 
  onEdit, 
  onDelete, 
  onClick 
}) => {
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Pharmaceutique':
        return 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200';
      case 'Parapharmaceutique':
        return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200';
      case 'Cosmétique':
        return 'bg-gradient-to-r from-pink-100 to-pink-50 text-pink-800 border border-pink-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200';
    }
  };

  const getProductImage = (type: string) => {
    // If product has custom image, use it, otherwise use default based on type
    if (product.imageUrl) {
      return product.imageUrl;
    }
    
    // Default images from Pexels for different product types
    switch (type) {
      case 'Pharmaceutique':
        return 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop';
      case 'Parapharmaceutique':
        return 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop';
      case 'Cosmétique':
        return 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop';
      default:
        return 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop';
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger onClick if clicking on edit/delete buttons
    if (isOwner && (e.target as HTMLElement).closest('.owner-actions')) {
      return;
    }
    onClick?.();
  };

  return (
    <div 
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-200 overflow-hidden cursor-pointer group w-full"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden" style={{ height: '140px' }}>
        <img 
          src={getProductImage(product.type)}
          alt={product.name}
          className="w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          style={{ 
            height: '140px',
            minHeight: '140px',
            maxHeight: '140px',
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%'
          }}
          onError={(e) => {
            // Fallback to default image if custom image fails to load
            const target = e.target as HTMLImageElement;
            if (target.src !== getProductImage(product.type)) {
              target.src = getProductImage(product.type);
            }
          }}
        />
        
        {/* Stock Status Overlay */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <div className="flex items-center gap-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              <Package className="h-3 w-3" />
              En stock
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              <AlertCircle className="h-3 w-3" />
              Rupture
            </div>
          )}
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getTypeBadgeColor(product.type)}`}>
            {product.type === 'Parapharmaceutique' ? 'Parapharma' : product.type}
          </span>
        </div>

        {/* Owner Actions */}
        {isOwner && (
          <div className="owner-actions absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="p-2 bg-blue-500/90 text-white rounded-lg hover:bg-blue-600 transition-colors backdrop-blur-sm"
              title="Modifier le produit"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="p-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-colors backdrop-blur-sm"
              title="Supprimer le produit"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4" style={{ minHeight: '70px' }}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm sm:text-base font-bold text-green-600">
            <span>{product.price.toFixed(2)}</span>
            <span className="text-xs sm:text-sm">DA</span>
          </div>
          
          <div className="text-xs text-gray-500 group-hover:text-green-600 transition-colors">
            Plus d'infos
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;