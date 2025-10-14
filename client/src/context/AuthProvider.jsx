import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { registerRequest } from "../api/auth";
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState([])
    

    async function signup(formData) {
        try {
            setError([]); // limpia errores previos
            const res = await registerRequest(formData);
            setUser(res.data);
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

    async function logout() {
        // ejemplo: si tu backend usa cookies httpOnly:
        // await api.post("/logout");
        setUser(null);
    }

    const value = { user, isAuth, signup, logout , error};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
