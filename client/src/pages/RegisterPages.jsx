import {useForm} from 'react-hook-form'
import {useAuth} from '../hook/useAuth'
import { useEffect } from 'react'
import { useNavigate , Link} from 'react-router-dom'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


function RegisterPages(){
    const {register, handleSubmit, formState: { errors }} = useForm()
    const {user, signup, isAuth, error : registerError} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, [isAuth])

    console.log(user);

    const onSubmit = handleSubmit(async (data) => {
        await signup(data)
    })


    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create your account to get started.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                {Array.isArray(registerError) && registerError.length > 0 && (
                    <Alert variant="destructive">
                    <AlertTitle>Registration failed</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc pl-5 space-y-1">
                        {registerError.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                        </ul>
                    </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                        Username
                    </label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="yourname"
                        autoComplete="username"
                        {...register("username", { required: true })}
                        aria-invalid={!!errors.username}
                    />
                    {errors.username && (
                        <p className="text-sm text-destructive">This field is required</p>
                    )}
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
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
                    <label htmlFor="password" className="text-sm font-medium">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...register("password", { required: true })}
                        aria-invalid={!!errors.password}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">This field is required</p>
                    )}
                    </div>

                    <Button type="submit" className="w-full">
                    Register
                    </Button>
                </form>

                <Separator />
                </CardContent>

                <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="underline text-foreground">
                    Log in
                    </Link>
                </p>
                </CardFooter>
            </Card>
        </div>
        </>
    )
}

export default RegisterPages