import {useForm} from 'react-hook-form'
import {useAuth} from '../hook/useAuth'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

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
        <>
        <h1>Login</h1>
        <div>
            {
                    signinError.map((error, index) => (
                        <div key={index} style={{color: 'red'}}>{error}</div>
                    ))
                }
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("email", {required: true})} placeholder='email'/>
                    {errors.email && <span>This field is required</span>}
                    <input type="text" {...register("password", {required: true})} placeholder='password'/>
                    {errors.password && <span>This field is required</span>}
                    <button type="submit">
                        Login
                    </button>
                </form>
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
        </>
    )
}

export default LoginPages