import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, Sparkles, Upload, X, Loader2, Target, AlertCircle, Activity } from "lucide-react"
import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist/build/pdf'
import { fetchWordDefinition } from "../lib/openai"
import { cn } from "../lib/utils"
import { Logo } from "../components/ui/Logo"

// Set worker source for pdfjs with extreme safety check
try {
    if (GlobalWorkerOptions) {
        GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version || '5.4.624'}/build/pdf.worker.min.mjs`
    } else if (typeof window !== 'undefined' && version) {
        // Fallback or legacy path
        console.warn("pdfjs worker configuration might be incomplete");
    }
} catch (e) {
    console.warn("Critical pdfjs initialization failed, module may have limited functionality", e);
}

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

    const cleanText = text.replace(/[.,]/g, '').toLowerCase()
    const mockData = MOCK_WORD_DATA[cleanText]

    const handleMouseEnter = () => {
        setIsHovered(true)
        timerRef.current = setTimeout(async () => {
            setIsStruggling(true)
            onStruggle(cleanText)

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
        }, 800)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        if (timerRef.current) clearTimeout(timerRef.current)
        setIsStruggling(false)
    }

    const handleSpeak = (e) => {
        e.stopPropagation()
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.rate = 0.8
            window.speechSynthesis.cancel()
            window.speechSynthesis.speak(utterance)
        }
    }

    const displayData = mockData || aiData || {
        syllables: text,
        phonetic: "...",
        meaning: "Loading definition...",
        example: "..."
    }

    return (
        <span
            className="relative inline-block mr-2 cursor-pointer whitespace-nowrap"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.span
                layout
                animate={{
                    letterSpacing: isStruggling ? "0.15em" : "normal",
                    color: isStruggling ? "#6366F1" : "inherit",
                    fontWeight: isStruggling ? 700 : 500,
                    scale: isStruggling ? 1.05 : 1
                }}
                className={cn(
                    "rounded-xl px-2 py-0.5 transition-all duration-300 italic tracking-tight",
                    isStruggling ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : ''
                )}
            >
                {(isStruggling && (mockData || aiData)) ? (mockData || aiData).syllables : text}
            </motion.span>

            <AnimatePresence>
                {isStruggling && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 text-left min-w-[280px]"
                    >
                        {isLoadingAi ? (
                            <div className="flex items-center justify-center p-4 space-x-3 text-primary">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="text-sm font-bold uppercase tracking-widest italic">Awaiting AI...</span>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="space-y-1">
                                        <p className="text-xl font-black text-slate-800 italic">{displayData.syllables}</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{displayData.phonetic}</p>
                                    </div>
                                    <button
                                        onClick={handleSpeak}
                                        className="p-3 bg-slate-50 rounded-2xl hover:bg-primary/10 text-primary transition-all hover:scale-110"
                                    >
                                        <Volume2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 italic">Meaning</p>
                                        <p className="text-sm text-slate-700 font-medium leading-relaxed italic">{displayData.meaning}</p>
                                    </div>
                                    <p className="text-xs text-slate-400 italic border-l-2 border-primary/20 pl-3">
                                        "{displayData.example}"
                                    </p>
                                </div>
                            </>
                        )}
                        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-100 rotate-45" />
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
    const currentText = extractedText || demoText
    const wordsList = currentText.split(/\s+/).filter(w => w.length > 0)

    const [debugGaze, setDebugGaze] = useState({ x: 0, y: 0 })
    const [trackingError, setTrackingError] = useState(null)
    const [isCalibrating, setIsCalibrating] = useState(false)
    const lastUpdate = useRef(0)
    const isInitialized = useRef(false)

    const handleStruggle = (word) => {
        console.log(`Telemetry: Struggling with "${word}" - increasing node isolation.`);
    }

    useEffect(() => {
        const startGaze = async () => {
            if (isTracking && window.webgazer) {
                try {
                    setTrackingError(null)
                    setIsCalibrating(true)
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                    stream.getTracks().forEach(track => track.stop())

                    if (!isInitialized.current) {
                        await window.webgazer.setRegression('ridge').setTracker('clmtrackr').begin()
                        isInitialized.current = true
                    } else {
                        window.webgazer.resume()
                    }

                    window.webgazer.showVideoPreview(true).showPredictionPoints(true).applyKalmanFilter(true)
                    window.webgazer.setGazeListener((data) => {
                        if (data) {
                            const now = Date.now()
                            if (now - lastUpdate.current > 50) {
                                setDebugGaze({ x: Math.round(data.x), y: Math.round(data.y) })
                                lastUpdate.current = now
                            }
                        }
                    })
                    setIsCalibrating(false)
                } catch (e) {
                    setTrackingError(e.name === 'NotAllowedError' ? "Camera access denied." : "Webcam error.")
                    setIsTracking(false)
                }
            } else if (window.webgazer && isInitialized.current) {
                window.webgazer.pause()
                window.webgazer.showVideoPreview(false).showPredictionPoints(false)
            }
        }
        startGaze()
        return () => { if (window.webgazer && isInitialized.current) window.webgazer.pause() }
    }, [isTracking])

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return
        setIsLoading(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdf = await getDocument({ data: arrayBuffer }).promise
            let fullText = ''
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                fullText += textContent.items.map(item => item.str).join(' ') + ' '
            }
            setExtractedText(fullText.replace(/\s+/g, ' ').trim())
        } catch (error) {
            alert(`Failed: ${error.message}`)
        } finally {
            setIsLoading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {/* Eye Tracking Dot */}
            <AnimatePresence>
                {isTracking && !trackingError && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', left: debugGaze.x, top: debugGaze.y,
                            width: '32px', height: '32px', backgroundColor: 'rgba(99, 102, 241, 0.2)',
                            borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
                            transform: 'translate(-50%, -50%)', border: '2px solid #6366F1'
                        }}
                    >
                        <div className="absolute inset-0 m-auto w-2 h-2 bg-primary rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex items-center gap-5">
                    <Logo className="w-12 h-12" />
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight italic">Adaptive Reader</h1>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Neural Experience Active</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />
                    <Button variant="outline" size="sm" onClick={() => extractedText ? setExtractedText(null) : fileInputRef.current?.click()} className="rounded-2xl bg-white border-slate-100 hover:bg-slate-50 h-12 px-6">
                        {extractedText ? <><X className="w-4 h-4 mr-2" /> Clear</> : <><Upload className="w-4 h-4 mr-2" /> Upload PDF</>}
                    </Button>

                    <Button
                        variant={isTracking ? "destruct" : "secondary"}
                        onClick={() => setIsTracking(!isTracking)}
                        className="rounded-2xl h-12 px-8 font-bold uppercase tracking-widest text-[10px] shadow-sm italic"
                    >
                        {isTracking ? "Stop Gaze" : "Start Gaze"}
                    </Button>
                </div>
            </div>

            <div className="glass-panel p-1 border-slate-100 min-h-[600px] overflow-visible relative group">
                <div className="bg-white rounded-[2.25rem] p-12 md:p-20 min-h-[580px] relative">
                    {isTracking && !trackingError && (
                        <div className="absolute top-8 right-8 flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-2xl shadow-xl z-20">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Neural Sync</span>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-[2.25rem] z-10">
                            <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 italic animate-pulse">Syncing Synapses...</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap items-center text-3xl md:text-4xl tracking-tight leading-[1.8] font-bold text-slate-700 italic">
                            {wordsList.map((word, i) => (
                                <Word key={i} text={word} onStruggle={handleStruggle} />
                            ))}
                        </div>
                    )}

                    {!extractedText && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="mt-16 p-8 card-pastel-blue flex items-center gap-8"
                        >
                            <div className="p-5 bg-white rounded-2xl shadow-sm text-primary group-hover:rotate-6 transition-all shrink-0">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-slate-800 italic uppercase tracking-tight">Adaptive Guidance</h4>
                                <p className="text-slate-500 font-medium italic mt-1 max-w-lg">
                                    LexEase learns your focus patterns. Hover over complex words to isolate syllables and initiate phonetic help.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
