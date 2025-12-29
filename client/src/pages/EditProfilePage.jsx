import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useAuth } from "../hook/useAuth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

function EditProfilePage() {
    const { user, updateUser } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
        username: "",
        email: "",
        },
    })

    // Carga valores cuando llega user (importante si viene async)
    useEffect(() => {
        if (user) {
        reset({
            username: user.username || "",
            email: user.email || "",
        })
        }
    }, [user, reset])

    const onSubmit = handleSubmit(async (data) => {
        await updateUser(data)
        alert("Datos actualizados")
    })

    if (!user) {
        return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <Card>
            <CardHeader>
                <CardTitle>Cargando…</CardTitle>
                <CardDescription>Preparando formulario de edición.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-4 w-56 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-4 w-72 animate-pulse rounded bg-muted" />
            </CardContent>
            </Card>
        </div>
        )
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editar perfil</h1>
            <p className="text-slate-600">Actualizá tu información de cuenta.</p>
        </div>

        <Card className="border-blue-100">
            <CardHeader>
            <CardTitle>Datos de la cuenta</CardTitle>
            <CardDescription>Podés modificar tu username y email.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
                <AlertTitle className="text-slate-900">Tip</AlertTitle>
                <AlertDescription className="text-slate-600">
                Verificá que el email esté bien escrito antes de guardar.
                </AlertDescription>
            </Alert>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                    Username
                </label>
                <Input
                    id="username"
                    type="text"
                    placeholder="Nuevo username"
                    {...register("username", { required: true, minLength: 3 })}
                    aria-invalid={!!errors.username}
                />
                {errors.username && (
                    <p className="text-sm text-destructive">
                    Username requerido (mínimo 3 caracteres).
                    </p>
                )}
                </div>

                <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Nuevo email"
                    {...register("email", { required: true })}
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">Email requerido.</p>
                )}
                </div>

                <Separator />

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button asChild variant="outline" className="border-blue-200">
                    <Link to="/profile">Cancelar</Link>
                </Button>

                <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
                </div>
            </form>
            </CardContent>

            <CardFooter className="justify-between">
            <p className="text-xs text-muted-foreground">
                Los cambios se aplican a tu cuenta al instante.
            </p>
            <Button asChild variant="ghost" className="text-blue-700 hover:text-blue-800">
                <Link to="/profile">Volver</Link>
            </Button>
            </CardFooter>
        </Card>
        </div>
    )
}

export default EditProfilePage
