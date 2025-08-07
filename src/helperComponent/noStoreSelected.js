import { Building2, Store, AlertCircle, ArrowDown } from 'lucide-react';

const NoStoreSelectedContainer = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gray-900 p-6 text-white">
                <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                    <Building2 size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Store Information</h2>
                    <p className="text-blue-100">Select a store to view details and settings</p>
                </div>
                </div>
            </div>

            {/* No Store Selected State */}
            <div className="p-8 text-center">
                <div className="max-w-lg mx-auto">
                {/* Main Icon */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Store size={32} className="text-gray-400" />
                </div>
                
                {/* Main Message */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No Store Selected
                </h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Please select a store from the dropdown below to view store information, 
                    manage settings, and access store-specific features.
                </p>
                
                {/* Alert Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                        <AlertCircle size={18} className="text-blue-600" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-blue-800">Store Selection Required</p>
                        <p className="text-xs text-blue-700">Select a store to access management features</p>
                    </div>
                    </div>
                </div>

                {/* Instruction Steps */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <ArrowDown size={16} className="text-gray-600" />
                    Quick Start Guide
                    </h4>
                    <div className="space-y-3 text-sm text-left">
                    <div className="flex items-start gap-3">
                        <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                        <p className="text-gray-700">Click on the dropdown menu above</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                        <p className="text-gray-700">Select your desired store from the list</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                        <p className="text-gray-700">View and manage store information & settings</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}

export default NoStoreSelectedContainer;