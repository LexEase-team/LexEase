import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                                <Sparkles size={24} />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                                LexEase
                            </span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed">
                            Empowering every learner with adaptive technology that understands and supports individual needs.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-brand-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-brand-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-brand-primary transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Product</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link to="/reader" className="text-gray-500 hover:text-brand-primary transition-colors">LexEase Reader</Link></li>
                            <li><Link to="/writing" className="text-gray-500 hover:text-brand-primary transition-colors">Smart Writer</Link></li>
                            <li><Link to="/listening" className="text-gray-500 hover:text-brand-primary transition-colors">Clear Listen</Link></li>
                            <li><Link to="/onboarding" className="text-gray-500 hover:text-brand-primary transition-colors">Onboarding</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Resources</h4>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" className="text-gray-500 hover:text-brand-primary transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-brand-primary transition-colors">Accessibility Guide</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-brand-primary transition-colors">Community</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-brand-primary transition-colors">Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Legal</h4>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" className="text-gray-500 hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-brand-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-brand-primary transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-brand-primary transition-colors">GDPR Compliance</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gray-50 gap-6">
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                        Made with <Heart size={14} className="text-brand-accent fill-brand-accent" /> for inclusive education.
                    </p>
                    <p className="text-gray-400 text-sm">
                        © 2026 LexEase. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
