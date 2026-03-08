import { useState, useEffect, useRef, useCallback } from 'react';

const TICK_MS = 80;
const STALL_AT = 85;
const COMPLETE_DELAY_MS = 380;

export function useIframeProgress(key: string) {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // reset progress on URL change
    useEffect(() => {
        setProgress(0);
        setIsLoading(true);

        // simulate progress: fast at start, slows near 85%
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= STALL_AT) {
                    clearTimer();
                    return STALL_AT;
                }
                // ease progress: fast early, slow near STALL_AT
                const step = Math.max(0.4, (STALL_AT - prev) * 0.07);
                return Math.min(STALL_AT, prev + step);
            });
        }, TICK_MS);

        return clearTimer;
    }, [key]);

    // trigger when iframe onLoad fires
    const onIframeLoad = useCallback(() => {
        clearTimer();
        setProgress(100);
        // called on iframe load
        setTimeout(() => setIsLoading(false), COMPLETE_DELAY_MS);
    }, []);

    return { progress, isLoading, onIframeLoad };
}
