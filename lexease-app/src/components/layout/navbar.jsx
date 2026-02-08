import { Link, useLocation } from "react-router-dom"
import { BookOpen, Mic, Ear, LayoutDashboard, Settings, Menu, X, ChevronLeft, ChevronRight, LogOut, User, Users, Home, Search, Bell } from "lucide-react"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "../ui/Logo"

const NavLink = ({ to, icon: Icon, children, onClick, isCollapsed }) => {
    const location = useLocation()
    const isActive = location.pathname === to

    return (
        <Link
            to={to}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
                isActive
                    ? "text-primary font-bold bg-primary/10"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                isCollapsed ? "justify-center px-2" : ""
            )}
            title={isCollapsed ? children : ""}
        >
            <Icon className={cn("w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110", isActive ? "text-primary" : "text-slate-400")} />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">{children}</span>}
            {isActive && (
                <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
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
                    "fixed left-4 top-4 bottom-4 bg-white rounded-[2.5rem] shadow-soft hidden md:flex flex-col z-50 transition-all duration-500 border border-slate-100",
                    isCollapsed ? "w-20 p-4" : "w-64 p-6"
                )}
            >
                {/* Logo Section */}
                <div className={cn("flex items-center gap-3 mb-12 transition-all duration-300", isCollapsed ? "justify-center px-0" : "px-2")}>
                    <div className="flex-shrink-0">
                        <Logo className={cn("transition-all duration-500", isCollapsed ? "w-10 h-10" : "w-12 h-12")} />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="text-lg font-black text-slate-800 tracking-tight leading-none">
                                LexEase
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                Adaptive Learning
                            </span>
                        </div>
                    )}
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-24 w-8 h-8 bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary rounded-full shadow-soft transition-all z-50 scale-90 hover:scale-110"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="space-y-1.5 flex-1 overflow-y-auto overflow-x-hidden pr-0.5 custom-scrollbar">
                    <NavLink to="/" icon={Home} isCollapsed={isCollapsed}>Dashboard</NavLink>

                    <div className={cn("py-6 flex items-center gap-2", isCollapsed ? "justify-center" : "px-4")}>
                        <div className="h-[1px] flex-1 bg-slate-100" />
                        {!isCollapsed && <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Modules</span>}
                        <div className="h-[1px] flex-1 bg-slate-100" />
                    </div>

                    <NavLink to="/read" icon={BookOpen} isCollapsed={isCollapsed}>Reader</NavLink>
                    <NavLink to="/speak" icon={Mic} isCollapsed={isCollapsed}>Speech Mode</NavLink>
                    <NavLink to="/listen" icon={Ear} isCollapsed={isCollapsed}>Listen Mode</NavLink>

                    <div className={cn("py-6 flex items-center gap-2", isCollapsed ? "justify-center" : "px-4")}>
                        <div className="h-[1px] flex-1 bg-slate-100" />
                        {!isCollapsed && <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Metrics</span>}
                        <div className="h-[1px] flex-1 bg-slate-100" />
                    </div>

                    <NavLink to="/dashboard" icon={LayoutDashboard} isCollapsed={isCollapsed}>Analytics</NavLink>
                    <NavLink to="/teacher" icon={Users} isCollapsed={isCollapsed}>Teacher Portal</NavLink>
                </div>

                {/* Profiles / Bottom section */}
                <div className="mt-8 pt-6 border-t border-slate-50 relative">
                    <div
                        className={cn(
                            "flex items-center gap-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all duration-300 group p-2",
                            isCollapsed ? "justify-center" : ""
                        )}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <div className="w-10 h-10 rounded-xl bg-pastel-purple text-accent flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors">
                            JS
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-800 truncate">John Smith</p>
                                <p className="text-[10px] font-medium text-slate-400">Student Account</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute bottom-full left-0 w-[240px] mb-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 origin-bottom p-2"
                                >
                                    <div className="space-y-1">
                                        <Link to="/profile" className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors text-left font-medium">
                                            <User className="w-4 h-4 text-slate-400" />
                                            Profile Profile
                                        </Link>
                                        <Link to="/settings" className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors text-left font-medium">
                                            <Settings className="w-4 h-4 text-slate-400" />
                                            Settings Settings
                                        </Link>
                                        <div className="h-px bg-slate-100 my-2 mx-2" />
                                        <button onClick={() => alert("Logged out successfully!")} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left font-medium">
                                            <LogOut className="w-4 h-4" />
                                            Log Out
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </nav>

            {/* Top Bar for Desktop (Search/Notifications) */}
            <div className="hidden md:flex fixed top-4 right-6 left-[300px] z-40 items-center justify-between pointer-events-none">
                <div className="flex-1" />
                <div className="flex items-center gap-4 pointer-events-auto bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-3xl shadow-soft border border-white/50">
                    <div className="flex items-center gap-3 bg-slate-100/50 px-4 py-1.5 rounded-2xl border border-slate-100">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search data..." className="bg-transparent border-none focus:ring-0 text-sm text-slate-600 w-48" />
                    </div>
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
                    </button>
                    <div className="h-6 w-[1px] bg-slate-200" />
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" className="w-8 h-8 rounded-full bg-slate-200" />
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-100 z-40 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-[1.25rem] flex items-center justify-center text-primary font-bold text-xl">
                        L
                    </div>
                    <span className="text-xl font-black text-slate-800 tracking-tight">LexEase</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="rounded-2xl bg-slate-50">
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
                        className="md:hidden fixed inset-0 top-20 bg-white z-30 p-6 flex flex-col"
                    >
                        <div className="space-y-2 flex-1">
                            <NavLink to="/" icon={Home} onClick={() => setIsOpen(false)}>Dashboard Dashboard</NavLink>
                            <NavLink to="/read" icon={BookOpen} onClick={() => setIsOpen(false)}>Reader Reader</NavLink>
                            <NavLink to="/speak" icon={Mic} onClick={() => setIsOpen(false)}>Speech Mode</NavLink>
                            <NavLink to="/listen" icon={Ear} onClick={() => setIsOpen(false)}>Listen Mode</NavLink>
                            <div className="my-6 border-t border-slate-50" />
                            <NavLink to="/dashboard" icon={LayoutDashboard} onClick={() => setIsOpen(false)}>Analytics Analytics</NavLink>
                            <NavLink to="/teacher" icon={Settings} onClick={() => setIsOpen(false)}>Settings Settings</NavLink>
                        </div>

                        <div className="mt-8 border-t border-slate-100 pt-6">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                                <div className="w-12 h-12 rounded-[1.25rem] bg-pastel-purple flex items-center justify-center text-accent font-bold text-lg">
                                    JS
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-800">John Smith</p>
                                    <p className="text-xs text-slate-500">Premium Account</p>
                                </div>
                                <button className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer for sidebar logic */}
            <style>{`
        @media (min-width: 768px) {
          main {
            padding-left: ${isCollapsed ? '7.5rem' : '20rem'} !important;
            padding-right: 2rem !important;
            padding-top: 6rem !important;
          }
        }
        @media (max-width: 767px) {
          main {
            padding-top: 6rem !important;
            padding-bottom: 2rem !important;
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
        }
      `}</style>
        </>
    )
}

function ChevronDown(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}
