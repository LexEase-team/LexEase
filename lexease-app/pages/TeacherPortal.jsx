import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users, Activity, Brain, FileText, Settings,
    ChevronDown, Search, Download, AlertTriangle,
    BookOpen, Mic, Ear, TrendingUp, X, Plus, Edit2, Trash2
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

// Mock Data for Students
const INITIAL_STUDENTS = [
    { id: 1, name: "Mrudula", age: 10, riskLevel: "Medium", lastSession: "2 hrs ago", readingSpeed: 45, focusScore: 82, interventions: 14 },
    { id: 2, name: "Alex Johnson", age: 11, riskLevel: "Low", lastSession: "1 day ago", readingSpeed: 62, focusScore: 91, interventions: 3 },
    { id: 3, name: "Sam Smith", age: 9, riskLevel: "High", lastSession: "5 hrs ago", readingSpeed: 32, focusScore: 68, interventions: 28 },
]

// Chart data for learning modes
const getLearningModeData = () => [
    { mode: 'Read', engagement: 40, color: '#93C5FD' },
    { mode: 'Speak', engagement: 85, color: '#6366F1' },
    { mode: 'Listen', engagement: 60, color: '#A5B4FC' }
]

// Progress over time data
const getProgressData = () => [
    { week: 'Week 1', readingSpeed: 35, focusScore: 70 },
    { week: 'Week 2', readingSpeed: 38, focusScore: 75 },
    { week: 'Week 3', readingSpeed: 42, focusScore: 78 },
    { week: 'Week 4', readingSpeed: 45, focusScore: 82 }
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
        // Create a simple text-based report
        const reportContent = `
TRIREAD STUDENT PROGRESS REPORT
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

        // Create blob and download
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
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Teacher Portal</h1>
                    <p className="text-gray-500">Monitor student progress and adjust learning paths.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExportPDF}>
                        <Download className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                    <Button onClick={() => setShowManageModal(true)}>
                        <Users className="w-4 h-4 mr-2" /> Manage Students
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar: Student List */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="h-full">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Students</CardTitle>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-2">
                            <div className="space-y-1">
                                {filteredStudents.map(student => (
                                    <button
                                        key={student.id}
                                        onClick={() => setSelectedStudent(student)}
                                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${selectedStudent.id === student.id
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "hover:bg-gray-50 text-gray-700"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{student.name}</p>
                                                <p className="text-xs text-gray-500">{student.age} years old</p>
                                            </div>
                                        </div>
                                        {student.riskLevel === "High" && (
                                            <span className="w-2 h-2 rounded-full bg-red-500" title="High Attention Needed"></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    {selectedStudent && (
                        <>
                            {/* Student Overview Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase">Reading Speed</p>
                                            <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.readingSpeed} <span className="text-sm font-normal text-gray-500">wpm</span></h3>
                                            <p className="text-xs text-green-600 flex items-center mt-1">
                                                <TrendingUp className="w-3 h-3 mr-1" /> +12% this week
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                                            <Brain className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase">Focus Score</p>
                                            <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.focusScore}%</h3>
                                            <p className="text-xs text-gray-500 mt-1">Consistent attention</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase">Interventions</p>
                                            <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.interventions}</h3>
                                            <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Learning Mode Chart */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Preferred Learning Mode</CardTitle>
                                        <CardDescription>Engagement breakdown by activity</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={getLearningModeData()}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis dataKey="mode" stroke="#6b7280" fontSize={12} />
                                                <YAxis stroke="#6b7280" fontSize={12} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                                    formatter={(value) => [`${value}%`, 'Engagement']}
                                                />
                                                <Bar dataKey="engagement" fill="#6366F1" radius={[8, 8, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-bold text-gray-900">{selectedStudent.name}</span> learns best through <span className="font-bold text-primary">Speaking</span> activities.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Progress Over Time Chart */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Progress Over Time</CardTitle>
                                        <CardDescription>4-week performance trend</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <LineChart data={getProgressData()}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                                                <YAxis stroke="#6b7280" fontSize={12} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                                />
                                                <Legend />
                                                <Line type="monotone" dataKey="readingSpeed" stroke="#3b82f6" strokeWidth={2} name="Reading Speed (wpm)" />
                                                <Line type="monotone" dataKey="focusScore" stroke="#8b5cf6" strokeWidth={2} name="Focus Score (%)" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Risk Pattern Analysis */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-primary" />
                                        Risk Pattern Analysis
                                    </CardTitle>
                                    <CardDescription>AI-detected learning patterns & indicators</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-700">Dyslexia Indicators</span>
                                            <span className="text-red-500 font-bold">High (78%)</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "78%" }}
                                                transition={{ duration: 1 }}
                                                className="h-full bg-red-500 rounded-full"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">Frequent visual regression, phonetic decoding struggles.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-700">Dysgraphia Indicators</span>
                                            <span className="text-yellow-500 font-bold">Medium (45%)</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "45%" }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-yellow-500 rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-700">SLI Overlap</span>
                                            <span className="text-green-500 font-bold">Low (12%)</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "12%" }}
                                                transition={{ duration: 1, delay: 0.4 }}
                                                className="h-full bg-green-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Sessions Table */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Sessions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-lg">
                                                <tr>
                                                    <th className="px-6 py-3">Date</th>
                                                    <th className="px-6 py-3">Mode</th>
                                                    <th className="px-6 py-3">Duration</th>
                                                    <th className="px-6 py-3">Top Struggle Word</th>
                                                    <th className="px-6 py-3">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4">Today, 10:30 AM</td>
                                                    <td className="px-6 py-4 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Read</td>
                                                    <td className="px-6 py-4">15 mins</td>
                                                    <td className="px-6 py-4 font-medium text-red-500">Demonstrate</td>
                                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span></td>
                                                </tr>
                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4">Yesterday, 2:15 PM</td>
                                                    <td className="px-6 py-4 flex items-center gap-2"><Mic className="w-4 h-4" /> Speak</td>
                                                    <td className="px-6 py-4">22 mins</td>
                                                    <td className="px-6 py-4 font-medium text-red-500">Adaptive</td>
                                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
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
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowManageModal(false)
                            setEditingStudent(null)
                            setFormData({ name: "", age: "", riskLevel: "Low" })
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                <h2 className="text-2xl font-bold text-gray-900">Manage Students</h2>
                                <button
                                    onClick={() => {
                                        setShowManageModal(false)
                                        setEditingStudent(null)
                                        setFormData({ name: "", age: "", riskLevel: "Low" })
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Add/Edit Student Form */}
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold mb-4">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Student Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Age"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <select
                                            value={formData.riskLevel}
                                            onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        >
                                            <option value="Low">Low Risk</option>
                                            <option value="Medium">Medium Risk</option>
                                            <option value="High">High Risk</option>
                                        </select>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        {editingStudent ? (
                                            <>
                                                <Button onClick={handleUpdateStudent}>
                                                    Update Student
                                                </Button>
                                                <Button variant="outline" onClick={() => {
                                                    setEditingStudent(null)
                                                    setFormData({ name: "", age: "", riskLevel: "Low" })
                                                }}>
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button onClick={handleAddStudent}>
                                                <Plus className="w-4 h-4 mr-2" /> Add Student
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Student List */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Current Students ({students.length})</h3>
                                    <div className="space-y-2">
                                        {students.map(student => (
                                            <div key={student.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{student.name}</p>
                                                        <p className="text-sm text-gray-500">{student.age} years • {student.riskLevel} Risk</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditStudent(student)}
                                                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteStudent(student.id)}
                                                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
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
