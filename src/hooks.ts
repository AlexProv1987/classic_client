import { useState, useEffect } from "react";

export function useSessionState<T>(key: string, initialValue: T, clearOnUnload: boolean = false) {
    const [state, setState] = useState<T>(() => {
        const stored = sessionStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
   
    return [state, setState] as const;
}