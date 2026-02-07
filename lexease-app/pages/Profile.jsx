import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { User, Mail, Shield, BookOpen, Clock, Trophy } from "lucide-react"

export function Profile() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center text-3xl font-bold text-secondary">
                    JS
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">John Student</h1>
                    <p className="text-gray-500">Student Account</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <User className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-xs text-gray-400 uppercase">Full Name</p>
                                <p className="font-medium text-gray-900">John Student</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-xs text-gray-400 uppercase">Email</p>
                                <p className="font-medium text-gray-900">john.student@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <Shield className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-xs text-gray-400 uppercase">Grade Level</p>
                                <p className="font-medium text-gray-900">5th Grade</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Learning Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">24h</p>
                                <p className="text-xs text-gray-500">Total Learning Time</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">142</p>
                                <p className="text-xs text-gray-500">Stories Read</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-xs text-gray-500">Badges Earned</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Delete Account</Button>
            </div>
        </div>
    )
}
