import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Bell, Eye, Volume2, Type, Laptop, Moon } from "lucide-react"

export function Settings() {
    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Customize your learning experience</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        <CardTitle>Visual Preferences</CardTitle>
                    </div>
                    <CardDescription>Adjust how content appears to you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Dyslexia-Friendly Font</p>
                            <p className="text-xs text-gray-500">Use OpenDyslexic typeface</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-400" />
                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">High Contrast Mode</p>
                            <p className="text-xs text-gray-500">Increase visual distinction</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-primary" />
                        <CardTitle>Audio Settings</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Reading Speed</span>
                            <span className="text-sm text-gray-500">0.8x</span>
                        </div>
                        <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Voice Pitch</span>
                            <span className="text-sm text-gray-500">Normal</span>
                        </div>
                        <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
                <Button variant="ghost">Reset Defaults</Button>
                <Button>Save Changes</Button>
            </div>
        </div>
    )
}
