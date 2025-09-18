import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchAllStores,
    fetchDetailStore,
    fetchRequiredPayment,
} from '../actions/get';
import { GetStatusChangePaymentGatewaySlice } from "../reducers/get";
import { useLocation, useNavigate } from "react-router-dom";

export const UseSSEContainer = () => {
    const { loggedIn } = useSelector((state) => state.persisted.loginStatus)
    
    return (
        <>
            {loggedIn && <SSECreateStore />}
            {loggedIn && <SSEExtendServiceStore />}
            {loggedIn && <SSEESubmissionChangePaymentGateway />}
        </>
    )
}

const useSSE = (url, onMessage) => {
    const sourceRef = useRef(null);

    useEffect(() => {
        if (!url || sourceRef.current) return;

        const evtSource = new EventSource(url, { withCredentials: true });
        sourceRef.current = evtSource;

        evtSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (err) {
            }
        };

        // evtSource.onerror = (err) => {
        //     console.error("SSE connection error:", err);
        // };

        return () => {
            if (sourceRef.current) {
                sourceRef.current.close();
                sourceRef.current = null;
            }
        };
    }, [url, onMessage]);
};


const SSECreateStore = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const pathName = location?.pathname

    const url = `${process.env.REACT_APP_SSE_CREATE_STORE}`

    useSSE(url, (data) => {
        if (data.refresh_stores) {
            dispatch(fetchAllStores());
            dispatch(fetchRequiredPayment())
            if (pathName == '/invoice/create/store') {
                navigate('/store')
            }
        }
    });

    return null;
}

const SSEExtendServiceStore = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const pathName = location?.pathname

    const url = `${process.env.REACT_APP_SSE_EXTEND_SERVICE_STORE}`

    useSSE(url, (data) => {
        dispatch(fetchDetailStore(data.id));
        dispatch(fetchRequiredPayment())
        if (pathName === '/invoice/extend/service') {
            navigate('/store')
        }
    });

    return null;
}


const {setSuccessStatusChangePaymentGateway} = GetStatusChangePaymentGatewaySlice.actions
const SSEESubmissionChangePaymentGateway = () => {
    const dispatch = useDispatch();
    const url = `${process.env.REACT_APP_SSE_SUBMISSION_CHANGE_PAYMENT_GATEWAY}`

    useSSE(url, (data) => {
        if (data.is_update) {
            dispatch(setSuccessStatusChangePaymentGateway({
                isUpdate:true,
                isProcess:false,
            }));
        }
    });

    return null;
}