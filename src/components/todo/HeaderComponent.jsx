import { Link } from "react-router-dom";
import { useAuth } from './security/AuthContext'

export default function HeaderComponent() {
    const authContext = useAuth();

    const isAuthenticated = authContext.isAuthenticated;

    function handleLogout() {
        authContext.logout();
    }


    return (
        <header className="header navbar navbar-expand-lg navbar-dark bg-dark shadow-lg mb-4 p-3">
            <div className="container">
                <a className="navbar-brand fs-3 fw-bold" href="/">Your Todos.</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto ">
                        <li className="nav-item">
                            {isAuthenticated && <Link className="nav-link" to="/welcome/nerdy">Home</Link>}
                        </li>
                        <li className="nav-item">
                            {isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                        </li>
                        <li className="nav-item">
                            {isAuthenticated && <Link className="nav-link" to="/logout" onClick={handleLogout}>Logout</Link>}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}