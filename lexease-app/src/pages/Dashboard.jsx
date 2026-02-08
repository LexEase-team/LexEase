import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import {
    Trophy, TrendingUp, Clock, BookOpen, Brain, Download,
    Lightbulb, Star, Activity, AlertCircle, ChevronRight, Target
} from "lucide-react"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts'
import { cn } from "../lib/utils"
import { Logo } from "../components/ui/Logo"

// --- Mock Data ---
const STUDENT_STATS = [
    { label: "Deep Reading", value: "24m", icon: Clock, color: "text-blue-500", bg: "bg-blue-50", card: "card-pastel-blue" },
    { label: "Nodes Mastered", value: "42", icon: Target, color: "text-purple-500", bg: "bg-purple-50", card: "card-pastel-purple" },
    { label: "Active Sessions", value: "8", icon: Activity, color: "text-pink-500", bg: "bg-pink-50", card: "card-pastel-pink" },
]

const PROGRESS_DATA = [
    { day: "Mon", score: 45, confidence: 62 },
    { day: "Tue", score: 52, confidence: 65 },
    { day: "Wed", score: 49, confidence: 68 },
    { day: "Thu", score: 63, confidence: 72 },
    { day: "Fri", score: 58, confidence: 75 },
    { day: "Sat", score: 71, confidence: 78 },
    { day: "Sun", score: 75, confidence: 82 },
]

const STRUGGLE_WORDS = [
    { word: "demonstrate", count: 12, difficulty: "high" },
    { word: "adaptive", count: 8, difficulty: "medium" },
    { word: "phonetic", count: 5, difficulty: "medium" },
    { word: "though", count: 4, difficulty: "low" },
    { word: "schedule", count: 3, difficulty: "low" },
]

export function Dashboard() {
    const [activeTab, setActiveTab] = useState("student")

    return (
        <div className="space-y-10 pb-20">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <Logo className="w-12 h-12" />
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none italic">Welcome back, John 👋</h1>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System telemetry active</p>
                        </div>
                    </div>
                </div>

                <div className="flex p-1.5 bg-white rounded-2xl shadow-soft border border-slate-100">
                    <button
                        onClick={() => setActiveTab("student")}
                        className={cn(
                            "px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300",
                            activeTab === "student" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        Student View
                    </button>
                    <button
                        onClick={() => setActiveTab("teacher")}
                        className={cn(
                            "px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300",
                            activeTab === "teacher" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        Teacher Portal
                    </button>
                </div>
            </div>

            {activeTab === "student" ? <StudentView /> : <TeacherView />}
        </div>
    )
}

function StudentView() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STUDENT_STATS.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={cn("p-8 group hover:-translate-y-1 transition-all duration-300", stat.card)}
                    >
                        <div className="flex items-center gap-5">
                            <div className={cn("p-4 rounded-2xl shadow-sm transition-transform duration-500 group-hover:rotate-12", stat.bg, stat.color)}>
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
                                <h3 className="text-4xl font-black text-slate-800 tracking-tight italic">{stat.value}</h3>
                            </div>
                        </div>
                        {/* Subtle graph mock */}
                        <div className="mt-8 h-12 w-full flex items-end gap-1 px-1">
                            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1].map((h, j) => (
                                <motion.div
                                    key={j}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h * 100}%` }}
                                    transition={{ delay: i * 0.1 + j * 0.05, duration: 0.5 }}
                                    className={cn("w-full rounded-t-sm opacity-40 group-hover:opacity-80 transition-opacity", stat.color.replace('text-', 'bg-'))}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Confidence Chart */}
                <div className="lg:col-span-2 glass-panel p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight italic">Platform Insight</h3>
                            <p className="text-sm text-slate-400 font-medium">Learning progression over current session</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={PROGRESS_DATA}>
                                <defs>
                                    <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#6366F1"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorMain)"
                                    name="Fluency Level"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Achievement Panel */}
                <div className="lg:col-span-1 glass-panel p-8 space-y-8">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight italic">Synergetic Milestones</h3>
                    <div className="space-y-4">
                        {[
                            { title: "Visual Pioneer", desc: "No manual hints for 10 min", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
                            { title: "Active Listener", desc: "Completed audio cycle", icon: Trophy, color: "text-blue-500", bg: "bg-blue-50" },
                            { title: "Neuro Mastery", desc: "Improved focus by 20%", icon: Brain, color: "text-purple-500", bg: "bg-purple-50" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-4 p-5 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white transition-all hover:shadow-sm"
                            >
                                <div className={cn("p-3 rounded-xl", item.bg, item.color)}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm italic">{item.title}</p>
                                    <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function TeacherView() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Insights Panel */}
                <div className="lg:col-span-1 glass-panel card-pastel-purple p-10 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/60 rounded-2xl shadow-sm">
                                <Brain className="w-8 h-8 text-accent" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight italic leading-none">Insight Engine</h3>
                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">Consistency Check Finalized</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-5 bg-white/40 rounded-2xl border border-white/60">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 italic">Key Success</p>
                                <p className="text-slate-800 font-bold tracking-tight italic leading-snug">
                                    Adaptive text spacing reduced visual regression by <span className="text-accent underline underline-offset-4 decoration-2">42%</span> this session.
                                </p>
                            </div>

                            <div className="p-5 bg-white/40 rounded-2xl border border-white/60">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 italic">Recommendation</p>
                                <p className="text-slate-800 font-bold tracking-tight italic leading-snug">
                                    Introduce multisyllabic segmented phonetics to bridge the current decoding gap.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-8 font-black uppercase tracking-widest text-xs">
                        Download Comprehensive Report
                    </Button>
                </div>

                {/* Progress Table Mock */}
                <div className="lg:col-span-2 glass-panel p-10">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Synaptic Analysis</h3>
                        <div className="flex items-center gap-2">
                            <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-500">Last 7 Days</div>
                            <button className="p-2 text-slate-400 hover:text-slate-900 border border-slate-100 rounded-xl">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="pb-6">Domain Position</th>
                                    <th className="pb-6">Active Period</th>
                                    <th className="pb-6">Screening</th>
                                    <th className="pb-6">Check</th>
                                    <th className="pb-6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-bold text-slate-800">
                                {[
                                    { pos: "Morphological Mapping", period: "30h", screen: "24", check: "Active", status: "Optimal" },
                                    { pos: "Phonetic Decoding", period: "27h", screen: "20", check: "Calibrating", status: "Medium" },
                                    { pos: "Syntactic Flow", period: "46h", screen: "30", check: "Active", status: "Optimal" },
                                    { pos: "Semantic Connect", period: "22h", screen: "14", check: "Inactive", status: "Review" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-t border-slate-50 group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 italic">{row.pos}</td>
                                        <td className="py-6 font-mono opacity-60">{row.period}</td>
                                        <td className="py-6">{row.screen}</td>
                                        <td className="py-6">
                                            <div className={cn("px-3 py-1 rounded-lg text-[10px] inline-flex items-center gap-1",
                                                row.check === 'Active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600')}>
                                                <div className={cn("w-1.5 h-1.5 rounded-full", row.check === 'Active' ? 'bg-green-500' : 'bg-amber-500')} />
                                                {row.check}
                                            </div>
                                        </td>
                                        <td className="py-6 text-right">
                                            <div className={cn("w-24 h-2 rounded-full overflow-hidden bg-slate-100")}>
                                                <div className={cn("h-full", row.status === 'Optimal' ? 'bg-indigo-400 w-[80%]' : 'bg-amber-400 w-[50%]')} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
