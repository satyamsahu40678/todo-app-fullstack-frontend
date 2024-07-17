export default function FooterComponent() {

    // console.log(`Footer Component - ${authContext.number}`);
    return (
        <footer className="footer bg-dark text-white">
            <div className="container text-center d-flex flex-column justify-content-center" style={{ height: '100%' }}>
                <p className="fs-5 mb-0">Your Footer</p>
                <small className="mt-1">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</small>
            </div>
        </footer>
    );
}