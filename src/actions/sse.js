import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchAllStores,
    fetchDetailStore,
} from '../actions/get';
import { GetStatusChangePaymentGatewaySlice } from "../reducers/get";

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
                console.log("SSE data received:", data);
            } catch (err) {
                console.error("SSE JSON parse error:", err);
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
    const dispatch = useDispatch();
    const url = `${process.env.REACT_APP_SSE_CREATE_STORE}`

    useSSE(url, (data) => {
        dispatch(fetchAllStores());
    });

    return null;
}

const SSEExtendServiceStore = () => {
    const dispatch = useDispatch();
    const url = `${process.env.REACT_APP_SSE_EXTEND_SERVICE_STORE}`

    useSSE(url, (data) => {
        dispatch(fetchDetailStore(data));
    });

    return null;
}


const {setSuccessStatusChangePaymentGateway} = GetStatusChangePaymentGatewaySlice.actions
const SSEESubmissionChangePaymentGateway = () => {
    const dispatch = useDispatch();
    const url = `${process.env.REACT_APP_SSE_SUBMISSION_CHANGE_PAYMENT_GATEWAY}`

    useSSE(url, (data) => {
        dispatch(setSuccessStatusChangePaymentGateway(true));
    });

    return null;
}