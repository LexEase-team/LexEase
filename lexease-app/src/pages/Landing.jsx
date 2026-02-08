import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Mic, Ear, Sparkles, Brain, Heart, Users, CheckCircle, Smartphone } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { cn } from "../lib/utils"
import { Logo } from "../components/ui/Logo"

const features = [
    {
        icon: BookOpen,
        title: "Adaptive Reader",
        desc: "Our neural engine adapts text weight and spacing in real-time based on your focus.",
        color: "text-blue-500",
        bg: "bg-blue-50",
        card: "card-pastel-blue",
        link: "/read"
    },
    {
        icon: Mic,
        title: "Fluent Speech",
        desc: "Express yourself clearly with AI-powered verbal refinement and grammar support.",
        color: "text-purple-500",
        bg: "bg-purple-50",
        card: "card-pastel-purple",
        link: "/speak"
    },
    {
        icon: Ear,
        title: "Smart Listening",
        desc: "Break down complex narratives into digestible, easy-to-remember stories.",
        color: "text-pink-500",
        bg: "bg-pink-50",
        card: "card-pastel-pink",
        link: "/listen"
    }
]

export function Landing() {
    return (
        <div className="space-y-32 pb-32">
            {/* Hero Section */}
            <section className="relative text-center max-w-6xl mx-auto space-y-10 pt-20 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6"
                >
                    <Logo className="w-5 h-5" />
                    <span>The Future of Accessible Learning</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black tracking-tight text-slate-800 leading-[0.95] italic"
                >
                    Learn naturally <br />
                    <span className="brand-gradient-text leading-tight">Empowering Unique Minds</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
                >
                    Empowering distinctive minds through <br className="hidden md:block" />
                    <span className="text-slate-900 font-bold underline decoration-primary/30 decoration-8 underline-offset-[-2px]">real-time neural AI adaptation</span> for reading and writing.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
                >
                    <Link to="/read">
                        <Button size="lg" className="rounded-2xl px-12 py-8 text-lg font-black uppercase tracking-widest bg-slate-900 hover:bg-primary transition-all duration-300 shadow-soft group">
                            Get Started <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                    <button
                        onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all"
                    >
                        View Demo
                    </button>
                </motion.div>
            </section>

            {/* Features Glass Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="group"
                    >
                        <Link to={feature.link} className="block h-full">
                            <div className={cn("h-full p-12 space-y-10 transition-all duration-500 group-hover:-translate-y-4", feature.card)}>
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:rotate-12", feature.bg, feature.color)}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-slate-800 tracking-tight italic">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                                <div className="pt-6 flex items-center text-xs font-black uppercase tracking-widest text-primary opacity-40 group-hover:opacity-100 transition-all">
                                    Initialize <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </section>

            {/* Innovation Section */}
            <section id="how-it-works" className="max-w-7xl mx-auto px-6">
                <div className="glass-panel grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-12 md:p-24 relative overflow-hidden">
                    <div className="space-y-10 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest">
                            Neural Pipeline
                        </div>
                        <h2 className="text-5xl font-black text-slate-800 tracking-tight italic leading-tight">
                            The Gaze-Adaptive <br /> Advantage
                        </h2>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
                            Unlike traditional tools, <span className="text-slate-900 font-black">LexEase</span> shifts the burden of adaptation from the student to the interface itself.
                        </p>

                        <div className="grid gap-6">
                            {[
                                "Gaze Fixation Detection System",
                                "Phonetic Breakdown Core",
                                "Active Grammar Smoothing",
                                "Neuro-Cognitive Load Balancing"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <span className="text-lg font-bold text-slate-600/80 tracking-tight font-medium italic">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="relative bg-white rounded-[3rem] p-12 shadow-soft border border-slate-100 overflow-hidden"
                        >
                            <div className="flex items-center gap-5 border-b border-slate-50 pb-8 mb-8 relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Brain className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <p className="font-black text-xl text-slate-800 italic">Neural Engine Active</p>
                                    <p className="text-primary text-[10px] uppercase font-bold tracking-widest">Processing Latency: 4ms</p>
                                </div>
                            </div>
                            <div className="space-y-4 font-medium text-sm text-slate-400 leading-relaxed relative z-10">
                                <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Scanning focal positions...</p>
                                <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> 84% focus level detected</p>
                                <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Calibrating "metamorphosis"...</p>
                                <p className="text-primary font-bold mt-6 italic"> Adaptation complete.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Active Nodes", value: "1.2k" },
                        { label: "Words Processed", value: "50k+" },
                        { label: "Performance", value: "+40%" },
                        { label: "User Affinity", value: "98%" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-4">
                            <h4 className="text-5xl font-black text-slate-800 tracking-tight italic">{stat.value}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
