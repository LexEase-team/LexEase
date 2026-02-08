import { useEffect, useState } from 'react'

export function useWebGazer() {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const loadWebGazer = async () => {
            if (window.webgazer) {
                try {
                    // Initialize WebGazer
                    await window.webgazer.setRegression('ridge')
                        .setTracker('clmtrackr')
                        .begin();

                    window.webgazer.showVideoPreview(true)
                        .showPredictionPoints(true)
                        .applyKalmanFilter(true);

                    setIsReady(true);
                    console.log("WebGazer initialized");
                } catch (error) {
                    console.error("WebGazer init failed:", error);
                }
            }
        }

        // Check if script is loaded, if not, wait or it might be in index.html
        if (window.webgazer) {
            loadWebGazer()
        } else {
            const script = document.querySelector('script[src*="webgazer"]')
            if (script) {
                script.onload = loadWebGazer
            }
        }

        return () => {
            if (window.webgazer) {
                window.webgazer.end();
            }
        }
    }, [])

    return { isReady }
}
