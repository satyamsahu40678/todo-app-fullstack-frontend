import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'

export default function LoginComponent() {


    const [username, setUsername] = useState('nerdy')
    const [password, setPassword] = useState('password@123')
    const [showErrorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth();




    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit() {
        if (authContext.login(username, password)) {
            navigate(`/welcome/${username}`)

        }
        else {
            setErrorMessage(true);
        }
    }



    return (
        <div className="loginComponent container mt-5">
            <h1 className="text-center mb-4">Login here!</h1>
            {showErrorMessage && (
                <div className='errorMessage alert alert-danger text-center'>
                    Authentication Failed! Check your credentials
                </div>
            )}
            <div className="loginForm card p-4 mx-auto" style={{ maxWidth: '400px' }}>
                {/* Username */}
                <div className="form-group mb-3">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="form-control" 
                        name="username" 
                        placeholder="Username" 
                        value={username} 
                        onChange={handleUsernameChange} 
                    />
                </div>
                {/* Password */}
                <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-control" 
                        name="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                    />
                </div>
                {/* Button */}
                <div className="text-center">
                    <button className='btn btn-primary' type="button" name="login" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}