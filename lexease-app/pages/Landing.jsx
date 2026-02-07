import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Mic, Ear, Sparkles, Brain, Heart, Users, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"

const features = [
    {
        icon: BookOpen,
        title: "Adaptive Reading",
        desc: "Content that adapts to your gaze. If you struggle, we help instantly with spacing and phonetics.",
        color: "bg-primary/10 text-primary",
        link: "/read"
    },
    {
        icon: Mic,
        title: "Confident Speaking",
        desc: "Speak your thoughts. We'll transcribe them and help refine your grammar and clarity.",
        color: "bg-secondary/10 text-secondary",
        link: "/speak"
    },
    {
        icon: Ear,
        title: "Active Listening",
        desc: "Listen and learn. We break down complex sentences into simple, digestible stories.",
        color: "bg-success/10 text-success",
        link: "/listen"
    }
]

export function Landing() {
    return (
        <div className="space-y-24 py-8 pb-32">
            {/* Hero Section */}
            <section className="relative text-center max-w-5xl mx-auto space-y-8 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>The Future of Inclusive Learning</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight"
                >
                    Learning that adapts to <br className="hidden md:block" />
                    <span className="text-primary relative inline-block">
                        your distinctive mind
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                >
                    TriRead is an advanced accessibility platform helping students with <span className="font-semibold text-gray-800">Dyslexia, Dysgraphia, and SLI</span> master reading, writing, and comprehension through real-time AI adaptation.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                    <Link to="/read">
                        <Button size="lg" className="rounded-full px-10 py-6 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                            Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="rounded-full px-10 py-6 text-lg border-2 hover:bg-gray-50" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>
                        How it Works
                    </Button>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <Link to={feature.link} className="block h-full group">
                            <Card className="h-full hover:shadow-2xl transition-all duration-300 border-transparent hover:border-primary/10 bg-white/50 backdrop-blur-sm group-hover:-translate-y-2">
                                <CardContent className="p-8 space-y-6">
                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${feature.color} mb-4 transition-transform group-hover:scale-110 shadow-sm`}>
                                        <feature.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {feature.desc}
                                    </p>
                                    <div className="pt-4 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
                                        Try now <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </section>

            {/* Mission / About Section */}
            <section id="how-it-works" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white rounded-3xl p-8 md:p-16 shadow-xl shadow-indigo-100/50 border border-indigo-50">
                <div className="space-y-8">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                        <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900">Why TriRead?</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Traditional learning tools force students to adapt to the content. We believe the content should adapt to the learner.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Auto-adjusts font size and spacing based on struggle points",
                            "Real-time speech-to-text for frustration-free writing",
                            "Simplifies complex grammar without losing meaning",
                            "Celebrates every milestone with confidence-boosting feedback"
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gray-900 rounded-3xl p-8 text-white space-y-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 border-b border-gray-800 pb-6">
                            <Brain className="w-10 h-10 text-indigo-400" />
                            <div>
                                <p className="font-bold text-lg">AI Adaptation Engine</p>
                                <p className="text-indigo-400 text-sm">Processing in Real-Time</p>
                            </div>
                        </div>
                        <div className="space-y-4 font-mono text-sm opacity-80">
                            <p>&gt; Detecting gaze fixation...</p>
                            <p>&gt; Struggle identified at word "Phenomenon"</p>
                            <p>&gt; Applying dyslexic-friendly spacing...</p>
                            <p className="text-green-400">&gt; Content adapted successfully.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                    {[
                        { label: "Active Students", value: "1,200+" },
                        { label: "Words Mastered", value: "50k+" },
                        { label: "Reading Speed", value: "+40%" },
                        { label: "User Rating", value: "4.9/5" },
                    ].map((stat, i) => (
                        <div key={i} className="space-y-2 p-4">
                            <h4 className="text-4xl font-bold text-gray-900">{stat.value}</h4>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer / CTA */}
            <section className="text-center py-16 bg-gradient-to-b from-transparent to-indigo-50 rounded-3xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to transform your learning journey?</h2>
                <Link to="/read">
                    <Button size="lg" className="rounded-full px-12 py-6 text-lg">
                        Get Started for Free
                    </Button>
                </Link>
                <p className="mt-4 text-sm text-gray-500">No credit card required • Accessibility first design</p>
            </section>
        </div>
    )
}
