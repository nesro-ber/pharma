import React from 'react';
import { X, MapPin, Star, Euro, Package, AlertCircle, UserCheck, Users } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  isOwner = false,
  onEdit,
  onDelete 
}) => {
  if (!isOpen || !product) return null;

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
    
    switch (type) {
      case 'Pharmaceutique':
        return 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
      case 'Parapharmaceutique':
        return 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
      case 'Cosmétique':
        return 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
      default:
        return 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-green-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-100 bg-gradient-to-r from-green-50 to-blue-50 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-green-800">{product.name}</h2>
            <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium shadow-sm ${getTypeBadgeColor(product.type)}`}>
              {product.type}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-green-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl" style={{ height: '320px' }}>
                <img 
                  src={getProductImage(product.type)}
                  alt={product.name}
                  className="w-full object-cover object-center"
                  style={{ 
                    height: '320px',
                    minHeight: '320px',
                    maxHeight: '320px',
                    width: '100%'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== getProductImage(product.type)) {
                      target.src = getProductImage(product.type);
                    }
                  }}
                />
                
                {/* Stock Status */}
                <div className="absolute top-4 right-4">
                  {product.inStock ? (
                    <div className="flex items-center gap-2 bg-green-500/90 text-white px-3 py-2 rounded-full font-medium backdrop-blur-sm">
                      <Package className="h-4 w-4" />
                      En stock
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-red-500/90 text-white px-3 py-2 rounded-full font-medium backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4" />
                      Rupture de stock
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-green-600 bg-green-50 rounded-xl p-4">
                <span>{product.price.toFixed(2)}</span>
                <span className="text-lg sm:text-xl">DA</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Owner Actions */}
              {isOwner && (
                <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <button
                    onClick={onEdit}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Modifier
                  </button>
                  <button
                    onClick={onDelete}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                  </button>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Prescription Info */}
              {product.prescribedBy && (
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <UserCheck className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-blue-700">Prescrit par:</span>
                    <p className="text-blue-600">{product.prescribedBy}</p>
                  </div>
                </div>
              )}

              {/* Pharmacy Location */}
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <MapPin className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-green-700">Disponible chez:</span>
                  <p className="text-green-600">{product.pharmacyLocation}</p>
                </div>
              </div>

              {/* Pharmacy Rating */}
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <Users className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {renderStars(product.pharmacyRating)}
                  </div>
                  <span className="font-medium text-yellow-700">
                    {product.pharmacyRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-yellow-600">
                    ({product.userReviews.length} avis)
                  </span>
                </div>
              </div>

              {/* User Reviews */}
              {!isOwner && product.userReviews.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Avis clients</h3>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {product.userReviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-700">{review.userName}</span>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pharmacy Comment */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Conseil de la pharmacie:</h4>
                <p className="text-sm text-gray-600 italic">{product.pharmacyComment}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {!isOwner && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-md ${
                  product.inStock 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.inStock}
              >
                {product.inStock 
                  ? 'Contacter la pharmacie' 
                  : 'Produit indisponible'
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;