import React, { useEffect, useState } from 'react';
import { 
  Star,
  Plus,  
  Store,
  MapPin, 
  Building2,
  Clock,
  Search,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailStoreSlice
} from '../reducers/get'
import {
  fetchAllStores, 
  fetchDetailStore,
} from '../actions/get'

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  return (
    <Loader2 
      className={`animate-spin ${sizeClasses[size]} ${className}`}
    />
  );
};

// Skeleton Loader for Store List
const StoreListSkeleton = () => (
  <div className="max-h-80 overflow-y-auto">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="w-full px-4 py-3 border-b border-gray-50 last:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const StoreDropdown = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedStore, setSelectedStore] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStore, setShowAddStore] = useState(false);

  // get all data store
  const {allStores:stores, loadingStore} = useSelector((state) => state.persisted.store) 
  useEffect(() => {
    if (stores.length === 0) {
      dispatch(fetchAllStores())
    }
  }, [stores])

  // get detail data store 
  const {setSelectedStore} = detailStoreSlice.actions
  const {
    selectedStore, 
    loadingDetailStore
  } = useSelector((state) => state.persisted.detailStore)

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("le ya lee: ", selectedStore)

  const handleStoreSelect = (store) => {
    dispatch(fetchDetailStore(store.id))
    dispatch(setSelectedStore(store));
    setIsOpen(false);
    setSearchTerm('');
  };

   return (
    <div className="w-full">
      <div className="relative">
        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loadingStore}
          className="w-full flex items-center justify-between px-6 py-4 text-left bg-white rounded-xl shadow-lg hover:border-gray-600 focus:outline-none focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center">
                {loadingDetailStore ? (
                  <LoadingSpinner size="sm" className="text-white" />
                ) : (
                  <Store className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {loadingDetailStore ? (
                <div>
                  <p className="text-md font-medium text-gray-900">
                    Loading store details...
                  </p>
                  <p className="text-xs text-gray-600">
                    Please wait
                  </p>
                </div>
              ) : Object.keys(selectedStore || {}).length > 0 ? (
                <div>
                  <p className="text-md font-medium text-gray-900 truncate">
                    {selectedStore.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {selectedStore.address}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-md font-medium text-gray-900">
                    Pilih Store
                  </p>
                  <p className="text-xs taxt-gray-400">
                    {loadingStore ? 'Loading stores...' : 'Klik untuk memilih store'}
                  </p>
                </div>
              )}
            </div>
          </div>
          {loadingStore ? (
            <LoadingSpinner size="md" className="text-gray-900" />
          ) : (
            <ChevronDown 
              className={`w-5 h-5 text-gray-900 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-xl max-h-96 overflow-hidden">
            {/* Header with Add Store Button */}
            <div className="p-3 flex items-center justify-between">
              <h2>Pilih Store</h2>
              <button
                onClick={() => setShowAddStore(true)}
                disabled={loadingStore}
                className="flex items-center space-x-1 px-6 py-1.5 bg-gray-900 text-white text-md rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-6 h-6" />
                <span>Add</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari store..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={loadingStore}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Store List */}
            {loadingStore ? (
              <StoreListSkeleton />
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <button
                      key={store.id}
                      onClick={() => handleStoreSelect(store)}
                      disabled={loadingDetailStore}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                              {loadingDetailStore ? (
                                <LoadingSpinner size="sm" className="text-gray-600" />
                              ) : (
                                <Store className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {store.name}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{store.address}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Store tidak ditemukan</p>
                    <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain</p>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              {loadingStore ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" className="text-gray-400" />
                  <p className="text-xs text-gray-400">Loading stores...</p>
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center">
                  {filteredStores.length} dari {stores.length} store ditampilkan
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Store Modal */}
      {showAddStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100">Add New Store</h3>
              </div>
              <button
                onClick={() => setShowAddStore(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Store Name</label>
                <input
                  type="text"
                  placeholder="Enter store name"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Store Type</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Select type</option>
                  <option value="Flagship">Flagship</option>
                  <option value="Premium">Premium</option>
                  <option value="Mall">Mall</option>
                </select>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddStore(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                >
                  Add Store
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Store Info */}
      {Object.keys(selectedStore || {}).length > 0 && !loadingDetailStore && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-lg focus:outline-none focus:border-transparent transition-all duration-200 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">Store Terpilih</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Store className="w-4 h-4" />
              <span className="font-medium">{selectedStore.name}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{selectedStore.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Detail Store Info */}
      {loadingDetailStore && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Loading Store Details...</h3>
            <LoadingSpinner size="sm" className="text-blue-500" />
          </div>
          <div className="space-y-3">
            {/* Skeleton for store info */}
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-48"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDropdown;