import { Link, useParams } from 'react-router-dom'
// import axios from 'axios'
import { useState } from 'react';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';


export default function WelcomeComponent() {
    const { username } = useParams();

    const [message, setMessage] = useState(null);

    const authContext = useAuth();

    function callHelloWorldRestApi() {
        //axios popular to call rest api in react project
        //axios uses promises so on calling we will get promise back

        retrieveHelloWorldPathVariable('Satyam', authContext.token)
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log('clean up'));
    }

    function successfulResponse(response){
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error){
        console.log(error);
    }

    return (
        <div className="welcomeComponent container text-center mt-5">
            <h1 className="display-4">Welcome, {username}!</h1>
            <div className="mt-4">
                <p className="lead">Manage Your Todos.</p>
                <Link to="/todos" className="btn btn-primary btn-lg">
                    Click here
                </Link>
            </div>
            <div>
                <button className='btn btn-success btn-lg mt-4' onClick={callHelloWorldRestApi}>
                    Call Hello World REST API
                </button>
            </div>
            <div className='text-info fs-2 mt-4'>
                Message: {message}
            </div>
        </div>
    );
}
