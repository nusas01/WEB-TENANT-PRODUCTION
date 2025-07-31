import React, { useState } from 'react';
import { 
  Users, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  MapPin, 
  Phone, 
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
  Eye,
  EyeOff
} from 'lucide-react';

const StoreManagementDashboard = () => {
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

  const [storeInfo, setStoreInfo] = useState({
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Kasir Store Jakarta',
    phoneNumber: '+62 21 1234 5678',
    address: 'Jl. Sudirman No. 123',
    city: 'Jakarta',
    state: 'DKI Jakarta',
    country: 'Indonesia',
    postalCode: '10220',
    websiteAddress: 'https://kasirstore.com',
    ppn: 11,
    createdAt: '2022-08-15T10:30:00Z'
  });

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

  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
  };

  const handleSaveEmployee = () => {
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    ));
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email) {
      const id = Math.max(...employees.map(e => e.id)) + 1;
      setEmployees([...employees, {
        ...newEmployee,
        id,
        createdAt: new Date().toISOString()
      }]);
      setNewEmployee({ 
        name: '', 
        email: '', 
        password: '',
        phoneNumber: '',
        position: 'Staff',
        gender: 'Laki-laki',
        dateOfBirth: '',
        salary: 0
      });
      setShowAddEmployee(false);
    }
  };

  const handleSaveStore = () => {
    setEditingStore(false);
  };

  const togglePasswordVisibility = (employeeId) => {
    setShowPasswords(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
            <p className="text-gray-600 mt-2">Manage your store information and employee access</p>
          </div>
        </div>

        {/* Store Information Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gray-800 p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Building2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Store Information</h2>
                  <p className="text-blue-100">Manage your store details and settings</p>
                </div>
              </div>
              <button
                onClick={() => setEditingStore(!editingStore)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                {editingStore ? <X size={18} /> : <Edit3 size={18} />}
                {editingStore ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Store Name</label>
                  {editingStore ? (
                    <input
                      type="text"
                      value={storeInfo.name}
                      onChange={(e) => setStoreInfo({...storeInfo, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{storeInfo.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  {editingStore ? (
                    <input
                      type="text"
                      value={storeInfo.phoneNumber}
                      onChange={(e) => setStoreInfo({...storeInfo, phoneNumber: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{storeInfo.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                    <Globe size={16} />
                    Website
                  </label>
                  {editingStore ? (
                    <input
                      type="url"
                      value={storeInfo.websiteAddress}
                      onChange={(e) => setStoreInfo({...storeInfo, websiteAddress: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <a href={storeInfo.websiteAddress} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      {storeInfo.websiteAddress}
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                    <MapPin size={16} />
                    Address
                  </label>
                  {editingStore ? (
                    <textarea
                      value={storeInfo.address}
                      onChange={(e) => setStoreInfo({...storeInfo, address: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{storeInfo.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">City</label>
                    {editingStore ? (
                      <input
                        type="text"
                        value={storeInfo.city}
                        onChange={(e) => setStoreInfo({...storeInfo, city: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{storeInfo.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Postal Code</label>
                    {editingStore ? (
                      <input
                        type="text"
                        value={storeInfo.postalCode}
                        onChange={(e) => setStoreInfo({...storeInfo, postalCode: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{storeInfo.postalCode}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">State</label>
                  {editingStore ? (
                    <input
                      type="text"
                      value={storeInfo.state}
                      onChange={(e) => setStoreInfo({...storeInfo, state: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{storeInfo.state}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Country</label>
                  {editingStore ? (
                    <input
                      type="text"
                      value={storeInfo.country}
                      onChange={(e) => setStoreInfo({...storeInfo, country: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{storeInfo.country}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block">PPN (%)</label>
                  {editingStore ? (
                    <input
                      type="number"
                      value={storeInfo.ppn}
                      onChange={(e) => setStoreInfo({...storeInfo, ppn: parseInt(e.target.value)})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{storeInfo.ppn}%</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                    <Calendar size={16} />
                    Created Date
                  </label>
                  <p className="text-gray-900">{formatDate(storeInfo.createdAt)}</p>
                </div>
              </div>
            </div>

            {editingStore && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSaveStore}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Employee Access Management */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gray-800 p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Users size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Manage Access</h2>
                  <p className="text-green-100">Control employee permissions and roles</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddEmployee(true)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Add Employee
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Add Employee Form */}
            {showAddEmployee && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Add New Employee</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newEmployee.password}
                    onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newEmployee.phoneNumber}
                    onChange={(e) => setNewEmployee({...newEmployee, phoneNumber: e.target.value})}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <select
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                  </select>
                  <select
                    value={newEmployee.gender}
                    onChange={(e) => setNewEmployee({...newEmployee, gender: e.target.value})}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={newEmployee.dateOfBirth}
                    onChange={(e) => setNewEmployee({...newEmployee, dateOfBirth: e.target.value})}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Salary (IDR)"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({...newEmployee, salary: parseInt(e.target.value) || 0})}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddEmployee}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                  >
                    <Save size={18} />
                    Add Employee
                  </button>
                  <button
                    onClick={() => setShowAddEmployee(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Employee List */}
            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  {editingEmployee && editingEmployee.id === employee.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input
                          type="text"
                          value={editingEmployee.name}
                          onChange={(e) => setEditingEmployee({...editingEmployee, name: e.target.value})}
                          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Full Name"
                        />
                        <input
                          type="email"
                          value={editingEmployee.email}
                          onChange={(e) => setEditingEmployee({...editingEmployee, email: e.target.value})}
                          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Email"
                        />
                        <input
                          type="tel"
                          value={editingEmployee.phoneNumber}
                          onChange={(e) => setEditingEmployee({...editingEmployee, phoneNumber: e.target.value})}
                          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Phone Number"
                        />
                        <select
                          value={editingEmployee.position}
                          onChange={(e) => setEditingEmployee({...editingEmployee, position: e.target.value})}
                          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Staff">Staff</option>
                          <option value="Manager">Manager</option>
                        </select>
                        <select
                          value={editingEmployee.gender}
                          onChange={(e) => setEditingEmployee({...editingEmployee, gender: e.target.value})}
                          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                        <input
                          type="date"
                          value={editingEmployee.dateOfBirth}
                          onChange={(e) => setEditingEmployee({...editingEmployee, dateOfBirth: e.target.value})}
                          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="number"
                          value={editingEmployee.salary}
                          onChange={(e) => setEditingEmployee({...editingEmployee, salary: parseInt(e.target.value) || 0})}
                          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Salary"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEmployee}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                        >
                          <Save size={16} />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingEmployee(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${
                              employee.position === 'Manager' 
                                ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                                : 'bg-blue-100 text-blue-700 border border-blue-200'
                            }`}>
                              {employee.position === 'Manager' ? <Shield size={14} /> : <UserCheck size={14} />}
                              {employee.position}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail size={14} />
                              {employee.email}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone size={14} />
                              {employee.phoneNumber}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <User size={14} />
                              {employee.gender}, {calculateAge(employee.dateOfBirth)} tahun
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <DollarSign size={14} />
                              {formatCurrency(employee.salary)}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar size={14} />
                              Lahir: {formatDate(employee.dateOfBirth)}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock size={14} />
                              Bergabung: {formatDate(employee.createdAt)}
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-sm text-gray-500">Password:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                {showPasswords[employee.id] ? employee.password : '••••••••'}
                              </span>
                              <button
                                onClick={() => togglePasswordVisibility(employee.id)}
                                className="p-1 rounded hover:bg-gray-200 transition-colors"
                              >
                                {showPasswords[employee.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEmployee(employee)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                        >
                          <Edit3 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extended Services */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-lg text-white">
              <CreditCard size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Extended Services</h2>
              <p className="text-gray-600">Perpanjang layanan untuk 1 bulan ke depan</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Settings size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Basic Plan</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 text-sm">Fitur dasar untuk menjalankan toko</p>
                <p className="text-2xl font-bold text-blue-600">Rp 299.000</p>
                <p className="text-gray-500 text-sm">per bulan</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Manajemen inventory</li>
                <li>• Laporan penjualan</li>
                <li>• 5 pengguna</li>
                <li>• Support email</li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                Perpanjang 1 Bulan
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200 relative">
              <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                Popular
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 p-2 rounded-lg text-white">
                  <Building2 size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Professional</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 text-sm">Solusi lengkap untuk bisnis berkembang</p>
                <p className="text-2xl font-bold text-purple-600">Rp 599.000</p>
                <p className="text-gray-500 text-sm">per bulan</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Semua fitur Basic</li>
                <li>• Analytics advanced</li>
                <li>• 15 pengguna</li>
                <li>• Multi-location</li>
                <li>• Priority support</li>
              </ul>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                Perpanjang 1 Bulan
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 border border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-600 p-2 rounded-lg text-white">
                  <Shield size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Enterprise</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 text-sm">Untuk perusahaan besar</p>
                <p className="text-2xl font-bold text-emerald-600">Rp 999.000</p>
                <p className="text-gray-500 text-sm">per bulan</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Semua fitur Professional</li>
                <li>• Custom integration</li>
                <li>• Unlimited users</li>
                <li>• Dedicated support</li>
                <li>• SLA guarantee</li>
              </ul>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                Perpanjang 1 Bulan
              </button>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-gray-900">Paket Saat Ini: Professional</h4>
                <p className="text-sm text-gray-600">Berakhir pada: 31 Agustus 2025</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-md">
                  Riwayat Pembayaran
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-md">
                  Auto Renewal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Managers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => emp.position === 'Manager').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Shield className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Staff Members</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => emp.position === 'Staff').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Payroll</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(employees.reduce((sum, emp) => sum + emp.salary, 0))}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <DollarSign className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagementDashboard;