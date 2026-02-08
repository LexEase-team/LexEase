import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Bell, Eye, Volume2, Type, Laptop, Moon, Settings as SettingsIcon, Shield, Sliders } from "lucide-react"

export function Settings() {
    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-slate-50 text-slate-400 rounded-3xl shadow-sm">
                    <SettingsIcon className="w-10 h-10" />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight italic uppercase">System Config</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Personalize your neural environment</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-10 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl shadow-sm">
                            <Eye className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 italic leading-none">Visual Fidelity</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Interface Perception</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-soft transition-all duration-300">
                            <div>
                                <p className="font-bold text-slate-700 italic">Dyslexia Font Core</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">OpenDyslexic Engine</p>
                            </div>
                            <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="toggle" className="absolute block w-4 h-4 rounded-full bg-white border-none appearance-none cursor-pointer top-1 left-1 checked:left-7 transition-all duration-300 shadow-sm" />
                                <label htmlFor="toggle" className="block overflow-hidden h-6 rounded-full bg-slate-200 cursor-pointer"></label>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-soft transition-all duration-300">
                            <div>
                                <p className="font-bold text-slate-700 italic">High Contrast Mode</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Maximize Distinction</p>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-xl h-10 px-6 border-slate-200 font-black uppercase tracking-widest text-[9px]">Initialize</Button>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-10 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-accent rounded-2xl shadow-sm">
                            <Volume2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 italic leading-none">Audio Streams</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Acoustic Feedback</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-2">Speech Velocity</p>
                                <p className="text-xs font-black text-primary italic">0.85x</p>
                            </div>
                            <input type="range" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-2">Harmonic Pitch</p>
                                <p className="text-xs font-black text-accent italic">Balanced</p>
                            </div>
                            <input type="range" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-10 space-y-8 border-dashed border-2 border-slate-100 bg-transparent shadow-none">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                            <Sliders className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-slate-500 italic max-w-md">Configuration changes will be cached locally and synced with your primary user profile upon session termination.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="ghost" className="rounded-2xl h-12 px-8 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Reset Synapse</Button>
                        <Button className="rounded-2xl h-12 px-10 bg-slate-900 text-white hover:bg-primary shadow-lg font-bold uppercase tracking-widest text-[10px]">Commit Settings</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
