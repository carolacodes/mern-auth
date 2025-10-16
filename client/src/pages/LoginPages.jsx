import {useForm} from 'react-hook-form'
import {useAuth} from '../hook/useAuth'
import {Link} from 'react-router-dom'

function LoginPages(){
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {signin, error : signinError} = useAuth()
    const onSubmit = handleSubmit(data => signin(data))
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