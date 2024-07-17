export default function FooterComponent() {

    // console.log(`Footer Component - ${authContext.number}`);
    return (
        <footer className="footer bg-dark text-white mt-5 py-4">
            <div className="container text-center">
                <p className="fs-5">Your Footer</p>
                <small>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</small>
            </div>
        </footer>
    );
}