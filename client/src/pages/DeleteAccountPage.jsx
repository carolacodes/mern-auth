import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
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
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

function DeleteAccountPage() {
    const { deleteAccount } = useAuth()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleConfirmDelete = async () => {
        try {
        setLoading(true)
        await deleteAccount()
        setOpen(false)
        navigate("/")
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Eliminar cuenta</h1>
            <p className="text-slate-600">Esta acción es irreversible.</p>
        </div>

        <Card className="border-red-200">
            <CardHeader>
            <CardTitle className="text-red-700">Zona peligrosa</CardTitle>
            <CardDescription>
                Al eliminar tu cuenta, se borrarán tus datos y no podrás recuperarlos.
            </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
            <Alert variant="destructive">
                <AlertTitle>Atención</AlertTitle>
                <AlertDescription>
                Esto eliminará tu cuenta <strong>definitivamente</strong>.
                </AlertDescription>
            </Alert>

            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-900">¿Qué pasa después?</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-red-900/80 space-y-1">
                <li>Se cierra tu sesión.</li>
                <li>Se elimina tu perfil del sistema.</li>
                <li>No hay forma de deshacer esta acción.</li>
                </ul>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button asChild variant="outline">
                <Link to="/profile">Cancelar</Link>
                </Button>

                <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Eliminar cuenta</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>¿Seguro que querés eliminar tu cuenta?</DialogTitle>
                    <DialogDescription>
                        Esta acción no se puede deshacer. Si continuás, tu cuenta será eliminada
                        permanentemente.
                    </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" disabled={loading}>
                        No, cancelar
                        </Button>
                    </DialogClose>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleConfirmDelete}
                        disabled={loading}
                    >
                        {loading ? "Eliminando..." : "Sí, eliminar definitivamente"}
                    </Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
            </CardContent>

            <CardFooter className="justify-between">
            <p className="text-xs text-muted-foreground">
                Si solo querés cambiar tus datos, podés editar tu perfil.
            </p>
            <Button asChild variant="ghost" className="text-blue-700 hover:text-blue-800">
                <Link to="/profile/edit">Editar perfil</Link>
            </Button>
            </CardFooter>
        </Card>
        </div>
    )
}

export default DeleteAccountPage
