import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { User, Mail, Shield, BookOpen, Clock, Trophy, MapPin, Calendar, ExternalLink } from "lucide-react"

export function Profile() {
    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition-all duration-500" />
                    <div className="relative w-32 h-32 bg-white rounded-[2.25rem] flex items-center justify-center text-4xl font-black text-slate-800 italic shadow-soft border border-slate-100">
                        JS
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight italic leading-none">John Student</h1>
                        <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-[10px] uppercase font-black tracking-[0.2em] w-fit mx-auto md:mx-0">Level 42</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-300" /> Sector 7-G</div>
                        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-300" /> Joined OCT 2025</div>
                    </div>
                </div>
                <div className="md:ml-auto flex gap-3">
                    <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-100 font-bold uppercase tracking-widest text-[10px]">Edit Identity</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Information Panel */}
                <div className="lg:col-span-2 glass-panel p-10 space-y-10">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase leading-none">Identity Matrix</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Core user parameters</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3 group hover:bg-white hover:shadow-soft transition-all duration-300">
                            <div className="flex items-center gap-4 text-slate-400">
                                <User className="w-4 h-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Formal Identification</p>
                            </div>
                            <p className="text-lg font-black text-slate-700 italic ml-8">John Alexander Student</p>
                        </div>

                        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3 group hover:bg-white hover:shadow-soft transition-all duration-300">
                            <div className="flex items-center gap-4 text-slate-400">
                                <Mail className="w-4 h-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Network Node</p>
                            </div>
                            <p className="text-lg font-black text-slate-700 italic ml-8">john.s@lexease.ai</p>
                        </div>

                        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3 group hover:bg-white hover:shadow-soft transition-all duration-300">
                            <div className="flex items-center gap-4 text-slate-400">
                                <Shield className="w-4 h-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Academic Tier</p>
                            </div>
                            <p className="text-lg font-black text-slate-700 italic ml-8">Grade 05 / Advanced</p>
                        </div>

                        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3 group hover:bg-white hover:shadow-soft transition-all duration-300">
                            <div className="flex items-center gap-4 text-slate-400">
                                <ExternalLink className="w-4 h-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Reference Key</p>
                            </div>
                            <p className="text-lg font-black text-slate-700 italic ml-8 font-mono">LEX-8832-AJ</p>
                        </div>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="glass-panel p-10 space-y-10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase leading-none">Telemetry</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Historical data overview</p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-5 group">
                            <div className="p-4 bg-pastel-blue rounded-2xl shadow-sm text-blue-500 group-hover:rotate-6 transition-transform">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-800 italic leading-none">24.5h</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Synaptic Time</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 group">
                            <div className="p-4 bg-pastel-purple rounded-2xl shadow-sm text-accent group-hover:rotate-6 transition-transform">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-800 italic leading-none">142</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Data Cycles</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 group">
                            <div className="p-4 bg-pastel-pink rounded-2xl shadow-sm text-secondary group-hover:rotate-6 transition-transform">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-800 italic leading-none">12</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Merit Badges</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-50">
                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 text-center">Next Tier: 65% Synchronized</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center py-6 px-10 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Protocol Termination</p>
                <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-2xl font-black uppercase text-[10px] tracking-widest italic">Permanent Decommission</Button>
            </div>
        </div>
    )
}
