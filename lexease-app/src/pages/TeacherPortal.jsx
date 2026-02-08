import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users, Activity, Brain, FileText, Settings,
    ChevronDown, Search, Download, AlertTriangle,
    BookOpen, Mic, Ear, TrendingUp, X, Plus, Edit2, Trash2
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell } from 'recharts'
import { cn } from "../lib/utils"
import { Logo } from "../components/ui/Logo"

// Mock Data for Students
const INITIAL_STUDENTS = [
    { id: 1, name: "Mrudula", age: 10, riskLevel: "Medium", lastSession: "2 hrs ago", readingSpeed: 45, focusScore: 82, interventions: 14 },
    { id: 2, name: "Alex Johnson", age: 11, riskLevel: "Low", lastSession: "1 day ago", readingSpeed: 62, focusScore: 91, interventions: 3 },
    { id: 3, name: "Sam Smith", age: 9, riskLevel: "High", lastSession: "5 hrs ago", readingSpeed: 32, focusScore: 68, interventions: 28 },
]

// Chart data for learning modes
const getLearningModeData = () => [
    { mode: 'Read', engagement: 40, color: 'colors.pastel-blue' },
    { mode: 'Speak', engagement: 85, color: 'colors.pastel-purple' },
    { mode: 'Listen', engagement: 60, color: 'colors.pastel-pink' }
]

// Progress over time data
const getProgressData = () => [
    { week: 'Wk 1', readingSpeed: 35, focusScore: 70 },
    { week: 'Wk 2', readingSpeed: 38, focusScore: 75 },
    { week: 'Wk 3', readingSpeed: 42, focusScore: 78 },
    { week: 'Wk 4', readingSpeed: 45, focusScore: 82 }
]

