import React, { useState } from 'react';
import { 
  Star,
  Plus,  
  Store,
  MapPin, 
  Building2,
  Clock,
  Search,
  ChevronDown,
} from 'lucide-react';

const StoreDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStore, setShowAddStore] = useState(false);

  // Sample store data
  const stores = [
    {
      id: 1,
      name: "Nusas Central Store",
      location: "Jakarta Pusat",
      status: "Aktif",
      rating: 4.8,
      lastUpdate: "2 jam lalu",
      type: "Flagship"
    },
    {
      id: 2,
      name: "Nusas Mall Kelapa Gading",
      location: "Jakarta Utara",
      status: "Aktif",
      rating: 4.6,
      lastUpdate: "5 jam lalu",
      type: "Mall"
    },
    {
      id: 3,
      name: "Nusas Senayan City",
      location: "Jakarta Selatan",
      status: "Maintenance",
      rating: 4.7,
      lastUpdate: "1 hari lalu",
      type: "Mall"
    },
    {
      id: 4,
      name: "Nusas PIK Avenue",
      location: "Jakarta Utara",
      status: "Aktif",
      rating: 4.5,
      lastUpdate: "3 jam lalu",
      type: "Mall"
    },
    {
      id: 5,
      name: "Nusas Grand Indonesia",
      location: "Jakarta Pusat",
      status: "Aktif",
      rating: 4.9,
      lastUpdate: "1 jam lalu",
      type: "Premium"
    }
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'Maintenance':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Flagship':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      case 'Premium':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'Mall':
        return 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left bg-white rounded-xl shadow-lg hover:border-gray-600 focus:outline-none focus:border-transparent transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {selectedStore ? (
                <div>
                  <p className="text-md font-medium text-gray-900 truncate">
                    {selectedStore.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {selectedStore.location}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Pilih Store
                  </p>
                  <p className="text-xs text-gray-600">
                    Klik untuk memilih store
                  </p>
                </div>
              )}
            </div>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-gray-900 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-xl max-h-96 overflow-hidden">
            {/* Header with Add Store Button */}
            <div className="p-3 flex items-center justify-between">
              <h2>Pilih Store</h2>
              <button
                onClick={() => setShowAddStore(true)}
                className="flex items-center space-x-1 px-6 py-1.5 bg-gray-900 text-white text-md font-medium rounded-md transition-colors duration-200"
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
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Store List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => handleStoreSelect(store)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                            <Store className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {store.name}
                            </p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(store.type)}`}>
                              {store.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{store.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-current text-yellow-400" />
                              <span>{store.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1 ml-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(store.status)}`}>
                          {store.status}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{store.lastUpdate}</span>
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

            {/* Footer */}
            <div className="p-3 bg-gray-750 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                {filteredStores.length} dari {stores.length} store ditampilkan
              </p>
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
            
            <form className="space-y-4">
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
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                >
                  Add Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        {/* Selected Store Info */}
        {selectedStore && (
            <div className="mt-4 p-6 bg-white rounded-lg shadow-lg focus:outline-none focus:border-transparent transition-all duration-200 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">Store Terpilih</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedStore.status)}`}>
                {selectedStore.status}
                </span>
            </div>
            <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Store className="w-4 h-4" />
                <span className="font-medium">{selectedStore.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedStore.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current text-yellow-400" />
                    <span>{selectedStore.rating}/5</span>
                </div>
                </div>
            </div>
            </div>
        )}
    </div>
  );
};

export default StoreDropdown;