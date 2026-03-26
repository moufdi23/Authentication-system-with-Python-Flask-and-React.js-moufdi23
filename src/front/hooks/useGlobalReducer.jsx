
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore, actions as createActions } from "../store";


const StoreContext = createContext();


export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());


    const actions = createActions(dispatch, () => store);

    return (
        <StoreContext.Provider value={{ store, dispatch, actions }}>
            {children}
        </StoreContext.Provider>
    );
}


export default function useGlobalReducer() {
    const { store, dispatch, actions } = useContext(StoreContext);
    return { store, dispatch, actions };
}