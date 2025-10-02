import { useDispatch } from "react-redux";
import { navbarSlice } from "../reducers/reducers";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useLocation } from 'react-router-dom';

export const useDeviceDetection = () => {
  const dispatch = useDispatch();
  const { setIsMobileDeviceType } = navbarSlice.actions;

  useEffect(() => {
    let timeoutId;

    const detectDevice = () => {
      // Clear timeout sebelumnya
      clearTimeout(timeoutId);
      
      // Debounce untuk mengurangi dispatch saat resize
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        dispatch(setIsMobileDeviceType(width < 1280));
      }, 100); // Delay 100ms
    };

    detectDevice(); // Deteksi saat pertama mount
    window.addEventListener('resize', detectDevice);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', detectDevice);
    };
  }, [dispatch, setIsMobileDeviceType]);
};

export const useOutsideClick = ({ref, callback, isActive = true}) => {
    useEffect(() => {
        if (!isActive) return;

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        function handleTouchOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        // Delay untuk mencegah immediate trigger
        const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleTouchOutside, { passive: true });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleTouchOutside);
        };
    }, [ref, callback, isActive]);
}

export function useElementHeight() {
  const elementRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const updateHeight = () => {
      setHeight(elementRef.current.offsetHeight || 0);
    };

    updateHeight(); // Set awal

    const observer = new ResizeObserver(updateHeight);
    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  return { ref: elementRef, height };
}


export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll ke atas setiap path berubah
  }, [pathname]);

  return null;
};

const formatPrice = (price) => {
  if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(1)}JT`;
  return `Rp ${Math.round(price / 1000)}K`;
};

export const MappingPackage = (dataProductService) => {
  const packageMetadata = {
    Starter: {
      segment: 'Untuk Operasional Dasar & Bisnis Kecil',
      badge: 'Hemat 30%',
      gradient: 'from-green-500 to-green-600',
      popular: false
    },
    Professional: {
      segment: 'Untuk Pertumbuhan & Manajemen Lengkap',
      badge: 'Most Popular',
      gradient: 'from-green-500 to-emerald-600',
      popular: true
    },
    Enterprise: {
      segment: 'Untuk Skala Besar',
      badge: 'Best Value',
      gradient: 'from-green-600 to-green-700',
      popular: false
    }
  };

  // Fungsi untuk mendapatkan features berdasarkan product dan limit_menu
  const getFeaturesMap = (product, limitMenu, userLimit, tableLimit) => {
    const displayLimit = limitMenu ? `hingga ${limitMenu} menu` : 'unlimited menu';
    
    const featuresMap = {
      Starter: [
        'Payment Gateway (QRIS, E-wallet, Bank)',
        'Multi-device Access (HP, Tablet, Laptop)',
        'QR Code untuk dine-in & take-away',
        'Dashboard admin modern',
        `Display menu ${displayLimit}`,
        `Maksimal ${userLimit} akun staff/admin`,
        `Maksimal ${tableLimit} QR Table`,
      ],
      Professional: [
        'Semua fitur Starter Plan',
        'Advanced Analytics dengan AI Insights',
        'Laporan keuangan otomatis',
        'Advanced Reporting + Export Data',
        `Display menu ${displayLimit}`,
        `Maksimal ${userLimit} akun staff/admin`,
        `Maksimal ${tableLimit} QR Table`,
      ],
      Enterprise: [
        'Semua fitur Professional Plan',
        'HR Management terintegrasi',
        'Payroll & absensi otomatis',
        `Display menu ${displayLimit}`,
        `Maksimal ${userLimit} akun staff/admin`,
        `Maksimal ${tableLimit} QR Table`,
      ]
    };

    return featuresMap[product] || [];
  };

  const packages = dataProductService.map((item) => {
    const meta = packageMetadata[item.product] || {};
    const features = getFeaturesMap(item.product, item.limit_menu, item.limit_employee, item.limit_table);

    return {
      id: item.id,
      name: item.product,
      price: item.price,
      originalPrice: item.original_price,
      status: item.status,
      features: features,
      limitMenu: item.limit_menu, // Optional: jika Anda ingin menyimpan nilai asli
      limitEmployee: item.limit_employee,
      limitTable: item.limit_table,
      ...meta
    };
  });

  return packages;
}

export const PaymentMethodImage = (key, widthimg, heightimg) => {
    const paymentImages = {
        BCA: <img src="./image/BCA.png" style={{height: '50px', width: '55px'}}/>,
        BNI: <img src="./image/BNI.png" style={{height: '50px', width: '50px'}}/>,
        BRI: <img src="./image/BRI.png" style={{height: '25px', width: '55px', margin: '10px 0'}}/>,
        BJB: <img src="./image/BJB.png" style={{height: '50px', width: '50px'}}/>,
        CIMB:<img src="./image/CIMB.png" style={{height: '50px', width: '50px'}}/>,
        MANDIRI: <img src="./image/MANDIRI.png" style={{height: '45px', width: '60px', margin: '5px 0'}}/>,
        PERMATA:  <img src="./image/PERMATA.png" style={{height: '30px', width: '60px', margin: '10px 0'}}/>,
        DANA:  <img src="./image/DANA.png" style={{height: '27.5px', width: '60px', margin: '10px 0'}}/>,
        LINKAJA:  <img src="./image/LINKAJA.png" style={{height: '40px', width: '60px', margin: '5px 0'}}/>,
        OVO:  <img src="./image/OVO.jpg" style={{height: '40px', width: '60px'}}/>,
        SHOPEEPAY :  <img src="./image/SHOOPEPAY.png" style={{height: '50px', width: '75px'}}/>,
        QRIS:  <img src="./image/QRIS.png" style={{height: heightimg, width: widthimg}}/>,
    }
    return paymentImages[key]
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getPhoneWithoutPrefix = (phoneNumber) => {
  if (!phoneNumber) return '';
  const phone = phoneNumber.toString();
  if (phone.startsWith('+62')) {
      return phone.substring(3);
  }
  return phone;
};
