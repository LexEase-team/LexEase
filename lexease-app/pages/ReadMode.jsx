import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, Sparkles, Upload, X, Loader2 } from "lucide-react"
import * as pdfjsLib from 'pdfjs-dist'

// Set worker source for pdfjs
// Using unpkg for better reliability with newer versions
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

// Mock data for demo words - still kept for the "demo" experience
// Add import at the top
import { fetchWordDefinition } from "../lib/openai"

// Mock data for demo words - still kept for the "demo" experience
const MOCK_WORD_DATA = {
    "beautiful": {
        syllables: "beau-ti-ful",
        phonetic: "/ˈbjuː.tɪ.fəl/",
        meaning: "Very pleasing to look at.",
        example: "The flower is beautiful."
    },
    "demonstrate": {
        syllables: "dem-on-strate",
        phonetic: "/ˈdɛm.ən.streɪt/",
        meaning: "To show clearly.",
        example: "He will demonstrate the game."
    },
    "adaptive": {
        syllables: "a-dap-tive",
        phonetic: "/əˈdæp.tɪv/",
        meaning: "Able to change as needed.",
        example: "The software is adaptive."
    }
}

const Word = ({ text, onStruggle }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isStruggling, setIsStruggling] = useState(false)
    const [aiData, setAiData] = useState(null)
    const [isLoadingAi, setIsLoadingAi] = useState(false)
    const timerRef = useRef(null)

    // Clean word for lookup (remove punctuation)
    const cleanText = text.replace(/[.,]/g, '').toLowerCase()

    // Check mock data first
    const mockData = MOCK_WORD_DATA[cleanText]

    const handleMouseEnter = () => {
        setIsHovered(true)
        timerRef.current = setTimeout(async () => {
            setIsStruggling(true)
            onStruggle(cleanText)

            // If no mock data, fetch from OpenAI
            if (!mockData && !aiData) {
                setIsLoadingAi(true)
                try {
                    const result = await fetchWordDefinition(cleanText)
                    setAiData(result)
                } catch (e) {
                    console.error("Definition fetch failed:", e)
                } finally {
                    setIsLoadingAi(false)
                }
            }
        }, 1000) // 1 second hover triggers "struggle"
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        setIsStruggling(false)
    }

    const handleSpeak = (e) => {
        e.stopPropagation()
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.rate = 0.8
            utterance.pitch = 1
            window.speechSynthesis.cancel()
            window.speechSynthesis.speak(utterance)
        } else {
            alert("Text-to-speech is not supported in this browser.")
        }
    }

    // Determine what data to show (Mock > AI > Fallback)
    const displayData = mockData || aiData || {
        syllables: text,
        phonetic: "...",
        meaning: "Loading definition...",
        example: "..."
    }

    return (
        <span
            className="relative inline-block mr-1.5 cursor-pointer whitespace-nowrap"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.span
                layout
                animate={{
                    letterSpacing: isStruggling ? "0.1em" : "normal",
                    color: isStruggling ? "#6366F1" : "inherit",
                    fontWeight: isStruggling ? 600 : 400,
                }}
                className={`rounded px-0.5 transition-colors duration-300 ${isStruggling ? 'bg-indigo-50' : ''}`}
            >
                {(isStruggling && (mockData || aiData)) ? (mockData || aiData).syllables : text}
            </motion.span>

            {/* Tooltip */}
            <AnimatePresence>
                {isStruggling && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 p-4 bg-white rounded-xl shadow-xl border border-indigo-100 z-50 text-left"
                        style={{ minWidth: '220px', width: 'max-content', maxWidth: '300px' }}
                    >
                        {isLoadingAi ? (
                            <div className="flex items-center justify-center p-4 space-x-2 text-indigo-500">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="text-xs font-medium">Asking AI...</span>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <span className="text-sm font-bold text-gray-900">{displayData.syllables}</span>
                                        <span className="ml-2 text-xs text-gray-500 font-mono">{displayData.phonetic}</span>
                                    </div>
                                    <button
                                        onClick={handleSpeak}
                                        className="p-1.5 rounded-full hover:bg-gray-100 text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        title="Listen to pronunciation"
                                    >
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm text-gray-700 leading-snug">
                                        <span className="font-semibold text-xs text-indigo-400 uppercase tracking-wider block mb-0.5">Meaning</span>
                                        {displayData.meaning}
                                    </div>
                                    <div className="text-xs text-gray-500 italic border-l-2 border-indigo-100 pl-2">
                                        "{displayData.example}"
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    )
}

export function ReadMode() {
    const [isTracking, setIsTracking] = useState(false)
    const [extractedText, setExtractedText] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null)

    const demoText = "The beautiful flowers demonstrate adaptive qualities in nature. When you struggle with a word, simply hover over it to see the magic happen."

    // Derived words list - no need for extra state/effect
    const currentText = extractedText || demoText
    const wordsList = currentText.split(/\s+/).filter(w => w.length > 0)

    const [gazePoint, setGazePoint] = useState(null)
    const [debugGaze, setDebugGaze] = useState({ x: 0, y: 0 })
    const [trackingError, setTrackingError] = useState(null)
    const lastUpdate = useRef(0)
    const isInitialized = useRef(false)

    useEffect(() => {
        const startGaze = async () => {
            if (isTracking) {
                // Check if WebGazer is loaded
                if (!window.webgazer) {
                    setTrackingError("WebGazer library not loaded. Please refresh the page.")
                    console.error("WebGazer not found on window object")
                    return
                }

                try {
                    console.log("Requesting camera permissions...")
                    setTrackingError(null)

                    // Request camera permission first
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                    console.log("Camera permission granted")

                    // Stop the test stream
                    stream.getTracks().forEach(track => track.stop())

                    // Now initialize WebGazer
                    if (!isInitialized.current) {
                        console.log("Initializing WebGazer...")
                        await window.webgazer
                            .setRegression('ridge')
                            .setTracker('clmtrackr')
                            .begin()

                        isInitialized.current = true
                    } else {
                        // Resume if already initialized
                        window.webgazer.resume()
                    }

                    window.webgazer
                        .showVideoPreview(true)
                        .showPredictionPoints(true)
                        .applyKalmanFilter(true)

                    // Set listener
                    window.webgazer.setGazeListener((data, clock) => {
                        if (data) {
                            // Throttle updates to ~10fps for UI display
                            const now = Date.now()
                            if (now - lastUpdate.current > 100) {
                                setDebugGaze({
                                    x: Math.round(data.x),
                                    y: Math.round(data.y)
                                })
                                lastUpdate.current = now
                            }
                        }
                    })

                    console.log("WebGazer initialized successfully")
                } catch (e) {
                    console.error("WebGazer failed to start:", e)
                    if (e.name === 'NotAllowedError') {
                        setTrackingError("Camera permission denied. Please allow camera access and try again.")
                    } else if (e.name === 'NotFoundError') {
                        setTrackingError("No camera found. Please connect a camera and try again.")
                    } else {
                        setTrackingError(`Error: ${e.message}`)
                    }
                }
            } else {
                // Pause/Stop logic
                if (window.webgazer && isInitialized.current) {
                    try {
                        window.webgazer.pause()
                        window.webgazer.showVideoPreview(false)
                        window.webgazer.showPredictionPoints(false)
                        console.log("WebGazer paused")
                    } catch (e) {
                        console.error("Error pausing webgazer", e)
                    }
                }
            }
        }

        startGaze()

        // Cleanup on unmount
        return () => {
            if (window.webgazer && isInitialized.current) {
                try {
                    window.webgazer.pause()
                    window.webgazer.showVideoPreview(false)
                    window.webgazer.showPredictionPoints(false)
                } catch (e) {
                    console.error("Cleanup error:", e)
                }
            }
        }
    }, [isTracking])

    const handleToggleTracking = () => {
        setIsTracking(!isTracking)
    }

    const handleStruggle = (word) => {
        console.log("Struggle detected on:", word)
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setIsLoading(true)
        try {
            const arrayBuffer = await file.arrayBuffer()

            // Pass data as object to getDocument for better compatibility
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
            const pdf = await loadingTask.promise

            let fullText = ''
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                const pageText = textContent.items.map(item => item.str).join(' ')
                fullText += pageText + ' '
            }

            // Cleanup text
            const cleanText = fullText.replace(/\s+/g, ' ').trim()
            setExtractedText(cleanText)
            console.log("Extracted text length:", cleanText.length)
        } catch (error) {
            console.error("Error extracting text from PDF:", error)
            alert(`Failed to extract text: ${error.message}`)
        } finally {
            setIsLoading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-32">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Read Mode</h1>
                    <p className="text-gray-500 text-sm mt-1">Adaptive reading capability</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {extractedText ? (
                        <Button variant="outline" size="sm" onClick={() => setExtractedText(null)}>
                            <X className="w-4 h-4 mr-2" />
                            Clear PDF
                        </Button>
                    ) : (
                        <>
                            <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />
                            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload PDF
                            </Button>
                        </>
                    )}

                    <Button
                        variant={isTracking ? "destruct" : "secondary"}
                        size="sm"
                        onClick={handleToggleTracking}
                    >
                        {isTracking ? "Stop Eye Tracking" : "Start Eye Tracking"}
                    </Button>
                </div>
            </div>

            <Card className="min-h-[500px] border-none shadow-nav overflow-visible relative">
                <CardContent className="p-8 md:p-12 leading-loose text-xl md:text-2xl font-medium text-gray-800 relative min-h-[400px]">
                    {isTracking && (
                        <div className="absolute top-4 right-4 text-xs text-green-500 animate-pulse font-bold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Tracking Active
                        </div>
                    )}

                    {isLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-xl">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                            <p className="text-gray-500 animate-pulse">Extracting text from PDF...</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap items-center">
                            {wordsList.map((word, i) => (
                                <Word key={i} text={word} onStruggle={handleStruggle} />
                            ))}
                        </div>
                    )}

                    {!extractedText && !isLoading && (
                        <div className="mt-12 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-base text-yellow-800 flex items-start gap-3">
                            <Sparkles className="w-5 h-5 mt-0.5 text-yellow-600" />
                            <div>
                                <p className="font-semibold">Try uploading your own content!</p>
                                <p className="text-sm opacity-90">Click "Upload PDF" to see how TriRead adapts to your study material.</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-center text-center">
                <p className="text-sm text-gray-400">
                    {isTracking ? (
                        <span className="font-mono">
                            Scanning... [x: {debugGaze.x}, y: {debugGaze.y}]
                        </span>
                    ) : (
                        "Gaze tracking disabled. Mouse hover is active."
                    )}
                </p>
            </div>
        </div>
    )
}
