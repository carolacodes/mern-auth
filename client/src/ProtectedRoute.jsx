import { Navigate , Outlet} from 'react-router-dom'
import {useAuth} from './hook/useAuth'

function ProtectedRoute() {
    const {isAuth, loading} = useAuth()
    console.log(loading, isAuth)
    
    if (loading) {
        return <h2>Loading...</h2>
    }
    if (!loading && !isAuth) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoute