export default function LogoutComponent() {
    return (
        <div className="logout container text-center mt-5">
            <h1 className="display-4">You are logged out!</h1>
            <div className="mt-4">
                <p className="lead">Thank you for using this service.</p>
            </div>
            <div className="mt-3">
                <a href="/" className="btn btn-primary">
                    Go to Login
                </a>
            </div>
        </div>
    );
}