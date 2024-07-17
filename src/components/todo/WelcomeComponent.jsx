import { Link, useParams } from 'react-router-dom'

export default function WelcomeComponent() {
    const { username } = useParams();

    return (
        <div className="welcomeComponent container text-center mt-5">
            <h1 className="display-4">Welcome, {username}!</h1>
            <div className="mt-4">
                <p className="lead">Manage Your Todos.</p>
                <Link to="/todos" className="btn btn-primary btn-lg">
                    Click here
                </Link>
            </div>
        </div>
    );
}
