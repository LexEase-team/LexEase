import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Sparkles, Copy, Check, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"

export function SpeakMode() {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [suggestion, setSuggestion] = useState(null)
    const [copied, setCopied] = useState(false)
    const recognitionRef = useRef(null)

    useEffect(() => {
        // Initialize Speech Recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.interimResults = true
            recognitionRef.current.lang = 'en-US'

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = ''
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript
                }
                // Append to existing transcript is tricky with continuous, 
                // usually we just want the latest finalized part + interim.
                // For simplicity in this demo, we'll just show what the API returns for the current session
                // A robust implementation manages history better.
                setTranscript(prev => {
                    // Simple logic: if the result is final, append it. 
                    // Actually, for this demo let's just use the current event's full result logic
                    // or simpler: just setTranscript to the latest interim concatenation
                    const latest = Array.from(event.results)
                        .map(result => result[0].transcript)
                        .join('')
                    return latest
                })
            }

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error)
                setIsListening(false)
            }

            recognitionRef.current.onend = () => {
                if (isListening) {
                    // If it stopped but we think we are listening, restart (unless explicit stop)
                    // careful with infinite loops in errors
                    setIsListening(false)
                }
            }
        } else {
            alert("Browser does not support Speech Recognition. Please use Chrome.")
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        } else {
            recognitionRef.current.start()
            setIsListening(true)
            setTranscript("") // Clear previous or keep? Let's clear for new session
            setSuggestion(null)
        }
    }

    const handleRefine = () => {
        if (!transcript) return

        // Mock AI Refinement
        setSuggestion({
            original: transcript,
            corrected: "This is the corrected version of your sentence. It is clearer and grammatically correct.",
            alternatives: [
                "Here is a simpler way to say it.",
                "Alternatively, you could phrase it this way."
            ]
        })
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(suggestion ? suggestion.corrected : transcript)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">Speak to Write</h1>
                <p className="text-gray-500">Speak your thoughts, and we'll help you write them perfectly.</p>
            </div>

            {/* Main Interaction Area */}
            <div className="flex flex-col items-center justify-center space-y-8">

                {/* Microphone Button with Pulse Animation */}
                <div className="relative">
                    {isListening && (
                        <motion.div
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 3, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/30 rounded-full"
                        />
                    )}
                    <Button
                        size="lg"
                        className={`w-24 h-24 rounded-full relative z-10 transition-all duration-300 ${isListening ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-primary hover:bg-primary/90 shadow-primary/30'
                            } shadow-xl`}
                        onClick={toggleListening}
                    >
                        {isListening ? (
                            <MicOff className="w-10 h-10" />
                        ) : (
                            <Mic className="w-10 h-10" />
                        )}
                    </Button>
                </div>

                <p className="text-sm font-medium text-gray-500 animate-pulse">
                    {isListening ? "Listening..." : "Tap microphone to start"}
                </p>

                {/* Live Transcript Card */}
                <Card className="w-full min-h-[200px] relative">
                    <CardContent className="p-8">
                        {transcript ? (
                            <p className="text-2xl text-gray-800 leading-relaxed font-medium">
                                {transcript}
                            </p>
                        ) : (
                            <p className="text-2xl text-gray-300 leading-relaxed font-medium text-center italic">
                                Your words will appear here...
                            </p>
                        )}

                        {/* Action Bar */}
                        {transcript && !isListening && (
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => setTranscript("")}>
                                    Clear
                                </Button>
                                <Button size="sm" onClick={handleRefine} disabled={!!suggestion}>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Refine with AI
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* AI Suggestion Card */}
                <AnimatePresence>
                    {suggestion && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="w-full"
                        >
                            <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100 overflow-hidden">
                                <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <Sparkles className="w-5 h-5" />
                                        <h3>AI Suggestions</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-indigo-50 shadow-sm">
                                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Original</p>
                                            <p className="text-gray-600 line-through decoration-red-300">{suggestion.original}</p>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg border border-primary/20 shadow-md ring-1 ring-primary/10">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-2">Refined Version</p>
                                                    <p className="text-lg text-gray-900 font-medium">{suggestion.corrected}</p>
                                                </div>
                                                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                                                </Button>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Simpler Alternatives</p>
                                            <div className="grid gap-2">
                                                {suggestion.alternatives.map((alt, i) => (
                                                    <div key={i} className="p-3 bg-gray-50 rounded-lg text-gray-700 text-sm hover:bg-gray-100 cursor-pointer transition-colors">
                                                        {alt}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}
