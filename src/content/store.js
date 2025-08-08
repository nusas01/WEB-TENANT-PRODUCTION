import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Star,
  Award,
  CheckCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Store,
  Menu,
  MapPin, 
  Phone, 
  Loader2,
  Globe, 
  Building2,
  Shield,
  UserCheck,
  Clock,
  Calendar,
  CreditCard,
  User,
  Mail,
  DollarSign,
  Search,
  ChevronDown,
  Filter,
  AlertTriangle,
} from 'lucide-react';
import { FinanceRequiredCard, ServiceStatusCards } from './model';
import Sidebar from './sidebar';
import { useElementHeight } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { navbarSlice } from '../reducers/reducers';
import StoreDropdown from '../helperComponent/dropDownStore'
import { data, useNavigate } from 'react-router-dom';
import {
  Toast, 
  ToastPortal
} from './alert'
import {
  formatDateTime,
  formatCurrency
} from './helper'
import {
  detailStoreSlice,
  storeSlice,
  productServicesSlice,
} from '../reducers/get'
import {
  fetchProductServices
} from '../actions/get'
import {
  extendServiceStoreSlice
} from '../reducers/patch'
import NoStoreSelectedContainer from '../helperComponent/noStoreSelected';

const StoreManagementDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sortOption, setSortOption] = useState('name');
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null)

  const { setIsOpen } = navbarSlice.actions
  const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

  const { ref: headerRef, height: headerHeight } = useElementHeight();
  
  // response err get all data store
  const {resetStoreError} = storeSlice.actions
  const {errorStore} = useSelector((state) => state.persisted.store)
  useEffect(() => {
    if (errorStore) {
      setToast({
        type: "error",
        message: "Terjadi kesalahan saat memuat store, silahkan coba lagi nanti"
      })
    }
  }, [errorStore])



  // response error get detail store data
  const {resetDetailStoreError} = detailStoreSlice.actions
  const {
    errorDetailStore, 
    detailStore
  } = useSelector((state) => state.persisted.detailStore)
  
  const storeInfo = detailStore || {}

  useEffect(() => {
    if(errorDetailStore) {
      setToast({
        type: "error",
        message: "Terjadi kesalahan saat memuat detail store, silahkan coba lagi nanti"
      })
    }
  }, [errorDetailStore])


  // extend service navigate to payment processing
  const handleNavigatePaymentProcessing = (data) => {
    navigate('/payment/processing', { state: { currentService: data } });
  }
  
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'Ahmad Rizki', 
      email: 'ahmad.rizki@kasir.com', 
      password: 'password123',
      phoneNumber: '+62 812 3456 7890',
      position: 'Manager', 
      image: null,
      gender: 'Laki-laki',
      dateOfBirth: '1990-05-15',
      salary: 8500000,
      createdAt: '2023-01-15T10:30:00Z'
    },
    { 
      id: 2, 
      name: 'Siti Nurhaliza', 
      email: 'siti.nur@kasir.com', 
      password: 'password123',
      phoneNumber: '+62 813 4567 8901',
      position: 'Staff', 
      image: null,
      gender: 'Perempuan',
      dateOfBirth: '1992-08-22',
      salary: 5500000,
      createdAt: '2023-03-20T09:15:00Z'
    },
    { 
      id: 3, 
      name: 'Budi Santoso', 
      email: 'budi.santoso@kasir.com', 
      password: 'password123',
      phoneNumber: '+62 814 5678 9012',
      position: 'Staff', 
      image: null,
      gender: 'Laki-laki',
      dateOfBirth: '1988-12-10',
      salary: 5200000,
      createdAt: '2023-05-10T14:20:00Z'
    },
    { 
      id: 4, 
      name: 'Maya Putri', 
      email: 'maya.putri@kasir.com', 
      password: 'password123',
      phoneNumber: '+62 815 6789 0123',
      position: 'Manager', 
      image: null,
      gender: 'Perempuan',
      dateOfBirth: '1985-03-28',
      salary: 9000000,
      createdAt: '2023-02-28T11:45:00Z'
    }
  ]);

  // const [storeInfo, setStoreInfo] = useState({
  //   id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  //   name: 'Kasir Store Jakarta',
  //   phoneNumber: '+62 21 1234 5678',
  //   address: 'Jl. Sudirman No. 123',
  //   city: 'Jakarta',
  //   state: 'DKI Jakarta',
  //   country: 'Indonesia',
  //   postalCode: '10220',
  //   websiteAddress: 'https://kasirstore.com',
  //   ppn: 11,
  //   createdAt: '2022-08-15T10:30:00Z'
  // });


  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingStore, setEditingStore] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const [newEmployee, setNewEmployee] = useState({ 
    name: '', 
    email: '', 
    password: '',
    phoneNumber: '',
    position: 'Staff',
    gender: 'Laki-laki',
    dateOfBirth: '',
    salary: 0
  });

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

 const filteredEmployees = employees
  .filter(emp => 
    (roleFilter === 'all' || emp.position === roleFilter) &&
    (
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) 
  .sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'position') return a.position.localeCompare(b.position);
    if (sortOption === 'salary') return b.salary - a.salary;
    return 0;
  });
  

  return (
    <div className='flex'>
      {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
        <div className='w-1/10 z-50 min-w-[290px]'>
          <Sidebar
          activeMenu={"Store"}
          />
        </div>
      )}

      <div className='flex-1'>
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
          <div className="max-w-7xl">
              {toast && (
                <ToastPortal> 
                    <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
                    <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => { 
                      setToast(null)
                      dispatch(resetDetailStoreError())
                      dispatch(resetStoreError())
                    }} 
                    duration={5000}
                    />
                    </div>
                </ToastPortal>
            )}

            {/* Header */}
            <div
              ref={headerRef}
              className={`fixed top-0 z-10 bg-white border-b border-gray-200 ${isMobileDeviceType && isOpen ? 'hidden' : ''}`}
              style={{
                left: (isMobileDeviceType) ? '0' : '288px',
                width: isMobileDeviceType ? '100%' : 'calc(100% - 288px)',
                height: '64px'
              }}
            >
              <div className="h-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
                <div className="flex items-center justify-between h-full gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                        <div className="w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center shadow-lg flex-shrink-0">
                            <Store className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Manage Store</h1>
                            <p className='text-xs taxt-gray-400'>Manage your stores and control access permissions.</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0'>
                      { isMobileDeviceType && (
                        <button 
                          onClick={() => dispatch(setIsOpen(true))}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors touch-manipulation"
                          aria-label="Open menu"
                        >
                          <Menu className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                      )}
                    </div>
                </div>
              </div>
            </div>  


          <div className='mx-auto space-y-8' style={{marginTop: headerHeight}}>
            <StoreDropdown/>
            <FinanceRequiredCard/> 
            
            {Object.keys(storeInfo).length > 0 &&
              new Date(storeInfo.expiration_access) < new Date() && (
                <ServiceStatusCards />
            )}
            
            {Object.keys(storeInfo).length === 0 ? (
              <NoStoreSelectedContainer/>
            ) : (
            <>
              {/* Store Information Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="bg-gray-900 px-6 py-4 text-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Store Information</h2>
                        <p className="text-blue-100">Manage your store details and settings</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingStore(!editingStore)}
                      className="bg-white px-6 py-1.5 text-gray-900 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Edit3 size={18} />
                      Edit
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">Store Name</label>
                        <p className="text-gray-900 font-medium">{storeInfo.name}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                          <Phone size={16} />
                          Phone Number
                        </label>
                        <p className="text-gray-900">{storeInfo.phone_number}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                          <Globe size={16} />
                          Website
                        </label>
                          <a href={storeInfo.ref} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                            {storeInfo.full_domain}
                          </a>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                          <MapPin size={16} />
                          Address
                        </label>
                          <p className="text-gray-900">{storeInfo.address}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">City</label>
                        <p className="text-gray-900">{storeInfo.city}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">Postal Code</label>
                          <p className="text-gray-900">{storeInfo.postal_code}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">State</label>
                          <p className="text-gray-900">{storeInfo.state}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">Country</label>
                          <p className="text-gray-900">{storeInfo.country}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">PPN (%)</label>
                          <p className="text-gray-900">{storeInfo.ppn/1000}%</p>
                      </div>

                    </div>

                    <div>
                      <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                        <Calendar size={16} />
                        Created Date
                      </label>
                      <p className="text-gray-900">{formatDateTime(storeInfo.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Access Management */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden mb-8">
                    <div className="px-6 py-4 text-white">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <Users size={28} className="text-gradient-to-r from-green-500 to-emerald-500" />
                          </div>
                          <div>
                            <h2 className="text-xl md:text-xl font-bold">Access Management</h2>
                            <p className="text-blue-100">Control permissions and roles</p>
                          </div>
                        </div>
                        <button className="bg-white px-6 py-1.5 text-gray-900 rounded-lg flex items-center gap-2 transition-colors">
                          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                          <span>Add Employee</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 mx-6 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 shadow-lg border border-blue-100 flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Users size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Total Employees</p>
                        <p className="text-2xl font-bold text-gray-800">42</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-5 shadow-lg border border-green-100 flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Shield size={24} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Managers</p>
                        <p className="text-2xl font-bold text-gray-800">8</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-5 shadow-lg border border-purple-100 flex items-center gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <UserCheck size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Staf</p>
                        <p className="text-2xl font-bold text-gray-800">36</p>
                      </div>
                    </div>
                  </div>

                  {/* Employee List */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="p-6">
                      {/* Filters and Search */}
                      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                        <div className="relative w-full md:w-1/3">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Search employees..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="flex gap-3 flex-wrap">
                          <div className="relative">
                            <select 
                              value={roleFilter}
                              onChange={(e) => setRoleFilter(e.target.value)}
                              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                            >
                              <option value="all">All Roles</option>
                              <option value="Manager">Manager</option>
                              <option value="Staff">Staff</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                              <ChevronDown size={18} className="text-gray-500" />
                            </div>
                          </div>
                          
                          <div className="relative">
                            <select 
                              value={sortOption}
                              onChange={(e) => setSortOption(e.target.value)}
                              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                            >
                              <option value="name">Sort by Name</option>
                              <option value="position">Sort by Position</option>
                              <option value="salary">Sort by Salary</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                              <Filter size={18} className="text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Employee Cards */}
                      <div className="space-y-4">
                        {filteredEmployees.map((employee) => (
                          <div key={employee.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-blue-200">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                              <div className="flex items-start gap-4 flex-1">
                                <div className="bg-gray-900 w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${
                                      employee.position === 'Manager' 
                                        ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                                    }`}>
                                      {employee.position === 'Manager' ? <Shield size={14} /> : <UserCheck size={14} />}
                                      {employee.position}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
                                      Access: {employee.accessLevel}
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <Mail size={14} className="text-gray-900" />
                                      {employee.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <Phone size={14} className="text-gray-900" />
                                      {employee.phoneNumber}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <User size={14} className="text-gray-900" />
                                      {employee.gender}, {calculateAge(employee.dateOfBirth)} tahun
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <DollarSign size={14} className="text-gray-900" />
                                      {formatCurrency(employee.salary)}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <Calendar size={14} className="text-gray-900" />
                                      Lahir: {formatDateTime(employee.dateOfBirth)}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <Clock size={14} className="text-gray-900" />
                                      Bergabung: {formatDateTime(employee.createdAt)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md">
                                  <Edit3 size={16} />
                                  Edit
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md">
                                  <Trash2 size={16} />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Empty state */}
                      {filteredEmployees.length === 0 && (
                        <div className="text-center py-12">
                          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users size={24} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No employees found</h3>
                          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                      )}
                    </div>
                  </div>
              </div>

              {/* Extended Services */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gray-800 p-3 rounded-lg text-white">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Extended Services</h2>
                    <p className="text-gray-600">Perpanjang layanan</p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Paket Saat Ini: {storeInfo.service_name}</h4>
                      <p className="text-sm text-gray-600">Berakhir pada: {formatDateTime(storeInfo.expiration_access)}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-md">
                        Riwayat Pembayaran
                      </button>
                      <button
                      onClick={() => handleNavigatePaymentProcessing({
                        "store_id": storeInfo.id,
                        "id": storeInfo.service_id,
                        "current_service": storeInfo.service_name, 
                        "verified_at": storeInfo.verified_at,
                        "full_domain": storeInfo.full_domain,
                      })}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-md"
                      >
                        <>
                          Perpanjang Layanan
                        </>
                      </button>
                    </div>
                  </div>
                </div>
            </div>
            </>  
            )}
          </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default StoreManagementDashboard;
