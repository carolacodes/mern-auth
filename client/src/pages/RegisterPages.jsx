import {useForm} from 'react-hook-form'
import {useAuth} from '../hook/useAuth'
import { useEffect } from 'react'
import { useNavigate , Link} from 'react-router-dom'
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
            <h1>Register</h1>
            <div>
                {
                    registerError.map((error, index) => (
                        <div key={index} style={{color: 'red'}}>{error}</div>
                    ))
                }
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("username", {required: true})} placeholder='username'/>
                    {errors.username && <span>This field is required</span>}
                    <input type="text" {...register("email", {required: true})} placeholder='email'/>
                    {errors.email && <span>This field is required</span>}
                    <input type="text" {...register("password", {required: true})} placeholder='password'/>
                    {errors.password && <span>This field is required</span>}
                    <button type="submit">
                        Register
                    </button>
                </form>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </>
    )
}

export default RegisterPages