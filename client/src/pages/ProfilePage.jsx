import { useAuth } from "../hook/useAuth";
import { Link } from "react-router-dom";
function ProfilePage() {
    const { user } = useAuth();

    if (!user) return <h2>Cargando...</h2>;

    return (
        <>
            <div style={{ maxWidth: 480, margin: "2rem auto" }}>
                <h1>Mi perfil</h1>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>

                <hr style={{ margin: "1.5rem 0" }} />

                <h2>Acciones</h2>
                <ul>
                    <li>
                    <Link to="/profile/edit">Editar perfil</Link>
                    </li>
                    <li>
                    <Link to="/profile/delete">Eliminar cuenta</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfilePage