import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Sparkles, Copy, Check, RefreshCw, Loader2, ArrowRight, Brain } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { refineTranscript } from "../lib/openai"
import { cn } from "../lib/utils"

export function SpeakMode() {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [suggestion, setSuggestion] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const recognitionRef = useRef(null)

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.interimResults = true
            recognitionRef.current.lang = 'en-US'

            recognitionRef.current.onresult = (event) => {
                const latest = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('')
                setTranscript(latest)
            }

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error)
                setIsListening(false)
            }

            recognitionRef.current.onend = () => { if (isListening) setIsListening(false) }
        }

        return () => { if (recognitionRef.current) recognitionRef.current.stop() }
    }, [])

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        } else {
            try {
                recognitionRef.current.start()
                setIsListening(true)
                setTranscript("")
                setSuggestion(null)
            } catch (e) {
                console.error("Start failed:", e)
            }
        }
    }

    const clearTranscript = () => {
        setTranscript("")
        setSuggestion(null)
    }

    const handleRefine = async () => {
        if (!transcript) return
        setIsLoading(true)
        try {
            const result = await refineTranscript(transcript)
            setSuggestion(result)
        } catch (e) {
            console.error("Refinement failed:", e)
        } finally {
            setIsLoading(false)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text || (suggestion ? suggestion.corrected : transcript))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-purple-50 text-purple-500 rounded-3xl shadow-sm">
                    <Mic className="w-10 h-10" />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight italic">Fluent Speech</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">AI-Powered Verbal Refinement</p>
                </div>
            </div>

            {/* Main Interaction Area */}
            <div className="flex flex-col items-center justify-center space-y-10">
                <div className="glass-panel w-full overflow-hidden relative group p-1 border-slate-100 min-h-[400px]">
                    <div className="bg-white rounded-[2.25rem] p-12 md:p-20 flex flex-col items-center justify-center text-center relative h-full min-h-[380px]">
                        {isListening && (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute inset-0 bg-primary rounded-full blur-[100px]"
                            />
                        )}

                        {!transcript && !isListening ? (
                            <div className="space-y-8 relative z-10">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleListening}
                                    className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto border border-slate-100 shadow-inner group-hover:bg-primary/5 transition-colors"
                                >
                                    <Mic className="w-10 h-10 text-slate-300 group-hover:text-primary transition-colors" />
                                </motion.button>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 italic uppercase">System Ready</h3>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Initialize microphone to begin transcription</p>
                                </div>
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-left space-y-6 relative z-10">
                                <div className="flex items-center gap-3 opacity-40">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Live Neuro-Stream</span>
                                </div>
                                <p className="text-3xl md:text-5xl font-bold text-slate-700 tracking-tight leading-tight italic min-h-[160px]">
                                    {transcript}
                                    {isListening && <span className="inline-block w-2 h-12 bg-primary ml-2 animate-pulse align-middle" />}
                                </p>
                                <div className="flex justify-end gap-3 pt-8">
                                    <Button variant="outline" size="sm" onClick={clearTranscript} className="rounded-2xl h-12 px-8 border-slate-100 hover:bg-red-50 hover:text-red-500 font-bold uppercase tracking-widest text-[10px]">
                                        Purge Buffer
                                    </Button>
                                    <Button size="sm" onClick={isListening ? toggleListening : handleRefine} disabled={isLoading} className="rounded-2xl h-12 px-8 bg-slate-900 text-white hover:bg-primary shadow-lg font-bold uppercase tracking-widest text-[10px]">
                                        {isListening ? "Finalize Stream" : isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing</> : <><Sparkles className="w-4 h-4 mr-2" /> Neural Refine</>}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* AI Suggestion Card */}
                <AnimatePresence>
                    {suggestion && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                            className="w-full space-y-6"
                        >
                            <div className="card-pastel-purple p-10 md:p-14 space-y-12">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                                        <Brain className="w-8 h-8 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-800 italic leading-none">Refined Proposal</h3>
                                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1 italic">Synaptic Grammar Alignment Complete</p>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div className="opacity-50">
                                        <p className="text-[10px] font-black uppercase tracking-widest mb-3 italic">Original Input</p>
                                        <p className="text-slate-600 line-through text-lg font-bold italic">{suggestion.original}</p>
                                    </div>

                                    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-soft border border-white relative group">
                                        <div className="space-y-4">
                                            <p className="text-[10px] text-primary font-black uppercase tracking-widest italic">Optimized Composition</p>
                                            <p className="text-3xl md:text-5xl text-slate-800 font-black italic tracking-tighter leading-[1.1]">{suggestion.corrected}</p>
                                        </div>
                                        <Button
                                            variant="ghost" size="icon"
                                            onClick={() => copyToClipboard(suggestion.corrected)}
                                            className="absolute top-10 right-10 hover:bg-primary/5 text-primary scale-125 rounded-xl transition-all"
                                        >
                                            {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                                        </Button>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic ml-4">Alternative Phrase Paths</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {suggestion.alternatives.map((alt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => copyToClipboard(alt)}
                                                    className="p-6 bg-white/50 hover:bg-white rounded-3xl border border-white/40 hover:border-primary/20 transition-all text-left group flex items-center justify-between shadow-sm"
                                                >
                                                    <span className="text-slate-700 font-bold italic">{alt}</span>
                                                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}


