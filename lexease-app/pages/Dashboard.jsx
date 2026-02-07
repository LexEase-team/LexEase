import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Trophy, TrendingUp, Clock, BookOpen, Brain, Download, Lightbulb, Star, Activity } from "lucide-react"

// --- Mock Data ---
const STUDENT_STATS = [
    { label: "Reading Time", value: "24m", icon: Clock, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Words Mastered", value: "42", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-100" },
    { label: "Sessions", value: "8", icon: Activity, color: "text-purple-500", bg: "bg-purple-100" },
]

const PROGRESS_DATA = [
    { day: "Mon", score: 45 },
    { day: "Tue", score: 52 },
    { day: "Wed", score: 49 },
    { day: "Thu", score: 63 },
    { day: "Fri", score: 58 },
    { day: "Sat", score: 71 },
    { day: "Sun", score: 75 },
]

const STRUGGLE_WORDS = [
    { word: "demonstrate", count: 12, difficulty: "high" },
    { word: "adaptive", count: 8, difficulty: "medium" },
    { word: "phonetic", count: 5, difficulty: "medium" },
    { word: "though", count: 4, difficulty: "low" },
    { word: "schedule", count: 3, difficulty: "low" },
]

export function Dashboard() {
    const [activeTab, setActiveTab] = useState("student") // 'student' | 'teacher'

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Track progress and celebrate wins!</p>
                </div>

                <div className="flex p-1 bg-gray-100 rounded-lg">
                    <button
                        onClick={() => setActiveTab("student")}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "student"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Student View
                    </button>
                    <button
                        onClick={() => setActiveTab("teacher")}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "teacher"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Teacher View
                    </button>
                </div>
            </div>

            {activeTab === "student" ? <StudentView /> : <TeacherView />}
        </div>
    )
}

function StudentView() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STUDENT_STATS.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Confidence Ring */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Confidence Score</CardTitle>
                        <CardDescription>Based on your fluency and self-correction</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="#F3F4F6"
                                    strokeWidth="12"
                                    fill="transparent"
                                />
                                <motion.circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="#6366F1"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 88}
                                    strokeDashoffset={2 * Math.PI * 88} // start empty
                                    animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - 0.78) }} // 78% filled
                                    strokeLinecap="round"
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-gray-900">78%</span>
                                <span className="text-sm text-gray-500 font-medium">Keep it up! 🎉</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Badges</CardTitle>
                        <CardDescription>You're doing great!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                                <Star className="w-6 h-6 fill-current" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Super Reader</h4>
                                <p className="text-sm text-gray-600">Complete 5 reading sessions in a row</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Speedster</h4>
                                <p className="text-sm text-gray-600">Improved reading speed by 10%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function TeacherView() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Reading Fluency Trends</CardTitle>
                        <CardDescription>Words per minute (WPM) over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 w-full flex items-end justify-between gap-2 pt-8">
                            {PROGRESS_DATA.map((data, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 group w-full">
                                    <div className="relative w-full flex justify-center">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${data.score}%` }}
                                            transition={{ duration: 0.8, delay: i * 0.1 }}
                                            className="w-full max-w-[40px] bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors relative"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {data.score} wpm
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">{data.day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Insights Panel */}
                <Card className="lg:col-span-1 bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-none">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-5 h-5 text-purple-300" />
                            <span className="text-sm font-bold text-purple-200 uppercase tracking-wide">AI Insights</span>
                        </div>
                        <CardTitle className="text-2xl text-white">Weekly Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-purple-200">Strength</h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Student shows <span className="text-white font-bold">35% improvement</span> in reading fluency when phonetic support is enabled.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-purple-200">Focus Area</h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Consistently struggles with multi-syllable words starting with 'd' and 't'.
                            </p>
                        </div>

                        <Button size="sm" variant="secondary" className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-none">
                            <Download className="w-4 h-4 mr-2" /> Export PDF Report
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Heatmap / Struggle Words */}
            <Card>
                <CardHeader>
                    <CardTitle>Struggle Word Heatmap</CardTitle>
                    <CardDescription>words that triggered support interventions frequently</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        {STRUGGLE_WORDS.map((item, i) => (
                            <div
                                key={i}
                                className={`
                    px-4 py-2 rounded-full border flex items-center gap-3
                    ${item.difficulty === 'high' ? 'bg-red-50 border-red-100 text-red-700' : ''}
                    ${item.difficulty === 'medium' ? 'bg-orange-50 border-orange-100 text-orange-700' : ''}
                    ${item.difficulty === 'low' ? 'bg-yellow-50 border-yellow-100 text-yellow-700' : ''}
                  `}
                            >
                                <span className="font-medium text-lg">{item.word}</span>
                                <span className="text-xs font-bold px-2 py-0.5 bg-white/50 rounded-full">
                                    x{item.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
