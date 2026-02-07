import { Link, useLocation } from "react-router-dom"
import { BookOpen, Mic, Ear, LayoutDashboard, Settings, Menu, X, ChevronLeft, ChevronRight, LogOut, User, Home } from "lucide-react"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"
import { motion, AnimatePresence } from "framer-motion"

const NavLink = ({ to, icon: Icon, children, onClick, isCollapsed }) => {
    const location = useLocation()
    const isActive = location.pathname === to

    return (
        <Link
            to={to}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                isCollapsed ? "justify-center px-2" : ""
            )}
            title={isCollapsed ? children : ""}
        >
            {isActive && (
                <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-700")} />
            {!isCollapsed && <span className="relative whitespace-nowrap overflow-hidden text-ellipsis">{children}</span>}
        </Link>
    )
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    return (
        <>
            {/* Desktop Sidebar */}
            <nav
                className={cn(
                    "fixed left-0 top-0 h-full bg-white border-r border-gray-100 hidden md:flex flex-col z-50 shadow-sm transition-all duration-300",
                    isCollapsed ? "w-20 p-4" : "w-64 p-6"
                )}
            >
                <div className={cn("flex items-center gap-3 mb-8", isCollapsed ? "justify-center px-0" : "px-2")}>
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 flex-shrink-0">
                        T
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold text-gray-900 tracking-tight overflow-hidden whitespace-nowrap">
                            TriRead
                        </span>
                    )}
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-primary shadow-sm hover:shadow-md transition-all z-50"
                >
                    {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                </button>

                <div className="space-y-2 flex-1 overflow-y-auto overflow-x-hidden">
                    <NavLink to="/" icon={Home} isCollapsed={isCollapsed}>Home</NavLink>

                    {!isCollapsed && (
                        <div className="px-4 py-2 mt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Learning Modes
                        </div>
                    )}
                    <NavLink to="/read" icon={BookOpen} isCollapsed={isCollapsed}>Read Mode</NavLink>
                    <NavLink to="/speak" icon={Mic} isCollapsed={isCollapsed}>Speak Mode</NavLink>
                    <NavLink to="/listen" icon={Ear} isCollapsed={isCollapsed}>Listen Mode</NavLink>

                    {!isCollapsed && (
                        <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Progress
                        </div>
                    )}
                    <NavLink to="/dashboard" icon={LayoutDashboard} isCollapsed={isCollapsed}>Dashboard</NavLink>

                    {!isCollapsed && (
                        <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Admin
                        </div>
                    )}
                    <NavLink to="/teacher" icon={Settings} isCollapsed={isCollapsed}>Teacher Portal</NavLink>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 relative">
                    <div
                        className={cn(
                            "flex items-center gap-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors relative",
                            isCollapsed ? "justify-center p-2" : "px-4 py-3"
                        )}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-medium text-sm flex-shrink-0">
                            JS
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">John Student</p>
                                <p className="text-xs text-gray-500 truncate">Student Account</p>
                            </div>
                        )}

                        {/* Profile Dropdown */}
                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-bottom"
                                    style={{ minWidth: isCollapsed ? '200px' : '100%' }}
                                >
                                    <div className="p-2 space-y-1">
                                        <Link to="/profile" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left font-medium">
                                            <User className="w-4 h-4 text-gray-500" />
                                            Profile
                                        </Link>
                                        <Link to="/settings" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left font-medium">
                                            <Settings className="w-4 h-4 text-gray-500" />
                                            Settings
                                        </Link>
                                        <div className="h-px bg-gray-100 my-1" />
                                        <button onClick={() => alert("Logged out successfully!")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left font-medium">
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </nav>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-40 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        T
                    </div>
                    <span className="text-lg font-bold text-gray-900">TriRead</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed inset-0 top-16 bg-white z-30 p-4"
                    >
                        <div className="space-y-2">
                            <NavLink to="/read" icon={BookOpen} onClick={() => setIsOpen(false)}>Read Mode</NavLink>
                            <NavLink to="/speak" icon={Mic} onClick={() => setIsOpen(false)}>Speak Mode</NavLink>
                            <NavLink to="/listen" icon={Ear} onClick={() => setIsOpen(false)}>Listen Mode</NavLink>
                            <div className="my-4 border-t border-gray-100" />
                            <NavLink to="/dashboard" icon={LayoutDashboard} onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                            <NavLink to="/teacher" icon={Settings} onClick={() => setIsOpen(false)}>Teacher Portal</NavLink>
                        </div>

                        <div className="mt-8 border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-medium text-sm">
                                    JS
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">John Student</p>
                                    <p className="text-xs text-gray-500">Student Account</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer for collapsed state logic in Layout */}
            <style>{`
        @media (min-width: 768px) {
          main {
            padding-left: ${isCollapsed ? '5rem' : '16rem'} !important;
          }
        }
      `}</style>
        </>
    )
}
