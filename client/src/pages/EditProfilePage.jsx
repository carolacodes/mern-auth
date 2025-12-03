import { useAuth } from "../hook/useAuth";
import { useForm } from "react-hook-form";

function EditProfilePage() {
    const { user, updateUser } = useAuth();
    const { register, handleSubmit } = useForm({
        defaultValues: {
        username: user?.username,
        email: user?.email,
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        await updateUser(data);
        alert("Datos actualizados");
    });

    return (
        <>
        <h1>Editar perfil</h1>

        <form onSubmit={onSubmit}>
            <input type="text" {...register("username")} placeholder="Nuevo username" />
            <input type="email" {...register("email")} placeholder="Nuevo email" />
            <button type="submit">Guardar cambios</button>
        </form>
        </>
    );
}

export default EditProfilePage;