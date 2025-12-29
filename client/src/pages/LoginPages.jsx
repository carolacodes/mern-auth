import {useForm} from 'react-hook-form'
import {useAuth} from '../hook/useAuth'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

function LoginPages(){
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {signin, error : signinError, isAuth} = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(data => signin(data))

    // ⬇️ ESTE EFECTO ES LO QUE TE FALTABA
    useEffect(() => {
        if (isAuth) navigate('/profile')
    }, [isAuth])
    return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your email and password to continue.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
            {Array.isArray(signinError) && signinError.length > 0 && (
                <Alert variant="destructive">
                <AlertTitle>Login failed</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc pl-5 space-y-1">
                    {signinError.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))}
                    </ul>
                </AlertDescription>
                </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email", { required: true })}
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">This field is required</p>
                )}
                </div>

                <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {/* Si tenés route de forgot-password, descomentá */}
                    {/* <Link className="text-sm underline" to="/forgot-password">Forgot?</Link> */}
                </div>

                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password", { required: true })}
                    aria-invalid={!!errors.password}
                />
                {errors.password && (
                    <p className="text-sm text-destructive">This field is required</p>
                )}
                </div>

                <Button type="submit" className="w-full">
                Login
                </Button>
            </form>
            </CardContent>

            <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline text-foreground">
                Sign up
                </Link>
            </p>
            </CardFooter>
        </Card>
        </div>
    )
}

export default LoginPages