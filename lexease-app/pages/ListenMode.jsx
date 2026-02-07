import { useState, useEffect, useRef } from "react"
import { Play, Square, Pause, RotateCcw } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"

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
            synthRef.current.cancel()
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
        utterance.rate = type === 'simplified' ? 0.8 : 0.9 // Slower for simplified
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
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">Listen & Learn</h1>
                <p className="text-gray-500">Listen to complex stories or hear them simplified for better understanding.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original Text Card */}
                <Card className="bg-white shadow-md border-gray-100 h-full flex flex-col">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-semibold">Original Text</CardTitle>
                            <Button
                                size="sm"
                                variant={isPlaying && currentTextType === 'original' ? "destruct" : "outline"}
                                onClick={() => handleSpeak(originalText, 'original')}
                                className="gap-2"
                            >
                                {isPlaying && currentTextType === 'original' ? (
                                    <>
                                        <Square className="w-4 h-4 fill-current" /> Stop
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 fill-current" /> Listen
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className={`p-6 rounded-xl bg-gray-50 border border-gray-100 transition-colors ${isPlaying && currentTextType === 'original' ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {originalText}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Simplified Text Card */}
                <Card className="bg-white shadow-md border-success/20 h-full flex flex-col">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-semibold text-success-700">Simplified Version</CardTitle>
                            <Button
                                size="sm"
                                className={isPlaying && currentTextType === 'simplified' ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-success text-white hover:bg-success/90"}
                                onClick={() => handleSpeak(simplifiedText, 'simplified')}
                            >
                                {isPlaying && currentTextType === 'simplified' ? (
                                    <span className="flex items-center gap-2"><Square className="w-4 h-4 fill-current" /> Stop</span>
                                ) : (
                                    <span className="flex items-center gap-2"><Play className="w-4 h-4 fill-current" /> Listen Simplified</span>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className={`p-6 rounded-xl bg-success/5 border border-success/10 transition-colors ${isPlaying && currentTextType === 'simplified' ? 'ring-2 ring-success/20' : ''}`}>
                            <ul className="space-y-4">
                                {simplifiedSentences.map((sentence, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="mt-2 w-2 h-2 rounded-full bg-success flex-shrink-0"></span>
                                        <span className="text-gray-800 text-lg font-medium">{sentence}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
