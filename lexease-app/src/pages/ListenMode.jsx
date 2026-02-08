import { useState, useEffect, useRef } from "react"
import { Play, Square, Pause, RotateCcw, Ear, Sparkles, Brain, ListMusic } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { cn } from "../lib/utils"

export function ListenMode() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTextType, setCurrentTextType] = useState(null) // 'original' or 'simplified'
    const synthRef = useRef(window.speechSynthesis)
    const utteranceRef = useRef(null)

    const originalText = "Despite the heavy rain, the children continued playing outside, splashing in puddles and laughing joyously as if the sun were shining bright."

    const simplifiedSentences = [
        "It rained heavily.",
        "The children still played."
    ]
    const simplifiedText = simplifiedSentences.join(" ");

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (synthRef.current) synthRef.current.cancel()
        }
    }, [])

    const handleSpeak = (text, type) => {
        // If already playing the same text, stop it
        if (isPlaying && currentTextType === type) {
            synthRef.current.cancel()
            setIsPlaying(false)
            setCurrentTextType(null)
            return
        }

        // Stop any current speech
        synthRef.current.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = type === 'simplified' ? 0.75 : 0.9 // Slower for simplified
        utterance.pitch = 1

        utterance.onend = () => {
            setIsPlaying(false)
            setCurrentTextType(null)
        }

        utterance.onerror = () => {
            setIsPlaying(false)
            setCurrentTextType(null)
        }

        utteranceRef.current = utterance
        synthRef.current.speak(utterance)

        setIsPlaying(true)
        setCurrentTextType(type)
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-pink-50 text-pink-500 rounded-3xl shadow-sm">
                    <Ear className="w-10 h-10" />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight italic">Smart Listening</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Cognitive Narrative Compression</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Original Text Card */}
                <div className="glass-panel p-10 space-y-8 flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                                <ListMusic className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800 italic leading-none uppercase">Original Matrix</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Native Input Stream</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant={isPlaying && currentTextType === 'original' ? "destruct" : "secondary"}
                            onClick={() => handleSpeak(originalText, 'original')}
                            className="rounded-xl h-10 px-6 font-bold uppercase tracking-widest text-[9px] italic"
                        >
                            {isPlaying && currentTextType === 'original' ? (
                                <><Square className="w-3.5 h-3.5 mr-2" /> Stop</>
                            ) : (
                                <><Play className="w-3.5 h-3.5 mr-2" /> Decrypt</>
                            )}
                        </Button>
                    </div>

                    <div className={cn(
                        "flex-1 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all duration-500",
                        isPlaying && currentTextType === 'original' ? 'bg-white shadow-soft ring-2 ring-primary/5' : ''
                    )}>
                        <p className="text-slate-600 leading-[1.8] text-xl font-medium italic">
                            {originalText}
                        </p>
                    </div>
                </div>

                {/* Simplified Text Card */}
                <div className="glass-panel p-10 space-y-8 flex flex-col border-dashed border-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-pastel-pink text-secondary rounded-2xl shadow-sm">
                                <Brain className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800 italic leading-none uppercase">Simplified Core</h3>
                                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-1">Cognitive Optimization</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant={isPlaying && currentTextType === 'simplified' ? "destruct" : "secondary"}
                            onClick={() => handleSpeak(simplifiedText, 'simplified')}
                            className="rounded-xl h-10 px-6 bg-slate-900 text-white hover:bg-primary font-bold uppercase tracking-widest text-[9px] italic"
                        >
                            {isPlaying && currentTextType === 'simplified' ? (
                                <><Square className="w-3.5 h-3.5 mr-2" /> Stop</>
                            ) : (
                                <><Play className="w-3.5 h-3.5 mr-2" /> Analyze</>
                            )}
                        </Button>
                    </div>

                    <div className={cn(
                        "flex-1 p-8 rounded-[2rem] space-y-4 transition-all duration-500",
                        isPlaying && currentTextType === 'simplified' ? 'bg-white shadow-soft ring-2 ring-secondary/10' : 'bg-slate-50'
                    )}>
                        {simplifiedSentences.map((sentence, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-50 group hover:-translate-x-1 transition-transform">
                                <div className="w-2 h-2 rounded-full bg-secondary opacity-30 group-hover:opacity-100 transition-opacity" />
                                <p className="text-slate-800 font-bold italic text-lg leading-none">
                                    {sentence}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-10 card-pastel-pink rounded-[2.5rem] flex items-center gap-8">
                <div className="p-5 bg-white rounded-2xl shadow-sm text-secondary">
                    <Sparkles className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-xl font-black text-slate-800 italic uppercase tracking-tight">Cognitive Tuning</h4>
                    <p className="text-slate-600 font-medium italic mt-1 max-w-2xl">
                        Adjusting the complexity matrix allows for recursive learning. Start with the Simplified Core before transitioning to Native Matrix streams for maximum retention.
                    </p>
                </div>
            </div>
        </div>
    )
}
