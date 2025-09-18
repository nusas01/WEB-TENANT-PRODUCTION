import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Store, Phone, MapPin, Building2, Map, Globe, Mail } from 'lucide-react';
import { updateStore } from '../actions/put'; 
import { updateStoreSlice } from '../reducers/put';
import {
    Toast,
    ToastPortal
} from './alert';

const UpdateStoreTenantForm = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const dataStore = location.state?.dataStoreState;

    // Function untuk mengambil nomor tanpa prefix +62
    const getPhoneWithoutPrefix = (phoneNumber) => {
        if (!phoneNumber) return '';
        const phone = phoneNumber.toString();
        if (phone.startsWith('+62')) {
            return phone.substring(3);
        }
        return phone;
    };

    const [formData, setFormData] = useState({
        id: dataStore?.id,
        name: dataStore?.name || '',
        phone_number: getPhoneWithoutPrefix(dataStore?.phone_number) || '',
        address: dataStore?.address || '',
        city: dataStore?.city || '',
        state: dataStore?.state || '',
        country: dataStore?.country || '',
        postal_code: dataStore?.postal_code || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Khusus untuk phone_number, hanya terima angka
        if (name === 'phone_number') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        // Name
        if (!formData.name) newErrors.Name = 'Nama toko wajib diisi';
        else if (formData.name.length < 6) newErrors.Name = 'Nama minimal 6 karakter';
        else if (formData.name.length > 50) newErrors.Name = 'Nama maksimal 50 karakter';

        // Phone
        if (!formData.phone_number) newErrors.PhoneNumber = 'Nomor telepon wajib diisi';
        else if (formData.phone_number.length < 8) newErrors.PhoneNumber = 'Nomor telepon minimal 8 digit';
        else if (formData.phone_number.length > 13) newErrors.PhoneNumber = 'Nomor telepon maksimal 13 digit';

        // Address
        if (!formData.address) newErrors.Address = 'Alamat wajib diisi';
        else if (formData.address.length > 100) newErrors.Address = 'Alamat maksimal 100 karakter';

        // City
        if (!formData.city) newErrors.City = 'Kota wajib diisi';
        else if (formData.city.length > 50) newErrors.City = 'Kota maksimal 50 karakter';

        // State
        if (!formData.state) newErrors.State = 'Provinsi wajib diisi';
        else if (formData.state.length > 50) newErrors.State = 'Provinsi maksimal 50 karakter';

        // Country
        if (!formData.country) newErrors.Country = 'Negara wajib diisi';
        else if (formData.country.length > 50) newErrors.Country = 'Negara maksimal 50 karakter';

        // Postal Code
        if (!formData.postal_code) newErrors.PostalCode = 'Kode pos wajib diisi';
        else if (formData.postal_code.length !== 5) newErrors.PostalCode = 'Harus tepat 5 karakter';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const inputClass = (field) =>
        `block w-full px-3 py-3 border ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
        } rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent`;

    const regularInputClass = (field) =>
        `block w-full pl-10 pr-3 py-3 border ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
        } rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent`;

    // handle action update store
    const { resetUpdateStore } = updateStoreSlice.actions;
    const { successUpdateStore, errorUpdateStore, errorFieldUpdateStore, loadingUpdateStore } = useSelector((state) => state.updateStoreState);

    useEffect(() => {
        if (successUpdateStore) {
            navigate('/store', {state: {storeIdUpdateStore: dataStore?.id}});
        }
    }, [successUpdateStore]);

    useEffect(() => {
        if (errorUpdateStore) {
            setToast({
                type: "error",
                message: errorUpdateStore
            });
        }
    }, [errorUpdateStore]);

    useEffect(() => {
            if (Object.keys(errorFieldUpdateStore).length > 0) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' 
                });
    
                if (Array.isArray(errorFieldUpdateStore) && errorFieldUpdateStore.length > 0) {
                    const mergedErrors = errorFieldUpdateStore.reduce((acc, curr) => {
                        return { ...acc, ...curr };
                    }, {});
    
                    setErrors(prev => ({
                        ...prev,
                        ...mergedErrors
                    }));
                }
            }
        }, [errorFieldUpdateStore])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        // Tambahkan prefix +62 saat dispatch
        const submitData = {
            ...formData,
            phone_number: `+62${formData.phone_number}`
        };
        
        dispatch(resetUpdateStore());
        dispatch(updateStore(submitData));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {toast && (
                <ToastPortal> 
                    <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
                        <Toast 
                            message={toast.message} 
                            type={toast.type} 
                            onClose={() => { 
                                setToast(null);
                                dispatch(resetUpdateStore());
                            }} 
                            duration={5000}
                        />
                    </div>
                </ToastPortal>
            )}

            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gray-900 py-6 px-8">
                        <h1 className="text-2xl font-bold text-white">Update Store Information</h1>
                        <p className="text-gray-300 mt-1">Update your store details below</p>
                    </div>


                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                            {/* Name */}
                            <div className="md:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                                    Nama Toko
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Store className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={regularInputClass('Name')}
                                        placeholder="Masukkan nama toko"
                                    />
                                </div>
                                {errors.Name && <p className="mt-1 text-sm text-red-600">• {errors.Name}</p>}
                            </div>

                            {/* Phone Number with +62 prefix */}
                            <div className="md:col-span-2">
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-900 mb-1">
                                    Phone Number *
                                </label>
                                <div className="relative flex items-center">
                                    <div className="flex items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3 py-3 h-full">
                                        <Phone className="h-5 w-5 text-gray-500 mr-2" />
                                        <span className="text-gray-700 font-medium">+62</span>
                                        <div className="w-px h-6 bg-gray-300 ml-3"></div>
                                    </div>
                                    <input
                                        id="phone_number"
                                        name="phone_number"
                                        type="tel"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        className={`${inputClass('PhoneNumber')} rounded-l-none border-l-0 pl-3`}
                                        placeholder="8123456789"
                                        maxLength="13"
                                    />
                                </div>
                                {errors.PhoneNumber && <p className="mt-1 text-sm text-red-600">• {errors.PhoneNumber}</p>}
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-900 mb-1">
                                    Alamat
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={regularInputClass('Address')}
                                        placeholder="Masukkan alamat lengkap"
                                    />
                                </div>
                                {errors.Address && <p className="mt-1 text-sm text-red-600">• {errors.Address}</p>}
                            </div>

                            {/* City */}
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-900 mb-1">
                                    Kota
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building2 className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={regularInputClass('City')}
                                        placeholder="Masukkan kota"
                                    />
                                </div>
                                {errors.City && <p className="mt-1 text-sm text-red-600">• {errors.City}</p>}
                            </div>

                            {/* State */}
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-900 mb-1">
                                    Provinsi
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Map className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="state"
                                        name="state"
                                        type="text"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={regularInputClass('State')}
                                        placeholder="Masukkan provinsi"
                                    />
                                </div>
                                {errors.State && <p className="mt-1 text-sm text-red-600">• {errors.State}</p>}
                            </div>

                            {/* Country */}
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-900 mb-1">
                                    Negara
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Globe className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={regularInputClass('Country')}
                                        placeholder="Masukkan negara"
                                    />
                                </div>
                                {errors.Country && <p className="mt-1 text-sm text-red-600">• {errors.Country}</p>}
                            </div>

                            {/* Postal Code */}
                            <div>
                                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-900 mb-1">
                                    Kode Pos
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="postal_code"
                                        name="postal_code"
                                        type="text"
                                        value={formData.postal_code}
                                        onChange={handleChange}
                                        className={regularInputClass('PostalCode')}
                                        placeholder="Kode 5 digit"
                                    />
                                </div>
                                {errors.PostalCode && <p className="mt-1 text-sm text-red-600">• {errors.PostalCode}</p>}
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className='px-6 py-3 rounded-lg font-medium bg-white hover:bg-gray-300 border border-gray-900 text-gray-9000 transition duration-300'
                            >
                                Cancel 
                            </button>
                            <button
                                type="submit"
                                disabled={loadingUpdateStore}
                                className={`px-6 py-3 rounded-lg font-medium ${
                                    loadingUpdateStore
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gray-900 hover:bg-gray-800'
                                } text-white transition duration-300 shadow-lg transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900`}
                            >
                                {loadingUpdateStore ? 'Updeting...' : 'Update Store'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateStoreTenantForm;