import { useAuth } from "../hook/useAuth";

function DeleteAccountPage() {
    const { deleteAccount } = useAuth();

    return (
        <>
            <h1>Eliminar cuenta</h1>
            <button onClick={deleteAccount}>Eliminar definitivamente</button>
        </>
    );
}

export default DeleteAccountPage;