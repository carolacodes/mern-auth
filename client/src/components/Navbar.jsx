import { Link, NavLink } from "react-router-dom"
import { useAuth } from '../hook/useAuth'

import { Button } from "@/components/ui/button"

function Navbar() {
        const { isAuth , logout, user} = useAuth();
            const displayName = user?.name || user?.username || user?.email || "User"

        const linkClass = ({ isActive }) =>
            `text-sm transition-colors ${
            isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`


    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link to="/" className="text-sm font-semibold tracking-tight">
            My Application
            </Link>

            <nav className="flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
                Home
            </NavLink>

            {!isAuth ? (
                <>
                <Button asChild variant="ghost" size="sm">
                    <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                    <Link to="/register">Register</Link>
                </Button>
                </>
            ) : (
                <>
                <span className="hidden sm:inline text-sm text-muted-foreground">
                    Welcome {displayName}
                </span>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => logout()}
                >
                    Logout
                </Button>
                </>
            )}
            </nav>
        </div>
        </header>
    )
}
export default Navbar;