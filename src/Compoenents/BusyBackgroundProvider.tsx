import React from 'react'
import { createContext, useReducer, useContext } from 'react';

interface BusyBackgroundProviderProps {
    children: React.JSX.Element
}

export const BusyBackgroundContext = createContext(false);
export const BusyBackgroundDispatch = createContext((show: boolean) => { });

export const BusyBackgroundProvider = ({ children }: BusyBackgroundProviderProps): React.JSX.Element => {
    const [progressBar, dispatch] = useReducer(
        progressBarReducer,
        false
    );

    return (
        <BusyBackgroundContext.Provider value={progressBar}>
            <BusyBackgroundDispatch.Provider value={dispatch}>
                {children}
            </BusyBackgroundDispatch.Provider>
        </BusyBackgroundContext.Provider>
    );
}

function progressBarReducer(state: boolean, show: boolean) {
    return show;
}

export function useBusyBackgroundContext() {
    const ret = useContext(BusyBackgroundContext);
    return ret;
}

export function useBusyBackgroundDispatch() {
    return useContext(BusyBackgroundDispatch);
}