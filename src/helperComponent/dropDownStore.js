import React, { useEffect, useRef, useState } from 'react';
import { 
  Plus,  
  Store,
  MapPin, 
  Building2,
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
  fetchDataAccount,
} from '../actions/get'
import { useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../content/helper';


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
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef()

  useOutsideClick({
    ref: dropdownRef,
    callback: () => setIsOpen(false),
    isActive: isOpen,    
  })

  // get all data store
  const {allStores:stores, loadingStore} = useSelector((state) => state.persisted.store) 
  useEffect(() => {
    if (stores.length === 0) {
      dispatch(fetchAllStores())
    }
  }, [])

  // handle data account
  const {dataAccount, errorDataAccount, loadingDataAccount} = useSelector((state) => state.persisted.getDataAccount)
  useEffect(() => {
    if (Object.keys(dataAccount).length === 0) {
      dispatch(fetchDataAccount())
    }
  }, [])

  // get detail data store 
  const {setSelectedStoreId, setSelectedStore} = detailStoreSlice.actions
  const {
    selectedStore, 
    loadingDetailStore
  } = useSelector((state) => state.persisted.detailStore)

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStoreSelect = (store) => {
    dispatch(fetchDetailStore(store.id))
    dispatch(setSelectedStoreId(store.id))
    dispatch(setSelectedStore(store))
    setIsOpen(false);
    setSearchTerm('');
  };

   return (
    <div className="w-full" ref={dropdownRef}>
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
          <div className="absolute z-[1000] mt-2 w-full bg-white rounded-xl shadow-xl max-h-96 overflow-hidden">
            {/* Header with Add Store Button */}
            <div className="p-3 flex items-center justify-between">
              <h2>Pilih Store</h2>
              {dataAccount?.api_key && dataAccount?.secret_key_webhook && dataAccount?.bussness_id && dataAccount.established_account && (
                <button
                  onClick={() => navigate("/store/add")}
                  disabled={loadingStore}
                  className="flex items-center space-x-1 px-6 py-1.5 bg-gray-900 text-white text-md rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-6 h-6" />
                  <span>Add Store</span>
                </button>
              )}
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