export function TeacherPortal() {
    const [students, setStudents] = useState(INITIAL_STUDENTS)
    const [selectedStudent, setSelectedStudent] = useState(students[0])
    const [showManageModal, setShowManageModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [editingStudent, setEditingStudent] = useState(null)
    const [formData, setFormData] = useState({ name: "", age: "", riskLevel: "Low" })

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleExportPDF = () => {
        const reportContent = `
LEXEASE STUDENT PROGRESS REPORT
================================

Student: ${selectedStudent.name}
Age: ${selectedStudent.age} years
Risk Level: ${selectedStudent.riskLevel}
Last Session: ${selectedStudent.lastSession}

PERFORMANCE METRICS
-------------------
Reading Speed: ${selectedStudent.readingSpeed} wpm (+12% this week)
Focus Score: ${selectedStudent.focusScore}%
Interventions (Last 7 days): ${selectedStudent.interventions}

LEARNING PATTERN ANALYSIS
--------------------------
Dyslexia Indicators: High (78%)
- Frequent visual regression
- Phonetic decoding struggles

Dysgraphia Indicators: Medium (45%)
SLI Overlap: Low (12%)

PREFERRED LEARNING MODE
-----------------------
${selectedStudent.name} learns best through Speaking activities.
Writing tasks are completed 40% faster when using speech-to-text.

RECENT SESSIONS
---------------
1. Today, 10:30 AM - Read Mode - 15 mins - Struggle Word: Demonstrate
2. Yesterday, 2:15 PM - Speak Mode - 22 mins - Struggle Word: Adaptive

Generated: ${new Date().toLocaleString()}
        `.trim()

        const blob = new Blob([reportContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${selectedStudent.name.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleAddStudent = () => {
        if (!formData.name || !formData.age) {
            alert("Please fill in all fields")
            return
        }
        const newStudent = {
            id: Math.max(...students.map(s => s.id)) + 1,
            name: formData.name,
            age: parseInt(formData.age),
            riskLevel: formData.riskLevel,
            lastSession: "Never",
            readingSpeed: 40,
            focusScore: 75,
            interventions: 0
        }
        setStudents([...students, newStudent])
        setFormData({ name: "", age: "", riskLevel: "Low" })
        setShowManageModal(false)
    }

    const handleEditStudent = (student) => {
        setEditingStudent(student)
        setFormData({ name: student.name, age: student.age.toString(), riskLevel: student.riskLevel })
    }

    const handleUpdateStudent = () => {
        if (!formData.name || !formData.age) {
            alert("Please fill in all fields")
            return
        }
        setStudents(students.map(s =>
            s.id === editingStudent.id
                ? { ...s, name: formData.name, age: parseInt(formData.age), riskLevel: formData.riskLevel }
                : s
        ))
        if (selectedStudent.id === editingStudent.id) {
            setSelectedStudent({ ...selectedStudent, name: formData.name, age: parseInt(formData.age), riskLevel: formData.riskLevel })
        }
        setEditingStudent(null)
        setFormData({ name: "", age: "", riskLevel: "Low" })
    }

    const handleDeleteStudent = (studentId) => {
        if (confirm("Are you sure you want to remove this student?")) {
            setStudents(students.filter(s => s.id !== studentId))
            if (selectedStudent.id === studentId && students.length > 1) {
                setSelectedStudent(students.find(s => s.id !== studentId))
            }
        }
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-5">
                    <Logo className="w-12 h-12" />
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight italic uppercase">Teacher Portal</h1>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teacher Management Core Active</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleExportPDF} className="rounded-2xl h-12 px-6 border-slate-100 hover:bg-slate-50 font-bold uppercase tracking-widest text-[10px]">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                    <Button onClick={() => setShowManageModal(true)} className="rounded-2xl h-12 px-8 bg-slate-900 text-white hover:bg-primary shadow-lg font-bold uppercase tracking-widest text-[10px]">
                        <Users className="w-4 h-4 mr-2" /> Manage
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar: Student List */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-6 h-full space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] italic">Student Nodes</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 placeholder:text-slate-300 font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredStudents.map(student => (
                                <button
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student)}
                                    className={cn(
                                        "w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all duration-300 border border-transparent",
                                        selectedStudent.id === student.id
                                            ? "bg-white shadow-soft border-slate-100 ring-1 ring-primary/5"
                                            : "hover:bg-slate-50 group"
                                    )}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors shrink-0",
                                            selectedStudent.id === student.id ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                                        )}>
                                            {student.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className={cn("text-sm font-black tracking-tight italic truncate", selectedStudent.id === student.id ? "text-slate-800" : "text-slate-500")}>{student.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{student.age} yrs • {student.riskLevel}</p>
                                        </div>
                                    </div>
                                    {student.riskLevel === "High" && (
                                        <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {selectedStudent && (
                        <>
                            {/* Student Overview Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="card-pastel-blue p-8 flex items-center gap-5 group hover:-translate-y-1 transition-all duration-300">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-500 group-hover:rotate-12 transition-transform">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-blue-600/60 uppercase tracking-widest italic">Reading Rate</p>
                                        <h3 className="text-3xl font-black text-slate-800 tracking-tight italic leading-none mt-1">
                                            {selectedStudent.readingSpeed} <span className="text-sm font-medium opacity-50">wpm</span>
                                        </h3>
                                    </div>
                                </div>

                                <div className="card-pastel-purple p-8 flex items-center gap-5 group hover:-translate-y-1 transition-all duration-300">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm text-accent group-hover:rotate-12 transition-transform">
                                        <Brain className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-accent/60 uppercase tracking-widest italic">Focus Index</p>
                                        <h3 className="text-3xl font-black text-slate-800 tracking-tight italic leading-none mt-1">
                                            {selectedStudent.focusScore}<span className="text-sm font-medium opacity-50">%</span>
                                        </h3>
                                    </div>
                                </div>

                                <div className="card-pastel-pink p-8 flex items-center gap-5 group hover:-translate-y-1 transition-all duration-300">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm text-secondary group-hover:rotate-12 transition-transform">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-secondary/60 uppercase tracking-widest italic">Interventions</p>
                                        <h3 className="text-3xl font-black text-slate-800 tracking-tight italic leading-none mt-1">
                                            {selectedStudent.interventions}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="glass-panel p-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Engagement Loop</h3>
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                                            <Activity className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={getLearningModeData()}>
                                                <XAxis dataKey="mode" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 'bold' }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                                />
                                                <Bar dataKey="engagement" radius={[8, 8, 8, 8]} barSize={40}>
                                                    {getLearningModeData().map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={
                                                            index === 0 ? '#BFDBFE' : index === 1 ? '#DDD6FE' : '#FBCFE8'
                                                        } />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <p className="text-xs font-medium text-slate-500 italic leading-relaxed">
                                            Telemetry suggests <span className="text-primary font-black uppercase tracking-widest text-[10px]">{selectedStudent.name}</span> yields highest engagement during <span className="text-primary font-black uppercase tracking-widest text-[10px]">Speaking</span> cycles.
                                        </p>
                                    </div>
                                </div>

                                <div className="glass-panel p-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Progression Trace</h3>
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-accent">
                                            <TrendingUp className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={getProgressData()}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                                                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0' }} />
                                                <Line type="monotone" dataKey="readingSpeed" stroke="#6366F1" strokeWidth={4} dot={{ r: 4, fill: '#6366F1' }} name="Speed" />
                                                <Line type="monotone" dataKey="focusScore" stroke="#EC4899" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Focus" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Risk Pattern Analysis */}
                            <div className="glass-panel p-10 space-y-8">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase leading-none">Neuro-Risk Telemetry</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Pattern Indicators & Synaptic Divergence</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Dyslexia Index</p>
                                            <p className="text-lg font-black text-red-500 italic">High (78%)</p>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.5 }} className="h-full bg-red-400 rounded-full" />
                                        </div>
                                        <p className="text-[10px] font-medium text-slate-400 italic">Frequent visual regression detected during saccades.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Dysgraphia Index</p>
                                            <p className="text-lg font-black text-amber-500 italic">Medium (45%)</p>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-amber-400 rounded-full" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">SLI Convergence</p>
                                            <p className="text-lg font-black text-green-500 italic">Low (12%)</p>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: "12%" }} transition={{ duration: 1.5, delay: 0.4 }} className="h-full bg-green-400 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Sessions Table */}
                            <div className="glass-panel p-10 overflow-hidden">
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase mb-8">Recent Synaptic Cycles</h3>
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                                <th className="pb-6">Timestamp</th>
                                                <th className="pb-6">Domain</th>
                                                <th className="pb-6">Interval</th>
                                                <th className="pb-6">Entropy Trigger</th>
                                                <th className="pb-6">State</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm font-bold text-slate-800">
                                            <tr className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-6">Today, 10:30 AM</td>
                                                <td className="py-6 flex items-center gap-2 italic"><BookOpen className="w-4 h-4 text-blue-400" /> Read Cycle</td>
                                                <td className="py-6 font-mono opacity-60">15m</td>
                                                <td className="py-6 text-red-500 italic underline underline-offset-4 decoration-2">Demonstrate</td>
                                                <td className="py-6"><span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] uppercase font-black">Success</span></td>
                                            </tr>
                                            <tr className="group hover:bg-slate-50/50 transition-colors border-t border-slate-50">
                                                <td className="py-6">Yesterday, 2:15 PM</td>
                                                <td className="py-6 flex items-center gap-2 italic"><Mic className="w-4 h-4 text-purple-400" /> Speak Cycle</td>
                                                <td className="py-6 font-mono opacity-60">22m</td>
                                                <td className="py-6 text-red-500 italic underline underline-offset-4 decoration-2">Adaptive</td>
                                                <td className="py-6"><span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] uppercase font-black">Success</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Manage Students Modal */}
            <AnimatePresence>
                {showManageModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-6"
                        onClick={() => {
                            setShowManageModal(false)
                            setEditingStudent(null)
                            setFormData({ name: "", age: "", riskLevel: "Low" })
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-[3rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-10 border-b border-slate-50 flex justify-between items-center shrink-0">
                                <h2 className="text-3xl font-black text-slate-800 italic uppercase tracking-tight leading-none">Node Configuration</h2>
                                <button
                                    onClick={() => {
                                        setShowManageModal(false)
                                        setEditingStudent(null)
                                        setFormData({ name: "", age: "", riskLevel: "Low" })
                                    }}
                                    className="p-3 hover:bg-slate-50 rounded-2xl transition-all"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-10 space-y-10 overflow-y-auto flex-1 custom-scrollbar">
                                {/* Add/Edit Student Form */}
                                <div className="bg-slate-50 p-10 rounded-[2.5rem] space-y-8">
                                    <h3 className="text-xl font-black text-slate-800 italic uppercase">{editingStudent ? 'Recalibrate Node' : 'Initialize New Node'}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-2">Display Identification</p>
                                            <input
                                                type="text"
                                                placeholder="Student Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/20 placeholder:text-slate-300 font-bold italic"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-2">Chronological Index</p>
                                            <input
                                                type="number"
                                                placeholder="Age"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold italic"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-2">Risk Classification</p>
                                            <select
                                                value={formData.riskLevel}
                                                onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                                                className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold italic appearance-none"
                                            >
                                                <option value="Low">Low Risk Threshold</option>
                                                <option value="Medium">Medium Risk Threshold</option>
                                                <option value="High">High Risk Threshold</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        {editingStudent ? (
                                            <>
                                                <Button onClick={handleUpdateStudent} className="bg-slate-900 text-white rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest">
                                                    Apply Recalibration
                                                </Button>
                                                <Button variant="outline" onClick={() => {
                                                    setEditingStudent(null)
                                                    setFormData({ name: "", age: "", riskLevel: "Low" })
                                                }} className="rounded-2xl h-14 px-10 border-slate-200 font-black uppercase text-xs tracking-widest">
                                                    Abort
                                                </Button>
                                            </>
                                        ) : (
                                            <Button onClick={handleAddStudent} className="bg-slate-900 text-white rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest">
                                                <Plus className="w-5 h-5 mr-3" /> Execute Provisioning
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Student List */}
                                <div className="space-y-8">
                                    <h3 className="text-xl font-black text-slate-800 italic uppercase ml-2">Active Student Cluster ({students.length})</h3>
                                    <div className="space-y-4">
                                        {students.map(student => (
                                            <div key={student.id} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-soft transition-all duration-300 group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary font-black text-2xl shadow-sm border border-slate-100 italic">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-xl text-slate-800 italic leading-none">{student.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{student.age} years old • {student.riskLevel} Classification</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditStudent(student)}
                                                        className="p-4 hover:bg-slate-50 text-slate-400 hover:text-primary rounded-2xl transition-all"
                                                        title="Recalibrate"
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteStudent(student.id)}
                                                        className="p-4 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all"
                                                        title="Decommission"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
