import { Link } from "react-router-dom"
import { useAuth } from "../hook/useAuth"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

function HomePages() {
    const { isAuth, user } = useAuth()

    const displayName = user?.name || user?.username || user?.email || "User"

    return (
        <div className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
            {/* HERO */}
            <div className="space-y-4">
                <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                Auth Demo • React + JWT (example)
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Simple app to register and log in users
                </h1>

                <p className="text-slate-600">
                This project is a small authentication playground: create an account, log in,
                and access protected routes like your profile.
                </p>

                <div className="flex flex-wrap gap-2">
                {!isAuth ? (
                    <>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link to="/register">Create account</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-blue-200">
                        <Link to="/login">Log in</Link>
                    </Button>
                    </>
                ) : (
                    <>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link to="/profile">Go to profile</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-blue-200">
                        <Link to="/profile/edit">Edit profile</Link>
                    </Button>
                    </>
                )}
                </div>
            </div>

            {/* CARD */}
            <Card className="border-blue-100 shadow-sm">
                <CardHeader>
                <CardTitle className="text-slate-900">
                    {isAuth ? `Welcome, ${displayName}` : "How it works"}
                </CardTitle>
                <CardDescription>
                    {isAuth
                    ? "You’re authenticated — you can access protected routes."
                    : "Register a new user, then log in to unlock protected routes."}
                </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-900">Protected routes</p>
                    <p className="text-sm text-blue-800/80">
                    /profile • /profile/edit • /profile/delete
                    </p>
                </div>

                {!isAuth && (
                    <Alert className="border-blue-200 bg-white">
                    <AlertTitle className="text-slate-900">Tip</AlertTitle>
                    <AlertDescription className="text-slate-600">
                        Create an account first, then log in to see the profile page.
                    </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-blue-100 bg-white p-3">
                    <p className="text-sm font-medium text-slate-900">Register</p>
                    <p className="text-xs text-slate-600">Create a user</p>
                    </div>
                    <div className="rounded-lg border border-blue-100 bg-white p-3">
                    <p className="text-sm font-medium text-slate-900">Login</p>
                    <p className="text-xs text-slate-600">Start session</p>
                    </div>
                    <div className="rounded-lg border border-blue-100 bg-white p-3">
                    <p className="text-sm font-medium text-slate-900">Profile</p>
                    <p className="text-xs text-slate-600">Protected page</p>
                    </div>
                </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                <p className="text-xs text-slate-500">
                    UI: shadcn • Forms: react-hook-form
                </p>

                {!isAuth ? (
                    <Button asChild variant="ghost" className="text-blue-700 hover:text-blue-800">
                    <Link to="/login">Start now →</Link>
                    </Button>
                ) : (
                    <Button asChild variant="ghost" className="text-blue-700 hover:text-blue-800">
                    <Link to="/profile">Open profile →</Link>
                    </Button>
                )}
                </CardFooter>
            </Card>
            </div>
        </div>
        </div>
    )
}

export default HomePages
