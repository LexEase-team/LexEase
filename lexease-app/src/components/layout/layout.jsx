import { Navbar } from "./navbar"

export function Layout({ children }) {
    return (
        <div className="flex min-h-screen text-slate-800 font-sans antialiased">
            <Navbar />
            <main className="flex-1 md:pl-64 pt-16 md:pt-0 min-h-screen transition-all duration-300">
                <div className="container mx-auto p-6 md:p-8 lg:p-12 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
