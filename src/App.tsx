import React, { useState, useMemo } from 'react';
import { ShoppingBag, Plus, Edit3 } from 'lucide-react';
import { Product, FilterState, AuthState, Pharmacy } from './types';
import { mockProducts } from './data/mockData';
import { searchMatch } from './utils/searchUtils';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import LoginForm from './components/LoginForm';
import ProductDetailModal from './components/ProductDetailModal';
import Footer from './components/Footer';
import PharmacyLogo from './components/PharmacyLogo';

function App() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    pharmacy: null
  });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedType: 'Tous'
  });

  const filteredProducts = useMemo(() => {
    let productsToFilter = products;
    
    // If pharmacy is authenticated, show only their products in management mode
    // For public view, show all products
    if (authState.isAuthenticated) {
      productsToFilter = products.filter(product => product.pharmacyId === authState.pharmacy?.id);
    }
    
    try {
      return productsToFilter.filter(product => {
        // Ensure product and required fields exist
        if (!product || !product.name || !product.description) {
          return false;
        }
        
        const matchesSearch = filters.searchTerm === '' || searchMatch(
          filters.searchTerm,
          product.name,
          product.description,
          product.pharmacyLocation || ''
        );
        
        const matchesType = filters.selectedType === 'Tous' || product.type === filters.selectedType;
        
        return matchesSearch && matchesType;
      });
    } catch (error) {
      console.error('Error filtering products:', error);
      return productsToFilter;
    }
  }, [products, filters, authState]);

  // Safe filtered products with error handling
  const safeFilteredProducts = useMemo(() => {
    return filteredProducts.filter(product => {
      const matchesSearch = filters.searchTerm === '' || searchMatch(
        filters.searchTerm,
        product.name,
        product.description,
        product.pharmacyLocation || ''
      );
      
      const matchesType = filters.selectedType === 'Tous' || product.type === filters.selectedType;
      
      return matchesSearch && matchesType;
    });

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    if (!authState.pharmacy) return;
    
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      pharmacyId: authState.pharmacy.id,
      pharmacyLocation: `${authState.pharmacy.name} - ${authState.pharmacy.address}`,
      pharmacyRating: 0,
      userReviews: []
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
      // Close modal if the deleted product was being viewed
      if (selectedProduct?.id === productId) {
        setSelectedProduct(null);
      }
    }
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleTypeChange = (selectedType: string) => {
    setFilters(prev => ({ ...prev, selectedType }));
  };

  const handleLogin = (pharmacy: Pharmacy) => {
    setAuthState({
      isAuthenticated: true,
      pharmacy
    });
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    // Reset all states when logging out
    setAuthState({
      isAuthenticated: false,
      pharmacy: null
    });
    setFilters({ searchTerm: '', selectedType: 'Tous' });
    setSelectedProduct(null);
    setEditingProduct(null);
    setShowLoginForm(false);
  };

  // Calculate totals based on current view
  const relevantProducts = authState.isAuthenticated 
    ? products.filter(p => p.pharmacyId === authState.pharmacy?.id)
    : products;
    
  const totalInStock = relevantProducts.filter(p => p.inStock).length;
  const totalProducts = relevantProducts.length;

  const handleLogoClick = () => {
    // Reset filters and close any open modals
    setFilters({ searchTerm: '', selectedType: 'Tous' });
    setSelectedProduct(null);
    setEditingProduct(null);
    setShowLoginForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Responsive Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-green-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="flex items-center justify-between py-4 md:hidden">
            <div className="flex items-center gap-2">
              <div 
                className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
                onClick={handleLogoClick}
              >
                <PharmacyLogo className="h-6 w-6 text-white" />
              </div>
              <div 
                className="cursor-pointer"
                onClick={handleLogoClick}
              >
                <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Pharma Digital
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <ShoppingBag className="h-3 w-3" />
                <span>{totalProducts}</span>
              </div>
              {authState.isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => document.querySelector('[data-add-product-btn]')?.click()}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md"
                    title="Ajouter un produit"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
                    title="Se déconnecter"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-xs font-medium shadow-md"
                >
                  Connexion
                </button>
              )}
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div 
                className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
                onClick={handleLogoClick}
              >
                <PharmacyLogo className="h-8 w-8 text-white" />
              </div>
              <div 
                className="cursor-pointer"
                onClick={handleLogoClick}
              >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Pharma Digital
                </h1>
                <p className="text-green-600/80 italic font-medium">La pharmacie à être numérique</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {authState.isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 hidden lg:block">
                    Connecté en tant que <span className="font-medium">{authState.pharmacy?.name}</span>
                  </span>
                  <span className="text-sm text-gray-600 lg:hidden">
                    {authState.pharmacy?.name}
                  </span>
                  <span className="text-xs text-gray-600 sm:hidden">
                    {authState.pharmacy?.name}
                  </span>
                  <button
                    onClick={() => document.querySelector('[data-add-product-btn]')?.click()}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 lg:px-6 py-2.5 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg text-sm lg:text-base"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Ajouter un produit</span>
                    <span className="sm:hidden">Ajouter</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 lg:px-4 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg text-sm"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden lg:inline">Se déconnecter</span>
                    <span className="lg:hidden">Sortir</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 lg:px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg text-sm lg:text-base"
                >
                  <span className="hidden sm:inline">Connexion Pharmacie</span>
                  <span className="sm:hidden">Connexion</span>
                </button>
              )}
              
              <div className="flex items-center gap-4 lg:gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">{totalProducts} produits</span>
                  <span className="sm:hidden">{totalProducts}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">{totalInStock} en stock</span>
                  <span className="sm:hidden">{totalInStock}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pharmacy Dashboard Header */}
        {authState.isAuthenticated && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Tableau de bord - {authState.pharmacy?.name}
                </h2>
                <p className="text-green-700">
                  Gérez vos médicaments et consultez vos statistiques
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{totalProducts}</div>
                  <div className="text-green-700">Produits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalInStock}</div>
                  <div className="text-blue-700">En stock</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{totalProducts - totalInStock}</div>
                  <div className="text-orange-700">Rupture</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchBar 
            searchTerm={filters.searchTerm}
            onSearchChange={handleSearchChange}
          />
          <FilterBar 
            selectedType={filters.selectedType}
            onTypeChange={handleTypeChange}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {authState.isAuthenticated && 'Vos '}
            {safeFilteredProducts.length} produit{safeFilteredProducts.length !== 1 ? 's' : ''} trouvé{safeFilteredProducts.length !== 1 ? 's' : ''}
            {filters.searchTerm && ` pour "${filters.searchTerm}"`}
            {filters.selectedType !== 'Tous' && ` dans la catégorie "${filters.selectedType}"`}
          </p>
        </div>

        {/* Products Grid */}
        {safeFilteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {safeFilteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                isOwner={authState.isAuthenticated && product.pharmacyId === authState.pharmacy?.id}
                onEdit={() => setEditingProduct(product)}
                onDelete={() => handleDeleteProduct(product.id)}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center border border-green-100">
              <ShoppingBag className="h-12 w-12 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-4">
              {authState.isAuthenticated 
                ? 'Vous n\'avez pas encore ajouté de produits ou aucun ne correspond à vos critères.'
                : 'Essayez de modifier vos critères de recherche ou de filtrage.'
              }
            </p>
            <div className="flex gap-4 justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => document.querySelector('[data-add-product-btn]')?.click()}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
                  title="Se déconnecter"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
              {authState.isAuthenticated && (
                <button
                  onClick={() => document.querySelector('[data-add-product-btn]')?.click()}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter votre premier produit
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Add Product Form */}
      {authState.isAuthenticated && (
        <AddProductForm onAddProduct={handleAddProduct} />
      )}

      {/* Edit Product Form */}
      {editingProduct && (
        <EditProductForm 
          product={editingProduct}
          onEditProduct={handleEditProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isOwner={authState.isAuthenticated && selectedProduct.pharmacyId === authState.pharmacy?.id}
          onEdit={() => {
            setEditingProduct(selectedProduct);
            setSelectedProduct(null);
          }}
          onDelete={() => {
            handleDeleteProduct(selectedProduct.id);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Login Form */}
      {showLoginForm && (
        <LoginForm 
          onLogin={handleLogin} 
          onClose={() => setShowLoginForm(false)} 
        />
      )}
    </div>
  );
}

export default App;