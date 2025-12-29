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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

function ProfilePage() {
    const { user } = useAuth()

    if (!user) {
        return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <Card>
            <CardHeader>
                <CardTitle>Cargando…</CardTitle>
                <CardDescription>Obteniendo tu información de perfil.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-4 w-56 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-4 w-72 animate-pulse rounded bg-muted" />
            </CardContent>
            </Card>
        </div>
        )
    }

    const displayName = user?.name || user?.username || user?.email || "Usuario"
    const initials =
        displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("") || "U"

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mi perfil</h1>
            <p className="text-slate-600">Tus datos y accesos rápidos.</p>
        </div>

        <Card className="border-blue-100">
            <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarFallback className="text-sm">{initials}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
                <CardTitle className="truncate">{displayName}</CardTitle>
                <CardDescription className="truncate">{user.email}</CardDescription>
            </div>
            </CardHeader>

            <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-background p-4">
                <p className="text-xs text-muted-foreground">Username</p>
                <p className="mt-1 font-medium">{user.username || "-"}</p>
                </div>

                <div className="rounded-lg border bg-background p-4">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="mt-1 font-medium break-all">{user.email || "-"}</p>
                </div>
            </div>

            <Separator />

            <div className="space-y-2">
                <h2 className="text-sm font-semibold text-slate-900">Acciones</h2>

                <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link to="/profile/edit">Editar perfil</Link>
                </Button>

                <Button asChild variant="destructive">
                    <Link to="/profile/delete">Eliminar cuenta</Link>
                </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                * Eliminar la cuenta es una acción irreversible.
                </p>
            </div>
            </CardContent>

            <CardFooter className="justify-end">
            <Button asChild variant="outline" className="border-blue-200">
                <Link to="/">Volver al inicio</Link>
            </Button>
            </CardFooter>
        </Card>
        </div>
    )
}

export default ProfilePage
