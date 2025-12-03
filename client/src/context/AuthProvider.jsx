import { AuthContext } from "./AuthContext";
import { useState , useEffect} from "react";
import { registerRequest, loginRequest } from "../api/auth";
import { getUserRequest, updateUserRequest, deleteUserRequest } from "../api/user";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(true)
    

    async function signup(formData) {
        try {
            setError([]); // limpia errores previos
            const res = await registerRequest(formData);
            setUser(res.data.user ?? res.data);
            setIsAuth(true);
        }catch(e){  
            // --- Normalización de errores ---
            const data = e?.response?.data;
            let errs = [];

            if (!data) {
                errs = ["Unexpected error"];
            } else if (Array.isArray(data)) {
                // por si el backend devolviera un array
                errs = data.map(String);
            } else if (Array.isArray(data?.issues)) {
                // Formato típico de validación: { message, issues: [{path, message}] }
                errs = data.issues.map(i => i.message);
            } else if (typeof data?.error === "string") {
                errs = [data.error];
            } else if (typeof data?.message === "string") {
                errs = [data.message];
            } else {
                errs = ["Request failed"];
            }
            setError(errs);
            console.log(error.response);
        }
    }

    async function signin(formData) {
        try {
            setError([]); // limpia errores previos
            const res = await loginRequest(formData)
            setUser(res.data.user ?? res.data);
            setIsAuth(true);
            console.log(res)
        }catch(e){
            // --- Normalización de errores ---
            const data = e?.response?.data;
            let errs = [];

            if (!data) {
                errs = ["Unexpected error"];
            } else if (Array.isArray(data)) {
                // por si el backend devolviera un array
                errs = data.map(String);
            } else if (Array.isArray(data?.issues)) {
                // Formato típico de validación: { message, issues: [{path, message}] }
                errs = data.issues.map(i => i.message);
            } else if (typeof data?.error === "string") {
                errs = [data.error];
            } else if (typeof data?.message === "string") {
                errs = [data.message];
            } else {
                errs = ["Request failed"];
            }
            setError(errs);
            console.log(e.response);
        }
    }

    useEffect(() => {
        if(error.length > 0){
            const timer = setTimeout(() => {
                setError([])
            }, 5000);
            return () => clearTimeout(timer); //quitamos el timeout si el componente se desmonta
        }
    }, [error])

    //Usamos cookie de js-cookie para manejar la sesion
    useEffect(() => {
            async function checkAuth() {
            try {
            const res = await getUserRequest();
            setUser(res.data.user ?? res.data);
            setIsAuth(true);
            } catch (error) {
            setUser(null);
            setIsAuth(false);
            console.log(error)
            } finally {
            setLoading(false);
            }
        }
        checkAuth();
    }, [])

    async function updateUser(data) {
        const res = await updateUserRequest(data);
        setUser(res.data.user); // depende de cómo respondas en backend
    }

    async function deleteAccount() {
        await deleteUserRequest();
        setIsAuth(false);
        setUser(null);
    }

    async function logout() {
        // ejemplo: si tu backend usa cookies httpOnly:
        // await api.post("/logout");
        setIsAuth(false);
        setUser(null);
    }

    const value = { user, isAuth, signup, logout , error, signin, loading, updateUser,deleteAccount};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
